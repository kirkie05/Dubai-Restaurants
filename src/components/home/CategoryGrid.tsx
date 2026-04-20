import Link from "next/link";
import Image from "next/image";

const CUISINES = [
  { name: "Italian", count: 142, slug: "italian", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB6i_-Wj6_G0_N8_v_oZ_u_j-k-l-m-n-o-p-q-r-s-t-u-v-w-x-y-z" },
  { name: "Japanese", count: 89, slug: "japanese", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC1_a_b_c_d_e_f_g_h_i_j_k_l_m_n_o_p_q_r_s_t_u_v_w-x-y-z" },
  { name: "Indian", count: 112, slug: "indian", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD2_1_2_3_4_5_6_7_8_9_0_a_b_c_d_e_f_g_h_i_j_k_l_m_n_o" },
  { name: "Lebanese", count: 76, slug: "lebanese", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuE3_q_w_e_r_t_y_u_i_o_p_a_s_d_f_g_h_j_k_l_z_x_c_v_b_n" },
];

export function CategoryGrid() {
  return (
    <section className="py-32 lg:py-48 px-6 lg:px-16 bg-slate-50 relative overflow-hidden">
      <div className="max-w-[1920px] mx-auto space-y-20 relative z-10">
        <header className="flex flex-col lg:flex-row justify-between items-end gap-12 pb-16 border-b border-slate-200">
           <div className="space-y-6">
              <div className="flex items-center gap-4">
                 <span className="text-secondary font-body text-[10px] font-black uppercase tracking-[0.6em] block">Taste Archetypes</span>
                 <div className="w-8 h-1 bg-primary"></div>
              </div>
              <h2 className="text-6xl md:text-8xl font-headline font-black italic tracking-tighter leading-none text-on-surface">The <br /><span className="text-zinc-300">Cuisines.</span></h2>
              <p className="text-xl text-slate-500 font-body italic leading-relaxed max-w-2xl">
                 Explore Dubai&apos;s culinary landscape through the lens of global heritage. From Michelin-star Italian to avant-garde Japanese.
              </p>
           </div>
           <Link href="/cuisines" className="text-[10px] font-black uppercase tracking-[0.4em] text-primary border-b-2 border-primary/20 pb-2 hover:border-primary transition-all font-body">View All Heritage Categories</Link>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
           {CUISINES.map((cuisine) => (
             <Link key={cuisine.slug} href={`/cuisines/${cuisine.slug}`} className="group relative aspect-[3/4] lg:aspect-square rounded-[3rem] lg:rounded-[4rem] overflow-hidden shadow-2xl hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.2)] transition-all duration-700">
                <Image 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2Vov6_iK_6_T_i_X_l_m_n_o_p_q_r_s_t_u_v_w_x_y_z_1_2_3_4_5_6_7_8_9_0" 
                  alt={cuisine.name}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-900/20 to-transparent group-hover:via-transparent transition-all"></div>
                <div className="absolute bottom-12 left-12 right-12 text-white space-y-2 translate-y-4 group-hover:translate-y-0 transition-transform">
                   <h3 className="text-4xl lg:text-5xl font-headline font-black italic tracking-tighter">{cuisine.name}.</h3>
                   <div className="flex items-center gap-3">
                      <div className="w-6 h-px bg-primary"></div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-secondary group-hover:text-white transition-colors">{cuisine.count} Destinations</span>
                   </div>
                </div>
             </Link>
           ))}
        </div>
      </div>
    </section>
  );
}
