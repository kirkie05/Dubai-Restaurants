import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function AdminDashboard() {
  const systemHealth = [
    { label: "Total Venues", value: "1,240", status: "Verified" },
    { label: "Active Partners", value: "892", status: "Elite" },
    { label: "Curation Backlog", value: "12", status: "Pending" },
    { label: "System Revenue", value: "AED 3.4M", status: "Monthly" },
  ];

  const MENU_ITEMS = [
    { name: "Venue Approvals", path: "/admin/approvals", icon: "verified" },
    { name: "Reviews Moderation", path: "/admin/moderation", icon: "rate_review" },
    { name: "Blog Repository", path: "/admin/blog", icon: "edit_note" },
    { name: "User Management", path: "/admin/users", icon: "group" },
    { name: "Ad Placements", path: "/admin/ads", icon: "ads_click" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-on-surface">
      <Navbar />
      
      <main className="pt-32 pb-40 px-8 lg:px-16 max-w-[1920px] mx-auto w-full flex flex-col lg:flex-row gap-20">
         {/* Admin Sidebar */}
         <aside className="w-full lg:w-80 shrink-0 space-y-12">
            <header className="space-y-4">
               <span className="text-primary font-body text-[10px] font-black uppercase tracking-[0.4em] block">Master Control</span>
               <h2 className="text-4xl font-headline font-black italic tracking-tighter text-zinc-900">The <br /><span className="text-primary">Hub.</span></h2>
            </header>

            <nav className="flex flex-col gap-2">
               {MENU_ITEMS.map((item) => (
                 <Link key={item.path} href={item.path} className="flex items-center justify-between p-5 rounded-3xl border border-transparent hover:border-slate-100 hover:bg-white hover:shadow-xl transition-all group">
                    <div className="flex items-center gap-4">
                       <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors">{item.icon}</span>
                       <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 group-hover:text-zinc-900 transition-colors">{item.name}</span>
                    </div>
                    <span className="material-symbols-outlined text-transparent group-hover:text-primary transition-colors text-sm">east</span>
                 </Link>
               ))}
            </nav>
         </aside>

         {/* Content Area */}
         <div className="flex-grow space-y-16">
            <header className="pb-12 border-b border-slate-200 flex justify-between items-end">
               <div className="space-y-6">
                  <span className="text-primary font-body text-[10px] font-black uppercase tracking-[0.4em] block mb-4">System Intelligence</span>
                  <h1 className="text-6xl md:text-8xl font-headline font-black italic tracking-tighter text-zinc-900">Global <span className="text-primary">Pulse.</span></h1>
               </div>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               {systemHealth.map((stat, i) => (
                 <div key={i} className="p-10 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6 hover:shadow-2xl transition-all group">
                    <div className="flex justify-between items-start">
                       <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">{stat.status}</span>
                       <span className="material-symbols-outlined text-slate-200 group-hover:text-primary transition-colors">monitoring</span>
                    </div>
                    <div>
                       <p className="text-4xl font-headline font-black italic text-zinc-900">{stat.value}</p>
                       <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mt-2">{stat.label}</p>
                    </div>
                 </div>
               ))}
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-12 gap-12">
               <div className="lg:col-span-12 p-12 bg-white rounded-[3rem] border border-slate-100 shadow-sm space-y-12">
                  <div className="flex justify-between items-center">
                     <h3 className="text-3xl font-headline font-black italic text-zinc-900">Pending Approvals.</h3>
                     <Link href="/admin/approvals" className="text-primary font-body text-[10px] font-black uppercase tracking-[0.3em] border-b border-primary/20 pb-1 hover:border-primary transition-all">Review All</Link>
                  </div>
                  <div className="space-y-6 text-zinc-900">
                     {[1, 2, 3].map(i => (
                       <div key={i} className="flex items-center justify-between p-8 bg-slate-50 rounded-2xl group hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-slate-100">
                          <div className="flex gap-8 items-center">
                             <div className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center text-white font-headline font-black italic">V</div>
                             <div>
                                <p className="text-xl font-headline font-black italic">Venue Application #{i}842</p>
                                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">DIFC · Fine Dining · Submitted 2h ago</p>
                             </div>
                          </div>
                          <div className="flex gap-4">
                             <button className="px-6 py-2 bg-primary text-white rounded-lg text-[9px] font-black uppercase tracking-widest">Approve</button>
                             <button className="px-6 py-2 bg-slate-200 text-slate-400 rounded-lg text-[9px] font-black uppercase tracking-widest">Reject</button>
                          </div>
                       </div>
                     ))}
                  </div>
               </div>
            </section>
         </div>
      </main>
      
      <Footer />
    </div>
  );
}
