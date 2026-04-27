import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { createAdminClient } from '@/lib/supabase-server';
import { chefSchema } from '@/lib/validations';

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    const body = await req.json();
    const parsed = chefSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    
    const supabase = createAdminClient();
    const { error } = await supabase.from('chef_profiles').upsert({
      user_id: userId,
      clerk_user_id: userId,
      full_name: parsed.data.fullName,
      bio: parsed.data.bio,
      specialty: parsed.data.specialty,
      years_experience: parsed.data.yearsExperience,
      restaurant_affiliation: parsed.data.restaurantAffiliation,
      status: 'pending',
      plan: parsed.data.plan,
    }, { onConflict: 'clerk_user_id' });
    
    if (error) {
      console.error('Supabase upsert error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Server error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
