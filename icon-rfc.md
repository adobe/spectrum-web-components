# RFC: 2nd-gen icon strategy (Spectrum 2)

| | |
| --- | --- |
| **Status** | Draft for review |
| **Scope** | Spectrum 2 (S2) icon delivery for 2nd-gen Spectrum Web Components |
| **Supersedes** | 1st-gen `icon`, `iconset`, `icons`, `icons-workflow`, `icons-ui` |

## 1. Summary

Deliver S2 icons as **per-icon custom elements** (`<swc-icon-star>`) for
zero-ceremony use in any framework, backed by **per-icon SVG-string functions** as
the portable substrate, with one generic **`<swc-icon>` element** as the frame for
custom SVGs. There are two families:

- **Workflow icons** are **public** (the icons consumers pick).
- **UI icons** (chevrons, checkmarks, arrows inside controls) are **internal**;
  components render them at a component-controlled size. They are built first
  because migrated components need them now.

Art comes directly from the Adobe-internal A4U icon sets, committed into the repo
as raw SVGs and converted by a build-time generator. Nothing a consumer touches
requires Lit.

## 2. Goals and non-goals

**Goals**

- Usable in any framework (React, Vue, Angular, Svelte, vanilla) and plain HTML,
  without requiring Lit of the consumer.
- Tree-shakeable: an app ships only the icons it imports.
- Simple to reason about; a repeatable way to stay current with A4U.

**Non-goals**

- Spectrum 1 art, illustrations, cursors.
- Per-framework wrapper packages.

## 3. Decisions

1. **Two families, two audiences.** Workflow icons are public; UI icons are
   internal to components. This matches React Spectrum and Adobe design guidance.
2. **Outputs:** per-icon custom element (primary) + per-icon SVG-string function
   (substrate) + one generic `<swc-icon>` frame (custom SVGs).
3. **Function output is an SVG string**, never a Lit `TemplateResult`.
4. **Color preserves `--iconPrimary`** with a `currentColor` fallback.
5. **Source is A4U**, downloaded manually and committed; the deprecated
   spectrum-css packages are not a source.
6. **Sequencing:** UI icons (internal) first, workflow icons second, on shared
   tooling.

## 4. The two families

| | Workflow icons | UI icons |
| --- | --- | --- |
| What | Icons consumers choose (star, folder, trash) | Parts inside controls (chevron, checkmark, arrow) |
| Audience | Public: consumers import them | Internal: rendered by components only |
| A4U source | S2 Icon Global Set Open Source (413, no third-party/brand) | S2 Ui Icon Global Set |
| Sizing | One asset scaled to a token box | Multiple optical assets, swapped by size |
| Delivered as | Per-icon element + function + frame | Internal function consumed by components |

## 5. What we deliver

Three complementary outputs, none coupling a consumer to Lit:

- **Per-icon custom element** (`<swc-icon-star>`): a tag that renders in any
  framework with zero ceremony (no injection, no wrapper, no Lit), carrying size,
  color, and accessibility. Primary consumer API for workflow icons.
- **Per-icon SVG-string function** (`StarIcon()`, imported by subpath
  `@swc/icons-workflow/Star.js`): the tree-shakeable substrate. It is what the
  elements are generated from and what build-time, SSR, and internal component
  code use directly.
- **Generic `<swc-icon>` frame**: holds an arbitrary slotted SVG for custom
  (non-Spectrum) icons; also the stable slot target other components style.

### 5.1 Why a string function, not a Lit template

| Option | Verdict |
| --- | --- |
| **SVG string** | **Chosen.** Framework-agnostic; usable via `innerHTML`, React `dangerouslySetInnerHTML`, Vue `v-html`, or Lit `unsafeSVG`. No runtime dependency. |
| Lit `TemplateResult` | Rejected. Only renderable inside Lit; fails the no-Lit goal. |
| Swappable template tag | Rejected. Module-level mutable global state; the element already covers cross-framework reach. |

An optional, additive Lit entry point (`@swc/icons-workflow/lit/*` wrapping
`unsafeSVG`) may be offered later; it is not on the critical path.

### 5.2 Per-framework usage

```ts
// Per-icon element: zero ceremony, any framework, no Lit
import '@swc/icons-workflow/swc-icon-star.js';
```
```html
<swc-icon-star label="Favorite"></swc-icon-star>   <!-- HTML, Angular, Svelte -->
```
```jsx
<swc-icon-star label="Favorite" />                 {/* React 19 */}
```
```ts
// Substrate function, for build-time / SSR / custom composition
import { StarIcon } from '@swc/icons-workflow/Star.js';
element.innerHTML = StarIcon();

// Generic frame for an arbitrary SVG
// <swc-icon size="s"><svg viewBox="0 0 20 20">…</svg></swc-icon>
```

