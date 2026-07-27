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
    - [Shadow DOM and cross-root ARIA](#shadow-dom-and-cross-root-aria)
    - [Accessibility tree expectations](#accessibility-tree-expectations)
    - [Keyboard and focus](#keyboard-and-focus)
- [Known 1st-gen issues](#known-1st-gen-issues)
    - [Role and value attributes](#role-and-value-attributes)
    - [Labeling and description](#labeling-and-description)
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
| [Name, role, value (WCAG 4.1.2)](https://www.w3.org/WAI/WCAG22/#name-role-value) | **Name** from the **label slot** via **`aria-labelledby`**, or from **`accessibleLabel`** via **`aria-label`** when no visible label is present. **Role** must be **`meter`**, not **`progressbar`**, for this component. **Value** = min, max, now, and (when used) valuetext. |
| [Non-text content (WCAG 1.1.1)](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html) | **Track** and **fill** are in **shadow DOM**. The element with **`role="meter"`** is also in the **shadow DOM** with internal ID references for labeling; the **host** carries no ARIA **role**. Inner nodes stay **graphical** unless a separate spec says otherwise. |
| [Use of color (WCAG 1.4.1)](https://www.w3.org/TR/WCAG22/#use-of-color) | Do not rely on **fill color** or **variant** alone. **Value**, **name**, and visible **percentage** should agree. **Variant** (`positive` / `notice` / `negative`) is a **decorative/semantic** tint for humans only unless mapped with care in docs and tests. |
| [Non-text contrast (WCAG 1.4.11)](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast) | **Track** and **fill** are **graphical** and need **at least 3:1** with **adjacent** colors. At **0%** or with **very** **low** **fill**, a **thin** or **faint** **track** alone can fail, similar to a progress bar. |
| *Loading* visuals (Figma) | The [**Loading animation discovery** Figma](https://www.figma.com/design/42VzvpW262EAUbYsadO4e8/Loading-animation-discovery) covers **loaders** and **task** **progress** and also prescribes **bar** / **track** / **fill** **treatments** that help **contrast** at **0%** (or very **low** **fill**). Use that file as one way to **mitigate** **non-text** **contrast** for the **bar** at **value = 0** while keeping **ARIA** and the **stated** **value** as a **meter** (**not** a **loader**). **Meters** show a **static level** in a **fixed range**—**not** a **spinner** or **indeterminate** “unknown length” task. Keep **bar** + **side** **label** **treatment** consistent when a **meter** and a **progress bar** appear in one **UI**, but do **not** add **indeterminate** **loading** **motion** to a **meter**. If motion is ever added, apply **[WCAG 2.2.2](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html)** and **reduced-motion** rules. |

**Bottom line:** Ship a **non-focusable** inner shadow DOM element with **`role="meter"`**, **min (0)**, **max (100)**, **now** (from **`progress`**), and **valuetext** matching the **localized** **percent** the component shows. Name it via **`aria-labelledby`** (pointing to the label slot container's shadow DOM ID) when a visible label is present, or via **`aria-label`** (from **`accessibleLabel`**) when it is not. The **host** carries **no** ARIA **role**.

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
| **`role=”meter”`** | **Prescribed** and **fixed** on an **inner shadow DOM element** (not the host). The host carries **no** ARIA **role**. Placing the role in shadow DOM avoids polluting the custom element’s host ARIA contract and allows the internal element to use shadow-DOM-internal ID references for `aria-labelledby` and `aria-describedby` without cross-root ARIA issues. Do **not** set **`role=”progressbar”`** and do **not** use a **combined** or **space-separated** `role` string (1st-gen’s **`role=”meter progressbar”`** is **not** a valid use of a single ARIA **role** value). If authors need a **task progress** widget, they should use **`<swc-progress-bar>`** / **`<swc-progress-circle>`**. |
| **Label slot (visible label)** | A **`label` slot** provides the **visible** **label** text. The slot content is wrapped in a shadow DOM container that has a **stable ID** (for example `label`). The inner element with `role=”meter”` references that ID via **`aria-labelledby`**. This keeps the ID reference entirely within the shadow tree and avoids cross-root ARIA. |
| **`accessibleLabel` property (screen reader-only label)** | For **rare** contexts where no visible label is appropriate (for example a data grid column where the column header already labels the meter), authors set **`accessibleLabel`** on the component. When this property is non-empty, the inner element with `role=”meter”` sets **`aria-label`** to its value instead of using **`aria-labelledby`**. Do **not** use both simultaneously. A **dev warning** in debug builds is appropriate when neither a label slot value nor `accessibleLabel` is provable. |
| **Description slot** | A **`description` slot** renders **additional text below the meter** (for example “2 GB of 10 GB used”). The slot content is wrapped in a shadow DOM container that has a **stable ID** (for example `description`). The inner element with `role=”meter”` references that ID via **`aria-describedby`**. Do **not** call this slot “help text”: that term implies the meter is a form field, which it is not. |
| **`aria-valuemin` / `aria-valuemax`** | Set to **`”0”`** and **`”100”`** to match the **current** public **`progress` API** (0–100). 1st-gen does **not** set these; **2nd-gen** should. If the product later allows **arbitrary** ranges, recompute all three of **min**, **max**, and **now** from the same **source of truth** as the visible value. |
| **`aria-valuenow`** | Mirror **`progress`**, updated on change (1st-gen does this). |
| **`aria-valuetext`** | Expose a **string** that matches the **displayed** **percentage** (for example the same **localized** value as the **`sp-field-label`** in the **percentage** area). This keeps **AT** in sync with sighted users, and satisfies the APG when a **percent** is a **sensible** “human” value. If the value should **not** be spoken as a **percent** only, set **`aria-valuetext`** to the **user-friendly** string. |
| **0% appearance ([WCAG 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast))** | When **`progress` = 0**, the **fill** is effectively **invisible**—at-risk **non-text** **contrast** on the **track** only. **Mitigate** using the **bar** / **track** / **fill** **rules** in the [**Loading animation discovery** Figma](https://www.figma.com/design/42VzvpW262EAUbYsadO4e8/Loading-animation-discovery) (and align with the [Progress bar 0% guidance](../progress-bar/accessibility-migration-analysis.md#non-text-contrast-at-0-wcag-1411) where the **bar** is shared), so **graphical** parts **meet** **3:1**; **`aria-valuenow`**, **`aria-valuetext`**, and any **visible** **percent** must still read as **0%**—treatment is for **perception** only. |
| **`variant` / `size` / `static-color` / `side-label`** | **Layout** and **tint** only, unless a future spec ties **variant** to **advisory** (non-essential) hints—do not invent **ARIA** mappings without product agreement. |
| **Docs** | **Read-only**: **no** **Tab** focus for the default use case; **not** a **loader**. Warn against **over-announcing**: do **not** use **`aria-live=”assertive”`**; use **`aria-live=”polite”`** only in **rare** **cases** when **frequent** updates are described elsewhere in one **primary** place. **Loaders** and **indeterminate** work belong on **`progressbar`**, aligned with the **Figma** *Loading animation discovery* doc and the **progress** components, **not** on a **meter**. |

### Shadow DOM and cross-root ARIA

The element with `role="meter"` lives **inside the shadow DOM** and the host carries no ARIA role. This is intentional. Because the label, description, and meter role are all inside the same shadow root, the `aria-labelledby` and `aria-describedby` references are resolved within that shadow tree and do not need to cross any shadow boundary.

#### Shadow DOM structure

The shadow root contains three key containers, each with a stable internal ID:

```html
<!-- shadow root -->
<div id="label"><slot name="label"></slot></div>
<div
  role="meter"
  aria-labelledby="label"
  aria-describedby="description"
  aria-valuemin="0"
  aria-valuemax="100"
  aria-valuenow="[progress]"
  aria-valuetext="[localized percent]"
>
  <div class="track"><div class="fill"></div></div>
</div>
<div id="description"><slot name="description"></slot></div>
```

When **`accessibleLabel`** is provided (and no visible label slot is used), the meter element switches from `aria-labelledby="label"` to `aria-label="[accessibleLabel]"`.

#### Why not on the host?

Placing the role on a shadow DOM node is a deliberate departure from the 1st-gen pattern. It avoids the following problems:

- A host `role="meter"` would require external `aria-labelledby` pointing to light-DOM elements. Those references work, but tightly couple the consumer's DOM structure to the component's accessible name.
- The label and description slots are rendered inside the shadow DOM. If the role were on the host, `aria-labelledby` and `aria-describedby` from the host could not reference shadow-DOM IDs.
- Keeping everything inside one shadow root makes the naming and description strategy self-contained and predictable regardless of how the component is embedded.

### Accessibility tree expectations

#### Determinate value (current product)

- **Role:** `meter` is on an **inner shadow DOM element**, not the host. The host appears as a generic element in the accessibility tree.
- **Name:** Derived from the **label slot** text via `aria-labelledby` pointing to the shadow-DOM label container ID. When `accessibleLabel` is set instead, derived from `aria-label`.
- **Description:** Derived from the **description slot** text via `aria-describedby` pointing to the shadow-DOM description container ID, when content is present.
- **Value:** `valuemin`, `valuemax`, `valuenow`, and `valuetext` all live on the inner meter element, aligned with the visible percentage.

#### Variants and color

- **Tree** name and **value** stay **independent** of **variant**; **color** is **not** a substitute for **name** and **value**.

### Keyboard and focus

**Not focusable.** Keyboard navigation should skip this component and move to the next focusable element.

---

## Known 1st-gen issues

Gaps in **1st-gen** **`<sp-meter>`** that **2nd-gen** **`swc-meter`** should fix and cover with tests.

### Role and value attributes

- The host uses **`setAttribute('role', 'meter progressbar')`**. ARIA **`role`** must be a **single** [token](https://www.w3.org/TR/wai-aria-1.2/) from the spec; the **correct** **fixed** **role** for this widget is **`meter`**, not **`progressbar`**, per the [APG meter pattern](https://www.w3.org/WAI/ARIA/apg/patterns/meter/). In **2nd-gen**, the role moves off the host entirely and onto an inner shadow DOM element.
- **`aria-valuemin`**, **`aria-valuemax`**, and **`aria-valuetext`** are **not** set in `Meter.ts` (only **`aria-valuenow`**, **`aria-label`**, and the **`role`** string are set in code paths reviewed here). They should be added in **2nd-gen** to match the pattern.

### Labeling and description

- 1st-gen exposes a **`label` property** and a **default slot** that feed the visible label, but there is no explicit **description** slot. In **2nd-gen**, the **label slot** replaces the `label` attribute as the primary visible-label surface, and a **description slot** replaces the "help text" pattern (which incorrectly frames the meter as a form field). Consumers who need a screen reader-only label in labelless contexts use the **`accessibleLabel`** property.

### Non-text contrast at 0% (WCAG 1.4.11)

- At **`progress` = 0**, the **fill** has no width, similar to a **progress bar**—at-risk **3:1** for **track** vs **background**. One **practical** way to **mitigate** is to follow the **bar** / **track** / **fill** **treatment** **prescribed** in the [**Loading animation discovery** Figma](https://www.figma.com/design/42VzvpW262EAUbYsadO4e8/Loading-animation-discovery) (and the [Progress bar recommendations](../progress-bar/accessibility-migration-analysis.md#non-text-contrast-at-0-wcag-1411) for a shared **0%** story with **contrast** checks).

### Documentation (README)

- 1st-gen [`1st-gen/packages/meter/README.md`](../../../../1st-gen/packages/meter/README.md) describes **`role=”meter progressbar”`** as if both roles apply. Update consumer docs for **`swc-meter`** to a **single** **`meter`** **role** (on an inner shadow DOM element, not the host), a short **”meter vs progress”** blurb (task progress vs static level), and guidance on using the **label slot**, the **`accessibleLabel`** property, and the **description slot**.

---

## Testing

### Automated tests

| Kind of test | What to check |
|--------------|----------------|
| **Unit** | Inner shadow DOM element carries **single** **`role="meter"`**; host has **no** ARIA role. **Min**/**max**/**now**/**valuetext** correct. Name resolves via **`aria-labelledby`** to label slot container ID, or via **`aria-label`** when `accessibleLabel` is set. Description resolves via **`aria-describedby`** to description slot container ID when content is present. Host **not** **focusable** by default. |
| **aXe + Storybook** | **WCAG 2.x** on **meter** stories (1st-gen now; 2nd-gen when added). |
| **Playwright ARIA snapshots** | Add **`meter.a11y.spec.ts`** for 2nd-gen, covering **side-label**, **sizes**, **variants**, and **key** `progress` values, mirroring the **progress-bar** / **progress-circle** snapshot approach. |
| **Contrast** | **0%**, **variants**, **`staticColor`**, and any **over-photo** or **on-image** use cases. |

### Manual screen reader testing

The **meter** is not in the **Tab** order, so you will not reach it the same way as **focusable** **controls** when a **screen** **reader** is in **forms** or **application**-style **focus** **navigation**. Use **browse** **mode** (document or scan mode) to read the page in **content** **order** and **encounter** the **meter** so you can verify its **name** and **value** are announced. See the 2nd-gen Storybook [Screen reader testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/screen_reader_testing.mdx) guide, including **Browse mode (document/scan mode)**.

---

## Summary checklist

- [ ] **`role="meter"`** is on an **inner shadow DOM element**, not the host. The host carries no ARIA role.
- [ ] The **label slot** content is wrapped in a shadow DOM container with a **stable ID**; the meter element references it via **`aria-labelledby`**.
- [ ] The **`accessibleLabel`** property sets **`aria-label`** on the meter element for contexts where no visible label slot is used (for example a data grid). When `accessibleLabel` is set, `aria-labelledby` is not also set.
- [ ] The **description slot** content is wrapped in a shadow DOM container with a **stable ID**; the meter element references it via **`aria-describedby`** when the slot has content. The slot is named **description**, not **help text**.
- [ ] **`aria-valuemin`**, **`aria-valuemax`**, **`aria-valuenow`**, and **`aria-valuetext`** are all set on the inner meter element, aligned to **`progress`** and locale.
- [ ] **Docs** and **stories** distinguish **meter** (static **level** in a **range**) from **progress** (**task** and, when used, **indeterminate**). Cite *Loading animation discovery* for **shared** **bar** / **0%** **treatments** (contrast) and for **loader** / **task** **progress**—**not** for **indeterminate** **loading** **motion** on a **meter**.
- [ ] **No** **`aria-live="assertive"`**; **`polite`** **live** regions are **rare** and only when a single **primary** announcement strategy exists.
- [ ] **0%** and **variant** stories meet **non-text contrast** expectations, including **0%** **mitigations** aligned with the **Figma** *Loading* file where the **bar** spec applies.
- [ ] **Dev warning** (if any) fires when neither a label slot value nor `accessibleLabel` is provable at runtime.
- [ ] **1st-gen** issues (combined **role** on host, missing min/max/valuetext, no description slot) are **regression-tested** in 2nd-gen.
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
