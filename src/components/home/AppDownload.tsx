"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export function AppDownload() {
  const t = useTranslations("AppDownload");

  return (
    <section id="download" className="py-32 px-8 bg-background overflow-hidden scroll-mt-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
        <div className="lg:col-span-12 xl:col-span-6 space-y-12">
          <div className="space-y-6">
            <span className="font-body text-[10px] uppercase tracking-[0.4em] text-primary font-bold">{t("label")}</span>
            <h2 className="text-5xl md:text-7xl font-headline font-black italic tracking-tighter leading-[0.85] text-on-surface">
              {t("title")}
            </h2>
            <p className="text-xl text-slate-500 font-body italic max-w-xl leading-relaxed">
              {t("subtitle")}
            </p>
          </div>

          <div className="flex flex-wrap gap-8 items-center">
             <div className="group cursor-pointer">
                <Image src="/al_mahara_restaurant_1776785631205.png" alt="App Store" width={160} height={48} className="h-12 w-40 object-cover opacity-80 hover:opacity-100 transition-opacity rounded-lg" />
                <div className="mt-2 h-0.5 bg-primary w-0 group-hover:w-full transition-all duration-500"></div>
             </div>
             <div className="group cursor-pointer">
                <Image src="/al_mahara_restaurant_1776785631205.png" alt="Play Store" width={160} height={48} className="h-12 w-40 object-cover opacity-80 hover:opacity-100 transition-opacity rounded-lg" />
                <div className="mt-2 h-0.5 bg-primary w-0 group-hover:w-full transition-all duration-500"></div>
             </div>
          </div>

          <div className="pt-8 flex items-center gap-6">
             <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm">
                    <Image src="/chef_mohamad_orfali_replacement_1776785825172.png" alt="User" width={40} height={40} className="object-cover" />
                  </div>
                ))}
             </div>
             <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">{t("joinDiners")}</p>
          </div>
        </div>

        <div className="lg:col-span-12 xl:col-span-6 relative flex justify-center lg:justify-end">
          <div className="relative w-[340px] aspect-[1/2] rounded-[3.5rem] bg-zinc-900 border-[12px] border-zinc-800 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden scale-110 rotate-3 hover:rotate-0 transition-transform duration-1000 group">
             <Image src="/ossiano_restaurant_1776785646414.png" alt="App Preview" fill className="object-cover grayscale overlay transition-all duration-1000 group-hover:grayscale-0" sizes="340px" />
             <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"></div>
             <div className="absolute bottom-12 inset-x-8 text-white space-y-4">
                <h3 className="text-3xl font-headline font-black italic tracking-tighter leading-none">Ossiano <br /> Underwater.</h3>
                <button className="w-full bg-white text-primary py-3 rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-2xl">{t("bookNow")}</button>
             </div>
          </div>
          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-[150px] rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
