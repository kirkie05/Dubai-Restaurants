import Image from "next/image";
import { Link } from "@/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getTranslations } from "next-intl/server";

export default async function ChefListing({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ChefListing' });
  const tc = await getTranslations({ locale, namespace: 'Chefs' });

  const CHEFS = [
    {
      slug: "himanshu-saini",
      name: tc("himanshu-saini.name"),
      role: tc("himanshu-saini.role"),
      restaurant: tc("himanshu-saini.restaurant"),
      quote: tc("himanshu-saini.quote"),
      image: "/chef_himanshu_saini_portrait_1776787618375.png",
      stars: 2
    },
    {
      slug: "gregoire-berger",
      name: tc("gregoire-berger.name"),
      role: tc("gregoire-berger.role"),
      restaurant: tc("gregoire-berger.restaurant"),
      quote: tc("gregoire-berger.quote"),
      image: "/chef_gregoire_berger_portrait_1776787634912.png",
      stars: 1
    },
    {
       slug: "mohamad-orfali",
       name: tc("mohamad-orfali.name"),
       role: tc("mohamad-orfali.role"),
       restaurant: tc("mohamad-orfali.restaurant"),
       quote: tc("mohamad-orfali.quote"),
       image: "/chef_orfali_1776785746765.png",
       stars: 1
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 min-h-screen">
        <header className="max-w-[1920px] mx-auto px-8 lg:px-16 mb-32">
          <div className="flex flex-col lg:flex-row items-end justify-between gap-16 pb-16 border-b border-slate-100">
             <div className="space-y-6 max-w-4xl">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">{t('label')}</span>
                <h1 className="text-6xl md:text-9xl font-headline font-black italic tracking-tighter leading-[0.85] text-on-surface">
                   {t('title').split(' ')[0]} <br /><span className="text-primary">{t('title').split(' ')[1]}</span>
                </h1>
                <p className="text-xl text-slate-500 font-body italic leading-relaxed max-w-xl">
                   {t('subtitle')}
                </p>
             </div>
             <div className="flex items-center gap-10">
                <div className="flex flex-col items-end">
                   <span className="text-4xl font-headline font-black italic">140+</span>
                   <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">{t('verifiedLabel')}</span>
                </div>
                <div className="w-px h-12 bg-slate-200"></div>
                <div className="flex flex-col items-start px-8 py-4 bg-zinc-900 rounded-2xl text-white">
                   <span className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">{t('featuredLabel')}</span>
                   <span className="font-headline font-black italic text-xl">{t('featuredTitle')}</span>
                </div>
             </div>
          </div>
        </header>

        <section className="max-w-[1920px] mx-auto px-8 lg:px-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
           {CHEFS.map((chef) => (
             <Link key={chef.slug} href={`/chefs/${chef.slug}`} className="group flex flex-col space-y-6">
                <div className="relative aspect-[3/4] overflow-hidden rounded-[2.5rem] bg-slate-50 border border-slate-50 shadow-sm transition-all duration-700 hover:shadow-2xl">
                   <Image 
                     src={chef.image} 
                     alt={chef.name} 
                     fill 
                     className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                   />
                   <div className="absolute top-8 left-8 flex gap-2">
                      {[...Array(chef.stars)].map((_, i) => (
                        <span key={i} className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center border-2 border-white shadow-xl">
                           <span className="material-symbols-outlined text-[10px] font-black" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                        </span>
                      ))}
                   </div>
                   <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div className="space-y-3 px-2">
                   <p className="text-primary font-body text-[10px] font-black uppercase tracking-[0.3em]">{chef.role}</p>
                   <h2 className="text-4xl font-headline font-black italic tracking-tighter text-on-surface group-hover:text-primary transition-colors">{chef.name}</h2>
                   <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                      <span>{chef.restaurant}</span>
                      <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                      <span>{t('discoverProfile')}</span>
                   </div>
                </div>
             </Link>
           ))}
        </section>

        <section className="mt-48 max-w-[1920px] mx-auto px-8 lg:px-16 pb-40">
           <div className="grid grid-cols-1 md:grid-cols-12 gap-24 items-center">
              <div className="md:col-span-12 lg:col-span-8 flex flex-col md:flex-row gap-16 items-center">
                 <div className="relative w-full aspect-video rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white skew-y-1">
                    <Image src="/cuisine_indian_high_fidelity_1776785772426.png" alt="Culinary Workshop" fill className="object-cover" />
                 </div>
                 <div className="lg:w-2/3 space-y-8">
                    <span className="text-primary font-body text-[10px] font-black uppercase tracking-[0.3em] block">{t('journalLabel')}</span>
                    <h2 className="text-4xl md:text-6xl font-headline font-black italic tracking-tighter leading-[0.9]">{t('journalTitle').split(' ').slice(0, 2).join(' ')} <br />{t('journalTitle').split(' ').slice(2).join(' ')}</h2>
                    <p className="text-slate-500 font-body text-xl italic leading-relaxed">
                       {t('journalSubtitle')}
                    </p>
                    <button className="bg-zinc-900 text-white px-10 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-2xl hover:bg-primary transition-all">{t('exploreJournal')}</button>
                 </div>
              </div>
           </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
