import { useState } from 'react';

const PROVINCES = [
  "TP Hồ Chí Minh", "Hà Nội", "Đà Nẵng", "Hải Phòng", "Cần Thơ", 
  "An Giang", "Bà Rịa - Vũng Tàu", "Bắc Giang", "Bắc Kạn", "Bạc Liêu", 
  "Bắc Ninh", "Bến Tre", "Bình Định", "Bình Dương", "Bình Phước", 
  "Bình Thuận", "Cà Mau", "Cao Bằng", "Đắk Lắk", "Đắk Nông", 
  "Điện Biên", "Đồng Nai", "Đồng Tháp", "Gia Lai", "Hà Giang", 
  "Hà Nam", "Hà Tĩnh", "Hải Dương", "Hậu Giang", "Hòa Bình", 
  "Hưng Yên", "Khánh Hòa", "Kiên Giang", "Kon Tum", "Lai Châu", 
  "Lâm Đồng", "Lạng Sơn", "Lào Cai", "Long An", "Nam Định", 
  "Nghệ An", "Ninh Bình", "Ninh Thuận", "Phú Thọ", "Phú Yên", 
  "Quảng Bình", "Quảng Nam", "Quảng Ngãi", "Quảng Ninh", "Quảng Trị", 
  "Sóc Trăng", "Sơn La", "Tây Ninh", "Thái Bình", "Thái Nguyên", 
  "Thanh Hóa", "Thừa Thiên Huế", "Tiền Giang", "Trà Vinh", "Tuyên Quang", 
  "Vĩnh Long", "Vĩnh Phúc", "Yên Bái"
];

const CARDS = [
  "OCB Installment", "OCB JCB Platinum", "OCB Mastercard Lifestyle",
  "OCB Mastercard Platinum", "OCB OMNI", "OCB Tiki Platinum",
  "OCB Visa Platinum", "OCB Visa Signature", "OCB Priority",
  "OCB Natural", "OCB Doctor", "OCB Teacher", "OCB Woman",
  "OCB Cash Back", "OCB Travel", "OCB Lộc Phát"
];

export default function ConsultationForm() {
  return (
    <section className="mt-12 bg-white rounded-3xl border border-whisper shadow-sm p-8 md:p-10">
      <h3 className="text-2xl font-display font-bold text-ink mb-8">Đăng ký tư vấn mở thẻ online</h3>
      
      <form action="https://formsubmit.co/Gautamahoa@gmail.com" method="POST" className="space-y-6">
        {/* Anti-spam and Config */}
        <input type="hidden" name="_subject" value="Đăng ký tư vấn mở thẻ mới từ Website" />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_template" value="table" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Họ và tên */}
          <div className="bg-surface rounded-xl px-4 py-3 border border-transparent focus-within:border-accent focus-within:bg-white transition-colors">
            <label className="block text-xs font-bold text-steel mb-1 uppercase tracking-wide">
              Họ và tên <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              name="Họ và tên"
              required 
              placeholder="Nguyễn Văn A" 
              className="w-full bg-transparent outline-none font-body text-ink placeholder-steel/50"
            />
          </div>

          {/* Số điện thoại */}
          <div className="bg-surface rounded-xl px-4 py-3 border border-transparent focus-within:border-accent focus-within:bg-white transition-colors">
            <label className="block text-xs font-bold text-steel mb-1 uppercase tracking-wide">
              Số điện thoại <span className="text-red-500">*</span>
            </label>
            <input 
              type="tel" 
              name="Số điện thoại"
              required 
              placeholder="0912345678" 
              className="w-full bg-transparent outline-none font-body text-ink placeholder-steel/50"
            />
          </div>

          {/* Email */}
          <div className="bg-surface rounded-xl px-4 py-3 border border-transparent focus-within:border-accent focus-within:bg-white transition-colors">
            <label className="block text-xs font-bold text-steel mb-1 uppercase tracking-wide">
              Email <span className="text-red-500">*</span>
            </label>
            <input 
              type="email" 
              name="Email"
              required 
              placeholder="nguyenvana@gmail.com" 
              className="w-full bg-transparent outline-none font-body text-ink placeholder-steel/50"
            />
          </div>

          {/* Loại thẻ */}
          <div className="bg-surface rounded-xl px-4 py-3 border border-transparent focus-within:border-accent focus-within:bg-white transition-colors relative">
            <label className="block text-xs font-bold text-steel mb-1 uppercase tracking-wide">
              Loại thẻ
            </label>
            <select 
              name="Loại thẻ"
              className="w-full bg-transparent outline-none font-body text-ink appearance-none font-medium cursor-pointer"
            >
              <option value="" disabled selected hidden>Chọn loại thẻ</option>
              {CARDS.map(card => <option key={card} value={card}>{card}</option>)}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/4 pointer-events-none text-steel">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </div>
          </div>

          {/* Khu vực */}
          <div className="bg-surface rounded-xl px-4 py-3 border border-transparent focus-within:border-accent focus-within:bg-white transition-colors relative">
            <label className="block text-xs font-bold text-steel mb-1 uppercase tracking-wide">
              Khu vực
            </label>
            <select 
              name="Khu vực"
              className="w-full bg-transparent outline-none font-body text-ink appearance-none font-medium cursor-pointer"
            >
              <option value="" disabled selected hidden>Chọn tỉnh/thành</option>
              {PROVINCES.map(prov => <option key={prov} value={prov}>{prov}</option>)}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/4 pointer-events-none text-steel">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </div>
          </div>

          {/* Mức thu nhập */}
          <div className="bg-surface rounded-xl px-4 py-3 border border-transparent focus-within:border-accent focus-within:bg-white transition-colors relative">
            <label className="block text-xs font-bold text-steel mb-1 uppercase tracking-wide">
              Mức thu nhập
            </label>
            <select 
              name="Mức thu nhập"
              className="w-full bg-transparent outline-none font-body text-ink appearance-none font-medium cursor-pointer"
            >
              <option value="" disabled selected hidden>Chọn mức thu nhập</option>
              <option value="5 - 10 triệu VNĐ/tháng">5 - 10 triệu VNĐ/tháng</option>
              <option value="10 - 35 triệu VNĐ/tháng">10 - 35 triệu VNĐ/tháng</option>
              <option value="Trên 35 triệu VNĐ/tháng">Trên 35 triệu VNĐ/tháng</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/4 pointer-events-none text-steel">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <button 
            type="submit" 
            className="bg-[#0055FF] hover:bg-[#0044CC] text-white font-bold py-3 px-8 rounded-full flex items-center gap-2 transition-colors active:scale-95 transform-gpu"
          >
            Đăng ký
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
      </form>
    </section>
  );
}
