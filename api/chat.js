export default async function handler(req, res) {
  return res.status(200).json({
    key: process.env.OPENROUTER_API_KEY ? "OK" : "SEM KEY"
  });
}