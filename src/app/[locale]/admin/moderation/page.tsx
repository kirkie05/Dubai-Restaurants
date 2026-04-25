import { Link } from '@/navigation';
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function ReviewsModeration() {
  const reviews = [
    { id: 1, user: "Liam Chen", restaurant: "Al Mahara", text: "Exceptional plating and service. A true Burj Al Arab gem.", status: "Pending", rating: 5 },
    { id: 2, user: "Sarah J.", restaurant: "Zuma", text: "A bit loud during peak hours, but the wagyu is unmatched.", status: "Pending", rating: 4 }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-on-surface">
      <Navbar />
      
      <main className="pt-32 pb-40 px-8 lg:px-16 max-w-[1920px] mx-auto w-full flex flex-col lg:flex-row gap-20">
         {/* Admin Sidebar */}
         <aside className="w-full lg:w-80 shrink-0 space-y-12">
            <header className="space-y-4">
               <span className="text-primary font-body text-[10px] font-black uppercase tracking-[0.4em] block">Master Control</span>
               <h2 className="text-4xl font-headline font-black italic tracking-tighter text-zinc-900">The <br /><span className="text-slate-300">Vault.</span></h2>
            </header>

            <nav className="flex flex-col gap-2">
               <Link href="/admin/dashboard" className="flex items-center gap-4 p-5 text-slate-400 hover:text-zinc-900 transition-colors">
                  <span className="material-symbols-outlined">dashboard</span>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">Dashboard</span>
               </Link>
               <Link href="/admin/moderation" className="flex items-center gap-4 p-5 bg-white shadow-xl rounded-3xl text-zinc-900 border border-slate-100">
                  <span className="material-symbols-outlined text-primary">rate_review</span>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">Moderation</span>
               </Link>
            </nav>
         </aside>

         <div className="flex-grow space-y-16">
            <header className="pb-12 border-b border-slate-200">
               <span className="text-secondary font-body text-[10px] font-black uppercase tracking-[0.4em] block mb-4">Quality Control</span>
               <h1 className="text-6xl md:text-8xl font-headline font-black italic tracking-tighter text-zinc-900">Review <span className="text-primary">Sanctity.</span></h1>
            </header>

            <section className="space-y-6">
               {reviews.map((rev) => (
                 <div key={rev.id} className="p-10 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col md:flex-row gap-12 items-center group hover:shadow-2xl transition-all">
                    <div className="flex-grow space-y-6">
                       <div className="flex justify-between items-start">
                          <div>
                             <h3 className="text-2xl font-headline font-black italic text-zinc-900 leading-none">{rev.restaurant}</h3>
                             <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-2">By {rev.user}</p>
                          </div>
                          <div className="flex gap-1 text-primary">
                             {[...Array(rev.rating)].map((_, i) => (
                               <span key={i} className="material-symbols-outlined text-sm" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                             ))}
                          </div>
                       </div>
                       <p className="text-xl font-body italic text-slate-500 leading-relaxed">&quot;{rev.text}&quot;</p>
                    </div>
                    <div className="flex gap-4">
                       <button className="p-4 bg-primary text-white rounded-full hover:bg-zinc-900 transition-all shadow-xl">
                          <span className="material-symbols-outlined text-sm">check</span>
                       </button>
                       <button className="p-4 bg-slate-100 text-slate-400 rounded-full hover:bg-primary hover:text-white transition-all shadow-sm">
                          <span className="material-symbols-outlined text-sm">close</span>
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
