import type { Booking } from '../types.js';

// WhatsApp Business API via Meta Cloud API
// Documentation: https://developers.facebook.com/docs/whatsapp/cloud-api

const WHATSAPP_API_URL = 'https://graph.facebook.com/v18.0';
const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const WHATSAPP_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;

const isWhatsAppEnabled = Boolean(WHATSAPP_PHONE_NUMBER_ID && WHATSAPP_ACCESS_TOKEN);

// Format date for Albanian locale
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return date.toLocaleDateString('sq-AL', options);
}

// Format phone number for WhatsApp (must include country code, no + symbol)
function formatPhoneForWhatsApp(phone: string): string {
  // Remove all non-digit characters
  let cleaned = phone.replace(/\D/g, '');

  // If starts with 0, assume Albanian number and add country code
  if (cleaned.startsWith('0')) {
    cleaned = '355' + cleaned.slice(1);
  }

  // If doesn't start with country code, assume Albanian
  if (!cleaned.startsWith('355') && cleaned.length <= 10) {
    cleaned = '355' + cleaned;
  }

  return cleaned;
}

// Send WhatsApp message using Cloud API
async function sendWhatsAppMessage(to: string, message: string): Promise<boolean> {
  if (!isWhatsAppEnabled) {
    console.log('[WhatsApp] Service not configured. Message would be sent to:', to);
    console.log('[WhatsApp] Message:', message);
    return false;
  }

  try {
    const response = await fetch(
      `${WHATSAPP_API_URL}/${WHATSAPP_PHONE_NUMBER_ID}/messages`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          recipient_type: 'individual',
          to: formatPhoneForWhatsApp(to),
          type: 'text',
          text: {
            preview_url: false,
            body: message,
          },
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error('[WhatsApp] API Error:', error);
      return false;
    }

    const result = await response.json();
    console.log('[WhatsApp] Message sent successfully:', result.messages?.[0]?.id);
    return true;
  } catch (error) {
    console.error('[WhatsApp] Send error:', error);
    return false;
  }
}

// Send confirmation message
export async function sendWhatsAppConfirmation(booking: Booking): Promise<boolean> {
  const confirmedDate = booking.confirmed_date ? formatDate(booking.confirmed_date) : formatDate(booking.preferred_date);
  const confirmedTime = booking.confirmed_time || booking.preferred_time;

  const message = `🦷 *Zeo Dental Clinic*

Përshëndetje ${booking.name}!

Takimi juaj është konfirmuar:

📅 *Data:* ${confirmedDate}
🕐 *Ora:* ${confirmedTime}
🏥 *Shërbimi:* ${booking.service}

📍 *Adresa:*
Rruga Hamdi Sina, Tiranë, Shqipëri

📞 Për ndryshime na kontaktoni:
+355 68 400 4840

Ju mirëpresim!
_Zeo Dental Clinic_`;

  return sendWhatsAppMessage(booking.phone, message);
}

// Send cancellation message
export async function sendWhatsAppCancellation(booking: Booking): Promise<boolean> {
  const preferredDate = formatDate(booking.preferred_date);

  const message = `🦷 *Zeo Dental Clinic*

Përshëndetje ${booking.name},

Takimi juaj për datën ${preferredDate} është anuluar.
${booking.cancellation_reason ? `\nArsyeja: ${booking.cancellation_reason}` : ''}

Për të ricaktuar një takim të ri, na kontaktoni:
📞 +355 68 400 4840
📧 zeodentalclinic@gmail.com

_Zeo Dental Clinic_`;

  return sendWhatsAppMessage(booking.phone, message);
}

// Send reminder message (can be used for day-before reminders)
export async function sendWhatsAppReminder(booking: Booking): Promise<boolean> {
  const confirmedDate = booking.confirmed_date ? formatDate(booking.confirmed_date) : formatDate(booking.preferred_date);
  const confirmedTime = booking.confirmed_time || booking.preferred_time;

  const message = `🦷 *Zeo Dental Clinic - Kujtesë*

Përshëndetje ${booking.name}!

Ju kujtojmë takimin tuaj nesër:

📅 *Data:* ${confirmedDate}
🕐 *Ora:* ${confirmedTime}

📍 Rruga Hamdi Sina, Tiranë

Në rast pamundësie, na njoftoni:
📞 +355 68 400 4840

Ju mirëpresim!
_Zeo Dental Clinic_`;

  return sendWhatsAppMessage(booking.phone, message);
}
