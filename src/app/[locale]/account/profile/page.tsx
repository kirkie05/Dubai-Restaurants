import Image from "next/image";
import AccountLayout from "@/components/layout/AccountLayout";

export default function ProfileOverview() {
  const stats = [
    { label: "Visits Curated", value: "24", icon: "restaurant" },
    { label: "Favorites Saved", value: "118", icon: "favorite" },
    { label: "Elite Tier", value: "Silver", icon: "workspace_premium" },
    { label: "Reviews Written", value: "12", icon: "rate_review" },
  ];

  return (
    <AccountLayout>
       <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <header className="flex flex-col md:flex-row justify-between items-end gap-8 pb-12 border-b border-slate-100">
             <div className="flex items-center gap-8">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-2xl relative">
                   <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuCb4y0Juf2MsQER6FTpPRMb5-6YfdjMILsug_yQYyNrPe80_1qOZlxB-GCS_l3Hn5nHEGWNp-nt4zN_fyAc5mCWK7qwQ2djnw9cTMcdkuDH-J829lKr0Ff6KBLhJWlGpjGF9y9lRO6bwy4euRrxa-nOQxJl28KmX93xeUjiQibT8cQBRnbgOJGRJZeNEnnpy1HwQJUicd4iYgt2coXyOmS16uQ3IxNCKmgdgpgKWhGRfiOUxLCPgtS7Y1EScILmjP-yzJQCVhzjtF3h" alt="Avatar" fill className="object-cover" />
                </div>
                <div className="space-y-2">
                   <h1 className="text-5xl font-headline font-black italic tracking-tighter text-on-surface">Alexandra Vane.</h1>
                   <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Verified Curator Since 2021</p>
                </div>
             </div>
             <button className="bg-zinc-900 text-white px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-primary transition-all">Edit Portfolio</button>
          </header>

          <section className="grid grid-cols-2 lg:grid-cols-4 gap-8">
             {stats.map((stat) => (
               <div key={stat.label} className="p-8 bg-white rounded-3xl border border-slate-50 shadow-xl space-y-4">
                  <span className="material-symbols-outlined text-primary text-xl">{stat.icon}</span>
                  <div>
                     <p className="text-3xl font-headline font-black italic text-on-surface">{stat.value}</p>
                     <p className="text-[9px] font-black uppercase tracking-widest text-slate-300">{stat.label}</p>
                  </div>
               </div>
             ))}
          </section>

          <section className="space-y-12">
             <div className="flex items-center gap-8">
                <h2 className="text-2xl font-headline font-black italic text-on-surface">Recent Curation.</h2>
                <div className="flex-grow h-px bg-slate-100"></div>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[1, 2].map(i => (
                  <div key={i} className="group relative aspect-[16/9] rounded-[2rem] overflow-hidden shadow-2xl">
                     <Image src={`https://lh3.googleusercontent.com/aida-public/AB6AXuBScFTU5wYXxlVQjth8aCZ9LedSVLqxxLEusO3iFznSTrSTlnuSzIMdLWcLYRZ3ZqEs_8NNkhMJ5yDxOTrhA6W-3iQ-UlgnPVDta3m_5S0r9FXRxl5eYl51pYc6k_v4WOrw2QRehEqr-plNlZmxnL9Bm6jQrKrx2ZXNg6O-d_Xz9f_663knA_6A14-2v8uPGHgf6THAkwEDT0FCetS7861RoHJVSeqdCZqMBkS0wvscF6KUR8YO7rcjnipDAP3bgIdAmipuPo2l6FzQ`} alt="Recent" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
                     <div className="absolute inset-0 bg-zinc-900/40 group-hover:bg-zinc-900/20 transition-all"></div>
                     <div className="absolute bottom-8 left-8 text-white">
                        <p className="text-[9px] font-black uppercase tracking-widest text-primary mb-1">Last Visited</p>
                        <h4 className="text-2xl font-headline font-black italic tracking-tighter">Al-Maha Crystal Lounge</h4>
                     </div>
                  </div>
                ))}
             </div>
          </section>
       </div>
    </AccountLayout>
  );
}
