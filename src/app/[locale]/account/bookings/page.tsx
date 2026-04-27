"use client";

import Image from "next/image";
import { Link } from '@/navigation';
import AccountLayout from "@/components/layout/AccountLayout";
import { useQuery } from "@tanstack/react-query";

export default function BookingHistory() {
  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ['bookings'],
    queryFn: async () => {
      const res = await fetch('/api/account/bookings');
      if (!res.ok) throw new Error('Failed to fetch bookings');
      return res.json();
    }
  });

  return (
    <AccountLayout>
       <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <header className="pb-12 border-b border-slate-100">
             <span className="text-primary font-body text-[10px] font-black uppercase tracking-[0.4em] block mb-4">Past & Future</span>
             <h1 className="text-5xl md:text-7xl font-headline font-black italic tracking-tighter text-on-surface">The <span className="text-primary">Archive.</span></h1>
          </header>

          {isLoading ? (
            <div className="flex justify-center py-20 italic text-slate-400">Loading your history...</div>
          ) : (
            <section className="space-y-6">
               {bookings.length > 0 ? (
                 bookings.map((booking: any) => (
                   <div key={booking.id} className="bg-white p-8 md:p-12 rounded-[3rem] border border-slate-50 shadow-2xl flex flex-col md:flex-row gap-12 items-center group">
                      <div className="w-full md:w-64 aspect-video relative overflow-hidden rounded-[2rem]">
                         <Image src={booking.image} alt={booking.restaurant} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
                      </div>
                      
                      <div className="flex-grow space-y-6">
                         <div className="flex justify-between items-start">
                            <div>
                               <span className="text-[9px] font-black uppercase tracking-widest text-primary mb-1 block">{booking.status}</span>
                               <h3 className="text-3xl font-headline font-black italic text-zinc-900 tracking-tighter">{booking.restaurant}</h3>
                               <p className="text-sm font-body italic text-slate-400">{booking.location}</p>
                            </div>
                            <span className="text-4xl font-headline font-black italic text-slate-50">#{booking.id}</span>
                         </div>

                         <div className="flex items-center gap-12 pt-6 border-t border-slate-50">
                            <div className="space-y-1">
                               <p className="text-[8px] font-black uppercase tracking-widest text-slate-300">Date</p>
                               <p className="text-sm font-black italic">{booking.date}</p>
                            </div>
                            <div className="space-y-1">
                               <p className="text-[8px] font-black uppercase tracking-widest text-slate-300">Time / Seats</p>
                               <p className="text-sm font-black italic">{booking.time} · {booking.guests} Guests</p>
                            </div>
                         </div>
                      </div>

                      <div className="flex items-center gap-4">
                         <Link href={`/booking/modify`} className="p-4 bg-slate-50 text-slate-400 rounded-full hover:bg-zinc-900 hover:text-white transition-all shadow-sm">
                            <span className="material-symbols-outlined text-sm">edit</span>
                         </Link>
                         <Link href={`/booking/cancel`} className="p-4 bg-slate-50 text-slate-400 rounded-full hover:bg-primary hover:text-white transition-all shadow-sm">
                            <span className="material-symbols-outlined text-sm">close</span>
                         </Link>
                      </div>
                   </div>
                 ))
               ) : (
                 <div className="py-20 text-center text-slate-400 italic">
                   No booking history found.
                 </div>
               )}
            </section>
          )}
       </div>
    </AccountLayout>
  );
}
