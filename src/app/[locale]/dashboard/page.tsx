"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Reveal } from "@/components/ui/Reveal";
import { supabase } from "@/lib/supabase";
import { Link } from "@/navigation";

type DashboardRestaurant = {
  id: string;
  slug: string;
  name: string;
  image_url: string;
  location: string;
  rating: number;
  reviews_count: number;
  plan: string;
  is_claimed: boolean;
  cuisines?: { name: string } | null;
};

export default function OwnerDashboard() {
  const searchParams = useSearchParams();
  const justClaimed = searchParams.get("claimed");

  const [restaurants, setRestaurants] = useState<DashboardRestaurant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRestaurants() {
      const { data } = await supabase.from("restaurants").select("*, cuisines(name)").limit(10);

      const safeRows = Array.isArray(data) ? (data as DashboardRestaurant[]) : [];
      setRestaurants(
        safeRows.map((restaurant) => ({
          ...restaurant,
          is_claimed: true,
          plan: restaurant.plan || "paid",
          reviews_count: Number(restaurant.reviews_count || 0),
          rating: Number(restaurant.rating || 0),
        }))
      );
      setLoading(false);
    }

    fetchRestaurants();
  }, []);

  if (loading) {
    return <div className="h-screen flex items-center justify-center italic text-slate-400">Loading dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="max-w-7xl mx-auto pt-32 pb-20 px-6 flex-grow">
        <Reveal className="space-y-12">
          {justClaimed ? (
            <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl flex items-center gap-4 text-emerald-800 animate-in fade-in slide-in-from-top-4 duration-700">
              <span className="material-symbols-outlined text-emerald-500">verified</span>
              Your listing is now claimed. You can edit details and manage your plan from this dashboard.
            </div>
          ) : null}

          <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-headline font-black italic tracking-tighter leading-none">
                Partner dashboard
              </h1>
              <p className="text-lg text-slate-600 max-w-xl">
                Manage your claimed listings, update content, and keep your profile accurate.
              </p>
            </div>

            <div className="bg-white px-8 py-4 rounded-2xl border border-slate-100 shadow-lg">
              <p className="text-xs uppercase text-slate-500 tracking-wider font-bold mb-1">Your listings</p>
              <p className="text-2xl font-headline font-black italic">{restaurants.length}</p>
            </div>
          </header>

          <div className="grid grid-cols-1 gap-8">
            {restaurants.length > 0 ? (
              restaurants.map((restaurant) => (
                <div
                  key={restaurant.id}
                  className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl flex flex-col md:flex-row gap-8 items-center"
                >
                  <div className="relative w-full md:w-64 aspect-square rounded-[1.5rem] overflow-hidden shrink-0">
                    <Image src={restaurant.image_url} alt={restaurant.name} fill className="object-cover" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-zinc-900 text-white">
                        {restaurant.plan}
                      </span>
                    </div>
                  </div>

                  <div className="flex-grow space-y-5 text-center md:text-left">
                    <div className="space-y-2">
                      <div className="flex flex-wrap justify-center md:justify-start items-center gap-3">
                        <h2 className="text-3xl font-headline font-black italic tracking-tight">{restaurant.name}</h2>
                        {restaurant.is_claimed ? (
                          <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                            verified
                          </span>
                        ) : null}
                      </div>
                      <p className="text-xs text-primary font-bold uppercase tracking-[0.25em]">
                        {restaurant.cuisines?.name || "Cuisine"} • {restaurant.location}
                      </p>
                    </div>

                    <div className="flex flex-wrap justify-center md:justify-start gap-3">
                      <Link
                        href={`/restaurant/${restaurant.slug}`}
                        className="bg-slate-50 text-zinc-900 px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-zinc-900 hover:text-white"
                      >
                        View page
                      </Link>
                      <button className="bg-zinc-900 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-primary">
                        Edit listing
                      </button>
                    </div>
                  </div>

                  <div className="shrink-0 grid grid-cols-2 md:grid-cols-1 gap-3 w-full md:w-auto">
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-center md:text-left">
                      <p className="text-xs uppercase text-slate-500 tracking-wider font-bold mb-1">Rating</p>
                      <p className="text-2xl font-headline font-black italic text-primary">{restaurant.rating.toFixed(1)}</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-center md:text-left">
                      <p className="text-xs uppercase text-slate-500 tracking-wider font-bold mb-1">Reviews</p>
                      <p className="text-2xl font-headline font-black italic">{restaurant.reviews_count.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white p-16 rounded-[2rem] border border-dashed border-slate-200 text-center space-y-6">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
                  <span className="material-symbols-outlined text-slate-300 text-3xl">inventory_2</span>
                </div>
                <h3 className="text-2xl font-headline font-black italic tracking-tight">No listings yet</h3>
                <p className="text-slate-600 max-w-md mx-auto">
                  Claim your restaurant first, then it will appear here.
                </p>
                <Link href="/restaurants" className="inline-block bg-zinc-900 text-white px-8 py-3 rounded-xl font-semibold hover:bg-primary">
                  Browse restaurants
                </Link>
              </div>
            )}
          </div>
        </Reveal>
      </main>

      <Footer />
    </div>
  );
}
