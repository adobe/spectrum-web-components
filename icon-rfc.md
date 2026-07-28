# RFC: 2nd-gen icon strategy (Spectrum 2)

|                |                                                                   |
| -------------- | ----------------------------------------------------------------- |
| **Status**     | Draft for review                                                  |
| **Scope**      | Spectrum 2 (S2) icon delivery for 2nd-gen Spectrum Web Components |
| **Supersedes** | 1st-gen `icon`, `iconset`, `icons`, `icons-workflow`, `icons-ui`  |

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
requires Lit. Art is manually downloaded and added to this repo from a private source.

## 2. Goals and non-goals

**Goals**

- Workflow icons are usable in any framework (React, Vue, Angular, Svelte, vanilla) and plain HTML,
  without requiring Lit of the consumer.
- Tree-shakeable: an app ships only the icons it imports.
- Simple to reason about; a repeatable way to stay current with A4U.
- UI icons can use TemplateResult since they will only be used internally

**Non-goals**

- Spectrum 1 art, illustrations, cursors.
- Per-framework wrapper packages.

## 3. Decisions

1. **Two families, two audiences.** Workflow icons are public; UI icons are
   internal to components. This matches React Spectrum and Adobe design guidance.
2. **Outputs:** per-icon custom element (primary) + per-icon SVG-string function
   (substrate) + one generic `<swc-icon>` frame (custom SVGs).
3. **The public workflow function output is an SVG string**, never a Lit
   `TemplateResult`. (Internal UI icons do use `TemplateResult`; they are not a
   public contract.)
4. **Color preserves `--swc-icon-color`** with a `currentColor` fallback.
5. **Source is A4U**, downloaded manually and committed; the deprecated
   spectrum-css packages are not a source.
6. **Sequencing:** UI icons (internal) first, workflow icons second, on shared
   tooling.
7. **Package homes:** following the dependency direction (nothing depends on swc;
   both swc and the icons package depend on core):
   - **core** (`@adobe/spectrum-wc-core`): the abstract `IconBase` only.
   - **icons** (new, `@adobe/spectrum-wc-icons`): the per-icon workflow elements and
     functions, extending `IconBase`. No components; depends only on core.
   - **swc** (`@adobe/spectrum-wc`): components, the concrete `<swc-icon>` frame,
     and the internal `<swc-ui-icon>` element with its generated UI art (under
     `components/ui-icons/`, art in its `icon-set/` subfolder). Icon rendering is a
     presentation concern, so it lives in the concrete layer. swc has no runtime
     need for workflow icons, so it only **devDepends** on the icons package for
     Storybook examples. (UI-in-swc assumes no core base class renders a UI icon
     itself; confirmed by the component-render audit, section 11.)
8. **Per-icon workflow elements use inheritance,** not composition: they extend
   `IconBase` and render into a single shadow root (section 6).
9. **UI icons render via an internal `<swc-ui-icon>` element** (extends `IconBase`;
   takes `icon`, `size`, `accessibleLabel`), authored as Lit `TemplateResult`. It
   maps the host `size` to the optical step and removes `unsafeSVG` from component
   code (section 6.4).

## 4. Workflow icons vs UI icons vs `<swc-icon>`

There are **two families of icon art** and **one generic frame element**. In plain
language:

- **Workflow icons are the public art you pick.** Star, folder, trash. You import a
  per-icon element (or its function) and drop it in. One drawing per icon, scaled
  to the size box.
- **UI icons are the private art inside controls.** Chevrons, checkmarks, the arrow
  in a picker. You never import them; the component renders them for you. Each
  logical icon has several optically-tuned drawings, and the component picks the
  right one for its size.
- **`<swc-icon>` is the frame for your own SVG.** When you have a custom
  (non-Spectrum) icon, you slot your `<svg>` into `<swc-icon>` and it gets the same
  size box, color, and accessibility handling as a workflow icon.

So a consumer only ever touches two public things: **workflow icons** and the
**`<swc-icon>` frame**. UI icons stay behind the component boundary.

