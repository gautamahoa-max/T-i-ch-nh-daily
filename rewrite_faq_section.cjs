const fs = require('fs');
let content = fs.readFileSync('src/components/FAQSection.jsx', 'utf8');

// Replace "export default function FAQModal({ isOpen, onClose }) {"
// with "export default function FAQSection() {"
content = content.replace(/export default function FAQModal\([^)]*\) \{/, 'export default function FAQSection() {');

// Remove the early return for `!isOpen`
content = content.replace(/if \(!isOpen\) return null;/g, '');

// The render part of FAQModal currently looks like this:
const oldRender = `  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-ink/80 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      ></div>
      
      {/* Modal Box */}
      <div className="relative bg-canvas w-full max-w-4xl max-h-full rounded-sm shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-whisper bg-surface shrink-0">
          <h2 className="text-2xl font-display font-bold text-ink">Câu hỏi thường gặp</h2>
          <button 
            onClick={onClose}
            className="p-2 text-steel hover:text-ink transition-colors bg-canvas hover:bg-whisper rounded-full"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Body */}
        <div className="p-6 md:p-10 overflow-y-auto font-body">
          <div className="border border-whisper rounded-md overflow-hidden bg-surface">`;

const newRender = `  return (
    <section id="faq" className="w-full bg-canvas py-16 md:py-24 border-t border-whisper scroll-mt-20">
      <div className="container mx-auto px-6 md:px-12 max-w-[1200px] flex flex-col items-center">
        
        <h2 className="text-3xl md:text-5xl font-display font-bold text-ink mb-12 text-center">Câu hỏi thường gặp</h2>
        
        <div className="w-full max-w-4xl border border-whisper rounded-xl overflow-hidden bg-surface shadow-sm">`;

content = content.replace(oldRender, newRender);

// Replace the closing divs at the bottom
const oldClose = `        </div>
        
      </div>
    </div>
  );
}`;

const newClose = `      </div>
    </section>
  );
}`;

content = content.replace(oldClose, newClose);

fs.writeFileSync('src/components/FAQSection.jsx', content);
console.log('FAQSection created');
