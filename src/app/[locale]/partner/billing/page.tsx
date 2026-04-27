'use client';

import PartnerLayout from "@/components/layout/PartnerLayout";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";

const PLANS = [
  { id: 'basic', name: "Curator Tier", price: "0", features: ["Priority Discovery", "Standard Analytics", "10 Bookings/mo"], tier: "Standard" },
  { id: 'premium', name: "Elite Archive", price: "99", features: ["Global Discovery", "Deep Analytics", "Unlimited Bookings", "Concierge Sync"], tier: "Most Popular" }
];

import { useTranslations } from 'next-intl';

const getPlans = (t: any) => [
  { id: 'basic', name: t('plans.basic.name'), price: "0", features: t.raw('plans.basic.features'), tier: t('plans.basic.tier') },
  { id: 'premium', name: t('plans.premium.name'), price: "99", features: t.raw('plans.premium.features'), tier: t('plans.premium.tier') }
];

export default function PartnerBilling() {
  const t = useTranslations('Partner');
  const PLANS = getPlans(t);

  const { data: partner, isLoading: partnerLoading } = useQuery({
    queryKey: ['partner-me'],
    queryFn: () => fetch('/api/partner/me').then(res => res.json()),
  });

  const { data: config, isLoading: configLoading } = useQuery({
    queryKey: ['config'],
    queryFn: () => fetch('/api/config').then(res => res.json()),
  });

  const subscribeMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch('/api/partner/subscribe', { method: 'POST' });
      if (!res.ok) throw new Error('Subscription failed');
      return res.json();
    },
    onSuccess: (data) => {
      if (data.checkoutUrl) window.location.href = data.checkoutUrl;
    }
  });

  const portalMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch('/api/partner/portal', { method: 'POST' });
      if (!res.ok) throw new Error('Portal failed');
      return res.json();
    },
    onSuccess: (data) => {
      if (data.url) window.location.href = data.url;
    }
  });

  if (partnerLoading || configLoading) {
    return (
      <PartnerLayout>
        <div className="flex items-center justify-center h-64 text-white italic">{t('loadingFinancial')}</div>
      </PartnerLayout>
    );
  }

  const isStripeConfigured = config?.isStripeConfigured;
  const currentPlan = partner?.plan || 'basic';

  return (
    <PartnerLayout>
       <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <header className="pb-12 border-b border-white/5 flex justify-between items-end">
             <div className="space-y-6">
                <span className="text-secondary font-body text-[10px] font-black uppercase tracking-[0.4em] block mb-4">{t('financialProtocol')}</span>
                <h1 className="text-6xl md:text-8xl font-headline font-black italic tracking-tighter text-white">The <span className="text-primary">{t('tenure')}</span></h1>
             </div>
             <div className="flex flex-col items-end text-right">
                <span className="text-4xl font-headline font-black italic text-secondary">
                  {currentPlan === 'premium' ? t('plans.premium.name') : t('plans.basic.name')}
                </span>
                <span className="text-[9px] font-black uppercase tracking-widest text-zinc-600">{t('activeSubscription')}</span>
             </div>
          </header>

          {!isStripeConfigured && (
            <div className="bg-primary/10 border border-primary/20 p-8 rounded-3xl text-center">
               <p className="text-primary font-headline font-black italic text-2xl tracking-tight">{t('launchingSoon')}</p>
            </div>
          )}

          <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
             {PLANS.map((plan, i) => {
               const isActive = currentPlan === plan.id;
               return (
                 <div key={i} className={`p-16 rounded-[4rem] border transition-all space-y-10 group relative overflow-hidden ${isActive ? 'bg-primary text-white border-primary shadow-[0_50px_100px_-20px_rgba(188,1,0,0.3)]' : 'bg-white/5 border-white/10 text-white hover:border-primary/40'}`}>
                    {isActive && (
                      <div className="absolute top-10 right-10">
                         <span className="px-4 py-1.5 bg-white text-primary text-[8px] font-black uppercase tracking-widest rounded-full">{t('currentChoice')}</span>
                      </div>
                    )}
                    <div className="space-y-2">
                       <span className={`text-[10px] font-black uppercase tracking-[0.4em] ${isActive ? 'text-white/60' : 'text-primary'}`}>{plan.tier}</span>
                       <h3 className="text-5xl font-headline font-black italic tracking-tighter leading-none">{plan.name}.</h3>
                    </div>
                    
                    <div className="flex items-baseline gap-2">
                       <span className="text-6xl font-headline font-black italic">AED {plan.price}</span>
                       <span className="text-[10px] font-black tracking-widest uppercase opacity-60">/ {t('month')}</span>
                    </div>

                    <ul className="space-y-4 pt-10 border-t border-white/10">
                       {(plan.features as string[]).map(f => (
                         <li key={f} className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest">
                            <span className={`material-symbols-outlined text-sm ${isActive ? 'text-white' : 'text-primary'}`}>check</span>
                            {f}
                         </li>
                       ))}
                    </ul>

                    {isStripeConfigured ? (
                      <button 
                        onClick={() => {
                          if (isActive && partner?.stripe_subscription_id) {
                            portalMutation.mutate();
                          } else if (!isActive && plan.id === 'premium') {
                            subscribeMutation.mutate();
                          }
                        }}
                        disabled={subscribeMutation.isPending || portalMutation.isPending}
                        className={`w-full py-6 rounded-2xl font-headline font-black text-xl italic transition-all ${isActive ? 'bg-white text-zinc-900 border-white' : 'bg-zinc-900 text-white border-white/5 hover:bg-white hover:text-black hover:border-white'}`}
                      >
                         {isActive ? (partner?.stripe_subscription_id ? t('manageTenure') : t('activePlan')) : t('upgradeSequence')}
                      </button>
                    ) : (
                      <button className="w-full py-6 rounded-2xl font-headline font-black text-xl italic bg-zinc-900/40 text-white/20 border-white/5 cursor-not-allowed">
                        {t('launchingSoonBtn')}
                      </button>
                    )}
                 </div>
               );
             })}
          </section>

          <section className="p-12 border-t border-white/5 space-y-8">
             <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600">
                <span>{t('recentInvoices')}</span>
                <button className="text-primary border-b border-primary/20 pb-1 hover:border-primary transition-all">{t('downloadAll')}</button>
             </div>
             <div className="space-y-4">
                <p className="text-sm text-zinc-600 italic">{t('noInvoices')}</p>
             </div>
          </section>
       </div>
    </PartnerLayout>
  );
}

