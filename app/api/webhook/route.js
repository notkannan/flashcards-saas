import { NextResponse } from "next/server";
import Stripe from 'stripe';
import { headers } from 'next/headers';
import { db } from '@/firebase'; // Adjust this import based on your Firebase setup
import { doc, setDoc, getDoc } from 'firebase/firestore';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature");

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    // Retrieve the user ID from the client_reference_id
    const userId = session.client_reference_id;

    if (userId) {
      // Update the user's document in Firebase
      const userRef = doc(db, 'users', userId);
      
      try {
        await setDoc(userRef, { subscribed: 'Yes' }, { merge: true });
        console.log(`Updated subscription status for user ${userId}`);
      } catch (error) {
        console.error(`Error updating user document: ${error}`);
        return NextResponse.json({ error: 'Error updating user document' }, { status: 500 });
      }
    }
  }

  return NextResponse.json({ received: true });
}