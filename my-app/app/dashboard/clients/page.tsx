"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Building2,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  ClipboardList,
  Download,
  FilePlus2,
  Mail,
  MoreHorizontal,
  Phone,
  Plus,
  Search,
  User,
  Users,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type ClientStatus = "Paid" | "Pending" | "Overdue" | "Partial";

type Client = {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  activeRentals: number;
  totalMachines: number;
  outstanding: number;
  nextDueDate: string;
  status: ClientStatus;
};

const clients: Client[] = [
  {
    id: "client_001",
    companyName: "NorthBuild Constructions",
    contactPerson: "Amit Sharma",
    email: "amit@northbuild.example",
    phone: "+91 98765 43210",
    activeRentals: 3,
    totalMachines: 8,
    outstanding: 45000,
    nextDueDate: "20 Oct 2026",
    status: "Overdue",
  },
  {
    id: "client_002",
    companyName: "Apex Infrastructure",
    contactPerson: "Priya Das",
    email: "priya@apexinfra.example",
    phone: "+91 98765 43211",
    activeRentals: 2,
    totalMachines: 5,
    outstanding: 18000,
    nextDueDate: "24 Oct 2026",
    status: "Pending",
  },
  {
    id: "client_003",
    companyName: "Metro Projects Ltd.",
    contactPerson: "Rahul Verma",
    email: "rahul@metroprojects.example",
    phone: "+91 98765 43212",
    activeRentals: 4,
    totalMachines: 11,
    outstanding: 0,
    nextDueDate: "—",
    status: "Paid",
  },
  {
    id: "client_004",
    companyName: "Greenfield Developers",
    contactPerson: "Neha Roy",
    email: "neha@greenfield.example",
    phone: "+91 98765 43213",
    activeRentals: 2,
    totalMachines: 6,
    outstanding: 27500,
    nextDueDate: "18 Oct 2026",
    status: "Partial",
  },
  {
    id: "client_005",
    companyName: "Skyline Engineering",
    contactPerson: "Karan Singh",
    email: "karan@skyline.example",
    phone: "+91 98765 43214",
    activeRentals: 1,
    totalMachines: 3,
    outstanding: 62000,
    nextDueDate: "15 Oct 2026",
    status: "Overdue",
  },
  {
    id: "client_006",
    companyName: "Prime Roads & Co.",
    contactPerson: "Sanjay Bora",
    email: "sanjay@primeroads.example",
    phone: "+91 98765 43215",
    activeRentals: 0,
    totalMachines: 0,
    outstanding: 0,
    nextDueDate: "—",
    status: "Paid",
  },
  {
    id: "client_007",
    companyName: "EastPoint Civil Works",
    contactPerson: "Maya Dutta",
    email: "maya@eastpoint.example",
    phone: "+91 98765 43216",
    activeRentals: 2,
    totalMachines: 4,
    outstanding: 12500,
    nextDueDate: "27 Oct 2026",
    status: "Pending",
  },
];

const statusStyles: Record<ClientStatus, string> = {
  Paid: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Pending: "bg-amber-50 text-amber-700 ring-amber-200",
  Overdue: "bg-red-50 text-red-700 ring-red-200",
  Partial: "bg-orange-50 text-orange-700 ring-orange-200",
};

const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

function StatusBadge({ status }: { status: ClientStatus }) {
  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}

