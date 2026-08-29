const fs = require('fs');
let content = fs.readFileSync('src/components/FAQSection.jsx', 'utf8');

const badEffect = `  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Reset open item when modal opens
      setOpenIndex(null);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);`;

content = content.replace(badEffect, "");
// Also remove useEffect import if not used anywhere else (but it's fine to leave it)

fs.writeFileSync('src/components/FAQSection.jsx', content);
console.log('Fixed');
