export default function Footer() {
  return (
    <footer className="bg-canvas border-t border-whisper pt-24 pb-12">
      <div className="container mx-auto px-6 md:px-12 max-w-[1200px]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          <div className="md:col-span-5">
            <img 
              src="https://ocb.com.vn/assets/images/logo/ocb-logo-full.svg" 
              alt="OCB Logo" 
              className="h-8 mb-8"
            />
            <p className="font-body text-steel text-sm leading-relaxed max-w-sm mb-8">
              Ngân hàng TMCP Phương Đông (OCB) được thành lập từ năm 1996. Kiến tạo chuẩn mực tài chính mới.
            </p>
            <div className="font-mono text-ink text-sm tracking-widest uppercase">Liên hệ: 098.888.6447 - Hoà OCB</div>
          </div>
          

          <div className="md:col-span-2">
            <h4 className="font-display font-bold text-ink mb-6">Sản phẩm</h4>
            <ul className="space-y-4 font-body text-sm text-steel">
              <li><a href="#" className="hover:text-ink transition-colors">Thẻ tín dụng</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-whisper flex flex-col md:flex-row items-center justify-center">
          <p className="font-body text-steel text-sm">
            &copy; {new Date().getFullYear()} Hoa. Mọi bản quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  )
}
