import Image from "next/image";
import { Link } from '@/navigation';
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function TermsOfServicePage() {
  const sections = [
    { id: 'acceptance', label: '01. Acceptance of Terms' },
    { id: 'services', label: '02. Editorial Services' },
    { id: 'reservations', label: '03. Reservations & Booking' },
    { id: 'user-conduct', label: '04. User Conduct' },
    { id: 'intellectual-property', label: '05. Intellectual Property' },
    { id: 'liability', label: '06. Limitation of Liability' }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-24 px-8 max-w-7xl mx-auto w-full">
        {/* Header Section */}
        <header className="mb-24 lg:ml-12 max-w-4xl space-y-8">
          <span className="font-body text-[10px] uppercase tracking-[0.4em] text-primary font-bold">Legal Framework</span>
          <h1 className="font-headline text-[4rem] md:text-[6rem] font-extrabold tracking-tighter leading-[0.8] text-on-surface italic">
            Terms of <br/><span className="text-primary tracking-tight">Service</span>
          </h1>
          <p className="font-body text-xl text-slate-500 max-w-2xl leading-relaxed italic">
            Effective Date: January 1, 2024. These terms govern your use of the Dubai Restaurants editorial platform and reservation services.
          </p>
        </header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 lg:ml-12">
          {/* Table of Contents (Sticky) */}
          <aside className="hidden lg:block col-span-3 h-fit sticky top-40">
            <nav className="space-y-10">
              <div className="h-px bg-slate-100 w-16"></div>
              <ul className="space-y-6">
                {sections.map(section => (
                  <li key={section.id}>
                    <Link href={`#${section.id}`} className="font-headline text-lg font-bold italic text-slate-400 hover:text-primary transition-all">
                      {section.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Text Content */}
          <div className="lg:col-span-8 space-y-24">
            {/* Acceptance */}
            <section id="acceptance" className="space-y-8">
              <h2 className="font-headline text-3xl font-black italic tracking-tight">01. Acceptance of Terms</h2>
              <div className="font-body text-lg text-slate-500 italic leading-relaxed space-y-6">
                <p>By accessing or using the Dubai Restaurants website, mobile application, or any services provided by Dubai Restaurants (collectively, the &quot;Service&quot;), you agree to be bound by these Terms of Service. If you do not agree to all of these terms, do not use the Service.</p>
                <p>We reserve the right to change or modify these Terms at any time and in our sole discretion. If we make changes to these Terms, we will provide notice of such changes, such as by sending an email notification or providing notice through the Service.</p>
              </div>
            </section>

            {/* Editorial Services */}
            <section id="services" className="bg-slate-50 p-12 lg:p-16 rounded-lg border border-white shadow-sm space-y-12">
              <h2 className="font-headline text-3xl font-black italic tracking-tight">02. Editorial Services</h2>
              <div className="font-body text-lg text-slate-500 italic leading-relaxed space-y-8">
                <p>Dubai Restaurants provides curated editorial content, including reviews, recommendations, and photography of dining establishments in Dubai. While we strive for absolute accuracy, all opinions expressed are those of our editorial board at the time of publication.</p>
                <div className="grid md:grid-cols-2 gap-12 pt-8">
                  <div className="space-y-4 border-l-2 border-primary/20 pl-8">
                    <h4 className="font-body text-[10px] uppercase tracking-widest font-bold text-on-surface">Curation Standards</h4>
                    <p className="text-sm italic text-slate-400 leading-relaxed">We maintain strict editorial independence. Restaurants cannot pay for inclusion in our curated &quot;Gold List&quot; or featured chef galleries.</p>
                  </div>
                  <div className="space-y-4 border-l-2 border-secondary/20 pl-8">
                    <h4 className="font-body text-[10px] uppercase tracking-widest font-bold text-on-surface">Pricing Transparency</h4>
                    <p className="text-sm italic text-slate-400 leading-relaxed">Menu prices listed are subject to change by the restaurant and may not include VAT or service charges applicable in the UAE.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Reservations */}
            <section id="reservations" className="space-y-8">
              <h2 className="font-headline text-3xl font-black italic tracking-tight">03. Reservations & Booking</h2>
              <div className="font-body text-lg text-slate-500 italic leading-relaxed space-y-8">
                <p>Our platform facilitates reservations between users and partner restaurants. By making a reservation through Dubai Restaurants, you enter into a direct (legally binding) relationship with the restaurant at which you at booking.</p>
                <ul className="space-y-4 italic">
                  {[
                    'Cancellations must be made at least 24 hours prior to the reservation time unless otherwise stated by the specific restaurant policy.',
                    'No-show fees may apply based on individual restaurant policies and will be clearly communicated at the point of booking.'
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4 items-start">
                      <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Visual Break */}
            <section className="py-20 relative">
               <div className="aspect-[21/9] relative rounded-lg overflow-hidden italic shadow-2xl border border-white">
                  <Image 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBscPjaEGizje4kvRtbUAJEE05CAQ1VDCPsrXf7tOghs_y_CayUYY7i1J0gViHJP6WoTap8LP7sQwUg1DC1qUl6HAMjfWIN_otP2cL8MuEAv-FIt8x_LfRa2xewnkeUSjmn06K0JvbClRXtWg4OuT5d_zXMyv1spTYUhHFi9oZ_vQRNlVknyKcBSp9-hHoKzNheyFuM6HL-05HcAdbUjrDJ2w-cKy8yadKo4ZmUggMPZ2eCeY8pP9oV_e9bw_OGg5jj78itYdEMVTmD" 
                    alt="Atmosphere" 
                    fill 
                    className="object-cover grayscale brightness-50"
                  />
                  <div className="absolute inset-0 flex flex-col justify-center px-16 lg:px-24 bg-zinc-900/40">
                     <p className="text-white font-headline text-4xl font-light italic max-w-lg leading-tight">
                        &quot;The pursuit of culinary excellence requires a framework of mutual respect.&quot;
                     </p>
                  </div>
               </div>
            </section>

            {/* Conduct */}
            <section id="user-conduct" className="space-y-8">
              <h2 className="font-headline text-3xl font-black italic tracking-tight">04. User Conduct</h2>
              <div className="font-body text-lg text-slate-500 italic leading-relaxed">
                <p>Users are prohibited from: (a) using the Service for any illegal purpose; (b) attempting to gain unauthorized access to our systems; (c) reproducing editorial content without explicit written consent; (d) providing false or misleading information during the reservation process.</p>
              </div>
            </section>

            {/* Intellectual & Liability */}
            <div className="grid md:grid-cols-2 gap-16 py-12 border-t border-slate-100">
               <section id="intellectual-property" className="space-y-4">
                  <h3 className="font-headline text-2xl font-bold italic tracking-tighter">05. Intellectual Property</h3>
                  <p className="text-sm italic text-slate-400 leading-relaxed font-body">All content including photography, text, and interface design is the property of Dubai Restaurants or its content suppliers and protected by international copyright laws.</p>
               </section>
               <section id="liability" className="space-y-4">
                  <h3 className="font-headline text-2xl font-bold italic tracking-tighter">06. Liability</h3>
                  <p className="text-sm italic text-slate-400 leading-relaxed font-body">Dubai Restaurants shall not be liable for any indirect, incidental, special, or consequential damages resulting from the use or inability to use our services.</p>
               </section>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
