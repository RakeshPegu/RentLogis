import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

export default function EquipmentNotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-[#fafaf8] text-[#14161a]">
      <SiteHeader />

      <main className="flex-1 flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xs bg-amber-50 border border-amber-200 text-xs font-bold text-amber-800 uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-amber-600" />
            <span>Fleet Registry Notice</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-950 tracking-tight">
            Equipment Unit Not Found
          </h1>

          <p className="text-sm text-stone-600 leading-relaxed">
            The requested machinery unit could not be located in our active fleet catalogue. 
            The unit may have been reassigned, decommissioned, or the requested URL may contain a typo.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/equipment"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-md transition-colors"
            >
              <span>Browse Fleet Catalogue</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>

            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-md transition-colors"
            >
              Return to Homepage
            </Link>
          </div>

          <div className="pt-6 border-t border-stone-200 text-xs text-stone-500">
            Need urgent assistance? Call our Central Yard dispatch team directly at{" "}
            <a href="tel:18005557368" className="font-bold text-stone-900 hover:text-amber-600">
              (800) 555-RENT
            </a>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

