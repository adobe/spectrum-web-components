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
    - [Must ship: breaking or a11y-required](#must-ship-breaking-or-a11y-required)
    - [Additive: ships when ready, zero breakage for consumers already on 2nd-gen](#additive-ships-when-ready-zero-breakage-for-consumers-already-on-2nd-gen)
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
> Driving a11y ticket: **SWC-2295**: _[Color Handle][Color Loupe] Adaptive (white-first) border contrast for WCAG 1.4.11_.
>
> This plan should provide recommendations, not just observations. Call out inconsistencies, propose better API or naming paths where appropriate, and make unresolved tradeoffs explicit for reviewers.

---

## TL;DR

`sp-color-handle` is a tiny, **non-interactive primitive**: a draggable dot rendered on top of `sp-color-area` / `sp-color-slider` / `sp-color-wheel` that shows the currently picked color (over an opacity checkerboard) and pops a `sp-color-loupe` on touch. It has **no public methods, no events, and no slots**; it exposes only four reflected properties (`color`, `disabled`, `focused`, `open`).

- **Must ship**
  - Rename element `sp-color-handle` to `swc-color-handle` (standard 2nd-gen tag change).
  - Build with the **core/SWC split** (`ColorHandleBase` in core, `swc-color-handle` in SWC), mirroring the already-migrated `color-loupe`.
  - Keep the **color loupe built-in** (component renders its own `swc-color-loupe`), matching 1st-gen behavior.
  - **New a11y requirement (SWC-2295):** adaptive **white-first dual-border** so handle chrome maintains **≥3:1 non-text contrast (WCAG 1.4.11)** across the full color spectrum, and **grow-on-focus/press as the focus indicator** (no separate focus ring).
  - **Keep `focused`** (_team decision_). Following RSP and the design spec, `focused` enlarges the handle (~2×) only when the **parent** is focused (keyboard or programmatic), so the name is accurate. A click on the handle while the parent is not focused does **not** enlarge it; it sets `open` so the loupe appears instead. No rename needed.
  - **Ship `Show handle fill` now** (_team decision_): low-effort enough to include in the baseline migration rather than defer. New boolean (default: fill shown), not in 1st-gen.
  - Keep **`open`** as the attribute name (_team decision_), not renamed to match the Figma `Show color loupe` label.
  - Drop the entire 1st-gen `--mod-colorhandle-*` modifier surface (standard 2nd-gen policy; no `--mod-*` exposure).
- **Largest risks**
  - The adaptive-contrast algorithm uses the handle's **own selected color** as a stand-in for the surrounding gradient; accurate on smooth gradients, approximate at steep/saturated edges (documented limitation per SWC-2295). It supersedes the prior "working as designed" exception (SWC-1134).
- **Major open decisions:** all resolved by team and source material. The only remaining sub-decision is confirming the `fill` attribute name during the API phase. The color-loupe half of SWC-2295 is intentionally out of scope here and ships as a separate fast-follow PR.

### Most blocking open questions

- **Q7** in [Design](#design): `Show handle fill` ships now (team decision); the only sub-decision left is the exact attribute name (recommended `fill`, boolean, default `true`).
- **Q2** in [Design](#design): the `rendering-and-styling-migration-analysis.md` exists but is still a stub ("full analysis in progress"); CSS/token specifics are sourced directly from `spectrum-css@spectrum-two` + 1st-gen until it is expanded. Non-blocking for API planning; tighten before Phase 5 (Styling).

> **Resolved by team and source material:**
> - Q1 (Figma reference): Figma `S2 / Web (Desktop scale)` received.
> - Q3 (`focused`): **team decision: keep `focused`** (no rename). Per RSP and the design spec, `focused` enlarges the handle only when the parent is focused (keyboard/programmatic); a click without parent focus sets `open` (loupe) instead of enlarging. The name is accurate, so it stays. (Supersedes both the earlier "internal-only" lean and the interim `highlighted` rename.)
> - Q4 (a11y analysis): present and substantial; the a11y checklist and the adaptive dual-border algorithm (RSP-2021, SDS-16402) are now sourced from it.
> - Q5 (Epic): Epic is **SWC-2137**.
> - `open` naming: **team decision: keep `open`** (not renamed to the Figma `Show color loupe` label).
> - `Show handle fill` scope: **team decision: ship now** (no longer deferred/additive).
> - Q6 (color-loupe half of SWC-2295): **team decision: keep separate**; ships as a fast-follow PR for color-loupe, out of scope for this migration.

---

## 1st-gen API surface

**Source:** [`1st-gen/packages/color-handle/src/ColorHandle.ts`](../../../../1st-gen/packages/color-handle/src/ColorHandle.ts)
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
| _None_ | N/A       | No public methods. Internal `handlePointerdown` / `handlePointerup` are private. |

### Events

None. The component dispatches no custom events. It only listens internally for `pointerdown`, `pointerup`, and `pointercancel`.

### Slots

| Slot   | Content | Notes |
| ------ | ------- | ----- |
| _None_ | N/A     | No slots. Content (inner color swatch + loupe) is fully rendered by the component. |

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
| `@spectrum-web-components/base`                  | 1st-gen | `SpectrumElement`, `html`, decorators. Replaced by `@adobe/spectrum-wc-core` in 2nd-gen. |
| `@spectrum-web-components/color-loupe`           | 1st-gen | Rendered internally (`sp-color-loupe`). 2nd-gen equivalent (`swc-color-loupe`) already exists. |
| `@spectrum-web-components/opacity-checkerboard`  | 1st-gen | Checkerboard styles for transparent colors. In 2nd-gen this is a **shared stylesheet** (`2nd-gen/packages/swc/stylesheets/shared/opacity-checkerboard.css`), not a component. |

---

## Migration sequencing and prerequisites

### Dependency-aware recommendation

**Proceed independently: no prerequisite migration blocks this.** Both of color-handle's dependencies are already in 2nd-gen:

- `color-loupe` is migrated (`2nd-gen/packages/{core,swc}/components/color-loupe/`), including the `ColorLoupeBase` core class and `swc-color-loupe` element.
- `opacity-checkerboard` is reclassified as a shared CSS utility stylesheet (not a component migration).

color-handle should **compose `swc-color-loupe` internally** and **import the shared `opacity-checkerboard.css`**, exactly mirroring how 1st-gen composed its dependencies.

### Related components and ordering notes

- **`color-loupe`**: sibling color primitive, already migrated; provides the architectural pattern (`ColorLoupeBase` + `swc-color-loupe`) this plan follows.
- **`color-area` / `color-slider` / `color-wheel`**: the parents that will eventually consume `swc-color-handle`. Not yet migrated. color-handle does **not** depend on them and can ship first; it owns no a11y/keyboard semantics of its own (those live in the parents).
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
> - **Accessibility is non-negotiable:** all a11y requirements ship as part of this migration.
> - **Breaking changes** are assessed on merit; some must ship now to avoid a second, more disruptive migration event later.
> - **Additive changes** can be deferred and will not cause consumer breakage when they do ship.

### Must ship: breaking or a11y-required

#### API and naming

| #   | What changes | 1st-gen behavior | 2nd-gen behavior | Consumer migration path |
| --- | ------------ | ---------------- | ---------------- | ----------------------- |
| B1  | Element tag rename (source: 2nd-gen naming convention) | `<sp-color-handle>` | `<swc-color-handle>` | Update tag name and import path; properties unchanged. |
| B2  | Import surface | `@spectrum-web-components/color-handle` | 2nd-gen `core` + `swc` packages | Update package import; side-effect registration via `swc-color-handle.js`. |
| B3  | Remove `--mod-colorhandle-*` modifier surface (source: 2nd-gen custom-property policy) | Many `--mod-*` hooks for size/border/animation | No `--mod-*` exposure; a small reviewed `--swc-*` set only if needed | Replace any `--mod-colorhandle-*` overrides with supported `--swc-*` props or remove. |
| B7  | Add `fill` option (source: Figma S2 `Show handle fill`; team decision to ship now) | No such option; inner color swatch always shown | Public reflected `fill` boolean, default `true` (swatch shown); `fill=false` renders an outline-only handle | Additive for existing markup (default preserves current look). `fill` is a reflected boolean, so opt into outline-only by **setting the property `fill = false`** (or omitting the reflected attribute) — not with `fill="false"`, which reads as `true` under boolean-attribute semantics. |

> `focused` is **retained unchanged** from 1st-gen (team decision; see TL;DR and Q3). It is not a breaking change, so it has no row here. Behavior is documented under [Behavioral semantics](#behavioral-semantics). An interim proposal to rename `focused` to `highlighted` was considered and withdrawn.

#### Styling and visuals

| #   | What changes | 1st-gen behavior | 2nd-gen behavior | Consumer migration path |
| --- | ------------ | ---------------- | ---------------- | ----------------------- |
| B4  | Focus indicator (source: SWC-2295, design spec) | `focused` drives a focus visual; default look uses static white border | Handle **grows (~2×) when `focused`** (parent keyboard/programmatic focus) and shrinks on blur; growth **is** the focus indicator (no separate ring). A click without parent focus sets `open` (loupe), not the grown state | None for consumers; visual-only. `focused` attribute name unchanged. |
| B5  | Baseline CSS source | 1st-gen `spectrum-color-handle.css` + overrides | Rebuilt from `spectrum-css@spectrum-two/components/colorhandle/index.css` with S2 tokens | None; internal. |

#### Accessibility and behavior

| #   | What changes | 1st-gen behavior | 2nd-gen behavior | Consumer migration path |
| --- | ------------ | ---------------- | ---------------- | ----------------------- |
| B6  | Adaptive non-text contrast (source: SWC-2295, supersedes SWC-1134) | Static border; chrome often **< 3:1** vs underlying color | **Adaptive white-first dual border**: border stays default when the white separator already gives enough contrast, strengthens only where needed; targets **≥3:1 (WCAG 1.4.11)** across the spectrum | None; automatic. |

### Additive: ships when ready, zero breakage for consumers already on 2nd-gen

| #   | What is added | Notes |
| --- | ------------- | ----- |
| A1  | Exact-surrounding-color reference for contrast | SWC-2295 scopes v1 to the control's own color; using the true adjacent gradient color (with edge handling) is a future enhancement. |
| A2  | Reviewed `--swc-color-handle-*` custom properties | Add only if a concrete consumer need appears; additive, documented with `@cssprop`. |

> The Figma `Show handle fill` option was previously listed here as A3 (deferred). Per team decision it ships in this migration; see **B7** under Must ship.

---

## 2nd-gen API decisions

These are derived from the 1st-gen implementation, SWC-2295, the migrated `color-loupe` pattern, `spectrum-css@spectrum-two`, the Figma **`S2 / Web (Desktop scale)`** Color Handle spec (Published; updated Jun 4 2025, Miruna S.), and the color-handle [accessibility migration analysis](./accessibility-migration-analysis.md).

> **Figma vs. web-API mapping.** The Figma spec describes *design* variants, which do not map 1:1 to web-component attributes. Figma exposes `State` (Default / Disabled), `Show handle fill` (default True), and `Show color loupe` (default False); it does **not** show `color` (a runtime value) or the focus visual. The web API keeps the behavioral attribute names (`disabled`, `open`, `focused`) rather than the design labels; `Show handle fill` maps to a new `fill` boolean shipping in this migration (B7); the parent-set focus visual stays `focused` (unchanged from 1st-gen).

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
| `focused`     | Boolean | `false`                  | `focused`     | **Confirmed (team), unchanged from 1st-gen.** Reflected. Parent-set flag: enlarges the handle (~2×) when the parent picker is focused (keyboard/programmatic). A click without parent focus opens the loupe (`open`) instead of enlarging, so the name stays accurate (RSP and design spec). |
| `fill`        | Boolean | `true`                   | `fill`        | **Confirmed (team), new (B7).** Reflected. `true` shows the inner color swatch (1st-gen behavior); `false` renders an outline-only handle. Maps to Figma `Show handle fill`. Attribute name `fill` is the recommendation; confirm in API phase. |

#### Visual matrix (2nd-gen)

Figma S2 exposes only the `State` enum plus two booleans; there is no size/variant/treatment/static-color matrix.

| Figma property     | Type    | Default | Options            | Web-API mapping |
| ------------------ | ------- | ------- | ------------------ | --------------- |
| `State`            | Variant | Default | Default, Disabled  | `disabled` boolean (`Disabled` maps to `disabled`). |
| `Show handle fill` | Boolean | True    | True, False        | **New, ships now (B7).** `fill` boolean, default `true` (inner color swatch shown). `false` = outline-only handle. |
| `Show color loupe` | Boolean | False   | True, False        | `open` boolean. |

State-driven appearance: default, disabled, open (loupe visible), and `focused` (grown ~2× focus visual; the parent sets `focused`, which is not shown as a static Figma variant). Exact pixel sizes, border weights, and grow deltas come from `spectrum-css@spectrum-two` tokens (see Styling).

> **Sizing note (Figma):** the **outer border is not included** in the handle's size. Account for this in the CSS box model (outer border as box-shadow, not part of `inline-size`/`block-size`), matching the 1st-gen approach.

#### Slots (2nd-gen)

N/A: no slots. The loupe stays **built-in** (rendered internally as `swc-color-loupe`), per confirmed team decision; it is not exposed as a slot.

#### CSS custom properties (2nd-gen)

No `--mod-*` properties will be exposed. New `--swc-*` component-level properties may be introduced where needed; these are additive and not breaking. See [Component Custom Property Exposure](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#component-custom-property-exposure) for what to expose and how.

Each exposed `--swc-*` property must be documented with a `@cssprop` JSDoc tag on the primary SWC component class. Storybook picks these up and surfaces them in the API docs panel automatically.

Initial expectation for Color Handle is a small reviewed set (likely none at launch; size/animation handled by tokens internally).

### Behavioral semantics

- **Built-in loupe:** `render()` outputs the inner color swatch plus `<swc-color-loupe color=${color} ?open=${open && !disabled}>`. The handle owns the loupe lifecycle.
- **Touch pointer handling:** on `pointerdown` with `pointerType === 'touch'`, set `open = true` and capture the pointer; on `pointerup` / `pointercancel`, set `open = false` and release. Carry forward unchanged.
- **Focus vs. click model (RSP and design spec):** `focused` enlarges the handle to roughly twice its size and **is** the focus indicator (no separate ring; `:host(:focus) { outline: none }` retained). The handle enlarges **only** when the parent picker is focused (by keyboard or programmatically), not when the user clicks the handle. When the user clicks/touches the handle while the parent is **not** focused, the handle does **not** enlarge; instead `open` is set so the loupe appears. This separation is why `focused` remains an accurate name (it tracks real parent focus, not pointer interaction).
- **Adaptive white-first border (SWC-2295):** compute required border treatment from `color`. Keep the default border when the white separator/halo already yields ≥3:1; strengthen only when it does not. Reference color is the handle's own `color` (approximate at steep gradients; documented limitation).
- **Box model (Figma):** the outer border is **not** counted in the handle's size. Render the outer border as a box-shadow (as 1st-gen does) so sizing tokens describe the fill+inner-border circle only.

### Accessibility semantics notes (2nd-gen)

- color-handle is **not focusable on its own and exposes no ARIA role/name**; it is a visual indicator. Accessibility (label, value, keyboard) is owned by the parent color-area/slider/wheel. Mirror the `color-loupe` stance: keep the graphic decorative, do not trap focus when closed.
- The **only** net-new a11y obligation in this migration is **WCAG 1.4.11 non-text contrast** via the adaptive border (B6). This is a genuine improvement over 1st-gen, which accepted the gap (SWC-1134 "working as designed").
- The full adaptive dual-border algorithm (ring sampling, minimum-α search, additive white-separator check, edge mode) is specified in the [accessibility migration analysis](./accessibility-migration-analysis.md) per RSP-2021 and SDS-16402; implement from there in Phase 5.
- The `focused` attribute name matches the accessibility analysis and 1st-gen; no terminology divergence.

---

## Architecture: core vs SWC split

> The 1st-gen component is a **reference only**; 2nd-gen is built independently. Neither generation imports from the other.

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

- [x] Create `2nd-gen/packages/core/components/color-handle/` (`ColorHandle.base.ts`, `ColorHandle.types.ts`, `index.ts`)
- [x] Create `2nd-gen/packages/swc/components/color-handle/` (`ColorHandle.ts`, `color-handle.css`, `index.ts`, `swc-color-handle.ts`, `stories/`, `test/`)
- [x] Wire exports in both `package.json` files — core: explicit `./components/color-handle` + `/index.js` entries added to `exports` and `typesVersions` (badge pattern); swc: covered by existing `./components/*.js` / `./components/*` wildcard exports, no edit needed
- [x] Check out `spectrum-css` at `spectrum-two` branch as sibling directory _(already present at `../spectrum-css` on `spectrum-two`)_

### API

#### Naming and public surface

- [x] `ColorHandle.types.ts`: define the public property contract (`color: string`, `disabled/open/focused/fill: boolean`) via the `ColorHandleProperties` interface; `ColorHandleBase implements` it so class/interface drift is caught at compile time.
- [x] `ColorHandle.base.ts`: retains `color`, `disabled`, `open`, `focused` as reflected properties; `fill` added (default `true`, B7); pointer/touch open-close behavior carried from 1st-gen. _Adaptive-contrast helper deferred to Phase 5 (algorithm is specified in the accessibility migration analysis and implemented with styling), not Phase 3._
- [ ] `ColorHandle.ts` (`swc-color-handle`): render inner swatch + built-in `swc-color-loupe`; apply S2 styling. _(render stub in place from Phase 2; S2 styling is Phase 5.)_

> **No static `readonly` arrays, no `window.__swc.warn()` validation, and no 1st-gen deprecation notices in Phase 3.** Color Handle has no variant/size/treatment enums and no invalid-property-combination rules, so there is nothing to validate. 1st-gen `color-handle` exports only the `ColorHandle` class (no types/consts) and renames no properties (`color`/`disabled`/`focused`/`open` unchanged; `fill` is additive), so there is no 1st-gen surface to deprecate. The tag rename (`sp-` → `swc-`) and `--mod-*` removal are inherent 2nd-gen changes, not per-property deprecations.

#### Alignment checks

- [x] `fill` attribute name confirmed as the implementation name (B7/Q7 recommendation kept); `focused` and `open` settled (kept unchanged).
- [x] Focus-vs-click model verified against RSP and design spec: `focused` is parent-set and drives enlargement (Phase 5 visual); the handle's own touch `pointerdown` sets `open`. No handle-side code needed beyond the carried pointer handlers — the parent owns `focused`.
- [x] React Spectrum S2 color-handle introduces no additional public API; the surface stays at the five properties.

### Styling

> Follow the [CSS style guide](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/) as the source of truth for all styling work. Key references: [migration steps](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/04_spectrum-swc-migration.md), [custom properties](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md), [anti-patterns](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/05_anti-patterns.md).

- [x] Semantic internal classes used in `render()` (`.swc-ColorHandle-inner`, `.swc-ColorHandle-layer`, `.swc-ColorHandle-colorFill`). _Deviation from "keep styling off `:host`": the circle, white separator border, outer dark ring (box-shadow), size, and grow-on-focus stay on `:host`, matching 1st-gen. The parent positions `:host` and the handle centers itself via negative margins keyed to its own size, so the sized box must be `:host`; a wrapper would double the positioning contract. Documented per the checklist's own note that 1st-gen relies on `:host` sizing._
- [x] Rebuilt from `spectrum-css@spectrum-two` `components/colorhandle/index.css` as baseline, with S2 tokens and the SWC-2295 adaptive border layered on top.
- [x] Imports the shared `opacity-checkerboard.css` fragment (checkerboard layer behind the color-fill layer) for transparent-color display.

#### Visual model and regressions

- [x] Grow-on-focus as the focus indicator (B4): `:host([focused])` / `:host(:focus-visible)` enlarge to `color-handle-size-key-focus` with `outline: none`; `animation-duration-100` ease transition drives grow/shrink.
- [x] Adaptive white-first dual-border for ≥3:1 non-text contrast (B6): dark→white→dark stack (outer box-shadow, white `:host` border, inner inset shadow on `.swc-ColorHandle-colorFill`), with dark-border opacity computed by the core `computeBorderAlpha` helper (`color-contrast.ts`, own-color v1, white-first) and applied via `--_swc-color-handle-border-alpha`. _Contrast ≥3:1 across the spectrum is verified by tests/VRT in Phase 6._
- [x] i18n size modifiers: confirmed none in the S2 source for this primitive; n/a.
- [x] `@cssprop`: no public `--swc-*` properties are exposed (size/animation handled by tokens; `--_swc-color-handle-border-alpha` is private; `--swc-color-handle-picked-color` is component-set internal, mirroring color-loupe). None to document, matching the plan's "likely none at launch."
- [x] Stylelint passes (property order auto-fixed; no `no-descending-specificity` or token-validation errors).

### Accessibility

<!-- Sourced from ./accessibility-migration-analysis.md (present) + SWC-2295. Finalize against the real 2nd-gen source in Phase 4. -->

#### Naming and semantics

- [x] Confirmed: the handle sets no host `role`, no `aria-label`, and no `tabindex` (verified by absence in `ColorHandle.base.ts` / `ColorHandle.ts`); a11y owned by parent color components (per the accessibility migration analysis). `disabled`/`focused`/`open` are reflected visual states, not ARIA states.
- [x] Confirmed: decorative graphics stay out of the accessibility tree. The built-in `swc-color-loupe` renders its SVG with `aria-hidden="true"` (mirrors color-loupe); the handle adds no graphic role of its own. No cross-root ARIA, no live regions.

#### State verification

> Implemented in Phase 5 (Styling): the adaptive white-first dual-border and grow-on-focus now exist (`color-contrast.ts` + `color-handle.css`). The algorithm follows the accessibility migration analysis (RSP-2021, SDS-16402). Numeric ≥3:1 verification across the spectrum is a Phase 6 test/VRT task.

- [x] Adaptive border α logic verified by unit tests (`computeBorderAlpha`/`findMinAlpha`/`contrastRatio`): white-first holds the floor when white carries 3:1, escalates otherwise, and never returns below the floor. Full ≥3:1-across-the-spectrum confirmation over real gradients is a VRT task once a parent picker is migrated.
- [x] Default appearance on mid/dark colors is unchanged: white-first keeps α at the 0.42 floor whenever the white separator already carries 3:1, so the border strengthens only where needed.
- [x] Own-color-reference limitation documented: `computeBorderAlpha` uses the handle's own `color` as the adjacency stand-in (v1, A1), accurate on smooth gradients and approximate at steep/saturated edges; noted in the `color-contrast.ts` module JSDoc.

### Testing

- [x] Ported the applicable 1st-gen coverage as Storybook play tests in `test/color-handle.test.ts`: role-less/name-less host, `color` applied to the fill layer, adaptive border-alpha variable set, and touch pointer open/close (`pointerdown`/`pointerup`/`pointercancel`; mouse does not auto-open).
- [x] Added `computeBorderAlpha`/`findMinAlpha`/`contrastRatio` unit coverage (parser produces no `NaN`, floor fallback, white-first floor vs escalation) — directly covers the PR-review parser concern. _No separate memory test; 2nd-gen has no equivalent harness for this primitive._
- [x] Added Playwright `color-handle.a11y.spec.ts` asserting the role-less/name-less host and the built-in loupe SVG `aria-hidden` across chromium/firefox/webkit. _Uses direct attribute assertions rather than `toMatchAriaSnapshot`, which rejects the legitimately-empty tree (same approach as color-loupe)._

#### Behavior

- [x] Touch opens/closes the loupe; mouse does not auto-open (`TouchOpenCloseTest`).
- [x] `disabled` suppresses the loupe even when `open` (`DisabledSuppressesLoupeTest`).
- [ ] Grow-on-focus and shrink-on-blur transitions fire. _(covered visually; a `focused`/blur transition assertion is deferred to VRT below.)_

#### Visual regression

- [ ] Add VRT coverage for the handle over color-area / color-slider / color-wheel gradients across the spectrum (SWC-2295 QA). _(deferred: parent pickers not yet migrated; runs when a parent lands.)_
- [ ] Add VRT for default vs grown (focus/press) states and disabled. _(Chromatic VRT runs in CI on the stories; no separate local action.)_
- [ ] Add high-contrast (`forced-colors`) coverage (the CSS ships a `forced-colors` block). _(Chromatic VRT.)_

> Verified locally (Node 24.11.1): Vitest storybook project — 13 passed (5 play tests + 8 story smoke renders); Playwright a11y — 12 passed (3 browsers). `test-storybook` aXe run is blocked by an unrelated env issue (`@swc/core` native binding failure + jest haste collision from stray `.claude/worktrees/*` repo copies), not by color-handle; aXe still runs in CI.

### Documentation

#### General

- [x] JSDoc on all public props (`color`, `disabled`, `focused`, `open`, `fill`) on `ColorHandleBase`; the CEM captures them for the Storybook `<ApiTable />`. No slots/events to document. No public `--swc-*` properties, so no `@cssprop` tags.
- [x] Storybook stories authored with meaningful color values; each handle sits in its own positioned anchor (the primitive centers itself via negative margins). _Parent-embedded stories (handle inside color-area/slider/wheel) will be added when a parent picker is migrated; those components do not exist in 2nd-gen yet._
- [x] Per-unit MDX (`color-handle.mdx`) authored: Anatomy, Options (Colors, Fill), States, Behaviors (Adaptive contrast), Accessibility, and Upcoming features. Documents the handle as a primitive whose name/role/value/keyboard belong to the parent color-area/slider/wheel. `yarn lint:docs-pages` passes; Storybook shows a single docs entry (no duplicate).

#### Breaking changes

- [x] Tag rename (`sp-color-handle` to `swc-color-handle`) and removal of `--mod-colorhandle-*` documented in the consumer migration guide (`migration-guide.mdx`); `focused` noted as unchanged.
- [x] New `fill` option (B7, property-not-attribute for outline-only), the adaptive-contrast behavior change (improvement, non-breaking), and the grow-on-focus indicator documented in `migration-guide.mdx`.

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
| Q1  | ~~No Figma reference.~~ **Resolved**: Figma `S2 / Web (Desktop scale)` Color Handle received (Published, Jun 4 2025). Property model (`State`, `Show handle fill`, `Show color loupe`) and box-model note captured. Pixel/token sizing still sourced from `spectrum-css@spectrum-two` (see Q2). | No | Resolved | Design + implementation |
| Q2  | `rendering-and-styling-migration-analysis.md` exists but is still a stub ("full analysis in progress"). CSS baseline currently taken straight from `spectrum-css@spectrum-two` + 1st-gen. **Next:** expand it before Phase 5 (Styling). | No | Open | CSS reviewer |
| Q7  | ~~Ship `Show handle fill` now or defer?~~ **Resolved (team): ship now** as `fill` boolean (default `true`), B7. Remaining sub-decision: confirm the attribute name `fill` during the API phase. | No | Resolved | Design + implementation |

### Architecture and behavior

| #   | Item | Blocking? | Status | Owner |
| --- | ---- | --------- | ------ | ----- |
| Q3  | ~~`focused` public vs internal-only / rename?~~ **Resolved (team): keep `focused` unchanged.** Per RSP and the design spec, `focused` enlarges the handle (~2×) only on parent focus (keyboard/programmatic); a click without parent focus sets `open` instead. The name is accurate, so no rename. | No | Resolved | Architecture reviewer |

### Scope and prerequisites

| #   | Item | Blocking? | Status | Owner |
| --- | ---- | --------- | ------ | ----- |
| Q4  | ~~No color-handle `accessibility-migration-analysis.md`.~~ **Resolved**: present and substantial; the a11y checklist and the adaptive dual-border algorithm (RSP-2021, SDS-16402) are sourced from it. | No | Resolved | Accessibility reviewer |
| Q5  | ~~Epic number unknown.~~ **Resolved**: Epic is **SWC-2137**. | No | Resolved | Ticket owner |
| Q6  | ~~Is the color-loupe half of SWC-2295 sequenced separately?~~ **Resolved (team): kept separate**; ships as a **fast-follow PR** for color-loupe. Out of scope for this migration. | No | Resolved | Ticket owner |

<!-- Final-state deferred-ticket table columns: `Ticket`, `Deferred item`, `Why deferred`, `Related plan section`. -->

---

## References

- [Washing machine workflow](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md)
- [2nd-gen migration status table](../../02_workstreams/02_2nd-gen-component-migration/01_status.md)
- [Accessibility migration analysis](./accessibility-migration-analysis.md): present; includes the full adaptive dual-border algorithm (RSP-2021, SDS-16402).
- [Rendering and styling migration analysis](./rendering-and-styling-migration-analysis.md): present but currently a stub ("full analysis in progress"); expand before Phase 5.
- [Sibling reference: color-loupe accessibility migration analysis](../color-loupe/accessibility-migration-analysis.md)
- [Sibling reference: color-loupe rendering and styling migration analysis](../color-loupe/rendering-and-styling-migration-analysis.md)
- [CSS style guide: Component Custom Property Exposure](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#component-custom-property-exposure)
- [1st-gen source](../../../../1st-gen/packages/color-handle/src/ColorHandle.ts)
- [1st-gen tests](../../../../1st-gen/packages/color-handle/test/color-handle.test.ts)
- [1st-gen README](../../../../1st-gen/packages/color-handle/README.md)
- [2nd-gen color-loupe core base (pattern reference)](../../../../2nd-gen/packages/core/components/color-loupe/ColorLoupe.base.ts)
- [React Spectrum S2 ColorHandle](https://react-spectrum.adobe.com/): confirm whether a distinct ColorHandle primitive page exists; it is typically internal to ColorArea/ColorSlider/ColorWheel.
- [Spectrum CSS `colorhandle` on `spectrum-two`](https://github.com/adobe/spectrum-css/blob/spectrum-two/components/colorhandle/index.css): S2 styling source of truth (sibling checkout at `../spectrum-css`, not `/dist`).
- Figma: **`S2 / Web (Desktop scale)`**, Color Handle (Published; updated Jun 4 2025, Miruna S.). Properties: `State` (Default/Disabled), `Show handle fill` (default True), `Show color loupe` (default False). Note: outer border not included in handle size.
- [Badge migration reference](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#reference-badge-migration)
- SWC-2295: adaptive white-first border contrast for WCAG 1.4.11 (drives B6/B4).
- SWC-1134: prior color-handle non-text-contrast exception, **superseded** by SWC-2295.
- Epic: SWC-2137 - Color Handle epic
