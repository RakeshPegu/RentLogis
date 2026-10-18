
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock3,
  Download,
  FileText,
  Mail,
  MapPin,
  MoreHorizontal,
  Phone,
  Plus,
  Receipt,
  UserRound,
  Wallet,
  Wrench,
} from "lucide-react";

type ClientStatus = "Paid" | "Pending" | "Overdue" | "Partial";

type Client = {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  activeRentals: number;
  machinesCurrentlyRented: number;
  outstanding: number;
  nextDueDate: string;
  status: ClientStatus;
};

type Rental = {
  id: string;
  equipment: string;
  category: string;
  quantity: number;
  startDate: string;
  dueDate: string;
  rate: number;
  status: "Active" | "Due soon" | "Overdue" | "Completed";
};

type Invoice = {
  id: string;
  date: string;
  dueDate: string;
  amount: number;
  paid: number;
  status: "Paid" | "Partial" | "Pending" | "Overdue";
};

const clients: Client[] = [
  {
    id: "client_001",
    companyName: "NorthBuild Constructions",
    contactPerson: "Amit Sharma",
    email: "amit@northbuild.example",
    phone: "+91 98765 43210",
    address: "12 Industrial Area, Bengaluru, Karnataka",
    activeRentals: 3,
    machinesCurrentlyRented: 8,
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
    address: "24 Business Park, Bengaluru, Karnataka",
    activeRentals: 2,
    machinesCurrentlyRented: 5,
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
    address: "8 Project Road, Bengaluru, Karnataka",
    activeRentals: 4,
    machinesCurrentlyRented: 11,
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
    address: "17 Green Park, Bengaluru, Karnataka",
    activeRentals: 2,
    machinesCurrentlyRented: 6,
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
    address: "5 Engineering Estate, Bengaluru, Karnataka",
    activeRentals: 1,
    machinesCurrentlyRented: 3,
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
    address: "32 Highway Road, Bengaluru, Karnataka",
    activeRentals: 0,
    machinesCurrentlyRented: 0,
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
    address: "41 Civil Works Road, Bengaluru, Karnataka",
    activeRentals: 2,
    machinesCurrentlyRented: 4,
    outstanding: 12500,
    nextDueDate: "27 Oct 2026",
    status: "Pending",
  },
];

const rentalsByClient: Record<string, Rental[]> = {
  client_001: [
    {
      id: "RNT-1042",
      equipment: "Mini Excavator",
      category: "Earthmoving",
      quantity: 3,
      startDate: "05 Oct 2026",
      dueDate: "20 Oct 2026",
      rate: 4500,
      status: "Due soon",
    },
    {
      id: "RNT-1038",
      equipment: "Wheel Loader",
      category: "Material handling",
      quantity: 2,
      startDate: "01 Oct 2026",
      dueDate: "14 Oct 2026",
      rate: 6500,
      status: "Overdue",
    },
    {
      id: "RNT-1032",
      equipment: "Road Roller",
      category: "Road construction",
      quantity: 3,
      startDate: "10 Oct 2026",
      dueDate: "25 Oct 2026",
      rate: 5000,
      status: "Active",
    },
  ],
};

const invoicesByClient: Record<string, Invoice[]> = {
  client_001: [
    {
      id: "INV-2026-108",
      date: "10 Oct 2026",
      dueDate: "15 Oct 2026",
      amount: 45000,
      paid: 0,
      status: "Overdue",
    },
    {
      id: "INV-2026-101",
      date: "01 Oct 2026",
      dueDate: "15 Oct 2026",
      amount: 32000,
      paid: 20000,
      status: "Partial",
    },
    {
      id: "INV-2026-094",
      date: "20 Sep 2026",
      dueDate: "30 Sep 2026",
      amount: 28000,
      paid: 28000,
      status: "Paid",
    },
  ],
};

const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const statusStyles: Record<string, string> = {
  Paid: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Pending: "bg-amber-50 text-amber-700 ring-amber-200",
  Overdue: "bg-red-50 text-red-700 ring-red-200",
  Partial: "bg-orange-50 text-orange-700 ring-orange-200",
  Active: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  "Due soon": "bg-amber-50 text-amber-700 ring-amber-200",
  Completed: "bg-stone-100 text-stone-600 ring-stone-200",
};

