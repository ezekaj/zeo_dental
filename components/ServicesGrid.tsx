import React from 'react';
import { Reveal } from './ui/Reveal';
import { useTranslation } from '../hooks/useTranslation';

const SERVICES = [
  { key: 'excellence', icon: 'diamond' },
  { key: 'personalization', icon: 'user' },
  { key: 'comfort', icon: 'coffee' },
  { key: 'privacy', icon: 'lock' },
];

export const ServicesGrid: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="services" className="bg-white border-b border-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {SERVICES.map((service, index) => (
          <div
            key={service.key}
            className="group relative border-r border-b border-gray-100 lg:last:border-r-0 md:nth-child-2:border-r-0 lg:nth-child-2:border-r p-8 md:p-10 lg:p-12 xl:p-16 h-[400px] md:h-[450px] lg:h-[500px] flex flex-col justify-between transition-all duration-700 hover:bg-[#FAFAFA]"
            data-cursor="hover"
          >
            <Reveal delay={index * 100}>
              {/* Header */}
              <div className="flex justify-between items-start w-full">
                <span className="font-serif text-lg md:text-xl italic text-gray-300 group-hover:text-studio-gold transition-colors duration-500">
                  {String(index + 1).padStart(2, '0')}
                </span>
                {/* Minimal decorative line */}
                <div className="w-8 h-[1px] bg-gray-200 group-hover:bg-studio-gold transition-colors duration-500 origin-right transform scale-x-50 group-hover:scale-x-100"></div>
              </div>

              {/* Content */}
              <div className="mt-auto relative z-10">
                <h3 className="font-serif text-2xl md:text-3xl text-studio-black mb-4 md:mb-6 group-hover:translate-x-2 transition-transform duration-700 ease-[0.19,1,0.22,1]">
                  {t(`services.${service.key}.title`)}
                </h3>

                <div className="overflow-hidden">
                  <p className="font-sans text-xs text-studio-gray font-medium leading-loose max-w-[240px] opacity-60 group-hover:opacity-100 transition-all duration-700 transform translate-y-4 group-hover:translate-y-0">
                    {t(`services.${service.key}.description`)}
                  </p>
                </div>
              </div>

              {/* Hover overlay for subtle depth */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  );
};
