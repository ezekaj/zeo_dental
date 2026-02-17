import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const PrivacyPolicy: React.FC = () => {
  const { language } = useLanguage();
  const isAlbanian = language === 'sq';

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-studio-black text-white py-8">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft size={18} />
            <span className="text-sm">
              {isAlbanian ? 'Kthehu n\u00eb Kreu' : 'Back to Home'}
            </span>
          </a>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl">
            {isAlbanian ? 'Politika e Privat\u00ebsis\u00eb' : 'Privacy Policy'}
          </h1>
          <p className="text-white/60 mt-2">
            {isAlbanian ? 'P\u00ebrdit\u00ebsuar m\u00eb: Shkurt 2026' : 'Last updated: February 2026'}
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 sm:px-6 md:px-12 py-12 md:py-16">
        <div className="max-w-3xl mx-auto prose prose-lg">
          {/* Section 1 - General Information */}
          <section className="mb-12">
            <h2 className="font-serif text-2xl md:text-3xl text-studio-black mb-4">
              {isAlbanian ? '1. Informacione t\u00eb P\u00ebrgjithshme' : '1. General Information'}
            </h2>
            <p className="text-studio-gray leading-relaxed mb-4">
              {isAlbanian
                ? 'Klinika Dentare Zeo ("ne", "ton\u00eb", ose "Klinika") respekton privat\u00ebsin\u00eb tuaj dhe \u00ebsht\u00eb e p\u00ebrkushtuar p\u00ebr t\u00eb mbrojtur t\u00eb dh\u00ebnat tuaja personale. Kjo politik\u00eb privat\u00ebsie shpjegon se si ne mbledhim, p\u00ebrdorim, dhe mbrojm\u00eb informacionin tuaj n\u00eb p\u00ebrputhje me Ligjin Shqiptar Nr. 9887/2008 "P\u00ebr Mbrojtjen e t\u00eb Dh\u00ebnave Personale" dhe Rregulloren e P\u00ebrgjithshme t\u00eb Mbrojtjes s\u00eb t\u00eb Dh\u00ebnave (GDPR) t\u00eb Bashkimit Evropian.'
                : 'Zeo Dental Clinic ("we", "our", or "the Clinic") respects your privacy and is committed to protecting your personal data. This privacy policy explains how we collect, use, and protect your information in accordance with Albanian Law No. 9887/2008 "On the Protection of Personal Data" and the European Union General Data Protection Regulation (GDPR).'}
            </p>
            <p className="text-studio-gray leading-relaxed">
              <strong>{isAlbanian ? 'Kontrollori i t\u00eb Dh\u00ebnave:' : 'Data Controller:'}</strong>
              <br />
              {isAlbanian ? 'Klinika Dentare Zeo' : 'Zeo Dental Clinic'}
              <br />
              {isAlbanian ? 'Rruga Hamdi Sina, Tiran\u00eb, Shqip\u00ebri' : 'Rruga Hamdi Sina, Tirana, Albania'}
              <br />
              Email: zeodentalclinic@gmail.com
              <br />
              Tel: +355 68 400 4840
            </p>
          </section>

          {/* Section 2 - Data We Collect */}
          <section className="mb-12">
            <h2 className="font-serif text-2xl md:text-3xl text-studio-black mb-4">
              {isAlbanian ? '2. T\u00eb Dh\u00ebnat q\u00eb Mbledhim' : '2. Data We Collect'}
            </h2>
            <p className="text-studio-gray leading-relaxed mb-4">
              {isAlbanian
                ? 'Ne mbledhim k\u00ebto lloje t\u00eb dh\u00ebnash:'
                : 'We collect the following types of data:'}
            </p>
            <ul className="list-disc pl-6 text-studio-gray space-y-2">
              <li>
                <strong>{isAlbanian ? 'T\u00eb dh\u00ebna identifikuese:' : 'Identification data:'}</strong>{' '}
                {isAlbanian
                  ? 'Emri, mbiemri, numri i telefonit, adresa e email-it'
                  : 'First name, last name, phone number, email address'}
              </li>
              <li>
                <strong>{isAlbanian ? 'T\u00eb dh\u00ebna sh\u00ebndet\u00ebsore:' : 'Health data:'}</strong>{' '}
                {isAlbanian
                  ? 'Historia dentare, trajtimi i k\u00ebrkuar, radiografit\u00eb, dhe informacione t\u00eb tjera mjek\u00ebsore t\u00eb nevojshme p\u00ebr kujdesin dentar'
                  : 'Dental history, requested treatment, radiographs, and other medical information necessary for dental care'}
              </li>
              <li>
                <strong>{isAlbanian ? 'T\u00eb dh\u00ebna komunikimi:' : 'Communication data:'}</strong>{' '}
                {isAlbanian
                  ? 'Korrespondenca me klinik\u00ebn ton\u00eb p\u00ebrmes email-it, telefonit, ose WhatsApp'
                  : 'Correspondence with our clinic via email, phone, or WhatsApp'}
              </li>
              <li>
                <strong>{isAlbanian ? 'T\u00eb dh\u00ebna rezervimi:' : 'Booking data:'}</strong>{' '}
                {isAlbanian
                  ? 'Data dhe ora e preferuar e takimeve'
                  : 'Preferred date and time of appointments'}
              </li>
            </ul>
          </section>

          {/* Section 3 - Legal Basis for Processing */}
          <section className="mb-12">
            <h2 className="font-serif text-2xl md:text-3xl text-studio-black mb-4">
              {isAlbanian ? '3. Baza Ligjore p\u00ebr P\u00ebrpunimin' : '3. Legal Basis for Processing'}
            </h2>
            <p className="text-studio-gray leading-relaxed mb-4">
              {isAlbanian
                ? 'Ne p\u00ebrpunojm\u00eb t\u00eb dh\u00ebnat tuaja personale bazuar n\u00eb:'
                : 'We process your personal data based on:'}
            </p>
            <ul className="list-disc pl-6 text-studio-gray space-y-2">
              <li>
                <strong>{isAlbanian ? 'P\u00eblqimin tuaj:' : 'Your consent:'}</strong>{' '}
                {isAlbanian
                  ? 'Kur jepni p\u00eblqimin p\u00ebr p\u00ebrpunimin e t\u00eb dh\u00ebnave (Neni 6(1)(a) GDPR)'
                  : 'When you give consent for data processing (Article 6(1)(a) GDPR)'}
              </li>
              <li>
                <strong>{isAlbanian ? 'Ekzekutimin e kontrat\u00ebs:' : 'Performance of a contract:'}</strong>{' '}
                {isAlbanian
                  ? 'P\u00ebr t\u00eb ofruar sh\u00ebrbimet dentare q\u00eb keni k\u00ebrkuar (Neni 6(1)(b) GDPR)'
                  : 'To provide the dental services you have requested (Article 6(1)(b) GDPR)'}
              </li>
              <li>
                <strong>{isAlbanian ? 'Detyrimet ligjore:' : 'Legal obligations:'}</strong>{' '}
                {isAlbanian
                  ? 'P\u00ebr t\u00eb p\u00ebrmbushur detyrimet tona ligjore sipas ligjit shqiptar t\u00eb sh\u00ebndet\u00ebsis\u00eb (Neni 6(1)(c) GDPR)'
                  : 'To fulfill our legal obligations under Albanian health law (Article 6(1)(c) GDPR)'}
              </li>
              <li>
                <strong>{isAlbanian ? 'Interesat legjitime:' : 'Legitimate interests:'}</strong>{' '}
                {isAlbanian
                  ? 'P\u00ebr t\u00eb p\u00ebrmir\u00ebsuar sh\u00ebrbimet tona dhe p\u00ebr komunikim t\u00eb drejtp\u00ebrdrejt\u00eb (Neni 6(1)(f) GDPR)'
                  : 'To improve our services and for direct communication (Article 6(1)(f) GDPR)'}
              </li>
            </ul>
          </section>

          {/* Section 4 - How We Use Your Data */}
          <section className="mb-12">
            <h2 className="font-serif text-2xl md:text-3xl text-studio-black mb-4">
              {isAlbanian ? '4. Si i P\u00ebrdorim t\u00eb Dh\u00ebnat Tuaja' : '4. How We Use Your Data'}
            </h2>
            <ul className="list-disc pl-6 text-studio-gray space-y-2">
              <li>
                {isAlbanian
                  ? 'P\u00ebr t\u00eb menaxhuar rezervimet dhe takimet tuaja'
                  : 'To manage your bookings and appointments'}
              </li>
              <li>
                {isAlbanian
                  ? 'P\u00ebr t\u00eb ofruar trajtim dentar dhe kujdes mjek\u00ebsor'
                  : 'To provide dental treatment and medical care'}
              </li>
              <li>
                {isAlbanian
                  ? "P\u00ebr t'ju kontaktuar n\u00eb lidhje me takimet ose trajtimet tuaja"
                  : 'To contact you regarding your appointments or treatments'}
              </li>
              <li>
                {isAlbanian
                  ? 'P\u00ebr t\u00eb p\u00ebrmbushur detyrimet tona ligjore dhe rregullatore'
                  : 'To fulfill our legal and regulatory obligations'}
              </li>
              <li>
                {isAlbanian
                  ? 'P\u00ebr t\u00eb p\u00ebrmir\u00ebsuar sh\u00ebrbimet dhe p\u00ebrvoj\u00ebn e pacient\u00ebve'
                  : 'To improve our services and patient experience'}
              </li>
            </ul>
          </section>

          {/* Section 5 - Data Retention */}
          <section className="mb-12">
            <h2 className="font-serif text-2xl md:text-3xl text-studio-black mb-4">
              {isAlbanian ? '5. Ruajtja e t\u00eb Dh\u00ebnave' : '5. Data Retention'}
            </h2>
            <p className="text-studio-gray leading-relaxed">
              {isAlbanian
                ? 'T\u00eb dh\u00ebnat tuaja personale ruhen n\u00eb p\u00ebrputhje me legjislacionin shqiptar p\u00ebr dokumentacionin mjek\u00ebsor. T\u00eb dh\u00ebnat sh\u00ebndet\u00ebsore ruhen p\u00ebr nj\u00eb periudh\u00eb minimale prej 10 vitesh pas trajtimit t\u00eb fundit, si\u00e7 k\u00ebrkohet nga ligji. T\u00eb dh\u00ebnat e tjera personale ruhen vet\u00ebm p\u00ebr aq koh\u00eb sa \u00ebsht\u00eb e nevojshme p\u00ebr q\u00ebllimet e p\u00ebrpunimit.'
                : 'Your personal data is retained in accordance with Albanian legislation on medical documentation. Health data is retained for a minimum period of 10 years after the last treatment, as required by law. Other personal data is retained only for as long as necessary for the purposes of processing.'}
            </p>
          </section>

          {/* Section 6 - Your Rights */}
          <section className="mb-12">
            <h2 className="font-serif text-2xl md:text-3xl text-studio-black mb-4">
              {isAlbanian ? '6. T\u00eb Drejtat Tuaja' : '6. Your Rights'}
            </h2>
            <p className="text-studio-gray leading-relaxed mb-4">
              {isAlbanian
                ? 'Sipas GDPR dhe ligjit shqiptar, ju keni t\u00eb drejt\u00eb:'
                : 'Under GDPR and Albanian law, you have the right to:'}
            </p>
            <ul className="list-disc pl-6 text-studio-gray space-y-2">
              <li>
                <strong>{isAlbanian ? 'T\u00eb aksesoni:' : 'Access:'}</strong>{' '}
                {isAlbanian
                  ? 'T\u00eb k\u00ebrkoni nj\u00eb kopje t\u00eb t\u00eb dh\u00ebnave tuaja personale'
                  : 'Request a copy of your personal data'}
              </li>
              <li>
                <strong>{isAlbanian ? 'T\u00eb korrigjoni:' : 'Rectification:'}</strong>{' '}
                {isAlbanian
                  ? 'T\u00eb k\u00ebrkoni korrigjimin e t\u00eb dh\u00ebnave t\u00eb pasakta'
                  : 'Request correction of inaccurate data'}
              </li>
              <li>
                <strong>{isAlbanian ? 'T\u00eb fshini:' : 'Erasure:'}</strong>{' '}
                {isAlbanian
                  ? 'T\u00eb k\u00ebrkoni fshirjen e t\u00eb dh\u00ebnave tuaja ("e drejta p\u00ebr t\'u harruar")'
                  : 'Request deletion of your data ("right to be forgotten")'}
              </li>
              <li>
                <strong>{isAlbanian ? 'T\u00eb kufizoni:' : 'Restriction:'}</strong>{' '}
                {isAlbanian
                  ? 'T\u00eb k\u00ebrkoni kufizimin e p\u00ebrpunimit'
                  : 'Request restriction of processing'}
              </li>
              <li>
                <strong>{isAlbanian ? 'T\u00eb transportoni:' : 'Portability:'}</strong>{' '}
                {isAlbanian
                  ? 'T\u00eb merrni t\u00eb dh\u00ebnat tuaja n\u00eb format t\u00eb strukturuar'
                  : 'Receive your data in a structured format'}
              </li>
              <li>
                <strong>{isAlbanian ? 'T\u00eb kund\u00ebrshtoni:' : 'Object:'}</strong>{' '}
                {isAlbanian
                  ? 'T\u00eb kund\u00ebrshtoni p\u00ebrpunimin p\u00ebr marketing t\u00eb drejtp\u00ebrdrejt\u00eb'
                  : 'Object to processing for direct marketing'}
              </li>
              <li>
                <strong>{isAlbanian ? 'T\u00eb t\u00ebrhiqni p\u00eblqimin:' : 'Withdraw consent:'}</strong>{' '}
                {isAlbanian
                  ? 'N\u00eb \u00e7do koh\u00eb, pa ndikuar ligjshm\u00ebrin\u00eb e p\u00ebrpunimit t\u00eb m\u00ebparsh\u00ebm'
                  : 'At any time, without affecting the lawfulness of prior processing'}
              </li>
            </ul>
          </section>

          {/* Section 7 - Data Security */}
          <section className="mb-12">
            <h2 className="font-serif text-2xl md:text-3xl text-studio-black mb-4">
              {isAlbanian ? '7. Siguria e t\u00eb Dh\u00ebnave' : '7. Data Security'}
            </h2>
            <p className="text-studio-gray leading-relaxed">
              {isAlbanian
                ? 'Ne zbatojm\u00eb masa t\u00eb p\u00ebrshtatshme teknike dhe organizative p\u00ebr t\u00eb mbrojtur t\u00eb dh\u00ebnat tuaja personale nga aksesi i paautorizuar, humbja, ose d\u00ebmtimi. Sistemi yn\u00eb p\u00ebrdor enkriptim SSL/TLS p\u00ebr transmetimin e t\u00eb dh\u00ebnave dhe ruhet n\u00eb servera t\u00eb sigurt.'
                : 'We implement appropriate technical and organizational measures to protect your personal data from unauthorized access, loss, or damage. Our system uses SSL/TLS encryption for data transmission and is hosted on secure servers.'}
            </p>
          </section>

          {/* Section 8 - Cookies */}
          <section className="mb-12">
            <h2 className="font-serif text-2xl md:text-3xl text-studio-black mb-4">
              {isAlbanian
                ? '8. Cookies dhe Teknologji t\u00eb Ngjashme'
                : '8. Cookies and Similar Technologies'}
            </h2>
            <p className="text-studio-gray leading-relaxed">
              {isAlbanian
                ? 'Faqja jon\u00eb e internetit p\u00ebrdor cookies thelbësore p\u00ebr funksionimin e duhur t\u00eb sajtit. Ne nuk p\u00ebrdorim cookies p\u00ebr q\u00ebllime marketing ose gjurmimi pa p\u00eblqimin tuaj.'
                : 'Our website uses essential cookies for the proper functioning of the site. We do not use cookies for marketing or tracking purposes without your consent.'}
            </p>
          </section>

          {/* Section 9 - AI Chatbot (NEW) */}
          <section className="mb-12">
            <h2 className="font-serif text-2xl md:text-3xl text-studio-black mb-4">
              {isAlbanian ? '9. Asistenti Virtual (Chatbot AI)' : '9. Virtual Assistant (AI Chatbot)'}
            </h2>
            <p className="text-studio-gray leading-relaxed">
              {isAlbanian
                ? 'Asistenti yn\u00eb virtual (chatbot) p\u00ebrdor Google Gemini API. Bisedat p\u00ebrpunohen nga Google dhe nuk ruhen n\u00eb server\u00ebt tan\u00eb. Mos ndani informacione t\u00eb ndjeshme sh\u00ebndet\u00ebsore p\u00ebrmes chat-it.'
                : 'Our virtual assistant (chatbot) uses Google Gemini API. Conversations are processed by Google and are not stored on our servers. Do not share sensitive health information via chat.'}
            </p>
          </section>

          {/* Section 10 - WhatsApp Notifications (NEW) */}
          <section className="mb-12">
            <h2 className="font-serif text-2xl md:text-3xl text-studio-black mb-4">
              {isAlbanian ? '10. Njoftimet p\u00ebrmes WhatsApp' : '10. WhatsApp Notifications'}
            </h2>
            <p className="text-studio-gray leading-relaxed">
              {isAlbanian
                ? "N\u00ebse jepni p\u00eblqimin, ne mund t'ju d\u00ebrgojm\u00eb njoftime p\u00ebr takimet p\u00ebrmes WhatsApp. Numri juaj i telefonit ndahet me Meta Platforms (WhatsApp Business API) p\u00ebr k\u00ebt\u00eb q\u00ebllim. Ju mund t\u00eb t\u00ebrhiqni p\u00eblqimin n\u00eb \u00e7do koh\u00eb."
                : 'If you provide consent, we may send you appointment notifications via WhatsApp. Your phone number is shared with Meta Platforms (WhatsApp Business API) for this purpose. You may withdraw consent at any time.'}
            </p>
          </section>

          {/* Section 11 - Patient Management System (NEW) */}
          <section className="mb-12">
            <h2 className="font-serif text-2xl md:text-3xl text-studio-black mb-4">
              {isAlbanian
                ? '11. Sistemi i Menaxhimit t\u00eb Pacient\u00ebve (CRM)'
                : '11. Patient Management System (CRM)'}
            </h2>
            <p className="text-studio-gray leading-relaxed">
              {isAlbanian
                ? 'T\u00eb dh\u00ebnat tuaja t\u00eb rezervimit sinkronizohen me sistemin ton\u00eb t\u00eb menaxhimit t\u00eb pacient\u00ebve (ManagerCRM) p\u00ebr planifikimin e takimeve dhe mbajtjen e regjistrave mjek\u00ebsore.'
                : 'Your booking data is synced to our patient management system (ManagerCRM) for appointment scheduling and medical record keeping.'}
            </p>
          </section>

          {/* Section 12 - IP Geolocation (NEW) */}
          <section className="mb-12">
            <h2 className="font-serif text-2xl md:text-3xl text-studio-black mb-4">
              {isAlbanian ? '12. Gjeolokacioni i IP-s\u00eb' : '12. IP Geolocation'}
            </h2>
            <p className="text-studio-gray leading-relaxed">
              {isAlbanian
                ? 'Ne p\u00ebrdorim adres\u00ebn tuaj IP p\u00ebr t\u00eb zbuluar gjuh\u00ebn e preferuar automatikisht. Kjo e dh\u00ebn\u00eb p\u00ebrpunohet n\u00eb koh\u00eb reale dhe nuk ruhet. Ju mund t\u00eb ndryshoni gjuh\u00ebn manualisht n\u00eb \u00e7do koh\u00eb.'
                : 'We use your IP address to automatically detect your preferred language. This data is processed in real-time and is not stored. You can change your language manually at any time.'}
            </p>
          </section>

          {/* Section 13 - Data Transfers (UPDATED - was section 9) */}
          <section className="mb-12">
            <h2 className="font-serif text-2xl md:text-3xl text-studio-black mb-4">
              {isAlbanian ? '13. Transferimi i t\u00eb Dh\u00ebnave' : '13. Data Transfers'}
            </h2>
            <p className="text-studio-gray leading-relaxed mb-4">
              {isAlbanian
                ? 'T\u00eb dh\u00ebnat tuaja personale nuk transferohen jasht\u00eb Shqip\u00ebris\u00eb ose Bashkimit Evropian pa masat e duhura mbrojt\u00ebse. N\u00ebse transferimi \u00ebsht\u00eb i nevojsh\u00ebm, do t\u00eb sigurohemi q\u00eb vendi prit\u00ebs t\u00eb ofroj\u00eb nj\u00eb nivel adekuat mbrojtjeje.'
                : 'Your personal data is not transferred outside Albania or the European Union without appropriate safeguards. If a transfer is necessary, we will ensure the receiving country provides an adequate level of protection.'}
            </p>
            <p className="text-studio-gray leading-relaxed">
              {isAlbanian
                ? 'P\u00ebr sh\u00ebrbimet e p\u00ebrmendura m\u00eb sip\u00ebr, t\u00eb dh\u00ebnat mund t\u00eb transferohen te: Google LLC (SHBA) p\u00ebr p\u00ebrpunimin e chatbot-it AI, dhe Meta Platforms, Inc. (SHBA) p\u00ebr njoftimet WhatsApp. K\u00ebto transferime mbrohen nga Klauzolat Standarde Kontraktuale (Standard Contractual Clauses - SCC) t\u00eb miratuara nga Komisioni Evropian.'
                : 'For the services mentioned above, data may be transferred to: Google LLC (US) for AI chatbot processing, and Meta Platforms, Inc. (US) for WhatsApp notifications. These transfers are protected by Standard Contractual Clauses (SCCs) approved by the European Commission.'}
            </p>
          </section>

          {/* Section 14 - Contact (was section 10) */}
          <section className="mb-12">
            <h2 className="font-serif text-2xl md:text-3xl text-studio-black mb-4">
              {isAlbanian ? '14. Kontakti' : '14. Contact'}
            </h2>
            <p className="text-studio-gray leading-relaxed mb-4">
              {isAlbanian
                ? 'P\u00ebr \u00e7do pyetje rreth k\u00ebsaj politike ose p\u00ebr t\u00eb ushtruar t\u00eb drejtat tuaja, na kontaktoni:'
                : 'For any questions about this policy or to exercise your rights, please contact us:'}
            </p>
            <p className="text-studio-gray leading-relaxed">
              {isAlbanian ? 'Klinika Dentare Zeo' : 'Zeo Dental Clinic'}
              <br />
              Email: zeodentalclinic@gmail.com
              <br />
              Tel: +355 68 400 4840
              <br />
              {isAlbanian
                ? 'Adresa: Rruga Hamdi Sina, Tiran\u00eb, Shqip\u00ebri'
                : 'Address: Rruga Hamdi Sina, Tirana, Albania'}
            </p>
          </section>

          {/* Section 15 - Supervisory Authority (was section 11) */}
          <section className="mb-12">
            <h2 className="font-serif text-2xl md:text-3xl text-studio-black mb-4">
              {isAlbanian ? '15. Autoriteti Mbik\u00ebqyr\u00ebs' : '15. Supervisory Authority'}
            </h2>
            <p className="text-studio-gray leading-relaxed">
              {isAlbanian
                ? 'N\u00ebse besoni se t\u00eb drejtat tuaja jan\u00eb shkelur, keni t\u00eb drejt\u00eb t\u00eb paraqisni nj\u00eb ankes\u00eb pran\u00eb Komisionerit p\u00ebr t\u00eb Drejt\u00ebn e Informimit dhe Mbrojtjen e t\u00eb Dh\u00ebnave Personale:'
                : 'If you believe your rights have been violated, you have the right to file a complaint with the Commissioner for the Right to Information and Personal Data Protection:'}
              <br />
              <br />
              {isAlbanian
                ? 'Komisioneri p\u00ebr t\u00eb Drejt\u00ebn e Informimit dhe Mbrojtjen e t\u00eb Dh\u00ebnave Personale'
                : 'Commissioner for the Right to Information and Personal Data Protection'}
              <br />
              {isAlbanian
                ? 'Rruga "Abdi Toptani", Nr. 5, Tiran\u00eb'
                : 'Rruga "Abdi Toptani", Nr. 5, Tirana'}
              <br />
              Website: www.idp.al
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-studio-black text-white py-8">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 text-center">
          <p className="text-white/60 text-sm">
            &copy; {new Date().getFullYear()}{' '}
            {isAlbanian
              ? 'Klinika Dentare Zeo. T\u00eb gjitha t\u00eb drejtat e rezervuara.'
              : 'Zeo Dental Clinic. All rights reserved.'}
          </p>
        </div>
      </footer>
    </div>
  );
};
