import React, { useState } from 'react';
import { Reveal } from './ui/Reveal';
import { useTranslation } from '../hooks/useTranslation';
import { ArrowRight } from 'lucide-react';

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
  index
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className="group relative overflow-hidden bg-white cursor-pointer"
      data-cursor="hover"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        {!imageError ? (
          <img
            src={image}
            alt={title}
            className={`w-full h-full object-cover transition-all duration-700 ease-[0.22,1,0.36,1] group-hover:scale-105 ${
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

  const treatments = [
    {
      key: 'implantology',
      image: '/images/treatments/implantology.jpg',
    },
    {
      key: 'prosthetics',
      image: '/images/treatments/prosthetics.jpg',
    },
    {
      key: 'aligners',
      image: '/images/treatments/aligners.jpg',
    },
    {
      key: 'orthodontics',
      image: '/images/treatments/orthodontics.jpg',
    },
    {
      key: 'crowns',
      image: '/images/treatments/crowns.jpg',
    },
    {
      key: 'aesthetics',
      image: '/images/treatments/aesthetics.jpg',
    },
  ];

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
            <a
              href="#booking"
              className="group hidden lg:flex items-center gap-4 text-[10px] uppercase tracking-ultra hover:text-studio-gold transition-colors"
              data-cursor="hover"
            >
              {t('treatments.bookConsultation')}
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" />
            </a>
          </Reveal>
        </div>

        {/* Treatment Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {treatments.map((treatment, index) => (
            <Reveal key={treatment.key} delay={index * 100}>
              <TreatmentCard
                number={String(index + 1).padStart(2, '0')}
                title={t(`treatments.items.${treatment.key}.title`)}
                description={t(`treatments.items.${treatment.key}.description`)}
                image={treatment.image}
                index={index}
              />
            </Reveal>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-12 lg:hidden flex justify-center">
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
