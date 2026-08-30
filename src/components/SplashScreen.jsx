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

    // 2. Start zooming into the screen
    const zoomTimer = setTimeout(() => {
      setPhase('zooming');
    }, 1500);

    // 3. Hide completely
    const hideTimer = setTimeout(() => {
      setPhase('hidden');
    }, 2400);

    return () => {
      clearTimeout(roarTimer);
      clearTimeout(zoomTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (phase === 'hidden') return null;

  return (
    <>
      <style>{`
        @keyframes roar {
          0% { transform: scale(1); filter: drop-shadow(0 0 0 rgba(212,175,55,0)); }
          15% { transform: scale(1.15) translateY(-5px); filter: drop-shadow(0 10px 20px rgba(212,175,55,0.4)); }
          30% { transform: scale(1.15) rotate(-3deg); filter: drop-shadow(0 10px 25px rgba(212,175,55,0.6)); }
          45% { transform: scale(1.15) rotate(3deg); filter: drop-shadow(0 10px 30px rgba(212,175,55,0.7)); }
          60% { transform: scale(1.15) rotate(-3deg); filter: drop-shadow(0 10px 25px rgba(212,175,55,0.6)); }
          75% { transform: scale(1.15) rotate(3deg); filter: drop-shadow(0 10px 20px rgba(212,175,55,0.4)); }
          90% { transform: scale(1.15) translateY(0) rotate(0deg); filter: drop-shadow(0 0 0 rgba(212,175,55,0)); }
          100% { transform: scale(1); }
        }
        .animate-roar {
          animation: roar 0.9s cubic-bezier(.36,.07,.19,.97) forwards;
        }
      `}</style>
      <div 
        className={`fixed inset-0 z-[9999] flex items-center justify-center bg-white transition-opacity duration-1000 ease-in-out
          ${phase === 'zooming' ? 'opacity-0 pointer-events-none' : 'opacity-100'}
        `}
      >
        <img 
          src={blogLogo} 
          alt="Blog Customer Guidance" 
          className={`w-64 md:w-80 origin-center
            ${phase === 'visible' ? 'scale-100 opacity-100' : ''}
            ${phase === 'roaring' ? 'animate-roar' : ''}
            ${phase === 'zooming' ? 'scale-[4] opacity-0 transition-transform duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)]' : ''}
          `}
        />
      </div>
    </>
  );
}
