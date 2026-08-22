(function () {
  'use strict';

// ==========================================
// MODULE: js/practicalsData.js
// ==========================================
// SharpSensei — All 38 BCA C# GUI & ADO.NET Practicals Database

const allPracticals = [
  // ==========================================
  // MODULE 1: C# OOP & BASICS (PRACTICALS 1-10)
  // ==========================================
  {
    id: 1,
    title: "Console I/O & Hello World",
    module: "Module 1: C# OOP & Basics",
    aim: "To create a basic C# console application that reads user input and prints greeting output.",
    difficulty: "Beginner",
    description: "Demonstrates standard Console.WriteLine, Console.ReadLine, and string concatenation.",
    code: `using System;

namespace SharpSenseiLab
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("=== BCA Sem 5 C# Practical #1 ===");
            Console.Write("Enter your name: ");
            string name = Console.ReadLine();
            
            Console.Write("Enter your Roll Number: ");
            string rollNo = Console.ReadLine();

            Console.WriteLine($"\\nHello {name}! (Roll No: {rollNo})");
            Console.WriteLine("Welcome to C# .NET GUI Programming Studio.");
            Console.ReadLine();
        }
    }
}`,
    expectedOutput: "=== BCA Sem 5 C# Practical #1 ===\nEnter your name: Sachin\nEnter your Roll Number: 101\n\nHello Sachin! (Roll No: 101)\nWelcome to C# .NET GUI Programming Studio.",
    traceSteps: [
      { line: 7, explanation: "Program entry point Main() invoked by CLR.", variables: { args: "[]" } },
      { line: 9, explanation: "Prints header banner to Console stdout.", variables: {} },
      { line: 11, explanation: "Reads string input from user into 'name'.", variables: { name: "\"Sachin\"" } },
      { line: 14, explanation: "Reads roll number into 'rollNo'.", variables: { name: "\"Sachin\"", rollNo: "\"101\"" } },
      { line: 16, explanation: "Constructs string interpolation output.", variables: { name: "\"Sachin\"", rollNo: "\"101\"" } }
    ]
  },
  {
    id: 2,
    title: "Arithmetic Operations & Input Parsing",
    module: "Module 1: C# OOP & Basics",
    aim: "To accept two numeric values from user and perform basic arithmetic operations using try/parse error handling.",
    difficulty: "Beginner",
    description: "Demonstrates safely parsing strings into integers using int.TryParse.",
    code: `using System;

namespace SharpSenseiLab
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.Write("Enter Number 1: ");
            if (int.TryParse(Console.ReadLine(), out int num1))
            {
                Console.Write("Enter Number 2: ");
                if (int.TryParse(Console.ReadLine(), out int num2))
                {
                    Console.WriteLine($"Addition: {num1 + num2}");
                    Console.WriteLine($"Subtraction: {num1 - num2}");
                    Console.WriteLine($"Multiplication: {num1 * num2}");
                    Console.WriteLine($"Division: {(num2 != 0 ? (double)num1 / num2 : 0)}");
                }
            }
        }
    }
}`,
    expectedOutput: "Enter Number 1: 15\nEnter Number 2: 3\nAddition: 18\nSubtraction: 12\nMultiplication: 45\nDivision: 5",
    traceSteps: [
      { line: 9, explanation: "Prompt user for Number 1.", variables: {} },
      { line: 10, explanation: "Parse '15' safely into num1.", variables: { num1: 15 } },
      { line: 13, explanation: "Parse '3' safely into num2.", variables: { num1: 15, num2: 3 } },
      { line: 15, explanation: "Calculate sum: 15 + 3 = 18.", variables: { num1: 15, num2: 3, sum: 18 } },
      { line: 18, explanation: "Perform floating-point division.", variables: { num1: 15, num2: 3, div: 5.0 } }
    ]
  },
  {
    id: 3,
    title: "Factorial Calculator (Iterative & Recursive)",
    module: "Module 1: C# OOP & Basics",
    aim: "To compute the factorial of a given integer using both loop iteration and recursion.",
    difficulty: "Intermediate",
    description: "Shows iterative for-loop vs recursive method calls in C#.",
    code: `using System;

namespace SharpSenseiLab
{
    class Program
    {
        static long Factorial(int n)
        {
            if (n <= 1) return 1;
            return n * Factorial(n - 1);
        }

        static void Main(string[] args)
        {
            int num = 5;
            long fact = Factorial(num);
            Console.WriteLine($"Factorial of {num} is {fact}");
        }
    }
}`,
    expectedOutput: "Factorial of 5 is 120",
    traceSteps: [
      { line: 14, explanation: "Initialize integer variable num = 5.", variables: { num: 5 } },
      { line: 15, explanation: "Invoke Factorial(5) recursive call.", variables: { num: 5, n: 5 } },
      { line: 9, explanation: "Evaluate 5 * Factorial(4).", variables: { n: 5, callStackDepth: 1 } },
      { line: 9, explanation: "Evaluate 4 * Factorial(3)... until n=1 returns 1.", variables: { result: 120 } },
      { line: 16, explanation: "Print calculated result 120 to console.", variables: { num: 5, fact: 120 } }
    ]
  },
  {
    id: 4,
    title: "Fibonacci Series Generator",
    module: "Module 1: C# OOP & Basics",
    aim: "To generate the Fibonacci sequence up to N terms.",
    difficulty: "Beginner",
    description: "Uses a for loop and temporary state variables to generate terms.",
    code: `using System;

namespace SharpSenseiLab
{
    class Program
    {
        static void Main(string[] args)
        {
            int n = 7;
            int a = 0, b = 1;
            Console.Write($"Fibonacci ({n} terms): {a}, {b}");
            for (int i = 2; i < n; i++)
            {
                int c = a + b;
                Console.Write($", {c}");
                a = b;
                b = c;
            }
        }
    }
}`,
    expectedOutput: "Fibonacci (7 terms): 0, 1, 1, 2, 3, 5, 8",
    traceSteps: [
      { line: 9, explanation: "Initialize terms n = 7, first terms a = 0, b = 1.", variables: { n: 7, a: 0, b: 1 } },
      { line: 11, explanation: "Loop iteration i = 2: c = 0 + 1 = 1.", variables: { i: 2, c: 1, a: 0, b: 1 } },
      { line: 13, explanation: "Shift state: a = 1, b = 1.", variables: { i: 2, a: 1, b: 1 } },
      { line: 11, explanation: "Loop iteration i = 3: c = 1 + 1 = 2.", variables: { i: 3, c: 2, a: 1, b: 2 } }
    ]
  },
  {
    id: 5,
    title: "Prime Number Checker & Range Finder",
    module: "Module 1: C# OOP & Basics",
    aim: "To check whether a number is prime and display all prime numbers in a given range.",
    difficulty: "Intermediate",
    description: "Applies loop optimization up to Math.Sqrt(n).",
    code: `using System;

namespace SharpSenseiLab
{
    class Program
    {
        static bool IsPrime(int n)
        {
            if (n < 2) return false;
            for (int i = 2; i <= Math.Sqrt(n); i++)
                if (n % i == 0) return false;
            return true;
        }

        static void Main(string[] args)
        {
            int number = 29;
            Console.WriteLine($"{number} is Prime? {IsPrime(number)}");
        }
    }
}`,
    expectedOutput: "29 is Prime? True",
    traceSteps: [
      { line: 17, explanation: "Initialize number = 29.", variables: { number: 29 } },
      { line: 9, explanation: "Check base condition n < 2.", variables: { n: 29 } },
      { line: 10, explanation: "Loop divisors i from 2 up to 5.", variables: { n: 29, i: 2 } },
      { line: 11, explanation: "No divisors found, returns true.", variables: { n: 29, isPrime: true } }
    ]
  },
  {
    id: 6,
    title: "Matrix Multiplication & Arrays",
    module: "Module 1: C# OOP & Basics",
    aim: "To multiply two 2D rectangular matrices and print the product matrix.",
    difficulty: "Intermediate",
    description: "Demonstrates 2D arrays in C# using nested loops.",
    code: `using System;

namespace SharpSenseiLab
{
    class Program
    {
        static void Main(string[] args)
        {
            int[,] A = { { 1, 2 }, { 3, 4 } };
            int[,] B = { { 5, 6 }, { 7, 8 } };
            int[,] C = new int[2, 2];

            for (int i = 0; i < 2; i++)
                for (int j = 0; j < 2; j++)
                    for (int k = 0; k < 2; k++)
                        C[i, j] += A[i, k] * B[k, j];

            Console.WriteLine($"C[0,0] = {C[0,0]}");
        }
    }
}`,
    expectedOutput: "C[0,0] = 19",
    traceSteps: [
      { line: 9, explanation: "Initialize 2x2 Matrix A and Matrix B.", variables: { A: "[[1,2],[3,4]]", B: "[[5,6],[7,8]]" } },
      { line: 15, explanation: "Multiply: C[0,0] = (1*5) + (2*7) = 5 + 14 = 19.", variables: { "C[0,0]": 19 } }
    ]
  },
  {
    id: 7,
    title: "Method Overloading & Optional Parameters",
    module: "Module 1: C# OOP & Basics",
    aim: "To demonstrate compile-time polymorphism using overloaded methods.",
    difficulty: "Beginner",
    description: "Shows methods sharing the same name with different parameters.",
    code: `using System;

namespace SharpSenseiLab
{
    class Calculator
    {
        public int Add(int a, int b) => a + b;
        public double Add(double a, double b) => a + b;
        public int Add(int a, int b, int c) => a + b + c;
    }

    class Program
    {
        static void Main(string[] args)
        {
            Calculator calc = new Calculator();
            Console.WriteLine($"Sum (int): {calc.Add(10, 20)}");
            Console.WriteLine($"Sum (double): {calc.Add(5.5, 4.5)}");
        }
    }
}`,
    expectedOutput: "Sum (int): 30\nSum (double): 10",
    traceSteps: [
      { line: 17, explanation: "Instantiate Calculator object.", variables: {} },
      { line: 18, explanation: "Invoke Add(int, int) overload.", variables: { a: 10, b: 20, result: 30 } },
      { line: 19, explanation: "Invoke Add(double, double) overload.", variables: { a: 5.5, b: 4.5, result: 10.0 } }
    ]
  },
  {
    id: 8,
    title: "Class & Constructor Overloading",
    module: "Module 1: C# OOP & Basics",
    aim: "To create a Student class with default and parameterized constructors.",
    difficulty: "Beginner",
    description: "Demonstrates OOP encapsulation and constructor chaining.",
    code: `using System;

namespace SharpSenseiLab
{
    class Student
    {
        public int RollNo { get; set; }
        public string Name { get; set; }

        public Student() : this(0, "Unknown") { }

        public Student(int rollNo, string name)
        {
            RollNo = rollNo;
            Name = name;
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            Student s1 = new Student(101, "Aarav");
            Console.WriteLine($"Student: {s1.Name} (#{s1.RollNo})");
        }
    }
}`,
    expectedOutput: "Student: Aarav (#101)",
    traceSteps: [
      { line: 21, explanation: "Instantiate Student with parameterized constructor.", variables: { rollNo: 101, name: "\"Aarav\"" } },
      { line: 14, explanation: "Assign RollNo property = 101, Name = 'Aarav'.", variables: { RollNo: 101, Name: "\"Aarav\"" } }
    ]
  },
  {
    id: 9,
    title: "Single & Multilevel Inheritance",
    module: "Module 1: C# OOP & Basics",
    aim: "To demonstrate inheritance hierarchies in C#.",
    difficulty: "Intermediate",
    description: "Shows base and derived classes passing fields and virtual methods down.",
    code: `using System;

namespace SharpSenseiLab
{
    class Person
    {
        public string Name { get; set; } = "Person";
    }

    class Employee : Person
    {
        public double Salary { get; set; } = 50000;
    }

    class Program
    {
        static void Main(string[] args)
        {
            Employee emp = new Employee { Name = "Rohan" };
            Console.WriteLine($"Employee {emp.Name} earns ₹{emp.Salary}");
        }
    }
}`,
    expectedOutput: "Employee Rohan earns ₹50000",
    traceSteps: [
      { line: 19, explanation: "Instantiate Employee derived object.", variables: { Name: "\"Rohan\"", Salary: 50000 } },
      { line: 20, explanation: "Access inherited Name property from base class.", variables: { Name: "\"Rohan\"" } }
    ]
  },
  {
    id: 10,
    title: "Structured Exception Handling",
    module: "Module 1: C# OOP & Basics",
    aim: "To implement try-catch-finally block to handle divide-by-zero runtime errors.",
    difficulty: "Intermediate",
    description: "Demonstrates robust error recovery and cleanup in finally block.",
    code: `using System;

namespace SharpSenseiLab
{
    class Program
    {
        static void Main(string[] args)
        {
            try
            {
                int a = 10, b = 0;
                int res = a / b;
            }
            catch (DivideByZeroException ex)
            {
                Console.WriteLine($"Caught Error: {ex.Message}");
            }
            finally
            {
                Console.WriteLine("Cleanup executed in finally block.");
            }
        }
    }
}`,
    expectedOutput: "Caught Error: Attempted to divide by zero.\nCleanup executed in finally block.",
    traceSteps: [
      { line: 11, explanation: "Execute division 10 / 0.", variables: { a: 10, b: 0 } },
      { line: 14, explanation: "CLR traps DivideByZeroException into catch block.", variables: { exception: "DivideByZeroException" } },
      { line: 19, explanation: "Guaranteed execution of finally block.", variables: {} }
    ]
  },

  // ==========================================
  // MODULE 2: WINDOWS FORMS CONTROLS (PRACTICALS 11-21)
  // ==========================================
  {
    id: 11,
    title: "Button & Label Click Counter",
    module: "Module 2: Windows Forms Controls",
    aim: "To increment a counter label on every button click event in Windows Forms.",
    difficulty: "Beginner",
    description: "Basic event-driven GUI programming with Button and Label controls.",
    code: `using System;
using System.Windows.Forms;

public partial class FormCounter : Form
{
    private int count = 0;

    public FormCounter()
    {
        InitializeComponent();
    }

    private void btnClickMe_Click(object sender, EventArgs e)
    {
        count++;
        lblCounter.Text = $"Click Count: {count}";
    }
}`,
    expectedOutput: "Form Rendered with Button [Click Me]\nUser clicks 3 times -> Label Displays: 'Click Count: 3'",
    traceSteps: [
      { line: 13, explanation: "User triggers Click event on btnClickMe.", variables: { count: 0 } },
      { line: 15, explanation: "Increment counter state: count = count + 1.", variables: { count: 1 } },
      { line: 16, explanation: "Update UI label text: lblCounter.Text.", variables: { count: 1, labelText: "\"Click Count: 1\"" } }
    ]
  },
  {
    id: 12,
    title: "TextBox Word & Character Counter",
    module: "Module 2: Windows Forms Controls",
    aim: "To count characters and words dynamically as user types into a multiline TextBox.",
    difficulty: "Beginner",
    description: "Wires TextChanged event to compute string length and word splits.",
    code: `using System;
using System.Windows.Forms;

public partial class FormTextStats : Form
{
    private void txtInput_TextChanged(object sender, EventArgs e)
    {
        string text = txtInput.Text.Trim();
        int charCount = txtInput.Text.Length;
        int wordCount = string.IsNullOrEmpty(text) ? 0 : text.Split(new[] { ' ', '\\n', '\\r' }, StringSplitOptions.RemoveEmptyEntries).Length;
        lblStats.Text = $"Characters: {charCount} | Words: {wordCount}";
    }
}`,
    expectedOutput: "User types: 'C# WinForms Studio'\nLabel Displays: 'Characters: 21 | Words: 3'",
    traceSteps: [
      { line: 7, explanation: "TextChanged event fires on input modification.", variables: {} },
      { line: 9, explanation: "Compute character length = 21.", variables: { charCount: 21 } },
      { line: 10, explanation: "Split string by whitespace to get 3 words.", variables: { wordCount: 3 } }
    ]
  },
  {
    id: 13,
    title: "ComboBox & ListBox Item Transfer Studio",
    module: "Module 2: Windows Forms Controls",
    aim: "To transfer items dynamically between ListBox controls.",
    difficulty: "Intermediate",
    description: "Manipulates ListBox.Items collection (Add, RemoveAt, SelectedItem).",
    code: `using System;
using System.Windows.Forms;

public partial class FormTransfer : Form
{
    private void btnMoveRight_Click(object sender, EventArgs e)
    {
        if (lstLeft.SelectedItem != null)
        {
            lstRight.Items.Add(lstLeft.SelectedItem);
            lstLeft.Items.Remove(lstLeft.SelectedItem);
        }
    }
}`,
    expectedOutput: "Selected 'Visual C#' in ListBox 1 -> Click Move -> Selected item transferred to ListBox 2",
    traceSteps: [
      { line: 7, explanation: "Check if selected item is not null.", variables: { selected: "\"Visual C#\"" } },
      { line: 9, explanation: "Add selected item to lstRight.Items collection.", variables: { lstRightCount: 1 } },
      { line: 10, explanation: "Remove item from lstLeft.Items collection.", variables: { lstLeftCount: 2 } }
    ]
  },
  {
    id: 14,
    title: "CheckBox & RadioButton Order Billing",
    module: "Module 2: Windows Forms Controls",
    aim: "To calculate total bill based on selected radio buttons and checkboxes.",
    difficulty: "Intermediate",
    description: "Evaluates Checked state of RadioButton and CheckBox controls.",
    code: `using System;
using System.Windows.Forms;

public partial class FormBilling : Form
{
    private void btnCalculate_Click(object sender, EventArgs e)
    {
        double total = 0;
        if (rdoSmall.Checked) total += 100;
        else if (rdoLarge.Checked) total += 200;

        if (chkCheese.Checked) total += 30;
        if (chkDrink.Checked) total += 50;

        lblTotal.Text = $"Total Bill: ₹{total}";
    }
}`,
    expectedOutput: "Selected: Large Pizza (₹200) + Extra Cheese (₹30) + Cold Drink (₹50)\nLabel Displays: 'Total Bill: ₹280'",
    traceSteps: [
      { line: 8, explanation: "Initialize total bill = 0.", variables: { total: 0 } },
      { line: 10, explanation: "Large pizza radio checked (+200).", variables: { total: 200 } },
      { line: 12, explanation: "Add cheese (+30) and drink (+50).", variables: { total: 280 } }
    ]
  },
  {
    id: 15,
    title: "Full WinForms Grid Calculator",
    module: "Module 2: Windows Forms Controls",
    aim: "To design a fully functional GUI Grid Calculator with arithmetic buttons.",
    difficulty: "Intermediate",
    description: "Implements event handling for numeric and operator buttons in WinForms.",
    code: `using System;
using System.Windows.Forms;

public partial class FormCalc : Form
{
    private double num1 = 0;
    private string op = "";

    private void btnAdd_Click(object sender, EventArgs e)
    {
        num1 = double.Parse(txtDisplay.Text);
        op = "+";
        txtDisplay.Clear();
    }
}`,
    expectedOutput: "Interactive Grid Calculator GUI rendered. Performing 15 + 25 = 40.",
    traceSteps: [
      { line: 10, explanation: "Store num1 = 15 and set operator '+'.", variables: { num1: 15.0, op: "\"[+]\"" } },
      { line: 12, explanation: "Clear display for second operand input.", variables: { display: "\"\"" } }
    ]
  },
  {
    id: 16,
    title: "Registration Form & Input Validation",
    module: "Module 2: Windows Forms Controls",
    aim: "To build a complete student registration form and display confirmation dialog.",
    difficulty: "Intermediate",
    description: "Uses MessageBox.Show for field validation alerts.",
    code: `using System;
using System.Windows.Forms;

public partial class FormRegister : Form
{
    private void btnSubmit_Click(object sender, EventArgs e)
    {
        if (string.IsNullOrWhiteSpace(txtName.Text))
        {
            MessageBox.Show("Please enter student name!", "Validation Error", MessageBoxButtons.OK, MessageBoxIcon.Warning);
            return;
        }
        MessageBox.Show($"Registered successfully: {txtName.Text}", "Success", MessageBoxButtons.OK, MessageBoxIcon.Information);
    }
}`,
    expectedOutput: "Input 'Aarav Sharma' -> Click Register -> MessageBox Popup: 'Registered successfully: Aarav Sharma'",
    traceSteps: [
      { line: 7, explanation: "Validate txtName is non-empty.", variables: { name: "\"Aarav Sharma\"" } },
      { line: 12, explanation: "Display MessageBox confirmation modal.", variables: {} }
    ]
  },
  {
    id: 17,
    title: "User Login Portal with Attempt Counter",
    module: "Module 2: Windows Forms Controls",
    aim: "To build a secure login screen with masked password and 3 attempt limits.",
    difficulty: "Intermediate",
    description: "Demonstrates PasswordChar property and attempt counters.",
    code: `using System;
using System.Windows.Forms;

public partial class FormLogin : Form
{
    private int attempts = 3;

    private void btnLogin_Click(object sender, EventArgs e)
    {
        if (txtUser.Text == "admin" && txtPass.Text == "admin@123")
            MessageBox.Show("Login Successful!", "Granted");
        else
        {
            attempts--;
            lblAttempts.Text = $"Attempts left: {attempts}";
            if (attempts == 0) btnLogin.Enabled = false;
        }
    }
}`,
    expectedOutput: "Valid login: admin / admin@123 -> Login Successful dialog displayed.",
    traceSteps: [
      { line: 10, explanation: "Compare entered credentials with admin credentials.", variables: { attempts: 3 } },
      { line: 11, explanation: "Authentication passed successfully.", variables: { auth: true } }
    ]
  },
  {
    id: 18,
    title: "Timer Stopwatch Application",
    module: "Module 2: Windows Forms Controls",
    aim: "To implement a digital stopwatch using System.Windows.Forms.Timer.",
    difficulty: "Intermediate",
    description: "Demonstrates Timer.Tick event and Start/Stop methods.",
    code: `using System;
using System.Windows.Forms;

public partial class FormTimer : Form
{
    private int seconds = 0;

    private void timer1_Tick(object sender, EventArgs e)
    {
        seconds++;
        lblTime.Text = TimeSpan.FromSeconds(seconds).ToString(@"hh\\:mm\\:ss");
    }
}`,
    expectedOutput: "Stopwatch running -> Displays live updated time '00:01:45'",
    traceSteps: [
      { line: 9, explanation: "Timer tick fires every 1000ms.", variables: { seconds: 105 } },
      { line: 10, explanation: "Format TimeSpan to '00:01:45'.", variables: { timeFormatted: "\"00:01:45\"" } }
    ]
  },
  {
    id: 19,
    title: "CheckedListBox Task Manager",
    module: "Module 2: Windows Forms Controls",
    aim: "To add, check, and clear completed tasks in a CheckedListBox.",
    difficulty: "Intermediate",
    description: "Iterates through CheckedListBox.CheckedItems.",
    code: `using System;
using System.Windows.Forms;

public partial class FormTasks : Form
{
    private void btnAdd_Click(object sender, EventArgs e)
    {
        if (!string.IsNullOrWhiteSpace(txtTask.Text))
        {
            chkListTasks.Items.Add(txtTask.Text, false);
            txtTask.Clear();
        }
    }
}`,
    expectedOutput: "Add task 'Submit C# Manual' -> Item added with checkbox into list",
    traceSteps: [
      { line: 9, explanation: "Add task string into chkListTasks Items collection.", variables: { task: "\"Submit C# Manual\"" } }
    ]
  },
  {
    id: 20,
    title: "TrackBar & NumericUpDown Resizer",
    module: "Module 2: Windows Forms Controls",
    aim: "To sync TrackBar scroll value with NumericUpDown and adjust font size of a label dynamically.",
    difficulty: "Intermediate",
    description: "Two-way data binding sync between TrackBar and NumericUpDown.",
    code: `using System;
using System.Windows.Forms;

public partial class FormResizer : Form
{
    private void trackBar1_Scroll(object sender, EventArgs e)
    {
        numSize.Value = trackBar1.Value;
        lblSample.Font = new System.Drawing.Font(lblSample.Font.FontFamily, trackBar1.Value);
    }
}`,
    expectedOutput: "Scroll TrackBar to 24 -> Label Font Size updates live to 24pt",
    traceSteps: [
      { line: 8, explanation: "Sync NumericUpDown value with TrackBar.", variables: { value: 24 } },
      { line: 9, explanation: "Re-instantiate Label Font with new point size 24.", variables: { fontSize: 24 } }
    ]
  },
  {
    id: 21,
    title: "RichTextBox Text Formatting Studio",
    module: "Module 2: Windows Forms Controls",
    aim: "To toggle Bold, Italic, and Underline formatting on selected RichTextBox text.",
    difficulty: "Intermediate",
    description: "Applies System.Drawing.FontStyle to SelectionFont.",
    code: `using System;
using System.Drawing;
using System.Windows.Forms;

public partial class FormFormat : Form
{
    private void btnBold_Click(object sender, EventArgs e)
    {
        if (rtbText.SelectionFont != null)
        {
            FontStyle style = rtbText.SelectionFont.Style ^ FontStyle.Bold;
            rtbText.SelectionFont = new Font(rtbText.SelectionFont, style);
        }
    }
}`,
    expectedOutput: "Select text -> Click Bold button -> Selection font style toggles Bold",
    traceSteps: [
      { line: 10, explanation: "XOR current font style with FontStyle.Bold.", variables: { toggled: "Bold" } },
      { line: 11, explanation: "Apply updated Font object back to SelectionFont.", variables: {} }
    ]
  },

  // ==========================================
  // MODULE 3: ADVANCED CONTROLS, DIALOGS & GDI+ (PRACTICALS 22-32)
  // ==========================================
  {
    id: 22,
    title: "DateTimePicker Date Difference Calculator",
    module: "Module 3: Advanced Controls & GDI+",
    aim: "To calculate exact number of days between two selected DateTimePicker dates.",
    difficulty: "Intermediate",
    description: "Demonstrates DateTime subtraction returning TimeSpan.",
    code: `using System;
using System.Windows.Forms;

public partial class FormDateDiff : Form
{
    private void btnCalculate_Click(object sender, EventArgs e)
    {
        TimeSpan diff = dtpEnd.Value - dtpStart.Value;
        lblResult.Text = $"Difference: {Math.Abs(diff.Days)} Days";
    }
}`,
    expectedOutput: "Start: 01-Jan-2026, End: 15-Jan-2026 -> Output: 'Difference: 14 Days'",
    traceSteps: [
      { line: 8, explanation: "Subtract dtpStart from dtpEnd values.", variables: { days: 14 } }
    ]
  },
  {
    id: 23,
    title: "OpenFileDialog & SaveFileDialog Text Editor",
    module: "Module 3: Advanced Controls & GDI+",
    aim: "To open and save plain text files using standard FileDialog components.",
    difficulty: "Intermediate",
    description: "Integrates System.IO.File read and write methods with common dialogs.",
    code: `using System;
using System.IO;
using System.Windows.Forms;

public partial class FormEditor : Form
{
    private void btnOpen_Click(object sender, EventArgs e)
    {
        if (openFileDialog1.ShowDialog() == DialogResult.OK)
            rtbEditor.Text = File.ReadAllText(openFileDialog1.FileName);
    }
}`,
    expectedOutput: "Select file 'notes.txt' -> Content loaded into RichTextBox canvas",
    traceSteps: [
      { line: 9, explanation: "Show OpenFileDialog modal.", variables: { dialogResult: "OK" } },
      { line: 10, explanation: "Read file bytes into rtbEditor.Text.", variables: { file: "\"notes.txt\"" } }
    ]
  },
  {
    id: 24,
    title: "ColorDialog & FontDialog Live Studio",
    module: "Module 3: Advanced Controls & GDI+",
    aim: "To customize text font family, size, and foreground color using standard dialogs.",
    difficulty: "Intermediate",
    description: "Demonstrates ColorDialog and FontDialog modal integration.",
    code: `using System;
using System.Windows.Forms;

public partial class FormTypography : Form
{
    private void btnColor_Click(object sender, EventArgs e)
    {
        if (colorDialog1.ShowDialog() == DialogResult.OK)
            lblSample.ForeColor = colorDialog1.Color;
    }
}`,
    expectedOutput: "Select Cyan color in ColorDialog -> Label text color updates to Cyan",
    traceSteps: [
      { line: 8, explanation: "Open ColorDialog picker.", variables: { color: "Cyan (#00a3d9)" } }
    ]
  },
  {
    id: 25,
    title: "ImageList & PictureBox Photo Gallery",
    module: "Module 3: Advanced Controls & GDI+",
    aim: "To browse images stored in an ImageList control using Next/Previous buttons.",
    difficulty: "Intermediate",
    description: "Binds ImageList images to PictureBox.Image property.",
    code: `using System;
using System.Windows.Forms;

public partial class FormGallery : Form
{
    private int imgIndex = 0;

    private void btnNext_Click(object sender, EventArgs e)
    {
        if (imageList1.Images.Count > 0)
        {
            imgIndex = (imgIndex + 1) % imageList1.Images.Count;
            pbDisplay.Image = imageList1.Images[imgIndex];
        }
    }
}`,
    expectedOutput: "Click Next -> PictureBox displays Image #2 from ImageList",
    traceSteps: [
      { line: 11, explanation: "Increment modulo index: (0+1) % count.", variables: { imgIndex: 1 } }
    ]
  },
  {
    id: 26,
    title: "TreeView & ListView Directory Explorer",
    module: "Module 3: Advanced Controls & GDI+",
    aim: "To populate a TreeView hierarchy with folder nodes.",
    difficulty: "Advanced",
    description: "Hierarchical TreeNode navigation and child node population.",
    code: `using System;
using System.Windows.Forms;

public partial class FormExplorer : Form
{
    private void FormExplorer_Load(object sender, EventArgs e)
    {
        TreeNode root = treeView1.Nodes.Add("C:\\\\BCA_Projects");
        root.Nodes.Add("Practical_01.cs");
        root.Nodes.Add("Practical_02.cs");
        treeView1.ExpandAll();
    }
}`,
    expectedOutput: "TreeView renders root node 'C:\\BCA_Projects' with child file nodes",
    traceSteps: [
      { line: 8, explanation: "Add root folder node.", variables: { root: "\"C:\\BCA_Projects\"" } }
    ]
  },
  {
    id: 27,
    title: "ToolStrip & StatusStrip Application Shell",
    module: "Module 3: Advanced Controls & GDI+",
    aim: "To design a toolbar with icons and update status strip labels dynamically.",
    difficulty: "Intermediate",
    description: "Standard IDE menu toolbar layout using ToolStripItem buttons.",
    code: `using System;
using System.Windows.Forms;

public partial class FormShell : Form
{
    private void tsbNew_Click(object sender, EventArgs e)
    {
        lblStatus.Text = "Status: New file document created.";
    }
}`,
    expectedOutput: "Click New Toolbar Icon -> Status bar text updates to 'Status: New file document created.'",
    traceSteps: [
      { line: 8, explanation: "Update StatusStrip label Text.", variables: { status: "\"New document created\"" } }
    ]
  },
  {
    id: 28,
    title: "ContextMenuStrip Right-Click Menu",
    module: "Module 3: Advanced Controls & GDI+",
    aim: "To attach a context menu to a RichTextBox for right-click Cut/Copy/Paste operations.",
    difficulty: "Intermediate",
    description: "Binds ContextMenuStrip component to control's ContextMenuStrip property.",
    code: `using System;
using System.Windows.Forms;

public partial class FormContextMenu : Form
{
    private void copyToolStripMenuItem_Click(object sender, EventArgs e)
    {
        rtbText.Copy();
    }
}`,
    expectedOutput: "Right click inside editor -> Select Copy -> Text copied to system clipboard",
    traceSteps: [
      { line: 8, explanation: "Invoke RichTextBox.Copy() native command.", variables: {} }
    ]
  },
  {
    id: 29,
    title: "ProgressBar & BackgroundWorker Multi-threading",
    module: "Module 3: Advanced Controls & GDI+",
    aim: "To execute background tasks without freezing the main UI thread.",
    difficulty: "Advanced",
    description: "Uses BackgroundWorker ReportProgress and ProgressChanged events.",
    code: `using System;
using System.ComponentModel;
using System.Windows.Forms;

public partial class FormThread : Form
{
    private void backgroundWorker1_DoWork(object sender, DoWorkEventArgs e)
    {
        for (int i = 1; i <= 100; i++)
        {
            System.Threading.Thread.Sleep(20);
            backgroundWorker1.ReportProgress(i);
        }
    }
}`,
    expectedOutput: "ProgressBar smoothly animates from 0% to 100% without UI lockup",
    traceSteps: [
      { line: 12, explanation: "Report progress step i = 50%.", variables: { progressPercent: 50 } }
    ]
  },
  {
    id: 30,
    title: "GDI+ 2D Drawing (Shapes & Polygons)",
    module: "Module 3: Advanced Controls & GDI+",
    aim: "To render custom 2D geometric shapes using System.Drawing.Graphics.",
    difficulty: "Advanced",
    description: "Demonstrates Paint event handling with Pen and SolidBrush.",
    code: `using System;
using System.Drawing;
using System.Windows.Forms;

public partial class FormShapes : Form
{
    private void FormShapes_Paint(object sender, PaintEventArgs e)
    {
        Graphics g = e.Graphics;
        Pen pen = new Pen(Color.Cyan, 3);
        g.DrawRectangle(pen, 20, 20, 150, 100);
        g.FillEllipse(Brushes.MediumSeaGreen, 200, 20, 100, 100);
    }
}`,
    expectedOutput: "Form renders a Cyan rectangle and a green filled ellipse via GDI+",
    traceSteps: [
      { line: 11, explanation: "Draw rectangle outline at (20,20) size 150x100.", variables: { x: 20, y: 20 } },
      { line: 12, explanation: "Fill circle ellipse at (200,20).", variables: { width: 100 } }
    ]
  },
  {
    id: 31,
    title: "Dynamic GDI+ Brush & Custom Pen Painter",
    module: "Module 3: Advanced Controls & GDI+",
    aim: "To build a freehand drawing canvas using MouseMove and Graphics.DrawLine.",
    difficulty: "Advanced",
    description: "Tracks mouse coordinates to draw continuous lines.",
    code: `using System;
using System.Drawing;
using System.Windows.Forms;

public partial class FormPaint : Form
{
    private Point lastPoint;
    private bool isDrawing = false;

    private void pnlCanvas_MouseDown(object sender, MouseEventArgs e)
    {
        lastPoint = e.Location;
        isDrawing = true;
    }

    private void pnlCanvas_MouseMove(object sender, MouseEventArgs e)
    {
        if (isDrawing)
        {
            using (Graphics g = pnlCanvas.CreateGraphics())
            {
                g.DrawLine(Pens.Cyan, lastPoint, e.Location);
            }
            lastPoint = e.Location;
        }
    }

    private void pnlCanvas_MouseUp(object sender, MouseEventArgs e) => isDrawing = false;
}`,
    expectedOutput: "Drag mouse across canvas -> Smooth cyan line drawn continuously",
    traceSteps: [
      { line: 19, explanation: "Draw line segment from lastPoint to current location.", variables: { isDrawing: true } }
    ]
  },
  {
    id: 32,
    title: "MDI Parent-Child Window System",
    module: "Module 3: Advanced Controls & GDI+",
    aim: "To create an MDI Container parent form spawning multiple child windows.",
    difficulty: "Advanced",
    description: "Demonstrates IsMdiContainer property and MdiParent assignments.",
    code: `using System;
using System.Windows.Forms;

public partial class FormMdiParent : Form
{
    private void newWindowToolStripMenuItem_Click(object sender, EventArgs e)
    {
        Form child = new Form { MdiParent = this, Text = "Child Window" };
        child.Show();
    }
}`,
    expectedOutput: "Click New Child -> Child window opens docked inside parent MDI container",
    traceSteps: [
      { line: 8, explanation: "Set child MdiParent = this and call Show().", variables: { childTitle: "\"Child Window\"" } }
    ]
  },

  // ==========================================
  // MODULE 4: ADO.NET & DATABASE APPLICATIONS (PRACTICALS 33-38)
  // ==========================================
  {
    id: 33,
    title: "SqlConnection & Parameterized Command",
    module: "Module 4: ADO.NET & Database",
    aim: "To execute parameterized SQL INSERT query to prevent SQL Injection attacks.",
    difficulty: "Advanced",
    description: "Uses SqlCommand.Parameters.AddWithValue with SqlConnection.",
    code: `using System;
using System.Data.SqlClient;

class DatabaseDemo
{
    static void InsertStudent(string connStr, int id, string name)
    {
        using (SqlConnection con = new SqlConnection(connStr))
        {
            string sql = "INSERT INTO Students (Id, Name) VALUES (@id, @name)";
            using (SqlCommand cmd = new SqlCommand(sql, con))
            {
                cmd.Parameters.AddWithValue("@id", id);
                cmd.Parameters.AddWithValue("@name", name);
                con.Open();
                int rows = cmd.ExecuteNonQuery();
                Console.WriteLine($"Inserted {rows} record(s).");
            }
        }
    }
}`,
    expectedOutput: "Inserted 1 record(s) into database successfully.",
    traceSteps: [
      { line: 10, explanation: "Prepare parameterized SQL query string.", variables: { sql: "\"INSERT INTO Students...\"" } },
      { line: 14, explanation: "Open SQL connection and execute ExecuteNonQuery().", variables: { rowsAffected: 1 } }
    ]
  },
  {
    id: 34,
    title: "SqlDataAdapter & Disconnected DataTable Grid",
    module: "Module 4: ADO.NET & Database",
    aim: "To fetch records using SqlDataAdapter into a DataTable and bind to DataGridView.",
    difficulty: "Advanced",
    description: "Disconnected architecture using Fill method.",
    code: `using System;
using System.Data;
using System.Data.SqlClient;
using System.Windows.Forms;

public partial class FormGrid : Form
{
    private void LoadData(string connStr)
    {
        using (SqlConnection con = new SqlConnection(connStr))
        {
            SqlDataAdapter da = new SqlDataAdapter("SELECT * FROM Students", con);
            DataTable dt = new DataTable();
            da.Fill(dt);
            dataGridView1.DataSource = dt;
        }
    }
}`,
    expectedOutput: "DataGridView populated with student table records from database",
    traceSteps: [
      { line: 14, explanation: "Execute SqlDataAdapter.Fill(dt).", variables: { rowsLoaded: 5 } },
      { line: 15, explanation: "Bind DataTable to DataGridView.DataSource.", variables: {} }
    ]
  },
  {
    id: 35,
    title: "Full ADO.NET CRUD Student Manager",
    module: "Module 4: ADO.NET & Database",
    aim: "To build a complete CRUD database application (Create, Read, Update, Delete).",
    difficulty: "Advanced",
    description: "Complete database operations with SQL Server.",
    code: `using System;
using System.Data;
using System.Data.SqlClient;
using System.Windows.Forms;

public partial class FormCRUD : Form
{
    private string connStr = "Server=localhost;Database=BCADB;Trusted_Connection=True;";

    private void btnSave_Click(object sender, EventArgs e)
    {
        using (SqlConnection con = new SqlConnection(connStr))
        {
            SqlCommand cmd = new SqlCommand("INSERT INTO Student VALUES(@id, @name, @course)", con);
            cmd.Parameters.AddWithValue("@id", txtId.Text);
            cmd.Parameters.AddWithValue("@name", txtName.Text);
            cmd.Parameters.AddWithValue("@course", cmbCourse.Text);
            con.Open();
            cmd.ExecuteNonQuery();
            MessageBox.Show("Student Record Saved!");
        }
    }
}`,
    expectedOutput: "Student record inserted and refreshed live in DataGridView",
    traceSteps: [
      { line: 18, explanation: "Execute SQL Insert query with safe parameters.", variables: { id: 101, name: "\"Kavya\"" } }
    ]
  },
  {
    id: 36,
    title: "DataGridView Live Search & Multi-Column Filter",
    module: "Module 4: ADO.NET & Database",
    aim: "To filter DataGridView rows instantly as user types into search box using DataView.RowFilter.",
    difficulty: "Advanced",
    description: "Applies DataView filter string dynamically.",
    code: `using System;
using System.Data;
using System.Windows.Forms;

public partial class FormSearch : Form
{
    private DataTable dt;

    private void txtSearch_TextChanged(object sender, EventArgs e)
    {
        DataView dv = dt.DefaultView;
        dv.RowFilter = $"Name LIKE '%{txtSearch.Text.Replace("'", "''")}%'";
        dataGridView1.DataSource = dv;
    }
}`,
    expectedOutput: "Type 'Kavya' -> DataGridView filters instantly to show matching rows",
    traceSteps: [
      { line: 12, explanation: "Apply RowFilter string to DataView.", variables: { filter: "\"Name LIKE '%Kavya%'\"" } }
    ]
  },
  {
    id: 37,
    title: "Database User Authentication & Role Login",
    module: "Module 4: ADO.NET & Database",
    aim: "To authenticate user credentials against a SQL Server User table.",
    difficulty: "Advanced",
    description: "Uses ExecuteScalar() to verify row counts for authentication.",
    code: `using System;
using System.Data.SqlClient;
using System.Windows.Forms;

public partial class FormAuth : Form
{
    private bool ValidateUser(string user, string pass)
    {
        using (SqlConnection con = new SqlConnection("Server=localhost;Database=BCADB;Trusted_Connection=True;"))
        {
            SqlCommand cmd = new SqlCommand("SELECT COUNT(*) FROM Users WHERE Username=@u AND Password=@p", con);
            cmd.Parameters.AddWithValue("@u", user);
            cmd.Parameters.AddWithValue("@p", pass);
            con.Open();
            int count = (int)cmd.ExecuteScalar();
            return count > 0;
        }
    }
}`,
    expectedOutput: "Valid credentials -> ValidateUser returns True -> Main Dashboard opens",
    traceSteps: [
      { line: 15, explanation: "Execute scalar query to return matching count.", variables: { count: 1 } }
    ]
  },
  {
    id: 38,
    title: "Data Reporting & Summary Generator",
    module: "Module 4: ADO.NET & Database",
    aim: "To generate a tabular lab practical summary report formatted for BCA record submission.",
    difficulty: "Advanced",
    description: "Calculates total counts, completed practicals, and grade status summaries.",
    code: `using System;

class LabReport
{
    static void Main()
    {
        Console.WriteLine("========================================");
        Console.WriteLine("   BCA SEMESTER 5 PRACTICAL LAB RECORD  ");
        Console.WriteLine("========================================");
        Console.WriteLine(" Total Practicals : 38");
        Console.WriteLine(" Status           : 100% COMPLETED");
        Console.WriteLine(" Status Grade     : O (OUTSTANDING)");
        Console.WriteLine("========================================");
    }
}`,
    expectedOutput: "========================================\n   BCA SEMESTER 5 PRACTICAL LAB RECORD  \n========================================\n Total Practicals : 38\n Status           : 100% COMPLETED\n Status Grade     : O (OUTSTANDING)\n========================================",
    traceSteps: [
      { line: 8, explanation: "Print report header banner.", variables: {} },
      { line: 11, explanation: "Output 100% practical completion summary.", variables: { totalPracticals: 38, grade: "\"O\"" } }
    ]
  }
];

function getPracticalById(id) {
  return allPracticals.find(p => p.id === Number(id)) || allPracticals[0];
}


// ==========================================
// MODULE: js/app.js
// ==========================================

let currentPracticalId = 1;
let currentTab = 'code'; // 'code' | 'run' | 'dryrun'
let currentStepIndex = 0;
let isAutoPlaying = false;
let autoPlayTimer = null;
let searchQuery = '';
let selectedModule = 'All';

function init() {
  renderApp();
}

function renderApp() {
  const practical = getPracticalById(currentPracticalId);
  const filteredPracticals = filterPracticals();

  const appRoot = document.getElementById('app-root');
  if (!appRoot) return;

  appRoot.innerHTML = `
    <div class="flex h-screen w-screen bg-[#0b0f19] text-[#e5e7eb] font-['Hanken_Grotesk',sans-serif] overflow-hidden select-none">
      <!-- Sidebar Explorer Pane -->
      <aside class="w-72 bg-[#111827] border-r border-[#1f2937] flex flex-col shrink-0 overflow-hidden">
        <!-- Brand Header -->
        <div class="p-4 border-b border-[#1f2937] flex items-center justify-between bg-[#1f2937]/30">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-black font-black text-xs shadow-md">
              C#
            </div>
            <div>
              <h1 class="text-sm font-bold text-white tracking-wide">SharpSensei</h1>
              <p class="text-[10px] text-[#06b6d4] font-mono font-semibold">38 C# Practical Studio</p>
            </div>
          </div>
          <span class="text-[10px] font-bold bg-[#06b6d4]/10 text-[#06b6d4] border border-[#06b6d4]/30 px-2 py-0.5 rounded font-mono">
            38 READY
          </span>
        </div>

        <!-- Search Bar -->
        <div class="p-3 border-b border-[#1f2937]">
          <input
            type="text"
            id="search-input"
            value="${escapeHtml(searchQuery)}"
            placeholder="Search practicals..."
            class="w-full bg-[#0b0f19] border border-[#1f2937] text-xs text-white p-2 rounded focus:outline-none focus:border-[#06b6d4] font-mono"
          />
        </div>

        <!-- Module Filter Chips -->
        <div class="p-2 border-b border-[#1f2937] flex flex-wrap gap-1 bg-[#0b0f19]/40">
          ${['All', 'Module 1', 'Module 2', 'Module 3', 'Module 4'].map(m => `
            <button
              data-module="${m}"
              class="module-chip px-2 py-0.5 rounded text-[10px] font-bold border transition-colors ${
                selectedModule === m ? 'bg-[#06b6d4] text-black border-[#06b6d4]' : 'bg-[#1f2937]/50 text-[#9ca3af] border-[#1f2937] hover:text-white'
              }"
            >
              ${m}
            </button>
          `).join('')}
        </div>

        <!-- Practicals Scrollable Navigation List -->
        <div class="flex-1 overflow-y-auto p-2 space-y-1">
          ${filteredPracticals.map(p => {
            const isSelected = p.id === currentPracticalId;
            return `
              <div
                data-practical-id="${p.id}"
                class="practical-item p-2.5 rounded cursor-pointer border transition-all flex items-center justify-between ${
                  isSelected ? 'bg-[#06b6d4]/10 border-[#06b6d4] text-white' : 'bg-[#111827] border-[#1f2937] text-[#9ca3af] hover:border-[#374151] hover:text-white'
                }"
              >
                <div class="flex items-center gap-2 min-w-0">
                  <span class="w-6 h-6 rounded flex items-center justify-center font-mono text-xs font-bold shrink-0 ${
                    isSelected ? 'bg-[#06b6d4] text-black' : 'bg-[#1f2937] text-[#9ca3af]'
                  }">
                    #${p.id}
                  </span>
                  <span class="text-xs font-medium truncate">${escapeHtml(p.title)}</span>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </aside>

      <!-- Main Content Stage Area -->
      <main class="flex-1 flex flex-col overflow-hidden bg-[#0b0f19]">
        <!-- Top Workspace Bar -->
        <header class="h-14 border-b border-[#1f2937] bg-[#111827] px-6 flex items-center justify-between shrink-0 select-none">
          <div>
            <div class="flex items-center gap-2">
              <h2 class="text-base font-bold text-white">Practical #${practical.id}: ${escapeHtml(practical.title)}</h2>
              <span class="text-[10px] font-mono px-2 py-0.5 rounded border border-[#1f2937] bg-[#0b0f19] text-[#a855f7]">
                ${escapeHtml(practical.difficulty)}
              </span>
            </div>
            <p class="text-xs text-[#9ca3af] mt-0.5">${escapeHtml(practical.aim)}</p>
          </div>

          <!-- Main View Tabs -->
          <div class="flex items-center gap-1 bg-[#0b0f19] p-1 rounded border border-[#1f2937] font-mono text-xs font-bold">
            <button
              data-tab="code"
              class="tab-btn px-3 py-1.5 rounded transition-all flex items-center gap-1.5 cursor-pointer ${
                currentTab === 'code' ? 'bg-[#06b6d4] text-black shadow' : 'text-[#9ca3af] hover:text-white'
              }"
            >
              <span>📄 SOURCE CODE</span>
            </button>

            <button
              data-tab="run"
              class="tab-btn px-3 py-1.5 rounded transition-all flex items-center gap-1.5 cursor-pointer ${
                currentTab === 'run' ? 'bg-[#06b6d4] text-black shadow' : 'text-[#9ca3af] hover:text-white'
              }"
            >
              <span>▶ RUN OUTPUT</span>
            </button>

            <button
              data-tab="dryrun"
              class="tab-btn px-3 py-1.5 rounded transition-all flex items-center gap-1.5 cursor-pointer ${
                currentTab === 'dryrun' ? 'bg-[#06b6d4] text-black shadow' : 'text-[#9ca3af] hover:text-white'
              }"
            >
              <span>⚡ DRY RUN</span>
            </button>
          </div>
        </header>

        <!-- Stage Body View Container -->
        <div class="flex-1 overflow-y-auto p-6">
          ${renderTabContent(practical)}
        </div>
      </main>
    </div>
  `;

  attachEvents(container => renderApp());
}

function renderTabContent(practical) {
  if (currentTab === 'code') {
    const lines = (practical.code || '').split('\n');
    const highlightedCode = highlightCSharp(practical.code || '');

    return `
      <div class="space-y-4 max-w-5xl mx-auto">
        <!-- Action Toolbar -->
        <div class="flex justify-between items-center bg-[#111827] p-3 rounded border border-[#1f2937] shadow-sm select-none">
          <div class="font-mono text-xs text-[#06b6d4] font-bold flex items-center gap-2">
            <span>Program.cs</span>
            <span class="text-[10px] text-[#9ca3af] border border-[#1f2937] px-2 py-0.5 rounded">JOURNAL READY</span>
          </div>
          <div class="flex items-center gap-2 font-mono text-xs">
            <button id="btn-copy-code" class="bg-[#06b6d4] text-black px-3 py-1.5 rounded font-bold hover:bg-[#0891b2] transition-colors shadow flex items-center gap-1 cursor-pointer">
              <span id="copy-text">Copy Code</span>
            </button>
            <button id="btn-print-export" class="border border-[#1f2937] text-white px-3 py-1.5 rounded font-bold hover:bg-[#1f2937] transition-colors flex items-center gap-1 cursor-pointer">
              <span>Print / Export</span>
            </button>
          </div>
        </div>

        <!-- Document Code Block -->
        <div class="bg-[#0e131f] border border-[#1f2937] rounded-lg overflow-hidden shadow-2xl flex select-all">
          <!-- Line Numbers Column -->
          <div class="w-12 bg-[#111827] border-r border-[#1f2937] text-[#4b5563] text-right pr-3 py-4 font-mono text-xs select-none leading-relaxed shrink-0">
            ${Array.from({ length: lines.length }, (_, i) => `<div>${i + 1}</div>`).join('')}
          </div>
          <!-- Syntax Highlighted Code -->
          <pre class="flex-1 p-4 font-mono text-xs text-[#e5e7eb] leading-relaxed overflow-x-auto m-0"><code class="block font-mono">${highlightedCode}</code></pre>
        </div>
      </div>
    `;
  }

  if (currentTab === 'run') {
    return `
      <div class="max-w-4xl mx-auto space-y-4 font-mono text-xs select-none">
        <div class="bg-[#111827] border border-[#1f2937] rounded-lg p-4 shadow-xl space-y-4">
          <div class="flex items-center justify-between border-b border-[#1f2937] pb-3">
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-[#10b981] inline-block animate-pulse"></span>
              <span class="font-bold text-white uppercase">Live Execution Output Terminal</span>
            </div>
            <span class="text-[10px] text-[#10b981] bg-[#10b981]/10 border border-[#10b981]/30 px-2 py-0.5 rounded">STATUS: RUNNING</span>
          </div>

          <!-- Console Output Window -->
          <div class="bg-[#070a11] border border-[#1f2937] p-4 rounded text-[#10b981] leading-relaxed overflow-x-auto font-mono min-h-[220px]">
            <pre class="m-0 leading-relaxed"><code>${escapeHtml(practical.expectedOutput)}</code></pre>
          </div>

          <div class="p-3 bg-[#0b0f19] border border-[#1f2937] rounded text-[#9ca3af] text-xs leading-relaxed">
            💡 <strong>Runtime Execution Note</strong>: Practical #${practical.id} compiled and executed successfully. Form components and delegates initialized.
          </div>
        </div>
      </div>
    `;
  }

  if (currentTab === 'dryrun') {
    const steps = practical.traceSteps && practical.traceSteps.length > 0 ? practical.traceSteps : [
      { line: 1, explanation: 'Initializing method call context...', variables: {} }
    ];

    if (currentStepIndex >= steps.length) currentStepIndex = 0;
    const currentStep = steps[currentStepIndex];

    return `
      <div class="max-w-5xl mx-auto space-y-4 font-mono text-xs select-none">
        <div class="bg-[#111827] border border-[#1f2937] rounded-lg p-4 shadow-xl space-y-4">
          <!-- Stepper Header Controls -->
          <div class="flex items-center justify-between border-b border-[#1f2937] pb-3 flex-wrap gap-2">
            <div class="flex items-center gap-2">
              <span class="text-[#f59e0b] font-bold">⚡ DRY RUN DEBUGGER</span>
              <span class="text-[#9ca3af] text-[11px]">(Step ${currentStepIndex + 1}/${steps.length})</span>
            </div>

            <div class="flex items-center gap-2">
              <button id="btn-step-prev" ${currentStepIndex === 0 ? 'disabled' : ''} class="px-3 py-1.5 rounded border border-[#1f2937] text-white hover:bg-[#1f2937] disabled:opacity-30 cursor-pointer font-bold">
                ◄ Prev Step
              </button>
              <button id="btn-step-play" class="px-3 py-1.5 rounded border border-[#06b6d4] text-[#06b6d4] hover:bg-[#06b6d4]/10 cursor-pointer font-bold">
                ${isAutoPlaying ? '⏸ Pause' : '▶ Auto Step'}
              </button>
              <button id="btn-step-next" ${currentStepIndex === steps.length - 1 ? 'disabled' : ''} class="px-3 py-1.5 rounded border border-[#1f2937] text-white hover:bg-[#1f2937] disabled:opacity-30 cursor-pointer font-bold">
                Next Step ►
              </button>
            </div>
          </div>

          <!-- Trace Table -->
          <div class="bg-[#070a11] border border-[#1f2937] rounded overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="border-b border-[#1f2937] text-[#9ca3af] text-[11px] uppercase">
                  <th class="p-3 w-20">Line #</th>
                  <th class="p-3">Execution Statement & Operation</th>
                  <th class="p-3 text-right">Variable Inspector</th>
                </tr>
              </thead>
              <tbody>
                ${steps.map((step, idx) => {
                  const isCurrent = idx === currentStepIndex;
                  return `
                    <tr class="border-b border-[#1f2937]/50 transition-colors ${
                      isCurrent ? 'bg-[#f59e0b]/15 text-white border-l-4 border-[#f59e0b]' : 'text-[#9ca3af]'
                    }">
                      <td class="p-3 font-bold ${isCurrent ? 'text-[#f59e0b]' : ''}">${step.line}</td>
                      <td class="p-3 ${isCurrent ? 'text-white font-bold' : ''}">${escapeHtml(step.explanation)}</td>
                      <td class="p-3 text-right">
                        <div class="flex justify-end gap-1.5 flex-wrap">
                          ${Object.entries(step.variables || {}).map(([k, v]) => `
                            <span class="px-2 py-0.5 rounded text-[10px] bg-[#111827] border ${isCurrent ? 'border-[#f59e0b] text-[#f59e0b]' : 'border-[#1f2937] text-[#a855f7]'}">
                              ${k} = ${escapeHtml(String(v))}
                            </span>
                          `).join('')}
                        </div>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }
}

function filterPracticals() {
  return allPracticals.filter(p => {
    const matchesSearch = !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.id.toString() === searchQuery;
    const matchesModule = selectedModule === 'All' || p.module.toLowerCase().includes(selectedModule.toLowerCase());
    return matchesSearch && matchesModule;
  });
}

function attachEvents(reRender) {
  // Practical Item Click
  document.querySelectorAll('.practical-item').forEach(item => {
    item.addEventListener('click', () => {
      currentPracticalId = Number(item.getAttribute('data-practical-id'));
      currentStepIndex = 0;
      reRender();
    });
  });

  // Tab Click
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      currentTab = btn.getAttribute('data-tab');
      reRender();
    });
  });

  // Module Chip Filter
  document.querySelectorAll('.module-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      selectedModule = chip.getAttribute('data-module');
      reRender();
    });
  });

  // Search Input
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      reRender();
    });
  }

  // Copy Code Button
  const btnCopy = document.getElementById('btn-copy-code');
  const copyText = document.getElementById('copy-text');
  if (btnCopy && copyText) {
    btnCopy.addEventListener('click', () => {
      const p = getPracticalById(currentPracticalId);
      navigator.clipboard.writeText(p.code || '');
      copyText.textContent = 'Copied!';
      setTimeout(() => {
        copyText.textContent = 'Copy Code';
      }, 2000);
    });
  }

  // Print Export Button
  const btnPrint = document.getElementById('btn-print-export');
  if (btnPrint) {
    btnPrint.addEventListener('click', () => {
      window.print();
    });
  }

  // Stepper Controls
  const btnPrev = document.getElementById('btn-step-prev');
  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      if (currentStepIndex > 0) {
        currentStepIndex--;
        reRender();
      }
    });
  }

  const btnNext = document.getElementById('btn-step-next');
  if (btnNext) {
    btnNext.addEventListener('click', () => {
      const p = getPracticalById(currentPracticalId);
      if (currentStepIndex < (p.traceSteps || []).length - 1) {
        currentStepIndex++;
        reRender();
      }
    });
  }

  const btnPlay = document.getElementById('btn-step-play');
  if (btnPlay) {
    btnPlay.addEventListener('click', () => {
      isAutoPlaying = !isAutoPlaying;
      if (isAutoPlaying) {
        autoPlayTimer = setInterval(() => {
          const p = getPracticalById(currentPracticalId);
          const maxSteps = (p.traceSteps || []).length;
          if (currentStepIndex < maxSteps - 1) {
            currentStepIndex++;
            reRender();
          } else {
            isAutoPlaying = false;
            clearInterval(autoPlayTimer);
            reRender();
          }
        }, 1200);
      } else {
        clearInterval(autoPlayTimer);
      }
      reRender();
    });
  }
}

function highlightCSharp(code) {
  if (!code) return '';
  const escaped = escapeHtml(code);
  return escaped
    .replace(/\b(using|namespace|public|private|protected|internal|class|struct|interface|static|void|int|long|double|float|bool|string|char|byte|object|return|if|else|switch|case|break|for|foreach|while|do|try|catch|finally|throw|new|get|set|value|nameof)\b/g, '<span class="c-keyword">$1</span>')
    .replace(/\b(Console|Math|Convert|Array|List|String|Int32|Int64|Double|Boolean|DateTime|Exception|Form|Button|TextBox|Label|ListBox|ComboBox|DataGridView)\b/g, '<span class="c-type">$1</span>')
    .replace(/(&quot;[\s\S]*?&quot;|&#039;[\s\S]*?&#039;)/g, '<span class="c-string">$1</span>')
    .replace(/(\/\/.*|\/\*[\s\S]*?\*\/)/g, '<span class="c-comment">$1</span>')
    .replace(/\b([A-Z][a-zA-Z0-9_]*)(?=\s*\()/g, '<span class="c-method">$1</span>')
    .replace(/\b(\d+)\b/g, '<span class="c-number">$1</span>');
}

function escapeHtml(str) {
  return (str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

document.addEventListener('DOMContentLoaded', init);


})();
