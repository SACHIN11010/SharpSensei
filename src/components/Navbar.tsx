import React from 'react';
import { 
  HelpCircle, 
  Printer, 
  Sparkles, 
  Code2,
  Palette,
  Layout,
  Columns,
  Maximize2,
  Grid3X3,
  Cpu,
  BookOpen
} from 'lucide-react';
import { ThemeId, LayoutMode, layoutOptions } from '../theme';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  completedCount: number;
  totalCount: number;
  currentTheme?: ThemeId;
  currentLayout?: LayoutMode;
  onSelectLayout: (mode: LayoutMode) => void;
  onOpenThemeSelector: () => void;
  onOpenQuiz: () => void;
  onOpenCheatsheet: () => void;
  onOpenLabRecord: () => void;
  onToggleAiTutor: () => void;
  isAiTutorOpen: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  completedCount,
  totalCount,
  onSelectLayout,
  onOpenThemeSelector,
  onOpenQuiz,
  onOpenCheatsheet,
  onOpenLabRecord,
  onToggleAiTutor,
  isAiTutorOpen
}) => {
  const { theme: activeThemeConfig, currentLayout } = useTheme();
  const percentage = Math.round((completedCount / totalCount) * 100);

  return (
    <header 
      id="main-header"
      className={`h-11 border-b ${activeThemeConfig.borderColor} flex items-center justify-between px-3 sm:px-4 ${activeThemeConfig.headerBg} ${activeThemeConfig.textColor} font-mono shrink-0 select-none z-40`}
    >
      {/* Left Branding & High Density Telemetry */}
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="flex items-center gap-2">
          <div 
            className="w-4 h-4 rounded-xs flex items-center justify-center text-[9px] font-black shadow-xs"
            style={{ backgroundColor: activeThemeConfig.previewColor, color: activeThemeConfig.accentTextColor }}
          >
            C#
          </div>
          <span className={`font-bold tracking-tighter text-xs uppercase sm:text-sm ${activeThemeConfig.textHeading}`}>
            SHARPSENSEI // WINFORMS.IDE
          </span>
        </div>

        <div className={`h-4 w-[1px] ${activeThemeConfig.borderColor} hidden md:block`}></div>

        {/* Layout Mode Selector Bar */}
        <div className={`hidden lg:flex items-center gap-0.5 border ${activeThemeConfig.borderColor} bg-black/40 rounded-sm p-0.5`}>
          {layoutOptions.map((opt) => {
            const isActive = opt.id === currentLayout;
            return (
              <button
                key={opt.id}
                onClick={() => onSelectLayout(opt.id)}
                className={`px-1.5 py-0.5 rounded-xs text-[8.5px] font-bold uppercase tracking-tight flex items-center gap-1 transition-all cursor-pointer ${
                  isActive
                    ? 'font-black'
                    : `${activeThemeConfig.textMuted} hover:${activeThemeConfig.textHeading}`
                }`}
                style={isActive ? { 
                  backgroundColor: activeThemeConfig.previewColor,
                  color: activeThemeConfig.accentTextColor
                } : {}}
                title={`${opt.name} — ${opt.description}`}
              >
                {opt.id === 'classic' && <Layout className="w-2.5 h-2.5" />}
                {opt.id === 'dual-pane' && <Columns className="w-2.5 h-2.5" />}
                {opt.id === 'debugger-pro' && <Cpu className="w-2.5 h-2.5" />}
                {opt.id === 'viva-master' && <BookOpen className="w-2.5 h-2.5" />}
                {opt.id === 'zen-focus' && <Maximize2 className="w-2.5 h-2.5" />}
                {opt.id === 'syllabus-board' && <Grid3X3 className="w-2.5 h-2.5" />}
                <span>{opt.name.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Center Progress Telemetry */}
      <div className={`hidden 2xl:flex items-center gap-3 ${activeThemeConfig.cardBg} border ${activeThemeConfig.borderColor} px-3 py-1 rounded-sm text-[10px]`}>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className={`${activeThemeConfig.textMuted} uppercase`}>Progress:</span>
          <span className="font-bold" style={{ color: activeThemeConfig.previewColor }}>{completedCount}/{totalCount}</span>
          <span className={`${activeThemeConfig.textMuted} font-mono`}>({percentage}%)</span>
        </div>
        <div className="w-16 h-1.5 bg-black/40 rounded-sm overflow-hidden border border-white/5">
          <div 
            className="h-full transition-all duration-300"
            style={{ width: `${percentage}%`, backgroundColor: activeThemeConfig.previewColor }}
          />
        </div>
      </div>

      {/* Right Tools & Compact Navigation */}
      <div className="flex items-center gap-1.5 sm:gap-2 text-[10px]">
        {/* Layout & Theme Studio Switcher Button */}
        <button
          id="btn-theme-selector"
          onClick={onOpenThemeSelector}
          className={`flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-bold rounded-sm uppercase tracking-wider border ${activeThemeConfig.borderColor} ${activeThemeConfig.cardBg} hover:border-slate-500 ${activeThemeConfig.textHeading} transition-all active:scale-95 shadow-xs cursor-pointer`}
          title="Switch Color Theme & Workspace Layout"
        >
          <span 
            className="w-2.5 h-2.5 rounded-full inline-block border border-black/30"
            style={{ backgroundColor: activeThemeConfig.previewColor }}
          />
          <Palette className="w-3 h-3 text-slate-300" />
          <span className="hidden sm:inline">DESIGN & LAYOUT</span>
        </button>

        {/* AI Tutor Button */}
        <button
          id="btn-ai-tutor"
          onClick={onToggleAiTutor}
          className={`flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-bold rounded-sm uppercase tracking-wider transition-all active:scale-95 cursor-pointer ${
            isAiTutorOpen
              ? 'shadow-sm'
              : `${activeThemeConfig.cardSubBg} border ${activeThemeConfig.borderColor} ${activeThemeConfig.textHeading} hover:border-slate-500`
          }`}
          style={isAiTutorOpen ? { 
            backgroundColor: activeThemeConfig.previewColor, 
            color: activeThemeConfig.accentTextColor 
          } : {}}
          title="AI C# Assistant"
        >
          <Sparkles className="w-3 h-3" style={!isAiTutorOpen ? { color: activeThemeConfig.previewColor } : undefined} />
          <span className="hidden xs:inline">AI_TUTOR</span>
        </button>

        {/* Viva Quiz */}
        <button
          id="btn-viva-quiz"
          onClick={onOpenQuiz}
          className={`flex items-center gap-1 px-2 py-1 text-[11px] font-semibold ${activeThemeConfig.cardBg} hover:border-slate-500 ${activeThemeConfig.textHeading} border ${activeThemeConfig.borderColor} rounded-sm transition-all active:scale-95 cursor-pointer`}
          title="Viva Examination Quiz"
        >
          <HelpCircle className="w-3 h-3" style={{ color: activeThemeConfig.previewColor }} />
          <span className="hidden sm:inline">QUIZ</span>
        </button>

        {/* Cheatsheet */}
        <button
          id="btn-cheatsheet"
          onClick={onOpenCheatsheet}
          className={`flex items-center gap-1 px-2 py-1 text-[11px] font-semibold ${activeThemeConfig.cardBg} hover:border-slate-500 ${activeThemeConfig.textHeading} border ${activeThemeConfig.borderColor} rounded-sm transition-all active:scale-95 cursor-pointer`}
          title="WinForms Cheatsheet"
        >
          <Code2 className="w-3 h-3 text-amber-400" />
          <span className="hidden md:inline">CHEATSHEET</span>
        </button>

        {/* Lab Record Generator */}
        <button
          id="btn-lab-record"
          onClick={onOpenLabRecord}
          className={`flex items-center gap-1 px-2 py-1 text-[11px] font-semibold ${activeThemeConfig.cardBg} hover:border-slate-500 ${activeThemeConfig.textHeading} border ${activeThemeConfig.borderColor} rounded-sm transition-all active:scale-95 cursor-pointer`}
          title="Export Lab Manual"
        >
          <Printer className="w-3 h-3 text-emerald-400" />
          <span className="hidden md:inline">RECORD</span>
        </button>
      </div>
    </header>
  );
};
