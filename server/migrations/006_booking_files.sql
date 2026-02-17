-- 006_booking_files.sql
-- Stores metadata for uploaded X-ray / dental photo files (GDPR-compliant)
-- Files are stored on disk; this table tracks metadata and consent

CREATE TABLE IF NOT EXISTS booking_files (
  id SERIAL PRIMARY KEY,
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  filename VARCHAR(255) NOT NULL,
  original_name VARCHAR(255) NOT NULL,
  mime_type VARCHAR(100) NOT NULL,
  size_bytes INTEGER NOT NULL,
  storage_path VARCHAR(512) NOT NULL,
  health_data_consent BOOLEAN NOT NULL DEFAULT FALSE,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_booking_files_booking_id ON booking_files(booking_id);
CREATE INDEX IF NOT EXISTS idx_booking_files_expires_at ON booking_files(expires_at);
