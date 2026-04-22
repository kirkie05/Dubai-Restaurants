"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface Restaurant {
  slug: string;
  name: string;
  location: string;
  cuisine: string;
  rating: string;
  image: string;
}

interface Props {
  items: Restaurant[];
}

export function RestaurantGrid({ items }: Props) {
  const t = useTranslations("RestaurantGrid");

  return (
    <section id="other-restaurants" className="py-24 lg:py-32 px-6 lg:px-16 bg-white scroll-mt-24">
      <div className="max-w-[1920px] mx-auto space-y-16">
        <header className="flex flex-col md:flex-row justify-between items-end gap-6 border-l-4 border-primary pl-8">
          <div className="space-y-2">
            <h2 className="text-4xl md:text-6xl font-headline font-black italic tracking-tight text-on-surface">{t("title")}</h2>
            <p className="text-slate-400 font-body text-sm font-medium">{t("subtitle")}</p>
          </div>
          <Link href="/restaurants" className="text-[10px] font-black uppercase tracking-[0.4em] text-primary border-b-2 border-primary/20 pb-2 hover:border-primary transition-all font-body">{t("browseAll")}</Link>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {items.map((item) => (
            <Link key={item.slug} href={`/restaurant/${item.slug}`} className="group space-y-6">
              <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-700">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur px-3 py-1 rounded-sm text-[10px] font-black uppercase tracking-widest flex items-center gap-1 shadow-sm">
                   <span className="material-symbols-outlined text-sm text-primary" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                   {item.rating}
                </div>
              </div>
              <div className="space-y-2 px-2">
                <p className="text-primary font-body text-[10px] font-bold uppercase tracking-[0.3em]">{item.cuisine} · {item.location}</p>
                <h3 className="text-3xl font-headline font-black italic tracking-tighter text-on-surface group-hover:text-primary transition-colors leading-none">{item.name}.</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
