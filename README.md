# ⚡ SharpSensei — C# Practical Studio

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Static Site](https://img.shields.io/badge/Static-Vanilla%20JS-f7df1e.svg)]()
[![No Build Deps](https://img.shields.io/badge/Dependencies-0-brightgreen.svg)]()

SharpSensei is a lightweight, offline-friendly study tool for **BCA (Bachelor of Computer
Applications) Semester 5** students working through the 38 **C# .NET GUI (Windows Forms)**
lab practicals. It runs entirely in the browser — no backend, no build step, no API keys.

---

## ✨ Features

- 📚 **38-Practical Browser** — every practical organised across 4 modules (C# OOP & Basics,
  WinForms Controls, Advanced Controls & GDI+, ADO.NET & Database), with instant **search** and
  **module filtering**.
- 📄 **Source Code Viewer** — the full `Program.cs` for each practical with line numbers and
  C# syntax highlighting, plus **Copy Code** and **Print / Export** (styled for BCA lab records).
- ▶ **Run Output** — the expected console / form output for each practical.
- ⚡ **Dry Run Visualizer** — a step-by-step execution trace with a variable inspector and an
  auto-play stepper, to walk through the logic line by line.

---

## 🛠️ Tech Stack

- **HTML + vanilla JavaScript** (ES modules, bundled to a single IIFE for `file://` support)
- **[Tailwind CSS](https://tailwindcss.com/)** via CDN + a small custom stylesheet (`css/styles.css`)
- **Google Fonts** (Hanken Grotesk, JetBrains Mono)
- No backend, no framework, and **zero runtime/build dependencies**.

---

## 🚀 Quick Start

No installation is required — it's a static site.

**Option A — just open it:**

Double-click `index.html` (it loads the pre-built `js/bundle.js`, which works over `file://`).

**Option B — run a local server** (Node.js 18+):

```bash
git clone https://github.com/YOUR_USERNAME/SharpSensei.git
cd SharpSensei
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000). Set `PORT` to change the port.

---

## 🧱 Project Structure & Build

The app is authored as two ES-module sources and bundled into one browser-ready file:

| File | Role |
| :--- | :--- |
| `js/practicalsData.js` | Data — all 38 practicals (source, expected output, dry-run trace). **Source of truth.** |
| `js/app.js` | UI — rendering, tabs, search/filter, stepper, syntax highlighter. **Source of truth.** |
| `js/bundle.js` | **Generated** IIFE that `index.html` loads. Do not edit by hand — run `npm run build`. |
| `css/styles.css` | Custom styles + C# token colors + print rules. |
| `scripts/build-bundle.mjs` | Concatenates the two sources into `js/bundle.js`. |
| `scripts/serve.mjs` | Zero-dependency static dev server. |

After editing `js/practicalsData.js` or `js/app.js`, regenerate the bundle and commit both:

```bash
npm run build
```

---

## 📜 Available Scripts

| Script | Description |
| :--- | :--- |
| `npm run build` | Regenerates `js/bundle.js` from the ES-module sources. |
| `npm run dev` / `npm start` | Serves the site locally on `http://localhost:3000`. |
| `npm run lint` | Syntax-checks the JS sources and the generated bundle (`node --check`). |

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
