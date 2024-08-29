'use client'

import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import Hero from '../components/Hero';
import Pricing from "../components/Pricing";
import SmallFooter from "../components/Footer";

export default function Home() {
  const { user } = useUser();

  const handleSubmit = async () => {
    if (!user) {
      console.error('User not logged in');
      return;
    }

    const checkoutSession = await fetch('api/checkout_sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        origin: 'http://localhost:3000'
      },
      body: JSON.stringify({ userId: user.id })
    })  

    const checkoutSessionJson = await checkoutSession.json()
  
    if (checkoutSession.status === 500) {
      console.error(checkoutSessionJson.error.message)
      return
    }

    const stripe = await getStripe()
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id
    })

    if (error) {
      console.warn(error.message)
    }
  }

  return (
    <div className="w-screen h-screen">
      <Hero />
      <Pricing buySubscription={handleSubmit}/>
      <SmallFooter />
    </div>
  );
}