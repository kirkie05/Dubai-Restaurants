import { createAdminClient } from './supabase-server';

export async function getRestaurantBySlug(slug: string) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('restaurants')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) return null;
  return data;
}
