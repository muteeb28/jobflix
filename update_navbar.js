const fs = require('fs');
let code = fs.readFileSync('src/components/Navbar.tsx', 'utf8');

// Tighten gap to 6px
code = code.replace(/gap-2/, 'gap-[6px]');

// Fix Font
const oldSpan = '<span className="text-[16px] font-normal text-white tracking-[-0.01em] normal-case leading-none font-[family-name:var(--font-plus-jakarta)]">';
const newSpan = '<span className="text-[16px] font-medium text-white tracking-[-0.01em] normal-case leading-none mt-[2px]" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>';
code = code.replace(oldSpan, newSpan);

fs.writeFileSync('src/components/Navbar.tsx', code);
