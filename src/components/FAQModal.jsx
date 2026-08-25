import { useEffect, useState } from 'react';

export default function FAQModal({ isOpen, onClose }) {
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Reset open item when modal opens
      setOpenIndex(null);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!isOpen) return null;

  const faqs = [
    {
      question: "1. Thẻ tín dụng là gì? Hạn mức thẻ tín dụng là gì?",
      answer: (
        <div className="text-steel leading-relaxed space-y-2">
          <p>
            Thẻ tín dụng là một loại thẻ cho phép khách hàng sử dụng số tiền trong hạn mức đã thỏa thuận trước với ngân hàng mà không cần phải có số dư trong thẻ. Nói đơn giản, thì đây là loại thẻ giúp Khách hàng mua hàng trước và thanh toán lại sau cho ngân hàng.
          </p>
          <p>
            Hạn mức thẻ tín dụng là hạn mức tối đa được ngân hàng cấp cho chủ thẻ. Ngân hàng phát hành sẽ xác định hạn mức bằng cách xem xét tình hình tài chính của Khách hàng tại thời điểm Khách hàng đăng ký Thẻ tín dụng.
          </p>
        </div>
      )
    },
    {
      question: "2. Thẻ tín dụng có rút được tiền tại máy ATM không?",
      answer: (
        <p className="text-steel leading-relaxed">
          Thẻ tín dụng có thể rút tiền mặt tại máy ATM, khi đó Khách hàng sẽ phải trả thêm phí và bị tính lãi từ ngày rút tiền đến khi thanh toán hết nợ cho OCB. Khách hàng có thể tham khảo biểu phí trước khi thực hiện giao dịch.
        </p>
      )
    },
    {
      question: "3. Tôi muốn nâng hạn mức Thẻ tín dụng thì phải làm sao?",
      answer: (
        <p className="text-steel leading-relaxed">
          Sau thời gian sử dụng Thẻ tín dụng từ 06 tháng trở lên, căn cứ vào lịch sử giao dịch và lịch sử thanh toán OCB sẽ xem xét nâng hạn mức tự động. Hoặc sau khi thẻ được sử dụng tối thiểu 03 tháng, Chủ thẻ liên hệ Mr.Hoà OCB - 098.888.6447 để được hỗ trợ tư vấn hồ sơ xét duyệt nâng hạn mức.
        </p>
      )
    },
    {
      question: "4. Số tiền thanh toán tối thiểu tính như thế nào?",
      answer: (
        <div className="text-steel leading-relaxed space-y-2">
          <ul className="list-disc pl-5 space-y-1">
            <li>Khoản trả góp hàng tháng (nếu có); và</li>
            <li>Nợ quá hạn và/hoặc khoản vượt hạn mức tín dụng (nếu có); và</li>
            <li>Từ 1% đến 15% của số dư nợ cuối kỳ còn lại (*)</li>
          </ul>
          <p className="text-sm italic">
            (*) Hoặc theo tỷ lệ khác do OCB thông báo đến từng Chủ Thẻ qua email hoặc qua bất kỳ hình thức nào mà OCB cho là phù hợp tùy theo từng loại sản phẩm thẻ khác nhau theo từng thời kỳ.
          </p>
        </div>
      )
    },
    {
      question: "5. Cách tính lãi thẻ tín dụng như thế nào?",
      answer: (
        <div className="text-steel leading-relaxed space-y-3">
          <p>
            Các giao dịch rút tiền mặt sẽ bị tính lãi từ ngày các giao dịch được thực hiện cho đến khi khoản rút tiền mặt này được trả đầy đủ theo quy định tại Biểu phí dịch vụ và lãi suất Thẻ của OCB tại từng thời kỳ.
          </p>
          <p>
            Các giao dịch trả góp khi tất toán trước hạn sẽ tính lãi từ ngày tất toán trước hạn cho đến ngày khoản dư nợ của giao dịch trả góp này được trả đầy đủ, lãi suất áp dụng theo quy định tại Biểu phí dịch vụ và lãi suất Thẻ của OCB tại từng thời kỳ.
          </p>
          <p className="font-semibold text-ink">Các giao dịch thanh toán tiền hàng hóa, dịch vụ:</p>
          <p>
            Nếu OCB nhận được toàn bộ khoản thanh toán cho Dư Nợ Cuối Kỳ vào hoặc trước Ngày Đến Hạn Thanh Toán, OCB sẽ:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>(i) không tính lãi với phần Dư Nợ Cuối Kỳ phát sinh mới trong kỳ sao kê hiện tại và</li>
            <li>(ii) tính lãi cho phần Dư Nợ Cuối Kỳ được kết chuyển từ những kỳ sao kê trước, nếu có (bằng tổng số dư của các giao dịch từ những kỳ sao kê trước chưa được thanh toán kết chuyển sang), được tính tiếp tục từ ngày chốt sao kê đến ngày thanh toán (các) giao dịch, theo mức lãi suất quy định tại Biểu phí dịch vụ và lãi suất Thẻ của OCB tại từng thời kỳ.</li>
          </ul>
          <p>
            Nếu OCB không nhận được toàn bộ khoản thanh toán cho Dư Nợ Cuối Kỳ vào hoặc trước Ngày Đến Hạn Thanh Toán thì OCB sẽ tính lãi đối với toàn bộ số Dư Nợ Cuối Kỳ và toàn bộ các dư nợ mới phát sinh trong kỳ, được tính từ ngày (các) giao dịch được thực hiện đến ngày thanh toán (các) giao dịch đó, theo mức lãi suất quy định tại Biểu phí dịch vụ và lãi suất Thẻ của OCB tại từng thời kỳ.
          </p>
        </div>
      )
    },
    {
      question: "6. Tiền chuyển vào thẻ tín dụng sẽ có thứ tự thanh toán như thế nào?",
      answer: (
        <div className="text-steel leading-relaxed space-y-2">
          <p>Số dư nợ sẽ được thanh toán theo thứ tự thời gian các giao dịch, phí, lãi được ghi nợ vào tài khoản thẻ và theo thứ tự ưu tiên dưới đây:</p>
          <ul className="list-none pl-5 space-y-1">
            <li className="flex gap-2">
              <span className="text-accent">•</span>
              <span>Giao dịch chuyển đổi trả góp → Tiền phí → Tiền lãi → Giao dịch rút tiền mặt → Giao dịch thanh toán</span>
            </li>
          </ul>
        </div>
      )
    },
    {
      question: "7. Tôi có mất phí, lãi gì khi đăng ký trả góp hay không?",
      answer: (
        <p className="text-steel leading-relaxed">
          Quý khách có thể lựa chọn mua hàng trả góp tại các đối tác liên kết của OCB với lãi suất 0% hoặc mua hàng trả góp tại bất kỳ thương hiệu nào mà quý khách yêu thích với phí chuyển đổi trả góp chỉ từ 4% cho các kỳ hạn linh hoạt 3, 6, 9, 12 tháng.
        </p>
      )
    },
    {
      question: "8. Thời gian miễn lãi của các thẻ tín dụng như thế nào?",
      answer: (
        <div className="text-steel leading-relaxed space-y-2">
          <p>Thời gian miễn lãi tối đa của Thẻ tín dụng OCB lên đến 55 ngày:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Đối với dòng tín dụng nội địa, thẻ hạng Standard/Gold: tối đa 45 ngày</li>
            <li>Đối với dòng thẻ hạng Platinum, thẻ World: tối đa 55 ngày</li>
          </ul>
        </div>
      )
    },
    {
      question: "9. Nếu tôi thanh toán trễ so với thông báo của ngân hàng, tôi sẽ chịu các khoản phí/lãi gì?",
      answer: (
        <p className="text-steel leading-relaxed">
          Nếu quý khách không thanh toán số dư nợ tối thiểu khi đến hạn, một khoản phí chậm thanh toán (quy định trong biểu phí thẻ tín dụng) sẽ được ghi nợ vào tài khoản thẻ tín dụng. Đồng thời lãi suất sẽ áp dụng trên tổng số dư nợ và các giao dịch mới phát sinh (nếu có). Riêng đối với các giao dịch rút tiền mặt, lãi suất sẽ được tính ngay tại thời điểm khách hàng thực hiện giao dịch rút tiền mặt bằng thẻ tín dụng.
        </p>
      )
    },
    {
      question: "10. Tôi không kích hoạt thẻ thì có bị mất phí gì không?",
      answer: (
        <p className="text-steel leading-relaxed">
          Theo thông tin từ ngân hàng, khi mở thẻ tín dụng nếu không kích hoạt thẻ thì quý khách vẫn bị tính phí thường niên. Việc kích hoạt thẻ là bước bảo mật do ngân hàng đặt ra để bảo vệ tài khoản tín dụng của quý khách. Khi không kích hoạt thẻ tín dụng, quý khách sẽ không thể quẹt thẻ khi thanh toán tại máy POS nhưng tài khoản tín dụng của quý khách vẫn đang trong trạng thái hoạt động.
        </p>
      )
    }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-ink/80 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      ></div>
      
      {/* Modal Box */}
      <div className="relative bg-canvas w-full max-w-4xl max-h-full rounded-sm shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-300">
        
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
        <div className="p-6 md:p-10 overflow-y-auto font-body">
          <div className="border border-whisper rounded-md overflow-hidden bg-surface">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={index} className="border-b border-whisper last:border-b-0">
                  <button
                    className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none transition-colors hover:bg-whisper/50"
                    onClick={() => toggleItem(index)}
                  >
                    <h3 className="text-lg md:text-xl font-bold text-ink pr-8">{faq.question}</h3>
                    <svg 
                      className={`w-5 h-5 text-steel flex-shrink-0 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <div className="px-6 pb-6 pt-2">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
      </div>
    </div>
  );
}
