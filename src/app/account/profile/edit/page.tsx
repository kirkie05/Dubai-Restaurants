import AccountLayout from "@/components/layout/AccountLayout";

export default function EditProfile() {
  return (
    <AccountLayout>
       <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <header className="pb-12 border-b border-slate-100">
             <span className="text-primary font-body text-[10px] font-black uppercase tracking-[0.4em] block mb-4">Account settings</span>
             <h1 className="text-5xl md:text-7xl font-headline font-black italic tracking-tighter text-on-surface">The <span className="text-zinc-300">Identity.</span></h1>
          </header>

          <section className="bg-white p-12 md:p-20 rounded-[3rem] shadow-2xl border border-slate-50 space-y-16">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-4">
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-300">Legal Name</label>
                   <input type="text" defaultValue="ALEXANDRA VANE" className="w-full bg-transparent border-b-2 border-slate-100 py-4 font-headline font-black italic text-2xl placeholder:text-slate-200 focus:border-primary outline-none transition-all" />
                </div>
                <div className="space-y-4">
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-300">Digital Identity (Email)</label>
                   <input type="email" defaultValue="A.VANE@CURATOR.COM" className="w-full bg-transparent border-b-2 border-slate-100 py-4 font-headline font-black italic text-2xl placeholder:text-slate-200 focus:border-primary outline-none transition-all" />
                </div>
                <div className="space-y-4">
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-300">Communication Phone</label>
                   <input type="tel" defaultValue="+971 50 123 4567" className="w-full bg-transparent border-b-2 border-slate-100 py-4 font-headline font-black italic text-2xl placeholder:text-slate-200 focus:border-primary outline-none transition-all" />
                </div>
                <div className="space-y-4">
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-300">Preferred Language</label>
                   <select className="w-full bg-transparent border-b-2 border-slate-100 py-4 font-headline font-black italic text-2xl outline-none appearance-none cursor-pointer">
                      <option>English (UK)</option>
                      <option>Arabic</option>
                      <option>French</option>
                   </select>
                </div>
             </div>

             <div className="pt-12 border-t border-slate-50 flex items-center justify-between">
                <button className="bg-zinc-900 text-white px-12 py-6 rounded-2xl font-headline font-black text-xl italic shadow-2xl hover:bg-primary transition-all">
                   Save Changes
                </button>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-300">Last updated: 3 days ago</p>
             </div>
          </section>
       </div>
    </AccountLayout>
  );
}
