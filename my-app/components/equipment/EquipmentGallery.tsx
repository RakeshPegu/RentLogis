"use client";

import { useState } from "react";
import Image from "next/image";
import { EquipmentImage } from "@/types/equipment";

interface EquipmentGalleryProps {
  primaryImage: EquipmentImage;
  galleryImages?: EquipmentImage[];
  equipmentName: string;
}

export function EquipmentGallery({
  primaryImage,
  galleryImages = [],
  equipmentName,
}: EquipmentGalleryProps) {
  // If galleryImages provided, use it; otherwise fallback to primaryImage as single item
  const allImages = galleryImages.length > 0 ? galleryImages : [primaryImage];
  const [selectedIndex, setSelectedIndex] = useState(0);

  const currentImage = allImages[selectedIndex] || primaryImage;

  return (
    <div className="flex flex-col space-y-3">
      {/* Primary Display Stage */}
      <div className="relative aspect-4/3 w-full bg-stone-900 rounded-md overflow-hidden border border-stone-300 shadow-xs">
        <Image
          src={currentImage.src}
          alt={currentImage.alt || `${equipmentName} main view`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="object-cover object-center transition-all duration-300"
        />

        {/* View Indicator Badge */}
        {currentImage.label && (
          <div className="absolute bottom-3 left-3 bg-stone-950/85 backdrop-blur-xs text-stone-200 text-xs px-2.5 py-1 rounded-xs border border-stone-800">
            <span>{currentImage.label}</span>
          </div>
        )}

        {/* Image Counter (if multiple) */}
        {allImages.length > 1 && (
          <div className="absolute top-3 right-3 bg-stone-950/80 backdrop-blur-xs text-white text-[11px] font-mono font-medium px-2 py-0.5 rounded-xs border border-stone-800">
            {selectedIndex + 1} / {allImages.length}
          </div>
        )}
      </div>

      {/* Thumbnails Row (only when multiple images exist) */}
      {allImages.length > 1 && (
        <div className="flex items-center gap-2.5 overflow-x-auto pb-1" role="tablist" aria-label="Equipment image views">
          {allImages.map((img, idx) => {
            const isSelected = idx === selectedIndex;
            return (
              <button
                key={idx}
                type="button"
                role="tab"
                aria-selected={isSelected}
                aria-label={`View photo ${idx + 1}: ${img.label || equipmentName}`}
                onClick={() => setSelectedIndex(idx)}
                className={`relative w-20 h-16 sm:w-24 sm:h-18 rounded-xs overflow-hidden border-2 transition-all shrink-0 focus:outline-none ${
                  isSelected
                    ? "border-amber-600 ring-2 ring-amber-600/30 opacity-100"
                    : "border-stone-300 hover:border-stone-400 opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="96px"
                  className="object-cover object-center"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

