import PartnerLayout from "@/components/layout/PartnerLayout";

const MENU_CATEGORIES = [
  { name: "Curation Starts", items: 6, status: "Active" },
  { name: "Signature Mains", items: 12, status: "Active" },
  { name: "The Vault (Vintage)", items: 4, status: "Draft" }
];

export default function MenuEditor() {
  return (
    <PartnerLayout>
       <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <header className="pb-12 border-b border-white/5 flex justify-between items-end">
             <div className="space-y-6">
                <span className="text-secondary font-body text-[10px] font-black uppercase tracking-[0.4em] block mb-4">Tactile Curation</span>
                <h1 className="text-6xl md:text-8xl font-headline font-black italic tracking-tighter text-white">The <span className="text-zinc-800">Card.</span></h1>
             </div>
             <button className="px-10 py-5 bg-primary text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-2xl">New Category</button>
          </header>

          <section className="space-y-6">
             {MENU_CATEGORIES.map((cat, i) => (
               <div key={i} className="p-10 bg-white/5 rounded-[2.5rem] border border-white/5 flex items-center justify-between group hover:border-primary/40 transition-all">
                  <div className="space-y-2">
                     <h3 className="text-3xl font-headline font-black italic group-hover:text-primary transition-colors">{cat.name}</h3>
                     <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600">{cat.items} Selections · {cat.status}</p>
                  </div>
                  <div className="flex gap-4">
                     <button className="p-4 bg-zinc-900 rounded-full text-zinc-600 hover:text-white transition-colors">
                        <span className="material-symbols-outlined text-sm">edit_note</span>
                     </button>
                     <button className="p-4 bg-zinc-900 rounded-full text-zinc-600 hover:text-white transition-colors">
                        <span className="material-symbols-outlined text-sm">visibility</span>
                     </button>
                  </div>
               </div>
             ))}
          </section>

          <footer className="pt-20 border-t border-white/5 text-center">
             <p className="text-[9px] font-black uppercase tracking-widest text-zinc-700">Digital Menu Syncing with High-Fidelity Public View</p>
          </footer>
       </div>
    </PartnerLayout>
  );
}
