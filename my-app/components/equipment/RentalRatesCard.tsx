import Link from "next/link";
import { EquipmentItem } from "@/types/equipment";

interface RentalRatesCardProps {
  equipment: EquipmentItem;
}

export function RentalRatesCard({ equipment }: RentalRatesCardProps) {
  return (
    <div className="bg-white rounded-md border border-stone-300 p-5 sm:p-6 shadow-xs space-y-5">
      
      {/* Availability Status & Lead Time */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-200">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
            {equipment.availability.label}
          </span>
        </div>
        {equipment.availability.leadTime && (
          <span className="text-[11px] text-stone-500 font-medium">
            {equipment.availability.leadTime}
          </span>
        )}
      </div>

      {/* Pricing Tiers Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
            Rental Duration
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
            Commercial Demo Rate
          </span>
        </div>

        <div className="space-y-2 text-sm">
          {/* Daily Rate */}
          <div className="flex items-center justify-between p-2.5 rounded-xs bg-stone-50 border border-stone-200/90 font-medium">
            <span className="text-stone-700">Daily Rate (24h)</span>
            <div className="text-right">
              <span className="text-lg font-black text-stone-950">
                {equipment.currency}{equipment.dailyRate}
              </span>
              <span className="text-xs text-stone-500 ml-1">/ day</span>
            </div>
          </div>

          {/* Weekly Rate */}
          {equipment.weeklyRate && (
            <div className="flex items-center justify-between p-2.5 rounded-xs bg-stone-50 border border-stone-200/90 font-medium">
              <span className="text-stone-700">Weekly Rate (5–7 days)</span>
              <div className="text-right">
                <span className="text-lg font-black text-stone-950">
                  {equipment.currency}{equipment.weeklyRate}
                </span>
                <span className="text-xs text-stone-500 ml-1">/ week</span>
              </div>
            </div>
          )}

          {/* Monthly Rate */}
          {equipment.monthlyRate && (
            <div className="flex items-center justify-between p-2.5 rounded-xs bg-stone-50 border border-stone-200/90 font-medium">
              <span className="text-stone-700">Monthly Rate (28 days)</span>
              <div className="text-right">
                <span className="text-lg font-black text-stone-950">
                  {equipment.currency}{equipment.monthlyRate}
                </span>
                <span className="text-xs text-stone-500 ml-1">/ month</span>
              </div>
            </div>
          )}
        </div>

        {equipment.minRentalPeriod && (
          <div className="text-right text-[11px] text-stone-500">
            <span>Minimum Term: </span>
            <span className="font-semibold text-stone-700">{equipment.minRentalPeriod}</span>
          </div>
        )}
      </div>

      {/* Primary & Secondary Actions */}
      <div className="pt-2 space-y-2.5">
        <Link
          href={equipment.enquiryRoute}
          className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm sm:text-base font-bold text-white bg-amber-600 hover:bg-amber-500 active:bg-amber-700 rounded-md shadow-xs transition-colors"
        >
          <span>Enquire About This Equipment</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <Link
            href="/equipment"
            className="inline-flex items-center justify-center py-2.5 px-3 rounded-xs border border-stone-300 font-semibold text-stone-700 hover:text-stone-950 hover:bg-stone-50 transition-colors"
          >
            &larr; Browse Equipment
          </Link>

          <a
            href="tel:18005557368"
            className="inline-flex items-center justify-center py-2.5 px-3 rounded-xs border border-stone-300 font-semibold text-stone-700 hover:text-stone-950 hover:bg-stone-50 transition-colors gap-1.5"
          >
            <svg className="w-3.5 h-3.5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            <span>Call Dispatch</span>
          </a>
        </div>
      </div>

      {/* Rate Disclaimer & Dispatch Notice */}
      <div className="pt-3 border-t border-stone-200 text-[11px] text-stone-500 leading-relaxed space-y-1">
        <p>
          <strong className="text-stone-700 font-semibold">Illustrative Demo Rates:</strong> Commercial pricing excludes applicable local taxes, optional insurance waiver, and site mobilization transport.
        </p>
        <p>
          Final unit availability and tailored commercial terms confirmed by RentLogi dispatch within 2 business hours.
        </p>
      </div>

    </div>
  );
}

