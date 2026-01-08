export const resumePrompt = (text) => `
You are a resume parsing engine.

Return ONLY valid JSON.
Do NOT add explanations, markdown, or comments.

JSON schema:
{
  "skills": [{ "name": "string" }],
  "education": [{ "degree": "string", "institute": "string", "year": "string" }],
  "experience": [{ "role": "string", "company": "string" }],
  "projects": [{ "title": "string", "description": "string" }]
}

Resume text:
"""
${text}
"""
`;