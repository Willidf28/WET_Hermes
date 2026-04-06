export default async function handler(req, res) {
  try {
    const body = req.body ? req.body : {};
    const mensagem = body.mensagem || "oi";

    const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + process.env.GROQ_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages: [
          { role: "user", content: mensagem }
        ]
      })
    });

    const d = await r.json();

    res.status(200).json({
      resposta: d?.choices?.[0]?.message?.content || JSON.stringify(d)
    });

  } catch (e) {
    res.status(200).json({ erro: e.message });
  }
}
