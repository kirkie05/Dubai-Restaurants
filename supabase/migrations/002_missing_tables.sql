-- Drop conflicting tables first
DROP TABLE IF EXISTS bookings CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS partners CASCADE;
DROP TABLE IF EXISTS chefs CASCADE;
DROP TABLE IF EXISTS experiences CASCADE;
DROP TABLE IF EXISTS blog_posts CASCADE;

-- Add indexes on existing tables first
CREATE INDEX IF NOT EXISTS idx_restaurants_slug ON restaurants(slug);
CREATE INDEX IF NOT EXISTS idx_restaurants_owner_id ON restaurants(owner_id);

-- Chef profiles
CREATE TABLE chef_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  clerk_user_id TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  bio TEXT,
  specialty TEXT,
  years_experience INTEGER,
  restaurant_affiliation TEXT,
  profile_image_url TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  plan TEXT NOT NULL DEFAULT 'free' CHECK (plan IN ('free', 'pro')),
  stripe_subscription_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Partners (restaurant owners)
CREATE TABLE partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_user_id TEXT NOT NULL UNIQUE,
  business_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  restaurant_id UUID REFERENCES restaurants(id),
  plan TEXT NOT NULL DEFAULT 'basic' CHECK (plan IN ('basic', 'premium')),
  stripe_subscription_id TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'suspended')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Fix bookings table (unified schema)
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  restaurant_id UUID NOT NULL REFERENCES restaurants(id),
  booking_datetime TIMESTAMPTZ NOT NULL,
  guest_count INTEGER NOT NULL DEFAULT 2,
  special_requests TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  stripe_payment_intent_id TEXT,
  total_amount_aed DECIMAL(10,2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Reviews
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  restaurant_id UUID NOT NULL REFERENCES restaurants(id),
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title TEXT,
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, restaurant_id)
);

-- Favorites
CREATE TABLE favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  restaurant_id UUID NOT NULL REFERENCES restaurants(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, restaurant_id)
);

-- Blog posts
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT,
  body TEXT NOT NULL,
  cover_image_url TEXT,
  author_name TEXT NOT NULL DEFAULT 'Dubai Restaurants',
  published_at TIMESTAMPTZ,
  is_published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Experiences
CREATE TABLE experiences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  restaurant_id UUID REFERENCES restaurants(id),
  price_aed DECIMAL(10,2),
  duration_minutes INTEGER,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS on all new tables
ALTER TABLE chef_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "chef_own_profile" ON chef_profiles FOR ALL USING (clerk_user_id = current_setting('app.clerk_user_id', true));
CREATE POLICY "partner_own_record" ON partners FOR ALL USING (clerk_user_id = current_setting('app.clerk_user_id', true));
CREATE POLICY "user_own_bookings" ON bookings FOR ALL USING (user_id = current_setting('app.clerk_user_id', true));
CREATE POLICY "public_read_reviews" ON reviews FOR SELECT USING (true);
CREATE POLICY "auth_write_reviews" ON reviews FOR INSERT WITH CHECK (user_id = current_setting('app.clerk_user_id', true));
CREATE POLICY "user_own_favorites" ON favorites FOR ALL USING (user_id = current_setting('app.clerk_user_id', true));
CREATE POLICY "public_read_blog" ON blog_posts FOR SELECT USING (is_published = true);
CREATE POLICY "public_read_experiences" ON experiences FOR SELECT USING (is_active = true);
