import { NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { createAdminClient } from '@/lib/supabase-server';

export async function GET(request: Request) {
  try {
    const { userId: adminUserId } = await auth();
    const client = await clerkClient();
    const adminUser = await client.users.getUser(adminUserId!);
    if (adminUser.publicMetadata.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const supabase = createAdminClient();

    if (type === 'chef') {
      const { data, error } = await supabase
        .from('chef_profiles')
        .select('*')
        .eq('status', 'pending');
      if (error) throw error;
      return NextResponse.json(data);
    } else if (type === 'partner') {
      const { data, error } = await supabase
        .from('partners')
        .select('*')
        .eq('status', 'pending');
      if (error) throw error;
      return NextResponse.json(data);
    }

    return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
  } catch (error: any) {
    console.error('Pending fetch error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
