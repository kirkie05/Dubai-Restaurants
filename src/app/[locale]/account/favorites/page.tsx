"use client";

import AccountLayout from "@/components/layout/AccountLayout";
import { RestaurantCard } from "@/components/ui/RestaurantCard";
import { useQuery } from "@tanstack/react-query";

export default function FavoritesPage() {
  const { data: favorites = [], isLoading } = useQuery({
    queryKey: ['favorites'],
    queryFn: async () => {
      const res = await fetch('/api/account/favorites');
      if (!res.ok) throw new Error('Failed to fetch favorites');
      return res.json();
    }
  });

  return (
    <AccountLayout>
       <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <header className="pb-12 border-b border-slate-100">
             <span className="text-primary font-body text-[10px] font-black uppercase tracking-[0.4em] block mb-4">Saved Destinations</span>
             <h1 className="text-5xl md:text-7xl font-headline font-black italic tracking-tighter text-on-surface">The <span className="text-primary">Treasures.</span></h1>
          </header>

          {isLoading ? (
            <div className="flex justify-center py-20 italic text-slate-400">Loading your treasures...</div>
          ) : (
            <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
               {favorites.length > 0 ? (
                 favorites.map((item: any) => (
                   <RestaurantCard key={item.slug} {...item} />
                 ))
               ) : (
                 <div className="col-span-2 py-20 text-center text-slate-400 italic">
                   You haven&apos;t saved any restaurants yet.
                 </div>
               )}
            </section>
          )}
       </div>
    </AccountLayout>
  );
}
