"use client";

import { useEffect, useState } from "react";
import { useRouter } from "@/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { chefSchema, ChefFormData } from "@/lib/validations";
import { useTranslations } from 'next-intl';

type Role = "chef" | "restaurant";

export default function ChefOnboarding() {
  const t = useTranslations('Chef.onboarding');
  const tf = useTranslations('Form');
  const router = useRouter();
  const [role, setRole] = useState<Role | null>(null);
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ChefFormData>({
    resolver: zodResolver(chefSchema),
    mode: "onChange",
    defaultValues: {
      yearsExperience: 0,
      plan: "free"
    }
  });

  const watchFullName = watch("fullName");
  const watchPlan = watch("plan");

  const handleRoleSelect = (selected: Role) => {
    if (selected === "restaurant") {
      router.push("/partner/registration");
      return;
    }
    setRole("chef");
  };

  const onContinueStep1 = async () => {
    const isValid = await trigger(["fullName", "bio"]);
    if (isValid) setStep(2);
  };

  const onContinueStep2 = async () => {
    const isValid = await trigger(["specialty", "yearsExperience", "restaurantAffiliation"]);
    if (isValid) setStep(3);
  };

  const onSubmit = async (data: ChefFormData) => {
    try {
      const res = await fetch('/api/chef/onboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        if (data.plan === 'pro') {
          const checkoutRes = await fetch('/api/create-checkout-session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: 'chef_subscription' })
          });
          if (checkoutRes.ok) {
            const { url } = await checkoutRes.json();
            window.location.href = url;
            return;
          }
        }
        setSubmitted(true);
      } else {
        const errorData = await res.json();
        alert(`Submission failed: ${errorData.error || "Unknown error"}`);
      }
    } catch (e) {
      console.error(e);
      alert("An error occurred during submission.");
    }
  };

  if (submitted) {
    return (
      <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <header className="space-y-4 pb-10 border-b border-white/5">
          <span className="text-secondary text-xs font-bold uppercase tracking-[0.3em]">{t('label')}</span>
          <h1 className="text-5xl md:text-7xl font-headline font-black italic tracking-tighter text-white">
            {t('submittedTitle')}
          </h1>
        </header>
        <div className="bg-white/5 p-10 rounded-[2rem] border border-white/10 space-y-6 text-center max-w-lg">
          <span className="material-symbols-outlined text-6xl text-primary block">pending_actions</span>
          <h2 className="text-3xl font-headline font-black italic text-white">{t('underReview')}</h2>
          <p className="text-zinc-400">
            {t('underReviewDesc')}
          </p>
          <div className="pt-4 flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest font-bold text-secondary">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            {t('pendingApproval')}
          </div>
        </div>
      </div>
    );
  }

  if (!role) {
    return (
      <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <header className="space-y-4 pb-10 border-b border-white/5">
          <span className="text-secondary text-xs font-bold uppercase tracking-[0.3em]">{t('onboardingLabel')}</span>
          <h1 className="text-5xl md:text-7xl font-headline font-black italic tracking-tighter text-white">
            {t('whoAreYou')}
          </h1>
          <p className="text-zinc-300 max-w-2xl">
            {t('whoAreYouDesc')}
          </p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
          <button
            type="button"
            onClick={() => handleRoleSelect("chef")}
            className="group text-left p-8 rounded-[2rem] border border-white/10 bg-white/5 hover:border-primary/40 hover:bg-white/10 transition-all space-y-4"
          >
            <span className="material-symbols-outlined text-4xl text-zinc-600 group-hover:text-primary transition-colors">restaurant</span>
            <div>
              <p className="text-xs uppercase tracking-widest font-bold text-zinc-500 group-hover:text-primary transition-colors">{t('chefRole')}</p>
              <h3 className="text-3xl font-headline font-black italic text-white mt-1">{t('imAChef')}</h3>
              <p className="text-sm text-zinc-400 mt-2">{t('chefRoleDesc')}</p>
            </div>
            <span className="material-symbols-outlined text-primary text-sm opacity-0 group-hover:opacity-100 transition-opacity">east</span>
          </button>

          <button
            type="button"
            onClick={() => handleRoleSelect("restaurant")}
            className="group text-left p-8 rounded-[2rem] border border-white/10 bg-white/5 hover:border-secondary/40 hover:bg-white/10 transition-all space-y-4"
          >
            <span className="material-symbols-outlined text-4xl text-zinc-600 group-hover:text-secondary transition-colors">store</span>
            <div>
              <p className="text-xs uppercase tracking-widest font-bold text-zinc-500 group-hover:text-secondary transition-colors">{t('restaurantRole')}</p>
              <h3 className="text-3xl font-headline font-black italic text-white mt-1">{t('imARestaurant')}</h3>
              <p className="text-sm text-zinc-400 mt-2">{t('restaurantRoleDesc')}</p>
            </div>
            <span className="material-symbols-outlined text-secondary text-sm opacity-0 group-hover:opacity-100 transition-opacity">east</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="space-y-4 pb-10 border-b border-white/5">
        <span className="text-secondary text-xs font-bold uppercase tracking-[0.3em]">{t('label')}</span>
        <h1 className="text-5xl md:text-7xl font-headline font-black italic tracking-tighter text-white">
          {t('buildProfile')}
        </h1>
        <p className="text-zinc-300 max-w-2xl">
          {t('buildProfileDesc')}
        </p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white/5 p-8 md:p-10 rounded-[2rem] border border-white/10 space-y-8">
        <div className="flex items-center gap-3 text-sm">
          {[1, 2, 3].map((index) => (
            <div key={index} className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full border flex items-center justify-center text-sm font-bold ${step >= index ? "bg-primary border-primary text-white" : "border-zinc-700 text-zinc-500"}`}>
                {index}
              </div>
              {index < 3 ? <div className="w-8 h-px bg-zinc-700" /> : null}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-headline font-black italic text-white">{t('step1Title')}</h2>
            <div className="grid grid-cols-1 gap-5">
              <label className="space-y-2">
                <span className="text-sm text-zinc-300">{tf('labels.fullName')}</span>
                <input
                  {...register("fullName")}
                  className={`w-full rounded-xl bg-zinc-900 border ${errors.fullName ? 'border-red-500 focus:ring-red-500' : 'border-zinc-700 focus:border-primary'} px-4 py-3 text-white outline-none`}
                  placeholder={tf('placeholders.fullName')}
                />
                {errors.fullName && <p className="text-xs text-red-500">{errors.fullName.message}</p>}
              </label>
              <label className="space-y-2">
                <span className="text-sm text-zinc-300">{tf('labels.bio')}</span>
                <textarea
                  {...register("bio")}
                  className={`w-full rounded-xl bg-zinc-900 border ${errors.bio ? 'border-red-500 focus:ring-red-500' : 'border-zinc-700 focus:border-primary'} px-4 py-3 min-h-28 text-white outline-none`}
                  placeholder={tf('placeholders.bio')}
                />
                {errors.bio && <p className="text-xs text-red-500">{errors.bio.message}</p>}
              </label>
            </div>
            <div className="flex items-center justify-between">
              <button type="button" onClick={() => setRole(null)} className="border border-zinc-700 px-6 py-3 rounded-xl font-semibold text-zinc-300 hover:border-zinc-500 transition-colors">
                {t('back')}
              </button>
              <button
                type="button"
                onClick={onContinueStep1}
                className="bg-primary px-6 py-3 rounded-xl font-semibold text-white hover:opacity-90 transition-opacity"
              >
                {t('continue')}
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-headline font-black italic text-white">{t('step2Title')}</h2>
            <div className="grid grid-cols-1 gap-5">
              <label className="space-y-2">
                <span className="text-sm text-zinc-300">{tf('labels.specialty')}</span>
                <input
                  {...register("specialty")}
                  className={`w-full rounded-xl bg-zinc-900 border ${errors.specialty ? 'border-red-500 focus:ring-red-500' : 'border-zinc-700 focus:border-primary'} px-4 py-3 text-white outline-none`}
                  placeholder={tf('placeholders.specialty')}
                />
                {errors.specialty && <p className="text-xs text-red-500">{errors.specialty.message}</p>}
              </label>
              <label className="space-y-2">
                <span className="text-sm text-zinc-300">{tf('labels.experience')}</span>
                <input
                  type="number"
                  {...register("yearsExperience", { valueAsNumber: true })}
                  className={`w-full rounded-xl bg-zinc-900 border ${errors.yearsExperience ? 'border-red-500 focus:ring-red-500' : 'border-zinc-700 focus:border-primary'} px-4 py-3 text-white outline-none`}
                  placeholder="e.g. 10"
                />
                {errors.yearsExperience && <p className="text-xs text-red-500">{errors.yearsExperience.message}</p>}
              </label>
              <label className="space-y-2">
                <span className="text-sm text-zinc-300">{t('restaurantAffiliation')}</span>
                <input
                  {...register("restaurantAffiliation")}
                  className={`w-full rounded-xl bg-zinc-900 border border-zinc-700 focus:border-primary px-4 py-3 text-white outline-none`}
                  placeholder="e.g. Zuma Dubai"
                />
              </label>
            </div>
            <div className="flex justify-between">
              <button type="button" onClick={() => setStep(1)} className="border border-zinc-700 px-6 py-3 rounded-xl font-semibold text-zinc-300 hover:border-zinc-500 transition-colors">
                {t('back')}
              </button>
              <button
                type="button"
                onClick={onContinueStep2}
                className="bg-primary px-6 py-3 rounded-xl font-semibold text-white hover:opacity-90 transition-opacity"
              >
                {t('continue')}
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-headline font-black italic text-white">{t('step3Title')}</h2>
            {errors.plan && <p className="text-sm text-red-500">{errors.plan.message}</p>}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <button
                type="button"
                onClick={() => setValue("plan", "free", { shouldValidate: true, shouldDirty: true })}
                className={`text-left p-5 rounded-2xl border transition-all ${watchPlan === "free" ? "border-primary bg-primary/10" : "border-zinc-700 bg-zinc-900 hover:border-zinc-500"}`}
              >
                <p className="text-xs uppercase tracking-widest text-zinc-400 font-bold">{t('freePlanLabel')}</p>
                <h3 className="text-2xl font-headline font-black italic mt-2 text-white">{t('freePlanTitle')}</h3>
                <p className="mt-3 text-sm text-zinc-300">{t('freePlanDesc')}</p>
              </button>
              <button
                type="button"
                onClick={() => setValue("plan", "pro", { shouldValidate: true, shouldDirty: true })}
                className={`text-left p-5 rounded-2xl border transition-all ${watchPlan === "pro" ? "border-primary bg-primary/10" : "border-zinc-700 bg-zinc-900 hover:border-zinc-500"}`}
              >
                <p className="text-xs uppercase tracking-widest text-primary font-bold">{t('proPlanLabel')}</p>
                <h3 className="text-2xl font-headline font-black italic mt-2 text-white">{t('proPlanTitle')}</h3>
                <p className="mt-3 text-sm text-zinc-300">{t('proPlanDesc')}</p>
              </button>
            </div>

            <div className="rounded-2xl border border-zinc-700 p-4 text-sm text-zinc-300 space-y-1">
              <p><strong className="text-white">{t('chef')}:</strong> {watchFullName || "—"}</p>
              <p><strong className="text-white">{t('plan')}:</strong> {watchPlan ? watchPlan.toUpperCase() : t('notSelected')}</p>
            </div>

            <div className="flex justify-between">
              <button type="button" onClick={() => setStep(2)} className="border border-zinc-700 px-6 py-3 rounded-xl font-semibold text-zinc-300 hover:border-zinc-500 transition-colors">
                {t('back')}
              </button>
              <button
                type="submit"
                disabled={!watchPlan || isSubmitting}
                className="bg-primary px-6 py-3 rounded-xl font-semibold text-white disabled:opacity-40 hover:opacity-90 transition-opacity"
              >
                {isSubmitting ? t('submitting') : t('submit')}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
