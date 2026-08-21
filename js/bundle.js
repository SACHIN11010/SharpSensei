(function () {
  'use strict';

  // ==========================================
  // MODULE: cheatsheetData.js
  // ==========================================
const cheatsheetItems = [
  {
    category: 'Visual Studio & WinForms',
    title: 'Toolbox & Controls Cheatsheet',
    syntax: 'Toolbox -> Drag Control -> Set Properties -> Wire Events in Events Tab (Lightning Icon âš¡)',
    description: 'Crucial properties and event mappings for Windows Forms UI development.',
    example: `// Button Click
private void btnSubmit_Click(object sender, EventArgs e) { ... }

// TextBox TextChanged
private void txtSearch_TextChanged(object sender, EventArgs e) { ... }

// ComboBox Selection
private void cmbCourse_SelectedIndexChanged(object sender, EventArgs e) { ... }

// Form Load Lifecycle
private void Form1_Load(object sender, EventArgs e) { ... }`
  },
  {
    category: 'ADO.NET SQL Server',
    title: 'Connected vs Disconnected Quick Syntax',
    syntax: 'using System.Data.SqlClient; and using System.Data;',
    description: 'Standard boilerplate patterns for database querying in BCA practicals.',
    example: `// 1. Parameterized DML (Insert / Update / Delete)
using (SqlConnection con = new SqlConnection(connStr)) {
    string sql = "INSERT INTO EMP (EmpId, Name) VALUES (@id, @name)";
    using (SqlCommand cmd = new SqlCommand(sql, con)) {
        cmd.Parameters.AddWithValue("@id", 101);
        cmd.Parameters.AddWithValue("@name", "Ravi");
        con.Open();
        int rows = cmd.ExecuteNonQuery();
    }
}

// 2. Disconnected DataAdapter Fill into DataGridView
using (SqlConnection con = new SqlConnection(connStr)) {
    SqlDataAdapter da = new SqlDataAdapter("SELECT * FROM EMP", con);
    DataTable dt = new DataTable();
    da.Fill(dt);
    dgv.DataSource = dt;
}`
  },
  {
    category: 'WinForms Dialogs',
    title: 'Standard Common Dialogs Pattern',
    syntax: 'using (XDialog dlg = new XDialog()) { if (dlg.ShowDialog() == DialogResult.OK) { ... } }',
    description: 'Safe usage of ColorDialog, FontDialog, OpenFileDialog, and SaveFileDialog.',
    example: `// Open File Dialog
using (OpenFileDialog ofd = new OpenFileDialog()) {
    ofd.Filter = "Image Files|*.jpg;*.png;*.bmp|All Files|*.*";
    if (ofd.ShowDialog() == DialogResult.OK) {
        picBox.Image = Image.FromFile(ofd.FileName);
    }
}

// MessageBox Alert
DialogResult res = MessageBox.Show("Delete this record?", "Confirm", MessageBoxButtons.YesNo, MessageBoxIcon.Question);
if (res == DialogResult.Yes) { ... }`
  },
  {
    category: 'C# Language & OOP',
    title: 'Polymorphism & Virtual/Override Pattern',
    syntax: 'Base: public virtual void Method() -> Derived: public override void Method()',
    description: 'Late binding and runtime polymorphic method dispatch in C#.',
    example: `abstract class Shape {
    public abstract double Area();
}

class Circle : Shape {
    public double Radius { get; set; }
    public override double Area() => Math.PI * Radius * Radius;
}`
  }
];


  // ==========================================
  // MODULE: vivaData.js
  // ==========================================
const generalVivaQuestions = [
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

const mockQuizQuestions = [
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
    explanation: '`PasswordChar` specifies the character (such as \'â€¢\' or \'*\') displayed in place of actual typed keystrokes.',
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


  // ==========================================
  // MODULE: practicalsPart1.js
  // ==========================================
const practicalsPart1 = [
  {
    id: 1,
    title: 'Console App: Name, Age, City Formatter',
    aim: 'To write a C# console application that reads user name, age, and city from the console and displays formatted output using string interpolation.',
    module: 'Module 1: C# OOP & Basics',
    difficulty: 'Beginner',
    estimatedMinutes: 10,
    tags: ['Console I/O', 'Variables', 'String Interpolation', 'Type Casting'],
    algorithm: [
      'Start the program in class Program with static void Main().',
      'Display a prompt asking the user for their name using Console.Write().',
      'Read string input into variable `name` using Console.ReadLine().',
      'Prompt for age, read input, and convert it to an integer using int.Parse() or Convert.ToInt32().',
      'Prompt for city, read string input into `city`.',
      'Format and display the complete profile using string interpolation $\"...\" or String.Format().',
      'Prevent immediate window closing with Console.ReadKey() and terminate.'
    ],
    code: `using System;

namespace BCA_CSharp_Lab
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.Title = "Practical 1 - Console I/O";
            Console.WriteLine("========================================");
            Console.WriteLine("  BCA SEM 5 - USER INFORMATION PROGRAM");
            Console.WriteLine("========================================");

            // Reading Name
            Console.Write("Enter Student Name : ");
            string name = Console.ReadLine();

            // Reading Age with parsing
            Console.Write("Enter Age          : ");
            int age = int.Parse(Console.ReadLine());

            // Reading City
            Console.Write("Enter City         : ");
            string city = Console.ReadLine();

            // Calculating Year of Birth
            int birthYear = DateTime.Now.Year - age;

            // Formatted Output
            Console.WriteLine("\\n---------------- RESULT ----------------");
            Console.WriteLine($"Welcome, {name.ToUpper()}!");
            Console.WriteLine($"You are {age} years old (Approx. Born: {birthYear}).");
            Console.WriteLine($"Location: {city}, India.");
            Console.WriteLine("----------------------------------------");

            Console.WriteLine("\\nPress any key to exit...");
            Console.ReadKey();
        }
    }
}`,
    codeExplanation: 'Demonstrates basic C# Console input and output streams. Console.ReadLine() returns a string which is converted using int.Parse(). String interpolation with the $ prefix simplifies string formatting.',
    traceSteps: [
      { line: 7, explanation: 'Execution begins in static void Main(). Set console window title.', variables: { title: '"Practical 1 - Console I/O"' }, callStack: 'Program.Main()' },
      { line: 13, explanation: 'Prompt user for student name.', variables: { name: 'null', age: 0, city: 'null' }, callStack: 'Program.Main()' },
      { line: 14, explanation: 'Console.ReadLine() reads "Aarav Sharma" into string variable `name`.', variables: { name: '"Aarav Sharma"', age: 0, city: 'null' }, callStack: 'Program.Main()' },
      { line: 17, explanation: 'Console.ReadLine() reads "21", int.Parse() converts it to 32-bit integer 21.', variables: { name: '"Aarav Sharma"', age: 21, city: 'null' }, callStack: 'Program.Main()' },
      { line: 21, explanation: 'Console.ReadLine() reads "Bengaluru" into variable `city`.', variables: { name: '"Aarav Sharma"', age: 21, city: '"Bengaluru"' }, callStack: 'Program.Main()' },
      { line: 24, explanation: 'Calculate birthYear = currentYear - age = 2026 - 21 = 2005.', variables: { name: '"Aarav Sharma"', age: 21, city: '"Bengaluru"', birthYear: 2005 }, callStack: 'Program.Main()' },
      { line: 27, explanation: 'Display formatted output card with interpolated variables.', variables: { status: '"Output Rendered"' }, outputLog: 'Welcome, AARAV SHARMA! You are 21 years old (Approx. Born: 2005).' }
    ],
    simulatedOutput: [
      '========================================',
      '  BCA SEM 5 - USER INFORMATION PROGRAM',
      '========================================',
      'Enter Student Name : Aarav Sharma',
      'Enter Age          : 21',
      'Enter City         : Bengaluru',
      '',
      '---------------- RESULT ----------------',
      'Welcome, AARAV SHARMA!',
      'You are 21 years old (Approx. Born: 2005).',
      'Location: Bengaluru, India.',
      '----------------------------------------',
      'Press any key to exit...'
    ],
    vsSteps: [
      { stepNumber: 1, title: 'Create Console Project', description: 'Open Visual Studio 2022 -> Click "Create a new project" -> Select "Console App (.NET Framework)" or ".NET 8.0" -> Set Project name to "Prac01_ConsoleIO".' },
      { stepNumber: 2, title: 'Open Program.cs', description: 'Double click Program.cs in Solution Explorer. Replace standard template code with the practical solution.' },
      { stepNumber: 3, title: 'Build and Run', description: 'Press Ctrl + F5 (Start Without Debugging) or F5 to compile and run the console window.' }
    ],
    vivaQuestions: [
      { question: 'What is the difference between Console.Write() and Console.WriteLine()?', shortAnswer: 'Console.Write outputs text without a newline, while Console.WriteLine appends a line terminator (\\r\\n).', detailedAnswer: 'Console.Write() leaves the cursor on the same line, which is ideal for input prompts. Console.WriteLine() moves the cursor to the beginning of the next line.' },
      { question: 'What happens if a user inputs non-numeric characters into int.Parse()?', shortAnswer: 'It throws a System.FormatException at runtime.', detailedAnswer: 'To handle invalid numbers safely without throwing exceptions, developers should use int.TryParse(input, out int result), which returns a boolean indicating success.' }
    ],
    emulatorType: 'console-io'
  },
  {
    id: 2,
    title: 'Number to Words Converter (1 to 9999)',
    aim: 'To develop a C# program to convert any integer between 1 and 9999 into its equivalent English word representation.',
    module: 'Module 1: C# OOP & Basics',
    difficulty: 'Intermediate',
    estimatedMinutes: 15,
    tags: ['Arrays', 'Modulo Arithmetic', 'Recursion/Loops', 'String Processing'],
    algorithm: [
      'Define lookup arrays for units (Zero to Nineteen) and tens (Twenty, Thirty... Ninety).',
      'Read integer number N from user.',
      'If N is 0, return "Zero".',
      'If N >= 1000, compute thousands part (N / 1000) + " Thousand " and update N %= 1000.',
      'If N >= 100, compute hundreds part (N / 100) + " Hundred " and update N %= 100.',
      'If N >= 20, compute tens part and append units (N % 10).',
      'If 0 < N < 20, map directly from units array.',
      'Display the concatenated English sentence.'
    ],
    code: `using System;

class NumberToWordsConverter
{
    private static string[] units = { "Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
                                      "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen" };
    private static string[] tens = { "", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety" };

    public static string ConvertToWords(int number)
    {
        if (number == 0) return "Zero";
        if (number < 0) return "Minus " + ConvertToWords(Math.Abs(number));

        string words = "";

        if ((number / 1000) > 0)
        {
            words += ConvertToWords(number / 1000) + " Thousand ";
            number %= 1000;
        }

        if ((number / 100) > 0)
        {
            words += ConvertToWords(number / 100) + " Hundred ";
            number %= 100;
        }

        if (number > 0)
        {
            if (words != "") words += "and ";

            if (number < 20)
                words += units[number];
            else
            {
                words += tens[number / 10];
                if ((number % 10) > 0)
                    words += "-" + units[number % 10];
            }
        }

        return words.Trim();
    }

    static void Main()
    {
        Console.Write("Enter any number (0 - 9999): ");
        int num = int.Parse(Console.ReadLine());
        Console.WriteLine($"In Words: {ConvertToWords(num)}");
        Console.ReadKey();
    }
}`,
    codeExplanation: 'Uses recursive decomposition and string arrays. Handles thousands, hundreds, tens, and teens correctly with proper grammatical joining.',
    traceSteps: [
      { line: 11, explanation: 'Invoke ConvertToWords(4528). Number > 0.', variables: { number: 4528, words: '""' }, callStack: 'ConvertToWords(4528)' },
      { line: 16, explanation: 'Thousands check: 4528 / 1000 = 4 ("Four Thousand"). Remaining = 528.', variables: { words: '"Four Thousand "', number: 528 }, callStack: 'ConvertToWords(4528)' },
      { line: 22, explanation: 'Hundreds check: 528 / 100 = 5 ("Five Hundred"). Remaining = 28.', variables: { words: '"Four Thousand Five Hundred "', number: 28 }, callStack: 'ConvertToWords(4528)' },
      { line: 33, explanation: 'Tens check: 28 >= 20 -> tens[2] = "Twenty", units[8] = "Eight".', variables: { words: '"Four Thousand Five Hundred and Twenty-Eight"', number: 0 }, callStack: 'ConvertToWords(4528)' },
      { line: 40, explanation: 'Return trimmed final string.', variables: { result: '"Four Thousand Five Hundred and Twenty-Eight"' }, outputLog: 'In Words: Four Thousand Five Hundred and Twenty-Eight' }
    ],
    simulatedOutput: [
      'Enter any number (0 - 9999): 4528',
      'In Words: Four Thousand Five Hundred and Twenty-Eight'
    ],
    vsSteps: [
      { stepNumber: 1, title: 'Project Setup', description: 'Create a Console App named "Prac02_NumberToWords".' },
      { stepNumber: 2, title: 'Implement Logic Class', description: 'Paste the string array lookup and conversion helper method into Program.cs.' },
      { stepNumber: 3, title: 'Test Edge Cases', description: 'Test numbers like 0, 15, 100, 1005, and 9999 to verify proper "and" and hyphenation.' }
    ],
    vivaQuestions: [
      { question: 'Why are static arrays used for units and tens?', shortAnswer: 'Static arrays are loaded once in memory and accessible without instantiating an object.', detailedAnswer: 'Since the word mappings for numbers do not change per instance, keeping them static avoids unnecessary memory allocations during repeated function calls.' }
    ],
    emulatorType: 'number-words'
  },
  {
    id: 3,
    title: 'Count Substring Occurrences & Frequency',
    aim: 'To write a C# program that counts how many times a given substring occurs within a master string, and calculates character frequency.',
    module: 'Module 1: C# OOP & Basics',
    difficulty: 'Beginner',
    estimatedMinutes: 12,
    tags: ['Strings', 'IndexOf', 'Loops', 'Char Analysis'],
    algorithm: [
      'Read master text and target substring from console.',
      'Initialize counter = 0 and startIndex = 0.',
      'Use text.IndexOf(substring, startIndex, StringComparison.OrdinalIgnoreCase) inside a while loop.',
      'Whenever found, increment counter and advance startIndex = foundIndex + substring.Length.',
      'Repeat until IndexOf returns -1.',
      'Display total occurrence count and frequency percentage.'
    ],
    code: `using System;

class SubstringCounter
{
    static void Main()
    {
        Console.WriteLine("=== SUBSTRING OCCURRENCE COUNTER ===");
        Console.Write("Enter Master String: ");
        string text = Console.ReadLine();

        Console.Write("Enter Substring to Find: ");
        string sub = Console.ReadLine();

        int count = 0;
        int index = 0;

        while ((index = text.IndexOf(sub, index, StringComparison.OrdinalIgnoreCase)) != -1)
        {
            count++;
            index += sub.Length;
        }

        Console.WriteLine($"\\nThe substring '{sub}' occurred {count} time(s) in the given text.");
        Console.ReadKey();
    }
}`,
    codeExplanation: 'Uses the efficient string.IndexOf overload that takes a start position, preventing infinite loops by jumping ahead by the substring length.',
    traceSteps: [
      { line: 8, explanation: 'Master string input: "BCA students love C# programming in BCA lab".', variables: { text: '"BCA students love C# programming in BCA lab"' }, callStack: 'Main()' },
      { line: 11, explanation: 'Target substring input: "BCA".', variables: { sub: '"BCA"' }, callStack: 'Main()' },
      { line: 16, explanation: 'First match found at index 0. Count becomes 1. Next index = 3.', variables: { count: 1, index: 3 }, callStack: 'Main()' },
      { line: 16, explanation: 'Second match found at index 36. Count becomes 2. Next index = 39.', variables: { count: 2, index: 39 }, callStack: 'Main()' },
      { line: 16, explanation: 'IndexOf returns -1 (no more occurrences). Loop terminates.', variables: { count: 2, index: -1 }, outputLog: 'The substring \'BCA\' occurred 2 time(s).' }
    ],
    simulatedOutput: [
      '=== SUBSTRING OCCURRENCE COUNTER ===',
      'Enter Master String: BCA students love C# programming in BCA lab',
      'Enter Substring to Find: BCA',
      '',
      'The substring \'BCA\' occurred 2 time(s) in the given text.'
    ],
    vsSteps: [
      { stepNumber: 1, title: 'Create Console App', description: 'Create project named "Prac03_SubstringOccurrences".' },
      { stepNumber: 2, title: 'Add IndexOf Logic', description: 'Implement case-insensitive search loop using StringComparison.OrdinalIgnoreCase.' },
      { stepNumber: 3, title: 'Execute', description: 'Run and test with repeating words and non-existent targets.' }
    ],
    vivaQuestions: [
      { question: 'What does string.IndexOf return if the substring is not found?', shortAnswer: 'It returns -1.', detailedAnswer: 'The value -1 is a standard sentinel value in C# and .NET indicating the target item was not located in the searched sequence.' }
    ],
    emulatorType: 'substring-count'
  },
  {
    id: 4,
    title: 'Class Person with Properties & ShowDetails()',
    aim: 'To demonstrate Object Oriented Programming concepts in C# by creating a Person class with auto-implemented properties, constructors, and a ShowDetails() method.',
    module: 'Module 1: C# OOP & Basics',
    difficulty: 'Beginner',
    estimatedMinutes: 15,
    tags: ['OOP', 'Classes', 'Constructors', 'Encapsulation'],
    algorithm: [
      'Declare class `Person` with private fields and public properties (Name, Age, Email, Role).',
      'Create a parameterized constructor to initialize object state.',
      'Define `ShowDetails()` method to print formatted person summary.',
      'In `Main()`, instantiate multiple Person objects using `new Person(...)`.',
      'Call `ShowDetails()` on each object to display information.'
    ],
    code: `using System;

namespace OopDemo
{
    public class Person
    {
        // Auto-implemented properties
        public int Id { get; set; }
        public string Name { get; set; }
        public int Age { get; set; }
        public string Email { get; set; }

        // Parameterized Constructor
        public Person(int id, string name, int age, string email)
        {
            Id = id;
            Name = name;
            Age = age;
            Email = email;
        }

        // Method to display details
        public virtual void ShowDetails()
        {
            Console.WriteLine($"[ID: {Id}] Name: {Name} | Age: {Age} | Email: {Email}");
        }
    }

    class Program
    {
        static void Main()
        {
            Person p1 = new Person(101, "Ananya Rao", 20, "ananya@college.edu");
            Person p2 = new Person(102, "Karan Mehta", 22, "karan@college.edu");

            Console.WriteLine("--- STUDENT DETAILS ---");
            p1.ShowDetails();
            p2.ShowDetails();

            Console.ReadKey();
        }
    }
}`,
    codeExplanation: 'Illustrates C# classes, auto-implemented getters and setters { get; set; }, encapsulation, and constructor initialization.',
    traceSteps: [
      { line: 27, explanation: 'Instantiate Person p1 with ID 101, "Ananya Rao", 20.', variables: { 'p1.Id': 101, 'p1.Name': '"Ananya Rao"', 'p1.Age': 20 }, callStack: 'Person(101, ...)' },
      { line: 28, explanation: 'Instantiate Person p2 with ID 102, "Karan Mehta", 22.', variables: { 'p2.Id': 102, 'p2.Name': '"Karan Mehta"', 'p2.Age': 22 }, callStack: 'Person(102, ...)' },
      { line: 31, explanation: 'Execute p1.ShowDetails() method on instance p1.', variables: { activeObject: 'p1' }, outputLog: '[ID: 101] Name: Ananya Rao | Age: 20 | Email: ananya@college.edu' },
      { line: 32, explanation: 'Execute p2.ShowDetails() method on instance p2.', variables: { activeObject: 'p2' }, outputLog: '[ID: 102] Name: Karan Mehta | Age: 22 | Email: karan@college.edu' }
    ],
    simulatedOutput: [
      '--- STUDENT DETAILS ---',
      '[ID: 101] Name: Ananya Rao | Age: 20 | Email: ananya@college.edu',
      '[ID: 102] Name: Karan Mehta | Age: 22 | Email: karan@college.edu'
    ],
    vsSteps: [
      { stepNumber: 1, title: 'Create Class File', description: 'Right click project -> Add -> Class -> Name it Person.cs.' },
      { stepNumber: 2, title: 'Declare Properties and Methods', description: 'Define auto properties and the ShowDetails method.' },
      { stepNumber: 3, title: 'Instantiate in Program.cs', description: 'Create instances in Main and invoke ShowDetails().' }
    ],
    vivaQuestions: [
      { question: 'What is an Auto-Implemented Property in C#?', shortAnswer: 'It allows concise property declaration where the C# compiler creates a private anonymous backing field automatically.', detailedAnswer: 'Syntax: public string Name { get; set; }. It avoids writing manual private string _name with getters and setters when no extra logic is needed.' }
    ],
    emulatorType: 'oop-person'
  },
  {
    id: 5,
    title: 'Method Overloading: Area of Shapes',
    aim: 'To implement compile-time polymorphism (Method Overloading) in C# by defining multiple Area() methods for Rectangle, Circle, Triangle, and Square.',
    module: 'Module 1: C# OOP & Basics',
    difficulty: 'Beginner',
    estimatedMinutes: 12,
    tags: ['Overloading', 'Polymorphism', 'Geometry', 'Static Methods'],
    algorithm: [
      'Define a class `GeometryCalculator`.',
      'Create `Area(double radius)` for Circle (Ï€ * rÂ²).',
      'Create `Area(double length, double breadth)` for Rectangle (l * b).',
      'Create `Area(float baseVal, float height)` for Triangle (0.5 * b * h).',
      'Create `Area(int side)` for Square (side * side).',
      'In Main(), invoke each overloaded method with varying parameters and print calculated areas.'
    ],
    code: `using System;

class GeometryCalculator
{
    // Area of Circle
    public static double Area(double radius)
    {
        return Math.PI * radius * radius;
    }

    // Area of Rectangle
    public static double Area(double length, double breadth)
    {
        return length * breadth;
    }

    // Area of Triangle
    public static double Area(float baseLength, float height)
    {
        return 0.5 * baseLength * height;
    }

    // Area of Square
    public static int Area(int side)
    {
        return side * side;
    }
}

class Program
{
    static void Main()
    {
        Console.WriteLine("--- METHOD OVERLOADING: AREA CALCULATOR ---");
        Console.WriteLine($"Area of Circle (r=7.0):        {GeometryCalculator.Area(7.0):F2} sq units");
        Console.WriteLine($"Area of Rectangle (l=12, b=8): {GeometryCalculator.Area(12.0, 8.0):F2} sq units");
        Console.WriteLine($"Area of Triangle (b=10, h=5):  {GeometryCalculator.Area(10.0f, 5.0f):F2} sq units");
        Console.WriteLine($"Area of Square (s=6):          {GeometryCalculator.Area(6)} sq units");

        Console.ReadKey();
    }
}`,
    codeExplanation: 'Method overloading enables multiple methods in the same class to share the same name with different signatures (different parameter types or counts). The compiler determines which method to call at compile time.',
    traceSteps: [
      { line: 31, explanation: 'Invoke Area(7.0) -> Matches double overload for Circle.', variables: { radius: 7.0, calculated: 153.94 }, callStack: 'GeometryCalculator.Area(double)' },
      { line: 32, explanation: 'Invoke Area(12.0, 8.0) -> Matches (double, double) for Rectangle.', variables: { length: 12.0, breadth: 8.0, calculated: 96.0 }, callStack: 'GeometryCalculator.Area(double, double)' },
      { line: 33, explanation: 'Invoke Area(10.0f, 5.0f) -> Matches (float, float) for Triangle.', variables: { baseLength: 10.0, height: 5.0, calculated: 25.0 }, callStack: 'GeometryCalculator.Area(float, float)' },
      { line: 34, explanation: 'Invoke Area(6) -> Matches int overload for Square.', variables: { side: 6, calculated: 36 }, callStack: 'GeometryCalculator.Area(int)' }
    ],
    simulatedOutput: [
      '--- METHOD OVERLOADING: AREA CALCULATOR ---',
      'Area of Circle (r=7.0):        153.94 sq units',
      'Area of Rectangle (l=12, b=8): 96.00 sq units',
      'Area of Triangle (b=10, h=5):  25.00 sq units',
      'Area of Square (s=6):          36 sq units'
    ],
    vsSteps: [
      { stepNumber: 1, title: 'Create Console App', description: 'Name project "Prac05_MethodOverloading".' },
      { stepNumber: 2, title: 'Write Overloaded Methods', description: 'Define four methods named Area with distinct parameter lists.' },
      { stepNumber: 3, title: 'Run and Verify', description: 'Observe how C# resolves method calls by type and parameter count.' }
    ],
    vivaQuestions: [
      { question: 'Can methods be overloaded by changing only the return type in C#?', shortAnswer: 'No, method overloading requires different parameter types, numbers, or order.', detailedAnswer: 'The compiler uses the method signature (name + parameters) to resolve calls. Return type alone is not part of the signature for overload resolution.' }
    ],
    emulatorType: 'method-overload'
  },
  {
    id: 6,
    title: 'Animal Polymorphism & Method Overriding',
    aim: 'To demonstrate runtime polymorphism using base class Animal and derived classes Dog, Cat, and Cow with virtual and override keywords.',
    module: 'Module 1: C# OOP & Basics',
    difficulty: 'Intermediate',
    estimatedMinutes: 15,
    tags: ['Inheritance', 'Polymorphism', 'virtual', 'override', 'Base Class'],
    algorithm: [
      'Create base class `Animal` with a virtual method `MakeSound()`.',
      'Create derived classes `Dog`, `Cat`, and `Cow` inheriting from `Animal`.',
      'Override `MakeSound()` in each derived class with specific sound logic.',
      'Declare an array or collection of base type `Animal[] animals`.',
      'Store instances of Dog, Cat, and Cow into the Animal array.',
      'Iterate through the array and invoke `MakeSound()` polymorphically at runtime.'
    ],
    code: `using System;

abstract class Animal
{
    public string Name { get; set; }

    public Animal(string name)
    {
        Name = name;
    }

    // Virtual / Abstract method to be overridden
    public abstract void MakeSound();

    public void Sleep()
    {
        Console.WriteLine($"{Name} is sleeping peacefully. Zzz...");
    }
}

class Dog : Animal
{
    public Dog(string name) : base(name) { }
    public override void MakeSound() => Console.WriteLine($"{Name} says: Woof! Woof! ðŸ•");
}

class Cat : Animal
{
    public Cat(string name) : base(name) { }
    public override void MakeSound() => Console.WriteLine($"{Name} says: Meow! Purr... ðŸ±");
}

class Cow : Animal
{
    public Cow(string name) : base(name) { }
    public override void MakeSound() => Console.WriteLine($"{Name} says: Moo! ðŸ„");
}

class Program
{
    static void Main()
    {
        Animal[] farm = new Animal[]
        {
            new Dog("Bruno"),
            new Cat("Whiskers"),
            new Cow("Daisy")
        };

        Console.WriteLine("=== RUNTIME POLYMORPHISM DEMO ===");
        foreach (Animal a in farm)
        {
            a.MakeSound(); // Dynamic dispatch at runtime
            a.Sleep();
            Console.WriteLine();
        }

        Console.ReadKey();
    }
}`,
    codeExplanation: 'Demonstrates Dynamic Method Dispatch (Late Binding). The base class pointer calls the correct derived class method at runtime based on the actual object type.',
    traceSteps: [
      { line: 42, explanation: 'Initialize farm array with 3 derived instances.', variables: { count: 3 }, callStack: 'Main()' },
      { line: 51, explanation: 'Iteration 1: a is Dog ("Bruno"). Calls Dog.MakeSound().', variables: { 'a.Name': '"Bruno"', sound: '"Woof! Woof!"' }, outputLog: 'Bruno says: Woof! Woof! ðŸ•' },
      { line: 51, explanation: 'Iteration 2: a is Cat ("Whiskers"). Calls Cat.MakeSound().', variables: { 'a.Name': '"Whiskers"', sound: '"Meow! Purr..."' }, outputLog: 'Whiskers says: Meow! Purr... ðŸ±' },
      { line: 51, explanation: 'Iteration 3: a is Cow ("Daisy"). Calls Cow.MakeSound().', variables: { 'a.Name': '"Daisy"', sound: '"Moo!"' }, outputLog: 'Daisy says: Moo! ðŸ„' }
    ],
    simulatedOutput: [
      '=== RUNTIME POLYMORPHISM DEMO ===',
      'Bruno says: Woof! Woof! ðŸ•',
      'Bruno is sleeping peacefully. Zzz...',
      '',
      'Whiskers says: Meow! Purr... ðŸ±',
      'Whiskers is sleeping peacefully. Zzz...',
      '',
      'Daisy says: Moo! ðŸ„',
      'Daisy is sleeping peacefully. Zzz...'
    ],
    vsSteps: [
      { stepNumber: 1, title: 'Create Class Hierarchy', description: 'Create Animal.cs, Dog.cs, Cat.cs, and Cow.cs with appropriate inheritance.' },
      { stepNumber: 2, title: 'Use virtual and override', description: 'Mark base method abstract or virtual and derived methods override.' },
      { stepNumber: 3, title: 'Run Polymorphic Loop', description: 'Run foreach over base Animal array.' }
    ],
    vivaQuestions: [
      { question: 'What is the difference between method overloading and method overriding?', shortAnswer: 'Overloading is compile-time polymorphism in the same class; Overriding is runtime polymorphism in an inheritance hierarchy.', detailedAnswer: 'Overriding requires inheritance, virtual in base, and override in derived class. Overloading requires different parameters with the same method name.' }
    ],
    emulatorType: 'animal-poly'
  },
  {
    id: 7,
    title: 'String Manipulations Suite',
    aim: 'To perform various string operations in C# including string reversal, case conversion, palindrome checking, word counting, and character replacement.',
    module: 'Module 1: C# OOP & Basics',
    difficulty: 'Beginner',
    estimatedMinutes: 12,
    tags: ['Strings', 'CharArray', 'StringBuilder', 'Palindrome'],
    algorithm: [
      'Read sentence from user.',
      'Convert sentence to char array using `ToCharArray()`, reverse with `Array.Reverse()`, and construct reversed string.',
      'Check palindrome by comparing original and reversed string (ignoring case and whitespace).',
      'Count words using `Split(new char[] {\' \'}, StringSplitOptions.RemoveEmptyEntries)`.',
      'Convert to uppercase, lowercase, and title case.',
      'Display all computed metrics.'
    ],
    code: `using System;

class StringManipulations
{
    static void Main()
    {
        Console.Write("Enter a sentence or word: ");
        string input = Console.ReadLine();

        // 1. Reversal
        char[] charArr = input.ToCharArray();
        Array.Reverse(charArr);
        string reversed = new string(charArr);

        // 2. Palindrome Check
        string clean = input.Replace(" ", "").ToLower();
        string cleanRev = reversed.Replace(" ", "").ToLower();
        bool isPalindrome = (clean == cleanRev);

        // 3. Word Count
        string[] words = input.Split(new char[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);

        // Output Results
        Console.WriteLine("\\n================ ANALYSIS ================");
        Console.WriteLine($"Original Text  : {input}");
        Console.WriteLine($"Reversed Text  : {reversed}");
        Console.WriteLine($"Is Palindrome? : {(isPalindrome ? "YES (Palindrome)" : "NO")}");
        Console.WriteLine($"Total Words    : {words.Length}");
        Console.WriteLine($"Uppercase      : {input.ToUpper()}");
        Console.WriteLine($"Lowercase      : {input.ToLower()}");
        Console.WriteLine($"Length         : {input.Length} characters");
        Console.WriteLine("==========================================");

        Console.ReadKey();
    }
}`,
    codeExplanation: 'Demonstrates common string operations in .NET framework using Array.Reverse, string.Split, ToUpper, ToLower, and equality checks.',
    traceSteps: [
      { line: 6, explanation: 'User inputs "Madam In Eden I\'m Adam".', variables: { input: '"Madam In Eden I\'m Adam"' }, callStack: 'Main()' },
      { line: 11, explanation: 'Reverse characters into reversed string.', variables: { reversed: '"madA m\'I nedE nI madaM"' }, callStack: 'Main()' },
      { line: 15, explanation: 'Clean whitespace and compare lowercase versions.', variables: { clean: '"madaminedeni\'madam"', isPalindrome: true }, callStack: 'Main()' },
      { line: 19, explanation: 'Split words by space delimiter: 5 words found.', variables: { wordCount: 5 }, outputLog: 'Total Words: 5 | Is Palindrome?: YES' }
    ],
    simulatedOutput: [
      'Enter a sentence or word: Madam In Eden I\'m Adam',
      '',
      '================ ANALYSIS ================',
      'Original Text  : Madam In Eden I\'m Adam',
      'Reversed Text  : madA m\'I nedE nI madaM',
      'Is Palindrome? : YES (Palindrome)',
      'Total Words    : 5',
      'Uppercase      : MADAM IN EDEN I\'M ADAM',
      'Lowercase      : madam in eden i\'m adam',
      'Length         : 23 characters',
      '=========================================='
    ],
    vsSteps: [
      { stepNumber: 1, title: 'Create Project', description: 'Create Console App "Prac07_StringManipulations".' },
      { stepNumber: 2, title: 'Code String Operations', description: 'Add string operations in Program.cs.' },
      { stepNumber: 3, title: 'Run and Test', description: 'Test with "racecar", "hello world", and sentences with punctuation.' }
    ],
    vivaQuestions: [
      { question: 'Why are strings immutable in C#?', shortAnswer: 'Once created, a string object cannot be modified in memory for thread safety and optimization.', detailedAnswer: 'Any operation like ToUpper() creates a new string in memory. For heavy string modifications in loops, StringBuilder should be used instead.' }
    ],
    emulatorType: 'string-manip'
  },
  {
    id: 8,
    title: 'Exception Handling with try-catch-finally',
    aim: 'To implement structured exception handling in C# using try, multiple catch blocks (DivideByZeroException, FormatException), throw, and finally.',
    module: 'Module 1: C# OOP & Basics',
    difficulty: 'Intermediate',
    estimatedMinutes: 15,
    tags: ['Exceptions', 'try-catch-finally', 'DivideByZero', 'Robustness'],
    algorithm: [
      'Prompt user to enter numerator and denominator.',
      'Place parsing and division arithmetic inside a `try` block.',
      'Catch `FormatException` if input is non-numeric.',
      'Catch `DivideByZeroException` if denominator is 0.',
      'Catch general `Exception` for unexpected runtime errors.',
      'Execute cleanup code inside `finally` block.',
      'Display friendly error messages without crashing the application.'
    ],
    code: `using System;

class ExceptionHandlingDemo
{
    static void Main()
    {
        Console.WriteLine("=== SAFE DIVISION CALCULATOR (EXCEPTION HANDLING) ===");

        try
        {
            Console.Write("Enter Numerator   : ");
            int num = int.Parse(Console.ReadLine());

            Console.Write("Enter Denominator : ");
            int den = int.Parse(Console.ReadLine());

            if (den < 0)
                throw new ArgumentException("Negative denominator is not allowed in this lab.");

            int result = num / den;
            Console.WriteLine($"\\nSuccess: {num} / {den} = {result}");
        }
        catch (FormatException ex)
        {
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine($"\\n[Error] Invalid Input: Please enter integers only! ({ex.Message})");
            Console.ResetColor();
        }
        catch (DivideByZeroException ex)
        {
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine($"\\n[Error] Math Error: Cannot divide any number by zero! ({ex.Message})");
            Console.ResetColor();
        }
        catch (Exception ex)
        {
            Console.ForegroundColor = ConsoleColor.Yellow;
            Console.WriteLine($"\\n[Custom Error] {ex.Message}");
            Console.ResetColor();
        }
        finally
        {
            Console.WriteLine("\\n[Finally Block] Execution completed. Releasing resources.");
        }

        Console.ReadKey();
    }
}`,
    codeExplanation: 'Demonstrates hierarchical exception handling in C#. Specific exceptions must be caught before the generic System.Exception catch block.',
    traceSteps: [
      { line: 9, explanation: 'Begin try block.', variables: { state: '"Entering Try"' }, callStack: 'Main()' },
      { line: 12, explanation: 'User inputs numerator = 50.', variables: { num: 50 }, callStack: 'Main()' },
      { line: 15, explanation: 'User inputs denominator = 0.', variables: { den: 0 }, callStack: 'Main()' },
      { line: 20, explanation: 'num / den triggers DivideByZeroException. Control jumps to DivideByZeroException catch block.', variables: { exception: '"DivideByZeroException"' }, callStack: 'Catch Handler' },
      { line: 36, explanation: 'Finally block ALWAYS executes regardless of exception.', variables: { status: '"Finally Executed"' }, outputLog: '[Finally Block] Execution completed.' }
    ],
    simulatedOutput: [
      '=== SAFE DIVISION CALCULATOR (EXCEPTION HANDLING) ===',
      'Enter Numerator   : 50',
      'Enter Denominator : 0',
      '',
      '[Error] Math Error: Cannot divide any number by zero! (Attempted to divide by zero.)',
      '',
      '[Finally Block] Execution completed. Releasing resources.'
    ],
    vsSteps: [
      { stepNumber: 1, title: 'Create Console App', description: 'Create project "Prac08_ExceptionHandling".' },
      { stepNumber: 2, title: 'Add Try-Catch Blocks', description: 'Structure try, multiple catch blocks, and finally block.' },
      { stepNumber: 3, title: 'Test 3 Scenarios', description: 'Test 1: Valid numbers (20/4), Test 2: Divide by zero (20/0), Test 3: Text input ("abc").' }
    ],
    vivaQuestions: [
      { question: 'Does the finally block always execute in C#?', shortAnswer: 'Yes, the finally block executes whether an exception occurs or not, except on fatal process aborts.', detailedAnswer: 'The finally block is guaranteed to run after try/catch, making it the ideal place for closing database connections, file handles, and releasing network streams.' }
    ],
    emulatorType: 'exception-demo'
  },
  {
    id: 9,
    title: 'Multicast Delegates & Event Publishing',
    aim: 'To write a C# program demonstrating Multicast Delegates that point to and invoke multiple notification methods simultaneously.',
    module: 'Module 1: C# OOP & Basics',
    difficulty: 'Intermediate',
    estimatedMinutes: 15,
    tags: ['Delegates', 'Multicast', 'Events', 'Function Pointer'],
    algorithm: [
      'Declare delegate `public delegate void Notify(string message);`.',
      'Create multiple static/instance target methods with matching signature (SendSMS, SendEmail, LogToConsole).',
      'Instantiate delegate with the first method `Notify notifier = SendSMS;`.',
      'Use `+=` operator to combine `SendEmail` and `LogToConsole` onto the invocation list.',
      'Invoke the multicast delegate `notifier(\"System Alert\");`.',
      'Demonstrate removing a method using `-=` operator.'
    ],
    code: `using System;

// 1. Delegate Declaration
public delegate void NotificationHandler(string message);

class NotificationService
{
    public static void SendSMS(string message)
    {
        Console.WriteLine($"[SMS GATEWAY] ðŸ“± Message dispatched: {message}");
    }

    public static void SendEmail(string message)
    {
        Console.WriteLine($"[EMAIL SERVER] ðŸ“§ Email sent to subscriber: {message}");
    }

    public static void WriteLog(string message)
    {
        Console.WriteLine($"[AUDIT LOG] ðŸ“ Written to server log: [{DateTime.Now:HH:mm:ss}] {message}");
    }
}

class Program
{
    static void Main()
    {
        Console.WriteLine("=== MULTICAST DELEGATE DEMO ===\\n");

        // 2. Instantiate and combine methods (+ operator)
        NotificationHandler notify = NotificationService.SendSMS;
        notify += NotificationService.SendEmail;
        notify += NotificationService.WriteLog;

        Console.WriteLine("--- Invoking all 3 subscribers simultaneously ---");
        notify("BCA Semester 5 Exam Schedule Released!");

        // 3. Remove a subscriber (- operator)
        Console.WriteLine("\\n--- Unsubscribing SMS Gateway (-=) ---");
        notify -= NotificationService.SendSMS;

        notify("Reminder: Practical Lab Record Submission Tomorrow.");

        Console.ReadKey();
    }
}`,
    codeExplanation: 'A delegate is a type-safe function pointer. A multicast delegate holds references to multiple methods with identical signatures and invokes them sequentially in the order added.',
    traceSteps: [
      { line: 26, explanation: 'Assign NotificationService.SendSMS to delegate notify.', variables: { delegatesCount: 1 }, callStack: 'Main()' },
      { line: 27, explanation: 'Attach SendEmail using += operator.', variables: { delegatesCount: 2 }, callStack: 'Main()' },
      { line: 28, explanation: 'Attach WriteLog using += operator.', variables: { delegatesCount: 3 }, callStack: 'Main()' },
      { line: 31, explanation: 'Invoking notify() calls SendSMS, SendEmail, and WriteLog in sequence.', variables: { message: '"BCA Exam Schedule Released!"' }, outputLog: 'Dispatched to SMS, Email, and Audit Log.' },
      { line: 35, explanation: 'Remove SendSMS using -= operator. Only Email and Audit Log remain.', variables: { delegatesCount: 2 }, outputLog: 'SMS detached successfully.' }
    ],
    simulatedOutput: [
      '=== MULTICAST DELEGATE DEMO ===',
      '',
      '--- Invoking all 3 subscribers simultaneously ---',
      '[SMS GATEWAY] ðŸ“± Message dispatched: BCA Semester 5 Exam Schedule Released!',
      '[EMAIL SERVER] ðŸ“§ Email sent to subscriber: BCA Semester 5 Exam Schedule Released!',
      '[AUDIT LOG] ðŸ“ Written to server log: [10:30:15] BCA Semester 5 Exam Schedule Released!',
      '',
      '--- Unsubscribing SMS Gateway (-=) ---',
      '[EMAIL SERVER] ðŸ“§ Email sent to subscriber: Reminder: Practical Lab Record Submission Tomorrow.',
      '[AUDIT LOG] ðŸ“ Written to server log: [10:30:15] Reminder: Practical Lab Record Submission Tomorrow.'
    ],
    vsSteps: [
      { stepNumber: 1, title: 'Create Project', description: 'Create Console App named "Prac09_MulticastDelegates".' },
      { stepNumber: 2, title: 'Declare Delegate and Subscribers', description: 'Write delegate signature and subscriber methods.' },
      { stepNumber: 3, title: 'Test Multicast Invocation', description: 'Test combining (+-) and removing (-=) delegate targets.' }
    ],
    vivaQuestions: [
      { question: 'What is a Multicast Delegate in C#?', shortAnswer: 'A delegate that holds references to more than one method and calls them all when invoked.', detailedAnswer: 'Internally, MulticastDelegate derives from System.MulticastDelegate and maintains an Invocation List. In Windows Forms, events are built upon multicast delegates.' }
    ],
    emulatorType: 'multicast-delegate'
  },
  {
    id: 10,
    title: 'Jagged Arrays & Student Marks Matrix',
    aim: 'To write a C# program demonstrating Jagged Arrays (array-of-arrays) to store varying numbers of subject marks for different students and compute averages.',
    module: 'Module 1: C# OOP & Basics',
    difficulty: 'Intermediate',
    estimatedMinutes: 15,
    tags: ['Jagged Arrays', 'Matrices', 'Nested Loops', 'Statistics'],
    algorithm: [
      'Declare a jagged array `int[][] studentMarks = new int[3][];`.',
      'Allocate different column lengths for each student row (e.g., Row 0 has 3 subjects, Row 1 has 5 subjects, Row 2 has 4 subjects).',
      'Initialize marks for each student.',
      'Use nested `for` loops to iterate through each student and their respective subject marks.',
      'Compute Total Marks and Average for each student.',
      'Display a formatted summary table.'
    ],
    code: `using System;

class JaggedArrayDemo
{
    static void Main()
    {
        Console.WriteLine("=== JAGGED ARRAY: STUDENT MARKS SYSTEM ===\\n");

        // Declaring a jagged array with 3 students
        int[][] marks = new int[3][];

        // Each student has a different number of elected subjects
        marks[0] = new int[] { 85, 90, 78 };             // 3 subjects (Roll 101)
        marks[1] = new int[] { 72, 88, 91, 65, 80 };     // 5 subjects (Roll 102)
        marks[2] = new int[] { 95, 92, 89, 94 };         // 4 subjects (Roll 103)

        string[] studentNames = { "Rohan Gupta", "Priya Nair", "Sneha Roy" };

        for (int i = 0; i < marks.Length; i++)
        {
            Console.WriteLine($"Student #{i + 1}: {studentNames[i]}");
            Console.Write("  Marks: [ ");

            int sum = 0;
            for (int j = 0; j < marks[i].Length; j++)
            {
                Console.Write($"{marks[i][j]} ");
                sum += marks[i][j];
            }

            double avg = (double)sum / marks[i].Length;
            Console.WriteLine($"]");
            Console.WriteLine($"  Total: {sum} / {marks[i].Length * 100} | Average: {avg:F2}%");
            Console.WriteLine(new string('-', 45));
        }

        Console.ReadKey();
    }
}`,
    codeExplanation: 'A jagged array is an array whose elements are arrays. Unlike rectangular multi-dimensional arrays (int[,]), each row in a jagged array can have a completely distinct length.',
    traceSteps: [
      { line: 9, explanation: 'Allocate outer jagged array of 3 element arrays.', variables: { 'marks.Length': 3 }, callStack: 'Main()' },
      { line: 12, explanation: 'Allocate marks[0] with length 3: { 85, 90, 78 }.', variables: { 'marks[0].Length': 3 }, callStack: 'Main()' },
      { line: 13, explanation: 'Allocate marks[1] with length 5: { 72, 88, 91, 65, 80 }.', variables: { 'marks[1].Length': 5 }, callStack: 'Main()' },
      { line: 14, explanation: 'Allocate marks[2] with length 4: { 95, 92, 89, 94 }.', variables: { 'marks[2].Length': 4 }, callStack: 'Main()' },
      { line: 26, explanation: 'Student 1 Total = 253, Average = 84.33%.', variables: { sum: 253, avg: 84.33 }, outputLog: 'Student #1: Rohan Gupta Average: 84.33%' }
    ],
    simulatedOutput: [
      '=== JAGGED ARRAY: STUDENT MARKS SYSTEM ===',
      '',
      'Student #1: Rohan Gupta',
      '  Marks: [ 85 90 78 ]',
      '  Total: 253 / 300 | Average: 84.33%',
      '---------------------------------------------',
      'Student #2: Priya Nair',
      '  Marks: [ 72 88 91 65 80 ]',
      '  Total: 396 / 500 | Average: 79.20%',
      '---------------------------------------------',
      'Student #3: Sneha Roy',
      '  Marks: [ 95 92 89 94 ]',
      '  Total: 370 / 400 | Average: 92.50%',
      '---------------------------------------------'
    ],
    vsSteps: [
      { stepNumber: 1, title: 'Create Console App', description: 'Create project "Prac10_JaggedArrays".' },
      { stepNumber: 2, title: 'Declare and Allocate Array', description: 'Initialize jagged rows with diverse lengths.' },
      { stepNumber: 3, title: 'Run and Validate', description: 'Verify row iteration using marks[i].Length.' }
    ],
    vivaQuestions: [
      { question: 'What is the difference between a 2D rectangular array and a Jagged Array in C#?', shortAnswer: 'A rectangular array int[,] has equal columns per row; a jagged array int[][] can have varying columns per row.', detailedAnswer: 'Rectangular arrays allocate a single contiguous block of memory. Jagged arrays are arrays of independent array references, allowing memory saving when rows vary in length.' }
    ],
    emulatorType: 'jagged-array'
  },
  {
    id: 11,
    title: 'User Registration Form UI with MessageBox Dialog',
    aim: 'To design a Windows Forms User Registration Form featuring TextBoxes, Labels, RadioButtons, and a Submit button that validates input and displays formatted summary in a MessageBox.',
    module: 'Module 2: Windows Forms Controls',
    difficulty: 'Beginner',
    estimatedMinutes: 20,
    tags: ['WinForms', 'MessageBox', 'Validation', 'TextBox', 'Button Click'],
    algorithm: [
      'Open Visual Studio and create a Windows Forms Application (.NET Framework).',
      'Design Form1 with Labels, TextBoxes (txtName, txtEmail, txtPhone), ComboBox (cmbCourse), and Button (btnRegister).',
      'Double click `btnRegister` to generate `btnRegister_Click` event handler.',
      'In code, check if Name, Email, and Course are non-empty; if empty, display warning MessageBox.',
      'If valid, construct student profile string and display confirmation MessageBox with `MessageBoxButtons.OK` and `MessageBoxIcon.Information`.',
      'Clear form fields ready for next registration.'
    ],
    code: `using System;
using System.Windows.Forms;

namespace BCA_CSharp_WinForms
{
    public partial class FormRegistration : Form
    {
        public FormRegistration()
        {
            InitializeComponent();
        }

        private void btnRegister_Click(object sender, EventArgs e)
        {
            // Input Validation
            if (string.IsNullOrWhiteSpace(txtName.Text))
            {
                MessageBox.Show("Please enter Student Name!", "Validation Error", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                txtName.Focus();
                return;
            }

            if (string.IsNullOrWhiteSpace(txtEmail.Text) || !txtEmail.Text.Contains("@"))
            {
                MessageBox.Show("Please enter a valid Email ID!", "Validation Error", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                txtEmail.Focus();
                return;
            }

            if (cmbCourse.SelectedIndex == -1)
            {
                MessageBox.Show("Please select a Course!", "Validation Error", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                cmbCourse.Focus();
                return;
            }

            string gender = radMale.Checked ? "Male" : (radFemale.Checked ? "Female" : "Other");

            // Format Summary
            string summary = $"STUDENT REGISTRATION SUCCESSFUL!\\n\\n" +
                             $"Name   : {txtName.Text.Trim()}\\n" +
                             $"Email  : {txtEmail.Text.Trim()}\\n" +
                             $"Course : {cmbCourse.SelectedItem}\\n" +
                             $"Gender : {gender}\\n" +
                             $"Date   : {DateTime.Now:dd-MMM-yyyy HH:mm}";

            MessageBox.Show(summary, "Registration Confirmed", MessageBoxButtons.OK, MessageBoxIcon.Information);

            // Reset Form
            btnClear_Click(sender, e);
        }

        private void btnClear_Click(object sender, EventArgs e)
        {
            txtName.Clear();
            txtEmail.Clear();
            cmbCourse.SelectedIndex = -1;
            radMale.Checked = true;
            txtName.Focus();
        }
    }
}`,
    codeExplanation: 'Shows standard Windows Forms event-driven paradigm. Handles Button Click events, validated control properties, and uses MessageBox modal dialogs.',
    traceSteps: [
      { line: 15, explanation: 'User clicks Register button -> btnRegister_Click fires.', variables: { sender: 'btnRegister' }, callStack: 'btnRegister_Click' },
      { line: 17, explanation: 'Validate txtName: "Kavya Patel" is not empty. Validation passes.', variables: { 'txtName.Text': '"Kavya Patel"' }, callStack: 'btnRegister_Click' },
      { line: 24, explanation: 'Validate txtEmail: "kavya@gmail.com" contains "@". Validation passes.', variables: { 'txtEmail.Text': '"kavya@gmail.com"' }, callStack: 'btnRegister_Click' },
      { line: 38, explanation: 'Construct registration summary string with gender and date.', variables: { summary: '"STUDENT REGISTRATION SUCCESSFUL!..."' }, callStack: 'btnRegister_Click' },
      { line: 45, explanation: 'Display MessageBox.Show() with Information icon.', variables: { dialogResult: 'OK' }, outputLog: 'MessageBox: Registration Confirmed.' }
    ],
    simulatedOutput: [
      'Form Loaded: User Registration Form',
      'Name: Kavya Patel | Email: kavya@gmail.com | Course: BCA | Gender: Female',
      'MessageBox: [INFO] STUDENT REGISTRATION SUCCESSFUL! Registration ID: REG-2026-891',
      'Form controls cleared and reset.'
    ],
    vsSteps: [
      { stepNumber: 1, title: 'Create Windows Forms Project', description: 'In Visual Studio, select "Windows Forms App (.NET Framework)" -> Name it "Prac11_RegistrationForm".' },
      { stepNumber: 2, title: 'Toolbox Drag & Drop', description: 'Drag Labels (Name, Email, Course, Gender), TextBoxes, ComboBox, RadioButtons, and Buttons from Toolbox onto Form1.' },
      { stepNumber: 3, title: 'Set Control Properties', description: 'In Properties Window: Set Form Text="Student Registration", Button Name="btnRegister", ComboBox Items={"BCA", "B.Sc CS", "B.Tech"}.' },
      { stepNumber: 4, title: 'Attach Click Event', description: 'Double click btnRegister in the Form designer to create and edit the btnRegister_Click event handler.' }
    ],
    vivaQuestions: [
      { question: 'What is the role of InitializeComponent() in a Windows Form?', shortAnswer: 'It initializes all visual controls, layouts, properties, and event bindings created in the designer.', detailedAnswer: 'It is auto-generated inside Form.Designer.cs by Visual Studio and must be called inside the Form constructor before accessing any UI controls.' }
    ],
    emulatorType: 'registration-form'
  },
  {
    id: 12,
    title: 'TextBox Formatting, Multiline & Dynamic Text Alignment',
    aim: 'To build a Windows Form that dynamically modifies TextBox properties including Multiline, ScrollBars, ForeColor, BackColor, and Text Alignment (Left, Center, Right) via UI controls.',
    module: 'Module 2: Windows Forms Controls',
    difficulty: 'Beginner',
    estimatedMinutes: 15,
    tags: ['WinForms', 'TextBox', 'HorizontalAlignment', 'ScrollBars', 'Dynamic Styling'],
    algorithm: [
      'Place a main TextBox `txtEditor` on Form.',
      'Add RadioButtons for Text Alignment: Left, Center, Right.',
      'Add CheckBoxes for `Multiline` and `ReadOnly`.',
      'Add Buttons for changing Background and Foreground colors.',
      'In RadioButton `CheckedChanged` event, set `txtEditor.TextAlign = HorizontalAlignment.Center` etc.',
      'In CheckBox events, toggle `txtEditor.Multiline = chkMultiline.Checked;` and `txtEditor.ScrollBars = ScrollBars.Vertical;`.'
    ],
    code: `using System;
using System.Drawing;
using System.Windows.Forms;

public partial class FormTextBoxDemo : Form
{
    public FormTextBoxDemo()
    {
        InitializeComponent();
    }

    private void radLeft_CheckedChanged(object sender, EventArgs e)
    {
        if (radLeft.Checked) txtEditor.TextAlign = HorizontalAlignment.Left;
    }

    private void radCenter_CheckedChanged(object sender, EventArgs e)
    {
        if (radCenter.Checked) txtEditor.TextAlign = HorizontalAlignment.Center;
    }

    private void radRight_CheckedChanged(object sender, EventArgs e)
    {
        if (radRight.Checked) txtEditor.TextAlign = HorizontalAlignment.Right;
    }

    private void chkMultiline_CheckedChanged(object sender, EventArgs e)
    {
        txtEditor.Multiline = chkMultiline.Checked;
        txtEditor.ScrollBars = chkMultiline.Checked ? ScrollBars.Both : ScrollBars.None;
    }

    private void chkReadOnly_CheckedChanged(object sender, EventArgs e)
    {
        txtEditor.ReadOnly = chkReadOnly.Checked;
    }

    private void btnMakeUpper_Click(object sender, EventArgs e)
    {
        txtEditor.Text = txtEditor.Text.ToUpper();
    }

    private void btnClear_Click(object sender, EventArgs e)
    {
        txtEditor.Clear();
    }
}`,
    codeExplanation: 'Demonstrates runtime property modifications of Windows Forms TextBox control including TextAlign enum, Multiline, ScrollBars, and ReadOnly flags.',
    traceSteps: [
      { line: 17, explanation: 'User checks Center RadioButton.', variables: { 'radCenter.Checked': true }, callStack: 'radCenter_CheckedChanged' },
      { line: 18, explanation: 'Set txtEditor.TextAlign = HorizontalAlignment.Center.', variables: { 'txtEditor.TextAlign': 'Center' }, outputLog: 'TextBox text aligned to center.' },
      { line: 26, explanation: 'User checks Multiline CheckBox -> Enables multiline editing and scrollbars.', variables: { 'txtEditor.Multiline': true, 'txtEditor.ScrollBars': 'Both' }, outputLog: 'Multiline enabled.' }
    ],
    simulatedOutput: [
      'Form Loaded: TextBox Formatting Playground',
      'Text align changed to Center.',
      'Multiline set to TRUE with Both ScrollBars enabled.',
      'Text transformed to UPPERCASE.'
    ],
    vsSteps: [
      { stepNumber: 1, title: 'Form Setup', description: 'Create Windows Forms App "Prac12_TextBoxAlign".' },
      { stepNumber: 2, title: 'Add Controls', description: 'Place TextBox, GroupBox with 3 RadioButtons (Left, Center, Right), CheckBoxes (Multiline, ReadOnly).' },
      { stepNumber: 3, title: 'Link CheckedChanged Events', description: 'Double click radio buttons to assign HorizontalAlignment values.' }
    ],
    vivaQuestions: [
      { question: 'What enumeration is used to set the text alignment of a TextBox in WinForms?', shortAnswer: 'HorizontalAlignment enumeration (Left, Center, Right).', detailedAnswer: 'System.Windows.Forms.HorizontalAlignment defines Left, Right, and Center alignment modes for single and multi-line textboxes.' }
    ],
    emulatorType: 'textbox-align'
  }
];


  // ==========================================
  // MODULE: practicalsPart2.js
  // ==========================================
const practicalsPart2 = [
  {
    id: 13,
    title: 'Authentication & Login Form with Password Masking',
    aim: 'To develop a Secure Login Form with PasswordChar masking, username validation, show/hide password checkbox, and an attempt lockout mechanism (3 attempts max).',
    module: 'Module 2: Windows Forms Controls',
    difficulty: 'Beginner',
    estimatedMinutes: 15,
    tags: ['WinForms', 'PasswordChar', 'Authentication', 'Security', 'Lockout'],
    algorithm: [
      'Create Windows Form with TextBoxes `txtUser` and `txtPass` (PasswordChar = \'â€¢\' or \'*\').',
      'Add CheckBox `chkShowPassword` to toggle `txtPass.UseSystemPasswordChar`.',
      'Declare integer `attempts = 3;`.',
      'In `btnLogin_Click`: verify if txtUser.Text == \"admin\" and txtPass.Text == \"bca123\".',
      'If correct, display \"Login Successful! Welcome Administrator\" and open Dashboard or reset.',
      'If incorrect, decrement `attempts`. If attempts reach 0, disable controls and show Lockout error.'
    ],
    code: `using System;
using System.Drawing;
using System.Windows.Forms;

public partial class FormLogin : Form
{
    private int remainingAttempts = 3;

    public FormLogin()
    {
        InitializeComponent();
        txtPass.PasswordChar = 'â€¢';
    }

    private void btnLogin_Click(object sender, EventArgs e)
    {
        string username = txtUser.Text.Trim();
        string password = txtPass.Text;

        if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
        {
            MessageBox.Show("Please enter both Username and Password.", "Missing Fields", MessageBoxButtons.OK, MessageBoxIcon.Warning);
            return;
        }

        // Hardcoded credential check for lab demo
        if (username == "admin" && password == "admin@123")
        {
            MessageBox.Show($"Welcome, {username}! Access Granted.", "Success", MessageBoxButtons.OK, MessageBoxIcon.Information);
            this.BackColor = Color.LightGreen;
            remainingAttempts = 3;
            lblStatus.Text = "Status: Authenticated";
        }
        else
        {
            remainingAttempts--;
            lblAttempts.Text = $"Attempts Remaining: {remainingAttempts}";

            if (remainingAttempts > 0)
            {
                MessageBox.Show($"Invalid credentials! {remainingAttempts} attempt(s) remaining.", "Access Denied", MessageBoxButtons.OK, MessageBoxIcon.Error);
                txtPass.Clear();
                txtPass.Focus();
            }
            else
            {
                MessageBox.Show("Maximum attempts exceeded! Your account has been temporarily locked.", "Account Locked", MessageBoxButtons.OK, MessageBoxIcon.Stop);
                btnLogin.Enabled = false;
                txtUser.Enabled = false;
                txtPass.Enabled = false;
                lblStatus.Text = "Status: Account Locked";
            }
        }
    }

    private void chkShowPass_CheckedChanged(object sender, EventArgs e)
    {
        txtPass.PasswordChar = chkShowPass.Checked ? '\\0' : 'â€¢';
    }
}`,
    codeExplanation: 'Handles password security properties in WinForms. Uses PasswordChar with null terminator \\0 to reveal characters when the checkbox is toggled.',
    traceSteps: [
      { line: 17, explanation: 'Read credentials: User="admin", Password="wrong_pass".', variables: { username: '"admin"', remainingAttempts: 3 }, callStack: 'btnLogin_Click' },
      { line: 31, explanation: 'Credentials mismatch! Decrement remainingAttempts = 2.', variables: { remainingAttempts: 2 }, outputLog: 'Invalid credentials! 2 attempt(s) remaining.' },
      { line: 49, explanation: 'chkShowPass toggled -> set txtPass.PasswordChar = \\0 to show cleartext.', variables: { 'txtPass.PasswordChar': '\\0' }, outputLog: 'Password visibility toggled.' }
    ],
    simulatedOutput: [
      'Form Loaded: Admin Authentication Portal',
      'Attempt 1: user="admin", pass="wrong" -> Failed. Remaining: 2',
      'Attempt 2: user="admin", pass="admin@123" -> SUCCESS: Access Granted!',
      'Dashboard unlocked.'
    ],
    vsSteps: [
      { stepNumber: 1, title: 'Form Design', description: 'Place 2 Labels, 2 TextBoxes, 1 CheckBox ("Show Password"), 1 Button ("Login"), and status Labels.' },
      { stepNumber: 2, title: 'Set Password Properties', description: 'In Properties window for txtPass, set UseSystemPasswordChar = True or PasswordChar = *.' },
      { stepNumber: 3, title: 'Code Click Event', description: 'Double click btnLogin and implement attempt counting logic.' }
    ],
    vivaQuestions: [
      { question: 'How do you hide characters in a WinForms TextBox for passwords?', shortAnswer: 'By setting txtPassword.PasswordChar = \'*\' or txtPassword.UseSystemPasswordChar = true.', detailedAnswer: 'UseSystemPasswordChar matches the operating system standard bullet symbol, while PasswordChar allows setting a custom mask character like * or #.' }
    ],
    emulatorType: 'login-form'
  },
  {
    id: 14,
    title: 'GroupBox with Dynamic Form Background Color Selector',
    aim: 'To demonstrate GroupBox container control containing RadioButtons to dynamically change the form and label background colors at runtime.',
    module: 'Module 2: Windows Forms Controls',
    difficulty: 'Beginner',
    estimatedMinutes: 12,
    tags: ['WinForms', 'GroupBox', 'RadioButton', 'Color', 'Containers'],
    algorithm: [
      'Place a GroupBox titled \"Choose Background Theme\" on the Form.',
      'Place 4 RadioButtons inside the GroupBox: Crimson Red, Ocean Blue, Forest Green, Light Slate.',
      'In each RadioButton\'s `CheckedChanged` event handler, check if `rad.Checked == true`.',
      'Assign corresponding `Color` structure to `this.BackColor` or specific target panel.',
      'Update descriptive label displaying Hex Code and RGB values.'
    ],
    code: `using System;
using System.Drawing;
using System.Windows.Forms;

public partial class FormGroupColor : Form
{
    public FormGroupColor()
    {
        InitializeComponent();
    }

    private void radTheme_CheckedChanged(object sender, EventArgs e)
    {
        RadioButton rad = sender as RadioButton;
        if (rad != null && rad.Checked)
        {
            switch (rad.Text)
            {
                case "Ocean Blue":
                    this.BackColor = Color.FromArgb(220, 235, 252);
                    lblCurrentColor.Text = "Current Color: Ocean Blue (#DCEBFC)";
                    break;
                case "Forest Green":
                    this.BackColor = Color.FromArgb(220, 245, 225);
                    lblCurrentColor.Text = "Current Color: Forest Green (#DCF5E1)";
                    break;
                case "Crimson Sunset":
                    this.BackColor = Color.FromArgb(254, 226, 226);
                    lblCurrentColor.Text = "Current Color: Crimson Sunset (#FEE2E2)";
                    break;
                case "Dark Studio":
                    this.BackColor = Color.FromArgb(30, 41, 59);
                    this.ForeColor = Color.White;
                    lblCurrentColor.Text = "Current Color: Dark Studio (#1E293B)";
                    break;
            }
        }
    }
}`,
    codeExplanation: 'Demonstrates GroupBox as an exclusive grouping container for RadioButtons, using Color.FromArgb for custom palettes.',
    traceSteps: [
      { line: 13, explanation: 'User selects "Ocean Blue" RadioButton inside GroupBox.', variables: { 'rad.Text': '"Ocean Blue"', 'rad.Checked': true }, callStack: 'radTheme_CheckedChanged' },
      { line: 18, explanation: 'Assign this.BackColor = Color.FromArgb(220, 235, 252). Form instantly repaints.', variables: { 'this.BackColor': 'Ocean Blue' }, outputLog: 'Form background updated to Ocean Blue.' }
    ],
    simulatedOutput: [
      'Form Loaded: GroupBox Theme Selector',
      'Radio Selection: Ocean Blue -> BackColor set to RGB(220, 235, 252)',
      'Radio Selection: Dark Studio -> BackColor set to RGB(30, 41, 59)'
    ],
    vsSteps: [
      { stepNumber: 1, title: 'Add GroupBox', description: 'Drag GroupBox from Containers category in Toolbox onto Form.' },
      { stepNumber: 2, title: 'Add RadioButtons', description: 'Drag RadioButtons INSIDE the GroupBox boundaries.' },
      { stepNumber: 3, title: 'Attach Shared Event', description: 'Select all radio buttons and assign their CheckedChanged event to radTheme_CheckedChanged.' }
    ],
    vivaQuestions: [
      { question: 'Why is GroupBox called a Container Control?', shortAnswer: 'It visually and logically groups related controls together, ensuring RadioButtons inside it are mutually exclusive.', detailedAnswer: 'Controls inside a GroupBox move together when the GroupBox is dragged, and child controls inherit visibility and enabled state from the parent container.' }
    ],
    emulatorType: 'groupbox-theme'
  },
  {
    id: 15,
    title: 'ComboBox Cascading Countries & States Dropdown',
    aim: 'To populate a ComboBox with countries and dynamically load corresponding states/cities into a second ComboBox based on the selected country index.',
    module: 'Module 2: Windows Forms Controls',
    difficulty: 'Intermediate',
    estimatedMinutes: 15,
    tags: ['WinForms', 'ComboBox', 'SelectedIndexChanged', 'Data Binding', 'Cascading'],
    algorithm: [
      'Create Form with two ComboBoxes: `cmbCountry` and `cmbState`.',
      'In Form_Load, populate `cmbCountry` with "India", "USA", "UK", "Canada", "Australia".',
      'Handle `cmbCountry_SelectedIndexChanged` event.',
      'Clear `cmbState.Items.Clear();`.',
      'Use `switch` or dictionary lookup to load matching state names into `cmbState`.',
      'Enable `cmbState` and set `SelectedIndex = 0`.'
    ],
    code: `using System;
using System.Collections.Generic;
using System.Windows.Forms;

public partial class FormCascadingCombo : Form
{
    private Dictionary<string, string[]> stateDatabase = new Dictionary<string, string[]>
    {
        { "India", new string[] { "Karnataka", "Maharashtra", "Tamil Nadu", "Delhi", "Gujarat", "Kerala" } },
        { "United States", new string[] { "California", "Texas", "New York", "Florida", "Washington" } },
        { "United Kingdom", new string[] { "England", "Scotland", "Wales", "Northern Ireland" } },
        { "Canada", new string[] { "Ontario", "Quebec", "British Columbia", "Alberta" } }
    };

    public FormCascadingCombo()
    {
        InitializeComponent();
    }

    private void FormCascadingCombo_Load(object sender, EventArgs e)
    {
        cmbCountry.Items.Clear();
        foreach (var country in stateDatabase.Keys)
        {
            cmbCountry.Items.Add(country);
        }
        cmbCountry.SelectedIndex = 0; // Trigger initial cascade
    }

    private void cmbCountry_SelectedIndexChanged(object sender, EventArgs e)
    {
        string selectedCountry = cmbCountry.SelectedItem?.ToString();
        cmbState.Items.Clear();

        if (!string.IsNullOrEmpty(selectedCountry) && stateDatabase.ContainsKey(selectedCountry))
        {
            cmbState.Items.AddRange(stateDatabase[selectedCountry]);
            cmbState.Enabled = true;
            cmbState.SelectedIndex = 0;
        }
        else
        {
            cmbState.Enabled = false;
        }

        UpdateSelectionLabel();
    }

    private void cmbState_SelectedIndexChanged(object sender, EventArgs e)
    {
        UpdateSelectionLabel();
    }

    private void UpdateSelectionLabel()
    {
        lblResult.Text = $"Selected Location: {cmbState.SelectedItem}, {cmbCountry.SelectedItem}";
    }
}`,
    codeExplanation: 'Demonstrates cascading dropdown logic using SelectedIndexChanged event, Dictionary lookup, and Items.AddRange() method.',
    traceSteps: [
      { line: 26, explanation: 'Form_Load initializes cmbCountry with 4 country keys.', variables: { countriesCount: 4 }, callStack: 'Form_Load' },
      { line: 33, explanation: 'User selects "India" -> cmbCountry_SelectedIndexChanged fires.', variables: { selectedCountry: '"India"' }, callStack: 'cmbCountry_SelectedIndexChanged' },
      { line: 38, explanation: 'Load 6 Indian states (Karnataka, Maharashtra...) into cmbState.', variables: { 'cmbState.Items.Count': 6, 'cmbState.SelectedIndex': 0 }, outputLog: 'State dropdown populated with Indian states.' }
    ],
    simulatedOutput: [
      'Form Loaded: Cascading ComboBox Selector',
      'Country selected: India -> Loaded states: [Karnataka, Maharashtra, Tamil Nadu, Delhi, Gujarat, Kerala]',
      'Current Location: Karnataka, India'
    ],
    vsSteps: [
      { stepNumber: 1, title: 'Add ComboBox Controls', description: 'Add two ComboBoxes named cmbCountry and cmbState with DropDownStyle = DropDownList.' },
      { stepNumber: 2, title: 'Form Load Event', description: 'Double click Form background to generate Form_Load and populate cmbCountry.' },
      { stepNumber: 3, title: 'SelectedIndexChanged', description: 'Double click cmbCountry and add the dictionary lookup logic to populate cmbState.' }
    ],
    vivaQuestions: [
      { question: 'What is the difference between DropDown and DropDownList in ComboBox?', shortAnswer: 'DropDown allows the user to type custom text, while DropDownList restricts the user to selecting existing items only.', detailedAnswer: 'Setting DropDownStyle to ComboBoxStyle.DropDownList prevents arbitrary user typing, ensuring strict data integrity.' }
    ],
    emulatorType: 'combobox-cascading'
  },
  {
    id: 16,
    title: 'Standard Grid-Layout Calculator',
    aim: 'To design a fully functional WinForms Desktop Calculator with a numeric keypad, operations (+, -, *, /, %, âˆš), decimal handling, and clear/backspace buttons.',
    module: 'Module 2: Windows Forms Controls',
    difficulty: 'Intermediate',
    estimatedMinutes: 25,
    tags: ['WinForms', 'TableLayoutPanel', 'Calculator', 'State Machine', 'Arithmetic'],
    algorithm: [
      'Design Calculator UI with a display TextBox `txtDisplay` and button grid for digits 0-9 and operators.',
      'Maintain variables: `double operand1 = 0;`, `string operation = \"\";`, `bool isOperationPerformed = false;`.',
      'When digit button clicked: if `isOperationPerformed` is true, clear display and write digit; else append digit.',
      'When operator (+, -, *, /) clicked: store `operand1 = double.Parse(txtDisplay.Text);`, store operator, set `isOperationPerformed = true`.',
      'When \'=\' clicked: evaluate result based on stored operator and display result.',
      'Support square root (âˆš) and percentage (%) operations immediately.'
    ],
    code: `using System;
using System.Windows.Forms;

public partial class FormCalculator : Form
{
    private double resultValue = 0;
    private string operationPerformed = "";
    private bool isOperationClicked = false;

    public FormCalculator()
    {
        InitializeComponent();
    }

    private void btnDigit_Click(object sender, EventArgs e)
    {
        Button btn = (Button)sender;

        if (txtDisplay.Text == "0" || isOperationClicked)
            txtDisplay.Clear();

        isOperationClicked = false;

        if (btn.Text == ".")
        {
            if (!txtDisplay.Text.Contains("."))
                txtDisplay.Text += ".";
        }
        else
        {
            txtDisplay.Text += btn.Text;
        }
    }

    private void btnOperator_Click(object sender, EventArgs e)
    {
        Button btn = (Button)sender;

        if (resultValue != 0)
        {
            btnEquals_Click(sender, e);
            operationPerformed = btn.Text;
            isOperationClicked = true;
        }
        else
        {
            operationPerformed = btn.Text;
            resultValue = double.Parse(txtDisplay.Text);
            isOperationClicked = true;
        }
        lblEquation.Text = $"{resultValue} {operationPerformed}";
    }

    private void btnEquals_Click(object sender, EventArgs e)
    {
        double secondOperand = double.Parse(txtDisplay.Text);

        switch (operationPerformed)
        {
            case "+": txtDisplay.Text = (resultValue + secondOperand).ToString(); break;
            case "-": txtDisplay.Text = (resultValue - secondOperand).ToString(); break;
            case "Ã—": txtDisplay.Text = (resultValue * secondOperand).ToString(); break;
            case "Ã·":
                if (secondOperand == 0)
                {
                    MessageBox.Show("Cannot divide by Zero!", "Math Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                    txtDisplay.Text = "0";
                }
                else
                    txtDisplay.Text = (resultValue / secondOperand).ToString();
                break;
            case "%": txtDisplay.Text = (resultValue % secondOperand).ToString(); break;
        }

        lblEquation.Text = "";
        resultValue = 0;
        operationPerformed = "";
    }

    private void btnClear_Click(object sender, EventArgs e)
    {
        txtDisplay.Text = "0";
        resultValue = 0;
        operationPerformed = "";
        lblEquation.Text = "";
    }

    private void btnSqrt_Click(object sender, EventArgs e)
    {
        double val = double.Parse(txtDisplay.Text);
        if (val < 0)
        {
            MessageBox.Show("Invalid Input for Square Root!", "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            return;
        }
        txtDisplay.Text = Math.Sqrt(val).ToString();
    }
}`,
    codeExplanation: 'Implements an accumulator and single-register calculator logic. Shares unified btnDigit_Click and btnOperator_Click handlers across all keypad buttons.',
    traceSteps: [
      { line: 18, explanation: 'User clicks button "7" -> txtDisplay displays "7".', variables: { 'txtDisplay.Text': '"7"' }, callStack: 'btnDigit_Click' },
      { line: 36, explanation: 'User clicks "+" operator -> Store resultValue = 7, operation = "+".', variables: { resultValue: 7, operationPerformed: '"+"' }, callStack: 'btnOperator_Click' },
      { line: 18, explanation: 'User clicks button "8" -> txtDisplay displays "8".', variables: { 'txtDisplay.Text': '"8"' }, callStack: 'btnDigit_Click' },
      { line: 55, explanation: 'User clicks "=" -> evaluate 7 + 8 = 15.', variables: { result: 15 }, outputLog: 'txtDisplay updated to 15.' }
    ],
    simulatedOutput: [
      'Input: 7',
      'Operator: +',
      'Input: 8',
      'Equals: 7 + 8 = 15',
      'Square Root of 144 = 12'
    ],
    vsSteps: [
      { stepNumber: 1, title: 'Form and TableLayoutPanel', description: 'Add a TableLayoutPanel with 5 rows and 4 columns to create a clean button grid.' },
      { stepNumber: 2, title: 'Assign Shared Events', description: 'Assign all number buttons 0-9 to btnDigit_Click and arithmetic operators to btnOperator_Click.' },
      { stepNumber: 3, title: 'Add Display', description: 'Set TextBox txtDisplay: Font = Segoe UI 18pt, ReadOnly = True, TextAlign = Right.' }
    ],
    vivaQuestions: [
      { question: 'Why is it better to use a single event handler for all digit buttons in WinForms?', shortAnswer: 'It drastically reduces redundant code and centralizes UI handling through sender casting.', detailedAnswer: 'By casting (Button)sender in btnDigit_Click, one single method cleanly serves buttons 0 through 9.' }
    ],
    emulatorType: 'grid-calculator'
  },
  {
    id: 17,
    title: 'CheckBox Hobbies Selection to ListBox Transfer',
    aim: 'To write a Windows Forms program with multiple CheckBoxes representing hobbies and skills, transferring selected items into a ListBox with count tracking.',
    module: 'Module 2: Windows Forms Controls',
    difficulty: 'Beginner',
    estimatedMinutes: 15,
    tags: ['WinForms', 'CheckBox', 'ListBox', 'Items Collection', 'Dynamic List'],
    algorithm: [
      'Place CheckBoxes for hobbies: Coding, Chess, Photography, Swimming, Music, Reading.',
      'Place a ListBox `lstSelected` and a Button `btnTransfer` (\"Update Hobbies\").',
      'In `btnTransfer_Click`, clear `lstSelected.Items.Clear();`.',
      'Iterate through all CheckBoxes in the GroupBox; if `chk.Checked == true`, add `chk.Text` into ListBox.',
      'Display total count of selected hobbies in a Label.'
    ],
    code: `using System;
using System.Windows.Forms;

public partial class FormHobbies : Form
{
    public FormHobbies()
    {
        InitializeComponent();
    }

    private void btnUpdateHobbies_Click(object sender, EventArgs e)
    {
        lstSelectedHobbies.Items.Clear();

        // Check each checkbox status
        if (chkCoding.Checked) lstSelectedHobbies.Items.Add("ðŸ’» C# & Python Coding");
        if (chkChess.Checked) lstSelectedHobbies.Items.Add("â™Ÿï¸ Competitive Chess");
        if (chkPhoto.Checked) lstSelectedHobbies.Items.Add("ðŸ“· Digital Photography");
        if (chkMusic.Checked) lstSelectedHobbies.Items.Add("ðŸŽµ Music & Guitar");
        if (chkGaming.Checked) lstSelectedHobbies.Items.Add("ðŸŽ® Game Development");
        if (chkReading.Checked) lstSelectedHobbies.Items.Add("ðŸ“š Technical Books");

        lblCount.Text = $"Total Hobbies Selected: {lstSelectedHobbies.Items.Count}";

        if (lstSelectedHobbies.Items.Count == 0)
        {
            MessageBox.Show("No hobbies were selected!", "Notice", MessageBoxButtons.OK, MessageBoxIcon.Information);
        }
    }

    private void btnRemoveSelected_Click(object sender, EventArgs e)
    {
        if (lstSelectedHobbies.SelectedIndex != -1)
        {
            lstSelectedHobbies.Items.RemoveAt(lstSelectedHobbies.SelectedIndex);
            lblCount.Text = $"Total Hobbies Selected: {lstSelectedHobbies.Items.Count}";
        }
    }

    private void btnSelectAll_Click(object sender, EventArgs e)
    {
        chkCoding.Checked = true;
        chkChess.Checked = true;
        chkPhoto.Checked = true;
        chkMusic.Checked = true;
        chkGaming.Checked = true;
        chkReading.Checked = true;
    }
}`,
    codeExplanation: 'Illustrates multi-select input via CheckBoxes and managing the System.Windows.Forms.ListBox.ObjectCollection.',
    traceSteps: [
      { line: 15, explanation: 'User checks Coding, Chess, Music. Click Update.', variables: { checkedCount: 3 }, callStack: 'btnUpdateHobbies_Click' },
      { line: 24, explanation: 'ListBox items collection receives 3 items.', variables: { 'lstSelectedHobbies.Items.Count': 3 }, outputLog: 'Updated ListBox with 3 hobbies.' }
    ],
    simulatedOutput: [
      'Form Loaded: Hobbies Collector',
      'Checked: Coding, Music, Gaming',
      'ListBox populated with 3 items.',
      'Total Hobbies Selected: 3'
    ],
    vsSteps: [
      { stepNumber: 1, title: 'Place CheckBoxes in GroupBox', description: 'Add 6 CheckBoxes inside a GroupBox named "Choose Interests".' },
      { stepNumber: 2, title: 'Add ListBox and Buttons', description: 'Add ListBox lstSelectedHobbies and Buttons (Update, Remove Selected, Select All).' },
      { stepNumber: 3, title: 'Execute Transfer', description: 'Add items to ListBox on button click.' }
    ],
    vivaQuestions: [
      { question: 'What is the main functional difference between RadioButtons and CheckBoxes?', shortAnswer: 'RadioButtons are mutually exclusive within a container (only one can be chosen); CheckBoxes allow multiple independent selections.', detailedAnswer: 'RadioButtons represent single choice logic (e.g. Gender, Marital Status), while CheckBoxes represent independent boolean toggles (e.g. Hobbies, Feature Flags).' }
    ],
    emulatorType: 'checkbox-hobbies'
  },
  {
    id: 18,
    title: 'Odd and Even Number Splitter into Dual ListBoxes',
    aim: 'To take a list of integers from a user, process them sequentially, and split them into two separate ListBoxes: one for Odd numbers and one for Even numbers with sum totals.',
    module: 'Module 2: Windows Forms Controls',
    difficulty: 'Beginner',
    estimatedMinutes: 15,
    tags: ['WinForms', 'ListBox', 'Modulo Logic', 'Data Separation', 'Collections'],
    algorithm: [
      'Design Form with TextBox `txtNumberInput`, Button `btnAdd`, Button `btnSplit`, ListBox `lstAll`, ListBox `lstEven`, ListBox `lstOdd`.',
      'When `btnAdd` clicked: validate integer and add into `lstAll`.',
      'When `btnSplit` clicked: clear `lstEven` and `lstOdd`.',
      'Loop through each item in `lstAll.Items`: if `item % 2 == 0`, add to `lstEven` else add to `lstOdd`.',
      'Calculate and display sums and counts for both odd and even lists.'
    ],
    code: `using System;
using System.Windows.Forms;

public partial class FormOddEvenSplitter : Form
{
    public FormOddEvenSplitter()
    {
        InitializeComponent();
    }

    private void btnAdd_Click(object sender, EventArgs e)
    {
        if (int.TryParse(txtNumber.Text.Trim(), out int num))
        {
            lstAllNumbers.Items.Add(num);
            txtNumber.Clear();
            txtNumber.Focus();
        }
        else
        {
            MessageBox.Show("Please enter a valid integer!", "Invalid Input", MessageBoxButtons.OK, MessageBoxIcon.Warning);
        }
    }

    private void btnSplit_Click(object sender, EventArgs e)
    {
        lstEven.Items.Clear();
        lstOdd.Items.Clear();

        int evenSum = 0, oddSum = 0;

        foreach (var item in lstAllNumbers.Items)
        {
            int val = Convert.ToInt32(item);
            if (val % 2 == 0)
            {
                lstEven.Items.Add(val);
                evenSum += val;
            }
            else
            {
                lstOdd.Items.Add(val);
                oddSum += val;
            }
        }

        lblEvenSummary.Text = $"Even Count: {lstEven.Items.Count} | Sum: {evenSum}";
        lblOddSummary.Text = $"Odd Count: {lstOdd.Items.Count} | Sum: {oddSum}";
    }

    private void btnClearAll_Click(object sender, EventArgs e)
    {
        lstAllNumbers.Items.Clear();
        lstEven.Items.Clear();
        lstOdd.Items.Clear();
        lblEvenSummary.Text = "Even Count: 0";
        lblOddSummary.Text = "Odd Count: 0";
    }
}`,
    codeExplanation: 'Iterates through ListBox items collection, performs modulo division val % 2 == 0, and dispatches integers into specialized target list controls.',
    traceSteps: [
      { line: 26, explanation: 'Begin split iteration over lstAllNumbers with 6 items: [12, 7, 24, 33, 50, 9].', variables: { totalItems: 6 }, callStack: 'btnSplit_Click' },
      { line: 31, explanation: 'Item 12 is Even -> lstEven.Items.Add(12), evenSum = 12.', variables: { evenSum: 12 }, callStack: 'btnSplit_Click' },
      { line: 36, explanation: 'Item 7 is Odd -> lstOdd.Items.Add(7), oddSum = 7.', variables: { oddSum: 7 }, callStack: 'btnSplit_Click' },
      { line: 43, explanation: 'Final summary: 3 Even numbers (sum=86), 3 Odd numbers (sum=49).', variables: { evenCount: 3, oddCount: 3 }, outputLog: 'Split complete.' }
    ],
    simulatedOutput: [
      'Input list: 12, 7, 24, 33, 50, 9',
      'Even List: [12, 24, 50] (Count: 3, Sum: 86)',
      'Odd List: [7, 33, 9] (Count: 3, Sum: 49)'
    ],
    vsSteps: [
      { stepNumber: 1, title: 'Form Layout', description: 'Place 3 ListBoxes: lstAllNumbers, lstEven, lstOdd with descriptive headers.' },
      { stepNumber: 2, title: 'Add Number Event', description: 'Use int.TryParse to safely add integers from TextBox.' },
      { stepNumber: 3, title: 'Split Logic', description: 'Iterate over items using foreach and modulo arithmetic.' }
    ],
    vivaQuestions: [
      { question: 'Why does ListBox.Items store objects rather than integers in WinForms?', shortAnswer: 'ListBox is a generalized control designed to bind any .NET object.', detailedAnswer: 'ListBox.Items is an ObjectCollection. When displaying, it calls the object\'s .ToString() method. We cast with Convert.ToInt32(item) to retrieve the raw numeric value.' }
    ],
    emulatorType: 'oddeven-listbox'
  },
  {
    id: 19,
    title: 'Word & Sentence Analyzer: Vowels, Words & Palindrome',
    aim: 'To create a WinForms text analysis application that computes total characters, word count, vowels, consonants, digits, special characters, and checks if text is a palindrome.',
    module: 'Module 2: Windows Forms Controls',
    difficulty: 'Intermediate',
    estimatedMinutes: 15,
    tags: ['WinForms', 'Char Analysis', 'LINQ', 'Palindrome', 'Vowels'],
    algorithm: [
      'Add multiline TextBox `txtInput` with `TextChanged` event or Analyze button.',
      'Count total characters and non-whitespace characters.',
      'Split words by whitespace characters and count.',
      'Iterate through characters: classify into Vowels (A, E, I, O, U), Consonants, Digits, and Symbols.',
      'Check palindrome by comparing cleaned string with reversed character sequence.',
      'Render live progress bars and data grid/labels.'
    ],
    code: `using System;
using System.Linq;
using System.Windows.Forms;

public partial class FormTextAnalyzer : Form
{
    public FormTextAnalyzer()
    {
        InitializeComponent();
    }

    private void btnAnalyze_Click(object sender, EventArgs e)
    {
        string text = txtSource.Text;

        if (string.IsNullOrWhiteSpace(text))
        {
            MessageBox.Show("Please enter some text to analyze!", "Notice", MessageBoxButtons.OK, MessageBoxIcon.Information);
            return;
        }

        int charCount = text.Length;
        int vowels = 0, consonants = 0, digits = 0, spaces = 0, special = 0;
        string vowelSet = "aeiouAEIOU";

        foreach (char c in text)
        {
            if (char.IsLetter(c))
            {
                if (vowelSet.Contains(c)) vowels++;
                else consonants++;
            }
            else if (char.IsDigit(c)) digits++;
            else if (char.IsWhiteSpace(c)) spaces++;
            else special++;
        }

        string[] words = text.Split(new char[] { ' ', '\\t', '\\n', '\\r' }, StringSplitOptions.RemoveEmptyEntries);

        // Palindrome check (alphanumeric only)
        string clean = new string(text.Where(char.IsLetterOrDigit).Select(char.ToLower).ToArray());
        string reversed = new string(clean.Reverse().ToArray());
        bool isPalindrome = (clean.Length > 0 && clean == reversed);

        // Update Labels
        lblChars.Text = $"Total Characters: {charCount}";
        lblWords.Text = $"Word Count: {words.Length}";
        lblVowels.Text = $"Vowels: {vowels}";
        lblConsonants.Text = $"Consonants: {consonants}";
        lblDigits.Text = $"Digits: {digits}";
        lblSpecial.Text = $"Special Symbols: {special}";
        lblPalindrome.Text = $"Is Palindrome?: {(isPalindrome ? "YES (Palindrome)" : "NO")}";
    }
}`,
    codeExplanation: 'Combines char classification methods (char.IsLetter, char.IsDigit) with LINQ queries for palindrome detection.',
    traceSteps: [
      { line: 13, explanation: 'Analyze string: "A man, a plan, a canal: Panama!".', variables: { length: 30 }, callStack: 'btnAnalyze_Click' },
      { line: 36, explanation: 'Extract cleaned alphanumeric: "amanaplanacanalpanama".', variables: { clean: '"amanaplanacanalpanama"' }, callStack: 'btnAnalyze_Click' },
      { line: 38, explanation: 'Reversed matches clean -> isPalindrome = true.', variables: { isPalindrome: true, words: 8 }, outputLog: 'Analysis: 10 vowels, 11 consonants, Palindrome=TRUE' }
    ],
    simulatedOutput: [
      'Input: "A man, a plan, a canal: Panama!"',
      'Characters: 31 | Words: 8',
      'Vowels: 10 | Consonants: 11 | Special: 4',
      'Palindrome: YES'
    ],
    vsSteps: [
      { stepNumber: 1, title: 'Form Design', description: 'Place Multiline TextBox, Analyze Button, and a GroupBox containing analysis metrics.' },
      { stepNumber: 2, title: 'Wire Analysis Logic', description: 'Implement character-by-character classification and LINQ reverse check.' }
    ],
    vivaQuestions: [
      { question: 'What is char.IsLetterOrDigit used for in C#?', shortAnswer: 'It returns true if the character is categorized as a Unicode letter or decimal digit.', detailedAnswer: 'It filters out punctuation, whitespace, and symbols, which is crucial for authentic grammatical palindrome checks.' }
    ],
    emulatorType: 'palindrome-analyzer'
  },
  {
    id: 20,
    title: 'Dynamic To-Do Task Manager with Priorities',
    aim: 'To develop a desktop To-Do List Application in WinForms allowing users to add tasks with priority (High, Medium, Low), mark as completed, delete, and clear all.',
    module: 'Module 2: Windows Forms Controls',
    difficulty: 'Intermediate',
    estimatedMinutes: 20,
    tags: ['WinForms', 'CheckedListBox', 'Task Management', 'CRUD', 'UI State'],
    algorithm: [
      'Add TextBox `txtTask`, ComboBox `cmbPriority` (High, Medium, Low), and CheckedListBox `clbTasks`.',
      'Add Buttons: Add Task, Remove Selected, Mark Done, Clear All.',
      'When Add Task clicked: validate task text; append formatted string `\"[HIGH] Finish C# Lab\"` into `clbTasks.Items`.',
      'When item checked in `clbTasks.ItemCheck`, update completed counter.',
      'When Remove clicked, remove checked items from collection.'
    ],
    code: `using System;
using System.Windows.Forms;

public partial class FormTaskManager : Form
{
    public FormTaskManager()
    {
        InitializeComponent();
        cmbPriority.SelectedIndex = 1; // Default: Medium
    }

    private void btnAddTask_Click(object sender, EventArgs e)
    {
        string task = txtTask.Text.Trim();
        if (string.IsNullOrEmpty(task))
        {
            MessageBox.Show("Please enter a task description!", "Empty Task", MessageBoxButtons.OK, MessageBoxIcon.Warning);
            return;
        }

        string priority = cmbPriority.SelectedItem.ToString();
        string badge = priority == "High" ? "ðŸ”´ [HIGH]" : (priority == "Medium" ? "ðŸŸ¡ [MED]" : "ðŸŸ¢ [LOW]");

        clbTasks.Items.Add($"{badge} {task}", false);
        txtTask.Clear();
        txtTask.Focus();
        UpdateProgress();
    }

    private void btnRemoveSelected_Click(object sender, EventArgs e)
    {
        for (int i = clbTasks.CheckedIndices.Count - 1; i >= 0; i--)
        {
            clbTasks.Items.RemoveAt(clbTasks.CheckedIndices[i]);
        }
        UpdateProgress();
    }

    private void clbTasks_ItemCheck(object sender, ItemCheckEventArgs e)
    {
        this.BeginInvoke((MethodInvoker)delegate { UpdateProgress(); });
    }

    private void UpdateProgress()
    {
        int total = clbTasks.Items.Count;
        int completed = clbTasks.CheckedItems.Count;
        lblStats.Text = $"Completed: {completed} / {total} Tasks";
        prgTasks.Value = total > 0 ? (int)((completed / (double)total) * 100) : 0;
    }
}`,
    codeExplanation: 'Uses CheckedListBox control, manages dynamic item removals from highest index downwards to prevent index shifting errors, and updates a visual ProgressBar.',
    traceSteps: [
      { line: 15, explanation: 'Add task "[HIGH] Complete ADO.NET Assignment".', variables: { 'clbTasks.Items.Count': 1 }, callStack: 'btnAddTask_Click' },
      { line: 36, explanation: 'User checks 1 task -> ItemCheck event updates progress bar to 100%.', variables: { completed: 1, total: 1, progress: 100 }, outputLog: 'Progress: 1/1 Completed.' }
    ],
    simulatedOutput: [
      'Task Added: ðŸ”´ [HIGH] Complete ADO.NET Assignment',
      'Task Added: ðŸŸ¡ [MED] Review Crystal Reports',
      'Checked: 1 task complete -> Progress: 50%'
    ],
    vsSteps: [
      { stepNumber: 1, title: 'Add CheckedListBox', description: 'Drag CheckedListBox clbTasks from Toolbox onto Form.' },
      { stepNumber: 2, title: 'Add Priority Dropdown', description: 'Add ComboBox with items High, Medium, Low.' },
      { stepNumber: 3, title: 'Wire Events', description: 'Code Add, Remove, and ItemCheck event handlers.' }
    ],
    vivaQuestions: [
      { question: 'Why iterate backwards when deleting items from a ListBox by index?', shortAnswer: 'Deleting an item shifts the indexes of all subsequent items; iterating backwards preserves unvisited indices.', detailedAnswer: 'If you delete from index 0 forwards, index 1 becomes index 0, causing the next iteration to skip an item or throw ArgumentOutOfRangeException.' }
    ],
    emulatorType: 'todo-list'
  },
  {
    id: 21,
    title: 'RadioButtons Profile Questionnaire Form',
    aim: 'To construct an interactive profile survey form utilizing distinct GroupBoxes for Gender, Qualification, Employment Status, and Preferred Role with summary generation.',
    module: 'Module 2: Windows Forms Controls',
    difficulty: 'Beginner',
    estimatedMinutes: 15,
    tags: ['WinForms', 'RadioButton', 'Multiple GroupBoxes', 'Questionnaire', 'Survey'],
    algorithm: [
      'Place 3 GroupBoxes on Form: Group 1 (Gender), Group 2 (Education), Group 3 (Experience Level).',
      'Add respective RadioButtons inside each GroupBox.',
      'Add Submit Button `btnGenerateProfile`.',
      'In click handler, inspect `Checked` property for radio buttons in each group.',
      'Format full candidate profile and display in RichTextBox or MessageBox.'
    ],
    code: `using System;
using System.Windows.Forms;

public partial class FormSurvey : Form
{
    public FormSurvey()
    {
        InitializeComponent();
    }

    private void btnSubmit_Click(object sender, EventArgs e)
    {
        // 1. Gender Group
        string gender = radMale.Checked ? "Male" : (radFemale.Checked ? "Female" : (radOther.Checked ? "Other" : "Not Selected"));

        // 2. Education Group
        string education = "Not Selected";
        if (radBCA.Checked) education = "Bachelor of Computer Applications (BCA)";
        else if (radBTech.Checked) education = "B.Tech Computer Science";
        else if (radMCA.Checked) education = "Master of Computer Applications (MCA)";
        else if (radBSc.Checked) education = "B.Sc Information Technology";

        // 3. Experience Group
        string exp = radFresher.Checked ? "Fresher (0 Years)" : (radJunior.Checked ? "1 - 2 Years" : "3+ Years (Senior)");

        string profile = $"================ CANDIDATE PROFILE ================\\n" +
                         $"Candidate Name    : {txtName.Text}\\n" +
                         $"Gender            : {gender}\\n" +
                         $"Highest Degree    : {education}\\n" +
                         $"Experience Level  : {exp}\\n" +
                         $"Registered Date   : {DateTime.Now:dd-MM-yyyy HH:mm}\\n" +
                         $"===================================================";

        txtSummary.Text = profile;
    }
}`,
    codeExplanation: 'Demonstrates multiple independent RadioButton clusters by enclosing them inside dedicated GroupBox parent containers.',
    traceSteps: [
      { line: 13, explanation: 'Evaluate radFemale.Checked = true -> Gender = "Female".', variables: { gender: '"Female"' }, callStack: 'btnSubmit_Click' },
      { line: 17, explanation: 'Evaluate radBCA.Checked = true -> Education = "BCA".', variables: { education: '"BCA"' }, callStack: 'btnSubmit_Click' },
      { line: 24, explanation: 'Construct full profile card and populate txtSummary.', variables: { profileRendered: true }, outputLog: 'Profile generated successfully.' }
    ],
    simulatedOutput: [
      'Candidate Name: Sneha Sharma',
      'Gender: Female | Degree: BCA | Experience: Fresher (0 Years)',
      'Candidate Profile generated.'
    ],
    vsSteps: [
      { stepNumber: 1, title: 'Create GroupBoxes', description: 'Create 3 separate GroupBoxes on the Form.' },
      { stepNumber: 2, title: 'Nest RadioButtons', description: 'Place RadioButtons inside their corresponding GroupBox to ensure exclusivity.' },
      { stepNumber: 3, title: 'Generate Profile', description: 'Collect selections on Submit button click.' }
    ],
    vivaQuestions: [
      { question: 'How do you create two sets of mutually exclusive RadioButtons on the same Windows Form?', shortAnswer: 'By placing each set of RadioButtons inside separate container controls like GroupBox or Panel.', detailedAnswer: 'WinForms automatically makes all RadioButtons sharing the same direct parent container mutually exclusive.' }
    ],
    emulatorType: 'radio-questionnaire'
  },
  {
    id: 22,
    title: 'DateTimePicker & Age / Work Experience Calculator',
    aim: 'To build a Windows Form using the DateTimePicker control to select Date of Birth and calculate precise Age in Years, Months, and Days, along with Retirement countdown.',
    module: 'Module 3: Advanced Controls & GDI+',
    difficulty: 'Intermediate',
    estimatedMinutes: 15,
    tags: ['WinForms', 'DateTimePicker', 'DateTime', 'TimeSpan', 'Date Math'],
    algorithm: [
      'Add `DateTimePicker` control `dtpDOB` with `MaxDate = DateTime.Today`.',
      'Add Button `btnCalculateAge` and summary Labels.',
      'In click event: extract selected date `DateTime dob = dtpDOB.Value;`.',
      'Calculate difference between `DateTime.Today` and `dob`.',
      'Compute years, months, and days accurately accounting for leap years.',
      'Calculate approximate days left until 60th birthday (retirement age).'
    ],
    code: `using System;
using System.Windows.Forms;

public partial class FormAgeCalculator : Form
{
    public FormAgeCalculator()
    {
        InitializeComponent();
        dtpDOB.MaxDate = DateTime.Today;
    }

    private void btnCalculate_Click(object sender, EventArgs e)
    {
        DateTime dob = dtpDOB.Value.Date;
        DateTime today = DateTime.Today;

        if (dob > today)
        {
            MessageBox.Show("Date of birth cannot be in the future!", "Error", MessageBoxButtons.OK, MessageBoxIcon.Warning);
            return;
        }

        int years = today.Year - dob.Year;
        int months = today.Month - dob.Month;
        int days = today.Day - dob.Day;

        if (days < 0)
        {
            months--;
            days += DateTime.DaysInMonth(today.Year, (today.Month == 1 ? 12 : today.Month - 1));
        }
        if (months < 0)
        {
            years--;
            months += 12;
        }

        DateTime nextBirthday = dob.AddYears(years + 1);
        int daysToNextBirthday = (nextBirthday - today).Days;

        lblAgeResult.Text = $"Exact Age: {years} Years, {months} Months, {days} Days";
        lblNextBirthday.Text = $"Next Birthday in: {daysToNextBirthday} Days ({nextBirthday:dd-MMM-yyyy})";
        lblTotalDays.Text = $"Total Days Lived: {(today - dob).TotalDays:N0} Days";
    }
}`,
    codeExplanation: 'Demonstrates DateTimePicker control, DateTime arithmetic, TimeSpan calculation, and DaysInMonth leap-aware adjustments.',
    traceSteps: [
      { line: 13, explanation: 'Read selected DOB = 15-Aug-2003.', variables: { dob: '"2003-08-15"' }, callStack: 'btnCalculate_Click' },
      { line: 22, explanation: 'Compute age components: 22 Years, 7 Months, 3 Days.', variables: { years: 22, months: 7, days: 3 }, outputLog: 'Exact Age: 22 Years, 7 Months, 3 Days' }
    ],
    simulatedOutput: [
      'DOB Selected: 15-Aug-2003',
      'Exact Age: 22 Years, 7 Months, 3 Days',
      'Next Birthday in: 178 Days'
    ],
    vsSteps: [
      { stepNumber: 1, title: 'Add DateTimePicker', description: 'Drag DateTimePicker dtpDOB onto the Form. Set Format = Custom, CustomFormat = dd-MMM-yyyy.' },
      { stepNumber: 2, title: 'Calculate Age', description: 'Implement date subtraction and leap-year safe month handling in button click.' }
    ],
    vivaQuestions: [
      { question: 'What is the DateTimePicker.Format property used for in WinForms?', shortAnswer: 'It specifies how the date/time is visually displayed (Long, Short, Time, or Custom).', detailedAnswer: 'Setting Format to DateTimePickerFormat.Custom allows formatting patterns like "dd/MM/yyyy hh:mm tt".' }
    ],
    emulatorType: 'datetime-picker'
  },
  {
    id: 23,
    title: 'MonthCalendar & Date Interval Range Difference',
    aim: 'To implement a Leave / Event Interval Range Calculator using MonthCalendar control to select start/end dates and compute working days, weekends, and holidays.',
    module: 'Module 3: Advanced Controls & GDI+',
    difficulty: 'Intermediate',
    estimatedMinutes: 15,
    tags: ['WinForms', 'MonthCalendar', 'SelectionRange', 'Business Days', 'Calendar'],
    algorithm: [
      'Add `MonthCalendar` control `calRange` with `MaxSelectionCount = 60`.',
      'Handle `calRange.DateChanged` event.',
      'Retrieve `DateTime start = calRange.SelectionStart;` and `DateTime end = calRange.SelectionEnd;`.',
      'Count total calendar days, Saturday/Sunday weekends, and working business days.',
      'Display leave summary in a visual dashboard.'
    ],
    code: `using System;
using System.Windows.Forms;

public partial class FormCalendarDemo : Form
{
    public FormCalendarDemo()
    {
        InitializeComponent();
        calRange.MaxSelectionCount = 90;
    }

    private void calRange_DateChanged(object sender, DateRangeEventArgs e)
    {
        DateTime start = calRange.SelectionStart;
        DateTime end = calRange.SelectionEnd;

        int totalDays = (end - start).Days + 1;
        int businessDays = 0;
        int weekendDays = 0;

        for (DateTime date = start; date <= end; date = date.AddDays(1))
        {
            if (date.DayOfWeek == DayOfWeek.Saturday || date.DayOfWeek == DayOfWeek.Sunday)
                weekendDays++;
            else
                businessDays++;
        }

        lblStart.Text = $"From : {start:dd-MMM-yyyy}";
        lblEnd.Text = $"To   : {end:dd-MMM-yyyy}";
        lblTotal.Text = $"Total Duration  : {totalDays} Day(s)";
        lblBusiness.Text = $"Working Days    : {businessDays} Day(s)";
        lblWeekends.Text = $"Weekend Days    : {weekendDays} Day(s)";
    }
}`,
    codeExplanation: 'Leverages MonthCalendar SelectionStart and SelectionEnd properties with a day-by-day DayOfWeek inspection loop.',
    traceSteps: [
      { line: 13, explanation: 'User selects range: 10-Oct-2026 to 24-Oct-2026 (15 days).', variables: { totalDays: 15 }, callStack: 'calRange_DateChanged' },
      { line: 20, explanation: 'Count business days = 11, weekend days = 4.', variables: { businessDays: 11, weekendDays: 4 }, outputLog: 'Calculated 11 working days.' }
    ],
    simulatedOutput: [
      'Range Selected: 10-Oct-2026 to 24-Oct-2026',
      'Total Days: 15 | Working Days: 11 | Weekend Days: 4'
    ],
    vsSteps: [
      { stepNumber: 1, title: 'Add MonthCalendar', description: 'Add MonthCalendar calRange and set MaxSelectionCount = 90.' },
      { stepNumber: 2, title: 'Handle DateChanged', description: 'Double click MonthCalendar to generate DateChanged event.' }
    ],
    vivaQuestions: [
      { question: 'What property of MonthCalendar allows multi-day range selection?', shortAnswer: 'The MaxSelectionCount property (default is 7 days).', detailedAnswer: 'By increasing MaxSelectionCount, users can drag across weeks or months to select large date ranges.' }
    ],
    emulatorType: 'calendar-diff'
  },
  {
    id: 24,
    title: 'GDI+ 2D Shape Drawing: Circles, Rectangles & Brushes',
    aim: 'To build a GDI+ 2D Graphics Drawing Studio in Windows Forms that overrides the Form OnPaint method to render anti-aliased Circles, Rectangles, Ellipses, LinearGradientBrushes, and custom Pens.',
    module: 'Module 3: Advanced Controls & GDI+',
    difficulty: 'Advanced',
    estimatedMinutes: 20,
    tags: ['GDI+', 'System.Drawing', 'Graphics', 'Paint Event', 'Brushes & Pens'],
    algorithm: [
      'Create custom Panel or override Form `OnPaint(PaintEventArgs e)`.',
      'Obtain `Graphics g = e.Graphics;` and enable `SmoothingMode.AntiAlias`.',
      'Create `Pen` objects for stroked outlines and `SolidBrush`/`LinearGradientBrush` for filled shapes.',
      'Draw Rectangle using `g.DrawRectangle(pen, x, y, width, height)`.',
      'Draw and fill Ellipse/Circle using `g.FillEllipse(brush, ...)` and `g.DrawEllipse(...)`.',
      'Draw custom gradient banner and formatted text using `g.DrawString(...)`.',
      'Provide buttons to dynamically alter shape dimensions and trigger `this.Invalidate()`.'
    ],
    code: `using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Windows.Forms;

public partial class FormGdiDrawing : Form
{
    private string currentShape = "All";
    private Color strokeColor = Color.Blue;
    private Color fillColor = Color.LightSkyBlue;

    public FormGdiDrawing()
    {
        InitializeComponent();
        this.DoubleBuffered = true;
    }

    protected override void OnPaint(PaintEventArgs e)
    {
        base.OnPaint(e);
        Graphics g = e.Graphics;
        g.SmoothingMode = SmoothingMode.AntiAlias;

        using (Pen pen = new Pen(strokeColor, 3))
        using (SolidBrush brush = new SolidBrush(fillColor))
        {
            // 1. Draw Linear Gradient Header
            Rectangle headerRect = new Rectangle(20, 20, this.ClientSize.Width - 40, 50);
            using (LinearGradientBrush gradBrush = new LinearGradientBrush(headerRect, Color.DarkSlateBlue, Color.RoyalBlue, LinearGradientMode.Horizontal))
            {
                g.FillRectangle(gradBrush, headerRect);
                g.DrawString("GDI+ 2D VECTOR RENDERING ENGINE", new Font("Segoe UI", 12, FontStyle.Bold), Brushes.White, 35, 33);
            }

            // 2. Draw Shapes
            if (currentShape == "All" || currentShape == "Circle")
            {
                g.FillEllipse(brush, 40, 100, 120, 120);
                g.DrawEllipse(pen, 40, 100, 120, 120);
                g.DrawString("Circle (r=60)", this.Font, Brushes.Black, 60, 230);
            }

            if (currentShape == "All" || currentShape == "Rectangle")
            {
                g.FillRectangle(brush, 190, 100, 150, 120);
                g.DrawRectangle(pen, 190, 100, 150, 120);
                g.DrawString("Rectangle (150x120)", this.Font, Brushes.Black, 200, 230);
            }

            if (currentShape == "All" || currentShape == "Ellipse")
            {
                g.FillEllipse(brush, 370, 110, 160, 100);
                g.DrawEllipse(pen, 370, 110, 160, 100);
                g.DrawString("Ellipse (160x100)", this.Font, Brushes.Black, 400, 230);
            }
        }
    }

    private void btnShape_Click(object sender, EventArgs e)
    {
        Button btn = sender as Button;
        currentShape = btn.Text;
        this.Invalidate(); // Triggers OnPaint
    }
}`,
    codeExplanation: 'Uses System.Drawing.Graphics with DoubleBuffered rendering. Invalidate() schedules a redraw triggering the OnPaint event.',
    traceSteps: [
      { line: 20, explanation: 'OnPaint event triggered with Graphics context.', variables: { 'g.SmoothingMode': 'AntiAlias' }, callStack: 'OnPaint' },
      { line: 35, explanation: 'Draw anti-aliased Circle at (40, 100) with size 120x120.', variables: { shape: '"Circle"' }, outputLog: 'Rendered Circle.' },
      { line: 42, explanation: 'Draw Rectangle at (190, 100) with size 150x120.', variables: { shape: '"Rectangle"' }, outputLog: 'Rendered Rectangle.' }
    ],
    simulatedOutput: [
      'GDI+ Canvas Initialized: AntiAlias Active',
      'Rendered: Gradient Header Banner',
      'Rendered: Circle (r=60), Rectangle (150x120), Ellipse (160x100)'
    ],
    vsSteps: [
      { stepNumber: 1, title: 'Override OnPaint', description: 'In Form code, override protected override void OnPaint(PaintEventArgs e).' },
      { stepNumber: 2, title: 'Import Namespaces', description: 'Add using System.Drawing and using System.Drawing.Drawing2D;' },
      { stepNumber: 3, title: 'Use Invalidate()', description: 'When buttons change shape or color, call this.Invalidate() to force repainting.' }
    ],
    vivaQuestions: [
      { question: 'What is GDI+ in .NET and what is the role of the Invalidate() method?', shortAnswer: 'GDI+ is the 2D graphics subsystem; Invalidate() marks a region of the form as invalid and triggers the Paint event.', detailedAnswer: 'Invalidate() does not draw immediately; it posts a WM_PAINT message to Windows message queue, ensuring efficient batch rendering.' }
    ],
    emulatorType: 'gdi-shape-drawing'
  }
];


  // ==========================================
  // MODULE: practicalsPart3.js
  // ==========================================
const practicalsPart3 = [
  {
    id: 25,
    title: 'ColorDialog & FontDialog Live Typography Studio',
    aim: 'To integrate standard common dialog boxes (ColorDialog and FontDialog) allowing the user to customize font family, size, style, background, and foreground color of text controls dynamically.',
    module: 'Module 3: Advanced Controls & GDI+',
    difficulty: 'Intermediate',
    estimatedMinutes: 15,
    tags: ['WinForms', 'ColorDialog', 'FontDialog', 'Common Dialogs', 'Typography'],
    algorithm: [
      'Add ColorDialog `colorDlg` and FontDialog `fontDlg` components.',
      'Add Label or RichTextBox `lblPreview` with sample text.',
      'In `btnChangeFont_Click`: set `fontDlg.Font = lblPreview.Font;` and call `if (fontDlg.ShowDialog() == DialogResult.OK) lblPreview.Font = fontDlg.Font;`.',
      'In `btnTextColor_Click`: call `if (colorDlg.ShowDialog() == DialogResult.OK) lblPreview.ForeColor = colorDlg.Color;`.',
      'In `btnBgColor_Click`: assign `lblPreview.BackColor = colorDlg.Color;`.',
      'Display updated Font Name, Size, and Color Hex codes in status labels.'
    ],
    code: `using System;
using System.Drawing;
using System.Windows.Forms;

public partial class FormTypographyStudio : Form
{
    public FormTypographyStudio()
    {
        InitializeComponent();
    }

    private void btnChangeFont_Click(object sender, EventArgs e)
    {
        using (FontDialog fontDlg = new FontDialog())
        {
            fontDlg.ShowColor = true;
            fontDlg.Font = lblSampleText.Font;
            fontDlg.Color = lblSampleText.ForeColor;

            if (fontDlg.ShowDialog() == DialogResult.OK)
            {
                lblSampleText.Font = fontDlg.Font;
                lblSampleText.ForeColor = fontDlg.Color;
                UpdateFontInfo();
            }
        }
    }

    private void btnBgColor_Click(object sender, EventArgs e)
    {
        using (ColorDialog colorDlg = new ColorDialog())
        {
            colorDlg.FullOpen = true;
            colorDlg.Color = pnlPreview.BackColor;

            if (colorDlg.ShowDialog() == DialogResult.OK)
            {
                pnlPreview.BackColor = colorDlg.Color;
                lblBgHex.Text = $"Background: #{colorDlg.Color.R:X2}{colorDlg.Color.G:X2}{colorDlg.Color.B:X2}";
            }
        }
    }

    private void UpdateFontInfo()
    {
        Font f = lblSampleText.Font;
        lblFontInfo.Text = $"Font: {f.Name}, {f.SizeInPoints:0.#}pt ({(f.Bold ? "Bold " : "")}{(f.Italic ? "Italic" : "")})";
    }
}`,
    codeExplanation: 'Demonstrates modal common dialogs in WinForms. Modal dialogs suspend caller thread until user clicks OK or Cancel, returning DialogResult.',
    traceSteps: [
      { line: 15, explanation: 'Instantiate FontDialog and set initial font properties.', variables: { 'fontDlg.ShowColor': true }, callStack: 'btnChangeFont_Click' },
      { line: 21, explanation: 'User selects "Consolas, 16pt, Bold". fontDlg.ShowDialog() returns DialogResult.OK.', variables: { font: '"Consolas, 16pt, Bold"' }, callStack: 'btnChangeFont_Click' },
      { line: 23, explanation: 'Apply selected Font to lblSampleText and update status text.', variables: { applied: true }, outputLog: 'Applied Font: Consolas, 16pt Bold' }
    ],
    simulatedOutput: [
      'Font changed to: Consolas, 16pt, Bold',
      'Text Color changed to: Navy (#000080)',
      'Background Color changed to: Light Yellow (#FFFFE0)'
    ],
    vsSteps: [
      { stepNumber: 1, title: 'Add Dialog Components', description: 'Drag ColorDialog and FontDialog from Dialogs section in Toolbox onto the Form.' },
      { stepNumber: 2, title: 'ShowDialog() Check', description: 'Check if (dlg.ShowDialog() == DialogResult.OK) before assigning properties.' }
    ],
    vivaQuestions: [
      { question: 'What does ShowDialog() return in Windows Forms?', shortAnswer: 'It returns a DialogResult enum value indicating whether the user clicked OK, Cancel, Yes, No, or Abort.', detailedAnswer: 'Unlike .Show() which displays a modeless window, .ShowDialog() displays a modal dialog and blocks until closed.' }
    ],
    emulatorType: 'colordialog-fontdialog'
  },
  {
    id: 26,
    title: 'ImageList & TabControl Multi-tab Catalog',
    aim: 'To create a multi-tabbed interface using TabControl with attached ImageList icons to organize software modules (Dashboard, Students, Courses, Settings).',
    module: 'Module 3: Advanced Controls & GDI+',
    difficulty: 'Intermediate',
    estimatedMinutes: 15,
    tags: ['WinForms', 'TabControl', 'ImageList', 'TabPages', 'UI Organization'],
    algorithm: [
      'Add `ImageList` component `imgListIcons` with 4 icons (32x32).',
      'Add `TabControl` `tabControlMain` and set `ImageList = imgListIcons`.',
      'Create 4 TabPages: Dashboard, Students, Courses, System Settings.',
      'Assign `ImageIndex = 0, 1, 2, 3` to respective TabPages.',
      'Populate each TabPage with appropriate controls.',
      'Handle `SelectedIndexChanged` to update status bar.'
    ],
    code: `using System;
using System.Windows.Forms;

public partial class FormTabbedApp : Form
{
    public FormTabbedApp()
    {
        InitializeComponent();
    }

    private void tabControlMain_SelectedIndexChanged(object sender, EventArgs e)
    {
        TabPage currentTab = tabControlMain.SelectedTab;
        lblStatus.Text = $"Active View: {currentTab.Text} (Tab #{tabControlMain.SelectedIndex + 1})";
    }

    private void btnAddCustomTab_Click(object sender, EventArgs e)
    {
        string tabTitle = $"Report #{tabControlMain.TabPages.Count + 1}";
        TabPage newPage = new TabPage(tabTitle);
        newPage.ImageIndex = 0;

        Label lbl = new Label { Text = $"Dynamic Content for {tabTitle}", AutoSize = true, Location = new System.Drawing.Point(30, 30) };
        newPage.Controls.Add(lbl);

        tabControlMain.TabPages.Add(newPage);
        tabControlMain.SelectedTab = newPage;
    }
}`,
    codeExplanation: 'TabControl allows splitting dense UI into distinct visual pages. ImageList provides a shared sprite sheet of icons indexed by integers.',
    traceSteps: [
      { line: 12, explanation: 'User switches from "Dashboard" to "Students" tab.', variables: { selectedIndex: 1, tabText: '"Students"' }, callStack: 'tabControlMain_SelectedIndexChanged' },
      { line: 15, explanation: 'Update status label with active tab name.', variables: { status: '"Active View: Students"' }, outputLog: 'Switched to Students Tab.' }
    ],
    simulatedOutput: [
      'Form Loaded: Multi-tab Application',
      'Tab 1: Dashboard (Overview Metrics)',
      'Tab 2: Student Registry (Data Entry)',
      'Tab 3: Course Catalog (Subjects)'
    ],
    vsSteps: [
      { stepNumber: 1, title: 'Add ImageList & TabControl', description: 'Drag ImageList and TabControl onto Form. Set TabControl.ImageList property.' },
      { stepNumber: 2, title: 'Configure TabPages Collection', description: 'In TabControl Properties -> Click TabPages (Collection) -> Add pages and set Text and ImageIndex.' }
    ],
    vivaQuestions: [
      { question: 'What is an ImageList component used for in Windows Forms?', shortAnswer: 'It acts as a centralized image repository used to assign icons to TabControls, TreeViews, ListViews, and Toolbars.', detailedAnswer: 'ImageList stores Bitmap images in a zero-indexed collection with consistent dimensions (e.g., 16x16, 32x32).' }
    ],
    emulatorType: 'imagelist-tabcontrol'
  },
  {
    id: 27,
    title: 'TrackBar & ProgressBar Real-time Value Synchronization',
    aim: 'To synchronize a TrackBar slider control with a ProgressBar and dynamic numerical labels, demonstrating Scroll events and bound progress updates.',
    module: 'Module 3: Advanced Controls & GDI+',
    difficulty: 'Beginner',
    estimatedMinutes: 12,
    tags: ['WinForms', 'TrackBar', 'ProgressBar', 'Scroll Event', 'Synchronization'],
    algorithm: [
      'Add `TrackBar` `tbVolume` with Minimum = 0, Maximum = 100, TickFrequency = 10.',
      'Add `ProgressBar` `prgVolume` with Minimum = 0, Maximum = 100.',
      'Add numerical display Labels.',
      'Handle `tbVolume.Scroll` event.',
      'Set `prgVolume.Value = tbVolume.Value;`.',
      'Update label: $\"Volume Level: {tbVolume.Value}%\" with dynamic color coding.'
    ],
    code: `using System;
using System.Drawing;
using System.Windows.Forms;

public partial class FormTrackProgress : Form
{
    public FormTrackProgress()
    {
        InitializeComponent();
        trackBarLevel.Minimum = 0;
        trackBarLevel.Maximum = 100;
        progressBarLevel.Minimum = 0;
        progressBarLevel.Maximum = 100;
    }

    private void trackBarLevel_Scroll(object sender, EventArgs e)
    {
        int val = trackBarLevel.Value;
        progressBarLevel.Value = val;
        lblValue.Text = $"Level: {val}%";

        if (val < 40)
        {
            lblStatus.Text = "Status: Low / Quiet (Safe)";
            lblStatus.ForeColor = Color.DarkGreen;
        }
        else if (val < 75)
        {
            lblStatus.Text = "Status: Moderate / Optimal";
            lblStatus.ForeColor = Color.DarkOrange;
        }
        else
        {
            lblStatus.Text = "Status: High / Warning!";
            lblStatus.ForeColor = Color.Red;
        }
    }

    private void btnMute_Click(object sender, EventArgs e)
    {
        trackBarLevel.Value = 0;
        trackBarLevel_Scroll(sender, e);
    }
}`,
    codeExplanation: 'Handles the TrackBar.Scroll event, copying its Value property into ProgressBar.Value and updating dynamic thresholds.',
    traceSteps: [
      { line: 17, explanation: 'User drags TrackBar thumb to value 85.', variables: { 'trackBarLevel.Value': 85 }, callStack: 'trackBarLevel_Scroll' },
      { line: 19, explanation: 'Sync progressBarLevel.Value = 85. Status text becomes "High / Warning!".', variables: { 'progressBarLevel.Value': 85 }, outputLog: 'Synchronized value to 85%.' }
    ],
    simulatedOutput: [
      'TrackBar value dragged to 45 -> ProgressBar set to 45%',
      'TrackBar value dragged to 85 -> ProgressBar set to 85% (High Warning!)'
    ],
    vsSteps: [
      { stepNumber: 1, title: 'Add Controls', description: 'Add TrackBar trackBarLevel and ProgressBar progressBarLevel.' },
      { stepNumber: 2, title: 'Handle Scroll Event', description: 'Double click TrackBar to open trackBarLevel_Scroll handler.' }
    ],
    vivaQuestions: [
      { question: 'Which event of TrackBar is raised when the user moves the slider thumb?', shortAnswer: 'The Scroll event (or ValueChanged event).', detailedAnswer: 'Scroll fires continuously as the slider is dragged, providing real-time feedback; ValueChanged fires after the value changes.' }
    ],
    emulatorType: 'trackbar-progressbar'
  },
  {
    id: 28,
    title: 'High-Precision Digital Stopwatch & Countdown Timer',
    aim: 'To create a digital Stopwatch with Start, Pause, Reset, and Lap recording capabilities using System.Windows.Forms.Timer control.',
    module: 'Module 3: Advanced Controls & GDI+',
    difficulty: 'Intermediate',
    estimatedMinutes: 20,
    tags: ['WinForms', 'Timer Control', 'Stopwatch', 'Tick Event', 'DateTime'],
    algorithm: [
      'Add `System.Windows.Forms.Timer` `timerClock` with `Interval = 100` (100ms / 0.1s resolution).',
      'Declare `TimeSpan elapsedTime;` and `DateTime startTime;`.',
      'In `btnStart_Click`: `timerClock.Start();`.',
      'In `timerClock_Tick`: increment elapsed time and update display label `\"00:00:00.0\"`.',
      'In `btnLap_Click`: record current split timestamp into `lstLaps.Items`.',
      'In `btnReset_Click`: `timerClock.Stop();`, reset elapsed time to 0, clear laps.'
    ],
    code: `using System;
using System.Diagnostics;
using System.Windows.Forms;

public partial class FormStopwatch : Form
{
    private Stopwatch stopWatch = new Stopwatch();

    public FormStopwatch()
    {
        InitializeComponent();
        timerTick.Interval = 50; // 50ms refresh rate
    }

    private void btnStart_Click(object sender, EventArgs e)
    {
        stopWatch.Start();
        timerTick.Start();
        btnStart.Enabled = false;
        btnPause.Enabled = true;
    }

    private void btnPause_Click(object sender, EventArgs e)
    {
        stopWatch.Stop();
        timerTick.Stop();
        btnStart.Enabled = true;
        btnPause.Enabled = false;
    }

    private void btnReset_Click(object sender, EventArgs e)
    {
        stopWatch.Reset();
        timerTick.Stop();
        lblTimeDisplay.Text = "00:00:00.00";
        lstLaps.Items.Clear();
        btnStart.Enabled = true;
        btnPause.Enabled = false;
    }

    private void btnLap_Click(object sender, EventArgs e)
    {
        if (stopWatch.IsRunning)
        {
            TimeSpan ts = stopWatch.Elapsed;
            string lapStr = $"Lap #{lstLaps.Items.Count + 1:D2} - {ts.Minutes:D2}:{ts.Seconds:D2}.{ts.Milliseconds / 10:D2}";
            lstLaps.Items.Insert(0, lapStr);
        }
    }

    private void timerTick_Tick(object sender, EventArgs e)
    {
        TimeSpan ts = stopWatch.Elapsed;
        lblTimeDisplay.Text = $"{ts.Hours:D2}:{ts.Minutes:D2}:{ts.Seconds:D2}.{ts.Milliseconds / 10:D2}";
    }
}`,
    codeExplanation: 'Uses System.Diagnostics.Stopwatch for accurate timing combined with WinForms Timer.Tick for fluid UI label refreshing.',
    traceSteps: [
      { line: 17, explanation: 'btnStart clicked: stopWatch.Start() and timerTick.Start() activated.', variables: { isRunning: true }, callStack: 'btnStart_Click' },
      { line: 50, explanation: 'timerTick_Tick fires every 50ms: formats hours:minutes:seconds.millis.', variables: { elapsed: '"00:01:24.45"' }, outputLog: 'Display updated: 00:01:24.45' },
      { line: 42, explanation: 'User records Lap #01 at 00:01:24.45 into ListBox.', variables: { lapsCount: 1 }, outputLog: 'Lap recorded.' }
    ],
    simulatedOutput: [
      'Stopwatch Started...',
      'Tick: 00:00:15.30',
      'Lap #01 recorded: 00:00:15.30',
      'Stopwatch Paused at 00:00:45.10'
    ],
    vsSteps: [
      { stepNumber: 1, title: 'Add Timer Control', description: 'Drag Timer component from Components category onto Form tray. Set Interval = 50.' },
      { stepNumber: 2, title: 'Create Stopwatch Object', description: 'Instantiate System.Diagnostics.Stopwatch in Form class.' },
      { stepNumber: 3, title: 'Handle Tick Event', description: 'Double click Timer component to write timerTick_Tick UI update method.' }
    ],
    vivaQuestions: [
      { question: 'What does the Interval property of a WinForms Timer represent?', shortAnswer: 'The time in milliseconds between each Tick event (e.g. 1000 = 1 second).', detailedAnswer: 'The WinForms Timer runs on the UI thread, making it safe for updating labels and controls directly without cross-thread dispatchers.' }
    ],
    emulatorType: 'stopwatch-timer'
  },
  {
    id: 29,
    title: 'Windows File Explorer: TreeView & ListView Explorer',
    aim: 'To build a mini Windows File Explorer in C# WinForms using TreeView for directory hierarchy and ListView with Large/Small icons for file listings.',
    module: 'Module 3: Advanced Controls & GDI+',
    difficulty: 'Advanced',
    estimatedMinutes: 25,
    tags: ['WinForms', 'TreeView', 'ListView', 'File System', 'TreeNode'],
    algorithm: [
      'Place `TreeView` `tvFolders` on left split panel and `ListView` `lvFiles` on right.',
      'Populate TreeView root nodes with virtual drive and folders (C:\\, D:\\, Documents, Projects).',
      'Handle `tvFolders.AfterSelect` event.',
      'Clear `lvFiles.Items.Clear();`.',
      'Add child files matching the selected directory node with file size, modified date, and icon.',
      'Provide buttons to toggle ListView View mode: Details, LargeIcon, SmallIcon, List.'
    ],
    code: `using System;
using System.IO;
using System.Windows.Forms;

public partial class FormFileExplorer : Form
{
    public FormFileExplorer()
    {
        InitializeComponent();
    }

    private void FormFileExplorer_Load(object sender, EventArgs e)
    {
        // Setup TreeView Drives
        TreeNode rootNode = new TreeNode("Local Disk (C:)", 0, 0);
        rootNode.Nodes.Add("BCA_Projects", "BCA_Projects", 1, 1);
        rootNode.Nodes.Add("Lab_Manuals", "Lab_Manuals", 1, 1);
        rootNode.Nodes.Add("Database_Dumps", "Database_Dumps", 1, 1);
        rootNode.Nodes.Add("Visual_Studio_Work", "Visual_Studio_Work", 1, 1);

        tvFolders.Nodes.Add(rootNode);
        rootNode.Expand();
    }

    private void tvFolders_AfterSelect(object sender, TreeViewEventArgs e)
    {
        lvFiles.Items.Clear();
        string selectedPath = e.Node.FullPath;
        lblCurrentPath.Text = $"Path: {selectedPath}";

        // Simulated file items for selected directory
        if (e.Node.Text == "BCA_Projects")
        {
            AddFileItem("CSharp_Calculator.sln", "Visual Studio Solution", "45 KB", "18-Oct-2026", 2);
            AddFileItem("EmployeeCRUD_App.cs", "C# Source File", "12 KB", "15-Oct-2026", 3);
            AddFileItem("App_Database.mdf", "SQL Database File", "8,192 KB", "10-Oct-2026", 4);
        }
        else if (e.Node.Text == "Lab_Manuals")
        {
            AddFileItem("BCA_Sem5_CSharp_Manual.pdf", "PDF Document", "1,450 KB", "01-Oct-2026", 5);
            AddFileItem("Viva_Questions_Bank.docx", "Word Document", "320 KB", "05-Oct-2026", 6);
        }
    }

    private void AddFileItem(string name, string type, string size, string modified, int iconIdx)
    {
        ListViewItem item = new ListViewItem(name, iconIdx);
        item.SubItems.Add(type);
        item.SubItems.Add(size);
        item.SubItems.Add(modified);
        lvFiles.Items.Add(item);
    }

    private void btnViewDetails_Click(object sender, EventArgs e) => lvFiles.View = View.Details;
    private void btnViewIcons_Click(object sender, EventArgs e) => lvFiles.View = View.LargeIcon;
}`,
    codeExplanation: 'Demonstrates TreeView hierarchy (TreeNode, Nodes collection, AfterSelect event) synchronized with multi-column ListView items.',
    traceSteps: [
      { line: 25, explanation: 'User selects TreeView node "BCA_Projects".', variables: { 'e.Node.Text': '"BCA_Projects"' }, callStack: 'tvFolders_AfterSelect' },
      { line: 31, explanation: 'Populate ListView with 3 items (CSharp_Calculator.sln, EmployeeCRUD_App.cs...).', variables: { 'lvFiles.Items.Count': 3 }, outputLog: 'Loaded 3 files into ListView.' }
    ],
    simulatedOutput: [
      'Folder selected: C:\\BCA_Projects',
      'Files listed: CSharp_Calculator.sln (45 KB), EmployeeCRUD_App.cs (12 KB), App_Database.mdf (8 MB)'
    ],
    vsSteps: [
      { stepNumber: 1, title: 'Add SplitContainer', description: 'Add a SplitContainer to divide Form into left TreeView and right ListView.' },
      { stepNumber: 2, title: 'Configure ListView Columns', description: 'In ListView Columns collection, add Name, Type, Size, and Date Modified.' },
      { stepNumber: 3, title: 'Wire AfterSelect', description: 'Handle TreeView AfterSelect to dynamically populate ListView.' }
    ],
    vivaQuestions: [
      { question: 'What is the difference between TreeView and ListView in WinForms?', shortAnswer: 'TreeView displays hierarchical parent-child relationships; ListView displays flat items with columns or icons.', detailedAnswer: 'TreeView uses TreeNodes; ListView supports views like Details, LargeIcon, SmallIcon, List, and Tile.' }
    ],
    emulatorType: 'treeview-listview'
  },
  {
    id: 30,
    title: 'ContextMenuStrip Right-Click Action Palette for ListBox',
    aim: 'To attach a context pop-up menu (ContextMenuStrip) to a ListBox providing right-click actions: Edit Item, Delete Item, Uppercase, and Clear All.',
    module: 'Module 3: Advanced Controls & GDI+',
    difficulty: 'Intermediate',
    estimatedMinutes: 15,
    tags: ['WinForms', 'ContextMenuStrip', 'Right Click', 'Popups', 'ListBox Edit'],
    algorithm: [
      'Add `ContextMenuStrip` `contextMenuActions` with menu items: \"Uppercase\", \"Duplicate Item\", \"Delete Item\", \"Clear All\".',
      'Assign `lstStudents.ContextMenuStrip = contextMenuActions;`.',
      'Handle `Opening` event to disable Delete if no item is selected.',
      'In Delete click: `lstStudents.Items.RemoveAt(lstStudents.SelectedIndex);`.',
      'In Uppercase click: `lstStudents.Items[idx] = lstStudents.Items[idx].ToString().ToUpper();`.'
    ],
    code: `using System;
using System.Windows.Forms;

public partial class FormContextMenuDemo : Form
{
    public FormContextMenuDemo()
    {
        InitializeComponent();
        lstItems.ContextMenuStrip = contextMenuPalette;
    }

    private void contextMenuPalette_Opening(object sender, System.ComponentModel.CancelEventArgs e)
    {
        bool hasSelection = lstItems.SelectedIndex != -1;
        menuDelete.Enabled = hasSelection;
        menuUppercase.Enabled = hasSelection;
        menuDuplicate.Enabled = hasSelection;
    }

    private void menuUppercase_Click(object sender, EventArgs e)
    {
        if (lstItems.SelectedIndex != -1)
        {
            int idx = lstItems.SelectedIndex;
            lstItems.Items[idx] = lstItems.Items[idx].ToString().ToUpper();
        }
    }

    private void menuDuplicate_Click(object sender, EventArgs e)
    {
        if (lstItems.SelectedIndex != -1)
        {
            lstItems.Items.Add(lstItems.SelectedItem.ToString() + " (Copy)");
        }
    }

    private void menuDelete_Click(object sender, EventArgs e)
    {
        if (lstItems.SelectedIndex != -1)
        {
            lstItems.Items.RemoveAt(lstItems.SelectedIndex);
        }
    }

    private void menuClearAll_Click(object sender, EventArgs e)
    {
        lstItems.Items.Clear();
    }
}`,
    codeExplanation: 'Demonstrates ContextMenuStrip binding to controls, the Opening lifecycle event to validate menu item enablement, and manipulating target collections.',
    traceSteps: [
      { line: 14, explanation: 'Right click on ListBox triggers contextMenuPalette_Opening event.', variables: { hasSelection: true }, callStack: 'contextMenuPalette_Opening' },
      { line: 25, explanation: 'User clicks "Uppercase" -> transforms selected item to uppercase.', variables: { updatedText: '"DATABASE MANAGEMENT SYSTEM"' }, outputLog: 'Item text transformed to uppercase.' }
    ],
    simulatedOutput: [
      'Right clicked on "Data Structures"',
      'ContextMenu popup opened with 4 actions.',
      'Action selected: Uppercase -> Text updated to DATA STRUCTURES'
    ],
    vsSteps: [
      { stepNumber: 1, title: 'Add ContextMenuStrip', description: 'Drag ContextMenuStrip from Menus & Toolbars category onto Form.' },
      { stepNumber: 2, title: 'Assign to Control', description: 'In ListBox properties, set ContextMenuStrip = contextMenuPalette.' },
      { stepNumber: 3, title: 'Handle Menu Item Clicks', description: 'Double click menu items in designer to write click handlers.' }
    ],
    vivaQuestions: [
      { question: 'How is ContextMenuStrip different from MenuStrip in WinForms?', shortAnswer: 'MenuStrip sits docked at the top as the main application menu bar; ContextMenuStrip appears at cursor location on right-click.', detailedAnswer: 'Controls have a ContextMenuStrip property allowing distinct custom popup menus per control.' }
    ],
    emulatorType: 'context-menu'
  },
  {
    id: 31,
    title: 'MDI (Multiple Document Interface) Image & Text Viewer',
    aim: 'To develop an MDI Parent Form capable of spawning and managing multiple child document forms (MDI Children), including Window Cascade, Tile Horizontal, and Tile Vertical arrangements.',
    module: 'Module 3: Advanced Controls & GDI+',
    difficulty: 'Advanced',
    estimatedMinutes: 20,
    tags: ['WinForms', 'MDI', 'IsMdiContainer', 'MdiParent', 'Layout'],
    algorithm: [
      'Create Parent Form `FormMdiParent` and set property `IsMdiContainer = true`.',
      'Add `MenuStrip` with File (New Document, Open Image, Exit) and Window (Cascade, Tile Horizontal, Tile Vertical).',
      'In `New Document` click: create child `FormChildDoc child = new FormChildDoc(); child.MdiParent = this; child.Show();`.',
      'In `Cascade` click: invoke `this.LayoutMdi(MdiLayout.Cascade);`.',
      'In `Tile Horizontal` click: invoke `this.LayoutMdi(MdiLayout.TileHorizontal);`.'
    ],
    code: `using System;
using System.Drawing;
using System.Windows.Forms;

public partial class FormMdiParent : Form
{
    private int documentCount = 0;

    public FormMdiParent()
    {
        InitializeComponent();
        this.IsMdiContainer = true;
    }

    private void menuNewText_Click(object sender, EventArgs e)
    {
        documentCount++;
        Form child = new Form();
        child.Text = $"Document #{documentCount}";
        child.MdiParent = this;

        RichTextBox rtb = new RichTextBox { Dock = DockStyle.Fill };
        child.Controls.Add(rtb);

        child.Show();
    }

    private void menuCascade_Click(object sender, EventArgs e)
    {
        this.LayoutMdi(MdiLayout.Cascade);
    }

    private void menuTileHorizontal_Click(object sender, EventArgs e)
    {
        this.LayoutMdi(MdiLayout.TileHorizontal);
    }

    private void menuTileVertical_Click(object sender, EventArgs e)
    {
        this.LayoutMdi(MdiLayout.TileVertical);
    }

    private void menuCloseAll_Click(object sender, EventArgs e)
    {
        foreach (Form child in this.MdiChildren)
        {
            child.Close();
        }
    }
}`,
    codeExplanation: 'Illustrates MDI architectures where child forms are constrained within the parent canvas. LayoutMdi handles window tile geometries.',
    traceSteps: [
      { line: 17, explanation: 'Spawn Child Document #1: child.MdiParent = this; child.Show();', variables: { 'MdiChildren.Length': 1 }, callStack: 'menuNewText_Click' },
      { line: 28, explanation: 'User clicks Window -> Cascade. Invoke this.LayoutMdi(MdiLayout.Cascade).', variables: { layout: 'Cascade' }, outputLog: 'Cascaded MDI child windows.' }
    ],
    simulatedOutput: [
      'MDI Parent Container Loaded.',
      'Created Child 1: Document #1',
      'Created Child 2: Document #2',
      'Layout applied: Cascade Windows'
    ],
    vsSteps: [
      { stepNumber: 1, title: 'Enable IsMdiContainer', description: 'In Main Form Properties, set IsMdiContainer = True.' },
      { stepNumber: 2, title: 'Add MenuStrip', description: 'Add File and Window menus with New, Cascade, Tile Horizontal, and Tile Vertical.' },
      { stepNumber: 3, title: 'Set child.MdiParent', description: 'Assign child.MdiParent = this before calling child.Show().' }
    ],
    vivaQuestions: [
      { question: 'What property transforms a standard Windows Form into an MDI Container?', shortAnswer: 'The IsMdiContainer boolean property (set to true).', detailedAnswer: 'Setting IsMdiContainer = true adds an MdiClient control to the form canvas, clipping all child forms inside its boundaries.' }
    ],
    emulatorType: 'mdi-viewer'
  },
  {
    id: 32,
    title: 'RichTextBox Full-featured WordPad Mini Editor',
    aim: 'To develop a mini Rich Text Editor in C# WinForms supporting formatting (Bold, Italic, Underline), font family, font size, bullet points, text alignment, and Save/Open RTF files.',
    module: 'Module 3: Advanced Controls & GDI+',
    difficulty: 'Advanced',
    estimatedMinutes: 25,
    tags: ['WinForms', 'RichTextBox', 'RTF Formatting', 'SaveFileDialog', 'OpenFileDialog'],
    algorithm: [
      'Add `RichTextBox` `rtbDoc` with `Dock = DockStyle.Fill`.',
      'Add ToolStrip with buttons: Bold, Italic, Underline, Font ComboBox, Color, Bullets, Open, Save.',
      'When Bold clicked: check `rtbDoc.SelectionFont.Style`; toggle `FontStyle.Bold` using bitwise XOR `^`.',
      'When Save clicked: use `SaveFileDialog` with filter `\"RTF Files (*.rtf)|*.rtf\"` and call `rtbDoc.SaveFile(dlg.FileName, RichTextBoxStreamType.RichText);`.',
      'When Open clicked: call `rtbDoc.LoadFile(dlg.FileName, RichTextBoxStreamType.RichText);`.'
    ],
    code: `using System;
using System.Drawing;
using System.Windows.Forms;

public partial class FormMiniWordPad : Form
{
    public FormMiniWordPad()
    {
        InitializeComponent();
    }

    private void btnBold_Click(object sender, EventArgs e)
    {
        ToggleFontStyle(FontStyle.Bold);
    }

    private void btnItalic_Click(object sender, EventArgs e)
    {
        ToggleFontStyle(FontStyle.Italic);
    }

    private void btnUnderline_Click(object sender, EventArgs e)
    {
        ToggleFontStyle(FontStyle.Underline);
    }

    private void ToggleFontStyle(FontStyle styleToToggle)
    {
        if (rtbEditor.SelectionFont != null)
        {
            Font currentFont = rtbEditor.SelectionFont;
            FontStyle newStyle = currentFont.Style ^ styleToToggle; // Bitwise XOR toggle
            rtbEditor.SelectionFont = new Font(currentFont.FontFamily, currentFont.Size, newStyle);
        }
    }

    private void btnBullets_Click(object sender, EventArgs e)
    {
        rtbEditor.SelectionBullet = !rtbEditor.SelectionBullet;
    }

    private void btnSaveFile_Click(object sender, EventArgs e)
    {
        using (SaveFileDialog saveDlg = new SaveFileDialog())
        {
            saveDlg.Filter = "Rich Text Format (*.rtf)|*.rtf|Plain Text (*.txt)|*.txt";
            if (saveDlg.ShowDialog() == DialogResult.OK)
            {
                RichTextBoxStreamType format = saveDlg.FileName.EndsWith(".txt") ? RichTextBoxStreamType.PlainText : RichTextBoxStreamType.RichText;
                rtbEditor.SaveFile(saveDlg.FileName, format);
                MessageBox.Show("Document saved successfully!", "Saved", MessageBoxButtons.OK, MessageBoxIcon.Information);
            }
        }
    }
}`,
    codeExplanation: 'Leverages RichTextBox SelectionFont, SelectionBullet, and native SaveFile/LoadFile streaming capabilities.',
    traceSteps: [
      { line: 29, explanation: 'Toggle Bold: Bitwise XOR on SelectionFont.Style.', variables: { newStyle: 'Bold' }, callStack: 'ToggleFontStyle' },
      { line: 44, explanation: 'SaveFile called with RichTextBoxStreamType.RichText.', variables: { path: '"MyNotes.rtf"' }, outputLog: 'File saved as RTF.' }
    ],
    simulatedOutput: [
      'Document opened: BCA_Notes.rtf',
      'Applied Bold & Italic to highlighted selection.',
      'Document saved to disk in RTF format.'
    ],
    vsSteps: [
      { stepNumber: 1, title: 'Add ToolStrip and RichTextBox', description: 'Add ToolStrip docked to Top and RichTextBox docked to Fill.' },
      { stepNumber: 2, title: 'Implement Font Toggle', description: 'Use bitwise XOR on SelectionFont.Style to toggle Bold, Italic, and Underline.' }
    ],
    vivaQuestions: [
      { question: 'What is the key difference between TextBox and RichTextBox in WinForms?', shortAnswer: 'TextBox only supports a single uniform font/style for all text; RichTextBox supports mixed formatting (colors, fonts, bullets, images) per selection.', detailedAnswer: 'RichTextBox is based on the Windows RichEdit control and saves content using standard RTF syntax.' }
    ],
    emulatorType: 'richtextbox-editor'
  },
  {
    id: 33,
    title: 'ADO.NET SQL Server Employee CRUD (EMP)',
    aim: 'To build an ADO.NET Connected & Disconnected Architecture application in C# WinForms to perform Complete CRUD (Create, Read, Update, Delete) on an SQL Server Employee table.',
    module: 'Module 4: ADO.NET & Database',
    difficulty: 'Advanced',
    estimatedMinutes: 30,
    tags: ['ADO.NET', 'SqlConnection', 'SqlCommand', 'SqlDataAdapter', 'DataTable', 'CRUD', 'DataGridView'],
    algorithm: [
      'Define connection string: `string connStr = @\"Data Source=.;Initial Catalog=BCA_DB;Integrated Security=True\";`.',
      'Create method `LoadData()` using `SqlDataAdapter` and `DataTable` to bind to `dgvEmployees.DataSource`.',
      'Insert: Create parameterized `SqlCommand` (`INSERT INTO EMP (EmpId, EmpName, Department, Salary) VALUES (@id, @name, @dept, @sal)`), execute with `cmd.ExecuteNonQuery()`.',
      'Update: Execute parameterized `UPDATE EMP SET EmpName=@name, Department=@dept, Salary=@sal WHERE EmpId=@id`.',
      'Delete: Confirm deletion with MessageBox, then execute `DELETE FROM EMP WHERE EmpId=@id`.',
      'Refresh DataGridView and reset input fields.'
    ],
    code: `using System;
using System.Data;
using System.Data.SqlClient;
using System.Windows.Forms;

public partial class FormEmployeeCrud : Form
{
    private string connectionString = @"Data Source=.;Initial Catalog=BCA_DB;Integrated Security=True";

    public FormEmployeeCrud()
    {
        InitializeComponent();
    }

    private void FormEmployeeCrud_Load(object sender, EventArgs e)
    {
        LoadEmployees();
    }

    private void LoadEmployees()
    {
        using (SqlConnection con = new SqlConnection(connectionString))
        {
            string query = "SELECT EmpId AS [ID], EmpName AS [Employee Name], Department AS [Department], Salary AS [Salary (INR)] FROM EMP";
            SqlDataAdapter da = new SqlDataAdapter(query, con);
            DataTable dt = new DataTable();
            da.Fill(dt);
            dgvEmployees.DataSource = dt;
        }
    }

    private void btnInsert_Click(object sender, EventArgs e)
    {
        using (SqlConnection con = new SqlConnection(connectionString))
        {
            string query = "INSERT INTO EMP (EmpId, EmpName, Department, Salary) VALUES (@id, @name, @dept, @sal)";
            using (SqlCommand cmd = new SqlCommand(query, con))
            {
                cmd.Parameters.AddWithValue("@id", int.Parse(txtEmpId.Text));
                cmd.Parameters.AddWithValue("@name", txtEmpName.Text.Trim());
                cmd.Parameters.AddWithValue("@dept", cmbDept.SelectedItem.ToString());
                cmd.Parameters.AddWithValue("@sal", decimal.Parse(txtSalary.Text));

                con.Open();
                cmd.ExecuteNonQuery();
                con.Close();

                MessageBox.Show("Employee Record Inserted Successfully!", "Success", MessageBoxButtons.OK, MessageBoxIcon.Information);
                LoadEmployees();
                ClearInputs();
            }
        }
    }

    private void btnUpdate_Click(object sender, EventArgs e)
    {
        using (SqlConnection con = new SqlConnection(connectionString))
        {
            string query = "UPDATE EMP SET EmpName = @name, Department = @dept, Salary = @sal WHERE EmpId = @id";
            using (SqlCommand cmd = new SqlCommand(query, con))
            {
                cmd.Parameters.AddWithValue("@id", int.Parse(txtEmpId.Text));
                cmd.Parameters.AddWithValue("@name", txtEmpName.Text.Trim());
                cmd.Parameters.AddWithValue("@dept", cmbDept.SelectedItem.ToString());
                cmd.Parameters.AddWithValue("@sal", decimal.Parse(txtSalary.Text));

                con.Open();
                int rows = cmd.ExecuteNonQuery();
                con.Close();

                if (rows > 0)
                {
                    MessageBox.Show("Employee Record Updated Successfully!", "Success", MessageBoxButtons.OK, MessageBoxIcon.Information);
                    LoadEmployees();
                    ClearInputs();
                }
            }
        }
    }

    private void btnDelete_Click(object sender, EventArgs e)
    {
        if (MessageBox.Show("Are you sure you want to delete this record?", "Confirm", MessageBoxButtons.YesNo, MessageBoxIcon.Question) == DialogResult.Yes)
        {
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                string query = "DELETE FROM EMP WHERE EmpId = @id";
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    cmd.Parameters.AddWithValue("@id", int.Parse(txtEmpId.Text));
                    con.Open();
                    cmd.ExecuteNonQuery();
                    con.Close();

                    MessageBox.Show("Employee Record Deleted!", "Deleted", MessageBoxButtons.OK, MessageBoxIcon.Information);
                    LoadEmployees();
                    ClearInputs();
                }
            }
        }
    }

    private void dgvEmployees_CellClick(object sender, DataGridViewCellEventArgs e)
    {
        if (e.RowIndex >= 0)
        {
            DataGridViewRow row = dgvEmployees.Rows[e.RowIndex];
            txtEmpId.Text = row.Cells["ID"].Value.ToString();
            txtEmpName.Text = row.Cells["Employee Name"].Value.ToString();
            cmbDept.SelectedItem = row.Cells["Department"].Value.ToString();
            txtSalary.Text = row.Cells["Salary (INR)"].Value.ToString();
        }
    }

    private void ClearInputs()
    {
        txtEmpId.Clear();
        txtEmpName.Clear();
        txtSalary.Clear();
        cmbDept.SelectedIndex = -1;
    }
}`,
    codeExplanation: 'Core ADO.NET practical. Uses Parameterized SQL Queries to prevent SQL injection, SqlDataAdapter.Fill for disconnected binding, and ExecuteNonQuery for DML commands.',
    traceSteps: [
      { line: 24, explanation: 'LoadEmployees(): Open connection, SqlDataAdapter.Fill(dt), bind dgvEmployees.DataSource = dt.', variables: { rowsLoaded: 5 }, callStack: 'LoadEmployees' },
      { line: 40, explanation: 'Execute Parameterized Insert: ID=105, Name="Vikram", Dept="IT", Salary=75000.', variables: { queryType: 'INSERT' }, callStack: 'btnInsert_Click' },
      { line: 45, explanation: 'con.Open() -> cmd.ExecuteNonQuery() returns 1 row affected.', variables: { rowsAffected: 1 }, outputLog: 'Inserted 1 record into EMP table.' }
    ],
    simulatedOutput: [
      'Connected to SQL Server: BCA_DB',
      'Fetched 5 rows from EMP table.',
      'INSERT SUCCESS: EmpId=106, Name=Vikram, Dept=Cloud, Salary=85,000',
      'DataGridView reloaded with updated dataset.'
    ],
    vsSteps: [
      { stepNumber: 1, title: 'Import System.Data.SqlClient', description: 'Add using System.Data; and using System.Data.SqlClient; at the top of Form.cs.' },
      { stepNumber: 2, title: 'Add DataGridView & Form Inputs', description: 'Add DataGridView dgvEmployees and TextBoxes for EmpId, EmpName, Dept, and Salary.' },
      { stepNumber: 3, title: 'Code CRUD Operations', description: 'Implement Insert, Update, Delete with parameterized SqlCommand and DataAdapter.Fill.' }
    ],
    vivaQuestions: [
      { question: 'Why should we always use Parameterized Queries instead of string concatenation in ADO.NET?', shortAnswer: 'To prevent SQL Injection attacks and handle data types/escaping automatically.', detailedAnswer: 'Parameterized queries treat input strictly as literals, eliminating vulnerabilities where malicious input could alter SQL execution logic.' },
      { question: 'What is the difference between ExecuteNonQuery(), ExecuteScalar(), and ExecuteReader()?', shortAnswer: 'ExecuteNonQuery returns rows affected (INSERT/UPDATE/DELETE); ExecuteScalar returns a single value (e.g. COUNT); ExecuteReader returns a forward-only stream.', detailedAnswer: 'Use ExecuteReader for fast read-only data streams, ExecuteScalar for aggregate functions, and ExecuteNonQuery for DML commands.' }
    ],
    emulatorType: 'adonet-sql-emp'
  },
  {
    id: 34,
    title: 'MS Access Student Registration with OleDb Connection',
    aim: 'To connect a C# WinForms application to an MS Access Database (.accdb) using OleDbConnection, OleDbDataAdapter, and OleDbCommand to register and query students.',
    module: 'Module 4: ADO.NET & Database',
    difficulty: 'Advanced',
    estimatedMinutes: 25,
    tags: ['ADO.NET', 'MS Access', 'OleDbConnection', 'OleDbDataAdapter', 'Microsoft.ACE.OLEDB'],
    algorithm: [
      'Define OleDb Connection string: `Provider=Microsoft.ACE.OLEDB.12.0;Data Source=StudentDB.accdb;`.',
      'Connect using `OleDbConnection` from `System.Data.OleDb`.',
      'Populate DataGridView using `OleDbDataAdapter da = new OleDbDataAdapter(\"SELECT * FROM Students\", con);`.',
      'Execute `OleDbCommand` parameterized INSERT query with student details.',
      'Display confirmation and refresh records.'
    ],
    code: `using System;
using System.Data;
using System.Data.OleDb;
using System.Windows.Forms;

public partial class FormAccessDb : Form
{
    private string connString = @"Provider=Microsoft.ACE.OLEDB.12.0;Data Source=|DataDirectory|\\StudentDB.accdb;";

    public FormAccessDb()
    {
        InitializeComponent();
    }

    private void FormAccessDb_Load(object sender, EventArgs e)
    {
        LoadStudents();
    }

    private void LoadStudents()
    {
        using (OleDbConnection con = new OleDbConnection(connString))
        {
            OleDbDataAdapter da = new OleDbDataAdapter("SELECT RollNo, StudentName, Course, Semester, Contact FROM Students", con);
            DataTable dt = new DataTable();
            da.Fill(dt);
            dgvStudents.DataSource = dt;
        }
    }

    private void btnRegister_Click(object sender, EventArgs e)
    {
        using (OleDbConnection con = new OleDbConnection(connString))
        {
            string query = "INSERT INTO Students (RollNo, StudentName, Course, Semester, Contact) VALUES (?, ?, ?, ?, ?)";
            using (OleDbCommand cmd = new OleDbCommand(query, con))
            {
                cmd.Parameters.AddWithValue("?", int.Parse(txtRollNo.Text));
                cmd.Parameters.AddWithValue("?", txtName.Text.Trim());
                cmd.Parameters.AddWithValue("?", cmbCourse.SelectedItem.ToString());
                cmd.Parameters.AddWithValue("?", int.Parse(txtSem.Text));
                cmd.Parameters.AddWithValue("?", txtContact.Text.Trim());

                con.Open();
                cmd.ExecuteNonQuery();
                con.Close();

                MessageBox.Show("Student Registered in MS Access Database!", "Success", MessageBoxButtons.OK, MessageBoxIcon.Information);
                LoadStudents();
            }
        }
    }
}`,
    codeExplanation: 'Illustrates connecting to Microsoft Access via OLE DB provider. Note that OLE DB uses positional question marks (?) for parameters rather than named parameters.',
    traceSteps: [
      { line: 24, explanation: 'Initialize OleDbConnection with ACE.OLEDB.12.0 provider.', variables: { provider: '"ACE.OLEDB.12.0"' }, callStack: 'LoadStudents' },
      { line: 40, explanation: 'Insert into MS Access: RollNo=201, Name="Neha Singh", Course="BCA".', variables: { rollNo: 201 }, outputLog: 'OleDb INSERT executed successfully.' }
    ],
    simulatedOutput: [
      'MS Access DB Connected: StudentDB.accdb',
      'Table: Students | 4 records loaded.',
      'Record inserted: RollNo 201 - Neha Singh (BCA)'
    ],
    vsSteps: [
      { stepNumber: 1, title: 'Import System.Data.OleDb', description: 'Add using System.Data.OleDb;' },
      { stepNumber: 2, title: 'Use ? Placeholders', description: 'In OLE DB SQL queries, use ? placeholders for parameters in exact order.' }
    ],
    vivaQuestions: [
      { question: 'What OLE DB Provider is required to connect to MS Access (.accdb) in .NET?', shortAnswer: 'Microsoft.ACE.OLEDB.12.0 (or Microsoft.Jet.OLEDB.4.0 for older .mdb files).', detailedAnswer: 'The ACE OLEDB provider supports modern Office 2007+ Access files and is included in the Microsoft Access Database Engine redistributable.' }
    ],
    emulatorType: 'msaccess-crud'
  },
  {
    id: 35,
    title: 'DataGridView Instant Live Filtering & Multi-Column Sorting',
    aim: 'To implement real-time keystroke live search filtering on a DataGridView using DataView.RowFilter without querying the database repeatedly.',
    module: 'Module 4: ADO.NET & Database',
    difficulty: 'Intermediate',
    estimatedMinutes: 20,
    tags: ['WinForms', 'DataGridView', 'DataView', 'RowFilter', 'Live Search'],
    algorithm: [
      'Load data into a `DataTable dtMaster;`.',
      'Create `DataView dv = dtMaster.DefaultView;` and bind to DataGridView.',
      'Handle `txtSearch.TextChanged` event.',
      'Construct filter expression: string filter = "EmpName LIKE \'%" + text + "%\' OR Department LIKE \'%" + text + "%\'";',
      'Set `dv.RowFilter = filter;`.',
      'Display active filtered count in status bar.'
    ],
    code: `using System;
using System.Data;
using System.Windows.Forms;

public partial class FormGridLiveSearch : Form
{
    private DataTable dtProducts;
    private DataView dvProducts;

    public FormGridLiveSearch()
    {
        InitializeComponent();
    }

    private void FormGridLiveSearch_Load(object sender, EventArgs e)
    {
        // Seed Master Dataset
        dtProducts = new DataTable();
        dtProducts.Columns.Add("ProductID", typeof(int));
        dtProducts.Columns.Add("ProductName", typeof(string));
        dtProducts.Columns.Add("Category", typeof(string));
        dtProducts.Columns.Add("UnitPrice", typeof(decimal));
        dtProducts.Columns.Add("UnitsInStock", typeof(int));

        dtProducts.Rows.Add(101, "Dell Latitude Laptop", "Electronics", 65000, 24);
        dtProducts.Rows.Add(102, "Logitech Wireless Mouse", "Accessories", 1200, 150);
        dtProducts.Rows.Add(103, "Mechanical Keyboard RGB", "Accessories", 3500, 45);
        dtProducts.Rows.Add(104, "Samsung 27-inch Monitor", "Electronics", 18500, 18);
        dtProducts.Rows.Add(105, "Sony Noise-Cancelling Headphones", "Audio", 14999, 30);
        dtProducts.Rows.Add(106, "SanDisk 1TB SSD", "Storage", 7200, 80);

        dvProducts = dtProducts.DefaultView;
        dgvLiveSearch.DataSource = dvProducts;
        UpdateCount();
    }

    private void txtSearch_TextChanged(object sender, EventArgs e)
    {
        string keyword = txtSearch.Text.Trim().Replace("'", "''");

        if (string.IsNullOrEmpty(keyword))
        {
            dvProducts.RowFilter = string.Empty;
        }
        else
        {
            dvProducts.RowFilter = $"ProductName LIKE '%{keyword}%' OR Category LIKE '%{keyword}%'";
        }

        UpdateCount();
    }

    private void UpdateCount()
    {
        lblResultCount.Text = $"Showing {dvProducts.Count} of {dtProducts.Rows.Count} items";
    }
}`,
    codeExplanation: 'Demonstrates in-memory client-side filtering using DataView.RowFilter with LIKE syntax, avoiding redundant database round-trips during live user typing.',
    traceSteps: [
      { line: 35, explanation: 'User types "Electro" in search box -> txtSearch_TextChanged fires.', variables: { keyword: '"Electro"' }, callStack: 'txtSearch_TextChanged' },
      { line: 43, explanation: 'Apply RowFilter: "ProductName LIKE \'%Electro%\' OR Category LIKE \'%Electro%\'".', variables: { 'dvProducts.Count': 2 }, outputLog: 'Filtered to 2 Electronics items.' }
    ],
    simulatedOutput: [
      'Initial Master Records: 6 items.',
      'Search typed: "Key" -> Filtered to 1 item (Mechanical Keyboard RGB)',
      'Search typed: "Accessories" -> Filtered to 2 items.'
    ],
    vsSteps: [
      { stepNumber: 1, title: 'Bind DataView to Grid', description: 'Set dgv.DataSource = dtMaster.DefaultView;' },
      { stepNumber: 2, title: 'Write RowFilter in TextChanged', description: 'In txtSearch_TextChanged, assign dv.RowFilter = $"Name LIKE \'%{keyword}%\'";' }
    ],
    vivaQuestions: [
      { question: 'What is DataView in ADO.NET and how does RowFilter work?', shortAnswer: 'DataView represents a customized, bindable view of a DataTable for sorting and filtering.', detailedAnswer: 'DataView.RowFilter uses SQL-like WHERE expressions to filter rows in memory instantly without modifying underlying DataTable data.' }
    ],
    emulatorType: 'datagrid-search'
  },
  {
    id: 36,
    title: 'Database User Authentication with Role-Based Access',
    aim: 'To implement secure database-backed login verification in C# WinForms querying credentials and checking user roles (Admin vs Student) with session tracking.',
    module: 'Module 4: ADO.NET & Database',
    difficulty: 'Advanced',
    estimatedMinutes: 20,
    tags: ['ADO.NET', 'SqlCommand', 'ExecuteReader', 'Role-Based Access', 'Sessions'],
    algorithm: [
      'Query user table using parameterized SQL query: `SELECT UserId, FullName, Role FROM Users WHERE Username = @user AND PasswordHash = @pass`.',
      'Execute using `SqlDataReader reader = cmd.ExecuteReader();`.',
      'If `reader.Read()` returns true: extract `FullName` and `Role`.',
      'Store active session object.',
      'If role is \"Admin\", enable administrative menus; if \"Student\", open restricted student portal.',
      'If no rows found, display \"Invalid Credentials\".'
    ],
    code: `using System;
using System.Data.SqlClient;
using System.Windows.Forms;

public partial class FormDbAuth : Form
{
    private string connStr = @"Data Source=.;Initial Catalog=BCA_DB;Integrated Security=True";

    public FormDbAuth()
    {
        InitializeComponent();
    }

    private void btnLogin_Click(object sender, EventArgs e)
    {
        string username = txtUser.Text.Trim();
        string password = txtPassword.Text;

        if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
        {
            MessageBox.Show("Please provide both Username and Password.", "Error", MessageBoxButtons.OK, MessageBoxIcon.Warning);
            return;
        }

        using (SqlConnection con = new SqlConnection(connStr))
        {
            string sql = "SELECT FullName, Role, IsActive FROM Users WHERE Username = @u AND Password = @p";
            using (SqlCommand cmd = new SqlCommand(sql, con))
            {
                cmd.Parameters.AddWithValue("@u", username);
                cmd.Parameters.AddWithValue("@p", password);

                con.Open();
                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        string fullName = reader["FullName"].ToString();
                        string role = reader["Role"].ToString();
                        bool isActive = Convert.ToBoolean(reader["IsActive"]);

                        if (!isActive)
                        {
                            MessageBox.Show("This account is currently deactivated. Contact HOD.", "Account Inactive", MessageBoxButtons.OK, MessageBoxIcon.Stop);
                            return;
                        }

                        MessageBox.Show($"Welcome, {fullName}!\nRole: {role}\nAccess Granted.", "Login Success", MessageBoxButtons.OK, MessageBoxIcon.Information);
                        OpenDashboard(role, fullName);
                    }
                    else
                    {
                        MessageBox.Show("Invalid Username or Password!", "Auth Failed", MessageBoxButtons.OK, MessageBoxIcon.Error);
                    }
                }
            }
        }
    }

    private void OpenDashboard(string role, string name)
    {
        lblSessionInfo.Text = $"Logged in as: {name} ({role})";
        pnlAdminControls.Visible = (role == "Admin");
    }
}`,
    codeExplanation: 'Uses SqlDataReader to fetch authenticated user metadata and conditionally toggles UI panels according to the user\'s authorization role.',
    traceSteps: [
      { line: 30, explanation: 'Execute parameterized SELECT query against Users table.', variables: { user: '"prof_sharma"' }, callStack: 'btnLogin_Click' },
      { line: 34, explanation: 'reader.Read() returns true. Extract FullName="Prof. Sharma", Role="Admin".', variables: { role: '"Admin"' }, outputLog: 'Authenticated as Admin.' },
      { line: 55, explanation: 'Activate Admin Panel with unrestricted privileges.', variables: { 'pnlAdminControls.Visible': true }, outputLog: 'Admin Dashboard loaded.' }
    ],
    simulatedOutput: [
      'Authenticating username: "prof_sharma"...',
      'Database Match Found: FullName="Prof. Sharma", Role="Admin"',
      'Session Established: Admin Controls Unlocked.'
    ],
    vsSteps: [
      { stepNumber: 1, title: 'Parameterized Reader Query', description: 'Write SELECT query with SqlDataReader to fetch Role and status.' },
      { stepNumber: 2, title: 'Manage Session State', description: 'Conditionally enable Admin menus based on role check.' }
    ],
    vivaQuestions: [
      { question: 'Why is SqlDataReader preferred for login verification in ADO.NET?', shortAnswer: 'Because SqlDataReader is a lightweight, fast, forward-only, read-only stream of rows.', detailedAnswer: 'Unlike DataSet or DataTable which load everything in memory, SqlDataReader retrieves only what is needed with minimal memory overhead.' }
    ],
    emulatorType: 'db-auth-session'
  },
  {
    id: 37,
    title: 'Crystal Reports / Dynamic Invoice Generator for Salesman',
    aim: 'To design a reporting engine in C# WinForms to generate Sales Invoices and filtered Performance Reports by Salesman ID and Date Range.',
    module: 'Module 4: ADO.NET & Database',
    difficulty: 'Advanced',
    estimatedMinutes: 25,
    tags: ['Crystal Reports', 'Reporting', 'Invoicing', 'Date Filter', 'Summary'],
    algorithm: [
      'Define parameters: Salesman ID and Date Range (From Date, To Date).',
      'Query sales transaction database using INNER JOIN between Salesman, Orders, and Items.',
      'Compute Subtotal, Tax (GST 18%), and Grand Total.',
      'Format output report with headers, line items, and financial summaries.',
      'Support Export to PDF / Print format.'
    ],
    code: `using System;
using System.Data;
using System.Windows.Forms;

public partial class FormSalesReport : Form
{
    private DataTable dtSales;

    public FormSalesReport()
    {
        InitializeComponent();
    }

    private void FormSalesReport_Load(object sender, EventArgs e)
    {
        // Seed Demo Sales Database
        dtSales = new DataTable();
        dtSales.Columns.Add("InvoiceNo", typeof(string));
        dtSales.Columns.Add("Salesman", typeof(string));
        dtSales.Columns.Add("OrderDate", typeof(DateTime));
        dtSales.Columns.Add("Client", typeof(string));
        dtSales.Columns.Add("Amount", typeof(decimal));

        dtSales.Rows.Add("INV-1001", "Rajesh Kumar", new DateTime(2026, 10, 1), "Apex Corp", 45000);
        dtSales.Rows.Add("INV-1002", "Anita Desai", new DateTime(2026, 10, 3), "Zenith Systems", 82000);
        dtSales.Rows.Add("INV-1003", "Rajesh Kumar", new DateTime(2026, 10, 10), "Quantum Tech", 125000);
        dtSales.Rows.Add("INV-1004", "Vikram Patel", new DateTime(2026, 10, 15), "Infra Builders", 34000);
        dtSales.Rows.Add("INV-1005", "Anita Desai", new DateTime(2026, 10, 18), "Global Trade", 96000);

        cmbSalesman.Items.AddRange(new string[] { "All Salesmen", "Rajesh Kumar", "Anita Desai", "Vikram Patel" });
        cmbSalesman.SelectedIndex = 0;
    }

    private void btnGenerateReport_Click(object sender, EventArgs e)
    {
        string selectedSalesman = cmbSalesman.SelectedItem.ToString();
        DateTime fromDate = dtpFrom.Value.Date;
        DateTime toDate = dtpTo.Value.Date;

        DataView dv = dtSales.DefaultView;
        string filter = $"OrderDate >= #{fromDate:yyyy-MM-dd}# AND OrderDate <= #{toDate:yyyy-MM-dd}#";

        if (selectedSalesman != "All Salesmen")
        {
            filter += $" AND Salesman = '{selectedSalesman}'";
        }

        dv.RowFilter = filter;
        dgvReport.DataSource = dv;

        // Calculate Totals
        decimal totalSales = 0;
        foreach (DataRowView row in dv)
        {
            totalSales += Convert.ToDecimal(row["Amount"]);
        }

        lblReportSummary.Text = $"Total Invoices: {dv.Count} | Total Revenue: â‚¹{totalSales:N2} | Commission (5%): â‚¹{(totalSales * 0.05m):N2}";
    }
}`,
    codeExplanation: 'Demonstrates parameterized multi-criteria reporting across date intervals and categorical foreign key values.',
    traceSteps: [
      { line: 35, explanation: 'Filter by Salesman="Rajesh Kumar", DateRange=01-Oct to 31-Oct.', variables: { salesman: '"Rajesh Kumar"' }, callStack: 'btnGenerateReport_Click' },
      { line: 49, explanation: 'Compute Revenue: â‚¹170,000.00 across 2 invoices. Commission (5%) = â‚¹8,500.00.', variables: { totalRevenue: 170000 }, outputLog: 'Report generated successfully.' }
    ],
    simulatedOutput: [
      'Report: Rajesh Kumar (Oct 2026)',
      'INV-1001: Apex Corp - â‚¹45,000',
      'INV-1003: Quantum Tech - â‚¹1,25,000',
      'Total Sales: â‚¹1,70,000.00 | Commission: â‚¹8,500.00'
    ],
    vsSteps: [
      { stepNumber: 1, title: 'Add Report Controls', description: 'Add 2 DateTimePickers (From Date, To Date), ComboBox (Salesman), and DataGridView.' },
      { stepNumber: 2, title: 'Compute Summary Aggregates', description: 'Calculate total sum and commission on filtered DataView rows.' }
    ],
    vivaQuestions: [
      { question: 'What is Crystal Reports in .NET development?', shortAnswer: 'A popular business intelligence and reporting tool integrated with Visual Studio to design pixel-perfect printable and exportable reports.', detailedAnswer: 'Crystal Reports can bind to DataSets, execute grouped aggregations, display sub-reports, and export to PDF, Excel, and Word formats.' }
    ],
    emulatorType: 'crystal-report'
  },
  {
    id: 38,
    title: 'Advanced Parameterized Filter Report: Salary & Department',
    aim: 'To build a comprehensive statistical reporting tool in C# WinForms allowing multi-dimensional filtering by Department, Salary Range, and Gender with summary metrics.',
    module: 'Module 4: ADO.NET & Database',
    difficulty: 'Advanced',
    estimatedMinutes: 25,
    tags: ['ADO.NET', 'Analytics', 'Multi-filter', 'Aggregates', 'Reporting'],
    algorithm: [
      'Create master workforce DataTable with EmpID, Name, Dept, Salary, Gender, Experience.',
      'Add UI filters: Department ComboBox, Min/Max Salary TrackBars or NumericUpDowns, Gender RadioButtons.',
      'Construct compound `RowFilter` expression using boolean AND logic.',
      'Bind filtered result to DataGridView.',
      'Calculate Average Salary, Highest Paid, Lowest Paid, and Headcount distribution.'
    ],
    code: `using System;
using System.Data;
using System.Linq;
using System.Windows.Forms;

public partial class FormWorkforceReport : Form
{
    private DataTable dtEmp;
    private DataView dvEmp;

    public FormWorkforceReport()
    {
        InitializeComponent();
    }

    private void FormWorkforceReport_Load(object sender, EventArgs e)
    {
        dtEmp = new DataTable();
        dtEmp.Columns.Add("EmpID", typeof(int));
        dtEmp.Columns.Add("Name", typeof(string));
        dtEmp.Columns.Add("Department", typeof(string));
        dtEmp.Columns.Add("Salary", typeof(decimal));
        dtEmp.Columns.Add("Gender", typeof(string));
        dtEmp.Columns.Add("ExperienceYears", typeof(int));

        dtEmp.Rows.Add(101, "Suresh Nair", "Engineering", 85000, "Male", 6);
        dtEmp.Rows.Add(102, "Meera Iyer", "Human Resources", 62000, "Female", 4);
        dtEmp.Rows.Add(103, "Aditya Rao", "Engineering", 120000, "Male", 9);
        dtEmp.Rows.Add(104, "Pooja Hegde", "Marketing", 71000, "Female", 5);
        dtEmp.Rows.Add(105, "Rohan Das", "Finance", 95000, "Male", 7);
        dtEmp.Rows.Add(106, "Tanvi Shah", "Engineering", 92000, "Female", 6);
        dtEmp.Rows.Add(107, "Kunal Sen", "Marketing", 54000, "Male", 2);

        dvEmp = dtEmp.DefaultView;
        dgvWorkforce.DataSource = dvEmp;
        ApplyFilters();
    }

    private void ApplyFilters()
    {
        string dept = cmbDeptFilter.SelectedItem?.ToString() ?? "All";
        decimal minSal = nudMinSalary.Value;
        decimal maxSal = nudMaxSalary.Value;
        string gender = radAll.Checked ? "All" : (radMale.Checked ? "Male" : "Female");

        string filter = $"Salary >= {minSal} AND Salary <= {maxSal}";

        if (dept != "All") filter += $" AND Department = '{dept}'";
        if (gender != "All") filter += $" AND Gender = '{gender}'";

        dvEmp.RowFilter = filter;

        // Statistics
        if (dvEmp.Count > 0)
        {
            decimal totalSal = 0;
            decimal maxSalary = decimal.MinValue;
            foreach (DataRowView r in dvEmp)
            {
                decimal sal = Convert.ToDecimal(r["Salary"]);
                totalSal += sal;
                if (sal > maxSalary) maxSalary = sal;
            }

            lblStats.Text = $"Filtered Headcount: {dvEmp.Count} | Avg Salary: â‚¹{(totalSal / dvEmp.Count):N2} | Highest: â‚¹{maxSalary:N2}";
        }
        else
        {
            lblStats.Text = "No employees matched the specified criteria.";
        }
    }
}`,
    codeExplanation: 'Completes the BCA Sem 5 curriculum by demonstrating complex compound reporting, aggregates calculation, and real-time reactive filters.',
    traceSteps: [
      { line: 36, explanation: 'Apply Filters: Dept="Engineering", Gender="All", Salary=[80k - 150k].', variables: { dept: '"Engineering"', minSal: 80000, maxSal: 150000 }, callStack: 'ApplyFilters' },
      { line: 45, explanation: 'Matched 3 employees: Suresh (85k), Aditya (120k), Tanvi (92k). Average: â‚¹99,000.00.', variables: { matchedCount: 3, avgSalary: 99000 }, outputLog: 'Workforce Report computed.' }
    ],
    simulatedOutput: [
      'Filter: Engineering Dept, Salary â‚¹80,000 - â‚¹1,50,000',
      'Found 3 Employees.',
      'Average Salary: â‚¹99,000.00 | Max: â‚¹1,20,000.00'
    ],
    vsSteps: [
      { stepNumber: 1, title: 'Build Multi-Filter Form', description: 'Add ComboBox for Department, NumericUpDown for Salary, and RadioButtons for Gender.' },
      { stepNumber: 2, title: 'Compound Filter Expression', description: 'Construct compound RowFilter string and calculate live summary analytics.' }
    ],
    vivaQuestions: [
      { question: 'What is the role of DataView in generating reports in Windows Forms?', shortAnswer: 'DataView provides dynamic client-side sorting, searching, and filtering of table data without querying the database again.', detailedAnswer: 'It acts as an intermediate view layer between a DataTable and visual controls like DataGridView, enabling rapid sub-second dashboard reporting.' }
    ],
    emulatorType: 'parameterized-report'
  }
];


  // ==========================================
  // MODULE: practicalsData.js
  // ==========================================

const allPracticals = [
  ...practicalsPart1,
  ...practicalsPart2,
  ...practicalsPart3
].sort((a, b) => a.id - b.id);

const modulesList = [
  {
    name: 'Module 1: C# OOP & Basics',
    practicalRange: 'Practicals 1 - 10',
    description: 'Console I/O, OOP Classes, Overloading, Polymorphism, Strings, Exceptions, Delegates & Arrays.',
    color: '#3B82F6',
    count: 10
  },
  {
    name: 'Module 2: Windows Forms Controls',
    practicalRange: 'Practicals 11 - 21',
    description: 'Core Controls: TextBoxes, Buttons, ComboBox, Radio/Check, Calculators, ListBoxes & Tasks.',
    color: '#10B981',
    count: 11
  },
  {
    name: 'Module 3: Advanced Controls & GDI+',
    practicalRange: 'Practicals 22 - 32',
    description: 'DateTimePickers, GDI+ 2D Drawing, Dialogs, ImageList, Timers, TreeView, ContextMenu & MDI.',
    color: '#8B5CF6',
    count: 11
  },
  {
    name: 'Module 4: ADO.NET & Database',
    practicalRange: 'Practicals 33 - 38',
    description: 'SQL Server & MS Access CRUD, DataGridView Live Search, DB Auth & Crystal Reports.',
    color: '#F59E0B',
    count: 6
  }
];

function getPracticalById(id) {
  return allPracticals.find(p => p.id === id);
}

function searchPracticals(query, moduleFilter, diffFilter) {
  const q = (query || '').trim().toLowerCase();
  return allPracticals.filter(p => {
    const matchesQuery =
      !q ||
      p.id.toString() === q ||
      p.title.toLowerCase().includes(q) ||
      p.aim.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q));

    const matchesModule = !moduleFilter || moduleFilter === 'All' || p.module === moduleFilter;
    const matchesDiff = !diffFilter || diffFilter === 'All' || p.difficulty === diffFilter;

    return matchesQuery && matchesModule && matchesDiff;
  });
}


  // ==========================================
  // MODULE: themeEngine.js
  // ==========================================
const layoutOptions = [
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

const themes = {
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
    ribbonBg: 'bg-teal-50/80',
    tabActiveBg: 'bg-[#0D9488] text-white font-black',
    terminalBg: 'bg-[#2E3440] text-[#88C0D0]'
  }
};


  // ==========================================
  // MODULE: appState.js
  // ==========================================

class AppState {
  constructor() {
    this.activePracticalId = 1;
    this.activeTab = 'emulator'; // 'emulator' | 'code' | 'dryrun' | 'vsguide' | 'viva'

    // Theme & Layout
    const savedTheme = localStorage.getItem('bca_csharp_theme');
    this.currentTheme = savedTheme && themes[savedTheme] ? savedTheme : 'cyan-dark';

    const savedLayout = localStorage.getItem('bca_csharp_layout');
    this.currentLayout = savedLayout || 'classic';

    // Completed & Starred Lists
    try {
      const savedCompleted = localStorage.getItem('bca_csharp_completed');
      this.completedIds = savedCompleted ? JSON.parse(savedCompleted) : [1, 2];
    } catch {
      this.completedIds = [1, 2];
    }

    try {
      const savedStarred = localStorage.getItem('bca_csharp_starred');
      this.starredIds = savedStarred ? JSON.parse(savedStarred) : [11, 24, 33];
    } catch {
      this.starredIds = [11, 24, 33];
    }

    // Modal Visibility
    this.isAiTutorOpen = false;
    this.isQuizOpen = false;
    this.isCheatsheetOpen = false;
    this.isLabRecordOpen = false;
    this.isThemeModalOpen = false;
    this.isSidebarOpenMobile = false;

    // Custom API Key for Gemini Live Mode
    this.geminiApiKey = localStorage.getItem('bca_csharp_gemini_key') || '';

    // Event Subscribers
    this.listeners = [];
  }

  get themeConfig() {
    return themes[this.currentTheme] || themes['cyan-dark'];
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(listener => listener(this));
  }

  setActivePractical(id) {
    if (this.activePracticalId !== id) {
      this.activePracticalId = id;
      this.notify();
    }
  }

  setActiveTab(tab) {
    if (this.activeTab !== tab) {
      this.activeTab = tab;
      this.notify();
    }
  }

  setTheme(themeId) {
    if (themes[themeId]) {
      this.currentTheme = themeId;
      localStorage.setItem('bca_csharp_theme', themeId);
      this.notify();
    }
  }

  setLayout(layoutId) {
    this.currentLayout = layoutId;
    localStorage.setItem('bca_csharp_layout', layoutId);
    this.notify();
  }

  toggleComplete(id) {
    if (this.completedIds.includes(id)) {
      this.completedIds = this.completedIds.filter(x => x !== id);
    } else {
      this.completedIds = [...this.completedIds, id];
    }
    localStorage.setItem('bca_csharp_completed', JSON.stringify(this.completedIds));
    this.notify();
  }

  toggleStar(id) {
    if (this.starredIds.includes(id)) {
      this.starredIds = this.starredIds.filter(x => x !== id);
    } else {
      this.starredIds = [...this.starredIds, id];
    }
    localStorage.setItem('bca_csharp_starred', JSON.stringify(this.starredIds));
    this.notify();
  }

  toggleAiTutor() {
    this.isAiTutorOpen = !this.isAiTutorOpen;
    this.notify();
  }

  setQuizOpen(open) {
    this.isQuizOpen = open;
    this.notify();
  }

  setCheatsheetOpen(open) {
    this.isCheatsheetOpen = open;
    this.notify();
  }

  setLabRecordOpen(open) {
    this.isLabRecordOpen = open;
    this.notify();
  }

  setThemeModalOpen(open) {
    this.isThemeModalOpen = open;
    this.notify();
  }

  setSidebarOpenMobile(open) {
    this.isSidebarOpenMobile = open;
    this.notify();
  }

  setGeminiApiKey(key) {
    this.geminiApiKey = key.trim();
    localStorage.setItem('bca_csharp_gemini_key', this.geminiApiKey);
    this.notify();
  }
}

const appState = new AppState();


  // ==========================================
  // MODULE: knowledgeEngine.js
  // ==========================================
// Client-Side Curated C# Knowledge Engine (Offline AI Tutor Engine)

function generateCuratedCsharpAnswer(
  practicalId,
  practicalTitle,
  aimText,
  questionText,
  codeText
) {
  const q = (questionText || '').toLowerCase();

  if (q.includes('logic') || q.includes('explain') || q.includes('walkthrough')) {
    return `### ðŸ“˜ Logic Walkthrough: Practical #${practicalId} - ${practicalTitle}

**Aim**: ${aimText || 'Implement and verify C# .NET solution'}

#### âš™ï¸ Algorithmic Execution Steps:
1. **Initialization & UI Setup**:
   - The form initializes component controls in \`InitializeComponent()\` and binds events to their respective delegate handlers.
   - Initial property states (e.g. \`Enabled\`, \`Text\`, \`SelectedIndex\`) are configured.

2. **Data Processing & Event Handling**:
   - User interaction triggers specific events (such as \`Click\`, \`TextChanged\`, or \`SelectedIndexChanged\`).
   - Input strings from \`TextBox\` controls are parsed safely using \`int.TryParse()\` or \`double.TryParse()\` to avoid \`FormatException\`.

3. **Output Presentation**:
   - Results are formatted with proper currency/numeric format strings (e.g., \`C2\`, \`N2\`) and assigned to display labels or message boxes.

\`\`\`csharp
// Key logic snippet for #${practicalId}:
${codeText ? codeText.split('\n').slice(0, 14).join('\n') : '// See Source Code tab for complete implementation'}
\`\`\`

ðŸ’¡ *Pro-Tip*: Always validate user input at the UI boundary before passing values to internal calculation methods!`;
  }

  if (q.includes('viva') || q.includes('questions') || q.includes('interview')) {
    return `### ðŸŽ“ Top 3 University Viva Voce Questions for Practical #${practicalId}

**1. Question**: What is the role of event delegation in this practical?
- **Answer**: In C#, events are encapsulated delegates (\`EventHandler\`). When the user triggers an action (like clicking a Button), the CLR invokes all subscribed methods in the invocation list with \`(object sender, EventArgs e)\`.

**2. Question**: Why should we use \`TryParse()\` instead of \`Convert.ToInt32()\`?
- **Answer**: \`TryParse()\` returns a boolean indicating success or failure without throwing a terminating \`FormatException\` if the user enters non-numeric text.

**3. Question**: What is the difference between modal (\`ShowDialog\`) and modeless (\`Show\`) windows in WinForms?
- **Answer**: \`ShowDialog()\` halts execution in the calling form and forces user response before returning, while \`Show()\` displays an independent window without blocking the parent form.`;
  }

  if (q.includes('exception') || q.includes('error') || q.includes('try catch')) {
    return `### ðŸ›¡ï¸ Exception Handling Strategy for Practical #${practicalId}

To make this practical resilient against runtime crashes, wrap critical I/O and parsing logic in structured \`try-catch-finally\` blocks:

\`\`\`csharp
try
{
    // 1. Safe parsing from UI controls
    if (!int.TryParse(txtInput.Text.Trim(), out int value))
    {
        MessageBox.Show("Please enter a valid numeric value.", "Validation Error", 
            MessageBoxButtons.OK, MessageBoxIcon.Warning);
        txtInput.Focus();
        return;
    }

    // 2. Perform business logic / calculations
    int result = Calculate(value);
    lblResult.Text = $"Result: {result}";
}
catch (OverflowException ex)
{
    MessageBox.Show("Number is too large for 32-bit integer: " + ex.Message, 
        "Overflow", MessageBoxButtons.OK, MessageBoxIcon.Error);
}
catch (Exception ex)
{
    MessageBox.Show("Unexpected error occurred: " + ex.Message, 
        "System Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
}
finally
{
    // Cleanup resources (Database connections, Pens, Brushes)
}
\`\`\``;
  }

  if (q.includes('visual studio') || q.includes('designer') || q.includes('config') || q.includes('steps')) {
    return `### ðŸ› ï¸ Visual Studio Setup & Configuration Guide

1. **Create Solution**:
   - Open Visual Studio 2022 / 2025 -> **Create a new project** -> Select **Windows Forms App (.NET)** -> Target **.NET 8.0 (Long Term Support)**.
2. **Form Layout**:
   - Open \`Form1.cs [Design]\` and dock the **Toolbox** (\`Ctrl + Alt + X\`).
   - Drag required controls from the toolbox onto the form surface.
3. **Properties Configuration**:
   - Set control \`(Name)\` identifiers properly (e.g. \`btnSubmit\`, \`txtNumber\`, \`lblOutput\`).
4. **Event Subscription**:
   - Double-click the control in the visual designer to auto-generate the event handler method in the code-behind file.
5. **Run & Test**:
   - Press **F5** (or \`Ctrl + F5\`) to compile and execute with live debugging.`;
  }

  return `### ðŸ’¡ C# .NET Practical #${practicalId}: ${practicalTitle}

**Overview**:
This practical focuses on ${aimText || 'C# GUI development in Windows Forms'}.

**Key Architecture Concepts**:
- **Namespace**: Groups related classes under a unified scope.
- **Partial Classes**: Splits Form designer code (\`Form1.Designer.cs\`) and user logic (\`Form1.cs\`) into distinct files compiled together.
- **Component Lifecycle**: Construction -> \`InitializeComponent()\` -> \`Form_Load\` -> Interactive Events -> \`Form_Closing\` -> Garbage Collection.

\`\`\`csharp
// Sample Code Structure:
namespace BCA_Sem5_Lab
{
    public partial class MainForm : Form
    {
        public MainForm()
        {
            InitializeComponent();
        }
    }
}
\`\`\`

Feel free to ask for specific syntax explanations, step-by-step algorithms, or viva exam questions!`;
}

function generateCuratedViva(practicalTitle, practicalCode) {
  return [
    {
      question: `What is the core purpose and execution cycle of "${practicalTitle || 'this practical'}"?`,
      shortAnswer: 'Demonstrates event-driven Windows Forms programming using .NET CLR lifecycle.',
      detailedAnswer: 'When the application launches, Application.Run() starts the standard message pump. Controls receive window messages and trigger delegate event handlers.',
      category: 'Architecture'
    },
    {
      question: 'How do you prevent runtime conversion crashes in C# GUI input fields?',
      shortAnswer: 'Use int.TryParse() or double.TryParse() instead of direct casting or Parse().',
      detailedAnswer: 'TryParse parses the string safely into an out parameter and returns false on failure, avoiding costly FormatException aborts.',
      category: 'Syntax'
    },
    {
      question: 'What is the role of the InitializeComponent() method in Form classes?',
      shortAnswer: 'Initializes and configures all GUI controls declared in the Form designer.',
      detailedAnswer: 'InitializeComponent is automatically generated in Form.Designer.cs. It instantiates buttons, labels, and textboxes, sets properties, and attaches event handlers.',
      category: 'Event-Driven'
    },
    {
      question: 'What is the distinction between Value Types and Reference Types in C#?',
      shortAnswer: 'Value types are stored on the Stack (structs, primitives); Reference types on the Managed Heap (classes, objects).',
      detailedAnswer: 'Value types copy actual data directly on assignment, while reference types copy the memory address pointing to the object on the heap managed by Garbage Collector.',
      category: 'Concept'
    }
  ];
}


  // ==========================================
  // MODULE: aiTutor.js
  // ==========================================

async function askAiTutor(questionText, practical, userApiKey) {
  const practicalId = practical?.id || 1;
  const titleText = practical?.title || 'General C# .NET Lab';
  const codeText = practical?.code || '';
  const aimText = practical?.aim || '';

  // If user provided a Gemini API Key in UI, call Google Gemini REST API directly from browser
  if (userApiKey && userApiKey.trim().length > 0) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(userApiKey.trim())}`;

      const systemInstruction = `You are SharpSensei, an expert Professor of Computer Applications specializing in C# .NET, Windows Forms GUI Programming, ADO.NET, and .NET Framework for BCA Semester 5 students. Provide clear, educational, friendly, and practical answers with Markdown code blocks.`;

      const prompt = `Context:
Current BCA Sem 5 Practical: #${practicalId} - ${titleText}
${aimText ? `Aim: ${aimText}` : ''}

Practical Source Code:
\`\`\`csharp
${codeText || '// No code provided'}
\`\`\`

User Question:
${questionText}`;

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          systemInstruction: { parts: [{ text: systemInstruction }] }
        })
      });

      if (res.ok) {
        const data = await res.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          return {
            reply: text,
            modelUsed: 'Google Gemini 2.5 Flash (Live Online)',
            source: 'gemini'
          };
        }
      }
    } catch (err) {
      console.warn('Live Gemini API call failed, switching to offline engine:', err);
    }
  }

  // Fallback to offline knowledge engine
  const curatedText = generateCuratedCsharpAnswer(practicalId, titleText, aimText, questionText, codeText);
  return {
    reply: curatedText,
    modelUsed: 'SharpSensei Offline C# Knowledge Engine',
    source: 'curated'
  };
}


  // ==========================================
  // MODULE: navbar.js
  // ==========================================

