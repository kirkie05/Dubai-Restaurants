import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function BlogManagement() {
  const articles = [
    { id: 1, title: "The Rise of Desert-First Fine Dining", author: "Alexandra Vane", date: "Oct 24, 2024", status: "Published" },
    { id: 2, title: "Atmosphere & Architecture", author: "Liam Chen", date: "Sep 12, 2024", status: "Draft" }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-on-surface">
      <Navbar />
      
      <main className="pt-32 pb-40 px-8 lg:px-16 max-w-[1920px] mx-auto w-full flex flex-col lg:flex-row gap-20">
         {/* Admin Sidebar */}
         <aside className="w-full lg:w-80 shrink-0 space-y-12">
            <header className="space-y-4">
               <span className="text-primary font-body text-[10px] font-black uppercase tracking-[0.4em] block">Master Control</span>
               <h2 className="text-4xl font-headline font-black italic tracking-tighter text-zinc-900">The <br /><span className="text-slate-300">Journal.</span></h2>
            </header>

            <nav className="flex flex-col gap-2">
               <Link href="/admin/dashboard" className="flex items-center gap-4 p-5 text-slate-400 hover:text-zinc-900 transition-colors">
                  <span className="material-symbols-outlined">dashboard</span>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">Dashboard</span>
               </Link>
               <Link href="/admin/blog" className="flex items-center gap-4 p-5 bg-white shadow-xl rounded-3xl text-zinc-900 border border-slate-100">
                  <span className="material-symbols-outlined text-primary">edit_note</span>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">Management</span>
               </Link>
            </nav>
         </aside>

         <div className="flex-grow space-y-16">
            <header className="pb-12 border-b border-slate-200 flex justify-between items-end">
               <div className="space-y-6">
                  <span className="text-secondary font-body text-[10px] font-black uppercase tracking-[0.4em] block mb-4">Content Repository</span>
                  <h1 className="text-6xl md:text-8xl font-headline font-black italic tracking-tighter text-zinc-900">Story <span className="text-slate-300">Archives.</span></h1>
               </div>
               <button className="px-10 py-5 bg-zinc-900 text-white rounded-2xl font-headline font-black text-xl italic hover:bg-primary transition-all shadow-2xl">Create New Bundle</button>
            </header>

            <section className="space-y-6">
               {articles.map((art) => (
                 <div key={art.id} className="p-10 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-12 group hover:shadow-2xl transition-all">
                    <div className="flex-grow space-y-4">
                       <div className="flex items-center gap-4">
                          <span className={`px-4 py-1 flex items-center justify-center rounded-sm text-[8px] font-black uppercase tracking-widest ${art.status === 'Published' ? 'bg-secondary/10 text-secondary' : 'bg-slate-100 text-slate-400'}`}>{art.status}</span>
                          <p className="text-[9px] font-black uppercase tracking-widest text-slate-300">{art.date} · By {art.author}</p>
                       </div>
                       <h3 className="text-3xl font-headline font-black italic text-zinc-900 leading-none group-hover:text-primary transition-colors">{art.title}.</h3>
                    </div>
                    <div className="flex gap-4">
                       <button className="p-4 bg-slate-50 text-slate-400 rounded-full hover:bg-zinc-900 hover:text-white transition-all shadow-sm">
                          <span className="material-symbols-outlined text-sm">edit</span>
                       </button>
                       <button className="p-4 bg-slate-50 text-slate-400 rounded-full hover:bg-primary hover:text-white transition-all shadow-sm">
                          <span className="material-symbols-outlined text-sm">visibility</span>
                       </button>
                    </div>
                 </div>
               ))}
            </section>
         </div>
      </main>
      
      <Footer />
    </div>
  );
}
