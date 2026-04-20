"use client";

import { useState, useEffect } from "react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LOCATIONS = ["Dubai Marina", "Downtown Dubai", "JBR", "DIFC"];
const CUISINES = ["Italian", "Japanese", "Indian", "Lebanese"];
const OCCASIONS = ["Romantic Dining", "Brunch", "Fine Dining", "Outdoor Dining"];

export const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const NavItem = ({ label, href, items }: { label: string, href?: string, items?: string[] }) => {
    const isActive = href === pathname || (items && items.some(item => pathname.includes(item.toLowerCase().replace(/ /g, '-'))));
    
    return (
      <div 
        className="relative group"
        onMouseEnter={() => setActiveDropdown(label)}
        onMouseLeave={() => setActiveDropdown(null)}
      >
        {href ? (
          <Link href={href} className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all py-8 flex items-center gap-1 ${isActive ? 'text-primary border-b-2 border-primary' : 'text-zinc-500 hover:text-secondary'}`}>
            {label}
          </Link>
        ) : (
          <button className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all py-8 flex items-center gap-1 ${isActive ? 'text-primary' : 'text-zinc-500 hover:text-secondary'}`}>
            {label}
            <span className={`material-symbols-outlined text-[12px] opacity-40 group-hover:rotate-180 transition-transform ${activeDropdown === label ? 'text-primary' : ''}`}>expand_more</span>
          </button>
        )}

        {items && activeDropdown === label && (
          <div className="absolute top-full left-0 w-64 bg-white/95 backdrop-blur-2xl border border-slate-100 shadow-2xl rounded-2xl overflow-hidden p-6 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="space-y-1">
               {items.map((item) => (
                 <Link 
                   key={item} 
                   href={`/${label.toLowerCase()}/${item.toLowerCase().replace(/ /g, '-')}`}
                   className="block px-4 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-slate-50 hover:text-primary transition-all"
                 >
                   {item}
                 </Link>
               ))}
               <div className="mt-6 pt-6 border-t border-slate-50 text-center">
                  <Link href={`/${label.toLowerCase()}`} className="text-[9px] font-black uppercase tracking-[0.3em] text-secondary hover:text-primary transition-colors flex items-center justify-center gap-2">
                    Explore All
                    <span className="material-symbols-outlined text-xs">east</span>
                  </Link>
               </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-xl border-b border-slate-50">
        <div className="max-w-[1920px] mx-auto px-6 lg:px-16 h-20 lg:h-24 flex justify-between items-center">
          {/* Left: Branding & Core Navigation */}
          <div className="flex items-center gap-12 xl:gap-20">
            <Link href="/" className="group flex items-center gap-3">
               <div className="w-10 h-10 bg-zinc-900 rounded-lg flex items-center justify-center group-hover:bg-primary transition-all">
                  {/* Dubai Flag Inspired Mosaic */}
                  <div className="grid grid-cols-2 gap-0.5 transform group-hover:rotate-12 transition-transform">
                     <div className="w-1.5 h-1.5 bg-white"></div>
                     <div className="w-1.5 h-1.5 bg-secondary"></div>
                     <div className="w-1.5 h-1.5 bg-primary"></div>
                     <div className="w-1.5 h-1.5 bg-zinc-500"></div>
                  </div>
               </div>
               <span className="font-headline font-black italic text-xl lg:text-2xl tracking-tighter text-on-surface">Dubai Restaurants.</span>
            </Link>

            <div className="hidden lg:flex items-center gap-8 xl:gap-12">
              <NavItem label="Home" href="/" />
              <NavItem label="Restaurants" href="/restaurants" />
              <NavItem label="Locations" items={LOCATIONS} />
              <NavItem label="Cuisines" items={CUISINES} />
              <NavItem label="Experiences" items={OCCASIONS} />
              <NavItem label="Chefs" href="/chefs" />
              <NavItem label="Blog" href="/blog" />
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-4 lg:gap-8">
             <button className="hidden sm:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 group h-full">
                <span className="material-symbols-outlined text-[18px] group-hover:text-secondary transition-colors">search</span>
                <span className="group-hover:text-zinc-900 transition-colors">Search</span>
             </button>
             <div className="w-px h-8 bg-slate-100 hidden sm:block"></div>
             <Link href="/login" className="bg-zinc-900 text-white px-6 lg:px-8 py-3 lg:py-4 rounded-xl font-headline font-black text-xs italic tracking-tight hover:bg-primary transition-all shadow-xl">
               Sign In.
             </Link>
             
             {/* Mobile Multi-Tier Hamburger */}
             <button 
               onClick={() => setIsMobileMenuOpen(true)}
               className="lg:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5"
             >
                <div className="w-6 h-0.5 bg-zinc-900"></div>
                <div className="w-4 h-0.5 bg-zinc-900 self-end"></div>
                <div className="w-6 h-0.5 bg-zinc-900"></div>
             </button>
          </div>
        </div>
      </nav>

      {/* Full-Screen Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-zinc-950 text-white animate-in fade-in duration-500">
           {/* Background Overlay */}
           <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
           <div className="absolute top-10 right-10 w-20 h-20 bg-primary/20 blur-3xl animate-pulse"></div>

           <div className="relative z-10 h-full flex flex-col p-12">
              <div className="flex justify-between items-center mb-20">
                 <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                       <span className="text-black font-headline font-black italic">D</span>
                    </div>
                    <span className="font-headline font-black italic text-xl">Directory.</span>
                 </div>
                 <button onClick={() => setIsMobileMenuOpen(false)} className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                    <span className="material-symbols-outlined">close</span>
                 </button>
              </div>

              <nav className="flex-grow space-y-8 overflow-y-auto pb-20">
                 {['Home', 'Restaurants', 'Locations', 'Cuisines', 'Experiences', 'Chefs', 'Blog'].map((label) => (
                    <Link 
                      key={label}
                      href={`/${label === 'Home' ? '' : label.toLowerCase()}`}
                      className="block text-5xl font-headline font-black italic tracking-tighter leading-none hover:text-primary transition-colors"
                    >
                       {label}.
                    </Link>
                 ))}
              </nav>

              <div className="pt-12 border-t border-white/10 flex justify-between items-end">
                 <div className="space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">Official Portal</span>
                    <p className="text-sm font-body italic text-zinc-400">Curated by the Board of Digital Antiquities</p>
                 </div>
                 {/* Flag Mosaic Accent */}
                 <div className="flex gap-1">
                    <div className="w-1 h-8 bg-primary"></div>
                    <div className="w-1 h-8 bg-secondary"></div>
                    <div className="w-1 h-8 bg-white"></div>
                    <div className="w-1 h-8 bg-zinc-500"></div>
                 </div>
              </div>
           </div>
        </div>
      )}
    </>
  );
};
