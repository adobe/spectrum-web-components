<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Progress Bar / Progress bar accessibility migration analysis

<!-- Document title (editable) -->

# Progress bar accessibility migration analysis

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Overview](#overview)
    - [Also read](#also-read)
    - [What it is](#what-it-is)
    - [What it is not](#what-it-is-not)
    - [Related](#related)
- [ARIA and WCAG context](#aria-and-wcag-context)
    - [Pattern in the APG](#pattern-in-the-apg)
    - [Guidelines that apply](#guidelines-that-apply)
- [Related 1st-gen accessibility (Jira)](#related-1st-gen-accessibility-jira)
- [Recommendations: `<swc-progress-bar>`](#recommendations-swc-progress-bar)
    - [ARIA roles, states, and properties](#aria-roles-states-and-properties)
    - [Shadow DOM and cross-root ARIA Issues](#shadow-dom-and-cross-root-aria-issues)
    - [Accessibility tree expectations](#accessibility-tree-expectations)
    - [Keyboard and focus](#keyboard-and-focus)
- [Known 1st-gen issues](#known-1st-gen-issues)
    - [Non-text contrast at 0% (WCAG 1.4.11)](#non-text-contrast-at-0-wcag-1411)
    - [Developer warning copy](#developer-warning-copy)
- [Testing](#testing)
    - [Automated tests](#automated-tests)
- [Summary checklist](#summary-checklist)
- [References](#references)

</details>

<!-- Document content (editable) -->

## Overview

This doc explains how **`swc-progress-bar`** should work for **accessibility**. It supports **WCAG 2.2 Level AA**. Until **`swc-progress-bar`** ships, treat **`1st-gen/packages/progress-bar/src/ProgressBar.ts`** (`<sp-progress-bar>`) as the primary reference for behavior; align 2nd-gen with this doc and the [progress bar migration roadmap](./rendering-and-styling-migration-analysis.md).

### Also read

[Progress bar migration roadmap](./rendering-and-styling-migration-analysis.md).

### What it is

- A **horizontal bar** with a **track** and **fill** that shows **progress** (0–100) or an **indeterminate** loading animation.
- It is **read-only**: the user does **not** adjust the value with the keyboard inside this component.

### What it is not

- A **meter** showing a scalar measurement (for example disk usage)—see [Meter migration roadmap](../meter/rendering-and-styling-migration-analysis.md).
- The **small spinner** inside a **button** or **field** pending state—use an **icon** pattern there, not a full progress bar.

### Related

- **Circular** progress → [Progress circle accessibility migration analysis](../progress-circle/accessibility-migration-analysis.md) and [migration roadmap](../progress-circle/rendering-and-styling-migration-analysis.md).

---

## ARIA and WCAG context

### Pattern in the APG

- The [progress bar pattern](https://www.w3.org/WAI/ARIA/apg/patterns/progressbar/) applies: **`role="progressbar"`**, **accessible name**, **values** when **determinate**, **no** spurious value attributes when **indeterminate**, and **not** in the **Tab** order for the default **read-only** bar.

### Guidelines that apply

| Idea | Plain meaning |
|------|----------------|
| [`progressbar` role](https://www.w3.org/TR/wai-aria-1.2/#progressbar) | Needs a **name**. When **determinate**, expose **min**, **max**, **current value**, and **spoken text** (for example a localized **percent** string). When **indeterminate**, **omit** min, max, now, and valuetext so assistive tech treats the task as **busy** / unknown length. |
| [Non-text content (WCAG 1.1.1)](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html) | **Track** and **fill** live in **shadow DOM** for **`swc-progress-bar`**. The **host** should own **`role`** and **ARIA values**; inner nodes are **visual** unless a separate spec adds more. |
| [Use of color (WCAG 1.4.1)](https://www.w3.org/TR/WCAG22/#use-of-color) | Do not rely on **fill color alone**. **Values**, **label**, and visible **percentage** (when present) carry meaning. |
| [Non-text contrast (WCAG 1.4.11)](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast) | **Track** and **fill** are **graphical objects** and need **at least 3:1** with **adjacent** colors. At **0%**, the **fill** may have **no width**—if only a faint **track** shows, the bar can fail this criterion. Test **`static-color`**, photos, and **thin** bars carefully. |
| [Pause, stop, hide (WCAG 2.2.2)](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html) | **Indeterminate** motion on the **fill** must meet WCAG expectations. Respect **reduced motion** where supported. Align **Spectrum motion tokens** across libraries where applicable; document **fallback** if **flicker** is a risk. |

**Bottom line:** Ship a **non-focusable** **`progressbar`** with **determinate** vs **indeterminate** rules consistent with **`swc-progress-circle`** and **`ProgressBar.ts`**, verified in **`swc-progress-bar`** once implemented.

---

## Related 1st-gen accessibility (Jira)

| Jira | Type | Status (snapshot) | Resolution (snapshot) | Summary |
|------|------|-------------------|-------------------------|---------|
| [SWC-1122](https://jira.corp.adobe.com/browse/SWC-1122) | Bug | Done | Fixed | [Accessibility] - Progress bar: Progress bar is missing appropriate role and/or attributes - sp-progress-bar (updating progress bar) |

---

## Recommendations: `<swc-progress-bar>`

### ARIA roles, states, and properties

| Topic | What to do |
|-------|------------|
| **`role="progressbar"`** | **Prescribed** and **fixed** on the **host**. It must **not** be author-overridable in implementation or docs. If another role is needed, use a **different** component or pattern—not a role change on **`swc-progress-bar`**. This element satisfies **one** semantic role only. |
| **Name (required)** | Provide a **name** via **`label`**, **default slot** text, **`aria-label`**, or **`aria-labelledby`** ([WCAG 4.1.2](https://www.w3.org/TR/WCAG22/#name-role-value)). Prefer **`aria-labelledby`** when a **visible** label exists; use **`aria-label`** when it does not. Keep **dev-mode** warnings accurate for **`swc-progress-bar`** (1st-gen’s warning text incorrectly references **progress-circle** in one bullet—fix in 2nd-gen). |
| **Known percent** (`indeterminate` = false) | Set **`aria-valuemin="0"`**, **`aria-valuemax="100"`**, **`aria-valuenow`** = **`progress`**, **`aria-valuetext`** = **localized** percent string. Update when **`progress`** or locale changes. |
| **0% appearance ([WCAG 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast))** | When **`progress`** is **0**, show a **small** visible **fill** width (or another treatment that keeps **track** / **fill** details at **at least 3:1** with adjacent colors). A **fully invisible** fill with a **weak** track often fails **non-text contrast**. **`aria-valuenow`**, **`aria-valuetext`**, and visible **percent** must still read as **0%**. |
| **Unknown time** (`indeterminate` = true) | **Remove** min, max, now, and valuetext. |
| **`label` vs slot** | If slot text **mirrors** **`label`**, document **one** clear naming path. **Default** copy can be generic (“Loading”); prefer **specific** labels when context is known (“Uploading document,” “Saving project”). |
| **`side-label` / `size` / `static-color`** | **Visual layout** only—no required ARIA mapping beyond what implementation already sets. |
| **Motion / animation** | Meet **[WCAG 2.2.2](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html)** for **indeterminate** (and any) **fill** animation. Follow **reduced-motion** rules. Align **Spectrum** motion tokens where applicable; document **flicker** fallbacks. |
| **Docs** | Say **read-only**: **no Tab stop**, **no arrow keys** to change value. Warn against **over-announcing**: **never** **`aria-live="assertive"`**; use **`aria-live="polite"`** only **rarely**, especially when **multiple** components or live regions update. |

### Shadow DOM and cross-root ARIA Issues

None

### Accessibility tree expectations

#### Known percent

- **Role:** **progressbar** with a **clear name**.
- **Values:** min, max, now, valuetext as above.
- Optional **visible** **percentage** (1st-gen uses **`sp-field-label`**) should stay consistent with **`aria-valuetext`** where both are shown.

#### Busy / unknown

- **Role:** **progressbar** with a **name**, **without** numeric value attrs.

#### Good names

- Use **task-specific** language. The **percent** belongs in **value / valuetext** (and optional visible percentage), not as a substitute for **what** is loading.

### Keyboard and focus

**Not focusable.** Keyboard navigation should skip this component and move to the next focusable element.

---

## Known 1st-gen issues

Gaps in **1st-gen** **`<sp-progress-bar>`** (`1st-gen/packages/progress-bar/src/ProgressBar.ts`) that **2nd-gen** **`swc-progress-bar`** should fix or cover with regression tests.

### Non-text contrast at 0% (WCAG 1.4.11)

- At **`progress` = 0**, the **fill** is drawn with **zero** width (`transform: scaleX(calc(${this.progress} / 100))`), so only the **track** shows. If the **track** does **not** meet **at least 3:1** contrast with **adjacent** colors, the bar can **violate** [**WCAG 2.2 Success Criterion 1.4.11** (Non-text contrast, Level AA)](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast)—users with low vision may not perceive the control.
- Treat this as a **known 1st-gen** risk on many backgrounds. **2nd-gen** should follow the **0% appearance** row under **Recommendations** and validate **0%** with **contrast** tooling (including **`static-color`** and photo backgrounds).

### Developer warning copy

- The **DEBUG** missing-name warning lists **`<sp-progress-circle>`** in one **issues** bullet where it should reference **`<sp-progress-bar>`**. Correct during migration so authors get accurate guidance.

---

## Testing

### Automated tests

| Kind of test | What to check |
|--------------|----------------|
| **Unit** | **`role="progressbar"`**. **Determinate** vs **indeterminate** **ARIA** matches rules above (verify in **`swc-progress-bar`** or **`ProgressBar.ts`** during migration). Host is **not** focusable. **Name** from **`label`**, **slot**, or **`aria-label`**. |
| **aXe + Storybook** | **WCAG 2.x** on progress-bar stories (1st-gen today; 2nd-gen when migrated). |
| **Playwright ARIA snapshots** | Add or keep **`progress-bar.a11y.spec.ts`** for 2nd-gen when available; mirror **determinate**, **indeterminate**, **sizes**, and **`static-color`** coverage patterns from **progress-circle**. |
| **Contrast** | **`static-color`**, **0%**, and **indeterminate** stories. |
| **Motion / reduced motion** | **Indeterminate** animation meets **WCAG 2.2.2** and product **reduced-motion** rules. |

---

## Summary checklist

- [ ] Stories use **task-specific** labels, not **only** “Loading” or **token** names from **`size`** / **`static-color`**.
- [ ] **Determinate** stories show **min / max / now / valuetext** matching **`progress`** and locale.
- [ ] **Indeterminate** stories **omit** value attrs as required.
- [ ] Default build is **not focusable**; docs match **read-only** behavior.
- [ ] Tree / snapshots show **`progressbar`** + good **name**; **0%** and **non-text contrast** are considered.
- [ ] **Dev warning** for missing name uses the correct **element name** and issues list (**no** wrong **progress-circle** reference).
- [ ] **ARIA snapshot** (or equivalent) tests cover **determinate**, **indeterminate**, and main variants.
- [ ] **Unit tests** prove **no** **Tab** focus by default.
- [ ] **aXe** (WCAG 2.x tags) runs on progress-bar stories.
- [ ] Docs and examples **never** recommend **`aria-live="assertive"`** for loading; **`aria-live="polite"`** is **rare** only, with a warning when **many** loaders or live regions update.

---

## References

- [WAI-ARIA 1.2: progressbar](https://www.w3.org/TR/wai-aria-1.2/#progressbar)
- [APG: progress bar pattern](https://www.w3.org/WAI/ARIA/apg/patterns/progressbar/)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [WCAG 1.4.11: non-text contrast (understanding)](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast)
- [WCAG 2.2.2: pause, stop, hide (understanding)](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html)
- [Using ARIA (read this first)](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/)
- [Figma: Loading animation discovery](https://www.figma.com/design/42VzvpW262EAUbYsadO4e8/Loading-animation-discovery?node-id=478-948207&t=RVTbvK49jUbfoa0P-0)
- [Progress bar migration roadmap](./rendering-and-styling-migration-analysis.md)
- [Progress circle accessibility migration analysis](../progress-circle/accessibility-migration-analysis.md)
