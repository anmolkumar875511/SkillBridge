import mongoose from 'mongoose';

const skillGapReportSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },

        opportunity: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Opportunity',
        },

        matchedSkills: {
            type: [String],
            default: [],
        },

        missingSkills: {
            type: [String],
            default: [],
        },

        matchPercentage: {
            type: Number,
            required: true,
            min: 0,
            max: 100,
        },
    },
    { timestamps: true }
);

export default mongoose.model('SkillGapReport', skillGapReportSchema);

// 1. user
// 2. internship
// 3. matchedSkills
// 4. missingSkills
// 5. matchPercentage
