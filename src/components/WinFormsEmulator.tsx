import React, { useState, useEffect, useRef } from 'react';
import { Practical } from '../types';
import { 
  Monitor, 
  Play, 
  RotateCcw, 
  Folder, 
  FileText, 
  Plus, 
  Trash2, 
  Edit3, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  Database,
  Calendar,
  Layers,
  Sliders,
  Palette,
  Type,
  Maximize2,
  Clock,
  Printer
} from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';

interface WinFormsEmulatorProps {
  practical: Practical;
}

export const WinFormsEmulator: React.FC<WinFormsEmulatorProps> = ({ practical }) => {
  const { theme } = useTheme();
  const emulatorType = practical.emulatorType || 'standard-console';
  const [isMaximized, setIsMaximized] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 8, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="space-y-4"
    >
      {/* Windows 11 Fluent Acrylic / Mica Window Frame */}
      <div className={`rounded-xl border ${theme.borderColor} ${theme.cardBg} shadow-2xl backdrop-blur-md overflow-hidden ring-1 ring-white/10 transition-all duration-200 ${isMaximized ? 'fixed inset-4 z-50 flex flex-col' : ''}`}>
        {/* Title Bar (Windows 11 Mica Bar) */}
        <div className={`flex items-center justify-between px-3.5 py-2.5 ${theme.cardSubBg} border-b ${theme.borderColor} select-none backdrop-blur-md`}>
          <div className="flex items-center gap-2.5">
            <div 
              style={{ backgroundColor: theme.previewColor, color: theme.accentTextColor }}
              className="w-5 h-5 rounded-md shadow-sm flex items-center justify-center text-[10px] font-black tracking-tight"
            >
              C#
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-semibold ${theme.textHeading} tracking-tight`}>
                {practical.title}
              </span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-xs ${theme.cardBg} ${theme.textMuted} border ${theme.borderColor} font-mono hidden sm:inline`}>
                Form1.cs [Running]
              </span>
            </div>
          </div>

          {/* Windows 11 Window Controls */}
          <div className="flex items-center -mr-1">
            <button 
              className={`w-8 h-7 flex items-center justify-center ${theme.textMuted} hover:${theme.cardSubBg} hover:${theme.textHeading} transition-colors`}
              title="Minimize"
            >
              <span className="w-2.5 h-[1.5px] bg-current"></span>
            </button>
            <button 
              onClick={() => setIsMaximized(!isMaximized)}
              className={`w-8 h-7 flex items-center justify-center ${theme.textMuted} hover:${theme.cardSubBg} hover:${theme.textHeading} transition-colors`}
              title={isMaximized ? "Restore Down" : "Maximize"}
            >
              <span className={`w-2.5 h-2.5 border border-current ${isMaximized ? 'rounded-none' : 'rounded-xs'}`}></span>
            </button>
            <button 
              className={`w-9 h-7 flex items-center justify-center ${theme.textMuted} hover:bg-red-600 hover:text-white transition-colors rounded-tr-md`}
              title="Close Application"
            >
              <span className="text-xs leading-none">✕</span>
            </button>
          </div>
        </div>

        {/* Dynamic Form Canvas with Subtitle Ribbon */}
        <div className={`p-4 sm:p-6 ${theme.appBg} min-h-[440px] flex flex-col justify-center ${isMaximized ? 'flex-1 overflow-y-auto' : ''}`}>
          {renderEmulatorContent(emulatorType, practical)}
        </div>

        {/* WinForms Status Strip */}
        <div className={`px-3 py-1 ${theme.cardSubBg} border-t ${theme.borderColor} flex items-center justify-between text-[10px] ${theme.textMuted} font-mono`}>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Ready
            </span>
            <span className="hidden sm:inline">Thread: UI (ID: 1)</span>
          </div>
          <div className="flex items-center gap-2">
            <span>WinForms CLR 8.0</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

function renderEmulatorContent(type: string, practical: Practical) {
  switch (type) {
    case 'number-to-words':
      return <NumberToWordsEmulator />;
    case 'string-counter':
      return <StringCounterEmulator />;
    case 'oop-person':
      return <OopPersonEmulator />;
    case 'calculator-gui':
      return <CalculatorEmulator />;
    case 'registration-form':
      return <RegistrationFormEmulator />;
    case 'checkedlist-hobbies':
      return <CheckedListHobbiesEmulator />;
    case 'oddeven-splitter':
      return <OddEvenSplitterEmulator />;
    case 'palindrome-analyzer':
      return <PalindromeAnalyzerEmulator />;
    case 'groupbox-themer':
      return <GroupBoxThemerEmulator />;
    case 'cascading-combobox':
      return <CascadingComboBoxEmulator />;
    case 'datetime-age-calc':
      return <DateTimeAgeCalcEmulator />;
    case 'gdi-2d-studio':
      return <Gdi2dStudioEmulator />;
    case 'colordialog-fontdialog':
      return <ColorFontDialogEmulator />;
    case 'imagelist-tabcontrol':
      return <TabControlEmulator />;
    case 'trackbar-progressbar':
      return <TrackBarProgressEmulator />;
    case 'stopwatch-timer':
      return <StopwatchEmulator />;
    case 'treeview-listview':
      return <TreeViewListViewEmulator />;
    case 'context-menu':
      return <ContextMenuEmulator />;
    case 'adonet-sql-emp':
      return <AdonetSqlEmpEmulator />;
    case 'msaccess-crud':
      return <MsAccessCrudEmulator />;
    case 'datagrid-search':
      return <DataGridLiveSearchEmulator />;
    case 'db-auth-session':
      return <DbAuthSessionEmulator />;
    case 'crystal-report':
    case 'parameterized-report':
      return <SalesReportEmulator />;
    default:
      return <DefaultConsoleEmulator practical={practical} />;
  }
}

