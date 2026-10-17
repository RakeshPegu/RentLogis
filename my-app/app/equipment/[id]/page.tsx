import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllEquipment,
  getEquipmentById,
  getRelatedEquipment,
} from "@/data/equipment";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { EquipmentGallery } from "@/components/equipment/EquipmentGallery";
import { SpecificationTable } from "@/components/equipment/SpecificationTable";
import { RentalRatesCard } from "@/components/equipment/RentalRatesCard";
import { RentalConditionsPanel } from "@/components/equipment/RentalConditionsPanel";
import { EquipmentCard } from "@/components/equipment/EquipmentCard";

interface EquipmentPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const allEquipment = getAllEquipment();
  return allEquipment.map((item) => ({
    id: item.id,
  }));
}

export async function generateMetadata({
  params,
}: EquipmentPageProps): Promise<Metadata> {
  const { id } = await params;
  const equipment = getEquipmentById(id);

  if (!equipment) {
    return {
      title: "Equipment Not Found | RentLogi",
      description: "The requested equipment item was not found in our fleet catalogue.",
    };
  }

  return {
    title: `${equipment.name} Rental | RentLogi Fleet`,
    description: `${equipment.shortDescription} Daily, weekly, and monthly commercial rates available with pre-dispatch inspection.`,
    openGraph: {
      title: `${equipment.name} Rental | RentLogi Fleet`,
      description: equipment.shortDescription,
      images: [
        {
          url: equipment.image.src,
          alt: equipment.image.alt,
        },
      ],
    },
  };
}

