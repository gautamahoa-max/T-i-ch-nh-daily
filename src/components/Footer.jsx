import blogLogo from '../assets/images/blog_logo.png';
export default function Footer() {
  return (
    <footer className="bg-canvas border-t border-whisper pt-16 pb-8 md:pt-24 md:pb-12">
      <div className="container mx-auto px-6 md:px-12 max-w-[1200px]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          <div className="md:col-span-5">
            <img 
              src={blogLogo} 
              alt="OCB Logo" 
              className="h-16 mb-8 object-contain drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]"
            />
            <p className="font-body text-steel text-sm leading-relaxed max-w-sm mb-8">
              Blog chia sẻ các sản phẩm thẻ tín dụng của OCB
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
