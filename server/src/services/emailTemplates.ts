import type { Booking } from '../types.js';
import type { FastifyInstance } from 'fastify';
import nodemailer from 'nodemailer';

// Get SMTP configuration
const mailHost = process.env.SMTP_HOST;
const mailPort = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
const mailUser = process.env.SMTP_USER;
const mailPass = process.env.SMTP_PASS;
const mailFrom = process.env.MAIL_FROM || 'noreply@zeodental.com';

const mailEnabled = Boolean(mailHost && mailPort && mailUser && mailPass);

const transporter = mailEnabled
  ? nodemailer.createTransport({
      host: mailHost,
      port: mailPort,
      secure: mailPort === 465,
      auth: { user: mailUser, pass: mailPass },
    })
  : null;

// Format date for display
function formatDate(dateString: string, language: 'sq' | 'en' = 'sq'): string {
  const date = new Date(dateString);
  const locale = language === 'sq' ? 'sq-AL' : 'en-US';
  return date.toLocaleDateString(locale, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// HTML Email Template for Confirmation
function getConfirmationEmailHtml(booking: Booking, language: 'sq' | 'en' = 'sq'): string {
  const confirmedDate = booking.confirmed_date || booking.preferred_date;
  const confirmedTime = booking.confirmed_time || booking.preferred_time;

  const content =
    language === 'sq'
      ? {
          subject: `Takimi juaj është konfirmuar - Zeo Dental`,
          greeting: `I/E nderuar ${booking.name}`,
          intro: `Takimi juaj është konfirmuar me sukses.`,
          detailsTitle: `Detajet e takimit`,
          service: `Shërbimi`,
          date: `Data`,
          time: `Ora`,
          address: `Adresa`,
          addressValue: `Rruga Hamdi Sina, Tiranë, Shqipëri`,
          contact: `Për ndryshime na kontaktoni`,
          phone: `+355 68 400 4840`,
          footer: `Ju faleminderit që zgjidhni Zeo Dental!`,
          note: `Ju lutemi paraqituni 10 minuta përpara orarit të caktuar.`,
        }
      : {
          subject: `Your Appointment is Confirmed - Zeo Dental`,
          greeting: `Dear ${booking.name}`,
          intro: `Your appointment has been successfully confirmed.`,
          detailsTitle: `Appointment Details`,
          service: `Service`,
          date: `Date`,
          time: `Time`,
          address: `Address`,
          addressValue: `Rruga Hamdi Sina, Tirana, Albania`,
          contact: `For changes, contact us`,
          phone: `+355 68 400 4840`,
          footer: `Thank you for choosing Zeo Dental!`,
          note: `Please arrive 10 minutes before your scheduled time.`,
        };

  return `
<!DOCTYPE html>
<html lang="${language}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${content.subject}</title>
  <style>
    body {
      font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #050505;
      background-color: #f9f9f9;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
    }
    .header {
      background-color: #050505;
      padding: 40px 30px;
      text-align: center;
    }
    .logo {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 36px;
      color: #ffffff;
      margin: 0;
    }
    .logo span {
      color: #C5A47E;
    }
    .content {
      padding: 40px 30px;
    }
    .greeting {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 24px;
      color: #050505;
      margin-bottom: 20px;
    }
    .intro {
      color: #666666;
      font-size: 16px;
      margin-bottom: 30px;
    }
    .details-box {
      background-color: #FAFAFA;
      border-left: 4px solid #C5A47E;
      padding: 25px;
      margin: 30px 0;
    }
    .details-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 18px;
      color: #050505;
      margin-bottom: 20px;
    }
    .detail-row {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      border-bottom: 1px solid #e5e5e5;
    }
    .detail-row:last-child {
      border-bottom: none;
    }
    .detail-label {
      color: #999999;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }
    .detail-value {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 16px;
      color: #050505;
      text-align: right;
    }
    .note {
      background-color: #FFF8F0;
      border: 1px solid #C5A47E;
      padding: 15px 20px;
      font-size: 14px;
      color: #666666;
      margin: 30px 0;
      border-radius: 4px;
    }
    .contact {
      text-align: center;
      margin: 30px 0;
      padding: 20px;
    }
    .contact-label {
      color: #999999;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 10px;
    }
    .contact-phone {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 24px;
      color: #050505;
    }
    .footer {
      background-color: #050505;
      padding: 30px;
      text-align: center;
    }
    .footer-text {
      color: #999999;
      font-size: 12px;
      margin: 0;
    }
    .footer-text a {
      color: #C5A47E;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 class="logo">ZEO<span>.</span></h1>
    </div>

    <div class="content">
      <h2 class="greeting">${content.greeting},</h2>
      <p class="intro">${content.intro}</p>

      <div class="details-box">
        <h3 class="details-title">${content.detailsTitle}</h3>
        <div class="detail-row">
          <span class="detail-label">${content.service}</span>
          <span class="detail-value">${booking.service}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">${content.date}</span>
          <span class="detail-value">${formatDate(confirmedDate, language)}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">${content.time}</span>
          <span class="detail-value">${confirmedTime}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">${content.address}</span>
          <span class="detail-value">${content.addressValue}</span>
        </div>
      </div>

      <div class="note">
        📋 ${content.note}
      </div>

      <div class="contact">
        <p class="contact-label">${content.contact}</p>
        <p class="contact-phone">${content.phone}</p>
      </div>
    </div>

    <div class="footer">
      <p class="footer-text">
        ${content.footer}<br>
        <a href="mailto:zeodentalclinic@gmail.com">zeodentalclinic@gmail.com</a> | ${content.phone}
      </p>
    </div>
  </div>
</body>
</html>
  `;
}

// HTML Email Template for Cancellation
function getCancellationEmailHtml(booking: Booking, language: 'sq' | 'en' = 'sq'): string {
  const content =
    language === 'sq'
      ? {
          subject: `Takimi juaj është anuluar - Zeo Dental`,
          greeting: `I/E nderuar ${booking.name}`,
          intro: `Ju informojmë që takimi juaj është anuluar.`,
          reason: booking.cancellation_reason ? `Arsyeja: ${booking.cancellation_reason}` : '',
          reschedule: `Për të ricaktuar një takim të ri, na kontaktoni:`,
          phone: `+355 68 400 4840`,
          email: `zeodentalclinic@gmail.com`,
          footer: `Zeo Dental Clinic`,
        }
      : {
          subject: `Your Appointment has been Cancelled - Zeo Dental`,
          greeting: `Dear ${booking.name}`,
          intro: `We inform you that your appointment has been cancelled.`,
          reason: booking.cancellation_reason ? `Reason: ${booking.cancellation_reason}` : '',
          reschedule: `To reschedule a new appointment, contact us:`,
          phone: `+355 68 400 4840`,
          email: `zeodentalclinic@gmail.com`,
          footer: `Zeo Dental Clinic`,
        };

  return `
<!DOCTYPE html>
<html lang="${language}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${content.subject}</title>
  <style>
    body {
      font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #050505;
      background-color: #f9f9f9;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
    }
    .header {
      background-color: #050505;
      padding: 40px 30px;
      text-align: center;
    }
    .logo {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 36px;
      color: #ffffff;
      margin: 0;
    }
    .logo span {
      color: #C5A47E;
    }
    .content {
      padding: 40px 30px;
    }
    .greeting {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 24px;
      color: #050505;
      margin-bottom: 20px;
    }
    .message {
      color: #666666;
      font-size: 16px;
      margin-bottom: 20px;
    }
    .reason {
      background-color: #FFF0F0;
      padding: 15px 20px;
      border-left: 4px solid #cc0000;
      margin: 20px 0;
      color: #666666;
    }
    .reschedule {
      background-color: #FAFAFA;
      padding: 25px;
      margin: 30px 0;
      text-align: center;
    }
    .reschedule-title {
      color: #999999;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 15px;
    }
    .reschedule-phone {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 24px;
      color: #050505;
      margin-bottom: 10px;
    }
    .reschedule-email {
      color: #C5A47E;
    }
    .footer {
      background-color: #050505;
      padding: 30px;
      text-align: center;
    }
    .footer-text {
      color: #999999;
      font-size: 12px;
      margin: 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 class="logo">ZEO<span>.</span></h1>
    </div>

    <div class="content">
      <h2 class="greeting">${content.greeting},</h2>
      <p class="message">${content.intro}</p>

      ${content.reason ? `<div class="reason">${content.reason}</div>` : ''}

      <div class="reschedule">
        <p class="reschedule-title">${content.reschedule}</p>
        <p class="reschedule-phone">${content.phone}</p>
        <p class="reschedule-email">${content.email}</p>
      </div>
    </div>

    <div class="footer">
      <p class="footer-text">${content.footer}</p>
    </div>
  </div>
</body>
</html>
  `;
}

// Send confirmation email
export async function sendConfirmationEmail(
  booking: Booking,
  fastify: FastifyInstance
): Promise<boolean> {
  if (!mailEnabled || !transporter) {
    fastify.log.warn('Mail not configured; skipping confirmation email');
    return false;
  }

  try {
    const html = getConfirmationEmailHtml(booking, 'sq');
    const subject = `Takimi juaj është konfirmuar - Zeo Dental`;

    await transporter.sendMail({
      from: `"Zeo Dental Clinic" <${mailFrom}>`,
      to: booking.email,
      subject,
      html,
    });

    fastify.log.info('Confirmation email sent to %s', booking.email);
    return true;
  } catch (error) {
    fastify.log.error(
      'Confirmation email error: %s',
      error instanceof Error ? error.message : String(error)
    );
    return false;
  }
}

// Send cancellation email
export async function sendCancellationEmail(
  booking: Booking,
  fastify: FastifyInstance
): Promise<boolean> {
  if (!mailEnabled || !transporter) {
    fastify.log.warn('Mail not configured; skipping cancellation email');
    return false;
  }

  try {
    const html = getCancellationEmailHtml(booking, 'sq');
    const subject = `Takimi juaj është anuluar - Zeo Dental`;

    await transporter.sendMail({
      from: `"Zeo Dental Clinic" <${mailFrom}>`,
      to: booking.email,
      subject,
      html,
    });

    fastify.log.info('Cancellation email sent to %s', booking.email);
    return true;
  } catch (error) {
    fastify.log.error(
      'Cancellation email error: %s',
      error instanceof Error ? error.message : String(error)
    );
    return false;
  }
}
