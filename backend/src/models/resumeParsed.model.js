import mongoose from "mongoose";

const resumeParsedSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    resumeVersion: {
      type: Number,
      default: 1
    },

    skills: [
      {
        name: {
          type: String,
          required: true,
          lowercase: true,
          trim: true
        },
        level: {
          type: String,
          enum: ["beginner", "intermediate", "advanced"],
          default: "beginner"
        },
        confidence: {
          type: Number, // 0–1
          default: 0.7
        },
        source: {
          type: String,
          enum: ["resume", "ai_inferred"],
          default: "resume"
        }
      }
    ],

    experience: [
      {
        role: String,
        company: String,
        durationMonths: Number
      }
    ],

    education: [
      {
        degree: String,
        institute: String,
        year: Number
      }
    ],

    projects: [
      {
        title: {
          type: String,
          required: true
        },
        description: {
          type: String,
          default: ""
        }
      }
    ],
    parsedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

export default mongoose.model("ResumeParsed", resumeParsedSchema);

// 1. user
// 2. resumeVersion
// 3. skills
// 4. experience
// 5. education
// 6. projects
// 7. parsedAt