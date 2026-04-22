"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

const BLOGS = [
  { id: 1, title: "How to choose a Restaurant for your next meal out?", date: "August 8, 2024", author: "Janet Martin", image: "/cuisine_italian_high_fidelity_1776785759860.png", category: "Guide" },
  { id: 2, title: "The Rise of Underground Dining in Old Dubai", date: "August 12, 2024", author: "Elena Rossi", image: "/ossiano_restaurant_1776785646414.png", category: "Editorial" },
  { id: 3, title: "Top 10 Hidden Gem Brunch Spots for Families", date: "August 15, 2024", author: "Zayn Malik", image: "/tijuana_flare_restaurant_1776785691604.png", category: "List" }
];

export function BlogPreview() {
  const t = useTranslations("BlogPreview");

  const BLOGS = [
    { id: 1, title: t("blogs.post1.title"), date: "August 8, 2024", author: t("blogs.post1.author"), image: "/cuisine_italian_high_fidelity_1776785759860.png", category: t("blogs.post1.category") },
    { id: 2, title: t("blogs.post2.title"), date: "August 12, 2024", author: t("blogs.post2.author"), image: "/ossiano_restaurant_1776785646414.png", category: t("blogs.post2.category") },
    { id: 3, title: t("blogs.post3.title"), date: "August 15, 2024", author: t("blogs.post3.author"), image: "/tijuana_flare_restaurant_1776785691604.png", category: t("blogs.post3.category") }
  ];

  return (
    <section id="blog" className="py-24 px-8 bg-white overflow-hidden scroll-mt-24">
      <div className="max-w-7xl mx-auto space-y-20">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-l-4 border-zinc-900 pl-8">
          <div className="space-y-2">
            <h2 className="text-4xl font-headline font-black italic tracking-tight text-on-surface">{t("title")}</h2>
            <p className="text-slate-400 font-body text-sm font-medium">{t("subtitle")}</p>
          </div>
          <Link href="/blog" className="text-primary font-body text-[10px] font-bold uppercase tracking-[0.3em] flex items-center gap-3 border-b-2 border-primary/10 pb-1 hover:border-primary transition-all">
             {t("seeMore")} <span className="material-symbols-outlined text-sm">east</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {BLOGS.map((blog) => (
            <div key={blog.id} className="group italic">
               <div className="relative aspect-square rounded-2xl overflow-hidden mb-8 border border-slate-50 shadow-sm">
                  <Image src={blog.image} alt={blog.title} fill className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1500ms]" />
                  <div className="absolute top-6 left-6 bg-primary text-white text-[9px] font-bold px-3 py-1.5 rounded-sm uppercase tracking-widest">{blog.category}</div>
               </div>
               <div className="space-y-6">
                  <div className="flex items-center gap-4 text-slate-400 font-body text-[10px] font-bold uppercase tracking-widest">
                     <span>{blog.author}</span>
                     <span className="w-4 h-px bg-slate-200"></span>
                     <span>{blog.date}</span>
                  </div>
                  <h4 className="text-2xl font-headline font-black text-on-surface leading-tight tracking-tighter hover:text-primary transition-colors cursor-pointer">
                    {blog.title}
                  </h4>
                  <Link href={`/blog/${blog.id}`} className="inline-flex items-center gap-3 text-primary font-body text-[9px] font-bold uppercase tracking-[0.2em] group-hover:gap-6 transition-all duration-500">
                    {t("continueReading")} <span className="material-symbols-outlined text-sm">arrow_right_alt</span>
                  </Link>
               </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
