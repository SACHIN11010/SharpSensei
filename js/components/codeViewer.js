import { appState } from '../appState.js';

export function renderCodeViewer(container, practical) {
  const { themeConfig } = appState;
  if (!practical) return;

  container.innerHTML = `
    <div class="space-y-4">
      <!-- Code Box Card -->
      <div class="border ${themeConfig.borderColor} ${themeConfig.cardBg} rounded-sm overflow-hidden shadow-md">
        <div class="flex items-center justify-between px-3 py-2 border-b ${themeConfig.borderColor} ${themeConfig.headerBg} select-none">
          <div class="flex items-center gap-2">
            <i data-lucide="code-2" class="w-4 h-4 text-cyan-400"></i>
            <span class="text-xs font-bold ${themeConfig.textHeading}">Practical_${practical.id}.cs</span>
            <span class="text-[9px] px-1.5 py-0.2 rounded-xs border font-bold ${themeConfig.accentBadgeBg}">C# .NET 8.0</span>
          </div>

          <button
            id="btn-copy-code"
            class="flex items-center gap-1 px-2.5 py-1 rounded-sm text-[10px] font-bold border ${themeConfig.borderColor} ${themeConfig.cardSubBg} ${themeConfig.textHeading} hover:border-cyan-500 transition-colors cursor-pointer"
          >
            <i data-lucide="copy" class="w-3 h-3"></i>
            <span id="copy-btn-text">COPY CODE</span>
          </button>
        </div>

        <div class="p-3 overflow-x-auto ${themeConfig.terminalBg} font-mono text-xs leading-relaxed">
          <pre><code>${escapeHtml(practical.code)}</code></pre>
        </div>
      </div>

      <!-- Algorithmic Execution Steps Card -->
      <div class="border ${themeConfig.borderColor} ${themeConfig.cardSubBg} rounded-sm p-4 space-y-3">
        <div class="flex items-center gap-2">
          <i data-lucide="list-ordered" class="w-4 h-4 text-emerald-400"></i>
          <h3 class="text-xs font-bold ${themeConfig.textHeading} uppercase tracking-wider">Algorithmic Execution Steps</h3>
        </div>

        <ol class="space-y-2 text-xs ${themeConfig.textColor} list-decimal list-inside pl-1">
          ${practical.algorithm.map(step => `
            <li class="leading-relaxed"><span class="${themeConfig.textColor}">${escapeHtml(step)}</span></li>
          `).join('')}
        </ol>
      </div>

      <!-- Code Explanation Note -->
      <div class="border ${themeConfig.borderColor} ${themeConfig.cardSubBg} rounded-sm p-4 space-y-2">
        <div class="flex items-center gap-2 text-amber-400">
          <i data-lucide="lightbulb" class="w-4 h-4"></i>
          <h3 class="text-xs font-bold uppercase tracking-wider">Code Architecture & Concept Summary</h3>
        </div>
        <p class="text-xs ${themeConfig.textColor} leading-relaxed">
          ${escapeHtml(practical.codeExplanation)}
        </p>
      </div>
    </div>
  `;

  // Attach Copy Code Event
  const btnCopy = container.querySelector('#btn-copy-code');
  const copyText = container.querySelector('#copy-btn-text');
  if (btnCopy && copyText) {
    btnCopy.addEventListener('click', () => {
      navigator.clipboard.writeText(practical.code);
      copyText.textContent = 'COPIED!';
      setTimeout(() => {
        copyText.textContent = 'COPY CODE';
      }, 2000);
    });
  }
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
