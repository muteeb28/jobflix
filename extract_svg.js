const fs = require('fs');
const html = fs.readFileSync('firecrawl.html', 'utf8');
const match = html.match(/<svg[^>]*>.*?<animate[^>]*>.*?<\/svg>/is);
if (match) {
  fs.writeFileSync('firecrawl_extracted_svg.txt', match[0]);
} else {
  fs.writeFileSync('firecrawl_extracted_svg.txt', 'Not found');
}
