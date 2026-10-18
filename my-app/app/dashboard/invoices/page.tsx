
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  Bell,
  CalendarDays,
  CheckCircle2,
  CircleAlert,
  Eye,
  FilePlus2,
  FileText,
  Mail,
  Search,
  Send,
  Wallet,
  X,
} from "lucide-react";

type PaymentStatus =
  | "Paid"
  | "Partially paid"
  | "Unpaid"
  | "Overdue"
  | "Draft"
  | "Void";

type ViewStatus = "Viewed" | "Sent" | "Not sent";

type Invoice = {
  id: string;
  number: string;
  company: string;
  contact: string;
  email: string;
  total: number;
  paid: number;
  issueDate: string;
  dueDate: string;
  paymentStatus: PaymentStatus;
  viewStatus: ViewStatus;
  firstViewedAt?: string;
};

const initialInvoices: Invoice[] = [
  {
    id: "inv_1048",
    number: "INV-2026-1048",
    company: "Northline Construction",
    contact: "Arjun Sharma",
    email: "accounts@northline.example",
    total: 48600,
    paid: 48600,
    issueDate: "2026-10-12",
    dueDate: "2026-10-19",
    paymentStatus: "Paid",
    viewStatus: "Viewed",
    firstViewedAt: "2026-10-12T10:42:00",
  },
  {
    id: "inv_1047",
    number: "INV-2026-1047",
    company: "Summit Infrastructure",
    contact: "Priya Nair",
    email: "finance@summit.example",
    total: 72500,
    paid: 25000,
    issueDate: "2026-10-10",
    dueDate: "2026-10-20",
    paymentStatus: "Partially paid",
    viewStatus: "Viewed",
    firstViewedAt: "2026-10-10T14:15:00",
  },
  {
    id: "inv_1046",
    number: "INV-2026-1046",
    company: "Apex Roadworks",
    contact: "Vikram Das",
    email: "billing@apex.example",
    total: 32800,
    paid: 0,
    issueDate: "2026-10-06",
    dueDate: "2026-10-14",
    paymentStatus: "Overdue",
    viewStatus: "Viewed",
    firstViewedAt: "2026-10-07T09:20:00",
  },
  {
    id: "inv_1045",
    number: "INV-2026-1045",
    company: "BlueRock Developers",
    contact: "Meera Rao",
    email: "accounts@bluerock.example",
    total: 91500,
    paid: 0,
    issueDate: "2026-10-15",
    dueDate: "2026-10-25",
    paymentStatus: "Unpaid",
    viewStatus: "Sent",
  },
  {
    id: "inv_1044",
    number: "INV-2026-1044",
    company: "Eastgate Projects",
    contact: "Rahul Bora",
    email: "office@eastgate.example",
    total: 18400,
    paid: 0,
    issueDate: "2026-10-16",
    dueDate: "2026-10-23",
    paymentStatus: "Draft",
    viewStatus: "Not sent",
  },
];

const currency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

const dateLabel = (value: string) =>
  new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`));

function StatusBadge({ status }: { status: PaymentStatus }) {
  const styles: Record<PaymentStatus, string> = {
    Paid: "bg-emerald-50 text-emerald-700",
    "Partially paid": "bg-blue-50 text-blue-700",
    Unpaid: "bg-amber-50 text-amber-800",
    Overdue: "bg-red-50 text-red-700",
    Draft: "bg-stone-100 text-stone-600",
    Void: "bg-stone-100 text-stone-500",
  };

  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}

function ViewBadge({ status }: { status: ViewStatus }) {
  const styles: Record<ViewStatus, string> = {
    Viewed: "bg-emerald-50 text-emerald-700",
    Sent: "bg-blue-50 text-blue-700",
    "Not sent": "bg-stone-100 text-stone-600",
  };

  const Icon = status === "Viewed" ? Eye : Mail;

  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${styles[status]}`}
    >
      <Icon size={13} />
      {status}
    </span>
  );
}

