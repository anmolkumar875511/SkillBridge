import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
      trim: true,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error('Password cannot contain the word "password"');
        }
      }
    },

    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
      required: true
    },

    refreshToken: {
      type: String
    },

    isEmailVerified: {
      type: Boolean,
      default: false
    },

    emailOTP: {
      type: String,
      select: false
    },

    emailOTPExpires: Date
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 11);
});

userSchema.methods.isPasswordMatch = async function (password) {
  return await bcrypt.compare(password, this.password);
};


userSchema.methods.setEmailOTP = async function (otp) {
  this.emailOTP = await bcrypt.hash(otp, 10);
  this.emailOTPExpires = Date.now() + 10 * 60 * 1000;
};

userSchema.methods.isEmailOTPMatch = async function (otp) {
  if (!this.emailOTP) return false;
  return await bcrypt.compare(otp, this.emailOTP);
};

userSchema.methods.clearEmailOTP = function () {
  this.emailOTP = undefined;
  this.emailOTPExpires = undefined;
};

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  delete user.refreshToken;
  delete user.emailOTP;
  delete user.emailOTPExpires;
  return user;
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    { id: this._id, role: this.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    { id: this._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN }
  );
};

userSchema.methods.generateResetPasswordToken = function () {
  return jwt.sign(
    { id: this._id },
    process.env.JWT_RESET_PASSWORD_SECRET,
    { expiresIn: process.env.JWT_RESET_PASSWORD_EXPIRES_IN }
  );
};

userSchema.index({isEmailVerifieda: 1, createdAt: 1});

export default mongoose.model("User", userSchema);