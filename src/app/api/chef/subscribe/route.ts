import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { createAdminClient } from '@/lib/supabase-server';
import { stripe, isStripeConfigured } from '@/lib/stripe';

export async function POST(req: Request) {
  if (!isStripeConfigured) {
    return NextResponse.json({ 
      error: 'payment_not_configured', 
      message: 'Subscriptions launching soon.' 
    }, { status: 503 });
  }

  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const supabase = createAdminClient();
    const { data: chef } = await supabase
      .from('chef_profiles')
      .select('*')
      .eq('clerk_user_id', userId)
      .single();

    if (!chef) {
      return NextResponse.json({ error: 'Chef profile not found' }, { status: 404 });
    }

    const session = await stripe!.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ 
        price: process.env.STRIPE_CHEF_PRICE_ID!, 
        quantity: 1 
      }],
      metadata: { userId, chefId: chef.id },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/en/account/billing?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/en/account/billing`,
    });

    return NextResponse.json({ checkoutUrl: session.url });
  } catch (error: any) {
    console.error('Subscription error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
