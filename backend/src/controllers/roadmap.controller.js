import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import { generateRoadmap } from "../services/roadmapGenerator/roadmap.service.js";

export const createRoadmap = asyncHandler(async (req, res) => {
    const { opportunityId } = req.params;
    const userId = req.user._id;

    const roadmap = await generateRoadmap(userId, opportunityId);

    if(!roadmap) {
        throw new apiError(404, "Roadmap not found");
    }

    return res
    .status(201)
    .json(
        new apiResponse(
            201,
            "Roadmap Generated Successfully",
            roadmap
        )
    );
});