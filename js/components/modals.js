import { appState } from '../appState.js';
import { themes } from '../themeEngine.js';
import { quizQuestionsList } from '../data/vivaData.js';
import { cheatsheetCategories } from '../data/cheatsheetData.js';
import { allPracticals } from '../data/practicalsData.js';

export function renderModals(container) {
  const { themeConfig, isThemeModalOpen, isQuizOpen, isCheatsheetOpen, isLabRecordOpen } = appState;

  let modalHtml = '';

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
  if (isThemeModalOpen) wireThemeModalEvents(container);
  if (isQuizOpen) wireQuizModalEvents(container);
  if (isCheatsheetOpen) wireCheatsheetModalEvents(container);
  if (isLabRecordOpen) wireLabRecordModalEvents(container);
}

// 1. Theme Selector Modal
function renderThemeModalMarkup(themeConfig) {
  return `
    <div class="fixed inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 z-50 select-none">
      <div class="w-full max-w-3xl ${themeConfig.cardSubBg} border ${themeConfig.borderColor} rounded-sm shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        <div class="p-4 border-b ${themeConfig.borderColor} ${themeConfig.headerBg} flex items-center justify-between">
          <div class="flex items-center gap-2">
            <i data-lucide="palette" class="w-4 h-4 text-cyan-400"></i>
            <h3 class="text-xs font-bold ${themeConfig.textHeading} uppercase tracking-wider">Select IDE Visual Theme Engine</h3>
          </div>
          <button id="modal-close-theme" class="p-1 text-slate-400 hover:text-white cursor-pointer"><i data-lucide="x" class="w-4 h-4"></i></button>
        </div>

        <div class="p-4 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          ${Object.values(themes).map(t => `
            <div
              data-select-theme-id="${t.id}"
              class="border ${appState.currentTheme === t.id ? 'border-cyan-400 ring-2 ring-cyan-500/20' : themeConfig.borderColor} ${t.appBg} p-3 rounded-sm hover:border-cyan-400 transition-all cursor-pointer space-y-2 group"
            >
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold ${t.textHeading}">${t.name}</span>
                <span class="w-3 h-3 rounded-full border border-white/20" style="background-color: ${t.previewColor}"></span>
              </div>
              <p class="text-[10px] ${t.textColor} line-clamp-2">${t.description}</p>
              <div class="flex items-center justify-between text-[9px] ${t.textMuted} pt-1">
                <span>${t.category.toUpperCase()}</span>
                ${appState.currentTheme === t.id ? '<span class="text-cyan-400 font-bold">ACTIVE</span>' : ''}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function wireThemeModalEvents(container) {
  container.querySelector('#modal-close-theme')?.addEventListener('click', () => {
    appState.setThemeModalOpen(false);
  });

  container.querySelectorAll('[data-select-theme-id]').forEach(card => {
    card.addEventListener('click', () => {
      const themeId = card.getAttribute('data-select-theme-id');
      appState.setTheme(themeId);
      appState.setThemeModalOpen(false);
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
          ${quizQuestionsList.map((q, idx) => `
            <div class="p-3 bg-slate-900/60 border ${themeConfig.borderColor} rounded-sm space-y-2">
              <div class="text-xs font-bold ${themeConfig.textHeading}">
                Q${idx + 1}. ${q.question}
              </div>

              <div class="space-y-1.5 pt-1">
                ${q.options.map(opt => {
                  const isSelected = quizUserAnswers[q.id] === opt;
                  let optStyle = `border ${themeConfig.borderColor} ${themeConfig.cardBg} ${themeConfig.textHeading}`;
                  if (quizSubmitted) {
                    if (opt === q.correctAnswer) optStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold';
                    else if (isSelected && opt !== q.correctAnswer) optStyle = 'bg-rose-500/20 border-rose-500 text-rose-300';
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
          `).join('')}
        </div>

        <div class="p-3 border-t ${themeConfig.borderColor} ${themeConfig.headerBg} flex items-center justify-between">
          <div id="quiz-score-badge" class="text-xs font-bold text-cyan-400">
            ${quizSubmitted ? `Score: ${calculateQuizScore()} / ${quizQuestionsList.length}` : 'Answer all questions then click Evaluate.'}
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
  quizQuestionsList.forEach(q => {
    if (quizUserAnswers[q.id] === q.correctAnswer) score++;
  });
  return score;
}

function wireQuizModalEvents(container) {
  container.querySelector('#modal-close-quiz')?.addEventListener('click', () => {
    appState.setQuizOpen(false);
  });

  quizQuestionsList.forEach(q => {
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

        <div class="p-4 overflow-y-auto space-y-6">
          ${cheatsheetCategories.map(cat => `
            <div class="space-y-3">
              <h4 class="text-xs font-bold text-cyan-400 uppercase tracking-wider border-b ${themeConfig.borderColor} pb-1 flex items-center gap-2">
                <span>${cat.title}</span>
              </h4>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                ${cat.items.map(item => `
                  <div class="p-3 bg-slate-900 border ${themeConfig.borderColor} rounded-sm space-y-1.5 font-mono text-xs">
                    <div class="flex items-center justify-between text-emerald-400 font-bold">
                      <span>${item.name}</span>
                      <span class="text-[9px] px-1 bg-white/10 rounded text-slate-300 font-sans">${item.category}</span>
                    </div>
                    <pre class="bg-slate-950 p-2 rounded text-[10px] text-cyan-300 overflow-x-auto border border-slate-800"><code>${escapeHtml(item.syntax)}</code></pre>
                    <p class="text-[11px] text-slate-400 font-sans">${escapeHtml(item.description)}</p>
                  </div>
                `).join('')}
              </div>
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

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
