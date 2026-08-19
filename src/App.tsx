import React, { useState, useEffect } from 'react';
import { allPracticals, getPracticalById } from './data/practicalsData';
import { Practical } from './types';
import { ThemeId, themes, LayoutMode } from './theme';
import { useTheme } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { CodeViewer } from './components/CodeViewer';
import { DryRunVisualizer } from './components/DryRunVisualizer';
import { WinFormsEmulator } from './components/WinFormsEmulator';
import { VisualStudioGuide } from './components/VisualStudioGuide';
import { VivaVoceSection } from './components/VivaVoceSection';
import { AiTutorDrawer } from './components/AiTutorDrawer';
import { QuizModal } from './components/QuizModal';
import { CheatsheetModal } from './components/CheatsheetModal';
import { LabRecordModal } from './components/LabRecordModal';
import { ThemeSelectorModal } from './components/ThemeSelectorModal';
import { SyllabusBoard } from './components/SyllabusBoard';
import { 
  Code2, 
  PlayCircle, 
  Monitor, 
  HelpCircle, 
  Layout, 
  CheckCircle2, 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  Menu, 
  Clock, 
  Activity,
  Terminal,
  Cpu,
  Palette,
  Columns,
  Maximize2,
  Grid3X3
} from 'lucide-react';

