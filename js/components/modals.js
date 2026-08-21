import { appState } from '../appState.js';
import { themes } from '../themeEngine.js';
import { mockQuizQuestions } from '../data/vivaData.js';
import { cheatsheetItems } from '../data/cheatsheetData.js';
import { allPracticals } from '../data/practicalsData.js';

export function renderModals(container) {
  const { themeConfig, isThemeModalOpen, isQuizOpen, isCheatsheetOpen, isLabRecordOpen, isResetConfirmOpen } = appState;

  let modalHtml = '';

  if (isResetConfirmOpen) {
    modalHtml += renderConfirmationModalMarkup(themeConfig);
  }

  if (isThemeModalOpen) {
    modalHtml += renderThemeModalMarkup(themeConfig);
  }

  if (isQuizOpen) {
    modalHtml += renderQuizModalMarkup(themeConfig);
  }

  if (isCheatsheetOpen) {
    modalHtml += renderCheatsheetModalMarkup(themeConfig);
  }

  if (isLabRecordOpen) {
    modalHtml += renderLabRecordModalMarkup(themeConfig);
  }

  container.innerHTML = modalHtml;

  // Attach Event Listeners
  if (isResetConfirmOpen) wireConfirmationModalEvents(container);
  if (isThemeModalOpen) wireThemeModalEvents(container);
  if (isQuizOpen) wireQuizModalEvents(container);
  if (isCheatsheetOpen) wireCheatsheetModalEvents(container);
  if (isLabRecordOpen) wireLabRecordModalEvents(container);
}

