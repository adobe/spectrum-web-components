<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Text Field / Text field migration plan

<!-- Document title (editable) -->

# Text field migration plan

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [TL;DR](#tldr)
    - [Blocker status](#blocker-status)
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
- [Decision log](#decision-log)
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

- **Scope narrows to single-line.** 1st-gen `sp-textfield` covers both single-line and multiline (`multiline`/`grows`/`rows`). 2nd-gen splits these: `swc-text-field` is **single-line only**, and multiline moves to a separate **`swc-text-area`** component (per the [a11y analysis](./accessibility-migration-analysis.md#recommendations-swc-text-field)). `multiline`, `grows`, and `rows` therefore leave this component's surface. **Scope split confirmed (Q6).**
- **Labelling and description/error move in-shadow.** 2nd-gen does **not** depend on a migrated `swc-field-label`/`swc-help-text`. A shared **`LabellingController`** (SWC-2466) renders the visible label, required indicator, description, and error message inside the field's own shadow root, eliminating 1st-gen's cross-root ARIA reach-in and two-writer hazard. Form participation uses a shared **`FieldAssociationController`** (SWC-2467) via `ElementInternals`. These two controllers are sequenced dependencies delivered as separate tickets under epic SWC-2323 (Q8).
- **Build the controllers iteratively, following the `LinearProgressMixin` precedent.** Progress bar and meter share a single [`LinearProgressMixin`](../../../../2nd-gen/packages/core/mixins/linear-progress-mixin.ts) that owns the typed property surface, `label`/`description` slots (via `SlotPresenceController`), container ids, and the accessible-name dev warning, while staying deliberately silent on each component's own concerns (`role`, animation). The field controllers should be scoped the same way: prove them on `swc-text-field` first, generalize to `number-field`/`color-field`/`text-area`, and refactor toward a richer shared shape only as real similarities surface. Do not over-build the shared abstraction ahead of a second consumer.
- **Headline breaking changes (must ship):** remove `quiet` (removed in S2, Q1); rename `label` → `accessible-label` and add `accessible-labelledby`/`accessible-describedby`, dropping the placeholder-as-`aria-label` fallback in favor of a dev-warning (Q10); drop the `TruncatedValueTooltipController` and its tooltip dependency entirely (Q9).
- **A11y is non-negotiable and well-specified.** Add `aria-errormessage` on invalid, `inputmode`, native form association, `delegatesFocus: true`, and `:focus-visible` keyboard-focus differentiation (a WCAG 2.4.7 gap in 1st-gen).
- **Largest risks / decisions:** now largely settled: the single-line/multiline split (Q6, confirmed), the field-family sharing model (Q7, direction set: shared controllers, iterate), and the sequenced delivery of the two shared controllers (Q8). The remaining architectural work is executing on the controllers, not choosing the approach.
- **Side-label is core, not additive.** `label-position` (`top`/`side`) is a core layout mode of the field, following the meter/progress-bar precedent in [`LinearProgressMixin`](../../../../2nd-gen/packages/core/mixins/linear-progress-mixin.ts). It is owned by the shared render template (`.swc-FormFieldTemplate` grid), not `field-label`.
- **Deferred, not dropped:** character count, in-field pending (infield progress circle, not yet built), required-without-asterisk styling, the new inline variant, `prefix` affix, and in-field ContextualHelp.

### Blocker status

No hard blockers remain for the plan. The prior blocker, the field-family sharing model, is directionally resolved (see the controllers bullet above and the [Decision log](#decision-log)). Remaining items are non-blocking design/token confirmations (token extraction Q20, label overflow Q24, contrast Q25) and the sequenced controller delivery (Decision log).

Settled decisions are recorded in the [Decision log](#decision-log).

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

- `input`: value changed (native, re-dispatched through the control).
- `change`: value change committed by the user; re-dispatched with `{ bubbles: true, composed: true }`.

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

Multiline (`<textarea>`, optionally with a `#sizer` div when `grows` and `rows === -1`) is structurally the same wrapper; this path becomes `swc-text-area`.

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
| `LabellingController` (SWC-2466) | **not yet built** | In-shadow label/description/error render. **Sequenced implementation dependency** (separate SWC-2323 ticket; verified absent from `2nd-gen/packages/core/controllers/`). Does not block this plan. |
| `FieldAssociationController` (SWC-2467) | **not yet built** | `ElementInternals` form participation. **Sequenced implementation dependency** (separate SWC-2323 ticket; verified absent). Does not block this plan. |

**Reverse dependencies (1st-gen).** `NumberField` and `ColorField` both `extends TextfieldBase`: `NumberField` overrides `value` (number), `handleInput`, and `renderField` (wraps stepper buttons) and drives the truncation tooltip's `syncTooltipText`; `ColorField` overrides `value`, `render`, and `checkValidity`. The extension points they rely on (`handleInput`, `handleChange`, `renderField`, value coercion) must have clean equivalents in the 2nd-gen core base or shared controllers, and the dropped `syncTooltipText` coupling must be re-solved without the tooltip when `number-field` migrates. These reverse dependencies drive the shared-base decision (Q7).

---

## Open gen1 issues

<!-- Provisional: no Jira tool was available while drafting. Populate from a JQL export `component = "Textfield" AND type in (Bug, Story) AND status != Done AND labels not in (a11y, gen2)`, excluding Epics/Initiatives. The a11y-labelled issues live in the accessibility analysis's own Jira table and are intentionally NOT duplicated here. -->

| Jira | Type | Status (snapshot) | Summary |
| ---- | ---- | ----------------- | ------- |
| _TBD_ | — | — | Pending Jira export for non-a11y gen1 `sp-textfield` issues (Q18). |

> Candidates to verify (labels unknown without Jira access; include only if **not** `a11y`/`gen2`-labelled and not `Done`): [SWC-1078](https://jira.corp.adobe.com/browse/SWC-1078) (truncated placeholder: relevant since the truncation tooltip is dropped), [SWC-847](https://jira.corp.adobe.com/browse/SWC-847) (invalid border colors), [SWC-713](https://jira.corp.adobe.com/browse/SWC-713) (validation icons not responsive to resize). These surfaced in the accessibility analysis's Jira table; confirm labels before promoting them into the table above.

## Migration sequencing and prerequisites

### Dependency-aware recommendation

Migrate `swc-text-field` **first among the field family**, developing it together with the two shared field controllers as their proving ground (rather than waiting for the controllers to be finished in isolation):

1. **`LabellingController`** (SWC-2466): renders label, required indicator, description, and error message in-shadow via a shared render directive (the pattern `renderPendingSpinner` already establishes) plus a shared stylesheet. Exposes `accessible-label`, `accessible-labelledby`, and `accessible-describedby`. Scope it minimally at first, mirroring how [`LinearProgressMixin`](../../../../2nd-gen/packages/core/mixins/linear-progress-mixin.ts) owns the `label`/`description` slots plus the accessible-name warning while staying silent on component specifics.
2. **`FieldAssociationController`** (SWC-2467): `formAssociated`, `attachInternals()`, `setFormValue()`, `formResetCallback()`, `formDisabledCallback()`.

`swc-text-field` is the simplest consumer of both controllers, so it is the right proving ground before `number-field`, `color-field`, and `text-area` adopt them.

### Related components and ordering notes

- **`swc-text-area`**: the multiline sibling extracted from 1st-gen `sp-textfield[multiline]`. Should follow `swc-text-field` and reuse the same controllers. Has its own [accessibility analysis](../text-area/accessibility-migration-analysis.md).
- **`number-field`, `color-field`**: both `extends TextfieldBase` in 1st-gen. In 2nd-gen they should consume the same controllers; whether they also share a base class is Q7.
- **`help-text`, `field-label`**: only *analyzed*, not migrated. Deliberately **not** prerequisites: 2nd-gen renders label/description/error in-shadow via `LabellingController` instead of composing separate elements.
- **`tooltip`, `progress-circle`**: migrated. `tooltip` is no longer needed here (truncation tooltip dropped). `progress-circle` is not the pending surface; **`infield-progress-circle`** is, and it is not yet built (defers in-field pending, Q15).
- **Shared `_lit-styles/` fragment**: the label/required/description/error stylesheet is a genuine shared structural pattern across every field that adopts `LabellingController` (`2nd-gen/packages/swc/stylesheets/_lit-styles/` already hosts `pending-spinner.css` as precedent). Recommend it live as a shared fragment created and owned alongside the controllers and consumed by `text-field`, not authored inside `text-field`. Name the classes **generically for the whole form family, not per-component** (e.g. `.swc-FormFieldLabel`, `.swc-FormFieldDescription`, `.swc-FormFieldErrorIcon`) and name the stylesheet `form-fields`. The render-root wrapper should be a shared `.swc-FormFieldTemplate` that sets up a CSS **grid template** reused across all form components, with a `label-position="side"` grid variant supporting the core side-label mode (C1):

  ```css
  .swc-FormFieldTemplate {
    display: grid;
    grid-template-areas:
      'label'
      'input'
      'messages';
  }

  :host([label-position='side']) .swc-FormFieldTemplate {
    grid-template-areas:
      'label input'
      '. messages';
  }
  ```

  The grid must support both `label-position` modes (`top`/`side`) from the start, since side-label is core (C1). These styles should **live in the shared `form-fields` stylesheet from the start** (text-field is the first consumer, not the owner), not authored inside `text-field`. For the render structure, follow the [shared render templates](../../../02_style-guide/02_typescript/09_rendering-patterns.md) style guide (the `card-template.ts` pattern): a standalone function taking an options object (static values, optional render callbacks, event-handler pass-throughs) and returning a `TemplateResult`. Where that shared template file lives is the open decision in Q22. Do not over-build the grid for genuinely deferred features (e.g. character counter) before they are scheduled. Fragment location/ownership is Q22.
- **Global element stylesheet**: no `stylesheets/global/global-text-field.css` is anticipated (text-field is not a bare global element like link/button). Mark **N/A** unless Design wants a global input baseline.

---

## Changes overview

> **Priority framing:**
>
> - **Must ship** items define the in-scope work required for this migration: breaking changes, a11y requirements, and **core features** (e.g. `label-position`).
> - **Additive** items are typically deferred or out of scope unless explicitly pulled in.
> - **Accessibility is non-negotiable**: all a11y requirements ship as part of this migration.
> - **Breaking changes** are assessed on merit; some must ship now to avoid a second, more disruptive migration later.

### Must ship: breaking or a11y-required

#### API and naming

| #   | What changes | 1st-gen behavior | 2nd-gen behavior | Consumer migration path |
| --- | ------------ | ---------------- | ---------------- | ----------------------- |
| B1 | Remove `quiet` | `quiet` attribute renders a no-background field | Attribute removed (confirmed by Design; sources: [rendering analysis](../textfield/rendering-and-styling-migration-analysis.md#css-spectrum-2-changes) + Figma matrix) | Remove `quiet`; dense/table use case maps to the inline variant (Q17). |
| B2 | Rename `label` → `accessible-label` | `label` sets `aria-label` and falls back to `placeholder` | `accessible-label` sets `aria-label`; placeholder fallback removed and dev-warned; visible label is slotted and rendered in-shadow (source: [a11y analysis](./accessibility-migration-analysis.md#aria-roles-states-and-properties)) | Rename `label` → `accessible-label`, or provide a slotted visible label. Unlabeled fields now dev-warn. |
| B3 | Split multiline into `swc-text-area` | `sp-textfield[multiline]` | `swc-text-field` is single-line only; use `swc-text-area` for multiline | Replace `<sp-textfield multiline>` with `<swc-text-area>`; `grows`/`rows` move there. |
| B4 | Drop truncated-value tooltip | `TruncatedValueTooltipController` + `tooltip-placement` | Removed; full value reachable natively; optional pointer-only `title` (source: [a11y analysis](./accessibility-migration-analysis.md#aria-roles-states-and-properties)) | Remove `tooltip-placement`; no replacement needed. |
| B5 | Narrow `autocomplete` type | Union widened with combobox-only `'list'`/`'none'` | Dedicated `autocomplete` type without combobox tokens (source: [a11y analysis](./accessibility-migration-analysis.md#aria-roles-states-and-properties)) | Combobox tokens move to the combobox component; ordinary tokens unaffected. |
| B15 | Rename help/error slots | `help-text` / `negative-help-text` slots (from `ManageHelpText`) | `description` / `error-text` slots, matching React Spectrum and the `LinearProgressMixin` precedent | Rename `slot="help-text"` → `slot="description"` and `slot="negative-help-text"` → `slot="error-text"`. |

#### Styling and visuals

| #   | What changes | 1st-gen behavior | 2nd-gen behavior | Consumer migration path |
| --- | ------------ | ---------------- | ---------------- | ----------------------- |
| B6 | `--mod-*` surface removed | ~60 `--mod-textfield-*`/`--mod-text-area-*` custom properties | Not exposed; a small reviewed `--swc-*` set only | Remove `--mod-*` overrides; file requests for any needed `--swc-*`. |
| B7 | Validation icons updated | `Alert` (invalid), simple `Checkmark` (valid) | `AlertTriangle` (invalid) ships; the valid **checkmark is deferred** (source: [rendering analysis](../textfield/rendering-and-styling-migration-analysis.md#css-spectrum-2-changes)) | Internal; no consumer action. Invalid icon stays `aria-hidden`. |

> **Valid-state icon (deferred):** the valid checkmark is **not shown in React Spectrum or the newer Figma**, and per Design and RS it is **deferred** (tracked as additive A8). The `valid` property is still kept for consumers; only the icon is deferred.

#### Accessibility and behavior

| #   | What changes | 1st-gen behavior | 2nd-gen behavior | Consumer migration path |
| --- | ------------ | ---------------- | ---------------- | ----------------------- |
| B8 | In-shadow labelling | `sp-field-label` reaches across shadow roots to set `aria-label`; two-writer hazard | `LabellingController` renders label/required/description/error in one shadow root; single writer by construction | Prefer slotted label or `accessible-label`; external association via `accessible-labelledby`. |
| B9 | Add `aria-errormessage` | none | Set on the input while `invalid` is `true`, alongside `aria-describedby` | None (additive AT improvement). |
| B10 | Add `inputmode` | none | Author-settable virtual-keyboard hint | None (additive). |
| B11 | Native form association | Named `<input>` only; no `ElementInternals` | `FieldAssociationController` (`ElementInternals`), incl. `fieldset[disabled]` cascade and form reset | None for basic forms; gains reset/disabled cascade. |
| B12 | Keyboard-focus differentiation | Same focus styling for pointer and keyboard | `:focus-visible` keyboard ring (fixes [WCAG 2.4.7](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html)) | None (visual/a11y fix). |
| B13 | Help/error `aria-live` | Container defaults to `aria-live="assertive"` | No default live region; same-root `aria-describedby` covers the common case (polite only if truly needed) | None. |
| B14 | `delegatesFocus` | Host-level focus indirection | Shadow root `delegatesFocus: true`; focus lands on the real `<input>` | None. |

> **Note on B12:** using `:focus-visible` is correct, but browser heuristics for text inputs mean the focus ring shows for **either** pointer clicks **or** keyboard access even with that selector. That is expected and fine; do not try to suppress the pointer-focus ring on the input.

#### Core layout

| #   | What ships | 2nd-gen behavior | Consumer migration path |
| --- | ---------- | ---------------- | ----------------------- |
| C1 | `label-position` (`top`/`side`) | Core layout mode: the visible label renders above (`top`, default) or beside (`side`) the input. Owned by the shared render template (`.swc-FormFieldTemplate` CSS grid), following the meter/progress-bar precedent in [`LinearProgressMixin`](../../../../2nd-gen/packages/core/mixins/linear-progress-mixin.ts), **not** `field-label`. Reclassified from additive to core. | None (new capability; default `top` matches prior single-position behavior). Ships with the labelling render template. |

### Additive: ships when ready, zero breakage for consumers already on 2nd-gen

> The former item A3 (side-label position) was reclassified as a core feature; see item C1 in the Core layout table above.

| #   | What is added | Notes |
| --- | ------------- | ----- |
| A1 | Character count | 1st-gen never implemented it, and React Spectrum does not support it yet, so deferral is confirmed. If added later it will need a dedicated a11y plan: `aria-describedby` alone is not sufficient given the complexities of announcing a live count. |
| A2 | In-field pending state | **Documented in Spectrum CSS** as a boolean `Loading` state (rendered via `spectrum-InfieldProgressCircle`; see the DOM in the [rendering analysis](../textfield/rendering-and-styling-migration-analysis.md#css-spectrum-2-changes)). Not yet shown in React Spectrum or the Figma state matrix Design shared, so reconcile the gap with Design. Depends on `infield-progress-circle` (not yet built). SWC terminology is "pending"; Spectrum CSS calls it "Loading"; align naming when scheduled. |
| A4 | Required-without-asterisk styling | S2 adds `isRequiredWithoutAsterisk`; needs Design confirmation (Q4). |
| A5 | Inline text-field variant | New in S2; **published in Figma** (the source of truth) as a separate "Text field (In-line)" component: corrects the earlier "not in Figma yet." Not yet built in SWC and **not yet supported in React**. Deferral confirmed; whether to schedule it now is Q17. |
| A6 | `prefix` affix | RS supports; not in Figma yet; anticipate as future `LabellingController` surface. |
| A7 | In-field ContextualHelp | RS supports; future `LabellingController` description source. Placement follows RS lead (next to the label), presuming RS validated with Design; see Q23. |
| A8 | Valid-state checkmark icon | Deferred per Design and RS response (not shown in React Spectrum or the newer Figma). The `valid` property stays in the API for consumers; only the icon is deferred. Revisit if Design reintroduces it. |

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
| `readonly` | `boolean` | `false` | `readonly` (reflect) | **Confirmed.** Focusable but non-editable; distinct from `disabled`. No distinct visual treatment (follows React Spectrum); Q3 resolved. |
| `required` | `boolean` | `false` | `required` (reflect) | **Confirmed.** Native `required`; no `aria-required`. |
| `invalid` | `boolean` | `false` | `invalid` (reflect) | **Confirmed.** Drives `aria-invalid`/`aria-errormessage`. |
| `valid` | `boolean` | `false` | `valid` (reflect) | **Inferred.** Keep the property: its value is that **consumers can react to a valid state**, independent of the visual checkmark, which is **deferred** (not shown in React or the newer Figma; per Design and RS, tracked as additive A8). |
| `labelPosition` | `'top' \| 'side'` | `'top'` | `label-position` (reflect) | **Confirmed (core).** Places the visible label above (`top`) or beside (`side`) the input. Owned by the shared render template (`.swc-FormFieldTemplate` grid), mirroring the meter/progress-bar `label-position` in `LinearProgressMixin` (C1). |
| `size` | `'s' \| 'm' \| 'l' \| 'xl'` | `'m'` | `size` (reflect) | **Inferred.** Give an explicit default `m` (drop `noDefaultSize`). |
| `disabled` | `boolean` | `false` | `disabled` (reflect) | **Confirmed.** Removed from tab order; `formDisabledCallback` cascade. |
| `allowedKeys` | `string` | `''` | `allowed-keys` | **Open question (Q11).** Niche 1st-gen quirk; carry forward or drop. |
| `focused` | — | — | — | **Inferred: remove.** Replace the reflected `focused` attribute with CSS `:focus-visible`/`:focus-within` (Q12). |
| `quiet`, `multiline`, `grows`, `rows`, `truncatedValueTooltipPlacement` | — | — | — | **Removed** (see B1, B3, B4). |

#### Visual matrix (2nd-gen)

**Visual axes confirmed by the received S2 state matrix (2026-08-18); exact token values still to be extracted from Figma (the source of truth), Q20.** Axes: sizes `s`/`m`/`l`/`xl`; label position **top and side** (both present at every size; a core layout mode, C1, Q2); states default / hover / focus+hover / focus+not-hover / disabled; content empty / value / placeholder; invalid (red border + trailing AlertTriangle + error message). No `quiet` column (removed, Q1). **Not shown in the matrix:** an explicit valid/checkmark state (deferred, A8) and the pending/`Loading` state (A2: documented in Spectrum CSS but absent from the shared Figma matrix and React Spectrum). Read-only intentionally has no distinct visual treatment (follows RS; Q3 resolved). Character count and in-field pending remain additive (A1, A2).

#### Slots (2nd-gen)

| Slot | Content | Notes |
| ---- | ------- | ----- |
| `label` | Visible label content | **Inferred.** Rendered in-shadow as a real `<label for>` by `LabellingController`. Named `label` slot, matching the `LinearProgressMixin` precedent; confirm with the controller's API (Q8). |
| `description` | Guidance / non-error help text | **Confirmed (renamed).** Was 1st-gen `help-text`; renamed to `description` to match React Spectrum and the `LinearProgressMixin` precedent, and to disambiguate from contextual-help content. Associated via same-root `aria-describedby` only when present. |
| `error-text` | Error message shown when `invalid` | **Confirmed (renamed).** Was 1st-gen `negative-help-text`; renamed to `error-text` for simplicity and to match design terminology. Also targeted by `aria-errormessage` when invalid. |

#### CSS custom properties (2nd-gen)

No `--mod-*` properties will be exposed. New `--swc-*` component-level properties may be introduced where needed; these are additive and not breaking. See [Component Custom Property Exposure](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#component-custom-property-exposure).

Each exposed `--swc-*` property must be documented with a `@cssprop` JSDoc tag on the primary SWC component class.

Initial expectation for Text field is a small reviewed set (likely field width/min-width).

### Behavioral semantics

- **Validation:** keep native constraint validation via a real `<input>`; `checkValidity()` remains public. Reflect `required`/`pattern`/`minlength`/`maxlength` to the native input. Suppress the native validation bubble in favor of the inline error message; mechanism and the full validation-behavior model (RS `native` vs `aria`, custom `validate`, server errors) deferred to the forms-strategy work (Q19).
- **Form reset:** `FieldAssociationController.formResetCallback()` restores a defined **default value** (the RS `defaultValue` concept, typically the initial attribute value). The reset target must be specified, not left implicit.
- **Events:** keep `input` and `change` (composed, bubbling), matching native semantics.
- **Selection API:** keep `setSelectionRange()` and `select()`.
- **Focus:** `delegatesFocus: true`; keyboard focus via `:focus-visible`.
- **Truncated value:** no reveal mechanism; native caret/selection/scroll suffices; optional pointer-only `title` mirroring `value`.

### Accessibility semantics notes (2nd-gen)

Authoritative source: [accessibility migration analysis](./accessibility-migration-analysis.md). Key points: host sets no `role` (native `<input>` supplies `textbox`); exactly one accessible-name writer via `LabellingController` in precedence order `accessible-labelledby` > `accessible-label` > slotted label; `aria-invalid` only when invalid (never explicit `"false"`); `aria-errormessage` only while invalid; validation icon stays `aria-hidden`; `readonly` and `disabled` stay distinct in tab order; no default `aria-live="assertive"`.

---

## Architecture: core vs SWC split

> The 1st-gen component is a **reference only**; 2nd-gen is built independently. Neither generation imports from the other.

Follow the [Badge migration reference](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#reference-badge-migration) for the core/SWC split.

| Layer    | Path                                            | Contains                                                                                                                                                                                                 |
| -------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Core** | `2nd-gen/packages/core/components/text-field/`  | `TextField.base.ts`, `TextField.types.ts`, enum/required validation, value normalization, and wiring of the shared `LabellingController` and `FieldAssociationController`. No rendering.                 |
| **SWC**  | `2nd-gen/packages/swc/components/text-field/`   | `TextField.ts`, `text-field.css`, `swc-text-field` registration, stories, tests, and S2 rendering/styling.                                                                                              |

Planned rendering shape:

- Core owns API normalization, enum/required dev-warnings (via `validateEnum`/`warnIf`), value/validity state, and controller wiring.
- SWC renders: a `.swc-TextField` wrapper containing the `LabellingController` output (label, required indicator), the real `<input class="input">`, the validation icon (`aria-hidden`), and the description/error container.

**Field-family sharing (Q7, direction confirmed).** The 1st-gen `TextfieldBase` inheritance (used by `number-field`/`color-field`) is expressed in 2nd-gen as **shared controllers first**: `text-area`, `number-field`, and `color-field` compose the same `LabellingController`/`FieldAssociationController` rather than deep-inheriting a single class. This mirrors how meter and progress-bar share the [`LinearProgressMixin`](../../../../2nd-gen/packages/core/mixins/linear-progress-mixin.ts) while keeping component-specific concerns (there: `role`/animation; here: `type`/validation/stepper) in each component's own base. Prove the controllers on `swc-text-field` first, then generalize; introduce a small shared base only if a second consumer demonstrates the need. Iterate rather than over-engineering the shared abstraction ahead of that second consumer.

---

## Migration checklist

### Preparation (this ticket)

- [x] 1st-gen API surface documented
- [x] Dependencies identified
- [x] Breaking changes documented
- [x] 2nd-gen API decisions drafted
- [x] Plan reviewed by at least one other engineer (PR review feedback incorporated)

### Setup

- [ ] Create `2nd-gen/packages/core/components/text-field/`
- [ ] Create `2nd-gen/packages/swc/components/text-field/`
- [ ] Wire exports in both `package.json` files
- [ ] Check out `spectrum-css` at `spectrum-two` branch as sibling directory
- [ ] Scaffold `LabellingController` (SWC-2466) and `FieldAssociationController` (SWC-2467) alongside `text-field`, or confirm they are available to depend on

### API

#### Naming and public surface

- [ ] `TextField.types.ts`: define `TextFieldType`, the `size` union, and the `label-position` (`top`/`side`) union; export public types
- [ ] `TextField.base.ts`: implement `accessible-label`/`accessible-labelledby`/`accessible-describedby`, `value` (string), `type`, `placeholder`, `pattern`, `inputmode`, `autocomplete`, `maxlength`/`minlength`, `readonly`, `required`, `invalid`/`valid`, `label-position` (core; default `top`), `size`, `disabled`
- [ ] Remove `quiet`, `multiline`, `grows`, `rows`, `focused`, `tooltip-placement`
- [ ] Resolve `allowedKeys` (Q11) before finalizing the surface

#### Alignment checks

- [ ] Verify property names and defaults against Figma `S2 / Web (Desktop scale)` and [React Spectrum TextField](https://react-spectrum.adobe.com/TextField)
- [ ] Confirm the `type`/`autocomplete` token sets with the a11y reviewer

### Styling

> Follow the [CSS style guide](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/) as the source of truth. Key references: [migration steps](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/04_spectrum-swc-migration.md), [custom properties](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md), [anti-patterns](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/05_anti-patterns.md).

- [ ] Add `.swc-TextField` to the internal wrapper in `render()`; keep styling off `:host`
- [ ] Copy S2 source from `spectrum-css` `spectrum-two` branch `index.css` (not `/dist`) into `text-field.css` as baseline
- [ ] Consume the shared label/description/error stylesheet fragment (the `form-fields` stylesheet: `.swc-FormFieldTemplate` grid, `.swc-FormFieldLabel`/`.swc-FormFieldDescription`/`.swc-FormFieldErrorIcon`) from `_lit-styles/`; author these styles in the shared `form-fields` stylesheet from the start (text-field is the first consumer), not inside `text-field` (Q22)
- [ ] Implement both `label-position` modes (`top` default, `side`) via the `.swc-FormFieldTemplate` grid variant (C1)

#### Visual model and regressions

- [ ] Implement `:focus-visible` keyboard-focus differentiation (B12)
- [ ] Verify i18n size modifiers (`:lang(ja)`, `:lang(ko)`, `:lang(zh)`) if present in S2 source
- [ ] Add `@cssprop` JSDoc tag for every exposed `--swc-*` property
- [ ] Pass stylelint (property order, `no-descending-specificity`, token validation)

### Accessibility

<!-- Sourced from accessibility-migration-analysis.md summary checklist. -->

#### Naming and semantics

- [ ] `LabellingController` renders label/required/description/error in-shadow via the shared directive (no external `field-label`/`help-text`, no cross-root reach-in)
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
- [ ] Unit: same-root unique ids; `aria-describedby` only when description/error present; form participation (`FormData`, reset, `fieldset[disabled]`)

#### Behavior

- [ ] `input`/`change` events; `checkValidity()`; `setSelectionRange()`/`select()`
- [ ] Dev-warning story for a field with no accessible name at all

#### Visual regression

- [ ] Add VRT coverage for size × state combinations (default/hover/focus/keyboard-focus/disabled/readonly/invalid/valid) across both `label-position` modes (`top`/`side`)
- [ ] Add focus-visible regression coverage for the keyboard ring (B12)
- [ ] Add forced-colors (high-contrast) coverage for invalid/valid and focus states

### Documentation

#### General

- [ ] JSDoc on all public props, slots, and `--swc-*` properties
- [ ] Storybook stories: anatomy, sizes, states, validation, label positions, accessibility

#### Breaking changes

- [ ] Consumer migration guide entries for B1–B5 and B15 (quiet removal, `label`→`accessible-label`, multiline→`swc-text-area`, tooltip removal, `autocomplete` narrowing, `help-text`/`negative-help-text` slots → `description`/`error-text`)

### Review

- [ ] `yarn lint:2nd-gen` passes (ESLint, Stylelint, Prettier)
- [ ] Status table in workstream doc updated
- [ ] PR created with description referencing Epic SWC-2323
- [ ] Peer engineer sign-off

---

## Blockers and open questions

> **Update: design context received (2026-08-18).** The full S2 state × variant matrix is available (all four sizes × top/side × five states × content/error variants), captured in the Visual matrix (2nd-gen) subsection under Public API. Also received: a separate "Text field (In-line)" component (Q17/A5) and label-overflow guidance (Q24). Not covered: an explicit valid state (deferred, A8). Read-only intentionally has no distinct visual treatment (Q3 resolved). Figma is the source of truth; exact token values still pending extraction (Q20).

### Design

| #   | Item | Blocking? | Status | Owner |
| --- | ---- | --------- | ------ | ----- |
| Q4 | Required-without-asterisk styling (`isRequiredWithoutAsterisk`): in scope? | No | Open (additive, A4) | Design |
| Q24 | Label text overflow / wrapping behavior (top and side): long labels wrap to multiple lines in Figma (per the "Prototyping edge cases" guidance), and side-label must reflow as the label column grows. Confirm wrap-vs-truncate and how side-label reflows, a `LabellingController` + layout concern (relates to Q2). Note: the Figma guidance describes Figma-prototyping workarounds, not necessarily component behavior. React Spectrum currently leaves the input essentially unhandled (it can shrink almost out of existence); proposal is to set a **default minimum inline size for the input (e.g. `10ch`)** and expose a `--swc-*` custom property to override it. | No | Open: proposed default `min-inline-size` + custom property override | Design + Architecture |
| Q25 | Non-text contrast (WCAG 1.4.11): re-evaluate border and focus-ring contrast for 3:1 against Spectrum 2 tokens; SWC-214 was Won't Fix under the old theme; don't assume that holds. | No | Open | Design + Styling |

### Architecture and behavior

| #   | Item | Blocking? | Status | Owner |
| --- | ---- | --------- | ------ | ----- |
| Q11 | Carry forward or drop `allowedKeys`. | No | Open; lean drop (niche, undocumented) | API |
| Q12 | Remove reflected `focused` attribute in favor of `:focus-visible`/`:focus-within`. | No | Inferred | Implementation |
| Q13 | Simplify `type` handling with `validateEnum`; drop the `_type` reflection quirk. | No | Inferred | Implementation |
| Q19 | Validation behavior model: RS `native` vs `aria`, native-bubble suppression, and whether to expose custom `validate` / server-error APIs. Deferred to forms-strategy (SWC-1888; ties to its `setValidity()` pass-through). | No | Deferred to forms-strategy work (SWC-1888) | Architecture |

### Scope and prerequisites

| #   | Item | Blocking? | Status | Owner |
| --- | ---- | --------- | ------ | ----- |
| Q22 | Two shared artifacts for the field family, created with the controllers and consumed by `text-field` (the first consumer): **(1)** a shared **CSS fragment** — the `form-fields` stylesheet (`.swc-FormFieldTemplate` grid + `.swc-FormField*` classes) in `swc/stylesheets/_lit-styles/` (settled convention; naming and live-shared decided, see [Decision log](#decision-log)); and **(2)** a shared **render template** — a standalone `TemplateResult`-returning function per the [shared render templates](../../../02_style-guide/02_typescript/09_rendering-patterns.md) style guide (the `card-template.ts` pattern: an options object of static values, optional render callbacks, and event-handler pass-throughs). **Open decision to record: where the render template lives.** That style guide's "Where the template file lives" calls out field-family templates (`text-field`/`text-area`/`number-field`/`picker`/`combobox`) as having no settled convention: either host it in `text-field` (first to migrate, mirroring `card/`) or introduce a dedicated shared location (e.g. `swc/components/_lit-templates/`), and it says to record the choice in the migration plan. | No | CSS fragment + naming settled (Decision log); render-template **location** is the open decision to record here | CSS reviewer + Architecture |
| Q23 | In-field ContextualHelp (A7) placement: the plan describes it as **in-field**, but React Spectrum's `contextualHelp` places the element **next to the label**, not inside the input frame. **Follow the RS lead** (next to the label), presuming RS validated the placement with Design. Regardless of placement, the `LabellingController` should model description sources (help text, error message, contextual help, `prefix`) as an **extensible set** so A6/A7 can be added without an API redesign. No 2nd-gen `contextual-help` component exists yet. | No | Direction set: follow RS placement (next to label); controller API should stay extensible | Accessibility + Architecture |
| Q15 | In-field pending/`Loading` state: documented in Spectrum CSS (boolean `Loading` state via `spectrum-InfieldProgressCircle`) but absent from React Spectrum and the shared Figma matrix. Depends on `infield-progress-circle` (not built). Reconcile the RS/Figma gap with Design and align terminology (SWC "pending" vs Spectrum CSS "Loading"). | No | Deferred (additive, A2): sourced in Spectrum CSS; reconcile RS/Figma with Design | Scope + Design |
| Q17 | Inline text-field variant is **published in Figma** (separate "Text field (In-line)" component; Figma is the source of truth); the earlier "not in Figma/Spectrum CSS yet" rationale is stale and not the deciding factor. It is a new **additive** S2 variant not yet built in SWC; default is to defer until scheduled unless prioritized into this migration. | No | Deferred (additive, A5): defer unless prioritized | Scope |
| Q18 | Pull non-a11y gen1 `sp-textfield` Jira issues into the Open gen1 issues table. | No | Open: needs Jira export | Ticket owner |
| Q20 | Finalize the visual matrix and styling baseline from Figma `S2 / Web (Desktop scale)`: **the source of truth**. The state × variant matrix is now available (see the 2026-08-18 note) and is **complete on the visual axis** (all four sizes × top/side × five states × content/error variants) except an explicit valid state (deferred, A8; read-only has no distinct visual treatment). **Tokens live in Figma** but need deeper inspection to extract exact values (spacing, radius, focus-ring width); a `spectrum-css@spectrum-two` checkout is an optional cross-reference, not a prerequisite. | No (blocks finalizing token values) | Open: visual matrix complete; token values pending deeper Figma inspection | Ticket owner |
| Q21 | Consolidate doc folder slug to `text-field` (move `rendering-and-styling-migration-analysis.md` out of `textfield/`). | No | Open: recommend `text-field` | Ticket owner |
| Q26 | "Labeled Value" component vs read-only: React Spectrum's Labeled Value displays non-editable information alongside editable fields, overlapping conceptually with a read-only text field. Check whether read-only and Labeled Value are distinct in S2, and ensure Labeled Value is on the 2nd-gen component-creation list. Deferrable. | No | Open: surfaced in review | Design + Scope |

---

## Decision log

Settled decisions from planning and PR review, kept here as a historical record so the [Blockers and open questions](#blockers-and-open-questions) tables stay focused on what still needs attention. Entries retain their original `Q`/`B`/`C` identifiers, so inline references elsewhere in the plan still resolve here.

| Ref | Decision | Rationale / context |
| --- | -------- | ------------------- |
| Q1 / B1 | Remove `quiet` | Removed in S2; confirmed intentional by Design. Corroborated by spectrum-css, the rendering analysis, and the Figma matrix; the "keep it" impression was only 1st-gen legacy docs. The dense/table use case maps to the inline variant (Q17). |
| Q6 / B3 | Single-line `swc-text-field`; multiline moves to `swc-text-area` | Confirmed by the a11y analysis (plan source of truth) and PR review. `multiline`/`grows`/`rows` leave this component's surface. |
| Q9 / B4 | Drop the truncated-value tooltip (`TruncatedValueTooltipController`, `tooltip-placement`) | Confirmed dropped; the native caret, selection, and scroll make the full value reachable. Consumers can still implement a reveal themselves. |
| Q10 / B2 | `label` → `accessible-label`; drop the placeholder-as-accessible-name fallback (dev-warn instead) | Confirmed by the a11y analysis. Visible labels are slotted and rendered in-shadow. |
| Q14 / B5, B10 | `autocomplete` dedicated token type (drop combobox tokens); add `inputmode` | Confirmed by the a11y analysis. Combobox tokens move to the combobox component. |
| B15 | Slots `help-text`/`negative-help-text` → `description`/`error-text` | Matches React Spectrum and the `LinearProgressMixin` precedent; `description` also disambiguates from contextual-help content. |
| Q7 | Field family shares controllers, applied iteratively | Follow the `LabellingController` + `FieldAssociationController` pattern (tickets under epic SWC-2323), the same shared-controller approach meter and progress-bar took with `LinearProgressMixin`. Prove the controllers on `text-field` first; introduce a small shared base only if a second consumer proves the need. |
| Q2 / C1 | `label-position` (`top`/`side`) is a core feature, not additive | Precedent is meter/progress-bar `label-position`. Owned by the shared render template (`.swc-FormFieldTemplate` grid), not `field-label`, since it is a visual style driven by the passed attribute. |
| Q8 | Shared controllers (SWC-2466/2467) are a sequenced dependency, not a plan blocker | They do not exist yet (verified) but are separate tickets under epic SWC-2323; `text-field` implementation (Phase 3+) consumes them once available. |
| Q3 | Read-only has no distinct visual treatment; stays focusable and non-editable | Follows React Spectrum, which applies no visual or cursor change; no Design input needed. See Q26 for a possible "Labeled Value" component overlap. |
| Q5 / B7 / A8 | Validation icons: `AlertTriangle` (invalid) ships; valid checkmark deferred | Per Design and RS response, the valid checkmark is deferred (not shown in React or the newer Figma); tracked as additive A8. The `valid` property stays for consumers. Invalid-icon sizing is extracted from Figma with the rest of the tokens (Q20). |
| Q16 / A1 | Character count deferred | React Spectrum does not support it yet; deferral confirmed. If added later it needs a dedicated a11y plan (`aria-describedby` alone is insufficient for announcing a live count). |
| Q22 (naming) | Shared field styles live in a shared `form-fields` stylesheet from the start; classes are `.swc-FormField*` | Text field is the first consumer, but the styles live shared, not authored in text-field. `form-fields`/`FormField` (not `forms`/`Form`) reserves `form`/`Form` for a possible future form-wrapper component or utility. Render-template location/ownership remains open (Q22). |

---

## References

- [Washing machine workflow](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md)
- [2nd-gen migration status table](../../02_workstreams/02_2nd-gen-component-migration/01_status.md)
- [Accessibility migration analysis](./accessibility-migration-analysis.md)
- [Rendering and styling migration analysis](../textfield/rendering-and-styling-migration-analysis.md): currently under the `textfield/` slug; see Q21
- [Forms strategy RFC (SWC-1888)](../../05_strategies/forms-strategy-rfc.md)
- [Text area accessibility migration analysis](../text-area/accessibility-migration-analysis.md)
- [CSS style guide: Component Custom Property Exposure](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#component-custom-property-exposure)
- [1st-gen source](../../../../1st-gen/packages/textfield/src/Textfield.ts)
- [1st-gen TruncatedValueTooltipController](../../../../1st-gen/packages/textfield/src/TruncatedValueTooltipController.ts)
- [1st-gen tests](../../../../1st-gen/packages/textfield/test/)
- [1st-gen README](../../../../1st-gen/packages/textfield/README.md)
- [React Spectrum TextField](https://react-spectrum.adobe.com/TextField)
- [Spectrum CSS: `spectrum-two` branch](https://github.com/adobe/spectrum-css/tree/spectrum-two): replace with the reviewed `spectrum-css/components/textfield/index.css` path once a sibling checkout exists (Q20)
- [Badge migration reference](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#reference-badge-migration)
- Epic: [SWC-2323](https://jira.corp.adobe.com/browse/SWC-2323), Text field migration epic
- [SWC-2466](https://jira.corp.adobe.com/browse/SWC-2466), `LabellingController`
- [SWC-2467](https://jira.corp.adobe.com/browse/SWC-2467), `FieldAssociationController`
