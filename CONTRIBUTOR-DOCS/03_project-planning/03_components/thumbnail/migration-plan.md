<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Thumbnail / Thumbnail migration plan

<!-- Document title (editable) -->

# Thumbnail migration plan

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
    - [Design](#design)
    - [Architecture and behavior](#architecture-and-behavior)
    - [Scope and prerequisites](#scope-and-prerequisites)
- [Decision log](#decision-log)
- [References](#references)

</details>

<!-- Document content (editable) -->

> **Epic SWC-2195** · Planning output. Must be reviewed before implementation begins.
>
> Copy this template into `CONTRIBUTOR-DOCS/03_project-planning/03_components/thumbnail/migration-plan.md` before editing so the relative links, breadcrumbs, and generated sections resolve correctly.
>
> This plan should provide recommendations, not just observations. Call out inconsistencies, propose better API or naming paths where appropriate, and make unresolved tradeoffs explicit for reviewers.

---

## TL;DR

- Thumbnail ships as a **standalone `swc-thumbnail` custom element**, not a shared non-standalone utility. The status table's "Utility components (no standalone SWC)" section names thumbnail as an example in its prose, but the actual table only lists Opacity Checkerboard there, and Thumbnail appears in the main standalone-component table. The accessibility migration analysis already assumes a standalone `<swc-thumbnail>`. See [Decision log](#decision-log) C1.
- No structural or visual breaking changes are expected from CSS: `spectrum-css` `spectrum-two` and `main` branches are structurally identical for this component, and the Figma-confirmed 12-value size scale (50–1000, 16px–64px) matches `@adobe/spectrum-tokens` exactly.
- Two API changes ship as part of this migration: the custom element tag renames `sp-thumbnail` → `swc-thumbnail`, and the `size` property becomes numeric-typed (matching the `AvatarBase` precedent) instead of string-typed.
- A new `decorative` property and a DEBUG warning for a missing `alt` fulfill the accessibility-required scope from the accessibility migration analysis.
- `background`, `layer`, `disabled`, `focused`, and `selected` are dropped as documented `swc-thumbnail` properties. The checkerboard wrapper already covers `background`'s letterboxing purpose; `layer` is absent from the latest Figma; `disabled`/`focused`/`selected` were never reactive properties in 1st-gen to begin with, only CSS-only hooks. A parent/consumer applies its own style overrides for these instead of Thumbnail owning a CSS-hook attribute contract, matching Asset's plan. `cover` is renamed, not dropped, to `fit` (`'cover' \| 'contain'`, default `'contain'` to match 1st-gen's existing non-cover default), mirroring Asset's `fit` naming and DEBUG-warning pattern. See [Decision log](#decision-log) C6, C7, C8.
- The same guidelines page states thumbnails "can be navigated using a keyboard in certain scenarios, such as layers or layer masks," which reads as conflicting with the accessibility migration analysis's "not focusable, never in the tab order" recommendation. **Resolved:** the accessibility migration analysis stands; `swc-thumbnail` itself remains never focusable. Keyboard navigation across a set of thumbnails in a layer/treeview context is the responsibility of the wrapping treeview/layer-panel component (roving tabindex/arrow-key handling at that level), consistent with how `disabled`/`focused`/`selected` styling is already parent-owned rather than thumbnail-owned. See [Decision log](#decision-log) Q4.
- Thumbnail should migrate now, independently. Card's future "product card" glyph is the only related work on the roadmap, but React Spectrum S2's own `ProductCard` implements that glyph as a plain styled `<Image slot="thumbnail">`, not a shared Thumbnail sub-component, so this is not a hard component dependency; sequencing still favors migrating Thumbnail first.
- Thumbnail should consume the existing shared `_lit-styles/opacity-checkerboard.css` fragment for its checkerboard background, mirroring how 1st-gen directly imports `@spectrum-web-components/opacity-checkerboard` styles today.

### Most blocking open questions

None block the must-ship recommendation. The keyboard-focus conflict raised by the Spectrum 2 design guidelines is resolved, see [Decision log](#decision-log) Q4; the `size` implementation approach is resolved, see Q2; and the `background`/`cover` scope question is resolved, see Q1 and C8 (`background` drops, `cover` becomes `fit`). One item remains:

- **Q3** in [Scope and prerequisites](#scope-and-prerequisites): no live Jira query has been run yet for open gen1 non-accessibility issues; the [Open gen1 issues](#open-gen1-issues) table is empty pending that query.

---

## 1st-gen API surface

**Source:** [`1st-gen/packages/thumbnail/src/Thumbnail.ts`](../../../../1st-gen/packages/thumbnail/src/Thumbnail.ts)
**Version:** `@spectrum-web-components/thumbnail@1.12.2`
**Custom element tag:** `sp-thumbnail`

### Properties / attributes

| Property | Type | Default | Attribute | Notes |
| -------- | ---- | ------- | --------- | ----- |
| `background` | `string \| undefined` | `undefined` | Yes (reflected) | CSS `background` value applied inline to the checkerboard wrapper for letterboxing non-square content. |
| `cover` | `boolean` | `false` | Yes (reflected) | Fills the thumbnail bounds; slotted content gets `object-fit: cover`. |
| `layer` | `boolean` | `false` | Yes (reflected) | Renders the layer-panel presentation (thick outer/inner border treatment). |
| `size` | `string` (custom getter/setter; `'50' \| '75' \| '100' \| '200' \| '300' \| '400' \| '500' \| '600' \| '700' \| '800' \| '900' \| '1000'`) | `'500'` | Yes (reflected) | Invalid values silently fall back to `'500'` with no dev-mode warning. |
| `disabled` | *(not a declared property)* | n/a | Plain attribute | Documented in the README/CSS mapping but never declared as a Lit `@property`. Pure CSS hook (`:host([disabled])`); consumers must `setAttribute`, not assign a JS property. |
| `focused` | *(not a declared property)* | n/a | Plain attribute | Same as `disabled`: CSS-only, drives the focus-ring styling; applied by whatever interactive element embeds the thumbnail. |
| `selected` | *(not a declared property)* | n/a | Plain attribute | Same as `disabled`: CSS-only, only meaningful in combination with `layer`. |

### Methods

None.

### Events

None.

### Slots

| Slot | Content | Notes |
| ---- | ------- | ----- |
| default (unnamed) | An `<img>` element to present in the thumbnail | The class JSDoc says `@slot image`, but `render()` only ever emits an unnamed `<slot></slot>`; there is no `name="image"` slot in the shadow DOM. Any 1st-gen consumer that set `slot="image"` on the child, trusting the JSDoc, would silently fail to render it. This is a pre-existing 1st-gen documentation bug; 2nd-gen should document the default slot correctly from the start (see [Public API](#public-api)). |

### CSS custom properties

Passthrough: `--mod-opacity-checkerboard-size`.

Deprecated modifiers (`--mod-thumbnail-border-color`, `--mod-thumbnail-border-color-selected`, `--mod-thumbnail-border-radius`, `--mod-thumbnail-border-width`, `--mod-thumbnail-border-width-selected`, `--mod-thumbnail-color-opacity-disabled`, `--mod-thumbnail-focus-indicator-color`, `--mod-thumbnail-focus-indicator-gap`, `--mod-thumbnail-focus-indicator-thickness`, `--mod-thumbnail-layer-border-color-inner`, `--mod-thumbnail-layer-border-color-outer`, `--mod-thumbnail-layer-border-width-inner`, `--mod-thumbnail-layer-border-width-outer`, `--mod-thumbnail-size`).

This full modifier surface will not be carried forward to 2nd-gen.

### Shadow DOM output (rendered HTML)

```html
<!-- With background -->
<div class="opacity-checkerboard background" style="background: [background]">
  <div class="image-wrapper">
    <slot></slot>
  </div>
</div>

<!-- With layer -->
<div class="opacity-checkerboard layer-inner">
  <slot></slot>
</div>

<!-- Default -->
<div class="opacity-checkerboard image-wrapper">
  <slot></slot>
</div>
```

---

## Dependencies

| Package | Version | Role |
| ------- | ------- | ---- |
| `@spectrum-web-components/base` | `1.12.2` (workspace) | `SpectrumElement` base class, `@property` decorator |
| `@spectrum-web-components/opacity-checkerboard` | `1.12.2` (workspace) | Supplies `opacity-checkerboard.css`, imported directly into `Thumbnail`'s `styles` array for the checkerboard background pattern |

---

## Open gen1 issues

<!-- No confirmed results yet; see Q3 in Scope and prerequisites. Query to run: project = SWC AND component = "Thumbnail" AND labels not in (a11y, gen2) AND issuetype not in (Epic, Initiative) AND status != Done -->

| Jira | Type | Status (snapshot) | Summary |
| ---- | ---- | ----------------- | ------- |

## Migration sequencing and prerequisites

### Dependency-aware recommendation

Migrate Thumbnail now, independently. It has no unmigrated prerequisite dependency: its only real dependency, Opacity Checkerboard, is already analyzed and styled in 2nd-gen (status table: Analyze ✓, Render & Style ✓), and its shared `_lit-styles/opacity-checkerboard.css` fragment is ready to consume directly.

### Related components and ordering notes

- **Opacity Checkerboard**: 2nd-gen already exposes a shared, importable `css` fragment at `2nd-gen/packages/swc/stylesheets/_lit-styles/opacity-checkerboard.css` (`.swc-OpacityCheckerboard` class), documented as "a shared CSS utility, not a custom element." Thumbnail should import this fragment directly into its `styles` array, exactly as 1st-gen imports `@spectrum-web-components/opacity-checkerboard`'s styles today. No new fragment is needed.
- **Card**: `card.mdx` documents a future **product card** that will add a "logo thumbnail glyph," and `card-template.ts`'s `renderGlyph` option already anticipates an avatar/thumbnail glyph in its JSDoc. Product card has not started analysis yet (status table shows no ✓ in the Analyze column for Card). RSP's `ProductCard` (`@react-spectrum/s2/src/Card.tsx`) and `AttachmentList` (`@react-spectrum/ai/src/AttachmentList.tsx`) both implement their "thumbnail" as a plain, card-scoped `<Image slot="thumbnail">`, and RSP has no dedicated Thumbnail component at all. Despite that, the Card strategy author confirmed SWC's product card is expected to consume `<swc-thumbnail>` directly. This does not change the recommendation to migrate Thumbnail first, since Thumbnail has no unmigrated prerequisite of its own and product card analysis hasn't started; it does mean Card should be treated as a real future consumer of the `swc-thumbnail` public API once its own migration begins, not merely a sibling sharing size tokens. See [Decision log](#decision-log) C4.
- **Asset**: a closely related component sharing several presentation concerns with Thumbnail (checkerboard letterboxing, disabled/selected-style treatments, and `fit`). The most notable difference is that Asset sizes itself via aspect ratio rather than Thumbnail's fixed 12-value size scale, so the two should not share a sizing implementation. Several 2nd-gen API decisions were aligned with Asset's plan; see [Decision log](#decision-log) C6, C7, C8.
- **Avatar**: not a structural dependency, but `AvatarBase`'s bespoke numeric `size` property is the direct architectural precedent used in [2nd-gen API decisions](#2nd-gen-api-decisions) below.

### User confirmation needed

- The standalone-vs-utility read is settled, see [Decision log](#decision-log) C1. Still open: whether the status table's "Utility components" prose should be corrected separately (not part of this plan).
- The `background`/`cover` scope question is settled, see [Decision log](#decision-log) Q1 and C8.

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
| --- | ------------ | ----------------- | ----------------- | ------------------------ |
| **B1** | Tag rename | `<sp-thumbnail>` | `<swc-thumbnail>` | Update tag name and import path to the 2nd-gen package/entry point. |
| **B2** | `size` becomes numeric-typed | `el.size` is a `string` (e.g. `'500'`); invalid values fall back silently | `el.size` is a `number` (e.g. `500`); invalid values fall back to `500` with a dev-mode `warnIf` warning (see [B2 rationale](#behavioral-semantics)) | Update JS that reads/sets `.size` programmatically to use numeric literals. The HTML attribute value is unaffected (attributes are always strings). |

#### Styling and visuals

| #   | What changes | 1st-gen behavior | 2nd-gen behavior | Consumer migration path |
| --- | ------------ | ----------------- | ----------------- | ------------------------ |
| **B3** | `--mod-thumbnail-*` modifiers dropped | 14 deprecated `--mod-*` properties documented (see [CSS custom properties](#css-custom-properties)) | None exposed; see [Public API](#public-api) | None expected to be in active use; flag if a real consumer dependency surfaces during review. |
| **B7** | `background` string dropped | `background` (`string \| undefined`): CSS `background` value applied inline to the checkerboard wrapper for letterboxing non-square content | Not exposed as a component property. The checkerboard wrapper already indicates empty/transparent content on its own, so a separate custom letterbox color/gradient is unnecessary. Matches Asset's plan, where the checkerboard similarly covers this purpose. See [Decision log](#decision-log) C8. | Remove the `background` attribute. If a custom letterbox color is still needed, apply it via CSS to a wrapping element. |
| **B8** | `layer` boolean dropped | `layer` (`boolean`, default `false`): renders the layer-panel presentation (thick outer/inner border treatment) | Not exposed as a component property. `layer` is absent from the latest Figma; the thick-border treatment becomes a parent/consumer-applied style override instead of a Thumbnail attribute. See [Decision log](#decision-log) C6. | Remove the `layer` attribute; the wrapping treeview/layer-panel component applies its own border styling directly (targeting `swc-thumbnail` with its own CSS) if this presentation is still needed. |
| **B9** | `disabled`/`focused`/`selected` plain attributes dropped | Three CSS-only, non-reactive attributes (never declared as Lit `@property`s) driving opacity/focus-ring/selected-border styling | Not exposed as a documented attribute contract. Parent components apply their own style overrides directly instead, matching Asset's plan and the `layer` decision. See [Decision log](#decision-log) C7. | Consumers currently setting `disabled`/`focused`/`selected` via `setAttribute` should instead apply the equivalent styling themselves (their own CSS targeting `swc-thumbnail`, or a wrapper element) rather than relying on a Thumbnail-owned CSS hook. |
| **B10** | `cover` renamed and expanded to `fit` | `cover` (`boolean`, default `false`): when `true`, applies `object-fit: cover`; when `false` (default), no explicit `object-fit` override | `fit` (`'cover' \| 'contain'`, default `'contain'`), matching Asset's `AssetFit` naming and DEBUG-warning pattern, but with a different default to preserve 1st-gen's existing non-cover default behavior. Component-owned, not consumer-applied. See [Decision log](#decision-log) C8. | Replace `cover` with `fit="cover"`; the previous default (unset/`false`) maps to the new default (`fit="contain"` or omitted). |

#### Accessibility and behavior

| #   | What changes | 1st-gen behavior | 2nd-gen behavior | Consumer migration path |
| --- | ------------ | ----------------- | ----------------- | ------------------------ |
| **B4** | New `decorative` property | Not present | `decorative` (reflected boolean); sets `aria-hidden="true"` on the host and forces `alt=""` on the slotted `<img>` if unset | Set `decorative` on thumbnails whose image content is already described by surrounding context. Additive, non-breaking. |
| **B5** | New missing-`alt` DEBUG warning | No warning | Emits a DEBUG-mode warning when `decorative` is unset and the slotted `<img>` has no meaningful `alt` | Dev-mode only; no consumer-facing runtime change. |
| **B6** | Formalize "not interactive" contract | No `role`, not focusable (true today, but not tested/documented) | Same behavior, explicitly tested: no ARIA role on host, never part of the tab order | No consumer action; existing behavior, now covered by tests. |

### Additive — ships when ready, zero breakage for consumers already on 2nd-gen

| #   | What is added | Notes |
| --- | ------------- | ----- |
| **A1** | New `--swc-thumbnail-*` custom properties | None identified as required for the initial migration. Revisit if a real consumer customization need surfaces during review. |
| **A2** | Generalized numeric-size mixin | If core later generalizes a numeric-size pattern across components (Avatar, Thumbnail, …), Thumbnail could adopt it then. Not required now; see [Decision log](#decision-log) Q2. |

---

## 2nd-gen API decisions

These are derived from the 1st-gen implementation, the accessibility migration analysis, the Figma `S2 / Web` Thumbnail spec, and the `spectrum-css` `spectrum-two` rendering roadmap. There is no React Spectrum S2 implementation to cross-reference for this component. Confirmed items are marked; open items are tracked in [Blockers and open questions](#blockers-and-open-questions).

Use lightweight confidence labels where helpful:

- **Confirmed**: directly supported by source material
- **Inferred**: recommended based on multiple signals, but not explicitly specified in one authoritative source
- **Open question**: unresolved and needs review or more input

### Public API

#### Properties / attributes (2nd-gen)

| Property | Type | Default | Attribute | Notes |
| -------- | ---- | ------- | --------- | ----- |
| `size` | `ThumbnailSize` (`50 \| 75 \| 100 \| 200 \| 300 \| 400 \| 500 \| 600 \| 700 \| 800 \| 900 \| 1000`, numeric) | `500` | Yes (reflected) | **Confirmed** (B2). Numeric-typed to match the `AvatarBase` precedent; validated with `warnIf` instead of 1st-gen's silent fallback. See [Decision log](#decision-log) Q2. |
| `fit` | `ThumbnailFit` (`'cover' \| 'contain'`) | `'contain'` | Yes (reflected) | **Confirmed** (B10). Renamed and expanded from 1st-gen's `cover` boolean; matches Asset's `AssetFit` naming and DEBUG-warning pattern, with a Thumbnail-specific default. See [Decision log](#decision-log) C8. |
| `decorative` | `boolean` | `false` | Yes (reflected) | **Confirmed** (a11y-required, B4). New. |

`background`, `layer`, `disabled`, `focused`, and `selected` are intentionally **not** carried forward as `swc-thumbnail` properties or attributes (B7–B9). The checkerboard wrapper already covers `background`'s letterboxing purpose; direct style overrides targeting `swc-thumbnail` (or a wrapper element) replace `layer`/`disabled`/`focused`/`selected`. See [Decision log](#decision-log) C6–C8 and [Behavioral semantics](#behavioral-semantics).

#### Visual matrix (2nd-gen)

| Axis | Values | Source |
| ---- | ------ | ------ |
| Size | `50` (16px) · `75` (20px) · `100` (24px) · `200` (28px) · `300` (32px) · `400` (36px) · `500` (40px, default) · `600` (44px) · `700` (48px) · `800` (52px) · `900` (56px) · `1000` (64px) | Figma-confirmed (`Copy as PNG`, Size axis); px values match `@adobe/spectrum-tokens` `thumbnail-size-*` exactly. Independently corroborated: React Spectrum S2's `ProductCard` and `AttachmentList` `thumbnail` image slots map their own `XS`/`S`/`M`/`L`/`XL` sizes to `24`/`36`/`40`/`44`/`56` px, a subset of this same scale. |
| State | Default, Disabled, **Selected** (design states; not all are `swc-thumbnail` attributes) | Figma-confirmed (State axis on the same frame) plus the [Spectrum 2 design guidelines](https://s2.spectrum.corp.adobe.com/page/thumbnail/) States table, which additionally lists Selected as Supported (Hover, Down, Keyboard focus, Dragged, and Error are all explicitly Not supported). Disabled and Selected are supported design states, not supported `swc-thumbnail` properties; see [Decision log](#decision-log) C7 for why the visual treatment is consumer-applied instead. |
| Presentation | Default only, plus component-owned `fit` (`cover`/`contain`); `layer`/`selected` presentation is consumer-applied, `background` is dropped | `fit` carries forward from 1st-gen's `cover` as a component-owned attribute-selector-driven property (see [Behavioral semantics](#behavioral-semantics)). 1st-gen's `layer`/`selected` presentation behaviors are achievable by a consumer via their own border/selected styling instead, so 2nd-gen Thumbnail renders a single shadow-DOM structure and lets consumers layer that styling on top; see [Decision log](#decision-log) C6, C7. `background` is dropped, see C8. |

#### Slots (2nd-gen)

| Slot | Content | Notes |
| ---- | ------- | ----- |
| default | Slotted `<img>` element | **Confirmed.** Document as the default (unnamed) slot; do not repeat 1st-gen's inaccurate `@slot image` JSDoc (see [1st-gen Slots](#slots)). |

#### CSS custom properties (2nd-gen)

No `--mod-*` properties will be exposed. New `--swc-*` component-level properties may be introduced where needed — these are additive and not breaking. See [Component Custom Property Exposure](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#component-custom-property-exposure) for what to expose and how.

Each exposed `--swc-*` property must be documented with a `@cssprop` JSDoc tag on the primary SWC component class. Storybook picks these up and surfaces them in the API docs panel automatically.

Initial expectation for Thumbnail is **no new `--swc-thumbnail-*` properties** (see A1). No `--mod-thumbnail-*` properties will be carried forward.

### Behavioral semantics

**Size validation and fallback (Core-owned).** Mirror `AvatarBase`'s numeric getter/setter pattern: validate the incoming value against `THUMBNAIL_VALID_SIZES`, fall back to `THUMBNAIL_DEFAULT_SIZE` (`500`) on an invalid value, reflect the resolved value to the `size` attribute, and surface a `warnIf` dev-mode warning on invalid input (1st-gen falls back silently with no warning).

**`decorative` / alt handling.** When `decorative` is set: apply `aria-hidden="true"` to the host; if the slotted `<img>` has no `alt`, set `alt=""` on it. When `decorative` is not set and the slotted `<img>` has no meaningful `alt`: emit a DEBUG-mode warning via the shared `window.__swc.warn` / `warnIf` utility directing the author to add `alt` or set `decorative`. The `aria-hidden` half of this is Core-owned, same as `AvatarBase`. The alt-detection half is **not** a direct mirror of `AvatarBase`: Avatar checks its own reactive `alt` property, but Thumbnail's `alt` lives on a slotted light-DOM `<img>`, which Core can't see without rendering of its own. This needs slot introspection (`slotchange` plus `assignedElements()` on the slot SWC renders); see [Architecture: core vs SWC split](#architecture-core-vs-swc-split) for the open question on exactly where that logic lives.

**`fit` (renamed from `cover`, component-owned).** Replaces 1st-gen's `cover` boolean with a `'cover' | 'contain'` enum, mirroring Asset's `AssetFit` naming, DEBUG-warning-on-invalid-value pattern, and Core placement (Asset hosts `fit` on `Asset.base.ts`). Thumbnail's default is `'contain'`, not Asset's `'cover'`, to preserve 1st-gen's existing non-cover default behavior. Implemented purely via `:host()` attribute selectors on the slotted content (e.g. `::slotted(*) { object-fit: contain; }` by default, `:host([fit="cover"]) ::slotted(*) { object-fit: cover; }` as the override), exactly like 1st-gen's `cover` was, no separate render() branch is needed. See [Decision log](#decision-log) C8.

**`background` (dropped).** Not exposed as a `swc-thumbnail` property. The checkerboard wrapper already indicates empty/transparent content on its own, so a separate custom letterbox color/gradient string is unnecessary; matches Asset's plan, where the checkerboard similarly covers this purpose. See [Decision log](#decision-log) C8.

**`disabled` / `focused` / `selected` / `layer` (dropped).** None of these are exposed as `swc-thumbnail` properties or documented attributes. 1st-gen implemented them as CSS-only hooks (`:host([disabled])`, etc.) with no reactive property or ARIA reflection; 2nd-gen removes even that attribute contract and expects the parent/consumer to apply the equivalent visual treatment directly (its own CSS targeting `swc-thumbnail`, or a wrapping element), matching Asset's plan for the same states. See [Decision log](#decision-log) C6, C7.

### Accessibility semantics notes (2nd-gen)

Full detail lives in the [accessibility migration analysis](./accessibility-migration-analysis.md). Summary: no ARIA role on `:host`; the slotted `<img>`'s implicit `img` role and `alt` carry the accessible name; the thumbnail is never in the tab order; shadow DOM wrapper elements are decorative and carry no ARIA. `disabled`/`focused`/`selected`/`layer` visual states are not implemented by `swc-thumbnail` at all; they are fully owned and applied by the parent/consumer component. See [Decision log](#decision-log) C6, C7.

The [opacity-checkerboard accessibility migration analysis](../opacity-checkerboard/accessibility-migration-analysis.md) explicitly carves out `sp-thumbnail` from the shared fragment's generic `aria-hidden="true"` usage guidance: because the checkerboard wrapper directly contains the slotted `<img>` (see the [2nd-gen rendering shape](#architecture-core-vs-swc-split)), marking it `aria-hidden` would hide the accessibly-named image along with it. Do not apply `aria-hidden` to the `.swc-OpacityCheckerboard` wrapper on this component.

The published [Spectrum 2 design guidelines](https://s2.spectrum.corp.adobe.com/page/thumbnail/) note that thumbnails "can be navigated using a keyboard in certain scenarios, such as layers or layer masks," which reads as conflicting with the "never in the tab order" rule above. **Resolved in favor of the accessibility migration analysis** (see [Decision log](#decision-log) Q4). `swc-thumbnail` stays out of the tab order in all cases; any keyboard navigation across a set of thumbnails is the wrapping treeview/layer-panel component's responsibility, not this component's.

---

## Architecture: core vs SWC split

> The 1st-gen component is a **reference only** — 2nd-gen is built independently. Neither generation imports from the other.

Follow the [Badge migration reference](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#reference-badge-migration) as the concrete pattern for the core/SWC split.

| Layer    | Path                                            | Contains                                                                                                                                                                                                                                          |
| -------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Core** | `2nd-gen/packages/core/components/thumbnail/` | `Thumbnail.base.ts` (numeric `size` property with `warnIf` validation, `fit` property with `warnIf` validation on invalid values, `decorative` property, alt-fallback and DEBUG-warning logic), `Thumbnail.types.ts` (`ThumbnailSize`, `THUMBNAIL_VALID_SIZES`, `THUMBNAIL_DEFAULT_SIZE`, `ThumbnailFit`). No rendering. |
| **SWC**  | `2nd-gen/packages/swc/components/thumbnail/`  | `Thumbnail.ts`, `thumbnail.css`, element registration, stories, tests, and the specific S2 rendering/styling for `swc-thumbnail`.                                                                                                            |

Planned rendering shape:

- Core owns API normalization (`size` validation/reflection), the `decorative`/`aria-hidden`/alt-fallback logic, and the missing-`alt` DEBUG warning
- Core's alt-fallback and DEBUG-warning logic is informed by `AvatarBase`'s `warnIf` pattern but is **not** a direct mirror of it: `AvatarBase._warnMissingAlt()` reads a reactive `alt` property declared on the host itself, while Thumbnail has no such property, its `alt` lives on a light-DOM child projected through the default slot. Core needs slot introspection (e.g. a `slotchange` listener plus `assignedElements()` on the slot SWC renders) to read the assigned `<img>`'s `alt`, a mechanism Avatar doesn't need. Since Core has no rendering of its own (no `<slot>` to query), this likely requires SWC to surface the assigned image (or its `alt`) up to Core, or for this logic to live in SWC instead of Core; resolve the exact split during Setup
- SWC renders a single shadow-DOM structure, not per-property variant markup, per plan-review feedback:

  ```html
  <div class="swc-Thumbnail">
    <slot></slot>
  </div>
  ```

  `.swc-Thumbnail` consumes the shared `_lit-styles/opacity-checkerboard.css` fragment's `.swc-OpacityCheckerboard` class in place of a component-package import. `:host()` attribute selectors (`:host([size="..."])`, `:host([fit="cover"])`, etc.) drive all style changes instead of branching the template per property; there is no separate `layer`/`background` wrapper variant, consistent with those properties being dropped (B7, B8). `fit` also needs no separate wrapper, it drives `object-fit` on the slotted image via attribute selector alone, exactly like 1st-gen's `cover` did (B10).
- ⚠️ **Do not mark the checkerboard wrapper `aria-hidden`.** The generic opacity-checkerboard usage guidance says to add `aria-hidden="true"` to the `.swc-OpacityCheckerboard` element, but the [opacity-checkerboard accessibility migration analysis](../opacity-checkerboard/accessibility-migration-analysis.md) explicitly carves out `sp-thumbnail` as an exception: `.swc-Thumbnail` directly contains the slotted `<img>`, so `aria-hidden` on it would hide the accessibly-named image along with it, contradicting this plan's own accessibility semantics notes below

---

## Migration checklist

### Preparation (this ticket)

- [x] 1st-gen API surface documented
- [x] Dependencies identified
- [x] Breaking changes documented
- [x] 2nd-gen API decisions drafted
- [ ] Plan reviewed by at least one other engineer

### Setup

- [ ] Create `2nd-gen/packages/core/components/thumbnail/`
- [ ] Create `2nd-gen/packages/swc/components/thumbnail/`
- [ ] Wire exports in both `package.json` files
- [ ] Check out `spectrum-css` at `spectrum-two` branch as sibling directory

### API

#### Naming and public surface

- [ ] `Thumbnail.types.ts`: define `ThumbnailSize`, `THUMBNAIL_VALID_SIZES`, `THUMBNAIL_DEFAULT_SIZE` (500), `ThumbnailFit` (`'cover' | 'contain'`)
- [ ] `Thumbnail.base.ts`: numeric `size` getter/setter with `warnIf` validation (B2); `fit` getter/setter with `warnIf` validation on invalid values, default `'contain'` (B10); `decorative` property and alt-fallback/DEBUG-warning logic (B4, B5)

### Styling

> Follow the [CSS style guide](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/) as the source of truth for all styling work. Key references: [migration steps](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/04_spectrum-swc-migration.md), [custom properties](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md), [anti-patterns](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/05_anti-patterns.md).

- [ ] Render a single `.swc-Thumbnail` wrapper (`<div class="swc-Thumbnail"><slot></slot></div>`) with no per-property variant markup; drive all style changes via `:host()` attribute selectors; keep styling off `:host` itself
- [ ] Copy S2 source from `spectrum-css` `spectrum-two` branch `index.css` (not `/dist`) into `thumbnail.css` as baseline
- [ ] Import the shared `_lit-styles/opacity-checkerboard.css` fragment instead of a component-package import

#### Visual model and regressions

- [ ] Verify i18n size modifiers (`:lang(ja)`, `:lang(ko)`, `:lang(zh)`) if present in S2 source
- [ ] Pass stylelint (property order, `no-descending-specificity`, token validation)

### Accessibility

<!-- Sourced from accessibility-migration-analysis.md -->

#### Naming and semantics

- [ ] No `role` attribute on `:host`
- [ ] `decorative` applies `aria-hidden="true"` to host and `alt=""` fallback to the slotted `<img>` when unset
- [ ] DEBUG warning fires when `decorative` is unset and the slotted `<img>` has no meaningful `alt`
- [ ] `disabled`/`focused`/`selected`/`layer` are not implemented as `swc-thumbnail` attributes at all; verify no residual CSS hooks exist for them (see [Decision log](#decision-log) C6, C7)
- [ ] The `.swc-OpacityCheckerboard` wrapper does **not** get `aria-hidden`, since it directly contains the slotted `<img>` (see [Accessibility semantics notes](#accessibility-semantics-notes-2nd-gen))

#### State verification

- [ ] Thumbnail is never part of the tab order, in any state or context, including when used inside a layer/treeview panel (see [Decision log](#decision-log) Q4)
- [ ] Border (inset box-shadow) meets 3:1 contrast against adjacent background, default and high-contrast modes

### Testing

- [ ] Port `1st-gen/packages/thumbnail/test/thumbnail.test.ts` coverage that still applies (accessible load, size, `cover`→`fit` rendering, checkerboard slot rendering)
- [ ] Port `1st-gen/packages/thumbnail/test/thumbnail-memory.test.ts` memory-leak coverage
- [ ] Add unit tests for `decorative`, the missing-`alt` DEBUG warning, and the numeric `size` `warnIf` validation
- [ ] Add Playwright `thumbnail.a11y.spec.ts` with `toMatchAriaSnapshot`, covering: labeled `<img>`, `decorative`, and embedded-in-a-consumer-styled-disabled-parent

#### Visual regression

- [ ] Add VRT coverage for all 12 sizes in the default presentation (`disabled`/`focused`/`selected`/`layer` visual treatments are consumer-owned and out of scope for `swc-thumbnail`'s own VRT, see [Decision log](#decision-log) C6, C7)
- [ ] Add VRT coverage for `fit="cover"` and the default `fit="contain"`, applied via the component's own attribute selectors (see [Decision log](#decision-log) C8)
- [ ] Add forced-colors (Windows High Contrast) coverage for the default border treatment

### Documentation

#### General

- [ ] JSDoc on all public props, slots, and CSS custom properties (correct the default-slot JSDoc; do not repeat the 1st-gen `@slot image` inaccuracy)
- [ ] Storybook stories for all sizes, `fit` (`cover`/`contain`), and `decorative`; include an example of a consumer applying its own `disabled`/`selected`-style overrides

#### Breaking changes

- [ ] Document the tag rename (`sp-thumbnail` → `swc-thumbnail`), the `size` type change (`string` → `number`), the `cover` → `fit` rename/expansion, and the removal of `background`, `layer`, `disabled`, `focused`, and `selected` as component attributes (replaced by consumer-owned CSS overrides, except `fit` which stays component-owned) in the consumer migration guide

### Review

- [ ] `yarn lint:2nd-gen` passes (ESLint, Stylelint, Prettier)
- [ ] Status table in workstream doc updated
- [ ] PR created with description referencing Epic SWC-2195
- [ ] Peer engineer sign-off

---

## Blockers and open questions

### Design

| #   | Item | Blocking? | Status | Owner |
| --- | ---- | --------- | ------ | ----- |

### Architecture and behavior

| #   | Item | Blocking? | Status | Owner |
| --- | ---- | --------- | ------ | ----- |

### Scope and prerequisites

| #   | Item | Blocking? | Status | Owner |
| --- | ---- | --------- | ------ | ----- |
| **Q3** | No live Jira query has been run for open gen1 non-accessibility issues (`component = Thumbnail`, excluding `a11y`/`gen2` labels, excluding Epics/Initiatives, excluding Done). The [Open gen1 issues](#open-gen1-issues) table is empty pending that query. | No | Open: informational only; does not affect the must-ship recommendation. | Ticket owner |

<!-- Final-state deferred-ticket table columns: `Ticket`, `Deferred item`, `Why deferred`, `Related plan section`. -->

---

## Decision log

| Ref | Decision | Rationale / context |
| --- | -------- | -------------------- |
| **C1** | Thumbnail ships as a standalone `swc-thumbnail` custom element, not a shared non-standalone utility. | The status table's "Utility components (no standalone SWC)" section text names thumbnail as an example, but the actual utility table only lists Opacity Checkerboard, and Thumbnail appears in the main standalone-component table (Analyze ✓). The existing accessibility migration analysis also already assumes a standalone `<swc-thumbnail>`. The status doc's prose is stale and should be corrected separately. |
| **C2** | `disabled`, `focused`, and `selected` remain plain, non-reactive, parent-applied attributes with no ARIA reflection on `swc-thumbnail`. | Sourced directly from the accessibility migration analysis; confirmed consistent with 1st-gen, which never declared these as Lit `@property` accessors either, only CSS attribute selectors. Not a behavior change, just a formalized decision. **Superseded by C7:** on further plan review, the attribute contract itself is dropped, not merely formalized. |
| **C3** | `layer` and `selected` carry forward as supported Thumbnail properties; not dropped. | An earlier draft of this plan considered dropping both, reasoning from a single Figma instance's "Component properties" panel (which listed only `Size`, `State`, `Show image`) plus the observation that React Spectrum has no equivalent concept. That reasoning was corrected: RSP has no Thumbnail component at all, so its silence isn't evidence either way. The published [Spectrum 2 design guidelines](https://s2.spectrum.corp.adobe.com/page/thumbnail/) directly settle it: the States table lists "Selected" as Supported, and the Behaviors section documents both "Layer" (thick gray border in Treeview/layer panels) and "Selected layer" (thick blue border) as current guidance. **Superseded by C6 (for `layer`) and C7 (for `selected`):** on further plan review, checked against the latest Figma, both are dropped as component properties after all. |
| **Q4** | `swc-thumbnail` stays out of the tab order in all cases, including `layer`; the accessibility migration analysis's "never in the tab order" rule stands as-is, with no exception. | The published [Spectrum 2 design guidelines](https://s2.spectrum.corp.adobe.com/page/thumbnail/) note that thumbnails "can be navigated using a keyboard in certain scenarios, such as layers or layer masks," which read as conflicting. Resolved: keyboard navigation across a set of thumbnails in a layer/treeview context is the wrapping treeview/layer-panel component's responsibility (roving tabindex/arrow-key handling at that level), consistent with how `disabled`/`focused`/`selected` styling is already parent-owned rather than thumbnail-owned. This is a user decision, not something derived from further source material. |
| **Q2** | Implement `size` as a bespoke numeric property on `ThumbnailBase`, mirroring `AvatarBase`, rather than the shared `SizedMixin`. | `SizedMixin` is hard-locked to the `xxs`–`xxl` `ElementSize` union and can't express a 12-value px-driven numeric scale (50–1000). `AvatarBase` already solves the same shape of problem the same way. Checked for a recorded team rationale beyond the code itself: none found in the [Avatar 2nd-gen migration PR](https://github.com/adobe/spectrum-web-components/pull/6113) description or its 30+ review comments, or in `2nd-gen/packages/core/AGENTS.md`/`README.md`/`MIGRATION.md`. This is a user decision made on the strength of the `AvatarBase` precedent alone. |
| **C4** | Card's future product card is expected to directly consume `<swc-thumbnail>`, not a card-scoped styled `<img>` slot. | An earlier draft inferred a looser, card-scoped-image-slot pattern from React Spectrum S2's `ProductCard`/`AttachmentList` (neither has a dedicated Thumbnail component to consume). The Card strategy author confirmed during plan review that Card will pick up Thumbnail directly. Non-blocking for this plan: Thumbnail migrates first regardless, but Card should be tracked as a real future consumer of the `swc-thumbnail` public API. |
| **C5** | `cover` is dropped as a `swc-thumbnail` property; not renamed to `fit`. | Asset is separately planning a `fit` property (`'cover' \| 'contain'`, default `'cover'`); an earlier pass of this plan proposed mirroring that naming on Thumbnail with a `'contain'` default to match 1st-gen's existing behavior. On further plan review, Design opted to drop the property entirely instead: the same `cover`/`contain` outcomes are achievable by the consumer applying CSS `object-fit` directly to the slotted `<img>`, which also matches Asset's plan to keep this consumer-owned rather than component-owned. **Superseded by C8:** this was based on a misread PR review comment; the comment was actually about `background`, and `cover` should have become `fit` rather than being dropped. |
| **Q1** | Whether `background` remains a supported Figma component property. | Resolved as moot: `background` is dropped from `swc-thumbnail` regardless of what Figma shows, since the checkerboard wrapper already covers its letterboxing purpose. See C8 for the full corrected decision. |
| **C8** | `background` is dropped as a `swc-thumbnail` property (not `cover`); `cover` is renamed and expanded to a `fit` property (`'cover' \| 'contain'`, default `'contain'`), matching Asset's `AssetFit` naming and DEBUG-warning pattern. Supersedes C5; resolves Q1. | C5 mistakenly dropped `cover` entirely, reasoning from a PR review comment thread that got conflated: the actual comment was specifically about `background` ("we can drop this in favor of only a slotted image because we can apply object-fit in CSS for the same outcome of either cover or contain behavior; this matches Asset's plan as well"), and it only mentioned `cover`/`contain` outcomes as an aside, to note that a `background`-image-based approach isn't needed to achieve letterboxing, not to argue for dropping `cover` itself. The comment author clarified directly: drop `background`; replace `cover` with `fit` and the cover/contain behavior noted in that comment. Thumbnail's `fit` default is `'contain'`, not Asset's `'cover'`, to preserve 1st-gen's existing non-cover default. |
| **C6** | `layer` is dropped as a `swc-thumbnail` property. Supersedes the `layer` portion of C3. | C3 confirmed `layer` carrying forward, based on the published Spectrum 2 design guidelines' Behaviors section. On further plan review, checked against the latest Figma, `layer` is no longer represented there; it's a narrow enough use case that a parent/consumer can apply its own border-style overrides directly instead of Thumbnail owning a dedicated attribute for it. |
| **C7** | `disabled`, `focused`, and `selected` are dropped as documented `swc-thumbnail` attributes. Supersedes C2 and the `selected` portion of C3. | C2 confirmed these as plain, parent-applied, non-reactive CSS hooks, formalizing existing 1st-gen behavior. On further plan review: since none of these were ever reactive properties, and the equivalent visual treatment (opacity, focus ring, selected border) can be produced by a parent applying its own style overrides, Design opted to drop the documented attribute contract entirely rather than carry forward CSS-only hooks. This also matches Asset's plan for the same states. |

---

## References

- [Washing machine workflow](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md)
- [2nd-gen migration status table](../../02_workstreams/02_2nd-gen-component-migration/01_status.md)
- [Accessibility migration analysis](./accessibility-migration-analysis.md)
- [Rendering and styling migration analysis](./rendering-and-styling-migration-analysis.md)
- [CSS style guide — Component Custom Property Exposure](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#component-custom-property-exposure)
- [CSS style guide — Selector conventions](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#selector-conventions)
- [1st-gen source](../../../../1st-gen/packages/thumbnail/src/Thumbnail.ts)
- [1st-gen tests](../../../../1st-gen/packages/thumbnail/test/thumbnail.test.ts)
- [1st-gen README](../../../../1st-gen/packages/thumbnail/README.md)
- [Spectrum 2 design guidelines: Thumbnail](https://s2.spectrum.corp.adobe.com/page/thumbnail/) (internal): authoritative source for anatomy, component options, supported states, and behaviors; confirms React Spectrum is "Not available" for this component, and is the source for [Decision log](#decision-log) C3 and Q4
- React Spectrum S2 Thumbnail: N/A; no dedicated Thumbnail component exists in React Spectrum. Checked [`@react-spectrum/s2/src/Card.tsx`](https://github.com/adobe/react-spectrum/blob/main/packages/%40react-spectrum/s2/src/Card.tsx) (`ProductCard`) and [`@react-spectrum/ai/src/AttachmentList.tsx`](https://github.com/adobe/react-spectrum/blob/main/packages/%40react-spectrum/ai/src/AttachmentList.tsx): both use a plain `<Image slot="thumbnail">` with card/list-scoped outline styling, not a component with `layer`/`background`/`cover`/checkerboard semantics. See [Migration sequencing](#migration-sequencing-and-prerequisites).
- [Spectrum CSS: `spectrum-two` branch, Thumbnail](https://github.com/adobe/spectrum-css/tree/spectrum-two/components/thumbnail/index.css): reviewed via sibling checkout at `../spectrum-css/components/thumbnail/index.css`
- [Badge migration reference](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#reference-badge-migration)
- [Avatar migration plan](../avatar/migration-plan.md) and [`Avatar.base.ts`](../../../../2nd-gen/packages/core/components/avatar/Avatar.base.ts): precedent for the numeric `size` decision (see [Decision log](#decision-log) Q2)
- [Asset component plan](../asset/component-plan.md): source for the `fit` (`'cover' | 'contain'`) property naming and DEBUG-warning pattern Thumbnail's `cover` → `fit` decision mirrors, and for the `layer`/`disabled`/`focused`/`selected` consumer-owned styling precedent (see [Decision log](#decision-log) C6–C8)
- [Avatar 2nd-gen migration PR #6113](https://github.com/adobe/spectrum-web-components/pull/6113): checked for explicit rationale on the numeric-vs-`SizedMixin` choice; none recorded in the description or review comments beyond the type-level comment in `Avatar.types.ts`
- [Shared opacity-checkerboard fragment](../../../../2nd-gen/packages/swc/stylesheets/_lit-styles/opacity-checkerboard.css) and its [internal docs](../../../../2nd-gen/packages/swc/components/opacity-checkerboard/opacity-checkerboard.internal.mdx)
- [Opacity-checkerboard accessibility migration analysis](../opacity-checkerboard/accessibility-migration-analysis.md): source of the `sp-thumbnail`-specific `aria-hidden` carve-out (do not hide the checkerboard wrapper when it contains the slotted `<img>`)
- [`Avatar.base.ts`](../../../../2nd-gen/packages/core/components/avatar/Avatar.base.ts) `_warnMissingAlt()`: checked directly to confirm it mirrors only the `size`/`aria-hidden` pattern, not the alt-detection mechanism (see [Architecture: core vs SWC split](#architecture-core-vs-swc-split))
- [2nd-gen shared resources](../../../01_contributor-guides/16_2nd-gen-shared-resources.md): `SizedMixin`, `warnIf`/`window.__swc.warn`
- [Card component](../../../../2nd-gen/packages/swc/components/card/card.mdx) and [`card-template.ts`](../../../../2nd-gen/packages/swc/components/card/card-template.ts): future downstream consumer of a thumbnail glyph
- Epic: SWC-2195 - Thumbnail epic
