import React from 'react';
import { Practical } from '../types';
import { ThemeId, themes } from '../theme';
import { 
  Play, 
  CheckCircle2, 
  Star, 
  Clock, 
  Layers, 
  Search
} from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';

interface SyllabusBoardProps {
  practicals: Practical[];
  activePracticalId: number;
  currentTheme?: ThemeId;
  completedIds: number[];
  starredIds: number[];
  onSelectPractical: (id: number) => void;
  onToggleComplete: (id: number) => void;
  onToggleStar: (id: number) => void;
}

export const SyllabusBoard: React.FC<SyllabusBoardProps> = ({
  practicals,
  activePracticalId,
  completedIds,
  starredIds,
  onSelectPractical,
  onToggleComplete,
  onToggleStar
}) => {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedModule, setSelectedModule] = React.useState<string>('ALL');

  // Group practicals by module
  const modules = React.useMemo(() => {
    const unique = Array.from(new Set(practicals.map(p => p.module)));
    return ['ALL', ...unique];
  }, [practicals]);

  const filteredPracticals = React.useMemo(() => {
    return practicals.filter(p => {
      const matchesModule = selectedModule === 'ALL' || p.module === selectedModule;
      const matchesSearch = !searchTerm || 
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.aim.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.id.toString() === searchTerm;
      return matchesModule && matchesSearch;
    });
  }, [practicals, selectedModule, searchTerm]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6"
    >
      {/* Top Banner with Stats & Progress */}
      <div className={`p-4 sm:p-6 rounded-md border ${theme.borderColor} ${theme.cardSubBg} flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg ring-1 ring-white/5`}>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <div 
              className="p-1.5 rounded-sm"
              style={{ backgroundColor: `${theme.previewColor}20` }}
            >
              <Layers className="w-5 h-5" style={{ color: theme.previewColor }} />
            </div>
            <h2 className={`text-base sm:text-lg font-bold ${theme.textHeading} uppercase tracking-tight`}>
              SHARPSENSEI // BCA SEMESTER 5 C# .NET MATRIX
            </h2>
          </div>
          <p className={`text-xs ${theme.textMuted} max-w-2xl`}>
            Curriculum reference <span className="font-semibold text-slate-300">MS23PMJDSCBCA501C</span> — 38 Practical Demonstrations with Complete Source Code, Live WinForms GUI, Algorithm Trace, & Viva Bank
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className={`px-3.5 py-2.5 rounded-md border ${theme.borderColor} ${theme.cardBg} text-center min-w-[70px] shadow-xs`}>
            <div className={`text-xl font-black ${theme.textHeading}`}>{completedIds.length}/38</div>
            <div className={`text-[9px] uppercase font-bold ${theme.textMuted}`}>COMPLETED</div>
          </div>
          <div className={`px-3.5 py-2.5 rounded-md border ${theme.borderColor} ${theme.cardBg} text-center min-w-[70px] shadow-xs`}>
            <div className="text-xl font-black text-amber-400">{starredIds.length}</div>
            <div className={`text-[9px] uppercase font-bold ${theme.textMuted}`}>STARRED</div>
          </div>
          <div className={`px-3.5 py-2.5 rounded-md border ${theme.borderColor} ${theme.cardBg} text-center min-w-[70px] shadow-xs`}>
            <div className="text-xl font-black" style={{ color: theme.previewColor }}>
              {Math.round((completedIds.length / 38) * 100)}%
            </div>
            <div className={`text-[9px] uppercase font-bold ${theme.textMuted}`}>PROGRESS</div>
          </div>
        </div>
      </div>

      {/* Filter / Search Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Module Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
          {modules.map(mod => {
            const isSelected = selectedModule === mod;
            return (
              <button
                key={mod}
                onClick={() => setSelectedModule(mod)}
                className={`px-3 py-1.5 rounded-sm text-[10px] font-bold uppercase whitespace-nowrap transition-all border ${
                  isSelected
                    ? `border-transparent font-black shadow-sm`
                    : `${theme.borderColor} ${theme.cardBg} ${theme.textMuted} hover:${theme.textHeading}`
                }`}
                style={isSelected ? { 
                  backgroundColor: theme.previewColor, 
                  color: theme.accentTextColor 
                } : {}}
              >
                {mod === 'ALL' ? 'ALL MODULES (38)' : mod.replace('Module ', 'M')}
              </button>
            );
          })}
        </div>

        {/* Search Field */}
        <div className="relative min-w-[240px]">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search practicals [ID, Aim, GDI+]..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full ${theme.cardBg} border ${theme.borderColor} pl-8 pr-3 py-1.5 text-xs ${theme.textHeading} rounded-sm focus:outline-none placeholder-slate-500 transition-colors`}
          />
        </div>
      </div>

      {/* Practicals Bento Grid with Staggered Motion Transitions */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5">
        {filteredPracticals.map((p, idx) => {
          const isCompleted = completedIds.includes(p.id);
          const isStarred = starredIds.includes(p.id);
          const isActive = p.id === activePracticalId;

          return (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: Math.min(idx * 0.02, 0.3) }}
              whileHover={{ y: -3, transition: { duration: 0.15 } }}
              style={isActive ? { borderColor: theme.previewColor, boxShadow: `0 0 0 1px ${theme.previewColor}80` } : undefined}
              className={`p-4 rounded-md border flex flex-col justify-between gap-3.5 transition-all shadow-sm group relative overflow-hidden ${
                isActive
                  ? theme.cardSubBg
                  : `${theme.borderColor} ${theme.cardBg} hover:border-slate-500 hover:shadow-md`
              }`}
            >
              {/* Subtle top indicator bar on active */}
              {isActive && (
                <div 
                  className="absolute top-0 left-0 right-0 h-0.5"
                  style={{ backgroundColor: theme.previewColor }}
                />
              )}

              {/* Card Header */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span 
                      className="px-2 py-0.5 rounded-xs font-mono font-bold text-[10px]"
                      style={{ 
                        backgroundColor: `${theme.previewColor}15`,
                        color: theme.previewColor,
                        border: `1px solid ${theme.previewColor}35`
                      }}
                    >
                      P#{p.id < 10 ? `0${p.id}` : p.id}
                    </span>
                    <span className={`text-[9px] uppercase font-bold ${theme.textMuted}`}>
                      {p.module}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onToggleStar(p.id)}
                      className="p-1 text-slate-500 hover:text-amber-400 transition-colors cursor-pointer"
                      title={isStarred ? "Unstar" : "Star"}
                    >
                      <Star className={`w-3.5 h-3.5 ${isStarred ? 'fill-amber-400 text-amber-400' : ''}`} />
                    </button>
                    <button
                      onClick={() => onToggleComplete(p.id)}
                      className={`p-1 transition-colors cursor-pointer ${isCompleted ? 'text-emerald-400' : 'text-slate-500 hover:text-emerald-300'}`}
                      title={isCompleted ? "Mark as Pending" : "Mark as Completed"}
                    >
                      <CheckCircle2 className={`w-3.5 h-3.5 ${isCompleted ? 'fill-emerald-400/20' : ''}`} />
                    </button>
                  </div>
                </div>

                <h3 className={`text-xs font-bold ${theme.textHeading} line-clamp-1 group-hover:text-white transition-colors`}>
                  {p.title}
                </h3>
                <p className={`text-[11px] ${theme.textMuted} line-clamp-2 leading-relaxed`}>
                  {p.aim}
                </p>
              </div>

              {/* Card Footer Actions */}
              <div className={`pt-2.5 border-t ${theme.borderColor} flex items-center justify-between text-[10px]`}>
                <div className="flex items-center gap-2">
                  <span className={`px-1.5 py-0.5 rounded-xs uppercase font-bold text-[8px] ${theme.cardSubBg} ${theme.textMuted} border ${theme.borderColor}`}>
                    {p.difficulty}
                  </span>
                  <span className={`flex items-center gap-1 ${theme.textMuted} text-[9px]`}>
                    <Clock className="w-2.5 h-2.5" />
                    {p.estimatedMinutes}m
                  </span>
                </div>

                <button
                  onClick={() => onSelectPractical(p.id)}
                  className="px-3 py-1 rounded-xs font-bold uppercase tracking-wider flex items-center gap-1.5 text-[10px] transition-all active:scale-95 shadow-xs cursor-pointer"
                  style={{ 
                    backgroundColor: theme.previewColor,
                    color: theme.accentTextColor
                  }}
                >
                  <Play className="w-2.5 h-2.5 fill-current" />
                  <span>LAUNCH</span>
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
