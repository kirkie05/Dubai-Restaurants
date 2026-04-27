'use client';

import Image from "next/image";
import { Link } from "@/navigation";
import { useTranslations } from 'next-intl';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUser } from "@clerk/nextjs";
import { sanitize } from "@/lib/sanitize";

interface RestaurantCardProps {
  id: string;
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
  id,
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
  const { user } = useUser();
  const queryClient = useQueryClient();

  const { data: favorites } = useQuery<string[]>({
    queryKey: ['favorites'],
    queryFn: () => fetch('/api/favorites').then(res => res.json()),
    enabled: !!user,
  });

  const isFavorited = favorites?.includes(id);

  const mutation = useMutation({
    mutationFn: async () => {
      const method = isFavorited ? 'DELETE' : 'POST';
      const res = await fetch('/api/favorites', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ restaurantId: id }),
      });
      if (!res.ok) throw new Error('Action failed');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    }
  });

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      alert("Please sign in to save favorites.");
      return;
    }
    mutation.mutate();
  };

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
        <div className="absolute top-5 left-5 rtl:left-auto rtl:right-5 flex flex-col gap-2">
          <span className="bg-white/95 backdrop-blur-xl text-on-surface px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] rounded-sm shadow-sm">
            {location}
          </span>
          {badge && (
            <span className={`${badgeColor === 'primary' ? 'bg-primary' : 'bg-zinc-900'} text-white px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] rounded-sm shadow-sm`}>
              {badge}
            </span>
          )}
        </div>
        <button 
          onClick={handleFavoriteToggle}
          disabled={mutation.isPending}
          className={`absolute top-5 right-5 rtl:right-auto rtl:left-5 w-10 h-10 backdrop-blur-xl rounded-full flex items-center justify-center transition-all duration-500 shadow-xl ${isFavorited ? 'bg-primary text-white scale-110' : 'bg-white/20 text-white hover:bg-white hover:text-primary'}`}
        >
          <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: isFavorited ? "'FILL' 1" : "'FILL' 0" }}>favorite</span>
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
        <p 
          className="text-slate-400 font-body text-sm leading-relaxed line-clamp-2 italic"
          dangerouslySetInnerHTML={{ __html: sanitize(description) }}
        />
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
