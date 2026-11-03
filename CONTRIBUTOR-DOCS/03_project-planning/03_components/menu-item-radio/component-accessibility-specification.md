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

The component is not implemented in this checkout. These recommendations cover accessibility semantics and interaction, not the component's public API or migration plan. Selectable rows remain outside the scope of the existing [plain menu item specification](../menu-item/component-accessibility-specification.md#migration-scope-this-phase).

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

| Jira | Type | Status (snapshot) | Resolution (snapshot) | Summary |
| --- | --- | --- | --- | --- |
| [SWC-1343](https://jira.corp.adobe.com/browse/SWC-1343) | Bug | Done | Fixed | Menu multiple-selection keyboard issues |
| [SWC-1941](https://jira.corp.adobe.com/browse/SWC-1941) | Bug | To Do | Unresolved | Keyboard activation fails for menu items inside modal overlay-trigger and popover composition |
| [SWC-2407](https://jira.corp.adobe.com/browse/SWC-2407) | Bug | To Do | Unresolved | Menu items rendered inside another Lit element's shadow DOM are not keyboard accessible |
| [SWC-2408](https://jira.corp.adobe.com/browse/SWC-2408) | Bug | To Do | Unresolved | Menu in overlay-trigger has accessibility problems and does not close with keyboard Escape |

---

## Recommendations: `<swc-menu-item-radio>`

### ARIA roles, states, and properties

| Topic | What to do |
| --- | --- |
| One semantic role | Prescribe `role="menuitemradio"` on the focusable row host. Do not expose a consumer role-switching API or document author overrides as supported. Use separate components for commands, checkboxes, links, or ordinary radios. |
| Parent context | Expose the row within the containing internal `role="menu"` in the composed tree, directly or through a supported `role="group"`. Do not add a standalone menu or radiogroup wrapper around each radio item. |
| Checked state | Always expose `aria-checked="true"` or `"false"` on the same row node. Never use `mixed`, `aria-selected`, or `aria-pressed` for this component's checked state. Keep visual state, item state, and parent selection state synchronized. |
| Mutual exclusion | No more than one item in a defined set is checked. Selecting one item unchecks only its previous peer, not a choice in another group or submenu. Activating the checked item does not independently uncheck it. |
| Accessible name | Derive the name from visible label content or a valid `aria-labelledby` / `aria-label` relationship. The accessible name must contain the visible label. |
| Description and supporting content | When present, expose supporting descriptions as descriptions rather than folding all supporting text into the name. Noninteractive shortcut or value text must not introduce another focus target. |
| Icons, thumbnails, and indicators | Keep redundant graphics and the checked glyph out of the accessible name. Thumbnail and non-thumbnail variants expose the same role and checked-state model. Essential image information must have an accessible text equivalent. |
| Disabled | Expose `aria-disabled="true"` on the row while preserving its name and checked state. Keep it in the parent menu's roving sequence. Suppress selection, action, and selection-triggered dismissal for keyboard, pointer, touch, and assistive-technology activation. ARIA alone does not suppress events. |
| Interactive descendants | Do not nest radios, checkboxes, switches, buttons, links, or editable fields inside the row. The row is the only interaction target. A visual radio indicator is not a second `radio` control. |
| Submenus | This component is a setting choice, not a submenu parent. Do not add `aria-haspopup` or `aria-expanded` to imply submenu behavior; use the plain menu item's submenu pattern instead. |
| Size and styling | Size, thumbnail presence, hover, and visual highlight do not change the semantic role or selection scope. Checked and focus states remain independently perceivable. |
| Documentation expectations | Demonstrate a complete trigger, menu, and exclusive set. Explain the difference between a radio menu item and an ordinary radio control; checked state does not imply form participation. |

### Shadow DOM and cross-root ARIA Issues

Follow [Menu — Shadow DOM](../menu/component-accessibility-specification.md#shadow-dom-and-cross-root-aria-issues). The composed accessibility tree must place each radio row under its menu or group, without a duplicate row, extra menu, or nested radio control.

Use the menu family's real DOM focus and roving `tabindex` pattern, not cross-root `aria-activedescendant` references. Group labels follow the [group specification](../menu-group/component-accessibility-specification.md#shadow-dom-and-cross-root-aria-issues).

Names and descriptions must resolve on the semantic row. String ID references must not depend on crossing a shadow boundary. Verify naming relationships in the accessibility tree and with assistive technology.

### Accessibility tree expectations

The following is a proposed logical tree, not literal custom-element or shadow markup:

```text
button "Sort by" [expanded=true] [haspopup=menu]
menu "Sort by"
  menuitemradio "Name" [checked=false]
  menuitemradio "Date" [checked=true]
  menuitemradio "Size" [checked=false] [disabled=true]
```

When a menu contains independent radio sets, expose their group boundaries and names. A group is not an extra menu, tab stop, or `radiogroup`. When all items belong to one radio set, the menu itself can define that set, as in the APG editor example.

Each item exposes one name, the radio-menu-item role, and its current checked/disabled states. Thumbnail and checked-indicator graphics do not create duplicate control announcements. Closing and reopening the menu preserves the checked setting unless application state changes.

### Form-associated custom properties (labels, `ElementInternals`)

Does not apply. `swc-menu-item-radio` is not a form-associated control. Checked state is a menu setting, not an automatic submission value. Accessible naming or use of `ElementInternals` for semantics does not create form association; use an appropriate form control when form participation is required.

### Live regions, loading, and announcements

Does not apply to the row by default. Use the role and checked state to communicate selection, without a live region repeating focus or checked-state changes.

### Motion (dedicated recommendations subsection)

Intentionally omitted. This specification adds no row animation requirement. Layer transitions remain the parent menu's responsibility.

### Keyboard and focus

Follow the parent menu's roving `tabindex` pattern and `FocusgroupNavigationController`. There is one focus target per row and one navigation scope per menu list, not one per exclusive set. The following recommendations use the APG editor example's distinction between activation with and without dismissal.

| Input | Recommended behavior |
| --- | --- |
| <kbd>ArrowDown</kbd> / <kbd>ArrowUp</kbd> | Move focus through the parent menu's item sequence, wrapping per its existing configuration. Do not change checked state, including when moving across groups or disabled rows. |
| <kbd>Home</kbd> / <kbd>End</kbd> | Move to the first/last item in the current menu list without selecting it. |
| <kbd>Enter</kbd> | Check the focused enabled item and uncheck its previous peer, then close the current menu and return focus through the parent pattern. Already-checked activation leaves selection unchanged. |
| <kbd>Space</kbd> | Check the focused enabled item without closing; retain focus on that row. Already-checked activation leaves selection unchanged. Prevent page scrolling and duplicate activation. APG permits this keep-open interaction. |
| Pointer or touch activation | Apply the same exclusive-selection rules once per gesture. Hover, pointer movement, and scrolling are not activation. |
| <kbd>Escape</kbd> | Dismiss through the parent menu and restore the appropriate trigger/parent-item focus without clearing the checked setting. |
| <kbd>Tab</kbd> / <kbd>Shift</kbd> + <kbd>Tab</kbd> | Follow the containing menu's keyboard contract, with a working exit from the menu. Do not introduce an additional tab stop for every radio item or an independent radio-group tab sequence. |
| Printable characters | Follow the parent menu's optional [printable-character navigation](../menu/component-accessibility-specification.md#printable-character-navigation-optional-not-typeahead). Move focus without changing selection. |

Disabled rows remain discoverable by arrow navigation but cannot activate. Keep focus and checked state separate: moving focus, opening the menu, or repairing focus after an item is removed must not by itself select a choice.

---

## Testing

### Automated tests

These are accessibility test requirements for the component's future implementation, not a record of completed testing.

| Kind of test | What to check |
| --- | --- |
| Unit / Storybook interaction | Fixed `menuitemradio`, clear name, boolean checked state, and disabled state. Activating an unchecked item checks only that choice in its set; activating the checked item does not clear it. No nested interactive control or duplicate activation. |
| Keyboard interaction | Arrows and <kbd>Home</kbd>/<kbd>End</kbd> move focus only. Verify activation, disabled rows, keep-open selection, dismissal, focus return, and a working exit from the menu. |
| aXe / Storybook | Test radio items in a complete menu, including checked, unchecked, disabled, and supported thumbnail/non-thumbnail presentations. |
| Playwright / ARIA snapshots | Verify menu/group hierarchy, item names, checked/disabled states, and no duplicate semantic rows. Confirm names with assistive technology where snapshot tooling cannot expose an ARIA relationship. |
| With menu / group | Independent sets preserve each other's selections when supported. Checked state persists through closing and reopening; supported shadow-root compositions preserve naming and keyboard access. |
| Visual accessibility | Verify separate checked, focus, and hover treatments, text/indicator contrast, forced colors, zoom, long/localized labels, and at least 24 by 24 CSS pixel targets or a valid exception. |

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
- [ ] Disabled rows remain discoverable and cannot select, activate, or cause selection-triggered dismissal.
- [ ] Names, descriptions, group labels, and checked indicators work across supported shadow boundaries without duplicate controls.
- [ ] Component remains non-form-associated; checked state is not documented as an automatic form submission value.
- [ ] Keyboard and trusted-input tests verify focus-only navigation, exclusive selection, dismissal, focus return, and persistent selection.
- [ ] Storybook demonstrates complete menu composition and supported visual variants; contrast, focus visibility, target size, forced colors, and zoom are checked.
- [ ] Manual screen reader testing verifies name, role, state, group context, and single activation on supported desktop/touch platforms.

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
- Figma: user-supplied `S2 _ Web (3).pdf`, pages 1, 3, and 4. Selected/unselected single-selection rows, including thumbnail variants, inform the checked-state and visual accessibility guidance. The export does not specify keyboard interaction or form behavior; no source/frame URL was supplied.
- [Menu migration plan](../menu/migration-plan.md).
- [Menu rendering and styling migration analysis](../menu/rendering-and-styling-migration-analysis.md).
- [Menu component accessibility specification](../menu/component-accessibility-specification.md).
- [Menu item component accessibility specification](../menu-item/component-accessibility-specification.md).
- [Menu group component accessibility specification](../menu-group/component-accessibility-specification.md).
- [Menu separator component accessibility specification](../menu-separator/component-accessibility-specification.md).
- [Action menu component accessibility specification](../action-menu/component-accessibility-specification.md).
- [Focusgroup navigation controller](../../../../gen2/packages/core/controllers/focusgroup-navigation-controller/focusgroup-navigation-controller.mdx).
- [1st-gen menu](../../../../1st-gen/packages/menu/src/Menu.ts) and [menu item](../../../../1st-gen/packages/menu/src/MenuItem.ts).
- Jira status and resolution snapshots: issue list supplied November 3, 2026; not live-verified.
- [gen2 Storybook: Keyboard testing](../../../../gen2/packages/swc/.storybook/guides/accessibility-guides/keyboard_testing.mdx).
- [gen2 Storybook: Screen reader testing](../../../../gen2/packages/swc/.storybook/guides/accessibility-guides/screen_reader_testing.mdx).
