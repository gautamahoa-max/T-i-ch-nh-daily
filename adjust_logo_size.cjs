const fs = require('fs');

let headerContent = fs.readFileSync('src/components/Header.jsx', 'utf8');
headerContent = headerContent.replace('className="h-8"', 'className="h-12"');
fs.writeFileSync('src/components/Header.jsx', headerContent);

let footerContent = fs.readFileSync('src/components/Footer.jsx', 'utf8');
footerContent = footerContent.replace('className="h-8 mb-8"', 'className="h-16 mb-8"');
fs.writeFileSync('src/components/Footer.jsx', footerContent);

console.log("Logo size adjusted.");
