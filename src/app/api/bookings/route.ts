import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { createAdminClient } from '@/lib/supabase-server';
import { bookingSchema, BOOKING_DEPOSIT_AED } from '@/lib/validations';
import { stripe, isStripeConfigured } from '@/lib/stripe';

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const result = bookingSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: 'Validation failed', details: result.error.format() }, { status: 400 });
    }

    const { restaurantId, bookingDatetime, guestCount, specialRequests } = result.data;
    const depositAmountAed = BOOKING_DEPOSIT_AED;

    const supabase = createAdminClient();

    // First create a pending booking
    const { data: booking, error: bookingError } = await supabase.from('bookings').insert({
      restaurant_id: restaurantId,
      user_id: userId,
      guest_count: guestCount,
      booking_datetime: bookingDatetime,
      special_requests: specialRequests || null,
      status: 'pending'
    }).select().single();

    if (bookingError) {
      console.error("Booking insertion error:", bookingError);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    // If Stripe is configured and deposit required, create checkout session
    if (isStripeConfigured && depositAmountAed > 0) {
      const session = await stripe!.checkout.sessions.create({
        mode: 'payment',
        payment_method_types: ['card'],
        line_items: [{
          price_data: {
            currency: 'aed',
            product_data: { name: `Table Booking — Deposit` },
            unit_amount: Math.round(depositAmountAed * 100),
          },
          quantity: 1,
        }],
        metadata: { bookingId: booking.id, userId },
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/en/account/bookings?booking=${booking.id}&success=true`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/en/book/${restaurantId}?cancelled=true`,
      });

      // Update booking with session ID
      await supabase.from('bookings').update({ stripe_payment_intent_id: session.id }).eq('id', booking.id);

      return NextResponse.json({ success: true, bookingId: booking.id, checkoutUrl: session.url });
    }

    // No payment required or Stripe not configured — booking confirmed immediately
    await supabase.from('bookings').update({ status: 'confirmed' }).eq('id', booking.id);
    return NextResponse.json({ success: true, bookingId: booking.id, checkoutUrl: null });

  } catch (error) {
    console.error('Error during booking:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
