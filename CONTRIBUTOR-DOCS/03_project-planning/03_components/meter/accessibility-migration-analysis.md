<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Meter / Meter accessibility migration analysis

<!-- Document title (editable) -->

# Meter accessibility migration analysis

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Overview](#overview)
    - [Also read](#also-read)
    - [What it is](#what-it-is)
    - [When to use something else](#when-to-use-something-else)
    - [What it is not](#what-it-is-not)
    - [Related](#related)
- [ARIA and WCAG context](#aria-and-wcag-context)
    - [Pattern in the APG](#pattern-in-the-apg)
    - [Guidelines that apply](#guidelines-that-apply)
- [Related 1st-gen accessibility (Jira)](#related-1st-gen-accessibility-jira)
- [Recommendations: `<swc-meter>`](#recommendations-swc-meter)
    - [ARIA roles, states, and properties](#aria-roles-states-and-properties)
    - [Shadow DOM and cross-root ARIA Issues](#shadow-dom-and-cross-root-aria-issues)
    - [Accessibility tree expectations](#accessibility-tree-expectations)
    - [Keyboard and focus](#keyboard-and-focus)
- [Known 1st-gen issues](#known-1st-gen-issues)
    - [Role and value attributes](#role-and-value-attributes)
    - [Non-text contrast at 0% (WCAG 1.4.11)](#non-text-contrast-at-0-wcag-1411)
    - [Documentation (README)](#documentation-readme)
- [Testing](#testing)
    - [Automated tests](#automated-tests)
    - [Manual screen reader testing](#manual-screen-reader-testing)
- [Summary checklist](#summary-checklist)
- [References](#references)

</details>

<!-- Document content (editable) -->

## Overview

This doc explains how **`swc-meter`** should work for **accessibility**. It supports **WCAG 2.2 Level AA**. Until **`swc-meter`** exists under `2nd-gen/`, use **`1st-gen/packages/meter/src/Meter.ts`** (`<sp-meter>`) to validate behavior, and update this spec against the real 2nd-gen source when it ships.

### Also read

[Meter migration roadmap](./rendering-and-styling-migration-analysis.md).

### What it is

- A **read-only** bar (track + fill) that shows a **value within a fixed range** (today modeled as **0–100** on **`progress`**) to represent a **level or amount** (for example storage use or another bounded measurement).
- It is **not** a control the user **adjusts** with the keyboard; it is **for display**.

### When to use something else

- **Task** completion, **file upload**, or **indeterminate** “busy until done” ➜ use **`progressbar`** and [Progress bar accessibility migration analysis](../progress-bar/accessibility-migration-analysis.md) (or [Progress circle](../progress-circle/accessibility-migration-analysis.md) for a ring). Those patterns match [Adobe’s Figma *Loading animation discovery*](https://www.figma.com/design/42VzvpW262EAUbYsadO4e8/Loading-animation-discovery) and the [APG progress bar pattern](https://www.w3.org/WAI/ARIA/apg/patterns/progressbar/); a **meter** is **not** a substitute for a **loader** or **indeterminate** progress.
- A **value the user sets** (slider) ➜ use a **slider**-style component, not a meter.

### What it is not

- A **graph of population** with no real maximum, or a **trend** without a fixed **min**/**max** (the [APG *About this pattern*](https://www.w3.org/WAI/ARIA/apg/patterns/meter/) note gives examples of what a **meter** is **not** for).

### Related

- **Bar-shaped task progress** ➜ [Progress bar](../progress-bar/accessibility-migration-analysis.md) (same bar **visuals** in designs; **different** ARIA **role** and product meaning).
- **Circular task progress** ➜ [Progress circle](../progress-circle/accessibility-migration-analysis.md).

---

## ARIA and WCAG context

### Pattern in the APG

- The [WAI-ARIA meter pattern](https://www.w3.org/WAI/ARIA/apg/patterns/meter/) is the right fit: the element with **`role="meter"`** exposes **`aria-valuemin`**, **`aria-valuemax`**, **`aria-valuenow`**, a **label** via **`aria-labelledby`**, **`aria-label`**, and optionally **`aria-valuetext`**, when a **percentage alone** would be unclear. **Keyboard interaction** is **not applicable** for a read-only meter.
- Do **not** use a **meter** for “progress” of a **long-running process** in the “loading / unknown time” sense; the APG and [Using ARIA](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/) distinguish that from a **`progressbar`**.

### Guidelines that apply

| Idea | Plain meaning |
|------|----------------|
| [`meter` role](https://www.w3.org/TR/wai-aria-1.2/#meter) | The node needs an **accessible name** and a **value** between min and max. Use **`aria-valuetext`** when a **raw number or percent** would not be enough (for example a battery string like the APG example: “50% (6 hours) remaining”). If the only meaningful description is a **localized** percent, **`aria-valuetext`** can align with the **visible** percentage. |
| [Name, role, value (WCAG 4.1.2)](https://www.w3.org/WAI/WCAG22/#name-role-value) | **Name** from **`label`**, **slot** text, **`aria-label`**, or **`aria-labelledby`**. **Role** must be **`meter`**, not **`progressbar`**, for this component. **Value** = min, max, now, and (when used) valuetext. |
| [Non-text content (WCAG 1.1.1)](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html) | **Track** and **fill** are in **shadow DOM**; the **host** should expose **role** and **ARIA** values. Inner nodes stay **graphical** unless a separate spec says otherwise. |
| [Use of color (WCAG 1.4.1)](https://www.w3.org/TR/WCAG22/#use-of-color) | Do not rely on **fill color** or **variant** alone. **Value**, **name**, and visible **percentage** should agree. **Variant** (`positive` / `notice` / `negative`) is a **decorative/semantic** tint for humans only unless mapped with care in docs and tests. |
| [Non-text contrast (WCAG 1.4.11)](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast) | **Track** and **fill** are **graphical** and need **at least 3:1** with **adjacent** colors. At **0%** or with **very** **low** **fill**, a **thin** or **faint** **track** alone can fail, similar to a progress bar. |
| *Loading* visuals (Figma) | The [**Loading animation discovery** Figma](https://www.figma.com/design/42VzvpW262EAUbYsadO4e8/Loading-animation-discovery) covers **loaders** and **task** **progress** and also prescribes **bar** / **track** / **fill** **treatments** that help **contrast** at **0%** (or very **low** **fill**). Use that file as one way to **mitigate** **non-text** **contrast** for the **bar** at **value = 0** while keeping **ARIA** and the **stated** **value** as a **meter** (**not** a **loader**). **Meters** show a **static level** in a **fixed range**—**not** a **spinner** or **indeterminate** “unknown length” task. Keep **bar** + **side** **label** **treatment** consistent when a **meter** and a **progress bar** appear in one **UI**, but do **not** add **indeterminate** **loading** **motion** to a **meter**. If motion is ever added, apply **[WCAG 2.2.2](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html)** and **reduced-motion** rules. |

**Bottom line:** Ship a **non-focusable** **`role="meter"`** with a **name**, **min (0)**, **max (100)**, **now** (from **`progress`**), and **valuetext** that matches the **localized** **percent** the component shows, as implemented in **`1st-gen/.../Meter.ts`** today for display—then **verify in `swc-meter`**.

---

## Related 1st-gen accessibility (Jira)

| Jira | Type | Status (snapshot) | Resolution (snapshot) | Summary |
|------|------|-------------------|-------------------------|---------|
| — | — | — | — | *No 1st-gen `sp-meter`–specific items in this snapshot.* |

---

## Recommendations: `<swc-meter>`

### ARIA roles, states, and properties

| Topic | What to do |
|-------|------------|
| **`role="meter"`** | **Prescribed** and **fixed** on the **host**. It must **not** be author-overridable. Do **not** set **`role="progressbar"`** and do **not** use a **combined** or **space-separated** `role` string (1st-gen’s **`role="meter progressbar"`** is **not** a valid use of a single ARIA **role** value). This element is **one** **meter** only. If authors need a **task progress** widget, they should use **`<swc-progress-bar>`** / **`<swc-progress-circle>`**, not a role change on the meter. |
| **Name (required)** | Provide a **name** with **`label`**, **default slot** text, **`aria-label`**, or **`aria-labelledby`** ([WCAG 4.1.2](https://www.w3.org/WCAG22/#name-role-value)). Prefer **`aria-labelledby`** when a **visible** **label** exists; otherwise use **`aria-label`**. A **dev warning** in debug builds (pattern from **progress** components) is appropriate when **no** name is provable. |
| **`aria-valuemin` / `aria-valuemax`** | Set to **`"0"`** and **`"100"`** to match the **current** public **`progress` API** (0–100). 1st-gen does **not** set these; **2nd-gen** should. If the product later allows **arbitrary** ranges, recompute all three of **min**, **max**, and **now** from the same **source of truth** as the visible value. |
| **`aria-valuenow`** | Mirror **`progress`**, updated on change (1st-gen does this). |
| **`aria-valuetext`** | Expose a **string** that matches the **displayed** **percentage** (for example the same **localized** value as the **`sp-field-label`** in the **percentage** area). This keeps **AT** in sync with sighted users, and satisfies the APG when a **percent** is a **sensible** “human” value. If the value should **not** be spoken as a **percent** only, set **`aria-valuetext`** to the **user-friendly** string. |
| **`label` / slot** | If **slot** text **drives** **`label`**, document **one** **clear** naming path. **Avoid** a **name** that only repeats **“Meter”** or a **size** when you can be **specific** (for example “**Storage**”). |
| **0% appearance ([WCAG 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast))** | When **`progress` = 0**, the **fill** is effectively **invisible**—at-risk **non-text** **contrast** on the **track** only. **Mitigate** using the **bar** / **track** / **fill** **rules** in the [**Loading animation discovery** Figma](https://www.figma.com/design/42VzvpW262EAUbYsadO4e8/Loading-animation-discovery) (and align with the [Progress bar 0% guidance](../progress-bar/accessibility-migration-analysis.md#non-text-contrast-at-0-wcag-1411) where the **bar** is shared), so **graphical** parts **meet** **3:1**; **`aria-valuenow`**, **`aria-valuetext`**, and any **visible** **percent** must still read as **0%**—treatment is for **perception** only. |
| **`variant` / `size` / `static-color` / `side-label`** | **Layout** and **tint** only, unless a future spec ties **variant** to **advisory** (non-essential) hints—do not invent **ARIA** mappings without product agreement. |
| **Docs** | **Read-only**: **no** **Tab** focus for the default use case; **not** a **loader**. Warn against **over-announcing**: do **not** use **`aria-live="assertive"`**; use **`aria-live="polite"`** only in **rare** **cases** when **frequent** updates are described elsewhere in one **primary** place. **Loaders** and **indeterminate** work belong on **`progressbar`**, aligned with the **Figma** *Loading animation discovery* doc and the **progress** components, **not** on a **meter**. |

### Shadow DOM and cross-root ARIA Issues

Keep `role="meter"` and the value-related **ARIA** on the custom element **host**. Authors can then use `aria-labelledby` and `aria-describedby` on **`<swc-meter>`** / **`<sp-meter>`** with `id` references to elements in the surrounding **light** **DOM**; those references live in the same document tree as the **host** and do not need to cross a shadow **boundary** for the usual **label** / **description** pattern.

If the **meter** role were placed **only** on a node **inside** closed shadow **DOM** instead, the custom element would **not** be able to rely on the same `aria-labelledby` and `aria-describedby` pattern: **IDs** in the light **DOM** do not resolve as cross-reference targets for inner shadow nodes, and ARIA on the **host** would not name a **meter** that lives only in the shadow **tree**. You would need a different approach (for example `ElementInternals` and delegation, or another markup strategy). This component should keep **meter** semantics on the **host** so that pattern stays available.

### Accessibility tree expectations

#### Determinate value (current product)

- **Role:** **meter** with a **name** and **valuemin**, **valuemax**, **valuenow**, and **valuetext** (when 2nd-gen adds min/max/valuetext) **aligning** with the **visible** **percentage**.
- The **side** or **top** **labels** in **shadow** should not cause **redundant** **naming** if the **host** also carries a full **accessible name**—**implementation** should be checked so assistive technology **does not** read the same **title** twice; prefer **one** clear **naming** strategy in code.

#### Variants and color

- **Tree** name and **value** stay **independent** of **variant**; **color** is **not** a substitute for **name** and **value**.

### Keyboard and focus

**Not focusable.** Keyboard navigation should skip this component and move to the next focusable element.

---

## Known 1st-gen issues

Gaps in **1st-gen** **`<sp-meter>`** that **2nd-gen** **`swc-meter`** should fix and cover with tests.

### Role and value attributes

- The host uses **`setAttribute('role', 'meter progressbar')`**. ARIA **`role`** must be a **single** [token](https://www.w3.org/TR/wai-aria-1.2/) from the spec; the **correct** **fixed** **role** for this widget is **`meter`**, not **`progressbar`**, per the [APG meter pattern](https://www.w3.org/WAI/ARIA/apg/patterns/meter/).
- **`aria-valuemin`**, **`aria-valuemax`**, and **`aria-valuetext`** are **not** set in `Meter.ts` (only **`aria-valuenow`**, **`aria-label`**, and the **`role`** string are set in code paths reviewed here). They should be added in **2nd-gen** to match the pattern.

### Non-text contrast at 0% (WCAG 1.4.11)

- At **`progress` = 0**, the **fill** has no width, similar to a **progress bar**—at-risk **3:1** for **track** vs **background**. One **practical** way to **mitigate** is to follow the **bar** / **track** / **fill** **treatment** **prescribed** in the [**Loading animation discovery** Figma](https://www.figma.com/design/42VzvpW262EAUbYsadO4e8/Loading-animation-discovery) (and the [Progress bar recommendations](../progress-bar/accessibility-migration-analysis.md#non-text-contrast-at-0-wcag-1411) for a shared **0%** story with **contrast** checks).

### Documentation (README)

- 1st-gen [`1st-gen/packages/meter/README.md`](../../../../1st-gen/packages/meter/README.md) describes **`role="meter progressbar"`** as if both roles apply. Update consumer docs for **`swc-meter`** to a **single** **`meter`** **role** and a short **“meter vs progress”** blurb (task progress vs static level).

---

## Testing

### Automated tests

| Kind of test | What to check |
|--------------|----------------|
| **Unit** | **Single** **`role="meter"`** (or equivalent internal mapping). **Min**/**max**/**now**/**valuetext** and **name** (slot / `label` / `aria-label`) in or with **`swc-meter`**. Host **not** **focusable** by default. |
| **aXe + Storybook** | **WCAG 2.x** on **meter** stories (1st-gen now; 2nd-gen when added). |
| **Playwright ARIA snapshots** | Add **`meter.a11y.spec.ts`** for 2nd-gen, covering **side-label**, **sizes**, **variants**, and **key** `progress` values, mirroring the **progress-bar** / **progress-circle** snapshot approach. |
| **Contrast** | **0%**, **variants**, **`staticColor`**, and any **over-photo** or **on-image** use cases. |

### Manual screen reader testing

The **meter** is not in the **Tab** order, so you will not reach it the same way as **focusable** **controls** when a **screen** **reader** is in **forms** or **application**-style **focus** **navigation**. Use **browse** **mode** (document or scan mode) to read the page in **content** **order** and **encounter** the **meter** so you can verify its **name** and **value** are announced. See the 2nd-gen Storybook [Screen reader testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/screen_reader_testing.mdx) guide, including **Browse mode (document/scan mode)**.

---

## Summary checklist

- [ ] **2nd-gen** exposes **`role="meter"`** only, with **valuemin**, **valuemax**, **valuenow**, and **valuetext** aligned to **`progress`**, **label**, and **locale** (verify in `swc-meter` source).
- [ ] **Docs** and **stories** distinguish **meter** (static **level** in a **range**) from **progress** (**task** and, when used, **indeterminate**). Cite *Loading animation discovery* for **shared** **bar** / **0%** **treatments** (contrast) and for **loader** / **task** **progress**—**not** for **indeterminate** **loading** **motion** on a **meter**.
- [ ] **No** **`aria-live="assertive"`**; **`polite`** **live** regions are **rare** and only when a single **primary** announcement strategy exists.
- [ ] **0%** and **variant** stories meet **non-text contrast** expectations, including **0%** **mitigations** aligned with the **Figma** *Loading* file where the **bar** spec applies.
- [ ] **Dev warning** (if any) uses the **`swc-meter`** name and a **useful** issues list.
- [ ] **1st-gen** issues (combined **role**, missing min/max/valuetext) are **regression-tested** in 2nd-gen.
- [ ] **aXe** (WCAG 2.x) runs on **meter** stories.
- [ ] **Manual** **screen** **reader** **testing** uses **browse** **mode** per the Storybook [Screen reader testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/screen_reader_testing.mdx) guide, because the **meter** is **not** **keyboard** **focusable**.

---

## References

- [WAI-ARIA 1.2: `meter` role](https://www.w3.org/TR/wai-aria-1.2/#meter)
- [APG: meter pattern](https://www.w3.org/WAI/ARIA/apg/patterns/meter/)
- [WAI-ARIA 1.2: `progressbar` (for “not a meter”)](https://www.w3.org/TR/wai-aria-1.2/#progressbar)
- [Using ARIA (read this first)](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/)
- [WCAG 2.2](https://www.w3.org/WCAG22/)
- [WCAG 1.4.11: non-text contrast (understanding)](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast)
- [WCAG 2.2.2: pause, stop, hide (understanding)](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html)
- [Figma: Loading animation discovery](https://www.figma.com/design/42VzvpW262EAUbYsadO4e8/Loading-animation-discovery?node-id=478-948207&t=RVTbvK49jUbfoa0P-0)
- [Progress bar accessibility migration analysis](../progress-bar/accessibility-migration-analysis.md)
- [Progress circle accessibility migration analysis](../progress-circle/accessibility-migration-analysis.md)
- [Meter migration roadmap](./rendering-and-styling-migration-analysis.md)
- [2nd-gen Storybook: Screen reader testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/screen_reader_testing.mdx)
