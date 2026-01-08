import React, { useEffect } from 'react';
import { useTranslation } from '../hooks/useTranslation';

/**
 * GoogleReviews Component
 *
 * Uses Elfsight free widget to display Google Reviews.
 * The widget auto-updates from Google Business Profile.
 *
 * Setup instructions:
 * 1. Go to https://elfsight.com/google-reviews-widget/
 * 2. Create a free account
 * 3. Add your Google Business Profile
 * 4. Customize the widget appearance
 * 5. Copy the widget ID (e.g., "abc123-def456-...")
 * 6. Set VITE_ELFSIGHT_WIDGET_ID in your .env file
 *
 * Alternative: Use Trustindex.io (also free)
 */

export const GoogleReviews: React.FC = () => {
  const { t } = useTranslation();
  const widgetId = import.meta.env.VITE_ELFSIGHT_WIDGET_ID;

  useEffect(() => {
    // Load Elfsight script if widget ID is configured
    if (widgetId && !document.querySelector('script[src*="elfsight"]')) {
      const script = document.createElement('script');
      script.src = 'https://elfsightcdn.com/platform.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, [widgetId]);

  return (
    <div className="py-24 bg-white" id="reviews">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-primary-600 font-semibold tracking-widest text-xs uppercase mb-3">
            {t('reviews.label')}
          </h2>
          <h3 className="text-4xl font-serif font-bold text-primary-900 mb-6">
            {t('reviews.title')}
          </h3>
        </div>

        {/* Widget Container */}
        <div className="flex justify-center">
          {widgetId ? (
            // Elfsight widget - auto-updates from Google
            <div
              className={`elfsight-app-${widgetId}`}
              data-elfsight-app-lazy
            />
          ) : (
            // Placeholder when widget not configured
            <div className="text-center py-12 px-8 bg-primary-50 rounded-2xl border border-primary-100 max-w-2xl">
              <div className="flex justify-center mb-4">
                <svg className="w-12 h-12 text-primary-400" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </div>
              <p className="text-primary-700 font-medium mb-2">
                Google Reviews Widget
              </p>
              <p className="text-primary-600 text-sm">
                Configure Elfsight widget to display real Google reviews
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
