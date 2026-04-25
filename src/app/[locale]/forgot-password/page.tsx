import { Link } from '@/navigation';
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function ForgotPasswordPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center pt-32 pb-24 px-8 relative overflow-hidden">
        <div className="max-w-[1920px] w-full mx-auto flex items-center justify-center z-10">
           <div className="bg-white p-12 md:p-20 rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] border border-slate-50 w-full max-w-[560px] space-y-12 animate-float">
              <div className="text-center space-y-4">
                 <span className="text-primary font-body text-[10px] font-black uppercase tracking-[0.4em] block">Security Reset</span>
                 <h2 className="text-4xl font-headline font-black italic text-zinc-900">Restore Access.</h2>
                 <p className="text-sm text-slate-400 font-body italic max-w-[320px] mx-auto">Enter your identification email to receive a secure restoration sequence.</p>
              </div>

              <form className="space-y-10">
                 <div className="space-y-4">
                    <input type="email" placeholder="IDENTIFICATION EMAIL" className="w-full bg-slate-50 border-b-2 border-slate-100 py-6 px-8 rounded-2xl font-headline font-black italic text-xl placeholder:text-slate-200 focus:border-primary outline-none transition-all" />
                 </div>

                 <button className="w-full bg-zinc-900 text-white py-6 rounded-2xl font-headline font-black text-xl italic shadow-2xl hover:bg-primary transition-all group flex items-center justify-center gap-4">
                    Send Link
                    <span className="material-symbols-outlined group-hover:translate-x-4 transition-transform">send</span>
                 </button>
                 
                 <div className="text-center pt-8 border-t border-slate-50">
                    <Link href="/login" className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-primary transition-colors">Return to Session Entry</Link>
                 </div>
              </form>
           </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
