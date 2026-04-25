"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Navbar } from "@/components/layout/Navbar";
import { Reveal } from "@/components/ui/Reveal";
import { supabase } from "@/lib/supabase";
import { useRouter } from "@/navigation";

type ClaimPlan = "free" | "paid";

type ClaimForm = {
  fullName: string;
  role: string;
  phone: string;
  proof: string;
};

type RestaurantRecord = {
  id: string;
  slug: string;
  name: string;
  image_url: string;
  location: string;
  is_claimed: boolean;
};

const defaultForm: ClaimForm = {
  fullName: "",
  role: "",
  phone: "",
  proof: "",
};

export default function ClaimListingPage() {
  const params = useParams<{ slug: string | string[] }>();
  const router = useRouter();
  const { user, isLoaded } = useUser();

  const slug = useMemo(() => {
    if (Array.isArray(params.slug)) return params.slug[0] || "";
    return params.slug || "";
  }, [params.slug]);

  const [step, setStep] = useState(1);
  const [restaurant, setRestaurant] = useState<RestaurantRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<ClaimPlan | null>(null);
  const [form, setForm] = useState<ClaimForm>(defaultForm);

  useEffect(() => {
    async function fetchRestaurant() {
      const { data } = await supabase.from("restaurants").select("id, slug, name, image_url, location, is_claimed").eq("slug", slug).single();

      if (!data) {
        setRestaurant(null);
        setLoading(false);
        return;
      }

      const record = data as RestaurantRecord;

      if (record.is_claimed) {
        router.push(`/restaurant/${slug}`);
        return;
      }

      setRestaurant(record);
      setLoading(false);
    }

    if (slug) {
      fetchRestaurant();
    }
  }, [router, slug]);

  const isStepOneValid = form.fullName.trim() && form.role.trim() && form.phone.trim();

  const handleClaim = async () => {
    if (!restaurant || !selectedPlan) return;

    setSubmitting(true);

    const ownerId = user?.id || "guest-owner";

    try {
      const { error } = await supabase
        .from("restaurants")
        .update({
          is_claimed: true,
          owner_id: ownerId,
          plan: selectedPlan,
          claimed_at: new Date().toISOString(),
        })
        .eq("slug", restaurant.slug);

      if (error) throw error;

      router.push(`/dashboard?claimed=${restaurant.slug}`);
    } catch (error) {
      console.error(error);
      alert("Could not complete the claim right now. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="h-screen flex items-center justify-center text-slate-500">Loading listing details...</div>;
  }

  if (!restaurant) {
    return <div className="h-screen flex items-center justify-center">Listing not found.</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-6xl mx-auto pt-32 pb-20 px-6">
        <Reveal className="space-y-10">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-3">
              <p className="text-primary text-xs font-bold uppercase tracking-[0.3em]">Claim your listing</p>
              <h1 className="text-4xl md:text-6xl font-headline font-black italic leading-tight">
                {restaurant.name}
              </h1>
              <p className="text-slate-600 text-base md:text-lg max-w-2xl">
                This listing was added by admin upload. Complete the steps below, then choose your plan: <strong>Free</strong> or <strong>Paid</strong>.
              </p>
            </div>

            <div className="flex items-center gap-3 text-sm font-semibold text-slate-500">
              {[1, 2, 3].map((index) => (
                <div key={index} className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-full border flex items-center justify-center ${
                      step >= index ? "bg-primary border-primary text-white" : "border-slate-300 text-slate-500"
                    }`}
                  >
                    {index}
                  </div>
                  {index < 3 ? <div className="w-8 h-px bg-slate-300" /> : null}
                </div>
              ))}
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <section className="lg:col-span-8 bg-white rounded-[2rem] border border-slate-100 p-8 md:p-10 shadow-xl space-y-8">
              {step === 1 ? (
                <div className="space-y-6">
                  <h2 className="text-2xl font-headline font-black italic">Step 1: Confirm who you are</h2>
                  <p className="text-slate-600">Use simple business details so our team can verify your ownership quickly.</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <label className="space-y-2">
                      <span className="text-sm font-semibold text-slate-700">Your full name</span>
                      <input
                        value={form.fullName}
                        onChange={(e) => setForm((prev) => ({ ...prev, fullName: e.target.value }))}
                        className="w-full rounded-xl border border-slate-300 px-4 py-3"
                        placeholder="e.g. Fatima Ali"
                      />
                    </label>

                    <label className="space-y-2">
                      <span className="text-sm font-semibold text-slate-700">Your role</span>
                      <input
                        value={form.role}
                        onChange={(e) => setForm((prev) => ({ ...prev, role: e.target.value }))}
                        className="w-full rounded-xl border border-slate-300 px-4 py-3"
                        placeholder="Owner, Manager, or Director"
                      />
                    </label>

                    <label className="space-y-2">
                      <span className="text-sm font-semibold text-slate-700">Phone number</span>
                      <input
                        value={form.phone}
                        onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
                        className="w-full rounded-xl border border-slate-300 px-4 py-3"
                        placeholder="+971..."
                      />
                    </label>

                    <label className="space-y-2">
                      <span className="text-sm font-semibold text-slate-700">Proof (optional)</span>
                      <input
                        value={form.proof}
                        onChange={(e) => setForm((prev) => ({ ...prev, proof: e.target.value }))}
                        className="w-full rounded-xl border border-slate-300 px-4 py-3"
                        placeholder="License number or company email"
                      />
                    </label>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      disabled={!isStepOneValid}
                      onClick={() => setStep(2)}
                      className="bg-zinc-900 text-white px-8 py-3 rounded-xl font-semibold hover:bg-primary disabled:opacity-40"
                    >
                      Continue to plan selection
                    </button>
                  </div>
                </div>
              ) : null}

              {step === 2 ? (
                <div className="space-y-6">
                  <h2 className="text-2xl font-headline font-black italic">Step 2: Choose your plan</h2>
                  <p className="text-slate-600">You can start with Free and upgrade later anytime.</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <button
                      type="button"
                      onClick={() => setSelectedPlan("free")}
                      className={`text-left p-6 rounded-2xl border transition-all ${
                        selectedPlan === "free"
                          ? "border-primary bg-primary/5"
                          : "border-slate-200 hover:border-slate-400"
                      }`}
                    >
                      <p className="text-xs uppercase tracking-widest text-slate-500 font-bold">Free Plan</p>
                      <h3 className="text-2xl font-headline font-black italic mt-2">Free</h3>
                      <ul className="mt-4 text-sm text-slate-600 space-y-2">
                        <li>Basic listing management</li>
                        <li>Profile updates</li>
                        <li>Review replies</li>
                      </ul>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedPlan("paid")}
                      className={`text-left p-6 rounded-2xl border transition-all ${
                        selectedPlan === "paid"
                          ? "border-primary bg-zinc-900 text-white"
                          : "border-slate-200 hover:border-slate-400"
                      }`}
                    >
                      <p className="text-xs uppercase tracking-widest font-bold text-primary">Paid Plan</p>
                      <h3 className="text-2xl font-headline font-black italic mt-2">AED 99 / month</h3>
                      <ul className={`mt-4 text-sm space-y-2 ${selectedPlan === "paid" ? "text-zinc-200" : "text-slate-600"}`}>
                        <li>Everything in Free</li>
                        <li>Priority ranking</li>
                        <li>Advanced insights</li>
                      </ul>
                    </button>
                  </div>

                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-6 py-3 rounded-xl border border-slate-300 font-semibold text-slate-700"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      disabled={!selectedPlan}
                      onClick={() => setStep(3)}
                      className="bg-zinc-900 text-white px-8 py-3 rounded-xl font-semibold hover:bg-primary disabled:opacity-40"
                    >
                      Review and submit
                    </button>
                  </div>
                </div>
              ) : null}

              {step === 3 ? (
                <div className="space-y-6">
                  <h2 className="text-2xl font-headline font-black italic">Step 3: Review and submit</h2>
                  <div className="rounded-2xl border border-slate-200 p-5 space-y-3 text-sm">
                    <p><strong>Listing:</strong> {restaurant.name}</p>
                    <p><strong>Location:</strong> {restaurant.location}</p>
                    <p><strong>Name:</strong> {form.fullName}</p>
                    <p><strong>Role:</strong> {form.role}</p>
                    <p><strong>Phone:</strong> {form.phone}</p>
                    <p><strong>Plan:</strong> {selectedPlan === "paid" ? "Paid" : "Free"}</p>
                    {!isLoaded ? <p className="text-amber-600">Sign-in check is loading. You can still continue.</p> : null}
                  </div>

                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-6 py-3 rounded-xl border border-slate-300 font-semibold text-slate-700"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      disabled={submitting || !selectedPlan}
                      onClick={handleClaim}
                      className="bg-primary text-white px-8 py-3 rounded-xl font-semibold hover:bg-zinc-900 disabled:opacity-40"
                    >
                      {submitting ? "Submitting..." : "Submit claim"}
                    </button>
                  </div>
                </div>
              ) : null}
            </section>

            <aside className="lg:col-span-4 space-y-6">
              <div className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden shadow-xl">
                <Image src={restaurant.image_url} alt={restaurant.name} fill className="object-cover" />
              </div>

              <div className="bg-white rounded-[2rem] border border-slate-100 p-6 shadow-xl space-y-4">
                <h3 className="text-xl font-headline font-black italic">What happens next?</h3>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li>1. We review your claim details.</li>
                  <li>2. Your listing is linked to your owner account.</li>
                  <li>3. You can edit your listing and manage your plan.</li>
                </ul>
              </div>
            </aside>
          </div>
        </Reveal>
      </main>
    </div>
  );
}
