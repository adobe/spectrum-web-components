# RFC: 2nd-gen icon strategy (S2-only)

|                    |                                                                                                                                                                  |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Status**         | Draft for review                                                                                                                                                 |
| **Scope**          | Spectrum 2 (S2) icon delivery for 2nd-gen Spectrum Web Components                                                                                                |
| **Supersedes**     | 1st-gen `icon`, `iconset`, `icons`, `icons-workflow`, `icons-ui` strategy                                                                                        |
| **Companion docs** | `icon-system-eli5.md` (1st-gen deep dive), `icon-strategy-comparison.md` (spectrum-css vs React Spectrum vs 1st-gen), `icon-strategy-2nd-gen.md` (full proposal) |

> A leaner, self-contained version of this RFC (no companion-doc references) lives
> in `icon-rfc.md`. This document keeps the fuller detail and the frame code
> snippets.

## 1. Summary

Deliver S2 icons as **per-icon custom elements** (`<swc-icon-add>`) for
zero-ceremony use in any framework, backed by **per-icon SVG-string functions** as
the portable, tree-shakeable substrate, with a single generic **`<swc-icon>`
element** as the frame for custom SVGs. The art is sourced **directly from the
Adobe-internal A4U S2 global set**, committed as raw SVGs, and converted by a
build-time generator. Nothing a consumer touches requires Lit.

**UI icons** (chevrons, checkmarks, arrows) are **internal** to components and
sized by the component, matching React Spectrum and design; **workflow icons** are
the public set. Because UI icons are internal and already needed by migrated
components, they are built first; workflow icons follow on the same tooling.

## 2. Background and constraints

- **S2 only.** No dual S1/S2 art, no runtime version switching, no `DefaultIcon`
  pairing, no `icons-mapping.json`.
- **Source is A4U, accessed manually.** Workflow = **S2 Icon Global Set Open
  Source** (413, third-party/brand removed); UI = **S2 Ui Icon Global Set** (no
  open-source variant needed). Gated (not on public npm), but the SVG content is
  cleared for open-source redistribution. React Spectrum confirmed the pattern:
  download from A4U manually, commit the SVGs, convert with a script. The
  deprecated spectrum-css packages are **not** a source. The S2 Cursor Global Set
  is out of scope.
- **Drop the legacy delivery.** No iconset registry, sprite sheets, `name` lookup,
  per-icon classes.
- **Shared SVG contract.** S2 workflow art is square `20×20`, `viewBox 0 0 20 20`,
  `fill="var(--iconPrimary, #222)"`. UI icons have per-icon viewBoxes and ship no
  fill attribute.

### Goals

- Usable in any framework (React, Vue, Angular, Svelte, vanilla) and plain HTML,
  **without requiring Lit** of the consumer.
- Preserve **tree-shaking**.
- Simple to reason about; a repeatable way to **stay current** with A4U.

### Non-goals

- Illustrations, Spectrum 1 art, per-framework wrapper packages.

### A note on "not requiring Lit"

2nd-gen components are implemented with Lit internally, so `<swc-icon>` is a Lit
element under the hood. "Not requiring Lit" constrains **what we deliver to
consumers**: the function's output must render without Lit, and the element must
be consumable as a plain custom element. Both hold here.

## 3. The output model: three complementary primitives

None of these couple a consumer to Lit:

- **The per-icon custom element** (`<swc-icon-add>`) is the primary consumer API.
- **The per-icon SVG function** (`AddIcon()`, subpath `@swc/icons-workflow/Add.js`)
  is the portable substrate; it is what the elements are generated from and what
  build-time, SSR, and internal component code use directly.
- **The generic `<swc-icon>` element** is the frame for arbitrary/custom SVGs and
  the stable slot target other components style.

### Public surface: workflow icons; UI icons are internal

The three primitives above are the **public** surface for **workflow** icons. UI
icons are internal: React Spectrum S2 exposes only workflow icons publicly and
keeps UI icons internal (the `ui-icons/` folder has no package export); A4U and
design agree UI icons "live in components" and are sized by the component.

- **Workflow icons: public** (per-icon elements + functions + the frame).
- **UI icons: internal** (functions consumed by components at the component's
  size; not a consumer-facing import).

