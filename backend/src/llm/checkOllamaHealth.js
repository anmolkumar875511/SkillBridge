import fetch from "node-fetch";

export const isOllamaRunning = async () => {
  try {
    const res = await fetch("http://127.0.0.1:11434/api/tags", {
      timeout: 1500
    });
    return res.ok;
  } catch {
    return false;
  }
};