function renderNavbar(container) {
  const { themeConfig, currentLayout, completedIds, isAiTutorOpen } = appState;
  const totalCount = 38;
  const completedCount = completedIds.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  container.innerHTML = `
    <header class="h-13 border-b ${themeConfig.borderColor} ${themeConfig.headerBg} flex items-center justify-between px-3 md:px-4 select-none shrink-0 z-20">
      <!-- Left: Brand Logo & Title -->
      <div class="flex items-center gap-3 min-w-0">
        <div class="flex items-center gap-2 cursor-pointer" id="btn-brand-home">
          <div class="w-8 h-8 rounded-sm ${themeConfig.accentBg} flex items-center justify-center text-black font-black text-xs shadow-md">
            C#
          </div>
          <div class="flex flex-col min-w-0">
            <div class="flex items-center gap-1.5">
              <span class="font-black tracking-wider text-xs md:text-sm ${themeConfig.textHeading} uppercase">SharpSensei</span>
              <span class="text-[9px] px-1 py-0.2 rounded-xs border font-bold ${themeConfig.accentBadgeBg} hidden sm:inline">IDE v2.5</span>
            </div>
            <span class="text-[10px] ${themeConfig.textMuted} tracking-tight hidden md:inline truncate">BCA Sem-5 WinForms GUI Lab & AI Tutor</span>
          </div>
        </div>

        <!-- Progress Indicator Badge -->
        <div class="hidden lg:flex items-center gap-2 ml-4 pl-4 border-l ${themeConfig.borderColor}">
          <div class="flex flex-col">
            <div class="flex items-center justify-between text-[9px] ${themeConfig.textMuted} font-bold">
              <span>PROGRESS</span>
              <span>${completedCount}/${totalCount} (${progressPercent}%)</span>
            </div>
            <div class="w-28 h-1.5 bg-slate-800 rounded-full overflow-hidden mt-0.5 border border-slate-700/50">
              <div class="h-full rounded-full transition-all duration-300" style="width: ${progressPercent}%; background-color: ${themeConfig.previewColor};"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: Action Buttons & Settings -->
      <div class="flex items-center gap-1.5 md:gap-2">
        <!-- Layout Selector Dropdown -->
        <div class="relative inline-block text-left">
          <button id="btn-layout-dropdown" class="flex items-center gap-1 px-2 py-1 rounded-sm text-[10px] font-bold border ${themeConfig.borderColor} ${themeConfig.cardSubBg} ${themeConfig.textHeading} hover:border-slate-500 transition-colors">
            <i data-lucide="layout" class="w-3.5 h-3.5"></i>
            <span class="hidden sm:inline uppercase">${currentLayout}</span>
          </button>
          <div id="layout-menu" class="hidden absolute right-0 mt-1 w-56 rounded-sm shadow-xl ${themeConfig.headerBg} border ${themeConfig.borderColor} py-1 z-50">
            ${layoutOptions.map(opt => `
              <button data-layout-id="${opt.id}" class="w-full text-left px-3 py-1.5 text-xs hover:bg-white/10 flex items-center justify-between ${currentLayout === opt.id ? 'font-bold text-cyan-400' : themeConfig.textColor}">
                <span>${opt.name}</span>
                <span class="text-[9px] opacity-60">${opt.badge}</span>
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Theme Selector Button -->
        <button id="btn-open-theme" class="flex items-center gap-1.5 px-2 py-1 rounded-sm text-[10px] font-bold border ${themeConfig.borderColor} ${themeConfig.cardSubBg} ${themeConfig.textHeading} hover:border-slate-500 transition-colors" title="Theme Selector">
          <span class="w-3 h-3 rounded-full border border-white/20" style="background-color: ${themeConfig.previewColor}"></span>
          <span class="hidden md:inline">THEME</span>
        </button>

        <!-- Quiz Modal Button -->
        <button id="btn-open-quiz" class="flex items-center gap-1 px-2 py-1 rounded-sm text-[10px] font-bold border ${themeConfig.borderColor} ${themeConfig.cardSubBg} ${themeConfig.textHeading} hover:border-slate-500 transition-colors" title="BCA Exam Practice Quiz">
          <i data-lucide="help-circle" class="w-3.5 h-3.5"></i>
          <span class="hidden sm:inline">QUIZ</span>
        </button>

        <!-- Cheatsheet Button -->
        <button id="btn-open-cheatsheet" class="flex items-center gap-1 px-2 py-1 rounded-sm text-[10px] font-bold border ${themeConfig.borderColor} ${themeConfig.cardSubBg} ${themeConfig.textHeading} hover:border-slate-500 transition-colors" title="WinForms & ADO.NET Cheatsheet">
          <i data-lucide="file-text" class="w-3.5 h-3.5"></i>
          <span class="hidden sm:inline">CHEATSHEET</span>
        </button>

        <!-- Lab Record Modal -->
        <button id="btn-open-labrecord" class="flex items-center gap-1 px-2 py-1 rounded-sm text-[10px] font-bold border ${themeConfig.borderColor} ${themeConfig.cardSubBg} ${themeConfig.textHeading} hover:border-slate-500 transition-colors" title="Printable Lab Record Manual">
          <i data-lucide="book-open" class="w-3.5 h-3.5"></i>
          <span class="hidden sm:inline">LAB RECORD</span>
        </button>

        <!-- AI Tutor Toggle Button -->
        <button id="btn-toggle-aitutor" class="flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-[10px] font-black uppercase transition-all shadow-md ${isAiTutorOpen ? 'bg-cyan-400 text-black' : `${themeConfig.accentBg} ${themeConfig.accentTextColor} hover:opacity-90`}">
          <i data-lucide="bot" class="w-3.5 h-3.5"></i>
          <span>AI TUTOR</span>
        </button>
      </div>
    </header>
  `;

  // Attach Event Listeners
  const btnBrandHome = container.querySelector('#btn-brand-home');
  if (btnBrandHome) {
    btnBrandHome.addEventListener('click', () => {
      appState.setLayout('syllabus-board');
    });
  }

  const btnLayoutDropdown = container.querySelector('#btn-layout-dropdown');
  const layoutMenu = container.querySelector('#layout-menu');
  if (btnLayoutDropdown && layoutMenu) {
    btnLayoutDropdown.addEventListener('click', (e) => {
      e.stopPropagation();
      layoutMenu.classList.toggle('hidden');
    });

    document.addEventListener('click', () => {
      layoutMenu.classList.add('hidden');
    });

    layoutMenu.querySelectorAll('[data-layout-id]').forEach(btn => {
      btn.addEventListener('click', () => {
        const layoutId = btn.getAttribute('data-layout-id');
        appState.setLayout(layoutId);
        layoutMenu.classList.add('hidden');
      });
    });
  }

  const btnOpenTheme = container.querySelector('#btn-open-theme');
  if (btnOpenTheme) btnOpenTheme.addEventListener('click', () => appState.setThemeModalOpen(true));

  const btnOpenQuiz = container.querySelector('#btn-open-quiz');
  if (btnOpenQuiz) btnOpenQuiz.addEventListener('click', () => appState.setQuizOpen(true));

  const btnOpenCheatsheet = container.querySelector('#btn-open-cheatsheet');
  if (btnOpenCheatsheet) btnOpenCheatsheet.addEventListener('click', () => appState.setCheatsheetOpen(true));

  const btnOpenLabrecord = container.querySelector('#btn-open-labrecord');
  if (btnOpenLabrecord) btnOpenLabrecord.addEventListener('click', () => appState.setLabRecordOpen(true));

  const btnToggleAiTutor = container.querySelector('#btn-toggle-aitutor');
  if (btnToggleAiTutor) btnToggleAiTutor.addEventListener('click', () => appState.toggleAiTutor());
}


  // ==========================================
  // MODULE: sidebar.js
  // ==========================================

let searchQuery = '';
let selectedModule = 'All';
let selectedDifficulty = 'All';

function renderSidebar(container) {
  const { themeConfig, activePracticalId, completedIds, starredIds } = appState;
  const filtered = searchPracticals(searchQuery, selectedModule, selectedDifficulty);

  container.innerHTML = `
    <aside class="w-72 md:w-80 h-full border-r ${themeConfig.borderColor} ${themeConfig.sidebarBg} flex flex-col shrink-0 overflow-hidden select-none">
      <!-- Search & Filter Bar -->
      <div class="p-3 border-b ${themeConfig.borderColor} space-y-2 shrink-0">
        <div class="relative">
          <input
            type="text"
            id="sidebar-search-input"
            placeholder="Search practicals, tags, topics..."
            value="${searchQuery}"
            class="w-full pl-7 pr-3 py-1.5 rounded-sm text-xs ${themeConfig.cardSubBg} border ${themeConfig.borderColor} ${themeConfig.textHeading} placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
          />
          <i data-lucide="search" class="w-3.5 h-3.5 absolute left-2 top-2.5 text-slate-500"></i>
        </div>

        <div class="flex gap-2 text-[10px]">
          <select id="module-filter-select" class="flex-1 px-2 py-1 rounded-sm ${themeConfig.cardSubBg} border ${themeConfig.borderColor} ${themeConfig.textHeading} focus:outline-none">
            <option value="All" ${selectedModule === 'All' ? 'selected' : ''}>All Modules (${allPracticals.length})</option>
            ${modulesList.map(m => `
              <option value="${m.name}" ${selectedModule === m.name ? 'selected' : ''}>${m.name.split(':')[0]} (${m.count})</option>
            `).join('')}
          </select>

          <select id="diff-filter-select" class="w-24 px-2 py-1 rounded-sm ${themeConfig.cardSubBg} border ${themeConfig.borderColor} ${themeConfig.textHeading} focus:outline-none">
            <option value="All" ${selectedDifficulty === 'All' ? 'selected' : ''}>Difficulty</option>
            <option value="Beginner" ${selectedDifficulty === 'Beginner' ? 'selected' : ''}>Beginner</option>
            <option value="Intermediate" ${selectedDifficulty === 'Intermediate' ? 'selected' : ''}>Intermediate</option>
            <option value="Advanced" ${selectedDifficulty === 'Advanced' ? 'selected' : ''}>Advanced</option>
          </select>
        </div>
      </div>

      <!-- Practicals Explorer Tree / List -->
      <div class="flex-1 overflow-y-auto p-2 space-y-1">
        ${filtered.length === 0 ? `
          <div class="p-6 text-center text-xs ${themeConfig.textMuted}">
            No practicals found matching "${searchQuery}".
          </div>
        ` : filtered.map(p => {
    const isActive = p.id === activePracticalId;
    const isDone = completedIds.includes(p.id);
    const isStarred = starredIds.includes(p.id);

    return `
            <div
              data-practical-id="${p.id}"
              class="group p-2 rounded-sm border cursor-pointer transition-all flex items-start justify-between gap-2 ${isActive
        ? `${themeConfig.cardSubBg} ${themeConfig.accentBorder} shadow-sm`
        : `border-transparent hover:${themeConfig.cardSubBg} opacity-80 hover:opacity-100`
      }"
            >
              <div class="flex items-start gap-2 min-w-0">
                <span
                  class="w-6 h-6 rounded-xs shrink-0 flex items-center justify-center font-bold text-[10px] ${isActive
        ? `${themeConfig.accentBg} ${themeConfig.accentTextColor}`
        : `${themeConfig.cardSubBg} ${themeConfig.textHeading} border ${themeConfig.borderColor}`
      }"
                >
                  #${p.id}
                </span>

                <div class="min-w-0 space-y-0.5">
                  <div class="text-xs font-bold ${isActive ? themeConfig.textHeading : themeConfig.textColor} truncate">
                    ${p.title}
                  </div>
                  <div class="flex items-center gap-1.5 text-[9px] ${themeConfig.textMuted}">
                    <span>${p.difficulty}</span>
                    <span>â€¢</span>
                    <span>${p.estimatedMinutes}m</span>
                  </div>
                </div>
              </div>

              <!-- Quick Status Badges -->
              <div class="flex items-center gap-1 shrink-0">
                ${isStarred ? `<i data-lucide="star" class="w-3 h-3 text-amber-400 fill-amber-400"></i>` : ''}
                ${isDone ? `<i data-lucide="check-circle-2" class="w-3.5 h-3.5 text-emerald-400"></i>` : ''}
              </div>
            </div>
          `;
  }).join('')}
      </div>
    </aside>
  `;

  // Attach Event Listeners
  const searchInput = container.querySelector('#sidebar-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderSidebar(container);
    });
  }

  const moduleSelect = container.querySelector('#module-filter-select');
  if (moduleSelect) {
    moduleSelect.addEventListener('change', (e) => {
      selectedModule = e.target.value;
      renderSidebar(container);
    });
  }

  const diffSelect = container.querySelector('#diff-filter-select');
  if (diffSelect) {
    diffSelect.addEventListener('change', (e) => {
      selectedDifficulty = e.target.value;
      renderSidebar(container);
    });
  }

  container.querySelectorAll('[data-practical-id]').forEach(item => {
    item.addEventListener('click', () => {
      const pid = parseInt(item.getAttribute('data-practical-id'), 10);
      appState.setActivePractical(pid);
    });
  });
}


  // ==========================================
  // MODULE: telemetryBar.js
  // ==========================================

function renderTelemetryBar(container) {
  const { themeConfig, activePracticalId, completedIds, starredIds, currentLayout } = appState;
  const activePractical = getPracticalById(activePracticalId) || allPracticals[0];
  const isCompleted = completedIds.includes(activePractical.id);
  const isStarred = starredIds.includes(activePractical.id);

  container.innerHTML = `
    <div class="grid grid-cols-2 md:grid-cols-4 border-b ${themeConfig.borderColor} ${themeConfig.ribbonBg} shrink-0 select-none">
      <!-- Box 1: Node Identifier -->
      <div class="border-r border-b md:border-b-0 ${themeConfig.borderColor} p-3 flex flex-col justify-between">
        <div class="flex items-center justify-between">
          <span class="text-[9px] ${themeConfig.textMuted} uppercase tracking-tight">PRACTICAL_NODE</span>
          <span class="text-[9px] px-1.5 py-0.2 border rounded-xs font-bold ${themeConfig.accentBadgeBg}">
            ACTIVE
          </span>
        </div>
        <div class="text-xl sm:text-2xl ${themeConfig.textHeading} font-bold tracking-tighter">
          #${activePractical.id}
          <span class="text-xs font-normal ml-2" style="color: ${themeConfig.previewColor}">/ 38</span>
        </div>
        <div class="text-[9px] ${themeConfig.textMuted} truncate">${activePractical.module}</div>
      </div>

      <!-- Box 2: Difficulty & Execution Time -->
      <div class="border-r border-b md:border-b-0 ${themeConfig.borderColor} p-3 flex flex-col justify-between">
        <span class="text-[9px] ${themeConfig.textMuted} uppercase tracking-tight">COMPLEXITY_TIER</span>
        <div class="text-xl sm:text-2xl ${themeConfig.textHeading} font-bold tracking-tighter uppercase">
          ${activePractical.difficulty}
        </div>
        <div class="flex items-center gap-1 text-[9px] ${themeConfig.textMuted}">
          <i data-lucide="clock" class="w-3 h-3" style="color: ${themeConfig.previewColor}"></i>
          <span>EST: ${activePractical.estimatedMinutes} MINS</span>
        </div>
      </div>

      <!-- Box 3: Status / Verification Flag -->
      <div class="border-r ${themeConfig.borderColor} p-3 flex flex-col justify-between">
        <span class="text-[9px] ${themeConfig.textMuted} uppercase tracking-tight">VERIFICATION_STATUS</span>
        <div class="text-xl sm:text-2xl font-bold tracking-tighter">
          ${isCompleted ? '<span class="text-emerald-400">VERIFIED</span>' : '<span class="text-amber-400">PENDING</span>'}
        </div>
        <div class="flex gap-1.5 items-center text-[9px]">
          <span class="w-1.5 h-1.5 rounded-full ${isCompleted ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'}"></span>
          <span class="${themeConfig.textMuted} uppercase">${isCompleted ? 'LAB SIGNED' : 'AWAITING RUN'}</span>
        </div>
      </div>

      <!-- Box 4: Controls & Shortcuts -->
      <div class="p-3 flex flex-col justify-between">
        <span class="text-[9px] ${themeConfig.textMuted} uppercase tracking-tight">CONTROL_MATRIX</span>
        <div class="flex items-center gap-1.5">
          <button
            id="btn-toggle-complete"
            class="flex items-center gap-1 px-2.5 py-1 rounded-sm text-[10px] font-bold uppercase transition-colors cursor-pointer ${isCompleted
      ? 'bg-emerald-500 text-black'
      : `${themeConfig.cardSubBg} border ${themeConfig.borderColor} ${themeConfig.textHeading} hover:border-slate-500`
    }"
          >
            <i data-lucide="check-circle-2" class="w-3 h-3"></i>
            <span>${isCompleted ? 'COMPLETE' : 'MARK DONE'}</span>
          </button>

          <button
            id="btn-toggle-star"
            class="p-1 rounded-sm border cursor-pointer ${isStarred
      ? 'bg-amber-500/20 border-amber-500 text-amber-400'
      : `${themeConfig.cardSubBg} ${themeConfig.borderColor} ${themeConfig.textMuted} hover:text-white`
    }"
            title="Star Practical"
          >
            <i data-lucide="star" class="w-3 h-3 ${isStarred ? 'fill-current' : ''}"></i>
          </button>

          <div class="flex items-center border ${themeConfig.borderColor} ${themeConfig.cardBg} rounded-sm ml-auto">
            <button
              id="btn-prev-practical"
              ${activePractical.id === 1 ? 'disabled' : ''}
              class="p-1 hover:bg-black/20 disabled:opacity-20 ${themeConfig.textHeading} cursor-pointer"
              title="Previous Practical"
            >
              <i data-lucide="chevron-left" class="w-3.5 h-3.5"></i>
            </button>
            <button
              id="btn-next-practical"
              ${activePractical.id === 38 ? 'disabled' : ''}
              class="p-1 hover:bg-black/20 disabled:opacity-20 ${themeConfig.textHeading} border-l ${themeConfig.borderColor} cursor-pointer"
              title="Next Practical"
            >
              <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        </div>
        <div class="text-[9px] ${themeConfig.textMuted} truncate flex justify-between">
          <span>LAYOUT: ${currentLayout.toUpperCase()}</span>
          <button 
            id="btn-telemetry-options"
            class="hover:underline text-cyan-400 font-bold cursor-pointer"
            style="color: ${themeConfig.previewColor}"
          >
            OPTIONS
          </button>
        </div>
      </div>
    </div>
  `;

  // Attach Event Listeners
  const btnToggleComplete = container.querySelector('#btn-toggle-complete');
  if (btnToggleComplete) {
    btnToggleComplete.addEventListener('click', () => {
      appState.toggleComplete(activePractical.id);
      if (typeof window.confetti === 'function' && !isCompleted) {
        window.confetti({ particleCount: 70, spread: 60, origin: { y: 0.8 } });
      }
    });
  }

  const btnToggleStar = container.querySelector('#btn-toggle-star');
  if (btnToggleStar) {
    btnToggleStar.addEventListener('click', () => {
      appState.toggleStar(activePractical.id);
    });
  }

  const btnPrev = container.querySelector('#btn-prev-practical');
  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      const prevIdx = allPracticals.findIndex(p => p.id === activePractical.id) - 1;
      if (prevIdx >= 0) appState.setActivePractical(allPracticals[prevIdx].id);
    });
  }

  const btnNext = container.querySelector('#btn-next-practical');
  if (btnNext) {
    btnNext.addEventListener('click', () => {
      const nextIdx = allPracticals.findIndex(p => p.id === activePractical.id) + 1;
      if (nextIdx < allPracticals.length) appState.setActivePractical(allPracticals[nextIdx].id);
    });
  }

  const btnOptions = container.querySelector('#btn-telemetry-options');
  if (btnOptions) {
    btnOptions.addEventListener('click', () => appState.setThemeModalOpen(true));
  }
}


  // ==========================================
  // MODULE: codeViewer.js
  // ==========================================

function renderCodeViewer(container, practical) {
  const { themeConfig } = appState;
  if (!practical) return;

  container.innerHTML = `
    <div class="space-y-4">
      <!-- Code Box Card -->
      <div class="border ${themeConfig.borderColor} ${themeConfig.cardBg} rounded-sm overflow-hidden shadow-md">
        <div class="flex items-center justify-between px-3 py-2 border-b ${themeConfig.borderColor} ${themeConfig.headerBg} select-none">
          <div class="flex items-center gap-2">
            <i data-lucide="code-2" class="w-4 h-4 text-cyan-400"></i>
            <span class="text-xs font-bold ${themeConfig.textHeading}">Practical_${practical.id}.cs</span>
            <span class="text-[9px] px-1.5 py-0.2 rounded-xs border font-bold ${themeConfig.accentBadgeBg}">C# .NET 8.0</span>
          </div>

          <button
            id="btn-copy-code"
            class="flex items-center gap-1 px-2.5 py-1 rounded-sm text-[10px] font-bold border ${themeConfig.borderColor} ${themeConfig.cardSubBg} ${themeConfig.textHeading} hover:border-cyan-500 transition-colors cursor-pointer"
          >
            <i data-lucide="copy" class="w-3 h-3"></i>
            <span id="copy-btn-text">COPY CODE</span>
          </button>
        </div>

        <div class="p-3 overflow-x-auto ${themeConfig.terminalBg} font-mono text-xs leading-relaxed">
          <pre><code>${escapeHtml(practical.code)}</code></pre>
        </div>
      </div>

      <!-- Algorithmic Execution Steps Card -->
      <div class="border ${themeConfig.borderColor} ${themeConfig.cardSubBg} rounded-sm p-4 space-y-3">
        <div class="flex items-center gap-2">
          <i data-lucide="list-ordered" class="w-4 h-4 text-emerald-400"></i>
          <h3 class="text-xs font-bold ${themeConfig.textHeading} uppercase tracking-wider">Algorithmic Execution Steps</h3>
        </div>

        <ol class="space-y-2 text-xs ${themeConfig.textColor} list-decimal list-inside pl-1">
          ${practical.algorithm.map(step => `
            <li class="leading-relaxed"><span class="${themeConfig.textColor}">${escapeHtml(step)}</span></li>
          `).join('')}
        </ol>
      </div>

      <!-- Code Explanation Note -->
      <div class="border ${themeConfig.borderColor} ${themeConfig.cardSubBg} rounded-sm p-4 space-y-2">
        <div class="flex items-center gap-2 text-amber-400">
          <i data-lucide="lightbulb" class="w-4 h-4"></i>
          <h3 class="text-xs font-bold uppercase tracking-wider">Code Architecture & Concept Summary</h3>
        </div>
        <p class="text-xs ${themeConfig.textColor} leading-relaxed">
          ${escapeHtml(practical.codeExplanation)}
        </p>
      </div>
    </div>
  `;

  // Attach Copy Code Event
  const btnCopy = container.querySelector('#btn-copy-code');
  const copyText = container.querySelector('#copy-btn-text');
  if (btnCopy && copyText) {
    btnCopy.addEventListener('click', () => {
      navigator.clipboard.writeText(practical.code);
      copyText.textContent = 'COPIED!';
      setTimeout(() => {
        copyText.textContent = 'COPY CODE';
      }, 2000);
    });
  }
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}


  // ==========================================
  // MODULE: dryRunVisualizer.js
  // ==========================================

let currentStepIndex = 0;
let isPlaying = false;
let playInterval = null;

function renderDryRunVisualizer(container, practical) {
  const { themeConfig } = appState;
  if (!practical || !practical.traceSteps || practical.traceSteps.length === 0) {
    container.innerHTML = `
      <div class="p-6 border ${themeConfig.borderColor} ${themeConfig.cardSubBg} rounded-sm text-center text-xs ${themeConfig.textMuted}">
        No dry run trace steps available for this practical.
      </div>
    `;
    return;
  }

  const steps = practical.traceSteps;
  if (currentStepIndex >= steps.length) currentStepIndex = 0;

  const currentStep = steps[currentStepIndex];

  container.innerHTML = `
    <div class="space-y-4">
      <!-- Debugger Control Bar -->
      <div class="border ${themeConfig.borderColor} ${themeConfig.cardBg} rounded-sm p-3 flex flex-wrap items-center justify-between gap-3 shadow-md select-none">
        <div class="flex items-center gap-2">
          <i data-lucide="cpu" class="w-4 h-4 text-cyan-400"></i>
          <span class="text-xs font-bold ${themeConfig.textHeading}">VS CLR DEBUGGER REGISTER WATCH</span>
          <span class="text-[9px] px-1.5 py-0.2 rounded-xs border font-bold ${themeConfig.accentBadgeBg}">
            STEP ${currentStepIndex + 1} / ${steps.length}
          </span>
        </div>

        <div class="flex items-center gap-1.5">
          <button
            id="btn-dryrun-prev"
            ${currentStepIndex === 0 ? 'disabled' : ''}
            class="px-2 py-1 rounded-sm text-[10px] font-bold border ${themeConfig.borderColor} ${themeConfig.cardSubBg} ${themeConfig.textHeading} hover:border-slate-500 disabled:opacity-30 cursor-pointer"
          >
            <i data-lucide="skip-back" class="w-3 h-3 inline"></i> STEP BACK
          </button>

          <button
            id="btn-dryrun-play"
            class="px-3 py-1 rounded-sm text-[10px] font-bold uppercase ${isPlaying ? 'bg-amber-500 text-black' : `${themeConfig.accentBg} ${themeConfig.accentTextColor}`} cursor-pointer"
          >
            <i data-lucide="${isPlaying ? 'pause' : 'play'}" class="w-3 h-3 inline"></i> ${isPlaying ? 'PAUSE' : 'AUTO STEP'}
          </button>

          <button
            id="btn-dryrun-next"
            ${currentStepIndex === steps.length - 1 ? 'disabled' : ''}
            class="px-2 py-1 rounded-sm text-[10px] font-bold border ${themeConfig.borderColor} ${themeConfig.cardSubBg} ${themeConfig.textHeading} hover:border-slate-500 disabled:opacity-30 cursor-pointer"
          >
            STEP NEXT <i data-lucide="skip-forward" class="w-3 h-3 inline"></i>
          </button>

          <button
            id="btn-dryrun-reset"
            class="p-1 rounded-sm text-[10px] font-bold border ${themeConfig.borderColor} ${themeConfig.cardSubBg} ${themeConfig.textMuted} hover:text-white cursor-pointer"
            title="Reset Trace"
          >
            <i data-lucide="rotate-ccw" class="w-3.5 h-3.5"></i>
          </button>
        </div>
      </div>

      <!-- Current Step Explanation Banner -->
      <div class="border border-cyan-500/40 bg-cyan-500/10 p-3 rounded-sm space-y-1">
        <div class="flex items-center gap-2">
          <span class="px-1.5 py-0.2 rounded-xs bg-cyan-500 text-black font-black text-[9px]">
            LINE ${currentStep.line}
          </span>
          <span class="text-xs font-bold text-cyan-300 truncate">
            ${currentStep.callStack || 'Program Execution'}
          </span>
        </div>
        <p class="text-xs text-slate-200 leading-relaxed font-mono">
          ${currentStep.explanation}
        </p>
      </div>

      <!-- Memory Variable Registers Table & Call Stack -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Variable Registers Table -->
        <div class="border ${themeConfig.borderColor} ${themeConfig.cardSubBg} rounded-sm overflow-hidden space-y-0">
          <div class="px-3 py-2 border-b ${themeConfig.borderColor} ${themeConfig.headerBg} flex items-center justify-between">
            <span class="text-xs font-bold ${themeConfig.textHeading} flex items-center gap-1.5">
              <i data-lucide="database" class="w-3.5 h-3.5 text-emerald-400"></i>
              VARIABLE STACK REGISTERS
            </span>
            <span class="text-[9px] ${themeConfig.textMuted} font-mono">ACTIVE MEMORY</span>
          </div>

          <div class="p-2 overflow-x-auto">
            <table class="w-full text-xs font-mono text-left">
              <thead>
                <tr class="border-b ${themeConfig.borderColor} text-[10px] ${themeConfig.textMuted}">
                  <th class="p-1.5">VARIABLE</th>
                  <th class="p-1.5">VALUE IN MEMORY</th>
                </tr>
              </thead>
              <tbody>
                ${Object.entries(currentStep.variables || {}).map(([key, val]) => `
                  <tr class="border-b ${themeConfig.borderColor}/50 hover:bg-white/5">
                    <td class="p-1.5 text-cyan-400 font-bold">${key}</td>
                    <td class="p-1.5 text-amber-300">${val}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Output Log & Call Stack Card -->
        <div class="border ${themeConfig.borderColor} ${themeConfig.cardSubBg} rounded-sm overflow-hidden flex flex-col">
          <div class="px-3 py-2 border-b ${themeConfig.borderColor} ${themeConfig.headerBg} flex items-center justify-between">
            <span class="text-xs font-bold ${themeConfig.textHeading} flex items-center gap-1.5">
              <i data-lucide="terminal" class="w-3.5 h-3.5 text-amber-400"></i>
              CONSOLE OUTPUT / EVENT LOG
            </span>
            <span class="text-[9px] ${themeConfig.textMuted}">STDOUT</span>
          </div>

          <div class="p-3 flex-1 ${themeConfig.terminalBg} font-mono text-xs overflow-y-auto space-y-1 min-h-[140px]">
            ${currentStep.outputLog ? `
              <div class="text-emerald-400 font-bold">[OUTPUT] ${currentStep.outputLog}</div>
            ` : `
              <div class="text-slate-500 italic">&gt; Executing line ${currentStep.line}...</div>
            `}
            ${practical.simulatedOutput ? practical.simulatedOutput.slice(0, currentStepIndex + 2).map(line => `
              <div class="text-slate-300">${line}</div>
            `).join('') : ''}
          </div>
        </div>
      </div>
    </div>
  `;

  // Attach Event Listeners
  const btnPrev = container.querySelector('#btn-dryrun-prev');
  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      if (currentStepIndex > 0) {
        currentStepIndex--;
        renderDryRunVisualizer(container, practical);
      }
    });
  }

  const btnNext = container.querySelector('#btn-dryrun-next');
  if (btnNext) {
    btnNext.addEventListener('click', () => {
      if (currentStepIndex < steps.length - 1) {
        currentStepIndex++;
        renderDryRunVisualizer(container, practical);
      }
    });
  }

  const btnPlay = container.querySelector('#btn-dryrun-play');
  if (btnPlay) {
    btnPlay.addEventListener('click', () => {
      isPlaying = !isPlaying;
      if (isPlaying) {
        playInterval = setInterval(() => {
          if (currentStepIndex < steps.length - 1) {
            currentStepIndex++;
            renderDryRunVisualizer(container, practical);
          } else {
            isPlaying = false;
            clearInterval(playInterval);
            renderDryRunVisualizer(container, practical);
          }
        }, 1500);
      } else {
        clearInterval(playInterval);
      }
      renderDryRunVisualizer(container, practical);
    });
  }

  const btnReset = container.querySelector('#btn-dryrun-reset');
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      isPlaying = false;
      clearInterval(playInterval);
      currentStepIndex = 0;
      renderDryRunVisualizer(container, practical);
    });
  }
}


  // ==========================================
  // MODULE: winformsEmulator.js
  // ==========================================

