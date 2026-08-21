import { allPracticals, getPracticalById } from './practicalsData.js';

let currentPracticalId = 1;
let currentTab = 'code'; // 'code' | 'run' | 'dryrun'
let currentStepIndex = 0;
let isAutoPlaying = false;
let autoPlayTimer = null;
let searchQuery = '';
let selectedModule = 'All';

function init() {
  renderApp();
}

function renderApp() {
  const practical = getPracticalById(currentPracticalId);
  const filteredPracticals = filterPracticals();

  const appRoot = document.getElementById('app-root');
  if (!appRoot) return;

  appRoot.innerHTML = `
    <div class="flex h-screen w-screen bg-[#0b0f19] text-[#e5e7eb] font-['Hanken_Grotesk',sans-serif] overflow-hidden select-none">
      <!-- Sidebar Explorer Pane -->
      <aside class="w-72 bg-[#111827] border-r border-[#1f2937] flex flex-col shrink-0 overflow-hidden">
        <!-- Brand Header -->
        <div class="p-4 border-b border-[#1f2937] flex items-center justify-between bg-[#1f2937]/30">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-black font-black text-xs shadow-md">
              C#
            </div>
            <div>
              <h1 class="text-sm font-bold text-white tracking-wide">SharpSensei</h1>
              <p class="text-[10px] text-[#06b6d4] font-mono font-semibold">38 C# Practical Studio</p>
            </div>
          </div>
          <span class="text-[10px] font-bold bg-[#06b6d4]/10 text-[#06b6d4] border border-[#06b6d4]/30 px-2 py-0.5 rounded font-mono">
            38 READY
          </span>
        </div>

        <!-- Search Bar -->
        <div class="p-3 border-b border-[#1f2937]">
          <input
            type="text"
            id="search-input"
            value="${escapeHtml(searchQuery)}"
            placeholder="Search practicals..."
            class="w-full bg-[#0b0f19] border border-[#1f2937] text-xs text-white p-2 rounded focus:outline-none focus:border-[#06b6d4] font-mono"
          />
        </div>

        <!-- Module Filter Chips -->
        <div class="p-2 border-b border-[#1f2937] flex flex-wrap gap-1 bg-[#0b0f19]/40">
          ${['All', 'Module 1', 'Module 2', 'Module 3', 'Module 4'].map(m => `
            <button
              data-module="${m}"
              class="module-chip px-2 py-0.5 rounded text-[10px] font-bold border transition-colors ${
                selectedModule === m ? 'bg-[#06b6d4] text-black border-[#06b6d4]' : 'bg-[#1f2937]/50 text-[#9ca3af] border-[#1f2937] hover:text-white'
              }"
            >
              ${m}
            </button>
          `).join('')}
        </div>

        <!-- Practicals Scrollable Navigation List -->
        <div class="flex-1 overflow-y-auto p-2 space-y-1">
          ${filteredPracticals.map(p => {
            const isSelected = p.id === currentPracticalId;
            return `
              <div
                data-practical-id="${p.id}"
                class="practical-item p-2.5 rounded cursor-pointer border transition-all flex items-center justify-between ${
                  isSelected ? 'bg-[#06b6d4]/10 border-[#06b6d4] text-white' : 'bg-[#111827] border-[#1f2937] text-[#9ca3af] hover:border-[#374151] hover:text-white'
                }"
              >
                <div class="flex items-center gap-2 min-w-0">
                  <span class="w-6 h-6 rounded flex items-center justify-center font-mono text-xs font-bold shrink-0 ${
                    isSelected ? 'bg-[#06b6d4] text-black' : 'bg-[#1f2937] text-[#9ca3af]'
                  }">
                    #${p.id}
                  </span>
                  <span class="text-xs font-medium truncate">${escapeHtml(p.title)}</span>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </aside>

      <!-- Main Content Stage Area -->
      <main class="flex-1 flex flex-col overflow-hidden bg-[#0b0f19]">
        <!-- Top Workspace Bar -->
        <header class="h-14 border-b border-[#1f2937] bg-[#111827] px-6 flex items-center justify-between shrink-0 select-none">
          <div>
            <div class="flex items-center gap-2">
              <h2 class="text-base font-bold text-white">Practical #${practical.id}: ${escapeHtml(practical.title)}</h2>
              <span class="text-[10px] font-mono px-2 py-0.5 rounded border border-[#1f2937] bg-[#0b0f19] text-[#a855f7]">
                ${escapeHtml(practical.difficulty)}
              </span>
            </div>
            <p class="text-xs text-[#9ca3af] mt-0.5">${escapeHtml(practical.aim)}</p>
          </div>

          <!-- Main View Tabs -->
          <div class="flex items-center gap-1 bg-[#0b0f19] p-1 rounded border border-[#1f2937] font-mono text-xs font-bold">
            <button
              data-tab="code"
              class="tab-btn px-3 py-1.5 rounded transition-all flex items-center gap-1.5 cursor-pointer ${
                currentTab === 'code' ? 'bg-[#06b6d4] text-black shadow' : 'text-[#9ca3af] hover:text-white'
              }"
            >
              <span>📄 SOURCE CODE</span>
            </button>

            <button
              data-tab="run"
              class="tab-btn px-3 py-1.5 rounded transition-all flex items-center gap-1.5 cursor-pointer ${
                currentTab === 'run' ? 'bg-[#06b6d4] text-black shadow' : 'text-[#9ca3af] hover:text-white'
              }"
            >
              <span>▶ RUN OUTPUT</span>
            </button>

            <button
              data-tab="dryrun"
              class="tab-btn px-3 py-1.5 rounded transition-all flex items-center gap-1.5 cursor-pointer ${
                currentTab === 'dryrun' ? 'bg-[#06b6d4] text-black shadow' : 'text-[#9ca3af] hover:text-white'
              }"
            >
              <span>⚡ DRY RUN</span>
            </button>
          </div>
        </header>

        <!-- Stage Body View Container -->
        <div class="flex-1 overflow-y-auto p-6">
          ${renderTabContent(practical)}
        </div>
      </main>
    </div>
  `;

  attachEvents(container => renderApp());
}

function renderTabContent(practical) {
  if (currentTab === 'code') {
    const lines = (practical.code || '').split('\n');
    const highlightedCode = highlightCSharp(practical.code || '');

    return `
      <div class="space-y-4 max-w-5xl mx-auto">
        <!-- Action Toolbar -->
        <div class="flex justify-between items-center bg-[#111827] p-3 rounded border border-[#1f2937] shadow-sm select-none">
          <div class="font-mono text-xs text-[#06b6d4] font-bold flex items-center gap-2">
            <span>Program.cs</span>
            <span class="text-[10px] text-[#9ca3af] border border-[#1f2937] px-2 py-0.5 rounded">JOURNAL READY</span>
          </div>
          <div class="flex items-center gap-2 font-mono text-xs">
            <button id="btn-copy-code" class="bg-[#06b6d4] text-black px-3 py-1.5 rounded font-bold hover:bg-[#0891b2] transition-colors shadow flex items-center gap-1 cursor-pointer">
              <span id="copy-text">Copy Code</span>
            </button>
            <button id="btn-print-export" class="border border-[#1f2937] text-white px-3 py-1.5 rounded font-bold hover:bg-[#1f2937] transition-colors flex items-center gap-1 cursor-pointer">
              <span>Print / Export</span>
            </button>
          </div>
        </div>

        <!-- Document Code Block -->
        <div class="bg-[#0e131f] border border-[#1f2937] rounded-lg overflow-hidden shadow-2xl flex select-all">
          <!-- Line Numbers Column -->
          <div class="w-12 bg-[#111827] border-r border-[#1f2937] text-[#4b5563] text-right pr-3 py-4 font-mono text-xs select-none leading-relaxed shrink-0">
            ${Array.from({ length: lines.length }, (_, i) => `<div>${i + 1}</div>`).join('')}
          </div>
          <!-- Syntax Highlighted Code -->
          <pre class="flex-1 p-4 font-mono text-xs text-[#e5e7eb] leading-relaxed overflow-x-auto m-0"><code class="block font-mono">${highlightedCode}</code></pre>
        </div>
      </div>
    `;
  }

  if (currentTab === 'run') {
    return `
      <div class="max-w-4xl mx-auto space-y-4 font-mono text-xs select-none">
        <div class="bg-[#111827] border border-[#1f2937] rounded-lg p-4 shadow-xl space-y-4">
          <div class="flex items-center justify-between border-b border-[#1f2937] pb-3">
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-[#10b981] inline-block animate-pulse"></span>
              <span class="font-bold text-white uppercase">Live Execution Output Terminal</span>
            </div>
            <span class="text-[10px] text-[#10b981] bg-[#10b981]/10 border border-[#10b981]/30 px-2 py-0.5 rounded">STATUS: RUNNING</span>
          </div>

          <!-- Console Output Window -->
          <div class="bg-[#070a11] border border-[#1f2937] p-4 rounded text-[#10b981] leading-relaxed overflow-x-auto font-mono min-h-[220px]">
            <pre class="m-0 leading-relaxed"><code>${escapeHtml(practical.expectedOutput)}</code></pre>
          </div>

          <div class="p-3 bg-[#0b0f19] border border-[#1f2937] rounded text-[#9ca3af] text-xs leading-relaxed">
            💡 <strong>Runtime Execution Note</strong>: Practical #${practical.id} compiled and executed successfully. Form components and delegates initialized.
          </div>
        </div>
      </div>
    `;
  }

  if (currentTab === 'dryrun') {
    const steps = practical.traceSteps && practical.traceSteps.length > 0 ? practical.traceSteps : [
      { line: 1, explanation: 'Initializing method call context...', variables: {} }
    ];

    if (currentStepIndex >= steps.length) currentStepIndex = 0;
    const currentStep = steps[currentStepIndex];

    return `
      <div class="max-w-5xl mx-auto space-y-4 font-mono text-xs select-none">
        <div class="bg-[#111827] border border-[#1f2937] rounded-lg p-4 shadow-xl space-y-4">
          <!-- Stepper Header Controls -->
          <div class="flex items-center justify-between border-b border-[#1f2937] pb-3 flex-wrap gap-2">
            <div class="flex items-center gap-2">
              <span class="text-[#f59e0b] font-bold">⚡ DRY RUN DEBUGGER</span>
              <span class="text-[#9ca3af] text-[11px]">(Step ${currentStepIndex + 1}/${steps.length})</span>
            </div>

            <div class="flex items-center gap-2">
              <button id="btn-step-prev" ${currentStepIndex === 0 ? 'disabled' : ''} class="px-3 py-1.5 rounded border border-[#1f2937] text-white hover:bg-[#1f2937] disabled:opacity-30 cursor-pointer font-bold">
                ◄ Prev Step
              </button>
              <button id="btn-step-play" class="px-3 py-1.5 rounded border border-[#06b6d4] text-[#06b6d4] hover:bg-[#06b6d4]/10 cursor-pointer font-bold">
                ${isAutoPlaying ? '⏸ Pause' : '▶ Auto Step'}
              </button>
              <button id="btn-step-next" ${currentStepIndex === steps.length - 1 ? 'disabled' : ''} class="px-3 py-1.5 rounded border border-[#1f2937] text-white hover:bg-[#1f2937] disabled:opacity-30 cursor-pointer font-bold">
                Next Step ►
              </button>
            </div>
          </div>

          <!-- Trace Table -->
          <div class="bg-[#070a11] border border-[#1f2937] rounded overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="border-b border-[#1f2937] text-[#9ca3af] text-[11px] uppercase">
                  <th class="p-3 w-20">Line #</th>
                  <th class="p-3">Execution Statement & Operation</th>
                  <th class="p-3 text-right">Variable Inspector</th>
                </tr>
              </thead>
              <tbody>
                ${steps.map((step, idx) => {
                  const isCurrent = idx === currentStepIndex;
                  return `
                    <tr class="border-b border-[#1f2937]/50 transition-colors ${
                      isCurrent ? 'bg-[#f59e0b]/15 text-white border-l-4 border-[#f59e0b]' : 'text-[#9ca3af]'
                    }">
                      <td class="p-3 font-bold ${isCurrent ? 'text-[#f59e0b]' : ''}">${step.line}</td>
                      <td class="p-3 ${isCurrent ? 'text-white font-bold' : ''}">${escapeHtml(step.explanation)}</td>
                      <td class="p-3 text-right">
                        <div class="flex justify-end gap-1.5 flex-wrap">
                          ${Object.entries(step.variables || {}).map(([k, v]) => `
                            <span class="px-2 py-0.5 rounded text-[10px] bg-[#111827] border ${isCurrent ? 'border-[#f59e0b] text-[#f59e0b]' : 'border-[#1f2937] text-[#a855f7]'}">
                              ${k} = ${escapeHtml(String(v))}
                            </span>
                          `).join('')}
                        </div>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }
}

function filterPracticals() {
  return allPracticals.filter(p => {
    const matchesSearch = !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.id.toString() === searchQuery;
    const matchesModule = selectedModule === 'All' || p.module.toLowerCase().includes(selectedModule.toLowerCase());
    return matchesSearch && matchesModule;
  });
}

function attachEvents(reRender) {
  // Practical Item Click
  document.querySelectorAll('.practical-item').forEach(item => {
    item.addEventListener('click', () => {
      currentPracticalId = Number(item.getAttribute('data-practical-id'));
      currentStepIndex = 0;
      reRender();
    });
  });

  // Tab Click
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      currentTab = btn.getAttribute('data-tab');
      reRender();
    });
  });

  // Module Chip Filter
  document.querySelectorAll('.module-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      selectedModule = chip.getAttribute('data-module');
      reRender();
    });
  });

  // Search Input
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      reRender();
    });
  }

  // Copy Code Button
  const btnCopy = document.getElementById('btn-copy-code');
  const copyText = document.getElementById('copy-text');
  if (btnCopy && copyText) {
    btnCopy.addEventListener('click', () => {
      const p = getPracticalById(currentPracticalId);
      navigator.clipboard.writeText(p.code || '');
      copyText.textContent = 'Copied!';
      setTimeout(() => {
        copyText.textContent = 'Copy Code';
      }, 2000);
    });
  }

  // Print Export Button
  const btnPrint = document.getElementById('btn-print-export');
  if (btnPrint) {
    btnPrint.addEventListener('click', () => {
      window.print();
    });
  }

  // Stepper Controls
  const btnPrev = document.getElementById('btn-step-prev');
  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      if (currentStepIndex > 0) {
        currentStepIndex--;
        reRender();
      }
    });
  }

  const btnNext = document.getElementById('btn-step-next');
  if (btnNext) {
    btnNext.addEventListener('click', () => {
      const p = getPracticalById(currentPracticalId);
      if (currentStepIndex < (p.traceSteps || []).length - 1) {
        currentStepIndex++;
        reRender();
      }
    });
  }

  const btnPlay = document.getElementById('btn-step-play');
  if (btnPlay) {
    btnPlay.addEventListener('click', () => {
      isAutoPlaying = !isAutoPlaying;
      if (isAutoPlaying) {
        autoPlayTimer = setInterval(() => {
          const p = getPracticalById(currentPracticalId);
          const maxSteps = (p.traceSteps || []).length;
          if (currentStepIndex < maxSteps - 1) {
            currentStepIndex++;
            reRender();
          } else {
            isAutoPlaying = false;
            clearInterval(autoPlayTimer);
            reRender();
          }
        }, 1200);
      } else {
        clearInterval(autoPlayTimer);
      }
      reRender();
    });
  }
}

function highlightCSharp(code) {
  if (!code) return '';
  const escaped = escapeHtml(code);
  return escaped
    .replace(/\b(using|namespace|public|private|protected|internal|class|struct|interface|static|void|int|long|double|float|bool|string|char|byte|object|return|if|else|switch|case|break|for|foreach|while|do|try|catch|finally|throw|new|get|set|value|nameof)\b/g, '<span class="c-keyword">$1</span>')
    .replace(/\b(Console|Math|Convert|Array|List|String|Int32|Int64|Double|Boolean|DateTime|Exception|Form|Button|TextBox|Label|ListBox|ComboBox|DataGridView)\b/g, '<span class="c-type">$1</span>')
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

document.addEventListener('DOMContentLoaded', init);
