import PartnerLayout from "@/components/layout/PartnerLayout";

export default function PartnerAnalytics() {
  const data = [
    { label: "Profile Clicks", value: "12,402", trend: "+24%" },
    { label: "Booking Conv. Rate", value: "8.2%", trend: "+5%" },
    { label: "Menu Views", value: "3,892", trend: "+12%" },
    { label: "Phone & Map Inq.", value: "921", trend: "+18%" }
  ];

  return (
    <PartnerLayout>
       <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <header className="pb-12 border-b border-white/5 flex justify-between items-end">
             <div className="space-y-6">
                <span className="text-secondary font-body text-[10px] font-black uppercase tracking-[0.4em] block mb-4">Curation Intelligence</span>
                <h1 className="text-6xl md:text-8xl font-headline font-black italic tracking-tighter text-white">The <span className="text-primary">Insights.</span></h1>
             </div>
             <div className="flex gap-4 mb-4">
                <button className="px-8 py-3 bg-white/5 rounded-full border border-white/10 text-[9px] font-black uppercase tracking-widest text-zinc-400">Download Report</button>
             </div>
          </header>

          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
             {data.map((stat, i) => (
                <div key={i} className="p-10 bg-white/5 rounded-[2.5rem] border border-white/5 space-y-6 group hover:border-primary/40 transition-all">
                   <div className="flex justify-between items-start">
                      <span className="text-[9px] font-black uppercase tracking-widest text-zinc-600">Metric</span>
                      <span className="text-[9px] font-black uppercase tracking-widest text-secondary">{stat.trend}</span>
                   </div>
                   <div>
                      <p className="text-4xl font-headline font-black italic">{stat.value}</p>
                      <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mt-2">{stat.label}</p>
                   </div>
                </div>
             ))}
          </section>

          <section className="p-16 bg-white/5 rounded-[4rem] border border-white/5 space-y-16">
             <div className="flex justify-between items-center">
                <h3 className="text-4xl font-headline font-black italic">Audience Flux.</h3>
                <div className="flex gap-10">
                   <div className="flex flex-col items-end">
                      <span className="text-2xl font-headline font-black italic">42%</span>
                      <span className="text-[8px] font-black uppercase tracking-widest text-zinc-600">Repeat Curators</span>
                   </div>
                   <div className="flex flex-col items-end">
                      <span className="text-2xl font-headline font-black italic">58%</span>
                      <span className="text-[8px] font-black uppercase tracking-widest text-zinc-600">New Discovery</span>
                   </div>
                </div>
             </div>
             <div className="h-2 bg-zinc-900 rounded-full overflow-hidden flex">
                <div className="w-[42%] bg-primary"></div>
                <div className="w-[58%] bg-zinc-800"></div>
             </div>
          </section>
       </div>
    </PartnerLayout>
  );
}
