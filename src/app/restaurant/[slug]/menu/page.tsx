import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function RestaurantMenu({ params }: { params: { slug: string } }) {
  const categories = [
    {
      name: "The Curation Starts",
      items: [
        { name: "Saffron Crystal Scallop", desc: "Hokkaido scallops, Persian saffron, sea buckthorn.", price: "185" },
        { name: "Wagyu Carpaccio", desc: "A5 Kagoshima, truffle emulsion, gold leaf.", price: "245" }
      ]
    },
    {
      name: "Signature Mains",
      items: [
        { name: "Levantine Lamb Rack", desc: "12-hour braise, pomegranate glaze, pistachio crumble.", price: "380" },
        { name: "Sea Salt Seabass", desc: "Crusted in Mediterranean salt, lemon zest, herbs.", price: "320" }
      ]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-on-surface">
      <Navbar />
      
      <main className="pt-32 min-h-screen">
        <div className="max-w-4xl mx-auto px-8 py-20 space-y-24">
           <header className="text-center space-y-4">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">High-Fidelity Menu</span>
              <h1 className="text-6xl md:text-8xl font-headline font-black italic tracking-tighter leading-none">The <span className="text-zinc-400">Card.</span></h1>
              <p className="text-slate-400 font-body text-sm font-medium italic mt-6">Seasonally curated by Chef Marcus Vane. Prices in AED.</p>
           </header>

           <div className="space-y-32">
              {categories.map((cat) => (
                <section key={cat.name} className="space-y-16">
                   <div className="flex items-center gap-8">
                      <h2 className="text-3xl font-headline font-black italic whitespace-nowrap">{cat.name}</h2>
                      <div className="w-full h-px bg-slate-100"></div>
                   </div>

                   <div className="space-y-12">
                      {cat.items.map((item) => (
                        <div key={item.name} className="flex justify-between items-start gap-12 group cursor-pointer">
                           <div className="space-y-2">
                              <h3 className="text-2xl font-headline font-black italic group-hover:text-primary transition-colors">{item.name}</h3>
                              <p className="text-slate-400 font-body text-sm italic max-w-lg">{item.desc}</p>
                           </div>
                           <div className="text-xl font-headline font-bold italic border-b border-primary/20 pb-1">{item.price}</div>
                        </div>
                      ))}
                   </div>
                </section>
              ))}
           </div>

           <footer className="pt-20 border-t border-slate-100 text-center">
              <Link href={`/restaurant/${params.slug}`} className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Back to Experience</Link>
           </footer>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
