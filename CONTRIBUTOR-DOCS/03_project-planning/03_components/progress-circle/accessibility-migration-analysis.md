<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Progress Circle / Progress circle accessibility migration analysis

<!-- Document title (editable) -->

# Progress circle accessibility migration analysis

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
- [Recommendations: `<swc-progress-circle>`](#recommendations-swc-progress-circle)
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

This doc explains how **`swc-progress-circle`** should work for **accessibility**. It supports **WCAG 2.2 Level AA**.

### Also read

[Progress circle migration roadmap](./rendering-and-styling-migration-analysis.md).

### What it is

- A **circle** that shows **progress** (0–100) or a **busy** animation when the time to finish is unknown.
- It is **read-only**: the user does **not** type or arrow-key a value here.

### What it is not

- The **spinning progress icon** that is shown in a button or input in its pending state. That should be an icon instead.

### Related

- **Straight bar** progress → [Progress bar migration roadmap](../progress-bar/rendering-and-styling-migration-analysis.md). (A matching a11y doc may be added later.)

---

## ARIA and WCAG context

### Pattern in the APG

- The [progress bar pattern](https://www.w3.org/WAI/ARIA/apg/patterns/progressbar/) fits **read-only** progress: right **role**, **values**, **name**, and **not** in the **Tab** order unless you build something special.

### Guidelines that apply

| Idea | Plain meaning |
|------|----------------|
| [`progressbar` role](https://www.w3.org/TR/wai-aria-1.2/#progressbar) | Needs a **name**. When you know the percent, expose **min**, **max**, **current value**, and **spoken text** (e.g. “45%”). When you **don’t** know the percent (**indeterminate**), **drop** the value attributes (see `ProgressCircleBase` in the repo). |
| [Non-text content (WCAG 1.1.1)](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html) | The **SVG** ring should not fight the host **`progressbar`**. Usually the **host** holds the name and values; inner shapes are **visual**. |
| [Use of color (WCAG 1.4.1)](https://www.w3.org/TR/WCAG22/#use-of-color) | Do not rely on **ring color alone**. **Values** and **label** carry the state. |
| [Non-text contrast (WCAG 1.4.11)](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast) | Meaningful parts of the **ring** are **graphical objects** and need **at least 3:1** contrast with **adjacent** colors. At **0%** progress, the **empty track** is often the only visible ring detail—if it **does not** contrast enough with the **background**, the control can fail this criterion. Test **`static-color`**, photos, and **thin** strokes carefully. |
| [Pause, stop, hide (WCAG 2.2.2)](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html) | **Loading animation** (including **indeterminate** spin) must be **perceivable** and controllable per WCAG. Respect **reduced motion** where the platform supports it. Align **motion tokens** with Spectrum guidance across libraries where applicable (for example internal targets such as **~1s** vs **~2s** per revolution for spinner tokens). If **flicker** is a risk, define **fallback** behavior in design and docs. |

**Bottom line:** Ship a **non-focusable** **`progressbar`** with the **determinate** vs **indeterminate** rules in **`ProgressCircleBase`** (`2nd-gen/packages/core/components/progress-circle/ProgressCircle.base.ts`).

---

## Related 1st-gen accessibility (Jira)

| Jira | Type | Status (snapshot) | Resolution (snapshot) | Summary |
|------|------|-------------------|-------------------------|---------|
| [SWC-1125](https://jira.corp.adobe.com/browse/SWC-1125) | Bug | Blocked | Unresolved | [Accessibility] Graphical object lacks 3:1 contrast ratio — `sp-progress-circle` (progress bar and loading indicator) |
| [SWC-1171](https://jira.corp.adobe.com/browse/SWC-1171) | Bug | Done | Fixed | [Accessibility] ARIA `progressbar` nodes do not have an accessible name — `sp-picker` (loading indicator) |
| [SWC-1369](https://jira.corp.adobe.com/browse/SWC-1369) | Bug | To Do | Unresolved | `Pending` button not visible in WHCM |

---

## Recommendations: `<swc-progress-circle>`

### ARIA roles, states, and properties

| Topic | What to do |
|-------|------------|
| **`role="progressbar"`** | **Prescribed** and **fixed** on the **host**. It must **not** be author-overridable in implementation or docs. If another role is needed, use a **different** component or pattern—not a role change on **`swc-progress-circle`**. This element satisfies **one** semantic role only. |
| **Name (required)** | Supply **`label`**, **slot text**, **`aria-label`**, or **`aria-labelledby`** ([WCAG 4.1.2](https://www.w3.org/TR/WCAG22/#name-role-value)). Prefer **`aria-labelledby`** when a **visible** label exists; use **`aria-label`** for a short programmatic name when it does not. If not label is given, set default label to "Loading", and include a dev mode warning. The **dev warning** in the base lists these—keep its wording correct for **`swc-progress-circle`** (not only old tag names). |
| **Known percent** (`indeterminate` = false) | Set **`aria-valuemin="0"`**, **`aria-valuemax="100"`**, **`aria-valuenow`** = **`progress`**, **`aria-valuetext`** = **localized** percent string (`formatProgress()`). Update when **`progress`** or language changes. |
| **0% appearance ([WCAG 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast))** | When **`progress`** is **0**, show a **small** filled segment of the circle (or another treatment that keeps **graphical** ring details at **at least 3:1** with adjacent colors). A **fully empty** ring at **0%** often fails **non-text contrast** because the **track** alone is too weak against the background. **`aria-valuenow`**, **`aria-valuetext`**, and any visible **percent** must still read as **0%**—the minimum fill is for **perception**, not to misstate the value. |
| **Unknown time** (`indeterminate` = true) | **Remove** min, max, now, and valuetext so assistive tech treats it as **busy** / unknown length. |
| **`label` vs slot** | Slot change can **copy** into **`label`**. Docs should say: pick **one** clear naming path. **Default** copy (“Loading”) should be applied when no label is given, but component should be given a label that is **as specific as possible** when context is known (“Uploading document,” “Loading status checks”). |
| **`size` / `static-color`** | **Looks only**—no required ARIA mapping. |
| **Motion / animation** | Meet **[WCAG 2.2.2](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html)** for **determinate** and **indeterminate** loading animation. Follow team **reduced-motion** rules. Align **Spectrum motion tokens** across libraries where applicable (for example **~1s** vs **~2s** per revolution for spinner tokens). If **flicker** is a risk, document **fallback** behavior in design and docs. |
| **Docs** | Say **read-only**: **no Tab stop**, **no arrow keys** to change value; distinct from a progress icon for a button in pending state. Warn against **over-announcing**: **never** **`aria-live="assertive"`**; use **`aria-live="polite"`** only **rarely**, especially when **multiple** components or live regions update. |

### Shadow DOM and cross-root ARIA Issues

None

### Accessibility tree expectations

#### Known percent

- **Role:** **progressbar** with a **clear name** (label / slot / `aria-label` / `aria-labelledby`).
- **Values:** min, max, now, valuetext as above.

#### Busy / unknown

- **Role:** **progressbar** with a **name**, **without** numeric value attrs (per implementation).

#### Good names

- Use **specific** phrases: “Uploading document,” “Processing request.” Avoid **only** “Loading” when you can be clearer. The **percent** belongs in **value / valuetext**, not as a substitute for **what** is happening.

### Keyboard and focus

**Not focusable.** Keyboard navigation should skip this component and move to the next focusable element.

---

## Testing

### Automated tests

| Kind of test | What to check |
|--------------|----------------|
| **Unit** | **`role="progressbar"`**. **Determinate** vs **indeterminate** attrs match **`ProgressCircleBase`**. Host is **not** focusable.  **`label` / slot / `aria-label`** give a **name** in tests. |
| **aXe + Storybook** | **WCAG 2.x** on progress-circle stories. |
| **Playwright ARIA snapshots** | Keep **`progress-circle.a11y.spec.ts`** (overview, anatomy, sizes, static colors, progress values, **indeterminate**). |
| **Contrast** | Run where **`static-color`** and default stories need it. |
| **Motion / reduced motion** | Where stories animate, confirm **reduced-motion** behavior, **Spectrum** token alignment where relevant, and **WCAG 2.2.2** / **flicker** fallback expectations match product rules. |

---

## Summary checklist

- [ ] Stories use **task-specific** labels (“Uploading document”), not **only** “Loading” or **token** names from **`size`** / **`static-color`**.
- [ ] **Known percent** stories show **min / max / now / valuetext** matching **`progress`** and locale.
- [ ] **Indeterminate** stories **omit** value attrs as required.
- [ ] Default build is **not focusable**; docs match **read-only** behavior.
- [ ] Tree / snapshots show **`progressbar`** + good **name**; indeterminate matches **busy** pattern.
- [ ] **Dev warning** for missing name stays on; user-facing text uses the right **element name** where possible.
- [ ] **ARIA snapshots** cover **determinate**, **indeterminate**, and other main stories.
- [ ] **Unit tests** prove **no** **Tab** focus by default.
- [ ] **aXe** (WCAG 2.x tags) runs on progress-circle stories.
- [ ] Docs and examples **never** recommend **`aria-live="assertive"`** for loading; **`aria-live="polite"`** is **rare** only, with a warning that **many** updating components or regions stay **noisy**.

---

## References

- [WAI-ARIA 1.2: progressbar](https://www.w3.org/TR/wai-aria-1.2/#progressbar)
- [APG: progress bar pattern](https://www.w3.org/WAI/ARIA/apg/patterns/progressbar/)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [WCAG 2.2.2: pause, stop, hide (understanding)](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html)
- [Using ARIA (read this first)](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/)
- [Figma: Loading animation discovery](https://www.figma.com/design/42VzvpW262EAUbYsadO4e8/Loading-animation-discovery?node-id=478-948207&t=RVTbvK49jUbfoa0P-0)
- [Progress circle migration roadmap](./rendering-and-styling-migration-analysis.md)
