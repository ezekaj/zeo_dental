import Fastify from 'fastify';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { bookingRoutes } from '../src/routes/booking.js';

describe('bookingRoutes', () => {
  const makeFastify = () => {
    const app = Fastify();

    // Mock pg pool
    const mockQuery = vi.fn().mockResolvedValue({
      rows: [
        {
          id: 'uuid-1',
          name: 'John Doe',
          email: 'john@example.com',
          service: 'Cosmetic Dentistry',
          preferred_date: '2024-12-25',
          preferred_time: 'morning',
          status: 'pending',
        },
      ],
    });

    app.decorate('pg', { query: mockQuery });
    return { app, mockQuery } as const;
  };

  beforeEach(() => {
    process.env.ADMIN_TOKEN = 'test-token';
  });

  it('creates a booking with valid payload', async () => {
    const { app, mockQuery } = makeFastify();
    await app.register(bookingRoutes, { prefix: '/api' });
    await app.ready();

    const response = await app.inject({
      method: 'POST',
      url: '/api/booking',
      payload: {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+355 68 400 4840',
        service: 'Cosmetic Dentistry',
        date: '2027-12-25',
        time: 'morning',
        notes: 'Looking forward',
      },
    });

    expect(response.statusCode).toBe(201);
    const body = response.json();
    expect(body.success).toBe(true);
    expect(mockQuery).toHaveBeenCalledOnce();
  });

  it('rejects missing required fields', async () => {
    const { app } = makeFastify();
    await app.register(bookingRoutes, { prefix: '/api' });
    await app.ready();

    const response = await app.inject({
      method: 'POST',
      url: '/api/booking',
      payload: {
        name: '',
        email: 'john@example.com',
        phone: '+355 68 400 4840',
        service: 'Cosmetic Dentistry',
        date: '2027-12-25',
        time: 'morning',
      },
    });

    expect(response.statusCode).toBe(400);
  });
});
