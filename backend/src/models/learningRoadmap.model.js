import mongoose from "mongoose";

const opportunitySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    company: {
      type: String,
      required: true
    },

    type: {
      type: String,
      enum: ["Internship", "Job", "Freelance"],
      required: true
    },

    experienceLevel: {
      type: String,
      enum: ["Fresher", "Junior", "Mid", "Senior"],
      default: "Fresher"
    },

    description: {
      type: String,
      required: true
    },

    requiredSkills: {
      type: [String],
      required: true
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Opportunity", opportunitySchema);

// 1. title
// 2. company
// 3. type
// 4. experienceLevel
// 5. description
// 6. requiredSkills
// 7. isActive