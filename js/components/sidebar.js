import { appState } from '../appState.js';
import { allPracticals, searchPracticals, modulesList } from '../data/practicalsData.js';

let searchQuery = '';
let selectedModule = 'All';
let selectedDifficulty = 'All';

export function renderSidebar(container) {
  const { themeConfig, activePracticalId, completedIds, starredIds } = appState;
  const filtered = searchPracticals(searchQuery, selectedModule, selectedDifficulty);

  container.innerHTML = `
    <aside class="w-72 md:w-80 h-full border-r ${themeConfig.borderColor} ${themeConfig.sidebarBg} flex flex-col shrink-0 overflow-hidden select-none">
      <!-- Search & Filter Bar -->
      <div class="p-3 border-b ${themeConfig.borderColor} space-y-2 shrink-0">
        <div class="relative">
          <input
            type="text"
            id="sidebar-search-input"
            placeholder="Search practicals, tags, topics..."
            value="${searchQuery}"
            class="w-full pl-7 pr-3 py-1.5 rounded-sm text-xs ${themeConfig.cardSubBg} border ${themeConfig.borderColor} ${themeConfig.textHeading} placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
          />
          <i data-lucide="search" class="w-3.5 h-3.5 absolute left-2 top-2.5 text-slate-500"></i>
        </div>

        <div class="flex gap-2 text-[10px]">
          <select id="module-filter-select" class="flex-1 px-2 py-1 rounded-sm ${themeConfig.cardSubBg} border ${themeConfig.borderColor} ${themeConfig.textHeading} focus:outline-none">
            <option value="All" ${selectedModule === 'All' ? 'selected' : ''}>All Modules (${allPracticals.length})</option>
            ${modulesList.map(m => `
              <option value="${m.name}" ${selectedModule === m.name ? 'selected' : ''}>${m.name.split(':')[0]} (${m.count})</option>
            `).join('')}
          </select>

          <select id="diff-filter-select" class="w-24 px-2 py-1 rounded-sm ${themeConfig.cardSubBg} border ${themeConfig.borderColor} ${themeConfig.textHeading} focus:outline-none">
            <option value="All" ${selectedDifficulty === 'All' ? 'selected' : ''}>Difficulty</option>
            <option value="Beginner" ${selectedDifficulty === 'Beginner' ? 'selected' : ''}>Beginner</option>
            <option value="Intermediate" ${selectedDifficulty === 'Intermediate' ? 'selected' : ''}>Intermediate</option>
            <option value="Advanced" ${selectedDifficulty === 'Advanced' ? 'selected' : ''}>Advanced</option>
          </select>
        </div>
      </div>

      <!-- Practicals Explorer Tree / List -->
      <div class="flex-1 overflow-y-auto p-2 space-y-1">
        ${filtered.length === 0 ? `
          <div class="p-6 text-center text-xs ${themeConfig.textMuted}">
            No practicals found matching "${searchQuery}".
          </div>
        ` : filtered.map(p => {
          const isActive = p.id === activePracticalId;
          const isDone = completedIds.includes(p.id);
          const isStarred = starredIds.includes(p.id);

          return `
            <div
              data-practical-id="${p.id}"
              class="group p-2 rounded-sm border cursor-pointer transition-all flex items-start justify-between gap-2 ${
                isActive
                  ? `${themeConfig.cardSubBg} ${themeConfig.accentBorder} shadow-sm`
                  : `border-transparent hover:${themeConfig.cardSubBg} opacity-80 hover:opacity-100`
              }"
            >
              <div class="flex items-start gap-2 min-w-0">
                <span
                  class="w-6 h-6 rounded-xs shrink-0 flex items-center justify-center font-bold text-[10px] ${
                    isActive
                      ? `${themeConfig.accentBg} ${themeConfig.accentTextColor}`
                      : `${themeConfig.cardSubBg} ${themeConfig.textHeading} border ${themeConfig.borderColor}`
                  }"
                >
                  #${p.id}
                </span>

                <div class="min-w-0 space-y-0.5">
                  <div class="text-xs font-bold ${isActive ? themeConfig.textHeading : themeConfig.textColor} truncate">
                    ${p.title}
                  </div>
                  <div class="flex items-center gap-1.5 text-[9px] ${themeConfig.textMuted}">
                    <span>${p.difficulty}</span>
                    <span>•</span>
                    <span>${p.estimatedMinutes}m</span>
                  </div>
                </div>
              </div>

              <!-- Quick Status Badges -->
              <div class="flex items-center gap-1 shrink-0">
                ${isStarred ? `<i data-lucide="star" class="w-3 h-3 text-amber-400 fill-amber-400"></i>` : ''}
                ${isDone ? `<i data-lucide="check-circle-2" class="w-3.5 h-3.5 text-emerald-400"></i>` : ''}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </aside>
  `;

  // Attach Event Listeners
  const searchInput = container.querySelector('#sidebar-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderSidebar(container);
    });
  }

  const moduleSelect = container.querySelector('#module-filter-select');
  if (moduleSelect) {
    moduleSelect.addEventListener('change', (e) => {
      selectedModule = e.target.value;
      renderSidebar(container);
    });
  }

  const diffSelect = container.querySelector('#diff-filter-select');
  if (diffSelect) {
    diffSelect.addEventListener('change', (e) => {
      selectedDifficulty = e.target.value;
      renderSidebar(container);
    });
  }

  container.querySelectorAll('[data-practical-id]').forEach(item => {
    item.addEventListener('click', () => {
      const pid = parseInt(item.getAttribute('data-practical-id'), 10);
      appState.setActivePractical(pid);
    });
  });
}
