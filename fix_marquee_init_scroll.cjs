const fs = require('fs');
let content = fs.readFileSync('src/components/BankMarquee.jsx', 'utf8');

// First, remove the bad code from the isHovered useEffect
const badCode = `    // Start at the middle block so user can scroll left immediately
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth / 3;
    }`;
content = content.replace(badCode, "");

// Now add a one-time useEffect right before it
const oneTimeEffect = `  useEffect(() => {
    // Start at the middle block once on mount so user can scroll left immediately
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth / 3;
    }
  }, []);

  useEffect(() => {`;

content = content.replace("  useEffect(() => {", oneTimeEffect);

fs.writeFileSync('src/components/BankMarquee.jsx', content);
console.log('Fixed initial scroll bug');
