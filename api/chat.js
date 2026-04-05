export default async function handler(req, res) {
  try {
    const r = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": v1-2fbcf29cce2e6551f1592adb6975b0655e31055812ac2ec8a6e36321baa7f678,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [
          { role: "user", content: "responda: funcionando" }
        ]
      })
    });

    const d = await r.json();

    res.status(200).json(d);

  } catch (e) {
    res.status(200).json({ erro: e.message });
  }
}