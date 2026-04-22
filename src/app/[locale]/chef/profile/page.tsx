import ChefLayout from "../layout";

export default function ChefProfileEditor() {
  return (
    <ChefLayout>
       <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <header className="pb-12 border-b border-white/5">
             <span className="text-secondary font-body text-[10px] font-black uppercase tracking-[0.4em] block mb-4">Authority Setup</span>
             <h1 className="text-6xl md:text-8xl font-headline font-black italic tracking-tighter text-white">The <span className="text-zinc-900">Persona.</span></h1>
          </header>

          <section className="bg-white/5 p-12 md:p-20 rounded-[3rem] border border-white/5 space-y-16">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div className="space-y-4">
                   <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Public Mastery Name</label>
                   <input type="text" defaultValue="ALESSANDRO ROSSI" className="w-full bg-transparent border-b-2 border-zinc-800 py-4 font-headline font-black italic text-3xl placeholder:text-zinc-800 focus:border-primary outline-none transition-all" />
                </div>
                <div className="space-y-4">
                   <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600">The Manifesto (Short Quote)</label>
                   <input type="text" defaultValue="Cooking is the architectural assembly of memories." className="w-full bg-transparent border-b-2 border-zinc-800 py-4 font-headline font-black italic text-3xl placeholder:text-zinc-800 focus:border-primary outline-none transition-all" />
                </div>
                <div className="space-y-4 md:col-span-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Philosophical Narrative (Long Bio)</label>
                   <textarea defaultValue="Bridging the heritage of Tuscan soil with the avant-garde skyline of Dubai..." className="w-full bg-transparent border-b-2 border-zinc-800 py-4 font-body italic text-xl placeholder:text-zinc-800 focus:border-primary outline-none transition-all h-32" />
                </div>
             </div>

             <div className="pt-12 border-t border-white/5 flex items-center justify-between">
                <button className="bg-primary text-white px-12 py-6 rounded-2xl font-headline font-black text-xl italic shadow-2xl hover:bg-white hover:text-black transition-all">
                   Save Persona
                </button>
             </div>
          </section>
       </div>
    </ChefLayout>
  );
}
