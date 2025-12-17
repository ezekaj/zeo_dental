import React from 'react';
import { Star, ShieldCheck, Clock } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

export const WhyChooseUs: React.FC = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: Star,
      title: t('whyChooseUs.feature1Title'),
      desc: t('whyChooseUs.feature1Desc')
    },
    {
      icon: ShieldCheck,
      title: t('whyChooseUs.feature2Title'),
      desc: t('whyChooseUs.feature2Desc')
    },
    {
      icon: Clock,
      title: t('whyChooseUs.feature3Title'),
      desc: t('whyChooseUs.feature3Desc')
    }
  ];

  return (
    <div className="py-24 bg-slate-900 relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-800/30 transform skew-x-12 translate-x-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-primary-400 font-semibold tracking-widest text-xs uppercase mb-3">{t('whyChooseUs.label')}</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold text-white mb-8 leading-tight">
              {t('whyChooseUs.title')} <br/> <span className="text-primary-400">{t('whyChooseUs.titleHighlight')}</span>
            </h3>
            <p className="text-slate-300 text-lg font-light mb-8 leading-relaxed">
              {t('whyChooseUs.subtitle')}
            </p>

            <div className="space-y-6">
              {features.map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-primary-400">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg">{item.title}</h4>
                    <p className="text-slate-400 text-sm mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-primary-500/20 rounded-2xl blur-lg"></div>
            <img
              src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800"
              alt="Advanced Dental Technology"
              className="relative rounded-2xl shadow-2xl w-full object-cover h-[600px]"
            />
            <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-md p-6 rounded-xl shadow-lg">
                <p className="font-serif text-slate-900 text-xl italic">{t('whyChooseUs.testimonialQuote')}</p>
                <div className="flex items-center gap-2 mt-4">
                    <div className="w-8 h-8 rounded-full bg-slate-200"></div>
                    <span className="text-sm font-semibold text-slate-600">{t('whyChooseUs.testimonialSource')}</span>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};