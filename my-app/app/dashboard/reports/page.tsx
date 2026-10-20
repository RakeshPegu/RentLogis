
"use client";

import { useMemo, useState } from "react";
import {
  Activity,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock3,
  Download,
  FileSpreadsheet,
  Search,
  Truck,
  Wrench,
} from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Period = "7 days" | "30 days" | "90 days";

type EquipmentStatus = "Available" | "Rented" | "Maintenance";

type Equipment = {
  id: string;
  name: string;
  category: string;
  rentals: number;
  rentalDays: number;
  utilization: number;
  revenue: number;
  status: EquipmentStatus;
};

const revenueData: Record<
  Period,
  { label: string; revenue: number }[]
> = {
  "7 days": [
    { label: "Mon", revenue: 12500 },
    { label: "Tue", revenue: 18200 },
    { label: "Wed", revenue: 14800 },
    { label: "Thu", revenue: 22100 },
    { label: "Fri", revenue: 19400 },
    { label: "Sat", revenue: 26500 },
    { label: "Sun", revenue: 21000 },
  ],
  "30 days": [
    { label: "Week 1", revenue: 45000 },
    { label: "Week 2", revenue: 62000 },
    { label: "Week 3", revenue: 51000 },
    { label: "Week 4", revenue: 78000 },
  ],
  "90 days": [
    { label: "Aug", revenue: 245000 },
    { label: "Sep", revenue: 312000 },
    { label: "Oct", revenue: 286000 },
  ],
};

const equipmentData: Equipment[] = [
  {
    id: "EX-014",
    name: "Mini Excavator",
    category: "Earthmoving",
    rentals: 18,
    rentalDays: 72,
    utilization: 85,
    revenue: 125000,
    status: "Rented",
  },
  {
    id: "CM-006",
    name: "Concrete Mixer",
    category: "Concrete",
    rentals: 14,
    rentalDays: 49,
    utilization: 62,
    revenue: 48500,
    status: "Available",
  },
  {
    id: "SL-003",
    name: "Boom Lift",
    category: "Lifting",
    rentals: 9,
    rentalDays: 35,
    utilization: 38,
    revenue: 72000,
    status: "Rented",
  },
  {
    id: "PC-011",
    name: "Plate Compactor",
    category: "Compaction",
    rentals: 12,
    rentalDays: 41,
    utilization: 71,
    revenue: 36000,
    status: "Maintenance",
  },
  {
    id: "PG-002",
    name: "Power Generator",
    category: "Power",
    rentals: 16,
    rentalDays: 58,
    utilization: 79,
    revenue: 64000,
    status: "Available",
  },
  {
    id: "BH-008",
    name: "Backhoe Loader",
    category: "Earthmoving",
    rentals: 11,
    rentalDays: 46,
    utilization: 68,
    revenue: 92000,
    status: "Rented",
  },
];

const categoryData = [
  { name: "Earthmoving", revenue: 145000, share: 42 },
  { name: "Lifting", revenue: 92000, share: 27 },
  { name: "Power", revenue: 57000, share: 16 },
  { name: "Concrete", revenue: 34000, share: 10 },
  { name: "Other", revenue: 17000, share: 5 },
];

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

const formatCompactCurrency = (amount: number) =>
  `₹${new Intl.NumberFormat("en-IN", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(amount)}`;

