const fs = require('fs');
let content = fs.readFileSync('src/App.jsx', 'utf8');

content = content.replace(
  '<div className="min-h-screen flex flex-col bg-gray-50 relative overflow-x-hidden">',
  '<div className="min-h-screen flex flex-col bg-gray-50 relative">'
);

fs.writeFileSync('src/App.jsx', content);
