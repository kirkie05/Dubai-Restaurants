import Image from "next/image";
import Link from "next/link";

export default function AdManagement() {
  return (
    <div className="flex min-h-screen bg-background">
      {/* SideNavBar - Admin Context */}
      <aside className="fixed left-0 top-0 h-full w-64 z-40 bg-zinc-900 flex flex-col p-8 text-white">
        <div className="mb-12">
          <h1 className="text-xl font-black tracking-tighter uppercase font-headline">Dubai Restaurants</h1>
          <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold mt-1">Admin Control</p>
        </div>
        
        <nav className="flex-1 space-y-2">
          {[
            { label: 'System Overview', icon: 'dashboard' },
            { label: 'Restaurant Approvals', icon: 'verified' },
            { label: 'User Management', icon: 'group' },
            { label: 'Ad & Promotions', icon: 'campaign', active: true },
            { label: 'Content Moderation', icon: 'gavel' },
            { label: 'System Config', icon: 'settings' }
          ].map((item) => (
            <button key={item.label} className={`w-full flex items-center gap-4 px-4 py-3 rounded-sm transition-all ${item.active ? 'bg-white/10 text-primary border-l-4 border-primary shadow-sm' : 'text-zinc-500 hover:bg-white/5 hover:text-white'}`}>
              <span className="material-symbols-outlined text-sm">{item.icon}</span>
              <span className="font-body text-[10px] uppercase tracking-widest font-bold">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-8 border-t border-zinc-800">
          <button className="w-full flex items-center gap-4 px-4 py-3 text-zinc-500 hover:text-white transition-colors">
            <span className="material-symbols-outlined text-sm">logout</span>
            <span className="font-body text-[10px] uppercase tracking-widest font-bold">Sign Out</span>
          </button>
        </div>
      </aside>

      <main className="ml-64 flex-1 flex flex-col">
        {/* Top bar */}
        <header className="bg-white/80 backdrop-blur-xl sticky top-0 z-50 flex justify-between items-center px-12 py-6 border-b border-slate-50">
          <div className="flex items-center gap-10">
            <h2 className="font-headline font-bold text-2xl italic tracking-tighter">Campaign Command</h2>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 text-sm">search</span>
              <input 
                className="bg-slate-50 border-none rounded-sm pl-10 pr-4 py-2 text-[10px] font-bold uppercase tracking-widest focus:ring-1 focus:ring-primary w-64" 
                placeholder="Search Active Campaigns..." 
              />
            </div>
            <button className="bg-primary text-white px-8 py-3 font-body text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-900 transition-all shadow-xl shadow-primary/20">
               New Campaign
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-16 max-w-7xl mx-auto w-full space-y-12">
          {/* Header section */}
          <section className="flex flex-col md:flex-row justify-between items-end gap-12">
            <div className="max-w-2xl space-y-4">
              <span className="text-primary font-body text-[10px] uppercase tracking-[0.3em] font-bold">Marketing Oversight</span>
              <h1 className="font-headline text-5xl md:text-6xl font-extrabold text-on-surface leading-tight tracking-tighter italic">
                Elevate the <span className="text-primary">Experience.</span>
              </h1>
              <p className="text-slate-500 font-body italic leading-relaxed">Manage restaurant visibility across the Dubai gourmet landscape. Orchestrate high-impact placements, featured collections, and social blasts.</p>
            </div>
          </section>

          {/* Metrics Grid */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { label: 'Global Reach', value: '142.8k', grow: '+12.5%', icon: 'visibility', primary: true },
              { label: 'Avg Click-Through', value: '4.2%', grow: 'Above Benchmark', icon: 'ads_click' },
              { label: 'Conversion Value', value: 'AED 84k', grow: 'ROI: 4.8x', icon: 'account_balance_wallet' }
            ].map((stat) => (
              <div key={stat.label} className={`bg-white p-8 rounded-lg border border-slate-50 shadow-sm space-y-4 hover:shadow-xl transition-all duration-500 ${stat.primary ? 'border-l-4 border-l-primary' : 'border-l-4 border-l-zinc-200'}`}>
                <p className="font-body text-[9px] uppercase tracking-widest text-slate-400 font-bold">{stat.label}</p>
                <h3 className="font-headline text-4xl font-extrabold italic text-zinc-900 leading-none">{stat.value}</h3>
                <div className="flex items-center gap-2 font-body text-[10px] font-bold text-secondary italic">
                   <span className="material-symbols-outlined text-sm">{stat.icon}</span>
                   {stat.grow}
                </div>
              </div>
            ))}
          </section>

          <h3 className="font-headline text-2xl font-bold italic pt-8 border-b border-slate-100 pb-4">Revenue <span className="text-slate-300">Strategies</span></h3>

          {/* Promotion Options */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: 'Sponsored Placements', 
                type: 'Premium', 
                color: 'bg-primary',
                desc: 'Top-tier visibility in curated search results and homepage Hotspots.',
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqs1xCkw1k_13VqyskXIsCHBJXpvLNjUEb8z1sTykOP6JBYdWNaf9nS_HfuRh1Z_-IwZwQyEf3eNcuUWTr5vTeS3VVknarqRLC7Y6e96gNCP602cUAaGmud0gBCS8fuR9UkNLvJ0HFzO1wMXe0bkrMWbMVDKJzAWSHZIatxALM_uKxk4Bonp5USd7HSVfTPj4FHT-Hi5w-k7KD-WvlA2mRaEkQSdRMNLmXMOWSY-W7pSHyel1Rpi0fRryyvoXFjn4YeimKl3KVUEec'
              },
              { 
                title: 'Weekend Specials', 
                type: 'Engagement', 
                color: 'bg-secondary',
                desc: 'Drive footfall during peak hours with time-limited exclusive offers.',
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjgdQ_mhpDnwM7-uUkXQSQy90i8SPYPEBNuOawqJBlnB91v1c6J9mMjZgvP2cywwNnBYsZXC9H9oRHlZ9e7eq6SaFnZKA9slCw-jzHCdzUl_kyXTHHdXgZI4J3xtLon6DAVlQT56tyVM-2mR6kgWDOsTcvfIxaG1hO-egkvbt8JdrQytlh-SpMerkfvJL_p5_BMRownv2WV9P-XxZH66UCDuvUffWlG1ABW6GJLJkoPv8bzNIdqmnyzISyAW1y-p_S4FALMDvuSLA0'
              },
              { 
                title: 'Social Blasts', 
                type: 'Network', 
                color: 'bg-zinc-900',
                desc: 'Instant broadcasting to our 500k+ follower network across UAE platforms.',
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAM0zTXRRoGSnRwSJ1xzkdp4YYiwHBxHxUoMRZJ21sHOZy5xOEDRB8rfDdcCLD1CnkhNN3diGdiMMqnYhOg2ccZwRgWJHTsCO5GgYpaTfXu09-3XQ9m7wSAhJ6g2qFNxL5k-4s2m64O7GuIFxPQ0N9VzNzgMvQTgnI3h_CdpO33ThWsSQQzSGAwrqVk5mf8hdu12E35xgT-ygoDiCWZzbMe0tr72zZ8a6cb1QxML6q0_dhMW8u1kkPzOTyX0oCP6RVQheLeFd4iBSPS'
              }
            ].map((promo) => (
              <div key={promo.title} className="group bg-white rounded-lg overflow-hidden border border-slate-50 shadow-sm hover:shadow-2xl transition-all duration-700">
                <div className="h-48 relative overflow-hidden italic">
                  <Image src={promo.image} alt={promo.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
                </div>
                <div className="p-8 relative -mt-12">
                   <span className={`${promo.color} text-white text-[9px] font-bold uppercase tracking-widest px-4 py-1 inline-block mb-4 shadow-xl`}>
                     {promo.type}
                   </span>
                   <h4 className="font-headline text-xl font-bold italic mb-2 group-hover:text-primary transition-colors">{promo.title}</h4>
                   <p className="text-slate-400 font-body text-xs italic mb-6 leading-relaxed">
                     {promo.desc}
                   </p>
                   <button className="text-primary font-body text-[9px] font-bold uppercase tracking-[0.2em] flex items-center gap-2 group-hover:gap-4 transition-all">
                     Launch Campaign <span className="material-symbols-outlined text-sm">arrow_forward</span>
                   </button>
                </div>
              </div>
            ))}
          </section>

          {/* Table Section */}
          <section className="bg-white p-12 rounded-lg border border-slate-50 shadow-sm">
             <div className="flex justify-between items-center mb-10">
               <h3 className="font-headline text-2xl font-bold italic">Active <span className="text-primary">Campaigns</span></h3>
               <div className="flex gap-4">
                 <button className="material-symbols-outlined text-slate-300 hover:text-zinc-900 transition-colors">filter_list</button>
                 <button className="material-symbols-outlined text-slate-300 hover:text-zinc-900 transition-colors">download</button>
               </div>
             </div>
             <div className="overflow-x-auto">
               <table className="w-full text-left">
                 <thead>
                   <tr className="border-b border-slate-50">
                     <th className="pb-6 font-body text-[9px] font-bold uppercase tracking-widest text-slate-400">Campaign</th>
                     <th className="pb-6 font-body text-[9px] font-bold uppercase tracking-widest text-slate-400">Status</th>
                     <th className="pb-6 font-body text-[9px] font-bold uppercase tracking-widest text-slate-400 text-right">Reach</th>
                     <th className="pb-6 font-body text-[9px] font-bold uppercase tracking-widest text-slate-400 text-right">Conversion</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50">
                   {[
                     { name: 'Eid Al-Fitr Feast Promo', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDK984KxyS0-EvYKp75NZSB2faOJNl9fIyTw2CicsVgDS0ESUA1QIw-J0QBhMW7dqKZX1wbXakr-RJWXDdD43bFl-r2Qrfy5lPXuPiZ4eTaJXdBWa60hVXrNxN9Q2tbkGYuM94iKtlYrLrS5dyt88NuICnoIw63MZUJD_zYR75ZcED7e7loAVdMvKWglTizZ9e2pxSE1u79XBfg3imbgJx4Okrb6Oa2im73MyUzYdMuwNSd-9JbRCY54Kd09LwD72UssKuAjD1eGaQ', status: 'Live', reach: '12,402', conv: '6.7%' },
                     { name: 'Rooftop Lounge Night', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVACnKQ2poZ1Oe16LKaK6_N7-mMTkwjOc68MHrVBoCdCU9OQ4YNSNjd2_AxlTF1pDe9GfDs5SYxhrUTEamiQ1CIom-BqkJLYY1J1QcrSNs2nEf9vGM_dQqHNsVHiwK8MIxsxD1VRhbBOZQ7W4G3YkSUaCRdcWMRbuN1VAGLaE5iNoX53IqgEej08pznYqiaga5IGhPAWzZdJtA8VMm4O_ldErkE1lYnqpPxxzTxyR8deAR7Yg2d1zSSDkgHiLnGKMJ6uOqftVBly9B', status: 'Live', reach: '8,190', conv: '3.8%' }
                   ].map((c) => (
                     <tr key={c.name} className="group hover:bg-slate-50 transition-colors">
                       <td className="py-6">
                         <div className="flex items-center gap-6">
                           <div className="w-12 h-12 relative rounded-sm overflow-hidden shrink-0 italic grayscale group-hover:grayscale-0 transition-all duration-500">
                             <Image src={c.image} alt={c.name} fill className="object-cover" />
                           </div>
                           <div>
                             <p className="font-headline font-bold text-sm italic group-hover:text-primary transition-colors">{c.name}</p>
                             <p className="font-body text-[9px] uppercase tracking-widest text-slate-300 font-bold mt-1 tracking-tighter">Campaign Active</p>
                           </div>
                         </div>
                       </td>
                       <td className="py-6">
                         <div className="flex items-center gap-2">
                           <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                           <span className="font-body text-[9px] font-bold uppercase tracking-widest text-secondary italic">{c.status}</span>
                         </div>
                       </td>
                       <td className="py-6 text-right font-headline font-bold italic">{c.reach}</td>
                       <td className="py-6 text-right font-headline font-bold italic">{c.conv}</td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
          </section>
        </div>
      </main>
    </div>
  );
}
