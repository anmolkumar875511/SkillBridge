export const mergeParsedData = (ruleData, aiData) => {
  if (!aiData) {
    console.log("LLM failed, using rule-based data only");
    return ruleData;
  }

  return {
    skills: aiData.skills?.length
      ? aiData.skills.map(s => ({
          name: s.name.toLowerCase(),
          level: s.level || "intermediate",
          confidence: s.confidence || 0.7,
          source: "ai_inferred"
        }))
      : ruleData.skills,

    education: aiData.education?.length
      ? aiData.education
      : ruleData.education,

    experience: aiData.experience?.length
      ? aiData.experience
      : ruleData.experience,

    projects: aiData.projects?.length
      ? aiData.projects
      : ruleData.projects
  };
};