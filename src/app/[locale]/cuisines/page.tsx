import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Image from "next/image";
import { Link } from "@/navigation";
import { getTranslations } from 'next-intl/server';

export default async function CuisinesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Cuisines' });
  const dt = await getTranslations({ locale, namespace: 'Data' });

  const ALL_CUISINES = [
    { name: dt("cuisines.italian"), count: 142, slug: "italian", image: "/cuisine_italian_high_fidelity_1776785759860.png", description: t("items.italian") },
    { name: dt("cuisines.japanese"), count: 89, slug: "japanese", image: "/cuisine_japanese_high_fidelity_1776785722454.png", description: t("items.japanese") },
    { name: dt("cuisines.indian"), count: 112, slug: "indian", image: "/cuisine_indian_high_fidelity_1776785772426.png", description: t("items.indian") },
    { name: dt("cuisines.lebanese"), count: 76, slug: "lebanese", image: "/cuisine_lebanese_high_fidelity_1776785787411.png", description: t("items.lebanese") },
    { name: dt("cuisines.french"), count: 45, slug: "french", image: "/ossiano_restaurant_1776785646414.png", description: t("items.french") },
    { name: dt("cuisines.mexican"), count: 38, slug: "mexican", image: "/tijuana_flare_restaurant_1776785691604.png", description: t("items.mexican") },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <header className="max-w-[1920px] mx-auto px-8 lg:px-16 mb-24">
          <div className="flex flex-col lg:flex-row items-end justify-between gap-16 pb-16 border-b border-slate-100">
             <div className="space-y-6 max-w-4xl">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">{t('label')}</span>
                <h1 className="text-6xl md:text-9xl font-headline font-black italic tracking-tighter leading-[0.85] text-on-surface">
                   {t('title').split(' ')[0]} <br /><span className="text-zinc-400">{t('title').split(' ')[1]}</span>
                </h1>
                <p className="text-xl text-slate-500 font-body italic leading-relaxed max-w-xl">
                   {t('subtitle')}
                </p>
             </div>
             <div className="flex items-center gap-10">
                <div className="flex flex-col items-end">
                   <span className="text-4xl font-headline font-black italic">24+</span>
                   <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">{t('traditionsLabel')}</span>
                </div>
                <div className="w-px h-12 bg-slate-200"></div>
                <div className="flex flex-col items-start px-8 py-4 bg-zinc-900 rounded-2xl text-white">
                   <span className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">{t('editorPick')}</span>
                   <span className="font-headline font-black italic text-xl">{t('featuredStory')}</span>
                </div>
             </div>
          </div>
        </header>

        <section className="max-w-[1920px] mx-auto px-8 lg:px-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
           {ALL_CUISINES.map((cuisine, i) => (
             <Link key={cuisine.slug} href={`/cuisines/${cuisine.slug}`} className="group space-y-8 reveal-on-scroll">
                <div className="relative aspect-[16/10] overflow-hidden rounded-[3rem] bg-slate-50 border border-slate-100 shadow-2xl transition-all duration-700 hover:shadow-primary/10">
                   <Image 
                     src={cuisine.image} 
                     alt={cuisine.name} 
                     fill 
                     className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 to-transparent"></div>
                   <div className="absolute bottom-8 right-8">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-zinc-900 shadow-xl group-hover:bg-primary group-hover:text-white transition-all">
                         <span className="material-symbols-outlined text-sm">east</span>
                      </div>
                   </div>
                </div>
                <div className="space-y-3 px-4">
                   <div className="flex items-center gap-4">
                      <h2 className="text-4xl font-headline font-black italic tracking-tighter text-on-surface group-hover:text-primary transition-colors">{cuisine.name}.</h2>
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-300">{cuisine.count} Destinations</span>
                   </div>
                   <p className="text-sm text-slate-500 font-body italic leading-relaxed max-w-sm">
                      {cuisine.description}
                   </p>
                </div>
             </Link>
           ))}
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
