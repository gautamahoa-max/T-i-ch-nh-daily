const fs = require('fs');
let content = fs.readFileSync('src/components/Header.jsx', 'utf8');

const oldImport = `import { useState } from 'react';`;
const newImport = `import { useState } from 'react';`; // unchanged

const oldLinkDesktop = `<a href="#/" className="hover:text-accent transition-colors">Hệ sinh thái thẻ</a>`;
const newLinkDesktop = `<a href="#/" onClick={handleScrollToCards} className="hover:text-accent transition-colors cursor-pointer">Hệ sinh thái thẻ</a>`;

const oldLinkMobile = `<a 
              href="#/" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-accent transition-colors block"
            >
              Hệ sinh thái thẻ
            </a>`;
const newLinkMobile = `<a 
              href="#/" 
              onClick={handleScrollToCards}
              className="hover:text-accent transition-colors block cursor-pointer"
            >
              Hệ sinh thái thẻ
            </a>`;

const insertFunc = `  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleScrollToCards = (e) => {
    e.preventDefault();
    if (window.location.hash === '#/guide') {
      window.location.hash = '#/';
      setTimeout(() => {
        const el = document.getElementById('card-list');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      const el = document.getElementById('card-list');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };`;

content = content.replace(`  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);`, insertFunc);
content = content.replace(oldLinkDesktop, newLinkDesktop);
content = content.replace(oldLinkMobile, newLinkMobile);

fs.writeFileSync('src/components/Header.jsx', content);
console.log('Header updated to scroll to card-list');
