-- Add coordinates to restaurants
ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS latitude DECIMAL(10, 8);
ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS longitude DECIMAL(11, 8);
