
"use client";

import { useState } from "react";
import {
  Building2,
  UserRound,
  Users,
  FileText,
  CalendarClock,
  CreditCard,
  Bell,
  ShieldCheck,
  Settings2,
  Search,
  ChevronRight,
  Camera,
  Save,
  RotateCcw,
  Check,
  Globe,
  Mail,
  Phone,
  MapPin,
  CircleHelp,
  LockKeyhole,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Clock,
  Truck,
  Receipt,
  CalendarDays,
  AlertTriangle,
  Webhook,
  KeyRound,
  Link2,
  LogOut,
  X,
} from "lucide-react";

type SettingSection =
  | "Company profile"
  | "My account"
  | "Team & permissions"
  | "Invoices & quotes"
  | "Rental operations"
  | "Payments"
  | "Notifications"
  | "Security & integrations";

const navigation: {
  title: SettingSection;
  description: string;
  icon: typeof Building2;
}[] = [
  {
    title: "Company profile",
    description: "Business details and branding",
    icon: Building2,
  },
  {
    title: "My account",
    description: "Personal information",
    icon: UserRound,
  },
  {
    title: "Team & permissions",
    description: "Manage team access",
    icon: Users,
  },
  {
    title: "Invoices & quotes",
    description: "Billing and document defaults",
    icon: FileText,
  },
  {
    title: "Rental operations",
    description: "Delivery and return policies",
    icon: CalendarClock,
  },
  {
    title: "Payments",
    description: "Payment methods and deposits",
    icon: CreditCard,
  },
  {
    title: "Notifications",
    description: "Alerts and reminders",
    icon: Bell,
  },
  {
    title: "Security & integrations",
    description: "Access and connected services",
    icon: ShieldCheck,
  },
];

const initialCompany = {
  businessName: "RentLogi Equipment Rentals",
  legalName: "RentLogi Equipment Rentals Pvt. Ltd.",
  email: "accounts@rentlogi.example",
  phone: "+91 98765 43210",
  website: "https://rentlogi.example",
  address: "42 Industrial Layout",
  city: "Bengaluru",
  state: "Karnataka",
  postalCode: "560048",
  country: "India",
  currency: "INR (₹)",
  timezone: "Asia/Kolkata (IST)",
  taxId: "29ABCDE1234F1Z5",
};

const initialAccount = {
  name: "Rakesh Pegu",
  email: "rakesh@example.com",
  phone: "+91 98765 43210",
  role: "Workspace owner",
};

const initialInvoice = {
  invoicePrefix: "INV-",
  nextInvoiceNumber: "1049",
  quotePrefix: "QUO-",
  nextQuoteNumber: "205",
  paymentTerms: "15",
  defaultTax: "18",
  lateFee: "0",
  notes: "Thank you for choosing RentLogi.",
  showLogo: true,
  showBankDetails: true,
  showTaxId: true,
};

const initialRental = {
  minimumDuration: "1",
  gracePeriod: "0",
  reminderDays: "2",
  depositPercent: "20",
  requireInspection: true,
  requireDeliveryConfirmation: true,
  allowExtensions: true,
  autoMarkOverdue: true,
};

const initialPayments = {
  bankName: "HDFC Bank",
  accountHolder: "RentLogi Equipment Rentals",
  accountNumber: "XXXX XXXX 4821",
  ifsc: "HDFC0001234",
  onlinePayments: false,
  bankTransfer: true,
  cashPayments: true,
  depositsRequired: true,
};

const initialNotifications = {
  newRental: true,
  deliveryReminder: true,
  returnReminder: true,
  overdueRental: true,
  unpaidInvoice: true,
  paymentReceived: true,
  maintenanceAlert: true,
  weeklySummary: false,
  email: true,
  inApp: true,
};

const initialSecurity = {
  twoFactor: false,
  loginAlerts: true,
  sessionTimeout: "30",
  apiKeyLabel: "Production API key",
  webhookUrl: "",
};

