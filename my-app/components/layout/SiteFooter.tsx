import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand & Description */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-7 h-7 bg-amber-600 rounded-sm flex items-center justify-center text-white font-black text-sm tracking-tighter">
                <span>RL</span>
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                Rent<span className="text-amber-500">Logi</span>
              </span>
            </Link>
            <p className="text-stone-400 text-sm leading-relaxed max-w-sm">
              Commercial and industrial equipment rental solutions for contractors, civil engineering teams, and facility builders. Dependable heavy machinery backed by pre-dispatch maintenance checks.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-2 text-xs text-stone-400 bg-stone-900 border border-stone-800 px-3 py-1.5 rounded-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Fleet Availability Updated Daily
              </span>
            </div>
          </div>

          {/* Equipment Categories */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-200 mb-4">
              Categories
            </h3>
            <ul className="space-y-2.5 text-sm text-stone-400">
              <li>
                <Link href="/equipment?category=earthmoving" className="hover:text-amber-500 transition-colors">
                  Earthmoving Equipment
                </Link>
              </li>
              <li>
                <Link href="/equipment?category=aerial-platforms" className="hover:text-amber-500 transition-colors">
                  Aerial Work Platforms
                </Link>
              </li>
              <li>
                <Link href="/equipment?category=material-handling" className="hover:text-amber-500 transition-colors">
                  Material Handling
                </Link>
              </li>
              <li>
                <Link href="/equipment?category=power-equipment" className="hover:text-amber-500 transition-colors">
                  Power & Generation
                </Link>
              </li>
              <li>
                <Link href="/equipment?category=compaction" className="hover:text-amber-500 transition-colors">
                  Compaction Equipment
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation & Company */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-200 mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm text-stone-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/equipment" className="hover:text-white transition-colors">
                  All Equipment
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-white transition-colors">
                  How Renting Works
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About RentLogi
                </Link>
              </li>
              <li>
                <Link href="/rental-enquiry" className="hover:text-white transition-colors">
                  Request a Quote
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-amber-500 transition-colors text-xs text-stone-500">
                  Staff Login &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Central Depot & Yard */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-200 mb-4">
              Central Depot
            </h3>
            <div className="space-y-2.5 text-sm text-stone-400">
              <p className="text-stone-300 font-medium">RentLogi Central Yard</p>
              <p>4800 Industrial Parkway, Sector 12</p>
              <p className="text-stone-300">
                Dispatch:{" "}
                <a href="tel:18005557368" className="hover:text-amber-400 text-white font-semibold">
                  (800) 555-RENT
                </a>
              </p>
              <p>Email: dispatch@rentlogi-demo.com</p>
              <div className="pt-2 text-xs text-stone-400 space-y-1">
                <p><span className="font-medium text-stone-300">Yard Hours:</span> Mon–Fri 6:30 AM – 5:00 PM</p>
                <p><span className="font-medium text-stone-300">Service Area:</span> Regional metro & industrial corridor</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Strip */}
        <div className="mt-12 pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>
            &copy; 2026 RentLogi. All rights reserved. Commercial Equipment Hire Demonstration Platform.
          </p>
          <p className="text-stone-400">
            Fictional demo data for showcase purposes · No real commercial quotes
          </p>
        </div>
      </div>
    </footer>
  );
}
