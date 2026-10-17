import Link from "next/link";

export function ClosingCTA() {
  return (
    <section className="relative bg-stone-900 text-stone-100 py-16 lg:py-20 border-b border-stone-800 overflow-hidden">
      
      {/* Subtle industrial grid lines watermark */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-amber-500 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span>Ready for Mobilization</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.12]">
            Find the right equipment for your next project.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-stone-300 leading-relaxed font-normal">
            Speak directly with our rental dispatch specialists to confirm machinery availability, coordinate site transport, and receive a competitive commercial proposal.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-8">
            <Link
              href="/rental-enquiry"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-stone-950 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 rounded-md shadow-xs transition-colors"
            >
              <span>Request a Quote</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>

            <Link
              href="/equipment"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-white bg-stone-800 hover:bg-stone-700 active:bg-stone-850 border border-stone-700 rounded-md transition-colors"
            >
              <span>Browse Equipment</span>
            </Link>
          </div>

          {/* Practical Dispatch Operating Details */}
          <div className="mt-8 pt-6 border-t border-stone-800 flex flex-wrap items-center gap-6 text-xs text-stone-400 font-medium">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Depot Dispatch: Open 6:30 AM – 5:00 PM</span>
            </div>
            <span>·</span>
            <div>Direct Phone: (800) 555-RENT</div>
            <span>·</span>
            <div>Prompt Commercial Email Response</div>
          </div>

        </div>
      </div>
    </section>
  );
}

