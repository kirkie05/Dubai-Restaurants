import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase-server';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q') || '';
    const cuisine = searchParams.get('cuisine');
    const minRating = searchParams.get('minRating');
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = 12;

    const supabase = createAdminClient();
    
    let query = supabase.from('restaurants').select(`
      *,
      cuisines (
        name,
        slug
      )
    `, { count: 'exact' });

    if (q) {
      query = query.textSearch('search_vector', q, { 
        type: 'websearch',
        config: 'english' 
      });
    }

    if (cuisine && cuisine !== 'All') {
      query = query.eq('cuisine_type', cuisine);
    }

    if (minRating) {
      query = query.gte('rating', parseFloat(minRating));
    }

    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, count, error } = await query
      .range(from, to)
      .order('rating', { ascending: false });

    if (error) {
      console.error('Search error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ 
      data, 
      total: count, 
      page, 
      pageSize 
    });
  } catch (err) {
    console.error('Search route error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
