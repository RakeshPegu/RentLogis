export interface EquipmentCategory {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  fleetCount: number;
  featuredTypes: string[];
  image: {
    src: string;
    alt: string;
  };
}