function renderWinFormsEmulator(container, practical) {
  const { themeConfig } = appState;
  if (!practical) return;

  const type = practical.emulatorType || 'console-io';

  container.innerHTML = `
    <div class="border ${themeConfig.borderColor} ${themeConfig.cardBg} rounded-sm overflow-hidden shadow-lg select-none">
      <!-- Windows Classic Title Bar Header -->
      <div class="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700/80 px-3 py-2 flex items-center justify-between text-white text-xs font-sans">
        <div class="flex items-center gap-2">
          <div class="w-3 h-3 bg-blue-500 rounded-xs flex items-center justify-center font-bold text-[8px] text-white">#</div>
          <span class="font-bold tracking-tight text-slate-100">${practical.title} - [Form1.cs]</span>
        </div>
        <div class="flex items-center gap-1.5 opacity-80">
          <span class="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
          <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
          <span class="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span>
        </div>
      </div>

      <!-- Emulated Window Client Area Canvas -->
      <div id="winforms-emulator-canvas" class="p-4 ${themeConfig.cardSubBg} min-h-[380px] font-sans text-xs">
        ${renderEmulatorMarkup(type, practical)}
      </div>
    </div>
  `;

  // Wire interactive listeners based on emulatorType
  wireEmulatorEvents(container, type, practical);
}

