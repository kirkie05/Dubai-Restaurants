import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default async function BookingPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const restaurant = {
    name: "Al-Maha Crystal Lounge",
    cuisine: "Modern Levantine",
    location: "Downtown Dubai",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBScFTU5wYXxlVQjth8aCZ9LedSVLqxxLEusO3iFznSTrSTlnuSzIMdLWcLYRZ3ZqEs_8NNkhMJ5yDxOTrhA6W-3iQ-UlgnPVDta3m_5S0r9FXRxl5eYl51pYc6k_v4WOrw2QRehEqr-plNlZmxnL9Bm6jQrKrx2ZXNg6O-d_Xz9f_663knA_6A14-2v8uPGHgf6THAkwEDT0FCetS7861RoHJVSeqdCZqMBkS0wvscF6KUR8YO7rcjnipDAP3bgIdAmipuPo2l6FzQ"
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 px-8 lg:px-16 max-w-[1920px] mx-auto w-full flex flex-col lg:flex-row gap-24 items-start">
        {/* Reservation Engine */}
        <div className="flex-grow space-y-20 z-10">
           <header className="space-y-6">
              <span className="text-primary font-body text-[10px] font-black uppercase tracking-[0.4em] block">Secure Your Presence</span>
              <h1 className="text-6xl md:text-9xl font-headline font-black italic tracking-tighter leading-none text-on-surface">
                 The <br /><span className="text-zinc-400">Reservation.</span>
              </h1>
              <p className="text-xl text-slate-500 font-body italic leading-relaxed max-w-xl">
                 Experience the architecture of flavor at **{restaurant.name}**. Finalize your placement below.
              </p>
           </header>

           <div className="space-y-16">
              <section className="space-y-12">
                 <div className="flex items-center gap-8">
                    <h2 className="text-2xl font-headline font-black italic text-on-surface">01. Identity</h2>
                    <div className="flex-grow h-px bg-slate-100"></div>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-4">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Guest Name</label>
                       <input type="text" placeholder="ALEXANDRA VANE" className="w-full bg-transparent border-b border-slate-200 py-4 font-headline font-black italic text-2xl placeholder:text-slate-200 focus:border-primary outline-none transition-all" />
                    </div>
                    <div className="space-y-4">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Communication</label>
                       <input type="email" placeholder="A.VANE@CURATOR.COM" className="w-full bg-transparent border-b border-slate-200 py-4 font-headline font-black italic text-2xl placeholder:text-slate-200 focus:border-primary outline-none transition-all" />
                    </div>
                 </div>
              </section>

              <section className="space-y-12">
                 <div className="flex items-center gap-8">
                    <h2 className="text-2xl font-headline font-black italic text-on-surface">02. Special Occasion</h2>
                    <div className="flex-grow h-px bg-slate-100"></div>
                 </div>
                 <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Notes for the Maître d&apos;</label>
                    <textarea placeholder="EDITORIAL SEATING PREFERRED. ANY ALLERGIES OR CELEBRATIONS?" className="w-full bg-transparent border-b border-slate-200 py-4 font-body italic text-lg placeholder:text-slate-200 focus:border-primary outline-none transition-all resize-none h-32" />
                 </div>
              </section>

              <div className="pt-12">
                 <button className="bg-zinc-900 text-white px-16 py-8 rounded-[2rem] font-headline font-black text-2xl italic tracking-tight shadow-2xl hover:bg-primary transition-all group flex items-center gap-6">
                    Confirm Selection
                    <span className="material-symbols-outlined group-hover:translate-x-4 transition-transform">east</span>
                 </button>
                 <p className="mt-8 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">By proceeding, you agree to our curated booking manifestos.</p>
              </div>
           </div>
        </div>

        {/* Summary Side Desk */}
        <aside className="w-full lg:w-[480px] shrink-0 lg:sticky lg:top-32 bg-white rounded-[3rem] border border-slate-50 shadow-2xl overflow-hidden animate-float">
           <div className="relative aspect-[4/3]">
              <Image src={restaurant.image} alt="Summary" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent"></div>
              <div className="absolute bottom-8 left-8">
                 <span className="text-primary font-body text-[8px] font-black uppercase tracking-[0.4em] mb-1 block">Your Destination</span>
                 <p className="text-white font-headline font-black italic text-3xl tracking-tighter">{restaurant.name}.</p>
              </div>
           </div>
           
           <div className="p-12 space-y-10">
              <div className="space-y-8">
                 <div className="flex justify-between items-start group">
                    <div>
                       <span className="text-[9px] font-black uppercase tracking-widest text-slate-300">Arrival</span>
                       <p className="text-xl font-headline font-black italic mt-1 text-on-surface">Saturday, Nov 24</p>
                    </div>
                    <span className="material-symbols-outlined text-primary">calendar_month</span>
                 </div>
                 <div className="flex justify-between items-start group">
                    <div>
                       <span className="text-[9px] font-black uppercase tracking-widest text-slate-300">Time / Seats</span>
                       <p className="text-xl font-headline font-black italic mt-1 text-on-surface">20:30 · 2 Guests</p>
                    </div>
                    <span className="material-symbols-outlined text-primary">group</span>
                 </div>
              </div>

              <div className="pt-10 border-t border-slate-50 space-y-4">
                 <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                    <span className="text-slate-400">Booking Fee</span>
                    <span className="text-on-surface">AED 50.00</span>
                 </div>
                 <div className="flex justify-between text-lg font-headline font-black italic pt-2 border-t border-slate-100">
                    <span className="text-on-surface">Total Due</span>
                    <span className="text-primary">AED 50.00</span>
                 </div>
              </div>
           </div>
        </aside>
      </main>
      
      <Footer />
    </div>
  );
}
