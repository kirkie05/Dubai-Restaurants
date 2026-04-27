import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { createAdminClient } from '@/lib/supabase-server';

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('favorites')
      .select(`
        id,
        restaurants (
          id,
          slug,
          name,
          image_url,
          rating,
          price_range,
          location,
          description,
          badge
        )
      `)
      .eq('user_id', userId);

    if (error) throw error;

    const favorites = (data || []).map((f: any) => ({
      ...f.restaurants,
      image: f.restaurants.image_url,
      rating: f.restaurants.rating.toString(),
      price: f.restaurants.price_range,
      badge: 'Saved'
    }));

    return NextResponse.json(favorites);
  } catch (error) {
    console.error('Favorites API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
