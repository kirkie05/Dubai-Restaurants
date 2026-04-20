import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const REVIEWS = [
  { id: 1, author: "Sarah Jenkins", rating: 5, date: "April 12, 2024", comment: "The atmosphere is unmatched. The Levantine Lamb was a revelation of textures and flavors. Truly an editorial masterpiece in dining.", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCb4y0Juf2MsQER6FTpPRMb5-6YfdjMILsug_yQYyNrPe80_1qOZlxB-GCS_l3Hn5nHEGWNp-nt4zN_fyAc5mCWK7qwQ2djnw9cTMcdkuDH-J829lKr0Ff6KBLhJWlGpjGF9y9lRO6bwy4euRrxa-nOQxJl28KmX93xeUjiQibT8cQBRnbgOJGRJZeNEnnpy1HwQJUicd4iYgt2coXyOmS16uQ3IxNCKmgdgpgKWhGRfiOUxLCPgtS7Y1EScILmjP-yzJQCVhzjtF3h" },
  { id: 2, author: "Liam Chen", rating: 4, date: "March 28, 2024", comment: "Exceptional service. The crystal fixtures create a dreamlike quality to the evening. Only slight delay in seating, but well worth the wait.", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBCQaZ4Rzc4yh_i9VR536sMqU5IBHantXMBrYBHokcOmg9dIbwIROyioKWiPgXvM1Xex7Qn45bdBXrnPFK6sIMzuW1dBqql49dAoBCtgrDZomgB5586Olg-3jakrU-1dWLBmMoJL0uAty__ERh9lsuWyQK39CRq6-nZ3TSQGyqfdYR8V-wFGHZc4g6cs2Urhj_peVI7bk9kKcheCUSOXTbk0HNk0L24bItA_BldAVnbNOkHQj_xcq58wbCLpOLADYKruPqAb30R01Z2" }
];

export default function RestaurantReviews({ params }: { params: { slug: string } }) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 min-h-screen">
        <div className="max-w-5xl mx-auto px-8 py-20 space-y-24">
           <header className="flex flex-col md:flex-row justify-between items-end gap-8 pb-12 border-b border-slate-100">
              <div className="space-y-4">
                 <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary text-primary">Verified Voices</span>
                 <h1 className="text-6xl md:text-8xl font-headline font-black italic tracking-tighter leading-none">The <span className="text-zinc-400">Review.</span></h1>
                 <p className="text-slate-400 font-body text-sm font-medium italic mt-6">4.9 Average based on 1,240 curated responses.</p>
              </div>
              <button className="bg-zinc-900 text-white px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl hover:bg-primary transition-all">Write Response</button>
           </header>

           <div className="space-y-20">
              {REVIEWS.map((review) => (
                <article key={review.id} className="grid grid-cols-1 md:grid-cols-12 gap-12 group">
                   <div className="md:col-span-3 space-y-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-xl grayscale group-hover:grayscale-0 transition-all duration-1000">
                         <Image src={review.avatar} alt={review.author} width={64} height={64} className="object-cover" />
                      </div>
                      <div>
                         <p className="font-headline font-black text-on-surface text-sm uppercase tracking-widest">{review.author}</p>
                         <p className="text-slate-400 font-body text-[10px] font-bold uppercase tracking-widest">{review.date}</p>
                      </div>
                   </div>

                   <div className="md:col-span-9 space-y-6">
                      <div className="flex gap-1 text-primary">
                         {[...Array(5)].map((_, i) => (
                            <span key={i} className="material-symbols-outlined text-sm" style={{fontVariationSettings: i < review.rating ? "'FILL' 1" : "'FILL' 0"}}>star</span>
                         ))}
                      </div>
                      <p className="text-2xl font-headline font-bold italic text-slate-700 leading-relaxed tracking-tight">
                        &quot;{review.comment}&quot;
                      </p>
                   </div>
                </article>
              ))}
           </div>

           <footer className="pt-20 border-t border-slate-100 text-center">
              <Link href={`/restaurant/${params.slug}`} className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Back to Experience</Link>
           </footer>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
