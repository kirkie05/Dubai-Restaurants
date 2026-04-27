import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { createAdminClient } from '@/lib/supabase-server';

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        restaurants (
          name,
          location,
          image_url
        )
      `)
      .eq('user_id', userId)
      .order('booking_datetime', { ascending: false });

    if (error) throw error;

    const bookings = (data || []).map((b: any) => ({
      id: b.id.substring(0, 8).toUpperCase(),
      restaurant: b.restaurants.name,
      location: b.restaurants.location,
      date: new Date(b.booking_datetime).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      time: new Date(b.booking_datetime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
      guests: b.guest_count,
      status: b.status.charAt(0).toUpperCase() + b.status.slice(1),
      image: b.restaurants.image_url
    }));

    return NextResponse.json(bookings);
  } catch (error) {
    console.error('Bookings API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
