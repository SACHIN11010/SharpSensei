import { appState } from '../appState.js';

let currentStepIndex = 0;
let isPlaying = false;
let playInterval = null;

export function renderDryRunVisualizer(container, practical) {
  if (!practical) return;

  const steps = practical.traceSteps && practical.traceSteps.length > 0 ? practical.traceSteps : [
    { line: 1, explanation: 'Initializing execution context...', variables: { args: '[]' } },
    { line: 5, explanation: 'Method entry point invoked.', variables: { n: 5 } },
    { line: 10, explanation: 'Calculating algorithm result...', variables: { n: 5, result: 120 } }
  ];

  if (currentStepIndex >= steps.length) currentStepIndex = 0;
  const currentStep = steps[currentStepIndex];

  const starterCode = practical.starterCode || `using System;

namespace SharpSenseiStudio
{
    class Program
    {
        static void Main(string[] args)
        {
            // Write your C# solution code here
            Console.WriteLine("Executing Practical #${practical.id}...");
        }
    }
}`;

  container.innerHTML = `
    <div class="flex flex-col h-full space-y-4 font-['Hanken_Grotesk',sans-serif] text-[#e5e2e1]">
      <!-- Panel 1: Write It Yourself Module -->
      <section class="bg-[#131313] border border-[#3e484f] rounded-lg flex flex-col min-h-[280px] overflow-hidden shadow-md">
        <!-- Header -->
        <div class="bg-[#1b1b1c] border-b border-[#3e484f] p-2.5 flex justify-between items-center shrink-0 select-none">
          <div class="flex items-center gap-2">
            <i data-lucide="edit-3" class="w-4 h-4 text-[#78d1ff]"></i>
            <h2 class="font-['JetBrains_Mono',monospace] text-xs font-bold text-[#e5e2e1] uppercase tracking-wider">Write It Yourself</h2>
          </div>
          <button id="btn-run-user-code" class="bg-[#00a3d9] text-black font-['JetBrains_Mono',monospace] text-xs font-bold px-3 py-1 rounded hover:bg-[#008fbf] transition-colors flex items-center gap-1 shadow">
            <i data-lucide="play" class="w-3.5 h-3.5 fill-black"></i> Run Code
          </button>
        </div>

        <!-- Code Editor Area -->
        <div class="flex-1 bg-[#0e0e0e] font-['JetBrains_Mono',monospace] text-xs flex overflow-hidden">
          <!-- Line Numbers Column -->
          <div class="w-12 bg-[#1b1b1c] border-r border-[#3e484f] text-[#bdc8d0]/40 text-right pr-3 py-2.5 shrink-0 select-none leading-relaxed">
            1<br/>2<br/>3<br/>4<br/>5<br/>6<br/>7<br/>8<br/>9<br/>10<br/>11<br/>12<br/>13<br/>14<br/>15
          </div>
          <!-- Code Input Area -->
          <textarea
            id="user-code-input"
            class="flex-1 p-2.5 text-[#e5e2e1] bg-transparent font-['JetBrains_Mono',monospace] text-xs leading-relaxed focus:outline-none resize-none border-none overflow-auto"
            spellcheck="false"
          >${escapeHtml(starterCode)}</textarea>
        </div>
      </section>

      <!-- Panel 2: Dry Run Stepper Module -->
      <section class="bg-[#131313] border border-[#3e484f] rounded-lg flex flex-col min-h-[280px] overflow-hidden shadow-md">
        <!-- Control Header -->
        <div class="bg-[#1b1b1c] border-b border-[#3e484f] p-2.5 flex justify-between items-center shrink-0 select-none">
          <div class="flex items-center gap-2">
            <i data-lucide="cpu" class="w-4 h-4 text-[#ffb86d]"></i>
            <h2 class="font-['JetBrains_Mono',monospace] text-xs font-bold text-[#e5e2e1] uppercase tracking-wider">
              Dry Run (Step ${currentStepIndex + 1}/${steps.length})
            </h2>
          </div>
          <div class="flex gap-1.5 font-['JetBrains_Mono',monospace] text-xs">
            <button
              id="btn-dryrun-prev"
              ${currentStepIndex === 0 ? 'disabled' : ''}
              class="border border-[#3e484f] text-[#e5e2e1] px-2.5 py-1 hover:bg-[#2a2a2a] disabled:opacity-30 transition-colors rounded font-bold flex items-center gap-1 cursor-pointer"
            >
              <i data-lucide="skip-back" class="w-3 h-3"></i> Prev Step
            </button>
            <button
              id="btn-dryrun-play"
              class="border border-[#3e484f] text-[#78d1ff] px-3 py-1 hover:bg-[#2a2a2a] transition-colors rounded font-bold flex items-center gap-1 cursor-pointer"
            >
              <i data-lucide="${isPlaying ? 'pause' : 'play'}" class="w-3 h-3"></i> ${isPlaying ? 'Pause' : 'Auto Step'}
            </button>
            <button
              id="btn-dryrun-next"
              ${currentStepIndex === steps.length - 1 ? 'disabled' : ''}
              class="border border-[#3e484f] text-[#e5e2e1] px-2.5 py-1 hover:bg-[#2a2a2a] disabled:opacity-30 transition-colors rounded font-bold flex items-center gap-1 cursor-pointer"
            >
              Next Step <i data-lucide="skip-forward" class="w-3 h-3"></i>
            </button>
          </div>
        </div>

        <!-- Step-through Execution Visualization Table -->
        <div class="flex-1 p-4 bg-[#0e0e0e] overflow-auto">
          <table class="w-full text-left border-collapse font-['JetBrains_Mono',monospace] text-xs">
            <thead>
              <tr class="border-b border-[#3e484f] text-[#bdc8d0] text-[11px] uppercase tracking-wider">
                <th class="pb-2 w-20">Line #</th>
                <th class="pb-2">Operation</th>
                <th class="pb-2 text-right">Variable States</th>
              </tr>
            </thead>
            <tbody>
              ${steps.map((step, idx) => {
                const isCurrent = idx === currentStepIndex;
                return `
                  <tr class="border-b border-[#3e484f]/40 transition-colors ${
                    isCurrent ? 'bg-[#702982]/20 text-white border-l-2 border-[#00a3d9]' : 'hover:bg-[#1b1b1c] text-[#bdc8d0]'
                  }">
                    <td class="py-2.5 font-bold ${isCurrent ? 'text-[#78d1ff]' : 'text-[#bdc8d0]'}">${step.line}</td>
                    <td class="py-2.5 ${isCurrent ? 'text-white font-bold' : ''}">${escapeHtml(step.explanation)}</td>
                    <td class="py-2.5 text-right">
                      <div class="flex justify-end gap-1.5 flex-wrap">
                        ${Object.entries(step.variables || {}).map(([key, val]) => `
                          <span class="border ${isCurrent ? 'border-[#00a3d9] text-[#78d1ff]' : 'border-[#3e484f] text-[#f4aeff]'} px-1.5 py-0.5 rounded bg-[#1b1b1c] text-[11px]">
                            ${key} = ${escapeHtml(String(val))}
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
      </section>

      <!-- IDE Status Footer Ribbon -->
      <footer class="bg-[#0e0e0e] border-t border-[#3e484f] flex justify-between items-center px-3 h-8 shrink-0 select-none font-['JetBrains_Mono',monospace] text-xs text-[#bdc8d0] rounded-b">
        <div class="text-[#f4aeff] font-bold flex items-center gap-1.5">
          <i data-lucide="bot" class="w-3.5 h-3.5 text-[#00a3d9]"></i>
          <span>AI Engine: READY | Ln ${currentStep.line}, Col 1 | UTF-8 | C#</span>
        </div>
        <div class="flex gap-4">
          <button id="btn-status-system" class="hover:text-[#78d1ff] transition-colors cursor-pointer">System Status</button>
          <button id="btn-status-feedback" class="hover:text-[#78d1ff] transition-colors cursor-pointer">Feedback</button>
          <button id="btn-status-docs" class="hover:text-[#78d1ff] transition-colors cursor-pointer">Docs</button>
        </div>
      </footer>
    </div>
  `;

  // Attach Event Handlers
  const btnRun = container.querySelector('#btn-run-user-code');
  if (btnRun) {
    btnRun.addEventListener('click', () => {
      btnRun.innerHTML = `<i data-lucide="check" class="w-3.5 h-3.5"></i> Executing...`;
      setTimeout(() => {
        btnRun.innerHTML = `<i data-lucide="play" class="w-3.5 h-3.5 fill-black"></i> Run Code`;
      }, 1500);
    });
  }

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
}

function escapeHtml(str) {
  return (str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

