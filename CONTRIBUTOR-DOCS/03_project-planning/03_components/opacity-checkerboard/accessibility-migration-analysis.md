<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Opacity Checkerboard / Opacity checkerboard accessibility migration analysis

<!-- Document title (editable) -->

# Opacity checkerboard accessibility migration analysis

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Overview](#overview)
    - [Also read](#also-read)
    - [What the shared style is](#what-the-shared-style-is)
    - [When to use something else](#when-to-use-something-else)
    - [What it is not](#what-it-is-not)
- [ARIA and WCAG context](#aria-and-wcag-context)
    - [Pattern in the APG](#pattern-in-the-apg)
    - [Guidelines that apply](#guidelines-that-apply)
- [Related 1st-gen accessibility (Jira)](#related-1st-gen-accessibility-jira)
- [Recommendations: opacity checkerboard shared style](#recommendations-opacity-checkerboard-shared-style)
    - [ARIA roles, states, and properties](#aria-roles-states-and-properties)
    - [Shadow DOM and cross-root ARIA Issues](#shadow-dom-and-cross-root-aria-issues)
    - [Accessibility tree expectations](#accessibility-tree-expectations)
    - [Assistive technology and live regions](#assistive-technology-and-live-regions)
    - [Keyboard and focus](#keyboard-and-focus)
- [Known 1st-gen consumer patterns](#known-1st-gen-consumer-patterns)
- [Testing](#testing)
    - [Automated tests](#automated-tests)
    - [Manual screen reader testing](#manual-screen-reader-testing)
- [Summary checklist](#summary-checklist)
- [References](#references)

</details>

<!-- Document content (editable) -->

## Overview

This doc explains how the **opacity checkerboard shared style** should work for **accessibility** in 2nd-gen. It supports **WCAG 2.2 Level AA** as the team target. The checkerboard is **not** implemented as a custom element; it ships as an importable Lit **`css`** fragment (class **`.swc-opacity-checkerboard`**) under `2nd-gen/packages/swc/stylesheets/_lit-styles/`. **Consumer documentation** for components that use the pattern must carry the guidance in this doc; the utility itself has **no** ARIA surface.

### Also read

- [Opacity Checkerboard migration plan](./migration-plan.md) for deliverable form, token mapping, and deprecation of the 1st-gen npm package.
- [Opacity Checkerboard migration roadmap](./rendering-and-styling-migration-analysis.md) for CSS structure and token names.
- [Color loupe accessibility migration analysis](../color-loupe/accessibility-migration-analysis.md) for a consumer that inlines the same pattern today.
- [1st-gen README](../../../../1st-gen/tools/opacity-checkerboard/README.md) for existing consumer-facing examples (to be aligned with this doc in 2nd-gen).

### What the shared style is

- A **decorative** **checkerboard background** that helps **sighted users** see **transparency** or **partial opacity** behind a color swatch, loupe, slider track, or similar surface.
- Applied by adding **`.swc-opacity-checkerboard`** (2nd-gen) or **`.opacity-checkerboard`** (1st-gen) to an element inside a **consumer component's shadow root**, after importing the shared **`css`** fragment into that component's **`styles`** array.
- **Pure CSS**: no JavaScript, no custom element, **no Tab stop**, and **no default role or accessible name**.

### When to use something else

- When the UI must **convey opacity only to assistive technologies**, use **text**, **`aria-label`**, **`aria-valuetext`**, or a **labeled control** on the **interactive parent** (for example a color field, slider, or swatch), not the checkerboard pattern alone.
- When the surface is **interactive**, put **keyboard** and **naming** on the **real control** (`button`, `input[type=range]`, etc.); use the checkerboard only as **background** decoration inside that control's layout.

### What it is not

- **Not a component:** there is no **`<swc-opacity-checkerboard>`** (and no **`sp-opacity-checkerboard`** in 1st-gen).
- **Not semantic content:** the pattern does **not** communicate opacity to screen readers; it must **not** be the **only** cue for transparency.
- **Not focusable:** the checkerboard layer is **never** a keyboard target; Tab order belongs to **surrounding** or **parent** controls only.

---

## ARIA and WCAG context

### Pattern in the APG

- The [APG](https://www.w3.org/WAI/ARIA/apg/) does **not** define an “opacity checkerboard” widget. Treat the pattern as **decorative supporting UI** for **color** and **opacity** workflows. Accessibility is owned by the **consumer component** or **author markup** (labels, values, live updates), following [Using ARIA (read this first)](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/): **no ARIA** is better than **redundant** or **misleading** ARIA on purely visual chrome.

### Guidelines that apply

| Idea | Plain meaning |
| --- | --- |
| [Non-text content (WCAG 1.1.1)](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content) | The checkerboard is **decorative** when **equivalent** **opacity** and **color** information is available in **text** or on a **named control**. Hide the decorative layer from assistive technologies when it would add noise. |
| [Use of color (WCAG 1.4.1)](https://www.w3.org/TR/WCAG22/#use-of-color) | **Transparency** must **not** rely on the checkerboard **alone**. Pair the pattern with **labels**, **values**, or **instructions** that state opacity explicitly (for example “50% opacity” or a localized **`aria-valuetext`**). |
| [Name, role, value (WCAG 4.1.2)](https://www.w3.org/TR/WCAG22/#name-role-value) | The **utility** sets **no** role or name. The **consumer** must expose **name**, **role**, and **value** on the **focusable** or **semantic** element (swatch button, range input, color field, etc.). |
| [Non-text contrast (WCAG 1.4.11)](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast) | Where the checkerboard squares are **required** to **perceive** UI boundaries, square **contrast** against adjacent UI may matter for **sighted** users. This is separate from **screen reader** exposure. |
| [Forced colors](https://www.w3.org/TR/WCAG22/#contrast-minimum) / `forced-colors` | The shared style keeps **`forced-color-adjust: none`** under **`@media (forced-colors: active)`** so the pattern stays **visible** in high-contrast mode. That is **intentional** for color tools; consumers should still **not** treat the pattern as **semantic** information for assistive technologies. |

**Bottom line:** The checkerboard is **visual-only**. **Consumer docs** must tell authors to **name** and **value** the **control**, hide **decorative** checkerboard nodes from the accessibility tree when appropriate, and **never** expect keyboard users to “focus” the pattern itself.

---

## Related 1st-gen accessibility (Jira)

| Jira | Type | Status (snapshot) | Resolution (snapshot) | Summary |
| --- | --- | --- | --- | --- |
| — | — | — | — | *No 1st-gen issues filed specifically against the opacity-checkerboard CSS utility in this snapshot.* |

---

## Recommendations: opacity checkerboard shared style

These recommendations apply to **2nd-gen consumer documentation** and to **SWC components** that import **`opacityCheckerboardStyles`**. The shared **`css`** fragment itself must **not** inject ARIA or roles.

### ARIA roles, states, and properties

| Topic | What to do |
| --- | --- |
| **No role on the utility** | **`.swc-opacity-checkerboard`** is **not** a widget. Do **not** assign **`role="img"`**, **`role="presentation"`**, or other roles **in the shared CSS**. Consumers choose markup per context (see **Known 1st-gen consumer patterns**). |
| **Hide decorative layers** | When the checkerboard element is **only** a background and carries **no** interactive children, set **`aria-hidden="true"`** on **that element** (or ensure it is not exposed as meaningful content). |
| **Do not hide meaningful descendants** | **Never** put **`aria-hidden="true"`** on a **wrapper** that also contains **slotted** or **interactive** content unless **every** descendant is decorative. **`aria-hidden`** on a parent **suppresses** **all** descendants in the accessibility tree. |
| **`role="presentation"`** | Acceptable on a **non-interactive background** **inside** a larger control when the **parent** owns semantics (see **`sp-color-slider`**). Prefer **`aria-hidden="true"`** on a **dedicated decorative layer** when the overlay is also visual-only. |
| **Accessible name and opacity** | The **consumer** must expose **color** and **opacity** in **human-readable** text: **`aria-label`**, visible **label**, **`aria-valuetext`**, or **`aria-labelledby`**. Do **not** use raw **`rgba(...)`** strings as the **only** name when a **percentage** or **plain-language** opacity string is clearer. |
| **Consumer documentation** | Every SWC doc that shows **`.swc-opacity-checkerboard`** must include an **Accessibility** subsection summarizing: decorative pattern, **not focusable**, hide from AT when appropriate, convey opacity **textually**, and **live region** guidance below. Link to this analysis from the migration plan and internal Storybook host page. |

### Shadow DOM and cross-root ARIA Issues

None

The utility is **CSS only**. Cross-root **`aria-labelledby`** / **`aria-describedby`** concerns belong to **consumer components** that host the pattern in **shadow DOM** and reference **light DOM** IDs; plan those in each component's accessibility migration analysis, not here.

### Accessibility tree expectations

#### Standalone decorative layer

- An empty **`<div class="swc-opacity-checkerboard" aria-hidden="true">`** (or equivalent) should **not** appear as a **named** or **focusable** node. Assistive technologies should **ignore** it when **`aria-hidden="true"`** is set.

#### Background inside an interactive control

- Example: **swatch**, **color slider**, **thumbnail** preview. The **host** or **inner control** (`button`, `input`) carries **role**, **name**, and **state**. The checkerboard **background** should **not** introduce a **second** **Tab stop** or **duplicate** **name**.

#### Dynamic opacity

- When opacity **changes**, the **value** on the **control** (or associated **text**) should update. The checkerboard **visual** may change with **no** corresponding **AT** announcement unless the **consumer** intentionally updates **`aria-valuetext`**, a **visible label**, or a **live region** (see next subsection).

### Assistive technology and live regions

| Topic | What to do |
| --- | --- |
| **Prefer control semantics** | For sliders and fields, update **`aria-valuetext`** or the **visible value** on the **control** before adding **`aria-live`**. |
| **`aria-live="polite"`** | Use **only** when opacity changes **dynamically** and no **control** already announces the value. **Polite** is **rare**; several **live** regions updating together become **noisy**. |
| **`aria-live="assertive"`** | **Do not** recommend for **routine** opacity updates or **loading**-style feedback. |
| **Docs examples** | Align 1st-gen README examples with this policy: replace **`assertive`** demos with **`polite`** or **control-native** value updates where possible. |

### Keyboard and focus

**Not focusable.** Keyboard navigation should skip this component and move to the next focusable element.

The checkerboard **shared style** does **not** create a focus target. Consumers must **not** add **`tabindex`** to a node that **only** shows the pattern. **Tab** order and **activation** (**Enter** / **Space**, arrow keys, etc.) stay on the **parent** **widget**.

---

## Known 1st-gen consumer patterns

Use these as **reference** when writing **2nd-gen consumer docs**; verify each against the real 2nd-gen source when that component migrates.

| Consumer | Pattern | Accessibility note |
| --- | --- | --- |
| **`sp-color-slider`** | **`role="presentation"`** on the checkerboard container; **`aria-label`** on the internal **`input[type=range]`** | Good split: decoration vs **named** control. |
| **`sp-swatch`** | Checkerboard on inner **`div`**; **`role="button"`** and **`aria-label`** on **host** | Authors should supply **`label`** that includes **opacity** when transparency matters; raw **`color`** fallback may be unclear. |
| **`sp-color-loupe`** | Checkerboard **`div`** without **`aria-hidden`**; **`aria-hidden="true"`** on **SVG** | Loupe is **decorative**; **color field** / **picker** owns **name** and **value** ([Color loupe accessibility migration analysis](../color-loupe/accessibility-migration-analysis.md)). |
| **`sp-thumbnail`** | Checkerboard wrapper around **slotted** **`<img>`** | **Alt text** on the **image** (or **`alt=""`** when decorative) is **author** responsibility; do **not** **`aria-hidden`** the wrapper if it would hide the **image**. |
| **`sp-color-handle`** | Checkerboard applied to **`:host`** via **`is-opacity-checkerboard.css`** | Handle is **focusable**; checkerboard is **background** on the **same** element that receives **focus**. |

---

## Testing

### Automated tests

| Kind of test | What to check |
| --- | --- |
| **Unit (consumers)** | Parent control keeps **correct** **name** / **value** when checkerboard is present; **no** extra **focusable** node for the pattern alone. |
| **Shared style** | **No** ARIA or roles in the **`css`** fragment; **`forced-color-adjust: none`** retained under **`forced-colors`**. |
| **aXe + Storybook** | Run on **composite** stories (checkerboard **inside** swatch, slider, loupe, etc.), not an isolated pattern frame **without** a labeled control. |
| **Dedicated a11y spec for the utility** | **Not required** (no interactive element). If an **internal** Storybook host demo exists, mark the demo checkerboard **`aria-hidden="true"`** and document that the host is **non-semantic**. |
| **VRT** | Pattern at **small** / **medium** sizes, **light** / **dark** theme, and **`forced-colors`**. |

### Manual screen reader testing

The checkerboard is **not** in the **Tab** order, so you will not reach it the same way as **focusable** **controls** when a **screen reader** is in **forms** or **application**-style **focus** **navigation**. Use **browse mode** (document or scan mode) to read the page in **content order** and confirm the checkerboard **does not** add spurious **names** or **roles**, and that the **paired control** announces **color** and **opacity** correctly. See the 2nd-gen Storybook [Screen reader testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/screen_reader_testing.mdx) guide, including **Browse mode (document/scan mode)**.

---

## Summary checklist

- [ ] **Migration plan** and **consumer docs** state the utility is **CSS-only**, **not focusable**, and **not** a custom element.
- [ ] **Consumer documentation** includes **Accessibility**: decorative pattern, **`aria-hidden`** / **`role="presentation"`** guidance, **textual opacity**, and **live region** policy (**no** **`assertive`** for routine updates).
- [ ] **Shared `css` fragment** sets **no** roles or ARIA; **`forced-color-adjust: none`** under **`forced-colors`** is documented as intentional.
- [ ] **Examples** do **not** put **`aria-hidden="true"`** on wrappers that contain **meaningful** or **interactive** descendants.
- [ ] **Swatch**, **slider**, **loupe**, **thumbnail**, and **color-handle** docs (when migrated) link here and show **realistic** **labeled** usage.
- [ ] **Manual SR testing** uses **browse mode** per the [Screen reader testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/screen_reader_testing.mdx) guide.
- [ ] **1st-gen README** **`aria-live="assertive"`** example is revised to match this doc (or removed).

---

## References

- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [Using ARIA (read this first)](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/)
- [WCAG 2.2 Success Criterion 1.1.1: Non-text content (understanding)](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content)
- [WCAG 2.2 Success Criterion 1.4.1: Use of color](https://www.w3.org/TR/WCAG22/#use-of-color)
- [Opacity Checkerboard migration plan](./migration-plan.md)
- [Opacity Checkerboard migration roadmap](./rendering-and-styling-migration-analysis.md)
- [1st-gen opacity-checkerboard README](../../../../1st-gen/tools/opacity-checkerboard/README.md)
- [Tools vs packages: where code lives](../../../../CONTRIBUTOR-DOCS/01_contributor-guides/12_tools-vs-packages.md)
- 2nd-gen Storybook: [Screen reader testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/screen_reader_testing.mdx)
