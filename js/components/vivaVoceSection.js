import { appState } from '../appState.js';
import { generalVivaQuestions } from '../data/vivaData.js';

export function renderVivaVoceSection(container, practical) {
  const { themeConfig } = appState;
  const questions = practical?.vivaQuestions || generalVivaQuestions.slice(0, 4);

  container.innerHTML = `
    <div class="space-y-4 select-none">
      <div class="border ${themeConfig.borderColor} ${themeConfig.cardBg} rounded-sm p-4 space-y-2 shadow-md">
        <div class="flex items-center gap-2 text-violet-400">
          <i data-lucide="graduation-cap" class="w-4 h-4"></i>
          <h3 class="text-xs font-bold uppercase tracking-wider">BCA Sem-5 University Viva Voce Examination Bank</h3>
        </div>
        <p class="text-xs ${themeConfig.textColor} leading-relaxed">
          Master these frequent external examiner interview questions related to <strong>${practical?.title || 'C# .NET GUI'}</strong>.
        </p>
      </div>

      <div class="space-y-3">
        ${questions.map((q, idx) => `
          <div class="border ${themeConfig.borderColor} ${themeConfig.cardSubBg} rounded-sm p-4 space-y-3">
            <div class="flex items-start justify-between gap-3">
              <div class="flex items-start gap-2.5">
                <span class="px-1.5 py-0.5 rounded bg-violet-500/20 text-violet-300 font-black text-[10px] shrink-0 border border-violet-500/30">
                  Q${idx + 1}
                </span>
                <h4 class="text-xs font-bold ${themeConfig.textHeading} leading-normal">
                  ${q.question}
                </h4>
              </div>
            </div>

            <div class="p-3 bg-black/20 rounded-sm border ${themeConfig.borderColor} space-y-2 text-xs">
              <div>
                <span class="text-[10px] font-bold text-slate-500 uppercase block mb-0.5">SHORT ANSWER:</span>
                <p class="text-cyan-300 font-medium">${q.shortAnswer}</p>
              </div>

              <div class="viva-detailed-answer hidden pt-2 border-t border-slate-800">
                <span class="text-[10px] font-bold text-slate-500 uppercase block mb-0.5">DETAILED EXPLANATION:</span>
                <p class="${themeConfig.textColor} leading-relaxed">${q.detailedAnswer}</p>
              </div>

              <button class="btn-toggle-viva-detail text-[10px] font-bold text-amber-400 hover:underline pt-1 cursor-pointer">
                SHOW DETAILED EXPLANATION ▼
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // Attach toggle listeners
  container.querySelectorAll('.btn-toggle-viva-detail').forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.closest('.space-y-2');
      const detailDiv = parent.querySelector('.viva-detailed-answer');
      if (detailDiv) {
        const isHidden = detailDiv.classList.contains('hidden');
        if (isHidden) {
          detailDiv.classList.remove('hidden');
          btn.textContent = 'HIDE DETAILED EXPLANATION ▲';
        } else {
          detailDiv.classList.add('hidden');
          btn.textContent = 'SHOW DETAILED EXPLANATION ▼';
        }
      }
    });
  });
}
