#!/usr/bin/env node
// Generates Zod schemas for each TypeScript definition file using ts-to-zod
// and writes an aggregator file exporting all generated schemas.
const { execSync } = require('node:child_process');
const { writeFileSync, existsSync, unlinkSync } = require('node:fs');
const path = require('node:path');
const files = [
  'lib/api/elmo-channel-data.ts',
  'lib/api/mixer-controller-api.ts',
  'lib/config/mixer-config.ts',
  'lib/config/sesame-config.ts',
  'lib/status/sesame-streams.ts'
];

const outFile = path.join('lib', 'zod-schemas.ts');
let banner = `/* AUTO-GENERATED FILE. DO NOT EDIT.\n * Run: npm run generate:zod\n */\n\n`;

// Clean up legacy *.zod.tmp.ts files if any
files.forEach(f => {
  const legacy = f.replace(/\.ts$/, '.zod.tmp.ts');
  if (existsSync(legacy)) {
    try { unlinkSync(legacy); console.log(`Removed legacy ${legacy}`); } catch {}
  }
});

// Generate per existing file
const generated = [];
files.forEach(f => {
  if (!existsSync(f)) {
    console.warn(`Source file missing, skipping: ${f}`);
    return;
  }
  const out = f.replace(/\.ts$/, '.zod.ts');
  console.log(`Generating schemas for ${f} -> ${out}`);
  try {
    execSync(`npx ts-to-zod --skipValidation ${f} ${out}`, { stdio: 'inherit' });
    generated.push(out);
  } catch (e) {
    console.error(`Failed to generate zod schema for ${f}`);
    process.exit(1);
  }
});

// Create aggregator that exports each schema file under a namespace to prevent name collisions
let aggregator = banner;
aggregator += `import { z } from 'zod';\n`;
generated.forEach(g => {
  const relPathNoExt = './' + path.relative('lib', g).replace(/\\/g, '/').replace(/\.ts$/, '');
  // Derive namespace from file name (e.g., mixer-config.zod -> mixerConfigSchemas)
  const base = relPathNoExt.split('/').pop();
  const ns = (base || 'schemas')
    .replace(/\.zod$/, '')
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((p,i)=> i===0 ? p.charAt(0).toLowerCase()+p.slice(1) : p.charAt(0).toUpperCase()+p.slice(1))
    .join('') + 'Schemas';
  aggregator += `import * as ${ns} from '${relPathNoExt}';\n`;
});
aggregator += `\nexport { z };\n`;
aggregator += `\n// Namespaced access to avoid duplicate identifier conflicts across files\n`;
generated.forEach(g => {
  const relPathNoExt = './' + path.relative('lib', g).replace(/\\/g, '/').replace(/\.ts$/, '');
  const base = relPathNoExt.split('/').pop();
  const ns = (base || 'schemas')
    .replace(/\.zod$/, '')
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((p,i)=> i===0 ? p.charAt(0).toLowerCase()+p.slice(1) : p.charAt(0).toUpperCase()+p.slice(1))
    .join('') + 'Schemas';
  aggregator += `export { ${ns} };\n`;
});

writeFileSync(outFile, aggregator, 'utf8');
console.log(`Wrote aggregator ${outFile}`);
