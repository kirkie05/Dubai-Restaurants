import AccountLayout from "@/components/layout/AccountLayout";

const REVIEWS = [
  {
    id: 1,
    restaurant: "Al-Maha Crystal Lounge",
    rating: 5,
    date: "April 12, 2024",
    text: "The atmosphere is unmatched. Truly an editorial masterpiece in dining. The service was curated to perfection.",
  }
];

export default function MyReviews() {
  return (
    <AccountLayout>
       <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <header className="pb-12 border-b border-slate-100">
             <span className="text-primary font-body text-[10px] font-black uppercase tracking-[0.4em] block mb-4">Your Voice</span>
             <h1 className="text-5xl md:text-7xl font-headline font-black italic tracking-tighter text-on-surface">The <span className="text-zinc-300">Critiques.</span></h1>
          </header>

          <section className="space-y-12">
             {REVIEWS.map((review) => (
               <article key={review.id} className="bg-white p-12 rounded-[3.5rem] border border-slate-50 shadow-2xl space-y-8 group">
                  <div className="flex justify-between items-start">
                     <div>
                        <h3 className="text-3xl font-headline font-black italic text-zinc-900 tracking-tighter group-hover:text-primary transition-colors">{review.restaurant}</h3>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-300 mt-1">{review.date}</p>
                     </div>
                     <div className="flex gap-1 text-primary">
                        {[...Array(review.rating)].map((_, i) => (
                           <span key={i} className="material-symbols-outlined text-sm" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                        ))}
                     </div>
                  </div>
                  
                  <p className="text-2xl font-headline font-bold italic text-slate-700 leading-tight tracking-tight">
                    &quot;{review.text}&quot;
                  </p>

                  <div className="pt-8 border-t border-slate-50 flex items-center gap-6">
                     <button className="text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">Edit Response</button>
                     <button className="text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">Archive</button>
                  </div>
               </article>
             ))}
          </section>
       </div>
    </AccountLayout>
  );
}
