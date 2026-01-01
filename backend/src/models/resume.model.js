import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    fileName: {
      type: String,
      required: true
    },

    extractedText: {
      type: String,
      required: true
    },

    extractedSkills: {
      type: [String],
      default: []
    }
  },
  { timestamps: true }
);

export default mongoose.model("Resume", resumeSchema);

// 1. user
// 2. fileName
// 3. extractedText
// 4. extractedSkills