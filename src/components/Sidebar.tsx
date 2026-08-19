import React, { useState, useMemo } from 'react';
import { Practical } from '../types';
import { ThemeId, themes } from '../theme';
import { 
  Search, 
  CheckCircle2, 
  Circle, 
  Star, 
  ChevronRight, 
  ChevronDown, 
  X,
  Layers
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface SidebarProps {
  practicals: Practical[];
  activePracticalId: number;
  currentTheme?: ThemeId;
  onSelectPractical: (id: number) => void;
  completedIds: number[];
  onToggleComplete: (id: number) => void;
  starredIds: number[];
  onToggleStar: (id: number) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  practicals,
  activePracticalId,
  onSelectPractical,
  completedIds,
  onToggleComplete,
  starredIds,
  onToggleStar,
  isOpenMobile,
  onCloseMobile
}) => {
  const { theme: activeThemeConfig } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'pending' | 'starred'>('all');
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    'Module 1: C# OOP & Basics': true,
    'Module 2: Windows Forms Controls': true,
    'Module 3: Advanced Controls & GDI+': true,
    'Module 4: ADO.NET & Database': true
  });

  const filteredPracticals = useMemo(() => {
    return practicals.filter(p => {
      // Search filter
      const matchesSearch = !searchTerm || 
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.aim.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.id.toString() === searchTerm;

      // Status filter
      let matchesStatus = true;
      if (statusFilter === 'completed') {
        matchesStatus = completedIds.includes(p.id);
      } else if (statusFilter === 'pending') {
        matchesStatus = !completedIds.includes(p.id);
      } else if (statusFilter === 'starred') {
        matchesStatus = starredIds.includes(p.id);
      }

      return matchesSearch && matchesStatus;
    });
  }, [practicals, searchTerm, statusFilter, completedIds, starredIds]);

  // Group by module
  const groupedByModule = useMemo(() => {
    const groups: Record<string, Practical[]> = {
      'Module 1: C# OOP & Basics': [],
      'Module 2: Windows Forms Controls': [],
      'Module 3: Advanced Controls & GDI+': [],
      'Module 4: ADO.NET & Database': []
    };

    filteredPracticals.forEach(p => {
      if (groups[p.module]) {
        groups[p.module].push(p);
      } else {
        groups[p.module] = [p];
      }
    });

    return groups;
  }, [filteredPracticals]);

  const toggleModuleExpand = (moduleName: string) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleName]: !prev[moduleName]
    }));
  };

  const progressPercent = Math.round((completedIds.length / practicals.length) * 100);

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-xs z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Main Sidebar Shell */}
      <aside 
        className={`fixed lg:static top-0 bottom-0 left-0 z-40 w-72 lg:w-80 ${activeThemeConfig.sidebarBg} border-r ${activeThemeConfig.borderColor} flex flex-col transition-transform duration-200 ease-in-out select-none ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Mobile Header Close */}
        <div className={`lg:hidden flex items-center justify-between p-3 border-b ${activeThemeConfig.borderColor}`}>
          <span className={`text-xs font-bold ${activeThemeConfig.textHeading} uppercase`}>PRACTICALS DIRECTORY</span>
          <button 
            onClick={onCloseMobile}
            className={`p-1 ${activeThemeConfig.textMuted} hover:${activeThemeConfig.textHeading}`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress & Quick Stats Card */}
        <div className={`p-3 border-b ${activeThemeConfig.borderColor} ${activeThemeConfig.cardSubBg} space-y-2`}>
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider">
            <span className={activeThemeConfig.textMuted}>SYLLABUS PROGRESS</span>
            <span style={{ color: activeThemeConfig.previewColor }}>{completedIds.length}/{practicals.length} ({progressPercent}%)</span>
          </div>

          {/* Progress Bar with theme dynamic fill */}
          <div className="w-full h-1.5 bg-black/50 rounded-full overflow-hidden border border-white/5">
            <div 
              className="h-full transition-all duration-300 rounded-full"
              style={{ 
                width: `${progressPercent}%`,
                backgroundColor: activeThemeConfig.previewColor 
              }}
            />
          </div>

          <div className="flex items-center justify-between pt-1 text-[9px] text-slate-400">
            <span className="flex items-center gap-1">
              <Star className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
              <span>{starredIds.length} Starred</span>
            </span>
            <span className="flex items-center gap-1">
              <Layers className="w-2.5 h-2.5 text-cyan-400" />
              <span>4 Modules / 38 Items</span>
            </span>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className={`p-2.5 border-b ${activeThemeConfig.borderColor} space-y-2`}>
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search practicals (e.g. 15, GDI+, DB)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full ${activeThemeConfig.cardBg} border ${activeThemeConfig.borderColor} pl-8 pr-2 py-1 text-xs ${activeThemeConfig.textHeading} rounded-xs focus:outline-none placeholder-slate-500 focus:border-slate-500 transition-colors`}
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white text-[10px]"
              >
                ×
              </button>
            )}
          </div>

          {/* Status Filter Tabs */}
          <div className="grid grid-cols-4 gap-1 text-[9px] font-bold uppercase text-center">
            <button
              onClick={() => setStatusFilter('all')}
              className={`py-1 rounded-xs transition-colors cursor-pointer ${
                statusFilter === 'all' 
                  ? `${activeThemeConfig.cardSubBg} ${activeThemeConfig.textHeading} border ${activeThemeConfig.borderColor}` 
                  : `${activeThemeConfig.textMuted} hover:${activeThemeConfig.textHeading}`
              }`}
            >
              ALL
            </button>
            <button
              onClick={() => setStatusFilter('completed')}
              className={`py-1 rounded-xs transition-colors cursor-pointer ${
                statusFilter === 'completed' 
                  ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800' 
                  : `${activeThemeConfig.textMuted} hover:text-emerald-300`
              }`}
            >
              DONE ({completedIds.length})
            </button>
            <button
              onClick={() => setStatusFilter('pending')}
              className={`py-1 rounded-xs transition-colors cursor-pointer ${
                statusFilter === 'pending' 
                  ? 'bg-rose-950/80 text-rose-300 border border-rose-800' 
                  : `${activeThemeConfig.textMuted} hover:text-rose-300`
              }`}
            >
              TODO
            </button>
            <button
              onClick={() => setStatusFilter('starred')}
              className={`py-1 rounded-xs transition-colors cursor-pointer ${
                statusFilter === 'starred' 
                  ? 'bg-amber-950/80 text-amber-300 border border-amber-800' 
                  : `${activeThemeConfig.textMuted} hover:text-amber-300`
              }`}
            >
              STAR ({starredIds.length})
            </button>
          </div>
        </div>

        {/* Practicals List Tree */}
        <div className="flex-1 overflow-y-auto p-2 space-y-3 text-[11px]">
          {(Object.entries(groupedByModule) as [string, Practical[]][]).map(([moduleName, items]) => {
            if (items.length === 0) return null;
            const isExpanded = expandedModules[moduleName] ?? true;
            const completedInModule = items.filter(i => completedIds.includes(i.id)).length;

            return (
              <div key={moduleName} className="space-y-1">
                {/* Module Header Bar */}
                <button
                  onClick={() => toggleModuleExpand(moduleName)}
                  className={`w-full flex items-center justify-between px-2 py-1 ${activeThemeConfig.cardSubBg} border ${activeThemeConfig.borderColor} text-left text-[10px] font-bold ${activeThemeConfig.textHeading} uppercase tracking-tight hover:border-slate-500 transition-colors rounded-sm cursor-pointer`}
                >
                  <div className="flex items-center gap-1.5 truncate">
                    {isExpanded ? <ChevronDown className="w-3 h-3" style={{ color: activeThemeConfig.previewColor }} /> : <ChevronRight className="w-3 h-3 text-slate-500" />}
                    <span className="truncate">{moduleName}</span>
                  </div>
                  <span className="text-[9px] shrink-0 ml-1 font-bold" style={{ color: activeThemeConfig.previewColor }}>
                    [{completedInModule}/{items.length}]
                  </span>
                </button>

                {/* Practical Row Items */}
                {isExpanded && (
                  <div className="space-y-0.5 pl-1">
                    {items.map(practical => {
                      const isActive = practical.id === activePracticalId;
                      const isCompleted = completedIds.includes(practical.id);
                      const isStarred = starredIds.includes(practical.id);

                      return (
                        <div
                          key={practical.id}
                          id={`sidebar-item-${practical.id}`}
                          onClick={() => {
                            onSelectPractical(practical.id);
                            onCloseMobile();
                          }}
                          className={`group flex items-center justify-between gap-2 px-2 py-1 rounded-sm cursor-pointer transition-all duration-150 hover:translate-x-0.5 ${
                            isActive
                              ? `${activeThemeConfig.accentBadgeBg} border font-bold shadow-xs relative before:absolute before:left-0 before:top-1 before:bottom-1 before:w-0.5 before:bg-current`
                              : `${activeThemeConfig.textMuted} hover:${activeThemeConfig.cardSubBg} hover:${activeThemeConfig.textHeading} border border-transparent`
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0 flex-1">
                            <span 
                              className={`w-5 h-4 flex items-center justify-center font-bold text-[9px] rounded-xs shrink-0 transition-transform group-hover:scale-105 ${
                                isActive 
                                  ? `${activeThemeConfig.accentBg} ${activeThemeConfig.accentTextColor}` 
                                  : `${activeThemeConfig.cardSubBg} ${activeThemeConfig.textMuted}`
                              }`}
                            >
                              P{practical.id}
                            </span>
                            <span className="truncate text-[11px] group-hover:text-slate-200 transition-colors">
                              {practical.title}
                            </span>
                          </div>

                          <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                            {/* Star Action */}
                            <button
                              onClick={() => onToggleStar(practical.id)}
                              className="p-0.5 text-slate-500 hover:text-amber-400 active:scale-90 transition-all cursor-pointer"
                              title={isStarred ? 'Unstar' : 'Star'}
                            >
                              <Star className={`w-3 h-3 ${isStarred ? 'fill-amber-400 text-amber-400' : ''}`} />
                            </button>

                            {/* Complete Action */}
                            <button
                              onClick={() => onToggleComplete(practical.id)}
                              className={`p-0.5 active:scale-90 transition-all cursor-pointer ${isCompleted ? 'text-emerald-400' : 'text-slate-500 hover:text-slate-300'}`}
                              title={isCompleted ? 'Completed' : 'Pending'}
                            >
                              {isCompleted ? (
                                <CheckCircle2 className="w-3 h-3 fill-emerald-500/20 text-emerald-400" />
                              ) : (
                                <Circle className="w-3 h-3" />
                              )}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Quick Switch Summary */}
        <div className={`p-2.5 border-t ${activeThemeConfig.borderColor} ${activeThemeConfig.cardSubBg} text-[10px] ${activeThemeConfig.textMuted} flex items-center justify-between`}>
          <span>BCA 5th Sem // C# Lab</span>
          <span className="font-mono" style={{ color: activeThemeConfig.previewColor }}>38 Practicals</span>
        </div>
      </aside>
    </>
  );
};
