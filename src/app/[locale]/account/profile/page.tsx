"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/ui/Reveal";
import Image from "next/image";

export default function UserProfilePage() {
  // Static Demo Identity
  const activeUser = {
    fullName: "Alexander Hamilton",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Sidebar Info */}
          <aside className="lg:col-span-4 space-y-8">
            <Reveal className="bg-zinc-900 rounded-[3rem] p-10 text-white space-y-8 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[60px] rounded-full"></div>
               
               <div className="relative z-10 space-y-6 text-center">
                  <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-primary shadow-2xl">
                     <Image src={activeUser.imageUrl} alt="Profile" fill className="object-cover" />
                  </div>
                  <div className="space-y-1">
                     <h2 className="text-3xl font-headline font-black italic tracking-tighter">{activeUser.fullName}</h2>
                     <p className="text-[10px] font-black uppercase text-primary tracking-[0.4em]">Elite Member</p>
                  </div>
               </div>

               <div className="pt-8 border-t border-white/5 space-y-6 relative z-10">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-zinc-500">
                     <span>Member Since</span>
                     <span className="text-white">Oct 2023</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-zinc-500">
                     <span>Total Bookings</span>
                     <span className="text-white">12</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-zinc-500">
                     <span>Elite Status</span>
                     <span className="text-primary font-black">Active</span>
                  </div>
               </div>
            </Reveal>

            <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-xl space-y-8">
               <h3 className="font-headline font-black italic text-xl">Quick Actions</h3>
               <div className="space-y-4">
                  <button className="w-full text-left p-4 rounded-2xl hover:bg-slate-50 transition-all flex items-center justify-between group">
                     <span className="font-body italic text-sm text-slate-500 group-hover:text-zinc-900 transition-colors">Edit Personal Details</span>
                     <span className="material-symbols-outlined text-sm text-slate-300">chevron_right</span>
                  </button>
                  <button className="w-full text-left p-4 rounded-2xl hover:bg-slate-50 transition-all flex items-center justify-between group">
                     <span className="font-body italic text-sm text-slate-500 group-hover:text-zinc-900 transition-colors">Manage Reservations</span>
                     <span className="material-symbols-outlined text-sm text-slate-300">chevron_right</span>
                  </button>
               </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-8 space-y-12">
            <Reveal className="space-y-8">
               <header className="space-y-4">
                  <h1 className="text-6xl md:text-8xl font-headline font-black italic tracking-tighter leading-none">Your <br /><span className="text-primary">Journal.</span></h1>
                  <p className="text-xl text-slate-500 font-body italic max-w-xl leading-relaxed">
                    Explore your personal history with Dubai&apos;s culinary landscape. Your verified bookings, hidden gem discoveries, and elite preferences.
                  </p>
               </header>

               <div className="grid grid-cols-1 gap-6">
                  <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-2xl flex items-center gap-8">
                     <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary text-3xl">restaurant</span>
                     </div>
                     <div className="flex-grow">
                        <h4 className="font-headline font-black text-2xl italic tracking-tight">Upcoming: Zuma Dubai</h4>
                        <p className="text-sm text-slate-400 font-body italic uppercase tracking-widest mt-1">Tomorrow, 20:30 • 4 Guests</p>
                     </div>
                     <button className="bg-zinc-900 text-white px-8 py-4 rounded-xl font-headline font-black italic text-xs hover:bg-primary transition-all">Manage</button>
                  </div>
                  
                  <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-2xl flex items-center gap-8 opacity-50">
                     <div className="w-20 h-20 rounded-2xl bg-zinc-100 flex items-center justify-center">
                        <span className="material-symbols-outlined text-zinc-400 text-3xl">history</span>
                     </div>
                     <div className="flex-grow">
                        <h4 className="font-headline font-black text-2xl italic tracking-tight text-zinc-400">Past: Al Mahara</h4>
                        <p className="text-sm text-zinc-300 font-body italic uppercase tracking-widest mt-1">Completed • Oct 12, 2023</p>
                     </div>
                  </div>
               </div>
            </Reveal>

            <Reveal className="bg-zinc-900 rounded-[4rem] p-16 text-white space-y-10 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>
               <div className="space-y-4 max-w-xl relative z-10">
                  <span className="text-primary font-body text-[10px] font-black uppercase tracking-[0.4em] block">Curator Rewards</span>
                  <h3 className="text-5xl font-headline font-black italic tracking-tighter leading-none">The <span className="text-primary">Heritage</span> Benefits.</h3>
                  <p className="text-zinc-400 font-body italic leading-relaxed">
                     As an elite member, you have early access to new restaurant openings and private tasting menus.
                  </p>
               </div>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10 pt-8">
                  {[
                    { label: "Points", val: "2.4k" },
                    { label: "Priority", val: "Tier 1" },
                    { label: "Visits", val: "34" },
                    { label: "Badges", val: "8" }
                  ].map(stat => (
                    <div key={stat.label} className="space-y-1">
                       <p className="text-3xl font-headline font-black italic text-white">{stat.val}</p>
                       <p className="text-[8px] font-black uppercase text-zinc-500 tracking-widest">{stat.label}</p>
                    </div>
                  ))}
               </div>
            </Reveal>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
