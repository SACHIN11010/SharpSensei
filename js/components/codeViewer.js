import { appState } from '../appState.js';

export function renderCodeViewer(container, practical) {
  if (!practical) return;

  const lines = (practical.code || '').split('\n');
  const lineCount = lines.length || 1;
  const highlightedCode = highlightCSharp(practical.code || '');

  container.innerHTML = `
    <div class="flex flex-col h-full space-y-6 font-['Hanken_Grotesk',sans-serif] text-[#e5e2e1]">
      <!-- Section 1: Full Code & Journal Export Header Module -->
      <section class="bg-[#131313] border border-[#3e484f] rounded-lg p-4 md:p-6 shadow-md flex justify-between items-end flex-wrap gap-4">
        <div>
          <h1 class="text-xl md:text-2xl font-bold text-white mb-1">Full Code — Practical #${practical.id}</h1>
          <p class="text-xs md:text-sm text-[#bdc8d0]">Formatted for handwritten journal and practical record submission.</p>
        </div>
        <div class="flex items-center gap-2">
          <button
            id="btn-copy-full-code"
            class="bg-[#00a3d9] text-black font-['JetBrains_Mono',monospace] text-xs font-bold px-3 py-1.5 rounded hover:bg-[#008fbf] transition-colors flex items-center gap-1.5 shadow"
          >
            <i data-lucide="copy" class="w-4 h-4"></i>
            <span id="copy-full-text">Copy Full Code</span>
          </button>
          <button
            id="btn-print-export"
            class="bg-transparent border border-[#3e484f] text-[#e5e2e1] font-['JetBrains_Mono',monospace] text-xs font-bold px-3 py-1.5 rounded hover:bg-[#2a2a2a] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <i data-lucide="printer" class="w-4 h-4"></i>
            <span>Print / Export</span>
          </button>
        </div>
      </section>

      <!-- Section 2: Problem Statement Module -->
      <section class="w-full bg-[#131313] border border-[#3e484f] rounded-lg flex flex-col shrink-0 overflow-hidden shadow-md">
        <!-- Pane Header -->
        <div class="h-9 border-b border-[#3e484f] flex items-center px-4 bg-[#2a2a2a] select-none">
          <span class="font-['JetBrains_Mono',monospace] text-xs font-bold text-[#bdc8d0] uppercase tracking-wider">Problem Statement</span>
        </div>
        <div class="p-4 md:p-6 flex flex-col gap-4">
          <div class="flex items-center justify-between flex-wrap gap-2">
            <h2 class="text-lg md:text-xl font-bold text-white">Practical #${practical.id}: ${escapeHtml(practical.title)}</h2>
            <div class="flex items-center gap-2">
              <span class="bg-[#2a2a2a] border border-[#3e484f] px-2.5 py-0.5 font-['JetBrains_Mono',monospace] text-xs text-[#bdc8d0] rounded">C# .NET</span>
              <span class="bg-[#702982]/20 border border-[#702982] px-2.5 py-0.5 font-['JetBrains_Mono',monospace] text-xs text-[#f4aeff] rounded">Difficulty: ${escapeHtml(practical.difficulty || 'Intermediate')}</span>
            </div>
          </div>
          <div class="space-y-3 text-sm text-[#bdc8d0] leading-relaxed">
            <p>${escapeHtml(practical.description || practical.codeExplanation)}</p>

            <h3 class="text-sm font-bold text-white mt-4 mb-2">Requirements & Algorithmic Steps:</h3>
            <ul class="list-disc pl-5 space-y-1 text-xs md:text-sm">
              ${(practical.algorithm || []).map(step => `
                <li><span class="text-[#e5e2e1]">${escapeHtml(step)}</span></li>
              `).join('')}
            </ul>
          </div>
        </div>
      </section>

      <!-- Section 3: Document-Style Code Block -->
      <section class="w-full bg-[#1e1e1e] border border-[#3e484f] rounded-lg shadow-[0_0_20px_rgba(0,0,0,0.5)] overflow-hidden">
        <div class="bg-[#2d2d30] border-b border-[#3e484f] px-4 py-2 flex items-center justify-between select-none">
          <div class="flex items-center gap-2">
            <i data-lucide="file-text" class="w-4 h-4 text-[#78d1ff]"></i>
            <span class="font-['JetBrains_Mono',monospace] text-xs font-bold text-[#bdc8d0]">Program.cs (Practical_${practical.id}.cs)</span>
          </div>
          <span class="text-[10px] text-[#bdc8d0]/60 font-['JetBrains_Mono',monospace]">JOURNAL FORMATTED</span>
        </div>
        <div class="p-4 md:p-6 font-['JetBrains_Mono',monospace] text-xs md:text-sm leading-relaxed text-[#d4d4d4] overflow-x-auto select-all">
          <pre><code>${highlightedCode}</code></pre>
        </div>
      </section>

      <!-- IDE Status Footer -->
      <footer class="h-8 bg-[#0e0e0e] border-t border-[#3e484f] flex items-center justify-between px-3 shrink-0 font-['JetBrains_Mono',monospace] text-xs text-[#bdc8d0] select-none rounded-b">
        <div class="text-[#f4aeff] font-bold">
          AI Engine: READY | Ln 1, Col 1 | UTF-8 | C#
        </div>
        <div class="flex items-center gap-4">
          <button id="btn-status-system" class="hover:text-[#78d1ff] transition-colors cursor-pointer">System Status</button>
          <button id="btn-status-feedback" class="hover:text-[#78d1ff] transition-colors cursor-pointer">Feedback</button>
          <button id="btn-status-docs" class="hover:text-[#78d1ff] transition-colors cursor-pointer">Docs</button>
        </div>
      </footer>
    </div>
  `;

  // Attach Action Events
  const btnCopy = container.querySelector('#btn-copy-full-code');
  const copyText = container.querySelector('#copy-full-text');
  if (btnCopy && copyText) {
    btnCopy.addEventListener('click', () => {
      navigator.clipboard.writeText(practical.code || '');
      copyText.textContent = 'Copied!';
      setTimeout(() => {
        copyText.textContent = 'Copy Full Code';
      }, 2000);
    });
  }

  const btnPrint = container.querySelector('#btn-print-export');
  if (btnPrint) {
    btnPrint.addEventListener('click', () => {
      window.print();
    });
  }
}

function highlightCSharp(code) {
  if (!code) return '';
  const escaped = escapeHtml(code);

  return escaped
    .replace(/\b(using|namespace|public|private|protected|internal|class|struct|interface|static|void|int|long|double|float|bool|string|char|byte|object|return|if|else|switch|case|break|for|foreach|while|do|try|catch|finally|throw|new|get|set|value|nameof)\b/g, '<span class="c-keyword">$1</span>')
    .replace(/\b(Console|Math|Convert|Array|List|String|Int32|Int64|Double|Boolean|DateTime|Exception|ArgumentOutOfRangeException|FactorialCalculator|Form|Button|TextBox|Label|ListBox|ComboBox|DataGridView|Form1)\b/g, '<span class="c-type">$1</span>')
    .replace(/(&quot;[\s\S]*?&quot;|&#039;[\s\S]*?&#039;)/g, '<span class="c-string">$1</span>')
    .replace(/(\/\/.*|\/\*[\s\S]*?\*\/)/g, '<span class="c-comment">$1</span>')
    .replace(/\b([A-Z][a-zA-Z0-9_]*)(?=\s*\()/g, '<span class="c-method">$1</span>')
    .replace(/\b(\d+)\b/g, '<span class="c-number">$1</span>');
}

function escapeHtml(str) {
  return (str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
