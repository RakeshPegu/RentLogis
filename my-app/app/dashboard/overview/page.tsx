
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Activity,
  AlertCircle,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Bell,
  CalendarClock,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Construction,
  FileText,
  Package,
  Plus,
  Search,
  Truck,
  Users,
  Wallet,
  Wrench,
} from "lucide-react";

type RentalStatus = "Active" | "Due today" | "Overdue";

const money = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

const revenueData = [
  { month: "May", amount: 290000 },
  { month: "Jun", amount: 350000 },
  { month: "Jul", amount: 320000 },
  { month: "Aug", amount: 390000 },
  { month: "Sep", amount: 420000 },
  { month: "Oct", amount: 485000 },
];

const schedule = [
  {
    time: "09:30 AM",
    type: "Delivery",
    equipment: "Mini excavator · EX-014",
    client: "Northline Construction",
    location: "Whitefield, Bengaluru",
  },
  {
    time: "11:00 AM",
    type: "Return",
    equipment: "Backhoe loader · BH-008",
    client: "Summit Infrastructure",
    location: "Yelahanka, Bengaluru",
  },
  {
    time: "02:00 PM",
    type: "Pickup",
    equipment: "Scissor lift · SL-003",
    client: "Apex Projects",
    location: "Hebbal, Bengaluru",
  },
];

const rentals: {
  id: string;
  equipment: string;
  assetId: string;
  client: string;
  start: string;
  due: string;
  amount: number;
  status: RentalStatus;
}[] = [
  {
    id: "RNT-2084",
    equipment: "Mini excavator",
    assetId: "EX-014",
    client: "Northline Construction",
    start: "12 Oct 2026",
    due: "19 Oct 2026",
    amount: 31500,
    status: "Active",
  },
  {
    id: "RNT-2083",
    equipment: "Backhoe loader",
    assetId: "BH-008",
    client: "Summit Infrastructure",
    start: "10 Oct 2026",
    due: "18 Oct 2026",
    amount: 42000,
    status: "Due today",
  },
  {
    id: "RNT-2082",
    equipment: "Scissor lift",
    assetId: "SL-003",
    client: "Apex Projects",
    start: "15 Oct 2026",
    due: "20 Oct 2026",
    amount: 18500,
    status: "Active",
  },
  {
    id: "RNT-2079",
    equipment: "Plate compactor",
    assetId: "PC-011",
    client: "Cedar Buildworks",
    start: "08 Oct 2026",
    due: "17 Oct 2026",
    amount: 12600,
    status: "Overdue",
  },
];

const statusStyles: Record<RentalStatus, string> = {
  Active: "bg-emerald-50 text-emerald-700",
  "Due today": "bg-amber-50 text-amber-800",
  Overdue: "bg-red-50 text-red-700",
};

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
    <div className="mb-5 flex items-start justify-between gap-3">
      <div>
        <h2 className="text-base font-semibold tracking-tight text-stone-800">
          {title}
        </h2>
        {description && (
          <p className="mt-1 text-sm text-stone-500">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}

function MetricCard({
  label,
  value,
  detail,
  trend,
  icon: Icon,
  negative,
}: {
  label: string;
  value: string;
  detail: string;
  trend?: string;
  icon: React.ElementType;
  negative?: boolean;
}) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-stone-500">{label}</p>
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#eef1e9] text-[#52684d]">
          <Icon size={19} strokeWidth={1.8} />
        </span>
      </div>

      <p className="mt-4 text-2xl font-semibold tracking-tight text-stone-900">
        {value}
      </p>

      <div className="mt-2 flex flex-wrap items-center gap-1.5 text-xs">
        {trend && (
          <span
            className={`inline-flex items-center gap-0.5 font-semibold ${
              negative ? "text-red-700" : "text-emerald-700"
            }`}
          >
            {negative ? (
              <ArrowDownRight size={13} />
            ) : (
              <ArrowUpRight size={13} />
            )}
            {trend}
          </span>
        )}
        <span className="text-stone-500">{detail}</span>
      </div>
    </div>
  );
}

