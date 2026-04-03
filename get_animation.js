const fs = require('fs');
const html = fs.readFileSync('firecrawl.html', 'utf8');
const classes = html.match(/class="[^"]*"/g) || [];
const anims = classes.filter(c => c.includes('animate-') || c.includes('pulse') || c.includes('spin') || c.includes('hover:-translate-y') || c.includes('hover:rotate') || c.includes('motion-safe:animate'));
fs.writeFileSync('firecrawl_anims.txt', Array.from(new Set(anims)).join('\n'));

const svgs = html.match(/<svg[^>]*>.*?<\/svg>/g) || [];
// Firecrawl logo often has a specific class or path
const logoSvg = svgs.find(s => s.includes('text-brand') || s.includes('text-orange') || s.includes('w-8 h-8'));
if (logoSvg) fs.writeFileSync('firecrawl_logo.txt', logoSvg);
