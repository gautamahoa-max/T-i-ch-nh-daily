import imgBanner from '../assets/images/banner.png';

export default function HeroBanner() {
  return (
    <section className="w-full pt-[80px] bg-canvas overflow-hidden">
      {/* Centered image container without stretching past native resolution */}
      <div className="w-full relative bg-white flex justify-center">
        <img 
          src={imgBanner} 
          alt="OCB Credit Cards - Quẹt thẻ chi tiêu" 
          className="w-full max-w-[1024px] h-auto object-contain object-center"
          style={{ imageRendering: '-webkit-optimize-contrast' }}
        />
      </div>
    </section>
  )
}
