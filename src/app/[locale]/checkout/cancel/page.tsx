"use client";

import { useRouter } from "@/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function CheckoutCancelPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen bg-zinc-900 text-white">
      <Navbar />

      <main className="flex-grow flex items-center justify-center pt-32 pb-24 px-6 lg:px-16 max-w-[1280px] mx-auto w-full">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-10 md:p-16 text-center max-w-2xl space-y-8 animate-in slide-in-from-bottom-4 duration-700">
          <div className="w-24 h-24 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(239,68,68,0.15)]">
            <span className="material-symbols-outlined text-5xl">error</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-headline font-black italic tracking-tighter">
            Payment Cancelled
          </h1>
          
          <p className="text-zinc-300 text-lg">
            Your transaction was cancelled and no charges were made. If you experienced a technical issue, please try again or use a different payment method.
          </p>

          <div className="pt-8 flex flex-col md:flex-row gap-4 justify-center">
            <button 
              onClick={() => router.back()}
              className="px-8 py-4 bg-primary text-white rounded-xl font-bold uppercase tracking-widest text-xs hover:opacity-90 transition-opacity"
            >
              Try Again
            </button>
            <button 
              onClick={() => router.push('/support')}
              className="px-8 py-4 bg-zinc-800 text-white border border-zinc-700 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-zinc-700 transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">support_agent</span>
              Contact Support
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
