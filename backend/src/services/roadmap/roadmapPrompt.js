export const roadmapPrompt = (missingSkills, jobTitle) => `
You are an expert technical mentor and career coach.
A student is applying for the role: "${jobTitle}".
They are missing these specific skills: [${missingSkills.join(", ")}].

Create a highly actionable 4-week learning roadmap. 
For each week, provide:
1. A clear topic.
2. 3-4 specific, measurable tasks (checkpoints).
3. 2 learning resources (Search queries or documentation links).

Return ONLY a JSON array in this exact format:
[
  {
    "week": 1,
    "topic": "Topic Name",
    "tasks": ["Task description 1", "Task description 2"],
    "resources": [{"title": "Resource Name", "url": "Link/Query"}]
  }
]
`;