This differs from 1st-gen, which exposed UI icons publicly; 2nd-gen deliberately
drops that. Because UI icons are internal and already needed by migrated
components, they are built first (section 9, Phase 1).

## 4. The three delivery flavors

### Flavor 1: per-icon SVG function (string)

**Pros:** smallest, most portable substrate; tree-shakeable; no runtime; usable at
build time and SSR; framework-agnostic by injection or node materialization.
**Cons:** per-framework ceremony (inject markup or wrap); injection goes through
html sinks (safe here, but linters flag it).

### Flavor 2: per-icon custom element (`<swc-icon-add>`)

**Pros:** **zero ceremony in every framework** (React 19, Vue, Angular, Svelte,
plain HTML; no injection, no wrapper, no Lit); carries size/color/a11y;
tree-shakeable per import; matches ecosystem precedent. **Cons:** one small
module per icon (largest output surface); registration is a global side effect
(deduped by `defineElement`); slightly heavier than a bare string.

### Flavor 3: generic `<swc-icon>` frame fed an icon

**Pros:** one element total; right tool for arbitrary/custom SVGs; the escape
hatch. **Cons:** for a Spectrum icon the consumer still supplies the SVG; a
complement, not a complete delivery by itself.

### Flavor sub-decision: the function returns a string, not a Lit template

- **Lit `TemplateResult`:** cleanest inside Lit, but requires Lit to consume;
  fails the primary constraint. Rejected as the core output.
- **Swappable template tag:** module-level mutable global state; redundant with the
  element's cross-framework reach. Rejected.

So the function returns an **SVG string**. An optional additive Lit entry point
(`@swc/icons-workflow/lit/*` wrapping `unsafeSVG`) may be offered later.

### Recommendation

**Ship Flavor 2 (per-icon elements) as the primary consumer API, backed by Flavor
1 (string functions), and keep Flavor 3 (the generic frame) for custom SVGs.** All
three are framework-agnostic and Lit-free. This revisits the earlier "function
only" direction on purpose: per-icon elements are restored because zero-ceremony
cross-framework use is the top priority. The per-icon base class, Lit output,
swappable tag, directive, and controller stay dropped (section 8).

### What this looks like in each framework

```ts
// Flavor 2 (primary): per-icon element, zero ceremony, any framework, no Lit
import '@swc/icons-workflow/swc-icon-add.js';
```

```html
<swc-icon-add label="Add"></swc-icon-add>
<!-- HTML / Angular / Svelte -->
```

```jsx
<swc-icon-add label="Add" />                {/* React 19 */}
```

```ts
// Flavor 1 substrate: the string function, for build-time / SSR / custom
import { AddIcon } from '@swc/icons-workflow/Add.js';
element.innerHTML = AddIcon();

// Flavor 3: the generic frame for an arbitrary SVG
// <swc-icon size="m" label="Add"><svg>…</svg></swc-icon>
```

## 5. Icon contract, color, size, accessibility

- **Per-icon subpath imports** are primary for both outputs: the element
  (`@swc/icons-workflow/swc-icon-add.js`) and the function
  (`@swc/icons-workflow/Add.js`). A barrel is convenience only.
- **Color: preserve `--iconPrimary`.** Emit `fill="var(--iconPrimary, currentColor)"`.
  UI icons ship no fill, so the generator adds one.
- **Size: two regimes, one `size` attribute.** Workflow icons scale one drawing to
  a box; UI icons select an optical variant. The numeric step is internal (section
  7).
- **Accessibility: decorative by default.** With a `label`, the element sets
  `aria-label`; without one, `aria-hidden="true"`.
- **Published contract.** Document the S2 SVG contract (square `20×20`,
  `viewBox 0 0 20 20`, `fill="var(--iconPrimary, …)"`) so a consumer's conformant
  SVG drops into `<swc-icon>` with no build step.

## 6. The `<swc-icon>` frame in detail

### 6.1 What it is

One shared base class with two ways to supply the graphic:

- **`IconBase`** (working name): the shared base (sizing, color, a11y, render).
  Not used directly.
- **`<swc-icon>`**: `IconBase` whose graphic is the default `<slot>`.
- **`<swc-icon-add>`**: per-icon elements whose graphic is the baked function
  output.

