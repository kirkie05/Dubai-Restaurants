import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RestaurantCard } from "@/components/ui/RestaurantCard";

const FAVORITES = [
  {
    name: "Zuma Dubai",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBwQqPubJY4izw1XEZV-CwMh_AyiQ3RYV_ALs_BXd8nOgqec2OeTez0dV6nTGieYwVMdkaZtVYLZ210uqd8AepxHhBTlgu9UPgCgA12D0ibOR4P0UlmWRIzz_Qe6mbCGWtnNgUKx0sh4Yo320A6VB_YmANluVcZLuUlG4YSkWU9PMoFIqkm8lhF85Z6tMFFI-sZEcVSpdxkwpFoLkBqLVTcmFfRxtU7-_DHTRXZ4bUp1wWn82gTEGYPDDgTnE3RBSZzuQgQe-qGh6gX",
    location: "DIFC",
    cuisine: "Japanese",
    price: "AED 450+",
    rating: "4.9",
    description: "World-renowned contemporary Japanese cuisine. A sophisticated twist on the traditional Japanese Izakaya style of informal eating.",
    badge: "Michelin 1*",
    badgeColor: "secondary" as const,
    slug: "zuma-dubai"
  },
  {
    name: "Gaia",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDI9YwhN4N1l9Wg4o8RJUwMAu_wi7z_2sbjiETdCq3hfV-ApJuYCvuGT8LrhmlrlYoxPg-Nwma5ezxR7KvvqYyp1JbQ90WNVPthHKqcprmXJIvjWy_mOoEYnb-IYOqoa9GI8BcSmok3EcPv91SVCx4Qo1-KqtqGrk-qsCb8iVkRWhonQM5z-7nvXfXB99e3fAQPam24D4WCJM5v2C8hSmrf-e6qWexzIm7UJaPOnLF3PQGT48j27Yld5jDInc_R9ZkW3IUPfKCaKqVm",
    location: "DIFC",
    cuisine: "Greek",
    price: "AED 380+",
    rating: "4.8",
    description: "A refined Greek-Mediterranean tavern where the ingredients take center stage. Chef Izu Ani's love letter to simplicity.",
    slug: "gaia"
  }
];

export default function FavoritesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-24 px-8 max-w-screen-2xl mx-auto w-full">
        <header className="mb-16">
          <span className="font-body text-[10px] uppercase tracking-[0.2em] text-primary font-bold">Your Selection</span>
          <h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tighter text-on-surface italic">Saved Favorites</h1>
          <p className="text-slate-500 mt-4 text-lg max-w-xl font-body">A curated list of your most loved culinary destinations in the city.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-16">
          {FAVORITES.map((restaurant) => (
            <RestaurantCard key={restaurant.slug} {...restaurant} />
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
