import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useLocalePath } from '../hooks/useLocalePath';
import { privacyContent } from '../translations/privacy';

const renderText = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    const lines = part.split('\n');
    return lines.map((line, j) => (
      <React.Fragment key={`${i}-${j}`}>
        {j > 0 && <br />}
        {line}
      </React.Fragment>
    ));
  });
};

export const PrivacyPolicy: React.FC = () => {
  const { language } = useLanguage();
  const lp = useLocalePath();
  const content = privacyContent[language] || privacyContent.en;

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-studio-black text-white py-8">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <a
            href={lp('/')}
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft size={18} />
            <span className="text-sm">{content.backToHome}</span>
          </a>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl">{content.pageTitle}</h1>
          <p className="text-white/60 mt-2">{content.lastUpdated}</p>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 md:px-12 py-12 md:py-16">
        <div className="max-w-3xl mx-auto prose prose-lg">
          {content.sections.map((section, i) => (
            <section key={i} className="mb-12">
              <h2 className="font-serif text-2xl md:text-3xl text-studio-black mb-4">
                {section.title}
              </h2>
              {section.paragraphs?.map((p, j) => (
                <p key={j} className="text-studio-gray leading-relaxed mb-4">
                  {renderText(p)}
                </p>
              ))}
              {section.listIntro && (
                <p className="text-studio-gray leading-relaxed mb-4">{section.listIntro}</p>
              )}
              {section.items && (
                <ul className="list-disc pl-6 text-studio-gray space-y-2">
                  {section.items.map((item, k) => (
                    <li key={k}>
                      {item.bold && <strong>{item.bold}</strong>}
                      {item.bold && ' '}
                      {item.text}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </main>

      <footer className="bg-studio-black text-white py-8">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 text-center">
          <p className="text-white/60 text-sm">{content.copyright}</p>
        </div>
      </footer>
    </div>
  );
};
