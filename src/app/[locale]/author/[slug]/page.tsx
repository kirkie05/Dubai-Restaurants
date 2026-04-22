import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function AuthorPage() {
  const author = {
    name: "Alexandra Vane",
    role: "Senior Culinary Editor",
    bio: "With over a decade of experience in the Middle Eastern gastronomic landscape, Alexandra curates the narratives behind Dubai's most ambitious kitchens. Her work focuses on the intersection of heritage architecture and modern molecular technique.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCb4y0Juf2MsQER6FTpPRMb5-6YfdjMILsug_yQYyNrPe80_1qOZlxB-GCS_l3Hn5nHEGWNp-nt4zN_fyAc5mCWK7qwQ2djnw9cTMcdkuDH-J829lKr0Ff6KBLhJWlGpjGF9y9lRO6bwy4euRrxa-nOQxJl28KmX93xeUjiQibT8cQBRnbgOJGRJZeNEnnpy1HwQJUicd4iYgt2coXyOmS16uQ3IxNCKmgdgpgKWhGRfiOUxLCPgtS7Y1EScILmjP-yzJQCVhzjtF3h",
    articles: [
      { title: "The Rise of Desert-First Fine Dining", date: "Oct 24, 2024", slug: "rise-of-desert-first-dining" },
      { title: "Atmosphere & Architecture", date: "Sep 12, 2024", slug: "atmosphere-architecture" }
    ]
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-40">
        <header className="max-w-[1920px] mx-auto px-8 lg:px-16 mb-32 grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
           <div className="lg:col-span-4 relative aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl border-8 border-white skew-y-1">
              <Image src={author.image} alt={author.name} fill className="object-cover" />
           </div>
           
           <div className="lg:col-span-8 space-y-12">
              <div className="space-y-6">
                 <span className="text-primary font-body text-[10px] font-black uppercase tracking-[0.4em] block">{author.role}</span>
                 <h1 className="text-6xl md:text-9xl font-headline font-black italic tracking-tighter leading-[0.8] text-on-surface">The <br /><span className="text-zinc-300">Voice.</span></h1>
                 <p className="text-3xl text-zinc-900 font-headline font-black italic leading-none">{author.name}</p>
                 <p className="text-xl text-slate-500 font-body italic leading-relaxed max-w-2xl">
                    {author.bio}
                 </p>
              </div>

              <div className="flex gap-8 items-center border-t border-slate-100 pt-12">
                 <div className="space-y-1">
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Total Contributions</p>
                    <p className="text-2xl font-headline font-black italic">142</p>
                 </div>
                 <div className="w-px h-10 bg-slate-100"></div>
                 <div className="space-y-1">
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Focus Area</p>
                    <p className="text-2xl font-headline font-black italic">Fine Dining & Heritage</p>
                 </div>
              </div>
           </div>
        </header>

        <section className="max-w-[1920px] mx-auto px-8 lg:px-16 space-y-16">
           <div className="flex items-center gap-8">
              <h2 className="text-2xl font-headline font-black italic text-on-surface">Recent Briefings.</h2>
              <div className="flex-grow h-px bg-slate-100"></div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {author.articles.map(article => (
                <Link key={article.slug} href={`/blog/${article.slug}`} className="group p-12 bg-white rounded-[3rem] border border-slate-50 shadow-xl hover:shadow-2xl transition-all space-y-6">
                   <p className="text-[9px] font-black uppercase tracking-widest text-primary">{article.date}</p>
                   <h3 className="text-4xl font-headline font-black italic tracking-tighter text-on-surface group-hover:text-primary transition-colors leading-none">
                      {article.title}.
                   </h3>
                   <span className="inline-flex items-center gap-4 text-[9px] font-black uppercase tracking-widest text-slate-400">
                      View Story
                      <span className="material-symbols-outlined text-sm group-hover:translate-x-4 transition-transform">east</span>
                   </span>
                </Link>
              ))}
           </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
