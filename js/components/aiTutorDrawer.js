import { appState } from '../appState.js';
import { getPracticalById } from '../data/practicalsData.js';
import { askAiTutor } from '../aiTutor.js';

let chatHistory = [
  {
    sender: 'ai',
    text: '👋 Hello! I am **SharpSensei**, your C# .NET AI Professor. Ask me anything about code logic, viva questions, or exception handling for this practical!',
    modelUsed: 'SharpSensei C# Engine'
  }
];

export function renderAiTutorDrawer(container) {
  const { themeConfig, activePracticalId, isAiTutorOpen, geminiApiKey } = appState;
  const activePractical = getPracticalById(activePracticalId);

  if (!isAiTutorOpen) {
    container.innerHTML = '';
    return;
  }

  container.innerHTML = `
    <div class="fixed inset-y-0 right-0 w-80 md:w-96 ${themeConfig.sidebarBg} border-l ${themeConfig.borderColor} shadow-2xl z-40 flex flex-col select-none">
      <!-- Header -->
      <div class="p-3 border-b ${themeConfig.borderColor} ${themeConfig.headerBg} flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-6 h-6 rounded ${themeConfig.accentBg} text-black font-black flex items-center justify-center text-xs">
            🤖
          </div>
          <div>
            <h3 class="text-xs font-bold ${themeConfig.textHeading} uppercase tracking-wider">SharpSensei AI Tutor</h3>
            <span class="text-[9px] text-cyan-400 font-mono">${geminiApiKey ? 'Live Online Gemini 2.5' : 'Offline Knowledge Engine'}</span>
          </div>
        </div>

        <div class="flex items-center gap-1">
          <button id="btn-config-key" class="p-1 rounded text-slate-400 hover:text-white" title="Configure Gemini API Key">
            <i data-lucide="key" class="w-3.5 h-3.5"></i>
          </button>
          <button id="btn-close-aitutor" class="p-1 rounded text-slate-400 hover:text-white">
            <i data-lucide="x" class="w-4 h-4"></i>
          </button>
        </div>
      </div>

      <!-- Quick Prompt Chips -->
      <div class="p-2 border-b ${themeConfig.borderColor} ${themeConfig.cardSubBg} flex flex-wrap gap-1">
        <button data-prompt="Explain Logic" class="chip-prompt px-2 py-0.5 rounded text-[9px] font-bold bg-white/5 border ${themeConfig.borderColor} ${themeConfig.textHeading} hover:border-cyan-400">
          💡 Explain Logic
        </button>
        <button data-prompt="Viva Questions" class="chip-prompt px-2 py-0.5 rounded text-[9px] font-bold bg-white/5 border ${themeConfig.borderColor} ${themeConfig.textHeading} hover:border-violet-400">
          🎓 Viva Questions
        </button>
        <button data-prompt="Exception Handling" class="chip-prompt px-2 py-0.5 rounded text-[9px] font-bold bg-white/5 border ${themeConfig.borderColor} ${themeConfig.textHeading} hover:border-amber-400">
          🛡️ Exceptions
        </button>
        <button data-prompt="Visual Studio Steps" class="chip-prompt px-2 py-0.5 rounded text-[9px] font-bold bg-white/5 border ${themeConfig.borderColor} ${themeConfig.textHeading} hover:border-emerald-400">
          🛠️ VS Setup
        </button>
      </div>

      <!-- Chat History Stream -->
      <div id="ai-chat-messages" class="flex-1 p-3 overflow-y-auto space-y-3 font-sans text-xs">
        ${chatHistory.map(msg => `
          <div class="space-y-1 ${msg.sender === 'user' ? 'text-right' : 'text-left'}">
            <div class="inline-block p-2.5 rounded-sm max-w-[88%] text-xs leading-relaxed ${
              msg.sender === 'user'
                ? `${themeConfig.accentBg} ${themeConfig.accentTextColor} font-medium`
                : `${themeConfig.cardSubBg} border ${themeConfig.borderColor} ${themeConfig.textColor}`
            }">
              ${escapeMarkdown(msg.text)}
            </div>
            ${msg.modelUsed ? `<div class="text-[8px] text-slate-500 font-mono px-1">${msg.modelUsed}</div>` : ''}
          </div>
        `).join('')}
      </div>

      <!-- Input Bar -->
      <div class="p-2 border-t ${themeConfig.borderColor} ${themeConfig.headerBg} flex items-center gap-2">
        <input
          type="text"
          id="ai-prompt-input"
          placeholder="Ask Professor SharpSensei..."
          class="flex-1 bg-slate-950 border border-slate-800 p-2 rounded-sm text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
        />
        <button id="btn-send-prompt" class="p-2 ${themeConfig.accentBg} text-black font-bold rounded-sm hover:opacity-90 cursor-pointer">
          <i data-lucide="send" class="w-3.5 h-3.5"></i>
        </button>
      </div>
    </div>
  `;

  // Attach Event Listeners
  container.querySelector('#btn-close-aitutor')?.addEventListener('click', () => {
    appState.toggleAiTutor();
  });

  container.querySelector('#btn-config-key')?.addEventListener('click', () => {
    const key = prompt('Enter your Google Gemini API Key (leave blank for built-in Offline Engine):', geminiApiKey);
    if (key !== null) appState.setGeminiApiKey(key);
  });

  const sendBtn = container.querySelector('#btn-send-prompt');
  const inputEl = container.querySelector('#ai-prompt-input');

  const handleSend = async (customText) => {
    const text = (customText || inputEl.value).trim();
    if (!text) return;

    chatHistory.push({ sender: 'user', text });
    if (inputEl) inputEl.value = '';
    renderAiTutorDrawer(container);

    const chatContainer = container.querySelector('#ai-chat-messages');
    if (chatContainer) chatContainer.scrollTop = chatContainer.scrollHeight;

    // Call AI Tutor Engine
    const res = await askAiTutor(text, activePractical, geminiApiKey);
    chatHistory.push({ sender: 'ai', text: res.reply, modelUsed: res.modelUsed });
    renderAiTutorDrawer(container);

    const updatedChat = container.querySelector('#ai-chat-messages');
    if (updatedChat) updatedChat.scrollTop = updatedChat.scrollHeight;
  };

  sendBtn?.addEventListener('click', () => handleSend());
  inputEl?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleSend();
  });

  container.querySelectorAll('.chip-prompt').forEach(chip => {
    chip.addEventListener('click', () => {
      const p = chip.getAttribute('data-prompt');
      handleSend(p);
    });
  });
}

function escapeMarkdown(text) {
  // Simple markdown renderer for AI responses
  return text
    .replace(/```csharp([\s\S]*?)```/g, '<pre class="bg-black/40 p-2 my-1.5 rounded font-mono text-[10px] text-cyan-300 overflow-x-auto"><code>$1</code></pre>')
    .replace(/```([\s\S]*?)```/g, '<pre class="bg-black/40 p-2 my-1.5 rounded font-mono text-[10px] text-slate-300 overflow-x-auto"><code>$1</code></pre>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code class="bg-black/30 px-1 py-0.5 rounded text-cyan-300 font-mono text-[10px]">$1</code>')
    .replace(/\n/g, '<br/>');
}
