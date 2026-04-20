import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="w-full py-16 px-8 mt-auto bg-slate-50 border-t border-slate-200">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-screen-2xl mx-auto text-sm leading-relaxed">
        <div className="col-span-2 md:col-span-1">
          <div className="text-xl font-black text-slate-900 mb-4 tracking-tighter">DRD</div>
          <p className="text-slate-500 mb-6 max-w-xs">© {new Date().getFullYear()} Dubai Restaurant Directory. The Digital Curator. All Rights Reserved.</p>
        </div>
        <div className="flex flex-col gap-4">
          <p className="font-bold text-slate-900 mb-2">Neighborhoods</p>
          <Link href="/neighborhood/jumeirah" className="text-slate-500 hover:text-primary transition-colors">Jumeirah</Link>
          <Link href="/neighborhood/downtown" className="text-slate-500 hover:text-primary transition-colors">Downtown Dubai</Link>
          <Link href="/neighborhood/difc" className="text-slate-500 hover:text-primary transition-colors">DIFC</Link>
        </div>
        <div className="flex flex-col gap-4">
          <p className="font-bold text-slate-900 mb-2">Cuisines</p>
          <Link href="/cuisine/fine-dining" className="text-slate-500 hover:text-primary transition-colors">Fine Dining</Link>
          <Link href="/cuisine/brunch" className="text-slate-500 hover:text-primary transition-colors">Brunch Guides</Link>
        </div>
        <div className="flex flex-col gap-4">
          <p className="font-bold text-slate-900 mb-2">Company</p>
          <Link href="/about" className="text-slate-500 hover:text-primary transition-colors">About Us</Link>
          <Link href="/contact" className="text-slate-500 hover:text-primary transition-colors">Contact</Link>
          <Link href="/faq" className="text-slate-500 hover:text-primary transition-colors">FAQ</Link>
        </div>
      </div>
    </footer>
  );
};
