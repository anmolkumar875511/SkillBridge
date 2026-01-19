import LearningRoadmap from "../models/learningRoadmap.model.js";
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


export const getRoadmap = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const roadmaps = await LearningRoadmap.find({ user: userId })
        .populate("opportunity", "title company category") 
        .sort({ createdAt: -1 });

    if (roadmaps.length === 0) {
        return res.status(200).json(
            new apiResponse(200, "No roadmaps found. Start a skill gap analysis to generate one!", [])
        );
    }

    return res.status(200).json(
        new apiResponse(200, "Roadmaps fetched successfully", roadmaps)
    );
});


export const toggleTaskStatus = asyncHandler(async (req, res) => {
    const { roadmapId, taskId } = req.params;

    const roadmap = await LearningRoadmap.findOne({
        _id: roadmapId,
        user: req.user._id
    });

    if (!roadmap) {
        throw new apiError(404, "Roadmap not found");
    }

    let taskFound = false;
    let completedTasks = 0;
    let totalTasks = 0;

    roadmap.roadmap.forEach((week) => {
        week.tasks.forEach((task) => {
            totalTasks++;
            if (task._id.toString() === taskId) {
                taskFound = true;
                task.isCompleted = !task.isCompleted;
            }
            if (task.isCompleted) completedTasks++;
        });
    });

    if (!taskFound) {
        throw new apiError(404, "Task not found in this roadmap");
    }

    roadmap.progress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

    await roadmap.save();

    return res
    .status(200)
    .json(
        new apiResponse(
            200,
            "Task status updated successfully",
            roadmap
        )
    );
});