export const resumeExtractionPrompt = (resumeText) => `
You are a resume parsing engine.

Return ONLY valid JSON.
Do NOT add explanations.
Do NOT add extra skills.
Do NOT infer unrelated data.

JSON schema:
{
  "skills": [{ "name": string }],
  "education": [{ "degree": string, "institute": string, "year": number|null }],
  "experience": [{ "role": string, "company": string, "durationMonths": number|null }],
  "projects": [{ "title": string, "description": string }]
}

Resume text:
"""
${resumeText}
"""
`;