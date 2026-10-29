<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Menu Item / Menu item migration plan

<!-- Document title (editable) -->

# Menu item migration plan

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
- [React Spectrum S2 API surface](#react-spectrum-s2-api-surface)
- [Dependencies](#dependencies)
- [Changes overview](#changes-overview)
    - [Must ship](#must-ship)
    - [Additive](#additive)
    - [Deferred to later phases](#deferred-to-later-phases)
- [gen2 API decisions](#gen2-api-decisions)
- [Architecture: core vs SWC split](#architecture-core-vs-swc-split)
- [Migration checklist](#migration-checklist)
    - [API](#api)
    - [CSS](#css)
    - [Accessibility](#accessibility)
    - [Testing](#testing)
    - [Documentation](#documentation)
- [Blockers and open questions](#blockers-and-open-questions)
- [Decision log](#decision-log)
- [References](#references)

</details>

<!-- Document content (editable) -->

## TL;DR

`swc-menu-item` is the command row inside `swc-menu`. `swc-menu` already ships and collects its rows with `:scope > swc-menu-item`, so this component has a concrete contract to satisfy on day one: the tag name, `role="menuitem"`, and taking part in the owning menu's roving tabindex.

Phase A is deliberately narrow: a row with a label, an optional leading visual, and a disabled state. Everything that made 1st-gen `sp-menu-item` large (link rows, submenus, selection, descriptions, trailing values) is out, each for a reason already decided in `swc-menu`'s own plan. This plan carries those decisions forward rather than reopening them.

The single most consequential carry-forward: **link rows leave this component entirely**. 1st-gen `MenuItem` extends `LikeAnchor` and can render an anchor; gen2 moves that to a separate `swc-menu-link` ([Q17](#blockers-and-open-questions)). `swc-menu-item` never carries `href`.

### Most blocking open questions

- [Q20](#blockers-and-open-questions): does `DisabledMixin` fight the controller's roving tabindex? Unverified, and it decides whether `disabled` is reused or hand-rolled.
- [Q21](#blockers-and-open-questions): which Figma file supersedes the now-deprecated one the whole menu epic was specced against.

## 1st-gen API surface

Source: [`1st-gen/packages/menu/src/MenuItem.ts`](../../../../1st-gen/packages/menu/src/MenuItem.ts).

Class shape: `MenuItem extends LikeAnchor(ObserveSlotText(ObserveSlotPresence(Focusable, '[slot="icon"]')))`. Three of those four layers disappear in gen2.

### Properties / attributes

| Property | Attribute | Type | Default | Disposition |
| --- | --- | --- | --- | --- |
| `disabled` (via `Focusable`) | `disabled` | `boolean` | `false` | **Keep**, remapped to `aria-disabled` ([B20](#must-ship)) |
| `active` | `active` | `boolean` | `false` | **Drop** — internal pressed state, not public API |
| `focused` | `focused` | `boolean` | `false` | **Drop** — roving tabindex owns focus state |
| `selected` | `selected` | `boolean` | `false` | **Drop** — the `menuitem` role does not support `aria-selected`. Selection moves to `swc-menuitem-checkbox` / `swc-menuitem-radio` via `aria-checked`. A "current" affordance, if wanted, is a separate question ([Q24](#blockers-and-open-questions)) |
| `value` | — (getter) | `string` | slot text | **Drop** — selection-scoped, so it follows `selected` to the checkbox and radio rows |
| `hasSubmenu` | `has-submenu` | `boolean` | `false` | **Defer** — submenus are Phase B |
| `open` | `open` | `boolean` | `false` | **Defer** — submenu open state, Phase B |
| `noWrap` | `no-wrap` | `boolean` | `false` | **Open** ([Q22](#blockers-and-open-questions)) |
| `href`, `target`, `download`, `rel`, `referrerpolicy`, `label` (via `LikeAnchor`) | matching | various | `undefined` | **Drop** — link rows move to `swc-menu-link` ([B21](#must-ship)) |

### Methods

| Method | Disposition |
| --- | --- |
| `setRole(role)` | **Drop** — the row is always `menuitem` this phase; `menuitemcheckbox`/`menuitemradio` arrive with selection |
| `dispatchUpdate()` | **Drop** — superseded by the controller's own `refresh()` on `slotchange` |

### Events

| Event | Disposition |
| --- | --- |
| `sp-menu-item-added-or-updated` (`MenuItemAddedOrUpdatedEvent`) | **Drop** — `swc-menu` discovers rows by query on `slotchange`, not by announcement |
| `MenuItemKeydownEvent` | **Drop** — internal to the 1st-gen submenu wiring |

No public `change`/activation event in Phase A: activation is a plain `click` on the row, which `swc-menu` already closes on.

### Slots

| Slot | Disposition |
| --- | --- |
| default | **Replaced** by a named `label` slot ([B22](#must-ship)) |
| `icon` | **Renamed** to `visual` ([B23](#must-ship)) |
| `description` | **Defer** — Phase B. Likely needed to tell similarly-named options apart, which is an a11y concern in its own right |
| `value` | **Defer** — trailing content, Phase B |
| `submenu` | **Defer** — Phase B |

### CSS custom properties

45 `--mod-menu-item-*` properties. All **dropped**, consistent with [B5](#must-ship) on `swc-menu`. Phase A exposes no public custom properties; revisit on a concrete override request.

## React Spectrum S2 API surface

`MenuItem` takes `children` plus slotted `Text slot="label"`, `Text slot="description"`, and `Keyboard`, with `onAction`, `isDisabled`, and `href`.

Two things worth noting against this plan:

- React Spectrum's **basic** example already combines icon, label, description and keyboard shortcut. Phase A is narrower by choice, not because React Spectrum treats those as advanced.
- React Spectrum **does** support `href` on the item. gen2 diverges deliberately ([Q17](#blockers-and-open-questions)): a separate `swc-menu-link` instead of a dual-mode row.

## Dependencies

| Dependency | Status | Note |
| --- | --- | --- |
| `swc-menu` | Shipped | Imposes the `:scope > swc-menu-item` tag-name contract and owns open/close and arrow-key navigation |
| `FocusgroupNavigationController` | Shipped | Owns roving tabindex; the row must not fight it |
| `SizedMixin` | Shipped | `s`/`m`/`l`/`xl`, default `m`, matching `swc-menu` |
| `DisabledMixin` | Shipped, **no consumers yet** | Maps `disabled` to `aria-disabled` and manages tabindex. See [Q20](#blockers-and-open-questions) |
| `swc-thumbnail` | Not built | Needed before the `visual` slot accepts a thumbnail ([A4](#additive)) |
| `swc-menu-link` | Not planned | Owner of link rows ([Q17](#blockers-and-open-questions)) |
| `swc-menuitem-checkbox`, `swc-menuitem-radio` | Not planned | Owners of selection, exposed as `aria-checked`. Selection never returns to `swc-menu-item` |

## Changes overview

### Must ship

| # | What changes | 1st-gen to gen2 |
| --- | --- | --- |
| **B20** | Disabled rows | `disabled` maps to `aria-disabled="true"`, not the native attribute. Rows stay focusable and in the roving set, per `swc-menu`'s [B7](../menu/migration-plan.md) |
| **B21** | Link rows | `LikeAnchor` surface removed entirely. `swc-menu-item` never carries `href` or renders an anchor ([Q17](#blockers-and-open-questions)) |
| **B22** | Label content | Named `label` slot replaces the default slot, so `description` can sit alongside it later without ambiguity |
| **B23** | Leading visual | `icon` slot renamed `visual`, so it can hold an icon or a future `swc-thumbnail` without a second rename |
| **B24** | Role | `role="menuitem"` on the host, always. No `setRole()` and no conditional branch |
| **B25** | CSS custom properties | All 45 `--mod-menu-item-*` removed |

### Additive

| # | What's added | Note |
| --- | --- | --- |
| **A20** | `xl` size | Matches `swc-menu`'s own size set |

### Deferred to later phases

| # | Item |
| --- | --- |
| **B26** | Submenus (`hasSubmenu`, `open`, `submenu` slot) |
| **A21** | Selection — not a later phase of this component. It belongs to `swc-menuitem-checkbox` and `swc-menuitem-radio`, which expose it as `aria-checked` |
| **A22** | `description` and trailing `value` slots |
| **A23** | `swc-thumbnail` in the `visual` slot |
| **A24** | Highlight badge |
| **A25** | Printable-character navigation |

## gen2 API decisions

**Confirmed** unless marked otherwise. This table is `swc-menu`'s "Phase A minimal `swc-menu-item` surface", promoted here from provisional to authoritative.

| Property | Attribute | Type | Default | Status |
| --- | --- | --- | --- | --- |
| `size` | `size` | `'s' \| 'm' \| 'l' \| 'xl'` | `'m'` | Confirmed |
| `disabled` | `disabled` | `boolean` | `false` | Confirmed; mapping via [Q20](#blockers-and-open-questions) |

Slots: `label` (text), `visual` (optional leading icon). No default slot in Phase A.

Role: `menuitem`, set on the host before the owning menu's first discovery pass.

## Architecture: core vs SWC split

Mirrors `swc-menu`:

- `core/components/menu-item/MenuItem.base.ts` — role, disabled semantics, size, roving-tabindex participation
- `core/components/menu-item/MenuItem.types.ts` — `MENU_ITEM_VALID_SIZES`, `MenuItemSize`
- `swc/components/menu-item/MenuItem.ts` + `menu-item.css` — render template and row chrome

Row chrome belongs here, not in `swc-menu`: in `spectrum-css`, `.spectrum-Menu` carries no background, border, radius or shadow, and every visual property is scoped under `.spectrum-Menu-item`.

## Migration checklist

### API

- [x] `MenuItem.types.ts` with `MENU_ITEM_VALID_SIZES` and `MenuItemSize`
- [x] `MenuItemBase` with `size`, `disabled`, and `role="menuitem"` on the host
- [x] Resolve [Q20](#blockers-and-open-questions) before settling the `disabled` implementation
- [x] `index.ts` exports and `core/package.json` subpath exports

### CSS

- [ ] Row chrome: background, border, radius, padding, and hover/focus/disabled treatments
- [ ] No public custom properties this pass
- [ ] Forced-colors treatment
- [ ] Stylelint clean

### Accessibility

- [x] `role="menuitem"` present before `swc-menu`'s first discovery pass
- [x] `disabled` exposes `aria-disabled="true"` and the row stays arrow-reachable
- [x] <kbd>Enter</kbd> and <kbd>Space</kbd> activate an enabled row ([WCAG 2.1.1](https://www.w3.org/WAI/WCAG22/Understanding/keyboard)); a disabled row swallows both without activating
- [ ] Reconcile `accessibility-migration-analysis.md`: its "Migration scope" currently lists submenu parents and link rows as in scope, contradicting [Q17](#blockers-and-open-questions)

### Testing

Red/green TDD. Each item below should fail before the implementation exists.

- [x] Host carries `role="menuitem"` on connect
- [x] Defaults: `size` is `m`, `disabled` is `false`, no `aria-disabled`
- [x] `disabled` sets `aria-disabled="true"` and **not** the native disabled behaviour
- [x] A disabled row remains reachable by arrow keys inside `swc-menu` ([B20](#must-ship)); this is the test that settles [Q20](#blockers-and-open-questions)
- [x] `label` and `visual` slots render in the expected order
- [x] `swc-menu` discovers rows via `:scope > swc-menu-item` with real elements, not placeholders
- [x] <kbd>Enter</kbd> and <kbd>Space</kbd> reach a consumer `click` handler on an enabled row, and neither activates a disabled one
- [ ] Playwright: ARIA tree shows `menu` containing named `menuitem` rows
- [ ] VRT: sizes, disabled, with and without a visual, forced colors

> **Test-authoring note.** A spike for this plan produced a false failure by pressing a key before the menu's deferred open-focus had settled, so the key went to `body`. Assert the row actually holds focus before dispatching navigation keys.

### Documentation

- [ ] `menu-item.mdx` docs page and stories
- [ ] Consumer migration guide covering the dropped `href` surface and the slot renames
- [ ] Update `swc-menu`'s stories, tests and VRT to use real rows with `slot="label"` instead of placeholders

## Blockers and open questions

| # | Question | Blocking? | Status |
| --- | --- | --- | --- |
| **Q20** | Does `DisabledMixin` fight `FocusgroupNavigationController`? The mixin writes `tabindex` (saving and restoring a previous value) while the controller owns roving tabindex and, with `skipDisabled: false`, deliberately keeps `aria-disabled` rows in sequence. `DisabledMixin` currently has no consumers, so this combination is untested. Resolved in review: if they conflict, skip `DisabledMixin` and map the property by hand, leaving tabindex entirely to the controller. | Yes, for the API | **Closed.** They conflict, so `MenuItemBase` maps `disabled` to `aria-disabled` by hand and never touches tabindex. The arrow-reachability test confirms it, and fails when the controller's `skipDisabled` is flipped |
| **Q21** | The menu epic was specced against Figma file `Mngz9H7WZLbrCvGQf3GnsY`, now named "S2 - Web (Deprecated)". `swc-menu` and `swc-close-button` link to it; `swc-thumbnail` uses `xHBWBBIe2eo5vwoCeNrC4Q`. Which supersedes it, and do the row specs change? | Yes, for styling | Open |
| **Q22** | Does `noWrap` survive? 1st-gen offers it; `swc-menu` already caps row width at 320px, so wrapping behaviour needs a design answer rather than a carry-forward. | No | Open |
| **Q24** | Should a row be able to mark itself as the current one? `menuitem` cannot carry `aria-selected`, but `aria-current` is available and would cover "this is where you are" without implying selection. Needs a product answer on whether menus need it at all before any `current` property is designed. | No | Open |
| **Q23** | Authoring ergonomics of the named `label` slot: `<swc-menu-item><span slot="label">Cut</span></swc-menu-item>` is heavier than the 1st-gen default-slot form, and every existing `swc-menu` story and test uses the lighter one. Confirm the trade is still wanted now that the cost is visible. | No | Open, decided in principle under [B22](#must-ship) |

## Decision log

| Decision | Source |
| --- | --- |
| Link rows move to `swc-menu-link`; `swc-menu-item` is never a link | `swc-menu` plan, Q17 |
| `role="menuitem"` on exactly one node, no competing role | `swc-menu` plan, Q19 |
| Named `label` slot rather than the default slot | `swc-menu` plan, Phase A surface table |
| Disabled rows stay in the roving set | `swc-menu` plan, B7 |
| Migration order among menu siblings still undecided | `swc-menu` plan, Q15 |

## References

- [`1st-gen/packages/menu/src/MenuItem.ts`](../../../../1st-gen/packages/menu/src/MenuItem.ts)
- [Menu migration plan](../menu/migration-plan.md) — Q15/Q17/Q19 and the Phase A surface table
- [Menu item accessibility migration analysis](./accessibility-migration-analysis.md)
- [`gen2/packages/core/components/menu/Menu.base.ts`](../../../../gen2/packages/core/components/menu/Menu.base.ts) — the tag-name contract
- [APG menu button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/)
