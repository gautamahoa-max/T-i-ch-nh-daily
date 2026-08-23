import { useEffect } from 'react';
import videoSrc1 from '../assets/videos/huong_dan_mo.mov';
import videoSrc2 from '../assets/videos/huong_dan_mo_mc.mov';

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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop overlay */}
      <div 
        className="absolute inset-0 bg-surface/80 backdrop-blur-xl transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-whisper">
          <h2 className="font-display font-bold text-2xl text-ink">Hướng dẫn mở thẻ tín dụng</h2>
          <button 
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-canvas text-steel hover:bg-black hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto flex-1 p-8">
          
          <div className="flex flex-col gap-10 mb-10 max-w-2xl mx-auto">
            {/* Video 1 */}
            <div>
              <h3 className="font-display font-bold text-lg text-ink mb-3">Hướng dẫn mở thẻ (Chung)</h3>
              <div className="rounded-2xl overflow-hidden shadow-xl bg-black">
                <video 
                  controls 
                  className="w-full h-auto aspect-video object-cover"
                >
                  <source src={videoSrc1} type="video/mp4" />
                  <source src={videoSrc1} type="video/quicktime" />
                  Trình duyệt không hỗ trợ thẻ video.
                </video>
              </div>
            </div>

            {/* Video 2 */}
            <div>
              <h3 className="font-display font-bold text-lg text-ink mb-3">Hướng dẫn mở MC WORLD 2IN1</h3>
              <div className="rounded-2xl overflow-hidden shadow-xl bg-black">
                <video 
                  controls 
                  className="w-full h-auto aspect-video object-cover"
                >
                  <source src={videoSrc2} type="video/mp4" />
                  <source src={videoSrc2} type="video/quicktime" />
                  Trình duyệt không hỗ trợ thẻ video.
                </video>
              </div>
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            <h3 className="font-display font-bold text-xl text-ink mb-6">Các bước thực hiện</h3>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <h4 className="font-bold text-ink text-lg">Đăng ký thông tin</h4>
                  <p className="text-steel font-body text-sm mt-1">Truy cập ứng dụng OCB OMNI hoặc website để điền thông tin cá nhân cơ bản.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <h4 className="font-bold text-ink text-lg">Xác thực danh tính (eKYC)</h4>
                  <p className="text-steel font-body text-sm mt-1">Chụp ảnh 2 mặt CMND/CCCD và quét khuôn mặt theo hướng dẫn trên màn hình.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                  <h4 className="font-bold text-ink text-lg">Bổ sung hồ sơ tài chính</h4>
                  <p className="text-steel font-body text-sm mt-1">Cung cấp các giấy tờ chứng minh thu nhập hoặc xác thực qua VNeID để nhận hạn mức tín dụng tốt nhất.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-bold flex-shrink-0">4</div>
                <div>
                  <h4 className="font-bold text-ink text-lg">Nhận thẻ và sử dụng</h4>
                  <p className="text-steel font-body text-sm mt-1">Hệ thống phê duyệt tự động trong vòng 15 phút. Bạn có thể sử dụng thẻ ảo ngay lập tức và nhận thẻ cứng tại nhà sau 3-5 ngày làm việc.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
        
        {/* Footer */}
        <div className="p-6 bg-canvas border-t border-whisper flex justify-end">
          <button 
            onClick={onClose}
            className="premium-btn text-white bg-ink hover:bg-black"
          >
            Đã hiểu
          </button>
        </div>
        
      </div>
    </div>
  )
}
