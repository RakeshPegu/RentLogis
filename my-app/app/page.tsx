import { SiteHeader } from "@/components/layout/SiteHeader";
import { HeroSection } from "@/components/home/HeroSection";
import { TrustStrip } from "@/components/home/TrustStrip";
import { EquipmentCategories } from "@/components/home/EquipmentCategories";
import { FeaturedEquipment } from "@/components/home/FeaturedEquipment";
import { RentalProcess } from "@/components/home/RentalProcess";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { SiteFooter } from "@/components/layout/SiteFooter";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#fafaf8] text-[#14161a]">
      {/* 1. Public Site Header & Navigation */}
      <SiteHeader />

      <main className="flex-1">
        {/* 2. Hero Section */}
        <HeroSection />

        {/* 3. Business Trust Strip */}
        <TrustStrip />

        {/* 4. Equipment Categories */}
        <EquipmentCategories />

        {/* 5. Featured Equipment */}
        <FeaturedEquipment />

        {/* 6. How Renting Works */}
        <RentalProcess />

        {/* 7. Closing Call To Action */}
        <ClosingCTA />
      </main>

      {/* 8. Public Site Footer */}
      <SiteFooter />
    </div>
  );
}