|                             | Workflow icons                                                                           | UI icons                                                                                    | `<swc-icon>` frame                      |
| --------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | --------------------------------------- |
| **Purpose**                 | Icons consumers choose (star, folder, trash)                                             | Control internals (chevron, checkmark, picker arrow)                                        | Wrapper for a custom, non-Spectrum SVG  |
| **Audience**                | Public                                                                                   | Internal (components only)                                                                  | Public                                  |
| **Package home**            | `@adobe/spectrum-wc-icons` (icons)                                                       | `@adobe/spectrum-wc` (swc, `components/ui-icons/`)                                          | `@adobe/spectrum-wc` (swc)              |
| **Art source**              | S2 Icon Global Set Open Source (413, no third-party/brand)                               | S2 UI Icon Global Set                                                                       | Consumer-supplied SVG                   |
| **Ships as**                | Per-icon element (`<swc-icon-star>`) **and** per-icon SVG-string function (`StarIcon()`) | Internal `<swc-ui-icon>` element (Lit `TemplateResult`), rendered by components; not public | One generic element                     |
| **Sizing**                  | One asset scaled to a token box; `size` sets the box, CSS resize is safe                 | Discrete optical assets; `size` **selects** the step, do not CSS-resize                     | `size` sets the box; slotted art scales |
| **Baseline styling**        | In the element's shadow CSS; the function alone is raw SVG                               | Shared via `IconBase` (the internal element)                                                | In the element's shadow CSS             |
| **A11y owner**              | Host element (`accessibleLabel` → `role="img"`; empty → decorative)                      | Consuming component                                                                         | Host element                            |
| **Consumer Lit dependency** | None (element and function are both Lit-free)                                            | N/A (internal element; Lit `TemplateResult`)                                                | None                                    |

Sections 5–7 detail each; the table above is the one-screen summary.

## 5. What we deliver

Three complementary outputs, none coupling a consumer to Lit:

- **Per-icon custom element** (`<swc-icon-star>`): a tag that renders in any
  framework with zero ceremony (no injection, no wrapper, no Lit), carrying size,
  color, and accessibility. Primary consumer API for workflow icons.
- **Per-icon SVG-string function** (`StarIcon()`, imported by subpath
  `@adobe/spectrum-wc-icons/Star.js`): the tree-shakeable substrate. It is what the
  elements are generated from and what build-time, SSR, and internal component
  code use directly.
- **Generic `<swc-icon>` frame**: holds an arbitrary slotted SVG for custom
  (non-Spectrum) icons; also the stable slot target other components style.

### 5.1 Why a string function, not a Lit template

| Option                 | Verdict                                                                                                                                           |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| **SVG string**         | **Chosen.** Framework-agnostic; usable via `innerHTML`, React `dangerouslySetInnerHTML`, Vue `v-html`, or Lit `unsafeSVG`. No runtime dependency. |
| Lit `TemplateResult`   | Rejected. Only renderable inside Lit; fails the no-Lit goal.                                                                                      |
| Swappable template tag | Rejected. Module-level mutable global state; the element already covers cross-framework reach.                                                    |

An optional, additive Lit entry point (`@adobe/spectrum-wc-icons/lit/*` wrapping
`unsafeSVG`) may be offered later; it is not on the critical path.

### 5.2 Per-framework usage

```ts
// Per-icon element: zero ceremony, any framework, no Lit
import '@adobe/spectrum-wc-icons/swc-icon-star.js';
```

```html
<swc-icon-star accessible-label="Favorite"></swc-icon-star>
<!-- HTML, Angular, Svelte -->
```

```jsx
<swc-icon-star accessible-label="Favorite" />                 {/* React 19 */}
```

```ts
// Substrate function, for build-time / SSR / custom composition
import { StarIcon } from '@adobe/spectrum-wc-icons/Star.js';
element.innerHTML = StarIcon();

// Generic frame for an arbitrary SVG
// <swc-icon size="s"><svg viewBox="0 0 20 20">…</svg></swc-icon>
```

## 6. The `<swc-icon>` frame

The shared behavior lives in an abstract base class, `IconBase`: the size box, color
(`--swc-icon-color` with the `currentColor` fallback), and the accessibility rules
(section 6.2). Every icon element extends it, so none re-implements sizing, color,
or a11y. Two kinds of concrete element are built on `IconBase`:

