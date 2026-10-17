"use client";

import { useMemo, useState } from "react";
import { EquipmentItem, AvailabilityStatus } from "@/types/equipment";
import { EquipmentCard } from "./EquipmentCard";

interface EquipmentCatalogueGridProps {
  initialEquipment: EquipmentItem[];
  initialCategory?: string;
}

const availabilityLabels: Record<AvailabilityStatus, string> = {
  available: "Available",
  limited: "Limited availability",
  reserved: "Currently unavailable",
};

type SortOption = "recommended" | "name-asc" | "rate-asc" | "rate-desc";
const sortOptions: SortOption[] = [
  "recommended",
  "name-asc",
  "rate-asc",
  "rate-desc",
];

export function EquipmentCatalogueGrid({
  initialEquipment,
  initialCategory = "all",
}: EquipmentCatalogueGridProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedAvailability, setSelectedAvailability] = useState<
    AvailabilityStatus | "all"
  >("all");
  const [sortBy, setSortBy] = useState<SortOption>("recommended");

  const categories = useMemo(
    () =>
      Array.from(
        new Map(
          initialEquipment.map((item) => [
            item.categorySlug,
            { slug: item.categorySlug, name: item.category },
          ]),
        ).values(),
      ),
    [initialEquipment],
  );

  const availabilityOptions = useMemo(
    () =>
      Array.from(
        new Set(initialEquipment.map((item) => item.availability.status)),
      ),
    [initialEquipment],
  );

  const normalizedSearch = search.trim().toLocaleLowerCase();
  const filteredEquipment = initialEquipment
    .filter((item) => {
      const matchesSearch =
        !normalizedSearch ||
        [
          item.name,
          item.model,
          item.category,
          item.shortDescription,
          ...(item.applications ?? []),
          ...item.specs.flatMap((spec) => [spec.label, spec.value]),
        ].some((value) => value.toLocaleLowerCase().includes(normalizedSearch));
      const matchesCategory =
        selectedCategory === "all" ||
        item.categorySlug === selectedCategory;
      const matchesAvailability =
        selectedAvailability === "all" ||
        item.availability.status === selectedAvailability;

      return matchesSearch && matchesCategory && matchesAvailability;
    })
    .sort((first, second) => {
      switch (sortBy) {
        case "name-asc":
          return first.name.localeCompare(second.name);
        case "rate-asc":
        case "rate-desc": {
          if (first.dailyRate === undefined) {
            return second.dailyRate === undefined ? 0 : 1;
          }
          if (second.dailyRate === undefined) {
            return -1;
          }
          return sortBy === "rate-asc"
            ? first.dailyRate - second.dailyRate
            : second.dailyRate - first.dailyRate;
        }
        default:
          return 0;
      }
    });

  const hasActiveFilters =
    search.trim().length > 0 ||
    selectedCategory !== "all" ||
    selectedAvailability !== "all" ||
    sortBy !== "recommended";

  function resetFilters() {
    setSearch("");
    setSelectedCategory("all");
    setSelectedAvailability("all");
    setSortBy("recommended");
  }

  return (
    <div>
      <div className="grid gap-4 border-y border-stone-300 bg-stone-100/70 p-4 sm:grid-cols-2 lg:grid-cols-[minmax(15rem,2fr)_repeat(3,minmax(10rem,1fr))] lg:gap-3 lg:p-5">
        <div>
          <label
            htmlFor="equipment-search"
            className="mb-1.5 block text-xs font-semibold text-stone-700"
          >
            Search equipment
          </label>
          <div className="relative">
            <input
              id="equipment-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Name, category, or application"
              className="h-11 w-full appearance-none rounded-sm border border-stone-300 bg-white px-3 pr-10 text-sm text-stone-900 placeholder:text-stone-500 focus:border-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-700/20"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="absolute inset-y-0 right-0 z-10 inline-flex min-w-10 items-center justify-center text-lg text-stone-500 hover:text-stone-950"
              >
                ×
              </button>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="equipment-category"
            className="mb-1.5 block text-xs font-semibold text-stone-700"
          >
            Category
          </label>
          <select
            id="equipment-category"
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
            className="h-11 w-full rounded-sm border border-stone-300 bg-white px-3 text-sm text-stone-900 focus:border-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-700/20"
          >
            <option value="all">All categories</option>
            {categories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="equipment-availability"
            className="mb-1.5 block text-xs font-semibold text-stone-700"
          >
            Availability
          </label>
          <select
            id="equipment-availability"
            value={selectedAvailability}
            onChange={(event) => {
              const nextStatus = availabilityOptions.find(
                (status) => status === event.target.value,
              );
              setSelectedAvailability(nextStatus ?? "all");
            }}
            className="h-11 w-full rounded-sm border border-stone-300 bg-white px-3 text-sm text-stone-900 focus:border-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-700/20"
          >
            <option value="all">All statuses</option>
            {availabilityOptions.map((status) => (
              <option key={status} value={status}>
                {availabilityLabels[status]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="equipment-sort"
            className="mb-1.5 block text-xs font-semibold text-stone-700"
          >
            Sort by
          </label>
          <select
            id="equipment-sort"
            value={sortBy}
            onChange={(event) => {
              const nextSort = sortOptions.find(
                (option) => option === event.target.value,
              );
              if (nextSort) {
                setSortBy(nextSort);
              }
            }}
            className="h-11 w-full rounded-sm border border-stone-300 bg-white px-3 text-sm text-stone-900 focus:border-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-700/20"
          >
            <option value="recommended">Recommended</option>
            <option value="name-asc">Name, A–Z</option>
            <option value="rate-asc">Lowest daily rate</option>
            <option value="rate-desc">Highest daily rate</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-3 border-b border-stone-200 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p
          className="text-sm text-stone-700"
          aria-live="polite"
          aria-atomic="true"
        >
          <span className="font-bold text-stone-950">
            {filteredEquipment.length}
          </span>{" "}
          {filteredEquipment.length === 1 ? "item" : "items"} found
        </p>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex min-h-10 items-center self-start text-sm font-semibold text-stone-700 underline decoration-stone-400 underline-offset-4 hover:text-amber-800 sm:self-auto"
          >
            Reset filters
          </button>
        )}
      </div>

      {hasActiveFilters && (
        <div
          className="flex flex-wrap gap-2 pt-4"
          aria-label="Active catalogue filters"
        >
          {search.trim() && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="inline-flex min-h-8 items-center gap-2 border border-stone-300 bg-white px-2.5 text-xs text-stone-700 hover:border-stone-500"
            >
              Search: “{search.trim()}” <span aria-hidden="true">×</span>
              <span className="sr-only">Clear search filter</span>
            </button>
          )}
          {selectedCategory !== "all" && (
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className="inline-flex min-h-8 items-center gap-2 border border-stone-300 bg-white px-2.5 text-xs text-stone-700 hover:border-stone-500"
            >
              {categories.find((item) => item.slug === selectedCategory)?.name ??
                selectedCategory}
              <span aria-hidden="true">×</span>
              <span className="sr-only">Clear category filter</span>
            </button>
          )}
          {selectedAvailability !== "all" && (
            <button
              type="button"
              onClick={() => setSelectedAvailability("all")}
              className="inline-flex min-h-8 items-center gap-2 border border-stone-300 bg-white px-2.5 text-xs text-stone-700 hover:border-stone-500"
            >
              {availabilityLabels[selectedAvailability]}
              <span aria-hidden="true">×</span>
              <span className="sr-only">Clear availability filter</span>
            </button>
          )}
          {sortBy !== "recommended" && (
            <button
              type="button"
              onClick={() => setSortBy("recommended")}
              className="inline-flex min-h-8 items-center gap-2 border border-stone-300 bg-white px-2.5 text-xs text-stone-700 hover:border-stone-500"
            >
              Sorted:{" "}
              {sortBy === "name-asc"
                ? "Name, A–Z"
                : sortBy === "rate-asc"
                  ? "Lowest daily rate"
                  : "Highest daily rate"}
              <span aria-hidden="true">×</span>
              <span className="sr-only">Reset sort order</span>
            </button>
          )}
        </div>
      )}

      <p className="mt-4 text-xs leading-relaxed text-stone-600">
        Availability and illustrative demo rates are not live inventory or
        commercial quotes. Please enquire to confirm current availability and
        pricing.
      </p>

      {filteredEquipment.length > 0 ? (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredEquipment.map((item) => (
            <EquipmentCard key={item.id} equipment={item} />
          ))}
        </div>
      ) : (
        <section
          className="mt-6 border border-stone-300 bg-white px-5 py-12 text-center sm:px-10"
          aria-labelledby="equipment-empty-heading"
        >
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-800">
            No matching equipment
          </p>
          <h2
            id="equipment-empty-heading"
            className="mt-3 text-xl font-bold text-stone-950"
          >
            Try changing your search or filters.
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-stone-600">
            There are no catalogue items matching those criteria. Clear the
            filters to see the full equipment range.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-6 inline-flex min-h-11 items-center justify-center bg-stone-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-stone-800"
          >
            Reset filters
          </button>
        </section>
      )}
    </div>
  );
}
