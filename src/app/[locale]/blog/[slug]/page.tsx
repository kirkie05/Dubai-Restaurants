import Image from "next/image";
import { Link } from '@/navigation';
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { createAdminClient } from "@/lib/supabase-server";
import { notFound } from "next/navigation";

export default async function BlogArticle({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const supabase = createAdminClient();

  const { data: post, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !post) {
    notFound();
  }

  const article = {
    title: post.title,
    subtitle: post.excerpt,
    author: post.author_name || "Dubai Restaurants Editorial",
    date: post.published_at ? new Date(post.published_at).toLocaleDateString() : "Unpublished",
    category: "Editorial",
    readTime: "8 Min Read",
    image: post.cover_image_url || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80",
    body: post.body
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
                    <Image src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Author" fill className="object-cover" />
                 </div>
                 <span className="text-[10px] font-black uppercase tracking-widest text-zinc-900">By {article.author}</span>
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
           <div 
             className="prose prose-xl prose-slate font-body italic leading-relaxed first-letter:text-7xl first-letter:font-headline first-letter:font-black first-letter:text-primary first-letter:mr-3 first-letter:float-left"
             dangerouslySetInnerHTML={{ __html: article.body }}
           />
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
