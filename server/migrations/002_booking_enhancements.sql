-- Migration: Add columns for confirmed appointment details and notifications
-- Run after 001_bookings.sql

-- Add columns for confirmed appointment details
ALTER TABLE bookings
  ADD COLUMN IF NOT EXISTS confirmed_date DATE,
  ADD COLUMN IF NOT EXISTS confirmed_time VARCHAR(20),
  ADD COLUMN IF NOT EXISTS cancellation_reason TEXT,
  ADD COLUMN IF NOT EXISTS confirmed_by VARCHAR(100),
  ADD COLUMN IF NOT EXISTS confirmed_at TIMESTAMP WITH TIME ZONE,
  ADD COLUMN IF NOT EXISTS whatsapp_sent BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS confirmation_email_sent BOOLEAN DEFAULT FALSE;

-- Create index for filtering by status and date
CREATE INDEX IF NOT EXISTS idx_bookings_status_date
  ON bookings(status, preferred_date DESC);

-- Add comments
COMMENT ON COLUMN bookings.confirmed_date IS 'Actual confirmed appointment date';
COMMENT ON COLUMN bookings.confirmed_time IS 'Actual appointment time (e.g., 10:30)';
COMMENT ON COLUMN bookings.cancellation_reason IS 'Reason for cancellation if cancelled';
COMMENT ON COLUMN bookings.confirmed_by IS 'Staff member who confirmed the booking';
COMMENT ON COLUMN bookings.confirmed_at IS 'Timestamp when booking was confirmed';
COMMENT ON COLUMN bookings.whatsapp_sent IS 'Whether WhatsApp confirmation was sent';
COMMENT ON COLUMN bookings.confirmation_email_sent IS 'Whether email confirmation was sent';
