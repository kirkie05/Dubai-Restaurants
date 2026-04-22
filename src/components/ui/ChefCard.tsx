import Image from "next/image";
import { Link } from "@/navigation";
import { useTranslations } from 'next-intl';

interface ChefCardProps {
  name: string;
  role: string;
  restaurant: string;
  image: string;
  slug: string;
  stars?: number;
}

export function ChefCard({ name, role, restaurant, image, slug, stars }: ChefCardProps) {
  const t = useTranslations('ChefCard');
  
  return (
    <Link href={`/chefs/${slug}`} className="group block relative aspect-[3/4] rounded-[4rem] overflow-hidden bg-zinc-900 border border-white/5 shadow-2xl transition-all duration-700 hover:shadow-primary/20">
      {/* High-Fidelity Background Image */}
      <Image 
        src={image} 
        alt={name} 
        fill 
        className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" 
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      
      {/* Explicit Content Overlays */}
      <div className="absolute inset-x-0 bottom-0 p-12 pt-24 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent">
         {/* Top Data Layer */}
         <div className="flex justify-between items-center mb-6">
            <div className="flex flex-col gap-1">
               <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">{t('masterCurator')}</span>
               <div className="w-8 h-0.5 bg-primary/30"></div>
            </div>
            {stars && (
               <div className="flex gap-1 bg-white/5 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/5">
                  {[...Array(stars)].map((_, i) => (
                     <span key={i} className="material-symbols-outlined text-[10px] text-primary" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                  ))}
               </div>
            )}
         </div>

         {/* Identity Layer */}
         <div className="space-y-3">
            <h3 className="text-4xl font-headline font-black italic tracking-tighter text-white leading-none">
              {name}<span className="text-primary">.</span>
            </h3>
            <div className="flex items-center gap-4">
               <p className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-400 whitespace-nowrap">{role}</p>
               <div className="w-1 h-1 rounded-full bg-zinc-700"></div>
               <p className="text-[9px] font-black uppercase tracking-[0.3em] text-secondary whitespace-nowrap">{restaurant}</p>
            </div>
         </div>
      </div>

      {/* Hover Reveal Border Decor */}
      <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/20 transition-all duration-700 rounded-[4rem] pointer-events-none"></div>
    </Link>
  );
}
