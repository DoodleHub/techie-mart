import { NextResponse, NextRequest } from 'next/server';
import Stripe from 'stripe';

import { ProductData } from '@/types';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  const requestBody = await request.json();

  try {
    const { origin } = request.nextUrl;

    const params: Stripe.Checkout.SessionCreateParams = {
      submit_type: 'pay',
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      shipping_options: [
        { shipping_rate: 'shr_1PZDy8K8Pt4kUvMN3sbTGNvy' },
        { shipping_rate: 'shr_1PZDzhK8Pt4kUvMNlVD0Yf5L' },
      ],
      line_items: requestBody.cartItems.map((item: ProductData) => {
        const img = item.image[0].asset._ref;
        const newImage = img
          .replace(
            'image-',
            'https://cdn.sanity.io/images/vfxfwnaw/production/'
          )
          .replace('-webp', '.webp');

        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.name,
              images: [newImage],
            },
            unit_amount: item.price * 100,
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
          },
          quantity: item.quantity,
        };
      }),
      mode: 'payment',
      success_url: `${origin}/success`,
      cancel_url: `${origin}/canceled`,
    };

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create(params);
    return NextResponse.json({ sessionId: session.id });
  } catch (err) {
    const errorMessage = (err as Error).message;

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
