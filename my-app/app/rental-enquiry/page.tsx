
"use client";

import { Suspense, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock3,
  MapPin,
  ShieldCheck,
  Truck,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { getAllEquipment } from "@/data/equipment";

const equipmentOptions = [
  ...getAllEquipment().map((equipment) => ({
    value: equipment.id,
    label: equipment.name,
  })),
  { value: "other", label: "Other equipment" },
];

const durations = [
  { value: "day", label: "1 day" },
  { value: "week", label: "1 week" },
  { value: "two-weeks", label: "2 weeks" },
  { value: "month", label: "1 month" },
  { value: "flexible", label: "Flexible / not sure" },
];

type QuoteForm = {
  name: string;
  company: string;
  email: string;
  phone: string;
  equipment: string;
  quantity: string;
  duration: string;
  startDate: string;
  endDate: string;
  location: string;
  operator: string;
  delivery: string;
  details: string;
};

type FormErrors = Partial<Record<keyof QuoteForm, string>>;

const initialForm: QuoteForm = {
  name: "",
  company: "",
  email: "",
  phone: "",
  equipment: equipmentOptions[0].value,
  quantity: "1",
  duration: "week",
  startDate: "",
  endDate: "",
  location: "",
  operator: "unsure",
  delivery: "unsure",
  details: "",
};

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-[#343936]">
        {label}
        {required && <span className="ml-1 text-orange-700">*</span>}
      </label>
      {children}
      {error && <p className="text-sm text-red-700">{error}</p>}
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-[#d9d8d1] bg-white px-3.5 py-3 text-sm text-[#292d2a] outline-none transition placeholder:text-[#9b9c95] focus:border-[#b95d2c] focus:ring-2 focus:ring-[#b95d2c]/15";

function SectionHeading({
  number,
  icon,
  title,
  description,
}: {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-6 flex items-start gap-3.5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f2eee6] text-[#9b4c27]">
        {icon}
      </div>
      <div>
        <p className="text-[11px] font-semibold tracking-[0.16em] text-[#a45b35]">
          STEP {number}
        </p>
        <h2 className="mt-1 text-lg font-semibold tracking-tight text-[#292d2a]">
          {title}
        </h2>
        <p className="mt-1 text-sm leading-6 text-[#73756e]">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function RequestQuotePage() {
  return (
    <Suspense
      fallback={
        <main
          className="flex min-h-screen items-center justify-center bg-[#f7f6f2] px-4"
          aria-busy="true"
        >
          <p className="text-sm text-[#73756e]">Preparing your enquiry…</p>
        </main>
      }
    >
      <RequestQuoteForm />
    </Suspense>
  );
}

function RequestQuoteForm() {
  const searchParams = useSearchParams();
  const requestedEquipment = searchParams.get("equipment");
  const initialSelectedEquipment =
    equipmentOptions.find((item) => item.value === requestedEquipment)?.value ??
    initialForm.equipment;
  const [form, setForm] = useState<QuoteForm>(() => ({
    ...initialForm,
    equipment: initialSelectedEquipment,
  }));
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success"
  >("idle");

  function update<K extends keyof QuoteForm>(
    key: K,
    value: QuoteForm[K]
  ) {
    setForm((previous) => ({ ...previous, [key]: value }));
    setErrors((previous) => ({ ...previous, [key]: undefined }));
    setStatus("idle");
  }

  function validate(): FormErrors {
    const next: FormErrors = {};

    if (!form.name.trim()) {
      next.name = "Enter your full name.";
    } else if (form.name.trim().length > 100) {
      next.name = "Name must be 100 characters or fewer.";
    }

    if (
      !form.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ) {
      next.email = "Enter a valid email address.";
    }

    const digits = form.phone.replace(/\D/g, "");
    if (!form.phone.trim() || digits.length < 7 || digits.length > 15) {
      next.phone = "Enter a valid phone number.";
    }

    if (!equipmentOptions.some((item) => item.value === form.equipment)) {
      next.equipment = "Select a valid equipment type.";
    }

    if (!form.location.trim()) {
      next.location = "Enter your project location.";
    }

    if (
      form.startDate &&
      form.endDate &&
      form.endDate < form.startDate
    ) {
      next.endDate = "End date must be on or after the start date.";
    }

    if (
      form.startDate &&
      form.startDate < new Date().toLocaleDateString("en-CA")
    ) {
      next.startDate = "Choose today or a future date.";
    }

    if (form.details.length > 2000) {
      next.details = "Keep additional details under 2,000 characters.";
    }

    return next;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      const firstInvalid = document.querySelector(
        '[aria-invalid="true"]'
      );
      firstInvalid?.scrollIntoView({ behavior: "smooth", block: "center" });
      (firstInvalid as HTMLElement | null)?.focus();
      return;
    }

    // DEMO ONLY:
    // Replace this with a POST request to your server-side quote API.
    // Do not show a real submission confirmation until the server
    // confirms that the enquiry has been saved successfully.
    setStatus("submitting");
    await new Promise((resolve) => setTimeout(resolve, 500));
    setStatus("success");
  }

  const selectedEquipment =
    equipmentOptions.find((item) => item.value === form.equipment)?.label ??
    "Select equipment";

  const selectedDuration =
    durations.find((item) => item.value === form.duration)?.label ??
    "Not selected";

  if (status === "success") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7f6f2] px-4 py-16">
        <div className="w-full max-w-lg rounded-2xl border border-[#e4e1d9] bg-white p-8 text-center shadow-sm sm:p-12">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#edf4e9] text-[#477746]">
            <CheckCircle2 size={32} />
          </div>
          <h1 className="mt-6 text-2xl font-semibold tracking-tight text-[#292d2a]">
            Your form is validated
          </h1>
          <p className="mt-3 text-sm leading-7 text-[#73756e]">
            This is a demo confirmation. No enquiry has been sent or saved.
            Connect the form to your backend before using it with real
            customers.
          </p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="mt-8 rounded-lg bg-amber-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#874021]"
          >
            Return to form
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f6f2] text-[#292d2a]">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#292d2f] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <Link
            href="/"
            className="flex items-center gap-2.5"
            aria-label="RentLogi home"
          >
            <div className="w-8 h-8 bg-stone-900 rounded-sm flex items-center justify-center text-white font-black text-base tracking-tighter border-t-2 border-amber-600 shadow-xs group-hover:bg-amber-600 transition-colors">
              <span>RL</span>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-gray-50 leading-none">
                Rent<span className="text-amber-600">Logis</span>
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-500 mt-0.5">
                Equipment Fleet
              </span>
            </div>
          </Link>

          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-[#deded9] transition hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to website
          </Link>
        </div>
      </header>

      {/* Intro */}
      <section className="relative overflow-hidden bg-[#292d2f] text-white">
        <div className="pointer-events-none absolute -right-20 -top-36 h-96 w-96 rounded-full border border-white/[0.07]" />
        <div className="pointer-events-none absolute -right-5 -top-20 h-64 w-64 rounded-full border border-white/[0.07]" />

        <div className="relative mx-auto max-w-7xl px-5 pb-12 pt-10 sm:px-8 sm:pb-16 sm:pt-14">
          <p className="text-xs font-semibold tracking-[0.2em] text-amber-600">
            EQUIPMENT RENTAL ENQUIRY
          </p>
          <h1 className="mt-4 max-w-2xl text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Let&apos;s get your next
            <br className="hidden sm:block" /> project moving.
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-[#c6c9c5] sm:text-base">
            Tell us what equipment you need and when you need it. Our team
            can review your requirements and help you work out the next step.
          </p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-xs text-[#d6d8d4] sm:text-sm">
            <span className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-amber-600" />
              No-obligation enquiry
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-amber-600" />
              Your details stay private
            </span>
          </div>
        </div>
      </section>

      {/* Form and summary */}
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-8 sm:px-8 sm:py-12 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start lg:gap-10">
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          {/* Contact */}
          <section className="rounded-xl border border-[#e4e1d9] bg-white p-5 sm:p-8">
            <SectionHeading
              number="01"
              icon={<UserRound size={20} />}
              title="Your contact information"
              description="Let us know how to reach you about your enquiry."
            />

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Full name" required error={errors.name}>
                <input
                  className={inputClass}
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  aria-invalid={!!errors.name}
                  required
                />
              </Field>

              <Field label="Company or business">
                <input
                  className={inputClass}
                  autoComplete="organization"
                  value={form.company}
                  onChange={(e) => update("company", e.target.value)}
                  placeholder="Company name (optional)"
                />
              </Field>

              <Field label="Email address" required error={errors.email}>
                <input
                  className={inputClass}
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="you@company.com"
                  aria-invalid={!!errors.email}
                  required
                />
              </Field>

              <Field label="Phone number" required error={errors.phone}>
                <input
                  className={inputClass}
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="+91 98765 43210"
                  aria-invalid={!!errors.phone}
                  required
                />
              </Field>
            </div>
          </section>

          {/* Equipment */}
          <section className="rounded-xl border border-[#e4e1d9] bg-white p-5 sm:p-8">
            <SectionHeading
              number="02"
              icon={<Truck size={20} />}
              title="Your rental requirements"
              description="Choose your equipment and estimated rental period."
            />

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Equipment required" required error={errors.equipment}>
                <div className="relative">
                  <select
                    className={`${inputClass} appearance-none pr-10`}
                    value={form.equipment}
                    onChange={(e) => update("equipment", e.target.value)}
                    aria-invalid={!!errors.equipment}
                  >
                    {equipmentOptions.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#73756e]"
                  />
                </div>
              </Field>

              <Field label="Quantity" required>
                <div className="relative">
                  <select
                    className={`${inputClass} appearance-none pr-10`}
                    value={form.quantity}
                    onChange={(e) => update("quantity", e.target.value)}
                  >
                    <option value="1">1 machine</option>
                    <option value="2">2 machines</option>
                    <option value="3">3 machines</option>
                    <option value="4">4 machines</option>
                    <option value="5+">5+ machines</option>
                  </select>
                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#73756e]"
                  />
                </div>
              </Field>

              <Field label="Estimated duration" required>
                <div className="relative">
                  <select
                    className={`${inputClass} appearance-none pr-10`}
                    value={form.duration}
                    onChange={(e) => update("duration", e.target.value)}
                  >
                    {durations.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#73756e]"
                  />
                </div>
              </Field>

              <div className="hidden sm:block" />

              <Field label="Preferred start date" error={errors.startDate}>
                <input
                  className={inputClass}
                  type="date"
                  min={new Date().toLocaleDateString("en-CA")}
                  value={form.startDate}
                  onChange={(e) => {
                    update("startDate", e.target.value);
                    if (
                      form.endDate &&
                      e.target.value &&
                      form.endDate < e.target.value
                    ) {
                      update("endDate", "");
                    }
                  }}
                  aria-invalid={!!errors.startDate}
                />
              </Field>

              <Field label="Expected end date" error={errors.endDate}>
                <input
                  className={inputClass}
                  type="date"
                  min={
                    form.startDate ||
                    new Date().toLocaleDateString("en-CA")
                  }
                  value={form.endDate}
                  onChange={(e) => update("endDate", e.target.value)}
                  aria-invalid={!!errors.endDate}
                />
              </Field>
            </div>

            <p className="mt-4 flex items-start gap-2 text-xs leading-5 text-[#73756e]">
              <CalendarDays size={15} className="mt-0.5 shrink-0" />
              Dates are estimates. The rental team will confirm availability
              before the rental is agreed.
            </p>
          </section>

          {/* Project details */}
          <section className="rounded-xl border border-[#e4e1d9] bg-white p-5 sm:p-8">
            <SectionHeading
              number="03"
              icon={<MapPin size={20} />}
              title="Project details"
              description="Help us understand where and how you will use the equipment."
            />

            <div className="space-y-6">
              <Field
                label="Project location"
                required
                error={errors.location}
              >
                <input
                  className={inputClass}
                  autoComplete="street-address"
                  value={form.location}
                  onChange={(e) => update("location", e.target.value)}
                  placeholder="City, area or delivery postcode"
                  aria-invalid={!!errors.location}
                  required
                />
                <p className="text-xs text-[#73756e]">
                  A city or postcode is enough to start.
                </p>
              </Field>

              <fieldset>
                <legend className="text-sm font-medium text-[#343936]">
                  Do you need an operator?
                </legend>
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  {[
                    { value: "yes", label: "Yes, please" },
                    { value: "no", label: "No, we have one" },
                    { value: "unsure", label: "Not sure yet" },
                  ].map((item) => (
                    <label
                      key={item.value}
                      className={`flex cursor-pointer items-center gap-2.5 rounded-lg border p-3 text-sm transition ${
                        form.operator === item.value
                          ? "border-[#b95d2c] bg-[#fcf4ed] text-[#773d20]"
                          : "border-[#e4e1d9] hover:border-[#bdb9ae]"
                      }`}
                    >
                      <input
                        type="radio"
                        name="operator"
                        value={item.value}
                        checked={form.operator === item.value}
                        onChange={(e) => update("operator", e.target.value)}
                        className="accent-[#a9522c]"
                      />
                      {item.label}
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className="text-sm font-medium text-[#343936]">
                  Delivery preference
                </legend>
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  {[
                    { value: "delivery", label: "Deliver to site" },
                    { value: "collection", label: "I'll collect" },
                    { value: "unsure", label: "Please advise" },
                  ].map((item) => (
                    <label
                      key={item.value}
                      className={`flex cursor-pointer items-center gap-2.5 rounded-lg border p-3 text-sm transition ${
                        form.delivery === item.value
                          ? "border-[#b95d2c] bg-[#fcf4ed] text-[#773d20]"
                          : "border-[#e4e1d9] hover:border-[#bdb9ae]"
                      }`}
                    >
                      <input
                        type="radio"
                        name="delivery"
                        value={item.value}
                        checked={form.delivery === item.value}
                        onChange={(e) => update("delivery", e.target.value)}
                        className="accent-[#a9522c]"
                      />
                      {item.label}
                    </label>
                  ))}
                </div>
              </fieldset>

              <Field
                label="Additional details"
                error={errors.details}
              >
                <textarea
                  className={`${inputClass} min-h-28 resize-y`}
                  maxLength={2000}
                  value={form.details}
                  onChange={(e) => update("details", e.target.value)}
                  placeholder="Tell us about your project, site conditions, or any special requirements..."
                  aria-invalid={!!errors.details}
                />
                <p className="text-right text-xs text-[#8b8d86]">
                  {form.details.length}/2000
                </p>
              </Field>
            </div>
          </section>

          {/* Submit */}
          <div className="rounded-xl border border-[#e4e1d9] bg-white p-5 sm:p-6">
            <p className="mb-5 text-xs leading-6 text-[#73756e]">
              By submitting, you agree that RentLogi may contact you about
              this rental enquiry. Add your privacy policy before launching
              this form to real customers.
            </p>
            <button
              type="submit"
              disabled={status === "submitting"}
              className="flex w-full items-center justify-center gap-2 rounded-lg text-white bg-amber-600 px-5 py-3.5 text-sm font-semibold  transition hover:bg-[#874021] focus:outline-none focus:ring-4 focus:ring-[#b95d2c]/20 disabled:cursor-wait disabled:opacity-70 sm:w-auto sm:min-w-56"
            >
              {status === "submitting" ? (
                "Validating..."
              ) : (
                <>
                  Request my quote
                  <ArrowRight size={17} />
                </>
              )}
            </button>
            <p className="mt-3 text-xs text-[#8b8d86]">
              No payment is required to submit an enquiry.
            </p>
          </div>
        </form>

        {/* Summary sidebar */}
        <aside className="space-y-5 lg:sticky lg:top-6">
          <div className="overflow-hidden rounded-xl border border-[#dedbd2] bg-white">
            <div className="bg-[#eae7df] px-5 py-4">
              <p className="text-[11px] font-semibold tracking-[0.15em] text-[#74746c]">
                YOUR ENQUIRY
              </p>
              <h2 className="mt-1 text-lg font-semibold text-[#292d2a]">
                Rental summary
              </h2>
            </div>

            <div className="space-y-5 p-5">
              <div>
                <p className="text-xs text-[#85867e]">Equipment</p>
                <p className="mt-1 font-semibold text-[#292d2a]">
                  {selectedEquipment}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-[#85867e]">Quantity</p>
                  <p className="mt-1 text-sm font-medium">
                    {form.quantity === "5+" ? "5+ machines" : `${form.quantity} machine${form.quantity === "1" ? "" : "s"}`}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#85867e]">Duration</p>
                  <p className="mt-1 text-sm font-medium">{selectedDuration}</p>
                </div>
              </div>

              <div>
                <p className="text-xs text-[#85867e]">Start date</p>
                <p className="mt-1 text-sm font-medium">
                  {form.startDate || "Flexible / not selected"}
                </p>
              </div>

              <div>
                <p className="text-xs text-[#85867e]">Project location</p>
                <p className="mt-1 flex items-start gap-2 text-sm font-medium">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-[#a9522c]" />
                  <span>{form.location || "Not provided yet"}</span>
                </p>
              </div>

              <div className="border-t border-[#e9e7e0] pt-4">
                <p className="text-xs leading-5 text-[#73756e]">
                  Final rental rates, delivery charges, and availability
                  depend on your requirements and will be confirmed by the
                  rental team.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-[#292d2f] p-5 text-white">
            <div className="flex items-center gap-2.5">
              <Clock3 size={19} className="text-[#e7a16e]" />
              <h3 className="font-semibold">What happens next?</h3>
            </div>
            <ol className="mt-5 space-y-4">
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs">
                  1
                </span>
                <p className="text-sm leading-6 text-[#d5d7d3]">
                  Submit your equipment and project requirements.
                </p>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs">
                  2
                </span>
                <p className="text-sm leading-6 text-[#d5d7d3]">
                  The rental team reviews your request and checks availability.
                </p>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs">
                  3
                </span>
                <p className="text-sm leading-6 text-[#d5d7d3]">
                  Receive a quote with the applicable rental terms.
                </p>
              </li>
            </ol>
          </div>
        </aside>
      </div>

      <footer className="border-t border-[#e4e1d9] bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-[#85867e] sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© {new Date().getFullYear()} RentLogi. Demo website.</p>
          <p>Equipment rates and availability are subject to confirmation.</p>
        </div>
      </footer>
    </main>
  );
}
