import PartnerLayout from "@/components/layout/PartnerLayout";

export default function PartnerDashboard() {
  const stats = [
    { label: "Total Bookings", value: "1,240", change: "+12%", icon: "calendar_month" },
    { label: "Profile Views", value: "48.2k", change: "+24%", icon: "visibility" },
    { label: "Revenue Portions", value: "AED 340k", change: "+8%", icon: "payments" },
    { label: "Curation Score", value: "4.9/5", change: "Stable", icon: "star" },
  ];

  return (
    <PartnerLayout>
       <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <header className="pb-12 border-b border-white/5">
             <span className="text-secondary font-body text-[10px] font-black uppercase tracking-[0.4em] block mb-4">Command Overview</span>
             <h1 className="text-6xl md:text-8xl font-headline font-black italic tracking-tighter">The <span className="text-zinc-800">Metrics.</span></h1>
          </header>

          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
             {stats.map((stat) => (
               <div key={stat.label} className="p-10 bg-white/5 rounded-[2.5rem] border border-white/5 space-y-6 hover:border-primary/40 transition-all group">
                  <div className="flex justify-between items-start">
                     <span className="material-symbols-outlined text-zinc-700 group-hover:text-primary transition-colors text-3xl">{stat.icon}</span>
                     <span className="text-[10px] font-black uppercase tracking-widest text-secondary">{stat.change}</span>
                  </div>
                  <div>
                     <p className="text-4xl font-headline font-black italic">{stat.value}</p>
                     <p className="text-[9px] font-black uppercase tracking-widest text-zinc-600 mt-2">{stat.label}</p>
                  </div>
               </div>
             ))}
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
             <section className="lg:col-span-8 p-12 bg-white/5 rounded-[3rem] border border-white/5 space-y-8">
                <div className="flex justify-between items-center">
                   <h3 className="text-3xl font-headline font-black italic">Booking Velocity.</h3>
                   <div className="flex gap-4">
                      {['7D', '30D', '90D'].map(t => (
                        <button key={t} className="text-[9px] font-black uppercase tracking-widest text-zinc-600 hover:text-white transition-colors">{t}</button>
                      ))}
                   </div>
                </div>
                <div className="h-64 w-full flex items-end justify-between gap-2">
                   {[40, 70, 45, 90, 65, 80, 50, 95, 75, 85].map((h, i) => (
                     <div key={i} className="flex-grow bg-zinc-900 rounded-t-xl relative group">
                        <div 
                          style={{ height: `${h}%` }} 
                          className="w-full bg-zinc-800 group-hover:bg-primary transition-all duration-700 rounded-t-xl"
                        ></div>
                     </div>
                   ))}
                </div>
             </section>

             <section className="lg:col-span-4 p-12 bg-white/5 rounded-[3rem] border border-white/5 space-y-8">
                <h3 className="text-3xl font-headline font-black italic">Next Shift.</h3>
                <div className="space-y-6">
                   {[1, 2, 3].map(i => (
                     <div key={i} className="flex items-center justify-between group">
                        <div className="space-y-1">
                           <p className="text-[10px] font-black uppercase tracking-widest text-white">20:30 · 4 Guests</p>
                           <p className="text-[9px] font-black uppercase tracking-widest text-zinc-600">Alexandra Vane</p>
                        </div>
                        <span className="material-symbols-outlined text-zinc-800 group-hover:text-primary transition-colors">east</span>
                     </div>
                   ))}
                </div>
                <button className="w-full py-5 bg-zinc-900 border border-white/5 rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all">View All Bookings</button>
             </section>
          </div>
       </div>
    </PartnerLayout>
  );
}
