import Image from "next/image";
import Link from "next/link";

const BLOGS = [
  { id: 1, title: "How to choose a Restaurant for your next meal out?", date: "August 8, 2024", author: "Janet Martin", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAzv0qhsoRFmpbHaf_2gJ_lKOUMZVdzV0SBQT9r1fZ1EEpAv2epAT_tNIR6XOChNUVmNnOvDAbZK6SaW4Bn1dHTQo3VJOBeyrqTBElxkS8ZbtUdNglTvQM9CBzWTmgyMnWBo4vOA9PsIu5tcJIGAy5Gk8mxTzZXEUzIRv3LG0iF2ABnY4Yl4UMWSO8A2-Z6v90UL2S2Dq_IzNTcJimIMCVNtrTylS4qApQ1XawxxKhd4h8h9xQ6fLaB6rC5xCWKYJ7MAbISfcTbl7ty", category: "Guide" },
  { id: 2, title: "The Rise of Underground Dining in Old Dubai", date: "August 12, 2024", author: "Elena Rossi", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBCQaZ4Rzc4yh_i9VR536sMqU5IBHantXMBrYBHokcOmg9dIbwIROyioKWiPgXvM1Xex7Qn45bdBXrnPFK6sIMzuW1dBqql49dAoBCtgrDZomgB5586Olg-3jakrU-1dWLBmMoJL0uAty__ERh9lsuWyQK39CRq6-nZ3TSQGyqfdYR8V-wFGHZc4g6cs2Urhj_peVI7bk9kKcheCUSOXTbk0HNk0L24bItA_BldAVnbNOkHQj_xcq58wbCLpOLADYKruPqAb30R01Z2", category: "Editorial" },
  { id: 3, title: "Top 10 Hidden Gem Brunch Spots for Families", date: "August 15, 2024", author: "Zayn Malik", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAGa4CwW44iM04VNtHF6xpbm3v-__4K0qWXbVOgML_MZ0bCI1maDFyaT2OufKmnTeReschX3WXF-8DDdsgUWIyM-ZPVKfWCDqfbGIFguAMlHxvppgnxBUW2KdpfQL5E26DbsWA23Xy5a1-kb5N3DCGI9JwTY_53PouhL748ldeA5TcFUFiOVAHbq4FUJpGBfnD_yF6Cc3_0JBD7kdM_fuQGUSHdCVY-bIwyxI2E2pc9Q0MAIyApeYbpKbR8nvfsCjnEFKv-6ig6tGjq", category: "List" }
];

export function BlogPreview() {
  return (
    <section className="py-24 px-8 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-20">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-l-4 border-zinc-900 pl-8">
          <div className="space-y-2">
            <h2 className="text-4xl font-headline font-black italic tracking-tight text-on-surface">Our Latest Blog Posts</h2>
            <p className="text-slate-400 font-body text-sm font-medium">Inside stories from the Dubai culinary scene.</p>
          </div>
          <Link href="/blog" className="text-primary font-body text-[10px] font-bold uppercase tracking-[0.3em] flex items-center gap-3 border-b-2 border-primary/10 pb-1 hover:border-primary transition-all">
             See More <span className="material-symbols-outlined text-sm">east</span>
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
                    Continue Reading <span className="material-symbols-outlined text-sm">arrow_right_alt</span>
                  </Link>
               </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
