const fs = require('fs');
let content = fs.readFileSync('src/components/Header.jsx', 'utf8');

content = content.replace(/<GuideModal[\s\S]*?\/>/g, '');

fs.writeFileSync('src/components/Header.jsx', content);
