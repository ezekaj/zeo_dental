import React from 'react';
import { SERVICES } from '../constants';
import { useTranslation } from '../hooks/useTranslation';
import { 
  Sparkles, 
  Anchor, 
  Smile, 
  HeartPulse, 
  Activity, 
  Baby, 
  ArrowRight 
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  Sparkles,
  Anchor,
  Smile,
  HeartPulse,
  Activity,
  Baby
};

interface ServicesProps {
  onNavigate?: (view: 'home' | 'booking' | 'service-detail', sectionId?: string, serviceParam?: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onNavigate }) => {
  const { t } = useTranslation();

  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-primary-600 font-semibold tracking-widest text-xs uppercase mb-3">{t('services.label')}</h2>
          <h3 className="text-4xl font-serif font-bold text-slate-900 mb-6">{t('services.title')}</h3>
          <p className="text-slate-500 max-w-2xl mx-auto font-light text-lg">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => {
            const IconComponent = ICON_MAP[service.iconName] || Activity;

            return (
              <div 
                key={service.id}
                className="group p-8 border border-slate-100 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-primary-600 mb-6 shadow-sm group-hover:bg-primary-600 group-hover:text-white group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
                  <IconComponent size={28} strokeWidth={1.5} />
                </div>
                <h4 className="text-xl font-serif font-semibold text-slate-900 mb-3">{t(`services.items.${service.id}.title`)}</h4>
                <p className="text-slate-500 leading-relaxed text-sm">
                  {t(`services.items.${service.id}.description`)}
                </p>
                <button 
                  onClick={() => onNavigate && onNavigate('service-detail', undefined, service.id)}
                  className="inline-flex items-center mt-6 text-primary-600 font-medium text-sm hover:text-primary-700 transition-colors focus:outline-none"
                >
                  {t('services.learnMore')} <ArrowRight size={14} className="ml-1 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};