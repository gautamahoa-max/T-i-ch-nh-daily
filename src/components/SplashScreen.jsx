import { useState, useEffect } from 'react';
import blogLogo from '../assets/images/blog_logo.png';

export default function SplashScreen() {
  const [phase, setPhase] = useState('visible'); 

  useEffect(() => {
    // Scroll to top immediately
    window.scrollTo(0, 0);
    
    // 1. Start the white light / fade effect
    const lightTimer = setTimeout(() => {
      setPhase('lighting');
    }, 1200);

    // 2. Fade entire splash screen away to reveal the site
    const fadeTimer = setTimeout(() => {
      setPhase('fading');
    }, 2000);

    // 3. Hide completely
    const hideTimer = setTimeout(() => {
      setPhase('hidden');
    }, 3000);

    return () => {
      clearTimeout(lightTimer);
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (phase === 'hidden') return null;

  return (
    <>
      <style>{`
        .white-light-glow {
          filter: brightness(10) drop-shadow(0 0 50px white);
          opacity: 0;
          transform: scale(1.15);
        }
      `}</style>
      <div 
        className={`fixed inset-0 z-[9999] flex items-center justify-center bg-white transition-opacity duration-1000 ease-in-out
          ${phase === 'fading' ? 'opacity-0 pointer-events-none' : 'opacity-100'}
        `}
      >
        <img 
          src={blogLogo} 
          alt="Blog Customer Guidance" 
          className={`relative z-20 w-64 md:w-80 origin-center transition-all duration-[800ms] ease-out
            ${phase === 'visible' ? 'scale-100 opacity-100 filter-none' : ''}
            ${(phase === 'lighting' || phase === 'fading') ? 'white-light-glow' : ''}
          `}
        />
      </div>
    </>
  );
}
