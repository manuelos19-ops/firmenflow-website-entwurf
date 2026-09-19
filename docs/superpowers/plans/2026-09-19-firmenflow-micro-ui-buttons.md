# Firmenflow Micro UI and Buttons Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the remaining generic UI glyphs with a custom Firmenflow SVG system and refine the existing button architecture without changing copy, routes, or user flows.

**Architecture:** A typed `FirmenflowUiIcon` component owns the 27 glyphs and exports compatibility wrappers matching the existing Lucide component names. Existing call sites only switch their import source, while `ButtonLink` adds the branded flow arrow, accessible focus styling, and a subtle transform/opacity sheen.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, Vitest, React server markup

**Spec:** `docs/superpowers/specs/2026-09-19-firmenflow-micro-ui-buttons-design.md`

## Global Constraints

- Keep all existing copy, routes, prices, contact details, photos, and large 3D icon assets unchanged.
- Use inline SVG paths with `currentColor`; do not add external URLs, Base64 data, or raster button graphics.
- Preserve semantic links/buttons, existing `aria-label` values, keyboard behavior, and reduced-motion behavior.
- Do not deploy, commit, or push.

---

### Task 1: Establish the icon contract with failing tests

**Files:**
- Create: `vitest.config.ts`
- Create: `src/components/brand/FirmenflowUiIcon.test.tsx`

**Interfaces:**
- Consumes: React server rendering and the future `FirmenflowUiIcon` exports.
- Produces: Tests for the 27-name catalog, decorative/labeled accessibility behavior, SVG prop forwarding, and ButtonLink integration.

- [x] **Step 1: Add Vitest alias configuration and the icon contract tests.**
- [x] **Step 2: Run `npx vitest run src/components/brand/FirmenflowUiIcon.test.tsx` and confirm failure because the component is missing.**

### Task 2: Implement the custom Firmenflow SVG catalog

**Files:**
- Create: `src/components/brand/FirmenflowUiIcon.tsx`
- Test: `src/components/brand/FirmenflowUiIcon.test.tsx`

**Interfaces:**
- Consumes: `SVGProps<SVGSVGElement>`.
- Produces: `FirmenflowUiIcon`, `FirmenflowUiIconName`, `firmenflowUiIconNames`, and named compatibility exports (`ArrowLeft`, `Download`, `Check`, etc.).

- [x] **Step 1: Implement the minimal typed component with all 27 custom glyphs.**
- [x] **Step 2: Run the component test and confirm the catalog and accessibility assertions pass.**
- [x] **Step 3: Refactor only duplicated SVG wrapper logic while keeping the test green.**

### Task 3: Refine and verify the button system

**Files:**
- Modify: `src/components/ui/ButtonLink.tsx`
- Test: `src/components/brand/FirmenflowUiIcon.test.tsx`

**Interfaces:**
- Consumes: `ArrowUpRight` from the Firmenflow SVG catalog.
- Produces: The existing `ButtonLink` API with branded arrow island, focus-visible styling, and a GPU-safe sheen.

- [x] **Step 1: Extend the failing test to require the Firmenflow arrow marker, focus ring, and sheen layer.**
- [x] **Step 2: Run the targeted test and confirm it fails against the old ButtonLink.**
- [x] **Step 3: Update ButtonLink with the custom glyph and styling while preserving all variants and props.**
- [x] **Step 4: Run the targeted test and confirm it passes.**

### Task 4: Migrate all remaining UI symbols

**Files:**
- Modify: the 19 current files importing `lucide-react` under `src/app` and `src/components`
- Modify: `package.json`
- Modify: `package-lock.json`
- Verify: `rg -n 'from ["'']lucide-react["'']' src`

**Interfaces:**
- Consumes: compatibility exports from `FirmenflowUiIcon.tsx`.
- Produces: A source tree with no direct `lucide-react` imports and no runtime dependency on Lucide.

- [x] **Step 1: Switch each import source to `@/components/brand/FirmenflowUiIcon` without changing call-site props or semantics.**
- [x] **Step 2: Run the source verification and confirm no direct Lucide import remains.**
- [x] **Step 3: Remove the unused `lucide-react` dependency with `npm uninstall lucide-react`.**
- [x] **Step 4: Run TypeScript and ESLint verification.** TypeScript and the new icon/button files pass; the repository-wide lint remains red because of pre-existing errors in legacy scripts and unrelated components.

### Task 5: Visual and production verification

**Files:**
- Modify only if verification exposes a defect in the changed scope.

**Interfaces:**
- Consumes: the integrated website.
- Produces: Verified desktop/mobile UI with no broken glyphs, overflow, accessibility regression, or build failure.

- [x] **Step 1: Run the complete Vitest suite for the new tests.**
- [x] **Step 2: Run `npx tsc --noEmit --incremental false`.**
- [x] **Step 3: Run ESLint verification.** The new icon/button files pass; existing repository lint debt is documented separately.
- [x] **Step 4: Run `npm run build`.**
- [x] **Step 5: Start the local production server and inspect Startseite, Lokalpräsenz 360°, Über Manu, Anfrage, Links, FlowScreen, Datenschutz, and Impressum at desktop and mobile widths.**
- [x] **Step 6: Confirm no deployment, commit, or push occurred and provide the changed-file and verification report.**
