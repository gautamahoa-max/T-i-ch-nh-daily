import { useState, useEffect } from 'react';
import blogLogo from '../assets/images/blog_logo.png';

export default function SplashScreen() {
  const [phase, setPhase] = useState('visible'); 

  useEffect(() => {
    // Scroll to top immediately
    window.scrollTo(0, 0);
    
    // 1. Start roar animation after 600ms
    const roarTimer = setTimeout(() => {
      setPhase('roaring');
    }, 600);

    // 2. Start light explosion (white light radiates)
    const flashTimer = setTimeout(() => {
      setPhase('flashing');
    }, 1500);

    // 3. Fade entire splash screen away to reveal the site
    const fadeTimer = setTimeout(() => {
      setPhase('fading');
    }, 2200);

    // 4. Hide completely
    const hideTimer = setTimeout(() => {
      setPhase('hidden');
    }, 3000);

    return () => {
      clearTimeout(roarTimer);
      clearTimeout(flashTimer);
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (phase === 'hidden') return null;

  return (
    <>
      <style>{`
        @keyframes roar {
          0% { transform: scale(1); filter: drop-shadow(0 0 0 rgba(212,175,55,0)); }
          15% { transform: scale(1.15) translateY(-5px); filter: drop-shadow(0 0 30px rgba(212,175,55,0.6)); }
          30% { transform: scale(1.15) rotate(-3deg); filter: drop-shadow(0 0 40px rgba(212,175,55,0.8)); }
          45% { transform: scale(1.15) rotate(3deg); filter: drop-shadow(0 0 50px rgba(212,175,55,1)); }
          60% { transform: scale(1.15) rotate(-3deg); filter: drop-shadow(0 0 40px rgba(212,175,55,0.8)); }
          75% { transform: scale(1.15) rotate(3deg); filter: drop-shadow(0 0 30px rgba(212,175,55,0.6)); }
          90% { transform: scale(1.15) translateY(0) rotate(0deg); filter: drop-shadow(0 0 0 rgba(212,175,55,0)); }
          100% { transform: scale(1); }
        }
        .animate-roar {
          animation: roar 0.9s cubic-bezier(.36,.07,.19,.97) forwards;
        }
      `}</style>
      <div 
        className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#131b23] transition-opacity duration-700 ease-in-out
          ${phase === 'fading' ? 'opacity-0 pointer-events-none' : 'opacity-100'}
        `}
      >
        {/* The expanding white light */}
        <div 
          className={`absolute z-10 w-4 h-4 rounded-full bg-white blur-md transition-all duration-[800ms] ease-[cubic-bezier(0.85,0,0.15,1)]
            ${(phase === 'visible' || phase === 'roaring') ? 'scale-0 opacity-0' : ''}
            ${(phase === 'flashing' || phase === 'fading') ? 'scale-[200] md:scale-[350] opacity-100' : ''}
          `}
        ></div>

        {/* The Logo */}
        <img 
          src={blogLogo} 
          alt="Blog Customer Guidance" 
          className={`relative z-20 w-64 md:w-80 origin-center
            ${phase === 'visible' ? 'scale-100 opacity-100' : ''}
            ${phase === 'roaring' ? 'animate-roar' : ''}
            ${(phase === 'flashing' || phase === 'fading') ? 'scale-100 opacity-0 transition-opacity duration-300' : ''}
          `}
        />
      </div>
    </>
  );
}
