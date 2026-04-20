import Image from "next/image";
import Link from "next/link";

const TRENDING_MOCK = [
  { id: 1, name: "Dean's Cheesecake", rating: 4.8, type: "Bakery", location: "DIFC, Dubai", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDrIsYUUoc19uEnsaiJEirMxyd2g0H-fk2fuOCTIO27M3_C7dK84aSQymRafH2q932HYkqhCg4ROdaklHVY7nlInnzZRBaGL6rMXfYtl7EiAJp-SqEI18zpN2iBFYs9kfsgKaq84BCHccmzJV2BggEe01u0pNDS32l20rpK-1AmQvYeCBFMkhQlvP620w9PmRNrxhNVKkf1ACb7HDyslrSPPUh93kw0xW1xtG40tvfMEtMOD_KZVj64p2MXq5c-kDgAOTyGSjqebF_w" },
  { id: 2, name: "Primo's Pizza & Grill", rating: 4.6, type: "Italian", location: "Marina, Dubai", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAzv0qhsoRFmpbHaf_2gJ_lKOUMZVdzV0SBQT9r1fZ1EEpAv2epAT_tNIR6XOChNUVmNnOvDAbZK6SaW4Bn1dHTQo3VJOBeyrqTBElxkS8ZbtUdNglTvQM9CBzWTmgyMnWBo4vOA9PsIu5tcJIGAy5Gk8mxTzZXEUzIRv3LG0iF2ABnY4Yl4UMWSO8A2-Z6v90UL2S2Dq_IzNTcJimIMCVNtrTylS4qApQ1XawxxKhd4h8h9xQ6fLaB6rC5xCWKYJ7MAbISfcTbl7ty" },
  { id: 3, name: "Tijuana Flare", rating: 4.9, type: "Mexican", location: "Downtown, Dubai", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAGa4CwW44iM04VNtHF6xpbm3v-__4K0qWXbVOgML_MZ0bCI1maDFyaT2OufKmnTeReschX3WXF-8DDdsgUWIyM-ZPVKfWCDqfbGIFguAMlHxvppgnxBUW2KdpfQL5E26DbsWA23Xy5a1-kb5N3DCGI9JwTY_53PouhL748ldeA5TcFUFiOVAHbq4FUJpGBfnD_yF6Cc3_0JBD7kdM_fuQGUSHdCVY-bIwyxI2E2pc9Q0MAIyApeYbpKbR8nvfsCjnEFKv-6ig6tGjq" }
];

export function TrendingCarousel() {
  return (
    <section className="py-24 px-8 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-l-4 border-primary pl-8">
          <div className="space-y-2">
            <h2 className="text-4xl font-headline font-black italic tracking-tight text-on-surface">Trending This Week</h2>
            <p className="text-slate-400 font-body text-sm font-medium">The most popular restaurants in Dubai right now.</p>
          </div>
          <div className="flex gap-4">
             <button className="w-12 h-12 rounded-full border border-slate-100 flex items-center justify-center text-slate-300 hover:border-primary hover:text-primary transition-all">
                <span className="material-symbols-outlined">west</span>
             </button>
             <button className="w-12 h-12 rounded-full border border-slate-100 flex items-center justify-center text-slate-300 hover:border-primary hover:text-primary transition-all">
                <span className="material-symbols-outlined">east</span>
             </button>
          </div>
        </div>

        <div className="flex gap-8 overflow-x-auto pb-8 hide-scrollbar snap-x">
          {TRENDING_MOCK.map((item) => (
            <div key={item.id} className="min-w-[320px] md:min-w-[400px] snap-start group bg-slate-50 p-4 rounded-xl border border-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
               <div className="relative aspect-video rounded-lg overflow-hidden mb-6">
                  <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-3 py-1 rounded-sm text-[10px] font-black uppercase tracking-widest flex items-center gap-1 shadow-sm">
                     <span className="material-symbols-outlined text-sm text-primary" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                     {item.rating}
                  </div>
               </div>
               <div className="space-y-4">
                  <div className="flex justify-between items-start">
                     <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">{item.type}</p>
                        <h4 className="text-2xl font-headline font-black text-on-surface italic">{item.name}</h4>
                        <div className="flex items-center gap-2 text-slate-400 text-xs mt-1">
                           <span className="material-symbols-outlined text-xs">location_on</span>
                           {item.location}
                        </div>
                     </div>
                     <Link href={`/restaurant/${item.id}`} className="bg-primary text-white p-3 rounded-lg hover:scale-110 transition-all shadow-lg">
                        <span className="material-symbols-outlined text-sm">arrow_outward</span>
                     </Link>
                  </div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
