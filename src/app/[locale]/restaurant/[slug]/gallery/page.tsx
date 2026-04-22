import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/ui/Reveal";

const MEDIA = [
  { id: 1, url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBScFTU5wYXxlVQjth8aCZ9LedSVLqxxLEusO3iFznSTrSTlnuSzIMdLWcLYRZ3ZqEs_8NNkhMJ5yDxOTrhA6W-3iQ-UlgnPVDta3m_5S0r9FXRxl5eYl51pYc6k_v4WOrw2QRehEqr-plNlZmxnL9Bm6jQrKrx2ZXNg6O-d_Xz9f_663knA_6A14-2v8uPGHgf6THAkwEDT0FCetS7861RoHJVSeqdCZqMBkS0wvscF6KUR8YO7rcjnipDAP3bgIdAmipuPo2l6FzQ" },
  { id: 2, url: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-Mn3VfstTh6o3L6SjYskEApEpYXGgUOGgmrZIRvdRuatACz82KGEoe_dZi1LHGPSGlttJlLdO3Bf7qt9R5uiUx7xle3W-EOuxW67f8UAnW81QcVyF00k1RFYJ5sPSiRlLHi00ZecET7JWgQt3einGYeZRnxhExhRu5YDF16Sc2OIixQ8vf-k3eQSq3V8IYjDYXf6Z4ehyD2LreChpW4CGZmQnAOjNspmb954v2IZ1bSU09taNNOCO929NR-oAsWWjyBUb7xuoBulv" },
  { id: 3, url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAdc7lSbzK-fWgtbQ-W888RdtZBVq36fh9OOdQc-kQctlbMo4uKOnTbs3qwkHCa4UNABdMhkKh4U805FJ8rXVL273eZ18qrg7vR7UzsV2d7uc6WuMkTXwNIbFz4RNFpFmXrqkUuKybw9jAF9YO5X4jh8lousBzZbvjDOsM8jR1FXEoh7-cOuSfOmPhYll5FamukRMp8YjMnGYy5AL2K9ijjf1mGrYQHkdIHw4LXwVRY2OEc-8kAc0V9I0vdrmKxYKaPGU5HBXY49TRq" },
  { id: 4, url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAzv0qhsoRFmpbHaf_2gJ_lKOUMZVdzV0SBQT9r1fZ1EEpAv2epAT_tNIR6XOChNUVmNnOvDAbZK6SaW4Bn1dHTQo3VJOBeyrqTBElxkS8ZbtUdNglTvQM9CBzWTmgyMnWBo4vOA9PsIu5tcJIGAy5Gk8mxTzZXEUzIRv3LG0iF2ABnY4Yl4UMWSO8A2-Z6v90UL2S2Dq_IzNTcJimIMCVNtrTylS4qApQ1XawxxKhd4h8h9xQ6fLaB6rC5xCWKYJ7MAbISfcTbl7ty" },
];

export default async function RestaurantGallery({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  return (
    <div className="flex flex-col min-h-screen bg-zinc-900">
      <Navbar />
      
      <main className="pt-32 min-h-screen">
        <div className="max-w-[1920px] mx-auto px-8 lg:px-16 py-20 space-y-20">
           <Reveal>
             <header className="flex flex-col md:flex-row justify-between items-end gap-8 pb-12 border-b border-white/10">
                <div className="space-y-4">
                   <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Visual Identity</span>
                   <h1 className="text-6xl md:text-8xl font-headline font-black italic tracking-tighter leading-none text-white">The <span className="text-zinc-600">Gallery.</span></h1>
                   <p className="text-zinc-500 font-body text-sm font-medium italic mt-6">A cinematic exploration of textures, light, and culinary precision.</p>
                </div>
                <Link href={`/restaurant/${slug}`} className="text-primary font-body text-[10px] font-black uppercase tracking-[0.3em] pb-1 border-b border-primary/20 hover:border-primary transition-all">Close Gallery</Link>
             </header>
           </Reveal>

           <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:h-[1200px]">
              <Reveal className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-3xl">
                 <Image src={MEDIA[0].url} alt="Gallery 1" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 50vw" />
              </Reveal>
              <Reveal className="md:col-span-1 md:row-span-1 relative group overflow-hidden rounded-3xl stagger-1">
                 <Image src={MEDIA[1].url} alt="Gallery 2" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" sizes="(max-width: 768px) 100vw, 25vw" />
              </Reveal>
              <Reveal className="md:col-span-1 md:row-span-2 relative group overflow-hidden rounded-3xl stagger-2">
                 <Image src={MEDIA[2].url} alt="Gallery 3" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 25vw" />
              </Reveal>
              <Reveal className="md:col-span-1 md:row-span-1 relative group overflow-hidden rounded-3xl stagger-3">
                 <Image src={MEDIA[3].url} alt="Gallery 4" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" sizes="(max-width: 768px) 100vw, 25vw" />
              </Reveal>
           </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
