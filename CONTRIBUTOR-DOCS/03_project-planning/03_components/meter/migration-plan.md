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
- **Architecture**: independent component. **No shared base** with progress-bar / progress-circle. Bar/track/fill styles live in `meter.css`, copied from `spectrum-css` `spectrum-two` (`progressbar/index.css` + `meter/index.css`). Core layer holds `MeterBase` for API, ARIA plumbing, and locale-aware formatting; SWC layer renders S2 markup against the `swc-Meter` wrapper class.
- **API alignment**: 2nd-gen aligns with [React Spectrum S2 Meter](https://react-spectrum.adobe.com/Meter.html) and the Figma `S2 / Web (Desktop scale)` Meter frame supplied with this plan. Net effect: rename `progress` → `value`, add `minValue`/`maxValue`, replace `side-label` boolean with `label-position` enum, expose `value-label` and a flat `format` shorthand attribute, align `variant` set to `{informative (default), positive, notice, negative}`, expose `static-color` as `{white, black}`, and add a `help-text` slot.
- **Must-ship breaking/a11y**: tag rename `<sp-meter>` → `<swc-meter>`; replace 1st-gen's invalid combined `role="meter progressbar"` with `role="meter"` only; add `aria-valuemin`, `aria-valuemax`, and `aria-valuetext` (localized formatted value); drop `--mod-*` passthroughs in favor of a reviewed `--swc-meter-*` set; render inside a `<div class="swc-Meter">` wrapper instead of styling the host.
- **Net-new from S2/React**: arbitrary numeric range (`minValue`/`maxValue`); custom `value-label` (e.g. `"1 of 4"`); flat `format` shorthand attribute (`percent` default, `decimal`, `currency-<ISO>`, `unit-<cldr-unit>`); `static-color="black"`; `help-text` slot for composing `<sp-help-text>` (1st-gen) below the bar inside the meter's S2 `helptext` region.
- **Field-label rendering**: 1st-gen renders internal `<sp-field-label>` for label and percent. 2nd-gen renders plain `<label class="swc-Meter-label">` / `<label class="swc-Meter-value">` (SWC-prefixed selectors per the [contributor docs selector patterns](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/01_component-css.md#selector-patterns)) until `<swc-field-label>` is migrated.
- **Accessible name simplification**: Replace 1st-gen's `label` attribute + raw `aria-*` passthroughs with two inputs only — default slot (primary visible label) and `accessible-label` attribute (a11y-only fallback).

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
- Meter modifiers: `--mod-meter-help-text-to-progress-bar`, `--mod-meter-max-width`, `--mod-meter-min-width`

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

| 1st-gen import                                                             | 2nd-gen equivalent                                                                                  | Status        |
| -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ------------- |
| `SpectrumElement` from `@spectrum-web-components/base`                     | `@spectrum-web-components/core/element/index.js`                                                    | Available     |
| `SizedMixin` from `@spectrum-web-components/base`                          | `@spectrum-web-components/core/mixins/index.js`                                                     | Available     |
| `LanguageResolutionController` from `reactive-controllers`                 | `@spectrum-web-components/core/controllers/language-resolution.js`                                  | Available     |
| `getLabelFromSlot` from `shared`                                           | `@spectrum-web-components/core/utils/get-label-from-slot.js`                                        | Available     |
| `ObserveSlotText` from `shared`                                            | Not needed in 2nd-gen — handle via `slotchange` directly (precedent: `ProgressCircleBase`)          | N/A           |
| `<sp-field-label>` rendered in shadow                                      | `<swc-field-label>` does **not** exist yet                                                          | **Not migrated** — 2nd-gen renders plain `<label class="swc-Meter-label">` / `<label class="swc-Meter-value">` (SWC-namespaced selectors). See B8 in [Must ship](#must-ship--breaking-or-a11y-required). |

---

## Migration sequencing and prerequisites

### Dependency-aware recommendation

`<swc-meter>` is migrated **independently** of `<swc-progress-bar>`. No shared base is extracted in core.

Rationale:

- 1st-gen `<sp-meter>` extended progress-bar visuals via CSS `@import` of `spectrum-progress-bar.css` and `progress-bar-overrides.css`. In 2nd-gen, this is replaced with a self-contained `meter.css` that copies the relevant bar/track/fill rules from `spectrum-css` `spectrum-two` ([`components/progressbar/index.css`](https://github.com/adobe/spectrum-css/blob/spectrum-two/components/progressbar/index.css)) plus the meter-specific rules from [`components/meter/index.css`](https://github.com/adobe/spectrum-css/blob/spectrum-two/components/meter/index.css).
- The 1st-gen progress-bar package is not migrated yet; making meter wait on or share with it would couple two epics unnecessarily and slow SWC-2005.
- The components have different ARIA semantics (`role="meter"` vs `role="progressbar"`), different default behaviors (meter is determinate-only; progress-bar can be indeterminate), and different value semantics. A shared base would have to gate most of its API per subclass anyway.

### Related components and ordering notes

- **Progress bar** ([`1st-gen/packages/progress-bar`](../../../../1st-gen/packages/progress-bar/)) — independent migration on its own epic. No coupling to this work.
- **Progress circle** ([`2nd-gen/packages/swc/components/progress-circle`](../../../../2nd-gen/packages/swc/components/progress-circle/)) — already migrated. Used as the structural precedent for `aria-value*` plumbing, slot-as-label hoisting, locale-aware formatting, and the dev-mode accessible-name warning. Not extended.
- **Field label** — internal render dependency; not migrated. 2nd-gen `<swc-meter>` renders plain `<label class="swc-Meter-label">` / `<label class="swc-Meter-value">` (SWC-namespaced selectors per the [contributor docs selector patterns](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/01_component-css.md#selector-patterns)). No dependency on `<swc-field-label>`.
- **Help text** — 1st-gen `<sp-help-text>` package is not migrated. The `help-text` slot in `<swc-meter>` accepts any DOM, so consumers can place 1st-gen `<sp-help-text>` or any composed help-text element until `<swc-help-text>` exists.

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
| **B6** | `--mod-*` passthroughs removed (`--mod-progressbar-*`, `--mod-meter-*`). _(Source: [CSS style guide — custom properties](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#component-custom-property-exposure).)_ | Consumers customize via `--mod-*`. | Customize via a small reviewed set of `--swc-meter-*` tokens. | Replace `--mod-progressbar-fill-color`, `--mod-progressbar-thickness`, `--mod-meter-min-width`, `--mod-meter-max-width`, `--mod-meter-help-text-to-progress-bar` with the corresponding `--swc-meter-*` properties (final list locked in implementation). |

#### Styling and visuals

| #  | What changes | 1st-gen behavior | 2nd-gen behavior | Consumer migration path |
| -- | ------------ | ---------------- | ---------------- | ----------------------- |
| **B8** | Internal label rendering. _(Source: contributor docs selector patterns.)_ | `<sp-field-label>` rendered twice in shadow (label + percentage). | Plain `<label class="swc-Meter-label">` / `<label class="swc-Meter-value">` (SWC-namespaced selectors) until `<swc-field-label>` is migrated. | None for top-level consumers. Consumers querying `sp-field-label` inside shadow DOM update selectors. |

#### Accessibility and behavior

| #  | What changes | 1st-gen behavior | 2nd-gen behavior | Consumer migration path |
| -- | ------------ | ---------------- | ---------------- | ----------------------- |
| **B9** | ARIA role. _(Source: [accessibility-migration-analysis.md § Role and value attributes](./accessibility-migration-analysis.md#role-and-value-attributes); [WAI-ARIA 1.2 `meter`](https://www.w3.org/TR/wai-aria-1.2/#meter); [APG meter pattern](https://www.w3.org/WAI/ARIA/apg/patterns/meter/).)_ | `role="meter progressbar"` (invalid combined ARIA role token). | `role="meter"` only, fixed on the host. | None — AT-only. Tests/snapshots that assert the combined string update. |
| **B10** | Value attributes. _(Source: [accessibility-migration-analysis.md § ARIA roles, states, and properties](./accessibility-migration-analysis.md#aria-roles-states-and-properties); React Spectrum S2 Meter API.)_ | Only `aria-valuenow` is set; no `aria-valuemin`/`aria-valuemax`/`aria-valuetext`. | `aria-valuemin=<minValue>`, `aria-valuemax=<maxValue>`, `aria-valuenow=<value>`, and `aria-valuetext=<formatted value>` (formatted by the `format` shorthand attribute and locale). | None — AT-only. |
| **B11** | Accessible-name source. _(Source: 1st-gen `Meter.ts` `firstUpdated`/`updated`; ProgressCircle precedent.)_ | `aria-label` mirrors the `label` property; slot text hoists into `label`. Six inputs total (`label`, slot, `aria-label`, `aria-labelledby`, `aria-describedby`, `aria-details`). | Two inputs: **default slot** (primary visible label) and **`accessible-label`** attribute (a11y-only fallback when no visible text). Raw `aria-label`/`aria-labelledby`/`aria-describedby`/`aria-details` passthroughs dropped from public API. DEBUG dev-mode warning when no accessible name is provable. | Consumers using `label="..."` migrate to `accessible-label="..."` (or move text into the default slot). Consumers using `aria-*` passthroughs move text into the default slot or `accessible-label`. |

### Additive — ships when ready, zero breakage for consumers already on 2nd-gen

| #  | What is added | Notes |
| -- | ------------- | ----- |
| **A1** | `static-color="black"` | `spectrum-css` `spectrum-two` adds the `staticBlack` modifier (`progressbar/index.css` line 189). 1st-gen has white only. Ships in this migration. |
| **A2** | `help-text` slot | New for S2 (`spectrum-css` `spectrum-two` adds the helptext region inside the meter HTML; ported as `swc-Meter-helptext` in `meter.css`). Public API: a named slot `slot="help-text"` so consumers can compose `<sp-help-text>` (or any element) inside the meter's helptext region. React Spectrum exposes help text via composition + `aria-describedby`; the slot mirrors that pattern. Ships in this migration. |
| **A3** | `value-label` (string attribute). _(Source: React Spectrum S2 `valueLabel`.)_ | New for S2/React. Replaces the auto-formatted percentage. `<swc-meter value-label="1 of 4">` overrides the rendered value text and feeds `aria-valuetext`. String only — matches React's `valueLabel` API; no slot version. Auto-formatting (Intl.NumberFormat) remains the default when omitted. |
| **A4** | `format` flat shorthand attribute. _(Source: adapts React Spectrum's `formatOptions` object to a string attribute usable in HTML.)_ | Single string attribute, default `"percent"`. Syntax: `<style>` or `<style>-<arg>`. Recognized: `decimal`, `percent`, `currency-<ISO>` (e.g. `currency-USD`), `unit-<cldr-unit>` (e.g. `unit-inch`, `unit-kilometer-per-hour`). Parsed internally into `Intl.NumberFormatOptions` and fed to `Intl.NumberFormat(language, opts)`. Drives both the rendered value text and `aria-valuetext`. Ignored when `value-label` is set. |

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
| `accessibleLabel` | `string`                                                    | `''`          | `accessible-label` | **Confirmed.** Reflected. Optional. Used when there is no visible label in the default slot. Default slot text takes precedence when both are present. |
| `valueLabel`    | `string \| undefined`                                         | `undefined`   | `value-label`     | **Confirmed.** Custom value text (e.g. `"1 of 4"`). Overrides the auto-formatted percent in both rendered text and `aria-valuetext`. Mirrors React Spectrum `valueLabel`. |
| `format`        | `string`                                                      | `'percent'`   | `format`          | **Confirmed.** Flat shorthand: `decimal`, `percent`, `currency-<ISO>` (e.g. `currency-USD`), `unit-<cldr-unit>` (e.g. `unit-inch`, `unit-kilometer-per-hour`). Parsed internally into `Intl.NumberFormatOptions`. Drives the auto-formatted value text and `aria-valuetext` when `value-label` is not set. String attribute usable in HTML — no JS-only object property. |
| `variant`       | `'informative' \| 'positive' \| 'notice' \| 'negative'`       | `'informative'` | `variant`       | **Confirmed.** Reflected. Default is the named `informative` value (1st-gen used the empty string for this case). |
| `labelPosition` | `'top' \| 'side'`                                             | `'top'`       | `label-position`  | **Confirmed.** Reflected. Replaces 1st-gen `side-label` boolean. |
| `staticColor`   | `'white' \| 'black' \| undefined`                             | `undefined`   | `static-color`    | **Confirmed.** Reflected. `'auto'` from React Spectrum is **deferred** — `spectrum-css` `spectrum-two` does not include a `staticAuto` modifier. |
| `size`          | `'s' \| 'm' \| 'l' \| 'xl'`                                   | `'m'`         | `size`            | **Confirmed.** Default `m` per Figma `S2 / Web (Desktop scale)` Properties panel and React Spectrum default. |

#### Visual matrix (2nd-gen)

Confirmed against the Figma `S2 / Web (Desktop scale)` Meter primary frame supplied with this plan, the React Spectrum S2 Meter API, and `spectrum-css` `spectrum-two`.

All variants (`informative` default, `positive`, `notice`, `negative`) support all sizes (`s`, `m` default, `l`, `xl`), both `label-position` values (`top` default, `side`), both `static-color` values (`white`, `black`), the full `value` range (0–100, including 0%/25%/50%/75%/100%), and the `help-text` slot. There are no variant-restricted features.

`label-position="side"` is exposed via `spectrum-css` `spectrum-two` `progressbar/index.css` `.spectrum-ProgressBar--sideLabel` (line 144), even though the Figma Desktop frame focuses on top-label. Side-label coverage in implementation/tests is required for parity with React Spectrum.

#### Slots (2nd-gen)

| Slot          | Content              | Notes |
| ------------- | -------------------- | ----- |
| (default)     | Primary visible meter label | **Confirmed.** Default slot is the **primary** visible label and primary a11y name source. Slot text hoists into `accessibleLabel` via `slotchange` + `getLabelFromSlot` only when `accessibleLabel` is unset. |
| `help-text`   | Optional help text   | **Confirmed.** Renders inside the meter's helptext region (`swc-Meter-helptext`, ported from `spectrum-css` `spectrum-two`). Consumers compose `<sp-help-text>` (1st-gen, until `<swc-help-text>` exists) or any DOM. Wire to `aria-describedby` if the slot is non-empty. |

#### CSS custom properties (2nd-gen)

No `--mod-*` properties will be exposed. New `--swc-*` component-level properties may be introduced where needed — these are additive and not breaking. See [Component Custom Property Exposure](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#component-custom-property-exposure) for what to expose and how.

Initial expected set for `<swc-meter>` (final list locked in implementation):

- `--swc-meter-fill-color` — overrides the variant-derived bar fill color.
- `--swc-meter-track-color` — overrides the bar track color.
- `--swc-meter-thickness` — overrides the bar thickness.
- `--swc-meter-min-width` — overrides the meter inline-size minimum.
- `--swc-meter-max-width` — overrides the meter inline-size maximum.
- `--swc-meter-help-text-spacing` — overrides spacing between bar and help text.
- `--swc-meter-label-to-value-spacing` — overrides spacing between label and value text in `label-position="side"`.

### Behavioral semantics

- **Read-only display.** Host is not focusable. No `tabindex`. Keyboard skips the component.
- **Value clamping.** `value` is clamped into `[minValue, maxValue]` for both rendering (`fill` width as `(value − minValue) / (maxValue − minValue)`) and `aria-valuenow`. `minValue` defaults to `0`, `maxValue` to `100`; default behavior matches the 1st-gen 0–100 range.
- **Locale-aware formatting.** When `value-label` is unset, parse the `format` shorthand into `Intl.NumberFormatOptions` and call `new Intl.NumberFormat(language, opts)`. Parser: split on first `-`; first segment is `style` (`decimal` | `percent` | `currency` | `unit`); remainder maps to `currency` (ISO code, uppercased) when `style=currency`, or `unit` (CLDR unit name) when `style=unit`. Default when `format` unset or invalid: `{ style: 'percent' }`. For percent formatting, feed the normalized fraction `(value − minValue) / (maxValue − minValue)`. Re-format on language-resolver updates and on any of `value`, `minValue`, `maxValue`, `valueLabel`, `format` changing.
- **`value-label` precedence.** Non-empty `value-label` attribute overrides auto-formatted text in both the visible value cell and `aria-valuetext`. String only — no slot version (matches React's `valueLabel` API).
- **Variant validation.** `variant` is a typed enum; unknown values fall back to `'informative'`. Tracked in `Meter.types.ts` rather than via the 1st-gen string-coercing setter.
- **No custom events.** No `dispatchEvent` calls; behavior parity with 1st-gen.

### Accessibility semantics notes (2nd-gen)

Sourced from [`accessibility-migration-analysis.md`](./accessibility-migration-analysis.md) and the React Spectrum S2 Meter API:

- `role="meter"` set on the host in `firstUpdated`. Always set (no "if not already set" conditional). Fixed; not author-overridable.
- `aria-valuemin=<minValue>`, `aria-valuemax=<maxValue>`, `aria-valuenow=<value>` (clamped), `aria-valuetext=<formatted value>` set on host. Update on every relevant property change and on locale change.
- **Placement rationale.** `role` + `aria-value*` live on the host (not on the shadow `.swc-Meter` wrapper) so consumer-supplied IDREFs bind correctly. Cross-root ARIA (Reference Target / cross-root ARIA spec) is not yet shipped in stable browsers.
- **Accessible name** from one of: default slot text (primary), or the `accessible-label` attribute (fallback). Slot wins when both are present. The component sets `aria-label` on the host internally to expose the resolved name. Raw `aria-label`/`aria-labelledby` passthroughs are not part of the public API.
- **Description.** When `slot="help-text"` is non-empty, the meter wires `aria-describedby` to the slotted node's id (or generates an internal id). Raw `aria-describedby`/`aria-details` passthroughs are not part of the public API.
- DEBUG-mode console warning when no accessible name is provable (precedent: `ProgressCircleBase`).
- No `aria-live` by default. The accessibility analysis explicitly forbids `aria-live="assertive"`; `polite` is reserved for rare primary-announcement cases and is not part of the baseline.
- Non-text contrast: track and fill must meet **3:1**, including the at-risk `value=minValue` state (visually 0%). Mitigate per `Loading animation discovery` Figma guidance for the bar-and-track treatment.

---

## Architecture: core vs SWC split

> The 1st-gen component is a **reference only** — 2nd-gen is built independently. Neither generation imports from the other. **No shared base** with progress-bar or progress-circle.

Follow the [Badge migration reference](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#reference-badge-migration) and the `ProgressCircleBase` precedent for structural patterns (without inheriting from it).

| Layer    | Path                                              | Contains                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| -------- | ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Core** | `2nd-gen/packages/core/components/meter/`         | `Meter.base.ts`, `Meter.types.ts`, `index.ts`. Owns: typed property declarations (`value`, `minValue`, `maxValue`, `accessibleLabel`, `valueLabel`, `format`, `variant`, `labelPosition`, `staticColor`, `size`); `value` clamping; `format`-shorthand parser into `Intl.NumberFormatOptions`; locale-aware formatting via `LanguageResolutionController`; `aria-value*` plumbing on the host (not on the `.swc-Meter` wrapper, to keep consumer IDREFs working until cross-root ARIA ships); `role="meter"` assignment on host in `firstUpdated`; default-slot-as-name hoisting via `getLabelFromSlot` into `accessibleLabel`; DEBUG-mode accessible-name warning; constants `METER_VALID_SIZES`, `METER_STATIC_COLORS_S2`, `METER_VARIANTS`, `METER_LABEL_POSITIONS`, `METER_FORMAT_STYLES`. **No rendering.** **No JSX/Lit template.** |
| **SWC**  | `2nd-gen/packages/swc/components/meter/`          | `Meter.ts` (extends `MeterBase`), `meter.css`, `index.ts`, element registration `swc-meter`, `stories/`, `test/`, `consumer-migration-guide.mdx`. Owns: S2 rendering with the `swc-Meter` wrapper, S2 token bindings, `static-color="white"`/`static-color="black"` classes, all visual styling.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |

Planned rendering shape for `Meter.ts.render()`:

```html
<div
  class="swc-Meter swc-Meter--size<S> swc-Meter--<variant> [swc-Meter--sideLabel] [swc-Meter--staticWhite|swc-Meter--staticBlack]"
>
  <label class="swc-Meter-label">
    <slot @slotchange=...>{accessibleLabel}</slot>
  </label>
  <label class="swc-Meter-value">
    {valueLabel ?? auto-formatted value}
  </label>
  <div class="swc-Meter-track">
    <div class="swc-Meter-fill" style="inline-size: <fillPercent>%;"></div>
  </div>
  <div class="swc-Meter-helptext">
    <slot name="help-text"></slot>
  </div>
</div>
```

Notes:

- `<fillPercent>` is `((value − minValue) / (maxValue − minValue)) * 100`, clamped to `[0, 100]`.
- The `helptext` wrapper renders unconditionally. Style slotted content with `::slotted([slot="help-text"])`; the `<slot>` element's default `display: contents` keeps an empty slot inert (no layout, no spacing) without extra JS.
- All labeling (`swc-Meter-label`, `swc-Meter-value`, `swc-Meter-helptext`) is supported across every variant and `static-color` mode — full label parity with React Spectrum + `spectrum-css` `spectrum-two`. The Figma `Static white` / `Static black` panels omit text for visual simplicity only; that is not a spec constraint.
- Class names use the `swc-` prefix per [contributor docs selector patterns](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/01_component-css.md#selector-patterns). The S2 CSS rules from `spectrum-css` `spectrum-two` are ported into `meter.css` with selectors rewritten to the SWC namespace; values/tokens are preserved.

---

## Migration checklist

### Preparation (this ticket)

- [x] 1st-gen API surface documented
- [x] Dependencies identified
- [x] Breaking changes documented
- [x] 2nd-gen API decisions drafted
- [ ] Plan reviewed by at least one other engineer

### Setup

- [ ] Create `2nd-gen/packages/core/components/meter/` with `Meter.base.ts`, `Meter.types.ts`, `index.ts`
- [ ] Create `2nd-gen/packages/swc/components/meter/` with `Meter.ts`, `meter.css`, `index.ts`, `stories/`, `test/`
- [ ] Wire exports in both core and swc `package.json` files
- [ ] Add to root workspace; confirm `yarn build:2nd-gen` passes with the empty stubs in place
- [ ] Verify `spectrum-css` is checked out at `spectrum-two` branch as sibling directory (`../spectrum-css`)

### API

#### Naming and public surface

- [ ] `Meter.types.ts`: define `METER_VALID_SIZES = ['s','m','l','xl'] as const`, `METER_STATIC_COLORS = ['white','black'] as const`, `METER_VARIANTS = ['informative','positive','notice','negative'] as const`, `METER_LABEL_POSITIONS = ['top','side'] as const`, and the corresponding `MeterSize`, `MeterStaticColor`, `MeterVariant`, `MeterLabelPosition` types
- [ ] `Meter.base.ts`: declare typed properties — `value` (number, default 0), `minValue` (number, default 0), `maxValue` (number, default 100), `accessibleLabel` (string, default `''`, attr `accessible-label`), `valueLabel` (string, optional), `format` (string shorthand, default `'percent'`, attr `format`), `variant` (typed enum, default `'informative'`), `labelPosition` (typed enum, default `'top'`), `staticColor` (typed, optional), `size` (typed, default `'m'` via `SizedMixin`)
- [ ] `Meter.base.ts` `firstUpdated`: set `role="meter"` on host (always; no conditional)
- [ ] `Meter.base.ts` `updated`: maintain `aria-valuemin=<minValue>`, `aria-valuemax=<maxValue>`, `aria-valuenow=<clamped value>`, `aria-valuetext=<formatted value>`, and `aria-label=<resolved name>` (slot text > `accessibleLabel`) per [Accessibility semantics notes](#accessibility-semantics-notes-2nd-gen)
- [ ] `Meter.base.ts`: clamp `value` into `[minValue, maxValue]` for both rendering and ARIA
- [ ] `Meter.base.ts`: parse `format` shorthand into `Intl.NumberFormatOptions` (`<style>` or `<style>-<arg>`; supported styles: `decimal`, `percent`, `currency`, `unit`); default `{ style: 'percent' }` when `format` unset or invalid; format value via `Intl.NumberFormat(language, opts)`; for percent style, feed normalized fraction
- [ ] `Meter.base.ts`: handle default-slot `slotchange` to hoist slot text into the resolved a11y name via `getLabelFromSlot` (slot wins over `accessibleLabel`; precedent: `ProgressCircleBase.handleSlotchange`)
- [ ] `Meter.base.ts`: when `slot="help-text"` is non-empty, set `aria-describedby` on the host pointing at the slotted node (or an internal id assigned to it)
- [ ] `Meter.base.ts`: emit DEBUG-mode warning when no accessible name is provable, mirroring `ProgressCircleBase`

#### Alignment checks

- [ ] `variant` set matches React Spectrum S2 (`informative`, `positive`, `notice`, `negative`) and Figma `S2 / Web (Desktop scale)` Variant panel
- [ ] `staticColor` set matches `spectrum-css` `spectrum-two` (`staticWhite`, `staticBlack`) and Figma `Static white` / `Static black` panels; React's `'auto'` is deferred (no S2 CSS support)
- [ ] `labelPosition` matches React Spectrum (`top` default, `side`); side-label coverage backed by `spectrum-css` `spectrum-two` `progressbar/index.css` `.spectrum-ProgressBar--sideLabel`
- [ ] `value-label` attribute matches React Spectrum `valueLabel` (string only — no slot)
- [ ] `format` shorthand attribute (`percent` default, `decimal`, `currency-<ISO>`, `unit-<cldr-unit>`) parses to a subset of React Spectrum `formatOptions` (style + currency or unit). Power-user `Intl.NumberFormatOptions` fields (e.g. `notation`, `roundingMode`) not supported in this iteration; tracked as deferred follow-up.

### Styling

> Follow the [CSS style guide](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/) as the source of truth for all styling work. Key references: [migration steps](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/04_spectrum-swc-migration.md), [custom properties](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md), [anti-patterns](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/05_anti-patterns.md).

- [ ] Render the internal wrapper as `<div class="swc-Meter">`; do not target `:host` for component visuals
- [ ] Copy S2 source from `spectrum-css` `spectrum-two` branch — `components/meter/index.css` plus the relevant rules from `components/progressbar/index.css` (the meter file is mostly progress-bar passthroughs and contains no bar visuals on its own) — into `meter.css` as the baseline
- [ ] Strip all `--mod-*` properties; replace with the reviewed `--swc-meter-*` set defined in [2nd-gen API decisions](#2nd-gen-api-decisions)
- [ ] Variant fill colors via tokens (`positive-visual-color`, `notice-visual-color`, `negative-visual-color`; `accent-content-color-default` for the `informative` default)
- [ ] Static-color rules for both `staticWhite` and `staticBlack` modifiers
- [ ] `label-position="side"` layout rule (`.swc-Meter--sideLabel`) mirroring `spectrum-css` `spectrum-two` `.spectrum-ProgressBar--sideLabel`
- [ ] Help-text spacing rule (`--swc-meter-help-text-spacing`) and visibility gating when `slot="help-text"` is empty

#### Visual model and regressions

- [ ] Verify i18n size modifiers (`:lang(ja)`, `:lang(ko)`, `:lang(zh)`) if present in S2 source
- [ ] Pass stylelint (property order, `no-descending-specificity`, token validation)
- [ ] Forced-colors / high-contrast block at the bottom of the file

### Accessibility

#### Naming and semantics

- [ ] Single `role="meter"` on host. No combined role string.
- [ ] `aria-valuemin=<minValue>`, `aria-valuemax=<maxValue>`, `aria-valuenow=<clamped value>`, `aria-valuetext=<formatted value>` on host
- [ ] Accessible name from default slot text (primary) or `accessible-label` attribute (fallback). No raw `aria-label`/`aria-labelledby` passthrough.
- [ ] `aria-describedby` wired to the `slot="help-text"` content when non-empty
- [ ] DEBUG warning when no accessible name is provable
- [ ] Non-focusable: no `tabindex`, host receives no interactive role

#### State verification

- [ ] `aria-valuetext` re-formats on `language-resolver-updated` and on changes to `value`/`minValue`/`maxValue`/`valueLabel`/`format`
- [ ] `aria-valuenow` and `aria-valuetext` update in lockstep on `value` change
- [ ] `value-label` attribute overrides auto-formatted text in both visible value and `aria-valuetext`
- [ ] No `aria-live` regions added by default

### Testing

- [ ] Port `1st-gen/packages/meter/test/meter.test.ts` coverage that still applies, adapted to the new API (variant validation, label-from-slot, `value`→`aria-valuenow`, locale resolution `en-US` and `ar-sa`)
- [ ] Add Playwright `meter.a11y.spec.ts` with `toMatchAriaSnapshot` covering size × variant × `label-position` × static-color × key `value` values (0%, 50%, 100%) × help-text presence

#### Behavior

- [ ] Single `role="meter"` (assert exact attribute string; regression for B9)
- [ ] `aria-valuemin`/`aria-valuemax`/`aria-valuenow`/`aria-valuetext` correctness across `value = minValue / midpoint / maxValue`
- [ ] Custom `minValue`/`maxValue` clamps `value` correctly and feeds ARIA accordingly
- [ ] `aria-valuetext` matches default percent format in `en-US` (e.g. `50%`) and `ar-sa` (Arabic-Indic digits + `٪`)
- [ ] `value-label` (attribute) overrides auto-formatted text
- [ ] `format` drives auto-formatted text (`format="currency-USD"` → currency formatting; `format="unit-inch"` → unit formatting; `format="decimal"` → plain number; default `format="percent"`)
- [ ] `label-position="side"` lays out label inline with value and bar
- [ ] DEBUG warning fires when no accessible name is provable; does not fire when default slot text or `accessible-label` is present
- [ ] Host is not focusable (`document.activeElement` skips it on `Tab`)

#### Visual regression

- [ ] Add VRT coverage for size × variant × `label-position` combinations
- [ ] Add VRT coverage for both `static-color` values on their approved backgrounds (per Figma `Static white` / `Static black` panels)
- [ ] Add VRT coverage for `value = 0%`, `25%`, `50%`, `75%`, `100%` (3:1 contrast checks at 0%)
- [ ] Add VRT coverage for the `help-text` slot present vs absent
- [ ] Add forced-colors / high-contrast VRT coverage

### Documentation

#### General

- [ ] JSDoc on all public props, slots, and CSS custom properties in `Meter.base.ts` and `Meter.ts`
- [ ] Storybook stories: Playground, Overview, Anatomy, Sizes, Variants, LabelPosition (top vs side), Values (0/25/50/75/100%), CustomRange (`min-value`/`max-value`), ValueLabel, FormatOptions, HelpText, StaticWhite, StaticBlack, StaticColors (combined), Accessibility (per [stories-format](../../../../.ai/rules/stories-format.md) and [stories-documentation](../../../../.ai/rules/stories-documentation.md))
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

- **Q1 (architecture)** — Closed. Independent `<swc-meter>` with no shared base. Bar styles live in `meter.css`. Reflected in [Architecture: core vs SWC split](#architecture-core-vs-swc-split) and [Migration sequencing and prerequisites](#migration-sequencing-and-prerequisites).
- **Q2 (variants)** — Closed. `{informative (default), positive, notice, negative}` per React Spectrum S2 + Figma. Reflected in [Public API](#public-api) and B5.
- **Q3 (static colors)** — Closed. `{white, black}` per `spectrum-css` `spectrum-two` + Figma. React's `'auto'` deferred (no S2 CSS support). Reflected in [Public API](#public-api), A1, and the deferred-ticket table below.
- **Q4 (help text)** — Closed. Named slot `slot="help-text"` rendered inside the meter's S2 helptext region; consumer composes their help-text element. Reflected in A2 and the rendering shape in [Architecture: core vs SWC split](#architecture-core-vs-swc-split).
- **Q5 (field-label)** — Closed. Render plain `<label class="swc-Meter-label">` / `<label class="swc-Meter-value">` (SWC-namespaced selectors). No dependency on `<swc-field-label>`. Reflected in B8.
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
