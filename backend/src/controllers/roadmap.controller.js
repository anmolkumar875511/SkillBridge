import LearningRoadmap from '../models/learningRoadmap.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import apiError from '../utils/apiError.js';
import apiResponse from '../utils/apiResponse.js';
import { generateRoadmap } from '../services/roadmapGenerator/roadmap.service.js';
import { logger } from '../utils/logger.js';

export const createRoadmap = asyncHandler(async (req, res) => {
    const { opportunityId } = req.params;
    const userId = req.user._id;

    const roadmap = await generateRoadmap(userId, opportunityId);

    if (!roadmap) {
        throw new apiError(404, 'Roadmap not found');
    }

    await logger({
        level: 'info',
        action: 'ROADMAP_GENERATE',
        message: `User ${req.user.email} generated roadmap for opportunity ${opportunityId}`,
        req,
    });

    return res.status(201).json(new apiResponse(201, 'Roadmap Generated Successfully', roadmap));
});

export const getRoadmap = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const roadmaps = await LearningRoadmap.find({ user: userId })
        .populate('opportunity', 'title company category')
        .sort({ createdAt: -1 });

    if (roadmaps.length === 0) {
        return res
            .status(200)
            .json(
                new apiResponse(
                    200,
                    'No roadmaps found. Start a skill gap analysis to generate one!',
                    []
                )
            );
    }

    return res.status(200).json(new apiResponse(200, 'Roadmaps fetched successfully', roadmaps));
});

export const toggleTaskStatus = asyncHandler(async (req, res) => {
    const { roadmapId, taskId } = req.params;

    const roadmap = await LearningRoadmap.findOne({
        _id: roadmapId,
        user: req.user._id,
        progress: { $lt: 100 },
    });

    if (!roadmap) {
        throw new apiError(404, 'Roadmap not found');
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
        throw new apiError(404, 'Task not found in this roadmap');
    }

    roadmap.progress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

    await roadmap.save();

    await logger({
        level: 'info',
        action: 'TASK_STATUS_UPDATE',
        message: `User ${req.user.email} updated task status for roadmap ${roadmapId}`,
        req,
    });

    return res.status(200).json(new apiResponse(200, 'Task status updated successfully', roadmap));
});

export const getCompletedRoadmaps = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const roadmaps = await LearningRoadmap.find({
        user: userId,
        progress: 100,
    })
        .populate('opportunity', 'title comapany category')
        .sort({ updatedAt: -1 });

    if (!roadmaps.length === 0) {
        return res.status(200).json(new apiResponse(200, 'No roadmap is completed till now', []));
    }

    return res
        .status(200)
        .json(new apiResponse(200, 'All completed roadmaps are fetched', roadmaps));
});

export const deletedRoadmap = asyncHandler(async (req, res) => {
    const { roadmapId } = req.params;

    try {
        const roadmap = await LearningRoadmap.findOneAndDelete({
            _id: roadmapId,
            user: req.user._id,
        });

        if (!roadmap) {
            throw new apiError(404, 'No roadmap found');
        }

        return res.status(200).json(new apiResponse(200, 'Roadmap deleted successfully', null));
    } catch (error) {
        throw new apiError(500, 'Unable to delete roadmap', error);
    }
});
