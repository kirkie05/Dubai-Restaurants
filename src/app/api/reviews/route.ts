import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { createAdminClient } from '@/lib/supabase-server';
import { reviewSchema } from '@/lib/validations';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const restaurantId = searchParams.get('restaurantId');

  if (!restaurantId) {
    return NextResponse.json({ error: 'Restaurant ID required' }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('restaurant_id', restaurantId)
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const result = reviewSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: 'Validation failed', details: result.error.format() }, { status: 400 });
    }

    const { rating, title, body: reviewBody, restaurantId } = result.data;

    const supabase = createAdminClient();

    const { error: reviewError } = await supabase.from('reviews').insert({
      restaurant_id: restaurantId,
      user_id: userId,
      rating: rating,
      title: title || null,
      body: reviewBody
    });

    if (reviewError) {
      if (reviewError.code === '23505') {
        return NextResponse.json({ error: "You've already reviewed this restaurant." }, { status: 409 });
      }
      console.error("Review insertion error:", reviewError);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Review submitted' });
  } catch (error) {
    console.error('Error during review submission:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
