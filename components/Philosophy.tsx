import React from 'react';
import { Reveal } from './ui/Reveal';
import { TextReveal } from './ui/TextReveal';
import { useTranslation } from '../hooks/useTranslation';

export const Philosophy: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="philosophy" className="py-16 sm:py-24 md:py-32 lg:py-48 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-12 sm:gap-16 lg:gap-32">
          {/* Left: Sticky Image */}
          <div className="w-full lg:w-5/12">
            <div className="lg:sticky lg:top-32">
              <Reveal>
                <span className="text-studio-gold text-[11px] sm:text-[10px] uppercase tracking-wide sm:tracking-ultra mb-4 sm:mb-6 block font-semibold">
                  {t('philosophy.label')}
                </span>
                <div className="relative aspect-[3/4] w-full overflow-hidden mb-6 sm:mb-8">
                  <img
                    src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2668&auto=format&fit=crop"
                    alt={t('philosophy.imageAlt')}
                    className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-[1.5s] ease-out hover:scale-105"
                  />
                  <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 p-4 sm:p-6 bg-white/90 backdrop-blur-sm opacity-0 hover:opacity-100 transition-opacity duration-500">
                    <p className="font-serif italic text-base sm:text-lg text-studio-black">
                      &ldquo;{t('philosophy.quote')}&rdquo;
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Right: Scrolling Text */}
          <div className="w-full lg:w-7/12 flex flex-col justify-center">
            <div className="font-serif text-2xl sm:text-3xl md:text-5xl lg:text-6xl leading-[1.2] text-studio-black space-y-12 sm:space-y-16 md:space-y-24">
              <div className="border-l border-studio-gold pl-6 sm:pl-8 md:pl-12">
                <TextReveal>{t('philosophy.text1')}</TextReveal>
              </div>

              <div className="pl-6 sm:pl-8 md:pl-12">
                <TextReveal>{t('philosophy.text2')}</TextReveal>
              </div>

              <div className="pl-6 sm:pl-8 md:pl-12 pt-8 sm:pt-12">
                <Reveal delay={200}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 border-t border-gray-100 pt-8 sm:pt-12">
                    <div>
                      <h4 className="font-sans text-[11px] sm:text-[10px] uppercase tracking-wide sm:tracking-ultra text-studio-gray mb-3">
                        {t('philosophy.expertise')}
                      </h4>
                      <ul className="space-y-2 font-serif text-base sm:text-lg md:text-xl">
                        <li>{t('philosophy.expertiseList.item1')}</li>
                        <li>{t('philosophy.expertiseList.item2')}</li>
                        <li>{t('philosophy.expertiseList.item3')}</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-sans text-[11px] sm:text-[10px] uppercase tracking-wide sm:tracking-ultra text-studio-gray mb-3">
                        {t('philosophy.technology')}
                      </h4>
                      <ul className="space-y-2 font-serif text-base sm:text-lg md:text-xl">
                        <li>{t('philosophy.technologyList.item1')}</li>
                        <li>{t('philosophy.technologyList.item2')}</li>
                        <li>{t('philosophy.technologyList.item3')}</li>
                      </ul>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
