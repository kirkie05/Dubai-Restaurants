"use client";

import { Link } from "@/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";

export function RestaurantList() {
  const t = useTranslations("RestaurantList");
  const tr = useTranslations("Restaurants");

  const TOP_PICKS = [
    {
      slug: "al-mahara",
      name: tr("al-mahara.name"),
      location: tr("al-mahara.location"),
      cuisine: tr("al-mahara.cuisine"),
      rating: tr("al-mahara.rating"),
      image: "/al_mahara_restaurant_1776785631205.png",
      description: tr("al-mahara.description")
    },
    {
      slug: "ossiano",
      name: tr("ossiano.name"),
      location: tr("ossiano.location"),
      cuisine: tr("ossiano.cuisine"),
      rating: tr("ossiano.rating"),
      image: "/ossiano_restaurant_1776785646414.png",
      description: tr("ossiano.description")
    },
    {
      slug: "tresind-studio",
      name: tr("tresind-studio.name"),
      location: tr("tresind-studio.location"),
      cuisine: tr("tresind-studio.cuisine"),
      rating: tr("tresind-studio.rating"),
      image: "/al_mahara_restaurant_1776785631205.png",
      description: tr("tresind-studio.description")
    }
  ];

  return (
    <section id="featured" className="py-24 lg:py-32 px-6 lg:px-16 bg-zinc-950 text-white overflow-hidden relative scroll-mt-24">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-r from-secondary/5 to-transparent pointer-events-none"></div>

      <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-32 items-center relative z-10">
         <div className="lg:col-span-5 xl:col-span-4 space-y-12 reveal-on-scroll">
            <header className="space-y-8">
               <div className="flex items-center gap-6">
                  <span className="text-primary font-body text-[10px] font-black uppercase tracking-[0.6em] block">{t("label")}</span>
                  <div className="w-12 h-px bg-white/10"></div>
                  <span className="text-secondary font-body text-[10px] font-black uppercase tracking-[0.6em] block">{t("labelVerified")}</span>
               </div>
               <h2 className="text-6xl md:text-8xl font-headline font-black italic tracking-tighter leading-[0.8] text-white">{t("title")}</h2>
               <p className="text-xl text-zinc-500 font-body italic leading-relaxed max-w-sm">
                  {t("subtitle")}
               </p>
            </header>
            <Link href="/restaurants" className="inline-flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.4em] text-primary border-b-2 border-primary/20 pb-2 hover:border-primary transition-all group font-body">
               {t("browseAll")}
               <span className="material-symbols-outlined text-base group-hover:translate-x-3 transition-transform">east</span>
            </Link>
         </div>

         <div className="lg:col-span-7 xl:col-span-8 space-y-8 lg:space-y-12">
            {TOP_PICKS.map((item, i) => (
              <Link key={item.slug} href={`/restaurant/${item.slug}`} className={`group flex flex-col md:flex-row items-center gap-12 p-10 bg-white/5 rounded-[4rem] border border-white/5 hover:border-primary/40 hover:bg-white/[0.07] transition-all duration-700 relative overflow-hidden reveal-on-scroll ${i === 0 ? 'stagger-1' : 'stagger-2'}`}>
                 <div className="relative w-full md:w-[320px] aspect-[4/3] rounded-[3rem] overflow-hidden shrink-0 shadow-2xl">
                    <Image src={item.image} alt={item.name} fill className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                    <div className="absolute top-6 left-6 bg-secondary text-white text-[8px] font-black px-4 py-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">{t("premiumBadge")}</div>
                 </div>
                 <div className="flex-grow space-y-6 text-center md:text-left">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                       <div>
                          <h3 className="text-4xl lg:text-5xl font-headline font-black italic tracking-tighter group-hover:text-primary transition-colors leading-none">{item.name}.</h3>
                          <div className="flex items-center justify-center md:justify-start gap-3 mt-3">
                             <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">{item.cuisine}</span>
                             <div className="w-1.5 h-1.5 rounded-full bg-primary/40"></div>
                             <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">{item.location}</span>
                          </div>
                       </div>
                       <div className="flex items-center justify-center md:justify-end gap-3 px-8 py-3 bg-zinc-900 rounded-2xl border border-white/10 shadow-2xl group-hover:border-secondary transition-colors">
                          <span className="material-symbols-outlined text-secondary text-base" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                          <span className="text-2xl font-headline font-black italic">{item.rating}</span>
                       </div>
                    </div>
                    <p className="text-sm lg:text-base text-zinc-500 font-body italic leading-relaxed max-w-xl">
                       {item.description}
                    </p>
                 </div>
              </Link>
            ))}
         </div>
      </div>
    </section>
  );
}