export function App() {
  const { theme: activeThemeConfig, currentTheme, currentLayout, setTheme, setLayout } = useTheme();
  const [activeId, setActiveId] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'emulator' | 'code' | 'dryrun' | 'vsguide' | 'viva'>('emulator');

  const [completedIds, setCompletedIds] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('bca_csharp_completed');
      return saved ? JSON.parse(saved) : [1, 2];
    } catch {
      return [1, 2];
    }
  });

  const [starredIds, setStarredIds] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('bca_csharp_starred');
      return saved ? JSON.parse(saved) : [11, 24, 33];
    } catch {
      return [11, 24, 33];
    }
  });

  const [isSidebarOpenMobile, setIsSidebarOpenMobile] = useState(false);
  const [isAiTutorOpen, setIsAiTutorOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isCheatsheetOpen, setIsCheatsheetOpen] = useState(false);
  const [isLabRecordOpen, setIsLabRecordOpen] = useState(false);
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);

  const activePractical = getPracticalById(activeId) || allPracticals[0];

  const toggleComplete = (id: number) => {
    setCompletedIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const toggleStar = (id: number) => {
    setStarredIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handlePrev = () => {
    const prevIdx = allPracticals.findIndex(p => p.id === activeId) - 1;
    if (prevIdx >= 0) {
      setActiveId(allPracticals[prevIdx].id);
    }
  };

  const handleNext = () => {
    const nextIdx = allPracticals.findIndex(p => p.id === activeId) + 1;
    if (nextIdx < allPracticals.length) {
      setActiveId(allPracticals[nextIdx].id);
    }
  };

  const isCompleted = completedIds.includes(activePractical.id);
  const isStarred = starredIds.includes(activePractical.id);

  return (
    <div className={`min-h-screen flex flex-col ${activeThemeConfig.appBg} ${activeThemeConfig.textColor} font-mono overflow-hidden`}>
      {/* Top Telemetry Header */}
      <Navbar
        completedCount={completedIds.length}
        totalCount={allPracticals.length}
        currentTheme={currentTheme}
        currentLayout={currentLayout}
        onSelectLayout={(layout) => setLayout(layout)}
        onOpenThemeSelector={() => setIsThemeModalOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenCheatsheet={() => setIsCheatsheetOpen(true)}
        onOpenLabRecord={() => setIsLabRecordOpen(true)}
        onToggleAiTutor={() => setIsAiTutorOpen(!isAiTutorOpen)}
        isAiTutorOpen={isAiTutorOpen}
      />

      {/* Dynamic Workspace Container based on Selected Layout */}
      {currentLayout === 'syllabus-board' ? (
        <div className="flex-1 flex overflow-hidden">
          <SyllabusBoard
            practicals={allPracticals}
            activePracticalId={activeId}
            currentTheme={currentTheme}
            completedIds={completedIds}
            starredIds={starredIds}
            onSelectPractical={(id) => {
              setActiveId(id);
              setLayout('classic');
            }}
            onToggleComplete={toggleComplete}
            onToggleStar={toggleStar}
          />
        </div>
      ) : (
        <div className="flex-1 flex overflow-hidden">
          {/* Left Directory Navigation (Hidden on zen-focus unless toggled, or collapsible) */}
          {currentLayout !== 'zen-focus' && (
            <Sidebar
              practicals={allPracticals}
              activePracticalId={activeId}
              currentTheme={currentTheme}
              onSelectPractical={(id) => setActiveId(id)}
              completedIds={completedIds}
              onToggleComplete={toggleComplete}
              starredIds={starredIds}
              onToggleStar={toggleStar}
              isOpenMobile={isSidebarOpenMobile}
              onCloseMobile={() => setIsSidebarOpenMobile(false)}
            />
          )}

          {/* Zen Focus Minimal Sidebar Strip */}
          {currentLayout === 'zen-focus' && (
            <div className={`w-12 border-r ${activeThemeConfig.borderColor} ${activeThemeConfig.sidebarBg} flex flex-col items-center py-3 gap-3 shrink-0`}>
              <button
                onClick={handlePrev}
                disabled={activePractical.id === 1}
                className={`p-1.5 rounded-sm hover:bg-white/10 disabled:opacity-20 ${activeThemeConfig.textHeading}`}
                title="Previous Practical"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div 
                className="w-8 h-8 rounded-sm flex items-center justify-center font-bold text-xs"
                style={{ backgroundColor: activeThemeConfig.previewColor, color: activeThemeConfig.category === 'light' ? '#fff' : '#000' }}
              >
                #{activePractical.id}
              </div>
              <button
                onClick={handleNext}
                disabled={activePractical.id === 38}
                className={`p-1.5 rounded-sm hover:bg-white/10 disabled:opacity-20 ${activeThemeConfig.textHeading}`}
                title="Next Practical"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <div className="h-[1px] w-6 bg-slate-700/50 my-1" />
              <button
                onClick={() => setIsThemeModalOpen(true)}
                className="p-1.5 rounded-sm hover:bg-white/10 text-slate-400 hover:text-white"
                title="Layout & Theme Settings"
              >
                <Layout className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Center Main Stage Area */}
          <main className={`flex-1 flex flex-col overflow-y-auto ${activeThemeConfig.appBg} border-l ${activeThemeConfig.borderColor}`}>
            {/* High Density Metric Ribbon (4-column Telemetry Bar) */}
            <div className={`grid grid-cols-2 md:grid-cols-4 border-b ${activeThemeConfig.borderColor} ${activeThemeConfig.ribbonBg} shrink-0`}>
              {/* Box 1: Node Identifier */}
              <div className={`border-r border-b md:border-b-0 ${activeThemeConfig.borderColor} p-3 flex flex-col justify-between`}>
                <div className="flex items-center justify-between">
                  <span className={`text-[9px] ${activeThemeConfig.textMuted} uppercase tracking-tight`}>PRACTICAL_NODE</span>
                  <span className={`text-[9px] px-1.5 py-0.2 border rounded-xs font-bold ${activeThemeConfig.accentBadgeBg}`}>
                    ACTIVE
                  </span>
                </div>
                <div className={`text-xl sm:text-2xl ${activeThemeConfig.textHeading} font-bold tracking-tighter`}>
                  #{activePractical.id}
                  <span className="text-xs font-normal ml-2" style={{ color: activeThemeConfig.previewColor }}>/ 38</span>
                </div>
                <div className={`text-[9px] ${activeThemeConfig.textMuted} truncate`}>{activePractical.module}</div>
              </div>

              {/* Box 2: Difficulty & Execution Time */}
              <div className={`border-r border-b md:border-b-0 ${activeThemeConfig.borderColor} p-3 flex flex-col justify-between`}>
                <span className={`text-[9px] ${activeThemeConfig.textMuted} uppercase tracking-tight`}>COMPLEXITY_TIER</span>
                <div className={`text-xl sm:text-2xl ${activeThemeConfig.textHeading} font-bold tracking-tighter uppercase`}>
                  {activePractical.difficulty}
                </div>
                <div className={`flex items-center gap-1 text-[9px] ${activeThemeConfig.textMuted}`}>
                  <Clock className="w-3 h-3" style={{ color: activeThemeConfig.previewColor }} />
                  <span>EST: {activePractical.estimatedMinutes} MINS</span>
                </div>
              </div>

              {/* Box 3: Status / Verification Flag */}
              <div className={`border-r ${activeThemeConfig.borderColor} p-3 flex flex-col justify-between`}>
                <span className={`text-[9px] ${activeThemeConfig.textMuted} uppercase tracking-tight`}>VERIFICATION_STATUS</span>
                <div className="text-xl sm:text-2xl font-bold tracking-tighter">
                  {isCompleted ? (
                    <span className="text-emerald-400">VERIFIED</span>
                  ) : (
                    <span className="text-amber-400">PENDING</span>
                  )}
                </div>
                <div className="flex gap-1.5 items-center text-[9px]">
                  <span className={`w-1.5 h-1.5 rounded-full ${isCompleted ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'}`}></span>
                  <span className={`${activeThemeConfig.textMuted} uppercase`}>{isCompleted ? 'LAB SIGNED' : 'AWAITING RUN'}</span>
                </div>
              </div>

              {/* Box 4: Controls and Shortcuts */}
              <div className="p-3 flex flex-col justify-between">
                <span className={`text-[9px] ${activeThemeConfig.textMuted} uppercase tracking-tight`}>CONTROL_MATRIX</span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => toggleComplete(activePractical.id)}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-sm text-[10px] font-bold uppercase transition-colors ${
                      isCompleted 
                        ? 'bg-emerald-500 text-black' 
                        : `${activeThemeConfig.cardSubBg} border ${activeThemeConfig.borderColor} ${activeThemeConfig.textHeading} hover:border-slate-500`
                    }`}
                  >
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{isCompleted ? 'COMPLETE' : 'MARK DONE'}</span>
                  </button>

                  <button
                    onClick={() => toggleStar(activePractical.id)}
                    className={`p-1 rounded-sm border ${
                      isStarred 
                        ? 'bg-amber-500/20 border-amber-500 text-amber-400' 
                        : `${activeThemeConfig.cardSubBg} ${activeThemeConfig.borderColor} ${activeThemeConfig.textMuted} hover:text-white`
                    }`}
                    title="Star Practical"
                  >
                    <Star className={`w-3 h-3 ${isStarred ? 'fill-current' : ''}`} />
                  </button>

                  <div className={`flex items-center border ${activeThemeConfig.borderColor} ${activeThemeConfig.cardBg} rounded-sm ml-auto`}>
                    <button
                      onClick={handlePrev}
                      disabled={activePractical.id === 1}
                      className={`p-1 hover:bg-black/20 disabled:opacity-20 ${activeThemeConfig.textHeading}`}
                      title="Previous"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={handleNext}
                      disabled={activePractical.id === 38}
                      className={`p-1 hover:bg-black/20 disabled:opacity-20 ${activeThemeConfig.textHeading} border-l ${activeThemeConfig.borderColor}`}
                      title="Next"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <div className={`text-[9px] ${activeThemeConfig.textMuted} truncate flex justify-between`}>
                  <span>LAYOUT: {currentLayout.toUpperCase()}</span>
                  <button 
                    onClick={() => setIsThemeModalOpen(true)} 
                    className="hover:underline text-cyan-400 font-bold"
                    style={{ color: activeThemeConfig.previewColor }}
                  >
                    OPTIONS
                  </button>
                </div>
              </div>
            </div>

            {/* Section Header: Title & Aim */}
            <div className={`p-3 sm:p-4 border-b ${activeThemeConfig.borderColor} ${activeThemeConfig.appBg} flex items-center justify-between gap-4`}>
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsSidebarOpenMobile(true)}
                    className={`p-1 ${activeThemeConfig.cardSubBg} ${activeThemeConfig.textHeading} rounded-sm lg:hidden border ${activeThemeConfig.borderColor}`}
                  >
                    <Menu className="w-3.5 h-3.5" />
                  </button>
                  <h1 className={`text-sm sm:text-base font-bold ${activeThemeConfig.textHeading} uppercase tracking-tight truncate`}>
                    {activePractical.title}
                  </h1>
                </div>
                <p className={`text-[11px] ${activeThemeConfig.textMuted} line-clamp-1`}>
                  {activePractical.aim}
                </p>
              </div>
            </div>

            {/* DUAL-PANE LAYOUT: Side-by-side Live WinForms + Source Code */}
            {currentLayout === 'dual-pane' ? (
              <div className="flex-1 grid grid-cols-1 xl:grid-cols-2 gap-4 p-4 overflow-y-auto">
                {/* Left Pane: Interactive WinForms Emulator */}
                <div className="space-y-2">
                  <div className={`flex items-center justify-between px-3 py-1.5 border ${activeThemeConfig.borderColor} ${activeThemeConfig.headerBg} rounded-t-sm`}>
                    <span className="text-xs font-bold flex items-center gap-1.5" style={{ color: activeThemeConfig.previewColor }}>
                      <Monitor className="w-3.5 h-3.5" />
                      PANE A // INTERACTIVE WINFORMS RUNTIME
                    </span>
                    <span className="text-[9px] text-slate-500 font-bold">LIVE INTERACTIVE EXECUTION</span>
                  </div>
                  <WinFormsEmulator practical={activePractical} />
                </div>

                {/* Right Pane: Code & Dry Run Multi-view */}
                <div className="space-y-2 flex flex-col">
                  <div className={`flex items-center justify-between px-3 py-1.5 border ${activeThemeConfig.borderColor} ${activeThemeConfig.headerBg} rounded-t-sm`}>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold flex items-center gap-1.5 ${activeThemeConfig.textHeading}`}>
                        <Code2 className="w-3.5 h-3.5" />
                        PANE B // SOURCE CODE & DRY RUN
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setActiveTab('code')}
                        className={`px-2 py-0.5 text-[9px] font-bold rounded-xs cursor-pointer ${activeTab === 'code' ? 'text-black' : 'text-slate-400 hover:text-white'}`}
                        style={activeTab === 'code' ? { backgroundColor: activeThemeConfig.previewColor, color: activeThemeConfig.category === 'light' ? '#fff' : '#000' } : {}}
                      >
                        CODE
                      </button>
                      <button
                        onClick={() => setActiveTab('dryrun')}
                        className={`px-2 py-0.5 text-[9px] font-bold rounded-xs cursor-pointer ${activeTab === 'dryrun' ? 'text-black' : 'text-slate-400 hover:text-white'}`}
                        style={activeTab === 'dryrun' ? { backgroundColor: activeThemeConfig.previewColor, color: activeThemeConfig.category === 'light' ? '#fff' : '#000' } : {}}
                      >
                        DRY RUN
                      </button>
                      <button
                        onClick={() => setActiveTab('viva')}
                        className={`px-2 py-0.5 text-[9px] font-bold rounded-xs cursor-pointer ${activeTab === 'viva' ? 'text-black' : 'text-slate-400 hover:text-white'}`}
                        style={activeTab === 'viva' ? { backgroundColor: activeThemeConfig.previewColor, color: activeThemeConfig.category === 'light' ? '#fff' : '#000' } : {}}
                      >
                        VIVA
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto">
                    {activeTab === 'dryrun' ? (
                      <DryRunVisualizer practical={activePractical} />
                    ) : activeTab === 'viva' ? (
                      <VivaVoceSection practical={activePractical} />
                    ) : (
                      <CodeViewer practical={activePractical} />
                    )}
                  </div>
                </div>
              </div>
            ) : currentLayout === 'debugger-pro' ? (
              /* DEBUGGER-PRO LAYOUT: 3-Column Docked IDE (Code/Guide + WinForms Runtime + Variable Registers Trace Watch) */
              <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-3 p-3 overflow-y-auto">
                {/* Left Col: Code & Designer Guide (5 Cols) */}
                <div className="lg:col-span-5 space-y-2 flex flex-col">
                  <div className={`flex items-center justify-between px-3 py-1.5 border ${activeThemeConfig.borderColor} ${activeThemeConfig.headerBg} rounded-t-sm`}>
                    <span className="text-xs font-bold flex items-center gap-1.5" style={{ color: activeThemeConfig.previewColor }}>
                      <Code2 className="w-3.5 h-3.5" />
                      PANE 1 // C# SOURCE CODE
                    </span>
                    <span className="text-[9px] text-slate-500 font-bold">.NET 8.0 CLR</span>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    <CodeViewer practical={activePractical} />
                  </div>
                </div>

                {/* Center Col: Interactive WinForms Emulator (4 Cols) */}
                <div className="lg:col-span-4 space-y-2 flex flex-col">
                  <div className={`flex items-center justify-between px-3 py-1.5 border ${activeThemeConfig.borderColor} ${activeThemeConfig.headerBg} rounded-t-sm`}>
                    <span className="text-xs font-bold flex items-center gap-1.5 text-emerald-400">
                      <Monitor className="w-3.5 h-3.5" />
                      PANE 2 // WINFORMS RUNTIME
                    </span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
                      ACTIVE FORM
                    </span>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    <WinFormsEmulator practical={activePractical} />
                  </div>
                </div>

                {/* Right Col: Variable Watchers & Step Debugger (3 Cols) */}
                <div className="lg:col-span-3 space-y-2 flex flex-col">
                  <div className={`flex items-center justify-between px-3 py-1.5 border ${activeThemeConfig.borderColor} ${activeThemeConfig.headerBg} rounded-t-sm`}>
                    <span className="text-xs font-bold flex items-center gap-1.5 text-amber-400">
                      <PlayCircle className="w-3.5 h-3.5" />
                      PANE 3 // REGISTER WATCH
                    </span>
                    <span className="text-[9px] text-slate-500 font-bold">STACK TRACE</span>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    <DryRunVisualizer practical={activePractical} />
                  </div>
                </div>
              </div>
            ) : currentLayout === 'viva-master' ? (
              /* VIVA-MASTER LAYOUT: Exam Prep Split View (Practical Code + Complete Viva Bank) */
              <div className="flex-1 grid grid-cols-1 xl:grid-cols-2 gap-4 p-4 overflow-y-auto">
                {/* Left Side: Code & Algorithmic Logic */}
                <div className="space-y-2 flex flex-col">
                  <div className={`flex items-center justify-between px-3 py-1.5 border ${activeThemeConfig.borderColor} ${activeThemeConfig.headerBg} rounded-t-sm`}>
                    <span className="text-xs font-bold flex items-center gap-1.5" style={{ color: activeThemeConfig.previewColor }}>
                      <Code2 className="w-3.5 h-3.5" />
                      STAGE A // SOURCE CODE & ALGORITHM
                    </span>
                    <span className="text-[9px] text-slate-400 font-bold">STUDY REFERENCE</span>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    <CodeViewer practical={activePractical} />
                  </div>
                </div>

                {/* Right Side: Interactive Viva Voce Question Bank */}
                <div className="space-y-2 flex flex-col">
                  <div className={`flex items-center justify-between px-3 py-1.5 border ${activeThemeConfig.borderColor} ${activeThemeConfig.headerBg} rounded-t-sm`}>
                    <span className="text-xs font-bold flex items-center gap-1.5 text-violet-400">
                      <HelpCircle className="w-3.5 h-3.5" />
                      STAGE B // VIVA VOCE EXAM QUESTIONS ({activePractical.vivaQuestions?.length || 0})
                    </span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded-xs bg-violet-500/10 text-violet-300 border border-violet-500/30 font-bold">
                      EXAM MODE
                    </span>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    <VivaVoceSection practical={activePractical} />
                  </div>
                </div>
              </div>
            ) : (
              /* CLASSIC & ZEN FOCUS LAYOUT: Multi-tab Stage */
              <>
                {/* High Density Tab Bar with Animated Sliding Active Indicator */}
                <div className={`flex items-center border-b ${activeThemeConfig.borderColor} ${activeThemeConfig.sidebarBg} overflow-x-auto text-[11px] font-bold uppercase tracking-wider shrink-0 no-scrollbar relative`}>
                  {[
                    { id: 'emulator', label: 'EMULATOR // WINFORMS', icon: Monitor },
                    { id: 'code', label: 'SOURCE_CODE & ALGORITHM', icon: Code2 },
                    { id: 'dryrun', label: 'DRY_RUN // TRACE_WATCH', icon: PlayCircle },
                    { id: 'vsguide', label: 'VS_DESIGNER_STEPS', icon: Layout },
                    { id: 'viva', label: `VIVA_EXAM_BANK (${activePractical.vivaQuestions?.length || 0})`, icon: HelpCircle },
                  ].map((tab) => {
                    const isActive = activeTab === tab.id;
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        style={isActive ? { color: activeThemeConfig.accentTextColor } : undefined}
                        className={`relative flex items-center gap-1.5 px-3.5 py-2.5 border-r ${activeThemeConfig.borderColor} transition-colors whitespace-nowrap z-10 cursor-pointer ${
                          isActive
                            ? 'font-black'
                            : `${activeThemeConfig.textMuted} hover:${activeThemeConfig.cardSubBg} hover:${activeThemeConfig.textHeading}`
                        }`}
                      >
                        {isActive && (
                          <span
                            className="absolute inset-0 z-[-1] shadow-xs"
                            style={{ backgroundColor: activeThemeConfig.previewColor }}
                          />
                        )}
                        <Icon className="w-3.5 h-3.5" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Active Workspace Container with Smooth Fade Transitions */}
                <div className="p-3 sm:p-4 flex-1">
                  {activeTab === 'emulator' && (
                    <WinFormsEmulator practical={activePractical} />
                  )}

                  {activeTab === 'code' && (
                    <CodeViewer practical={activePractical} />
                  )}

                  {activeTab === 'dryrun' && (
                    <DryRunVisualizer practical={activePractical} />
                  )}

                  {activeTab === 'vsguide' && (
                    <VisualStudioGuide practical={activePractical} />
                  )}

                  {activeTab === 'viva' && (
                    <VivaVoceSection practical={activePractical} />
                  )}
                </div>
              </>
            )}
          </main>
        </div>
      )}

      {/* High Density Footer Telemetry Bar */}
      <footer className={`h-6 ${activeThemeConfig.headerBg} border-t ${activeThemeConfig.borderColor} flex items-center justify-between px-3 text-[9px] tracking-tight shrink-0 select-none z-30`}>
        <div className="flex gap-4">
          <span className={`${activeThemeConfig.textMuted} uppercase font-bold`}>
            Thread Stack: <span className="text-emerald-400">CLEAN</span>
          </span>
          <span className={`${activeThemeConfig.textMuted} uppercase font-bold hidden sm:inline`}>
            CLR_RUNTIME: <span style={{ color: activeThemeConfig.previewColor }}>.NET 8.0 SDK</span>
          </span>
          <span className={`${activeThemeConfig.textMuted} uppercase font-bold hidden md:inline`}>
            LAYOUT: <span className="font-bold uppercase" style={{ color: activeThemeConfig.previewColor }}>{currentLayout}</span>
          </span>
        </div>
        <div className={`${activeThemeConfig.textMuted} font-mono`}>
          BCA_SEM5_REF.MS23PMJDSCBCA501C-STABLE
        </div>
      </footer>

      {/* AI Tutor Assistant Drawer */}
      <AiTutorDrawer
        isOpen={isAiTutorOpen}
        onClose={() => setIsAiTutorOpen(false)}
        practical={activePractical}
      />

      {/* Modals */}
      <ThemeSelectorModal
        isOpen={isThemeModalOpen}
        onClose={() => setIsThemeModalOpen(false)}
        currentTheme={currentTheme}
        onSelectTheme={(id) => {
          setTheme(id);
        }}
        currentLayout={currentLayout}
        onSelectLayout={(layout) => {
          setLayout(layout);
        }}
      />
      <QuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
      <CheatsheetModal isOpen={isCheatsheetOpen} onClose={() => setIsCheatsheetOpen(false)} />
      <LabRecordModal isOpen={isLabRecordOpen} onClose={() => setIsLabRecordOpen(false)} practical={activePractical} />
    </div>
  );
}

export default App;
