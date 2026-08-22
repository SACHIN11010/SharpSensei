// Build js/bundle.js from the ES-module sources (js/practicalsData.js + js/app.js).
//
// The browser loads bundle.js directly as a plain (non-module) IIFE, so the app
// works from file:// as well as http://. The two source files are the single
// source of truth: edit them, then run `npm run build` and commit both.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(join(root, p), 'utf8');

// Strip the `export` keyword so the declarations become plain top-level bindings.
const data = read('js/practicalsData.js').replace(/^export\s+/gm, '').trim();
// Drop the ES import line; in the bundle the data lives in the same IIFE scope.
const app = read('js/app.js').replace(/^import\s.*from\s.*;\s*$/m, '').trim();

const bundle = `(function () {
  'use strict';

// ==========================================
// MODULE: js/practicalsData.js
// ==========================================
${data}


// ==========================================
// MODULE: js/app.js
// ==========================================

${app}


})();
`;

const outPath = join(root, 'js/bundle.js');
writeFileSync(outPath, bundle, 'utf8');
console.log(`Built js/bundle.js (${bundle.length} bytes) from js/practicalsData.js + js/app.js`);
