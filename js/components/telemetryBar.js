import { appState } from '../appState.js';
import { getPracticalById, allPracticals } from '../data/practicalsData.js';

export function renderTelemetryBar(container) {
  const { themeConfig, activePracticalId, completedIds, starredIds, currentLayout } = appState;
  const activePractical = getPracticalById(activePracticalId) || allPracticals[0];
  const isCompleted = completedIds.includes(activePractical.id);
  const isStarred = starredIds.includes(activePractical.id);

  container.innerHTML = `
    <div class="grid grid-cols-2 md:grid-cols-4 border-b ${themeConfig.borderColor} ${themeConfig.ribbonBg} shrink-0 select-none">
      <!-- Box 1: Node Identifier -->
      <div class="border-r border-b md:border-b-0 ${themeConfig.borderColor} p-3 flex flex-col justify-between">
        <div class="flex items-center justify-between">
          <span class="text-[9px] ${themeConfig.textMuted} uppercase tracking-tight">PRACTICAL_NODE</span>
          <span class="text-[9px] px-1.5 py-0.2 border rounded-xs font-bold ${themeConfig.accentBadgeBg}">
            ACTIVE
          </span>
        </div>
        <div class="text-xl sm:text-2xl ${themeConfig.textHeading} font-bold tracking-tighter">
          #${activePractical.id}
          <span class="text-xs font-normal ml-2" style="color: ${themeConfig.previewColor}">/ 38</span>
        </div>
        <div class="text-[9px] ${themeConfig.textMuted} truncate">${activePractical.module}</div>
      </div>

      <!-- Box 2: Difficulty & Execution Time -->
      <div class="border-r border-b md:border-b-0 ${themeConfig.borderColor} p-3 flex flex-col justify-between">
        <span class="text-[9px] ${themeConfig.textMuted} uppercase tracking-tight">COMPLEXITY_TIER</span>
        <div class="text-xl sm:text-2xl ${themeConfig.textHeading} font-bold tracking-tighter uppercase">
          ${activePractical.difficulty}
        </div>
        <div class="flex items-center gap-1 text-[9px] ${themeConfig.textMuted}">
          <i data-lucide="clock" class="w-3 h-3" style="color: ${themeConfig.previewColor}"></i>
          <span>EST: ${activePractical.estimatedMinutes} MINS</span>
        </div>
      </div>

      <!-- Box 3: Status / Verification Flag -->
      <div class="border-r ${themeConfig.borderColor} p-3 flex flex-col justify-between">
        <span class="text-[9px] ${themeConfig.textMuted} uppercase tracking-tight">VERIFICATION_STATUS</span>
        <div class="text-xl sm:text-2xl font-bold tracking-tighter">
          ${isCompleted ? '<span class="text-emerald-400">VERIFIED</span>' : '<span class="text-amber-400">PENDING</span>'}
        </div>
        <div class="flex gap-1.5 items-center text-[9px]">
          <span class="w-1.5 h-1.5 rounded-full ${isCompleted ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'}"></span>
          <span class="${themeConfig.textMuted} uppercase">${isCompleted ? 'LAB SIGNED' : 'AWAITING RUN'}</span>
        </div>
      </div>

      <!-- Box 4: Controls & Shortcuts -->
      <div class="p-3 flex flex-col justify-between">
        <span class="text-[9px] ${themeConfig.textMuted} uppercase tracking-tight">CONTROL_MATRIX</span>
        <div class="flex items-center gap-1.5">
          <button
            id="btn-toggle-complete"
            class="flex items-center gap-1 px-2.5 py-1 rounded-sm text-[10px] font-bold uppercase transition-colors cursor-pointer ${
              isCompleted 
                ? 'bg-emerald-500 text-black' 
                : `${themeConfig.cardSubBg} border ${themeConfig.borderColor} ${themeConfig.textHeading} hover:border-slate-500`
            }"
          >
            <i data-lucide="check-circle-2" class="w-3 h-3"></i>
            <span>${isCompleted ? 'COMPLETE' : 'MARK DONE'}</span>
          </button>

          <button
            id="btn-toggle-star"
            class="p-1 rounded-sm border cursor-pointer ${
              isStarred 
                ? 'bg-amber-500/20 border-amber-500 text-amber-400' 
                : `${themeConfig.cardSubBg} ${themeConfig.borderColor} ${themeConfig.textMuted} hover:text-white`
            }"
            title="Star Practical"
          >
            <i data-lucide="star" class="w-3 h-3 ${isStarred ? 'fill-current' : ''}"></i>
          </button>

          <div class="flex items-center border ${themeConfig.borderColor} ${themeConfig.cardBg} rounded-sm ml-auto">
            <button
              id="btn-prev-practical"
              ${activePractical.id === 1 ? 'disabled' : ''}
              class="p-1 hover:bg-black/20 disabled:opacity-20 ${themeConfig.textHeading} cursor-pointer"
              title="Previous Practical"
            >
              <i data-lucide="chevron-left" class="w-3.5 h-3.5"></i>
            </button>
            <button
              id="btn-next-practical"
              ${activePractical.id === 38 ? 'disabled' : ''}
              class="p-1 hover:bg-black/20 disabled:opacity-20 ${themeConfig.textHeading} border-l ${themeConfig.borderColor} cursor-pointer"
              title="Next Practical"
            >
              <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        </div>
        <div class="text-[9px] ${themeConfig.textMuted} truncate flex justify-between">
          <span>LAYOUT: ${currentLayout.toUpperCase()}</span>
          <button 
            id="btn-telemetry-options"
            class="hover:underline text-cyan-400 font-bold cursor-pointer"
            style="color: ${themeConfig.previewColor}"
          >
            OPTIONS
          </button>
        </div>
      </div>
    </div>
  `;

  // Attach Event Listeners
  const btnToggleComplete = container.querySelector('#btn-toggle-complete');
  if (btnToggleComplete) {
    btnToggleComplete.addEventListener('click', () => {
      appState.toggleComplete(activePractical.id);
      if (typeof window.confetti === 'function' && !isCompleted) {
        window.confetti({ particleCount: 70, spread: 60, origin: { y: 0.8 } });
      }
    });
  }

  const btnToggleStar = container.querySelector('#btn-toggle-star');
  if (btnToggleStar) {
    btnToggleStar.addEventListener('click', () => {
      appState.toggleStar(activePractical.id);
    });
  }

  const btnPrev = container.querySelector('#btn-prev-practical');
  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      const prevIdx = allPracticals.findIndex(p => p.id === activePractical.id) - 1;
      if (prevIdx >= 0) appState.setActivePractical(allPracticals[prevIdx].id);
    });
  }

  const btnNext = container.querySelector('#btn-next-practical');
  if (btnNext) {
    btnNext.addEventListener('click', () => {
      const nextIdx = allPracticals.findIndex(p => p.id === activePractical.id) + 1;
      if (nextIdx < allPracticals.length) appState.setActivePractical(allPracticals[nextIdx].id);
    });
  }

  const btnOptions = container.querySelector('#btn-telemetry-options');
  if (btnOptions) {
    btnOptions.addEventListener('click', () => appState.setThemeModalOpen(true));
  }
}
