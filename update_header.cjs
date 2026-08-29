const fs = require('fs');
let content = fs.readFileSync('src/components/Header.jsx', 'utf8');

// Remove FAQModal import and component
content = content.replace("import FAQModal from './FAQModal';\n", "");
content = content.replace(/<FAQModal[^>]*\/>/s, "");

// Remove isFAQOpen state
content = content.replace(/const \[isFAQOpen, setIsFAQOpen\] = useState\(false\);\n\s*/g, "");

// Add scrollToFAQ function
const scrollToFAQFn = `
  const scrollToFAQ = () => {
    if (window.location.hash === '#/guide') {
      window.location.hash = '#/';
      setTimeout(() => {
        document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };
`;

content = content.replace("export default function Header() {", "export default function Header() {" + scrollToFAQFn);

// Replace button onClick handlers
content = content.replace(/onClick=\{[^}]*setIsFAQOpen\(true\)[^}]*\}/g, "onClick={scrollToFAQ}");

fs.writeFileSync('src/components/Header.jsx', content);
console.log('Header updated');
