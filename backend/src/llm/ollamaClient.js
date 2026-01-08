import fetch from "node-fetch";

export const queryOllama = async (prompt) => {
  const res = await fetch("http://127.0.0.1:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "tinyllama",
      prompt,
      stream: false,
      options: {
        temperature: 0.1
      }
    })
  });

  const data = await res.json();
  return data.response;
};