"use client";

import { InteractiveMap } from "@/components/ui/InteractiveMap";
import Image from "next/image";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";

export function CityMapSection() {
  const t = useTranslations("CityMapSection");

  const CLUSTERS = [
    { id: 1, name: t("areas.downtown"), count: 142, position: { lat: 25.2048, lng: 55.2708 } },
    { id: 2, name: t("areas.marina"), count: 98, position: { lat: 25.0772, lng: 55.1337 } },
    { id: 3, name: t("areas.difc"), count: 64, position: { lat: 25.2136, lng: 55.2811 } },
    { id: 4, name: t("areas.jbr"), count: 52, position: { lat: 25.0805, lng: 55.1386 } },
  ];

  return (
    <section id="map" className="py-24 lg:py-32 px-6 lg:px-16 bg-zinc-950 overflow-hidden relative scroll-mt-24">
      <div className="absolute inset-0 opacity-20">
         <Image
           src="/dubai_spatial_map_background_1776785841856.png"
           alt="Dubai Map Texture"
           fill
           className="object-cover grayscale"
           sizes="100vw"
         />
      </div>
      <div className="absolute top-0 right-0 w-[500px] h-full bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24 items-center relative z-10">
         <Reveal className="lg:col-span-12 xl:col-span-7 relative aspect-video bg-zinc-900 rounded-[3rem] lg:rounded-[5rem] border border-white/5 overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] group/map">
            <InteractiveMap markers={CLUSTERS} />

            <div className="absolute bottom-12 right-12 z-20">
               <Link href="/map" className="px-10 py-5 bg-primary text-white rounded-2xl font-headline font-black text-xs italic tracking-tight hover:bg-white hover:text-zinc-900 transition-all flex items-center gap-4 shadow-2xl group/btn">
                  {t("launch")}
                  <span className="material-symbols-outlined text-base group-hover/btn:translate-x-2 transition-transform">explore</span>
               </Link>
            </div>
         </Reveal>

         <Reveal className="lg:col-span-12 xl:col-span-5 space-y-12 lg:pl-12 stagger-1">
            <header className="space-y-8">
               <div className="flex items-center gap-6">
                  <span className="text-primary font-body text-[10px] font-black uppercase tracking-[0.6em] block">{t("label")}</span>
                  <div className="w-12 h-px bg-white/10"></div>
                  <span className="text-secondary font-body text-[10px] font-black uppercase tracking-[0.6em] block">{t("labelOfficial")}</span>
               </div>
               <h2 className="text-6xl md:text-8xl font-headline font-black italic tracking-tighter leading-[0.8] text-white">{t("title")}</h2>
               <p className="text-xl text-zinc-500 font-body italic leading-relaxed max-w-sm">
                  {t("subtitle")}
               </p>
            </header>

            <div className="grid grid-cols-2 gap-12 pt-12 border-t border-white/5">
                <div className="space-y-4">
                   <p className="text-4xl font-headline font-black italic text-white leading-none">12+</p>
                   <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600">{t("clusters")}</p>
                </div>
                <div className="space-y-4">
                   <p className="text-4xl font-headline font-black italic text-white leading-none">2.4k+</p>
                   <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600">{t("tables")}</p>
                </div>
            </div>

            <div className="pt-8 flex gap-2">
               <div className="w-8 h-1 bg-primary"></div>
               <div className="w-8 h-1 bg-secondary"></div>
               <div className="w-8 h-1 bg-white/20"></div>
               <div className="w-8 h-1 bg-zinc-800"></div>
            </div>
         </Reveal>
      </div>
    </section>
  );
}
