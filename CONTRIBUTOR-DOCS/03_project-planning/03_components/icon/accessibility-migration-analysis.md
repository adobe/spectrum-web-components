<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Icon / Icon accessibility migration analysis

<!-- Document title (editable) -->

# Icon accessibility migration analysis

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Overview](#overview)
    - [Also read](#also-read)
    - [What an icon is](#what-an-icon-is)
    - [What it is not](#what-it-is-not)
    - [Related](#related)
- [ARIA and WCAG context](#aria-and-wcag-context)
    - [Pattern in the APG](#pattern-in-the-apg)
    - [Guidelines that apply](#guidelines-that-apply)
- [Related 1st-gen accessibility (Jira)](#related-1st-gen-accessibility-jira)
- [Recommendations: `<swc-icon>`](#recommendations-swc-icon)
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

This document covers the accessibility requirements and recommendations for **`<swc-icon>`**, the 2nd-gen generic SVG wrapper frame. The target standard is **WCAG 2.2 Level AA**.

`<swc-icon>` accepts an SVG in its default slot and controls whether that SVG is exposed to assistive technology (meaningful) or hidden from it (decorative). Per-icon workflow elements such as `<swc-icon-star>` extend the same base class (`IconBase`) and inherit the same accessibility behavior.

### Also read

[Icon migration roadmap](./rendering-and-styling-migration-analysis.md) for layout, CSS, and DOM changes.

### What an icon is

`<swc-icon>` is a **non-interactive SVG wrapper**. It operates in one of two modes:

- **Decorative** (no `label`): the common case. The icon is inside an already-labeled control such as a button or menu item. Both host and SVG receive `aria-hidden="true"` so the icon does not generate a duplicate announcement.
- **Meaningful** (with `label`): the icon stands alone as content. The slotted SVG is exposed as an image with the `label` value as its accessible name.

### What it is not

- A button, link, or interactive element. To add click behavior to an icon, wrap it in `<swc-button>` or another interactive control; do not add event listeners directly to `<swc-icon>`.
- A font icon or CSS pseudo-element. It renders real SVG markup.
- A replacement for per-icon workflow elements (`<swc-icon-star>`, etc.), which are the preferred approach for Spectrum workflow icons and extend the same base class.

### Related

- **Per-icon workflow elements** (`<swc-icon-star>`, etc.): generated wrappers that share `IconBase`; accessibility behavior is identical to `<swc-icon>`.
- **UI icon functions** (internal): consumed directly by components such as `<swc-button>` and `<swc-menu-item>`; not slotted by authors.

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

**Bottom line:** Every `<swc-icon>` is either explicitly decorative (hidden) or explicitly meaningful (named). Leaving `label` empty when an icon is the sole communication of meaning is an author error that fails WCAG 1.1.1.

---

## Related 1st-gen accessibility (Jira)

| Jira | Type | Status (snapshot) | Resolution (snapshot) | Summary |
|------|------|-------------------|------------------------|---------|
| [SWC-875](https://jira.corp.adobe.com/browse/SWC-875) | Epic | Done | Fixed | Update icon components for accessibility |
| [SWC-1337](https://jira.corp.adobe.com/browse/SWC-1337) | Bug | To Do | Unresolved | Different icons depending on import path — may deliver different SVG shapes, which changes what assistive technology announces |

---

## Recommendations: `<swc-icon>`

### ARIA roles, states, and properties

| Topic | What to do |
|-------|------------|
| **One semantic role** | `<swc-icon>` represents one thing: a static SVG image or a decorative glyph. **Do not** set `role="button"`, `role="link"`, or any interactive role on the host. For icon buttons, wrap `<swc-icon>` inside `<swc-button>` or a native `<button>`. |
| **Host element role** | The host carries no explicit ARIA role; it is a transparent custom-element container. The slotted SVG in the light DOM is the semantic anchor for meaningful icons. This implementation differs from the RFC's stated "host owns semantics" intent: `role="img"` and `aria-label` are applied to the SVG rather than the host. Both approaches produce a correct accessibility tree; the SVG-centric approach avoids needing a separate step to hide the SVG when the host carries the role. The ARIA snapshot confirms the correct outcome: `img "Search"`. |
| **Decorative (no `label`)** | `updateHostAccessibility()` sets `aria-hidden="true"` on the host. `updateSlottedIcon()` sets `aria-hidden="true"` on the SVG and removes `aria-label`. Both are hidden. This is the default and the common case. |
| **Meaningful (with `label`)** | `updateSlottedIcon()` sets `role="img"` and `aria-label` equal to the `label` value on the SVG, then removes `aria-hidden` from the SVG. `updateHostAccessibility()` removes `aria-hidden` from the host. The host becomes a transparent container; the SVG carries the role and name. |
| **Label is authoritative** | `updateSlottedIcon()` overwrites whatever ARIA attributes the slotted SVG already carries. If an icon function emits its own `aria-label` or `role`, the frame replaces them with the host's `label` value (or hides them when `label` is empty). This resolves the RFC's "A11y suppression mechanism" open question via overwrite-on-slot. |
| **`size`** | Visual only. Not mapped to any ARIA state or property. |
| **CSS custom properties** | `--swc-icon-color`, `--swc-icon-inline-size`, `--swc-icon-block-size` are visual only. No ARIA mapping. |
| **Docs expectation** | Document that `label` is required when `<swc-icon>` is used as standalone content. Document that `size` and color properties carry no ARIA meaning. Do not list Tab, Space, or Enter as valid icon keys. |

### Shadow DOM and cross-root ARIA Issues

None. The slotted SVG is in the light DOM. ARIA attributes are set directly on it via `querySelector` within `updateSlottedIcon()`. No `aria-labelledby` or `aria-describedby` ID references cross shadow boundaries. `<swc-icon>` is not a form-associated element.

### Accessibility tree expectations

**Decorative icon (no `label`)**

Host has `aria-hidden="true"` and is not in the accessibility tree. The SVG also has `aria-hidden="true"`. Assistive technology sees nothing for this element.

**Meaningful icon (with `label`)**

Host has no `aria-hidden` and no explicit role; it is a transparent container. The SVG has `role="img"` and `aria-label="<label value>"`. Assistive technology announces the image node with the label.

Confirmed by `icon.a11y.spec.ts`:

```
- img "Search"
```

**Sizes story (`icon.a11y.spec.ts`):**

```
- img "Extra-small"
- img "Small"
- img "Medium"
- img "Large"
- img "Extra-large"
```

**Icon inside a labeled control (most common case)**

When `<swc-icon>` is slotted inside a `<swc-button label="Close">`, the button owns the accessible name. The icon should have no `label` (decorative); the button label covers the announcement. Setting a `label` on the icon here produces redundant speech.

### Keyboard and focus

**Not focusable.** Keyboard navigation should skip this component and move to the next focusable element.

---

## Testing

### Automated tests

| Kind of test | What to check |
|--------------|---------------|
| **Unit (Storybook play functions)** | `SlottedSvgAccessibilityTest`: slotted SVG has `role="img"` and `aria-label` matching `label`. `NoLabelAriaHiddenTest`: both host and SVG have `aria-hidden="true"` when `label` is empty. `LabelTogglingTest`: ARIA attributes update correctly when `label` changes at runtime. |
| **Playwright ARIA snapshots (`icon.a11y.spec.ts`)** | Labeled icons expose as `img "<label text>"`. Sizes story: each icon exposes with its size-appropriate label. |
| **aXe + Storybook test-runner** | WCAG 2.x rules on icon stories. Decorative-only story instances must include a `label` to avoid name-required violations, or the story must be scoped to a context where the icon is already inside a labeled parent. |
| **Color contrast** | Icon fill meets 3:1 against background per WCAG 1.4.11. Verify across semantic color variants and static-color stories. |

### Manual screen reader testing

`<swc-icon>` is not keyboard focusable. Screen reader users encounter it in **browse mode** (document or scan mode), not via Tab navigation. Manual testers must use browse mode to verify that meaningful icons announce their name, role, and state in reading order, and that decorative icons are silent.

See the **Browse mode (document/scan mode)** section of the [2nd-gen Storybook screen reader testing guide](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/screen_reader_testing.mdx) for setup and testing steps.

---

## Summary checklist

- [ ] Decorative icons (no `label`) have `aria-hidden="true"` on both host and SVG.
- [ ] Meaningful icons (`label` set) expose the slotted SVG as `img "<label value>"` in the accessibility tree.
- [ ] `label` changes at runtime update ARIA attributes on both host and SVG correctly.
- [ ] No ARIA role is set on the host; `role="img"` lives on the slotted SVG in the light DOM.
- [ ] `<swc-icon>` is not in the Tab order; focus moves to the next focusable element.
- [ ] `size` and CSS custom properties are documented as visual-only (no ARIA mapping).
- [ ] ARIA snapshot tests (`icon.a11y.spec.ts`) cover labeled icons in the overview, anatomy, and sizes stories.
- [ ] Manual screen reader testing uses browse mode per the Storybook guide.
- [ ] aXe runs on icon stories; all story instances either include a `label` or are inside a labeled parent.
- [ ] Per-icon workflow elements (`<swc-icon-star>`, etc.) share `IconBase` and are covered by the same test assertions.

---

## References

- [WAI-ARIA 1.2](https://www.w3.org/TR/wai-aria-1.2/)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [Using ARIA (read this first)](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/)
- [Non-text content (WCAG 1.1.1)](https://www.w3.org/TR/WCAG22/#non-text-content)
- [Non-text contrast (WCAG 1.4.11)](https://www.w3.org/TR/WCAG22/#non-text-contrast)
- [Icon migration roadmap](./rendering-and-styling-migration-analysis.md)
- [2nd-gen Storybook: Screen reader testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/screen_reader_testing.mdx)
