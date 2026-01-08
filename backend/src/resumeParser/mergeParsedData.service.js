export const mergeParsedData = (ruleData, aiData) => {
  if (!aiData) {
    return ruleData;
    console.log("AI data is null, returning rule-based data only.");
  }

  return {
    skills:
      ruleData.skills.length >= 5
        ? ruleData.skills
        : aiData.skills.map(s => ({
            name: s.name.toLowerCase(),
            level: "intermediate",
            confidence: 0.6,
            source: "ai_inferred"
          })),

    education:
      ruleData.education.length
        ? ruleData.education
        : aiData.education,

    experience:
      ruleData.experience.length
        ? ruleData.experience
        : aiData.experience,

    projects:
      ruleData.projects.length
        ? ruleData.projects
        : aiData.projects
  };
};