## 6. The `<swc-icon>` frame

One shared base class with two content sources:

- **`<swc-icon>`** renders a slotted SVG (custom icons).
- **`<swc-icon-star>`** (per-icon workflow elements) bake a function's output into
  the same base.

A per-icon element is therefore a `<swc-icon>` with its content baked in.

### 6.1 API

| Member | Type | Default | Notes |
| --- | --- | --- | --- |
| `size` | `'xs' \| 's' \| 'm' \| 'l' \| 'xl'` | `'m'` | Sizes the box; for UI icons also selects the optical variant (section 7). |
| `label` | `string` | `''` | Set: host gets `role="img"` + `aria-label`. Empty: host gets `aria-hidden="true"` (decorative). |
| default slot | — | — | The SVG for the generic frame. Per-icon elements fill it internally. |
| CSS `color` | `<color>` | inherited | Drives icon color via the `currentColor` fallback. |
| CSS `--iconPrimary` | `<color>` | `currentColor` | Advanced color override, independent of text `color`. |

No `name`, no `src`, no public methods or events. The frame is static and
presentational.

### 6.2 Accessibility

- **Decorative by default:** no `label` means `aria-hidden="true"` on the host
  (the common case: an icon inside an already-labeled button or menu item).
- **Meaningful icons:** a `label` sets `role="img"` and `aria-label` on the host
  (`role="img"` is required because a custom element has no implicit role).
- **The host owns semantics; the inner SVG is always presentational**
  (`aria-hidden`), to avoid double-announcement.

### 6.3 Key risks and edge cases

- **A11y ownership:** icon functions can emit their own `role`/`aria-*` for
  frameless use; inside the frame or a per-icon element that aria must be
  suppressed so only the host announces. Confirm the mechanism (strip-on-slot vs.
  render-hidden) during build.
- **`::slotted` matches only top-level nodes:** the generic frame expects a
  directly slotted `<svg>`, not one wrapped in another element.
- **Custom SVGs should be square** (the box is square); non-square art letterboxes.
- **Per-instance shadow roots:** icon-dense pages create many; prefer inlining the
  function on very dense surfaces.
- **Directional icons in RTL:** mirroring policy is an open question (section 11).

## 7. Sizing

The numeric-to-t-shirt map is fixed and stable (unchanged since S1):

| Numeric step | `size` |
| --- | --- |
| 50 | `xs` |
| 75 | `s` |
| 100 | `m` |
| 200 | `l` |
| 300 | `xl` |

Two mechanisms, one `size` attribute:

- **Workflow icons: one asset, scaled to a token box.** The package ships one
  drawing per icon; the rendered size comes from tokens (a Medium renders at
  18px). `size` sets the box; the drawing scales. CSS resizing is safe.
- **UI icons: discrete optical assets, swapped by step.** A logical icon ships
  several optically-tuned drawings; `size` **selects** the right one (with
  nearest-step fallback when a step is missing). Do not CSS-resize a UI icon:
  scaling one step to fake another defeats the optical tuning.

**The numeric step is never in the element name.** One unit per logical icon
(`Chevron`), not one per step (`Chevron100`).

**Sizing inside components is component-controlled.** For core components whose
slot only decides which icon to show, the component owns the size: a Medium
component shows the 100 UI icon or the 18px workflow icon. UI icons are internal,
so the component renders them at its own step; a slotted workflow icon is sized by
the component (and scales).

**Implication:** workflow and UI use different size token scales, so a single
`--swc-icon-size-m` cannot serve both; the frame resolves the box per family.

## 8. Source and processing

**Source (Adobe-internal A4U, gated):**

- Workflow: **S2 Icon Global Set Open Source** (third-party/brand removed).
- UI: **S2 Ui Icon Global Set** (no open-source variant needed; never contains
  third-party/brand).

