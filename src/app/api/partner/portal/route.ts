import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { createAdminClient } from '@/lib/supabase-server';
import { stripe, isStripeConfigured } from '@/lib/stripe';

export async function POST(req: Request) {
  if (!isStripeConfigured) {
    return NextResponse.json({ 
      error: 'payment_not_configured', 
      message: 'Billing portal launching soon.' 
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
      .select('stripe_subscription_id')
      .eq('clerk_user_id', userId)
      .single();

    if (!partner?.stripe_subscription_id) {
      return NextResponse.json({ error: 'No active subscription found' }, { status: 404 });
    }

    // Retrieve the subscription to get the customer ID
    const subscription = await stripe!.subscriptions.retrieve(partner.stripe_subscription_id);

    const session = await stripe!.billingPortal.sessions.create({
      customer: subscription.customer as string,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/en/partner/billing`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Portal error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
