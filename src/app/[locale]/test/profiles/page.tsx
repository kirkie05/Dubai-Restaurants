"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { Link } from "@/navigation";

export default function ProfileStylesTestPage() {
  const styles = [
    {
      name: "Diner Profile",
      desc: "Standard user account view with booking history and rewards.",
      href: "/account/profile",
      icon: "person",
      color: "bg-emerald-50 text-emerald-600"
    },
    {
      name: "Authority Dashboard",
      desc: "Restaurant owner view for managing claimed listings and performance.",
      href: "/dashboard",
      icon: "dashboard",
      color: "bg-primary/10 text-primary"
    },
    {
      name: "Partner Business Profile",
      desc: "Formal partner entity view with billing and business verification.",
      href: "/partner/profile",
      icon: "business_center",
      color: "bg-blue-50 text-blue-600"
    },
    {
      name: "The Engine (Super Admin)",
      desc: "Global system command center for bulk operations and pipeline management.",
      href: "/admin/dashboard",
      icon: "settings_suggest",
      color: "bg-zinc-900 text-white"
    },
    {
      name: "Chef Authority (Public)",
      desc: "Public-facing profile for culinary masters showcasing their philosophy.",
      href: "/chefs/alessandro-rossi",
      icon: "restaurant_menu",
      color: "bg-amber-50 text-amber-600"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-40 pb-20 px-6">
        <div className="max-w-4xl mx-auto space-y-16">
          <Reveal className="space-y-6 text-center">
             <span className="text-primary font-body text-[10px] font-black uppercase tracking-[0.4em] block">UI Audit Portal</span>
             <h1 className="text-6xl md:text-8xl font-headline font-black italic tracking-tighter leading-none text-zinc-900">Profile <br /><span className="text-primary">Archetypes.</span></h1>
             <p className="text-xl text-slate-500 font-body italic max-w-xl mx-auto leading-relaxed">
               Preview and test the structural integrity and aesthetic consistency across all platform identity tiers.
             </p>
          </Reveal>

          <div className="grid grid-cols-1 gap-6">
             {styles.map((style) => (
               <Reveal key={style.name} className="group bg-white p-10 rounded-[3rem] border border-slate-100 shadow-2xl hover:shadow-[0_40px_80px_rgba(0,0,0,0.08)] transition-all flex flex-col md:flex-row items-center gap-10">
                  <div className={`w-24 h-24 rounded-[1.5rem] flex items-center justify-center shrink-0 ${style.color}`}>
                     <span className="material-symbols-outlined text-4xl">{style.icon}</span>
                  </div>
                  <div className="flex-grow text-center md:text-left space-y-2">
                     <h3 className="text-3xl font-headline font-black italic tracking-tight">{style.name}</h3>
                     <p className="text-slate-400 font-body italic text-sm">{style.desc}</p>
                  </div>
                  <Link href={style.href} className="bg-zinc-900 text-white px-10 py-5 rounded-2xl font-headline font-black italic text-lg hover:bg-primary transition-all group-hover:scale-105">Launch Preview</Link>
               </Reveal>
             ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
