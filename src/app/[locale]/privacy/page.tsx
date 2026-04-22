import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function PrivacyPolicyPage() {
  const sections = [
    { id: 'collection', label: 'Data Collection' },
    { id: 'usage', label: 'How We Use It' },
    { id: 'security', label: 'Security Protocols' },
    { id: 'rights', label: 'Your Digital Rights' }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-24 px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          {/* Hero Header Section */}
          <div className="lg:col-span-8 space-y-8">
            <span className="font-body text-[10px] uppercase tracking-[0.4em] text-primary font-bold">Regulatory Framework</span>
            <h1 className="font-headline text-[4rem] md:text-[6rem] leading-[0.9] font-extrabold tracking-tighter text-on-surface italic">
              Privacy <br/><span className="text-primary font-normal">Policy</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-xl leading-relaxed italic font-body">
              At Dubai Restaurants, we curate experiences. This policy outlines how we handle the digital footprint you leave while discovering the finest culinary destinations in the UAE.
            </p>
          </div>

          {/* Floating Sidebar (Desktop) */}
          <div className="hidden lg:block lg:col-span-4 translate-y-32">
            <div className="sticky top-40 bg-slate-50 p-10 rounded-sm border-l-4 border-primary">
              <h4 className="font-body text-[10px] uppercase tracking-[0.3em] font-bold mb-8 text-on-surface">SUMMARY</h4>
              <nav className="flex flex-col gap-6">
                {sections.map(section => (
                  <Link key={section.id} href={`#${section.id}`} className="font-headline text-lg font-bold italic text-slate-400 hover:text-primary transition-all">
                    {section.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content Body */}
          <div className="lg:col-span-8 space-y-24 pt-20">
            <section id="collection" className="space-y-12">
              <div className="w-full h-[400px] relative rounded-lg overflow-hidden italic shadow-2xl border border-white">
                <Image 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCqIBLu62w8MGCcdtPChj6bRegNDNjszm_AtN0EiTv7ywq_dJB56AKBob0mRNpYQtH1xYPSFJzImMjpVuVpY5uUSM2CMK1GDaDDCY-B_JHjQSf8c6XA-Xg_yhql9yL5t29OIGW_P0ve-p4u41dwK1BZ2AC3fSnd9JFZLdCaMMJNc4gmj5zMKw8wJ8qnywpZ7xvw6HjHvIp9aiQuYR2wVfcdzBfInnnx-RVgjtI0wsPEJEOglrQ3AviXrIhWXAq4-vQhujMx9S86Gpe" 
                  alt="Security" 
                  fill 
                  className="object-cover grayscale opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/40 via-transparent to-transparent"></div>
              </div>

              <div className="space-y-8">
                <h2 className="font-headline text-4xl font-black italic tracking-tight">1. Data We Collect</h2>
                <p className="text-lg text-slate-500 font-body italic leading-relaxed">Our commitment is to transparency. We collect information that helps us personalize your journey through Dubai&apos;s dining scene.</p>
                <ul className="space-y-6">
                  {[
                    ['Identity Data', 'Full name, title, and date of birth for age-restricted bookings.'],
                    ['Contact Data', 'Email address and UAE phone numbers for reservation confirmations.'],
                    ['Preference Data', 'Dietary requirements, preferred seating, and cuisine interests.'],
                    ['Technical Data', 'IP address, browser type, and time zone settings used to access our platform.']
                  ].map(([title, desc]) => (
                    <li key={title} className="flex gap-6 items-start">
                       <span className="w-8 h-px bg-primary mt-3"></span>
                       <div>
                         <p className="font-headline text-xl font-bold italic mb-1">{title}</p>
                         <p className="font-body text-slate-400 text-sm italic">{desc}</p>
                       </div>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section id="usage" className="space-y-8">
              <h2 className="font-headline text-4xl font-black italic tracking-tight">2. Strategic Usage</h2>
              <p className="text-lg text-slate-500 font-body italic leading-relaxed">We do not &quot;sell&quot; data. We leverage information to refine the editorial content you see and to facilitate seamless transactions with our restaurant partners.</p>
              <div className="bg-zinc-900 p-12 rounded-lg text-zinc-400 font-body text-sm italic leading-relaxed space-y-4 border border-white/5 shadow-2xl">
                 <p>&bull; Processing your reservations and managing your restaurant loyalty profiles.</p>
                 <p>&bull; Personalizing the &quot;Discover&quot; feed based on your previous culinary interactions.</p>
                 <p>&bull; Communicating essential updates regarding Dubai&apos;s evolving gastronomic landscape.</p>
              </div>
            </section>

            <section id="security" className="space-y-8">
              <h2 className="font-headline text-4xl font-black italic tracking-tight">3. Security Protocols</h2>
              <div className="bg-slate-50 p-12 rounded-lg border border-white shadow-sm italic text-xl font-headline font-bold text-on-surface leading-tight text-center">
                 &quot;Security is the bedrock of trust in our editorial ecosystem.&quot;
              </div>
              <p className="text-lg text-slate-500 font-body italic leading-relaxed">We employ enterprise-grade SSL encryption and multi-factor authentication for all administrative access. Your data is stored on localized secure servers within the UAE jurisdiction, adhering strictly to the highest standards of data sovereignty.</p>
            </section>

            <section id="rights" className="space-y-12">
              <h2 className="font-headline text-4xl font-black italic tracking-tight">4. Your Digital Sovereignty</h2>
              <p className="text-lg text-slate-500 font-body italic leading-relaxed">As a patron of Dubai Restaurants, you retain full control over your digital identity.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {[
                   { title: 'Access & Portability', desc: 'Request a full export of your personal data stored within our systems.', icon: 'lock_open' },
                   { title: 'Right to Erasure', desc: 'Request the permanent deletion of your account and historical data.', icon: 'delete_forever' }
                 ].map(right => (
                   <div key={right.title} className="p-10 bg-white border border-slate-50 hover:border-primary transition-all group shadow-sm">
                      <span className="material-symbols-outlined text-primary text-4xl mb-6 group-hover:scale-110 transition-transform">{right.icon}</span>
                      <h5 className="font-headline text-2xl font-bold italic mb-4">{right.title}</h5>
                      <p className="font-body text-slate-400 text-sm italic leading-relaxed">{right.desc}</p>
                   </div>
                 ))}
              </div>
            </section>

            <div className="pt-20 border-t border-slate-100 italic">
               <p className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-slate-300">LAST UPDATED: MAY 24, 2024</p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
