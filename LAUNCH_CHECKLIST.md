# Dubai Restaurants - Launch Readiness Checklist

## 1. Environment Configuration
- [x] STRIPE_SECRET_KEY set (Production — live keys in .env.local)
- [x] STRIPE_WEBHOOK_SECRET set (Production)
- [x] SUPABASE_URL & SUPABASE_SERVICE_ROLE_KEY set
- [x] NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY & CLERK_SECRET_KEY set
- [x] RESEND_API_KEY set
- [x] NEXT_PUBLIC_SENTRY_DSN set

## 2. Security Audit
- [x] src/proxy.ts active and protecting dashboard routes (Next.js 16 middleware convention)
- [x] Supabase RLS policies active on all tables (partners + chef_profiles added 2026-05-06)
- [x] Input sanitization via DOMPurify in place for descriptions
- [x] Zod validation on all form submissions
- [x] Content Security Policy (CSP) headers configured in next.config.ts
- [x] Partner Clerk role assigned only after admin approval (fixed 2026-05-06)
- [x] Role revocation on rejection (fixed 2026-05-06)
- [x] Booking deposit amount is server-authoritative — 50 AED constant (fixed 2026-05-06)
- [x] Admin routes return 401 on unauthenticated requests (fixed 2026-05-06)
- [x] /api/config requires authentication (fixed 2026-05-06)
- [x] /api/restaurants pagination enforced — max 50 per page (fixed 2026-05-06)

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
*Status: 95% Ready. Awaiting final Arabic translations and domain/SSL configuration.*