// 1. Number To Words Emulator
function NumberToWordsEmulator() {
  const [numInput, setNumInput] = useState('348');
  const [result, setResult] = useState('');

  const units = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

  const convert = (n: number): string => {
    if (n === 0) return "Zero";
    if (n < 20) return units[n];
    if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? " " + units[n % 10] : "");
    if (n < 1000) return units[Math.floor(n / 100)] + " Hundred" + (n % 100 !== 0 ? " and " + convert(n % 100) : "");
    if (n < 1000000) return convert(Math.floor(n / 1000)) + " Thousand" + (n % 1000 !== 0 ? " " + convert(n % 1000) : "");
    return convert(Math.floor(n / 1000000)) + " Million " + convert(n % 1000000);
  };

  const handleConvert = () => {
    const val = parseInt(numInput, 10);
    if (isNaN(val) || val < 0) {
      setResult('Please enter a valid non-negative integer.');
      return;
    }
    setResult(convert(val));
  };

  return (
    <div className="max-w-md mx-auto w-full p-5 rounded-lg bg-slate-900 border border-slate-700 space-y-4 text-xs">
      <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
        <Type className="w-4 h-4 text-blue-400" />
        Number to Words Converter
      </h3>
      <div>
        <label className="block text-slate-300 mb-1">Enter Number (0 - 999,999):</label>
        <input 
          type="number"
          value={numInput} 
          onChange={(e) => setNumInput(e.target.value)} 
          className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-slate-100 font-mono focus:border-blue-500 focus:outline-none"
        />
      </div>
      <button 
        onClick={handleConvert}
        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded transition-colors"
      >
        Convert to Words (btnConvert_Click)
      </button>
      {result && (
        <div className="p-3 rounded bg-blue-950/40 border border-blue-800/60 text-blue-200 font-medium">
          <strong>Result:</strong> {result}
        </div>
      )}
    </div>
  );
}

// 2. String Counter Emulator
function StringCounterEmulator() {
  const [mainStr, setMainStr] = useState('Welcome to C# GUI Programming Lab in BCA Semester 5');
  const [subStr, setSubStr] = useState('in');
  const [count, setCount] = useState<number | null>(null);

  const handleCount = () => {
    if (!subStr) return;
    let occurrences = 0;
    let idx = mainStr.indexOf(subStr, 0);
    while (idx !== -1) {
      occurrences++;
      idx = mainStr.indexOf(subStr, idx + subStr.length);
    }
    setCount(occurrences);
  };

  return (
    <div className="max-w-md mx-auto w-full p-5 rounded-lg bg-slate-900 border border-slate-700 space-y-4 text-xs">
      <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
        <Search className="w-4 h-4 text-emerald-400" />
        Substring Occurrence Analyzer
      </h3>
      <div>
        <label className="block text-slate-300 mb-1">Main String (txtMain.Text):</label>
        <textarea 
          rows={3}
          value={mainStr} 
          onChange={(e) => setMainStr(e.target.value)} 
          className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-slate-100 focus:border-blue-500 focus:outline-none"
        />
      </div>
      <div>
        <label className="block text-slate-300 mb-1">Target Substring (txtSub.Text):</label>
        <input 
          type="text"
          value={subStr} 
          onChange={(e) => setSubStr(e.target.value)} 
          className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-slate-100 font-mono focus:border-blue-500 focus:outline-none"
        />
      </div>
      <button 
        onClick={handleCount}
        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2 rounded transition-colors"
      >
        Count Occurrences
      </button>
      {count !== null && (
        <div className="p-3 rounded bg-emerald-950/40 border border-emerald-800/60 text-emerald-200">
          The substring &quot;<strong className="text-white">{subStr}</strong>&quot; appeared <strong>{count}</strong> times.
        </div>
      )}
    </div>
  );
}

