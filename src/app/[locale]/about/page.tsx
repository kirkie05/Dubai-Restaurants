import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-on-surface">
      <Navbar />
      
      <main className="pt-32 min-h-screen">
        <header className="max-w-[1920px] mx-auto px-8 lg:px-16 mb-40">
          <div className="flex flex-col lg:flex-row items-end justify-between gap-16 pb-16 border-b border-slate-100">
             <div className="space-y-6 max-w-4xl">
                <span className="text-primary font-body text-[10px] font-black uppercase tracking-[0.4em] block">Our Manifesto</span>
                <h1 className="text-6xl md:text-9xl font-headline font-black italic tracking-tighter leading-[0.85] text-on-surface">
                   The <br /><span className="text-zinc-400">Curator.</span>
                </h1>
                <p className="text-xl text-slate-500 font-body italic leading-relaxed max-w-xl">
                   We are the digital architects of Dubai&apos;s culinary identity. Verifying, documenting, and elevating the city&apos;s finest destinations.
                </p>
             </div>
             <div className="flex flex-col items-end text-right">
                <span className="text-4xl font-headline font-black italic">EST. 2021</span>
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Digital Repository</span>
             </div>
          </div>
        </header>

        <section className="max-w-[1920px] mx-auto px-8 lg:px-16 grid grid-cols-1 md:grid-cols-12 gap-32 items-center mb-60">
           <div className="md:col-span-12 lg:col-span-6 space-y-12">
              <div className="space-y-8">
                 <h2 className="text-5xl md:text-7xl font-headline font-black italic tracking-tighter text-on-surface leading-none">The Philosophy of <span className="text-primary">Precision.</span></h2>
                 <p className="text-xl text-slate-500 font-body italic leading-relaxed">
                   Dubai Restaurants was born from a need for clarity in a city of excess. We didn&apos;t want another directory; we wanted a repository of truth. We curate not just for taste, but for architecture, atmosphere, and the vision of the masters behind the pass.
                 </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-slate-100">
                 <div className="space-y-4">
                    <h4 className="font-headline font-black text-2xl italic">Verified Presence.</h4>
                    <p className="text-slate-400 font-body text-sm italic underline decoration-primary/20">Every venue is physically visited and vetted by our editorial board.</p>
                 </div>
                 <div className="space-y-4">
                    <h4 className="font-headline font-black text-2xl italic">Architectural Focus.</h4>
                    <p className="text-slate-400 font-body text-sm italic underline decoration-primary/20">We document the spatial narrative as much as the culinary one.</p>
                 </div>
              </div>
           </div>

           <div className="md:col-span-12 lg:col-span-6 relative">
              <div className="relative aspect-[4/5] rounded-[4rem] overflow-hidden border-8 border-slate-50 shadow-2xl skew-y-1">
                 <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCQaZ4Rzc4yh_i9VR536sMqU5IBHantXMBrYBHokcOmg9dIbwIROyioKWiPgXvM1Xex7Qn45bdBXrnPFK6sIMzuW1dBqql49dAoBCtgrDZomgB5586Olg-3jakrU-1dWLBmMoJL0uAty__ERh9lsuWyQK39CRq6-nZ3TSQGyqfdYR8V-wFGHZc4g6cs2Urhj_peVI7bk9kKcheCUSOXTbk0HNk0L24bItA_BldAVnbNOkHQj_xcq58wbCLpOLADYKruPqAb30R01Z2" alt="Atmosphere" fill className="object-cover" />
              </div>
           </div>
        </section>

        <section className="bg-zinc-900 text-white py-60">
           <div className="max-w-[1920px] mx-auto px-8 lg:px-16 text-center space-y-20">
              <span className="text-primary font-body text-[10px] font-black uppercase tracking-[0.6em] block">Join the Narrative</span>
              <h2 className="text-6xl md:text-9xl font-headline font-black italic tracking-tighter leading-none">Ready to contribute?</h2>
              <div className="flex flex-col md:flex-row items-center justify-center gap-12">
                 <button className="bg-white text-zinc-900 px-16 py-8 rounded-[2.5rem] font-headline font-black text-2xl italic shadow-2xl hover:bg-primary hover:text-white transition-all">Apply for Portfolio</button>
                 <button className="text-primary font-body text-[10px] font-black uppercase tracking-[0.4em] border-b border-primary/20 hover:border-primary pb-1">Contact Editorial Desk</button>
              </div>
           </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
