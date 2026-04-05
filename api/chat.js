export default async function handler(req, res) {
  const { mensagem } = req.body;

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": Bearer ,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "openai/gpt-4o-mini",
      messages: [{ role: "user", content: mensagem }]
    })
  });

  const data = await response.json();

  res.status(200).json({
    resposta: data.choices?.[0]?.message?.content || "erro"
  });
}
