// chatbot.js - AI Assistant Chat Widget

export function initChatbot(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const chatBox = document.createElement('div');
  chatBox.style = 'position:fixed; bottom:1rem; right:1rem; width:300px; background:#111; color:white; border-radius:12px; box-shadow:0 0 10px rgba(0,255,255,0.5); padding:1rem; z-index:9999;';

  const messages = document.createElement('div');
  messages.style = 'max-height:200px; overflow-y:auto; margin-bottom:1rem; font-size:0.9rem';
  chatBox.appendChild(messages);

  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Ask Nova...';
  input.style = 'width:100%; padding:0.5rem; border-radius:8px; border:none;';
  chatBox.appendChild(input);

  input.addEventListener('keydown', async (e) => {
    if (e.key === 'Enter') {
      const msg = input.value.trim();
      if (msg === '') return;
      const userMsg = document.createElement('div');
      userMsg.textContent = '🧑 ' + msg;
      messages.appendChild(userMsg);
      input.value = '';

      const aiMsg = document.createElement('div');
      aiMsg.textContent = '🤖 Thinking...';
      messages.appendChild(aiMsg);
      messages.scrollTop = messages.scrollHeight;

      const reply = await mockAIResponse(msg);
      aiMsg.textContent = '🤖 ' + reply;
    }
  });

  container.appendChild(chatBox);
}

function mockAIResponse(message) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Nova says: That's a great question!");
    }, 1000);
  });
}