// 1. Settings & Theme Selector Modal
function renderThemeModalMarkup(themeConfig) {
  return `
    <div class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 select-none font-['Hanken_Grotesk',sans-serif]">
      <!-- Settings Card -->
      <div class="bg-[#131313] border border-[#3e484f] w-full max-w-2xl shadow-2xl flex flex-col max-h-[90vh] rounded-lg overflow-hidden">
        <!-- Header -->
        <div class="flex items-center justify-between p-4 border-b border-[#3e484f] bg-[#202020]">
          <div class="flex items-center gap-2">
            <i data-lucide="settings" class="w-5 h-5 text-[#78d1ff]"></i>
            <h2 class="text-lg font-bold text-white">Settings</h2>
          </div>
          <button id="modal-close-theme" class="text-[#bdc8d0] hover:text-white transition-colors cursor-pointer p-1 rounded hover:bg-[#393939] flex items-center justify-center">
            <i data-lucide="x" class="w-4 h-4"></i>
          </button>
        </div>

        <!-- Content Area -->
        <div class="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          <!-- Top Tab Navigation -->
          <nav class="flex items-center gap-4 border-b border-[#3e484f] w-full overflow-x-auto">
            <button class="whitespace-nowrap pb-2 px-2 font-['JetBrains_Mono',monospace] text-xs font-bold text-[#78d1ff] border-b-2 border-[#78d1ff]">
              Appearance
            </button>
            <button class="whitespace-nowrap pb-2 px-2 font-['JetBrains_Mono',monospace] text-xs text-[#bdc8d0] hover:text-white border-b-2 border-transparent transition-colors">
              Editor
            </button>
            <button class="whitespace-nowrap pb-2 px-2 font-['JetBrains_Mono',monospace] text-xs text-[#bdc8d0] hover:text-white border-b-2 border-transparent transition-colors">
              Keymap
            </button>
            <button class="whitespace-nowrap pb-2 px-2 font-['JetBrains_Mono',monospace] text-xs text-[#bdc8d0] hover:text-white border-b-2 border-transparent transition-colors">
              Extensions
            </button>
          </nav>

          <!-- Settings Content (Main Pane) -->
          <div class="flex flex-col gap-6 items-center">
            <!-- Theme Selection Section -->
            <section class="w-full">
              <h3 class="text-sm font-bold text-white mb-3 text-center">Color Theme</h3>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
                ${Object.values(themes).map(t => {
                  const isSelected = appState.currentTheme === t.id;
                  return `
                    <div
                      data-select-theme-id="${t.id}"
                      class="border ${isSelected ? 'border-2 border-[#78d1ff] bg-[#202020]' : 'border-[#3e484f] bg-[#131313] hover:border-[#bdc8d0]'} p-3 cursor-pointer rounded transition-all group relative"
                    >
                      <div class="h-20 w-full bg-[#1E1E1E] border border-[#3e484f] mb-2 relative overflow-hidden rounded-xs">
                        <div class="absolute inset-0 p-1 flex flex-col gap-1" style="background-color: ${t.previewColor}15">
                          <div class="h-2 w-full bg-[#393939] rounded-xs"></div>
                          <div class="flex gap-1 flex-1">
                            <div class="w-1/4 h-full bg-[#202020] rounded-xs"></div>
                            <div class="w-3/4 h-full bg-[#131313] p-1 flex flex-col gap-1 rounded-xs">
                              <div class="h-1 w-2/3 rounded-xs" style="background-color: ${t.previewColor}"></div>
                              <div class="h-1 w-1/2 rounded-xs" style="background-color: ${t.previewColor}80"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="flex items-center justify-between">
                        <span class="font-['JetBrains_Mono',monospace] text-xs font-bold ${isSelected ? 'text-white' : 'text-[#bdc8d0] group-hover:text-white'}">${escapeHtml(t.name)}</span>
                        ${isSelected ? `<i data-lucide="check-circle-2" class="w-4 h-4 text-[#78d1ff]"></i>` : ''}
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </section>

            <div class="h-px w-full bg-[#3e484f]"></div>

            <!-- Font Settings Section -->
            <section class="w-full">
              <h3 class="text-sm font-bold text-white mb-3 text-center">Font Settings</h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                <label class="flex flex-col gap-1">
                  <span class="font-['JetBrains_Mono',monospace] text-xs text-[#bdc8d0]">Editor Font Family</span>
                  <input class="bg-[#0e0e0e] border border-[#3e484f] text-white font-['JetBrains_Mono',monospace] text-xs p-2.5 rounded focus:outline-none focus:border-[#78d1ff]" type="text" value="JetBrains Mono"/>
                </label>
                <label class="flex flex-col gap-1">
                  <span class="font-['JetBrains_Mono',monospace] text-xs text-[#bdc8d0]">Font Size</span>
                  <input class="bg-[#0e0e0e] border border-[#3e484f] text-white font-['JetBrains_Mono',monospace] text-xs p-2.5 rounded focus:outline-none focus:border-[#78d1ff]" type="number" value="14"/>
                </label>
              </div>
            </section>
          </div>
        </div>

        <!-- Footer Actions -->
        <div class="p-4 border-t border-[#3e484f] bg-[#202020] flex justify-end gap-2">
          <button id="modal-cancel-theme" class="px-4 py-1.5 border border-[#3e484f] text-white hover:bg-[#393939] transition-colors font-['JetBrains_Mono',monospace] text-xs rounded cursor-pointer">
            Cancel
          </button>
          <button id="modal-apply-theme" class="px-4 py-1.5 bg-[#00a3d9] text-black font-['JetBrains_Mono',monospace] text-xs font-bold hover:bg-[#008fbf] transition-opacity rounded cursor-pointer shadow">
            Apply
          </button>
        </div>
      </div>
    </div>
  `;
}

function wireThemeModalEvents(container) {
  const closeBtn = container.querySelector('#modal-close-theme');
  if (closeBtn) closeBtn.addEventListener('click', () => appState.setThemeModalOpen(false));

  const cancelBtn = container.querySelector('#modal-cancel-theme');
  if (cancelBtn) cancelBtn.addEventListener('click', () => appState.setThemeModalOpen(false));

  const applyBtn = container.querySelector('#modal-apply-theme');
  if (applyBtn) applyBtn.addEventListener('click', () => appState.setThemeModalOpen(false));

  container.querySelectorAll('[data-select-theme-id]').forEach(card => {
    card.addEventListener('click', () => {
      const themeId = card.getAttribute('data-select-theme-id');
      appState.setTheme(themeId);
    });
  });
}


// 2. Quiz Practice Modal
let quizUserAnswers = {};
let quizSubmitted = false;

function renderQuizModalMarkup(themeConfig) {
  return `
    <div class="fixed inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 z-50 select-none">
      <div class="w-full max-w-2xl ${themeConfig.cardSubBg} border ${themeConfig.borderColor} rounded-sm shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        <div class="p-4 border-b ${themeConfig.borderColor} ${themeConfig.headerBg} flex items-center justify-between">
          <div class="flex items-center gap-2">
            <i data-lucide="help-circle" class="w-4 h-4 text-emerald-400"></i>
            <h3 class="text-xs font-bold ${themeConfig.textHeading} uppercase tracking-wider">BCA Sem-5 Exam Practice Quiz (10 Questions)</h3>
          </div>
          <button id="modal-close-quiz" class="p-1 text-slate-400 hover:text-white cursor-pointer"><i data-lucide="x" class="w-4 h-4"></i></button>
        </div>

        <div class="p-4 overflow-y-auto space-y-4">
          ${mockQuizQuestions.map((q, idx) => {
    const correctOpt = q.options[q.correctIndex];
    return `
              <div class="p-3 bg-slate-900/60 border ${themeConfig.borderColor} rounded-sm space-y-2">
                <div class="text-xs font-bold ${themeConfig.textHeading}">
                  Q${idx + 1}. ${q.question}
                </div>

                <div class="space-y-1.5 pt-1">
                  ${q.options.map(opt => {
      const isSelected = quizUserAnswers[q.id] === opt;
      let optStyle = `border ${themeConfig.borderColor} ${themeConfig.cardBg} ${themeConfig.textHeading}`;
      if (quizSubmitted) {
        if (opt === correctOpt) optStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold';
        else if (isSelected && opt !== correctOpt) optStyle = 'bg-rose-500/20 border-rose-500 text-rose-300';
      } else if (isSelected) {
        optStyle = 'bg-cyan-500/20 border-cyan-500 text-cyan-300 font-bold';
      }

      return `
                      <label class="p-2 rounded-sm text-xs flex items-center gap-2 cursor-pointer ${optStyle}">
                        <input type="radio" name="quiz-q-${q.id}" value="${escapeHtml(opt)}" ${isSelected ? 'checked' : ''} ${quizSubmitted ? 'disabled' : ''} />
                        <span>${escapeHtml(opt)}</span>
                      </label>
                    `;
    }).join('')}
                </div>

                ${quizSubmitted ? `
                  <div class="p-2 bg-black/40 rounded text-[10px] text-slate-400 border border-slate-800">
                    💡 <strong>Explanation</strong>: ${escapeHtml(q.explanation)}
                  </div>
                ` : ''}
              </div>
            `;
  }).join('')}
        </div>

        <div class="p-3 border-t ${themeConfig.borderColor} ${themeConfig.headerBg} flex items-center justify-between">
          <div id="quiz-score-badge" class="text-xs font-bold text-cyan-400">
            ${quizSubmitted ? `Score: ${calculateQuizScore()} / ${mockQuizQuestions.length}` : 'Answer all questions then click Evaluate.'}
          </div>
          <div class="flex gap-2">
            <button id="btn-quiz-reset" class="px-3 py-1.5 rounded text-xs font-bold border ${themeConfig.borderColor} ${themeConfig.textMuted} hover:text-white">
              Reset
            </button>
            <button id="btn-quiz-submit" ${quizSubmitted ? 'disabled' : ''} class="px-4 py-1.5 rounded text-xs font-black bg-emerald-500 text-black hover:bg-emerald-400 uppercase">
              Evaluate Exam Answers
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function calculateQuizScore() {
  let score = 0;
  mockQuizQuestions.forEach(q => {
    const correctOpt = q.options[q.correctIndex];
    if (quizUserAnswers[q.id] === correctOpt) score++;
  });
  return score;
}

function wireQuizModalEvents(container) {
  container.querySelector('#modal-close-quiz')?.addEventListener('click', () => {
    appState.setQuizOpen(false);
  });

  mockQuizQuestions.forEach(q => {
    container.querySelectorAll(`input[name="quiz-q-${q.id}"]`).forEach(radio => {
      radio.addEventListener('change', () => {
        quizUserAnswers[q.id] = radio.value;
      });
    });
  });

  container.querySelector('#btn-quiz-submit')?.addEventListener('click', () => {
    quizSubmitted = true;
    renderModals(container);
  });

  container.querySelector('#btn-quiz-reset')?.addEventListener('click', () => {
    quizUserAnswers = {};
    quizSubmitted = false;
    renderModals(container);
  });
}

// 3. Cheatsheet Modal
function renderCheatsheetModalMarkup(themeConfig) {
  return `
    <div class="fixed inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 z-50 select-none">
      <div class="w-full max-w-4xl ${themeConfig.cardSubBg} border ${themeConfig.borderColor} rounded-sm shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        <div class="p-4 border-b ${themeConfig.borderColor} ${themeConfig.headerBg} flex items-center justify-between">
          <div class="flex items-center gap-2">
            <i data-lucide="file-text" class="w-4 h-4 text-cyan-400"></i>
            <h3 class="text-xs font-bold ${themeConfig.textHeading} uppercase tracking-wider">C# WinForms & ADO.NET Rapid Reference Cheatsheet</h3>
          </div>
          <button id="modal-close-cheatsheet" class="p-1 text-slate-400 hover:text-white cursor-pointer"><i data-lucide="x" class="w-4 h-4"></i></button>
        </div>

        <div class="p-4 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-3">
          ${cheatsheetItems.map(item => `
            <div class="p-3 bg-slate-900 border ${themeConfig.borderColor} rounded-sm space-y-2 font-mono text-xs">
              <div class="flex items-center justify-between text-emerald-400 font-bold">
                <span>${escapeHtml(item.title)}</span>
                <span class="text-[9px] px-1 bg-white/10 rounded text-slate-300 font-sans">${escapeHtml(item.category)}</span>
              </div>
              <div class="text-[11px] text-cyan-300 font-bold font-sans">${escapeHtml(item.syntax)}</div>
              <p class="text-[11px] text-slate-400 font-sans">${escapeHtml(item.description)}</p>
              ${item.example ? `
                <pre class="bg-slate-950 p-2 rounded text-[10px] text-slate-300 overflow-x-auto border border-slate-800"><code>${escapeHtml(item.example)}</code></pre>
              ` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function wireCheatsheetModalEvents(container) {
  container.querySelector('#modal-close-cheatsheet')?.addEventListener('click', () => {
    appState.setCheatsheetOpen(false);
  });
}

// 4. Lab Record Printable Manual Modal
function renderLabRecordModalMarkup(themeConfig) {
  return `
    <div class="fixed inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 z-50 select-none">
      <div class="w-full max-w-4xl ${themeConfig.cardSubBg} border ${themeConfig.borderColor} rounded-sm shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        <div class="p-4 border-b ${themeConfig.borderColor} ${themeConfig.headerBg} flex items-center justify-between">
          <div class="flex items-center gap-2">
            <i data-lucide="book-open" class="w-4 h-4 text-amber-400"></i>
            <h3 class="text-xs font-bold ${themeConfig.textHeading} uppercase tracking-wider">Printable BCA Sem-5 Practical Manual</h3>
          </div>
          <div class="flex items-center gap-2">
            <button id="btn-print-labrecord" class="px-3 py-1 bg-amber-500 text-black font-bold rounded text-xs uppercase cursor-pointer">
              🖨️ Print Record
            </button>
            <button id="modal-close-labrecord" class="p-1 text-slate-400 hover:text-white cursor-pointer"><i data-lucide="x" class="w-4 h-4"></i></button>
          </div>
        </div>

        <div id="printable-manual-area" class="p-6 overflow-y-auto space-y-6 bg-slate-950 text-slate-100 font-sans text-xs">
          <div class="text-center space-y-1 border-b border-slate-800 pb-4">
            <h1 class="text-lg font-black tracking-wider text-cyan-400 uppercase">Bachelor of Computer Applications (BCA) - Semester 5</h1>
            <h2 class="text-xs font-bold text-slate-300 uppercase">Visual Studio C# GUI & ADO.NET Practical Index (Practicals 1 - 38)</h2>
          </div>

          <div class="space-y-4">
            ${allPracticals.map(p => `
              <div class="border border-slate-800 p-4 rounded bg-slate-900 space-y-2">
                <div class="flex items-center justify-between font-bold text-cyan-300">
                  <span>PRACTICAL #${p.id}: ${p.title}</span>
                  <span class="text-[10px] text-slate-400 font-mono">${p.module}</span>
                </div>
                <p class="text-slate-300"><strong>AIM</strong>: ${p.aim}</p>
                <div class="bg-slate-950 p-2.5 rounded font-mono text-[10px] text-slate-300 overflow-x-auto border border-slate-800">
                  <pre><code>${escapeHtml(p.code.split('\n').slice(0, 15).join('\n'))}\n// ... [Complete source code in IDE]</code></pre>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

function wireLabRecordModalEvents(container) {
  container.querySelector('#modal-close-labrecord')?.addEventListener('click', () => {
    appState.setLabRecordOpen(false);
  });

  container.querySelector('#btn-print-labrecord')?.addEventListener('click', () => {
    window.print();
  });
}

// 5. Confirmation & Reset Modal
function renderConfirmationModalMarkup(themeConfig) {
  return `
    <div class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 select-none font-['Hanken_Grotesk',sans-serif]">
      <!-- Modal Card -->
      <div class="bg-[#202020] border border-[#3e484f] w-full max-w-[480px] shadow-2xl flex flex-col rounded-lg overflow-hidden">
        <!-- Header -->
        <div class="flex items-center justify-between p-4 border-b border-[#3e484f] bg-[#2a2a2a]">
          <div class="flex items-center gap-2 text-[#ffb4ab]">
            <i data-lucide="alert-triangle" class="w-5 h-5 text-[#ffb4ab]"></i>
            <h2 class="text-lg font-bold text-white m-0">Reset Progress?</h2>
          </div>
          <button id="modal-close-confirm" class="text-[#bdc8d0] hover:text-white transition-colors cursor-pointer p-1 rounded hover:bg-[#393939] flex items-center justify-center">
            <i data-lucide="x" class="w-4 h-4"></i>
          </button>
        </div>
        <!-- Body Content -->
        <div class="p-6 bg-[#131313]">
          <p class="text-sm text-[#bdc8d0] m-0 leading-relaxed">
            Are you sure you want to reset your lab progress? This action will clear all current editor states and revert to the initial checkpoint.
          </p>
          <div class="mt-4 p-3 bg-[#93000a]/20 border border-[#ffb4ab]/30 rounded flex items-start gap-2.5">
            <i data-lucide="info" class="w-4 h-4 text-[#ffb4ab] shrink-0 mt-0.5"></i>
            <p class="font-['JetBrains_Mono',monospace] text-xs text-[#ffb4ab] m-0 leading-relaxed">
              This action cannot be undone. Local cache will be purged.
            </p>
          </div>
        </div>
        <!-- Footer Actions -->
        <div class="p-6 border-t border-[#3e484f] bg-[#2a2a2a] flex flex-col gap-3">
          <!-- Primary Solid Cyan Button -->
          <button id="modal-btn-execute-reset" class="w-full font-['JetBrains_Mono',monospace] text-xs h-11 px-4 bg-[#00a3d9] text-[#0e0e0e] hover:bg-[#008fbf] transition-all uppercase tracking-wider cursor-pointer font-bold rounded shadow">
            Reset
          </button>
          <!-- Secondary Outline Button -->
          <button id="modal-btn-cancel-reset" class="w-full font-['JetBrains_Mono',monospace] text-xs h-11 px-4 bg-transparent border border-[#3e484f] text-white hover:bg-[#393939] transition-colors uppercase tracking-wider cursor-pointer rounded font-bold">
            Cancel
          </button>
        </div>
      </div>
    </div>
  `;
}

function wireConfirmationModalEvents(container) {
  const closeBtn = container.querySelector('#modal-close-confirm');
  if (closeBtn) closeBtn.addEventListener('click', () => appState.setResetConfirmOpen(false));

  const cancelBtn = container.querySelector('#modal-btn-cancel-reset');
  if (cancelBtn) cancelBtn.addEventListener('click', () => appState.setResetConfirmOpen(false));

  const resetBtn = container.querySelector('#modal-btn-execute-reset');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      appState.resetProgress();
    });
  }
}

function escapeHtml(str) {
  return (str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

