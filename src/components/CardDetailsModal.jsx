import { useEffect, useState } from 'react';
import { cardDetailsData } from '../data/cardDetails';

export default function CardDetailsModal({ card, isOpen, onClose }) {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Trigger rotation 3 seconds after opening
      const timer = setTimeout(() => {
        setRotation(-360);
      }, 3000);
      return () => {
        document.body.style.overflow = 'unset';
        clearTimeout(timer);
        // Reset immediately without transition when closing
        setRotation(0);
      };
    } else {
      document.body.style.overflow = 'unset';
      setRotation(0);
    }
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
            <div className="w-full md:w-1/3 flex-shrink-0 flex flex-col items-center md:items-start gap-8">
              <div className="w-full flex justify-center" style={{ perspective: '1000px' }}>
                <img 
                  src={card.image} 
                  alt={card.name} 
                  className="w-48 md:w-full max-w-[280px] object-contain drop-shadow-2xl" 
                  style={{ 
                    clipPath: 'inset(4px round 16px)',
                    transform: `rotateY(${rotation}deg)`,
                    transition: rotation === 0 ? 'none' : 'transform 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    transformStyle: 'preserve-3d'
                  }}
                />
              </div>
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
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
