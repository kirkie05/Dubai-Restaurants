import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { createAdminClient } from '@/lib/supabase-server';
import { partnerSchema } from '@/lib/validations';

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const parsed = partnerSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

    const supabase = createAdminClient();
    const { error } = await supabase.from('partners').upsert({
      clerk_user_id: userId,
      business_name: parsed.data.businessName,
      contact_name: parsed.data.contactName,
      email: parsed.data.email,
      phone: parsed.data.phone,
      plan: parsed.data.plan,
      status: 'pending',
    }, { onConflict: 'clerk_user_id' });

    if (error) {
      console.error('Supabase upsert error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Role is NOT set here — it is set only after admin approval in /api/admin/approve.

    const { sendClaimNotification } = await import('@/lib/email');
    await sendClaimNotification({
      email: parsed.data.email,
      restaurantName: parsed.data.businessName,
      ownerName: parsed.data.contactName,
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Server error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
