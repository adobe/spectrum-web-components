<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Accordion / Accordion accessibility migration analysis

<!-- Document title (editable) -->

# Accordion accessibility migration analysis

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Overview](#overview)
    - [Also read](#also-read)
    - [What an accordion is](#what-an-accordion-is)
    - [When to use something else](#when-to-use-something-else)
    - [Related](#related)
- [ARIA and WCAG context](#aria-and-wcag-context)
    - [Pattern in the APG](#pattern-in-the-apg)
    - [Guidelines that apply](#guidelines-that-apply)
- [Related 1st-gen accessibility (Jira)](#related-1st-gen-accessibility-jira)
- [Recommendations: `<swc-accordion>` / `<swc-accordion-item>`](#recommendations-swc-accordion--swc-accordion-item)
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

This doc explains how **`swc-accordion`** and **`swc-accordion-item`** should behave for **accessibility**. The target is **WCAG 2.2 Level AA**. It complements the accordion **rendering-and-styling** migration doc and reflects the **accordion** pattern in the [ARIA Authoring Practices Guide (APG)](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/), Deque’s **single** vs **multiselect** examples, and [Heydon Pickering’s collapsible sections](https://inclusive-components.design/collapsible-sections/) guidance (**`<button>`** inside a real **`<h*>`**; do not put **`role="button"`** on the heading element). The **preferred** implementation uses a **slot for heading text** and a **`heading-level`** property so shadow DOM can render **`<h*>` > `<button>`** with Spectrum styling.

### Also read

[Accordion migration roadmap](./rendering-and-styling-migration-analysis.md) for DOM and styling migration.

[Illustrated message migration roadmap](../illustrated-message/rendering-and-styling-migration-analysis.md) — when aligning **heading / title** APIs across components. A **card** migration roadmap should be treated the same way once it exists under this section.

### What an accordion is

- A set of **sections** where each section has a **header control** that expands or collapses a **panel** of content. Only one section may be open, or **multiple** sections may be open, depending on configuration ([Deque: Accordion (Single)](https://dequeuniversity.com/library/aria/accordion-single), [Deque: Accordion (Multiselect)](https://dequeuniversity.com/library/aria/accordion-multi)).

### When to use something else

- **One exclusive choice** from a short list where **all options** stay visible — consider **tabs** ([APG tabs](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)).
- **Simple disclosure** of ancillary content **without** a list of peers — a single **`<details>` / `<summary>`** or a **disclosure button** pattern may be enough.

### Related

- **`swc-accordion`** coordinates items; each **`swc-accordion-item`** is one header + panel pair.

---

## ARIA and WCAG context

### Pattern in the APG

- Follow the **[Accordion pattern](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/)** and the **[Accordion example](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/examples/accordion/)**: header exposes a **button** with **`aria-expanded`**, **`aria-controls`** referencing the panel **id**, and the expanded panel uses **`role="region"`** with **`aria-labelledby`** referencing the header control so the region has an accessible name (landmark semantics for the expanded panel).
- **Keyboard:** When focus is on the accordion header button of a **collapsed** section, **Space** or **Enter** **expand** the section ([APG example keyboard table](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/examples/accordion/)). **Space** must **toggle** the panel **without** triggering **default scrolling** on the document or scrollable ancestors (handle **`keydown`** / **`keyup`** appropriately and call **`preventDefault()`** where needed—see **[SWC-1487](https://jira.corp.adobe.com/browse/SWC-1487)**). **Tab** moves through **focusable** elements in page order (including inside open panels).
- **Inclusive Components:** Prefer **`<h*><button>…</button></h*>`** so the control stays a **real button** and the **heading level** is preserved for navigation—**do not** put **`role="button"`** on the heading element ([Collapsible sections](https://inclusive-components.design/collapsible-sections/)).

### Guidelines that apply

| Idea | Plain meaning |
|------|----------------|
| [Info and relationships (WCAG 1.3.1)](https://www.w3.org/TR/WCAG22/#info-and-relationships) | **Heading levels** must reflect the **outline** of the page. Authors set **`heading-level`** / **`level`** (`2`–`6`) per context—document the **default** and never hide that this choice affects the outline. |
| [Name, role, value (WCAG 4.1.2)](https://www.w3.org/TR/WCAG22/#name-role-value) | The header control has **button** semantics; **`aria-expanded`** reflects open/closed; the panel is **named** (e.g. **`aria-labelledby`** to the header control). |
| [`aria-expanded`](https://www.w3.org/TR/wai-aria-1.2/#aria-expanded) | Lives on the **trigger** that toggles the panel, not only on the panel ([Collapsible sections](https://inclusive-components.design/collapsible-sections/)). |
| [`button` vs heading](https://inclusive-components.design/collapsible-sections/) | Use a **`<button>`** inside a **heading** so screen readers report **heading level + button**, not a heading stripped of structure. |

**Bottom line:** Implement an **APG-style accordion** (button, `aria-expanded`, `aria-controls`, `role="region"` + `aria-labelledby` on the panel). For **structure**, use the **preferred API**: a **slot for heading label text** plus a **`heading-level`** / **`level`** property so shadow DOM can render **`<h2>`–`<h6>`** containing the **`<button>`** ([Inclusive Components](https://inclusive-components.design/collapsible-sections/) pattern)—the **heading element stays in shadow DOM** because the button must live there with Spectrum styling.

---

## Related 1st-gen accessibility (Jira)

| Jira | Type | Status (snapshot) | Resolution (snapshot) | Summary |
|------|------|-------------------|----------------------|---------|
| [SWC-1487](https://jira.corp.adobe.com/browse/SWC-1487) | Bug | To Do | Unresolved | [Bug(accordion)] Spacebar on accordion header causes unwanted scroll in overflow containers |

---

## Recommendations: `<swc-accordion>` / `<swc-accordion-item>`

### ARIA roles, states, and properties

| Topic | What to do |
|-------|------------|
| **Pattern** | Treat each item as an **accordion** disclosure: **button** (or equivalent native control) toggles **`aria-expanded`**, **`aria-controls`** references the panel **id**. |
| **`role="region"`** on the panel | Use **`role="region"`** on the **content panel** container with **`aria-labelledby`** referencing the **id** of the **header button** (APG example). Regions must have an **accessible name** ([APG accordion example — region](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/examples/accordion/)). |
| **`aria-expanded`** | **Required** on the **header trigger**; **`true`** / **`false`** matches panel visibility. |
| **`aria-controls`** | Reference the panel **id** when the implementation uses stable ids in the same **root** as the trigger; if cross-root wiring is required, document the strategy (see **Shadow DOM** below). |
| **Disabled item** | When an item is **disabled**, the trigger must be **non-interactive** (`disabled` on **`button`**, or equivalent), and **not** expand/collapse. |
| **Single vs multiple open** | **`swc-accordion`** should support **at most one** expanded item or **multiple** expanded items ([Deque single](https://dequeuniversity.com/library/aria/accordion-single) vs [Deque multiselect](https://dequeuniversity.com/library/aria/accordion-multi)). Behavior must match documented props (e.g. analogous to **`allow-multiple`** on **`sp-accordion`**). |
| **Heading + button (preferred)** | **Preferred:** expose a **default slot** (or named slot) for **heading label text only**, and a **`heading-level`** / **`level`** property (**`2`–`6`**, mirror **1st-gen** **`level`** on **`sp-accordion`**). **Shadow DOM** renders the **heading element** (`<h2>`–`<h6>` per level) **wrapping** a native **`<button>`** so screen readers get **heading level + button** without **`role="button"`** on the heading. Consumers **do not** pass a full `<h*>` in light DOM; they pass **text** and set **level** for the outline. Document the **slot name**, **defaults**, and **Storybook** examples. |
| **Consistency** | Align **`heading-level`** / **`level`** naming, range, and **default** with **[Illustrated message](../illustrated-message/rendering-and-styling-migration-analysis.md)** and **card** (once specified) so teams use **one** mental model for section titles. |
| **Keyboard — Space** | On **`keydown`** / **`keyup`** for **Space** while focus is on the header **`button`**, **`preventDefault()`** so the browser does **not** scroll the page or an **overflow** container; then **toggle** open/closed per APG ([SWC-1487](https://jira.corp.adobe.com/browse/SWC-1487)). |
| **Do not** | Put **`role="button"`** on a **heading** instead of using a **`<button>`** inside the heading ([Inclusive Components](https://inclusive-components.design/collapsible-sections/)). |

### Shadow DOM and cross-root ARIA Issues

- Under the **preferred** pattern (**heading text** slot + **`heading-level`**), the **`<h*>`**, **`<button>`**, and **`role="region"`** panel usually live in the **same** shadow root with **stable internal ids**. **`aria-controls`** and **`aria-labelledby`** should resolve **without** cross-root **IDREF** wiring, matching the APG accordion example shape.
- If a future variant allows more of the header in **light DOM**, document **id** uniqueness, **`aria-controls`** across roots, or **`ElementInternals`** if used.

### Accessibility tree expectations

**Per expanded item**

- **Heading:** **heading** role at **level** from **`heading-level`** / **`level`**; **button** nested inside (Inclusive / APG shape).
- **Trigger:** **button**, name from slotted **label** text (and optional icon **decorative**).
- **`aria-expanded`:** **`true`** when panel is shown, **`false`** when hidden.
- **Panel:** **`role="region"`**, named via **`aria-labelledby`** to the trigger (APG). Hidden panels must **not** expose interactive descendants in the tab order ([Collapsible sections](https://inclusive-components.design/collapsible-sections/) — hidden content not focusable).

**Collapsed panels**

- Content **hidden** from **both** sight and accessibility where appropriate (**`hidden`** attribute or equivalent), consistent with implementation.

### Keyboard and focus

- **Tab / Shift+Tab:** Move through **focusable** elements **including** triggers and **focusable content inside open panels** ([APG example](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/examples/accordion/)).
- **Space:** With focus on the **header `button`**, **toggle** the panel and **`preventDefault()`** on the activating **keyboard** event so **Space does not scroll** the viewport or a scrollable ancestor (common failure in **overflow** regions; see **[SWC-1487](https://jira.corp.adobe.com/browse/SWC-1487)**).
- **Enter:** Match APG: **toggle** or **expand** as documented for your interaction model.
- **Disabled** items: trigger **not** in interactive tab order (native **`disabled`** **button** behavior).

---

## Testing

### Automated tests

| Kind of test | What to check |
|--------------|----------------|
| **Unit** | **`aria-expanded`** toggles with open state; **`aria-controls`** id matches panel; panel **`role`** and **`aria-labelledby`**; **disabled** blocks toggle; **Space** on header calls **`preventDefault()`** and toggles without relying on unintended scroll side effects. |
| **aXe + Storybook** | **WCAG 2.x** rules on accordion stories (single vs multiple open, disabled item). |
| **Playwright ARIA snapshots** | Snapshot **tree** for open/closed items; **`heading`** role **level** changes when **`heading-level`** / **`level`** changes. |
| **Keyboard** | **Tab** reaches triggers and in-panel controls when open; **Space** toggles and does **not** scroll scrollable parents; **Enter** per spec. |

---

## Summary checklist

- [ ] Docs and Storybook show **APG-aligned** markup: **button**, **`aria-expanded`**, **`aria-controls`**, **`role="region"`** + **`aria-labelledby`** on the panel.
- [ ] **Preferred** pattern documented: **heading label** via **slot**, **`heading-level`** / **`level`** (`2`–`6`); shadow renders **`<h*>` > `<button>`**; alignment with **illustrated message** / **card**.
- [ ] **Single** vs **multiple** expanded sections matches product props and mirrors **Deque** behavior where applicable.
- [ ] No **`role="button"`** on the heading element; shadow DOM uses **`<button>`** inside **`<h2>`–`<h6>`**.
- [ ] **Keyboard** and **disabled** behavior covered by tests and docs; **Space** on the header **`preventDefault()`** + **toggle** (no spurious scroll in overflow layouts).
- [ ] **References** below include APG, Deque, and Inclusive Components links used in this doc.

---

## References

- [APG: Accordion pattern](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/)
- [APG: Accordion example](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/examples/accordion/)
- [Deque University: Accordion (Single)](https://dequeuniversity.com/library/aria/accordion-single)
- [Deque University: Accordion (Multiselect)](https://dequeuniversity.com/library/aria/accordion-multi)
- [Inclusive Components: Collapsible sections](https://inclusive-components.design/collapsible-sections/)
- [WAI-ARIA 1.2](https://www.w3.org/TR/wai-aria-1.2/)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [Using ARIA (read this first)](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/)
- [Accordion migration roadmap](./rendering-and-styling-migration-analysis.md)
- [Illustrated message migration roadmap](../illustrated-message/rendering-and-styling-migration-analysis.md)
