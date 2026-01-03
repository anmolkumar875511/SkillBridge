import pdfParse from "../utils/pdfHelper.cjs";
import asyncHandler from "../utils/asyncHandler.js";
import ResumeParsed from "../models/resumeParsed.model.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";

export const parseResumePreview = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new apiError(400, "No resume file uploaded");
  }

  const data = await pdfParse(req.file.buffer);
  const rawText = data.text;

  if (!rawText || rawText.trim().length === 0) {
    throw new apiError(422, "Uploaded PDF is empty or unreadable");
  }

  const text = rawText.toLowerCase();
  console.log("Extracted Text:", text);

  const parsedData = {
    skills: ["JavaScript", "Node.js", "Express"], // Dummy data for preview
    experience: ["Software Developer at XYZ Corp (12 months)"], // Dummy data for preview
    education: ["Bachelor's in Computer Science from ABC University (2020)"], // Dummy data for preview
    projects: ["Resume Parser Tool"] // Dummy data for preview
  };

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

  const normalizedSkills = skills.map(skill => {
    if (typeof skill === "string") {
      return {
        name: skill.toLowerCase().trim(),
        level: "beginner",
        confidence: 0.7,
        source: "resume"
      };
    }

    return {
      name: skill.name.toLowerCase().trim(),
      level: skill.level || "beginner",
      confidence: skill.confidence ?? 0.7,
      source: skill.source || "resume"
    };
  });

  const resume = await ResumeParsed.create({
    user: req.user._id,
    skills: normalizedSkills,
    experience,
    education,
    projects
  });

  return res.status(201).json(
    new apiResponse(201, "Resume data saved successfully", resume)
  );
});