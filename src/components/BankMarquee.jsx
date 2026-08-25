import { useState } from 'react';
import { bankLogos } from '../assets/images/banks/index.js';

const banks = [
  { name: 'MBBank' },
  { name: 'Techcombank' },
  { name: 'ACB' },
  { name: 'UOB' },
  { name: 'HSBC' },
  { name: 'Standard Chartered' },
  { name: 'BIDV' },
  { name: 'Vietcombank' },
  { name: 'Sacombank' },
  { name: 'VIB' },
  { name: 'Shinhan Bank' },
  { name: 'VietinBank' },
  { name: 'VPBank' },
  { name: 'TPBank' },
  { name: 'HDBank' },
  { name: 'MSB' },
  { name: 'Agribank' },
  { name: 'KBank' },
  { name: 'LPBank' },
  { name: 'Eximbank' },
  { name: 'Nam A Bank' },
  { name: 'SCB' },
  { name: 'SHB' },
  { name: 'ABBank' },
  { name: 'Vietbank' },
  { name: 'BaoViet Bank' },
  { name: 'Viet A Bank' },
  { name: 'PGBank' },
  { name: 'Indovina Bank' },
  { name: 'Vikki' }
];

const BankLogo = ({ bank }) => {
  const [imgError, setImgError] = useState(false);
  const localSrc = bankLogos[bank.name];

  if (imgError || !localSrc) {
    return (
      <div className="flex-shrink-0 flex items-center justify-center h-20 px-8 bg-white border border-gray-100 rounded-xl shadow-sm mx-3">
        <span className="font-bold text-gray-700 text-lg uppercase tracking-wider">{bank.name}</span>
      </div>
    );
  }

  return (
    <div className="flex-shrink-0 flex items-center justify-center h-20 w-40 bg-white border border-gray-100 rounded-xl shadow-sm mx-3 p-3 transition-transform hover:scale-105 cursor-default">
      <img
        src={localSrc}
        alt={bank.name}
        className="max-h-full max-w-full object-contain"
        onError={() => setImgError(true)}
        loading="lazy"
      />
    </div>
  );
};

export default function BankMarquee() {
  // Duplicate array for seamless infinite scroll
  const scrollItems = [...banks, ...banks];

  return (
    <section className="w-full py-16 bg-[#F6F4EB] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center flex flex-col items-center">
        <h2 className="text-3xl md:text-5xl font-extrabold text-[#006633] uppercase tracking-wide leading-tight">
          DANH SÁCH <br/> CÁC NGÂN HÀNG
        </h2>
        <h3 className="text-xl md:text-3xl font-bold text-[#9D7639] uppercase mt-3">
          MÀ OCB CHẤP NHẬN
        </h3>
        <div className="mt-4">
          <span className="inline-block bg-[#006633] text-white text-lg md:text-2xl font-bold uppercase py-2 px-10 rounded-full shadow-md">
            ĐỂ SANG THẺ
          </span>
        </div>
      </div>
      
      {/* Marquee container */}
      <div className="relative w-full flex overflow-x-hidden group py-6">
        <div className="animate-marquee flex whitespace-nowrap items-center group-hover:[animation-play-state:paused] hover:cursor-pointer">
          {scrollItems.map((bank, index) => (
            <BankLogo key={index} bank={bank} />
          ))}
        </div>
      </div>
    </section>
  );
}
