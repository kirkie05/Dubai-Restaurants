import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RestaurantCard } from "@/components/ui/RestaurantCard";
import type { ScreenDefinition } from "@/lib/screen-catalog";

const MOCK_RESTAURANTS = [
  {
    name: "Al Mahara",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDLtde8_LII8BrUWQcgLXqOMC3CVFnFj9FxbOsRYP4l0mWRJYtygww6dIt1hgvOfX0tVzqAIoLMOgpyd8WYmAW4bzvWshUOwihYNFWxg7PyGbu-Vqe_7LMb3v3WEHazAzjwC-xhYpE-2NBsC9uszBVCGXcOJI91rzKucIT0yUkxmBPE76xwq5o-RWLsk_E-7yyuEEiF8l58DEG4OH1Ns52wUz77uTc_NpPc4bhWKimp6JI1Eh511_wyfL6AuBSsN93IlG4k8EXtrpbn",
    location: "Burj Al Arab",
    cuisine: "Seafood",
    price: "AED 800+",
    rating: "4.9",
    description: "An underwater dining experience featuring the finest seafood in a subterranean setting at the Burj Al Arab.",
    badge: "Michelin 2*",
    badgeColor: "secondary" as const,
    slug: "al-mahara"
  },
  {
    name: "Atmosphere",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA7Pmek0qsO0lvrw5umCHvRetQyjnYXOfcnm-KC7Mc2ebPP_hx6rxDz9UIxG8hxvp_o0iFKc0FZciQ79LvKxEpKkYnI686LlkLvfsyP9qon1VapM9waMyVlU1wVjM3CcIS2I6LYV0CCJb3z1xf4IgdYPxNI1Wa8pqTlXufKqLbCmSRwhns510y6DUaDUXmTjxNID9cFbzM_j5lX8Neh2uIRPKA8jezZZpO7OW1vkIfjxwMY6qnIFPRQmQlTnaWV5XB6K0YBbRzhMRRk",
    location: "Burj Khalifa",
    cuisine: "Contemporary",
    price: "AED 700+",
    rating: "4.8",
    description: "Elevated contemporary cuisine situated on the 122nd floor of the world's tallest building.",
    badge: "Best Views",
    badgeColor: "primary" as const,
    slug: "atmosphere"
  },
  {
    name: "Zuma Dubai",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBa2zXOa1qVUcY2BR-ldWlSfR10bvl9mboHBCRlgjr4wkXHCBnvGkxZo6cXE9ZPvw-Ybg0QvZS-NCYjhXlFAZShWfG0I4VkOUG7z-BZcD5ySDTHiB5A7z8Thncq-t3hxxPmeo-UQK2uYlKfuucYFwkbBwEDfTC5JmQ98dth68yGwkTbKeJskMHgwvJMwt3B2FVO8OjBt2YmEUQTiAo-vMh3jI9vWpss_E-ggrpwaij7GwG_OVKzXZaU-lNHN7oU-dBJKayEQ23X81Pc",
    location: "DIFC",
    cuisine: "Japanese",
    price: "AED 450+",
    rating: "4.9",
    description: "The pinnacle of Izakaya-style dining, combining traditional flavors with high-intensity urban energy.",
    badge: "Michelin 1*",
    badgeColor: "secondary" as const,
    slug: "zuma-dubai"
  }
];

