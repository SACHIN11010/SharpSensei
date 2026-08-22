# Contributing to SharpSensei

Thank you for your interest in improving SharpSensei!

## 🚀 How to Contribute

1. **Fork the Repository** on GitHub.
2. **Create a Feature Branch**:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes.** SharpSensei is a static, dependency-free site. Edit the ES-module
   sources — never `js/bundle.js` directly:
   - `js/practicalsData.js` — the 38 practicals (code, expected output, dry-run trace).
   - `js/app.js` — the UI (rendering, tabs, search/filter, stepper, syntax highlighter).
   - `css/styles.css` — styles, C# token colors, and print rules.
4. **Rebuild the bundle and verify** (Node.js 18+):
   ```bash
   npm run build   # regenerates js/bundle.js from the sources
   npm run lint    # node --check on the sources and the bundle
   ```
5. **Commit your changes** — include both the edited source **and** the regenerated `js/bundle.js`:
   ```bash
   git commit -m 'Add new C# practical'
   ```
6. **Push and open a Pull Request**:
   ```bash
   git push origin feature/amazing-feature
   ```

## 🎨 Guidelines & Standards

- `js/bundle.js` is a **generated artifact**. Always regenerate it with `npm run build` rather than
  editing it by hand — CI fails if the committed bundle does not match a fresh build of the sources.
- Ensure the sources and bundle pass `npm run lint`.
- Preserve the existing C# WinForms lab educational content, and keep C# examples compilable.
