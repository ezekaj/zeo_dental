import React, { useEffect, useState } from 'react';
import { ArrowLeft, CheckCircle, ArrowRight, Clock, ShieldCheck } from 'lucide-react';
import { SERVICES } from '../constants';
import { useTranslation } from '../hooks/useTranslation';

interface ServiceDetailProps {
  serviceId: string;
  onNavigate: (view: 'home' | 'booking', sectionId?: string, serviceName?: string) => void;
}

const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1600";

export const ServiceDetail: React.FC<ServiceDetailProps> = ({ serviceId, onNavigate }) => {
  const { t, tRaw } = useTranslation();
  const service = SERVICES.find(s => s.id === serviceId);
  const [imgSrc, setImgSrc] = useState<string>(PLACEHOLDER_IMAGE);

  // Update image source when service changes
  useEffect(() => {
    if (service?.image) {
      setImgSrc(service.image);
    } else {
      setImgSrc(PLACEHOLDER_IMAGE);
    }
  }, [service]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceId]);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">{t('services.serviceNotFound')}</h2>
          <button onClick={() => onNavigate('home')} className="text-primary-600 hover:underline">{t('services.returnHome')}</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <div className="relative h-[65vh] overflow-hidden">
        <img 
          src={imgSrc}
          alt={service.title} 
          onError={() => setImgSrc(PLACEHOLDER_IMAGE)}
          className="w-full h-full object-cover"
          loading="eager"
          decoding="async"
          sizes="100vw"
          width={1600}
          height={900}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
          <div className="max-w-7xl mx-auto">
             <button
                onClick={() => onNavigate('home', 'services')}
                className="flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors group"
             >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm font-semibold tracking-wide uppercase">{t('services.backToServices')}</span>
             </button>
             <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 animate-fade-in-up drop-shadow-md">{t(`services.items.${service.id}.title`)}</h1>
             <p className="text-xl md:text-2xl text-slate-100 max-w-3xl font-light leading-relaxed animate-fade-in-up drop-shadow-sm" style={{ animationDelay: '0.1s' }}>
               {t(`services.items.${service.id}.description`)}
             </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-16">
            {/* Overview */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <span className="text-primary-600 font-bold tracking-[0.2em] text-xs uppercase block mb-4">{t('services.overview')}</span>
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-6">{t('services.aboutTreatment')}</h3>
              <p className="text-slate-700 text-lg md:text-xl leading-relaxed font-light">
                {t(`services.items.${service.id}.longDescription`)}
              </p>
            </div>

            {/* Key Benefits */}
            <div className="bg-slate-50 p-10 rounded-3xl border border-slate-100 shadow-sm animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
               <h3 className="text-2xl font-serif font-bold text-slate-900 mb-8">{t('services.keyBenefits')}</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                 {(tRaw<string[]>(`services.items.${service.id}.benefits`) || service.benefits).map((benefit, idx) => (
                   <div key={idx} className="flex items-start gap-4">
                     <div className="bg-white p-1 rounded-full text-primary-500 shadow-sm mt-0.5">
                        <CheckCircle size={18} className="flex-shrink-0" />
                     </div>
                     <span className="text-slate-800 text-lg font-medium">{benefit}</span>
                   </div>
                 ))}
               </div>
            </div>

            {/* The Process */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
               <h3 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-10">{t('services.theProcess')}</h3>
               <div className="space-y-10 relative before:absolute before:inset-0 before:left-[19px] before:top-4 before:h-[calc(100%-24px)] before:w-0.5 before:bg-slate-200">
                  {(tRaw<Array<{title: string; description: string}>>(`services.items.${service.id}.process`) || service.process).map((step, idx) => (
                    <div key={idx} className="relative flex gap-8">
                       <div className="w-10 h-10 rounded-full bg-white border-4 border-primary-100 text-primary-600 font-bold flex items-center justify-center flex-shrink-0 z-10 text-base shadow-sm ring-4 ring-white">
                         {idx + 1}
                       </div>
                       <div className="pt-1">
                          <h4 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h4>
                          <p className="text-slate-600 text-lg leading-relaxed">{step.description}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>

          {/* Sidebar CTA */}
          <div className="lg:col-span-1 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
             <div className="sticky top-32 bg-slate-900 text-white p-8 rounded-3xl shadow-2xl ring-1 ring-white/10">
                <h3 className="text-2xl font-serif font-bold mb-6">{t('services.readyToStart')}</h3>
                <p className="text-slate-300 mb-8 leading-relaxed text-lg font-light">
                  {t('services.bookConsultation').replace('{service}', t(`services.items.${service.id}.title`))}
                </p>
                <div className="space-y-5 mb-10">
                   <div className="flex items-center gap-4 text-slate-200">
                      <Clock size={20} className="text-primary-400" />
                      <span className="font-medium">{t('services.durationVaries')}</span>
                   </div>
                   <div className="flex items-center gap-4 text-slate-200">
                      <ShieldCheck size={20} className="text-primary-400" />
                      <span className="font-medium">{t('services.warrantyProcedures')}</span>
                   </div>
                </div>
                <button
                  onClick={() => onNavigate('booking', undefined, t(`services.items.${service.id}.title`))}
                  className="w-full bg-primary-500 hover:bg-primary-600 text-white font-bold py-4 rounded-2xl transition-all shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_30px_rgba(20,184,166,0.5)] flex items-center justify-center gap-2 text-lg transform hover:-translate-y-0.5"
                >
                  {t('services.bookAppointment')} <ArrowRight size={20} />
                </button>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};