import Image from "next/image";
import { Link } from '@/navigation';
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function FAQPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-24 px-8 max-w-7xl mx-auto w-full">
        {/* Hero Section */}
        <header className="mb-24 lg:ml-12 max-w-4xl space-y-8">
          <span className="font-body text-[10px] uppercase tracking-[0.4em] text-primary font-bold">Information Center</span>
          <h1 className="font-headline text-[4rem] md:text-[6rem] font-extrabold tracking-tighter leading-[0.8] text-on-surface italic">
            How can we <br/><span className="text-primary font-normal">assist you</span> today?
          </h1>
          <p className="font-body text-xl text-slate-500 max-w-2xl leading-relaxed italic">
            Explore our curated guide to navigating Dubai&apos;s finest culinary experiences. From membership perks to reservation protocols.
          </p>
        </header>

        {/* Search Bar Section */}
        <div className="mb-32 lg:ml-12">
          <div className="relative max-w-3xl group">
            <span className="material-symbols-outlined absolute left-8 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors">search</span>
            <input 
              className="w-full pl-20 pr-10 py-8 bg-slate-50 border-none rounded-sm focus:ring-1 focus:ring-primary/20 font-body text-xl italic placeholder:text-slate-300 transition-all shadow-sm" 
              placeholder="Search for questions (e.g. 'cancellation policy')" 
              type="text"
            />
          </div>
        </div>

        {/* FAQ Categories Bento */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 lg:ml-12">
          {/* Category: Bookings */}
          <section className="lg:col-span-8 space-y-12">
            <div className="flex items-center gap-6">
              <div className="w-16 h-0.5 bg-primary"></div>
              <h2 className="font-headline text-3xl font-black italic tracking-tight">Bookings</h2>
            </div>
            
            <div className="space-y-6">
              {[
                { q: 'How do I modify an existing reservation?', a: 'Reservations can be modified up to 24 hours prior to your scheduled time through the \'My Bookings\' section in your profile. For last-minute changes, please contact the restaurant directly via the phone number provided in your confirmation email.' },
                { q: 'What is the policy for group bookings over 10 people?', a: 'Groups exceeding 10 guests are considered "Event Bookings." These require a direct inquiry through our Concierge service to ensure the restaurant can accommodate your party\'s specific requirements and dietary needs.' },
                { q: 'Is there a fee for late cancellations?', a: 'While Dubai Restaurants does not charge a platform fee, individual restaurants may have their own cancellation policies which are clearly displayed during the booking process.' }
              ].map((faq, i) => (
                <details key={i} className="group bg-white border border-slate-50 rounded-lg overflow-hidden transition-all shadow-sm">
                  <summary className="flex justify-between items-center p-10 cursor-pointer list-none font-headline text-2xl font-bold italic tracking-tight group-hover:text-primary transition-colors">
                    <span>{faq.q}</span>
                    <span className="material-symbols-outlined transition-transform group-open:rotate-180 text-primary">expand_more</span>
                  </summary>
                  <div className="px-10 pb-10 text-slate-500 italic leading-relaxed font-body text-lg border-t border-slate-50 pt-8">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* Sidebar Info */}
          <aside className="lg:col-span-4 space-y-16">
            <div className="bg-zinc-900 p-12 rounded-lg text-white relative overflow-hidden group border border-white/5">
              <div className="relative z-10 space-y-8">
                <h3 className="font-headline text-3xl font-bold italic leading-tight">Need immediate help?</h3>
                <p className="font-body text-zinc-500 italic text-sm leading-relaxed">Our concierge team is available 24/7 for our Black Card members and between 9 AM - 9 PM for all guests via our private line.</p>
                <Link href="/contact" className="inline-flex items-center gap-4 font-body text-[10px] uppercase tracking-[0.3em] font-bold text-primary group-hover:gap-8 transition-all">
                   Contact Support <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
              <span className="material-symbols-outlined absolute -bottom-10 -right-10 text-[150px] opacity-[0.03] select-none pointer-events-none">support_agent</span>
            </div>

            <div className="space-y-8">
               <h3 className="font-body text-[10px] uppercase tracking-[0.4em] text-slate-300 font-bold">Quick Links</h3>
               <nav className="flex flex-col gap-6">
                 {[
                   { label: 'Terms of Service', href: '/terms' },
                   { label: 'Privacy Policy', href: '/privacy' },
                   { label: 'Refund Policy', href: '/terms' }
                 ].map(link => (
                   <Link key={link.label} href={link.href} className="font-headline text-2xl font-bold italic text-on-surface hover:text-primary transition-colors flex items-center justify-between group">
                     {link.label} 
                     <span className="material-symbols-outlined text-slate-200 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform text-lg">north_east</span>
                   </Link>
                 ))}
               </nav>
            </div>
          </aside>
        </div>

        {/* Categories Section 2 */}
        <div className="lg:ml-12 mt-32 space-y-32">
          {/* Accounts */}
          <section className="space-y-12">
            <div className="flex items-center gap-6">
              <div className="w-16 h-0.5 bg-secondary"></div>
              <h2 className="font-headline text-3xl font-black italic tracking-tight">Profile & Access</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {[
                 { q: 'How do I reset my password?', a: 'Click \'Sign In\' and select \'Forgot Password\'. You will receive an automated email with a secure link to create a new credential.' },
                 { q: 'Can I sync my dining history?', a: 'Yes, all reservations made through our platform are automatically synced to your dashboard, allowing you to re-book favorites and track your reviews.' }
               ].map((faq, i) => (
                 <details key={i} className="group bg-slate-50 border border-white rounded-lg overflow-hidden transition-all">
                    <summary className="flex justify-between items-center p-10 cursor-pointer list-none font-headline text-xl font-bold italic tracking-tight group-hover:text-primary">
                      <span>{faq.q}</span>
                      <span className="material-symbols-outlined transition-transform group-open:rotate-180 text-primary">expand_more</span>
                    </summary>
                    <div className="px-10 pb-10 text-slate-500 italic leading-relaxed text-sm">
                      {faq.a}
                    </div>
                 </details>
               ))}
            </div>
          </section>

          {/* Memberships */}
          <section className="space-y-12 pb-24">
            <div className="flex items-center gap-6">
              <div className="w-16 h-0.5 bg-zinc-900"></div>
              <h2 className="font-headline text-3xl font-black italic tracking-tight">Memberships</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                 { q: 'What is the Epicurean tier?', a: 'The entry-level membership providing early access to table releases and invitation-only chef\'s tables.' },
                 { q: 'Qualification for Black Card?', a: 'By invitation only, reserved for our most frequent diners with deep passion for the culinary scene.' },
                 { q: 'Membership refunds?', a: 'Annual fees are non-refundable after the 14-day grace period. Please review our full terms.' }
               ].map((faq, i) => (
                 <div key={i} className="bg-white p-10 rounded-lg border border-slate-50 shadow-sm space-y-6 hover:-translate-y-1 transition-all duration-500 border-t-4 border-t-primary/10">
                    <h4 className="font-headline text-xl font-bold italic leading-tight">{faq.q}</h4>
                    <p className="text-slate-400 font-body text-sm leading-relaxed italic">{faq.a}</p>
                 </div>
               ))}
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
