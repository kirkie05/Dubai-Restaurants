import Image from "next/image";
import AccountLayout from "@/components/layout/AccountLayout";
import { RestaurantCard } from "@/components/ui/RestaurantCard";

const FAVORITES = [
  {
    name: "Al Mahara",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBcoFe6omNLIs7L32v-ULd2AqewYUWTBeHElsiYHNRC2ZHbGGUNFbcOf4TfXKaC-IQSgBqUUF0Td5Z4JOLYd9MbQeyCKpPcIIMV1NdXyCjCdb4NyvVEJa14-n27O9uuSEBtKhSgQmiVhXMe1IwnyOapfm3AEAhtsFevHDY0Gm0nuYInxRYULu9gsVCz1Ms4q0VX97ij367363xeRiFk2pghjkNDhkbeFnBEu-oKOxkvIemvkjYoL-mJ7ZjMiZnUV_YeVYDOjAuhhYTI",
    rating: "4.9",
    cuisine: "Seafood",
    price: "AED 800+",
    location: "Burj Al Arab",
    description: "An underwater dining experience within the Burj Al Arab, featuring world-class seafood curated by Michelin-star chefs.",
    slug: "al-mahara",
    badge: "Saved"
  }
];

export default function FavoritesPage() {
  return (
    <AccountLayout>
       <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <header className="pb-12 border-b border-slate-100">
             <span className="text-primary font-body text-[10px] font-black uppercase tracking-[0.4em] block mb-4">Saved Destinations</span>
             <h1 className="text-5xl md:text-7xl font-headline font-black italic tracking-tighter text-on-surface">The <span className="text-zinc-300">Treasures.</span></h1>
          </header>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
             {FAVORITES.map((item) => (
               <RestaurantCard key={item.slug} {...item} />
             ))}
          </section>
       </div>
    </AccountLayout>
  );
}
