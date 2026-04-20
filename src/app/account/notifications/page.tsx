import AccountLayout from "@/components/layout/AccountLayout";

const NOTIFICATIONS = [
  {
    id: 1,
    title: "Reservation Alert",
    text: "Your placement at Al-Maha Crystal Lounge has been confirmed for Saturday.",
    time: "2 HOURS AGO",
    isNew: true,
    icon: "event_available"
  },
  {
    id: 2,
    title: "Curation Pulse",
    text: "New Michelin-starred destination added to the Downtown collection.",
    time: "1 DAY AGO",
    isNew: false,
    icon: "star"
  }
];

export default function NotificationsPage() {
  return (
    <AccountLayout>
       <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <header className="pb-12 border-b border-slate-100">
             <span className="text-primary font-body text-[10px] font-black uppercase tracking-[0.4em] block mb-4">Briefings</span>
             <h1 className="text-5xl md:text-7xl font-headline font-black italic tracking-tighter text-on-surface">The <span className="text-zinc-300">Pulse.</span></h1>
          </header>

          <section className="space-y-4">
             {NOTIFICATIONS.map((note) => (
               <div key={note.id} className={`p-8 rounded-[2rem] border transition-all flex items-center gap-8 group ${note.isNew ? 'bg-white border-slate-50 shadow-2xl' : 'bg-transparent border-transparent opacity-50 hover:opacity-100'}`}>
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center ${note.isNew ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-400'}`}>
                     <span className="material-symbols-outlined text-xl">{note.icon}</span>
                  </div>
                  
                  <div className="flex-grow space-y-1">
                     <div className="flex items-center gap-4">
                        <h3 className="text-xl font-headline font-black italic text-zinc-900 tracking-tighter">{note.title}</h3>
                        {note.isNew && <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>}
                     </div>
                     <p className="text-sm font-body italic text-slate-500">{note.text}</p>
                  </div>

                  <div className="text-right">
                     <span className="text-[9px] font-black uppercase tracking-widest text-slate-300">{note.time}</span>
                  </div>
               </div>
             ))}
          </section>

          <footer className="pt-12 text-center">
             <button className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-primary transition-colors border-b border-slate-100 hover:border-primary pb-1">Archive All Briefings</button>
          </footer>
       </div>
    </AccountLayout>
  );
}
