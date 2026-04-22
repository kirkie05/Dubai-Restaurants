import { Link } from '@/navigation';
import { getTranslations } from 'next-intl/server';

export const Footer = async () => {
  const t = await getTranslations('Footer');

  return (
    <footer className="w-full py-16 px-8 mt-auto bg-slate-50 border-t border-slate-200">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-screen-2xl mx-auto text-sm leading-relaxed">
        <div className="col-span-2 md:col-span-1">
          <div className="text-xl font-black text-slate-900 mb-4 tracking-tighter">DRD</div>
          <p className="text-slate-500 mb-6 max-w-xs">© {new Date().getFullYear()} {t('copyright')}</p>
        </div>
        <div className="flex flex-col gap-4">
          <p className="font-bold text-slate-900 mb-2">{t('neighborhoods')}</p>
          <Link href="/neighborhood/jumeirah" className="text-slate-500 hover:text-primary transition-colors">{t('jumeirah')}</Link>
          <Link href="/neighborhood/downtown" className="text-slate-500 hover:text-primary transition-colors">{t('downtownDubai')}</Link>
          <Link href="/neighborhood/difc" className="text-slate-500 hover:text-primary transition-colors">{t('difc')}</Link>
        </div>
        <div className="flex flex-col gap-4">
          <p className="font-bold text-slate-900 mb-2">{t('cuisines')}</p>
          <Link href="/cuisine/fine-dining" className="text-slate-500 hover:text-primary transition-colors">{t('fineDining')}</Link>
          <Link href="/cuisine/brunch" className="text-slate-500 hover:text-primary transition-colors">{t('brunchGuides')}</Link>
        </div>
        <div className="flex flex-col gap-4">
          <p className="font-bold text-slate-900 mb-2">{t('company')}</p>
          <Link href="/about" className="text-slate-500 hover:text-primary transition-colors">{t('aboutUs')}</Link>
          <Link href="/contact" className="text-slate-500 hover:text-primary transition-colors">{t('contact')}</Link>
          <Link href="/faq" className="text-slate-500 hover:text-primary transition-colors">{t('faq')}</Link>
        </div>
      </div>
    </footer>
  );
};
