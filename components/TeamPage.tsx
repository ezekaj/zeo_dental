import React from 'react';
import { ArrowLeft, ArrowRight, GraduationCap, Award, Quote } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { useScrollColorize } from '../hooks/useScrollColorize';
import { Header } from './Header';
import { Booking } from './Booking';
import { ChatWidget } from './ChatWidget';
import { WhatsAppButton } from './WhatsAppButton';
import { DOCTORS } from '../constants';

// Individual team member card with scroll-based colorization
interface TeamMemberCardProps {
  member: (typeof DOCTORS)[0];
  t: (key: string) => string;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member, t }) => {
  const [cardRef, shouldColorize] = useScrollColorize<HTMLDivElement>(0.4);

  return (
    <div
      ref={cardRef}
      className="bg-white border border-gray-100 hover:border-studio-gold/30 transition-colors"
    >
      <div className="flex flex-col sm:flex-row">
        {/* Image */}
        <div className="w-full sm:w-2/5 aspect-square sm:aspect-auto overflow-hidden group">
          <picture>
            <source srcSet={member.image} type="image/webp" />
            <source srcSet={member.image.replace('.webp', '.jpg')} type="image/jpeg" />
            <img
              src={member.image.replace('.webp', '.jpg')}
              alt={member.name}
              className={`w-full h-full object-cover group-hover:grayscale-0 transition-all duration-1000 ${
                shouldColorize ? 'grayscale-0' : 'grayscale'
              }`}
              style={
                member.id === 'dr-rien' || member.id === 'dr-kristi'
                  ? { objectPosition: '7% center' }
                  : { objectPosition: 'center' }
              }
            />
          </picture>
        </div>

        {/* Content */}
        <div className="w-full sm:w-3/5 p-6 sm:p-8 flex flex-col justify-center">
          <h3 className="font-serif text-xl sm:text-2xl text-studio-black mb-2">
            {member.name}
          </h3>
          <p className="text-studio-gold text-xs uppercase tracking-wider mb-4">
            {t(`team.doctors.${member.id}.role`)}
          </p>
          <div
            className="text-studio-gray text-sm leading-relaxed mb-6 [&_strong]:font-semibold"
            dangerouslySetInnerHTML={{
              __html: t(`team.doctors.${member.id}.bio`),
            }}
          />

          {/* Education */}
          <div className="pt-4 border-t border-gray-100">
            <p className="text-[10px] text-studio-gray uppercase tracking-ultra mb-2">
              {t('team.education')}
            </p>
            <p className="font-serif text-sm">{t(`team.doctors.${member.id}.education1`)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const TeamPage: React.FC = () => {
  const { t } = useTranslation();
  const founder = DOCTORS[0];
  const team = DOCTORS.slice(1);
  const [founderRef, shouldColorizeFounder] = useScrollColorize<HTMLDivElement>(0.3);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center bg-studio-black">
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-3 h-full">
            {DOCTORS.map((doctor, i) => (
              <div key={i} className="relative overflow-hidden">
                <img
                  src={doctor.image}
                  alt=""
                  className="w-full h-full object-cover grayscale"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-studio-black via-studio-black/90 to-studio-black" />

        {/* Content */}
        <div className="relative container mx-auto px-4 sm:px-6 md:px-12 pt-32 pb-16">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm uppercase tracking-wider">{t('services.backToServices')}</span>
          </a>

          <div className="max-w-4xl">
            <span className="text-studio-gold text-[11px] sm:text-[10px] uppercase tracking-wide sm:tracking-ultra mb-4 block font-semibold">
              {t('team.label')}
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6 leading-[1.1]">
              {t('teamPage.title')}
            </h1>
            <p className="text-white/70 text-lg sm:text-xl md:text-2xl leading-relaxed max-w-3xl">
              {t('teamPage.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-16 sm:py-24 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
            {/* Image */}
            <div className="w-full lg:w-5/12">
              <div ref={founderRef} className="relative aspect-[3/4] overflow-hidden group">
                <picture>
                  <source srcSet={founder.image} type="image/webp" />
                  <source srcSet={founder.image.replace('.webp', '.jpg')} type="image/jpeg" />
                  <img
                    src={founder.image.replace('.webp', '.jpg')}
                    alt={founder.name}
                    className={`w-full h-full object-cover object-center group-hover:grayscale-0 transition-all duration-[1.5s] ease-out ${
                      shouldColorizeFounder ? 'grayscale-0' : 'grayscale'
                    }`}
                  />
                </picture>
                <div className="absolute inset-0 border border-white/20 m-4 pointer-events-none" />
              </div>
            </div>

            {/* Content */}
            <div className="w-full lg:w-7/12">
              <div className="flex items-center gap-3 mb-6">
                <span className="h-[1px] w-8 bg-studio-gold" />
                <span className="text-studio-gold text-[11px] uppercase tracking-wide font-semibold">
                  {t('team.founderLabel')}
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-studio-black mb-4 leading-[0.95]">
                {founder.name}
              </h2>
              <p className="text-studio-gold text-sm uppercase tracking-wider mb-8">
                {t(`team.doctors.${founder.id}.role`)}
              </p>

              <div
                className="font-serif text-lg sm:text-xl text-studio-black mb-8 leading-relaxed opacity-80 [&_strong]:font-bold [&_strong]:text-studio-black"
                dangerouslySetInnerHTML={{
                  __html: t(`team.doctors.${founder.id}.fullBio`),
                }}
              />

              {/* Education & Memberships */}
              <div className="grid md:grid-cols-2 gap-8 pt-8 border-t border-gray-100">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <GraduationCap size={18} className="text-studio-gold" />
                    <span className="text-[11px] text-studio-gray uppercase tracking-ultra">
                      {t('team.education')}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <p className="font-serif text-sm sm:text-base">{t(`team.doctors.${founder.id}.education1`)}</p>
                    <p className="font-serif text-sm sm:text-base">{t(`team.doctors.${founder.id}.education2`)}</p>
                    <p className="font-serif text-sm sm:text-base">{t(`team.doctors.${founder.id}.education3`)}</p>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Award size={18} className="text-studio-gold" />
                    <span className="text-[11px] text-studio-gray uppercase tracking-ultra">
                      {t('team.memberships')}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <p className="font-serif text-sm sm:text-base">{t(`team.doctors.${founder.id}.membership1`)}</p>
                    <p className="font-serif text-sm sm:text-base">{t(`team.doctors.${founder.id}.membership2`)}</p>
                    <p className="font-serif text-sm sm:text-base">{t(`team.doctors.${founder.id}.membership3`)}</p>
                  </div>
                </div>
              </div>

              {/* Quote */}
              <div className="mt-10 pt-8 border-t border-gray-100 flex gap-4">
                <Quote className="text-studio-gold flex-shrink-0 opacity-50" size={32} />
                <p className="font-serif italic text-studio-gray text-lg leading-relaxed">
                  {t(`team.doctors.${founder.id}.quote`)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 lg:mb-16 gap-4">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="h-[1px] w-8 bg-studio-gold" />
                <span className="text-studio-gold text-[11px] uppercase tracking-wide font-semibold">
                  {t('team.teamSubtitle')}
                </span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-studio-black">
                {t('team.teamTitle')}
              </h3>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {team.map((member) => (
              <TeamMemberCard key={member.id} member={member} t={t} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-studio-black text-white">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl mb-6">
            {t('teamPage.ctaTitle')}
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-10">
            {t('teamPage.ctaSubtitle')}
          </p>
          <a
            href="#booking-form"
            className="inline-flex items-center gap-3 bg-studio-gold text-white px-8 py-4 text-sm uppercase tracking-wider hover:bg-studio-gold/90 transition-colors"
          >
            {t('services.bookAppointment')}
            <ArrowRight size={18} />
          </a>
        </div>
      </section>

      {/* Booking Section */}
      <Booking />

      {/* Widgets */}
      <ChatWidget />
      <WhatsAppButton />
    </div>
  );
};

export default TeamPage;
