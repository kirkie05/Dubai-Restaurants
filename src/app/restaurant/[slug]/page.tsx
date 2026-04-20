import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function RestaurantDetail({ params }: { params: { slug: string } }) {
  const restaurant = {
    name: "Al-Maha Crystal Lounge",
    description: "An avant-garde exploration of Levantine flavors, elevated by panoramic skyline views and architectural precision.",
    longDescription: "Designed by award-winning architects, the lounge features a seamless flow between indoor opulence and an outdoor terrace that seems to float above the city lights. Every detail, from the hand-blown crystal fixtures to the bespoke velvet furnishings, has been curated to create an atmosphere of effortless luxury.",
    cuisine: "Modern Levantine",
    price: "AED 600+",
    rating: "4.9",
    reviewsCount: "1,240",
    chef: "Chef Marcus Vane",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBScFTU5wYXxlVQjth8aCZ9LedSVLqxxLEusO3iFznSTrSTlnuSzIMdLWcLYRZ3ZqEs_8NNkhMJ5yDxOTrhA6W-3iQ-UlgnPVDta3m_5S0r9FXRxl5eYl51pYc6k_v4WOrw2QRehEqr-plNlZmxnL9Bm6jQrKrx2ZXNg6O-d_Xz9f_663knA_6A14-2v8uPGHgf6THAkwEDT0FCetS7861RoHJVSeqdCZqMBkS0wvscF6KUR8YO7rcjnipDAP3bgIdAmipuPo2l6FzQ"
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 min-h-screen">
        {/* Immersive Hero Section */}
        <section className="relative h-[90vh] w-full overflow-hidden">
          <Image 
            src={restaurant.image}
            alt={restaurant.name}
            fill
            className="object-cover scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/20 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 w-full px-8 lg:px-16 pb-20 max-w-[1920px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-12">
            <div className="max-w-4xl space-y-8 z-10">
              <div className="flex flex-wrap items-center gap-4">
                <span className="bg-primary text-white px-4 py-1.5 rounded-sm text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl">Michelin Recommended</span>
                <span className="bg-white/10 backdrop-blur-xl border border-white/20 text-white px-4 py-1.5 rounded-sm text-[10px] font-black uppercase tracking-[0.3em]">Open Until 02:00</span>
              </div>
              
              <div className="space-y-4">
                <h1 className="text-white font-headline text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] italic">
                  {restaurant.name}
                </h1>
                <p className="text-zinc-300 text-xl font-body italic max-w-2xl leading-relaxed">
                  {restaurant.description}
                </p>
              </div>

              <div className="flex items-center gap-8 pt-4">
                 <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase text-zinc-500 tracking-[0.3em] mb-2">Curation Score</span>
                    <div className="flex items-center gap-2 text-primary">
                       <span className="text-3xl font-headline font-black italic">{restaurant.rating}</span>
                       <div className="flex">
                         {[1,2,3,4,5].map(i => (
                           <span key={i} className="material-symbols-outlined text-sm" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                         ))}
                       </div>
                    </div>
                 </div>
                 <div className="w-px h-12 bg-white/10"></div>
                 <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase text-zinc-500 tracking-[0.3em] mb-2">Pricing</span>
                    <span className="text-white font-headline font-bold text-xl italic">{restaurant.price}</span>
                 </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-6 z-10 min-w-[320px]">
              <Link href={`/book/${params.slug}`} className="bg-white text-zinc-900 px-12 py-6 rounded-xl font-headline font-black text-xl tracking-tight shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-4 group">
                Reserve a Table
                <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">arrow_right_alt</span>
              </Link>
              <div className="flex gap-4">
                <Link href={`/restaurant/${params.slug}/menu`} className="flex-1 bg-white/5 backdrop-blur-xl border border-white/10 text-white py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/20 transition-all text-center">View Menu</Link>
                <Link href={`/restaurant/${params.slug}/gallery`} className="flex-1 bg-white/5 backdrop-blur-xl border border-white/10 text-white py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/20 transition-all text-center">Gallery</Link>
              </div>
            </div>
          </div>
        </section>

        {/* The Curation Story */}
        <section className="py-32 px-8 lg:px-16 max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-24 items-center">
          <div className="md:col-span-6 space-y-12">
            <div className="space-y-6">
              <span className="text-primary font-body text-[10px] font-black uppercase tracking-[0.4em] block">The Editorial Board</span>
              <h2 className="font-headline text-5xl md:text-7xl font-black text-on-surface leading-none tracking-tighter italic">The Atmosphere.</h2>
              <p className="text-slate-500 font-body text-xl italic leading-relaxed">
                {restaurant.longDescription}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-12">
               <div className="space-y-4">
                  <span className="material-symbols-outlined text-primary">restaurant</span>
                  <h4 className="font-headline font-black text-xl italic">The Table.</h4>
                  <p className="text-slate-400 text-sm italic font-body">Hand-crafted ceramic dinnerware and linen settings tailored for this specific venue.</p>
               </div>
               <div className="space-y-4">
                  <span className="material-symbols-outlined text-primary">music_note</span>
                  <h4 className="font-headline font-black text-xl italic">The Vybe.</h4>
                  <p className="text-slate-400 text-sm italic font-body">A curated acoustic landscape blending deep house with traditional Levantine instrumentation.</p>
               </div>
            </div>
          </div>

          <div className="md:col-span-6 relative">
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden border-8 border-slate-50 shadow-2xl animate-float">
               <Image 
                 src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdc7lSbzK-fWgtbQ-W888RdtZBVq36fh9OOdQc-kQctlbMo4uKOnTbs3qwkHCa4UNABdMhkKh4U805FJ8rXVL273eZ18qrg7vR7UzsV2d7uc6WuMkTXwNIbFz4RNFpFmXrqkUuKybw9jAF9YO5X4jh8lousBzZbvjDOsM8jR1FXEoh7-cOuSfOmPhYll5FamukRMp8YjMnGYy5AL2K9ijjf1mGrYQHkdIHw4LXwVRY2OEc-8kAc0V9I0vdrmKxYKaPGU5HBXY49TRq" 
                 alt="Atmosphere" 
                 fill 
                 className="object-cover" 
               />
            </div>
          </div>
        </section>

        {/* Signature Highlights */}
        <section className="py-32 bg-zinc-900 text-white">
           <div className="px-8 lg:px-16 max-w-[1920px] mx-auto space-y-20">
              <div className="flex flex-col md:flex-row justify-between items-end gap-8 border-l-4 border-primary pl-8">
                 <div className="space-y-2">
                    <h2 className="font-headline text-5xl md:text-7xl font-black italic tracking-tighter">Signature Dishes.</h2>
                    <p className="text-zinc-500 font-body text-sm font-medium italic uppercase tracking-widest">Selected by Chef Marcus Vane</p>
                 </div>
                 <Link href={`/restaurant/${params.slug}/menu`} className="text-primary font-body text-[10px] font-black uppercase tracking-[0.3em] border-b border-primary/20 hover:border-primary transition-all pb-1 mb-2">Explore Full Menu</Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                 {[
                   { name: "Saffron Crystal Scallop", desc: "Hand-dived scallops with a high-clarity saffron infusion.", id: "1" },
                   { name: "Levantine Lamb Rack", desc: "12-hour slow braise with a pomegranate glaze.", id: "2" },
                   { name: "The Gold Leaf Baklava", desc: "24k gold leaf accent with pistachio cream.", id: "3" }
                 ].map(dish => (
                   <article key={dish.id} className="group space-y-6 cursor-pointer">
                      <div className="relative aspect-video rounded-2xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-1000">
                         <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUtWuDKOglxmhwkLGfkr7t9r-5VPlKDaXA0ZeC_VunLqhIjzXj9ERY19lo_h2EuBaU3QAfdmWb6DCqU-YM7myLuy4lhzJVtx3UIUtG8EKFPdR1AbSXdB40K4dmbdTToXKIHbHlD6DWNYGTgV-vAW25Xl1PVGlMeODOiMxBjM5e3MnfXzAoCWFDSLr70vRT1ROrlOfzIqnHAVE7l0FZaSzDIwK8AYlhkloK1JLO5q3Ya2gOOYKNP8hOpZwDlem8IO55mDYSJ2w52_m8" alt={dish.name} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                      </div>
                      <div className="space-y-2">
                         <h4 className="font-headline text-3xl font-black italic group-hover:text-primary transition-colors">{dish.name}</h4>
                         <p className="text-zinc-500 font-body text-sm italic">{dish.desc}</p>
                      </div>
                   </article>
                 ))}
              </div>
           </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
