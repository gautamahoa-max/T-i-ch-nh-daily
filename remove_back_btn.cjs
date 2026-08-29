const fs = require('fs');
let content = fs.readFileSync('src/components/GuidePage.jsx', 'utf8');

const searchBlock = `          </div>
          <a 
            href="#/"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-steel hover:bg-accent hover:text-white transition-all shadow-sm border border-whisper font-semibold text-sm group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform">
              <path d="M15 18-6-6 6-6"/>
            </svg>
            Quay lại
          </a>
        </div>`;

const replaceBlock = `          </div>
        </div>`;

if (content.includes(searchBlock)) {
  content = content.replace(searchBlock, replaceBlock);
  fs.writeFileSync('src/components/GuidePage.jsx', content);
  console.log('Removed successfully.');
} else {
  console.log('Block not found.');
}
