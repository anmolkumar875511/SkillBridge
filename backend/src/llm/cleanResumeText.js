export const cleanResumeText = (text) => {
  return text
    // normalize unicode
    .normalize("NFKD")
    .replace(/[^\x00-\x7F]/g, "")

    // fix bullets and separators
    .replace(/[•▪●■]/g, "\n- ")

    // split camelCase / glued words
    .replace(/([a-z])([A-Z])/g, "$1 $2")

    // add space after punctuation
    .replace(/([a-zA-Z])(\d)/g, "$1 $2")
    .replace(/(\d)([a-zA-Z])/g, "$1 $2")

    // normalize spacing
    .replace(/\s{2,}/g, " ")

    // normalize section headers
    .replace(/(education|projects|skills|experience)/gi, "\n\n$1\n")

    .trim();
};