// 3. Calculator Emulator
function CalculatorEmulator() {
  const [display, setDisplay] = useState('0');
  const [prevVal, setPrevVal] = useState<number | null>(null);
  const [op, setOp] = useState<string | null>(null);
  const [clearNext, setClearNext] = useState(false);

  const handleDigit = (digit: string) => {
    if (display === '0' || clearNext) {
      setDisplay(digit);
      setClearNext(false);
    } else {
      setDisplay(display + digit);
    }
  };

  const handleOp = (nextOp: string) => {
    const current = parseFloat(display);
    if (prevVal !== null && op) {
      let calc = 0;
      if (op === '+') calc = prevVal + current;
      if (op === '-') calc = prevVal - current;
      if (op === '×') calc = prevVal * current;
      if (op === '÷') calc = current !== 0 ? prevVal / current : 0;
      setDisplay(String(calc));
      setPrevVal(calc);
    } else {
      setPrevVal(current);
    }
    setOp(nextOp);
    setClearNext(true);
  };

  const handleEquals = () => {
    if (prevVal !== null && op) {
      const current = parseFloat(display);
      let calc = 0;
      if (op === '+') calc = prevVal + current;
      if (op === '-') calc = prevVal - current;
      if (op === '×') calc = prevVal * current;
      if (op === '÷') calc = current !== 0 ? prevVal / current : 0;
      setDisplay(String(calc));
      setPrevVal(null);
      setOp(null);
      setClearNext(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPrevVal(null);
    setOp(null);
  };

  return (
    <div className="max-w-xs mx-auto w-full p-4 rounded-xl bg-slate-900 border border-slate-700 shadow-xl space-y-3">
      <div className="flex items-center justify-between text-slate-400 text-xs font-mono px-1">
        <span>WinForms Calculator</span>
        <span>{op ? `${prevVal} ${op}` : ''}</span>
      </div>

      <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-right font-mono text-xl text-slate-100 font-bold tracking-wider overflow-x-auto">
        {display}
      </div>

      <div className="grid grid-cols-4 gap-2 text-xs font-bold">
        <button onClick={handleClear} className="col-span-2 p-2.5 rounded bg-rose-900/60 hover:bg-rose-800 text-rose-200 border border-rose-700/50">C</button>
        <button onClick={() => setDisplay(String(-parseFloat(display)))} className="p-2.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200">±</button>
        <button onClick={() => handleOp('÷')} className="p-2.5 rounded bg-amber-600 hover:bg-amber-500 text-white">÷</button>

        {['7', '8', '9'].map(d => (
          <button key={d} onClick={() => handleDigit(d)} className="p-2.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-100">{d}</button>
        ))}
        <button onClick={() => handleOp('×')} className="p-2.5 rounded bg-amber-600 hover:bg-amber-500 text-white">×</button>

        {['4', '5', '6'].map(d => (
          <button key={d} onClick={() => handleDigit(d)} className="p-2.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-100">{d}</button>
        ))}
        <button onClick={() => handleOp('-')} className="p-2.5 rounded bg-amber-600 hover:bg-amber-500 text-white">-</button>

        {['1', '2', '3'].map(d => (
          <button key={d} onClick={() => handleDigit(d)} className="p-2.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-100">{d}</button>
        ))}
        <button onClick={() => handleOp('+')} className="p-2.5 rounded bg-amber-600 hover:bg-amber-500 text-white">+</button>

        <button onClick={() => handleDigit('0')} className="col-span-2 p-2.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-100">0</button>
        <button onClick={() => !display.includes('.') && setDisplay(display + '.')} className="p-2.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-100">.</button>
        <button onClick={handleEquals} className="p-2.5 rounded bg-blue-600 hover:bg-blue-500 text-white font-black">=</button>
      </div>
    </div>
  );
}

// 4. Registration Form Emulator
function RegistrationFormEmulator() {
  const [name, setName] = useState('Vikram Patel');
  const [email, setEmail] = useState('vikram@example.com');
  const [course, setCourse] = useState('BCA');
  const [gender, setGender] = useState('Male');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-md mx-auto w-full p-5 rounded-lg bg-slate-900 border border-slate-700 space-y-4 text-xs">
      <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
        <CheckCircle2 className="w-4 h-4 text-blue-400" />
        Student Registration Portal
      </h3>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-slate-300 mb-1">Full Name (txtName):</label>
          <input 
            type="text" 
            required 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-1.5 text-slate-100 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-slate-300 mb-1">Email Address (txtEmail):</label>
          <input 
            type="email" 
            required 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-1.5 text-slate-100 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-slate-300 mb-1">Course (cmbCourse):</label>
            <select 
              value={course} 
              onChange={(e) => setCourse(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-1.5 text-slate-100 focus:border-blue-500 focus:outline-none"
            >
              <option value="BCA">BCA (Semester 5)</option>
              <option value="B.Sc CS">B.Sc Computer Science</option>
              <option value="B.Tech IT">B.Tech IT</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-300 mb-1">Gender:</label>
            <div className="flex items-center gap-3 pt-1 text-slate-300">
              <label className="flex items-center gap-1 cursor-pointer">
                <input type="radio" name="g" checked={gender === 'Male'} onChange={() => setGender('Male')} /> Male
              </label>
              <label className="flex items-center gap-1 cursor-pointer">
                <input type="radio" name="g" checked={gender === 'Female'} onChange={() => setGender('Female')} /> Female
              </label>
            </div>
          </div>
        </div>

        <button 
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded transition-colors"
        >
          Submit Registration (MessageBox.Show)
        </button>
      </form>

      {submitted && (
        <div className="p-3 rounded bg-blue-950/60 border border-blue-500 text-blue-200 space-y-1">
          <div className="font-bold flex items-center gap-1.5 text-emerald-400">
            <CheckCircle2 className="w-4 h-4" /> MessageBox: Registration Successful!
          </div>
          <p><strong>Student:</strong> {name} | <strong>Course:</strong> {course} | <strong>Gender:</strong> {gender}</p>
        </div>
      )}
    </div>
  );
}

// 5. CheckedListBox Hobbies Emulator
function CheckedListHobbiesEmulator() {
  const [hobbies, setHobbies] = useState([
    { name: 'C# Programming', checked: true },
    { name: 'Chess & Strategy', checked: true },
    { name: 'Music Production', checked: false },
    { name: 'Graphic Design', checked: false },
    { name: 'Competitive Coding', checked: true }
  ]);

  const toggleHobby = (index: number) => {
    setHobbies(prev => prev.map((h, i) => i === index ? { ...h, checked: !h.checked } : h));
  };

  const selectedHobbies = hobbies.filter(h => h.checked).map(h => h.name);

  return (
    <div className="max-w-md mx-auto w-full p-5 rounded-lg bg-slate-900 border border-slate-700 space-y-4 text-xs">
      <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
        CheckedListBox Hobbies Selector
      </h3>

      <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 divide-y divide-slate-800/80">
        {hobbies.map((h, idx) => (
          <label key={h.name} className="flex items-center gap-2.5 py-2 cursor-pointer hover:text-white text-slate-300">
            <input 
              type="checkbox" 
              checked={h.checked} 
              onChange={() => toggleHobby(idx)} 
              className="rounded bg-slate-900 border-slate-700 text-blue-500 focus:ring-0"
            />
            <span>{h.name}</span>
          </label>
        ))}
      </div>

      <div className="p-3 rounded bg-slate-800 border border-slate-700 text-slate-200">
        <strong className="text-blue-400">CheckedItems.Count: {selectedHobbies.length}</strong>
        <p className="mt-1 text-slate-300">
          {selectedHobbies.length > 0 ? selectedHobbies.join(', ') : 'None selected'}
        </p>
      </div>
    </div>
  );
}

// 6. Odd Even Splitter Emulator
function OddEvenSplitterEmulator() {
  const [inputVal, setInputVal] = useState('15');
  const [odds, setOdds] = useState<number[]>([1, 3, 5, 7, 9, 11, 13, 15]);
  const [evens, setEvens] = useState<number[]>([2, 4, 6, 8, 10, 12, 14]);

  const handleGenerate = () => {
    const n = parseInt(inputVal, 10);
    if (isNaN(n) || n <= 0) return;
    const oddArr: number[] = [];
    const evenArr: number[] = [];
    for (let i = 1; i <= n; i++) {
      if (i % 2 === 0) evenArr.push(i);
      else oddArr.push(i);
    }
    setOdds(oddArr);
    setEvens(evenArr);
  };

  return (
    <div className="max-w-md mx-auto w-full p-5 rounded-lg bg-slate-900 border border-slate-700 space-y-4 text-xs">
      <div className="flex gap-2">
        <input 
          type="number" 
          value={inputVal} 
          onChange={(e) => setInputVal(e.target.value)} 
          placeholder="Max N"
          className="flex-1 bg-slate-950 border border-slate-700 rounded px-3 py-1.5 text-slate-100"
        />
        <button 
          onClick={handleGenerate} 
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded font-semibold"
        >
          Populate Lists
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-950 border border-slate-800 rounded p-2">
          <div className="font-bold text-amber-400 mb-1 border-b border-slate-800 pb-1">Odd Numbers ({odds.length})</div>
          <div className="max-h-36 overflow-y-auto space-y-0.5">
            {odds.map(n => <div key={n} className="text-slate-300">{n}</div>)}
          </div>
        </div>

        <div className="bg-slate-950 border border-slate-800 rounded p-2">
          <div className="font-bold text-emerald-400 mb-1 border-b border-slate-800 pb-1">Even Numbers ({evens.length})</div>
          <div className="max-h-36 overflow-y-auto space-y-0.5">
            {evens.map(n => <div key={n} className="text-slate-300">{n}</div>)}
          </div>
        </div>
      </div>
    </div>
  );
}

// 7. GDI+ 2D Studio Emulator
function Gdi2dStudioEmulator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [shape, setShape] = useState<'rectangle' | 'ellipse' | 'polygon' | 'pie'>('rectangle');
  const [brushType, setBrushType] = useState<'solid' | 'gradient' | 'hatch'>('gradient');
  const [penWidth, setPenWidth] = useState(3);
  const [primaryColor, setPrimaryColor] = useState('#3b82f6');
  const [secondaryColor, setSecondaryColor] = useState('#ec4899');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background grid
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 20) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += 20) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Prepare Brush (Fill)
    let fillStyle: any = primaryColor;
    if (brushType === 'gradient') {
      const grad = ctx.createLinearGradient(50, 50, 250, 200);
      grad.addColorStop(0, primaryColor);
      grad.addColorStop(1, secondaryColor);
      fillStyle = grad;
    }
    ctx.fillStyle = fillStyle;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = penWidth;

    // Draw Shape
    ctx.beginPath();
    if (shape === 'rectangle') {
      ctx.rect(60, 40, 220, 140);
      ctx.fill();
      ctx.stroke();
    } else if (shape === 'ellipse') {
      ctx.ellipse(170, 110, 110, 70, 0, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
    } else if (shape === 'pie') {
      ctx.moveTo(170, 110);
      ctx.arc(170, 110, 90, 0, (Math.PI * 1.5), false);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    } else if (shape === 'polygon') {
      ctx.moveTo(170, 30);
      ctx.lineTo(260, 170);
      ctx.lineTo(80, 170);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }

    // Annotation
    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px monospace';
    ctx.fillText(`GDI+ e.Graphics.Draw${shape.toUpperCase()}()`, 15, canvas.height - 15);
  }, [shape, brushType, penWidth, primaryColor, secondaryColor]);

  return (
    <div className="max-w-xl mx-auto w-full p-4 rounded-lg bg-slate-900 border border-slate-700 space-y-3 text-xs">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
        <span className="font-bold text-slate-100 flex items-center gap-1.5">
          <Palette className="w-4 h-4 text-purple-400" />
          GDI+ Graphics Paint Studio
        </span>
        <div className="flex gap-1">
          {['rectangle', 'ellipse', 'polygon', 'pie'].map(s => (
            <button
              key={s}
              onClick={() => setShape(s as any)}
              className={`px-2 py-1 rounded capitalize ${
                shape === s ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
        <canvas 
          ref={canvasRef} 
          width={340} 
          height={220} 
          className="rounded-lg bg-slate-950 border border-slate-800 shadow-inner"
        />

        <div className="space-y-3 w-full md:w-48 text-[11px]">
          <div>
            <label className="block text-slate-400 mb-1">Brush Type:</label>
            <select 
              value={brushType} 
              onChange={(e) => setBrushType(e.target.value as any)}
              className="w-full bg-slate-950 border border-slate-700 rounded p-1 text-slate-200"
            >
              <option value="solid">SolidBrush</option>
              <option value="gradient">LinearGradientBrush</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-slate-400 mb-1">Primary Color:</label>
              <input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="w-full h-7 rounded bg-transparent cursor-pointer" />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Gradient End:</label>
              <input type="color" value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)} className="w-full h-7 rounded bg-transparent cursor-pointer" />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 mb-1">Pen Width: {penWidth}px</label>
            <input type="range" min={1} max={10} value={penWidth} onChange={(e) => setPenWidth(Number(e.target.value))} className="w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

// 8. ADO.NET SQL Employee CRUD Emulator
function AdonetSqlEmpEmulator() {
  const [employees, setEmployees] = useState([
    { id: 101, name: 'Ravi Verma', dept: 'IT Systems', salary: 75000 },
    { id: 102, name: 'Pooja Sharma', dept: 'HR & Admin', salary: 62000 },
    { id: 103, name: 'Ananya Iyer', dept: 'Finance', salary: 88000 },
    { id: 104, name: 'Karan Mehra', dept: 'Marketing', salary: 54000 }
  ]);

  const [idInput, setIdInput] = useState('105');
  const [nameInput, setNameInput] = useState('');
  const [deptInput, setDeptInput] = useState('IT Systems');
  const [salInput, setSalInput] = useState('');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [statusMsg, setStatusMsg] = useState('Connected to BCA_DB (EMP Table).');

  const handleRowClick = (emp: any) => {
    setSelectedId(emp.id);
    setIdInput(String(emp.id));
    setNameInput(emp.name);
    setDeptInput(emp.dept);
    setSalInput(String(emp.salary));
  };

  const handleInsert = () => {
    const id = parseInt(idInput, 10);
    const sal = parseFloat(salInput);
    if (isNaN(id) || !nameInput || isNaN(sal)) {
      setStatusMsg('Error: Please fill all fields.');
      return;
    }
    if (employees.some(e => e.id === id)) {
      setStatusMsg(`Error: Primary Key Violation! EmpId ${id} already exists.`);
      return;
    }
    setEmployees([...employees, { id, name: nameInput, dept: deptInput, salary: sal }]);
    setStatusMsg(`INSERT SUCCESS: Added ${nameInput} (ID: ${id}) into EMP table.`);
    setNameInput('');
    setSalInput('');
  };

  const handleUpdate = () => {
    const id = parseInt(idInput, 10);
    const sal = parseFloat(salInput);
    setEmployees(employees.map(e => e.id === id ? { ...e, name: nameInput, dept: deptInput, salary: sal } : e));
    setStatusMsg(`UPDATE SUCCESS: Updated EmpId ${id}.`);
  };

  const handleDelete = () => {
    const id = parseInt(idInput, 10);
    setEmployees(employees.filter(e => e.id !== id));
    setStatusMsg(`DELETE SUCCESS: Removed EmpId ${id}.`);
    setIdInput('');
    setNameInput('');
    setSalInput('');
  };

  return (
    <div className="max-w-xl mx-auto w-full p-4 rounded-lg bg-slate-900 border border-slate-700 space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <span className="font-bold text-slate-100 flex items-center gap-1.5">
          <Database className="w-4 h-4 text-amber-400" />
          ADO.NET SQL Server Employee Database Manager
        </span>
        <span className="text-[11px] text-emerald-400 font-mono">● Connected</span>
      </div>

      {/* Input Form */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <div>
          <label className="block text-slate-400 text-[10px]">EmpId (txtEmpId):</label>
          <input 
            type="number" 
            value={idInput} 
            onChange={(e) => setIdInput(e.target.value)} 
            className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-slate-100 font-mono"
          />
        </div>
        <div>
          <label className="block text-slate-400 text-[10px]">Name (txtEmpName):</label>
          <input 
            type="text" 
            value={nameInput} 
            onChange={(e) => setNameInput(e.target.value)} 
            className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-slate-100"
          />
        </div>
        <div>
          <label className="block text-slate-400 text-[10px]">Department (cmbDept):</label>
          <select 
            value={deptInput} 
            onChange={(e) => setDeptInput(e.target.value)} 
            className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-slate-100 text-[11px]"
          >
            <option value="IT Systems">IT Systems</option>
            <option value="HR & Admin">HR & Admin</option>
            <option value="Finance">Finance</option>
            <option value="Marketing">Marketing</option>
          </select>
        </div>
        <div>
          <label className="block text-slate-400 text-[10px]">Salary (txtSalary):</label>
          <input 
            type="number" 
            value={salInput} 
            onChange={(e) => setSalInput(e.target.value)} 
            className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-slate-100 font-mono"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button onClick={handleInsert} className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white py-1.5 rounded font-semibold">
          Insert Record
        </button>
        <button onClick={handleUpdate} className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-1.5 rounded font-semibold">
          Update Record
        </button>
        <button onClick={handleDelete} className="flex-1 bg-rose-600 hover:bg-rose-500 text-white py-1.5 rounded font-semibold">
          Delete Record
        </button>
      </div>

      {/* DataGridView Simulator */}
      <div className="border border-slate-800 rounded bg-slate-950 overflow-x-auto max-h-40 overflow-y-auto">
        <table className="w-full text-left font-mono text-[11px]">
          <thead className="bg-slate-800 text-slate-300">
            <tr>
              <th className="p-2">EmpId</th>
              <th className="p-2">EmpName</th>
              <th className="p-2">Department</th>
              <th className="p-2">Salary (INR)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {employees.map(emp => (
              <tr 
                key={emp.id} 
                onClick={() => handleRowClick(emp)} 
                className={`cursor-pointer hover:bg-slate-800/60 ${selectedId === emp.id ? 'bg-blue-900/30 text-blue-200 font-semibold' : 'text-slate-300'}`}
              >
                <td className="p-2">{emp.id}</td>
                <td className="p-2">{emp.name}</td>
                <td className="p-2">{emp.dept}</td>
                <td className="p-2 font-mono">₹{emp.salary.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Status Bar */}
      <div className="p-2 rounded bg-slate-950 border border-slate-800 text-[11px] font-mono text-amber-300">
        {statusMsg}
      </div>
    </div>
  );
}

// 9. Stopwatch Emulator
function StopwatchEmulator() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<string[]>([]);

  useEffect(() => {
    let interval: any = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(prev => prev + 0.1);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleLap = () => {
    if (isRunning) {
      const lapNum = String(laps.length + 1).padStart(2, '0');
      setLaps([`Lap #${lapNum} — ${seconds.toFixed(1)}s`, ...laps]);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setSeconds(0);
    setLaps([]);
  };

  return (
    <div className="max-w-md mx-auto w-full p-5 rounded-lg bg-slate-900 border border-slate-700 space-y-4 text-xs text-center">
      <h3 className="text-sm font-bold text-slate-100 flex items-center justify-center gap-2">
        <Clock className="w-4 h-4 text-emerald-400" />
        WinForms Timer & Digital Stopwatch
      </h3>

      <div className="font-mono text-4xl font-black text-emerald-400 tracking-wider py-4 bg-slate-950 rounded-xl border border-slate-800 shadow-inner">
        {seconds.toFixed(1)} <span className="text-sm text-slate-500 font-normal">sec</span>
      </div>

      <div className="flex gap-2">
        <button 
          onClick={() => setIsRunning(!isRunning)} 
          className={`flex-1 py-2 rounded font-bold text-white transition-colors ${
            isRunning ? 'bg-amber-600 hover:bg-amber-500' : 'bg-emerald-600 hover:bg-emerald-500'
          }`}
        >
          {isRunning ? 'Pause Timer' : 'Start Timer'}
        </button>
        <button 
          onClick={handleLap} 
          disabled={!isRunning}
          className="px-4 py-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 disabled:opacity-40"
        >
          Lap Record
        </button>
        <button 
          onClick={handleReset} 
          className="px-4 py-2 rounded bg-rose-900/60 hover:bg-rose-800 text-rose-200"
        >
          Reset
        </button>
      </div>

      {laps.length > 0 && (
        <div className="text-left bg-slate-950 p-3 rounded border border-slate-800 max-h-32 overflow-y-auto space-y-1 font-mono text-[11px] text-slate-300">
          {laps.map((lap, i) => (
            <div key={i}>{lap}</div>
          ))}
        </div>
      )}
    </div>
  );
}

// 10. Default / Fallback Console Emulator
function DefaultConsoleEmulator({ practical }: { practical: Practical }) {
  const { theme } = useTheme();
  const [outputLogs] = useState<string[]>(practical.simulatedOutput || ['Execution simulation ready.']);

  return (
    <div className={`max-w-lg mx-auto w-full p-4 rounded-xl ${theme.cardBg} border ${theme.borderColor} space-y-3 text-xs font-mono`}>
      <div className={`flex items-center justify-between border-b ${theme.borderColor} pb-2`}>
        <span className={`font-bold ${theme.textHeading} flex items-center gap-1.5`}>
          <Monitor className="w-4 h-4" style={{ color: theme.previewColor }} />
          Interactive Practical Sandbox
        </span>
        <span className={`text-[10px] ${theme.textMuted}`}>ID #{practical.id}</span>
      </div>

      <div className={`bg-black p-4 rounded-lg border ${theme.borderColor} space-y-1.5 text-emerald-400 min-h-[160px] max-h-[220px] overflow-y-auto`}>
        <div className="text-slate-500">// Simulating C# Runtime Output...</div>
        {outputLogs.map((log, i) => (
          <div key={i} className="leading-relaxed">{log}</div>
        ))}
      </div>

      <div className={`text-[11px] ${theme.textMuted} italic`}>
        Tip: Inspect the Dry Run Trace tab or ask the AI Tutor for live step-by-step walkthroughs.
      </div>
    </div>
  );
}

// 11. OopPersonEmulator
function OopPersonEmulator() {
  const [name, setName] = useState('Ananya Sharma');
  const [age, setAge] = useState('21');
  const [isAdult, setIsAdult] = useState(true);

  const handleCheck = () => {
    const a = parseInt(age, 10);
    setIsAdult(a >= 18);
  };

  return (
    <div className="max-w-md mx-auto w-full p-5 rounded-lg bg-slate-900 border border-slate-700 space-y-4 text-xs">
      <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
        <Layers className="w-4 h-4 text-indigo-400" />
        OOP Person Class & Properties
      </h3>
      <div>
        <label className="block text-slate-300 mb-1">Person Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-1.5 text-slate-100" />
      </div>
      <div>
        <label className="block text-slate-300 mb-1">Age:</label>
        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-1.5 text-slate-100" />
      </div>
      <button onClick={handleCheck} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 rounded">
        Evaluate Person.IsAdult Property
      </button>
      <div className="p-3 rounded bg-slate-950 border border-slate-800 text-slate-200">
        Person &quot;<strong>{name}</strong>&quot; is {isAdult ? <span className="text-emerald-400 font-bold">an Adult (18+)</span> : <span className="text-amber-400 font-bold">a Minor</span>}.
      </div>
    </div>
  );
}

// 12. Palindrome Analyzer Emulator
function PalindromeAnalyzerEmulator() {
  const [text, setText] = useState('MADAM');
  const [isPal, setIsPal] = useState<boolean | null>(true);

  const checkPal = () => {
    const clean = text.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    const rev = clean.split('').reverse().join('');
    setIsPal(clean === rev);
  };

  return (
    <div className="max-w-md mx-auto w-full p-5 rounded-lg bg-slate-900 border border-slate-700 space-y-4 text-xs">
      <h3 className="text-sm font-bold text-slate-100">Palindrome String Checker</h3>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-slate-100 font-mono uppercase" />
      <button onClick={checkPal} className="w-full bg-blue-600 text-white py-2 rounded font-semibold">Check Palindrome</button>
      {isPal !== null && (
        <div className={`p-3 rounded border font-semibold ${isPal ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300' : 'bg-rose-950/40 border-rose-500 text-rose-300'}`}>
          &quot;{text}&quot; is {isPal ? 'a PALINDROME!' : 'NOT a palindrome.'}
        </div>
      )}
    </div>
  );
}

// 13. GroupBox Themer
function GroupBoxThemerEmulator() {
  const [bg, setBg] = useState('#1e293b');
  const [fg, setFg] = useState('#f8fafc');

  return (
    <div className="max-w-md mx-auto w-full p-5 rounded-lg bg-slate-900 border border-slate-700 space-y-4 text-xs">
      <h3 className="text-sm font-bold text-slate-100">GroupBox Theme Customizer</h3>
      <div className="p-4 rounded-lg border border-slate-700" style={{ backgroundColor: bg, color: fg }}>
        <p className="font-semibold text-sm">Preview Card Container</p>
        <p className="mt-1 text-xs opacity-90">Dynamic BackColor and ForeColor updated instantly via RadioButtons.</p>
      </div>
      <div className="flex gap-2">
        <button onClick={() => { setBg('#0f172a'); setFg('#38bdf8'); }} className="flex-1 bg-slate-800 p-2 rounded text-slate-200">Dark Blue</button>
        <button onClick={() => { setBg('#064e3b'); setFg('#a7f3d0'); }} className="flex-1 bg-slate-800 p-2 rounded text-slate-200">Emerald</button>
        <button onClick={() => { setBg('#701a75'); setFg('#fbcfe8'); }} className="flex-1 bg-slate-800 p-2 rounded text-slate-200">Purple</button>
      </div>
    </div>
  );
}

// 14. Cascading ComboBox
function CascadingComboBoxEmulator() {
  const [country, setCountry] = useState('India');
  const [state, setState] = useState('Maharashtra');

  const statesMap: Record<string, string[]> = {
    'India': ['Maharashtra', 'Karnataka', 'Delhi NCR', 'Gujarat', 'Tamil Nadu'],
    'USA': ['California', 'Texas', 'New York', 'Washington'],
    'UK': ['England', 'Scotland', 'Wales']
  };

  return (
    <div className="max-w-md mx-auto w-full p-5 rounded-lg bg-slate-900 border border-slate-700 space-y-4 text-xs">
      <h3 className="text-sm font-bold text-slate-100">Cascading Country / State ComboBox</h3>
      <div>
        <label className="block text-slate-400 mb-1">Country:</label>
        <select value={country} onChange={(e) => { setCountry(e.target.value); setState(statesMap[e.target.value][0]); }} className="w-full bg-slate-950 border border-slate-700 p-2 rounded text-slate-200">
          <option value="India">India</option>
          <option value="USA">United States</option>
          <option value="UK">United Kingdom</option>
        </select>
      </div>
      <div>
        <label className="block text-slate-400 mb-1">State / Province (Filtered):</label>
        <select value={state} onChange={(e) => setState(e.target.value)} className="w-full bg-slate-950 border border-slate-700 p-2 rounded text-slate-200">
          {(statesMap[country] || []).map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div className="p-2 rounded bg-slate-950 text-slate-300">Selected Location: <strong>{state}, {country}</strong></div>
    </div>
  );
}

// 15. DateTime Age Calculator
function DateTimeAgeCalcEmulator() {
  const [dob, setDob] = useState('2003-08-15');
  const [ageYears, setAgeYears] = useState<number | null>(23);

  const calculate = () => {
    const b = new Date(dob);
    const now = new Date();
    let y = now.getFullYear() - b.getFullYear();
    setAgeYears(y);
  };

  return (
    <div className="max-w-md mx-auto w-full p-5 rounded-lg bg-slate-900 border border-slate-700 space-y-4 text-xs">
      <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2"><Calendar className="w-4 h-4 text-blue-400" /> DateTimePicker Age Calculator</h3>
      <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="w-full bg-slate-950 border border-slate-700 p-2 rounded text-slate-200" />
      <button onClick={calculate} className="w-full bg-blue-600 text-white p-2 rounded font-semibold">Compute Precise Age</button>
      {ageYears !== null && <div className="p-3 rounded bg-blue-950 border border-blue-800 text-blue-200">Exact Age: <strong>{ageYears} Years</strong></div>}
    </div>
  );
}

// 16. ColorFontDialogEmulator
function ColorFontDialogEmulator() {
  const [color, setColor] = useState('#38bdf8');
  const [size, setSize] = useState(16);
  const [isBold, setIsBold] = useState(true);

  return (
    <div className="max-w-md mx-auto w-full p-5 rounded-lg bg-slate-900 border border-slate-700 space-y-4 text-xs">
      <h3 className="text-sm font-bold text-slate-100">ColorDialog & FontDialog Live Studio</h3>
      <div className="p-5 rounded bg-slate-950 border border-slate-800 text-center" style={{ color, fontSize: `${size}px`, fontWeight: isBold ? 'bold' : 'normal' }}>
        Sample WinForms Typography
      </div>
      <div className="flex gap-2">
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-8 rounded cursor-pointer" />
        <button onClick={() => setIsBold(!isBold)} className="flex-1 bg-slate-800 p-2 rounded text-slate-200 font-bold">Toggle Bold</button>
        <button onClick={() => setSize(s => Math.min(28, s + 2))} className="px-3 bg-slate-800 p-2 rounded text-slate-200">Size +</button>
        <button onClick={() => setSize(s => Math.max(12, s - 2))} className="px-3 bg-slate-800 p-2 rounded text-slate-200">Size -</button>
      </div>
    </div>
  );
}

// 17. TabControlEmulator
function TabControlEmulator() {
  const [tab, setTab] = useState<'dash' | 'students' | 'settings'>('dash');

  return (
    <div className="max-w-md mx-auto w-full p-4 rounded-lg bg-slate-900 border border-slate-700 space-y-3 text-xs">
      <div className="flex border-b border-slate-700">
        <button onClick={() => setTab('dash')} className={`px-4 py-2 font-semibold border-b-2 ${tab === 'dash' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400'}`}>Dashboard</button>
        <button onClick={() => setTab('students')} className={`px-4 py-2 font-semibold border-b-2 ${tab === 'students' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400'}`}>Students</button>
        <button onClick={() => setTab('settings')} className={`px-4 py-2 font-semibold border-b-2 ${tab === 'settings' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400'}`}>Settings</button>
      </div>
      <div className="p-4 bg-slate-950 rounded min-h-[100px] text-slate-300">
        {tab === 'dash' && <p>Dashboard View: 38 Practicals active, 4 modules registered.</p>}
        {tab === 'students' && <p>Student Records: 142 enrolled in BCA Semester 5.</p>}
        {tab === 'settings' && <p>System Configuration: .NET 8 Runtime, WinForms enabled.</p>}
      </div>
    </div>
  );
}

// 18. TrackBarProgressEmulator
function TrackBarProgressEmulator() {
  const [val, setVal] = useState(65);

  return (
    <div className="max-w-md mx-auto w-full p-5 rounded-lg bg-slate-900 border border-slate-700 space-y-4 text-xs">
      <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2"><Sliders className="w-4 h-4 text-blue-400" /> TrackBar & ProgressBar Sync</h3>
      <input type="range" min={0} max={100} value={val} onChange={(e) => setVal(Number(e.target.value))} className="w-full" />
      <div className="w-full h-4 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
        <div className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 transition-all duration-150" style={{ width: `${val}%` }} />
      </div>
      <div className="text-center font-mono text-slate-300">Current Value: <strong>{val}%</strong></div>
    </div>
  );
}

// 19. TreeViewListViewEmulator
function TreeViewListViewEmulator() {
  const [selectedFolder, setSelectedFolder] = useState('BCA_Projects');

  const filesMap: Record<string, string[]> = {
    'BCA_Projects': ['Calculator.cs', 'EmployeeCrud.cs', 'AppDatabase.mdf'],
    'Lab_Manuals': ['BCA_Sem5_Manual.pdf', 'VivaQuestions.docx'],
    'Database_Dumps': ['Backup_2026.sql', 'Schema_EMP.sql']
  };

  return (
    <div className="max-w-lg mx-auto w-full p-4 rounded-lg bg-slate-900 border border-slate-700 space-y-3 text-xs">
      <h3 className="text-sm font-bold text-slate-100">TreeView & ListView Explorer</h3>
      <div className="grid grid-cols-2 gap-3 min-h-[140px]">
        <div className="bg-slate-950 p-2 rounded border border-slate-800 space-y-1">
          <div className="text-slate-500 font-bold text-[10px]">DIRECTORIES</div>
          {Object.keys(filesMap).map(folder => (
            <button key={folder} onClick={() => setSelectedFolder(folder)} className={`w-full text-left p-1.5 rounded flex items-center gap-1.5 ${selectedFolder === folder ? 'bg-blue-600/30 text-blue-300 font-bold' : 'text-slate-400 hover:text-slate-200'}`}>
              <Folder className="w-3.5 h-3.5 text-amber-400" />
              <span>{folder}</span>
            </button>
          ))}
        </div>
        <div className="bg-slate-950 p-2 rounded border border-slate-800 space-y-1">
          <div className="text-slate-500 font-bold text-[10px]">FILES IN {selectedFolder.toUpperCase()}</div>
          {(filesMap[selectedFolder] || []).map(file => (
            <div key={file} className="p-1.5 rounded flex items-center gap-1.5 text-slate-300 hover:bg-slate-900">
              <FileText className="w-3.5 h-3.5 text-blue-400" />
              <span>{file}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 20. ContextMenuEmulator
function ContextMenuEmulator() {
  const [items, setItems] = useState(['C# Generics', 'ADO.NET Architecture', 'GDI+ Graphics']);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(0);

  const handleUpper = () => {
    if (selectedIdx !== null) {
      setItems(items.map((it, i) => i === selectedIdx ? it.toUpperCase() : it));
    }
  };

  const handleDelete = () => {
    if (selectedIdx !== null) {
      setItems(items.filter((_, i) => i !== selectedIdx));
      setSelectedIdx(null);
    }
  };

  return (
    <div className="max-w-md mx-auto w-full p-4 rounded-lg bg-slate-900 border border-slate-700 space-y-3 text-xs">
      <h3 className="text-sm font-bold text-slate-100">ContextMenu Right-Click Action Palette</h3>
      <div className="bg-slate-950 rounded border border-slate-800 divide-y divide-slate-800">
        {items.map((it, i) => (
          <div key={i} onClick={() => setSelectedIdx(i)} className={`p-2 cursor-pointer ${selectedIdx === i ? 'bg-blue-600/20 text-blue-300 font-bold' : 'text-slate-300'}`}>
            {it}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <button onClick={handleUpper} disabled={selectedIdx === null} className="flex-1 bg-slate-800 hover:bg-slate-700 p-2 rounded text-slate-200 disabled:opacity-40">
          Uppercase
        </button>
        <button onClick={handleDelete} disabled={selectedIdx === null} className="flex-1 bg-rose-900/60 hover:bg-rose-800 p-2 rounded text-rose-200 disabled:opacity-40">
          Delete Item
        </button>
      </div>
    </div>
  );
}

// 21. MsAccessCrudEmulator
function MsAccessCrudEmulator() {
  const [students, setStudents] = useState([
    { rollNo: 201, name: 'Neha Singh', course: 'BCA', sem: 5 },
    { rollNo: 202, name: 'Aditya Gupta', course: 'BCA', sem: 5 }
  ]);
  const [roll, setRoll] = useState('203');
  const [name, setName] = useState('');

  const handleAdd = () => {
    if (!name) return;
    setStudents([...students, { rollNo: parseInt(roll, 10), name, course: 'BCA', sem: 5 }]);
    setName('');
    setRoll(String(parseInt(roll, 10) + 1));
  };

  return (
    <div className="max-w-md mx-auto w-full p-4 rounded-lg bg-slate-900 border border-slate-700 space-y-3 text-xs">
      <h3 className="text-sm font-bold text-slate-100">MS Access (.accdb) OleDb Connection</h3>
      <div className="flex gap-2">
        <input type="number" placeholder="Roll No" value={roll} onChange={(e) => setRoll(e.target.value)} className="w-20 bg-slate-950 border border-slate-700 p-1.5 rounded text-slate-100" />
        <input type="text" placeholder="Student Name" value={name} onChange={(e) => setName(e.target.value)} className="flex-1 bg-slate-950 border border-slate-700 p-1.5 rounded text-slate-100" />
        <button onClick={handleAdd} className="bg-emerald-600 text-white px-3 py-1.5 rounded font-semibold">Save</button>
      </div>
      <div className="bg-slate-950 p-2 rounded border border-slate-800 space-y-1 font-mono text-[11px] text-slate-300">
        {students.map(s => <div key={s.rollNo}>Roll #{s.rollNo}: {s.name} ({s.course} Sem {s.sem})</div>)}
      </div>
    </div>
  );
}

// 22. DataGridLiveSearchEmulator
function DataGridLiveSearchEmulator() {
  const [search, setSearch] = useState('');
  const items = [
    { id: 101, name: 'Dell Latitude Laptop', cat: 'Electronics', price: 65000 },
    { id: 102, name: 'Logitech Wireless Mouse', cat: 'Accessories', price: 1200 },
    { id: 103, name: 'Mechanical Keyboard RGB', cat: 'Accessories', price: 3500 },
    { id: 104, name: 'Samsung 27" Monitor', cat: 'Electronics', price: 18500 }
  ];

  const filtered = items.filter(it => it.name.toLowerCase().includes(search.toLowerCase()) || it.cat.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="max-w-lg mx-auto w-full p-4 rounded-lg bg-slate-900 border border-slate-700 space-y-3 text-xs">
      <div className="relative">
        <Search className="absolute left-2.5 top-2 w-3.5 h-3.5 text-slate-400" />
        <input type="text" placeholder="Live filter by product or category..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full bg-slate-950 border border-slate-700 pl-8 pr-3 py-1.5 rounded text-slate-100" />
      </div>
      <div className="bg-slate-950 p-2 rounded border border-slate-800 space-y-1 font-mono text-[11px] text-slate-300">
        {filtered.map(it => (
          <div key={it.id} className="flex justify-between py-1 border-b border-slate-900">
            <span>{it.name} <span className="text-slate-500">({it.cat})</span></span>
            <span className="text-amber-300">₹{it.price.toLocaleString()}</span>
          </div>
        ))}
      </div>
      <div className="text-[11px] text-slate-400">DataView.RowFilter matched {filtered.length} records.</div>
    </div>
  );
}

// 23. DbAuthSessionEmulator
function DbAuthSessionEmulator() {
  const [user, setUser] = useState('prof_sharma');
  const [pass, setPass] = useState('admin123');
  const [session, setSession] = useState<string | null>(null);

  const handleLogin = () => {
    if (user === 'prof_sharma' && pass === 'admin123') {
      setSession('Prof. Sharma (Admin)');
    } else {
      setSession('Invalid Credentials');
    }
  };

  return (
    <div className="max-w-md mx-auto w-full p-5 rounded-lg bg-slate-900 border border-slate-700 space-y-3 text-xs">
      <h3 className="text-sm font-bold text-slate-100">Database Role-Based Authentication</h3>
      <input type="text" value={user} onChange={(e) => setUser(e.target.value)} placeholder="Username" className="w-full bg-slate-950 border border-slate-700 p-2 rounded text-slate-100" />
      <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Password" className="w-full bg-slate-950 border border-slate-700 p-2 rounded text-slate-100" />
      <button onClick={handleLogin} className="w-full bg-blue-600 text-white p-2 rounded font-semibold">Authenticate (SqlDataReader)</button>
      {session && <div className="p-2 rounded bg-slate-950 border border-slate-800 text-emerald-400 font-mono">Status: {session}</div>}
    </div>
  );
}

// 24. SalesReportEmulator
function SalesReportEmulator() {
  const [salesman, setSalesman] = useState('All');

  const rows = [
    { inv: 'INV-1001', rep: 'Rajesh Kumar', client: 'Apex Corp', amt: 45000 },
    { inv: 'INV-1002', rep: 'Anita Desai', client: 'Zenith Systems', amt: 82000 },
    { inv: 'INV-1003', rep: 'Rajesh Kumar', client: 'Quantum Tech', amt: 125000 }
  ];

  const filtered = salesman === 'All' ? rows : rows.filter(r => r.rep === salesman);
  const total = filtered.reduce((acc, r) => acc + r.amt, 0);

  return (
    <div className="max-w-lg mx-auto w-full p-4 rounded-lg bg-slate-900 border border-slate-700 space-y-3 text-xs">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-bold text-slate-100 flex items-center gap-1.5"><Printer className="w-4 h-4 text-emerald-400" /> Sales Report & Invoice Engine</h3>
        <select value={salesman} onChange={(e) => setSalesman(e.target.value)} className="bg-slate-950 border border-slate-700 p-1 rounded text-slate-200 text-xs">
          <option value="All">All Salesmen</option>
          <option value="Rajesh Kumar">Rajesh Kumar</option>
          <option value="Anita Desai">Anita Desai</option>
        </select>
      </div>
      <div className="bg-slate-950 p-2 rounded border border-slate-800 space-y-1 font-mono text-[11px]">
        {filtered.map(r => (
          <div key={r.inv} className="flex justify-between py-1 text-slate-300 border-b border-slate-900">
            <span>{r.inv} • {r.rep} ({r.client})</span>
            <span className="text-emerald-400 font-bold">₹{r.amt.toLocaleString()}</span>
          </div>
        ))}
      </div>
      <div className="p-2 bg-blue-950/40 rounded border border-blue-900 text-blue-200 font-mono">
        Total Revenue: <strong>₹{total.toLocaleString()}</strong> | Commission (5%): <strong>₹{(total * 0.05).toLocaleString()}</strong>
      </div>
    </div>
  );
}
