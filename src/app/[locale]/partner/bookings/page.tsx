import PartnerLayout from "@/components/layout/PartnerLayout";

const BOOKINGS = [
  { id: "BK-9021", guest: "Alexandra Vane", time: "20:30", guests: 4, status: "Arrived", table: "T-04" },
  { id: "BK-9022", guest: "Liam Chen", time: "21:00", guests: 2, status: "Confirmed", table: "T-09" }
];

export default function PartnerBookings() {
  return (
    <PartnerLayout>
       <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <header className="pb-12 border-b border-white/5 flex justify-between items-end">
             <div className="space-y-6">
                <span className="text-secondary font-body text-[10px] font-black uppercase tracking-[0.4em] block mb-4">Traffic Control</span>
                <h1 className="text-6xl md:text-8xl font-headline font-black italic tracking-tighter text-white">The <span className="text-primary">Shift.</span></h1>
             </div>
             <div className="flex gap-4 mb-4">
                <button className="px-6 py-2 rounded-full border border-primary text-primary text-[9px] font-black uppercase tracking-widest">Live Floor Plan</button>
             </div>
          </header>

          <section className="space-y-4">
             {BOOKINGS.map((bk) => (
               <div key={bk.id} className="p-10 bg-white/5 rounded-[2.5rem] border border-white/5 flex flex-col md:flex-row items-center gap-12 group hover:border-primary/40 transition-all">
                  <div className="flex-grow grid grid-cols-2 md:grid-cols-4 gap-8">
                     <div>
                        <p className="text-[8px] font-black uppercase tracking-widest text-zinc-600">Identification</p>
                        <p className="text-xl font-headline font-black italic mt-1">{bk.guest}</p>
                     </div>
                     <div>
                        <p className="text-[8px] font-black uppercase tracking-widest text-zinc-600">Chronology</p>
                        <p className="text-xl font-headline font-black italic mt-1">{bk.time}</p>
                     </div>
                     <div>
                        <p className="text-[8px] font-black uppercase tracking-widest text-zinc-600">Placement</p>
                        <p className="text-xl font-headline font-black italic mt-1">{bk.guests} Guests · {bk.table}</p>
                     </div>
                     <div>
                        <p className="text-[8px] font-black uppercase tracking-widest text-zinc-600">Status</p>
                        <div className="flex items-center gap-2 mt-2">
                           <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
                           <p className="text-[9px] font-black uppercase tracking-widest text-secondary">{bk.status}</p>
                        </div>
                     </div>
                  </div>
                  <div className="flex gap-4">
                     <button className="p-4 bg-zinc-900 rounded-full text-zinc-600 hover:text-white transition-colors">
                        <span className="material-symbols-outlined text-sm">edit</span>
                     </button>
                     <button className="p-4 bg-zinc-900 rounded-full text-zinc-600 hover:text-white transition-colors">
                        <span className="material-symbols-outlined text-sm">check</span>
                     </button>
                  </div>
               </div>
             ))}
          </section>
       </div>
    </PartnerLayout>
  );
}
