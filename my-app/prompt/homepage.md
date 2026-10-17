# Task: Build a Premium Equipment Rental Homepage for RentLogi

Act as a senior product designer and experienced frontend engineer specializing in high-quality industrial websites and conversion-focused user experiences.

Build the public homepage for **RentLogi**, a demo equipment rental website intended to showcase InnovHubs' ability to build professional websites for equipment rental businesses.

The result must feel like a carefully designed website for a real industrial business, not a generic AI-generated landing page.

You must implement the changes directly in the existing project.

---

## 1. Mandatory instructions before coding

Before writing or modifying any code:

1. Read the project's `AGENTS.md` and follow its instructions.
2. Inspect the existing project structure, installed dependencies, routes, styling conventions, shared components, and available assets.
3. Determine the installed Next.js version from the actual project dependencies.
4. Read the relevant official Next.js documentation from the installed package's `node_modules/next/dist/docs/` directory before using or modifying Next.js APIs. Follow the generated Next.js agent rules, including any breaking changes and deprecation notices.
5. Inspect the existing application before deciding where files belong.
6. Reuse existing components, dependencies, and design-system conventions wherever appropriate.

Do not assume APIs, file structures, or conventions from previous Next.js versions.

If the relevant installed documentation cannot be accessed, investigate the installed package and report any unresolved uncertainty rather than blindly guessing.

Do not begin implementation until these checks are complete.

## 2. Strict scope

**Build the public homepage only.**

The homepage should contain:

- Public site header and navigation.
- Hero section.
- Business trust strip.
- Equipment categories.
- Featured equipment.
- How renting works.
- Closing call to action.
- Footer.

You may create or update small shared components needed by the homepage.

Do not implement the full equipment catalogue, individual equipment detail pages, rental enquiry workflow, authentication, admin dashboard, database, or backend APIs as part of this task.

If routes already exist, preserve them. If a homepage CTA points to a route that has not yet been implemented, use the intended internal route consistently without building that feature now.

Do not rebuild unrelated pages or refactor unrelated application code.

## 3. Brand and business context

Brand: **RentLogi**

Industry: Construction and industrial equipment rental.

Target customers:
- Construction contractors.
- Builders and developers.
- Site managers.
- Small and medium-sized construction companies.
- Businesses requiring temporary access to specialized machinery.

Primary conversion goal: Encourage customers to enquire about equipment and rental pricing.

Secondary conversion goal: Encourage customers to explore available equipment.

For demonstration purposes, use realistic fictional business information and equipment data wherever required. Do not fabricate verified customer testimonials, awards, certifications, business history, or operational statistics.

The brand should feel dependable, practical, established, and professional.

## 4. Art direction: avoid generic AI-generated design

This requirement is critical.

Do not create a generic SaaS landing page with an oversized centered heading, gradient background, floating cards, and a collection of identical feature boxes.

Avoid:
- Purple, pink, or blue gradients without a clear brand reason.
- Excessive glassmorphism and glowing borders.
- Decorative blobs and arbitrary floating elements.
- Rounded cards for every single content block.
- Excessive pill-shaped elements.
- Huge headings that overwhelm the actual content.
- Repeated three-column feature sections.
- Random animations and decorative icons.
- Generic marketing copy such as "Revolutionizing the future of equipment rental."
- Fake social proof or unsupported business claims.
- Unnecessary sections added simply to make the page longer.

Instead, use deliberate art direction, strong typography, authentic industrial photography, asymmetric composition where appropriate, restrained color, and carefully controlled spacing.

The website should look like a credible industrial brand with a professional design team behind it.

## 5. Visual identity

Use an industrial editorial design direction.

### Colors

Build the visual identity around:

- Warm off-white or stone backgrounds.
- Charcoal and near-black typography.
- Construction orange or muted safety yellow for important actions and accents.
- Neutral grays for secondary text and dividers.

Use the accent color sparingly. The website should not become a sea of orange buttons.

Use dark sections strategically to create contrast against lighter sections.

### Typography

Choose a professional sans-serif typeface suitable for an industrial business.

Establish a consistent hierarchy for:
- Navigation.
- Main headline.
- Section headings.
- Equipment names.
- Descriptive text.
- Rental prices.
- Buttons and labels.

Use readable body text and balanced line lengths. Do not make every heading oversized.

### Layout

Use:
- A clear grid.
- Consistent spacing.
- Strong alignment.
- Deliberate image crops.
- Appropriate content widths.
- Clear separation between sections.
- A responsive layout that feels intentionally designed at every screen size.

Avoid unnecessary shadows, excessive borders, and repetitive card patterns.

