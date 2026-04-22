import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default async function BlogArticle({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const article = {
    title: "The Rise of Desert-First Fine Dining",
    subtitle: "Rediscovering native heritage through the lens of modern molecular gastronomy.",
    author: "Alexandra Vane",
    date: "Oct 24, 2024",
    category: "Trend Report",
    readTime: "12 Min Read",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC2RzhUe6M16PLywslYezi7WUPURd_tfHNltdXsGnJkIj9LuI-KF6p7ykIkrUDXr8TAmZvjs989fhHuCiQmHyWZ2Dq_odRyfW_-_AihLtOEtt4r3gAPT7eGegfkeVd_hKekacfKoalYWap-vYFMOEXNUecP9gmpzZZ7UKrZVb6hMG5SITVl9JsFfJcyeX1PxLO5FJpuZJkOTy3hg0zDOvtaSQ46fo_9sP2E0EspTmU4K0BThCedACx-JzD5BXCMZeI2Zyw1QjzdOP4c"
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-on-surface">
      <Navbar />
      
      <main className="pt-32 pb-40">
        <header className="max-w-5xl mx-auto px-8 mb-24 space-y-12 text-center">
           <div className="space-y-4">
              <span className="text-primary font-body text-[10px] font-black uppercase tracking-[0.6em] block">{article.category}</span>
              <h1 className="text-6xl md:text-9xl font-headline font-black italic tracking-tighter leading-[0.85] text-on-surface">
                 {article.title}.
              </h1>
              <p className="text-2xl text-slate-500 font-body italic leading-relaxed max-w-2xl mx-auto">
                 {article.subtitle}
              </p>
           </div>

           <div className="flex items-center justify-center gap-12 pt-8 border-t border-slate-100">
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 relative">
                    <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuCb4y0Juf2MsQER6FTpPRMb5-6YfdjMILsug_yQYyNrPe80_1qOZlxB-GCS_l3Hn5nHEGWNp-nt4zN_fyAc5mCWK7qwQ2djnw9cTMcdkuDH-J829lKr0Ff6KBLhJWlGpjGF9y9lRO6bwy4euRrxa-nOQxJl28KmX93xeUjiQibT8cQBRnbgOJGRJZeNEnnpy1HwQJUicd4iYgt2coXyOmS16uQ3IxNCKmgdgpgKWhGRfiOUxLCPgtS7Y1EScILmjP-yzJQCVhzjtF3h" alt="Author" fill className="object-cover" />
                 </div>
                 <Link href="/author/alexandra-vane" className="text-[10px] font-black uppercase tracking-widest text-zinc-900 border-b border-zinc-900/10 hover:border-zinc-900 transition-all">By {article.author}</Link>
              </div>
              <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                 <span>{article.date}</span>
                 <span className="w-1 h-1 bg-slate-100 rounded-full"></span>
                 <span>{article.readTime}</span>
              </div>
           </div>
        </header>

        <section className="max-w-[1920px] mx-auto px-8 lg:px-16 mb-24">
           <div className="relative aspect-[21/9] w-full rounded-[4rem] overflow-hidden shadow-2xl">
              <Image src={article.image} alt={article.title} fill className="object-cover" priority />
           </div>
        </section>

        <article className="max-w-4xl mx-auto px-8 space-y-12">
           <div className="space-y-8 text-xl text-slate-700 font-body italic leading-relaxed first-letter:text-7xl first-letter:font-headline first-letter:font-black first-letter:text-primary first-letter:mr-3 first-letter:float-left">
              <p>
                Dubai&apos;s culinary scene has long been defined by its import culture—a glittering parade of global franchises and celebrity exports. But in recent seasons, a different narrative has begun to emerge from the desert floor. A new generation of curators is turning their gaze inward, exploring the architectural potential of local dates, salted camel milk, and Sidr honey.
              </p>
              <p>
                This isn&apos;t just about sourcing; it&apos;s about identity. At venues like Tresind Studio and Moonrise, the desert isn&apos;t a backdrop—it&apos;s the protagonist. The result is a fusion of heritage and high-fidelity technique that feels uniquely authentically Dubai.
              </p>
           </div>

           <blockquote className="py-16 border-y border-slate-100 flex flex-col items-center text-center space-y-6">
              <span className="material-symbols-outlined text-primary text-4xl">format_quote</span>
              <p className="text-4xl md:text-6xl font-headline font-black italic tracking-tighter leading-none text-zinc-300">
                &quot;The desert is our <br />most precise <span className="text-primary">ingredient.</span>&quot;
              </p>
           </blockquote>

           <div className="space-y-8 text-xl text-slate-700 font-body italic leading-relaxed">
              <p>
                As we move toward a more curated future, the emphasis remains on the story behind the plate. Every interaction is an editorial choice, every flavor a citation of a larger cultural work.
              </p>
           </div>
        </article>

        <footer className="mt-32 max-w-4xl mx-auto px-8 pt-16 border-t border-slate-100 flex justify-between items-center">
           <div className="flex gap-4">
              <button className="p-4 bg-slate-50 text-slate-400 rounded-full hover:bg-primary hover:text-white transition-all shadow-sm">
                 <span className="material-symbols-outlined text-sm">share</span>
              </button>
              <button className="p-4 bg-slate-50 text-slate-400 rounded-full hover:bg-primary hover:text-white transition-all shadow-sm">
                 <span className="material-symbols-outlined text-sm">bookmark</span>
              </button>
           </div>
           <Link href="/blog" className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Return to Journal</Link>
        </footer>
      </main>
      
      <Footer />
    </div>
  );
}
