export const mapCategoryFromText = (title = "", description = "") => {
  const text = `${title} ${description}`.toLowerCase();

  if (
    text.includes("software") ||
    text.includes("developer") ||
    text.includes("engineer") ||
    text.includes("frontend") ||
    text.includes("backend") ||
    text.includes("full stack") ||
    text.includes("devops") ||
    text.includes("qa") ||
    text.includes("sdet") ||
    text.includes("data")
  ) return "tech";

  if (
    text.includes("finance") ||
    text.includes("account") ||
    text.includes("analyst") ||
    text.includes("bank")
  ) return "finance";

  if (
    text.includes("doctor") ||
    text.includes("nurse") ||
    text.includes("hospital") ||
    text.includes("medical")
  ) return "medical";

  if (
    text.includes("law") ||
    text.includes("legal") ||
    text.includes("advocate")
  ) return "law";

  if (
    text.includes("design") ||
    text.includes("ui") ||
    text.includes("ux") ||
    text.includes("graphic")
  ) return "design";

  return "other";
};

export const mapOpportunityType = (title = "", description = "") => {
  const text = `${title} ${description}`.toLowerCase();
  return text.includes("intern") ? "internship" : "job";
};

export const mapExperienceLevel = (title = "", description = "") => {
  const text = `${title} ${description}`.toLowerCase();

  if (text.includes("senior") || text.includes("lead")) return "advanced";
  if (text.includes("2+ years") || text.includes("3+ years")) return "intermediate";

  return "beginner";
};

export const extractSkills = (description = "") => {
  const skills = [
    "javascript", "react", "node", "mongodb", "express",
    "python", "java", "sql", "aws", "docker", "kubernetes",
    "html", "css", "typescript"
  ];

  const text = description.toLowerCase();
  return skills.filter(skill => text.includes(skill));
};