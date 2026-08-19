import React, { useState } from 'react';
import { cheatsheetItems } from '../data/cheatsheetData';
import { Code2, X, Search, Copy, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface CheatsheetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheatsheetModal: React.FC<CheatsheetModalProps> = ({ isOpen, onClose }) => {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const filtered = cheatsheetItems.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopy = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-xs font-mono">
      <div className={`relative w-full max-w-2xl rounded-sm border ${theme.borderColor} ${theme.cardBg} shadow-2xl overflow-hidden flex flex-col max-h-[85vh]`}>
        {/* Header */}
        <div className={`flex items-center justify-between p-3 border-b ${theme.borderColor} ${theme.cardSubBg}`}>
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-amber-400" />
            <div>
              <h3 className={`text-xs font-bold ${theme.textHeading} uppercase tracking-tight`}>
                C# // WINFORMS_QUICK_SYNTAX_CHEATSHEET
              </h3>
              <p className={`text-[10px] ${theme.textMuted}`}>Essential Syntax & Code Patterns for BCA Lab</p>
            </div>
          </div>
          <button onClick={onClose} className={`p-1 ${theme.textMuted} hover:${theme.textHeading} cursor-pointer`}>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* High Density Search */}
        <div className={`p-2.5 border-b ${theme.borderColor} ${theme.cardBg}`}>
          <div className="relative">
            <Search className="absolute left-2.5 top-2 w-3.5 h-3.5 text-slate-500" />
            <input
              type="text"
              placeholder="SEARCH PATTERNS [ADO.NET, DIALOGS, GDI+, EVENTS]..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full ${theme.cardSubBg} border ${theme.borderColor} pl-8 pr-3 py-1 text-[11px] ${theme.textHeading} placeholder-slate-500 focus:outline-none rounded-xs`}
            />
          </div>
        </div>

        {/* Items Stream */}
        <div className="p-3 overflow-y-auto space-y-3 text-xs">
          {filtered.map((item, idx) => (
            <div key={idx} className={`rounded-xs border ${theme.borderColor} ${theme.cardSubBg} p-3 space-y-2`}>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-xs bg-amber-950/60 text-amber-300 border border-amber-800/60 uppercase font-bold">
                    {item.category}
                  </span>
                  <h4 className={`text-xs font-bold ${theme.textHeading} uppercase mt-1`}>{item.title}</h4>
                </div>

                <button
                  onClick={() => handleCopy(item.example, idx)}
                  className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-xs ${theme.cardBg} hover:${theme.cardSubBg} ${theme.textHeading} border ${theme.borderColor} transition-colors cursor-pointer`}
                >
                  {copiedIndex === idx ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" style={{ color: theme.previewColor }} />
                      <span>COPY</span>
                    </>
                  )}
                </button>
              </div>

              <p className={`${theme.textColor} text-[11px] font-sans leading-relaxed`}>{item.description}</p>

              <div className={`rounded-xs bg-black/70 border ${theme.borderColor} p-2.5 font-mono text-[11px] overflow-x-auto whitespace-pre`} style={{ color: theme.previewColor }}>
                {item.example}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
