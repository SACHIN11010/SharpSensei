import { Practical } from '../types';

export const practicalsPart1: Practical[] = [
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
      'Create `Area(double radius)` for Circle (π * r²).',
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
    public override void MakeSound() => Console.WriteLine($"{Name} says: Woof! Woof! 🐕");
}

class Cat : Animal
{
    public Cat(string name) : base(name) { }
    public override void MakeSound() => Console.WriteLine($"{Name} says: Meow! Purr... 🐱");
}

class Cow : Animal
{
    public Cow(string name) : base(name) { }
    public override void MakeSound() => Console.WriteLine($"{Name} says: Moo! 🐄");
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
      { line: 51, explanation: 'Iteration 1: a is Dog ("Bruno"). Calls Dog.MakeSound().', variables: { 'a.Name': '"Bruno"', sound: '"Woof! Woof!"' }, outputLog: 'Bruno says: Woof! Woof! 🐕' },
      { line: 51, explanation: 'Iteration 2: a is Cat ("Whiskers"). Calls Cat.MakeSound().', variables: { 'a.Name': '"Whiskers"', sound: '"Meow! Purr..."' }, outputLog: 'Whiskers says: Meow! Purr... 🐱' },
      { line: 51, explanation: 'Iteration 3: a is Cow ("Daisy"). Calls Cow.MakeSound().', variables: { 'a.Name': '"Daisy"', sound: '"Moo!"' }, outputLog: 'Daisy says: Moo! 🐄' }
    ],
    simulatedOutput: [
      '=== RUNTIME POLYMORPHISM DEMO ===',
      'Bruno says: Woof! Woof! 🐕',
      'Bruno is sleeping peacefully. Zzz...',
      '',
      'Whiskers says: Meow! Purr... 🐱',
      'Whiskers is sleeping peacefully. Zzz...',
      '',
      'Daisy says: Moo! 🐄',
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
        Console.WriteLine($"[SMS GATEWAY] 📱 Message dispatched: {message}");
    }

    public static void SendEmail(string message)
    {
        Console.WriteLine($"[EMAIL SERVER] 📧 Email sent to subscriber: {message}");
    }

    public static void WriteLog(string message)
    {
        Console.WriteLine($"[AUDIT LOG] 📝 Written to server log: [{DateTime.Now:HH:mm:ss}] {message}");
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
      '[SMS GATEWAY] 📱 Message dispatched: BCA Semester 5 Exam Schedule Released!',
      '[EMAIL SERVER] 📧 Email sent to subscriber: BCA Semester 5 Exam Schedule Released!',
      '[AUDIT LOG] 📝 Written to server log: [10:30:15] BCA Semester 5 Exam Schedule Released!',
      '',
      '--- Unsubscribing SMS Gateway (-=) ---',
      '[EMAIL SERVER] 📧 Email sent to subscriber: Reminder: Practical Lab Record Submission Tomorrow.',
      '[AUDIT LOG] 📝 Written to server log: [10:30:15] Reminder: Practical Lab Record Submission Tomorrow.'
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
