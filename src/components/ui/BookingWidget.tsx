'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bookingSchema, BookingFormData } from '@/lib/validations';

interface BookingWidgetProps {
  restaurantName: string;
  restaurantId?: string;
}

export const BookingWidget = ({ restaurantName, restaurantId }: BookingWidgetProps) => {
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      guestCount: 2,
      date: new Date().toISOString().split('T')[0],
      time: '20:30',
      restaurantId: restaurantId || '',
      bookingDatetime: '',
    },
    mode: 'onChange',
  });

  const guestCount = watch('guestCount');
  const selectedTime = watch('time');
  const selectedDate = watch('date');

  // Sync date/time to bookingDatetime
  useEffect(() => {
    if (selectedDate && selectedTime) {
      const combined = `${selectedDate}T${selectedTime}:00`;
      setValue('bookingDatetime', combined, { shouldValidate: true });
    }
  }, [selectedDate, selectedTime, setValue]);

  const onSubmit = async (data: BookingFormData) => {
    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          type: 'booking',
          restaurantId: data.restaurantId,
          bookingDatetime: data.bookingDatetime,
          guestCount: data.guestCount,
          specialRequests: data.specialRequests
        }),
      });
      if (res.ok) {
        const { url } = await res.json();
        window.location.href = url;
      } else {
        const err = await res.json();
        alert(`Booking failed: ${err.error || "Unknown error"}`);
      }
    } catch (e) {
      console.error(e);
      alert("An error occurred during booking.");
    }
  };

  return (
    <div className="sticky top-28 bg-white p-8 rounded-xl ring-1 ring-black/[0.03] shadow-2xl space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tighter font-headline">Reserve Table</h2>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-widest mt-1 font-body">{restaurantName}</p>
        </div>
        <div className="text-right">
          <span className="block text-secondary font-bold text-xs uppercase tracking-tighter font-body">Open Today</span>
          <span className="text-xs text-slate-500 font-body">12:00 PM — 11:30 PM</span>
        </div>
      </div>

      {isSuccess ? (
        <div className="bg-primary/10 border border-primary/20 text-primary p-6 rounded-xl text-center space-y-3">
          <span className="material-symbols-outlined text-4xl">check_circle</span>
          <h3 className="font-headline font-black italic text-xl">Booking Confirmed</h3>
          <p className="text-xs font-medium">We look forward to hosting you!</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Hidden bookingDatetime for validation */}
          <input type="hidden" {...register('bookingDatetime')} />

          {/* Date Selection */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 font-body">Select Date</label>
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">calendar_month</span>
              <input 
                className={`w-full pl-12 pr-4 py-4 bg-slate-50 border ${errors.bookingDatetime ? 'border-red-500' : 'border-transparent focus:border-primary/20'} rounded-lg text-sm font-medium transition-all cursor-pointer font-body outline-none`}
                type="date" 
                {...register('date')}
              />
            </div>
            {errors.bookingDatetime && <p className="text-xs text-red-500 ml-1">Please select a valid date and time</p>}
          </div>

          {/* Guest Count */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 font-body">Party Size</label>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map(size => (
                <button 
                  key={size}
                  type="button"
                  onClick={() => setValue('guestCount', size, { shouldValidate: true, shouldDirty: true })}
                  className={`py-3 rounded-lg text-sm font-bold transition-all ${guestCount === size ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'}`}
                >
                  {size}{size === 4 ? '+' : ''}
                </button>
              ))}
            </div>
            {errors.guestCount && <p className="text-xs text-red-500 ml-1">{errors.guestCount.message}</p>}
          </div>

          {/* Time Slots */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 font-body">Available Times</label>
            <div className="grid grid-cols-2 gap-3">
              {['19:00', '19:30', '20:30', '21:00'].map(time => (
                <div 
                  key={time}
                  onClick={() => setValue('time', time, { shouldValidate: true, shouldDirty: true })}
                  className={`px-4 py-3 rounded-lg text-center cursor-pointer transition-all ${selectedTime === time ? 'bg-primary/5 border-l-4 border-primary' : 'bg-slate-50 hover:bg-slate-100'}`}
                >
                  <span className="block text-sm font-bold font-body">{time}</span>
                  <span className={`text-[10px] font-body ${selectedTime === time ? 'text-primary font-bold' : 'text-slate-400'}`}>
                    {time === '20:30' ? 'Prime Time' : 'Standard'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Direct CTA */}
          <div className="pt-4 space-y-2">
            <button 
              type="submit"
              disabled={isSubmitting || (!isDirty && !guestCount && !selectedTime)}
              className="w-full bg-primary hover:opacity-90 text-white py-5 rounded-lg font-bold text-sm uppercase tracking-[0.2em] shadow-xl shadow-primary/10 transition-all flex items-center justify-center gap-3 font-headline disabled:opacity-40"
            >
              {isSubmitting ? 'Redirecting...' : 'Book Table'}
              {!isSubmitting && <span className="material-symbols-outlined text-[18px]">arrow_forward</span>}
            </button>
            <p className="text-[10px] text-center text-slate-400 mt-4 font-medium italic font-body">Requires 50 AED table deposit</p>
          </div>
        </form>
      )}

      {/* Trust Indicator */}
      <div className="pt-6 border-t border-slate-100 flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
        </div>
        <div>
          <p className="text-xs font-bold font-body">Verified Availability</p>
          <p className="text-[10px] text-slate-400 font-body">Updated real-time by the host</p>
        </div>
      </div>
    </div>
  );
};
