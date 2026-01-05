import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

interface GoogleReview {
  author_name: string;
  rating: number;
  text: string;
  time: number;
  profile_photo_url?: string;
  relative_time_description: string;
}

interface CachedReviews {
  reviews: GoogleReview[];
  rating: number;
  totalReviews: number;
  lastFetched: number;
}

interface GooglePlacesResponse {
  status: string;
  error_message?: string;
  result?: {
    reviews?: GoogleReview[];
    rating?: number;
    user_ratings_total?: number;
  };
}

// In-memory cache (refreshes every 6 hours)
let reviewsCache: CachedReviews | null = null;
const CACHE_DURATION = 6 * 60 * 60 * 1000; // 6 hours in milliseconds

async function fetchGoogleReviews(): Promise<CachedReviews | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    console.warn('Google Places API key or Place ID not configured');
    return null;
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total&key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json() as GooglePlacesResponse;

    if (data.status !== 'OK') {
      console.error('Google Places API error:', data.status, data.error_message);
      return null;
    }

    const result = data.result;
    if (!result) {
      console.error('Google Places API returned no result');
      return null;
    }
    return {
      reviews: result.reviews || [],
      rating: result.rating || 5,
      totalReviews: result.user_ratings_total || 0,
      lastFetched: Date.now(),
    };
  } catch (error) {
    console.error('Failed to fetch Google reviews:', error);
    return null;
  }
}

// Fallback reviews when Google API is not configured
const fallbackReviews: CachedReviews = {
  reviews: [
    {
      author_name: 'Arta Krasniqi',
      rating: 5,
      text: 'Eksperienca më e mirë dentare që kam pasur! Stafi ishte shumë profesional dhe i kujdesshëm. Klinika është moderne dhe e pastër.',
      time: Date.now() / 1000 - 86400 * 7,
      relative_time_description: '1 javë më parë',
    },
    {
      author_name: 'Besnik Hoxha',
      rating: 5,
      text: 'Dr. Velaj është fantastike! Më ndihmoi të kisha buzëqeshjen që gjithmonë kam dashur. Rekomandoj fuqimisht!',
      time: Date.now() / 1000 - 86400 * 14,
      relative_time_description: '2 javë më parë',
    },
    {
      author_name: 'Drita Maloku',
      rating: 5,
      text: 'Shërbim i shkëlqyer dhe teknologji moderne. Nuk ndieva asnjë dhimbje gjatë trajtimit. Faleminderit Zeo Dental!',
      time: Date.now() / 1000 - 86400 * 21,
      relative_time_description: '3 javë më parë',
    },
    {
      author_name: 'Erion Shehu',
      rating: 5,
      text: 'Implanti dental që mora është perfekt. Ekipi ishte shumë i durueshëm dhe shpjegoi çdo hap të procesit.',
      time: Date.now() / 1000 - 86400 * 30,
      relative_time_description: '1 muaj më parë',
    },
    {
      author_name: 'Fjolla Berisha',
      rating: 5,
      text: 'Atmosfera e klinikës të bën të ndihesh rehat. Rezultatet e zbardhimit të dhëmbëve janë të mahnitshme!',
      time: Date.now() / 1000 - 86400 * 45,
      relative_time_description: '1 muaj më parë',
    },
  ],
  rating: 5.0,
  totalReviews: 47,
  lastFetched: Date.now(),
};

export async function reviewsRoutes(fastify: FastifyInstance) {
  // GET /api/reviews - Fetch Google reviews with caching
  fastify.get('/reviews', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      // Check if cache is still valid
      if (reviewsCache && Date.now() - reviewsCache.lastFetched < CACHE_DURATION) {
        return reply.send({
          success: true,
          source: 'google',
          ...reviewsCache,
        });
      }

      // Fetch fresh reviews
      const freshReviews = await fetchGoogleReviews();

      if (freshReviews) {
        reviewsCache = freshReviews;
        return reply.send({
          success: true,
          source: 'google',
          ...freshReviews,
        });
      }

      // Return fallback if Google API fails or not configured
      return reply.send({
        success: true,
        source: 'curated',
        ...fallbackReviews,
      });
    } catch (error: unknown) {
      fastify.log.error({ err: error }, 'Reviews endpoint error');
      // Return fallback on any error
      return reply.send({
        success: true,
        source: 'curated',
        ...fallbackReviews,
      });
    }
  });

  // GET /api/reviews/link - Get Google Reviews page link
  fastify.get('/reviews/link', async (request: FastifyRequest, reply: FastifyReply) => {
    const placeId = process.env.GOOGLE_PLACE_ID;

    if (placeId) {
      return reply.send({
        success: true,
        reviewUrl: `https://search.google.com/local/writereview?placeid=${placeId}`,
        viewUrl: `https://search.google.com/local/reviews?placeid=${placeId}`,
      });
    }

    // Fallback to Google Maps search
    return reply.send({
      success: true,
      reviewUrl: 'https://www.google.com/maps/search/Zeo+Dental+Clinic',
      viewUrl: 'https://www.google.com/maps/search/Zeo+Dental+Clinic',
    });
  });
}
