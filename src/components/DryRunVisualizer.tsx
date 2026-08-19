import React, { useState, useEffect } from 'react';
import { Practical, TraceStep } from '../types';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft, 
  Terminal, 
  Cpu, 
  Layers, 
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../context/ThemeContext';

interface DryRunVisualizerProps {
  practical: Practical;
}

export const DryRunVisualizer: React.FC<DryRunVisualizerProps> = ({ practical }) => {
  const { theme } = useTheme();
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1400);

  const steps: TraceStep[] = practical.traceSteps && practical.traceSteps.length > 0
    ? practical.traceSteps
    : [
        {
          line: 1,
          explanation: 'Program initialized. Main Form allocated in memory.',
          variables: { 'FormState': 'Loaded', 'Thread': 'UI Main #1' },
          callStack: 'Program.Main()'
        }
      ];

  const currentStep = steps[currentStepIdx] || steps[0];
  const codeLines = practical.code.split('\n');
  const activeCodeLine = codeLines[currentStep.line - 1]?.trim() || `// Line ${currentStep.line}`;

  useEffect(() => {
    setCurrentStepIdx(0);
    setIsPlaying(false);
  }, [practical.id]);

  useEffect(() => {
    let timer: any = null;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStepIdx(prev => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, playbackSpeed);
    }
    return () => clearInterval(timer);
  }, [isPlaying, playbackSpeed, steps.length]);

  const handleNext = () => {
    if (currentStepIdx < steps.length - 1) {
      setCurrentStepIdx(c => c + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIdx > 0) {
      setCurrentStepIdx(c => c - 1);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIdx(0);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="space-y-3 font-mono text-xs"
    >
      {/* High Density Control Deck */}
      <div className={`flex flex-wrap items-center justify-between gap-3 p-2.5 rounded-sm border ${theme.borderColor} ${theme.cardSubBg} shadow-xs`}>
        {/* Step Indicator & Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            style={isPlaying ? { backgroundColor: '#F59E0B', color: '#000000' } : { backgroundColor: theme.previewColor, color: theme.accentTextColor }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold rounded-sm uppercase tracking-wider transition-all active:scale-95 shadow-xs cursor-pointer"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span>{isPlaying ? 'PAUSE' : 'AUTO_TRACE'}</span>
          </button>

          <div className={`flex items-center border ${theme.borderColor} ${theme.cardBg} rounded-sm`}>
            <button
              onClick={handlePrev}
              disabled={currentStepIdx === 0 || isPlaying}
              className={`p-1.5 hover:${theme.cardSubBg} disabled:opacity-20 ${theme.textColor} transition-colors active:scale-90 cursor-pointer`}
              title="Step Backward"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span 
              style={{ color: theme.previewColor }}
              className={`px-3 py-0.5 text-[11px] font-bold border-x ${theme.borderColor}`}
            >
              STEP {currentStepIdx + 1}/{steps.length}
            </span>
            <button
              onClick={handleNext}
              disabled={currentStepIdx === steps.length - 1 || isPlaying}
              className={`p-1.5 hover:${theme.cardSubBg} disabled:opacity-20 ${theme.textColor} transition-colors active:scale-90 cursor-pointer`}
              title="Step Forward"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleReset}
            className={`p-2 rounded-sm ${theme.cardBg} hover:${theme.cardSubBg} ${theme.textMuted} hover:${theme.textHeading} border ${theme.borderColor} transition-all active:scale-90 cursor-pointer`}
            title="Reset to Step 1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Playback Rate Matrix */}
        <div className="flex items-center gap-2 text-[10px]">
          <span className={`${theme.textMuted} uppercase font-bold`}>CLOCK:</span>
          <div className={`flex items-center border ${theme.borderColor} ${theme.cardBg} rounded-sm overflow-hidden`}>
            {[
              { label: '0.5x', val: 2200 },
              { label: '1.0x', val: 1400 },
              { label: '2.0x', val: 700 }
            ].map(rate => {
              const isSelected = playbackSpeed === rate.val;
              return (
                <button
                  key={rate.label}
                  onClick={() => setPlaybackSpeed(rate.val)}
                  style={isSelected ? { backgroundColor: theme.previewColor, color: theme.accentTextColor } : undefined}
                  className={`px-2.5 py-1 font-bold transition-all cursor-pointer ${
                    isSelected 
                      ? 'font-black' 
                      : `${theme.textMuted} hover:${theme.cardSubBg} hover:${theme.textHeading}`
                  }`}
                >
                  {rate.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Execution Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Left 2 Cols: Active Line & Logic Explanation */}
        <div className="lg:col-span-2 space-y-3">
          {/* Active Code Instruction Box */}
          <div className={`rounded-sm border ${theme.borderColor} ${theme.cardBg} p-3.5 space-y-2.5 shadow-inner`}>
            <div className={`flex items-center justify-between text-[10px] ${theme.textMuted} border-b ${theme.borderColor} pb-2`}>
              <span 
                style={{ color: theme.previewColor }}
                className="flex items-center gap-1.5 font-bold uppercase tracking-wider"
              >
                <Zap className="w-3.5 h-3.5 animate-pulse fill-current" />
                EXECUTION_POINTER // SOURCE LINE #{currentStep.line}
              </span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                RUNNING
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div 
                key={currentStepIdx}
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 4 }}
                transition={{ duration: 0.15 }}
                style={{ 
                  backgroundColor: `${theme.previewColor}10`,
                  borderColor: `${theme.previewColor}50`
                }}
                className="p-3 border rounded-sm font-mono text-xs overflow-x-auto shadow-xs"
              >
                <span style={{ color: theme.previewColor }} className="font-bold mr-3 select-none">IP&gt;&gt;</span>
                <span className={theme.textHeading}>{activeCodeLine}</span>
              </motion.div>
            </AnimatePresence>

            <div className={`p-3 ${theme.cardSubBg} border ${theme.borderColor} rounded-sm ${theme.textColor} text-[11.5px] font-sans leading-relaxed`}>
              <strong style={{ color: theme.previewColor }} className="font-mono block mb-1 text-[10px] uppercase tracking-wide">
                CLR INSTRUCTION EXPLANATION:
              </strong>
              {currentStep.explanation}
            </div>
          </div>

          {/* Console / Simulated Terminal Output */}
          <div className={`rounded-sm border ${theme.borderColor} ${theme.cardBg} overflow-hidden shadow-inner`}>
            <div className={`flex items-center justify-between px-3.5 py-2 ${theme.cardSubBg} border-b ${theme.borderColor} text-[10px]`}>
              <span className={`flex items-center gap-1.5 ${theme.textHeading} font-bold uppercase`}>
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                SIMULATED_CLR_TERMINAL_STREAM
              </span>
              <span className={`${theme.textMuted} font-mono`}>STDOUT // UTF-8</span>
            </div>

            <div className="p-3 bg-black text-emerald-400 font-mono text-[11px] space-y-1 min-h-[90px] max-h-[140px] overflow-y-auto">
              <div className="text-slate-600">&gt; Process started (PID 4920)...</div>
              {practical.simulatedOutput.slice(0, currentStepIdx + 2).map((line, i) => (
                <div key={i} className="flex gap-2">
                  <span className="text-slate-600 select-none">&gt;&gt;</span>
                  <span>{line}</span>
                </div>
              ))}
              <div style={{ color: theme.previewColor }} className="animate-pulse opacity-75">&gt; _</div>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Stack/Heap Variable Watch & Call Stack */}
        <div className="space-y-3">
          {/* Variable Watch Table */}
          <div className={`rounded-sm border ${theme.borderColor} ${theme.cardBg} overflow-hidden shadow-inner`}>
            <div className={`flex items-center justify-between px-3.5 py-2 ${theme.cardSubBg} border-b ${theme.borderColor} text-[10px]`}>
              <span className={`flex items-center gap-1.5 ${theme.textHeading} font-bold uppercase`}>
                <Cpu className="w-3.5 h-3.5" style={{ color: theme.previewColor }} />
                MEMORY_WATCH_REGISTERS
              </span>
              <span style={{ color: theme.previewColor }} className="font-mono font-bold">
                {Object.keys(currentStep.variables).length} VARS
              </span>
            </div>

            <div className="p-2 space-y-1.5 max-h-[180px] overflow-y-auto">
              {Object.entries(currentStep.variables).map(([key, val]) => (
                <motion.div 
                  key={key + '-' + String(val)}
                  initial={{ backgroundColor: `${theme.previewColor}25` }}
                  animate={{ backgroundColor: 'transparent' }}
                  transition={{ duration: 0.4 }}
                  className={`flex items-center justify-between p-2 border ${theme.borderColor} ${theme.cardSubBg} rounded-sm text-[11px]`}
                >
                  <span className={`${theme.textHeading} font-bold truncate`}>{key}:</span>
                  <span className={`text-amber-300 font-bold truncate ml-2 ${theme.cardBg} px-2 py-0.5 border ${theme.borderColor} rounded-xs font-mono`}>
                    {String(val)}
                  </span>
                </motion.div>
              ))}

              {Object.keys(currentStep.variables).length === 0 && (
                <div className={`p-4 text-center ${theme.textMuted} text-[10px]`}>
                  NO LOCALS ALLOCATED
                </div>
              )}
            </div>
          </div>

          {/* Call Stack Frame */}
          <div className={`rounded-sm border ${theme.borderColor} ${theme.cardBg} overflow-hidden shadow-inner`}>
            <div className={`flex items-center justify-between px-3.5 py-2 ${theme.cardSubBg} border-b ${theme.borderColor} text-[10px]`}>
              <span className={`flex items-center gap-1.5 ${theme.textHeading} font-bold uppercase`}>
                <Layers className="w-3.5 h-3.5" style={{ color: theme.previewColor }} />
                ACTIVE_CALL_STACK
              </span>
            </div>

            <div className="p-2 space-y-1">
              <div className={`p-2 ${theme.cardSubBg} border ${theme.borderColor} rounded-sm text-[10.5px] ${theme.textColor} flex items-center gap-2`}>
                <span className={`${theme.textMuted} select-none font-bold`}>[0]</span>
                <span className="truncate font-semibold">{currentStep.callStack || 'Program.Main()'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
