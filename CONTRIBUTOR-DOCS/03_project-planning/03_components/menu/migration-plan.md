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
    - [Implementation phasing](#implementation-phasing)
    - [Related components and ordering notes](#related-components-and-ordering-notes)
    - [User confirmation needed](#user-confirmation-needed)
- [Changes overview](#changes-overview)
    - [Must ship — breaking or a11y-required](#must-ship--breaking-or-a11y-required)
    - [Additive — ships when ready, zero breakage for consumers already on 2nd-gen](#additive--ships-when-ready-zero-breakage-for-consumers-already-on-2nd-gen)
    - [Disposition of remaining 1st-gen members](#disposition-of-remaining-1st-gen-members)
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
    - [Blocking for swc-menu](#blocking-for-swc-menu)
    - [Cross-component follow-ups (not blocking `swc-menu`)](#cross-component-follow-ups-not-blocking-swc-menu)
- [References](#references)

</details>

<!-- Document content (editable) -->

> **Epic [SWC-1980](https://jira.corp.adobe.com/browse/SWC-1980)** · Planning output. Must be reviewed before implementation begins.
>
> This plan scopes **`swc-menu`** only: the trigger + a `PlacementController`-anchored surface + shadow-internal `role="menu"` host (see [Architecture](#architecture-core-vs-swc-split)). `swc-menu-item` and `swc-menu-group` each already have a standalone accessibility migration analysis in `CONTRIBUTOR-DOCS` and are expected to get their own `migration-plan.md` — this plan treats them as **dependencies**, not in-scope deliverables (see [Migration sequencing and prerequisites](#migration-sequencing-and-prerequisites)). A `swc-menu-separator` a11y doc also exists, but this plan decided against building that element at all ([Q14](#blockers-and-open-questions)) — that decision needs epic-level confirmation since it conflicts with that doc's premise. Selection (`selects`/`value`/`selectedItems`/`selectOrToggleItem`) is the one exception to that boundary: for this first pass it's scoped to `swc-menu` only — one selection mode for the whole menu, matching React Spectrum's own foundational `Menu.selectionMode` pattern (section-level/mixed selection is documented there as a distinctly more advanced pattern, introduced later, not the basic case). So Phase B stays **in this plan** — see [Implementation phasing](#implementation-phasing). Per-group independent selection mode (enabling mixed menus, different sections running different modes at once) is a real future need, noted in [Behavioral semantics — Mixed menus](#behavioral-semantics), but explicitly **out of scope for this pass** — not scheduled, not a `swc-menu-group` plan dependency yet. [B1](#must-ship--breaking-or-a11y-required), [B3](#must-ship--breaking-or-a11y-required), and [B8](#must-ship--breaking-or-a11y-required) below touch `swc-menu-group`/`swc-menu-item` because `swc-menu`'s own architecture forces them; treat those as provisional pending sign-off from the sibling plans, not as this plan overriding their ownership. The 1st-gen API surface below documents the full `@spectrum-web-components/menu` package (Menu, MenuItem, MenuGroup, MenuDivider) for reference, since 1st-gen ships them together.

---

## TL;DR

- **First-pass scope (Phase A) is deliberately narrow:** a bare menu-button host with plain `swc-menu-item` children — label plus one leading visual (icon *or* image, not both). No submenus, no `swc-menu-group`, no divider/separator, no selection. Everything else in this plan (submenus, groups, dividers, richer item content, selection) is real and documented, but explicitly Phase B/C — not this pass. See [Implementation phasing](#implementation-phasing).
- `swc-menu` becomes a full [menu button](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) host — trigger, a `PlacementController`-anchored surface, and a shadow-internal `role="menu"` surface — replacing 1st-gen `sp-menu`, which was most often just the list under an externally-composed trigger and overlay. This mirrors React Spectrum [Menu](https://react-spectrum.adobe.com/Menu) and is structurally parallel to `swc-action-menu`.
- **`swc-menu` anchors directly via `PlacementController`, not `<swc-popover>`** (decided, [Q3](#blockers-and-open-questions)). `<swc-popover>` is a self-contained `role="dialog"` component; wrapping it would put a dialog around a menu and `aria-haspopup="dialog"` on a menu-button trigger. Build the trigger surface and `swc-menu-item`'s submenus on `PlacementController` directly — the same pattern `Tooltip.base.ts` already ships. Nothing about Popover blocks this work: `PlacementController` is already in production use. See [Architecture](#architecture-core-vs-swc-split).
- **Architecture break:** 1st-gen `MenuGroup extends Menu` (it inherits the entire menu/selection/roving-tabindex implementation and overrides `ownRole` to `'group'`). The a11y analysis describes `swc-menu-group` as a plain grouping/labeling primitive, not a menu-button host. Carrying the 1st-gen inheritance model forward would contradict that design and re-introduce unwanted API surface (selection, `value`, roving tabindex) on a component that should not have it.
- **Selection is real, not hypothetical — the a11y doc is stale here.** Beyond the Menu group/Menu item property tables (`Selection: None | Single | Multi-select (checkbox) | Multi-select (switch)`, `Unavailable`, `Show thumbnail`, `Show highlight badge`), a dedicated "Changes in S2 Menu" frame in the same Figma file states design will "continue to support checkboxes in menu items" and is "evaluating optimal use cases for multi-select checkboxes in picker menus," and a live "Examples" frame shows a working multi-select checkbox menu. This directly contradicts the [a11y analysis's Migration scope](./accessibility-migration-analysis.md#migration-scope-current), which defers all selection pending a product decision that, per this evidence, appears to have already been made. See [Q2](#blocking-for-swc-menu).
- Large chunks of 1st-gen `Menu.ts` implement mobile drilldown (`mobileView`, `mobileBackLabel`, submenu projection/restoration, touch/scroll heuristics). The a11y analysis puts mobile tray out of scope for the current migration; this plan treats that code as **not carried forward**, with no replacement timeline yet defined.
- `sp-menu`'s selection engine (`selects`, `value`, `selectedItems`, `selectOrToggleItem`) is consumed indirectly by `picker`, `combobox`, and `action-menu` today (all import or extend `sp-menu`). Decided ([Q5](#blockers-and-open-questions)): selection stays Additive/Phase B rather than pulled into Phase A — none of those three consumers has a concrete migration scheduled yet, so there's no live deadline forcing it earlier.
- **Recommended implementation phasing:** ship `swc-menu` in two stages rather than one — Phase A covers the full menu-button host without selection (trigger, `PlacementController` anchoring, items, submenus, all Must-ship breaking changes), Phase B adds the selection engine. This reduces what reviewers validate per PR and lets Phase A land without waiting on [Q2](#blocking-for-swc-menu) to resolve. See [Implementation phasing](#implementation-phasing).
- In-menu keyboard movement moves from `RovingTabindexController` to `FocusgroupNavigationController` ([PR #6129](https://github.com/adobe/spectrum-web-components/pull/6129), already shipped and in production use by `Tabs.base.ts`), matching the approach already recommended for `swc-action-menu`.
- The Figma source (`Mngz9H7WZLbrCvGQf3GnsY`) matches the ticket's `S2/Web (Desktop scale)` file by key. Its title now reads **"🚫 S2 / Web (Deprecated)"** (Beta, v1.27.1) — confirmed with Design ([Q1](#blockers-and-open-questions)) that this is the only file; there is no newer replacement. Content pulled from it is final.

### Most blocking open questions

- **[Q2](#blocking-for-swc-menu)** — the a11y analysis's selection deferral is contradicted by concrete Figma design-intent evidence (not just property tables); resolve the Phase A/B split and get the a11y doc corrected.
- **[Q4](#blocking-for-swc-menu)** — name the APG-vs-React-Spectrum-S2 conflict on disabled-row focusability ([B7](#must-ship--breaking-or-a11y-required)) as an explicit decision instead of an unstated default.
- **[Q14](#blockers-and-open-questions)** — decided (reuse `swc-divider`, no `swc-menu-separator` element), but this drops a planned component from the epic and conflicts with the existing menu-separator a11y doc; needs confirmation at the epic level before it's final.

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
| `escapeKeyBehavior` | `'clearSelection' \| 'none'` | `'clearSelection'` | What <kbd>Escape</kbd> does to the current selection. React Spectrum's own docs carry a caveat this plan should keep: "Most experiences should not modify this option as it eliminates a keyboard user's ability to easily clear selection." |
| `autoFocus` | `boolean \| FocusStrategy` | — | Initial focus placement on open. |
| `shouldFocusWrap` | `boolean` | — | Circular keyboard navigation. |
| `size` | `'S' \| 'M' \| 'L' \| 'XL'` | `'M'` | Matches the Figma sizes ([A1](#additive--ships-when-ready-zero-breakage-for-consumers-already-on-2nd-gen)). |
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

**Content and Slots cross-check** ([React Spectrum's Content](https://react-spectrum.adobe.com/Menu#content) / [Slots](https://react-spectrum.adobe.com/Menu#slots) sections): React Spectrum's own *basic* `MenuItem` example already combines an icon, `<Text slot="label">`, `<Text slot="description">`, and `<Keyboard>` in one item — description and keyboard-shortcut content aren't gated behind an "advanced" tier there the way submenus/sections are. This plan's Phase A is narrower than that by explicit choice, not because React Spectrum treats it as advanced: label plus one leading visual (icon *or* image) only, no description/value/keyboard-shortcut content this pass (see [Implementation phasing](#implementation-phasing)). Not a decision this plan is overriding on `swc-menu-item` — its own slots (whatever `swc-menu-item`'s plan settles on) can exist regardless; Phase A simply doesn't exercise them in `swc-menu`'s own stories/tests/docs yet.

### MenuSection

| Prop | Type | Notes |
| --- | --- | --- |
| `id` | `Key` | Unique identifier. |
| `aria-label` | `string` | **Required if no header is provided** — "Sections without a header must have an `aria-label`." |
| `items` / `children` | `Iterable<T>` / `ReactNode \| (item: T) => ReactElement` | Static or dynamic section contents. |
| `selectedKeys` / `defaultSelectedKeys` / `selectionMode` / `onSelectionChange` / `disallowEmptySelection` | various | **Decided:** `swc-menu-group` gets its own independent selection-mode property, matching this split exactly — a plain command section (`selectionMode: 'none'`) can sit alongside a single-select section and a multi-select section in the same menu. "Selection" is not one monolithic per-menu decision; it's per-group, plus a top-level mode on `swc-menu` for ungrouped items. See [Mixed menus](#behavioral-semantics) below. |
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

Exported for use as a section separator; renders full-width within the menu, excluding edge padding. Corresponds to `swc-divider` used as a separator (decided, [Q14](#blockers-and-open-questions) — not a dedicated `swc-menu-separator` element).

### Accessibility notes from React Spectrum

Two prose constraints from the React Spectrum docs, not yet in the [Menu accessibility migration analysis](./accessibility-migration-analysis.md) — fold in there per [Q10](#cross-component-follow-ups-not-blocking-swc-menu):

- **No interactive descendants in item content:** "Interactive elements (e.g. buttons) within menu items are not allowed. This will break keyboard and screen reader navigation. Only add textual or decorative graphics (e.g. icons or images) as children." This is a real constraint on what `swc-menu-item`'s slots may contain, not just a React-land limitation — the same shadow-DOM/roving-tabindex model applies to `swc-menu-item`.
- **Section labeling:** "Sections without a header must have an `aria-label`" reinforces the existing `swc-menu-group` labeling requirement already documented in the [Menu group a11y doc](../menu-group/accessibility-migration-analysis.md).

---

## Dependencies

| Package | Version | Role |
| --- | --- | --- |
| `@spectrum-web-components/base` | workspace | `SpectrumElement`, `SizedMixin`, decorators. |
| `@spectrum-web-components/shared` (`1st-gen/tools/shared`) | workspace | `LikeAnchor` mixin (href/target/download/rel/referrerpolicy on `MenuItem`), `randomID`. |
| `@spectrum-web-components/overlay` | workspace | 1st-gen submenu presentation (`sp-overlay` inside `MenuItem`); superseded by direct `PlacementController` use in 2nd-gen, **not** `swc-popover` (see [Architecture](#architecture-core-vs-swc-split)). |
| `@spectrum-web-components/divider` | workspace | `MenuDivider` reuses `divider.css`. |
| `@spectrum-web-components/reactive-controllers` (roving tabindex) | workspace | `RovingTabindexController`; superseded by `FocusgroupNavigationController` ([PR #6129](https://github.com/adobe/spectrum-web-components/pull/6129), already shipped) in 2nd-gen. |
| **Consumers of `sp-menu` today:** `action-menu`, `picker`, `combobox`, `breadcrumbs` | workspace | These packages import or compose `sp-menu`/`MenuItem` directly. Their own future 2nd-gen migrations will need `swc-menu`/`swc-menu-item` to exist first; none has a concrete migration scheduled yet, so this isn't pulling selection into Phase A ([Q5](#blockers-and-open-questions)). |
| `@react-spectrum/s2` `Menu`/`MenuItem`/`MenuSection`/`MenuTrigger`/`SubmenuTrigger`/`UnavailableMenuItemTrigger`/`Divider` | n/a (reference only) | Product/API alignment reference; not an implementation dependency (2nd-gen is built independently — see [Architecture](#architecture-core-vs-swc-split)). |
| `PlacementController` (2nd-gen, **shipped**) | `2nd-gen/packages/core/controllers/placement-controller` | Positions the trigger surface and, via `swc-menu-item`, submenus. Already in production use by `Tooltip.base.ts`; not a sequencing blocker. Use directly — do not wrap `<swc-popover>` (decided, [Q3](#blockers-and-open-questions)). See [Architecture](#architecture-core-vs-swc-split). |
| `swc-popover` (2nd-gen, shipped in [PR #6356](https://github.com/adobe/spectrum-web-components/pull/6356)) | `2nd-gen/packages/swc/components/popover` | **Not a dependency of `swc-menu`.** It's a self-contained `role="dialog"` component; menu/listbox/combobox content is explicitly excluded from its intended use per the [popover a11y doc's 2nd-gen design update](../popover/accessibility-migration-analysis.md#2nd-gen-design-update-amends-this-analysis--q4). |

---

## Open gen1 issues

<!-- BLOCKED: no Jira query access in this session. The table below could not be populated. Before this plan is review-ready, run the JQL query `project = SWC AND component = "Menu" AND labels NOT IN (a11y, gen2) AND issuetype NOT IN (Epic, Initiative) AND status != Done` (adjust field names to match the actual Jira schema) and paste the results here. Do not reuse the "Related 1st-gen accessibility (Jira)" table from accessibility-migration-analysis.md — those rows carry the `a11y` label and are excluded from this table by definition. -->

| Jira | Type | Status (snapshot) | Summary |
| --- | --- | --- | --- |

## Migration sequencing and prerequisites

### Dependency-aware recommendation

`swc-menu` has no anchoring-related sequencing blocker. It positions its trigger surface, and (via `swc-menu-item`) its submenus, directly with the shared `PlacementController` — the same pattern `Tooltip.base.ts` already ships. `PlacementController` is already in production use, so Phase A (see [Implementation phasing](#implementation-phasing)) starts immediately, anchored-trigger and submenu parts included.

`swc-popover` shipped in [PR #6356](https://github.com/adobe/spectrum-web-components/pull/6356) but is not a dependency of `swc-menu` either way: menu/listbox/combobox content builds on `PlacementController` directly rather than wrapping `<swc-popover>`, per the [popover a11y doc's 2nd-gen design update](../popover/accessibility-migration-analysis.md#2nd-gen-design-update-amends-this-analysis--q4) — `<swc-popover>` is a self-contained `role="dialog"` component, and wrapping it would put a dialog around a menu. See [Architecture](#architecture-core-vs-swc-split) for the decided model ([Q3](#blockers-and-open-questions)). The [status table](../../02_workstreams/02_2nd-gen-component-migration/01_status.md) row for Popover is blank despite Popover having shipped; fix that separately (see [Review](#review)).

The `swc-action-menu` and `swc-menu-item` plans should each use `PlacementController` the same way — see [Q13](#cross-component-follow-ups-not-blocking-swc-menu) for the a11y-doc updates that follow from this.

`swc-menu-item`'s `submenu` slot (cascading submenus) anchors the same way, directly via `PlacementController` in the item's own shadow tree — see [B3](#must-ship--breaking-or-a11y-required).

### Implementation phasing

`swc-menu`'s own implementation ships in three stages, each substantially smaller than one big PR:

- **Phase A — bare menu-button host (this pass).** Trigger, `PlacementController` anchoring, shadow-internal `role="menu"`, plain `swc-menu-item` children only — label plus a single leading visual (icon **or** image, not both as separate features, and not combined with description/value/badge/unavailable content). Disabled rows and link items are in scope. **No submenus, no `swc-menu-group`, no divider/separator.** Applies: [B2](#must-ship--breaking-or-a11y-required), [B4–B10](#must-ship--breaking-or-a11y-required) (not B1 or B3 — see Phase B). This is the smallest reviewable slice: a flat list of commands behind a trigger, matching the menu-button APG pattern with nothing else layered on. Nothing blocks starting this now.
- **Phase B — structural completeness.** Not scheduled; ships when there's a concrete need. Adds `swc-menu-item` submenus (anchored via `PlacementController`, [B3](#must-ship--breaking-or-a11y-required)), `swc-menu-group` composition ([B1](#must-ship--breaking-or-a11y-required) — the inheritance-break decision applies whenever this ships), `swc-divider` as separator ([Q14](#blockers-and-open-questions)), and the richer item content already scoped as Additive: [A3](#additive--ships-when-ready-zero-breakage-for-consumers-already-on-2nd-gen) (`Unavailable`), [A5](#additive--ships-when-ready-zero-breakage-for-consumers-already-on-2nd-gen) (highlight badge), [A6](#additive--ships-when-ready-zero-breakage-for-consumers-already-on-2nd-gen) (external-link indicator).
- **Phase C — selection engine.** [A2](#additive--ships-when-ready-zero-breakage-for-consumers-already-on-2nd-gen): a single selection mode for the whole menu (single/multiple), matching React Spectrum's own foundational `Menu.selectionMode` pattern — not per-group. Ships once [Q2](#blocking-for-swc-menu) resolves, as a follow-up ticket **under this same plan**, not a separate `migration-plan.md`. Per-group independent selection mode (mixed menus, see [Behavioral semantics — Mixed menus](#behavioral-semantics)) is a further-future enhancement beyond Phase C — React Spectrum's own docs treat it as an advanced pattern layered on top of the basic case, not something to design into the first selection pass. Not scheduled.

Per [Q5](#blockers-and-open-questions), `picker`/`combobox`/`action-menu`'s dependency on selection doesn't change Phase C's timing: none has a concrete migration scheduled, so there's no case for pulling selection into Phase A pre-emptively. If a real deadline shows up later, pull a minimal single-select into scope then — cheaper than carrying unused selection code through review now on a hypothetical.

### Related components and ordering notes

- **`PlacementController`** — real prerequisite for anchored placement, and it already ships (proven by `Tooltip.base.ts`). Not a blocker.
- **`swc-popover`** — shipped, but not a dependency of `swc-menu` at all (see [Dependencies](#dependencies)).
- **`swc-action-menu`** — structurally parallel to `swc-menu` (same trigger/`PlacementController`/`role="menu"` shape, different default trigger chrome). Not yet started. The two migrations should stay in lockstep on shared decisions (in-menu keyboard model, disabled-row ARIA, link-item pattern, `PlacementController`-direct anchoring) to avoid divergence; neither should be treated as strictly upstream of the other, but shared logic (if any is factored out) should land once, not twice. Its a11y doc's anchoring section needs updating to `PlacementController` — see [Q13](#cross-component-follow-ups-not-blocking-swc-menu).
- **`swc-menu-item`, `swc-menu-group`** — out of scope for this plan (see the epic-level note at the top of this document) but are direct composition dependencies of `swc-menu`. `swc-menu`'s own testing and Storybook work cannot be completed until at least a minimal `swc-menu-item` exists. `swc-menu-item`'s a11y doc's submenu-anchoring section needs the same `PlacementController` update ([Q13](#cross-component-follow-ups-not-blocking-swc-menu)).
- **`swc-divider`** — composed directly as the menu separator (decided, [Q14](#blockers-and-open-questions)); no separate `swc-menu-separator` element.
- **`picker`, `combobox`, `action-menu`** (as consumers) — their 2nd-gen migrations will depend on `swc-menu`/`swc-menu-item` existing. Decided ([Q5](#blockers-and-open-questions)): not pulling baseline single-select into Phase A for their sake, since none has a scheduled migration yet.

### User confirmation needed

- Confirm the relative priority/order of `swc-menu`, `swc-menu-item`, and `swc-menu-group` migrations under the epic — Popover is not a variable in this ordering. See [Q15](#cross-component-follow-ups-not-blocking-swc-menu).
- **Confirm at the epic level:** this plan decided to reuse `swc-divider` instead of building `swc-menu-separator` ([Q14](#blockers-and-open-questions)). That drops a planned component and conflicts with the existing menu-separator a11y doc, which assumes `swc-menu-separator` exists — needs sign-off from whoever owns that scoping decision before it's treated as final.

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

**Recommended phasing:** most of the Must-ship items below ship in **Phase A** (this pass) — a bare menu-button host with plain items, no submenus, no groups, no dividers. [B1](#must-ship--breaking-or-a11y-required) and [B3](#must-ship--breaking-or-a11y-required) are **Phase B** (structural completeness — submenus, groups, dividers), not scheduled. [A2](#additive--ships-when-ready-zero-breakage-for-consumers-already-on-2nd-gen) (the selection engine) is **Phase C**, shipped as a follow-up once [Q2](#blocking-for-swc-menu) resolves. See [Implementation phasing](#implementation-phasing) for the full breakdown.

### Must ship — breaking or a11y-required

#### API and naming

| # | What changes | 1st-gen behavior | 2nd-gen behavior | Consumer migration path |
| --- | --- | --- | --- | --- |
| **B1** *(Phase B, not this pass — no `swc-menu-group` in the first pass)* | `swc-menu-group` no longer extends the full menu host | `MenuGroup extends Menu` — inherits selection engine, roving tabindex, `value`, etc., and overrides `ownRole`/`controlsRovingTabindex` to suppress most of it | `swc-menu-group` is a plain grouping/labeling primitive (per a11y analysis); no selection or roving-tabindex API of its own | Consumers using `sp-menu-group` only for grouping + `header` slot see no functional change; any (unsupported) reliance on inherited `Menu` API on a group instance breaks. Source: [Menu group a11y doc](../menu-group/accessibility-migration-analysis.md#what-swc-menu-group-is-2nd-gen). |
| **B2** | Link items drop the proxy double-activation pattern | `href` items fire `change` via `Menu`'s click handling in addition to native anchor navigation ([SWC-923](https://jira.corp.adobe.com/browse/SWC-923)) | Real `<a href>` descendant is the only activation path; no proxy `change` dispatch for link rows | Consumers listening for `change` on link-style items must switch to listening on the anchor itself or the native `click`/navigation. |
| **B3** *(Phase B, not this pass — no submenus in the first pass)* | Submenu implementation moves off `sp-overlay` + `Menu`'s overlay-event relay | `MenuItem` embeds `sp-overlay`; `Menu.handleSubmenuOpened/Closed` relay `sp-menu-submenu-opened`/`closed` | Submenu trigger + child `role="menu"` live in `swc-menu-item`'s shadow tree, positioned directly via the shared `PlacementController` — the same pattern `Tooltip.base.ts` already uses — **not** wrapped in `<swc-popover>` (decided, see [Architecture](#architecture-core-vs-swc-split)) | Consumers depending on the `sp-menu-submenu-opened`/`closed` event names or on `sp-overlay` internals need the [consumer migration guide](https://jira.corp.adobe.com/browse/SWC-1223) treatment for the new event/anchoring model. |
| **B4** | In-menu keyboard navigation controller | `RovingTabindexController` | `FocusgroupNavigationController` ([PR #6129](https://github.com/adobe/spectrum-web-components/pull/6129) — already shipped; `Tabs.base.ts` already consumes it) | Internal implementation change; no public API impact expected, but any consumer code reaching into `rovingTabindexController` (marked `protected`, so unlikely) breaks. |
| **B9** | `ignore` property dropped | Exists so a descendant `sp-menu` can opt out of an ancestor's selection/roving-tabindex management — a use case tied to `Menu`-family elements nesting inside each other (e.g. `MenuGroup extends Menu`) | Not carried forward: once `swc-menu-group` stops extending `swc-menu` ([B1](#must-ship--breaking-or-a11y-required)) and submenus move to `swc-menu-item`'s own shadow tree ([B3](#must-ship--breaking-or-a11y-required)), the ancestor-scoped-management model this property exists for no longer exists | No known external consumer use case identified from the packages checked in [Dependencies](#dependencies); flag in the consumer migration guide in case one exists. |
| **B10** | `getNeighboringFocusableElement()` not carried forward as public API | Public method for finding the next/previous focusable menu item, used internally alongside `RovingTabindexController` | Superseded by `FocusgroupNavigationController` ([B4](#must-ship--breaking-or-a11y-required)) internals; not re-exposed as a public `Menu` method | Consumers calling this method directly (unlikely, given its low-level nature) need an alternative; none identified from the 1st-gen consumer packages checked. |

#### Styling and visuals

| # | What changes | 1st-gen behavior | 2nd-gen behavior | Consumer migration path |
| --- | --- | --- | --- | --- |
| **B5** | `--mod-*` modifier surface removed | Limited but present (e.g. `--mod-menu-item-label-icon-color-disabled`) | No `--mod-*` properties exposed; new `--swc-*` properties only where justified | Consumers overriding `--mod-menu-item-*` must migrate to any newly-exposed `--swc-*` equivalent or drop the override. |

#### Accessibility and behavior

| # | What changes | 1st-gen behavior | 2nd-gen behavior | Consumer migration path |
| --- | --- | --- | --- | --- |
| **B6** | Internal `role="menu"` moves into shadow DOM | 1st-gen `sp-menu` sets `role="menu"` (`this.ownRole`) directly on its own custom element host, in `connectedCallback`, unconditionally unless the author pre-set a `role` attribute or set `ignore` (`Menu.ts:1633-1637`: `if (!this.hasAttribute('role') && !this.ignore) { this.setAttribute('role', this.ownRole); }`) | `role="menu"` lives in `swc-menu`'s shadow tree; the custom element host is not the ARIA menu node | Consumers relying on `sp-menu`'s host element carrying `role="menu"`/menu semantics directly must adopt the full `swc-menu` host (trigger + `PlacementController`-positioned surface + shadow menu) instead of the bare list. Source: [Menu a11y doc — What it is not](./accessibility-migration-analysis.md#what-it-is-not); confirmed against 1st-gen source. |
| **B7** | Disabled row semantics standardized | Disabled handling varies by path | `aria-disabled="true"`, no action on Enter/Space, item **stays focusable and in the roving set** — this is `FocusgroupNavigationController`'s own default (`skipDisabled: false`), not an override `swc-menu` has to implement; the controller's stated best practice is "use `aria-disabled=\"true\"` instead of native `disabled`" for exactly this reason. Matches WAI-ARIA APG's "focusability of disabled controls" guidance; overrides React Spectrum's `disabledKeys`, which removes disabled items from focus entirely — pending sign-off, [Q4](#blocking-for-swc-menu) | Non-breaking for consumers already using `disabled`; clarifies previously inconsistent behavior. |
| **B8** | No interactive descendants in `swc-menu-item` content | Not explicitly enforced in 1st-gen | Only textual/decorative content (text, icons, images) allowed as item children; interactive descendants (buttons, etc.) break keyboard/AT navigation and should be disallowed or warned against | New constraint sourced from [React Spectrum's Menu docs](https://react-spectrum.adobe.com/Menu) ("Interactive elements... within menu items are not allowed"), not currently stated in the [Menu a11y analysis](./accessibility-migration-analysis.md). Recommend folding into that doc and, since it is item-content-shaped, the `swc-menu-item` a11y doc — see [Q10](#cross-component-follow-ups-not-blocking-swc-menu), which also reconciles this with the Figma "Notifications" example's switch-styled rows. Any 1st-gen consumer relying on an interactive descendant inside `sp-menu-item` would need to restructure. |

### Additive — ships when ready, zero breakage for consumers already on 2nd-gen

| # | What is added | Notes |
| --- | --- | --- |
| **A1** | `xl` size | Figma shows `S / M / L / XL` for menu group and item sizing; 1st-gen only ships `s / m / l`. Consistent with the `xl`-size pattern already added elsewhere in 2nd-gen. |
| **A2** | Selection semantics: on `swc-menu`, a top-level selection mode for ungrouped items plus aggregate `value`/`selectedItems` across the whole menu; on `swc-menu-group`, its own independent selection mode (decided, see [Behavioral semantics — Mixed menus](#behavioral-semantics)) — together these enable **mixed menus**, different sections running different selection modes at once | Deferred per [a11y Migration scope](./accessibility-migration-analysis.md#migration-scope-current) — **but see [Q2](#blocking-for-swc-menu)**: the reviewed Figma file's dedicated "Changes in S2 Menu" frame and a live multi-select "Examples" frame show this is real design intent, not just a property-table inference. Decided ([Q5](#blockers-and-open-questions)) to keep this Additive rather than pull it into Phase A for `picker`/`combobox`, since neither has a scheduled migration yet. When [Q2](#blocking-for-swc-menu) resolves, the `swc-menu`-owned half moves to Must-ship **in this same plan**; the `swc-menu-group`-owned half is that plan's to implement, coordinated but not authored here. |
| **A3** *(Phase B, not this pass)* | `Unavailable` menu item state | New in the Figma source; matches React S2's `UnavailableMenuItemTrigger` (contextual-help-on-hover pattern, also shown in the Figma "Examples" frame via an info icon + description tooltip on a "Delete" row). Figma ships the contextual-help bubble as its own sized component (S/M/L/XL, matching the triggering item's size), not a single fixed-size tooltip. No 1st-gen equivalent. |
| **A4** *(this pass, Phase A)* | `Show thumbnail` as an alternative to icon | New in the Figma source. Phase A's leading visual is icon **or** image/thumbnail — one or the other, not both, and not combined with description/value/badge/unavailable content (those stay Phase B). No 1st-gen equivalent (1st-gen only has the `icon` slot). |
| **A5** *(Phase B, not this pass)* | `Show highlight badge` menu item option | New in the Figma source (e.g. a "New" badge at the row's trailing edge). No 1st-gen equivalent. |
| **A6** *(Phase B, not this pass)* | External-link indicator | Matches React S2's `hideLinkOutIcon`/link-out icon behavior for `target="_blank"` items. 1st-gen has no dedicated link-out affordance. |
| **A7** | Printable character navigation | Optional enhancement noted in the a11y analysis; not combobox typeahead. **Confirmed cheap to add**: the controller already exposes `focusFirstItemByTextPrefix(prefix)` for exactly this (matches by trimmed `aria-label`, then `aria-labelledby`, then `textContent`, case-insensitive, respects `skipDisabled`) — `swc-menu` would only need to buffer keystrokes and call it, no controller changes required. Still optional/deferred; not blocked on anything if picked up later. |
| **A8** | Mobile tray / drilldown presentation | 1st-gen's `mobileView` implementation is substantial (touch heuristics, submenu projection/restoration, back-row rendering) but is out of scope per the a11y analysis, with no committed 2nd-gen replacement timeline. Flagged as Additive rather than dropped outright pending a product decision — see [Q8](#blocking-for-swc-menu). |

### Disposition of remaining 1st-gen members

Every `Menu` member from the [1st-gen API surface](#1st-gen-api-surface) inventory, mapped to where it lands. `MenuItem`, `MenuGroup`, and `MenuDivider` members are listed only where `swc-menu`'s own architecture forces a disposition ([B1](#must-ship--breaking-or-a11y-required), [B3](#must-ship--breaking-or-a11y-required), [B8](#must-ship--breaking-or-a11y-required)); everything else on those elements is out of scope for this plan and owned by their own plans (see the note below the table).

| 1st-gen member | Kind | 2nd-gen disposition |
| --- | --- | --- |
| `label` | property | Keep (Phase A) |
| `ignore` | property | Drop ([B9](#must-ship--breaking-or-a11y-required)) |
| `mobileView` | property | Drop, out of scope ([A8](#additive--ships-when-ready-zero-breakage-for-consumers-already-on-2nd-gen)) |
| `mobileBackLabel` | property | Drop, out of scope ([A8](#additive--ships-when-ready-zero-breakage-for-consumers-already-on-2nd-gen)) |
| `selects` | property | Defer to Phase B ([A2](#additive--ships-when-ready-zero-breakage-for-consumers-already-on-2nd-gen)); becomes `swc-menu`'s top-level mode for ungrouped items — `swc-menu-group` gets its own analogous, independent property (decided, [Behavioral semantics — Mixed menus](#behavioral-semantics)), not inherited from `swc-menu` |
| `value` | property | Defer to Phase B ([A2](#additive--ships-when-ready-zero-breakage-for-consumers-already-on-2nd-gen)); stays on `swc-menu` as the aggregate across the whole menu, including nested groups |
| `valueSeparator` | property | Defer to Phase B ([A2](#additive--ships-when-ready-zero-breakage-for-consumers-already-on-2nd-gen)); aggregate-related, stays on `swc-menu` |
| `selected` | property | Defer to Phase B ([A2](#additive--ships-when-ready-zero-breakage-for-consumers-already-on-2nd-gen)); aggregate-related, stays on `swc-menu` |
| `selectedItems` | property | Defer to Phase B ([A2](#additive--ships-when-ready-zero-breakage-for-consumers-already-on-2nd-gen)); stays on `swc-menu` as the aggregate across the whole menu, including nested groups |
| `size` (`s`/`m`/`l` via `SizedMixin`) | property | Keep, extended with `xl` ([A1](#additive--ships-when-ready-zero-breakage-for-consumers-already-on-2nd-gen)) |
| `focus()` (override) | method | Keep (Phase A), folded into open/close + `FocusgroupNavigationController` focus management |
| `focusOnFirstSelectedItem()` | method | Defer to Phase B — meaningless without selection state |
| `selectOrToggleItem()` | method | Defer to Phase B ([A2](#additive--ships-when-ready-zero-breakage-for-consumers-already-on-2nd-gen)) |
| `getNeighboringFocusableElement()` | method | Drop as public API ([B10](#must-ship--breaking-or-a11y-required)) |
| `openMobileSubmenu()` / `closeMobileSubmenu()` / `resetMobileSubmenus()` | method | Drop, out of scope ([A8](#additive--ships-when-ready-zero-breakage-for-consumers-already-on-2nd-gen)) |
| `handleSubmenuOpened()` / `handleSubmenuClosed()` | method | Drop, superseded by the new submenu model ([B3](#must-ship--breaking-or-a11y-required)) |
| `change` event (href-link path) | event | Drop, superseded by native anchor activation ([B2](#must-ship--breaking-or-a11y-required)) |
| `change` event (selection path) | event | Defer to Phase B ([A2](#additive--ships-when-ready-zero-breakage-for-consumers-already-on-2nd-gen)); see [Events (2nd-gen)](#public-api) for the Phase A event surface |
| `close` event | event | Renamed/superseded by `swc-close`/`swc-after-close` (see [Events (2nd-gen)](#public-api)) |
| `sp-menu-submenu-opened` / `sp-menu-submenu-closed` | event | Superseded by the new submenu model ([B3](#must-ship--breaking-or-a11y-required)); exact submenu-level event surface owned jointly with the `swc-menu-item` plan |
| default slot | slot | Keep (Phase A) |
| `mobile-submenu` slot | slot | Drop, out of scope ([A8](#additive--ships-when-ready-zero-breakage-for-consumers-already-on-2nd-gen)) |

`MenuItem`'s `noWrap`, `submenuElement`, and `_mobileSubmenuProjected`, `MenuGroup`'s inherited API (covered wholesale by [B1](#must-ship--breaking-or-a11y-required)), and the `sp-menu-item-added` event are out of scope for this plan; their disposition belongs to the `swc-menu-item`/`swc-menu-group` plans referenced in [Migration sequencing and prerequisites](#migration-sequencing-and-prerequisites).

There is no `sp-menu-divider` → `swc-menu-separator` rename: decided ([Q14](#blockers-and-open-questions)) that `swc-menu-separator` does not exist as its own element. `swc-menu` (and `swc-action-menu`) compose the existing `swc-divider` directly — 1st-gen's `MenuDivider` already just reused `divider.css`, and 2nd-gen's `Divider.base.ts` already implements `role="separator"`. This narrows the epic's scope and conflicts with the existing menu-separator a11y doc; see [User confirmation needed](#user-confirmation-needed).

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
| `trigger` | — | — | — | **Decided: not included** ([Q6](#blockers-and-open-questions)). React Spectrum S2's `MenuTrigger.trigger` has no 1st-gen equivalent and no current consumer request; `swc-menu` leaves trigger-invocation entirely to how the consumer wires the trigger, matching 1st-gen. Can be added additively later without a breaking change if a concrete need arises. |
| `shouldCloseOnSelect` | `boolean` | `true` (**inferred**, matches 1st-gen's default close-on-select for non-`selects` items) | `should-close-on-select` or similar | **Open question**, tied to [Q2](#blocking-for-swc-menu) — only meaningful once selection ships, since 1st-gen's unconditional `close` event today only fires for non-selectable items. React Spectrum S2 exposes this at both `Menu` and `MenuItem` level. |
| `escapeKeyBehavior` | `'clearSelection' \| 'none'` | `'clearSelection'` (React Spectrum S2 default) | `escape-key-behavior` or similar | **Open question** — 1st-gen has no equivalent; only relevant if selection ships. Carries React Spectrum's own caveat: "Most experiences should not modify this option as it eliminates a keyboard user's ability to easily clear selection" — repeat that caveat in JSDoc if this ships. |

Full property list depends on resolving [Q2](#blocking-for-swc-menu) below (the selection surface) and is intentionally left partial until that's answered — filling in a complete table now would present an unresolved decision as settled.

#### Visual matrix (2nd-gen)

| Visual family | S | M | L | XL |
| --- | --- | --- | --- | --- |
| Menu group / menu item | Yes (**Confirmed**, Figma) | Yes (**Confirmed**, Figma; 1st-gen default context) | Yes (**Confirmed**, Figma) | Yes (**Inferred** — new, not in 1st-gen) |

Additional Figma-confirmed presentation modes for `swc-menu-item` (documented here for `swc-menu`'s composition awareness; the item-level plan owns the authoritative API):

- Default / hover / disabled states
- Selection: none / single / multi-select (checkbox) / multi-select (switch) — **open question**, see [Q2](#blocking-for-swc-menu)
- Show leading icon, show drill-in (submenu chevron), show description, show value — **Confirmed**, map to existing 1st-gen slots/behavior
- Show thumbnail, show highlight badge, show external link, unavailable — **Inferred** additive, no 1st-gen equivalent ([A3](#additive--ships-when-ready-zero-breakage-for-consumers-already-on-2nd-gen)–[A6](#additive--ships-when-ready-zero-breakage-for-consumers-already-on-2nd-gen))

#### Slots (2nd-gen)

| Slot | Content | Notes |
| --- | --- | --- |
| default | End state: `swc-menu-item`, `swc-menu-group`, and `swc-divider` (as a separator, [Q14](#blockers-and-open-questions)). **This pass (Phase A): `swc-menu-item` only** — no group, no divider, see [Implementation phasing](#implementation-phasing). | **Confirmed** per a11y analysis for item/group; verify enforcement in 2nd-gen source once implemented. |

#### Events (2nd-gen)

Phase A (no selection):

| Event | Bubbles / composed | Notes |
| --- | --- | --- |
| `swc-open` | yes / yes | Fires when the menu opens. **Inferred** from the naming convention already shipped by `swc-popover` and `swc-tooltip` (`Popover.base.ts:897`); not yet confirmed for Menu specifically. |
| `swc-after-open` | yes / yes | Fires after the open transition completes. **Inferred**, same convention. |
| `swc-close` | yes / yes | Supersedes 1st-gen's unconditional, non-cancelable `close` event; fires when the menu should close (trigger re-press, Escape, non-selectable item activation, outside interaction). **Inferred**. |
| `swc-after-close` | yes / yes | Fires after the close transition completes. **Inferred**. |

Phase B (selection) will add a `change`-equivalent event once [Q2](#blocking-for-swc-menu) resolves the selection scope question; whether it's named `change` (matching React Spectrum S2 and 1st-gen) or a `swc-`-prefixed equivalent is an open question for that follow-up ticket, not this plan.

Submenu open/close events (on `swc-menu-item`) are owned jointly with the `swc-menu-item` plan; this plan only asserts that 1st-gen's `sp-menu-submenu-opened`/`sp-menu-submenu-closed` are superseded by the new anchoring model ([B3](#must-ship--breaking-or-a11y-required)).

#### CSS custom properties (2nd-gen)

No `--mod-*` properties will be exposed. New `--swc-*` component-level properties may be introduced where needed — these are additive and not breaking. See [Component Custom Property Exposure](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#component-custom-property-exposure) for what to expose and how.

Each exposed `--swc-*` property must be documented with a `@cssprop` JSDoc tag on the primary SWC component class. Storybook picks these up and surfaces them in the API docs panel automatically.

Initial expectation for Menu is a small reviewed set; the thin 1st-gen `--mod-*` surface (see [CSS custom properties](#css-custom-properties)) suggests few, if any, are strictly required for parity.

### Behavioral semantics

- **Open/close and focus return** follow the [menu button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/): opening moves focus into the menu; closing returns focus to the trigger (or the parent menu item, for submenus). **Confirmed** per a11y analysis.
- **In-menu movement (Phase A, concrete config).** `swc-menu` constructs `FocusgroupNavigationController` with `direction: 'vertical'` — this is the controller's own documented "Vertical menu" use case, not a novel application. Specific option decisions, grounded in the [controller's own docs](../../../../2nd-gen/packages/core/controllers/focusgroup-navigation-controller/focusgroup-navigation-controller.mdx):
  - **`wrap: true`** (decided — controller default is `false`). Matches menu-button convention (<kbd>ArrowDown</kbd> from the last item goes to the first, and vice versa); the controller default is toolbar-oriented, not menu-oriented, so this needs an explicit override.
  - **`skipDisabled: false`** (the controller's own default — no override needed). This is the concrete mechanism behind [B7](#must-ship--breaking-or-a11y-required): disabled items stay in the roving set and reachable by arrow keys, matching the controller's stated best practice to "use `aria-disabled=\"true\"` instead of native `disabled` when items should remain focusable for discoverability." B7 is not a preference layered on top of the controller — it's what happens if `swc-menu` does nothing.
  - **`memory: true`** (controller default). Governs <kbd>Tab</kbd>-out-and-back-in re-entry point; likely a non-issue for a menu that closes on blur rather than staying open while focus leaves it, but worth confirming once Phase A's open/close model is implemented rather than assumed.
  - <kbd>Home</kbd> / <kbd>End</kbd> jump to the first/last item — built in, no configuration needed.
  - `pageStep` — not needed; menus aren't the paginated-grid use case this option targets.
  - Collects `swc-menu-item` rows as direct children of `swc-menu`'s slot (menu-group nesting is a Phase B concern once `swc-menu-group` exists).
  - Focus-on-open uses the controller's own documented pattern: `setActiveItem(firstItem)` (sets roving `tabindex`, does not call `.focus()`) followed by `queueMicrotask(() => item.focus())` — the `queueMicrotask` defer is required per the controller's docs so the browser doesn't move focus back to the trigger after the open-click handler returns.
  - **Not `aria-activedescendant`** — real DOM focus via roving `tabindex`, matching the a11y analysis's explicit rejection of that pattern.
- **Submenus** are owned by `swc-menu-item`'s `submenu` slot (own shadow-tree trigger + child `role="menu"`, anchored directly via `PlacementController` — **not** `swc-popover`), not a nested `swc-menu` in the list. **Confirmed** ([Q3](#blockers-and-open-questions)).
- **Selection** (single/multiple, checkbox/switch visuals) is real design intent per the Figma "Changes in S2 Menu" and "Examples" frames, but still an **open question** for timing/scope — see [Q2](#blocking-for-swc-menu). Decided to stay Additive/Phase B rather than pulled forward for `picker`/`combobox` ([Q5](#blockers-and-open-questions)).
- **Mixed menus — decided: `selectionMode` (or equivalent naming) exists at both levels.** `swc-menu` owns a selection mode for its own top-level, ungrouped items plus the aggregate `value`/`selectedItems` across the whole menu (all groups included); `swc-menu-group` independently owns its own selection mode for the items inside it. This matches React Spectrum's `Menu.selectionMode` + `MenuSection.selectionMode` split exactly, and it structurally enables mixed menus — a plain command section, a single-select section, and a multi-select section can coexist because each group sets its own mode independently of the menu's default. 1st-gen got this for free via `MenuGroup extends Menu` (each group inherited the full `selects` API); that inheritance is gone by design ([Q11](#blockers-and-open-questions), [B1](#must-ship--breaking-or-a11y-required)), so Phase B adds a purpose-built, smaller selection-mode property to `swc-menu-group` rather than reintroducing inheritance — this is a Phase B addition to the `swc-menu-group` plan, not something this plan implements. **Still open, and separate from the mechanism above:** the Figma "Changes in S2 Menu" note quoted in [Q2](#blocking-for-swc-menu) recommends *against* mixing checkbox sections with other menu types "for a better user experience." That's UX guidance, not necessarily a hard API restriction — the API permits mixing either way once both levels exist; whether authors *should* is a Design question to resolve as part of [Q2](#blocking-for-swc-menu). Not a Phase A concern; Phase A ships no selection at all.
- **Mobile tray/drilldown** is out of scope for this migration. **Confirmed** exclusion; timeline for a future implementation is an **open question** ([Q8](#blocking-for-swc-menu)).

### Accessibility semantics notes (2nd-gen)

See the [Menu accessibility migration analysis](./accessibility-migration-analysis.md) in full; it is the authoritative source for this section and is not restated here beyond the summary checklist items already reflected in [Migration checklist — Accessibility](#accessibility) below.

---

## Architecture: core vs SWC split

> The 1st-gen component is a **reference only** — 2nd-gen is built independently. Neither generation imports from the other.

> **`swc-menu` positions its trigger surface and `swc-menu-item`'s submenus directly with `PlacementController` — it does not wrap `<swc-popover>`.** Menu/listbox/combobox content builds on the shared controller, not the popover host, per the [popover a11y doc's 2nd-gen design update](../popover/accessibility-migration-analysis.md#2nd-gen-design-update-amends-this-analysis--q4). Wrapping `<swc-popover>` would be actively broken here: it renders `role="dialog"` ([`Popover.ts:117`](../../../../2nd-gen/packages/swc/components/popover/Popover.ts)), sets `aria-haspopup="dialog"` on the trigger unconditionally ([`Popover.base.ts:457`](../../../../2nd-gen/packages/core/components/popover/Popover.base.ts)), and seats focus on itself on open ([`Popover.base.ts:722`](../../../../2nd-gen/packages/core/components/popover/Popover.base.ts)) — a dialog wrapping a menu, `aria-haspopup="dialog"` on a button that needs `aria-haspopup="menu"`, and focus stolen from the first menu item. `Tooltip.base.ts` is the reference implementation: `new PlacementController(this)` directly, no `<swc-popover>` wrapper ([`Tooltip.base.ts:191`](../../../../2nd-gen/packages/core/components/tooltip/Tooltip.base.ts)). Follow that pattern for both the trigger surface and, via `swc-menu-item`, submenus. `PlacementController` already ships, so this is not a sequencing blocker. Decided, [Q3](#blockers-and-open-questions); see [Q13](#cross-component-follow-ups-not-blocking-swc-menu) for the matching a11y-doc updates still needed on `swc-action-menu`/`swc-menu-item`.

Follow the [Badge migration reference](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#reference-badge-migration) as the concrete pattern for the core/SWC split.

| Layer | Path | Contains |
| --- | --- | --- |
| **Core** | `2nd-gen/packages/core/components/menu/` | `Menu.base.ts`, `Menu.types.ts`, open/close state, accessible-name logic, `PlacementController` wiring for the trigger surface, attribute forwarding, and other reusable semantic rules. No rendering. |
| **SWC** | `2nd-gen/packages/swc/components/menu/` | `Menu.ts`, `menu.css`, element registration, stories, tests, and the specific S2 rendering/styling for `swc-menu`. |

Planned rendering shape:

- Core owns API normalization, open/close state, `PlacementController` integration, and warnings (e.g. warning if a disallowed child type is slotted).
- SWC renders: the trigger, the `PlacementController`-positioned surface, and the shadow-internal `role="menu"` list container — the surface is menu-owned markup carrying `role="menu"` directly, not a wrapped `<swc-popover>`. SWC composes `swc-menu-item`/`swc-menu-group`/`swc-divider` but does not implement `swc-menu-item`/`swc-menu-group`'s internals.

`swc-menu` structurally parallels `swc-action-menu` (trigger + `PlacementController`-positioned surface + shadow `role="menu"`, differing mainly in default trigger chrome), but decided ([Q12](#blockers-and-open-questions)) not to force a shared base class now — `swc-action-menu` doesn't exist yet, and extracting a shared abstraction against one real implementation and one hypothetical one risks extracting the wrong thing. Ship `swc-menu`'s own base class independently; once `swc-action-menu` is built, diff the two and extract only what's proven identical (most likely candidates: open/close event contract, `PlacementController` setup).

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
- [ ] Wire up `PlacementController` for the trigger surface, following the `Tooltip.base.ts` precedent — already unblocked, no dependency on `swc-popover` (see [Architecture](#architecture-core-vs-swc-split))

### API

#### Naming and public surface

**Phase A (this migration, no selection):**

- [ ] `Menu.types.ts`: define allowed slot children — `swc-menu-item` this pass; extend the type to include `swc-menu-group` and `swc-divider` in Phase B, not now — size union (pending [xl decision](#must-ship--breaking-or-a11y-required)), and open/close state shape
- [ ] `Menu.base.ts`: retain open/close orchestration, accessible-name handling, and disallowed-child warnings; do not retain 1st-gen's `selects`/`value`/`selectedItems` — decided to stay Additive/Phase B ([Q5](#blockers-and-open-questions), see [Implementation phasing](#implementation-phasing))
- [ ] *(Phase B, not this pass)* `swc-menu-group` does not share a base class with `swc-menu`; it ships as an independent, lighter-weight component per the decided break from 1st-gen's `MenuGroup extends Menu` inheritance ([B1](#must-ship--breaking-or-a11y-required), [Q11](#blockers-and-open-questions))
- [ ] *(Phase B, not this pass)* Compose `swc-divider` directly as the menu separator; no `swc-menu-separator` element to build ([Q14](#blockers-and-open-questions))

**Phase B (follow-up ticket, selection):**

- [ ] `Menu.types.ts`/`Menu.base.ts`: add a top-level selection mode for ungrouped items, plus aggregate `value`/`selectedItems`/`selectOrToggleItem`-equivalent API across the whole menu, once [Q2](#blocking-for-swc-menu) resolves
- [ ] Coordinate with the `swc-menu-group` plan on its own independent selection-mode property (decided mechanism, see [Behavioral semantics — Mixed menus](#behavioral-semantics)) — that half of Phase B is implemented there, not here
- [ ] File a follow-up ticket under Epic [SWC-1980](https://jira.corp.adobe.com/browse/SWC-1980) for Phase B before closing out Phase A's review

#### Alignment checks

- [ ] Verify final shadow-tree structure (trigger + `role="menu"` co-location) against 2nd-gen source once implemented, per the a11y analysis's repeated "verify in 2nd-gen source" callouts
- [ ] Verify with Design/Figma whether selection (single/multi-checkbox/multi-switch), `Unavailable`, thumbnail, and highlight badge are intended for this migration or a later one ([Q2](#blocking-for-swc-menu))

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
- [ ] Menu slot accepts `swc-menu-item` this pass (`swc-menu-group` and `swc-divider` join in Phase B); do not slot `swc-menu`/`swc-action-menu` into `swc-menu`, `swc-action-menu`, or `swc-menu-item`
- [ ] Link-like rows use a real `<a href>` descendant, not a proxy click (retest against [SWC-923](https://jira.corp.adobe.com/browse/SWC-923))

#### State verification

- [ ] Disabled `swc-menu-item` rows expose `aria-disabled="true"` and do not run their action on Enter/Space, while remaining in the roving set
- [ ] Open/close and initial/return focus satisfy the [menu button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/)
- [ ] In-menu navigation (arrow keys, Home, End) uses `FocusgroupNavigationController` configured `direction: 'vertical'`, `wrap: true` (decided — override the controller's `false` default), `skipDisabled: false` (controller default, matches [B7](#must-ship--breaking-or-a11y-required)); not `aria-activedescendant` — see [Behavioral semantics](#behavioral-semantics)
- [ ] If shipped, printable character navigation is consistent between top-level and submenu lists ([A7](#additive--ships-when-ready-zero-breakage-for-consumers-already-on-2nd-gen))
- [ ] 1st-gen defects in [Open gen1 issues](#open-gen1-issues) and the [a11y analysis's Jira table](./accessibility-migration-analysis.md#related-1st-gen-accessibility-jira) are retested or explicitly superseded

### Testing

- [ ] Port applicable coverage from [`1st-gen/packages/menu/test/menu.test.ts`](../../../../1st-gen/packages/menu/test/menu.test.ts) (core `Menu` behavior — child registration, focus management, close-on-select for non-selects items)
- [ ] Port applicable coverage from [`menu-selects.test.ts`](../../../../1st-gen/packages/menu/test/menu-selects.test.ts) **only if** selection ships in this migration ([Q2](#blocking-for-swc-menu)); otherwise track as a follow-up ticket alongside the deferred selection work (decided to stay Phase B, [Q5](#blockers-and-open-questions))
- [ ] *(Phase B, not this pass)* [`submenu.test.ts`](../../../../1st-gen/packages/menu/test/submenu.test.ts) coverage (open/close, deep-tree focus) ports when submenus ship; drop the `mobile view` and `touch interactions` describe blocks regardless, or track them against [A8](#additive--ships-when-ready-zero-breakage-for-consumers-already-on-2nd-gen)
- [ ] Do **not** port [`menu-memory.test.ts`](../../../../1st-gen/packages/menu/test/menu-memory.test.ts) coverage as-is if it exercises the mobile drilldown/projection paths being dropped; re-scope to whatever memory-leak surface remains
- [ ] Add Playwright `menu.a11y.spec.ts` with `toMatchAriaSnapshot`

#### Behavior

- [ ] Open/close from trigger (press, and per the a11y analysis's `MenuTrigger`-equivalent `trigger` modes if adopted from React Spectrum S2)
- [ ] Arrow key / Home / End movement via `FocusgroupNavigationController` (`direction: 'vertical'`, `wrap: true`); wrap-around at first/last item covered explicitly, not just linear movement
- [ ] Escape closes and returns focus to the trigger
- [ ] Disabled item is focusable but not activatable
- [ ] Link item activates via native anchor semantics only (no duplicate `change`)
- [ ] *(Phase B, not this pass)* Submenu open/close and nested keyboard behavior, once `swc-menu-item`'s submenu exists (no `swc-popover` dependency — see [Architecture](#architecture-core-vs-swc-split))

#### Visual regression

- [ ] Add VRT coverage for size × any shipped item-content combinations (icon, description, value, and any additive content types actually shipped)
- [ ] Add focus-visible regression coverage for the trigger and for in-menu roving focus
- [ ] Add high-contrast / forced-colors coverage for the menu surface and selected/disabled item states

### Documentation

#### General

- [ ] JSDoc on all public props, slots, and CSS custom properties
- [ ] Storybook stories for anatomy, options (sizes), states, behaviors (open/close, submenu), and accessibility

#### Breaking changes

- [ ] Document [B1](#must-ship--breaking-or-a11y-required)–[B10](#must-ship--breaking-or-a11y-required) in the consumer migration guide ([SWC-1223](https://jira.corp.adobe.com/browse/SWC-1223))

### Review

- [ ] `yarn lint:2nd-gen` passes (ESLint, Stylelint, Prettier)
- [ ] Status table in workstream doc updated
- [ ] PR created with description referencing Epic [SWC-1980](https://jira.corp.adobe.com/browse/SWC-1980)
- [ ] Peer engineer sign-off
- [ ] File (or confirm someone has filed) a fix for the stale Popover row in the [2nd-gen migration status table](../../02_workstreams/02_2nd-gen-component-migration/01_status.md) — discovered during this plan's drafting, not otherwise related to Menu

---

## Blockers and open questions

During drafting, this section tracks active blockers and open questions. In the final review-ready plan, once core migration questions are resolved and deferred tickets exist, replace those drafting-time rows with a concise deferred-ticket table.

Grouped by whether the question is about `swc-menu` itself or about a sibling component/downstream consumer this plan doesn't own.

**Resolved:**

| # | Item | Resolution |
| --- | --- | --- |
| Q1 | Whether the reviewed Figma file (`Mngz9H7WZLbrCvGQf3GnsY`, titled "🚫 S2 / Web (Deprecated)", Beta v1.27.1) is the right source, given it matches the ticket's `S2/Web (Desktop scale)` link by file key and cover description. | Confirmed with Design: this is the only file, no newer replacement exists. |
| Q3 | Whether `swc-menu`'s trigger surface and `swc-menu-item`'s submenus anchor via `PlacementController` directly or wrap `<swc-popover>`. | **Decided: `PlacementController` directly.** `Tooltip.base.ts` already ships this exact pattern, and the popover a11y doc's own [2nd-gen design update](../popover/accessibility-migration-analysis.md#2nd-gen-design-update-amends-this-analysis--q4) rules out wrapping (`<swc-popover>` is a `role="dialog"` component; menu/listbox/combobox are explicitly PlacementController consumers, not host consumers). No credible alternative — settled, not reopened for review. |
| Q5 | Whether `picker`/`combobox`/`action-menu`'s dependency on `sp-menu`'s selection engine means `swc-menu` needs baseline single-select in Phase A. | **Decided: Additive, stays in Phase B.** No concrete migration for any of those three consumers is scheduled yet, so there's no live deadline forcing selection earlier. Shipping Phase A without it keeps the first PR reviewable against the menu-button pattern alone; if a real deadline emerges later, pull a minimal single-select into scope then — cheaper than carrying unused selection code through review now on a hypothetical. |
| Q6 | Whether `swc-menu` should own trigger-invocation semantics (`press`/`longPress`/`contextMenu`) via a `trigger` property. | **Decided: no `trigger` property in Phase A.** 1st-gen never had one — the consumer composes the trigger externally and wires its own click/keydown handling. Adding speculative API surface with no current consumer request works against a smaller, simpler API; the property can be added additively later without a breaking change if a concrete need shows up (e.g. `contextMenu` support). |
| Q11 | Whether `swc-menu-group` breaks from 1st-gen's `MenuGroup extends Menu` inheritance. | **Decided: yes, ship the break** ([B1](#must-ship--breaking-or-a11y-required)). Keeping the inheritance ties `swc-menu-group`'s public surface to everything `Menu` grows into over time (selection, printable-character nav, whatever comes next) — unbounded scope creep for a component whose entire job is grouping and labeling. 2nd-gen is greenfield with no consumers yet, so breaking it now is free; breaking it later would be a real migration. |
| Q12 | Whether `swc-menu` and `swc-action-menu` should share a base class/controller. | **Decided: no shared base for now.** `swc-action-menu` doesn't exist yet — designing a shared abstraction against one real implementation and one hypothetical one risks extracting the wrong thing. Ship `swc-menu`'s own base class; once `swc-action-menu` is built, diff the two and extract only what's proven identical (most likely: open/close event contract, `PlacementController` setup). Revisit then, not now. |
| Q14 | Whether `swc-menu-separator` should exist as its own custom element or `swc-menu` should compose `swc-divider` directly. | **Decided: reuse `swc-divider`, no `swc-menu-separator` element.** 1st-gen's `MenuDivider` already does nothing but wrap `divider.css` and set `role="separator"` — 2nd-gen's `Divider.base.ts` already sets that same role. A whole second custom element with zero behavioral delta is pure duplication (two Storybook entries, two test suites, two docs pages, for the same output). Any menu-specific spacing goes in `swc-menu`'s own stylesheet targeting a slotted `swc-divider`, not a new element. **This changes scope for the epic** — it removes `swc-menu-separator` as a deliverable and conflicts with the existing [menu-separator accessibility migration analysis](../menu-separator/accessibility-migration-analysis.md), which documents `swc-menu-separator` as a real, intended component. Surface this to whoever owns that epic-level scoping decision before treating it as final. |

### Blocking for swc-menu

| # | Item | Blocking? | Status | Owner |
| --- | --- | --- | --- | --- |
| Q2 | Beyond the Menu group/Menu item property tables, the same Figma file's dedicated "Changes in S2 Menu" frame (node `37252:5063`) states "We will continue to support checkboxes in menu items... evaluating optimal use cases for multi-select checkboxes in picker menus... avoid mixing checkboxes with other menu types," and its "Examples" frame (node `37252:4608`) shows a live multi-select checkbox menu ("Select up to 4 languages"). This is concrete design intent, not just a property-table inference, and it directly contradicts the [a11y analysis's Migration scope](./accessibility-migration-analysis.md#migration-scope-current), which defers all selection pending a product decision this evidence suggests has already been made. Get the a11y analysis's "Migration scope" section corrected. **Also unresolved as part of this same question (raised by Ruben):** `selectionMode` is decided to exist at both `swc-menu` (top-level items) and `swc-menu-group` (per-group) levels, matching React Spectrum's `Menu`/`MenuSection` split (see [Behavioral semantics — Mixed menus](#behavioral-semantics)) — that's the mechanism, already settled. What's still open is whether Design actually wants authors mixing selection-mode sections in one menu, given the Figma note recommends against it as UX guidance even though the API will permit it. | Yes | Open — no longer "is this real," now "when/how does it ship," plus the should-authors-mix UX question above (the mechanism question is resolved). Once resolved, [A2](#additive--ships-when-ready-zero-breakage-for-consumers-already-on-2nd-gen) moves to Must-ship as Phase B **in this plan** for the `swc-menu`-owned parts (top-level mode + aggregate state); the `swc-menu-group` half of Phase B is that plan's to implement. | Design + accessibility reviewer |
| Q4 | [B7](#must-ship--breaking-or-a11y-required) (disabled rows stay focusable/in the roving set) follows WAI-ARIA APG's permissive guidance, but this plan's own [React Spectrum S2 API surface](#react-spectrum-s2-api-surface) section quotes React Spectrum's `disabledKeys` as making items "cannot be selected, focused, or otherwise interacted with" — the opposite behavior. This plan's source-priority rules rank React implementation #1 for behavior; B7 currently resolves the conflict in APG's favor without naming it. Weighs in further toward APG now that it's confirmed to be `FocusgroupNavigationController`'s own default (`skipDisabled: false`) — following React Spectrum instead would mean actively overriding the controller, not just picking a default. Still needs to be a named decision, not an assumed one, given the source-priority conflict. | Yes | Open — affects B7's final wording and the Accessibility checklist | Accessibility reviewer |
| Q7 | Confirm `xl` size addition ([A1](#additive--ships-when-ready-zero-breakage-for-consumers-already-on-2nd-gen)) against the canonical Figma file (unblocked now that [Q1](#blockers-and-open-questions) is resolved). | No | Open | Design + implementation |
| Q8 | Confirm whether 1st-gen's mobile drilldown/tray implementation ([A8](#additive--ships-when-ready-zero-breakage-for-consumers-already-on-2nd-gen)) is dropped with a committed future-epic replacement, or dropped with no replacement plan yet. | No | Open | Design + ticket owner |
| Q9 | Obtain the gen1 Jira issues table for `component = "Menu"` (excluding `a11y`/`gen2` labels and Epic/Initiative types) — no Jira query access was available while drafting this plan; see [Open gen1 issues](#open-gen1-issues). | Yes (for review-readiness) | Open | Ticket owner |

### Cross-component follow-ups (not blocking `swc-menu`)

These surfaced while drafting this plan but are about a sibling component's own scope, docs, or existence — not about `swc-menu`'s own implementation. None of them gate Phase A.

| # | Item | Status | Owner |
| --- | --- | --- | --- |
| Q10 | React Spectrum's Menu docs state "Interactive elements... within menu items are not allowed" ([B8](#must-ship--breaking-or-a11y-required)) and "Sections without a header must have an `aria-label`." Neither constraint is currently written into the [Menu a11y analysis](./accessibility-migration-analysis.md) or the menu-item/menu-group equivalents — fold in there. Separately, the Figma "Examples" frame shows toggle-switch visuals inside menu item rows (a "Notifications" menu with switch-styled "Push notifications"/"Badge" items) — confirm this is a switch-*styled* `menuitemcheckbox` row (matching the "Multi-select (switch)" property in [Q2](#blocking-for-swc-menu)) and not a separately-focusable nested control, so it doesn't contradict B8. | Open | Design + accessibility reviewer |
| Q13 | The `swc-menu`, `swc-action-menu`, and `swc-menu-item` accessibility analyses all still describe anchoring as "`swc-popover` (or similar)" or via `swc-popover` outright, predating the popover a11y doc's `PlacementController` amendment. Correct all three docs to reference `PlacementController` directly, matching the decided model ([Q3](#blockers-and-open-questions)). | Open — doesn't block this plan, but should not wait long | Accessibility reviewer + menu-item/action-menu doc owners |
| Q15 | Migration order among `swc-menu`, `swc-menu-item`, and `swc-menu-group` is not yet decided (`swc-divider` already exists, and `swc-menu-separator` isn't being built — [Q14](#blockers-and-open-questions)). `swc-popover` is **not a sequencing variable** — it shipped in [PR #6356](https://github.com/adobe/spectrum-web-components/pull/6356) (merged 2026-07-14, before this plan was drafted) and `swc-menu` doesn't depend on it anyway. Each menu-family component either has or will have its own plan; sequencing among them is what remains open. | Open | Ticket owner |

<!-- Where possible, include the next action in the Item text or Status so reviewers know how to resolve the question. -->

---

## References

- [Washing machine workflow](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md)
- [2nd-gen migration status table](../../02_workstreams/02_2nd-gen-component-migration/01_status.md) — the Popover row reads blank despite Popover having shipped ([PR #6356](https://github.com/adobe/spectrum-web-components/pull/6356)); this appears to be a stale-table bug independent of Menu (see [Review](#review))
- [Menu accessibility migration analysis](./accessibility-migration-analysis.md)
- [Menu migration roadmap (rendering and styling)](./rendering-and-styling-migration-analysis.md)
- [Action menu accessibility migration analysis](../action-menu/accessibility-migration-analysis.md)
- [Action menu rendering and styling migration roadmap](../action-menu/rendering-and-styling-migration-analysis.md)
- [Menu group accessibility migration analysis](../menu-group/accessibility-migration-analysis.md)
- [Menu item accessibility migration analysis](../menu-item/accessibility-migration-analysis.md)
- [Menu separator accessibility migration analysis](../menu-separator/accessibility-migration-analysis.md)
- [Popover accessibility migration analysis — 2nd-gen design update (Q4)](../popover/accessibility-migration-analysis.md#2nd-gen-design-update-amends-this-analysis--q4) — the amendment establishing that menu/listbox/combobox build on `PlacementController` directly and do not wrap `<swc-popover>`; the section this plan's corrected architecture is built on
- [Popover rendering and styling migration roadmap](../popover/rendering-and-styling-migration-analysis.md)
- [Popover migration plan](../popover/migration-plan.md) — confirms Popover shipped; not a dependency of `swc-menu` regardless
- [Popover 2nd-gen source: `Popover.ts`](../../../../2nd-gen/packages/swc/components/popover/Popover.ts), [`Popover.base.ts`](../../../../2nd-gen/packages/core/components/popover/Popover.base.ts) — `role="dialog"`, `aria-haspopup="dialog"`, and focus-seating behavior that makes wrapping this component incompatible with the menu-button pattern
- [Tooltip 2nd-gen source: `Tooltip.base.ts`](../../../../2nd-gen/packages/core/components/tooltip/Tooltip.base.ts) — precedent for using `PlacementController` directly without wrapping `<swc-popover>`
- [`PlacementController` source](../../../../2nd-gen/packages/core/controllers/placement-controller/src/placement-controller.ts) and [docs](../../../../2nd-gen/packages/core/controllers/placement-controller/placement-controller.mdx)
- [Tabs 2nd-gen source: `Tabs.base.ts`](../../../../2nd-gen/packages/core/components/tabs/Tabs.base.ts) — confirms `FocusgroupNavigationController` is already shipped and in production use, not prospective
- [CSS style guide — Component Custom Property Exposure](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#component-custom-property-exposure)
- [1st-gen source: `Menu.ts`](../../../../1st-gen/packages/menu/src/Menu.ts), [`MenuItem.ts`](../../../../1st-gen/packages/menu/src/MenuItem.ts), [`MenuGroup.ts`](../../../../1st-gen/packages/menu/src/MenuGroup.ts), [`MenuDivider.ts`](../../../../1st-gen/packages/menu/src/MenuDivider.ts)
- [1st-gen tests](../../../../1st-gen/packages/menu/test/menu.test.ts) — plus `menu-selects.test.ts`, `submenu.test.ts`, `menu-group.test.ts`, `menu-item.test.ts`, `menu-memory.test.ts`
- [1st-gen README](../../../../1st-gen/packages/menu/README.md)
- [React Spectrum Menu](https://react-spectrum.adobe.com/Menu) — product alignment reference; confirmed to document `@react-spectrum/s2`, not the classic v3 package
- [React Spectrum S2 `Menu.tsx` source](https://github.com/adobe/react-spectrum/blob/main/packages/%40react-spectrum/s2/src/Menu.tsx) — `MenuItem`, `MenuSection`, `MenuTrigger`, `SubmenuTrigger`, `UnavailableMenuItemTrigger`, `Divider` exports
- [React Spectrum Menu — Content](https://react-spectrum.adobe.com/Menu#content) and [Slots](https://react-spectrum.adobe.com/Menu#slots) — basic `MenuItem` anatomy (icon/image, label, description, keyboard shortcut); source for the Phase A content-scope cross-check above
- [`FocusgroupNavigationController` docs](../../../../2nd-gen/packages/core/controllers/focusgroup-navigation-controller/focusgroup-navigation-controller.mdx) — roving-tabindex mechanics, options (`direction`, `wrap`, `memory`, `skipDisabled`, `pageStep`), and the `focusFirstItemByTextPrefix`/`setActiveItem` API; source for the concrete Phase A keyboard-navigation config in [Behavioral semantics](#behavioral-semantics)
- [Spectrum CSS — `spectrum-two` branch](https://github.com/adobe/spectrum-css/tree/spectrum-two) — S2 styling source of truth; **not yet reviewed against a sibling checkout for this plan** — component-specific path to confirm once available (see [Setup](#setup)); this is a known gap given spectrum-css is Source Priority #3 for both API and visual decisions
- [Badge migration reference](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#reference-badge-migration)
- [WAI-ARIA APG: Menu button](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/)
- [spectrum-web-components PR #6129 — Focusgroup navigation controller](https://github.com/adobe/spectrum-web-components/pull/6129) (merged 2026-04-16; already shipped)
- [spectrum-web-components PR #6356 — gen2 Popover migration](https://github.com/adobe/spectrum-web-components/pull/6356) (merged 2026-07-14)
- Figma file `Mngz9H7WZLbrCvGQf3GnsY` (same file key as the ticket's `S2/Web (Desktop scale)` link, titled "🚫 S2 / Web (Deprecated)"; confirmed with Design as the only file, no replacement — [Q1](#blockers-and-open-questions)): cover (`0:1`), "Menu" properties/sizes/variants frame (`125485:35276`), component library (`125485:44694`), "Changes in S2 Menu" (`37252:5063`), "Examples" (`37252:4608`)
- Epic: [SWC-1980](https://jira.corp.adobe.com/browse/SWC-1980) - Menu migration epic. Related: [SWC-1981](https://jira.corp.adobe.com/browse/SWC-1981) (a11y recommendations, prerequisite to this plan), [SWC-1223](https://jira.corp.adobe.com/browse/SWC-1223) (consumer migration documentation)
- SWC-923: `menu-item` with `href` triggers link twice ([B2](#must-ship--breaking-or-a11y-required))
- SWC-1332: custom content as submenu not keyboard accessible
- SWC-1517: submenu item focus outline on hover (Safari)
- SWC-963: Epic — align menu components with APG; reduce semantic confusion
