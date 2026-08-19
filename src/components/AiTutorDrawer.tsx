import React, { useState, useRef, useEffect } from 'react';
import { Practical } from '../types';
import { 
  Sparkles, 
  X, 
  Send, 
  User, 
  Loader2, 
  RotateCcw,
  Bot,
  RefreshCw,
  Check,
  Copy
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import { useTheme } from '../context/ThemeContext';

interface AiTutorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  practical: Practical;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  modelUsed?: string;
  isError?: boolean;
}

export const AiTutorDrawer: React.FC<AiTutorDrawerProps> = ({ isOpen, onClose, practical }) => {
  const { theme } = useTheme();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'assistant',
      text: `👋 **SharpSensei Online.** Loaded context for **Practical #${practical.id}: ${practical.title}**.\n\nAsk me about algorithmic logic, syntax rules, event wiring, exception handling, or university Viva Voce questions!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      modelUsed: 'SharpSensei AI'
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lastQuery, setLastQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([
      {
        id: Date.now().toString(),
        sender: 'assistant',
        text: `Active Practical Context Loaded:\n\n**Practical #${practical.id}: ${practical.title}**\n*${practical.aim}*\n\nHow can I help you master this program?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: 'SharpSensei'
      }
    ]);
  }, [practical.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (customPrompt?: string) => {
    const q = (customPrompt || inputQuery).trim();
    if (!q || isLoading) return;

    setLastQuery(q);

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: q,
          practicalContext: {
            id: practical.id,
            title: practical.title,
            aim: practical.aim,
            module: practical.module,
            codeSnippet: practical.code.slice(0, 2000)
          }
        })
      });

      const data = await response.json();
      
      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: data.answer || data.reply || 'No response generated.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: data.modelUsed || (data.source === 'curated' ? 'SharpSensei Engine' : 'Gemini AI')
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: `⚠️ **Connection Notice**: The AI assistant encountered a network interruption. Please check your connection or tap **Retry** below to resend your query.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isError: true
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const quickPrompts = [
    `Explain logic of #${practical.id}`,
    `Top 3 viva questions on this code`,
    `How to handle exceptions?`,
    `Visual Studio configuration tips`
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs transition-opacity"
          />

          {/* Sliding Spring Drawer */}
          <motion.aside 
            id="ai-tutor-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className={`fixed inset-y-0 right-0 z-50 w-full sm:w-[420px] md:w-[480px] ${theme.cardBg} border-l ${theme.borderColor} shadow-2xl flex flex-col font-mono text-xs`}
          >
            {/* High Density Header */}
            <div className={`flex items-center justify-between p-3.5 border-b ${theme.borderColor} ${theme.cardSubBg} shrink-0`}>
              <div className="flex items-center gap-2.5">
                <div 
                  style={{ backgroundColor: theme.previewColor, color: theme.accentTextColor }}
                  className="w-7 h-7 rounded-sm flex items-center justify-center font-black shadow-xs"
                >
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className={`text-xs font-bold ${theme.textHeading} uppercase tracking-tight flex items-center gap-1.5`}>
                    SHARPSENSEI // AI_TUTOR
                    <span className="text-[9px] px-1.5 py-0.2 rounded-xs bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      ONLINE
                    </span>
                  </h3>
                  <p className={`text-[10px] ${theme.textMuted} truncate max-w-[240px]`}>
                    CTX: #{practical.id} {practical.title}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setMessages([messages[0]])}
                  className={`p-1.5 ${theme.textMuted} hover:${theme.textHeading} rounded-xs hover:${theme.cardBg} transition-colors cursor-pointer`}
                  title="Clear Chat History"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={onClose}
                  className={`p-1.5 ${theme.textMuted} hover:${theme.textHeading} rounded-xs hover:${theme.cardBg} transition-colors cursor-pointer`}
                  title="Close Drawer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Stream */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-[11px]">
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className={`flex items-center gap-1.5 text-[9px] ${theme.textMuted} mb-1 uppercase font-bold`}>
                    {m.sender === 'user' ? (
                      <>
                        <span>STUDENT // YOU</span>
                        <User className="w-2.5 h-2.5" style={{ color: theme.previewColor }} />
                      </>
                    ) : (
                      <>
                        <Bot className="w-3 h-3" style={{ color: theme.previewColor }} />
                        <span>SHARPSENSEI PROFESSOR</span>
                        {m.modelUsed && (
                          <span className={`text-[8px] px-1 py-0.2 rounded-xs ${theme.cardBg} ${theme.textMuted} border ${theme.borderColor}`}>
                            {m.modelUsed}
                          </span>
                        )}
                      </>
                    )}
                    <span className="text-slate-600">[{m.timestamp}]</span>
                  </div>

                  <div
                    style={
                      m.sender === 'user'
                        ? { 
                            backgroundColor: `${theme.previewColor}20`,
                            borderColor: `${theme.previewColor}60`
                          }
                        : undefined
                    }
                    className={`max-w-[95%] p-3.5 rounded-sm leading-relaxed border ${
                      m.sender === 'user'
                        ? `${theme.textHeading} font-sans shadow-xs`
                        : m.isError
                        ? 'bg-rose-950/20 border-rose-800/60 text-rose-200 font-sans shadow-xs'
                        : `${theme.cardSubBg} ${theme.borderColor} ${theme.textHeading} font-sans shadow-xs`
                    }`}
                  >
                    {m.sender === 'user' ? (
                      <div className="font-mono text-xs">{m.text}</div>
                    ) : (
                      <div className={`text-xs space-y-2 ${theme.textHeading} prose prose-invert max-w-none`}>
                        <Markdown>{m.text}</Markdown>

                        {/* Copy snippet button & Error retry */}
                        <div className={`pt-2 mt-2 border-t ${theme.borderColor} flex items-center justify-between text-[10px] ${theme.textMuted}`}>
                          {m.isError ? (
                            <button
                              onClick={() => handleSendMessage(lastQuery)}
                              style={{ color: theme.previewColor }}
                              className="flex items-center gap-1 font-bold uppercase cursor-pointer hover:underline"
                            >
                              <RefreshCw className="w-3 h-3" />
                              Retry Last Query
                            </button>
                          ) : (
                            <button
                              onClick={() => handleCopy(m.text, m.id)}
                              className={`flex items-center gap-1 hover:${theme.textHeading} transition-colors cursor-pointer`}
                            >
                              {copiedId === m.id ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-400" />
                                  <span className="text-emerald-400">Copied!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  <span>Copy Response</span>
                                </>
                              )}
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <div 
                  style={{ backgroundColor: `${theme.previewColor}15`, borderColor: `${theme.previewColor}40` }}
                  className="flex items-center gap-2.5 text-[11px] p-3 border rounded-sm"
                >
                  <Loader2 className="w-4 h-4 animate-spin" style={{ color: theme.previewColor }} />
                  <div>
                    <span className={`font-bold ${theme.textHeading}`}>SHARPSENSEI IS ANALYZING C# FORMULATION...</span>
                    <p className={`text-[9px] ${theme.textMuted}`}>Checking algorithm logic, exceptions & viva questions</p>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts Deck */}
            <div className={`p-2 border-t ${theme.borderColor} ${theme.cardBg} overflow-x-auto no-scrollbar flex gap-1.5 shrink-0`}>
              {quickPrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(prompt)}
                  disabled={isLoading}
                  className={`shrink-0 text-[10px] px-2.5 py-1 rounded-xs ${theme.cardSubBg} hover:${theme.cardBg} ${theme.textColor} hover:${theme.textHeading} border ${theme.borderColor} transition-all active:scale-95 whitespace-nowrap cursor-pointer disabled:opacity-40`}
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Deck */}
            <div className={`p-3 border-t ${theme.borderColor} ${theme.cardSubBg} shrink-0`}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  placeholder={`Ask anything about Practical #${practical.id}...`}
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  disabled={isLoading}
                  className={`flex-1 ${theme.cardBg} border ${theme.borderColor} rounded-sm px-3 py-2 text-[11px] ${theme.textHeading} placeholder-slate-500 focus:outline-none transition-colors`}
                  style={{ outlineColor: theme.previewColor }}
                />
                <button
                  type="submit"
                  disabled={!inputQuery.trim() || isLoading}
                  style={{ backgroundColor: theme.previewColor, color: theme.accentTextColor }}
                  className="px-3.5 py-2 rounded-sm font-bold uppercase disabled:opacity-30 transition-all active:scale-95 shadow-xs cursor-pointer flex items-center justify-center"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};
