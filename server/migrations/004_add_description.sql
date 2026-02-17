-- Add description field and make date/time optional for dental tourism quotes
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE bookings ALTER COLUMN preferred_date DROP NOT NULL;
ALTER TABLE bookings ALTER COLUMN preferred_time DROP NOT NULL;
