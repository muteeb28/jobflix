const fs = require('fs');
const path = require('path');

function walk(dir, exts) {
  let files = [];
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) files = files.concat(walk(full, exts));
    else if (exts.some(e => full.endsWith(e))) files.push(full);
  }
  return files;
}

const replacements = [
  // ── Particle color ───────────────────────────────────────────────
  [/particleColor="#fbbf24"/g, 'particleColor="#ffffff"'],

  // ── Shadows: yellow/amber rgba → white rgba ──────────────────────
  [/rgba\(250,204,21,0\.08\)/g, 'rgba(255,255,255,0.06)'],
  [/rgba\(250,204,21,0\.1\)/g,  'rgba(255,255,255,0.08)'],
  [/rgba\(251,191,36,0\.08\)/g, 'rgba(255,255,255,0.06)'],
  [/rgba\(251,191,36,0\.3\)/g,  'rgba(255,255,255,0.15)'],
  [/rgba\(251,191,36,0\.2\)/g,  'rgba(255,255,255,0.10)'],
  [/rgba\(251,191,36,0\.1\)/g,  'rgba(255,255,255,0.08)'],

  // ── Gradient backgrounds ─────────────────────────────────────────
  [/from-amber-500\/10/g, 'from-white\/5'],
  [/from-amber-500\/8/g,  'from-white\/5'],
  [/via-orange-500\/5/g,  'via-transparent'],

  // ── text-amber / text-yellow ─────────────────────────────────────
  [/text-amber-200\/50/g,    'text-white\/40'],
  [/text-amber-200\/70/g,    'text-white\/60'],
  [/text-amber-200\/80/g,    'text-white\/70'],
  [/text-amber-400\/30/g,    'text-white\/20'],
  [/text-amber-100/g,        'text-neutral-300'],
  [/text-amber-200/g,        'text-neutral-400'],
  [/text-amber-300/g,        'text-white'],
  [/text-amber-400/g,        'text-white'],
  [/text-yellow-300/g,       'text-white'],
  [/text-yellow-400/g,       'text-white'],

  // ── border-yellow / border-amber ─────────────────────────────────
  [/border-yellow-400\/30/g,  'border-white\/20'],
  [/border-yellow-400\/20/g,  'border-white\/15'],
  [/border-yellow-400\/10/g,  'border-white\/10'],
  [/border-amber-400\/30/g,   'border-white\/20'],
  [/border-amber-400\/25/g,   'border-white\/20'],
  [/border-amber-400\/20/g,   'border-white\/15'],
  [/border-amber-300\/60/g,   'border-white\/40'],
  [/border-amber-300\/50/g,   'border-white\/35'],
  [/border-amber-300\/30/g,   'border-white\/20'],
  [/border-yellow-600/g,      'border-neutral-900'],
  [/border-amber-400/g,       'border-white\/25'],
  [/border-yellow-400/g,      'border-white\/25'],
  [/border-amber-300/g,       'border-white\/25'],

  // ── bg-yellow / bg-amber ─────────────────────────────────────────
  [/bg-yellow-400\/10/g,  'bg-white\/10'],
  [/bg-yellow-400\/5/g,   'bg-white\/5'],
  [/bg-amber-400\/10/g,   'bg-white\/10'],
  [/bg-amber-400\/15/g,   'bg-white\/10'],
  [/bg-amber-500\/10/g,   'bg-white\/10'],
  [/bg-amber-500\/8/g,    'bg-white\/5'],
  [/bg-amber-400\/8/g,    'bg-white\/5'],
  [/bg-amber-400/g,       'bg-white'],
  [/bg-yellow-400/g,      'bg-white'],
  [/bg-yellow-300/g,      'bg-neutral-100'],
  [/bg-amber-300/g,       'bg-neutral-100'],
  [/bg-yellow-500\/5/g,   'bg-white\/5'],
  [/bg-yellow-500\/8/g,   'bg-white\/5'],
  [/bg-yellow-400\/5/g,   'bg-white\/5'],
  [/bg-yellow-500\/10/g,  'bg-white\/8'],

  // ── hover states ─────────────────────────────────────────────────
  [/hover:bg-yellow-400/g,      'hover:bg-neutral-100'],
  [/hover:bg-yellow-300/g,      'hover:bg-neutral-200'],
  [/hover:bg-amber-300/g,       'hover:bg-neutral-200'],
  [/hover:border-yellow-400/g,  'hover:border-white\/50'],
  [/hover:border-amber-300/g,   'hover:border-white\/40'],
  [/hover:text-yellow-400/g,    'hover:text-white'],
  [/hover:text-amber-200/g,     'hover:text-white'],
  [/group-hover:text-yellow-400/g, 'group-hover:text-white'],
  [/group-hover:text-amber-300/g,  'group-hover:text-white'],

  // ── focus states ─────────────────────────────────────────────────
  [/focus:ring-yellow-400/g,   'focus:ring-white'],
  [/focus:border-yellow-400/g, 'focus:border-white\/50'],

  // ── amber glow blobs ─────────────────────────────────────────────
  [/bg-amber-400\/15 blur/g, 'bg-white\/8 blur'],

  // ── gradient from- ────────────────────────────────────────────────
  [/from-yellow-400\/30/g, 'from-white\/20'],
  [/from-amber-400\/30/g,  'from-white\/20'],
  [/from-amber-300\/30/g,  'from-white\/20'],
];

const srcDir = path.join(__dirname, 'src');
const files = walk(srcDir, ['.tsx', '.ts', '.css']);

let changedCount = 0;
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  const original = content;
  for (const [pattern, replacement] of replacements) {
    content = content.replace(pattern, replacement);
  }
  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    changedCount++;
    console.log('Updated:', path.relative(srcDir, file));
  }
}
console.log(`\nDone. ${changedCount} files updated.`);
