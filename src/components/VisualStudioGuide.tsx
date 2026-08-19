import React from 'react';
import { Practical } from '../types';
import { Layout, Zap } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface VisualStudioGuideProps {
  practical: Practical;
}

export const VisualStudioGuide: React.FC<VisualStudioGuideProps> = ({ practical }) => {
  const { theme } = useTheme();
  const steps = practical.vsSteps || [
    { stepNumber: 1, title: 'Create Windows Forms Project', description: 'Open Visual Studio -> Create a new C# Windows Forms App (.NET Framework or .NET 8).' },
    { stepNumber: 2, title: 'Design the User Interface', description: 'From Toolbox (Ctrl+Alt+X), drag required controls onto the Form surface.' },
    { stepNumber: 3, title: 'Configure Control Properties', description: 'In Properties Window (F4), rename controls with standard prefixes (txt, btn, lbl) and set visual styles.' },
    { stepNumber: 4, title: 'Wire Event Handlers', description: 'Switch to Events tab (Lightning ⚡ icon) or double click controls to write C# event logic.' }
  ];

  return (
    <div className="space-y-3 font-mono text-xs">
      {/* Top Banner */}
      <div className={`rounded-sm border ${theme.borderColor} ${theme.cardSubBg} p-3 space-y-1`}>
        <div className={`flex items-center gap-2 text-xs font-bold ${theme.textHeading} uppercase`}>
          <Layout className="w-4 h-4" style={{ color: theme.previewColor }} />
          <span>VISUAL_STUDIO_2022_WORKFLOW // PRACTICAL #{practical.id}</span>
        </div>
        <p className={`text-[11px] ${theme.textColor} font-sans leading-relaxed`}>
          Standard IDE design steps and control property configurations for <strong className={theme.textHeading}>{practical.title}</strong>.
        </p>
      </div>

      {/* Steps Matrix */}
      <div className="space-y-2">
        {steps.map((step) => (
          <div 
            key={step.stepNumber}
            className={`flex items-start gap-3 p-3 rounded-sm border ${theme.borderColor} ${theme.cardBg} hover:${theme.cardSubBg} transition-colors`}
          >
            <div 
              style={{ backgroundColor: `${theme.previewColor}18`, borderColor: `${theme.previewColor}45`, color: theme.previewColor }}
              className="w-6 h-6 rounded-xs border font-bold flex items-center justify-center text-[10px] shrink-0"
            >
              0{step.stepNumber}
            </div>

            <div className="space-y-1 flex-1 min-w-0">
              <h4 className={`text-[11px] font-bold ${theme.textHeading} uppercase tracking-tight`}>
                {step.title}
              </h4>
              <p className={`text-[11px] ${theme.textColor} font-sans leading-relaxed`}>
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* VS Hotkeys Matrix */}
      <div className={`rounded-sm border ${theme.borderColor} ${theme.cardBg} p-3 space-y-2`}>
        <div className={`text-[11px] font-bold ${theme.textHeading} flex items-center gap-1.5 uppercase`}>
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>IDE_COMMAND_SHORTCUTS:</span>
        </div>
        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-[10px] ${theme.textColor}`}>
          <div className={`p-1.5 ${theme.cardSubBg} border ${theme.borderColor} rounded-xs`}><strong style={{ color: theme.previewColor }}>F5:</strong> Start Debugging</div>
          <div className={`p-1.5 ${theme.cardSubBg} border ${theme.borderColor} rounded-xs`}><strong style={{ color: theme.previewColor }}>Ctrl + F5:</strong> Run Executable</div>
          <div className={`p-1.5 ${theme.cardSubBg} border ${theme.borderColor} rounded-xs`}><strong style={{ color: theme.previewColor }}>F7:</strong> View Code (C#)</div>
          <div className={`p-1.5 ${theme.cardSubBg} border ${theme.borderColor} rounded-xs`}><strong style={{ color: theme.previewColor }}>Shift + F7:</strong> View Designer</div>
          <div className={`p-1.5 ${theme.cardSubBg} border ${theme.borderColor} rounded-xs`}><strong style={{ color: theme.previewColor }}>F4:</strong> Properties Panel</div>
          <div className={`p-1.5 ${theme.cardSubBg} border ${theme.borderColor} rounded-xs`}><strong style={{ color: theme.previewColor }}>Ctrl+Alt+X:</strong> Open Toolbox</div>
        </div>
      </div>
    </div>
  );
};