- **`<swc-icon>`** renders a slotted SVG (custom, non-Spectrum icons).
- **`<swc-icon-star>`** (per-icon workflow elements) bake a fixed SVG in.

So `<swc-icon>` is the custom-SVG member of the family, and each workflow element is
a sibling with its art baked in.

**Reuse mechanism: inheritance.** Each element extends `IconBase` and renders its
SVG directly into a single shadow root; workflow SVGs are baked in at build time.
This is chosen over composition (nesting an inner `<swc-icon>` and slotting the
SVG), which would create two shadow roots per icon and compound the dense-page cost
in section 6.3.

**Where each lives.** `IconBase` is abstract and lives in **core**. The concrete
`<swc-icon>` frame ships in **swc** alongside the components, so a consumer using
swc components can wrap their own (or A4U) SVGs without taking the workflow-icon art
package. The per-icon workflow elements ship in **`@adobe/spectrum-wc-icons`** and
extend the same `IconBase` (section 3).

### 6.1 API

| Member                 | Type                                | Default        | Notes                                                                                                                          |
| ---------------------- | ----------------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `size`                 | `'xs' \| 's' \| 'm' \| 'l' \| 'xl'` | `'m'`          | Sizes the box; for UI icons also selects the optical variant (section 7).                                                      |
| `accessibleLabel`      | `string`                            | `''`           | Attribute: `accessible-label`. Set: host gets `role="img"` + `aria-label`. Empty: host gets `aria-hidden="true"` (decorative). |
| default slot           | —                                   | —              | The SVG for the generic frame. Per-icon elements fill it internally.                                                           |
| CSS `color`            | `<color>`                           | inherited      | Drives icon color via the `currentColor` fallback.                                                                             |
| CSS `--swc-icon-color` | `<color>`                           | `currentColor` | Advanced color override, independent of text `color`.                                                                          |

No `name`, no `src`, no public methods or events. The frame is static and
presentational.

### 6.2 Accessibility

- **Decorative by default:** no `accessibleLabel` means `aria-hidden="true"` on the host
  (the common case: an icon inside an already-labeled button or menu item).
- **Meaningful icons:** an `accessibleLabel` sets `role="img"` and `aria-label` on the host
  (`role="img"` is required because a custom element has no implicit role).
- **The host owns semantics; the inner SVG is always presentational**
  (`aria-hidden`), to avoid double-announcement.
- **Prefer letting the parent own the label.** In most cases the surrounding
  component, not the icon, should carry the accessible name, leaving the icon
  decorative. For example, in Badge today a text-only or text-plus-icon badge
  surfaces in the accessibility tree as static text, while an icon-only badge
  surfaces as an image because the icon is labeled with `role="img"`. Reserve the
  icon's own `accessibleLabel` for the genuinely icon-only case where nothing else names it.

### 6.3 Key risks and edge cases

- **A11y ownership:** icon functions can emit their own `role`/`aria-*` for
  frameless use; inside the frame or a per-icon element that aria must be
  suppressed so only the host announces. Resolved: render the inner SVG hidden
  (`aria-hidden`) rather than stripping attributes on slot (see section 11).
- **`::slotted` matches only top-level nodes:** the generic frame expects a
  directly slotted `<svg>`, not one wrapped in another element.
- **Custom SVGs should be square** (the box is square); non-square art letterboxes.
- **SVGs with internal padding read as the wrong size.** Even a square SVG can
  carry built-in padding around the artwork, so the visible glyph looks smaller
  than its size box. The generator trims Spectrum art to a tight, consistent
  viewBox; for custom SVGs this expectation is documented as part of the slot
  contract.
- **Per-instance shadow roots:** icon-dense pages create many. This applies to the
  internal `<swc-ui-icon>` element too; keep an inline fast-path (render the UI
  `TemplateResult` directly) for profiled hot surfaces such as large menus or
  tables of checkboxes.
- **Directional icons in RTL:** directional icons mirror via a `:dir(rtl)`
  transform driven by a curated in-repo list; non-directional icons never flip
  (section 11).

