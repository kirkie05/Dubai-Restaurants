"use client";

import { useMemo, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Link, useRouter } from "@/navigation";

type PlanType = "free" | "paid";

type OnboardingData = {
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  restaurantName: string;
  location: string;
  cuisine: string;
  shortDescription: string;
  plan: PlanType | null;
};

const initialData: OnboardingData = {
  ownerName: "",
  ownerEmail: "",
  ownerPhone: "",
  restaurantName: "",
  location: "",
  cuisine: "",
  shortDescription: "",
  plan: null,
};

export default function PartnerRegistration() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [data, setData] = useState<OnboardingData>(initialData);

  const canContinueStep1 = useMemo(
    () => data.ownerName.trim() && data.ownerEmail.trim() && data.ownerPhone.trim(),
    [data.ownerEmail, data.ownerName, data.ownerPhone]
  );

  const canContinueStep2 = useMemo(
    () => data.restaurantName.trim() && data.location.trim() && data.cuisine.trim() && data.shortDescription.trim(),
    [data.cuisine, data.location, data.restaurantName, data.shortDescription]
  );

  const canSubmit = useMemo(() => canContinueStep1 && canContinueStep2 && data.plan, [canContinueStep1, canContinueStep2, data.plan]);

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 800));
    router.push(`/partner/profile?onboarded=1&plan=${data.plan}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-900 text-white">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 px-6 lg:px-16 max-w-[1280px] mx-auto w-full">
        <header className="space-y-5 mb-12">
          <p className="text-primary text-xs font-bold uppercase tracking-[0.35em]">Partner onboarding</p>
          <h1 className="text-4xl md:text-6xl font-headline font-black italic leading-tight">
            List your restaurant in a few simple steps
          </h1>
          <p className="text-zinc-300 max-w-3xl text-base md:text-lg">
            This onboarding is for restaurants and partners. Fill your details, choose a plan, and finish setup.
            If your restaurant is already in our admin-uploaded database, you can claim it instead.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link href="/restaurants" className="text-sm border-b border-primary text-primary">
              Claim an existing restaurant
            </Link>
            <span className="text-zinc-500">or</span>
            <Link href="/chef/profile" className="text-sm border-b border-zinc-500 text-zinc-300">
              Complete chef onboarding
            </Link>
          </div>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 bg-zinc-950/60 border border-zinc-800 rounded-3xl p-6 md:p-8 space-y-8">
            <div className="flex items-center gap-3 text-sm">
              {[1, 2, 3].map((index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center ${step >= index ? "bg-primary border-primary" : "border-zinc-700 text-zinc-400"}`}>
                    {index}
                  </div>
                  {index < 3 ? <div className="w-7 h-px bg-zinc-700" /> : null}
                </div>
              ))}
            </div>

            {step === 1 ? (
              <div className="space-y-6">
                <h2 className="text-2xl font-headline font-black italic">Step 1: Your contact details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <label className="space-y-2 md:col-span-2">
                    <span className="text-sm text-zinc-300">Full name</span>
                    <input
                      value={data.ownerName}
                      onChange={(e) => setData((prev) => ({ ...prev, ownerName: e.target.value }))}
                      className="w-full rounded-xl bg-zinc-900 border border-zinc-700 px-4 py-3"
                      placeholder="e.g. Ahmed Hassan"
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm text-zinc-300">Email address</span>
                    <input
                      type="email"
                      value={data.ownerEmail}
                      onChange={(e) => setData((prev) => ({ ...prev, ownerEmail: e.target.value }))}
                      className="w-full rounded-xl bg-zinc-900 border border-zinc-700 px-4 py-3"
                      placeholder="owner@email.com"
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm text-zinc-300">Phone number</span>
                    <input
                      value={data.ownerPhone}
                      onChange={(e) => setData((prev) => ({ ...prev, ownerPhone: e.target.value }))}
                      className="w-full rounded-xl bg-zinc-900 border border-zinc-700 px-4 py-3"
                      placeholder="+971..."
                    />
                  </label>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    disabled={!canContinueStep1}
                    onClick={() => setStep(2)}
                    className="bg-primary px-6 py-3 rounded-xl font-semibold disabled:opacity-40"
                  >
                    Continue
                  </button>
                </div>
              </div>
            ) : null}

            {step === 2 ? (
              <div className="space-y-6">
                <h2 className="text-2xl font-headline font-black italic">Step 2: Restaurant details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <label className="space-y-2">
                    <span className="text-sm text-zinc-300">Restaurant name</span>
                    <input
                      value={data.restaurantName}
                      onChange={(e) => setData((prev) => ({ ...prev, restaurantName: e.target.value }))}
                      className="w-full rounded-xl bg-zinc-900 border border-zinc-700 px-4 py-3"
                      placeholder="Restaurant name"
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm text-zinc-300">Location</span>
                    <input
                      value={data.location}
                      onChange={(e) => setData((prev) => ({ ...prev, location: e.target.value }))}
                      className="w-full rounded-xl bg-zinc-900 border border-zinc-700 px-4 py-3"
                      placeholder="Downtown, Marina, DIFC..."
                    />
                  </label>

                  <label className="space-y-2 md:col-span-2">
                    <span className="text-sm text-zinc-300">Main cuisine</span>
                    <input
                      value={data.cuisine}
                      onChange={(e) => setData((prev) => ({ ...prev, cuisine: e.target.value }))}
                      className="w-full rounded-xl bg-zinc-900 border border-zinc-700 px-4 py-3"
                      placeholder="Japanese, Indian, Italian..."
                    />
                  </label>

                  <label className="space-y-2 md:col-span-2">
                    <span className="text-sm text-zinc-300">Short description</span>
                    <textarea
                      value={data.shortDescription}
                      onChange={(e) => setData((prev) => ({ ...prev, shortDescription: e.target.value }))}
                      className="w-full rounded-xl bg-zinc-900 border border-zinc-700 px-4 py-3 min-h-28"
                      placeholder="Tell customers what makes your restaurant special."
                    />
                  </label>
                </div>

                <div className="flex justify-between">
                  <button type="button" onClick={() => setStep(1)} className="border border-zinc-700 px-6 py-3 rounded-xl font-semibold">
                    Back
                  </button>
                  <button
                    type="button"
                    disabled={!canContinueStep2}
                    onClick={() => setStep(3)}
                    className="bg-primary px-6 py-3 rounded-xl font-semibold disabled:opacity-40"
                  >
                    Continue
                  </button>
                </div>
              </div>
            ) : null}

            {step === 3 ? (
              <div className="space-y-6">
                <h2 className="text-2xl font-headline font-black italic">Step 3: Choose your plan</h2>
                <p className="text-zinc-300">Pick a plan for this listing. You can upgrade or downgrade later.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <button
                    type="button"
                    onClick={() => setData((prev) => ({ ...prev, plan: "free" }))}
                    className={`text-left p-5 rounded-2xl border ${data.plan === "free" ? "border-primary bg-primary/10" : "border-zinc-700 bg-zinc-900"}`}
                  >
                    <p className="text-xs uppercase tracking-widest text-zinc-400 font-bold">Free Plan</p>
                    <h3 className="text-2xl font-headline font-black italic mt-2">Free</h3>
                    <ul className="mt-4 text-sm text-zinc-300 space-y-2">
                      <li>Standard listing page</li>
                      <li>Basic updates</li>
                      <li>Claim management</li>
                    </ul>
                  </button>

                  <button
                    type="button"
                    onClick={() => setData((prev) => ({ ...prev, plan: "paid" }))}
                    className={`text-left p-5 rounded-2xl border ${data.plan === "paid" ? "border-primary bg-primary/10" : "border-zinc-700 bg-zinc-900"}`}
                  >
                    <p className="text-xs uppercase tracking-widest text-primary font-bold">Paid Plan</p>
                    <h3 className="text-2xl font-headline font-black italic mt-2">AED 99 / month</h3>
                    <ul className="mt-4 text-sm text-zinc-300 space-y-2">
                      <li>Priority placement</li>
                      <li>Advanced analytics</li>
                      <li>Marketing highlights</li>
                    </ul>
                  </button>
                </div>

                <div className="rounded-2xl border border-zinc-700 p-5 text-sm text-zinc-300">
                  <p><strong>Owner:</strong> {data.ownerName || "-"}</p>
                  <p><strong>Restaurant:</strong> {data.restaurantName || "-"}</p>
                  <p><strong>Plan:</strong> {data.plan ? data.plan.toUpperCase() : "Not selected"}</p>
                </div>

                <div className="flex justify-between">
                  <button type="button" onClick={() => setStep(2)} className="border border-zinc-700 px-6 py-3 rounded-xl font-semibold">
                    Back
                  </button>
                  <button
                    type="button"
                    disabled={!canSubmit || submitting}
                    onClick={handleSubmit}
                    className="bg-primary px-7 py-3 rounded-xl font-semibold disabled:opacity-40"
                  >
                    {submitting ? "Finishing..." : "Complete onboarding"}
                  </button>
                </div>
              </div>
            ) : null}
          </div>

          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-4">
              <h3 className="text-xl font-headline font-black italic">Quick guide</h3>
              <ul className="space-y-2 text-sm text-zinc-300">
                <li>1. Add owner contact details.</li>
                <li>2. Add restaurant details.</li>
                <li>3. Pick free or paid plan.</li>
                <li>4. Finish and access your partner dashboard.</li>
              </ul>
            </div>

            <div className="bg-white text-zinc-900 rounded-3xl p-6 space-y-3">
              <h3 className="text-lg font-headline font-black italic">Restaurant already in database?</h3>
              <p className="text-sm text-zinc-600">
                Ask admin for your restaurant slug, then open <code>/claim/your-slug</code> to claim and choose your plan.
              </p>
            </div>
          </aside>
        </section>
      </main>

      <Footer />
    </div>
  );
}
