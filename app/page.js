'use client'

import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Hero from '../components/Hero';
import Pricing from "../components/Pricing";
import SmallFooter from "../components/Footer";

export default function Home() {

  const handleSubmit = async () => {
    const checkoutSession = await fetch('api/checkout_sessions', {
      method: 'POST',
      headers: {
        origin: 'http://localhost:3000'
      },
    })  

  const checkoutSessionJson = await checkoutSession.json()
  
  if (checkoutSession.statusCode === 500) {
    console.error(checkoutSession.message)
    return
  }

  const stripe = await getStripe()
  const {error} = await stripe.redirectToCheckout({
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

