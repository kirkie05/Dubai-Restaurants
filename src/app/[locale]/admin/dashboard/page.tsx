"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/ui/Reveal";
import Image from "next/image";
import { Link } from '@/navigation';

export default function SuperAdminDashboard() {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col text-white">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto space-y-20">
          <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-12">
            <header className="space-y-6">
              <div className="flex items-center gap-4">
                 <span className="text-primary font-body text-[10px] font-black uppercase tracking-[0.4em] block">Central Command</span>
                 <div className="w-12 h-px bg-zinc-800"></div>
                 <span className="text-zinc-500 font-body text-[10px] font-black uppercase tracking-[0.4em] block">Super Admin Access</span>
              </div>
              <h1 className="text-6xl md:text-9xl font-headline font-black italic tracking-tighter leading-none">The <br /><span className="text-primary">Engine.</span></h1>
            </header>
            
            <div className="flex gap-4">
               <Link href="/admin/import" className="bg-primary text-white px-10 py-5 rounded-2xl font-headline font-black italic text-lg hover:bg-white hover:text-zinc-900 transition-all shadow-[0_20px_50px_rgba(220,38,38,0.3)]">Launch Bulk Import</Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
             {[
               { label: "Total Venues", val: "1,240", icon: "restaurant", trend: "+12% this month" },
               { label: "Elite Members", val: "54.2k", icon: "group", trend: "+5k this week" },
               { label: "Claimed Authority", val: "342", icon: "verified", trend: "28% conversion" },
               { label: "Active Bookings", val: "8.1k", icon: "event_available", trend: "High Demand" }
             ].map((stat) => (
               <div key={stat.label} className="bg-zinc-900 p-8 rounded-[3rem] border border-zinc-800 space-y-6 hover:border-primary/30 transition-all group">
                  <div className="flex justify-between items-start">
                     <span className="material-symbols-outlined text-primary text-3xl">{stat.icon}</span>
                     <span className="text-[8px] font-black uppercase tracking-widest text-emerald-500">{stat.trend}</span>
                  </div>
                  <div className="space-y-1">
                     <p className="text-4xl font-headline font-black italic">{stat.val}</p>
                     <p className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">{stat.label}</p>
                  </div>
               </div>
             ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
             <div className="lg:col-span-8 space-y-12">
                <Reveal className="bg-zinc-900/50 backdrop-blur-xl p-12 rounded-[4rem] border border-zinc-800 space-y-10">
                   <div className="flex justify-between items-center">
                      <h3 className="font-headline font-black italic text-3xl tracking-tight">Recent <span className="text-primary">Claim Requests</span></h3>
                      <button className="text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">View All Pipeline</button>
                   </div>
                   
                   <div className="space-y-4">
                      {[
                        { name: "Saffron Lounge", time: "2h ago", status: "Pending Review" },
                        { name: "Aqua Marine", time: "5h ago", status: "Identity Verified" },
                        { name: "The Dune Club", time: "12h ago", status: "Payment Processing" }
                      ].map((req, i) => (
                        <div key={i} className="flex items-center justify-between p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-primary/20 transition-all group">
                           <div className="flex items-center gap-6">
                              <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                 <span className="material-symbols-outlined">person_search</span>
                              </div>
                              <div>
                                 <h4 className="font-headline font-black italic text-xl">{req.name}</h4>
                                 <p className="text-[10px] text-zinc-500 font-body italic">{req.time}</p>
                              </div>
                           </div>
                           <div className="text-right flex items-center gap-6">
                              <span className="text-[9px] font-black uppercase text-zinc-400 tracking-widest">{req.status}</span>
                              <button className="material-symbols-outlined text-zinc-600 hover:text-white transition-colors">more_vert</button>
                           </div>
                        </div>
                      ))}
                   </div>
                </Reveal>
             </div>

             <aside className="lg:col-span-4 space-y-8">
                <div className="bg-primary p-12 rounded-[4rem] text-white space-y-8 shadow-2xl relative overflow-hidden group">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 blur-[60px] rounded-full"></div>
                   <h3 className="text-4xl font-headline font-black italic tracking-tighter leading-none relative z-10">System <br />Integrity.</h3>
                   <div className="space-y-4 relative z-10">
                      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-white/60">
                         <span>API Status</span>
                         <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div> Operational</span>
                      </div>
                      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-white/60">
                         <span>DB Sync</span>
                         <span className="text-white">Active</span>
                      </div>
                   </div>
                   <button className="w-full bg-white text-zinc-900 py-5 rounded-2xl font-headline font-black italic text-lg hover:bg-zinc-900 hover:text-white transition-all relative z-10">System Audit</button>
                </div>

                <div className="bg-zinc-900 p-10 rounded-[3rem] border border-zinc-800 space-y-8">
                   <h4 className="font-headline font-black italic text-xl">Operational Tools</h4>
                   <div className="space-y-4">
                      <Link href="/admin/import" className="flex items-center gap-4 p-4 rounded-2xl hover:bg-zinc-800 transition-all group">
                         <span className="material-symbols-outlined text-primary">upload_file</span>
                         <span className="font-body italic text-sm text-zinc-400 group-hover:text-white">Bulk Data Engine</span>
                      </Link>
                      <button className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-zinc-800 transition-all group">
                         <span className="material-symbols-outlined text-primary">analytics</span>
                         <span className="font-body italic text-sm text-zinc-400 group-hover:text-white">Global Curation Metrics</span>
                      </button>
                      <button className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-zinc-800 transition-all group">
                         <span className="material-symbols-outlined text-primary">mail</span>
                         <span className="font-body italic text-sm text-zinc-400 group-hover:text-white">Blast Communications</span>
                      </button>
                   </div>
                </div>
             </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