export default function OverviewPage() {
  const [period, setPeriod] = useState("This month");
  const [filter, setFilter] = useState<"All" | RentalStatus>("All");
  const [search, setSearch] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [actionsOpen, setActionsOpen] = useState(false);

  const filteredRentals = useMemo(() => {
    const query = search.trim().toLowerCase();

    return rentals.filter((rental) => {
      const matchesStatus = filter === "All" || rental.status === filter;
      const matchesSearch =
        !query ||
        rental.id.toLowerCase().includes(query) ||
        rental.equipment.toLowerCase().includes(query) ||
        rental.assetId.toLowerCase().includes(query) ||
        rental.client.toLowerCase().includes(query);

      return matchesStatus && matchesSearch;
    });
  }, [filter, search]);

  const maxRevenue = Math.max(...revenueData.map((item) => item.amount));

  return (
    <main className="min-h-screen bg-[#f7f7f4] text-stone-800">
      <div className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {/* Header */}
        <header className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs text-stone-500">
              <span>RentLogi</span>
              <ChevronRight size={13} />
              <span className="font-medium text-[#435b40]">Overview</span>
            </div>

            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Good morning, Alex
            </h1>
            <p className="mt-2 text-sm text-stone-500">
              Here&apos;s what&apos;s happening with your rental business today.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                type="button"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                aria-label="Toggle notifications"
                className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-stone-200 bg-white hover:bg-stone-50"
              >
                <Bell size={18} />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-amber-600 ring-2 ring-white" />
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 top-12 z-30 w-72 rounded-xl border border-stone-200 bg-white p-4 shadow-lg">
                  <p className="font-semibold">Notifications</p>
                  <p className="mt-2 text-sm leading-6 text-stone-500">
                    Four invoices need follow-up, two machines need maintenance,
                    and one rental return is overdue.
                  </p>
                  <Link
                    href="/dashboard/invoices"
                    className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#435b40]"
                  >
                    Review invoices <ArrowRight size={14} />
                  </Link>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => setActionsOpen(!actionsOpen)}
                className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#293e2e] px-4 text-sm font-semibold text-white hover:bg-[#203327]"
              >
                <Plus size={16} />
                Create new
                <ChevronDown size={14} />
              </button>

              {actionsOpen && (
                <div className="absolute right-0 top-12 z-30 w-52 rounded-xl border border-stone-200 bg-white p-1.5 shadow-lg">
                  {[
                    ["New rental", "/dashboard/rentals/new"],
                    ["Create invoice", "/dashboard/invoices/new"],
                    ["Add equipment", "/dashboard/equipment/new"],
                    ["Add customer", "/dashboard/clients/new"],
                  ].map(([label, href]) => (
                    <Link
                      key={href}
                      href={href}
                      className="block rounded-lg px-3 py-2.5 text-sm hover:bg-stone-50"
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Summary cards */}
        <section className="mb-8">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-semibold">Business overview</h2>
              <p className="mt-1 text-sm text-stone-500">
                Your key numbers at a glance
              </p>
            </div>

            <label className="flex h-10 items-center gap-2 rounded-lg border border-stone-200 bg-white px-3 text-sm">
              <CalendarDays size={16} className="text-stone-500" />
              <select
                value={period}
                onChange={(event) => setPeriod(event.target.value)}
                className="bg-transparent outline-none"
              >
                <option>This month</option>
                <option>Last month</option>
                <option>Last 7 days</option>
                <option>This year</option>
              </select>
            </label>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              label="Rental revenue"
              value={
                period === "Last 7 days"
                  ? "₹1,42,500"
                  : period === "Last month"
                    ? "₹4,20,000"
                    : period === "This year"
                      ? "₹32,40,000"
                      : "₹4,85,000"
              }
              trend="15.5%"
              detail="vs previous period"
              icon={CircleDollarSign}
            />

            <MetricCard
              label="Active rentals"
              value="18"
              trend="2"
              detail="starting today"
              icon={CalendarDays}
            />

            <MetricCard
              label="Outstanding payments"
              value="₹1,24,500"
              detail="4 invoices overdue"
              icon={Wallet}
              negative
            />

            <MetricCard
              label="Available equipment"
              value="12 / 30"
              detail="2 under maintenance"
              icon={Construction}
            />
          </div>
        </section>

        {/* Revenue and attention */}
        <section className="mb-8 grid gap-5 xl:grid-cols-[1.4fr_1fr]">
          <div className="rounded-xl border border-stone-200 bg-white p-5 sm:p-6">
            <SectionHeading
              title="Revenue trend"
              description="Rental revenue over the last six months"
              action={
                <Link
                  href="/dashboard/reports"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-[#435b40] hover:underline"
                >
                  View reports <ArrowRight size={14} />
                </Link>
              }
            />

            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-2xl font-semibold text-stone-900">
                  {money(485000)}
                </p>
                <p className="mt-1 text-xs text-stone-500">
                  Revenue in October
                </p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">
                <ArrowUpRight size={13} /> 15.5% vs September
              </span>
            </div>

            <div className="grid h-44 grid-cols-6 items-end gap-3 sm:gap-5">
              {revenueData.map((item) => (
                <div
                  key={item.month}
                  className="flex h-full min-w-0 flex-col items-center justify-end gap-2"
                >
                  <div className="flex h-full w-full items-end">
                    <div
                      title={`${item.month}: ${money(item.amount)}`}
                      className={`w-full rounded-t-md transition-colors ${
                        item.month === "Oct"
                          ? "bg-[#526b50]"
                          : "bg-[#dce3d8] hover:bg-[#bdcbb7]"
                      }`}
                      style={{
                        height: `${(item.amount / maxRevenue) * 100}%`,
                      }}
                    />
                  </div>
                  <span
                    className={`text-xs ${
                      item.month === "Oct"
                        ? "font-semibold text-[#374c35]"
                        : "text-stone-500"
                    }`}
                  >
                    {item.month}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-stone-100 pt-4 text-xs text-stone-500">
              <span>Rental revenue only</span>
              <span>May – Oct 2026</span>
            </div>
          </div>

          <div className="rounded-xl border border-stone-200 bg-white p-5 sm:p-6">
            <SectionHeading
              title="Needs your attention"
              description="Items that may need action"
              action={
                <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-800">
                  3 items
                </span>
              }
            />

            <div className="divide-y divide-stone-100">
              {[
                {
                  title: "Overdue invoices",
                  description: "4 invoices need payment follow-up",
                  detail: "₹1,24,500 outstanding",
                  href: "/dashboard/invoices",
                  icon: CircleDollarSign,
                  style: "bg-amber-50 text-amber-800",
                },
                {
                  title: "Equipment maintenance",
                  description: "2 machines are unavailable",
                  detail: "Review service schedules",
                  href: "/dashboard/equipment",
                  icon: Wrench,
                  style: "bg-orange-50 text-orange-700",
                },
                {
                  title: "Overdue rental return",
                  description: "1 rental has passed its return time",
                  detail: "Mini excavator · EX-006",
                  href: "/dashboard/rentals",
                  icon: AlertCircle,
                  style: "bg-red-50 text-red-700",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="flex gap-3 py-4 first:pt-1 last:pb-1"
                  >
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${item.style}`}
                    >
                      <Icon size={17} />
                    </span>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold">{item.title}</p>
                      <p className="mt-1 text-xs leading-5 text-stone-500">
                        {item.description}
                      </p>
                      <p className="mt-1 text-xs text-stone-600">
                        {item.detail}
                      </p>
                      <Link
                        href={item.href}
                        className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#435b40] hover:underline"
                      >
                        Review <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Today's schedule */}
        <section className="mb-8 rounded-xl border border-stone-200 bg-white p-5 sm:p-6">
          <SectionHeading
            title="Today's schedule"
            description="Deliveries, pickups and expected returns"
            action={
              <Link
                href="/dashboard/rentals/tracking"
                className="inline-flex items-center gap-1 text-sm font-semibold text-[#435b40] hover:underline"
              >
                View rentals <ArrowRight size={14} />
              </Link>
            }
          />

          <div className="grid gap-3 lg:grid-cols-3">
            {schedule.map((item) => (
              <div
                key={item.time}
                className="rounded-lg border border-stone-200 p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 text-xs text-stone-500">
                    <Clock3 size={14} />
                    {item.time}
                  </span>
                  <span
                    className={`rounded-md px-2 py-1 text-xs font-semibold ${
                      item.type === "Delivery"
                        ? "bg-[#e8eee5] text-[#435b40]"
                        : item.type === "Return"
                          ? "bg-amber-50 text-amber-800"
                          : "bg-blue-50 text-blue-800"
                    }`}
                  >
                    {item.type}
                  </span>
                </div>

                <p className="mt-4 text-sm font-semibold">{item.equipment}</p>
                <p className="mt-1 text-sm text-stone-600">{item.client}</p>
                <p className="mt-3 flex items-center gap-1.5 text-xs text-stone-500">
                  <Truck size={13} />
                  {item.location}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Current rentals */}
        <section className="overflow-hidden rounded-xl border border-stone-200 bg-white">
          <div className="p-5 sm:p-6">
            <SectionHeading
              title="Current rentals"
              description="Track equipment currently out with customers"
              action={
                <Link
                  href="/dashboard/rentals"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-[#435b40] hover:underline"
                >
                  All rentals <ArrowRight size={14} />
                </Link>
              }
            />

            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="relative w-full md:max-w-xs">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
                />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search equipment, client, ID..."
                  className="h-10 w-full rounded-lg border border-stone-200 pl-9 pr-3 text-sm outline-none placeholder:text-stone-400 focus:border-[#73866f] focus:ring-2 focus:ring-[#73866f]/10"
                />
              </div>

              <div className="flex flex-wrap gap-1.5">
                {(["All", "Active", "Due today", "Overdue"] as const).map(
                  (item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setFilter(item)}
                      className={`rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${
                        filter === item
                          ? "bg-[#293e2e] text-white"
                          : "border border-stone-200 text-stone-600 hover:bg-stone-50"
                      }`}
                    >
                      {item}
                    </button>
                  ),
                )}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left text-sm">
              <thead>
                <tr className="border-y border-stone-100 bg-stone-50 text-xs text-stone-500">
                  <th className="px-6 py-3 font-medium">Rental / equipment</th>
                  <th className="px-4 py-3 font-medium">Customer</th>
                  <th className="px-4 py-3 font-medium">Rental period</th>
                  <th className="px-4 py-3 text-right font-medium">Amount</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 text-right font-medium">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-stone-100">
                {filteredRentals.map((rental) => (
                  <tr key={rental.id} className="hover:bg-stone-50/70">
                    <td className="px-6 py-4">
                      <p className="font-semibold">{rental.equipment}</p>
                      <p className="mt-1 text-xs text-stone-500">
                        {rental.id} · {rental.assetId}
                      </p>
                    </td>
                    <td className="px-4 py-4 text-stone-600">
                      {rental.client}
                    </td>
                    <td className="px-4 py-4">
                      <p>{rental.start}</p>
                      <p className="mt-1 text-xs text-stone-500">
                        Due {rental.due}
                      </p>
                    </td>
                    <td className="px-4 py-4 text-right font-semibold tabular-nums">
                      {money(rental.amount)}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[rental.status]}`}
                      >
                        {rental.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/dashboard/rentals/${rental.id}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#435b40] hover:underline"
                      >
                        Details <ChevronRight size={13} />
                      </Link>
                    </td>
                  </tr>
                ))}

                {filteredRentals.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-12 text-center text-sm text-stone-500"
                    >
                      No rentals match your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-2 border-t border-stone-100 px-6 py-4 text-xs text-stone-500 sm:flex-row sm:items-center sm:justify-between">
            <span>
              Showing {filteredRentals.length} of {rentals.length} demo rentals
            </span>
            <span>Sample data · Last updated just now</span>
          </div>
        </section>

        {/* Quick actions */}
        <section className="mt-8">
          <SectionHeading
            title="Quick actions"
            description="Common tasks to keep your business moving"
          />

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {[
              {
                label: "Create a rental",
                description: "Assign equipment to a customer",
                href: "/dashboard/rentals/new",
                icon: CalendarDays,
              },
              {
                label: "Create an invoice",
                description: "Bill a customer for a rental",
                href: "/dashboard/invoices/new",
                icon: FileText,
              },
              {
                label: "Add equipment",
                description: "Register a machine to your fleet",
                href: "/dashboard/equipment/new",
                icon: Package,
              },
              {
                label: "Add a customer",
                description: "Save a new business contact",
                href: "/dashboard/clients/new",
                icon: Users,
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group flex items-center gap-3 rounded-xl border border-stone-200 bg-white p-4 transition-colors hover:border-[#cbd4c7] hover:bg-[#fcfdfb]"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#eef1e9] text-[#52694d]">
                    <Icon size={18} />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold">
                      {item.label}
                    </span>
                    <span className="mt-1 block text-xs text-stone-500">
                      {item.description}
                    </span>
                  </span>

                  <ArrowUpRight
                    size={16}
                    className="text-stone-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
              );
            })}
          </div>
        </section>

        <footer className="mt-8 flex flex-col gap-2 border-t border-stone-200 pt-5 text-xs text-stone-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 RentLogi. Equipment rental management.</p>
          <p>Dashboard data is illustrative and not connected to a backend.</p>
        </footer>
      </div>
    </main>
  );
}
