
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Plus,
  Trash2,
  FileText,
  CalendarDays,
  UserRound,
  Package,
  Calculator,
  Save,
  Eye,
  ChevronDown,
  X,
} from "lucide-react";

type InvoiceItem = {
  id: string;
  equipment: string;
  startDate: string;
  endDate: string;
  quantity: number;
  rate: number;
  rateUnit: "day" | "week" | "month";
};

const clients = [
  {
    id: "client_001",
    name: "NorthBuild Construction",
    email: "billing@northbuild.example",
    address: "24 Industrial Estate, Bengaluru, Karnataka",
  },
  {
    id: "client_002",
    name: "Apex Infrastructure",
    email: "accounts@apex.example",
    address: "Whitefield, Bengaluru, Karnataka",
  },
  {
    id: "client_003",
    name: "Greenfield Projects",
    email: "finance@greenfield.example",
    address: "Electronic City, Bengaluru, Karnataka",
  },
];

const equipmentOptions = [
  { name: "Mini Excavator", rate: 8500 },
  { name: "Wheel Loader", rate: 12000 },
  { name: "Road Roller", rate: 6500 },
  { name: "Tower Crane", rate: 18000 },
  { name: "Dump Truck", rate: 9500 },
];

const today = new Date().toISOString().slice(0, 10);

function createItem(): InvoiceItem {
  return {
    id: crypto.randomUUID(),
    equipment: "Mini Excavator",
    startDate: today,
    endDate: today,
    quantity: 1,
    rate: 8500,
    rateUnit: "day",
  };
}

function getRentalUnits(item: InvoiceItem) {
  if (!item.startDate || !item.endDate) return 1;

  const start = new Date(`${item.startDate}T00:00:00`);
  const end = new Date(`${item.endDate}T00:00:00`);
  const difference = Math.max(
    1,
    Math.ceil((end.getTime() - start.getTime()) / 86400000) + 1
  );

  if (item.rateUnit === "week") return Math.ceil(difference / 7);
  if (item.rateUnit === "month") return Math.ceil(difference / 30);

  return difference;
}

function money(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-1.5 block text-sm font-medium text-stone-700">
      {children}
    </label>
  );
}

function Section({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: React.ElementType;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-lg border border-stone-200 bg-white">
      <div className="flex items-start gap-3 border-b border-stone-200 px-5 py-4">
        <div className="mt-0.5 rounded-md bg-stone-100 p-2">
          <Icon size={17} className="text-stone-700" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-stone-900">{title}</h2>
          {description && (
            <p className="mt-1 text-xs text-stone-500">{description}</p>
          )}
        </div>
      </div>
      <div className="space-y-4 p-5">{children}</div>
    </section>
  );
}

