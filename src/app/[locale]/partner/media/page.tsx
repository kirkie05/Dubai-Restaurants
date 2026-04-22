import Image from "next/image";
import PartnerLayout from "@/components/layout/PartnerLayout";

const ASSETS = [
  { id: 1, url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBScFTU5wYXxlVQjth8aCZ9LedSVLqxxLEusO3iFznSTrSTlnuSzIMdLWcLYRZ3ZqEs_8NNkhMJ5yDxOTrhA6W-3iQ-UlgnPVDta3m_5S0r9FXRxl5eYl51pYc6k_v4WOrw2QRehEqr-plNlZmxnL9Bm6jQrKrx2ZXNg6O-d_Xz9f_663knA_6A14-2v8uPGHgf6THAkwEDT0FCetS7861RoHJVSeqdCZqMBkS0wvscF6KUR8YO7rcjnipDAP3bgIdAmipuPo2l6FzQ", size: "2.4 MB", type: "Hero" },
  { id: 2, url: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-Mn3VfstTh6o3L6SjYskEApEpYXGgUOGgmrZIRvdRuatACz82KGEoe_dZi1LHGPSGlttJlLdO3Bf7qt9R5uiUx7xle3W-EOuxW67f8UAnW81QcVyF00k1RFYJ5sPSiRlLHi00ZecET7JWgQt3einGYeZRnxhExhRu5YDF16Sc2OIixQ8vf-k3eQSq3V8IYjDYXf6Z4ehyD2LreChpW4CGZmQnAOjNspmb954v2IZ1bSU09taNNOCO929NR-oAsWWjyBUb7xuoBulv", size: "1.8 MB", type: "Interior" }
];

export default function MediaAssets() {
  return (
    <PartnerLayout>
       <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <header className="pb-12 border-b border-white/5 flex justify-between items-end">
             <div className="space-y-6">
                <span className="text-secondary font-body text-[10px] font-black uppercase tracking-[0.4em] block mb-4">Visual Repository</span>
                <h1 className="text-6xl md:text-8xl font-headline font-black italic tracking-tighter text-white">The <span className="text-zinc-800">Media.</span></h1>
             </div>
             <button className="px-10 py-5 bg-white text-zinc-900 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-2xl">Upload Asset</button>
          </header>

          <section className="grid grid-cols-2 lg:grid-cols-3 gap-12">
             {ASSETS.map((asset) => (
               <div key={asset.id} className="group relative aspect-square rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl">
                  <Image src={asset.url} alt="Asset" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-zinc-900/40 group-hover:bg-zinc-900/20 transition-all"></div>
                  <div className="absolute bottom-8 left-8 text-white space-y-1">
                     <p className="text-[10px] font-black uppercase tracking-widest text-primary">{asset.type}</p>
                     <p className="text-[8px] font-black uppercase tracking-widest text-zinc-400">{asset.size} · Oct 2024</p>
                  </div>
                  <button className="absolute top-8 right-8 p-3 bg-zinc-900/80 backdrop-blur-xl rounded-full text-zinc-600 hover:text-white transition-colors opacity-0 group-hover:opacity-100">
                     <span className="material-symbols-outlined text-sm">more_vert</span>
                  </button>
               </div>
             ))}
          </section>
       </div>
    </PartnerLayout>
  );
}
