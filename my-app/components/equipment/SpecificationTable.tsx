import { SpecGroup } from "@/types/equipment";

interface SpecificationTableProps {
  groups: SpecGroup[];
  equipmentName: string;
}

export function SpecificationTable({ groups, equipmentName }: SpecificationTableProps) {
  if (!groups || groups.length === 0) return null;

  return (
    <div className="bg-white rounded-md border border-stone-300 overflow-hidden shadow-xs">
      <div className="p-4 sm:p-6 border-b border-stone-200 bg-stone-50/70">
        <h3 className="text-xl font-bold text-stone-950 tracking-tight">
          Technical Specifications
        </h3>
        <p className="text-xs sm:text-sm text-stone-600 mt-1">
          Manufacturer specifications and standard operating dimensions for {equipmentName}.
        </p>
      </div>

      <div className="divide-y divide-stone-200">
        {groups.map((group, groupIdx) => (
          <div key={groupIdx} className="p-4 sm:p-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-3">
              {group.group}
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2.5">
              {group.items.map((item, itemIdx) => (
                <div
                  key={itemIdx}
                  className="flex items-baseline justify-between py-1.5 border-b border-stone-100 text-xs sm:text-sm"
                >
                  <span className="text-stone-600 font-medium pr-2">
                    {item.label}
                  </span>
                  <span className="text-stone-950 font-bold text-right font-mono sm:font-sans">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-stone-100/70 border-t border-stone-200 text-xs text-stone-500 flex items-center gap-2">
        <svg className="w-4 h-4 text-stone-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
        </svg>
        <span>
          Illustrative demo specifications. Equipment configurations, bucket sizes, and optional counterweights may vary based on specific yard stock.
        </span>
      </div>
    </div>
  );
}

