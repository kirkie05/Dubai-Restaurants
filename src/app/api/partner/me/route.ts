import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { createAdminClient } from '@/lib/supabase-server';

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const supabase = createAdminClient();
    const { data: partner, error } = await supabase
      .from('partners')
      .select('*')
      .eq('clerk_user_id', userId)
      .single();

    if (error) throw error;
    return NextResponse.json(partner);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
