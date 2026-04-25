"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/ui/Reveal";
import Image from "next/image";
import { Link } from '@/navigation';

export default function PartnerProfilePage() {
  // Static Demo Identity
  const activeUser = {
    fullName: "Isabella Rossi",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-12">
            <header className="space-y-6">
              <div className="flex items-center gap-4">
                 <span className="text-primary font-body text-[10px] font-black uppercase tracking-[0.4em] block">Business Authority</span>
                 <div className="w-12 h-px bg-slate-200"></div>
                 <span className="text-zinc-400 font-body text-[10px] font-black uppercase tracking-[0.4em] block">Official Partner</span>
              </div>
              <h1 className="text-6xl md:text-9xl font-headline font-black italic tracking-tighter leading-none">The <br /><span className="text-primary">Partner.</span></h1>
            </header>
            
            <div className="flex items-center gap-8 bg-zinc-900 p-8 rounded-[3rem] text-white shadow-2xl">
               <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-primary">
                  <Image src={activeUser.imageUrl} alt="Partner" fill className="object-cover" />
               </div>
               <div className="space-y-1">
                  <p className="text-[9px] font-black uppercase text-primary tracking-widest">Account Manager</p>
                  <h4 className="text-2xl font-headline font-black italic">{activeUser.fullName}</h4>
               </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
             <div className="lg:col-span-8 space-y-12">
                <Reveal className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-2xl space-y-10">
                   <div className="flex justify-between items-center">
                      <h3 className="font-headline font-black italic text-3xl tracking-tight">Active Portfolios</h3>
                      <Link href="/partner/registration" className="text-[10px] font-black uppercase tracking-widest text-primary border-b border-primary/20 pb-1">Start New Onboarding</Link>
                   </div>
                   
                   <div className="space-y-6">
                      <div className="group flex gap-8 items-center p-8 rounded-[2rem] bg-slate-50 hover:bg-white border border-transparent hover:border-slate-100 hover:shadow-xl transition-all cursor-pointer">
                         <div className="relative w-24 h-24 rounded-2xl overflow-hidden shadow-lg">
                            <Image src="/cuisine_japanese_high_fidelity_1776785722454.png" alt="Restaurant" fill className="object-cover group-hover:scale-105 transition-transform" />
                         </div>
                         <div className="flex-grow space-y-1">
                            <h4 className="text-2xl font-headline font-black italic">Al Safa Club</h4>
                            <p className="text-xs text-slate-400 font-body italic">Premium Plan • Downtown Dubai</p>
                         </div>
                         <div className="text-right space-y-1">
                            <p className="text-2xl font-headline font-black italic text-primary">4.9</p>
                            <p className="text-[8px] font-black uppercase text-slate-300 tracking-widest">Curation Score</p>
                         </div>
                      </div>
                   </div>
                </Reveal>

                <Reveal className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="bg-zinc-900 p-12 rounded-[3.5rem] text-white space-y-6 shadow-2xl">
                      <span className="material-symbols-outlined text-primary text-4xl">payments</span>
                      <h4 className="text-3xl font-headline font-black italic">Billing & Revenue</h4>
                      <p className="text-zinc-500 font-body italic text-sm leading-relaxed">Manage your premium subscriptions and view booking commission reports.</p>
                      <button className="text-primary font-body text-[10px] font-black uppercase tracking-widest border-b border-primary/20 pb-1">Manage Billing</button>
                   </div>
                   <div className="bg-white p-12 rounded-[3.5rem] border border-slate-100 space-y-6 shadow-2xl">
                      <span className="material-symbols-outlined text-zinc-300 text-4xl">support_agent</span>
                      <h4 className="text-3xl font-headline font-black italic text-zinc-900">Partner Support</h4>
                      <p className="text-slate-400 font-body italic text-sm leading-relaxed">Direct line to your dedicated editorial account manager for priority updates.</p>
                      <button className="text-zinc-900 font-body text-[10px] font-black uppercase tracking-widest border-b border-zinc-900/20 pb-1">Open Ticket</button>
                   </div>
                </Reveal>
             </div>

             <aside className="lg:col-span-4 space-y-8">
                <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl space-y-8">
                   <h3 className="font-headline font-black italic text-xl">Verification Details</h3>
                   <div className="space-y-6">
                      <div className="space-y-2">
                         <p className="text-[9px] font-black uppercase text-slate-300 tracking-widest">Business License</p>
                         <p className="text-sm font-body italic font-bold">DT-992384-XB</p>
                      </div>
                      <div className="space-y-2">
                         <p className="text-[9px] font-black uppercase text-slate-300 tracking-widest">Registered Phone</p>
                         <p className="text-sm font-body italic font-bold">+971 50 123 4567</p>
                      </div>
                      <div className="space-y-2">
                         <p className="text-[9px] font-black uppercase text-slate-300 tracking-widest">Ownership Tier</p>
                         <span className="inline-block bg-emerald-50 text-emerald-600 px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">Verified Elite</span>
                      </div>
                   </div>
                </div>

                <div className="bg-primary/5 p-10 rounded-[3rem] border border-primary/10 space-y-6">
                   <h4 className="font-headline font-black italic text-xl text-primary">Authority Benefits</h4>
                   <ul className="space-y-4 text-xs font-body italic text-slate-500">
                      <li className="flex gap-3"><span className="material-symbols-outlined text-primary text-sm">check</span> 24/7 Editorial priority</li>
                      <li className="flex gap-3"><span className="material-symbols-outlined text-primary text-sm">check</span> High-res gallery hosting</li>
                      <li className="flex gap-3"><span className="material-symbols-outlined text-primary text-sm">check</span> Direct concierge line</li>
                   </ul>
                </div>
             </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
