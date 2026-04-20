import PartnerLayout from "@/components/layout/PartnerLayout";

const PLANS = [
  { name: "Curator Tier", price: "2,500", features: ["Priority Discovery", "Standard Analytics", "100 Bookings/mo"], tier: "Standard" },
  { name: "Elite Archive", price: "5,000", features: ["Global Discovery", "Deep Analytics", "Unlimited Bookings", "Concierge Sync"], tier: "Most Popular", active: true }
];

export default function PartnerBilling() {
  return (
    <PartnerLayout>
       <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <header className="pb-12 border-b border-white/5 flex justify-between items-end">
             <div className="space-y-6">
                <span className="text-secondary font-body text-[10px] font-black uppercase tracking-[0.4em] block mb-4">Financial Protocol</span>
                <h1 className="text-6xl md:text-8xl font-headline font-black italic tracking-tighter text-white">The <span className="text-zinc-800">Tenure.</span></h1>
             </div>
             <div className="flex flex-col items-end text-right">
                <span className="text-4xl font-headline font-black italic text-secondary">Elite Archive</span>
                <span className="text-[9px] font-black uppercase tracking-widest text-zinc-600">Active Subscription</span>
             </div>
          </header>

          <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
             {PLANS.map((plan, i) => (
               <div key={i} className={`p-16 rounded-[4rem] border transition-all space-y-10 group relative overflow-hidden ${plan.active ? 'bg-primary text-white border-primary shadow-[0_50px_100px_-20px_rgba(188,1,0,0.3)]' : 'bg-white/5 border-white/10 text-white hover:border-primary/40'}`}>
                  {plan.active && (
                    <div className="absolute top-10 right-10">
                       <span className="px-4 py-1.5 bg-white text-primary text-[8px] font-black uppercase tracking-widest rounded-full">Current Choice</span>
                    </div>
                  )}
                  <div className="space-y-2">
                     <span className={`text-[10px] font-black uppercase tracking-[0.4em] ${plan.active ? 'text-white/60' : 'text-primary'}`}>{plan.tier}</span>
                     <h3 className="text-5xl font-headline font-black italic tracking-tighter leading-none">{plan.name}.</h3>
                  </div>
                  
                  <div className="flex items-baseline gap-2">
                     <span className="text-6xl font-headline font-black italic">AED {plan.price}</span>
                     <span className="text-[10px] font-black tracking-widest uppercase opacity-60">/ Month</span>
                  </div>

                  <ul className="space-y-4 pt-10 border-t border-white/10">
                     {plan.features.map(f => (
                       <li key={f} className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest">
                          <span className={`material-symbols-outlined text-sm ${plan.active ? 'text-white' : 'text-primary'}`}>check</span>
                          {f}
                       </li>
                     ))}
                  </ul>

                  <button className={`w-full py-6 rounded-2xl font-headline font-black text-xl italic transition-all ${plan.active ? 'bg-white text-zinc-900 border-white' : 'bg-zinc-900 text-white border-white/5 hover:bg-white hover:text-black hover:border-white'}`}>
                     {plan.active ? 'Manage Tenure' : 'Upgrade Sequence'}
                  </button>
               </div>
             ))}
          </section>

          <section className="p-12 border-t border-white/5 space-y-8">
             <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600">
                <span>Recent Invoices</span>
                <button className="text-primary border-b border-primary/20 pb-1 hover:border-primary transition-all">Download All</button>
             </div>
             <div className="space-y-4">
                {[1, 2].map(i => (
                  <div key={i} className="flex justify-between p-6 bg-white/5 rounded-3xl items-center group cursor-pointer hover:bg-white/10 transition-all">
                     <p className="text-sm font-headline font-black italic">INV-2024-00{i}</p>
                     <p className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Oct 2024 · AED 5,000</p>
                     <span className="material-symbols-outlined text-zinc-800 group-hover:text-primary">download</span>
                  </div>
                ))}
             </div>
          </section>
       </div>
    </PartnerLayout>
  );
}
