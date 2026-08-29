const fs = require('fs');
let content = fs.readFileSync('src/components/Header.jsx', 'utf8');

// Remove scrollToFAQ function
content = content.replace(/const scrollToFAQ = \(\) => {[\s\S]*?setIsMobileMenuOpen\(false\);\n  };\n/g, "");

// Remove desktop FAQ button
const desktopFAQBtn = `              <button 
                onClick={scrollToFAQ}
                className="hover:text-accent transition-colors cursor-pointer"
              >
                Câu hỏi thường gặp
              </button>`;
content = content.replace(desktopFAQBtn, "");

// Remove mobile FAQ button
const mobileFAQBtn = `            <button 
              onClick={scrollToFAQ}
              className="hover:text-accent transition-colors text-left block"
            >
              Câu hỏi thường gặp
            </button>`;
content = content.replace(mobileFAQBtn, "");

fs.writeFileSync('src/components/Header.jsx', content);
console.log('FAQ button removed from Header');
