const fs = require('fs');
let content = fs.readFileSync('src/components/BankMarquee.jsx', 'utf8');

const oldEffect = `    const scrollLoop = (time) => {
      if (!isHovered && scrollRef.current) {
        const container = scrollRef.current;
        const deltaTime = time - lastTime;
        
        // Move 1 pixel every 16ms approx (60fps)
        if (deltaTime > 16) {
          container.scrollLeft += 1;
          lastTime = time;

          // Infinite loop handling for both directions
          const oneBlockWidth = container.scrollWidth / 3;
          if (container.scrollLeft >= oneBlockWidth * 2) {
            container.scrollLeft -= oneBlockWidth;
          } else if (container.scrollLeft <= 0) {
            container.scrollLeft += oneBlockWidth;
          }
        }
      } else {
        lastTime = performance.now();
      }
      animationFrameId = requestAnimationFrame(scrollLoop);
    };`;

const newEffect = `    const scrollLoop = (time) => {
      if (scrollRef.current) {
        const container = scrollRef.current;
        const deltaTime = time - lastTime;
        
        if (!isHovered) {
          // Move 1 pixel every 16ms approx (60fps)
          if (deltaTime > 16) {
            container.scrollLeft += 1;
            lastTime = time;
          }
        } else {
          lastTime = performance.now();
        }

        // Always check boundaries for infinite loop (even during manual scroll)
        const oneBlockWidth = container.scrollWidth / 3;
        if (container.scrollLeft >= oneBlockWidth * 2) {
          container.scrollLeft -= oneBlockWidth;
        } else if (container.scrollLeft <= 0) {
          container.scrollLeft += oneBlockWidth;
        }
      }
      
      animationFrameId = requestAnimationFrame(scrollLoop);
    };`;

if (content.includes(oldEffect)) {
    content = content.replace(oldEffect, newEffect);
    fs.writeFileSync('src/components/BankMarquee.jsx', content);
    console.log('Fixed bounds checking');
} else {
    console.log('Could not find effect logic');
}
