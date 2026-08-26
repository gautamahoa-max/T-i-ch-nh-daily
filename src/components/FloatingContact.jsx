import { useState, useEffect, useRef } from 'react';

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const menuRef = useRef(null);

  // Check scroll position to show/hide
  useEffect(() => {
    const handleScroll = () => {
      // Show when user scrolls near the bottom of the page
      // e.g. within 300px of the bottom
      const isBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 300;
      setIsVisible(isBottom);
      
      // Auto-close panel if they scroll away
      if (!isBottom && isOpen) {
        setIsOpen(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  return (
    <div 
      ref={menuRef} 
      className={`fixed bottom-6 right-4 md:bottom-8 md:right-8 z-50 flex flex-col items-center gap-4 transition-all duration-500 ${
        isVisible ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-0 opacity-100 pointer-events-auto md:translate-y-10 md:opacity-0 md:pointer-events-none'
      }`}
    >
      
      {/* Expanded Panel (Vertical) */}
      <div 
        className={`bg-white/90 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-whisper rounded-full py-4 px-2 md:px-3 gap-5 flex flex-col items-center transition-all duration-300 origin-bottom ${
          isOpen ? 'scale-100 opacity-100' : 'scale-75 opacity-0 pointer-events-none absolute bottom-16'
        }`}
      >
        <div className="flex flex-col gap-4 items-center">
          {/* Zalo Button */}
          <a
            href="https://zalo.me/0988886447"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center hover:-translate-y-1 transition-transform duration-300 group relative"
            aria-label="Liên hệ Zalo"
          >
            <span className="absolute right-full mr-4 bg-ink text-white text-xs md:text-sm font-semibold py-1.5 px-3 rounded shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden md:block">
              Chat Zalo
            </span>
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg" 
              alt="Zalo" 
              className="w-9 h-9 md:w-11 md:h-11 object-contain drop-shadow-md"
            />
          </a>

          {/* Divider */}
          <div className="w-6 h-[1px] bg-whisper/80 rounded-full"></div>

          {/* Phone Button */}
          <a
            href="tel:0988886447"
            className="w-10 h-10 md:w-12 md:h-12 bg-accent rounded-full shadow-[0_4px_15px_rgba(33,184,136,0.4)] flex items-center justify-center hover:-translate-y-1 transition-transform duration-300 relative group"
            aria-label="Gọi điện thoại"
          >
            <span className="absolute right-full mr-4 bg-ink text-white text-xs md:text-sm font-semibold py-1.5 px-3 rounded shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden md:block">
              098.888.6447
            </span>
            
            {/* Ripple effect */}
            <div className="absolute inset-0 bg-accent rounded-full animate-ping opacity-60"></div>
            
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="currentColor" 
              className="w-5 h-5 md:w-6 md:h-6 text-white relative z-10"
            >
              <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>

      {/* Toggle Button (Full Circle) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-accent text-white w-12 h-12 md:w-14 md:h-14 rounded-full shadow-[0_8px_30px_rgba(33,184,136,0.3)] transition-all duration-300 flex items-center justify-center focus:outline-none z-10 ${isOpen ? 'rotate-90 bg-ink hover:bg-ink/90' : 'hover:bg-accent/90 hover:scale-105'}`}
        aria-label="Liên hệ"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <div className="animate-wiggle">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 md:w-6 md:h-6">
              <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </button>
    </div>
  );
}
