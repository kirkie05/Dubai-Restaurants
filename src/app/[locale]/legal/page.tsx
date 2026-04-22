import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function LegalPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-on-surface">
      <Navbar />
      
      <main className="pt-32 pb-40">
        <header className="max-w-[1920px] mx-auto px-8 lg:px-16 mb-40">
          <div className="flex flex-col lg:flex-row items-end justify-between gap-16 pb-16 border-b border-slate-100">
             <div className="space-y-6 max-w-4xl">
                <span className="text-primary font-body text-[10px] font-black uppercase tracking-[0.4em] block">Governing Manifestos</span>
                <h1 className="text-6xl md:text-9xl font-headline font-black italic tracking-tighter leading-[0.85] text-on-surface">
                   Terms & <br /><span className="text-primary">Privacy.</span>
                </h1>
                <p className="text-xl text-slate-500 font-body italic leading-relaxed max-w-xl">
                   The legal framework that ensures the integrity and exclusivity of the Dubai Restaurants experience.
                </p>
             </div>
             <div className="flex flex-col items-end text-right">
                <span className="text-4xl font-headline font-black italic">V.2.0</span>
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Revision Date: Oct 2024</span>
             </div>
          </div>
        </header>

        <section className="max-w-5xl mx-auto px-8 space-y-24">
           <div className="space-y-12">
              <h2 className="text-4xl font-headline font-black italic text-zinc-900 border-l-4 border-primary pl-10">01. Digital Curation.</h2>
              <div className="space-y-8 text-xl text-slate-700 font-body italic leading-relaxed">
                 <p>By accessing the Dubai Restaurants (DRD), you enter a curated narrative. Our data is verified at the point of publication, but the atmospheric nature of high-fidelity dining means changes are constant. We curate, but the masters command the experience.</p>
                 <p>You agree to use this repository for personal discovery only. Any extraction of curated architectural data or chef manifestos for commercial use is strictly prohibited.</p>
              </div>
           </div>

           <div className="space-y-12">
              <h2 className="text-4xl font-headline font-black italic text-zinc-900 border-l-4 border-primary pl-10">02. Data Sovereignty.</h2>
              <div className="space-y-8 text-xl text-slate-700 font-body italic leading-relaxed">
                 <p>Your privacy is our priority. We collect your identification email and dining preferences solely to curate your journey within our directory. We do not sell your narrative to third-party brokers.</p>
                 <p>All transactional data related to reservations is encrypted using premium cryptographic sequences, ensuring your presence remains confidential.</p>
              </div>
           </div>

           <div className="pt-20 border-t border-slate-100 italic text-slate-400 font-body text-sm text-center">
              Questions regarding these manifestos should be directed to the Legal Desk at concierge@dubaidirectory.com
           </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
