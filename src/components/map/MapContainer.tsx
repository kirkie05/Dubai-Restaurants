"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Link } from "@/navigation";
import { InteractiveMap } from "@/components/ui/InteractiveMap";

interface Restaurant {
  id: string;
  name: string;
  location: string;
  rating: number;
  latitude?: number;
  longitude?: number;
  cuisines?: { name: string } | null;
}

interface MapMarker {
  id: string;
  name: string;
  type: string;
  area: string;
  rating: number;
  position: {
    lat: number;
    lng: number;
  };
}

interface MapContainerProps {
  initialRestaurants: Restaurant[];
}

const NEIGHBORHOODS = ["All", "Downtown", "Jumeirah", "DIFC", "Marina"];

const AREA_COORDS: Record<string, { lat: number; lng: number }> = {
  "Downtown Dubai": { lat: 25.2048, lng: 55.2708 },
  "Burj Al Arab": { lat: 25.1412, lng: 55.1852 },
  "Palm Jumeirah": { lat: 25.1124, lng: 55.139 },
  DIFC: { lat: 25.2136, lng: 55.2811 },
  "Dubai Marina": { lat: 25.0772, lng: 55.1337 },
};

function toMarker(res: Restaurant): MapMarker {
  return {
    id: res.id,
    name: res.name,
    type: res.cuisines?.name || "Restaurant",
    area: res.location,
    rating: res.rating,
    position: {
      lat: res.latitude || AREA_COORDS[res.location]?.lat || 25.2048,
      lng: res.longitude || AREA_COORDS[res.location]?.lng || 55.2708,
    },
  };
}

export function MapContainer({ initialRestaurants }: MapContainerProps) {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filteredLocations = useMemo(() => {
    return initialRestaurants
      .filter((res) => activeFilter === "All" || res.location.includes(activeFilter))
      .map(toMarker);
  }, [initialRestaurants, activeFilter]);

  return (
    <>
      <section className="flex-grow relative bg-black overflow-hidden">
        <div className="absolute inset-0 z-10">
          <InteractiveMap markers={filteredLocations} />
        </div>

        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 flex bg-white/95 backdrop-blur-xl border border-white p-2 rounded-2xl shadow-2xl">
          <div className="flex items-center gap-2 px-4 border-r border-slate-100">
            <span className="material-symbols-outlined text-primary text-sm">filter_list</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface">Filters</span>
          </div>
          <div className="flex items-center px-4 gap-4">
            {NEIGHBORHOODS.map((loc) => (
              <button
                key={loc}
                onClick={() => setActiveFilter(loc)}
                className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${
                  activeFilter === loc ? "text-primary" : "text-slate-400 hover:text-primary"
                }`}
              >
                {loc}
              </button>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 right-8 flex flex-col gap-2 z-20">
          <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl hover:bg-zinc-900 hover:text-white transition-all">
            <span className="material-symbols-outlined">add</span>
          </button>
          <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl hover:bg-zinc-900 hover:text-white transition-all">
            <span className="material-symbols-outlined">remove</span>
          </button>
          <button className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center shadow-xl">
            <span className="material-symbols-outlined">my_location</span>
          </button>
        </div>
      </section>

      <aside className="w-full lg:w-[480px] bg-white border-l border-slate-100 overflow-y-auto z-30 shadow-[-20px_0_40px_rgba(0,0,0,0.05)]">
        <div className="p-10 space-y-12">
          <div className="space-y-4">
            <h1 className="text-5xl font-headline font-black italic tracking-tighter leading-none">
              Map <br />
              <span className="text-primary">Discovery</span>
            </h1>
            <p className="text-sm text-slate-400 font-body italic leading-relaxed">
              Showing {filteredLocations.length} verified culinary landmarks in {activeFilter === "All" ? "Dubai" : activeFilter}.
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex justify-between items-end">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                Nearby {activeFilter !== "All" ? `in ${activeFilter}` : ""}
              </p>
              <Link
                href="/restaurants"
                className="text-[9px] font-bold uppercase tracking-widest text-slate-400 hover:text-on-surface border-b border-slate-200"
              >
                View List
              </Link>
            </div>

            {filteredLocations.slice(0, 5).map((item) => (
              <article
                key={item.id}
                className="group flex gap-6 items-center cursor-pointer border-b border-slate-50 pb-8 hover:border-primary/20 transition-all"
              >
                <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-slate-100 shrink-0 shadow-lg group-hover:scale-105 transition-transform">
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzv0qhsoRFmpbHaf_2gJ_lKOUMZVdzV0SBQT9r1fZ1EEpAv2epAT_tNIR6XOChNUVmNnOvDAbZK6SaW4Bn1dHTQo3VJOBeyrqTBElxkS8ZbtUdNglTvQM9CBzWTmgyMnWBo4vOA9PsIu5tcJIGAy5Gk8mxTzZXEUzIRv3LG0iF2ABnY4Yl4UMWSO8A2-Z6v90UL2S2Dq_IzNTcJimIMCVNtrTylS4qApQ1XawxxKhd4h8h9xQ6fLaB6rC5xCWKYJ7MAbISfcTbl7ty"
                    alt={item.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                <div className="flex-grow space-y-1">
                  <h3 className="font-headline font-black text-on-surface text-xl italic leading-none">{item.name}</h3>
                  <p className="text-primary font-body text-[10px] font-bold uppercase tracking-widest">{item.type}</p>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-2">
                    <div className="flex items-center text-primary">
                      <span
                        className="material-symbols-outlined text-[10px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      {item.rating}
                    </div>
                    <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                    <span>{activeFilter === "All" ? item.area : "Nearby"}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
