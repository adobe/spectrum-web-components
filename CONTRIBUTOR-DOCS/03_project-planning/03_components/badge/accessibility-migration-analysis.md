<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Badge / Badge accessibility migration analysis

<!-- Document title (editable) -->

# Badge accessibility migration analysis

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Overview](#overview)
    - [Also read](#also-read)
    - [What a badge is](#what-a-badge-is)
    - [When to use something else](#when-to-use-something-else)
- [ARIA and WCAG context](#aria-and-wcag-context)
    - [Pattern in the APG](#pattern-in-the-apg)
    - [Guidelines that apply](#guidelines-that-apply)
- [Recommendations: `<swc-badge>`](#recommendations-swc-badge)
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

This doc tells you how **`swc-badge`** should work for **accessibility**. It matches the goal of **WCAG 2.2 Level AA** (common legal and team standard for accessible web content).

### Also read

[Badge migration roadmap](./rendering-and-styling-migration-analysis.md) for layout, CSS, and DOM changes.

### What a badge is

- A **small label** (status, category, tag). It is **not** something you click or tab to by default.

### When to use something else

- Need a **button**, **link**, **removable chip**, or **clickable** control? Use [Action Button](../action-button/rendering-and-styling-migration-analysis.md), [Tag](../tag/rendering-and-styling-migration-analysis.md), or a native link—not a badge.

---

## ARIA and WCAG context

### Pattern in the APG

- The [APG](https://www.w3.org/WAI/ARIA/apg/) (Authoring Practices Guide) does **not** list a special “badge” widget. A badge is **not** a keyboard widget and does not need one fixed ARIA **role**.

### Guidelines that apply

| Idea | Plain meaning |
|------|----------------|
| [Use of color (WCAG 1.4.1)](https://www.w3.org/TR/WCAG22/#use-of-color) | Do not rely on **color alone**. The **words** on the badge (or a proper **name** for screen readers) must carry the meaning. |
| [Contrast (WCAG 1.4.3)](https://www.w3.org/TR/WCAG22/#contrast-minimum) | Text and icons should be **easy to see** against the background. |

**Bottom line:** Treat **`swc-badge`** as **static content** on the page. Do not turn the core badge into a custom interactive control.

---

## Recommendations: `<swc-badge>`

### ARIA roles, states, and properties

| Topic | What to do |
|-------|------------|
| **One semantic role** | The badge should represent **one** thing: a **static** label. **Do not** set a host `role` that turns it into a **different** kind of control (for example **`role="button"`** or **`role="progressbar"`**). If you need button, link, or other semantics, use [Action Button](../action-button/rendering-and-styling-migration-analysis.md), [Tag](../tag/rendering-and-styling-migration-analysis.md), or a native link—not a role override on **`swc-badge`**. |
| **Role** | You **do not** need a default `role` on the host. **Do not** force `role="img"` or `role="status"` for normal badges—it can confuse screen readers. |
| **Name (required)** | Every badge needs a **name** people can hear in a screen reader: text in the **default slot**, and/or **`aria-label`** / **`aria-labelledby`** on the element. |
| **Icon only** | If there is **no visible text**, set **`aria-label`** on the badge (or give the icon a proper **name**). Otherwise the badge has **no name** (fails WCAG). |
| **Decorative icon** | If the icon repeats the same idea as the text, hide it from assistive tech (**`aria-hidden="true"`** on the icon side). Follow **`swc-icon`** / Storybook docs. |
| **Icon that carries meaning alone** | The icon needs **`role="img"`** and a short **label**, or the **host** needs **`aria-label`**. |
| **`variant`, `size`, `subtle`, `outline`, `fixed`** | These are **visual only**. Do **not** auto-map them to things like `aria-invalid` or live regions. The **words** on the badge carry meaning; color is **extra**. |
| **Docs** | Do **not** say **`variant`** adds ARIA by itself unless code really does that. Say the badge is **not interactive**. Do **not** list **Tab / Space / Enter** as normal badge keys. For real actions, use [Action Button](../action-button/rendering-and-styling-migration-analysis.md) or [Tag](../tag/rendering-and-styling-migration-analysis.md). |

### Shadow DOM and cross-root ARIA Issues

None

### Accessibility tree expectations

**Badge with text**

- Screen readers should hear the **same text** as the visible label (from the default slot).

**Badge with icon + text**

- Name usually mixes **text + icon label** (or **`aria-label`** on the host if you use it), unless the icon is decorative.

**Icon-only badge** (use only when space is very tight)

- There **must** be a name from **`aria-label`** or a labeled icon. Tests should check that this name **shows up** in snapshots.

**Where it sits in the page**

- The badge sits **inside** its parent (row, card, cell). It is **not** its own page region unless the app wraps it that way on purpose.

### Keyboard and focus

**Not focusable.** Keyboard navigation should skip this component and move to the next focusable element.

---

## Testing

### Automated tests

| Kind of test | What to check |
|--------------|----------------|
| **Unit** | Host is **not** focusable by default. Stories with labels have **slot text** (or another name). |
| **aXe + Storybook** | Run **WCAG 2.x** rules on badge stories (same pipeline as other 2nd-gen components). |
| **Playwright ARIA snapshots** | Keep **`badge.a11y.spec.ts`** up to date. Cover **text-only**, **icon + text**, and **icon-only** when those stories are stable. |
| **Color contrast** | Run **color-contrast** checks on semantic and non-semantic variant stories. |

---

## Summary checklist

- [ ] Stories use **real labels** (“Error,” “Engineering,” “on hold”), not **token names** (“celery,” “positive,” “informative”) as the only text.
- [ ] The badge stays **non-interactive** (no focus, no fake button behavior).
- [ ] **Icon-only** use is documented; **`aria-label`** (or labeled icon) is required. Storybook **Accessibility** story shows this.
- [ ] Docs do **not** claim **`variant`** sets ARIA unless code does.
- [ ] The **accessibility tree** shows label **text** (or **`aria-label`** / icon label) where needed; check snapshots or tools.
- [ ] **Dev mode** warns when badge has **no** accessible name (optional but recommended).
- [ ] **ARIA snapshot** tests cover main badge stories.
- [ ] **Unit tests** prove the badge is **not** in the **Tab** order by default.
- [ ] **aXe** (WCAG 2.x tags) runs on badge stories.

---

## References

- [WAI-ARIA 1.2](https://www.w3.org/TR/wai-aria-1.2/)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [Using ARIA (read this first)](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/)
- [Badge migration roadmap](./rendering-and-styling-migration-analysis.md)
