const fs = require('fs');
let content = fs.readFileSync('src/components/GuidePage.jsx', 'utf8');

// Replace the inner container class
content = content.replace(
  /className="w-full max-w-4xl max-h-\[90vh\] bg-surface rounded-2xl md:rounded-3xl shadow-2xl flex flex-col relative overflow-hidden transform transition-all"/g,
  'className="w-full max-w-5xl bg-white md:shadow-2xl flex flex-col relative md:my-12 md:rounded-3xl"'
);

// We should also replace the top header sticky div so it looks good on mobile and desktop
// Let's make sure the scrollable body doesn't have overflow-hidden.
content = content.replace(/className="flex-1 p-6 md:p-10 space-y-12 bg-white"/g, 'className="flex-1 p-6 md:p-10 space-y-12 bg-white md:rounded-b-3xl"');
content = content.replace(/className="sticky top-0 z-10 bg-white\/95 backdrop-blur-md px-6 py-4 md:px-8 md:py-6 border-b border-whisper flex justify-between items-center shadow-sm"/g, 'className="sticky top-0 z-10 bg-white/95 backdrop-blur-md px-6 py-4 md:px-8 md:py-6 border-b border-whisper flex justify-between items-center shadow-sm md:rounded-t-3xl"');

fs.writeFileSync('src/components/GuidePage.jsx', content);
