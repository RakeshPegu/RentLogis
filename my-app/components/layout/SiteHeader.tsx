import Link from "next/link";
import { MobileNavigation } from "./MobileNavigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Equipment", href: "/equipment" },
  { label: "Categories", href: "/#categories" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "About", href: "/about" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full bg-transparent  backdrop-blur-md border-stone-200/90 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Brand Wordmark & Industrial Badge */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-amber-600 rounded-sm">
            <div className="w-8 h-8 bg-stone-900 rounded-sm flex items-center justify-center text-white font-black text-base tracking-tighter border-t-2 border-amber-600 shadow-xs group-hover:bg-amber-600 transition-colors">
              <span>RL</span>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-stone-900 leading-none">
                Rent<span className="text-amber-600">Logis</span>
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-500 mt-0.5">
                Equipment Fleet
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 text-sm font-medium text-stone-700">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 rounded-md text-gray-950 hover:text-stone-950 hover:bg-stone-100 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Header Actions */}
          <div className="hidden sm:flex items-center gap-4">
            <div className="hidden lg:flex flex-col text-right">
              <span className="text-[11px] text-amber-600 font-medium">Direct Dispatch</span>
              <a
                href="tel:18005557368"
                className="text-xs font-bold text-amber-600 hover:text-amber-600 transition-colors tracking-tight"
              >
                (800) 555-RENT
              </a>
            </div>

            <Link
              href="/rental-enquiry"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-amber-600 hover:bg-amber-500 active:bg-amber-700 rounded-md shadow-xs transition-colors"
            >
              <span>Request a Quote</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>

          {/* Mobile menu trigger */}
          <MobileNavigation navLinks={navLinks} />
        </div>
      </div>
    </header>
  );
}

