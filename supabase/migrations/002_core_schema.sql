-- Users Table (Synced with Clerk)
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY, -- Clerk User ID
  role TEXT DEFAULT 'user' CHECK (role IN ('admin', 'partner', 'chef', 'user')),
  email TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

-- Chefs Table
CREATE TABLE IF NOT EXISTS chefs (
  id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  title TEXT NOT NULL,
  bio TEXT,
  specialties TEXT,
  plan TEXT DEFAULT 'free',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

-- Partners Table
CREATE TABLE IF NOT EXISTS partners (
  id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  plan TEXT DEFAULT 'free',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

-- Restaurants modifications
-- Assuming restaurants table already exists
ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS owner_id TEXT REFERENCES users(id) ON DELETE SET NULL;
ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;

-- Ensure index on restaurants slug
CREATE INDEX IF NOT EXISTS restaurants_slug_idx ON restaurants (slug);
CREATE INDEX IF NOT EXISTS restaurants_owner_idx ON restaurants (owner_id);

-- Bookings Table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  party_size INTEGER NOT NULL CHECK (party_size > 0),
  booking_date DATE NOT NULL,
  booking_time TIME NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS bookings_user_idx ON bookings (user_id);
CREATE INDEX IF NOT EXISTS bookings_restaurant_idx ON bookings (restaurant_id);

-- Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS reviews_user_idx ON reviews (user_id);
CREATE INDEX IF NOT EXISTS reviews_restaurant_idx ON reviews (restaurant_id);

-- Blog Posts Table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  author_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS blog_posts_author_idx ON blog_posts (author_id);
CREATE INDEX IF NOT EXISTS blog_posts_slug_idx ON blog_posts (slug);

-- Experiences Table
CREATE TABLE IF NOT EXISTS experiences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL CHECK (price >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS experiences_restaurant_idx ON experiences (restaurant_id);


-- Row Level Security (RLS)

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE chefs ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;

-- Helper function to check if current user is admin
CREATE OR REPLACE FUNCTION is_admin() RETURNS BOOLEAN AS $$
BEGIN
  -- We assume JWT claim contains role for Clerk integration 
  -- In a production Clerk setup, custom claims can be read from auth.jwt()
  -- If using Clerk syncing, the role might be stored in the users table
  RETURN EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid()::text AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- Users Policies
CREATE POLICY "Public Read Users" ON users FOR SELECT USING (true);
CREATE POLICY "Owner Update Users" ON users FOR UPDATE USING (id = auth.uid()::text);
CREATE POLICY "Admin All Users" ON users FOR ALL USING (is_admin());

-- Chefs Policies
CREATE POLICY "Public Read Chefs" ON chefs FOR SELECT USING (deleted_at IS NULL);
CREATE POLICY "Owner Update Chefs" ON chefs FOR UPDATE USING (id = auth.uid()::text AND deleted_at IS NULL);
CREATE POLICY "Owner Insert Chefs" ON chefs FOR INSERT WITH CHECK (id = auth.uid()::text);
CREATE POLICY "Admin All Chefs" ON chefs FOR ALL USING (is_admin());

-- Partners Policies
CREATE POLICY "Public Read Partners" ON partners FOR SELECT USING (deleted_at IS NULL);
CREATE POLICY "Owner Update Partners" ON partners FOR UPDATE USING (id = auth.uid()::text AND deleted_at IS NULL);
CREATE POLICY "Owner Insert Partners" ON partners FOR INSERT WITH CHECK (id = auth.uid()::text);
CREATE POLICY "Admin All Partners" ON partners FOR ALL USING (is_admin());

-- Restaurants Policies
CREATE POLICY "Public Read Restaurants" ON restaurants FOR SELECT USING (deleted_at IS NULL);
CREATE POLICY "Owner Update Restaurants" ON restaurants FOR UPDATE USING (owner_id = auth.uid()::text AND deleted_at IS NULL);
CREATE POLICY "Admin All Restaurants" ON restaurants FOR ALL USING (is_admin());

-- Bookings Policies
CREATE POLICY "Owner Read Bookings" ON bookings FOR SELECT USING (user_id = auth.uid()::text AND deleted_at IS NULL);
CREATE POLICY "Restaurant Owner Read Bookings" ON bookings FOR SELECT USING (
  EXISTS (SELECT 1 FROM restaurants WHERE id = bookings.restaurant_id AND owner_id = auth.uid()::text) 
  AND deleted_at IS NULL
);
CREATE POLICY "Owner Insert Bookings" ON bookings FOR INSERT WITH CHECK (user_id = auth.uid()::text);
CREATE POLICY "Owner Update Bookings" ON bookings FOR UPDATE USING (user_id = auth.uid()::text AND deleted_at IS NULL);
CREATE POLICY "Admin All Bookings" ON bookings FOR ALL USING (is_admin());

-- Reviews Policies
CREATE POLICY "Public Read Reviews" ON reviews FOR SELECT USING (deleted_at IS NULL);
CREATE POLICY "Owner Update Reviews" ON reviews FOR UPDATE USING (user_id = auth.uid()::text AND deleted_at IS NULL);
CREATE POLICY "Owner Insert Reviews" ON reviews FOR INSERT WITH CHECK (user_id = auth.uid()::text);
CREATE POLICY "Admin All Reviews" ON reviews FOR ALL USING (is_admin());

-- Blog Posts Policies
CREATE POLICY "Public Read Blog Posts" ON blog_posts FOR SELECT USING (deleted_at IS NULL);
CREATE POLICY "Owner Update Blog Posts" ON blog_posts FOR UPDATE USING (author_id = auth.uid()::text AND deleted_at IS NULL);
CREATE POLICY "Owner Insert Blog Posts" ON blog_posts FOR INSERT WITH CHECK (author_id = auth.uid()::text);
CREATE POLICY "Admin All Blog Posts" ON blog_posts FOR ALL USING (is_admin());

-- Experiences Policies
CREATE POLICY "Public Read Experiences" ON experiences FOR SELECT USING (deleted_at IS NULL);
CREATE POLICY "Restaurant Owner Update Experiences" ON experiences FOR UPDATE USING (
  EXISTS (SELECT 1 FROM restaurants WHERE id = experiences.restaurant_id AND owner_id = auth.uid()::text)
  AND deleted_at IS NULL
);
CREATE POLICY "Restaurant Owner Insert Experiences" ON experiences FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM restaurants WHERE id = experiences.restaurant_id AND owner_id = auth.uid()::text)
);
CREATE POLICY "Admin All Experiences" ON experiences FOR ALL USING (is_admin());
