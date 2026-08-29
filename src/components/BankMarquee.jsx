import { useState, useRef, useEffect } from 'react';
import { bankLogos } from '../assets/images/banks/index.js';

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
      <div className="group flex-shrink-0 flex items-center justify-center h-32 w-48 mx-2 rounded-2xl transition-all duration-300 hover:bg-white/60 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] cursor-pointer">
        <div className="flex items-center justify-center h-20 w-40 bg-white border border-gray-100 rounded-xl shadow-sm transition-transform duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] group-hover:scale-110">
          <span className="font-bold text-gray-700 text-sm text-center uppercase tracking-wider px-2">{bank.name}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="group flex-shrink-0 flex items-center justify-center h-32 w-48 mx-2 rounded-2xl transition-all duration-300 hover:bg-white/60 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] cursor-pointer">
      <div className="flex items-center justify-center h-20 w-40 bg-white border border-gray-100 rounded-xl shadow-sm p-3 transition-transform duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] group-hover:scale-110">
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

  useEffect(() => {
    // Start at the middle block once on mount so user can scroll left immediately
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth / 3;
    }
  }, []);

  useEffect(() => {
    let animationFrameId;
    let lastTime = performance.now();



    const scrollLoop = (time) => {
      if (scrollRef.current) {
        const container = scrollRef.current;
        const deltaTime = time - lastTime;
        
        if (!isHovered && time > pauseRef.current) {
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
    <section className="w-full py-16 bg-[#F6F4EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center flex flex-col items-center">
        <h2 className="text-3xl md:text-5xl font-extrabold text-[#006633] uppercase tracking-wide leading-tight">
          DANH SÁCH <br/> CÁC NGÂN HÀNG
        </h2>
        <h3 className="text-xl md:text-3xl font-bold text-[#9D7639] uppercase mt-3">
          MÀ OCB CHẤP NHẬN
        </h3>
        <div className="mt-4">
          <span className="inline-block bg-[#006633] text-white text-lg md:text-2xl font-bold uppercase py-2 px-10 rounded-full shadow-md">
            ĐỂ SANG THẺ
          </span>
        </div>
      </div>
      
      {/* Scroll container */}
      <div className="relative w-full py-6">
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto no-scrollbar [&::-webkit-scrollbar]:hidden px-4 md:px-12 items-center"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
        >
          {scrollItems.map((bank, index) => (
            <BankLogo key={index} bank={bank} />
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button 
          onClick={() => scroll('left')}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-[#006633] shadow-md hover:bg-[#006633] hover:text-white transition-colors"
          aria-label="Cuộn trái"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6"/>
          </svg>
        </button>
        <button 
          onClick={() => scroll('right')}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-[#006633] shadow-md hover:bg-[#006633] hover:text-white transition-colors"
          aria-label="Cuộn phải"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </button>
      </div>
    </section>
  );
}
