const fs = require('fs');
let content = fs.readFileSync('src/components/BankMarquee.jsx', 'utf8');

const oldState = `  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);`;

const newState = `  const scrollRef = useRef(null);
  const pauseRef = useRef(0);
  const [isHovered, setIsHovered] = useState(false);`;

content = content.replace(oldState, newState);

const oldLoop = `        if (!isHovered) {
          // Move 1 pixel every 16ms approx (60fps)
          if (deltaTime > 16) {
            container.scrollLeft += 1;
            lastTime = time;
          }
        } else {
          lastTime = performance.now();
        }`;

const newLoop = `        if (!isHovered && time > pauseRef.current) {
          // Move 1 pixel every 16ms approx (60fps)
          if (deltaTime > 16) {
            container.scrollLeft += 1;
            lastTime = time;
          }
        } else {
          lastTime = performance.now();
        }`;

content = content.replace(oldLoop, newLoop);

const oldScroll = `  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth < 768 ? 200 : 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };`;

const newScroll = `  const scroll = (direction) => {
    if (scrollRef.current) {
      pauseRef.current = performance.now() + 600; // Pause auto-scroll for 600ms
      const scrollAmount = window.innerWidth < 768 ? 200 : 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };`;

content = content.replace(oldScroll, newScroll);

fs.writeFileSync('src/components/BankMarquee.jsx', content);
console.log('Fixed button scroll cancellation bug');
