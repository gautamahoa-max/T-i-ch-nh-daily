import { useEffect } from 'react';
import videoSrc1 from '../assets/videos/huong_dan_mo.mov';
import videoSrc2 from '../assets/videos/huong_dan_mo_mc.mov';
import zaloQr from '../assets/images/zalo-qr.jpg';

export default function GuideModal({ isOpen, onClose }) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
      {/* Backdrop overlay */}
      <div 
        className="absolute inset-0 bg-ink/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-4xl bg-canvas rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-whisper bg-surface sticky top-0 z-10">
          <h2 className="font-display font-bold text-xl md:text-2xl text-ink">Hướng dẫn mở thẻ tín dụng</h2>
          <button 
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-canvas text-steel hover:bg-whisper hover:text-ink transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto flex-1 p-6 md:p-10 space-y-12 bg-white">
          
          {/* CÁCH 1 */}
          <section className="space-y-6">
            <h3 className="text-xl font-display font-bold text-accent border-l-4 border-accent pl-3 uppercase tracking-wide">CÁCH 1: MỞ THẺ ONLINE</h3>
            
            <div className="flex flex-col gap-10 mb-10 max-w-2xl mx-auto">
              {/* Video 1 */}
              <div>
                <h4 className="font-bold text-ink font-body mb-3">Hướng dẫn mở thẻ (Chung)</h4>
                <div className="rounded-xl overflow-hidden shadow-lg bg-black aspect-video border border-whisper">
                  <video 
                    controls 
                    className="w-full h-full object-contain"
                  >
                    <source src={videoSrc1} type="video/mp4" />
                    <source src={videoSrc1} type="video/quicktime" />
                    Trình duyệt không hỗ trợ thẻ video.
                  </video>
                </div>
              </div>

              {/* Video 2 */}
              <div>
                <h4 className="font-bold text-ink font-body mb-3">Hướng dẫn mở MC WORLD 2IN1</h4>
                <div className="rounded-xl overflow-hidden shadow-lg bg-black aspect-video border border-whisper">
                  <video 
                    controls 
                    className="w-full h-full object-contain"
                  >
                    <source src={videoSrc2} type="video/mp4" />
                    <source src={videoSrc2} type="video/quicktime" />
                    Trình duyệt không hỗ trợ thẻ video.
                  </video>
                </div>
              </div>
            </div>

            <div className="bg-surface p-6 rounded-xl border border-whisper">
              <h4 className="font-display font-bold text-lg text-ink mb-6">Các bước thực hiện</h4>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div>
                    <h5 className="font-bold text-ink">Đăng ký thông tin</h5>
                    <p className="text-steel font-body text-sm mt-1">Truy cập ứng dụng OCB OMNI hoặc website để điền thông tin cá nhân cơ bản.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div>
                    <h5 className="font-bold text-ink">Xác thực danh tính (eKYC)</h5>
                    <p className="text-steel font-body text-sm mt-1">Chụp ảnh 2 mặt CMND/CCCD và quét khuôn mặt theo hướng dẫn trên màn hình.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <div>
                    <h5 className="font-bold text-ink">Bổ sung hồ sơ tài chính</h5>
                    <p className="text-steel font-body text-sm mt-1">Cung cấp các giấy tờ chứng minh thu nhập hoặc xác thực qua VNeID để nhận hạn mức tín dụng tốt nhất.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-bold flex-shrink-0">4</div>
                  <div>
                    <h5 className="font-bold text-ink">Nhận thẻ và sử dụng</h5>
                    <p className="text-steel font-body text-sm mt-1">Hệ thống phê duyệt tự động trong vòng 15 phút. Bạn có thể sử dụng thẻ ảo ngay lập tức và nhận thẻ cứng tại nhà sau 3-5 ngày làm việc.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CÁCH 2 */}
          <section className="space-y-6">
            <h3 className="text-xl font-display font-bold text-accent border-l-4 border-accent pl-3 uppercase tracking-wide">CÁCH 2: LIÊN HỆ NHÂN VIÊN OCB</h3>
            <p className="font-body text-steel mb-4">Để được hỗ trợ tư vấn và làm hồ sơ mở thẻ tận nơi, vui lòng liên hệ chuyên viên tư vấn của OCB.</p>
            
            <div className="bg-surface border border-whisper rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 shadow-sm">
              <div className="flex-1 space-y-4 text-center md:text-left">
                <div>
                  <p className="text-sm text-steel uppercase tracking-widest font-bold mb-1">Chuyên viên tư vấn</p>
                  <p className="text-3xl font-display font-bold text-ink">Mr. Võ Văn Hoà</p>
                </div>
                
                <div className="space-y-2 mt-4">
                  <div className="flex items-center justify-center md:justify-start gap-3">
                    <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <a href="tel:0988886447" className="text-2xl font-body font-bold text-ink hover:text-accent transition-colors">098.888.6447</a>
                  </div>
                </div>
                <p className="text-sm text-steel mt-4 leading-relaxed">Quét mã QR Zalo bên cạnh để trao đổi trực tiếp hoặc kết bạn qua số điện thoại trên.</p>
              </div>
              
              <div className="flex-shrink-0 bg-white p-4 rounded-2xl border border-whisper shadow-md">
                <img src={zaloQr} alt="Zalo QR Code" className="w-48 h-48 object-cover rounded-lg" />
                <p className="text-center font-bold text-ink mt-3 text-sm">Quét mã Zalo</p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}
