# RentLogi — Equipment Catalogue Page

## 1. Objective

Implement a professional, responsive equipment catalogue page for RentLogi, a construction and industrial equipment rental business demo built to showcase InnovHubs' development capabilities.

The catalogue should help contractors, builders, site managers, and businesses quickly discover suitable equipment, narrow their choices, understand indicative rental rates and availability, and navigate to individual equipment detail pages or request a quote.

Implement the feature directly in the existing codebase. Do not merely provide a plan or code snippets.

## 2. Mandatory Pre-Implementation Workflow

Before writing code:

1. Read `AGENTS.md` completely and follow its project-wide instructions.
2. Inspect the existing project structure, routes, homepage, equipment detail page, quote request page, components, types, data files, styling, assets, and installed dependencies.
3. Identify the installed Next.js version from the project dependencies.
4. Read relevant official documentation from the installed `node_modules/next/dist/docs/` directory before using Next.js APIs. Resolve the correct package location if the project uses a monorepo.
5. Reuse the existing RentLogi design system, public header and footer, equipment data, equipment card components, and routing conventions wherever appropriate.
6. Determine the smallest maintainable implementation that satisfies this specification.

Follow the generated Next.js agent rules and relevant deprecation notices. Do not assume that APIs from older Next.js versions are compatible with the installed version.

## 3. Scope

Implement only the equipment catalogue page and the supporting components or data changes necessary for it.

Do not implement or rebuild:
- The homepage.
- The equipment detail page if it already exists.
- The quote request form if it already exists.
- Authentication or the admin dashboard.
- Database integration or inventory-management APIs.
- Payment processing.
- Unrelated pages or large-scale refactoring.

Preserve existing functionality and routes.

If the project already contains equipment data or a catalogue implementation, extend it instead of creating duplicate data structures or competing implementations.

## 4. Brand and Art Direction

Brand: RentLogi.

Business: Construction and industrial equipment rental.

Target audience:
- Construction contractors and builders.
- Site managers and project supervisors.
- Small and medium-sized businesses.
- Customers comparing machines for a particular project.

Use the established RentLogi design system.

Preferred visual direction:
- Warm off-white or stone backgrounds.
- Charcoal or near-black typography.
- Neutral gray borders and surfaces.
- Restrained construction-orange or safety-yellow accents.
- Strong typography and clear information hierarchy.
- Authentic machinery photography.
- Editorial layouts and deliberate whitespace.
- Consistent alignment, image proportions, and spacing.

Avoid:
- Generic AI-generated SaaS designs.
- Purple, pink, or blue gradient backgrounds.
- Excessive glassmorphism, shadows, decorative blobs, and pills.
- Excessive rounded cards or identical-looking sections.
- Oversized headings that push the actual equipment too far down.
- Fake customer reviews, certifications, statistics, or guarantees.
- Unnecessary animations and decorative UI.

The result should feel like a credible industrial rental company's website.

## 5. Page Structure

### A. Existing public header

Reuse the existing RentLogi public header.

Maintain consistent branding and navigation. Do not create a duplicate header or change unrelated navigation behavior.

### B. Page introduction

Create a concise catalogue heading, such as:

**Find the right equipment for your project.**

Supporting copy should explain that customers can explore construction and industrial machinery and enquire about rental pricing and availability.

Include a breadcrumb where consistent with the existing site, for example:

Home → Equipment

The introduction should be compact enough to bring the search controls and equipment listings into view quickly.

### C. Search and filtering toolbar

Provide a clear, usable toolbar for discovering equipment.

#### Search

Include a search field that allows users to search equipment by:
- Name.
- Category.
- Relevant equipment description or application, if supported by the data.

Requirements:
- Search should respond immediately as the user types.
- Matching should be case-insensitive.
- Trim unnecessary whitespace.
- Provide a clear-search action when a query exists.
- Show a helpful empty state when there are no matches.
- Do not make a network request for every keystroke when all data is local.

#### Category filter

Provide a category filter based on the actual available equipment data.

