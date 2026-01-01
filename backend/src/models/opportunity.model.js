import mongoose from "mongoose";

const internshipSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    company: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    requiredSkills: {
      type: [String],
      required: true
    },

    experienceLevel: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner"
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Internship", internshipSchema);

// 1. title
// 2. company
// 3. description
// 4. requiredSkills
// 5. experienceLevel
// 6. isActive