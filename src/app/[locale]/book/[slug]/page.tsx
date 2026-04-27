import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getRestaurantBySlug } from "@/lib/db";
import { notFound } from "next/navigation";
import { BookingForm } from "@/components/ui/BookingForm";

export default async function BookingPage({ 
  params 
}: { 
  params: Promise<{ slug: string, locale: string }> 
}) {
  const { slug, locale } = await params;
  
  let restaurant;
  try {
    restaurant = await getRestaurantBySlug(slug);
  } catch (error) {
    console.error(`Error fetching restaurant for booking (${slug}):`, error);
  }

  if (!restaurant) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 px-8 lg:px-16 max-w-[1920px] mx-auto w-full">
         <div className="mb-20">
            <span className="text-primary font-body text-[10px] font-black uppercase tracking-[0.4em] block mb-6">Secure Your Presence</span>
            <h1 className="text-6xl md:text-9xl font-headline font-black italic tracking-tighter leading-none text-on-surface">
               The <br /><span className="text-zinc-400">Reservation.</span>
            </h1>
         </div>

         <BookingForm restaurant={restaurant} locale={locale} />
      </main>
      
      <Footer />
    </div>
  );
}
