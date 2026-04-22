import { supabase } from './supabase'

export async function getRestaurants() {
  const { data, error } = await supabase
    .from('restaurants')
    .select(`
      *,
      cuisines (
        name,
        slug
      )
    `)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function getRestaurantBySlug(slug: string) {
  const { data, error } = await supabase
    .from('restaurants')
    .select(`
      *,
      cuisines (
        name,
        slug
      ),
      reviews (*)
    `)
    .eq('slug', slug)
    .single()

  if (error) throw error
  return data
}

export async function getCuisines() {
  const { data, error } = await supabase
    .from('cuisines')
    .select('*')
    .order('name')

  if (error) throw error
  return data
}

export async function getFeaturedRestaurants() {
  const { data, error } = await supabase
    .from('restaurants')
    .select(`
      *,
      cuisines (
        name,
        slug
      )
    `)
    .eq('is_featured', true)
    .limit(6)

  if (error) throw error
  return data
}
