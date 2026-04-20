import Image from "next/image";
import Link from "next/link";

interface ChefCardProps {
  name: string;
  role: string;
  restaurant: string;
  image: string;
  slug: string;
  stars?: number;
}

export function ChefCard({ name, role, restaurant, image, slug, stars }: ChefCardProps) {
  return (
    <Link href={`/chefs/${slug}`} className="group relative overflow-hidden rounded-[3rem] aspect-[3/4] bg-zinc-900 border border-white/5 shadow-2xl">
      <Image 
        src={image} 
        alt={name} 
        fill 
        className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent"></div>
      
      <div className="absolute bottom-8 left-8 right-8 space-y-3">
         <div className="flex justify-between items-center">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Master Curator</span>
            {stars && (
               <div className="flex gap-0.5">
                  {[...Array(stars)].map((_, i) => (
                     <span key={i} className="material-symbols-outlined text-[10px] text-primary" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                  ))}
               </div>
            )}
         </div>
         <div>
            <h3 className="text-3xl font-headline font-black italic tracking-tighter text-white">{name}.</h3>
            <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400">{role} · {restaurant}</p>
         </div>
      </div>
    </Link>
  );
}
