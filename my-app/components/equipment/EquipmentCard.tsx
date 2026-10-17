import Image from "next/image";
import Link from "next/link";
import { AvailabilityStatus, EquipmentItem } from "@/types/equipment";

const availabilityLabels: Record<AvailabilityStatus, string> = {
  available: "Available · demo",
  limited: "Limited availability · demo",
  reserved: "Currently unavailable · demo",
};

const availabilityStyles: Record<AvailabilityStatus, string> = {
  available: "bg-emerald-800/95 text-white",
  limited: "bg-amber-700/95 text-white",
  reserved: "bg-stone-800/95 text-white",
};

interface EquipmentCardProps {
  equipment: EquipmentItem;
}

export function EquipmentCard({ equipment }: EquipmentCardProps) {
  return (
    <article className="flex flex-col bg-white border border-stone-300 rounded-md overflow-hidden shadow-xs hover:border-stone-400 transition-colors">
      
      {/* Equipment Image Container */}
      <div className="relative aspect-4/3 w-full bg-stone-100 overflow-hidden border-b border-stone-200 group">
        <Image
          src={equipment.image.src}
          alt={equipment.image.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover object-center group-hover:scale-102 transition-transform duration-300"
        />

        {/* Category Pill */}
        <div className="absolute top-0 left-3">
          <span className="text-[10px] font-bold uppercase tracking-wider bg-stone-900/90 text-stone-100 px-2.5 py-1 rounded-xs backdrop-blur-xs">
            {equipment.category}
          </span>
        </div>

        {/* Availability Status Badge */}
        <div className="absolute top-6 left-3">
          <span
            className={`inline-flex items-center text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-xs backdrop-blur-xs ${availabilityStyles[equipment.availability.status]}`}
          >
            {availabilityLabels[equipment.availability.status]}
          </span>
        </div>
      </div>

      {/* Equipment Details */}
      <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
        
        <div>
          <span className="text-xs font-mono text-stone-600 block uppercase tracking-wider">
            {equipment.model}
          </span>
          <h3 className="text-lg font-bold text-stone-950 tracking-tight mt-1 hover:text-amber-600 transition-colors">
            <Link href={equipment.detailRoute}>
              {equipment.name}
            </Link>
          </h3>
          <p className="text-xs text-stone-600 mt-2 line-clamp-2 leading-relaxed">
            {equipment.shortDescription}
          </p>
        </div>

        {/* Specifications Matrix */}
        <div className="bg-stone-50 rounded-xs p-3 border border-stone-200/80">
          <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-xs">
            {equipment.specs.map((spec, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-[10px] text-stone-600 font-medium truncate">
                  {spec.label}
                </span>
                <span className="font-bold text-stone-900 truncate">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing & Actions */}
        <div className="pt-2 border-t border-stone-200 space-y-3">
          
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-2xl font-black text-stone-950 tracking-tight">
                {equipment.currency}{equipment.dailyRate}
              </span>
              <span className="text-xs text-stone-600 font-medium ml-1">
                / {equipment.ratePeriod}
              </span>
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded-xs border border-amber-200/60">
              Demo Rate
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link
              href={equipment.detailRoute}
              className="inline-flex items-center justify-center text-xs font-semibold py-2 px-3 rounded-xs border border-stone-300 text-stone-800 bg-stone-50 hover:bg-stone-100 transition-colors"
            >
              View Details
            </Link>
            
            <Link
              href={equipment.enquiryRoute}
              className="inline-flex items-center justify-center text-xs font-semibold py-2 px-3 rounded-xs bg-amber-600 hover:bg-amber-500 text-white shadow-2xs transition-colors"
            >
              Request Quote
            </Link>
          </div>

        </div>

      </div>

    </article>
  );
}