### 6.4 The three, side by side

All three share one base class (`IconBase`, in core) and differ only in how their
SVG is supplied; each is a custom element. The code below is illustrative.

**Shared base (core) — behavior only: no `render()`, no styles (core has no CSS processing):**

```ts
// @adobe/spectrum-wc-core
export abstract class IconBase extends SizedMixin(SpectrumElement, {
  validSizes: [...ICON_VALID_SIZES],
}) {
  @property({ type: String, attribute: 'accessible-label' })
  accessibleLabel = '';

  // Host owns a11y: labeled -> role="img" + aria-label; unlabeled -> aria-hidden.
  protected override firstUpdated(c: PropertyValues) {
    super.firstUpdated(c);
    this.#applyHostA11y();
  }
  protected override updated(c: PropertyValues) {
    super.updated(c);
    if (c.has('accessibleLabel')) this.#applyHostA11y();
  }
  // #applyHostA11y() toggles role / aria-label / aria-hidden on the host.
}
```

**1. `<swc-icon>` frame (swc): renders a slotted, consumer-supplied SVG.**

```ts
// @adobe/spectrum-wc/icon/swc-icon.js
import { IconBase } from '@adobe/spectrum-wc-core';

export class Icon extends IconBase {
  static styles = [iconBaseCss]; // shared _lit-styles/icon-base.css
  render() {
    return html`
      <span class="swc-Icon"><slot></slot></span>
    `;
  }
}
customElements.define('swc-icon', Icon);
```

```html
<swc-icon size="s"><svg viewBox="0 0 20 20">…</svg></swc-icon>
```

**2. Workflow icon (icons): a per-icon element with its SVG baked in, plus the
underlying substrate function.**

```ts
// @adobe/spectrum-wc-icons/Star.js  (substrate function, framework-agnostic)
export function StarIcon(): string {
  return '<svg viewBox="0 0 20 20"><path fill="var(--swc-icon-color, currentColor)" d="…"/></svg>';
}

// @adobe/spectrum-wc-icons/swc-icon-star.js  (generated element, extends IconBase)
import { IconBase } from '@adobe/spectrum-wc-core';
import { StarIcon } from './Star.js';

export class IconStar extends IconBase {
  static styles = [iconBaseCss];
  render() {
    return html`
      <span class="swc-Icon">${unsafeSVG(StarIcon())}</span>
    `; // baked in
  }
}
customElements.define('swc-icon-star', IconStar);
```

```html
<swc-icon-star accessible-label="Favorite"></swc-icon-star>
```

**3. UI icon (swc, internal): a `<swc-ui-icon>` element that maps `size` to the
optical step and renders a Lit `TemplateResult`. Not public; no `unsafeSVG`.**

```ts
// @adobe/spectrum-wc, components/ui-icons/ (internal; imported relatively, not a public subpath)
import { IconBase } from '@adobe/spectrum-wc-core';
import { UI_ICONS } from './icon-set/index.js'; // icon → per-step Lit `html` templates

export class UiIcon extends IconBase {
  @property() icon!: UiIconName; // selects the icon-set
  static styles = [iconBaseCss];
  render() {
    // size selects the optical step; icon selects the set.
    return html`
      <span class="swc-Icon">${UI_ICONS[this.icon][uiStepFor(this.size)]}</span>
    `;
  }
}
customElements.define('swc-ui-icon', UiIcon);
```

```ts
// Inside a component (e.g. Picker): no unsafeSVG, no size-to-step math.
render() {
    return html`
        <button aria-label=${this.accessibleLabel}>
            <swc-ui-icon icon="chevron" .size=${this.size}></swc-ui-icon>
        </button>
    `;
}
```

> **Implemented.** `IconBase` carries `accessibleLabel` + host-owned a11y (no
> `render()`, no CSS); the `<swc-icon>` frame and `<swc-ui-icon>` both extend it and
> both use the shared `stylesheets/_lit-styles/icon-base.css` (identical box styling).
> As part of this the frame's a11y moved from the slotted SVG to the host.

## 7. Sizing

The numeric-to-t-shirt map is fixed and stable (unchanged since S1):

