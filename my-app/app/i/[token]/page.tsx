
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  CheckCircle2,
  Clock3,
  FileText,
  Mail,
  Printer,
} from "lucide-react";

type PublicInvoice = {
  number: string;
  company: string;
  contactEmail: string;
  issueDate: string;
  dueDate: string;
  rentalPeriod: string;
  status: "Paid" | "Partially paid" | "Unpaid" | "Overdue";
  items: {
    description: string;
    quantity: number;
    rate: number;
    amount: number;
  }[];
  subtotal: number;
  tax: number;
  total: number;
  amountPaid: number;
  notes: string;
};

const demoInvoices: Record<string, PublicInvoice> = {
  inv_1048: {
    number: "INV-2026-1048",
    company: "Northline Construction",
    contactEmail: "accounts@northline.example",
    issueDate: "12 Oct 2026",
    dueDate: "19 Oct 2026",
    rentalPeriod: "12 Oct – 18 Oct 2026",
    status: "Paid",
    items: [
      {
        description: "Mini excavator rental",
        quantity: 1,
        rate: 31500,
        amount: 31500,
      },
      {
        description: "Delivery and pickup",
        quantity: 1,
        rate: 17100,
        amount: 17100,
      },
    ],
    subtotal: 48600,
    tax: 0,
    total: 48600,
    amountPaid: 48600,
    notes:
      "Thank you for choosing RentLogi. Please contact us if you have any questions about this invoice.",
  },
  inv_1047: {
    number: "INV-2026-1047",
    company: "Summit Infrastructure",
    contactEmail: "finance@summit.example",
    issueDate: "10 Oct 2026",
    dueDate: "20 Oct 2026",
    rentalPeriod: "10 Oct – 16 Oct 2026",
    status: "Partially paid",
    items: [
      {
        description: "Excavator 20T rental",
        quantity: 1,
        rate: 72500,
        amount: 72500,
      },
    ],
    subtotal: 72500,
    tax: 0,
    total: 72500,
    amountPaid: 25000,
    notes: "Please use the invoice number as the payment reference.",
  },
};

