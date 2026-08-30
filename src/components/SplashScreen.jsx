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
    <div 
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-white transition-opacity duration-1000 ease-in-out
        ${phase === 'fading' ? 'opacity-0 pointer-events-none' : 'opacity-100'}
      `}
    >
      {/* Light Burst Element - A bright glow behind/over the logo */}
      <div 
        className={`absolute transition-all duration-[800ms] ease-out rounded-full bg-white blur-3xl
          ${phase === 'visible' ? 'w-10 h-10 opacity-0' : 'w-[400px] h-[400px] md:w-[600px] md:h-[600px] opacity-100 scale-150'}
        `}
      ></div>

      {/* The Logo */}
      <img 
        src={blogLogo} 
        alt="Blog Customer Guidance" 
        className={`relative z-20 w-64 md:w-80 origin-center transition-all duration-[800ms] ease-out
          ${phase === 'visible' ? 'scale-100 opacity-100 brightness-100' : 'scale-125 opacity-0 brightness-200'}
        `}
      />
    </div>
  );
}
