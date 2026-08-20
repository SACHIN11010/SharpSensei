import { appState } from '../appState.js';

let currentStepIndex = 0;
let isPlaying = false;
let playInterval = null;

export function renderDryRunVisualizer(container, practical) {
  const { themeConfig } = appState;
  if (!practical || !practical.traceSteps || practical.traceSteps.length === 0) {
    container.innerHTML = `
      <div class="p-6 border ${themeConfig.borderColor} ${themeConfig.cardSubBg} rounded-sm text-center text-xs ${themeConfig.textMuted}">
        No dry run trace steps available for this practical.
      </div>
    `;
    return;
  }

  const steps = practical.traceSteps;
  if (currentStepIndex >= steps.length) currentStepIndex = 0;

  const currentStep = steps[currentStepIndex];

  container.innerHTML = `
    <div class="space-y-4">
      <!-- Debugger Control Bar -->
      <div class="border ${themeConfig.borderColor} ${themeConfig.cardBg} rounded-sm p-3 flex flex-wrap items-center justify-between gap-3 shadow-md select-none">
        <div class="flex items-center gap-2">
          <i data-lucide="cpu" class="w-4 h-4 text-cyan-400"></i>
          <span class="text-xs font-bold ${themeConfig.textHeading}">VS CLR DEBUGGER REGISTER WATCH</span>
          <span class="text-[9px] px-1.5 py-0.2 rounded-xs border font-bold ${themeConfig.accentBadgeBg}">
            STEP ${currentStepIndex + 1} / ${steps.length}
          </span>
        </div>

        <div class="flex items-center gap-1.5">
          <button
            id="btn-dryrun-prev"
            ${currentStepIndex === 0 ? 'disabled' : ''}
            class="px-2 py-1 rounded-sm text-[10px] font-bold border ${themeConfig.borderColor} ${themeConfig.cardSubBg} ${themeConfig.textHeading} hover:border-slate-500 disabled:opacity-30 cursor-pointer"
          >
            <i data-lucide="skip-back" class="w-3 h-3 inline"></i> STEP BACK
          </button>

          <button
            id="btn-dryrun-play"
            class="px-3 py-1 rounded-sm text-[10px] font-bold uppercase ${isPlaying ? 'bg-amber-500 text-black' : `${themeConfig.accentBg} ${themeConfig.accentTextColor}`} cursor-pointer"
          >
            <i data-lucide="${isPlaying ? 'pause' : 'play'}" class="w-3 h-3 inline"></i> ${isPlaying ? 'PAUSE' : 'AUTO STEP'}
          </button>

          <button
            id="btn-dryrun-next"
            ${currentStepIndex === steps.length - 1 ? 'disabled' : ''}
            class="px-2 py-1 rounded-sm text-[10px] font-bold border ${themeConfig.borderColor} ${themeConfig.cardSubBg} ${themeConfig.textHeading} hover:border-slate-500 disabled:opacity-30 cursor-pointer"
          >
            STEP NEXT <i data-lucide="skip-forward" class="w-3 h-3 inline"></i>
          </button>

          <button
            id="btn-dryrun-reset"
            class="p-1 rounded-sm text-[10px] font-bold border ${themeConfig.borderColor} ${themeConfig.cardSubBg} ${themeConfig.textMuted} hover:text-white cursor-pointer"
            title="Reset Trace"
          >
            <i data-lucide="rotate-ccw" class="w-3.5 h-3.5"></i>
          </button>
        </div>
      </div>

      <!-- Current Step Explanation Banner -->
      <div class="border border-cyan-500/40 bg-cyan-500/10 p-3 rounded-sm space-y-1">
        <div class="flex items-center gap-2">
          <span class="px-1.5 py-0.2 rounded-xs bg-cyan-500 text-black font-black text-[9px]">
            LINE ${currentStep.line}
          </span>
          <span class="text-xs font-bold text-cyan-300 truncate">
            ${currentStep.callStack || 'Program Execution'}
          </span>
        </div>
        <p class="text-xs text-slate-200 leading-relaxed font-mono">
          ${currentStep.explanation}
        </p>
      </div>

      <!-- Memory Variable Registers Table & Call Stack -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Variable Registers Table -->
        <div class="border ${themeConfig.borderColor} ${themeConfig.cardSubBg} rounded-sm overflow-hidden space-y-0">
          <div class="px-3 py-2 border-b ${themeConfig.borderColor} ${themeConfig.headerBg} flex items-center justify-between">
            <span class="text-xs font-bold ${themeConfig.textHeading} flex items-center gap-1.5">
              <i data-lucide="database" class="w-3.5 h-3.5 text-emerald-400"></i>
              VARIABLE STACK REGISTERS
            </span>
            <span class="text-[9px] ${themeConfig.textMuted} font-mono">ACTIVE MEMORY</span>
          </div>

          <div class="p-2 overflow-x-auto">
            <table class="w-full text-xs font-mono text-left">
              <thead>
                <tr class="border-b ${themeConfig.borderColor} text-[10px] ${themeConfig.textMuted}">
                  <th class="p-1.5">VARIABLE</th>
                  <th class="p-1.5">VALUE IN MEMORY</th>
                </tr>
              </thead>
              <tbody>
                ${Object.entries(currentStep.variables || {}).map(([key, val]) => `
                  <tr class="border-b ${themeConfig.borderColor}/50 hover:bg-white/5">
                    <td class="p-1.5 text-cyan-400 font-bold">${key}</td>
                    <td class="p-1.5 text-amber-300">${val}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Output Log & Call Stack Card -->
        <div class="border ${themeConfig.borderColor} ${themeConfig.cardSubBg} rounded-sm overflow-hidden flex flex-col">
          <div class="px-3 py-2 border-b ${themeConfig.borderColor} ${themeConfig.headerBg} flex items-center justify-between">
            <span class="text-xs font-bold ${themeConfig.textHeading} flex items-center gap-1.5">
              <i data-lucide="terminal" class="w-3.5 h-3.5 text-amber-400"></i>
              CONSOLE OUTPUT / EVENT LOG
            </span>
            <span class="text-[9px] ${themeConfig.textMuted}">STDOUT</span>
          </div>

          <div class="p-3 flex-1 ${themeConfig.terminalBg} font-mono text-xs overflow-y-auto space-y-1 min-h-[140px]">
            ${currentStep.outputLog ? `
              <div class="text-emerald-400 font-bold">[OUTPUT] ${currentStep.outputLog}</div>
            ` : `
              <div class="text-slate-500 italic">&gt; Executing line ${currentStep.line}...</div>
            `}
            ${practical.simulatedOutput ? practical.simulatedOutput.slice(0, currentStepIndex + 2).map(line => `
              <div class="text-slate-300">${line}</div>
            `).join('') : ''}
          </div>
        </div>
      </div>
    </div>
  `;

  // Attach Event Listeners
  const btnPrev = container.querySelector('#btn-dryrun-prev');
  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      if (currentStepIndex > 0) {
        currentStepIndex--;
        renderDryRunVisualizer(container, practical);
      }
    });
  }

  const btnNext = container.querySelector('#btn-dryrun-next');
  if (btnNext) {
    btnNext.addEventListener('click', () => {
      if (currentStepIndex < steps.length - 1) {
        currentStepIndex++;
        renderDryRunVisualizer(container, practical);
      }
    });
  }

  const btnPlay = container.querySelector('#btn-dryrun-play');
  if (btnPlay) {
    btnPlay.addEventListener('click', () => {
      isPlaying = !isPlaying;
      if (isPlaying) {
        playInterval = setInterval(() => {
          if (currentStepIndex < steps.length - 1) {
            currentStepIndex++;
            renderDryRunVisualizer(container, practical);
          } else {
            isPlaying = false;
            clearInterval(playInterval);
            renderDryRunVisualizer(container, practical);
          }
        }, 1500);
      } else {
        clearInterval(playInterval);
      }
      renderDryRunVisualizer(container, practical);
    });
  }

  const btnReset = container.querySelector('#btn-dryrun-reset');
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      isPlaying = false;
      clearInterval(playInterval);
      currentStepIndex = 0;
      renderDryRunVisualizer(container, practical);
    });
  }
}
