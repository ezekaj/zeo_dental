import React, { useState, useEffect } from 'react';
import { SERVICES } from '../constants';
import { Calendar, Clock, User, Mail, Phone, CheckCircle, Loader2, ChevronDown, ArrowLeft } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

interface BookingSectionProps {
  onNavigate?: (view: 'home' | 'booking', sectionId?: string) => void;
  initialService?: string;
}

export const BookingSection: React.FC<BookingSectionProps> = ({ onNavigate, initialService }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    service: ''
  });
  
  const [status, setStatus] = useState<'IDLE' | 'SUBMITTING' | 'SUCCESS' | 'ERROR'>('IDLE');

  // Auto-fill service if passed from navigation
  useEffect(() => {
    if (initialService) {
      setFormData(prev => ({ ...prev, service: initialService }));
    }
  }, [initialService]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('SUBMITTING');

    const API_BASE = import.meta.env.DEV ? 'http://localhost:3000' : '';

    try {
      const response = await fetch(`${API_BASE}/api/booking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        console.error('Booking error:', data.error || data.message);
        setStatus('ERROR');
        return;
      }

      setStatus('SUCCESS');
      console.log('Booking created:', data.booking);
    } catch (error) {
      console.error('Booking submission error:', error);
      setStatus('ERROR');
    }
  };

  if (status === 'SUCCESS') {
    return (
      <div className="min-h-screen pt-24 pb-12 bg-slate-50 flex items-center justify-center">
        <div className="max-w-xl w-full mx-4">
          <div className="bg-white rounded-3xl p-12 shadow-2xl text-center border border-slate-100 animate-fade-in-up">
            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8 text-green-500 animate-fade-in-scale">
              <CheckCircle size={48} />
            </div>
            <h3 className="text-3xl font-serif font-bold text-slate-900 mb-4">{t('booking.success')}</h3>
            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
              {t('booking.successMessage').replace('{name}', formData.name)}
              <br/>
              {t('booking.confirmationEmail')} <span className="font-semibold text-slate-900">{formData.email}</span>.
            </p>

            {/* Appointment Details Summary */}
            <div className="bg-primary-50 rounded-2xl p-8 mb-8 text-left border border-primary-100 shadow-sm relative overflow-hidden group">
                <div className="absolute -right-6 -top-6 text-primary-100 opacity-50 transform rotate-12 group-hover:scale-110 transition-transform duration-500">
                    <CheckCircle size={120} />
                </div>
                <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div>
                        <p className="text-xs font-bold text-primary-700 uppercase tracking-widest mb-2">{t('booking.serviceRequested')}</p>
                        <p className="font-serif font-bold text-slate-900 text-2xl leading-tight">{formData.service}</p>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-primary-700 uppercase tracking-widest mb-2">{t('booking.preferredTime')}</p>
                        <p className="font-serif font-bold text-slate-900 text-xl leading-tight">
                           {formData.date} 
                           <span className="block text-sm font-sans font-medium text-slate-600 capitalize mt-1 flex items-center gap-1">
                             <Clock size={14} /> {formData.time}
                           </span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
              <button 
                onClick={() => {
                  setStatus('IDLE');
                  setFormData({ name: '', email: '', phone: '', date: '', time: '', service: '' });
                }}
                className="w-full py-4 rounded-xl bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 transition-colors"
              >
                {t('booking.bookAnother')}
              </button>
              {onNavigate && (
                <button
                  onClick={() => onNavigate('home')}
                  className="w-full py-3 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
                >
                  {t('booking.returnHome')}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const inputClasses = "w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 focus:shadow-md outline-none transition-all duration-200";
  const selectClasses = "w-full pl-4 pr-10 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 focus:shadow-md outline-none transition-all duration-200 appearance-none cursor-pointer text-slate-700";
  const selectWithIconClasses = "w-full pl-12 pr-10 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 focus:shadow-md outline-none transition-all duration-200 appearance-none cursor-pointer text-slate-700";

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row pt-20">
      {/* Left Side: Visual & Context */}
      <div className="lg:w-5/12 relative hidden lg:flex flex-col justify-between p-12 bg-slate-900 text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-60">
           <img 
             src="https://images.unsplash.com/photo-1600170311833-c2cf5280ce49?auto=format&fit=crop&q=80&w=1200" 
             alt="Luxury Dental Clinic Waiting Area" 
             className="w-full h-full object-cover"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-8 cursor-pointer group" onClick={() => onNavigate && onNavigate('home')}>
             <ArrowLeft className="group-hover:-translate-x-1 transition-transform" />
             <span className="font-medium tracking-wide">{t('booking.backToHome')}</span>
          </div>
          <h2 className="text-primary-400 font-medium tracking-widest text-xs uppercase mb-4">{t('booking.conciergeTitle')}</h2>
          <h1 className="text-4xl xl:text-5xl font-serif font-bold leading-tight mb-6">
            {t('booking.conciergeSubtitle')}
          </h1>
          <p className="text-slate-300 text-lg font-light leading-relaxed max-w-md">
             {t('booking.conciergeDesc')}
          </p>
        </div>

        <div className="relative z-10 mt-12">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                        <Phone size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-slate-300 uppercase tracking-wider">{t('booking.directLine')}</p>
                        <p className="text-xl font-bold">{t('contact.phone')}</p>
                    </div>
                </div>
                <p className="text-xs text-slate-400">{t('booking.availability')}</p>
            </div>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="lg:w-7/12 w-full flex-1 bg-white overflow-y-auto">
        <div className="max-w-2xl mx-auto px-6 py-12 lg:py-24">
            <div className="mb-10 lg:hidden">
                 <button onClick={() => onNavigate && onNavigate('home')} className="flex items-center gap-2 text-slate-500 mb-6">
                    <ArrowLeft size={18} /> {t('booking.backToHome')}
                 </button>
                 <h1 className="text-3xl font-serif font-bold text-slate-900">{t('booking.title')}</h1>
            </div>

            <div className="lg:block hidden mb-10">
                 <h2 className="text-3xl font-serif font-bold text-slate-900">{t('booking.title')}</h2>
                 <p className="text-slate-500 mt-2">{t('booking.subtitle')}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in-up">
                {/* Personal Info Section */}
                <div className="space-y-6">
                    <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2">{t('booking.personalDetails')}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">{t('booking.name')} <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    required
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder={t('booking.namePlaceholder')}
                                    className={inputClasses}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">{t('booking.email')} <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    required
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder={t('booking.emailPlaceholder')}
                                    className={inputClasses}
                                />
                            </div>
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-medium text-slate-700">{t('booking.phone')} <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    required
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder={t('booking.phonePlaceholder')}
                                    className={inputClasses}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Appointment Info Section */}
                <div className="space-y-6">
                    <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2">{t('booking.appointmentDetails')}</h3>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">{t('booking.service')} <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <select
                                    required
                                    name="service"
                                    value={formData.service}
                                    onChange={handleChange}
                                    className={selectClasses}
                                >
                                    <option value="" disabled>{t('booking.selectService')}</option>
                                    {SERVICES.map(s => (
                                    <option key={s.id} value={s.title}>{s.title}</option>
                                    ))}
                                    <option value="other">{t('booking.otherConsultation')}</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">{t('booking.date')} <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input
                                        required
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                        className={inputClasses}
                                    />
                                </div>
                            </div>
                             <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">{t('booking.time')} <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <select
                                        required
                                        name="time"
                                        value={formData.time}
                                        onChange={handleChange}
                                        className={selectWithIconClasses}
                                    >
                                        <option value="" disabled>{t('booking.selectTime')}</option>
                                        <option value="morning">{t('booking.morning')}</option>
                                        <option value="afternoon">{t('booking.afternoon')}</option>
                                        <option value="evening">{t('booking.evening')}</option>
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={status === 'SUBMITTING'}
                        className="w-full bg-primary-600 hover:bg-primary-700 text-white text-lg font-semibold py-4 rounded-xl shadow-lg shadow-primary-500/30 transition-all hover:translate-y-[-2px] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {status === 'SUBMITTING' ? (
                        <>
                            <Loader2 size={24} className="animate-spin" /> {t('booking.processing')}
                        </>
                        ) : (
                        t('booking.submit')
                        )}
                    </button>
                    <p className="text-center text-xs text-slate-400 mt-6 leading-relaxed">
                        {t('booking.disclaimer')}
                    </p>
                </div>
            </form>
        </div>
      </div>
    </div>
  );
};