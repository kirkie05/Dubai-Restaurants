'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import Image from "next/image";

const BookingFormSchema = z.object({
  date: z.string().min(1, 'Date required'),
  time: z.string().min(1, 'Time required'),
  guestCount: z.number().min(1).max(20),
  specialRequests: z.string().max(500).optional(),
});

type BookingFormData = z.infer<typeof BookingFormSchema>;

interface BookingFormProps {
  restaurant: {
    id: string;
    name: string;
    image_url: string;
    cuisines?: { name: string };
    price_range: string;
    location: string;
  };
  locale: string;
}

export function BookingForm({ restaurant, locale }: BookingFormProps) {
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<BookingFormData>({
    resolver: zodResolver(BookingFormSchema),
    defaultValues: {
      guestCount: 2,
      date: new Date().toISOString().split('T')[0],
      time: '19:00',
    }
  });

  const selectedDate = watch('date');
  const selectedTime = watch('time');
  const guestCount = watch('guestCount');

  const timeSlots = [];
  for (let hour = 12; hour <= 23; hour++) {
    timeSlots.push(`${hour.toString().padStart(2, '0')}:00`);
    if (hour < 23) timeSlots.push(`${hour.toString().padStart(2, '0')}:30`);
  }

  const onSubmit = async (data: BookingFormData) => {
    setServerError('');
    try {
      const bookingDatetime = `${data.date}T${data.time}:00`;
      
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          restaurantId: restaurant.id,
          bookingDatetime,
          guestCount: data.guestCount,
          specialRequests: data.specialRequests,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create booking');
      }

      // If Stripe redirect is needed
      if (result.checkoutUrl) {
        window.location.href = result.checkoutUrl;
        return;
      }

      setBookingRef(result.bookingId.slice(0, 8).toUpperCase());
      setIsSuccess(true);

      setTimeout(() => {
        router.push(`/${locale}/account/bookings`);
      }, 3000);
    } catch (err: any) {
      setServerError(err.message);
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-AE', { weekday: 'long', month: 'short', day: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-24 items-start w-full">
      {/* Reservation Engine */}
      <div className="flex-grow space-y-20 z-10 w-full">
        {isSuccess ? (
          <div className="bg-primary/10 border border-primary/20 p-12 rounded-[2rem] text-center space-y-6 animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-primary/40">
               <span className="material-symbols-outlined text-white text-4xl">check</span>
            </div>
            <div className="space-y-2">
               <h3 className="text-3xl font-headline font-black italic text-on-surface">Booking Confirmed.</h3>
               <p className="text-slate-500 font-body italic">Reference: <span className="text-primary font-black not-italic font-headline">#{bookingRef}</span></p>
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Redirecting to your collection...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-16">
            {serverError && (
              <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-bold">
                {serverError}
              </div>
            )}

            {/* Timing */}
            <section className="space-y-12">
              <div className="flex items-center gap-8">
                <h2 className="text-2xl font-headline font-black italic text-on-surface">01. Timing</h2>
                <div className="flex-grow h-px bg-slate-100"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Arrival Date</label>
                  <input 
                    type="date" 
                    min={new Date().toISOString().split('T')[0]}
                    {...register('date')}
                    className="w-full bg-transparent border-b border-slate-200 py-4 font-headline font-black italic text-2xl focus:border-primary outline-none transition-all" 
                  />
                  {errors.date && <p className="text-xs text-red-500">{errors.date.message}</p>}
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Preferred Time</label>
                  <select 
                    {...register('time')}
                    className="w-full bg-transparent border-b border-slate-200 py-4 font-headline font-black italic text-2xl focus:border-primary outline-none transition-all appearance-none cursor-pointer"
                  >
                    {timeSlots.map(slot => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                  {errors.time && <p className="text-xs text-red-500">{errors.time.message}</p>}
                </div>
              </div>
            </section>

            {/* Guests */}
            <section className="space-y-12">
              <div className="flex items-center gap-8">
                <h2 className="text-2xl font-headline font-black italic text-on-surface">02. Party Size</h2>
                <div className="flex-grow h-px bg-slate-100"></div>
              </div>
              <div className="flex flex-wrap gap-4">
                 {[1, 2, 3, 4, 5, 6, 8, 10, 12].map(num => (
                   <button
                     key={num}
                     type="button"
                     onClick={() => setValue('guestCount', num)}
                     className={`w-16 h-16 rounded-2xl font-headline font-black italic text-xl transition-all ${guestCount === num ? 'bg-primary text-white shadow-xl scale-110' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                   >
                     {num}
                   </button>
                 ))}
                 <div className="flex items-center gap-4 ml-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">or enter</span>
                    <input 
                      type="number" 
                      min="1" 
                      max="20"
                      value={guestCount}
                      onChange={(e) => setValue('guestCount', parseInt(e.target.value) || 1)}
                      className="w-20 bg-transparent border-b border-slate-200 py-2 font-headline font-black italic text-xl text-center outline-none focus:border-primary"
                    />
                 </div>
              </div>
              {errors.guestCount && <p className="text-xs text-red-500">{errors.guestCount.message}</p>}
            </section>

            {/* Notes */}
            <section className="space-y-12">
              <div className="flex items-center gap-8">
                <h2 className="text-2xl font-headline font-black italic text-on-surface">03. Curation Notes</h2>
                <div className="flex-grow h-px bg-slate-100"></div>
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Notes for the Maître d&apos;</label>
                <textarea 
                  {...register('specialRequests')}
                  placeholder="ALLERGIES, PREFERRED SEATING, OR CELEBRATIONS?" 
                  className="w-full bg-transparent border-b border-slate-200 py-4 font-body italic text-lg placeholder:text-slate-200 focus:border-primary outline-none transition-all resize-none h-32" 
                />
                {errors.specialRequests && <p className="text-xs text-red-500">{errors.specialRequests.message}</p>}
              </div>
            </section>

            <div className="pt-12">
              <button 
                type="submit"
                disabled={isSubmitting}
                className="bg-zinc-900 text-white px-16 py-8 rounded-[2rem] font-headline font-black text-2xl italic tracking-tight shadow-2xl hover:bg-primary transition-all group flex items-center gap-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Securing Placement...' : 'Confirm Selection'}
                {!isSubmitting && <span className="material-symbols-outlined group-hover:translate-x-4 transition-transform">east</span>}
              </button>
              <p className="mt-8 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">By proceeding, you agree to our curated booking manifestos.</p>
            </div>
          </form>
        )}
      </div>

      {/* Summary Side Desk */}
      <aside className="w-full lg:w-[480px] shrink-0 lg:sticky lg:top-32 bg-white rounded-[3rem] border border-slate-50 shadow-2xl overflow-hidden animate-float">
         <div className="relative aspect-[4/3]">
            <Image src={restaurant.image_url} alt="Summary" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent"></div>
            <div className="absolute bottom-8 left-8">
               <span className="text-primary font-body text-[8px] font-black uppercase tracking-[0.4em] mb-1 block">Your Destination</span>
               <p className="text-white font-headline font-black italic text-3xl tracking-tighter">{restaurant.name}.</p>
            </div>
         </div>
         
         <div className="p-12 space-y-10">
            <div className="space-y-8">
               <div className="flex justify-between items-start group">
                  <div>
                     <span className="text-[9px] font-black uppercase tracking-widest text-slate-300">Arrival</span>
                     <p className="text-xl font-headline font-black italic mt-1 text-on-surface">{formatDate(selectedDate)}</p>
                  </div>
                  <span className="material-symbols-outlined text-primary">calendar_month</span>
               </div>
               <div className="flex justify-between items-start group">
                  <div>
                     <span className="text-[9px] font-black uppercase tracking-widest text-slate-300">Time / Seats</span>
                     <p className="text-xl font-headline font-black italic mt-1 text-on-surface">{selectedTime} · {guestCount} Guests</p>
                  </div>
                  <span className="material-symbols-outlined text-primary">group</span>
               </div>
            </div>

            <div className="pt-10 border-t border-slate-50 space-y-4">
               <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                  <span className="text-slate-400">Booking Fee</span>
                  <span className="text-on-surface">AED 50.00</span>
               </div>
               <div className="flex justify-between text-lg font-headline font-black italic pt-2 border-t border-slate-100">
                  <span className="text-on-surface">Total Due</span>
                  <span className="text-primary">AED 50.00</span>
               </div>
            </div>
         </div>
      </aside>
    </div>
  );
}
