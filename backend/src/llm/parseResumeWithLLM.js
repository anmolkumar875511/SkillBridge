import { queryOllama } from "./ollamaClient.js";
import { resumeExtractionPrompt } from "./prompts/resumePrompt.js";
import { safeJsonParse } from "./safeJsonParse.js";
import { cleanResumeText } from "./cleanResumeText.js";

export const parseResumeWithLLM = async (resumeText) => {
  try {
    const cleanedText = cleanResumeText(resumeText);

    const raw = await queryOllama(
      resumeExtractionPrompt(cleanedText)
    );

    console.log("RAW LLM OUTPUT:", raw);

    return safeJsonParse(raw);
  } catch (error) {
    console.error("Error parsing resume with LLM:", error);
    return null;
  }
};