import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { DOCTORS } from '../constants';
import { X, Award, GraduationCap, User, ArrowRight } from 'lucide-react';
import { Doctor } from '../types';
import { useTranslation } from '../hooks/useTranslation';

export const Team: React.FC = () => {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const { t } = useTranslation();

  const Modal = () => (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 font-sans" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={() => setSelectedDoctor(null)}
      ></div>
      
      {/* Modal Card */}
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative z-10 animate-fade-in-scale shadow-2xl flex flex-col md:flex-row overflow-hidden">
        
        <button 
          onClick={() => setSelectedDoctor(null)}
          className="absolute top-4 right-4 z-50 p-2 rounded-full transition-all duration-200 
                     bg-black/20 text-white backdrop-blur-md border border-white/20 hover:bg-black/40
                     md:bg-slate-100 md:text-slate-500 md:border-none md:hover:bg-slate-200 md:hover:text-slate-900"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        {/* Image Side */}
        <div className="w-full md:w-5/12 h-64 md:h-auto relative flex-shrink-0 bg-slate-100">
           <picture>
             <source
               srcSet={
                 selectedDoctor?.image.includes('-card.webp')
                   ? selectedDoctor.image.replace('-card.webp', '-modal.webp')
                   : selectedDoctor?.image
               }
               type="image/webp"
             />
             <source
               srcSet={
                 selectedDoctor?.image.includes('-card.webp')
                   ? selectedDoctor.image.replace('-card.webp', '-modal.jpg')
                   : selectedDoctor?.image.replace('w=1600', 'w=2000')
               }
               type="image/jpeg"
             />
             <img
               src={
                 selectedDoctor?.image.includes('-card.webp')
                   ? selectedDoctor.image.replace('-card.webp', '-modal.jpg')
                   : selectedDoctor?.image.replace('w=1600', 'w=2000')
               }
               alt={selectedDoctor?.name}
               className="w-full h-full object-cover object-center"
             />
           </picture>
           <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent md:hidden"></div>
           <div className="absolute bottom-4 left-4 text-white md:hidden">
              <h3 className="text-2xl font-serif font-bold">{selectedDoctor?.name}</h3>
              <p className="text-primary-300 text-sm font-medium">{selectedDoctor && t(`team.doctors.${selectedDoctor.id}.role`)}</p>
           </div>
        </div>

        {/* Content Side */}
        <div className="w-full md:w-7/12 p-8 md:p-12 bg-white overflow-y-auto">
           <div className="hidden md:block mb-6">
              <h3 className="text-3xl font-serif font-bold text-slate-900 mb-2">{selectedDoctor?.name}</h3>
              <p className="text-primary-600 font-medium tracking-wide uppercase">{selectedDoctor && t(`team.doctors.${selectedDoctor.id}.role`)}</p>
           </div>

           <div className="space-y-6">
             <div>
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <User className="text-primary-500" size={18} /> {t('team.biography')}
                </h4>
                <p className="text-slate-600 leading-relaxed text-lg font-light">
                    {selectedDoctor && t(`team.doctors.${selectedDoctor.id}.fullBio`)}
                </p>
             </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                <div>
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <GraduationCap className="text-primary-500" size={18} /> {t('team.education')}
                    </h4>
                    <ul className="text-sm text-slate-600 space-y-2">
                        <li>{t('team.educationPlaceholder1')}</li>
                        <li>{t('team.educationPlaceholder2')}</li>
                        <li>{t('team.educationPlaceholder3')}</li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <Award className="text-primary-500" size={18} /> {t('team.memberships')}
                    </h4>
                    <ul className="text-sm text-slate-600 space-y-2">
                        <li>{t('team.membershipPlaceholder1')}</li>
                        <li>{t('team.membershipPlaceholder2')}</li>
                        <li>{t('team.membershipPlaceholder3')}</li>
                    </ul>
                </div>
             </div>
           </div>
           
           <div className="mt-8 pt-6 border-t border-slate-100">
               <p className="text-slate-400 italic text-sm">{t('team.quote')}</p>
           </div>
        </div>

      </div>
    </div>
  );

  return (
    <div className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-primary-600 font-semibold tracking-widest text-xs uppercase mb-3">{t('team.label')}</h2>
          <h3 className="text-4xl font-serif font-bold text-slate-900">{t('team.title')}</h3>
        </div>

        {/* Founder - Featured at top */}
        {DOCTORS[0] && (
          <div className="max-w-2xl mx-auto mb-12">
            <div
              onClick={() => setSelectedDoctor(DOCTORS[0])}
              className="group bg-white rounded-t-full rounded-b-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer flex flex-col"
            >
              <div className="aspect-[4/5] overflow-hidden relative">
                <div className="absolute inset-0 bg-primary-900/0 group-hover:bg-primary-900/20 transition-all duration-500 z-10 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 text-white font-semibold tracking-wide transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">{t('team.viewProfile')}</span>
                </div>
                <picture>
                  <source srcSet={DOCTORS[0].image} type="image/webp" />
                  <source
                    srcSet={DOCTORS[0].image.replace('.webp', '.jpg').replace('?auto=format', '')}
                    type="image/jpeg"
                  />
                  <img
                    src={DOCTORS[0].image.replace('.webp', '.jpg').replace('?auto=format', '')}
                    alt={DOCTORS[0].name}
                    loading="eager"
                    decoding="async"
                    width="800"
                    height="1000"
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                  />
                </picture>
              </div>
              <div className="p-10 text-center relative z-20 bg-white flex-grow flex flex-col items-center">
                <h4 className="text-3xl font-serif font-bold text-slate-900 mb-2">{DOCTORS[0].name}</h4>
                <p className="text-primary-600 font-medium text-base uppercase tracking-wider mb-6">{t(`team.doctors.${DOCTORS[0].id}.role`)}</p>
                <p className="text-slate-500 text-base leading-relaxed mb-8 line-clamp-4">
                  {t(`team.doctors.${DOCTORS[0].id}.bio`)}
                </p>
                <button className="mt-auto text-primary-600 text-sm font-semibold hover:text-primary-700 flex items-center gap-1 transition-colors group/btn">
                    {t('team.readFullBio')} <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Team Members - Grid below founder */}
        {DOCTORS.length > 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {DOCTORS.slice(1).map((doctor) => (
              <div
                key={doctor.id}
                onClick={() => setSelectedDoctor(doctor)}
                className="group bg-white rounded-t-full rounded-b-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer flex flex-col"
              >
                <div className="aspect-[4/5] overflow-hidden relative">
                  <div className="absolute inset-0 bg-primary-900/0 group-hover:bg-primary-900/20 transition-all duration-500 z-10 flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 text-white font-semibold tracking-wide transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">{t('team.viewProfile')}</span>
                  </div>
                  <picture>
                    <source srcSet={doctor.image} type="image/webp" />
                    <source
                      srcSet={doctor.image.replace('.webp', '.jpg').replace('?auto=format', '')}
                      type="image/jpeg"
                    />
                    <img
                      src={doctor.image.replace('.webp', '.jpg').replace('?auto=format', '')}
                      alt={doctor.name}
                      loading="lazy"
                      decoding="async"
                      width="800"
                      height="1000"
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                    />
                  </picture>
                </div>
                <div className="p-8 text-center relative z-20 bg-white flex-grow flex flex-col items-center">
                  <h4 className="text-2xl font-serif font-bold text-slate-900 mb-1">{doctor.name}</h4>
                  <p className="text-primary-600 font-medium text-sm uppercase tracking-wider mb-4">{t(`team.doctors.${doctor.id}.role`)}</p>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3">
                    {t(`team.doctors.${doctor.id}.bio`)}
                  </p>
                  <button className="mt-auto text-primary-600 text-sm font-semibold hover:text-primary-700 flex items-center gap-1 transition-colors group/btn">
                      {t('team.readFullBio')} <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Render Modal via Portal to avoid z-index/transform issues */}
      {selectedDoctor && createPortal(<Modal />, document.body)}
    </div>
  );
};