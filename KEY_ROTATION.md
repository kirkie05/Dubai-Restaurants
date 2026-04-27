# Key Rotation Strategy

Regularly rotating access keys and secrets is a critical security practice to minimize the risk of compromised credentials.

## 1. Supabase

1. Go to your Supabase Project Dashboard -> Settings -> API.
2. Under **Project API keys**, click **Roll** on the `anon` / `public` key and/or `service_role` key.
3. Once rolled, the old keys are invalidated.
4. Update the values in your environment:
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
5. Restart your application servers.

## 2. Clerk

1. Go to the Clerk Dashboard -> API Keys.
2. Under **Secret Keys**, click **Rotate Secret Key**.
3. Replace the `CLERK_SECRET_KEY` in your `.env` file with the new key.
4. If you also need to rotate the Publishable Key, you may need to recreate the instance or contact Clerk support depending on the configuration.
5. Restart your application servers.

## 3. Stripe

1. Go to Stripe Dashboard -> Developers -> API keys.
2. Click **Roll key** next to your Secret key (`sk_live_...` or `sk_test_...`).
3. You can set an expiration time for the old key to ensure zero downtime.
4. Update `STRIPE_SECRET_KEY` in your `.env` file.
5. If you are using webhooks, rotate the Webhook Secret from Developers -> Webhooks, and update `STRIPE_WEBHOOK_SECRET`.
6. Restart your application servers.

## 4. Google Maps

1. Go to Google Cloud Console -> APIs & Services -> Credentials.
2. Locate your Maps API Key, and either create a new one to replace the old, or edit the existing key to regenerate it.
3. Update `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` in your `.env` file.
4. Delete the old key if you generated a new one.
5. Restart your application servers.