export function SeoListingPage({ screen }: { screen: ScreenDefinition }) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24">
        {/* SEO Hero Section */}
        <header className="relative px-8 lg:px-16 pt-12 pb-24 grid lg:grid-cols-12 gap-12 items-center overflow-hidden border-b border-slate-100">
          <div className="lg:col-span-7 z-10">
            <div className="flex items-center gap-4 mb-6">
              <span className="h-[1px] w-12 bg-primary"></span>
              <span className="font-body text-[10px] tracking-[0.2em] uppercase text-slate-400 font-bold">Curated Selection</span>
            </div>
            <h1 className="font-headline text-6xl lg:text-8xl font-extrabold tracking-tighter leading-[0.9] mb-8 italic">
              {screen.title.replace(" Page", "")} <br/>
              <span className="text-slate-400">Redefined.</span>
            </h1>
            <p className="max-w-xl text-lg text-slate-500 leading-relaxed font-body italic mb-10">
              {screen.summary} Discover the essence of luxury dining in {screen.path.includes('downtown') ? 'Downtown' : 'Dubai'}.
            </p>
            <div className="flex gap-4">
              <div className="bg-slate-100 border border-white px-6 py-2 rounded-full flex items-center gap-2 shadow-sm">
                <span className="font-body text-[10px] font-bold uppercase tracking-wider text-slate-400">42 Destinations</span>
              </div>
              <div className="bg-slate-100 border border-white px-6 py-2 rounded-full flex items-center gap-2 shadow-sm">
                <span className="font-body text-[10px] font-bold uppercase tracking-wider text-slate-400">Expert Reviews</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/5] rounded-lg overflow-hidden shadow-2xl transform lg:rotate-3 hover:rotate-0 transition-transform duration-700 bg-slate-200">
              <Image 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCh0gDLUI4TB6O9PTKn7QybGGM2OtpVNRvW3H4B2njUea1QRvaCuB9zRFv6hXgZTwWdXBKqTd66a7Q3J-JhCMJxqMRGGJO3waiLxgz5U5dY8cjEfx_t5Chh5tomuZkccudMjTwfRGxNBX37fkuWVQKUYTmewdbn99CZ0lNfs3jFnOS0qaAyfLn9HrObkh5dPxljsX1yx26J4NII5CcwgarkGU-jrhnlKIJm9J8K8_P6trPdSekqGJ6w7gQc8dGDemi8Wm11IpGe2hNI" 
                alt="SEO Context" 
                fill 
                className="object-cover brightness-95"
              />
            </div>
          </div>
        </header>

        {/* Filter Chips */}
        <div className="px-8 lg:px-16 py-12 flex flex-wrap gap-4 overflow-x-auto">
          {['All', 'French', 'Japanese', 'Mediterranean', 'Modern Arabic', 'Michelin Star'].map((item, i) => (
            <button key={item} className={`px-8 py-2 rounded-full font-body text-[10px] font-bold uppercase tracking-widest transition-all ${i === 0 ? 'bg-primary text-white shadow-lg' : 'bg-slate-100 text-slate-400 border border-white'}`}>
              {item}
            </button>
          ))}
        </div>

        {/* Restaurant Grid */}
        <section className="px-8 lg:px-16 pb-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
          {MOCK_RESTAURANTS.map((restaurant) => (
            <RestaurantCard key={restaurant.slug} {...restaurant} />
          ))}
        </section>

        {/* SEO Text Block */}
        <section className="mt-32 px-8 lg:px-16 py-24 bg-slate-50 border-t border-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-headline text-3xl font-extrabold tracking-tight mb-8 italic">Guide to High-End Dining</h2>
            <div className="grid md:grid-cols-2 gap-12 text-sm text-slate-500 leading-relaxed font-body italic">
              <div>
                <h4 className="font-headline text-lg font-bold text-on-surface mb-4 not-italic uppercase tracking-widest text-[12px]">The Evolution of Taste</h4>
                <p className="mb-4">Dubai has rapidly transformed into one of the world&apos;s leading culinary capitals. The fine dining scene here is characterized by its diversity, bringing together global flavors and celebrity chefs.</p>
                <p>Our curated collection focuses on restaurants that offer more than just a meal—they offer a journey. We look for impeccable service and innovative menus.</p>
              </div>
              <div>
                <h4 className="font-headline text-lg font-bold text-on-surface mb-4 not-italic uppercase tracking-widest text-[12px]">Booking & Etiquette</h4>
                <p className="mb-4">Securing a table at Dubai&apos;s top fine dining spots often requires planning weeks in advance. Many establishments maintain a smart-elegant dress code.</p>
                <ul className="space-y-3">
                  <li className="flex gap-3"><span className="text-secondary font-bold">✓</span> Reservation recommended 2-4 weeks ahead</li>
                  <li className="flex gap-3"><span className="text-secondary font-bold">✓</span> Smart-elegant dress code is standard</li>
                  <li className="flex gap-3"><span className="text-secondary font-bold">✓</span> Valet parking typically available</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
