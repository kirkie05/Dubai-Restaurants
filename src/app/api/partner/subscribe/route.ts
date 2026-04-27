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
    const { data: partner } = await supabase
      .from('partners')
      .select('*')
      .eq('clerk_user_id', userId)
      .single();

    if (!partner) {
      return NextResponse.json({ error: 'Partner not found' }, { status: 404 });
    }

    const session = await stripe!.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ 
        price: process.env.STRIPE_PARTNER_PRICE_ID!, 
        quantity: 1 
      }],
      metadata: { userId, partnerId: partner.id },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/en/partner/billing?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/en/partner/billing`,
    });

    return NextResponse.json({ checkoutUrl: session.url });
  } catch (error: any) {
    console.error('Subscription error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
