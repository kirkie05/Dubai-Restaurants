"use client";

import { Link } from "@/navigation";
import { ChefCard } from "@/components/ui/ChefCard";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";

export function ChefGrid() {
  const t = useTranslations("ChefGrid");
  const tc = useTranslations("Chefs");

  const TOP_CHEFS = [
    {
      slug: "himanshu-saini",
      name: tc("himanshu-saini.name"),
      role: tc("himanshu-saini.tag"),
      restaurant: "Tresind Studio",
      image: "/chef_himanshu_saini_portrait_1776787618375.png",
      stars: 2
    },
    {
      slug: "gregoire-berger",
      name: tc("gregoire-berger.name"),
      role: tc("gregoire-berger.tag"),
      restaurant: "Ossiano",
      image: "/chef_gregoire_berger_portrait_1776787634912.png",
      stars: 1
    },
    {
      slug: "mohamad-orfali",
      name: tc("mohamad-orfali.name"),
      role: tc("mohamad-orfali.tag"),
      restaurant: "Orfali Bros",
      image: "/chef_mohamad_orfali_replacement_1776785825172.png",
      stars: 1
    }
  ];

  return (
    <section id="chefs" className="py-24 lg:py-40 px-6 lg:px-16 bg-white relative overflow-hidden scroll-mt-24">
      <div className="absolute top-0 right-0 w-48 h-48 opacity-10 pointer-events-none">
         <div className="grid grid-cols-2 h-full">
            <div className="bg-primary"></div>
            <div className="bg-secondary"></div>
            <div className="bg-white border border-slate-100"></div>
            <div className="bg-zinc-950"></div>
         </div>
      </div>

      <div className="max-w-[1920px] mx-auto relative z-10">
        <Reveal>
          <header className="relative flex flex-col xl:flex-row justify-between items-start xl:items-end gap-16 mb-32 pb-16 border-b border-slate-100">
             <div className="space-y-10 max-w-4xl">
                <div className="flex items-center gap-6">
                   <span className="text-primary font-body text-[10px] font-black uppercase tracking-[0.6em] block whitespace-nowrap">{t("label")}</span>
                   <div className="w-16 h-px bg-slate-200"></div>
                   <span className="text-secondary font-body text-[10px] font-black uppercase tracking-[0.6em] block whitespace-nowrap">{t("labelVerified")}</span>
                </div>

                <div className="space-y-4">
                   <h2 className="text-7xl md:text-9xl font-headline font-black italic tracking-tighter leading-[0.8] text-on-surface">
                      {t("title")}
                   </h2>
                   <p className="text-2xl text-slate-500 font-body italic leading-relaxed max-w-2xl">
                      {t("subtitle")}
                   </p>
                </div>
             </div>

             <div className="shrink-0 pb-4">
               <Link href="/chefs" className="group relative text-[11px] font-black uppercase tracking-[0.4em] text-primary transition-all font-body flex items-center gap-5 bg-zinc-950 px-10 py-6 rounded-3xl shadow-2xl hover:bg-primary hover:text-white hover:-translate-y-2">
                  <span className="relative z-10">{t("meetAll")}</span>
                  <span className="material-symbols-outlined text-lg relative z-10 group-hover:translate-x-3 transition-transform">arrow_forward</span>
               </Link>
             </div>
          </header>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-24">
           {TOP_CHEFS.map((chef, i) => (
             <Reveal 
               key={chef.slug} 
               className={`relative ${i === 0 ? 'stagger-1' : i === 1 ? 'stagger-2' : i === 2 ? 'stagger-3' : ''}`}
             >
                <ChefCard {...chef} />
                <div className="absolute -top-6 -right-6 bg-secondary text-white text-[9px] font-black px-6 py-2.5 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.3)] z-20 hidden md:block">
                   {t("verifiedBadge")}
                </div>
             </Reveal>
           ))}
        </div>
      </div>
    </section>
  );
}
