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

export function getWebhookSecret(): string {
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  if (!secret) throw new Error('STRIPE_WEBHOOK_SECRET is not set in environment variables')
  return secret
}

export function getPartnerPriceId(): string {
  const id = process.env.STRIPE_PARTNER_PRICE_ID
  if (!id) throw new Error('STRIPE_PARTNER_PRICE_ID is not set in environment variables')
  return id
}

export function getChefPriceId(): string {
  const id = process.env.STRIPE_CHEF_PRICE_ID
  if (!id) throw new Error('STRIPE_CHEF_PRICE_ID is not set in environment variables')
  return id
}
