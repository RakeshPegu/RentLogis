<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
## Mandatory Next.js Documentation Check

Before writing or modifying any Next.js code:

1. Determine the installed Next.js version from the project's actual dependencies.
2. Locate the relevant official Next.js documentation under `node_modules/next/dist/docs/`, resolving the path from the appropriate package directory. In a monorepo, the Next.js package may not be located at the repository root.
3. Read the relevant documentation for the API, routing convention, component, or feature being changed.
4. Follow the installed version's conventions and heed any deprecation notices or breaking changes.
5. Do not assume that APIs or examples from previous Next.js versions apply to the installed version.
6. If the relevant documentation cannot be located or accessed, do not silently guess. Investigate the installed package and available documentation, then clearly report any unresolved uncertainty.

Treat this check as mandatory for each task involving Next.js code. Re-read the relevant documentation when working with a different API or feature.
my-app/
├── AGENTS.md                 # Permanent AI coding instructions
├── package.json
├── src/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   ├── equipment/
│   │   ├── rental-enquiry/
│   │   ├── login/
│   │   └── dashboard/
│   ├── components/
│   ├── data/
│   ├── types/
│   └── lib/
└── public/
# Project Development Guidelines

## 1. Project Context

This project is a professional equipment rental website with a public-facing website and a private administrative dashboard.

The public website allows customers to explore equipment and submit rental enquiries.

The private dashboard initially focuses on:
- Admin login and access control.
- Enquiry management.
- Equipment availability management.

Keep the application simple and focused. Do not introduce unnecessary features or complexity.

## 2. Mandatory Workflow

Before making any changes:

1. Inspect the existing project structure and relevant files.
2. Understand the existing framework, routing system, dependencies, styling conventions, and component patterns.
3. Read the relevant existing components before modifying them.
4. Identify the smallest set of changes required for the requested task.
5. Preserve existing functionality and avoid unrelated refactoring.

Do not assume a file structure or technology that does not exist in the project.

## 3. Architecture and File Organization

- Follow the existing framework's routing conventions.
- Create a dedicated page component for every distinct route.
- Keep page components focused on composing sections and coordinating page-level logic.
- Create separate components for meaningful page sections and reusable UI elements.
- Store shared types, dummy data, utilities, and business logic in appropriate modules.
- Use clear, consistent file and component names.
- Avoid giant components, duplicated code, and unnecessary deeply nested JSX.
- Do not create excessive abstractions for trivial elements.
- Reuse existing components when appropriate instead of duplicating them.

For Next.js App Router projects, follow filesystem-based routing and use Server Components by default. Add Client Components only when client-side interactivity requires them.

## 4. Shared Data and Type Safety

- Use TypeScript consistently with the existing project.
- Define appropriate types for shared entities such as equipment, categories, and enquiries.
- Keep dummy data in dedicated data files rather than scattering it across components.
- Pass data to reusable components through typed props.
- Avoid unnecessary use of `any` and unsafe type assertions.
- Keep data access separate from presentation where appropriate.
- Structure the code so dummy data can later be replaced by an API or database without rewriting the UI.

## 5. Public and Private Application Structure

Keep the public website and private dashboard layouts separate.

Public pages may share:
- Public site header.
- Public navigation.
- Public footer.

Dashboard pages may share:
- Dashboard sidebar.
- Dashboard header.
- Dashboard navigation.
- Dashboard content layout.

Do not display public navigation or the public footer inside the dashboard unless explicitly required.

Keep authentication and authorization concerns separate from presentation components. Never treat a hidden button or client-side route check as sufficient security for protected data.

Do not implement fake authentication or claim that a route is protected unless actual authentication and authorization are implemented.

## 6. UI and Design Quality

Build interfaces that look professionally designed for a real equipment rental business.

- Avoid generic AI-generated website layouts and repetitive template patterns.
- Maintain consistent typography, spacing, colors, and interaction states.
- Prioritize clarity, visual hierarchy, and usability.
- Use realistic dummy data when real data is unavailable.
- Avoid fabricated testimonials, certifications, and unsupported business claims.
- Ensure layouts are responsive across desktop, tablet, and mobile.
- Use semantic HTML and accessible controls.
- Include appropriate loading, empty, error, and success states when relevant to the feature.

Do not apply the same layout indiscriminately to every page. Public pages and administrative interfaces have different design needs.

## 7. Implementation Standards

- Reuse existing dependencies and design-system components where practical.
- Avoid adding dependencies without a clear benefit.
- Keep business logic separate from UI presentation when appropriate.
- Implement meaningful interactions; do not create decorative controls that do nothing.
- Avoid unnecessary client-side JavaScript.
- Handle errors and edge cases relevant to the requested feature.
- Never expose credentials, secrets, or sensitive information.
- Preserve existing project conventions and working functionality.

## 8. Scope Control

Implement only the feature explicitly requested in the current task.

Do not automatically build additional pages, APIs, database models, authentication flows, or business features merely because they might be useful later.

Create placeholder routes only when requested or necessary for the current task. Clearly distinguish placeholders from completed functionality.

Prefer a small, correct implementation over an unnecessarily complex one.

## 9. Verification

After implementation:

1. Review the changed files and imports.
2. Check that navigation and interactions work as intended.
3. Run the relevant lint, type-check, test, or build commands available in the project.
4. Fix issues introduced by the changes.
5. Report what was implemented, which checks were run, and any known limitations.

Do not claim that a check passed if it was not run successfully.

## 10. Task Execution

Read these instructions before beginning a task and follow them alongside the user's latest request.

The user's latest request determines the current scope. These guidelines define how the work should be implemented; they do not authorize building features that were not requested.