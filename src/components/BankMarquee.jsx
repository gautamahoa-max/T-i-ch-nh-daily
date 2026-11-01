import { useState, useRef, useEffect, useCallback } from 'react';
import { bankLogos } from '../assets/images/banks/index.js';
import ScrollReveal from './ScrollReveal';

const banks = [
  { name: 'MBBank' },
  { name: 'Techcombank' },
  { name: 'ACB' },
  { name: 'UOB' },
  { name: 'HSBC' },
  { name: 'Standard Chartered' },
  { name: 'BIDV' },
  { name: 'Vietcombank' },
  { name: 'Sacombank' },
  { name: 'VIB' },
  { name: 'Shinhan Bank' },
  { name: 'VietinBank' },
  { name: 'VPBank' },
  { name: 'TPBank' },
  { name: 'HDBank' },
  { name: 'MSB' },
  { name: 'Agribank' },
  { name: 'KBank' },
  { name: 'LPBank' },
  { name: 'Eximbank' },
  { name: 'Nam A Bank' },
  { name: 'SCB' },
  { name: 'SHB' },
  { name: 'ABBank' },
  { name: 'Vietbank' },
  { name: 'BaoViet Bank' },
  { name: 'Viet A Bank' },
  { name: 'PGBank' },
  { name: 'Indovina Bank' },
  { name: 'Vikki' }
];

const BankLogo = ({ bank }) => {
  const [imgError, setImgError] = useState(false);
  const localSrc = bankLogos[bank.name];

  if (imgError || !localSrc) {
    return (
      <div className="group flex-shrink-0 flex items-center justify-center h-20 w-36 md:w-44 mx-1.5 rounded-xl transition-all duration-300 hover:bg-white/60 cursor-pointer">
        <div className="flex items-center justify-center h-14 w-32 md:h-16 md:w-40 bg-white border border-gray-100 rounded-xl shadow-sm transition-transform duration-300 group-hover:scale-105">
          <span className="font-bold text-gray-700 text-xs md:text-sm text-center uppercase tracking-wider px-2">{bank.name}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="group flex-shrink-0 flex items-center justify-center h-20 w-36 md:w-44 mx-1.5 rounded-xl transition-all duration-300 hover:bg-white/60 cursor-pointer">
      <div className="flex items-center justify-center h-14 w-32 md:h-16 md:w-40 bg-white border border-gray-100 rounded-xl shadow-sm p-2.5 transition-transform duration-300 group-hover:scale-105">
        <img
          src={localSrc}
          alt={bank.name}
          className="max-h-full max-w-full object-contain"
          onError={() => setImgError(true)}
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default function BankMarquee() {
  const scrollRef = useRef(null);
  const pauseRef = useRef(0);
  const [isHovered, setIsHovered] = useState(false);
  const scrollItems = [...banks, ...banks, ...banks]; // Triple the items for smooth infinite loop

  
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
  }, [isHovered]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      pauseRef.current = performance.now() + 600; // Pause auto-scroll for 600ms
      const scrollAmount = window.innerWidth < 768 ? 200 : 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="w-full py-8 md:py-10 bg-[#F6F4EB]">
      <ScrollReveal direction="up" delay={0}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center flex flex-col items-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#006633] uppercase tracking-wide leading-tight">
            DANH SÁCH CÁC NGÂN HÀNG
          </h2>
          <h3 className="text-base md:text-xl font-bold text-[#9D7639] uppercase mt-1">
            MÀ OCB CHẤP NHẬN
          </h3>
          <div className="mt-2.5">
            <span className="inline-block bg-[#006633] text-white text-xs md:text-sm font-bold uppercase py-1 px-6 rounded-full shadow-sm">
              ĐỂ SANG THẺ
            </span>
          </div>
        </div>
      </ScrollReveal>
      
      {/* Scroll container */}
      <div className="relative w-full py-2">
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto no-scrollbar [&::-webkit-scrollbar]:hidden px-4 md:px-12 items-center"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => { setIsHovered(true); isDragging.current = true; }}
          onTouchEnd={() => { setIsHovered(false); isDragging.current = false; }}
        >
          {scrollItems.map((bank, index) => (
            <BankLogo key={index} bank={bank} />
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center items-center gap-3 mt-4 md:mt-5">
        <button 
          onClick={() => scroll('left')}
          className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full bg-white text-[#006633] shadow-sm hover:bg-[#006633] hover:text-white transition-colors"
          aria-label="Cuộn trái"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6"/>
          </svg>
        </button>
        <button 
          onClick={() => scroll('right')}
          className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full bg-white text-[#006633] shadow-sm hover:bg-[#006633] hover:text-white transition-colors"
          aria-label="Cuộn phải"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </button>
      </div>
    </section>
  );
}
