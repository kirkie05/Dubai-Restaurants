import { Link } from '@/navigation';
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function BookingError() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center pt-24 px-8">
        <div className="max-w-2xl w-full text-center space-y-12">
           <div className="space-y-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-100 text-slate-300 mb-8">
                 <span className="material-symbols-outlined text-3xl">error_outline</span>
              </div>
              <span className="text-slate-400 font-body text-[10px] font-black uppercase tracking-[0.4em] block">Architectural Error</span>
              <h1 className="text-5xl md:text-7xl font-headline font-black italic tracking-tighter leading-none text-on-surface">The Flow <br /><span className="text-primary">Broken.</span></h1>
              <p className="text-lg text-slate-500 font-body italic leading-relaxed max-w-lg mx-auto">
                 We encountered a disruption in the curated booking sequence. This destination may be temporarily at capacity or undergoing a narrative reset.
              </p>
           </div>

           <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <button onClick={() => window.location.reload()} className="bg-zinc-900 text-white px-10 py-5 rounded-xl font-headline font-black text-lg italic hover:bg-primary transition-all shadow-xl">
                 Try Sequence Again
              </button>
              <Link href="/contact" className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 border-b border-slate-100 hover:text-on-surface transition-all pb-1">
                 Contact Concierge
              </Link>
           </div>
           
           <div className="pt-20 text-[9px] font-black uppercase tracking-widest text-slate-300">
              Error Code: DRD-RESERVE-SYNC-FAIL
           </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
