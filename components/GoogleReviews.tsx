import React, { useState, useEffect, useCallback } from 'react';
import { Star, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

interface Review {
  author_name: string;
  rating: number;
  text: string;
  time: number;
  profile_photo_url?: string;
  relative_time_description: string;
}

interface ReviewsData {
  success: boolean;
  source: 'google' | 'curated';
  reviews: Review[];
  rating: number;
  totalReviews: number;
}

export const GoogleReviews: React.FC = () => {
  const { t } = useTranslation();
  const [reviewsData, setReviewsData] = useState<ReviewsData | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [reviewLinks, setReviewLinks] = useState<{ reviewUrl: string; viewUrl: string } | null>(null);

  // Fetch reviews from API
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const API_BASE = import.meta.env.DEV ? 'http://localhost:3000' : '';
        const [reviewsRes, linksRes] = await Promise.all([
          fetch(`${API_BASE}/api/reviews`),
          fetch(`${API_BASE}/api/reviews/link`),
        ]);

        const reviews = await reviewsRes.json();
        const links = await linksRes.json();

        if (reviews.success) {
          setReviewsData(reviews);
        }
        if (links.success) {
          setReviewLinks(links);
        }
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
      }
    };

    fetchReviews();
  }, []);

  // Auto-slide every 5 seconds
  useEffect(() => {
    if (!reviewsData || reviewsData.reviews.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [reviewsData, currentIndex, isPaused]);

  const handlePrev = useCallback(() => {
    if (isAnimating || !reviewsData) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === 0 ? reviewsData.reviews.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, reviewsData]);

  const handleNext = useCallback(() => {
    if (isAnimating || !reviewsData) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === reviewsData.reviews.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, reviewsData]);

  if (!reviewsData) {
    return (
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 bg-primary-100 rounded w-64 mb-4"></div>
            <div className="h-4 bg-primary-100 rounded w-48 mb-8"></div>
            <div className="h-48 bg-primary-50 rounded-2xl w-full max-w-2xl"></div>
          </div>
        </div>
      </div>
    );
  }

  const { reviews, rating, totalReviews, source } = reviewsData;

  // Get visible reviews for the slider (show 1 on mobile, 3 on desktop)
  const getVisibleReviews = () => {
    const result = [];
    for (let i = 0; i < Math.min(3, reviews.length); i++) {
      const index = (currentIndex + i) % reviews.length;
      result.push({ ...reviews[index], displayIndex: i });
    }
    return result;
  };

  return (
    <div className="py-24 bg-white overflow-hidden" id="reviews">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-primary-600 font-semibold tracking-widest text-xs uppercase mb-3">
            {t('reviews.label')}
          </h2>
          <h3 className="text-4xl font-serif font-bold text-primary-900 mb-6">
            {t('reviews.title')}
          </h3>

          {/* Google Rating Badge */}
          <div className="inline-flex items-center gap-4 bg-primary-50 rounded-full px-6 py-3 border border-primary-100">
            <div className="flex items-center gap-2">
              {/* Google Logo */}
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={18}
                    className={star <= Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'}
                    fill={star <= Math.round(rating) ? 'currentColor' : 'none'}
                  />
                ))}
              </div>
              <span className="font-bold text-primary-900">{rating.toFixed(1)}</span>
            </div>
            <div className="w-px h-6 bg-primary-200"></div>
            <span className="text-primary-700 text-sm font-medium">
              {totalReviews} {t('reviews.reviewCount')}
            </span>
          </div>
        </div>

        {/* Slider Container */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg border border-primary-100 flex items-center justify-center text-primary-600 hover:bg-primary-50 hover:text-primary-700 transition-all hover:scale-110 hidden md:flex"
            aria-label="Previous review"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg border border-primary-100 flex items-center justify-center text-primary-600 hover:bg-primary-50 hover:text-primary-700 transition-all hover:scale-110 hidden md:flex"
            aria-label="Next review"
          >
            <ChevronRight size={24} />
          </button>

          {/* Reviews Grid */}
          <div className="overflow-hidden px-4 md:px-8">
            <div
              className="flex gap-6 transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / Math.min(3, reviews.length))}%)`,
              }}
            >
              {reviews.map((review, index) => (
                <div
                  key={`${review.author_name}-${index}`}
                  className={`flex-shrink-0 w-full md:w-[calc(33.333%-1rem)] transition-all duration-500 ${
                    index === currentIndex
                      ? 'opacity-100 scale-100'
                      : 'opacity-70 scale-95 md:opacity-100 md:scale-100'
                  }`}
                >
                  <div className="bg-primary-50 p-8 rounded-2xl border border-primary-100 hover:border-primary-200 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                    {/* Rating Stars */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}
                          fill={i < review.rating ? 'currentColor' : 'none'}
                        />
                      ))}
                    </div>

                    {/* Review Text */}
                    <p className="text-primary-800 italic mb-6 flex-1 font-light text-lg leading-relaxed line-clamp-4">
                      "{review.text}"
                    </p>

                    {/* Reviewer Info */}
                    <div className="flex items-center gap-3">
                      {review.profile_photo_url ? (
                        <img
                          src={review.profile_photo_url}
                          alt={review.author_name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-primary-200 flex items-center justify-center font-serif font-bold text-primary-700">
                          {review.author_name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <h5 className="font-semibold text-primary-900">{review.author_name}</h5>
                        <p className="text-xs text-primary-600">{review.relative_time_description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAnimating(true);
                  setCurrentIndex(index);
                  setTimeout(() => setIsAnimating(false), 500);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-primary-600 w-8'
                    : 'bg-primary-200 hover:bg-primary-300'
                }`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href={reviewLinks?.reviewUrl || 'https://www.google.com/maps/search/Zeo+Dental+Clinic'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-full font-semibold hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl"
          >
            {t('reviews.leaveReview')}
            <ExternalLink size={18} />
          </a>
          {source === 'google' && (
            <p className="text-xs text-primary-500 mt-3 flex items-center justify-center gap-1">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {t('reviews.poweredBy')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
