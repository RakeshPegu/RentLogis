
"use client";

import { useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  Package,
  MapPin,
  CalendarDays,
  Truck,
  Phone,
  Mail,
  ArrowUpRight,
  Clock3,
  CheckCircle2,
  ClipboardList,
  XCircle,
  X,
  Eye,
  ChevronRight,
} from "lucide-react";

type RentalStatus =
  | "Pending"
  | "Approved"
  | "In Progress"
  | "Completed"
  | "Rejected";

type RentalRequest = {
  id: string;
  name: string;
  companyName: string;
  contactDetails: {
    email: string;
    phone: string;
  };
  machineryName: string;
  numberOfMachines: number;
  location: string;
  preferredStartDate: string;
  expectedEndDate: string;
  deliveryPreference: string;
  status: RentalStatus;
};

const initialRequests: RentalRequest[] = [
  {
    id: "REQ-1001",
    name: "Rahul Sharma",
    companyName: "BuildCore Infrastructure",
    contactDetails: {
      email: "rahul@buildcore.in",
      phone: "+91 98765 43210",
    },
    machineryName: "Mini Excavator",
    numberOfMachines: 2,
    location: "Bengaluru, Karnataka",
    preferredStartDate: "2026-10-25",
    expectedEndDate: "2026-11-01",
    deliveryPreference: "Delivery Required",
    status: "Pending",
  },
  {
    id: "REQ-1002",
    name: "Amit Verma",
    companyName: "Verma Construction",
    contactDetails: {
      email: "amit@vermabuild.com",
      phone: "+91 98123 45678",
    },
    machineryName: "Hydraulic Excavator",
    numberOfMachines: 1,
    location: "Mysuru, Karnataka",
    preferredStartDate: "2026-10-22",
    expectedEndDate: "2026-11-05",
    deliveryPreference: "Self Pickup",
    status: "Approved",
  },
  {
    id: "REQ-1003",
    name: "Priya Reddy",
    companyName: "PR Roadworks",
    contactDetails: {
      email: "priya@prroadworks.in",
      phone: "+91 99887 76655",
    },
    machineryName: "Wheel Loader",
    numberOfMachines: 3,
    location: "Hyderabad, Telangana",
    preferredStartDate: "2026-10-28",
    expectedEndDate: "2026-11-10",
    deliveryPreference: "Delivery Required",
    status: "In Progress",
  },
  {
    id: "REQ-1004",
    name: "Suresh Patel",
    companyName: "Patel Earth Movers",
    contactDetails: {
      email: "suresh@patelearth.in",
      phone: "+91 97654 32109",
    },
    machineryName: "Bulldozer",
    numberOfMachines: 1,
    location: "Chennai, Tamil Nadu",
    preferredStartDate: "2026-11-02",
    expectedEndDate: "2026-11-16",
    deliveryPreference: "Delivery Required",
    status: "Pending",
  },
  {
    id: "REQ-1005",
    name: "Neha Singh",
    companyName: "UrbanBuild Projects",
    contactDetails: {
      email: "neha@urbanbuild.in",
      phone: "+91 91234 56780",
    },
    machineryName: "Tower Crane",
    numberOfMachines: 1,
    location: "Pune, Maharashtra",
    preferredStartDate: "2026-11-05",
    expectedEndDate: "2026-12-05",
    deliveryPreference: "Delivery Required",
    status: "Rejected",
  },
  {
    id: "REQ-1006",
    name: "Arjun Das",
    companyName: "Das Civil Engineering",
    contactDetails: {
      email: "arjun@dascivil.in",
      phone: "+91 93456 78901",
    },
    machineryName: "Backhoe Loader",
    numberOfMachines: 2,
    location: "Guwahati, Assam",
    preferredStartDate: "2026-10-30",
    expectedEndDate: "2026-11-06",
    deliveryPreference: "Self Pickup",
    status: "Completed",
  },
  {
    id: "REQ-1007",
    name: "Karan Mehta",
    companyName: "Mehta Developers",
    contactDetails: {
      email: "karan@mehtadevelopers.in",
      phone: "+91 94567 89012",
    },
    machineryName: "Mobile Crane",
    numberOfMachines: 1,
    location: "Mumbai, Maharashtra",
    preferredStartDate: "2026-11-10",
    expectedEndDate: "2026-11-20",
    deliveryPreference: "Delivery Required",
    status: "Pending",
  },
  {
    id: "REQ-1008",
    name: "Ananya Roy",
    companyName: "Roy Infrastructure",
    contactDetails: {
      email: "ananya@royinfra.in",
      phone: "+91 95678 90123",
    },
    machineryName: "Motor Grader",
    numberOfMachines: 2,
    location: "Kolkata, West Bengal",
    preferredStartDate: "2026-11-12",
    expectedEndDate: "2026-11-26",
    deliveryPreference: "Not Decided",
    status: "Approved",
  },
];

