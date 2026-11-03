<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Menu Item Radio / Menu item radio component accessibility specification

<!-- Document title (editable) -->

# Menu item radio component accessibility specification

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Overview](#overview)
    - [Also read](#also-read)
    - [What a menu item radio is](#what-a-menu-item-radio-is)
    - [When to use something else](#when-to-use-something-else)
    - [Evidence and migration scope](#evidence-and-migration-scope)
    - [Decisions to resolve before implementation](#decisions-to-resolve-before-implementation)
- [ARIA and WCAG context](#aria-and-wcag-context)
    - [Pattern in the APG](#pattern-in-the-apg)
    - [Guidelines that apply](#guidelines-that-apply)
- [Related 1st-gen accessibility (Jira)](#related-1st-gen-accessibility-jira)
- [Recommendations: `<swc-menu-item-radio>`](#recommendations-swc-menu-item-radio)
    - [ARIA roles, states, and properties](#aria-roles-states-and-properties)
    - [Shadow DOM and cross-root ARIA Issues](#shadow-dom-and-cross-root-aria-issues)
    - [Accessibility tree expectations](#accessibility-tree-expectations)
    - [Form-associated custom properties (labels, `ElementInternals`)](#form-associated-custom-properties-labels-elementinternals)
    - [Live regions, loading, and announcements](#live-regions-loading-and-announcements)
    - [Motion (dedicated recommendations subsection)](#motion-dedicated-recommendations-subsection)
    - [Keyboard and focus](#keyboard-and-focus)
- [Testing](#testing)
    - [Automated tests](#automated-tests)
    - [Keyboard testing](#keyboard-testing)
    - [Manual and screen reader testing](#manual-and-screen-reader-testing)
- [Summary checklist](#summary-checklist)
- [References](#references)

</details>

<!-- Document content (editable) -->

## Overview

This specification defines proposed accessibility requirements for gen2 `swc-menu-item-radio` in Spectrum Web Components, targeting [WCAG 2.2](https://www.w3.org/TR/WCAG22/) Level AA. It covers a single-selection setting within a menu, not a radio form control. The component has one fixed semantic role: `menuitemradio`.

### Also read

- [Menu component accessibility specification](../menu/component-accessibility-specification.md).
- [Menu migration plan](../menu/migration-plan.md) and [rendering and styling migration analysis](../menu/rendering-and-styling-migration-analysis.md).
- [Menu item component accessibility specification](../menu-item/component-accessibility-specification.md).
- [Menu group component accessibility specification](../menu-group/component-accessibility-specification.md).
- [Menu separator component accessibility specification](../menu-separator/component-accessibility-specification.md).
- [Action menu component accessibility specification](../action-menu/component-accessibility-specification.md).
- [React Spectrum S2 Menu](https://react-spectrum.adobe.com/Menu), including selection and independently selectable sections.
- [APG editor menubar example](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/examples/menubar-editor/), including radio menu items and group boundaries.

### What a menu item radio is

A menu item radio is one choice in a mutually exclusive set of menu settings, such as **Sort by** with **Name**, **Date**, and **Size**. Activating an unchecked item checks it and unchecks the previous choice in the same set. Moving focus does not change the setting. Activating the checked item does not independently uncheck it.

Menus can own commands, navigation, and checked selection state without participating in a form. Neither a checked indicator nor a selection API makes an item a form control.

### When to use something else

- Use native radio inputs or a radio-group component for a conventional form question or an inline radio group. Ordinary radio-group arrow navigation normally changes selection; menu navigation does not.
- Use a picker or combobox with the appropriate listbox pattern for a dropdown form field.
- Use `swc-menu-item` for an action with no checked state.
- Use a separate menu item checkbox component for independent on/off choices or multiple selection.
- Use the menu family's dedicated link component for navigation. A radio menu item is not also a link or submenu trigger.

### Evidence and migration scope

The requirements below are proposals, not a claim that `swc-menu-item-radio` is implemented.

| Evidence | Verified finding and consequence |
| --- | --- |
| Current gen2 [menu base](../../../../gen2/packages/core/components/menu/Menu.base.ts), [types](../../../../gen2/packages/core/components/menu/Menu.types.ts), and [rendering](../../../../gen2/packages/swc/components/menu/Menu.ts) | The menu references an external trigger, uses `PlacementController`, and renders a shadow-internal `role="menu"` surface with native `popover="auto"`. Its allowed children and navigation query currently include only direct `swc-menu-item` children. No radio-item implementation exists in this checkout. |
| Existing menu-family accessibility specifications | Selectable rows are explicitly deferred. This document defines a separate follow-up component; it does not expand the plain menu item's role or declare selection shipped. |
| Menu migration plan | Phase A has no selection. Later selection work belongs to the menu, with independently selectable groups described as a future capability. The plan contains differing descriptions of when group-level selection ships; reconcile that sequencing before implementation. |
| 1st-gen [menu](../../../../1st-gen/packages/menu/src/Menu.ts) and [menu item](../../../../1st-gen/packages/menu/src/MenuItem.ts) | `sp-menu` maps single selection to `menuitemradio`; `sp-menu-item` maps `selected` to `aria-checked` for that role. The same legacy item also supports other roles. Gen2 separates those responsibilities rather than carrying role switching into this component. |
| User-supplied Figma export, `S2 _ Web (3).pdf`, pages 1, 3, and 4 | Menus support selection/configuration. Single-selection rows have selected and unselected designs, with and without thumbnails, across Small, Medium, Large, and Extra-large sizes. Default, Hover, and Disabled treatments are shown. The export does not specify ARIA, grouping rules, keyboard behavior, form participation, or dismissal. |
| User-supplied React Spectrum S2 Menu API | Menu and section selection APIs model application state. Item `value` represents collection data, not a documented form submission value. The supplied API has no documented menu/item form lifecycle contract. |
| APG editor menubar example | Radio items expose checked settings. A `group` can delimit a radio set; a submenu can define the set when all its items belong to the same radio group. The example supports activation with or without dismissal depending on the key. |
| User-supplied Jira issue list, November 3, 2026 | Statuses and resolutions in the legacy-issue table are supplied snapshots, not live verification. Jira access required authentication during this research. |

### Decisions to resolve before implementation

These are API and integration decisions, not reasons to omit the accessibility requirements below.

| Decision | Proposed requirement or question |
| --- | --- |
| Public checked-state API | Choose the item property name, parent selection API, stable item identifiers, and source of truth. Do not invent a second independent state store alongside the menu selection model. Legacy `selected`, React Spectrum `selectedKeys`, and ARIA `aria-checked` are not interchangeable API commitments. |
| Initial and empty selection | At most one item in a set is checked. Confirm whether initialization with no selection is allowed, whether a choice is required, and how removal of a checked item is handled. User activation of the checked radio must not clear it. |
| Selection scope and sequencing | Start with one menu-level set if following the menu plan's foundational selection phase. If independent sets or mixed sections ship, define and label each set, coordinate the group API, and preserve independent selections. Do not silently pull that later capability into Phase A. |
| Activation and dismissal | Proposed keyboard baseline: <kbd>Enter</kbd> selects and closes; <kbd>Space</kbd> selects without closing, as in the APG editor example. Confirm pointer/touch dismissal and whether a shared close-on-select policy or overrides are needed. Do not document such props as implemented. |
| Events and cancellation | Choose event names, dispatch owner, payload, and cancellation behavior with the parent menu. One gesture produces one logical activation and at most one selection-change notification. Re-activating the checked item does not report a changed value. If cancellation is supported, leave the complete set and parent state consistent. |
| Escape behavior | Proposed baseline: dismiss the current menu without clearing the checked setting. React Spectrum documents `escapeKeyBehavior` with a selection-clearing default, and the migration plan records it as open. Do not copy that default into SWC without an explicit decision; it differs from dismissal-only behavior. |
| Disabled items | Follow the menu plan: disabled rows remain discoverable by arrow navigation but cannot activate. This deliberately differs from the supplied React Spectrum `disabledKeys` description, which excludes focus. |
| Parent and group integration | Update allow-lists, item collection, keyboard/pointer activation, and relevant submenu/group composition before shipping. The existing parent's unconditional close paths do not yet distinguish checkable or disabled rows. |
| Visual completeness | Obtain a durable Figma source/frame link for the supplied export and confirm focus-visible treatment, thumbnail dependency, and whether the visual **Highlight** variant has any relationship to focus. Do not equate hover, highlight, focus, and checked state. |

---

## ARIA and WCAG context

### Pattern in the APG

- Follow the [menu button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) for the containing trigger and popup, and the [menu and menubar pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/) for checkable menu items.
- Use the [editor menubar example](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/examples/menubar-editor/) as a reference for exclusive selection, grouping, and key-specific dismissal. It is an illustrative example, not production-ready code or proof of assistive-technology support.
- Do not substitute the [radio group pattern](https://www.w3.org/WAI/ARIA/apg/patterns/radio/) for menu navigation. A set of radio menu items stays within a `menu` or `menubar`, optionally within a `group`, rather than introducing a `radiogroup` into the menu.
- A `group` organizes and names a set; it does not create another keyboard navigation scope or a nested menu.

### Guidelines that apply

| Idea | Plain meaning |
| --- | --- |
| [Information and relationships (1.3.1)](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) | Preserve the menu, optional labeled group, and radio-item relationships in the composed accessibility tree. |
| [Use of color (1.4.1)](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html) | Convey checked state with an indicator, not color alone. |
| [Contrast minimum (1.4.3)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) | Meet 4.5:1 for normal text and 3:1 for qualifying large text in enabled states. Inactive controls have an exception. |
| [Non-text contrast (1.4.11)](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) | Necessary checked and focus indicators meet 3:1 against adjacent colors in enabled states. Verify forced-colors rendering too. |
| [Keyboard (2.1.1)](https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html) and [no keyboard trap (2.1.2)](https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap.html) | Every setting is keyboard operable. Users can dismiss the menu and continue navigating. |
| [Focus order (2.4.3)](https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html), [focus visible (2.4.7)](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html), and [focus not obscured (2.4.11)](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html) | Focus follows menu order, is visibly distinct from selection, and is not entirely hidden by author-created content. |
| [Label in name (2.5.3)](https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html) | The accessible name contains the visible label, preferably in the same order. |
| [Target size minimum (2.5.8)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) | Verify at least 24 by 24 CSS pixels or a permitted exception for each supported size. |
| [On focus (3.2.1)](https://www.w3.org/WAI/WCAG22/Understanding/on-focus.html) | Focusing or hovering a radio menu item does not select or execute it. |
| [Name, role, value (4.1.2)](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html) | Expose a clear name, fixed `menuitemradio` role, checked state, and disabled state when applicable. |

---

## Related 1st-gen accessibility (Jira)

| Jira | Type | Status (snapshot) | Resolution (snapshot) | Summary | Notes |
| --- | --- | --- | --- | --- | --- |
| [SWC-1343](https://jira.corp.adobe.com/browse/SWC-1343) | Bug | Done | Fixed | Menu multiple-selection keyboard issues | Related checkable-menu regression context; verify single-selection navigation does not change checked state. |
| [SWC-1941](https://jira.corp.adobe.com/browse/SWC-1941) | Bug | To Do | Unresolved | Keyboard activation fails for menu items inside modal overlay-trigger and popover composition | Test the supported gen2 trigger/surface path rather than restoring the legacy overlay architecture. |
| [SWC-2407](https://jira.corp.adobe.com/browse/SWC-2407) | Bug | To Do | Unresolved | Menu items rendered inside another Lit element's shadow DOM are not keyboard accessible | Define supported composition and verify discovery and focus across supported shadow boundaries. |
| [SWC-2408](https://jira.corp.adobe.com/browse/SWC-2408) | Bug | To Do | Unresolved | Menu in overlay-trigger has accessibility problems and does not close with keyboard Escape | Verify native dismissal, focus return, and checked-state persistence in gen2. |
| [SWC-1090](https://jira.corp.adobe.com/browse/SWC-1090) | Bug | To Do | Unresolved | Keyboard navigation in a scrollable picker menu is interrupted by hover | Related legacy menu behavior: pointer hover must not accidentally activate or change the checked choice. |
| [SWC-212](https://jira.corp.adobe.com/browse/SWC-212) | Bug | Done | Fixed | Menu group causes nested menus when there is no selection | A radio-set group must remain `group`, not become another `menu`. |

---

## Recommendations: `<swc-menu-item-radio>`

### ARIA roles, states, and properties

| Topic | What to do |
| --- | --- |
| One semantic role | Prescribe `role="menuitemradio"` on the focusable row host. Do not expose a consumer role-switching API or document author overrides as supported. Use separate components for commands, checkboxes, links, or ordinary radios. |
| Parent context | Expose the row within the containing internal `role="menu"` in the composed tree, directly or through a supported `role="group"`. Do not add a standalone menu or radiogroup wrapper around each radio item. |
| Checked state | Always expose `aria-checked="true"` or `"false"` on the same row node. Never use `mixed`, `aria-selected`, or `aria-pressed` for this component's checked state. Keep visual state, item state, and parent selection state synchronized. |
| Mutual exclusion | Selecting one item unchecks only the prior item in its defined set. Never uncheck a choice in another group or submenu. The selection owner coordinates the complete update; the item does not search the whole document for siblings. |
| Accessible name | Derive the name from visible label content. Follow the menu plan's proposed named `label` slot convention, subject to the radio item's own API review. Support an explicit accessible name when necessary without replacing visible wording with unrelated text. |
| Description and supporting content | If descriptions ship, expose them as descriptions rather than folding all supporting text into the name. Noninteractive shortcut or value text must not introduce another focus target. Final slot names are not specified here. |
| Icons, thumbnails, and indicators | Keep redundant graphics and the checked glyph out of the accessible name. Thumbnail and non-thumbnail variants expose the same role and checked-state model. Essential image information must have an accessible text equivalent. |
| Disabled | Expose `aria-disabled="true"` on the row while preserving its name and checked state. Keep it in the parent menu's roving sequence. Suppress selection, action, and selection-triggered dismissal for keyboard, pointer, touch, and assistive-technology activation. ARIA alone does not suppress events. |
| Interactive descendants | Do not nest radios, checkboxes, switches, buttons, links, or editable fields inside the row. The row is the only interaction target. A visual radio indicator is not a second `radio` control. |
| Submenus | This component is a setting choice, not a submenu parent. Do not add `aria-haspopup` or `aria-expanded` to imply submenu behavior; use the plain menu item's submenu pattern instead. |
| Size and styling | Size, thumbnail presence, hover, and visual highlight do not change the semantic role or selection scope. Checked and focus states remain independently perceivable. |
| Documentation expectations | Demonstrate a complete trigger, menu, and exclusive set. Mark future grouped/mixed composition as conditional on parent support. Explain that selection identifiers or item values do not automatically become submitted form values. |

### Shadow DOM and cross-root ARIA Issues

The parent menu's semantic surface is shadow-internal, while items are slotted. Verify that the composed accessibility tree places each radio host under that menu or its group without a duplicate row, extra menu, or nested radio control.

Reuse the parent's `FocusgroupNavigationController` and real DOM focus. Do not add per-item `aria-activedescendant` references or another roving controller on the radio set. Parent item discovery must include radio rows in supported direct-child and group compositions, while excluding descendants belonging to other submenu scopes.

If labels or descriptions are rendered in the item's shadow tree while semantics remain on its host, do not assume string ID references cross that boundary. Choose and test the repository's supported ARIA element-reference/delegation strategy or keep referring and referenced nodes in the same tree root. Preserve author-supplied same-root naming relationships. Use `ElementInternals` for semantic defaults if appropriate, not as evidence of form association.

Keep a group's visible label and its semantic naming relationship valid as described in the [group specification](../menu-group/component-accessibility-specification.md#shadow-dom-and-cross-root-aria-issues). The current menu tests document that Playwright snapshots do not expose all element-reference naming relationships; test the wiring separately and confirm actual names with assistive technology.

### Accessibility tree expectations

The following is a proposed logical tree, not literal custom-element or shadow markup:

```text
button "Sort by" [expanded=true] [haspopup=menu]
menu "Sort by"
  menuitemradio "Name" [checked=false]
  menuitemradio "Date" [checked=true]
  menuitemradio "Size" [checked=false] [disabled=true]
```

When independent groups are supported, expose a named `group` for each exclusive set within the menu. A group is not an extra menu, tab stop, or `radiogroup`. Group labels and separators do not become radio items.

Each item exposes one name, the radio-menu-item role, and its current checked/disabled states. Thumbnail and checked-indicator graphics do not create duplicate control announcements. Closing and reopening the menu preserves the checked setting unless application state changes.

### Form-associated custom properties (labels, `ElementInternals`)

Does not apply. This component is intentionally not form-associated: it does not provide a form owner, automatic submission value, constraint validation, or form-reset lifecycle. Menu and group selection state is application state, not an HTML form contract.

The `menuitemradio` role does not itself require or prohibit form association; this is the component boundary chosen for SWC. ARIA naming and possible use of `ElementInternals` for semantics do not change it. If an application needs to submit the chosen setting, a separate form control or application integration owns that lifecycle. A picker or combobox must still use its own appropriate semantics rather than becoming a menu solely to reuse this row.

### Live regions, loading, and announcements

Does not apply to the default row contract. Use the role and checked state to communicate selection. Do not add a live region that repeats every focus or checked-state change; overlapping announcements create noise. Any separate application-status message needs its own justification.

### Motion (dedicated recommendations subsection)

Intentionally omitted. This specification adds no row animation requirement. Layer transitions remain the parent menu's responsibility.

### Keyboard and focus

The parent menu owns opening, focus entry, roving `tabindex`, navigation, dismissal, and focus return. The item owns its activation semantics in coordination with the selection owner. There is one focus target per row and one navigation scope per menu list, not one per exclusive set.

| Input | Proposed behavior |
| --- | --- |
| <kbd>ArrowDown</kbd> / <kbd>ArrowUp</kbd> | Move focus through the parent menu's item sequence, wrapping per its existing configuration. Do not change checked state, including when moving across groups or disabled rows. |
| <kbd>Home</kbd> / <kbd>End</kbd> | Move to the first/last item in the current menu list without selecting it. |
| <kbd>Enter</kbd> | Check the focused enabled item and uncheck its previous peer, then close the current menu and return focus through the parent pattern. Already-checked activation leaves selection unchanged. |
| <kbd>Space</kbd> | Check the focused enabled item without closing; retain focus on that row. Already-checked activation leaves selection unchanged. Prevent page scrolling and duplicate synthesized activation. This keep-open behavior is a proposal based on the APG example. |
| Pointer or touch activation | Apply the same exclusive-selection rules once per gesture. Follow the dismissal policy agreed with the parent menu. Hover, pointer movement, and scrolling are not activation. |
| <kbd>Escape</kbd> | Dismiss through the parent menu and restore the appropriate trigger/parent-item focus. Do not clear the checked setting under the proposed baseline. |
| <kbd>Tab</kbd> / <kbd>Shift</kbd> + <kbd>Tab</kbd> | Do not create a tab stop on every radio item or an independent radio-group tab sequence. Follow the parent menu's policy. Current `MenuBase` prevents <kbd>Tab</kbd> on recognized rows; retain a working <kbd>Escape</kbd> exit. APG describes dismissal and continued tab navigation, so any family-wide alignment is a parent-menu decision, not a row-local override. |
| Printable characters | If the parent implements printable-character navigation, include radio labels in the same focus-only behavior. Do not add a separate item-local typeahead or change selection. |

Preserve the parent's focus-on-open behavior rather than automatically applying native radio-group focus entry to the checked choice. Keep focus and checked-state memory separate. When the focused item is removed, the parent repairs focus; changing focus alone must not select a replacement. Define the checked-item removal policy before implementation.

---

## Testing

### Automated tests

These are acceptance requirements for future implementation. Reuse the menu family's Storybook interaction/aXe coverage and Playwright accessibility tests.

| Kind of test | What to check |
| --- | --- |
| Role, name, and state | Fixed `menuitemradio`, nonempty name containing the visible label, boolean `aria-checked`, and disabled state. No `mixed`, `aria-selected`, nested radio control, or duplicate semantic row. |
| Exclusive selection | Activating an unchecked item changes only its own set; activating the checked item does not clear it. Initial empty selection and checked-item removal follow the approved policy. Programmatic updates keep the parent, item state, and ARIA consistent. |
| Group and submenu scope | When supported, independent groups preserve each other's selection; submenu rows never enter the ancestor's selection/navigation set. Group headings and separators are not selectable or focusable rows. |
| Keyboard interaction | Arrows and <kbd>Home</kbd>/<kbd>End</kbd> move focus only; <kbd>Space</kbd> selects without scroll or dismissal under the proposed baseline; <kbd>Enter</kbd> selects before dismissal. Test the chosen <kbd>Tab</kbd> policy and a working <kbd>Escape</kbd> exit. |
| Disabled activation | Disabled checked and unchecked items remain discoverable. Keyboard, pointer, and synthesized activation neither change selection nor close the menu as a side effect of activation. |
| Activation events | One gesture causes one activation and at most one logical selection change. No duplicate event from both key handling and synthesized click. Verify cancellation consistency if cancellation is supported. |
| Parent integration | Allowed-child validation, item discovery, navigation, and dismissal include radio items in supported compositions. Regression-test the parent's generic click/Enter close paths against disabled and keep-open behavior. |
| aXe / Storybook | Run complete menu stories with selected, unselected, disabled, thumbnail, and non-thumbnail items as available. An isolated radio row without its required menu context is not the primary accessibility fixture. |
| Playwright / ARIA snapshots | Assert the open menu's hierarchy, names where tooling exposes them, and checked/disabled states. Separately test element-reference ARIA wiring. Use trusted input for native dismissal and focus return, following existing menu tests. |
| Persistence and dismissal | Reopen after <kbd>Enter</kbd>, <kbd>Escape</kbd>, outside click, or trigger re-press; the selected setting persists. No trailing click reopens the menu or activates content underneath it. |
| Shadow DOM | Test supported slotted and shadow-root compositions, including name/description resolution. Unsupported wrappers must receive repository-standard diagnostics rather than silently losing keyboard access. |
| Form boundary | A menu containing radio items inside a native `<form>` does not automatically add selection entries to `FormData`, participate in constraint validation, reset the selected setting, or submit the form when a row is activated. |
| Visual accessibility | Verify checked versus focus versus hover across all supported sizes, 24 by 24 CSS pixel target sizing or a valid exception, text/indicator contrast, forced colors, zoom, and long/localized labels. |

### Keyboard testing

Use the [keyboard testing guide](../../../../gen2/packages/swc/.storybook/guides/accessibility-guides/keyboard_testing.mdx) with a real trigger and menu. Navigate from a checked item to an unchecked item and confirm that focus alone does not change the setting. Select with each supported input, revisit the checked item, and verify independent focus/selection state after dismissal and reopening.

Include disabled rows, a scrollable menu, and parent-supported group/submenu variants. Verify that keyboard navigation remains usable after pointer opening and that incidental hover does not activate a setting.

### Manual and screen reader testing

Follow the [screen reader testing guide](../../../../gen2/packages/swc/.storybook/guides/accessibility-guides/screen_reader_testing.mdx). Test VoiceOver with Safari, NVDA with Firefox or Chrome, and JAWS with Chrome or Edge, recording browser, OS, and assistive-technology versions. Add mobile VoiceOver/TalkBack coverage for supported touch presentations; this does not bring the deferred mobile tray into scope.

Confirm that each row announces its name, radio-menu-item role, checked state, and disabled state when applicable. Confirm group context when grouping is supported, with no duplicate label or checked-glyph announcement. Focus movement must not announce a selection change unless selection actually changes. Exact spoken wording may vary across platforms.

Test selection that keeps the menu open as well as selection that closes it, checking meaningful focus return and persistent checked state. Do not treat an aXe pass or a Playwright snapshot as a substitute for these checks.

---

## Summary checklist

- [ ] One fixed `menuitemradio` role; no role-switching API, link mode, submenu mode, or nested interactive control.
- [ ] Boolean checked state stays synchronized with visual and parent selection state; no more than one checked item per defined set.
- [ ] Activating the checked item does not independently uncheck it; focus and hover never select it.
- [ ] Public state API, initial/empty selection, removal policy, event ownership/cancellation, dismissal, and Escape behavior are resolved before implementation.
- [ ] Parent allow-lists, item discovery, activation, dismissal, and supported composition include radio items without changing the shipped Phase A contract prematurely.
- [ ] Group-level selection sequencing and mixed-menu guidance are reconciled with the menu and group plans.
- [ ] Disabled rows remain discoverable and cannot select, activate, or cause selection-triggered dismissal.
- [ ] Names, descriptions, group labels, and checked indicators work across supported shadow boundaries without duplicate controls.
- [ ] Component remains non-form-associated; form submission, validation, reset, and accidental-submit boundaries are tested.
- [ ] Keyboard and trusted-input tests verify focus-only navigation, exclusive selection, dismissal, focus return, and persistent selection.
- [ ] Storybook demonstrates complete menu composition and supported visual variants; contrast, focus visibility, target size, forced colors, and zoom are checked.
- [ ] Manual screen reader testing verifies name, role, state, group context, and single activation on supported desktop/touch platforms.
- [ ] A durable Figma source/frame link is recorded before final design sign-off; static variants are not treated as interaction specifications.

---

## References

- [WAI-ARIA 1.2: `menuitemradio`](https://www.w3.org/TR/wai-aria-1.2/#menuitemradio).
- [WAI-ARIA APG: Menu button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/).
- [WAI-ARIA APG: Menu and menubar pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/).
- [WAI-ARIA APG: Editor menubar example](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/examples/menubar-editor/).
- [WAI-ARIA APG: Radio group pattern](https://www.w3.org/WAI/ARIA/apg/patterns/radio/).
- [WAI-ARIA APG: Read me first](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/).
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/).
- [React Spectrum S2 Menu](https://react-spectrum.adobe.com/Menu). The user-supplied API snapshot was reviewed; this is not a claim of source-level React implementation verification.
- Figma evidence: user-supplied `S2 _ Web (3).pdf`, four-page Menu export. The source/frame URL was not supplied; page-specific findings are recorded under [Evidence and migration scope](#evidence-and-migration-scope).
- [Menu migration plan](../menu/migration-plan.md).
- [Menu rendering and styling migration analysis](../menu/rendering-and-styling-migration-analysis.md).
- [Menu component accessibility specification](../menu/component-accessibility-specification.md).
- [Menu item component accessibility specification](../menu-item/component-accessibility-specification.md).
- [Menu group component accessibility specification](../menu-group/component-accessibility-specification.md).
- [Menu separator component accessibility specification](../menu-separator/component-accessibility-specification.md).
- [Action menu component accessibility specification](../action-menu/component-accessibility-specification.md).
- [gen2 menu base](../../../../gen2/packages/core/components/menu/Menu.base.ts), [types](../../../../gen2/packages/core/components/menu/Menu.types.ts), [rendering](../../../../gen2/packages/swc/components/menu/Menu.ts), and [Playwright accessibility tests](../../../../gen2/packages/swc/components/menu/test/menu.a11y.spec.ts).
- [Focusgroup navigation controller](../../../../gen2/packages/core/controllers/focusgroup-navigation-controller/focusgroup-navigation-controller.mdx).
- [1st-gen menu](../../../../1st-gen/packages/menu/src/Menu.ts) and [menu item](../../../../1st-gen/packages/menu/src/MenuItem.ts).
- [gen2 Storybook: Keyboard testing](../../../../gen2/packages/swc/.storybook/guides/accessibility-guides/keyboard_testing.mdx).
- [gen2 Storybook: Screen reader testing](../../../../gen2/packages/swc/.storybook/guides/accessibility-guides/screen_reader_testing.mdx).
