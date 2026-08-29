const fs = require('fs');
let content = fs.readFileSync('src/components/Header.jsx', 'utf8');

// Remove import of GuideModal
content = content.replace(/import GuideModal from '.\/GuideModal';\n/g, '');
// Remove isGuideOpen state
content = content.replace(/const \[isGuideOpen, setIsGuideOpen\] = useState\(false\);\n/g, '');

// Replace button with Link for desktop
content = content.replace(
  /<button\s*onClick=\{[^}]*\}\s*className="hover:text-accent transition-colors cursor-pointer"\s*>\s*Hướng dẫn mở\s*<\/button>/g,
  '<a href="#/guide" className="hover:text-accent transition-colors cursor-pointer">Hướng dẫn mở</a>'
);

// Replace button with Link for mobile
const mobileBtnRegex = /<button\s*onClick=\{\(\) => \{\s*setIsMobileMenuOpen\(false\);\s*setIsGuideOpen\(true\);\s*\}\}\s*className="hover:text-accent transition-colors text-left block"\s*>\s*Hướng dẫn mở\s*<\/button>/g;
content = content.replace(mobileBtnRegex, '<a href="#/guide" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-accent transition-colors text-left block">Hướng dẫn mở</a>');

// Remove rendering of GuideModal
content = content.replace(/<GuideModal[^>]*\/>/g, '');

fs.writeFileSync('src/components/Header.jsx', content);
