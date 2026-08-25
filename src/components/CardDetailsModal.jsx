import { useEffect, useState } from 'react';
import { cardDetailsData } from '../data/cardDetails';
import { partnerOffers, cardNetworkMap } from '../data/partnerOffers';

// Simple SVG logos for the networks
const NetworkLogos = {
  mastercard: () => (
    <svg viewBox="0 0 100 60" className="h-10 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="35" cy="30" r="25" fill="#EB001B"/>
      <circle cx="65" cy="30" r="25" fill="#F79E1B"/>
      <path d="M50 51.2A24.9 24.9 0 0056.6 30a24.9 24.9 0 00-6.6-21.2 24.9 24.9 0 00-6.6 21.2c0 8.7 4.4 16.3 11.2 21.2z" fill="#FF5F00"/>
    </svg>
  ),
  jcb: () => (
    <svg viewBox="0 0 100 75" className="h-10 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 25.5C0 14.7 8.7 6 19.5 6H35v45H19.5C8.7 51 0 42.3 0 31.5v-6z" fill="#003D8F"/>
      <path d="M32 6h36v45H32V6z" fill="#E81C24"/>
      <path d="M65 6h15.5C91.3 6 100 14.7 100 25.5v6C100 42.3 91.3 51 80.5 51H65V6z" fill="#009944"/>
      <path d="M14.5 35.8c0 3.3 2 4.7 6 4.7 2.8 0 5-.7 6.2-1.3l.8 3.5c-1.7.7-4.5 1.2-8 1.2-6.5 0-10.2-2.7-10.2-8.3 0-5.8 4.2-9.2 10.5-9.2 3 0 5 .5 6.2 1l-.8 3.5c-1.3-.5-3-1-5.2-1-3.7 0-5.5 2-5.5 5.9z" fill="#FFF"/>
      <path d="M37.5 43.5V26.7h4.8v6.7c1.7-1.3 3.8-2 6.5-2 5.5 0 8.8 3.3 8.8 8.8v3.3h-4.8v-3c0-3.3-1.8-4.8-5-4.8-2.7 0-4.8 1.2-5.5 2.5v7.3h-4.8z" fill="#FFF"/>
      <path d="M62.5 43.5V26.7h4.8v6.7c1.7-1.3 3.8-2 6.5-2 5.5 0 8.8 3.3 8.8 8.8 0 5.5-3.3 8.8-8.8 8.8-2.7 0-4.8-.7-6.5-2v2h-4.8zm9.5-12c-3.2 0-5 1.5-5 4.8v3c0 3.3 1.8 4.8 5 4.8 3.2 0 5-1.5 5-4.8v-3c0-3.3-1.8-4.8-5-4.8z" fill="#FFF"/>
    </svg>
  ),
  napas: () => (
    <svg viewBox="0 0 100 40" className="h-10 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.5 9h5v22h-5V9zm12.5 0h6l9 12.5V9h5v22h-6L19 18.5V31h-4V9zm27.5 0h5l6 22h-5.5l-1-4.5h-5.5l-1 4.5H36l6.5-22zm4 13.5l-1.5-7.5-1.5 7.5H46.5zm9.5-13.5h7.5c4.5 0 7 2 7 6s-2.5 6-7 6h-3.5v10h-4V9zm4 8.5h3c1.5 0 2.5-.5 2.5-2s-1-2-2.5-2h-3v4zm15.5-8.5h5l6 22h-5.5l-1-4.5h-5.5l-1 4.5h-4l6.5-22zm4 13.5l-1.5-7.5-1.5 7.5h3zm12.5-10c-1-1-2.5-1.5-4-1.5-2.5 0-3.5.5-3.5 1.5s1 1.5 3 2c3 1 5.5 2 5.5 5.5 0 4-3 5.5-7 5.5-2.5 0-5-.5-6.5-2l2-3c1.5 1 3 1.5 4.5 1.5 2 0 3-.5 3-1.5s-1-1.5-3-2c-3-1-5.5-2-5.5-5.5 0-3.5 3-5.5 7-5.5 2 0 4 .5 5.5 1.5l-1.5 3z" fill="#005A9E"/>
      <path d="M90.5 5C90.5 7.5 88.5 9.5 86 9.5 83.5 9.5 81.5 7.5 81.5 5 81.5 2.5 83.5 0.5 86 0.5 88.5 0.5 90.5 2.5 90.5 5Z" fill="#E81C24"/>
      <path d="M83.5 35C83.5 37.5 81.5 39.5 79 39.5 76.5 39.5 74.5 37.5 74.5 35 74.5 32.5 76.5 30.5 79 30.5 81.5 30.5 83.5 32.5 83.5 35Z" fill="#F79E1B"/>
      <path d="M18.5 5C18.5 7.5 16.5 9.5 14 9.5 11.5 9.5 9.5 7.5 9.5 5 9.5 2.5 11.5 0.5 14 0.5 16.5 0.5 18.5 2.5 18.5 5Z" fill="#009944"/>
    </svg>
  )
};

