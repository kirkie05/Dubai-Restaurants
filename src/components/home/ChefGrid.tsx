import Link from "next/link";
import { ChefCard } from "@/components/ui/ChefCard";

const TOP_CHEFS = [
  {
    name: "Himanshu Saini",
    role: "Culinary Visionary",
    restaurant: "Tresind Studio",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCruulr_m5Dmt8w0mUSFYDpos34q-Xei7ZwRHJ9_LH7Inm8M2FL9hvfyEXAVTprCejuOqkoe_uRLFLhfC4JYaAqe_5NA4zt4IpMwqG6hKI5FDJxO3IAVhJ0HDQD3jY9aijq95Z7RZHxpZ5LsexFnHvPLGLGbgrd0uV-QtCB9QtTq7jrhMzAhq0grpuDCQDs3YG5wUvyzpbtZFRc3XGGmIEPLMPL0TAKMqV26r7KMt5eSbWNvdiTHuP30vTZvqHOIPPvSzTiszUZsh8u",
    slug: "himanshu-saini",
    stars: 2
  },
  {
    name: "Gregoire Berger",
    role: "Ocean Narrative Master",
    restaurant: "Ossiano",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC6GpqaymnSzwuwWm7ZY-H45U0Q9-QSjNFgfVQaKsTHy8PRanBYH-h8gZd07dt1jHcHdrsFjF0Lgl90SHesTUuH_yybRrolcocMmQVcyvj82BSqdyOXdCjOaHjiDDvw-UQLPizSBIIJ_40fNSRcu3vlsd3RN4AbUxCgANAI9Pq1pvXYwefcrVsNdxnXSz__5S7DPaCjFNOnsbdaCNnbyGO-0kc4opr10SDzjBY6BlVR4ZOTewpUT3bm9Ln4136IYnH0Bwti02sUd85v",
    slug: "gregoire-berger",
    stars: 1
  },
  {
    name: "Mohamad Orfali",
    role: "Contemporary Pioneer",
    restaurant: "Orfali Bros",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD-Mn3VfstTh6o3L6SjYskEApEpYXGgUOGgmrZIRvdRuatACz82KGEoe_dZi1LHGPSGlttJlLdO3Bf7qt9R5uiUx7xle3W-EOuxW67f8UAnW81QcVyF00k1RFYJ5sPSiRlLHi00ZecET7JWgQt3einGYeZRnxhExhRu5YDF16Sc2OIixQ8vf-k3eQSq3V8IYjDYXf6Z4ehyD2LreChpW4CGZmQnAOjNspmb954v2IZ1bSU09taNNOCO929NR-oAsWWjyBUb7xuoBulv",
    slug: "mohamad-orfali",
    stars: 1
  }
];

export function ChefGrid() {
  return (
    <section className="py-32 lg:py-48 px-6 lg:px-16 bg-white relative overflow-hidden">
      {/* UAE Flag Mosaic Background Decor */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none">
         <div className="grid grid-cols-2 h-full">
            <div className="bg-primary"></div>
            <div className="bg-secondary"></div>
            <div className="bg-white border border-slate-100"></div>
            <div className="bg-zinc-950"></div>
         </div>
      </div>

      <div className="max-w-[1920px] mx-auto space-y-24 relative z-10">
        <header className="flex flex-col lg:flex-row justify-between items-end gap-12 pb-16 border-b border-slate-100">
           <div className="space-y-6">
              <div className="flex items-center gap-6">
                 <span className="text-primary font-body text-[10px] font-black uppercase tracking-[0.6em] block">The Minds</span>
                 <div className="w-12 h-px bg-slate-200"></div>
                 <span className="text-secondary font-body text-[10px] font-black uppercase tracking-[0.6em] block">Verified Authority</span>
              </div>
              <h2 className="text-6xl md:text-8xl font-headline font-black italic tracking-tighter leading-none text-on-surface">The <span className="text-zinc-300">Masters.</span></h2>
              <p className="text-xl text-slate-500 font-body italic leading-relaxed max-w-2xl">
                 A curated portal to Dubai&apos;s culinary visionaries. Architects of flavor redefining the city&apos;s gastronomic identity with generational mastery.
              </p>
           </div>
           <Link href="/chefs" className="text-[10px] font-black uppercase tracking-[0.4em] text-primary border-b-2 border-primary/20 pb-2 hover:border-primary transition-all font-body flex items-center gap-3">
              Meet All Culinary Masters
              <span className="material-symbols-outlined text-base">arrow_forward</span>
           </Link>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
           {TOP_CHEFS.map((chef) => (
             <div key={chef.slug} className="group relative">
                <ChefCard {...chef} />
                {/* Brand Overlay for Home Grid */}
                <div className="absolute top-8 right-8 bg-secondary text-white text-[8px] font-black px-4 py-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100 origin-right">
                   VERIFIED MASTER
                </div>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
}
