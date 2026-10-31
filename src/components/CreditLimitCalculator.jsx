import { useState, useEffect, useMemo } from 'react';
import ScrollReveal from './ScrollReveal';
import imgLifestyle from '../assets/images/lifestyle.png';
import imgNatural from '../assets/images/natural.jpg';
import imgWorld from '../assets/images/world.png';
import imgPlatinum from '../assets/images/platinum.png';
import { bankLogos } from '../assets/images/banks/index.js';

// Format currency in VND with non-breaking space before 'đ'
const formatVND = (val) => {
  return new Intl.NumberFormat('vi-VN').format(Math.round(val)) + '\u00A0đ';
};

const formatShortVND = (val) => {
  if (val >= 1000000000) {
    return (val / 1000000000).toFixed(1).replace('.0', '') + ' tỷ';
  }
  if (val >= 1000000) {
    return (val / 1000000).toFixed(0) + ' triệu';
  }
  return formatVND(val);
};

// Bank grouping according to OCB Policy (Decision 439.01 & 431.01)
const GROUP_1_BANKS = [
  "Vietcombank",
  "Techcombank",
  "ACB",
  "BIDV",
  "Sacombank",
  "MBBank",
  "MSB",
  "HSBC",
  "Standard Chartered",
  "UOB"
];

const GROUP_2_BANKS = [
  "VPBank",
  "VIB",
  "TPBank",
  "VietinBank",
  "Shinhan Bank",
  "HDBank",
  "Agribank",
  "KBank",
  "Indovina Bank"
];

const GROUP_3_BANKS = [
  "LPBank",
  "Eximbank",
  "Nam A Bank",
  "SHB",
  "ABBank",
  "Vikki",
  "Vietbank",
  "BaoViet Bank",
  "Viet A Bank",
  "PGBank",
  "SCB"
];

const ALL_BANKS = [
  ...GROUP_1_BANKS,
  ...GROUP_2_BANKS,
  ...GROUP_3_BANKS
];

