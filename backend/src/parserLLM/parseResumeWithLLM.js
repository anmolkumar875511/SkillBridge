import { queryGroq } from "./groqClient.js";
import { safeJsonParse } from "../utils/safeJsonParse.js";
import { resumePrompt } from "./resumePrompt.js";

export const parseResumeWithLLM = async (resumeText) => {
  try {
    console.log("Using Groq to parse resume");

    const prompt = resumePrompt(resumeText);
    const raw = await queryGroq(prompt);

    const parsed = safeJsonParse(raw);
    if (!parsed) throw new Error("Invalid JSON from Groq");

    console.log("Resume parsed with Groq");
    return parsed;
  } catch (err) {
    console.error("Groq parsing failed:", err.message);
    return null;
  }
};