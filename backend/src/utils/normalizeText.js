export const normalizeText = (text = "") => {
  return text
    .toLowerCase()
    .replace(/[§#ï]/g, " ")
    .replace(/•/g, "\n")
    .replace(/[–—]/g, "-")
    .replace(/\n{2,}/g, "\n")
    .replace(/[ \t]+/g, " ")
    .trim();
};