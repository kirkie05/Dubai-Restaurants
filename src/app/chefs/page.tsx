import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const CHEFS = [
  {
    name: "Himanshu Saini",
    role: "Culinary Visionary",
    restaurant: "Tresind Studio",
    quote: "Reinventing Indian heritage through a lens of modern molecular gastronomy. Every dish is a memory redefined.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCruulr_m5Dmt8w0mUSFYDpos34q-Xei7ZwRHJ9_LH7Inm8M2FL9hvfyEXAVTprCejuOqkoe_uRLFLhfC4JYaAqe_5NA4zt4IpMwqG6hKI5FDJxO3IAVhJ0HDQD3jY9aijq95Z7RZHxpZ5LsexFnHvPLGLGbgrd0uV-QtCB9QtTq7jrhMzAhq0grpuDCQDs3YG5wUvyzpbtZFRc3XGGmIEPLMPL0TAKMqV26r7KMt5eSbWNvdiTHuP30vTZvqHOIPPvSzTiszUZsh8u",
    slug: "himanshu-saini",
    stars: 2
  },
  {
    name: "Gregoire Berger",
    role: "Ocean Narrative Master",
    restaurant: "Ossiano",
    quote: "Ocean-inspired narratives served within an underwater sanctuary. A master of sustainable seafood storytelling.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC6GpqaymnSzwuwWm7ZY-H45U0Q9-QSjNFgfVQaKsTHy8PRanBYH-h8gZd07dt1jHcHdrsFjF0Lgl90SHesTUuH_yybRrolcocMmQVcyvj82BSqdyOXdCjOaHjiDDvw-UQLPizSBIIJ_40fNSRcu3vlsd3RN4AbUxCgANAI9Pq1pvXYwefcrVsNdxnXSz__5S7DPaCjFNOnsbdaCNnbyGO-0kc4opr10SDzjBY6BlVR4ZOTewpUT3bm9Ln4136IYnH0Bwti02sUd85v",
    slug: "gregoire-berger",
    stars: 1
  }
];

export default function ChefListing() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 min-h-screen">
        <header className="max-w-[1920px] mx-auto px-8 lg:px-16 mb-32">
          <div className="flex flex-col lg:flex-row items-end justify-between gap-16 pb-16 border-b border-slate-100">
             <div className="space-y-6 max-w-4xl">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Culinary Artisans</span>
                <h1 className="text-6xl md:text-9xl font-headline font-black italic tracking-tighter leading-[0.85] text-on-surface">
                   The <br /><span className="text-zinc-400">Masters.</span>
                </h1>
                <p className="text-xl text-slate-500 font-body italic leading-relaxed max-w-xl">
                   A curated directory of the visionary minds redefining Dubai&apos;s gastronomic landscape. From Michelin legends to local avant-garde pioneers.
                </p>
             </div>
             <div className="flex items-center gap-10">
                <div className="flex flex-col items-end">
                   <span className="text-4xl font-headline font-black italic">140+</span>
                   <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Verified Chefs</span>
                </div>
                <div className="w-px h-12 bg-slate-200"></div>
                <div className="flex flex-col items-start px-8 py-4 bg-zinc-900 rounded-2xl text-white">
                   <span className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Featured Selection</span>
                   <span className="font-headline font-black italic text-xl">The Michelin Board</span>
                </div>
             </div>
          </div>
        </header>

        <section className="max-w-[1920px] mx-auto px-8 lg:px-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
           {CHEFS.map((chef) => (
             <Link key={chef.slug} href={`/chefs/${chef.slug}`} className="group flex flex-col space-y-6">
                <div className="relative aspect-[3/4] overflow-hidden rounded-[2.5rem] bg-slate-50 border border-slate-50 shadow-sm transition-all duration-700 hover:shadow-2xl">
                   <Image 
                     src={chef.image} 
                     alt={chef.name} 
                     fill 
                     className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                   />
                   <div className="absolute top-8 left-8 flex gap-2">
                      {[...Array(chef.stars)].map((_, i) => (
                        <span key={i} className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center border-2 border-white shadow-xl">
                           <span className="material-symbols-outlined text-[10px] font-black" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                        </span>
                      ))}
                   </div>
                   <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div className="space-y-3 px-2">
                   <p className="text-primary font-body text-[10px] font-black uppercase tracking-[0.3em]">{chef.role}</p>
                   <h2 className="text-4xl font-headline font-black italic tracking-tighter text-on-surface group-hover:text-primary transition-colors">{chef.name}</h2>
                   <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                      <span>{chef.restaurant}</span>
                      <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                      <span>Discover Profile</span>
                   </div>
                </div>
             </Link>
           ))}
        </section>

        <section className="mt-48 max-w-[1920px] mx-auto px-8 lg:px-16 pb-40">
           <div className="grid grid-cols-1 md:grid-cols-12 gap-24 items-center">
              <div className="md:col-span-12 lg:col-span-8 flex flex-col md:flex-row gap-16 items-center">
                 <div className="relative w-full aspect-video rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white skew-y-1">
                    <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCQaZ4Rzc4yh_i9VR536sMqU5IBHantXMBrYBHokcOmg9dIbwIROyioKWiPgXvM1Xex7Qn45bdBXrnPFK6sIMzuW1dBqql49dAoBCtgrDZomgB5586Olg-3jakrU-1dWLBmMoJL0uAty__ERh9lsuWyQK39CRq6-nZ3TSQGyqfdYR8V-wFGHZc4g6cs2Urhj_peVI7bk9kKcheCUSOXTbk0HNk0L24bItA_BldAVnbNOkHQj_xcq58wbCLpOLADYKruPqAb30R01Z2" alt="Culinary Workshop" fill className="object-cover" />
                 </div>
                 <div className="lg:w-2/3 space-y-8">
                    <span className="text-primary font-body text-[10px] font-black uppercase tracking-[0.3em] block">Beyond the Kitchen</span>
                    <h2 className="text-4xl md:text-6xl font-headline font-black italic tracking-tighter leading-[0.9]">The Culinary <br />Narrative.</h2>
                    <p className="text-slate-500 font-body text-xl italic leading-relaxed">
                       Explore in-depth interviews, exclusive recipes, and the manifestos behind Dubai&apos;s most influential kitchens.
                    </p>
                    <button className="bg-zinc-900 text-white px-10 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-2xl hover:bg-primary transition-all">Explore the Journal</button>
                 </div>
              </div>
           </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
