import React from 'react';
import { ArrowLeft } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
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
            <span className="text-sm">Kthehu në Kreu</span>
          </a>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl">Politika e Privatësisë</h1>
          <p className="text-white/60 mt-2">Përditësuar më: Janar 2026</p>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 sm:px-6 md:px-12 py-12 md:py-16">
        <div className="max-w-3xl mx-auto prose prose-lg">
          <section className="mb-12">
            <h2 className="font-serif text-2xl md:text-3xl text-studio-black mb-4">
              1. Informacione të Përgjithshme
            </h2>
            <p className="text-studio-gray leading-relaxed mb-4">
              Klinika Dentare Zeo ("ne", "tonë", ose "Klinika") respekton privatësinë tuaj dhe është
              e përkushtuar për të mbrojtur të dhënat tuaja personale. Kjo politikë privatësie
              shpjegon se si ne mbledhim, përdorim, dhe mbrojmë informacionin tuaj në përputhje me
              Ligjin Shqiptar Nr. 9887/2008 "Për Mbrojtjen e të Dhënave Personale" dhe Rregulloren e
              Përgjithshme të Mbrojtjes së të Dhënave (GDPR) të Bashkimit Evropian.
            </p>
            <p className="text-studio-gray leading-relaxed">
              <strong>Kontrollori i të Dhënave:</strong>
              <br />
              Klinika Dentare Zeo
              <br />
              Rruga Hamdi Sina, Tiranë, Shqipëri
              <br />
              Email: zeodentalclinic@gmail.com
              <br />
              Tel: +355 68 400 4840
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-2xl md:text-3xl text-studio-black mb-4">
              2. Të Dhënat që Mbledhim
            </h2>
            <p className="text-studio-gray leading-relaxed mb-4">
              Ne mbledhim këto lloje të dhënash:
            </p>
            <ul className="list-disc pl-6 text-studio-gray space-y-2">
              <li>
                <strong>Të dhëna identifikuese:</strong> Emri, mbiemri, numri i telefonit, adresa e
                email-it
              </li>
              <li>
                <strong>Të dhëna shëndetësore:</strong> Historia dentare, trajtimi i kërkuar,
                radiografitë, dhe informacione të tjera mjekësore të nevojshme për kujdesin dentar
              </li>
              <li>
                <strong>Të dhëna komunikimi:</strong> Korrespondenca me klinikën tonë përmes
                email-it, telefonit, ose WhatsApp
              </li>
              <li>
                <strong>Të dhëna rezervimi:</strong> Data dhe ora e preferuar e takimeve
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-2xl md:text-3xl text-studio-black mb-4">
              3. Baza Ligjore për Përpunimin
            </h2>
            <p className="text-studio-gray leading-relaxed mb-4">
              Ne përpunojmë të dhënat tuaja personale bazuar në:
            </p>
            <ul className="list-disc pl-6 text-studio-gray space-y-2">
              <li>
                <strong>Pëlqimin tuaj:</strong> Kur jepni pëlqimin për përpunimin e të dhënave (Neni
                6(1)(a) GDPR)
              </li>
              <li>
                <strong>Ekzekutimin e kontratës:</strong> Për të ofruar shërbimet dentare që keni
                kërkuar (Neni 6(1)(b) GDPR)
              </li>
              <li>
                <strong>Detyrimet ligjore:</strong> Për të përmbushur detyrimet tona ligjore sipas
                ligjit shqiptar të shëndetësisë (Neni 6(1)(c) GDPR)
              </li>
              <li>
                <strong>Interesat legjitime:</strong> Për të përmirësuar shërbimet tona dhe për
                komunikim të drejtpërdrejtë (Neni 6(1)(f) GDPR)
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-2xl md:text-3xl text-studio-black mb-4">
              4. Si i Përdorim të Dhënat Tuaja
            </h2>
            <ul className="list-disc pl-6 text-studio-gray space-y-2">
              <li>Për të menaxhuar rezervimet dhe takimet tuaja</li>
              <li>Për të ofruar trajtim dentar dhe kujdes mjekësor</li>
              <li>Për t'ju kontaktuar në lidhje me takimet ose trajtimet tuaja</li>
              <li>Për të përmbushur detyrimet tona ligjore dhe rregullatore</li>
              <li>Për të përmirësuar shërbimet dhe përvojën e pacientëve</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-2xl md:text-3xl text-studio-black mb-4">
              5. Ruajtja e të Dhënave
            </h2>
            <p className="text-studio-gray leading-relaxed">
              Të dhënat tuaja personale ruhen në përputhje me legjislacionin shqiptar për
              dokumentacionin mjekësor. Të dhënat shëndetësore ruhen për një periudhë minimale prej
              10 vitesh pas trajtimit të fundit, siç kërkohet nga ligji. Të dhënat e tjera personale
              ruhen vetëm për aq kohë sa është e nevojshme për qëllimet e përpunimit.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-2xl md:text-3xl text-studio-black mb-4">
              6. Të Drejtat Tuaja
            </h2>
            <p className="text-studio-gray leading-relaxed mb-4">
              Sipas GDPR dhe ligjit shqiptar, ju keni të drejtë:
            </p>
            <ul className="list-disc pl-6 text-studio-gray space-y-2">
              <li>
                <strong>Të aksesoni:</strong> Të kërkoni një kopje të të dhënave tuaja personale
              </li>
              <li>
                <strong>Të korrigjoni:</strong> Të kërkoni korrigjimin e të dhënave të pasakta
              </li>
              <li>
                <strong>Të fshini:</strong> Të kërkoni fshirjen e të dhënave tuaja ("e drejta për
                t'u harruar")
              </li>
              <li>
                <strong>Të kufizoni:</strong> Të kërkoni kufizimin e përpunimit
              </li>
              <li>
                <strong>Të transportoni:</strong> Të merrni të dhënat tuaja në format të strukturuar
              </li>
              <li>
                <strong>Të kundërshtoni:</strong> Të kundërshtoni përpunimin për marketing të
                drejtpërdrejtë
              </li>
              <li>
                <strong>Të tërhiqni pëlqimin:</strong> Në çdo kohë, pa ndikuar ligjshmërinë e
                përpunimit të mëparshëm
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-2xl md:text-3xl text-studio-black mb-4">
              7. Siguria e të Dhënave
            </h2>
            <p className="text-studio-gray leading-relaxed">
              Ne zbatojmë masa të përshtatshme teknike dhe organizative për të mbrojtur të dhënat
              tuaja personale nga aksesi i paautorizuar, humbja, ose dëmtimi. Sistemi ynë përdor
              enkriptim SSL/TLS për transmetimin e të dhënave dhe ruhet në servera të sigurt.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-2xl md:text-3xl text-studio-black mb-4">
              8. Cookies dhe Teknologji të Ngjashme
            </h2>
            <p className="text-studio-gray leading-relaxed">
              Faqja jonë e internetit përdor cookies thelbësore për funksionimin e duhur të sajtit.
              Ne nuk përdorim cookies për qëllime marketing ose gjurmimi pa pëlqimin tuaj.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-2xl md:text-3xl text-studio-black mb-4">
              9. Transferimi i të Dhënave
            </h2>
            <p className="text-studio-gray leading-relaxed">
              Të dhënat tuaja personale nuk transferohen jashtë Shqipërisë ose Bashkimit Evropian pa
              masat e duhura mbrojtëse. Nëse transferimi është i nevojshëm, do të sigurohemi që
              vendi pritës të ofrojë një nivel adekuat mbrojtjeje.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-2xl md:text-3xl text-studio-black mb-4">10. Kontakti</h2>
            <p className="text-studio-gray leading-relaxed mb-4">
              Për çdo pyetje rreth kësaj politike ose për të ushtruar të drejtat tuaja, na
              kontaktoni:
            </p>
            <p className="text-studio-gray leading-relaxed">
              Klinika Dentare Zeo
              <br />
              Email: zeodentalclinic@gmail.com
              <br />
              Tel: +355 68 400 4840
              <br />
              Adresa: Rruga Hamdi Sina, Tiranë, Shqipëri
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-2xl md:text-3xl text-studio-black mb-4">
              11. Autoriteti Mbikëqyrës
            </h2>
            <p className="text-studio-gray leading-relaxed">
              Nëse besoni se të drejtat tuaja janë shkelur, keni të drejtë të paraqisni një ankesë
              pranë Komisionerit për të Drejtën e Informimit dhe Mbrojtjen e të Dhënave Personale:
              <br />
              <br />
              Komisioneri për të Drejtën e Informimit dhe Mbrojtjen e të Dhënave Personale
              <br />
              Rruga "Abdi Toptani", Nr. 5, Tiranë
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
            &copy; {new Date().getFullYear()} Klinika Dentare Zeo. Të gjitha të drejtat e
            rezervuara.
          </p>
        </div>
      </footer>
    </div>
  );
};
