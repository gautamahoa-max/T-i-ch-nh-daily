import { useState, useEffect, useRef } from 'react';

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

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
    <div ref={menuRef} className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end gap-3">
      
      {/* Expanded Buttons */}
      <div 
        className={`flex flex-col items-center gap-3 transition-all duration-300 origin-bottom ${
          isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-50 opacity-0 translate-y-8 pointer-events-none absolute bottom-full'
        }`}
      >
        {/* Zalo Button */}
        <a
          href="https://zalo.me/0988886447"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.15)] flex items-center justify-center hover:scale-110 transition-transform duration-300 border border-whisper group relative"
          aria-label="Liên hệ Zalo"
          onClick={() => setIsOpen(false)}
        >
          <span className="absolute right-full mr-3 md:mr-4 bg-ink text-white text-xs md:text-sm font-semibold py-1.5 px-3 rounded shadow-lg whitespace-nowrap opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
            Chat Zalo
          </span>
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg" 
            alt="Zalo" 
            className="w-7 h-7 md:w-8 md:h-8"
          />
        </a>

        {/* Phone Button */}
        <a
          href="tel:0988886447"
          className="w-12 h-12 md:w-14 md:h-14 bg-accent rounded-full shadow-[0_4px_20px_rgba(33,184,136,0.4)] flex items-center justify-center hover:scale-110 transition-transform duration-300 relative group"
          aria-label="Gọi điện thoại"
          onClick={() => setIsOpen(false)}
        >
          <span className="absolute right-full mr-3 md:mr-4 bg-ink text-white text-xs md:text-sm font-semibold py-1.5 px-3 rounded shadow-lg whitespace-nowrap opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
            098.888.6447
          </span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            className="w-5 h-5 md:w-6 md:h-6 text-white"
          >
            <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
          </svg>
        </a>
      </div>

      {/* Main Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 md:w-16 md:h-16 bg-accent text-white rounded-full shadow-[0_4px_20px_rgba(33,184,136,0.5)] flex items-center justify-center hover:scale-105 hover:shadow-[0_4px_25px_rgba(33,184,136,0.6)] transition-all duration-300 relative z-10"
        aria-label="Liên hệ"
      >
        {!isOpen && (
          <>
            <div className="absolute inset-0 bg-accent rounded-full animate-ping opacity-60"></div>
            <div className="absolute inset-0 bg-accent rounded-full animate-pulse opacity-40" style={{ animationDuration: '2s' }}></div>
          </>
        )}
        
        <div className={`transform transition-transform duration-300 ${isOpen ? 'rotate-90' : 'rotate-0 animate-wiggle'}`}>
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 md:h-8 md:w-8">
              <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
            </svg>
          )}
        </div>
      </button>
    </div>
  );
}
