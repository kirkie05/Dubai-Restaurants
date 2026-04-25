import { Link } from '@/navigation';
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center pt-32 pb-24 px-8 relative overflow-hidden">
        {/* Background Visual Layer */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-zinc-900 skew-x-6 translate-x-20 z-0"></div>
        
        <div className="max-w-[1920px] w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center z-10">
           {/* Left: Content */}
           <div className="space-y-12">
              <div className="space-y-6">
                 <span className="text-primary font-body text-[10px] font-black uppercase tracking-[0.4em] block">Digital Curation</span>
                 <h1 className="text-6xl md:text-9xl font-headline font-black italic tracking-tighter leading-[0.8] text-on-surface">The <br /><span className="text-primary">Access.</span></h1>
                 <p className="text-xl text-slate-500 font-body italic leading-relaxed max-w-lg">
                    Enter the city&apos;s most exclusive gastronomic repository. Your curated journey resumes here.
                 </p>
              </div>

              <div className="flex gap-12 items-center pt-8 border-t border-slate-100">
                 <div className="space-y-1">
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-300">Member Status</p>
                    <p className="text-sm font-headline font-black italic">Elite Dining Tier</p>
                 </div>
                 <div className="w-px h-10 bg-slate-100"></div>
                 <div className="space-y-1">
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-300">Access Type</p>
                    <p className="text-sm font-headline font-black italic">Verified Curator</p>
                 </div>
              </div>
           </div>

           {/* Right: Auth Card */}
           <div className="flex justify-center lg:justify-end">
              <div className="bg-white p-12 md:p-20 rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] border border-slate-50 w-full max-w-[560px] space-y-12 animate-float">
                 <div className="text-center space-y-4">
                    <h2 className="text-4xl font-headline font-black italic text-zinc-900">Sign In.</h2>
                    <p className="text-sm text-slate-400 font-body italic">Connect your credentials to access your treasury.</p>
                 </div>

                 <form className="space-y-10">
                    <div className="space-y-4">
                       <input type="email" placeholder="EMAIL ADDRESS" className="w-full bg-slate-50 border-b-2 border-slate-100 py-6 px-8 rounded-2xl font-headline font-black italic text-xl placeholder:text-slate-200 focus:border-primary outline-none transition-all" />
                       <input type="password" placeholder="PASSWORD" className="w-full bg-slate-50 border-b-2 border-slate-100 py-6 px-8 rounded-2xl font-headline font-black italic text-xl placeholder:text-slate-200 focus:border-primary outline-none transition-all" />
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                       <div className="flex items-center gap-2">
                          <input type="checkbox" className="w-4 h-4 rounded border-slate-200 text-primary" />
                          <span>Remember Me</span>
                       </div>
                       <Link href="/forgot-password" title="Forgot Password Page" className="hover:text-primary">Forgot Password?</Link>
                    </div>

                    <button className="w-full bg-zinc-900 text-white py-6 rounded-2xl font-headline font-black text-xl italic shadow-2xl hover:bg-primary transition-all group flex items-center justify-center gap-4">
                       Authenticate
                       <span className="material-symbols-outlined group-hover:translate-x-4 transition-transform">east</span>
                    </button>
                    
                    <div className="text-center pt-8 border-t border-slate-50">
                       <p className="text-sm text-slate-400 font-body italic mb-4">No portfolio yet?</p>
                       <Link href="/sign-up" className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Join the Selection</Link>
                    </div>
                 </form>
              </div>
           </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
