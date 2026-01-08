import { queryOllama } from "./ollamaClient.js";
import { resumeExtractionPrompt } from "./prompts/resumePrompt.js";
import { safeJsonParse } from "./safeJsonParse.js";

export const parseResumeWithLLM = async (resumeText) => {
    try {
        const raw = await queryOllama(resumeExtractionPrompt(resumeText));
        return safeJsonParse(raw);
    } catch (error) {
        console.error("Error parsing resume with LLM:", error);
        return null;
    }
};