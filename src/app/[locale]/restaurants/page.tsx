import { Link } from '@/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { getTranslations } from 'next-intl/server';
import { RestaurantDirectory } from '@/components/restaurants/RestaurantDirectory';

export default async function RestaurantListing({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'RestaurantListing' });
  const tr = await getTranslations({ locale, namespace: 'Restaurants' });

  const LISTING_ITEMS = [
    {
      slug: "al-mahara",
      name: tr("al-mahara.name"),
      image: "/al_mahara_restaurant_1776785631205.png",
      rating: tr("al-mahara.rating"),
      cuisine: tr("al-mahara.cuisine"),
      price: tr("al-mahara.price"),
      location: tr("al-mahara.location"),
      description: tr("al-mahara.description"),
      badge: tr("al-mahara.badge")
    },
    {
      slug: "nobu-dubai",
      name: tr("nobu-dubai.name"),
      image: "/cuisine_japanese_high_fidelity_1776785722454.png",
      rating: tr("nobu-dubai.rating"),
      cuisine: tr("nobu-dubai.cuisine"),
      price: tr("nobu-dubai.price"),
      location: tr("nobu-dubai.location"),
      description: tr("nobu-dubai.description"),
      badge: tr("nobu-dubai.badge")
    },
    {
      slug: "ossiano",
      name: tr("ossiano.name"),
      image: "/ossiano_restaurant_1776785646414.png",
      rating: tr("ossiano.rating"),
      cuisine: tr("ossiano.cuisine"),
      price: tr("ossiano.price"),
      location: tr("ossiano.location"),
      description: tr("ossiano.description"),
      badge: tr("ossiano.badge")
    },
    {
      slug: "tresind-studio",
      name: tr("tresind-studio.name"),
      image: "/cuisine_indian_high_fidelity_1776785772426.png",
      rating: tr("tresind-studio.rating"),
      cuisine: tr("tresind-studio.cuisine"),
      price: tr("tresind-studio.price"),
      location: tr("tresind-studio.location"),
      description: tr("tresind-studio.description"),
      badge: tr("tresind-studio.badge")
    },
    {
      slug: "zuma",
      name: tr("zuma.name"),
      image: "/cuisine_japanese_high_fidelity_1776785722454.png",
      rating: tr("zuma.rating"),
      cuisine: tr("zuma.cuisine"),
      price: tr("zuma.price"),
      location: tr("zuma.location"),
      description: tr("zuma.description"),
      badge: tr("zuma.badge")
    },
    {
      slug: "primos-pizza",
      name: tr("primos-pizza.name"),
      image: "/primos_pizza_restaurant_1776785706161.png",
      rating: tr("primos-pizza.rating"),
      cuisine: tr("primos-pizza.cuisine"),
      price: tr("primos-pizza.price"),
      location: tr("primos-pizza.location"),
      description: tr("primos-pizza.description"),
      badge: tr("primos-pizza.badge")
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-on-surface">
      <Navbar />
      
      <main className="pt-32 pb-20">
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
             <div className="flex items-center gap-4 bg-zinc-900 text-white p-2 rounded-2xl shadow-2xl">
                <button className="px-8 py-4 bg-primary rounded-xl font-black text-[10px] uppercase tracking-widest">{t('listView')}</button>
                <Link href="/map" className="px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">{t('mapView')}</Link>
             </div>
          </div>
        </header>

        <section className="max-w-[1920px] mx-auto px-8 lg:px-16">
           <RestaurantDirectory items={LISTING_ITEMS} />
        </section>

        <section className="mt-48 max-w-[1920px] mx-auto px-8 lg:px-16">
          <div className="bg-zinc-900 rounded-[4rem] p-12 md:p-32 relative overflow-hidden flex flex-col md:flex-row items-center gap-24">
             <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/20 to-transparent p-20 flex items-center justify-center">
                <span className="material-symbols-outlined text-[400px] text-white opacity-5 select-none">lifestyle</span>
             </div>
             <div className="md:w-1/2 space-y-12 z-10">
                <div className="space-y-4">
                   <p className="text-primary font-body text-[10px] font-black uppercase tracking-[0.4em]">{t('partnerLabel')}</p>
                   <h2 className="text-5xl md:text-7xl font-headline font-black italic tracking-tighter text-white leading-none">{t('partnerTitle').split(' ').slice(0, 2).join(' ')} <br />{t('partnerTitle').split(' ').slice(2).join(' ')}</h2>
                   <p className="text-zinc-500 font-body text-xl italic leading-relaxed">
                      {t('partnerSubtitle')}
                   </p>
                </div>
                <Link href="/partner/registration" className="inline-block bg-white text-zinc-900 px-12 py-6 rounded-2xl font-headline font-black text-xl italic hover:bg-primary hover:text-white transition-all shadow-2xl">
                   {t('applyNow')}
                </Link>
             </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
