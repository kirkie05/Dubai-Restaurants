export function FeatureGrid() {
  const features = [
    { title: "Advanced Table Booking", desc: "Real-time reservation system with instant confirmation and digital concierge support.", icon: "event_seat", color: "bg-orange-50", text: "text-orange-600" },
    { title: "Exclusive Media Access", desc: "Unlock high-fidelity culinary photography and behind-the-scenes gallery previews.", icon: "photo_library", color: "bg-primary/5", text: "text-primary" },
    { title: "Verified Reviews", desc: "Editorial-grade reviews from Dubai's most seasoned food critics and enthusiasts.", icon: "verified", color: "bg-zinc-50", text: "text-zinc-900" },
    { title: "Priority Support", desc: "24/7 dedicated line for our elite members to manage bookings and special requests.", icon: "support_agent", color: "bg-slate-50", text: "text-slate-600" }
  ];

  return (
    <section className="py-24 px-8 bg-white">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Simple Section Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="text-4xl font-headline font-black italic tracking-tight text-on-surface">Redefining Service.</h2>
          <p className="text-slate-400 font-body text-sm font-medium italic">A full suite of digital tools designed for the modern diner.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="group p-10 rounded-2xl border border-slate-50 bg-white hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 text-center space-y-6">
              <div className={`w-16 h-16 ${feature.color} ${feature.text} rounded-full mx-auto flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12`}>
                <span className="material-symbols-outlined text-3xl">{feature.icon}</span>
              </div>
              <div className="space-y-3">
                <h4 className="font-headline font-bold italic text-xl text-on-surface">{feature.title}</h4>
                <p className="text-slate-400 font-body text-sm leading-relaxed italic">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
