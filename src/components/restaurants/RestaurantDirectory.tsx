"use client";

import { useState, useMemo } from "react";
import { RestaurantCard } from "@/components/ui/RestaurantCard";
import { Reveal } from "@/components/ui/Reveal";
import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";

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
  initialItems: Restaurant[];
  total: number;
}

export const RestaurantDirectory = ({ initialItems, total: initialTotal }: Props) => {
  const t = useTranslations('RestaurantListing');
  const [page, setPage] = useState(1);
  const pageSize = 12;

  const { data, isLoading } = useQuery({
    queryKey: ['restaurants', page],
    queryFn: async () => {
      const res = await fetch(`/api/restaurants?page=${page}&pageSize=${pageSize}`);
      if (!res.ok) throw new Error('Failed to fetch');
      const json = await res.json();
      return json;
    },
    initialData: page === 1 ? { data: initialItems, total: initialTotal, page: 1, pageSize } : undefined,
  });

  const items = data?.data || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / pageSize);

  const LISTING_ITEMS = items.map((res: any) => ({
    slug: res.slug,
    name: res.name,
    image: res.image_url,
    rating: res.rating.toString(),
    cuisine: res.cuisines?.name || 'Various',
    price: res.price_range,
    location: res.location,
    description: res.description,
    badge: res.badge
  }));

  return (
    <div className="space-y-16">
      {/* Search & Filters Placeholder (Search should be integrated with API later) */}
      <Reveal className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-2xl space-y-8">
        <div className="flex items-center gap-4">
           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
             Showing {LISTING_ITEMS.length} of {total} destinations
           </span>
           <div className="flex-grow h-px bg-slate-100"></div>
        </div>
      </Reveal>

      {/* Grid */}
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24 transition-opacity ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
        {LISTING_ITEMS.map((item: any, i: number) => (
          <Reveal key={item.slug} className={`stagger-${(i % 3) + 1}`}>
            <RestaurantCard {...item} />
          </Reveal>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-4 pt-12">
          <button
            disabled={page === 1}
            onClick={() => setPage(p => Math.max(1, p - 1))}
            className="px-6 py-3 rounded-xl border border-slate-200 font-headline font-bold italic text-sm disabled:opacity-30 hover:bg-slate-50"
          >
            Previous
          </button>
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-10 h-10 rounded-full font-headline font-bold italic text-sm transition-all ${page === i + 1 ? 'bg-primary text-white' : 'text-slate-400 hover:bg-slate-50'}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            className="px-6 py-3 rounded-xl border border-slate-200 font-headline font-bold italic text-sm disabled:opacity-30 hover:bg-slate-50"
          >
            Next
          </button>
        </div>
      )}

      {LISTING_ITEMS.length === 0 && !isLoading && (
        <Reveal className="py-32 text-center space-y-4">
           <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center mx-auto mb-8">
              <span className="material-symbols-outlined text-slate-200 text-4xl">search_off</span>
           </div>
           <h3 className="text-3xl font-headline font-black italic tracking-tighter">No destinations found.</h3>
        </Reveal>
      )}
    </div>
  );
};
