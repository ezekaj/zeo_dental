import React from 'react';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

interface FooterProps {
  onNavigate: (view: 'home' | 'booking', sectionId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { t } = useTranslation();

  return (
    <footer className="bg-primary-950 text-primary-50 pt-20 pb-10" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <button
              onClick={() => onNavigate('home')}
              className="text-3xl font-serif font-bold tracking-widest block mb-6 hover:text-white/90"
            >
              ZEO<span className="text-primary-500">.</span>
            </button>
            <p className="text-primary-100/80 text-sm leading-relaxed mb-6">
              {t('footer.description')}
            </p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/zeodentalclinic/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary-900 flex items-center justify-center hover:bg-primary-600 transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary-900 flex items-center justify-center hover:bg-primary-600 transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary-900 flex items-center justify-center hover:bg-primary-600 transition-colors">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-6">{t('footer.quickLinks')}</h4>
            <ul className="space-y-3 text-primary-100/80 text-sm">
              <li><button onClick={() => onNavigate('home', 'services')} className="hover:text-primary-300 transition-colors text-left">{t('services.items.cosmetic.title')}</button></li>
              <li><button onClick={() => onNavigate('home', 'services')} className="hover:text-primary-300 transition-colors text-left">{t('services.items.implants.title')}</button></li>
              <li><button onClick={() => onNavigate('home', 'services')} className="hover:text-primary-300 transition-colors text-left">{t('services.items.ortho.title')}</button></li>
              <li><button onClick={() => onNavigate('home', 'team')} className="hover:text-primary-300 transition-colors text-left">{t('footer.ourDoctors')}</button></li>
              <li><a href="#" className="hover:text-primary-300 transition-colors">{t('footer.patientPortal')}</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-6">{t('footer.contactUs')}</h4>
            <ul className="space-y-4 text-primary-100/80 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary-400 flex-shrink-0 mt-0.5" />
                <span>{t('contact.address')}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary-400 flex-shrink-0" />
                <span>{t('contact.phone')}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary-400 flex-shrink-0" />
                <span>{t('contact.email')}</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-6">{t('footer.openingHours')}</h4>
            <ul className="space-y-3 text-primary-100/80 text-sm">
              <li className="flex justify-between border-b border-primary-900 pb-2">
                <span>{t('footer.monFri')}</span>
                <span className="text-primary-50">{t('footer.hoursMF')}</span>
              </li>
              <li className="flex justify-between border-b border-primary-900 pb-2">
                <span>{t('footer.saturday')}</span>
                <span className="text-primary-50">{t('footer.hoursSat')}</span>
              </li>
              <li className="flex justify-between pb-2">
                <span>{t('footer.sunday')}</span>
                <span className="text-primary-300">{t('footer.closed')}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-primary-100/80">
          <p>&copy; {new Date().getFullYear()} {t('footer.rights')}</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary-200 transition-colors">{t('footer.privacy')}</a>
            <a href="#" className="hover:text-primary-200 transition-colors">{t('footer.terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};