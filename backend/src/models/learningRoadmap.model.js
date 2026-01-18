import mongoose from "mongoose";

const opportunitySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    
    opportunity: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Opportunity",
      required: true
    },

    roadmap: {
      week: Number,
      topic: String,
      tasks: [
        {
          description: String,
          isCompleted: {
            type: Boolean,
            default: false
          }
        }
      ]
    },

    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Opportunity", opportunitySchema);