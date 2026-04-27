'use client';

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RestaurantCard } from "@/components/ui/RestaurantCard";
import { Link } from "@/navigation";
import { useSearchParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

const CUISINES = ['All', 'Japanese', 'Mediterranean', 'French Modern', 'Emirati', 'Seafood', 'Grill'];

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const q = searchParams.get('q') || '';
  const cuisine = searchParams.get('cuisine') || 'All';
  const minRating = searchParams.get('minRating') || '';
  const page = parseInt(searchParams.get('page') || '1');

  const [searchInput, setSearchInput] = useState(q);

  const { data, isLoading, error } = useQuery({
    queryKey: ['search', q, cuisine, minRating, page],
    queryFn: async () => {
      const params = new URLSearchParams({
        q,
        cuisine,
        minRating,
        page: page.toString(),
      });
      const res = await fetch(`/api/search?${params.toString()}`);
      if (!res.ok) throw new Error('Search failed');
      return res.json();
    }
  });

  const updateParams = (newParams: Record<string, string | number | null>) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    
    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null || value === '' || value === 'All') {
        current.delete(key);
      } else {
        current.set(key, value.toString());
      }
    });
    
    // Reset to page 1 when filters change
    if (!newParams.page) {
      current.delete('page');
    }

    router.push(`/search?${current.toString()}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateParams({ q: searchInput });
  };

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
              <p className="text-slate-400 font-body text-sm font-medium italic mt-4 max-w-xl">
                {isLoading ? 'Curating results...' : `${data?.total || 0} Destinations verified by our editorial board.`}
              </p>
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
                     <form onSubmit={handleSearchSubmit} className="relative group">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors">search</span>
                        <input 
                          type="text" 
                          value={searchInput}
                          onChange={(e) => setSearchInput(e.target.value)}
                          placeholder="District or Taste..." 
                          className="w-full bg-slate-50 border border-slate-100 rounded-xl py-4 pl-12 pr-4 text-sm font-body italic focus:ring-2 focus:ring-primary/10 transition-all outline-none"
                        />
                     </form>
                  </section>

                  <section className="space-y-6">
                     <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface">Cuisine Selection</h3>
                     <div className="flex flex-wrap gap-2">
                        {CUISINES.map(c => (
                          <button 
                            key={c}
                            onClick={() => updateParams({ cuisine: c })}
                            className={`px-5 py-2.5 border text-[10px] font-black uppercase tracking-widest rounded-full transition-all ${cuisine === c ? 'bg-zinc-900 border-zinc-900 text-white' : 'bg-white border-slate-100 text-slate-500 hover:border-primary hover:text-primary'}`}
                          >
                            {c}
                          </button>
                        ))}
                     </div>
                  </section>

                  <section className="space-y-6">
                     <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface">Min Rating</h3>
                     <div className="grid grid-cols-2 gap-3">
                        {[4.0, 4.5, 4.8, 4.9].map(rating => (
                          <button 
                            key={rating} 
                            onClick={() => updateParams({ minRating: minRating === rating.toString() ? null : rating })}
                            className={`py-3 px-4 border rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${minRating === rating.toString() ? 'bg-primary border-primary text-white' : 'bg-white border-slate-100 text-slate-400 hover:bg-zinc-900 hover:text-white'}`}
                          >
                             {rating}+ Stars
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
            <section className="flex-1 space-y-16 pb-32">
               {isLoading ? (
                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-x-12 gap-y-24">
                   {[1,2,3,4,5,6].map(i => (
                     <div key={i} className="aspect-[4/5] bg-slate-50 animate-pulse rounded-[2rem]"></div>
                   ))}
                 </div>
               ) : data?.data?.length > 0 ? (
                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-x-12 gap-y-24">
                   {data.data.map((restaurant: any) => (
                     <RestaurantCard 
                       key={restaurant.id} 
                        id={restaurant.id}
                        name={restaurant.name}
                       image={restaurant.image_url}
                       location={restaurant.location}
                       cuisine={restaurant.cuisines?.name || 'Various'}
                       price={restaurant.price_range}
                       rating={restaurant.rating.toString()}
                       description={restaurant.description}
                       slug={restaurant.slug}
                     />
                   ))}
                 </div>
               ) : (
                 <div className="text-center py-40 space-y-8">
                   <span className="material-symbols-outlined text-7xl text-slate-200">sentiment_dissatisfied</span>
                   <div className="space-y-2">
                     <h3 className="text-3xl font-headline font-black italic">No matches found.</h3>
                     <p className="text-slate-400 font-body italic">Our editorial board hasn&apos;t indexed this specific combination yet.</p>
                   </div>
                   <button 
                     onClick={() => router.push('/search')}
                     className="text-primary font-black text-[10px] uppercase tracking-widest border-b border-primary/20"
                   >
                     Reset Filters
                   </button>
                 </div>
               )}

               {/* Pagination Component */}
               {data?.total > data?.pageSize && (
                 <div className="pt-20 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-8">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      Showing {(page-1)*data.pageSize + 1}-{Math.min(page*data.pageSize, data.total)} of {data.total} destinations
                    </p>
                    <div className="flex items-center gap-4">
                       <button 
                         disabled={page === 1}
                         onClick={() => updateParams({ page: page - 1 })}
                         className="w-12 h-12 rounded-full border border-slate-100 flex items-center justify-center text-slate-300 hover:border-primary hover:text-primary disabled:opacity-20 transition-all"
                       >
                          <span className="material-symbols-outlined">west</span>
                       </button>
                       <div className="flex gap-4">
                          {Array.from({ length: Math.ceil(data.total / data.pageSize) }).map((_, i) => (
                            <button 
                              key={i} 
                              onClick={() => updateParams({ page: i + 1 })}
                              className={`w-10 h-10 rounded-xl text-[10px] font-black transition-all ${page === i + 1 ? 'bg-zinc-900 text-white shadow-xl' : 'text-slate-400 hover:bg-slate-50'}`}
                            >
                               {i + 1}
                            </button>
                          ))}
                       </div>
                       <button 
                         disabled={page >= Math.ceil(data.total / data.pageSize)}
                         onClick={() => updateParams({ page: page + 1 })}
                         className="w-12 h-12 rounded-full border border-slate-100 flex items-center justify-center text-slate-300 hover:border-primary hover:text-primary disabled:opacity-20 transition-all"
                       >
                          <span className="material-symbols-outlined">east</span>
                       </button>
                    </div>
                 </div>
               )}
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