export default function CreateInvoicePage() {
  const [clientId, setClientId] = useState(clients[0].id);
  const [invoiceNumber, setInvoiceNumber] = useState("INV-2026-0148");
  const [issueDate, setIssueDate] = useState(today);
  const [dueDate, setDueDate] = useState(today);
  const [paymentTerms, setPaymentTerms] = useState("Net 7");
  const [items, setItems] = useState<InvoiceItem[]>([createItem()]);
  const [deliveryFee, setDeliveryFee] = useState("0");
  const [otherCharges, setOtherCharges] = useState("0");
  const [taxRate, setTaxRate] = useState("18");
  const [notes, setNotes] = useState(
    "Please make payment by the due date. Contact us if you have any questions."
  );
  const [discount, setDiscount] = useState("0");
  const [statusMessage, setStatusMessage] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const client = clients.find((entry) => entry.id === clientId) ?? clients[0];

  const lineItems = useMemo(
    () =>
      items.map((item) => ({
        ...item,
        units: getRentalUnits(item),
        amount:
          Math.max(0, item.quantity) *
          Math.max(0, item.rate) *
          getRentalUnits(item),
      })),
    [items]
  );

  const subtotal = lineItems.reduce((sum, item) => sum + item.amount, 0);
  const extras =
    Math.max(0, Number(deliveryFee) || 0) +
    Math.max(0, Number(otherCharges) || 0);
  const discountAmount = Math.min(
    subtotal + extras,
    Math.max(0, Number(discount) || 0)
  );
  const taxableAmount = subtotal + extras - discountAmount;
  const tax = (taxableAmount * Math.max(0, Number(taxRate) || 0)) / 100;
  const total = taxableAmount + tax;

  function updateItem(
    id: string,
    field: keyof InvoiceItem,
    value: string | number
  ) {
    setItems((current) =>
      current.map((item) => {
        if (item.id !== id) return item;

        const updated = { ...item, [field]: value };

        if (field === "equipment") {
          updated.rate =
            equipmentOptions.find((option) => option.name === value)?.rate ??
            0;
        }

        return updated;
      })
    );
  }

  function addItem() {
    setItems((current) => [...current, createItem()]);
  }

  function removeItem(id: string) {
    setItems((current) => current.filter((item) => item.id !== id));
  }

  function handleSave(action: "draft" | "create") {
    if (!clientId || !invoiceNumber.trim() || !issueDate || !dueDate) {
      setStatusMessage("Please complete the required invoice details.");
      return;
    }

    if (new Date(dueDate) < new Date(issueDate)) {
      setStatusMessage("The due date cannot be earlier than the issue date.");
      return;
    }

    if (
      items.length === 0 ||
      items.some(
        (item) =>
          !item.equipment ||
          !item.startDate ||
          !item.endDate ||
          item.endDate < item.startDate ||
          item.quantity < 1 ||
          item.rate < 0
      )
    ) {
      setStatusMessage(
        "Add at least one valid equipment item and check its dates, quantity, and rate."
      );
      return;
    }

    const invoice = {
      invoiceNumber,
      clientId,
      client,
      issueDate,
      dueDate,
      paymentTerms,
      items: lineItems,
      deliveryFee: Number(deliveryFee) || 0,
      otherCharges: Number(otherCharges) || 0,
      discount: discountAmount,
      taxRate: Number(taxRate) || 0,
      subtotal,
      tax,
      total,
      notes,
      status: action === "draft" ? "draft" : "issued",
    };

    // Demo only: connect this action to your authenticated API/database.
    console.log("Invoice payload:", invoice);

    setStatusMessage(
      action === "draft"
        ? "Invoice validated. Connect your API to persist this draft."
        : "Invoice validated. Connect your API to save and issue this invoice."
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f7f5] text-stone-900">
      <main className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link
              href="/dashboard/invoices"
              className="mb-3 inline-flex items-center gap-2 text-sm text-stone-500 hover:text-stone-900"
            >
              <ArrowLeft size={15} />
              Back to invoices
            </Link>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Create invoice
            </h1>
            <p className="mt-1 text-sm text-stone-500">
              Prepare rental charges and billing details for your client.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleSave("draft")}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-stone-300 bg-white px-4 py-2.5 text-sm font-medium hover:bg-stone-50"
            >
              <Save size={16} />
              Save draft
            </button>
            <button
              onClick={() => setShowPreview(true)}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-stone-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-stone-700"
            >
              <Eye size={16} />
              Preview invoice
            </button>
          </div>
        </div>

        {statusMessage && (
          <div
            role="status"
            className="mb-5 flex items-start justify-between gap-3 rounded-md border border-stone-300 bg-white p-3 text-sm text-stone-700"
          >
            <span>{statusMessage}</span>
            <button
              onClick={() => setStatusMessage("")}
              aria-label="Dismiss message"
            >
              <X size={16} />
            </button>
          </div>
        )}

        <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-5">
            <Section
              icon={UserRound}
              title="Client details"
              description="Choose who this invoice is billed to."
            >
              <div>
                <FieldLabel>Client *</FieldLabel>
                <div className="relative">
                  <select
                    value={clientId}
                    onChange={(event) => setClientId(event.target.value)}
                    className="w-full appearance-none rounded-md border border-stone-300 bg-white px-3 py-2.5 pr-9 text-sm outline-none focus:border-stone-600"
                  >
                    {clients.map((entry) => (
                      <option key={entry.id} value={entry.id}>
                        {entry.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-3 top-3 text-stone-500"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <FieldLabel>Billing email</FieldLabel>
                  <input
                    readOnly
                    value={client.email}
                    className="w-full rounded-md border border-stone-200 bg-stone-50 px-3 py-2.5 text-sm text-stone-600"
                  />
                </div>
                <div>
                  <FieldLabel>Billing address</FieldLabel>
                  <input
                    readOnly
                    value={client.address}
                    className="w-full rounded-md border border-stone-200 bg-stone-50 px-3 py-2.5 text-sm text-stone-600"
                  />
                </div>
              </div>
              <p className="text-xs text-stone-500">
                Client information is illustrative. Connect your client database
                to populate real records.
              </p>
            </Section>

            <Section
              icon={FileText}
              title="Invoice details"
              description="Invoice reference and payment schedule."
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <FieldLabel>Invoice number *</FieldLabel>
                  <input
                    value={invoiceNumber}
                    onChange={(event) => setInvoiceNumber(event.target.value)}
                    className="w-full rounded-md border border-stone-300 px-3 py-2.5 text-sm outline-none focus:border-stone-600"
                  />
                </div>
                <div>
                  <FieldLabel>Payment terms</FieldLabel>
                  <select
                    value={paymentTerms}
                    onChange={(event) => setPaymentTerms(event.target.value)}
                    className="w-full rounded-md border border-stone-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-stone-600"
                  >
                    <option>Due on receipt</option>
                    <option>Net 7</option>
                    <option>Net 15</option>
                    <option>Net 30</option>
                  </select>
                </div>
                <div>
                  <FieldLabel>Issue date *</FieldLabel>
                  <input
                    type="date"
                    value={issueDate}
                    onChange={(event) => setIssueDate(event.target.value)}
                    className="w-full rounded-md border border-stone-300 px-3 py-2.5 text-sm outline-none focus:border-stone-600"
                  />
                </div>
                <div>
                  <FieldLabel>Due date *</FieldLabel>
                  <input
                    type="date"
                    min={issueDate}
                    value={dueDate}
                    onChange={(event) => setDueDate(event.target.value)}
                    className="w-full rounded-md border border-stone-300 px-3 py-2.5 text-sm outline-none focus:border-stone-600"
                  />
                </div>
              </div>
            </Section>

            <Section
              icon={Package}
              title="Equipment and rental charges"
              description="Add the equipment units and the agreed rental rates."
            >
              <div className="space-y-4">
                {items.map((item, index) => {
                  const calculated = lineItems[index];

                  return (
                    <div
                      key={item.id}
                      className="rounded-md border border-stone-200 p-4"
                    >
                      <div className="mb-4 flex items-center justify-between">
                        <p className="text-sm font-semibold">
                          Equipment item {index + 1}
                        </p>
                        <button
                          type="button"
                          disabled={items.length === 1}
                          onClick={() => removeItem(item.id)}
                          className="inline-flex items-center gap-1.5 text-xs text-red-600 hover:text-red-800 disabled:cursor-not-allowed disabled:opacity-30"
                        >
                          <Trash2 size={14} />
                          Remove
                        </button>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                          <FieldLabel>Equipment</FieldLabel>
                          <select
                            value={item.equipment}
                            onChange={(event) =>
                              updateItem(item.id, "equipment", event.target.value)
                            }
                            className="w-full rounded-md border border-stone-300 bg-white px-3 py-2.5 text-sm"
                          >
                            {equipmentOptions.map((equipment) => (
                              <option
                                key={equipment.name}
                                value={equipment.name}
                              >
                                {equipment.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <FieldLabel>Rental start</FieldLabel>
                          <input
                            type="date"
                            value={item.startDate}
                            onChange={(event) =>
                              updateItem(item.id, "startDate", event.target.value)
                            }
                            className="w-full rounded-md border border-stone-300 px-3 py-2.5 text-sm"
                          />
                        </div>
                        <div>
                          <FieldLabel>Rental end</FieldLabel>
                          <input
                            type="date"
                            min={item.startDate}
                            value={item.endDate}
                            onChange={(event) =>
                              updateItem(item.id, "endDate", event.target.value)
                            }
                            className="w-full rounded-md border border-stone-300 px-3 py-2.5 text-sm"
                          />
                        </div>
                        <div>
                          <FieldLabel>Quantity (units)</FieldLabel>
                          <input
                            type="number"
                            min="1"
                            step="1"
                            value={item.quantity}
                            onChange={(event) =>
                              updateItem(
                                item.id,
                                "quantity",
                                Math.max(1, Number(event.target.value) || 1)
                              )
                            }
                            className="w-full rounded-md border border-stone-300 px-3 py-2.5 text-sm"
                          />
                        </div>
                        <div>
                          <FieldLabel>Rental rate (₹)</FieldLabel>
                          <div className="flex">
                            <input
                              type="number"
                              min="0"
                              value={item.rate}
                              onChange={(event) =>
                                updateItem(
                                  item.id,
                                  "rate",
                                  Math.max(0, Number(event.target.value) || 0)
                                )
                              }
                              className="min-w-0 flex-1 rounded-l-md border border-stone-300 px-3 py-2.5 text-sm"
                            />
                            <select
                              value={item.rateUnit}
                              onChange={(event) =>
                                updateItem(
                                  item.id,
                                  "rateUnit",
                                  event.target.value as InvoiceItem["rateUnit"]
                                )
                              }
                              className="rounded-r-md border border-l-0 border-stone-300 bg-stone-50 px-2 text-sm"
                              aria-label="Rental rate unit"
                            >
                              <option value="day">/ day</option>
                              <option value="week">/ week</option>
                              <option value="month">/ month</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between border-t border-stone-100 pt-3">
                        <p className="text-xs text-stone-500">
                          {calculated.units} billable{" "}
                          {item.rateUnit === "day"
                            ? "day(s)"
                            : item.rateUnit === "week"
                              ? "week(s)"
                              : "month(s)"}{" "}
                          × {item.quantity} unit(s)
                        </p>
                        <p className="text-sm font-semibold tabular-nums">
                          {money(calculated.amount)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={addItem}
                className="inline-flex items-center gap-2 rounded-md border border-stone-300 px-3 py-2.5 text-sm font-medium hover:bg-stone-50"
              >
                <Plus size={16} />
                Add equipment
              </button>
            </Section>

            <Section
              icon={Calculator}
              title="Additional charges and tax"
              description="Include delivery, other agreed charges, discounts, and applicable tax."
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <FieldLabel>Delivery fee (₹)</FieldLabel>
                  <input
                    type="number"
                    min="0"
                    value={deliveryFee}
                    onChange={(event) => setDeliveryFee(event.target.value)}
                    className="w-full rounded-md border border-stone-300 px-3 py-2.5 text-sm"
                  />
                </div>
                <div>
                  <FieldLabel>Other charges (₹)</FieldLabel>
                  <input
                    type="number"
                    min="0"
                    value={otherCharges}
                    onChange={(event) => setOtherCharges(event.target.value)}
                    className="w-full rounded-md border border-stone-300 px-3 py-2.5 text-sm"
                  />
                </div>
                <div>
                  <FieldLabel>Discount (₹)</FieldLabel>
                  <input
                    type="number"
                    min="0"
                    value={discount}
                    onChange={(event) => setDiscount(event.target.value)}
                    className="w-full rounded-md border border-stone-300 px-3 py-2.5 text-sm"
                  />
                </div>
                <div>
                  <FieldLabel>Tax rate (%)</FieldLabel>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={taxRate}
                    onChange={(event) => setTaxRate(event.target.value)}
                    className="w-full rounded-md border border-stone-300 px-3 py-2.5 text-sm"
                  />
                  <p className="mt-1 text-xs text-stone-500">
                    Confirm the applicable GST rate before issuing.
                  </p>
                </div>
              </div>
              <div>
                <FieldLabel>Invoice notes</FieldLabel>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  className="w-full resize-y rounded-md border border-stone-300 px-3 py-2.5 text-sm outline-none focus:border-stone-600"
                  placeholder="Add payment instructions or notes for the client..."
                />
              </div>
            </Section>
          </div>

          <aside className="space-y-5 xl:sticky xl:top-6">
            <section className="rounded-lg border border-stone-200 bg-white">
              <div className="border-b border-stone-200 p-5">
                <p className="text-xs font-medium uppercase tracking-wider text-stone-500">
                  Invoice summary
                </p>
                <p className="mt-2 break-words text-xl font-semibold">
                  {invoiceNumber || "Invoice number"}
                </p>
                <p className="mt-1 text-sm text-stone-500">{client.name}</p>
              </div>

              <div className="space-y-3 p-5 text-sm">
                <div className="flex justify-between gap-3">
                  <span className="text-stone-500">Equipment subtotal</span>
                  <span className="font-medium tabular-nums">
                    {money(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-stone-500">Additional charges</span>
                  <span className="font-medium tabular-nums">
                    {money(extras)}
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between gap-3">
                    <span className="text-stone-500">Discount</span>
                    <span className="font-medium tabular-nums">
                      −{money(discountAmount)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between gap-3">
                  <span className="text-stone-500">Tax ({taxRate || 0}%)</span>
                  <span className="font-medium tabular-nums">
                    {money(tax)}
                  </span>
                </div>
                <div className="border-t border-stone-200 pt-4">
                  <p className="text-sm text-stone-500">Total due</p>
                  <p className="mt-1 text-3xl font-semibold tracking-tight tabular-nums">
                    {money(total)}
                  </p>
                </div>
              </div>

              <div className="border-t border-stone-200 bg-stone-50 p-5">
                <div className="flex items-start gap-2 text-sm">
                  <CalendarDays
                    size={16}
                    className="mt-0.5 shrink-0 text-stone-500"
                  />
                  <div>
                    <p className="font-medium">Payment due</p>
                    <p className="mt-1 text-stone-500">{dueDate || "Not set"}</p>
                    <p className="mt-1 text-xs text-stone-500">{paymentTerms}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 p-5">
                <button
                  onClick={() => handleSave("draft")}
                  className="flex w-full items-center justify-center gap-2 rounded-md border border-stone-300 bg-white px-4 py-3 text-sm font-medium hover:bg-stone-50"
                >
                  <Save size={16} />
                  Save as draft
                </button>
                <button
                  onClick={() => handleSave("create")}
                  className="flex w-full items-center justify-center gap-2 rounded-md bg-stone-900 px-4 py-3 text-sm font-medium text-white hover:bg-stone-700"
                >
                  <FileText size={16} />
                  Create invoice
                </button>
                <p className="text-center text-xs leading-5 text-stone-500">
                  Review all rental dates, quantities, and charges before
                  issuing.
                </p>
              </div>
            </section>

            <div className="rounded-lg border border-stone-200 bg-white p-4">
              <p className="text-sm font-medium">Before you issue</p>
              <ul className="mt-3 space-y-2 text-xs leading-5 text-stone-600">
                <li>• Verify client billing information.</li>
                <li>• Confirm the rental period and agreed rates.</li>
                <li>• Check the applicable GST treatment.</li>
                <li>• Confirm the payment due date.</li>
              </ul>
            </div>
          </aside>
        </div>
      </main>

      {showPreview && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-4 sm:items-center"
          onClick={() => setShowPreview(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="invoice-preview-title"
            className="my-6 w-full max-w-2xl rounded-lg bg-white shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-stone-200 p-5">
              <div>
                <h2
                  id="invoice-preview-title"
                  className="text-lg font-semibold"
                >
                  Invoice preview
                </h2>
                <p className="mt-1 text-xs text-stone-500">
                  Review before saving or issuing.
                </p>
              </div>
              <button
                onClick={() => setShowPreview(false)}
                aria-label="Close invoice preview"
                className="rounded-md p-2 hover:bg-stone-100"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-6 p-5 sm:p-8">
              <div className="flex flex-col justify-between gap-4 sm:flex-row">
                <div>
                  <p className="text-2xl font-bold tracking-tight">RentLogi</p>
                  <p className="mt-1 text-sm text-stone-500">
                    Equipment rental services
                  </p>
                </div>
                <div className="sm:text-right">
                  <p className="text-xs uppercase tracking-widest text-stone-500">
                    Invoice
                  </p>
                  <p className="mt-1 text-lg font-semibold">{invoiceNumber}</p>
                  <p className="mt-1 text-sm text-stone-500">
                    Issued: {issueDate}
                  </p>
                  <p className="text-sm text-stone-500">Due: {dueDate}</p>
                </div>
              </div>

              <div className="grid gap-4 border-y border-stone-200 py-5 sm:grid-cols-2">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-stone-500">
                    Bill to
                  </p>
                  <p className="text-sm font-semibold">{client.name}</p>
                  <p className="mt-1 text-sm text-stone-600">{client.email}</p>
                  <p className="mt-1 text-sm text-stone-600">{client.address}</p>
                </div>
                <div className="sm:text-right">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-stone-500">
                    Payment terms
                  </p>
                  <p className="text-sm">{paymentTerms}</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[480px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-stone-200 text-xs text-stone-500">
                      <th className="py-3 pr-3 font-medium">Description</th>
                      <th className="px-2 py-3 text-right font-medium">Qty</th>
                      <th className="px-2 py-3 text-right font-medium">Rate</th>
                      <th className="py-3 pl-2 text-right font-medium">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lineItems.map((item) => (
                      <tr key={item.id} className="border-b border-stone-100">
                        <td className="py-3 pr-3">
                          <p className="font-medium">{item.equipment}</p>
                          <p className="mt-1 text-xs text-stone-500">
                            {item.startDate} – {item.endDate}
                          </p>
                        </td>
                        <td className="px-2 py-3 text-right">{item.quantity}</td>
                        <td className="px-2 py-3 text-right">
                          {money(item.rate)}/{item.rateUnit}
                        </td>
                        <td className="py-3 pl-2 text-right font-medium">
                          {money(item.amount)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="ml-auto max-w-xs space-y-2 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-stone-500">Subtotal</span>
                  <span>{money(subtotal)}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-stone-500">Additional charges</span>
                  <span>{money(extras)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between gap-4">
                    <span className="text-stone-500">Discount</span>
                    <span>−{money(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between gap-4">
                  <span className="text-stone-500">Tax ({taxRate || 0}%)</span>
                  <span>{money(tax)}</span>
                </div>
                <div className="flex justify-between border-t border-stone-200 pt-3 text-base font-semibold">
                  <span>Total due</span>
                  <span>{money(total)}</span>
                </div>
              </div>

              {notes && (
                <div className="border-t border-stone-200 pt-4">
                  <p className="text-sm font-semibold">Notes</p>
                  <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-stone-600">
                    {notes}
                  </p>
                </div>
              )}

              <div className="flex justify-end border-t border-stone-200 pt-4">
                <button
                  onClick={() => setShowPreview(false)}
                  className="rounded-md bg-stone-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-stone-700"
                >
                  Back to editing
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
