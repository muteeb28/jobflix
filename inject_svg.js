const fs = require('fs');
let navbar = fs.readFileSync('src/components/Navbar.tsx', 'utf8');

const svgRaw = fs.readFileSync('firecrawl_extracted_svg.txt', 'utf8');
const svgMatch = svgRaw.match(/<svg class="size-28[^>]*>.*?<\/svg>/is);

if (!svgMatch) {
  console.log('SVG not found in extracted text');
  process.exit(1);
}

let svgToInject = svgMatch[0];
svgToInject = svgToInject.replace(/height="600"/, '');
svgToInject = svgToInject.replace(/width="600"/, '');
svgToInject = svgToInject.replace(/class="size-28 -top-2 relative"/, 'className="relative -top-[2px] block w-[28px] h-[28px]"');
svgToInject = svgToInject.replace(/fill="var\(--heat-100\)"/g, 'fill="#FFD700"');
svgToInject = svgToInject.replace(/fill="var\(--background-base\)"/g, 'fill="#000000"');

// React needs camelCase attributes for SVG
svgToInject = svgToInject.replace(/fill-opacity/g, 'fillOpacity');
svgToInject = svgToInject.replace(/fill-rule/g, 'fillRule');
svgToInject = svgToInject.replace(/attributeName/g, 'attributeName');
svgToInject = svgToInject.replace(/attributeType/g, 'attributeType');
svgToInject = svgToInject.replace(/calcMode/g, 'calcMode');
svgToInject = svgToInject.replace(/repeatCount/g, 'repeatCount');

// Replace the <img> tag in Navbar.tsx
const imgRegex = /<img\s+src="\/assets\/files\/brand\/jobflix-brand\/jobflix-icon\.svg"\s+alt="JobFlix Icon"\s+style=\{\{\s*width:\s*'28px',\s*height:\s*'28px'\s*\}\}\s+className="relative -top-\[2px\] block"\s*\/>/is;

if (!imgRegex.test(navbar)) {
  console.log('Target img tag not found in Navbar.tsx');
  process.exit(1);
}

navbar = navbar.replace(imgRegex, svgToInject);
fs.writeFileSync('src/components/Navbar.tsx', navbar);
console.log('Successfully injected exact Firecrawl animated SVG into Navbar!');
