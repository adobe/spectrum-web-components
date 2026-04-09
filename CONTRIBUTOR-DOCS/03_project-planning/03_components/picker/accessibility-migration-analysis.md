<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Picker / Picker accessibility migration analysis

<!-- Document title (editable) -->

# Picker accessibility migration analysis

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
- [Recommendations: `<swc-picker>`](#recommendations-swc-picker)
    - [ARIA roles, states, and properties](#aria-roles-states-and-properties)
    - [Shadow DOM and cross-root ARIA Issues](#shadow-dom-and-cross-root-aria-issues)
    - [Accessibility tree expectations](#accessibility-tree-expectations)
    - [Assistive technology, live regions](#assistive-technology-live-regions)
    - [Keyboard and focus](#keyboard-and-focus)
- [Testing](#testing)
    - [Automated tests](#automated-tests)
- [Summary checklist](#summary-checklist)
- [References](#references)

</details>

<!-- Document content (editable) -->

## Overview

This doc explains how **`swc-picker`** should work for **accessibility**. It targets **WCAG 2.2 Level AA**. **`swc-picker`** is a **closed** control for choosing **one** value from a list: it should follow the **[select-only combobox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/)** pattern from the APG, adapted because there is **no** free-text field—authors do not type a filter string into the control.

### Also read

[Picker migration roadmap](./rendering-and-styling-migration-analysis.md).

### What it is

- A field that should participate in **`<form>`** like a native control (**name**, **value**, **disabled**) and shows the **current value** (or placeholder) and opens a **popup** containing a **`listbox`** (`<swc-listbox>`) built from **`listbox` options** (`<swc-listbox-option>`). **Form** participation requires **`ElementInternals`** (or an equivalent **FACE** solution), separate from **`FormFieldMixin`** (which covers **label** / **help** only).
- On **smaller viewports**, the same **listbox** content should open in a **tray** (bottom sheet–style presentation) instead of only a floating popover. **Roles**, **keyboard**, and **focus return** to the **trigger** must stay consistent with the **select-only combobox** pattern regardless of tray vs popover chrome.
- **Single-select** by default unless a future spec adds an explicit multi-select mode with documented ARIA.
- The **listbox** may be used **inside** the picker or as a **standalone** widget; in both cases it can expose **[grouped options](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/examples/listbox-grouped/)** (`role="group"` with labels).
- For long lists, behavior should align with a **[scrollable or virtualized listbox](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/examples/listbox-scrollable/)**: the active option stays **visible** when focus or selection moves (scroll into view).

### What it is not

- **Not** a **`menu`** / **`menuitem`** surface. Do **not** reuse **`sp-menu`** / **`sp-menu-item`** (or their 2nd-gen equivalents) for picker options—**menus** use different roles, keyboard contracts, and allowed descendants than **listboxes**.
- **Not** a **combobox with text entry** (no filter-as-you-type). Do **not** imply **`aria-autocomplete`** beyond what a **select-only** pattern allows (typically **none**).
- **Not** a list of **links** or **buttons** inside the listbox: **`option`** elements must **not** be implemented as **`<a href>`** or **`role="link"`** / **`role="button"`** for navigation or actions.
- **Not** a **cascading** or **submenu** picker: **listbox options cannot have submenus**.

### Related

- **Trigger-only control** (no field chrome) → [Picker button migration roadmap](../picker-button/rendering-and-styling-migration-analysis.md).
- **Field label and help** composition → [Field label](../field-label/rendering-and-styling-migration-analysis.md), [Help text](../help-text/rendering-and-styling-migration-analysis.md).
- **In-field loading** patterns → prefer **busy** / **icon** treatment over **`progressbar`** for indeterminate waits; see **Pending / loading** in **Recommendations** and Jira **SWC-1171**, **SWC-1255**.

---

## ARIA and WCAG context

### Pattern in the APG

- **Select-only combobox:** Use the **[Combobox pattern (select-only example)](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/)** as the behavioral baseline: **closed** popup, **`listbox`** popup, **`combobox`** on the **trigger**, **`aria-expanded`**, **`aria-controls`** (or equivalent association) to the **listbox**, and **typeahead** / **arrow-key** navigation consistent with the **Listbox** pattern.
- **Listbox:** The popup content is a **`listbox`** with **`option`** children (and optional **`group`**). See **[Listbox example with grouped options](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/examples/listbox-grouped/)** and **[Scrollable listbox example](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/examples/listbox-scrollable/)**.
- **`aria-activedescendant`:** The APG often pairs **`aria-activedescendant`** on the **combobox** with **IDs** on options. Because **options** may live in **shadow DOM** or a **different** root than the trigger, **requiring** `aria-activedescendant` can force **all** options into one light DOM or a **cross-root ARIA** workaround. For **`swc-picker`**, prefer **DOM focus** on **options** while the popup or **tray** is open, driven **only** by **`FocusgroupNavigationController`** from [PR #6129](https://github.com/adobe/spectrum-web-components/pull/6129) (that controller owns roving **`tabindex`** and **option**-level keys). **Do not** use the 1st-gen **`FocusGroupController`** or **`RovingTabindexController`** on **`swc-picker`** or **`swc-listbox`**. The controller is intended to cover **all** APG **listbox** **option** keyboard behavior (**arrow** keys, **Home** / **End**, **typeahead**, optional **Page Up** / **Page Down** when configured, and related behavior)—so **`swc-listbox`** should **not** add a second key handler for options. Document any deviation in implementation notes and tests.
- **Keyboard:** Follow **[Keyboard interface practices](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/)** (focus order, no keyboard traps, **Escape** closes, **Tab** moves focus predictably).

### Guidelines that apply

| Idea | Plain meaning |
|------|----------------|
| [Name, role, value (WCAG 4.1.2)](https://www.w3.org/TR/WCAG22/#name-role-value) | The **combobox** must have an **accessible name** (visible label, **`aria-labelledby`**, and/or **`aria-label`**). The **value** (selected option) must be exposed in the **accessibility tree** and stay in sync with the UI. |
| [Labels or instructions (WCAG 3.3.2)](https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions.html) | **Label** and **help** must be **visible** and **programmatically** associated so screen readers announce them when users move to the control (see **SWC-1174**, **SWC-790** history on **`sp-picker`**). |
| [`combobox` role](https://www.w3.org/TR/wai-aria-1.2/#combobox) | Use **`role="combobox"`** on the **focusable trigger** (not on the whole field wrapper if that would break naming or form association). Set **`aria-haspopup="listbox"`**, **`aria-expanded`**, and associate the **listbox** per APG. |
| [`listbox` / `option`](https://www.w3.org/TR/wai-aria-1.2/#listbox) | Options are **selectable**; **selection** and **focus** behavior must match **single-select** rules. **Groups** use **`role="group"`** with **`aria-labelledby`** pointing at group labels. |
| [Info and relationships (WCAG 1.3.1)](https://www.w3.org/TR/WCAG22/#info-and-relationships) | **Group** labels must be **exposed** in the tree; **options** must not be exposed as **menus** or **links** unless the UX is intentionally a different pattern (then use another component). |
| [Pause, stop, hide (WCAG 2.2.2)](https://www.w3.org/TR/WCAG22/Understanding/pause-stop-hide.html) | **Pending** **spinners** or **looping** loaders must meet motion expectations; respect **reduced motion** where the platform supports it. Align timing and treatment with design **loading animation** specs. |

**Bottom line:** Ship **`swc-picker`** as a **select-only combobox** over a **real listbox** ( **`swc-listbox`** + **`swc-listbox-option`** ), with **APG-aligned** keyboard support and **honest** labeling—without borrowing **menu** semantics.

---

## Related 1st-gen accessibility (Jira)

| Jira | Type | Status (snapshot) | Resolution (snapshot) | Summary |
|------|------|-------------------|-------------------------|---------|
| [SWC-1044](https://jira.corp.adobe.com/browse/SWC-1044) | Story | Blocked | Unresolved | [Refactor] Migrate Picker to use FormFieldMixin, adding placeholder property to Picker |
| [SWC-1174](https://jira.corp.adobe.com/browse/SWC-1174) | Bug | To Do | Unresolved | [Accessibility] - Select or dropdown control missing a visible label - sp-picker (Menu) |
| [SWC-790](https://jira.corp.adobe.com/browse/SWC-790) | Bug | To Do | Unresolved | Picker with help-text is not announced by screen readers |
| [SWC-553](https://jira.corp.adobe.com/browse/SWC-553) | Bug | To Do | Unresolved | picker and action menu include untranslatable strings |
| [SWC-937](https://jira.corp.adobe.com/browse/SWC-937) | Bug | To Do | Unresolved | [Bug]: focus ring was not being applied to the picker when clicked |
| [SWC-1319](https://jira.corp.adobe.com/browse/SWC-1319) | Story | In Review | Unresolved | [RFC(Picker)] Refactor Picker to implement select-only combobox semantics |
| [SWC-1449](https://jira.corp.adobe.com/browse/SWC-1449) | Task | To Do | Unresolved | [feat(picker)] Implement keyboard functionality per W3C APG Select-Only Combobox pattern |
| [SWC-1611](https://jira.corp.adobe.com/browse/SWC-1611) | Task | To Do | Unresolved | [Fix(picker]: address CSS regression from formFieldMixin refactor |
| [SWC-630](https://jira.corp.adobe.com/browse/SWC-630) | Bug | Done | Fixed | Accessibility is not working on navigating through sp-picker items |
| [SWC-1171](https://jira.corp.adobe.com/browse/SWC-1171) | Bug | Done | Fixed | [Accessibility] - ARIA progressbar nodes does not have an accessible name - sp-picker (loading indicator) |
| [SWC-1255](https://jira.corp.adobe.com/browse/SWC-1255) | Bug | Done | Fixed | [Bug] Pending state controller uses semantically incorrect progress circle with accessibility issues |
| [SWC-1448](https://jira.corp.adobe.com/browse/SWC-1448) | Bug | Done | Done | [Refactor(picker, action-menu)] Remove PickerBase dependency from Picker and Action Menu component |
| [SWC-1488](https://jira.corp.adobe.com/browse/SWC-1488) | Bug | Done | Fixed | [Bug] Safari crashes when opening Picker/ActionMenu with VoiceOver enabled |
| [SWC-848](https://jira.corp.adobe.com/browse/SWC-848) | Task | Done | Fixed | docs(picker): add example of picker using `sp-menu-group` and warning not to use submenus |

---

## Recommendations: `<swc-picker>`

### ARIA roles, states, and properties

| Topic | What to do |
|-------|------------|
| **Single widget semantics** | The picker is **one** **combobox**-style control. **Do not** expose the popup as **`role="menu"`** or options as **`menuitem`** when the UX is **value selection**—use **`listbox`** / **`option`**. |
| **Trigger (`combobox`)** | **`role="combobox"`** on the **focusable** trigger. Set **`aria-haspopup="listbox"`**, **`aria-expanded`**, and wire **`aria-controls`** (or the pattern your implementation uses) to the **listbox** id. Keep **aria-autocomplete** consistent with **select-only** (typically **`none`**). |
| **Listbox (`swc-listbox`)** | **`role="listbox"`** on the container. If standalone, it needs a **visible** or **programmatic** label; inside **`swc-picker`**, association to the **combobox** must remain clear in the tree. |
| **Options (`swc-listbox-option`)** | **`role="option"`**. **`aria-selected`** reflects selection. **Do not** use **`href`**, **`role="link"`**, or **`role="menuitem"`** for options. **No** nested **menus** / **submenus** on an option. |
| **Grouped options** | Follow **[grouped listbox](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/examples/listbox-grouped/)**: **`role="group"`** with **`aria-labelledby`** referencing the group label element. |
| **Placeholder vs value** | Distinguish **empty** / **placeholder** presentation from the **real** selected value in both **visual** UI and **accessible name** / value exposure (see historical **`sp-picker`** label vs placeholder confusion, **SWC-333**). |
| **Form participation (`<form>`)** | **`FormFieldMixin`** does **not** implement **form-associated custom elements** (**FACE**). It handles **labeling** and **help text** only. **`swc-picker`** still needs a **separate** solution—typically **`ElementInternals`** (`attachInternals`, **`setFormValue`**, **form reset**, **`disabled`**, **`name`**)—so **name**, **value**, and **disabled** participate in **`<form>`** submission and reset like native fields. Track cross-cutting strategy in [SWC-1888](https://jira.corp.adobe.com/browse/SWC-1888). |
| **Label and help text** | Use **`FormFieldMixin`** (or the agreed 2nd-gen field pattern) for **label** / **help** behavior **as that mixin defines**; combine it with the **FACE** / **`ElementInternals`** solution above, not as a substitute for it. |
| **Automated accessibility tooling** | **axe-core** (and similar DOM scanners) still have **known issues** inferring labels and **form** semantics when **`ElementInternals`** is involved—treat **axe** results as **incomplete** for this control until tooling catches up; see [SWC-1888](https://jira.corp.adobe.com/browse/SWC-1888) and [Adobe Design Slack (ElementInternals / axe discussion)](https://adobedesign.slack.com/archives/G019JTYMT6H/p1773703269148529). |
| **Pending / loading** | For **busy** / **pending** state, prefer an **animated progress icon** (indeterminate **spinner** treatment) rather than **`progress-circle`** / **`role="progressbar"`**. A **progress bar** or **circle** implies a **measurable** task; a field waiting on data is **indeterminate busy** feedback and should use a **different** **role** / pattern (for example **`role="img"`** with **`aria-label`**, or **`aria-busy`** on the **combobox** with a **decorative** or **labeled** icon—follow implementation after design sign-off). The indicator must have a **clear name**, must **not** override **`combobox`** / **`listbox`** roles on the host, and should follow Spectrum **loading animation** guidance (see **References**). See **SWC-1171**, **SWC-1255**. |
| **Focus group navigation** | Use **only** **`FocusgroupNavigationController`** from 2nd-gen core ([PR #6129](https://github.com/adobe/spectrum-web-components/pull/6129)) inside **`swc-listbox`**. **Do not** use **`FocusGroupController`** or **`RovingTabindexController`**. The controller provides the **full** set of **listbox** **option** keyboard interactions; wire **`swc-picker`** / **`swc-listbox`** for **popover** and **tray** layouts—avoid a second, overlapping keydown layer on options. |

### Shadow DOM and cross-root ARIA Issues

- **Label and help vs form wiring:** **`FormFieldMixin`** is for **label** and **help text** patterns, **not** for **`ElementInternals`** **form** participation. **`swc-picker`** still needs an explicit **FACE** plan (**`ElementInternals`** or equivalent) for **`<form>`** **name** / **value** / **disabled**. A **pending** decision is whether **label** and **help** are **slotted** (for example **`swc-field-label`** / **`swc-help-text`**) so **`aria-labelledby`** / **`aria-describedby`** can reference **light-DOM** ids **without** bridges. If labels stay **only** in shadow roots, plan **`ElementInternals`** **labels** API, **`FormFieldMixin`** output, or **documented** id wiring so **names** and **descriptions** resolve across roots.
- **`aria-activedescendant` vs focus management:** If **trigger** and **options** are not in the **same** root for **IDREF** purposes, prefer **moving DOM focus** to **`option`** elements via **`FocusgroupNavigationController`** (see [PR #6129](https://github.com/adobe/spectrum-web-components/pull/6129)) while the **popover** or **tray** is open—do **not** rely on **invalid** cross-shadow **ID** references.
- **Virtualization:** If options are **virtualized**, preserve **keyboard** and **scroll-into-view** behavior from the **[scrollable listbox](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/examples/listbox-scrollable/)** example so the **focused** / **selected** row is always **perceivable**.

### Accessibility tree expectations

**Closed**

- Users hear the **combobox** **name**, current **value** (or placeholder), and **collapsed** state (**`aria-expanded="false"`**).

**Open**

- Users hear that the **listbox** opened, can navigate **options** (and **groups**), and get **selected** state on the active **option**.
- **No** **menu** or **link** landmarks for plain options.

**With grouped options**

- **Group** labels are **announced** when moving across groups, consistent with the **grouped listbox** example.

### Assistive technology, live regions

- **Do not** use **`aria-live="assertive"`** for routine **selection** changes.
- **Help text** and **validation** should use **stable** **`aria-describedby`** (or **slots** / **label association**) so users get **instructions** when focusing the **combobox**, matching **WCAG 3.3.2** expectations (see **SWC-790**).
- **Value changes** should rely on **combobox** / **listbox** semantics and **focus** movement—not **constant** polite **live** chatter for every **arrow** press.

### Keyboard and focus

- Align with **[select-only combobox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/)** and **[Listbox pattern](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/)** keyboard guidance, and with **[Keyboard interface](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/)** practices. **`FocusgroupNavigationController`** ([PR #6129](https://github.com/adobe/spectrum-web-components/pull/6129)) implements **all** **option**-level keys for the **listbox**—**not** **`FocusGroupController`** / **`RovingTabindexController`**. **`swc-picker`** handles **combobox**-level behavior (for example opening/closing, **Tab** into/out of the composite, and passing focus into the **listbox** when opened).
- When the **listbox** is shown in a **tray** on **narrow** viewports, preserve the same **arrow**, **typeahead**, **Escape**, and **focus restoration** expectations as in the **popover** layout; only **presentation** (tray vs popover) changes, not the **combobox** / **listbox** contract.
- **Tab** moves into the **trigger** and out of the widget without trapping; **Shift+Tab** reverses.
- **Arrow** keys move between **options** when open; **Home** / **End** (or documented equivalents) jump to first / last **option** where the pattern expects it.
- **Typeahead** (printable characters) moves to the next **option** whose **name** starts with the typed string, when the listbox is open (and optionally when closed if **1st-gen** parity requires—document the choice).
- **Escape** closes the popup and returns focus to the **trigger**; **Enter** / **Space** confirm selection per APG for the chosen pattern.
- Ensure **pointer-opened** pickers still support **arrow** navigation (historical **`sp-picker`** issues **SWC-230** / **SWC-58**).

---

## Testing

### Automated tests

| Kind of test | What to check |
|--------------|----------------|
| **Unit** | **Roles** and **states** on **trigger** and **listbox**; **aria-selected** on **options**; **group** labeling when groups exist. |
| **aXe + Storybook** | Run **WCAG 2.x** rules on **picker** + **listbox** stories (open/closed, grouped, long list). **Do not** rely on **axe** alone when **`ElementInternals`** supplies **labels** / **form** association—**axe-core** can report **false** missing-label or related issues for **form-associated custom elements**; cross-check with **Playwright ARIA snapshots**, **manual** screen reader passes, and [SWC-1888](https://jira.corp.adobe.com/browse/SWC-1888) / [Slack thread](https://adobedesign.slack.com/archives/G019JTYMT6H/p1773703269148529). |
| **Playwright ARIA snapshots** | **Open** popup, **focus** order, **selected** option, **group** rows; **no** **`menuitem`** roles on picker options. |
| **Responsive / tray** | Repeat critical **keyboard** and **focus** checks with the **tray** presentation (small viewport or equivalent story), including **Escape** and return focus to **trigger**. |
| **Keyboard** | **Tab**, **arrows**, **Escape**, **typeahead**, **Enter** / **Space**; open via **mouse** then **keyboard** (regression guard). |
| **Screen readers** | **VoiceOver** (macOS / iOS) and at least one other engine—**Safari** + VO historically sensitive (**SWC-1488**, **SWC-61**). |
| **Pending / loading** | **Snapshot** the tree in **pending** state: **no** spurious **`progressbar`** on the **combobox** host unless the UX is truly a **determinate** progress task; **busy** icon has a **name** and does not replace **`combobox`** semantics. |

---

## Summary checklist

- [ ] **`swc-picker`** implements **select-only combobox** semantics (not **menu**).
- [ ] Popup uses **`swc-listbox`** / **`swc-listbox-option`** (**listbox** / **option**), including **grouped** lists where needed.
- [ ] **Options** are **not** links and **not** **menuitems**; **no** submenus on options.
- [ ] **Label** and **help** are **visible** and **associated** (via **`FormFieldMixin`** or agreed pattern); decision recorded on **slotted** vs **shadow-only** labeling.
- [ ] **`<form>`** participation is implemented with **`ElementInternals`** (or documented **FACE** equivalent), **not** assumed from **`FormFieldMixin`** alone.
- [ ] **Focus management** uses **only** **`FocusgroupNavigationController`** ([PR #6129](https://github.com/adobe/spectrum-web-components/pull/6129)) for **listbox** **options**—**not** **`FocusGroupController`** or **`RovingTabindexController`**; no duplicate option key handlers; **`aria-activedescendant`** is not required unless engineering documents a **single-root** IDREF approach.
- [ ] **Tray** layout on **small viewports** keeps **combobox** / **listbox** semantics and **keyboard** parity with **popover** layout.
- [ ] **Long lists** scroll **active** options into view (**virtualized** or not).
- [ ] **Loading** / **pending** UI uses an **animated progress icon** (or equivalent **non–progressbar** pattern) where appropriate; **`combobox`** / **`listbox`** roles stay on the main control; motion matches **loading animation** design guidance.
- [ ] **i18n**: user-visible strings **translatable** (address **SWC-553** class issues).
- [ ] **Tests** cover **keyboard**, **ARIA snapshots**, and **critical** screen reader scenarios; **axe** gaps for **`ElementInternals`** are understood (see [SWC-1888](https://jira.corp.adobe.com/browse/SWC-1888)).

---

## References

- [WAI-ARIA 1.2](https://www.w3.org/TR/wai-aria-1.2/)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [Using ARIA (read this first)](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/)
- [Combobox pattern — select-only example](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/)
- [Listbox pattern](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/)
- [Listbox example with grouped options](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/examples/listbox-grouped/)
- [Scrollable listbox example](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/examples/listbox-scrollable/)
- [Keyboard interface practices](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/)
- [Picker migration roadmap](./rendering-and-styling-migration-analysis.md)
- [PR #6129 — focus management primitives / `FocusgroupNavigationController` (2nd-gen)](https://github.com/adobe/spectrum-web-components/pull/6129)
- [Figma — Loading animation discovery (Spectrum / Adobe Design)](https://www.figma.com/design/42VzvpW262EAUbYsadO4e8/Loading-animation-discovery?node-id=478-948207&t=W8mT0qzZJ4zd2MsX-0)
- Adobe internal (account required): [RFC — combobox semantics for Picker (wiki)](https://wiki.corp.adobe.com/spaces/AdobeDesign/pages/3655534558/RFC+Implement+combobox+semantics+for%C2%A0Picker%C2%A0component), [RFC board (Miro)](https://miro.com/app/board/uXjVIYMV_qU=/), [RFC — accessible action menu navigation (wiki)](https://wiki.corp.adobe.com/display/AdobeDesign/RFC%3A+Accessible+Action+Menu+Navigation)
- [SWC-1888](https://jira.corp.adobe.com/browse/SWC-1888) — RFC: form field strategy for 2nd-gen migration (**FACE** / **`ElementInternals`**, **`FormFieldMixin`** scope, **axe**—relevant to **picker**)
- [Adobe Design Slack — axe-core and `ElementInternals`](https://adobedesign.slack.com/archives/G019JTYMT6H/p1773703269148529) (Adobe workspace sign-in required)
