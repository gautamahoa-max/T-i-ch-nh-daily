import { useState, useEffect } from 'react';
import blogLogo from '../assets/images/blog_logo.png';

export default function SplashScreen() {
  const [phase, setPhase] = useState(() => {
    return sessionStorage.getItem('splashShown') ? 'hidden' : 'visible';
  }); 

  useEffect(() => {
    if (sessionStorage.getItem('splashShown')) {
      return;
    }

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
      sessionStorage.setItem('splashShown', 'true');
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

      {/* The Logo Container */}
      <div 
        className={`relative z-20 transition-all duration-[800ms] ease-out p-[3px] rounded-full bg-gradient-to-r from-red-500 via-yellow-400 via-green-500 via-blue-500 to-purple-500 w-64 h-64 md:w-80 md:h-80 shadow-2xl
          ${phase === 'visible' ? 'scale-100 opacity-100' : 'scale-125 opacity-0 brightness-200'}
        `}
      >
        <div className="w-full h-full bg-ink rounded-full flex items-center justify-center">
          <img 
            src={blogLogo} 
            alt="Blog Customer Guidance" 
            className="w-48 md:w-64 object-contain"
          />
        </div>
      </div>
    </div>
  );
}
