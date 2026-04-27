import { NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { createAdminClient } from '@/lib/supabase-server';

export async function POST(request: Request) {
  try {
    const { userId: adminUserId } = await auth();
    // Check if user is admin (in production, check publicMetadata.role)
    // For now, let's assume if they can hit this, they are authorized or we check role
    const client = await clerkClient();
    const adminUser = await client.users.getUser(adminUserId!);
    if (adminUser.publicMetadata.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { type, id, clerkUserId } = await request.json();
    const supabase = createAdminClient();

    if (type === 'chef') {
      const { error } = await supabase
        .from('chef_profiles')
        .update({ status: 'approved' })
        .eq('id', id);
      
      if (error) throw error;

      // Update Clerk Metadata
      await client.users.updateUserMetadata(clerkUserId, {
        publicMetadata: { role: 'chef' }
      });
    } else if (type === 'partner') {
      const { error } = await supabase
        .from('partners')
        .update({ status: 'active' })
        .eq('id', id);

      if (error) throw error;

      // Update Clerk Metadata
      await client.users.updateUserMetadata(clerkUserId, {
        publicMetadata: { role: 'partner' }
      });
    } else if (type === 'review') {
       // Reviews don't have a status yet in our schema, but let's assume we might add it
       // Or just keep it as is.
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Approval error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
