import imgBanner from '../assets/images/new_banner_v2.png';

export default function HeroBanner() {
  return (
    <section className="w-full pt-[80px] bg-canvas overflow-hidden">
      {/* Edge-to-edge full-width image container */}
      <div className="w-full relative pointer-events-none">
        <img 
          src={imgBanner} 
          alt="OCB Credit Cards - Tận hưởng ẩm thực Á Âu" 
          className="w-full h-[60vh] md:h-[calc(100vh-80px)] object-cover object-center"
          style={{ imageRendering: '-webkit-optimize-contrast' }}
        />
      </div>
    </section>
  )
}
