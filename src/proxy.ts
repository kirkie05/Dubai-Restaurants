import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import createIntlMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";

const intlMiddleware = createIntlMiddleware({
  locales: ["en", "ar", "fr", "de", "es"],
  defaultLocale: "en",
  localePrefix: "always",
});

// Route matchers — locale-prefix aware (e.g. /en/admin/..., /ar/partner/...)
const isAdminRoute = createRouteMatcher(['/(.*)admin(.*)']);
const isPartnerRoute = createRouteMatcher(['/(.*)partner(.*)']);
const isChefRoute = createRouteMatcher(['/(.*)chef(.*)']);
const isProtectedRoute = createRouteMatcher(['/(.*)account(.*)']);

const MUTATION_METHODS = ["POST", "PUT", "PATCH", "DELETE"];

export default clerkMiddleware(async (auth, req) => {
  // ── CSRF origin check for mutating API calls ──────────────────────────────
  if (MUTATION_METHODS.includes(req.method) && req.nextUrl.pathname.startsWith("/api")) {
    const origin = req.headers.get("origin") ?? req.headers.get("referer") ?? "";
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
    const isLocalhost = origin.startsWith("http://localhost") || origin.startsWith("http://127.0.0.1");
    const isAppOrigin = origin.startsWith(appUrl);

    if (!isLocalhost && !isAppOrigin) {
      return new NextResponse("Forbidden: Invalid Origin", { status: 403 });
    }
  }

  // ── Skip auth for API routes (they do their own auth() check) ────────────
  if (req.nextUrl.pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // ── Pull user session ─────────────────────────────────────────────────────
  const { userId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as Record<string, string> | undefined)?.role ?? "";

  // Derive locale from the first path segment so redirects stay localised
  const locale = req.nextUrl.pathname.split("/")[1] || "en";

  // ── Admin routes: must be authenticated + have admin role ─────────────────
  if (isAdminRoute(req)) {
    if (!userId || role !== "admin") {
      return NextResponse.redirect(new URL(`/${locale}`, req.url));
    }
  }

  // ── Partner routes: admin OR partner ─────────────────────────────────────
  if (isPartnerRoute(req)) {
    if (!userId || !["admin", "partner"].includes(role)) {
      return NextResponse.redirect(new URL(`/${locale}`, req.url));
    }
  }

  // ── Chef routes: admin OR partner OR chef ────────────────────────────────
  if (isChefRoute(req)) {
    if (!userId || !["admin", "partner", "chef"].includes(role)) {
      return NextResponse.redirect(new URL(`/${locale}`, req.url));
    }
  }

  // ── Account routes: any authenticated user ────────────────────────────────
  if (isProtectedRoute(req) && !userId) {
    return NextResponse.redirect(new URL(`/${locale}`, req.url));
  }

  // ── Run next-intl locale routing for all page requests ───────────────────
  return intlMiddleware(req);
});

export const config = {
  matcher: [
    // Match all paths except static files and _next internals
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
