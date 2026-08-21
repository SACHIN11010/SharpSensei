import { appState } from '../appState.js';
import { layoutOptions } from '../themeEngine.js';

export function renderNavbar(container) {
  const { themeConfig, currentLayout, completedIds, isAiTutorOpen } = appState;
  const totalCount = 38;
  const completedCount = completedIds.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  container.innerHTML = `
    <header class="bg-[#131313] text-[#78d1ff] font-['Hanken_Grotesk',sans-serif] fixed top-0 w-full z-50 h-12 border-b border-[#3e484f] transition-colors duration-150 flex justify-between items-center px-4 shrink-0 select-none">
      <!-- Left: Brand Logo & Title -->
      <div class="flex items-center gap-3">
        <div class="flex items-center gap-3 cursor-pointer" id="btn-brand-home">
          <div class="w-8 h-8 rounded bg-gradient-to-br from-cyan-500 to-emerald-400 flex items-center justify-center text-black font-black text-xs shadow-md">
            C#
          </div>
          <span class="font-['Hanken_Grotesk',sans-serif] text-lg font-bold text-[#78d1ff]">SharpSensei</span>
        </div>

        <!-- 38 Practicals Loaded Badge -->
        <div class="hidden md:flex items-center bg-[#2a2a2a] rounded px-3 py-1 border border-[#3e484f] ml-2">
          <span class="font-['JetBrains_Mono',monospace] text-xs text-[#bdc8d0]">${completedCount}/38 Practicals Loaded</span>
        </div>
      </div>

      <!-- Right: Controls & Action Icons -->
      <div class="flex items-center gap-2">
        <!-- Layout Selector Dropdown -->
        <div class="relative inline-block text-left">
          <button id="btn-layout-dropdown" class="flex items-center gap-1 px-2.5 py-1 rounded text-xs font-bold border border-[#3e484f] bg-[#2a2a2a] text-[#e5e2e1] hover:border-cyan-500 transition-colors">
            <i data-lucide="layout" class="w-3.5 h-3.5"></i>
            <span class="hidden sm:inline uppercase">${currentLayout}</span>
          </button>
          <div id="layout-menu" class="hidden absolute right-0 mt-1 w-56 rounded shadow-xl bg-[#131313] border border-[#3e484f] py-1 z-50">
            ${layoutOptions.map(opt => `
              <button data-layout-id="${opt.id}" class="w-full text-left px-3 py-1.5 text-xs hover:bg-white/10 flex items-center justify-between ${currentLayout === opt.id ? 'font-bold text-cyan-400' : 'text-[#e5e2e1]'}">
                <span>${opt.name}</span>
                <span class="text-[9px] opacity-60">${opt.badge}</span>
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Theme Button (Settings) -->
        <button id="btn-open-theme" aria-label="Settings" class="text-[#bdc8d0] hover:bg-[#2a2a2a] p-1.5 rounded transition-colors duration-150 flex items-center gap-1" title="Theme Settings">
          <i data-lucide="settings" class="w-4 h-4"></i>
          <span class="hidden lg:inline text-xs font-bold">SETTINGS</span>
        </button>

        <!-- Quiz Button (Help) -->
        <button id="btn-open-quiz" aria-label="Help" class="text-[#bdc8d0] hover:bg-[#2a2a2a] p-1.5 rounded transition-colors duration-150 flex items-center gap-1" title="BCA Exam Practice Quiz">
          <i data-lucide="help-circle" class="w-4 h-4"></i>
          <span class="hidden lg:inline text-xs font-bold">QUIZ</span>
        </button>

        <!-- Cheatsheet Button -->
        <button id="btn-open-cheatsheet" class="hidden sm:flex items-center gap-1 px-2 py-1 rounded text-xs font-bold border border-[#3e484f] bg-[#2a2a2a] text-[#e5e2e1] hover:border-slate-500 transition-colors" title="WinForms & ADO.NET Cheatsheet">
          <i data-lucide="file-text" class="w-3.5 h-3.5"></i>
          <span class="hidden md:inline">DOCS</span>
        </button>

        <!-- Lab Record Modal -->
        <button id="btn-open-labrecord" class="hidden sm:flex items-center gap-1 px-2 py-1 rounded text-xs font-bold border border-[#3e484f] bg-[#2a2a2a] text-[#e5e2e1] hover:border-slate-500 transition-colors" title="Printable Lab Record Manual">
          <i data-lucide="book-open" class="w-3.5 h-3.5"></i>
          <span class="hidden md:inline">RECORD</span>
        </button>

        <!-- AI Tutor Toggle Button -->
        <button id="btn-toggle-aitutor" class="flex items-center gap-1.5 px-3 py-1 rounded text-xs font-bold uppercase transition-all shadow-md ${isAiTutorOpen ? 'bg-cyan-400 text-black' : 'bg-[#00a3d9] text-black hover:bg-[#008fbf]'}" title="AI Tutor Engine">
          <i data-lucide="bot" class="w-4 h-4"></i>
          <span class="hidden sm:inline">AI TUTOR</span>
        </button>
      </div>
    </header>
  `;

  // Attach Event Listeners
  const btnBrandHome = container.querySelector('#btn-brand-home');
  if (btnBrandHome) {
    btnBrandHome.addEventListener('click', () => {
      appState.setLayout('syllabus-board');
    });
  }

  const btnLayoutDropdown = container.querySelector('#btn-layout-dropdown');
  const layoutMenu = container.querySelector('#layout-menu');
  if (btnLayoutDropdown && layoutMenu) {
    btnLayoutDropdown.addEventListener('click', (e) => {
      e.stopPropagation();
      layoutMenu.classList.toggle('hidden');
    });

    document.addEventListener('click', () => {
      layoutMenu.classList.add('hidden');
    });

    layoutMenu.querySelectorAll('[data-layout-id]').forEach(btn => {
      btn.addEventListener('click', () => {
        const layoutId = btn.getAttribute('data-layout-id');
        appState.setLayout(layoutId);
        layoutMenu.classList.add('hidden');
      });
    });
  }

  const btnOpenTheme = container.querySelector('#btn-open-theme');
  if (btnOpenTheme) btnOpenTheme.addEventListener('click', () => appState.setThemeModalOpen(true));

  const btnOpenQuiz = container.querySelector('#btn-open-quiz');
  if (btnOpenQuiz) btnOpenQuiz.addEventListener('click', () => appState.setQuizOpen(true));

  const btnOpenCheatsheet = container.querySelector('#btn-open-cheatsheet');
  if (btnOpenCheatsheet) btnOpenCheatsheet.addEventListener('click', () => appState.setCheatsheetOpen(true));

  const btnOpenLabrecord = container.querySelector('#btn-open-labrecord');
  if (btnOpenLabrecord) btnOpenLabrecord.addEventListener('click', () => appState.setLabRecordOpen(true));

  const btnToggleAiTutor = container.querySelector('#btn-toggle-aitutor');
  if (btnToggleAiTutor) btnToggleAiTutor.addEventListener('click', () => appState.toggleAiTutor());
}
