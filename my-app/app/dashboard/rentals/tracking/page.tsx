
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowDownToLine,
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  MapPin,
  MoreHorizontal,
  Package,
  Search,
  Truck,
  RotateCcw,
  AlertTriangle,
  CircleCheck,
  ClipboardList,
  Eye,
  Filter,
  Plus,
  UserRound,
  X,
} from "lucide-react";

type RentalStatus =
  | "Awaiting Delivery"
  | "Delivered"
  | "Due for Return"
  | "Overdue"
  | "Returned";

type Rental = {
  id: string;
  equipment: string;
  category: string;
  customer: string;
  initials: string;
  location: string;
  quantity: number;
  deliveryDate: string;
  returnDate: string;
  status: RentalStatus;
};

const initialRentals: Rental[] = [
  {
    id: "RNT-1048",
    equipment: "Mini Excavator",
    category: "Excavators",
    customer: "Northfield Constructions",
    initials: "NC",
    location: "Whitefield, Bengaluru",
    quantity: 1,
    deliveryDate: "Oct 12, 2026",
    returnDate: "Oct 20, 2026",
    status: "Delivered",
  },
  {
    id: "RNT-1047",
    equipment: "Boom Lift 45 ft",
    category: "Access Equipment",
    customer: "Apex Infrastructure",
    initials: "AI",
    location: "Electronic City, Bengaluru",
    quantity: 1,
    deliveryDate: "Oct 08, 2026",
    returnDate: "Oct 15, 2026",
    status: "Overdue",
  },
  {
    id: "RNT-1046",
    equipment: "JCB Backhoe Loader",
    category: "Earthmoving",
    customer: "BuildRight Projects",
    initials: "BP",
    location: "Sarjapur Road, Bengaluru",
    quantity: 2,
    deliveryDate: "Oct 18, 2026",
    returnDate: "Oct 25, 2026",
    status: "Awaiting Delivery",
  },
  {
    id: "RNT-1045",
    equipment: "Plate Compactor",
    category: "Compaction",
    customer: "Urban Edge Developers",
    initials: "UE",
    location: "Hebbal, Bengaluru",
    quantity: 1,
    deliveryDate: "Oct 05, 2026",
    returnDate: "Oct 18, 2026",
    status: "Due for Return",
  },
  {
    id: "RNT-1044",
    equipment: "Portable Generator",
    category: "Power Equipment",
    customer: "Summit Events",
    initials: "SE",
    location: "Indiranagar, Bengaluru",
    quantity: 3,
    deliveryDate: "Oct 02, 2026",
    returnDate: "Oct 10, 2026",
    status: "Returned",
  },
  {
    id: "RNT-1043",
    equipment: "Tower Crane",
    category: "Lifting Equipment",
    customer: "Metro Build Co.",
    initials: "MB",
    location: "Yelahanka, Bengaluru",
    quantity: 1,
    deliveryDate: "Oct 14, 2026",
    returnDate: "Oct 22, 2026",
    status: "Delivered",
  },
  {
    id: "RNT-1042",
    equipment: "Concrete Mixer",
    category: "Concrete Equipment",
    customer: "GreenStone Builders",
    initials: "GB",
    location: "Marathahalli, Bengaluru",
    quantity: 2,
    deliveryDate: "Oct 09, 2026",
    returnDate: "Oct 17, 2026",
    status: "Overdue",
  },
  {
    id: "RNT-1041",
    equipment: "Scissor Lift",
    category: "Access Equipment",
    customer: "Vertex Engineering",
    initials: "VE",
    location: "Peenya, Bengaluru",
    quantity: 1,
    deliveryDate: "Oct 16, 2026",
    returnDate: "Oct 23, 2026",
    status: "Delivered",
  },
];

const filters = [
  "All",
  "Awaiting Delivery",
  "Delivered",
  "Due for Return",
  "Overdue",
  "Returned",
] as const;

type FilterStatus = (typeof filters)[number];

function getStatusStyle(status: RentalStatus) {
  switch (status) {
    case "Awaiting Delivery":
      return "bg-amber-50 text-amber-800 border-amber-200";
    case "Delivered":
      return "bg-emerald-50 text-emerald-800 border-emerald-200";
    case "Due for Return":
      return "bg-orange-50 text-orange-800 border-orange-200";
    case "Overdue":
      return "bg-red-50 text-red-700 border-red-200";
    case "Returned":
      return "bg-stone-100 text-stone-600 border-stone-200";
  }
}

