import { useState } from 'react';
import imgLifestyle from '../assets/images/lifestyle.png';
import imgNatural from '../assets/images/natural.jpg';
import imgJcb from '../assets/images/jcb.png';
import imgWorld from '../assets/images/world.png';
import imgIgen from '../assets/images/igen.png';
import imgPlatinum from '../assets/images/platinum.png';
import CardDetailsModal from './CardDetailsModal';
import FloatingContact from './FloatingContact';

const cards = [
  {
    id: 1,
    name: "OCB Mastercard Lifestyle",
    description: "Định hình phong cách trẻ. Tối đa hóa hoàn tiền cho mọi giao dịch giải trí và du lịch.",
    image: imgLifestyle,
    metrics: "Dòng thẻ dành riêng cho giới trẻ",
    isHot: true
  },
  {
    id: 3,
    name: "OCB JCB Platinum",
    description: "Đặc quyền ẩm thực và sân bay. Mở khóa lối sống tinh hoa mang đậm phong vị Nhật Bản.",
    image: imgJcb,
    metrics: "Phòng chờ VIP"
  },
  {
    id: 4,
    name: "OCB MASTERCARD WORLD 2IN1",
    description: "Hợp nhất công năng. Nền tảng thẻ kép đột phá cho trải nghiệm tài chính không biên giới.",
    image: imgWorld,
    metrics: "THẺ TÍCH HỢP QUYỀN LỰC DÀNH CHO PHÂN KHÚC KHÁCH HÀNG CAO CẤP",
    isHot: true
  },
  {
    id: 5,
    name: "OCB IGEN Mastercard Platinum",
    description: "Tiên phong phong cách sống số. Hoàn tiền vượt trội khi mua sắm online qua Shopee, Tiktok Shop và Apple Pay.",
    image: imgIgen,
    metrics: "Dòng thẻ dành riêng cho tín đồ mua sắm"
  },
  {
    id: 6,
    name: "OCB MASTERCARD PLATINUM",
    description: "Khẳng định dấu ấn cá nhân. Đặc quyền hoàn tiền mua sắm công nghệ và làm đẹp đẳng cấp.",
    image: imgPlatinum,
    metrics: "Dòng thẻ dành riêng cho tín đồ công nghệ, làm đẹp",
    isHot: true
  },
  {
    id: 2,
    name: "OCB Natural Credit",
    description: "Lan tỏa lối sống xanh cùng thẻ nội địa. Miễn phí rút tiền mặt mọi ATM trên toàn quốc.",
    image: imgNatural,
    metrics: "Miễn phí khi rút tiền"
  }
];

export default function CardList() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (card, e) => {
    e.preventDefault();
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedCard(null), 300);
  };

  return (
    <>
      <section className="bg-surface py-24 md:py-32 relative overflow-x-clip">
        {/* Dock position for FloatingContact */}
        <div className="absolute top-24 md:top-32 right-0 left-0 h-0 pointer-events-none z-50">
          <FloatingContact />
        </div>
        <div className="container mx-auto px-6 md:px-12 max-w-[1200px]">
          <div className="mb-16 md:mb-24 md:max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Hệ sinh thái thẻ.</h2>
            <p className="font-body text-steel text-lg leading-relaxed">
              Mỗi tấm thẻ là một công cụ tài chính được thiết kế đo ni đóng giày cho từng phong cách sống. Lựa chọn đặc quyền của riêng bạn.
            </p>
          </div>
          
          {/* Asymmetric Zig-Zag Layout */}
          <div className="flex flex-col gap-20 md:gap-32">
            {cards.map((card, index) => {
              const isEven = index % 2 === 1;
              return (
                <div key={card.id} className={`flex flex-col ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-10 md:gap-20`}>
                  
                  {/* Image Block */}
                  <div className="w-full md:w-1/2 flex justify-center relative">
                    <div className="relative group perspective-1000">
                      <img 
                        src={card.image} 
                        alt={card.name} 
                        className="w-64 md:w-80 h-auto object-contain transform transition-transform duration-700 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] group-hover:scale-105 group-hover:rotate-y-6 group-hover:-rotate-x-6 relative z-10" 
                        style={{ clipPath: 'inset(4px round 16px)' }}
                      />
                      <div className="absolute inset-0 bg-black opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-10 -z-10 translate-y-10 scale-90"></div>
                    </div>
                  </div>

                  {/* Text Block */}
                  <div className="w-full md:w-1/2 flex flex-col items-start">
                    <div className="inline-block px-3 py-1 bg-canvas border border-whisper text-ink text-xs font-mono font-medium tracking-wider mb-6">
                      {card.metrics}
                    </div>
                    
                    <h3 className="text-3xl md:text-4xl font-display font-bold mb-4 flex items-center gap-3 flex-wrap leading-tight">
                      <span>{card.name.toUpperCase()}</span>
                      {card.isHot && (
                        <span className="inline-flex items-center justify-center px-2.5 py-1 bg-[#FF3B30] text-white text-xs md:text-sm font-bold rounded shadow-sm align-middle tracking-wider transform -translate-y-0.5 animate-pulse">
                          HOT
                        </span>
                      )}
                    </h3>
                    
                    <p className="font-body text-steel text-lg leading-relaxed mb-8 max-w-md mt-2">
                      {card.description}
                    </p>
                    <a 
                      href="#" 
                      onClick={(e) => handleOpenModal(card, e)}
                      className="font-body font-semibold text-accent hover:text-ink transition-colors duration-300 inline-flex items-center gap-2 group cursor-pointer"
                    >
                      Chi tiết thẻ
                      <svg className="w-4 h-4 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>

                </div>
              )
            })}
          </div>
        </div>
      </section>

      <CardDetailsModal 
        card={selectedCard} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </>
  )
}
