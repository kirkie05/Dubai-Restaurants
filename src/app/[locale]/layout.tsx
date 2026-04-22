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
  title: {
    default: "Dubai Restaurants Discover",
    template: "%s | Dubai Restaurants",
  },
  description:
    "The ultimate guide to curated dining in Dubai. Explore luxury, heritage, and excellence.",
};

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
    <html lang={locale} dir={dir} className={`${manrope.variable} ${playfair.variable} ${ibmPlexArabic.variable} h-full antialiased`}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&swap" rel="stylesheet" />
      </head>
      <body className={`min-h-full text-zinc-900 ${locale === 'ar' ? 'font-arabic' : 'font-manrope'}`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <script dangerouslySetInnerHTML={{ __html: `
          const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                entry.target.classList.add('active');
              }
            });
          }, { threshold: 0.1 });
          
          document.addEventListener('DOMContentLoaded', () => {
             document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
          });
        `}} />
      </body>
    </html>
  );
}
