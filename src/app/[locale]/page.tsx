import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { TrendingCarousel } from "@/components/home/TrendingCarousel";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { RestaurantList } from "@/components/home/RestaurantList";
import { RestaurantGrid } from "@/components/home/RestaurantGrid";
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
        <div className="relative z-30">
          <HeroSection />
        </div>
        
        <div className="relative z-20">
          <TrendingCarousel />
        </div>

        {/* Slanted Divider 01 */}
        <div className="h-12 bg-slate-50 -skew-y-2 origin-left scale-110 mb-[-1px] relative z-20"></div>
        
        <div className="relative z-10">
          <CategoryGrid />
        </div>
        
        {/* Slanted Divider 02 (To Dark) */}
        <div className="h-12 bg-zinc-950 -skew-y-2 origin-right scale-110 mb-[-1px] relative z-10"></div>
        
        <div className="relative z-0">
          <RestaurantList />
        </div>

        {/* Simple Grid Transition */}
        <div className="relative z-0">
          <RestaurantGrid />
        </div>

        {/* Slanted Divider 03 (To Light) */}
        <div className="h-12 bg-white skew-y-2 origin-left scale-110 mb-[-1px] relative z-0"></div>

        <div className="relative z-0">
          <ChefGrid />
        </div>

        {/* Slanted Divider 04 (To Dark/Map) */}
        <div className="h-12 bg-zinc-900 -skew-y-2 origin-right scale-110 mb-[-1px] relative z-0"></div>

        <div className="relative z-0">
          <CityMapSection />
        </div>

        {/* Global Journal & Community */}
        <div className="bg-white py-24 border-t border-slate-100">
          <BlogPreview />
        </div>
        
        <div className="bg-slate-50 py-24 border-t border-slate-100 relative overflow-hidden">
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