function MetricCard({
  label,
  value,
  note,
  icon: Icon,
  iconClass,
}: {
  label: string;
  value: string;
  note: string;
  icon: typeof FileText;
  iconClass: string;
}) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-stone-500">{label}</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-stone-950">
            {value}
          </p>
          <p className="mt-2 text-xs text-stone-500">{note}</p>
        </div>

        <div className={`rounded-lg p-2.5 ${iconClass}`}>
          <Icon size={19} />
        </div>
      </div>
    </div>
  );
}

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState(initialInvoices);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [viewFilter, setViewFilter] = useState("All");
  const [selectedInvoice, setSelectedInvoice] =
    useState<Invoice | null>(null);
  const [notice, setNotice] = useState("");

  const filteredInvoices = useMemo(() => {
    const search = query.trim().toLowerCase();

    return invoices.filter((invoice) => {
      const matchesSearch =
        !search ||
        invoice.number.toLowerCase().includes(search) ||
        invoice.company.toLowerCase().includes(search) ||
        invoice.contact.toLowerCase().includes(search) ||
        invoice.email.toLowerCase().includes(search);

      const matchesStatus =
        statusFilter === "All statuses" ||
        invoice.paymentStatus === statusFilter;

      const matchesView =
        viewFilter === "All" || invoice.viewStatus === viewFilter;

      return matchesSearch && matchesStatus && matchesView;
    });
  }, [invoices, query, statusFilter, viewFilter]);

  const activeInvoices = invoices.filter(
    (invoice) => !["Draft", "Void"].includes(invoice.paymentStatus),
  );

  const totalInvoiced = activeInvoices.reduce(
    (sum, invoice) => sum + invoice.total,
    0,
  );

  const outstanding = activeInvoices.reduce(
    (sum, invoice) => sum + Math.max(invoice.total - invoice.paid, 0),
    0,
  );

  const received = activeInvoices.reduce(
    (sum, invoice) => sum + invoice.paid,
    0,
  );

  const overdue = activeInvoices
    .filter((invoice) => invoice.paymentStatus === "Overdue")
    .reduce(
      (sum, invoice) => sum + Math.max(invoice.total - invoice.paid, 0),
      0,
    );

  function markAsSent(invoice: Invoice) {
    setInvoices((current) =>
      current.map((item) =>
        item.id === invoice.id
          ? {
              ...item,
              viewStatus:
                item.viewStatus === "Not sent" ? "Sent" : item.viewStatus,
            }
          : item,
      ),
    );

    setNotice(
      `Demo action: ${invoice.number} marked as sent. Connect an email provider to send real invoices.`,
    );
  }

  async function copyInvoiceLink(invoice: Invoice) {
    const link = `${window.location.origin}/i/${invoice.id}`;

    try {
      await navigator.clipboard.writeText(link);
      setNotice(`Invoice link copied: ${link}`);
    } catch {
      setNotice(`Copy this invoice link: ${link}`);
    }
  }

  function downloadInvoice(invoice: Invoice) {
    setNotice(
      `PDF download for ${invoice.number} needs a PDF generator connected to your backend.`,
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f7f5] text-stone-900">
      <div className="mx-auto max-w-[1440px] px-4 py-7 sm:px-6 lg:px-8">
        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-stone-500">
              <FileText size={14} />
              Finance / Invoices
            </div>

            <h1 className="text-3xl font-semibold tracking-tight">
              Invoices
            </h1>

            <p className="mt-2 max-w-2xl text-sm text-stone-500">
              Manage rental billing, payment progress, and invoice link activity.
            </p>
          </div>

          <Link
            href="/dashboard/invoices/new"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#263b2e] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1d2f24]"
          >
            <FilePlus2 size={17} />
            Create invoice
          </Link>
        </div>

        {notice && (
          <div className="mb-5 flex items-start justify-between gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            <span>{notice}</span>
            <button
              aria-label="Dismiss message"
              onClick={() => setNotice("")}
              className="shrink-0"
            >
              <X size={17} />
            </button>
          </div>
        )}

        <section className="mb-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            label="Total invoiced"
            value={currency(totalInvoiced)}
            note="Issued invoices, excluding drafts"
            icon={FileText}
            iconClass="bg-stone-100 text-stone-700"
          />
          <MetricCard
            label="Outstanding"
            value={currency(outstanding)}
            note="Remaining balance across invoices"
            icon={Wallet}
            iconClass="bg-amber-50 text-amber-800"
          />
          <MetricCard
            label="Payments received"
            value={currency(received)}
            note="Payments recorded against invoices"
            icon={CheckCircle2}
            iconClass="bg-emerald-50 text-emerald-700"
          />
          <MetricCard
            label="Overdue balance"
            value={currency(overdue)}
            note="Outstanding on overdue invoices"
            icon={CircleAlert}
            iconClass="bg-red-50 text-red-700"
          />
        </section>

        <section className="overflow-hidden rounded-xl border border-stone-200 bg-white">
          <div className="flex flex-col gap-4 border-b border-stone-200 p-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="font-semibold">All invoices</h2>
              <p className="mt-1 text-xs text-stone-500">
                {filteredInvoices.length} records shown
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <label className="relative block sm:w-64">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
                />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search invoice or client..."
                  className="h-10 w-full rounded-lg border border-stone-200 bg-white pl-9 pr-3 text-sm outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-100"
                />
              </label>

              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="h-10 rounded-lg border border-stone-200 bg-white px-3 text-sm outline-none focus:border-stone-400"
              >
                <option>All statuses</option>
                <option>Paid</option>
                <option>Partially paid</option>
                <option>Unpaid</option>
                <option>Overdue</option>
                <option>Draft</option>
                <option>Void</option>
              </select>

              <select
                value={viewFilter}
                onChange={(event) => setViewFilter(event.target.value)}
                className="h-10 rounded-lg border border-stone-200 bg-white px-3 text-sm outline-none focus:border-stone-400"
              >
                <option>All</option>
                <option>Viewed</option>
                <option>Sent</option>
                <option>Not sent</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] border-collapse text-left">
              <thead>
                <tr className="bg-stone-50 text-xs font-medium uppercase tracking-wide text-stone-500">
                  <th className="px-5 py-3.5">Invoice</th>
                  <th className="px-5 py-3.5">Client</th>
                  <th className="px-5 py-3.5">Amount</th>
                  <th className="px-5 py-3.5">Amount due</th>
                  <th className="px-5 py-3.5">Payment status</th>
                  <th className="px-5 py-3.5">Due date</th>
                  <th className="px-5 py-3.5">Link activity</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-stone-100">
                {filteredInvoices.map((invoice) => (
                  <tr
                    key={invoice.id}
                    className="transition hover:bg-stone-50/70"
                  >
                    <td className="px-5 py-4">
                      <button
                        onClick={() => setSelectedInvoice(invoice)}
                        className="text-sm font-semibold text-stone-900 hover:underline"
                      >
                        {invoice.number}
                      </button>
                      <p className="mt-1 text-xs text-stone-500">
                        Issued {dateLabel(invoice.issueDate)}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm font-medium">{invoice.company}</p>
                      <p className="mt-1 text-xs text-stone-500">
                        {invoice.contact}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-sm font-medium tabular-nums">
                      {currency(invoice.total)}
                    </td>

                    <td className="px-5 py-4 text-sm tabular-nums">
                      <span
                        className={
                          invoice.total - invoice.paid > 0
                            ? "font-semibold text-stone-900"
                            : "text-stone-400"
                        }
                      >
                        {currency(Math.max(invoice.total - invoice.paid, 0))}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <StatusBadge status={invoice.paymentStatus} />
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-sm text-stone-700">
                        <CalendarDays size={14} className="text-stone-400" />
                        {dateLabel(invoice.dueDate)}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <ViewBadge status={invoice.viewStatus} />
                      {invoice.firstViewedAt && (
                        <p className="mt-1.5 text-xs text-stone-500">
                          First opened{" "}
                          {new Intl.DateTimeFormat("en-IN", {
                            day: "2-digit",
                            month: "short",
                          }).format(new Date(invoice.firstViewedAt))}
                        </p>
                      )}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          title="View details"
                          onClick={() => setSelectedInvoice(invoice)}
                          className="rounded-md p-2 text-stone-500 hover:bg-stone-100 hover:text-stone-900"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          title="Copy invoice link"
                          onClick={() => copyInvoiceLink(invoice)}
                          className="rounded-md p-2 text-stone-500 hover:bg-stone-100 hover:text-stone-900"
                        >
                          <ArrowUpRight size={16} />
                        </button>
                        <button
                          title="Send invoice"
                          onClick={() => markAsSent(invoice)}
                          className="rounded-md p-2 text-stone-500 hover:bg-stone-100 hover:text-stone-900"
                        >
                          <Send size={16} />
                        </button>
                        <button
                          title="Download PDF"
                          onClick={() => downloadInvoice(invoice)}
                          className="rounded-md p-2 text-stone-500 hover:bg-stone-100 hover:text-stone-900"
                        >
                          <FileText size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredInvoices.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-5 py-14 text-center">
                      <Search
                        className="mx-auto mb-3 text-stone-300"
                        size={24}
                      />
                      <p className="text-sm font-medium">No invoices found</p>
                      <p className="mt-1 text-xs text-stone-500">
                        Try changing your search or filters.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-2 border-t border-stone-200 px-5 py-3 text-xs text-stone-500 sm:flex-row sm:items-center sm:justify-between">
            <span>
              Showing {filteredInvoices.length} of {invoices.length} invoices
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Bell size={13} />
              View tracking requires a backend endpoint.
            </span>
          </div>
        </section>
      </div>

      {selectedInvoice && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/40 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedInvoice(null);
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="invoice-dialog-title"
            className="w-full max-w-xl rounded-2xl bg-white shadow-2xl"
          >
            <div className="flex items-start justify-between border-b border-stone-200 p-5">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-stone-500">
                  Invoice details
                </p>
                <h2
                  id="invoice-dialog-title"
                  className="mt-1 text-xl font-semibold"
                >
                  {selectedInvoice.number}
                </h2>
              </div>
              <button
                onClick={() => setSelectedInvoice(null)}
                aria-label="Close invoice details"
                className="rounded-lg p-2 text-stone-500 hover:bg-stone-100"
              >
                <X size={19} />
              </button>
            </div>

            <div className="space-y-5 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold">{selectedInvoice.company}</p>
                  <p className="mt-1 text-sm text-stone-500">
                    {selectedInvoice.contact}
                  </p>
                  <p className="text-sm text-stone-500">
                    {selectedInvoice.email}
                  </p>
                </div>
                <StatusBadge status={selectedInvoice.paymentStatus} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-stone-50 p-4">
                  <p className="text-xs text-stone-500">Invoice total</p>
                  <p className="mt-1 text-lg font-semibold">
                    {currency(selectedInvoice.total)}
                  </p>
                </div>
                <div className="rounded-lg bg-stone-50 p-4">
                  <p className="text-xs text-stone-500">Balance due</p>
                  <p className="mt-1 text-lg font-semibold">
                    {currency(
                      Math.max(
                        selectedInvoice.total - selectedInvoice.paid,
                        0,
                      ),
                    )}
                  </p>
                </div>
                <div className="rounded-lg border border-stone-200 p-3">
                  <p className="text-xs text-stone-500">Issue date</p>
                  <p className="mt-1 text-sm font-medium">
                    {dateLabel(selectedInvoice.issueDate)}
                  </p>
                </div>
                <div className="rounded-lg border border-stone-200 p-3">
                  <p className="text-xs text-stone-500">Due date</p>
                  <p className="mt-1 text-sm font-medium">
                    {dateLabel(selectedInvoice.dueDate)}
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-stone-200 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold">Invoice link activity</p>
                  <ViewBadge status={selectedInvoice.viewStatus} />
                </div>
                <p className="mt-2 text-sm text-stone-500">
                  {selectedInvoice.firstViewedAt
                    ? `First opened ${new Intl.DateTimeFormat("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      }).format(new Date(selectedInvoice.firstViewedAt))}.`
                    : selectedInvoice.viewStatus === "Sent"
                      ? "The invoice is marked as sent, but no view event has been recorded."
                      : "The invoice has not been sent yet."}
                </p>
                <p className="mt-2 text-xs leading-5 text-stone-400">
                  A link-open event shows that the URL was accessed. Automated
                  email security scanners may also open links.
                </p>
              </div>

              <div className="flex flex-wrap justify-end gap-2">
                <button
                  onClick={() => copyInvoiceLink(selectedInvoice)}
                  className="inline-flex items-center gap-2 rounded-lg border border-stone-200 px-3.5 py-2 text-sm font-medium hover:bg-stone-50"
                >
                  <ArrowUpRight size={15} />
                  Copy client link
                </button>
                <button
                  onClick={() => markAsSent(selectedInvoice)}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#263b2e] px-3.5 py-2 text-sm font-medium text-white hover:bg-[#1d2f24]"
                >
                  <Send size={15} />
                  Mark as sent
                </button>
              </div>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
