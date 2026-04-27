# Dubai Restaurants - Launch Readiness Checklist

## 1. Environment Configuration
- [ ] STRIPE_SECRET_KEY set (Production)
- [ ] STRIPE_WEBHOOK_SECRET set (Production)
- [ ] SUPABASE_URL & SUPABASE_SERVICE_ROLE_KEY set
- [ ] NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY & CLERK_SECRET_KEY set
- [ ] RESEND_API_KEY set
- [ ] NEXT_PUBLIC_SENTRY_DSN set

## 2. Security Audit
- [x] src/middleware.ts active and protecting dashboard routes
- [x] Supabase RLS policies active on all tables
- [x] Input sanitization via DOMPurify in place for descriptions
- [x] Zod validation on all form submissions
- [x] Content Security Policy (CSP) headers configured in next.config.ts

## 3. Internationalization (i18n)
- [x] next-intl fallback to English configured
- [x] Arabic RTL layout fixes applied (Navbar, Cards, Hero)
- [x] All UI strings wrapped in t()
- [ ] Final Arabic translation review (currently TODO_TRANSLATE)

## 4. Performance & Reliability
- [x] ISR (Incremental Static Regeneration) active on Restaurant pages (30m/1h)
- [x] next/image optimized with proper sizes and remotePatterns
- [x] Sentry error tracking initialized
- [x] React Query hydration working for favorites and listings

## 5. User Flows Verification
- [ ] Booking Flow: Select date -> Checkout -> Email Confirmation
- [ ] Onboarding: Chef profile creation -> Admin Moderation
- [ ] Onboarding: Partner registration -> Stripe Subscription
- [ ] Profile: Edit details and view journal

## 6. Infrastructure
- [ ] Domain dubaidining.guide (or similar) pointed to Vercel/Server
- [ ] SSL certificates active
- [ ] Sentry project created and receiving test events

---
*Status: 90% Ready. Awaiting final Arabic translations and Production Stripe Keys.*
