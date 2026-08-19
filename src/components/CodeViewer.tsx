import React, { useState } from 'react';
import { Practical } from '../types';
import { 
  Copy, 
  Check, 
  Download, 
  ListOrdered, 
  BookOpen, 
  Code2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../context/ThemeContext';

interface CodeViewerProps {
  practical: Practical;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({ practical }) => {
  const { theme } = useTheme();
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'code' | 'algorithm' | 'notes'>('code');

  const handleCopy = () => {
    navigator.clipboard.writeText(practical.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleDownload = () => {
    const blob = new Blob([practical.code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Practical_${practical.id}_${practical.title.replace(/[^a-zA-Z0-9]/g, '_')}.cs`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="space-y-3 font-mono text-xs"
    >
      {/* Top High Density Sub-Bar */}
      <div className={`flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-sm border ${theme.borderColor} ${theme.cardSubBg} shadow-xs`}>
        {/* Toggle Mode Buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setViewMode('code')}
            style={viewMode === 'code' ? { backgroundColor: theme.previewColor, color: theme.accentTextColor } : undefined}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-[11px] font-bold uppercase transition-all active:scale-95 cursor-pointer ${
              viewMode === 'code'
                ? 'shadow-sm font-black'
                : `${theme.cardBg} ${theme.textMuted} hover:${theme.textHeading} border ${theme.borderColor}`
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>C# PROGRAM.CS</span>
          </button>

          <button
            onClick={() => setViewMode('algorithm')}
            style={viewMode === 'algorithm' ? { backgroundColor: theme.previewColor, color: theme.accentTextColor } : undefined}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-[11px] font-bold uppercase transition-all active:scale-95 cursor-pointer ${
              viewMode === 'algorithm'
                ? 'shadow-sm font-black'
                : `${theme.cardBg} ${theme.textMuted} hover:${theme.textHeading} border ${theme.borderColor}`
            }`}
          >
            <ListOrdered className="w-3.5 h-3.5" />
            <span>LAB ALGORITHM ({practical.algorithm.length})</span>
          </button>

          {(practical.codeExplanation || (practical as any).explanation) && (
            <button
              onClick={() => setViewMode('notes')}
              style={viewMode === 'notes' ? { backgroundColor: theme.previewColor, color: theme.accentTextColor } : undefined}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-[11px] font-bold uppercase transition-all active:scale-95 cursor-pointer ${
                viewMode === 'notes'
                  ? 'shadow-sm font-black'
                  : `${theme.cardBg} ${theme.textMuted} hover:${theme.textHeading} border ${theme.borderColor}`
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>THEORY NOTES</span>
            </button>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-[11px] font-bold border transition-all active:scale-95 cursor-pointer ${
              copied
                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                : `${theme.cardBg} hover:${theme.cardSubBg} ${theme.textColor} ${theme.borderColor}`
            }`}
          >
            <AnimatePresence mode="wait" initial={false}>
              {copied ? (
                <motion.span 
                  key="copied"
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.7, opacity: 0 }}
                  className="flex items-center gap-1"
                >
                  <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" />
                  <span className="text-emerald-400 uppercase">COPIED</span>
                </motion.span>
              ) : (
                <motion.span 
                  key="copy"
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.7, opacity: 0 }}
                  className="flex items-center gap-1"
                >
                  <Copy className="w-3.5 h-3.5" style={{ color: theme.previewColor }} />
                  <span>COPY CODE</span>
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <button
            onClick={handleDownload}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-sm text-[11px] font-bold ${theme.cardBg} hover:${theme.cardSubBg} ${theme.textColor} border ${theme.borderColor} transition-all active:scale-95 cursor-pointer`}
            title="Download .cs File"
          >
            <Download className="w-3.5 h-3.5" style={{ color: theme.previewColor }} />
            <span>EXPORT .CS</span>
          </button>
        </div>
      </div>

      {/* Code Display Area */}
      {viewMode === 'code' && (
        <div className={`rounded-sm border ${theme.borderColor} ${theme.cardBg} overflow-hidden shadow-inner`}>
          <div className={`flex items-center justify-between px-3.5 py-2 border-b ${theme.borderColor} ${theme.cardSubBg} text-[10px]`}>
            <div className="flex items-center gap-2">
              <span className="font-bold uppercase" style={{ color: theme.previewColor }}>SOURCE:</span>
              <span className={theme.textHeading}>Practical_{practical.id}_Form.cs</span>
            </div>
            <div className={`${theme.textMuted} font-mono flex items-center gap-2`}>
              <span className="hidden sm:inline">SYNTAX: C# 12 / .NET 8</span>
              <span className={`px-1.5 py-0.2 rounded-xs ${theme.cardBg} ${theme.textColor} border ${theme.borderColor}`}>
                {practical.code.split('\n').length} LINES
              </span>
            </div>
          </div>

          <div className={`p-3.5 overflow-x-auto text-[11.5px] font-mono leading-relaxed ${theme.cardBg}`}>
            <pre className={theme.textColor}>
              {practical.code.split('\n').map((line, idx) => (
                <div 
                  key={idx} 
                  className="table-row transition-colors group hover:opacity-100"
                >
                  <span 
                    className={`table-cell pr-4 ${theme.textMuted} select-none text-right w-10 text-[10.5px] transition-colors`}
                  >
                    {idx + 1}
                  </span>
                  <span className="table-cell whitespace-pre font-mono">
                    {highlightCSharp(line, theme.previewColor)}
                  </span>
                </div>
              ))}
            </pre>
          </div>
        </div>
      )}

      {/* Algorithm View */}
      {viewMode === 'algorithm' && (
        <div className={`rounded-sm border ${theme.borderColor} ${theme.cardBg} p-4 space-y-3 shadow-inner`}>
          <div className={`flex items-center justify-between border-b ${theme.borderColor} pb-2`}>
            <h3 className={`text-xs font-bold ${theme.textHeading} uppercase tracking-wider flex items-center gap-2`}>
              <ListOrdered className="w-4 h-4" style={{ color: theme.previewColor }} />
              <span>Step-by-Step Algorithm & Logic Flow</span>
            </h3>
            <span className={`text-[10px] ${theme.textMuted} font-bold`}>
              LAB RECORD PROCEDURE
            </span>
          </div>

          <div className="space-y-2">
            {practical.algorithm.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.15, delay: idx * 0.03 }}
                className={`flex items-start gap-3 p-3 rounded-sm ${theme.cardSubBg} border ${theme.borderColor} ${theme.textColor} hover:border-slate-600 transition-all`}
              >
                <span 
                  style={{ backgroundColor: `${theme.previewColor}18`, borderColor: `${theme.previewColor}40`, color: theme.previewColor }}
                  className="w-6 h-6 rounded-xs border font-bold flex items-center justify-center text-[10px] shrink-0"
                >
                  {idx + 1}
                </span>
                <p className="text-[11.5px] leading-relaxed font-sans pt-0.5">{step}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Theory & Explanation View */}
      {viewMode === 'notes' && (practical.codeExplanation || (practical as any).explanation) && (
        <div className={`rounded-sm border ${theme.borderColor} ${theme.cardBg} p-4 space-y-3 font-sans shadow-inner`}>
          <div className={`flex items-center justify-between border-b ${theme.borderColor} pb-2 font-mono`}>
            <h3 className={`text-xs font-bold ${theme.textHeading} uppercase tracking-wider flex items-center gap-2`}>
              <BookOpen className="w-4 h-4" style={{ color: theme.previewColor }} />
              <span>Theoretical Framework & .NET Concepts</span>
            </h3>
            <span className={`text-[10px] ${theme.textMuted} font-mono`}>EXAM COMPENDIUM</span>
          </div>

          <p className={`text-xs ${theme.textColor} leading-relaxed whitespace-pre-line ${theme.cardSubBg} p-4 rounded-sm border ${theme.borderColor}`}>
            {practical.codeExplanation || (practical as any).explanation}
          </p>
        </div>
      )}
    </motion.div>
  );
};

// Syntax highlighter helper for C# with modern token classification
function highlightCSharp(line: string, accentHex: string) {
  if (line.trim().startsWith('//')) {
    return <span className="text-emerald-500/75 italic font-sans">{line}</span>;
  }

  const parts = line.split(/(\b(?:using|namespace|public|private|protected|internal|class|partial|void|static|new|int|string|bool|double|float|decimal|override|virtual|abstract|if|else|switch|case|break|return|try|catch|finally|throw|for|foreach|in|while|do|async|await|event|delegate)\b|".*?"|\/\/.*$)/g);

  return (
    <>
      {parts.map((part, i) => {
        if (!part) return null;
        if (/^(using|namespace|public|private|protected|internal|class|partial|void|static|new|override|virtual|abstract|if|else|switch|case|break|return|try|catch|finally|throw|for|foreach|in|while|do|async|await|event|delegate)$/.test(part)) {
          return <span key={i} style={{ color: accentHex }} className="font-bold">{part}</span>;
        }
        if (/^(int|string|bool|double|float|decimal|object|var|char|long|short|byte|DateTime|Color|Font|Graphics|Pen|SolidBrush|DataTable|DataSet|SqlConnection|SqlCommand)$/.test(part)) {
          return <span key={i} className="text-emerald-400 font-medium">{part}</span>;
        }
        if (part.startsWith('"') && part.endsWith('"')) {
          return <span key={i} className="text-amber-300">{part}</span>;
        }
        if (part.startsWith('//')) {
          return <span key={i} className="text-emerald-500/75 italic font-sans">{part}</span>;
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}
