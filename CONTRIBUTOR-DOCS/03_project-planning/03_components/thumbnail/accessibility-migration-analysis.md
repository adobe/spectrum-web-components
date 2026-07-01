<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Thumbnail / Thumbnail accessibility migration analysis

<!-- Document title (editable) -->

# Thumbnail accessibility migration analysis

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Overview](#overview)
    - [Also read](#also-read)
    - [What a thumbnail is](#what-a-thumbnail-is)
    - [When to use something else](#when-to-use-something-else)
    - [What it is not](#what-it-is-not)
- [ARIA and WCAG context](#aria-and-wcag-context)
    - [Pattern in the APG](#pattern-in-the-apg)
    - [Guidelines that apply](#guidelines-that-apply)
- [Related 1st-gen accessibility (Jira)](#related-1st-gen-accessibility-jira)
- [Recommendations: `<swc-thumbnail>`](#recommendations-swc-thumbnail)
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

This doc tells you how **`swc-thumbnail`** should work for **accessibility**. It targets **WCAG 2.2 Level AA**. Until `swc-thumbnail` exists under `2nd-gen/`, use `1st-gen/packages/thumbnail/src/Thumbnail.ts` (`<sp-thumbnail>`) to validate behavior, and update this spec against the real 2nd-gen source when it ships.

### Also read

[Thumbnail migration roadmap](./rendering-and-styling-migration-analysis.md) for DOM structure, CSS selectors, and size mapping.

### What a thumbnail is

A small square image container used as a **visual reference** for an image, layer, or effect. It appears in a variety of contexts — image pickers, layer panels, menu items — as a preview. It is **not** interactive on its own.

### When to use something else

- Need a **clickable** preview? Wrap `swc-thumbnail` inside an interactive parent (for example a button, link, or selectable card). Do **not** make the thumbnail itself interactive.
- Need a **circular profile image** for a person or entity? Use `swc-avatar` instead.

### What it is not

A thumbnail is **not** a button, link, or selectable item. It is a **visual reference** embedded inside a larger component. The larger component is responsible for interaction and state (focus, disabled, selected).

---

## ARIA and WCAG context

### Pattern in the APG

The [APG](https://www.w3.org/WAI/ARIA/apg/) does not list a thumbnail widget. A thumbnail acts as an **image**: it displays visual content without its own interaction model. `role="img"` is the appropriate host role for a non-interactive image container, particularly when the visual content may come from a slotted element, a CSS background, or an opacity checkerboard rather than always a native `<img>` element.

### Guidelines that apply

| Idea | Plain meaning |
|------|----------------|
| [Non-text content (WCAG 1.1.1)](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html) | Every image container must have a text alternative. The host carries `role="img"` and requires an accessible name via `aria-label` or `aria-labelledby`. |
| [Use of color (WCAG 1.4.1)](https://www.w3.org/TR/WCAG22/#use-of-color) | Color alone must not convey state meaning. Visual states (disabled, focused, selected) applied to the thumbnail by a parent component must also be communicated via the parent's ARIA, not by color on the thumbnail alone. |
| [Non-text contrast (WCAG 1.4.11)](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast) | The thumbnail border (inset box-shadow) is a graphical element and must meet 3:1 contrast with adjacent colors. |
| [Name, role, value (WCAG 4.1.2)](https://www.w3.org/WAI/WCAG22/#name-role-value) | The host exposes `role="img"` and an accessible name. Shadow DOM wrappers are decorative and not exposed to AT. |

**Bottom line:** Treat `swc-thumbnail` as a named image container. It needs `role="img"` and a name. It is not interactive and does not enter the Tab order.

---

## Related 1st-gen accessibility (Jira)

| Jira | Type | Status (snapshot) | Resolution (snapshot) | Summary |
|------|------|-------------------|-------------------------|---------|
| [SWC-164](https://jira.corp.adobe.com/browse/SWC-164) | Story | Done | Deferred | test(thumbnail): refactor test structure |
| [SWC-419](https://jira.corp.adobe.com/browse/SWC-419) | Story | Done | Fixed | docs(thumbnail): audit documentation |
| [SWC-1221](https://jira.corp.adobe.com/browse/SWC-1221) | Story | Done | — | docs(Thumbnail, Avatar, Swatch, Swatch group, Opacity checkerboard): Create migration documentation |
| [SWC-2100](https://jira.corp.adobe.com/browse/SWC-2100) | Task | To Do | Unresolved | Upload artifact: document and support thumbnail-background-image for derived previews |

---

## Recommendations: `<swc-thumbnail>`

### ARIA roles, states, and properties

| Topic | What to do |
|-------|------------|
| **One semantic role** | `swc-thumbnail` is an image container. It exposes one prescribed role: `role="img"`. **Do not** allow authors to override the host role (for example, do **not** expose `role="button"` or `role="presentation"`). If an interactive thumbnail is needed, authors should wrap the component inside an interactive element like a button or link. |
| **Host `role="img"`** | Set `role="img"` on the host element. This is **prescribed and fixed**. The host carries the image semantics in all rendering modes: slotted image, CSS background, or checkerboard only. |
| **Accessible name (required)** | Every thumbnail must have a name that assistive technology can announce. Use `aria-label` on the host (for example `aria-label="Layer 1 preview"`). An empty or missing accessible name fails [WCAG 1.1.1](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html). A dev-mode warning is appropriate when no name is detectable at runtime. |
| **Slotted `<img>` alt text** | When an `<img>` element is placed in the default slot, set `alt=""` (empty) on it. The host with `role="img"` and `aria-label` provides the accessible image name; a non-empty `alt` on the slotted `<img>` would produce a redundant or conflicting announcement. This is a change from 1st-gen, where authors set `alt` on the `<img>` directly. |
| **"Hide image" variant** | When no image is slotted (the opacity checkerboard renders alone), the host still carries `role="img"` and still requires `aria-label`. The checkerboard is decorative. |
| **`disabled` visual state** | **Do not** expose `disabled` as a property or attribute on `swc-thumbnail`. The reduced-opacity appearance is applied by the parent component that is disabled. Authors should not put `disabled` on the thumbnail itself. The parent carries `aria-disabled="true"` or `disabled`; the thumbnail contributes only its `role="img"` and name. |
| **`focused` visual state** | **Do not** expose `focused` as a property or attribute on `swc-thumbnail`. The focus ring is drawn by the parent interactive element (for example a button containing the thumbnail). Authors should not put `focused` on the thumbnail itself. |
| **`selected` visual state** | **Do not** expose `selected` as a property or attribute on `swc-thumbnail`. When a parent component (for example a list item, card, or layer row) is selected, the parent can style the embedded thumbnail to reflect that selection state via CSS. |
| **`size`, `cover`, `background`, `layer`** | **Visual-only** properties. Do **not** map them to ARIA states. They affect layout and appearance only. |
| **Docs** | State clearly that `swc-thumbnail` is **not interactive**. Show how to embed it in a button, link, or selectable card, and how disabled, focused, and selected visual states are applied by the parent component, not by the thumbnail itself. |

### Shadow DOM and cross-root ARIA Issues

None. The thumbnail does not use ID references that cross shadow boundaries. The shadow DOM renders decorative wrappers only (`.image-wrapper`, `.opacity-checkerboard`, `.background`, `.layer-inner`). No ARIA attributes are needed on these shadow DOM nodes.

### Accessibility tree expectations

#### Default (with slotted `<img>`)

```
img "Layer 1 preview"          ← host: role="img" + aria-label
  (slotted img, alt="")        ← not separately announced
```

#### "Hide image" variant (checkerboard only, no slotted `<img>`)

```
img "Empty layer"              ← host: role="img" + aria-label
```

#### Thumbnail embedded inside a disabled parent

```
button "Upload file" (disabled)
  img "File preview"           ← thumbnail is part of the button name/subtree
```

The thumbnail's role and name are still present. The parent button carries `aria-disabled="true"` or `disabled`; the thumbnail does not change its own role or name.

#### Thumbnail embedded inside a selected parent

```
option "Layer 2" (selected)
  img "Layer 2 preview"        ← thumbnail is part of the option subtree
```

The selected state belongs to the parent. The thumbnail contributes only its image name.

### Keyboard and focus

**Not focusable.** Keyboard navigation should skip this component and move to the next focusable element.

---

## Testing

### Automated tests

| Kind of test | What to check |
|--------------|----------------|
| **Unit** | Host has `role="img"`. Host is **not** focusable by default. `aria-label` is present; dev-mode warning fires when no name is detectable. Slotted `<img alt="">` is not separately announced. |
| **aXe + Storybook** | Run WCAG 2.x rules on thumbnail stories: default, "hide image" variant, and embedded-in-button pattern. |
| **Playwright ARIA snapshots** | Add `thumbnail.a11y.spec.ts` for 2nd-gen. Cover default (with slotted image), "hide image" variant, and thumbnail embedded in a disabled parent. |
| **Contrast** | Border (inset box-shadow) meets 3:1 against adjacent background in default and high-contrast modes. |

### Manual screen reader testing

The thumbnail is not in the Tab order, so you will not reach it with focus-mode navigation. Use **browse mode** (document or scan mode) to read the page in content order and encounter the thumbnail so you can verify its role (`img`) and accessible name are announced correctly. See the 2nd-gen Storybook [Screen reader testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/screen_reader_testing.mdx) guide, including the **Browse mode (document/scan mode)** section.

When the thumbnail is embedded inside a focusable parent (for example a button or link), focus-mode navigation does reach the parent; verify that the parent's accessible name reflects the image content via its own label, not by re-announcing the thumbnail's `role="img"` separately.

---

## Summary checklist

- [ ] Host carries `role="img"` (prescribed and fixed; not author-overridable).
- [ ] Authors provide `aria-label` on the host for the accessible name; missing name fails WCAG 1.1.1.
- [ ] Slotted `<img>` uses `alt=""` (empty); the host `role="img"` + `aria-label` is the semantic surface.
- [ ] `disabled`, `focused`, and `selected` are **not** attributes or properties on `swc-thumbnail`; visual states for these are applied by a parent component.
- [ ] Docs and stories show how to embed the thumbnail inside a button, link, or selectable card, and how the parent's disabled, focused, and selected states style the thumbnail.
- [ ] Dev-mode warning fires when no accessible name is provided.
- [ ] Shadow DOM nodes are decorative and not exposed in the accessibility tree.
- [ ] Thumbnail is **not** in the Tab order; unit test verifies this.
- [ ] aXe (WCAG 2.x) runs on thumbnail stories.
- [ ] Manual screen reader testing uses browse mode per the Storybook [Screen reader testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/screen_reader_testing.mdx) guide, since the thumbnail is not keyboard focusable.

---

## References

- [WAI-ARIA 1.2: `img` role](https://www.w3.org/TR/wai-aria-1.2/#img)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [WCAG 1.1.1: Non-text content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html)
- [WCAG 4.1.2: Name, role, value](https://www.w3.org/WAI/WCAG22/#name-role-value)
- [WCAG 1.4.11: Non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast)
- [Using ARIA (read this first)](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/)
- [Thumbnail migration roadmap](./rendering-and-styling-migration-analysis.md)
- [2nd-gen Storybook: Screen reader testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/screen_reader_testing.mdx)
