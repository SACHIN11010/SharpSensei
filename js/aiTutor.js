import { generateCuratedCsharpAnswer } from './knowledgeEngine.js';

export async function askAiTutor(questionText, practical, userApiKey) {
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
