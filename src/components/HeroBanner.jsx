import imgBanner from '../assets/images/banner.png';

export default function HeroBanner() {
  return (
    <section className="w-full pt-[80px] bg-canvas overflow-hidden">
      {/* Edge-to-edge full-width image container */}
      <div className="w-full relative">
        <img 
          src={imgBanner} 
          alt="OCB Credit Cards - Quẹt thẻ chi tiêu" 
          className="w-full h-auto max-h-[70vh] object-cover object-center"
          style={{ imageRendering: '-webkit-optimize-contrast' }}
        />
      </div>
    </section>
  )
}
