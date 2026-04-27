import { NextResponse } from 'next/server';
import { isStripeConfigured } from '@/lib/stripe';

export async function GET() {
  return NextResponse.json({ 
    isStripeConfigured: isStripeConfigured,
    stripePartnerPriceId: !!process.env.STRIPE_PARTNER_PRICE_ID,
    stripeChefPriceId: !!process.env.STRIPE_CHEF_PRICE_ID
  });
}