function StatusIcon({ status }: { status: RentalStatus }) {
  const className = "h-3.5 w-3.5";

  switch (status) {
    case "Awaiting Delivery":
      return <Truck className={className} />;
    case "Delivered":
      return <Package className={className} />;
    case "Due for Return":
      return <Clock3 className={className} />;
    case "Overdue":
      return <AlertTriangle className={className} />;
    case "Returned":
      return <CircleCheck className={className} />;
  }
}

function MetricCard({
  label,
  value,
  description,
  icon: Icon,
  iconClass,
}: {
  label: string;
  value: number;
  description: string;
  icon: typeof Package;
  iconClass: string;
}) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-stone-500">{label}</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-stone-900">
            {value}
          </p>
        </div>
        <div className={`rounded-lg p-2.5 ${iconClass}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <p className="mt-3 text-xs leading-5 text-stone-500">{description}</p>
    </div>
  );
}

export default function RentalTrackingPage() {
  const [rentals, setRentals] = useState(initialRentals);
  const [activeFilter, setActiveFilter] = useState<FilterStatus>("All");
  const [search, setSearch] = useState("");
  const [selectedRental, setSelectedRental] = useState<Rental | null>(null);
  const [actionMenu, setActionMenu] = useState<string | null>(null);

  const filteredRentals = useMemo(() => {
    const query = search.trim().toLowerCase();

    return rentals.filter((rental) => {
      const matchesFilter =
        activeFilter === "All" || rental.status === activeFilter;

      const matchesSearch =
        !query ||
        rental.id.toLowerCase().includes(query) ||
        rental.equipment.toLowerCase().includes(query) ||
        rental.customer.toLowerCase().includes(query) ||
        rental.location.toLowerCase().includes(query);

      return matchesFilter && matchesSearch;
    });
  }, [rentals, activeFilter, search]);

  const activeCount = rentals.filter(
    (rental) =>
      rental.status === "Delivered" ||
      rental.status === "Due for Return" ||
      rental.status === "Overdue",
  ).length;

  const awaitingCount = rentals.filter(
    (rental) => rental.status === "Awaiting Delivery",
  ).length;

  const dueCount = rentals.filter(
    (rental) => rental.status === "Due for Return",
  ).length;

  const overdueCount = rentals.filter(
    (rental) => rental.status === "Overdue",
  ).length;

  const returnedCount = rentals.filter(
    (rental) => rental.status === "Returned",
  ).length;

  function updateStatus(id: string, status: RentalStatus) {
    setRentals((current) =>
      current.map((rental) =>
        rental.id === id ? { ...rental, status } : rental,
      ),
    );
    setActionMenu(null);
    setSelectedRental(null);
  }

  function exportCsv() {
    const headers = [
      "Rental ID",
      "Equipment",
      "Category",
      "Customer",
      "Quantity",
      "Location",
      "Delivery Date",
      "Expected Return",
      "Status",
    ];

    const rows = filteredRentals.map((rental) => [
      rental.id,
      rental.equipment,
      rental.category,
      rental.customer,
      rental.quantity,
      rental.location,
      rental.deliveryDate,
      rental.returnDate,
      rental.status,
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(","),
      )
      .join("\n");

    const url = URL.createObjectURL(
      new Blob([csv], { type: "text/csv;charset=utf-8;" }),
    );
    const link = document.createElement("a");

    link.href = url;
    link.download = "rentlogi-rental-tracking.csv";
    link.click();

    URL.revokeObjectURL(url);
  }

  return (
    <main className="min-h-screen bg-[#f8f8f5] px-4 py-6 text-stone-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1500px] space-y-7">
        {/* Page heading */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm text-stone-500">
              <Link
                href="/dashboard"
                className="transition hover:text-stone-900"
              >
                Dashboard
              </Link>
              <span>/</span>
              <span className="text-stone-800">Rental tracking</span>
            </div>

            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Rental tracking
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-500">
              Monitor deliveries, active equipment, upcoming returns, and
              overdue rentals from one place.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={exportCsv}
              className="inline-flex items-center gap-2 rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-sm font-medium transition hover:bg-stone-50"
            >
              <ArrowDownToLine className="h-4 w-4" />
              Export CSV
            </button>

            <Link
              href="/dashboard/rentals/new"
              className="inline-flex items-center gap-2 rounded-lg bg-[#244b3b] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#193a2d]"
            >
              <Plus className="h-4 w-4" />
              New rental
            </Link>
          </div>
        </div>

        {/* Alert banner */}
        {overdueCount > 0 && (
          <div className="flex flex-col gap-3 rounded-xl border border-red-200 bg-red-50 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 rounded-lg bg-red-100 p-2 text-red-700">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-red-900">
                  {overdueCount} rental{overdueCount === 1 ? "" : "s"} marked
                  overdue
                </p>
                <p className="mt-1 text-sm text-red-800">
                  Follow up with customers and arrange equipment collection.
                </p>
              </div>
            </div>

            <button
              onClick={() => setActiveFilter("Overdue")}
              className="inline-flex shrink-0 items-center gap-2 self-start text-sm font-semibold text-red-800 hover:text-red-950 sm:self-center"
            >
              Review overdue
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Summary cards */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            label="Active rentals"
            value={activeCount}
            description="Equipment currently with customers"
            icon={Package}
            iconClass="bg-emerald-50 text-emerald-800"
          />
          <MetricCard
            label="Awaiting delivery"
            value={awaitingCount}
            description="Equipment that still needs dispatch"
            icon={Truck}
            iconClass="bg-amber-50 text-amber-800"
          />
          <MetricCard
            label="Due for return"
            value={dueCount}
            description="Rentals scheduled for return today"
            icon={RotateCcw}
            iconClass="bg-orange-50 text-orange-800"
          />
          <MetricCard
            label="Overdue"
            value={overdueCount}
            description="Past the expected return date"
            icon={AlertTriangle}
            iconClass="bg-red-50 text-red-700"
          />
        </section>

        {/* Status overview */}
        <section className="rounded-xl border border-stone-200 bg-white p-5">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-semibold">Rental status overview</h2>
              <p className="mt-1 text-sm text-stone-500">
                A quick breakdown of all rental records.
              </p>
            </div>
            <p className="mt-2 text-sm text-stone-500 sm:mt-0">
              {rentals.length} total records
            </p>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-5">
            {[
              {
                label: "Awaiting delivery",
                count: awaitingCount,
                color: "bg-amber-500",
                status: "Awaiting Delivery" as FilterStatus,
              },
              {
                label: "Delivered",
                count: rentals.filter((r) => r.status === "Delivered").length,
                color: "bg-emerald-600",
                status: "Delivered" as FilterStatus,
              },
              {
                label: "Due for return",
                count: dueCount,
                color: "bg-orange-500",
                status: "Due for Return" as FilterStatus,
              },
              {
                label: "Overdue",
                count: overdueCount,
                color: "bg-red-500",
                status: "Overdue" as FilterStatus,
              },
              {
                label: "Returned",
                count: returnedCount,
                color: "bg-stone-400",
                status: "Returned" as FilterStatus,
              },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => setActiveFilter(item.status)}
                className={`rounded-lg border p-3 text-left transition hover:border-stone-400 ${
                  activeFilter === item.status
                    ? "border-[#244b3b] bg-[#f2f6f2]"
                    : "border-stone-200 bg-white"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${item.color}`} />
                  <span className="text-xs text-stone-600">{item.label}</span>
                </div>
                <p className="mt-3 text-2xl font-semibold">{item.count}</p>
              </button>
            ))}
          </div>
        </section>

        {/* Rentals table */}
        <section className="overflow-hidden rounded-xl border border-stone-200 bg-white">
          <div className="flex flex-col gap-4 border-b border-stone-200 p-5">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h2 className="font-semibold">All rented equipment</h2>
                <p className="mt-1 text-sm text-stone-500">
                  Track equipment status and manage customer returns.
                </p>
              </div>

              <span className="w-fit rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-600">
                {filteredRentals.length} result
                {filteredRentals.length === 1 ? "" : "s"}
              </span>
            </div>

            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="relative w-full lg:max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search equipment, rental ID, customer..."
                  className="h-10 w-full rounded-lg border border-stone-200 bg-white pl-9 pr-3 text-sm outline-none transition placeholder:text-stone-400 focus:border-[#527763] focus:ring-2 focus:ring-[#527763]/10"
                />
              </div>

              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 shrink-0 text-stone-500" />
                <div className="flex flex-wrap gap-1.5">
                  {filters.map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={`rounded-lg px-3 py-2 text-xs font-medium transition ${
                        activeFilter === filter
                          ? "bg-[#244b3b] text-white"
                          : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] text-left">
              <thead>
                <tr className="border-b border-stone-200 bg-stone-50/80">
                  <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-stone-500">
                    Equipment / Rental
                  </th>
                  <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-stone-500">
                    Customer
                  </th>
                  <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-stone-500">
                    Delivery date
                  </th>
                  <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-stone-500">
                    Expected return
                  </th>
                  <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-stone-500">
                    Status
                  </th>
                  <th className="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wide text-stone-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-stone-100">
                {filteredRentals.map((rental) => (
                  <tr
                    key={rental.id}
                    className="transition hover:bg-stone-50/70"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-stone-200 bg-[#f5f5f0] text-stone-600">
                          <Package className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-stone-900">
                            {rental.equipment}
                          </p>
                          <p className="mt-1 text-xs text-stone-500">
                            {rental.id} · Qty {rental.quantity}
                          </p>
                          <p className="mt-1 text-xs text-stone-400">
                            {rental.category}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-stone-100 text-[10px] font-semibold text-stone-600">
                          {rental.initials}
                        </div>
                        <div>
                          <p className="max-w-[190px] truncate text-sm font-medium text-stone-800">
                            {rental.customer}
                          </p>
                          <p className="mt-1 flex items-center gap-1 text-xs text-stone-500">
                            <MapPin className="h-3 w-3" />
                            {rental.location}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-sm text-stone-700">
                        <CalendarDays className="h-4 w-4 text-stone-400" />
                        {rental.deliveryDate}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div
                        className={`flex items-center gap-2 text-sm ${
                          rental.status === "Overdue"
                            ? "font-medium text-red-700"
                            : "text-stone-700"
                        }`}
                      >
                        <CalendarDays className="h-4 w-4 text-stone-400" />
                        {rental.returnDate}
                      </div>
                      {rental.status === "Overdue" && (
                        <p className="mt-1 text-xs text-red-600">
                          Return date passed
                        </p>
                      )}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1.5 text-xs font-medium ${getStatusStyle(rental.status)}`}
                      >
                        <StatusIcon status={rental.status} />
                        {rental.status}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedRental(rental)}
                          aria-label={`View ${rental.id}`}
                          className="rounded-lg border border-stone-200 p-2 text-stone-500 transition hover:bg-stone-100 hover:text-stone-900"
                        >
                          <Eye className="h-4 w-4" />
                        </button>

                        <div className="relative">
                          <button
                            onClick={() =>
                              setActionMenu(
                                actionMenu === rental.id ? null : rental.id,
                              )
                            }
                            aria-label={`More actions for ${rental.id}`}
                            className="rounded-lg border border-stone-200 p-2 text-stone-500 transition hover:bg-stone-100 hover:text-stone-900"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </button>

                          {actionMenu === rental.id && (
                            <div className="absolute right-0 top-10 z-20 w-48 rounded-lg border border-stone-200 bg-white p-1.5 shadow-lg">
                              <p className="px-2 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-stone-400">
                                Update status
                              </p>

                              {(
                                [
                                  "Awaiting Delivery",
                                  "Delivered",
                                  "Due for Return",
                                  "Overdue",
                                  "Returned",
                                ] as RentalStatus[]
                              ).map((status) => (
                                <button
                                  key={status}
                                  onClick={() =>
                                    updateStatus(rental.id, status)
                                  }
                                  className="flex w-full items-center justify-between rounded-md px-2 py-2 text-left text-xs text-stone-700 hover:bg-stone-100"
                                >
                                  {status}
                                  {rental.status === status && (
                                    <Check className="h-3.5 w-3.5 text-[#244b3b]" />
                                  )}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredRentals.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-5 py-16 text-center">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-stone-100 text-stone-500">
                        <ClipboardList className="h-6 w-6" />
                      </div>
                      <p className="mt-4 text-sm font-semibold text-stone-800">
                        No rentals found
                      </p>
                      <p className="mt-1 text-sm text-stone-500">
                        Try another search term or change the status filter.
                      </p>
                      <button
                        onClick={() => {
                          setSearch("");
                          setActiveFilter("All");
                        }}
                        className="mt-3 text-sm font-medium text-[#244b3b] hover:underline"
                      >
                        Clear filters
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-3 border-t border-stone-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-stone-500">
              Showing {filteredRentals.length} of {rentals.length} rental
              records · Demo data
            </p>
            <div className="flex items-center gap-2">
              <button
                disabled
                className="flex items-center gap-1 rounded-lg border border-stone-200 px-3 py-2 text-xs text-stone-400 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Previous
              </button>
              <span className="rounded-lg bg-stone-100 px-3 py-2 text-xs font-medium text-stone-700">
                1
              </span>
              <button
                disabled
                className="flex items-center gap-1 rounded-lg border border-stone-200 px-3 py-2 text-xs text-stone-400 disabled:cursor-not-allowed"
              >
                Next
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </section>

        {/* Details modal */}
        {selectedRental && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/40 p-4"
            onClick={() => setSelectedRental(null)}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="rental-detail-title"
              className="w-full max-w-lg rounded-2xl border border-stone-200 bg-white shadow-xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-start justify-between border-b border-stone-200 p-5">
                <div>
                  <p className="text-xs font-medium text-stone-500">
                    {selectedRental.id}
                  </p>
                  <h2
                    id="rental-detail-title"
                    className="mt-1 text-xl font-semibold"
                  >
                    {selectedRental.equipment}
                  </h2>
                  <p className="mt-1 text-sm text-stone-500">
                    {selectedRental.category}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedRental(null)}
                  aria-label="Close details"
                  className="rounded-lg p-2 text-stone-500 hover:bg-stone-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-5 p-5">
                <div>
                  <p className="mb-2 text-xs font-medium uppercase tracking-wide text-stone-500">
                    Current status
                  </p>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium ${getStatusStyle(selectedRental.status)}`}
                  >
                    <StatusIcon status={selectedRental.status} />
                    {selectedRental.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg bg-stone-50 p-3">
                    <p className="text-xs text-stone-500">Quantity</p>
                    <p className="mt-1 font-semibold">
                      {selectedRental.quantity} unit
                      {selectedRental.quantity === 1 ? "" : "s"}
                    </p>
                  </div>
                  <div className="rounded-lg bg-stone-50 p-3">
                    <p className="text-xs text-stone-500">Category</p>
                    <p className="mt-1 text-sm font-semibold">
                      {selectedRental.category}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <UserRound className="mt-0.5 h-4 w-4 text-stone-400" />
                    <div>
                      <p className="text-xs text-stone-500">Customer</p>
                      <p className="mt-1 text-sm font-medium">
                        {selectedRental.customer}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 text-stone-400" />
                    <div>
                      <p className="text-xs text-stone-500">Project location</p>
                      <p className="mt-1 text-sm font-medium">
                        {selectedRental.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CalendarDays className="mt-0.5 h-4 w-4 text-stone-400" />
                    <div>
                      <p className="text-xs text-stone-500">Delivery date</p>
                      <p className="mt-1 text-sm font-medium">
                        {selectedRental.deliveryDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <RotateCcw className="mt-0.5 h-4 w-4 text-stone-400" />
                    <div>
                      <p className="text-xs text-stone-500">
                        Expected return date
                      </p>
                      <p className="mt-1 text-sm font-medium">
                        {selectedRental.returnDate}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-stone-200 pt-4">
                  <label
                    htmlFor="rental-status"
                    className="mb-2 block text-sm font-medium"
                  >
                    Change rental status
                  </label>
                  <div className="relative">
                    <select
                      id="rental-status"
                      value={selectedRental.status}
                      onChange={(event) =>
                        updateStatus(
                          selectedRental.id,
                          event.target.value as RentalStatus,
                        )
                      }
                      className="h-11 w-full appearance-none rounded-lg border border-stone-300 bg-white px-3 pr-9 text-sm outline-none focus:border-[#527763] focus:ring-2 focus:ring-[#527763]/10"
                    >
                      {(
                        [
                          "Awaiting Delivery",
                          "Delivered",
                          "Due for Return",
                          "Overdue",
                          "Returned",
                        ] as RentalStatus[]
                      ).map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                  </div>
                  <p className="mt-2 text-xs leading-5 text-stone-500">
                    This demo updates the page locally. Connect it to your
                    backend to persist changes.
                  </p>
                </div>
              </div>

              <div className="flex justify-end border-t border-stone-200 p-4">
                <button
                  onClick={() => setSelectedRental(null)}
                  className="rounded-lg bg-[#244b3b] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#193a2d]"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}