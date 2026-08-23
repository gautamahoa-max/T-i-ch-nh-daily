import { useState } from 'react';
import GuideModal from './GuideModal';

export default function Header() {
  const [isGuideOpen, setIsGuideOpen] = useState(false);

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
        </div>
      </header>
      
      <GuideModal 
        isOpen={isGuideOpen} 
        onClose={() => setIsGuideOpen(false)} 
      />
    </>
  )
}
