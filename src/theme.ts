export type ThemeId = 
  | 'cyan-dark' 
  | 'vs-purple' 
  | 'tokyo-night'
  | 'github-dark'
  | 'monokai-pro'
  | 'dracula-noir'
  | 'emerald-matrix' 
  | 'solarized-dark'
  | 'amber-gold' 
  | 'clean-light'
  | 'nord-light';

export type LayoutMode = 
  | 'classic' 
  | 'dual-pane' 
  | 'debugger-pro'
  | 'viva-master'
  | 'zen-focus' 
  | 'syllabus-board';

export interface LayoutOption {
  id: LayoutMode;
  name: string;
  tagline: string;
  description: string;
  badge: string;
}

export const layoutOptions: LayoutOption[] = [
  {
    id: 'classic',
    name: 'Visual Studio Classic',
    tagline: 'Standard 3-Tier IDE',
    description: 'Left practical explorer + top telemetry ribbon + multi-tab stage (Emulator, Code, Dry-Run, Viva).',
    badge: 'DEFAULT'
  },
  {
    id: 'dual-pane',
    name: 'Dual-Pane Live Studio',
    tagline: 'Side-by-Side Split Stage',
    description: 'Simultaneously view the live interactive WinForms GUI alongside the complete C# source code.',
    badge: 'POPULAR'
  },
  {
    id: 'debugger-pro',
    name: 'VS Debugger Pro',
    tagline: '3-Column Docked Studio',
    description: 'Triple docked panes: Navigator + Live WinForms Canvas + Realtime Memory Registers & Stack Watch.',
    badge: 'ADVANCED'
  },
  {
    id: 'viva-master',
    name: 'Viva Exam Master',
    tagline: 'Exam Prep Dual View',
    description: 'Source code & algorithm on left + comprehensive Viva Voce question bank with answer reveals on right.',
    badge: 'STUDY'
  },
  {
    id: 'zen-focus',
    name: 'Zen Focus / Fullscreen',
    tagline: 'Maximized Code & Emulator',
    description: 'Slim collapsed icon sidebar with expanded canvas width for uninterrupted programming.',
    badge: 'PRODUCTIVE'
  },
  {
    id: 'syllabus-board',
    name: 'Syllabus Matrix Board',
    tagline: 'Visual Module Dashboard',
    description: '38-practical overview matrix grouped by BCA Sem-5 modules with quick launch & progress stats.',
    badge: 'OVERVIEW'
  }
];

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  category: 'dark' | 'light';
  description: string;
  previewColor: string;
  previewSecondary: string;
  
  // Layout class mappings
  appBg: string;
  headerBg: string;
  sidebarBg: string;
  cardBg: string;
  cardSubBg: string;
  borderColor: string;
  textColor: string;
  textMuted: string;
  textHeading: string;
  
  // Accent colors
  accentBg: string;
  accentBgHover: string;
  accentText: string;
  accentTextColor: string;
  accentBorder: string;
  accentBadgeBg: string;
  
  // Highlight / Ribbon
  ribbonBg: string;
  tabActiveBg: string;
  tabActiveText?: string;
  terminalBg: string;
}

