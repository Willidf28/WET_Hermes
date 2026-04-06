export default async function handler(req, res) {
  try {
    const { mensagem } = req.body || {};

    const r = await fetch(
      "https://router.huggingface.co/hf-inference/models/mistralai/Mistral-7B-Instruct-v0.2",
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

    const resposta = Array.isArray(d)
      ? d[0]?.generated_text
      : JSON.stringify(d);

    res.status(200).json({ resposta });

  } catch (e) {
    res.status(200).json({ erro: e.message });
  }
}