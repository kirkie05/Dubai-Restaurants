"use client";

import { useEffect, useState } from "react";
import AccountLayout from "@/components/layout/AccountLayout";
import { useUser } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileEditSchema, ProfileEditFormData } from "@/lib/validations";
import { useRouter } from "@/navigation";

export default function EditProfile() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ProfileEditFormData>({
    resolver: zodResolver(profileEditSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (user) {
      setValue("fullName", user.fullName || "");
      setValue("email", user.primaryEmailAddress?.emailAddress || "");
      setValue("phone", (user.unsafeMetadata?.phone as string) || "");
      setValue("language", (user.unsafeMetadata?.language as string) || "English (UK)");
    }
  }, [user, setValue]);

  const onSubmit = async (data: ProfileEditFormData) => {
    if (!user) return;
    try {
      const parts = data.fullName.trim().split(" ");
      const firstName = parts[0];
      const lastName = parts.slice(1).join(" ");
      
      await user.update({
        firstName,
        lastName: lastName || undefined,
        unsafeMetadata: {
          ...user.unsafeMetadata,
          phone: data.phone,
          language: data.language,
        }
      });
      
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 4000);
      router.refresh();
    } catch (e) {
      console.error(e);
      alert("Failed to update profile.");
    }
  };

  if (!isLoaded) {
    return (
      <AccountLayout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </AccountLayout>
    );
  }

  return (
    <AccountLayout>
       <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <header className="pb-12 border-b border-slate-100 flex justify-between items-end">
             <div>
               <span className="text-primary font-body text-[10px] font-black uppercase tracking-[0.4em] block mb-4">Account settings</span>
               <h1 className="text-5xl md:text-7xl font-headline font-black italic tracking-tighter text-on-surface">The <span className="text-primary">Identity.</span></h1>
             </div>
             {isSuccess && (
               <div className="bg-emerald-50 text-emerald-600 px-6 py-3 rounded-xl flex items-center gap-2 border border-emerald-100 animate-in fade-in zoom-in">
                 <span className="material-symbols-outlined">check_circle</span>
                 <span className="text-xs font-bold uppercase tracking-widest">Profile Updated</span>
               </div>
             )}
          </header>

          <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-12 md:p-20 rounded-[3rem] shadow-2xl border border-slate-50 space-y-16">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-4">
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-300">Legal Name</label>
                   <input 
                     {...register("fullName")}
                     className={`w-full bg-transparent border-b-2 ${errors.fullName ? 'border-red-500' : 'border-slate-100 focus:border-primary'} py-4 font-headline font-black italic text-2xl placeholder:text-slate-200 outline-none transition-all`} 
                   />
                   {errors.fullName && <p className="text-xs text-red-500">{errors.fullName.message}</p>}
                </div>
                <div className="space-y-4">
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-300">Digital Identity (Email)</label>
                   <input 
                     {...register("email")}
                     disabled
                     className="w-full bg-transparent border-b-2 border-slate-100 py-4 font-headline font-black italic text-2xl text-slate-400 outline-none cursor-not-allowed" 
                   />
                   <p className="text-[10px] text-slate-400">Email is managed via your security settings.</p>
                </div>
                <div className="space-y-4">
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-300">Communication Phone</label>
                   <input 
                     {...register("phone")}
                     type="tel" 
                     className="w-full bg-transparent border-b-2 border-slate-100 py-4 font-headline font-black italic text-2xl placeholder:text-slate-200 focus:border-primary outline-none transition-all" 
                   />
                </div>
                <div className="space-y-4">
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-300">Preferred Language</label>
                   <select 
                     {...register("language")}
                     className="w-full bg-transparent border-b-2 border-slate-100 py-4 font-headline font-black italic text-2xl outline-none appearance-none cursor-pointer focus:border-primary"
                   >
                      <option value="English (UK)">English (UK)</option>
                      <option value="Arabic">Arabic</option>
                      <option value="French">French</option>
                   </select>
                </div>
             </div>

             <div className="pt-12 border-t border-slate-50 flex items-center justify-between">
                <button 
                  type="submit"
                  disabled={!isDirty || isSubmitting}
                  className="bg-zinc-900 text-white px-12 py-6 rounded-2xl font-headline font-black text-xl italic shadow-2xl hover:bg-primary transition-all disabled:opacity-50 disabled:hover:bg-zinc-900"
                >
                   {isSubmitting ? "Saving..." : "Save Changes"}
                </button>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-300">
                   Managed securely by Clerk
                </p>
             </div>
          </form>
       </div>
    </AccountLayout>
  );
}
