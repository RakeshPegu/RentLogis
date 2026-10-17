import Image from "next/image";
import Link from "next/link";
export function HeroSection() {
  return (
    <section className="relative h-min-screen lg:-top-18 w-full backdrop-opacity-100  bg-[url('@/public/images/bg-excavator.jpg')] bg-cover  bg-center bg-no-repeat border-b border-stone-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12  lg:my-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 lg:pr-4">
            
           {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-amber-600 leading-[1.08]">
              Reliable equipment.{" "}
              <span className="block text-white  font-extrabold ">
                Ready for your next project.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-xl text-white md:text-gray-300 leading-relaxed max-w-2xl font-normal">
              Rent heavy-duty excavators, compact track loaders, articulated boom lifts, and mobile site generators. 
              Get transparent commercial rates, guaranteed pre-hire maintenance, and responsive site delivery across regional jobsites.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <Link
                href="/equipment"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-white bg-stone-900 hover:bg-stone-800 active:bg-black rounded-md shadow-xs transition-colors"
              >
                <span>Explore Equipment</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                </svg>
              </Link>

              <Link
                href="/rental-enquiry"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-stone-900 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 rounded-md shadow-xs transition-colors"
              >
                <span>Request a Quote</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>

            {/* Quick Reassurance Checklist */}
            <div className="pt-4 border-t border-stone-200/90 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-stone-600">
              <div className="flex items-center gap-2 font-medium">
                <svg className="w-4 h-4 text-amber-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span className="text-white">Full Pre-Dispatch Inspection</span>
              </div>
              <div className="flex items-center gap-2 font-medium">
                <svg className="w-4 h-4 text-amber-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span className="text-white">Daily, Weekly & Monthly Hire</span>
              </div>
              <div className="flex items-center gap-2 font-medium">
                <svg className="w-4 h-4 text-amber-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span className="text-white">Direct Site Transport</span>
              </div>
            </div>

          

          </div>
          </div>

       
      </div>
    </section>
  );
}

