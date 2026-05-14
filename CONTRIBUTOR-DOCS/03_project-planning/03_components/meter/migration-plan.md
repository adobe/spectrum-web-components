<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Meter / Meter migration plan

<!-- Document title (editable) -->

# Meter migration plan

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
    - [Deferred items](#deferred-items)
- [References](#references)

</details>

<!-- Document content (editable) -->

> **Epic SWC-2005** · Planning output. Must be reviewed before implementation begins.
>
> This plan provides recommendations, not just observations. Inconsistencies, recommended naming or API changes, and unresolved tradeoffs are made explicit so reviewers can confirm or redirect.

---

## TL;DR

- **Component**: `<sp-meter>` (1st-gen, `@spectrum-web-components/meter@1.11.2`) → `<swc-meter>` (2nd-gen).
- **What this is**: a non-focusable, read-only bar that shows a value (`value`, default range 0–100) inside a fixed range. ARIA pattern is **`role="meter"`**, distinct from `progressbar` task progress (separate component).
- **Architecture**: `<swc-meter>` shares a **thin `LinearProgressMixin`** in `core` with the future `<swc-progress-bar>`. The mixin holds every property, computed value, and behavior that both components share (value clamping, fill-fraction, locale formatting, slot tracking, DEBUG warning) but is intentionally silent on ARIA role and animation — those are left to each component's own base class. `MeterBase` extends `LinearProgressMixin` and adds `variant` + meter-specific ARIA resolution. The SWC layer renders S2 markup against the `swc-Meter` wrapper class. Shared bar/track/fill/label-layout CSS lives in a `linear-progress-base.css` file that both `meter.css` and future `progress-bar.css` import.
- **API alignment**: 2nd-gen aligns with [React Spectrum S2 Meter](https://react-spectrum.adobe.com/Meter.html) and the Figma `S2 / Web (Desktop scale)` Meter frame supplied with this plan. Net effect: rename `progress` → `value`, add `minValue`/`maxValue`, replace `side-label` boolean with `label-position` enum, expose `value-label`, expose `formatOptions` (`Intl.NumberFormatOptions`) as a JS property, align `variant` set to `{informative (default), positive, notice, negative}`, expose `static-color` as `{white, black}`, and add `label` + `description` named slots.
- **Must-ship breaking/a11y**: tag rename `<sp-meter>` → `<swc-meter>`; replace 1st-gen's invalid combined `role="meter progressbar"` with `role="meter"` only, placed on the shadow `.swc-Meter` element (not the host); add `aria-valuemin`, `aria-valuemax`, and `aria-valuetext` (localized formatted value) on the role element; drop `--mod-*` passthroughs in favor of a reviewed `--swc-meter-*` set; render inside a `<div class="swc-Meter">` wrapper instead of styling the host.
- **Net-new from S2/React**: arbitrary numeric range (`minValue`/`maxValue`); custom `value-label` (e.g. `"1 of 4"`); custom `formatOptions` (`Intl.NumberFormatOptions`, JS property only — full pass-through to `Intl.NumberFormat`); `static-color="black"`; **`description` named slot** for additional text below the meter (not a "help-text" attribute — meter is not a form field).
- **Field-label rendering**: 1st-gen renders internal `<sp-field-label>` for label and percent. 2nd-gen renders plain `<span>` elements inside the shadow root (SWC-prefixed selectors per the [contributor docs selector patterns](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/01_component-css.md#selector-patterns)). `<label>` is not used because `role="meter"` is not pair-able with native `<label>` semantics.
- **Accessible-name model**: visible label via the **`label`** named slot; the `meter` role element in shadow DOM `aria-labelledby`-references the label slot's container id. `accessibleLabel` JS property (attr `accessible-label`) is reserved for **rare cases without a visible label** (e.g. a data grid of meters) — when provided, the role element sets it as `aria-label`. Description via the **`description`** named slot; the role element `aria-describedby`-references its container id.

### Most blocking open questions

None currently. Q1–Q6 from the drafting cycle are closed; resolutions are reflected throughout the plan and tracked in the deferred-ticket table in [Blockers and open questions](#blockers-and-open-questions).

---

## 1st-gen API surface

**Source:** [`1st-gen/packages/meter/src/Meter.ts`](../../../../1st-gen/packages/meter/src/Meter.ts)
**Version:** `@spectrum-web-components/meter@1.11.2`
**Custom element tag:** `sp-meter`

### Properties / attributes

| Property     | Type                                             | Default     | Attribute       | Notes                                                                                                                  |
| ------------ | ------------------------------------------------ | ----------- | --------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `progress`   | `number`                                         | `0`         | `progress`      | 0–100. Drives `aria-valuenow` and the `transform: scaleX(...)` of the fill.                                            |
| `variant`    | `'positive' \| 'notice' \| 'negative' \| ''`     | `''`        | `variant`       | Custom setter; invalid values clear the attribute. Empty string is the "informative" default in 1st-gen.                |
| `label`      | `string`                                         | `''`        | `label`         | Reflected. Mirrored to `aria-label` on update. Slot text is hoisted to `label` via `getLabelFromSlot`.                  |
| `sideLabel`  | `boolean`                                        | `false`     | `side-label`    | Reflected. Layout-only.                                                                                                |
| `staticColor`| `'white' \| undefined`                           | `undefined` | `static-color`  | Reflected. White only in 1st-gen.                                                                                      |
| `size`       | `'s' \| 'm' \| 'l' \| 'xl'`                      | unset       | `size`          | From `SizedMixin({ noDefaultSize: true })`. No default size attribute is set; consumers pass one of the four values.   |

### Methods

None public.

| Method | Signature | Notes |
| ------ | --------- | ----- |
| —      | —         | No public methods. |

### Events

None custom. (No `dispatchEvent` calls in `Meter.ts`.)

### Slots

| Slot      | Content                          | Notes                                                                                              |
| --------- | -------------------------------- | -------------------------------------------------------------------------------------------------- |
| (default) | Text labeling the meter          | Mirrored into the `label` property via `ObserveSlotText` + `getLabelFromSlot`. Single naming path. |

### CSS custom properties

1st-gen exposes the following `--mod-*` properties via inheritance from progress-bar styles (`@import url("./spectrum-progress-bar.css"); @import url("./progress-bar-overrides.css");` in [`meter.css`](../../../../1st-gen/packages/meter/src/meter.css)) and the meter-specific overrides:

- Passthroughs (progress-bar): `--mod-progressbar-fill-color`, `--mod-progressbar-max-size`, `--mod-progressbar-min-size`, `--mod-progressbar-thickness`
- Meter modifiers: `--mod-meter-help-text-to-progress-bar`, `--mod-meter-max-width`, `--mod-meter-min-width` _(1st-gen names retained for historical accuracy; the corresponding 2nd-gen exposure is `--swc-meter-description-spacing` etc. — the term "help text" is dropped per the new naming)_

This full modifier surface will not be carried forward to 2nd-gen.

### Shadow DOM output (rendered HTML)

Rendered by `Meter.render()`:

```html
<sp-field-label size="[size]" class="label">
  <slot>[label]</slot>
</sp-field-label>
<sp-field-label size="[size]" class="percentage">[localized percent]</sp-field-label>
<div class="track">
  <div class="fill" style="transform: scaleX(calc([progress] / 100));"></div>
</div>
```

Plus the host receives `role="meter progressbar"` (invalid combined ARIA role string — see [Known 1st-gen issues](./accessibility-migration-analysis.md#known-1st-gen-issues)).

---

## Dependencies

| Package                                        | Version  | Role                                                                                       |
| ---------------------------------------------- | -------- | ------------------------------------------------------------------------------------------ |
| `@spectrum-web-components/base`                | `1.11.2` | `SpectrumElement`, `SizedMixin`, `html`, `nothing`                                          |
| `@spectrum-web-components/field-label`         | `1.11.2` | Internal `<sp-field-label>` used twice in `render()` (label + percentage)                   |
| `@spectrum-web-components/reactive-controllers`| `1.11.2` | `LanguageResolutionController` for locale-aware percent formatting                          |
| `@spectrum-web-components/shared`              | `1.11.2` | `ObserveSlotText`, `getLabelFromSlot`                                                       |

2nd-gen equivalents:

| 1st-gen import | 2nd-gen equivalent | Status |
| --- | --- | --- |
| `SpectrumElement` from `@spectrum-web-components/base` | `@spectrum-web-components/core/element/index.js` | Available |
| `SizedMixin` from `@spectrum-web-components/base` | `@spectrum-web-components/core/mixins/index.js` | Available |
| `LanguageResolutionController` from `reactive-controllers` | `@spectrum-web-components/core/controllers/language-resolution.js` | Available |
| `getLabelFromSlot` from `shared` | `@spectrum-web-components/core/utils/get-label-from-slot.js` | Available |
| `ObserveSlotText` from `shared` | Not needed in 2nd-gen — handle via `slotchange` directly (precedent: `ProgressCircleBase`) | N/A |
| `<sp-field-label>` rendered in shadow | `<swc-field-label>` does **not** exist yet | **Not migrated** — 2nd-gen renders plain `<span class="swc-Meter-label">` / `<span class="swc-Meter-value">` (SWC-namespaced selectors; `<span>` because `role="meter"` is not pair-able with native `<label>`). See B8 in [Must ship](#must-ship--breaking-or-a11y-required). |
| _(new)_ shared behavior with progress-bar | `LinearProgressMixin` in `2nd-gen/packages/core/mixins/linear-progress.mixin.ts` | **New in this migration** — created alongside Meter so the future progress-bar migration can consume it without additional breaking changes. |

---

## Migration sequencing and prerequisites

### Dependency-aware recommendation

`<swc-meter>` is migrated as the **first consumer of `LinearProgressMixin`**, a thin shared mixin in core. The mixin captures the shared API surface and behavior (value clamping, formatting, slot tracking, DEBUG warning) that meter and the future `<swc-progress-bar>` both need. The mixin is **intentionally silent** on ARIA role, indeterminate state, and animation — those stay in each component's own base class. CSS sharing follows the same boundary: shared bar/track/fill and label-layout rules live in `linear-progress-base.css`; each component's `*.css` imports it and adds only what is component-specific.

Creating the mixin during the Meter migration (rather than waiting for the progress-bar epic) means the progress-bar team inherits a tested, reviewed contract with no additional breaking changes to consumers.

Rationale for keeping role and animation out of the mixin:

- `role="meter"` vs `role="progressbar"` require different `aria-value*` behavior (progress-bar omits `aria-valuenow` when indeterminate; meter is always determinate). Mixing these in one base would require gating logic that makes the mixin harder to reason about.
- The indeterminate animation is entirely progress-bar-specific and has no meter equivalent. Keeping it out of the mixin keeps the mixin small and easy to test in isolation.
- The 1st-gen `<sp-meter>` inherited CSS via `@import` of `spectrum-progress-bar.css`, which created maintenance coupling. The shared CSS file approach keeps the visual contract explicit without re-introducing that coupling.

### Related components and ordering notes

- **Progress bar** ([`1st-gen/packages/progress-bar`](../../../../1st-gen/packages/progress-bar/)) — independent migration on its own epic. Will consume `LinearProgressMixin` and `linear-progress-base.css` without changes to those files (the mixin and shared CSS are designed to be additive-only after Meter ships).
- **Progress circle** ([`2nd-gen/packages/swc/components/progress-circle`](../../../../2nd-gen/packages/swc/components/progress-circle/)) — already migrated. Used as the structural precedent for `aria-value*` plumbing, slot-as-label hoisting, locale-aware formatting, and the dev-mode accessible-name warning. Not extended and not part of the `LinearProgressMixin` surface (it is circular, not bar-shaped).
- **Field label** — internal render dependency; not migrated. 2nd-gen `<swc-meter>` renders plain `<span class="swc-Meter-label">` / `<span class="swc-Meter-value">` inside its shadow root (`<span>`, not `<label>`, because `role="meter"` is not pair-able with native `<label>` semantics; the `meter` role element uses `aria-labelledby` to reference the `<span>` containing the label slot). SWC-namespaced selectors per the [contributor docs selector patterns](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/01_component-css.md#selector-patterns). No dependency on `<swc-field-label>`.
- **Description** — exposed as a **`description`** named slot on `<swc-meter>`. The slot's shadow container carries an internal id and is `aria-describedby`-referenced from the role element. "Help text" terminology is not used because it implies a form field; meter is a non-interactive display.

### User confirmation needed

None outstanding. All architecture and dependency decisions are settled per direction received during plan review.

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

| #  | What changes | 1st-gen behavior | 2nd-gen behavior | Consumer migration path |
| -- | ------------ | ---------------- | ---------------- | ----------------------- |
| **B1** | Custom element tag rename | `<sp-meter>` | `<swc-meter>` | Update all tag references; install `@spectrum-web-components/swc-meter`. |
| **B2** | `progress` → `value` rename. _(Source: [React Spectrum S2 Meter API](https://react-spectrum.adobe.com/Meter.html); user direction to align with React.)_ | `progress` (number, 0–100) | `value` (number, default 0). Range is bounded by `minValue`/`maxValue`. | Rename attribute and property. `<sp-meter progress="50">` → `<swc-meter value="50">`. |
| **B3** | Add `minValue` and `maxValue`. _(Source: React Spectrum S2 Meter API.)_ | No range customization; `progress` is implicitly 0–100. | `minValue` (number, default 0) and `maxValue` (number, default 100) define the range. `value` is clamped to this range. | None for consumers using the implicit 0–100 range. New API for consumers needing arbitrary ranges. |
| **B4** | `side-label` boolean → `label-position` enum. _(Source: React Spectrum S2 Meter API; matches React's `labelPosition`.)_ | `<sp-meter side-label>` boolean attribute. | `<swc-meter label-position="side">`. Values: `'top'` (default) and `'side'`. | Replace `side-label` with `label-position="side"`. Default behavior (top) unchanged. |
| **B5** | Variant set normalized. _(Source: React Spectrum S2 Meter API; Figma `S2 / Web (Desktop scale)` Meter frame.)_ | `{positive, notice, negative, ''}` — empty string is "informative" by behavior, not name. | `{informative, positive, notice, negative}` — `informative` is the named default. | Consumers relying on the empty-string default set `variant="informative"` explicitly or omit the attribute. Consumers passing `positive`/`notice`/`negative` are unchanged. |
| **B6** | `--mod-*` passthroughs removed (`--mod-progressbar-*`, `--mod-meter-*`). _(Source: [CSS style guide — custom properties](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#component-custom-property-exposure).)_ | Consumers customize via `--mod-*`. | Customize via a small reviewed set of `--swc-meter-*` tokens. | Replace `--mod-progressbar-fill-color`, `--mod-progressbar-thickness`, `--mod-meter-min-width`, `--mod-meter-max-width`, `--mod-meter-help-text-to-progress-bar` with the corresponding `--swc-meter-*` properties (final list locked in implementation; the spacing token is renamed to `--swc-meter-description-spacing` to match the `description` slot terminology). |

#### Styling and visuals

| #  | What changes | 1st-gen behavior | 2nd-gen behavior | Consumer migration path |
| -- | ------------ | ---------------- | ---------------- | ----------------------- |
| **B8** | Internal label rendering. _(Source: contributor docs selector patterns; `role="meter"` does not pair with native `<label>`.)_ | `<sp-field-label>` rendered twice in shadow (label + percentage). | Plain `<span class="swc-Meter-label">` / `<span class="swc-Meter-value">` (SWC-namespaced selectors; `<span>`, not `<label>`). The shadow `meter` role element uses `aria-labelledby` to reference the `label` slot's container `<span>`. | None for top-level consumers. Consumers querying `sp-field-label` inside shadow DOM update selectors. |

#### Accessibility and behavior

| #  | What changes | 1st-gen behavior | 2nd-gen behavior | Consumer migration path |
| -- | ------------ | ---------------- | ---------------- | ----------------------- |
| **B9** | ARIA role placement. _(Source: [accessibility-migration-analysis.md § Role and value attributes](./accessibility-migration-analysis.md#role-and-value-attributes); [WAI-ARIA 1.2 `meter`](https://www.w3.org/TR/wai-aria-1.2/#meter); [APG meter pattern](https://www.w3.org/WAI/ARIA/apg/patterns/meter/); initiative leads a11y direction.)_ | `role="meter progressbar"` (invalid combined ARIA role token) set on the host. | `role="meter"` only, set on the shadow `.swc-Meter` element (not the host). All `aria-value*`, `aria-label`, `aria-labelledby`, `aria-describedby` for the meter live on that role element. Nothing role-related is set on the host. | None — AT-only. Tests/snapshots that assert the combined string or host-level ARIA update. |
| **B10** | Value attributes. _(Source: [accessibility-migration-analysis.md § ARIA roles, states, and properties](./accessibility-migration-analysis.md#aria-roles-states-and-properties); React Spectrum S2 Meter API.)_ | Only `aria-valuenow` is set; no `aria-valuemin`/`aria-valuemax`/`aria-valuetext`. | `aria-valuemin=<minValue>`, `aria-valuemax=<maxValue>`, `aria-valuenow=<value>`, and `aria-valuetext=<formatted value>` (formatted by the `format` shorthand attribute and locale). | None — AT-only. |
| **B11** | Accessible-name model. _(Source: initiative leads a11y direction.)_ | `aria-label` mirrors the `label` property; slot text hoists into `label`. Six inputs total (`label`, default slot, `aria-label`, `aria-labelledby`, `aria-describedby`, `aria-details`). | Three inputs: **`label` named slot** (visible label, `aria-labelledby`-referenced by the role element); **`accessibleLabel` JS property / `accessible-label` attribute** (rare-case a11y fallback when there is no visible label, e.g. a data grid of meters — sets `aria-label` on the role element); **`description` named slot** (additional text below the meter, `aria-describedby`-referenced by the role element). Raw `aria-label`/`aria-labelledby`/`aria-describedby`/`aria-details` passthroughs are not part of the public API. DEBUG dev-mode warning when no accessible name is provable (neither `label` slot content nor `accessibleLabel` is set). | Consumers using `label="..."` move text into the `label` slot (or set `accessibleLabel` when the meter has no visible label). Consumers using `aria-*` passthroughs use the matching slot. |

### Additive — ships when ready, zero breakage for consumers already on 2nd-gen

| #  | What is added | Notes |
| -- | ------------- | ----- |
| **A1** | `static-color="black"` | `spectrum-css` `spectrum-two` adds the `staticBlack` modifier (`progressbar/index.css` line 189). 1st-gen has white only. Ships in this migration. |
| **A2** | `description` named slot | New for S2 (`spectrum-css` `spectrum-two` adds the description region inside the meter HTML; ported as `swc-Meter-description` in `meter.css`). Public API: `slot="description"` for additional text below the meter. Renders into an internal `<span class="swc-Meter-description">` container; the shadow `meter` role element `aria-describedby`-references that container's id when the slot has assigned nodes. "Help text" terminology is not used because it implies a form field. Ships in this migration. |
| **A3** | `value-label` (string attribute). _(Source: React Spectrum S2 `valueLabel`.)_ | New for S2/React. Replaces the auto-formatted percentage. `<swc-meter value-label="1 of 4">` overrides the rendered value text and feeds `aria-valuetext`. String only — matches React's `valueLabel` API; no slot version. Auto-formatting (Intl.NumberFormat) remains the default when omitted. |
| **A4** | `formatOptions` JS property. _(Source: React Spectrum S2 `formatOptions`.)_ | `Intl.NumberFormatOptions` object — JS property only, not a string attribute. Full pass-through to `Intl.NumberFormat` so the API stays in sync with the native spec as new fields ship (`notation`, `roundingMode`, `signDisplay`, future additions). Default `{ style: 'percent' }`. Drives both the rendered value text and `aria-valuetext`. Ignored when `value-label` is set. |

---

## 2nd-gen API decisions

These are derived from the 1st-gen implementation, the rendering and styling roadmap, the accessibility migration analysis, the `spectrum-css` `spectrum-two` source, the React S2 implementation, and the `ProgressCircle` 2nd-gen precedent. Confidence labels:

- **Confirmed**: directly supported by source material.
- **Inferred**: recommended based on multiple signals; not explicitly specified in one authoritative source.
- **Open question**: unresolved; tracked in [Blockers and open questions](#blockers-and-open-questions).

### Public API

#### Properties / attributes (2nd-gen)

| Property        | Type                                                          | Default       | Attribute         | Notes |
| --------------- | ------------------------------------------------------------- | ------------- | ----------------- | ----- |
| `value`         | `number`                                                      | `0`           | `value`           | **Confirmed.** Renamed from 1st-gen `progress`. Clamped to `[minValue, maxValue]`. Drives `aria-valuenow` and the bar fill. |
| `minValue`      | `number`                                                      | `0`           | `min-value`       | **Confirmed.** Reflected. Bottom of the value range. Mirrors React Spectrum `minValue`. |
| `maxValue`      | `number`                                                      | `100`         | `max-value`       | **Confirmed.** Reflected. Top of the value range. Mirrors React Spectrum `maxValue`. |
| `accessibleLabel` | `string`                                                    | `''`          | `accessible-label` | **Confirmed.** Reflected. **Rare-case fallback** used when there is no visible `label` slot content — e.g. a data grid of meters where each meter's name is implied by its row/column context. Sets `aria-label` on the shadow `meter` role element when provided. When the `label` slot has content, `accessibleLabel` is ignored (`aria-labelledby` to the slot container takes precedence). |
| `valueLabel`    | `string \| undefined`                                         | `undefined`   | `value-label`     | **Confirmed.** Custom value text (e.g. `"1 of 4"`). Overrides the auto-formatted percent in both rendered text and `aria-valuetext`. Mirrors React Spectrum `valueLabel`. |
| `formatOptions` | `Intl.NumberFormatOptions \| undefined`                       | `{ style: 'percent' }` | _(property only)_ | **Confirmed.** JS property only — full pass-through to `Intl.NumberFormat`. Avoids flattening or remapping native spec fields (`notation`, `roundingMode`, `signDisplay`, etc.). Drives the auto-formatted value text and `aria-valuetext` when `value-label` is not set. |
| `variant`       | `'informative' \| 'positive' \| 'notice' \| 'negative'`       | `'informative'` | `variant`       | **Confirmed.** Reflected. Default is the named `informative` value (1st-gen used the empty string for this case). |
| `labelPosition` | `'top' \| 'side'`                                             | `'top'`       | `label-position`  | **Confirmed.** Reflected. Replaces 1st-gen `side-label` boolean. |
| `staticColor`   | `'white' \| 'black' \| undefined`                             | `undefined`   | `static-color`    | **Confirmed.** Reflected. `'auto'` from React Spectrum is **deferred** — `spectrum-css` `spectrum-two` does not include a `staticAuto` modifier. |
| `size`          | `'s' \| 'm' \| 'l' \| 'xl'`                                   | `'m'`         | `size`            | **Confirmed.** Default `m` per Figma `S2 / Web (Desktop scale)` Properties panel and React Spectrum default. |

#### Visual matrix (2nd-gen)

Confirmed against the Figma `S2 / Web (Desktop scale)` Meter primary frame supplied with this plan, the React Spectrum S2 Meter API, and `spectrum-css` `spectrum-two`.

All variants (`informative` default, `positive`, `notice`, `negative`) support all sizes (`s`, `m` default, `l`, `xl`), both `label-position` values (`top` default, `side`), both `static-color` values (`white`, `black`), the full `value` range (0–100, including 0%/25%/50%/75%/100%), and both `label` + `description` slots. There are no variant-restricted features.

`label-position="side"` is exposed via `spectrum-css` `spectrum-two` `progressbar/index.css` `.spectrum-ProgressBar--sideLabel` (line 144), even though the Figma Desktop frame focuses on top-label. Side-label coverage in implementation/tests is required for parity with React Spectrum.

#### Slots (2nd-gen)

| Slot          | Content              | Notes |
| ------------- | -------------------- | ----- |
| `label`       | Visible meter label  | **Confirmed.** Named slot. Renders inside `<span class="swc-Meter-label">` in the shadow root. The container's internal id is referenced by `aria-labelledby` on the shadow `meter` role element. Slot text is **not** copied into `aria-label`. |
| `description` | Description text below the meter | **Confirmed.** Named slot. Renders inside `<span class="swc-Meter-description">` in the shadow root. When the slot has assigned nodes, the container's internal id is referenced by `aria-describedby` on the shadow `meter` role element; otherwise the container is not rendered. |

#### CSS custom properties (2nd-gen)

No `--mod-*` properties will be exposed. New `--swc-*` component-level properties may be introduced where needed — these are additive and not breaking. See [Component Custom Property Exposure](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#component-custom-property-exposure) for what to expose and how.

Initial expected set for `<swc-meter>` (final list locked in implementation):

- `--swc-meter-fill-color` — overrides the variant-derived bar fill color.
- `--swc-meter-track-color` — overrides the bar track color.
- `--swc-meter-thickness` — overrides the bar thickness.
- `--swc-meter-min-width` — overrides the meter inline-size minimum.
- `--swc-meter-max-width` — overrides the meter inline-size maximum.
- `--swc-meter-description-spacing` — overrides spacing between bar and the description slot.
- `--swc-meter-label-to-value-spacing` — overrides spacing between label and value text in `label-position="side"`.

### Behavioral semantics

- **Read-only display.** Host is not focusable. No `tabindex`. Keyboard skips the component.
- **Value clamping.** `value` is clamped into `[minValue, maxValue]` for both rendering (`fill` width as `(value − minValue) / (maxValue − minValue)`) and `aria-valuenow`. `minValue` defaults to `0`, `maxValue` to `100`; default behavior matches the 1st-gen 0–100 range.
- **Locale-aware formatting.** When `value-label` is unset, format the visible value and `aria-valuetext` via `new Intl.NumberFormat(language, formatOptions ?? { style: 'percent' })`. The `language` argument comes from the shared `LanguageResolutionController` (subscribed in `LinearProgressMixin`); on `language-resolver-updated`, the formatted value + `aria-valuetext` are re-rendered. For percent style, feed the normalized fraction `(value − minValue) / (maxValue − minValue)`. Re-format on any of `value`, `minValue`, `maxValue`, `valueLabel`, `formatOptions` changing.
- **`value-label` precedence.** Non-empty `value-label` attribute overrides auto-formatted text in both the visible value cell and `aria-valuetext`. String only — no slot version (matches React's `valueLabel` API).
- **Variant validation.** `variant` is a typed enum; unknown values fall back to `'informative'`. Tracked in `Meter.types.ts` rather than via the 1st-gen string-coercing setter.
- **No custom events.** No `dispatchEvent` calls; behavior parity with 1st-gen.

### Accessibility semantics notes (2nd-gen)

Sourced from [`accessibility-migration-analysis.md`](./accessibility-migration-analysis.md) and the React Spectrum S2 Meter API:

- `role="meter"` is set on the shadow `.swc-Meter` element in the render template — not on the host. The host carries no ARIA role. Fixed; not author-overridable.
- `aria-valuemin=<minValue>`, `aria-valuemax=<maxValue>`, `aria-valuenow=<value>` (clamped), `aria-valuetext=<formatted value>` are declared on the `.swc-Meter` role element in the template. Re-rendered on every relevant property change and on locale change.
- **Placement rationale.** `role` + `aria-value*` live on the shadow `.swc-Meter` element (not the host). Because the `label` and `description` slot containers are also inside the same shadow root, `aria-labelledby` and `aria-describedby` reference shadow-DOM-internal IDs with no cross-root ARIA concern. Cross-root ARIA (Reference Target / cross-root ARIA spec) is not yet shipped in stable browsers and is not needed for this pattern.
- **Accessible name** resolves in this order: (1) `label` named slot content → the role element receives `aria-labelledby="<label-container-id>"`; (2) `accessibleLabel` property (rare-case fallback when there is no visible label, e.g. a data grid of meters) → the role element receives `aria-label="${accessibleLabel}"`. Default slot text is **not** used as a name source. Raw `aria-label`/`aria-labelledby` passthroughs are not part of the public API. DEBUG-mode warning when neither resolves a name.
- **Description.** When the `description` named slot has assigned nodes, the slot's shadow container is rendered with an internal id and the role element receives `aria-describedby="<description-container-id>"`. When the slot is empty, the description container block is conditionally omitted from the render (Lit `?` directive), not toggled via the `hidden` attribute. Raw `aria-describedby`/`aria-details` passthroughs are not part of the public API.
- DEBUG-mode console warning when no accessible name is provable (precedent: `ProgressCircleBase`).
- No `aria-live` by default. The accessibility analysis explicitly forbids `aria-live="assertive"`; `polite` is reserved for rare primary-announcement cases and is not part of the baseline.
- Non-text contrast: track and fill must meet **3:1**, including the at-risk `value=minValue` state (visually 0%). Mitigate per `Loading animation discovery` Figma guidance for the bar-and-track treatment.

---

## Architecture: core vs SWC split

> The 1st-gen component is a **reference only** — 2nd-gen is built independently. Neither generation imports from the other. No shared base with progress-circle.

Follow the [Badge migration reference](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#reference-badge-migration) and the `ProgressCircleBase` precedent for structural patterns (without inheriting from it).

| Layer | Path | Contains |
| --- | --- | --- |
| **Mixin** | `2nd-gen/packages/core/mixins/linear-progress.mixin.ts` | `LinearProgressMixin`. The thin shared layer. Owns: typed property declarations for all shared props (`value`, `minValue`, `maxValue`, `accessibleLabel`, `valueLabel`, `formatOptions`, `labelPosition`, `staticColor`, `size`); shared type constants (`LINEAR_PROGRESS_VALID_SIZES`, `LINEAR_PROGRESS_LABEL_POSITIONS`, `LINEAR_PROGRESS_STATIC_COLORS`); `value` clamping; fill-fraction computation; locale-aware formatting via `LanguageResolutionController`; internal id generation for the `label` and `description` slot containers; `label`-slot and `description`-slot `slotchange` tracking; resolution of `aria-labelledby` / `aria-describedby` / `aria-label` values exposed as getters for the SWC render template; DEBUG-mode accessible-name warning. **No ARIA role. No indeterminate state. No rendering.** |
| **Core** | `2nd-gen/packages/core/components/meter/` | `Meter.base.ts` (extends `LinearProgressMixin`), `Meter.types.ts`, `index.ts`. Owns only what is meter-specific on top of the mixin: `variant` typed property (`METER_VARIANTS` constant); any meter-specific ARIA decisions not already resolved by the mixin. **No rendering. No JSX/Lit template.** |
| **SWC** | `2nd-gen/packages/swc/components/meter/` | `Meter.ts` (extends `MeterBase`), `meter.css`, `index.ts`, element registration `swc-meter`, `stories/`, `test/`, `consumer-migration-guide.mdx`. Owns: S2 rendering with the `swc-Meter` wrapper, `role="meter"` + all `aria-value*` bindings on the role element, S2 token bindings, `static-color="white"`/`static-color="black"` classes, meter-specific visual styling. Imports `linear-progress-base.css` for shared bar/track/fill and label-layout rules. |
| **Shared CSS** | `2nd-gen/packages/swc/shared/linear-progress-base.css` | Shared bar/track/fill structure, size tokens, label/value text layout (top vs side), static-color (white/black) treatment, i18n modifiers. Imported by `meter.css` and (in the future) `progress-bar.css`. Contains no variant fill colors, no indeterminate animation. |

Planned rendering shape for `Meter.ts.render()`:

```html
<!-- Host element (<swc-meter>) carries no ARIA. -->
<div
  class="swc-Meter swc-Meter--size<S> swc-Meter--<variant> [swc-Meter--sideLabel] [swc-Meter--staticWhite|swc-Meter--staticBlack]"
  role="meter"
  aria-valuemin=${minValue}
  aria-valuemax=${maxValue}
  aria-valuenow=${clampedValue}
  aria-valuetext=${formattedValue}
  ${labelSlotHasAssignedNodes ? html`aria-labelledby="${labelContainerId}"` : (accessibleLabel ? html`aria-label="${accessibleLabel}"` : nothing)}
  ${descriptionSlotHasAssignedNodes ? html`aria-describedby="${descriptionContainerId}"` : nothing}
>
  <span class="swc-Meter-label" id="${labelContainerId}">
    <slot name="label" @slotchange=${onLabelSlotChange}></slot>
  </span>
  <span class="swc-Meter-value">
    ${valueLabel ?? autoFormattedValue}
  </span>
  <div class="swc-Meter-track">
    <div class="swc-Meter-fill" style="inline-size: ${fillPercent}%;"></div>
  </div>
  ${descriptionSlotHasAssignedNodes
    ? html`
        <span class="swc-Meter-description" id="${descriptionContainerId}">
          <slot name="description"></slot>
        </span>
      `
    : nothing}
</div>
```

Notes:

- `<fillPercent>` is `((value − minValue) / (maxValue − minValue)) * 100`, clamped to `[0, 100]`.
- **Role + all ARIA** (`role`, `aria-value*`, `aria-label` / `aria-labelledby`, `aria-describedby`) are set on the shadow `.swc-Meter` element. The host is ARIA-free.
- **Conditional rendering** is used for the `description` slot container (and for `aria-labelledby` / `aria-label` / `aria-describedby` attributes themselves) — emit only when the corresponding source has content. No `hidden` attribute toggling.
- **`<span>` not `<label>`** for both the label and value containers. `role="meter"` is not pair-able with native `<label>` semantics; `<span>` + `aria-labelledby` is the correct association.
- All labeling (`swc-Meter-label`, `swc-Meter-value`, `swc-Meter-description`) is supported across every variant and `static-color` mode — full label parity with React Spectrum + `spectrum-css` `spectrum-two`. The Figma `Static white` / `Static black` panels omit text for visual simplicity only; that is not a spec constraint.
- Class names use the `swc-` prefix per [contributor docs selector patterns](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/01_component-css.md#selector-patterns). S2 CSS rules that are shared with progress-bar (bar/track/fill, size tokens, label/value layout, static-color) go into `linear-progress-base.css` with selectors rewritten to the SWC namespace. Meter-specific rules (variant fill colors, description spacing) go into `meter.css`, which `@import`s `linear-progress-base.css`. Values/tokens are preserved throughout.

---

## Migration checklist

### Preparation (this ticket)

- [x] 1st-gen API surface documented
- [x] Dependencies identified
- [x] Breaking changes documented
- [x] 2nd-gen API decisions drafted
- [ ] Plan reviewed by at least one other engineer

### Setup

- [ ] Create `2nd-gen/packages/core/mixins/linear-progress.mixin.ts` with the `LinearProgressMixin` stub and its shared type constants (`LINEAR_PROGRESS_VALID_SIZES`, `LINEAR_PROGRESS_LABEL_POSITIONS`, `LINEAR_PROGRESS_STATIC_COLORS`)
- [ ] Create `2nd-gen/packages/swc/shared/linear-progress-base.css` as an empty stub (content added in Styling phase)
- [ ] Create `2nd-gen/packages/core/components/meter/` with `Meter.base.ts` (extends `LinearProgressMixin`), `Meter.types.ts` (`METER_VARIANTS` + `MeterVariant`), `index.ts`
- [ ] Create `2nd-gen/packages/swc/components/meter/` with `Meter.ts`, `meter.css` (`@import`s `linear-progress-base.css`), `index.ts`, `stories/`, `test/`
- [ ] Wire exports in `core` and `swc` `package.json` files; export `LinearProgressMixin` from core's mixins barrel
- [ ] Add to root workspace; confirm `yarn build:2nd-gen` passes with the empty stubs in place
- [ ] Verify `spectrum-css` is checked out at `spectrum-two` branch as sibling directory (`../spectrum-css`)

### API

#### Naming and public surface

- [ ] `linear-progress.mixin.ts`: define shared type constants — `LINEAR_PROGRESS_VALID_SIZES = ['s','m','l','xl'] as const`, `LINEAR_PROGRESS_STATIC_COLORS = ['white','black'] as const`, `LINEAR_PROGRESS_LABEL_POSITIONS = ['top','side'] as const`, and the corresponding `LinearProgressSize`, `LinearProgressStaticColor`, `LinearProgressLabelPosition` types; export `LinearProgressMixin` that applies all items below
- [ ] `linear-progress.mixin.ts`: declare typed properties — `value` (number, default 0), `minValue` (number, default 0), `maxValue` (number, default 100), `accessibleLabel` (string, default `''`, attr `accessible-label`), `valueLabel` (string, optional), `formatOptions` (`Intl.NumberFormatOptions`, default `{ style: 'percent' }`, JS property only — no attribute), `labelPosition` (typed enum, default `'top'`), `staticColor` (typed, optional), `size` (typed, default `'m'` via `SizedMixin`)
- [ ] `linear-progress.mixin.ts`: clamp `value` into `[minValue, maxValue]`; compute fill fraction `(value − minValue) / (maxValue − minValue)`; expose both as getters consumed by the SWC render template
- [ ] `linear-progress.mixin.ts`: format value via `Intl.NumberFormat(language, formatOptions ?? { style: 'percent' })`; subscribe `LanguageResolutionController`; re-format on locale change and on changes to `value`, `minValue`, `maxValue`, `valueLabel`, `formatOptions`; expose formatted text as a getter
- [ ] `linear-progress.mixin.ts`: handle `label`-slot `slotchange` to flag whether the slot has assigned nodes; expose the flag and the resolved `aria-labelledby`/`aria-label` decision as getters for use in the SWC render template
- [ ] `linear-progress.mixin.ts`: handle `description`-slot `slotchange` to flag whether the slot has assigned nodes; expose the flag as a getter so the SWC layer can conditionally render the description container and emit `aria-describedby`
- [ ] `linear-progress.mixin.ts`: emit DEBUG-mode warning when no accessible name is provable (neither `label` slot has assigned nodes nor `accessibleLabel` is set), mirroring `ProgressCircleBase`
- [ ] `Meter.types.ts`: define `METER_VARIANTS = ['informative','positive','notice','negative'] as const` and `MeterVariant` type (shared size/static-color/label-position constants live in the mixin)
- [ ] `Meter.base.ts`: extend `LinearProgressMixin`; declare only `variant` typed property (default `'informative'`); no `role` or `aria-*` assignment on the host; all shared behavior is handled by the mixin

#### Alignment checks

- [ ] `variant` set matches React Spectrum S2 (`informative`, `positive`, `notice`, `negative`) and Figma `S2 / Web (Desktop scale)` Variant panel
- [ ] `staticColor` set matches `spectrum-css` `spectrum-two` (`staticWhite`, `staticBlack`) and Figma `Static white` / `Static black` panels; React's `'auto'` is deferred (no S2 CSS support)
- [ ] `labelPosition` matches React Spectrum (`top` default, `side`); side-label coverage backed by `spectrum-css` `spectrum-two` `progressbar/index.css` `.spectrum-ProgressBar--sideLabel`
- [ ] `value-label` attribute matches React Spectrum `valueLabel` (string only — no slot)
- [ ] `formatOptions` matches React Spectrum `formatOptions` (JS property only — no string serialization; full `Intl.NumberFormatOptions` pass-through, no remapping).

### Styling

> Follow the [CSS style guide](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/) as the source of truth for all styling work. Key references: [migration steps](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/04_spectrum-swc-migration.md), [custom properties](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md), [anti-patterns](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/05_anti-patterns.md).

- [ ] Render the internal wrapper as `<div class="swc-Meter">`; do not target `:host` for component visuals
- [ ] Copy S2 source from `spectrum-css` `spectrum-two` branch — `components/meter/index.css` plus the relevant rules from `components/progressbar/index.css` — and split into: (a) shared bar/track/fill structure, size tokens, label/value text layout, static-color treatment, and i18n modifiers → `linear-progress-base.css` (rewrite selectors to the `swc-` namespace); (b) meter-specific rules (variant fill colors, description spacing) → `meter.css`, which `@import`s `linear-progress-base.css`
- [ ] Strip all `--mod-*` properties; replace with the reviewed `--swc-meter-*` set defined in [2nd-gen API decisions](#2nd-gen-api-decisions)
- [ ] Variant fill colors via tokens (`positive-visual-color`, `notice-visual-color`, `negative-visual-color`; `accent-content-color-default` for the `informative` default)
- [ ] Static-color rules for both `staticWhite` and `staticBlack` modifiers
- [ ] `label-position="side"` layout rule (`.swc-Meter--sideLabel`) mirroring `spectrum-css` `spectrum-two` `.spectrum-ProgressBar--sideLabel`
- [ ] Description spacing rule (`--swc-meter-description-spacing`). The description container is conditionally rendered (not present in the DOM when the `description` slot has no assigned nodes); no `hidden` attribute is used.

#### Visual model and regressions

- [ ] Verify i18n size modifiers (`:lang(ja)`, `:lang(ko)`, `:lang(zh)`) if present in S2 source
- [ ] Pass stylelint (property order, `no-descending-specificity`, token validation)
- [ ] Forced-colors / high-contrast block at the bottom of the file

### Accessibility

#### Naming and semantics

- [ ] Single `role="meter"` on the shadow `.swc-Meter` element (not the host). No combined role string.
- [ ] `aria-valuemin=<minValue>`, `aria-valuemax=<maxValue>`, `aria-valuenow=<clamped value>`, `aria-valuetext=<formatted value>` on the `.swc-Meter` role element
- [ ] Accessible name resolved in this order: `label` slot content → `aria-labelledby="<label-container-id>"` on the role element; otherwise `accessibleLabel` → `aria-label="${accessibleLabel}"` on the role element. No raw `aria-label`/`aria-labelledby` passthrough.
- [ ] `aria-describedby="<description-container-id>"` on the role element when the `description` slot has assigned nodes; absent otherwise
- [ ] Host element carries no `role` and no `aria-*` attributes
- [ ] DEBUG warning when no accessible name is provable
- [ ] Non-focusable: no `tabindex`, host receives no interactive role

#### State verification

- [ ] `aria-valuetext` re-formats on `language-resolver-updated` and on changes to `value`/`minValue`/`maxValue`/`valueLabel`/`formatOptions`
- [ ] `aria-valuenow` and `aria-valuetext` update in lockstep on `value` change
- [ ] `value-label` attribute overrides auto-formatted text in both visible value and `aria-valuetext`
- [ ] No `aria-live` regions added by default

### Testing

- [ ] Port `1st-gen/packages/meter/test/meter.test.ts` coverage that still applies, adapted to the new API (variant validation, label-from-slot, `value`→`aria-valuenow`, locale resolution `en-US` and `ar-sa`)
- [ ] Add Playwright `meter.a11y.spec.ts` with `toMatchAriaSnapshot` covering size × variant × `label-position` × static-color × key `value` values (0%, 50%, 100%) × `label` slot vs `accessibleLabel` × `description` slot present/absent

#### Behavior

- [ ] Single `role="meter"` set on the shadow `.swc-Meter` element; host has no `role` attribute (regression for B9)
- [ ] `aria-valuemin`/`aria-valuemax`/`aria-valuenow`/`aria-valuetext` correctness across `value = minValue / midpoint / maxValue`
- [ ] Custom `minValue`/`maxValue` clamps `value` correctly and feeds ARIA accordingly
- [ ] `aria-valuetext` matches default percent format in `en-US` (e.g. `50%`) and `ar-sa` (Arabic-Indic digits + `٪`)
- [ ] `value-label` (attribute) overrides auto-formatted text
- [ ] `formatOptions` drives auto-formatted text (e.g. `{ style: 'currency', currency: 'USD' }`, `{ style: 'unit', unit: 'inch' }`, `{ style: 'decimal' }`; default `{ style: 'percent' }`)
- [ ] `label-position="side"` lays out label inline with value and bar
- [ ] DEBUG warning fires when no accessible name is provable; does not fire when either the `label` slot has assigned nodes or `accessibleLabel` is set
- [ ] Host is not focusable (`document.activeElement` skips it on `Tab`)

#### Visual regression

- [ ] Add VRT coverage for size × variant × `label-position` combinations
- [ ] Add VRT coverage for both `static-color` values on their approved backgrounds (per Figma `Static white` / `Static black` panels)
- [ ] Add VRT coverage for `value = 0%`, `25%`, `50%`, `75%`, `100%` (3:1 contrast checks at 0%)
- [ ] Add VRT coverage for `description` slot present vs absent
- [ ] Add forced-colors / high-contrast VRT coverage

### Documentation

#### General

- [ ] JSDoc on `LinearProgressMixin` in `linear-progress.mixin.ts` — document all shared properties, getters, and behavior
- [ ] JSDoc on all public props, slots, and CSS custom properties in `Meter.base.ts` and `Meter.ts`
- [ ] Storybook stories: Playground, Overview, Anatomy, Sizes, Variants, LabelPosition (top vs side), Values (0/25/50/75/100%), CustomRange (`min-value`/`max-value`), ValueLabel, FormatOptions, Description (`description` slot present vs absent), StaticWhite, StaticBlack, StaticColors (combined), Accessibility (per [stories-format](../../../../.ai/rules/stories-format.md) and [stories-documentation](../../../../.ai/rules/stories-documentation.md))
- [ ] Storybook `subtitle` plain text; JSDoc above meta carries the longer description
- [ ] Tag stories: `migrated` on meta; `overview`, `anatomy`, `options`, `behaviors`, `a11y` on the matching stories

#### Breaking changes

- [ ] Consumer migration guide at `2nd-gen/packages/swc/components/meter/consumer-migration-guide.mdx` covering B1–B6, B8–B11 and additive A1–A4 (per [`consumer-migration-guide` rule](../../../../.ai/skills/consumer-migration-guide/SKILL.md))

### Review

- [ ] `yarn lint:2nd-gen` passes (ESLint, Stylelint, Prettier)
- [ ] Status table in [`01_status.md`](../../02_workstreams/02_2nd-gen-component-migration/01_status.md) updated to reflect Meter as fully migrated
- [ ] PR created with description referencing Epic SWC-2005
- [ ] Peer engineer sign-off

---

## Blockers and open questions

All drafting-time questions are resolved. Resolutions:

- **Q1 (architecture)** — Closed. `<swc-meter>` shares `LinearProgressMixin` in core with the future `<swc-progress-bar>`. Bar styles are split: shared rules live in `linear-progress-base.css`; meter-specific rules (variant fill colors, description spacing) live in `meter.css`. Reflected in [Architecture: core vs SWC split](#architecture-core-vs-swc-split) and [Migration sequencing and prerequisites](#migration-sequencing-and-prerequisites).
- **Q2 (variants)** — Closed. `{informative (default), positive, notice, negative}` per React Spectrum S2 + Figma. Reflected in [Public API](#public-api) and B5.
- **Q3 (static colors)** — Closed. `{white, black}` per `spectrum-css` `spectrum-two` + Figma. React's `'auto'` deferred (no S2 CSS support). Reflected in [Public API](#public-api), A1, and the deferred-ticket table below.
- **Q4 (description, formerly "help text")** — Closed. Exposed as the `description` named slot (not a "help-text" attribute — meter is not a form field). Slot content renders inside `<span class="swc-Meter-description">` in the shadow root; the shadow `meter` role element `aria-describedby`-references that container's internal id when the slot has assigned nodes. Container is conditionally rendered (no `hidden` attribute toggling). Reflected in A2, the Slots table, the Architecture render shape, and the Migration checklist.
- **Q5 (field-label)** — Closed. Render plain `<span class="swc-Meter-label">` / `<span class="swc-Meter-value">` (SWC-namespaced selectors; `<span>` rather than `<label>` because `role="meter"` is not pair-able with native `<label>` semantics — the `meter` role element associates via `aria-labelledby`). No dependency on `<swc-field-label>`. Reflected in B8.
- **Q6 (Jira tickets)** — Closed. Confirmed via `mcp__corp-jira__search_jira_issues` against SWC-2005: 11 children exist (SWC-2006 through SWC-2016) covering accessibility recommendations, planning, setup, API, accessibility implementation, visual fidelity, code style, testing, documentation, consumer migration guide, and final review. All breaking changes (B1–B6, B8–B11) and additives (A1, A2, A3, A4) ship within these phase tickets — no separate breaking-change tickets are required.

### Deferred items

| Ticket | Deferred item | Why deferred | Related plan section |
| ------ | ------------- | ------------ | -------------------- |
| _(file as new SWC ticket under SWC-2005 with `deferred` label)_ | `static-color="auto"` (React Spectrum) | `spectrum-css` `spectrum-two` does not include a `staticAuto` modifier. Adding it requires a Spectrum CSS change and a token decision. | [Public API → `staticColor`](#public-api), [Additive A1](#additive--ships-when-ready-zero-breakage-for-consumers-already-on-2nd-gen) |

---

## References

- [Washing machine workflow](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md)
- [2nd-gen migration status table](../../02_workstreams/02_2nd-gen-component-migration/01_status.md)
- [Accessibility migration analysis](./accessibility-migration-analysis.md)
- [Rendering and styling migration analysis](./rendering-and-styling-migration-analysis.md)
- [CSS style guide — Component Custom Property Exposure](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#component-custom-property-exposure)
- [CSS style guide — Selector conventions](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#selector-conventions)
- [CSS style guide — Spectrum SWC migration](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/04_spectrum-swc-migration.md)
- [CSS style guide — Anti-patterns](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/05_anti-patterns.md)
- [1st-gen source — `Meter.ts`](../../../../1st-gen/packages/meter/src/Meter.ts)
- [1st-gen styles — `meter.css`](../../../../1st-gen/packages/meter/src/meter.css)
- [1st-gen tests — `meter.test.ts`](../../../../1st-gen/packages/meter/test/meter.test.ts)
- [1st-gen stories — `meter.stories.ts`](../../../../1st-gen/packages/meter/stories/meter.stories.ts)
- [1st-gen README](../../../../1st-gen/packages/meter/README.md)
- [Spectrum CSS — `spectrum-two` branch, `components/meter/index.css`](https://github.com/adobe/spectrum-css/blob/spectrum-two/components/meter/index.css)
- [Spectrum CSS — `spectrum-two` branch, `components/progressbar/index.css`](https://github.com/adobe/spectrum-css/blob/spectrum-two/components/progressbar/index.css)
- [React Spectrum S2 Meter](https://react-spectrum.adobe.com/Meter)
- [2nd-gen reference — `ProgressCircleBase`](../../../../2nd-gen/packages/core/components/progress-circle/ProgressCircle.base.ts)
- [2nd-gen reference — `ProgressCircle`](../../../../2nd-gen/packages/swc/components/progress-circle/ProgressCircle.ts)
- [Badge migration reference](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#reference-badge-migration)
- [Figma — Loading animation discovery](https://www.figma.com/design/42VzvpW262EAUbYsadO4e8/Loading-animation-discovery?node-id=478-948207)
- Epic: [SWC-2005](https://jira.corp.adobe.com/browse/SWC-2005) — Meter component migration