A per-icon element **is** a `<swc-icon>` with its content baked in.

```ts
export abstract class IconBase extends SpectrumElement {
  @property({ reflect: true }) size: 'xs' | 's' | 'm' | 'l' | 'xl' = 'm';
  @property() label = '';

  protected willUpdate(): void {
    if (this.label) {
      this.setAttribute('role', 'img');
      this.setAttribute('aria-label', this.label);
      this.removeAttribute('aria-hidden');
    } else {
      this.setAttribute('aria-hidden', 'true');
      this.removeAttribute('role');
      this.removeAttribute('aria-label');
    }
  }

  protected abstract renderGraphic(): unknown;
  protected render(): unknown {
    return this.renderGraphic();
  }
}

export class Icon extends IconBase {
  // <swc-icon>
  protected renderGraphic() {
    return html`
      <slot></slot>
    `;
  }
}

export class IconAdd extends IconBase {
  // <swc-icon-add>
  protected renderGraphic() {
    return unsafeSVG(AddIcon({ hidden: true }));
  }
}
```

### 6.2 What it manages

Size (token box + variant for UI), color (`currentColor` / `--iconPrimary`),
accessibility (host owns semantics), box/alignment, forced-colors. It does **not**
manage name lookup, registries, async loading, `src`, version switching, or state.

### 6.3 How it works with the icon library

Functions return SVG strings; per-icon elements bake a function's output; the
generic frame renders slotted SVG. **One accessibility owner:** the host carries
semantics and the inner `<svg>` is decorative (`aria-hidden`). The standalone aria
a function can emit is suppressed inside the frame/element. The frame and per-icon
elements are Lit elements internally (they render the string via `unsafeSVG`),
invisible to consumers.

### 6.4 Proposed API (`<swc-icon>`)

| Member                     | Type                                | Default        | Notes                                                                                                     |
| -------------------------- | ----------------------------------- | -------------- | --------------------------------------------------------------------------------------------------------- |
| `size`                     | `'xs' \| 's' \| 'm' \| 'l' \| 'xl'` | `'m'`          | Sizes the box; for UI icons also selects the optical variant (section 7). `xxs`/`xxl` are not part of S2. |
| `label`                    | `string`                            | `''`           | Set: host gets `role="img"` + `aria-label`. Empty: host gets `aria-hidden="true"`.                        |
| default slot               | —                                   | —              | The SVG for the generic element. Per-icon elements fill it internally.                                    |
| CSS `color`                | `<color>`                           | inherited      | Drives icon color via the `currentColor` fallback.                                                        |
| CSS `--iconPrimary`        | `<color>`                           | `currentColor` | Advanced override, independent of text `color`.                                                           |
| CSS part `icon` (optional) | —                                   | —              | The rendered `<svg>`; decide when the frame is built (Phase 3) whether to ship it.                        |

No `name`, no `src`, no public methods or events.

```html
<!-- decorative, inside an already-labeled button -->
<swc-button>
  <swc-icon-add slot="icon"></swc-icon-add>
  Add item
</swc-button>

<!-- meaningful, standalone -->
<swc-icon-add label="Add" size="l"></swc-icon-add>

<!-- custom SVG in the generic frame -->
<swc-icon size="s">
  <svg viewBox="0 0 20 20"><!-- … --></svg>
</swc-icon>

<!-- color follows text; override with color or --iconPrimary -->
<swc-icon-add label="Brand" style="--iconPrimary: rebeccapurple"></swc-icon-add>
```

### 6.5 Sizing and color model (technical)

The numeric-to-t-shirt map is fixed and stable (unchanged since S1):

| Numeric step | `size` |
| ------------ | ------ |
| 50           | `xs`   |
| 75           | `s`    |
| 100          | `m`    |
| 200          | `l`    |
| 300          | `xl`   |

Two mechanisms:

- **Workflow icons: one asset, scaled to a token box.** A Medium renders at 18px;
  the single drawing scales. CSS resizing is safe.
- **UI icons: discrete optical assets, swapped by step.** `size` selects the right
  drawing (nearest-step fallback when a step is missing). Do not CSS-resize a UI
  icon; scaling one step to fake another defeats the optical tuning.

