<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Avatar Link / Avatar link accessibility migration analysis

<!-- Document title (editable) -->

# Avatar link accessibility migration analysis

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Overview](#overview)
    - [Also read](#also-read)
    - [What `swc-avatar-link` is](#what-swc-avatar-link-is)
    - [When to use an avatar image instead](#when-to-use-an-avatar-image-instead)
- [ARIA and WCAG context](#aria-and-wcag-context)
    - [Pattern in the APG](#pattern-in-the-apg)
    - [Guidelines that apply](#guidelines-that-apply)
- [Recommendations: `swc-avatar-link`](#recommendations-swc-avatar-link)
    - [Semantics and naming](#semantics-and-naming)
    - [Keyboard: Enter vs Space](#keyboard-enter-vs-space)
    - [Focus](#focus)
    - [Shadow DOM and cross-root ARIA Issues](#shadow-dom-and-cross-root-aria-issues)
    - [Accessibility tree expectations](#accessibility-tree-expectations)
- [Known 1st-gen issues](#known-1st-gen-issues)
- [Testing](#testing)
    - [Automated tests](#automated-tests)
- [Summary checklist](#summary-checklist)
- [References](#references)

</details>

<!-- Document content (editable) -->

## Overview

This doc defines how **`swc-avatar-link`** should work for **accessibility**. It matches the goal of **WCAG 2.2 Level AA** (common legal and team standard for accessible web content). The pattern is an avatar as a hyperlink: a profile or identity control that navigates like **`<a href>`**.

**1st-gen** uses **`<sp-avatar href="…">`** on the same element as the avatar image; **2nd-gen** should use **`swc-avatar-link`** (wrapping or composing the avatar image with the same SWC avatar style) so link semantics, focus, and keyboard stay aligned with HTML links.

### Also read

- [Avatar accessibility migration analysis](../avatar/accessibility-migration-analysis.md) for the **avatar image** as SWC style and as **`swc-avatar`**, **`alt`** / decorative patterns, and tooling.
- [Avatar migration roadmap](../avatar/rendering-and-styling-migration-analysis.md) for shared **layout** and **CSS**.

### What `swc-avatar-link` is

- A **hyperlink** whose visible affordance is the **avatar image** (same visual language as **`swc-avatar`** and the SWC style on **`<img>`**).
- **`swc-avatar-link`** **cannot** be decorative: it is always an interactive link. **Do not** support **`isDecorative`** or any pattern that hides the link from assistive technology or omits a **name**.
- **`label`** is **always required** and must be used as the **link text**—render the **`label`** string as text content inside the **`<a>`** (for example visible copy beside or under the image, or visually hidden text that stays in the DOM). **Do not** rely on **`aria-label`** alone with no text node in the anchor. The string should describe where the link goes (for example “Open Shantanu Narayen’s profile”), not only what the photo looks like.

### When to use an avatar image instead

- When the photo is **not** navigation—use **`swc-avatar`** or a native **`<img>`** with the avatar SWC style, with correct **`alt`** / **`label`** / **`isDecorative`** as appropriate (see [Avatar accessibility migration analysis](../avatar/accessibility-migration-analysis.md)).

---

## ARIA and WCAG context

### Pattern in the APG

- Follow the **link** pattern: a focusable hyperlink with a discernible **name** ([APG link guidance](https://www.w3.org/WAI/ARIA/apg/patterns/link/) aligns with native **`<a href>`** behavior).

### Guidelines that apply

| Idea | Plain meaning |
|------|----------------|
| [Non-text content (1.1.1)](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content) | The link is **not** decorative and must have a name from **`label`** as link text. The inner **`img`** may use **`alt=""`** when redundant with that text; **do not** treat the whole control as decorative. |
| [Keyboard (2.1.1)](https://www.w3.org/TR/WCAG22/#keyboard) | All link function must be **available** from keyboard. |
| [Focus visible (2.4.7)](https://www.w3.org/TR/WCAG22/#focus-visible) | Focus indicator on the link must be **visible** (Spectrum focus ring). |

**Bottom line:** Implement **`swc-avatar-link`** with a real **`<a href>`** (or equivalent semantics and events that match native links). The link is **never** decorative and **always** requires **`label`** rendered as link text inside the anchor.

---

## Recommendations: `swc-avatar-link`

### Semantics and naming

| Topic | What to do |
|-------|------------|
| **Not decorative** | **`swc-avatar-link`** must **not** be decorative. **Do not** expose **`isDecorative`**, **`aria-hidden`** on the anchor, or other patterns that remove the link from the accessibility tree or omit a name. Decorative avatar images belong on **`swc-avatar`** or a styled **`<img>`** without **`href`**. |
| **Native link** | Use an **`<a href>`** in light or shadow DOM with valid **`href`**. **Do not** implement navigation only through **`click`** on a **`div`**. |
| **`label` (required)** | **`label`** is always required. Render it as **link text** inside the anchor (text node or element containing the string). You may mirror to **`aria-label`** only if redundant with that same visible or visually hidden text per team pattern—**do not** rely on **`aria-label`** alone without the **`label`** string in the anchor content. |
| **Dev mode warning** | When **`label`** is missing or empty, emit a **dev-only** warning in debug; **never** ship silent unnamed avatar links. |
| **`img alt`** | With **`label`** as link text, the inner avatar **`img`** usually uses **`alt=""`** when the photo is redundant with the link text. If the image adds non-redundant information, coordinate **`img alt`** with the link text so users do **not** hear duplicated or conflicting strings—follow team guidance in implementation review. |

### Keyboard: Enter vs Space

| Topic | What to do |
|-------|------------|
| **Enter** | **Activate** the link on **`keydown` / `keyup` Enter**—same as native **`<a href>`**. |
| **Space** | **Do not** activate navigation on **Space** alone. Native HTML links **do not** activate on Space the way **`button`** does; Space on a focused link may scroll the page in some browsers. **`swc-avatar-link`** must **not** attach a button-like Space handler that navigates. |
| **Assistive technology “click”** | Screen readers expose **press** / **activate** actions that may **not** match **Enter** alone. For example, **VoiceOver** on macOS often uses **⌘⌥Space** (Command + Option + Space) to activate the focused control. Tests and QA checklists should verify activation with **AT** shortcuts, **not** only Enter in automated browser tests. |

### Focus

- An avatar link should be part of the tab order and should be focusable.
- **Focus** ring applies to the same element that has **`href`** (the anchor).

### Shadow DOM and cross-root ARIA Issues

- If the anchor is inside shadow DOM, ensure focus delegation or a single tab stop on the host still exposes link semantics to platform accessibility APIs (follow **2nd-gen** patterns for other link-like components).

### Accessibility tree expectations

**Link with name**

- One link object with a clear **name** derived from **`label`** rendered as link text inside the anchor.

**Activation**

- Announces navigation intent **consistent** with other links on the page.

---

## Known 1st-gen issues

- **`<sp-avatar href>`** combines avatar image and link in one tag; warnings and focus logic are shared with usage without **`href`**. Splitting to **`swc-avatar`** or SWC style + **`img`**, plus **`swc-avatar-link`**, isolates link requirements (**Enter** vs **Space**, name on link).
- Confirm **1st-gen** does **not** simulate button **Space** on the anchor; if any shared mixin adds Space activation, file a bug against parity with native **`<a>`**.

---

## Testing

### Automated tests

| Kind of test | What to check |
|--------------|----------------|
| **Unit** | **`label`** is present and appears as text inside the anchor; **`href`** present; warns if not present; **no** **`isDecorative`** API. |
| **Keyboard** | **Enter** follows link (or fires navigation equivalent); **Space** does **not** trigger navigation in unit or integration tests where product requires HTML parity. |
| **Manual / AT** | **VoiceOver** (or **NVDA**) activate gesture opens link; VoiceOver on macOS often uses **⌘⌥Space** (Command + Option + Space) to activate the focused control; link is focusable via keyboard and can be activated using **Enter** but not **Space**. |
| **aXe + Storybook** | Every story has a non-empty **`label`** as link text; **no** decorative-only or unnamed avatar links. |

---

## Summary checklist

- [ ] **`swc-avatar-link`** uses real **`<a href>`** semantics.
- [ ] **`swc-avatar-link`** **cannot** be decorative; **no** **`isDecorative`** or equivalent.
- [ ] **`label`** is **always required** and rendered as **link text** inside the anchor.
- [ ] **Enter** activates; **Space** does **not** navigate like a **button**. VoiceOver on macOS often uses **⌘⌥Space** (Command + Option + Space) to activate the focused control.
- [ ] Docs mention **AT** activation (for example **VoiceOver** **⌘⌥Space**) for QA.
- [ ] **Dev** warning when **`label`** is missing or empty.

---

## References

- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [WAI-ARIA link pattern](https://www.w3.org/WAI/ARIA/apg/patterns/link/)
- [Using ARIA (read this first)](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/)
- [Avatar accessibility migration analysis](../avatar/accessibility-migration-analysis.md)
- [Avatar migration roadmap](../avatar/rendering-and-styling-migration-analysis.md)
