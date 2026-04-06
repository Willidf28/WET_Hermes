# LIMPA API ANTIGA
Remove-Item -Recurse -Force api -ErrorAction SilentlyContinue
mkdir api

# API CHAT
@"
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(200).json({ ok: true });

  const { mensagem } = req.body;

  const r = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + process.env.OPENROUTER_API_KEY,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "openai/gpt-4o-mini",
      messages: [{ role: "user", content: mensagem }]
    })
  });

  const d = await r.json();

  res.status(200).json({
    resposta: d?.choices?.[0]?.message?.content || "SEM RESPOSTA"
  });
}
"@ | Out-File -Encoding utf8 api\chat.js

# API EBOOK
@"
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(200).json({ ok: true });

  const { tema } = req.body;

  const r = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + process.env.OPENROUTER_API_KEY,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "openai/gpt-4o-mini",
      messages: [{
        role: "user",
        content: "Crie um ebook com capítulos sobre: " + tema
      }]
    })
  });

  const d = await r.json();

  res.status(200).json({
    ebook: d?.choices?.[0]?.message?.content || "SEM RESPOSTA"
  });
}
"@ | Out-File -Encoding utf8 api\ebook.js

# FRONTEND COMPLETO FUNCIONAL
@"
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Hermes IA</title>
<style>
body { font-family: Arial; padding:20px; background:#111; color:#fff; }
button { padding:10px; margin:5px; }
textarea, input { width:100%; margin:5px 0; }
.aba { display:none; }
.ativa { display:block; }
</style>
</head>
<body>

<h1>Hermes IA</h1>

<button onclick="tab('chat')">Chat</button>
<button onclick="tab('ebook')">Ebook</button>

<div id="chat" class="aba ativa">
<h2>Chat IA</h2>
<textarea id="msg"></textarea>
<button onclick="chat()">Enviar</button>
</div>

<div id="ebook" class="aba">
<h2>Ebook</h2>
<input id="tema" placeholder="tema">
<button onclick="ebook()">Gerar</button>
</div>

<pre id="out"></pre>

<script>
function tab(t){
 document.querySelectorAll('.aba').forEach(x=>x.classList.remove('ativa'));
 document.getElementById(t).classList.add('ativa');
}

async function chat(){
 const m = document.getElementById("msg").value;
 const r = await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({mensagem:m})});
 const d = await r.json();
 document.getElementById("out").innerText = d.resposta;
}

async function ebook(){
 const t = document.getElementById("tema").value;
 const r = await fetch("/api/ebook",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({tema:t})});
 const d = await r.json();
 document.getElementById("out").innerText = d.ebook;
}
</script>

</body>
</html>
"@ | Out-File -Encoding utf8 index.html

# GIT
git add .
git commit -m "RESET TOTAL FUNCIONAL"
git push

Write-Host "PRONTO. AGORA REDEPLOY NA VERCEL E TESTA."