<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Illustrated Message / Illustrated message accessibility migration analysis

<!-- Document title (editable) -->

# Illustrated message accessibility migration analysis

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Overview](#overview)
    - [Also read](#also-read)
    - [What `swc-illustrated-message` is](#what-swc-illustrated-message-is)
    - [Heading hierarchy and page context](#heading-hierarchy-and-page-context)
- [ARIA and WCAG context](#aria-and-wcag-context)
    - [Pattern in the APG](#pattern-in-the-apg)
    - [Guidelines that apply](#guidelines-that-apply)
- [Recommendations: `<swc-illustrated-message>`](#recommendations-swc-illustrated-message)
    - [Heading slot, `heading` attribute, and `heading-level`](#heading-slot-heading-attribute-and-heading-level)
    - [Other content and slots](#other-content-and-slots)
    - [Shadow DOM and cross-root ARIA issues](#shadow-dom-and-cross-root-aria-issues)
    - [Accessibility tree expectations](#accessibility-tree-expectations)
    - [Keyboard and focus](#keyboard-and-focus)
- [Known 1st-gen issues](#known-1st-gen-issues)
- [Testing](#testing)
    - [Automated tests](#automated-tests)
- [Summary checklist](#summary-checklist)
- [References](#references)

</details>

<!-- Document content (editable) -->

## Overview

This doc defines how `swc-illustrated-message` should work for accessibility and heading semantics. It targets WCAG 2.2 Level AA.

### Also read

- [Illustrated message migration roadmap](./rendering-and-styling-migration-analysis.md) for layout, CSS, DOM, and Spectrum 2 gaps.

### What `swc-illustrated-message` is

- A composed empty state or explanatory block: illustration (often SVG), a title-like line, description text, and optionally actions.
- It can appear anywhere on a page—inside a dialog, under a page `h1`, as the only content of a section, nested in cards, etc.

### Heading hierarchy and page context

The component cannot know which `h2`–`h6` level is correct for the page; authors must set that explicitly. The only supported pattern is: title text comes from the `heading` slot (see below), and the semantic heading element is always created in shadow DOM.

Do not use `h1` for the illustrated message title. `h1` is for the primary page (or dialog / sheet title outside this block). This component exposes `h2`–`h6` only via `heading-level` (`2`–`6`).

2nd-gen must implement:

- `heading-level` property (attribute `heading-level`): integers `2`–`6`, default `2`. The shadow tree renders exactly one `<h2>` … `<h6>` matching that value. Values outside `2`–`6` (including `1`) must be clamped or coerced to `2`–`6` (for example `1` → `2`), or rejected in types with a documented default—pick one policy and document it in Storybook.
- `heading` slot: accepts a `span` only (or equivalent documented phrasing: a single `span` wrapper as the slotted node). Do not allow slotted `<h1>`–`<h6>`; authors must not put heading elements in light DOM for this slot. Implementation may validate in dev and warn or ignore invalid slotted tags.

This differs from putting a real heading in the slot (as in accordion item titles) and from 1st-gen, which always wraps the slot in `<h2>` with no level control. Accordion still allows `level` `1`–`6` on the parent ([SWC-1466](https://jira.corp.adobe.com/browse/SWC-1466), [PR #5969](https://github.com/adobe/spectrum-web-components/pull/5969)); illustrated message uses `heading-level` `2`–`6` only (no `h1`).

Documentation and Storybook must tell authors to set `heading-level` from document outline, not from visual preference alone.

---

## ARIA and WCAG context

### Pattern in the APG

- The APG does not define an “illustrated message” widget. Treat it as structured content: headings, text, optional controls.

### Guidelines that apply

| Idea | Plain meaning |
|------|----------------|
| [Info and relationships (WCAG 1.3.1)](https://www.w3.org/TR/WCAG22/#info-and-relationships) | The programmatic heading level must reflect the document outline. Avoid a second `h1` inside this pattern—keep one top-level heading per page view. |
| [Headings and labels (WCAG 2.4.6)](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels.html) | The title should describe topic purpose; `heading-level` should match sibling and parent headings (`h2`–`h6`). |
| [Name, role, value (WCAG 4.1.2)](https://www.w3.org/TR/WCAG22/#name-role-value) | Action buttons and links need discernible names; decorative illustrations should not pollute the accessibility tree. |

Bottom line: Authors choose `heading-level` (`2`–`6`, i.e. `h2`–`h6`) to match the page. The component always emits the corresponding heading in shadow DOM; the slot does not supply the heading tag.

---

## Recommendations: `<swc-illustrated-message>`

### Heading slot, `heading` attribute, and `heading-level`

| Topic | What to do |
|-------|------------|
| No `h1` | Never render `<h1>`. Do not accept `heading-level="1"`. `h1` belongs to the page, shell, or dialog title, not this block. |
| `heading-level` | Required behavior: `2`–`6`, default `2`. Clamp or coerce out-of-range values; document behavior for invalid input (same spirit as accordion `getHeadingLevel()`). |
| `heading` slot | Span only: document that the slot must contain a `span` (or stricter: exactly one root `span`). No slotted `<h1>`–`<h6>`. |
| Shadow heading | Single heading element in shadow DOM; tag is `<h2>`–`<h6>` per `heading-level`. Slot and/or `heading` attribute supply text content inside that element (not the element type). |
| `heading` slot | Only mechanism for providing heading content; no attribute fallback. |
| Docs | Examples across `heading-level` `2`–`6` (for example below page `h1` vs nested under `h3`). Contrast with accordion: accordion allows `level` `1`; illustrated message does not. |

### Other content and slots

| Topic | What to do |
|-------|------------|
| Illustration (default slot) | If purely decorative, `aria-hidden="true"` on the SVG (or equivalent). If meaningful, `role="img"` and `aria-label` / `<title>` (see icon and SVG accessibility patterns). |
| Description | Body text; links inside description must be real `<a>` or link components with visible names. |
| Actions (Spectrum 2) | Slotted buttons follow button and action group labeling; order matches visual reading order. |

### Shadow DOM and cross-root ARIA issues

- If `aria-labelledby` / `aria-describedby` reference slotted ids, confirm 2nd-gen id forwarding or document limitations. Heading `id` for region labeling should live on the shadow `<h2>`–`<h6>` if needed.

### Accessibility tree expectations

Typical open state

- One heading: correct `h2`–`h6` from `heading-level`, with label text from the `heading` slot (`span` content).
- Description as text content (and focusable links if present).
- Illustration exposed or hidden per decorative vs informative rules.

### Keyboard and focus

- The host is not a single tab stop unless design adds interactive chrome; Tab moves to slotted actions and links in DOM order.
- No requirement for arrow-key widget behavior unless actions compose a pattern (for example button group docs).

---

## Known 1st-gen issues

- `sp-illustrated-message` always wraps the heading slot in `<h2 id="heading">` ([`IllustratedMessage.ts`](https://github.com/adobe/spectrum-web-components/blob/main/1st-gen/packages/illustrated-message/src/IllustratedMessage.ts)) with no `heading-level` API—authors cannot match outline when the block should be `h3`–`h6`.
- The slot accepts any node; slotted heading elements would nest incorrectly inside `<h2>`. 2nd-gen fixes this by owning the heading tag and restricting the slot to `span` only.

---

## Testing

### Automated tests

| Kind of test | What to check |
|--------------|----------------|
| Unit | Rendered tag is `h2`–`h6` matching `heading-level`; default `2`; `heading-level` `1` never produces `h1`; invalid values coerce per spec; `heading` slot rejects or ignores non-`span` root if that is the contract. |
| aXe + Storybook | Heading order sane; no `h1` inside illustrated message stories; no empty headings when title required. |
| Integration | Dropzone and dialog demos set `heading-level` appropriately for context. |

---

## Summary checklist

- [ ] API documented: `heading-level` `2`–`6` (default `2`); `heading` slot span-only; shadow DOM owns `<h2>`–`<h6>`; no `<h1>`.
- [ ] Storybook examples vary `heading-level` by context (not always `2`).
- [ ] 1st-gen fixed `h2` called out as migration motivation; link SWC-1466 / accordion for “configurable level” precedent only (different slot rules).
- [ ] Decorative vs meaningful illustration documented for SVG slot.
- [ ] Actions slot meets button label requirements.

---

## References

- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [Understanding info and relationships (1.3.1)](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html)
- [Understanding headings and labels (2.4.6)](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels.html)
- [feat(accordion): add `level` property for controlling title heading (PR #5969)](https://github.com/adobe/spectrum-web-components/pull/5969) — precedent for a numeric heading level on a parent; illustrated message uses `heading-level` `2`–`6`, span-only title slot, and shadow-owned heading tag (SWC-1466).
- [Illustrated message migration roadmap](./rendering-and-styling-migration-analysis.md)
- [SWC-1466](https://jira.corp.adobe.com/browse/SWC-1466) (Adobe internal Jira): accordion heading level; analogous motivation for configurable `heading-level` on illustrated message.