const initialTeam = [
  {
    id: "USR-001",
    name: "Rakesh Pegu",
    email: "rakesh@example.com",
    role: "Owner",
    status: "Active",
    initials: "RP",
  },
  {
    id: "USR-002",
    name: "Ananya Sharma",
    email: "ananya@example.com",
    role: "Manager",
    status: "Active",
    initials: "AS",
  },
  {
    id: "USR-003",
    name: "Arjun Kumar",
    email: "arjun@example.com",
    role: "Operations",
    status: "Invited",
    initials: "AK",
  },
];

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  hint,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  hint?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-stone-700">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-10 w-full rounded-lg border border-stone-200 bg-white px-3 text-sm text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-[#527763] focus:ring-2 focus:ring-[#527763]/10"
      />
      {hint && <p className="text-xs leading-5 text-stone-500">{hint}</p>}
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-stone-700">
        {label}
      </label>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-10 w-full rounded-lg border border-stone-200 bg-white px-3 text-sm text-stone-800 outline-none transition focus:border-[#527763] focus:ring-2 focus:ring-[#527763]/10"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function Toggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="min-w-0">
        <p className="text-sm font-medium text-stone-800">{label}</p>
        <p className="mt-1 text-xs leading-5 text-stone-500">
          {description}
        </p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          checked ? "bg-[#244b3b]" : "bg-stone-300"
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition ${
            checked ? "left-[22px]" : "left-0.5"
          }`}
        />
      </button>
    </div>
  );
}

function SectionHeading({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold tracking-tight text-stone-900">
        {title}
      </h2>
      <p className="mt-1 text-sm leading-6 text-stone-500">{description}</p>
    </div>
  );
}

function FormSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-b border-stone-100 py-6 first:pt-0 last:border-b-0 last:pb-0">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-stone-800">{title}</h3>
        {description && (
          <p className="mt-1 text-xs leading-5 text-stone-500">
            {description}
          </p>
        )}
      </div>
      {children}
    </section>
  );
}

function SaveBar({
  onSave,
  onReset,
  saved,
}: {
  onSave: () => void;
  onReset: () => void;
  saved: boolean;
}) {
  return (
    <div className="sticky bottom-0 z-10 -mx-5 mt-8 flex flex-col gap-3 border-t border-stone-200 bg-white/95 px-5 py-4 backdrop-blur sm:-mx-7 sm:flex-row sm:items-center sm:justify-between sm:px-7">
      <p className="text-xs text-stone-500">
        {saved
          ? "Demo changes saved in this page."
          : "Changes are local demo state and won't persist after refresh."}
      </p>
      <div className="flex items-center gap-2">
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 rounded-lg border border-stone-200 px-3 py-2 text-sm font-medium text-stone-600 hover:bg-stone-50"
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </button>
        <button
          onClick={onSave}
          className="inline-flex items-center gap-2 rounded-lg bg-[#244b3b] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#193a2d]"
        >
          <Save className="h-4 w-4" />
          Save changes
        </button>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const [activeSection, setActiveSection] =
    useState<SettingSection>("Company profile");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [saved, setSaved] = useState(false);

  const [company, setCompany] = useState(initialCompany);
  const [account, setAccount] = useState(initialAccount);
  const [invoice, setInvoice] = useState(initialInvoice);
  const [rental, setRental] = useState(initialRental);
  const [payments, setPayments] = useState(initialPayments);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [security, setSecurity] = useState(initialSecurity);
  const [team, setTeam] = useState(initialTeam);
  const [showApiKey, setShowApiKey] = useState(false);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("Operations");
  const [inviteError, setInviteError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  function updateCompany(
    key: keyof typeof initialCompany,
    value: string,
  ) {
    setCompany((current) => ({ ...current, [key]: value }));
    setSaved(false);
  }

  function updateAccount(key: keyof typeof initialAccount, value: string) {
    setAccount((current) => ({ ...current, [key]: value }));
    setSaved(false);
  }

  function updateInvoice(
    key: keyof typeof initialInvoice,
    value: string | boolean,
  ) {
    setInvoice((current) => ({ ...current, [key]: value }));
    setSaved(false);
  }

  function updateRental(
    key: keyof typeof initialRental,
    value: string | boolean,
  ) {
    setRental((current) => ({ ...current, [key]: value }));
    setSaved(false);
  }

  function updatePayments(
    key: keyof typeof initialPayments,
    value: string | boolean,
  ) {
    setPayments((current) => ({ ...current, [key]: value }));
    setSaved(false);
  }

  function updateNotifications(
    key: keyof typeof initialNotifications,
    value: boolean,
  ) {
    setNotifications((current) => ({ ...current, [key]: value }));
    setSaved(false);
  }

  function updateSecurity(
    key: keyof typeof initialSecurity,
    value: string | boolean,
  ) {
    setSecurity((current) => ({ ...current, [key]: value }));
    setSaved(false);
  }

  function resetSection() {
    switch (activeSection) {
      case "Company profile":
        setCompany(initialCompany);
        break;
      case "My account":
        setAccount(initialAccount);
        break;
      case "Invoices & quotes":
        setInvoice(initialInvoice);
        break;
      case "Rental operations":
        setRental(initialRental);
        break;
      case "Payments":
        setPayments(initialPayments);
        break;
      case "Notifications":
        setNotifications(initialNotifications);
        break;
      case "Security & integrations":
        setSecurity(initialSecurity);
        break;
      case "Team & permissions":
        setTeam(initialTeam);
        break;
    }
    setSaved(false);
  }

  function inviteMember(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedEmail = inviteEmail.trim().toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setInviteError("Enter a valid email address.");
      return;
    }

    if (team.some((member) => member.email.toLowerCase() === normalizedEmail)) {
      setInviteError("This email is already in the team.");
      return;
    }

    const name = normalizedEmail.split("@")[0];

    setTeam((current) => [
      ...current,
      {
        id: `USR-${String(current.length + 1).padStart(3, "0")}`,
        name,
        email: normalizedEmail,
        role: inviteRole,
        status: "Invited",
        initials: name.slice(0, 2).toUpperCase(),
      },
    ]);

    setInviteEmail("");
    setInviteRole("Operations");
    setInviteError("");
    setInviteOpen(false);
    setSaved(false);
  }

  function renderCompany() {
    return (
      <>
        <SectionHeading
          title="Company profile"
          description="Manage the business information displayed on quotes, invoices, and customer communications."
        />

        <FormSection title="Business branding" description="Your business identity across RentLogi.">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-[#244b3b] text-white">
              <Truck className="h-8 w-8" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-stone-800">
                Company logo
              </p>
              <p className="mt-1 text-xs text-stone-500">
                Demo placeholder. Connect file upload to manage your logo.
              </p>
            </div>
            <button
              disabled
              className="inline-flex items-center gap-2 self-start rounded-lg border border-stone-200 px-3 py-2 text-sm text-stone-400"
            >
              <Camera className="h-4 w-4" />
              Upload logo
            </button>
          </div>
        </FormSection>

        <FormSection title="Business information">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Business name"
              value={company.businessName}
              onChange={(v) => updateCompany("businessName", v)}
            />
            <Field
              label="Legal business name"
              value={company.legalName}
              onChange={(v) => updateCompany("legalName", v)}
            />
            <Field
              label="Business email"
              value={company.email}
              type="email"
              onChange={(v) => updateCompany("email", v)}
            />
            <Field
              label="Phone number"
              value={company.phone}
              onChange={(v) => updateCompany("phone", v)}
            />
            <Field
              label="Website"
              value={company.website}
              onChange={(v) => updateCompany("website", v)}
            />
            <Field
              label="GSTIN / Tax ID"
              value={company.taxId}
              onChange={(v) => updateCompany("taxId", v)}
              hint="Use the registration applicable to your business."
            />
          </div>
        </FormSection>

        <FormSection title="Business address">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Street address"
              value={company.address}
              onChange={(v) => updateCompany("address", v)}
            />
            <Field
              label="City"
              value={company.city}
              onChange={(v) => updateCompany("city", v)}
            />
            <Field
              label="State"
              value={company.state}
              onChange={(v) => updateCompany("state", v)}
            />
            <Field
              label="Postal code"
              value={company.postalCode}
              onChange={(v) => updateCompany("postalCode", v)}
            />
            <Field
              label="Country"
              value={company.country}
              onChange={(v) => updateCompany("country", v)}
            />
          </div>
        </FormSection>

        <FormSection title="Regional preferences">
          <div className="grid gap-4 sm:grid-cols-2">
            <SelectField
              label="Currency"
              value={company.currency}
              onChange={(v) => updateCompany("currency", v)}
              options={["INR (₹)", "USD ($)", "EUR (€)", "GBP (£)"]}
            />
            <SelectField
              label="Timezone"
              value={company.timezone}
              onChange={(v) => updateCompany("timezone", v)}
              options={[
                "Asia/Kolkata (IST)",
                "Asia/Dubai (GST)",
                "Europe/London (GMT)",
                "America/New_York (ET)",
              ]}
            />
          </div>
        </FormSection>
      </>
    );
  }

  
function renderAccount() {
  return (
    <>
      <SectionHeading
        title="My account"
        description="Manage your personal profile and sign-in details."
      />

      <FormSection title="Personal information">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#e5ede7] text-lg font-semibold text-[#244b3b]">
            {account.name
              .split(" ")
              .map((part) => part[0])
              .join("")
              .slice(0, 2)}
          </div>

          <div>
            <p className="font-semibold text-stone-900">
              {account.name}
            </p>
            <p className="mt-1 text-xs text-stone-500">
              {account.role}
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Field
            label="Full name"
            value={account.name}
            onChange={(v) => updateAccount("name", v)}
          />

          <Field
            label="Email address"
            type="email"
            value={account.email}
            onChange={(v) => updateAccount("email", v)}
          />

          <Field
            label="Phone number"
            value={account.phone}
            onChange={(v) => updateAccount("phone", v)}
          />

          <Field
            label="Workspace role"
            value={account.role}
            onChange={() => {}}
            hint="Your role is controlled by workspace permissions."
          />
        </div>
      </FormSection>

      <FormSection title="Password & authentication">
        <p className="mb-3 text-xs text-stone-500">
          Password changes should be handled by your authentication
          provider.
        </p>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value="demo-password-not-real"
            readOnly
            className="h-10 w-full rounded-lg border border-stone-200 bg-stone-50 px-3 pr-11 text-sm"
          />

          <button
            type="button"
            onClick={() => setShowPassword((value) => !value)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>

        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Left side: Change password */}
          <button
            type="button"
            disabled
            className="self-start rounded-lg border border-stone-200 px-3 py-2 text-sm text-stone-400"
          >
            Change password
          </button>

          {/* Right side: Account actions */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => {
                window.location.href = "/login";
              }}
              className="inline-flex items-center gap-2 rounded-lg border border-stone-200 px-3 py-2 text-sm font-medium text-stone-600 transition hover:bg-stone-50"
            >
              <LogOut className="h-4 w-4" />
              Log out
            </button>

            <button
              type="button"
              onClick={() => {
                const confirmed = window.confirm(
                  "Are you sure you want to delete your account? This action may permanently delete your account and associated data."
                );

                if (confirmed) {
                  window.alert(
                    "Account deletion is not connected yet. Connect this action to your account deletion API."
                  );
                }
              }}
              className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
              Delete account
            </button>
          </div>
        </div>
      </FormSection>
    </>
  );
}


  function renderTeam() {
    return (
      <>
        <SectionHeading
          title="Team & permissions"
          description="Manage workspace members and the access they have to your rental business."
        />

        <div className="mb-5 flex flex-col gap-3 rounded-xl border border-stone-200 bg-stone-50 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold">
              {team.length} team members
            </p>
            <p className="mt-1 text-xs text-stone-500">
              {team.filter((m) => m.status === "Active").length} active ·{" "}
              {team.filter((m) => m.status === "Invited").length} invited
            </p>
          </div>
          <button
            onClick={() => setInviteOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#244b3b] px-3 py-2.5 text-sm font-medium text-white hover:bg-[#193a2d]"
          >
            <Plus className="h-4 w-4" />
            Invite member
          </button>
        </div>

        <div className="overflow-x-auto rounded-xl border border-stone-200">
          <table className="w-full min-w-[570px] text-left">
            <thead className="bg-stone-50">
              <tr>
                {["Member", "Role", "Status", ""].map((heading) => (
                  <th
                    key={heading}
                    className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-stone-500"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {team.map((member) => (
                <tr key={member.id}>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-100 text-xs font-semibold text-stone-600">
                        {member.initials}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{member.name}</p>
                        <p className="mt-1 text-xs text-stone-500">
                          {member.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <select
                      value={member.role}
                      disabled={member.role === "Owner"}
                      onChange={(event) => {
                        setTeam((current) =>
                          current.map((m) =>
                            m.id === member.id
                              ? { ...m, role: event.target.value }
                              : m,
                          ),
                        );
                        setSaved(false);
                      }}
                      className="rounded-lg border border-stone-200 bg-white px-2 py-1.5 text-xs disabled:bg-stone-50 disabled:text-stone-400"
                    >
                      {["Owner", "Admin", "Manager", "Operations", "Viewer"].map(
                        (role) => (
                          <option key={role}>{role}</option>
                        ),
                      )}
                    </select>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        member.status === "Active"
                          ? "bg-emerald-50 text-emerald-800"
                          : "bg-amber-50 text-amber-800"
                      }`}
                    >
                      {member.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    {member.role !== "Owner" && (
                      <button
                        aria-label={`Remove ${member.email}`}
                        onClick={() => {
                          setTeam((current) =>
                            current.filter((m) => m.id !== member.id),
                          );
                          setSaved(false);
                        }}
                        className="rounded-lg p-2 text-stone-400 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <FormSection title="Role descriptions">
          <div className="space-y-3">
            {[
              ["Admin", "Manage most workspace settings and business records."],
              ["Manager", "Manage customers, rentals, equipment, and invoices."],
              ["Operations", "Handle delivery, pickup, returns, and inspections."],
              ["Viewer", "View permitted records without editing them."],
            ].map(([role, description]) => (
              <div key={role} className="flex gap-3">
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-stone-100">
                  <Users className="h-3.5 w-3.5 text-stone-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">{role}</p>
                  <p className="mt-1 text-xs leading-5 text-stone-500">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </FormSection>
      </>
    );
  }

  function renderInvoices() {
    return (
      <>
        <SectionHeading
          title="Invoices & quotes"
          description="Set default billing rules and choose what appears on customer documents."
        />

        <FormSection title="Document numbering" description="Use unique sequences for invoices and quotes.">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Invoice prefix"
              value={invoice.invoicePrefix}
              onChange={(v) => updateInvoice("invoicePrefix", v)}
            />
            <Field
              label="Next invoice number"
              value={invoice.nextInvoiceNumber}
              onChange={(v) => updateInvoice("nextInvoiceNumber", v)}
              type="number"
            />
            <Field
              label="Quote prefix"
              value={invoice.quotePrefix}
              onChange={(v) => updateInvoice("quotePrefix", v)}
            />
            <Field
              label="Next quote number"
              value={invoice.nextQuoteNumber}
              onChange={(v) => updateInvoice("nextQuoteNumber", v)}
              type="number"
            />
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg bg-stone-50 p-3">
              <p className="text-xs text-stone-500">Next invoice preview</p>
              <p className="mt-1 font-semibold">
                {invoice.invoicePrefix}
                {invoice.nextInvoiceNumber || "0001"}
              </p>
            </div>
            <div className="rounded-lg bg-stone-50 p-3">
              <p className="text-xs text-stone-500">Next quote preview</p>
              <p className="mt-1 font-semibold">
                {invoice.quotePrefix}
                {invoice.nextQuoteNumber || "0001"}
              </p>
            </div>
          </div>
        </FormSection>

        <FormSection title="Default billing rules">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Payment terms (days)"
              type="number"
              value={invoice.paymentTerms}
              onChange={(v) => updateInvoice("paymentTerms", v)}
            />
            <Field
              label="Default tax rate (%)"
              type="number"
              value={invoice.defaultTax}
              onChange={(v) => updateInvoice("defaultTax", v)}
              hint="Actual tax treatment depends on the transaction and applicable law."
            />
            <Field
              label="Late fee (%)"
              type="number"
              value={invoice.lateFee}
              onChange={(v) => updateInvoice("lateFee", v)}
              hint="Set to 0 to disable a default late fee."
            />
          </div>
        </FormSection>

        <FormSection title="Document appearance">
          <Toggle
            label="Show company logo"
            description="Include the business logo on generated PDFs."
            checked={invoice.showLogo}
            onChange={(v) => updateInvoice("showLogo", v)}
          />
          <Toggle
            label="Show bank details"
            description="Display bank transfer details on invoices."
            checked={invoice.showBankDetails}
            onChange={(v) => updateInvoice("showBankDetails", v)}
          />
          <Toggle
            label="Show tax registration"
            description="Include the company tax ID on documents."
            checked={invoice.showTaxId}
            onChange={(v) => updateInvoice("showTaxId", v)}
          />
        </FormSection>

        <FormSection title="Default invoice notes">
          <textarea
            value={invoice.notes}
            onChange={(event) => updateInvoice("notes", event.target.value)}
            rows={4}
            className="w-full resize-y rounded-lg border border-stone-200 p-3 text-sm outline-none focus:border-[#527763] focus:ring-2 focus:ring-[#527763]/10"
          />
        </FormSection>
      </>
    );
  }

  function renderRentalOperations() {
    return (
      <>
        <SectionHeading
          title="Rental operations"
          description="Configure the default rules for rental durations, deliveries, returns, and equipment handover."
        />

        <FormSection title="Rental defaults">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Minimum rental duration (days)"
              type="number"
              value={rental.minimumDuration}
              onChange={(v) => updateRental("minimumDuration", v)}
            />
            <Field
              label="Return grace period (hours)"
              type="number"
              value={rental.gracePeriod}
              onChange={(v) => updateRental("gracePeriod", v)}
              hint="Any grace period should be reflected in your rental agreement."
            />
            <Field
              label="Return reminder (days before)"
              type="number"
              value={rental.reminderDays}
              onChange={(v) => updateRental("reminderDays", v)}
            />
            <Field
              label="Default security deposit (%)"
              type="number"
              value={rental.depositPercent}
              onChange={(v) => updateRental("depositPercent", v)}
            />
          </div>
        </FormSection>

        <FormSection title="Delivery & handover">
          <Toggle
            label="Require delivery confirmation"
            description="Require an authorized team member to confirm delivery."
            checked={rental.requireDeliveryConfirmation}
            onChange={(v) => updateRental("requireDeliveryConfirmation", v)}
          />
          <Toggle
            label="Require equipment inspection"
            description="Record equipment condition before dispatch or after return."
            checked={rental.requireInspection}
            onChange={(v) => updateRental("requireInspection", v)}
          />
        </FormSection>

        <FormSection title="Return management">
          <Toggle
            label="Allow rental extensions"
            description="Let authorized staff extend a rental after checking availability."
            checked={rental.allowExtensions}
            onChange={(v) => updateRental("allowExtensions", v)}
          />
          <Toggle
            label="Automatically flag overdue rentals"
            description="Mark a rental overdue when its return deadline passes and it has not been returned."
            checked={rental.autoMarkOverdue}
            onChange={(v) => updateRental("autoMarkOverdue", v)}
          />
        </FormSection>

        <div className="mt-5 flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
          <p className="text-xs leading-5 text-amber-900">
            Production tip: calculate overdue status from the rental due date,
            business timezone, grace period, and actual return timestamp on
            the server. A client-side toggle alone cannot enforce this rule.
          </p>
        </div>
      </>
    );
  }

  function renderPayments() {
    return (
      <>
        <SectionHeading
          title="Payments"
          description="Manage payment methods and default deposit preferences for customer rentals."
        />

        <FormSection title="Accepted payment methods">
          <Toggle
            label="Bank transfer"
            description="Allow customers to pay using your business bank account."
            checked={payments.bankTransfer}
            onChange={(v) => updatePayments("bankTransfer", v)}
          />
          <Toggle
            label="Cash payments"
            description="Allow staff to record cash payments against an invoice."
            checked={payments.cashPayments}
            onChange={(v) => updatePayments("cashPayments", v)}
          />
          <Toggle
            label="Online payments"
            description="Enable online checkout after connecting a payment provider."
            checked={payments.onlinePayments}
            onChange={(v) => updatePayments("onlinePayments", v)}
          />
          <Toggle
            label="Require a security deposit"
            description="Use the configured default deposit when creating rentals."
            checked={payments.depositsRequired}
            onChange={(v) => updatePayments("depositsRequired", v)}
          />
        </FormSection>

        <FormSection title="Bank transfer details">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Bank name"
              value={payments.bankName}
              onChange={(v) => updatePayments("bankName", v)}
            />
            <Field
              label="Account holder"
              value={payments.accountHolder}
              onChange={(v) => updatePayments("accountHolder", v)}
            />
            <Field
              label="Account number"
              value={payments.accountNumber}
              onChange={(v) => updatePayments("accountNumber", v)}
              hint="Demo value only. Use secure handling for real account data."
            />
            <Field
              label="IFSC code"
              value={payments.ifsc}
              onChange={(v) => updatePayments("ifsc", v)}
            />
          </div>
        </FormSection>

        <FormSection title="Payment gateway">
          <div className="flex flex-col gap-4 rounded-xl border border-stone-200 p-4 sm:flex-row sm:items-center">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-stone-100">
              <CreditCard className="h-5 w-5 text-stone-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">Online payment provider</p>
              <p className="mt-1 text-xs leading-5 text-stone-500">
                Connect a provider such as Razorpay or Stripe to accept online
                payments and receive payment status updates.
              </p>
              <span className="mt-2 inline-flex rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-800">
                Not connected
              </span>
            </div>
            <button
              disabled
              className="rounded-lg border border-stone-200 px-3 py-2 text-sm text-stone-400"
            >
              Configure
            </button>
          </div>
        </FormSection>
      </>
    );
  }

  function renderNotifications() {
    return (
      <>
        <SectionHeading
          title="Notifications"
          description="Choose which events your team should be notified about."
        />

        <FormSection title="Notification channels">
          <Toggle
            label="Email notifications"
            description="Send alerts to configured account and team email addresses."
            checked={notifications.email}
            onChange={(v) => updateNotifications("email", v)}
          />
          <Toggle
            label="In-app notifications"
            description="Show alerts inside the RentLogi dashboard."
            checked={notifications.inApp}
            onChange={(v) => updateNotifications("inApp", v)}
          />
        </FormSection>

        <FormSection title="Rental notifications">
          <Toggle
            label="New rental created"
            description="Notify the team when a new rental is booked."
            checked={notifications.newRental}
            onChange={(v) => updateNotifications("newRental", v)}
          />
          <Toggle
            label="Upcoming delivery"
            description="Remind the team about scheduled equipment deliveries."
            checked={notifications.deliveryReminder}
            onChange={(v) => updateNotifications("deliveryReminder", v)}
          />
          <Toggle
            label="Upcoming return"
            description="Send reminders before equipment is due back."
            checked={notifications.returnReminder}
            onChange={(v) => updateNotifications("returnReminder", v)}
          />
          <Toggle
            label="Overdue equipment"
            description="Alert staff when equipment has not been returned on time."
            checked={notifications.overdueRental}
            onChange={(v) => updateNotifications("overdueRental", v)}
          />
          <Toggle
            label="Maintenance alerts"
            description="Notify staff about maintenance and inspection requirements."
            checked={notifications.maintenanceAlert}
            onChange={(v) => updateNotifications("maintenanceAlert", v)}
          />
        </FormSection>

        <FormSection title="Billing notifications">
          <Toggle
            label="Unpaid invoices"
            description="Remind the team about invoices that remain unpaid."
            checked={notifications.unpaidInvoice}
            onChange={(v) => updateNotifications("unpaidInvoice", v)}
          />
          <Toggle
            label="Payment received"
            description="Notify the team when a payment is recorded."
            checked={notifications.paymentReceived}
            onChange={(v) => updateNotifications("paymentReceived", v)}
          />
        </FormSection>

        <FormSection title="Reports">
          <Toggle
            label="Weekly business summary"
            description="Receive a weekly summary of rentals, revenue, and outstanding invoices."
            checked={notifications.weeklySummary}
            onChange={(v) => updateNotifications("weeklySummary", v)}
          />
        </FormSection>
      </>
    );
  }

  function renderSecurity() {
    return (
      <>
        <SectionHeading
          title="Security & integrations"
          description="Manage access controls, connected services, and integration settings."
        />

        <FormSection title="Account security">
          <Toggle
            label="Two-factor authentication"
            description="Require an additional verification step when signing in."
            checked={security.twoFactor}
            onChange={(v) => updateSecurity("twoFactor", v)}
          />
          <Toggle
            label="New sign-in alerts"
            description="Notify you when a new sign-in is detected."
            checked={security.loginAlerts}
            onChange={(v) => updateSecurity("loginAlerts", v)}
          />
          <div className="mt-4 max-w-sm">
            <SelectField
              label="Session timeout"
              value={security.sessionTimeout}
              onChange={(v) => updateSecurity("sessionTimeout", v)}
              options={["15", "30", "60", "120"]}
            />
            <p className="mt-1.5 text-xs text-stone-500">
              Minutes of inactivity before requiring sign-in again. Enforce
              this on the server or authentication provider.
            </p>
          </div>
        </FormSection>

        <FormSection title="API keys">
          <div className="rounded-xl border border-stone-200 p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-stone-100">
                <KeyRound className="h-5 w-5 text-stone-600" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">{security.apiKeyLabel}</p>
                <p className="mt-1 text-xs text-stone-500">
                  Demo placeholder · No real key is configured
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <code className="min-w-0 flex-1 truncate rounded-lg bg-stone-50 px-3 py-2 text-xs text-stone-600">
                    {showApiKey
                      ? "DEMO_KEY_NOT_A_REAL_SECRET"
                      : "••••••••••••••••••••••"}
                  </code>
                  <button
                    onClick={() => setShowApiKey((value) => !value)}
                    aria-label={showApiKey ? "Hide key" : "Show key"}
                    className="rounded-lg border border-stone-200 p-2 text-stone-500 hover:bg-stone-50"
                  >
                    {showApiKey ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <button
              disabled
              className="mt-4 inline-flex items-center gap-2 rounded-lg border border-stone-200 px-3 py-2 text-sm text-stone-400"
            >
              <Plus className="h-4 w-4" />
              Generate API key
            </button>
          </div>
        </FormSection>

        <FormSection title="Webhooks" description="Receive event updates in your own application.">
          <Field
            label="Webhook endpoint URL"
            value={security.webhookUrl}
            onChange={(v) => updateSecurity("webhookUrl", v)}
            placeholder="https://your-domain.com/webhooks/rentlogi"
            hint="In production, verify HTTPS, sign outgoing payloads, and support webhook retries."
          />
          <button
            disabled
            className="mt-3 inline-flex items-center gap-2 rounded-lg border border-stone-200 px-3 py-2 text-sm text-stone-400"
          >
            <Webhook className="h-4 w-4" />
            Test webhook
          </button>
        </FormSection>

        <FormSection title="Connected services">
          {[
            {
              name: "Email provider",
              description: "Transactional emails and reminders",
              icon: Mail,
              status: "Not connected",
            },
            {
              name: "Accounting software",
              description: "Sync invoices and payments",
              icon: Receipt,
              status: "Not connected",
            },
          ].map((service) => (
            <div
              key={service.name}
              className="flex items-center gap-3 border-b border-stone-100 py-4 last:border-0"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-stone-100">
                <service.icon className="h-5 w-5 text-stone-600" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{service.name}</p>
                <p className="mt-1 text-xs text-stone-500">
                  {service.description}
                </p>
              </div>
              <span className="text-xs text-stone-400">{service.status}</span>
              <Link2 className="h-4 w-4 text-stone-400" />
            </div>
          ))}
        </FormSection>
      </>
    );
  }

  function renderSection() {
    switch (activeSection) {
      case "Company profile":
        return renderCompany();
      case "My account":
        return renderAccount();
      case "Team & permissions":
        return renderTeam();
      case "Invoices & quotes":
        return renderInvoices();
      case "Rental operations":
        return renderRentalOperations();
      case "Payments":
        return renderPayments();
      case "Notifications":
        return renderNotifications();
      case "Security & integrations":
        return renderSecurity();
    }
  }

  const visibleNavigation = navigation.filter((item) => {
    const query = search.toLowerCase().trim();
    return (
      !query ||
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query)
    );
  });

  return (
    <main className="min-h-screen bg-[#f8f8f5] px-4 py-6 text-stone-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1450px]">
        {/* Header */}
        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-stone-500">
              <span>Dashboard</span>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-stone-800">Settings</span>
            </div>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Settings
            </h1>
            <p className="mt-2 text-sm text-stone-500">
              Manage your workspace, business preferences, and operations.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start rounded-lg border border-stone-200 bg-white px-3 py-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#244b3b] text-white">
              <Truck className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-semibold">{company.businessName}</p>
              <p className="mt-0.5 text-[10px] text-stone-500">
                Workspace owner
              </p>
            </div>
          </div>
        </div>

        {/* Demo notice */}
        <div className="mb-6 flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
          <CircleHelpIcon />
          <div>
            <p className="text-sm font-medium text-amber-900">
              Demo settings workspace
            </p>
            <p className="mt-1 text-xs leading-5 text-amber-800">
              Values are sample data. Changes update the interface locally;
              connect a database and server actions to persist them.
            </p>
          </div>
        </div>

        {/* Mobile navigation */}
        <div className="mb-4 lg:hidden">
          <button
            onClick={() => setMobileNavOpen((value) => !value)}
            className="flex w-full items-center justify-between rounded-xl border border-stone-200 bg-white p-4 text-sm font-medium"
          >
            <span className="flex items-center gap-2">
              <Settings2 className="h-4 w-4" />
              {activeSection}
            </span>
            <ChevronRight
              className={`h-4 w-4 transition ${
                mobileNavOpen ? "rotate-90" : ""
              }`}
            />
          </button>

          {mobileNavOpen && (
            <div className="mt-2 rounded-xl border border-stone-200 bg-white p-2">
              {navigation.map((item) => (
                <button
                  key={item.title}
                  onClick={() => {
                    setActiveSection(item.title);
                    setMobileNavOpen(false);
                    setSaved(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-lg p-3 text-left ${
                    activeSection === item.title
                      ? "bg-[#edf3ee] text-[#244b3b]"
                      : "text-stone-600 hover:bg-stone-50"
                  }`}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  <span className="text-sm">{item.title}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Main layout */}
        <div className="grid items-start gap-5 lg:grid-cols-[270px_minmax(0,1fr)]">
          {/* Sidebar */}
          <aside className="sticky top-5 hidden rounded-xl border border-stone-200 bg-white p-3 lg:block">
            <div className="px-3 pb-3 pt-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                Workspace settings
              </p>
            </div>

            <div className="space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.title;

                return (
                  <button
                    key={item.title}
                    onClick={() => {
                      setActiveSection(item.title);
                      setSaved(false);
                    }}
                    className={`flex w-full items-start gap-3 rounded-lg px-3 py-3 text-left transition ${
                      isActive
                        ? "bg-[#edf3ee] text-[#244b3b]"
                        : "text-stone-600 hover:bg-stone-50 hover:text-stone-900"
                    }`}
                  >
                    <Icon className="mt-0.5 h-[18px] w-[18px] shrink-0" />
                    <span className="min-w-0">
                      <span className="block text-sm font-medium">
                        {item.title}
                      </span>
                      <span
                        className={`mt-1 block text-[11px] leading-4 ${
                          isActive ? "text-[#527763]" : "text-stone-400"
                        }`}
                      >
                        {item.description}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 border-t border-stone-100 pt-4">
              <div className="flex items-start gap-2 rounded-lg bg-stone-50 p-3">
                <CircleHelp className="mt-0.5 h-4 w-4 shrink-0 text-stone-500" />
                <div>
                  <p className="text-xs font-semibold">Need help?</p>
                  <p className="mt-1 text-[11px] leading-4 text-stone-500">
                    Contact support for help with your workspace.
                  </p>
                  <a
                    href="mailto:support@rentlogi.example"
                    className="mt-2 inline-block text-xs font-medium text-[#244b3b] hover:underline"
                  >
                    Contact support
                  </a>
                </div>
              </div>
            </div>
          </aside>

          {/* Settings content */}
          <div className="min-w-0 overflow-hidden rounded-xl border border-stone-200 bg-white">
            <div className="flex flex-col gap-3 border-b border-stone-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#edf3ee] text-[#244b3b]">
                  {(() => {
                    const Icon =
                      navigation.find(
                        (item) => item.title === activeSection,
                      )?.icon ?? Settings2;
                    return <Icon className="h-5 w-5" />;
                  })()}
                </div>
                <div>
                  <h2 className="text-sm font-semibold">{activeSection}</h2>
                  <p className="mt-1 text-xs text-stone-500">
                    Configure {activeSection.toLowerCase()} preferences.
                  </p>
                </div>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Find a setting..."
                  aria-label="Find a settings section"
                  className="h-9 w-full rounded-lg border border-stone-200 pl-9 pr-3 text-xs outline-none focus:border-[#527763] sm:w-52"
                />
                {search && (
                  <div className="absolute right-0 top-11 z-30 w-full rounded-lg border border-stone-200 bg-white p-1.5 shadow-lg">
                    {visibleNavigation.length > 0 ? (
                      visibleNavigation.map((item) => (
                        <button
                          key={item.title}
                          onClick={() => {
                            setActiveSection(item.title);
                            setSearch("");
                            setSaved(false);
                          }}
                          className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-xs hover:bg-stone-50"
                        >
                          <item.icon className="h-4 w-4 text-stone-500" />
                          {item.title}
                        </button>
                      ))
                    ) : (
                      <p className="p-3 text-xs text-stone-500">
                        No matching settings.
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="px-5 py-6 sm:px-7">
              {renderSection()}
            </div>

            <SaveBar
              onSave={() => setSaved(true)}
              onReset={resetSection}
              saved={saved}
            />
          </div>
        </div>

        {/* Invite member modal */}
        {inviteOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/40 p-4"
            onClick={() => setInviteOpen(false)}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="invite-title"
              className="w-full max-w-md rounded-2xl border border-stone-200 bg-white shadow-xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-start justify-between border-b border-stone-200 p-5">
                <div>
                  <h2 id="invite-title" className="font-semibold">
                    Invite team member
                  </h2>
                  <p className="mt-1 text-xs text-stone-500">
                    Add a teammate to the demo workspace.
                  </p>
                </div>
                <button
                  onClick={() => setInviteOpen(false)}
                  aria-label="Close invite dialog"
                  className="rounded-lg p-1.5 text-stone-400 hover:bg-stone-100"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form onSubmit={inviteMember} className="space-y-4 p-5">
                <Field
                  label="Email address"
                  type="email"
                  value={inviteEmail}
                  onChange={(v) => {
                    setInviteEmail(v);
                    setInviteError("");
                  }}
                  placeholder="colleague@company.com"
                />

                <SelectField
                  label="Workspace role"
                  value={inviteRole}
                  onChange={setInviteRole}
                  options={["Admin", "Manager", "Operations", "Viewer"]}
                />

                {inviteError && (
                  <p role="alert" className="text-xs text-red-600">
                    {inviteError}
                  </p>
                )}

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setInviteOpen(false)}
                    className="rounded-lg border border-stone-200 px-3 py-2 text-sm hover:bg-stone-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-[#244b3b] px-4 py-2 text-sm font-medium text-white hover:bg-[#193a2d]"
                  >
                    Add member
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

function CircleHelpIcon() {
  return (
    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-800">
      <CircleHelp className="h-4 w-4" />
    </div>
  );
}
