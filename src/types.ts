export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export type ModuleCategory = 
  | 'Module 1: C# OOP & Basics'
  | 'Module 2: Windows Forms Controls'
  | 'Module 3: Advanced Controls & GDI+'
  | 'Module 4: ADO.NET & Database';

export interface TraceStep {
  line: number;
  explanation: string;
  variables: Record<string, string | number | boolean>;
  callStack?: string;
  outputLog?: string;
}

export interface VisualStudioStep {
  stepNumber: number;
  title: string;
  description: string;
  controlsNeeded?: string[];
  propertiesConfig?: { control: string; property: string; value: string }[];
  eventHandler?: string;
  tip?: string;
}

export interface VivaQuestion {
  question: string;
  shortAnswer: string;
  detailedAnswer: string;
  category?: string;
}

export interface Practical {
  id: number;
  title: string;
  aim: string;
  module: ModuleCategory;
  difficulty: Difficulty;
  estimatedMinutes: number;
  tags: string[];
  algorithm: string[];
  code: string;
  codeExplanation: string;
  traceSteps: TraceStep[];
  simulatedOutput: string[];
  vsSteps: VisualStudioStep[];
  vivaQuestions: VivaQuestion[];
  emulatorType: 
    | 'console-io' 
    | 'number-words' 
    | 'substring-count' 
    | 'oop-person'
    | 'method-overload'
    | 'animal-poly'
    | 'string-manip'
    | 'exception-demo'
    | 'multicast-delegate'
    | 'jagged-array'
    | 'registration-form'
    | 'textbox-align'
    | 'login-form'
    | 'groupbox-theme'
    | 'combobox-cascading'
    | 'grid-calculator'
    | 'checkbox-hobbies'
    | 'oddeven-listbox'
    | 'palindrome-analyzer'
    | 'todo-list'
    | 'radio-questionnaire'
    | 'datetime-picker'
    | 'calendar-diff'
    | 'gdi-shape-drawing'
    | 'colordialog-fontdialog'
    | 'imagelist-tabcontrol'
    | 'trackbar-progressbar'
    | 'stopwatch-timer'
    | 'treeview-listview'
    | 'context-menu'
    | 'mdi-viewer'
    | 'richtextbox-editor'
    | 'adonet-sql-emp'
    | 'msaccess-crud'
    | 'datagrid-search'
    | 'db-auth-session'
    | 'crystal-report'
    | 'parameterized-report';
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  practicalRef?: number;
  module: string;
}

export interface CheatsheetItem {
  category: string;
  title: string;
  syntax: string;
  description: string;
  example: string;
}
