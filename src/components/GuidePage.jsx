import { useEffect, useState, useRef } from 'react';
import videoSrc1 from '../assets/videos/huong_dan_mo.mov';
import videoSrc2 from '../assets/videos/huong_dan_mo_mc.mov';
import zaloQr from '../assets/images/zalo-qr.jpg';

const CustomVideoPlayer = ({ srcMap, isActive, isViewable }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.volume = 0.5;
    
    if (isActive) {
      if (isViewable) {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  }, [isActive, isViewable]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <div 
      className="relative rounded-xl overflow-hidden shadow-lg bg-black aspect-video border border-whisper group cursor-pointer" 
      onClick={togglePlay}
    >
      <video 
        ref={videoRef}
        playsInline
        preload="metadata"
        className="w-full h-full object-contain"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      >
        <source src={srcMap} type="video/mp4" />
        <source src={srcMap} type="video/quicktime" />
        Trình duyệt không hỗ trợ thẻ video.
      </video>
      
      {/* Play/Pause Overlay Overlaying the whole video */}
      <div className={`absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-300 ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
        <button 
          className="w-16 h-16 rounded-full bg-accent/90 text-white flex items-center justify-center transform transition-transform hover:scale-110 shadow-lg"
          onClick={(e) => {
            e.stopPropagation();
            togglePlay();
          }}
        >
          {isPlaying ? (
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default function GuidePage() {
  const [activeVideo, setActiveVideo] = useState(0);
  const [isVideoInView, setIsVideoInView] = useState(true);
  const scrollContainerRef = useRef(null);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollLeft = scrollContainerRef.current.scrollLeft;
      const width = scrollContainerRef.current.clientWidth;
      const newIndex = Math.round(scrollLeft / width);
      setActiveVideo(newIndex);
    }
  };

  // Observe if video container is in view
  useEffect(() => {
    
    
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      setIsVideoInView(entry.isIntersecting);
    }, { threshold: 0.1 });
    
    observer.observe(scrollContainerRef.current);
    
    return () => observer.disconnect();
  }, []);



  

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      {/* Modal Container */}
      <div 
        className="w-full max-w-4xl max-h-[90vh] bg-surface rounded-2xl md:rounded-3xl shadow-2xl flex flex-col relative overflow-hidden transform transition-all"
        
      >
        {/* Header (Sticky) */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md px-6 py-4 md:px-8 md:py-6 border-b border-whisper flex justify-between items-center shadow-sm">
          <h2 className="text-xl md:text-3xl font-display font-bold text-ink flex items-center gap-3">
            HƯỚNG DẪN MỞ THẺ
          </h2>
          
          <a 
            href="#/"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface text-steel hover:bg-accent hover:text-white transition-colors border border-whisper font-semibold text-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Quay lại
          </a>

        </div>

        {/* Scrollable Body */}
        <div className="flex-1 p-6 md:p-10 space-y-12 bg-white">
          
          {/* CÁCH 1 */}
          <section className="space-y-6">
            <h3 className="text-xl font-display font-bold text-accent border-l-4 border-accent pl-3 uppercase tracking-wide">CÁCH 1: MỞ THẺ ONLINE</h3>
            
            <div className="mb-10">
              <div 
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-2 hide-scrollbar transform-gpu"
              >
                {/* Video 1 */}
                <div className="snap-center shrink-0 w-full flex justify-center">
                  <div className="w-full max-w-2xl flex flex-col">
                    <h4 className="font-bold text-ink font-body mb-3">Hướng dẫn mở thẻ (Chung)</h4>
                    <CustomVideoPlayer 
                      srcMap={videoSrc1} 
                      isActive={activeVideo === 0} 
                      isViewable={isVideoInView} 
                    />
                  </div>
                </div>

                {/* Video 2 */}
                <div className="snap-center shrink-0 w-full flex justify-center">
                  <div className="w-full max-w-2xl flex flex-col">
                    <h4 className="font-bold text-ink font-body mb-3">Hướng dẫn mở MC WORLD 2IN1</h4>
                    <CustomVideoPlayer 
                      srcMap={videoSrc2} 
                      isActive={activeVideo === 1} 
                      isViewable={isVideoInView} 
                    />
                  </div>
                </div>
              </div>
              
              {/* Pagination Dots */}
              <div className="flex justify-center items-center gap-2 mt-4">
                <div className={`w-2 h-2 rounded-full transition-all duration-300 ${activeVideo === 0 ? 'w-6 bg-accent' : 'bg-steel/30'}`}></div>
                <div className={`w-2 h-2 rounded-full transition-all duration-300 ${activeVideo === 1 ? 'w-6 bg-accent' : 'bg-steel/30'}`}></div>
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
