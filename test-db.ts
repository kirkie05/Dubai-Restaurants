import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

import { getRestaurants, getCuisines } from './src/lib/db'

async function testDB() {
  try {
    const cuisines = await getCuisines()
    console.log(`Cuisines count: ${cuisines?.length || 0}`)
    
    const restaurants = await getRestaurants()
    console.log(`Restaurants count: ${restaurants?.length || 0}`)
    
    if (restaurants && restaurants.length > 0) {
      console.log('Sample restaurant:', restaurants[0].name)
    }
  } catch (err) {
    console.error('DB Test failed:', err)
  }
}

testDB()
