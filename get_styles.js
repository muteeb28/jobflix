const fs = require('fs');
const html = fs.readFileSync('firecrawl.html', 'utf8');
const styles = html.match(/<style[^>]*>.*?<\/style>/gs) || [];
const logoClass = html.match(/class="([^"]*?(?:logo|fire|flame)[^"]*?)"/ig) || [];
fs.writeFileSync('firecrawl_styles.txt', styles.join('\n') + '\n\n' + logoClass.join('\n'));
