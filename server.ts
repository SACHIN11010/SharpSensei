import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
let geminiClient: GoogleGenAI | null = null;
function getGemini(): GoogleGenAI | null {
  if (!geminiClient && process.env.GEMINI_API_KEY) {
    geminiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return geminiClient;
}

// Fallback Model Sequence to guarantee high availability even during model spikes
const FALLBACK_MODELS = ['gemini-3.7-flash', 'gemini-3.1-flash-lite', 'gemini-flash-latest'];

async function callGeminiWithFallback(
  ai: GoogleGenAI, 
  prompt: string, 
  systemInstruction?: string,
  responseMimeType?: string
): Promise<{ text: string; modelUsed: string }> {
  let lastError: any = null;

  for (const model of FALLBACK_MODELS) {
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: prompt,
          config: {
            systemInstruction,
            temperature: 0.6,
            ...(responseMimeType ? { responseMimeType } : {})
          },
        });

        if (response.text) {
          return { text: response.text, modelUsed: model };
        }
      } catch (err: any) {
        lastError = err;
        const errMsg = err?.message || String(err);
        const isTransient = errMsg.includes('503') || errMsg.includes('429') || errMsg.includes('high demand') || errMsg.includes('UNAVAILABLE');
        
        if (isTransient && attempt === 0) {
          // Quick backoff before retry on same model
          await new Promise(r => setTimeout(r, 400));
          continue;
        }
        // Move to next model in fallback array
        break;
      }
    }
  }

  throw lastError || new Error('All AI models experienced high demand');
}

// Curated C# Knowledge Engine fallback if all API endpoints are temporarily unavailable
function generateCuratedCsharpAnswer(
  practicalId: number,
  practicalTitle: string,
  aimText: string,
  questionText: string,
  codeText: string
): string {
  const q = questionText.toLowerCase();

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

// API: Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// API: AI C# Tutor & Code Explainer
app.post('/api/ai/ask', async (req, res) => {
  const questionText = req.body.question || req.body.query || '';
  const practicalId = req.body.practicalContext?.id || 1;
  const titleText = req.body.practicalTitle || req.body.practicalContext?.title || 'General C# .NET Lab';
  const codeText = req.body.practicalCode || req.body.practicalContext?.codeSnippet || req.body.practicalContext?.code || '';
  const aimText = req.body.practicalContext?.aim || '';

  const ai = getGemini();

  if (ai) {
    try {
      const systemInstruction = `You are SharpSensei, an expert Professor of Computer Applications specializing in C# .NET, Windows Forms GUI Programming, ADO.NET, and .NET Framework for BCA (Bachelor of Computer Applications) Semester 5 students.
Provide clear, educational, friendly, and practical answers.
Use proper Markdown code blocks with C# syntax highlighting.
Break down complex WinForms lifecycle, event handling, data binding, and GDI+ concepts clearly.
Relate explanations to Visual Studio workflows (Properties window, Event handlers, Toolbox controls).`;

      const prompt = `Context:
Current BCA Sem 5 Practical: #${practicalId} - ${titleText}
${aimText ? `Aim: ${aimText}` : ''}

Practical Source Code:
\`\`\`csharp
${codeText || '// No code provided'}
\`\`\`

User Question:
${questionText}

Please provide an insightful, structured, and easy-to-understand answer with code snippets and explanation where appropriate.`;

      const { text, modelUsed } = await callGeminiWithFallback(ai, prompt, systemInstruction);
      return res.json({ 
        reply: text, 
        answer: text, 
        modelUsed,
        source: 'gemini' 
      });
    } catch (err: any) {
      console.warn('Gemini API call failed across all models, activating SharpSensei offline knowledge engine:', err?.message || err);
      // Fall through to offline knowledge engine
    }
  }

  // Guaranteed fallback response
  const curatedAnswer = generateCuratedCsharpAnswer(practicalId, titleText, aimText, questionText, codeText);
  return res.json({ 
    reply: curatedAnswer, 
    answer: curatedAnswer, 
    modelUsed: 'SharpSensei CLR Engine (Offline Ready)',
    source: 'curated'
  });
});

// API: AI Viva Voce Generator
app.post('/api/ai/viva', async (req, res) => {
  const { practicalTitle, practicalCode, difficulty, practicalId } = req.body;
  const ai = getGemini();

  if (ai) {
    try {
      const prompt = `You are an external practical examiner taking a Viva Voce exam for BCA Semester 5 C# GUI Programming Lab.
Generate 4 crucial Viva Voce questions with detailed, model answers for:
Practical: "${practicalTitle || 'C# GUI Lab'}"
Level: ${difficulty || 'Standard University Exam'}

Source Code:
\`\`\`csharp
${practicalCode || '// C# Code'}
\`\`\`

Format as JSON with schema:
[
  {
    "question": "string",
    "shortAnswer": "string (1-2 lines for quick recap)",
    "detailedAnswer": "string (comprehensive explanation)",
    "category": "Concept | Syntax | Event-Driven | ADO.NET | Architecture"
  }
]
Return valid JSON only.`;

      const { text } = await callGeminiWithFallback(ai, prompt, undefined, 'application/json');
      const parsed = JSON.parse(text || '[]');
      return res.json({ questions: parsed });
    } catch (err: any) {
      console.warn('Viva generation API call failed, falling back to curated viva questions:', err?.message || err);
    }
  }

  // Return standard robust viva bank
  return res.json({
    questions: [
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
    ]
  });
});

// Start Server & Vite Middleware
async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SharpSensei BCA C# GUI Lab server active at http://0.0.0.0:${PORT}`);
  });
}

start();