Inspect existing styles and shared components before introducing new ones. Do not add another styling system merely for this page.

## 6. Homepage sections

### A. Header and navigation

Build a compact, professional navigation bar.

Include:
- RentLogi brand wordmark.
- Home.
- Equipment.
- Categories.
- About.
- Primary CTA: "Request a Quote".

Requirements:
- Use appropriate internal routes and anchor links.
- Implement a functional mobile navigation menu.
- Maintain sufficient contrast and clear focus indicators.
- Ensure the header does not consume excessive vertical space.
- Keep navigation consistent with the industrial brand identity.

Use a simple text-based wordmark or a restrained typographic logo if no suitable logo asset exists. Do not spend time building an elaborate logo.

### B. Hero section

Create a visually distinctive, image-led hero that immediately communicates what RentLogi offers.

Suggested headline direction:

"Reliable equipment. Ready for your next project."

You may refine the headline if a stronger, more natural option fits the design.

Supporting copy should briefly explain that customers can explore construction equipment and enquire about rental availability and pricing.

Include two clear actions:
- Primary: "Explore Equipment".
- Secondary: "Request a Quote".

Visual direction:
- Use a large, high-quality photograph of real construction machinery.
- Prefer a split composition with strong typography on one side and prominent photography on the other.
- An asymmetric editorial layout is welcome if it improves the visual impact.
- Keep the equipment visible and visually important.
- Use restrained supporting details rather than floating decorative UI cards.
- Ensure the main headline, description, and CTAs are immediately understandable.

Do not use a generic centered hero with a gradient background.

The first viewport should feel polished and communicate the business immediately.

### C. Business trust strip

Add a compact strip immediately after the hero.

Communicate useful customer benefits such as:
- Equipment for projects of different sizes.
- Flexible rental enquiries.
- Clear rental pricing enquiries.
- Availability information.

Use restrained typography, simple separators, or subtle icons.

Do not invent years of experience, customer counts, response-time guarantees, or verified business achievements.

### D. Equipment categories

Create an image-led equipment category section.

Suggested categories:
- Earthmoving Equipment.
- Material Handling.
- Aerial Work Platforms.
- Power Equipment.
- Compaction Equipment.

Include a concise heading and supporting description.

Design requirements:
- Use relevant machinery photography for each category.
- Prefer an editorial grid with carefully varied image proportions over identical generic cards.
- Display category names clearly.
- Add subtle hover states and navigation affordances.
- Make each category item clickable and link to the appropriate catalogue route or category filter where available.

Avoid lengthy descriptions and unnecessary visual clutter.

### E. Featured equipment

Present four realistic demo equipment items:

1. Excavator.
2. Compact skid steer loader.
3. Scissor lift.
4. Portable industrial generator.

Use a dedicated typed data file for equipment information instead of hardcoding data inside the presentation component.

Each item should display:
- Equipment image.
- Name.
- Category.
- Illustrative daily rental rate.
- Availability label only when supported by the demo data.
- Link to view equipment details.
- Enquiry action.

Use consistent information hierarchy, but avoid four oversized, identical cards with excessive corner rounding and shadows.

Make the section easy to scan.

Include a "View All Equipment" link.

All prices must be clearly illustrative demo prices, not real commercial quotes. Use a consistent currency appropriate to the project's intended demo market, and do not mix currencies.

### F. How renting works

Explain the process in three simple steps:

1. Explore equipment.
2. Submit rental requirements.
3. Confirm availability and pricing with the rental team.

Use a clean, compact process layout.

On desktop, a horizontal sequence may work well. On mobile, adapt it into a readable vertical arrangement.

Do not turn this section into an elaborate SaaS feature showcase.

### G. Closing CTA

Create a visually strong final conversion section.

Suggested headline:

"Find the right equipment for your next project."

Include concise supporting copy and two actions:
- "Request a Quote".
- "Browse Equipment".

Consider a charcoal background, restrained orange accent, or carefully selected machinery photograph.

Maintain strong contrast and ensure the CTA is easy to find.

Avoid aggressive sales language and unsupported promises.

### H. Footer

Include:
- RentLogi wordmark.
- Short business description.
- Links to Home, Equipment, Categories, and About.
- Equipment category links.
- Clearly fictional demo contact details where necessary.
- Illustrative service-area information.
- Copyright notice.

Do not invent real social media profiles or link to unrelated websites.

Keep the footer compact, organized, and consistent with the visual identity.

## 7. Photography and assets

Authentic machinery photography is essential to the quality of this design.

Use high-quality, relevant photographs of actual construction equipment.

