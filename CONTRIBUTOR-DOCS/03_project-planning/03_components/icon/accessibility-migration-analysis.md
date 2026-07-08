<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Icon / Icon accessibility migration analysis

<!-- Document title (editable) -->

# Icon accessibility migration analysis

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Overview](#overview)
    - [Also read](#also-read)
    - [The generic frame (`swc-icon`)](#the-generic-frame-swc-icon)
    - [Per-icon workflow elements](#per-icon-workflow-elements)
    - [What it is not](#what-it-is-not)
    - [Related](#related)
- [ARIA and WCAG context](#aria-and-wcag-context)
    - [Pattern in the APG](#pattern-in-the-apg)
    - [Guidelines that apply](#guidelines-that-apply)
- [Related 1st-gen accessibility (Jira)](#related-1st-gen-accessibility-jira)
- [Recommendations: `<swc-icon>` and workflow icons](#recommendations-swc-icon-and-workflow-icons)
    - [ARIA roles, states, and properties](#aria-roles-states-and-properties)
    - [Shadow DOM and cross-root ARIA Issues](#shadow-dom-and-cross-root-aria-issues)
    - [Accessibility tree expectations](#accessibility-tree-expectations)
    - [Keyboard and focus](#keyboard-and-focus)
- [Testing](#testing)
    - [Automated tests](#automated-tests)
    - [Manual screen reader testing](#manual-screen-reader-testing)
- [Summary checklist](#summary-checklist)
- [References](#references)

</details>

<!-- Document content (editable) -->

## Overview

This document covers the accessibility requirements and recommendations for **`<swc-icon>`** (the generic SVG frame) and **per-icon workflow elements** such as `<swc-icon-star>`. Both are built on `IconBase` and share identical ARIA behavior. The target standard is **WCAG 2.2 Level AA**.

### Also read

[Icon migration roadmap](./rendering-and-styling-migration-analysis.md) for layout, CSS, and DOM changes.

### The generic frame (`swc-icon`)

`<swc-icon>` accepts an SVG in its default slot and controls whether that SVG is exposed to assistive technology or hidden from it:

- **Decorative** (no `label`): the common case. The icon is inside an already-labeled control such as a button or menu item. Both host and SVG receive `aria-hidden="true"` so the icon does not generate a duplicate announcement.
- **Meaningful** (with `label`): the icon stands alone as content. The slotted SVG is exposed as an image with the `label` value as its accessible name.

### Per-icon workflow elements

Per-icon workflow elements (`<swc-icon-star>`, `<swc-icon-folder>`, etc.) extend `IconBase` and bake their SVG content in during element definition rather than accepting it via slot. From an accessibility standpoint, the behavior is identical to `<swc-icon>`:

- `label` absent → decorative, both host and SVG are hidden.
- `label` present → meaningful, SVG exposes as `img` with the label as its accessible name.

One authoring difference matters for accessibility: **the element tag name describes shape, not function.** `<swc-icon-star>` tells the browser what shape to render; it says nothing about why the icon is there.

In practice, workflow icons are almost always decorative. The parent element — a `<swc-button>`, `<swc-badge>`, or menu item — carries the `label` that assistive technology announces, and the icon itself needs no `label` at all. Only set `label` on a workflow icon when it genuinely stands alone as the sole communication of meaning, with no labeled parent. In that case `label` must describe the function in context — `label="Add to favorites"`, not `label="Star"`.

### What it is not

- A button, link, or interactive element. To add click behavior to an icon, wrap it in `<swc-button>` or another interactive control; do not add event listeners directly to `<swc-icon>` or a per-icon workflow element.
- A font icon or CSS pseudo-element. Both element types render real SVG markup.

### Related

- **UI icon functions** (internal): consumed directly by components such as `<swc-button>` and `<swc-menu-item>`; not used by authors. Accessibility is component-controlled.

---

## ARIA and WCAG context

### Pattern in the APG

The [APG](https://www.w3.org/WAI/ARIA/apg/) does not define a named pattern for a generic SVG icon wrapper. Relevant guidance comes from the APG's treatment of images and decorative content:

- A **decorative** icon inside an already-labeled control must be hidden from assistive technology to prevent duplicate announcement.
- A **standalone meaningful** icon needs `role="img"` and an accessible name (`aria-label`), because SVG elements do not have a reliable implicit ARIA role across all browsers and assistive technologies.
- A **custom element** has no implicit ARIA role; `role="img"` must be applied explicitly to the element that carries the semantics.

### Guidelines that apply

| Idea | Plain meaning |
|------|---------------|
| [Non-text content (WCAG 1.1.1)](https://www.w3.org/TR/WCAG22/#non-text-content) | Every meaningful image needs a text alternative. Decorative images must be hidden from assistive technology. |
| [Use of color (WCAG 1.4.1)](https://www.w3.org/TR/WCAG22/#use-of-color) | Color alone must not convey meaning. The accessible name, not the icon's color, must carry semantic intent. |
| [Contrast — minimum (WCAG 1.4.3)](https://www.w3.org/TR/WCAG22/#contrast-minimum) | Text rendered inside SVG must meet 4.5:1 against its background. |
| [Non-text contrast (WCAG 1.4.11)](https://www.w3.org/TR/WCAG22/#non-text-contrast) | The icon fill must meet 3:1 contrast against the adjacent background for UI components. |

**Bottom line:** Every icon element — `<swc-icon>` or a per-icon workflow element — is either explicitly decorative (hidden) or explicitly meaningful (named). Leaving `label` empty when an icon is the sole communication of meaning is an author error that fails WCAG 1.1.1.

---

## Related 1st-gen accessibility (Jira)

| Jira | Type | Status (snapshot) | Resolution (snapshot) | Summary |
|------|------|-------------------|------------------------|---------|
| [SWC-875](https://jira.corp.adobe.com/browse/SWC-875) | Epic | Done | Fixed | Update icon components for accessibility |
| [SWC-1337](https://jira.corp.adobe.com/browse/SWC-1337) | Bug | To Do | Unresolved | Different icons depending on import path — may deliver different SVG shapes, which changes what assistive technology announces |

---

## Recommendations: `<swc-icon>` and workflow icons

### ARIA roles, states, and properties

| Topic | What to do |
|-------|------------|
| **One semantic role** | Both `<swc-icon>` and per-icon workflow elements represent one thing: a static SVG image or a decorative glyph. **Do not** set `role="button"`, `role="link"`, or any interactive role on the host. For icon buttons, wrap inside `<swc-button>` or a native `<button>`. |
| **Host element role** | The host carries no explicit ARIA role; it is a transparent custom-element container. The SVG is the semantic anchor for meaningful icons. This differs from the RFC's stated "host owns semantics" intent: `role="img"` and `aria-label` are applied to the SVG rather than the host. Both approaches produce a correct accessibility tree; the SVG-centric approach avoids needing a separate step to hide the SVG. The ARIA snapshot confirms the correct outcome: `img "Search"`. |
| **Decorative (no `label`)** | `updateHostAccessibility()` sets `aria-hidden="true"` on the host. `updateSlottedIcon()` sets `aria-hidden="true"` on the SVG and removes `aria-label`. Both are hidden. This is the default and the most common case. |
| **Meaningful (with `label`)** | `updateSlottedIcon()` sets `role="img"` and `aria-label` equal to the `label` value on the SVG, then removes `aria-hidden` from the SVG. `updateHostAccessibility()` removes `aria-hidden` from the host. The host becomes a transparent container; the SVG carries the role and name. |
| **Label is authoritative** | `updateSlottedIcon()` overwrites whatever ARIA attributes the SVG already carries. If an icon function emits its own `aria-label` or `role`, the frame replaces them with the host's `label` value (or hides them when `label` is empty). This resolves the RFC's "A11y suppression mechanism" open question via overwrite-on-slot. |
| **Per-icon element SVG source** | Per-icon workflow elements bake their SVG during element definition rather than accepting it via slot. `updateSlottedIcon()` still runs via `firstUpdated`, so the same ARIA attributes are applied to the baked SVG. No separate handling is needed. |
| **Workflow icon label content** | The element tag name describes shape, not function. `<swc-icon-star>` says nothing about why the icon is present. When the icon is meaningful, `label` must describe the function in context: `label="Add to favorites"`, not `label="Star"`. When the icon is decorative (inside a labeled button), omit `label` entirely. |
| **`size`** | Visual only. Not mapped to any ARIA state or property. |
| **CSS custom properties** | `--swc-icon-color`, `--swc-icon-inline-size`, `--swc-icon-block-size` are visual only. No ARIA mapping. |
| **Docs expectation** | Document that `label` is required when any icon element is used as standalone content, and that `label` should describe function in context, not icon shape. Document that `size` and color properties carry no ARIA meaning. Do not list Tab, Space, or Enter as valid icon keys. |

### Shadow DOM and cross-root ARIA Issues

None. The slotted SVG is in the light DOM. ARIA attributes are set directly on it via `querySelector` within `updateSlottedIcon()`. No `aria-labelledby` or `aria-describedby` ID references cross shadow boundaries. `<swc-icon>` is not a form-associated element.

### Accessibility tree expectations

**Decorative icon (no `label`)**

Host has `aria-hidden="true"` and is not in the accessibility tree. The SVG also has `aria-hidden="true"`. Assistive technology sees nothing for this element. Applies to both `<swc-icon>` and per-icon workflow elements.

**Meaningful `<swc-icon>` (with `label`)**

Host has no `aria-hidden` and no explicit role; it is a transparent container. The SVG has `role="img"` and `aria-label="<label value>"`. Assistive technology announces the image node with the label.

Confirmed by `icon.a11y.spec.ts`:

```text
- img "Search"
```

**Sizes story (`icon.a11y.spec.ts`):**

```text
- img "Extra-small"
- img "Small"
- img "Medium"
- img "Large"
- img "Extra-large"
```

**Meaningful workflow icon (with `label`)**

Per-icon workflow elements produce the same tree shape. The baked SVG carries `role="img"` and `aria-label` via `updateSlottedIcon()`.

Expected for `<swc-icon-star label="Add to favorites">`:

```text
- img "Add to favorites"
```

Expected for `<swc-icon-folder label="Open project">`:

```text
- img "Open project"
```

**Icon inside a labeled control (most common case)**

When any icon element is slotted inside a `<swc-button label="Close">`, the button owns the accessible name. The icon should have no `label` (decorative); the button label covers the announcement. Setting a `label` on the icon here produces redundant speech.

### Keyboard and focus

**Not focusable.** Keyboard navigation should skip this component and move to the next focusable element.

---

## Testing

### Automated tests

| Kind of test | What to check |
|--------------|---------------|
| **Unit (Storybook play functions, `swc-icon`)** | `SlottedSvgAccessibilityTest`: slotted SVG has `role="img"` and `aria-label` matching `label`. `NoLabelAriaHiddenTest`: both host and SVG have `aria-hidden="true"` when `label` is empty. `LabelTogglingTest`: ARIA attributes update correctly when `label` changes at runtime. |
| **Unit (Storybook play functions, workflow icons)** | Per-icon elements follow the same pattern. Verify that the baked SVG receives `role="img"` and `aria-label` when `label` is set, and `aria-hidden="true"` when `label` is empty. |
| **Playwright ARIA snapshots (`icon.a11y.spec.ts`)** | `<swc-icon>` labeled stories expose as `img "<label text>"`. Sizes story: each size exposes with its label. Workflow icon stories: each labeled element exposes as `img` with the function-describing label (not the shape name). |
| **aXe + Storybook test-runner** | WCAG 2.x rules on all icon stories. Decorative-only instances must be inside a labeled parent; standalone icons must have `label` set. |
| **Color contrast** | Icon fill meets 3:1 against background per WCAG 1.4.11. Verify across color variants and static-color stories for both `<swc-icon>` and workflow icon stories. |

### Manual screen reader testing

`<swc-icon>` is not keyboard focusable. Screen reader users encounter it in **browse mode** (document or scan mode), not via Tab navigation. Manual testers must use browse mode to verify that meaningful icons announce their name, role, and state in reading order, and that decorative icons are silent.

See the **Browse mode (document/scan mode)** section of the [2nd-gen Storybook screen reader testing guide](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/screen_reader_testing.mdx) for setup and testing steps.

---

## Summary checklist

- [ ] Decorative icons (no `label`) have `aria-hidden="true"` on both host and SVG — applies to `<swc-icon>` and all per-icon workflow elements.
- [ ] Meaningful icons (`label` set) expose the SVG as `img "<label value>"` in the accessibility tree.
- [ ] `label` changes at runtime update ARIA attributes on both host and SVG correctly.
- [ ] No ARIA role is set on the host; `role="img"` lives on the SVG (light DOM for `<swc-icon>`, baked SVG for per-icon elements).
- [ ] Icon elements are not in the Tab order; focus moves to the next focusable element.
- [ ] `size` and CSS custom properties are documented as visual-only (no ARIA mapping).
- [ ] Workflow icon `label` values describe function in context (`"Add to favorites"`), not icon shape (`"Star"`); this is documented for authors.
- [ ] ARIA snapshot tests (`icon.a11y.spec.ts`) cover labeled `<swc-icon>` stories (overview, anatomy, sizes).
- [ ] ARIA snapshot tests for per-icon workflow elements verify `img "<function-label>"` for each labeled story.
- [ ] Manual screen reader testing uses browse mode per the Storybook guide.
- [ ] aXe runs on all icon stories; every standalone icon instance has a `label`, or is inside a labeled parent.

---

## References

- [WAI-ARIA 1.2](https://www.w3.org/TR/wai-aria-1.2/)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [Using ARIA (read this first)](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/)
- [Non-text content (WCAG 1.1.1)](https://www.w3.org/TR/WCAG22/#non-text-content)
- [Non-text contrast (WCAG 1.4.11)](https://www.w3.org/TR/WCAG22/#non-text-contrast)
- [Icon migration roadmap](./rendering-and-styling-migration-analysis.md)
- [2nd-gen Storybook: Screen reader testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/screen_reader_testing.mdx)
