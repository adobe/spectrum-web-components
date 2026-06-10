<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Action Group / Action group accessibility migration analysis

<!-- Document title (editable) -->

# Action group accessibility migration analysis

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Overview](#overview)
    - [Also read](#also-read)
    - [What it is](#what-it-is)
    - [When to use something else](#when-to-use-something-else)
    - [What it is not](#what-it-is-not)
    - [Related](#related)
    - [Program (2nd-gen, Jira snapshot)](#program-2nd-gen-jira-snapshot)
- [ARIA and WCAG context](#aria-and-wcag-context)
    - [Pattern in the APG](#pattern-in-the-apg)
    - [Guidelines that apply](#guidelines-that-apply)
- [Related 1st-gen accessibility (Jira)](#related-1st-gen-accessibility-jira)
- [1st-gen implementation notes](#1st-gen-implementation-notes)
- [Recommendations: `<swc-action-group>`](#recommendations-swc-action-group)
    - [ARIA roles, states, and properties](#aria-roles-states-and-properties)
    - [Shadow DOM and cross-root ARIA Issues](#shadow-dom-and-cross-root-aria-issues)
    - [Form-associated custom properties (labels, `ElementInternals`)](#form-associated-custom-properties-labels-elementinternals)
    - [Accessibility tree expectations](#accessibility-tree-expectations)
    - [Live regions, loading, and announcements](#live-regions-loading-and-announcements)
    - [Keyboard and focus](#keyboard-and-focus)
- [Testing](#testing)
    - [Automated tests](#automated-tests)
    - [Keyboard testing](#keyboard-testing)
- [Summary checklist](#summary-checklist)
- [References](#references)

</details>

<!-- Document content (editable) -->

## Overview

This doc describes how **`swc-action-group`** should behave for **accessibility** in 2nd-gen, targeting **WCAG 2.2 Level AA**. It pairs with [Action group migration roadmap](./rendering-and-styling-migration-analysis.md) for layout, tokens, and DOM. Until **`swc-action-group`** ships, use **`1st-gen/packages/action-group/src/ActionGroup.ts`** (`<sp-action-group>`) as the behavioral reference for **roving tabindex** and **`selects`**, then **verify** every recommendation against real 2nd-gen source before declaring implementation complete.

React Spectrum names the pattern [**ActionButtonGroup**](https://react-spectrum.adobe.com/ActionButtonGroup); Spectrum 2 documents [**Action group**](https://s2.spectrum.corp.adobe.com/page/action-group/). **`swc-action-group`** groups related **`swc-action-button`** and **`swc-action-menu`** controls with Spectrum spacing in **horizontal** or **vertical** layout. The host **always** maps to **`role="group"`** (prescribed and fixed). The main accessibility difference from **`swc-button-group`** is **composite keyboard navigation**: **`swc-action-group`** owns **roving **`tabindex`**** (**one Tab stop** into the strip, **arrow keys** among items), while **`swc-button-group`** also uses **`role="group"`** but **Tab** visits **each** **`swc-button`** ([Button group accessibility migration analysis](../button-group/accessibility-migration-analysis.md)).

### Also read

[Action group migration roadmap](./rendering-and-styling-migration-analysis.md). [Action button accessibility migration analysis](../action-button/accessibility-migration-analysis.md) (**`swc-action-button`** must stay **`role="button"`** only; **no** **`role="radio"`** / **`role="checkbox"`** on children in 2nd-gen). [Action menu accessibility migration analysis](../action-menu/accessibility-migration-analysis.md) when **`swc-action-menu`** is slotted. [Button group accessibility migration analysis](../button-group/accessibility-migration-analysis.md) (**spacing** vs **overflow** vs **no roving tabindex**). [Focus management strategy RFC](../../05_strategies/focus-management-strategy-rfc.md) and [Focus management contributor guide](../../../01_contributor-guides/14_focus-management.md) (**`FocusgroupNavigationController`**, [SWC-1676](https://jira.corp.adobe.com/browse/SWC-1676)). Spectrum 2 visuals: [Action group (Figma)](https://www.figma.com/design/Mngz9H7WZLbrCvGQf3GnsY/S2---Web--Desktop-scale-?node-id=19083-360&p=f&m=dev). 1st-gen consumer docs: [Action group — Spectrum Web Components](https://opensource.adobe.com/spectrum-web-components/components/action-group/).

### What it is

- **`swc-action-group`:** A **composite** container for **related** **compact** actions (**`swc-action-button`**, **`swc-action-menu`**) with shared **size**, **quiet**, **emphasized**, and **`static-color`** passthroughs.
- **Keyboard:** Implements **roving **`tabindex`**** among slotted focusable items (**Tab** enters the group; **Arrow** keys move between items; **Home** / **End** when supported). 1st-gen uses **`RovingTabindexController`**; 2nd-gen should migrate to **`FocusgroupNavigationController`** ([SWC-1676](https://jira.corp.adobe.com/browse/SWC-1676)).
- **Host focus:** 1st-gen sets **`delegatesFocus: true`** on the shadow root so **`focus()`** on the host targets the current roving item.
- **Naming:** **`label`** reflects to **`aria-label`** on the host when authors supply a non-empty string; **`aria-labelledby`** remains valid for visible legend association (1st-gen README pattern).
- **Host role:** **`role="group"`** on the **host** in all modes. **Must not** switch to **`role="toolbar"`** or **`role="radiogroup"`** (breaking change from 1st-gen). A page-level **`role="toolbar"`** landmark, when needed, belongs on an **outer wrapper**, not on **`swc-action-group`**.
- **Selection (1st-gen API):** Optional **`selects="single"`** / **`selects="multiple"`** with **`selected`** array and **`change`** events. 1st-gen re-types the host and children; 2nd-gen keeps **`role="group"`** on the host and **`role="button"`** on **`swc-action-button`** children, exposing selection via **`aria-pressed`** / **`aria-checked`** on the **focus target** **or** migrating UX to **`swc-segmented-control`** / **`swc-toggle-button-group`** (see **Recommendations**).

### When to use something else

- **Standard button footers** (dialog actions, form rows) with **no** shared arrow-key strip → **`swc-button-group`** ([Button group accessibility migration analysis](../button-group/accessibility-migration-analysis.md)).
- **Mutually exclusive segments** without a full toolbar strip → **`swc-segmented-control`** / **`swc-segmented-control-button`** (not **`role="radio"`** on **`swc-action-button`**).
- **Toggle toolbars** (**bold** / **italic**-style **`aria-pressed`** groups) → **`swc-toggle-button-group`** / **`swc-toggle-button`** ([React Spectrum: ToggleButtonGroup](https://react-spectrum.adobe.com/ToggleButtonGroup)).
- **Overflow** when a horizontal row must **wrap** or **reflow** at narrow widths → **`swc-button-group`** overflow behavior (deferred in button-group migration); **`swc-action-group`** is **not** the overflow container.
- **Primary** or **high-emphasis** actions → **`swc-button`**, not action chrome.

### What it is not

- **`swc-button-group`:** Same **`role="group"`** on the host, but **no** **roving tabindex**; **Tab** visits **each** **`swc-button`**.
- **`role="toolbar"`** on this host: **`swc-action-group`** is **always** **`role="group"`**. Put **`role="toolbar"`** on a **parent** element when the page needs a **toolbar** landmark.
- **A split-button primitive:** Prefer **separate** **`swc-action-button`** + **`swc-action-menu`** instances in one **`swc-action-group`** over **longpress-only** secondary paths ([Action button accessibility migration analysis](../action-button/accessibility-migration-analysis.md)).

### Related

- **`swc-action-button`** — slotted **commit** control; always **`role="button"`** on the focus target in 2nd-gen.
- **`swc-action-menu`** — slotted **menu button**; participates in the same **roving** sequence as adjacent action buttons.
- **`swc-button-group`** — sibling **`role="group"`** wrapper for **`swc-button`** clusters (**Tab** through each button, no roving). Multiple **`swc-action-group`** / **`swc-button-group`** instances may sit inside an **outer **`role="toolbar"`** wrapper** per [APG Toolbar example](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/examples/toolbar/).

### Program (2nd-gen, Jira snapshot)

Gen2 program work is tracked separately from the **1st-gen** table below (omit **`gen2`** rows there per contributor-doc rules):

| Jira | Type | Status (snapshot) | Summary |
| --- | --- | --- | --- |
| [SWC-2212](https://jira.corp.adobe.com/browse/SWC-2212) | Epic | To Do | Gen2 migration: Action Group |
| [SWC-2213](https://jira.corp.adobe.com/browse/SWC-2213) | Story | Research | Accessibility recommendations for 2nd-gen migration |
| [SWC-2214](https://jira.corp.adobe.com/browse/SWC-2214) | Story | To Do | Analyze component and create migration plan |
| [SWC-2215](https://jira.corp.adobe.com/browse/SWC-2215) | Story | To Do | Update file structure, API, TypeScript, and accessibility |
| [SWC-2219](https://jira.corp.adobe.com/browse/SWC-2219) | Story | To Do | Review and finalize migration |

---

## ARIA and WCAG context

### Pattern in the APG

- [Toolbar pattern](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/) and [Toolbar example](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/examples/toolbar/) — the **Copy / Cut / Paste** cluster is a **named **`role="group"`**** inside an **outer **`role="toolbar"`**. **`swc-action-group`** maps to that **inner group** shape (plus **roving tabindex** among its items). The **toolbar** landmark lives on a **wrapper**, not on **`swc-action-group`**.
- [ARIA17: Using grouping roles to identify related form controls](https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA17) — **`role="group"`** for **related** controls; name the group when it clarifies purpose.
- [Radio group pattern](https://www.w3.org/WAI/ARIA/apg/patterns/radio/) — **mutually exclusive** choice belongs on **`swc-segmented-control`**, **not** **`role="radiogroup"`** on **`swc-action-group`**. 1st-gen **`selects="single"`** used **radiogroup** on the host ([SWC-1121](https://jira.corp.adobe.com/browse/SWC-1121)); 2nd-gen fixes label association on **`role="group"`** instead.
- [Keyboard navigation inside components](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#keyboardnavigationinsidecomponents) and [Roving tabindex](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex) — **`swc-action-group`** **owns** this behavior via **`FocusgroupNavigationController`** (direction follows **`vertical`** / horizontal layout). **`swc-button-group`** does **not**.
- [Focusability of disabled controls](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#focusabilityofdisabledcontrols) — when the group or its items are disabled, use **`aria-disabled`** (not the HTML **`disabled`** attribute) so items remain keyboard-reachable and discoverable.

### Guidelines that apply

| Idea | Plain meaning |
| --- | --- |
| [Name, role, value (WCAG 4.1.2)](https://www.w3.org/TR/WCAG22/#name-role-value) | The **group** exposes a **discernible name** when the strip is meaningful (**`label`**, **`aria-label`**, **`aria-labelledby`**). Each **child** keeps its **own** **name** and **role** on the **focus target** (**button** or **menu button**). |
| [Info and relationships (WCAG 1.3.1)](https://www.w3.org/TR/WCAG22/#info-and-relationships) | **Programmatic grouping** must match visual grouping; **`role="group"`** must be **associated with a name** when the cluster is meaningful ([SWC-1121](https://jira.corp.adobe.com/browse/SWC-1121)). |
| [Use of color (WCAG 1.4.1)](https://www.w3.org/TR/WCAG22/#use-of-color) | **Selected** / **pressed** state must **not** rely on **color alone** ([SWC-1123](https://jira.corp.adobe.com/browse/SWC-1123)); pair **emphasized** / **selected** visuals with **`aria-checked`**, **`aria-pressed`**, or non-color cues that assistive technologies already expose. |
| [Keyboard (WCAG 2.1.1)](https://www.w3.org/TR/WCAG22/#keyboard) | **Tab** reaches the composite; **Arrow** keys move among **enabled** items; **Enter** / **Space** activate the **focused** **button** or **open** the **menu** per child pattern. |
| [Focus visible (WCAG 2.4.7)](https://www.w3.org/TR/WCAG22/#focus-visible) | Focus ring appears on the **focused child** (delegated from host), not a fake focusable **group** shell. |
| [Target size (WCAG 2.5.8)](https://www.w3.org/TR/WCAG22/#target-size-minimum) | **Compact** and **icon-first** actions are common; document **minimum** targets for **`swc-action-button`** / **`swc-action-menu`** sizes. |

**Bottom line:** **`swc-action-group`** = **fixed **`role="group"`**** + **roving tabindex** among **`swc-action-button`** / **`swc-action-menu`** children. Fix **1st-gen audit** gaps (**group label**, **selection state not color-only**), migrate focus logic to **`FocusgroupNavigationController`**, and **drop** 1st-gen **`toolbar`** / **`radiogroup`** host roles. Put **`role="toolbar"`** on a **parent** when a **toolbar** landmark is required.

---

## Related 1st-gen accessibility (Jira)

Adobe Jira is authoritative for current status and resolution; refresh cells when you triage. **`gen2`**-labeled program tickets appear under **Program (2nd-gen)** only. Audit epic **[SWC-872](https://jira.corp.adobe.com/browse/SWC-872)** is omitted per contributor-doc rules.

| Jira | Type | Status (snapshot) | Resolution (snapshot) | Summary | Notes |
| --- | --- | --- | --- | --- | --- |
| [SWC-1121](https://jira.corp.adobe.com/browse/SWC-1121) | Bug | To Do | Unresolved | Group of radio buttons not associated with group label — **`sp-action-group`** (Selected) | **WCAG 1.3.1** audit; 1st-gen **`radiogroup`**; 2nd-gen fixes via **`role="group"`** + name |
| [SWC-1123](https://jira.corp.adobe.com/browse/SWC-1123) | Bug | To Do | Unresolved | Color alone used to convey control state — **`sp-action-group`** (Multiple) | **WCAG 1.4.1** audit; **`selects="multiple"`** |
| [SWC-1612](https://jira.corp.adobe.com/browse/SWC-1612) | Story | To Do | Unresolved | Migrate **`sp-action-group`** to use **`FormFieldMixin`** | **Does not apply to 2nd-gen** — **`swc-action-group`** is a composite keyboard widget, not a form field; see [Form-associated custom properties](#form-associated-custom-properties-labels-elementinternals) |
| [SWC-621](https://jira.corp.adobe.com/browse/SWC-621) | Story | To Do | Unresolved | **`disabled`** attribute should disable all **`sp-action-button`** children | Group-level disable |
| [SWC-889](https://jira.corp.adobe.com/browse/SWC-889) | Bug | To Do | Unresolved | **`change`** event fires before selection change | Event ordering |
| [SWC-1342](https://jira.corp.adobe.com/browse/SWC-1342) | Bug | To Do | Unresolved | **`sp-action-group`** sets **z-index** on focused button | Focus stacking / visibility |
| [SWC-282](https://jira.corp.adobe.com/browse/SWC-282) | Bug | To Do | Unresolved | Removing **`selected`** attribute leads to console error | Controlled **`selected`** |
| [SWC-250](https://jira.corp.adobe.com/browse/SWC-250) | Bug | Done | Fixed | **`FocusGroup`** won't set **`tabindex="0"`** on item focused using mouse | Roving tabindex |
| [SWC-577](https://jira.corp.adobe.com/browse/SWC-577) | Story | Done | Fixed | Research accessible menu navigation | Menu in action strips |
| [SWC-1220](https://jira.corp.adobe.com/browse/SWC-1220) | Story | Done | Done | docs(Button, Button group, Action button, Action group): create migration documentation | |
| [SWC-353](https://jira.corp.adobe.com/browse/SWC-353) | Story | Done | Done | docs(action-group): review documentation | |
| [SWC-833](https://jira.corp.adobe.com/browse/SWC-833) | Bug | Done | Fixed | action-group test is flaky | Test stability |
| [SWC-595](https://jira.corp.adobe.com/browse/SWC-595) | Story | Done | Fixed | Null check for **`slotElement`** in **`manageButtons`** | |
| [SWC-289](https://jira.corp.adobe.com/browse/SWC-289) | Bug | Done | Fixed | Error when using **`appendChild`** | |

---

## 1st-gen implementation notes

Verified in **`ActionGroup.ts`**:

- **`RovingTabindexController`** with **`hostDelegatesFocus: true`**; initial tab stop prefers **first selected** enabled item, else **first enabled** item.
- **Default role:** host **`role="toolbar"`** when no other role is set; inner **`<slot role="presentation">`**.
- **`selects="single"`:** host **`role="radiogroup"`**; children **`role="radio"`** + **`aria-checked`**.
- **`selects="multiple"`:** host stays / returns to **`role="toolbar"`**; children **`role="checkbox"`** + **`aria-checked`**.
- **No **`selects`**, with **`selected`:** children **`role="button"`** + **`aria-pressed`** when selected.
- **`label`** → **`aria-label`** on host in **`updated()`**; empty **`label`** removes **`aria-label`**.
- Slotted **`sp-action-menu`** participates in roving focus (see **`action-group.test.ts`** keyboard test).
- **`selects`** on host **overrides** author **`role="group"`** when toggled to **`single`** (test **accepts role attribute override**).

**Avoid in 2nd-gen (align with [Action button accessibility migration analysis](../action-button/accessibility-migration-analysis.md)):**

- Host **`role="toolbar"`**, **`role="radiogroup"`**, or any role **other than **`group`**** on **`swc-action-group`** (including author **`role`** overrides).
- Assigning **`role="radio"`** or **`role="checkbox"`** to **`swc-action-button`** hosts.
- A **named **`role="group"`**** without **`label`** / **`aria-labelledby`** when **`selects`** is set ([SWC-1121](https://jira.corp.adobe.com/browse/SWC-1121)).
- **Selected** styling that differs **only by color** ([SWC-1123](https://jira.corp.adobe.com/browse/SWC-1123)).

---

## Recommendations: `<swc-action-group>`

### ARIA roles, states, and properties

| Topic | What to do |
| --- | --- |
| **Prescribed host role** | **`role="group"`** is **prescribed** and **fixed** on the **`swc-action-group`** host. It **must not** be author-overridable in implementation or docs. **Do not** set **`role="toolbar"`**, **`role="radiogroup"`**, **`role="presentation"`**, or any other role on this element. If a **toolbar** landmark is needed, authors wrap one or more **`swc-action-group`** instances in a **parent** with **`role="toolbar"`**. **`swc-action-group`** maps to **one** semantic role only: **group**. |
| **Child roles** | **`swc-action-button`** → **`role="button"`** only on the focus target. **`swc-action-menu`** → menu-button semantics per [Action menu accessibility migration analysis](../action-menu/accessibility-migration-analysis.md). **Do not** set **`role="radio"`** / **`role="checkbox"`** on **`swc-action-button`**. For **exclusive** or **toggle** selection UX, prefer **`swc-segmented-control`** / **`swc-toggle-button-group`**, or expose **`aria-pressed`** / **`aria-checked`** on the **button** focus target while the host stays **`role="group"`**. |
| **Group name** | When the cluster is **meaningfully distinct** (**`selects`**, named tool strip, formatting cluster), **`label`** (or **`aria-labelledby`**) is **required** in docs; use **dev warnings** in debug builds when **`selects`** is set without a name. Fix [SWC-1121](https://jira.corp.adobe.com/browse/SWC-1121) with a **discernible **`group`** name**, not **radiogroup** retargeting. |
| **`aria-orientation`** | When **`vertical`** is **true**, set **`aria-orientation="vertical"`** on the host; when horizontal, **`horizontal`** or omit per AT defaults. Wire **`FocusgroupNavigationController`** **`direction`** to match. |
| **Selection state (non-color)** | For any retained **`selects`** / **`selected`** API, expose **`aria-checked`** or **`aria-pressed`** on the **correct** element (prefer **native** button state on inner **`<button>`** via delegation) and ensure **visible** **selected** styling includes a **non-color** cue ([SWC-1123](https://jira.corp.adobe.com/browse/SWC-1123)). |
| **Group `disabled`** | Use **`aria-disabled="true"`** on the **`swc-action-group`** host — **do not** use the HTML **`disabled`** attribute on the host. Per [APG: Focusability of disabled controls](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#focusabilityofdisabledcontrols), keeping the host and its children **keyboard-reachable** when disabled lets users **discover** that a strip of actions exists and understand why it is unavailable. Propagate **`aria-disabled="true"`** to each slotted **`swc-action-button`** / **`swc-action-menu`** child; children remain in the **Tab** / **Arrow** sequence but **must not activate** ([SWC-621](https://jira.corp.adobe.com/browse/SWC-621)). Do not rely on gray styling alone. |
| **`change` event** | Fire **`change`** **after** **`selected`** state commits ([SWC-889](https://jira.corp.adobe.com/browse/SWC-889)); keep **`preventDefault()`** rollback behavior documented. |
| **Toolbar composition** | Storybook and migration guides **must** show an **outer **`role="toolbar"`** wrapper** plus inner **`swc-action-group`** (**`role="group"`**) clusters (adapt 1st-gen README rich-text example: **`role="toolbar"`** moves to the **wrapper** only). **Never** nest **`role="toolbar"`** landmarks. |
| **Docs vs RSP** | Consumer docs should name [**ActionButtonGroup**](https://react-spectrum.adobe.com/ActionButtonGroup) for React Spectrum parity and **`swc-action-group`** for SWC; explain **`swc-button-group`** vs **`swc-action-group`** (overflow vs **focusgroup** navigation). |

### Shadow DOM and cross-root ARIA Issues

None

Slotted **`swc-action-button`** / **`swc-action-menu`** live in **light DOM**; **`aria-labelledby`** / **`aria-describedby`** on the **`<swc-action-group>`** host can reference **light DOM** **`id`** values without crossing shadow boundaries. The inner slot is **`role="presentation"`** only.

### Form-associated custom properties (labels, `ElementInternals`)

**Does not apply.** **`swc-action-group`** is a **composite keyboard widget** (a named **`role="group"`** of action controls), **not a form field**. [SWC-1612](https://jira.corp.adobe.com/browse/SWC-1612) (`FormFieldMixin`) must **not** be applied to this component in 2nd-gen. **`swc-action-group`** does not submit values, does not participate in form validation, and has no semantic relationship to form elements that would warrant `ElementInternals`. The **`label`** attribute reflects to **`aria-label`** on the host only (1st-gen behavior); it does not constitute field-label association and should not be redesigned as one.

### Accessibility tree expectations

#### Default (no `selects`)

- **Role:** **group** on host (always).
- **Name:** from **`label`** / **`aria-label`** / **`aria-labelledby`** when the cluster needs distinction from surrounding content.
- **Children:** **button** (action buttons) and **menu button** (action menus); **one** item shows **`tabindex="0"`**, others **`-1`**.
- **Focus:** **Tab** focuses the roving item; host **`focus()`** delegates to the same item.

#### Inside an outer toolbar wrapper

- **Host role:** still **group** on **`swc-action-group`**.
- **Name:** **required** when the cluster has distinct purpose (**Text style**, **List style**, **Edit actions**, etc.).
- **Parent** **`div`** (or app landmark) owns **`role="toolbar"`** and the **toolbar-level** name (**Text formatting**, etc.).

### Live regions, loading, and announcements

**Does not apply** to the **`swc-action-group`** host. **Pending**, **menu**, and **tooltip** announcements belong on **child** components ([Action button](../action-button/accessibility-migration-analysis.md), [Action menu](../action-menu/accessibility-migration-analysis.md), [Tooltip](../tooltip/accessibility-migration-analysis.md)). **Never** **`aria-live="assertive"`** on the group for routine **selection** changes; prefer **native **`aria-checked`** / **`aria-pressed`** on the focused control**.

### Keyboard and focus

- **Composite Tab stop:** **`swc-action-group`** is **one** **Tab** entry point into the strip (roving **`tabindex`** on children). **Shift+Tab** exits to the previous / next focusable **outside** the group.
- **Arrow keys:** Move focus among **`swc-action-button`** and **`swc-action-menu`** items per **`FocusgroupNavigationController`** **`direction`** (**horizontal**, **vertical**, or **both** when **`vertical`** layout still expects **Left** / **Right** in LTR). Honor **`wrap`** policy consistent with [APG Toolbar example](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/examples/toolbar/).
- **Home / End:** Support when the controller and product spec include them (1st-gen **`selects="single"`** tests dispatch **Home** / **End** on the host).
- **Activation:** **Enter** / **Space** on **`swc-action-button`**; **Enter** / **Space** / **ArrowDown** (menu pattern) on **`swc-action-menu`** per [Action menu accessibility migration analysis](../action-menu/accessibility-migration-analysis.md). Opening a **menu** must **not** trap focus in the **group** after close; focus returns to the **trigger**.
- **Disabled items:** When the group or individual items carry **`aria-disabled="true"`**, items **remain in the roving sequence** so keyboard users can discover them — do **not** skip **`aria-disabled`** items. Only skip items with the **HTML `disabled` attribute** (natively inert). Per [APG: Focusability of disabled controls](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#focusabilityofdisabledcontrols), items that are disabled but still focusable give users context about what actions exist. Align **`skipDisabled`** behavior in **`FocusgroupNavigationController`** accordingly with [Focus management strategy RFC](../../05_strategies/focus-management-strategy-rfc.md).
- **Mouse focus:** Preserve **roving **`tabindex="0"`** on the item clicked** ([SWC-250](https://jira.corp.adobe.com/browse/SWC-250)); finish skipped mouse test in 1st-gen (**`action-group.test.ts`** **`it.skip`**) in 2nd-gen.
- **Focus visibility / stacking:** Resolve focused-child **z-index** stacking without hiding focus indicators ([SWC-1342](https://jira.corp.adobe.com/browse/SWC-1342)).
- **Controller migration:** Replace **`RovingTabindexController`** with **`FocusgroupNavigationController`** from **`2nd-gen/packages/core/controllers/focusgroup-navigation-controller/`**; keep **`delegatesFocus`** (or equivalent) on the host.

---

## Testing

### Automated tests

| Kind of test | What to check |
| --- | --- |
| **Unit** | Host **`role="group"`** in **all** modes (no author override); **`label`** ↔ **`aria-label`**; **`vertical`** ↔ **`aria-orientation`**; **roving **`tabindex`**** (one **`0`**, rest **`-1`**); **`selected`** / **`aria-checked`** / **`aria-pressed`** sync on **buttons** only; **`change`** order ([SWC-889](https://jira.corp.adobe.com/browse/SWC-889)); group **`disabled`** propagation ([SWC-621](https://jira.corp.adobe.com/browse/SWC-621)); **`FocusgroupNavigationController`** wired with correct **`direction`**. |
| **aXe + Storybook** | Default group, **vertical**, **compact**, **`selects`**, **outer toolbar wrapper** composition, **`static-color`**, **icon-only** children with **names**; assert host is **never** **toolbar** or **radiogroup**; assert **no** **radio** / **checkbox** roles on **`swc-action-button`**. |
| **Playwright ARIA snapshots** | Add **`action-group.a11y.spec.ts`** for **group** role on host, **named group**, **`selects`**, **action-menu-in-group**, and **toolbar-wrapper** composition. |
| **Contrast / selection** | **Selected** / **emphasized** states include **non-color** differentiation where [SWC-1123](https://jira.corp.adobe.com/browse/SWC-1123) applies. |

### Keyboard testing

Exercise **Tab**, **Shift+Tab**, **Arrow** keys, **Home** / **End**, and **Enter** / **Space** using the [Keyboard testing (2nd-gen Storybook accessibility guide)](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/keyboard_testing.mdx). Include:

- **Action button only** strip.
- **Action button + action menu** strip (open menu, arrow inside menu, **Escape** back to trigger).
- **`selects="single"`** and **`selects="multiple"`** if those APIs remain.
- **Outer toolbar wrapper** + **named **`swc-action-group`** clusters** story (adapted from 1st-gen README composition).

---

## Summary checklist

- [ ] **`FocusgroupNavigationController`** replaces **`RovingTabindexController`** with **`direction`** tied to **`vertical`** / layout ([SWC-1676](https://jira.corp.adobe.com/browse/SWC-1676)).
- [ ] Host **`role="group"`** is **fixed** in **all** modes; **no** **`toolbar`** / **`radiogroup`** on **`swc-action-group`**; **no** author **`role`** override.
- [ ] **`swc-action-button`** children stay **`role="button"`** only; selection uses **`aria-pressed`** / **`aria-checked`** on the **button** or migrates to **segmented** / **toggle** components.
- [ ] **Group name** required when **`selects`** or context demands it; [SWC-1121](https://jira.corp.adobe.com/browse/SWC-1121) closed in tests.
- [ ] **Selected** state meets **non-color** requirement ([SWC-1123](https://jira.corp.adobe.com/browse/SWC-1123)).
- [ ] Group **`disabled`** uses **`aria-disabled="true"`** on the host and propagates to all children — children remain keyboard-reachable but do not activate ([SWC-621](https://jira.corp.adobe.com/browse/SWC-621)); per [APG: Focusability of disabled controls](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#focusabilityofdisabledcontrols).
- [ ] [SWC-1612](https://jira.corp.adobe.com/browse/SWC-1612) (`FormFieldMixin`) is **not** applied — **`swc-action-group`** is a composite keyboard widget, not a form field.
- [ ] **`change`** fires after **`selected`** updates ([SWC-889](https://jira.corp.adobe.com/browse/SWC-889)).
- [ ] Storybook shows **outer **`role="toolbar"`** wrapper** + **`swc-action-group`** (**`role="group"`**) per [APG Toolbar example](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/examples/toolbar/).
- [ ] **`aria-orientation`** matches **`vertical`**.
- [ ] **Keyboard** tests cover **action-menu-in-group** and **mouse** roving tabindex ([SWC-250](https://jira.corp.adobe.com/browse/SWC-250)).
- [ ] Consumer docs distinguish **`swc-action-group`** vs **`swc-button-group`** and link [**ActionButtonGroup**](https://react-spectrum.adobe.com/ActionButtonGroup) / [Action group (Figma)](https://www.figma.com/design/Mngz9H7WZLbrCvGQf3GnsY/S2---Web--Desktop-scale-?node-id=19083-360&p=f&m=dev).

---

## References

- [WAI-ARIA 1.2: group](https://www.w3.org/TR/wai-aria-1.2/#group)
- [WAI-ARIA APG: Toolbar pattern](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/) and [Toolbar example](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/examples/toolbar/) (outer wrapper; **`swc-action-group`** = inner **group**)
- [ARIA17: Using grouping roles to identify related form controls](https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA17)
- [WAI-ARIA APG: Keyboard navigation inside components](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#keyboardnavigationinsidecomponents)
- [WAI-ARIA APG: Roving tabindex](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex)
- [WAI-ARIA APG: Focusability of disabled controls](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#focusabilityofdisabledcontrols)
- [WAI-ARIA APG: Radio group](https://www.w3.org/WAI/ARIA/apg/patterns/radio/)
- [WAI-ARIA APG: Read me first](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [React Spectrum: ActionButtonGroup](https://react-spectrum.adobe.com/ActionButtonGroup)
- [Spectrum 2 — Action group (Figma)](https://www.figma.com/design/Mngz9H7WZLbrCvGQf3GnsY/S2---Web--Desktop-scale-?node-id=19083-360&p=f&m=dev)
- [Action group — Spectrum Web Components (1st-gen)](https://opensource.adobe.com/spectrum-web-components/components/action-group/)
- [Action group migration roadmap](./rendering-and-styling-migration-analysis.md)
- [Action button accessibility migration analysis](../action-button/accessibility-migration-analysis.md)
- [Action menu accessibility migration analysis](../action-menu/accessibility-migration-analysis.md)
- [Button group accessibility migration analysis](../button-group/accessibility-migration-analysis.md)
- [Focus management strategy RFC](../../05_strategies/focus-management-strategy-rfc.md)
- [Focus management contributor guide](../../../01_contributor-guides/14_focus-management.md)
- [Keyboard testing (2nd-gen Storybook accessibility guide)](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/keyboard_testing.mdx)
- [`ActionGroup.ts` (1st-gen)](../../../../1st-gen/packages/action-group/src/ActionGroup.ts)
- [`focusgroup-navigation-controller.ts` (2nd-gen core)](../../../../2nd-gen/packages/core/controllers/focusgroup-navigation-controller/src/focusgroup-navigation-controller.ts)
