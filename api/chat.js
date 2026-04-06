export default async function handler(req, res) {
  try {

    if (req.method !== "POST") {
      return res.status(200).json({ resposta: "API online" });
    }

    const body = req.body ? req.body : {};
    const mensagem = body.mensagem || "oi";

    if (!process.env.OPENROUTER_API_KEY) {
      return res.status(200).json({
        erro: "API KEY não configurada"
      });
    }

    const r = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + process.env.OPENROUTER_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [
          { role: "user", content: mensagem }
        ]
      })
    });

    const d = await r.json();

    return res.status(200).json({
      resposta: d?.choices?.[0]?.message?.content || JSON.stringify(d)
    });

  } catch (e) {
    return res.status(200).json({
      erro: e.message
    });
  }
}