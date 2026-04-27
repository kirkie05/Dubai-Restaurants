"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Link, useRouter } from "@/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { partnerSchema, PartnerFormData } from "@/lib/validations";

import { useTranslations } from 'next-intl';

export default function PartnerRegistration() {
  const t = useTranslations('Partner.onboarding');
  const tf = useTranslations('Form');
  const router = useRouter();
  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PartnerFormData>({
    resolver: zodResolver(partnerSchema),
    mode: "onChange",
    defaultValues: {
      plan: "basic"
    }
  });

  const watchPlan = watch("plan");
  const watchContact = watch("contactName");
  const watchBusiness = watch("businessName");

  const onContinueStep1 = async () => {
    const isValid = await trigger(["contactName", "email", "phone"]);
    if (isValid) setStep(2);
  };

  const onContinueStep2 = async () => {
    const isValid = await trigger(["businessName"]);
    if (isValid) setStep(3);
  };

  const onSubmit = async (data: PartnerFormData) => {
    try {
      const res = await fetch('/api/partner/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        if (data.plan === 'premium') {
          const checkoutRes = await fetch('/api/create-checkout-session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: 'partner_subscription' })
          });
          if (checkoutRes.ok) {
            const { url } = await checkoutRes.json();
            window.location.href = url;
            return;
          }
        }
        router.push(`/partner/dashboard`);
      } else {
        const errorData = await res.json();
        alert(`Submission failed: ${errorData.error || "Unknown error"}`);
      }
    } catch (e) {
      console.error(e);
      alert("An error occurred during submission.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-900 text-white">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 px-6 lg:px-16 max-w-[1280px] mx-auto w-full">
        <header className="space-y-5 mb-12">
          <p className="text-primary text-xs font-bold uppercase tracking-[0.35em]">{t('title')}</p>
          <h1 className="text-4xl md:text-6xl font-headline font-black italic leading-tight">
            {t('title')}
          </h1>
          <p className="text-zinc-300 max-w-3xl text-base md:text-lg">
            {t('subtitle')}
            {t('claimPrompt')}
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link href="/restaurants" className="text-sm border-b border-primary text-primary">
              {t('claimLink')}
            </Link>
            <span className="text-zinc-500">or</span>
            <Link href="/chef/onboarding" className="text-sm border-b border-zinc-500 text-zinc-300">
              {t('chefLink')}
            </Link>
          </div>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <form onSubmit={handleSubmit(onSubmit)} className="lg:col-span-8 bg-zinc-950/60 border border-zinc-800 rounded-3xl p-6 md:p-8 space-y-8">
            <div className="flex items-center gap-3 text-sm">
              {[1, 2, 3].map((index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center ${step >= index ? "bg-primary border-primary text-white" : "border-zinc-700 text-zinc-400"}`}>
                    {index}
                  </div>
                  {index < 3 ? <div className="w-7 h-px bg-zinc-700" /> : null}
                </div>
              ))}
            </div>

            {step === 1 ? (
              <div className="space-y-6">
                <h2 className="text-2xl font-headline font-black italic">{t('step1Title')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <label className="space-y-2 md:col-span-2">
                    <span className="text-sm text-zinc-300">{tf('labels.fullName')}</span>
                    <input
                      {...register("contactName")}
                      className={`w-full rounded-xl bg-zinc-900 border ${errors.contactName ? 'border-red-500 focus:ring-red-500' : 'border-zinc-700 focus:border-primary'} px-4 py-3 outline-none`}
                      placeholder={tf('placeholders.fullName')}
                    />
                    {errors.contactName && <p className="text-xs text-red-500">{errors.contactName.message}</p>}
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm text-zinc-300">{tf('labels.email')}</span>
                    <input
                      type="email"
                      {...register("email")}
                      className={`w-full rounded-xl bg-zinc-900 border ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-zinc-700 focus:border-primary'} px-4 py-3 outline-none`}
                      placeholder={tf('placeholders.email')}
                    />
                    {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm text-zinc-300">{tf('labels.phone')}</span>
                    <input
                      {...register("phone")}
                      className={`w-full rounded-xl bg-zinc-900 border border-zinc-700 focus:border-primary px-4 py-3 outline-none`}
                      placeholder="+971..."
                    />
                  </label>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={onContinueStep1}
                    className="bg-primary px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
                  >
                    Continue
                  </button>
                </div>
              </div>
            ) : null}

            {step === 2 ? (
              <div className="space-y-6">
                <h2 className="text-2xl font-headline font-black italic">{t('step2Title')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <label className="space-y-2 md:col-span-2">
                    <span className="text-sm text-zinc-300">{tf('labels.businessName')}</span>
                    <input
                      {...register("businessName")}
                      className={`w-full rounded-xl bg-zinc-900 border ${errors.businessName ? 'border-red-500' : 'border-zinc-700 focus:border-primary'} px-4 py-3 outline-none`}
                      placeholder="Restaurant name"
                    />
                    {errors.businessName && <p className="text-xs text-red-500">{errors.businessName.message}</p>}
                  </label>
                </div>

                <div className="flex justify-between">
                  <button type="button" onClick={() => setStep(1)} className="border border-zinc-700 px-6 py-3 rounded-xl font-semibold hover:bg-zinc-800 transition-colors">
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={onContinueStep2}
                    className="bg-primary px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
                  >
                    Continue
                  </button>
                </div>
              </div>
            ) : null}

            {step === 3 ? (
              <div className="space-y-6">
                <h2 className="text-2xl font-headline font-black italic">{t('step3Title')}</h2>
                <p className="text-zinc-300">{t('planDesc')}</p>
                {errors.plan && <p className="text-sm text-red-500">{errors.plan.message}</p>}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <button
                    type="button"
                    onClick={() => {
                      setValue("plan", "basic", { shouldValidate: true, shouldDirty: true });
                    }}
                    className={`text-left p-5 rounded-2xl border transition-all ${watchPlan === "basic" ? "border-primary bg-primary/10 shadow-[0_0_20px_rgba(220,38,38,0.2)]" : "border-zinc-700 bg-zinc-900 hover:border-zinc-500"}`}
                  >
                    <p className="text-xs uppercase tracking-widest text-zinc-400 font-bold">Basic Plan</p>
                    <h3 className="text-2xl font-headline font-black italic mt-2">Basic</h3>
                    <ul className="mt-4 text-sm text-zinc-300 space-y-2">
                      <li>Standard listing page</li>
                      <li>Basic updates</li>
                      <li>Claim management</li>
                    </ul>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setValue("plan", "premium", { shouldValidate: true, shouldDirty: true });
                    }}
                    className={`text-left p-5 rounded-2xl border transition-all ${watchPlan === "premium" ? "border-primary bg-primary/10 shadow-[0_0_20px_rgba(220,38,38,0.2)]" : "border-zinc-700 bg-zinc-900 hover:border-zinc-500"}`}
                  >
                    <p className="text-xs uppercase tracking-widest text-primary font-bold">Premium Plan</p>
                    <h3 className="text-2xl font-headline font-black italic mt-2">AED 99 / month</h3>
                    <ul className="mt-4 text-sm text-zinc-300 space-y-2">
                      <li>Priority placement</li>
                      <li>Advanced analytics</li>
                      <li>Marketing highlights</li>
                    </ul>
                  </button>
                </div>

                <div className="rounded-2xl border border-zinc-700 p-5 text-sm text-zinc-300">
                  <p><strong>{t('owner')}:</strong> {watchContact || "-"}</p>
                  <p><strong>{t('business')}:</strong> {watchBusiness || "-"}</p>
                  <p><strong>{t('plan')}:</strong> {watchPlan ? watchPlan.toUpperCase() : "Not selected"}</p>
                </div>

                <div className="flex justify-between">
                  <button type="button" onClick={() => setStep(2)} className="border border-zinc-700 px-6 py-3 rounded-xl font-semibold hover:bg-zinc-800 transition-colors">
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !watchPlan}
                    className="bg-primary px-7 py-3 rounded-xl font-semibold disabled:opacity-40 hover:opacity-90 transition-opacity"
                  >
                    {isSubmitting ? t('finishing') : t('complete')}
                  </button>
                </div>
              </div>
            ) : null}
          </form>

          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-4">
              <h3 className="text-xl font-headline font-black italic">{t('guideTitle')}</h3>
              <ul className="space-y-2 text-sm text-zinc-300">
                {(t.raw('guideSteps') as string[]).map(s => <li key={s}>{s}</li>)}
              </ul>
            </div>

            <div className="bg-white text-zinc-900 rounded-3xl p-6 space-y-3">
              <h3 className="text-lg font-headline font-black italic">{t('alreadyInDb')}</h3>
              <p className="text-sm text-zinc-600">
                {t('alreadyInDbDesc')}
              </p>
            </div>
          </aside>
        </section>
      </main>

      <Footer />
    </div>
  );
}

