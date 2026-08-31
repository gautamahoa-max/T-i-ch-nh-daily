const fs = require('fs');

const file = 'src/components/BankMarquee.jsx';
let content = fs.readFileSync(file, 'utf8');

// Update imports
content = content.replace(
  "import { useState, useRef, useEffect } from 'react';",
  "import { useState, useRef, useEffect, useCallback } from 'react';"
);

// We need to rewrite the whole BankMarquee component to inject the smooth scroll logic.
// I will just use regex to replace the useEffect containing the scrollLoop.

const scrollLoopStr = `
  const exactScrollLeft = useRef(0);
  const isDragging = useRef(false);

  useEffect(() => {
    // Start at the middle block once on mount so user can scroll left immediately
    if (scrollRef.current) {
      const startPos = scrollRef.current.scrollWidth / 3;
      scrollRef.current.scrollLeft = startPos;
      exactScrollLeft.current = startPos;
    }
  }, []);

  useEffect(() => {
    let animationFrameId;
    let lastTime = performance.now();

    const scrollLoop = (time) => {
      if (scrollRef.current) {
        const container = scrollRef.current;
        const deltaTime = time - lastTime;
        lastTime = time;
        
        // Sync exactScrollLeft if user manually scrolled (swipe or buttons)
        if (Math.abs(container.scrollLeft - exactScrollLeft.current) > 2) {
          exactScrollLeft.current = container.scrollLeft;
        }

        if (!isHovered && !isDragging.current && time > pauseRef.current) {
          // Speed: 0.04 pixels per millisecond (smooth on any Hz)
          const speed = 0.04;
          exactScrollLeft.current += speed * deltaTime;
          container.scrollLeft = exactScrollLeft.current;
        }

        // Always check boundaries for infinite loop
        const oneBlockWidth = container.scrollWidth / 3;
        if (container.scrollLeft >= oneBlockWidth * 2) {
          exactScrollLeft.current -= oneBlockWidth;
          container.scrollLeft = exactScrollLeft.current;
        } else if (container.scrollLeft <= 0) {
          exactScrollLeft.current += oneBlockWidth;
          container.scrollLeft = exactScrollLeft.current;
        }
      }
      
      animationFrameId = requestAnimationFrame(scrollLoop);
    };

    animationFrameId = requestAnimationFrame(scrollLoop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered]);`;

// Regex replacement for the two useEffects
content = content.replace(
  /useEffect\(\(\) => \{\s*\/\/\s*Start at the middle block[\s\S]*?\}, \[isHovered\]\);/,
  scrollLoopStr
);

// We also need to add onTouchStart/End to update isDragging so auto-scroll doesn't fight manual swipe.
content = content.replace(
  "onTouchStart={() => setIsHovered(true)}",
  "onTouchStart={() => { setIsHovered(true); isDragging.current = true; }}"
);
content = content.replace(
  "onTouchEnd={() => setIsHovered(false)}",
  "onTouchEnd={() => { setIsHovered(false); isDragging.current = false; }}"
);

fs.writeFileSync(file, content);
console.log("Marquee smooth scrolling updated.");
