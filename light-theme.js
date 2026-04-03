const fs = require('fs');
const path = require('path');

// Files to keep dark (code editors, lesson workspaces)
const KEEP_DARK = [
  'components\\LessonView.tsx',
  'components\\JSLessonView.tsx',
  'components\\GitLessonView.tsx',
  'components\\CodePlayground.tsx',
  'app\\prepare\\[problemId]\\page.tsx',
  'app\\api\\',
];

function walk(dir) {
  let files = [];
  for (const e of fs.readdirSync(dir)) {
    const full = path.join(dir, e);
    if (fs.statSync(full).isDirectory()) files = files.concat(walk(full));
    else if (full.endsWith('.tsx') || full.endsWith('.ts') || full.endsWith('.css')) files.push(full);
  }
  return files;
}

const srcDir = path.join(__dirname, 'src');

const replacements = [
  // ── Page wrapper backgrounds ─────────────────────────────────────
  ['min-h-screen bg-black text-white font-pixel flex flex-col', 'min-h-screen bg-white text-neutral-900 font-pixel flex flex-col'],
  ['min-h-screen bg-white text-white font-pixel flex flex-col', 'min-h-screen bg-white text-neutral-900 font-pixel flex flex-col'],

  // ── Navbar ────────────────────────────────────────────────────────
  ['bg-black/90 backdrop-blur-md border-b border-gray-800', 'bg-white/95 backdrop-blur-md border-b border-neutral-200'],
  ['bg-black/95 backdrop-blur', 'bg-white/98 backdrop-blur'],
  ['bg-black/95 backdrop-blur-sm', 'bg-white/98 backdrop-blur-sm'],
  ['text-white/75 hover:text-neutral-900', 'text-neutral-600 hover:text-neutral-900'],
  ['text-white/75 font-normal tracking-normal text-[14px] py-2 border-b border-neutral-200',
   'text-neutral-600 font-normal tracking-normal text-[14px] py-2 border-b border-neutral-100'],

  // ── CTA buttons (bg-white text-black → teal) ─────────────────────
  ['bg-white text-black font-black text-sm uppercase tracking-wider rounded-xl transition-colors border-b-4 border-neutral-900',
   'bg-teal-500 text-white font-black text-sm uppercase tracking-wider rounded-xl transition-colors hover:bg-teal-600'],
  ['bg-white hover:bg-neutral-100 text-black font-black', 'bg-teal-500 hover:bg-teal-600 text-white font-black'],
  // Landing page primary button
  ['px-8 py-3 bg-white text-black font-bold text-sm md:text-base border-b-4 border-r-4 border-neutral-900 active:border-0 active:translate-y-1 transition-all uppercase tracking-widest shadow-[0_10px_40px_rgba(255,255,255,0.15)]',
   'px-8 py-3 bg-teal-500 hover:bg-teal-600 text-white font-bold text-sm md:text-base rounded-full transition-all uppercase tracking-widest shadow-[0_0_30px_rgba(20,184,166,0.3)]'],
  // Pricing button
  ['px-6 py-3 bg-white text-black font-bold text-xs md:text-sm border-b-4 border-r-4 border-neutral-900 active:border-0 active:translate-y-1 transition-all uppercase tracking-[0.18em] shadow-[0_10px_30px_rgba(255,255,255,0.10)]',
   'px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-bold text-xs md:text-sm rounded-full transition-all uppercase tracking-[0.18em] shadow-[0_0_20px_rgba(20,184,166,0.3)]'],
  // Signup button
  ['px-6 py-2 bg-white text-black font-bold text-sm rounded-lg active:scale-95 transition-all hover:scale-[1.03]',
   'px-6 py-2 bg-teal-500 text-white font-bold text-sm rounded-lg active:scale-95 transition-all hover:scale-[1.03] hover:bg-teal-600'],
  // General white button with black text
  ['bg-white text-black font-bold', 'bg-teal-500 text-white font-bold'],
  ['bg-white hover:bg-neutral-100 text-black', 'bg-teal-500 hover:bg-teal-600 text-white'],
  ['bg-white hover:bg-neutral-200 text-black', 'bg-teal-500 hover:bg-teal-600 text-white'],

  // ── Backgrounds ───────────────────────────────────────────────────
  // Dark overlays
  ['bg-black/60', 'bg-white/80'],
  ['bg-black/50', 'bg-white/80'],
  ['bg-black/40', 'bg-white/70'],
  ['bg-black/30', 'bg-white/60'],
  // Dark page sections
  ['bg-zinc-950', 'bg-gray-50'],
  ['bg-zinc-900/50', 'bg-neutral-100'],
  ['bg-zinc-900/30', 'bg-neutral-50'],
  ['bg-zinc-900/20', 'bg-neutral-50'],
  ['bg-zinc-900/60', 'bg-neutral-100'],
  ['bg-zinc-900/90', 'bg-white'],
  ['bg-zinc-900', 'bg-white'],
  ['bg-zinc-800/60', 'bg-neutral-100'],
  ['bg-zinc-800', 'bg-neutral-100'],
  ['bg-gray-900/60', 'bg-neutral-100'],
  ['bg-gray-900/50', 'bg-neutral-100'],
  ['bg-gray-900', 'bg-neutral-100'],
  ['bg-gray-950', 'bg-gray-50'],
  // Generic bg-black
  ['bg-black', 'bg-white'],

  // Subtle overlays (white/5 → light neutral)
  ['bg-white/5', 'bg-neutral-100'],
  ['bg-white/8', 'bg-neutral-100'],
  ['bg-white/10', 'bg-neutral-100'],
  ['bg-white/15', 'bg-neutral-100'],
  ['bg-neutral-900\/5', 'bg-neutral-100'],

  // ── Text colors ──────────────────────────────────────────────────
  // Muted text
  ['text-zinc-400', 'text-neutral-500'],
  ['text-zinc-300', 'text-neutral-600'],
  ['text-zinc-500', 'text-neutral-400'],
  ['text-zinc-600', 'text-neutral-500'],
  ['text-neutral-300', 'text-neutral-600'],
  ['text-neutral-200', 'text-neutral-700'],
  // Primary text (white → dark)
  ['text-white', 'text-neutral-900'],

  // ── Borders ──────────────────────────────────────────────────────
  ['border-white/10', 'border-neutral-200'],
  ['border-white/15', 'border-neutral-200'],
  ['border-white/20', 'border-neutral-200'],
  ['border-white/25', 'border-neutral-200'],
  ['border-white/35', 'border-neutral-300'],
  ['border-white/40', 'border-neutral-300'],
  ['border-white/50', 'border-neutral-300'],
  ['border-gray-800', 'border-neutral-200'],
  ['border-gray-700', 'border-neutral-200'],
  ['border-neutral-700', 'border-neutral-200'],
  ['border-neutral-900', 'border-neutral-200'],

  // ── Hover accents ────────────────────────────────────────────────
  ['hover:text-neutral-900 transition-colors', 'hover:text-teal-600 transition-colors'],
  ['hover:border-white/50', 'hover:border-teal-400'],
  ['hover:border-white/40', 'hover:border-teal-400'],
  ['hover:border-teal-400)', 'hover:border-teal-400)'],

  // ── Shadows ──────────────────────────────────────────────────────
  ['rgba(255,255,255,0.15)', 'rgba(20,184,166,0.25)'],
  ['rgba(255,255,255,0.06)', 'rgba(0,0,0,0.05)'],
  ['rgba(255,255,255,0.07)', 'rgba(0,0,0,0.05)'],
  ['rgba(255,255,255,0.08)', 'rgba(0,0,0,0.06)'],
  ['rgba(255,255,255,0.10)', 'rgba(0,0,0,0.06)'],
  ['rgba(255,255,255,0.05)', 'rgba(0,0,0,0.04)'],
  ['rgba(255,255,255,0.12)', 'rgba(0,0,0,0.08)'],
  ['shadow-[8px_8px_0_rgba(0,0,0,0.5)]', 'shadow-[0_2px_12px_rgba(0,0,0,0.08)]'],

  // ── Particles ────────────────────────────────────────────────────
  ['particleColor="#ffffff"', 'particleColor="#14b8a6"'],

  // ── Landing page specific ─────────────────────────────────────────
  // Background gradient blob
  ['bg-white/10 blur-[120px]', 'bg-teal-200/40 blur-[120px]'],
  ['bg-white/5 blur-[140px]', 'bg-teal-100/30 blur-[140px]'],
  ['from-white/5 via-transparent to-black', 'from-teal-50/50 via-transparent to-transparent'],

  // Badge on landing
  ['bg-neutral-100 border border-neutral-200 text-xs md:text-sm text-neutral-400 mb-6 font-mono uppercase tracking-[0.3em]',
   'bg-teal-50 border border-teal-200 text-xs md:text-sm text-teal-700 mb-6 font-mono uppercase tracking-[0.3em]'],
  // Cpu icon in badge
  ['className="w-4 h-4 text-neutral-900"', 'className="w-4 h-4 text-teal-500"'],

  // Service card punchline
  ['text-neutral-400 text-sm font-mono', 'text-teal-600 text-sm font-mono'],

  // Service card icon
  ['className="w-8 h-8 md:w-10 md:h-10 text-neutral-900"', 'className="w-8 h-8 md:w-10 md:h-10 text-teal-500"'],
  ['className="w-8 h-8 md:w-10 md:h-10 text-neutral-900', 'className="w-8 h-8 md:w-10 md:h-10 text-teal-500'],

  // Check icons
  ['className="w-4 h-4 text-neutral-900 mt-[2px]"', 'className="w-4 h-4 text-teal-500 mt-[2px]"'],

  // Card hover
  ['hover:border-neutral-200', 'hover:border-teal-300'],
  ['hover:-translate-y-1.5 transition-all duration-300', 'hover:-translate-y-1.5 hover:shadow-[0_4px_20px_rgba(20,184,166,0.12)] transition-all duration-300'],

  // Secondary explore courses button
  ['border border-neutral-200 text-sm md:text-base font-bold uppercase tracking-widest bg-neutral-100 hover:border-teal-400 transition-colors',
   'border border-neutral-300 text-sm md:text-base font-bold uppercase tracking-widest bg-white hover:border-teal-400 hover:text-teal-600 transition-colors rounded-full'],

  // Section borders
  ['border border-neutral-200 rounded-3xl', 'border border-neutral-200 rounded-3xl'],

  // Pricing section punchline
  ['text-xs font-mono uppercase tracking-[0.3em] text-neutral-900/70', 'text-xs font-mono uppercase tracking-[0.3em] text-teal-600'],

  // ── Footer ───────────────────────────────────────────────────────
  ['footer className="bg-black text-neutral-900', 'footer className="bg-gray-50 text-neutral-900'],
  ['footer className="bg-neutral-900 text-neutral-900', 'footer className="bg-gray-50 text-neutral-900'],

  // ── Scrollbar ─────────────────────────────────────────────────────
  ['background: #333', 'background: #d1d5db'],
  ['background: #555', 'background: #9ca3af'],
];

let changedCount = 0;
for (const file of walk(srcDir)) {
  const rel = path.relative(srcDir, file);
  if (KEEP_DARK.some(skip => rel.includes(skip))) continue;

  let content = fs.readFileSync(file, 'utf8');
  const original = content;
  for (const [from, to] of replacements) {
    content = content.replaceAll(from, to);
  }
  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    changedCount++;
    console.log('Updated:', rel);
  }
}
console.log(`\nDone. ${changedCount} files updated.`);
