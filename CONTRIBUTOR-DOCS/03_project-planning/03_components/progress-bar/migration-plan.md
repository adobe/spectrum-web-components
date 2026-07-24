<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Progress Bar / Progress bar migration plan

<!-- Document title (editable) -->

# Progress bar migration plan

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
    - [Indeterminate animation (progress-bar `progress-bar.css` only)](#indeterminate-animation-progress-bar-progress-barcss-only)
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

> **Epic SWC-1769** · **Phase 1 (planning): SWC-1771** · Planning output. Must be reviewed before implementation begins.
>
> This plan provides recommendations, not just observations. Inconsistencies, recommended naming or API changes, and unresolved tradeoffs are made explicit so reviewers can confirm or redirect.

---

## TL;DR

- **Component**: `<sp-progress-bar>` (1st-gen, `@spectrum-web-components/progress-bar@1.11.2`) → `<swc-progress-bar>` (2nd-gen).
- **What this is**: a non-focusable, read-only bar that shows **task progress** (0–100, or a custom range) or an **indeterminate** loading animation when completion time is unknown. ARIA pattern is **`role="progressbar"`**, distinct from `meter`'s scalar-measurement role (separate, already-migrated component).
- **Architecture (already decided)**: `<swc-progress-bar>` is the **second consumer of `LinearProgressMixin`**, the thin shared mixin in `core` that the Meter migration created **specifically so progress-bar could inherit it without further breaking changes**. The mixin already owns every property, computed value, and behavior the two components share (value clamping, fill-fraction, locale formatting, slot presence tracking, DEBUG warnings) and is intentionally silent on ARIA role and animation. Shared bar/track/fill/label-layout CSS already lives in `linear-progress-base.css`, consumed today by `meter.css` and to be consumed unchanged by `progress-bar.css`. **No changes to the mixin or shared CSS are planned by this migration** — progress bar adds only what is unique to it.
- **What progress bar adds on top of the shared layer**: `role="progressbar"` on the shadow wrapper; an `indeterminate` boolean; conditional suppression of all four `aria-value*` attributes (and the visible value text) when indeterminate; and the indeterminate fill animation in `progress-bar.css`. It has **no `variant` property** (single accent fill).
- **API alignment**: 2nd-gen aligns with [React Spectrum S2 ProgressBar](https://react-spectrum.adobe.com/ProgressBar) and the shared linear-progress surface validated during the Meter migration. Net effect: rename `progress` → `value`; add `minValue`/`maxValue`; replace `side-label` boolean with `label-position` enum; remove the already-deprecated `over-background`; expose `value-label` and `formatOptions`; expose `static-color` as `{white, black}`; add `label` + `description` named slots; keep `indeterminate`.
- **Must-ship breaking/a11y**: tag rename; move `role="progressbar"` off the host onto the shadow `.swc-LinearProgress` element; add `aria-valuemin`/`aria-valuemax`/`aria-valuetext` when determinate and **omit all value attributes when indeterminate**; drop `--mod-*` passthroughs for the shared `--swc-linear-progress-*` set; render inside a `<div class="swc-LinearProgress">` wrapper instead of styling the host; fix the 1st-gen DEBUG warning that incorrectly references `<sp-progress-circle>`.
- **Net-new from S2/React**: arbitrary numeric range (`minValue`/`maxValue`); custom `value-label`; custom `formatOptions` (JS property, full `Intl.NumberFormatOptions` pass-through); `static-color="black"`; `description` named slot.

### Most blocking open questions

- **Q1** (resolved — see [Architecture and behavior](#architecture-and-behavior)): the shared `LinearProgressMixin` hard-codes the meter docs URL in its two DEBUG warnings. **Decision:** de-hardcode the URL in the mixin via an overridable member that each concrete base class supplies, and give progress bar accurate issue text — fixing the 1st-gen copy-paste bug that references `<sp-progress-circle>` inside the `<sp-progress-bar>` warning. Carried into the API + Accessibility phases as a known task, not a blocker.
- **Q2** (see [Design](#design)): confirm the **indeterminate animation** treatment (keyframes, duration token, reduced-motion fallback). This is the one visual item not inherited from the Meter-validated surface. Source it from the [Figma S2 progress bar frame](https://www.figma.com/design/Mngz9H7WZLbrCvGQf3GnsY/S2---Web--Desktop-scale-?node-id=13059-181) and `spectrum-css` `spectrum-two` `progressbar/index.css`, then validate visually during the Styling phase. Soft blocker on Styling sign-off only.

---

## 1st-gen API surface

**Source:** [`1st-gen/packages/progress-bar/src/ProgressBar.ts`](../../../../1st-gen/packages/progress-bar/src/ProgressBar.ts)
**Version:** `@spectrum-web-components/progress-bar@1.11.2`
**Custom element tag:** `sp-progress-bar`

### Properties / attributes

| Property         | Type                   | Default     | Attribute         | Notes                                                                                                          |
| ---------------- | ---------------------- | ----------- | ----------------- | -------------------------------------------------------------------------------------------------------------- |
| `progress`       | `number`               | `0`         | `progress`        | 0–100. Drives `aria-valuenow`/`aria-valuetext` and the `transform: scaleX(...)` of the fill.                   |
| `indeterminate`  | `boolean`              | `false`     | `indeterminate`   | Reflected. When true, removes `aria-valuemin`/`max`/`now`/`text` and hides the percentage; runs fill animation. |
| `label`          | `string`               | `''`        | `label`           | Reflected. Mirrored to `aria-label` on update. Slot text is hoisted into `label` via `getLabelFromSlot`.        |
| `sideLabel`      | `boolean`              | `false`     | `side-label`      | Reflected. Layout-only.                                                                                        |
| `staticColor`    | `'white' \| undefined` | `undefined` | `static-color`    | Reflected. White only in 1st-gen.                                                                              |
| `overBackground` | `boolean`              | `false`     | `over-background` | **Deprecated** alias that sets `staticColor='white'` and warns. Slated for removal.                            |
| `size`           | `'s' \| 'm' \| 'l' \| 'xl'` | unset  | `size`            | From `SizedMixin({ noDefaultSize: true })`. No default size attribute is set.                                  |

### Methods

| Method | Signature | Notes              |
| ------ | --------- | ------------------ |
| —      | —         | No public methods. |

### Events

None custom. (No `dispatchEvent` calls in `ProgressBar.ts`.)

### Slots

| Slot      | Content                        | Notes                                                                                              |
| --------- | ------------------------------ | -------------------------------------------------------------------------------------------------- |
| (default) | Text labeling the progress bar | Mirrored into the `label` property via `ObserveSlotText` + `getLabelFromSlot`. Single naming path. |

### CSS custom properties

1st-gen exposes a broad `--mod-progressbar-*` modifier surface (fill/track/text color, thickness, font-size, line-height, min/max size, spacing, indeterminate animation duration and easing) inherited from `spectrum-progress-bar.css`. See the [rendering and styling migration analysis](./rendering-and-styling-migration-analysis.md) for the full list.

This full modifier surface will not be carried forward to 2nd-gen.

### Shadow DOM output (rendered HTML)

Rendered by `ProgressBar.render()` (both field labels are conditional on `label`/slot content; percentage is omitted when indeterminate):

```html
<sp-field-label size="[size]" class="label">
  <slot>[label]</slot>
</sp-field-label>
<sp-field-label size="[size]" class="percentage">[localized percent]</sp-field-label>
<div class="track">
  <div class="fill" style="transform: scaleX(calc([progress] / 100));"></div>
</div>
```

Plus the host receives `role="progressbar"` and the `aria-value*` attributes (omitted when `indeterminate`).

---

## Dependencies

| Package                                         | Version  | Role                                                                       |
| ----------------------------------------------- | -------- | -------------------------------------------------------------------------- |
| `@spectrum-web-components/base`                 | `1.11.2` | `SpectrumElement`, `SizedMixin`, `html`, `nothing`                         |
| `@spectrum-web-components/field-label`          | `1.11.2` | Internal `<sp-field-label>` used in `render()` (label + percentage)        |
| `@spectrum-web-components/reactive-controllers` | `1.11.2` | `LanguageResolutionController` for locale-aware percent formatting         |
| `@spectrum-web-components/shared`               | `1.11.2` | `ObserveSlotText`, `getLabelFromSlot`                                      |

2nd-gen equivalents:

| 1st-gen import                                             | 2nd-gen equivalent                                                                                         | Status                                                                                                                                       |
| ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `SpectrumElement` from `@spectrum-web-components/base`     | `@adobe/spectrum-wc-core/element/index.js`                                                           | Available                                                                                                                                    |
| `SizedMixin` from `@spectrum-web-components/base`          | `@adobe/spectrum-wc-core/mixins/index.js`                                                            | Available (applied inside `ProgressBarBase` exactly as in `MeterBase`)                                                                       |
| `LanguageResolutionController` from `reactive-controllers` | `@adobe/spectrum-wc-core/controllers/language-resolution.js`                                         | Available — already wired inside `LinearProgressMixin`                                                                                       |
| `getLabelFromSlot` from `shared`                           | Not needed — named `label` slot + `aria-labelledby` requires no text extraction                            | N/A                                                                                                                                          |
| `ObserveSlotText` from `shared`                            | Not needed — `label`/`description` slot presence tracked in `LinearProgressMixin` via `ObserveSlotPresence` | N/A                                                                                                                                          |
| `<sp-field-label>` rendered in shadow                      | `<swc-field-label>` does **not** exist yet                                                                 | **Not migrated** — render plain `<span class="swc-LinearProgress-label">` / `<span class="swc-LinearProgress-value">` (same as Meter, B8). |
| _(shared behavior with meter)_                             | `LinearProgressMixin` in `2nd-gen/packages/core/mixins/linear-progress-mixin.ts`                          | **Already exists** — created by the Meter migration for this exact purpose; consumed unchanged.                                              |

---

## Migration sequencing and prerequisites

### Dependency-aware recommendation

Progress bar **proceeds independently and now** — its only shared prerequisite already shipped. The Meter migration deliberately extracted `LinearProgressMixin` (core) and `linear-progress-base.css` (swc) ahead of need so progress bar would inherit a tested, reviewed contract with **zero additional breaking changes** to those shared files. This plan therefore treats both shared artifacts as **closed for additions**: progress-bar-specific behavior (`indeterminate`, `role="progressbar"`, the animation) lives entirely in the progress-bar layer.

### Related components and ordering notes

- **Meter** ([`2nd-gen/packages/swc/components/meter`](../../../../2nd-gen/packages/swc/components/meter/)) — fully migrated; the reference implementation for this migration's render shape, ARIA placement, slot model, and test structure. The two components are siblings under the same mixin; neither extends the other.
- **Progress circle** ([`2nd-gen/packages/swc/components/progress-circle`](../../../../2nd-gen/packages/swc/components/progress-circle/)) — migrated; the reference for the `role="progressbar"` determinate-vs-indeterminate ARIA pattern and the DEBUG accessible-name warning. Progress circle is circular and does **not** share `LinearProgressMixin` (different geometry), but its ARIA rules for `progressbar` are the closest precedent.
- **Field label** — internal render dependency only; not migrated. Render plain `<span>` elements (B8), same decision as Meter.

### User confirmation needed

- Confirm that `LinearProgressMixin` and `linear-progress-base.css` stay **closed for additions** in this migration (the recommended default). If a reviewer wants the indeterminate concern generalized into the shared layer for a future circular/linear unification, that is a larger decision and should be raised before the Styling phase.

---

## Changes overview

> **Priority framing:**
>
> - The full feature/functionality inventory above is the basis for what belongs in `Must ship` vs `Additive`.
> - **Must ship** items are required for this migration.
> - **Additive** items are deferred unless explicitly pulled in.
> - **Accessibility is non-negotiable.**
> - **Breaking changes** are assessed on merit — those that avoid a worse migration later ship now.

### Must ship — breaking or a11y-required

#### API and naming

| #      | What changes                       | 1st-gen behavior                                            | 2nd-gen behavior                                                                                  | Consumer migration path                                                                                  |
| ------ | ---------------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| **B1** | Custom element tag rename          | `<sp-progress-bar>`                                         | `<swc-progress-bar>`                                                                               | Update all tag references; install `@spectrum-web-components/swc-progress-bar`.                          |
| **B2** | `progress` → `value` rename. _(Source: React Spectrum S2 ProgressBar API; alignment with `<swc-meter>`.)_ | `progress` (number, 0–100)                  | `value` (number, default 0). Range bounded by `minValue`/`maxValue`.                              | Rename attribute/property. `<sp-progress-bar progress="50">` → `<swc-progress-bar value="50">`.         |
| **B3** | Add `minValue` and `maxValue`. _(Source: React Spectrum S2 ProgressBar API; shared mixin.)_ | No range customization; `progress` implicitly 0–100.        | `minValue` (number, default 0) and `maxValue` (number, default 100). `value` is clamped.          | None for consumers on the implicit 0–100 range. New API for arbitrary ranges.                            |
| **B4** | `side-label` boolean → `label-position` enum. _(Source: React Spectrum `labelPosition`; shared mixin.)_ | `<sp-progress-bar side-label>` boolean.     | `<swc-progress-bar label-position="side">`. Values: `'top'` (default), `'side'`.                  | Replace `side-label` with `label-position="side"`. Default (top) unchanged.                              |
| **B5** | Remove the deprecated `over-background`. _(Source: 1st-gen already marks it `@deprecated` in favor of `static-color`.)_ | `over-background` boolean sets `staticColor='white'` and warns. | Removed entirely. Not part of the 2nd-gen API.                                                | Replace `over-background` with `static-color="white"`.                                                   |
| **B6** | `--mod-*` passthroughs removed. _(Source: [CSS style guide — custom properties](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#component-custom-property-exposure).)_ | Customize via `--mod-progressbar-*`.        | Customize via the shared `--swc-linear-progress-*` set (`fill-color`, `track-color`, `text-color`, `thickness`, `font-size`, `top-to-text`). | Replace `--mod-progressbar-fill-color` → `--swc-linear-progress-fill-color`, `--mod-progressbar-thickness` → `--swc-linear-progress-thickness`, etc. Indeterminate animation `--mod-*` (duration/easing/fill-size) have no 2nd-gen replacement. |
| **B7** | `label` string attribute → `label` named slot. _(Source: alignment with `<swc-meter>`; B8/B11.)_ | `label="text"` attribute mirrored to `aria-label`; slot text hoisted into `label`. | Visible label via the **`label` named slot**; `accessibleLabel` (`accessible-label`) is the no-visible-label fallback. | Move label text into `<span slot="label">…</span>`, or set `accessible-label` when no visible label (e.g. indeterminate-only spinners). |

#### Styling and visuals

| #      | What changes                  | 1st-gen behavior                                  | 2nd-gen behavior                                                                                                | Consumer migration path                                                       |
| ------ | ----------------------------- | ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| **B8** | Internal label rendering. _(Source: contributor docs selector patterns; `role="progressbar"` does not pair with native `<label>`.)_ | `<sp-field-label>` rendered in shadow (label + percentage). | Plain `<span class="swc-LinearProgress-label">` / `<span class="swc-LinearProgress-value">`. The shadow role element uses `aria-labelledby` to reference the label `<span>`. | None for top-level consumers. Consumers querying `sp-field-label` inside shadow DOM update selectors. |
| **B8a**| Fill sizing via `inline-size`, not `transform`. _(Source: shared `linear-progress-base.css`; `<swc-meter>`.)_ | `transform: scaleX(calc(progress / 100))`. | `inline-size: <fillPercent>%` with a `min-inline-size` floor for 0% visibility (WCAG 1.4.11), reset to `0` when indeterminate. | None — internal rendering only. |

#### Accessibility and behavior

| #       | What changes                       | 1st-gen behavior                                                                  | 2nd-gen behavior                                                                                                            | Consumer migration path                                  |
| ------- | ---------------------------------- | --------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| **B9**  | ARIA role placement. _(Source: [accessibility-migration-analysis.md](./accessibility-migration-analysis.md); [WAI-ARIA 1.2 `progressbar`](https://www.w3.org/TR/wai-aria-1.2/#progressbar); alignment with `<swc-meter>` B9.)_ | `role="progressbar"` set on the host. | `role="progressbar"` set on the shadow `.swc-LinearProgress` element (not the host). All `aria-value*`/naming attributes live there. Host carries no ARIA. | None — AT-only. Tests/snapshots asserting host-level ARIA update. |
| **B10** | Determinate value attributes. _(Source: accessibility-migration-analysis.md; React S2 API.)_ | Only `aria-valuenow` (+ `aria-valuetext`) set; no `aria-valuemin`/`max`. | When determinate: `aria-valuemin=<minValue>`, `aria-valuemax=<maxValue>`, `aria-valuenow=<value>`, `aria-valuetext=<formatted value>` on the role element. | None — AT-only. |
| **B11** | Indeterminate value suppression. _(Source: accessibility-migration-analysis.md; APG progressbar pattern.)_ | Removes `aria-valuemin`/`max`/`now`/`text` when indeterminate (correct). | Same intent, preserved: all four attributes **fully omitted** (via `nothing`, not empty strings) when `indeterminate`; visible value text also omitted. | None — AT-only. |
| **B12** | Accessible-name model + warning fix. _(Source: accessibility-migration-analysis.md § Known 1st-gen issues; alignment with `<swc-meter>` B11.)_ | `aria-label` mirrors `label`; slot text hoists into `label`. DEBUG warning incorrectly lists `<sp-progress-circle>` in one bullet. | Two inputs: **`label` named slot** (`aria-labelledby`) and **`accessibleLabel`** fallback (`aria-label`). DEBUG warning fires when neither resolves a name, with **correct progress-bar copy and docs URL** (see Q1). | Consumers move `label="…"` into the `label` slot, or set `accessible-label`. |

### Additive — ships when ready, zero breakage for consumers already on 2nd-gen

| #      | What is added                | Notes                                                                                                                                                              |
| ------ | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **A1** | `static-color="black"`       | `spectrum-css` `spectrum-two` adds the `staticBlack` modifier. 1st-gen has white only. Already implemented in the shared `linear-progress-base.css`; ships for free. |
| **A2** | `description` named slot     | Parallel to meter. Renders into `<span class="swc-LinearProgress-description">`; the shadow role element `aria-describedby`-references it when the slot has assigned nodes. Already supported by the shared mixin + CSS. |
| **A3** | `value-label` (string attribute) | New for S2/React (`valueLabel`). Overrides the auto-formatted percent in both rendered text and `aria-valuetext`. Already supported by the shared mixin. Omitted when indeterminate. |
| **A4** | `formatOptions` JS property  | `Intl.NumberFormatOptions` object — JS property only, full pass-through. Default `{ style: 'percent' }`. Already supported by the shared mixin.                      |

---

## 2nd-gen API decisions

These are derived from the 1st-gen implementation, the [rendering and styling migration analysis](./rendering-and-styling-migration-analysis.md), the [accessibility migration analysis](./accessibility-migration-analysis.md), the shipped `<swc-meter>` implementation (shared-surface source of truth), `spectrum-css` `spectrum-two`, and the React S2 implementation. Confidence labels:

- **Confirmed**: directly supported by source material (including the shipped shared mixin/CSS).
- **Inferred**: recommended based on multiple signals; not explicitly specified in one authoritative source.
- **Open question**: unresolved; tracked in [Blockers and open questions](#blockers-and-open-questions).

### Public API

#### Properties / attributes (2nd-gen)

| Property        | Type                                    | Default                | Attribute          | Notes                                                                                                                                                  |
| --------------- | --------------------------------------- | ---------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `value`         | `number`                                | `0`                    | `value`            | **Confirmed.** Renamed from 1st-gen `progress`. Clamped to `[minValue, maxValue]`. Drives `aria-valuenow` and the bar fill. Inherited from the mixin. |
| `minValue`      | `number`                                | `0`                    | `min-value`        | **Confirmed.** Reflected. Bottom of the range. Inherited from the mixin.                                                                               |
| `maxValue`      | `number`                                | `100`                  | `max-value`        | **Confirmed.** Reflected. Top of the range. Inherited from the mixin.                                                                                  |
| `indeterminate` | `boolean`                               | `false`                | `indeterminate`    | **Confirmed.** **Progress-bar-only** — declared on `ProgressBarBase`, not the mixin. Reflected. Suppresses value attributes and runs the animation.    |
| `accessibleLabel` | `string`                              | `''`                   | `accessible-label` | **Confirmed.** No-visible-label fallback (e.g. indeterminate spinners with context). Sets `aria-label` on the role element. Inherited from the mixin.  |
| `valueLabel`    | `string \| undefined`                   | `undefined`            | `value-label`      | **Confirmed.** Custom value text. Overrides auto-formatted percent. Ignored when indeterminate. Inherited from the mixin.                              |
| `formatOptions` | `Intl.NumberFormatOptions \| undefined` | `{ style: 'percent' }` | _(property only)_  | **Confirmed.** JS property only. Full pass-through to `Intl.NumberFormat`. Inherited from the mixin.                                                    |
| `labelPosition` | `'top' \| 'side'`                       | `'top'`                | `label-position`   | **Confirmed.** Reflected. Replaces 1st-gen `side-label`. Inherited from the mixin.                                                                     |
| `staticColor`   | `'white' \| 'black' \| undefined`       | `undefined`            | `static-color`     | **Confirmed.** Reflected. Inherited from the mixin. `'auto'` (React) deferred — no S2 CSS support.                                                     |
| `size`          | `'s' \| 'm' \| 'l' \| 'xl'`             | `'m'`                  | `size`             | **Confirmed.** Default `m` per React Spectrum default and the shared `SizedMixin` config used by Meter.                                                 |

> **No `variant` property.** Unlike `<swc-meter>`, progress bar has a single accent fill (`accent-content-color-default`, the default in `linear-progress-base.css`). This is the principal API difference between the two components.

#### Visual matrix (2nd-gen)

Confirmed against the shipped `<swc-meter>` shared surface (Figma `S2 / Web (Desktop scale)`-validated during the Meter migration) and `spectrum-css` `spectrum-two` `progressbar/index.css`.

All sizes (`s`, `m` default, `l`, `xl`), both `label-position` values (`top` default, `side`), both `static-color` values (`white`, `black`), the full `value` range (0–100, including 0%/25%/50%/75%/100%), and both `label` + `description` slots are supported. The single visual axis unique to progress bar is the **determinate vs indeterminate** presentation:

| Mode            | Fill                                              | Value text | Value attributes               |
| --------------- | ------------------------------------------------- | ---------- | ------------------------------ |
| `determinate`   | Width `= fillPercent%`, `min-inline-size` floor   | Shown      | `valuemin/max/now/text` present |
| `indeterminate` | Sliding loop animation; `min-inline-size` reset 0 | Hidden     | All four omitted                |

The indeterminate animation specifics (keyframes, duration, easing, reduced-motion fallback) are tracked as **Q2** — they are the one visual item not inherited from the Meter-validated surface.

#### Slots (2nd-gen)

| Slot          | Content                                | Notes                                                                                                                                                      |
| ------------- | -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `label`       | Visible progress-bar label             | **Confirmed.** Renders inside `<span class="swc-LinearProgress-label">`; the container id is referenced by `aria-labelledby` on the role element. Inherited from the mixin. |
| `description` | Description text below the progress bar | **Confirmed.** Renders inside `<span class="swc-LinearProgress-description">`; `aria-describedby`-referenced when the slot has assigned nodes. Inherited from the mixin.    |

#### CSS custom properties (2nd-gen)

No `--mod-*` properties will be exposed. New `--swc-*` component-level properties may be introduced where needed — these are additive and not breaking. See [Component Custom Property Exposure](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#component-custom-property-exposure) for what to expose and how.

Each exposed `--swc-*` property must be documented with a `@cssprop` JSDoc tag on the primary SWC component class.

Progress bar exposes the **same shared linear-progress surface** as Meter (defined in `swc/stylesheets/_lit-styles/linear-progress-base.css`):

- `--swc-linear-progress-fill-color` — overrides the bar fill color (default accent for progress bar).
- `--swc-linear-progress-track-color` — overrides the bar track color.
- `--swc-linear-progress-text-color` — overrides the label and value text color.
- `--swc-linear-progress-thickness` — overrides the bar thickness.
- `--swc-linear-progress-font-size` — overrides the label and value font size.
- `--swc-linear-progress-top-to-text` — overrides the spacing between the bar and the text.

No progress-bar-only custom property is planned. The indeterminate animation reads its dimensions from the existing thickness/max-size tokens; no public knob is exposed for the animation (matching the no-`--mod-*` decision).

### Behavioral semantics

- **Read-only display.** Host is not focusable. No `tabindex`. Keyboard skips the component. (Shared with meter.)
- **Value clamping.** `value` is clamped into `[minValue, maxValue]` for both rendering and `aria-valuenow`. Handled entirely by the mixin's `clampedValue`/`fillPercent` getters.
- **Indeterminate gating (progress-bar-only).** When `indeterminate` is true: (1) the render template omits `aria-valuemin`/`max`/`now`/`text` using Lit `nothing`; (2) the visible value `<span>` is omitted from the render (not hidden via CSS), so no stale percent is exposed; (3) `progress-bar.css` resets the fill's `min-inline-size` to `0`, drops the determinate `inline-size` transition, and applies the sliding animation.
- **Locale-aware formatting.** When determinate and `value-label` is unset, the mixin formats the visible value and `aria-valuetext` via `Intl.NumberFormat`. Re-formats on locale change and on `value`/`minValue`/`maxValue`/`valueLabel`/`formatOptions` changes.
- **`value-label` precedence.** Non-empty `value-label` overrides the auto-formatted text when determinate. Ignored when indeterminate.
- **No `variant`.** Single accent fill. No variant validation logic.
- **No custom events.** Behavior parity with 1st-gen.

### Accessibility semantics notes (2nd-gen)

Sourced from [`accessibility-migration-analysis.md`](./accessibility-migration-analysis.md), the React Spectrum S2 ProgressBar API, and the shipped `<swc-progress-circle>` ARIA pattern:

- `role="progressbar"` is set on the shadow `.swc-LinearProgress` element in the render template — never on the host, never author-overridable. (B9; the 1st-gen "accepts user `role`" behavior is intentionally dropped — progress bar satisfies exactly one semantic role.)
- **Determinate:** `aria-valuemin=<minValue>`, `aria-valuemax=<maxValue>`, `aria-valuenow=<clamped value>`, `aria-valuetext=<formatted value>` on the role element; re-rendered on relevant property changes and on locale change. (B10)
- **Indeterminate:** all four value attributes are absent from the DOM (Lit `nothing`), not set to empty strings. (B11)
- **Accessible name** resolves in order: (1) `label` slot content → `aria-labelledby="<label-container-id>"`; (2) `accessibleLabel` → `aria-label`. Default slot text is not a name source. DEBUG warning when neither resolves a name.
- **Description.** When the `description` slot has assigned nodes, `aria-describedby` references its container id; otherwise the container is conditionally omitted.
- **Cross-root ARIA:** none — role element and slot containers share one shadow root, so `aria-labelledby`/`aria-describedby` reference same-root IDs.
- **DEBUG warning copy (Q1).** Must reference `<swc-progress-bar>` and its docs URL, fixing the 1st-gen bug that lists `<sp-progress-circle>`. Because the shared mixin currently hard-codes the meter docs URL, `ProgressBarBase` must supply progress-bar-correct warning copy/URL.
- **Motion.** Indeterminate animation must honor `prefers-reduced-motion` (WCAG 2.3.3 / 2.2.2): the shared base already zeroes the determinate `transition`; `progress-bar.css` must also suppress the `animation` and render a static fallback fill so the busy state stays perceivable.
- **0% non-text contrast (WCAG 1.4.11).** The shared CSS already applies a `min-inline-size` floor on the determinate fill so a 0% bar stays visible at ≥3:1. Verify against `static-color` and photo backgrounds.
- No `aria-live` by default; `aria-live="assertive"` is explicitly forbidden by the a11y analysis.

---

## Architecture: core vs SWC split

> The 1st-gen component is a **reference only** — 2nd-gen is built independently. Neither generation imports from the other.

Follow the [Badge migration reference](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#reference-badge-migration) as the concrete pattern, and `<swc-meter>` as the direct sibling reference.

| Layer    | Path                                              | Contains                                                                                                                                                                                                                                                  |
| -------- | ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Mixin (existing)** | `2nd-gen/packages/core/mixins/linear-progress-mixin.ts` | `LinearProgressMixin`. **Already built and tested by the Meter migration.** Consumed unchanged. Owns all shared props, computed getters, locale formatting, slot tracking, and DEBUG warnings.                                                            |
| **Core** | `2nd-gen/packages/core/components/progress-bar/`  | `ProgressBar.base.ts` (extends `LinearProgressMixin(SizedMixin(SpectrumElement, …))`), `ProgressBar.types.ts`, `index.ts`. Owns only what is progress-bar-specific: the `indeterminate` typed property; progress-bar-correct DEBUG warning copy/URL (Q1). **No rendering.** |
| **SWC**  | `2nd-gen/packages/swc/components/progress-bar/`   | `ProgressBar.ts` (extends `ProgressBarBase`), `progress-bar.css`, `index.ts`, `swc-progress-bar.ts` registration, `stories/`, `test/`, `migration-guide.mdx`, `progress-bar.mdx`. Owns: S2 rendering with the `swc-LinearProgress` wrapper, `role="progressbar"` + conditional `aria-value*` bindings, indeterminate gating in the template. Imports `linear-progress-base.css` for shared rules. |
| **Shared CSS (existing)** | `2nd-gen/packages/swc/stylesheets/_lit-styles/linear-progress-base.css` | **Already built by the Meter migration.** Consumed unchanged. Bar/track/fill structure, sizes, label/value layout, static colors, reduced-motion, forced-colors.                                                                                          |

Planned rendering shape for `ProgressBar.ts.render()`:

```html
{/* Host (<swc-progress-bar>) carries no ARIA. */}
<div
  class="swc-LinearProgress"
  role="progressbar"
  aria-valuemin=${indeterminate ? nothing : sanitizedMin}
  aria-valuemax=${indeterminate ? nothing : sanitizedMax}
  aria-valuenow=${indeterminate ? nothing : clampedValue}
  aria-valuetext=${indeterminate ? nothing : formattedValue}
  aria-labelledby=${ifDefined(hasLabel ? labelContainerId : undefined)}
  aria-label=${ifDefined(!hasLabel && accessibleLabel ? accessibleLabel : undefined)}
  aria-describedby=${ifDefined(hasDescription ? descriptionContainerId : undefined)}
>
  ${hasLabel
    ? html`<span id=${labelContainerId} class="swc-LinearProgress-label"><slot name="label"></slot></span>`
    : nothing}
  ${indeterminate
    ? nothing
    : html`<span class="swc-LinearProgress-value">${formattedValue}</span>`}
  <div class="swc-LinearProgress-track">
    <div
      class="swc-LinearProgress-fill"
      style=${indeterminate ? nothing : `inline-size: ${fillPercent}%;`}
    ></div>
  </div>
  ${hasDescription
    ? html`<span id=${descriptionContainerId} class="swc-LinearProgress-description"><slot name="description"></slot></span>`
    : nothing}
</div>
```

Notes:

- The class namespace is `swc-LinearProgress` (shared with meter), **not** `swc-ProgressBar` — both components style against the same shared CSS selectors. The meter SWC layer already uses `swc-LinearProgress`; progress bar follows suit.
- Indeterminate gating uses Lit `nothing` so the attributes/elements are fully absent, not empty.
- All ARIA lives on the shadow role element; the host is ARIA-free (B9).

### Indeterminate animation (progress-bar `progress-bar.css` only)

```css
@import '../../stylesheets/_lit-styles/linear-progress-base.css';

:host([indeterminate]) .swc-LinearProgress-fill {
  min-inline-size: 0;            /* reset the determinate 0%-visibility floor */
  inline-size: <indeterminate fill size>;
  transition: none;             /* drop the determinate inline-size transition */
  animation: indeterminate-loop-ltr <duration token> ease-in-out infinite;
}

:host([indeterminate]) .swc-LinearProgress-fill:dir(rtl) {
  animation-name: indeterminate-loop-rtl;
}

@keyframes indeterminate-loop-ltr { /* … */ }
@keyframes indeterminate-loop-rtl { /* … */ }

@media (prefers-reduced-motion: reduce) {
  :host([indeterminate]) .swc-LinearProgress-fill {
    animation: none;
    inline-size: <static fallback>;
  }
}
```

Exact keyframe geometry, duration token, and fallback width are **Q2** — to be lifted from `spectrum-css` `spectrum-two` `progressbar/index.css` and verified against Figma during the Styling phase. The 1st-gen uses `transform-origin` + separate LTR/RTL keyframes; 2nd-gen should prefer logical `:dir(rtl)` to swap the animation name.

---

## Migration checklist

### Preparation (this ticket)

- [x] 1st-gen API surface documented
- [x] Dependencies identified
- [x] Breaking changes documented
- [x] 2nd-gen API decisions drafted
- [ ] Plan reviewed by at least one other engineer

### Setup

- [x] Create `2nd-gen/packages/core/components/progress-bar/` with `ProgressBar.base.ts` (extends `LinearProgressMixin(SizedMixin(SpectrumElement, …))`), `ProgressBar.types.ts`, `index.ts`
- [x] Create `2nd-gen/packages/swc/components/progress-bar/` with `ProgressBar.ts`, `progress-bar.css` (`@import`s `linear-progress-base.css`), `swc-progress-bar.ts`, `index.ts`, `stories/`, `test/`
- [x] Wire exports in `core` and `swc` `package.json` files
- [x] Confirm `LinearProgressMixin` and `linear-progress-base.css` are imported, not modified
- [x] Add to root workspace; confirm `yarn build:2nd-gen` passes with empty stubs
- [ ] Verify `spectrum-css` is checked out at `spectrum-two` branch as sibling directory (`../spectrum-css`)

### API

#### Naming and public surface

- [x] `ProgressBar.types.ts`: define any progress-bar-only types (likely minimal — re-export shared `LinearProgress*` types as needed; no `VARIANTS`)
- [x] `LinearProgressMixin`: de-hardcode the meter docs URL in `warnMissingAccessibleName`/`warnValueOutOfRange` behind overridable `docsHref` and `accessibleNameContextExample` protected getters; `MeterBase` inherits the meter URL default (no behavior change), `ProgressBarBase` overrides both (Q1)
- [x] `ProgressBar.base.ts`: extend `LinearProgressMixin`; declare `indeterminate` (boolean, default `false`, reflected); **no** `role`/`aria-*` on the host; supply the progress-bar `docsHref` (`...components-progress-bar--docs`) and `accessibleNameContextExample` (`'a full-page loading animation'`) per the Q1 decision
- [x] Confirm all shared props (`value`, `minValue`, `maxValue`, `accessibleLabel`, `valueLabel`, `formatOptions`, `labelPosition`, `staticColor`, `size`) come from the mixin with no re-declaration beyond `size` reflect-on-concrete-class needs

#### 1st-gen deprecation notices

- [x] Add `@deprecated` JSDoc to `progress` property (will be replaced by `value`)
- [x] Add `@deprecated` JSDoc to `sideLabel`/`side-label` (will be replaced by `label-position="side"`)
- [x] Add `@deprecated` JSDoc to `label` string attribute (will be replaced by `label` named slot)
- Note: `overBackground` deprecation JSDoc and `window.__swc.warn()` were already in place from prior work

#### Alignment checks

- [x] `value`/`minValue`/`maxValue`/`label-position`/`static-color`/`value-label`/`formatOptions` match React Spectrum S2 ProgressBar and the shipped `<swc-meter>` surface
- [x] `indeterminate` boolean matches React Spectrum (`isIndeterminate`) and 1st-gen behavior
- [x] Confirm **no** `variant` property (single accent fill) against React + Figma
- [x] Confirm `over-background` removal (B5) is acceptable — already deprecated in 1st-gen; not carried to 2nd-gen

### Styling

> Follow the [CSS style guide](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/) as the source of truth. Key references: [migration steps](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/04_spectrum-swc-migration.md), [custom properties](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md), [anti-patterns](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/05_anti-patterns.md).

- [ ] Render the internal wrapper as `<div class="swc-LinearProgress">`; do not target `:host` for component visuals
- [ ] `progress-bar.css` `@import`s `linear-progress-base.css` and adds **only** indeterminate rules
- [ ] Add the indeterminate fill animation (keyframes, duration token, `:dir(rtl)` variant) lifted from `spectrum-css` `spectrum-two` `progressbar/index.css` (Q2)
- [ ] Reset `min-inline-size` to `0` and drop the determinate `transition` on the indeterminate fill
- [ ] Suppress the animation under `prefers-reduced-motion` with a static fallback fill
- [ ] No variant fill-color rules (default accent comes from the shared layer)

#### Visual model and regressions

- [ ] Verify i18n size modifiers (`:lang(ja)`, `:lang(ko)`, `:lang(zh)`) are covered by the shared base
- [ ] Confirm no new `@cssprop` beyond the shared `--swc-linear-progress-*` set; document those tags on `ProgressBar.ts`
- [ ] Pass stylelint (property order, `no-descending-specificity`, token validation); high-contrast/media queries sorted to the bottom

### Accessibility

#### Naming and semantics

- [x] Single `role="progressbar"` on the shadow `.swc-LinearProgress` element (not the host); not author-overridable
- [x] Determinate: `aria-valuemin`/`max`/`now`/`text` on the role element
- [x] Indeterminate: all four value attributes omitted (Lit `nothing`); visible value text omitted
- [x] Accessible name: `label` slot → `aria-labelledby`; else `accessibleLabel` → `aria-label`
- [x] `aria-describedby` when `description` slot has assigned nodes; absent otherwise
- [x] Host carries no `role`/`aria-*`
- [x] DEBUG warning fires when no accessible name is provable, with progress-bar-correct copy and docs URL (Q1 resolved; `docsHref` derived from `this.localName`)
- [x] Non-focusable: no `tabindex`
- Note: the a11y analysis doc says `role` should be on the host; the migration plan (B9) and implementation put it on the shadow `.swc-LinearProgress` element, aligning with `<swc-meter>`. This is intentional and correct; the analysis doc was not updated when B9 was finalised.

#### State verification

- [x] `aria-valuetext` re-formats on `language-resolver-updated` and on `value`/`minValue`/`maxValue`/`valueLabel`/`formatOptions` changes (determinate) — handled by mixin `updated()` triggering re-render
- [x] Toggling `indeterminate` adds/removes the four value attributes in lockstep — handled by Lit `nothing` in render template
- [x] `value-label` overrides auto-formatted text when determinate; ignored when indeterminate — handled by `formattedValue` getter in mixin
- [x] No `aria-live` regions added by default

### Testing

- [ ] Port `1st-gen/packages/progress-bar/test/progress-bar.test.ts` coverage that still applies, adapted to the new API (label-from-slot → slot presence; `progress`→`value`/`aria-valuenow`; determinate↔indeterminate value-attr toggling; locale `en-US`/`ar-sa`; deprecated `over-background` test dropped per B5)
- [ ] Add Playwright `progress-bar.a11y.spec.ts` with `toMatchAriaSnapshot` covering size × `label-position` × key `value` values (0/25/50/75/100%) × determinate vs **indeterminate** × `label` slot vs `accessibleLabel` × `description` present/absent. Static-color stories carry `!test` (axe vs decorator gradient); coverage restored via a `staticColorsDemo` test story, mirroring meter.

#### Behavior

- [ ] Single `role="progressbar"` on the shadow element; host has no `role` (regression for B9)
- [ ] Determinate `aria-value*` correctness across `value = minValue / midpoint / maxValue`
- [ ] Indeterminate omits all four value attributes and the visible value text (regression for B11)
- [ ] Custom `minValue`/`maxValue` clamps `value` and feeds ARIA + fill
- [ ] `aria-valuetext` matches percent format in `en-US` and `ar-sa`
- [ ] `value-label` overrides auto-formatted text (determinate only)
- [ ] `formatOptions` drives auto-formatted text
- [ ] DEBUG warning fires with no accessible name; not when `label` slot or `accessibleLabel` is set; copy references progress bar (Q1)
- [ ] Host is not focusable (`document.activeElement` skips it on `Tab`)

#### Visual regression

- [ ] Add VRT coverage for size × `label-position` combinations
- [ ] Add VRT coverage for both `static-color` values on approved backgrounds
- [ ] Add VRT coverage for `value = 0/25/50/75/100%` (3:1 contrast checks at 0%)
- [ ] Add VRT coverage for **indeterminate** (and indeterminate + side-label + static-color)
- [ ] Add VRT coverage for `description` slot present vs absent
- [ ] Add reduced-motion coverage for the indeterminate fallback
- [ ] Add forced-colors / high-contrast VRT coverage

### Documentation

#### General

- [ ] JSDoc on `ProgressBar.base.ts` and `ProgressBar.ts` — `indeterminate`, `@slot label`, `@slot description`, and the six `@cssprop` shared-surface tags
- [ ] Storybook stories: Playground, Overview, Anatomy, Sizes, LabelPosition (top vs side), Values (0/25/50/75/100%), CustomRange, Indeterminate, ValueLabel, FormatOptions, StaticColors (combined), Accessibility — per [stories-format](../../../../.ai/rules/stories-format.md) and [stories-documentation](../../../../.ai/rules/stories-documentation.md). Author per-component MDX at `progress-bar.mdx`.
- [ ] Storybook `subtitle` plain text; JSDoc above meta carries the longer description
- [ ] Tag stories: `migrated` on meta; `overview`, `anatomy`, `options`, `states` (indeterminate), `behaviors`, `a11y` on matching stories

#### Breaking changes

- [ ] Consumer migration guide at `2nd-gen/packages/swc/components/progress-bar/migration-guide.mdx` covering B1–B12 and additive A1–A4 (per the [`consumer-migration-guide` rule](../../../../.ai/skills/consumer-migration-guide/SKILL.md)). Cross-link the Meter migration guide for the shared-surface details.

### Review

- [ ] `yarn lint:2nd-gen` passes (ESLint, Stylelint, Prettier)
- [ ] Status table in [`01_status.md`](../../02_workstreams/02_2nd-gen-component-migration/01_status.md) updated to reflect Progress Bar progress
- [ ] PR created with description referencing Epic SWC-1769
- [ ] Peer engineer sign-off

---

## Blockers and open questions

### Design

| #   | Item                                                                                                                                                                              | Blocking? | Status | Owner                         |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ------ | ----------------------------- |
| Q2  | Confirm the indeterminate animation treatment (keyframes, duration token, easing, reduced-motion fallback) against the [Figma S2 progress bar frame](https://www.figma.com/design/Mngz9H7WZLbrCvGQf3GnsY/S2---Web--Desktop-scale-?node-id=13059-181) (`S2 / Web (Desktop scale)`). Next action: cross-reference the Figma frame with `spectrum-css` `spectrum-two` `progressbar/index.css` and validate in the Styling phase. | Yes (Styling sign-off) | Open | Design + CSS reviewer |

### Architecture and behavior

| #   | Item                                                                                                                                                                                                                                                | Blocking? | Status | Owner                  |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ------ | ---------------------- |
| Q1  | Shared `LinearProgressMixin` hard-codes the meter docs URL in its two DEBUG warnings. **Resolved:** de-hardcode the URL in the mixin behind an overridable member (e.g. an abstract/overridable `docsHref` getter) that `MeterBase` and `ProgressBarBase` each supply; progress bar's warning text fixes the 1st-gen `<sp-progress-circle>` copy-paste bug. This is a small, backward-compatible bug-class fix to the shared mixin — it does not reopen feature additions (see Q3). Next action: implement in API/a11y phases. | Resolved | Resolved | Architecture reviewer |
| Q3  | Confirm `LinearProgressMixin` and `linear-progress-base.css` stay closed for **feature** additions (no generalizing `indeterminate` into the shared layer). The Q1 de-hardcoding is a bug-class fix, not a feature, and is consistent with this. Recommendation: keep closed to features. | No (default stands unless raised) | Open | Architecture reviewer |

### Scope and prerequisites

| #   | Item                                                                                                                                              | Blocking? | Status | Owner        |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ------ | ------------ |
| Q4  | Confirm `over-background` removal (B5) rather than carrying the deprecation forward. Recommendation: remove — it is already `@deprecated` in 1st-gen and has a direct `static-color="white"` replacement. | No | Open | Ticket owner |

---

## References

- [Washing machine workflow](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md)
- [2nd-gen migration status table](../../02_workstreams/02_2nd-gen-component-migration/01_status.md)
- [Accessibility migration analysis](./accessibility-migration-analysis.md)
- [Rendering and styling migration analysis](./rendering-and-styling-migration-analysis.md)
- [Meter migration plan](../meter/migration-plan.md) — sibling reference; defines the shared `LinearProgressMixin` and `linear-progress-base.css` contract
- [CSS style guide — Component Custom Property Exposure](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#component-custom-property-exposure)
- [CSS style guide — Selector conventions](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#selector-conventions)
- [1st-gen source — `ProgressBar.ts`](../../../../1st-gen/packages/progress-bar/src/ProgressBar.ts)
- [1st-gen styles — `progress-bar.css`](../../../../1st-gen/packages/progress-bar/src/progress-bar.css)
- [1st-gen tests — `progress-bar.test.ts`](../../../../1st-gen/packages/progress-bar/test/progress-bar.test.ts)
- [1st-gen README](../../../../1st-gen/packages/progress-bar/README.md)
- [2nd-gen shared mixin — `linear-progress-mixin.ts`](../../../../2nd-gen/packages/core/mixins/linear-progress-mixin.ts)
- [2nd-gen shared CSS — `linear-progress-base.css`](../../../../2nd-gen/packages/swc/stylesheets/_lit-styles/linear-progress-base.css)
- [2nd-gen sibling — `Meter.ts`](../../../../2nd-gen/packages/swc/components/meter/Meter.ts)
- [2nd-gen reference — `ProgressCircle.base.ts`](../../../../2nd-gen/packages/core/components/progress-circle/ProgressCircle.base.ts) — `progressbar` determinate/indeterminate ARIA + DEBUG warning pattern
- [Figma — S2 / Web (Desktop scale), progress bar frame](https://www.figma.com/design/Mngz9H7WZLbrCvGQf3GnsY/S2---Web--Desktop-scale-?node-id=13059-181) — visual reference, including the indeterminate animation (Q2)
- [React Spectrum S2 ProgressBar](https://react-spectrum.adobe.com/ProgressBar)
- [Spectrum CSS — `spectrum-two` branch, `components/progressbar/index.css`](https://github.com/adobe/spectrum-css/blob/spectrum-two/components/progressbar/index.css) — S2 styling source of truth; lift the indeterminate animation from here
- [Badge migration reference](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#reference-badge-migration)
- Epic: SWC-1769 — Progress bar component migration
