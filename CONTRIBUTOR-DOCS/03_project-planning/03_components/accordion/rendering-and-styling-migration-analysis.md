<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Accordion / Accordion migration roadmap

<!-- Document title (editable) -->

# Accordion migration roadmap

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Component specifications](#component-specifications)
    - [CSS (1st-gen / Spectrum 1)](#css-1st-gen--spectrum-1)
    - [Figma — S2 Web (desktop scale)](#figma--s2-web-desktop-scale)
    - [SWC (1st-gen)](#swc-1st-gen)
- [Comparison](#comparison)
    - [DOM structure changes](#dom-structure-changes)
    - [CSS => SWC mapping](#css--swc-mapping)
- [Summary of changes](#summary-of-changes)
- [Resources](#resources)

</details>

<!-- Document content (editable) -->

Spectrum 2 CSS-to-SWC migration notes for **`swc-accordion`** and **`swc-accordion-item`**. For accessibility behavior (APG accordion pattern, headings, keyboard), see [Accordion accessibility migration analysis](./accessibility-migration-analysis.md).

**Status:** Phase 1 prep — 1st-gen inventory captured below. **Next:** With **spectrum-css** checked out on **`spectrum-two`** beside this repo, complete selector extraction from component `metadata.json`, three-way DOM comparison, and token mapping per [Analyze rendering and styling](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_analyze-rendering-and-styling/README.md).

---

## Component specifications

### CSS (1st-gen / Spectrum 1)

1st-gen packages import generated Spectrum CSS:

- [`1st-gen/packages/accordion/src/spectrum-accordion.css`](../../../../1st-gen/packages/accordion/src/spectrum-accordion.css) — host tokens, size/density variants, `--spectrum-logical-rotation` for disclosure.
- [`1st-gen/packages/accordion/src/spectrum-accordion-item.css`](../../../../1st-gen/packages/accordion/src/spectrum-accordion-item.css) — `:host`, `#heading`, `#header`, `#content`, `.iconContainer`, state variants (`[open]`, `[disabled]`, hover, focus-visible).

<details>
<summary>Modifier highlights (`--mod-*` / `--spectrum-accordion-*`)</summary>

Representative tokens consumed in 1st-gen (not exhaustive — extract full list from Spectrum CSS when completing this doc):

- `--mod-accordion-item-width`, `--mod-accordion-item-height`, `--mod-accordion-min-block-size`
- `--mod-accordion-divider-color`, `--mod-accordion-divider-thickness`
- `--mod-accordion-disclosure-indicator-height`, `--mod-accordion-edge-to-disclosure-indicator-space`, `--mod-accordion-disclosure-indicator-to-text-space`, `--mod-accordion-edge-to-text-space`
- `--mod-accordion-item-header-*` (padding, font, line-height, colors)
- `--mod-accordion-item-content-*` (padding, font, color)
- `--mod-accordion-background-color-*`, `--mod-accordion-corner-radius`, `--mod-accordion-focus-indicator-*`
- System overrides in [`accordion-overrides.css`](../../../../1st-gen/packages/accordion/src/accordion-overrides.css)

</details>

**TBD (Spectrum 2):** Mirror this section from `spectrum-css` **`spectrum-two`** accordion component (`metadata.json`, `index.css`, stories template) when the sibling checkout is available. Use [Figma — S2 Web (desktop scale)](#figma--s2-web-desktop-scale) below as the **design** source until that extraction is complete; reconcile any delta with `metadata.json` line by line (do not assume Figma and CSS stay in lockstep without verification).

### Figma — S2 Web (desktop scale)

**Canonical link (dev mode):** [S2 — Web (Desktop scale) — Accordion](https://www.figma.com/design/Mngz9H7WZLbrCvGQf3GnsY/S2---Web--Desktop-scale-?node-id=39469-5419&p=f&m=dev) (`node-id=39469-5419`).

The following is transcribed from the **published Accordion** page in that file (export reviewed May 2025; doc stamp **Last updated May 16, 2025** / Kami F.). Treat Figma as **visual and variant inventory**; **coded** selectors and tokens still come from **spectrum-css** `spectrum-two` when available.

#### Definition

An accordion shows a list of items that can be expanded or collapsed to reveal more content. The pattern can support **zero, one, or multiple** expanded items at a time (aligns quantity-of-open with product API such as [`allowsMultipleExpanded`](https://react-spectrum.adobe.com/Accordion), not with “quiet vs default” styling).

<details>
<summary>Accordion (root) — properties in Figma</summary>

| Figma property | Role (from doc copy) |
|---|---|
| **Quiet** | Boolean — change appearance / communication of status |
| **Variant** | Variant control on the accordion set (see item matrix for spacing/style family) |

Figma defaults shown in the property table include **Quiet = False** for the accordion-level control where listed.

</details>

<details>
<summary>Accordion item — properties in Figma</summary>

| Figma property | Role (from doc copy) |
|---|---|
| **State** | **Open** (and interactive states shown in grids — **Hover**, **Down**, **Disabled**) |
| **Quiet** | Boolean — aligns with accordion “quiet” visual family |
| **Density** | **Compact**, **Regular**, **Spacious** — “change density” between items |
| **Show paddings** | Toggle — show/hide padding guides (design-tool only; corresponds to **no inline padding** style in Spectrum CSS — **not** a public SWC prop) |
| **Show direct actions** | Toggle — show/hide **direct actions** region (optional chrome next to title) |
| **Show switch** | Toggle — show/hide **switch** in the header row |
| **Show action button** | Toggle — show/hide **action button** |
| **@ Title** | Text — title string |
| **Instance swap** | Local component swaps where applicable |

**Migration implication:** Optional header affordances (**direct actions**, **switch**, **action button**) match the direction of richer headers in React Spectrum S2 (**`AccordionItemHeader`**, action controls). 1st-gen SWC uses a single header label + chevron only; **2nd-gen** may need **named slots** or internal structure once S2 template and a11y review land (see [migration plan](./migration-plan.md) and [accessibility analysis](./accessibility-migration-analysis.md)).

**Density note:** Figma places **Density** on the **item** component with three steps (**Compact** / **Regular** / **Spacious**). 1st-gen reflects **`density`** on **`sp-accordion`** only (`compact` \| `spacious` \| unset). Reconcile host vs item during Step 1 when comparing `metadata.json` to this file — [migration plan — `density`](./migration-plan.md#public-api) defines reflected **`regular`** and full typing parity with React Spectrum.

**Show paddings:** Treat as documentation and **CSS custom-property** coverage only ([migration plan](./migration-plan.md) — spacing overrides + a dedicated Storybook story, **no** component attribute).

</details>

<details>
<summary>Sizes, states, and styles (Figma matrices)</summary>

- **Sizes:** **S**, **M**, **L**, **XL** (maps to existing SWC **`size`** scale).
- **States (interactive):** **Default**, **Hover**, **Down**, **Disabled** across the published grids.
- **Style families:** **Default** vs **Quiet**, crossed with **open/closed** and **density** rows (**Compact**, **Regular**, **Spacious**) in the canvases.

**Figma caveat:** Keyboard **focus** state is **not** represented in the file; the spec points authors to Spectrum **coded** components and site docs for focus treatment.

</details>

#### Usage guidelines (from Figma — do not mix)

- **Do not mix default and quiet accordion items inside one accordion.** Default accordions must not contain quiet items, and quiet accordions must not contain default items — the doc states this avoids **conflicting interaction behaviors**.
- **Quiet hover and dividers:** The quiet accordion item hover state uses **rounded corners**. Using that inside a **default** accordion (with dividers) produces **gaps at corners** that the default divider treatment does not fill; only **keyboard focus** outline is expected to read similarly against dividers. **Prefer one style family per accordion** for both UX and markup/CSS predictability.

This reinforces **accordion-wide `quiet`** (and consistent items) as the primary authoring model for 2nd-gen; avoid advertising **per-item `quiet`** that could violate this guidance unless Spectrum explicitly documents an exception ([migration plan](./migration-plan.md)).

### SWC (1st-gen)

<details>
<summary>Attributes / properties (`sp-accordion`)</summary>

- `allow-multiple` (boolean)
- `density` (`compact` | `spacious`)
- `level` (number, default 3)
- `size` (`s` | `m` | `l` | `xl`)

</details>

<details>
<summary>Attributes / properties (`sp-accordion-item`)</summary>

- `open` (boolean)
- `label` (string)
- `disabled` (boolean)
- `level` (number — overwritten by parent when slotted)
- `size` (from parent)

</details>

<details>
<summary>Slots</summary>

- **`sp-accordion`:** default — `sp-accordion-item` children.
- **`sp-accordion-item`:** default — panel body.

</details>

<details>
<summary>Nested components / assets</summary>

- 1st-gen: `sp-icon-chevron100` from `@spectrum-web-components/icons-ui` and chevron styles from `@spectrum-web-components/icon`
- 2nd-gen: prefer **`swc-icon`** internally for the disclosure indicator ([migration plan](./migration-plan.md))

</details>

---

## Comparison

### DOM structure changes

<details>
<summary>Spectrum Web Components (1st-gen `AccordionItem`)</summary>

Conceptual shadow output:

```html
<h2 id="heading">
  <!-- optional: .iconContainer + sp-icon-chevron100 -->
  <button id="header" aria-expanded="..." aria-controls="content">...</button>
</h2>
<div id="content" role="region" aria-labelledby="header">
  <slot></slot>
</div>
```

**`sp-accordion`:** single default `<slot>`; parent coordinates items via events and assigned nodes.

</details>

<details>
<summary>Spectrum 2 (TBD — CSS template)</summary>

Paste or link the S2 template markup from **spectrum-css** `spectrum-two` when available. Compare heading/button/slot structure and class names to the above.

**Design reference (until template is pasted):** [Figma — S2 Web (desktop scale)](#figma--s2-web-desktop-scale) — sizes **S–XL**, **Default/Quiet**, **Compact/Regular/Spacious** density, optional header actions/switch/button, and **do-not-mix** quiet vs default usage.

</details>

### CSS => SWC mapping

**TBD.** Populate during Step 1 QA: map S2 selectors and `--mod-*` successors to 2nd-gen host parts, internal nodes, and any supported `--swc-accordion-*` surface per [component custom property exposure](../../../02_style-guide/01_css/02_custom-properties.md#component-custom-property-exposure).

---

## Summary of changes

| Area | 1st-gen today | 2nd-gen direction (high level) |
|---|---|---|
| Styling source | Spectrum 1 generated CSS in package | Spectrum 2 tokens from **spectrum-css** `spectrum-two`; narrow public customization. |
| DOM | `#heading` / `#header` / `#content`, optional chevron wrapper | Align with S2 template; preserve APG shape from [accessibility migration analysis](./accessibility-migration-analysis.md). |
| Quiet vs default | No `quiet` on accordion or item | **Figma / S2:** accordion-level **Quiet** and item-level quiet must **not** be mixed with the opposite style inside one accordion ([Figma section](#figma--s2-web-desktop-scale)). Implement **`quiet`** as a single family per instance ([migration plan](./migration-plan.md)). |
| Header chrome | Title + chevron only | **Figma** shows optional **direct actions**, **switch**, **action button** toggles — likely **slots** or subregions; align with [React Spectrum `AccordionItemHeader`](https://react-spectrum.adobe.com/Accordion) when scoping Phase 5/7. |
| Density / size | `density` + `size` on accordion, chevron scales by size | **Figma** item **Density:** **Compact** / **Regular** / **Spacious**; sizes **S–XL**. Reconcile host vs item propagation with `metadata.json` + [migration plan `density`](./migration-plan.md#public-api). |
| States | `open`, `disabled`, hover/focus in CSS | Match **Default / Hover / Down / Disabled** from Figma; **focus-visible** not in Figma — follow APG + [accessibility analysis](./accessibility-migration-analysis.md). |
| Custom properties | Broad `--spectrum-accordion-*` / `--mod-*` | Replace with S2 equivalents; document breaking token renames in [migration plan](./migration-plan.md). |

---

## Resources

| Resource | Link |
|---|---|
| Figma — S2 Web (Desktop scale), Accordion | [figma.com/design/Mngz9H7WZLbrCvGQf3GnsY](https://www.figma.com/design/Mngz9H7WZLbrCvGQf3GnsY/S2---Web--Desktop-scale-?node-id=39469-5419&p=f&m=dev) |
| 1st-gen accordion package | [`1st-gen/packages/accordion/`](../../../../1st-gen/packages/accordion/) |
| Migration plan | [migration-plan.md](./migration-plan.md) |
| Accessibility analysis | [accessibility-migration-analysis.md](./accessibility-migration-analysis.md) |
| Analyze rendering and styling (workflow) | [README](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_analyze-rendering-and-styling/README.md) |
| Spectrum CSS (external) | [github.com/adobe/spectrum-css](https://github.com/adobe/spectrum-css) — use **`spectrum-two`** branch |