export default function CreditLimitCalculator() {
  const [activeTab, setActiveTab] = useState('salary'); // 'salary' | 'card'

  // Tab 1: Salary inputs (always uses maximum x5 multiplier per user instruction)
  const [salary, setSalary] = useState(20000000);

  // Tab 2: Card-to-Card inputs
  const [selectedBank, setSelectedBank] = useState('Vietcombank');
  const [cardLimit, setCardLimit] = useState(60000000);
  const [hasBhxhOrGpkd, setHasBhxhOrGpkd] = useState(true);

  // Animated limit counter
  const [displayLimit, setDisplayLimit] = useState(0);

  // Calculate limit based on OCB regulations
  const calculationResult = useMemo(() => {
    if (activeTab === 'salary') {
      const multiplier = 5;
      const rawLimit = salary * multiplier;
      const finalLimit = Math.min(500000000, rawLimit);
      
      return {
        limit: finalLimit,
        multiplierLabel: `Tối đa x${multiplier} lần lương`,
        detailNote: 'Hạn mức tối đa lên tới 5 lần lương chuyển khoản (tối đa 500 triệu VNĐ)',
        method: 'Lương chuyển khoản (Tối đa x5)'
      };
    } else {
      // Card-to-card
      let baseRate = 0.6;
      let maxCap = 200000000;
      let groupName = 'Nhóm 3 (Tỷ lệ 60%)';

      if (GROUP_1_BANKS.includes(selectedBank)) {
        baseRate = 1.0;
        maxCap = 500000000;
        groupName = 'Nhóm 1 (Tỷ lệ 100%)';
      } else if (GROUP_2_BANKS.includes(selectedBank)) {
        baseRate = 0.8;
        maxCap = 200000000;
        groupName = 'Nhóm 2 (Tỷ lệ 80%)';
      } else {
        baseRate = 0.6;
        maxCap = 200000000;
        groupName = 'Nhóm 3 (Tỷ lệ 60%)';
      }

      const bonusRate = hasBhxhOrGpkd ? 0.2 : 0;
      const totalRate = baseRate + bonusRate;
      const calculatedAmount = cardLimit * totalRate;
      const finalLimit = Math.min(maxCap, calculatedAmount);

      return {
        limit: finalLimit,
        multiplierLabel: `${Math.round(totalRate * 100)}% hạn mức cũ`,
        detailNote: `${groupName}${hasBhxhOrGpkd ? ' + Thưởng 20% BHXH/ĐKKD' : ''}`,
        method: `Sang ngang thẻ ${selectedBank}`
      };
    }
  }, [activeTab, salary, selectedBank, cardLimit, hasBhxhOrGpkd]);

  // Card recommendation logic
  const recommendedCard = useMemo(() => {
    const limit = calculationResult.limit;
    if (limit >= 200000000) {
      return {
        id: 4,
        name: "OCB Mastercard World 2in1",
        tier: "World Elite • Khách hàng Cao cấp",
        badge: "Đặc quyền Thượng lưu",
        image: imgWorld,
        benefits: [
          "Tặng lượt vào phòng chờ thương gia sân bay (VIP Lounge)",
          "Hoàn tiền 10% chi tiêu ẩm thực cao cấp, 5% du lịch",
          "Tích hợp thẻ kép Tín dụng & Ghi nợ trên cùng 1 chip vật lý",
          "Phí chuyển đổi ngoại tệ ưu đãi vượt trội chỉ 0,9%"
        ]
      };
    } else if (limit >= 100000000) {
      return {
        id: 6,
        name: "OCB Mastercard Platinum",
        tier: "Platinum • Đẳng cấp Bạch Kim",
        badge: "Tối ưu Công nghệ & Làm đẹp",
        image: imgPlatinum,
        benefits: [
          "Hoàn 15% mua sắm công nghệ tại TGDĐ, FPT, CellphoneS...",
          "Hoàn 15% chi tiêu chăm sóc sắc đẹp, Spa, Gym, thời trang",
          "Hoàn 100% phí thường niên năm đầu khi chi tiêu từ 3 triệu",
          "Miễn lãi tối đa lên tới 55 ngày"
        ]
      };
    } else if (limit >= 30000000) {
      return {
        id: 1,
        name: "OCB Mastercard Lifestyle",
        tier: "Lifestyle • Phong cách Trẻ",
        badge: "Được yêu thích nhất",
        image: imgLifestyle,
        benefits: [
          "Hoàn đến 15% dịch vụ giải trí (Netflix, Spotify, CGV, Youtube...)",
          "Hoàn đến 7% chi tiêu mua sắm, ẩm thực và làm đẹp",
          "Hoàn 100% phí thường niên năm đầu khi chi tiêu 1 triệu",
          "Hoàn tiền tối đa lên đến 18.000.000 VNĐ/năm"
        ]
      };
    } else {
      return {
        id: 2,
        name: "OCB Natural Credit",
        tier: "Natural • Thẻ Nội Địa Tiện Ích",
        badge: "Miễn phí Rút tiền",
        image: imgNatural,
        benefits: [
          "Miễn 100% phí rút tiền mặt tại mọi cây ATM trên toàn quốc",
          "Miễn phí phát hành và miễn phí thường niên năm đầu tiên",
          "Thủ tục phê duyệt cấp thẻ đơn giản, nhanh chóng",
          "Ưu đãi giảm giá tại chuỗi đối tác liên kết NAPAS & OCB"
        ]
      };
    }
  }, [calculationResult.limit]);

  // Smooth animated counter effect
  useEffect(() => {
    const target = calculationResult.limit;
    const duration = 400; // ms
    const start = displayLimit;
    const startTime = performance.now();

    const updateNumber = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.round(start + (target - start) * ease);
      setDisplayLimit(current);

      if (progress < 1) {
        requestAnimationFrame(updateNumber);
      }
    };

    requestAnimationFrame(updateNumber);
  }, [calculationResult.limit]);

  // Action: Pre-fill into Consultation Form & Smooth scroll
  const handleApplyNow = () => {
    let incomeBracket = "10 - 35 triệu VNĐ/tháng";
    if (activeTab === 'salary') {
      if (salary < 10000000) incomeBracket = "5 - 10 triệu VNĐ/tháng";
      else if (salary <= 35000000) incomeBracket = "10 - 35 triệu VNĐ/tháng";
      else incomeBracket = "Trên 35 triệu VNĐ/tháng";
    } else {
      if (calculationResult.limit < 50000000) incomeBracket = "5 - 10 triệu VNĐ/tháng";
      else if (calculationResult.limit <= 150000000) incomeBracket = "10 - 35 triệu VNĐ/tháng";
      else incomeBracket = "Trên 35 triệu VNĐ/tháng";
    }

    const eventData = {
      cardName: recommendedCard.name,
      formattedLimit: formatVND(calculationResult.limit),
      incomeRange: incomeBracket,
      method: calculationResult.method
    };

    window.dispatchEvent(new CustomEvent('ocb-prefill-consultation', { detail: eventData }));

    // Scroll smoothly to consultation form
    const el = document.getElementById('consultation-form') || document.getElementById('consultation-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="calculator" className="bg-[#F8FAFC] py-20 md:py-28 relative overflow-hidden border-t border-whisper">
      {/* Decorative background glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#006633]/5 rounded-full blur-3xl pointer-events-none -z-0"></div>
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#0055FF]/5 rounded-full blur-3xl pointer-events-none -z-0"></div>

      <div className="container mx-auto px-6 md:px-12 max-w-[1200px] relative z-10">
        <ScrollReveal direction="up" delay={0}>
          <div className="text-center max-w-3xl mx-auto mb-14 md:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-[#006633] text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#006633] animate-pulse"></span>
              Công cụ thẩm định thông minh
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-black text-ink mb-4 tracking-tight">
              Tính hạn mức thẻ tín dụng OCB
            </h2>
            <p className="font-body text-steel text-base md:text-lg leading-relaxed">
              Dự tính chính xác hạn mức thẻ bạn có thể được cấp theo quy định thẩm định mới nhất của OCB. Kết quả minh bạch, tức thì và hoàn toàn miễn phí.
            </p>
          </div>
        </ScrollReveal>

        {/* Tab Selection */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 bg-slate-200/70 backdrop-blur rounded-2xl border border-slate-300/60 shadow-inner max-w-md w-full">
            <button
              type="button"
              onClick={() => setActiveTab('salary')}
              className={`flex-1 py-3 px-4 rounded-xl font-body font-bold text-sm md:text-base flex items-center justify-center gap-2.5 transition-all duration-300 ${
                activeTab === 'salary'
                  ? 'bg-white text-[#006633] shadow-md shadow-slate-300/50 scale-[1.02]'
                  : 'text-slate-600 hover:text-ink'
              }`}
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>Lương chuyển khoản</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('card')}
              className={`flex-1 py-3 px-4 rounded-xl font-body font-bold text-sm md:text-base flex items-center justify-center gap-2.5 transition-all duration-300 ${
                activeTab === 'card'
                  ? 'bg-white text-[#006633] shadow-md shadow-slate-300/50 scale-[1.02]'
                  : 'text-slate-600 hover:text-ink'
              }`}
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <span>Sang ngang thẻ khác</span>
            </button>
          </div>
        </div>

        {/* Main Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Input Controls (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm space-y-7">
            {activeTab === 'salary' ? (
              <>
                {/* Salary Input Block */}
                <div>
                  <div className="flex justify-between items-baseline gap-2 mb-3">
                    <label className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wide">
                      Mức lương chuyển khoản thực nhận:
                    </label>
                    <span className="text-xl sm:text-2xl md:text-3xl font-black text-[#006633] tracking-tight whitespace-nowrap flex-shrink-0">
                      {formatVND(salary)}
                    </span>
                  </div>

                  {/* Range Slider */}
                  <div className="relative pt-2 pb-1">
                    <input
                      type="range"
                      min={5000000}
                      max={100000000}
                      step={500000}
                      value={salary}
                      onChange={(e) => setSalary(Number(e.target.value))}
                      className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#006633] focus:outline-none"
                    />
                    <div className="flex justify-between text-xs text-slate-400 mt-2 font-medium">
                      <span>5 triệu</span>
                      <span>20 triệu</span>
                      <span>50 triệu</span>
                      <span>100 triệu</span>
                    </div>
                  </div>

                  {/* Quick Select Buttons */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {[7000000, 12000000, 18000000, 25000000, 35000000, 50000000, 70000000].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setSalary(val)}
                        className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all ${
                          salary === val
                            ? 'bg-[#006633] text-white border-[#006633]'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {formatShortVND(val)}
                      </button>
                    ))}
                  </div>
                </div>


              </>
            ) : (
              <>
                {/* Card-to-Card Input Block */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 uppercase tracking-wide mb-2">
                    Ngân hàng phát hành thẻ tín dụng hiện tại:
                  </label>
                  <div className="relative">
                    <select
                      value={selectedBank}
                      onChange={(e) => setSelectedBank(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-ink font-semibold text-base appearance-none focus:outline-none focus:border-[#006633] focus:bg-white transition-all cursor-pointer pl-12"
                    >
                      {ALL_BANKS.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>

                    {/* Bank Logo Preview inside select */}
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center w-7 h-7 bg-white rounded-md border border-slate-200 p-0.5">
                      {bankLogos[selectedBank] ? (
                        <img src={bankLogos[selectedBank]} alt={selectedBank} className="max-w-full max-h-full object-contain" />
                      ) : (
                        <span className="text-xs font-bold text-slate-500">🏦</span>
                      )}
                    </div>

                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m6 9 6 6 6-6"/></svg>
                    </div>
                  </div>


                </div>

                {/* Current Card Limit Slider */}
                <div className="pt-2 border-t border-slate-100">
                  <div className="flex justify-between items-baseline gap-2 mb-3">
                    <label className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wide">
                      Hạn mức thẻ tham chiếu hiện có:
                    </label>
                    <span className="text-xl sm:text-2xl md:text-3xl font-black text-[#006633] tracking-tight whitespace-nowrap flex-shrink-0">
                      {formatVND(cardLimit)}
                    </span>
                  </div>

                  <div className="relative pt-2 pb-1">
                    <input
                      type="range"
                      min={20000000}
                      max={200000000}
                      step={1000000}
                      value={cardLimit}
                      onChange={(e) => setCardLimit(Number(e.target.value))}
                      className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#006633] focus:outline-none"
                    />
                    <div className="flex justify-between text-xs text-slate-400 mt-2 font-medium">
                      <span>20 triệu</span>
                      <span>50 triệu</span>
                      <span>100 triệu</span>
                      <span>200 triệu+</span>
                    </div>
                  </div>

                  {/* Quick Select Buttons */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {[30000000, 50000000, 80000000, 100000000, 150000000, 200000000].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setCardLimit(val)}
                        className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all ${
                          cardLimit === val
                            ? 'bg-[#006633] text-white border-[#006633]'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {formatShortVND(val)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Additional Bonus Toggle */}
                <div className="pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50/70 to-teal-50/40 rounded-2xl border border-emerald-200/80">
                    <div className="pr-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-ink">Thưởng thêm +20% Hạn mức thẻ</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-600 text-white">
                          Cộng thêm
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">
                        Áp dụng nếu bạn có đóng Bảo hiểm xã hội hoặc có Giấy phép kinh doanh.
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                      <input
                        type="checkbox"
                        checked={hasBhxhOrGpkd}
                        onChange={(e) => setHasBhxhOrGpkd(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#006633]"></div>
                    </label>
                  </div>
                </div>
              </>
            )}


          </div>

          {/* RIGHT COLUMN: Live Result Card & Recommended Card (5 cols) */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="rounded-3xl bg-[#0B1B3D] text-white p-7 md:p-8 shadow-xl shadow-slate-900/10 border border-slate-800 relative overflow-hidden">
              
              {/* Subtle metallic lighting background */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

              {/* Header result */}
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-300">
                    Hạn mức OCB dự kiến
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#006633]/80 text-emerald-200 border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-ping"></span>
                    {calculationResult.multiplierLabel}
                  </span>
                </div>

                {/* Big Animated Currency */}
                <div className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight mb-6 whitespace-nowrap">
                  {formatVND(displayLimit)}
                </div>

                {/* Recommended Card Box */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 mb-6 relative group">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                      Dòng thẻ đề xuất tối ưu
                    </span>
                    <span className="text-[10px] font-semibold text-slate-300 bg-white/10 px-2 py-0.5 rounded">
                      {recommendedCard.badge}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-24 md:w-28 flex-shrink-0 relative group-hover:scale-105 transition-transform duration-300">
                      <img 
                        src={recommendedCard.image} 
                        alt={recommendedCard.name}
                        className="w-full h-auto object-contain drop-shadow-md rounded-lg"
                      />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-base md:text-lg text-white leading-snug">
                        {recommendedCard.name}
                      </h4>
                      <p className="text-xs text-slate-300 mt-1">
                        {recommendedCard.tier}
                      </p>
                    </div>
                  </div>

                  {/* Top privileges */}
                  <div className="space-y-1.5 pt-3 border-t border-white/10 text-xs text-slate-200">
                    {recommendedCard.benefits.map((b, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold mt-0.5">•</span>
                        <span className="leading-relaxed">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action CTA */}
                <button
                  type="button"
                  onClick={handleApplyNow}
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#008855] via-[#006633] to-[#0055FF] text-white font-display font-bold text-base md:text-lg flex items-center justify-center gap-3 shadow-lg shadow-emerald-900/40 hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer group"
                >
                  <span>Đăng ký nhận hạn mức này</span>
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>

                <p className="text-[11px] text-slate-400 text-center mt-3 leading-relaxed">
                  * Hạn mức thực tế sẽ được OCB phê duyệt chính thức căn cứ vào hồ sơ thẩm định và điểm tín dụng CIC của bạn.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