export default async function EquipmentDetailPage({
  params,
}: EquipmentPageProps) {
  const { id } = await params;
  const equipment = getEquipmentById(id);

  if (!equipment) {
    notFound();
  }

  const relatedEquipment = getRelatedEquipment(equipment.id, 3);

  return (
    <div className="flex flex-col min-h-screen bg-[#fafaf8] text-[#14161a]">
      {/* 1. Public Site Header */}
      <SiteHeader />

      <main className="flex-1">
        {/* 2. Breadcrumb Navigation */}
        <div className="bg-white border-b border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2 text-xs text-stone-500 overflow-x-auto whitespace-nowrap">
                <li>
                  <Link href="/" className="hover:text-stone-900 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <span className="text-stone-300">/</span>
                </li>
                <li>
                  <Link href="/equipment" className="hover:text-stone-900 transition-colors">
                    Equipment
                  </Link>
                </li>
                <li>
                  <span className="text-stone-300">/</span>
                </li>
                <li>
                  <Link
                    href={`/equipment?category=${equipment.categorySlug}`}
                    className="hover:text-stone-900 transition-colors"
                  >
                    {equipment.category}
                  </Link>
                </li>
                <li>
                  <span className="text-stone-300">/</span>
                </li>
                <li className="font-semibold text-stone-900 truncate" aria-current="page">
                  {equipment.name}
                </li>
              </ol>
            </nav>
          </div>
        </div>

        {/* 3. Main Equipment Overview Section */}
        <section className="py-8 sm:py-12 border-b border-stone-200 bg-[#fafaf8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              
              {/* Left Column: Gallery & Highlights */}
              <div className="lg:col-span-7 space-y-6">
                <EquipmentGallery
                  primaryImage={equipment.image}
                  galleryImages={equipment.galleryImages}
                  equipmentName={equipment.name}
                />

                {/* Key Spec Highlights Chips */}
                <div className="bg-white rounded-md border border-stone-300 p-4 shadow-2xs">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-3">
                    Key Performance Metrics
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {equipment.specs.map((spec, idx) => (
                      <div key={idx} className="p-2.5 rounded-xs bg-stone-50 border border-stone-200/80">
                        <span className="text-[10px] text-stone-500 block truncate font-medium">
                          {spec.label}
                        </span>
                        <span className="text-sm font-bold text-stone-950 block truncate mt-0.5">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Title, Details, & Rental Rates Card */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Link
                      href={`/equipment?category=${equipment.categorySlug}`}
                      className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 hover:bg-amber-100 px-2.5 py-1 rounded-xs border border-amber-200/80 transition-colors"
                    >
                      {equipment.category}
                    </Link>
                    <span className="text-xs font-mono text-stone-500">
                      REF: {equipment.id.toUpperCase()}
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-950 tracking-tight leading-tight">
                    {equipment.name}
                  </h1>

                  <p className="text-xs font-mono text-stone-600 mt-1 uppercase tracking-wider">
                    {equipment.model}
                  </p>

                  <p className="text-sm text-stone-600 mt-3 leading-relaxed">
                    {equipment.shortDescription}
                  </p>
                </div>

                {/* Commercial Rental Rates & Enquiry Card */}
                <RentalRatesCard equipment={equipment} />
              </div>

            </div>
          </div>
        </section>

        {/* 4. Description & Applications Section */}
        <section className="py-12 sm:py-16 bg-white border-b border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700 block mb-1">
                Equipment Profile
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-950 tracking-tight">
                Overview & Typical Applications
              </h2>
              <p className="text-sm sm:text-base text-stone-600 mt-3 leading-relaxed">
                {equipment.fullDescription || equipment.shortDescription}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Typical Applications */}
              {equipment.applications && equipment.applications.length > 0 && (
                <div className="bg-stone-50 rounded-md border border-stone-200 p-5 space-y-3">
                  <div className="flex items-center gap-2 text-stone-900 font-bold text-sm uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-amber-600" />
                    <h3>Typical Applications</h3>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-stone-600">
                    {equipment.applications.map((app, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        <span>{app}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Suitable Projects */}
              {equipment.suitableProjects && equipment.suitableProjects.length > 0 && (
                <div className="bg-stone-50 rounded-md border border-stone-200 p-5 space-y-3">
                  <div className="flex items-center gap-2 text-stone-900 font-bold text-sm uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-amber-600" />
                    <h3>Target Project Types</h3>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-stone-600">
                    {equipment.suitableProjects.map((proj, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        <span>{proj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Operational Considerations */}
              {equipment.operationalNotes && equipment.operationalNotes.length > 0 && (
                <div className="bg-stone-50 rounded-md border border-stone-200 p-5 space-y-3">
                  <div className="flex items-center gap-2 text-stone-900 font-bold text-sm uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-amber-600" />
                    <h3>Site Logistics & Access</h3>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-stone-600">
                    {equipment.operationalNotes.map((note, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                        </svg>
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 5. Technical Specifications Section */}
        {equipment.technicalSpecifications && equipment.technicalSpecifications.length > 0 && (
          <section className="py-12 sm:py-16 bg-[#fafaf8] border-b border-stone-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <SpecificationTable
                groups={equipment.technicalSpecifications}
                equipmentName={equipment.name}
              />
            </div>
          </section>
        )}

        {/* 6. Rental Rates & Conditions Section */}
        {equipment.rentalConditions && (
          <section className="py-12 bg-white sm:py-16  border-b border-stone-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <RentalConditionsPanel conditions={equipment.rentalConditions} />
            </div>
          </section>
        )}

        {/* 7. Conversion CTA Banner */}
        <section className="bg-stone-900 text-white py-12 border-b border-stone-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-500 block mb-1">
                  Ready to Reserve
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Need this unit for an upcoming job?
                </h3>
                <p className="text-sm text-stone-400 mt-1">
                  Enquire online now or call our yard dispatch team to schedule site delivery.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                <Link
                  href={equipment.enquiryRoute}
                  className="w-full sm:w-auto text-center px-6 py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm rounded-md shadow-xs transition-colors"
                >
                  Request Quote for This Unit
                </Link>
                <a
                  href="tel:18005557368"
                  className="w-full sm:w-auto text-center px-5 py-3 bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold text-sm rounded-md border border-stone-700 transition-colors"
                >
                  Call Dispatch: (800) 555-RENT
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 8. Related Equipment Section */}
        {relatedEquipment.length > 0 && (
          <section className="py-16 bg-stone-100/60 border-b border-stone-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-end justify-between mb-8">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-700 block mb-1">
                    Fleet Complement
                  </span>
                  <h3 className="text-2xl font-extrabold text-stone-950 tracking-tight">
                    You May Also Need
                  </h3>
                </div>
                <Link
                  href="/equipment"
                  className="text-xs sm:text-sm font-bold text-stone-900 hover:text-amber-600 transition-colors"
                >
                  View All Equipment &rarr;
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {relatedEquipment.map((item) => (
                  <EquipmentCard key={item.id} equipment={item} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      {/* 9. Public Site Footer */}
      <SiteFooter />
    </div>
  );
}

