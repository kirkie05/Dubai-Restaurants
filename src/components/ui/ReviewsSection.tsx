'use client';

import { useQuery } from '@tanstack/react-query';
import { WriteReviewForm } from './WriteReviewForm';
import { useUser } from '@clerk/nextjs';

interface Review {
  id: string;
  rating: number;
  title?: string;
  body: string;
  created_at: string;
  user_id: string;
}

interface ReviewsSectionProps {
  restaurantId: string;
}

export function ReviewsSection({ restaurantId }: ReviewsSectionProps) {
  const { user } = useUser();
  
  const { data: reviews, isLoading } = useQuery<Review[]>({
    queryKey: ['reviews', restaurantId],
    queryFn: async () => {
      const res = await fetch(`/api/reviews?restaurantId=${restaurantId}`);
      if (!res.ok) throw new Error('Failed to fetch reviews');
      return res.json();
    }
  });

  return (
    <section className="py-32 px-8 lg:px-16 max-w-[1920px] mx-auto space-y-20 border-t border-slate-50">
      <div className="flex flex-col md:flex-row justify-between items-end gap-8">
        <div className="space-y-4">
          <span className="text-primary font-body text-[10px] font-black uppercase tracking-[0.4em] block">Guest Intelligence</span>
          <h2 className="font-headline text-5xl md:text-7xl font-black text-on-surface leading-none tracking-tighter italic">Experiences.</h2>
        </div>
        {user && <WriteReviewForm restaurantId={restaurantId} />}
      </div>

      {isLoading ? (
        <div className="space-y-12">
          {[1, 2].map(i => (
            <div key={i} className="h-40 bg-slate-50 animate-pulse rounded-3xl" />
          ))}
        </div>
      ) : reviews && reviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {reviews.map((review) => (
            <div key={review.id} className="p-10 bg-slate-50/50 rounded-[3rem] space-y-6 border border-transparent hover:border-primary/10 transition-all">
              <div className="flex justify-between items-start">
                <div className="flex gap-1 text-primary">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-sm" style={{fontVariationSettings: i < review.rating ? "'FILL' 1" : "'FILL' 0"}}>star</span>
                  ))}
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">
                  {new Date(review.created_at).toLocaleDateString()}
                </span>
              </div>
              <div className="space-y-2">
                {review.title && <h4 className="font-headline font-black text-2xl italic tracking-tight">{review.title}</h4>}
                <p className="text-slate-500 font-body italic leading-relaxed text-lg">
                  &ldquo;{review.body}&rdquo;
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-50/50 rounded-[3rem] border border-dashed border-slate-200">
           <p className="text-slate-400 font-body italic text-lg">No experiences shared yet. Be the first to curator this destination.</p>
        </div>
      )}
    </section>
  );
}
