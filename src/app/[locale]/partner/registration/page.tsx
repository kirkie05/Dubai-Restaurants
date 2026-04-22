import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function PartnerRegistration() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-900 text-white">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-40 px-8 lg:px-16 max-w-[1920px] mx-auto w-full">
        <header className="mb-24 space-y-6">
           <span className="text-primary font-body text-[10px] font-black uppercase tracking-[0.6em] block">Partner Onboarding</span>
           <h1 className="text-6xl md:text-9xl font-headline font-black italic tracking-tighter leading-[0.85]">
              The <br /><span className="text-zinc-700">Application.</span>
           </h1>
           <p className="text-xl text-zinc-400 font-body italic leading-relaxed max-w-xl">
              Elevate your venue to the city&apos;s most exclusive gastronomic repository. Apply for a curated listing.
           </p>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
           <div className="lg:col-span-12 xl:col-span-8">
              <form className="space-y-16">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div className="space-y-4">
                       <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Venue Identity</label>
                       <input type="text" placeholder="RESTAURANT NAME" className="w-full bg-transparent border-b-2 border-zinc-800 py-6 font-headline font-black italic text-3xl placeholder:text-zinc-800 focus:border-primary outline-none transition-all" />
                    </div>
                    <div className="space-y-4">
                       <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Location Protocol</label>
                       <input type="text" placeholder="DOWNTOWN / DIFC / PALM" className="w-full bg-transparent border-b-2 border-zinc-800 py-6 font-headline font-black italic text-3xl placeholder:text-zinc-800 focus:border-primary outline-none transition-all" />
                    </div>
                 </div>

                 <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Cuisine Archetype</label>
                    <select className="w-full bg-transparent border-b-2 border-zinc-800 py-6 font-headline font-black italic text-3xl outline-none appearance-none cursor-pointer text-zinc-400">
                       <option>Fine Dining Fusion</option>
                       <option>Traditional Heritage</option>
                       <option>Avant-Garde</option>
                       <option>Artisan Bistro</option>
                    </select>
                 </div>

                 <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Narrative Summary</label>
                    <textarea placeholder="DESCRIBE THE ATMOSPHERE & ARCHITECTURAL ETHOS..." className="w-full bg-transparent border-b-2 border-zinc-800 py-6 font-body italic text-2xl placeholder:text-zinc-800 focus:border-primary outline-none transition-all resize-none h-40" />
                 </div>

                 <button className="bg-primary text-white px-16 py-8 rounded-[2.5rem] font-headline font-black text-2xl italic tracking-tight shadow-[0_50px_100px_-20px_rgba(188,1,0,0.4)] hover:bg-white hover:text-zinc-900 transition-all group flex items-center gap-6">
                    Submit for Review
                    <span className="material-symbols-outlined group-hover:translate-x-4 transition-transform">east</span>
                 </button>
              </form>
           </div>

           <aside className="lg:col-span-12 xl:col-span-4 space-y-12">
              <div className="p-12 bg-white/5 rounded-[4rem] border border-white/5 space-y-12">
                 <div className="space-y-4">
                    <h3 className="text-3xl font-headline font-black italic">The Benefits.</h3>
                    <div className="space-y-6 pt-6 border-t border-white/5">
                       {[
                         "Priority Discovery Placement",
                         "Seamless Booking Engine Access",
                         "Elite Audience Demographics",
                         "Analytical Curation Insights"
                       ].map(benefit => (
                         <div key={benefit} className="flex items-center gap-4 group">
                            <span className="w-2 h-2 rounded-full bg-primary group-hover:scale-150 transition-transform"></span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{benefit}</span>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
           </aside>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
