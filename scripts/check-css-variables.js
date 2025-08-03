#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';

// Read Tailwind config
const require = createRequire(import.meta.url);
const tailwindConfig = require('../tailwind.config.cjs');

// Read CSS file
const cssContent = fs.readFileSync('src/index.css', 'utf8');

// Extract CSS variables from CSS file
const definedVariables = new Set();
const cssVarRegex = /--([a-zA-Z0-9-]+)\s*:/g;
let match;
while ((match = cssVarRegex.exec(cssContent)) !== null) {
  definedVariables.add(`--${match[1]}`);
}

// Extract CSS variables used in Tailwind config
const usedVariables = new Set();
const configString = JSON.stringify(tailwindConfig);
const varRegex = /var\((--[a-zA-Z0-9-]+)\)/g;
while ((match = varRegex.exec(configString)) !== null) {
  usedVariables.add(match[1]);
}

// Find undefined variables
const undefinedVariables = [];
for (const variable of usedVariables) {
  if (!definedVariables.has(variable)) {
    undefinedVariables.push(variable);
  }
}

// Report results
if (undefinedVariables.length > 0) {
  console.error('❌ Undefined CSS variables found in tailwind.config.cjs:');
  undefinedVariables.forEach(variable => {
    console.error(`   ${variable}`);
  });
  console.error(`\nAdd these variables to src/index.css`);
  process.exit(1);
} else {
  console.log('✅ All CSS variables in tailwind.config.cjs are defined');
}