export const themes: Record<ThemeId, ThemeConfig> = {
  'cyan-dark': {
    id: 'cyan-dark',
    name: 'Nordic Cyber (Cyan)',
    category: 'dark',
    description: 'Mission-critical dark blue-black with electric cyan telemetry and razor-sharp contrast',
    previewColor: '#06B6D4',
    previewSecondary: '#0A0C10',
    appBg: 'bg-[#0A0C10]',
    headerBg: 'bg-[#0F172A]',
    sidebarBg: 'bg-[#0B0F17]',
    cardBg: 'bg-[#0A0C10]',
    cardSubBg: 'bg-[#0F172A]',
    borderColor: 'border-[#1E293B]',
    textColor: 'text-slate-400',
    textMuted: 'text-slate-500',
    textHeading: 'text-white',
    accentBg: 'bg-cyan-500',
    accentBgHover: 'hover:bg-cyan-400',
    accentText: 'text-cyan-400',
    accentTextColor: 'text-black',
    accentBorder: 'border-cyan-500/40',
    accentBadgeBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    ribbonBg: 'bg-[#0F172A]/50',
    tabActiveBg: 'bg-cyan-500 text-black font-black',
    terminalBg: 'bg-black text-emerald-400'
  },
  'vs-purple': {
    id: 'vs-purple',
    name: 'Visual Studio Pro (Violet)',
    category: 'dark',
    description: 'Classic Microsoft Visual Studio dark theme with rich violet accents and refined IDE zinc neutrals',
    previewColor: '#8B5CF6',
    previewSecondary: '#18181B',
    appBg: 'bg-[#121215]',
    headerBg: 'bg-[#1E1E24]',
    sidebarBg: 'bg-[#18181D]',
    cardBg: 'bg-[#141418]',
    cardSubBg: 'bg-[#1E1E24]',
    borderColor: 'border-[#2D2D38]',
    textColor: 'text-zinc-400',
    textMuted: 'text-zinc-500',
    textHeading: 'text-zinc-100',
    accentBg: 'bg-violet-600',
    accentBgHover: 'hover:bg-violet-500',
    accentText: 'text-violet-400',
    accentTextColor: 'text-white',
    accentBorder: 'border-violet-500/40',
    accentBadgeBg: 'bg-violet-500/10 text-violet-300 border-violet-500/30',
    ribbonBg: 'bg-[#1E1E24]/60',
    tabActiveBg: 'bg-violet-600 text-white font-black',
    terminalBg: 'bg-[#09090B] text-violet-300'
  },
  'tokyo-night': {
    id: 'tokyo-night',
    name: 'Tokyo Night Storm (Cobalt)',
    category: 'dark',
    description: 'Midnight indigo blue with luminescent ice-blue and neon cyan tokens favored by developers',
    previewColor: '#7AA2F7',
    previewSecondary: '#1A1B26',
    appBg: 'bg-[#16161E]',
    headerBg: 'bg-[#1F2335]',
    sidebarBg: 'bg-[#1A1B26]',
    cardBg: 'bg-[#1A1B26]',
    cardSubBg: 'bg-[#24283B]',
    borderColor: 'border-[#2F3549]',
    textColor: 'text-[#A9B1D6]',
    textMuted: 'text-[#565F89]',
    textHeading: 'text-[#C0CAF5]',
    accentBg: 'bg-[#7AA2F7]',
    accentBgHover: 'hover:bg-[#89B4FA]',
    accentText: 'text-[#7AA2F7]',
    accentTextColor: 'text-[#1A1B26]',
    accentBorder: 'border-[#7AA2F7]/40',
    accentBadgeBg: 'bg-[#7AA2F7]/10 text-[#7AA2F7] border-[#7AA2F7]/30',
    ribbonBg: 'bg-[#1F2335]/70',
    tabActiveBg: 'bg-[#7AA2F7] text-[#1A1B26] font-black',
    terminalBg: 'bg-[#13141C] text-[#73DACA]'
  },
  'github-dark': {
    id: 'github-dark',
    name: 'GitHub Enterprise (Sky)',
    category: 'dark',
    description: 'Official GitHub Primer dark system with crisp slate canvas and vibrant sky-blue accents',
    previewColor: '#38BDF8',
    previewSecondary: '#0D1117',
    appBg: 'bg-[#0D1117]',
    headerBg: 'bg-[#161B22]',
    sidebarBg: 'bg-[#0F141C]',
    cardBg: 'bg-[#0D1117]',
    cardSubBg: 'bg-[#161B22]',
    borderColor: 'border-[#30363D]',
    textColor: 'text-[#8B949E]',
    textMuted: 'text-[#6E7681]',
    textHeading: 'text-[#F0F6FC]',
    accentBg: 'bg-[#38BDF8]',
    accentBgHover: 'hover:bg-[#0EA5E9]',
    accentText: 'text-[#38BDF8]',
    accentTextColor: 'text-black',
    accentBorder: 'border-[#38BDF8]/40',
    accentBadgeBg: 'bg-[#38BDF8]/10 text-[#38BDF8] border-[#38BDF8]/30',
    ribbonBg: 'bg-[#161B22]/70',
    tabActiveBg: 'bg-[#38BDF8] text-black font-black',
    terminalBg: 'bg-[#010409] text-[#7EE787]'
  },
  'monokai-pro': {
    id: 'monokai-pro',
    name: 'Monokai Pro (Tangerine)',
    category: 'dark',
    description: 'Renowned code studio theme with warm charcoal backgrounds, golden amber, and tangerine accents',
    previewColor: '#FC9867',
    previewSecondary: '#221F22',
    appBg: 'bg-[#19181A]',
    headerBg: 'bg-[#2D2A2E]',
    sidebarBg: 'bg-[#221F22]',
    cardBg: 'bg-[#19181A]',
    cardSubBg: 'bg-[#2D2A2E]',
    borderColor: 'border-[#403E41]',
    textColor: 'text-[#C1C0C0]',
    textMuted: 'text-[#727072]',
    textHeading: 'text-[#FFD866]',
    accentBg: 'bg-[#FC9867]',
    accentBgHover: 'hover:bg-[#FF6188]',
    accentText: 'text-[#FC9867]',
    accentTextColor: 'text-black',
    accentBorder: 'border-[#FC9867]/40',
    accentBadgeBg: 'bg-[#FC9867]/10 text-[#FC9867] border-[#FC9867]/30',
    ribbonBg: 'bg-[#2D2A2E]/70',
    tabActiveBg: 'bg-[#FC9867] text-black font-black',
    terminalBg: 'bg-[#121113] text-[#A9DC76]'
  },
  'dracula-noir': {
    id: 'dracula-noir',
    name: 'Dracula Enterprise (Rose)',
    category: 'dark',
    description: 'Dark gothic slate with neon orchid pink and electric purple high-contrast accents',
    previewColor: '#FF79C6',
    previewSecondary: '#282A36',
    appBg: 'bg-[#1E1F29]',
    headerBg: 'bg-[#282A36]',
    sidebarBg: 'bg-[#21222C]',
    cardBg: 'bg-[#1E1F29]',
    cardSubBg: 'bg-[#282A36]',
    borderColor: 'border-[#44475A]',
    textColor: 'text-[#BD93F9]',
    textMuted: 'text-[#6272A4]',
    textHeading: 'text-[#F8F8F2]',
    accentBg: 'bg-[#FF79C6]',
    accentBgHover: 'hover:bg-[#BD93F9]',
    accentText: 'text-[#FF79C6]',
    accentTextColor: 'text-black',
    accentBorder: 'border-[#FF79C6]/40',
    accentBadgeBg: 'bg-[#FF79C6]/10 text-[#FF79C6] border-[#FF79C6]/30',
    ribbonBg: 'bg-[#282A36]/70',
    tabActiveBg: 'bg-[#FF79C6] text-black font-black',
    terminalBg: 'bg-[#191A21] text-[#50FA7B]'
  },
  'emerald-matrix': {
    id: 'emerald-matrix',
    name: 'Matrix Obsidian (Emerald)',
    category: 'dark',
    description: 'Deep black stealth console with crisp emerald green accents for hacker ergonomics',
    previewColor: '#10B981',
    previewSecondary: '#050B08',
    appBg: 'bg-[#030705]',
    headerBg: 'bg-[#06150D]',
    sidebarBg: 'bg-[#040C07]',
    cardBg: 'bg-[#040D08]',
    cardSubBg: 'bg-[#081B11]',
    borderColor: 'border-[#133020]',
    textColor: 'text-emerald-300/70',
    textMuted: 'text-emerald-600',
    textHeading: 'text-emerald-100',
    accentBg: 'bg-emerald-500',
    accentBgHover: 'hover:bg-emerald-400',
    accentText: 'text-emerald-400',
    accentTextColor: 'text-black',
    accentBorder: 'border-emerald-500/40',
    accentBadgeBg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    ribbonBg: 'bg-[#06150D]/60',
    tabActiveBg: 'bg-emerald-500 text-black font-black',
    terminalBg: 'bg-black text-emerald-400'
  },
  'solarized-dark': {
    id: 'solarized-dark',
    name: 'Solarized Precision (Teal)',
    category: 'dark',
    description: 'Scientifically engineered palette reducing eye strain during long code review sessions',
    previewColor: '#2AA198',
    previewSecondary: '#073642',
    appBg: 'bg-[#002B36]',
    headerBg: 'bg-[#073642]',
    sidebarBg: 'bg-[#00212B]',
    cardBg: 'bg-[#002B36]',
    cardSubBg: 'bg-[#073642]',
    borderColor: 'border-[#0D4B5C]',
    textColor: 'text-[#93A1A1]',
    textMuted: 'text-[#586E75]',
    textHeading: 'text-[#EEE8D5]',
    accentBg: 'bg-[#2AA198]',
    accentBgHover: 'hover:bg-[#268BD2]',
    accentText: 'text-[#2AA198]',
    accentTextColor: 'text-[#002B36]',
    accentBorder: 'border-[#2AA198]/40',
    accentBadgeBg: 'bg-[#2AA198]/10 text-[#2AA198] border-[#2AA198]/30',
    ribbonBg: 'bg-[#073642]/70',
    tabActiveBg: 'bg-[#2AA198] text-[#002B36] font-black',
    terminalBg: 'bg-[#001E26] text-[#859900]'
  },
  'amber-gold': {
    id: 'amber-gold',
    name: 'Industrial Foundry (Amber)',
    category: 'dark',
    description: 'Warm dark bronze-slate palette with vivid amber and gold indicators',
    previewColor: '#F59E0B',
    previewSecondary: '#14110E',
    appBg: 'bg-[#0F0D0B]',
    headerBg: 'bg-[#1C1713]',
    sidebarBg: 'bg-[#14110E]',
    cardBg: 'bg-[#120F0C]',
    cardSubBg: 'bg-[#1F1914]',
    borderColor: 'border-[#33261D]',
    textColor: 'text-stone-400',
    textMuted: 'text-stone-500',
    textHeading: 'text-amber-100',
    accentBg: 'bg-amber-500',
    accentBgHover: 'hover:bg-amber-400',
    accentText: 'text-amber-400',
    accentTextColor: 'text-black',
    accentBorder: 'border-amber-500/40',
    accentBadgeBg: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
    ribbonBg: 'bg-[#1C1713]/60',
    tabActiveBg: 'bg-amber-500 text-black font-black',
    terminalBg: 'bg-[#0A0806] text-amber-300'
  },
  'clean-light': {
    id: 'clean-light',
    name: 'Academic Daylight (Royal Blue)',
    category: 'light',
    description: 'Crisp high-contrast daylight layout with royal blue accents for print & study',
    previewColor: '#2563EB',
    previewSecondary: '#FFFFFF',
    appBg: 'bg-[#F8FAFC]',
    headerBg: 'bg-[#FFFFFF]',
    sidebarBg: 'bg-[#F1F5F9]',
    cardBg: 'bg-[#FFFFFF]',
    cardSubBg: 'bg-[#F8FAFC]',
    borderColor: 'border-[#E2E8F0]',
    textColor: 'text-slate-600',
    textMuted: 'text-slate-400',
    textHeading: 'text-slate-900',
    accentBg: 'bg-blue-600',
    accentBgHover: 'hover:bg-blue-500',
    accentText: 'text-blue-600',
    accentTextColor: 'text-white',
    accentBorder: 'border-blue-500/40',
    accentBadgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
    ribbonBg: 'bg-slate-100/80',
    tabActiveBg: 'bg-blue-600 text-white font-black',
    terminalBg: 'bg-slate-900 text-emerald-400'
  },
  'nord-light': {
    id: 'nord-light',
    name: 'Nordic Frost (Ice Teal Light)',
    category: 'light',
    description: 'Minimalist Scandinavian light theme with clean polar white and arctic ice teal accents',
    previewColor: '#0D9488',
    previewSecondary: '#ECEFF4',
    appBg: 'bg-[#ECEFF4]',
    headerBg: 'bg-[#E5E9F0]',
    sidebarBg: 'bg-[#D8DEE9]',
    cardBg: 'bg-[#ECEFF4]',
    cardSubBg: 'bg-[#E5E9F0]',
    borderColor: 'border-[#CBD5E1]',
    textColor: 'text-[#4C566A]',
    textMuted: 'text-[#94A3B8]',
    textHeading: 'text-[#2E3440]',
    accentBg: 'bg-[#0D9488]',
    accentBgHover: 'hover:bg-[#0F766E]',
    accentText: 'text-[#0D9488]',
    accentTextColor: 'text-white',
    accentBorder: 'border-[#0D9488]/40',
    accentBadgeBg: 'bg-teal-50 text-teal-800 border-teal-200',
    ribbonBg: 'bg-[#E5E9F0]/80',
    tabActiveBg: 'bg-[#0D9488] text-white font-black',
    terminalBg: 'bg-[#2E3440] text-[#88C0D0]'
  }
};
