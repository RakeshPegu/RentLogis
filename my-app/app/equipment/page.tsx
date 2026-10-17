import type { Metadata } from "next";
import Link from "next/link";
import { EquipmentCatalogueGrid } from "@/components/equipment/EquipmentCatalogueGrid";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { getAllEquipment } from "@/data/equipment";

export const metadata: Metadata = {
  title: "Equipment Catalogue | RentLogi",
  description:
    "Explore construction and industrial equipment in the RentLogi demo catalogue. Enquire to confirm rental availability and pricing.",
};

export const instant = false;

interface EquipmentCataloguePageProps {
  searchParams: Promise<{ category?: string | string[] }>;
}

export default async function EquipmentCataloguePage({
  searchParams,
}: EquipmentCataloguePageProps) {
  const equipment = getAllEquipment();
  const { category } = await searchParams;
  const initialCategory =
    typeof category === "string" &&
    equipment.some((item) => item.categorySlug === category)
      ? category
      : "all";

  return (
    <div className="flex min-h-screen flex-col bg-[#fafaf8] text-[#14161a]">
      <SiteHeader />

      <main className="flex-1">
        <div className="border-b border-stone-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-xs text-stone-600">
                <li>
                  <Link href="/" className="hover:text-stone-950">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="font-semibold text-stone-900" aria-current="page">
                  Equipment
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <section className="border-b border-stone-200">
          <div className="mx-auto max-w-7xl px-4 pb-7 pt-8 sm:px-6 sm:pb-9 sm:pt-10 lg:px-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-800">
              RentLogi Equipment Catalogue
            </p>
            <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <h1 className="max-w-2xl text-3xl font-black leading-tight tracking-tight text-stone-950 sm:text-4xl">
                Find the right equipment for your project.
              </h1>
              <p className="max-w-xl text-sm leading-relaxed text-stone-600 sm:text-base md:max-w-md">
                Explore construction and industrial machinery, then enquire to
                confirm rental availability and pricing for your job.
              </p>
            </div>
          </div>
        </section>

        <section
          className="mx-auto max-w-7xl px-4 py-7 sm:px-6 sm:py-9 lg:px-8"
          aria-label="Equipment catalogue"
        >
          <EquipmentCatalogueGrid
            initialEquipment={equipment}
            initialCategory={initialCategory}
          />
        </section>

        <section className="border-t border-stone-800 bg-stone-950 text-white">
          <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
            <div>
              <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
                Looking for something not listed?
              </h2>
              <p className="mt-1 max-w-2xl text-sm leading-relaxed text-stone-300">
                Send your project requirements and ask the rental team about
                suitable equipment options.
              </p>
            </div>
            <Link
              href="/rental-enquiry"
              className="inline-flex min-h-11 shrink-0 items-center justify-center bg-amber-500 px-5 py-2.5 text-sm font-semibold text-stone-950 transition-colors hover:bg-amber-400"
            >
              Request a Quote
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
