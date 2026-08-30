import { useState, useEffect } from 'react';
import blogLogo from '../assets/images/blog_logo.png';

export default function SplashScreen() {
  const [phase, setPhase] = useState('visible'); 

  useEffect(() => {
    // Scroll to top immediately when app loads to prevent jarring jump after splash
    window.scrollTo(0, 0);
    
    // Start zooming after 1.5s
    const zoomTimer = setTimeout(() => {
      setPhase('zooming');
    }, 1500);

    // Unmount after animation finishes (800ms duration)
    const hideTimer = setTimeout(() => {
      setPhase('hidden');
    }, 2300);

    return () => {
      clearTimeout(zoomTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (phase === 'hidden') return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-white transition-opacity duration-1000 ease-in-out
        ${phase === 'zooming' ? 'opacity-0 pointer-events-none' : 'opacity-100'}
      `}
    >
      <img 
        src={blogLogo} 
        alt="Blog Customer Guidance" 
        className={`w-64 md:w-80 transition-transform duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)]
          ${phase === 'zooming' ? 'scale-[4] opacity-0' : 'scale-100 opacity-100'}
        `}
      />
    </div>
  );
}
