import { useState } from 'react';
import GuideModal from './GuideModal';

export default function Header() {
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-surface/80 backdrop-blur-md border-b border-whisper z-50 transition-all duration-300">
        <div className="container mx-auto px-6 md:px-12 max-w-[1200px] h-20 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <a href="/">
              <img 
                src="https://ocb.com.vn/assets/images/logo/ocb-logo-full.svg" 
                alt="OCB Logo" 
                className="h-8"
              />
            </a>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8 font-body font-semibold text-base text-ink">
              <a href="#" className="hover:text-accent transition-colors">Hệ sinh thái thẻ</a>
              <button 
                onClick={() => setIsGuideOpen(true)}
                className="hover:text-accent transition-colors cursor-pointer"
              >
                Hướng dẫn mở
              </button>
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

        {/* Mobile Dropdown Menu */}
        <div 
          className={`md:hidden absolute top-full left-0 right-0 bg-surface border-b border-whisper transition-all duration-300 ease-in-out overflow-hidden shadow-lg ${
            isMobileMenuOpen ? 'max-h-48 py-4 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-col px-6 gap-6 font-body font-semibold text-base text-ink">
            <a 
              href="#" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-accent transition-colors block"
            >
              Hệ sinh thái thẻ
            </a>
            <button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsGuideOpen(true);
              }}
              className="hover:text-accent transition-colors text-left block"
            >
              Hướng dẫn mở
            </button>
          </div>
        </div>
      </header>
      
      <GuideModal 
        isOpen={isGuideOpen} 
        onClose={() => setIsGuideOpen(false)} 
      />
    </>
  )
}
