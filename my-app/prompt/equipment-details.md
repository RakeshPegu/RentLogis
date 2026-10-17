# RentLogi — Equipment Detail Page

## 1. Objective

Build a polished, professional equipment detail page for RentLogi, a fictional construction and industrial equipment rental business created to demonstrate InnovHubs' full-stack development capabilities.

The page should help construction contractors, builders, site managers, and small businesses understand a piece of equipment, review its specifications and rental rates, and enquire about renting it.

Implement the feature directly in the existing codebase. Do not merely provide a plan, code snippets, or recommendations.

## 2. Mandatory Pre-Implementation Workflow

Before writing any code:

1. Read `AGENTS.md` completely and follow its project-wide instructions.
2. Inspect the existing project structure, routes, homepage, components, styling system, equipment data, assets, and installed dependencies.
3. Identify the installed Next.js version from the project dependencies.
4. Read the relevant official documentation from the installed `node_modules/next/dist/docs/` directory before using Next.js APIs. Resolve the correct package location if the project is in a monorepo.
5. Examine the existing RentLogi homepage and reuse its established design system, header, footer, buttons, typography, colors, spacing, and component conventions.
6. Determine the smallest maintainable implementation that satisfies this specification.

Do not assume that Next.js APIs or conventions from previous versions apply to the installed version. Follow the generated Next.js agent rules and any relevant deprecation notices.

## 3. Scope and Constraints

Implement only the equipment detail page and the supporting components, types, or demo data strictly necessary for it.

Do not implement:
- The admin dashboard or authentication.
- Database integration or backend APIs.
- Payment processing or checkout.
- Equipment inventory management.
- A complete equipment catalogue if it does not already exist.
- Unrelated pages or refactoring.
- Fake functionality presented as production-ready.

Preserve existing homepage behavior and other working features. Reuse existing routes and components where appropriate.

If the intended catalogue or enquiry route does not exist yet, use the project's established routing conventions and make the limitation clear rather than creating an entire unrelated workflow.

## 4. Brand and Visual Direction

Brand: **RentLogi**

Business: Construction and industrial equipment rental.

Target audience:
- Construction contractors and builders.
- Site managers and project supervisors.
- Small and medium-sized businesses.
- Customers looking to rent machinery for a specific project or period.

Use the existing RentLogi design system. The intended visual direction is premium industrial, practical, trustworthy, and image-led.

Preferred visual characteristics:
- Warm off-white or stone backgrounds.
- Charcoal or near-black typography.
- Neutral gray surfaces and borders.
- A restrained construction-orange or safety-yellow accent.
- Strong typography and a clear information hierarchy.
- Authentic equipment photography.
- Deliberate whitespace and consistent alignment.
- Subtle borders and restrained corner radii.

Avoid:
- Generic SaaS templates.
- Purple, pink, or blue gradient backgrounds.
- Glassmorphism and decorative blobs.
- Excessive cards, badges, pills, and shadows.
- Oversized headings that dominate useful information.
- Repetitive sections that add no value.
- Unnecessary animations or visual effects.
- Fake customer reviews, certifications, awards, or statistics.

The page must feel like a credible rental business website, not a generic AI-generated design.

## 5. Page Structure

### A. Existing Public Header

Reuse the existing public website header.

Maintain the RentLogi wordmark and existing navigation. Do not create a duplicate header.

Ensure links work according to the routes currently available in the project.

### B. Breadcrumb Navigation

Display a breadcrumb such as:

Home → Equipment → Earthmoving Equipment → Mini Excavator

Use actual equipment information and available routes. Breadcrumb links must not point to nonexistent pages unless they are explicitly intended as future destinations.

### C. Main Equipment Overview

Create a balanced, editorial two-column layout on desktop, with the equipment gallery and essential rental information presented prominently.

