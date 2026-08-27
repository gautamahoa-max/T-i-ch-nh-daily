import { useEffect } from 'react';
import { cardDetailsData } from '../data/cardDetails';

export default function CardDetailsModal({ card, isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !card) return null;

  const details = cardDetailsData[card.id];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-ink/80 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      ></div>
      
      {/* Modal Box */}
      <div className="relative bg-canvas w-full max-w-4xl max-h-full rounded-sm shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-whisper bg-surface">
          <h2 className="text-2xl font-display font-bold text-ink">{card.name.toUpperCase()}</h2>
          <button 
            onClick={onClose}
            className="p-2 text-steel hover:text-ink transition-colors bg-canvas hover:bg-whisper rounded-full"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Body */}
        <div className="p-6 md:p-10 overflow-y-auto">
          <div className="flex flex-col md:flex-row gap-10">
            {/* Left: Image preview */}
            <div className="w-full md:w-1/3 flex-shrink-0 flex justify-center items-start">
              <img 
                src={card.image} 
                alt={card.name} 
                className="w-48 md:w-full object-contain drop-shadow-2xl" 
                style={{ clipPath: 'inset(4px round 16px)' }}
              />
            </div>
            
            {/* Right: Content details */}
            <div className="w-full md:w-2/3 space-y-8">
              {details && details.sections.map((section, index) => (
                <div key={index} className="space-y-3">
                  <h3 className="text-lg font-display font-bold text-accent uppercase tracking-wide border-b border-whisper pb-2">
                    {section.title}
                  </h3>
                  <ul className="space-y-2">
                    {section.items.map((item, idx) => (
                      <li key={idx} className="font-body text-steel text-base flex items-start">
                        <span className="text-accent mr-2 mt-1 flex-shrink-0">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              {!details && (
                <p className="text-steel font-body">Nội dung chi tiết đang được cập nhật...</p>
              )}

              {/* Hướng dẫn sử dụng QR Code */}
              <div className="pt-4">
                <h3 className="text-lg font-display font-bold text-accent uppercase tracking-wide border-b border-whisper pb-2 mb-4">
                  Hướng dẫn sử dụng
                </h3>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-white border border-whisper p-1 rounded-lg shadow-sm flex-shrink-0">
                    <svg viewBox="0 0 100 100" className="w-full h-full text-ink">
                      <path fill="currentColor" d="M10 10h30v30H10V10zm5 5v20h20V15H15zm-5 45h30v30H10V60zm5 5v20h20V65H15zM60 10h30v30H60V10zm5 5v20h20V15H65zm15 45h10v10H80V65zM60 60h10v10H60V60zm0 20h10v10H60V80zm20-20h10v10H80V60zm-10 10h10v10H70V70zm10 10h10v10H80V80zM20 20h10v10H20V20zm50 0h10v10H70V20zm-50 50h10v10H20V70zM45 45h10v10H45V45z"/>
                      <path fill="currentColor" d="M45 10h10v10H45V10zm0 20h10v10H45V30zm-10 15h10v10H35V45zm20 0h10v10H55V45zm-20 20h10v10H35V65zm20 0h10v10H55V65z"/>
                    </svg>
                  </div>
                  <span className="font-body text-steel text-base">Trải nghiệm bằng AR</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
