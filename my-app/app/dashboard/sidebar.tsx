
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  ReceiptText,
  ClipboardList,
  Truck,
  ChartNoAxesCombined,
  Settings,
  LogOut,
  ClipboardClock
} from "lucide-react";

import defaultProfile from "@/public/images/profile.png";

const links = [
  { name: "Overview", href: "/dashboard/overview", icon: LayoutDashboard },
  {name:"Rental Tracking", href:"/dashboard/rentals/tracking", icon:ClipboardClock},
  { name: "Clients", href: "/dashboard/clients", icon: Users },
  { name: "Manage Enquiries", href: "/dashboard/enquiry", icon: ClipboardList },
  { name: "Manage Equipment", href: "/dashboard/equipment", icon: Truck },
  { name: "Invoices", href: "/dashboard/invoices", icon: ReceiptText },
  { name: "Reports", href: "/dashboard/reports", icon: ChartNoAxesCombined },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed flex h-full min-h-0 w-64 shrink-0 flex-col border-r border-stone-200 bg-[#fafaf8]">
      {/* Brand */}
      <div className="flex h-[88px] shrink-0 items-center border-b border-stone-200 px-5">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border-t-2 border-amber-500 bg-stone-900 text-sm font-black text-white">
            RL
          </div>

          <div className="min-w-0">
            <p className="text-xl font-extrabold leading-none tracking-tight text-stone-900">
              Rent<span className="text-amber-600">Logis</span>
            </p>
            <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-stone-500">
              Fleet Management
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="min-h-0 flex-1 overflow-y-auto px-3 py-5">
        <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.14em] text-stone-400">
          Workspace
        </p>

        <div className="space-y-1">
          {links.map(({ name, href, icon: Icon }) => {
            const active =
              pathname === href || pathname.startsWith(`${href}/`);

            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`flex min-h-10 items-center gap-3 rounded-md px-3 py-2.5 text-[13px] font-medium transition-colors ${
                  active
                    ? "bg-stone-900 text-white"
                    : "text-stone-600 hover:bg-stone-100 hover:text-stone-950"
                }`}
              >
                <Icon
                  size={17}
                  strokeWidth={1.8}
                  className={`shrink-0 ${
                    active ? "text-amber-400" : "text-stone-400"
                  }`}
                />
                <span className="min-w-0 flex-1">{name}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* User section */}
      <div className="shrink-0 border-t border-stone-200 p-3">
        <div className="flex min-w-0 items-center gap-3 px-2 py-3">
          <Image
            src={defaultProfile}
            width={36}
            height={36}
            alt="Profile picture"
            className="h-9 w-9 shrink-0 rounded-full border border-stone-200 object-cover"
          />

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-stone-900">
              Rakesh Pegu
            </p>
            <p className="mt-0.5 text-xs text-stone-500">
              Administrator
            </p>
          </div>
        </div>

        <button
          type="button"
          className="flex h-10 w-full items-center gap-3 rounded-md px-3 text-[13px] font-medium text-stone-600 transition-colors hover:bg-red-50 hover:text-red-700"
        >
          <LogOut size={17} className="shrink-0" />
          Sign out
        </button>
      </div>
    </aside>
  );
}