Possible categories include:
- Earthmoving Equipment.
- Material Handling.
- Aerial Work Platforms.
- Power Equipment.
- Compaction Equipment.

Use only categories represented in the current data. Do not create empty categories just to fill a filter menu.

The category filter must:
- Include an option to view all categories.
- Filter the equipment correctly.
- Work together with search and other filters.
- Show a clear selected state.

#### Availability filter

Provide a filter for availability states supported by the equipment data.

Possible demo states:
- Available.
- Limited availability.
- Unavailable.

Use these labels only when appropriate to the existing data model. Explain through the UI or supporting text that availability must be confirmed by the rental team.

Do not imply that local demo data reflects live inventory.

#### Sorting

Provide useful sorting options, such as:
- Featured or recommended.
- Equipment name, A–Z.
- Lowest indicative daily rate.
- Highest indicative daily rate.

Sort only on actual data. If a rate is missing, handle it consistently and do not treat a missing rate as zero.

### D. Results summary and active filters

Above the equipment results, show:
- The number of matching equipment items.
- The current category or filter context, where useful.
- A clear way to reset all filters.

The displayed result count must always match the filtered results.

If there are no active filters, avoid cluttering the page with unnecessary filter chips.

When filters are active, make it easy to understand and clear the current selection.

### E. Equipment listing

Create a responsive equipment listing that adapts to desktop, tablet, and mobile widths.

Use the existing equipment data and reusable equipment card component if available.

Each equipment item should display the appropriate information supported by the data:

- Equipment image.
- Equipment name.
- Category.
- Short description or practical application.
- Key specifications, where available.
- Indicative daily rental rate, if available.
- Availability status, when represented in the demo data.
- View Details action.
- Request a Quote action, if appropriate.

Keep the cards practical and information-dense without making them visually crowded.

Design the listing to avoid excessive card repetition. Use consistent image ratios, readable text, carefully aligned prices, and restrained borders.

Do not display invented specifications, fake inventory counts, fabricated discounts, or unsupported availability claims.

### F. Availability status

Represent availability with clear text labels and restrained visual indicators.

For example:
- Available.
- Limited availability.
- Currently unavailable.

Use distinct, accessible visual treatments for the supported states. Do not rely on color alone to communicate status.

If the data does not include a trustworthy availability status, show a neutral message such as:

**Availability confirmed on enquiry**

Do not invent real-time inventory.

Clearly distinguish illustrative demo statuses from confirmed rental availability. If necessary, include a concise note explaining that the rental team must confirm availability and final pricing.

### G. Equipment detail navigation

Each equipment card must have a working route to its corresponding detail page.

Follow the routing convention already used by the project.

For example, if the existing application uses dynamic equipment slugs, a card may link to:

`/equipment/mini-excavator`

Do not invent a competing route structure.

If a detail page exists, reuse it. If the detail page is not implemented yet, follow the project's established route plan without pretending that an unfinished destination is complete.

### H. Request a Quote integration

The quote CTA must integrate with the existing RentLogi quote request page when available.

Pass the selected equipment identifier or slug using the established URL convention.

For example:

`/request-quote?equipment=mini-excavator`

The quote form should be able to preselect the relevant equipment using that identifier.

Do not duplicate the quote form inside every equipment card. Keep the catalogue focused on discovery and navigation.

### I. Empty state

When the search and filters return no results, show a useful empty state.

Include:
- A concise explanation that no equipment matches the current criteria.
- A clear Reset Filters action.
- An optional suggestion to try a different search query.

The reset action must actually clear the relevant search and filter state.

Do not show fake equipment cards in an empty state.

### J. Loading and error states

If the catalogue uses a remote data source already present in the project, handle loading and failure states using existing project conventions.

If all catalogue data is local and synchronously available, do not add unnecessary artificial loading screens.

Do not introduce a backend or API solely to create a loading state.

### K. Closing CTA and footer

If appropriate to the existing homepage and catalogue design, include a compact closing section encouraging customers who cannot find the required equipment to request a quote.

