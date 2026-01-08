export const mergeParsedData = (ruleData, aiData) => {

  if (!aiData) {
    console.log("LLM failed → using rule-based data");
    return ruleData;
  }

  const formatSkills = (skills) => {
    if (!skills || !skills.length) return [];
    return skills.map(skill => ({
      name: typeof skill === 'string' ? skill : skill.name,
      level: "intermediate",
      source: "ai_inferred",
      confidence: 0.8
    }));
  };

  return {
    skills: aiData.skills?.length ? formatSkills(aiData.skills) : (ruleData.skills || []),

    education: (aiData.education?.length ? aiData.education : ruleData.education || []).map(edu => ({
      ...edu,
      year: edu.year ? parseInt(edu.year) : null
    })),

    experience: aiData.experience?.length ? aiData.experience : (ruleData.experience || []),
    
    projects: aiData.projects?.length ? aiData.projects : (ruleData.projects || []),
    
    _meta: {
      parsedBy: "groq-llm",
      updatedAt: new Date()
    }
  };
};