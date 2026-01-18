export const roadmapPrompt = (missingSkills, jobTitle, category) => `
You are an expert mentor in the field of ${category}.
Provide a 4-week learning roadmap for a "${jobTitle}" candidate missing these skills: [${missingSkills.join(", ")}].

Return ONLY JSON:
[
  {
    "week": 1,
    "topic": "Topic Name",
    "tasks": ["Specific Task 1", "Specific Task 2"],
    "resources": [{"title": "Resource Name", "url": "Query/URL"}]
  }
]
`;