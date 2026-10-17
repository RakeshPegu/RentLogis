import Image from "next/image";
import Link from "next/link";
import { equipmentCategories } from "@/data/categories";

export function EquipmentCategories() {
  const topCategories = equipmentCategories.slice(0, 2);
  const secondaryCategories = equipmentCategories.slice(2, 5);

  return (
    <section id="categories" className="py-16 lg:py-24 bg-[#fafaf8] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 lg:mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-amber-700 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
              <span>Fleet Classification</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-950 tracking-tight">
              Equipment Categories
            </h2>
          </div>
          <p className="text-sm sm:text-base text-stone-600 max-w-md">
            Heavy-duty machinery and specialized equipment maintained to rigorous OEM standards for contractors and site developers.
          </p>
        </div>

        {/* Editorial Asymmetric Grid */}
        <div className="space-y-6">
          
          {/* Top Row: Two Prominent High-Impact Categories */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {topCategories.map((cat) => (
              <Link
                key={cat.id}
                href={`/equipment?category=${cat.slug}`}
                className="group relative rounded-md overflow-hidden border border-stone-300/80 bg-stone-900 shadow-xs hover:border-amber-600 transition-colors flex flex-col justify-end min-h-[360px] sm:min-h-[420px]"
              >
                {/* Background Machinery Image */}
                <div className="absolute inset-0">
                  <Image
                    src={cat.image.src}
                    alt={cat.image.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-500 opacity-80"
                  />
                  {/* High contrast gradient scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent" />
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 p-6 sm:p-8 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-block text-[11px] font-bold tracking-wider uppercase text-amber-400 bg-black/40 px-2.5 py-1 rounded-xs backdrop-blur-xs border border-amber-500/30">
                      {cat.fleetCount} Units in Fleet
                    </span>
                    <span className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-amber-600 flex items-center justify-center text-white transition-colors">
                      <svg className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight group-hover:text-amber-300 transition-colors">
                    {cat.name}
                  </h3>

                  <p className="text-sm text-stone-300 leading-relaxed max-w-lg">
                    {cat.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {cat.featuredTypes.map((t, idx) => (
                      <span key={idx} className="text-[11px] bg-stone-800/80 text-stone-200 border border-stone-700/60 px-2.5 py-1 rounded-xs font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Bottom Row: Three Compact Editorial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {secondaryCategories.map((cat) => (
              <Link
                key={cat.id}
                href={`/equipment?category=${cat.slug}`}
                className="group relative rounded-md overflow-hidden border border-stone-300/80 bg-stone-900 shadow-xs hover:border-amber-600 transition-colors flex flex-col justify-end min-h-[300px]"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src={cat.image.src}
                    alt={cat.image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-500 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-transparent" />
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 p-5 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold tracking-wider uppercase text-amber-400 bg-black/40 px-2 py-0.5 rounded-xs border border-amber-500/30">
                      {cat.fleetCount} Units
                    </span>
                    <span className="w-7 h-7 rounded-full bg-white/10 group-hover:bg-amber-600 flex items-center justify-center text-white transition-colors">
                      <svg className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-amber-300 transition-colors">
                    {cat.name}
                  </h3>

                  <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed">
                    {cat.tagline}
                  </p>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {cat.featuredTypes.slice(0, 2).map((t, idx) => (
                      <span key={idx} className="text-[10px] bg-stone-800/80 text-stone-300 border border-stone-700/60 px-2 py-0.5 rounded-xs">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

