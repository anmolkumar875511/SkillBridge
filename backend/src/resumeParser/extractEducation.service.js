export const extractEducation = (sectionText = "") => {
  if (!sectionText) return [];

  const education = [];

  const DEGREE_REGEX =
    /(b\.tech|m\.tech|bs|bachelor|master|intermediate|high school)/gi;

  let match;
  while ((match = DEGREE_REGEX.exec(sectionText)) !== null) {
    const slice = sectionText.slice(match.index, match.index + 200);

    const yearMatch = slice.match(/20\d{2}/);
    const instituteMatch = slice.match(
      /(institute|college|university)[a-z\s,]*/i
    );

    education.push({
      degree: match[0],
      institute: instituteMatch ? instituteMatch[0].trim() : "",
      year: yearMatch ? Number(yearMatch[0]) : null
    });
  }

  return education;
};