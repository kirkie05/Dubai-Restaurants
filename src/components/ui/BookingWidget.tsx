'use client';

import { useState } from 'react';

interface BookingWidgetProps {
  restaurantName: string;
}

export const BookingWidget = ({ restaurantName }: BookingWidgetProps) => {
  const [partySize, setPartySize] = useState(2);
  const [selectedTime, setSelectedTime] = useState('20:30');

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

      <div className="space-y-6">
        {/* Date Selection */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 font-body">Select Date</label>
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">calendar_month</span>
            <input 
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-lg text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer font-body outline-none" 
              type="text" 
              defaultValue="Thursday, Oct 24, 2024" 
              readOnly
            />
          </div>
        </div>

        {/* Guest Count */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 font-body">Party Size</label>
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map(size => (
              <button 
                key={size}
                onClick={() => setPartySize(size)}
                className={`py-3 rounded-lg text-sm font-bold transition-all ${partySize === size ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'}`}
              >
                {size}{size === 4 ? '+' : ''}
              </button>
            ))}
          </div>
        </div>

        {/* Time Slots */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 font-body">Available Times</label>
          <div className="grid grid-cols-2 gap-3">
            {['19:00', '19:30', '20:30', '21:00'].map(time => (
              <div 
                key={time}
                onClick={() => setSelectedTime(time)}
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
        <div className="pt-4">
          <button className="w-full bg-primary hover:opacity-90 text-white py-5 rounded-lg font-bold text-sm uppercase tracking-[0.2em] shadow-xl shadow-primary/10 transition-all flex items-center justify-center gap-3 font-headline">
            Book Table
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
          <p className="text-[10px] text-center text-slate-400 mt-4 font-medium italic font-body">Instant confirmation • No booking fee</p>
        </div>
      </div>

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
