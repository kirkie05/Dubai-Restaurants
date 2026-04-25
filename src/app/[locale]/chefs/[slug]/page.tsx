import Image from "next/image";
import { Link } from '@/navigation';
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default async function ChefProfile({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const chef = {
    name: "Alessandro Rossi",
    role: "Culinary Visionary",
    tagline: "Bridging the heritage of Tuscan soil with the avant-garde skyline of Dubai.",
    quote: "Cooking is not just the transformation of ingredients. It is the architectural assembly of memories. In Dubai, I found a canvas where the desert's heat meets the sea's salt.",
    masteryYears: 22,
    michelinAccolades: 3,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC0YR_X5EfqWk2YcYK9qt6sGz3nUzQR_oc2LZPaeywOsa8HawGMpRiPwwAWhV1e5V0HOKtxOZ938nNtdihl2Nb9HBS52GblmeJo8ZrNXilw4YXnfYXfTWRigzAL5ddeMUJy0trRVmPETJPd65SK3aFEkQl69dPWDFIHa3lr670tRNJwfA5rfb2bWqcE0SDQVF3iIg8jOKtm5ZnzZheT-33gFXdtvUcB6nampkPffnxa27fi_bKkjbL46K8NDlx-SEkQm0p7Acrv6Vjx",
    signatureDish: {
      name: "Saffron Risotto with Gold-Leaf Infused Truffle",
      description: "A tribute to the opulence of the UAE fused with Italian soul.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBOUp5tpcPb1Um_pZl2ib-_dVZsNsWUPSZT9SAdriZ8ihuHq8mmugN9a9PUROQthExFyRaDMDgPkrdAVDfB_PNMGwMu0Dl03UtEia8N6brhzGccfoW5XnkouDNYHxRXi8WLc6c3R9mVg_dmoOZR115uFS3KYQ0b0FGF3PlO_6Q4AHsQllekTAqSM47vyb0Wk5DcIogHRPYHL_qhnGSveRmDyJ7IvcmmWsYPHEoeZzTZ7L-QjHjSVmTSwl6J70rff6zgn8wG1xRG_jYa"
    },
    portfolio: [
      {
        name: "The Gilded Lily",
        location: "Downtown Dubai",
        cuisine: "Modern Fusion",
        rating: "4.9",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAgpy3zHGxlV7NpbxRefQ0I9jK1IUy7fSkRgvn38IRcEfYSItV-RlN9CL4r1aZmidlImGdgcIV8kVmqYmdc2vA0JIY7EM2dmdt4fsfaxweb3o7ITfmdP03SBMLDVf7-Qvk-2ykTV755gPlsn7bG9Nb4PsP_u60bb0DBEbhO5LyoqgyLFWaOAEt0wYL3S5rj18wdEEP8u7Uh6qb9kPq0f0Cikc7ElGCQrsL6uv8jVzfkT0kG1O-jY3t5UzrJUD6wuV4bvnDuEq050JIh"
      }
    ]
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 min-h-screen">
        {/* Immersive Profile Hero */}
        <section className="relative w-full h-[95vh] overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-full w-full">
             <Image 
               src={chef.image} 
               alt={chef.name} 
               fill 
               className="object-cover scale-105"
               priority
             />
             <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/90 via-zinc-900/40 to-transparent"></div>
          </div>
          
          <div className="absolute bottom-0 left-0 w-full px-8 lg:px-16 pb-24 max-w-[1920px] mx-auto flex flex-col items-start gap-12 z-10">
             <div className="space-y-6 max-w-4xl">
                <span className="text-primary font-body text-[10px] font-black uppercase tracking-[0.4em] block">Principal Authority</span>
                <h1 className="text-6xl md:text-9xl font-headline font-black italic tracking-tighter leading-[0.8] text-white">
                   Chef <br /><span className="text-primary">{chef.name}.</span>
                </h1>
                <p className="text-2xl text-zinc-300 font-body italic max-w-2xl leading-relaxed">
                   {chef.tagline}
                </p>
             </div>

             <div className="flex gap-16">
                <div>
                   <span className="text-4xl font-headline font-black italic text-primary">{chef.masteryYears}</span>
                   <span className="block text-[9px] font-black uppercase tracking-widest text-zinc-500 mt-1">Years of Mastery</span>
                </div>
                <div className="w-px h-12 bg-white/10"></div>
                <div>
                   <span className="text-4xl font-headline font-black italic text-primary">{chef.michelinAccolades}</span>
                   <span className="block text-[9px] font-black uppercase tracking-widest text-zinc-500 mt-1">Michelin Stars</span>
                </div>
             </div>
          </div>
        </section>

        {/* The Manifesto */}
        <section className="py-40 px-8 lg:px-16 max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-24 items-center">
           <div className="md:col-span-12 lg:col-span-7 space-y-16">
              <div className="space-y-8">
                 <span className="text-primary font-body text-[10px] font-black uppercase tracking-[0.4em] block">The Philosophy</span>
                 <p className="text-4xl lg:text-7xl font-headline font-black italic tracking-tighter text-on-surface leading-[0.9]">
                   &quot;Cooking is the <span className="text-zinc-300">architectural</span> assembly of memories.&quot;
                 </p>
                 <div className="max-w-3xl space-y-8">
                    <p className="text-xl text-slate-500 font-body italic leading-relaxed">
                       {chef.quote}
                    </p>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                 <div className="space-y-4 border-l-2 border-slate-100 pl-8">
                    <h4 className="font-headline font-black text-2xl italic">The Technique.</h4>
                    <p className="text-slate-400 font-body text-sm italic">Fusing traditional Tuscan heritage with the molecular precision of the modern lab.</p>
                 </div>
                 <div className="space-y-4 border-l-2 border-slate-100 pl-8">
                    <h4 className="font-headline font-black text-2xl italic">The Sourcing.</h4>
                    <p className="text-slate-400 font-body text-sm italic">Direct partnerships with local desert farms and Adriatic fishermen for unrivaled authenticity.</p>
                 </div>
              </div>
           </div>

           <div className="md:col-span-12 lg:col-span-5 relative">
              <div className="relative aspect-[4/5] rounded-[4rem] overflow-hidden border-8 border-slate-50 shadow-2xl skew-y-1 hover:skew-y-0 transition-transform duration-1000">
                 <Image src={chef.signatureDish.image} alt={chef.signatureDish.name} fill className="object-cover" />
                 <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all"></div>
                 <div className="absolute bottom-12 inset-x-12 text-white space-y-4">
                    <span className="text-primary font-body text-[10px] font-black uppercase tracking-[0.2em]">Signature Highlight</span>
                    <h3 className="text-3xl font-headline font-black italic tracking-tighter leading-tight">{chef.signatureDish.name}</h3>
                 </div>
              </div>
           </div>
        </section>

        {/* Current Residencies */}
        <section className="py-40 bg-zinc-900 text-white">
           <div className="px-8 lg:px-16 max-w-[1920px] mx-auto space-y-32 text-center">
              <div className="space-y-4">
                 <span className="text-primary font-body text-[10px] font-black uppercase tracking-[0.4em]">Current Residencies</span>
                 <h2 className="text-6xl md:text-9xl font-headline font-black italic tracking-tighter">The Portfolios.</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-12">
                 {chef.portfolio.map((res) => (
                    <Link key={res.name} href={`/restaurant/${res.name.toLowerCase().replace(/ /g, '-')}`} className="group relative w-full h-[600px] rounded-[4rem] overflow-hidden flex items-center justify-center">
                       <Image src={res.image} alt={res.name} fill className="object-cover scale-105 group-hover:scale-110 grayscale-0 group-hover:grayscale transition-all duration-[2000ms]" />
                       <div className="absolute inset-0 bg-zinc-900/40 group-hover:bg-zinc-900/70 transition-all"></div>
                       <div className="relative text-center space-y-6 z-10 transition-transform group-hover:scale-110">
                          <p className="text-primary font-body text-xs font-black uppercase tracking-[0.6em]">{res.cuisine}</p>
                          <h3 className="text-6xl md:text-9xl font-headline font-black italic tracking-tighter leading-none">{res.name}.</h3>
                          <p className="text-zinc-300 font-body text-xl italic tracking-widest">{res.location}</p>
                       </div>
                    </Link>
                 ))}
              </div>
           </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
