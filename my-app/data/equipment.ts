import { EquipmentItem } from "@/types/equipment";

export const featuredEquipment: EquipmentItem[] = [
  {
    id: "cat-330-excavator",
    name: "Caterpillar 330 Hydraulic Excavator",
    model: "CAT 330 Next-Generation (30t Operating Class)",
    category: "Earthmoving Equipment",
    categorySlug: "earthmoving",
    dailyRate: 485,
    weeklyRate: 1940,
    monthlyRate: 5820,
    minRentalPeriod: "1 Day Minimum Hire",
    currency: "$",
    ratePeriod: "day",
    isDemoRate: true,
    availability: {
      status: "available",
      label: "Available for Immediate Dispatch",
      badgeText: "In Yard · Ready to Ship",
      leadTime: "Same-day or next-day site delivery",
    },
    specs: [
      { label: "Operating Weight", value: "30,900 kg" },
      { label: "Max Digging Depth", value: "7.25 m (23 ft 9 in)" },
      { label: "Net Flywheel Power", value: "275 hp (205 kW)" },
      { label: "Bucket Capacity", value: "1.76 m³" },
    ],
    shortDescription:
      "Full-sized hydraulic crawler excavator engineered for bulk dirt removal, mass site excavation, deep trenching, and utility installation with integrated Cat Grade payload control.",
    fullDescription:
      "The Caterpillar 330 Next-Generation hydraulic excavator delivers high production performance with exceptional fuel efficiency. Built for high-volume earthworks, deep civil trenching, and structural excavation, this machine incorporates factory-integrated Grade 2D technology to enhance grading accuracy and operator efficiency. The robust undercarriage and high-pressure hydraulic circuit provide sustained breakout force when working in compact clay, rocky subgrade, and aggregate stockpiles.",
    image: {
      src: "/images/hero-excavator.jpg",
      alt: "Caterpillar 330 hydraulic crawler excavator working on active site excavation",
      label: "Excavator in Active Digging Position",
    },
    galleryImages: [
      {
        src: "/images/hero-excavator.jpg",
        alt: "Caterpillar 330 hydraulic crawler excavator working on active site excavation",
        label: "Excavator in Active Digging Position",
      },
      {
        src: "/images/cat-earthmoving.jpg",
        alt: "Earthmoving machinery staging on civil jobsite",
        label: "Jobsite Earthmoving Operations",
      },
    ],
    applications: [
      "Bulk commercial excavation and multi-story basement digs",
      "Deep stormwater, sewer, and utility trenching down to 7.25m",
      "Foundation footing preparation, batter trimming, and retention piles",
      "Demolition sorting and heavy site debris loading with hydraulic attachments",
    ],
    suitableProjects: [
      "Commercial construction & high-density residential subdivisions",
      "Civil highway and municipal infrastructure projects",
      "Industrial site remediation and bulk earthworks developments",
    ],
    operationalNotes: [
      "Requires low-loader / heavy flatbed float transport for highway transit",
      "Ground bearing pressure of 58 kPa; site access roads must withstand 31-tonne point loads",
      "Equipped with standard dual-locking hydraulic quick hitch for rapid bucket and hammer changeover",
    ],
    rentalConditions: {
      deliveryOptions: "Direct flatbed float delivery to jobsite or arranged collection by licensed heavy hauler from Central Depot",
      operatorType: "Dry Hire (Contractor operated; valid excavator operator ticket / competency required)",
      fuelPolicy: "Supplied with full tank of ultra-low sulfur diesel (ULSD); return full or refueled at standard depot rate",
      maintenanceIncluded: "Pre-hire fluid, safety, and track tension inspection completed; 250-hour scheduled service handled by RentLogi mobile technicians",
      depositTerms: "Standard commercial trade account billing or refundable security authorization prior to unit dispatch",
    },
    technicalSpecifications: [
      {
        group: "Operating Capabilities",
        items: [
          { label: "Operating Weight", value: "30,900 kg (68,122 lbs)" },
          { label: "Max Digging Depth", value: "7.25 m (23 ft 9 in)" },
          { label: "Max Reach at Ground Level", value: "10.68 m (35 ft 1 in)" },
          { label: "Max Loading Height", value: "7.02 m (23 ft 0 in)" },
          { label: "Bucket Breakout Force (ISO)", value: "179 kN (40,240 lbf)" },
          { label: "Standard Bucket Capacity", value: "1.76 m³ (2.30 yd³)" },
        ],
      },
      {
        group: "Engine & Powertrain",
        items: [
          { label: "Engine Model", value: "Cat C7.1 ACERT Turbo Diesel" },
          { label: "Gross Engine Output", value: "275 hp (205 kW) @ 1,800 rpm" },
          { label: "Emission Standard", value: "EPA Tier 4 Final / EU Stage V" },
          { label: "Fuel Tank Capacity", value: "474 L (125.2 gal)" },
          { label: "DEF Tank Capacity", value: "41 L (10.8 gal)" },
        ],
      },
      {
        group: "Hydraulic System",
        items: [
          { label: "Main System Flow", value: "2 x 280 L/min (2 x 74 gal/min)" },
          { label: "Maximum Working Pressure", value: "35,000 kPa (5,076 psi)" },
          { label: "Auxiliary Circuit Pressure", value: "35,000 kPa (High Pressure / Hammer ready)" },
          { label: "Swing Speed", value: "11.5 rpm" },
        ],
      },
      {
        group: "Dimensions & Transport",
        items: [
          { label: "Transport Overall Length", value: "10.42 m (34 ft 2 in)" },
          { label: "Overall Shipping Width", value: "3.19 m (10 ft 6 in)" },
          { label: "Transport Cab Height", value: "3.15 m (10 ft 4 in)" },
          { label: "Track Shoe Width", value: "600 mm (24 in) Triple Grouser" },
          { label: "Ground Clearance", value: "470 mm (1 ft 7 in)" },
        ],
      },
    ],
    detailRoute: "/equipment/cat-330-excavator",
    enquiryRoute: "/rental-enquiry?equipment=cat-330-excavator",
  },
  {
    id: "bobcat-t650-track-loader",
    name: "Bobcat T650 Compact Track Loader",
    model: "Bobcat T650 High-Flow Rubber Track",
    category: "Earthmoving & Site Prep",
    categorySlug: "earthmoving",
    dailyRate: 295,
    weeklyRate: 1180,
    monthlyRate: 3540,
    minRentalPeriod: "1 Day Minimum Hire",
    currency: "$",
    ratePeriod: "day",
    isDemoRate: true,
    availability: {
      status: "available",
      label: "Available for Dispatch",
      badgeText: "In Yard · Serviced",
      leadTime: "Immediate yard collection or next-morning site transport",
    },
    specs: [
      { label: "Rated Operating Capacity (35%)", value: "1,166 kg" },
      { label: "Operating Weight", value: "4,240 kg" },
      { label: "Engine Output", value: "74 hp Tier 4 Final" },
      { label: "Ground Pressure", value: "4.2 psi (Rubber Tracks)" },
    ],
    shortDescription:
      "High-tractive compact rubber-track loader delivering low ground disturbance in mud, sand, and rough topography. Ideal for grading, site clearing, and heavy pallet staging.",
    fullDescription:
      "The Bobcat T650 is a versatile compact track loader engineered for maximum traction and minimal ground disturbance. Featuring wide rubber tracks, a powerful Tier 4 diesel engine, and high-flow auxiliary hydraulics, this loader excels in tight residential lots, muddy civil sites, and soft landscape terrain where wheeled skid steers struggle. Its vertical lift path provides extra reach at full height for dumping directly into high-sided dump trucks.",
    image: {
      src: "/images/eq-skid-steer.jpg",
      alt: "Bobcat T650 compact rubber track loader with bucket on earth site",
      label: "Side View / Working Profile",
    },
    galleryImages: [
      {
        src: "/images/eq-skid-steer.jpg",
        alt: "Bobcat T650 compact rubber track loader with bucket on earth site",
        label: "Side View / Working Profile",
      },
      {
        src: "/images/cat-earthmoving.jpg",
        alt: "Site grading and aggregate handling",
        label: "Site Earthworks Staging",
      },
    ],
    applications: [
      "Precision fine grading, turf preparation, and topsoil spreading",
      "Material handling and pallet staging on wet, loose, or sandy surfaces",
      "Backfilling around foundation stem walls and swimming pools in restricted spaces",
      "Operating high-flow hydraulic attachments including trenchers, sweepers, and augers",
    ],
    suitableProjects: [
      "Residential custom builds and house foundation prep",
      "Commercial landscaping and parking lot sub-base grading",
      "Road utility maintenance and municipal trench backfilling",
    ],
    operationalNotes: [
      "Rubber tracks distribute weight across 4.2 psi to prevent damaging existing pavements or delicate soils",
      "Equipped with standard Bob-Tach mechanical attachment mounting plate",
      "Transportable on standard heavy dual-axle plant trailers behind properly rated utility pickups",
    ],
    rentalConditions: {
      deliveryOptions: "Local tilt-tray transport or collection with suitably rated commercial trailer (4.5-tonne GVM)",
      operatorType: "Dry Hire (Contractor operated; rollover protection and seat bar interlock standard)",
      fuelPolicy: "Delivered full of clean Tier 4 diesel; return full or depot refuel charge applies",
      maintenanceIncluded: "Pre-hire track tension, fluid levels, and hydraulic hose inspection completed",
      depositTerms: "Commercial account or refundable pre-authorization upon equipment pickup",
    },
    technicalSpecifications: [
      {
        group: "Capacity & Performance",
        items: [
          { label: "Rated Operating Capacity (35% Tipping)", value: "1,166 kg (2,570 lbs)" },
          { label: "Rated Operating Capacity (50% Tipping)", value: "1,665 kg (3,670 lbs)" },
          { label: "Tipping Load", value: "3,331 kg (7,343 lbs)" },
          { label: "Operating Weight", value: "4,240 kg (9,348 lbs)" },
          { label: "Ground Pressure", value: "4.2 psi (29 kPa)" },
          { label: "Travel Speed (Low / High)", value: "10.6 km/h / 17.2 km/h" },
        ],
      },
      {
        group: "Engine & Fuel",
        items: [
          { label: "Engine Model", value: "Bobcat 2.4L Turbocharged Diesel" },
          { label: "Engine Power", value: "74.3 hp (55.4 kW) @ 2,600 rpm" },
          { label: "Emission Standard", value: "EPA Tier 4 Final" },
          { label: "Fuel Tank Capacity", value: "138.2 L (36.5 gal)" },
        ],
      },
      {
        group: "Hydraulic System",
        items: [
          { label: "Standard Auxiliary Flow", value: "20.7 gpm (78.4 L/min)" },
          { label: "High-Flow Auxiliary Option", value: "30.5 gpm (115.5 L/min)" },
          { label: "System Relief Pressure", value: "3,500 psi (241 bar)" },
          { label: "Lift Path Type", value: "Vertical Lift Path" },
        ],
      },
      {
        group: "Dimensions",
        items: [
          { label: "Length with Standard Bucket", value: "3.47 m (137 in)" },
          { label: "Width over Rubber Tracks", value: "1.85 m (73 in)" },
          { label: "Height to Top of ROPS Cab", value: "2.06 m (81 in)" },
          { label: "Height to Bucket Hinge Pin", value: "3.15 m (124 in)" },
          { label: "Reach at Maximum Height", value: "0.85 m (33.6 in)" },
        ],
      },
    ],
    detailRoute: "/equipment/bobcat-t650-track-loader",
    enquiryRoute: "/rental-enquiry?equipment=bobcat-t650-track-loader",
  },
  {
    id: "genie-gs2032-scissor-lift",
    name: "Genie GS-2032 Electric Scissor Lift",
    model: "Genie GS-2032 Narrow Slab Electric",
    category: "Aerial Work Platforms",
    categorySlug: "aerial-platforms",
    dailyRate: 165,
    weeklyRate: 660,
    monthlyRate: 1980,
    minRentalPeriod: "1 Day Minimum Hire",
    currency: "$",
    ratePeriod: "day",
    isDemoRate: true,
    availability: {
      status: "available",
      label: "Available for Immediate Dispatch",
      badgeText: "In Yard · Inspected",
      leadTime: "Immediate dispatch or next-day site delivery",
    },
    specs: [
      { label: "Max Working Height", value: "8.10 m (26 ft 6 in)" },
      { label: "Platform Capacity", value: "363 kg (800 lbs)" },
      { label: "Chassis Width", value: "0.81 m (32 in) Narrow Aisle" },
      { label: "Drive Type", value: "Electric / Non-Marking Tires" },
    ],
    shortDescription:
      "Compact zero-emission slab scissor lift designed to drive through standard single doorways. Quiet battery operation with roll-out deck extension for indoor commercial contractor work.",
    fullDescription:
      "The Genie GS-2032 is an electric scissor lift tailored for indoor maintenance, commercial fit-outs, and warehouse installations. Measuring just 0.81m (32 inches) wide, this machine easily passes through standard single doorways and operates smoothly in tight building corridors. The high-capacity battery system provides clean, fume-free power for full working shifts, while non-marking solid rubber tires safeguard finished floors.",
    image: {
      src: "/images/eq-scissor-lift.jpg",
      alt: "Genie GS-2032 electric slab scissor lift in elevated position",
      label: "Machine Profile / Scissor Stack",
    },
    galleryImages: [
      {
        src: "/images/eq-scissor-lift.jpg",
        alt: "Genie GS-2032 electric slab scissor lift in elevated position",
        label: "Machine Profile / Scissor Stack",
      },
      {
        src: "/images/cat-aerial.jpg",
        alt: "Overhead aerial access work on building",
        label: "Elevated Access Work",
      },
    ],
    applications: [
      "Overhead electrical conduit, commercial lighting, and cable tray runs",
      "HVAC duct hanging, fire protection piping, and structural ceiling fittings",
      "Drywall finishing, commercial painting, and architectural ceiling panels",
      "Warehouse pallet racking assembly and facility inventory inspection",
    ],
    suitableProjects: [
      "Commercial distribution centers, retail fit-outs, and supermarket constructions",
      "School, hospital, and municipal building renovations",
      "Industrial manufacturing plant maintenance shutdowns",
    ],
    operationalNotes: [
      "Designed specifically for level, solid concrete slab floors (max 25% gradeability when stowed)",
      "Zero-emission battery electric drive with proportional joystick lift and steer control",
      "Fold-down guardrails permit transport through low-clearance doorways and freight elevators",
    ],
    rentalConditions: {
      deliveryOptions: "Delivered directly to site via flatbed tilt-tray with winch or ground loading dock",
      operatorType: "Dry Hire (Contractor operated; certified MEWP operator safety training recommended)",
      fuelPolicy: "Supplied with 100% battery charge; includes onboard automatic smart charger (standard 110V/230V cord)",
      maintenanceIncluded: "Pre-hire safety harness anchor test, emergency descent valve check, and annual certification valid",
      depositTerms: "Standard commercial trade credit terms or card hold prior to equipment release",
    },
    technicalSpecifications: [
      {
        group: "Height & Reach",
        items: [
          { label: "Maximum Working Height", value: "8.10 m (26 ft 6 in)" },
          { label: "Platform Height (Elevated)", value: "6.10 m (20 ft 0 in)" },
          { label: "Platform Height (Stowed)", value: "1.03 m (3 ft 5 in)" },
          { label: "Lift Capacity (Total)", value: "363 kg (800 lbs)" },
          { label: "Extension Deck Capacity", value: "113 kg (250 lbs)" },
          { label: "Max Occupants", value: "2 Persons (Indoor) / 1 Person (Outdoor)" },
        ],
      },
      {
        group: "Platform & Extension Deck",
        items: [
          { label: "Platform Dimensions (Stowed)", value: "2.26 m x 0.81 m (7 ft 5 in x 2 ft 8 in)" },
          { label: "Roll-Out Extension Deck Length", value: "0.91 m (3 ft 0 in)" },
          { label: "Platform Height with Rails Up", value: "2.13 m (7 ft 0 in)" },
          { label: "Platform Height with Rails Folded", value: "1.78 m (5 ft 10 in)" },
          { label: "Toeboard Height", value: "0.15 m (6 in)" },
        ],
      },
      {
        group: "Chassis & Mobility",
        items: [
          { label: "Machine Overall Width", value: "0.81 m (32 in)" },
          { label: "Machine Overall Length", value: "2.44 m (8 ft 0 in)" },
          { label: "Wheelbase", value: "1.85 m (6 ft 1 in)" },
          { label: "Ground Clearance (Center)", value: "90 mm (3.5 in)" },
          { label: "Turning Radius (Inside)", value: "Zero (Zero Inside Turning Radius)" },
          { label: "Tires", value: "Solid Non-Marking Rubber 38 x 13 cm" },
        ],
      },
      {
        group: "Power & Weight",
        items: [
          { label: "Gross Machine Weight", value: "1,825 kg (4,024 lbs)" },
          { label: "Power System", value: "24V DC (Four 6V 225Ah Deep Cycle Batteries)" },
          { label: "Drive Speed (Stowed)", value: "3.5 km/h (2.2 mph)" },
          { label: "Drive Speed (Elevated)", value: "0.8 km/h (0.5 mph)" },
          { label: "Gradeability (Stowed)", value: "25%" },
        ],
      },
    ],
    detailRoute: "/equipment/genie-gs2032-scissor-lift",
    enquiryRoute: "/rental-enquiry?equipment=genie-gs2032-scissor-lift",
  },
  {
    id: "cat-xqp70-generator",
    name: "CAT XQP70 Mobile Industrial Generator",
    model: "Caterpillar 70kVA Sound-Attenuated Unit",
    category: "Power & Generation",
    categorySlug: "power-equipment",
    dailyRate: 240,
    weeklyRate: 960,
    monthlyRate: 2880,
    minRentalPeriod: "1 Day Minimum Hire",
    currency: "$",
    ratePeriod: "day",
    isDemoRate: true,
    availability: {
      status: "available",
      label: "Available for Dispatch",
      badgeText: "Towable · Fleet Ready",
      leadTime: "Same-day depot hitch or scheduled tilt-tray site drop",
    },
    specs: [
      { label: "Prime Output Rating", value: "70 kVA / 56 kW" },
      { label: "Voltage Configuration", value: "400V / 230V 3-Phase + 1-Phase" },
      { label: "Acoustic Attenuation", value: "65 dBA @ 7 meters" },
      { label: "Fuel Autonomy", value: "24-Hour Internal Bunded Tank" },
    ],
    shortDescription:
      "Fully self-contained, road-towable sound-attenuated diesel generator package with integrated digital control system, circuit protection, and high-efficiency low-emission diesel engine.",
    fullDescription:
      "The Caterpillar XQP70 is a heavy-duty rental power module built for extreme reliability in demanding construction and industrial applications. Designed within an acoustically insulated, weatherproof canopy, this unit operates at whisper-quiet sound levels (65 dBA at 7 meters), meeting municipal noise restrictions in urban zones. Featuring multi-voltage distribution receptacles, integrated earth leakage protection, and a 24-hour internal bunded fuel cell, it provides dependable prime power before mains utility connection.",
    image: {
      src: "/images/eq-generator.jpg",
      alt: "CAT mobile diesel generator trailer parked on construction site",
      label: "Trailer-Mounted Rental Unit",
    },
    galleryImages: [
      {
        src: "/images/eq-generator.jpg",
        alt: "CAT mobile diesel generator trailer parked on construction site",
        label: "Trailer-Mounted Rental Unit",
      },
      {
        src: "/images/cat-power.jpg",
        alt: "CAT Rental Power mobile diesel generator trailer connected on job site",
        label: "Site Power Distribution Staging",
      },
    ],
    applications: [
      "Temporary prime power for construction jobsite offices and welfare sheds",
      "Supplying heavy 3-phase machinery including crane hoists, welders, and dewatering pumps",
      "Emergency standby power during scheduled utility transformer maintenance shutdowns",
      "Powering industrial concrete curing heaters and ground thaw equipment",
    ],
    suitableProjects: [
      "Remote civil road, bridge, and pipeline construction sites",
      "Urban high-rise building projects prior to permanent electrical connection",
      "Industrial facility maintenance and scheduled plant turnaround power",
    ],
    operationalNotes: [
      "Integrated 110% environmental fluid containment basin protects against spills",
      "Equipped with dual voltage selector switch for 400V 3-phase or 230V 1-phase service",
      "Fitted with external emergency stop button and lockable battery isolator",
    ],
    rentalConditions: {
      deliveryOptions: "Supplied on heavy road-towable trailer (pintle/ball hitch) or delivered via tilt-tray truck",
      operatorType: "Dry Hire (Licensed site electrician required for connection into site distribution boards)",
      fuelPolicy: "Supplied full with diesel; continuous site fuel delivery can be scheduled upon request",
      maintenanceIncluded: "Automatic safety shutdown protection on low oil pressure, high water temp, and overspeed",
      depositTerms: "Standard commercial trade account invoicing or verified business security authorization",
    },
    technicalSpecifications: [
      {
        group: "Electrical Power Ratings",
        items: [
          { label: "Prime Power Output", value: "70 kVA / 56 kW (Continuous Duty)" },
          { label: "Standby Power Output", value: "77 kVA / 62 kW" },
          { label: "Voltage Configuration", value: "400V / 230V 3-Phase, 4-Wire + Earth" },
          { label: "Rated Frequency", value: "50 Hz / 60 Hz Selectable" },
          { label: "Continuous Amperage @ 400V", value: "101.0 Amps" },
          { label: "Power Factor", value: "0.8 (Lagging)" },
        ],
      },
      {
        group: "Engine & Fuel System",
        items: [
          { label: "Engine Model", value: "Cat C4.4 Turbocharged Aftercooled Diesel" },
          { label: "Engine Speed", value: "1,500 rpm (50Hz) / 1,800 rpm (60Hz)" },
          { label: "Aspiration", value: "Turbocharged Aftercooled" },
          { label: "Fuel Tank Capacity", value: "240 L (63.4 gal) Internal Bunded Tank" },
          { label: "Fuel Consumption (100% Prime Load)", value: "15.2 L/hr (4.0 gal/hr)" },
          { label: "Continuous Autonomy @ 75% Load", value: "Approx. 20.5 Hours" },
        ],
      },
      {
        group: "Acoustics & Enclosure",
        items: [
          { label: "Sound Attenuation", value: "65 dBA @ 7 meters (23 ft)" },
          { label: "Enclosure Construction", value: "Galvanized Steel Weatherproof Sound Canopy" },
          { label: "Fluid Containment", value: "110% Environmentally Bunded Basin" },
          { label: "Lifting Provisions", value: "Central Single-Point Lifting Eye + Fork Pockets" },
        ],
      },
      {
        group: "Dimensions & Transport Weight",
        items: [
          { label: "Trailer Unit Overall Length", value: "4.10 m (13 ft 5 in)" },
          { label: "Trailer Unit Overall Width", value: "1.65 m (5 ft 5 in)" },
          { label: "Trailer Unit Overall Height", value: "1.85 m (6 ft 1 in)" },
          { label: "Wet Operating Weight", value: "2,150 kg (4,740 lbs)" },
          { label: "Hitch Connection", value: "50mm Ball Hitch / Pintle Ring Interchangeable" },
        ],
      },
    ],
    detailRoute: "/equipment/cat-xqp70-generator",
    enquiryRoute: "/rental-enquiry?equipment=cat-xqp70-generator",
  },
];

export function getEquipmentById(id: string): EquipmentItem | undefined {
  return featuredEquipment.find((item) => item.id === id);
}

export function getAllEquipment(): EquipmentItem[] {
  return featuredEquipment;
}

export function getRelatedEquipment(currentId: string, limit: number = 3): EquipmentItem[] {
  return featuredEquipment.filter((item) => item.id !== currentId).slice(0, limit);
}
