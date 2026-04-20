import { useState } from "react";

export function BookingWidget() {
  const [step, setStep] = useState(1);

  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-50 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] p-10 space-y-10">
       <header className="space-y-4">
          <span className="text-primary font-body text-[10px] font-black uppercase tracking-[0.4em] block">Fast Reservation</span>
          <h3 className="text-4xl font-headline font-black italic tracking-tighter text-on-surface">Secure <br />Presence.</h3>
       </header>

       <div className="space-y-8">
          <div className="space-y-2">
             <label className="text-[9px] font-black uppercase tracking-widest text-slate-300">Date & Time</label>
             <div className="flex items-center justify-between py-4 border-b border-slate-100 group cursor-pointer">
                <span className="text-lg font-headline font-black italic text-on-surface group-hover:text-primary transition-colors">Oct 24, 20:30</span>
                <span className="material-symbols-outlined text-sm text-slate-300">expand_more</span>
             </div>
          </div>

          <div className="space-y-2">
             <label className="text-[9px] font-black uppercase tracking-widest text-slate-300">Guest Count</label>
             <div className="flex items-center justify-between py-4 border-b border-slate-100 group cursor-pointer">
                <span className="text-lg font-headline font-black italic text-on-surface group-hover:text-primary transition-colors">2 Tables</span>
                <span className="material-symbols-outlined text-sm text-slate-300">expand_more</span>
             </div>
          </div>
       </div>

       <button className="w-full bg-zinc-900 text-white py-6 rounded-2xl font-headline font-black text-xl italic shadow-2xl hover:bg-primary transition-all group flex items-center justify-center gap-4">
          Find Table
          <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">east</span>
       </button>

       <p className="text-center text-[9px] font-black uppercase tracking-widest text-slate-400">Powered by DRD Curation Desk</p>
    </div>
  );
}
