import { appState } from '../appState.js';
import { modulesList, allPracticals } from '../data/practicalsData.js';

export function renderSyllabusBoard(container) {
  const { themeConfig, completedIds, starredIds } = appState;

  container.innerHTML = `
    <div class="p-4 md:p-6 space-y-6 max-w-7xl mx-auto overflow-y-auto h-full">
      <!-- Header Banner -->
      <div class="border ${themeConfig.borderColor} ${themeConfig.cardBg} rounded-sm p-5 space-y-2 shadow-lg">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2">
              <h2 class="text-lg font-black tracking-wider ${themeConfig.textHeading} uppercase">BCA Semester 5 Syllabus Board</h2>
              <span class="px-2 py-0.5 rounded text-[10px] font-black ${themeConfig.accentBadgeBg}">38 PRACTICALS</span>
            </div>
            <p class="text-xs ${themeConfig.textMuted} mt-1">
              Complete Visual Studio WinForms & ADO.NET practical curriculum with interactive emulators and AI assistance.
            </p>
          </div>

          <div class="flex items-center gap-4 text-xs ${themeConfig.textHeading}">
            <div class="text-center">
              <div class="text-xl font-black text-emerald-400">${completedIds.length} / 38</div>
              <div class="text-[9px] ${themeConfig.textMuted} uppercase font-bold">COMPLETED</div>
            </div>
            <div class="text-center border-l ${themeConfig.borderColor} pl-4">
              <div class="text-xl font-black text-amber-400">${starredIds.length}</div>
              <div class="text-[9px] ${themeConfig.textMuted} uppercase font-bold">STARRED</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Modules Matrix -->
      <div class="space-y-6">
        ${modulesList.map(mod => {
          const modPracticals = allPracticals.filter(p => p.module === mod.name);
          const doneInMod = modPracticals.filter(p => completedIds.includes(p.id)).length;

          return `
            <div class="border ${themeConfig.borderColor} ${themeConfig.cardSubBg} rounded-sm overflow-hidden shadow-md">
              <div class="p-3 border-b ${themeConfig.borderColor} flex items-center justify-between" style="border-left: 4px solid ${mod.color}">
                <div>
                  <h3 class="text-xs font-bold ${themeConfig.textHeading} uppercase tracking-wider">${mod.name}</h3>
                  <p class="text-[10px] ${themeConfig.textMuted}">${mod.description}</p>
                </div>
                <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-black/30 border ${themeConfig.borderColor} ${themeConfig.textHeading}">
                  ${doneInMod} / ${modPracticals.length} Done
                </span>
              </div>

              <div class="p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                ${modPracticals.map(p => {
                  const isDone = completedIds.includes(p.id);
                  const isStarred = starredIds.includes(p.id);

                  return `
                    <div
                      data-launch-practical-id="${p.id}"
                      class="border ${themeConfig.borderColor} ${themeConfig.cardBg} p-3 rounded-sm hover:border-cyan-500 transition-all cursor-pointer space-y-2 flex flex-col justify-between group"
                    >
                      <div class="space-y-1">
                        <div class="flex items-center justify-between text-[10px]">
                          <span class="font-bold text-cyan-400">#${p.id}</span>
                          <div class="flex items-center gap-1">
                            ${isStarred ? `<i data-lucide="star" class="w-3 h-3 text-amber-400 fill-amber-400"></i>` : ''}
                            ${isDone ? `<i data-lucide="check-circle-2" class="w-3.5 h-3.5 text-emerald-400"></i>` : ''}
                          </div>
                        </div>
                        <h4 class="text-xs font-bold ${themeConfig.textHeading} group-hover:text-cyan-400 transition-colors line-clamp-2">
                          ${p.title}
                        </h4>
                      </div>

                      <div class="flex items-center justify-between text-[9px] ${themeConfig.textMuted} pt-2 border-t ${themeConfig.borderColor}">
                        <span>${p.difficulty}</span>
                        <span>${p.estimatedMinutes}m</span>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;

  // Attach Launch Practical Listeners
  container.querySelectorAll('[data-launch-practical-id]').forEach(card => {
    card.addEventListener('click', () => {
      const pid = parseInt(card.getAttribute('data-launch-practical-id'), 10);
      appState.setActivePractical(pid);
      appState.setLayout('classic');
    });
  });
}
