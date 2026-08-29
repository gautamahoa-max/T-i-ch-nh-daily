import { useEffect, useState } from 'react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);



  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  

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
      question: "2. Điều kiện mở thẻ tín dụng OCB?",
      answer: (
        <div className="text-steel leading-relaxed space-y-2">
          <p>Khách hàng mở thẻ tín dụng OCB cần đáp ứng các điều kiện sau đây:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><span className="font-semibold text-ink">Quốc tịch:</span> Người Việt Nam</li>
            <li><span className="font-semibold text-ink">Địa chỉ cư trú/làm việc:</span> Tại các tỉnh/thành phố có Chi nhánh/Phòng giao dịch của OCB</li>
            <li><span className="font-semibold text-ink">Độ tuổi:</span> Chủ thẻ chính từ đủ 20 tuổi đến 65 tuổi; Chủ thẻ phụ từ đủ 15 tuổi trở lên</li>
            <li><span className="font-semibold text-ink">Các yêu cầu khác:</span> Theo quy định của OCB từng thời kỳ.</li>
          </ul>
        </div>
      )
    },
    {
      question: "3. Thẻ tín dụng có rút được tiền tại máy ATM không?",
      answer: (
        <p className="text-steel leading-relaxed">
          Thẻ tín dụng có thể rút tiền mặt tại máy ATM, khi đó Khách hàng sẽ phải trả thêm phí và bị tính lãi từ ngày rút tiền đến khi thanh toán hết nợ cho OCB. Khách hàng có thể tham khảo biểu phí trước khi thực hiện giao dịch.
        </p>
      )
    },
    {
      question: "4. Tôi muốn nâng hạn mức Thẻ tín dụng thì phải làm sao?",
      answer: (
        <p className="text-steel leading-relaxed">
          Để nâng hạn mức Thẻ tín dụng Khách hàng có thể liện hệ Mr. Hoà OCB - 098.888.6447 để được tư vấn nâng hạn mức Thẻ.
        </p>
      )
    },
    {
      question: "5. Số tiền thanh toán tối thiểu của Thẻ tín dụng được tính như thế nào?",
      answer: (
        <p className="text-steel leading-relaxed">
          Số tiền thanh toán tối thiểu bằng 5% dư nợ cuối kỳ hoặc 50.000 VNĐ (Tùy số nào lớn hơn).
        </p>
      )
    },
    {
      question: "6. Lãi suất sẽ được tính như thế nào?",
      answer: (
        <div className="text-steel leading-relaxed space-y-2">
          <p className="font-semibold text-ink">Các giao dịch rút tiền mặt:</p>
          <p>
            Các giao dịch rút tiền mặt sẽ bị tính phí rút tiền mặt và bị tính lãi kể từ ngày giao dịch được thực hiện cho đến ngày khoản dư nợ của giao dịch rút tiền mặt này được trả đầy đủ, mức phí và lãi suất áp dụng theo quy định tại Biểu phí dịch vụ và lãi suất Thẻ của OCB tại từng thời kỳ.
          </p>
          <p className="font-semibold text-ink mt-4">Các giao dịch trả góp:</p>
          <p>
            Trường hợp Khách hàng trả nợ theo đúng kế hoạch trả góp đã thỏa thuận: Giao dịch trả góp sẽ không bị tính lãi suất.
          </p>
          <p>
            Nếu Khách hàng không thanh toán toàn bộ Số Tiền Chậm Thanh Toán (Bao gồm số tiền trả góp hàng kỳ) vào hoặc trước Ngày Đến Hạn Thanh Toán, OCB sẽ tính lãi chậm thanh toán với phần giao dịch trả góp chưa thanh toán đúng hạn. Lãi suất sẽ được tính từ ngày thực hiện giao dịch trả góp đến ngày thanh toán (các) giao dịch đó, theo mức lãi suất quy định tại Biểu phí dịch vụ và lãi suất Thẻ của OCB tại từng thời kỳ.
          </p>
          <p>
            Các giao dịch trả góp khi tất toán trước hạn sẽ tính lãi từ ngày tất toán trước hạn cho đến ngày khoản dư nợ của giao dịch trả góp này được trả đầy đủ, lãi suất áp dụng theo quy định tại Biểu phí dịch vụ và lãi suất Thẻ của OCB tại từng thời kỳ.
          </p>
          <p className="font-semibold text-ink mt-4">Các giao dịch thanh toán tiền hàng hóa, dịch vụ:</p>
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
      question: "7. Tiền chuyển vào thẻ tín dụng sẽ có thứ tự thanh toán như thế nào?",
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
      question: "8. Tôi có mất phí, lãi gì khi đăng ký trả góp hay không?",
      answer: (
        <p className="text-steel leading-relaxed">
          Quý khách có thể lựa chọn mua hàng trả góp tại các đối tác liên kết của OCB với lãi suất 0% hoặc mua hàng trả góp tại bất kỳ thương hiệu nào mà quý khách yêu thích với phí chuyển đổi trả góp chỉ từ 4% cho các kỳ hạn linh hoạt 3, 6, 9, 12 tháng.
        </p>
      )
    },
    {
      question: "9. Thời gian miễn lãi của các thẻ tín dụng như thế nào?",
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
      question: "10. Nếu tôi thanh toán trễ so với thông báo của ngân hàng, tôi sẽ chịu các khoản phí/lãi gì?",
      answer: (
        <p className="text-steel leading-relaxed">
          Nếu quý khách không thanh toán số dư nợ tối thiểu khi đến hạn, một khoản phí chậm thanh toán (quy định trong biểu phí thẻ tín dụng) sẽ được ghi nợ vào tài khoản thẻ tín dụng. Đồng thời lãi suất sẽ áp dụng trên tổng số dư nợ và các giao dịch mới phát sinh (nếu có). Riêng đối với các giao dịch rút tiền mặt, lãi suất sẽ được tính ngay tại thời điểm khách hàng thực hiện giao dịch rút tiền mặt bằng thẻ tín dụng.
        </p>
      )
    },
    {
      question: "11. Tôi không kích hoạt thẻ thì có bị mất phí gì không?",
      answer: (
        <p className="text-steel leading-relaxed">
          Theo thông tin từ ngân hàng, khi mở thẻ tín dụng nếu không kích hoạt thẻ thì quý khách vẫn bị tính phí thường niên. Việc kích hoạt thẻ là bước bảo mật do ngân hàng đặt ra để bảo vệ tài khoản tín dụng của quý khách. Khi không kích hoạt thẻ tín dụng, quý khách sẽ không thể quẹt thẻ khi thanh toán tại máy POS nhưng tài khoản tín dụng của quý khách vẫn đang trong trạng thái hoạt động.
        </p>
      )
    }
  ];

  return (
    <section id="faq" className="w-full bg-canvas py-16 md:py-24 border-t border-whisper scroll-mt-20">
      <div className="container mx-auto px-6 md:px-12 max-w-[1200px] flex flex-col items-center">
        
        <h2 className="text-3xl md:text-5xl font-display font-bold text-ink mb-12 text-center">Câu hỏi thường gặp</h2>
        
        <div className="w-full max-w-4xl border border-whisper rounded-xl overflow-hidden bg-surface shadow-sm">
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
    </section>
  );
}
