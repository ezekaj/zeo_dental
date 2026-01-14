import React from 'react';
import { Reveal } from './ui/Reveal';
import { TextReveal } from './ui/TextReveal';
import { useTranslation } from '../hooks/useTranslation';

export const Philosophy: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="philosophy" className="py-32 md:py-48 bg-white overflow-hidden">
        <div className="container mx-auto px-6 md:px-12">

            <div className="flex flex-col lg:flex-row gap-20 lg:gap-32">
                {/* Left: Sticky Image */}
                <div className="w-full lg:w-5/12">
                     <div className="lg:sticky lg:top-32">
                        <Reveal>
                            <span className="text-studio-gold text-[10px] uppercase tracking-ultra mb-6 block font-semibold">{t('philosophy.label')}</span>
                            <div className="relative aspect-[3/4] w-full overflow-hidden mb-8">
                                <img
                                    src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2668&auto=format&fit=crop"
                                    alt={t('philosophy.imageAlt')}
                                    className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-[1.5s] ease-out hover:scale-105"
                                />
                                <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/90 backdrop-blur-sm opacity-0 hover:opacity-100 transition-opacity duration-500">
                                    <p className="font-serif italic text-lg text-studio-black">"{t('philosophy.quote')}"</p>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>

                {/* Right: Scrolling Text */}
                <div className="w-full lg:w-7/12 flex flex-col justify-center">
                    <div className="font-serif text-3xl md:text-5xl lg:text-6xl leading-[1.2] text-studio-black space-y-24">
                        <div className="border-l border-studio-gold pl-8 md:pl-12">
                             <TextReveal>
                                {t('philosophy.text1')}
                            </TextReveal>
                        </div>

                        <div className="pl-8 md:pl-12">
                             <TextReveal>
                                {t('philosophy.text2')}
                            </TextReveal>
                        </div>

                        <div className="pl-8 md:pl-12 pt-12">
                            <Reveal delay={200}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-gray-100 pt-12">
                                    <div>
                                        <h4 className="font-sans text-[10px] uppercase tracking-ultra text-studio-gray mb-3">{t('philosophy.expertise')}</h4>
                                        <ul className="space-y-2 font-serif text-lg md:text-xl">
                                            <li>{t('philosophy.expertiseList.item1')}</li>
                                            <li>{t('philosophy.expertiseList.item2')}</li>
                                            <li>{t('philosophy.expertiseList.item3')}</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-sans text-[10px] uppercase tracking-ultra text-studio-gray mb-3">{t('philosophy.technology')}</h4>
                                        <ul className="space-y-2 font-serif text-lg md:text-xl">
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
