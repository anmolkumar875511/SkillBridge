import mongoose from "mongoose";
import bcrypt from "bcrypt";

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
    }
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 11);
});

export default mongoose.model("User", userSchema);

// 1. name
// 2. email
// 3. password
// 4. role
// 5. skills
// 6. resume