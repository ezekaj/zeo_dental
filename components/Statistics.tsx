import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';

interface StatItem {
  key: string;
  value: number;
  suffix: string;
}

const STATS: StatItem[] = [
  { key: 'stats.years', value: 15, suffix: '+' },
  { key: 'stats.patients', value: 2000, suffix: '+' },
  { key: 'stats.satisfaction', value: 98, suffix: '%' },
  { key: 'stats.languages', value: 8, suffix: '' },
];

const AnimatedCounter: React.FC<{ target: number; suffix: string; active: boolean }> = ({
  target,
  suffix,
  active,
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;

    const duration = 2000;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [active, target]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

export const Statistics: React.FC = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-studio-black py-16 sm:py-20 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 md:px-12">
        <span className="block text-center text-studio-gold text-[10px] uppercase tracking-ultra mb-10 sm:mb-14">
          {t('stats.label')}
        </span>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 md:gap-16">
          {STATS.map((stat) => (
            <div key={stat.key} className="text-center">
              <div className="text-4xl sm:text-5xl md:text-6xl font-serif text-white mb-2 sm:mb-3">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} active={isVisible} />
              </div>
              <p className="text-[10px] sm:text-xs uppercase tracking-ultra text-white/50">
                {t(stat.key)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
