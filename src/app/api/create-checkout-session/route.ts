import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { stripe, isStripeConfigured } from '@/lib/stripe';
import { env } from '@/lib/env';

export async function POST(request: Request) {
  if (!isStripeConfigured) {
    return NextResponse.json({ 
      error: 'payment_not_configured', 
      message: 'Payment processing is being set up.' 
    }, { status: 503 });
  }

  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { type, ...rest } = body;

    let sessionParams: any = {
      payment_method_types: ['card'],
      client_reference_id: userId,
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/en/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/en/checkout/cancel`,
      metadata: {
        type,
        userId,
      }
    };

    if (type === 'partner_subscription') {
      sessionParams.mode = 'subscription';
      sessionParams.line_items = [
        {
          price_data: {
            currency: 'aed',
            product_data: {
              name: 'Partner Paid Plan',
              description: 'Priority placement and advanced analytics',
            },
            unit_amount: 9900, // 99 AED
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        },
      ];
    } else if (type === 'chef_subscription') {
      sessionParams.mode = 'subscription';
      sessionParams.line_items = [
        {
          price_data: {
            currency: 'aed',
            product_data: {
              name: 'Chef Premium Plan',
              description: 'Premium profile and priority placement',
            },
            unit_amount: 4900, // 49 AED
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        },
      ];
    } else if (type === 'booking') {
      const { restaurantId, partySize, date, time } = rest;
      
      if (!restaurantId || !partySize || !date || !time) {
         return NextResponse.json({ error: 'Missing booking details' }, { status: 400 });
      }

      sessionParams.mode = 'payment';
      sessionParams.metadata = {
        ...sessionParams.metadata,
        restaurantId,
        partySize: partySize.toString(),
        date,
        time,
      };
      sessionParams.line_items = [
        {
          price_data: {
            currency: 'aed',
            product_data: {
              name: 'Table Reservation Deposit',
              description: `Table for ${partySize} on ${date} at ${time}`,
            },
            unit_amount: 5000, // 50 AED deposit
          },
          quantity: 1,
        },
      ];
    } else {
      return NextResponse.json({ error: 'Invalid checkout type' }, { status: 400 });
    }

    const session = await stripe!.checkout.sessions.create(sessionParams);

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
