const fs = require('fs');
let content = fs.readFileSync('src/components/GuidePage.jsx', 'utf8');

// Remove isOpen from useEffects
content = content.replace(/if \(!isOpen[^\)]*\)\s*return[^;]*;/g, '');
content = content.replace(/if\s*\(isOpen\)\s*\{([\s\S]*?)\}/g, '$1');
content = content.replace(/,\s*\[isOpen\]\)/g, ', [])');

// Prevent body scroll logic should be removed completely since it's a full page
content = content.replace(/document\.body\.style\.overflow = 'hidden';/g, '');
content = content.replace(/document\.body\.style\.overflow = 'unset';/g, '');

fs.writeFileSync('src/components/GuidePage.jsx', content);
