export default function ChefDashboard() {
  const stats = [
    { label: "Profile Impressions", value: "8.4k", change: "+14%", icon: "visibility" },
    { label: "Restaurant Traffic", value: "24.2k", change: "+8%", icon: "restaurant" },
    { label: "Curation Pulse", value: "4.9", change: "Stable", icon: "bolt" },
    { label: "Media Assets", value: "142", change: "+4", icon: "photo_library" },
  ];

  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <header className="pb-12 border-b border-white/5">
        <span className="text-secondary font-body text-[10px] font-black uppercase tracking-[0.4em] block mb-4">Culinary Command</span>
        <h1 className="text-6xl md:text-8xl font-headline font-black italic tracking-tighter">
          The <span className="text-primary">Portfolio.</span>
        </h1>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <div key={stat.label} className="p-10 bg-white/5 rounded-[2.5rem] border border-white/5 space-y-6 hover:border-primary/40 transition-all group">
            <div className="flex justify-between items-start">
              <span className="material-symbols-outlined text-zinc-700 group-hover:text-primary transition-colors text-3xl">{stat.icon}</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-secondary">{stat.change}</span>
            </div>
            <div>
              <p className="text-4xl font-headline font-black italic">{stat.value}</p>
              <p className="text-[9px] font-black uppercase tracking-widest text-zinc-600 mt-2">{stat.label}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 p-12 bg-white/5 rounded-[3rem] border border-white/5 space-y-12">
          <h3 className="text-3xl font-headline font-black italic">Recent Mentions.</h3>
          <div className="space-y-6">
            {[1, 2].map(i => (
              <div key={i} className="flex gap-8 items-center p-8 bg-white/2 rounded-2xl border border-white/5 group hover:border-primary/20 transition-all">
                <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                <div className="flex-grow">
                  <p className="text-sm font-body italic text-zinc-400">&quot;The Lamb Rack was a revelation of textures and flavors. Truly an editorial masterpiece...&quot;</p>
                  <p className="text-[9px] font-black uppercase tracking-widest text-zinc-600 mt-2">Verified Guest · Al-Maha Crystal Lounge</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 p-12 bg-white/5 rounded-[3rem] border border-white/5 space-y-8">
          <h3 className="text-3xl font-headline font-black italic">Live Venues.</h3>
          <div className="space-y-4">
            {["Al-Maha Crystal Lounge", "The Gilded Lily"].map(v => (
              <div key={v} className="flex items-center justify-between p-4 bg-zinc-900 rounded-xl">
                <span className="text-[10px] font-black uppercase tracking-widest">{v}</span>
                <span className="material-symbols-outlined text-secondary text-sm">stars</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
