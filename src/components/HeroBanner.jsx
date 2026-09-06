import { useState, useEffect, useRef } from 'react';
import banner1 from '../assets/images/banner1.png';
import banner2 from '../assets/images/banner2.png';
import banner3 from '../assets/images/banner3.png';
import banner4 from '../assets/images/banner4.png';

const banners = [
  { src: banner1, alt: 'OCB Mastercard World 2in1 - Đặc quyền không giới hạn' },
  { src: banner2, alt: 'Chung nhịp đập tự hào' },
  { src: banner3, alt: 'Giới thiệu mở thẻ - Mình nhận ting ting' },
  { src: banner4, alt: 'OCB cùng Apple Pay - Thanh toán dễ dàng, an toàn và riêng tư' },
];

export default function HeroBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  // Auto slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section className="w-full pt-[80px] bg-canvas overflow-hidden select-none">
      <div 
        className="w-full relative aspect-[2048/900] max-h-[600px] overflow-hidden bg-slate-100"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {banners.map((item, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
              index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <img 
              src={item.src} 
              alt={item.alt}
              className="w-full h-full object-cover object-center"
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
            />
          </div>
        ))}

        {/* Prev / Next Controls (Desktop & Mobile) */}
        <button
          onClick={handlePrev}
          aria-label="Previous Slide"
          className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-11 md:h-11 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-md text-white flex items-center justify-center transition-all opacity-60 hover:opacity-100 hover:scale-105 active:scale-95"
        >
          <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={handleNext}
          aria-label="Next Slide"
          className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-11 md:h-11 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-md text-white flex items-center justify-center transition-all opacity-60 hover:opacity-100 hover:scale-105 active:scale-95"
        >
          <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        
        {/* Pagination Indicators */}
        <div className="absolute bottom-2 md:bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 md:gap-2 bg-black/20 backdrop-blur-md px-2.5 py-1 md:px-3 md:py-1.5 rounded-full">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 md:h-2.5 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'w-5 md:w-8 bg-[#006633]' : 'w-1.5 md:w-2.5 bg-white/60 hover:bg-white'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
