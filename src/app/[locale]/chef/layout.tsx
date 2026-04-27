import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { createAdminClient } from "@/lib/supabase-server";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Link } from "@/navigation";
import { headers } from "next/headers";

const MENU_ITEMS = [
  { name: "Kitchen Overview", path: "/chef/dashboard", icon: "dashboard" },
  { name: "My Profile", path: "/chef/profile", icon: "person" },
  { name: "Linked Venues", path: "/chef/restaurants", icon: "store" },
  { name: "Media Assets", path: "/chef/media", icon: "photo_library" },
  { name: "Sign Out", path: "/", icon: "logout" },
];

export default async function ChefLayout({ 
  children,
  params
}: { 
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { userId } = await auth();
  if (!userId) {
    redirect(`/${locale}/sign-in`);
  }

  const supabase = createAdminClient();
  const { data: profile } = await supabase
    .from('chef_profiles')
    .select('status')
    .eq('clerk_user_id', userId)
    .single();

  const headersList = await headers();
  const pathname = headersList.get('x-invoke-path') || '';
  const isOnboarding = pathname.includes('/chef/onboarding');

  if (!profile && !isOnboarding) {
    redirect(`/${locale}/chef/onboarding`);
  }

  if (isOnboarding) {
    return (
      <div className="flex flex-col min-h-screen bg-black text-white">
        <Navbar />
        <main className="flex-grow pt-32 pb-24 px-6 lg:px-16 max-w-[1280px] mx-auto w-full">
          {children}
        </main>
        <Footer />
      </div>
    );
  }

  if (profile?.status === "pending") {
    return (
      <div className="flex flex-col min-h-screen bg-black text-white">
        <Navbar />
        <main className="flex-grow pt-32 pb-24 flex items-center justify-center px-6">
          <div className="text-center space-y-8 max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="material-symbols-outlined text-7xl text-primary block">pending_actions</span>
            <div className="space-y-3">
              <span className="text-secondary text-xs font-bold uppercase tracking-[0.3em]">Chef Onboarding</span>
              <h1 className="text-5xl font-headline font-black italic text-white">Profile Under Review</h1>
              <p className="text-zinc-400">
                Your application is awaiting admin verification. Dashboard access will be unlocked once your profile is approved.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-secondary">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              Pending Admin Approval
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Navbar />
      <main className="flex-grow pt-32 pb-24 px-8 lg:px-16 max-w-[1920px] mx-auto w-full flex flex-col lg:flex-row gap-20">
        <aside className="w-full lg:w-80 shrink-0 space-y-12">
          <header className="space-y-4">
            <span className="text-primary font-body text-[10px] font-black uppercase tracking-[0.6em] block">Chef Console</span>
            <h2 className="text-4xl font-headline font-black italic tracking-tighter">
              Artisan <br /><span className="text-zinc-900">Desk.</span>
            </h2>
          </header>
          <nav className="flex flex-col gap-2">
            {MENU_ITEMS.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="flex items-center justify-between p-5 rounded-3xl border border-white/5 hover:border-primary/20 hover:bg-white/5 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-zinc-700 group-hover:text-primary transition-colors">{item.icon}</span>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 group-hover:text-white transition-colors">{item.name}</span>
                </div>
                <span className="material-symbols-outlined text-transparent group-hover:text-primary transition-colors text-sm">east</span>
              </Link>
            ))}
          </nav>
        </aside>
        <div className="flex-grow">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
