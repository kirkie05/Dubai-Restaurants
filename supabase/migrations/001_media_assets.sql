-- Run this in the Supabase SQL editor (Dashboard → SQL Editor → New query)

CREATE TABLE IF NOT EXISTS media_assets (
  id          uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_id    text        NOT NULL,                          -- Clerk user ID
  entity_type text        NOT NULL CHECK (entity_type IN ('chef', 'restaurant')),
  entity_id   text        NOT NULL,                          -- userId or restaurant slug
  bucket_path text        NOT NULL,                          -- path inside the 'media' bucket
  public_url  text        NOT NULL,
  file_name   text        NOT NULL,
  file_size   integer     NOT NULL,                          -- bytes
  mime_type   text        NOT NULL,
  asset_type  text        NOT NULL DEFAULT 'general'
                          CHECK (asset_type IN ('hero', 'gallery', 'menu', 'profile', 'general')),
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS media_assets_owner_idx  ON media_assets (owner_id);
CREATE INDEX IF NOT EXISTS media_assets_entity_idx ON media_assets (entity_type, entity_id);
