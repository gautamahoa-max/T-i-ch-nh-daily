const fs = require('fs');
let content = fs.readFileSync('src/components/GuidePage.jsx', 'utf8');

// Replace the broken useEffect block
const brokenCode = `  // Prevent scrolling when modal is open
  useEffect(() => {
    
      
      // Reset video to first one when opened
      setActiveVideo(0);
     else {
      
    }
    return () => {
      
    };
  }, []);`;

content = content.replace(brokenCode, '');
fs.writeFileSync('src/components/GuidePage.jsx', content);
