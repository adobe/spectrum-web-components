<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Infield Button / Infield button accessibility migration analysis

<!-- Document title (editable) -->

# Infield button accessibility migration analysis

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Overview](#overview)
    - [Also read](#also-read)
    - [What it is](#what-it-is)
    - [When to use something else](#when-to-use-something-else)
    - [What it is not](#what-it-is-not)
    - [Program (2nd-gen, Jira snapshot)](#program-2nd-gen-jira-snapshot)
- [ARIA and WCAG context](#aria-and-wcag-context)
    - [Pattern in the APG](#pattern-in-the-apg)
    - [Guidelines that apply](#guidelines-that-apply)
- [Related 1st-gen accessibility (Jira)](#related-1st-gen-accessibility-jira)
- [1st-gen implementation notes (avoid in 2nd-gen)](#1st-gen-implementation-notes-avoid-in-2nd-gen)
- [Recommendations: `<swc-infield-button>`](#recommendations-swc-infield-button)
    - [ARIA roles, states, and properties](#aria-roles-states-and-properties)
    - [Shadow DOM and cross-root ARIA Issues](#shadow-dom-and-cross-root-aria-issues)
    - [Form-associated buttons (`submit` / `reset`) — deferred](#form-associated-buttons-submit--reset--deferred)
    - [Accessibility tree expectations](#accessibility-tree-expectations)
    - [Live regions, loading, and announcements](#live-regions-loading-and-announcements)
    - [Keyboard and focus](#keyboard-and-focus)
- [Testing](#testing)
    - [Automated tests](#automated-tests)
- [Summary checklist](#summary-checklist)
- [References](#references)

</details>

<!-- Document content (editable) -->

## Overview

This doc describes how **`swc-infield-button`** should behave for **accessibility** in 2nd-gen, targeting **WCAG 2.2 Level AA**. It pairs with [In-field button migration roadmap](./rendering-and-styling-migration-analysis.md) for layout, tokens, and DOM. **`swc-infield-button`** is an **icon-only** control that sits **inside** or beside **field** chrome (search clear, combobox disclosure, and similar). It **extends** shared **`ButtonBase`** ([`Button.base.ts`](../../../../2nd-gen/packages/core/components/button/Button.base.ts)) with in-field **visual** styling—not a separate keyboard widget type. There is **no** [React Spectrum Infield Button](https://react-spectrum.adobe.com/) component; align semantics with [Button accessibility migration analysis](../button/accessibility-migration-analysis.md) and Spectrum 2 token specs ([S2 Token specs — In-field button (Figma)](https://www.figma.com/design/eoZHKJH9WZLbrCvGQf3GnsY/S2-Token-specs?node-id=814-8689)).

**2nd-gen API direction:** **`accessible-label`** is **required** (icon-only). **`FocusgroupNavigationController`** is **not** on **`swc-infield-button`**—the **parent field host** navigates among the **input**, in-field buttons, and other **siblings**. **`block`** and **`inline`** are **removed**—1st-gen used them mainly to adjust **corner rounding** and edge attachment for **stacked** stepper halves and **inline** groups; Spectrum 2 uses a **consistent corner radius** on in-field buttons, so **stepper** and other multi-affordance fields compose layout in the **parent host** (DOM order, field CSS) without **`block="start"`** / **`block="end"`** or **`inline="start"`** / **`inline="end"`** on each button ([migration roadmap](./rendering-and-styling-migration-analysis.md)). **`pending`** is **not** on **`swc-infield-button`**—the **parent field host** owns field-level **`pending`** (busy UI, announcements, and disabling slotted affordances). 1st-gen **`sp-infield-button`** may still list **`pending`** from **`ButtonBase`** on the public site—do **not** carry that API forward on **`swc-infield-button`**. **`disabled`** may be set on **`swc-infield-button`** **or** applied by a **parent** host (for example **`swc-textfield`**, **`swc-number-field`**, **`swc-picker`**) that passes **`disabled`** to slotted controls—both paths must yield a **non-interactive**, correctly named **button** in the accessibility tree.

### Also read

[In-field button migration roadmap](./rendering-and-styling-migration-analysis.md). Shared **`ButtonBase`** behavior used by **`swc-infield-button`** (**`accessible-label`**, **`disabled`**, focus delegation—not **`pending`** on this component; see **parent** field hosts for **`pending`** and **focus group** navigation): [Button accessibility migration analysis](../button/accessibility-migration-analysis.md), [Button migration plan](../button/migration-plan.md). Field composition: [Textfield](../textfield/rendering-and-styling-migration-analysis.md), [Number field](../number-field/rendering-and-styling-migration-analysis.md), [Picker button](../picker-button/rendering-and-styling-migration-analysis.md). Composite keyboard behavior: [Focus management](../../../01_contributor-guides/14_focus-management.md) (**`FocusgroupNavigationController`** on the **field** host, not on **`swc-infield-button`**). Spectrum 2 visuals and tokens: [S2 Token specs — In-field button (Figma)](https://www.figma.com/design/eoZHKJH9WZLbrCvGQf3GnsY/S2-Token-specs?node-id=814-8689).

### What it is

- **`swc-infield-button`:** A compact **icon-only** **button** embedded in **field** UI. The **custom element host** must **not** be the sole **`role="button"`** tab stop: use **`delegatesFocus`** (per **`ButtonBase`**) so a **real** inner **`<button type="button">`** receives focus and activation keys. The **accessible name** comes from **`accessible-label`** (mapped to **`aria-label`** on the inner **`<button>`**)—there is **no** visible text label in the default product shape.
- **Layout:** **Placement** (start/end of field, stepper pairs, disclosure, clear) is determined by the **parent field** structure and Spectrum 2 CSS—not **`inline`** or **`block`** on **`swc-infield-button`**. **`quiet`** selects the reduced-emphasis visual variant per [S2 Token specs — In-field button (Figma)](https://www.figma.com/design/eoZHKJH9WZLbrCvGQf3GnsY/S2-Token-specs?node-id=814-8689).
- **Disabled:** Either **`disabled`** on **`swc-infield-button`** or **`disabled`** (or equivalent) on the **parent** field that sets **`disabled`** on the child—both must remove activation and expose **disabled** semantics on the **focus target** (native **`disabled`** on the inner **`<button>`** when the control should leave the tab order, unless product standardizes **`aria-disabled`** for a specific case—match **`ButtonBase`** / **`swc-button`**).
- **Pending:** **`swc-infield-button`** does **not** expose **`pending`** or **`pending-label`**. When the **field** is **pending**, the **parent host** (for example **`swc-textfield`**, **`swc-number-field`**) owns busy semantics—typically **`disabled`** (or equivalent) on slotted **`swc-infield-button`** children plus field-level loading chrome and naming on the **input** / **field**—not a spinner or **`aria-disabled`** busy state on the in-field **button** itself.
- **Focus chrome:** Spectrum 2 treats in-field buttons as part of the **field** focus story—the **parent** often shows the **focus-visible** ring on the **whole** control while the in-field button **inherits** that context ([migration roadmap](./rendering-and-styling-migration-analysis.md) **Focus state inheritance**). The inner **`<button>`** must still be **keyboard** reachable and **named**; do **not** rely on **`role="presentation"`** on the inner **`<button>`** (1st-gen / CSS-only samples used that pattern for styling—**2nd-gen** keeps **button** semantics).
- **Keyboard among siblings:** **`swc-infield-button`** does **not** ship **`FocusgroupNavigationController`** or roving **`tabindex`**. The **parent field host** (for example **`swc-number-field`**, **`swc-textfield`**) is responsible for **focus group** navigation among the **input**, one or more **`swc-infield-button`** instances, and other slotted affordances—**Tab** order, optional **arrow** keys between stepper buttons, and coordination with the **textbox** / **combobox** role per [Keyboard navigation inside components](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#keyboardnavigationinsidecomponents).

### When to use something else

- **Default** page actions, dialogs, toolbars → [Button](../button/accessibility-migration-analysis.md) / **`swc-button`**.
- **Compact** toolbar strips → [Action button migration roadmap](../action-button/rendering-and-styling-migration-analysis.md) / **`swc-action-button`**.
- **Picker** trigger that is not in-field chrome → [Picker button](../picker-button/rendering-and-styling-migration-analysis.md).
- **Navigation** → [Link](../link/accessibility-migration-analysis.md) or native **`<a href>`**—**not** **`href`** on **`swc-infield-button`**.

### What it is not

- **Not a position-attribute layout control:** **`block`** and **`inline`** are **not** part of 2nd-gen **`swc-infield-button`**. They existed in 1st-gen to drive **border-radius** and padding for **stacked** stepper halves and **inline** edge attachment; S2 **stepper** and other patterns use **consistent** button rounding composed by the **field**—do **not** document **`block`** or **`inline`** in Storybook or migration guides; close or supersede audit findings tied only to **stacked** **`sp-infield-button`** layouts ([SWC-1130](https://jira.corp.adobe.com/browse/SWC-1130), [SWC-1197](https://jira.corp.adobe.com/browse/SWC-1197)).
- **Not a link:** **No** **`href`**, **no** **`LikeAnchor`** / anchor proxying ([Button accessibility migration analysis](../button/accessibility-migration-analysis.md)).
- **Not its own pending / busy control:** **`swc-infield-button`** does **not** expose **`pending`** or **`pending-label`**. **Field** hosts handle **`pending`** for the composed control (disable in-field affordances, show field-level busy UI, update **input** / **field** accessible name)—same ownership model as **parent-driven** **`disabled`**. Standalone actions outside a field use **`swc-button`** **`pending`** ([Button accessibility migration analysis](../button/accessibility-migration-analysis.md)).
- **Not a focus-group container:** **`swc-infield-button`** does **not** implement **`FocusgroupNavigationController`** or manage roving **`tabindex`** for **sibling** in-field buttons. The **field** host owns that composite keyboard behavior ([Focus management](../../../01_contributor-guides/14_focus-management.md)).

### Program (2nd-gen, Jira snapshot)

Planning and migration work is tracked in Adobe Jira with **`gen2`** labels (for example [SWC-2105](https://jira.corp.adobe.com/browse/SWC-2105) **epic**, [SWC-2106](https://jira.corp.adobe.com/browse/SWC-2106) accessibility recommendations, [SWC-2107](https://jira.corp.adobe.com/browse/SWC-2107) migration plan analysis, [SWC-2108](https://jira.corp.adobe.com/browse/SWC-2108) implementation). Shared **button** / **`ButtonBase`** work ([SWC-1873](https://jira.corp.adobe.com/browse/SWC-1873) **epic**, [SWC-1874](https://jira.corp.adobe.com/browse/SWC-1874) a11y recommendations) applies to **`swc-infield-button`** through **`ButtonBase`**. Those **`gen2`** items are **out of scope** for the **Related 1st-gen** table below.

---

## ARIA and WCAG context

### Pattern in the APG

- [Button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/) — **`swc-infield-button`** is a **button** with an **accessible name** (**`accessible-label`**); **Enter** / **Return** or **Space** activates when focused.
- [Text field pattern](https://www.w3.org/WAI/ARIA/apg/patterns/textbox/) and composite field patterns — the **in-field** control is usually **composed inside** a **labeled** field; the **field** supplies **`aria-labelledby`** / **`aria-describedby`** for the **input**, while each **`swc-infield-button`** still needs its **own** **name** (for example **“Clear”**, **“Show menu”**).
- No dedicated APG **“in-field button”** pattern and **no** React Spectrum counterpart—treat as **icon-only button** + **field** composition.

### Guidelines that apply

| Idea | Plain meaning |
| --- | --- |
| [Name, role, value (WCAG 4.1.2)](https://www.w3.org/TR/WCAG22/#name-role-value) | **Role** **button** on the **focused** inner **`<button>`**; **name** from **`accessible-label`**; **`disabled`** on that target when applicable—not duplicated on a misleading **host** role. |
| [Keyboard (WCAG 2.1.1)](https://www.w3.org/TR/WCAG22/#keyboard) | Each **`swc-infield-button`**: **Enter** / **Space** activates when focused. **Tab** and **arrow** movement among the **input**, in-field buttons, and other field parts are defined by the **parent host** ([Keyboard navigation inside components](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#keyboardnavigationinsidecomponents)). |
| [Focus visible (WCAG 2.4.7)](https://www.w3.org/TR/WCAG22/#focus-visible) | **Visible** focus may appear on the **parent** field per S2; the **inner** **`<button>`** must still meet **focus visible** requirements when it holds focus—coordinate with field stories so testers do not report “missing” focus when focus is drawn on the **wrapper**. |
| [Use of color (WCAG 1.4.1)](https://www.w3.org/TR/WCAG22/#use-of-color) | **Icon** and **background** states (**default**, **hover**, **down**, **disabled**) must not be the **only** cue for **purpose** or **state**—the **accessible name** carries meaning ([SWC-1130](https://jira.corp.adobe.com/browse/SWC-1130) called out **stacked** layouts; still applies to **hover** / **down** affordances). |
| [Non-text contrast (WCAG 1.4.11)](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast) | **Icon** and **focus** indicators meet **3:1** where applicable; **disabled** chrome uses **`disabled-content-color`** / **`disabled-background-color`** tokens per [S2 Token specs — In-field button (Figma)](https://www.figma.com/design/eoZHKJH9WZLbrCvGQf3GnsY/S2-Token-specs?node-id=814-8689). |
| [Target size (WCAG 2.5.8)](https://www.w3.org/TR/WCAG22/#target-size-minimum) | Hit target sizes follow **`component-height-*`** / field metrics; document exceptions if **compact** sizes apply. |

**Bottom line:** **`swc-infield-button`** = **icon-only** **`ButtonBase`** **button** with **`accessible-label`**, composed inside **fields**; **no** **`block`** / **`inline`**; **no** **`href`**; **no** **`pending`** on the **button**—**parent** **field** host owns **`pending`**, **layout**, and **focus group** navigation among **siblings**; **disabled** on **self** or **parent**.

---

## Related 1st-gen accessibility (Jira)

Adobe Jira is authoritative for current status and resolution; refresh cells when you triage. **gen2**-labeled program tickets are omitted here (see **Program (2nd-gen)** above). Audit epic **[SWC-872](https://jira.corp.adobe.com/browse/SWC-872)** is omitted per contributor-doc rules.

| Jira | Type | Status (snapshot) | Resolution (snapshot) | Summary |
| --- | --- | --- | --- | --- |
| [SWC-1130](https://jira.corp.adobe.com/browse/SWC-1130) | Bug | To Do | Unresolved | Color alone conveys state — `sp-infield-button` (stacked buttons); **obsolete** for 2nd-gen when **`block`** / **`inline`** are removed—verify no regression on **field-composed** disclosure / clear / stepper patterns |
| [SWC-1197](https://jira.corp.adobe.com/browse/SWC-1197) | Bug | Done | Working As Designed | Target size — `sp-infield-button` (stacked buttons) |
| [SWC-1039](https://jira.corp.adobe.com/browse/SWC-1039) | Bug | Done | Fixed | `button-base` / `aria-label` not updating on change — applies via **`ButtonBase`** |
| [SWC-1333](https://jira.corp.adobe.com/browse/SWC-1333) | Bug | To Do | Unresolved | `sp-button` / `aria-label` support — superseded by **`accessible-label`** on **`ButtonBase`** |
| [SWC-514](https://jira.corp.adobe.com/browse/SWC-514) | Story | Done | Working As Designed | S2 Foundations: In field button — updates to current SWC implementation |
| [SWC-1218](https://jira.corp.adobe.com/browse/SWC-1218) | Story | Done | Fixed | docs(Field label, Help text, Picker button, In-field button, In-field progress circle): migration documentation |
| [SWC-387](https://jira.corp.adobe.com/browse/SWC-387) | Story | Done | Won't Fix | docs(infield-button): audit documentation |

---

## 1st-gen implementation notes (avoid in 2nd-gen)

**`sp-infield-button`** extends 1st-gen **`ButtonBase`** with **`block`**, **`inline`**, **`quiet`**, and **`label`** (maps to **`aria-label`**); public docs may list **`pending`** from **`ButtonBase`**. 1st-gen **`block`** / **`inline`** chiefly adjusted **corner radius** and edge padding for **stacked** and **inline** groups. 2nd-gen should **drop** **`block`**, **`inline`**, and **`pending`** on **`swc-infield-button`** (let the **field** host own **`pending`** and **layout**), standardize on **`accessible-label`**, and **not** ship **`href`** / link APIs inherited from older **button** stacks.

```39:51:1st-gen/packages/infield-button/src/InfieldButton.ts
  @property()
  block?: 'start' | 'end';

  @property()
  inline?: 'start' | 'end';

  @property({ type: Boolean, reflect: true })
  quiet = false;
```

**Parent-driven disabled:** Fields pass **`?disabled=${...}`** to **`sp-infield-button`** (for example **`sp-number-field`** disables stepper buttons when the field is **disabled**, **readonly**, or at **min**). 2nd-gen parents should keep **explicit** **`disabled`** on **`swc-infield-button`** rather than assuming CSS-only dimming.

**Parent-driven pending:** When a **field** is **pending**, the **host** should disable or otherwise make **inactive** slotted **`swc-infield-button`** affordances and surface **busy** state on the **field** / **input**—not **`pending`** on each in-field **button**.

**Parent-driven focus group navigation:** When a **field** contains multiple focusable parts (**input**, **clear**, **stepper** pair, **disclosure**), the **field host** wires **`FocusgroupNavigationController`** (or equivalent) so **Tab** / **arrow** behavior among **siblings** matches product and APG guidance—for example **horizontal** arrows between **increment** / **decrement** **`swc-infield-button`** instances. **`swc-infield-button`** stays a plain **button**; it does **not** own the group controller.

**`role="presentation"` on inner `<button>`:** Spectrum 2 CSS samples added **`role="presentation"`** on the **`<button>`** for styling integration—that **removes** **button** semantics from the node that receives events. **2nd-gen** must keep **native** **button** role on the **focus target** (via **`ButtonBase`**), with **field-level** focus styling handled in CSS—not by stripping **role**.

**Position-property audits:** [SWC-1130](https://jira.corp.adobe.com/browse/SWC-1130) and [SWC-1197](https://jira.corp.adobe.com/browse/SWC-1197) target **stacked** **`sp-infield-button`** layouts. Removing **`block`** and **`inline`** matches S2 **consistent corner radius**; re-test **field-composed** **disclosure** / **clear** / **stepper** / **quiet** patterns under [S2 Token specs — In-field button (Figma)](https://www.figma.com/design/eoZHKJH9WZLbrCvGQf3GnsY/S2-Token-specs?node-id=814-8689).

---

## Recommendations: `<swc-infield-button>`

### ARIA roles, states, and properties

| Topic | What to do |
| --- | --- |
| **Prescribed role** | **`role="button"`** on the **inner** native **`<button>`** only (via **`ButtonBase`** + **`delegatesFocus`**). **Host** must **not** duplicate **`role="button"`** as a second tab stop. **Must not** use **`role="presentation"`** on the activatable element. |
| **`accessible-label` (required)** | **Icon-only** **`swc-infield-button`** **must** set **`accessible-label`** (reflected to **`aria-label`** on the inner **`<button>`**). **Do not** rely on **`title`** or **icon** **`alt`** alone. Enforce in dev mode like **`ButtonBase`** when **`hasIcon && !hasLabel && !accessibleLabel`**. |
| **No visible label slot for default product** | **`icon`** slot holds the glyph; decorative icons **`aria-hidden="true"`** when the **name** is only in **`accessible-label`**. If a story shows visible text, treat it as **exceptional** and ensure **name** computation still matches **`ButtonBase`**. |
| **`inline` and `block` removed** | **Do not** implement or document **`inline`** or **`block`**. 1st-gen attributes existed for **corner rounding** and group edges; S2 uses **consistent** in-field button radius—**number-field** steppers and **inline** groups are composed by the **parent field** (DOM + CSS), not per-button position props. Name each control for **function** (**“Clear search”**, **“Increment”**), not **“start”** / **“end”**. |
| **`quiet`** | Visual variant only; **does not** change **role** or **name**. |
| **`disabled` (self)** | **`disabled`** on **`swc-infield-button`** sets native **`disabled`** on the inner **`<button>`** (per **`ButtonBase`**) so the control is **not** activatable and is **skipped** in tab order unless product dictates otherwise. |
| **`disabled` (parent)** | Parent **field** hosts **must** set **`disabled`** on **`swc-infield-button`** when the **field** is disabled (and when a specific affordance is inactive, such as **decrement** at **min**). **Do not** leave an **enabled** **button** inside a **disabled** field. |
| **`pending` (parent host)** | **`swc-infield-button`** does **not** expose **`pending`** or **`pending-label`**. When the **field** is **pending**, the **parent** host (for example **`swc-textfield`**, **`swc-number-field`**) **must** coordinate: set **`disabled`** (or equivalent) on **`swc-infield-button`**, show **field-level** busy UI, and update **input** / **field** naming—**do not** put **`pending`** spinners or **`aria-disabled`** busy semantics on the in-field **button** itself. Document this in **field** a11y guides, not on **`swc-infield-button`** Storybook. |
| **Focus group navigation (parent host)** | **`swc-infield-button`** does **not** ship **`FocusgroupNavigationController`**. The **parent field host** **must** own keyboard navigation among the **input**, **`swc-infield-button`** siblings, and other slotted controls—**Tab** sequence, optional **roving** **`tabindex`** / **arrow** keys for button groups (for example stepper pairs), and **`skipDisabled`** when affordances are inactive. Document and test on **field** components ([Focus management](../../../01_contributor-guides/14_focus-management.md), [Keyboard navigation inside components](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#keyboardnavigationinsidecomponents)). |
| **`href` / link** | **Do not** ship on **`swc-infield-button`**. |
| **Docs** | Storybook and [SWC-2111](https://jira.corp.adobe.com/browse/SWC-2111) consumer guide: **icon-only** + **`accessible-label`**, **parent** **`disabled`** and **parent** **`pending`** patterns, **no** **`block`** / **`inline`** / **`pending`** on **`swc-infield-button`**, **no** React Spectrum counterpart; link [S2 Token specs — In-field button (Figma)](https://www.figma.com/design/eoZHKJH9WZLbrCvGQf3GnsY/S2-Token-specs?node-id=814-8689) and [1st-gen Infield Button docs](https://opensource.adobe.com/spectrum-web-components/components/infield-button/) for **migration** only (note dropped **`block`**, **`inline`**, and **`pending`** vs 1st-gen). |

### Shadow DOM and cross-root ARIA Issues

**Deferred** for **`aria-labelledby`** / **`aria-describedby`** from **light DOM** to the inner **`<button>`**—same **`ButtonBase`** / **[SWC-48](https://jira.corp.adobe.com/browse/SWC-48)** / **[SWC-2033](https://jira.corp.adobe.com/browse/SWC-2033)** path as **`swc-button`** ([Button accessibility migration analysis](../button/accessibility-migration-analysis.md)). **`accessible-label`** on the host covers **icon-only** naming without cross-root **ID** refs.

### Form-associated buttons (`submit` / `reset`) — deferred

**Does not apply** as a primary pattern for **`swc-infield-button`** (field adornments are **`type="button"`** actions). **`submit`** / **`reset`** on **`ButtonBase`** follow the same **deferred** **`ElementInternals`** story as **`swc-button`** if ever exposed—see [SWC-48](https://jira.corp.adobe.com/browse/SWC-48) and [SWC-2034](https://jira.corp.adobe.com/browse/SWC-2034).

### Accessibility tree expectations

**`swc-infield-button` (default, icon-only)**

- **Role:** **button** on the **inner** **`<button>`**.
- **Name:** from **`accessible-label`** / **`aria-label`**.
- **State:** **`disabled`** when **`disabled`** on host, when **parent** has set **`disabled`**, or when **parent** **`pending`** has disabled the affordance—**no** **`pending`** / **`aria-disabled`** busy state **on** **`swc-infield-button`** itself.

**Composed in a field**

- **Field** exposes **textbox** / **combobox** / other role on the **input**; each **`swc-infield-button`** remains a separate **button** in the tree (sibling or slotted), **not** a replacement for the **input** name.
- **Keyboard among siblings** is owned by the **field host**—not by **`swc-infield-button`**. Multiple in-field buttons (for example **increment** / **decrement**) appear as separate **buttons** in the tree; the **parent** decides whether **Tab** visits each control or a **focus group** uses **roving** **`tabindex`** and **arrow** keys between them.

### Live regions, loading, and announcements

**Does not apply on `swc-infield-button`.** Busy announcements and loading UX belong on the **parent field host** (for example **`aria-busy`**, updated **input** name, optional **`role="status"`** on the **field**) when the **field** is **`pending`**—not on **`swc-infield-button`**. Slotted in-field buttons should be **non-interactive** while the field is pending; they do **not** carry their own **`pending-label`** or spinner.

### Keyboard and focus

- **`swc-infield-button` (local):** Inner **`<button>`** receives focus when navigated to; **Enter** / **Return** or **Space** activates when not **`disabled`** ([Keyboard testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/keyboard_testing.mdx)). The component does **not** implement **`FocusgroupNavigationController`**.
- **Parent field host (composite):** The **field** is responsible for **focus group** navigation among the **input**, **`swc-infield-button`** instances, and other siblings—for example **`swc-number-field`** between **increment** / **decrement** and the **spinbutton** input. Use **`FocusgroupNavigationController`** on the **host** with **`getItems`** that returns the navigable set (inner **`<button>`** focus targets or hosts, per field design). Follow [Keyboard navigation inside components](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#keyboardnavigationinsidecomponents); for **toolbar**-like button strips inside a field, see the [Toolbar example](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/examples/toolbar/) and [Focus management](../../../01_contributor-guides/14_focus-management.md).
- **Tab vs focus group (parent field):** Each **field** host determines how focus moves among the **input**, **`swc-infield-button`** instances, and other siblings—either **default Tab** stops (each part is its own tab stop in DOM order) or **`FocusgroupNavigationController`** **arrow** navigation (roving **`tabindex`** within a subset or the whole composite). Document that choice on the **field**; **`swc-infield-button`** implements neither pattern.
- **Focus visible:** Verify with design that **field-level** **focus-visible** styling does **not** hide **which** sub-control is focused; screen reader users still hear **button** when the inner **`<button>`** is focused.
- **1st-gen gap:** **`label`** instead of **`accessible-label`**; **`block`** / **`inline`** documented in [1st-gen docs](https://opensource.adobe.com/spectrum-web-components/components/infield-button/)—2nd-gen docs must **not** copy **position-attribute** or **stacked** examples.

---

## Testing

### Automated tests

| Kind of test | What to check |
| --- | --- |
| **Unit** | **`ButtonBase`** wiring; **`accessible-label`** → **`aria-label`** on inner **`<button>`**; **`disabled`** forwarding; **no** **`FocusgroupNavigationController`** on **`swc-infield-button`**; **no** **`pending`** / **`pending-label`** / **`block`** / **`inline`** on public API; **`quiet`** reflection; dev warning when **`accessible-label`** missing with **icon** only. |
| **aXe + Storybook** | **Icon-only** with **`accessible-label`**; **`disabled`** on host; **disabled** / **pending** applied from **mock parent** field (**pending** disables in-field **button**, no **`pending`** on **`swc-infield-button`**); **`quiet`**; **field-composed** stepper / disclosure fixtures; **no** **`role="presentation"`** on activatable node. |
| **Playwright ARIA snapshots** | **button** role + **name** on focus target; **`disabled`** state; parent-disabled and parent-pending fixtures show **disabled** in-field **button**. |
| **Playwright keyboard** | **Enter** / **Space** on focused in-field **button**; **no** activation when **disabled** (self, parent-disabled, or parent-pending). **Tab** / **arrow** among **siblings** tested on **mock parent field** fixtures (not on isolated **`swc-infield-button`** only). |
| **Contrast / WHCM** | **Icon** / **disabled** / **focus** meet **non-text** contrast. |

---

## Summary checklist

- [ ] **`swc-infield-button`** extends **`ButtonBase`**; inner **`<button>`** + **`delegatesFocus`**; **no** host-only **`role="button"`**.
- [ ] **`accessible-label`** required for **icon-only**; dev warning matches **`ButtonBase`**.
- [ ] **`block`** and **`inline`** **removed**; migration guide and Storybook **omit** position-attribute and 1st-gen **stacked** examples; triage [SWC-1130](https://jira.corp.adobe.com/browse/SWC-1130) / [SWC-1197](https://jira.corp.adobe.com/browse/SWC-1197) against **field-composed** S2 patterns.
- [ ] **`disabled`** on **host** and **parent-driven** **`disabled`** documented and tested.
- [ ] **No** **`pending`** / **`pending-label`** on **`swc-infield-button`**; **parent field host** owns **`pending`** and disables slotted in-field affordances while busy.
- [ ] **No** **`href`**; **no** **`role="presentation"`** on the activatable element.
- [ ] **Focus** story documented with **parent** field (**focus inheritance** vs inner **`<button>`** focus).
- [ ] **No** **`FocusgroupNavigationController`** on **`swc-infield-button`**; **parent field host** owns navigation among **input** and in-field **button** siblings (document on **field** a11y guides).
- [ ] Storybook / consumer guide ([SWC-2111](https://jira.corp.adobe.com/browse/SWC-2111)): **no** React Spectrum counterpart; link [S2 Token specs — In-field button (Figma)](https://www.figma.com/design/eoZHKJH9WZLbrCvGQf3GnsY/S2-Token-specs?node-id=814-8689).
- [ ] Cross-links to [In-field button migration roadmap](./rendering-and-styling-migration-analysis.md) and [Button accessibility migration analysis](../button/accessibility-migration-analysis.md).

---

## References

- [WAI-ARIA APG: Button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/)
- [WAI-ARIA APG: Textbox pattern](https://www.w3.org/WAI/ARIA/apg/patterns/textbox/)
- [WAI-ARIA APG: Read me first](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/)
- [WAI-ARIA APG: Keyboard navigation inside components](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#keyboardnavigationinsidecomponents)
- [WAI-ARIA APG: Toolbar example](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/examples/toolbar/)
- [Focus management (contributor guide)](../../../01_contributor-guides/14_focus-management.md)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [Spectrum 2 Token specs — In-field button (Figma)](https://www.figma.com/design/eoZHKJH9WZLbrCvGQf3GnsY/S2-Token-specs?node-id=814-8689)
- [Infield Button — Spectrum Web Components (1st-gen)](https://opensource.adobe.com/spectrum-web-components/components/infield-button/)
- [In-field button migration roadmap](./rendering-and-styling-migration-analysis.md)
- [Button accessibility migration analysis](../button/accessibility-migration-analysis.md)
- [Button migration plan](../button/migration-plan.md)
- [`Button.base.ts` (2nd-gen core)](../../../../2nd-gen/packages/core/components/button/Button.base.ts)
- [`InfieldButton.ts` (1st-gen)](../../../../1st-gen/packages/infield-button/src/InfieldButton.ts)
- [Keyboard testing (2nd-gen Storybook accessibility guide)](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/keyboard_testing.mdx)
