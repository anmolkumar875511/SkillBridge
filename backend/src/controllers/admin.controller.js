import { User } from '../models/user.model.js';
import { runIngestion } from '../services/fetchOpportunity/ingestJob.service.js';
import asyncHandler from "../utils/asyncHandler.js"
import apiError from '../utils/apiError.js';
import apiResponse from '../utils/apiResponse.js';

export const ingest = asyncHandler(async(req, res) => {
    try {
        console.log("Admin is fetching opportunities...")
        await runIngestion();
        console.log("Admin successfully fetched opportunities!!")
        return res
        .status(200)
        .json(
            new apiResponse(200, "Fetched all opportunities")
        )
    }
    catch (error) {
        throw new apiError(500, "Unable to fetch opportunities", error);
    }
});


export const toggleBlacklist = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
        throw new apiError(404, "User not found");
    }

    user.isBlacklisted = !user.isBlacklisted;
    await user.save({ validateBeforeSave: false });

    return res
        .status(200)
        .json(new apiResponse(
            200, 
            { isBlacklisted: user.isBlacklisted }, 
            `User has been ${user.isBlacklisted ? 'blacklisted' : 'whitelisted'}`
        ));
});