import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function UserProfile() {
  const user = {
    name: "James Harrington",
    role: "Premium Member",
    bio: "Connoisseur of fine dining and Mediterranean flavors. Exploring Dubai's culinary landscape since 2018.",
    points: "12,450",
    nextTier: "Platinum at 15,000",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD50aN_TgpXTAfBYTMHjRckdzRlQ4mWuFBzH3ry1wFSwC7nkbMjZTQDdB_0toTVVFnZQjQBtvgcVzNYs9RBEGvSrwhnshTROKvc7u7drmNL2-WgLGF4Z5ZkXAA-IZH-d0IRplAeWFn2EmmOYuN0spq-tNStqxVooH8KCoRuWLIIIiVdz1oE8L1KF2uHrrvK8jeDB3LiR9SPfXTaQCtuxe_X6G0wHC0nwV7TFL1xobbmYWW81SEsMekVu_UlfmPaKb3hKFuHaojscKjw"
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-32 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Profile Header */}
        <header className="flex flex-col md:flex-row items-end gap-8 mb-16">
          <div className="relative group">
            <div className="w-40 h-40 md:w-56 md:h-56 bg-slate-100 overflow-hidden rounded-lg relative">
              <Image 
                src={user.image}
                alt={user.name}
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-primary text-white p-3 rounded-sm shadow-xl cursor-pointer">
              <span className="material-symbols-outlined">edit</span>
            </div>
          </div>
          <div className="flex-1 space-y-2">
            <span className="font-body text-[10px] uppercase tracking-[0.2em] text-primary font-bold">{user.role}</span>
            <h1 className="text-5xl md:text-7xl font-headline font-extrabold tracking-tight text-on-surface leading-none italic">{user.name}</h1>
            <p className="text-lg text-slate-500 font-body max-w-lg">{user.bio}</p>
          </div>
        </header>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Upcoming Bookings */}
          <section className="md:col-span-2 bg-slate-100 p-8 rounded-lg shadow-sm border border-white">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl font-headline font-bold italic">Upcoming Bookings</h2>
              <Link href="/history" className="text-primary font-body text-[10px] uppercase tracking-widest font-bold">View History</Link>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-md flex flex-col sm:flex-row gap-6 hover:shadow-md transition-all duration-300">
                <div className="w-full sm:w-32 h-32 rounded-lg overflow-hidden relative shrink-0">
                  <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_9Luvxyk-7EPWzGzR4kOZh_agscoIos6fWl50NC3xGm5AHgq4sjiWf3mtT_5Preu9PystGWUuFYw-HTEum8xhijWS0rLonTjye4i13BVnWnhnH5f7_1VK6Khsrc8m46qu0pFTCl8ZCOYHi6U8VRYQJnSb8ihEH1L-2PtrluS81b-gh1wuHZCF1c74agbfTAYSkGKso6CUyot_G9ZB9va_-92Abjswj2ak6CwooJIprwmKju6JzggPQtD1-x-Y6W9-kfa_w_nY-SvP" alt="Restaurant" fill className="object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-headline font-bold italic">L&apos;Atelier de Joël Robuchon</h3>
                      <span className="px-3 py-1 bg-secondary/10 text-secondary text-[10px] font-bold uppercase rounded-full">Confirmed</span>
                    </div>
                    <p className="text-sm text-slate-400 mt-1 font-body">DIFC, Dubai</p>
                  </div>
                  <div className="flex items-center gap-6 mt-4">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-sm">calendar_today</span>
                      <span className="text-sm font-medium font-body">Oct 24, 2023</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-sm">schedule</span>
                      <span className="text-sm font-medium font-body">20:30</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <section className="bg-zinc-900 text-white p-8 rounded-lg shadow-xl">
              <h2 className="text-xl font-headline font-bold mb-6 italic">Profile Details</h2>
              <div className="space-y-6">
                <div>
                  <label className="block font-body text-[9px] uppercase tracking-widest text-zinc-500 mb-1 font-bold">Email Address</label>
                  <p className="font-body text-sm text-zinc-300 italic">james.harrington@executive.ae</p>
                </div>
                <button className="w-full mt-4 py-3 bg-zinc-800 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-700 transition-colors font-body">Edit Personal Info</button>
              </div>
            </section>

            <section className="bg-slate-100 p-8 rounded-lg border border-white relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-xl font-headline font-bold mb-2 italic">Gourmet Points</h2>
                <div className="text-4xl font-headline font-extrabold text-primary">{user.points}</div>
                <p className="text-[10px] font-body uppercase tracking-wider text-slate-400 mt-2 font-bold">{user.nextTier}</p>
                <div className="w-full h-1 bg-slate-200 mt-4 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[80%]"></div>
                </div>
              </div>
              <span className="material-symbols-outlined absolute -bottom-4 -right-4 text-9xl opacity-5 pointer-events-none" style={{ fontVariationSettings: "'FILL' 1" }}>military_tech</span>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
