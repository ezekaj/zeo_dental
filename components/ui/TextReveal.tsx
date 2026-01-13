import React, { useEffect, useRef, useState } from 'react';

interface TextRevealProps {
  children: string;
  className?: string;
}

export const TextReveal: React.FC<TextRevealProps> = ({ children, className = "" }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const { top, height } = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate how much of the element has passed through the center of the viewport
      const start = windowHeight * 0.8;
      const end = windowHeight * 0.2;

      let progress = (start - top) / (start - end);
      progress = Math.min(Math.max(progress, 0), 1);

      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Split text into words for finer control
  const words = children.split(" ");

  return (
    <div ref={containerRef} className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => {
        // Calculate opacity based on word index relative to scroll progress
        const wordProgress = (i + 1) / words.length;
        const isActive = scrollProgress >= wordProgress - 0.1; // Add slight offset/overlap

        return (
          <span
            key={i}
            className="mr-[0.25em] transition-opacity duration-500"
            style={{
              opacity: isActive ? 1 : 0.1,
              transitionDelay: `${i * 10}ms`
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};
