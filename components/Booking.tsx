import React, { useState } from 'react';
import { Button } from './ui/Button';
import { Reveal } from './ui/Reveal';
import { CheckCircle } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

export const Booking: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: 'morning',
    honeypot: '',
  });

  const [status, setStatus] = useState<'IDLE' | 'SUBMITTING' | 'SUCCESS' | 'ERROR'>('IDLE');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check
    if (formData.honeypot) return;

    setStatus('SUBMITTING');

    const API_BASE = import.meta.env.DEV ? 'http://localhost:3000' : '';

    try {
      const response = await fetch(`${API_BASE}/api/booking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          date: formData.date,
          time: formData.time,
          service: 'General Consultation',
        }),
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
      <section className="py-32 bg-studio-black text-white flex items-center justify-center">
        <div className="max-w-xl w-full mx-6">
          <div className="text-center">
            <div className="w-24 h-24 bg-studio-gold/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle size={48} className="text-studio-gold" />
            </div>
            <h3 className="text-4xl font-serif font-bold text-white mb-4">
              {t('booking.success')}
            </h3>
            <p className="text-white/60 text-lg mb-8 leading-relaxed">
              {t('booking.successMessage').replace('{name}', formData.name)}
            </p>
            <button
              onClick={() => {
                setStatus('IDLE');
                setFormData({ name: '', email: '', phone: '', date: '', time: 'morning', honeypot: '' });
              }}
              className="text-[10px] uppercase tracking-ultra text-studio-gold hover:text-white transition-colors"
            >
              {t('booking.backToForm')}
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-32 bg-studio-black text-white relative overflow-hidden">
      {/* Abstract Background Shape */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/[0.03] rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <Reveal>
          <div className="flex flex-col lg:flex-row justify-between mb-24 gap-12">
            <div className="max-w-2xl">
              <span className="text-studio-gold text-[10px] uppercase tracking-ultra mb-6 md:mb-8 block font-semibold">
                {t('booking.label')}
              </span>
              <h2 className="font-serif text-5xl md:text-8xl mb-6 md:mb-8 leading-[0.9]">
                {t('booking.title1')} <br />
                <span className="italic font-light text-white/50">{t('booking.title2')}</span>
              </h2>
              <p className="text-white/60 font-light text-base md:text-lg leading-relaxed max-w-md">
                {t('booking.subtitle')}
              </p>
            </div>
            <div className="mt-auto text-left lg:text-right space-y-6 md:space-y-8">
              <div>
                <p className="text-[10px] uppercase tracking-ultra text-studio-gold mb-2">
                  {t('booking.studioLabel')}
                </p>
                <p className="font-serif text-xl md:text-2xl text-white">{t('booking.address')}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-ultra text-studio-gold mb-2">
                  {t('booking.phoneLabel')}
                </p>
                <p className="font-serif text-xl md:text-2xl text-white">{t('booking.phone')}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-ultra text-studio-gold mb-2">
                  {t('booking.emailLabel')}
                </p>
                <a
                  href={`mailto:${t('booking.email')}`}
                  className="font-serif text-xl md:text-2xl text-white hover:italic transition-all"
                >
                  {t('booking.email')}
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <form className="w-full border-t border-white/10 pt-16" onSubmit={handleSubmit}>
            {/* Honeypot field */}
            <input
              type="text"
              name="honeypot"
              value={formData.honeypot}
              onChange={handleChange}
              style={{ position: 'absolute', left: '-9999px' }}
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mb-12">
              <div className="group relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t('booking.namePlaceholder')}
                  required
                  className="w-full bg-transparent border-b border-white/20 py-4 text-xl font-serif text-white placeholder-white/20 focus:outline-none focus:border-white transition-colors"
                />
              </div>
              <div className="group relative">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={t('booking.phonePlaceholder')}
                  required
                  className="w-full bg-transparent border-b border-white/20 py-4 text-xl font-serif text-white placeholder-white/20 focus:outline-none focus:border-white transition-colors"
                />
              </div>
              <div className="group relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t('booking.emailPlaceholder')}
                  required
                  className="w-full bg-transparent border-b border-white/20 py-4 text-xl font-serif text-white placeholder-white/20 focus:outline-none focus:border-white transition-colors"
                />
              </div>
              <div className="group relative">
                <label className="text-[10px] uppercase tracking-ultra text-white/40 mb-2 block">
                  {t('booking.date')}
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  required
                  className="w-full bg-transparent border-b border-white/20 py-4 text-xl font-serif text-white focus:outline-none focus:border-white transition-colors [color-scheme:dark]"
                />
              </div>
              <div className="group relative">
                <label className="text-[10px] uppercase tracking-ultra text-white/40 mb-2 block">
                  {t('booking.time')}
                </label>
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b border-white/20 py-4 text-xl font-serif text-white focus:outline-none focus:border-white transition-colors appearance-none cursor-pointer"
                >
                  <option value="morning" className="bg-studio-black">{t('booking.morning')}</option>
                  <option value="afternoon" className="bg-studio-black">{t('booking.afternoon')}</option>
                  <option value="evening" className="bg-studio-black">{t('booking.evening')}</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center mt-20 gap-8">
              <p className="text-xs text-white/40 max-w-xs">{t('booking.privacyNotice')}</p>
              <Button
                type="submit"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-black px-16 py-5 text-xs w-full md:w-auto disabled:opacity-50"
                data-cursor="hover"
                disabled={status === 'SUBMITTING'}
              >
                {status === 'SUBMITTING' ? t('booking.submitting') : t('booking.submit')}
              </Button>
            </div>

            {status === 'ERROR' && (
              <div className="mt-8 text-center text-red-400 text-sm">{t('booking.error')}</div>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
};
