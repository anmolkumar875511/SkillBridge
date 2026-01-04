export const extractProjects = (sectionText = "") => {
  if (!sectionText) return [];

  const projects = [];
  const seen = new Set();

  const chunks = sectionText.split(/(?=[a-z][a-z\s]+20\d{2})/);

  chunks.forEach(chunk => {
    const titleMatch = chunk.match(/^([a-z\s]+)(20\d{2})?/);

    if (!titleMatch) return;

    const title = titleMatch[1].trim();

    if (title.length < 5 || seen.has(title)) return;

    seen.add(title);
    projects.push(title);
  });

  return projects;
};