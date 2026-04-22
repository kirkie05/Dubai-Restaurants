"use client";

import { useState, useMemo } from "react";
import { RestaurantCard } from "@/components/ui/RestaurantCard";
import { Reveal } from "@/components/ui/Reveal";
import { useTranslations } from "next-intl";

interface Restaurant {
  slug: string;
  name: string;
  image: string;
  rating: string;
  cuisine: string;
  price: string;
  location: string;
  description: string;
  badge: string;
}

interface Props {
  items: Restaurant[];
}

export const RestaurantDirectory = ({ items }: Props) => {
  const t = useTranslations('RestaurantListing');
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [visibleCount, setVisibleCount] = useState(6);

  const cuisines = useMemo(() => ["All", ...Array.from(new Set(items.map(i => i.cuisine)))], [items]);
  const locations = useMemo(() => ["All", ...Array.from(new Set(items.map(i => i.location)))], [items]);

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCuisine = selectedCuisine === "All" || item.cuisine === selectedCuisine;
      const matchesLocation = selectedLocation === "All" || item.location === selectedLocation;
      return matchesSearch && matchesCuisine && matchesLocation;
    });
  }, [items, searchQuery, selectedCuisine, selectedLocation]);

  const displayedItems = filteredItems.slice(0, visibleCount);

  return (
    <div className="space-y-16">
      {/* Search & Filters */}
      <Reveal className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-2xl space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Search Input */}
          <div className="md:col-span-6 relative">
            <span className="absolute left-6 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-300">search</span>
            <input 
              type="text" 
              placeholder="Search by name or keyword..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border-none rounded-2xl py-5 pl-16 pr-6 font-body text-sm focus:ring-2 focus:ring-primary/20 transition-all italic"
            />
          </div>

          {/* Location Filter */}
          <div className="md:col-span-3 relative">
            <select 
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full bg-slate-50 border-none rounded-2xl py-5 px-6 font-body text-[10px] font-black uppercase tracking-widest text-slate-500 focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer"
            >
              <option value="All">All Locations</option>
              {locations.filter(l => l !== "All").map(l => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
            <span className="absolute right-6 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-300 pointer-events-none">expand_more</span>
          </div>

          {/* Cuisine Filter */}
          <div className="md:col-span-3 relative">
            <select 
              value={selectedCuisine}
              onChange={(e) => setSelectedCuisine(e.target.value)}
              className="w-full bg-slate-50 border-none rounded-2xl py-5 px-6 font-body text-[10px] font-black uppercase tracking-widest text-slate-500 focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer"
            >
              <option value="All">All Cuisines</option>
              {cuisines.filter(c => c !== "All").map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <span className="absolute right-6 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-300 pointer-events-none">expand_more</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Showing {displayedItems.length} of {filteredItems.length} destinations</span>
           <div className="flex-grow h-px bg-slate-100"></div>
        </div>
      </Reveal>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
        {displayedItems.map((item, i) => (
          <Reveal key={item.slug} className={`stagger-${(i % 3) + 1}`}>
            <RestaurantCard {...item} />
          </Reveal>
        ))}
      </div>

      {/* Load More */}
      {visibleCount < filteredItems.length && (
        <Reveal className="flex justify-center pt-12">
          <button 
            onClick={() => setVisibleCount(prev => prev + 6)}
            className="group flex flex-col items-center gap-4"
          >
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 group-hover:text-primary transition-colors">Load More Destinations</span>
             <div className="w-12 h-12 rounded-full border border-slate-100 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all">
                <span className="material-symbols-outlined text-slate-400 group-hover:text-white transition-all">expand_more</span>
             </div>
          </button>
        </Reveal>
      )}

      {filteredItems.length === 0 && (
        <Reveal className="py-32 text-center space-y-4">
           <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center mx-auto mb-8">
              <span className="material-symbols-outlined text-slate-200 text-4xl">search_off</span>
           </div>
           <h3 className="text-3xl font-headline font-black italic tracking-tighter">No destinations found.</h3>
           <p className="text-slate-500 font-body italic">Try adjusting your filters or search terms.</p>
           <button 
             onClick={() => { setSearchQuery(""); setSelectedCuisine("All"); setSelectedLocation("All"); }}
             className="text-primary font-black text-[10px] uppercase tracking-widest border-b border-primary pt-4"
           >
             Clear All Filters
           </button>
        </Reveal>
      )}
    </div>
  );
};
