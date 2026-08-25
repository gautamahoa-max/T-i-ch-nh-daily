import { useEffect } from 'react';

export default function FAQModal({ isOpen, onClose }) {
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

  if (!isOpen) return null;

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
        <div className="flex items-center justify-between px-6 py-4 border-b border-whisper bg-surface shrink-0">
          <h2 className="text-2xl font-display font-bold text-ink">Câu hỏi thường gặp</h2>
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
        <div className="p-6 md:p-10 overflow-y-auto space-y-8 font-body">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-accent">1. Điều kiện mở thẻ tín dụng OCB là gì?</h3>
            <p className="text-steel leading-relaxed">
              Vui lòng liên hệ nhân viên tư vấn để được hỗ trợ kiểm tra điều kiện cụ thể dựa trên thu nhập và lịch sử tín dụng của bạn.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-accent">2. Làm thế nào để kích hoạt thẻ?</h3>
            <p className="text-steel leading-relaxed">
              Bạn có thể kích hoạt thẻ qua ứng dụng OCB OMNI, soạn tin nhắn SMS theo cú pháp quy định, hoặc gọi lên tổng đài OCB.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-accent">3. Thẻ OCB có được miễn phí thường niên không?</h3>
            <p className="text-steel leading-relaxed">
              Tùy thuộc vào từng dòng thẻ và chương trình ưu đãi tại thời điểm mở thẻ. Một số thẻ sẽ được miễn phí thường niên năm đầu hoặc miễn phí khi đạt điều kiện chi tiêu.
            </p>
          </div>
          
          <p className="text-sm text-steel italic mt-8 border-t border-whisper pt-4">
            * Nội dung đang được cập nhật thêm. Bạn có thể cung cấp thêm các câu hỏi và câu trả lời.
          </p>
        </div>
        
      </div>
    </div>
  );
}
