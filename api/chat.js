export default async function handler(req, res) {
  try {
    const { mensagem } = req.body || {};

    const r = await fetch(
      "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1",
      {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + process.env.HF_API_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inputs: mensagem || "oi"
        })
      }
    );

    const d = await r.json();

    res.status(200).json({
      resposta: JSON.stringify(d)
    });

  } catch (e) {
    res.status(200).json({ erro: e.message });
  }
}