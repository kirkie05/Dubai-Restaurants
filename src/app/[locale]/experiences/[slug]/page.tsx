import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RestaurantCard } from "@/components/ui/RestaurantCard";
import { getTranslations } from 'next-intl/server';
import { Reveal } from "@/components/ui/Reveal";

// Mock data generator for cuisines
const getRestaurantsForCuisine = (slug: string) => {
  return [
    { 
      id: 1, 
      name: `${slug.charAt(0).toUpperCase() + slug.slice(1)} Atelier`, 
      location: "Downtown Dubai", 
      cuisine: slug.toUpperCase(), 
      price: "AED 450+",
      rating: "4.8", 
      description: "An avant-garde interpretation of culinary heritage in the heart of the city.",
      image: "/al_mahara_restaurant_1776785631205.png",
      slug: slug + "-atelier"
    },
    { 
      id: 2, 
      name: `The ${slug.charAt(0).toUpperCase() + slug.slice(1)} House`, 
      location: "Dubai Marina", 
      cuisine: slug.toUpperCase(), 
      price: "AED 300+",
      rating: "4.6", 
      description: "Coastal views and authentic flavors defining the neighborhood narrative.",
      image: "/ossiano_restaurant_1776785646414.png",
      slug: slug + "-house"
    },
    { 
      id: 3, 
      name: `Nexus ${slug.charAt(0).toUpperCase() + slug.slice(1)}`, 
      location: "DIFC", 
      cuisine: slug.toUpperCase(), 
      price: "AED 600+",
      rating: "4.9", 
      description: "Architectural dining at the intersection of commerce and culinary art.",
      image: "/deans_cheesecake_1776785663897.png",
      slug: "nexus-" + slug
    },
    { 
      id: 4, 
      name: `Heritage ${slug.charAt(0).toUpperCase() + slug.slice(1)}`, 
      location: "JBR", 
      cuisine: slug.toUpperCase(), 
      price: "AED 250+",
      rating: "4.7", 
      description: "Honoring traditional techniques with a contemporary seaside atmosphere.",
      image: "/primos_pizza_restaurant_1776785706161.png",
      slug: "heritage-" + slug
    },
    { 
      id: 5, 
      name: `Royal ${slug.charAt(0).toUpperCase() + slug.slice(1)}`, 
      location: "Palm Jumeirah", 
      cuisine: slug.toUpperCase(), 
      price: "AED 850+",
      rating: "4.5", 
      description: "Opulent settings and majestic menus on the iconic archipelago.",
      image: "/tijuana_flare_restaurant_1776785691604.png",
      slug: "royal-" + slug
    },
    { 
      id: 6, 
      name: `Skyline ${slug.charAt(0).toUpperCase() + slug.slice(1)}`, 
      location: "Business Bay", 
      cuisine: slug.toUpperCase(), 
      price: "AED 400+",
      rating: "4.4", 
      description: "Panoramic vistas paired with bold, innovative gastronomy.",
      image: "/al_mahara_restaurant_1776785631205.png",
      slug: "skyline-" + slug
    },
  ];
};

export default async function CuisineDetailPage({ 
  params 
}: { 
  params: Promise<{ slug: string, locale: string }> 
}) {
  const { slug, locale } = await params;
  const t = await getTranslations({ locale, namespace: 'CuisineDetail' });
  const dt = await getTranslations({ locale, namespace: 'Data' });
  
  const cuisineName = dt(`cuisines.${slug}`) || dt(`occasions.${slug}`) || slug;
  const restaurants = getRestaurantsForCuisine(slug);
  
  return (
    <main className="min-h-screen bg-background text-on-surface">
      <Navbar />
      
      <div className="pt-40 lg:pt-56 pb-32 px-6 lg:px-16 max-w-[1920px] mx-auto">
        <Reveal>
          <header className="mb-24 space-y-8">
            <div className="flex items-center gap-6">
              <span className="text-primary font-body text-[10px] font-black uppercase tracking-[0.6em] block">{t('label')}</span>
              <div className="w-12 h-px bg-slate-200"></div>
              <span className="text-secondary font-body text-[10px] font-black uppercase tracking-[0.6em] block">{cuisineName.toUpperCase()}</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-headline font-black italic tracking-tighter leading-tight">
              {t('titlePrefix')} {cuisineName} <br /> <span className="text-primary">{t('collection')}</span>
            </h1>
            <p className="text-xl text-slate-500 font-body italic max-w-2xl leading-relaxed">
              {t('subtitle', { cuisine: cuisineName })}
            </p>
          </header>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {restaurants.map((restaurant, i) => (
            <Reveal key={restaurant.id} className={`stagger-${(i % 3) + 1}`}>
              <RestaurantCard {...restaurant} />
            </Reveal>
          ))}
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
