import React, { useState } from 'react';
import { mockQuizQuestions } from '../data/vivaData';
import { HelpCircle, X, CheckCircle2, XCircle, RotateCcw, Award, ChevronRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose }) => {
  const { theme } = useTheme();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answeredMap, setAnsweredMap] = useState<Record<number, number>>({});

  if (!isOpen) return null;

  const currentQ = mockQuizQuestions[currentIdx];
  const isLastQuestion = currentIdx === mockQuizQuestions.length - 1;

  const handleSelectOption = (idx: number) => {
    if (answeredMap[currentIdx] !== undefined) return;
    setAnsweredMap(prev => ({ ...prev, [currentIdx]: idx }));

    if (idx === currentQ.correctIndex) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setShowResult(true);
    } else {
      setCurrentIdx(i => i + 1);
    }
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setScore(0);
    setShowResult(false);
    setAnsweredMap({});
  };

  const percentage = Math.round((score / mockQuizQuestions.length) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-xs font-mono">
      <div className={`relative w-full max-w-lg rounded-sm border ${theme.borderColor} ${theme.cardBg} shadow-2xl overflow-hidden flex flex-col max-h-[90vh]`}>
        {/* Header */}
        <div className={`flex items-center justify-between p-3 border-b ${theme.borderColor} ${theme.cardSubBg}`}>
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4" style={{ color: theme.previewColor }} />
            <h3 className={`text-xs font-bold ${theme.textHeading} uppercase tracking-tight`}>
              VIVA_EXAM_ASSESSMENT // 10_MCQS
            </h3>
          </div>
          <button onClick={onClose} className={`p-1 ${theme.textMuted} hover:${theme.textHeading}`}>
            <X className="w-4 h-4" />
          </button>
        </div>

        {!showResult ? (
          <div className="p-4 overflow-y-auto space-y-3 text-xs">
            {/* Progress Telemetry */}
            <div className="space-y-1">
              <div className={`flex justify-between ${theme.textMuted} text-[10px] uppercase font-bold`}>
                <span>QUESTION {currentIdx + 1}/{mockQuizQuestions.length}</span>
                <span style={{ color: theme.previewColor }}>SCORE: {score}</span>
              </div>
              <div className="w-full h-1 bg-slate-800 rounded-xs overflow-hidden">
                <div 
                  className="h-full transition-all duration-300"
                  style={{ 
                    width: `${((currentIdx + 1) / mockQuizQuestions.length) * 100}%`,
                    backgroundColor: theme.previewColor 
                  }}
                />
              </div>
            </div>

            {/* Question */}
            <div className={`p-3 ${theme.cardSubBg} border ${theme.borderColor} font-bold ${theme.textHeading} text-[11px] leading-relaxed`}>
              {currentQ.question}
            </div>

            {/* Options */}
            <div className="space-y-1.5">
              {currentQ.options.map((opt, oIdx) => {
                const isSelected = answeredMap[currentIdx] === oIdx;
                const isAnswered = answeredMap[currentIdx] !== undefined;
                const isCorrect = oIdx === currentQ.correctIndex;

                let style = `${theme.cardSubBg} ${theme.borderColor} ${theme.textMuted} hover:${theme.cardBg} hover:${theme.textHeading}`;
                if (isAnswered) {
                  if (isCorrect) {
                    style = 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400 font-bold';
                  } else if (isSelected) {
                    style = 'bg-rose-500/10 border-rose-500/50 text-rose-400 font-bold';
                  } else {
                    style = `${theme.cardBg} ${theme.borderColor} ${theme.textMuted} opacity-40`;
                  }
                }

                return (
                  <button
                    key={oIdx}
                    onClick={() => handleSelectOption(oIdx)}
                    disabled={isAnswered}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xs border text-left text-[11px] transition-colors cursor-pointer ${style}`}
                  >
                    <span className="flex items-center gap-2">
                      <span className={`w-4 h-4 rounded-xs ${theme.cardBg} border ${theme.borderColor} flex items-center justify-center font-bold text-[9px] ${theme.textMuted}`}>
                        {String.fromCharCode(65 + oIdx)}
                      </span>
                      <span>{opt}</span>
                    </span>
                    {isAnswered && isCorrect && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                    {isAnswered && isSelected && !isCorrect && <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Insight */}
            {answeredMap[currentIdx] !== undefined && (
              <div 
                style={{ backgroundColor: `${theme.previewColor}10`, borderColor: `${theme.previewColor}40` }}
                className={`p-2.5 border ${theme.textHeading} text-[10px] leading-relaxed rounded-xs`}
              >
                <strong className="font-bold uppercase block mb-0.5" style={{ color: theme.previewColor }}>
                  CONCEPT_INSIGHT:
                </strong>
                <span className={theme.textMuted}>{currentQ.explanation}</span>
              </div>
            )}

            {answeredMap[currentIdx] !== undefined && (
              <button
                onClick={handleNext}
                style={{ backgroundColor: theme.previewColor, color: theme.accentTextColor }}
                className="w-full font-black uppercase tracking-wider py-2 rounded-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <span>{isLastQuestion ? 'SUBMIT & VIEW REPORT' : 'NEXT QUESTION'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        ) : (
          /* Results */
          <div className="p-5 text-center space-y-4 text-xs">
            <div 
              style={{ backgroundColor: `${theme.previewColor}15`, borderColor: `${theme.previewColor}40`, color: theme.previewColor }}
              className="w-12 h-12 border rounded-sm mx-auto flex items-center justify-center"
            >
              <Award className="w-6 h-6" />
            </div>

            <div>
              <h4 className={`text-sm font-bold ${theme.textHeading} uppercase`}>ASSESSMENT_COMPLETE</h4>
              <p className={`${theme.textMuted} text-[11px] mt-1`}>BCA Sem 5 C# Viva Readiness Score</p>
            </div>

            <div className={`p-3 ${theme.cardSubBg} border ${theme.borderColor} inline-block font-mono rounded-xs`}>
              <div className="text-2xl font-black" style={{ color: theme.previewColor }}>
                {score} / {mockQuizQuestions.length}
              </div>
              <div className={`${theme.textMuted} text-[10px] mt-0.5`}>{percentage}% ACCURACY METRIC</div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={handleReset}
                className={`flex-1 flex items-center justify-center gap-1 py-2 ${theme.cardSubBg} hover:${theme.cardBg} ${theme.textHeading} font-bold uppercase text-[10px] border ${theme.borderColor} rounded-xs cursor-pointer`}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>RETRY_TEST</span>
              </button>
              <button
                onClick={onClose}
                style={{ backgroundColor: theme.previewColor, color: theme.accentTextColor }}
                className="flex-1 py-2 font-black uppercase text-[10px] rounded-xs cursor-pointer shadow-xs"
              >
                BACK_TO_LAB
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