function renderEmulatorMarkup(type, practical) {
  switch (type) {
    case 'grid-calculator':
      return `
        <div class="max-w-sm mx-auto bg-slate-900 border border-slate-700 rounded-sm p-4 space-y-3 font-mono text-white shadow-2xl">
          <div class="text-right text-[10px] text-slate-400 h-4" id="calc-equation"></div>
          <input type="text" id="calc-display" value="0" readonly class="w-full bg-slate-950 border border-slate-800 text-right text-2xl p-2 font-bold text-cyan-400 rounded-sm" />
          <div class="grid grid-cols-4 gap-2 text-xs font-bold">
            <button class="calc-btn p-3 bg-slate-800 hover:bg-slate-700 rounded-sm text-rose-400">C</button>
            <button class="calc-btn p-3 bg-slate-800 hover:bg-slate-700 rounded-sm text-cyan-400">âˆš</button>
            <button class="calc-btn p-3 bg-slate-800 hover:bg-slate-700 rounded-sm text-cyan-400">%</button>
            <button class="calc-btn p-3 bg-slate-800 hover:bg-slate-700 rounded-sm text-cyan-400">Ã·</button>
            <button class="calc-btn p-3 bg-slate-800 hover:bg-slate-700 rounded-sm">7</button>
            <button class="calc-btn p-3 bg-slate-800 hover:bg-slate-700 rounded-sm">8</button>
            <button class="calc-btn p-3 bg-slate-800 hover:bg-slate-700 rounded-sm">9</button>
            <button class="calc-btn p-3 bg-slate-800 hover:bg-slate-700 rounded-sm text-cyan-400">Ã—</button>
            <button class="calc-btn p-3 bg-slate-800 hover:bg-slate-700 rounded-sm">4</button>
            <button class="calc-btn p-3 bg-slate-800 hover:bg-slate-700 rounded-sm">5</button>
            <button class="calc-btn p-3 bg-slate-800 hover:bg-slate-700 rounded-sm">6</button>
            <button class="calc-btn p-3 bg-slate-800 hover:bg-slate-700 rounded-sm text-cyan-400">-</button>
            <button class="calc-btn p-3 bg-slate-800 hover:bg-slate-700 rounded-sm">1</button>
            <button class="calc-btn p-3 bg-slate-800 hover:bg-slate-700 rounded-sm">2</button>
            <button class="calc-btn p-3 bg-slate-800 hover:bg-slate-700 rounded-sm">3</button>
            <button class="calc-btn p-3 bg-slate-800 hover:bg-slate-700 rounded-sm text-cyan-400">+</button>
            <button class="calc-btn col-span-2 p-3 bg-slate-800 hover:bg-slate-700 rounded-sm">0</button>
            <button class="calc-btn p-3 bg-slate-800 hover:bg-slate-700 rounded-sm">.</button>
            <button class="calc-btn p-3 bg-cyan-500 text-black hover:bg-cyan-400 rounded-sm font-black">=</button>
          </div>
        </div>
      `;

    case 'registration-form':
      return `
        <div class="max-w-md mx-auto bg-slate-900 border border-slate-700 rounded-sm p-4 space-y-3 text-slate-100">
          <h3 class="text-sm font-bold text-cyan-400 border-b border-slate-800 pb-2">Student Registration Form</h3>
          <div class="space-y-2">
            <div>
              <label class="block text-[10px] text-slate-400 font-bold mb-1">STUDENT NAME *</label>
              <input type="text" id="reg-name" placeholder="e.g. Kavya Patel" class="w-full bg-slate-950 border border-slate-800 p-1.5 rounded-sm text-xs text-white" />
            </div>
            <div>
              <label class="block text-[10px] text-slate-400 font-bold mb-1">EMAIL ID *</label>
              <input type="email" id="reg-email" placeholder="e.g. kavya@college.edu" class="w-full bg-slate-950 border border-slate-800 p-1.5 rounded-sm text-xs text-white" />
            </div>
            <div>
              <label class="block text-[10px] text-slate-400 font-bold mb-1">COURSE</label>
              <select id="reg-course" class="w-full bg-slate-950 border border-slate-800 p-1.5 rounded-sm text-xs text-white">
                <option value="">-- Select Course --</option>
                <option value="BCA">BCA (Bachelor of Computer Applications)</option>
                <option value="B.Sc CS">B.Sc Computer Science</option>
                <option value="B.Tech">B.Tech IT</option>
              </select>
            </div>
            <div>
              <label class="block text-[10px] text-slate-400 font-bold mb-1">GENDER</label>
              <div class="flex items-center gap-4 text-xs">
                <label class="flex items-center gap-1 cursor-pointer"><input type="radio" name="reg-gender" value="Male" checked /> Male</label>
                <label class="flex items-center gap-1 cursor-pointer"><input type="radio" name="reg-gender" value="Female" /> Female</label>
              </div>
            </div>
            <button id="btn-reg-submit" class="w-full py-2 bg-emerald-500 text-black font-bold rounded-sm hover:bg-emerald-400 transition-colors uppercase text-xs">
              Register Student (MessageBox.Show)
            </button>
          </div>
          <div id="reg-msgbox" class="hidden p-3 bg-emerald-500/10 border border-emerald-500/40 rounded-sm text-emerald-300 text-xs font-mono whitespace-pre-line"></div>
        </div>
      `;

    case 'login-form':
      return `
        <div class="max-w-xs mx-auto bg-slate-900 border border-slate-700 rounded-sm p-4 space-y-3 text-slate-100">
          <div class="text-center space-y-1">
            <h3 class="text-sm font-bold text-cyan-400">Admin Login Portal</h3>
            <p class="text-[10px] text-slate-400">Enter credentials (admin / admin@123)</p>
          </div>
          <div class="space-y-2">
            <div>
              <label class="block text-[10px] text-slate-400 font-bold mb-1">USERNAME</label>
              <input type="text" id="login-user" value="admin" class="w-full bg-slate-950 border border-slate-800 p-1.5 rounded-sm text-xs text-white" />
            </div>
            <div>
              <label class="block text-[10px] text-slate-400 font-bold mb-1">PASSWORD (PasswordChar: â€¢)</label>
              <input type="password" id="login-pass" value="admin@123" class="w-full bg-slate-950 border border-slate-800 p-1.5 rounded-sm text-xs text-white" />
            </div>
            <label class="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer">
              <input type="checkbox" id="chk-show-pass" /> Show Password
            </label>
            <button id="btn-login-submit" class="w-full py-1.5 bg-cyan-500 text-black font-bold rounded-sm hover:bg-cyan-400 text-xs uppercase">
              Authenticate
            </button>
          </div>
          <div id="login-status" class="text-center text-xs font-bold text-slate-400 pt-2 border-t border-slate-800">
            Attempts Remaining: 3
          </div>
        </div>
      `;

    case 'stopwatch-timer':
      return `
        <div class="max-w-md mx-auto bg-slate-900 border border-slate-700 rounded-sm p-4 space-y-4 text-center text-slate-100">
          <h3 class="text-xs font-bold text-slate-400 uppercase">System.Windows.Forms.Timer Stopwatch</h3>
          <div id="stopwatch-display" class="text-4xl font-mono font-bold text-cyan-400 tracking-wider">
            00:00:00.00
          </div>
          <div class="flex justify-center gap-2">
            <button id="btn-sw-start" class="px-3 py-1.5 bg-emerald-500 text-black font-bold rounded-sm text-xs">START</button>
            <button id="btn-sw-pause" class="px-3 py-1.5 bg-amber-500 text-black font-bold rounded-sm text-xs">PAUSE</button>
            <button id="btn-sw-lap" class="px-3 py-1.5 bg-cyan-500 text-black font-bold rounded-sm text-xs">LAP</button>
            <button id="btn-sw-reset" class="px-3 py-1.5 bg-rose-500 text-white font-bold rounded-sm text-xs">RESET</button>
          </div>
          <div class="border-t border-slate-800 pt-2 text-left">
            <span class="text-[10px] text-slate-400 font-bold">LAP TIMESTAMPS:</span>
            <div id="sw-laps-list" class="h-28 overflow-y-auto bg-slate-950 p-2 font-mono text-xs text-slate-300 rounded-sm space-y-1 mt-1 border border-slate-800">
              <div class="text-slate-500 italic">No laps recorded yet.</div>
            </div>
          </div>
        </div>
      `;

    case 'todo-list':
      return `
        <div class="max-w-md mx-auto bg-slate-900 border border-slate-700 rounded-sm p-4 space-y-3 text-slate-100">
          <h3 class="text-xs font-bold text-cyan-400 uppercase">CheckedListBox Task Manager</h3>
          <div class="flex gap-2">
            <input type="text" id="todo-input" placeholder="Enter task..." class="flex-1 bg-slate-950 border border-slate-800 p-1.5 rounded-sm text-xs text-white" />
            <select id="todo-priority" class="bg-slate-950 border border-slate-800 p-1.5 rounded-sm text-xs text-white">
              <option value="High">ðŸ”´ High</option>
              <option value="Medium" selected>ðŸŸ¡ Medium</option>
              <option value="Low">ðŸŸ¢ Low</option>
            </select>
            <button id="btn-todo-add" class="px-3 py-1.5 bg-emerald-500 text-black font-bold rounded-sm text-xs">ADD</button>
          </div>
          <div id="todo-list-box" class="min-h-[140px] bg-slate-950 border border-slate-800 rounded-sm p-2 space-y-1 overflow-y-auto">
            <label class="flex items-center gap-2 p-1.5 hover:bg-slate-800 rounded-xs text-xs cursor-pointer">
              <input type="checkbox" class="todo-item-chk" /> ðŸ”´ [HIGH] Complete ADO.NET Assignment
            </label>
            <label class="flex items-center gap-2 p-1.5 hover:bg-slate-800 rounded-xs text-xs cursor-pointer">
              <input type="checkbox" class="todo-item-chk" /> ðŸŸ¡ [MED] Review Crystal Reports
            </label>
          </div>
          <div class="flex justify-between items-center text-xs text-slate-400">
            <span id="todo-stats">Completed: 0 / 2 Tasks</span>
            <button id="btn-todo-clear" class="text-rose-400 hover:underline">Remove Checked</button>
          </div>
        </div>
      `;

    default:
      // Generic Simulated WinForms Output Console View
      return `
        <div class="bg-slate-950 border border-slate-800 rounded-sm p-4 font-mono text-xs space-y-3">
          <div class="flex items-center justify-between text-[10px] text-slate-400 border-b border-slate-800 pb-2">
            <span>WINFORMS RUNTIME CANVAS // SIMULATION</span>
            <span class="text-emerald-400 font-bold">â— ACTIVE STDOUT</span>
          </div>

          <div class="space-y-1 text-slate-300 max-h-64 overflow-y-auto">
            ${(practical.simulatedOutput || ['Application launched successfully.']).map(line => `
              <div class="leading-relaxed text-cyan-300">&gt; ${escapeHtml(line)}</div>
            `).join('')}
          </div>

          <div class="p-3 bg-slate-900 border border-slate-800 rounded-sm text-slate-400 text-[11px] leading-relaxed">
            ðŸ’¡ <strong>Runtime Note</strong>: Practical #${practical.id} demonstrates <em>${escapeHtml(practical.aim)}</em>.
          </div>
        </div>
      `;
  }
}

