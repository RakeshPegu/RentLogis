export interface EquipmentSpec {
  label: string;
  value: string;
}

export type AvailabilityStatus = "available" | "reserved" | "limited";

export interface EquipmentAvailability {
  status: AvailabilityStatus;
  label: string;
  badgeText: string;
  leadTime?: string;
}

export interface EquipmentImage {
  src: string;
  alt: string;
  label?: string;
}

export interface SpecGroup {
  group: string;
  items: EquipmentSpec[];
}

export interface RentalConditions {
  deliveryOptions: string;
  operatorType: string;
  fuelPolicy: string;
  maintenanceIncluded: string;
  depositTerms?: string;
}

export interface EquipmentItem {
  id: string;
  name: string;
  model: string;
  category: string;
  categorySlug: string;
  dailyRate: number;
  weeklyRate?: number;
  monthlyRate?: number;
  minRentalPeriod?: string;
  currency: string;
  ratePeriod: string;
  isDemoRate: boolean;
  availability: EquipmentAvailability;
  specs: EquipmentSpec[];
  shortDescription: string;
  fullDescription?: string;
  image: EquipmentImage;
  galleryImages?: EquipmentImage[];
  applications?: string[];
  suitableProjects?: string[];
  operationalNotes?: string[];
  rentalConditions?: RentalConditions;
  technicalSpecifications?: SpecGroup[];
  detailRoute: string;
  enquiryRoute: string;
}
