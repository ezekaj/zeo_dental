import React, { useState, useCallback } from 'react';
import { ImageOff } from 'lucide-react';
import { Skeleton } from './Skeleton';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  showSkeleton?: boolean;
  skeletonClassName?: string;
  errorClassName?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  fallbackSrc,
  showSkeleton = true,
  skeletonClassName = '',
  errorClassName = '',
  className = '',
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleError = useCallback(() => {
    setIsLoading(false);

    // Try fallback if available and not already using it
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setIsLoading(true);
    } else {
      setHasError(true);
    }
  }, [fallbackSrc, currentSrc]);

  // Show error state
  if (hasError) {
    return (
      <div
        className={`flex items-center justify-center bg-slate-100 text-slate-400 ${errorClassName || className}`}
        role="img"
        aria-label={`Image unavailable: ${alt}`}
      >
        <div className="text-center p-4">
          <ImageOff className="w-8 h-8 mx-auto mb-2" aria-hidden="true" />
          <span className="text-sm">Image unavailable</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Skeleton loader */}
      {isLoading && showSkeleton && (
        <Skeleton variant="rectangular" className={`absolute inset-0 ${skeletonClassName}`} />
      )}

      {/* Actual image */}
      <img
        src={currentSrc}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        {...props}
      />
    </div>
  );
};

// Preset for hero/banner images
export const HeroImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
}> = ({ src, alt, className = '' }) => (
  <ImageWithFallback
    src={src}
    alt={alt}
    className={`w-full h-full object-cover ${className}`}
    loading="eager"
  />
);

// Preset for team/avatar images
export const TeamImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
}> = ({ src, alt, className = '' }) => (
  <ImageWithFallback
    src={src}
    alt={alt}
    className={`w-full h-full object-cover ${className}`}
    loading="lazy"
  />
);
