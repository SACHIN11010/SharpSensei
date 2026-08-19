import React, { useState } from 'react';
import { Practical } from '../types';
import { Printer, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface LabRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  practical: Practical;
}

export const LabRecordModal: React.FC<LabRecordModalProps> = ({ isOpen, onClose, practical }) => {
  const { theme } = useTheme();
  const [studentName, setStudentName] = useState('Ananya Verma');
  const [rollNo, setRollNo] = useState('23BCA104');
  const [dateOfSubmission, setDateOfSubmission] = useState(new Date().toISOString().split('T')[0]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-xs font-mono print:p-0 print:bg-white">
      <div className={`relative w-full max-w-3xl rounded-sm border ${theme.borderColor} ${theme.cardBg} shadow-2xl overflow-hidden flex flex-col max-h-[90vh] print:max-h-none print:border-none print:shadow-none print:bg-white print:text-black`}>
        {/* Top Control Bar */}
        <div className={`flex items-center justify-between p-3 border-b ${theme.borderColor} ${theme.cardSubBg} print:hidden`}>
          <div className="flex items-center gap-2">
            <Printer className="w-4 h-4 text-emerald-400" />
            <h3 className={`text-xs font-bold ${theme.textHeading} uppercase tracking-tight`}>
              LAB_RECORD_DOCUMENT_GENERATOR // PDF_EXPORT
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1 px-3 py-1 bg-emerald-500 hover:bg-emerald-400 text-black text-[11px] font-black uppercase tracking-wider rounded-xs transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>PRINT_RECORD</span>
            </button>
            <button onClick={onClose} className={`p-1 ${theme.textMuted} hover:${theme.textHeading} cursor-pointer`}>
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Student Customization Bar */}
        <div className={`p-2.5 ${theme.cardSubBg} border-b ${theme.borderColor} grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs print:hidden`}>
          <div>
            <label className={`block ${theme.textMuted} text-[10px] uppercase font-bold`}>Student Name:</label>
            <input 
              type="text" 
              value={studentName} 
              onChange={(e) => setStudentName(e.target.value)} 
              className={`w-full ${theme.cardBg} border ${theme.borderColor} rounded-xs px-2 py-0.5 ${theme.textHeading} text-[11px]`}
            />
          </div>
          <div>
            <label className={`block ${theme.textMuted} text-[10px] uppercase font-bold`}>Roll / Reg Number:</label>
            <input 
              type="text" 
              value={rollNo} 
              onChange={(e) => setRollNo(e.target.value)} 
              className={`w-full ${theme.cardBg} border ${theme.borderColor} rounded-xs px-2 py-0.5 ${theme.textHeading} text-[11px]`}
            />
          </div>
          <div>
            <label className={`block ${theme.textMuted} text-[10px] uppercase font-bold`}>Submission Date:</label>
            <input 
              type="date" 
              value={dateOfSubmission} 
              onChange={(e) => setDateOfSubmission(e.target.value)} 
              className={`w-full ${theme.cardBg} border ${theme.borderColor} rounded-xs px-2 py-0.5 ${theme.textHeading} text-[11px]`}
            />
          </div>
        </div>

        {/* Document Sheet */}
        <div className={`p-6 overflow-y-auto space-y-5 text-xs ${theme.textColor} print:text-black print:overflow-visible print:p-8`}>
          {/* Header */}
          <div className={`text-center border-b-2 ${theme.borderColor} print:border-black pb-3 space-y-1`}>
            <h1 className={`text-sm font-bold uppercase tracking-wider ${theme.textHeading} print:text-black`}>
              Department of Computer Applications • BCA Semester 5
            </h1>
            <h2 className={`text-xs font-semibold ${theme.textMuted} print:text-slate-700`}>
              Course Code: MS23PMJDSCBCA501C — C# GUI Programming Lab
            </h2>
            <div className={`text-[11px] font-mono ${theme.textMuted} print:text-slate-600 pt-1 flex justify-center gap-6`}>
              <span><strong>Student:</strong> {studentName}</span>
              <span><strong>Roll No:</strong> {rollNo}</span>
              <span><strong>Date:</strong> {dateOfSubmission}</span>
            </div>
          </div>

          {/* Practical Info Banner */}
          <div className={`flex justify-between items-center ${theme.cardSubBg} print:bg-slate-100 p-2.5 rounded-xs border ${theme.borderColor} print:border-slate-300`}>
            <span className="font-bold text-xs print:text-blue-700 uppercase" style={{ color: theme.previewColor }}>
              PRACTICAL NO: {practical.id}
            </span>
            <span className={`font-semibold ${theme.textColor} print:text-slate-800 text-[11px]`}>
              {practical.module}
            </span>
          </div>

          {/* Aim */}
          <div className="space-y-1">
            <h4 className={`font-bold ${theme.textHeading} print:text-black uppercase text-[10px] tracking-wider`}>
              1. AIM / OBJECTIVE:
            </h4>
            <p className={`p-2.5 rounded-xs ${theme.cardSubBg} print:bg-slate-50 border ${theme.borderColor} print:border-slate-300 leading-relaxed ${theme.textColor} print:text-slate-800 text-[11px] font-sans`}>
              {practical.aim}
            </p>
          </div>

          {/* Requirements */}
          <div className="space-y-1">
            <h4 className={`font-bold ${theme.textHeading} print:text-black uppercase text-[10px] tracking-wider`}>
              2. HARDWARE & SOFTWARE REQUIREMENTS:
            </h4>
            <ul className={`list-disc list-inside p-2.5 rounded-xs ${theme.cardSubBg} print:bg-slate-50 border ${theme.borderColor} print:border-slate-300 space-y-1 ${theme.textMuted} print:text-slate-700 text-[11px] font-sans`}>
              <li>OS: Microsoft Windows 10 / 11 64-bit</li>
              <li>IDE: Microsoft Visual Studio 2022 / 2019 Community Edition</li>
              <li>Framework: Microsoft .NET Framework 4.8 / .NET 8.0 SDK</li>
              <li>Language: C# (C-Sharp) GUI Programming</li>
            </ul>
          </div>

          {/* Algorithm */}
          <div className="space-y-1">
            <h4 className={`font-bold ${theme.textHeading} print:text-black uppercase text-[10px] tracking-wider`}>
              3. STEP-BY-STEP ALGORITHM:
            </h4>
            <ol className={`list-decimal list-inside p-2.5 rounded-xs ${theme.cardSubBg} print:bg-slate-50 border ${theme.borderColor} print:border-slate-300 space-y-1 ${theme.textColor} print:text-slate-700 text-[11px] font-sans`}>
              {practical.algorithm.map((step, idx) => (
                <li key={idx} className="leading-relaxed">{step}</li>
              ))}
            </ol>
          </div>

          {/* Source Code */}
          <div className="space-y-1">
            <h4 className={`font-bold ${theme.textHeading} print:text-black uppercase text-[10px] tracking-wider`}>
              4. C# SOURCE CODE:
            </h4>
            <pre className={`p-3 rounded-xs bg-black/80 print:bg-slate-50 border ${theme.borderColor} print:border-slate-300 font-mono text-[10px] print:text-black overflow-x-auto whitespace-pre leading-relaxed`} style={{ color: theme.previewColor }}>
              {practical.code}
            </pre>
          </div>

          {/* Simulated Output */}
          <div className="space-y-1">
            <h4 className={`font-bold ${theme.textHeading} print:text-black uppercase text-[10px] tracking-wider`}>
              5. TEST RUN OUTPUT:
            </h4>
            <div className={`p-2.5 rounded-xs bg-black print:bg-slate-100 border ${theme.borderColor} print:border-slate-300 font-mono text-[10px] text-emerald-400 print:text-emerald-800 space-y-1`}>
              {practical.simulatedOutput.map((out, i) => (
                <div key={i}>{out}</div>
              ))}
            </div>
          </div>

          {/* Signatures */}
          <div className={`pt-6 border-t ${theme.borderColor} print:border-slate-400 grid grid-cols-2 text-center text-[10px] ${theme.textMuted} print:text-slate-800`}>
            <div>
              <div className="h-10" />
              <div className={`border-t ${theme.borderColor} print:border-black mx-6 pt-1`}>
                Student Signature
              </div>
            </div>
            <div>
              <div className="h-10" />
              <div className={`border-t ${theme.borderColor} print:border-black mx-6 pt-1 font-bold`}>
                Faculty In-Charge Signature
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
