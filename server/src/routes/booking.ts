import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import nodemailer from 'nodemailer';
import type { BookingRequest, BookingResponse } from '../types.js';

// Validation helpers
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\d\s\-\(\)\+]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

function isValidFutureDate(dateString: string): boolean {
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date >= today;
}

export async function bookingRoutes(fastify: FastifyInstance) {
  const adminToken = process.env.ADMIN_TOKEN;
  const mailHost = process.env.SMTP_HOST;
  const mailPort = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
  const mailUser = process.env.SMTP_USER;
  const mailPass = process.env.SMTP_PASS;
  const mailFrom = process.env.MAIL_FROM || 'no-reply@zeodental.com';
  const mailTo = process.env.MAIL_TO || 'zeodentalclinic@gmail.com';

  const mailEnabled = Boolean(mailHost && mailPort && mailUser && mailPass);

  const transporter = mailEnabled
    ? nodemailer.createTransport({
        host: mailHost,
        port: mailPort,
        secure: mailPort === 465,
        auth: { user: mailUser, pass: mailPass },
      })
    : null;

  fastify.post<{
    Body: BookingRequest;
    Reply: BookingResponse;
  }>('/booking', async (request: FastifyRequest<{ Body: BookingRequest }>, reply: FastifyReply) => {
    const { name, email, phone, service, date, time, notes, honeypot } = request.body;

    // Honeypot spam check
    if (honeypot && honeypot.trim().length > 0) {
      return reply.status(400).send({
        success: false,
        message: 'Invalid submission',
        error: 'Spam detected',
      });
    }

    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'service', 'date', 'time'] as const;
    for (const field of requiredFields) {
      if (!request.body[field]) {
        return reply.status(400).send({
          success: false,
          message: `Missing required field: ${field}`,
          error: `Missing required field: ${field}`,
        });
      }
    }

    // Validate email
    if (!isValidEmail(email)) {
      return reply.status(400).send({
        success: false,
        message: 'Invalid email format',
        error: 'Invalid email format',
      });
    }

    // Validate phone
    if (!isValidPhone(phone)) {
      return reply.status(400).send({
        success: false,
        message: 'Invalid phone number format',
        error: 'Invalid phone number format',
      });
    }

    // Validate date
    if (!isValidFutureDate(date)) {
      return reply.status(400).send({
        success: false,
        message: 'Date must be today or in the future',
        error: 'Date must be today or in the future',
      });
    }

    // Validate time slot
    const validTimeSlots = ['morning', 'afternoon', 'evening'];
    if (!validTimeSlots.includes(time.toLowerCase())) {
      return reply.status(400).send({
        success: false,
        message: 'Invalid time slot. Use: morning, afternoon, or evening',
        error: 'Invalid time slot',
      });
    }

    try {
      const pool = fastify.pg;

      const result = await pool.query(
        `INSERT INTO bookings (name, email, phone, service, preferred_date, preferred_time, notes, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         RETURNING id, name, email, service, preferred_date, preferred_time, status`,
        [
          name.trim(),
          email.trim().toLowerCase(),
          phone.trim(),
          service.trim(),
          date,
          time.toLowerCase(),
          notes?.trim() || null,
          'pending',
        ]
      );

      const booking = result.rows[0];

      fastify.log.info('New booking created: %s', booking.id);

      // Fire-and-forget email notifications (non-blocking)
      if (mailEnabled && transporter) {
        const clinicMail = {
          from: mailFrom,
          to: mailTo,
          subject: `New booking: ${booking.service} - ${booking.name}`,
          text: `New booking request\nName: ${booking.name}\nEmail: ${booking.email}\nPhone: ${booking.phone}\nService: ${booking.service}\nDate: ${booking.preferred_date}\nTime: ${booking.preferred_time}\nNotes: ${notes || 'N/A'}`,
        };

        const patientMail = {
          from: mailFrom,
          to: booking.email,
          subject: 'We received your booking request',
          text: `Hi ${booking.name},\n\nThank you for reaching out to Zeo Dental Clinic. We received your request for ${booking.service} on ${booking.preferred_date} (${booking.preferred_time}). Our concierge team will contact you to confirm your appointment.\n\nIf this wasn’t you, please call us at +355 68 400 4840.\n\nZeo Dental Clinic\n123 Premium Blvd, Beverly Hills, CA 90210`,
        };

        transporter
          .sendMail(clinicMail)
          .catch((err: unknown) =>
            fastify.log.error('Clinic email failed: %s', err instanceof Error ? err.message : String(err))
          );

        transporter
          .sendMail(patientMail)
          .catch((err: unknown) =>
            fastify.log.error('Patient email failed: %s', err instanceof Error ? err.message : String(err))
          );
      } else {
        fastify.log.warn('Mail not configured; skipping booking notifications');
      }

      return reply.status(201).send({
        success: true,
        message: 'Booking request submitted successfully',
        booking: {
          id: booking.id,
          name: booking.name,
          email: booking.email,
          service: booking.service,
          date: booking.preferred_date,
          time: booking.preferred_time,
          status: booking.status,
        },
      });
    } catch (err) {
      fastify.log.error('Booking error: %s', err instanceof Error ? err.message : String(err));
      return reply.status(500).send({
        success: false,
        message: 'Failed to create booking. Please try again.',
        error: 'Database error',
      });
    }
  });

  // Get bookings (admin endpoint - would need auth in production)
  fastify.get('/bookings', {
    preHandler: async (request, reply) => {
      if (!adminToken) {
        return reply.status(503).send({ error: 'Admin access not configured' });
      }
      const authHeader = request.headers.authorization;
      if (authHeader !== `Bearer ${adminToken}`) {
        return reply.status(401).send({ error: 'Unauthorized' });
      }
    }
  }, async (request, reply) => {
    try {
      const pool = fastify.pg;
      const result = await pool.query(
        'SELECT * FROM bookings ORDER BY created_at DESC LIMIT 100'
      );
      return reply.send({ bookings: result.rows });
    } catch (err) {
      fastify.log.error('Get bookings error: %s', err instanceof Error ? err.message : String(err));
      return reply.status(500).send({ error: 'Failed to fetch bookings' });
    }
  });
}
