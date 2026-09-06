import { useState, useEffect } from 'react';
import ScrollReveal from './ScrollReveal';
import banner1 from '../assets/images/banner1.png';
import banner2 from '../assets/images/banner2.png';
import banner3 from '../assets/images/banner3.png';
import banner4 from '../assets/images/banner4.png';

const banners = [banner1, banner2, banner3, banner4];

export default function HeroBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full pt-[80px] bg-canvas overflow-hidden">
      <div className="w-full relative h-[60vh] md:h-[calc(100vh-80px)]">
        <ScrollReveal direction="scale" delay={0} className="w-full h-full relative">
          {banners.map((img, index) => (
            <img 
              key={index}
              src={img} 
              alt={`OCB Credit Cards - Banner ${index + 1}`} 
              className={`absolute inset-0 w-full h-full object-cover object-center transform origin-center transition-opacity duration-1000 ease-in-out ${
                index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
              style={{ imageRendering: '-webkit-optimize-contrast' }}
            />
          ))}
          
          {/* Pagination Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'w-8 bg-accent' : 'w-2.5 bg-white/50 hover:bg-white/80 shadow-md'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
