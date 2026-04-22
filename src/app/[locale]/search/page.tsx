import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RestaurantCard } from "@/components/ui/RestaurantCard";
import { Link } from "@/navigation";

const MOCK_RESULTS = [
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
  },
  {
    name: "Amazónico",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAaqIzPvYkSAqRpnrg1faFumQ19h9NnE_-GIrBWRtxqF39Di6bbU55u464UQgtrz001HZ8EchJjtXzJ5mKVPhGrILyLEP7-xqCTN6LmVHK9bkMdBOkAUcS5ermnqMk4T9koyHT9QOriq3hEXOM5YICVFWSnqPvcex1t6_rssUNtf4vGxZJEeukPXPkgHSe4ChtFIBThMt4QZJ2zCns4AX1r5ppFH7af1vPraDaJB0BfWPM03Y_KjP-sS4VM1JBZ-VmLzlZlIkfsyc9C",
    location: "Downtown",
    cuisine: "Latin American",
    price: "AED 500+",
    rating: "4.7",
    description: "An immersive rainforest experience in the heart of the city. Latin American flavors meet high-energy atmosphere.",
    badge: "Hot Spot",
    slug: "amazonico"
  }
];

export default function SearchPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 min-h-screen">
        <div className="max-w-[1920px] mx-auto px-8 lg:px-16">
          {/* Header */}
          <header className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-slate-100">
            <div className="space-y-4">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Curation Discovery</span>
              <h1 className="font-headline text-6xl md:text-8xl font-black tracking-tighter italic text-on-surface leading-none">Find your <br /><span className="text-primary">Atmosphere.</span></h1>
              <p className="text-slate-400 font-body text-sm font-medium italic mt-4 max-w-xl">84 Destinations verified by our editorial board. Filter by mood, cuisine, or district.</p>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/map" className="flex items-center gap-3 bg-zinc-900 text-white px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl hover:bg-primary transition-all group">
                <span className="material-symbols-outlined text-sm group-hover:rotate-12 transition-transform">map</span>
                Explore on Map
              </Link>
            </div>
          </header>

          <div className="flex flex-col lg:flex-row gap-20">
            {/* Sidebar Filters */}
            <aside className="w-full lg:w-80 shrink-0">
               <div className="sticky top-32 space-y-16">
                  <section className="space-y-6">
                     <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface">Refine Discovery</h3>
                     <div className="relative group">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors">search</span>
                        <input 
                          type="text" 
                          placeholder="District or Taste..." 
                          className="w-full bg-slate-50 border border-slate-100 rounded-xl py-4 pl-12 pr-4 text-sm font-body italic focus:ring-2 focus:ring-primary/10 transition-all"
                        />
                     </div>
                  </section>

                  <section className="space-y-6">
                     <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface">Cuisine Selection</h3>
                     <div className="flex flex-wrap gap-2">
                        {['Japanese', 'Mediterranean', 'French Modern', 'Emirati', 'Seafood', 'Grill'].map(cuisine => (
                          <button 
                            key={cuisine}
                            className="px-5 py-2.5 bg-white border border-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-full hover:border-primary hover:text-primary transition-all"
                          >
                            {cuisine}
                          </button>
                        ))}
                     </div>
                  </section>

                  <section className="space-y-6">
                     <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface">Luxury Level</h3>
                     <div className="grid grid-cols-2 gap-3">
                        {['Casual Luxe', 'Signature', 'Elite', 'VVIP'].map(level => (
                          <button key={level} className="py-3 px-4 bg-white border border-slate-100 rounded-xl text-[9px] font-black uppercase tracking-widest text-slate-400 hover:bg-zinc-900 hover:text-white transition-all">
                             {level}
                          </button>
                        ))}
                     </div>
                  </section>

                  <section className="bg-primary/5 p-8 rounded-2xl border border-primary/10">
                     <p className="text-[9px] font-black uppercase tracking-widest text-primary mb-2">Need a Concierge?</p>
                     <p className="text-xs text-primary/70 font-body italic leading-relaxed mb-4">Let our discovery desk handle the reservation for you.</p>
                     <button className="text-[9px] font-black uppercase tracking-widest text-primary border-b border-primary/20">Talk to us</button>
                  </section>
               </div>
            </aside>

            {/* Results Grid */}
            <section className="flex-1 space-y-16">
               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-x-12 gap-y-24">
                  {MOCK_RESULTS.map((restaurant) => (
                    <RestaurantCard key={restaurant.slug} {...restaurant} />
                  ))}
               </div>

               {/* Pagination Component */}
               <div className="pt-20 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-8">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Showing 1-12 of 84 destinations</p>
                  <div className="flex items-center gap-4">
                     <button className="w-12 h-12 rounded-full border border-slate-100 flex items-center justify-center text-slate-300 hover:border-primary hover:text-primary transition-all">
                        <span className="material-symbols-outlined">west</span>
                     </button>
                     <div className="flex gap-4">
                        {[1, 2, 3, 4].map(i => (
                          <button key={i} className={`w-10 h-10 rounded-xl text-[10px] font-black transition-all ${i === 1 ? 'bg-zinc-900 text-white shadow-xl' : 'text-slate-400 hover:bg-slate-50'}`}>
                             {i}
                          </button>
                        ))}
                     </div>
                     <button className="w-12 h-12 rounded-full border border-slate-100 flex items-center justify-center text-slate-300 hover:border-primary hover:text-primary transition-all">
                        <span className="material-symbols-outlined">east</span>
                     </button>
                  </div>
               </div>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
