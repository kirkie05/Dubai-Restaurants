import { Link } from '@/navigation';
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function BookingModification() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 px-8 max-w-4xl mx-auto w-full space-y-20">
         <header className="space-y-6">
            <span className="text-primary font-body text-[10px] font-black uppercase tracking-[0.4em] block">Refine Your Schedule</span>
            <h1 className="text-6xl md:text-8xl font-headline font-black italic tracking-tighter leading-none text-on-surface">The <span className="text-primary">Shift.</span></h1>
            <p className="text-xl text-slate-500 font-body italic leading-relaxed max-w-xl">
               Adjusting the chronology of your reservation at **Al-Maha Crystal Lounge**. 
            </p>
         </header>

         <div className="space-y-16">
            <div className="p-12 bg-white rounded-[2rem] border border-slate-50 shadow-2xl space-y-12">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-4">
                     <label className="text-[9px] font-black uppercase tracking-widest text-slate-300">Current Slot</label>
                     <p className="text-xl font-headline font-black italic text-zinc-300">Saturday, Nov 24 · 20:30</p>
                  </div>
                  <div className="space-y-4">
                     <label className="text-[9px] font-black uppercase tracking-widest text-primary">New Proposed Slot</label>
                     <input type="datetime-local" className="w-full bg-transparent border-b-2 border-primary py-2 font-headline font-black italic text-xl outline-none" />
                  </div>
               </div>
               
               <div className="space-y-4">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-300">Reason for Modification</label>
                  <textarea placeholder="OPTIONAL NOTE FOR THE MAÎTRE D&apos;" className="w-full bg-slate-50 rounded-xl p-6 font-body italic text-sm outline-none transition-all focus:ring-1 focus:ring-primary/20 h-32" />
               </div>
            </div>

            <div className="flex items-center gap-8">
               <button className="bg-zinc-900 text-white px-12 py-6 rounded-2xl font-headline font-black text-xl italic hover:bg-primary transition-all shadow-2xl">
                  Update Reservation
               </button>
               <Link href="/account/bookings" className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 border-b border-slate-100 hover:text-on-surface transition-all pb-1">
                  Keep Original
               </Link>
            </div>
         </div>
      </main>
      
      <Footer />
    </div>
  );
}
