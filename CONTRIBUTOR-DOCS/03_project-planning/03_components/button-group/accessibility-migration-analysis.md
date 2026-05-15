<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Button Group / Button group accessibility migration analysis

<!-- Document title (editable) -->

# Button group accessibility migration analysis

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
- [Recommendations: `<swc-button-group>`](#recommendations-swc-button-group)
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

This doc describes how **`swc-button-group`** should behave for **accessibility** in 2nd-gen, targeting **WCAG 2.2 Level AA**. It pairs with [Button group migration roadmap](./rendering-and-styling-migration-analysis.md) for layout, tokens, and DOM. **`swc-button-group`** is a **layout and semantics wrapper** for **related** **`swc-button`** actions (for example dialog or form footers). The host **must** expose **`role="group"`**, **must** use **`FocusgroupNavigationController`** for **roving** **`tabindex`** and **directional** keyboard navigation among slotted **`swc-button`** focus targets (see [Keyboard and focus](#keyboard-and-focus)), **must not** be used as **`role="radiogroup"`**, **must not** implement **toggle-group** behavior (mutually or collectively **pressed** / **toolbar**-style **toggle** clusters belong on **`swc-toggle-group`**), and **slotted** children **should** be **`swc-button`** instances so every managed control remains a **standard** **button** with a **discernible name** ([Button accessibility migration analysis](../button/accessibility-migration-analysis.md)). Align shared **button** / **`ButtonBase`** sequencing with [Button migration plan](../button/migration-plan.md).

### Also read

[Button group migration roadmap](./rendering-and-styling-migration-analysis.md). [Button accessibility migration analysis](../button/accessibility-migration-analysis.md). [Button migration plan](../button/migration-plan.md). **Focusgroup** / **roving tabindex:** [Focus management strategy RFC](../../05_strategies/focus-management-strategy-rfc.md), [Focus management contributor guide](../../../01_contributor-guides/14_focus-management.md), **`FocusgroupNavigationController`** ([`focusgroup-navigation-controller.ts`](../../../../2nd-gen/packages/core/controllers/focusgroup-navigation-controller/src/focusgroup-navigation-controller.ts)). Toolbar and **action-strip** context: [Action group migration roadmap](../action-group/rendering-and-styling-migration-analysis.md), [Action button migration roadmap](../action-button/rendering-and-styling-migration-analysis.md) (toolbar vs **button-group** layering). Spectrum 2 **Button group** visuals: [Spectrum 2 — Web (desktop scale): Button group (Figma)](https://www.figma.com/design/Mngz9H7WZLbrCvGQf3GnsY/S2---Web--Desktop-scale-?node-id=13663-6530). Consumer docs: [Button Group — Spectrum Web Components (1st-gen)](https://opensource.adobe.com/spectrum-web-components/components/button-group/). React Spectrum reference: [React Spectrum: ButtonGroup](https://react-spectrum.adobe.com/ButtonGroup).

### What it is

- **`swc-button-group`:** A container that **groups** related **buttons** with Spectrum **horizontal** or **vertical** spacing and sizing props. In the accessibility tree it should map to **`role="group"`** on the **host** (or equivalent **ElementInternals** semantics when that path exists). **`FocusgroupNavigationController`** manages **roving** **`tabindex`** and **Arrow** / **Home** / **End** (and optional **wrap** / **`skipDisabled`**) across slotted **`swc-button`** instances so the **group** behaves as **one** **Tab** stop with **inner** native **`<button>`** focus targets per **`swc-button`** **delegation**—not every child in the sequential **Tab** order at once.
- **Naming the group:** When the set of actions is **meaningfully distinct** from surrounding content, give the **group** a **discernible** accessible name (**`aria-label`**, **`aria-labelledby`**, or **visible legend** association per context) so assistive technologies can announce **purpose**, not only each **button** name.

### When to use something else

- **Mutually exclusive** options (one-of-many **radio** behavior, **segment** UI) → **`swc-segmented-control`** / **`swc-segmented-control-button`** (**`radiogroup`** semantics)—**not** **`swc-button-group`** (see **What it is not**).
- **Toggle** behavior (a **group** of controls where **selection** / **`aria-pressed`** / **roving** focus among **toggles** is coordinated)—**not** **`swc-button-group`**. Consumers **should** use **`swc-toggle-group`** when product needs **toggle** semantics at the **group** level.
- **Compact** **toolbar** / **action-strip** **`swc-action-button`** clusters inside **`swc-action-group`** → follow [Action group migration roadmap](../action-group/rendering-and-styling-migration-analysis.md) and [Action button migration roadmap](../action-button/rendering-and-styling-migration-analysis.md); outer **`role="toolbar"`** and inner **`swc-button-group`** with **`role="group"`** remain the **APG**-style split.

### What it is not

- **`role="radiogroup"`:** **`swc-button-group`** **must not** implement **radio-group** semantics or **`aria-checked`** on children for selection. Use **`swc-segmented-control`** when design implies **exclusive** choice.
- **Toggle group:** **`swc-button-group`** **must not** own **`aria-pressed`** coordination, **single-selection** among **toggles**, or **`toolbar`**-style **toggle** clusters. Use **`swc-toggle-group`** when the UX is **toggle**-based at the **group** level; **`swc-button-group`** stays **plain** **`button`** actions only.
- **A composite tab stop, not a parallel tab list:** The **group** **host** is **not** a **radiogroup** or **toggle** strip. **`FocusgroupNavigationController`** supplies **APG**-style **roving** **`tabindex`** among **`swc-button`** children—**do not** leave every child at **`tabindex="0"`** unless a **documented** exception (for example a temporary migration shim) is approved and called out in Storybook.

### Program (2nd-gen, Jira snapshot)

Planning and migration work is tracked in Adobe Jira with **`gen2`** labels (for example [SWC-2071](https://jira.corp.adobe.com/browse/SWC-2071) **epic**, [SWC-2072](https://jira.corp.adobe.com/browse/SWC-2072) accessibility recommendations, [SWC-2073](https://jira.corp.adobe.com/browse/SWC-2073) migration plan analysis, [SWC-2074](https://jira.corp.adobe.com/browse/SWC-2074) implementation). Cross-cutting **focusgroup** / **roving tabindex** direction lives in [SWC-1676](https://jira.corp.adobe.com/browse/SWC-1676) (RFC; **Done** snapshot—see [Focus management strategy RFC](../../05_strategies/focus-management-strategy-rfc.md)). Those **`gen2`** items are **out of scope** for the **Related 1st-gen** table below, which lists **1st-gen** documentation snapshots only.

---

## ARIA and WCAG context

### Pattern in the APG

- [Toolbar pattern](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/) and [Toolbar example](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/examples/toolbar/) — the **Copy**, **Cut**, **Paste** cluster is a **`role="group"`** with a **name** (**“edit”**), containing plain **`button`** elements. **`swc-button-group`** should match that **inner-group** shape: **`role="group"`** on the wrapper, **named** when useful, **buttons** inside—not **`radiogroup`**.
- [ARIA17: Using grouping roles to identify related form controls](https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA17) — **`role="group"`** for **related** controls; **`radiogroup`** is for **mutually exclusive** selection (use **`swc-segmented-control`** in **2nd-gen**, not **button-group**).

### Guidelines that apply

| Idea | Plain meaning |
| --- | --- |
| [Name, role, value (WCAG 4.1.2)](https://www.w3.org/TR/WCAG22/#name-role-value) | **Group** has **`role="group"`**; each **child** **`swc-button`** exposes **button** role and **name** on its **focus target**. |
| [Info and relationships (WCAG 1.3.1)](https://www.w3.org/TR/WCAG22/#info-and-relationships) | Programmatic grouping (**`role="group"`**) matches the visual **related actions** relationship; name the **group** when it clarifies context. |
| [Keyboard (WCAG 2.1.1)](https://www.w3.org/TR/WCAG22/#keyboard) | **Tab** enters / leaves the **group** as **one** composite (**roving** **`tabindex`** via **`FocusgroupNavigationController`**); **Arrow** keys (and **Home** / **End** per controller options) move among **`swc-button`** inner **`<button>`** targets; **Enter** / **Space** activate the focused **button**. When **`swc-button-group`** is nested inside another composite that also uses **`FocusgroupNavigationController`**, document which ancestor owns **arrow** navigation so handlers **do not** conflict ([Action group migration roadmap](../action-group/rendering-and-styling-migration-analysis.md)). |
| [Focus visible (WCAG 2.4.7)](https://www.w3.org/TR/WCAG22/#focus-visible) | Focus rings on each **`swc-button`** **inner** **`<button>`** per **`swc-button`** spec—not on a fake focusable **group** host. |
| [Target size (WCAG 2.5.8)](https://www.w3.org/TR/WCAG22/#target-size-minimum) | Spacing and **button** sizes meet **minimum** targets or documented exceptions. |
| [Non-text contrast (WCAG 1.4.11)](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast) | **Button** borders, **focus** rings, and chrome meet **3:1** where applicable. |

**Bottom line:** **`swc-button-group`** = **`role="group"`** + **`FocusgroupNavigationController`** over **`swc-button`** children; mirror the **toolbar** example’s **named** **button** cluster—not **radiogroup**, not **toggle-group** semantics (**`swc-toggle-group`**).

---

## Related 1st-gen accessibility (Jira)

Adobe Jira is authoritative for current status and resolution; refresh cells when you triage. **gen2**-labeled program tickets are omitted here (see **Program (2nd-gen)** above). Audit epic **[SWC-872](https://jira.corp.adobe.com/browse/SWC-872)** is omitted per contributor-doc rules for cross-cutting audits.

| Jira | Type | Status (snapshot) | Resolution (snapshot) | Summary |
| --- | --- | --- | --- | --- |
| [SWC-362](https://jira.corp.adobe.com/browse/SWC-362) | Story | Done | Done | docs(button-group): audit documentation |
| [SWC-1220](https://jira.corp.adobe.com/browse/SWC-1220) | Story | Done | Done | docs(Button, Button group, Action button, Action group): create migration documentation |

---

## Recommendations: `<swc-button-group>`

### ARIA roles, states, and properties

| Topic | What to do |
| --- | --- |
| **Prescribed host role** | **`swc-button-group`** maps to **one** landmark-like collection: **`role="group"`**. **Must not** author **`role="radiogroup"`**, **`role="toolbar"`** on this host unless product explicitly promotes a **toolbar** strip (prefer **APG** layering: **`toolbar`** on an **ancestor**, **`group`** here). For **exclusive** selection UX, use **`swc-segmented-control`**, not a **role** override on **`swc-button-group`**. **Must not** implement **toggle-group** APIs or **pressed**-state orchestration on the **host**—use **`swc-toggle-group`**. |
| **Group name** | When the **group** carries **distinct meaning** (for example **“Edit actions”**, **dialog footer actions**), set **`aria-label`** or **`aria-labelledby`** on the **host**. If the **only** distinction is each **button** label and no extra grouping cue is needed, the name can be **omitted**—verify with **screen reader** review so the **experience** is not overly verbose. |
| **`aria-orientation`** | When **`vertical`** is **true**, set **`aria-orientation="vertical"`** on the **group**; when **horizontal**, **`aria-orientation="horizontal"`** (or omit if default **horizontal** is clear for the AT). |
| **Focus navigation** | **`swc-button-group`** **must** host a **`FocusgroupNavigationController`** instance (see [Focus management strategy RFC](../../05_strategies/focus-management-strategy-rfc.md)) with **`getItems()`** returning the **focusable** targets for each slotted **`swc-button`** (each **`swc-button`**’s delegated **`<button>`** or the element that receives **keyboard** focus per [Button accessibility migration analysis](../button/accessibility-migration-analysis.md)). Set **`direction`** to **`horizontal`** or **`vertical`** to match layout (or **`both`** only if product defines a single linear order that accepts both axes—prefer matching **`aria-orientation`**). Use **`skipDisabled: true`** when **`disabled`** / **`aria-disabled`** children should be skipped. Call **`refresh()`** after slotted content changes. **Do not** stack a second roving layer on the same **buttons** without a documented composition rule when embedded in **`swc-action-group`** / **`role="toolbar"`**. |
| **Child elements** | **Default** slotted controls **should** be **`swc-button`** so semantics stay **`role="button"`** with **`swc-button`** **delegation** and **pending** / **disabled** rules from [Button accessibility migration analysis](../button/accessibility-migration-analysis.md). **Do not** document **`swc-button-group`** as the home for **radio** semantics or **toggle-group** coordination. |
| **Disable all (optional API)** | If 2nd-gen adds **group-level** **disable** (compare [React Spectrum `ButtonGroup` `isDisabled`](https://react-spectrum.adobe.com/ButtonGroup)), propagate **disabled** or **`aria-disabled`** to each **`swc-button`** per **`swc-button`** patterns—**never** rely on **inactive** appearance alone. |
| **`size` / `vertical`** | **Visual** layout props; **do not** map to **radio**, **pressed**, or **toggle-selection** state. **`vertical`** must pair with **`aria-orientation`** as above. |
| **Docs** | Storybook and migration guides **must** state **no** **`radiogroup`** on **`swc-button-group`**, document **`FocusgroupNavigationController`** (**Tab** in/out, **Arrow** / **Home** / **End** among **`swc-button`**), and point authors to **`swc-segmented-control`** for **segmented** / **one-of-many** **button** UX and to **`swc-toggle-group`** for **toggle** **groups**. |

### Shadow DOM and cross-root ARIA Issues

None

### Form-associated buttons (`submit` / `reset`) — deferred

**Does not apply** to **`swc-button-group`** as a host: the **group** is not a **form-associated** control. **`submit`** / **`reset`** behavior lives on individual **`swc-button`** instances and shared **`ButtonBase`** / **`ElementInternals`** work—see [Button accessibility migration analysis](../button/accessibility-migration-analysis.md) and [SWC-48](https://jira.corp.adobe.com/browse/SWC-48).

### Accessibility tree expectations

**`swc-button-group` (default)**

- **Role:** **group** on the **host**.
- **Name:** optional **accessible name** when context requires it (**`aria-label`** / **`aria-labelledby`**).
- **Orientation:** **`aria-orientation`** matches **`vertical`** / **horizontal** layout.
- **Children:** one or more **button** nodes from **`swc-button`** (each with correct **name**, **state**, **value** per **`swc-button`**), with **exactly one** child (or its delegated **`<button>`**) in the sequential **Tab** order at a time—**`FocusgroupNavigationController`** implements **roving** **`tabindex`** on the managed set.

### Live regions, loading, and announcements

**Does not apply** to the **`swc-button-group` host.** Loading, **pending**, or status **announcements** belong on **individual** **`swc-button`** instances or **parent** patterns—not a **group-level** **`aria-live`** region. **Never** **`aria-live="assertive"`** for routine **button** state.

### Keyboard and focus

- **`swc-button-group` host:** **Not** a **Tab** stop (**`tabindex`** on the **host** should **not** steal focus from **children**); **do not** put **`tabindex="0"`** on the **group** wrapper for end-user focus—the **roving** stop lives on **`swc-button`** inner **`<button>`** elements (or equivalent) managed by **`FocusgroupNavigationController`**.
- **`FocusgroupNavigationController`:** **Required** on **`swc-button-group`** ([Focus management strategy RFC](../../05_strategies/focus-management-strategy-rfc.md), [`focusgroup-navigation-controller.ts`](../../../../2nd-gen/packages/core/controllers/focusgroup-navigation-controller/src/focusgroup-navigation-controller.ts)). **Tab** / **Shift+Tab** move into and out of the **composite** as **one** unit; **Arrow** keys (**direction** aligned with **`vertical`** / **`horizontal`** layout) and **Home** / **End** (per controller configuration) move **roving** focus among **`swc-button`** targets. Call **`refresh()`** when slot content or **disabled** state changes. Prefer **`skipDisabled: true`** so **disabled** items are omitted from the roving sequence when that matches **`swc-button`** behavior.
- **Composition:** When **`swc-button-group`** sits inside **`swc-action-group`** or **`role="toolbar"`**, confirm whether the **parent** or **`swc-button-group`** owns **arrow** navigation for the same DOM **buttons**—only **one** layer should drive **`tabindex`** on those targets (see [Action group migration roadmap](../action-group/rendering-and-styling-migration-analysis.md) and [Keyboard testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/keyboard_testing.mdx)).
- **1st-gen gap:** **`sp-button-group`** does **not** set **`role="group"`** in [`ButtonGroup.ts`](../../../../1st-gen/packages/button-group/src/ButtonGroup.ts) and does **not** ship **2nd-gen** **`FocusgroupNavigationController`**; 2nd-gen should **add** **`role="group"`** and **roving** keyboard behavior to match this doc and the **APG** **toolbar** example cluster.

---

## Testing

### Automated tests

| Kind of test | What to check |
| --- | --- |
| **Unit** | **Host** exposes **`role="group"`** (or equivalent); **`FocusgroupNavigationController`** wired with **`getItems`** / **`direction`** / **`refresh()`**; **`vertical`** toggles **`aria-orientation`**; optional **group** **name** attributes; **no** **`role="radiogroup"`**; **no** **toggle-group**-specific props or **pressed** orchestration on **host**; slotted **`swc-button`** count and **size**/`disabled` propagation when implemented; **roving** **`tabindex`** (one **`tabindex="0"`** among managed **buttons** at a time). |
| **aXe + Storybook** | Horizontal / **vertical**, **named** and **unnamed** groups, **disabled** group variant, multi-**button** layouts; assert **child** **`swc-button`** names and **no** **radio** roles on **group** or **buttons** for **button-group** stories; stories **do not** model **exclusive** **toggle** selection (that belongs on **`swc-toggle-group`**); document **keyboard** table (**Tab** composite, **Arrow** roving). |
| **Playwright ARIA snapshots** | **group** role on host; **button** roles on children; **aria-orientation** when **vertical**; regression that **group** is **not** **radiogroup** and **not** a **toggle** container pattern; assert **roving** **`tabindex`** pattern on inner **buttons** (one **0**, others **-1** when not focused). |
| **Playwright keyboard** | **Tab** enters / leaves **group** as **one** stop; **Arrow** keys move focus between **buttons**; **Home** / **End** if enabled; **Enter** / **Space** on each **button**; **toolbar**-wrapped cases if applicable (no double roving). |

---

## Summary checklist

- [ ] **`swc-button-group`** host **`role="group"`**; **`aria-orientation`** matches **`vertical`** / **horizontal**.
- [ ] **Group** **name** provided when **`aria-label`** / **`aria-labelledby`** improves comprehension without noise.
- [ ] **Children** are **`swc-button`**; each meets [Button accessibility migration analysis](../button/accessibility-migration-analysis.md) **name** / **focus** / **delegation** rules.
- [ ] **No** **`radiogroup`** / **radio** semantics—**segmented** UX uses **`swc-segmented-control`**.
- [ ] **No** **toggle-group** behavior on **`swc-button-group`**—**toggle** UX uses **`swc-toggle-group`**.
- [ ] **`FocusgroupNavigationController`** on **`swc-button-group`** (**`getItems`**, **`direction`**, **`refresh()`**, **`skipDisabled`** as appropriate); **no** conflicting roving with parent **toolbar** / **`swc-action-group`** without a documented composition rule.
- [ ] **Toolbar** composition: outer **`toolbar`** + inner **`group`** matches [APG Toolbar example](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/examples/toolbar/) and [Action button migration roadmap](../action-button/rendering-and-styling-migration-analysis.md) layering notes.
- [ ] Storybook and consumer migration guide ([SWC-2077](https://jira.corp.adobe.com/browse/SWC-2077) program scope) explain **group** vs **segmented control** vs **toggle group** and link **`swc-button`** **children**.
- [ ] Cross-links to [Button group migration roadmap](./rendering-and-styling-migration-analysis.md), [Button migration plan](../button/migration-plan.md), and [Spectrum 2 — Button group (Figma)](https://www.figma.com/design/Mngz9H7WZLbrCvGQf3GnsY/S2---Web--Desktop-scale-?node-id=13663-6530).

---

## References

- [WAI-ARIA APG: Toolbar pattern](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/) and [Toolbar example — Copy / Cut / Paste group](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/examples/toolbar/)
- [WAI-ARIA APG: Keyboard interface — roving tabindex](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex)
- [Focus management strategy RFC](../../05_strategies/focus-management-strategy-rfc.md) (**`FocusgroupNavigationController`**)
- [Focus management contributor guide](../../../01_contributor-guides/14_focus-management.md)
- [`focusgroup-navigation-controller.ts` (2nd-gen core)](../../../../2nd-gen/packages/core/controllers/focusgroup-navigation-controller/src/focusgroup-navigation-controller.ts)
- [WAI-ARIA APG: Read me first](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [React Spectrum: ButtonGroup](https://react-spectrum.adobe.com/ButtonGroup)
- [Button Group — Spectrum Web Components (1st-gen)](https://opensource.adobe.com/spectrum-web-components/components/button-group/)
- [Spectrum 2 — Web (desktop scale): Button group (Figma)](https://www.figma.com/design/Mngz9H7WZLbrCvGQf3GnsY/S2---Web--Desktop-scale-?node-id=13663-6530)
- [Button group migration roadmap](./rendering-and-styling-migration-analysis.md)
- [Button accessibility migration analysis](../button/accessibility-migration-analysis.md)
- [Button migration plan](../button/migration-plan.md)
- [Action group migration roadmap](../action-group/rendering-and-styling-migration-analysis.md)
- [Action button migration roadmap](../action-button/rendering-and-styling-migration-analysis.md)
- [Keyboard testing (2nd-gen Storybook accessibility guide)](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/keyboard_testing.mdx)
- [`ButtonGroup.ts` (1st-gen)](../../../../1st-gen/packages/button-group/src/ButtonGroup.ts)
