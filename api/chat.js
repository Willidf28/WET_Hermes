export default async function handler(req, res) {
  try {
    const body = req.body ? req.body : {};
    const mensagem = body.mensagem || "oi";

    const r = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + process.env.XAI_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "grok-2-latest",
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