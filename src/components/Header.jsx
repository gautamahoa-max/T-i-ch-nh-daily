import { useState } from 'react';
import blogLogo from '../assets/images/blog_logo.png';

export default function Header() {
  
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleScrollToCards = (e) => {
    e.preventDefault();
    if (window.location.hash === '#/guide') {
      window.location.hash = '#/';
      setTimeout(() => {
        const el = document.getElementById('card-list');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      const el = document.getElementById('card-list');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isMobileMenuOpen ? 'bg-transparent border-transparent' : 'bg-surface/80 backdrop-blur-md border-b border-whisper'}`}>
        <div className="container mx-auto px-6 md:px-12 max-w-[1200px] h-20 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <a href="#/" className="transition-transform hover:scale-105 active:scale-95">
              <div className="relative p-[2px] rounded-full bg-gradient-to-r from-red-500 via-yellow-400 via-green-500 via-blue-500 to-purple-500 w-14 h-14 md:w-16 md:h-16 flex-shrink-0 shadow-sm">
                <div className="w-full h-full bg-white/20 backdrop-blur-md bg-gradient-to-br from-white/40 to-transparent shadow-[inset_0_4px_8px_rgba(255,255,255,0.6)] rounded-full flex items-center justify-center">
                  <img 
                    src={blogLogo} 
                    alt="Blog Logo" 
                    className="w-10 md:w-12 object-contain drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]"
                  />
                </div>
              </div>
            </a>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8 font-body font-semibold text-base text-ink">
              <a href="#/" onClick={handleScrollToCards} className="hover:text-accent transition-colors cursor-pointer">Hệ sinh thái thẻ</a>
              <a href="#/guide" className="hover:text-accent transition-colors cursor-pointer">Hướng dẫn mở</a>

            </nav>
          </div>
          
          {/* Mobile Right Icons */}
          <div className="md:hidden flex items-center gap-4 text-accent">
            {/* Hamburger Icon */}
            <button 
              aria-label="Menu"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
                </svg>
              ) : (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" x2="21" y1="12" y2="12"/><line x1="3" x2="21" y1="6" y2="6"/><line x1="3" x2="21" y1="18" y2="18"/>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Radial Menu Overlay */}
        <div 
          className="md:hidden fixed inset-0 z-40 transition-all duration-[800ms] bg-[#FFC107]"
          style={{
            transitionTimingFunction: 'cubic-bezier(0.85, 0, 0.15, 1)',
            clipPath: isMobileMenuOpen ? 'circle(150vh at calc(100% - 38px) 40px)' : 'circle(0px at calc(100% - 38px) 40px)',
            pointerEvents: isMobileMenuOpen ? 'auto' : 'none'
          }}
        >
          <div className="absolute top-[40px] right-[38px]">
            <a 
              href="#/" 
              onClick={handleScrollToCards}
              className="absolute right-0 top-0 origin-right font-display font-black text-4xl tracking-tight text-ink whitespace-nowrap hover:text-white transition-colors"
              style={{ transform: 'translateY(-50%) rotate(25deg) translateX(-120px)' }}
            >
              HỆ SINH THÁI
            </a>
            
            <a 
              href="#/guide" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute right-0 top-0 origin-right font-display font-black text-4xl tracking-tight text-ink whitespace-nowrap hover:text-white transition-colors"
              style={{ transform: 'translateY(-50%) rotate(60deg) translateX(-150px)' }}
            >
              HƯỚNG DẪN MỞ
            </a>
            
            <a 
              href="#footer" 
              onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'}); }}
              className="absolute right-0 top-0 origin-right font-display font-black text-2xl tracking-tight text-ink/70 whitespace-nowrap hover:text-white transition-colors"
              style={{ transform: 'translateY(-50%) rotate(85deg) translateX(-180px)' }}
            >
              LIÊN HỆ
            </a>
          </div>
          
          <div className="absolute bottom-8 right-8 font-mono text-sm font-bold text-ink/50 rotate-90 origin-bottom-right">
            OCB / MENU
          </div>
        </div>
      </header>
      
      

    </>
  )
}
