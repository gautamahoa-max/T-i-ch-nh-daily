import imgBanner from '../assets/images/banner.png';
import videoBanner from '../assets/videos/banner-video.mp4';

export default function HeroBanner() {
  return (
    <section className="w-full pt-[80px] bg-canvas overflow-hidden">
      {/* Edge-to-edge full-width container */}
      <div className="w-full relative pointer-events-none">
        
        {/* Mobile: Image banner */}
        <img 
          src={imgBanner} 
          alt="OCB Credit Cards - Quẹt thẻ chi tiêu" 
          className="w-full h-auto max-h-[70vh] object-cover object-center md:hidden"
          style={{ imageRendering: '-webkit-optimize-contrast' }}
        />
        
        {/* Desktop: Video banner */}
        <video 
          src={videoBanner}
          className="w-full h-auto hidden md:block"
          autoPlay 
          muted 
          loop 
          playsInline
        />
        
      </div>
    </section>
  )
}
