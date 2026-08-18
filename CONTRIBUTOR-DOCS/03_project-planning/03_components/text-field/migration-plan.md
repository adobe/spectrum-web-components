<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Text Field / Text field migration plan

<!-- Document title (editable) -->

# Text field migration plan

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
- [References](#references)

</details>

<!-- Document content (editable) -->

> **Epic SWC-2323** · Planning output. Must be reviewed before implementation begins.
>
> This plan is **provisional**. It was drafted before the Figma `S2 / Web (Desktop scale)` reference and a sibling `spectrum-css@spectrum-two` checkout were available, and before the non-a11y gen1 Jira issue list was pulled. Sections that depend on those inputs are marked. See [Blockers and open questions](#blockers-and-open-questions).
>
> This plan provides recommendations, not just observations. It draws heavily on the [accessibility migration analysis](./accessibility-migration-analysis.md), which is authoritative for the 2nd-gen semantic and labelling design and was authored against the approved [forms strategy RFC](../../05_strategies/forms-strategy-rfc.md) (SWC-1888).

---

## TL;DR

- **Scope narrows to single-line.** 1st-gen `sp-textfield` covers both single-line and multiline (`multiline`/`grows`/`rows`). 2nd-gen splits these: `swc-text-field` is **single-line only**, and multiline moves to a separate **`swc-text-area`** component (per the [a11y analysis](./accessibility-migration-analysis.md#recommendations-swc-text-field)). `multiline`, `grows`, and `rows` therefore leave this component's surface. **Confirm scope split (Q6).**
- **Labelling and help/error move in-shadow.** 2nd-gen does **not** depend on a migrated `swc-field-label`/`swc-help-text`. A shared **`LabellingController`** (SWC-2466) renders the visible label, required indicator, help text, and error message inside the field's own shadow root, eliminating 1st-gen's cross-root ARIA reach-in and two-writer hazard. Form participation uses a shared **`FieldAssociationController`** (SWC-2467) via `ElementInternals`. These two controllers are the real prerequisites (Q8).
- **Headline breaking changes (must ship):** remove `quiet` (removed in S2, Q1); rename `label` → `accessible-label` and add `accessible-labelledby`/`accessible-describedby`, dropping the placeholder-as-`aria-label` fallback in favor of a dev-warning (Q10); drop the `TruncatedValueTooltipController` and its tooltip dependency entirely (Q9).
- **A11y is non-negotiable and well-specified.** Add `aria-errormessage` on invalid, `inputmode`, native form association, `delegatesFocus: true`, and `:focus-visible` keyboard-focus differentiation (a WCAG 2.4.7 gap in 1st-gen).
- **Largest risks / decisions:** the single-line/multiline split (Q6), whether the field family shares a **base class or shared controllers** (Q7), and availability of the two shared controllers (Q8). These are architectural and should be settled before Phase 3 (API).
- **Deferred, not dropped:** character count, in-field pending (infield progress circle, not yet built), side-label position ownership, required-without-asterisk styling, the new inline variant, `prefix` affix, and in-field ContextualHelp.

### Most blocking open questions

- **Q7** in [Architecture and behavior](#architecture-and-behavior): field-family sharing model — small shared base vs shared controllers — for `number-field`, `color-field`, and `text-area`. This is now the single genuinely-blocking question.
- **Q1** in [Design](#design): remove `quiet` — **effectively decided** (three sources agree; only Design acknowledgment of the breaking change remains). Use case maps to the inline variant (Q17).

**Resolved since drafting:** **Q6** (single-line / `swc-text-area` split) and **Q10** (`label` → `accessible-label`, drop the placeholder-as-accessible-name fallback) are confirmed by the [accessibility analysis](./accessibility-migration-analysis.md), the plan's source of truth. **Q8** (the two shared controllers) is a sequenced dependency owned by separate Epic SWC-2323 tickets and lands later; it does **not** block this planning ticket or the plan itself.

---

## 1st-gen API surface

**Source:** [`1st-gen/packages/textfield/src/Textfield.ts`](../../../../1st-gen/packages/textfield/src/Textfield.ts)
**Version:** `@spectrum-web-components/textfield@1.12.2`
**Custom element tag:** `sp-textfield` (with `sp-textfield[multiline]` serving as the textarea)

The class is split `TextfieldBase` → `Textfield`, where `TextfieldBase extends ManageHelpText(SizedMixin(Focusable, { noDefaultSize: true }))`. `NumberField` and `ColorField` both `extends TextfieldBase`.

### Properties / attributes

| Property | Type | Default | Attribute | Notes |
| -------- | ---- | ------- | --------- | ----- |
| `allowedKeys` | `string` | `''` | `allowed-keys` | Regex of characters permitted to update the value. Niche; undocumented in README. |
| `focused` | `boolean` | `false` | `focused` (reflect) | `@private` internal state driven by `onFocus`/`onBlur`. |
| `invalid` | `boolean` | `false` | `invalid` (reflect) | Value is invalid. |
| `valid` | `boolean` | `false` | `valid` (reflect) | Value is valid (drives the checkmark icon). |
| `label` | `string` | `''` | `label` | Applied as `aria-label` when no visible label; also falls back to `placeholder`. |
| `name` | `string \| undefined` | `undefined` | `name` (reflect) | Form control name. |
| `placeholder` | `string` | `''` | `placeholder` | Placeholder text; also used as `aria-label` fallback (1st-gen). |
| `type` | `TextfieldType` | `'text'` | `type` (reflect) | `text \| url \| tel \| email \| password`. Backed by a private `_type` to reflect invalid values. |
| `pattern` | `string \| undefined` | `undefined` | `pattern` | Native validation pattern. |
| `grows` | `boolean` | `false` | `grows` (reflect) | Multiline autosize. **(→ `swc-text-area`)** |
| `maxlength` | `number` | `-1` | `maxlength` | `-1` sentinel = unset. |
| `minlength` | `number` | `-1` | `minlength` | `-1` sentinel = unset. |
| `multiline` | `boolean` | `false` | `multiline` (reflect) | Renders `<textarea>`. **(→ `swc-text-area`)** |
| `rows` | `number` | `-1` | `rows` | Multiline rows. **(→ `swc-text-area`)** |
| `readonly` | `boolean` | `false` | `readonly` (reflect) | Non-editable but focusable. |
| `required` | `boolean` | `false` | `required` (reflect) | Invalid when empty. |
| `quiet` | `boolean` | `false` | `quiet` (reflect) | No visible background. **Removed in S2.** |
| `value` | `string \| number` | `''` | (property; not reflected) | `TextfieldBase` allows `string \| number`; `Textfield` narrows to `string`. |
| `autocomplete` | union incl. `'list' \| 'none'` | `undefined` | `autocomplete` (reflect) | Widened with combobox-only tokens in 1st-gen. |
| `truncatedValueTooltipPlacement` | `Placement` | `'bottom'` | `tooltip-placement` | Placement of the truncated-value tooltip. **Dropped in 2nd-gen.** |
| `size` (SizedMixin) | `'s' \| 'm' \| 'l' \| 'xl'` | none (`noDefaultSize`) | `size` (reflect) | Effective default `m` via CSS/consumers. |
| `disabled`, `autofocus`, `tabIndex` (Focusable) | — | — | `disabled`, `autofocus`, `tabindex` | Standard focusable surface. |

### Methods

| Method | Signature | Notes |
| ------ | --------- | ----- |
| `setSelectionRange` | `(start: number, end: number, direction?: 'forward' \| 'backward' \| 'none') => void` | Delegates to the inner input/textarea. |
| `select` | `() => void` | Selects all text. |
| `checkValidity` | `() => boolean` | Runs native + pattern/minlength checks and sets `valid`/`invalid`. |
| `focus` / `focusElement` | (Focusable) | Focus delegates to the inner control. |

### Events

- `input` — value changed (native, re-dispatched through the control).
- `change` — value change committed by the user; re-dispatched with `{ bubbles: true, composed: true }`.

### Slots

| Slot | Content | Notes |
| ---- | ------- | ----- |
| `help-text` | Default / non-negative help text | Provided by the `ManageHelpText` mixin. |
| `negative-help-text` | Help text shown when `invalid` | Self-managed based on `invalid`. |

### CSS custom properties

1st-gen exposes a large `--mod-textfield-*` / `--mod-text-area-*` modifier surface (border colors across every focus/hover/invalid permutation, spacing, typography, icon sizing/spacing, character-count spacing, width/height). See the [rendering-and-styling migration analysis](../textfield/rendering-and-styling-migration-analysis.md) for the full list.

This full modifier surface will not be carried forward to 2nd-gen.

### Shadow DOM output (rendered HTML)

Single-line:

```html
<div id="textfield">
  <!-- state icon when invalid or valid -->
  <sp-icon-alert id="invalid" class="icon"></sp-icon-alert>
  <input
    name="…"
    type="text"
    aria-describedby="sp-help-text-…"
    aria-label="…"
    aria-invalid="true"
    class="input"
    placeholder="…"
    .value="…"
    ?disabled ?required ?readonly
    autocomplete="…"
  />
</div>
<!-- truncated-value tooltip controller output -->
<!-- help-text container (from ManageHelpText), aria-live="assertive" -->
```

Multiline (`<textarea>`, optionally with a `#sizer` div when `grows` and `rows === -1`) is structurally the same wrapper — this path becomes `swc-text-area`.

---

## Dependencies

| Package | Version | Role |
| ------- | ------- | ---- |
| `@spectrum-web-components/base` | workspace | `SizedMixin`, `Focusable` host, Lit `html`/directives (`ifDefined`, `live`). |
| `@spectrum-web-components/help-text` | workspace | `ManageHelpText` mixin (slotted help/negative-help text). **Replaced by `LabellingController` in 2nd-gen.** |
| `@spectrum-web-components/shared` | workspace | `Focusable`. |
| `@spectrum-web-components/icon` | workspace | Checkmark icon styles. |
| `@spectrum-web-components/icons-ui` | workspace | `sp-icon-checkmark100` (valid icon). |
| `@spectrum-web-components/icons-workflow` | workspace | `sp-icon-alert` (invalid icon). |
| `@spectrum-web-components/overlay` | workspace | `Placement` type for the truncated-value tooltip. **Dropped in 2nd-gen.** |
| `TruncatedValueTooltipController` (internal) | — | Custom overlay/tooltip revealing a truncated value. **Dropped in 2nd-gen.** |
| `LabellingController` (SWC-2466) | **not yet built** | In-shadow label/help/error render. **Prerequisite (verified absent from `2nd-gen/packages/core/controllers/`).** |
| `FieldAssociationController` (SWC-2467) | **not yet built** | `ElementInternals` form participation. **Prerequisite (verified absent).** |

**Reverse dependencies (1st-gen).** `NumberField` and `ColorField` both `extends TextfieldBase`: `NumberField` overrides `value` (number), `handleInput`, and `renderField` (wraps stepper buttons) and drives the truncation tooltip's `syncTooltipText`; `ColorField` overrides `value`, `render`, and `checkValidity`. The extension points they rely on (`handleInput`, `handleChange`, `renderField`, value coercion) must have clean equivalents in the 2nd-gen core base or shared controllers, and the dropped `syncTooltipText` coupling must be re-solved without the tooltip when `number-field` migrates. These reverse dependencies drive the shared-base decision (Q7).

---

## Open gen1 issues

<!-- Provisional: no Jira tool was available while drafting. Populate from a JQL export `component = "Textfield" AND type in (Bug, Story) AND status != Done AND labels not in (a11y, gen2)`, excluding Epics/Initiatives. The a11y-labelled issues live in the accessibility analysis's own Jira table and are intentionally NOT duplicated here. -->

| Jira | Type | Status (snapshot) | Summary |
| ---- | ---- | ----------------- | ------- |
| _TBD_ | — | — | Pending Jira export for non-a11y gen1 `sp-textfield` issues (Q18). |

> Candidates to verify (labels unknown without Jira access; include only if **not** `a11y`/`gen2`-labelled and not `Done`): [SWC-1078](https://jira.corp.adobe.com/browse/SWC-1078) (truncated placeholder — relevant since the truncation tooltip is dropped), [SWC-847](https://jira.corp.adobe.com/browse/SWC-847) (invalid border colors), [SWC-713](https://jira.corp.adobe.com/browse/SWC-713) (validation icons not responsive to resize). These surfaced in the accessibility analysis's Jira table; confirm labels before promoting them into the table above.

## Migration sequencing and prerequisites

### Dependency-aware recommendation

Migrate `swc-text-field` **first among the field family**, but only **after** the two shared field controllers exist:

1. **`LabellingController`** (SWC-2466) — renders label, required indicator, help text, and error message in-shadow via a shared render directive (the pattern `renderPendingSpinner` already establishes) plus a shared stylesheet. Exposes `accessible-label`, `accessible-labelledby`, and `accessible-describedby`.
2. **`FieldAssociationController`** (SWC-2467) — `formAssociated`, `attachInternals()`, `setFormValue()`, `formResetCallback()`, `formDisabledCallback()`.

`swc-text-field` is the simplest consumer of both controllers, so it is the right proving ground before `number-field`, `color-field`, and `text-area` adopt them.

### Related components and ordering notes

- **`swc-text-area`** — the multiline sibling extracted from 1st-gen `sp-textfield[multiline]`. Should follow `swc-text-field` and reuse the same controllers. Has its own [accessibility analysis](../text-area/accessibility-migration-analysis.md).
- **`number-field`, `color-field`** — both `extends TextfieldBase` in 1st-gen. In 2nd-gen they should consume the same controllers; whether they also share a base class is Q7.
- **`help-text`, `field-label`** — only *analyzed*, not migrated. Deliberately **not** prerequisites: 2nd-gen renders label/help/error in-shadow via `LabellingController` instead of composing separate elements.
- **`tooltip`, `progress-circle`** — migrated. `tooltip` is no longer needed here (truncation tooltip dropped). `progress-circle` is not the pending surface; **`infield-progress-circle`** is, and it is not yet built (defers in-field pending — Q15).
- **Shared `_lit-styles/` fragment** — the label/required/help/error stylesheet is a genuine shared structural pattern across every field that adopts `LabellingController` (`2nd-gen/packages/swc/stylesheets/_lit-styles/` already hosts `pending-spinner.css` as precedent). Recommend it live as a shared fragment created and owned alongside the controllers and consumed by `text-field`, not authored inside `text-field`. Fragment name/ownership is Q22.
- **Global element stylesheet** — no `stylesheets/global/global-text-field.css` is anticipated (text-field is not a bare global element like link/button). Mark **N/A** unless Design wants a global input baseline.

### User confirmation needed

- Q6 (single-line vs multiline split), Q7 (shared base vs shared controllers), and Q8 (controller availability) all require team confirmation before Phase 3. These are marked provisional throughout.

---

## Changes overview

> **Priority framing:**
>
> - **Must ship** items define the in-scope work required for this migration.
> - **Additive** items are typically deferred or out of scope unless explicitly pulled in.
> - **Accessibility is non-negotiable** — all a11y requirements ship as part of this migration.
> - **Breaking changes** are assessed on merit — some must ship now to avoid a second, more disruptive migration later.

### Must ship — breaking or a11y-required

#### API and naming

| #   | What changes | 1st-gen behavior | 2nd-gen behavior | Consumer migration path |
| --- | ------------ | ---------------- | ---------------- | ----------------------- |
| B1 | Remove `quiet` | `quiet` attribute renders a no-background field | Attribute removed (sources: [rendering analysis](../textfield/rendering-and-styling-migration-analysis.md#css-spectrum-2-changes) + Figma matrix) | Remove `quiet`; dense/table use case maps to the inline variant (Q17). |
| B2 | Rename `label` → `accessible-label` | `label` sets `aria-label` and falls back to `placeholder` | `accessible-label` sets `aria-label`; placeholder fallback removed and dev-warned; visible label is slotted and rendered in-shadow (source: [a11y analysis](./accessibility-migration-analysis.md#aria-roles-states-and-properties)) | Rename `label` → `accessible-label`, or provide a slotted visible label. Unlabeled fields now dev-warn. |
| B3 | Split multiline into `swc-text-area` | `sp-textfield[multiline]` | `swc-text-field` is single-line only; use `swc-text-area` for multiline | Replace `<sp-textfield multiline>` with `<swc-text-area>`; `grows`/`rows` move there. |
| B4 | Drop truncated-value tooltip | `TruncatedValueTooltipController` + `tooltip-placement` | Removed; full value reachable natively; optional pointer-only `title` (source: [a11y analysis](./accessibility-migration-analysis.md#aria-roles-states-and-properties)) | Remove `tooltip-placement`; no replacement needed. |
| B5 | Narrow `autocomplete` type | Union widened with combobox-only `'list'`/`'none'` | Dedicated `autocomplete` type without combobox tokens (source: [a11y analysis](./accessibility-migration-analysis.md#aria-roles-states-and-properties)) | Combobox tokens move to the combobox component; ordinary tokens unaffected. |

#### Styling and visuals

| #   | What changes | 1st-gen behavior | 2nd-gen behavior | Consumer migration path |
| --- | ------------ | ---------------- | ---------------- | ----------------------- |
| B6 | `--mod-*` surface removed | ~60 `--mod-textfield-*`/`--mod-text-area-*` custom properties | Not exposed; a small reviewed `--swc-*` set only | Remove `--mod-*` overrides; file requests for any needed `--swc-*`. |
| B7 | Validation icons updated | `Alert` (invalid), simple `Checkmark` (valid) | `AlertTriangle` (invalid), size-specific `Checkmark75/100/200/300` (valid) (source: [rendering analysis](../textfield/rendering-and-styling-migration-analysis.md#css-spectrum-2-changes)) | Internal; no consumer action. Icons stay `aria-hidden`. |

#### Accessibility and behavior

| #   | What changes | 1st-gen behavior | 2nd-gen behavior | Consumer migration path |
| --- | ------------ | ---------------- | ---------------- | ----------------------- |
| B8 | In-shadow labelling | `sp-field-label` reaches across shadow roots to set `aria-label`; two-writer hazard | `LabellingController` renders label/required/help/error in one shadow root; single writer by construction | Prefer slotted label or `accessible-label`; external association via `accessible-labelledby`. |
| B9 | Add `aria-errormessage` | none | Set on the input while `invalid` is `true`, alongside `aria-describedby` | None (additive AT improvement). |
| B10 | Add `inputmode` | none | Author-settable virtual-keyboard hint | None (additive). |
| B11 | Native form association | Named `<input>` only; no `ElementInternals` | `FieldAssociationController` (`ElementInternals`), incl. `fieldset[disabled]` cascade and form reset | None for basic forms; gains reset/disabled cascade. |
| B12 | Keyboard-focus differentiation | Same focus styling for pointer and keyboard | `:focus-visible` keyboard ring (fixes [WCAG 2.4.7](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html)) | None (visual/a11y fix). |
| B13 | Help/error `aria-live` | Container defaults to `aria-live="assertive"` | No default live region; same-root `aria-describedby` covers the common case (polite only if truly needed) | None. |
| B14 | `delegatesFocus` | Host-level focus indirection | Shadow root `delegatesFocus: true`; focus lands on the real `<input>` | None. |

### Additive — ships when ready, zero breakage for consumers already on 2nd-gen

| #   | What is added | Notes |
| --- | ------------- | ----- |
| A1 | Character count | 1st-gen never implemented it; if added, associate via `aria-describedby`, not visual-only. |
| A2 | In-field pending state | Uses `infield-progress-circle` (not yet built). |
| A3 | Side-label position | Ownership (`swc-text-field` vs `field-label`) is Q2. |
| A4 | Required-without-asterisk styling | S2 adds `isRequiredWithoutAsterisk`; needs Design confirmation (Q4). |
| A5 | Inline text-field variant | New in S2; **published in Figma** (the source of truth) as a separate "Text field (In-line)" component — corrects the earlier "not in Figma yet." Not yet built in SWC. Additive; whether to schedule it now is Q17. |
| A6 | `prefix` affix | RS supports; not in Figma yet; anticipate as future `LabellingController` surface. |
| A7 | In-field ContextualHelp | RS supports; future `LabellingController` description source. |

---

## 2nd-gen API decisions

These are derived from the 1st-gen implementation, the [accessibility migration analysis](./accessibility-migration-analysis.md), the [rendering-and-styling analysis](../textfield/rendering-and-styling-migration-analysis.md), the approved forms strategy (SWC-1888), and React Spectrum. The Figma `S2 / Web (Desktop scale)` visual spec and a `spectrum-css@spectrum-two` checkout were not available while drafting; visual-matrix items are provisional.

- **Confirmed**: directly supported by source material
- **Inferred**: recommended from multiple signals, not stated in one authoritative source
- **Open question**: unresolved; see [Blockers and open questions](#blockers-and-open-questions)

### Public API

#### Properties / attributes (2nd-gen)

| Property | Type | Default | Attribute | Notes |
| -------- | ---- | ------- | --------- | ----- |
| `accessibleLabel` | `string` | `''` | `accessible-label` | **Confirmed.** Sets `aria-label` on the input. Replaces 1st-gen `label`. |
| `accessibleLabelledby` | element refs | — | `accessible-labelledby` | **Confirmed.** External labelling via `ariaLabelledByElements` (grid header case). |
| `accessibleDescribedby` | element refs | — | `accessible-describedby` | **Confirmed.** External description via `ariaDescribedByElements`. |
| `value` | `string` | `''` | (property) | **Inferred.** Single-line value is a string; drop the `string \| number` base union (that was for `number-field`). |
| `name` | `string \| undefined` | `undefined` | `name` (reflect) | **Confirmed.** Form control name. |
| `type` | `'text' \| 'url' \| 'tel' \| 'email' \| 'password'` | `'text'` | `type` (reflect) | **Confirmed.** Validate via `validateEnum`; drop the `_type` reflection quirk (Q13). |
| `placeholder` | `string` | `''` | `placeholder` | **Confirmed.** Never the accessible name; no `aria-placeholder`. |
| `pattern` | `string \| undefined` | `undefined` | `pattern` | **Confirmed.** |
| `inputmode` | `string \| undefined` | `undefined` | `inputmode` | **Confirmed.** New; virtual-keyboard hint. |
| `autocomplete` | dedicated token type | `undefined` | `autocomplete` (reflect) | **Confirmed.** No combobox tokens. |
| `maxlength` / `minlength` | `number` | `undefined` | `maxlength` / `minlength` | **Inferred.** Prefer `undefined` over the `-1` sentinel. |
| `readonly` | `boolean` | `false` | `readonly` (reflect) | **Confirmed.** Focusable, non-editable; distinct from `disabled`. |
| `required` | `boolean` | `false` | `required` (reflect) | **Confirmed.** Native `required`; no `aria-required`. |
| `invalid` | `boolean` | `false` | `invalid` (reflect) | **Confirmed.** Drives `aria-invalid`/`aria-errormessage`. |
| `valid` | `boolean` | `false` | `valid` (reflect) | **Inferred.** Keep for the checkmark; confirm S2 keeps an explicit valid state. The received S2 state matrix shows only default and error states (no valid/checkmark column) — a soft signal to verify the checkmark still exists in S2 before keeping this. |
| `size` | `'s' \| 'm' \| 'l' \| 'xl'` | `'m'` | `size` (reflect) | **Inferred.** Give an explicit default `m` (drop `noDefaultSize`). |
| `disabled` | `boolean` | `false` | `disabled` (reflect) | **Confirmed.** Removed from tab order; `formDisabledCallback` cascade. |
| `allowedKeys` | `string` | `''` | `allowed-keys` | **Open question (Q11).** Niche 1st-gen quirk; carry forward or drop. |
| `focused` | — | — | — | **Inferred: remove.** Replace the reflected `focused` attribute with CSS `:focus-visible`/`:focus-within` (Q12). |
| `quiet`, `multiline`, `grows`, `rows`, `truncatedValueTooltipPlacement` | — | — | — | **Removed** (see B1, B3, B4). |

#### Visual matrix (2nd-gen)

**Visual axes confirmed by the received S2 state matrix (2026-08-18); exact token values still to be extracted from Figma (the source of truth) — Q20.** Axes: sizes `s`/`m`/`l`/`xl`; label position **top and side** (both first-class, present at every size — Q2); states default / hover / focus+hover / focus+not-hover / disabled; content empty / value / placeholder; invalid (red border + trailing AlertTriangle + error message). No `quiet` column (removed — Q1). **Not shown in the matrix:** a `readonly` treatment (Q3) and an explicit valid/checkmark state — both unconfirmed. Character count and in-field pending remain additive (A1, A2).

#### Slots (2nd-gen)

| Slot | Content | Notes |
| ---- | ------- | ----- |
| (default) | Visible label content | **Inferred.** Rendered in-shadow as a real `<label for>` by `LabellingController`. Confirm slot name with the controller's API (Q8). |
| `help-text` | Default / non-negative help text | **Confirmed.** Associated via same-root `aria-describedby` only when present. |
| `negative-help-text` | Error/help text shown when `invalid` | **Confirmed.** Also targeted by `aria-errormessage` when invalid. |

#### CSS custom properties (2nd-gen)

No `--mod-*` properties will be exposed. New `--swc-*` component-level properties may be introduced where needed — these are additive and not breaking. See [Component Custom Property Exposure](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#component-custom-property-exposure).

Each exposed `--swc-*` property must be documented with a `@cssprop` JSDoc tag on the primary SWC component class.

Initial expectation for Text field is a small reviewed set (likely field width/min-width).

### Behavioral semantics

- **Validation:** keep native constraint validation via a real `<input>`; `checkValidity()` remains public. Reflect `required`/`pattern`/`minlength`/`maxlength` to the native input. Suppress the native validation bubble in favor of the inline error message — mechanism and the full validation-behavior model (RS `native` vs `aria`, custom `validate`, server errors) deferred to the forms-strategy work (Q19).
- **Form reset:** `FieldAssociationController.formResetCallback()` restores a defined **default value** (the RS `defaultValue` concept — typically the initial attribute value). The reset target must be specified, not left implicit.
- **Events:** keep `input` and `change` (composed, bubbling), matching native semantics.
- **Selection API:** keep `setSelectionRange()` and `select()`.
- **Focus:** `delegatesFocus: true`; keyboard focus via `:focus-visible`.
- **Truncated value:** no reveal mechanism; native caret/selection/scroll suffices; optional pointer-only `title` mirroring `value`.

### Accessibility semantics notes (2nd-gen)

Authoritative source: [accessibility migration analysis](./accessibility-migration-analysis.md). Key points: host sets no `role` (native `<input>` supplies `textbox`); exactly one accessible-name writer via `LabellingController` in precedence order `accessible-labelledby` > `accessible-label` > slotted label; `aria-invalid` only when invalid (never explicit `"false"`); `aria-errormessage` only while invalid; validation icon stays `aria-hidden`; `readonly` and `disabled` stay distinct in tab order; no default `aria-live="assertive"`.

---

## Architecture: core vs SWC split

> The 1st-gen component is a **reference only** — 2nd-gen is built independently. Neither generation imports from the other.

Follow the [Badge migration reference](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#reference-badge-migration) for the core/SWC split.

| Layer    | Path                                            | Contains                                                                                                                                                                                                 |
| -------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Core** | `2nd-gen/packages/core/components/text-field/`  | `TextField.base.ts`, `TextField.types.ts`, enum/required validation, value normalization, and wiring of the shared `LabellingController` and `FieldAssociationController`. No rendering.                 |
| **SWC**  | `2nd-gen/packages/swc/components/text-field/`   | `TextField.ts`, `text-field.css`, `swc-text-field` registration, stories, tests, and S2 rendering/styling.                                                                                              |

Planned rendering shape:

- Core owns API normalization, enum/required dev-warnings (via `validateEnum`/`warnIf`), value/validity state, and controller wiring.
- SWC renders: a `.swc-TextField` wrapper containing the `LabellingController` output (label, required indicator), the real `<input class="input">`, the validation icon (`aria-hidden`), and the help/error container.

**Field-family sharing (Q7).** The 1st-gen `TextfieldBase` inheritance (used by `number-field`/`color-field`) is likely better expressed in 2nd-gen as **shared controllers + a small shared base**, so `text-area`, `number-field`, and `color-field` compose the same `LabellingController`/`FieldAssociationController` rather than deep-inheriting a single class. Marked provisional pending the architecture decision.

---

## Migration checklist

### Preparation (this ticket)

- [x] 1st-gen API surface documented
- [x] Dependencies identified
- [x] Breaking changes documented
- [x] 2nd-gen API decisions drafted
- [ ] Plan reviewed by at least one other engineer

### Setup

- [ ] Create `2nd-gen/packages/core/components/text-field/`
- [ ] Create `2nd-gen/packages/swc/components/text-field/`
- [ ] Wire exports in both `package.json` files
- [ ] Check out `spectrum-css` at `spectrum-two` branch as sibling directory
- [ ] Confirm `LabellingController` (SWC-2466) and `FieldAssociationController` (SWC-2467) are available to depend on

### API

#### Naming and public surface

- [ ] `TextField.types.ts`: define `TextFieldType` and the `size` union; export public types
- [ ] `TextField.base.ts`: implement `accessible-label`/`accessible-labelledby`/`accessible-describedby`, `value` (string), `type`, `placeholder`, `pattern`, `inputmode`, `autocomplete`, `maxlength`/`minlength`, `readonly`, `required`, `invalid`/`valid`, `size`, `disabled`
- [ ] Remove `quiet`, `multiline`, `grows`, `rows`, `focused`, `tooltip-placement`
- [ ] Resolve `allowedKeys` (Q11) before finalizing the surface

#### Alignment checks

- [ ] Verify property names and defaults against Figma `S2 / Web (Desktop scale)` and [React Spectrum TextField](https://react-spectrum.adobe.com/TextField)
- [ ] Confirm the `type`/`autocomplete` token sets with the a11y reviewer

### Styling

> Follow the [CSS style guide](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/) as the source of truth. Key references: [migration steps](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/04_spectrum-swc-migration.md), [custom properties](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md), [anti-patterns](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/05_anti-patterns.md).

- [ ] Add `.swc-TextField` to the internal wrapper in `render()`; keep styling off `:host`
- [ ] Copy S2 source from `spectrum-css` `spectrum-two` branch `index.css` (not `/dist`) into `text-field.css` as baseline
- [ ] Consume the shared label/help/error stylesheet fragment from `_lit-styles/` (owned by the controllers) rather than re-authoring it (Q22)

#### Visual model and regressions

- [ ] Implement `:focus-visible` keyboard-focus differentiation (B12)
- [ ] Verify i18n size modifiers (`:lang(ja)`, `:lang(ko)`, `:lang(zh)`) if present in S2 source
- [ ] Add `@cssprop` JSDoc tag for every exposed `--swc-*` property
- [ ] Pass stylelint (property order, `no-descending-specificity`, token validation)

### Accessibility

<!-- Sourced from accessibility-migration-analysis.md summary checklist. -->

#### Naming and semantics

- [ ] `LabellingController` renders label/required/help/error in-shadow via the shared directive (no external `field-label`/`help-text`, no cross-root reach-in)
- [ ] Exactly one accessible-name writer; precedence `accessible-labelledby` > `accessible-label` > slotted label; no conflicting combinations
- [ ] Placeholder is never the accessible name; dev-warn an entirely unlabeled field; never set `aria-placeholder`
- [ ] `accessible-labelledby`/`accessible-describedby` resolve element references (not IDREF strings)

#### State verification

- [ ] `aria-invalid="true"` only when invalid (never explicit `"false"`)
- [ ] `aria-errormessage` set only while `invalid` is `true`, in addition to `aria-describedby`
- [ ] `FieldAssociationController` wires `formAssociated`, `attachInternals`, `setFormValue`, `formResetCallback`, `formDisabledCallback`
- [ ] Validation icon stays `aria-hidden="true"`
- [ ] `readonly` vs `disabled` distinct in tab order (not just visually)
- [ ] Help/error container does not default to `aria-live="assertive"`
- [ ] Border and focus-ring meet 3:1 non-text contrast ([WCAG 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)) against S2 tokens (re-check SWC-214)

### Testing

- [ ] Port applicable coverage from `1st-gen/packages/textfield/test/` (single-line only)
- [ ] Add Playwright `text-field.a11y.spec.ts` with `toMatchAriaSnapshot` (name/value/description across states and label positions)
- [ ] Unit: same-root unique ids; `aria-describedby` only when help/error present; form participation (`FormData`, reset, `fieldset[disabled]`)

#### Behavior

- [ ] `input`/`change` events; `checkValidity()`; `setSelectionRange()`/`select()`
- [ ] Dev-warning story for a field with no accessible name at all

#### Visual regression

- [ ] Add VRT coverage for size × state combinations (default/hover/focus/keyboard-focus/disabled/readonly/invalid/valid)
- [ ] Add focus-visible regression coverage for the keyboard ring (B12)
- [ ] Add forced-colors (high-contrast) coverage for invalid/valid and focus states

### Documentation

#### General

- [ ] JSDoc on all public props, slots, and `--swc-*` properties
- [ ] Storybook stories: anatomy, sizes, states, validation, label positions, accessibility

#### Breaking changes

- [ ] Consumer migration guide entries for B1–B5 (quiet removal, `label`→`accessible-label`, multiline→`swc-text-area`, tooltip removal, `autocomplete` narrowing)

### Review

- [ ] `yarn lint:2nd-gen` passes (ESLint, Stylelint, Prettier)
- [ ] Status table in workstream doc updated
- [ ] PR created with description referencing Epic SWC-2323
- [ ] Peer engineer sign-off

---

## Blockers and open questions

> **Update — design context received (2026-08-18).** The full S2 state × variant matrix is available (all four sizes × top/side × five states × content/error variants) — captured in the [Visual matrix](#visual-matrix-2nd-gen) subsection. Also received: a separate "Text field (In-line)" component (Q17/A5) and label-overflow guidance (Q24). Not covered: `readonly` (Q3) or an explicit valid state. Figma is the source of truth; exact token values still pending extraction (Q20).

### Design

| #   | Item | Blocking? | Status | Owner |
| --- | ---- | --------- | ------ | ----- |
| Q1 | Remove `quiet` (breaking). Removal confirmed by spectrum-css + rendering analysis + Figma matrix; the "keep it" impression is only 1st-gen's legacy docs. Use case maps to the inline variant (Q17, B1). | Yes | Effectively decided — Design to acknowledge breaking-change impact | Design |
| Q2 | Side-label ownership: `swc-text-field` or `field-label`? Matrix confirms side-label as first-class at every size, so the label renderer owns a top⇄side switch — leans toward the field/`LabellingController`. | No | Open (additive, A3) — ownership open | Design + Architecture |
| Q3 | `readonly` visual treatment (RS applies none) — confirm or specify. The received S2 state matrix has **no `readonly` column**, so this stays unconfirmed. | No | Open | Design |
| Q4 | Required-without-asterisk styling (`isRequiredWithoutAsterisk`) — in scope? | No | Open (additive, A4) | Design |
| Q5 | Validation icon updates (AlertTriangle; size-specific checkmarks). AlertTriangle appears on the trailing edge of the error rows in the S2 matrix (confirms the invalid icon). | No | Confirmed by rendering analysis + state matrix; verify sizing in Figma | Design + implementation |
| Q24 | Label text overflow / wrapping behavior (top and side): long labels wrap to multiple lines in Figma (per the "Prototyping edge cases" guidance), and side-label must reflow as the label column grows. Confirm wrap-vs-truncate and how side-label reflows — a `LabellingController` + layout concern (relates to Q2). Note: the Figma guidance describes Figma-prototyping workarounds, not necessarily component behavior. | No | Open — surfaced by design (2026-08-18) | Design + Architecture |
| Q25 | Non-text contrast (WCAG 1.4.11): re-evaluate border and focus-ring contrast for 3:1 against Spectrum 2 tokens — SWC-214 was Won't Fix under the old theme; don't assume that holds. | No | Open | Design + Styling |

### Architecture and behavior

| #   | Item | Blocking? | Status | Owner |
| --- | ---- | --------- | ------ | ----- |
| Q6 | Single-line `swc-text-field` vs multiline `swc-text-area` split. | — | Confirmed by the a11y analysis (plan source of truth) | Architecture |
| Q7 | Field-family sharing model for `number-field`/`color-field`/`text-area`: shared base (à la `ButtonBase`) vs controllers-only vs shared mixin. Lean: shared controllers + small base; hinges on `LabellingController` rendering scope (Q8). | Yes | Open | Architecture |
| Q9 | Drop `TruncatedValueTooltipController` and `tooltip-placement`. | No | Confirmed by a11y analysis; confirm no consumer relies on it | Accessibility reviewer |
| Q10 | `label` → `accessible-label` rename + remove placeholder-as-accessible-name fallback (dev-warn). | — | Confirmed by a11y analysis (plan source of truth) | Accessibility + API |
| Q11 | Carry forward or drop `allowedKeys`. | No | Open — lean drop (niche, undocumented) | API |
| Q12 | Remove reflected `focused` attribute in favor of `:focus-visible`/`:focus-within`. | No | Inferred | Implementation |
| Q13 | Simplify `type` handling with `validateEnum`; drop the `_type` reflection quirk. | No | Inferred | Implementation |
| Q14 | `autocomplete` dedicated token type (drop combobox tokens) + add `inputmode`. | No | Confirmed by a11y analysis | Accessibility + API |
| Q19 | Validation behavior model: RS `native` vs `aria`, native-bubble suppression, and whether to expose custom `validate` / server-error APIs. Deferred to forms-strategy (SWC-1888; ties to its `setValidity()` pass-through). | No | Deferred to forms-strategy work (SWC-1888) | Architecture |

### Scope and prerequisites

| #   | Item | Blocking? | Status | Owner |
| --- | ---- | --------- | ------ | ----- |
| Q8 | `LabellingController` (SWC-2466) and `FieldAssociationController` (SWC-2467) do not yet exist in `2nd-gen/packages/core/controllers/` (verified), but are **separate tickets under Epic SWC-2323** that land later. They do **not** block this planning ticket; `swc-text-field` implementation (Phase 3+) consumes them once available. | No | Resolved — sequenced dependency, separate epic tickets | Ticket owner / Architecture |
| Q22 | Shared label/required/help/error `_lit-styles/` fragment — name and ownership (created with the controllers, consumed by `text-field`). This is effectively the CSS half of Q7/Q8; decide it alongside the sharing model. | No | Open | CSS reviewer + Architecture |
| Q23 | In-field ContextualHelp (A7) placement: the plan describes it as **in-field**, but React Spectrum's `contextualHelp` places the element **next to the label**, not inside the input frame — reconcile against the S2 Figma before treating placement as settled. Regardless of placement, the `LabellingController` should model description sources (help text, error message, contextual help, `prefix`) as an **extensible set** so A6/A7 can be added without an API redesign. No 2nd-gen `contextual-help` component exists yet. | No | Open — deferred feature; confirm the controller API anticipates it | Accessibility + Architecture |
| Q15 | In-field pending state depends on `infield-progress-circle` (not built). | No | Deferred (additive, A2) | Scope |
| Q16 | Character count deferred. | No | Deferred (additive, A1) | Scope |
| Q17 | Inline text-field variant is **published in Figma** (separate "Text field (In-line)" component; Figma is the source of truth) — the earlier "not in Figma/Spectrum CSS yet" rationale is stale and not the deciding factor. It is a new **additive** S2 variant not yet built in SWC; default is to defer until scheduled unless prioritized into this migration. | No | Deferred (additive, A5) — defer unless prioritized | Scope |
| Q18 | Pull non-a11y gen1 `sp-textfield` Jira issues into the Open gen1 issues table. | No | Open — needs Jira export | Ticket owner |
| Q20 | Finalize the visual matrix and styling baseline from Figma `S2 / Web (Desktop scale)` — **the source of truth**. The state × variant matrix is now available (see the 2026-08-18 note) and is **complete on the visual axis** (all four sizes × top/side × five states × content/error variants) except `readonly` (Q3) and an explicit valid state. **Tokens live in Figma** but need deeper inspection to extract exact values (spacing, radius, focus-ring width); a `spectrum-css@spectrum-two` checkout is an optional cross-reference, not a prerequisite. | No (blocks finalizing token values) | Open — visual matrix complete; token values pending deeper Figma inspection | Ticket owner |
| Q21 | Consolidate doc folder slug to `text-field` (move `rendering-and-styling-migration-analysis.md` out of `textfield/`). | No | Open — recommend `text-field` | Ticket owner |

---

## References

- [Washing machine workflow](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md)
- [2nd-gen migration status table](../../02_workstreams/02_2nd-gen-component-migration/01_status.md)
- [Accessibility migration analysis](./accessibility-migration-analysis.md)
- [Rendering and styling migration analysis](../textfield/rendering-and-styling-migration-analysis.md) — currently under the `textfield/` slug; see Q21
- [Forms strategy RFC (SWC-1888)](../../05_strategies/forms-strategy-rfc.md)
- [Text area accessibility migration analysis](../text-area/accessibility-migration-analysis.md)
- [CSS style guide — Component Custom Property Exposure](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#component-custom-property-exposure)
- [1st-gen source](../../../../1st-gen/packages/textfield/src/Textfield.ts)
- [1st-gen TruncatedValueTooltipController](../../../../1st-gen/packages/textfield/src/TruncatedValueTooltipController.ts)
- [1st-gen tests](../../../../1st-gen/packages/textfield/test/)
- [1st-gen README](../../../../1st-gen/packages/textfield/README.md)
- [React Spectrum TextField](https://react-spectrum.adobe.com/TextField)
- [Spectrum CSS — `spectrum-two` branch](https://github.com/adobe/spectrum-css/tree/spectrum-two) — replace with the reviewed `spectrum-css/components/textfield/index.css` path once a sibling checkout exists (Q20)
- [Badge migration reference](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#reference-badge-migration)
- Epic: [SWC-2323](https://jira.corp.adobe.com/browse/SWC-2323) — Text field migration epic
- [SWC-2466](https://jira.corp.adobe.com/browse/SWC-2466) — `LabellingController`
- [SWC-2467](https://jira.corp.adobe.com/browse/SWC-2467) — `FieldAssociationController`
