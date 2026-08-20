import { appState } from '../appState.js';
import { layoutOptions } from '../themeEngine.js';

export function renderNavbar(container) {
  const { themeConfig, currentLayout, completedIds, isAiTutorOpen } = appState;
  const totalCount = 38;
  const completedCount = completedIds.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  container.innerHTML = `
    <header class="h-13 border-b ${themeConfig.borderColor} ${themeConfig.headerBg} flex items-center justify-between px-3 md:px-4 select-none shrink-0 z-20">
      <!-- Left: Brand Logo & Title -->
      <div class="flex items-center gap-3 min-w-0">
        <div class="flex items-center gap-2 cursor-pointer" id="btn-brand-home">
          <div class="w-8 h-8 rounded-sm ${themeConfig.accentBg} flex items-center justify-center text-black font-black text-xs shadow-md">
            C#
          </div>
          <div class="flex flex-col min-w-0">
            <div class="flex items-center gap-1.5">
              <span class="font-black tracking-wider text-xs md:text-sm ${themeConfig.textHeading} uppercase">SharpSensei</span>
              <span class="text-[9px] px-1 py-0.2 rounded-xs border font-bold ${themeConfig.accentBadgeBg} hidden sm:inline">IDE v2.5</span>
            </div>
            <span class="text-[10px] ${themeConfig.textMuted} tracking-tight hidden md:inline truncate">BCA Sem-5 WinForms GUI Lab & AI Tutor</span>
          </div>
        </div>

        <!-- Progress Indicator Badge -->
        <div class="hidden lg:flex items-center gap-2 ml-4 pl-4 border-l ${themeConfig.borderColor}">
          <div class="flex flex-col">
            <div class="flex items-center justify-between text-[9px] ${themeConfig.textMuted} font-bold">
              <span>PROGRESS</span>
              <span>${completedCount}/${totalCount} (${progressPercent}%)</span>
            </div>
            <div class="w-28 h-1.5 bg-slate-800 rounded-full overflow-hidden mt-0.5 border border-slate-700/50">
              <div class="h-full rounded-full transition-all duration-300" style="width: ${progressPercent}%; background-color: ${themeConfig.previewColor};"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: Action Buttons & Settings -->
      <div class="flex items-center gap-1.5 md:gap-2">
        <!-- Layout Selector Dropdown -->
        <div class="relative inline-block text-left">
          <button id="btn-layout-dropdown" class="flex items-center gap-1 px-2 py-1 rounded-sm text-[10px] font-bold border ${themeConfig.borderColor} ${themeConfig.cardSubBg} ${themeConfig.textHeading} hover:border-slate-500 transition-colors">
            <i data-lucide="layout" class="w-3.5 h-3.5"></i>
            <span class="hidden sm:inline uppercase">${currentLayout}</span>
          </button>
          <div id="layout-menu" class="hidden absolute right-0 mt-1 w-56 rounded-sm shadow-xl ${themeConfig.headerBg} border ${themeConfig.borderColor} py-1 z-50">
            ${layoutOptions.map(opt => `
              <button data-layout-id="${opt.id}" class="w-full text-left px-3 py-1.5 text-xs hover:bg-white/10 flex items-center justify-between ${currentLayout === opt.id ? 'font-bold text-cyan-400' : themeConfig.textColor}">
                <span>${opt.name}</span>
                <span class="text-[9px] opacity-60">${opt.badge}</span>
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Theme Selector Button -->
        <button id="btn-open-theme" class="flex items-center gap-1.5 px-2 py-1 rounded-sm text-[10px] font-bold border ${themeConfig.borderColor} ${themeConfig.cardSubBg} ${themeConfig.textHeading} hover:border-slate-500 transition-colors" title="Theme Selector">
          <span class="w-3 h-3 rounded-full border border-white/20" style="background-color: ${themeConfig.previewColor}"></span>
          <span class="hidden md:inline">THEME</span>
        </button>

        <!-- Quiz Modal Button -->
        <button id="btn-open-quiz" class="flex items-center gap-1 px-2 py-1 rounded-sm text-[10px] font-bold border ${themeConfig.borderColor} ${themeConfig.cardSubBg} ${themeConfig.textHeading} hover:border-slate-500 transition-colors" title="BCA Exam Practice Quiz">
          <i data-lucide="help-circle" class="w-3.5 h-3.5"></i>
          <span class="hidden sm:inline">QUIZ</span>
        </button>

        <!-- Cheatsheet Button -->
        <button id="btn-open-cheatsheet" class="flex items-center gap-1 px-2 py-1 rounded-sm text-[10px] font-bold border ${themeConfig.borderColor} ${themeConfig.cardSubBg} ${themeConfig.textHeading} hover:border-slate-500 transition-colors" title="WinForms & ADO.NET Cheatsheet">
          <i data-lucide="file-text" class="w-3.5 h-3.5"></i>
          <span class="hidden sm:inline">CHEATSHEET</span>
        </button>

        <!-- Lab Record Modal -->
        <button id="btn-open-labrecord" class="flex items-center gap-1 px-2 py-1 rounded-sm text-[10px] font-bold border ${themeConfig.borderColor} ${themeConfig.cardSubBg} ${themeConfig.textHeading} hover:border-slate-500 transition-colors" title="Printable Lab Record Manual">
          <i data-lucide="book-open" class="w-3.5 h-3.5"></i>
          <span class="hidden sm:inline">LAB RECORD</span>
        </button>

        <!-- AI Tutor Toggle Button -->
        <button id="btn-toggle-aitutor" class="flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-[10px] font-black uppercase transition-all shadow-md ${isAiTutorOpen ? 'bg-cyan-400 text-black' : `${themeConfig.accentBg} ${themeConfig.accentTextColor} hover:opacity-90`}">
          <i data-lucide="bot" class="w-3.5 h-3.5"></i>
          <span>AI TUTOR</span>
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
