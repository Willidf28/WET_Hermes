# CRIAR API
mkdir api -ErrorAction SilentlyContinue

# CHAT API
@"
export default async function handler(req, res) {
  const { mensagem } = req.body;

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
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
"@ | Out-File -Encoding utf8 api\chat.js

# EBOOK API
@"
export default async function handler(req, res) {
  const { tema } = req.body;

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "openai/gpt-4o-mini",
      messages: [{
        role: "user",
        content: `Crie um ebook com capítulos sobre: ${tema}`
      }]
    })
  });

  const data = await response.json();

  res.status(200).json({
    ebook: data.choices?.[0]?.message?.content || "erro"
  });
}
"@ | Out-File -Encoding utf8 api\ebook.js

# FRONTEND COMPLETO
@"
<!DOCTYPE html>
<html>
<head>
  <title>Hermes IA</title>
</head>
<body>

<h1>Hermes IA</h1>

<h2>Chat IA</h2>
<textarea id="input"></textarea>
<button onclick="chat()">Perguntar</button>

<h2>Gerar Ebook</h2>
<input id="tema" placeholder="tema do ebook">
<button onclick="ebook()">Criar Ebook</button>

<pre id="resposta"></pre>

<script>
async function chat() {
  const mensagem = document.getElementById("input").value;

  const res = await fetch("/api/chat", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ mensagem })
  });

  const data = await res.json();
  document.getElementById("resposta").innerText = data.resposta;
}

async function ebook() {
  const tema = document.getElementById("tema").value;

  const res = await fetch("/api/ebook", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ tema })
  });

  const data = await res.json();
  document.getElementById("resposta").innerText = data.ebook;
}
</script>

</body>
</html>
"@ | Out-File -Encoding utf8 index.html

# GIT PUSH
git add .
git commit -m "auto setup hermes"
git push

Write-Host "SITE CONFIGURADO. AGORA VAI NA VERCEL E GARANTE A API KEY."