"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export function TestimonialSlider() {
  const t = useTranslations("TestimonialSlider");

  const testimonials = [
    {
      id: 1,
      quote: "Dubai Restaurants has completely changed how we explore the city. The curation is impeccable, and we never have to worry about the quality of the listing.",
      author: "Mandy Price",
      role: "VP of Aspire Group",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCb4y0Juf2MsQER6FTpPRMb5-6YfdjMILsug_yQYyNrPe80_1qOZlxB-GCS_l3Hn5nHEGWNp-nt4zN_fyAc5mCWK7qwQ2djnw9cTMcdkuDH-J829lKr0Ff6KBLhJWlGpjGF9y9lRO6bwy4euRrxa-nOQxJl28KmX93xeUjiQibT8cQBRnbgOJGRJZeNEnnpy1HwQJUicd4iYgt2coXyOmS16uQ3IxNCKmgdgpgKWhGRfiOUxLCPgtS7Y1EScILmjP-yzJQCVhzjtF3h"
    }
  ];

  return (
    <section className="py-24 px-8 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-16">
        <div className="space-y-4">
           <span className="material-symbols-outlined text-6xl text-primary opacity-20 select-none">format_quote</span>
           <h2 className="text-4xl font-headline font-black italic tracking-tight text-on-surface">{t("title")}</h2>
        </div>

        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="max-w-4xl space-y-10 group">
             <p className="text-3xl md:text-5xl font-headline font-bold italic leading-tight text-slate-700 tracking-tighter">
               &quot;{testimonial.quote}&quot;
             </p>

             <div className="flex flex-col items-center gap-4">
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-xl grayscale group-hover:grayscale-0 transition-all duration-1000">
                   <Image src={testimonial.avatar} alt={testimonial.author} width={80} height={80} className="object-cover" />
                </div>
                <div className="space-y-1">
                   <h4 className="font-headline font-black text-on-surface uppercase tracking-widest text-sm">{testimonial.author}</h4>
                   <p className="text-primary font-body text-[10px] font-bold uppercase tracking-[0.3em]">{testimonial.role}</p>
                </div>
             </div>
          </div>
        ))}

        <div className="flex gap-12 items-center pt-8">
           {[1, 2, 3, 4].map(i => (
             <div key={i} className="w-10 h-10 rounded-full bg-white flex items-center justify-center opacity-40 hover:opacity-100 transition-opacity cursor-pointer shadow-sm">
                <div className="w-2 h-2 rounded-full bg-slate-400 group-hover:bg-primary"></div>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
}
