import { supabase } from './supabase'

export async function getRestaurants() {
  try {
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
    return data || []
  } catch (error) {
    console.error("Database fetch error (getRestaurants):", error)
    return []
  }
}

export async function getRestaurantBySlug(slug: string) {
  try {
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
    return data || null
  } catch (error) {
    console.error(`Database fetch error (getRestaurantBySlug ${slug}):`, error)
    return null
  }
}

export async function getCuisines() {
  try {
    const { data, error } = await supabase
      .from('cuisines')
      .select('*')
      .order('name')

    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Database fetch error (getCuisines):", error)
    return []
  }
}

export async function getFeaturedRestaurants() {
  try {
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
    return data || []
  } catch (error) {
    console.error("Database fetch error (getFeaturedRestaurants):", error)
    return []
  }
}
