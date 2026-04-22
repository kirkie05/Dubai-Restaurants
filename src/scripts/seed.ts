import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import * as fs from 'fs'
import * as path from 'path'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function seed() {
  console.log('Starting seed...')

  // Load English translations for data
  const messages = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'messages/en.json'), 'utf8'))
  const cuisinesData = messages.Data.cuisines
  const restaurantsData = messages.Restaurants

  // 1. Seed Cuisines
  console.log('Seeding cuisines...')
  const cuisinesToInsert = Object.entries(cuisinesData).map(([slug, name]) => ({
    name: name as string,
    slug,
    image_url: `/cuisine_${slug}_high_fidelity.png`, // Placeholder pattern
    description: messages.Cuisines.items[slug] || `Explore the best of ${name} cuisine in Dubai.`
  }))

  const { data: insertedCuisines, error: cuisinesError } = await supabase
    .from('cuisines')
    .upsert(cuisinesToInsert, { onConflict: 'slug' })
    .select()

  if (cuisinesError) {
    console.error('Error seeding cuisines:', cuisinesError)
    return
  }
  console.log(`Inserted/Updated ${insertedCuisines.length} cuisines.`)

  // 2. Seed Restaurants
  console.log('Seeding restaurants...')
  const restaurantEntries = Object.entries(restaurantsData)
  
  for (const [slug, details] of restaurantEntries) {
    const res = details as any
    
    // Find cuisine id
    const cuisineSlug = res.cuisine.toLowerCase().replace(/ /g, '-')
    const cuisine = insertedCuisines.find(c => c.slug === cuisineSlug || c.name.toLowerCase() === res.cuisine.toLowerCase())

    const restaurantToInsert = {
      name: res.name,
      slug,
      description: res.description,
      long_description: res.longDescription,
      image_url: `/${slug.replace(/-/g, '_')}_restaurant_1776785631205.png`, // Using the known local pattern
      location: res.location,
      cuisine_id: cuisine?.id,
      price_range: res.price,
      rating: parseFloat(res.rating),
      reviews_count: parseInt(res.reviewsCount?.replace(/,/g, '') || '0'),
      chef_name: res.chef,
      badge: res.badge,
      status: res.status,
      is_featured: ['al-mahara', 'ossiano', 'zuma'].includes(slug)
    }

    const { error: resError } = await supabase
      .from('restaurants')
      .upsert(restaurantToInsert, { onConflict: 'slug' })

    if (resError) {
      console.error(`Error seeding restaurant ${slug}:`, resError)
    } else {
      console.log(`Seeded restaurant: ${res.name}`)
    }
  }

  console.log('Seed completed successfully!')
}

seed().catch(err => {
  console.error('Seed script failed:', err)
  process.exit(1)
})
