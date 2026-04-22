"use client";

import { Link } from "@/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";

interface Cuisine {
  name: string;
  count: number;
  slug: string;
  image: string;
}

interface Props {
  cuisines: Cuisine[];
}

export function CategoryGrid({ cuisines }: Props) {
  const t = useTranslations("CategoryGrid");

  return (
    <section id="categories" className="py-24 lg:py-32 px-6 lg:px-16 bg-slate-50 relative overflow-hidden scroll-mt-24">
      <div className="max-w-[1920px] mx-auto space-y-20 relative z-10">
        <Reveal>
          <header className="flex flex-col lg:flex-row justify-between items-end gap-12 pb-16 border-b border-slate-200">
             <div className="space-y-6">
                <div className="flex items-center gap-4">
                   <span className="text-secondary font-body text-[10px] font-black uppercase tracking-[0.6em] block">{t("label")}</span>
                   <div className="w-8 h-1 bg-primary"></div>
                </div>
                <h2 className="text-6xl md:text-8xl font-headline font-black italic tracking-tighter leading-none text-on-surface">{t("title")}</h2>
                <p className="text-xl text-slate-500 font-body italic leading-relaxed max-w-xl">
                   {t("subtitle")}
                </p>
             </div>
             <Link href="/cuisines" className="text-[10px] font-black uppercase tracking-[0.4em] text-primary border-b-2 border-primary/20 pb-2 hover:border-primary transition-all font-body">{t("viewAll")}</Link>
          </header>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
           {cuisines.map((cuisine, i) => (
             <Reveal 
               key={cuisine.slug} 
               className={`group aspect-[3/4] lg:aspect-square rounded-[3rem] lg:rounded-[4rem] overflow-hidden shadow-2xl hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.2)] transition-all duration-700 ${i === 0 ? 'stagger-1' : i === 1 ? 'stagger-2' : i === 2 ? 'stagger-3' : 'stagger-4'}`}
             >
                <Link href={`/cuisines/${cuisine.slug}`} className="block w-full h-full relative">
                  <Image
                    src={cuisine.image}
                    alt={cuisine.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-900/20 to-transparent group-hover:via-transparent transition-all"></div>
                  <div className="absolute bottom-12 left-12 right-12 text-white space-y-2 translate-y-4 group-hover:translate-y-0 transition-transform">
                     <h3 className="text-4xl lg:text-5xl font-headline font-black italic tracking-tighter">{cuisine.name}.</h3>
                     <div className="flex items-center gap-3">
                        <div className="w-6 h-px bg-primary"></div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-secondary group-hover:text-white transition-colors">{cuisine.count} {t("destinations")}</span>
                     </div>
                  </div>
                </Link>
             </Reveal>
           ))}
        </div>
      </div>
    </section>
  );
}
