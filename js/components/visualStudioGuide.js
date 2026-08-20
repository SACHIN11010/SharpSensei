import { appState } from '../appState.js';

export function renderVisualStudioGuide(container, practical) {
  const { themeConfig } = appState;
  if (!practical || !practical.vsSteps) {
    container.innerHTML = `
      <div class="p-6 border ${themeConfig.borderColor} ${themeConfig.cardSubBg} rounded-sm text-center text-xs ${themeConfig.textMuted}">
        No Visual Studio guide available for this practical.
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="space-y-4">
      <div class="border ${themeConfig.borderColor} ${themeConfig.cardBg} rounded-sm p-4 space-y-2 shadow-md">
        <div class="flex items-center gap-2 text-cyan-400">
          <i data-lucide="layout-template" class="w-4 h-4"></i>
          <h3 class="text-xs font-bold uppercase tracking-wider">Visual Studio Designer & Code-Behind Workflow</h3>
        </div>
        <p class="text-xs ${themeConfig.textColor} leading-relaxed">
          Follow these exact step-by-step instructions in Visual Studio (2019 / 2022 / 2025) to replicate <strong>Practical #${practical.id}</strong> from scratch.
        </p>
      </div>

      <!-- Steps Grid -->
      <div class="space-y-3">
        ${practical.vsSteps.map((step, idx) => `
          <div class="border ${themeConfig.borderColor} ${themeConfig.cardSubBg} rounded-sm p-4 space-y-2 flex items-start gap-3">
            <div class="w-7 h-7 rounded-sm ${themeConfig.accentBg} text-black font-black flex items-center justify-center text-xs shrink-0 shadow-sm">
              ${step.stepNumber || idx + 1}
            </div>

            <div class="space-y-1 min-w-0 flex-1">
              <h4 class="text-xs font-bold ${themeConfig.textHeading}">
                ${step.title}
              </h4>
              <p class="text-xs ${themeConfig.textColor} leading-relaxed">
                ${step.description}
              </p>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Practical VS Tips -->
      <div class="border ${themeConfig.borderColor} ${themeConfig.cardSubBg} p-4 rounded-sm space-y-2 text-xs ${themeConfig.textColor}">
        <h4 class="font-bold text-amber-400 flex items-center gap-1.5 uppercase tracking-wider">
          <i data-lucide="alert-triangle" class="w-4 h-4"></i>
          Visual Studio Keyboard Shortcuts
        </h4>
        <ul class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono pt-1">
          <li class="bg-black/20 p-2 rounded border ${themeConfig.borderColor}"><span class="text-cyan-400">Ctrl + Alt + X</span> : Open Toolbox</li>
          <li class="bg-black/20 p-2 rounded border ${themeConfig.borderColor}"><span class="text-cyan-400">F4</span> : Properties Window</li>
          <li class="bg-black/20 p-2 rounded border ${themeConfig.borderColor}"><span class="text-cyan-400">F7</span> : Toggle Code / Designer View</li>
          <li class="bg-black/20 p-2 rounded border ${themeConfig.borderColor}"><span class="text-cyan-400">F5</span> : Start Debugging</li>
        </ul>
      </div>
    </div>
  `;
}
