import { EquipmentCategory } from "@/types/category";

export const equipmentCategories: EquipmentCategory[] = [
  {
    id: "earthmoving",
    slug: "earthmoving",
    name: "Earthmoving Equipment",
    tagline: "Heavy-duty excavators, loaders, and crawler machinery",
    description: "Built for mass earthworks, structural trenching, and aggressive foundation preparation across demanding job sites.",
    fleetCount: 24,
    featuredTypes: ["Hydraulic Excavators", "Wheel Loaders", "Crawler Dozers", "Mini Excavators"],
    image: {
      src: "/images/cat-earthmoving.jpg",
      alt: "Heavy Volvo wheel loader clearing material on an active site",
    },
  },
  {
    id: "aerial-platforms",
    slug: "aerial-platforms",
    name: "Aerial Work Platforms",
    tagline: "High-reach articulated booms & electric slab scissor lifts",
    description: "Safe, compliant overhead access systems engineered for structural steel erection, cladding, electrical, and mechanical installations.",
    fleetCount: 19,
    featuredTypes: ["Articulated Booms", "Electric Scissor Lifts", "Telescopic Booms", "Rough-Terrain Scissor Lifts"],
    image: {
      src: "/images/cat-aerial.jpg",
      alt: "Genie articulated boom lift reaching building exterior",
    },
  },
  {
    id: "material-handling",
    slug: "material-handling",
    name: "Material Handling",
    tagline: "Rough-terrain telehandlers and heavy payload forklifts",
    description: "Versatile lifting and placement machines designed for palletized staging, steel handling, and multistory site deliveries.",
    fleetCount: 16,
    featuredTypes: ["Telescopic Handlers", "Rough-Terrain Forklifts", "Industrial Forklifts", "Pallet Stackers"],
    image: {
      src: "/images/cat-material-handling.jpg",
      alt: "JCB telescopic handler with pallet forks ready for material staging",
    },
  },
  {
    id: "power-equipment",
    slug: "power-equipment",
    name: "Power & Generation",
    tagline: "Mobile sound-attenuated diesel generators & site distribution",
    description: "Continuous and standby industrial power plants delivering reliable 3-phase electricity with integrated fuel bunding.",
    fleetCount: 14,
    featuredTypes: ["Towable Generators", "Mobile Light Towers", "Site Distribution Boxes", "Transfer Switches"],
    image: {
      src: "/images/cat-power.jpg",
      alt: "CAT Rental Power mobile diesel generator trailer connected on job site",
    },
  },
  {
    id: "compaction",
    slug: "compaction",
    name: "Compaction Equipment",
    tagline: "Tandem asphalt rollers and vibratory soil compactors",
    description: "High-performance compaction units ensuring specified density for sub-base preparation, road surfacing, and trench backfill.",
    fleetCount: 11,
    featuredTypes: ["Tandem Rollers", "Single Drum Soil Compactors", "Trench Rollers", "Vibratory Plates"],
    image: {
      src: "/images/cat-compaction.jpg",
      alt: "HAMM tandem asphalt roller with oscillation drums on construction ground",
    },
  },
];

