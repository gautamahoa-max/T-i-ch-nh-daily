import { useState } from 'react';

const PROVINCES = [
  "An Giang", "Bắc Ninh", "Cao Bằng", "Cà Mau", "Cần Thơ", 
  "Đà Nẵng", "Đắk Lắk", "Điện Biên", "Đồng Nai", "Đồng Tháp", 
  "Gia Lai", "Hà Nội", "Hà Tĩnh", "Hải Phòng", "Hồ Chí Minh", 
  "Huế", "Hưng Yên", "Khánh Hòa", "Lai Châu", "Lâm Đồng", 
  "Lạng Sơn", "Lào Cai", "Nghệ An", "Ninh Bình", "Phú Thọ", 
  "Quảng Ngãi", "Quảng Ninh", "Quảng Trị", "Sơn La", "Tây Ninh", 
  "Thái Nguyên", "Thanh Hóa", "Tuyên Quang", "Vĩnh Long"
];

const CARDS = [
  "OCB Installment", "OCB JCB Platinum", "OCB Mastercard Lifestyle",
  "OCB Mastercard Platinum", "OCB OMNI", "OCB Tiki Platinum",
  "OCB Visa Platinum", "OCB Visa Signature", "OCB Priority",
  "OCB Natural", "OCB Doctor", "OCB Teacher", "OCB Woman",
  "OCB Cash Back", "OCB Travel", "OCB Lộc Phát"
];

export default function ConsultationForm() {
  const [status, setStatus] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('submitting');
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    data['_captcha'] = 'false';

    fetch("https://formsubmit.co/ajax/Gautamahoa@gmail.com", {
      method: "POST",
      headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      setStatus('success');
      e.target.reset();
      
      // Reset after 5 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    })
    .catch(error => {
      console.log(error);
      setStatus('error');
      
      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    });
  };

  return (
    <section className="mt-12 bg-white rounded-3xl border border-whisper shadow-sm p-8 md:p-10 relative overflow-hidden">
      <h3 className="text-2xl font-display font-bold text-ink mb-8">Đăng ký tư vấn mở thẻ online</h3>
      
      {status === 'success' && (
        <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-10 flex flex-col items-center justify-center animate-in fade-in duration-300">
          <div className="w-16 h-16 bg-[#0055FF]/10 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-[#0055FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
          </div>
          <h4 className="text-xl font-bold text-ink mb-2">Đăng ký thành công!</h4>
          <p className="text-steel text-center px-6">Cảm ơn bạn đã để lại thông tin. Chuyên viên tư vấn OCB sẽ sớm liên hệ với bạn.</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <input type="hidden" name="_subject" value="Đăng ký tư vấn mở thẻ mới từ Website" />
        <input type="hidden" name="_template" value="table" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

          <div className="bg-surface rounded-xl px-4 py-3 border border-transparent focus-within:border-accent focus-within:bg-white transition-colors relative">
            <label className="block text-xs font-bold text-steel mb-1 uppercase tracking-wide">
              Loại thẻ
            </label>
            <select 
              name="Loại thẻ"
              defaultValue=""
              className="w-full bg-transparent outline-none font-body text-ink appearance-none font-medium cursor-pointer"
            >
              <option value="" disabled hidden>Chọn loại thẻ</option>
              {CARDS.map(card => <option key={card} value={card}>{card}</option>)}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/4 pointer-events-none text-steel">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </div>
          </div>

          <div className="bg-surface rounded-xl px-4 py-3 border border-transparent focus-within:border-accent focus-within:bg-white transition-colors relative">
            <label className="block text-xs font-bold text-steel mb-1 uppercase tracking-wide">
              Khu vực
            </label>
            <select 
              name="Khu vực"
              defaultValue=""
              className="w-full bg-transparent outline-none font-body text-ink appearance-none font-medium cursor-pointer"
            >
              <option value="" disabled hidden>Chọn tỉnh/thành</option>
              {PROVINCES.map(prov => <option key={prov} value={prov}>{prov}</option>)}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/4 pointer-events-none text-steel">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </div>
          </div>

          <div className="bg-surface rounded-xl px-4 py-3 border border-transparent focus-within:border-accent focus-within:bg-white transition-colors relative">
            <label className="block text-xs font-bold text-steel mb-1 uppercase tracking-wide">
              Mức thu nhập
            </label>
            <select 
              name="Mức thu nhập"
              defaultValue=""
              className="w-full bg-transparent outline-none font-body text-ink appearance-none font-medium cursor-pointer"
            >
              <option value="" disabled hidden>Chọn mức thu nhập</option>
              <option value="5 - 10 triệu VNĐ/tháng">5 - 10 triệu VNĐ/tháng</option>
              <option value="10 - 35 triệu VNĐ/tháng">10 - 35 triệu VNĐ/tháng</option>
              <option value="Trên 35 triệu VNĐ/tháng">Trên 35 triệu VNĐ/tháng</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/4 pointer-events-none text-steel">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </div>
          </div>
        </div>

        <div className="pt-4 flex items-center gap-4">
          <button 
            type="submit" 
            disabled={status === 'submitting'}
            className="bg-[#0055FF] hover:bg-[#0044CC] text-white font-bold py-3 px-8 rounded-full flex items-center gap-2 transition-colors active:scale-95 transform-gpu disabled:opacity-70 disabled:active:scale-100"
          >
            {status === 'submitting' ? 'Đang gửi...' : 'Đăng ký'}
            {status !== 'submitting' && (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            )}
          </button>
          
          {status === 'error' && (
            <span className="text-red-500 font-medium text-sm">Có lỗi xảy ra, vui lòng thử lại!</span>
          )}
        </div>
      </form>
    </section>
  );
}
