# ⚡ SharpSensei // C# WinForms Lab IDE & AI Tutor

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen.svg)]()
[![React](https://img.shields.io/badge/React-19.0-blue.svg)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-v4.0-38bdf8.svg)](https://tailwindcss.com/)
[![Express](https://img.shields.io/badge/Express-4.21-000000.svg)](https://expressjs.com/)
[![Gemini AI](https://img.shields.io/badge/AI-Gemini%203.7%20Flash-orange.svg)](https://ai.google.dev/)

SharpSensei is a full-stack interactive educational platform designed for BCA (Bachelor of Computer Applications) Semester 5 students to master **C# .NET GUI Programming** with Windows Forms.

---

## ✨ Features

- 🖥️ **38 Interactive WinForms Simulations**: Real-time interactive control emulations (Buttons, ListBoxes, DataGridViews, GDI+ Graphics, Timers).
- 🔍 **Dry Run Visualizer**: Step-by-step logic execution and memory allocation visualizer.
- 🎓 **AI Tutor & Viva Voce Exam Prep**: Powered by Google Gemini 3.7/3.1 Flash with built-in offline fallback engine.
- 🛠️ **Visual Studio Guide**: Step-by-step guidance for control configurations and properties.
- 🎨 **Multi-Theme Engine**: Sleek dark modes, glassmorphism, and classic Visual Studio themes.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite 6, Tailwind CSS v4, Motion, Lucide React
- **Backend**: Express.js, Node.js, `@google/genai`
- **Build Tools**: Vite, `esbuild`, `tsx`

---

## 🚀 Quick Start (Local Setup)

### Prerequisites
- Node.js 20+ or Bun 1.1+

### Installation
```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/SharpSensei.git
cd SharpSensei

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env

# 4. Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Available Scripts

| Script | Description |
| :--- | :--- |
| `npm run dev` | Starts Express server with Vite HMR middleware |
| `npm run build` | Bundles Vite SPA and compiles `server.ts` to `dist/server.cjs` |
| `npm start` | Runs production Node.js server from `dist/server.cjs` |
| `npm run lint` | Performs TypeScript static type checking |
| `npm run clean` | Cleans up build artifacts (`dist/`) cross-platform |

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
