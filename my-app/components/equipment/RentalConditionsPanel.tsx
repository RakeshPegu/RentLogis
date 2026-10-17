import { RentalConditions } from "@/types/equipment";

interface RentalConditionsPanelProps {
  conditions: RentalConditions;
}

export function RentalConditionsPanel({ conditions }: RentalConditionsPanelProps) {
  if (!conditions) return null;

  const items = [
    {
      title: "Site Delivery & Collection",
      content: conditions.deliveryOptions,
      icon: (
        <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.25V3.75a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 3.75v10.5h14.25z" />
        </svg>
      ),
    },
    {
      title: "Operator Requirements",
      content: conditions.operatorType,
      icon: (
        <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      ),
    },
    {
      title: "Fuel & Power Policy",
      content: conditions.fuelPolicy,
      icon: (
        <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "Maintenance & Inspection Included",
      content: conditions.maintenanceIncluded,
      icon: (
        <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-md border border-stone-300 p-5 sm:p-6 shadow-xs space-y-5">
      <div className="border-b border-stone-200 pb-3">
        <h3 className="text-xl font-bold text-stone-950 tracking-tight">
          Rental Terms & Conditions
        </h3>
        <p className="text-xs sm:text-sm text-stone-600 mt-1">
          Standard operational criteria and commercial hire policies for this unit.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3 p-3.5 rounded-xs bg-stone-50 border border-stone-200/90"
          >
            <div className="p-2 rounded-xs bg-amber-50 border border-amber-200/70 shrink-0 mt-0.5">
              {item.icon}
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                {item.title}
              </h4>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                {item.content}
              </p>
            </div>
          </div>
        ))}
      </div>

      {conditions.depositTerms && (
        <div className="p-3 bg-stone-100 rounded-xs border border-stone-200 text-xs text-stone-600 flex items-center justify-between">
          <span className="font-semibold text-stone-700">Account & Billing:</span>
          <span>{conditions.depositTerms}</span>
        </div>
      )}
    </div>
  );
}

