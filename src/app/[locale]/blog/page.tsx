import Image from "next/image";
import { Link } from '@/navigation';
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { createAdminClient } from "@/lib/supabase-server";

export default async function BlogListing() {
  const supabase = createAdminClient();
  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false });

  const articles = (posts || []).map(post => ({
    title: post.title,
    excerpt: post.excerpt,
    category: "Editorial", // Could add category column to DB
    time: "8 Min Read",
    image: post.cover_image_url || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80",
    slug: post.slug,
    featured: post.id === (posts?.[0]?.id) // Make first one featured for now
  }));

  const featured = articles.find(a => a.featured);
  const others = articles.filter(a => !a.featured);

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
                   <span className="text-4xl font-headline font-black italic">{articles.length}</span>
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
