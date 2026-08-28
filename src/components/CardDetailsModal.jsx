import { useEffect, useState } from 'react';
import { cardDetailsData } from '../data/cardDetails';


const splitRegex = /(\d+(?:\.\d+)*\s*VND[^\s,.]*|\d+\s*triệu(?:\s*đồng)?|\d+(?:[.,]\d+)?%|miễn phí)/gi;

const formatText = (text) => {
  const numberPrefixMatch = text.match(/^(\d+\.)\s+(.*)/);
  if (numberPrefixMatch) {
    return (
      <>
        <span className="font-bold text-ink mr-1">{numberPrefixMatch[1]}</span>
        {formatText(numberPrefixMatch[2])}
      </>
    );
  }

  let beforeColon = '';
  let restText = text;
  const colonIndex = text.indexOf(':');
  if (colonIndex !== -1 && colonIndex < 80) {
    beforeColon = text.substring(0, colonIndex + 1);
    restText = text.substring(colonIndex + 1);
  }

  const parts = restText.split(splitRegex);

  return (
    <span className="leading-relaxed">
      {beforeColon && <strong className="font-bold text-ink mr-1">{beforeColon}</strong>}
      {parts.map((part, i) => {
        if (part.match(splitRegex)) {
          return (
            <span key={i} className="inline-block font-bold text-accent bg-accent/10 px-1.5 py-0.5 rounded text-sm mx-0.5 whitespace-nowrap shadow-sm">
              {part}
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
};

const getSectionIcon = (title) => {
  const t = title.toLowerCase();
  if (t.includes('phí') || t.includes('lãi')) {
    return (
      <svg className="w-6 h-6 text-accent mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  }
  if (t.includes('hạn mức')) {
    return (
      <svg className="w-6 h-6 text-accent mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    );
  }
  if (t.includes('ưu đãi')) {
    return (
      <svg className="w-6 h-6 text-accent mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
      </svg>
    );
  }
  if (t.includes('điều kiện')) {
    return (
      <svg className="w-6 h-6 text-accent mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  }
  return (
    <svg className="w-6 h-6 text-accent mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
};

export default function CardDetailsModal({ card, isOpen, onClose }) {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Trigger rotation 1 second after opening
      const timer = setTimeout(() => {
        setRotation(-360);
      }, 1000);
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
                <div key={index} className="bg-white p-5 rounded-xl border border-whisper shadow-sm hover:shadow-md transition-shadow duration-300">
                  <h3 className="text-lg font-display font-bold text-ink uppercase tracking-wide flex items-center border-b border-whisper/60 pb-3 mb-4">
                    {getSectionIcon(section.title)}
                    {section.title}
                  </h3>
                  <ul className="space-y-3">
                    {section.items.map((item, idx) => (
                      <li key={idx} className="font-body text-steel text-base flex items-start">
                        <svg className="w-5 h-5 text-accent/70 mr-3 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        <div className="flex-1">{formatText(item)}</div>
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