Include:
- Equipment name.
- Equipment category.
- Short, specific description.
- A few key specifications.
- Indicative rental rate.
- Primary CTA: **Enquire About This Equipment**.
- Secondary CTA or link: **Browse Equipment** or the appropriate back link.

The equipment name and rental rate should be easy to find without scrolling through lengthy content.

On mobile, stack the gallery and information naturally, maintaining a clear reading order and an accessible enquiry CTA.

### D. Equipment Photo Gallery

Display a large primary equipment image and supporting thumbnails when multiple images are available.

Requirements:
- Clicking or selecting a thumbnail updates the main image.
- The selected thumbnail has a visible active state.
- Use suitable image aspect ratios and object-fit behavior.
- Provide meaningful alternative text.
- Prevent image layout shifts by using appropriate dimensions or aspect ratios.
- Use local project assets where available.
- If external images are needed, use relevant, reliable image sources and follow the project's existing Next.js image configuration.
- Do not add image libraries or dependencies unnecessarily.
- Do not use unrelated stock photos or misleading manufacturer branding.

If only one suitable image exists, design the gallery gracefully instead of inventing additional images.

### E. Specifications Section

Display a clear heading such as **Technical Specifications**.

Present specifications in a readable table or structured grid, with consistent labels and values.

Choose specifications appropriate to the equipment type.

For example, an excavator may include:
- Operating weight.
- Engine power.
- Maximum digging depth.
- Bucket capacity.
- Dimensions.
- Transport requirements.

A scissor lift or generator should have different specifications relevant to its actual purpose.

Use realistic illustrative demo data. Do not present demo specifications as verified manufacturer specifications.

Avoid displaying empty values, undefined values, or irrelevant specification fields.

### F. Rental Rates and Conditions

Display rental pricing clearly and consistently.

Where supported by the equipment data, include:
- Daily rental rate.
- Weekly rental rate.
- Monthly rental rate.
- Minimum rental period.
- Delivery or collection information.
- Operator availability, where relevant.
- Additional rental terms, where explicitly represented in the demo data.

Use Indian rupees (₹) if that matches the existing RentLogi demo market. Follow the project's existing currency and formatting conventions if already established.

Clearly label the prices as **illustrative demo rates**. State that final pricing and availability must be confirmed by the rental team.

Do not invent live availability, discounts, guaranteed delivery, or unverified commercial terms.

Do not calculate weekly or monthly rates from daily rates unless the data explicitly supports that calculation.

### G. Description and Typical Applications

Include a concise equipment description explaining:
- What the machine is designed to do.
- Typical construction or industrial applications.
- Which types of projects may benefit from renting it.
- Relevant operational considerations, if supported by the data.

Keep the copy useful and specific. Avoid generic marketing filler.

### H. Rental Enquiry CTA

Make **Enquire About This Equipment** the main conversion action.

If an enquiry page already exists:
- Link to it using the existing routing convention.
- Pass the equipment identifier or slug where appropriate.
- Preselect the equipment in the form if the existing implementation supports this.

If an enquiry page does not exist:
- Link to the intended enquiry route only if it is part of the established application plan, or provide a clearly labeled demo interaction consistent with the existing site.
- Do not claim that an enquiry has been sent unless it actually has.
- Do not create a backend, database, email integration, or complete enquiry-management system in this task.

The CTA should communicate the next step clearly without promising instant confirmation.

### I. Related Equipment

If suitable equipment data already exists, show a small section titled **Related Equipment** or **You May Also Need**.

Recommend a few relevant machines from the same or a related category.

Requirements:
- Exclude the current equipment from the recommendations.
- Reuse existing equipment data and cards.
- Keep this section visually compact.
- Link to the correct detail routes when available.

If no suitable related equipment data exists, omit this section rather than fabricating unnecessary content.

### J. Existing Public Footer

Reuse the existing RentLogi footer. Do not create a second version or invent real business contact details, social accounts, or service locations.

## 6. Equipment Data and TypeScript Architecture

Make the page data-driven so that multiple equipment items can use the same page template.

