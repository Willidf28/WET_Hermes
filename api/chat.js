<<<<<<< HEAD
export default async function handler(req, res) {
  try {
    const { mensagem } = req.body || {};

    const r = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer SUA_CHAVE_AQUI",
=======
﻿export default async function handler(req, res) {
  try {
    const r = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": v1-2fbcf29cce2e6551f1592adb6975b0655e31055812ac2ec8a6e36321baa7f678,
>>>>>>> 5b56d5c4f7ffcf7053dbb41847e1befaba6ff0c1
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
<<<<<<< HEAD
        messages: [{ role: "user", content: mensagem || "oi" }]
=======
        messages: [
          { role: "user", content: "responda: funcionando" }
        ]
>>>>>>> 5b56d5c4f7ffcf7053dbb41847e1befaba6ff0c1
      })
    });

    const d = await r.json();

<<<<<<< HEAD
    res.status(200).json({
      resposta: d?.choices?.[0]?.message?.content || JSON.stringify(d)
    });
=======
    res.status(200).json(d);
>>>>>>> 5b56d5c4f7ffcf7053dbb41847e1befaba6ff0c1

  } catch (e) {
    res.status(200).json({ erro: e.message });
  }
}