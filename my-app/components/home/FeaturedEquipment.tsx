import Link from "next/link";
import { featuredEquipment } from "@/data/equipment";
import { EquipmentCard } from "@/components/equipment/EquipmentCard";

export function FeaturedEquipment() {
  return (
    <section id="featured-equipment" className="py-16 lg:py-24 bg-stone-100/60 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 lg:mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-amber-700 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
              <span>Available For Dispatch</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-950 tracking-tight">
              Featured Fleet Units
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/equipment"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-stone-900 hover:text-amber-600 transition-colors group"
            >
              <span>View Full Fleet Catalogue</span>
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Equipment Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredEquipment.map((equipment) => (
            <EquipmentCard key={equipment.id} equipment={equipment} />
          ))}
        </div>

        {/* Demo Pricing Clarification Note */}
        <div className="mt-8 p-4 rounded-md bg-stone-200/50 border border-stone-300/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-stone-600">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-stone-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>
            <span>
              Rates shown are illustrative demo rates for presentation purposes. Actual commercial hire rates depend on project duration, machine attachments, and site transport requirements.
            </span>
          </div>

          <Link
            href="/rental-enquiry"
            className="shrink-0 font-bold text-stone-900 hover:text-amber-600 underline underline-offset-2"
          >
            Get Project Quote &rarr;
          </Link>
        </div>

      </div>
    </section>
  );
}

