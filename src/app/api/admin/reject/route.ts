import { NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { createAdminClient } from '@/lib/supabase-server';

export async function POST(request: Request) {
  try {
    const { userId: adminUserId } = await auth();
    const client = await clerkClient();
    const adminUser = await client.users.getUser(adminUserId!);
    if (adminUser.publicMetadata.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { type, id } = await request.json();
    const supabase = createAdminClient();

    if (type === 'chef') {
      const { error } = await supabase
        .from('chef_profiles')
        .update({ status: 'rejected' })
        .eq('id', id);
      
      if (error) throw error;
    } else if (type === 'partner') {
      const { error } = await supabase
        .from('partners')
        .update({ status: 'suspended' })
        .eq('id', id);

      if (error) throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Rejection error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
