import { Link } from '@/navigation';
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const MENU_ITEMS = [
    { name: "Overview", path: "/account/profile", icon: "dashboard" },
    { name: "Reservations", path: "/account/bookings", icon: "calendar_today" },
    { name: "Favorites", path: "/account/favorites", icon: "favorite" },
    { name: "Reviews", path: "/account/reviews", icon: "rate_review" },
    { name: "Notifications", path: "/account/notifications", icon: "notifications" },
    { name: "Settings", path: "/account/profile/edit", icon: "settings" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 px-8 lg:px-16 max-w-[1920px] mx-auto w-full flex flex-col lg:flex-row gap-20">
         {/* Sidebar Navigation */}
         <aside className="w-full lg:w-80 shrink-0 space-y-12">
            <header className="space-y-4">
               <span className="text-primary font-body text-[10px] font-black uppercase tracking-[0.4em] block">Curator Account</span>
               <h2 className="text-4xl font-headline font-black italic tracking-tighter text-on-surface">The <br /><span className="text-zinc-300">Desk.</span></h2>
            </header>

            <nav className="flex flex-col gap-2">
               {MENU_ITEMS.map((item) => (
                 <Link key={item.path} href={item.path} className="flex items-center justify-between p-5 rounded-2xl border border-transparent hover:border-slate-50 hover:bg-white hover:shadow-xl transition-all group">
                    <div className="flex items-center gap-4">
                       <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors">{item.icon}</span>
                       <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 group-hover:text-on-surface transition-colors">{item.name}</span>
                    </div>
                    <span className="material-symbols-outlined text-transparent group-hover:text-primary transition-colors text-sm">east</span>
                 </Link>
               ))}
               <button className="flex items-center gap-4 p-5 text-zinc-300 hover:text-primary transition-colors mt-8">
                  <span className="material-symbols-outlined">logout</span>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">Sign Out</span>
               </button>
            </nav>
         </aside>

         {/* Content Area */}
         <div className="flex-grow">
            {children}
         </div>
      </main>
      
      <Footer />
    </div>
  );
}