const statusStyles: Record<RentalStatus, string> = {
  Pending: "bg-amber-50 text-amber-800 border-amber-200",
  Approved: "bg-emerald-50 text-emerald-800 border-emerald-200",
  "In Progress": "bg-blue-50 text-blue-800 border-blue-200",
  Completed: "bg-stone-100 text-stone-700 border-stone-200",
  Rejected: "bg-red-50 text-red-800 border-red-200",
};

const filters = [
  "All",
  "Pending",
  "Approved",
  "In Progress",
  "Completed",
  "Rejected",
] as const;

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}

function StatusBadge({ status }: { status: RentalStatus }) {
  return (
    <span
      className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${statusStyles[status]}`}
    >
      <span
        className={`size-1.5 rounded-full ${
          status === "Pending"
            ? "bg-amber-500"
            : status === "Approved"
              ? "bg-emerald-600"
              : status === "In Progress"
                ? "bg-blue-600"
                : status === "Completed"
                  ? "bg-stone-500"
                  : "bg-red-600"
        }`}
      />
      {status}
    </span>
  );
}

function SummaryCard({
  label,
  value,
  icon,
  description,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  description: string;
}) {
  return (
    <div className="rounded-xl border bg-card p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            {value}
          </p>
        </div>
        <div className="rounded-lg border bg-muted/50 p-2.5 text-muted-foreground">
          {icon}
        </div>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">{description}</p>
    </div>
  );
}

export default function Enquiry() {
  const [requests, setRequests] =
    useState<RentalRequest[]>(initialRequests);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedRequest, setSelectedRequest] =
    useState<RentalRequest | null>(null);

  const filteredRequests = useMemo(() => {
    const query = search.trim().toLowerCase();

    return requests.filter((request) => {
      const matchesSearch = [
        request.id,
        request.name,
        request.companyName,
        request.contactDetails.email,
        request.contactDetails.phone,
        request.machineryName,
        request.location,
      ].some((value) => value.toLowerCase().includes(query));

      return (
        matchesSearch &&
        (activeFilter === "All" || request.status === activeFilter)
      );
    });
  }, [requests, search, activeFilter]);

  const pendingCount = requests.filter(
    (request) => request.status === "Pending"
  ).length;

  const activeCount = requests.filter(
    (request) =>
      request.status === "Approved" ||
      request.status === "In Progress"
  ).length;

  const machineCount = requests.reduce(
    (total, request) => total + request.numberOfMachines,
    0
  );

  function updateStatus(id: string, status: RentalStatus) {
    setRequests((current) =>
      current.map((request) =>
        request.id === id ? { ...request, status } : request
      )
    );

    setSelectedRequest((current) =>
      current?.id === id ? { ...current, status } : current
    );
  }

  function closeDetails() {
    setSelectedRequest(null);
  }

  return (
    <main className="min-h-screen space-y-6 bg-background p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
            Rental management
          </p>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Enquiries
          </h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Manage incoming rental requests, review requirements, and coordinate
            equipment deliveries.
          </p>
        </div>

        <div className="flex w-fit items-center gap-2 rounded-lg border bg-card px-3 py-2 text-sm">
          <ClipboardList className="size-4 text-muted-foreground" />
          <span className="font-medium">{requests.length}</span>
          <span className="text-muted-foreground">total requests</span>
        </div>
      </header>

      {/* Summary */}
      <section className="grid grid-cols-2 gap-3 xl:grid-cols-4 sm:gap-4">
        <SummaryCard
          label="Total enquiries"
          value={requests.length}
          description="All received requests"
          icon={<ClipboardList className="size-5" />}
        />
        <SummaryCard
          label="Awaiting review"
          value={pendingCount}
          description="Need your attention"
          icon={<Clock3 className="size-5" />}
        />
        <SummaryCard
          label="Approved / Active"
          value={activeCount}
          description="Approved or in progress"
          icon={<CheckCircle2 className="size-5" />}
        />
        <SummaryCard
          label="Machines requested"
          value={machineCount}
          description="Across all requests"
          icon={<Package className="size-5" />}
        />
      </section>

      {/* Enquiry workspace */}
      <section className="space-y-5">
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-lg font-semibold">All rental requests</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {filteredRequests.length}{" "}
              {filteredRequests.length === 1 ? "request" : "requests"} found
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search customer, company, machinery..."
              aria-label="Search rental requests"
              className="h-11 w-full rounded-lg border bg-card pl-10 pr-4 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          {/* Status filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <SlidersHorizontal className="mr-1 size-4 shrink-0 text-muted-foreground" />

            {filters.map((filter) => {
              const count =
                filter === "All"
                  ? requests.length
                  : requests.filter((request) => request.status === filter)
                      .length;

              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors ${
                    activeFilter === filter
                      ? "border-foreground bg-foreground text-background"
                      : "border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {filter}
                  <span
                    className={`text-xs ${
                      activeFilter === filter
                        ? "text-background/70"
                        : "text-muted-foreground"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Responsive enquiry cards */}
        {filteredRequests.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            {filteredRequests.map((request) => (
              <article
                key={request.id}
                className="group min-w-0 overflow-hidden rounded-xl border bg-card transition-colors hover:border-foreground/20"
              >
                {/* Card header */}
                <div className="flex items-start justify-between gap-3 border-b p-4 sm:p-5">
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-lg border bg-muted/40">
                      <Package className="size-5 text-muted-foreground" />
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate font-semibold">
                        {request.name}
                      </h3>
                      <p className="mt-1 truncate text-sm text-muted-foreground">
                        {request.companyName}
                      </p>
                      <p className="mt-1 font-mono text-xs text-muted-foreground">
                        {request.id}
                      </p>
                    </div>
                  </div>

                  <StatusBadge status={request.status} />
                </div>

                {/* Machinery */}
                <div className="space-y-4 p-4 sm:p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">
                        Equipment requested
                      </p>
                      <p className="mt-1 break-words font-medium">
                        {request.machineryName}
                      </p>
                    </div>

                    <div className="shrink-0 rounded-lg bg-muted/50 px-3 py-2 text-right">
                      <p className="text-xs text-muted-foreground">Quantity</p>
                      <p className="mt-0.5 font-semibold">
                        {request.numberOfMachines}{" "}
                        {request.numberOfMachines === 1 ? "unit" : "units"}
                      </p>
                    </div>
                  </div>

                  {/* Rental details */}
                  <div className="grid grid-cols-1 gap-3 rounded-lg border bg-muted/20 p-3 sm:grid-cols-2">
                    <div className="flex min-w-0 items-start gap-2.5">
                      <CalendarDays className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground">
                          Rental period
                        </p>
                        <p className="mt-1 text-sm font-medium">
                          {formatDate(request.preferredStartDate)}
                        </p>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          to {formatDate(request.expectedEndDate)}
                        </p>
                      </div>
                    </div>

                    <div className="flex min-w-0 items-start gap-2.5">
                      <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground">
                          Project location
                        </p>
                        <p className="mt-1 break-words text-sm font-medium">
                          {request.location}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Delivery preference */}
                  <div className="flex items-start gap-2.5">
                    <Truck className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">
                        Delivery preference
                      </p>
                      <p className="mt-1 text-sm font-medium">
                        {request.deliveryPreference}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card footer */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-t bg-muted/10 p-4 sm:px-5">
                  <p className="text-xs text-muted-foreground">
                    {request.contactDetails.phone}
                  </p>

                  <button
                    type="button"
                    onClick={() => setSelectedRequest(request)}
                    className="inline-flex items-center gap-2 rounded-lg bg-foreground px-3.5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    View enquiry
                    <ArrowUpRight className="size-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-dashed bg-card px-5 py-12 text-center">
            <div className="flex size-12 items-center justify-center rounded-xl bg-muted">
              <Search className="size-5 text-muted-foreground" />
            </div>
            <h3 className="mt-4 font-semibold">No enquiries found</h3>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              Try a different search term or change your status filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setActiveFilter("All");
              }}
              className="mt-4 text-sm font-medium underline underline-offset-4"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>

      {/* Details dialog */}
      {selectedRequest && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeDetails();
          }}
          onKeyDown={(event) => {
            if (event.key === "Escape") closeDetails();
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="enquiry-details-title"
            className="max-h-[90dvh] w-full max-w-xl overflow-y-auto rounded-t-2xl border bg-background shadow-2xl sm:rounded-2xl"
          >
            <div className="sticky top-0 flex items-start justify-between gap-3 border-b bg-background p-5">
              <div className="min-w-0">
                <p className="font-mono text-xs text-muted-foreground">
                  {selectedRequest.id}
                </p>
                <h2
                  id="enquiry-details-title"
                  className="mt-1 text-xl font-semibold"
                >
                  Enquiry details
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Review the customer's rental requirements.
                </p>
              </div>

              <button
                type="button"
                onClick={closeDetails}
                aria-label="Close enquiry details"
                className="rounded-lg border p-2 hover:bg-muted"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="space-y-6 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="font-semibold">{selectedRequest.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {selectedRequest.companyName}
                  </p>
                </div>
                <StatusBadge status={selectedRequest.status} />
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-semibold">Contact information</h3>

                <a
                  href={`tel:${selectedRequest.contactDetails.phone.replace(/\s/g, "")}`}
                  className="flex min-w-0 items-center gap-3 rounded-lg border p-3 hover:bg-muted/40"
                >
                  <Phone className="size-4 shrink-0 text-muted-foreground" />
                  <span className="min-w-0 break-words text-sm">
                    {selectedRequest.contactDetails.phone}
                  </span>
                  <ChevronRight className="ml-auto size-4 shrink-0 text-muted-foreground" />
                </a>

                <a
                  href={`mailto:${selectedRequest.contactDetails.email}`}
                  className="flex min-w-0 items-center gap-3 rounded-lg border p-3 hover:bg-muted/40"
                >
                  <Mail className="size-4 shrink-0 text-muted-foreground" />
                  <span className="min-w-0 break-all text-sm">
                    {selectedRequest.contactDetails.email}
                  </span>
                  <ChevronRight className="ml-auto size-4 shrink-0 text-muted-foreground" />
                </a>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-semibold">Rental requirements</h3>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg border p-3">
                    <Package className="size-4 text-muted-foreground" />
                    <p className="mt-3 text-xs text-muted-foreground">
                      Machinery
                    </p>
                    <p className="mt-1 break-words text-sm font-medium">
                      {selectedRequest.machineryName}
                    </p>
                  </div>

                  <div className="rounded-lg border p-3">
                    <ClipboardList className="size-4 text-muted-foreground" />
                    <p className="mt-3 text-xs text-muted-foreground">
                      Quantity
                    </p>
                    <p className="mt-1 text-sm font-medium">
                      {selectedRequest.numberOfMachines}{" "}
                      {selectedRequest.numberOfMachines === 1
                        ? "machine"
                        : "machines"}
                    </p>
                  </div>

                  <div className="rounded-lg border p-3">
                    <CalendarDays className="size-4 text-muted-foreground" />
                    <p className="mt-3 text-xs text-muted-foreground">
                      Preferred start
                    </p>
                    <p className="mt-1 text-sm font-medium">
                      {formatDate(selectedRequest.preferredStartDate)}
                    </p>
                  </div>

                  <div className="rounded-lg border p-3">
                    <CalendarDays className="size-4 text-muted-foreground" />
                    <p className="mt-3 text-xs text-muted-foreground">
                      Expected end
                    </p>
                    <p className="mt-1 text-sm font-medium">
                      {formatDate(selectedRequest.expectedEndDate)}
                    </p>
                  </div>
                </div>

                <div className="rounded-lg border p-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Project location
                      </p>
                      <p className="mt-1 text-sm font-medium">
                        {selectedRequest.location}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-3">
                  <div className="flex items-start gap-3">
                    <Truck className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Delivery preference
                      </p>
                      <p className="mt-1 text-sm font-medium">
                        {selectedRequest.deliveryPreference}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status actions */}
              <div className="space-y-3 border-t pt-5">
                <h3 className="text-sm font-semibold">Update request</h3>

                {selectedRequest.status === "Pending" && (
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <button
                      type="button"
                      onClick={() =>
                        updateStatus(selectedRequest.id, "Rejected")
                      }
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium hover:bg-muted"
                    >
                      <XCircle className="size-4" />
                      Reject enquiry
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        updateStatus(selectedRequest.id, "Approved")
                      }
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background hover:opacity-85"
                    >
                      <CheckCircle2 className="size-4" />
                      Approve enquiry
                    </button>
                  </div>
                )}

                {selectedRequest.status === "Approved" && (
                  <button
                    type="button"
                    onClick={() =>
                      updateStatus(selectedRequest.id, "In Progress")
                    }
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background hover:opacity-85"
                  >
                    <Truck className="size-4" />
                    Start rental
                  </button>
                )}

                {selectedRequest.status === "In Progress" && (
                  <button
                    type="button"
                    onClick={() =>
                      updateStatus(selectedRequest.id, "Completed")
                    }
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background hover:opacity-85"
                  >
                    <CheckCircle2 className="size-4" />
                    Mark as completed
                  </button>
                )}

                {(selectedRequest.status === "Completed" ||
                  selectedRequest.status === "Rejected") && (
                  <p className="text-sm text-muted-foreground">
                    This request is {selectedRequest.status.toLowerCase()}.
                    No further actions are available.
                  </p>
                )}
              </div>
            </div>

            <div className="border-t p-4">
              <button
                type="button"
                onClick={closeDetails}
                className="w-full rounded-lg border px-4 py-2.5 text-sm font-medium hover:bg-muted"
              >
                Close details
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
