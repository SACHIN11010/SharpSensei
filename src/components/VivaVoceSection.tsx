import React, { useState } from 'react';
import { Practical, VivaQuestion } from '../types';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles, Loader2, Eye, EyeOff } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface VivaVoceSectionProps {
  practical: Practical;
}

export const VivaVoceSection: React.FC<VivaVoceSectionProps> = ({ practical }) => {
  const { theme } = useTheme();
  const [expandedIndices, setExpandedIndices] = useState<Record<number, boolean>>({});
  const [showAllAnswers, setShowAllAnswers] = useState(false);
  const [aiQuestions, setAiQuestions] = useState<VivaQuestion[]>([]);
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [errorAi, setErrorAi] = useState<string | null>(null);

  const baseQuestions: VivaQuestion[] = practical.vivaQuestions || [];
  const allQuestions = [...baseQuestions, ...aiQuestions];

  const toggleExpand = (idx: number) => {
    setExpandedIndices(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleGenerateAiViva = async () => {
    setIsLoadingAi(true);
    setErrorAi(null);
    try {
      const res = await fetch('/api/ai/viva', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          practicalTitle: practical.title,
          practicalCode: practical.code.slice(0, 1000),
          practicalId: practical.id
        })
      });

      const data = await res.json();
      if (data.questions && Array.isArray(data.questions)) {
        setAiQuestions(data.questions);
      } else {
        setErrorAi('Failed to parse AI Viva response. Try again.');
      }
    } catch (err: any) {
      setErrorAi(err.message || 'Error communicating with AI service.');
    } finally {
      setIsLoadingAi(false);
    }
  };

  return (
    <div className="space-y-3 font-mono text-xs">
      {/* High Density Header Bar */}
      <div className={`flex flex-wrap items-center justify-between gap-3 p-2.5 rounded-sm border ${theme.borderColor} ${theme.cardSubBg}`}>
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4" style={{ color: theme.previewColor }} />
          <div>
            <h3 className={`text-xs font-bold ${theme.textHeading} uppercase tracking-tight`}>
              VIVA_EXAM_REPOSITORY // ({allQuestions.length} ITEMS)
            </h3>
            <p className={`text-[10px] ${theme.textMuted} font-sans`}>
              Curated for BCA Semester 5 External Examination Viva Voce
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAllAnswers(!showAllAnswers)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-sm ${theme.cardBg} hover:${theme.cardSubBg} ${theme.textColor} hover:${theme.textHeading} text-[10px] font-bold uppercase border ${theme.borderColor} transition-colors cursor-pointer`}
          >
            {showAllAnswers ? <EyeOff className="w-3 h-3 text-amber-400" /> : <Eye className="w-3 h-3" style={{ color: theme.previewColor }} />}
            <span>{showAllAnswers ? 'HIDE_ANSWERS' : 'REVEAL_ALL'}</span>
          </button>

          <button
            onClick={handleGenerateAiViva}
            disabled={isLoadingAi}
            style={{ backgroundColor: theme.previewColor, color: theme.accentTextColor }}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-[10px] font-black uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer active:scale-95 shadow-xs"
          >
            {isLoadingAi ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
            <span>{isLoadingAi ? 'QUERYING...' : 'AI_VIVA_GEN'}</span>
          </button>
        </div>
      </div>

      {errorAi && (
        <div className="p-2.5 rounded-sm bg-rose-950/60 border border-rose-800 text-[11px] text-rose-300">
          {errorAi}
        </div>
      )}

      {/* Questions Stack */}
      <div className="space-y-2">
        {allQuestions.map((q, idx) => {
          const isExpanded = showAllAnswers || expandedIndices[idx];
          const isAi = idx >= baseQuestions.length;

          return (
            <div 
              key={idx}
              className={`rounded-sm border ${theme.borderColor} ${theme.cardBg} overflow-hidden`}
            >
              {/* Question Trigger */}
              <button
                onClick={() => toggleExpand(idx)}
                className={`w-full flex items-start justify-between gap-3 p-2.5 text-left hover:${theme.cardSubBg} transition-colors cursor-pointer`}
              >
                <div className="flex items-start gap-2.5 flex-1 min-w-0">
                  <span 
                    style={{ 
                      backgroundColor: `${theme.previewColor}18`, 
                      borderColor: `${theme.previewColor}45`,
                      color: theme.previewColor 
                    }}
                    className="font-bold text-[10px] px-1.5 py-0.5 rounded-xs border shrink-0"
                  >
                    Q{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                  </span>
                  <span className={`text-[11px] font-bold ${theme.textHeading} leading-snug`}>
                    {q.question}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {isAi && (
                    <span className="text-[9px] font-bold px-1 py-0.2 rounded-xs bg-purple-950 text-purple-300 border border-purple-800 uppercase">
                      AI_GEN
                    </span>
                  )}
                  {isExpanded ? <ChevronUp className={`w-3.5 h-3.5 ${theme.textMuted}`} /> : <ChevronDown className={`w-3.5 h-3.5 ${theme.textMuted}`} />}
                </div>
              </button>

              {/* Expandable Model Answer */}
              {isExpanded && (
                <div className={`px-3 pb-3 pt-1 border-t ${theme.borderColor} space-y-2 ${theme.cardSubBg} text-[11px] font-sans`}>
                  <div className={`p-2.5 rounded-xs ${theme.cardBg} border ${theme.borderColor} ${theme.textHeading} leading-relaxed`}>
                    <strong style={{ color: theme.previewColor }} className="font-mono block mb-1 text-[10px] uppercase">
                      &gt;&gt; DIRECT_MODEL_RESPONSE:
                    </strong>
                    {q.shortAnswer}
                  </div>

                  {q.detailedAnswer && (
                    <div className={`${theme.textColor} text-[11px] leading-relaxed pl-1`}>
                      <strong className={`${theme.textHeading} font-mono text-[10px] uppercase`}>
                        TECHNICAL_ANALYSIS:
                      </strong>{' '}
                      {q.detailedAnswer}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
