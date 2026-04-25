import { Navbar } from "@/components/layout/Navbar";
import { MapContainer } from "@/components/map/MapContainer";
import { getRestaurants } from "@/lib/db";

type DbRestaurant = {
  id: string | number;
  name: string;
  location: string;
  rating: number;
  latitude?: number | null;
  longitude?: number | null;
  cuisines?: { name: string } | null;
};

export default async function MapViewPage() {
  const raw = await getRestaurants();
  const restaurants: DbRestaurant[] = Array.isArray(raw) ? (raw as DbRestaurant[]) : [];

  const safeRestaurants = restaurants.map((restaurant) => ({
    id: String(restaurant.id),
    name: restaurant.name,
    location: restaurant.location,
    rating: Number(restaurant.rating || 0),
    latitude: restaurant.latitude ?? undefined,
    longitude: restaurant.longitude ?? undefined,
    cuisines: restaurant.cuisines ?? undefined,
  }));

  return (
    <div className="flex flex-col h-screen bg-black overflow-hidden">
      <Navbar />

      <main className="flex-grow pt-24 relative flex flex-col lg:flex-row">
        <MapContainer initialRestaurants={safeRestaurants} />
      </main>
    </div>
  );
}
