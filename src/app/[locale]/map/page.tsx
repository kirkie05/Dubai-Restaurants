'use client';

import { Navbar } from "@/components/layout/Navbar";
import { MapContainer } from "@/components/map/MapContainer";
import { useQuery } from "@tanstack/react-query";

export default function MapViewPage() {
  const { data: restaurants, isLoading } = useQuery({
    queryKey: ['map-restaurants'],
    queryFn: async () => {
      const res = await fetch('/api/restaurants?all=true');
      if (!res.ok) throw new Error('Failed to fetch map data');
      return res.json();
    }
  });

  const safeRestaurants = (restaurants || []).map((restaurant: any) => ({
    id: String(restaurant.id),
    name: restaurant.name,
    location: restaurant.location,
    rating: Number(restaurant.rating || 0),
    latitude: restaurant.latitude ?? undefined,
    longitude: restaurant.longitude ?? undefined,
    cuisines: restaurant.cuisines ?? undefined,
    image_url: restaurant.image_url,
  }));

  return (
    <div className="flex flex-col h-screen bg-black overflow-hidden">
      <Navbar />

      <main className="flex-grow pt-24 relative flex flex-col lg:flex-row">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-zinc-950 z-50">
             <div className="space-y-4 text-center">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-primary font-headline font-black italic tracking-widest text-sm uppercase">Mapping Dubai...</p>
             </div>
          </div>
        ) : (
          <MapContainer initialRestaurants={safeRestaurants} />
        )}
      </main>
    </div>
  );
}
