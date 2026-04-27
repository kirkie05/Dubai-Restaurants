import Stripe from 'stripe'

const stripeKey = process.env.STRIPE_SECRET_KEY
export const isStripeConfigured = Boolean(stripeKey && !stripeKey.startsWith('YOUR_'))

export const stripe = isStripeConfigured 
  ? new Stripe(stripeKey!, { apiVersion: '2026-04-22.dahlia' })
  : null

export function requireStripe() {
  if (!stripe) throw new Error('STRIPE_NOT_CONFIGURED')
  return stripe
}