| Numeric step | `size` |
| ------------ | ------ |
| 50           | `xs`   |
| 75           | `s`    |
| 100          | `m`    |
| 200          | `l`    |
| 300          | `xl`   |

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

**Sizing inside components is component-controlled.** A component passes its own
`size` to `<swc-ui-icon>`, which maps it to the optical step (a Medium component
shows the 100 UI icon); a slotted workflow icon is sized by the component and
scales. The size-to-step map lives in one place, the UI element, not in every
component.

**Implication:** workflow and UI use different size token scales, so a single
`--swc-icon-size-m` cannot serve both; the frame resolves the box per family.
Implemented as separate lit-style fragments: `ui-icon-sizes.css` sizes
`<swc-ui-icon>` from the `ui-icon-*` scale and `workflow-icon-sizes.css` sizes the
`<swc-icon>` frame from the `workflow-icon-*` scale, both feeding the shared
`--swc-icon-inline-size` / `--swc-icon-block-size` box in `icon-base.css`.

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
2. **Commit the raw SVGs** into a source folder at the swc package root
   (`svg-source/ui/`; `svg-source/workflow/` for the workflow family).
3. **Generator** converts committed SVGs per family: workflow into SVG-string
   functions plus public per-icon elements; UI into Lit `html` `TemplateResult`
   bundles under `components/ui-icons/icon-set/`, consumed by the internal
   `<swc-ui-icon>` element (so components need no `unsafeSVG`).
   Per-icon cleanup: SVGO (`preset-default`, which keeps the `viewBox` in v4, plus
   `removeDimensions` to drop `width`/`height`) and a rewrite of the A4U
   `var(--iconPrimary, …)` fill to `var(--swc-icon-color, currentColor)`. Files are
   grouped by the logical name parsed from the A4U filename
   `S2_Icon_UI<Name>_Size<step>_N.svg`, keyed by numeral step.
4. **Record pulled A4U versions** in `svg-source/icon-source.json`, alongside the
   committed SVGs (not in `package.json` dependencies).
5. **Commit** SVGs, generated output, and metadata. External contributors and
   public CI build only from committed art and never need A4U access.

**Layout (POC).** UI source SVGs live at `2nd-gen/packages/swc/svg-source/ui/`, with
`icon-source.json` alongside them in `svg-source/`. The generated bundles and the
`<swc-ui-icon>` element live at `2nd-gen/packages/swc/components/ui-icons/` (generated
art in its `icon-set/` subfolder), imported relatively by swc components rather than
through a public subpath. A dev-only
Storybook gallery (Internal → UI icons) previews the available icons and their
optical sizes; internal stories are excluded from the production build.

**Styling (function vs element):** the SVG-string function returns markup only; it
carries no stylesheet. The baseline display and sizing rules that live in today's
`swc-icon` belong to the **element**: the generic `<swc-icon>` frame and the
per-icon workflow elements ship them in shadow CSS. A frameless consumer of the raw
function gets just the SVG and supplies its own box (or uses the element instead).
Color is not baked in: the generator rewrites `fill` to reference
`var(--swc-icon-color, currentColor)`, so the variable drives color without
replacing the fill mechanism. The generator's expected input contract (viewBox
retained, tight square art, single fill, no `data-*` or stray ids) should be written
up as an output spec we can hand back to the A4U icons team. UI art is generated as
Lit `TemplateResult`s rather than strings, so the internal `<swc-ui-icon>` element
composes it without `unsafeSVG`.

