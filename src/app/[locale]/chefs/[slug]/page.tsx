import Image from "next/image";
import { Link } from '@/navigation';
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { createAdminClient } from "@/lib/supabase-server";
import { notFound } from "next/navigation";

export default async function ChefProfile({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const supabase = createAdminClient();

  // Find chef by slug (we'll assume full_name slugified or we should add a slug column)
  // For now, let's try to match by name or get all and find
  const { data: chefs, error } = await supabase
    .from('chef_profiles')
    .select(`
      *,
      restaurants (*)
    `)
    .eq('status', 'approved');

  if (error || !chefs) {
    notFound();
  }

  // Simple slug matching logic
  const chef = chefs.find(c => c.full_name.toLowerCase().replace(/ /g, '-') === slug);

  if (!chef) {
    notFound();
  }

  const chefData = {
    name: chef.full_name,
    role: "Culinary Visionary",
    tagline: chef.specialty || "Master Chef",
    quote: chef.bio || "Cooking is the art of assembly.",
    masteryYears: chef.years_experience || 10,
    michelinAccolades: 0,
    image: chef.profile_image_url || "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80",
    signatureDish: {
      name: "Heritage Creation",
      description: "A tribute to culinary tradition.",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80"
    },
    portfolio: chef.restaurants ? [chef.restaurants] : []
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 min-h-screen">
        <section className="relative w-full h-[95vh] overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-full w-full">
             <Image 
               src={chefData.image} 
               alt={chefData.name} 
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
                   Chef <br /><span className="text-primary">{chefData.name}.</span>
                </h1>
                <p className="text-2xl text-zinc-300 font-body italic max-w-2xl leading-relaxed">
                   {chefData.tagline}
                </p>
             </div>

             <div className="flex gap-16">
                <div>
                   <span className="text-4xl font-headline font-black italic text-primary">{chefData.masteryYears}</span>
                   <span className="block text-[9px] font-black uppercase tracking-widest text-zinc-500 mt-1">Years of Mastery</span>
                </div>
                <div className="w-px h-12 bg-white/10"></div>
                <div>
                   <span className="text-4xl font-headline font-black italic text-primary">{chefData.michelinAccolades}</span>
                   <span className="block text-[9px] font-black uppercase tracking-widest text-zinc-500 mt-1">Michelin Stars</span>
                </div>
             </div>
          </div>
        </section>

        <section className="py-40 px-8 lg:px-16 max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-24 items-center">
           <div className="md:col-span-12 lg:col-span-7 space-y-16">
              <div className="space-y-8">
                 <span className="text-primary font-body text-[10px] font-black uppercase tracking-[0.4em] block">The Philosophy</span>
                 <p className="text-4xl lg:text-7xl font-headline font-black italic tracking-tighter text-on-surface leading-[0.9]">
                   &quot;Cooking is the <span className="text-zinc-300">architectural</span> assembly of memories.&quot;
                 </p>
                 <div className="max-w-3xl space-y-8">
                    <p className="text-xl text-slate-500 font-body italic leading-relaxed">
                       {chefData.quote}
                    </p>
                 </div>
              </div>
           </div>

           <div className="md:col-span-12 lg:col-span-5 relative">
              <div className="relative aspect-[4/5] rounded-[4rem] overflow-hidden border-8 border-slate-50 shadow-2xl skew-y-1 hover:skew-y-0 transition-transform duration-1000">
                 <Image src={chefData.signatureDish.image} alt={chefData.signatureDish.name} fill className="object-cover" />
                 <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all"></div>
                 <div className="absolute bottom-12 inset-x-12 text-white space-y-4">
                    <span className="text-primary font-body text-[10px] font-black uppercase tracking-[0.2em]">Signature Highlight</span>
                    <h3 className="text-3xl font-headline font-black italic tracking-tighter leading-tight">{chefData.signatureDish.name}</h3>
                 </div>
              </div>
           </div>
        </section>

        {chefData.portfolio.length > 0 && (
          <section className="py-40 bg-zinc-900 text-white">
             <div className="px-8 lg:px-16 max-w-[1920px] mx-auto space-y-32 text-center">
                <div className="space-y-4">
                   <span className="text-primary font-body text-[10px] font-black uppercase tracking-[0.4em]">Current Residencies</span>
                   <h2 className="text-6xl md:text-9xl font-headline font-black italic tracking-tighter">The Portfolios.</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-12">
                   {chefData.portfolio.map((res: any) => (
                      <Link key={res.name} href={`/restaurant/${res.slug}`} className="group relative w-full h-[600px] rounded-[4rem] overflow-hidden flex items-center justify-center">
                         <Image src={res.image_url} alt={res.name} fill className="object-cover scale-105 group-hover:scale-110 grayscale-0 group-hover:grayscale transition-all duration-[2000ms]" />
                         <div className="absolute inset-0 bg-zinc-900/40 group-hover:bg-zinc-900/70 transition-all"></div>
                         <div className="relative text-center space-y-6 z-10 transition-transform group-hover:scale-110">
                            <p className="text-primary font-body text-xs font-black uppercase tracking-[0.6em]">{res.cuisine_type}</p>
                            <h3 className="text-6xl md:text-9xl font-headline font-black italic tracking-tighter leading-none">{res.name}.</h3>
                            <p className="text-zinc-300 font-body text-xl italic tracking-widest">{res.location}</p>
                         </div>
                      </Link>
                   ))}
                </div>
             </div>
          </section>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
