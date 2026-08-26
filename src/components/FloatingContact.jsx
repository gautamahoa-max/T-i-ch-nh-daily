export default function FloatingContact() {
  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center bg-white/90 backdrop-blur-xl shadow-[-4px_4px_25px_rgba(0,0,0,0.08)] border border-whisper border-r-0 rounded-l-2xl py-4 px-2 md:px-3 gap-5 transition-transform duration-300">
      
      {/* Zalo Button */}
      <a
        href="https://zalo.me/0988886447"
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center hover:-translate-x-1 transition-transform duration-300 group relative"
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
        className="w-10 h-10 md:w-12 md:h-12 bg-accent rounded-full shadow-[0_4px_15px_rgba(33,184,136,0.4)] flex items-center justify-center hover:-translate-x-1 transition-transform duration-300 relative group"
        aria-label="Gọi điện thoại"
      >
        <span className="absolute right-full mr-4 bg-ink text-white text-xs md:text-sm font-semibold py-1.5 px-3 rounded shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden md:block">
          098.888.6447
        </span>
        
        {/* Ripple effect */}
        <div className="absolute inset-0 bg-accent rounded-full animate-ping opacity-60"></div>
        <div className="absolute inset-0 bg-accent rounded-full animate-pulse opacity-40" style={{ animationDuration: '2s' }}></div>
        
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="currentColor" 
          className="w-5 h-5 md:w-6 md:h-6 text-white relative z-10 animate-wiggle"
        >
          <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
        </svg>
      </a>
    </div>
  );
}
