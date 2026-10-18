
import {
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Truck,
  Wrench,
} from "lucide-react";

type EquipmentItem = {
  id: number;
  name: string;
  category: string;
  total: number;
  available: number;
  leased: number;
  leasedCompany: string;
  leaseStart: string;
  leaseEnd: string;
  unavailableReason: string;
};

const equipmentData: EquipmentItem[] = [
  {
    id: 1,
    name: "Mini Excavator",
    category: "Excavation",
    total: 12,
    available: 5,
    leased: 6,
    leasedCompany: "NorthBuild Constructions",
    leaseStart: "12 Oct 2026",
    leaseEnd: "26 Oct 2026",
    unavailableReason: "1 unit under maintenance",
  },
  {
    id: 2,
    name: "JCB Backhoe Loader",
    category: "Earthmoving",
    total: 10,
    available: 3,
    leased: 6,
    leasedCompany: "Apex Infrastructure",
    leaseStart: "15 Oct 2026",
    leaseEnd: "30 Oct 2026",
    unavailableReason: "1 unit awaiting inspection",
  },
  {
    id: 3,
    name: "Hydraulic Crawler Crane",
    category: "Lifting",
    total: 6,
    available: 2,
    leased: 4,
    leasedCompany: "Metro Projects Ltd.",
    leaseStart: "10 Oct 2026",
    leaseEnd: "10 Nov 2026",
    unavailableReason: "None",
  },
  {
    id: 4,
    name: "Dump Truck",
    category: "Transportation",
    total: 18,
    available: 11,
    leased: 5,
    leasedCompany: "Greenfield Developers",
    leaseStart: "16 Oct 2026",
    leaseEnd: "23 Oct 2026",
    unavailableReason: "2 units under maintenance",
  },
  {
    id: 5,
    name: "Boom Lift",
    category: "Access Equipment",
    total: 8,
    available: 1,
    leased: 5,
    leasedCompany: "Skyline Engineering",
    leaseStart: "08 Oct 2026",
    leaseEnd: "28 Oct 2026",
    unavailableReason: "2 units awaiting repair",
  },
  {
    id: 6,
    name: "Road Roller",
    category: "Road Construction",
    total: 7,
    available: 4,
    leased: 3,
    leasedCompany: "Prime Roads & Co.",
    leaseStart: "17 Oct 2026",
    leaseEnd: "05 Nov 2026",
    unavailableReason: "None",
  },
];

function getStatus(available: number, total: number) {
  const percentage = total > 0 ? (available / total) * 100 : 0;

  if (available === 0) {
    return {
      label: "Unavailable",
      className: "bg-red-50 text-red-700",
      barClassName: "bg-red-500",
    };
  }

  if (percentage <= 25) {
    return {
      label: "Low availability",
      className: "bg-amber-50 text-amber-700",
      barClassName: "bg-amber-500",
    };
  }

  return {
    label: "Available",
    className: "bg-emerald-50 text-emerald-700",
    barClassName: "bg-emerald-500",
  };
}

function Metric({
  label,
  value,
  valueClass = "text-stone-900",
}: {
  label: string;
  value: number;
  valueClass?: string;
}) {
  return (
    <div className="min-w-0">
      <p className="text-xs text-stone-500">{label}</p>
      <p className={`mt-1 text-xl font-semibold ${valueClass}`}>{value}</p>
    </div>
  );
}

