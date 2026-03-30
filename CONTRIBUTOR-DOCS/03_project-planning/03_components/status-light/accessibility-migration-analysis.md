<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Status Light / Status light accessibility migration analysis

<!-- Document title (editable) -->

# Status light accessibility migration analysis

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Overview](#overview)
    - [Also read](#also-read)
    - [What it is](#what-it-is)
    - [When to use something else](#when-to-use-something-else)
- [ARIA and WCAG context](#aria-and-wcag-context)
    - [Pattern in the APG](#pattern-in-the-apg)
    - [Guidelines that apply](#guidelines-that-apply)
- [Recommendations: `<swc-status-light>`](#recommendations-swc-status-light)
    - [ARIA roles, states, and properties](#aria-roles-states-and-properties)
    - [Shadow DOM and cross-root ARIA Issues](#shadow-dom-and-cross-root-aria-issues)
    - [Accessibility tree expectations](#accessibility-tree-expectations)
    - [Keyboard and focus](#keyboard-and-focus)
- [Testing](#testing)
    - [Automated tests](#automated-tests)
- [Summary checklist](#summary-checklist)
- [References](#references)

</details>

<!-- Document content (editable) -->

## Overview

This doc explains how **`swc-status-light`** should work for **accessibility**. It supports **WCAG 2.2 Level AA**.

### Also read

[Status light migration roadmap](./rendering-and-styling-migration-analysis.md).

### What it is

- A **colored dot** plus **text** that shows status or category. It is **not** a live feed by default and **not** something you tab to.

### When to use something else

- **Clickable** or **removable** labels → [Tag](../tag/rendering-and-styling-migration-analysis.md) or [Action Button](../action-button/rendering-and-styling-migration-analysis.md).
- **Small label without the dot** → [Badge](../badge/accessibility-migration-analysis.md).

---

## ARIA and WCAG context

### Pattern in the APG

- The APG does **not** list a “status light” widget. This part is **not** a keyboard pattern.

### Guidelines that apply

| Idea | Plain meaning |
|------|----------------|
| [Use of color (WCAG 1.4.1)](https://www.w3.org/TR/WCAG22/#use-of-color) | The **dot color** is **not** enough by itself. The **text** (or another proper **name**) must explain the status. |
| [Contrast (WCAG 1.4.3)](https://www.w3.org/TR/WCAG22/#contrast-minimum) | Text and dot need enough **contrast** on the background. |
| [`status` role](https://www.w3.org/TR/wai-aria-1.2/#status) | This role means **live updates**. **Do not** put `role="status"` or `aria-live` on a **static** status light—it can announce too often or at the wrong time. |

**Bottom line:** Treat it as **plain content** with a **visible label**. The dot in CSS (`::before`) is **extra visual**; the **words** carry the meaning.

---

## Recommendations: `<swc-status-light>`

### ARIA roles, states, and properties

| Topic | What to do |
|-------|------------|
| **One semantic role** | Keep **one** clear semantics: static status text with an **accessible name**. **Do not** use the host to pretend this is a **different** widget (for example **`role="button"`**). If you need interaction, use [Action Button](../action-button/rendering-and-styling-migration-analysis.md) or [Tag](../tag/rendering-and-styling-migration-analysis.md)—not a role override on **`swc-status-light`**. |
| **Role** | You **do not** need a special default role. **Do not** add `role="status"`, `role="img"`, or `aria-live` unless a **separate** spec says content **updates live** and you document that. |
| **Name (required)** | There **must** be text in the **default slot** (or **`aria-label`** / **`aria-labelledby`**). **Empty** with no name breaks [WCAG 4.1.2](https://www.w3.org/TR/WCAG22/#name-role-value). |
| **The dot** | Built as a **`::before`** shape in 2nd-gen CSS. It is **decoration** if the text already explains the status—no extra ARIA node for the dot. |
| **`variant` / `size`** | **Looks only.** Do **not** map **`variant`** to ARIA states (for example, do not auto-set `aria-invalid` from `negative`). Meaning comes from **your words**, not the token name (“celery,” “positive,” …). |
| **`disabled` / `aria-disabled`** | **Not** part of Spectrum 2 **`swc-status-light`**. Say “unavailable” in the **label text** (and style if needed), not with `disabled` on a non-control. |
| **Docs** | Say it is **not interactive**. **Do not** list **Tab / Space / Enter** as normal behavior. **Do not** say **`variant`** sets ARIA by itself. |

### Shadow DOM and cross-root ARIA Issues

None

### Accessibility tree expectations

**With text in the slot**

- Screen readers should get the **label** from that text.
- The part is **not** focusable. Spectrum 2 does **not** use **`aria-disabled`**.

**If the slot is empty**

- You **must** supply **`aria-label`** (or **`aria-labelledby`**) or you have **no name**.

**Where it sits**

- **Inline** in a cell, list item, field group, etc. It is **not** a page landmark by itself.

### Keyboard and focus

**Not focusable.** Keyboard navigation should skip this component and move to the next focusable element.

---

## Testing

### Automated tests

| Kind of test | What to check |
|--------------|----------------|
| **Unit** | Host is **not** focusable. Fixture has **text** or another **accessible name**. **`disabled` / `aria-disabled`** are **not** set by 2nd-gen code. |
| **aXe + Storybook** | **WCAG 2.x** rules on status-light stories. |
| **Playwright ARIA snapshots** | Keep **`status-light.a11y.spec.ts`** (overview, semantic + non-semantic variants, sizes). |
| **Contrast** | Checks on variant stories with **realistic** backgrounds. |

---

## Summary checklist

- [ ] Stories use **real status words** (“Approved,” “Sync failed,” “On hold”), not **token names** (“positive,” “celery,” “fuchsia”) as the only label.
- [ ] Part stays **non-interactive** (no Tab focus).
- [ ] Docs say **`disabled` / `aria-disabled`** are **out** for 2nd-gen; “unavailable” is shown in **copy** instead.
- [ ] Docs do **not** say **`variant`** adds ARIA or live regions by itself.
- [ ] Tree shows **slot text** or **`aria-label`**; snapshots or tools confirm.
- [ ] Optional: **dev warning** when slot is empty **and** there is still **no** name ([WCAG 4.1.2](https://www.w3.org/TR/WCAG22/#name-role-value)).
- [ ] **ARIA snapshot** tests for main stories.
- [ ] Test proves **no** **Tab** focus by default.
- [ ] **aXe** (WCAG 2.x tags) runs on status-light stories.

---

## References

- [WAI-ARIA 1.2](https://www.w3.org/TR/wai-aria-1.2/)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [Using ARIA (read this first)](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/)
- [Status light migration roadmap](./rendering-and-styling-migration-analysis.md)
