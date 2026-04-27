import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase-server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const all = searchParams.get('all') === 'true';
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '12');
    
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const supabase = createAdminClient();

    let query = supabase
      .from('restaurants')
      .select(`
        *,
        cuisines (
          name,
          slug
        )
      `, { count: 'exact' })
      .order('created_at', { ascending: false });

    if (!all) {
      query = query.range(from, to);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (all) {
      return NextResponse.json(data);
    }

    return NextResponse.json({
      data,
      total: count,
      page,
      pageSize
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
