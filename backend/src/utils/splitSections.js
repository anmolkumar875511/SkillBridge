export const splitSections = (text) => {
  const sections = {};

  const patterns = {
    education: /education([\s\S]*?)(personal projects|technical skills|coding profiles|positions|coding achievements|$)/,

    projects: /(personal projects|projects)([\s\S]*?)(technical skills|coding profiles|positions|coding achievements|$)/,

    skills: /(technical skills and interests|technical skills)([\s\S]*?)(coding profiles|positions|coding achievements|$)/,

    positions: /(positions of responsibility|experience)([\s\S]*?)(coding achievements|$)/
  };

  for (const key in patterns) {
    const match = text.match(patterns[key]);
    if (match) {
      sections[key] = match[2]?.trim() || match[1]?.trim();
    }
  }

  return sections;
};