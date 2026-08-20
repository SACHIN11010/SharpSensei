export const generalVivaQuestions = [
  {
    category: '.NET Architecture',
    question: 'What is the CLR (Common Language Runtime) and what are its key components?',
    shortAnswer: 'CLR is the execution engine of .NET that handles memory management, garbage collection, thread management, and security.',
    detailedAnswer: 'CLR converts MSIL (Intermediate Language) into native machine code using the JIT (Just-In-Time) compiler. Its core subsystems are the Garbage Collector (GC), Class Loader, Type Checker, JIT Compiler, and Exception Engine.'
  },
  {
    category: '.NET Architecture',
    question: 'What is MSIL and what role does the JIT compiler play?',
    shortAnswer: 'MSIL is CPU-independent intermediate bytecode; JIT translates MSIL into machine-specific instructions at runtime.',
    detailedAnswer: 'When you compile C# code, Roslyn generates MSIL and metadata stored inside a PE (Portable Executable) file (.exe/.dll). The JIT compiler compiles MSIL on demand before execution.'
  },
  {
    category: 'C# OOP',
    question: 'What is the difference between Value Types and Reference Types in C#?',
    shortAnswer: 'Value types store data directly in stack memory; Reference types store memory references on the stack pointing to objects on the heap.',
    detailedAnswer: 'Value types include struct, int, double, bool, enum. Reference types include class, string, array, delegate, interface. Assignment of a value type copies the value; assignment of a reference type copies the pointer.'
  },
  {
    category: 'WinForms & Events',
    question: 'Explain the Event-Driven Programming Model in Windows Forms.',
    shortAnswer: 'The application sits in an event loop (Application.Run), waiting for user or OS events (Click, KeyDown, Paint), which trigger delegate handlers.',
    detailedAnswer: 'The Windows message pump receives OS messages (e.g. WM_LBUTTONDOWN) and dispatches them to the corresponding control, which raises .NET events (e.g. Button.Click).'
  },
  {
    category: 'WinForms & Events',
    question: 'What is the purpose of the Dispose() method in Windows Forms?',
    shortAnswer: 'To immediately release unmanaged resources (GDI+ brushes, pens, database connections, window handles).',
    detailedAnswer: 'Garbage Collection only manages managed heap memory. Controls and GDI+ objects implement IDisposable to manually release native OS handles without waiting for GC.'
  },
  {
    category: 'ADO.NET',
    question: 'Differentiate between Connected and Disconnected Architecture in ADO.NET.',
    shortAnswer: 'Connected relies on continuous open connection with SqlDataReader; Disconnected uses SqlDataAdapter to fetch data into memory (DataSet/DataTable).',
    detailedAnswer: 'Connected architecture is ideal for fast, read-only sequential queries. Disconnected architecture allows client applications to modify, sort, and cache data locally offline before synchronizing changes back to the database.'
  },
  {
    category: 'ADO.NET',
    question: 'What is the difference between DataSet and DataTable in ADO.NET?',
    shortAnswer: 'DataTable represents a single in-memory table with rows and columns; DataSet is an in-memory cache of multiple DataTables and DataRelations.',
    detailedAnswer: 'A DataSet can represent an entire mini relational database schema in memory, including foreign key constraints and tables.'
  },
  {
    category: 'GDI+',
    question: 'What is Double Buffering in Windows Forms and why is it used?',
    shortAnswer: 'It renders graphics onto an off-screen memory buffer before drawing onto the screen to eliminate visual screen flickering.',
    detailedAnswer: 'Setting this.DoubleBuffered = true allocates an off-screen bitmap, drawing shapes there first and blitting the finished frame in a single instantaneous paint operation.'
  }
];

