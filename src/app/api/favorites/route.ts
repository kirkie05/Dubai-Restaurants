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
      .select('restaurant_id')
      .eq('user_id', userId);

    if (error) throw error;
    return NextResponse.json(data.map(f => f.restaurant_id));
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { restaurantId } = await request.json();
    if (!restaurantId) return NextResponse.json({ error: 'Restaurant ID required' }, { status: 400 });

    const supabase = createAdminClient();
    const { error } = await supabase
      .from('favorites')
      .insert({ user_id: userId, restaurant_id: restaurantId });

    if (error) {
      if (error.code === '23505') return NextResponse.json({ success: true, message: 'Already favorited' });
      throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { restaurantId } = await request.json();
    if (!restaurantId) return NextResponse.json({ error: 'Restaurant ID required' }, { status: 400 });

    const supabase = createAdminClient();
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', userId)
      .eq('restaurant_id', restaurantId);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
