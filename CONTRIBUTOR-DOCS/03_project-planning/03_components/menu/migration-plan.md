<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Menu / Menu migration plan

<!-- Document title (editable) -->

# Menu migration plan

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [TL;DR](#tldr)
    - [Most blocking open questions](#most-blocking-open-questions)
- [1st-gen API surface](#1st-gen-api-surface)
    - [Properties / attributes](#properties--attributes)
    - [Methods](#methods)
    - [Events](#events)
    - [Slots](#slots)
    - [CSS custom properties](#css-custom-properties)
    - [Shadow DOM output (rendered HTML)](#shadow-dom-output-rendered-html)
- [React Spectrum S2 API surface](#react-spectrum-s2-api-surface)
    - [MenuTrigger](#menutrigger)
    - [Menu](#menu)
    - [MenuItem](#menuitem)
    - [MenuSection](#menusection)
    - [SubmenuTrigger](#submenutrigger)
    - [UnavailableMenuItemTrigger](#unavailablemenuitemtrigger)
    - [Divider](#divider)
    - [Accessibility notes from React Spectrum](#accessibility-notes-from-react-spectrum)
- [Dependencies](#dependencies)
- [Open gen1 issues](#open-gen1-issues)
- [Migration sequencing and prerequisites](#migration-sequencing-and-prerequisites)
    - [Dependency-aware recommendation](#dependency-aware-recommendation)
    - [Related components and ordering notes](#related-components-and-ordering-notes)
    - [User confirmation needed](#user-confirmation-needed)
- [Changes overview](#changes-overview)
    - [Must ship — breaking or a11y-required](#must-ship--breaking-or-a11y-required)
    - [Additive — ships when ready, zero breakage for consumers already on 2nd-gen](#additive--ships-when-ready-zero-breakage-for-consumers-already-on-2nd-gen)
- [2nd-gen API decisions](#2nd-gen-api-decisions)
    - [Public API](#public-api)
    - [Behavioral semantics](#behavioral-semantics)
    - [Accessibility semantics notes (2nd-gen)](#accessibility-semantics-notes-2nd-gen)
- [Architecture: core vs SWC split](#architecture-core-vs-swc-split)
- [Migration checklist](#migration-checklist)
    - [Preparation (this ticket)](#preparation-this-ticket)
    - [Setup](#setup)
    - [API](#api)
    - [Styling](#styling)
    - [Accessibility](#accessibility)
    - [Testing](#testing)
    - [Documentation](#documentation)
    - [Review](#review)
- [Blockers and open questions](#blockers-and-open-questions)
    - [Design](#design)
    - [Architecture and behavior](#architecture-and-behavior)
    - [Scope and prerequisites](#scope-and-prerequisites)
- [References](#references)

</details>

<!-- Document content (editable) -->

> **Epic [SWC-1980](https://jira.corp.adobe.com/browse/SWC-1980)** · Planning output. Must be reviewed before implementation begins.
>
> This plan scopes **`swc-menu`** only: the trigger + `swc-popover` + shadow-internal `role="menu"` host. `swc-menu-item`, `swc-menu-group`, and `swc-menu-separator` each already have a standalone accessibility migration analysis in `CONTRIBUTOR-DOCS` and are expected to get their own `migration-plan.md` — this plan treats them as **dependencies**, not in-scope deliverables (see [Migration sequencing and prerequisites](#migration-sequencing-and-prerequisites)). The 1st-gen API surface below documents the full `@spectrum-web-components/menu` package (Menu, MenuItem, MenuGroup, MenuDivider) for reference, since 1st-gen ships them together.

---

## TL;DR

- `swc-menu` becomes a full [menu button](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) host — trigger, `swc-popover` for placement, and a shadow-internal `role="menu"` surface — replacing 1st-gen `sp-menu`, which was most often just the list under an externally-composed trigger and overlay. This mirrors React Spectrum [Menu](https://react-spectrum.adobe.com/Menu) and is structurally parallel to `swc-action-menu`.
- **Hard sequencing risk:** `swc-menu` depends on `swc-popover` for anchored placement, and neither Popover nor Action Menu has started migration (status table: no phases checked for either). This plan cannot assume a working `swc-popover` exists when `swc-menu` implementation begins.
- **Architecture break:** 1st-gen `MenuGroup extends Menu` (it inherits the entire menu/selection/roving-tabindex implementation and overrides `ownRole` to `'group'`). The a11y analysis describes `swc-menu-group` as a plain grouping/labeling primitive, not a menu-button host. Carrying the 1st-gen inheritance model forward would contradict that design and re-introduce unwanted API surface (selection, `value`, roving tabindex) on a component that should not have it.
- **Scope tension found in the Figma source:** the Menu group / Menu item property tables in the reviewed Figma file already model `Selection: None | Single | Multi-select (checkbox) | Multi-select (switch)`, `Unavailable`, `Show thumbnail`, and `Show highlight badge` as first-class menu item properties. The a11y analysis explicitly defers selectable menu items (checkboxes/radios) pending a product decision ([Migration scope](./accessibility-migration-analysis.md#migration-scope-current)). These two sources disagree on whether selection is in scope now — see [Q2](#design).
- Large chunks of 1st-gen `Menu.ts` implement mobile drilldown (`mobileView`, `mobileBackLabel`, submenu projection/restoration, touch/scroll heuristics). The a11y analysis puts mobile tray out of scope for the current migration; this plan treats that code as **not carried forward**, with no replacement timeline yet defined.
- `sp-menu`'s selection engine (`selects`, `value`, `selectedItems`, `selectOrToggleItem`) is consumed indirectly by `picker`, `combobox`, and `action-menu` today (all import or extend `sp-menu`). Deferring selection entirely as "Additive" may block those components' own future migrations — see [Q11](#scope-and-prerequisites).
- In-menu keyboard movement moves from `RovingTabindexController` to `FocusgroupNavigationController` ([PR #6129](https://github.com/adobe/spectrum-web-components/pull/6129)), matching the approach already recommended for `swc-action-menu`.
- The Figma source reviewed for this plan is a file titled **"🚫 S2 - Web (Deprecated)"**, not the canonical `S2 / Web (Desktop scale)` file named in the ticket — see [Q1](#design).

### Most blocking open questions

- **[Q8](#architecture-and-behavior)** — `swc-menu` cannot be implemented against a real `swc-popover` until Popover migration starts; no phase in this plan can assume anchored positioning exists yet.
- **[Q2](#design)** — Figma shows selection (single / multi-checkbox / multi-switch) as an already-designed menu item property; the a11y analysis defers all selection semantics. Must ship vs. Additive classification for selection depends on resolving this.
- **[Q11](#scope-and-prerequisites)** — whether `picker`, `combobox`, and `action-menu`'s own future migrations require `swc-menu` to ship baseline single-select now, which would pull selection out of "Additive."
- **[Q10](#scope-and-prerequisites)** — migration order among `swc-menu`, `swc-menu-item`, `swc-menu-group`, `swc-menu-separator`, and `swc-popover` is not yet decided; each has (or will have) its own plan.
- **[Q1](#design)** — confirm the Figma file reviewed here is the correct/current source; it is titled "Deprecated."

---

## 1st-gen API surface

**Source:** [`1st-gen/packages/menu/src/Menu.ts`](../../../../1st-gen/packages/menu/src/Menu.ts), [`MenuItem.ts`](../../../../1st-gen/packages/menu/src/MenuItem.ts), [`MenuGroup.ts`](../../../../1st-gen/packages/menu/src/MenuGroup.ts), [`MenuDivider.ts`](../../../../1st-gen/packages/menu/src/MenuDivider.ts)
**Version:** `@spectrum-web-components/menu` (see [package.json](../../../../1st-gen/packages/menu/package.json))
**Custom element tags:** `sp-menu`, `sp-menu-item`, `sp-menu-group`, `sp-menu-divider`

### Properties / attributes

**`sp-menu` (`Menu`, extends `SizedMixin(SpectrumElement, { noDefaultSize: true })`)**

| Property | Type | Default | Attribute | Notes |
| --- | --- | --- | --- | --- |
| `label` | `string` | `''` | `label` | Accessible name for the menu surface. |
| `ignore` | `boolean` | `false` | `ignore` | Reflects; excludes the menu from selection/roving management by an ancestor. |
| `mobileView` | `boolean` | `false` | `mobile-view` | Enables the mobile drilldown submenu presentation. Out of scope for 2nd-gen (see [TL;DR](#tldr)). |
| `mobileBackLabel` | `string` | `'Back'` | `mobile-back-label` | Label for the mobile drilldown back row. Out of scope for 2nd-gen. |
| `selects` | `'inherit' \| 'single' \| 'multiple' \| undefined` | `undefined` | `selects` | Selection algorithm applied to descendant `MenuItem`s. When absent, no `value`/`selected` management occurs. |
| `value` | `string` | `''` | `value` | Joined string of `selected` values (see `valueSeparator`). |
| `valueSeparator` | `string` | `','` | `value-separator` | Delimiter used to join/split `value` from `selected`. |
| `selected` | `string[]` | `[]` | — (`attribute: false`) | Selected item values; setter drives `selectedItems`/`value` sync. |
| `selectedItems` | `MenuItem[]` | `[]` | — (`attribute: false`) | Selected `MenuItem` element references. |
| `size` (via `SizedMixin`) | `'s' \| 'm' \| 'l'` | none (`noDefaultSize: true`) | `size` | No default is applied; menu inherits ambient sizing from its host context in practice. |

**`sp-menu-item` (`MenuItem`, extends `LikeAnchor(ObserveSlotText(ObserveSlotPresence(Focusable)))`)**

| Property | Type | Default | Attribute | Notes |
| --- | --- | --- | --- | --- |
| `active` | `boolean` | `false` | `active` | Reflects; true when the item is active or has an active descendant. |
| `focused` | `boolean` | `false` | `focused` | Reflects; keyboard focus state. |
| `selected` | `boolean` | `false` | `selected` | Reflects; managed by the parent `Menu`'s `selects` algorithm. |
| `value` | `string` | itemText fallback | `value` | Used as the selection value; falls back to trimmed text content when unset. |
| `hasSubmenu` | `boolean` | `false` | `has-submenu` | Reflects; true when the `submenu` slot has content. |
| `noWrap` | `boolean` | `false` | `no-wrap` | Reflects; disables text wrapping. |
| `open` | `boolean` | `false` | `open` | Reflects; whether the item's submenu is open. |
| `disabled` (via `Focusable`) | `boolean` | `false` | `disabled` | Standard disabled state. |
| `href`, `target`, `download`, `rel`, `referrerpolicy`, `label` (via `LikeAnchor`) | various | `undefined` | matching attrs | Makes the item render as/like an anchor; see [SWC-923](https://jira.corp.adobe.com/browse/SWC-923) for the known double-activation defect on this path. |
| `submenuElement` | `HTMLElement \| undefined` | `undefined` | — | Public reference to the slotted submenu element; used by the parent `Menu` for mobile projection. Marked `@internal`. |
| `_mobileSubmenuProjected` | `boolean` | `false` | — | Internal cross-class flag; explicitly documented as not to be depended on outside the package. |

**`sp-menu-group` (`MenuGroup`, extends `Menu`)**

- No properties of its own beyond what it inherits from `Menu`. Overrides `ownRole` to return `'group'` and `controlsRovingTabindex` to return `false`. Renders a `header` slot into a labeling `<span>` and wires `aria-labelledby` to it.

**`sp-menu-divider` (`MenuDivider`, extends `SizedMixin(SpectrumElement, { validSizes: ['s', 'm', 'l'] })`)**

- `size`: `'s' | 'm' | 'l'`, inherited from `SizedMixin`. Sets `role="separator"` in `firstUpdated`.

### Methods

| Method | Signature | Notes |
| --- | --- | --- |
| `Menu.focusOnFirstSelectedItem` | `({ preventScroll }?: FocusOptions) => void` | Public. |
| `Menu.focus` (override) | `({ preventScroll }?: FocusOptions) => void` | Public. |
| `Menu.selectOrToggleItem` | `(targetItem: MenuItem) => Promise<void>` | Public; applies `selects` semantics, fires `change` (cancelable). |
| `Menu.getNeighboringFocusableElement` | `(menuItem?: MenuItem, before?: boolean) => MenuItem` | Public. |
| `Menu.openMobileSubmenu` / `closeMobileSubmenu` / `resetMobileSubmenus` | various | Public; mobile drilldown only, out of scope for 2nd-gen. |
| `Menu.handleSubmenuOpened` / `handleSubmenuClosed` | `(event: Event) => void` | Public; re-dispatches `sp-menu-submenu-opened` / `sp-menu-submenu-closed` from the overlay target. Tied to the 1st-gen overlay-based submenu implementation. |

### Events

| Event | Bubbles / composed | Cancelable | Fired by | Notes |
| --- | --- | --- | --- | --- |
| `change` | yes / yes | yes (from `selectOrToggleItem`); no (from href-link path) | `Menu` | Fires on selection change, and unconditionally (non-cancelable) when an href item is activated — the href path is the known double-activation source ([SWC-923](https://jira.corp.adobe.com/browse/SWC-923)). |
| `close` | yes / no | no | `Menu` | Fires when a non-submenu, non-selects item is activated, signaling ancestors (overlay/picker) to close. |
| `sp-menu-submenu-opened` | yes / yes | no | overlay target (via `Menu.handleSubmenuOpened`) | Internal to the 1st-gen overlay-based submenu wiring. |
| `sp-menu-submenu-closed` | yes / yes | no | overlay target (via `Menu.handleSubmenuClosed`) | Internal to the 1st-gen overlay-based submenu wiring. |
| `sp-menu-item-added` (`MenuItemAddedOrUpdatedEvent`) | — | — | `MenuItem` | Announces item registration to the owning menu. |
| `focus` / `blur` (`FocusEvent`) | — | — | `MenuItem` | Re-dispatched native focus events. |

### Slots

| Slot | Content | Notes |
| --- | --- | --- |
| default (`Menu`) | Menu items to be listed | JSDoc: `@slot - menu items to be listed in the menu`. |
| `mobile-submenu` (`Menu`) | Projected submenu content during mobile drilldown | Out of scope for 2nd-gen. |
| default (`MenuItem`) | Text content of the item | |
| `description` (`MenuItem`) | Description placed below the label | |
| `icon` (`MenuItem`) | Leading icon | |
| `value` (`MenuItem`) | Trailing content (value, keyboard shortcut, etc.) | |
| `submenu` (`MenuItem`) | Submenu content | |
| `header` (`MenuGroup`) | Group headline | Wired to `aria-labelledby` on the group host. |
| default (`MenuGroup`) | Menu items listed in the group | |

### CSS custom properties

The associated [rendering and styling migration roadmap](./rendering-and-styling-migration-analysis.md) for Menu is a high-level roadmap document, not a full `--mod-*` mapping table (unlike some other components' analyses), so this section is necessarily a thin, surface-level pass rather than a systematic inventory. A direct scan of `menu.css` and `menu-item.css` in 1st-gen found minimal `--mod-*` usage (for example `--mod-menu-item-label-icon-color-disabled`); most sizing and color comes from shared `--spectrum-*` tokens and the divider/checkmark/chevron partials (`spectrum-checkmark.css`, `spectrum-chevron.css`, `spectrum-menu-divider.css`, `spectrum-menu-sectionHeading.css`) rather than a large component-specific modifier surface.

This full modifier surface will not be carried forward to 2nd-gen.

### Shadow DOM output (rendered HTML)

Representative simplified shape (not exhaustive; mobile-drilldown branches omitted):

```html
<!-- sp-menu -->
#shadow-root
  <slot @slotchange="handleSlotchange"></slot>
  <slot name="mobile-submenu"></slot>
  <!-- (mobile-view only) back row, drilldown containers -->

<!-- sp-menu-item -->
#shadow-root
  <a class="anchor" href="..."> <!-- only when href is set -->
    <slot name="icon"></slot>
    <slot></slot>
    <slot name="description"></slot>
    <slot name="value"></slot>
  </a>
  <!-- or, without href, the equivalent content directly -->
  <sp-overlay> <!-- when hasSubmenu -->
    <slot name="submenu" @slotchange="manageSubmenu" @slottable-request="handleSlottableRequest"></slot>
  </sp-overlay>

<!-- sp-menu-group -->
#shadow-root
  <span class="header" ?hidden="!headerElement">
    <slot name="header" @slotchange="updateLabel"></slot>
  </span>
  <!-- inherited Menu render for the item list -->
```

---

## React Spectrum S2 API surface

**Source:** [react-spectrum.adobe.com/Menu](https://react-spectrum.adobe.com/Menu) (this page documents `@react-spectrum/s2`, not the classic v3 `@adobe/react-spectrum` package) and the [S2 `Menu.tsx` source](https://github.com/adobe/react-spectrum/blob/main/packages/%40react-spectrum/s2/src/Menu.tsx).

### MenuTrigger

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `align` | `'start' \| 'end'` | `'start'` | Alignment of the menu relative to the trigger. |
| `direction` | `'bottom' \| 'top' \| 'left' \| 'right' \| 'start' \| 'end'` | `'bottom'` | Where the menu opens relative to the trigger. |
| `isOpen` / `defaultOpen` | `boolean` | — | Controlled / uncontrolled open state. |
| `onOpenChange` | `(isOpen: boolean) => void` | — | Fires on open-state change. |
| `shouldFlip` | `boolean` | `true` | Auto-flips direction when space is limited. |
| `trigger` | `'press' \| 'longPress' \| 'contextMenu'` | `'press'` | How the menu is invoked. |

`MenuTrigger` "serves as a wrapper around a Menu and its associated trigger, linking the Menu's open state with the trigger's press state," and mobile automatically renders as a tray.

### Menu

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `items` / `children` | `Iterable<T>` / `ReactNode \| (item: T) => ReactNode` | — | Static or dynamic collection contents. |
| `selectedKeys` / `defaultSelectedKeys` | `'all' \| Iterable<Key>` | — | Controlled / uncontrolled selection. |
| `selectionMode` | `'none' \| 'single' \| 'multiple'` | `'none'` | Selection behavior. |
| `disabledKeys` | `Iterable<Key>` | — | Items that "cannot be selected, focused, or otherwise interacted with." |
| `disallowEmptySelection` | `boolean` | — | Prevents clearing selection entirely. |
| `onSelectionChange` | `(keys: Selection) => void` | — | Fires on selection change. |
| `onAction` | `(key: Key, value: T) => void` | — | Fires when an item is activated (`selectionMode: 'none'`). |
| `onClose` | `() => void` | — | Fires when the menu should close. |
| `shouldCloseOnSelect` | `boolean` | — | Whether the menu closes after an item is selected; settable per-item too (see [MenuItem](#menuitem)). |
| `escapeKeyBehavior` | `'clearSelection' \| 'none'` | `'clearSelection'` | What <kbd>Escape</kbd> does to the current selection. |
| `autoFocus` | `boolean \| FocusStrategy` | — | Initial focus placement on open. |
| `shouldFocusWrap` | `boolean` | — | Circular keyboard navigation. |
| `size` | `'S' \| 'M' \| 'L' \| 'XL'` | `'M'` | Matches the Figma sizes ([A1](#must-ship--breaking-or-a11y-required)). |
| `hideLinkOutIcon` | `boolean` | — | Hides the default link-out icon on `target="_blank"` items. |

### MenuItem

| Prop | Type | Notes |
| --- | --- | --- |
| `id` | `Key` | Unique identifier. |
| `textValue` | `string` | Text representation for typeahead/a11y when content isn't plain text. |
| `isDisabled` | `boolean` | Maps to 1st-gen/2nd-gen `disabled`. |
| `onAction` | `() => void` | Per-item activation callback. |
| `href`, `download`, `target`, `rel`, `referrerPolicy`, `ping`, `hrefLang` | various | Same link-item surface as 1st-gen's `LikeAnchor` mixin, plus `ping`/`hrefLang` which 1st-gen `MenuItem` does not have. |
| `shouldCloseOnSelect` | `boolean` | Per-item override of the Menu-level setting. |
| `children` | `ReactNode` | Icon/image, label, description, keyboard-shortcut content — same shape as 1st-gen's `icon`/default/`description`/`value` slots. |

### MenuSection

| Prop | Type | Notes |
| --- | --- | --- |
| `id` | `Key` | Unique identifier. |
| `aria-label` | `string` | **Required if no header is provided** — "Sections without a header must have an `aria-label`." |
| `items` / `children` | `Iterable<T>` / `ReactNode \| (item: T) => ReactElement` | Static or dynamic section contents. |
| `selectedKeys` / `defaultSelectedKeys` / `selectionMode` / `onSelectionChange` / `disallowEmptySelection` | various | **A section can carry its own selection state independent of the parent Menu's.** Relevant context for the future `swc-menu-group` plan and for [Q2](#design)/[Q11](#scope-and-prerequisites) here, since it means "selection" is not a single monolithic decision — it can be scoped per-group. |
| `shouldCloseOnSelect` | `boolean` | Per-section override. |

### SubmenuTrigger

| Prop | Type | Notes |
| --- | --- | --- |
| `children` | `[MenuItem, Menu]` | Exactly two children: the trigger item, then the nested `Menu`. Supports arbitrary nesting depth. Submenus "open on hover or keyboard interaction." |

### UnavailableMenuItemTrigger

| Prop | Type | Notes |
| --- | --- | --- |
| `isUnavailable` | `boolean` | Default `false`. When true, disables the item's default action and shows contextual help (info icon instead of chevron) instead. Matches the Figma `Unavailable` property ([A3](#additive--ships-when-ready-zero-breakage-for-consumers-already-on-2nd-gen)). |

### Divider

Exported for use as a section separator; renders full-width within the menu, excluding edge padding. Corresponds to `swc-menu-separator`.

### Accessibility notes from React Spectrum

Two prose constraints from the React Spectrum docs are not yet reflected in the [Menu accessibility migration analysis](./accessibility-migration-analysis.md) and are worth folding in there (flagged, not silently added, since that doc belongs to a separate workstream — see [Q4](#design)):

- **No interactive descendants in item content:** "Interactive elements (e.g. buttons) within menu items are not allowed. This will break keyboard and screen reader navigation. Only add textual or decorative graphics (e.g. icons or images) as children." This is a real constraint on what `swc-menu-item`'s slots may contain, not just a React-land limitation — the same shadow-DOM/roving-tabindex model applies to `swc-menu-item`.
- **Section labeling:** "Sections without a header must have an `aria-label`" reinforces the existing `swc-menu-group` labeling requirement already documented in the [Menu group a11y doc](../menu-group/accessibility-migration-analysis.md).

---

## Dependencies

| Package | Version | Role |
| --- | --- | --- |
| `@spectrum-web-components/base` | workspace | `SpectrumElement`, `SizedMixin`, decorators. |
| `@spectrum-web-components/shared` (`1st-gen/tools/shared`) | workspace | `LikeAnchor` mixin (href/target/download/rel/referrerpolicy on `MenuItem`), `randomID`. |
| `@spectrum-web-components/overlay` | workspace | 1st-gen submenu presentation (`sp-overlay` inside `MenuItem`); superseded by `swc-popover` in 2nd-gen. |
| `@spectrum-web-components/divider` | workspace | `MenuDivider` reuses `divider.css`. |
| `@spectrum-web-components/reactive-controllers` (roving tabindex) | workspace | `RovingTabindexController`; superseded by `FocusgroupNavigationController` ([PR #6129](https://github.com/adobe/spectrum-web-components/pull/6129)) in 2nd-gen. |
| **Consumers of `sp-menu` today:** `action-menu`, `picker`, `combobox`, `breadcrumbs` | workspace | These packages import or compose `sp-menu`/`MenuItem` directly. Their own future 2nd-gen migrations will need `swc-menu`/`swc-menu-item` to exist first — see [Q11](#scope-and-prerequisites). |
| `@react-spectrum/s2` `Menu`/`MenuItem`/`MenuSection`/`MenuTrigger`/`SubmenuTrigger`/`UnavailableMenuItemTrigger`/`Divider` | n/a (reference only) | Product/API alignment reference; not an implementation dependency (2nd-gen is built independently — see [Architecture](#architecture-core-vs-swc-split)). |
| `swc-popover` (2nd-gen, not yet migrated) | n/a | **Hard prerequisite** for anchored placement. See [Migration sequencing](#migration-sequencing-and-prerequisites). |

---

## Open gen1 issues

<!-- BLOCKED: no Jira query access in this session. The table below could not be populated. Before this plan is review-ready, run the JQL query `project = SWC AND component = "Menu" AND labels NOT IN (a11y, gen2) AND issuetype NOT IN (Epic, Initiative) AND status != Done` (adjust field names to match the actual Jira schema) and paste the results here. Do not reuse the "Related 1st-gen accessibility (Jira)" table from accessibility-migration-analysis.md — those rows carry the `a11y` label and are excluded from this table by definition. -->

| Jira | Type | Status (snapshot) | Summary |
| --- | --- | --- | --- |

## Migration sequencing and prerequisites

### Dependency-aware recommendation

`swc-menu` cannot ship a real anchored trigger without `swc-popover`. The status table shows **no phase checked for Popover, Action Menu, or Menu** — all three are pre-Phase-1. Recommendation: treat Popover's migration as a hard prerequisite for the phases of this plan that implement the trigger/anchoring behavior (Phase 3 API and later); Phase 1–2 prep/setup work for `swc-menu` (file structure, base types, non-anchored parts of the API) can proceed in parallel. This mirrors the same dependency already called out in [Action menu's a11y doc](../action-menu/accessibility-migration-analysis.md) and the [Popover roadmap](../popover/rendering-and-styling-migration-analysis.md).

`swc-menu-item`'s `submenu` slot (cascading submenus) also anchors via `swc-popover` per the a11y analysis, so submenu behavior specifically is blocked on the same prerequisite.

### Related components and ordering notes

- **`swc-popover`** — hard prerequisite for anchored placement (host trigger and submenus). Not yet started.
- **`swc-action-menu`** — structurally parallel to `swc-menu` (same trigger/popover/`role="menu"` shape, different default trigger chrome). Not yet started. The two migrations should stay in lockstep on shared decisions (in-menu keyboard model, disabled-row ARIA, link-item pattern) to avoid divergence; neither should be treated as strictly upstream of the other, but shared logic (if any is factored out) should land once, not twice.
- **`swc-menu-item`, `swc-menu-group`, `swc-menu-separator`** — out of scope for this plan (see the epic-level note at the top of this document) but are direct composition dependencies of `swc-menu`. `swc-menu`'s own testing and Storybook work cannot be completed until at least a minimal `swc-menu-item` exists.
- **`picker`, `combobox`, `action-menu`** (as consumers) — their 2nd-gen migrations will depend on `swc-menu`/`swc-menu-item` existing, and per [Q11](#scope-and-prerequisites) may depend on `swc-menu` shipping baseline single-select.

### User confirmation needed

- Confirm whether `swc-menu` Phase 3 (API) implementation should stub/mock popover positioning to unblock progress ahead of the Popover migration, or wait outright. See [Q8](#architecture-and-behavior).
- Confirm the relative priority/order of `swc-menu`, `swc-menu-item`, `swc-menu-group`, `swc-menu-separator`, and `swc-popover` migrations under the epic. See [Q10](#scope-and-prerequisites).

---

## Changes overview

> **Priority framing:**
>
> - Use the component's full feature/functionality inventory to decide what belongs here; do not classify scope without first identifying the full surface area.
> - **Must ship** items define the in-scope work required for this migration.
> - **Additive** items are typically deferred or out of scope for this migration unless the user explicitly pulls them in.
> - **Additive / deferred** does not mean deprecated or dropped; it usually means not required to meet the baseline 80% consumer-use needs for this migration.
> - **Accessibility is non-negotiable** — all a11y requirements ship as part of this migration.
> - **Breaking changes** are assessed on merit — some must ship now to avoid a second, more disruptive migration event later.
> - **Additive changes** can be deferred and will not cause consumer breakage when they do ship.

### Must ship — breaking or a11y-required

#### API and naming

| # | What changes | 1st-gen behavior | 2nd-gen behavior | Consumer migration path |
| --- | --- | --- | --- | --- |
| **B1** | `swc-menu-group` no longer extends the full menu host | `MenuGroup extends Menu` — inherits selection engine, roving tabindex, `value`, etc., and overrides `ownRole`/`controlsRovingTabindex` to suppress most of it | `swc-menu-group` is a plain grouping/labeling primitive (per a11y analysis); no selection or roving-tabindex API of its own | Consumers using `sp-menu-group` only for grouping + `header` slot see no functional change; any (unsupported) reliance on inherited `Menu` API on a group instance breaks. Source: [Menu group a11y doc](../menu-group/accessibility-migration-analysis.md#what-swc-menu-group-is-2nd-gen). |
| **B2** | Link items drop the proxy double-activation pattern | `href` items fire `change` via `Menu`'s click handling in addition to native anchor navigation ([SWC-923](https://jira.corp.adobe.com/browse/SWC-923)) | Real `<a href>` descendant is the only activation path; no proxy `change` dispatch for link rows | Consumers listening for `change` on link-style items must switch to listening on the anchor itself or the native `click`/navigation. |
| **B3** | Submenu implementation moves off `sp-overlay` + `Menu`'s overlay-event relay | `MenuItem` embeds `sp-overlay`; `Menu.handleSubmenuOpened/Closed` relay `sp-menu-submenu-opened`/`closed` | Submenu trigger + child `role="menu"` live in `swc-menu-item`'s shadow tree, anchored via `swc-popover` (see [Q8](#architecture-and-behavior)) | Consumers depending on the `sp-menu-submenu-opened`/`closed` event names or on `sp-overlay` internals need the [consumer migration guide](https://jira.corp.adobe.com/browse/SWC-1223) treatment for the new event/anchoring model. |
| **B4** | In-menu keyboard navigation controller | `RovingTabindexController` | `FocusgroupNavigationController` ([PR #6129](https://github.com/adobe/spectrum-web-components/pull/6129)) | Internal implementation change; no public API impact expected, but any consumer code reaching into `rovingTabindexController` (marked `protected`, so unlikely) breaks. |

#### Styling and visuals

| # | What changes | 1st-gen behavior | 2nd-gen behavior | Consumer migration path |
| --- | --- | --- | --- | --- |
| **B5** | `--mod-*` modifier surface removed | Limited but present (e.g. `--mod-menu-item-label-icon-color-disabled`) | No `--mod-*` properties exposed; new `--swc-*` properties only where justified | Consumers overriding `--mod-menu-item-*` must migrate to any newly-exposed `--swc-*` equivalent or drop the override. |

#### Accessibility and behavior

| # | What changes | 1st-gen behavior | 2nd-gen behavior | Consumer migration path |
| --- | --- | --- | --- | --- |
| **B6** | Internal `role="menu"` moves into shadow DOM | 1st-gen `sp-menu` itself commonly served as (or close to) the exposed list surface, composed under an external trigger/overlay | `role="menu"` lives in `swc-menu`'s shadow tree; the custom element host is not the ARIA menu node | Consumers relying on `sp-menu`'s host element carrying `role="menu"`/menu semantics directly must adopt the full `swc-menu` host (trigger + popover + shadow menu) instead of the bare list. Source: [Menu a11y doc — What it is not](./accessibility-migration-analysis.md#what-it-is-not). |
| **B7** | Disabled row semantics standardized | Disabled handling varies by path | `aria-disabled="true"`, no action on Enter/Space, item stays in the roving set | Non-breaking for consumers already using `disabled`; clarifies previously inconsistent behavior. |
| **B8** | No interactive descendants in `swc-menu-item` content | Not explicitly enforced in 1st-gen | Only textual/decorative content (text, icons, images) allowed as item children; interactive descendants (buttons, etc.) break keyboard/AT navigation and should be disallowed or warned against | New constraint sourced from [React Spectrum's Menu docs](https://react-spectrum.adobe.com/Menu) ("Interactive elements... within menu items are not allowed"), not currently stated in the [Menu a11y analysis](./accessibility-migration-analysis.md). Recommend folding into that doc and, since it is item-content-shaped, the `swc-menu-item` a11y doc — see [Q4](#design). Any 1st-gen consumer relying on an interactive descendant inside `sp-menu-item` would need to restructure. |

### Additive — ships when ready, zero breakage for consumers already on 2nd-gen

| # | What is added | Notes |
| --- | --- | --- |
| **A1** | `xl` size | Figma shows `S / M / L / XL` for menu group and item sizing; 1st-gen only ships `s / m / l`. Consistent with the `xl`-size pattern already added elsewhere in 2nd-gen. |
| **A2** | Selection semantics (`selects`, `value`, `selectedItems`, single/multiple, `menuitemcheckbox`/`menuitemradio`) | Deferred per [a11y Migration scope](./accessibility-migration-analysis.md#migration-scope-current) — **but see [Q2](#design) and [Q11](#scope-and-prerequisites)**, since the reviewed Figma file already models these as menu item properties and downstream consumers (`picker`, `combobox`) may need at least single-select sooner than "Additive" implies. |
| **A3** | `Unavailable` menu item state | New in the Figma source; matches React S2's `UnavailableMenuItemTrigger` (contextual-help-on-hover pattern). No 1st-gen equivalent. |
| **A4** | `Show thumbnail` menu item option | New in the Figma source; image/thumbnail content in a menu item row. No 1st-gen equivalent (1st-gen only has the `icon` slot). |
| **A5** | `Show highlight badge` menu item option | New in the Figma source (e.g. a "New" badge at the row's trailing edge). No 1st-gen equivalent. |
| **A6** | External-link indicator | Matches React S2's `hideLinkOutIcon`/link-out icon behavior for `target="_blank"` items. 1st-gen has no dedicated link-out affordance. |
| **A7** | Printable character navigation | Optional enhancement noted in the a11y analysis; not combobox typeahead. Ship only if `FocusgroupNavigationController` supports it without extra scope. |
| **A8** | Mobile tray / drilldown presentation | 1st-gen's `mobileView` implementation is substantial (touch heuristics, submenu projection/restoration, back-row rendering) but is out of scope per the a11y analysis, with no committed 2nd-gen replacement timeline. Flagged as Additive rather than dropped outright pending a product decision — see [Q12](#scope-and-prerequisites). |

---

## 2nd-gen API decisions

These are derived from the 1st-gen implementation, the accessibility migration analysis, the Figma source reviewed for this plan, and the React Spectrum S2 implementation. Confirmed items are marked; open items are tracked in [Blockers and open questions](#blockers-and-open-questions).

- **Confirmed**: directly supported by source material
- **Inferred**: recommended based on multiple signals, but not explicitly specified in one authoritative source
- **Open question**: unresolved and needs review or more input

### Public API

#### Properties / attributes (2nd-gen)

| Property | Type | Default | Attribute | Notes |
| --- | --- | --- | --- | --- |
| `label` | `string` | `''` | `label` | **Inferred** carry-forward from 1st-gen; accessible name for the trigger. |
| `size` | `'s' \| 'm' \| 'l' \| 'xl'` | `'m'` | `size` | **Open question** on default (1st-gen has no default); `xl` addition is **Inferred** from Figma ([A1](#must-ship--breaking-or-a11y-required)). |
| `open` | `boolean` | `false` | `open` | **Inferred**, matching the menu-button pattern's open/close state, parallel to `swc-action-menu`. |
| `disabled` | `boolean` | `false` | `disabled` | **Inferred** carry-forward for the trigger. |
| `trigger` | `'press' \| 'longPress' \| 'contextMenu'` | `'press'` | `trigger` | **Open question** ([Q9](#architecture-and-behavior)) — React Spectrum S2's `MenuTrigger.trigger` has no 1st-gen equivalent (1st-gen composes the trigger externally). Depends on whether `swc-menu` owns trigger-invocation semantics itself or defers entirely to how the consumer wires the trigger slot. |
| `shouldCloseOnSelect` | `boolean` | `true` (**inferred**, matches 1st-gen's default close-on-select for non-`selects` items) | `should-close-on-select` or similar | **Open question**, tied to [Q2](#design)/[Q11](#scope-and-prerequisites) — only meaningful once selection ships, since 1st-gen's unconditional `close` event today only fires for non-selectable items. React Spectrum S2 exposes this at both `Menu` and `MenuItem` level. |
| `escapeKeyBehavior` | `'clearSelection' \| 'none'` | `'clearSelection'` (React Spectrum S2 default) | `escape-key-behavior` or similar | **Open question** — 1st-gen has no equivalent; only relevant if selection ships. |

Full property list depends on resolving [Q2](#design)/[Q8](#architecture-and-behavior)/[Q11](#scope-and-prerequisites)/[Q9](#architecture-and-behavior) below (selection surface, popover-anchoring API, and trigger-invocation ownership) and is intentionally left partial until those are answered — filling in a complete table now would present unresolved decisions as settled.

#### Visual matrix (2nd-gen)

| Visual family | S | M | L | XL |
| --- | --- | --- | --- | --- |
| Menu group / menu item | Yes (**Confirmed**, Figma) | Yes (**Confirmed**, Figma; 1st-gen default context) | Yes (**Confirmed**, Figma) | Yes (**Inferred** — new, not in 1st-gen) |

Additional Figma-confirmed presentation modes for `swc-menu-item` (documented here for `swc-menu`'s composition awareness; the item-level plan owns the authoritative API):

- Default / hover / disabled states
- Selection: none / single / multi-select (checkbox) / multi-select (switch) — **open question**, see [Q2](#design)
- Show leading icon, show drill-in (submenu chevron), show description, show value — **Confirmed**, map to existing 1st-gen slots/behavior
- Show thumbnail, show highlight badge, show external link, unavailable — **Inferred** additive, no 1st-gen equivalent ([A3](#additive--ships-when-ready-zero-breakage-for-consumers-already-on-2nd-gen)–[A6](#additive--ships-when-ready-zero-breakage-for-consumers-already-on-2nd-gen))

#### Slots (2nd-gen)

| Slot | Content | Notes |
| --- | --- | --- |
| default | `swc-menu-item`, `swc-menu-group`, `swc-menu-separator` only | **Confirmed** per a11y analysis; verify enforcement in 2nd-gen source once implemented. |

#### CSS custom properties (2nd-gen)

No `--mod-*` properties will be exposed. New `--swc-*` component-level properties may be introduced where needed — these are additive and not breaking. See [Component Custom Property Exposure](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#component-custom-property-exposure) for what to expose and how.

Each exposed `--swc-*` property must be documented with a `@cssprop` JSDoc tag on the primary SWC component class. Storybook picks these up and surfaces them in the API docs panel automatically.

Initial expectation for Menu is a small reviewed set; the thin 1st-gen `--mod-*` surface (see [CSS custom properties](#css-custom-properties)) suggests few, if any, are strictly required for parity.

### Behavioral semantics

- **Open/close and focus return** follow the [menu button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/): opening moves focus into the menu; closing returns focus to the trigger (or the parent menu item, for submenus). **Confirmed** per a11y analysis.
- **In-menu movement** uses `FocusgroupNavigationController` with roving `tabindex`, not `aria-activedescendant`, collecting `swc-menu-item` rows as direct children and as children of direct `swc-menu-group` elements. **Confirmed**, including the illustrative query in the a11y analysis.
- **Submenus** are owned by `swc-menu-item`'s `submenu` slot (own shadow-tree trigger + child `role="menu"`, anchored via `swc-popover`), not a nested `swc-menu` in the list. **Confirmed**.
- **Selection** (single/multiple, checkbox/switch visuals) is an **open question** — see [Q2](#design) and [Q11](#scope-and-prerequisites).
- **Mobile tray/drilldown** is out of scope for this migration. **Confirmed** exclusion; timeline for a future implementation is an **open question** ([Q12](#scope-and-prerequisites)).

### Accessibility semantics notes (2nd-gen)

See the [Menu accessibility migration analysis](./accessibility-migration-analysis.md) in full; it is the authoritative source for this section and is not restated here beyond the summary checklist items already reflected in [Migration checklist — Accessibility](#accessibility) below.

---

## Architecture: core vs SWC split

> The 1st-gen component is a **reference only** — 2nd-gen is built independently. Neither generation imports from the other.

Follow the [Badge migration reference](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#reference-badge-migration) as the concrete pattern for the core/SWC split.

| Layer | Path | Contains |
| --- | --- | --- |
| **Core** | `2nd-gen/packages/core/components/menu/` | `Menu.base.ts`, `Menu.types.ts`, open/close state, accessible-name logic, attribute forwarding, and other reusable semantic rules. No rendering. |
| **SWC** | `2nd-gen/packages/swc/components/menu/` | `Menu.ts`, `menu.css`, element registration, stories, tests, and the specific S2 rendering/styling for `swc-menu`. |

Planned rendering shape:

- Core owns API normalization, open/close state, and warnings (e.g. warning if a disallowed child type is slotted).
- SWC renders: the trigger, the `swc-popover`-anchored surface, and the shadow-internal `role="menu"` list container. SWC composes `swc-menu-item`/`swc-menu-group`/`swc-menu-separator` but does not implement their internals.

Because `swc-menu` structurally parallels `swc-action-menu` (trigger + popover + shadow `role="menu"`, differing mainly in default trigger chrome), the core/SWC split should identify what can be shared between the two (e.g. open/close orchestration, focus-return logic) versus what is Menu-specific (default label-based trigger vs. Action Menu's default "more" affordance). This shared-base question is flagged in [Q7](#architecture-and-behavior) and should not be treated as settled by this plan alone.

---

## Migration checklist

### Preparation (this ticket)

- [x] 1st-gen API surface documented
- [x] Dependencies identified
- [x] Breaking changes documented
- [x] 2nd-gen API decisions drafted
- [ ] Plan reviewed by at least one other engineer

### Setup

- [ ] Create `2nd-gen/packages/core/components/menu/`
- [ ] Create `2nd-gen/packages/swc/components/menu/`
- [ ] Wire exports in both `package.json` files
- [ ] Check out `spectrum-css` at `spectrum-two` branch as sibling directory
- [ ] Confirm a usable (even if minimal/stubbed) `swc-popover` exists before starting anchored-trigger work, per [Q8](#architecture-and-behavior)

### API

#### Naming and public surface

- [ ] `Menu.types.ts`: define allowed slot children (`swc-menu-item`, `swc-menu-group`, `swc-menu-separator`), size union (pending [xl decision](#must-ship--breaking-or-a11y-required)), and open/close state shape
- [ ] `Menu.base.ts`: retain open/close orchestration, accessible-name handling, and disallowed-child warnings; do not retain 1st-gen's `selects`/`value`/`selectedItems` unless [Q2](#design)/[Q11](#scope-and-prerequisites) resolve in favor of shipping baseline selection now
- [ ] Decide and document whether `swc-menu-group` shares a base class with `swc-menu` or is fully independent, resolving the 1st-gen `MenuGroup extends Menu` inheritance question ([B1](#must-ship--breaking-or-a11y-required))

#### Alignment checks

- [ ] Verify final shadow-tree structure (trigger + `role="menu"` co-location) against 2nd-gen source once implemented, per the a11y analysis's repeated "verify in 2nd-gen source" callouts
- [ ] Verify with Design/Figma whether selection (single/multi-checkbox/multi-switch), `Unavailable`, thumbnail, and highlight badge are intended for this migration or a later one ([Q2](#design))

### Styling

> Follow the [CSS style guide](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/) as the source of truth for all styling work. Key references: [migration steps](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/04_spectrum-swc-migration.md), [custom properties](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md), [anti-patterns](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/05_anti-patterns.md).

- [ ] Add `.swc-Menu` to the internal semantic element in `render()`; keep styling off `:host`
- [ ] Copy S2 source from `spectrum-css` `spectrum-two` branch `index.css` (not `/dist`) into `menu.css` as baseline

#### Visual model and regressions

- [ ] Verify i18n size modifiers (`:lang(ja)`, `:lang(ko)`, `:lang(zh)`) if present in S2 source
- [ ] Add `@cssprop` JSDoc tag to the primary SWC component class for every exposed `--swc-*` property
- [ ] Pass stylelint (property order, `no-descending-specificity`, token validation)

### Accessibility

<!-- Sourced from ./accessibility-migration-analysis.md, the pre-requisite a11y analysis for this plan. -->

#### Naming and semantics

- [ ] Internal `role="menu"` lives in shadow DOM, not on the `<swc-menu>` host
- [ ] Menu-button trigger and internal `role="menu"` are co-located in `swc-menu`'s shadow tree
- [ ] Menu slot accepts only `swc-menu-item`, `swc-menu-group`, `swc-menu-separator`; do not slot `swc-menu`/`swc-action-menu` into `swc-menu`, `swc-action-menu`, or `swc-menu-item`
- [ ] Link-like rows use a real `<a href>` descendant, not a proxy click (retest against [SWC-923](https://jira.corp.adobe.com/browse/SWC-923))

#### State verification

- [ ] Disabled `swc-menu-item` rows expose `aria-disabled="true"` and do not run their action on Enter/Space, while remaining in the roving set
- [ ] Open/close and initial/return focus satisfy the [menu button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/)
- [ ] In-menu navigation (arrow keys, Home, End) uses `FocusgroupNavigationController`, not `aria-activedescendant`
- [ ] If shipped, printable character navigation is consistent between top-level and submenu lists ([A7](#additive--ships-when-ready-zero-breakage-for-consumers-already-on-2nd-gen))
- [ ] 1st-gen defects in [Open gen1 issues](#open-gen1-issues) and the [a11y analysis's Jira table](./accessibility-migration-analysis.md#related-1st-gen-accessibility-jira) are retested or explicitly superseded

### Testing

- [ ] Port applicable coverage from [`1st-gen/packages/menu/test/menu.test.ts`](../../../../1st-gen/packages/menu/test/menu.test.ts) (core `Menu` behavior — child registration, focus management, close-on-select for non-selects items)
- [ ] Port applicable coverage from [`menu-selects.test.ts`](../../../../1st-gen/packages/menu/test/menu-selects.test.ts) **only if** selection ships in this migration ([Q2](#design)/[Q11](#scope-and-prerequisites)); otherwise track as a follow-up ticket alongside the deferred selection work
- [ ] Port applicable coverage from [`submenu.test.ts`](../../../../1st-gen/packages/menu/test/submenu.test.ts) for the parts that are in scope (open/close, deep-tree focus); explicitly drop the `mobile view` and `touch interactions` describe blocks as out of scope, or track them against [A8](#additive--ships-when-ready-zero-breakage-for-consumers-already-on-2nd-gen)
- [ ] Do **not** port [`menu-memory.test.ts`](../../../../1st-gen/packages/menu/test/menu-memory.test.ts) coverage as-is if it exercises the mobile drilldown/projection paths being dropped; re-scope to whatever memory-leak surface remains
- [ ] Add Playwright `menu.a11y.spec.ts` with `toMatchAriaSnapshot`

#### Behavior

- [ ] Open/close from trigger (press, and per the a11y analysis's `MenuTrigger`-equivalent `trigger` modes if adopted from React Spectrum S2)
- [ ] Arrow key / Home / End movement via `FocusgroupNavigationController`
- [ ] Escape closes and returns focus to the trigger
- [ ] Disabled item is focusable but not activatable
- [ ] Link item activates via native anchor semantics only (no duplicate `change`)
- [ ] Submenu open/close and nested keyboard behavior, once `swc-popover` and `swc-menu-item`'s submenu exist

#### Visual regression

- [ ] Add VRT coverage for size × any shipped item-content combinations (icon, description, value, and any additive content types actually shipped)
- [ ] Add focus-visible regression coverage for the trigger and for in-menu roving focus
- [ ] Add high-contrast / forced-colors coverage for the menu surface and selected/disabled item states

### Documentation

#### General

- [ ] JSDoc on all public props, slots, and CSS custom properties
- [ ] Storybook stories for anatomy, options (sizes), states, behaviors (open/close, submenu), and accessibility

#### Breaking changes

- [ ] Document [B1](#must-ship--breaking-or-a11y-required)–[B7](#must-ship--breaking-or-a11y-required) in the consumer migration guide ([SWC-1223](https://jira.corp.adobe.com/browse/SWC-1223))

### Review

- [ ] `yarn lint:2nd-gen` passes (ESLint, Stylelint, Prettier)
- [ ] Status table in workstream doc updated
- [ ] PR created with description referencing Epic [SWC-1980](https://jira.corp.adobe.com/browse/SWC-1980)
- [ ] Peer engineer sign-off

---

## Blockers and open questions

During drafting, this section tracks active blockers and open questions. In the final review-ready plan, once core migration questions are resolved and deferred tickets exist, replace those drafting-time rows with a concise deferred-ticket table.

### Design

| # | Item | Blocking? | Status | Owner |
| --- | --- | --- | --- | --- |
| Q1 | The Figma file reviewed for this plan (`Mngz9H7WZLbrCvGQf3GnsY`, node `125485:35276`) is titled **"🚫 S2 - Web (Deprecated)"**, not the `S2 / Web (Desktop scale)` file named in the ticket. Confirm whether the properties/sizes/variants captured from it are still current, or re-pull from the correct file. | Yes | Open — needs design confirmation | Design + implementation |
| Q2 | The Figma source already models `Selection: None / Single / Multi-select (checkbox) / Multi-select (switch)` on menu items, plus `Unavailable`, `Show thumbnail`, and `Show highlight badge`. The a11y analysis defers checkbox/radio-style selection pending a product decision. Resolve whether selection ships now (contradicting the a11y doc's current deferral) or the Figma properties are forward-looking beyond this migration's MVP. | Yes | Open — needs design + accessibility reviewer input | Design + accessibility reviewer |
| Q3 | Confirm `xl` size addition ([A1](#additive--ships-when-ready-zero-breakage-for-consumers-already-on-2nd-gen)) against the canonical Figma file once [Q1](#design) resolves. | No | Open | Design + implementation |
| Q4 | React Spectrum's Menu docs state "Interactive elements... within menu items are not allowed" and "Sections without a header must have an `aria-label`" ([B8](#must-ship--breaking-or-a11y-required)). Neither constraint is currently written into the [Menu a11y analysis](./accessibility-migration-analysis.md) or the menu-item/menu-group equivalents. Confirm these should be folded into those docs. | No | Open | Design + accessibility reviewer |

### Architecture and behavior

| # | Item | Blocking? | Status | Owner |
| --- | --- | --- | --- | --- |
| Q5 | Confirm `swc-menu-group` breaks from 1st-gen's `MenuGroup extends Menu` inheritance and ships as an independent, lighter-weight component ([B1](#must-ship--breaking-or-a11y-required)). | Yes | Open — recommended path stated in B1, needs sign-off | Architecture reviewer |
| Q6 | Confirm the submenu ARIA/anchoring model (`swc-menu-item`'s shadow-tree trigger + child `role="menu"`, anchored via `swc-popover`) fully replaces `sp-overlay` + `sp-menu-submenu-opened`/`closed` with no interim overlay-based fallback. | Yes | Open | Architecture reviewer |
| Q7 | Decide whether `swc-menu` and `swc-action-menu` should share a base class/controller for open/close orchestration and focus-return logic, given they are structurally parallel hosts, or remain fully independent implementations. | No | Open | Architecture reviewer |
| Q8 | `swc-menu`'s anchored trigger and submenus depend on `swc-popover`, which has not started migration. Decide whether `swc-menu` Phase 3+ work stubs/mocks popover positioning to proceed in parallel, or waits for Popover to reach a usable state first. | Yes | Open — see [Migration sequencing](#migration-sequencing-and-prerequisites) | Architecture reviewer + ticket owner |
| Q9 | React Spectrum S2's `MenuTrigger.trigger` (`'press' \| 'longPress' \| 'contextMenu'`) has no 1st-gen equivalent, since 1st-gen composes the trigger externally. Decide whether `swc-menu` owns trigger-invocation semantics itself (adding a `trigger` property) or leaves that entirely to how the consumer wires the trigger. | No | Open | Architecture reviewer |

### Scope and prerequisites

| # | Item | Blocking? | Status | Owner |
| --- | --- | --- | --- | --- |
| Q10 | Migration order among `swc-menu`, `swc-menu-item`, `swc-menu-group`, `swc-menu-separator`, and `swc-popover` is not yet decided. Each component either has or will have its own plan; sequencing affects all of them. | Yes | Open | Ticket owner |
| Q11 | `picker`, `combobox`, and `action-menu` currently depend on `sp-menu`/`MenuItem` (including, for at least some of them, its selection engine). Determine whether their future 2nd-gen migrations require `swc-menu` to ship baseline single-select now, which would move [A2](#additive--ships-when-ready-zero-breakage-for-consumers-already-on-2nd-gen) from Additive to Must-ship. | Yes | Open | Architecture reviewer + ticket owner |
| Q12 | Confirm whether 1st-gen's mobile drilldown/tray implementation ([A8](#additive--ships-when-ready-zero-breakage-for-consumers-already-on-2nd-gen)) is dropped with a committed future-epic replacement, or dropped with no replacement plan yet. | No | Open | Design + ticket owner |
| Q13 | Obtain the gen1 Jira issues table for `component = "Menu"` (excluding `a11y`/`gen2` labels and Epic/Initiative types) — no Jira query access was available while drafting this plan; see [Open gen1 issues](#open-gen1-issues). | Yes (for review-readiness) | Open | Ticket owner |

<!-- Where possible, include the next action in the Item text or Status so reviewers know how to resolve the question. -->

---

## References

- [Washing machine workflow](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md)
- [2nd-gen migration status table](../../02_workstreams/02_2nd-gen-component-migration/01_status.md) — Menu, Popover, and Action Menu all show no completed phases
- [Menu accessibility migration analysis](./accessibility-migration-analysis.md)
- [Menu migration roadmap (rendering and styling)](./rendering-and-styling-migration-analysis.md)
- [Action menu accessibility migration analysis](../action-menu/accessibility-migration-analysis.md)
- [Action menu rendering and styling migration roadmap](../action-menu/rendering-and-styling-migration-analysis.md)
- [Menu group accessibility migration analysis](../menu-group/accessibility-migration-analysis.md)
- [Menu item accessibility migration analysis](../menu-item/accessibility-migration-analysis.md)
- [Menu separator accessibility migration analysis](../menu-separator/accessibility-migration-analysis.md)
- [Popover accessibility migration analysis](../popover/accessibility-migration-analysis.md)
- [Popover rendering and styling migration roadmap](../popover/rendering-and-styling-migration-analysis.md)
- [CSS style guide — Component Custom Property Exposure](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#component-custom-property-exposure)
- [1st-gen source: `Menu.ts`](../../../../1st-gen/packages/menu/src/Menu.ts), [`MenuItem.ts`](../../../../1st-gen/packages/menu/src/MenuItem.ts), [`MenuGroup.ts`](../../../../1st-gen/packages/menu/src/MenuGroup.ts), [`MenuDivider.ts`](../../../../1st-gen/packages/menu/src/MenuDivider.ts)
- [1st-gen tests](../../../../1st-gen/packages/menu/test/menu.test.ts) — plus `menu-selects.test.ts`, `submenu.test.ts`, `menu-group.test.ts`, `menu-item.test.ts`, `menu-memory.test.ts`
- [1st-gen README](../../../../1st-gen/packages/menu/README.md)
- [React Spectrum Menu](https://react-spectrum.adobe.com/Menu) — product alignment reference
- [React Spectrum S2 `Menu.tsx` source](https://github.com/adobe/react-spectrum/blob/main/packages/%40react-spectrum/s2/src/Menu.tsx) — `MenuItem`, `MenuSection`, `MenuTrigger`, `SubmenuTrigger`, `UnavailableMenuItemTrigger`, `Divider` exports
- [Spectrum CSS — `spectrum-two` branch](https://github.com/adobe/spectrum-css/tree/spectrum-two) — S2 styling source of truth; component-specific path to confirm once a sibling checkout is available (see [Setup](#setup))
- [Badge migration reference](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#reference-badge-migration)
- [WAI-ARIA APG: Menu button](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/)
- [spectrum-web-components PR #6129 — Focusgroup navigation controller](https://github.com/adobe/spectrum-web-components/pull/6129)
- Figma: `S2 - Web` file `Mngz9H7WZLbrCvGQf3GnsY`, node `125485:35276` (**titled "Deprecated" — see [Q1](#design)**)
- Epic: [SWC-1980](https://jira.corp.adobe.com/browse/SWC-1980) - Menu migration epic. Related: [SWC-1981](https://jira.corp.adobe.com/browse/SWC-1981) (a11y recommendations, prerequisite to this plan), [SWC-1223](https://jira.corp.adobe.com/browse/SWC-1223) (consumer migration documentation)
- SWC-923: `menu-item` with `href` triggers link twice ([B2](#must-ship--breaking-or-a11y-required))
- SWC-1332: custom content as submenu not keyboard accessible
- SWC-1517: submenu item focus outline on hover (Safari)
- SWC-963: Epic — align menu components with APG; reduce semantic confusion
