import { appState } from '../appState.js';
import { allPracticals, searchPracticals, modulesList } from '../data/practicalsData.js';

let searchQuery = '';
let selectedModule = 'All';
let selectedDifficulty = 'All';

export function renderSidebar(container) {
  const { themeConfig, activePracticalId, completedIds, starredIds } = appState;
  const filtered = searchPracticals(searchQuery, selectedModule, selectedDifficulty);

  container.innerHTML = `
    <aside class="w-[240px] md:w-[260px] border border-[#3e484f] rounded-xl shadow-lg bg-[#1E1E1E] flex flex-col shrink-0 h-full overflow-hidden relative select-none font-['Hanken_Grotesk',sans-serif]">
      <!-- Header: C# Lab Series Card -->
      <div class="px-4 py-2.5 border-b border-[#3e484f] flex justify-between items-center bg-[#2a2a2a]">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded bg-[#353535] flex items-center justify-center border border-[#3e484f] text-[#e5e2e1] font-bold text-xs">
            U
          </div>
          <div>
            <div class="font-bold text-[#78d1ff] text-sm">C# Lab Series</div>
            <div class="text-[10px] text-[#bdc8d0] uppercase tracking-wider font-['JetBrains_Mono',monospace]">38 Practicals</div>
          </div>
        </div>
      </div>

      <!-- Search & View Mode Controls -->
      <div class="px-3 py-2 border-b border-[#3e484f] bg-[#1E1E1E] space-y-2 shrink-0">
        <div class="relative">
          <input
            type="text"
            id="sidebar-search-input"
            placeholder="Search practicals..."
            value="${searchQuery}"
            class="w-full pl-7 pr-2 py-1 rounded text-xs bg-[#2a2a2a] border border-[#3e484f] text-[#e5e2e1] placeholder:text-[#bdc8d0]/60 focus:outline-none focus:border-cyan-500 font-['JetBrains_Mono',monospace]"
          />
          <i data-lucide="search" class="w-3.5 h-3.5 absolute left-2 top-2 text-[#bdc8d0]"></i>
        </div>

        <!-- Section Navigation Views -->
        <div class="space-y-0.5 pt-1 text-xs">
          <a class="flex items-center gap-2.5 px-3 py-1.5 bg-[#702982] text-[#ec9bfb] border-l-2 border-[#78d1ff] rounded-r transition-all cursor-pointer font-bold" href="#">
            <i data-lucide="folder-open" class="w-4 h-4"></i>
            <span>Lab Explorer</span>
          </a>
          <a class="flex items-center gap-2.5 px-3 py-1.5 text-[#bdc8d0] hover:bg-[#2a2a2a] border-l-2 border-transparent rounded-r transition-all cursor-pointer" id="nav-view-code" href="#">
            <i data-lucide="code" class="w-4 h-4"></i>
            <span>Code Editor</span>
          </a>
          <a class="flex items-center gap-2.5 px-3 py-1.5 text-[#bdc8d0] hover:bg-[#2a2a2a] border-l-2 border-transparent rounded-r transition-all cursor-pointer" id="nav-view-viva" href="#">
            <i data-lucide="list-checks" class="w-4 h-4"></i>
            <span>Solution View</span>
          </a>
        </div>
      </div>

      <!-- Practicals Explorer Item List -->
      <div class="flex-1 overflow-y-auto font-['JetBrains_Mono',monospace] text-xs py-1 divide-y divide-[#3e484f]/30">
        ${filtered.length === 0 ? `
          <div class="p-6 text-center text-xs text-[#bdc8d0]">
            No practicals found matching "${searchQuery}".
          </div>
        ` : filtered.map(p => {
          const isActive = p.id === activePracticalId;
          const isDone = completedIds.includes(p.id);

          return `
            <div
              data-practical-id="${p.id}"
              class="flex items-center px-3 py-2 cursor-pointer transition-colors ${
                isActive
                  ? 'bg-[#094771] border-l-2 border-[#00a3d9] text-[#e5e2e1]'
                  : 'hover:bg-[#2D2D30] border-l-2 border-transparent text-[#bdc8d0] hover:text-[#e5e2e1]'
              }"
            >
              <i data-lucide="${isActive ? 'code-2' : 'file-code'}" class="w-3.5 h-3.5 mr-2 shrink-0 ${isActive ? 'text-[#78d1ff]' : 'text-[#87929a]'}"></i>
              <span class="truncate flex-1 font-sans text-xs ${isActive ? 'font-bold text-white' : ''}">Practical ${p.id}: ${p.title}</span>
              <div class="w-2 h-2 rounded-full ${isDone ? 'bg-[#00a3d9]' : 'bg-[#3e484f]'} ml-2 shrink-0" title="${isDone ? 'Completed' : 'Pending'}"></div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- Footer Action Panel -->
      <div class="p-3 border-t border-[#3e484f] bg-[#1b1b1c] shrink-0">
        <button id="btn-resume-lab" class="w-full bg-[#00a3d9] text-black font-bold py-1.5 rounded hover:bg-[#008fbf] transition-colors mb-2 flex justify-center items-center gap-1.5 text-xs shadow-md">
          <i data-lucide="play" class="w-3.5 h-3.5 fill-black"></i>
          <span>Resume Lab</span>
        </button>
        <div class="flex justify-between items-center text-xs pt-1 px-1">
          <button id="btn-sidebar-settings" class="flex items-center gap-1.5 text-[#bdc8d0] hover:text-white transition-colors">
            <i data-lucide="settings" class="w-3.5 h-3.5"></i>
            <span>Settings</span>
          </button>
          <button id="btn-sidebar-docs" class="flex items-center gap-1.5 text-[#bdc8d0] hover:text-white transition-colors">
            <i data-lucide="book" class="w-3.5 h-3.5"></i>
            <span>Docs</span>
          </button>
        </div>
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
