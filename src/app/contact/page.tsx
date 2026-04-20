import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-on-surface">
      <Navbar />
      
      <main className="pt-32 pb-40">
        <header className="max-w-[1920px] mx-auto px-8 lg:px-16 mb-32">
          <div className="flex flex-col lg:flex-row items-end justify-between gap-16 pb-16 border-b border-slate-100">
             <div className="space-y-6 max-w-4xl">
                <span className="text-primary font-body text-[10px] font-black uppercase tracking-[0.4em] text-primary">The Concierge Desk</span>
                <h1 className="text-6xl md:text-9xl font-headline font-black italic tracking-tighter leading-[0.85] text-on-surface">
                   The <br /><span className="text-zinc-400">Dialogue.</span>
                </h1>
                <p className="text-xl text-slate-500 font-body italic leading-relaxed max-w-xl">
                   Connect with our digital curators for partnership inquiries, booking resets, or culinary consultations.
                </p>
             </div>
             <div className="flex flex-col items-end text-right">
                <span className="text-4xl font-headline font-black italic">24/7</span>
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Response Window</span>
             </div>
          </div>
        </header>

        <section className="max-w-[1920px] mx-auto px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-24">
           <div className="lg:col-span-12 xl:col-span-8">
              <form className="space-y-16">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div className="space-y-4">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-300">Identity</label>
                       <input type="text" placeholder="YOUR NAME" className="w-full bg-transparent border-b-2 border-slate-100 py-6 font-headline font-black italic text-3xl placeholder:text-slate-100 focus:border-primary outline-none transition-all" />
                    </div>
                    <div className="space-y-4">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-300">Communication</label>
                       <input type="email" placeholder="EMAIL@DESTINATION.COM" className="w-full bg-transparent border-b-2 border-slate-100 py-6 font-headline font-black italic text-3xl placeholder:text-slate-100 focus:border-primary outline-none transition-all" />
                    </div>
                 </div>

                 <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-300">Subject of Inquiry</label>
                    <select className="w-full bg-transparent border-b-2 border-slate-100 py-6 font-headline font-black italic text-3xl outline-none appearance-none cursor-pointer">
                       <option>Partnership & Listing</option>
                       <option>Concierge Service</option>
                       <option>Media Inquiry</option>
                       <option>System Feedback</option>
                    </select>
                 </div>

                 <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-300">The Message</label>
                    <textarea placeholder="HOW CAN WE CURATE YOUR EXPERIENCE?" className="w-full bg-transparent border-b-2 border-slate-100 py-6 font-body italic text-2xl placeholder:text-slate-100 focus:border-primary outline-none transition-all resize-none h-40" />
                 </div>

                 <button className="bg-zinc-900 text-white px-16 py-8 rounded-[2.5rem] font-headline font-black text-2xl italic tracking-tight shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] hover:bg-primary transition-all group flex items-center gap-6">
                    Dispatch Inquiry
                    <span className="material-symbols-outlined group-hover:translate-x-4 transition-transform">send</span>
                 </button>
              </form>
           </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
