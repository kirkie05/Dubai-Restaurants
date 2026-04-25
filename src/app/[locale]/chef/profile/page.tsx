"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "@/navigation";

type Role = "chef" | "restaurant";
type ChefPlan = "free" | "paid";

type ChefOnboarding = {
  fullName: string;
  title: string;
  bio: string;
  specialties: string;
  plan: ChefPlan | null;
};

const initialForm: ChefOnboarding = {
  fullName: "",
  title: "",
  bio: "",
  specialties: "",
  plan: null,
};

export default function ChefProfileEditor() {
  const router = useRouter();
  const [role, setRole] = useState<Role | null>(null);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<ChefOnboarding>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const status = localStorage.getItem("chef_onboarding_status");
    if (status === "submitted") setSubmitted(true);
    setInitializing(false);
  }, []);

  const canContinueStep1 = useMemo(() => form.fullName.trim() && form.title.trim(), [form.fullName, form.title]);
  const canContinueStep2 = useMemo(() => form.bio.trim() && form.specialties.trim(), [form.bio, form.specialties]);

  const handleRoleSelect = (selected: Role) => {
    if (selected === "restaurant") {
      router.push("/partner/registration");
      return;
    }
    setRole("chef");
  };

  const handleSubmit = () => {
    localStorage.setItem("chef_onboarding_status", "submitted");
    setSubmitted(true);
  };

  if (initializing) return null;

  // Already submitted — pending admin review
  if (submitted) {
    return (
      <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <header className="space-y-4 pb-10 border-b border-white/5">
          <span className="text-secondary text-xs font-bold uppercase tracking-[0.3em]">Chef Onboarding</span>
          <h1 className="text-5xl md:text-7xl font-headline font-black italic tracking-tighter text-white">
            Application Submitted
          </h1>
        </header>
        <div className="bg-white/5 p-10 rounded-[2rem] border border-white/10 space-y-6 text-center max-w-lg">
          <span className="material-symbols-outlined text-6xl text-primary block">pending_actions</span>
          <h2 className="text-3xl font-headline font-black italic text-white">Under Admin Review</h2>
          <p className="text-zinc-400">
            Your chef profile has been submitted and is awaiting admin verification. You'll receive access to your dashboard once approved.
          </p>
          <div className="pt-4 flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest font-bold text-secondary">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            Pending Approval
          </div>
        </div>
      </div>
    );
  }

  // Role selection
  if (!role) {
    return (
      <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <header className="space-y-4 pb-10 border-b border-white/5">
          <span className="text-secondary text-xs font-bold uppercase tracking-[0.3em]">Onboarding</span>
          <h1 className="text-5xl md:text-7xl font-headline font-black italic tracking-tighter text-white">
            Who are you joining as?
          </h1>
          <p className="text-zinc-300 max-w-2xl">
            Select your role to begin the right onboarding process.
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
              <p className="text-xs uppercase tracking-widest font-bold text-zinc-500 group-hover:text-primary transition-colors">Chef</p>
              <h3 className="text-3xl font-headline font-black italic text-white mt-1">I&#39;m a Chef</h3>
              <p className="text-sm text-zinc-400 mt-2">Build your chef profile, link venues, and showcase your culinary work.</p>
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
              <p className="text-xs uppercase tracking-widest font-bold text-zinc-500 group-hover:text-secondary transition-colors">Restaurant</p>
              <h3 className="text-3xl font-headline font-black italic text-white mt-1">I&#39;m a Restaurant</h3>
              <p className="text-sm text-zinc-400 mt-2">List your venue, manage your profile, and reach new diners in Dubai.</p>
            </div>
            <span className="material-symbols-outlined text-secondary text-sm opacity-0 group-hover:opacity-100 transition-opacity">east</span>
          </button>
        </div>
      </div>
    );
  }

  // Chef onboarding steps
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="space-y-4 pb-10 border-b border-white/5">
        <span className="text-secondary text-xs font-bold uppercase tracking-[0.3em]">Chef Onboarding</span>
        <h1 className="text-5xl md:text-7xl font-headline font-black italic tracking-tighter text-white">
          Build your chef profile
        </h1>
        <p className="text-zinc-300 max-w-2xl">
          Use clear details, then choose your plan. This helps guests trust your profile quickly.
        </p>
      </header>

      <section className="bg-white/5 p-8 md:p-10 rounded-[2rem] border border-white/10 space-y-8">
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
            <h2 className="text-2xl font-headline font-black italic text-white">Step 1: Basic details</h2>
            <div className="grid grid-cols-1 gap-5">
              <label className="space-y-2">
                <span className="text-sm text-zinc-300">Your full name</span>
                <input
                  value={form.fullName}
                  onChange={(e) => setForm((prev) => ({ ...prev, fullName: e.target.value }))}
                  className="w-full rounded-xl bg-zinc-900 border border-zinc-700 px-4 py-3 text-white"
                  placeholder="e.g. Amina Haddad"
                />
              </label>
              <label className="space-y-2">
                <span className="text-sm text-zinc-300">Your title</span>
                <input
                  value={form.title}
                  onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                  className="w-full rounded-xl bg-zinc-900 border border-zinc-700 px-4 py-3 text-white"
                  placeholder="Executive Chef, Pastry Chef, Head Chef"
                />
              </label>
            </div>
            <div className="flex items-center justify-between">
              <button type="button" onClick={() => setRole(null)} className="border border-zinc-700 px-6 py-3 rounded-xl font-semibold text-zinc-300 hover:border-zinc-500 transition-colors">
                Back
              </button>
              <button
                type="button"
                disabled={!canContinueStep1}
                onClick={() => setStep(2)}
                className="bg-primary px-6 py-3 rounded-xl font-semibold text-white disabled:opacity-40"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-headline font-black italic text-white">Step 2: Profile content</h2>
            <div className="grid grid-cols-1 gap-5">
              <label className="space-y-2">
                <span className="text-sm text-zinc-300">Short bio</span>
                <textarea
                  value={form.bio}
                  onChange={(e) => setForm((prev) => ({ ...prev, bio: e.target.value }))}
                  className="w-full rounded-xl bg-zinc-900 border border-zinc-700 px-4 py-3 min-h-28 text-white"
                  placeholder="Tell people your cooking style and story."
                />
              </label>
              <label className="space-y-2">
                <span className="text-sm text-zinc-300">Specialties</span>
                <input
                  value={form.specialties}
                  onChange={(e) => setForm((prev) => ({ ...prev, specialties: e.target.value }))}
                  className="w-full rounded-xl bg-zinc-900 border border-zinc-700 px-4 py-3 text-white"
                  placeholder="e.g. Japanese tasting menus, open-fire grilling"
                />
              </label>
            </div>
            <div className="flex justify-between">
              <button type="button" onClick={() => setStep(1)} className="border border-zinc-700 px-6 py-3 rounded-xl font-semibold text-zinc-300 hover:border-zinc-500 transition-colors">
                Back
              </button>
              <button
                type="button"
                disabled={!canContinueStep2}
                onClick={() => setStep(3)}
                className="bg-primary px-6 py-3 rounded-xl font-semibold text-white disabled:opacity-40"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-headline font-black italic text-white">Step 3: Choose your plan</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <button
                type="button"
                onClick={() => setForm((prev) => ({ ...prev, plan: "free" }))}
                className={`text-left p-5 rounded-2xl border transition-all ${form.plan === "free" ? "border-primary bg-primary/10" : "border-zinc-700 bg-zinc-900 hover:border-zinc-500"}`}
              >
                <p className="text-xs uppercase tracking-widest text-zinc-400 font-bold">Free</p>
                <h3 className="text-2xl font-headline font-black italic mt-2 text-white">Free plan</h3>
                <p className="mt-3 text-sm text-zinc-300">Basic chef profile and restaurant linking.</p>
              </button>
              <button
                type="button"
                onClick={() => setForm((prev) => ({ ...prev, plan: "paid" }))}
                className={`text-left p-5 rounded-2xl border transition-all ${form.plan === "paid" ? "border-primary bg-primary/10" : "border-zinc-700 bg-zinc-900 hover:border-zinc-500"}`}
              >
                <p className="text-xs uppercase tracking-widest text-primary font-bold">Paid</p>
                <h3 className="text-2xl font-headline font-black italic mt-2 text-white">AED 49 / month</h3>
                <p className="mt-3 text-sm text-zinc-300">Priority chef placement and premium story sections.</p>
              </button>
            </div>

            <div className="rounded-2xl border border-zinc-700 p-4 text-sm text-zinc-300 space-y-1">
              <p><strong className="text-white">Chef:</strong> {form.fullName || "—"}</p>
              <p><strong className="text-white">Plan:</strong> {form.plan ? form.plan.toUpperCase() : "Not selected"}</p>
            </div>

            <div className="flex justify-between">
              <button type="button" onClick={() => setStep(2)} className="border border-zinc-700 px-6 py-3 rounded-xl font-semibold text-zinc-300 hover:border-zinc-500 transition-colors">
                Back
              </button>
              <button
                type="button"
                disabled={!form.plan}
                onClick={handleSubmit}
                className="bg-primary px-6 py-3 rounded-xl font-semibold text-white disabled:opacity-40"
              >
                Submit for review
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