The packages live on Adobe's internal registry (not public npm; `npm login
--scope a4u`), but their SVG **content is cleared for open-source
redistribution**. So the packages cannot be a committed dependency, but the SVGs
can be committed and shipped.

**Pipeline:**

1. **Manual A4U download** (the only human step; no committed code points at the
   gated registry).
2. **Commit the raw SVGs** into a source folder (`svg-source/ui/`,
   `svg-source/workflow/`).
3. **Generator** converts committed SVGs to per-logical-icon functions (and, for
   workflow, public elements). Per-icon cleanup: SVGO with `removeViewBox: false`,
   strip `data-*`, prefix or strip element ids, rewrite fill to
   `var(--iconPrimary, currentColor)`, group files by logical name (collapsing
   `Chevron50/75/100/200` into one `Chevron`), and emit the size-to-step map.
4. **Record pulled A4U versions** in an `icon-source.json` (not in
   `package.json` dependencies).
5. **Commit** SVGs, generated output, and metadata. External contributors and
   public CI build only from committed art and never need A4U access.

**Color:** the workflow source fills with `var(--iconPrimary, #222)`; UI source
has no fill. The generator normalizes both to `var(--iconPrimary, currentColor)`
so icons follow CSS `color` by default while keeping `--iconPrimary` themeable.
(React Spectrum's transformer keeps `--iconPrimary` and rewrites the fallback,
confirming the approach; it uses a `light-dark()` token fallback, an alternative
if frameless icons must be theme-correct on their own.)

**Staying current:** a maintainer re-runs the pipeline when A4U updates (the
download is manual; conversion is scripted). Optionally an internal scheduled CI
job diffs the latest A4U versions against `icon-source.json` and opens a
regeneration PR. Public CI and Dependabot cannot see the gated registry, so any
automation lives on the Adobe side.

## 9. Phases of work

Sequenced UI-first; the Phase 1 tooling is built family-agnostic so workflow is
additive.

| Phase | Deliverable | Exit |
| --- | --- | --- |
| **1. UI icons, internal** | Manual UI download + committed SVGs + `icon-source.json`; family-agnostic generator core; per-logical-icon UI functions with size-to-step selection (internal only); shared render convention for components. | Migrated components render UI icons from this source, sized by the component, off the 1st-gen packages. |
| **2. Workflow-readiness gate** | Confirm the Phase 1 generator, source layout, metadata, and refresh already accept a second family and a public-element output mode. | Adding workflow is additive, not a rewrite. |
| **3. Workflow icons, public** | Manual workflow download; the `IconBase` + generic `<swc-icon>`; per-icon workflow functions and elements, reusing the generator core. | A workflow icon works as element and function in HTML and a non-Lit framework. |
| **4. Packaging and tree-shaking** | Published shapes; per-icon subpath exports for element and function; optional additive Lit entry points. | A 3-icon sample bundle ships only those 3. |
| **5. Refresh automation** | Scripted post-download refresh for both families; optional internal scheduled-CI PR. | One documented command refreshes a family (after the manual download). |
| **6. Documentation** | Per-framework usage, the custom-icon SVG contract, and a 1st-gen migration note (including UI icons now internal). | A developer on any framework can add a workflow icon and a custom icon from the docs. |
| **7. Verification and rollout** | React/Vue/vanilla samples and VRT (including internal UI icons across sizes). | Samples pass; 1st-gen icon packages deprecated with a pointer to the replacement. |

## 10. Alternatives considered

- **Per-icon base classes (`IconStar`):** no unique value once the element and
  function exist. Rejected.
- **Lit `TemplateResult` output / swappable tag:** see section 5.1. Rejected.
- **Lit directive:** Lit-only, cannot be a public mechanism. Rejected for v1.
- **Reactive controller:** S2 icons are static, synchronous SVG with no state to
  manage. Rejected.
- **Public UI icons (as in 1st-gen):** dropped to match React Spectrum and design;
  UI icons are internal.

## 11. Open questions

1. **Fallback color:** `var(--iconPrimary, currentColor)` (recommended) vs a
   `light-dark(<token>, <token>)` fallback for frameless icons.
2. **Optional Lit entry point:** ship `@swc/icons-workflow/lit/*` or leave Lit
   consumers to call `unsafeSVG` themselves.
3. **A4U package coordinates and registry URL** for the scoped `.npmrc` and any
   internal CI job.
4. **Refresh automation:** is internal CI with `@a4u` credentials available, or is
   periodic manual refresh the baseline.
5. **Per-family size tokens:** the concrete workflow icon size tokens and UI
   per-step box sizes, and whether any UI icon lacks a step (driving the
   nearest-step fallback).
6. **A11y suppression mechanism** for inner SVGs (strip-on-slot vs render-hidden).
7. **RTL mirroring** policy for directional icons.
8. **Component icon consumption:** confirm components inline the UI function
   (component owns size/color/a11y) rather than using an internal element.
