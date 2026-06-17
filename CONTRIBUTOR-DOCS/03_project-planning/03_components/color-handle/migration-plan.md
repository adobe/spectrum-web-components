<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Color Handle / Color Handle migration plan

<!-- Document title (editable) -->

# Color Handle migration plan

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

> **Epic SWC-2137** · Planning output. Must be reviewed before implementation begins.
>
> Driving a11y ticket: **[SWC-2295](https://jira.corp.adobe.com/browse/SWC-2295)** — _[Color Handle][Color Loupe] Adaptive (white-first) border contrast for WCAG 1.4.11_.
>
> This plan should provide recommendations, not just observations. Call out inconsistencies, propose better API or naming paths where appropriate, and make unresolved tradeoffs explicit for reviewers.

---

## TL;DR

`sp-color-handle` is a tiny, **non-interactive primitive**: a draggable dot rendered on top of `sp-color-area` / `sp-color-slider` / `sp-color-wheel` that shows the currently picked color (over an opacity checkerboard) and pops a `sp-color-loupe` on touch. It has **no public methods, no events, and no slots** — only four reflected properties (`color`, `disabled`, `focused`, `open`).

- **Must ship**
  - Rename element `sp-color-handle` → `swc-color-handle` (standard 2nd-gen tag change).
  - Build with the **core/SWC split** (`ColorHandleBase` in core, `swc-color-handle` in SWC), mirroring the already-migrated `color-loupe`.
  - Keep the **color loupe built-in** (component renders its own `swc-color-loupe`), matching 1st-gen behavior.
  - **New a11y requirement (SWC-2295):** adaptive **white-first dual-border** so handle chrome maintains **≥3:1 non-text contrast (WCAG 1.4.11)** across the full color spectrum, and **grow-on-focus/press as the focus indicator** (no separate focus ring).
  - **Keep `focused`** (_team decision_). Following RSP / the design spec: `focused` enlarges the handle (~2×) only when the **parent** is focused (keyboard or programmatic), so the name is accurate. A click on the handle while the parent is not focused does **not** enlarge it — it sets `open` so the loupe appears instead. No rename needed.
  - **Ship `Show handle fill` now** (_team decision_): low-effort enough to include in the baseline migration rather than defer. New boolean (default: fill shown), not in 1st-gen.
  - Keep **`open`** as the attribute name (_team decision_) — not renamed to match the Figma `Show color loupe` label.
  - Drop the entire 1st-gen `--mod-colorhandle-*` modifier surface (standard 2nd-gen policy; no `--mod-*` exposure).
- **Largest risks**
  - The adaptive-contrast algorithm uses the handle's **own selected color** as a stand-in for the surrounding gradient — accurate on smooth gradients, approximate at steep/saturated edges (documented limitation per SWC-2295). It supersedes the prior "working as designed" exception (SWC-1134).
- **Major open decisions:** all resolved by team and source material. The only remaining sub-decision is confirming the `fill` attribute name during the API phase. The color-loupe half of SWC-2295 is intentionally out of scope here and ships as a separate fast-follow PR.

### Most blocking open questions

- **Q7** in [Design](#design): `Show handle fill` ships now (team decision); the only sub-decision left is the exact attribute name (recommended `fill`, boolean, default `true`).
- **Q2** in [Design](#design): the `rendering-and-styling-migration-analysis.md` exists but is still a stub ("full analysis in progress"); CSS/token specifics are sourced directly from `spectrum-css@spectrum-two` + 1st-gen until it is expanded. Non-blocking for API planning; tighten before Phase 5 (Styling).

> **Resolved by team and source material:**
> - Q1 (Figma reference) — Figma `S2 / Web (Desktop scale)` received.
> - Q3 (`focused`) — **team decision: keep `focused`** (no rename). Per RSP / the design spec, `focused` enlarges the handle only when the parent is focused (keyboard/programmatic); a click without parent focus sets `open` (loupe) instead of enlarging. The name is accurate, so it stays. (Supersedes both the earlier "internal-only" lean and the interim `highlighted` rename.)
> - Q4 (a11y analysis) — present and substantial; a11y checklist and the adaptive dual-border algorithm (RSP-2021 / SDS-16402) are now sourced from it.
> - Q5 (Epic) — Epic is **SWC-2137**.
> - `open` naming — **team decision: keep `open`** (not renamed to the Figma `Show color loupe` label).
> - `Show handle fill` scope — **team decision: ship now** (no longer deferred/additive).
> - Q6 (color-loupe half of SWC-2295) — **team decision: keep separate**; ships as a fast-follow PR for color-loupe, out of scope for this migration.

---

## 1st-gen API surface

**Source:** [`1st-gen/packages/color-handle/src/ColorHandle.ts`](../../../../1st-gen/packages/color-handle/src/ColorHandle.ts)
**Version:** `@spectrum-web-components/color-handle@1.7.0` <!-- verify exact published version before finalizing -->
**Custom element tag:** `sp-color-handle`

### Properties / attributes

| Property   | Type    | Default                  | Attribute  | Notes |
| ---------- | ------- | ------------------------ | ---------- | ----- |
| `color`    | String  | `'rgba(255, 0, 0, 0.5)'` | `color`    | CSS color shown inside the handle; alpha reveals the opacity checkerboard. |
| `disabled` | Boolean | `false`                  | `disabled` | Reflected. Suppresses the loupe (`open && !disabled`). |
| `focused`  | Boolean | `false`                  | `focused`  | Reflected. Set by the parent color component; drives the focused visual. |
| `open`     | Boolean | `false`                  | `open`     | Reflected. Shows the nested loupe; auto-toggled by touch pointer events. |

### Methods

| Method | Signature | Notes |
| ------ | --------- | ----- |
| _None_ | —         | No public methods. Internal `handlePointerdown` / `handlePointerup` are private. |

### Events

None. The component dispatches no custom events. It only listens internally for `pointerdown`, `pointerup`, and `pointercancel`.

### Slots

| Slot   | Content | Notes |
| ------ | ------- | ----- |
| _None_ | —       | No slots. Content (inner color swatch + loupe) is fully rendered by the component. |

### CSS custom properties

1st-gen exposes a large `--mod-colorhandle-*` modifier surface (size, border width/color, outer/inner border, animation duration/easing) plus `--mod-opacity-checkerboard-position`. This full modifier surface will not be carried forward to 2nd-gen.

### Shadow DOM output (rendered HTML)

```html
<!-- default -->
<div class="inner" style="background-color: rgba(255, 0, 0, 0.5)"></div>
<sp-color-loupe color="rgba(255, 0, 0, 0.5)"></sp-color-loupe>

<!-- open && !disabled -->
<div class="inner" style="background-color: rgba(255, 0, 0, 0.5)"></div>
<sp-color-loupe color="rgba(255, 0, 0, 0.5)" open></sp-color-loupe>
```

---

## Dependencies

| Package                                          | Version | Role |
| ------------------------------------------------ | ------- | ---- |
| `@spectrum-web-components/base`                  | 1st-gen | `SpectrumElement`, `html`, decorators. Replaced by `@spectrum-web-components/core` in 2nd-gen. |
| `@spectrum-web-components/color-loupe`           | 1st-gen | Rendered internally (`sp-color-loupe`). 2nd-gen equivalent (`swc-color-loupe`) already exists. |
| `@spectrum-web-components/opacity-checkerboard`  | 1st-gen | Checkerboard styles for transparent colors. In 2nd-gen this is a **shared stylesheet** (`2nd-gen/packages/swc/stylesheets/shared/opacity-checkerboard.css`), not a component. |

---

## Migration sequencing and prerequisites

### Dependency-aware recommendation

**Proceed independently — no prerequisite migration blocks this.** Both of color-handle's dependencies are already in 2nd-gen:

- `color-loupe` is migrated (`2nd-gen/packages/{core,swc}/components/color-loupe/`), including the `ColorLoupeBase` core class and `swc-color-loupe` element.
- `opacity-checkerboard` is reclassified as a shared CSS utility stylesheet (not a component migration).

color-handle should **compose `swc-color-loupe` internally** and **import the shared `opacity-checkerboard.css`**, exactly mirroring how 1st-gen composed its dependencies.

### Related components and ordering notes

- **`color-loupe`** — sibling color primitive, already migrated; provides the architectural pattern (`ColorLoupeBase` + `swc-color-loupe`) this plan follows.
- **`color-area` / `color-slider` / `color-wheel`** — the parents that will eventually consume `swc-color-handle`. Not yet migrated. color-handle does **not** depend on them and can ship first; it owns no a11y/keyboard semantics of its own (those live in the parents).
- **SWC-2295** couples color-handle and color-loupe under one adaptive-contrast behavior. The loupe change (make its inner border adaptive) is a separate non-breaking edit to the already-shipped loupe; this plan covers only the **color-handle** half.

### User confirmation needed

- ✅ **Confirmed:** core/SWC split for color-handle.
- ✅ **Confirmed:** keep the loupe built-in (composed internally), not slotted.
- ✅ **Confirmed:** the matching color-loupe adaptive-border work (SWC-2295) is kept **separate** and ships as a **fast-follow PR** for color-loupe; it is out of scope for this color-handle migration.

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
| B1  | Element tag rename (source: 2nd-gen naming convention) | `<sp-color-handle>` | `<swc-color-handle>` | Update tag name and import path; properties unchanged. |
| B2  | Import surface | `@spectrum-web-components/color-handle` | 2nd-gen `core` + `swc` packages | Update package import; side-effect registration via `swc-color-handle.js`. |
| B3  | Remove `--mod-colorhandle-*` modifier surface (source: 2nd-gen custom-property policy) | Many `--mod-*` hooks for size/border/animation | No `--mod-*` exposure; a small reviewed `--swc-*` set only if needed | Replace any `--mod-colorhandle-*` overrides with supported `--swc-*` props or remove. |
| B8  | Add `fill` option (source: Figma S2 `Show handle fill`; team decision to ship now) | No such option; inner color swatch always shown | Public reflected `fill` boolean, default `true` (swatch shown); `fill=false` renders an outline-only handle | Additive for existing markup (default preserves current look); opt in to `fill="false"` for outline-only. |

> `focused` is **retained unchanged** from 1st-gen (team decision; see TL;DR and Q3) — it is not a breaking change, so it has no row here. Behavior is documented under [Behavioral semantics](#behavioral-semantics). The interim B7 rename to `highlighted` was withdrawn.

#### Styling and visuals

| #   | What changes | 1st-gen behavior | 2nd-gen behavior | Consumer migration path |
| --- | ------------ | ---------------- | ---------------- | ----------------------- |
| B4  | Focus indicator (source: SWC-2295, design spec) | `focused` drives a focus visual; default look uses static white border | Handle **grows (~2×) when `focused`** (parent keyboard/programmatic focus) and shrinks on blur; growth **is** the focus indicator (no separate ring). A click without parent focus sets `open` (loupe), not the grown state | None for consumers; visual-only. `focused` attribute name unchanged. |
| B5  | Baseline CSS source | 1st-gen `spectrum-color-handle.css` + overrides | Rebuilt from `spectrum-css@spectrum-two/components/colorhandle/index.css` with S2 tokens | None; internal. |

#### Accessibility and behavior

| #   | What changes | 1st-gen behavior | 2nd-gen behavior | Consumer migration path |
| --- | ------------ | ---------------- | ---------------- | ----------------------- |
| B6  | Adaptive non-text contrast (source: SWC-2295, supersedes SWC-1134) | Static border; chrome often **< 3:1** vs underlying color | **Adaptive white-first dual border**: border stays default when the white separator already gives enough contrast, strengthens only where needed; targets **≥3:1 (WCAG 1.4.11)** across the spectrum | None; automatic. |

### Additive — ships when ready, zero breakage for consumers already on 2nd-gen

| #   | What is added | Notes |
| --- | ------------- | ----- |
| A1  | Exact-surrounding-color reference for contrast | SWC-2295 scopes v1 to the control's own color; using the true adjacent gradient color (with edge handling) is a future enhancement. |
| A2  | Reviewed `--swc-color-handle-*` custom properties | Add only if a concrete consumer need appears; additive, documented with `@cssprop`. |

> The Figma `Show handle fill` option was previously listed here as A3 (deferred). Per team decision it ships in this migration; see **B8** under Must ship.

---

## 2nd-gen API decisions

These are derived from the 1st-gen implementation, SWC-2295, the migrated `color-loupe` pattern, `spectrum-css@spectrum-two`, the Figma **`S2 / Web (Desktop scale)`** Color handle spec (Published; updated Jun 4 2025, Miruna S.), and the color-handle [accessibility migration analysis](./accessibility-migration-analysis.md).

> **Figma vs. web-API mapping.** The Figma spec describes *design* variants, which do not map 1:1 to web-component attributes. Figma exposes `State` (Default / Disabled), `Show handle fill` (default True), and `Show color loupe` (default False); it does **not** show `color` (a runtime value) or the focus visual. The web API keeps the behavioral attribute names (`disabled`, `open`, `focused`) rather than the design labels; `Show handle fill` maps to a new `fill` boolean shipping in this migration (B8); the parent-set focus visual stays `focused` (unchanged from 1st-gen).

Use lightweight confidence labels where helpful:

- **Confirmed**: directly supported by source material
- **Inferred**: recommended based on multiple signals, but not explicitly specified in one authoritative source
- **Open question**: unresolved and needs review or more input

### Public API

#### Properties / attributes (2nd-gen)

| Property   | Type    | Default                  | Attribute  | Notes |
| ---------- | ------- | ------------------------ | ---------- | ----- |
| `color`    | String  | `'rgba(255, 0, 0, 0.5)'` | `color`    | **Confirmed.** Unchanged from 1st-gen (SWC-2295 keeps the name). Drives both the swatch and the adaptive-contrast decision. |
| `disabled` | Boolean | `false`                  | `disabled` | **Confirmed.** Reflected. Suppresses the loupe. |
| `open`        | Boolean | `false`                  | `open`        | **Confirmed (team).** Reflected. Shows the built-in loupe; auto-toggled by touch. Maps to Figma `Show color loupe`; keep the behavioral name `open` (not renamed). |
| `focused`     | Boolean | `false`                  | `focused`     | **Confirmed (team), unchanged from 1st-gen.** Reflected. Parent-set flag: enlarges the handle (~2×) when the parent picker is focused (keyboard/programmatic). A click without parent focus opens the loupe (`open`) instead of enlarging — so the name stays accurate (RSP / design spec). |
| `fill`        | Boolean | `true`                   | `fill`        | **Confirmed (team), new (B8).** Reflected. `true` shows the inner color swatch (1st-gen behavior); `false` renders an outline-only handle. Maps to Figma `Show handle fill`. Attribute name `fill` is the recommendation; confirm in API phase. |

#### Visual matrix (2nd-gen)

Figma S2 exposes only the `State` enum plus two booleans; there is no size/variant/treatment/static-color matrix.

| Figma property     | Type    | Default | Options            | Web-API mapping |
| ------------------ | ------- | ------- | ------------------ | --------------- |
| `State`            | Variant | Default | Default, Disabled  | `disabled` boolean (`Disabled` → `disabled`). |
| `Show handle fill` | Boolean | True    | True, False        | **New, ships now (B8).** `fill` boolean, default `true` (inner color swatch shown). `false` = outline-only handle. |
| `Show color loupe` | Boolean | False   | True, False        | `open` boolean. |

State-driven appearance: default, disabled, open → loupe visible, `focused` → grown (~2×) focus visual (parent sets `focused`; not shown as a static Figma variant). Exact pixel sizes, border weights, and grow deltas come from `spectrum-css@spectrum-two` tokens (see Styling).

> **Sizing note (Figma):** the **outer border is not included** in the handle's size. Account for this in the CSS box model (outer border as box-shadow, not part of `inline-size`/`block-size`), matching the 1st-gen approach.

#### Slots (2nd-gen)

N/A — no slots. The loupe stays **built-in** (rendered internally as `swc-color-loupe`), per confirmed team decision; it is not exposed as a slot.

#### CSS custom properties (2nd-gen)

No `--mod-*` properties will be exposed. New `--swc-*` component-level properties may be introduced where needed — these are additive and not breaking. See [Component Custom Property Exposure](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#component-custom-property-exposure) for what to expose and how.

Each exposed `--swc-*` property must be documented with a `@cssprop` JSDoc tag on the primary SWC component class. Storybook picks these up and surfaces them in the API docs panel automatically.

Initial expectation for Color Handle is a small reviewed set (likely none at launch; size/animation handled by tokens internally).

### Behavioral semantics

- **Built-in loupe:** `render()` outputs the inner color swatch plus `<swc-color-loupe color=${color} ?open=${open && !disabled}>`. The handle owns the loupe lifecycle.
- **Touch pointer handling:** on `pointerdown` with `pointerType === 'touch'`, set `open = true` and capture the pointer; on `pointerup` / `pointercancel`, set `open = false` and release. Carry forward unchanged.
- **Focus vs. click model (RSP / design spec):** `focused` enlarges the handle to roughly twice its size and **is** the focus indicator (no separate ring; `:host(:focus) { outline: none }` retained). The handle enlarges **only** when the parent picker is focused — by keyboard or programmatically — not when the user clicks the handle. When the user clicks/touches the handle while the parent is **not** focused, the handle does **not** enlarge; instead `open` is set so the loupe appears. This separation is why `focused` remains an accurate name (it tracks real parent focus, not pointer interaction).
- **Adaptive white-first border (SWC-2295):** compute required border treatment from `color`. Keep the default border when the white separator/halo already yields ≥3:1; strengthen only when it does not. Reference color is the handle's own `color` (approximate at steep gradients — documented limitation).
- **Box model (Figma):** the outer border is **not** counted in the handle's size. Render the outer border as a box-shadow (as 1st-gen does) so sizing tokens describe the fill+inner-border circle only.

### Accessibility semantics notes (2nd-gen)

- color-handle is **not focusable on its own and exposes no ARIA role/name**; it is a visual indicator. Accessibility (label, value, keyboard) is owned by the parent color-area/slider/wheel. Mirror the `color-loupe` stance: keep the graphic decorative, do not trap focus when closed.
- The **only** net-new a11y obligation in this migration is **WCAG 1.4.11 non-text contrast** via the adaptive border (B6). This is a genuine improvement over 1st-gen, which accepted the gap (SWC-1134 "working as designed").
- The full adaptive dual-border algorithm (ring sampling, minimum-α search, additive white-separator check, edge mode) is specified in the [accessibility migration analysis](./accessibility-migration-analysis.md) per RSP-2021 / SDS-16402; implement from there in Phase 5.
- The `focused` attribute name matches the accessibility analysis and 1st-gen; no terminology divergence.

---

## Architecture: core vs SWC split

> The 1st-gen component is a **reference only** — 2nd-gen is built independently. Neither generation imports from the other.

Follow the [Badge migration reference](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#reference-badge-migration) as the concrete pattern for the core/SWC split, and the already-migrated `color-loupe` as the closest sibling example.

| Layer    | Path                                              | Contains |
| -------- | ------------------------------------------------- | -------- |
| **Core** | `2nd-gen/packages/core/components/color-handle/`  | `ColorHandle.base.ts` (abstract `ColorHandleBase`), `ColorHandle.types.ts`, the shared API (`color`, `disabled`, `open`, `focused`, `fill`), pointer/touch open-close behavior, and the adaptive-contrast helper logic. No S2 rendering/styling. |
| **SWC**  | `2nd-gen/packages/swc/components/color-handle/`   | `ColorHandle.ts` (`swc-color-handle`), `color-handle.css`, `swc-color-handle.ts` registration, stories, tests, and the S2 rendering/styling including grow-on-focus and the adaptive dual-border. |

Planned rendering shape:

- Core owns API normalization, pointer/touch state, and the contrast-decision helper.
- SWC renders: an inner color swatch (`background-color: color` over the shared opacity-checkerboard) and a built-in `swc-color-loupe` bound to `color` and `open && !disabled`; applies the adaptive dual-border and grow-on-focus styling.

---

## Migration checklist

### Preparation (this ticket)

- [x] 1st-gen API surface documented
- [x] Dependencies identified
- [x] Breaking changes documented
- [x] 2nd-gen API decisions drafted
- [ ] Plan reviewed by at least one other engineer

### Setup

- [ ] Create `2nd-gen/packages/core/components/color-handle/`
- [ ] Create `2nd-gen/packages/swc/components/color-handle/`
- [ ] Wire exports in both `package.json` files
- [ ] Check out `spectrum-css` at `spectrum-two` branch as sibling directory _(already present at `../spectrum-css` on `spectrum-two`)_

### API

#### Naming and public surface

- [ ] `ColorHandle.types.ts`: define the public property contract (`color: string`, `disabled/open/focused/fill: boolean`).
- [ ] `ColorHandle.base.ts`: retain `color`, `disabled`, `open`, `focused` as reflected properties; add `fill` (default `true`, B8); carry pointer/touch open-close behavior and the focus-vs-click model; add adaptive-contrast helper.
- [ ] `ColorHandle.ts` (`swc-color-handle`): render inner swatch + built-in `swc-color-loupe`; apply S2 styling.

#### Alignment checks

- [ ] Confirm the `fill` attribute name (B8/Q7) in implementation; `focused` and `open` are settled (kept unchanged).
- [ ] Verify the focus-vs-click model against RSP: handle enlarges only on parent focus (keyboard/programmatic); click without parent focus sets `open`.
- [ ] Confirm React Spectrum S2 color-handle (if it exists as a distinct primitive) does not introduce additional public API.

### Styling

> Follow the [CSS style guide](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/) as the source of truth for all styling work. Key references: [migration steps](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/04_spectrum-swc-migration.md), [custom properties](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md), [anti-patterns](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/05_anti-patterns.md).

- [ ] Add `.swc-ColorHandle` to the internal semantic element in `render()`; keep styling off `:host` where possible (note: 1st-gen relies on `:host` sizing/transitions — review during styling).
- [ ] Copy S2 source from `spectrum-css` `spectrum-two` branch `components/colorhandle/index.css` (not `/dist`) into `color-handle.css` as baseline.
- [ ] Import the shared `opacity-checkerboard.css` stylesheet for transparent-color display.

#### Visual model and regressions

- [ ] Implement grow-on-focus/press, shrink-on-blur as the focus indicator (B4); retain `outline: none` on focus.
- [ ] Implement adaptive white-first dual-border for ≥3:1 non-text contrast (B6).
- [ ] Verify i18n size modifiers (`:lang(ja)`, `:lang(ko)`, `:lang(zh)`) if present in S2 source _(unlikely for this primitive; confirm)_.
- [ ] Add `@cssprop` JSDoc tag to the primary SWC component class for every exposed `--swc-*` property (if any are exposed).
- [ ] Pass stylelint (property order, `no-descending-specificity`, token validation).

### Accessibility

<!-- Sourced from ./accessibility-migration-analysis.md (present) + SWC-2295. Finalize against the real 2nd-gen source in Phase 4. -->

#### Naming and semantics

- [ ] Confirm the handle exposes no ARIA role/name and is not independently focusable; a11y owned by parent color components (per the accessibility migration analysis).
- [ ] Keep any decorative graphics out of the accessibility tree (mirror color-loupe).

#### State verification

- [ ] Verify adaptive border maintains ≥3:1 across light, dark, and saturated hues (SWC-2295 acceptance criteria).
- [ ] Verify default appearance on mid/dark colors is unchanged (border strengthens only where needed).
- [ ] Document the own-color-reference limitation at steep gradient areas.

### Testing

- [ ] Port `1st-gen/packages/color-handle/test/color-handle.test.ts` coverage that still applies (default + `open` accessible; pointer open/close on touch `pointerdown`/`pointerup`/`pointercancel`).
- [ ] Port memory test (`color-handle-memory.test.ts`) equivalent if applicable.
- [ ] Add Playwright `color-handle.a11y.spec.ts` with `toMatchAriaSnapshot`.

#### Behavior

- [ ] Touch opens/closes the loupe; mouse/stylus does not auto-open.
- [ ] `disabled` suppresses the loupe even when `open`.
- [ ] Grow-on-focus and shrink-on-blur transitions fire.

#### Visual regression

- [ ] Add VRT coverage for the handle over color-area / color-slider / color-wheel gradients across the spectrum (SWC-2295 QA).
- [ ] Add VRT for default vs grown (focus/press) states and disabled.
- [ ] Add high-contrast (`forced-colors`) coverage (1st-gen ships a forced-colors block).

### Documentation

#### General

- [ ] JSDoc on all public props (no slots/events to document).
- [ ] Storybook stories placing the handle in realistic color-picker contexts, not on a bare canvas.
- [ ] Per-unit MDX documenting it as a primitive used inside color-area/slider/wheel.

#### Breaking changes

- [ ] Document the tag rename (`sp-color-handle` → `swc-color-handle`) and removal of `--mod-colorhandle-*` in the consumer migration guide (`focused` is unchanged).
- [ ] Document the new `fill` option (B8) and note the adaptive-contrast behavior change (improvement, non-breaking) and grow-on-focus indicator.

### Review

- [ ] `yarn lint:2nd-gen` passes (ESLint, Stylelint, Prettier)
- [ ] Status table in workstream doc updated
- [ ] PR created with description referencing Epic SWC-2137 and SWC-2295
- [ ] Peer engineer sign-off

---

## Blockers and open questions

During drafting, this section tracks active blockers and open questions. In the final review-ready plan, once core migration questions are resolved and deferred tickets exist, replace those drafting-time rows with a concise deferred-ticket table.

### Design

| #   | Item | Blocking? | Status | Owner |
| --- | ---- | --------- | ------ | ----- |
| Q1  | ~~No Figma reference.~~ **Resolved** — Figma `S2 / Web (Desktop scale)` Color handle received (Published, Jun 4 2025). Property model (`State`, `Show handle fill`, `Show color loupe`) and box-model note captured. Pixel/token sizing still sourced from `spectrum-css@spectrum-two` (see Q2). | No | Resolved | Design + implementation |
| Q2  | No `rendering-and-styling-migration-analysis.md` for color-handle. CSS baseline currently taken straight from `spectrum-css@spectrum-two` + 1st-gen. **Next:** confirm proceeding without it or produce it. | Yes | Open | CSS reviewer |
| Q7  | ~~Ship `Show handle fill` now or defer?~~ **Resolved (team): ship now** as `fill` boolean (default `true`), B8. Remaining sub-decision: confirm the attribute name `fill` during the API phase. | No | Resolved | Design + implementation |

### Architecture and behavior

| #   | Item | Blocking? | Status | Owner |
| --- | ---- | --------- | ------ | ----- |
| Q3  | ~~`focused` public vs internal-only / rename?~~ **Resolved (team): keep `focused` unchanged.** Per RSP / design spec, `focused` enlarges the handle (~2×) only on parent focus (keyboard/programmatic); a click without parent focus sets `open` instead. The name is accurate, so no rename. | No | Resolved | Architecture reviewer |

### Scope and prerequisites

| #   | Item | Blocking? | Status | Owner |
| --- | ---- | --------- | ------ | ----- |
| Q4  | ~~No color-handle `accessibility-migration-analysis.md`.~~ **Resolved** — present and substantial; a11y checklist and the adaptive dual-border algorithm (RSP-2021 / SDS-16402) are sourced from it. | No | Resolved | Accessibility reviewer |
| Q5  | ~~Epic number unknown.~~ **Resolved** — Epic is **SWC-2137**. | No | Resolved | Ticket owner |
| Q6  | ~~Is the color-loupe half of SWC-2295 sequenced separately?~~ **Resolved (team): kept separate**; ships as a **fast-follow PR** for color-loupe. Out of scope for this migration. | No | Resolved | Ticket owner |

<!-- Final-state deferred-ticket table columns: `Ticket`, `Deferred item`, `Why deferred`, `Related plan section`. -->

---

## References

- [Washing machine workflow](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md)
- [2nd-gen migration status table](../../02_workstreams/02_2nd-gen-component-migration/01_status.md)
- [Accessibility migration analysis](./accessibility-migration-analysis.md) — present; includes the full adaptive dual-border algorithm (RSP-2021 / SDS-16402).
- [Rendering and styling migration analysis](./rendering-and-styling-migration-analysis.md) — present but currently a stub ("full analysis in progress"); expand before Phase 5.
- [Sibling reference — color-loupe accessibility migration analysis](../color-loupe/accessibility-migration-analysis.md)
- [Sibling reference — color-loupe rendering and styling migration analysis](../color-loupe/rendering-and-styling-migration-analysis.md)
- [CSS style guide — Component Custom Property Exposure](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#component-custom-property-exposure)
- [1st-gen source](../../../../1st-gen/packages/color-handle/src/ColorHandle.ts)
- [1st-gen tests](../../../../1st-gen/packages/color-handle/test/color-handle.test.ts)
- [1st-gen README](../../../../1st-gen/packages/color-handle/README.md)
- [2nd-gen color-loupe core base (pattern reference)](../../../../2nd-gen/packages/core/components/color-loupe/ColorLoupe.base.ts)
- [React Spectrum S2 ColorHandle](https://react-spectrum.adobe.com/) — confirm whether a distinct ColorHandle primitive page exists; it is typically internal to ColorArea/ColorSlider/ColorWheel.
- [Spectrum CSS — `colorhandle` on `spectrum-two`](https://github.com/adobe/spectrum-css/blob/spectrum-two/components/colorhandle/index.css) — S2 styling source of truth (sibling checkout at `../spectrum-css`, not `/dist`).
- Figma — **`S2 / Web (Desktop scale)`**, Color handle (Published; updated Jun 4 2025, Miruna S.). Properties: `State` (Default/Disabled), `Show handle fill` (default True), `Show color loupe` (default False). Note: outer border not included in handle size.
- [Badge migration reference](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#reference-badge-migration)
- [SWC-2295](https://jira.corp.adobe.com/browse/SWC-2295) — adaptive white-first border contrast for WCAG 1.4.11 (drives B6/B4).
- SWC-1134 — prior color-handle non-text-contrast exception, **superseded** by SWC-2295.
- Epic: [SWC-2137](https://jira.corp.adobe.com/browse/SWC-2137) - Color Handle epic
