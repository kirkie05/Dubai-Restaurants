import './src/lib/env';
import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from "next";
import path from 'path';

const withNextIntl = createNextIntlPlugin();

const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(self)' },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: https://js.clerk.dev https://clerk.dubai-restaurants.com https://maps.googleapis.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: blob: https://*.supabase.co https://img.clerk.com https://maps.gstatic.com https://maps.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "connect-src 'self' https://*.supabase.co https://api.clerk.dev https://clerk.dubai-restaurants.com wss://*.supabase.co https://maps.googleapis.com https://*.googleapis.com",
      "frame-src 'self' https://clerk.dubai-restaurants.com",
    ].join('; ')
  }
]

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve('.'),
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "api.dicebear.com",
      },
      {
        protocol: "https",
        hostname: "zisjgxifdwhpibcknbzw.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

import { withSentryConfig } from "@sentry/nextjs";

export default withSentryConfig(withNextIntl(nextConfig), {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  org: "dubai-restaurants",
  project: "dubai-restaurants-app",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your quota utilization.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-side errors will fail.
  tunnelRoute: "/monitoring",
  
  sourcemaps: {
    // Hides source maps from visitors
    deleteSourcemapsAfterUpload: true,
  },

});

