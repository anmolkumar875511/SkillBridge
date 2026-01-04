export const extractSkills = (sectionText = "") => {
  if (!sectionText) return [];

  const skillSet = new Set();

  const SKILL_REGEX =
    /(python|c\+\+|java|javascript|html|css|node\.js|express\.js|mongodb|flask|bootstrap|git|github|sql|sqlite3)/gi;

  let match;
  while ((match = SKILL_REGEX.exec(sectionText)) !== null) {
    skillSet.add(match[1].toLowerCase());
  }

  return Array.from(skillSet).map(skill => ({
    name: skill,
    level: "intermediate",
    confidence: 0.85,
    source: "resume"
  }));
};