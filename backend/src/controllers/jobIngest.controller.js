import asyncHandler from '../utils/asyncHandler.js';
import apiError from '../utils/apiError.js';
import apiResponse from '../utils/apiResponse.js';
import { ingestFindWorkJobs } from '../services/fetchOpportunity/findWorkIngest.service.js';

export const ingestJobs = asyncHandler(async (req, res) => {
    const { keyword } = req.query;

    if (!keyword) {
        throw new apiError(400, "Query parameter 'keyword' is required");
    }

    const saved = await ingestFindWorkJobs(keyword);

    res.json(new apiResponse(200, 'Jobs ingested successfully', { saved }));
});
