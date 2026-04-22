import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const ARTICLES = [
  {
    title: "The Rise of Desert-First Fine Dining",
    excerpt: "How Dubai's newest culinary pioneers are rediscovering native heritage ingredients through the lens of modern molecular gastronomy.",
    category: "Trend Report",
    time: "12 Min Read",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC2RzhUe6M16PLywslYezi7WUPURd_tfHNltdXsGnJkIj9LuI-KF6p7ykIkrUDXr8TAmZvjs989fhHuCiQmHyWZ2Dq_odRyfW_-_AihLtOEtt4r3gAPT7eGegfkeVd_hKekacfKoalYWap-vYFMOEXNUecP9gmpzZZ7UKrZVb6hMG5SITVl9JsFfJcyeX1PxLO5FJpuZJkOTy3hg0zDOvtaSQ46fo_9sP2E0EspTmU4K0BThCedACx-JzD5BXCMZeI2Zyw1QjzdOP4c",
    slug: "rise-of-desert-first-dining",
    featured: true
  },
  {
    title: "Mastering the Heat: 20 Minutes with Omar Salem",
    excerpt: "The visionary behind 'Sand & Soul' discusses why the traditional wood-fired pit is making a comeback in Jumeirah.",
    category: "Chef Interviews",
    time: "8 Min Read",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCwBjb_etB8bVQb16H9XCqo2yE6KtsGNLcx3cVMI89wgIsSlCHIW-DfBr6Dzpf9RVU8YbYJ7NE9LJnnTp0zQa-mR7jB9dpbIPjBEu5U3pq8tSGC-WfCohdEGG9W-gI8-YLa6Vnnosm4o8em55r_obt24YCIyRN0FGuL47C64aq20oBcCiB2_88Tcm9TsFXA5gG69mpwbnb8HD9wF1bink6ZA075LRffhqUZ7zHUjM5i9BPNOOxcNqot2MnzDUUhLK2fxq2bySmNy8z-",
    slug: "interview-omar-salem"
  },
  {
    title: "Al Quoz: From Warehouses to Specialty Roasters",
    excerpt: "A curated map of the hidden caffeine gems tucked within the city's industrial heartland.",
    category: "Neighborhood Guide",
    time: "6 Min Read",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA6oZTwm7mu9_2bYshXZh7F3db-TUg_lajz2NpDgfackHX8qi-YQzI-qdWhsf4XhADpbUwI8THFXjWNX-0U81CQ_Rvz3suEF4SlNrI4afyylnBW023DWgYCIWHLXqXJd7Yx84gOy99IjI5SY6PIFavohjcB9SISsXBg2Awt3DTshlwNqnsrCHDwJk6IQ0LXaR0oIopFogyoWlsCMrEhz3Biisv7jeI5Qh_37QiGcqUZGfTAx0c_lIukb5PhdqwBU4XIwRlZ1PkOlD4s",
    slug: "al-quoz-coffee-guide"
  }
];

export default function BlogListing() {
  const featured = ARTICLES.find(a => a.featured);
  const others = ARTICLES.filter(a => !a.featured);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 min-h-screen">
        <header className="max-w-[1920px] mx-auto px-8 lg:px-16 mb-24">
          <div className="flex flex-col lg:flex-row items-end justify-between gap-16 pb-16 border-b border-slate-100">
             <div className="space-y-6 max-w-4xl">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Editorial Desk</span>
                <h1 className="text-6xl md:text-9xl font-headline font-black italic tracking-tighter leading-[0.85] text-on-surface">
                   The <br /><span className="text-primary">Journal.</span>
                </h1>
                <p className="text-xl text-slate-500 font-body italic leading-relaxed max-w-xl">
                   In-depth explorations of flavor, architecture, and the visionaries redefining Dubai&apos;s culinary landscape.
                </p>
             </div>
             <div className="flex items-center gap-10">
                <div className="flex flex-col items-end">
                   <span className="text-4xl font-headline font-black italic">500+</span>
                   <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Published Stories</span>
                </div>
                <div className="w-px h-12 bg-slate-200"></div>
                <div className="flex flex-col items-start px-8 py-4 bg-zinc-900 rounded-2xl text-white">
                   <span className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Weekly Briefing</span>
                   <span className="font-headline font-black italic text-xl">The Connoisseur</span>
                </div>
             </div>
          </div>
        </header>

        {/* Featured Hero */}
        {featured && (
          <section className="max-w-[1920px] mx-auto px-8 lg:px-16 mb-32">
             <Link href={`/blog/${featured.slug}`} className="group relative block w-full h-[80vh] rounded-[4rem] overflow-hidden shadow-2xl">
                <Image src={featured.image} alt={featured.title} fill className="object-cover scale-105 group-hover:scale-110 transition-all duration-[2000ms]" />
                <div className="absolute inset-0 bg-zinc-900/40 group-hover:bg-zinc-900/60 transition-all"></div>
                
                <div className="absolute bottom-16 left-16 max-w-4xl space-y-8">
                   <span className="inline-block px-6 py-2 bg-primary text-white text-[10px] font-black uppercase tracking-[0.4em] shadow-2xl">Featured Editorial</span>
                   <h2 className="text-5xl md:text-8xl font-headline font-black italic tracking-tighter leading-[0.85] text-white">
                      {featured.title}.
                   </h2>
                   <p className="text-2xl text-zinc-300 font-body italic leading-relaxed max-w-2xl group-hover:text-white transition-colors">
                      {featured.excerpt}
                   </p>
                   <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">
                      <span>{featured.category}</span>
                      <span className="w-1 h-1 bg-white/20 rounded-full"></span>
                      <span>{featured.time}</span>
                   </div>
                </div>
             </Link>
          </section>
        )}

        {/* Grid Selection */}
        <section className="max-w-[1920px] mx-auto px-8 lg:px-16 grid grid-cols-1 md:grid-cols-2 gap-12 pb-40">
           {others.map((article) => (
             <Link key={article.slug} href={`/blog/${article.slug}`} className="group flex flex-col space-y-8">
                <div className="relative aspect-video rounded-[3rem] overflow-hidden shadow-sm transition-all duration-700 group-hover:shadow-2xl">
                   <Image src={article.image} alt={article.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" />
                   <div className="absolute top-8 left-8">
                      <span className="px-4 py-1.5 bg-white/10 backdrop-blur-xl border border-white/20 text-white text-[9px] font-black uppercase tracking-widest rounded-sm">{article.category}</span>
                   </div>
                </div>
                <div className="space-y-4 px-4">
                   <h3 className="text-4xl font-headline font-black italic tracking-tighter text-on-surface group-hover:text-primary transition-colors leading-[0.9]">
                      {article.title}.
                   </h3>
                   <p className="text-slate-500 font-body italic text-lg leading-relaxed line-clamp-2">
                      {article.excerpt}
                   </p>
                   <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-widest text-slate-300">
                      <span>{article.time}</span>
                      <span className="w-1 h-1 bg-slate-100 rounded-full"></span>
                      <span>Read Story</span>
                   </div>
                </div>
             </Link>
           ))}
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
