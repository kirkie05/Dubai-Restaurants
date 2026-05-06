import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { createAdminClient } from '@/lib/supabase-server';

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const supabase = createAdminClient();

    // 1. Get the partner's restaurant_id
    const { data: partner, error: pError } = await supabase
      .from('partners')
      .select('restaurant_id')
      .eq('clerk_user_id', userId)
      .single();

    if (pError || !partner?.restaurant_id) {
      return NextResponse.json({ error: 'Partner not associated with a restaurant' }, { status: 404 });
    }

    const restaurantId = partner.restaurant_id;

    // 2. Fetch stats
    // Total Bookings
    const { count: totalBookings } = await supabase
      .from('bookings')
      .select('*', { count: 'exact', head: true })
      .eq('restaurant_id', restaurantId);

    // Recent Bookings
    const { data: recentBookings } = await supabase
      .from('bookings')
      .select('*')
      .eq('restaurant_id', restaurantId)
      .order('booking_datetime', { ascending: false })
      .limit(5);

    // Avg Rating
    const { data: restaurant } = await supabase
      .from('restaurants')
      .select('rating, reviews_count')
      .eq('id', restaurantId)
      .single();

    return NextResponse.json({
      totalBookings: totalBookings || 0,
      revenue: (totalBookings || 0) * 50, // AED 50 per booking fee
      rating: restaurant?.rating || 0,
      reviewsCount: restaurant?.reviews_count || 0,
      recentBookings: recentBookings || []
    });
  } catch (error: any) {
    console.error('Stats error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
