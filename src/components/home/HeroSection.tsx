import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative pt-32 lg:pt-48 pb-20 px-6 lg:px-16 overflow-hidden bg-background">
      <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
        {/* Left Column: Content & Search */}
        <div className="lg:col-span-7 space-y-12 z-10">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
               <span className="font-body text-[10px] uppercase tracking-[0.6em] text-primary font-black">Digital Curator</span>
               <div className="w-12 h-px bg-slate-200"></div>
               <span className="font-body text-[10px] uppercase tracking-[0.6em] text-secondary font-black">Official</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-headline font-black tracking-tighter leading-[0.85] text-on-surface">
              Curated Dubai <br /> <span className="italic text-primary">Restaurant Directory.</span>
            </h1>
            <p className="text-xl text-slate-500 font-body max-w-2xl leading-relaxed italic">
              The definitive guide to Dubai&apos;s Michelin-star venues, global cuisines, and hidden gems. Expertly curated, editorially verified. Discover the best dining experiences the city has to offer.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl">
             <div className="flex-1 flex items-center bg-white border border-slate-100 rounded-2xl p-2 shadow-2xl focus-within:ring-4 focus-within:ring-primary/5 transition-all">
                <span className="material-symbols-outlined ml-4 text-slate-300">location_on</span>
                <input 
                  type="text" 
                  placeholder="Search Location..." 
                  className="w-full border-none focus:ring-0 text-sm lg:text-base font-body italic p-4 ml-2"
                />
                <button className="bg-primary text-white p-4 rounded-xl hover:bg-zinc-900 transition-all flex items-center justify-center">
                   <span className="material-symbols-outlined text-lg">search</span>
                </button>
             </div>
             <button className="bg-secondary text-white px-10 py-5 rounded-2xl font-body text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-zinc-900 transition-all flex items-center justify-center gap-3">
               <span className="material-symbols-outlined text-base">my_location</span>
               Locate Me
             </button>
          </div>
        </div>

        {/* Right Column: Featured Image with Glassmorphic Card */}
        <div className="lg:col-span-5 relative hidden lg:block">
          <div className="relative aspect-[4/5] w-full max-w-xl mx-auto translate-x-12">
            {/* Main Background Glow (Flag Inspired) */}
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/10 blur-[120px] rounded-full animate-pulse"></div>
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-secondary/10 blur-[120px] rounded-full delay-700 animate-pulse"></div>
            
            {/* The Image Container */}
            <div className="relative h-full w-full rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border-[12px] border-white -rotate-6 hover:rotate-0 transition-all duration-1000 group">
              <Image 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzv0qhsoRFmpbHaf_2gJ_lKOUMZVdzV0SBQT9r1fZ1EEpAv2epAT_tNIR6XOChNUVmNnOvDAbZK6SaW4Bn1dHTQo3VJOBeyrqTBElxkS8ZbtUdNglTvQM9CBzWTmgyMnWBo4vOA9PsIu5tcJIGAy5Gk8mxTzZXEUzIRv3LG0iF2ABnY4Yl4UMWSO8A2-Z6v90UL2S2Dq_IzNTcJimIMCVNtrTylS4qApQ1XawxxKhd4h8h9xQ6fLaB6rC5xCWKYJ7MAbISfcTbl7ty"
                alt="Signature Dish"
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                priority
              />
            </div>

            {/* Overlapping Glass Card */}
            <div className="absolute bottom-12 -left-20 bg-white/80 backdrop-blur-3xl p-8 rounded-[2.5rem] shadow-2xl border border-white/50 max-w-[280px] rotate-3 group hover:rotate-0 transition-all duration-500">
               <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-2xl" style={{fontVariationSettings: "'FILL' 1"}}>hotel_class</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Featured Pick</p>
                    <p className="font-headline font-black text-on-surface text-xl italic tracking-tighter">Dean&apos;s Cheesecake.</p>
                  </div>
               </div>
               <p className="text-sm text-slate-500 font-body italic leading-relaxed">Top trending dessert in Dubai this week based on editorial review.</p>
               <div className="mt-6 flex gap-1.5">
                 {[1,2,3,4,5].map(i => (
                    <span key={i} className="material-symbols-outlined text-[12px] text-primary" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                 ))}
               </div>
               <div className="absolute -top-3 -right-3 bg-secondary text-white text-[9px] font-black px-4 py-2 rounded-full shadow-lg">AUTHENTIC</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
