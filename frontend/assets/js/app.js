async function sendMessage(){ 
    const input=document.getElementById('input'); 
    const output=document.getElementById('output'); 
    const message=input.value; 
    const response=await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message})}); 
    const data=await response.json(); 
    output.textContent=data.reply;
}