function wireEmulatorEvents(container, type, practical) {
  if (type === 'grid-calculator') {
    let display = container.querySelector('#calc-display');
    let eq = container.querySelector('#calc-equation');
    let operand1 = null;
    let op = null;
    let isOpClicked = false;

    container.querySelectorAll('.calc-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const text = btn.textContent.trim();
        if ('0123456789.'.includes(text)) {
          if (display.value === '0' || isOpClicked) display.value = '';
          isOpClicked = false;
          if (text === '.' && display.value.includes('.')) return;
          display.value += text;
        } else if ('+-Ã—Ã·%'.includes(text)) {
          operand1 = parseFloat(display.value);
          op = text;
          isOpClicked = true;
          eq.textContent = `${operand1} ${op}`;
        } else if (text === '=') {
          if (operand1 !== null && op) {
            let operand2 = parseFloat(display.value);
            let res = 0;
            if (op === '+') res = operand1 + operand2;
            else if (op === '-') res = operand1 - operand2;
            else if (op === 'Ã—') res = operand1 * operand2;
            else if (op === 'Ã·') res = operand2 !== 0 ? operand1 / operand2 : 'Error';
            else if (op === '%') res = operand1 % operand2;
            display.value = res;
            eq.textContent = '';
            operand1 = null;
            op = null;
          }
        } else if (text === 'C') {
          display.value = '0';
          eq.textContent = '';
          operand1 = null;
          op = null;
        } else if (text === 'âˆš') {
          let val = parseFloat(display.value);
          display.value = val >= 0 ? Math.sqrt(val) : 'Error';
        }
      });
    });
  } else if (type === 'registration-form') {
    const btnSubmit = container.querySelector('#btn-reg-submit');
    const msgbox = container.querySelector('#reg-msgbox');
    if (btnSubmit && msgbox) {
      btnSubmit.addEventListener('click', () => {
        const name = container.querySelector('#reg-name').value.trim();
        const email = container.querySelector('#reg-email').value.trim();
        const course = container.querySelector('#reg-course').value;
        const gender = container.querySelector('input[name="reg-gender"]:checked').value;

        if (!name || !email || !course) {
          msgbox.className = 'p-3 bg-rose-500/10 border border-rose-500/40 rounded-sm text-rose-300 text-xs font-mono';
          msgbox.textContent = '[MessageBox.Show] Validation Error: Please fill in Name, Email, and select a Course!';
        } else {
          msgbox.className = 'p-3 bg-emerald-500/10 border border-emerald-500/40 rounded-sm text-emerald-300 text-xs font-mono';
          msgbox.textContent = `[MessageBox.Show] REGISTRATION CONFIRMED!\n\nName: ${name}\nEmail: ${email}\nCourse: ${course}\nGender: ${gender}\nStatus: Saved to Lab Database`;
        }
        msgbox.classList.remove('hidden');
      });
    }
  } else if (type === 'login-form') {
    const btnLogin = container.querySelector('#btn-login-submit');
    const chkShow = container.querySelector('#chk-show-pass');
    const passInput = container.querySelector('#login-pass');
    const statusDiv = container.querySelector('#login-status');
    let attempts = 3;

    if (chkShow && passInput) {
      chkShow.addEventListener('change', () => {
        passInput.type = chkShow.checked ? 'text' : 'password';
      });
    }

    if (btnLogin) {
      btnLogin.addEventListener('click', () => {
        const user = container.querySelector('#login-user').value.trim();
        const pass = passInput.value;

        if (user === 'admin' && pass === 'admin@123') {
          statusDiv.innerHTML = `<span class="text-emerald-400">âœ” Authenticated! Access Granted.</span>`;
          attempts = 3;
        } else {
          attempts--;
          if (attempts > 0) {
            statusDiv.innerHTML = `<span class="text-rose-400">Invalid Credentials! ${attempts} attempts left.</span>`;
          } else {
            statusDiv.innerHTML = `<span class="text-rose-500 font-bold">â›” Account Locked! Max attempts exceeded.</span>`;
            btnLogin.disabled = true;
          }
        }
      });
    }
  } else if (type === 'stopwatch-timer') {
    let swDisplay = container.querySelector('#stopwatch-display');
    let lapsList = container.querySelector('#sw-laps-list');
    let seconds = 0;
    let timer = null;

    const formatTime = (totalSec) => {
      let hrs = String(Math.floor(totalSec / 3600)).padStart(2, '0');
      let mins = String(Math.floor((totalSec % 3600) / 60)).padStart(2, '0');
      let secs = String(totalSec % 60).padStart(2, '0');
      return `${hrs}:${mins}:${secs}.00`;
    };

    container.querySelector('#btn-sw-start')?.addEventListener('click', () => {
      if (!timer) {
        timer = setInterval(() => {
          seconds++;
          swDisplay.textContent = formatTime(seconds);
        }, 1000);
      }
    });

    container.querySelector('#btn-sw-pause')?.addEventListener('click', () => {
      clearInterval(timer);
      timer = null;
    });

    container.querySelector('#btn-sw-reset')?.addEventListener('click', () => {
      clearInterval(timer);
      timer = null;
      seconds = 0;
      swDisplay.textContent = '00:00:00.00';
      lapsList.innerHTML = '<div class="text-slate-500 italic">No laps recorded yet.</div>';
    });

    container.querySelector('#btn-sw-lap')?.addEventListener('click', () => {
      if (seconds > 0) {
        if (lapsList.querySelector('.italic')) lapsList.innerHTML = '';
        let lapNum = lapsList.children.length + 1;
        let div = document.createElement('div');
        div.className = 'text-cyan-300';
        div.textContent = `Lap #${String(lapNum).padStart(2, '0')} - ${formatTime(seconds)}`;
        lapsList.insertBefore(div, lapsList.firstChild);
      }
    });
  } else if (type === 'todo-list') {
    const btnAdd = container.querySelector('#btn-todo-add');
    const input = container.querySelector('#todo-input');
    const prio = container.querySelector('#todo-priority');
    const listBox = container.querySelector('#todo-list-box');
    const stats = container.querySelector('#todo-stats');
    const btnClear = container.querySelector('#btn-todo-clear');

    const updateStats = () => {
      let total = listBox.querySelectorAll('label').length;
      let checked = listBox.querySelectorAll('input:checked').length;
      stats.textContent = `Completed: ${checked} / ${total} Tasks`;
    };

    btnAdd?.addEventListener('click', () => {
      let val = input.value.trim();
      if (!val) return;
      let badge = prio.value === 'High' ? 'ðŸ”´ [HIGH]' : (prio.value === 'Medium' ? 'ðŸŸ¡ [MED]' : 'ðŸŸ¢ [LOW]');
      let label = document.createElement('label');
      label.className = 'flex items-center gap-2 p-1.5 hover:bg-slate-800 rounded-xs text-xs cursor-pointer';
      label.innerHTML = `<input type="checkbox" class="todo-item-chk" /> ${badge} ${escapeHtml(val)}`;
      listBox.appendChild(label);
      input.value = '';
      updateStats();
    });

    listBox?.addEventListener('change', updateStats);

    btnClear?.addEventListener('click', () => {
      listBox.querySelectorAll('label').forEach(lbl => {
        if (lbl.querySelector('input').checked) {
          lbl.remove();
        }
      });
      updateStats();
    });
  }
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}


  // ==========================================
  // MODULE: visualStudioGuide.js
  // ==========================================