**Color:** the workflow source fills with `var(--swc-icon-color, #222)`; UI source
has no fill. The generator normalizes both to `var(--swc-icon-color, currentColor)`
so icons follow CSS `color` by default while keeping `--swc-icon-color` themeable.
(React Spectrum's transformer keeps `--swc-icon-color` and rewrites the fallback,
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

**Components already using icons are in scope.** Any 2nd-gen component that renders
a UI icon internally (pickers, menus, accordions, and similar) or exposes an icon
slot must be repointed from the 1st-gen icon packages to this source as part of the
migration, not deferred to a follow-up. Components that render UI icons internally
are covered when Phase 1 lands their source; components that expose icon slots are
verified in Phase 7 against workflow icons and custom SVGs.

| Phase                             | Deliverable                                                                                                                                                                                                                                                                   | Exit                                                                                                                            |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **1. UI icons, internal**         | Manual UI download + committed SVGs + `icon-source.json`; family-agnostic generator core; UI art as Lit `TemplateResult`s and the internal `<swc-ui-icon>` element (size-to-step selection).                                                                                  | Migrated components render UI icons via `<swc-ui-icon>`, sized by the component, off the 1st-gen packages, with no `unsafeSVG`. |
| **2. Workflow-readiness gate**    | Confirm the Phase 1 generator, source layout, metadata, and refresh already accept a second family and a public-element output mode.                                                                                                                                          | Adding workflow is additive, not a rewrite.                                                                                     |
| **3. Workflow icons, public**     | Manual workflow download; the `IconBase` + generic `<swc-icon>`; per-icon workflow functions and elements, reusing the generator core.                                                                                                                                        | A workflow icon works as element and function in HTML and a non-Lit framework.                                                  |
| **4. Packaging and tree-shaking** | Published shapes: the `<swc-icon>` frame in swc, and the per-icon workflow elements and functions in the dedicated **icons** package; per-icon subpath exports for element and function; swc devDepends on the icons package for stories; optional additive Lit entry points. | A 3-icon sample bundle ships only those 3.                                                                                      |
| **5. Refresh automation**         | Scripted post-download refresh for both families; optional internal scheduled-CI PR.                                                                                                                                                                                          | One documented command refreshes a family (after the manual download).                                                          |
| **6. Documentation**              | Per-framework usage, the custom-icon SVG contract, and a 1st-gen migration note (including UI icons now internal).                                                                                                                                                            | A developer on any framework can add a workflow icon and a custom icon from the docs.                                           |
| **7. Verification and rollout**   | React/Vue/vanilla samples and VRT (including internal UI icons across sizes).                                                                                                                                                                                                 | Samples pass; 1st-gen icon packages deprecated with a pointer to the replacement.                                               |

## 10. Alternatives considered

- **Per-icon base classes (`IconStar`):** no unique value once the element and
  function exist. Rejected.
- **Lit `TemplateResult` output / swappable tag for the public workflow function:**
  see section 5.1. Rejected. (Internal UI icons do use `TemplateResult`; that is
  fine because they are not a public contract.)
- **Lit directive:** Lit-only, cannot be a public mechanism. Rejected for v1.
- **Reactive controller:** S2 icons are static, synchronous SVG with no state to
  manage. Rejected.
- **Public UI icons (as in 1st-gen):** dropped to match React Spectrum and design;
  UI icons are internal.
- **UI icons as SVG-string functions inlined with `unsafeSVG`** (earlier draft):
  superseded by the internal `<swc-ui-icon>` element, which removes `unsafeSVG` from
  components and centralizes the size-to-step mapping.

## 11. Open questions

### Resolved

- **A4U as a dependency:** none. The A4U packages are private and this repo is open
  source, so there is no concept of an A4U dependency here; only committed SVGs and
  metadata live in the repo.
- **Refresh automation:** periodic manual refresh is the baseline. Internal
  scheduled CI is optional and Adobe-side only.
- **A11y suppression for inner SVGs:** render the inner SVG hidden (`aria-hidden`);
  that suffices, so no strip-on-slot mechanism is needed.
- **Workflow element reuse:** inheritance. Per-icon elements extend `IconBase` and
  render into one shadow root, not composition (which would nest an inner
  `<swc-icon>` and double the shadow roots).
- **Package topology:** the abstract `IconBase` lives in **core**; the per-icon
  workflow elements and functions live in a dedicated public
  **`@adobe/spectrum-wc-icons`** package (depends only on core); swc holds the
  components, the `<swc-icon>` frame, and the internal `<swc-ui-icon>` element, and
  devDepends on the icons package for Storybook examples.
- **UI icon rendering:** an internal `<swc-ui-icon>` element (`icon` + `size` +
  `accessibleLabel`) rendering Lit `TemplateResult`s, in `components/ui-icons/`. This
  resolves the earlier inline-vs-controller question and removes `unsafeSVG` from
  component code. It extends the behavior-only `IconBase` (size + `accessibleLabel` +
  host a11y); the `<swc-icon>` frame extends the same base, and both share
  `stylesheets/_lit-styles/icon-base.css`.
- **Frame placement:** the concrete `<swc-icon>` frame ships in **swc** with the
  components, not in the icons package, so consumers using swc components with their
  own or A4U icons need not depend on the workflow-icon art package. Because all
  icon elements extend `IconBase` from core, this split adds no coupling. (A
  standalone frame-only package was considered and rejected as unnecessary package
  sprawl.)
- **Component-render audit:** during component migration, confirm (a) no swc
  component needs a _workflow_ icon at runtime, and (b) no _core_ base class renders
  a UI icon itself (which would conflict with UI living in swc). Deferred to that
  work; not a blocker for this RFC.
- **Fallback color:** accepted for the first pass: `var(--swc-icon-color,
currentColor)`. A `light-dark(<token>, <token>)` fallback can be revisited later
  if frameless icons must be theme-correct on their own.
- **Optional Lit entry point:** none shipped. Lit consumers call `unsafeSVG`
  themselves; the documentation must show this clearly.
- **Per-instance shadow roots (UI icons):** accepted: one shadow root per
  `<swc-ui-icon>`, with an inline fast-path available for profiled dense surfaces
  (section 6.3).
- **RTL mirroring:** A4U exposes no per-icon mirror flag, so mirror directional
  icons via a `:dir(rtl)` transform (`scaleX(-1)`) driven by a curated in-repo list.
  First pass: flip the full known-directional set (chevrons, arrows, carets), and
  refine the list as needed. Non-directional icons never flip.
- **UI-icon registry:** static registry for the first pass. `<swc-ui-icon icon>`
  resolves art from a set bundled into the element, keyed by name then numeral step,
  so rendering is synchronous and SSR-friendly. The cost: any component bundle using
  the element pulls the whole UI set (small, shared, internal, and not
  consumer-tree-shakeable regardless). Revisit only if bundle profiling shows it is
  too heavy, where passing a per-icon module to the element preserves both
  synchronous rendering and tree-shaking. A logical UI icon is the full per-step
  optical bundle (50/75/100/200/300 mapping to t-shirt sizes); the element maps
  `size` to the numeral step (section 7):

  ```ts
  // Generated module for one logical icon = numeral step → Lit `html` template.
  // components/ui-icons/icon-set/Chevron.ts (internal, imported relatively)
  export const Chevron = {
    75: html`
      <svg viewBox="0 0 10 10">…</svg>
    `, // s
    100: html`
      <svg viewBox="0 0 10 10">…</svg>
    `, // m
    200: html`
      <svg viewBox="0 0 12 12">…</svg>
    `, // l
    // …one entry per available optical step
  } satisfies UiIconArt;

  // Static registry (chosen): the element resolves the bundled set by name, then
  // step. Internally: renderSVG() => UI_ICONS[this.icon][uiStepFor(this.size)].
  html`
    <swc-ui-icon icon="chevron" .size=${this.size}></swc-ui-icon>
  `;
  ```

### Still open

None. The decisions above settle the design; the item below is an implementation
follow-up.

### Deferred to implementation (no design decision)

- **Per-family size tokens (UI resolved in Phase 1):** `<swc-ui-icon>` now sizes its
  box from the `ui-icon-*` token scale via `ui-icon-sizes.css`, and the `<swc-icon>`
  frame keeps the `workflow-icon-*` scale via `workflow-icon-sizes.css`. Concrete
  workflow values are confirmed when workflow art lands (Phases 3–4).
- **Nearest-step fallback (resolved in Phase 1 POC):** `resolveUiIconArt` renders the
  step that matches the size, or the nearest available step by numeral distance when
  that step is absent (ties resolve to the smaller step). All 10 initial UI icons ship
  every optical step, so no logical icon currently lacks one; the fallback is verified
  by unit tests over a synthetic partial bundle rather than by a shipped partial icon.
