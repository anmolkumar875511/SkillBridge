import pdf from "pdf-parse-debugging-disabled";

import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";

import ResumeParsed from "../models/resumeParsed.model.js";
import { parseResumeText } from "../resumeParser/index.js";

export const parseResumePreview = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new apiError(400, "No resume file uploaded");
  }

  const pdfData = await pdf(req.file.buffer);
  const rawText = pdfData.text;

  if (!rawText || rawText.trim().length === 0) {
    throw new apiError(422, "Uploaded PDF is empty or unreadable");
  }

  const parsedData = parseResumeText(rawText);
  console.log(parsedData);

  return res.status(200).json(
    new apiResponse(200, "Resume parsed successfully", parsedData)
  );
});

export const confirmResumeData = asyncHandler(async (req, res) => {
  const { skills, experience, education, projects } = req.body;

  if (
    !Array.isArray(skills) ||
    !Array.isArray(experience) ||
    !Array.isArray(education) ||
    !Array.isArray(projects)
  ) {
    throw new apiError(400, "Invalid resume data format");
  }


  const normalizedSkills = skills.map(skill => ({
    name:
      typeof skill === "string"
        ? skill.toLowerCase().trim()
        : skill.name.toLowerCase().trim(),
    level: skill.level || "beginner",
    confidence: skill.confidence ?? 0.7,
    source: skill.source || "resume"
  }));

  // Resume versioning
  const lastResume = await ResumeParsed.findOne({ user: req.user._id })
    .sort({ resumeVersion: -1 })
    .select("resumeVersion");

  const nextVersion = lastResume ? lastResume.resumeVersion + 1 : 1;

  const savedResume = await ResumeParsed.create({
    user: req.user._id,
    resumeVersion: nextVersion,
    skills: normalizedSkills,
    experience,
    education,
    projects
  });

  return res.status(201).json(
    new apiResponse(
      201,
      "Resume data saved successfully",
      savedResume
    )
  );
});