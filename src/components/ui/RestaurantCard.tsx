import Image from "next/image";
import { Link } from "@/navigation";
import { useTranslations } from 'next-intl';

interface RestaurantCardProps {
  name: string;
  image: string;
  location: string;
  cuisine: string;
  price: string;
  rating: string;
  description: string;
  badge?: string;
  badgeColor?: 'primary' | 'secondary';
  slug: string;
}

export const RestaurantCard = ({
  name,
  image,
  location,
  cuisine,
  price,
  rating,
  description,
  badge,
  badgeColor = 'primary',
  slug
}: RestaurantCardProps) => {
  const t = useTranslations('RestaurantCard');

  return (
    <Link href={`/restaurant/${slug}`} className="group cursor-pointer">
      <div className="relative overflow-hidden mb-6 aspect-[4/5] rounded-2xl border border-slate-50 shadow-sm">
        <Image 
          src={image}
          alt={name}
          fill
          className="w-full h-full object-cover grayscale transition-all duration-[1200ms] group-hover:grayscale-0 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-5 left-5 flex flex-col gap-2">
          <span className="bg-white/95 backdrop-blur-xl text-on-surface px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] rounded-sm shadow-sm">
            {location}
          </span>
          {badge && (
            <span className={`${badgeColor === 'primary' ? 'bg-primary' : 'bg-zinc-900'} text-white px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] rounded-sm shadow-sm`}>
              {badge}
            </span>
          )}
        </div>
        <button className="absolute top-5 right-5 w-10 h-10 bg-white/20 hover:bg-white backdrop-blur-xl rounded-full flex items-center justify-center text-white hover:text-primary transition-all duration-500 shadow-xl">
          <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 0" }}>favorite</span>
        </button>
      </div>
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div className="flex-grow">
            <p className="text-primary font-body text-[10px] font-bold uppercase tracking-[0.3em] mb-1">{cuisine}</p>
            <h2 className="font-headline text-3xl font-black tracking-tighter italic text-on-surface">{name}</h2>
          </div>
          <div className="flex items-center gap-1.5 bg-zinc-900 text-white px-3 py-1 rounded-full shadow-lg">
            <span className="material-symbols-outlined text-primary text-[10px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            <span className="text-[10px] font-bold tracking-widest">{rating}</span>
          </div>
        </div>
        <p className="text-slate-400 font-body text-sm leading-relaxed line-clamp-2 italic">{description}</p>
        <div className="flex items-center gap-6 pt-2 border-t border-slate-50">
          <div className="flex flex-col">
            <span className="text-[9px] font-black uppercase text-slate-300 tracking-[0.2em] mb-1">{t('pricing')}</span>
            <span className="text-xs font-bold text-on-surface">{price}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-black uppercase text-slate-300 tracking-[0.2em] mb-1">{t('status')}</span>
            <span className="text-xs font-bold text-success flex items-center gap-1">
              <span className="w-1 h-1 bg-success rounded-full"></span>
              {t('openNow')}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
