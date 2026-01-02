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

    skills: {
      type: [String],
      default: []
    },

    resume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume"
    },
    refreshToken: {
      type: String
    }
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

userSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password;
    delete user.refreshToken;
    return user;
};

userSchema.methods.generateAccessToken = function () {
    const token = jwt.sign(
      { id: this._id, role: this.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    return token;
};

userSchema.methods.generateRefreshToken = function () {
    const token = jwt.sign(
      { id: this._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN }
    );
    return token;
};

userSchema.methods.generateResetPasswordToken = function () {
  const token = jwt.sign(
    { id: this._id },
    process.env.JWT_RESET_PASSWORD_SECRET,
    { expiresIn: process.env.JWT_RESET_PASSWORD_EXPIRES_IN }
  );
  return token;
};

export default mongoose.model("User", userSchema);

// 1. name
// 2. email
// 3. password
// 4. role
// 5. skills
// 6. resume