export const mockQuizQuestions = [
  {
    id: 1,
    question: 'Which keyword in C# is used to indicate that a method in a derived class overrides a base class method?',
    options: ['virtual', 'override', 'new', 'abstract'],
    correctIndex: 1,
    explanation: 'The `override` keyword is required in the derived class to extend or modify the virtual/abstract implementation of an inherited method.',
    practicalRef: 6,
    module: 'Module 1: C# OOP & Basics'
  },
  {
    id: 2,
    question: 'Which ADO.NET method is optimal for executing an INSERT, UPDATE, or DELETE SQL statement?',
    options: ['cmd.ExecuteReader()', 'cmd.ExecuteScalar()', 'cmd.ExecuteNonQuery()', 'cmd.ExecuteXmlReader()'],
    correctIndex: 2,
    explanation: '`ExecuteNonQuery()` executes DML statements and returns the number of rows affected by the command.',
    practicalRef: 33,
    module: 'Module 4: ADO.NET & Database'
  },
  {
    id: 3,
    question: 'Which Windows Forms control is best suited for selecting a mutually exclusive single option from a small group?',
    options: ['CheckBox', 'RadioButton', 'CheckedListBox', 'ListBox'],
    correctIndex: 1,
    explanation: 'RadioButtons automatically enforce mutual exclusivity when placed inside the same container (like a GroupBox or Form).',
    practicalRef: 14,
    module: 'Module 2: Windows Forms Controls'
  },
  {
    id: 4,
    question: 'What is the return value of string.IndexOf("target") if the substring is not found?',
    options: ['0', 'null', '-1', 'false'],
    correctIndex: 2,
    explanation: 'String.IndexOf returns -1 as a sentinel value whenever the requested character or substring does not exist.',
    practicalRef: 3,
    module: 'Module 1: C# OOP & Basics'
  },
  {
    id: 5,
    question: 'Which class in ADO.NET is used to bridge a disconnected DataSet with a SQL Server database for filling and updating data?',
    options: ['SqlDataReader', 'SqlDataAdapter', 'SqlCommandBuilder', 'SqlConnection'],
    correctIndex: 1,
    explanation: '`SqlDataAdapter` acts as a bi-directional bridge, using its SelectCommand to fill DataSets and its Insert/Update/Delete commands to commit changes.',
    practicalRef: 33,
    module: 'Module 4: ADO.NET & Database'
  },
  {
    id: 6,
    question: 'Which GDI+ method forces a Windows Form or custom control to redraw its surface by scheduling a Paint event?',
    options: ['this.Refresh()', 'this.Invalidate()', 'this.Update()', 'this.Repaint()'],
    correctIndex: 1,
    explanation: '`this.Invalidate()` adds the specified client area to the form\'s update region, which is processed during the next WM_PAINT message cycle.',
    practicalRef: 24,
    module: 'Module 3: Advanced Controls & GDI+'
  },
  {
    id: 7,
    question: 'In C#, what operator is used to attach a method to a multicast delegate?',
    options: ['=', '+=', '&', '->'],
    correctIndex: 1,
    explanation: 'The `+=` operator adds a method to the delegate invocation list, while `-=` removes a subscriber.',
    practicalRef: 9,
    module: 'Module 1: C# OOP & Basics'
  },
  {
    id: 8,
    question: 'Which property in Windows Forms sets the text mask character for password input in a TextBox?',
    options: ['MaskText', 'PasswordChar', 'SecretChar', 'HideText'],
    correctIndex: 1,
    explanation: '`PasswordChar` specifies the character (such as \'•\' or \'*\') displayed in place of actual typed keystrokes.',
    practicalRef: 13,
    module: 'Module 2: Windows Forms Controls'
  },
  {
    id: 9,
    question: 'What is the default value of the Interval property on a WinForms Timer if left unspecified?',
    options: ['100 ms', '500 ms', '1000 ms', '100 ms (or custom)'],
    correctIndex: 0,
    explanation: 'The default interval is 100 milliseconds. An interval of 1000 ms equals 1 second.',
    practicalRef: 28,
    module: 'Module 3: Advanced Controls & GDI+'
  },
  {
    id: 10,
    question: 'What is the role of DataView.RowFilter in ADO.NET?',
    options: ['Deletes rows permanently from database', 'Filters rows in memory in the DataView without altering underlying data', 'Sorts columns alphabetically', 'Exports data to XML'],
    correctIndex: 1,
    explanation: '`DataView.RowFilter` applies SQL WHERE-style criteria to filter rows in memory instantly for DataGridView binding.',
    practicalRef: 35,
    module: 'Module 4: ADO.NET & Database'
  }
];
