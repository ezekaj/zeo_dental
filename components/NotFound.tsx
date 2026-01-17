import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

export const NotFound: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-studio-white flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* 404 Number */}
        <h1 className="font-serif text-[20vw] md:text-[15vw] leading-none text-studio-black opacity-10 select-none">
          404
        </h1>

        {/* Message */}
        <div className="mt-[-2rem] md:mt-[-4rem]">
          <h2 className="font-serif text-3xl md:text-4xl text-studio-black mb-4">
            Page Not Found
          </h2>
          <p className="text-studio-gray font-light mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>

          {/* Return Home Button */}
          <a
            href="/"
            className="inline-block px-8 py-4 border border-studio-black text-studio-black text-xs uppercase tracking-ultra hover:bg-studio-black hover:text-white transition-all duration-300"
            data-cursor="hover"
          >
            Return Home
          </a>
        </div>

        {/* Decorative Line */}
        <div className="mt-16 flex items-center justify-center gap-4">
          <span className="h-[1px] w-12 bg-studio-gold"></span>
          <span className="text-studio-gold font-serif italic text-sm">ZEO.</span>
          <span className="h-[1px] w-12 bg-studio-gold"></span>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
