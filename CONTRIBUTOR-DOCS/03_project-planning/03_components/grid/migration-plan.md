<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Grid / Grid migration plan

<!-- Document title (editable) -->

# Grid migration plan

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
    - [Deferred items (to file under Epic SWC-1968, label `deferred`)](#deferred-items-to-file-under-epic-swc-1968-label-deferred)
- [Decision log](#decision-log)
- [References](#references)

</details>

<!-- Document content (editable) -->

> **[Epic SWC-1968](https://jira.corp.adobe.com/browse/SWC-1968)** · Planning output. Must be reviewed before implementation begins.
>
> Core architecture and API questions were resolved on 2026-09-16; see the [Decision log](#decision-log) (C1–C7). Remaining work is deferred additive scope (see [Blockers and open questions](#blockers-and-open-questions)).
>
> This plan should provide recommendations, not just observations. Call out inconsistencies, propose better API or naming paths where appropriate, and make unresolved tradeoffs explicit for reviewers.

---

## TL;DR

- **Scope decision (settled):** Grid migrates as a **full standalone `swc-grid` component** (core + SWC split), following the [Grid analysis docs](./rendering-and-styling-migration-analysis.md). This intentionally diverges from [`12_tools-vs-packages.md`](../../../01_contributor-guides/12_tools-vs-packages.md), which previously listed Grid as a reclassify-to-CSS-utilities target; that guide's Grid row was updated to match on 2026-09-16 ([C1](#decision-log)).
- **What grid is:** 1st-gen `sp-grid` (`1st-gen/tools/grid`) is a virtualized layout host that extends `LitVirtualizer`, not a Spectrum-visual component. There is **no S2 Figma**; layout metrics come from CardView and card specs. The primary consumer is the planned `swc-card-view` (React Spectrum CardView parity), which does not exist yet.
- **Must-ship breaking changes:** tag rename `sp-grid` to `swc-grid`; grid **owns `role="grid"`** and a **required accessible name** (consumers stop hand-wiring ARIA); keyboard moves from `RovingTabindexController` to the 2nd-gen `FocusgroupNavigationController` with an expanded key contract; the item-object `selected` array plus `key`-attribute lookup is replaced by a key-based selection API.
- **Accessibility is the core of this migration.** The [accessibility migration analysis](./accessibility-migration-analysis.md) is the source of truth: prescribed `role="grid"`, required label, `FocusgroupNavigationController` (`direction: 'grid'`), virtualization-aware `aria-rowcount`/`aria-colcount` and per-item indices, and selection semantics.
- **Prerequisites already exist in core:** `FocusgroupNavigationController`, `live-selection-controller`, and `drag-and-drop-controller` are all present in `2nd-gen/packages/core/controllers/`. New 2nd-gen dependencies needed: `@lit-labs/virtualizer` and `@lit-labs/observers`.
- **Key architecture/API decisions (resolved 2026-09-16):** virtualization via the `@lit-labs/virtualizer` `virtualize` directive with a render-free core base ([C2](#decision-log)); items in **light DOM** projected via a shadow `<slot>` ([C3](#decision-log)); React Spectrum CardView-aligned selection (`selectionMode` + `selectedKeys`, [C4](#decision-log)); grid owns the container role and navigation while `renderItem` / `swc-card` supplies per-item `row` / `gridcell` / name / selected ([C5](#decision-log)).

### Most blocking open questions

None blocking. All drafting-time questions (Q1–Q9) are resolved; see the [Decision log](#decision-log) (C1–C7). Remaining scope is deferred additive work (A1–A5) tracked under Epic SWC-1968.

---

## 1st-gen API surface

**Source:** [`1st-gen/tools/grid/src/Grid.ts`](../../../../1st-gen/tools/grid/src/Grid.ts) and [`GridController.ts`](../../../../1st-gen/tools/grid/src/GridController.ts)
**Version:** `@spectrum-web-components/grid@1.12.3`
**Custom element tag:** `sp-grid`
**Base class:** `LitVirtualizer` (`@lit-labs/virtualizer`), not `SpectrumElement`.

### Properties / attributes

| Property | Type | Default | Attribute | Notes |
| -------- | ---- | ------- | --------- | ----- |
| `items` | `Record<string, unknown>[]` | `[]` | none (property) | Data model; overrides `LitVirtualizer.items`. |
| `renderItem` | `(item, index, selected) => TemplateResult` | inherited | none (property) | 1st-gen wraps the inherited `renderItem` to inject `selected` as a third argument. |
| `selected` | `Record<string, unknown>[]` | `[]` | none (property) | Array of selected item objects. The [README](../../../../1st-gen/tools/grid/README.md) calls this `selectedItems`; that is a **documentation error**, the real property is `selected` (confirmed in `Grid.ts`, stories, and tests). |
| `itemSize` | `{ width: number; height: number }` | `{ width: 200, height: 200 }` | none (property) | Drives the virtualizer `grid` layout and the column-count math in `GridController`. |
| `gap` | `` `0` `` or `` `${number}px` `` | `'0'` | `gap` | Space between items. |
| `padding` | `` `0` `` or `` `${number}px` `` or `undefined` | `undefined` | `padding` | Space around all items; falls back to `gap` when unset. |
| `focusableSelector` | `string` | unset | `focusableselector` (Lit lowercases; no explicit attribute name) | CSS selector for the focus target inside each rendered item (for example `sp-card`). Queried in **light DOM** via `this.querySelectorAll(focusableSelector)`. |
| _inherited_ | `layout`, `keyFunction`, and other `LitVirtualizer` members | | | Grid extends `LitVirtualizer`, so its full public surface (for example `scrollToIndex()`, `layout`) leaks into `sp-grid`'s API today. 2nd-gen should expose an intentional surface rather than inherit the whole virtualizer. |

### Methods

| Method | Signature | Notes |
| ------ | --------- | ----- |
| `focus` | `focus(options?: FocusOptions): void` | Delegated to `GridController` / `RovingTabindexController`; focuses the roving item, not the host. |
| `scrollToIndex` | inherited from `LitVirtualizer` | Programmatic scroll to an item index. |
| `handleChange` | `protected handleChange(event: Event): void` | Captures item `change` events, dedupes per animation frame, toggles the item in `selected`. Relies on a `key` attribute on the rendered item to index back into `items`. |
| `createRenderRoot`, `render`, `update`, `connectedCallback`, `disconnectedCallback` | overrides | Internal lifecycle; `update()` rewires the layout and the `renderItem` wrapper; `render()` returns a single `<slot>`. |

### Events

- **`change`** — announced when `selected` changes. In practice this is the bubbling `change` from an item (for example an `sp-card` toggle) that the grid listens for in the capture phase; consumers bind `@change` on `sp-grid`. Documented via the `@fires change` JSDoc on the class.
- **`rangeChanged`, `visibilityChanged`** — inherited from `LitVirtualizer`; consumed internally by `GridController` to keep roving state and first/last visible indices in sync.

### Slots

| Slot | Content | Notes |
| ---- | ------- | ----- |
| (default) | `<slot></slot>` | Internal plumbing, not a consumer authoring slot. The virtualizer renders `renderItem` output into the grid's **light DOM**, and the default slot projects those children. Items are supplied through `items` + `renderItem`, not by slotting. |

### CSS custom properties

The 1st-gen [`grid.css`](../../../../1st-gen/tools/grid/src/grid.css.ts) exposes **no** custom properties. It sets only `:host { contain: strict; pointer-events: none; display: block; position: relative }` and `::slotted(*) { pointer-events: all }`. There is no `--mod-*` or `--spectrum-*` modifier surface to carry forward.

### Shadow DOM output (rendered HTML)

```html
<!-- Shadow root -->
<slot></slot>

<!-- Light DOM (virtualizer-managed, absolutely positioned by the grid layout) -->
<!-- one node per visible item + buffer, produced by renderItem(item, index, selected) -->
```

---

## Dependencies

**Source:** [`1st-gen/tools/grid/package.json`](../../../../1st-gen/tools/grid/package.json)

| Package | Version | Role |
| ------- | ------- | ---- |
| `@lit-labs/virtualizer` | `2.0.12` | Base class (`LitVirtualizer`), the `grid` layout, and range/visibility events. **Not yet a 2nd-gen dependency.** |
| `@lit-labs/observers` | `2.0.2` | `ResizeController` for measuring container width to compute column count. **Not yet a 2nd-gen dependency.** |
| `@spectrum-web-components/reactive-controllers` | `1.12.3` | `RovingTabindexController` (`direction: 'grid'`). Replaced in 2nd-gen by `FocusgroupNavigationController`. |
| `@spectrum-web-components/base` | `1.12.3` | `ReactiveElement`, `adoptStyles`, `css`, `html`, `property`. |
| `lit` | `^2.5.0 \|\| ^3.1.3` | Rendering runtime. |

---

## Open gen1 issues

<!-- gen1 (sp-*) bugs and stories for this component. Excludes a11y-labelled, gen2-labelled, Done, Epic, and Initiative issues. -->

| Jira | Type | Status (snapshot) | Summary |
| ---- | ---- | ----------------- | ------- |
| [SWC-1083](https://jira.corp.adobe.com/browse/SWC-1083) | Bug | To Do | docs: `sp-grid` toggle card usage in docs site is not working (GH #5582). Relates to the skipped "allows to tab in and out" keyboard test in `grid.test.ts` and the `@todo` in the 1st-gen README. |

_Verified against Adobe Jira (`Component = "Grid"`, gen1 issues excluding the `a11y` and `gen2` labels, unresolved) on 2026-09-16: one open issue (above). SWC-1083 tracks the docs/keyboard example defect (GH #5582), which aligns with the skipped "allows to tab in and out" test in [`grid.test.ts`](../../../../1st-gen/tools/grid/test/grid.test.ts) and the `@todo` in the 1st-gen README; address it in Phase 4 (accessibility) and Phase 6 (testing)._

---

## Migration sequencing and prerequisites

### Dependency-aware recommendation

**Migrate `swc-grid` first, as the foundation for `swc-card-view`.** Grid is the lower-level primitive; the planned `swc-card-view` composes it. Building grid first unblocks card-view, but grid's selection, loading, and empty-state API must be **validated against the React Spectrum CardView contract during Phase 3** so card-view can adopt grid without forcing a second API reshape. Card-view itself is out of scope for this migration ([C7](#decision-log)).

### Related components and ordering notes

- **`swc-card-view`** (primary consumer) — does **not** exist in 2nd-gen. Drives grid's selection/loading/empty-state and layout metrics.
- **`swc-card`** — exists in 2nd-gen core and SWC; the default per-cell content for CardView usage.
- **`FocusgroupNavigationController`** — **exists** in `2nd-gen/packages/core/controllers/focusgroup-navigation-controller/` (used by `tabs`, `action-group`). This is the prescribed 2nd-gen keyboard engine for grid.
- **`live-selection-controller`**, **`drag-and-drop-controller`** — exist in `2nd-gen/packages/core/controllers/`; candidates to back grid selection and card drag (the 1st-gen stories set `draggable="true"` on cards).
- **`@lit-labs/virtualizer`, `@lit-labs/observers`** — new 2nd-gen dependencies to add to the SWC package.

### User confirmation needed

- **Confirmed 2026-09-16:** `swc-grid` is a **public, standalone** component ([C1](#decision-log)), and `swc-card-view` is a **separate**, later migration; `swc-grid` ships first as its foundation ([C7](#decision-log)).

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

| #   | What changes | 1st-gen behavior | 2nd-gen behavior | Consumer migration path |
| --- | ------------ | ---------------- | ---------------- | ----------------------- |
| **B1** | Element tag and package (source: washing-machine workflow; [rendering roadmap](./rendering-and-styling-migration-analysis.md)) | `<sp-grid>` from `@spectrum-web-components/grid` (in `tools/`) | `<swc-grid>` from the 2nd-gen SWC package (core + SWC split) | Swap import and tag; re-check the properties below. |
| **B2** | Selection API (source: [a11y analysis](./accessibility-migration-analysis.md); React Spectrum CardView) | `selected` is an array of **item objects**; membership tracked via a `key` attribute on each rendered item and a capture-phase `change` listener | Key-based selection: `selectionMode` (`none`/`single`/`multiple`) + `selectedKeys` (+ a `keyFunction`), synced to `aria-selected` on cell/row; emits `change` with `selectedKeys` | Replace `selected` reads/writes with `selectedKeys`; stop stamping `key` attributes manually. Names aligned to React Spectrum CardView ([C4](#decision-log)). |
| **B3** | Inherited virtualizer surface (source: `Grid.ts`) | `sp-grid` extends `LitVirtualizer`, leaking its entire public API | Intentional, documented public surface; virtualizer internals not part of the contract | Stop relying on undocumented inherited members; use the documented API. |

#### Styling and visuals

| #   | What changes | 1st-gen behavior | 2nd-gen behavior | Consumer migration path |
| --- | ------------ | ---------------- | ---------------- | ----------------------- |
| **B4** | Item DOM model (source: `Grid.ts`; [a11y analysis, cross-root ARIA](./accessibility-migration-analysis.md)) | Items rendered into **light DOM**; `focusableSelector` queried on light-DOM children; `::slotted(*)` re-enables pointer events | **Retained:** items stay in light DOM (virtualizer output projected via a shadow `<slot>`); `focusableSelector` still queries light-DOM children ([C3](#decision-log)) | Low impact; the item DOM model is unchanged from 1st-gen. Documented for clarity alongside the tag/package change (B1). |

#### Accessibility and behavior

| #   | What changes | 1st-gen behavior | 2nd-gen behavior | Consumer migration path |
| --- | ------------ | ---------------- | ---------------- | ----------------------- |
| **B5** | Ownership of `role="grid"` (source: [a11y analysis](./accessibility-migration-analysis.md)) | Author sets `role="grid"` on `<sp-grid>` manually (see stories) | Grid **prescribes** `role="grid"`; not author-overridable | Remove manual `role="grid"`; do not override the role. |
| **B6** | Accessible name (source: [a11y analysis](./accessibility-migration-analysis.md); CardView) | Author sets `aria-label` manually; no label API | **Required** accessible name via `accessible-label` / `aria-labelledby`; dev warning when missing | Move `aria-label` to the supported label API; provide a name (required). |
| **B7** | Keyboard engine and contract (source: [a11y analysis](./accessibility-migration-analysis.md); [focus management](../../../01_contributor-guides/14_focus-management.md)) | `RovingTabindexController` (`direction: 'grid'`); arrows only (per README + tests) | `FocusgroupNavigationController` (`direction: 'grid'`) with <kbd>Arrow</kbd> keys, <kbd>Home</kbd> / <kbd>End</kbd>, <kbd>Ctrl</kbd> + <kbd>Home</kbd> / <kbd>Ctrl</kbd> + <kbd>End</kbd>, and <kbd>Page Up</kbd> / <kbd>Page Down</kbd> when scrollable; `refresh()` after virtualizer range changes | Mostly internal; document the expanded keyboard contract. Fixes the skipped tab-in/out test. |
| **B8** | Virtualization-aware indices (source: [a11y analysis](./accessibility-migration-analysis.md)) | Author sets `aria-rowcount` / `aria-colcount` manually; per-item `aria-rowindex` set in `renderItem` | Grid manages `aria-rowcount` / `aria-colcount` and per-item `aria-rowindex` / `aria-colindex` from the **logical** collection size, not mounted node count | Stop setting these manually; grid owns them. |
| **B9** | Item semantics ownership (source: [a11y analysis](./accessibility-migration-analysis.md)) | Author stamps `role="row"`, `aria-selected`, `label` on each card in `renderItem` | Grid owns `role="grid"`, name, and row/col counts; `renderItem` / `swc-card` supplies per-item `role="row"` / `role="gridcell"`, name, and `aria-selected` ([C5](#decision-log)) | Provide item names and per-item `row`/`gridcell` roles + `aria-selected`; drop manual container-level ARIA the grid now owns. |

### Additive — ships when ready, zero breakage for consumers already on 2nd-gen

| #   | What is added | Notes |
| --- | ------------- | ----- |
| **A1** | Layout modes (`grid` vs `waterfall`) | [Rendering roadmap](./rendering-and-styling-migration-analysis.md) mentions waterfall for CardView; not required for the baseline uniform-grid migration. |
| **A2** | `pageStep` for <kbd>Page Up</kbd> / <kbd>Page Down</kbd> and optional typeahead (`focusFirstItemByTextPrefix`) | Supported by `FocusgroupNavigationController`; enable when the collection scrolls / grows large. |
| **A3** | `disabledKeys` + `skipDisabled` | Skip disabled items during roving; additive over the baseline. |
| **A4** | Drag-and-drop reordering | 1st-gen stories set `draggable="true"`; back with the core `drag-and-drop-controller` when in scope. |
| **A5** | Loading / empty-state / bulk action-bar affordances | Per the a11y analysis these belong to **`swc-card-view`** (`role="status"` loading, `renderEmptyState`, `renderActionBar`), not the grid host. Track under card-view. |

---

## 2nd-gen API decisions

These are derived from the 1st-gen implementation, the [rendering roadmap](./rendering-and-styling-migration-analysis.md), the [accessibility migration analysis](./accessibility-migration-analysis.md), and the React Spectrum CardView reference. There is **no S2 Figma** for grid. Confidence is labeled per item.

- **Confirmed**: directly supported by source material
- **Inferred**: recommended based on multiple signals, but not explicitly specified in one authoritative source
- **Open question**: unresolved and needs review or more input

### Public API

#### Properties / attributes (2nd-gen)

| Property | Type | Default | Attribute | Notes |
| -------- | ---- | ------- | --------- | ----- |
| `items` | `T[]` (generic) | `[]` | none | **Confirmed.** Carry over. Consider a generic item type instead of `Record<string, unknown>`. |
| `renderItem` | `(item, index, state) => TemplateResult` | required | none | **Inferred.** Keep; consider passing a `state` object (`{ selected, disabled }`) rather than a positional `selected` boolean. |
| `selectionMode` | `'none' \| 'single' \| 'multiple'` | `'none'` | `selection-mode` | **Confirmed** ([C4](#decision-log)). React Spectrum CardView-aligned; replaces implicit always-on multi-select. |
| `selectedKeys` | `Set<Key>` | empty | none | **Confirmed** ([C4](#decision-log)). React Spectrum CardView-aligned; replaces item-object `selected`. Emits `change` with `selectedKeys`. |
| `keyFunction` | `(item) => Key` | identity/index | none | **Confirmed** ([C4](#decision-log)). Stable identity for selection + virtualization, replacing the `key` attribute hack. |
| `accessibleLabel` | `string` | unset (required) | `accessible-label` | **Confirmed** (a11y analysis). Required accessible name; dev warning when absent and no `aria-labelledby`. |
| `itemSize` | `{ width: number; height: number }` | `{ width: 200, height: 200 }` | none | **Confirmed** ([C6](#decision-log)). Baseline keeps the 1st-gen default until CardView specifies. |
| `gap` | length token or px | `0` | `gap` | **Confirmed** carry-over. Prefer a Spectrum spacing token default once specified. |
| `padding` | length token or px | falls back to `gap` | `padding` | **Confirmed** carry-over. |
| `focusableSelector` | `string` | `swc-card` (typical) | `focusable-selector` | **Confirmed** ([C3](#decision-log)). Light-DOM item model retained, so this keeps querying light-DOM children. |
| `layout` | `'grid' \| 'waterfall'` | `'grid'` | `layout` | **Additive** ([A1](#additive--ships-when-ready-zero-breakage-for-consumers-already-on-2nd-gen)). |

#### Visual matrix (2nd-gen)

**N/A.** `swc-grid` is a layout/virtualization host with no Spectrum visual variants and no S2 Figma. Baseline metrics carry the 1st-gen defaults (`itemSize` `{ width: 200, height: 200 }`, `gap` `0`); revisit token-based defaults and waterfall when CardView specifies ([C6](#decision-log)).

#### Slots (2nd-gen)

A single default `<slot>` in the shadow root projects the virtualizer-rendered items, which live in **light DOM** ([C3](#decision-log)). Items are supplied via `items` + `renderItem`, not author slotting; the slot is internal plumbing, not a consumer authoring surface.

#### CSS custom properties (2nd-gen)

No `--mod-*` properties will be exposed. New `--swc-*` component-level properties may be introduced where needed (for example a small set for gap/padding/item metrics); these are additive and not breaking. See [Component Custom Property Exposure](../../../02_style-guide/01_css/02_custom-properties.md#component-custom-property-exposure).

Each exposed `--swc-*` property must be documented with a `@cssprop` JSDoc tag on the primary SWC component class.

Initial expectation for Grid is a small reviewed set (likely gap, padding, and item sizing), or none if those stay as typed properties.

### Behavioral semantics

- **Virtualization (Confirmed):** only visible items plus a buffer mount; logical collection size drives ARIA indices. `refresh()` the navigation controller after virtualizer range/`items` changes so roving state stays correct.
- **Selection (Inferred):** <kbd>Space</kbd> toggles selection when `selectionMode` allows it (matches 1st-gen behavior in `grid.test.ts`); wire through the core `live-selection-controller` rather than the 1st-gen capture-listener + `key`-attribute approach.
- **Focus entry (Confirmed):** <kbd>Tab</kbd> enters the grid onto the active cell (roving `tabindex="0"`); the grid container itself is not a focus stop. Preserve the 1st-gen guarantee that focus enters at logical index 0 of the full set, not just mounted nodes, and verify under virtualization.
- **Column count (Confirmed):** derived from container width, `itemSize.width`, and `gap` (see `GridController.measureDirectionLength`); keep this measurement and feed it to `FocusgroupNavigationController`'s grid geometry.

### Accessibility semantics notes (2nd-gen)

The [accessibility migration analysis](./accessibility-migration-analysis.md) is the source of truth. Highlights: prescribed `role="grid"` ([B5](#must-ship--breaking-or-a11y-required)); required accessible name ([B6](#must-ship--breaking-or-a11y-required)); `FocusgroupNavigationController` (`direction: 'grid'`) with the full data-grid key contract ([B7](#must-ship--breaking-or-a11y-required)); virtualization-aware `aria-rowcount`/`aria-colcount` and per-item indices ([B8](#must-ship--breaking-or-a11y-required)); item-level names and `aria-selected` supplied by `renderItem`/`swc-card` ([B9](#must-ship--breaking-or-a11y-required)); loading/empty/action-bar live regions belong to `swc-card-view`, not the grid host ([A5](#additive--ships-when-ready-zero-breakage-for-consumers-already-on-2nd-gen)). The grid owns the container `role="grid"`, name, and row/col counts; `renderItem` / `swc-card` supplies per-item `role="row"` / `role="gridcell"`, name, and `aria-selected` ([C5](#decision-log)).

---

## Architecture: core vs SWC split

> The 1st-gen component is a **reference only** — 2nd-gen is built independently. Neither generation imports from the other.

Follow the [Badge migration reference](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#reference-badge-migration) as the concrete pattern for the core/SWC split.

| Layer    | Path | Contains |
| -------- | ---- | -------- |
| **Core** | `2nd-gen/packages/core/components/grid/` | `Grid.base.ts`, `Grid.types.ts`. Selection state and key logic, `FocusgroupNavigationController` wiring, column-count measurement, `role="grid"` ownership, accessible-name resolution and dev-warning validation, virtualization-aware index bookkeeping. **No rendering.** |
| **SWC**  | `2nd-gen/packages/swc/components/grid/` | `Grid.ts`, `grid.css`, `index.ts`, `swc-grid.ts`, `stories/`, `test/`. The virtualized render (see [C2](#decision-log)), element registration, and styling. |

Planned rendering shape:

- Core owns API normalization, selection/key logic, ARIA/role ownership, and navigation wiring.
- SWC renders the virtualized item list and applies layout CSS.

**Virtualization and the core/SWC split ([C2](#decision-log)):** 1st-gen gets virtualization by **extending `LitVirtualizer`** (a rendering element), which conflicts with the core "no rendering" rule and leaks the virtualizer's whole API ([B3](#must-ship--breaking-or-a11y-required)). **Decided:** the SWC concrete class extends `SpectrumElement` and renders items with the `@lit-labs/virtualizer` **`virtualize` directive** inside `render()`, while the core base stays render-free and holds behavior. This keeps the core/SWC contract clean and lets the grid expose an intentional public surface. The directive ships in `@lit-labs/virtualizer` 2.0.12 (1st-gen already imports from `virtualize.js`).

**Item DOM model ([C3](#decision-log)):** **Decided:** items render in **light DOM** (virtualizer output projected via a shadow `<slot>`, mirroring 1st-gen); `focusableSelector` queries light-DOM children. Rationale: consumer-supplied item components (for example `swc-card` with slots and nested overlays) belong in light DOM for theming, and this avoids the cross-root ARIA problems the a11y analysis warns about (light-DOM IDREFs not resolving to virtualized cells). The grid host still owns `role="grid"`, name, indices, and navigation.

---

## Migration checklist

### Preparation (this ticket)

- [x] 1st-gen API surface documented
- [x] Dependencies identified
- [x] Breaking changes documented
- [x] 2nd-gen API decisions drafted
- [ ] Plan reviewed by at least one other engineer

### Setup

- [ ] Create `2nd-gen/packages/core/components/grid/` (`Grid.base.ts`, `Grid.types.ts`, `index.ts`)
- [ ] Create `2nd-gen/packages/swc/components/grid/` (`Grid.ts`, `grid.css`, `index.ts`, `swc-grid.ts`, `stories/`, `test/`)
- [ ] Add `@lit-labs/virtualizer` and `@lit-labs/observers` as 2nd-gen SWC dependencies
- [ ] Wire exports in both `package.json` files (`./components/grid/swc-grid.js` side-effect entry)
- [ ] Implement the render with the `@lit-labs/virtualizer` `virtualize` directive (core base render-free), per [C2](#decision-log)
- [ ] Ensure `swc-grid` does not register or collide with `lit-virtualizer` on the global registry (1st-gen has a test guarding this)

### API

#### Naming and public surface

- [ ] `Grid.types.ts`: define `Key`, `SelectionMode`, item generic, and layout enum
- [ ] `Grid.base.ts`: selection state (`selectionMode`, `selectedKeys`, `keyFunction`), navigation wiring, role/name ownership, column-count measurement
- [ ] Implement the CardView-aligned selection API (`selectionMode`, `selectedKeys`, `keyFunction`, `change` event), per [C4](#decision-log)

#### Alignment checks

- [ ] Validate selection / loading / empty-state API against React Spectrum CardView so `swc-card-view` can adopt without a reshape
- [ ] No S2 Figma; baseline uses 1st-gen metric defaults ([C6](#decision-log)); revisit with design when CardView specifies

### Styling

> Follow the [CSS style guide](../../../02_style-guide/01_css/) as the source of truth for all styling work.

- [ ] Port the minimal host styling (`contain`, `display`, `position`, pointer-events) and the layout math; there is no Spectrum CSS source for grid, so styling is layout-only
- [ ] Replace hard-coded lengths with Spectrum spacing tokens where a default is specified by design
- [ ] Add `@cssprop` JSDoc for any exposed `--swc-*` property
- [ ] Pass stylelint (property order, `no-descending-specificity`, token validation)

### Accessibility

<!-- Sourced from accessibility-migration-analysis.md (prerequisite, present). -->

#### Naming and semantics

- [ ] Prescribe `role="grid"` on the host; not author-overridable ([B5](#must-ship--breaking-or-a11y-required))
- [ ] Require an accessible name (`accessible-label` / `aria-labelledby`) with a dev warning when missing ([B6](#must-ship--breaking-or-a11y-required))
- [ ] Manage `aria-rowcount` / `aria-colcount` and per-item `aria-rowindex` / `aria-colindex` from logical size ([B8](#must-ship--breaking-or-a11y-required))
- [ ] Grid owns container role/name/counts; `renderItem` / `swc-card` supplies per-item `role="row"` / `role="gridcell"`, name, and `aria-selected` ([C5](#decision-log), [B9](#must-ship--breaking-or-a11y-required))
- [ ] Use the shared `core/utils` validation helpers with `{ type: 'accessibility' }` for name/label checks

#### State verification

- [ ] `FocusgroupNavigationController` (`direction: 'grid'`) with `skipDisabled`; `refresh()` on virtualizer range / `items` changes ([B7](#must-ship--breaking-or-a11y-required))
- [ ] Keyboard: <kbd>Arrow</kbd> keys, <kbd>Home</kbd> / <kbd>End</kbd>, <kbd>Ctrl</kbd> + <kbd>Home</kbd> / <kbd>Ctrl</kbd> + <kbd>End</kbd>, and <kbd>Page Up</kbd> / <kbd>Page Down</kbd> when scrollable
- [ ] Selection: `aria-multiselectable` when `selectionMode` is `multiple`; `aria-selected` on cell/row; <kbd>Space</kbd> toggles
- [ ] Fix and un-skip the 1st-gen tab-in/out focus test behavior

### Testing

- [ ] Port applicable coverage from [`grid.test.ts`](../../../../1st-gen/tools/grid/test/grid.test.ts) (roving navigation, selection, focus entry, no global `lit-virtualizer` registration)
- [ ] Add Playwright `grid.a11y.spec.ts` with `toMatchAriaSnapshot` (grid + name, row/gridcell roles, multiselectable, selected)
- [ ] Add dev-warning fires/does-not-fire test pair for the required accessible name

#### Behavior

- [ ] Virtualized list (100+ items) keeps stable `aria-rowindex` and coherent focus after scroll
- [ ] Column count recomputes on container resize

#### Visual regression

- [ ] Add VRT coverage for grid vs waterfall layout, gap/padding, and dense long-list rendering (layout-only; grid has no Spectrum visual variants)

### Documentation

#### General

- [ ] JSDoc on all public props, slots, events, and `--swc-*` custom properties
- [ ] Storybook stories: labeled grid, 2D arrow navigation, selection, virtualized long list; link the keyboard and screen-reader testing guides
- [ ] Correct the `selected` vs `selectedItems` naming (1st-gen README error) in 2nd-gen docs

#### Breaking changes

- [ ] Author a consumer migration guide (tag/package rename, ARIA ownership shift, selection API change) via the `consumer-migration-guide` skill
- [ ] Add 1st-gen `sp-grid` deprecation notices per the tools-vs-packages deprecation process

### Review

- [ ] `yarn lint:2nd-gen` passes (ESLint, Stylelint, Prettier)
- [ ] Status table in workstream doc updated (add a Grid row; it is currently absent)
- [x] `12_tools-vs-packages.md` Grid row updated to reflect the component decision ([C1](#decision-log))
- [ ] PR created with description referencing [Epic SWC-1968](https://jira.corp.adobe.com/browse/SWC-1968)
- [ ] Peer engineer sign-off

---

## Blockers and open questions

No blocking questions remain for the core migration. All drafting-time open questions (Q1–Q8) were resolved on 2026-09-16 and folded into the [Decision log](#decision-log) (C1–C7); Q9 (Jira triage) is complete (see [Open gen1 issues](#open-gen1-issues)). The items below are deferred additive scope.

### Deferred items (to file under Epic SWC-1968, label `deferred`)

| Ticket | Deferred item | Why deferred | Related plan section |
| ------ | ------------- | ------------ | -------------------- |
| _to file_ | Waterfall layout mode (A1) | Not needed for the baseline uniform grid; CardView-driven | [Additive](#additive--ships-when-ready-zero-breakage-for-consumers-already-on-2nd-gen) |
| _to file_ | `pageStep` + typeahead (A2) | Enable for large scrolling collections | [Additive](#additive--ships-when-ready-zero-breakage-for-consumers-already-on-2nd-gen) |
| _to file_ | `disabledKeys` + `skipDisabled` (A3) | Additive over baseline selection | [Additive](#additive--ships-when-ready-zero-breakage-for-consumers-already-on-2nd-gen) |
| _to file_ | Drag-and-drop reordering (A4) | Backed by core `drag-and-drop-controller`; outside baseline | [Additive](#additive--ships-when-ready-zero-breakage-for-consumers-already-on-2nd-gen) |
| _to file_ | Loading / empty-state / bulk action-bar (A5) | Belongs to `swc-card-view`, not the grid host | [Additive](#additive--ships-when-ready-zero-breakage-for-consumers-already-on-2nd-gen) |

---

## Decision log

| Ref | Decision | Rationale / context |
| --- | -------- | ------------------- |
| **C1** | Migrate Grid as a **full standalone `swc-grid` component** (core + SWC), following the Grid analysis docs, rather than reclassifying to CSS layout utilities. | Team decision on 2026-09-16. Two repo sources conflicted: [`12_tools-vs-packages.md`](../../../01_contributor-guides/12_tools-vs-packages.md) (2026-06-12) said reclassify Grid to CSS utilities and "do not migrate 1:1"; the [grid analysis docs](./accessibility-migration-analysis.md) (2026-05-21) plan a full `swc-grid` component. The accessible `role="grid"` + roving-tabindex + virtualization contract cannot be met by CSS utilities alone. Follow-up (done 2026-09-16): the tools-vs-packages guide Grid row was updated to match. |
| **C2** | Virtualization composes via the `@lit-labs/virtualizer` **`virtualize` directive** used inside the SWC concrete class (extends `SpectrumElement`); the core base is **render-free**. | Resolves the tension that 1st-gen extends `LitVirtualizer` (a rendering element), which breaks the core "no rendering" rule and leaks the virtualizer's whole API (B3). The directive ships in `@lit-labs/virtualizer` 2.0.12; 1st-gen already imports from `virtualize.js`. Analysis docs are silent on core/SWC mechanics; agent recommendation, user-authorized 2026-09-16. |
| **C3** | Items render in **light DOM** (virtualizer output projected via a shadow `<slot>`, mirroring 1st-gen); `focusableSelector` (attribute `focusable-selector`) queries light-DOM children. | Consumer-supplied item components (`swc-card` with slots and nested overlays) belong in light DOM for theming, and this avoids the cross-root ARIA problems the [a11y analysis](./accessibility-migration-analysis.md) warns about; matches its "slotted cards" language. Agent recommendation, user-authorized 2026-09-16. |
| **C4** | Selection API aligns to [React Spectrum CardView](https://react-spectrum.adobe.com/CardView): `selectionMode` (`none`/`single`/`multiple`), `selectedKeys` (`Set<Key>`), `keyFunction` for stable identity, and a `change` event carrying `selectedKeys`; `disabledKeys` is additive (A3). | Replaces the 1st-gen item-object `selected` array and fragile `key`-attribute lookup. Source priority puts the React implementation first. Names confirmed against CardView; agent recommendation, user-authorized 2026-09-16. |
| **C5** | `swc-grid` owns the container `role="grid"`, accessible name, `aria-rowcount` / `aria-colcount`, and roving/navigation; `renderItem` / `swc-card` supplies per-item `role="row"` / `role="gridcell"`, name, and `aria-selected`. The grid does not auto-wrap items; it documents the contract and dev-warns when a name is missing. | Directly from the [a11y analysis](./accessibility-migration-analysis.md) "Accessibility tree expectations" and "renderItem / slotted cards must supply row / gridcell / name / selected." |
| **C6** | No S2 Figma. Baseline carries 1st-gen metric defaults (`itemSize` `{ width: 200, height: 200 }`, `gap` `0`, `padding` falls back to `gap`); no invented Spectrum token defaults. Waterfall is additive (A1). | Revisit token-based defaults when `swc-card-view` / CardView specifies layout metrics. Analysis docs state metrics come from CardView "when available"; agent call for the baseline, user-authorized 2026-09-16. |
| **C7** | `swc-card-view` is a **separate, later** migration; `swc-grid` ships first as its foundation, with its selection / loading / empty-state API validated against React Spectrum CardView so card-view adopts it without a reshape. | `swc-card-view` does not exist in 2nd-gen yet and is the primary consumer. Agent recommendation, user-authorized 2026-09-16. |

---

## References

- [Grid accessibility migration analysis](./accessibility-migration-analysis.md)
- [Grid rendering and styling migration analysis (roadmap)](./rendering-and-styling-migration-analysis.md)
- [Washing machine workflow](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md)
- [2nd-gen migration status table](../../02_workstreams/02_2nd-gen-component-migration/01_status.md)
- [Tools vs packages: where code lives](../../../01_contributor-guides/12_tools-vs-packages.md)
- [Focus management (FocusgroupNavigationController)](../../../01_contributor-guides/14_focus-management.md)
- [2nd-gen shared resources](../../../01_contributor-guides/16_2nd-gen-shared-resources.md)
- [`FocusgroupNavigationController` (2nd-gen core)](../../../../2nd-gen/packages/core/controllers/focusgroup-navigation-controller/)
- [1st-gen `sp-grid` source (`Grid.ts`)](../../../../1st-gen/tools/grid/src/Grid.ts)
- [1st-gen `GridController.ts`](../../../../1st-gen/tools/grid/src/GridController.ts)
- [1st-gen `grid.test.ts`](../../../../1st-gen/tools/grid/test/grid.test.ts)
- [1st-gen `grid.stories.ts`](../../../../1st-gen/tools/grid/stories/grid.stories.ts)
- [1st-gen `sp-grid` README](../../../../1st-gen/tools/grid/README.md)
- [React Spectrum: CardView](https://react-spectrum.adobe.com/CardView)
- [CSS style guide — Component Custom Property Exposure](../../../02_style-guide/01_css/02_custom-properties.md#component-custom-property-exposure)
- [Badge migration reference](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#reference-badge-migration)
- Epic: [SWC-1968](https://jira.corp.adobe.com/browse/SWC-1968) (grid migration epic)
