import React, { useState, useRef, useEffect } from 'react';
import { Reveal } from './ui/Reveal';
import { useTranslation } from '../hooks/useTranslation';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface TreatmentCardProps {
  number: string;
  title: string;
  description: string;
  image: string;
  index: number;
}

const TreatmentCard: React.FC<TreatmentCardProps> = ({
  number,
  title,
  description,
  image,
  index,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className="group relative overflow-hidden bg-white cursor-pointer flex-shrink-0 w-[85vw] md:w-[45vw] lg:w-[30vw] max-w-[400px]"
      data-cursor="hover"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        {!imageError ? (
          <img
            src={image}
            alt={title}
            className={`w-full h-full object-cover transition-all duration-700 ease-[0.22,1,0.36,1] group-hover:scale-105 grayscale group-hover:grayscale-0 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
            <span className="text-gray-300 font-serif text-6xl">{number}</span>
          </div>
        )}

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Number badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-block bg-white/90 backdrop-blur-sm text-studio-black text-[10px] font-bold uppercase tracking-ultra px-3 py-1.5 shadow-sm">
            {number}
          </span>
        </div>

        {/* Hover reveal arrow */}
        <div className="absolute bottom-4 right-4 z-10 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg">
            <ArrowRight className="w-4 h-4 text-studio-black" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 lg:p-8">
        <h3 className="font-serif text-xl lg:text-2xl text-studio-black mb-3 group-hover:text-studio-gold transition-colors duration-300">
          {title}
        </h3>
        <p className="text-sm text-studio-gray font-light leading-relaxed line-clamp-2">
          {description}
        </p>
      </div>

      {/* Bottom border animation */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-studio-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </div>
  );
};

export const Treatments: React.FC = () => {
  const { t } = useTranslation();
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const treatments = [
    {
      key: 'implantology',
      image: 'https://i.pinimg.com/originals/60/04/b9/6004b9521440d181bde0a734d93b7184.jpg',
    },
    {
      key: 'prosthetics',
      image: 'https://i.pinimg.com/originals/a1/30/09/a130095fbe716c5bb8e7be0713584fd0.jpg',
    },
    {
      key: 'aligners',
      image: 'https://i.pinimg.com/originals/5a/9e/4b/5a9e4b3d06cecb638556ece73cb0417c.jpg',
    },
    {
      key: 'orthodontics',
      image: 'https://i.pinimg.com/originals/d2/10/e6/d210e6d0cc27fca87fe4245aea34e071.jpg',
    },
    {
      key: 'crowns',
      image: 'https://i.pinimg.com/originals/3d/90/fd/3d90fd9c0112b18067d6348072116872.jpg',
    },
    {
      key: 'aesthetics',
      image: 'https://i.pinimg.com/originals/e1/9e/6c/e19e6c06f7723fc1752fa56a49c6aad9.jpg',
    },
  ];

  const checkScrollButtons = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener('scroll', checkScrollButtons);
      checkScrollButtons();
      return () => slider.removeEventListener('scroll', checkScrollButtons);
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = sliderRef.current.clientWidth * 0.8;
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="treatments" className="py-24 lg:py-32 bg-[#FAFAFA]">
      <div className="container mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 lg:mb-24 gap-8">
          <Reveal>
            <div className="flex items-center gap-4 mb-6">
              <span className="h-[1px] w-8 bg-studio-gold"></span>
              <span className="text-studio-gold text-[10px] uppercase tracking-ultra font-semibold">
                {t('treatments.label')}
              </span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-studio-black leading-[1.1]">
              {t('treatments.title')}
            </h2>
            <p className="mt-6 text-studio-gray font-light max-w-xl leading-relaxed">
              {t('treatments.subtitle')}
            </p>
          </Reveal>

          <Reveal delay={200}>
            <div className="hidden lg:flex items-center gap-6">
              {/* Navigation Arrows */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => scroll('left')}
                  disabled={!canScrollLeft}
                  className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
                    canScrollLeft
                      ? 'border-studio-black text-studio-black hover:bg-studio-black hover:text-white'
                      : 'border-gray-200 text-gray-300 cursor-not-allowed'
                  }`}
                  aria-label="Previous treatments"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => scroll('right')}
                  disabled={!canScrollRight}
                  className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
                    canScrollRight
                      ? 'border-studio-black text-studio-black hover:bg-studio-black hover:text-white'
                      : 'border-gray-200 text-gray-300 cursor-not-allowed'
                  }`}
                  aria-label="Next treatments"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <a
                href="#booking"
                className="group flex items-center gap-4 text-[10px] uppercase tracking-ultra hover:text-studio-gold transition-colors"
                data-cursor="hover"
              >
                {t('treatments.bookConsultation')}
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Horizontal Scrolling Slider */}
      <div className="relative">
        <div
          ref={sliderRef}
          className="flex gap-6 lg:gap-8 overflow-x-auto scrollbar-hide px-6 md:px-12 pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {treatments.map((treatment, index) => (
            <div key={treatment.key} className="snap-start">
              <TreatmentCard
                number={String(index + 1).padStart(2, '0')}
                title={t(`treatments.items.${treatment.key}.title`)}
                description={t(`treatments.items.${treatment.key}.description`)}
                image={treatment.image}
                index={index}
              />
            </div>
          ))}
        </div>

        {/* Mobile Navigation Arrows */}
        <div className="lg:hidden flex justify-center gap-4 mt-8">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
              canScrollLeft
                ? 'border-studio-black text-studio-black'
                : 'border-gray-200 text-gray-300 cursor-not-allowed'
            }`}
            aria-label="Previous treatments"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
              canScrollRight
                ? 'border-studio-black text-studio-black'
                : 'border-gray-200 text-gray-300 cursor-not-allowed'
            }`}
            aria-label="Next treatments"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile CTA */}
      <div className="container mx-auto px-6 md:px-12">
        <div className="mt-8 lg:hidden flex justify-center">
          <a
            href="#booking"
            className="group flex items-center gap-4 text-[10px] uppercase tracking-ultra hover:text-studio-gold transition-colors"
            data-cursor="hover"
          >
            {t('treatments.bookConsultation')}
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Treatments;
