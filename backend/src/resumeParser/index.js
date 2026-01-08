import { parseResumeWithLLM } from "../llm/parseResumeWithLLM.js";
import { mergeParsedData } from "./mergeParsedData.service.js";
import { isOllamaRunning } from "../llm/checkOllamaHealth.js";
import { ruleBasedParse } from "./ruleBasedParse.service.js";

export const parseResumeText = async (rawText) => {
  const ruleBasedData = ruleBasedParse(rawText);

  let finalData = ruleBasedData;

  const needsAI =
    ruleBasedData.skills.length < 5 ||
    ruleBasedData.projects.length === 0;

  if (needsAI && await isOllamaRunning()) {
    const aiData = await parseResumeWithLLM(rawText);

    if (aiData) {
      finalData = mergeParsedData(ruleBasedData, aiData);
    }
  }

  return finalData;
};