function Badge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${
        statusStyles[status] ?? statusStyles.Pending
      }`}
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
  icon: typeof Building2;
}) {
  return (
    <div className="min-w-0 rounded-xl border border-stone-200 bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm text-stone-500">{label}</p>
          <p className="mt-2 break-words text-2xl font-semibold tracking-tight text-stone-900">
            {value}
          </p>
          <p className="mt-1 text-xs leading-5 text-stone-500">
            {description}
          </p>
        </div>
        <div className="shrink-0 rounded-lg bg-stone-100 p-2.5 text-stone-700">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}

export default function ClientDetailsPage() {
  const params = useParams<{ clientId: string }>();
  const clientId = params.clientId;

  const client = clients.find((item) => item.id === clientId);
  const [activeTab, setActiveTab] = useState<"rentals" | "invoices">("rentals");
  const [showActions, setShowActions] = useState(false);

  const rentals = rentalsByClient[clientId] ?? [];
  const invoices = invoicesByClient[clientId] ?? [];

  const lifetimeRentalValue = useMemo(
    () => invoices.reduce((sum, invoice) => sum + invoice.amount, 0),
    [invoices]
  );

  if (!client) {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center bg-stone-50 px-4 text-center">
        <div className="rounded-xl bg-white p-4 ring-1 ring-stone-200">
          <Building2 className="h-7 w-7 text-stone-500" />
        </div>
        <h1 className="mt-4 text-xl font-semibold text-stone-900">
          Client not found
        </h1>
        <p className="mt-2 text-sm text-stone-500">
          This client may have been removed or the link is incorrect.
        </p>
        <Link
          href="/dashboard/clients"
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-stone-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-stone-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to clients
        </Link>
      </main>
    );
  }

  const initials = client.companyName
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <main className="min-w-0 max-w-full space-y-6 overflow-x-clip bg-stone-50 p-4 sm:p-6 lg:p-8">
      {/* Breadcrumb and page actions */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/dashboard/clients"
          className="inline-flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-stone-950"
        >
          <ArrowLeft className="h-4 w-4" />
          All clients
        </Link>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={`/dashboard/invoices/new?clientId=${client.id}`}
            className="inline-flex items-center gap-2 rounded-lg bg-stone-900 px-3.5 py-2.5 text-sm font-medium text-white hover:bg-stone-700"
          >
            <Plus className="h-4 w-4" />
            Create invoice
          </Link>

          <div className="relative">
            <button
              type="button"
              onClick={() => setShowActions((value) => !value)}
              aria-label="More client actions"
              aria-expanded={showActions}
              className="rounded-lg border border-stone-200 bg-white p-2.5 text-stone-600 hover:bg-stone-100"
            >
              <MoreHorizontal className="h-5 w-5" />
            </button>

            {showActions && (
              <div className="absolute right-0 top-full z-20 mt-2 w-48 rounded-lg border border-stone-200 bg-white p-1 shadow-lg">
                <Link
                  href={`/dashboard/clients/${client.id}/edit`}
                  className="block rounded-md px-3 py-2 text-sm text-stone-700 hover:bg-stone-50"
                >
                  Edit client
                </Link>
                <a
                  href={`mailto:${client.email}`}
                  className="block rounded-md px-3 py-2 text-sm text-stone-700 hover:bg-stone-50"
                >
                  Email client
                </a>
                <a
                  href={`tel:${client.phone.replace(/\s/g, "")}`}
                  className="block rounded-md px-3 py-2 text-sm text-stone-700 hover:bg-stone-50"
                >
                  Call client
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Client heading */}
      <section className="rounded-xl border border-stone-200 bg-white p-5 sm:p-6">
        <div className="flex min-w-0 flex-col gap-5 sm:flex-row sm:items-start">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-stone-100 text-lg font-semibold text-stone-700">
            {initials}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="break-words text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">
                {client.companyName}
              </h1>
              <Badge status={client.status} />
            </div>

            <p className="mt-2 text-sm text-stone-500">
              Client ID: {client.id}
            </p>

            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3 text-sm text-stone-600">
              <span className="inline-flex items-center gap-2">
                <UserRound className="h-4 w-4 text-stone-400" />
                {client.contactPerson}
              </span>
              <a
                href={`mailto:${client.email}`}
                className="inline-flex min-w-0 items-center gap-2 break-all hover:text-stone-950"
              >
                <Mail className="h-4 w-4 shrink-0 text-stone-400" />
                {client.email}
              </a>
              <a
                href={`tel:${client.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2 hover:text-stone-950"
              >
                <Phone className="h-4 w-4 text-stone-400" />
                {client.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Account summary */}
      <section className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          label="Active rentals"
          value={String(client.activeRentals)}
          description="Current rental agreements"
          icon={Receipt}
        />
        <SummaryCard
        label="Total Machines Rented"
        value={String(client.machinesCurrentlyRented)}
        description="Including returned machines"
        icon={Wrench}
        />
        <SummaryCard
          label="Outstanding balance"
          value={currency.format(client.outstanding)}
          description="Amount still to be collected"
          icon={Wallet}
        />
        <SummaryCard
          label="Recorded invoice value"
          value={currency.format(lifetimeRentalValue)}
          description="Based on invoices shown below"
          icon={FileText}
        />
      </section>

      {/* Main content and sidebar */}
      <div className="grid min-w-0 grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0 space-y-6">
          {/* Rentals and invoices */}
          <section className="min-w-0 overflow-hidden rounded-xl border border-stone-200 bg-white">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 p-4 sm:p-5">
              <div>
                <h2 className="font-semibold text-stone-900">
                  Account activity
                </h2>
                <p className="mt-1 text-sm text-stone-500">
                  Review rentals and billing history.
                </p>
              </div>
              <div className="flex rounded-lg bg-stone-100 p-1">
                <button
                  type="button"
                  onClick={() => setActiveTab("rentals")}
                  className={`rounded-md px-3 py-2 text-sm font-medium ${
                    activeTab === "rentals"
                      ? "bg-white text-stone-900 shadow-sm"
                      : "text-stone-500 hover:text-stone-800"
                  }`}
                >
                  Rentals
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("invoices")}
                  className={`rounded-md px-3 py-2 text-sm font-medium ${
                    activeTab === "invoices"
                      ? "bg-white text-stone-900 shadow-sm"
                      : "text-stone-500 hover:text-stone-800"
                  }`}
                >
                  Invoices
                </button>
              </div>
            </div>

            {activeTab === "rentals" ? (
              <>
                {rentals.length > 0 ? (
                  <div className="divide-y divide-stone-100">
                    {rentals.map((rental) => (
                      <div key={rental.id} className="p-4 sm:p-5">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <div className="flex min-w-0 items-start gap-3">
                            <div className="shrink-0 rounded-lg bg-stone-100 p-2.5 text-stone-600">
                              <Wrench className="h-5 w-5" />
                            </div>
                            <div className="min-w-0">
                              <h3 className="font-medium text-stone-900">
                                {rental.equipment}
                              </h3>
                              <p className="mt-1 text-xs text-stone-500">
                                {rental.id} · {rental.category}
                              </p>
                              <p className="mt-2 text-sm text-stone-600">
                                Quantity: {rental.quantity} machines
                              </p>
                            </div>
                          </div>
                          <Badge status={rental.status} />
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-4 rounded-lg bg-stone-50 p-3 sm:grid-cols-3">
                          <div>
                            <p className="text-xs text-stone-500">
                              Rental started
                            </p>
                            <p className="mt-1 text-sm font-medium text-stone-800">
                              {rental.startDate}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-stone-500">
                              Return due
                            </p>
                            <p className="mt-1 text-sm font-medium text-stone-800">
                              {rental.dueDate}
                            </p>
                          </div>
                          <div className="col-span-2 sm:col-span-1">
                            <p className="text-xs text-stone-500">
                              Rate per machine / day
                            </p>
                            <p className="mt-1 text-sm font-semibold text-stone-900">
                              {currency.format(rental.rate)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="px-5 py-12 text-center">
                    <Wrench className="mx-auto h-8 w-8 text-stone-300" />
                    <p className="mt-3 font-medium text-stone-800">
                      No rental records available
                    </p>
                    <p className="mt-1 text-sm text-stone-500">
                      Rental agreements for this client will appear here.
                    </p>
                  </div>
                )}
              </>
            ) : (
              <>
                {invoices.length > 0 ? (
                  <div className="divide-y divide-stone-100">
                    {invoices.map((invoice) => (
                      <div
                        key={invoice.id}
                        className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5"
                      >
                        <div className="flex min-w-0 items-start gap-3">
                          <div className="shrink-0 rounded-lg bg-stone-100 p-2.5 text-stone-600">
                            <FileText className="h-5 w-5" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-stone-900">
                              {invoice.id}
                            </p>
                            <p className="mt-1 text-xs text-stone-500">
                              Issued {invoice.date} · Due {invoice.dueDate}
                            </p>
                            <p className="mt-2 text-sm text-stone-600">
                              Paid: {currency.format(invoice.paid)} of{" "}
                              {currency.format(invoice.amount)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
                          <p className="font-semibold text-stone-900">
                            {currency.format(invoice.amount - invoice.paid)} due
                          </p>
                          <Badge status={invoice.status} />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="px-5 py-12 text-center">
                    <FileText className="mx-auto h-8 w-8 text-stone-300" />
                    <p className="mt-3 font-medium text-stone-800">
                      No invoices available
                    </p>
                    <p className="mt-1 text-sm text-stone-500">
                      Invoices for this client will appear here.
                    </p>
                  </div>
                )}
              </>
            )}
          </section>

          {/* Payment reminder */}
          {client.outstanding > 0 && (
            <section className="flex flex-col gap-3 rounded-xl border border-amber-200 bg-amber-50/60 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
              <div className="flex items-start gap-3">
                <Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />
                <div>
                  <h2 className="font-medium text-stone-900">
                    Outstanding payment
                  </h2>
                  <p className="mt-1 text-sm leading-5 text-stone-600">
                    {currency.format(client.outstanding)} remains outstanding
                    on this client account.
                  </p>
                </div>
              </div>
              <a
                href={`mailto:${client.email}?subject=${encodeURIComponent("Payment reminder")}&body=${encodeURIComponent(`Hello ${client.contactPerson},\n\nThis is a reminder regarding the outstanding balance of ${currency.format(client.outstanding)} on your account.\n\nPlease contact us if you have any questions.\n\nRegards`)}`}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-amber-300 bg-white px-3.5 py-2.5 text-sm font-medium text-stone-800 hover:bg-amber-100"
              >
                <Mail className="h-4 w-4" />
                Email reminder
              </a>
            </section>
          )}
        </div>

        {/* Client information */}
        <aside className="min-w-0 space-y-6">
          <section className="rounded-xl border border-stone-200 bg-white p-5">
            <h2 className="font-semibold text-stone-900">
              Client information
            </h2>
            <p className="mt-1 text-sm text-stone-500">
              Contact and business details.
            </p>

            <div className="mt-5 space-y-5">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-stone-100 p-2 text-stone-600">
                  <Building2 className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-stone-500">Company</p>
                  <p className="mt-1 break-words text-sm font-medium text-stone-900">
                    {client.companyName}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-stone-100 p-2 text-stone-600">
                  <UserRound className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-stone-500">Contact person</p>
                  <p className="mt-1 text-sm font-medium text-stone-900">
                    {client.contactPerson}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-stone-100 p-2 text-stone-600">
                  <Mail className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-stone-500">Email address</p>
                  <a
                    href={`mailto:${client.email}`}
                    className="mt-1 block break-all text-sm text-stone-800 hover:underline"
                  >
                    {client.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-stone-100 p-2 text-stone-600">
                  <Phone className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-stone-500">Phone number</p>
                  <a
                    href={`tel:${client.phone.replace(/\s/g, "")}`}
                    className="mt-1 block text-sm text-stone-800 hover:underline"
                  >
                    {client.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-stone-100 p-2 text-stone-600">
                  <MapPin className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-stone-500">Business address</p>
                  <p className="mt-1 break-words text-sm leading-5 text-stone-800">
                    {client.address}
                  </p>
                </div>
              </div>
            </div>

            <Link
              href={`/dashboard/clients/${client.id}/edit`}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg border border-stone-200 px-3 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-50"
            >
              Edit client details
            </Link>
          </section>

          <section className="rounded-xl border border-stone-200 bg-white p-5">
            <h2 className="font-semibold text-stone-900">
              Account overview
            </h2>

            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm text-stone-500">
                  Account status
                </span>
                <Badge status={client.status} />
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm text-stone-500">
                  Active agreements
                </span>
                <span className="text-sm font-semibold text-stone-900">
                  {client.activeRentals}
                </span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm text-stone-500">
                  Machines with client
                </span>
                <span className="text-sm font-semibold text-stone-900">
                  {client.machinesCurrentlyRented}
                </span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm text-stone-500">
                  Next return due
                </span>
                <span className="text-right text-sm font-medium text-stone-900">
                  {client.nextDueDate}
                </span>
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-stone-200 bg-white p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-stone-100 p-2.5 text-stone-600">
                <CalendarDays className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-semibold text-stone-900">
                  Quick actions
                </h2>
                <p className="mt-1 text-xs text-stone-500">
                  Common account tasks
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <Link
                href={`/dashboard/invoices/new?clientId=${client.id}`}
                className="flex items-center justify-between rounded-lg border border-stone-200 px-3 py-3 text-sm font-medium text-stone-700 hover:bg-stone-50"
              >
                Create invoice
                <ChevronRight className="h-4 w-4 text-stone-400" />
              </Link>
              <Link
                href={`/dashboard/rentals/new?clientId=${client.id}`}
                className="flex items-center justify-between rounded-lg border border-stone-200 px-3 py-3 text-sm font-medium text-stone-700 hover:bg-stone-50"
              >
                Create rental
                <ChevronRight className="h-4 w-4 text-stone-400" />
              </Link>
            </div>
          </section>
        </aside>
      </div>

      <div className="flex items-center gap-2 border-t border-stone-200 pt-4 text-xs text-stone-500">
        <CheckCircle2 className="h-4 w-4" />
        Account overview for {client.companyName}
      </div>
    </main>
  );
}
