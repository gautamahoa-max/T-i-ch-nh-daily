const fs = require('fs');
let content = fs.readFileSync('src/components/Header.jsx', 'utf8');

const badBlock = `      <FAQModal 
        isOpen={isFAQOpen} 
        onClose={() => setIsFAQOpen(false)} 
      />`;

content = content.replace(badBlock, "");

fs.writeFileSync('src/components/Header.jsx', content);
console.log('Fixed Header');