export default function CardDetailsModal({ card, isOpen, onClose }) {
  const [showPartnerModal, setShowPartnerModal] = useState(false);
  const [partnerData, setPartnerData] = useState(null);

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
  const network = cardNetworkMap[card.id];
  
  const handlePartnerClick = () => {
    if (network && partnerOffers[network]) {
      setPartnerData(partnerOffers[network]);
      setShowPartnerModal(true);
    }
  };

  const closePartnerModal = (e) => {
    e.stopPropagation();
    setShowPartnerModal(false);
  };

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
          <h2 className="text-2xl font-display font-bold text-ink">{card.name}</h2>
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
        <div className="p-6 md:p-10 overflow-y-auto flex-1">
          <div className="flex flex-col md:flex-row gap-10">
            {/* Left: Image preview */}
            <div className="w-full md:w-1/3 flex-shrink-0 flex flex-col justify-start items-center gap-6">
              <img 
                src={card.image} 
                alt={card.name} 
                className="w-48 md:w-full object-contain drop-shadow-2xl" 
                style={{ clipPath: 'inset(4px round 16px)' }}
              />
              
              {/* Partner Logo */}
              {network && (
                <div 
                  className="w-full bg-surface border border-whisper p-4 rounded-xl flex flex-col items-center justify-center gap-3 cursor-pointer hover:shadow-md transition-shadow group"
                  onClick={handlePartnerClick}
                >
                  <p className="text-xs font-bold text-steel uppercase tracking-wider group-hover:text-accent transition-colors">Xem ưu đãi đối tác</p>
                  <div className="opacity-80 group-hover:opacity-100 transition-opacity">
                    {network === 'mastercard' && <NetworkLogos.mastercard />}
                    {network === 'jcb' && <NetworkLogos.jcb />}
                    {network === 'napas' && <NetworkLogos.napas />}
                  </div>
                </div>
              )}
            </div>
            
            {/* Right: Content details */}
            <div className="w-full md:w-2/3 space-y-8 pb-10">
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

      {/* Partner Offers Sub-Modal */}
      {showPartnerModal && partnerData && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 md:p-12">
          <div 
            className="absolute inset-0 bg-ink/60 backdrop-blur-sm transition-opacity duration-300"
            onClick={closePartnerModal}
          ></div>
          <div className="relative bg-canvas w-full max-w-2xl max-h-full rounded-sm shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom-10 duration-300">
            <div className="flex items-center justify-between px-6 py-4 border-b border-whisper bg-surface sticky top-0 z-10">
              <h2 className="text-xl font-display font-bold text-accent">{partnerData.title}</h2>
              <button 
                onClick={closePartnerModal}
                className="p-2 text-steel hover:text-ink transition-colors bg-canvas hover:bg-whisper rounded-full"
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6 md:p-8 overflow-y-auto">
              <p className="text-ink font-body mb-6 text-sm md:text-base leading-relaxed bg-surface p-4 rounded-lg border border-whisper">
                {partnerData.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {partnerData.offers.map((item, idx) => (
                  <div key={idx} className="border border-whisper p-4 rounded-lg hover:border-accent hover:shadow-sm transition-all bg-canvas">
                    <h4 className="font-bold text-ink mb-1">{item.name}</h4>
                    <p className="text-sm text-steel">{item.offer}</p>
                  </div>
                ))}
              </div>
              
              {partnerData.note && (
                <div className="mt-8 p-4 bg-accent/10 border-l-4 border-accent rounded-r-lg">
                  <p className="text-sm font-body text-ink">
                    <span className="font-bold text-accent">Lưu ý: </span>
                    {partnerData.note}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
