import { SignUp } from "@clerk/nextjs";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function SignUpPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center pt-32 pb-24 px-8 relative overflow-hidden">
        {/* Background Visual Layer */}
        <div className="absolute top-0 left-0 w-1/2 h-full bg-zinc-900 -skew-x-6 -translate-x-20 z-0"></div>
        
        <div className="max-w-[1920px] w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center z-10">
           {/* Left: Auth Card */}
           <div className="flex justify-center lg:justify-start">
              <SignUp 
                signInUrl="/login" 
                appearance={{
                  elements: {
                    rootBox: 'w-full max-w-[480px]',
                    card: 'bg-white p-10 md:p-14 rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] border border-slate-100 w-full',
                    headerTitle: 'font-headline font-black italic text-3xl text-zinc-900 tracking-tight',
                    headerSubtitle: 'font-body italic text-sm text-slate-400',
                    socialButtonsBlockButton: 'rounded-2xl border-slate-200 hover:bg-slate-50 transition-all py-3',
                    formButtonPrimary: 'bg-zinc-900 hover:bg-primary text-white font-headline italic font-black rounded-2xl py-4 transition-all text-sm',
                    formFieldInput: 'bg-slate-50 border-b-2 border-slate-100 py-4 px-6 rounded-2xl focus:border-primary outline-none transition-all text-sm',
                    footerActionLink: 'text-primary hover:text-zinc-900 font-bold',
                  }
                }}
              />
           </div>

           {/* Right: Content */}
           <div className="text-right lg:text-left space-y-12">
              <div className="space-y-6">
                 <span className="text-primary font-body text-[10px] font-black uppercase tracking-[0.4em] block">Member Privileges</span>
                 <h1 className="text-6xl md:text-9xl font-headline font-black italic tracking-tighter leading-[0.8] text-white">The <br /><span className="text-primary">Treasury.</span></h1>
                 <p className="text-xl text-zinc-400 font-body italic leading-relaxed max-w-lg lg:ml-0 ml-auto">
                    Unlock preferred seating, priority table releases, and personalized concierge support across the city&apos;s finest venues.
                 </p>
              </div>

              <div className="flex gap-12 items-center justify-end lg:justify-start pt-8 border-t border-white/5">
                 <div className="space-y-1">
                    <p className="text-[9px] font-black uppercase tracking-widest text-zinc-600">Global Perks</p>
                    <p className="text-sm font-headline font-black italic text-zinc-300">Michelin Table Access</p>
                 </div>
                 <div className="w-px h-10 bg-white/5"></div>
                 <div className="space-y-1">
                    <p className="text-[9px] font-black uppercase tracking-widest text-zinc-600">Support</p>
                    <p className="text-sm font-headline font-black italic text-zinc-300">24/7 Concierge</p>
                 </div>
              </div>
           </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
