const fs = require('fs');
let content = fs.readFileSync('src/App.jsx', 'utf8');

if (!content.includes('import SplashScreen')) {
    content = content.replace("import Header from './components/Header';", "import Header from './components/Header';\nimport SplashScreen from './components/SplashScreen';");
    content = content.replace("<div className=\"font-sans text-ink bg-canvas min-h-screen\">", "<div className=\"font-sans text-ink bg-canvas min-h-screen\">\n      <SplashScreen />");
    fs.writeFileSync('src/App.jsx', content);
    console.log("App.jsx updated with SplashScreen.");
} else {
    console.log("SplashScreen already in App.jsx");
}
