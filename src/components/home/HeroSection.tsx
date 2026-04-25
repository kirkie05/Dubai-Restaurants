"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from 'next-intl';
import { Reveal } from "@/components/ui/Reveal";

interface Suggestion {
  id: string | number;
  name: string;
  type: string;
  area: string;
}

interface Props {
  initialSuggestions?: Suggestion[];
}

export function HeroSection({ initialSuggestions }: Props) {
  const t = useTranslations('Hero');
  const ct = useTranslations('Common');
  const dt = useTranslations('Data');
  const t_root = useTranslations();
  
  const defaultSuggestions = useMemo(() => [
    { id: 1, name: "Al Mahara", type: dt('types.restaurant'), area: dt('areas.burj-al-arab') },
    { id: 2, name: dt('areas.downtown'), type: dt('types.area'), area: dt('areas.city-center') },
    { id: 3, name: dt('cuisines.indian'), type: dt('types.category'), area: dt('areas.global') },
    { id: 4, name: "Ossiano", type: dt('types.restaurant'), area: dt('areas.palm-jumeirah') },
    { id: 5, name: dt('areas.marina'), type: dt('types.area'), area: dt('areas.coastal') },
    { id: 6, name: "Zuma", type: dt('types.restaurant'), area: t_root('Data.areas.difc') },
    { id: 7, name: "Nobu", type: dt('types.restaurant'), area: dt('areas.palm-jumeirah') },
  ], [dt, t_root]);

  const mockSuggestions = (initialSuggestions && initialSuggestions.length > 0) ? initialSuggestions : defaultSuggestions;

  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const suggestionRef = useRef<HTMLDivElement>(null);

  const filteredSuggestions = useMemo(() => {
    if (searchQuery.trim().length === 0) {
      return mockSuggestions;
    }

    const normalized = searchQuery.toLowerCase();
    return mockSuggestions.filter((item) =>
      item.name.toLowerCase().includes(normalized) || item.area.toLowerCase().includes(normalized)
    );
  }, [mockSuggestions, searchQuery]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLocateMe = () => {
    setIsLocating(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setSearchQuery("Current Location Mapped");
          setIsLocating(false);
        },
        (error) => {
          console.error("Geolocation error:", error);
          setIsLocating(false);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
      setIsLocating(false);
    }
  };

  return (
    <section className="relative pt-32 lg:pt-48 pb-20 px-6 lg:px-16 z-30 bg-background">
      <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
        {/* Left Column: Content & Search */}
        <div className="lg:col-span-7 space-y-12 z-10">
          <Reveal className="space-y-6">
            <div className="flex items-center gap-4">
               <span className="font-body text-[10px] uppercase tracking-[0.6em] text-primary font-black">{ct('digitalCurator')}</span>
               <div className="w-12 h-px bg-slate-200"></div>
               <span className="font-body text-[10px] uppercase tracking-[0.6em] text-secondary font-black">{ct('official')}</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-headline font-black tracking-tighter leading-[0.85] text-on-surface">
              {t.rich('title', {
                red: (chunks) => <span className="text-primary">{chunks}</span>
              })}
            </h1>
            <p className="text-xl text-slate-500 font-body max-w-2xl leading-relaxed italic">
              {t('subtitle')}
            </p>
          </Reveal>

          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl relative">
             <div ref={suggestionRef} className="flex-1 flex items-center bg-white border border-slate-100 rounded-2xl p-2 shadow-2xl focus-within:ring-4 focus-within:ring-primary/5 transition-all relative">
                <span className="material-symbols-outlined ml-4 text-slate-300">location_on</span>
                <input 
                   type="text" 
                   value={searchQuery}
                   onFocus={() => setShowSuggestions(true)}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   placeholder={t('searchPlaceholder')}
                   className="w-full border-none focus:ring-0 text-sm lg:text-base font-body italic p-4 ml-2"
                />
                <button className="bg-primary text-white p-4 rounded-xl hover:bg-zinc-900 transition-all flex items-center justify-center">
                   <span className="material-symbols-outlined text-lg">search</span>
                </button>

                {/* Suggestions Dropdown */}
                {showSuggestions && filteredSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-4 bg-white/95 backdrop-blur-2xl border border-slate-100 shadow-[0_30px_60px_rgba(0,0,0,0.1)] rounded-2xl overflow-hidden z-[100] p-4 animate-in fade-in slide-in-from-top-2">
                     <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-4 px-4">{t('suggestions.instant')}</p>
                     <div className="space-y-1">
                        {filteredSuggestions.map((item) => (
                          <button 
                            key={item.id}
                            onClick={() => {
                              setSearchQuery(item.name);
                              setShowSuggestions(false);
                            }}
                            className="w-full text-left flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition-all group"
                          >
                             <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                                   <span className="material-symbols-outlined text-primary text-xl group-hover:text-white transition-colors">
                                      {item.type === dt('types.area') ? 'map' : item.type === dt('types.category') ? 'restaurant_menu' : 'restaurant'}
                                   </span>
                                </div>
                                <div>
                                   <p className="text-sm font-black text-on-surface">{item.name}</p>
                                   <p className="text-[10px] text-slate-400">{item.area}</p>
                                </div>
                             </div>
                             <span className="text-[10px] font-bold text-secondary opacity-0 group-hover:opacity-100 transition-opacity">{t('suggestions.select')}</span>
                          </button>
                        ))}
                     </div>
                  </div>
                )}
             </div>

             <button 
                onClick={handleLocateMe}
                disabled={isLocating}
                className="bg-secondary text-white px-10 py-5 rounded-2xl font-body text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-zinc-900 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
             >
               <span className={`material-symbols-outlined text-base ${isLocating ? 'animate-spin' : ''}`}>
                 {isLocating ? 'refresh' : 'my_location'}
               </span>
               {isLocating ? 'Locating...' : t('locateMe')}
             </button>
          </div>
        </div>

        {/* Right Column: Featured Image with Glassmorphic Card */}
        <div className="lg:col-span-5 relative hidden lg:block animate-float">
          <div className="relative aspect-[4/5] w-full max-w-xl mx-auto translate-x-12">
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/10 blur-[120px] rounded-full animate-pulse"></div>
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-secondary/10 blur-[120px] rounded-full delay-700 animate-pulse"></div>
            
            <div className="relative h-full w-full rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border-[12px] border-white -rotate-6 hover:rotate-0 transition-all duration-1000 group">
              <Image 
                src="/al_mahara_restaurant_1776785631205.png"
                alt="Signature Dish"
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            <div className="absolute bottom-12 -left-20 bg-white/80 backdrop-blur-3xl p-8 rounded-[2.5rem] shadow-2xl border border-white/50 max-w-[280px] rotate-3 group hover:rotate-0 transition-all duration-500">
               <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-2xl" style={{fontVariationSettings: "'FILL' 1"}}>hotel_class</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t('featuredPick.label')}</p>
                    <p className="font-headline font-black text-on-surface text-xl italic tracking-tighter">{t('featuredPick.name')}</p>
                  </div>
               </div>
               <p className="text-sm text-slate-500 font-body italic leading-relaxed">{t('featuredPick.desc')}</p>
               <div className="mt-6 flex gap-1.5">
                 {[1,2,3,4,5].map(i => (
                    <span key={i} className="material-symbols-outlined text-[12px] text-primary" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                 ))}
               </div>
               <div className="absolute -top-3 -right-3 bg-secondary text-white text-[9px] font-black px-4 py-2 rounded-full shadow-lg">{t('featuredPick.badge')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
