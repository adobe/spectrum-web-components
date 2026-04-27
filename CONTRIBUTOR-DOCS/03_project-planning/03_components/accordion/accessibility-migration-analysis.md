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
- **Keyboard:** The [APG accordion example](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/examples/accordion/) **Keyboard Support** uses **Tab** / **Shift+Tab** through all focusable elements (header **buttons** and controls inside open panels) and **Space** or **Enter** on a header to expand or collapse per your model. **Do not** implement roving `tabindex` on header **buttons**—it gets confusing when open panels contain other focusable content, and the APG example does not use it. The APG pattern’s main page documents **Enter** and **Space** on the header; “move between headers only” with **Up** / **Down** / **Home** / **End** appears as an **optional** pattern in some materials, but **this project does not** implement that: it usually does not reduce effort much unless each panel is full of focusables, and calling **`preventDefault()`** on **vertical** **arrows** at a header can **block** **scrolling** when the user meant to **scroll** the page, not move to another header. **Space** on the header **button** should still use **`preventDefault()`** for **activation** so **Space** does not scroll (see **[SWC-1487](https://jira.corp.adobe.com/browse/SWC-1487)**); that is separate from arrow keys used for scroll or caret movement.
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
| **Disabled item** | **Header** **button:** set **`aria-disabled="true"`** and **block** **activation** in script. **Do** **not** use the HTML **`disabled`** **attribute** on the **header** **button** as the **sole** **disabled** **mechanism**—native **`disabled`** often **excludes** the **control** from the **Tab** order, which can **hide** the **item** from **screen** **reader** **users** in **focus** (virtual **cursor**) **mode**. **`aria-disabled`** **keeps** the **header** **focusable** and **exposes** the **disabled** state. **Panel** **root** (content **container** for the **item**): set the **`inert`** **attribute** so the **panel** and its **descendants** in the **flat** **tree** are [inert](https://html.spec.whatwg.org/multipage/interaction.html#the-inert-attribute) (no **focus**, no **pointer**-**target** for **that** **subtree**). **Do** **not** use **`tabindex="-1"`** **instead** of **`aria-disabled`** / **`inert`**—for **example** **`tabindex="-1"`** on the **header** **removes** it from **sequential** **focus** **navigation**, and **`tabindex="-1"`** on **children** is **not** a **substitute** for **`inert`** on the **panel** (which **inerts** the **whole** **subtree**). See **Accessibility** **tree** **expectations** below. |
| **Single vs multiple open** | **`swc-accordion`** should support **at most one** expanded item or **multiple** expanded items ([Deque single](https://dequeuniversity.com/library/aria/accordion-single) vs [Deque multiselect](https://dequeuniversity.com/library/aria/accordion-multi)). Behavior must match documented props (e.g. analogous to **`allow-multiple`** on **`sp-accordion`**). |
| **Heading shape (a11y)** | Shadow DOM renders the heading element (`<h2>`–`<h6>` per `level`) wrapping a native **`<button>`** so screen readers get **heading level + button** without **`role="button"`** on the heading ([Inclusive Components](https://inclusive-components.design/collapsible-sections/)). Consumers do not pass a full `<h*>` in light DOM; they supply text and set `level` for the outline. **`heading-level`** / **`level`** property accepts **`2`–`6`** (mirror 1st-gen **`level`** on **`sp-accordion-item`**). |
| **Heading API (1st-gen → 2nd-gen, breaking)** | 1st-gen exposes a string **`label`** attribute (`AccordionItem.label`) rendered into shadow DOM. 2nd-gen preferred is a **default slot** for heading label text. This is a **breaking API change**—call it out in the migration guide and Storybook. Decisions to record in this doc before implementation: (1) is **`label`** retained as a **fallback** during the migration window? (2) **Precedence** when both `label` and slotted nodes are provided (recommend: **slot wins**, with a dev-mode warning). (3) Accepted slot content (text only vs allowing inline phrasing such as `<strong>` / `<code>`). (4) Slot-change handling: re-evaluate accessible name; no focusable descendants are expected inside the label. |
| **Consistency** | Align **`heading-level`** / **`level`** naming, range, and **default** with **[Illustrated message](../illustrated-message/rendering-and-styling-migration-analysis.md)** and **card** (once specified) so teams use **one** mental model for section titles. |
| **Keyboard — Space** | On **`keydown`** / **`keyup`** for **Space** while focus is on the header **`button`**, **`preventDefault()`** so the browser does **not** scroll the page or an **overflow** container; then **toggle** open/closed per APG ([SWC-1487](https://jira.corp.adobe.com/browse/SWC-1487)). |
| **Keyboard — Tab** | Rely on the **normal** **Tab** / **Shift+Tab** order only ([APG example](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/examples/accordion/)). **Do not** use **roving** **`tabindex`** on header **buttons** and **do not** implement **arrow**-key (or **Home** / **End**) moves **only** between **headers**; both conflict with **focus** **inside** **open** **panels** and with **scrolling** when **`preventDefault`** is misapplied to **arrows** on a **header**. |
| **Do not** | Put **`role="button"`** on a **heading** instead of using a **`<button>`** inside the heading ([Inclusive Components](https://inclusive-components.design/collapsible-sections/)). |

### Shadow DOM and cross-root ARIA Issues

- Under the **preferred** pattern (**heading text** slot + **`heading-level`**), the **`<h*>`**, **`<button>`**, and **`role="region"`** panel usually live in the **same** shadow root with **stable internal ids**. **`aria-controls`** and **`aria-labelledby`** should resolve **without** cross-root **IDREF** wiring, matching the APG accordion example shape.
- If a future variant allows more of the header in **light DOM**, document **id** uniqueness, **`aria-controls`** across roots, or **`ElementInternals`** if used.

### Accessibility tree expectations

**Per expanded item**

- **Heading:** **heading** role at **level** from **`heading-level`** / **`level`**; **button** nested inside (Inclusive / APG shape).
- **Trigger:** **button**, name from slotted **label** text (and optional icon **decorative**).
- **`aria-expanded`:** **`true`** when panel is shown, **`false`** when hidden.
- **Panel:** **`role="region"`**, named via **`aria-labelledby`** to the trigger (APG). When the panel is not visible, it must **not** expose interactive descendants in the tab order ([Collapsible sections](https://inclusive-components.design/collapsible-sections/)).

**Panel state matrix**

Pick one mechanism per state. **Do not** mix `tabindex="-1"` sweeps with the values below.

| Item state | Mechanism on the panel | Why |
|---|---|---|
| Open + enabled | Visible; in flow; in tab and AT order. | Normal interaction. |
| **Closed** + enabled | **`hidden`** attribute (or equivalent). | Removes the panel from layout, focus, and the accessibility tree in one step. |
| Open or closed + **disabled** | **`inert`** on the panel node. | `inert` applies to the element and its flat-tree descendants—no focus, no AT activation—without removing it from layout if the design needs it visible. |

**Disabled item**

- **Header** **button:** **`aria-disabled="true"`**; still **focusable** (no HTML **`disabled`** on the **header** **button** for the **default** **disabled** **item** **pattern** above). **Do** **not** set **`tabindex="-1"`** on the **header** to **simulate** **disabled**—that **pulls** the **control** out of the **Tab** **order** and **undermines** **focus** **mode** **testing**; use **`aria-disabled`** **instead**. **Name** and **disabled** **state** are available in the **accessibility** **tree** and in **screen** **reader** **focus** / **browse** where **applicable** ([`aria-disabled`](https://www.w3.org/TR/wai-aria-1.2/#aria-disabled)).
- **Panel** **container:** the **`inert`** **attribute** on the **panel** **node** (when the **item** is **disabled**), so the **panel** and its **descendants** are **inert** per the **HTML** **spec** (no **focus** **navigation** into the **subtree**; see [`inert`](https://html.spec.whatwg.org/multipage/interaction.html#the-inert-attribute)). **Do** **not** rely on **`tabindex="-1"`** on **panel** **content** **instead** of **`inert`**—**`inert`** applies to the **element** and its **flat** **tree** **descendants** in one **step**.

**Collapsed panels**

- Content **hidden** from **both** sight and accessibility where appropriate (**`hidden`** attribute or equivalent), consistent with implementation.

### Keyboard and focus

- **Tab / Shift+Tab:** Move through all focusable elements in document order: every header **button** and any focusable content in open panels ([APG example](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/examples/accordion/)). **Do not** add roving `tabindex` that leaves only one header in the tab sequence; that pattern conflicts with open panels that contain links, fields, and other widgets.
- **Space / Enter:** With focus on the header **button**, **expand** or **toggle** the panel as in the APG; for **Space**, use **`preventDefault()`** on the key that **activates** the **button** so the view does not scroll instead of toggling (see **[SWC-1487](https://jira.corp.adobe.com/browse/SWC-1487)**). **Do not** add handlers that use **`preventDefault()`** on **ArrowUp** / **ArrowDown** (or **Home** / **End**) on a header to move only between header buttons— that can **block** page or scroll-container scrolling when the user’s intent is to **scroll**, not to change which header is **focused**.
- **Omit (by design):** Roving `tabindex` and optional header-only **arrow** / **Home** / **End** keyboard recipes sometimes described elsewhere. **Accessibility** **Engineering** guidance: keep keyboard behavior aligned with the [APG accordion example](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/examples/accordion/) (Tab, Shift+Tab, Space, Enter) so open panels with many focusable children stay usable, and so arrow keys are not captured for the wrong purpose when focus is on a header.
- **Disabled** items: **header** **button** **stays** in the **Tab** **order** and uses **`aria-disabled="true"`**; **Space** / **Enter** / **click** do **not** **toggle**. **Do not** use the HTML **`disabled`** **attribute** on the **header** **button** as the **only** **way** to **disable** if that would **drop** the **header** from **Tab** in your **target** **browsers**—**`aria-disabled`** **preserves** **focus** and **AT** **exposure** in **line** with this **doc**. **Do** **not** use **`tabindex="-1"`** **in** **place** of **`aria-disabled`** (header) or **`inert`** (panel). The **panel** uses **`inert`** so its **subtree** is not **interactive**.

---

## Testing

### Automated tests

| Kind of test | What to check |
|--------------|----------------|
| **Unit** | **`aria-expanded`** toggles with open state; **`aria-controls`** id matches panel; panel **`role`** and **`aria-labelledby`**; **disabled** items: **`aria-disabled`** on **header** **`button`**, **`inert`** on **panel** (assert **no** **`tabindex="-1"`** **substitute** for that **pair**); **activation** blocked; **Space** on enabled header calls **`preventDefault()`** and toggles without unintended scroll. |
| **aXe + Storybook** | **WCAG 2.x** rules on accordion stories (single vs multiple open, disabled item). |
| **Playwright ARIA snapshots** | Snapshot **tree** for open/closed items; **`heading`** role **level** changes when **`heading-level`** / **`level`** changes. |
| **Keyboard** | **Tab** / **Shift+Tab** through all focusables; **no** roving `tabindex` on headers; **no** default **arrow**-key “header-only” **navigation** that could **interfere** with **scroll**; **Space** on header **`preventDefault`** + **toggle** per [SWC-1487](https://jira.corp.adobe.com/browse/SWC-1487); **Enter** per APG. |

---

## Summary checklist

- [ ] Docs and Storybook show **APG-aligned** markup: **button**, **`aria-expanded`**, **`aria-controls`**, **`role="region"`** + **`aria-labelledby`** on the panel.
- [ ] **Preferred** pattern documented: **heading label** via **slot**, **`heading-level`** / **`level`** (`2`–`6`); shadow renders **`<h*>` > `<button>`**; alignment with **illustrated message** / **card**.
- [ ] **Single** vs **multiple** expanded sections matches product props and mirrors **Deque** behavior where applicable.
- [ ] No **`role="button"`** on the heading element; shadow DOM uses **`<button>`** inside **`<h2>`–`<h6>`**.
- [ ] **Keyboard** and **disabled** behavior covered by tests and docs; **Space** on the header **`preventDefault()`** + **toggle** (no spurious scroll in overflow layouts). **No** roving `tabindex` on headers; **no** default arrow-key / Home / End “next header” behavior that blocks scroll; **Tab** is the main way to move between headers and in-panel focusables, matching the [APG accordion example](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/examples/accordion/).
- [ ] **Disabled** **items:** **header** uses **`aria-disabled="true"`** (focusable, no toggle); **panel** **container** uses **`inert`** so **subtree** is inert; **no** **`tabindex="-1"`** **instead** of that **pair**; verify with **screen** **reader** **focus** **mode** and **unit** / **aXe** where **applicable**.
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
- [WAI-ARIA 1.2: `aria-disabled` (state)](https://www.w3.org/TR/wai-aria-1.2/#aria-disabled)
- [HTML: the `inert` attribute](https://html.spec.whatwg.org/multipage/interaction.html#the-inert-attribute)
- [Accordion migration roadmap](./rendering-and-styling-migration-analysis.md)
- [Illustrated message migration roadmap](../illustrated-message/rendering-and-styling-migration-analysis.md)
