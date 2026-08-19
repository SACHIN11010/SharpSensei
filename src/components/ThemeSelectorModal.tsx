import React, { useState } from 'react';
import { ThemeId, themes, ThemeConfig, LayoutMode, layoutOptions } from '../theme';
import { 
  Palette, 
  Check, 
  X, 
  Sun, 
  Moon, 
  Layout, 
  Columns, 
  Maximize2, 
  Grid3X3, 
  Cpu, 
  BookOpen
} from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';

interface ThemeSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme?: ThemeId;
  onSelectTheme: (id: ThemeId) => void;
  currentLayout?: LayoutMode;
  onSelectLayout: (mode: LayoutMode) => void;
}

export const ThemeSelectorModal: React.FC<ThemeSelectorModalProps> = ({
  isOpen,
  onClose,
  onSelectTheme,
  onSelectLayout
}) => {
  const { theme: activeThemeConfig, currentTheme, currentLayout, setTheme, setLayout } = useTheme();
  const [activeTab, setActiveTab] = useState<'themes' | 'layouts'>('themes');
  const [themeFilter, setThemeFilter] = useState<'all' | 'dark' | 'light'>('all');
  if (!isOpen) return null;

  const filteredThemes = (Object.values(themes) as ThemeConfig[]).filter(t => {
    if (themeFilter === 'all') return true;
    return t.category === themeFilter;
  });

  const handlePickTheme = (id: ThemeId) => {
    setTheme(id);
    onSelectTheme(id);
  };

  const handlePickLayout = (layout: LayoutMode) => {
    setLayout(layout);
    onSelectLayout(layout);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-xs font-mono">
      <motion.div 
        initial={{ opacity: 0, scale: 0.96, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className={`relative w-full max-w-3xl rounded-md border ${activeThemeConfig.borderColor} ${activeThemeConfig.cardBg} shadow-2xl overflow-hidden flex flex-col max-h-[92vh]`}
      >
        {/* Header */}
        <div className={`flex items-center justify-between p-3.5 border-b ${activeThemeConfig.borderColor} ${activeThemeConfig.headerBg}`}>
          <div className="flex items-center gap-2.5">
            <div 
              className="w-7 h-7 rounded-sm flex items-center justify-center font-bold shadow-xs"
              style={{ backgroundColor: activeThemeConfig.previewColor, color: activeThemeConfig.accentTextColor }}
            >
              <Palette className="w-4 h-4" />
            </div>
            <div>
              <h3 className={`text-xs font-bold ${activeThemeConfig.textHeading} uppercase tracking-tight flex items-center gap-2`}>
                ENTERPRISE_STUDIO_DESIGN_HUB
                <span 
                  className="text-[9px] px-1.5 py-0.2 rounded-xs font-bold border"
                  style={{ 
                    backgroundColor: `${activeThemeConfig.previewColor}15`,
                    color: activeThemeConfig.previewColor,
                    borderColor: `${activeThemeConfig.previewColor}40`
                  }}
                >
                  {Object.keys(themes).length} THEMES // {layoutOptions.length} LAYOUTS
                </span>
              </h3>
              <p className={`text-[10px] ${activeThemeConfig.textMuted}`}>Select industry-standard developer themes and specialized lab viewports</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className={`p-1.5 rounded-sm ${activeThemeConfig.textMuted} hover:${activeThemeConfig.textHeading} hover:bg-white/10 transition-colors cursor-pointer`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher (Color Themes vs Workspace Layouts) */}
        <div className={`flex border-b ${activeThemeConfig.borderColor} ${activeThemeConfig.sidebarBg} px-3 pt-2 gap-2 text-xs font-bold uppercase`}>
          <button
            onClick={() => setActiveTab('themes')}
            className="flex items-center gap-1.5 px-3.5 py-2 border-b-2 transition-all cursor-pointer"
            style={activeTab === 'themes' ? { borderColor: activeThemeConfig.previewColor, color: activeThemeConfig.textHeading } : { borderColor: 'transparent', color: '#64748b' }}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>1. COLOR THEMES ({Object.keys(themes).length})</span>
          </button>

          <button
            onClick={() => setActiveTab('layouts')}
            className="flex items-center gap-1.5 px-3.5 py-2 border-b-2 transition-all cursor-pointer"
            style={activeTab === 'layouts' ? { borderColor: activeThemeConfig.previewColor, color: activeThemeConfig.textHeading } : { borderColor: 'transparent', color: '#64748b' }}
          >
            <Layout className="w-3.5 h-3.5" />
            <span>2. WORKSPACE LAYOUTS ({layoutOptions.length})</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="p-4 overflow-y-auto space-y-4 max-h-[64vh]">
          {activeTab === 'themes' ? (
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 text-[11px]">
                <div className="flex items-center gap-1.5">
                  <span className={`text-[10px] ${activeThemeConfig.textMuted} uppercase font-bold mr-1`}>FILTER:</span>
                  {(['all', 'dark', 'light'] as const).map(mode => (
                    <button
                      key={mode}
                      onClick={() => setThemeFilter(mode)}
                      className={`px-2.5 py-0.5 rounded-xs text-[10px] font-bold uppercase transition-all cursor-pointer ${
                        themeFilter === mode 
                          ? `${activeThemeConfig.cardSubBg} ${activeThemeConfig.textHeading} border ${activeThemeConfig.borderColor}` 
                          : `${activeThemeConfig.cardBg} ${activeThemeConfig.textMuted} hover:${activeThemeConfig.textHeading} border ${activeThemeConfig.borderColor}`
                      }`}
                    >
                      {mode} ({mode === 'all' ? Object.keys(themes).length : mode === 'dark' ? 9 : 2})
                    </button>
                  ))}
                </div>

                <span className="text-[10px] font-bold uppercase" style={{ color: activeThemeConfig.previewColor }}>
                  ACTIVE: {activeThemeConfig.name}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredThemes.map((theme) => {
                  const isSelected = theme.id === currentTheme;

                  return (
                    <button
                      key={theme.id}
                      onClick={() => handlePickTheme(theme.id)}
                      style={isSelected ? { borderColor: activeThemeConfig.previewColor, boxShadow: `0 0 0 1px ${activeThemeConfig.previewColor}` } : undefined}
                      className={`p-3 rounded-md border text-left flex flex-col justify-between gap-2.5 transition-all group cursor-pointer ${
                        isSelected
                          ? activeThemeConfig.cardSubBg
                          : `${activeThemeConfig.borderColor} ${activeThemeConfig.cardBg} hover:border-slate-500`
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2 min-w-0">
                          {/* Color swatch circles */}
                          <div className="flex -space-x-1.5 shrink-0">
                            <span 
                              className="w-4 h-4 rounded-full border border-black/40 shadow-xs inline-block"
                              style={{ backgroundColor: theme.previewColor }}
                            />
                            <span 
                              className="w-4 h-4 rounded-full border border-black/40 shadow-xs inline-block"
                              style={{ backgroundColor: theme.previewSecondary }}
                            />
                          </div>

                          <span className={`text-xs font-bold ${activeThemeConfig.textHeading} tracking-tight truncate`}>
                            {theme.name}
                          </span>
                        </div>

                        <div className="flex items-center gap-1 shrink-0 ml-1">
                          {theme.category === 'light' ? (
                            <Sun className="w-3 h-3 text-amber-400" />
                          ) : (
                            <Moon className="w-3 h-3 text-cyan-400" />
                          )}
                          {isSelected && (
                            <span 
                              className="w-4 h-4 rounded-full flex items-center justify-center font-bold"
                              style={{ backgroundColor: activeThemeConfig.previewColor, color: activeThemeConfig.accentTextColor }}
                            >
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </span>
                          )}
                        </div>
                      </div>

                      <p className={`text-[10px] ${activeThemeConfig.textMuted} leading-relaxed line-clamp-2`}>
                        {theme.description}
                      </p>

                      {/* Visual Preview Swatch Bar */}
                      <div className="w-full flex items-center gap-1 pt-1">
                        <div 
                          className="h-2 rounded-xs flex-1"
                          style={{ backgroundColor: theme.previewSecondary, border: `1px solid rgba(255,255,255,0.1)` }}
                        />
                        <div 
                          className="h-2 rounded-xs w-8"
                          style={{ backgroundColor: theme.previewColor }}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px]">
                <span className={activeThemeConfig.textMuted}>Select a viewport arrangement for your workflow:</span>
                <span className="text-[10px] font-bold uppercase" style={{ color: activeThemeConfig.previewColor }}>
                  ACTIVE: {layoutOptions.find(l => l.id === currentLayout)?.name}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {layoutOptions.map((layout) => {
                  const isSelected = layout.id === currentLayout;

                  return (
                    <button
                      key={layout.id}
                      onClick={() => handlePickLayout(layout.id)}
                      style={isSelected ? { borderColor: activeThemeConfig.previewColor, boxShadow: `0 0 0 1px ${activeThemeConfig.previewColor}` } : undefined}
                      className={`p-3 rounded-md border text-left flex flex-col justify-between gap-3 transition-all cursor-pointer ${
                        isSelected
                          ? activeThemeConfig.cardSubBg
                          : `${activeThemeConfig.borderColor} ${activeThemeConfig.cardBg} hover:border-slate-500`
                      }`}
                    >
                      <div className="flex items-start justify-between w-full">
                        <div className="flex items-center gap-2 min-w-0">
                          {layout.id === 'classic' && <Layout className="w-4 h-4 shrink-0" style={{ color: activeThemeConfig.previewColor }} />}
                          {layout.id === 'dual-pane' && <Columns className="w-4 h-4 text-emerald-400 shrink-0" />}
                          {layout.id === 'debugger-pro' && <Cpu className="w-4 h-4 text-sky-400 shrink-0" />}
                          {layout.id === 'viva-master' && <BookOpen className="w-4 h-4 text-violet-400 shrink-0" />}
                          {layout.id === 'zen-focus' && <Maximize2 className="w-4 h-4 text-amber-400 shrink-0" />}
                          {layout.id === 'syllabus-board' && <Grid3X3 className="w-4 h-4 text-rose-400 shrink-0" />}
                          
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className={`text-xs font-bold ${activeThemeConfig.textHeading} tracking-tight truncate`}>
                                {layout.name}
                              </span>
                            </div>
                            <span className={`text-[9px] ${activeThemeConfig.textMuted} truncate block`}>{layout.tagline}</span>
                          </div>
                        </div>

                        {isSelected && (
                          <span 
                            className="w-4 h-4 rounded-full flex items-center justify-center font-bold shrink-0 ml-1"
                            style={{ backgroundColor: activeThemeConfig.previewColor, color: activeThemeConfig.accentTextColor }}
                          >
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </span>
                        )}
                      </div>

                      <p className={`text-[10px] ${activeThemeConfig.textMuted} leading-relaxed line-clamp-2`}>
                        {layout.description}
                      </p>

                      {/* Visual Layout Blueprint Diagram */}
                      <div className={`w-full p-1.5 rounded-xs bg-black/40 border ${activeThemeConfig.borderColor} flex items-stretch gap-1 h-12`}>
                        {layout.id === 'classic' && (
                          <>
                            <div className={`w-1/4 rounded-xs ${activeThemeConfig.cardSubBg} border ${activeThemeConfig.borderColor} text-[7px] ${activeThemeConfig.textMuted} flex items-center justify-center font-bold`}>
                              LIST
                            </div>
                            <div className={`flex-1 rounded-xs ${activeThemeConfig.cardBg} border ${activeThemeConfig.borderColor} text-[7px] flex flex-col p-1 gap-0.5 justify-center`} style={{ color: activeThemeConfig.previewColor }}>
                              <div className="h-1.5 rounded-xs w-full" style={{ backgroundColor: `${activeThemeConfig.previewColor}30` }}></div>
                              <div className={`h-4 ${activeThemeConfig.cardSubBg} rounded-xs flex items-center justify-center text-[7px] font-bold`}>
                                STAGE
                              </div>
                            </div>
                          </>
                        )}

                        {layout.id === 'dual-pane' && (
                          <>
                            <div className={`w-1/5 rounded-xs ${activeThemeConfig.cardSubBg} text-[7px] ${activeThemeConfig.textMuted} flex items-center justify-center font-bold`}>
                              NAV
                            </div>
                            <div className="flex-1 rounded-xs bg-cyan-500/10 border border-cyan-500/40 text-[7px] text-cyan-300 flex items-center justify-center font-bold">
                              FORM GUI
                            </div>
                            <div className="flex-1 rounded-xs bg-violet-500/10 border border-violet-500/40 text-[7px] text-violet-300 flex items-center justify-center font-bold">
                              C# CODE
                            </div>
                          </>
                        )}

                        {layout.id === 'debugger-pro' && (
                          <>
                            <div className={`w-1/4 rounded-xs ${activeThemeConfig.cardSubBg} text-[6.5px] ${activeThemeConfig.textMuted} flex items-center justify-center font-bold`}>
                              TREE
                            </div>
                            <div className="flex-1 rounded-xs bg-sky-500/15 border border-sky-500/40 text-[6.5px] text-sky-300 flex items-center justify-center font-bold">
                              WINFORMS
                            </div>
                            <div className="w-1/3 rounded-xs bg-amber-500/15 border border-amber-500/40 text-[6.5px] text-amber-300 flex items-center justify-center font-bold">
                              VARS
                            </div>
                          </>
                        )}

                        {layout.id === 'viva-master' && (
                          <>
                            <div className={`flex-1 rounded-xs ${activeThemeConfig.cardSubBg} border ${activeThemeConfig.borderColor} text-[7px] ${activeThemeConfig.textHeading} flex items-center justify-center font-bold`}>
                              CODE & AIM
                            </div>
                            <div className="flex-1 rounded-xs bg-violet-500/20 border border-violet-500/50 text-[7px] text-violet-200 flex items-center justify-center font-bold">
                              VIVA PREP BANK
                            </div>
                          </>
                        )}

                        {layout.id === 'zen-focus' && (
                          <>
                            <div className={`w-3.5 rounded-xs ${activeThemeConfig.cardSubBg} text-[6px] ${activeThemeConfig.textMuted} flex items-center justify-center`}>
                              |
                            </div>
                            <div className={`flex-1 rounded-xs ${activeThemeConfig.cardBg} border ${activeThemeConfig.borderColor} text-[7px] flex items-center justify-center font-bold`} style={{ color: activeThemeConfig.previewColor }}>
                              MAXIMIZED FOCUSED CANVAS
                            </div>
                          </>
                        )}

                        {layout.id === 'syllabus-board' && (
                          <div className="w-full grid grid-cols-4 gap-1 p-0.5">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                              <div key={i} className={`rounded-xs ${activeThemeConfig.cardSubBg} border ${activeThemeConfig.borderColor} flex items-center justify-center text-[6px] ${activeThemeConfig.textMuted}`}>
                                P{i}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={`p-3 border-t ${activeThemeConfig.borderColor} ${activeThemeConfig.headerBg} flex justify-between items-center text-[10px] ${activeThemeConfig.textMuted}`}>
          <span>Preferences are automatically saved to local storage.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 font-bold uppercase tracking-wider rounded-xs text-[10px] transition-all cursor-pointer active:scale-95 shadow-sm"
            style={{ 
              backgroundColor: activeThemeConfig.previewColor, 
              color: activeThemeConfig.accentTextColor
            }}
          >
            APPLY & CLOSE
          </button>
        </div>
      </motion.div>
    </div>
  );
};