function downloadCSV(
  rows: Record<string, string | number>[],
  filename: string
) {
  if (!rows.length) return;

  const headers = Object.keys(rows[0]);

  const escapeCSV = (value: string | number) =>
    `"${String(value).replace(/"/g, '""')}"`;

  const csv = [
    headers.map(escapeCSV).join(","),
    ...rows.map((row) =>
      headers.map((header) => escapeCSV(row[header])).join(",")
    ),
  ].join("\r\n");

  const blob = new Blob(["\uFEFF" + csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
}

function SectionHeading({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
      <div>
        <h2 className="text-base font-semibold tracking-tight text-stone-800">
          {title}
        </h2>
        {description && (
          <p className="mt-1 text-sm leading-5 text-stone-500">
            {description}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}

function PerformanceMetric({
  label,
  value,
  detail,
  icon: Icon,
  positive,
}: {
  label: string;
  value: string;
  detail: string;
  icon: React.ElementType;
  positive?: boolean;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#eef1e9] text-[#52684d]">
        <Icon size={19} strokeWidth={1.8} />
      </span>

      <div className="min-w-0">
        <p className="text-sm font-medium text-stone-500">{label}</p>
        <p className="mt-1 text-2xl font-semibold tracking-tight text-stone-900">
          {value}
        </p>
        <p
          className={`mt-1 flex flex-wrap items-center gap-1 text-xs ${
            positive === undefined
              ? "text-stone-500"
              : positive
                ? "text-emerald-700"
                : "text-red-700"
          }`}
        >
          {positive !== undefined &&
            (positive ? (
              <ArrowUpRight size={13} />
            ) : (
              <ArrowDownRight size={13} />
            ))}
          {detail}
        </p>
      </div>
    </div>
  );
}

const statusStyles: Record<EquipmentStatus, string> = {
  Available: "bg-emerald-50 text-emerald-700",
  Rented: "bg-[#e8eee5] text-[#435b40]",
  Maintenance: "bg-amber-50 text-amber-800",
};

export default function ReportsPage() {
  const [period, setPeriod] = useState<Period>("30 days");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All categories");
  const [status, setStatus] = useState("All statuses");

  const filteredEquipment = useMemo(() => {
    const query = search.trim().toLowerCase();

    return equipmentData.filter((item) => {
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.id.toLowerCase().includes(query);

      const matchesCategory =
        category === "All categories" || item.category === category;

      const matchesStatus =
        status === "All statuses" || item.status === status;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [search, category, status]);

  const periodRevenue = revenueData[period].reduce(
    (sum, item) => sum + item.revenue,
    0
  );

  const exportRevenue = () => {
    downloadCSV(
      revenueData[period].map((item) => ({
        Period: item.label,
        "Rental revenue (INR)": item.revenue,
      })),
      `rentlogi-revenue-${period.replace(" ", "-")}.csv`
    );
  };

  const exportEquipment = () => {
    downloadCSV(
      filteredEquipment.map((item) => ({
        "Equipment ID": item.id,
        Equipment: item.name,
        Category: item.category,
        Rentals: item.rentals,
        "Rental days": item.rentalDays,
        "Utilization (%)": item.utilization,
        "Revenue (INR)": item.revenue,
        Status: item.status,
      })),
      "rentlogi-equipment-report.csv"
    );
  };

  return (
    <main className="min-h-screen bg-[#f7f7f4] text-stone-800">
      <div className="mx-auto max-w-[1500px] space-y-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {/* Page header */}
        <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs text-stone-500">
              <span>RentLogi</span>
              <ChevronRight size={13} />
              <span className="font-medium text-[#435b40]">Reports</span>
            </div>

            <h1 className="text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">
              Reports & Analytics
            </h1>

            <p className="mt-2 text-sm text-stone-500">
              Understand rental performance and make better business decisions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <label className="flex h-10 items-center gap-2 rounded-lg border border-stone-200 bg-white px-3 text-sm">
              <CalendarDays size={16} className="text-stone-500" />
              <select
                value={period}
                onChange={(event) =>
                  setPeriod(event.target.value as Period)
                }
                className="bg-transparent text-stone-700 outline-none"
                aria-label="Reporting period"
              >
                <option value="7 days">Last 7 days</option>
                <option value="30 days">Last 30 days</option>
                <option value="90 days">Last 90 days</option>
              </select>
            </label>

            <button
              type="button"
              onClick={exportRevenue}
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#293e2e] px-4 text-sm font-semibold text-white transition hover:bg-[#203327]"
            >
              <Download size={16} />
              Export revenue
            </button>
          </div>
        </header>

        {/* Performance metrics, not duplicates of Overview cards */}
        <section className="rounded-xl border border-stone-200 bg-white p-5 sm:p-6">
          <div className="mb-6">
            <h2 className="font-semibold text-stone-800">
              Performance at a glance
            </h2>
            <p className="mt-1 text-sm text-stone-500">
              Operational indicators for the selected reporting period.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            <PerformanceMetric
              label="Completed rentals"
              value="42"
              detail="8.2% vs previous period"
              icon={CheckCircle2}
              positive
            />
            <PerformanceMetric
              label="Equipment utilization"
              value="76%"
              detail="5.4% vs previous period"
              icon={Activity}
              positive
            />
            <PerformanceMetric
              label="Average rental duration"
              value="4.6 days"
              detail="0.8 days longer"
              icon={Clock3}
              positive
            />
            <PerformanceMetric
              label="Maintenance downtime"
              value="3.2%"
              detail="1.1% lower than before"
              icon={Wrench}
              positive
            />
          </div>
        </section>

        {/* Revenue analytics */}
        <section className="grid gap-5 xl:grid-cols-[1.5fr_1fr]">
          <div className="min-w-0 rounded-xl border border-stone-200 bg-white p-5 sm:p-6">
            <SectionHeading
              title="Revenue trends"
              description="Rental revenue across the selected period"
              action={
                <button
                  type="button"
                  onClick={exportRevenue}
                  aria-label="Export revenue data"
                  className="rounded-lg border border-stone-200 p-2 text-stone-500 transition hover:bg-stone-50 hover:text-[#435b40]"
                >
                  <Download size={17} />
                </button>
              }
            />

            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs text-stone-500">
                  Total for selected chart
                </p>
                <p className="mt-1 text-2xl font-semibold tracking-tight text-stone-900">
                  {formatCurrency(periodRevenue)}
                </p>
              </div>

              <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">
                <ArrowUpRight size={13} />
                12.5% vs previous period
              </span>
            </div>

            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={revenueData[period]}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid
                    stroke="#e7e5e4"
                    strokeDasharray="4 4"
                    vertical={false}
                  />

                  <XAxis
                    dataKey="label"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "#78716c", fontSize: 12 }}
                    dy={10}
                  />

                  <YAxis
                    tickFormatter={formatCompactCurrency}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "#78716c", fontSize: 11 }}
                    width={65}
                  />

                  <Tooltip
                    formatter={(value) => [
                      formatCurrency(Number(value)),
                      "Revenue",
                    ]}
                    contentStyle={{
                      borderRadius: 10,
                      border: "1px solid #e7e5e4",
                      boxShadow: "0 8px 24px rgba(41,62,46,0.08)",
                      fontSize: 12,
                    }}
                  />

                  <Line
                    type="monotone"
                    dataKey="revenue"
                    name="Revenue"
                    stroke="#526b50"
                    strokeWidth={2.5}
                    dot={{
                      r: 4,
                      fill: "#526b50",
                      strokeWidth: 2,
                      stroke: "#ffffff",
                    }}
                    activeDot={{ r: 6, fill: "#293e2e" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-stone-100 pt-4 text-xs text-stone-500">
              <span>Rental revenue only</span>
              <span>
                {period === "7 days"
                  ? "Daily view"
                  : period === "30 days"
                    ? "Weekly view"
                    : "Monthly view"}
              </span>
            </div>
          </div>

          {/* Category breakdown */}
          <div className="rounded-xl border border-stone-200 bg-white p-5 sm:p-6">
            <SectionHeading
              title="Revenue by category"
              description="Categories contributing to rental revenue"
            />

            <div className="space-y-5">
              {categoryData.map((item) => (
                <div key={item.name}>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-stone-700">
                      {item.name}
                    </span>
                    <span className="text-sm font-semibold text-stone-900">
                      {formatCurrency(item.revenue)}
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-stone-100">
                    <div
                      className="h-full rounded-full bg-[#526b50] transition-all"
                      style={{ width: `${item.share}%` }}
                    />
                  </div>

                  <p className="mt-1.5 text-xs text-stone-400">
                    {item.share}% of category revenue
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-lg border border-[#dce3d8] bg-[#f5f7f2] p-4">
              <p className="text-sm font-semibold text-[#374c35]">
                Business insight
              </p>
              <p className="mt-1 text-sm leading-6 text-stone-600">
                Earthmoving is the strongest category in this sample. Review
                demand and utilization before expanding other categories.
              </p>
            </div>
          </div>
        </section>

        {/* Rental operations and utilization */}
        <section className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-xl border border-stone-200 bg-white p-5 sm:p-6">
            <SectionHeading
              title="Rental operations"
              description="Rental activity during the selected period"
            />

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-stone-100 bg-stone-50 p-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#eef1e9] text-[#52684d]">
                  <CheckCircle2 size={18} />
                </span>
                <p className="mt-3 text-sm text-stone-500">Completed</p>
                <p className="mt-1 text-2xl font-semibold text-stone-900">
                  42
                </p>
                <p className="mt-1 text-xs text-stone-500">
                  Rentals returned
                </p>
              </div>

              <div className="rounded-lg border border-amber-100 bg-amber-50/60 p-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-100 text-amber-800">
                  <Clock3 size={18} />
                </span>
                <p className="mt-3 text-sm text-stone-500">Delayed returns</p>
                <p className="mt-1 text-2xl font-semibold text-stone-900">
                  5
                </p>
                <p className="mt-1 text-xs text-amber-800">
                  Require follow-up
                </p>
              </div>

              <div className="rounded-lg border border-stone-100 bg-stone-50 p-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#eef1e9] text-[#52684d]">
                  <Truck size={18} />
                </span>
                <p className="mt-3 text-sm text-stone-500">
                  On-time return rate
                </p>
                <p className="mt-1 text-2xl font-semibold text-stone-900">
                  88%
                </p>
                <p className="mt-1 text-xs text-stone-500">Target: 95%</p>
              </div>

              <div className="rounded-lg border border-stone-100 bg-stone-50 p-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#eef1e9] text-[#52684d]">
                  <CalendarDays size={18} />
                </span>
                <p className="mt-3 text-sm text-stone-500">
                  Average duration
                </p>
                <p className="mt-1 text-2xl font-semibold text-stone-900">
                  4.6 days
                </p>
                <p className="mt-1 text-xs text-stone-500">
                  Per completed rental
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-stone-200 bg-white p-5 sm:p-6">
            <SectionHeading
              title="Equipment utilization"
              description="Rental utilization by selected machine"
            />

            <div className="space-y-5">
              {equipmentData.slice(0, 4).map((item) => (
                <div key={item.id}>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#eef1e9] text-[#52684d]">
                        <Truck size={17} />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-stone-800">
                          {item.name}
                        </p>
                        <p className="text-xs text-stone-400">
                          {item.rentalDays} rental days
                        </p>
                      </div>
                    </div>

                    <span className="text-sm font-semibold tabular-nums text-stone-800">
                      {item.utilization}%
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-stone-100">
                    <div
                      className={`h-full rounded-full transition-all ${
                        item.utilization >= 75
                          ? "bg-[#526b50]"
                          : item.utilization >= 50
                            ? "bg-[#9aaa91]"
                            : "bg-amber-500"
                      }`}
                      style={{ width: `${item.utilization}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-lg border border-stone-200 bg-[#f7f7f4] p-3">
              <p className="text-xs leading-5 text-stone-500">
                Calculate utilization from rentable equipment-days, accounting
                for maintenance and unavailable periods using your business rules.
              </p>
            </div>
          </div>
        </section>

        {/* Equipment performance table */}
        <section className="overflow-hidden rounded-xl border border-stone-200 bg-white">
          <div className="p-5 sm:p-6">
            <SectionHeading
              title="Equipment performance"
              description="Compare rental frequency, utilization and revenue by machine"
              action={
                <button
                  type="button"
                  onClick={exportEquipment}
                  className="inline-flex items-center gap-2 rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm font-semibold text-[#435b40] transition hover:bg-[#f5f7f2]"
                >
                  <FileSpreadsheet size={16} />
                  Export CSV
                </button>
              }
            />

            <div className="mb-5 flex flex-col gap-3 md:flex-row">
              <div className="relative flex-1">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
                />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search equipment name or ID..."
                  className="h-10 w-full rounded-lg border border-stone-200 bg-white pl-9 pr-3 text-sm outline-none placeholder:text-stone-400 focus:border-[#73866f] focus:ring-2 focus:ring-[#73866f]/10"
                />
              </div>

              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                aria-label="Filter by category"
                className="h-10 rounded-lg border border-stone-200 bg-white px-3 text-sm text-stone-700 outline-none focus:border-[#73866f]"
              >
                <option>All categories</option>
                {[...new Set(equipmentData.map((item) => item.category))].map(
                  (name) => (
                    <option key={name}>{name}</option>
                  )
                )}
              </select>

              <select
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                aria-label="Filter by equipment status"
                className="h-10 rounded-lg border border-stone-200 bg-white px-3 text-sm text-stone-700 outline-none focus:border-[#73866f]"
              >
                <option>All statuses</option>
                <option>Available</option>
                <option>Rented</option>
                <option>Maintenance</option>
              </select>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-y border-stone-100 bg-stone-50 text-xs text-stone-500">
                    <th className="px-4 py-3 font-medium">Equipment</th>
                    <th className="px-4 py-3 font-medium">Rentals</th>
                    <th className="px-4 py-3 font-medium">Rental days</th>
                    <th className="px-4 py-3 font-medium">Utilization</th>
                    <th className="px-4 py-3 font-medium">Revenue</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-stone-100">
                  {filteredEquipment.map((item) => (
                    <tr
                      key={item.id}
                      className="transition-colors hover:bg-stone-50/70"
                    >
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#eef1e9] text-[#52684d]">
                            <Truck size={18} />
                          </span>
                          <div>
                            <p className="font-semibold text-stone-800">
                              {item.name}
                            </p>
                            <p className="mt-1 text-xs text-stone-500">
                              {item.id} · {item.category}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-4 text-stone-600">
                        {item.rentals}
                      </td>

                      <td className="px-4 py-4 text-stone-600">
                        {item.rentalDays} days
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-16 overflow-hidden rounded-full bg-stone-100">
                            <div
                              className="h-full rounded-full bg-[#526b50]"
                              style={{ width: `${item.utilization}%` }}
                            />
                          </div>
                          <span className="text-stone-700">
                            {item.utilization}%
                          </span>
                        </div>
                      </td>

                      <td className="px-4 py-4 font-semibold tabular-nums text-stone-900">
                        {formatCurrency(item.revenue)}
                      </td>

                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex rounded-md px-2.5 py-1 text-xs font-semibold ${statusStyles[item.status]}`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}

                  {filteredEquipment.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-4 py-12 text-center text-sm text-stone-500"
                      >
                        No equipment matches your search or filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex flex-col gap-2 border-t border-stone-100 pt-4 text-xs text-stone-500 sm:flex-row sm:items-center sm:justify-between">
              <span>
                Showing {filteredEquipment.length} of {equipmentData.length}{" "}
                equipment items
              </span>
              <span>Illustrative demo data</span>
            </div>
          </div>
        </section>

        <footer className="border-t border-stone-200 pt-5 text-xs text-stone-400">
          RentLogi · Equipment rental analytics
        </footer>
      </div>
    </main>
  );
}
