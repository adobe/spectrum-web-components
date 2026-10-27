<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Menu Separator / Menu Separator Migration Plan

<!-- Document title (editable) -->

# Menu separator migration plan

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

> **Epic [SWC-2668](https://jira.corp.adobe.com/browse/SWC-2668)** · Planning output. Must be reviewed before implementation begins. **Provisional:** the 1st-gen Jira issue list has not been pulled yet. The Figma `S2 / Web` Menu frame and the Spectrum CSS `spectrum-two` menu source have been reviewed.
>
> This plan migrates `sp-menu-divider` to a standalone **`swc-menu-separator`**, following the [menu separator accessibility migration analysis](./accessibility-migration-analysis.md), which takes precedence. This supersedes the earlier draft recommendation to reuse `swc-divider`, and it conflicts with [Menu plan Q14](../menu/migration-plan.md#blockers-and-open-questions) (see Q1).

---

## TL;DR

- `sp-menu-divider` becomes **`swc-menu-separator`**. It is a static, non-focusable `role="separator"` line with no slotted content, used only as a direct child of `swc-menu`, `swc-action-menu`, or `swc-menu-item` (submenu), never inside `swc-menu-group`.
- Naming follows the accessibility analysis and ARIA terminology (`separator`). 1st-gen has only `sp-menu-divider`; there is no 1st-gen `sp-menu-separator`.
- The 1st-gen `size` property is dropped. Size, spacing, and thickness are owned by the menu context, so the element exposes no public properties.
- Open risk: [Menu plan Q14](../menu/migration-plan.md#blockers-and-open-questions) decided there would be no dedicated element, and Menu Phase A/B scoping and its `swc-divider` references assume that. Menu docs must be reconciled (Q1).
- Open risk: Figma draws a 2px line, while the Spectrum CSS story passes `size: "s"` to its divider (Q6).
- Menu Phase A defers dividers, so this component ships with Menu Phase B or earlier if the team pulls it forward.

### Most blocking open questions

- Q1 in [Scope and prerequisites](#scope-and-prerequisites): reverse Menu plan Q14 and update Menu docs, or keep both plans consistent another way.
- Q2 in [Architecture and behavior](#architecture-and-behavior): whether the separator extends `DividerBase` or stands alone in core.
- Q6 in [Design](#design): the line thickness (2px in Figma versus the small-size token in Spectrum CSS).

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

Migrate `swc-menu-separator` independently of the other menu parts. It has no behavior to wait on: `swc-divider` already exists, and the parents only need to accept it as a child. It can ship before `swc-menu` Phase B, but it is only usable inside menus once Phase B lands.

### Related components and ordering notes

- `swc-divider` ([`gen2/packages/swc/components/divider`](../../../../gen2/packages/swc/components/divider)): closest existing implementation. Core `DividerBase` sets `role="separator"` and owns `size`, `vertical`, and `staticColor`, which the separator does not need (Q2).
- `swc-menu`: parent. Must list `swc-menu-separator` in its allowed children and skip it in `FocusgroupNavigationController`. Its Phase B scope and Q14 text need updating (Q1).
- `swc-action-menu` and `swc-menu-item` (submenu): also valid parents.
- `swc-menu-group`: the separator must not be placed inside it.
- Shared `_lit-styles/` fragment: none needed if the separator keeps its own CSS. If the divider line styling is shared with `swc-divider`, consider a fragment (Q2).
- Shared render template: N/A, the render output is a single empty element.
- Global stylesheet (`global-menu-separator.css`): not planned. The element only has meaning inside `swc-menu`.
- Shared core resources ([gen2 shared resources](../../../01_contributor-guides/16_gen2-shared-resources.md)): `FocusgroupNavigationController` is used by the parent, not the separator.

### User confirmation needed

1. Reverse Menu plan Q14 and ship a standalone element (Q1).
2. Choose the core base: extend `DividerBase` or stand alone (Q2).

---

## Changes overview

> **Priority framing:** Accessibility ships with this migration; breaking changes are assessed on merit; additive items are deferred and not deprecated.

### Must ship — breaking or a11y-required

#### API and naming

| #      | What changes                                       | 1st-gen behavior                            | gen2 behavior                                                      | Consumer migration path                                                                                  |
| ------ | -------------------------------------------------- | ------------------------------------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| **B1** | Rename `sp-menu-divider` to `swc-menu-separator`   | `<sp-menu-divider>`                         | `<swc-menu-separator>`. Source: [a11y analysis](./accessibility-migration-analysis.md), ARIA `separator`. | Replace the tag. No attribute changes beyond B2.                                                         |
| **B2** | Remove `size`                                      | `size` `s`/`m`/`l`, reflected               | No public properties. Thickness and spacing come from the menu.    | Delete any `size` attribute on `sp-menu-divider`.                                                        |
| **B3** | Placement is restricted                            | Allowed anywhere, including inside groups   | Direct child of `swc-menu`, `swc-action-menu`, or `swc-menu-item` only | Move separators out of `swc-menu-group`; use group labels for sectioning.                                |

#### Styling and visuals

| #      | What changes                           | 1st-gen behavior                                                                                | gen2 behavior                                                                                          | Consumer migration path                                                                  |
| ------ | -------------------------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| **B4** | No `--mod-*`; S2 tokens                | Margin-block from `--mod-menu-section-divider-margin-block`; margin-inline from item label edge | Spacing from S2 tokens (`menu-item-section-divider-height`, `menu-item-label-inline-edge-to-content`), thickness per Q6 | Remove `--mod-menu-section-divider-margin-block` overrides; no replacement API planned. |

#### Accessibility and behavior

| #      | What changes                            | 1st-gen behavior                  | gen2 behavior                                                                                   | Consumer migration path                    |
| ------ | --------------------------------------- | --------------------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------ |
| **B5** | Fixed `role="separator"`, non-focusable | Set in `firstUpdated`             | Set deterministically (confirm timing, Q8); no `tabindex`; no value semantics; no accessible name by default | None.                                      |
| **B6** | Skipped by roving focus                 | `sp-menu` skips dividers          | `FocusgroupNavigationController` in the parent skips it                                         | None; verify in tests.                     |

### Additive — ships when ready, zero breakage for consumers already on gen2

| #      | What is added                                                           | Notes                                       |
| ------ | ----------------------------------------------------------------------- | ------------------------------------------- |
| **A1** | Dev-mode warning when placed inside `swc-menu-group` or outside a menu | Supports B3; not required for the baseline. |

---

## gen2 API decisions

Derived from the [accessibility analysis](./accessibility-migration-analysis.md) (preferred source), the 1st-gen implementation, the gen2 `swc-divider` source, the Spectrum CSS `spectrum-two` menu source, and the Figma `S2 / Web` Menu frame. The React S2 `Divider` was not reviewed. Items are **Inferred** unless noted.

### Public API

#### Properties / attributes (gen2)

| Property | Type | Default | Attribute | Notes                                                                 |
| -------- | ---- | ------- | --------- | --------------------------------------------------------------------- |
| N/A      | n/a  | n/a     | n/a       | **Inferred.** No public properties. `role` is fixed, not configurable. |

#### Visual matrix (gen2)

N/A: a single horizontal line. Figma shows a 2px line in a container of 10px (small item rows) or 16px (larger rows), inset 10 to 12px from each side. No static-color or vertical variants.

#### Slots (gen2)

None. The host must not expose a default slot (confirmed by the accessibility analysis).

#### CSS custom properties (gen2)

No `--mod-*` properties will be exposed. New `--swc-*` component-level properties may be introduced where needed — these are additive and not breaking. See [Component Custom Property Exposure](../../../02_style-guide/01_css/02_custom-properties.md#component-custom-property-exposure) for what to expose and how.

Initial expectation for menu separator is zero or one reviewed property (for example thickness), documented with `@cssprop`.

### Behavioral semantics

- Static, non-interactive, no events, not focusable, not a `menuitem`.
- Spacing is derived from the parent menu's size via tokens, not from a `size` attribute (Q3).

### Accessibility semantics notes (gen2)

From the [accessibility analysis](./accessibility-migration-analysis.md):

- `role="separator"` on the host, no `aria-valuenow` or splitter semantics, no accessible name by default.
- Direct child of `swc-menu`, `swc-action-menu`, or `swc-menu-item`; not inside `swc-menu-group`. Light-DOM slotting is fine.
- Line must meet non-text contrast (WCAG 1.4.11) against the menu background.
- Docs favor separators between labelled `swc-menu-group` blocks, and discourage them between loose items.

---

## Architecture: core vs SWC split

> The 1st-gen component is a **reference only** — gen2 is built independently. Neither generation imports from the other.

Follow the [Badge migration reference](../../02_workstreams/02_gen2-component-migration/02_step-by-step/01_washing-machine-workflow.md#reference-badge-migration) as the concrete pattern for the core/SWC split.

| Layer    | Path                                                  | Contains                                                                                                                    |
| -------- | ----------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **Core** | `gen2/packages/core/components/menu-separator/`       | `MenuSeparator.base.ts` (sets `role="separator"`, no properties), `MenuSeparator.types.ts` if needed. No rendering.          |
| **SWC**  | `gen2/packages/swc/components/menu-separator/`        | `MenuSeparator.ts`, `menu-separator.css`, `swc-menu-separator.ts` registration, stories, tests, docs.                       |

Planned rendering shape:

- Core owns the role and any dev-mode placement warnings (A1).
- SWC renders a single internal `<div class="swc-MenuSeparator">` (keep styling off `:host`), styled with S2 tokens.
- Whether the core base extends `DividerBase` or `SpectrumElement` is open (Q2). Recommendation: `SpectrumElement`, because `DividerBase` carries `size`, `vertical`, and `staticColor` that the separator must not expose.

---

## Migration checklist

### Preparation (this ticket)

- [x] 1st-gen API surface documented
- [x] Dependencies identified
- [x] Breaking changes documented
- [x] gen2 API decisions drafted
- [ ] Plan reviewed by at least one other engineer

### Setup

- [ ] Create `gen2/packages/core/components/menu-separator/`
- [ ] Create `gen2/packages/swc/components/menu-separator/`
- [ ] Wire exports in both `package.json` files
- [x] Check out `spectrum-css` at `spectrum-two` branch as sibling directory (done at `4df8792e1`)

### API

#### Naming and public surface

- [ ] `MenuSeparator.base.ts`: set `role="separator"`; no public properties
- [ ] No default slot
- [ ] Add `swc-menu-separator` to the allowed children of `swc-menu`, `swc-action-menu`, and `swc-menu-item` (Menu Phase B)

#### Alignment checks

- [x] Compare against Figma `S2 / Web` Menu frame (Q3, Q6)
- [ ] Compare against React S2 `Divider`

### Styling

> Follow the [CSS style guide](../../../02_style-guide/01_css/) as the source of truth for all styling work. Key references: [migration steps](../../../02_style-guide/01_css/04_spectrum-swc-migration.md), [custom properties](../../../02_style-guide/01_css/02_custom-properties.md), [anti-patterns](../../../02_style-guide/01_css/05_anti-patterns.md).

- [ ] Add `.swc-MenuSeparator` to the internal element in `render()`; keep styling off `:host`
- [ ] Copy the `.spectrum-Menu-divider` rule from `spectrum-css` `spectrum-two` `components/menu/index.css` into `menu-separator.css` as baseline
- [ ] Apply the thickness chosen in Q6 and the container heights from Q3
- [ ] Add `@cssprop` JSDoc for every exposed `--swc-*` property
- [ ] Pass stylelint (property order, `no-descending-specificity`, token validation)

#### Visual model and regressions

- [ ] Add VRT of the separator inside `swc-menu` at each menu size, including forced-colors

### Accessibility

#### Naming and semantics

- [ ] Host `role="separator"`, no accessible name by default, no splitter value semantics
- [ ] Contrast of the line versus menu background meets 1.4.11

#### State verification

- [ ] Not focusable; roving focus skips it
- [ ] Keyboard and screen reader testing per the [accessibility analysis](./accessibility-migration-analysis.md#testing)

### Testing

- [ ] Port 1st-gen menu tests that include `sp-menu-divider` ([`menu.test.ts`](../../../../1st-gen/packages/menu/test/menu.test.ts), [`menu-group.test.ts`](../../../../1st-gen/packages/menu/test/menu-group.test.ts))
- [ ] Add Playwright `menu-separator.a11y.spec.ts` with `toMatchAriaSnapshot`

#### Behavior

- [ ] ArrowUp and ArrowDown move between `menuitem` rows past the separator

#### Visual regression

- [ ] See Styling > Visual model and regressions

### Documentation

#### General

- [ ] JSDoc on the class and any CSS custom properties
- [ ] Storybook story with a separator between labelled `swc-menu-group` blocks

#### Breaking changes

- [ ] Migration guide: `sp-menu-divider` → `swc-menu-separator`, `size` removed, placement rules (B1 to B3)

### Review

- [ ] `yarn lint:gen2` passes (ESLint, Stylelint, Prettier)
- [ ] Status table in workstream doc updated
- [ ] PR created with description referencing Epic SWC-2668
- [ ] Peer engineer sign-off

---

## Blockers and open questions

### Design

| #   | Item                                                                                                                                                                                                                                                                                                  | Blocking? | Status | Owner                   |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ------ | ----------------------- |
| Q3  | Figma `S2 / Web` Menu frame ([node 10095:400](https://www.figma.com/design/xHBWBBIe2eo5vwoCeNrC4Q/S2---Web?node-id=10095-400)) has a single divider style: a 2px line in a 10px or 16px container, inset 10 to 12px. Next action: design confirms the container heights map to `menu-item-section-divider-height` per menu size. | No        | Open   | Design + implementation |
| Q6  | Figma draws a 2px line; the Spectrum CSS story passes `size: "s"` (small thickness token); 1st-gen defaults to medium. Confirm which thickness token yields 2px and use it.                                                                                                                            | Yes       | Open   | Design + implementation |

### Architecture and behavior

| #   | Item                                                                                                                                                                                  | Blocking? | Status | Owner                 |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ------ | --------------------- |
| Q2  | Core base: extend `DividerBase` (reuses role and line CSS, but inherits `size`, `vertical`, `staticColor`) or stand alone on `SpectrumElement` (recommended). Duplicated line CSS is small. | Yes       | Open   | Architecture reviewer |
| Q5  | Should shared line styling be extracted to a `_lit-styles/` fragment used by both `swc-divider` and `swc-menu-separator`? Recommend no unless Q2 chooses standalone and duplication grows. | No        | Open   | CSS reviewer          |
| Q8  | Confirm when `role="separator"` is applied (constructor, `connectedCallback`, or `firstUpdated`) so it is present before first paint.                                                  | No        | Open   | Accessibility reviewer |
| Q7  | Dev-mode warning for placement inside `swc-menu-group` or outside a menu (A1): in scope or deferred?                                                                                  | No        | Open   | Architecture reviewer |

### Scope and prerequisites

| #   | Item                                                                                                                                                                                                                                              | Blocking? | Status | Owner                  |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ------ | ---------------------- |
| Q1  | This plan reverses [Menu plan Q14](../menu/migration-plan.md#blockers-and-open-questions) (reuse `swc-divider`, no `swc-menu-separator`), per the instruction to prefer the menu-separator accessibility analysis. Menu plan Q14, Q15, Q21 and its Phase B text need updating to match. | Yes       | Open   | Architecture reviewer  |
| Q4  | 1st-gen Jira issue table and breaking-change ticket(s) for B1 to B3 are missing.                                                                                                                                                                  | No        | Open   | Ticket owner           |
| Q9  | Which tickets and migration order cover `swc-menu-separator` relative to `swc-menu`, `swc-menu-item`, and `swc-menu-group` (Menu plan Q15)?                                                                                                      | No        | Open   | Ticket owner           |

---

## Decision log

| Ref | Decision                                                                                  | Rationale / context                                                                                                                                                                         |
| --- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Q14 | Superseded for this plan: ship a standalone `swc-menu-separator`, not reuse `swc-divider`. | Direction from the plan owner: prefer the menu-separator accessibility analysis, which documents a standalone element. Menu plan Q14 argued duplication; the trade-off is two Storybook entries and test suites. Pending Q1. |

---

## References

- [Washing machine workflow](../../02_workstreams/02_gen2-component-migration/02_step-by-step/01_washing-machine-workflow.md)
- [gen2 migration status table](../../02_workstreams/02_gen2-component-migration/01_status.md)
- [Menu separator accessibility migration analysis](./accessibility-migration-analysis.md)
- [Menu migration plan](../menu/migration-plan.md) (Q14, Q15, Q21)
- [Divider accessibility migration analysis](../divider/accessibility-migration-analysis.md)
- [Divider rendering and styling migration analysis](../divider/rendering-and-styling-migration-analysis.md)
- [Menu rendering and styling migration analysis](../menu/rendering-and-styling-migration-analysis.md)
- Epic: [SWC-2668](https://jira.corp.adobe.com/browse/SWC-2668)
- Figma: [S2 / Web, Menu](https://www.figma.com/design/xHBWBBIe2eo5vwoCeNrC4Q/S2---Web?node-id=10095-400)
- 1st-gen source: [`MenuDivider.ts`](../../../../1st-gen/packages/menu/src/MenuDivider.ts), [`menu-divider.css`](../../../../1st-gen/packages/menu/src/menu-divider.css)
- gen2 `swc-divider`: [`Divider.ts`](../../../../gen2/packages/swc/components/divider/Divider.ts), [`Divider.base.ts`](../../../../gen2/packages/core/components/divider/Divider.base.ts)
- Spectrum CSS: [`components/menu/index.css`](https://github.com/adobe/spectrum-css/blob/spectrum-two/components/menu/index.css) and `components/menu/stories/template.js` on `spectrum-two` (commit `4df8792e1`)
