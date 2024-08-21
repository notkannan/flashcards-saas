import { buffer } from 'micro'
import Stripe from 'stripe'
import { db } from "@/firebase"
import { doc, updateDoc } from 'firebase/firestore'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

export const config = {
  api: {
    bodyParser: false,
  },
}

async function handler(req, res) {
  if (req.method === 'POST') {
    const buf = await buffer(req)
    const sig = req.headers['stripe-signature']

    let event

    try {
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret)
    } catch (err) {
      console.error(`Webhook Error: ${err.message}`)
      return res.status(400).send(`Webhook Error: ${err.message}`)
    }

    // Handle the event
    switch (event.type) {
      case 'customer.subscription.created':
        const subscription = event.data.object
        // Update user data in Firestore
        await updateUserPremiumStatus(subscription.customer, true)
        break
      default:
        console.log(`Unhandled event type ${event.type}`)
    }

    res.json({ received: true })
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}

async function updateUserPremiumStatus(stripeCustomerId, isPremium) {
  // You'll need to store the Stripe customer ID in your user document
  // when creating the checkout session
  const userQuery = query(collection(db, 'users'), where('stripeCustomerId', '==', stripeCustomerId))
  const userSnapshot = await getDocs(userQuery)

  if (!userSnapshot.empty) {
    const userDoc = userSnapshot.docs[0]
    await updateDoc(doc(db, 'users', userDoc.id), {
      premium: isPremium
    })
  }
}

export default handler