Reuse the existing footer.

Avoid unnecessary additional sections that distract from equipment discovery.

## 6. Equipment Data and Architecture

Use the existing shared equipment model and data source if available.

Do not duplicate the equipment list separately for the homepage, catalogue, and detail pages.

If the existing model needs a small extension, make it typed and backward-compatible.

A suitable equipment model may include:
- Unique ID or slug.
- Name.
- Category.
- Description.
- Image information and alt text.
- Specifications.
- Indicative rental rates.
- Availability status.
- Optional featured or recommended flag.

Adapt this model to the existing project. Do not add fields that have no current use.

Use TypeScript throughout:
- Avoid `any`.
- Avoid unsafe type assertions.
- Keep filtering and sorting logic easy to understand.
- Keep demo data separate from presentation components.
- Reuse existing equipment card components and utility functions.

If filtering and sorting logic becomes substantial, move it into a suitable utility module rather than embedding everything in the page component.

Prefer Server Components by default in the Next.js App Router. Use Client Components only for interactive search, filters, sorting, and other behavior that requires client-side state.

Keep the interactive client-side area as small as practical.

## 7. Functional Requirements

Verify all of the following:

1. Searching filters the displayed equipment correctly.
2. Clearing the search restores matching results.
3. Category filtering works.
4. Availability filtering works where supported by the data.
5. Sorting produces the expected order.
6. Search, category, availability, and sorting work together rather than overwriting each other.
7. The result count reflects the actual filtered list.
8. Reset Filters clears all relevant filter state.
9. Empty results display the correct empty state.
10. Equipment detail links point to the correct item.
11. Quote links pass the selected equipment identifier correctly.
12. All visible controls perform their advertised actions.

Do not add decorative or inert controls.

## 8. Accessibility and Responsive Design

Ensure the page works at desktop, tablet, and mobile widths.

Requirements:
- Search and filter controls have accessible labels.
- Controls work with keyboard navigation.
- Focus states are clearly visible.
- Status is communicated through text as well as color.
- Images have meaningful alt text.
- Semantic headings and landmarks are used.
- Text and controls have sufficient contrast.
- Buttons have adequate touch targets.
- The page does not overflow horizontally on mobile.
- Cards reflow naturally on smaller screens.
- Filter controls remain usable on mobile without occupying excessive space.

Do not introduce unnecessary animation. Respect reduced-motion preferences if motion is used.

## 9. Performance and SEO

- Reuse existing image assets where possible.
- Follow the installed Next.js version's image handling conventions.
- Avoid adding unnecessary dependencies.
- Avoid rendering duplicate equipment datasets.
- Do not turn the entire page into a Client Component merely because search and filters require interactivity.
- Provide appropriate page metadata using the installed Next.js version's supported conventions.
- Use meaningful page titles and descriptions without making unsupported business claims.

## 10. Verification

After implementation:

1. Review every changed file.
2. Confirm that the homepage, equipment detail pages, quote request page, and shared navigation remain intact.
3. Test search, all filters, sorting, filter combinations, and reset behavior.
4. Test empty results.
5. Test equipment detail and quote links.
6. Verify displayed rates and availability labels against the source data.
7. Check images, keyboard navigation, and responsive layouts.
8. Run the available lint, type-check, tests, and production build where practical.
9. Fix issues discovered during verification.
10. Report what changed, which checks were run, and any remaining issues.

Do not claim to have run checks that were not executed.

## 11. Completion Criteria

The catalogue is complete when:
- It matches the existing RentLogi design system.
- It uses shared, typed equipment data.
- Search, filtering, sorting, and reset behavior work correctly.
- Equipment cards communicate relevant information clearly.
- Availability is represented honestly.
- Equipment detail and quote navigation work.
- Empty states and responsive behavior are polished.
- Existing features remain functional.
- Relevant checks have been run where available.

Implement the feature directly in the codebase. Prioritize usability, credible industrial visual design, maintainability, and a clear path from equipment discovery to rental enquiry.