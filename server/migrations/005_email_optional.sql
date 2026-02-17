-- Make email optional so users can book with phone only
ALTER TABLE bookings ALTER COLUMN email DROP NOT NULL;
