import Image from "next/image";
import { Link } from '@/navigation';
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RestaurantCard } from "@/components/ui/RestaurantCard";

const RESTAURANTS = [
  {
    name: "Al Mahara",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBcoFe6omNLIs7L32v-ULd2AqewYUWTBeHElsiYHNRC2ZHbGGUNFbcOf4TfXKaC-IQSgBqUUF0Td5Z4JOLYd9MbQeyCKpPcIIMV1NdXyCjCdb4NyvVEJa14-n27O9uuSEBtKhSgQmiVhXMe1IwnyOapfm3AEAhtsFevHDY0Gm0nuYInxRYULu9gsVCz1Ms4q0VX97ij367363xeRiFk2pghjkNDhkbeFnBEu-oKOxkvIemvkjYoL-mJ7ZjMiZnUV_YeVYDOjAuhhYTI",
    rating: "4.9",
    cuisine: "Seafood",
    price: "AED 800+",
    location: "Burj Al Arab",
    description: "An underwater dining experience within the Burj Al Arab, featuring world-class seafood curated by Michelin-star chefs.",
    slug: "al-mahara",
    badge: "Michelin 2*"
  },
  {
    name: "The Crystal Lounge",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBCQaZ4Rzc4yh_i9VR536sMqU5IBHantXMBrYBHokcOmg9dIbwIROyioKWiPgXvM1Xex7Qn45bdBXrnPFK6sIMzuW1dBqql49dAoBCtgrDZomgB5586Olg-3jakrU-1dWLBmMoJL0uAty__ERh9lsuWyQK39CRq6-nZ3TSQGyqfdYR8V-wFGHZc4g6cs2Urhj_peVI7bk9kKcheCUSOXTbk0HNk0L24bItA_BldAVnbNOkHQj_xcq58wbCLpOLADYKruPqAb30R01Z2",
    rating: "4.8",
    cuisine: "Modern Fusion",
    price: "AED 500+",
    location: "Downtown",
    description: "A refined space where architectural elegance meets avant-garde culinary fusion.",
    slug: "crystal-lounge",
    badge: "Hot Spot"
  }
];

export default async function ChefRestaurants({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const chefName = slug.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');

  return (
    <div className="flex flex-col min-h-screen bg-background text-on-surface">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <header className="max-w-[1920px] mx-auto px-8 lg:px-16 mb-32">
          <div className="flex flex-col lg:flex-row items-end justify-between gap-16 pb-16 border-b border-slate-100">
             <div className="space-y-6 max-w-4xl">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Chef Portfolio</span>
                <h1 className="text-6xl md:text-9xl font-headline font-black italic tracking-tighter leading-[0.85] text-on-surface">
                   The <br /><span className="text-primary">Library.</span>
                </h1>
                <p className="text-xl text-slate-500 font-body italic leading-relaxed max-w-xl">
                   Every culinary destination currently curated or owned by **{chefName}**. A legacy of flavor across Dubai.
                </p>
             </div>
             <Link href={`/chefs/${slug}`} className="text-primary font-body text-[10px] font-black uppercase tracking-[0.3em] pb-1 border-b border-primary/20 hover:border-primary transition-all">Back to Profile</Link>
          </div>
        </header>

        <section className="max-w-[1920px] mx-auto px-8 lg:px-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
           {RESTAURANTS.map((item) => (
             <RestaurantCard key={item.slug} {...item} />
           ))}
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
