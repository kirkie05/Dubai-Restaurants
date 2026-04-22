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

import { getCuisines, getFeaturedRestaurants, getRestaurants } from "@/lib/db";

export default async function Home() {
  const cuisines = await getCuisines();
  const featured = await getFeaturedRestaurants();
  const allRestaurants = await getRestaurants();
  
  // Map Supabase data to component structure
  const cuisineItems = cuisines.slice(0, 4).map(c => ({
    name: c.name,
    slug: c.slug,
    image: c.image_url,
    count: 0 // We'll implement count aggregation later if needed
  }));

  const featuredItems = featured.map(res => ({
    slug: res.slug,
    name: res.name,
    location: res.location,
    cuisine: res.cuisines?.name || 'Various',
    rating: res.rating.toString(),
    image: res.image_url,
    description: res.description
  }));

  const gridItems = allRestaurants.slice(0, 6).map(res => ({
    slug: res.slug,
    name: res.name,
    location: res.location,
    cuisine: res.cuisines?.name || 'Various',
    rating: res.rating.toString(),
    image: res.image_url
  }));

  const heroSuggestions = allRestaurants.map(res => ({
    id: res.id,
    name: res.name,
    type: 'Restaurant',
    area: res.location
  }));

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      
      <main className="flex-grow">
        <div className="relative z-30">
          <HeroSection initialSuggestions={heroSuggestions} />
        </div>
        
        <div className="relative z-20">
          <TrendingCarousel />
        </div>

        {/* Slanted Divider 01 */}
        <div className="h-12 bg-slate-50 -skew-y-2 origin-left scale-110 mb-[-1px] relative z-20"></div>
        
        <div className="relative z-10">
          <CategoryGrid cuisines={cuisineItems} />
        </div>
        
        {/* Slanted Divider 02 (To Dark) */}
        <div className="h-12 bg-zinc-950 -skew-y-2 origin-right scale-110 mb-[-1px] relative z-10"></div>
        
        <div className="relative z-0">
          <RestaurantList items={featuredItems} />
        </div>

        {/* Simple Grid Transition */}
        <div className="relative z-0">
          <RestaurantGrid items={gridItems} />
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
