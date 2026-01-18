export const roadmapPrompt = (missingSkills, jobTitle, category) => `
You are an expert mentor in the ${category.toUpperCase()} field. 
A student is preparing for a career as a "${jobTitle}". 
They have a skill gap in the following areas: [${missingSkills.join(", ")}].

GOAL:
Create a 4-week structured learning roadmap to master these missing skills.

RULES:
1. Provide 3-4 specific, measurable tasks per week.
2. Suggest 2 learning resources (Documentation, standard textbooks, or search keywords).
3. Ensure the roadmap is tailored specifically to the "${category}" industry.

RETURN ONLY JSON:
[
  {
    "week": 1,
    "topic": "String",
    "tasks": ["Task 1", "Task 2", "Task 3"],
    "resources": [{"title": "String", "url": "String"}]
  }
]
`;