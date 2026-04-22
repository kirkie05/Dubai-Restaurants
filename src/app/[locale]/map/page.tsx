import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";

import { InteractiveMap } from "@/components/ui/InteractiveMap";

const LOCATIONS = [
  { id: 1, name: "Al Safa Club", type: "Japanese", rating: 4.8, position: { lat: 25.2048, lng: 55.2708 } },
  { id: 2, name: "Desert Fig Atelier", type: "European", rating: 4.7, position: { lat: 25.2136, lng: 55.2811 } },
  { id: 3, name: "Marina Ember House", type: "Grill", rating: 4.6, position: { lat: 25.0772, lng: 55.1337 } },
  { id: 4, name: "Nexus Point", type: "Fusion", rating: 4.9, position: { lat: 25.1205, lng: 55.1886 } },
  { id: 5, name: "Skyline Terrace", type: "Mediterranean", rating: 4.5, position: { lat: 25.1972, lng: 55.2744 } },
];

export default function MapViewPage() {
  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      <Navbar />
      
      <main className="flex-grow pt-24 relative flex flex-col lg:flex-row">
        {/* Map Container */}
        <section className="flex-grow relative bg-slate-100 overflow-hidden">
          {/* High-Fidelity Map Background */}
          <div className="absolute inset-0 grayscale opacity-40">
             <Image 
               src="/dubai_spatial_map_background_1776785841856.png" 
               alt="Dubai Map Texture" 
               fill 
               className="object-cover"
             />
          </div>
          
          <div className="absolute inset-0 z-10">
             <InteractiveMap markers={LOCATIONS} />
          </div>
          
          {/* Floating Action Bar */}
          <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 flex bg-white/90 backdrop-blur-xl border border-white p-2 rounded-2xl shadow-2xl">
            <div className="flex items-center gap-2 px-4 border-r border-slate-100">
               <span className="material-symbols-outlined text-primary text-sm">filter_list</span>
               <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface">Filters</span>
            </div>
            <div className="flex items-center px-4 gap-4">
               {['Downtown', 'Jumeirah', 'DIFC', 'Marina'].map(loc => (
                 <button key={loc} className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">{loc}</button>
               ))}
            </div>
          </div>


          {/* Navigation Controls */}
          <div className="absolute bottom-8 right-8 flex flex-col gap-2 z-20">
             <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl hover:bg-zinc-900 hover:text-white transition-all">
                <span className="material-symbols-outlined">add</span>
             </button>
             <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl hover:bg-zinc-900 hover:text-white transition-all">
                <span className="material-symbols-outlined">remove</span>
             </button>
             <button className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center shadow-xl">
                <span className="material-symbols-outlined">my_location</span>
             </button>
          </div>
        </section>

        {/* Info Panel */}
        <aside className="w-full lg:w-[480px] bg-white border-l border-slate-100 overflow-y-auto z-30 shadow-[-20px_0_40px_rgba(0,0,0,0.05)]">
           <div className="p-10 space-y-12">
              <div className="space-y-4">
                 <h1 className="text-5xl font-headline font-black italic tracking-tighter leading-none">Map <br /><span className="text-primary">Discovery</span></h1>
                 <p className="text-sm text-slate-400 font-body italic leading-relaxed">
                    Navigate the city&apos;s culinary landscape with our real-time spatial guide. Verified Michelin picks and neighborhood secrets.
                 </p>
              </div>

              <div className="space-y-8">
                 <div className="flex justify-between items-end">
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Featured Nearby</p>
                    <Link href="/search" className="text-[9px] font-bold uppercase tracking-widest text-slate-400 hover:text-on-surface border-b border-slate-200">View List</Link>
                 </div>

                 {LOCATIONS.slice(0, 3).map((item) => (
                    <article key={item.id} className="group flex gap-6 items-center cursor-pointer border-b border-slate-50 pb-8 hover:border-primary/20 transition-all">
                       <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-slate-100 shrink-0 shadow-lg group-hover:scale-105 transition-transform">
                          <Image 
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzv0qhsoRFmpbHaf_2gJ_lKOUMZVdzV0SBQT9r1fZ1EEpAv2epAT_tNIR6XOChNUVmNnOvDAbZK6SaW4Bn1dHTQo3VJOBeyrqTBElxkS8ZbtUdNglTvQM9CBzWTmgyMnWBo4vOA9PsIu5tcJIGAy5Gk8mxTzZXEUzIRv3LG0iF2ABnY4Yl4UMWSO8A2-Z6v90UL2S2Dq_IzNTcJimIMCVNtrTylS4qApQ1XawxxKhd4h8h9xQ6fLaB6rC5xCWKYJ7MAbISfcTbl7ty" 
                            alt={item.name} 
                            fill 
                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                          />
                       </div>
                       <div className="flex-grow space-y-1">
                          <h3 className="font-headline font-black text-on-surface text-xl italic leading-none">{item.name}</h3>
                          <p className="text-primary font-body text-[10px] font-bold uppercase tracking-widest">{item.type}</p>
                          <div className="flex items-center gap-2 text-xs text-slate-400 mt-2">
                             <div className="flex items-center text-primary">
                                <span className="material-symbols-outlined text-[10px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                                {item.rating}
                             </div>
                             <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                             <span>0.8 km</span>
                          </div>
                       </div>
                    </article>
                 ))}
              </div>
           </div>
        </aside>
      </main>
    </div>
  );
}
