import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function BookingCancellation() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center pt-24 px-8">
        <div className="max-w-2xl w-full text-center space-y-16">
           <div className="space-y-6">
              <span className="text-primary font-body text-[10px] font-black uppercase tracking-[0.4em] block">Voiding Sequence</span>
              <h1 className="text-6xl md:text-8xl font-headline font-black italic tracking-tighter leading-none text-on-surface">The <span className="text-zinc-300">Cancellation.</span></h1>
              <p className="text-xl text-slate-400 font-body italic leading-relaxed max-w-xl mx-auto">
                 Are you certain you wish to relinquish your placement for **Al-Maha Crystal Lounge**? 
                 This action is irreversible within the current curation window.
              </p>
           </div>

           <div className="p-12 bg-slate-50 rounded-[3rem] space-y-8 border border-slate-100">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Please Select a Reason</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {["CHANGE OF PLANS", "UNEXPECTED CONFLICT", "FOUND ALTERNATIVE", "PRICE POINT"].map(reason => (
                   <button key={reason} className="py-4 px-6 bg-white border border-slate-100 rounded-xl text-[9px] font-black uppercase tracking-widest hover:border-primary hover:text-primary transition-all">
                      {reason}
                   </button>
                 ))}
              </div>
           </div>

           <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <button className="bg-primary text-white px-12 py-6 rounded-2xl font-headline font-black text-xl italic shadow-2xl hover:bg-zinc-900 transition-all">
                 Confirm Cancellation
              </button>
              <Link href="/account/bookings" className="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface font-bold">
                 Keep Reservation
              </Link>
           </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
