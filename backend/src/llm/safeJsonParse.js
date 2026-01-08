export const safeJsonParse = (text) => {
  try {
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    if (start === -1 || end === -1) return null;

    return JSON.parse(text.slice(start, end + 1));
  } catch {
    return null;
  }
};