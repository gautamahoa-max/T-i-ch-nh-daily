const fs = require('fs');
let content = fs.readFileSync('src/components/GuidePage.jsx', 'utf8');

const searchBlock = `    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      {/* Modal Container */}
      <div 
        className="w-full max-w-5xl bg-white md:shadow-2xl flex flex-col relative md:my-12 md:rounded-3xl"
        
      >
        {/* Header (Sticky) */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md px-6 py-4 md:px-8 md:py-6 border-b border-whisper flex justify-between items-center shadow-sm md:rounded-t-3xl">
          <h2 className="text-xl md:text-3xl font-display font-bold text-ink flex items-center gap-3">
            HƯỚNG DẪN MỞ THẺ
          </h2>
          
          <a 
            href="#/"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface text-steel hover:bg-accent hover:text-white transition-colors border border-whisper font-semibold text-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Quay lại
          </a>

        </div>

        {/* Scrollable Body */}
        <div className="flex-1 p-6 md:p-10 space-y-12 bg-white md:rounded-b-3xl">`;

const replaceBlock = `    <div className="w-full bg-white flex flex-col pt-[80px]">
      
      {/* Breadcrumb / Title Area */}
      <div className="w-full bg-surface border-b border-whisper">
        <div className="container mx-auto max-w-[1200px] px-6 md:px-12 py-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 text-sm font-body text-steel mb-2">
              <a href="#/" className="hover:text-accent transition-colors">Trang chủ</a>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50 mx-1"><path d="m9 18 6-6-6-6"/></svg>
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
              <path d="M15 18-6-6 6-6"/>
            </svg>
            Quay lại
          </a>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto max-w-[1200px] px-6 md:px-12 py-10 md:py-16 space-y-16">`;

if (content.includes(searchBlock)) {
  content = content.replace(searchBlock, replaceBlock);
  content = content.replace(/<\/div>\s*<\/div>\s*<\/div>\s*\)\s*\}\s*$/g, '      </div>\n    </div>\n  )\n}');
  fs.writeFileSync('src/components/GuidePage.jsx', content);
  console.log("Replaced successfully");
} else {
  console.log("Could not find block to replace.");
}
