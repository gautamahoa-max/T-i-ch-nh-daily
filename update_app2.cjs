const fs = require('fs');
let content = fs.readFileSync('src/App.jsx', 'utf8');

if (!content.includes('import SplashScreen')) {
    content = "import SplashScreen from './components/SplashScreen';\n" + content;
}

if (!content.includes('<SplashScreen />')) {
    content = content.replace(
        '<div className="min-h-screen flex flex-col bg-white relative overflow-x-hidden">', 
        '<div className="min-h-screen flex flex-col bg-white relative overflow-x-hidden">\n      <SplashScreen />'
    );
}

fs.writeFileSync('src/App.jsx', content);
console.log("App.jsx updated with SplashScreen.");
