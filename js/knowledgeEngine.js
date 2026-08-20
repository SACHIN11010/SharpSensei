// Client-Side Curated C# Knowledge Engine (Offline AI Tutor Engine)

export function generateCuratedCsharpAnswer(
  practicalId,
  practicalTitle,
  aimText,
  questionText,
  codeText
) {
  const q = (questionText || '').toLowerCase();

  if (q.includes('logic') || q.includes('explain') || q.includes('walkthrough')) {
    return `### 📘 Logic Walkthrough: Practical #${practicalId} - ${practicalTitle}

**Aim**: ${aimText || 'Implement and verify C# .NET solution'}

#### ⚙️ Algorithmic Execution Steps:
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

💡 *Pro-Tip*: Always validate user input at the UI boundary before passing values to internal calculation methods!`;
  }

  if (q.includes('viva') || q.includes('questions') || q.includes('interview')) {
    return `### 🎓 Top 3 University Viva Voce Questions for Practical #${practicalId}

**1. Question**: What is the role of event delegation in this practical?
- **Answer**: In C#, events are encapsulated delegates (\`EventHandler\`). When the user triggers an action (like clicking a Button), the CLR invokes all subscribed methods in the invocation list with \`(object sender, EventArgs e)\`.

**2. Question**: Why should we use \`TryParse()\` instead of \`Convert.ToInt32()\`?
- **Answer**: \`TryParse()\` returns a boolean indicating success or failure without throwing a terminating \`FormatException\` if the user enters non-numeric text.

**3. Question**: What is the difference between modal (\`ShowDialog\`) and modeless (\`Show\`) windows in WinForms?
- **Answer**: \`ShowDialog()\` halts execution in the calling form and forces user response before returning, while \`Show()\` displays an independent window without blocking the parent form.`;
  }

  if (q.includes('exception') || q.includes('error') || q.includes('try catch')) {
    return `### 🛡️ Exception Handling Strategy for Practical #${practicalId}

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
    return `### 🛠️ Visual Studio Setup & Configuration Guide

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

  return `### 💡 C# .NET Practical #${practicalId}: ${practicalTitle}

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

export function generateCuratedViva(practicalTitle, practicalCode) {
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
