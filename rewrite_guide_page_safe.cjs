const fs = require('fs');
let content = fs.readFileSync('src/components/GuidePage.jsx', 'utf8');

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
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto max-w-[1200px] px-6 md:px-12 py-10 md:py-16 space-y-16">
`;

// Find where GuidePage starts
const guidePageStart = content.indexOf('export default function GuidePage() {');
const returnIndex = content.indexOf('  return (', guidePageStart);
const scrollableBodyIndex = content.indexOf('          {/* CÁCH 1 */}');

const beforeReturn = content.substring(0, returnIndex);
const afterScrollableBody = content.substring(scrollableBodyIndex);

let finalContent = beforeReturn + newLayout + afterScrollableBody;

// Fix the closing tags at the bottom.
// We expect:
//         </div>
//       </div>
//     </div>
//   )
// }
// Or something similar. Let's just blindly replace the end.
finalContent = finalContent.replace(/<\/div>\n\s*<\/div>\n\s*<\/div>\n\s*\)\n\s*\}\s*$/g, '      </div>\n    </div>\n  )\n}');

fs.writeFileSync('src/components/GuidePage.jsx', finalContent);
