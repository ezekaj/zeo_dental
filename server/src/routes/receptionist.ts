import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import type {
  LoginRequest,
  LoginResponse,
  BookingFilters,
  BookingsListResponse,
  ConfirmBookingRequest,
  CancelBookingRequest,
  DashboardStats,
  Booking,
} from '../types.js';
import { sendConfirmationEmail, sendCancellationEmail } from '../services/emailTemplates.js';
import { sendWhatsAppConfirmation, sendWhatsAppCancellation } from '../services/whatsapp.js';

export async function receptionistRoutes(fastify: FastifyInstance) {
  const adminToken = process.env.ADMIN_TOKEN;

  // Auth middleware for all receptionist routes
  const authPreHandler = async (request: FastifyRequest, reply: FastifyReply) => {
    if (!adminToken) {
      return reply.status(503).send({ success: false, error: 'Admin access not configured' });
    }
    const authHeader = request.headers.authorization;
    if (authHeader !== `Bearer ${adminToken}`) {
      return reply.status(401).send({ success: false, error: 'Unauthorized' });
    }
  };

  // POST /api/receptionist/login - Validate password
  fastify.post<{ Body: LoginRequest; Reply: LoginResponse }>(
    '/receptionist/login',
    async (request, reply) => {
      const { password } = request.body;

      if (!adminToken) {
        return reply.status(503).send({
          success: false,
          message: 'Admin access not configured',
        });
      }

      if (password === adminToken) {
        return reply.send({
          success: true,
          message: 'Login successful',
          token: adminToken,
        });
      }

      return reply.status(401).send({
        success: false,
        message: 'Invalid password',
      });
    }
  );

  // GET /api/receptionist/stats - Dashboard statistics
  fastify.get<{ Reply: DashboardStats }>(
    '/receptionist/stats',
    { preHandler: authPreHandler },
    async (request, reply) => {
      try {
        const pool = fastify.pg;

        const today = new Date().toISOString().split('T')[0];
        const weekFromNow = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split('T')[0];

        const [pendingResult, todayResult, weekResult, confirmedTodayResult] = await Promise.all([
          pool.query("SELECT COUNT(*) FROM bookings WHERE status = 'pending'"),
          pool.query('SELECT COUNT(*) FROM bookings WHERE preferred_date = $1', [today]),
          pool.query('SELECT COUNT(*) FROM bookings WHERE preferred_date BETWEEN $1 AND $2', [
            today,
            weekFromNow,
          ]),
          pool.query(
            "SELECT COUNT(*) FROM bookings WHERE confirmed_date = $1 AND status = 'confirmed'",
            [today]
          ),
        ]);

        return reply.send({
          pending_count: parseInt(pendingResult.rows[0].count, 10),
          today_count: parseInt(todayResult.rows[0].count, 10),
          week_count: parseInt(weekResult.rows[0].count, 10),
          confirmed_today: parseInt(confirmedTodayResult.rows[0].count, 10),
        });
      } catch (err) {
        fastify.log.error('Stats error: %s', err instanceof Error ? err.message : String(err));
        return reply.status(500).send({
          pending_count: 0,
          today_count: 0,
          week_count: 0,
          confirmed_today: 0,
        });
      }
    }
  );

  // GET /api/receptionist/chat-stats - Chatbot usage statistics
  fastify.get(
    '/receptionist/chat-stats',
    { preHandler: authPreHandler },
    async (request, reply) => {
      try {
        const pool = fastify.pg;

        // Check if chat_usage table exists
        const tableCheck = await pool.query(`
          SELECT EXISTS (
            SELECT FROM information_schema.tables
            WHERE table_name = 'chat_usage'
          )
        `);

        if (!tableCheck.rows[0].exists) {
          return reply.send({
            today: { tokens: 0, cost: 0, messages: 0 },
            week: { tokens: 0, cost: 0, messages: 0 },
            month: { tokens: 0, cost: 0, messages: 0 },
            total: { tokens: 0, cost: 0, messages: 0 },
          });
        }

        const [todayResult, weekResult, monthResult, totalResult] = await Promise.all([
          pool.query(`
            SELECT COALESCE(SUM(total_tokens), 0) as tokens,
                   COALESCE(SUM(estimated_cost), 0) as cost,
                   COUNT(*) as messages
            FROM chat_usage
            WHERE DATE(created_at) = CURRENT_DATE
          `),
          pool.query(`
            SELECT COALESCE(SUM(total_tokens), 0) as tokens,
                   COALESCE(SUM(estimated_cost), 0) as cost,
                   COUNT(*) as messages
            FROM chat_usage
            WHERE created_at >= NOW() - INTERVAL '7 days'
          `),
          pool.query(`
            SELECT COALESCE(SUM(total_tokens), 0) as tokens,
                   COALESCE(SUM(estimated_cost), 0) as cost,
                   COUNT(*) as messages
            FROM chat_usage
            WHERE created_at >= NOW() - INTERVAL '30 days'
          `),
          pool.query(`
            SELECT COALESCE(SUM(total_tokens), 0) as tokens,
                   COALESCE(SUM(estimated_cost), 0) as cost,
                   COUNT(*) as messages
            FROM chat_usage
          `),
        ]);

        return reply.send({
          today: {
            tokens: parseInt(todayResult.rows[0].tokens, 10),
            cost: parseFloat(todayResult.rows[0].cost),
            messages: parseInt(todayResult.rows[0].messages, 10),
          },
          week: {
            tokens: parseInt(weekResult.rows[0].tokens, 10),
            cost: parseFloat(weekResult.rows[0].cost),
            messages: parseInt(weekResult.rows[0].messages, 10),
          },
          month: {
            tokens: parseInt(monthResult.rows[0].tokens, 10),
            cost: parseFloat(monthResult.rows[0].cost),
            messages: parseInt(monthResult.rows[0].messages, 10),
          },
          total: {
            tokens: parseInt(totalResult.rows[0].tokens, 10),
            cost: parseFloat(totalResult.rows[0].cost),
            messages: parseInt(totalResult.rows[0].messages, 10),
          },
        });
      } catch (err) {
        fastify.log.error('Chat stats error: %s', err instanceof Error ? err.message : String(err));
        return reply.send({
          today: { tokens: 0, cost: 0, messages: 0 },
          week: { tokens: 0, cost: 0, messages: 0 },
          month: { tokens: 0, cost: 0, messages: 0 },
          total: { tokens: 0, cost: 0, messages: 0 },
        });
      }
    }
  );

  // GET /api/receptionist/bookings - List bookings with filters
  fastify.get<{ Querystring: BookingFilters; Reply: BookingsListResponse }>(
    '/receptionist/bookings',
    { preHandler: authPreHandler },
    async (request, reply) => {
      try {
        const { status, date_from, date_to, search, limit = 50, offset = 0 } = request.query;
        const pool = fastify.pg;

        const whereConditions: string[] = [];
        const params: (string | number)[] = [];
        let paramIndex = 1;

        if (status) {
          whereConditions.push(`status = $${paramIndex++}`);
          params.push(status);
        }

        if (date_from) {
          whereConditions.push(`preferred_date >= $${paramIndex++}`);
          params.push(date_from);
        }

        if (date_to) {
          whereConditions.push(`preferred_date <= $${paramIndex++}`);
          params.push(date_to);
        }

        if (search) {
          whereConditions.push(
            `(name ILIKE $${paramIndex} OR email ILIKE $${paramIndex} OR phone ILIKE $${paramIndex})`
          );
          params.push(`%${search}%`);
          paramIndex++;
        }

        const whereClause =
          whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';

        // Get total count
        const countResult = await pool.query(
          `SELECT COUNT(*) FROM bookings ${whereClause}`,
          params
        );
        const total = parseInt(countResult.rows[0].count, 10);

        // Get pending count
        const pendingResult = await pool.query(
          "SELECT COUNT(*) FROM bookings WHERE status = 'pending'"
        );
        const pending_count = parseInt(pendingResult.rows[0].count, 10);

        // Get bookings
        const bookingsResult = await pool.query(
          `SELECT * FROM bookings ${whereClause} ORDER BY
            CASE WHEN status = 'pending' THEN 0 ELSE 1 END,
            created_at DESC
           LIMIT $${paramIndex++} OFFSET $${paramIndex}`,
          [...params, limit, offset]
        );

        return reply.send({
          success: true,
          bookings: bookingsResult.rows,
          total,
          pending_count,
        });
      } catch (err) {
        fastify.log.error(
          'Bookings list error: %s',
          err instanceof Error ? err.message : String(err)
        );
        return reply.status(500).send({
          success: false,
          bookings: [],
          total: 0,
          pending_count: 0,
        });
      }
    }
  );

  // GET /api/receptionist/bookings/:id - Get single booking
  fastify.get<{ Params: { id: string } }>(
    '/receptionist/bookings/:id',
    { preHandler: authPreHandler },
    async (request, reply) => {
      try {
        const { id } = request.params;
        const pool = fastify.pg;

        const result = await pool.query('SELECT * FROM bookings WHERE id = $1', [id]);

        if (result.rows.length === 0) {
          return reply.status(404).send({ success: false, error: 'Booking not found' });
        }

        return reply.send({ success: true, booking: result.rows[0] });
      } catch (err) {
        fastify.log.error(
          'Get booking error: %s',
          err instanceof Error ? err.message : String(err)
        );
        return reply.status(500).send({ success: false, error: 'Failed to fetch booking' });
      }
    }
  );

  // PATCH /api/receptionist/bookings/:id/confirm - Confirm booking
  fastify.patch<{ Params: { id: string }; Body: ConfirmBookingRequest }>(
    '/receptionist/bookings/:id/confirm',
    { preHandler: authPreHandler },
    async (request, reply) => {
      try {
        const { id } = request.params;
        const { confirmed_date, confirmed_time, send_whatsapp, send_email, notes } = request.body;
        const pool = fastify.pg;

        // Update booking
        const result = await pool.query(
          `UPDATE bookings SET
            status = 'confirmed',
            confirmed_date = $1,
            confirmed_time = $2,
            confirmed_at = NOW(),
            notes = COALESCE($3, notes),
            updated_at = NOW()
           WHERE id = $4
           RETURNING *`,
          [confirmed_date, confirmed_time, notes, id]
        );

        if (result.rows.length === 0) {
          return reply.status(404).send({ success: false, error: 'Booking not found' });
        }

        const booking: Booking = result.rows[0];
        let whatsapp_sent = false;
        let email_sent = false;

        // Send WhatsApp notification
        if (send_whatsapp && booking.phone) {
          try {
            whatsapp_sent = await sendWhatsAppConfirmation(booking);
            if (whatsapp_sent) {
              await pool.query('UPDATE bookings SET whatsapp_sent = TRUE WHERE id = $1', [id]);
            }
          } catch (whatsappErr) {
            fastify.log.error(
              'WhatsApp error: %s',
              whatsappErr instanceof Error ? whatsappErr.message : String(whatsappErr)
            );
          }
        }

        // Send email notification
        if (send_email && booking.email) {
          try {
            await sendConfirmationEmail(booking, fastify);
            email_sent = true;
            await pool.query('UPDATE bookings SET confirmation_email_sent = TRUE WHERE id = $1', [
              id,
            ]);
          } catch (emailErr) {
            fastify.log.error(
              'Email error: %s',
              emailErr instanceof Error ? emailErr.message : String(emailErr)
            );
          }
        }

        fastify.log.info(
          'Booking %s confirmed. WhatsApp: %s, Email: %s',
          id,
          whatsapp_sent,
          email_sent
        );

        return reply.send({
          success: true,
          message: 'Booking confirmed',
          booking: result.rows[0],
          whatsapp_sent,
          email_sent,
        });
      } catch (err) {
        fastify.log.error(
          'Confirm booking error: %s',
          err instanceof Error ? err.message : String(err)
        );
        return reply.status(500).send({ success: false, error: 'Failed to confirm booking' });
      }
    }
  );

  // PATCH /api/receptionist/bookings/:id/cancel - Cancel booking
  fastify.patch<{ Params: { id: string }; Body: CancelBookingRequest }>(
    '/receptionist/bookings/:id/cancel',
    { preHandler: authPreHandler },
    async (request, reply) => {
      try {
        const { id } = request.params;
        const { reason, notify_patient } = request.body;
        const pool = fastify.pg;

        const result = await pool.query(
          `UPDATE bookings SET
            status = 'cancelled',
            cancellation_reason = $1,
            updated_at = NOW()
           WHERE id = $2
           RETURNING *`,
          [reason || null, id]
        );

        if (result.rows.length === 0) {
          return reply.status(404).send({ success: false, error: 'Booking not found' });
        }

        const booking: Booking = result.rows[0];

        // Send cancellation notifications if requested
        if (notify_patient) {
          if (booking.phone) {
            try {
              await sendWhatsAppCancellation(booking);
            } catch (err) {
              fastify.log.error(
                'WhatsApp cancellation error: %s',
                err instanceof Error ? err.message : String(err)
              );
            }
          }
          if (booking.email) {
            try {
              await sendCancellationEmail(booking, fastify);
            } catch (err) {
              fastify.log.error(
                'Email cancellation error: %s',
                err instanceof Error ? err.message : String(err)
              );
            }
          }
        }

        fastify.log.info('Booking %s cancelled. Reason: %s', id, reason || 'Not specified');

        return reply.send({
          success: true,
          message: 'Booking cancelled',
          booking: result.rows[0],
        });
      } catch (err) {
        fastify.log.error(
          'Cancel booking error: %s',
          err instanceof Error ? err.message : String(err)
        );
        return reply.status(500).send({ success: false, error: 'Failed to cancel booking' });
      }
    }
  );

  // PATCH /api/receptionist/bookings/:id/status - Update status (completed, no_show)
  fastify.patch<{ Params: { id: string }; Body: { status: string } }>(
    '/receptionist/bookings/:id/status',
    { preHandler: authPreHandler },
    async (request, reply) => {
      try {
        const { id } = request.params;
        const { status } = request.body;
        const pool = fastify.pg;

        const validStatuses = ['pending', 'confirmed', 'cancelled', 'completed', 'no_show'];
        if (!validStatuses.includes(status)) {
          return reply.status(400).send({ success: false, error: 'Invalid status' });
        }

        const result = await pool.query(
          `UPDATE bookings SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *`,
          [status, id]
        );

        if (result.rows.length === 0) {
          return reply.status(404).send({ success: false, error: 'Booking not found' });
        }

        return reply.send({
          success: true,
          message: 'Status updated',
          booking: result.rows[0],
        });
      } catch (err) {
        fastify.log.error(
          'Update status error: %s',
          err instanceof Error ? err.message : String(err)
        );
        return reply.status(500).send({ success: false, error: 'Failed to update status' });
      }
    }
  );
}
