import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RestaurantCard } from "@/components/ui/RestaurantCard";
import type { ScreenDefinition } from "@/lib/screen-catalog";

const MOCK_RESTAURANTS = [
  {
    name: "Al Mahara",
    image: "/al_mahara_restaurant_1776785631205.png",
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
    image: "/cuisine_italian_high_fidelity_1776785759860.png",
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
    image: "/cuisine_japanese_high_fidelity_1776785722454.png",
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
                src="/dubai_spatial_map_background_1776785841856.png" 
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
