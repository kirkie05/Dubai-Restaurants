import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function PartnerLayout({ children }: { children: React.ReactNode }) {
  const MENU_ITEMS = [
    { name: "Control Center", path: "/partner/dashboard", icon: "grid_view" },
    { name: "Venue Manager", path: "/partner/venue", icon: "restaurant" },
    { name: "Bookings", path: "/partner/bookings", icon: "calendar_month" },
    { name: "Menu Curation", path: "/partner/menu", icon: "menu_book" },
    { name: "Media Assets", path: "/partner/media", icon: "photo_library" },
    { name: "Analytics", path: "/partner/analytics", icon: "analytics" },
    { name: "Billing", path: "/partner/billing", icon: "payments" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-white">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 px-8 lg:px-16 max-w-[1920px] mx-auto w-full flex flex-col lg:flex-row gap-20">
         {/* Partner Sidebar */}
         <aside className="w-full lg:w-80 shrink-0 space-y-12">
            <header className="space-y-4">
               <span className="text-primary font-body text-[10px] font-black uppercase tracking-[0.6em] block">Partner Desk</span>
               <h2 className="text-4xl font-headline font-black italic tracking-tighter">Terminal <br /><span className="text-zinc-800">.01</span></h2>
            </header>

            <nav className="flex flex-col gap-2">
               {MENU_ITEMS.map((item) => (
                 <Link key={item.path} href={item.path} className="flex items-center justify-between p-5 rounded-3xl border border-white/5 hover:border-primary/20 hover:bg-white/5 transition-all group">
                    <div className="flex items-center gap-4">
                       <span className="material-symbols-outlined text-zinc-700 group-hover:text-primary transition-colors">{item.icon}</span>
                       <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 group-hover:text-white transition-colors">{item.name}</span>
                    </div>
                    <span className="material-symbols-outlined text-transparent group-hover:text-primary transition-colors text-sm">east</span>
                 </Link>
               ))}
            </nav>

            <div className="pt-12 border-t border-white/5 space-y-8">
               <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                  <p className="text-[8px] font-black uppercase tracking-widest text-zinc-600 mb-1">Status</p>
                  <div className="flex items-center gap-3">
                     <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                     <p className="text-[10px] font-black uppercase tracking-widest">Active Tenure</p>
                  </div>
               </div>
            </div>
         </aside>

         {/* Dashboard Content */}
         <div className="flex-grow">
            {children}
         </div>
      </main>
      
      <Footer />
    </div>
  );
}
