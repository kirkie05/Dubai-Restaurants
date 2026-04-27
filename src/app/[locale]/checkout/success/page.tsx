"use client";

import { useSearchParams } from "next/navigation";
import { Link } from "@/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  return (
    <div className="flex flex-col min-h-screen bg-zinc-900 text-white">
      <Navbar />

      <main className="flex-grow flex items-center justify-center pt-32 pb-24 px-6 lg:px-16 max-w-[1280px] mx-auto w-full">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-10 md:p-16 text-center max-w-2xl space-y-8 animate-in zoom-in-95 duration-700">
          <div className="w-24 h-24 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(16,185,129,0.2)]">
            <span className="material-symbols-outlined text-5xl">check_circle</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-headline font-black italic tracking-tighter">
            Payment Successful!
          </h1>
          
          <p className="text-zinc-300 text-lg">
            Your transaction has been completed securely. We've sent a receipt to your registered email address.
          </p>

          {sessionId && (
            <p className="text-xs font-mono text-zinc-500 break-all bg-black/20 p-4 rounded-xl inline-block">
              Order ID: {sessionId}
            </p>
          )}

          <div className="pt-8 flex flex-col md:flex-row gap-4 justify-center">
            <Link 
              href="/" 
              className="px-8 py-4 bg-primary text-white rounded-xl font-bold uppercase tracking-widest text-xs hover:opacity-90 transition-opacity"
            >
              Back to Home
            </Link>
            <Link 
              href="/partner/dashboard" 
              className="px-8 py-4 bg-zinc-800 text-white border border-zinc-700 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-zinc-700 transition-colors"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
