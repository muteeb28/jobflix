fetch('https://www.firecrawl.dev/').then(r => r.text()).then(html => {
  require('fs').writeFileSync('firecrawl.html', html);
});