The numeric step is never in the element name: one unit per logical icon, not one
per step. UI icons are internal, consumed by components; the same rules apply if a
UI element is ever exposed.

**Sizing inside components is component-controlled.** For core components whose
slot only decides which icon to show, the component owns the size (a Medium
component shows the 100 UI icon / 18px workflow icon). UI icons are internal, so
the component renders them at its step; a slotted workflow icon is sized by the
component and scales.

**Implication:** workflow and UI use different size token scales, so a single
`--swc-icon-size-m` cannot serve both.

```css
:host {
  display: inline-flex;
  inline-size: var(--swc-icon-size, 1.25rem);
  block-size: var(--swc-icon-size, 1.25rem);
}
:host([size='s']) {
  --swc-icon-size: var(--spectrum-workflow-icon-size-s);
}
:host([size='m']) {
  --swc-icon-size: var(--spectrum-workflow-icon-size-m);
}
:host([size='l']) {
  --swc-icon-size: var(--spectrum-workflow-icon-size-l);
}
::slotted(svg),
svg {
  display: block;
  inline-size: 100%;
  block-size: 100%;
}
@media (forced-colors: active) {
  :host {
    forced-color-adjust: auto;
  }
}
```

```ts
// Variant selection for an optically-sized UI icon
import { Chevron75, Chevron100, Chevron200 } from './chevron-variants.js';
const STEPS = { 75: Chevron75, 100: Chevron100, 200: Chevron200 };
const SIZE_TO_STEP = { xs: 50, s: 75, m: 100, l: 200, xl: 300 }; // stable since S1
function pickChevron(size) {
  const wanted = SIZE_TO_STEP[size];
  if (STEPS[wanted]) return STEPS[wanted]();
  const available = Object.keys(STEPS).map(Number);
  const closest = available.reduce((a, b) =>
    Math.abs(b - wanted) < Math.abs(a - wanted) ? b : a
  );
  return STEPS[closest]();
}
```

### 6.6 Accessibility model (technical)

- **Decorative by default:** no `label` means `aria-hidden="true"` on the host.
- **Meaningful:** a `label` sets `role="img"` + `aria-label` (`role="img"` is
  required because a custom element has no implicit role).
- **Inner graphic is presentational** in all cases. No `title` tooltip.

```html
<!-- decorative -->
<swc-icon-add aria-hidden="true">
  #shadow-root
  <svg aria-hidden="true" focusable="false">…</svg>
</swc-icon-add>
<!-- meaningful -->
<swc-icon-add role="img" aria-label="Add">
  #shadow-root
  <svg aria-hidden="true" focusable="false">…</svg>
</swc-icon-add>
```

### 6.7 Risks, edge cases, and open questions

- **A11y double-announcement:** functions emit aria for frameless use; inside the
  frame/element that aria must be suppressed so only the host announces. Confirm
  the mechanism (strip-on-slot vs. render-hidden) when the generator and frame are
  built (section 9, Phases 1 and 3).
- **`::slotted` matches only top-level nodes:** the generic frame expects a
  directly slotted `<svg>`.
- **Inline styles on slotted SVG beat frame CSS:** generated functions must not
  emit inline size styles.
- **Non-square custom SVGs** letterbox; note the square expectation.
- **Directional icons in RTL:** mirroring policy is an open question.
- **Forced-colors / high-contrast:** confirm icons stay visible.
- **Per-instance shadow roots:** icon-dense pages; prefer inlining the function.
- **SSR / declarative shadow DOM:** confirm the SSR story.
- **`static-color`:** likely unnecessary because `currentColor` covers it.
- **Programmatic graphic setting:** decide whether the frame accepts an SVG string
  property or stays slot-only.

## 7. Source and processing (summary)

Full detail in `icon-strategy-2nd-gen.md` section 8. In brief:

1. **Manual A4U download** (the one human step; no committed code points at the
   gated registry).
2. **Commit the raw `S2_Icon_*_20_N.svg` files** into a source folder.
3. **Generator** converts committed SVGs to per-logical-icon string functions (and,
   for workflow, public elements). Cleanup mirrors React Spectrum's
   `IconTransformer.js`: SVGO with `removeViewBox: false`, strip `data-*`,
   prefix/strip element ids, rewrite fill to `var(--iconPrimary, currentColor)`,
   group by logical name, emit the size-to-step map.
