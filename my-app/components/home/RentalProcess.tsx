import Link from "next/link";

export function RentalProcess() {
  const steps = [
    {
      step: "01",
      title: "Explore Equipment & Specs",
      description:
        "Review machinery specifications, operating capacities, and dimensions to select the right unit for your site requirements.",
      actionLabel: "Browse Fleet",
      actionHref: "/equipment",
    },
    {
      step: "02",
      title: "Submit Rental Requirements",
      description:
        "Provide your project location, estimated delivery date, and hire duration. No immediate payment or credit card required.",
      actionLabel: "Start Enquiry",
      actionHref: "/rental-enquiry",
    },
    {
      step: "03",
      title: "Confirm Availability & Delivery",
      description:
        "Our dispatch team verifies yard readiness, confirms transparent rate terms, and coordinates site delivery directly to your jobsite.",
      actionLabel: "Contact Dispatch",
      actionHref: "tel:18005557368",
    },
  ];

  return (
    <section id="how-it-works" className="py-16 lg:py-24  border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-amber-700 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
            <span>Contractor Workflow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-950 tracking-tight">
            How Renting Works
          </h2>
          <p className="text-sm sm:text-base text-stone-600 mt-2">
            A straightforward commercial hire process designed to keep your site on schedule without unnecessary paperwork delays.
          </p>
        </div>

        {/* 3-Step Process Sequence */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between p-6 rounded-md bg-white border border-stone-300/80 shadow-2xs relative"
            >
              {/* Step Number Accent */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-3xl font-black text-amber-600">
                    {item.step}
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-stone-600 bg-stone-100 px-2 py-0.5 rounded-xs">
                    Phase {idx + 1}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-stone-950 tracking-tight mb-2">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100">
                <Link
                  href={item.actionHref}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-900 hover:text-amber-600 transition-colors"
                >
                  <span>{item.actionLabel}</span>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

