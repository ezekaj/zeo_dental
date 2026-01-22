import React, { useState, useRef, useEffect } from 'react';
import { Reveal } from './ui/Reveal';
import { useTranslation } from '../hooks/useTranslation';
import { ArrowRight } from 'lucide-react';

interface TreatmentItemProps {
  number: string;
  title: string;
  description: string;
  image: string;
  learnMoreText: string;
  treatmentKey: string;
}

const TreatmentItem: React.FC<TreatmentItemProps> = ({
  number,
  title,
  description,
  image,
  learnMoreText,
  treatmentKey,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      className="group relative flex-shrink-0 w-[280px] sm:w-[300px] md:w-[350px] lg:w-[400px] h-[380px] sm:h-[400px] md:h-[450px] lg:h-[500px] overflow-hidden"
      data-cursor="hover"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={image}
          alt={title}
          className={`w-full h-full object-cover transition-all duration-700 ease-[0.22,1,0.36,1] group-hover:scale-110 grayscale group-hover:grayscale-0 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-6 md:p-8 lg:p-10">
        {/* Header */}
        <div className="flex justify-between items-start w-full">
          <span className="font-serif text-lg md:text-xl italic text-white/60 group-hover:text-studio-gold transition-colors duration-500">
            {number}
          </span>
          <div className="w-8 h-[1px] bg-white/30 group-hover:bg-studio-gold transition-colors duration-500 origin-right transform scale-x-50 group-hover:scale-x-100"></div>
        </div>

        {/* Bottom Content */}
        <div className="relative z-10">
          <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-white mb-3 sm:mb-4 md:mb-6 group-hover:translate-x-2 transition-transform duration-700 ease-[0.19,1,0.22,1]">
            {title}
          </h3>

          <div className="overflow-hidden">
            <p className="font-sans text-[11px] sm:text-xs text-white/70 font-medium leading-relaxed sm:leading-loose max-w-[260px] sm:max-w-[280px] opacity-60 group-hover:opacity-100 transition-all duration-700 transform translate-y-4 group-hover:translate-y-0">
              {description}
            </p>
          </div>

          {/* Learn more link */}
          <div className="mt-4 sm:mt-6 overflow-hidden">
            <a
              href={`/treatments/${treatmentKey}`}
              className="inline-flex items-center gap-2 text-[11px] sm:text-[10px] uppercase tracking-wide sm:tracking-ultra text-white/60 group-hover:text-studio-gold transition-all duration-500 transform translate-y-8 group-hover:translate-y-0 py-2"
            >
              {learnMoreText}
              <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Treatments: React.FC = () => {
  const { t } = useTranslation();
  const trackRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const animationRef = useRef<number>();
  const positionRef = useRef(0);

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

  // Double the items for seamless looping
  const loopedTreatments = [...treatments, ...treatments];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const itemWidth = 400 + 2; // width + gap (2px border)
    const totalWidth = itemWidth * treatments.length;
    const speed = 0.5; // pixels per frame

    const animate = () => {
      if (!isPaused) {
        positionRef.current -= speed;

        // Reset position when we've scrolled through one set
        if (Math.abs(positionRef.current) >= totalWidth) {
          positionRef.current = 0;
        }

        track.style.transform = `translateX(${positionRef.current}px)`;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused, treatments.length]);

  return (
    <section id="treatments" className="bg-white border-b border-gray-100">
      {/* Section Header */}
      <div className="container mx-auto px-4 sm:px-6 md:px-12 py-12 sm:py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 sm:gap-8">
          <Reveal>
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <span className="h-[1px] w-6 sm:w-8 bg-studio-gold"></span>
              <span className="text-studio-gold text-[11px] sm:text-[10px] uppercase tracking-wide sm:tracking-ultra font-semibold">
                {t('treatments.label')}
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-studio-black leading-[1.1]">
              {t('treatments.title')}
            </h2>
          </Reveal>

          <Reveal delay={200}>
            <a
              href="#booking-form"
              className="group hidden lg:flex items-center gap-4 text-[10px] uppercase tracking-ultra hover:text-studio-gold transition-colors"
              data-cursor="hover"
            >
              {t('treatments.bookConsultation')}
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" />
            </a>
          </Reveal>
        </div>
      </div>

      {/* Looping Image Train */}
      <div
        className="relative overflow-hidden border-t border-gray-100"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div ref={trackRef} className="flex" style={{ willChange: 'transform' }}>
          {loopedTreatments.map((treatment, index) => (
            <div key={`${treatment.key}-${index}`} className="border-r border-gray-100">
              <TreatmentItem
                number={String((index % treatments.length) + 1).padStart(2, '0')}
                title={t(`treatments.items.${treatment.key}.title`)}
                description={t(`treatments.items.${treatment.key}.description`)}
                image={treatment.image}
                learnMoreText={t('treatments.learnMore')}
                treatmentKey={treatment.key}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile CTA */}
      <div className="container mx-auto px-6 md:px-12 py-10 sm:py-12 lg:hidden">
        <div className="flex justify-center">
          <a
            href="#booking-form"
            className="group flex items-center gap-3 sm:gap-4 text-[11px] sm:text-[10px] uppercase tracking-wide sm:tracking-ultra hover:text-studio-gold transition-colors py-3 px-4"
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
