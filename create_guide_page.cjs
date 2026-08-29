const fs = require('fs');
let modalContent = fs.readFileSync('src/components/GuideModal.jsx', 'utf8');

// Rename GuideModal to GuidePage
modalContent = modalContent.replace(/GuideModal/g, 'GuidePage');

// Remove isOpen and onClose props
modalContent = modalContent.replace('export default function GuidePage({ isOpen, onClose }) {', 'export default function GuidePage() {');

// Remove early return
modalContent = modalContent.replace('if (!isOpen) return null;', '');

// Change the outer fixed wrapper to a normal block
modalContent = modalContent.replace(/<div className="fixed inset-0[^>]*>/, '<div className="min-h-screen bg-gray-50 flex flex-col items-center">');

// Remove onClick={(e) => e.stopPropagation()}
modalContent = modalContent.replace('onClick={(e) => e.stopPropagation()}', '');

// Change the inner dialog wrapper to a container
const innerWrapperRegex = /<div\s+className="relative bg-white w-full max-w-5xl md:rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-\[90vh\]"[^>]*>/;
modalContent = modalContent.replace(innerWrapperRegex, '<div className="w-full max-w-5xl bg-white shadow-xl min-h-screen flex flex-col">');

// Change the close button to a "Back" button navigating to #/
const closeButtonRegex = /<button[^>]*onClick=\{onClose\}[^>]*>([\s\S]*?)<\/button>/;
modalContent = modalContent.replace(closeButtonRegex, `
          <a 
            href="#/"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface text-steel hover:bg-accent hover:text-white transition-colors border border-whisper font-semibold text-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Quay lại
          </a>
`);

// Adjust the scrollable body to take full height
modalContent = modalContent.replace('overflow-y-auto flex-1', 'flex-1');

// Save GuidePage.jsx
fs.writeFileSync('src/components/GuidePage.jsx', modalContent);

console.log("GuidePage.jsx created");
