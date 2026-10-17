import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

export const metadata: Metadata = {
  title: "About RentLogi | Equipment Rental",
  description:
    "Learn about RentLogi, a demonstration equipment rental brand designed to make finding machinery and requesting rental information straightforward.",
};

const rentalSteps = [
  {
    number: "01",
    title: "Choose the equipment",
    description:
      "Browse machinery by type and find a starting point for the work planned on your site.",
  },
  {
    number: "02",
    title: "Share the job details",
    description:
      "Tell the rental team what you need, where the equipment will be used, and when you need it.",
  },
  {
    number: "03",
    title: "Review the details",
    description:
      "Confirm availability, rental terms, and pricing before making arrangements for your project.",
  },
];

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#fafaf8] text-[#14161a]">
      <SiteHeader />

      <main className="flex-1">
        <section className="border-b border-stone-200">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-20">
            <div>
              <p className="mb-5  text-xs font-semibold  tracking-wide uppercas  uppercase t text-amber-700">
                About RentLogis
              </p>
              <h1 className="max-w-xl text-4xl font-black leading-[1.08] tracking-tight text-stone-950 sm:text-5xl">
                Equipment hire, made clear from the start.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-stone-600 sm:text-lg">
                Every project has its own demands. RentLogi is a demonstration
                equipment rental brand designed to help contractors explore
                practical machinery options and start a straightforward
                conversation about availability and pricing.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/equipment"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-stone-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-stone-800"
                >
                  Browse Equipment
                  <span aria-hidden="true">→</span>
                </Link>
                <Link
                  href="/rental-enquiry"
                  className="inline-flex min-h-12 items-center justify-center rounded-md border border-stone-300 px-5 py-3 text-sm font-semibold text-stone-900 transition-colors hover:border-stone-500 hover:bg-stone-100"
                >
                  Request a Quote
                </Link>
              </div>
            </div>

            <figure className="relative">
              <div className="overflow-hidden border border-stone-300 bg-stone-200">
                <Image
                  src="/images/hero-excavator.jpg"
                  alt="Excavator working at a construction site"
                  width={1280}
                  height={853}
                  priority
                  className="aspect-[4/3] w-full object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
              <figcaption className="mt-3 flex items-center justify-between gap-4 text-xs text-stone-500">
                <span>Equipment for work on the ground and above it</span>
                <span className="shrink-0 font-mono uppercase tracking-wider">
                  RentLogi · Demo
                </span>
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="bg-stone-100">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-8 lg:py-20">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-700">
                A practical approach
              </p>
              <h2 className="mt-4 max-w-md text-3xl font-bold leading-tight tracking-tight text-stone-950 sm:text-4xl">
                Start with the job. Find the right machine.
              </h2>
            </div>
            <div className="max-w-2xl space-y-5 text-base leading-relaxed text-stone-600">
              <p>
                Choosing rental equipment should begin with the work at hand:
                the site, the task, and the time the machine is needed. RentLogi
                brings common equipment types into one place so it is easier to
                compare options and ask focused questions.
              </p>
              <p>
                The catalogue is a starting point, not a substitute for
                confirming the details. Availability, rates, transport, and
                rental terms should be discussed for each request before a hire
                is arranged.
              </p>
              <div className="grid gap-4 border-t border-stone-300 pt-5 sm:grid-cols-2">
                <div>
                  <h3 className="font-semibold text-stone-900">
                    Useful equipment choices
                  </h3>
                  <p className="mt-1 text-sm">
                    Explore earthmoving, access, handling, and power equipment.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-stone-900">
                    Clear rental enquiries
                  </h3>
                  <p className="mt-1 text-sm">
                    Share your requirements and confirm the specifics with the
                    rental team.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="rental-process" className="bg-[#fafaf8]">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-700">
                How it works
              </p>
              <h2
                id="rental-process"
                className="mt-4 text-3xl font-bold tracking-tight text-stone-950 sm:text-4xl"
              >
                Three steps to a useful conversation.
              </h2>
            </div>
            <ol className="mt-10 grid gap-0 border-y border-stone-300 md:grid-cols-3 md:divide-x md:divide-stone-300">
              {rentalSteps.map((step) => (
                <li key={step.number} className="py-6 md:px-6 md:first:pl-0 md:last:pr-0">
                  <span className="font-mono text-sm font-semibold text-amber-700">
                    {step.number}
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-stone-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-stone-600">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-stone-950 text-white">
          <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-12 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8 lg:py-16">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-500">
                Plan your next job
              </p>
              <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                Have a project in mind?
              </h2>
              <p className="mt-3 max-w-xl leading-relaxed text-stone-300">
                Browse the equipment range or share your requirements to begin
                checking the details.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:shrink-0">
              <Link
                href="/rental-enquiry"
                className="inline-flex min-h-12 items-center justify-center rounded-md bg-amber-500 px-5 py-3 text-sm font-semibold text-stone-950 transition-colors hover:bg-amber-400"
              >
                Request a Quote
              </Link>
              <Link
                href="/equipment"
                className="inline-flex min-h-12 items-center justify-center rounded-md border border-stone-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-stone-400 hover:bg-stone-900"
              >
                Browse Equipment
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
