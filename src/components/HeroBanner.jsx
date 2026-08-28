import imgBanner from '../assets/images/new_banner.jpg';

export default function HeroBanner() {
  return (
    <section className="w-full pt-[80px] bg-canvas overflow-hidden">
      {/* Edge-to-edge full-width image container */}
      <div className="w-full relative pointer-events-none">
        <img 
          src={imgBanner} 
          alt="OCB Credit Cards - Tận hưởng ẩm thực Á Âu" 
          className="w-full h-auto object-contain"
          style={{ imageRendering: '-webkit-optimize-contrast' }}
        />
      </div>
    </section>
  )
}
