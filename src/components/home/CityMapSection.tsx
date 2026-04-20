import Link from "next/link";

const CLUSTERS = [
  { name: "Downtown Dubai", count: 142, x: "45%", y: "30%" },
  { name: "Dubai Marina", count: 98, x: "20%", y: "65%" },
  { name: "DIFC", count: 64, x: "55%", y: "25%" },
  { name: "JBR", count: 52, x: "15%", y: "70%" },
];

export function CityMapSection() {
  return (
    <section className="py-32 lg:py-48 px-6 lg:px-16 bg-zinc-950 overflow-hidden relative">
      {/* Background Textures (Flag Inspired) */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      <div className="absolute top-0 right-0 w-[500px] h-full bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24 items-center relative z-10">
         {/* Left: Map Representation (Full width on small, 7 cols on large) */}
         <div className="lg:col-span-12 xl:col-span-7 relative aspect-video bg-zinc-900 rounded-[3rem] lg:rounded-[5rem] border border-white/5 overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] group/map">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10"></div>
            
            {/* Pulsing Clusters */}
            {CLUSTERS.map((cluster) => (
               <div key={cluster.name} className="absolute group cursor-pointer" style={{ left: cluster.x, top: cluster.y }}>
                  <div className="relative">
                     <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center border border-primary/20 animate-pulse group-hover:scale-150 transition-all duration-700">
                        <div className="w-2.5 h-2.5 bg-primary rounded-full group-hover:bg-secondary transition-colors"></div>
                     </div>
                     <div className="absolute left-1/2 -translate-x-1/2 top-14 bg-zinc-900/95 backdrop-blur-2xl border border-white/10 p-5 rounded-2xl opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap translate-y-4 group-hover:translate-y-0 shadow-2xl">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white flex items-center gap-2">
                           <span className="w-1 h-1 rounded-full bg-secondary"></span>
                           {cluster.name}
                        </p>
                        <p className="text-[9px] font-black tracking-[0.2em] text-primary mt-2">{cluster.count} VERIFIED DESTINATIONS</p>
                     </div>
                  </div>
               </div>
            ))}

            {/* Interactive Overlay */}
            <div className="absolute bottom-12 right-12">
               <Link href="/map" className="px-10 py-5 bg-primary text-white rounded-2xl font-headline font-black text-xs italic tracking-tight hover:bg-white hover:text-zinc-900 transition-all flex items-center gap-4 shadow-2xl group/btn">
                  Launch Spatial Discovery
                  <span className="material-symbols-outlined text-base group-hover/btn:translate-x-2 transition-transform">explore</span>
               </Link>
            </div>
         </div>

         {/* Right: Content */}
         <div className="lg:col-span-12 xl:col-span-5 space-y-12 lg:pl-12">
            <header className="space-y-8">
               <div className="flex items-center gap-6">
                  <span className="text-primary font-body text-[10px] font-black uppercase tracking-[0.6em] block">Spatial Guide</span>
                  <div className="w-12 h-px bg-white/10"></div>
                  <span className="text-secondary font-body text-[10px] font-black uppercase tracking-[0.6em] block">Official</span>
               </div>
               <h2 className="text-6xl md:text-8xl font-headline font-black italic tracking-tighter leading-[0.8] text-white">The <br /><span className="text-zinc-800">Clusters.</span></h2>
               <p className="text-xl text-zinc-500 font-body italic leading-relaxed max-w-sm">
                  Navigate Dubai&apos;s culinary topography. From the architectural heights of Downtown to the coastal narratives of the Marina.
               </p>
            </header>
            
            <div className="grid grid-cols-2 gap-12 pt-12 border-t border-white/5">
                <div className="space-y-4">
                   <p className="text-4xl font-headline font-black italic text-white leading-none">12+</p>
                   <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Major Culinary Clusters</p>
                </div>
                <div className="space-y-4">
                   <p className="text-4xl font-headline font-black italic text-white leading-none">2.4k+</p>
                   <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Mapped High-Fidelity Tables</p>
                </div>
            </div>

            <div className="pt-8 flex gap-2">
               <div className="w-8 h-1 bg-primary"></div>
               <div className="w-8 h-1 bg-secondary"></div>
               <div className="w-8 h-1 bg-white/20"></div>
               <div className="w-8 h-1 bg-zinc-800"></div>
            </div>
         </div>
      </div>
    </section>
  );
}
