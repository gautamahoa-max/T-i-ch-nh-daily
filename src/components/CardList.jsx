import { useState } from 'react';
import imgLifestyle from '../assets/images/lifestyle.png';
import imgNatural from '../assets/images/natural.jpg';
import imgJcb from '../assets/images/jcb.png';
import imgWorld from '../assets/images/world.png';
import imgIgen from '../assets/images/igen.png';
import CardDetailsModal from './CardDetailsModal';

const cards = [
  {
    id: 1,
    name: "Mastercard Lifestyle",
    description: "Định hình phong cách trẻ. Tối đa hóa hoàn tiền cho mọi giao dịch giải trí và du lịch.",
    image: imgLifestyle,
    metrics: "Hoàn tiền 15%"
  },
  {
    id: 2,
    name: "OCB Natural Credit",
    description: "Lan tỏa lối sống xanh cùng thẻ nội địa. Miễn phí rút tiền mặt mọi ATM trên toàn quốc.",
    image: imgNatural,
    metrics: "Miễn phí khi rút tiền"
  },
  {
    id: 3,
    name: "JCB Platinum",
    description: "Đặc quyền ẩm thực và sân bay. Mở khóa lối sống tinh hoa mang đậm phong vị Nhật Bản.",
    image: imgJcb,
    metrics: "Phòng chờ VIP"
  },
  {
    id: 4,
    name: "MASTERCARD WORLD 2IN1",
    description: "Hợp nhất công năng. Nền tảng thẻ kép đột phá cho trải nghiệm tài chính không biên giới.",
    image: imgWorld,
    metrics: "Thẻ 2-trong-1"
  },
  {
    id: 5,
    name: "IGEN Mastercard Platinum",
    description: "Tiên phong phong cách sống số. Hoàn tiền vượt trội khi mua sắm online qua Shopee, Tiktok Shop và Apple Pay.",
    image: imgIgen,
    metrics: "Hoàn tiền 12%"
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
      <section className="bg-surface py-24 md:py-32">
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
                  <div className="w-full md:w-1/2 flex justify-center">
                    <div className="relative group perspective-1000">
                      <img 
                        src={card.image} 
                        alt={card.name} 
                        className="w-64 md:w-80 h-auto object-contain transform transition-transform duration-700 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] group-hover:scale-105 group-hover:rotate-y-6 group-hover:-rotate-x-6" 
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
                    <h3 className="text-3xl md:text-4xl font-display font-bold mb-4">{card.name}</h3>
                    <p className="font-body text-steel text-lg leading-relaxed mb-8 max-w-md">
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
