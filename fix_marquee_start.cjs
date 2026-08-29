const fs = require('fs');
let content = fs.readFileSync('src/components/BankMarquee.jsx', 'utf8');

const oldEffect = `  useEffect(() => {
    let animationFrameId;
    let lastTime = performance.now();

    const scrollLoop = (time) => {`;

const newEffect = `  useEffect(() => {
    let animationFrameId;
    let lastTime = performance.now();

    // Start at the middle block so user can scroll left immediately
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth / 3;
    }

    const scrollLoop = (time) => {`;

if (content.includes(oldEffect)) {
    content = content.replace(oldEffect, newEffect);
    fs.writeFileSync('src/components/BankMarquee.jsx', content);
    console.log('Fixed starting position');
} else {
    console.log('Could not find effect');
}
