import { NextResponse } from "next/server";
import Stripe from 'stripe';
import { headers } from 'next/headers';
import { db } from '@/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const body = await req.text();
    const signature = headers().get("Stripe-Signature");
    console.log('Received webhook. Signature:', signature);

    let event;
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
      console.log('Event constructed successfully:', event.type);
    } catch (err) {
      console.error(`⚠️ Webhook signature verification failed.`, err.message);
      return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    console.log('Processing event:', event.type);

    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event);
        break;
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        await handleSubscriptionChange(event);
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Unexpected error in webhook handler:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function handleCheckoutSessionCompleted(event) {
  const session = event.data.object;
  const userId = session.client_reference_id;

  if (userId) {
    try {
      const userDocRef = doc(db, 'users', userId);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        await setDoc(userDocRef, {
          subscribed: 'Yes',
          updatedAt: new Date().toISOString(),
          checkoutSessionId: session.id,
          stripeCustomerId: session.customer
        }, { merge: true });

        console.log(`✅ Updated subscription status for user ${userId}`);
      } else {
        console.warn(`⚠️ User document not found for userId: ${userId}`);
      }
    } catch (error) {
      console.error(`❌ Error updating user document:`, error);
    }
  } else {
    console.warn(`⚠️ No userId found in the session object.`);
  }
}

async function handleSubscriptionChange(event) {
  const subscription = event.data.object;
  const customerId = subscription.customer;

  try {
    const userDocRef = doc(db, 'users', customerId);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      await setDoc(userDocRef, {
        subscriptionStatus: subscription.status,
        updatedAt: new Date().toISOString(),
        planId: subscription.items.data[0].price.id,
        subscriptionId: subscription.id
      }, { merge: true });

      console.log(`✅ Updated subscription for customer ${customerId}`);
    } else {
      console.warn(`⚠️ User document not found for customerId: ${customerId}`);
    }
  } catch (error) {
    console.error(`❌ Error updating subscription:`, error);
  }
}