function renderVisualStudioGuide(container, practical) {
  const { themeConfig } = appState;
  if (!practical || !practical.vsSteps) {
    container.innerHTML = `
      <div class="p-6 border ${themeConfig.borderColor} ${themeConfig.cardSubBg} rounded-sm text-center text-xs ${themeConfig.textMuted}">
        No Visual Studio guide available for this practical.
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="space-y-4">
      <div class="border ${themeConfig.borderColor} ${themeConfig.cardBg} rounded-sm p-4 space-y-2 shadow-md">
        <div class="flex items-center gap-2 text-cyan-400">
          <i data-lucide="layout-template" class="w-4 h-4"></i>
          <h3 class="text-xs font-bold uppercase tracking-wider">Visual Studio Designer & Code-Behind Workflow</h3>
        </div>
        <p class="text-xs ${themeConfig.textColor} leading-relaxed">
          Follow these exact step-by-step instructions in Visual Studio (2019 / 2022 / 2025) to replicate <strong>Practical #${practical.id}</strong> from scratch.
        </p>
      </div>

      <!-- Steps Grid -->
      <div class="space-y-3">
        ${practical.vsSteps.map((step, idx) => `
          <div class="border ${themeConfig.borderColor} ${themeConfig.cardSubBg} rounded-sm p-4 space-y-2 flex items-start gap-3">
            <div class="w-7 h-7 rounded-sm ${themeConfig.accentBg} text-black font-black flex items-center justify-center text-xs shrink-0 shadow-sm">
              ${step.stepNumber || idx + 1}
            </div>

            <div class="space-y-1 min-w-0 flex-1">
              <h4 class="text-xs font-bold ${themeConfig.textHeading}">
                ${step.title}
              </h4>
              <p class="text-xs ${themeConfig.textColor} leading-relaxed">
                ${step.description}
              </p>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Practical VS Tips -->
      <div class="border ${themeConfig.borderColor} ${themeConfig.cardSubBg} p-4 rounded-sm space-y-2 text-xs ${themeConfig.textColor}">
        <h4 class="font-bold text-amber-400 flex items-center gap-1.5 uppercase tracking-wider">
          <i data-lucide="alert-triangle" class="w-4 h-4"></i>
          Visual Studio Keyboard Shortcuts
        </h4>
        <ul class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono pt-1">
          <li class="bg-black/20 p-2 rounded border ${themeConfig.borderColor}"><span class="text-cyan-400">Ctrl + Alt + X</span> : Open Toolbox</li>
          <li class="bg-black/20 p-2 rounded border ${themeConfig.borderColor}"><span class="text-cyan-400">F4</span> : Properties Window</li>
          <li class="bg-black/20 p-2 rounded border ${themeConfig.borderColor}"><span class="text-cyan-400">F7</span> : Toggle Code / Designer View</li>
          <li class="bg-black/20 p-2 rounded border ${themeConfig.borderColor}"><span class="text-cyan-400">F5</span> : Start Debugging</li>
        </ul>
      </div>
    </div>
  `;
}


  // ==========================================
  // MODULE: vivaVoceSection.js
  // ==========================================

function renderVivaVoceSection(container, practical) {
  const { themeConfig } = appState;
  const questions = practical?.vivaQuestions || generalVivaQuestions.slice(0, 4);

  container.innerHTML = `
    <div class="space-y-4 select-none">
      <div class="border ${themeConfig.borderColor} ${themeConfig.cardBg} rounded-sm p-4 space-y-2 shadow-md">
        <div class="flex items-center gap-2 text-violet-400">
          <i data-lucide="graduation-cap" class="w-4 h-4"></i>
          <h3 class="text-xs font-bold uppercase tracking-wider">BCA Sem-5 University Viva Voce Examination Bank</h3>
        </div>
        <p class="text-xs ${themeConfig.textColor} leading-relaxed">
          Master these frequent external examiner interview questions related to <strong>${practical?.title || 'C# .NET GUI'}</strong>.
        </p>
      </div>

      <div class="space-y-3">
        ${questions.map((q, idx) => `
          <div class="border ${themeConfig.borderColor} ${themeConfig.cardSubBg} rounded-sm p-4 space-y-3">
            <div class="flex items-start justify-between gap-3">
              <div class="flex items-start gap-2.5">
                <span class="px-1.5 py-0.5 rounded bg-violet-500/20 text-violet-300 font-black text-[10px] shrink-0 border border-violet-500/30">
                  Q${idx + 1}
                </span>
                <h4 class="text-xs font-bold ${themeConfig.textHeading} leading-normal">
                  ${q.question}
                </h4>
              </div>
            </div>

            <div class="p-3 bg-black/20 rounded-sm border ${themeConfig.borderColor} space-y-2 text-xs">
              <div>
                <span class="text-[10px] font-bold text-slate-500 uppercase block mb-0.5">SHORT ANSWER:</span>
                <p class="text-cyan-300 font-medium">${q.shortAnswer}</p>
              </div>

              <div class="viva-detailed-answer hidden pt-2 border-t border-slate-800">
                <span class="text-[10px] font-bold text-slate-500 uppercase block mb-0.5">DETAILED EXPLANATION:</span>
                <p class="${themeConfig.textColor} leading-relaxed">${q.detailedAnswer}</p>
              </div>

              <button class="btn-toggle-viva-detail text-[10px] font-bold text-amber-400 hover:underline pt-1 cursor-pointer">
                SHOW DETAILED EXPLANATION â–¼
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // Attach toggle listeners
  container.querySelectorAll('.btn-toggle-viva-detail').forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.closest('.space-y-2');
      const detailDiv = parent.querySelector('.viva-detailed-answer');
      if (detailDiv) {
        const isHidden = detailDiv.classList.contains('hidden');
        if (isHidden) {
          detailDiv.classList.remove('hidden');
          btn.textContent = 'HIDE DETAILED EXPLANATION â–²';
        } else {
          detailDiv.classList.add('hidden');
          btn.textContent = 'SHOW DETAILED EXPLANATION â–¼';
        }
      }
    });
  });
}


  // ==========================================
  // MODULE: syllabusBoard.js
  // ==========================================

function renderSyllabusBoard(container) {
  const { themeConfig, completedIds, starredIds } = appState;

  container.innerHTML = `
    <div class="p-4 md:p-6 space-y-6 max-w-7xl mx-auto overflow-y-auto h-full">
      <!-- Header Banner -->
      <div class="border ${themeConfig.borderColor} ${themeConfig.cardBg} rounded-sm p-5 space-y-2 shadow-lg">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2">
              <h2 class="text-lg font-black tracking-wider ${themeConfig.textHeading} uppercase">BCA Semester 5 Syllabus Board</h2>
              <span class="px-2 py-0.5 rounded text-[10px] font-black ${themeConfig.accentBadgeBg}">38 PRACTICALS</span>
            </div>
            <p class="text-xs ${themeConfig.textMuted} mt-1">
              Complete Visual Studio WinForms & ADO.NET practical curriculum with interactive emulators and AI assistance.
            </p>
          </div>

          <div class="flex items-center gap-4 text-xs ${themeConfig.textHeading}">
            <div class="text-center">
              <div class="text-xl font-black text-emerald-400">${completedIds.length} / 38</div>
              <div class="text-[9px] ${themeConfig.textMuted} uppercase font-bold">COMPLETED</div>
            </div>
            <div class="text-center border-l ${themeConfig.borderColor} pl-4">
              <div class="text-xl font-black text-amber-400">${starredIds.length}</div>
              <div class="text-[9px] ${themeConfig.textMuted} uppercase font-bold">STARRED</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Modules Matrix -->
      <div class="space-y-6">
        ${modulesList.map(mod => {
    const modPracticals = allPracticals.filter(p => p.module === mod.name);
    const doneInMod = modPracticals.filter(p => completedIds.includes(p.id)).length;

    return `
            <div class="border ${themeConfig.borderColor} ${themeConfig.cardSubBg} rounded-sm overflow-hidden shadow-md">
              <div class="p-3 border-b ${themeConfig.borderColor} flex items-center justify-between" style="border-left: 4px solid ${mod.color}">
                <div>
                  <h3 class="text-xs font-bold ${themeConfig.textHeading} uppercase tracking-wider">${mod.name}</h3>
                  <p class="text-[10px] ${themeConfig.textMuted}">${mod.description}</p>
                </div>
                <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-black/30 border ${themeConfig.borderColor} ${themeConfig.textHeading}">
                  ${doneInMod} / ${modPracticals.length} Done
                </span>
              </div>

              <div class="p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                ${modPracticals.map(p => {
      const isDone = completedIds.includes(p.id);
      const isStarred = starredIds.includes(p.id);

      return `
                    <div
                      data-launch-practical-id="${p.id}"
                      class="border ${themeConfig.borderColor} ${themeConfig.cardBg} p-3 rounded-sm hover:border-cyan-500 transition-all cursor-pointer space-y-2 flex flex-col justify-between group"
                    >
                      <div class="space-y-1">
                        <div class="flex items-center justify-between text-[10px]">
                          <span class="font-bold text-cyan-400">#${p.id}</span>
                          <div class="flex items-center gap-1">
                            ${isStarred ? `<i data-lucide="star" class="w-3 h-3 text-amber-400 fill-amber-400"></i>` : ''}
                            ${isDone ? `<i data-lucide="check-circle-2" class="w-3.5 h-3.5 text-emerald-400"></i>` : ''}
                          </div>
                        </div>
                        <h4 class="text-xs font-bold ${themeConfig.textHeading} group-hover:text-cyan-400 transition-colors line-clamp-2">
                          ${p.title}
                        </h4>
                      </div>

                      <div class="flex items-center justify-between text-[9px] ${themeConfig.textMuted} pt-2 border-t ${themeConfig.borderColor}">
                        <span>${p.difficulty}</span>
                        <span>${p.estimatedMinutes}m</span>
                      </div>
                    </div>
                  `;
    }).join('')}
              </div>
            </div>
          `;
  }).join('')}
      </div>
    </div>
  `;

  // Attach Launch Practical Listeners
  container.querySelectorAll('[data-launch-practical-id]').forEach(card => {
    card.addEventListener('click', () => {
      const pid = parseInt(card.getAttribute('data-launch-practical-id'), 10);
      appState.setActivePractical(pid);
      appState.setLayout('classic');
    });
  });
}


  // ==========================================
  // MODULE: aiTutorDrawer.js
  // ==========================================

let chatHistory = [
  {
    sender: 'ai',
    text: 'ðŸ‘‹ Hello! I am **SharpSensei**, your C# .NET AI Professor. Ask me anything about code logic, viva questions, or exception handling for this practical!',
    modelUsed: 'SharpSensei C# Engine'
  }
];

function renderAiTutorDrawer(container) {
  const { themeConfig, activePracticalId, isAiTutorOpen, geminiApiKey } = appState;
  const activePractical = getPracticalById(activePracticalId);

  if (!isAiTutorOpen) {
    container.innerHTML = '';
    return;
  }

  container.innerHTML = `
    <div class="fixed inset-y-0 right-0 w-80 md:w-96 ${themeConfig.sidebarBg} border-l ${themeConfig.borderColor} shadow-2xl z-40 flex flex-col select-none">
      <!-- Header -->
      <div class="p-3 border-b ${themeConfig.borderColor} ${themeConfig.headerBg} flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-6 h-6 rounded ${themeConfig.accentBg} text-black font-black flex items-center justify-center text-xs">
            ðŸ¤–
          </div>
          <div>
            <h3 class="text-xs font-bold ${themeConfig.textHeading} uppercase tracking-wider">SharpSensei AI Tutor</h3>
            <span class="text-[9px] text-cyan-400 font-mono">${geminiApiKey ? 'Live Online Gemini 2.5' : 'Offline Knowledge Engine'}</span>
          </div>
        </div>

        <div class="flex items-center gap-1">
          <button id="btn-config-key" class="p-1 rounded text-slate-400 hover:text-white" title="Configure Gemini API Key">
            <i data-lucide="key" class="w-3.5 h-3.5"></i>
          </button>
          <button id="btn-close-aitutor" class="p-1 rounded text-slate-400 hover:text-white">
            <i data-lucide="x" class="w-4 h-4"></i>
          </button>
        </div>
      </div>

      <!-- Quick Prompt Chips -->
      <div class="p-2 border-b ${themeConfig.borderColor} ${themeConfig.cardSubBg} flex flex-wrap gap-1">
        <button data-prompt="Explain Logic" class="chip-prompt px-2 py-0.5 rounded text-[9px] font-bold bg-white/5 border ${themeConfig.borderColor} ${themeConfig.textHeading} hover:border-cyan-400">
          ðŸ’¡ Explain Logic
        </button>
        <button data-prompt="Viva Questions" class="chip-prompt px-2 py-0.5 rounded text-[9px] font-bold bg-white/5 border ${themeConfig.borderColor} ${themeConfig.textHeading} hover:border-violet-400">
          ðŸŽ“ Viva Questions
        </button>
        <button data-prompt="Exception Handling" class="chip-prompt px-2 py-0.5 rounded text-[9px] font-bold bg-white/5 border ${themeConfig.borderColor} ${themeConfig.textHeading} hover:border-amber-400">
          ðŸ›¡ï¸ Exceptions
        </button>
        <button data-prompt="Visual Studio Steps" class="chip-prompt px-2 py-0.5 rounded text-[9px] font-bold bg-white/5 border ${themeConfig.borderColor} ${themeConfig.textHeading} hover:border-emerald-400">
          ðŸ› ï¸ VS Setup
        </button>
      </div>

      <!-- Chat History Stream -->
      <div id="ai-chat-messages" class="flex-1 p-3 overflow-y-auto space-y-3 font-sans text-xs">
        ${chatHistory.map(msg => `
          <div class="space-y-1 ${msg.sender === 'user' ? 'text-right' : 'text-left'}">
            <div class="inline-block p-2.5 rounded-sm max-w-[88%] text-xs leading-relaxed ${msg.sender === 'user'
      ? `${themeConfig.accentBg} ${themeConfig.accentTextColor} font-medium`
      : `${themeConfig.cardSubBg} border ${themeConfig.borderColor} ${themeConfig.textColor}`
    }">
              ${escapeMarkdown(msg.text)}
            </div>
            ${msg.modelUsed ? `<div class="text-[8px] text-slate-500 font-mono px-1">${msg.modelUsed}</div>` : ''}
          </div>
        `).join('')}
      </div>

      <!-- Input Bar -->
      <div class="p-2 border-t ${themeConfig.borderColor} ${themeConfig.headerBg} flex items-center gap-2">
        <input
          type="text"
          id="ai-prompt-input"
          placeholder="Ask Professor SharpSensei..."
          class="flex-1 bg-slate-950 border border-slate-800 p-2 rounded-sm text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
        />
        <button id="btn-send-prompt" class="p-2 ${themeConfig.accentBg} text-black font-bold rounded-sm hover:opacity-90 cursor-pointer">
          <i data-lucide="send" class="w-3.5 h-3.5"></i>
        </button>
      </div>
    </div>
  `;

  // Attach Event Listeners
  container.querySelector('#btn-close-aitutor')?.addEventListener('click', () => {
    appState.toggleAiTutor();
  });

  container.querySelector('#btn-config-key')?.addEventListener('click', () => {
    const key = prompt('Enter your Google Gemini API Key (leave blank for built-in Offline Engine):', geminiApiKey);
    if (key !== null) appState.setGeminiApiKey(key);
  });

  const sendBtn = container.querySelector('#btn-send-prompt');
  const inputEl = container.querySelector('#ai-prompt-input');

  const handleSend = async (customText) => {
    const text = (customText || inputEl.value).trim();
    if (!text) return;

    chatHistory.push({ sender: 'user', text });
    if (inputEl) inputEl.value = '';
    renderAiTutorDrawer(container);

    const chatContainer = container.querySelector('#ai-chat-messages');
    if (chatContainer) chatContainer.scrollTop = chatContainer.scrollHeight;

    // Call AI Tutor Engine
    const res = await askAiTutor(text, activePractical, geminiApiKey);
    chatHistory.push({ sender: 'ai', text: res.reply, modelUsed: res.modelUsed });
    renderAiTutorDrawer(container);

    const updatedChat = container.querySelector('#ai-chat-messages');
    if (updatedChat) updatedChat.scrollTop = updatedChat.scrollHeight;
  };

  sendBtn?.addEventListener('click', () => handleSend());
  inputEl?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleSend();
  });

  container.querySelectorAll('.chip-prompt').forEach(chip => {
    chip.addEventListener('click', () => {
      const p = chip.getAttribute('data-prompt');
      handleSend(p);
    });
  });
}

function escapeMarkdown(text) {
  // Simple markdown renderer for AI responses
  return text
    .replace(/```csharp([\s\S]*?)```/g, '<pre class="bg-black/40 p-2 my-1.5 rounded font-mono text-[10px] text-cyan-300 overflow-x-auto"><code>$1</code></pre>')
    .replace(/```([\s\S]*?)```/g, '<pre class="bg-black/40 p-2 my-1.5 rounded font-mono text-[10px] text-slate-300 overflow-x-auto"><code>$1</code></pre>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code class="bg-black/30 px-1 py-0.5 rounded text-cyan-300 font-mono text-[10px]">$1</code>')
    .replace(/\n/g, '<br/>');
}


  // ==========================================
  // MODULE: modals.js
  // ==========================================

function renderModals(container) {
  const { themeConfig, isThemeModalOpen, isQuizOpen, isCheatsheetOpen, isLabRecordOpen } = appState;

  let modalHtml = '';

  if (isThemeModalOpen) {
    modalHtml += renderThemeModalMarkup(themeConfig);
  }

  if (isQuizOpen) {
    modalHtml += renderQuizModalMarkup(themeConfig);
  }

  if (isCheatsheetOpen) {
    modalHtml += renderCheatsheetModalMarkup(themeConfig);
  }

  if (isLabRecordOpen) {
    modalHtml += renderLabRecordModalMarkup(themeConfig);
  }

  container.innerHTML = modalHtml;

  // Attach Event Listeners
  if (isThemeModalOpen) wireThemeModalEvents(container);
  if (isQuizOpen) wireQuizModalEvents(container);
  if (isCheatsheetOpen) wireCheatsheetModalEvents(container);
  if (isLabRecordOpen) wireLabRecordModalEvents(container);
}

// 1. Theme Selector Modal
function renderThemeModalMarkup(themeConfig) {
  return `
    <div class="fixed inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 z-50 select-none">
      <div class="w-full max-w-3xl ${themeConfig.cardSubBg} border ${themeConfig.borderColor} rounded-sm shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        <div class="p-4 border-b ${themeConfig.borderColor} ${themeConfig.headerBg} flex items-center justify-between">
          <div class="flex items-center gap-2">
            <i data-lucide="palette" class="w-4 h-4 text-cyan-400"></i>
            <h3 class="text-xs font-bold ${themeConfig.textHeading} uppercase tracking-wider">Select IDE Visual Theme Engine</h3>
          </div>
          <button id="modal-close-theme" class="p-1 text-slate-400 hover:text-white cursor-pointer"><i data-lucide="x" class="w-4 h-4"></i></button>
        </div>

        <div class="p-4 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          ${Object.values(themes).map(t => `
            <div
              data-select-theme-id="${t.id}"
              class="border ${appState.currentTheme === t.id ? 'border-cyan-400 ring-2 ring-cyan-500/20' : themeConfig.borderColor} ${t.appBg} p-3 rounded-sm hover:border-cyan-400 transition-all cursor-pointer space-y-2 group"
            >
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold ${t.textHeading}">${t.name}</span>
                <span class="w-3 h-3 rounded-full border border-white/20" style="background-color: ${t.previewColor}"></span>
              </div>
              <p class="text-[10px] ${t.textColor} line-clamp-2">${t.description}</p>
              <div class="flex items-center justify-between text-[9px] ${t.textMuted} pt-1">
                <span>${t.category.toUpperCase()}</span>
                ${appState.currentTheme === t.id ? '<span class="text-cyan-400 font-bold">ACTIVE</span>' : ''}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function wireThemeModalEvents(container) {
  container.querySelector('#modal-close-theme')?.addEventListener('click', () => {
    appState.setThemeModalOpen(false);
  });

  container.querySelectorAll('[data-select-theme-id]').forEach(card => {
    card.addEventListener('click', () => {
      const themeId = card.getAttribute('data-select-theme-id');
      appState.setTheme(themeId);
      appState.setThemeModalOpen(false);
    });
  });
}

// 2. Quiz Practice Modal
let quizUserAnswers = {};
let quizSubmitted = false;

function renderQuizModalMarkup(themeConfig) {
  return `
    <div class="fixed inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 z-50 select-none">
      <div class="w-full max-w-2xl ${themeConfig.cardSubBg} border ${themeConfig.borderColor} rounded-sm shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        <div class="p-4 border-b ${themeConfig.borderColor} ${themeConfig.headerBg} flex items-center justify-between">
          <div class="flex items-center gap-2">
            <i data-lucide="help-circle" class="w-4 h-4 text-emerald-400"></i>
            <h3 class="text-xs font-bold ${themeConfig.textHeading} uppercase tracking-wider">BCA Sem-5 Exam Practice Quiz (10 Questions)</h3>
          </div>
          <button id="modal-close-quiz" class="p-1 text-slate-400 hover:text-white cursor-pointer"><i data-lucide="x" class="w-4 h-4"></i></button>
        </div>

        <div class="p-4 overflow-y-auto space-y-4">
          ${mockQuizQuestions.map((q, idx) => {
    const correctOpt = q.options[q.correctIndex];
    return `
              <div class="p-3 bg-slate-900/60 border ${themeConfig.borderColor} rounded-sm space-y-2">
                <div class="text-xs font-bold ${themeConfig.textHeading}">
                  Q${idx + 1}. ${q.question}
                </div>

                <div class="space-y-1.5 pt-1">
                  ${q.options.map(opt => {
      const isSelected = quizUserAnswers[q.id] === opt;
      let optStyle = `border ${themeConfig.borderColor} ${themeConfig.cardBg} ${themeConfig.textHeading}`;
      if (quizSubmitted) {
        if (opt === correctOpt) optStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold';
        else if (isSelected && opt !== correctOpt) optStyle = 'bg-rose-500/20 border-rose-500 text-rose-300';
      } else if (isSelected) {
        optStyle = 'bg-cyan-500/20 border-cyan-500 text-cyan-300 font-bold';
      }

      return `
                      <label class="p-2 rounded-sm text-xs flex items-center gap-2 cursor-pointer ${optStyle}">
                        <input type="radio" name="quiz-q-${q.id}" value="${escapeHtml(opt)}" ${isSelected ? 'checked' : ''} ${quizSubmitted ? 'disabled' : ''} />
                        <span>${escapeHtml(opt)}</span>
                      </label>
                    `;
    }).join('')}
                </div>

                ${quizSubmitted ? `
                  <div class="p-2 bg-black/40 rounded text-[10px] text-slate-400 border border-slate-800">
                    ðŸ’¡ <strong>Explanation</strong>: ${escapeHtml(q.explanation)}
                  </div>
                ` : ''}
              </div>
            `;
  }).join('')}
        </div>

        <div class="p-3 border-t ${themeConfig.borderColor} ${themeConfig.headerBg} flex items-center justify-between">
          <div id="quiz-score-badge" class="text-xs font-bold text-cyan-400">
            ${quizSubmitted ? `Score: ${calculateQuizScore()} / ${mockQuizQuestions.length}` : 'Answer all questions then click Evaluate.'}
          </div>
          <div class="flex gap-2">
            <button id="btn-quiz-reset" class="px-3 py-1.5 rounded text-xs font-bold border ${themeConfig.borderColor} ${themeConfig.textMuted} hover:text-white">
              Reset
            </button>
            <button id="btn-quiz-submit" ${quizSubmitted ? 'disabled' : ''} class="px-4 py-1.5 rounded text-xs font-black bg-emerald-500 text-black hover:bg-emerald-400 uppercase">
              Evaluate Exam Answers
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function calculateQuizScore() {
  let score = 0;
  mockQuizQuestions.forEach(q => {
    const correctOpt = q.options[q.correctIndex];
    if (quizUserAnswers[q.id] === correctOpt) score++;
  });
  return score;
}

function wireQuizModalEvents(container) {
  container.querySelector('#modal-close-quiz')?.addEventListener('click', () => {
    appState.setQuizOpen(false);
  });

  mockQuizQuestions.forEach(q => {
    container.querySelectorAll(`input[name="quiz-q-${q.id}"]`).forEach(radio => {
      radio.addEventListener('change', () => {
        quizUserAnswers[q.id] = radio.value;
      });
    });
  });

  container.querySelector('#btn-quiz-submit')?.addEventListener('click', () => {
    quizSubmitted = true;
    renderModals(container);
  });

  container.querySelector('#btn-quiz-reset')?.addEventListener('click', () => {
    quizUserAnswers = {};
    quizSubmitted = false;
    renderModals(container);
  });
}

// 3. Cheatsheet Modal
function renderCheatsheetModalMarkup(themeConfig) {
  return `
    <div class="fixed inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 z-50 select-none">
      <div class="w-full max-w-4xl ${themeConfig.cardSubBg} border ${themeConfig.borderColor} rounded-sm shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        <div class="p-4 border-b ${themeConfig.borderColor} ${themeConfig.headerBg} flex items-center justify-between">
          <div class="flex items-center gap-2">
            <i data-lucide="file-text" class="w-4 h-4 text-cyan-400"></i>
            <h3 class="text-xs font-bold ${themeConfig.textHeading} uppercase tracking-wider">C# WinForms & ADO.NET Rapid Reference Cheatsheet</h3>
          </div>
          <button id="modal-close-cheatsheet" class="p-1 text-slate-400 hover:text-white cursor-pointer"><i data-lucide="x" class="w-4 h-4"></i></button>
        </div>

        <div class="p-4 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-3">
          ${cheatsheetItems.map(item => `
            <div class="p-3 bg-slate-900 border ${themeConfig.borderColor} rounded-sm space-y-2 font-mono text-xs">
              <div class="flex items-center justify-between text-emerald-400 font-bold">
                <span>${escapeHtml(item.title)}</span>
                <span class="text-[9px] px-1 bg-white/10 rounded text-slate-300 font-sans">${escapeHtml(item.category)}</span>
              </div>
              <div class="text-[11px] text-cyan-300 font-bold font-sans">${escapeHtml(item.syntax)}</div>
              <p class="text-[11px] text-slate-400 font-sans">${escapeHtml(item.description)}</p>
              ${item.example ? `
                <pre class="bg-slate-950 p-2 rounded text-[10px] text-slate-300 overflow-x-auto border border-slate-800"><code>${escapeHtml(item.example)}</code></pre>
              ` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function wireCheatsheetModalEvents(container) {
  container.querySelector('#modal-close-cheatsheet')?.addEventListener('click', () => {
    appState.setCheatsheetOpen(false);
  });
}

// 4. Lab Record Printable Manual Modal
function renderLabRecordModalMarkup(themeConfig) {
  return `
    <div class="fixed inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 z-50 select-none">
      <div class="w-full max-w-4xl ${themeConfig.cardSubBg} border ${themeConfig.borderColor} rounded-sm shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        <div class="p-4 border-b ${themeConfig.borderColor} ${themeConfig.headerBg} flex items-center justify-between">
          <div class="flex items-center gap-2">
            <i data-lucide="book-open" class="w-4 h-4 text-amber-400"></i>
            <h3 class="text-xs font-bold ${themeConfig.textHeading} uppercase tracking-wider">Printable BCA Sem-5 Practical Manual</h3>
          </div>
          <div class="flex items-center gap-2">
            <button id="btn-print-labrecord" class="px-3 py-1 bg-amber-500 text-black font-bold rounded text-xs uppercase cursor-pointer">
              ðŸ–¨ï¸ Print Record
            </button>
            <button id="modal-close-labrecord" class="p-1 text-slate-400 hover:text-white cursor-pointer"><i data-lucide="x" class="w-4 h-4"></i></button>
          </div>
        </div>

        <div id="printable-manual-area" class="p-6 overflow-y-auto space-y-6 bg-slate-950 text-slate-100 font-sans text-xs">
          <div class="text-center space-y-1 border-b border-slate-800 pb-4">
            <h1 class="text-lg font-black tracking-wider text-cyan-400 uppercase">Bachelor of Computer Applications (BCA) - Semester 5</h1>
            <h2 class="text-xs font-bold text-slate-300 uppercase">Visual Studio C# GUI & ADO.NET Practical Index (Practicals 1 - 38)</h2>
          </div>

          <div class="space-y-4">
            ${allPracticals.map(p => `
              <div class="border border-slate-800 p-4 rounded bg-slate-900 space-y-2">
                <div class="flex items-center justify-between font-bold text-cyan-300">
                  <span>PRACTICAL #${p.id}: ${p.title}</span>
                  <span class="text-[10px] text-slate-400 font-mono">${p.module}</span>
                </div>
                <p class="text-slate-300"><strong>AIM</strong>: ${p.aim}</p>
                <div class="bg-slate-950 p-2.5 rounded font-mono text-[10px] text-slate-300 overflow-x-auto border border-slate-800">
                  <pre><code>${escapeHtml(p.code.split('\n').slice(0, 15).join('\n'))}\n// ... [Complete source code in IDE]</code></pre>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

function wireLabRecordModalEvents(container) {
  container.querySelector('#modal-close-labrecord')?.addEventListener('click', () => {
    appState.setLabRecordOpen(false);
  });

  container.querySelector('#btn-print-labrecord')?.addEventListener('click', () => {
    window.print();
  });
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}


  // ==========================================
  // MODULE: main.js
  // ==========================================

function initApp() {
  const appRoot = document.getElementById('app-root');
  if (!appRoot) return;

  // Subscribe main render function to AppState changes
  appState.subscribe(renderApp);

  // Initial render
  renderApp();
}

function renderApp() {
  const { themeConfig, currentLayout, activePracticalId, activeTab } = appState;
  const activePractical = getPracticalById(activePracticalId) || allPracticals[0];
  const appRoot = document.getElementById('app-root');

  // Update outer container background theme
  document.body.className = `${themeConfig.appBg} ${themeConfig.textColor} font-sans antialiased overflow-hidden h-screen w-screen flex flex-col`;

  if (currentLayout === 'syllabus-board') {
    appRoot.innerHTML = `
      <div class="flex flex-col h-screen w-screen overflow-hidden ${themeConfig.appBg}">
        <div id="navbar-container"></div>
        <div id="syllabus-board-container" class="flex-1 overflow-hidden"></div>
        <div id="aitutor-container"></div>
        <div id="modals-container"></div>
      </div>
    `;

    renderNavbar(document.getElementById('navbar-container'));
    renderSyllabusBoard(document.getElementById('syllabus-board-container'));
    renderAiTutorDrawer(document.getElementById('aitutor-container'));
    renderModals(document.getElementById('modals-container'));
    refreshIcons();
    return;
  }

  // Classic & Multi-Pane Layouts
  appRoot.innerHTML = `
    <div class="flex flex-col h-screen w-screen overflow-hidden ${themeConfig.appBg}">
      <!-- Top Navbar -->
      <div id="navbar-container"></div>

      <!-- Main Workspace -->
      <div class="flex-1 flex min-h-0 overflow-hidden">
        <!-- Left Sidebar Navigation -->
        ${currentLayout === 'zen-focus' ? '' : '<div id="sidebar-container"></div>'}

        <!-- Central Stage Area -->
        <div class="flex-1 flex flex-col min-w-0 overflow-hidden ${themeConfig.appBg}">
          <!-- Telemetry Ribbon -->
          <div id="telemetry-container"></div>

          <!-- Main Stage View Tabs & Canvas -->
          <div class="flex-1 flex flex-col min-h-0 overflow-hidden">
            <!-- Stage Tabs Ribbon -->
            <div class="h-9 border-b ${themeConfig.borderColor} ${themeConfig.headerBg} flex items-center justify-between px-3 select-none shrink-0">
              <div class="flex items-center gap-1 overflow-x-auto text-xs">
                <button
                  data-tab-id="emulator"
                  class="px-3 py-1 rounded-t-sm font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    activeTab === 'emulator' ? themeConfig.tabActiveBg : `${themeConfig.textColor} hover:text-white`
                  }"
                >
                  <i data-lucide="play" class="w-3.5 h-3.5"></i>
                  <span>WINFORMS EMULATOR</span>
                </button>

                <button
                  data-tab-id="code"
                  class="px-3 py-1 rounded-t-sm font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    activeTab === 'code' ? themeConfig.tabActiveBg : `${themeConfig.textColor} hover:text-white`
                  }"
                >
                  <i data-lucide="code-2" class="w-3.5 h-3.5"></i>
                  <span>SOURCE CODE</span>
                </button>

                <button
                  data-tab-id="dryrun"
                  class="px-3 py-1 rounded-t-sm font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    activeTab === 'dryrun' ? themeConfig.tabActiveBg : `${themeConfig.textColor} hover:text-white`
                  }"
                >
                  <i data-lucide="cpu" class="w-3.5 h-3.5"></i>
                  <span>DRY-RUN DEBUGGER</span>
                </button>

                <button
                  data-tab-id="vsguide"
                  class="px-3 py-1 rounded-t-sm font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    activeTab === 'vsguide' ? themeConfig.tabActiveBg : `${themeConfig.textColor} hover:text-white`
                  }"
                >
                  <i data-lucide="layout-template" class="w-3.5 h-3.5"></i>
                  <span>VS DESIGNER GUIDE</span>
                </button>

                <button
                  data-tab-id="viva"
                  class="px-3 py-1 rounded-t-sm font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    activeTab === 'viva' ? themeConfig.tabActiveBg : `${themeConfig.textColor} hover:text-white`
                  }"
                >
                  <i data-lucide="graduation-cap" class="w-3.5 h-3.5"></i>
                  <span>VIVA VOCE</span>
                </button>
              </div>
            </div>

            <!-- Stage Content Container -->
            <div id="stage-content-container" class="flex-1 overflow-y-auto p-3 md:p-4"></div>
          </div>
        </div>
      </div>

      <!-- AI Tutor Drawer -->
      <div id="aitutor-container"></div>

      <!-- Modals Container -->
      <div id="modals-container"></div>
    </div>
  `;

  // Render Navbar, Sidebar, TelemetryBar
  renderNavbar(document.getElementById('navbar-container'));
  if (currentLayout !== 'zen-focus') {
    renderSidebar(document.getElementById('sidebar-container'));
  }
  renderTelemetryBar(document.getElementById('telemetry-container'));

  // Wire Tab Change Events
  document.querySelectorAll('[data-tab-id]').forEach(tabBtn => {
    tabBtn.addEventListener('click', () => {
      const tabId = tabBtn.getAttribute('data-tab-id');
      appState.setActiveTab(tabId);
    });
  });

  // Render Central Stage Content
  const stageContent = document.getElementById('stage-content-container');
  if (stageContent) {
    if (currentLayout === 'dual-pane') {
      // Dual-Pane Live Studio Layout
      stageContent.innerHTML = `
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
          <div id="dual-emulator-pane"></div>
          <div id="dual-code-pane"></div>
        </div>
      `;
      renderWinFormsEmulator(document.getElementById('dual-emulator-pane'), activePractical);
      renderCodeViewer(document.getElementById('dual-code-pane'), activePractical);
    } else if (currentLayout === 'viva-master') {
      // Viva Master Exam Prep Layout
      stageContent.innerHTML = `
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
          <div id="viva-code-pane"></div>
          <div id="viva-qa-pane"></div>
        </div>
      `;
      renderCodeViewer(document.getElementById('viva-code-pane'), activePractical);
      renderVivaVoceSection(document.getElementById('viva-qa-pane'), activePractical);
    } else if (currentLayout === 'debugger-pro') {
      // Debugger Pro 3-Column Layout
      stageContent.innerHTML = `
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
          <div id="pro-emulator-pane"></div>
          <div id="pro-dryrun-pane"></div>
        </div>
      `;
      renderWinFormsEmulator(document.getElementById('pro-emulator-pane'), activePractical);
      renderDryRunVisualizer(document.getElementById('pro-dryrun-pane'), activePractical);
    } else {
      // Standard Tab Layout
      if (activeTab === 'emulator') {
        renderWinFormsEmulator(stageContent, activePractical);
      } else if (activeTab === 'code') {
        renderCodeViewer(stageContent, activePractical);
      } else if (activeTab === 'dryrun') {
        renderDryRunVisualizer(stageContent, activePractical);
      } else if (activeTab === 'vsguide') {
        renderVisualStudioGuide(stageContent, activePractical);
      } else if (activeTab === 'viva') {
        renderVivaVoceSection(stageContent, activePractical);
      }
    }
  }

  // Render AI Tutor Drawer & Modals
  renderAiTutorDrawer(document.getElementById('aitutor-container'));
  renderModals(document.getElementById('modals-container'));

  refreshIcons();
}

function refreshIcons() {
  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    lucide.createIcons();
  }
}

// Start application when DOM is ready or immediately if already loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}



})();
