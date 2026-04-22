"use client";

import { useState, useEffect, useRef } from "react";
import { Link, usePathname, useRouter } from "@/navigation";
import { useLocale, useTranslations } from 'next-intl';

const CUISINES = ["Italian", "Japanese", "Indian", "Lebanese"];
const OCCASIONS = ["Romantic Dining", "Brunch", "Fine Dining", "Outdoor Dining"];

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ar', name: 'العربية', flag: '🇦🇪' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
];

export const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations('Navbar');
  const dt = useTranslations('Data');

  const CUISINES_LIST = [
    { name: dt('cuisines.italian'), slug: 'italian' },
    { name: dt('cuisines.japanese'), slug: 'japanese' },
    { name: dt('cuisines.indian'), slug: 'indian' },
    { name: dt('cuisines.lebanese'), slug: 'lebanese' },
    { name: dt('cuisines.french'), slug: 'french' },
    { name: dt('cuisines.mexican'), slug: 'mexican' }
  ];

  const OCCASIONS_LIST = [
    { name: dt('occasions.romantic'), slug: 'romantic-dining' },
    { name: dt('occasions.brunch'), slug: 'brunch' },
    { name: dt('occasions.fine'), slug: 'fine-dining' },
    { name: dt('occasions.outdoor'), slug: 'outdoor-dining' }
  ];

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale as any });
    setIsLangDropdownOpen(false);
  };

  const NavItem = ({ label, translationKey, href, items }: { label: string, translationKey: string, href?: string, items?: {name: string, slug: string}[] }) => {
    const isActive = href === pathname || (items && items.some(item => pathname.includes(item.slug)));
    
    return (
      <div 
        className="relative group"
        onMouseEnter={() => setActiveDropdown(label)}
        onMouseLeave={() => setActiveDropdown(null)}
      >
        {href ? (
          <Link href={href} className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all py-8 flex items-center gap-1 ${isActive ? 'text-primary border-b-2 border-primary' : 'text-zinc-500 hover:text-secondary'}`}>
            {t(translationKey)}
          </Link>
        ) : (
          <button className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all py-8 flex items-center gap-1 ${isActive ? 'text-primary' : 'text-zinc-500 hover:text-secondary'}`}>
            {t(translationKey)}
            <span className={`material-symbols-outlined text-[12px] opacity-40 group-hover:rotate-180 transition-transform ${activeDropdown === label ? 'text-primary' : ''}`}>expand_more</span>
          </button>
        )}

        {items && activeDropdown === label && (
          <div className={`absolute top-full ${locale === 'ar' ? 'right-0' : 'left-0'} w-64 bg-white/95 backdrop-blur-2xl border border-slate-100 shadow-2xl rounded-2xl overflow-hidden p-6 animate-in fade-in slide-in-from-top-4 duration-300`}>
            <div className="space-y-1">
               {items.map((item) => (
                 <Link 
                    key={item.slug} 
                    href={`/${label.toLowerCase()}/${item.slug}`}
                    className="block px-4 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-slate-50 hover:text-primary transition-all"
                 >
                    {item.name}
                 </Link>
               ))}
               <div className="pt-4 mt-4 border-t border-slate-100">
                  <Link 
                    href={`/${label.toLowerCase()}`}
                    className="flex items-center justify-between px-4 py-3 rounded-lg bg-primary/5 text-[9px] font-black uppercase tracking-widest text-primary hover:bg-primary hover:text-white transition-all group/all"
                  >
                     <span>View All {label}</span>
                     <span className="material-symbols-outlined text-xs group-hover/all:translate-x-1 transition-transform">east</span>
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
          <div className="flex items-center gap-12 xl:gap-20">
            <Link href="/" className="group flex items-center gap-3">
               <div className="w-10 h-10 bg-zinc-900 rounded-lg flex items-center justify-center group-hover:bg-primary transition-all">
                  <div className="grid grid-cols-2 gap-0.5 transform group-hover:rotate-12 transition-transform">
                     <div className="w-1.5 h-1.5 bg-white"></div>
                     <div className="w-1.5 h-1.5 bg-secondary"></div>
                     <div className="w-1.5 h-1.5 bg-primary"></div>
                     <div className="w-1.5 h-1.5 bg-zinc-500"></div>
                  </div>
               </div>
               <span className="font-headline font-black italic text-xl lg:text-2xl tracking-tighter text-on-surface">Dubai Restaurants.</span>
            </Link>

            <div className="hidden lg:flex items-center gap-12 xl:gap-16">
              <NavItem label="Restaurants" translationKey="restaurants" href="/restaurants" />
              <NavItem label="Cuisines" translationKey="cuisines" items={CUISINES_LIST} />
              <NavItem label="Experiences" translationKey="experiences" items={OCCASIONS_LIST} />
              <NavItem label="Chefs" translationKey="chefs" href="/chefs" />
            </div>
          </div>

          <div className="flex items-center gap-4 lg:gap-8">
             {/* Language Dropdown Selector */}
             <div className="relative" ref={langRef}>
                <button 
                  onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-100 hover:border-primary transition-all group"
                >
                   <span className="text-lg">{LANGUAGES.find(l => l.code === locale)?.flag}</span>
                   <span className="text-[10px] font-black uppercase tracking-widest text-zinc-900 hidden sm:block">
                      {LANGUAGES.find(l => l.code === locale)?.name}
                   </span>
                   <span className={`material-symbols-outlined text-xs text-slate-300 transition-transform ${isLangDropdownOpen ? 'rotate-180' : ''}`}>expand_more</span>
                </button>

                {isLangDropdownOpen && (
                  <div className={`absolute top-full mt-4 ${locale === 'ar' ? 'left-0' : 'right-0'} w-48 bg-white border border-slate-100 shadow-2xl rounded-2xl overflow-hidden p-2 z-[60] animate-in fade-in slide-in-from-top-2`}>
                     {LANGUAGES.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => switchLocale(lang.code)}
                          className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all text-left ${locale === lang.code ? 'bg-primary/5 text-primary' : 'hover:bg-slate-50 text-slate-600'}`}
                        >
                           <div className="flex items-center gap-3">
                              <span className="text-base">{lang.flag}</span>
                              <span className="text-[10px] font-black uppercase tracking-widest">{lang.name}</span>
                           </div>
                           {locale === lang.code && <span className="material-symbols-outlined text-xs">check</span>}
                        </button>
                     ))}
                  </div>
                )}
             </div>

             <div className="w-px h-8 bg-slate-100 hidden sm:block"></div>
             
             <Link href="/login" className="bg-zinc-900 text-white px-6 lg:px-8 py-3 lg:py-4 rounded-xl font-headline font-black text-xs italic tracking-tight hover:bg-primary transition-all shadow-xl">
               {t('signIn')}
             </Link>
             
             <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5">
                <div className="w-6 h-0.5 bg-zinc-900"></div>
                <div className="w-4 h-0.5 bg-zinc-900 self-end"></div>
                <div className="w-6 h-0.5 bg-zinc-900"></div>
             </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-zinc-950 text-white animate-in fade-in duration-500">
           <div className="relative z-10 h-full flex flex-col p-12">
              <div className="flex justify-between items-center mb-16">
                 <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                       <span className="text-black font-headline font-black italic">D</span>
                    </div>
                    <span className="font-headline font-black italic text-xl">Restaurants.</span>
                 </div>
                 <button onClick={() => setIsMobileMenuOpen(false)} className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                    <span className="material-symbols-outlined">close</span>
                 </button>
              </div>

              <nav className="flex-grow space-y-6 overflow-y-auto pb-12">
                 {[
                   {label: t('restaurants'), href: '/restaurants'},
                   {label: t('cuisines'), href: '/cuisines'},
                   {label: t('experiences'), href: '/experiences'},
                   {label: t('chefs'), href: '/chefs'}
                 ].map((item) => (
                    <Link key={item.label} href={item.href} className="block text-4xl font-headline font-black italic tracking-tighter hover:text-primary transition-colors">
                       {item.label}.
                    </Link>
                 ))}
                 
                 <div className="pt-12 mt-12 border-t border-white/10 space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 mb-6">{t('switchLanguage')}</p>
                    <div className="grid grid-cols-2 gap-4">
                       {LANGUAGES.map((lang) => (
                          <button
                            key={lang.code}
                            onClick={() => switchLocale(lang.code)}
                            className={`flex items-center gap-3 p-4 rounded-2xl border transition-all ${locale === lang.code ? 'border-primary bg-primary/10' : 'border-white/5 bg-white/5'}`}
                          >
                             <span className="text-xl">{lang.flag}</span>
                             <span className="text-[9px] font-black uppercase tracking-widest">{lang.name}</span>
                          </button>
                       ))}
                    </div>
                 </div>
              </nav>
           </div>
        </div>
      )}
    </>
  );
};