4. **Record pulled versions** in an `icon-source.json` (not `package.json`).
5. **Commit** SVGs, generated output, and metadata; open a PR. External
   contributors and public CI build only from committed art.

## 8. Alternatives considered

Per-icon custom elements are **recommended** (Flavor 2). Rejected:

- **Per-icon base classes:** no unique value once the element and function exist.
- **Lit `TemplateResult` output / swappable tag:** section 4.
- **Lit directive:** Lit-only; cannot be a public mechanism.
- **Reactive controller:** static, synchronous SVG; no state to manage.
- **Public UI icons (as in 1st-gen):** dropped to match React Spectrum and design.

## 9. Phases of work

Sequenced **UI icons first** (internal, already needed by migrated components),
then workflow. Phase 1 tooling is family-agnostic so workflow is low-lift.

| Phase                                | Deliverable                                                                                                                                                                                    | Exit                                                                                       |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| **0. Decisions locked**              | Sign-off: UI internal / workflow public, string output, fallback color, names, layout.                                                                                                         | Open questions resolved or deferred.                                                       |
| **1. UI icons, internal (priority)** | Manual UI download + committed SVGs + `icon-source.json`; family-agnostic generator core; per-logical-icon UI functions with size-to-step selection (internal only); shared render convention. | Migrated components render UI icons from this source, sized by the component, off 1st-gen. |
| **2. Workflow-readiness gate**       | Confirm the generator, source layout, metadata, and refresh accept a second family and a public-element output mode.                                                                           | Adding workflow is additive, not a rewrite.                                                |
| **3. Workflow icons, public**        | Manual workflow download; `IconBase` + generic `<swc-icon>`; per-icon workflow functions and elements, reusing the core.                                                                       | A workflow icon works as element and function in HTML and a non-Lit framework.             |
| **4. Packaging and tree-shaking**    | Published shapes; per-icon subpath exports for element and function; optional Lit entry points.                                                                                                | A 3-icon sample bundle ships only those 3.                                                 |
| **5. Refresh automation**            | Scripted post-download refresh for both families; optional internal scheduled-CI PR.                                                                                                           | One documented command refreshes a family (after manual download).                         |
| **6. Documentation**                 | Per-framework usage, the custom-icon SVG contract, a 1st-gen migration note (UI now internal).                                                                                                 | A developer on any framework can add a workflow icon and a custom icon from the docs.      |
| **7. Verification and rollout**      | React/Vue/vanilla samples + VRT (including internal UI icons across sizes).                                                                                                                    | Samples pass; 1st-gen icon packages deprecated with a pointer.                             |

## 10. Open questions

Resolved (confirmed with design and A4U):

- **Size map** fixed since S1: 50/75/100/200/300 → xs/s/m/l/xl.
- **Source sets:** S2 Icon Global Set Open Source (workflow) + S2 Ui Icon Global
  Set (UI). UI needs no OSS variant. Cursors out of scope.
- **Component-controlled sizing** for core components.
- **UI icons internal, workflow public** (built UI-first).

Still open:

1. **Fallback color:** `var(--iconPrimary, currentColor)` (recommended) vs a
   `light-dark(<token>, <token>)` fallback for frameless icons.
2. **Optional Lit entry point** or leave Lit consumers to call `unsafeSVG`.
3. **A4U package coordinates and registry URL** for the scoped `.npmrc` / CI.
4. **Refresh automation:** internal CI with `@a4u` creds, or manual baseline.
5. **Per-family size tokens** and whether any UI icon lacks a step.
6. **A11y suppression mechanism** (strip-on-slot vs render-hidden).
7. **RTL mirroring** policy for directional icons.
8. **Component icon consumption:** confirm components inline the UI function.

## 11. References

- `icon-system-eli5.md`, `icon-strategy-comparison.md`, `icon-strategy-2nd-gen.md`,
  and the self-contained `icon-rfc.md`.
- React Spectrum S2 `IconTransformer.js`: the confirmed source-SVG-to-component
  conversion script.
