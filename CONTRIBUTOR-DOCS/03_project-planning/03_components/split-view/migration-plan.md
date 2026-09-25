<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Split View / Split view migration plan

<!-- Document title (editable) -->

# Split view migration plan

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

> **Epic [SWC-2263](https://jira.corp.adobe.com/browse/SWC-2263)** · Planning output. Must be reviewed before implementation begins.
>
> Copy this template into `CONTRIBUTOR-DOCS/03_project-planning/03_components/split-view/migration-plan.md` before editing so the relative links, breadcrumbs, and generated sections resolve correctly.
>
> This plan should provide recommendations, not just observations. Call out inconsistencies, propose better API or naming paths where appropriate, and make unresolved tradeoffs explicit for reviewers.

---

## TL;DR

- Split view is a **unique component with no React Spectrum S2 equivalent and no Figma `S2 / Web` component frame** (confirmed by requester). It also has no gen2 shared base to extend from and nothing else in gen2 currently depends on it — it can proceed as a standalone migration.
- **Confirms the ticket's framing:** `spectrum-css` (`spectrum-two` branch) has a `splitview` component (`components/splitview/`), but its Storybook metadata tags it `"unmigrated"` — the CSS is the 1st-gen visual spec re-pointed at S2 token names, not a redesigned S2 visual. This matches the ticket's own prediction that the work is close to "updating to S2 colours." Treat it as the interim structural/token baseline. See `B4`/`Q1`. The internal design-guidance page (`Q8` in the [Decision log](#decision-log)) is a 2020, pre-S2 stub with no defined behaviors — consistent with "no design specs."
- 1st-gen's API surface (`vertical`, `resizable`, `collapsible`, `primary-min/max`, `primary-size`, `secondary-min/max`, `splitter-pos`, `label`, `change` event) is small, coherent, and has no RSP/Figma source to reconcile against — recommend carrying it forward close to as-is, with the accessibility gaps below layered in.
- **Accessibility is must-ship** per the existing [accessibility migration analysis](./accessibility-migration-analysis.md): `aria-valuemin`/`aria-valuemax`, a confirmed `aria-orientation` convention, and `aria-controls` moved onto the element-reference IDL pattern (`ariaControlsElements`, precedented on `Popover.base.ts`). See `B5`–`B7`.
- Pointer-drag/keyboard event handling and the `label` naming question are resolved via gen2 precedent — see `Q2`, `Q5`, `Q6` in the [Decision log](#decision-log).
- No gen1 issues are currently tracked for this component (confirmed by requester); no breaking-change tickets exist yet — breaking-change scope should be derived from the API/accessibility diff in this plan.

### Most blocking open questions

- **Q3** in [Architecture and behavior](#architecture-and-behavior): confirm the `aria-orientation` convention against real assistive technology before finalizing `B6`.
- **Q4** in [Architecture and behavior](#architecture-and-behavior): whether the element-reference `aria-controls` relationship (`B7`, mechanism confirmed via `Popover.base.ts`'s `ariaControlsElements`) should reference only the primary pane (matching 1st-gen) or both panes — a scope-only decision now, not an implementation-risk question.

---

## 1st-gen API surface

**Source:** [`1st-gen/packages/split-view/src/SplitView.ts`](../../../../1st-gen/packages/split-view/src/SplitView.ts)
**Version:** `@spectrum-web-components/split-view` (see `1st-gen/packages/split-view/package.json`)
**Custom element tag:** `sp-split-view`

### Properties / attributes

| Property | Type | Default | Attribute | Notes |
| -------- | ---- | ------- | --------- | ----- |
| `vertical` | `boolean` | `false` | `vertical`, reflected | Stacks panes top/bottom instead of side by side. |
| `resizable` | `boolean` | `false` | `resizable`, reflected | Makes the splitter draggable and keyboard-focusable. |
| `collapsible` | `boolean` | `false` | `collapsible`, reflected | Requires `resizable`. Ignores primary/secondary min/max at the collapse extremes. |
| `primaryMin` | `number` | `0` | `primary-min` | Minimum size of the primary (first) pane. |
| `primaryMax` | `number` | `3840` (`DEFAULT_MAX_SIZE`) | `primary-max` | Maximum size of the primary pane. |
| `primarySize` | `string \| undefined` | `undefined` | `primary-size` | Starting size: pixel number/string, percentage, or `"auto"`. |
| `secondaryMin` | `number` | `0` | `secondary-min` | Minimum size of the secondary (second) pane. |
| `secondaryMax` | `number` | `3840` (`DEFAULT_MAX_SIZE`) | `secondary-max` | Maximum size of the secondary pane. |
| `splitterPos` | `number \| undefined` | `undefined` | `splitter-pos`, reflected | Current splitter position in pixels; author- and program-settable. |
| `label` | `string \| undefined` | `undefined` | `label` | Sets `aria-label` on the splitter. Defaults to `"Resize the panels"` when `resizable` and unset ([SWC-276](https://jira.corp.adobe.com/browse/SWC-276) fix). See naming question `Q2`. |
| `controlledEl` | `HTMLElement \| undefined` | `undefined` | — (`@state`, private-ish) | First slotted child; internal, not part of the public contract. |
| `firstPaneSize` | `string` | `'auto'` | — (private) | Internal render-only state driving the `--spectrum-split-view-first-pane-size` CSS variable. |
| `enoughChildren` | `boolean` | `false` | — (private) | Whether \>1 child is slotted; gates whether the splitter renders at all. |
| `viewSize` | `number` | `0` | — (private) | Cached host size along the resize axis. |

### Methods

None public. All resize/position math (`updateMinMax`, `updatePosition`, `getLimitedPosition`, `calcStartPos`, `getOffset`, `getPosition`) is private.

### Events

| Event | Detail | Fires when |
| ----- | ------ | ----------- |
| `change` | none (plain, bubbling, composed `Event`) | The splitter position changes via pointer drag or keyboard, including collapse to an extreme. |

### Slots

| Slot | Content | Notes |
| ---- | ------- | ----- |
| default (unnamed) | Exactly two direct child elements: primary (first) and secondary (second) pane. | Additional children beyond the first two are hidden via CSS (`::slotted(:nth-child(n + 3)) { display: none; }`), not removed from the DOM. A single child renders with no splitter at all (`enoughChildren` gate). |

### CSS custom properties

1st-gen exposes a small overridable surface via `split-view-overrides.css`, which re-points 1st-gen tokens at "system" tokens:

- `--spectrum-splitview-background-color`
- `--spectrum-splitview-handle-background-color`
- `--spectrum-splitview-gripper-border-radius`
- `--spectrum-split-view-first-pane-size` — internal render-driven variable (not meant for author use), set inline on the `<slot>` per render.

This full modifier surface will not be carried forward to gen2. See [CSS custom properties (gen2)](#css-custom-properties-gen2).

### Shadow DOM output (rendered HTML)

Non-resizable, \>1 child (splitter renders, but no interactivity):

```html
<slot style="--spectrum-split-view-first-pane-size: 240px"></slot>
<div id="splitter" role="separator" aria-orientation="vertical" aria-valuenow="50"></div>
```

Resizable, horizontal, with default label:

```html
<slot id="sp-split-view-xxxxx" style="--spectrum-split-view-first-pane-size: 240px"></slot>
<div
  id="splitter"
  class="is-resized-start"
  role="separator"
  aria-controls="sp-split-view-xxxxx"
  aria-label="Resize the panels"
  aria-orientation="vertical"
  aria-valuenow="50"
  tabindex="0"
>
  <div id="gripper"></div>
</div>
```

Single child (no splitter rendered at all):

```html
<slot></slot>
```

---

## Dependencies

| Package | Version | Role |
| ------- | ------- | ---- |
| `@spectrum-web-components/base` | workspace | `SpectrumElement`, `property`/`query`/`state` decorators, `classMap`/`ifDefined` directives, `streamingListener` (pointer drag lifecycle helper). |
| `@spectrum-web-components/shared` | workspace | `randomID()` — generates the id assigned to the primary pane so `aria-controls` has a target. |
| `lit` (via `@spectrum-web-components/base`) | workspace | `html`, `nothing`, `PropertyValues`, `TemplateResult`, `LitElement` typing (for checking `updateComplete` on a slotted `LitElement` child in `calcStartPos`). |
| Native `ResizeObserver` | browser | Recomputes min/max on host resize; 1st-gen defensively types this via `WithSWCResizeObserver`/`SWCResizeObserver` in `types.ts` rather than assuming a global type — gen2 should use the standard DOM lib type instead, since gen2's baseline browser support no longer needs the custom fallback typing (see `Q` in Architecture, this is a minor cleanup, not a behavior change). |

No 1st-gen shared base class, mixin, or reactive controller is used beyond `SpectrumElement` itself.

---

## Open gen1 issues

Confirmed with the ticket requester: **no gen1 (`sp-*`) issues are currently tracked** for split-view outside of the accessibility fix already captured in the [accessibility migration analysis](./accessibility-migration-analysis.md#related-1st-gen-accessibility-jira) ([SWC-276](https://jira.corp.adobe.com/browse/SWC-276), already `Done` and excluded from this table by the `a11y`-adjacent exclusion rule).

| Jira | Type | Status (snapshot) | Summary |
| ---- | ---- | ----------------- | ------- |

## Migration sequencing and prerequisites

### Dependency-aware recommendation

Proceed independently. Split view has no gen2 shared base to extend from, and no other gen2 component or in-flight migration currently depends on it. This is consistent with the ticket's own note calling it "a unique component for C&P."

The one shared-resource question worth flagging: pointer-drag + keyboard-resize logic (`updateMinMax`/`updatePosition`/`getLimitedPosition`/`calcStartPos`, plus the `streamingListener` pointer lifecycle helper) has no shared cross-component controller in `gen2/packages/core` today (checked the [gen2 shared resources index](../../../01_contributor-guides/16_gen2-shared-resources.md) — no drag/resize/range controller exists). `color-handle`'s `ColorHandleBase` is the closest precedent: it owns its pointer-event listeners directly in `core`, not in a shared controller. Split-view follows the same shape — drag/keyboard logic and math together in `core/components/split-view/SplitView.base.ts`. See [Architecture](#architecture-core-vs-swc-split) and `Q5`/`Q6` in the [Decision log](#decision-log). No shared controller extraction in this migration — no second consumer exists to validate an API shape against.

### Related components and ordering notes

- [Divider](../divider/accessibility-migration-analysis.md) is the closest accessibility analogue (both use `role="separator"`), but divider's separator is always static/non-interactive, so there is no shared-base opportunity there — divider never needs `aria-valuenow`/focusability.
- No `_lit-styles/` fragment currently matches split view's structure (checked `gen2/packages/swc/stylesheets/_lit-styles/`: `card-template.css`, `icon-base.css`, `linear-progress-base.css`, `opacity-checkerboard.css`, `pending-spinner.css`, `visually-hidden.css` — none apply). No shared render template applies either (checked for a `card-template.ts`-style shared anatomy file; split view's two-pane-plus-splitter structure is not shared with any other planned or in-flight component). Nothing to extract before or alongside this migration.
- No `global-split-view.css` counterpart is expected; split view is a layout primitive, not a themed leaf element in the sense the [global element styles](../../../02_style-guide/01_css/07_stylesheets.md#global-element-styles-global) pattern targets. Mark **N/A**, revisit only if a concrete consumer need surfaces later.

### User confirmation needed

- Confirmed standalone/no-dependency status (no other planned migration references split view, no shared base to extend). No open item here.
- Not yet confirmed: whether the drag/resize calculation logic should live in `core/components/split-view/` as proposed, versus directly inside the SWC element. See `Q5` in [Architecture and behavior](#architecture-and-behavior).

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

| #   | What changes | 1st-gen behavior | gen2 behavior | Consumer migration path |
| --- | ------------ | ---------------- | ------------- | ----------------------- |
| **B1** | Keep the full property set (`vertical`, `resizable`, `collapsible`, `primary-min/max`, `primary-size`, `secondary-min/max`, `splitter-pos`, `label`) as-is, kebab-case attributes unchanged. | Same set. | Same set. | No change for consumers; not a breaking change. Recorded here because it is the baseline the rest of this table diffs against. |
| **B2** | `label` behavior carried forward unchanged, see `Q2` in the [Decision log](#decision-log). | `label` string sets `aria-label` on the internal splitter. | Same behavior, same property name; no rename. | None — no breaking change. |
| **B3** | Replace the internal `WithSWCResizeObserver`/`SWCResizeObserver` custom typings in `types.ts` with the standard DOM `ResizeObserver` type. | Custom fallback typing, likely written for older TS lib support. | Use `ResizeObserver` directly from `lib.dom.d.ts`. | Internal-only; no consumer-facing change. |

#### Styling and visuals

| #   | What changes | 1st-gen behavior | gen2 behavior | Consumer migration path |
| --- | ------------ | ---------------- | ------------- | ----------------------- |
| **B4** | Adopt `spectrum-css` `splitview` (`spectrum-two` branch) structural classes/tokens as the styling baseline, **with the caveat that this CSS is tagged `"unmigrated"`** (no confirmed S2 visual redesign exists yet). See `Q1`. | 1st-gen bespoke CSS (`split-view.css`, `spectrum-split-view.css`, `split-view-overrides.css`) mapped to "system" tokens. | `--swc-*` custom properties per gen2 convention (background, handle/gripper color, gripper radius); `forced-colors` support carried forward from the spectrum-css source. | Visual-only; author-facing `--mod-*` properties are dropped per standard gen2 policy (see [Must ship](#must-ship--breaking-or-a11y-required) framing above and [CSS custom properties (gen2)](#css-custom-properties-gen2)). |

#### Accessibility and behavior

| #   | What changes | 1st-gen behavior | gen2 behavior | Consumer migration path |
| --- | ------------ | ---------------- | ------------- | ----------------------- |
| **B5** | Add `aria-valuemin="0"` / `aria-valuemax="100"` alongside the existing `aria-valuenow` whenever `resizable`. | `aria-valuenow` only. | `aria-valuemin`/`aria-valuemax` always paired with `aria-valuenow`. | None; additive attribute, not observable as an API change. |
| **B6** | Confirm and document the `aria-orientation` convention (line orientation vs. axis of motion) against real screen reader output; keep or correct the mapping per that finding. | Sets `aria-orientation` to describe the divider **line's** visual orientation. | Same, unless manual AT testing during the accessibility phase indicates the mapping should invert. | None if unchanged; if inverted, this is a behavior correction, not an author-facing API change. |
| **B7** | Move `aria-controls` off a plain ID string crossing the shadow boundary onto the project's element-reference IDL pattern (`ariaControlsElements`), per the accessibility migration analysis, reusing the shape from `Popover.base.ts`. Scope (primary pane only vs. both) remains open, see `Q4`. | `aria-controls="<id>"` referencing a light-DOM child's `id`, assigned by the component itself. | Element-reference IDL property in addition to (or instead of) the ID string. | None for consumers using the public attribute/property surface; internal wiring change only. |
| **B8** | Preserve the [SWC-276](https://jira.corp.adobe.com/browse/SWC-276) fix: default `aria-label` ("Resize the panels") whenever `resizable` and no `label` is set. Never ship a focusable, unnamed divider. | Fixed in 1st-gen. | Same behavior, unit-tested as a regression guard. | None. |
| **B9** | Preserve the full keyboard map (Arrow keys, Page Up/Down, Home, End, Tab/Shift+Tab; RTL- and `vertical`-aware) and the pointer-drag resize/collapse behavior 1:1, including nested split views (each divider is an independent tab stop). | Implemented via `streamingListener` + private math methods. | Same behavior; math logic re-homed into `core/components/split-view/` per the [Architecture](#architecture-core-vs-swc-split) recommendation. | None; purely internal architecture. |

### Additive — ships when ready, zero breakage for consumers already on gen2

| #   | What is added | Notes |
| --- | ------------- | ----- |
| **A1** | Localized `aria-valuetext` (e.g. "62% — First panel") instead of a bare percentage, including a distinct collapsed-state phrasing (e.g. "0% — First panel (collapsed)"). | Recommended by the accessibility migration analysis as an enhancement, not a gap in the current 1st-gen contract. |
| **A2** | <kbd>Enter</kbd> key binding to toggle the primary pane's collapsed state directly (parity with some external implementations, e.g. Nord Health's resizable handle). | 1st-gen has no such binding; purely additive, no regression risk. |
| **A3** | Expand `aria-controls` (or its element-reference IDL equivalent) to reference **both** panes instead of only the primary one. | The accessibility migration analysis flags this as worth considering since dragging affects both panes' sizes, not only the primary one. |
| **A4** | Promote the drag/resize calculation logic to a shared, cross-component core controller. | Deferred until a second real consumer exists; premature now (see [Migration sequencing and prerequisites](#migration-sequencing-and-prerequisites)). |

---

## gen2 API decisions

These are derived from the 1st-gen implementation and the `spectrum-css` `splitview` (`spectrum-two`) source, since split view has no Figma `S2 / Web` component frame and no React Spectrum S2 implementation. Confirmed items are marked; open items are tracked in [Blockers and open questions](#blockers-and-open-questions).

Use lightweight confidence labels where helpful:

- **Confirmed**: directly supported by source material
- **Inferred**: recommended based on multiple signals, but not explicitly specified in one authoritative source
- **Open question**: unresolved and needs review or more input

### Public API

#### Properties / attributes (gen2)

| Property | Type | Default | Attribute | Notes |
| -------- | ---- | ------- | --------- | ----- |
| `vertical` | `boolean` | `false` | `vertical`, reflected | **Confirmed.** Unchanged from 1st-gen. |
| `resizable` | `boolean` | `false` | `resizable`, reflected | **Confirmed.** Unchanged from 1st-gen. |
| `collapsible` | `boolean` | `false` | `collapsible`, reflected | **Confirmed.** Unchanged from 1st-gen; still requires `resizable`. |
| `primaryMin` / `primaryMax` | `number` | `0` / `3840` | `primary-min` / `primary-max` | **Confirmed.** Unchanged from 1st-gen. |
| `primarySize` | `string \| undefined` | `undefined` | `primary-size` | **Confirmed.** Unchanged from 1st-gen (pixel/percentage/`"auto"`). |
| `secondaryMin` / `secondaryMax` | `number` | `0` / `3840` | `secondary-min` / `secondary-max` | **Confirmed.** Unchanged from 1st-gen. |
| `splitterPos` | `number \| undefined` | `undefined` | `splitter-pos`, reflected | **Confirmed.** Unchanged from 1st-gen. |
| `label` (name **open**, see `Q2`) | `string \| undefined` | `undefined` | `label` (or renamed, e.g. `resize-label`) | **Open question.** Behavior (default `"Resize the panels"` accessible name, override via this property) is confirmed; the property **name** is not. |

#### Visual matrix (gen2)

**N/A.** Split view has no color/fill/variant family — its only visual axes are `orientation` (`horizontal`/`vertical`, via `vertical`) and interaction state classes (`is-resized-start/end`, `is-collapsed-start/end`, hover/active/focus-visible) driven by the splitter's own state, not an author-facing variant property. There is no Figma component frame and no RSP implementation to cross-check a variant matrix against (confirmed by requester); the only visual source is the `spectrum-css` `splitview` component, itself tagged `"unmigrated"` (see `Q1`).

#### Slots (gen2)

| Slot | Content | Notes |
| ---- | ------- | ----- |
| default | Exactly two child elements: primary (first) and secondary (second) pane. | **Confirmed.** Unchanged from 1st-gen. Third-and-beyond children remain hidden via CSS, not removed, matching 1st-gen. |

#### CSS custom properties (gen2)

No `--mod-*` properties will be exposed. New `--swc-*` component-level properties may be introduced where needed — these are additive and not breaking. See [Component Custom Property Exposure](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#component-custom-property-exposure) for what to expose and how.

Each exposed `--swc-*` property must be documented with a `@cssprop` JSDoc tag on the primary SWC component class. Storybook picks these up and surfaces them in the API docs panel automatically.

Initial expectation for Split View is a small reviewed set, likely limited to splitter/handle background color, gripper color, and gripper border radius (mirroring the three properties `spectrum-css` and 1st-gen already expose today). Exact names are a styling-phase decision, not finalized here.

### Behavioral semantics

- **Two-pane-only slotting.** Only the first two slotted children are laid out; anything beyond that is hidden via `::slotted(:nth-child(n + 3))`, not removed from the DOM. Preserve this rather than throwing or truncating, to avoid a breaking change for any consumer currently (perhaps unintentionally) relying on it.
- **`resizable`/`collapsible` coupling.** `collapsible` has no effect unless `resizable` is also set. Preserve this dependency; do not make `collapsible` independently meaningful as part of this migration (would be a scope-expanding behavior change, not a like-for-like port).
- **Nested split views.** Each `sp-split-view` (or its gen2 equivalent) instance manages its own splitter and tab stop independently; nesting one inside a pane of another is supported today purely through normal slot composition, with no special-cased code. Confirm this composition still works unmodified once the render moves to the `spectrum-css`-based class structure.
- **`primarySize: "auto"` timing.** 1st-gen's `calcStartPos()` awaits a slotted `LitElement` child's `updateComplete` before measuring, to avoid racing a Lit child's own first render. Preserve this await; dropping it would reintroduce a layout race that 1st-gen already fixed.
- **RTL awareness.** Pointer offset calculation and Arrow-key direction both branch on `this.dir` / `getComputedStyle(this).direction`. Preserve both branches; this is exercised directly by 1st-gen's RTL-specific tests (`test/split-view.test.ts`).
- **New logic, not a reused controller.** The pointer-drag lifecycle (`streamingListener`) and all position/collapse math are genuinely new work in gen2 — there is no existing core controller for this. See the recommendation in [Migration sequencing and prerequisites](#migration-sequencing-and-prerequisites) and `Q5`/`Q6` below.

### Accessibility semantics notes (gen2)

See the [accessibility migration analysis](./accessibility-migration-analysis.md) for the full rationale; must-ship items are folded into `B5`–`B9` above. In summary for gen2:

- Non-resizable: `role="separator"`, no name, no value attributes, not focusable.
- Resizable: `role="separator"` behaving as a range widget — `tabindex="0"`, a name (default or `label`-equivalent), `aria-valuenow`/`aria-valuemin`/`aria-valuemax`, `aria-orientation` (convention to be confirmed against real screen readers, `Q3` — not just carried over unexamined), and an `aria-controls` relationship wired through the element-reference IDL pattern rather than a plain cross-shadow-boundary ID string (`B7`).

---

## Architecture: core vs SWC split

> The 1st-gen component is a **reference only** — gen2 is built independently. Neither generation imports from the other.

Follow the [Badge migration reference](../../02_workstreams/02_gen2-component-migration/02_step-by-step/01_washing-machine-workflow.md#reference-badge-migration) for the core/SWC split, and [`color-handle`](../color-handle/migration-plan.md#architecture-core-vs-swc-split) as the precedent for an interactive, pointer-driven primitive: `ColorHandleBase` owns its `pointerdown`/`pointerup`/`pointercancel` listeners directly in `core`, with SWC contributing `render()`/CSS only. Core's `AGENTS.md` bars rendering, CSS, and element registration — not event listeners.

<!-- Use the prescribed table format below; do not convert this section to bullets or another schema. -->

| Layer    | Path                                         | Contains                                                                                                                                                                                                                                          |
| -------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Core** | `gen2/packages/core/components/split-view/`  | `SplitView.base.ts`, `SplitView.types.ts`: default/min/max/collapse-threshold constants, position/collapse math (`getLimitedPosition`, `updateMinMax`-equivalent, `calcStartPos`-equivalent), keyboard-direction resolution (RTL/`vertical`-aware), the pointer-drag/keyboard event listeners themselves (mirroring `ColorHandleBase`'s `addEventListener('pointerdown', ...)` pattern), accessible-name default resolution ([SWC-276](https://jira.corp.adobe.com/browse/SWC-276) fix), and `aria-valuenow`/`aria-valuemin`/`aria-valuemax` value computation. No rendering, no CSS, no element registration. |
| **SWC**  | `gen2/packages/swc/components/split-view/`   | `SplitView.ts`, `split-view.css`, element registration, stories, tests. Owns `render()` (the `spectrum-css`-based `<slot>`/splitter/gripper markup), the `@query`-resolved DOM references core needs to attach listeners to, and the element-reference IDL wiring for `aria-controls` (`B7`, same `ariaControlsElements` property as `Popover.base.ts`). |

Planned rendering shape:

- Core owns: API normalization (defaults, min/max/collapse-threshold constants), the pointer-drag and keyboard event listeners, all position/collapse calculation math, and the accessible-name/value-attribute computation.
- SWC renders: the `spectrum-css`-based markup (`.spectrum-SplitView`, `-pane`, `-splitter`, `-gripper` classes) and `ResizeObserver` wiring, and extends core for drag/keyboard/math behavior.

See `Q5`/`Q6` in the [Decision log](#decision-log) for the precedent resolving this split.

---

## Migration checklist

### Preparation (this ticket)

- [ ] 1st-gen API surface documented
- [ ] Dependencies identified
- [ ] Breaking changes documented
- [ ] gen2 API decisions drafted
- [ ] Plan reviewed by at least one other engineer

### Setup

- [ ] Create `gen2/packages/core/components/split-view/`
- [ ] Create `gen2/packages/swc/components/split-view/`
- [ ] Wire exports in both `package.json` files
- [ ] Check out `spectrum-css` at `spectrum-two` branch as sibling directory

### API

#### Naming and public surface

- [ ] `SplitView.types.ts`: define the property/attribute shape from [Properties / attributes (gen2)](#properties--attributes-gen2), including the resolved name for the `label`/`resize-label` property once `Q2` is settled
- [ ] `SplitView.base.ts`: retain `vertical`, `resizable`, `collapsible`, `primaryMin`/`primaryMax`/`primarySize`, `secondaryMin`/`secondaryMax`, `splitterPos`; port the pure position/collapse math and accessible-name/value-attribute resolution described in [Architecture](#architecture-core-vs-swc-split)

#### Alignment checks

- [ ] No Figma component frame exists for split-view (confirmed) — no visual alignment check against Figma is possible; rely on `spectrum-css` `splitview` (`spectrum-two`) as the structural/token reference only, with the caveat in `Q1` that it is not a confirmed S2 visual redesign
- [ ] No React Spectrum implementation exists (confirmed via public GitHub discussion) — no API alignment check against RSP is possible or required


<!-- Callout any alignment verification needed with Figma/Design and/or React. These should also be open questions. -->

### Styling

<!-- These should stay consistent across components; items may be added if addressing unique needs.-->

> Follow the [CSS style guide](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/) as the source of truth for all styling work. Key references: [migration steps](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/04_spectrum-swc-migration.md), [custom properties](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md), [anti-patterns](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/05_anti-patterns.md).

- [ ] Add `.swc-SplitView` to the internal semantic host content in `render()`; keep styling off `:host`
- [ ] Copy S2 source from `spectrum-css` `spectrum-two` branch `components/splitview/index.css` (not `/dist`) into `split-view.css` as baseline, noting the `"unmigrated"` caveat from `Q1`

#### Visual model and regressions

- [ ] Verify `forced-colors: active` handling matches the `spectrum-css` source (handle/gripper color swaps to `CanvasText`/`Highlight`)
- [ ] Add `@cssprop` JSDoc tag to the primary SWC component class for every exposed `--swc-*` property (e.g. `@cssprop --swc-split-view-handle-color - Background color of the splitter handle.`)
- [ ] Pass stylelint (property order, `no-descending-specificity`, token validation)
- [ ] Verify RTL mirroring of cursor styles and collapse-position classes (`is-collapsed-start`/`is-collapsed-end`) carried over correctly, since 1st-gen's CSS branches on `:dir(ltr)`/`:dir(rtl)`

### Accessibility

#### Naming and semantics

- [ ] Non-resizable divider: `role="separator"`, no name, no value attributes, not focusable (`B` baseline, no gap)
- [ ] Resizable divider: `role="separator"`, `tabindex="0"`, name (default `"Resize the panels"` or override), `aria-valuenow` + new `aria-valuemin`/`aria-valuemax` (`B5`), `aria-orientation` (`B6`)
- [ ] Wire `aria-controls` via the element-reference IDL pattern instead of a plain cross-shadow-boundary ID string (`B7`)
- [ ] Preserve the [SWC-276](https://jira.corp.adobe.com/browse/SWC-276) default-name fix as a regression-guarded unit test (`B8`)

#### State verification

- [ ] Manual screen reader pass confirming the actual announced `aria-orientation` convention (`B6`/`Q3`)
- [ ] Manual screen reader pass re-testing the mobile/touch scenario from [SWC-276](https://jira.corp.adobe.com/browse/SWC-276) so it does not resurface
- [ ] Non-text contrast (WCAG 1.4.11) verified for the divider line and gripper in default, hover, focus-visible, and `forced-colors` states
- [ ] Touch/pointer target size for the drag handle confirmed or documented as an accepted exception (WCAG 2.5.8)

### Testing

- [ ] Port `1st-gen/packages/split-view/test/split-view.test.ts` coverage that still applies (see full list of 1st-gen test names in [References](#references))
- [ ] Add Playwright `split-view.a11y.spec.ts` with `toMatchAriaSnapshot` covering non-resizable, resizable, collapsible, vertical, and custom-label stories
- [ ] Run `aXe` (WCAG 2.x rule set) against Storybook stories for default, `resizable`, `collapsible`, `vertical`, and nested split-view cases, per the [accessibility migration analysis](./accessibility-migration-analysis.md#testing)

#### Behavior

- [ ] Pointer-drag resize in `ltr` and `rtl`, horizontal and `vertical`
- [ ] Keyboard resize: Arrow keys, Page Up/Down, Home, End, in `ltr`/`rtl` and horizontal/`vertical`
- [ ] Collapse-to-extreme behavior via drag and via Home/End, horizontal and `vertical`
- [ ] `change` event fires only when `splitterPos` actually changes (not on every pointer move)
- [ ] `primarySize` variants: pixel, percentage, `"auto"` (including the `updateComplete` await for a slotted `LitElement` child)
- [ ] Splitter position is preserved when panes are removed/re-added
- [ ] Single-child case renders no splitter; 3rd-and-beyond children are hidden, not removed
- [ ] Nested split views: each divider is an independent tab stop, no roving-tabindex interference
- [ ] Custom `label` overrides the default accessible name; default name is present whenever `resizable` with no `label` set

#### Visual regression

- [ ] Add VRT coverage for horizontal/`vertical`, `resizable`, `collapsible`, and collapsed-start/collapsed-end states
- [ ] Add focus-visible regression coverage for the splitter's focus-visible state
- [ ] Add `forced-colors: active` coverage mirroring the `spectrum-css` `WithForcedColors` story

### Documentation

#### General

- [ ] JSDoc on all public props (including `@fires change`) and the exposed `--swc-*` CSS custom properties
- [ ] Storybook stories for: default (horizontal), `resizable`, `resizable` + `collapsible`, `vertical` variants of each, and a nested/multi-level example (mirroring 1st-gen's README demos)
- [ ] State plainly (per the [accessibility migration analysis](./accessibility-migration-analysis.md#recommendations-swc-split-view)) that the divider is non-interactive and nameless by default, and becomes a named, focusable, valued widget the moment `resizable` is set — there is no in-between state

#### Breaking changes

- [ ] No `label` rename — `Q2` resolved to keep the property as-is (see [Decision log](#decision-log)); no consumer migration note needed for this item

### Review


<!-- These should be stable across components -->

- [ ] `yarn lint:gen2` passes (ESLint, Stylelint, Prettier)
- [ ] Status table in workstream doc updated
- [ ] PR created with description referencing Epic [SWC-2263](https://jira.corp.adobe.com/browse/SWC-2263)
- [ ] Peer engineer sign-off

---

## Blockers and open questions

During drafting, this section tracks active blockers and open questions. As each item resolves, move it out of these tables: settled **decisions** go to the [Decision log](#decision-log) (with their rationale), and **deferred** items with tickets go to the deferred-ticket table. In the final review-ready plan, these tables should contain only genuinely open items plus the deferred-ticket table.

<!--
Include the sections for clarity according to area of concern for the question.

Owner examples:
- Design + implementation
- Design + accessibility reviewer
- CSS reviewer
- Accessibility reviewer
- Architecture reviewer
- Ticket owner

# Format: **Q#** (sequential across sections, do not start re-numbering under a new section, and do not create per-question anchor links)
-->

<!-- Keep the table structure and columns (`Blocking?`, `Status`, `Owner`). Add rows rather than replacing the schema with prose or a different format. -->
<!-- During drafting, use the tables below for active blockers and open questions. Once an item is settled, move it out per the guidance above: decisions to the Decision log, deferred items to a concise deferred-ticket table in this section. -->

### Design

No open design blockers — see `Q1` in the [Decision log](#decision-log).

### Architecture and behavior

| #   | Item | Blocking? | Status | Owner |
| --- | ---- | --------- | ------ | ----- |
| **Q3** | Confirm the `aria-orientation` convention (line orientation vs. axis of motion) against real assistive technology before finalizing `B6`; do not just carry over the 1st-gen mapping unexamined. | Yes, for a11y sign-off, not for prep | Open — scheduled for accessibility migration phase | Accessibility reviewer |
| **Q4** | Should `aria-controls` (element-reference IDL, `B7`) reference only the primary pane (matching 1st-gen) or both panes (per `A3`, since dragging affects both sizes)? Recommend: primary-only at baseline (matches 1st-gen behavior, avoids scope creep), expand to both under `A3` if reviewers agree it's warranted. | Yes, for finalizing `B7`'s scope | Open — needs accessibility reviewer confirmation | Accessibility reviewer |

### Scope and prerequisites

| #   | Item | Blocking? | Status | Owner |
| --- | ---- | --------- | ------ | ----- |
| **Q7** | Confirm no other gen2 migration depends on split-view and no shared base applies (checked status table, `_lit-styles/` fragments, and shared render templates — none found). | No | Confirmed by evidence above; flagged for reviewer sign-off | Ticket owner |

<!-- Where possible, include the next action in the Item text or Status so reviewers know how to resolve the question. -->
<!-- Final-state deferred-ticket table columns: `Ticket`, `Deferred item`, `Why deferred`, `Related plan section`. -->

**Deferred-ticket table (out-of-scope work to file under the epic):** Not yet created. Per the acceptance criteria, Jira tickets should be filed under [SWC-2263](https://jira.corp.adobe.com/browse/SWC-2263) with the `deferred` label for: `A1` (localized `aria-valuetext`), `A2` (Enter-to-collapse keyboard shortcut), `A3` (dual-pane `aria-controls`), and `A4` (promote drag/resize math to a shared core controller, if/when a second consumer appears). This agent cannot create Jira tickets directly — see [What to provide next](#what-to-provide-next) in the review prompt below.

---

## Decision log

<!--
Historical record of decisions settled during planning and PR review. Keep it so the `Blockers and open questions` tables stay focused on what still needs attention, and so reviewers can trace why a question was closed.

Rules:
- Add a row when an open question or proposed change is settled. Move it here from `Blockers and open questions` (or record a decision made directly in review).
- Retain the item's original `Q`/`B`/`C` identifier in the `Ref` column so inline references elsewhere in the plan still resolve here.
- Only log entries that are genuinely useful as a historical record (course-setting decisions, reversals, and non-obvious rationale). Do not log trivia.
- This is distinct from the deferred-ticket table in `Blockers and open questions`: that table is for deferred/future work with tickets; this log is for decisions that are done.
- Do not scatter inline "Resolved"/"Confirmed" markers through the open-question tables; fold them here instead.
-->

| Ref | Decision | Rationale / context |
| --- | -------- | ------------------- |
| **Q1** | Ship the `spectrum-css` "unmigrated" `splitview` CSS as the interim styling baseline; do not hold for a formal Design review. | No design specs or S2 visual redesign exist for split-view (confirmed by requester and by `Q8`), so there is no design owner to gate on. The ticket's own expectation ("should be as simple as updating to S2 colours") matches this baseline's actual shape (1st-gen visual, S2 token names). Revisit only if Design produces a real S2 visual pass later. |
| **Q2** | Keep the property name `label` as-is; no rename to `resize-label`. | `ProgressCircle.base.ts` (`gen2/packages/core/components/progress-circle/`) already uses `label` as an accessible-name-only property — same shape as split-view's `label`, contradicting the gen2 vocabulary note that `label` always means visible content. Renaming would create inconsistency with `progress-circle`, not resolve it. |
| **Q5** | Pointer-drag and keyboard event listeners live in `core/components/split-view/SplitView.base.ts`, alongside the position/collapse math — not confined to pure, DOM-ref-free logic. | `ColorHandle.base.ts` (`gen2/packages/core/components/color-handle/`) registers `pointerdown`/`pointerup`/`pointercancel` listeners directly in `firstUpdated()`; its [migration plan](../color-handle/migration-plan.md#architecture-core-vs-swc-split) states "Core owns API normalization, pointer/touch state, and the contrast-decision helper." Core's `AGENTS.md` bars rendering/CSS/registration, not event listeners. |
| **Q6** | No shared cross-component controller for pointer-drag resize logic. Author it directly in `SplitView.base.ts`. | Same `color-handle` precedent as `Q5` — interactive components own their pointer logic in their own base class, not a shared `core/controllers/` entry. Revisit only if a second resizable-panel-style consumer emerges. |
| **Q8** | The internal "Drag bars and thumbs" guidelines page (linked from `spectrum-css`'s `splitview` `package.json`) adds no API or behavior guidance. | 2020, pre-S2 Adobe XD stub (`beta` slug) with `defined_behaviors`, `keyboard_interactions`, `usage_guidelines`, and `spectrum_web_components` all `"no"`, and "For Position Only" placeholder sections. Confirms the ticket's "no design specs" framing at the guidance level, despite the separate `spectrum-css` CSS artifact (`Q1`). |

---

## References

- [Washing machine workflow](../../02_workstreams/02_gen2-component-migration/02_step-by-step/01_washing-machine-workflow.md)
- [gen2 migration status table](../../02_workstreams/02_gen2-component-migration/01_status.md)
- [Accessibility migration analysis](./accessibility-migration-analysis.md)
- Rendering and styling migration analysis — **not yet written** for split-view. This plan proceeds directly from `spectrum-css` + 1st-gen per the requester's explicit decision; see the [TL;DR](#tldr) and `Q1`.
- [CSS style guide — Component Custom Property Exposure](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#component-custom-property-exposure)
- [CSS style guide — Selector conventions](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#selector-conventions)
- [1st-gen source](../../../../1st-gen/packages/split-view/src/SplitView.ts)
- [1st-gen types](../../../../1st-gen/packages/split-view/src/types.ts)
- [1st-gen tests](../../../../1st-gen/packages/split-view/test/split-view.test.ts)
- [1st-gen README](../../../../1st-gen/packages/split-view/README.md)
- React Spectrum S2 Split View — **does not exist.** RSP's `@react-spectrum/splitview` was deprioritized and never shipped; see [adobe/react-spectrum#1978](https://github.com/adobe/react-spectrum/discussions/1978).
- [Spectrum CSS — `splitview` component, `spectrum-two` branch](https://github.com/adobe/spectrum-css/tree/spectrum-two/components/splitview) — structural/token reference only; Storybook-tagged `"unmigrated"` (no confirmed S2 visual redesign). Reviewed source: `spectrum-css/components/splitview/index.css` and `stories/template.js` from a sibling checkout on **`spectrum-two`**. See the [Setup](#setup) checklist and `Q1`.
- [Drag bars and thumbs (beta) — Spectrum Contributions](https://spectrum-contributions.corp.adobe.com/page/drag-bars-thumbs-beta/) — internal design-guidance stub linked from the `spectrum-css` `splitview` `package.json`; confirmed to be a 2020, pre-S2, Adobe XD-based "For Position Only" placeholder with no defined behaviors, keyboard interactions, or SWC/RSP guidance. See `Q8` in the [Decision log](#decision-log).
- [Badge migration reference](../../02_workstreams/02_gen2-component-migration/02_step-by-step/01_washing-machine-workflow.md#reference-badge-migration)
- Epic: [SWC-2263](https://jira.corp.adobe.com/browse/SWC-2263) — Split View epic
- [SWC-276](https://jira.corp.adobe.com/browse/SWC-276) — [a11y] SplitView is entirely ignored by screen readers on mobile (Done; fix preserved per `B8`)
