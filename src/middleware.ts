import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'ar', 'fr', 'de', 'es'],
 
  // Used when no locale matches
  defaultLocale: 'en',
  localePrefix: 'always'
});
 
export const config = {
  // Skip all paths that should not be internationalized
  matcher: [
    // Match all pathnames except for
    // - … if they contain a dot, e.g. `favicon.ico`
    // - /api
    // - /_next
    // - /_vercel
    '/((?!api|_next/static|_next/image|favicon.ico|apple-touch-icon.png|.*\\..*).*)'
  ]
};
