import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { stripe, isStripeConfigured } from '@/lib/stripe';
import { createAdminClient } from '@/lib/supabase-server';

export async function POST(req: Request) {
  if (!isStripeConfigured) {
    return NextResponse.json({ received: true });
  }

  const body = await req.text();
  const signature = (await headers()).get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe!.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const supabase = createAdminClient(); // uses service role key — bypasses RLS

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const { bookingId } = session.metadata || {};
        const { data: booking } = await supabase
          .from('bookings')
          .select('*, restaurants(name)')
          .eq('id', bookingId)
          .single();

        if (booking) {
          await supabase.from('bookings').update({ 
            status: 'confirmed',
            total_amount_aed: (session.amount_total || 0) / 100
          }).eq('id', bookingId);
          
          const { sendBookingConfirmation } = await import('@/lib/email');
          await sendBookingConfirmation({
            email: session.customer_details?.email || '',
            customerName: session.customer_details?.name || 'Valued Guest',
            restaurantName: booking.restaurants?.name || 'Curated Restaurant',
            date: booking.booking_date,
            time: booking.booking_time,
            guests: booking.guests_count,
          });

          console.log(`Booking ${bookingId} confirmed and email sent`);
        }
      break;
    }
    case 'customer.subscription.deleted': {
      const sub = event.data.object as Stripe.Subscription;
      await supabase.from('partners').update({ 
        plan: 'basic', 
        stripe_subscription_id: null 
      }).eq('stripe_subscription_id', sub.id);

      await supabase.from('chef_profiles').update({ 
        plan: 'free', 
        stripe_subscription_id: null 
      }).eq('stripe_subscription_id', sub.id);
      
      console.log(`Subscription ${sub.id} deleted`);
      break;
    }
    case 'invoice.payment_failed': {
      console.error('Payment failed for subscription:', event.data.object);
      // TODO: Send payment failed email (Phase 5)
      break;
    }
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
