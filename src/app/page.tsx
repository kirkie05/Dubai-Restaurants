import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { TrendingCarousel } from "@/components/home/TrendingCarousel";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { RestaurantList } from "@/components/home/RestaurantList";
import { ChefGrid } from "@/components/home/ChefGrid";
import { CityMapSection } from "@/components/home/CityMapSection";
import { BlogPreview } from "@/components/home/BlogPreview";
import { TestimonialSlider } from "@/components/home/TestimonialSlider";
import { AppDownload } from "@/components/home/AppDownload";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      
      <main className="flex-grow">
        <HeroSection />
        
        {/* Featured Selection: Trending Carousel */}
        <div className="relative -mt-20 z-20 pb-40 px-6 lg:px-16">
          <div className="max-w-[1920px] mx-auto">
             <div className="space-y-6 mb-16 border-l-4 border-primary pl-8">
                <span className="text-secondary font-body text-[10px] font-black uppercase tracking-[0.4em] block">Curation Pulse</span>
                <h2 className="text-5xl md:text-7xl font-headline font-black italic tracking-tighter text-on-surface">Top Trending <br /><span className="text-zinc-300">Discovery.</span></h2>
             </div>
             <TrendingCarousel />
          </div>
        </div>

        {/* Slanted Divider 01 */}
        <div className="h-24 bg-slate-50 -skew-y-2 origin-left scale-110 mb-[-1px]"></div>
        
        <CategoryGrid />
        
        {/* Slanted Divider 02 (To Dark) */}
        <div className="h-24 bg-zinc-950 -skew-y-2 origin-right scale-110 mb-[-1px]"></div>
        
        <RestaurantList />

        {/* Slanted Divider 03 (To Light) */}
        <div className="h-24 bg-white skew-y-2 origin-left scale-110 mb-[-1px]"></div>

        <ChefGrid />

        {/* Slanted Divider 04 (To Dark/Map) */}
        <div className="h-24 bg-zinc-900 -skew-y-2 origin-right scale-110 mb-[-1px]"></div>

        <CityMapSection />

        {/* Global Journal & Community */}
        <div className="bg-white py-40 border-t border-slate-100">
          <BlogPreview />
        </div>
        
        <div className="bg-slate-50 py-40 border-t border-slate-100 relative overflow-hidden">
          {/* Subtle UAE Flag Accent in Background */}
          <div className="absolute top-0 right-0 w-1/4 h-full opacity-5 pointer-events-none">
             <div className="h-full w-full flex">
                <div className="flex-1 bg-primary"></div>
                <div className="flex-1 bg-secondary"></div>
                <div className="flex-1 bg-white"></div>
             </div>
          </div>
          <TestimonialSlider />
        </div>

        <AppDownload />
      </main>
      
      <Footer />
    </div>
  );
}
