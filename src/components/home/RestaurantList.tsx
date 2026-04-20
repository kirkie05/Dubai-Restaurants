import Link from "next/link";
import Image from "next/image";

const TOP_PICKS = [
  {
    name: "Al Mahara",
    location: "Burj Al Arab",
    cuisine: "Seafood",
    rating: "4.9",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBcoFe6omNLIs7L32v-ULd2AqewYUWTBeHElsiYHNRC2ZHbGGUNFbcOf4TfXKaC-IQSgBqUUF0Td5Z4JOLYd9MbQeyCKpPcIIMV1NdXyCjCdb4NyvVEJa14-n27O9uuSEBtKhSgQmiVhXMe1IwnyOapfm3AEAhtsFevHDY0Gm0nuYInxRYULu9gsVCz1Ms4q0VX97ij367363xeRiFk2pghjkNDhkbeFnBEu-oKOxkvIemvkjYoL-mJ7ZjMiZnUV_YeVYDOjAuhhYTI",
    slug: "al-mahara"
  },
  {
    name: "Tresind Studio",
    location: "Palm Jumeirah",
    cuisine: "Indian Fusion",
    rating: "4.9",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCruulr_m5Dmt8w0mUSFYDpos34q-Xei7ZwRHJ9_LH7Inm8M2FL9hvfyEXAVTprCejuOqkoe_uRLFLhfC4JYaAqe_5NA4zt4IpMwqG6hKI5FDJxO3IAVhJ0HDQD3jY9aijq95Z7RZHxpZ5LsexFnHvPLGLGbgrd0uV-QtCB9QtTq7jrhMzAhq0grpuDCQDs3YG5wUvyzpbtZFRc3XGGmIEPLMPL0TAKMqV26r7KMt5eSbWNvdiTHuP30vTZvqHOIPPvSzTiszUZsh8u",
    slug: "tresind-studio"
  }
];

export function RestaurantList() {
  return (
    <section className="py-32 lg:py-48 px-6 lg:px-16 bg-zinc-950 text-white overflow-hidden relative">
      {/* Flag Inspired Background Gradient */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-r from-secondary/5 to-transparent pointer-events-none"></div>

      <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-32 items-center relative z-10">
         {/* Left: Text Content */}
         <div className="lg:col-span-5 xl:col-span-4 space-y-12">
            <header className="space-y-8">
               <div className="flex items-center gap-6">
                  <span className="text-primary font-body text-[10px] font-black uppercase tracking-[0.6em] block">Curator Selection</span>
                  <div className="w-12 h-px bg-white/10"></div>
                  <span className="text-secondary font-body text-[10px] font-black uppercase tracking-[0.6em] block">Verified</span>
               </div>
               <h2 className="text-6xl md:text-8xl font-headline font-black italic tracking-tighter leading-[0.8] text-white">The <br /><span className="text-zinc-800">Elite.</span></h2>
               <p className="text-xl text-zinc-500 font-body italic leading-relaxed max-w-sm">
                  A high-fidelity audit of Dubai&apos;s most impactful dining rooms. Verified by our board of digital curators.
               </p>
            </header>
            <Link href="/restaurants" className="inline-flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.4em] text-primary border-b-2 border-primary/20 pb-2 hover:border-primary transition-all group font-body">
               Browse Full Repository
               <span className="material-symbols-outlined text-base group-hover:translate-x-3 transition-transform">east</span>
            </Link>
         </div>

         {/* Right: Vertical List */}
         <div className="lg:col-span-7 xl:col-span-8 space-y-8 lg:space-y-12">
            {TOP_PICKS.map((item, i) => (
              <Link key={item.slug} href={`/restaurant/${item.slug}`} className="group flex flex-col md:flex-row items-center gap-12 p-10 bg-white/5 rounded-[4rem] border border-white/5 hover:border-primary/40 hover:bg-white/[0.07] transition-all duration-700 relative overflow-hidden">
                 <div className="relative w-full md:w-[320px] aspect-[4/3] rounded-[3rem] overflow-hidden shrink-0 shadow-2xl">
                    <Image src={item.image} alt={item.name} fill className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
                    <div className="absolute top-6 left-6 bg-secondary text-white text-[8px] font-black px-4 py-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">PREMIUM SELECTION</div>
                 </div>
                 <div className="flex-grow space-y-6 text-center md:text-left">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                       <div>
                          <h3 className="text-4xl lg:text-5xl font-headline font-black italic tracking-tighter group-hover:text-primary transition-colors leading-none">{item.name}.</h3>
                          <div className="flex items-center justify-center md:justify-start gap-3 mt-3">
                             <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">{item.cuisine}</span>
                             <div className="w-1.5 h-1.5 rounded-full bg-primary/40"></div>
                             <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">{item.location}</span>
                          </div>
                       </div>
                       <div className="flex items-center justify-center md:justify-end gap-3 px-8 py-3 bg-zinc-900 rounded-2xl border border-white/10 shadow-2xl group-hover:border-secondary transition-colors">
                          <span className="material-symbols-outlined text-secondary text-base" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                          <span className="text-2xl font-headline font-black italic">{item.rating}</span>
                       </div>
                    </div>
                    <p className="text-sm lg:text-base text-zinc-500 font-body italic leading-relaxed max-w-xl">
                       {i === 0 ? "A landmark of Dubai hospitality, offering high-fidelity seafood experiences within the architectural marvel of the Burj Al Arab." : "Redefining the molecular landscape of Indian heritage. A masterclass in sensory storytelling and contemporary mastery."}
                    </p>
                 </div>
              </Link>
            ))}
         </div>
      </div>
    </section>
  );
}
