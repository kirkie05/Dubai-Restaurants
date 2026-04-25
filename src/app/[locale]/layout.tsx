import type { Metadata } from "next";
import { Manrope, Playfair_Display, IBM_Plex_Sans_Arabic } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-arabic",
  weight: ["200", "300", "400", "500", "600", "700"],
  subsets: ["arabic"],
});

export const metadata: Metadata = {
  title: "Dubai Restaurants Discover",
  description: "The ultimate guide to curated dining in Dubai.",
};

import { ClerkProvider } from '@clerk/nextjs';

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <ClerkProvider>
      <html lang={locale} dir={dir} className={`${manrope.variable} ${playfair.variable} ${ibmPlexArabic.variable} h-full antialiased`} suppressHydrationWarning>
        <head>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0..1,0" />
        </head>
        <body className={`min-h-full text-zinc-900 ${locale === 'ar' ? 'font-arabic' : 'font-manrope'}`} suppressHydrationWarning>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