const money = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export default function PublicInvoicePage() {
  const params = useParams<{ token: string }>();
  const token = params.token;
  const [viewTracked, setViewTracked] = useState(false);

  useEffect(() => {
    if (!token || viewTracked) return;

    let cancelled = false;

    async function trackView() {
      try {
        const response = await fetch(
          `/api/public/invoices/${encodeURIComponent(token)}/view`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          },
        );

        if (!cancelled && response.ok) {
          setViewTracked(true);
        }
      } catch {
        // Tracking failure should not prevent the invoice from displaying.
      }
    }

    void trackView();

    return () => {
      cancelled = true;
    };
  }, [token, viewTracked]);

  const invoice = demoInvoices[token];

  if (!invoice) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7f7f5] px-4">
        <section className="w-full max-w-md rounded-2xl border border-stone-200 bg-white p-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-stone-100">
            <FileText size={22} className="text-stone-600" />
          </div>
          <h1 className="mt-4 text-xl font-semibold">
            Invoice link unavailable
          </h1>
          <p className="mt-2 text-sm leading-6 text-stone-500">
            This demo link is not associated with an invoice. Please contact
            the rental company for an updated link.
          </p>
          <Link
            href="/dashboard/invoices"
            className="mt-5 inline-flex rounded-lg bg-[#263b2e] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#1d2f24]"
          >
            Back to dashboard
          </Link>
        </section>
      </main>
    );
  }

  const amountDue = Math.max(invoice.total - invoice.amountPaid, 0);

  const statusStyles =
    invoice.status === "Paid"
      ? "bg-emerald-50 text-emerald-700"
      : invoice.status === "Overdue"
        ? "bg-red-50 text-red-700"
        : invoice.status === "Partially paid"
          ? "bg-blue-50 text-blue-700"
          : "bg-amber-50 text-amber-800";

  return (
    <main className="min-h-screen bg-[#f7f7f5] px-4 py-8 text-stone-900 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-4xl">
        <header className="mb-7 flex items-center justify-between gap-4">
          <div>
            <p className="text-xl font-bold tracking-tight">RENTLOGI</p>
            <p className="mt-1 text-xs text-stone-500">
              Equipment rental services
            </p>
          </div>

          <span className="inline-flex items-center gap-1.5 rounded-full bg-stone-100 px-3 py-1.5 text-xs font-medium text-stone-600">
            <FileText size={13} />
            Client invoice
          </span>
        </header>

        <section className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
          <div className="border-b border-stone-200 p-6 sm:p-9">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
                  Invoice
                </p>
                <h1 className="mt-2 text-3xl font-semibold tracking-tight">
                  {invoice.number}
                </h1>
                <p className="mt-2 text-sm text-stone-500">
                  Rental period: {invoice.rentalPeriod}
                </p>
              </div>

              <div className="sm:text-right">
                <span
                  className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${statusStyles}`}
                >
                  {invoice.status}
                </span>
                <p className="mt-3 text-sm text-stone-500">Amount due</p>
                <p className="mt-1 text-3xl font-semibold tracking-tight">
                  {money(amountDue)}
                </p>
                <p className="mt-1 text-xs text-stone-500">
                  Due {invoice.dueDate}
                </p>
              </div>
            </div>

            <div className="mt-7 grid gap-5 border-t border-stone-100 pt-6 sm:grid-cols-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                  Billed to
                </p>
                <p className="mt-2 font-semibold">{invoice.company}</p>
                <p className="mt-1 text-sm text-stone-500">
                  {invoice.contactEmail}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                  Issue date
                </p>
                <p className="mt-2 text-sm font-medium">{invoice.issueDate}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                  Payment due
                </p>
                <p className="mt-2 text-sm font-medium">{invoice.dueDate}</p>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-9">
            <h2 className="font-semibold">Rental charges</h2>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[480px] text-left text-sm">
                <thead>
                  <tr className="border-y border-stone-200 text-xs uppercase tracking-wide text-stone-500">
                    <th className="py-3 pr-3">Description</th>
                    <th className="px-3 py-3 text-right">Qty</th>
                    <th className="px-3 py-3 text-right">Rate</th>
                    <th className="py-3 pl-3 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {invoice.items.map((item, index) => (
                    <tr key={`${item.description}-${index}`}>
                      <td className="py-4 pr-3 font-medium">
                        {item.description}
                      </td>
                      <td className="px-3 py-4 text-right">{item.quantity}</td>
                      <td className="px-3 py-4 text-right">
                        {money(item.rate)}
                      </td>
                      <td className="py-4 pl-3 text-right font-medium">
                        {money(item.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="ml-auto mt-6 max-w-sm space-y-3 text-sm">
              <div className="flex justify-between text-stone-500">
                <span>Subtotal</span>
                <span>{money(invoice.subtotal)}</span>
              </div>
              <div className="flex justify-between text-stone-500">
                <span>Tax</span>
                <span>{money(invoice.tax)}</span>
              </div>
              <div className="flex justify-between border-t border-stone-200 pt-3 font-semibold">
                <span>Invoice total</span>
                <span>{money(invoice.total)}</span>
              </div>
              <div className="flex justify-between text-stone-500">
                <span>Payments received</span>
                <span>−{money(invoice.amountPaid)}</span>
              </div>
              <div className="flex justify-between rounded-lg bg-stone-50 p-3.5 text-base font-semibold">
                <span>Balance due</span>
                <span>{money(amountDue)}</span>
              </div>
            </div>

            {invoice.notes && (
              <div className="mt-8 rounded-xl border border-stone-200 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                  Note from RentLogi
                </p>
                <p className="mt-2 text-sm leading-6 text-stone-600">
                  {invoice.notes}
                </p>
              </div>
            )}

            <div className="mt-8 flex flex-col gap-3 border-t border-stone-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="inline-flex items-center gap-2 text-xs text-stone-500">
                <Clock3 size={14} />
                This invoice link is for your records.
              </p>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-stone-200 px-3.5 py-2.5 text-sm font-semibold hover:bg-stone-50"
                >
                  <Printer size={15} />
                  Print
                </button>

                <a
                  href={`mailto:${invoice.contactEmail}?subject=${encodeURIComponent(
                    `Question about ${invoice.number}`,
                  )}`}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#263b2e] px-3.5 py-2.5 text-sm font-semibold text-white hover:bg-[#1d2f24]"
                >
                  <Mail size={15} />
                  Contact billing
                </a>
              </div>
            </div>
          </div>
        </section>

        <footer className="mt-5 flex items-start justify-center gap-2 px-3 text-center text-xs leading-5 text-stone-400">
          <CheckCircle2 size={14} className="mt-0.5 shrink-0" />
          <p>
            Viewing this page may be recorded to help the sender understand
            whether the invoice link was accessed. This does not prove the
            invoice was read.
          </p>
        </footer>
      </div>
    </main>
  );
}
