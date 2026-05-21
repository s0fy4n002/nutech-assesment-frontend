import useEmblaCarousel from 'embla-carousel-react';

export default function PromoSlider({ banners }) {
  const [emblaRef] = useEmblaCarousel({ dragFree: true });

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex gap-4">
        {banners.map((i) => (
          <div key={i.id} className="min-w-[280px] h-36 flex-[0_0_auto] rounded-xl overflow-hidden">
            <img src={i.image} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}