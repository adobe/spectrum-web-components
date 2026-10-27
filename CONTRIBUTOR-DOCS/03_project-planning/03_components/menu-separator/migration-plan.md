<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Menu Divider / Menu Divider Migration Plan

<!-- Document title (editable) -->

# Menu divider migration plan

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
- [Dependencies](#dependencies)
- [Open gen1 issues](#open-gen1-issues)
- [Migration sequencing and prerequisites](#migration-sequencing-and-prerequisites)
    - [Dependency-aware recommendation](#dependency-aware-recommendation)
    - [Related components and ordering notes](#related-components-and-ordering-notes)
    - [User confirmation needed](#user-confirmation-needed)
- [Changes overview](#changes-overview)
    - [Must ship — breaking or a11y-required](#must-ship--breaking-or-a11y-required)
    - [Additive — ships when ready, zero breakage for consumers already on gen2](#additive--ships-when-ready-zero-breakage-for-consumers-already-on-gen2)
- [gen2 API decisions](#gen2-api-decisions)
    - [Public API](#public-api)
    - [Behavioral semantics](#behavioral-semantics)
    - [Accessibility semantics notes (gen2)](#accessibility-semantics-notes-gen2)
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
- [Decision log](#decision-log)
- [References](#references)

</details>

<!-- Document content (editable) -->

> **Epic [SWC-2668](https://jira.corp.adobe.com/browse/SWC-2668)** · Planning output. Must be reviewed before implementation begins. **Provisional:** the 1st-gen Jira issue list has not been pulled yet. The Figma `S2 / Web` Menu frame and the Spectrum CSS `spectrum-two` source has been reviewed (see [Blockers and open questions](#blockers-and-open-questions)).
>
> This plan recommends that `sp-menu-divider` is **not** migrated as its own gen2 element. `swc-divider` already ships and the Menu plan confirmed it as the menu separator ([Menu plan Q14](../menu/migration-plan.md#blockers-and-open-questions)). The remaining Phase 1 work is to confirm that decision and scope the menu-specific spacing and docs that replace the element.

---

## TL;DR

- `sp-menu-divider` (`MenuDivider`) has no behavior of its own: it extends `SizedMixin(SpectrumElement)`, reuses `divider.css`, adds a few menu-specific margins, and sets `role="separator"` in `firstUpdated`. gen2 `DividerBase` already sets `role="separator"` and supports `size`.
- **Recommendation:** do not create `swc-menu-divider` or `swc-menu-separator`. Menus compose `swc-divider`. The menu-specific spacing moves into `swc-menu`'s stylesheet, targeting slotted `swc-divider` (Menu plan Q14, confirmed by nikkimk).
- This conflicts with [`menu-separator/accessibility-migration-analysis.md`](../menu-separator/accessibility-migration-analysis.md), which documents a standalone `swc-menu-separator`. That doc needs to be reconciled or retired.
- Must ship: consumer migration path `sp-menu-divider` → `swc-divider`, menu-context spacing, and a11y guidance (valid inside menus, not inside pickers or comboboxes; direct child of the menu list, not inside `swc-menu-group`).
- Open risk: `swc-divider` supports `vertical` and `static-color`, which are meaningless in a menu. Decide whether `swc-menu` ignores, warns about, or documents against them.
- Divider is deferred in Menu Phase A, so any implementation work lands in Menu Phase B.

### Most blocking open questions

- Q1 in [Scope and prerequisites](#scope-and-prerequisites): confirm no standalone element. Every later section depends on it.
- Q2 in [Scope and prerequisites](#scope-and-prerequisites): the stale `menu-separator` a11y doc and where the work is tracked.
- Q6 in [Design](#design): Figma shows a 2px divider in menus, but the Spectrum CSS story uses `size: "s"`. Which thickness is correct decides what `swc-menu` applies.

---

## 1st-gen API surface

**Source:** [`1st-gen/packages/menu/src/MenuDivider.ts`](../../../../1st-gen/packages/menu/src/MenuDivider.ts)
**Version:** `@spectrum-web-components/menu@1.12.5`
**Custom element tag:** `sp-menu-divider`

### Properties / attributes

| Property | Type                | Default | Attribute | Notes                                                                                |
| -------- | ------------------- | ------- | --------- | ------------------------------------------------------------------------------------ |
| `size`   | `'s' \| 'm' \| 'l'` | `'m'`   | `size`    | From `SizedMixin`. Reflects to the attribute. Does not feed any menu-specific style. |

No other public API. `role="separator"` is set on the host in `firstUpdated`.

### Methods

| Method | Signature | Notes |
| ------ | --------- | ----- |
| None   | n/a       | n/a   |

### Events

None.

### Slots

| Slot | Content | Notes                       |
| ---- | ------- | --------------------------- |
| None | n/a     | Renders no slotted content. |

### CSS custom properties

Styles come from `divider.css` plus [`menu-divider.css`](../../../../1st-gen/packages/menu/src/menu-divider.css), `spectrum-menu-divider.css`, and `menu-divider-overrides.css`. Highlights: `--spectrum-menu-divider-thickness` (defaults to `--spectrum-divider-thickness-medium`), `--mod-menu-section-divider-margin-block`, and `--mod-menu-item-label-inline-edge-to-content` for the inline margin. Host is `display: block; flex-shrink: 0; inline-size: auto; overflow: visible`.

Spectrum CSS `spectrum-two` ([`components/menu/index.css`](https://github.com/adobe/spectrum-css/blob/spectrum-two/components/menu/index.css), `.spectrum-Menu-divider`) matches this: thickness defaults to `--spectrum-divider-thickness-medium` and switches to `--spectrum-divider-thickness-small` under `.spectrum-Divider--sizeS`. Block margin is `max(0px, (--spectrum-menu-item-section-divider-height - thickness) / 2)`, and inline margin is `--spectrum-menu-item-label-inline-edge-to-content`.

This full modifier surface will not be carried forward to gen2.

### Shadow DOM output (rendered HTML)

`MenuDivider` has no `render()` of its own. The shadow content comes from the inherited `SpectrumElement` render (an empty shadow root styled by `divider.css`), with `role="separator"` on the host.

```html
<sp-menu-divider role="separator" size="m"></sp-menu-divider>
```

---

## Dependencies

| Package                                   | Version   | Role                                                        |
| ----------------------------------------- | --------- | ----------------------------------------------------------- |
| `@spectrum-web-components/base`           | workspace | `SpectrumElement`, `SizedMixin`.                            |
| `@spectrum-web-components/divider`        | workspace | Shared `divider.css`.                                       |
| `@spectrum-web-components/menu` (sibling) | workspace | Parent context: `sp-menu`, `sp-menu-group`, `sp-menu-item`. |

---

## Open gen1 issues

<!-- TODO: populate from Jira with JQL `component = "Menu"`, excluding labels a11y and gen2, Done status, and Epic/Initiative types. Jira was not queried for this draft. -->

| Jira | Type | Status (snapshot) | Summary                            |
| ---- | ---- | ----------------- | ---------------------------------- |
| TBD  | n/a  | n/a               | Not yet pulled from Jira (see Q4). |

## Migration sequencing and prerequisites

### Dependency-aware recommendation

Proceed with no new element. The only dependent work is menu-specific spacing for slotted `swc-divider`, which belongs in the `swc-menu` stylesheet and ships with Menu Phase B (Menu plan, [Implementation phasing](../menu/migration-plan.md)). `swc-divider` is already migrated ([status table](../../02_workstreams/02_gen2-component-migration/01_status.md)), so there is no prerequisite.

### Related components and ordering notes

- `swc-divider` ([`gen2/packages/swc/components/divider`](../../../../gen2/packages/swc/components/divider)): the replacement. Core `DividerBase` sets `role="separator"` and owns `size`, `vertical`, and `staticColor`.
- `swc-menu`: owns menu-specific spacing and allowed-children validation. Divider joins its slot in Phase B.
- `swc-menu-group`: dividers are direct children of the menu list, not of a group (see [menu-separator a11y analysis](../menu-separator/accessibility-migration-analysis.md)).
- Shared `_lit-styles/` fragment: not needed. One consumer (`swc-menu`), no duplication.
- Shared render template: N/A, no render output.
- Global stylesheet (`global-menu-divider.css`): N/A, no element is created.
- Shared core resources ([gen2 shared resources](../../../01_contributor-guides/16_gen2-shared-resources.md)): nothing to reuse or promote.

### User confirmation needed

1. Confirm that `swc-menu-divider` / `swc-menu-separator` will not exist (Q1).
2. Confirm that menu-specific spacing lives in `swc-menu`'s stylesheet rather than a `_lit-styles/` fragment (Q5).

---

## Changes overview

> **Priority framing:** Accessibility ships with this migration; breaking changes are assessed on merit; additive items are deferred and not deprecated.

### Must ship — breaking or a11y-required

#### API and naming

| #      | What changes                           | 1st-gen behavior                                | gen2 behavior                                                                                                       | Consumer migration path                                                                                                     |
| ------ | -------------------------------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **B1** | Tag removed; use `swc-divider` instead | `<sp-menu-divider>` with `size` `s`/`m`/`l`     | No `swc-menu-divider`. `<swc-divider>` inside `swc-menu`.                                                           | Replace `<sp-menu-divider>` with `<swc-divider>`. Keep `size` only if the value is still supported. Source: Menu plan Q14. |
| **B2** | `size` values on divider               | `s`, `m`, `l`; default `m` (medium thickness)   | `swc-divider` `size` `s`/`m`/`l` ([Divider.types.ts](../../../../gen2/packages/core/components/divider/Divider.types.ts)). Spectrum CSS menu story uses `size: "s"` (small thickness). | Authors set `size="s"` on `swc-divider` in menus, or `swc-menu` forces small thickness (Q6). |

#### Styling and visuals

| #      | What changes                     | 1st-gen behavior                                                                                | gen2 behavior                                                                         | Consumer migration path                                                                                           |
| ------ | -------------------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| **B3** | Menu spacing owned by `swc-menu` | Margin-block from `--mod-menu-section-divider-margin-block`; margin-inline from item label edge | `swc-menu` CSS styles slotted `swc-divider` using S2 tokens (`menu-item-section-divider-height`, `menu-item-label-inline-edge-to-content`), no `--mod-*` | Remove any `--mod-menu-section-divider-margin-block` overrides; no replacement API unless Q3 shows one is needed. |

#### Accessibility and behavior

| #      | What changes                | 1st-gen behavior                   | gen2 behavior                                                                                                | Consumer migration path                                      |
| ------ | --------------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------ |
| **B4** | Placement and misuse guidance | Undocumented; any placement worked | Docs and (optionally) dev-mode validation: valid in menus, not pickers/combobox, not inside `swc-menu-group` | Move dividers out of groups; use group labels for structure. |
| **B5** | Skipped by roving focus     | `sp-menu` skips dividers           | `FocusgroupNavigationController` in `swc-menu` must skip `role="separator"`                                  | None; verify in Menu Phase B tests.                          |

### Additive — ships when ready, zero breakage for consumers already on gen2

| #      | What is added                                                        | Notes                                    |
| ------ | -------------------------------------------------------------------- | ---------------------------------------- |
| **A1** | Dev-mode warning when `vertical` or `static-color` is used in a menu | Depends on Q7; not required for baseline. |

---

## gen2 API decisions

Derived from the 1st-gen implementation, the Menu migration plan, the gen2 `swc-divider` source, the Spectrum CSS `spectrum-two` menu source, and the existing menu-separator a11y analysis. The Figma `S2 / Web` Menu frame was reviewed; the React S2 `Divider` was not. Items are **Inferred** unless noted.

### Public API

#### Properties / attributes (gen2)

| Property | Type | Default | Attribute | Notes                                                                                                                  |
| -------- | ---- | ------- | --------- | ---------------------------------------------------------------------------------------------------------------------- |
| N/A      | n/a  | n/a     | n/a       | **Inferred.** No new element. Uses `swc-divider` API; `vertical` and `static-color` are not supported in menus (Q7). |

#### Visual matrix (gen2)

N/A: no new element. Menu divider is a horizontal, default-color `swc-divider` only. Figma shows a 2px line; Spectrum CSS renders it at small thickness (`size: "s"`). Reconcile in Q6.

#### Slots (gen2)

N/A: `swc-divider` has no slots. `swc-menu`'s default slot accepts `swc-divider` in Phase B.

#### CSS custom properties (gen2)

No `--mod-*` properties will be exposed. New `--swc-*` component-level properties may be introduced where needed — these are additive and not breaking. See [Component Custom Property Exposure](../../../02_style-guide/01_css/02_custom-properties.md#component-custom-property-exposure) for what to expose and how.

Initial expectation for menu divider is zero new public properties; spacing is internal to `swc-menu`.

### Behavioral semantics

- Static, non-interactive, no events.
- Not focusable and not a `menuitem`; roving focus skips it.

### Accessibility semantics notes (gen2)

- `role="separator"` is already set by `DividerBase`. No additional ARIA.
- Must be a direct child of the menu list; not inside `swc-menu-group`, pickers, or comboboxes (Menu plan Q21).
- Docs should discourage dividers between loose items; prefer labelled `swc-menu-group`.

---

## Architecture: core vs SWC split

> The 1st-gen component is a **reference only** — gen2 is built independently. Neither generation imports from the other.

| Layer    | Path                                              | Contains                                                                                        |
| -------- | ------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| **Core** | `gen2/packages/core/components/divider/`          | Existing `DividerBase`. No change expected.                                                     |
| **SWC**  | `gen2/packages/swc/components/menu/` (`menu.css`) | Menu-context spacing for slotted `swc-divider`. No new element, no new `menu-divider/` folder. |

Planned rendering shape:

- Core: unchanged.
- SWC: `swc-menu` stylesheet targets `::slotted(swc-divider)`; no new render output.

---

## Migration checklist

### Preparation (this ticket)

- [x] 1st-gen API surface documented
- [x] Dependencies identified
- [x] Breaking changes documented
- [x] gen2 API decisions drafted
- [ ] Plan reviewed by at least one other engineer

### Setup

- [x] No new core or SWC folders (N/A: no new element)
- [x] Check out `spectrum-css` at `spectrum-two` branch as sibling directory (done at `4df8792e1`)

### API

#### Naming and public surface

- [ ] Confirm no `swc-menu-divider` / `swc-menu-separator` (Q1)
- [ ] Allow `swc-divider` in `swc-menu` allowed-children types (Menu Phase B)

#### Alignment checks

- [x] Compare against Figma `S2 / Web` Menu frame (Q3, Q6)
- [ ] Compare against React S2 `Divider`

### Styling

> Follow the [CSS style guide](../../../02_style-guide/01_css/) as the source of truth for all styling work.

- [ ] Port the `.spectrum-Menu-divider` rule from spectrum-css `spectrum-two` menu `index.css` into `menu.css`, targeting slotted `swc-divider`; apply the thickness chosen in Q6 and the container heights from Q3
- [ ] Pass stylelint (property order, `no-descending-specificity`, token validation)
- [ ] Add VRT of divider inside menu at each menu size (with Menu Phase B)

### Accessibility

#### Naming and semantics

- [ ] Reconcile the [menu-separator a11y analysis](../menu-separator/accessibility-migration-analysis.md) with the no-element decision (Q2)
- [ ] Add the menu-vs-picker note to the [divider a11y analysis](../divider/accessibility-migration-analysis.md) (Menu plan Q21)

#### State verification

- [ ] Verify roving focus skips the divider and the menu role tree exposes `separator` (`toMatchAriaSnapshot`)

### Testing

- [ ] Port 1st-gen menu tests that include `sp-menu-divider` ([`menu.test.ts`](../../../../1st-gen/packages/menu/test/menu.test.ts), [`menu-group.test.ts`](../../../../1st-gen/packages/menu/test/menu-group.test.ts)) using `swc-divider`

### Documentation

- [ ] Menu docs and migration guide: `sp-menu-divider` → `swc-divider` (B1)
- [ ] Note placement rules (B4)

### Review

- [ ] `yarn lint:gen2` passes (ESLint, Stylelint, Prettier)
- [ ] Status table in workstream doc updated
- [ ] PR created with description referencing Epic SWC-2668
- [ ] Peer engineer sign-off

---

## Blockers and open questions

### Design

| #   | Item                                                                                                                                                                     | Blocking? | Status | Owner                   |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------- | ------ | ----------------------- |
| Q3  | Figma `S2 / Web` Menu frame ([node 10095:400](https://www.figma.com/design/xHBWBBIe2eo5vwoCeNrC4Q/S2---Web?node-id=10095-400)) was reviewed via metadata and a screenshot. It has a single divider style: a 2px line in a container of 10px (small menu items) or 16px (larger items) height, inset 10 to 12px from each side. Next action: design confirms the container heights map to `menu-item-section-divider-height` per menu size. | No        | Open   | Design + implementation |
| Q6  | Figma draws a 2px divider; the Spectrum CSS story passes `size: "s"` (small thickness token); 1st-gen defaults to medium. Confirm which `swc-divider` size yields 2px, then decide whether `swc-menu` forces it on slotted dividers (recommended) or authors set `size`. | No        | Open   | Design + implementation |
| Q7  | Should `swc-menu` ignore, warn on, or forbid `vertical` and `static-color` on a slotted `swc-divider`? Recommend docs only, plus optional dev warning (A1).               | No        | Open   | Architecture reviewer   |

### Architecture and behavior

| #   | Item                                                                                                                              | Blocking? | Status | Owner        |
| --- | --------------------------------------------------------------------------------------------------------------------------------- | --------- | ------ | ------------ |
| Q5  | Confirm spacing lives in `swc-menu` CSS rather than a shared `_lit-styles/` fragment. Recommend `swc-menu` CSS (single consumer). | No        | Open   | CSS reviewer |

### Scope and prerequisites

| #   | Item                                                                                                                                                                       | Blocking? | Status | Owner                  |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ------ | ---------------------- |
| Q1  | Confirm there is no standalone `swc-menu-divider` / `swc-menu-separator`, per Menu plan Q14. Next action: team sign-off, since this request implies a migration of its own. | Yes       | Open   | Architecture reviewer  |
| Q2  | `menu-separator/accessibility-migration-analysis.md` documents a standalone `swc-menu-separator`. Update or retire it, and decide whether it keeps its own folder.         | Yes       | Open   | Accessibility reviewer |
| Q4  | 1st-gen Jira issue table and breaking-change ticket(s) for B1 are missing.                                                                                   | No        | Open   | Ticket owner           |

---

## Decision log

| Ref             | Decision                                                         | Rationale / context                                                                                                                                                |
| --------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Q14 (Menu plan) | Reuse `swc-divider` as the menu separator; no dedicated element. | `MenuDivider` adds no behavior beyond `divider.css` and `role="separator"`, which `DividerBase` already sets. Confirmed by nikkimk. Carried over here, pending Q1. |

---

## References

- [Washing machine workflow](../../02_workstreams/02_gen2-component-migration/02_step-by-step/01_washing-machine-workflow.md)
- [gen2 migration status table](../../02_workstreams/02_gen2-component-migration/01_status.md)
- [Menu migration plan](../menu/migration-plan.md) (Q14, Q21)
- [Menu separator accessibility migration analysis](../menu-separator/accessibility-migration-analysis.md)
- [Divider accessibility migration analysis](../divider/accessibility-migration-analysis.md)
- [Divider rendering and styling migration analysis](../divider/rendering-and-styling-migration-analysis.md)
- [Menu rendering and styling migration analysis](../menu/rendering-and-styling-migration-analysis.md)
- Epic: [SWC-2668](https://jira.corp.adobe.com/browse/SWC-2668)
- Figma: [S2 / Web, Menu](https://www.figma.com/design/xHBWBBIe2eo5vwoCeNrC4Q/S2---Web?node-id=10095-400)
- 1st-gen source: [`MenuDivider.ts`](../../../../1st-gen/packages/menu/src/MenuDivider.ts), [`menu-divider.css`](../../../../1st-gen/packages/menu/src/menu-divider.css)
- gen2 `swc-divider`: [`Divider.ts`](../../../../gen2/packages/swc/components/divider/Divider.ts), [`Divider.base.ts`](../../../../gen2/packages/core/components/divider/Divider.base.ts)
- Spectrum CSS: [`spectrum-css/components/menu/index.css`](https://github.com/adobe/spectrum-css/blob/spectrum-two/components/menu/index.css) and `stories/template.js` on `spectrum-two` (commit `4df8792e1`)
- Accessibility migration analysis for `menu-divider`: TODO (covered by the menu-separator doc, see Q2)
