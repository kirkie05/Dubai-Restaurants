import Image from "next/image";
import { Link } from '@/navigation';
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const AUTHOR_ARTICLES = [
  {
    title: "The Alchemy of Saffron: Dubai's New Wave of Dessert Labs",
    category: "Feature Story",
    excerpt: "Exploring how the city's top pastry chefs are re-inventing heritage spices through the lens of molecular gastronomy.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDkyJ9JEkCQTLRj3ql7iMdegIqWArZuv9hfJ2fQn7UOhl7Len_DqghmzJdF-wyuPpcFMR5MHHNYTX22yDTkQgmNJAbGt-l2nO_IBb_8vO2tOuj4zfwu96J6vcYgGmnIKA-JTiHg2my3zux8SJOR6C5dJ_huNth0eNDbVcko4OrVDRi8tytIHVIsEUHiTwyuv1XakeB9RYTh0gbdViYGxrkla4ZcSg6kk_Bewr9jsptAxWkmBHO4SFLzssEsxXlYdXABTmFpt_L4GKfO",
    slug: "alchemy-of-saffron",
    wide: true
  },
  {
    title: "Hidden Jumeirah: The Last Traditional Fish Markets",
    category: "Cuisine Insight",
    excerpt: "A morning with the local fishermen who supply the city's most exclusive kitchens with the morning's catch.",
    slug: "hidden-jumeirah-fish-market",
    date: "Mar 12, 2024"
  },
  {
    title: "Chef Table: Conversations with Nobu Matsuhisa",
    category: "Interview",
    excerpt: "The legendary chef discusses why Dubai is currently the world's most exciting culinary destination.",
    slug: "nobu-matsuhisa-interview",
    date: "Feb 28, 2024"
  }
];

export default function AuthorPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-20 max-w-7xl mx-auto px-8 w-full">
        {/* Author Header */}
        <section className="flex flex-col md:flex-row gap-20 items-start mb-32">
          <div className="w-full md:w-1/3 aspect-[4/5] relative overflow-hidden rounded-lg bg-slate-50 border border-white shadow-xl">
            <Image 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZZPQNiSUcxZDFVKRb3A3adSjb1aWV5LtMzW3fPP-d52Pd_wOIqcexy34ponEBZmLx7oJekSxuxPChgO6csRH1d1zTbbX7SQW2BtibjVa87n0jeriOl5oEo3GXqoldnWq-A_PTXUCRZm-u2ZnOnS78bIJuzmvEFAI3T-TPKpv_MbAGZP7CHK0ER9dfddxYrRS8STYModc7eAEhQEA07jVTbLI7O5sjlcMqpNHl3RmNqB49cf_hvB5M3CVM3KX4F73GvGCO_0NriSSk" 
              alt="Farah Al-Maktoum" 
              fill 
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
          
          <div className="w-full md:w-2/3">
            <div className="max-w-2xl space-y-8">
              <span className="text-primary font-body text-[10px] uppercase tracking-[0.3em] font-bold">Chief Editorial Curator</span>
              <h1 className="font-headline text-5xl md:text-8xl font-extrabold text-on-surface tracking-tighter leading-[0.9] italic">
                Farah <br/>Al-Maktoum
              </h1>
              <div className="w-20 h-1 bg-primary"></div>
              <p className="text-xl text-slate-500 leading-relaxed font-body italic">
                With over fifteen years documenting the evolution of Middle Eastern gastronomy, Farah has become the authoritative voice on Dubai&apos;s Michelin-starred landscape. Her expertise bridges the gap between traditional Bedouin flavors and the avant-garde techniques of the city&apos;s rising culinary stars.
              </p>
              <div className="flex flex-wrap gap-3">
                {['Michelin Expert', 'Sommelier', 'Culinary Judge'].map(tag => (
                  <span key={tag} className="bg-slate-100 text-slate-400 px-5 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest border border-white">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* articles Section */}
        <section className="mb-32">
          <div className="flex items-end justify-between mb-16">
            <div>
              <h2 className="font-headline text-4xl font-bold tracking-tight italic">Published Works</h2>
              <p className="text-slate-400 font-body text-sm mt-2 italic">Deep dives into the flavors of the Emirates.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            {/* Wide Featured Article */}
            <div className="md:col-span-8 group bg-white p-10 rounded-lg shadow-sm border border-slate-50 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 flex flex-col md:flex-row gap-10">
              <div className="md:w-1/2 relative min-h-[300px] rounded-lg overflow-hidden">
                <Image src={AUTHOR_ARTICLES[0].image!} alt={AUTHOR_ARTICLES[0].title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="md:w-1/2 flex flex-col justify-center">
                <span className="text-primary font-body text-[10px] uppercase tracking-widest font-bold mb-4">{AUTHOR_ARTICLES[0].category}</span>
                <h3 className="font-headline text-3xl font-bold italic leading-tight mb-6 group-hover:text-primary transition-colors">
                  {AUTHOR_ARTICLES[0].title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-8 font-body italic">
                  {AUTHOR_ARTICLES[0].excerpt}
                </p>
                <Link href={`/blog/${AUTHOR_ARTICLES[0].slug}`} className="text-[10px] font-bold text-zinc-900 uppercase tracking-widest flex items-center gap-3">
                  Read Story <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            </div>

            {/* Side Articles */}
            <div className="md:col-span-4 space-y-12">
              {AUTHOR_ARTICLES.slice(1).map((art) => (
                <div key={art.slug} className="group bg-zinc-900 p-8 rounded-lg text-white hover:bg-zinc-800 transition-all cursor-pointer">
                  <span className="text-secondary font-body text-[10px] uppercase tracking-widest font-bold mb-4 block">{art.category}</span>
                  <h3 className="font-headline text-2xl font-bold italic mb-4 leading-tight group-hover:text-primary transition-colors">
                    {art.title}
                  </h3>
                  <p className="text-zinc-500 text-sm italic line-clamp-2 mb-8 font-body">
                    {art.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-6 border-t border-white/10">
                    <span className="text-[10px] text-zinc-600 font-bold tracking-widest uppercase">{art.date}</span>
                    <span className="material-symbols-outlined text-zinc-600">bookmark</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Global Newsletter Sub-Block */}
        <div className="bg-slate-900 rounded-lg p-20 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="font-headline text-4xl font-extrabold text-white mb-6 italic">Follow Farah&apos;s Journey</h2>
            <p className="text-zinc-400 font-body text-base mb-10 italic">Join thousands of culinary enthusiasts who receive Farah&apos;s private weekly briefing on Dubai&apos;s dining landscape.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input className="bg-white/5 border border-white/10 rounded-sm px-8 py-4 text-white text-sm focus:ring-1 focus:ring-primary focus:outline-none w-full md:w-80" placeholder="Email Address" type="email" />
              <button className="bg-primary text-white px-12 py-4 rounded-sm font-body text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-zinc-900 transition-all">Subscribe</button>
            </div>
          </div>
          <span className="material-symbols-outlined absolute -bottom-10 -left-10 text-[200px] opacity-[0.03] select-none pointer-events-none text-white">mark_email_read</span>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
