<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Divider / Divider accessibility migration analysis

<!-- Document title (editable) -->

# Divider accessibility migration analysis

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Overview](#overview)
    - [Also read](#also-read)
    - [What a divider is](#what-a-divider-is)
    - [When to use something else](#when-to-use-something-else)
- [ARIA and WCAG context](#aria-and-wcag-context)
    - [Pattern in the APG](#pattern-in-the-apg)
    - [Guidelines that apply](#guidelines-that-apply)
- [Recommendations: `<swc-divider>`](#recommendations-swc-divider)
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

This doc explains how **`swc-divider`** should work for **accessibility**. It supports **WCAG 2.2 Level AA**.

### Also read

[Divider migration roadmap](./rendering-and-styling-migration-analysis.md) for visuals and DOM.

### What a divider is

- A **line** that splits sections or groups of controls. It is **not** draggable and **not** a focus target by default.

### When to use something else

- For a **split pane** users can move with the keyboard, use a **window splitter** pattern ([APG](https://www.w3.org/WAI/ARIA/apg/patterns/windowsplitter/)), not the plain divider.

---

## ARIA and WCAG context

### Pattern in the APG

- There is **no** page in the APG named “divider.”

### Guidelines that apply

| Idea | Plain meaning |
|------|----------------|
| [`separator` role](https://www.w3.org/TR/wai-aria-1.2/#separator) | A **non-focusable** divider maps to a **separator** in the accessibility tree. **Do not** add progress values (`aria-valuenow`, etc.). |
| [`aria-orientation`](https://www.w3.org/TR/wai-aria-1.2/#aria-orientation) | Use **`vertical`** for vertical dividers. For horizontal lines, **leave the attribute off** (default is horizontal). |
| [Non-text contrast (WCAG 1.4.11)](https://www.w3.org/TR/WCAG22/#non-text-contrast) | The line should be **visible enough** next to its background, especially with **`static-color`** on photos or tinted areas. |
| [Info and relationships (WCAG 1.3.1)](https://www.w3.org/TR/WCAG22/#info-and-relationships) | **Headings** and **landmarks** still define sections. A divider **helps** layout; it **does not replace** a heading. |

**Bottom line:** Keep **`swc-divider`** as a **separator** with the right **orientation**. Do not pretend it is keyboard-driven unless you ship a different, interactive pattern.

---

## Recommendations: `<swc-divider>`

### ARIA roles, states, and properties

| Topic | What to do |
|-------|------------|
| **`role="separator"`** | **Prescribed** and **fixed** on the host (`DividerBase`). It must **not** be author-overridable in implementation or docs. **Do not** switch to `presentation`, `none`, or any other role; if that fits better, use **different** markup or a **different** pattern. **`swc-divider`** maps to **one** semantic role only. |
| **`aria-orientation`** | Set **`vertical`** when the divider is vertical. For horizontal, **omit** it. |
| **Docs** | Tell authors to pair dividers with **headings** or **landmarks** when section structure matters.  Ensure that docs examples use divders in this way. Too many separators can make screen readers **chatty**—use **fewer** lines when you can. |

### Shadow DOM and cross-root ARIA Issues

None

### Accessibility tree expectations

#### Horizontal line**

- **Role:** **separator** (horizontal by default).
- **Name:** Usually **none**. In rare cases an app may set **`aria-label`**—that should be uncommon.
- **Focus:** **Not** focusable.

#### Vertical line**

- Same as horizontal, plus **`aria-orientation="vertical"`**.

#### Where it sits

- Between named **siblings** (e.g. toolbar groups, landmark sections, etc.). It should **not** be the **only** clue for “what section is this?”—use **headings** too when needed.

### Keyboard and focus

**Not focusable.** Keyboard navigation should skip this component and move to the next focusable element.

---

## Testing

### Automated tests

| Kind of test | What to check |
|--------------|----------------|
| **Unit** | **`role="separator"`**. **`aria-orientation="vertical"`** when `vertical` is true; **not** set (or default horizontal) when false. **Role + orientation** stay in sync if `vertical` toggles. Host is **not** focusable. |
| **aXe + Storybook** | **WCAG 2.x** rules on divider stories. |
| **Playwright ARIA snapshots** | Keep **`divider.a11y.spec.ts`** (overview, sizes, vertical, static colors, …). |
| **Contrast** | **Color-contrast** / non-text checks where they matter, especially **`static-color`** stories. |

---

## Summary checklist

- [ ] Stories use **real section text** around dividers—not only **`size`** or **`static-color`** as if they were user-facing labels.
- [ ] Code keeps **`role="separator"`** and correct **`aria-orientation`** for vertical dividers.
- [ ] Divider stays **non-interactive** (no Tab stop).
- [ ] Docs explain **headings / landmarks** vs **divider-only** layout.
- [ ] **`static-color`** and contrast are documented; Storybook **Accessibility** matches.
- [ ] Tree checks show **separator**; vertical stories show **vertical**; no surprise **name** unless intended.
- [ ] **ARIA snapshots** for **horizontal** and **vertical** dividers.
- [ ] **Unit tests** prove **no** **Tab** focus on the divider by default.
- [ ] **aXe** (WCAG 2.x tags) runs on divider stories.

---

## References

- [WAI-ARIA 1.2: separator](https://www.w3.org/TR/wai-aria-1.2/#separator)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [Using ARIA (read this first)](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/)
- [Divider migration roadmap](./rendering-and-styling-migration-analysis.md)