function EquipmentCard({ item }: { item: EquipmentItem }) {
  const status = getStatus(item.available, item.total);
  const unavailable = item.total - item.available - item.leased;
  const availablePercentage =
    item.total > 0 ? (item.available / item.total) * 100 : 0;

  return (
    <article className="min-w-0 rounded-xl border border-stone-200 bg-white transition-colors hover:border-stone-300">
      <div className="space-y-4 p-4 sm:p-5">
        {/* Equipment heading */}
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-stone-100 text-stone-700">
            <Truck className="h-5 w-5" />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="break-words font-semibold text-stone-900">
              {item.name}
            </h3>
            <p className="mt-1 break-words text-sm text-stone-500">
              {item.category}
            </p>
          </div>

          <span
            className={`shrink-0 rounded-full px-2 py-1 text-xs font-medium ${status.className}`}
          >
            {status.label}
          </span>
        </div>

        {/* Inventory figures */}
        <div className="grid grid-cols-3 gap-2 border-y border-stone-100 py-4">
          <Metric label="Total units" value={item.total} />
          <Metric
            label="Available"
            value={item.available}
            valueClass="text-emerald-700"
          />
          <Metric label="Leased" value={item.leased} />
        </div>

        {/* Availability bar */}
        <div>
          <div className="mb-2 flex items-center justify-between gap-2 text-xs">
            <span className="text-stone-500">Fleet availability</span>
            <span className="font-medium text-stone-700">
              {Math.round(availablePercentage)}%
            </span>
          </div>

          <div
            className="h-1.5 w-full overflow-hidden rounded-full bg-stone-100"
            role="progressbar"
            aria-label={`${item.name} availability`}
            aria-valuenow={Math.round(availablePercentage)}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className={`h-full rounded-full ${status.barClassName}`}
              style={{ width: `${availablePercentage}%` }}
            />
          </div>
        </div>

        {/* Unavailable units */}
        <div className="flex items-start gap-2 rounded-lg bg-stone-50 p-3">
          <Wrench className="mt-0.5 h-4 w-4 shrink-0 text-stone-500" />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-stone-600">
              Unavailable units: {unavailable}
            </p>
            <p className="mt-1 break-words text-sm text-stone-700">
              {item.unavailableReason}
            </p>
          </div>
        </div>

        {/* Expandable lease information */}
        <details className="group border-t border-stone-100 pt-3">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 py-1 text-sm font-medium text-stone-700 outline-none hover:text-stone-950 focus-visible:ring-2 focus-visible:ring-stone-400">
            <span>Lease details</span>
            <ChevronDown className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180" />
          </summary>

          <div className="mt-4 space-y-4">
            <div className="flex min-w-0 items-start gap-3">
              <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-stone-400" />
              <div className="min-w-0">
                <p className="text-xs text-stone-500">Leased company</p>
                <p className="mt-1 break-words text-sm font-medium text-stone-800">
                  {item.leasedCompany}
                </p>
              </div>
            </div>

            <div className="flex min-w-0 items-start gap-3">
              <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-stone-400" />
              <div className="min-w-0">
                <p className="text-xs text-stone-500">Lease period</p>
                <p className="mt-1 break-words text-sm text-stone-800">
                  {item.leaseStart} – {item.leaseEnd}
                </p>
              </div>
            </div>

            <div className="flex min-w-0 items-start gap-3">
              <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-stone-400" />
              <div className="min-w-0">
                <p className="text-xs text-stone-500">Lease status</p>
                <p className="mt-1 text-sm text-stone-800">
                  {item.leased > 0
                    ? `${item.leased} units currently leased`
                    : "No units currently leased"}
                </p>
              </div>
            </div>
          </div>
        </details>
      </div>
    </article>
  );
}

export default function Equipment() {
  const totalUnits = equipmentData.reduce((sum, item) => sum + item.total, 0);
  const availableUnits = equipmentData.reduce(
    (sum, item) => sum + item.available,
    0
  );
  const leasedUnits = equipmentData.reduce((sum, item) => sum + item.leased, 0);
  const unavailableUnits = totalUnits - availableUnits - leasedUnits;

  return (
    <main className="box-border w-full min-w-0 max-w-full space-y-6 overflow-x-clip bg-stone-50 p-4 sm:p-6 lg:p-8">
      {/* Page heading */}
      <header className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <p className="text-sm font-medium text-stone-500">
            INVENTORY MANAGEMENT
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">
            Equipment
          </h1>
          <p className="mt-2 text-sm text-stone-600">
            Manage your fleet, availability, and active leases.
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm text-stone-500">
          <CalendarDays className="h-4 w-4 shrink-0" />
          <span>Updated 18 Oct 2026</span>
        </div>
      </header>

      {/* Summary metrics */}
      <section className="grid min-w-0 grid-cols-2 gap-3 xl:grid-cols-4">
        {[
          {
            label: "Total units",
            value: totalUnits,
            icon: Truck,
            color: "text-stone-700",
          },
          {
            label: "Available",
            value: availableUnits,
            icon: CheckCircle2,
            color: "text-emerald-700",
          },
          {
            label: "Leased",
            value: leasedUnits,
            icon: Building2,
            color: "text-stone-700",
          },
          {
            label: "Unavailable",
            value: unavailableUnits,
            icon: Wrench,
            color: "text-amber-700",
          },
        ].map((metric) => {
          const Icon = metric.icon;

          return (
            <div
              key={metric.label}
              className="min-w-0 rounded-xl border border-stone-200 bg-white p-3 sm:p-4"
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs text-stone-500 sm:text-sm">
                  {metric.label}
                </p>
                <Icon
                  className={`h-4 w-4 shrink-0 ${metric.color}`}
                />
              </div>
              <p className="mt-3 text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">
                {metric.value}
              </p>
            </div>
          );
        })}
      </section>

      {/* Equipment listing */}
      <section className="min-w-0">
        <div className="mb-4 flex min-w-0 items-end justify-between gap-3">
          <div className="min-w-0">
            <h2 className="font-semibold text-stone-900">
              Equipment inventory
            </h2>
            <p className="mt-1 text-sm text-stone-500">
              {equipmentData.length} equipment types
            </p>
          </div>
        </div>

        <div className="grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-3">
          {equipmentData.map((item) => (
            <EquipmentCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </main>
  );
}
