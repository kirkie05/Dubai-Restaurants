"use client";

import { useState } from "react";
import Image from "next/image";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { Link, locales, usePathname, useRouter } from "@/navigation";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

type NavItemLink = {
  name: string;
  slug: string;
  href?: string;
};

type NavItemProps = {
  id: string;
  label: string;
  href?: string;
  items?: NavItemLink[];
  activeDropdown: string | null;
  setActiveDropdown: (id: string | null) => void;
};

function NavItem({
  id,
  label,
  href,
  items,
  activeDropdown,
  setActiveDropdown,
}: NavItemProps) {
  const isOpen = activeDropdown === id;

  return (
    <div
      className="relative group"
      onMouseEnter={() => setActiveDropdown(id)}
      onMouseLeave={() => setActiveDropdown(null)}
    >
      {href ? (
        <Link href={href} className="text-[10px] font-black uppercase tracking-[0.2em] py-8 flex items-center gap-1 text-zinc-500 hover:text-primary">
          {label}
        </Link>
      ) : (
        <button
          type="button"
          className="text-[10px] font-black uppercase tracking-[0.2em] py-8 flex items-center gap-1 text-zinc-500 hover:text-primary"
        >
          {label}
          <span className="material-symbols-outlined text-[12px] opacity-40 group-hover:rotate-180 transition-transform">
            expand_more
          </span>
        </button>
      )}

      {items && isOpen ? (
        <div className="absolute top-full left-0 w-64 bg-white/95 backdrop-blur-2xl border border-slate-100 shadow-2xl rounded-2xl p-6">
          <div className="space-y-1">
            {items.map((item) => (
              <Link
                key={item.href || item.slug}
                href={item.href ?? `/${id}/${item.slug}`}
                className={`block px-4 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                  item.href && !item.slug
                    ? "text-secondary hover:text-secondary/70 mt-1 border-t border-slate-100 pt-3"
                    : "text-slate-400 hover:text-primary"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("Navbar");
  const dt = useTranslations("Data");
  const { isLoaded, isSignedIn } = useUser();

  const cuisineItems: NavItemLink[] = [
    { name: dt("cuisines.italian"), slug: "italian" },
    { name: dt("cuisines.japanese"), slug: "japanese" },
    { name: dt("cuisines.indian"), slug: "indian" },
    { name: dt("cuisines.lebanese"), slug: "lebanese" },
    { name: "+ more", slug: "", href: "/cuisines" },
  ];

  const experienceItems: NavItemLink[] = [
    { name: dt("occasions.romantic"), slug: "romantic-dining" },
    { name: dt("occasions.brunch"), slug: "brunch" },
    { name: dt("occasions.fine"), slug: "fine-dining" },
    { name: "+ more", slug: "", href: "/experiences" },
  ];

  type LocaleCode = (typeof locales)[number];
  const localeNames: Record<LocaleCode, string> = {
    en: "English",
    ar: "العربية",
    fr: "Français",
    de: "Deutsch",
    es: "Español",
  };

  const handleLocaleChange = (nextLocale: LocaleCode) => {
    router.replace(pathname, { locale: nextLocale });
    setIsLangDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-xl border-b border-slate-50">
      <div className="max-w-[1920px] mx-auto px-6 lg:px-16 h-20 lg:h-24 flex justify-between items-center">
        <div className="flex items-center gap-12 xl:gap-20">
          <Link href="/" className="group flex items-center" aria-label="Home">
            <div className="relative h-16 lg:h-20 w-40 lg:w-64">
              <Image
                src="/logo.png"
                alt="Dubai Restaurants"
                fill
                className="object-contain object-left"
                priority
                sizes="(max-width: 1024px) 160px, 256px"
              />
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-12 xl:gap-16">
            <NavItem
              id="restaurants"
              label={t("restaurants")}
              href="/restaurants"
              activeDropdown={activeDropdown}
              setActiveDropdown={setActiveDropdown}
            />
            <NavItem
              id="cuisines"
              label={t("cuisines")}
              items={cuisineItems}
              activeDropdown={activeDropdown}
              setActiveDropdown={setActiveDropdown}
            />
            <NavItem
              id="experiences"
              label={t("experiences")}
              items={experienceItems}
              activeDropdown={activeDropdown}
              setActiveDropdown={setActiveDropdown}
            />
            <NavItem
              id="chefs"
              label={t("chefs")}
              href="/chefs"
              activeDropdown={activeDropdown}
              setActiveDropdown={setActiveDropdown}
            />
          </div>
        </div>

        <div className="flex items-center gap-4 lg:gap-8">
          <div className="relative">
            <button
              type="button"
              className="hidden md:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-primary"
              onClick={() => setIsLangDropdownOpen((prev) => !prev)}
            >
              {localeNames[locale as LocaleCode] || locale.toUpperCase()}
              <span className="material-symbols-outlined text-[12px]">expand_more</span>
            </button>
            {isLangDropdownOpen ? (
              <div className="absolute right-0 top-full mt-2 w-44 bg-white border border-slate-100 shadow-xl rounded-xl p-2 z-50">
                {locales.map((lng) => (
                  <button
                    key={lng}
                    type="button"
                    onClick={() => handleLocaleChange(lng)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold ${
                      locale === lng ? "bg-zinc-900 text-white" : "hover:bg-slate-50 text-zinc-700"
                    }`}
                  >
                    {localeNames[lng]}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <div className="flex items-center gap-4">
            {isLoaded ? (
              isSignedIn ? (
                <>
                  <Link
                    href="/account/profile"
                    className="text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-primary hidden md:block"
                  >
                    Account
                  </Link>
                  <UserButton />
                </>
              ) : (
                <SignInButton mode="modal">
                  <button
                    type="button"
                    className="hidden md:flex items-center px-5 py-2.5 rounded-full bg-zinc-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-secondary transition-colors"
                  >
                    {t("signIn")}
                  </button>
                </SignInButton>
              )
            ) : null}
          </div>

          <button
            type="button"
            className="lg:hidden"
            aria-label="Open menu"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </div>

      {isMobileMenuOpen ? (
        <div className="lg:hidden border-t border-slate-100 bg-white px-6 pb-6">
          <div className="flex flex-col pt-4 gap-4 text-[11px] font-black uppercase tracking-[0.2em] text-zinc-600">
            <Link href="/restaurants" onClick={() => setIsMobileMenuOpen(false)} className={pathname.includes("/restaurants") ? "text-primary" : ""}>
              {t("restaurants")}
            </Link>
            <Link href="/cuisines" onClick={() => setIsMobileMenuOpen(false)}>
              {t("cuisines")}
            </Link>
            <Link href="/experiences" onClick={() => setIsMobileMenuOpen(false)}>
              {t("experiences")}
            </Link>
            <Link href="/chefs" onClick={() => setIsMobileMenuOpen(false)}>
              {t("chefs")}
            </Link>
            <div className="pt-2 border-t border-slate-100 mt-2">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3">{t("switchLanguage")}</p>
              <div className="flex flex-col gap-2">
                {locales.map((lng) => (
                  <button
                    key={lng}
                    type="button"
                    onClick={() => handleLocaleChange(lng)}
                    className={`text-left text-xs font-semibold px-3 py-2 rounded-lg ${
                      locale === lng ? "bg-zinc-900 text-white" : "bg-slate-50 text-zinc-700"
                    }`}
                  >
                    {localeNames[lng]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </nav>
  );
}
