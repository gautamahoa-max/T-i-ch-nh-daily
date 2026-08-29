const fs = require('fs');
let content = fs.readFileSync('src/components/BankMarquee.jsx', 'utf8');

// Add useEffect to imports
content = content.replace("import { useState, useRef } from 'react';", "import { useState, useRef, useEffect } from 'react';");

const oldComponent = `export default function BankMarquee() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth < 768 ? 200 : 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };`;

const newComponent = `export default function BankMarquee() {
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const scrollItems = [...banks, ...banks, ...banks]; // Triple the items for smooth infinite loop

  useEffect(() => {
    let animationFrameId;
    let lastTime = performance.now();

    const scrollLoop = (time) => {
      if (!isHovered && scrollRef.current) {
        const container = scrollRef.current;
        const deltaTime = time - lastTime;
        
        // Move 1 pixel every 16ms approx (60fps)
        if (deltaTime > 16) {
          container.scrollLeft += 1;
          lastTime = time;

          // If we scrolled past one full set of items, reset to beginning seamlessly
          // We assume half the scroll width is the safe reset point since we duplicated items
          if (container.scrollLeft >= container.scrollWidth / 3) {
            container.scrollLeft = 0;
          }
        }
      } else {
        lastTime = performance.now();
      }
      animationFrameId = requestAnimationFrame(scrollLoop);
    };

    animationFrameId = requestAnimationFrame(scrollLoop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth < 768 ? 200 : 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };`;

content = content.replace(oldComponent, newComponent);

// Change the map from banks.map to scrollItems.map
content = content.replace(/banks\.map\(\(bank, index\)/g, "scrollItems.map((bank, index)");

// Add onMouseEnter and onMouseLeave to the scroll container
const oldContainer = `<div 
          ref={scrollRef}
          className="flex overflow-x-auto no-scrollbar [&::-webkit-scrollbar]:hidden scroll-smooth snap-x snap-mandatory px-4 md:px-12 items-center"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >`;

const newContainer = `<div 
          ref={scrollRef}
          className="flex overflow-x-auto no-scrollbar [&::-webkit-scrollbar]:hidden scroll-smooth snap-x snap-mandatory px-4 md:px-12 items-center"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
        >`;

content = content.replace(oldContainer, newContainer);

fs.writeFileSync('src/components/BankMarquee.jsx', content);
console.log('Updated with auto-scroll JS logic');
