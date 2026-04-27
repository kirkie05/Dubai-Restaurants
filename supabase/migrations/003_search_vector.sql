-- Add full-text search vector to restaurants
ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS search_vector TSVECTOR 
  GENERATED ALWAYS AS (
    to_tsvector('english', coalesce(name,'') || ' ' || coalesce(description,'') || ' ' || coalesce(cuisine_type,''))
  ) STORED;

-- Create GIN index for search_vector
CREATE INDEX IF NOT EXISTS idx_restaurants_fts ON restaurants USING GIN(search_vector);
