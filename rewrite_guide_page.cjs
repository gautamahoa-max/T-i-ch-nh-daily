const fs = require('fs');
let content = fs.readFileSync('src/components/GuidePage.jsx', 'utf8');

// The new layout string to replace the old outer container up to {/* Scrollable Body */}
const newLayout = `  return (
    <div className="w-full bg-white flex flex-col pt-[80px]">
      
      {/* Breadcrumb / Title Area */}
      <div className="w-full bg-surface border-b border-whisper">
        <div className="container mx-auto max-w-[1200px] px-6 md:px-12 py-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 text-sm font-body text-steel mb-2">
              <a href="#/" className="hover:text-accent transition-colors">Trang chủ</a>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              <span className="text-ink font-semibold">Hướng dẫn mở thẻ</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-display font-bold text-ink">
              Hướng dẫn mở thẻ
            </h1>
          </div>
          <a 
            href="#/"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-steel hover:bg-accent hover:text-white transition-all shadow-sm border border-whisper font-semibold text-sm group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform">
              <path d="m15 18-6-6 6-6"/>
            </svg>
            Quay lại
          </a>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto max-w-[1200px] px-6 md:px-12 py-10 md:py-16 space-y-16">
`;

// Find where to inject
const returnIndex = content.indexOf('  return (');
const scrollableBodyIndex = content.indexOf('          {/* CÁCH 1 */}');

const beforeReturn = content.substring(0, returnIndex);
const afterScrollableBody = content.substring(scrollableBodyIndex);

// Reconstruct
const finalContent = beforeReturn + newLayout + afterScrollableBody;

// We also need to remove the closing divs from the old layout
// The old layout had 3 closing divs at the end of the file:
//         </div>
//       </div>
//     </div>
//   )
// }
// We only need 2 closing divs now (one for Main Content Area, one for w-full wrapper).

let trimmedContent = finalContent.replace(/<\/div>\n\s*<\/div>\n\s*<\/div>\n\s*\)\n\s*\}\s*$/g, '      </div>\n    </div>\n  )\n}');

fs.writeFileSync('src/components/GuidePage.jsx', trimmedContent);
