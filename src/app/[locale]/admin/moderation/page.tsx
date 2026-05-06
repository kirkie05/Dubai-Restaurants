'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
export default function ModerationPage() {
  const t = useTranslations('Admin');
  const [activeTab, setActiveTab] = useState<'reviews' | 'chefs' | 'partners'>('reviews');
  const queryClient = useQueryClient();

  const { data: chefs, isLoading: chefsLoading } = useQuery({
    queryKey: ['admin-chefs'],
    queryFn: () => fetch('/api/admin/pending?type=chef').then(res => res.json()),
  });

  const { data: partners, isLoading: partnersLoading } = useQuery({
    queryKey: ['admin-partners'],
    queryFn: () => fetch('/api/admin/pending?type=partner').then(res => res.json()),
  });

  const approveMutation = useMutation({
    mutationFn: async ({ type, id, clerkUserId }: { type: string, id: string, clerkUserId: string }) => {
      const res = await fetch('/api/admin/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, id, clerkUserId }),
      });
      if (!res.ok) throw new Error('Approval failed');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-chefs'] });
      queryClient.invalidateQueries({ queryKey: ['admin-partners'] });
    }
  });

  const rejectMutation = useMutation({
    mutationFn: async ({ type, id }: { type: string, id: string }) => {
      const res = await fetch('/api/admin/reject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, id }),
      });
      if (!res.ok) throw new Error('Rejection failed');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-chefs'] });
      queryClient.invalidateQueries({ queryKey: ['admin-partners'] });
    }
  });

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-on-surface">
      <Navbar />
      
      <main className="pt-32 pb-40 px-8 lg:px-16 max-w-[1920px] mx-auto w-full flex flex-col lg:flex-row gap-20">
         <aside className="w-full lg:w-80 shrink-0 space-y-12">
            <header className="space-y-4">
               <span className="text-primary font-body text-[10px] font-black uppercase tracking-[0.4em] block">{t('masterControl')}</span>
               <h2 className="text-4xl font-headline font-black italic tracking-tighter text-zinc-900">The <br /><span className="text-slate-300">{t('vault')}</span></h2>
            </header>

            <nav className="flex flex-col gap-2">
               <button 
                 onClick={() => setActiveTab('reviews')}
                 className={`flex items-center gap-4 p-5 rounded-3xl transition-all ${activeTab === 'reviews' ? 'bg-white shadow-xl text-zinc-900 border border-slate-100' : 'text-slate-400 hover:text-zinc-900'}`}
               >
                  <span className="material-symbols-outlined">rate_review</span>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">{t('reviews')}</span>
               </button>
               <button 
                 onClick={() => setActiveTab('chefs')}
                 className={`flex items-center gap-4 p-5 rounded-3xl transition-all ${activeTab === 'chefs' ? 'bg-white shadow-xl text-zinc-900 border border-slate-100' : 'text-slate-400 hover:text-zinc-900'}`}
               >
                  <span className="material-symbols-outlined">chef_hat</span>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">{t('chefs')}</span>
               </button>
               <button 
                 onClick={() => setActiveTab('partners')}
                 className={`flex items-center gap-4 p-5 rounded-3xl transition-all ${activeTab === 'partners' ? 'bg-white shadow-xl text-zinc-900 border border-slate-100' : 'text-slate-400 hover:text-zinc-900'}`}
               >
                  <span className="material-symbols-outlined">handshake</span>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">{t('partners')}</span>
               </button>
            </nav>
         </aside>

         <div className="flex-grow space-y-16">
            <header className="pb-12 border-b border-slate-200">
               <span className="text-secondary font-body text-[10px] font-black uppercase tracking-[0.4em] block mb-4">{t('qualityControl')}</span>
               <h1 className="text-6xl md:text-8xl font-headline font-black italic tracking-tighter text-zinc-900">
                  {t(activeTab)} <span className="text-primary">{t('sanctity')}</span>
               </h1>
            </header>

            <section className="space-y-6">
               {activeTab === 'chefs' && (chefsLoading ? <p>{t('loading', { type: t('chefs') })}</p> : chefs?.map((chef: any) => (
                 <div key={chef.id} className="p-10 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col md:flex-row gap-12 items-center group hover:shadow-2xl transition-all">
                    <div className="flex-grow space-y-4">
                       <h3 className="text-2xl font-headline font-black italic text-zinc-900 leading-none">{chef.full_name}</h3>
                       <p className="text-slate-500 font-body italic">{chef.bio}</p>
                       <p className="text-[10px] font-black uppercase tracking-widest text-primary">{chef.specialty} · {chef.years_experience} Years</p>
                    </div>
                    <div className="flex gap-4">
                       <button 
                         onClick={() => approveMutation.mutate({ type: 'chef', id: chef.id, clerkUserId: chef.clerk_user_id })}
                         className="p-4 bg-primary text-white rounded-full hover:bg-zinc-900 transition-all shadow-xl"
                       >
                          <span className="material-symbols-outlined text-sm">check</span>
                       </button>
                       <button 
                         onClick={() => rejectMutation.mutate({ type: 'chef', id: chef.id })}
                         className="p-4 bg-slate-100 text-slate-400 rounded-full hover:bg-primary hover:text-white transition-all shadow-sm"
                       >
                          <span className="material-symbols-outlined text-sm">close</span>
                       </button>
                    </div>
                 </div>
               )))}

               {activeTab === 'partners' && (partnersLoading ? <p>{t('loading', { type: t('partners') })}</p> : partners?.map((partner: any) => (
                 <div key={partner.id} className="p-10 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col md:flex-row gap-12 items-center group hover:shadow-2xl transition-all">
                    <div className="flex-grow space-y-4">
                       <h3 className="text-2xl font-headline font-black italic text-zinc-900 leading-none">{partner.business_name}</h3>
                       <p className="text-slate-500 font-body italic">Contact: {partner.contact_name} ({partner.email})</p>
                       <p className="text-[10px] font-black uppercase tracking-widest text-primary">Plan: {partner.plan}</p>
                    </div>
                    <div className="flex gap-4">
                       <button 
                         onClick={() => approveMutation.mutate({ type: 'partner', id: partner.id, clerkUserId: partner.clerk_user_id })}
                         className="p-4 bg-primary text-white rounded-full hover:bg-zinc-900 transition-all shadow-xl"
                       >
                          <span className="material-symbols-outlined text-sm">check</span>
                       </button>
                       <button 
                         onClick={() => rejectMutation.mutate({ type: 'partner', id: partner.id })}
                         className="p-4 bg-slate-100 text-slate-400 rounded-full hover:bg-primary hover:text-white transition-all shadow-sm"
                       >
                          <span className="material-symbols-outlined text-sm">close</span>
                       </button>
                    </div>
                 </div>
               )))}

               {activeTab === 'reviews' && <p className="italic text-slate-400">Review moderation integration coming soon...</p>}
               
               {activeTab !== 'reviews' && (!(activeTab === 'chefs' ? chefsLoading : partnersLoading) && (activeTab === 'chefs' ? chefs : partners)?.length === 0) && (
                 <p className="text-center py-20 text-slate-400 italic">{t('noPending', { type: t(activeTab) })}</p>
               )}
            </section>
         </div>
      </main>
      
      <Footer />
    </div>
  );
}

