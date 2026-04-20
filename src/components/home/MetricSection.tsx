import Image from "next/image";

export function MetricSection() {
  return (
    <section className="py-32 px-8 bg-zinc-900 text-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
        {/* Left Column: Visual Explanation */}
        <div className="lg:col-span-12 xl:col-span-7 space-y-12">
          <div className="space-y-6">
            <h2 className="text-5xl md:text-7xl font-headline font-black italic tracking-tighter leading-none">
              Introducing the <br /><span className="text-primary italic">Curation Pulse.</span>
            </h2>
            <div className="w-20 h-1 bg-primary"></div>
            <p className="text-xl text-zinc-400 font-body italic max-w-2xl leading-relaxed">
              Imagine knowing the atmosphere of a restaurant before you even step inside. Our proprietary 50-point inspection system quantifies luxury, service, and consistency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { title: "Sentiment Analysis", desc: "We cross-reference thousands of verified diner reviews to determine the real-time reputation of an establishment.", icon: "analytics" },
              { title: "Live Consistency", desc: "Our secret curators visit venues at various times of the week to ensure the quality never dips.", icon: "bolt" }
            ].map(item => (
              <div key={item.title} className="space-y-4 group">
                <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all transform group-hover:rotate-12">
                  <span className="material-symbols-outlined">{item.icon}</span>
                </div>
                <h4 className="text-2xl font-headline font-bold italic">{item.title}</h4>
                <p className="text-zinc-500 font-body text-sm italic leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Visual Data Representation */}
        <div className="lg:col-span-12 xl:col-span-5 relative">
          <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden border-8 border-white/5 shadow-[0_0_80px_rgba(187,0,35,0.2)]">
            <Image 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCQaZ4Rzc4yh_i9VR536sMqU5IBHantXMBrYBHokcOmg9dIbwIROyioKWiPgXvM1Xex7Qn45bdBXrnPFK6sIMzuW1dBqql49dAoBCtgrDZomgB5586Olg-3jakrU-1dWLBmMoJL0uAty__ERh9lsuWyQK39CRq6-nZ3TSQGyqfdYR8V-wFGHZc4g6cs2Urhj_peVI7bk9kKcheCUSOXTbk0HNk0L24bItA_BldAVnbNOkHQj_xcq58wbCLpOLADYKruPqAb30R01Z2"
              alt="Curation Process"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-[2000ms]"
            />
            
            {/* The "Pulse" Indicator Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-12 inset-x-12 p-8 bg-black/60 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl">
               <div className="flex flex-col items-center text-center space-y-4">
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary">Curation Pulse</span>
                  <div className="text-5xl font-headline font-black italic tracking-widest">92%</div>
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="w-[92%] h-full bg-primary shadow-[0_0_20px_#bb0023]"></div>
                  </div>
                  <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">Elite Status Confirmed</p>
               </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background Decor */}
      <span className="material-symbols-outlined absolute -top-20 -right-20 text-[400px] opacity-[0.03] select-none pointer-events-none">monitoring</span>
    </section>
  );
}
