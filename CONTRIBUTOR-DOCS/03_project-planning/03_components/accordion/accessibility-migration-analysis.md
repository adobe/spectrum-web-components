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
    - [Why we omit roving tabindex and optional header-only arrows](#why-we-omit-roving-tabindex-and-optional-header-only-arrows)
    - [Guidelines that apply](#guidelines-that-apply)
- [Related 1st-gen accessibility (Jira)](#related-1st-gen-accessibility-jira)
- [Recommendations: `<swc-accordion>` / `<swc-accordion-item>`](#recommendations-swc-accordion--swc-accordion-item)
    - [ARIA roles, states, and properties](#aria-roles-states-and-properties)
    - [Header label, optional actions, and Figma vs React Spectrum](#header-label-optional-actions-and-figma-vs-react-spectrum)
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

This doc explains how **`swc-accordion`** and **`swc-accordion-item`** should behave for **accessibility**. The target is **WCAG 2.2 Level AA**. It complements the accordion **rendering-and-styling** migration doc and reflects the **accordion** pattern in the [ARIA Authoring Practices Guide (APG)](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/), Deque’s **single** vs **multiselect** examples, and [Heydon Pickering’s collapsible sections](https://inclusive-components.design/collapsible-sections/) guidance (**`<button>`** inside a real **`<h*>`**; do not put **`role="button"`** on the heading element). The **preferred** implementation uses a **slot for the section label** (into the disclosure **`<button>`**) plus a **`heading-level`** property so shadow DOM can render **`<h*>` > `<button>`** with Spectrum styling. **Optional** header **direct actions** use a **second** slot—**working name `slot="actions"`**, **final slot name not frozen**—see [Header label, optional actions, and Figma vs React Spectrum](#header-label-optional-actions-and-figma-vs-react-spectrum).

### Also read

[Accordion migration plan](./migration-plan.md) for DOM, styling, API decisions, and sequencing.

[Illustrated message migration roadmap](../illustrated-message/rendering-and-styling-migration-analysis.md) — when aligning **heading / title** APIs across components. A **card** migration roadmap should be treated the same way once it exists under this section.

Spectrum 2 **accordion** visuals (including direct actions): [S2 — Web (desktop scale): Accordion (Figma)](https://www.figma.com/design/Mngz9H7WZLbrCvGQf3GnsY/S2---Web--Desktop-scale-?node-id=124732-6479).

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
- **Keyboard:** The [APG accordion example](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/examples/accordion/) **Keyboard Support** uses **Tab** / **Shift+Tab** through all focusable elements (header **buttons** and controls inside open panels) and **Space** or **Enter** on a header to expand or collapse per your model. **Do not** implement roving `tabindex` on header **buttons**—it gets confusing when open panels contain other focusable content, and the APG example does not use it. The APG pattern’s main page documents **Enter** and **Space** on the header; “move between headers only” with **Up** / **Down** / **Home** / **End** appears as an **optional** pattern in some materials, but **this project does not** implement that: it usually does not reduce effort much unless each panel is full of focusables, and calling **`preventDefault()`** on **vertical** **arrows** at a header can **block** **scrolling** when the user meant to **scroll** the page, not move to another header. **Space** on the header **button** should still use **`preventDefault()`** for **activation** so **Space** does not scroll (see **[SWC-1487](https://jira.corp.adobe.com/browse/SWC-1487)**); that is separate from arrow keys used for scroll or caret movement. See [Why we omit roving tabindex and optional header-only arrows](#why-we-omit-roving-tabindex-and-optional-header-only-arrows) for the project rationale in one place.
- **Inclusive Components:** Prefer **`<h*><button>…</button></h*>`** so the control stays a **real button** and the **heading level** is preserved for navigation—**do not** put **`role="button"`** on the heading element ([Collapsible sections](https://inclusive-components.design/collapsible-sections/)).

### Why we omit roving tabindex and optional header-only arrows

**Roving tabindex on accordion headers** is easy to get wrong and **confusing** when an open panel contains links, fields, or other focusables: sequential focus no longer matches a simple “every header button is in the tab order” model, and users must reason about which header is “current” in a roving group while still moving into panel content.

The **WAI-ARIA Authoring Practices Guide** treats **Up**, **Down**, **Home**, and **End** to move **only between accordion header buttons** as an **optional** pattern, not the default keyboard story in the [APG accordion example](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/examples/accordion/) (which relies on **Tab** / **Shift+Tab**). Unless each panel contains **a large number** of interactive controls, that optional shortcut **rarely reduces navigation effort** enough to justify itself compared with **Tab** between header buttons.

It is also **risky** to handle **ArrowUp** / **ArrowDown** (or **Home** / **End**) on a header with **`preventDefault()`** so the browser moves focus to another header: the user may have intended to **scroll the page** or a **scrollable ancestor**, not to change which header is focused. Mis-handling vertical arrows trains the implementation to fight **scroll** behavior. (**Space** on the header is different: use **`preventDefault()`** there so activation does not scroll; see **[SWC-1487](https://jira.corp.adobe.com/browse/SWC-1487)**.)

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
| **Heading API (1st-gen → 2nd-gen, breaking)** | 1st-gen exposes a string **`label`** attribute (`AccordionItem.label`) rendered into shadow DOM. **2nd-gen decision (clean break, same posture as other migrated components):** ship **no** **`label`** on **`swc-accordion-item`** — heading copy **only** via the **heading / label slot** (exact slot name at API freeze). **Do not** add a deprecated **`label`** path or dual-source precedence; document migration as **`label="…"` → slotted heading** in the migration guide and Storybook so later phases do not reintroduce **`label`**. Remaining decisions before implementation: (1) Accepted slot content (text only vs allowing inline phrasing such as `<strong>` / `<code>`). (2) Slot-change handling: re-evaluate accessible name; **no** **focusable** descendants inside the **label** slot—interactive controls belong in the **optional header affordance** slot (**working name `actions`**—see [Header label, optional actions, and Figma vs React Spectrum](#header-label-optional-actions-and-figma-vs-react-spectrum)). (3) Disabled / **`inert`** interaction with slotted actions per [migration plan](./migration-plan.md). |
| **Consistency** | Align **`heading-level`** / **`level`** naming, range, and **default** with **[Illustrated message](../illustrated-message/rendering-and-styling-migration-analysis.md)** and **card** (once specified) so teams use **one** mental model for section titles. |
| **Keyboard — Space** | On **`keydown`** / **`keyup`** for **Space** while focus is on the header **`button`**, **`preventDefault()`** so the browser does **not** scroll the page or an **overflow** container; then **toggle** open/closed per APG ([SWC-1487](https://jira.corp.adobe.com/browse/SWC-1487)). |
| **Keyboard — Tab** | Rely on the **normal** **Tab** / **Shift+Tab** order only ([APG example](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/examples/accordion/)). **Do not** use **roving** **`tabindex`** on header **buttons** and **do not** implement **arrow**-key (or **Home** / **End**) moves **only** between **headers**; both conflict with **focus** **inside** **open** **panels** and with **scrolling** when **`preventDefault`** is misapplied to **arrows** on a **header**. |
| **Do not** | Put **`role="button"`** on a **heading** instead of using a **`<button>`** inside the heading ([Inclusive Components](https://inclusive-components.design/collapsible-sections/)). |

### Header label, optional actions, and Figma vs React Spectrum

**Product / API shape**

- **Figma** ([S2 — Accordion](https://www.figma.com/design/Mngz9H7WZLbrCvGQf3GnsY/S2---Web--Desktop-scale-?node-id=124732-6479)) shows **direct actions** as **explicit** toggles such as **show direct actions**, **show switch**, and **show action button**—a fixed matrix for **design exploration**. In practice **show direct actions** reads as the **general** “**stuff beside the title**” region, while the other toggles control **which** control appears in that region.
- **React Spectrum** exposes **[`AccordionItemHeader`](https://react-spectrum.adobe.com/Accordion#accordionitemheader)** with **open-ended** children (any **ReactNode**)—see [React Spectrum — Accordion](https://react-spectrum.adobe.com/Accordion). **[`AccordionItemPanel`](https://react-spectrum.adobe.com/Accordion#accordionitempanel)** documents optional **`aria-describedby`** / **`aria-labelledby`** on the panel when authors need richer panel labeling.

**Design / engineering consensus (accessibility)**

- **Spectrum design + accessibility engineering** align that **SWC** should **own** optional **direct actions** in the **DOM** for **ARIA** and **focus** reasons: interactive affordances (**Edit**, **switch**, etc.) must live **outside** the disclosure **`<button>`** (and **not** inside the same **click** / **keyboard** target as **expand/collapse**). Putting them **inside** the heading **button** mangles **names**, **roles**, and **activation**, and adds **awkward** **tab** stops **before** the **panel** in ways that are hard to explain to screen reader users.
- Some **Spectrum CSS** reference markup places affordances **inside** a **heading** tag for **layout** only; **SWC** must **not** copy that if it would put **focusable** widgets **inside** the disclosure **`<button>`**. Prefer this shadow DOM shape: **`<h*>`** wrapping **only** the disclosure **`<button>`** (named from the **label** slot), with the actions container as a **sibling to `<h*>`** (not inside it) so the heading's accessible name stays clean:

  ```html
  <h3><button id="header" aria-expanded="..." aria-controls="content">...</button></h3>
  <div class="actions"><slot name="actions"></slot></div>
  <div id="content" role="region" aria-labelledby="header"><slot></slot></div>
  ```

  Any content inside `<h*>` — including a sibling div to the button — can bleed into the heading's accessible name, so the actions container must live outside the heading element entirely. **Tab** order stays **disclosure** → **slotted actions** → **panel** when expanded, matching intent from the design thread.
- **Slots:** one for the **section label** (projected into the disclosure **`<button>`**—**no** **focusable** descendants in that slot) and a **second** slot for **optional** chrome beside the title. **Working slot name `actions`**; final name is not frozen ([migration plan](./migration-plan.md#open--api-and-scope)).

**`aria-describedby` in consumer docs (Storybook) — required**

- **Consumer-facing** Storybook (and usage docs) **must** include an example where the **label** region exposes a stable **`id`** and the **optional** slot’s **wrapper** uses **`aria-describedby`** pointing at that **`id`**, so screen reader users hear how **“Edit”** (or a **switch**) relates to **“Bellows”** / the section title. Keep **`id`** values **unique** in the document. **`slot="actions"`** below is **illustrative** until the slot name is frozen:

```html
<swc-accordion-item>
  <div id="bellows-heading" slot="label">Bellows</div>
  <div slot="actions" aria-describedby="bellows-heading">
    <button type="button">Edit</button>
  </div>
  <div>The bellows is the expandable section in the middle of the accordion.</div>
</swc-accordion-item>
```

- If **`aria-describedby`** targets live in **light DOM** and the disclosure **`<button>`** stays in **shadow DOM**, the same **cross-root** **IDREF** caveats as other components apply—prefer wiring **descriptions** where **id** and **referrer** share a **root**, or document supported patterns explicitly.

### Shadow DOM and cross-root ARIA Issues

- Under the **preferred** pattern (**heading text** slot + **`heading-level`**), the **`<h*>`**, **`<button>`**, and **`role="region"`** panel usually live in the **same** shadow root with **stable internal ids**. **`aria-controls`** and **`aria-labelledby`** should resolve **without** cross-root **IDREF** wiring, matching the APG accordion example shape.
- If a future variant allows more of the header in **light DOM**, document **id** uniqueness, **`aria-controls`** across roots, or **`ElementInternals`** if used.

### Accessibility tree expectations

**Per expanded item**

- **Heading:** **heading** role at **level** from **`heading-level`** / **`level`**; **button** nested inside (Inclusive / APG shape).
- **Trigger:** **button**, name from slotted **label** text (and optional **decorative** icon on the disclosure control only).
- **Optional slotted header actions:** If the second slot (**working name `actions`**, **final name TBD**) hosts **buttons**, **switches**, or other widgets, each keeps its **own** **role** and **accessible name**—**not** merged into the disclosure **button**. **Tab** order follows **DOM** order; document the expected order (disclosure vs actions vs panel) in Storybook. Do **not** place those widgets **inside** the disclosure **`<button>`**.
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
| **aXe + Storybook** | **WCAG 2.x** rules on accordion stories (single vs multiple open, disabled item, **`quiet`**, host **`disabled`**). Include at least one story with **optional header actions** (e.g. **Edit** **button**, **switch**) and verify **Tab** order + **`aria-describedby`** example from [Header label, optional actions, and Figma vs React Spectrum](#header-label-optional-actions-and-figma-vs-react-spectrum). |
| **Playwright ARIA snapshots** | Snapshot **tree** for open/closed items; **`heading`** role **level** changes when **`heading-level`** / **`level`** changes; when header actions exist, disclosure **`button`** name is **separate** from slotted **action** controls. |
| **Keyboard** | **Tab** / **Shift+Tab** through all focusables including slotted header **actions** before panel content when DOM order places them there; **no** roving `tabindex` on headers; **no** default **arrow**-key “header-only” **navigation** that could **interfere** with **scroll**; **Space** on header **`preventDefault`** + **toggle** per [SWC-1487](https://jira.corp.adobe.com/browse/SWC-1487); **Enter** per APG. |

---

## Summary checklist

- [ ] Docs and Storybook show **APG-aligned** markup: **button**, **`aria-expanded`**, **`aria-controls`**, **`role="region"`** + **`aria-labelledby`** on the panel.
- [ ] **Preferred** pattern documented: **heading label** via **slot**, **`heading-level`** / **`level`** (`2`–`6`); shadow renders **`<h*>` > `<button>`**; alignment with **illustrated message** / **card**.
- [ ] **Single** vs **multiple** expanded sections matches product props and mirrors **Deque** behavior where applicable.
- [ ] No **`role="button"`** on the heading element; shadow DOM uses **`<button>`** inside **`<h2>`–`<h6>`**.
- [ ] **Keyboard** and **disabled** behavior covered by tests and docs; **Space** on the header **`preventDefault()`** + **toggle** (no spurious scroll in overflow layouts). **No** roving `tabindex` on headers; **no** default arrow-key / Home / End “next header” behavior that blocks scroll; **Tab** is the main way to move between headers and in-panel focusables, matching the [APG accordion example](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/examples/accordion/).
- [ ] **Disabled** **items:** **header** uses **`aria-disabled="true"`** (focusable, no toggle); **panel** **container** uses **`inert`** so **subtree** is inert; **no** **`tabindex="-1"`** **instead** of that **pair**; verify with **screen** **reader** **focus** **mode** and **unit** / **aXe** where **applicable**.
- [ ] **Optional header actions** (second slot—**working name `actions`**, **final name not frozen**): disclosure **`button`** stays **separate** from slotted widgets; **consumer** Storybook **must** include the **`aria-describedby`** pattern tying the affordance wrapper to the **label** **`id`** ([Header label, optional actions, and Figma vs React Spectrum](#header-label-optional-actions-and-figma-vs-react-spectrum)); **Tab** / snapshots cover **switch** + **button** cases.
- [ ] **References** below include APG, Deque, and Inclusive Components links used in this doc.

---

## References

- [APG: Accordion pattern](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/)
- [APG: Accordion example](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/examples/accordion/)
- [Deque University: Accordion (Single)](https://dequeuniversity.com/library/aria/accordion-single)
- [Deque University: Accordion (Multiselect)](https://dequeuniversity.com/library/aria/accordion-multi)
- [Inclusive Components: Collapsible sections](https://inclusive-components.design/collapsible-sections/)
- [Inclusive Components: Cards — pseudo content trick](https://inclusive-components.design/cards/#thepseudocontenttrick) (header affordances beside title)
- [React Spectrum — Accordion](https://react-spectrum.adobe.com/Accordion), [`AccordionItemHeader`](https://react-spectrum.adobe.com/Accordion#accordionitemheader), and [`AccordionItemPanel`](https://react-spectrum.adobe.com/Accordion#accordionitempanel)
- [Spectrum CSS — Accordion story (actions + switches)](https://spectrumcss.z13.web.core.windows.net/pr-2352/index.html?path=/story/components-accordion--default&args=hasActionButtons:!true;hasSwitches:!true) (layout reference; verify **a11y** in SWC)
- [S2 — Web (desktop scale): Accordion (Figma)](https://www.figma.com/design/Mngz9H7WZLbrCvGQf3GnsY/S2---Web--Desktop-scale-?node-id=124732-6479)
- [WAI-ARIA 1.2](https://www.w3.org/TR/wai-aria-1.2/)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [Using ARIA (read this first)](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/)
- [WAI-ARIA 1.2: `aria-disabled` (state)](https://www.w3.org/TR/wai-aria-1.2/#aria-disabled)
- [HTML: the `inert` attribute](https://html.spec.whatwg.org/multipage/interaction.html#the-inert-attribute)
- [Accordion migration plan](./migration-plan.md)
- [Illustrated message migration roadmap](../illustrated-message/rendering-and-styling-migration-analysis.md)
