'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { reviewSchema, ReviewFormData } from '@/lib/validations';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface WriteReviewFormProps {
  restaurantId: string;
}

export const WriteReviewForm = ({ restaurantId }: WriteReviewFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 5,
      restaurantId: restaurantId,
    },
    mode: 'onChange',
  });

  const rating = watch('rating');

  const mutation = useMutation({
    mutationFn: async (data: ReviewFormData) => {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to submit review');
      }
      return res.json();
    },
    onSuccess: () => {
      setIsSuccess(true);
      queryClient.invalidateQueries({ queryKey: ['reviews', restaurantId] });
      reset();
      setTimeout(() => {
        setIsSuccess(false);
        setIsOpen(false);
      }, 3000);
    },
    onError: (error: Error) => {
      alert(error.message);
    }
  });

  const onSubmit = (data: ReviewFormData) => {
    mutation.mutate(data);
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="bg-zinc-900 text-white px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl hover:bg-primary transition-all"
      >
        Write Experience
      </button>
    );
  }

  if (isSuccess) {
    return (
      <div className="bg-primary/10 border border-primary/20 text-primary p-6 rounded-xl text-center space-y-3">
        <span className="material-symbols-outlined text-4xl">check_circle</span>
        <h3 className="font-headline font-black italic text-xl">Review Submitted</h3>
        <p className="text-sm font-medium">Thank you for your feedback!</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 space-y-6 max-w-xl w-full">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-headline font-black italic text-zinc-900">Your Experience</h3>
        <button type="button" onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-zinc-900 transition-colors">
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-body">Rating</label>
        <div className="flex gap-2 text-primary">
          {[1, 2, 3, 4, 5].map((star) => (
            <button 
              key={star} 
              type="button" 
              onClick={() => setValue('rating', star, { shouldValidate: true, shouldDirty: true })}
            >
              <span className="material-symbols-outlined text-3xl transition-all hover:scale-110" style={{fontVariationSettings: star <= rating ? "'FILL' 1" : "'FILL' 0"}}>star</span>
            </button>
          ))}
        </div>
        {errors.rating && <p className="text-xs text-red-500">{errors.rating.message}</p>}
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-body">Title</label>
        <input 
          {...register('title')}
          placeholder="Summarize your visit..."
          className={`w-full bg-slate-50 border ${errors.title ? 'border-red-500' : 'border-transparent focus:border-primary/20'} rounded-xl p-4 text-sm font-medium outline-none transition-all`}
        />
        {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-body">Your Review</label>
        <textarea 
          {...register('body')}
          placeholder="Tell us about the food, service, and atmosphere..."
          className={`w-full bg-slate-50 border ${errors.body ? 'border-red-500' : 'border-transparent focus:border-primary/20'} rounded-xl p-4 min-h-32 text-sm font-medium outline-none transition-all`}
        />
        {errors.body && <p className="text-xs text-red-500">{errors.body.message}</p>}
      </div>

      <button 
        type="submit"
        disabled={mutation.isPending}
        className="w-full bg-primary hover:opacity-90 text-white py-4 rounded-xl font-bold text-sm uppercase tracking-[0.2em] shadow-xl shadow-primary/10 transition-all flex items-center justify-center gap-3 font-headline disabled:opacity-40"
      >
        {mutation.isPending ? 'Submitting...' : 'Post Review'}
      </button>
    </form>
  );
};
