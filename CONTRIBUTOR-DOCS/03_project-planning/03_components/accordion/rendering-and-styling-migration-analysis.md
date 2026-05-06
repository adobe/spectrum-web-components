<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Accordion / Accordion migration roadmap

<!-- Document title (editable) -->

# Accordion migration roadmap

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Component specifications](#component-specifications)
    - [CSS (1st-gen / Spectrum 1)](#css-1st-gen--spectrum-1)
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

**TBD (Spectrum 2):** Mirror this section from `spectrum-css` **`spectrum-two`** accordion component (`metadata.json`, `index.css`, stories template) when the sibling checkout is available.

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

- `sp-icon-chevron100` from `@spectrum-web-components/icons-ui`
- Chevron styles from `@spectrum-web-components/icon`

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
<summary>Spectrum 2 (TBD)</summary>

Paste or link the S2 template markup from **spectrum-css** `spectrum-two` when available. Compare heading/button/slot structure and class names to the above.

</details>

### CSS => SWC mapping

**TBD.** Populate during Step 1 QA: map S2 selectors and `--mod-*` successors to 2nd-gen host parts, internal nodes, and any supported `--swc-accordion-*` surface per [component custom property exposure](../../../02_style-guide/01_css/02_custom-properties.md#component-custom-property-exposure).

---

## Summary of changes

| Area | 1st-gen today | 2nd-gen direction (high level) |
|---|---|---|
| Styling source | Spectrum 1 generated CSS in package | Spectrum 2 tokens from **spectrum-css** `spectrum-two`; narrow public customization. |
| DOM | `#heading` / `#header` / `#content`, optional chevron wrapper | Align with S2 template; preserve APG shape from [accessibility migration analysis](./accessibility-migration-analysis.md). |
| Density / size | `density` + `size` on accordion, chevron scales by size | Reconcile with S2 variant matrix. |
| Custom properties | Broad `--spectrum-accordion-*` / `--mod-*` | Replace with S2 equivalents; document breaking token renames in [migration plan](./migration-plan.md). |

---

## Resources

| Resource | Link |
|---|---|
| 1st-gen accordion package | [`1st-gen/packages/accordion/`](../../../../1st-gen/packages/accordion/) |
| Migration plan | [migration-plan.md](./migration-plan.md) |
| Accessibility analysis | [accessibility-migration-analysis.md](./accessibility-migration-analysis.md) |
| Migration prep (phase 1) | [migration-prep.md](./migration-prep.md) |
| Analyze rendering and styling (workflow) | [README](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_analyze-rendering-and-styling/README.md) |
| Spectrum CSS (external) | [github.com/adobe/spectrum-css](https://github.com/adobe/spectrum-css) — use **`spectrum-two`** branch |
