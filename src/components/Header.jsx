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
          <div className={`md:hidden flex items-center gap-4 ${isMobileMenuOpen ? 'text-white' : 'text-accent'}`}>
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

        {/* Mobile Radial Menu Overlay (KOI Thé style) */}
        <div 
          className="md:hidden fixed inset-0 z-40 transition-all duration-[800ms] bg-[#FF5A00]"
          style={{
            transitionTimingFunction: 'cubic-bezier(0.85, 0, 0.15, 1)',
            clipPath: isMobileMenuOpen ? 'circle(150vh at calc(100% - 38px) 40px)' : 'circle(0px at calc(100% - 38px) 40px)',
            pointerEvents: isMobileMenuOpen ? 'auto' : 'none'
          }}
        >
          {/* Dark Close Button Corner */}
          <div className="absolute top-[-40px] right-[-40px] w-[140px] h-[140px] bg-[#1A1F24] rounded-full shadow-lg"></div>

          <div className="absolute inset-0 pointer-events-none">
            <a 
              href="#/" 
              onClick={handleScrollToCards}
              className="absolute pointer-events-auto origin-center font-display font-black text-[12vw] tracking-tighter text-ink whitespace-nowrap hover:text-white transition-colors"
              style={{ top: '12%', left: '22%', transform: 'rotate(-12deg)' }}
            >
              • TRANG CHỦ
            </a>
            
            <a 
              href="#/" 
              onClick={handleScrollToCards}
              className="absolute pointer-events-auto origin-center font-display font-black text-[12vw] tracking-tighter text-ink whitespace-nowrap hover:text-white transition-colors"
              style={{ top: '25%', left: '10%', transform: 'rotate(-28deg)' }}
            >
              HỆ SINH THÁI
            </a>
            
            <a 
              href="#/guide" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute pointer-events-auto origin-center font-display font-black text-[12vw] tracking-tighter text-ink whitespace-nowrap hover:text-white transition-colors"
              style={{ top: '45%', left: '25%', transform: 'rotate(-52deg)' }}
            >
              HƯỚNG DẪN MỞ
            </a>
            
            <a 
              href="#footer" 
              onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'}); }}
              className="absolute pointer-events-auto origin-center font-display font-black text-[12vw] tracking-tighter text-ink whitespace-nowrap hover:text-white transition-colors"
              style={{ top: '68%', left: '55%', transform: 'rotate(-78deg)' }}
            >
              LIÊN HỆ
            </a>

            {/* Copyright Curved Text */}
            <div 
              className="absolute font-mono font-semibold text-[3.5vw] text-ink/80 tracking-widest uppercase"
              style={{ top: '75%', left: '15%', transform: 'rotate(-35deg)' }}
            >
              © 2026 OCB ALL RIGHTS RESERVED.
            </div>
            
            {/* VN/EN translation toggle aesthetic */}
            <div 
              className="absolute font-display font-bold text-[5vw] text-ink"
              style={{ bottom: '8%', right: '15%', transform: 'rotate(-15deg)' }}
            >
              VN/EN
            </div>
          </div>
        </div>
      </header>
      
      

    </>
  )
}
