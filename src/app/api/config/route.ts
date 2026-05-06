import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { isStripeConfigured } from '@/lib/stripe';

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  return NextResponse.json({
    isStripeConfigured: isStripeConfigured,
    stripePartnerPriceId: !!process.env.STRIPE_PARTNER_PRICE_ID,
    stripeChefPriceId: !!process.env.STRIPE_CHEF_PRICE_ID,
  });
}