For example, the same template should be reusable for:
- Mini excavator.
- Skid steer loader.
- Scissor lift.
- Industrial generator.

Use the project's existing data structures and types if they are already appropriate.

Otherwise, introduce a small, well-typed equipment model that can represent:
- A unique ID or slug.
- Name and category.
- Description.
- Image paths and alternative text.
- Specifications.
- Indicative rental rates.
- Optional rental information.
- Related equipment identifiers, if necessary.

Keep demo data separate from presentation components.

Use TypeScript throughout. Avoid `any`, unnecessary type assertions, and duplicated data definitions.

Create reusable components only when they improve clarity or maintainability. Potential examples include an equipment gallery, specification table, and rental rate panel. Do not split every small markup fragment into a separate component.

Adapt the file structure to the existing project rather than blindly creating a new architecture.

## 7. Routing and Invalid Equipment

Follow the routing conventions already used by the project.

If the application already has a dynamic equipment route, extend it instead of creating a competing route.

If a new dynamic route is necessary, use the appropriate conventions for the installed Next.js version.

Resolve the equipment by its ID or slug through the established data source.

For an unknown equipment ID or slug:
- Use the correct not-found behavior for the installed Next.js version.
- Do not render broken or misleading equipment information.
- Do not silently substitute a different machine.

Keep the implementation ready for a future API-backed data source without introducing premature backend infrastructure.

## 8. Server and Client Components

Prefer Server Components by default when using the Next.js App Router.

Use Client Components only where genuinely necessary, such as interactive gallery selection or an existing client-side interaction.

Keep client-side JavaScript limited to the components that need it.

Follow the installed Next.js documentation for image handling, dynamic routes, metadata, and not-found behavior.

Do not introduce deprecated APIs or patterns from older Next.js versions.

## 9. Responsive Design and Accessibility

Verify the page at desktop, tablet, and mobile widths.

Ensure:
- The layout adapts naturally to smaller screens.
- There is no horizontal overflow.
- Images remain properly proportioned.
- Equipment information remains readable.
- Specifications do not become cramped.
- Rental pricing remains easy to understand.
- CTAs have adequate touch targets.
- Interactive elements work with a keyboard.
- Focus states are visible.
- Semantic headings and landmarks are used.
- Images have appropriate alt text.
- Text and controls have sufficient contrast.
- Motion respects reduced-motion preferences when applicable.

Do not add animations just to make the page appear more sophisticated.

## 10. SEO and Page Metadata

Where consistent with the existing application, provide appropriate equipment-specific page metadata.

Use the equipment name and a concise, truthful description. Do not copy the same hardcoded metadata across every equipment detail route if dynamic metadata is appropriate.

Follow the installed Next.js version's official metadata conventions.

## 11. Verification

After implementing the feature:

1. Review all changed files.
2. Confirm that the existing homepage and public layout remain intact.
3. Test the equipment detail route.
4. Test invalid equipment IDs or slugs.
5. Test gallery thumbnail selection, if multiple images are available.
6. Verify every CTA and navigation link.
7. Check for missing images, undefined values, and incorrect demo rates.
8. Check desktop and mobile layouts, including horizontal overflow.
9. Run the available lint, type-check, tests, and production build where practical.
10. Fix issues discovered during verification.

Do not claim to have run checks that were not executed. Report any unresolved issues or limitations honestly.

## 12. Completion Criteria

The feature is complete when:
- The equipment detail page fits the existing RentLogi design system.
- Equipment information is driven by typed data.
- The gallery works when multiple images are available.
- Specifications and indicative rates are displayed correctly.
- The enquiry CTA has an honest and appropriate behavior.
- The page is responsive and accessible.
- Existing functionality remains intact.
- Relevant checks have been run where available.

Implement the feature directly. Keep the scope controlled, the code maintainable, and the visual result professional enough to demonstrate InnovHubs' development capabilities to potential clients.