Requirements:
- Select imagery that matches the specific equipment being presented.
- Use suitable crops and aspect ratios.
- Avoid unrelated stock photography and generic illustrations.
- Do not use fabricated manufacturer logos.
- Ensure image URLs work.
- Prefer local project assets if suitable ones already exist.
- If external images are necessary, use reliable image sources and follow the project's existing image configuration.
- Do not introduce a dependency simply to display a few images.
- Use appropriate alternative text.
- Configure image loading and sizing appropriately for the installed Next.js version.

Do not claim an image has been verified if you have not checked it.

## 8. Component architecture

Follow `AGENTS.md` and the existing project's conventions.

Keep the homepage modular. Do not place every section inside `src/app/page.tsx`.

A suggested organization, if compatible with the existing project:

```text
src/
├── app/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── layout/
│   │   ├── SiteHeader.tsx
│   │   ├── SiteFooter.tsx
│   │   └── MobileNavigation.tsx
│   ├── home/
│   │   ├── HeroSection.tsx
│   │   ├── TrustStrip.tsx
│   │   ├── EquipmentCategories.tsx
│   │   ├── FeaturedEquipment.tsx
│   │   ├── RentalProcess.tsx
│   │   └── ClosingCTA.tsx
│   └── equipment/
│       └── EquipmentCard.tsx
├── data/
│   ├── equipment.ts
│   └── categories.ts
├── types/
│   └── equipment.ts
└── lib/
    └── utils.ts
```

This structure is illustrative. Adapt it to the actual project rather than blindly creating every listed file.

Component responsibilities:
- `SiteHeader`: Brand and public navigation.
- `HeroSection`: Hero copy, imagery, and CTAs.
- `TrustStrip`: Compact business benefits.
- `EquipmentCategories`: Category grid and navigation.
- `FeaturedEquipment`: Featured equipment section.
- `EquipmentCard`: Reusable equipment presentation.
- `RentalProcess`: Three-step process.
- `ClosingCTA`: Final conversion section.
- `SiteFooter`: Footer information and navigation.

The page component should compose these sections in the correct order.

Use typed props and shared data files. Avoid unnecessary abstractions or oversized components.

## 9. Interaction and accessibility requirements

Implement the following:
- Working navigation.
- Working internal links.
- Functional mobile navigation.
- Clickable equipment categories.
- Clickable featured equipment items.
- Clear primary and secondary CTAs.
- Purposeful hover and focus states.
- Keyboard-accessible controls.
- Semantic HTML.
- Appropriate image alt text.
- Reduced-motion support if animations are added.

Do not create decorative controls that appear functional but do nothing.

Use existing routes where they exist. If a destination page has not been implemented, link to the intended route without pretending the destination functionality is complete.

## 10. Animation and performance

Keep motion subtle and intentional.

Use existing animation dependencies if already installed and appropriate. Otherwise, CSS transitions should be sufficient.

If GSAP is already part of the project, use it only where it materially improves the experience, such as a restrained hero entrance or carefully timed section reveals.

Do not animate every section or add unnecessary scroll-triggered effects.

Respect reduced-motion preferences.

Avoid unnecessary Client Components, excessive JavaScript, layout shifts, and oversized image assets.

## 11. Responsive design

Design deliberately for:
- Desktop.
- Tablet.
- Mobile.

Verify that:
- The navigation adapts correctly.
- The hero remains visually balanced.
- Headlines wrap naturally.
- Images retain suitable proportions.
- Category and equipment layouts adapt cleanly.
- CTAs remain accessible.
- No horizontal overflow occurs.
- Text remains readable.
- Touch targets are sufficiently large.

Do not simply stack the desktop layout without considering mobile composition.

## 12. Verification before completion

After implementation:

1. Inspect the modified files.
2. Check imports and TypeScript errors.
3. Run available lint and type-check commands.
4. Run the production build if practical.
5. Verify navigation destinations and interactions.
6. Inspect the rendered homepage at desktop and mobile sizes when browser tooling is available.
7. Fix broken images, layout problems, dead links, and issues introduced by the changes.
8. Confirm that unrelated existing functionality remains untouched.

Do not claim visual testing, linting, or a successful build unless the corresponding check was actually performed.

## 13. Final instruction

Implement the homepage directly in the existing RentLogi codebase.

Do not respond with a plan instead of implementation. Do not build the entire application. Do not add unrelated features.

The result must be:
- Visually distinctive.
- Professional and credible for a real equipment rental business.
- Conversion-focused.
- Responsive.
- Modular and maintainable.
- Consistent with `AGENTS.md` and the installed Next.js version.

**Prioritize design quality, authentic machinery imagery, disciplined typography, and a clear enquiry journey. The finished page must not look like another generic AI-generated website.**

