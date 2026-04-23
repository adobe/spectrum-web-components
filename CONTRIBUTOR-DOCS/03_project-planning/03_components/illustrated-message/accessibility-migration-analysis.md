<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Illustrated Message / Illustrated message accessibility migration analysis

<!-- Document title (editable) -->

# Illustrated message accessibility migration analysis

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Overview](#overview)
    - [Also read](#also-read)
    - [What it is](#what-it-is)
    - [What it is not](#what-it-is-not)
- [ARIA and WCAG context](#aria-and-wcag-context)
    - [Pattern in the APG](#pattern-in-the-apg)
    - [Guidelines that apply](#guidelines-that-apply)
- [Related 1st-gen accessibility (Jira)](#related-1st-gen-accessibility-jira)
- [Recommendations: `<swc-illustrated-message>`](#recommendations-swc-illustrated-message)
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

This doc explains how **`swc-illustrated-message`** should work for **accessibility**. It supports **WCAG 2.2 Level AA**. Until **`swc-illustrated-message`** ships, use **`1st-gen/packages/illustrated-message/src/IllustratedMessage.ts`** (`<sp-illustrated-message>`) as a behavioral reference, while aligning **2nd-gen** **API** and **docs** with the decisions below.

### Also read

[Illustrated message migration roadmap](./rendering-and-styling-migration-analysis.md).

### What it is

- A **block** for **empty**, **error**, or **onboarding** states: an **illustration** (often **SVG**), a **title**, and **description** text (sometimes with **actions**).
- **2nd-gen** supplies the **title** and **description** through **slots** only—**no** string **`heading`** / **`description`** **attributes** as fallbacks in the slot (see **Recommendations** and [PR #6150 discussion](https://github.com/adobe/spectrum-web-components/pull/6150#discussion_r3047502294)).

### What it is not

- **Not** a **dialog** or **alertdialog** by itself unless a **separate** spec wraps it that way.
- **Not** a substitute for **page**-level **`h1`**—keep **one** top-level heading per view where that pattern applies.

---

## ARIA and WCAG context

### Pattern in the APG

- The APG does **not** define an “illustrated message” widget. Treat it as **structured content**: **heading**, **text**, optional **links** in the description, optional **buttons** in an **actions** area, and a usually **decorative** illustration.

### Guidelines that apply

| Idea | Plain meaning |
|------|----------------|
| [Info and relationships (WCAG 1.3.1)](https://www.w3.org/TR/WCAG22/#info-and-relationships) | The **programmatic** heading level must match the **document** outline. Avoid a second **`h1`** inside this pattern unless the product shell intentionally nests it—typically the block uses **`h2`–`h6`** per **`heading-level`** (or equivalent) from the host. |
| [Headings and labels (WCAG 2.4.6)](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels.html) | The **title** should describe **purpose**; the **description** should add **useful** detail. |
| [Non-text content (WCAG 1.1.1)](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content) | If the **illustration** is **decorative**, hide it from assistive tech (**`aria-hidden="true"`** on the **SVG** or equivalent). If it **conveys** information not in the **heading** / **description**, give it a **short** accessible **name**. |
| [Name, role, value (WCAG 4.1.2)](https://www.w3.org/TR/WCAG22/#name-role-value) | **Action** **buttons** and **links** in the **description** or **actions** region need **discernible** **names**. |

**Bottom line:** Authors choose **`heading-level`** (or the implementation maps **`h2`–`h6`**) to match the page. **2nd-gen** puts **title** and **body** copy in **slots** only; see [PR #6150 discussion](https://github.com/adobe/spectrum-web-components/pull/6150#discussion_r3047502294).

---

## Related 1st-gen accessibility (Jira)

| Jira | Type | Status (snapshot) | Resolution (snapshot) | Summary |
|------|------|-------------------|-------------------------|---------|

---

## Recommendations: `<swc-illustrated-message>`

### ARIA roles, states, and properties

| Topic | What to do |
|-------|------------|
| **Heading and description content (2nd-gen)** | Provide **title** and **description** **only** via **`slot="heading"`** and **`slot="description"`**. **Do not** rely on **reflecting** **`heading`** or **`description`** **string properties** as **default slot content** the way **1st-gen** **`<sp-illustrated-message>`** could—those **attribute** fallbacks are **removed** in **2nd-gen** to **sever the 1st-gen dependency**. This matches maintainer direction ([discussion with @5t3ph](https://github.com/adobe/spectrum-web-components/pull/6150#discussion_r3047502294)); further API tweaks remain **open to discussion** in that thread. |
| **Heading level** | Expose a **real** heading in shadow DOM (**`h2`–`h6`**) from **`heading-level`** (or the agreed property). **Do not** accept **`heading-level="1"`** / **`h1`** for this block—the **page** (or **dialog** title) should own **`h1`**. |
| **Illustration** | Prefer **`aria-hidden="true"`** on **decorative** **SVG**s. If the graphic is **meaningful**, use **`role="img"`** and **`aria-label`** (or **visible** text that names it). |
| **Actions** | **Buttons** or **links** in an **actions** slot must keep **visible** **text** or **`aria-label`** as required by **WCAG**. |
| **Docs** | Examples should **only** show **slotted** **heading** and **description** for **2nd-gen**; **do not** teach **`heading="..."`** / **`description="..."`** as an alternative **content** API. |

### Shadow DOM and cross-root ARIA Issues

None for a minimal implementation if **slots** carry **light-DOM** **links** / **buttons** with **native** semantics. If **IDs** for **`aria-labelledby`** must point across roots, document the **pattern** (or prefer **slots** that **project** into shadow **heading** / **description** wrappers).

### Accessibility tree expectations

- Users hear a **heading** at the **chosen** level and the **description** content.
- **Decorative** **illustration** does **not** add **noise** to the **tree**.
- **Actions** are **real** **controls** with **names**.

### Keyboard and focus

- The **illustrated message** host is **not** a single **tab stop** by default; **Tab** moves among **focusable** **children** (**buttons**, **links**, etc.) in **document** order.

---

## Testing

### Automated tests

| Kind of test | What to check |
|--------------|----------------|
| **Unit** | **Heading** tag matches **`heading-level`**; **no** **`h1`** when disallowed; **SVG** **`aria-hidden`** (or **img** **name**) matches **decorative** vs **informative** stories. |
| **aXe + Storybook** | **WCAG 2.x** on **overview** and **empty-state**-style stories with **slotted** **heading** / **description**. |
| **Playwright ARIA snapshots** | **Heading** **role** / **level** and **description** text; **actions** **names** when present. |

---

## Summary checklist

- [ ] **2nd-gen** **docs** and **stories** use **slots** for **heading** and **description** **only**—**no** **`heading`** / **`description`** **attribute** fallbacks as the **content** API ([PR #6150](https://github.com/adobe/spectrum-web-components/pull/6150#discussion_r3047502294)).
- [ ] **Heading level** is **correct** for the page; **no** **`h1`** inside the component when the pattern forbids it.
- [ ] **Illustration** is **decorative** (**`aria-hidden`**) or **named** when it carries **meaning**.
- [ ] **Actions** and **inline** **links** in **description** are **labeled**.
- [ ] **Snapshots** / **aXe** cover representative **stories**.

---

## References

- [WAI-ARIA 1.2](https://www.w3.org/TR/wai-aria-1.2/)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [Using ARIA (read this first)](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/)
- [Illustrated message migration roadmap](./rendering-and-styling-migration-analysis.md)
- [PR #6150 — illustrated message: file structure and initial API (discussion: slots vs heading attributes)](https://github.com/adobe/spectrum-web-components/pull/6150#discussion_r3047502294)