function SummaryCard({
  label,
  value,
  description,
  icon: Icon,
}: {
  label: string;
  value: string;
  description: string;
  icon: typeof Users;
}) {
  return (
    <div className="min-w-0 rounded-xl border border-stone-200 bg-white p-4">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-sm text-stone-500">{label}</p>
          <p className="mt-2 break-words text-2xl font-semibold tracking-tight text-stone-900">
            {value}
          </p>
          <p className="mt-1 text-xs text-stone-500">{description}</p>
        </div>
        <div className="shrink-0 rounded-lg bg-stone-100 p-2 text-stone-700">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}

/**
 * Row actions menu built on shadcn's Base UI DropdownMenu.
 * The popup is rendered in a portal, so it is never clipped by the table
 * wrapper's overflow, and it flips automatically when there's no room below.
 */
function ClientActions({
  clientId,
  companyName,
}: {
  clientId: string;
  companyName: string;
}) {
  return (
    <DropdownMenu>
    
      <DropdownMenuTrigger
        aria-label={`Actions for ${companyName}`}
        className="shrink-0 rounded-md p-2 text-stone-500 outline-none hover:bg-stone-100 hover:text-stone-900 focus-visible:ring-2 focus-visible:ring-stone-300 data-[popup-open]:bg-stone-100 data-[popup-open]:text-stone-900"
      >
        <MoreHorizontal className="h-4 w-4" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" sideOffset={4} className="bg-white w-44">

        <DropdownMenuItem
          render={<Link href={`/dashboard/clients/${clientId}`} />}
          className="cursor-pointer"
        >
          <User className="h-4 w-4 text-stone-500" />
          View client
        </DropdownMenuItem>

        <DropdownMenuItem
          render={<Link href={`/dashboard/invoices/new?clientId=${clientId}`} />}
          className="cursor-pointer"
        >
          <FilePlus2 className="h-4 w-4 text-stone-500" />
          Create invoice
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function Client() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("company");

  const filteredClients = useMemo(() => {
    const query = search.trim().toLowerCase();

    return clients
      .filter((client) => {
        const matchesSearch =
          !query ||
          client.companyName.toLowerCase().includes(query) ||
          client.contactPerson.toLowerCase().includes(query) ||
          client.email.toLowerCase().includes(query) ||
          client.phone.includes(query);

        const matchesStatus =
          statusFilter === "All" || client.status === statusFilter;

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === "outstanding") {
          return b.outstanding - a.outstanding;
        }

        if (sortBy === "rentals") {
          return b.activeRentals - a.activeRentals;
        }

        return a.companyName.localeCompare(b.companyName);
      });
  }, [search, statusFilter, sortBy]);

  const totalOutstanding = clients.reduce(
    (sum, client) => sum + client.outstanding,
    0
  );

  const overdueClients = clients.filter(
    (client) => client.status === "Overdue"
  ).length;

  const activeClients = clients.filter(
    (client) => client.activeRentals > 0
  ).length;

  function exportCsv() {
    const headers = [
      "Company",
      "Contact person",
      "Email",
      "Phone",
      "Active rentals",
      "Machines leased",
      "Outstanding balance",
      "Next due date",
      "Payment status",
    ];

    const rows = filteredClients.map((client) => [
      client.companyName,
      client.contactPerson,
      client.email,
      client.phone,
      client.activeRentals,
      client.totalMachines,
      client.outstanding,
      client.nextDueDate,
      client.status,
    ]);

    const escapeCsv = (value: string | number) =>
      `"${String(value).replace(/"/g, '""')}"`;

    const csv = [headers, ...rows]
      .map((row) => row.map(escapeCsv).join(","))
      .join("\r\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "clients.csv";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="box-border w-full min-w-0 max-w-full space-y-6 overflow-x-clip bg-stone-50 p-4 sm:p-6 lg:p-8">
      {/* Heading */}
      <header className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
            Relationship management
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">
            Clients
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-stone-600">
            Manage customer accounts, equipment rentals, and outstanding payments.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={exportCsv}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-stone-300 bg-white px-3.5 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-50"
          >
            <Download className="h-4 w-4" />
            Export
          </button>

          <Link
            href="/dashboard/clients/new"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-stone-900 px-3.5 py-2.5 text-sm font-medium text-white hover:bg-stone-700"
          >
            <Plus className="h-4 w-4" />
            Add client
          </Link>
        </div>
      </header>

      {/* Summary */}
      <section className="grid min-w-0 grid-cols-2 gap-3 xl:grid-cols-4">
        <SummaryCard
          label="Total clients"
          value={String(clients.length)}
          description="Registered accounts"
          icon={Users}
        />
        <SummaryCard
          label="Active clients"
          value={String(activeClients)}
          description="Currently renting equipment"
          icon={Building2}
        />
        <SummaryCard
          label="Outstanding"
          value={currency.format(totalOutstanding)}
          description="Unpaid balances across clients"
          icon={CircleDollarSign}
        />
        <SummaryCard
          label="Overdue accounts"
          value={String(overdueClients)}
          description="Require payment follow-up"
          icon={ClipboardList}
        />
      </section>

      {/* Client listing */}
      <section className="min-w-0 overflow-hidden rounded-xl border border-stone-200 bg-white">
        <div className="space-y-4 border-b border-stone-200 p-4 sm:p-5">
          <div>
            <h2 className="font-semibold text-stone-900">All clients</h2>
            <p className="mt-1 text-sm text-stone-500">
              View customer accounts and payment summaries.
            </p>
          </div>

          <div className="flex min-w-0 flex-col gap-3 lg:flex-row">
            <div className="relative min-w-0 flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search company, contact, email or phone..."
                aria-label="Search clients"
                className="h-10 w-full min-w-0 rounded-lg border border-stone-200 bg-white pl-9 pr-3 text-sm outline-none placeholder:text-stone-400 focus:border-stone-400 focus:ring-2 focus:ring-stone-100"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 sm:flex">
              <div className="relative min-w-0">
                <select
                  aria-label="Filter by payment status"
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                  className="h-10 w-full appearance-none rounded-lg border border-stone-200 bg-white py-2 pl-3 pr-8 text-sm text-stone-700 outline-none focus:border-stone-400 sm:w-40"
                >
                  <option value="All">All statuses</option>
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                  <option value="Partial">Partially paid</option>
                  <option value="Overdue">Overdue</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
              </div>

              <div className="relative min-w-0">
                <select
                  aria-label="Sort clients"
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                  className="h-10 w-full appearance-none rounded-lg border border-stone-200 bg-white py-2 pl-3 pr-8 text-sm text-stone-700 outline-none focus:border-stone-400 sm:w-44"
                >
                  <option value="company">Company name</option>
                  <option value="outstanding">Highest balance</option>
                  <option value="rentals">Most active rentals</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Desktop table */}
        <div className="hidden min-w-0 md:block">
          <Table>
            <TableHeader>
              <TableRow className="bg-stone-50 hover:bg-stone-50">
                <TableHead className="pl-5">Company</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Active rentals</TableHead>
                <TableHead>Outstanding</TableHead>
                <TableHead>Next due</TableHead>
                <TableHead>Payment status</TableHead>
                <TableHead className="pr-4 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredClients.map((client) => (
                <TableRow key={client.id} className="hover:bg-stone-50/70">
                  <TableCell className="pl-5">
                    <Link
                      href={`/dashboard/clients/${client.id}`}
                      className="group flex min-w-0 items-center gap-3"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-stone-100 text-sm font-semibold text-stone-700">
                        {client.companyName
                          .split(/\s+/)
                          .slice(0, 2)
                          .map((word) => word[0])
                          .join("")
                          .toUpperCase()}
                      </span>
                      <span className="min-w-0">
                        <span className="block max-w-48 break-words font-medium text-stone-900 group-hover:underline">
                          {client.companyName}
                        </span>
                        <span className="mt-1 block text-xs text-stone-500">
                          {client.contactPerson}
                        </span>
                      </span>
                    </Link>
                  </TableCell>

                  <TableCell>
                    <div className="flex min-w-0 flex-col gap-1.5">
                      <a
                        href={`mailto:${client.email}`}
                        className="flex max-w-52 items-center gap-1.5 break-all text-sm text-stone-700 hover:underline"
                      >
                        <Mail className="h-3.5 w-3.5 shrink-0 text-stone-400" />
                        {client.email}
                      </a>
                      <a
                        href={`tel:${client.phone.replace(/\s/g, "")}`}
                        className="flex items-center gap-1.5 text-xs text-stone-500 hover:underline"
                      >
                        <Phone className="h-3.5 w-3.5 shrink-0" />
                        {client.phone}
                      </a>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="font-medium text-stone-900">
                      {client.activeRentals}
                    </div>
                    <div className="mt-1 text-xs text-stone-500">
                      {client.totalMachines} machines
                    </div>
                  </TableCell>

                  <TableCell>
                    <span
                      className={`font-semibold ${
                        client.outstanding > 0
                          ? "text-stone-900"
                          : "text-emerald-700"
                      }`}
                    >
                      {currency.format(client.outstanding)}
                    </span>
                  </TableCell>

                  <TableCell className="whitespace-nowrap text-sm text-stone-600">
                    {client.nextDueDate}
                  </TableCell>

                  <TableCell>
                    <StatusBadge status={client.status} />
                  </TableCell>

                  <TableCell className="pr-4 text-right">
                    <div className="inline-flex items-center gap-1">
                      <Link
                        href={`/dashboard/clients/${client.id}`}
                        aria-label={`View ${client.companyName}`}
                        className="rounded-md p-2 text-stone-500 hover:bg-stone-100 hover:text-stone-900"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                      <ClientActions
                        clientId={client.id}
                        companyName={client.companyName}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}

              {filteredClients.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="h-32 text-center">
                    <p className="font-medium text-stone-700">
                      No clients found
                    </p>
                    <p className="mt-1 text-sm text-stone-500">
                      Try another search term or payment filter.
                    </p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Mobile cards */}
        <div className="grid min-w-0 grid-cols-1 divide-y divide-stone-100 md:hidden">
          {filteredClients.map((client) => (
            <article key={client.id} className="min-w-0 p-4">
              <div className="flex min-w-0 items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-stone-100 text-sm font-semibold text-stone-700">
                  {client.companyName
                    .split(/\s+/)
                    .slice(0, 2)
                    .map((word) => word[0])
                    .join("")
                    .toUpperCase()}
                </div>

                <div className="min-w-0 flex-1">
                  <Link
                    href={`/dashboard/clients/${client.id}`}
                    className="break-words font-semibold text-stone-900 hover:underline"
                  >
                    {client.companyName}
                  </Link>
                  <p className="mt-1 break-words text-sm text-stone-500">
                    {client.contactPerson}
                  </p>
                </div>

                <ClientActions
                  clientId={client.id}
                  companyName={client.companyName}
                />
              </div>

              <div className="mt-4 space-y-2">
                <a
                  href={`mailto:${client.email}`}
                  className="flex min-w-0 items-start gap-2 text-sm text-stone-600"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-stone-400" />
                  <span className="break-all">{client.email}</span>
                </a>
                <a
                  href={`tel:${client.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2 text-sm text-stone-600"
                >
                  <Phone className="h-4 w-4 shrink-0 text-stone-400" />
                  {client.phone}
                </a>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2 border-y border-stone-100 py-3">
                <div className="min-w-0">
                  <p className="text-xs text-stone-500">Rentals</p>
                  <p className="mt-1 font-semibold text-stone-900">
                    {client.activeRentals}
                  </p>
                  <p className="text-xs text-stone-500">
                    {client.totalMachines} machines
                  </p>
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-stone-500">Outstanding</p>
                  <p className="mt-1 break-words font-semibold text-stone-900">
                    {currency.format(client.outstanding)}
                  </p>
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-stone-500">Next due</p>
                  <p className="mt-1 break-words text-sm text-stone-700">
                    {client.nextDueDate}
                  </p>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                <StatusBadge status={client.status} />
                <Link
                  href={`/dashboard/clients/${client.id}`}
                  className="inline-flex items-center gap-1 text-sm font-medium text-stone-800 hover:underline"
                >
                  View client
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}

          {filteredClients.length === 0 && (
            <div className="px-4 py-12 text-center">
              <p className="font-medium text-stone-700">No clients found</p>
              <p className="mt-1 text-sm text-stone-500">
                Try another search term or payment filter.
              </p>
            </div>
          )}
        </div>

        <div className="border-t border-stone-200 px-4 py-3 text-xs text-stone-500 sm:px-5">
          Showing {filteredClients.length} of {clients.length} clients
        </div>
      </section>
    </main>
  );
}