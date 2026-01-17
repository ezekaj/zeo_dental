import React from 'react';
import { Reveal } from './ui/Reveal';
import { DOCTORS } from '../constants';
import { useTranslation } from '../hooks/useTranslation';

export const Team: React.FC = () => {
    const { t } = useTranslation();
    const founder = DOCTORS[0];
    const team = DOCTORS.slice(1);

    return (
        <section id="team" className="py-32 bg-white relative">
            <div className="container mx-auto px-6 md:px-12">

                {/* Founder Section */}
                <div className="flex flex-col lg:flex-row gap-16 items-center mb-32 border-b border-gray-100 pb-24">
                    <div className="w-full lg:w-5/12">
                        <Reveal>
                            <div className="relative aspect-[3/4] overflow-hidden group">
                                <picture>
                                  <source srcSet={founder.image} type="image/webp" />
                                  <source srcSet={founder.image.replace('.webp', '.jpg')} type="image/jpeg" />
                                  <img
                                      src={founder.image.replace('.webp', '.jpg')}
                                      alt={founder.name}
                                      className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-[1.5s] ease-out"
                                  />
                                </picture>
                                {/* Overlay Accent */}
                                <div className="absolute inset-0 border border-white/20 m-4 z-10 pointer-events-none"></div>
                            </div>
                        </Reveal>
                    </div>
                    <div className="w-full lg:w-7/12 lg:pl-12">
                         <Reveal delay={200}>
                            <div className="flex items-center gap-4 mb-8">
                                <span className="h-[1px] w-8 bg-studio-gold"></span>
                                <span className="text-studio-gold text-[10px] uppercase tracking-ultra font-semibold">{t('team.founderLabel')}</span>
                            </div>

                            <h2 className="font-serif text-4xl md:text-7xl text-studio-black mb-6 md:mb-8 leading-[0.9]">
                                {founder.name}
                            </h2>

                            <p
                                className="font-serif text-lg md:text-2xl text-studio-black mb-8 md:mb-10 leading-relaxed opacity-80 max-w-2xl [&_strong]:font-bold [&_strong]:text-studio-black"
                                dangerouslySetInnerHTML={{
                                    __html: t(`team.doctors.${founder.id}.bio`)
                                }}
                            />

                            <div className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-16">
                                <div>
                                    <span className="text-[10px] text-studio-gray uppercase tracking-ultra block mb-2">{t('team.education')}</span>
                                    <div className="font-serif text-base md:text-lg space-y-1">
                                        <p>{t(`team.doctors.${founder.id}.education1`)}</p>
                                        <p>{t(`team.doctors.${founder.id}.education2`)}</p>
                                        <p>{t(`team.doctors.${founder.id}.education3`)}</p>
                                    </div>
                                </div>
                                <div>
                                    <span className="text-[10px] text-studio-gray uppercase tracking-ultra block mb-2">{t('team.memberships')}</span>
                                    <div className="font-serif text-base md:text-lg space-y-1">
                                        <p>{t(`team.doctors.${founder.id}.membership1`)}</p>
                                        <p>{t(`team.doctors.${founder.id}.membership2`)}</p>
                                        <p>{t(`team.doctors.${founder.id}.membership3`)}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 pt-8 border-t border-gray-100">
                                <p className="font-serif italic text-studio-gray text-lg">
                                    &ldquo;{t(`team.doctors.${founder.id}.quote`)}&rdquo;
                                </p>
                            </div>
                        </Reveal>
                    </div>
                </div>

                {/* Team Grid */}
                <div>
                    <Reveal>
                         <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 md:mb-16 gap-4">
                            <h3 className="font-serif text-2xl md:text-3xl text-studio-black">{t('team.teamTitle')}</h3>
                            <span className="text-[10px] uppercase tracking-ultra text-studio-gray">{t('team.teamSubtitle')}</span>
                        </div>
                    </Reveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-8 gap-y-16">
                        {team.map((member, idx) => (
                            <Reveal key={member.id} delay={idx * 100}>
                                <div className="group cursor-pointer">
                                    <div className="aspect-[3/4] overflow-hidden mb-6 relative bg-gray-50">
                                        <picture>
                                          <source srcSet={member.image} type="image/webp" />
                                          <source srcSet={member.image.replace('.webp', '.jpg')} type="image/jpeg" />
                                          <img
                                              src={member.image.replace('.webp', '.jpg')}
                                              alt={member.name}
                                              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 ease-out group-hover:scale-105"
                                              style={
                                                  member.id === 'dr-rien' || member.id === 'dr-kristi'
                                                    ? { objectPosition: '7% center' }
                                                    : { objectPosition: 'center' }
                                              }
                                          />
                                        </picture>
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500"></div>
                                    </div>
                                    <div className="flex flex-col items-center text-center">
                                        <h3 className="font-serif text-2xl text-studio-black mb-2 group-hover:text-studio-gold transition-colors duration-300">{member.name}</h3>
                                        <div className="h-[1px] w-6 bg-gray-200 mb-2 group-hover:w-12 transition-all duration-500"></div>
                                        <p className="text-[10px] uppercase tracking-ultra text-studio-gray">{t(`team.doctors.${member.id}.role`)}</p>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};
