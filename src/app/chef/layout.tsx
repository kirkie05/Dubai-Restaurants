import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function ChefLayout({ children }: { children: React.ReactNode }) {
  const MENU_ITEMS = [
    { name: "Kitchen Overview", path: "/chef/dashboard", icon: "dashboard" },
    { name: "My Profile", path: "/chef/profile", icon: "person" },
    { name: "Linked Venues", path: "/chef/restaurants", icon: "store" },
    { name: "Media Assets", path: "/chef/media", icon: "photo_library" },
    { name: "Sign Out", path: "/", icon: "logout" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 px-8 lg:px-16 max-w-[1920px] mx-auto w-full flex flex-col lg:flex-row gap-20">
         {/* Chef Sidebar */}
         <aside className="w-full lg:w-80 shrink-0 space-y-12">
            <header className="space-y-4">
               <span className="text-primary font-body text-[10px] font-black uppercase tracking-[0.6em] block">Chef Console</span>
               <h2 className="text-4xl font-headline font-black italic tracking-tighter">Artisan <br /><span className="text-zinc-900">Desk.</span></h2>
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
         </aside>

         {/* Content */}
         <div className="flex-grow">
            {children}
         </div>
      </main>
      
      <Footer />
    </div>
  );
}
