import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function BookingConfirmation() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-900 text-white overflow-hidden">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center pt-24 px-8 relative">
        {/* Background Visual Layer */}
        <div className="absolute inset-0 z-0">
           <Image 
             src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCQaZ4Rzc4yh_i9VR536sMqU5IBHantXMBrYBHokcOmg9dIbwIROyioKWiPgXvM1Xex7Qn45bdBXrnPFK6sIMzuW1dBqql49dAoBCtgrDZomgB5586Olg-3jakrU-1dWLBmMoJL0uAty__ERh9lsuWyQK39CRq6-nZ3TSQGyqfdYR8V-wFGHZc4g6cs2Urhj_peVI7bk9kKcheCUSOXTbk0HNk0L24bItA_BldAVnbNOkHQj_xcq58wbCLpOLADYKruPqAb30R01Z2" 
             alt="Vibe" 
             fill 
             className="object-cover opacity-20 grayscale brightness-50"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-zinc-900"></div>
        </div>

        <div className="max-w-4xl w-full text-center space-y-16 z-10">
           <div className="space-y-6">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/20 border border-primary/40 text-primary mb-8 animate-pulse">
                 <span className="material-symbols-outlined text-4xl">check_circle</span>
              </div>
              <span className="text-primary font-body text-[10px] font-black uppercase tracking-[0.5em] block">Status: Confirmed</span>
              <h1 className="text-6xl md:text-9xl font-headline font-black italic tracking-tighter leading-none">The Table <br />is <span className="text-primary">Reserved.</span></h1>
              <p className="text-xl text-zinc-400 font-body italic leading-relaxed max-w-2xl mx-auto">
                 Your placement at **Al-Maha Crystal Lounge** has been secured for **Saturday, Nov 24 at 20:30**. 
                 A confirmation has been sent to your digital repository.
              </p>
           </div>

           <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <Link href="/account/bookings" className="bg-white text-zinc-900 px-12 py-5 rounded-xl font-headline font-black text-xl italic hover:bg-primary hover:text-white transition-all shadow-2xl">
                 View Booking
              </Link>
              <Link href="/" className="text-[10px] font-black uppercase tracking-[0.3em] text-white border-b border-white/20 hover:border-white transition-all pb-1">
                 Return to Gallery
              </Link>
           </div>
           
           <div className="pt-20 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-50">
              <div className="space-y-2">
                 <p className="text-[8px] font-black uppercase tracking-widest text-zinc-500">Booking Ref</p>
                 <p className="text-sm font-headline font-black italic">DRD-9210X</p>
              </div>
              <div className="space-y-2">
                 <p className="text-[8px] font-black uppercase tracking-widest text-zinc-500">Dress Code</p>
                 <p className="text-sm font-headline font-black italic">Smart Elegant</p>
              </div>
              <div className="space-y-2">
                 <p className="text-[8px] font-black uppercase tracking-widest text-zinc-500">Verification</p>
                 <p className="text-sm font-headline font-black italic">Required</p>
              </div>
              <div className="space-y-2">
                 <p className="text-[8px] font-black uppercase tracking-widest text-zinc-500">Seating</p>
                 <p className="text-sm font-headline font-black italic">Indoor</p>
              </div>
           </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
