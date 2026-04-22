"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

const TRENDING_MOCK = [
  { id: 1, name: "Dean's Cheesecake", rating: 4.8, type: "Bakery", location: "DIFC, Dubai", image: "/deans_cheesecake_1776785663897.png" },
  { id: 2, name: "Primo's Pizza & Grill", rating: 4.6, type: "Italian", location: "Marina, Dubai", image: "/primos_pizza_restaurant_1776785706161.png" },
  { id: 3, name: "Tijuana Flare", rating: 4.9, type: "Mexican", location: "Downtown, Dubai", image: "/tijuana_flare_restaurant_1776785691604.png" }
];

export function TrendingCarousel() {
  const t = useTranslations("TrendingCarousel");

  const TRENDING_MOCK = [
    { id: "deans-cheesecake", name: t("items.deans.name"), rating: 4.8, type: t("items.deans.type"), location: t("items.deans.location"), image: "/deans_cheesecake_1776785663897.png" },
    { id: "primos-pizza", name: t("items.primos.name"), rating: 4.6, type: t("items.primos.type"), location: t("items.primos.location"), image: "/primos_pizza_restaurant_1776785706161.png" },
    { id: "tijuana-flare", name: t("items.tijuana.name"), rating: 4.9, type: t("items.tijuana.type"), location: t("items.tijuana.location"), image: "/tijuana_flare_restaurant_1776785691604.png" }
  ];

  return (
    <section className="py-24 px-8 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-l-4 border-primary pl-8">
          <div className="space-y-2">
            <h2 className="text-4xl font-headline font-black italic tracking-tight text-on-surface">{t("title")}</h2>
            <p className="text-slate-400 font-body text-sm font-medium">{t("subtitle")}</p>
          </div>
          <div className="flex gap-4">
             <button className="w-12 h-12 rounded-full border border-slate-100 flex items-center justify-center text-slate-300 hover:border-primary hover:text-primary transition-all">
                <span className="material-symbols-outlined">west</span>
             </button>
             <button className="w-12 h-12 rounded-full border border-slate-100 flex items-center justify-center text-slate-300 hover:border-primary hover:text-primary transition-all">
                <span className="material-symbols-outlined">east</span>
             </button>
          </div>
        </div>

        <div className="flex gap-8 overflow-x-auto pb-8 hide-scrollbar snap-x">
          {TRENDING_MOCK.map((item) => (
            <div key={item.id} className="min-w-[320px] md:min-w-[400px] snap-start group bg-slate-50 p-4 rounded-xl border border-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
               <div className="relative aspect-video rounded-lg overflow-hidden mb-6">
                  <Image 
                    src={item.image} 
                    alt={item.name} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-1000" 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-3 py-1 rounded-sm text-[10px] font-black uppercase tracking-widest flex items-center gap-1 shadow-sm">
                     <span className="material-symbols-outlined text-sm text-primary" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                     {item.rating}
                  </div>
               </div>
               <div className="space-y-4">
                  <div className="flex justify-between items-start">
                     <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">{item.type}</p>
                        <h4 className="text-2xl font-headline font-black text-on-surface italic">{item.name}</h4>
                        <div className="flex items-center gap-2 text-slate-400 text-xs mt-1">
                           <span className="material-symbols-outlined text-xs">location_on</span>
                           {item.location}
                        </div>
                     </div>
                     <Link href={`/restaurant/${item.id}`} className="bg-primary text-white p-3 rounded-lg hover:scale-110 transition-all shadow-lg">
                        <span className="material-symbols-outlined text-sm">arrow_outward</span>
                     </Link>
                  </div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
