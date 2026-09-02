<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Radio / Radio migration plan

<!-- Document title (editable) -->

# Radio migration plan

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

> **Epic SWC-2348** · Planning output. Must be reviewed before implementation begins.
>
> This plan covers **`swc-radio`, the individual radio item, only.** `swc-radio-group` (sibling discovery, mutual exclusion, roving tabindex, group-level `invalid`/`readonly`, and form participation for the set) has its own separate migration plan. `swc-radio` cannot ship independently: it has no supported standalone usage (B3) and is documented only as part of `swc-radio-group`'s Storybook page (see [Related components and ordering notes](#related-components-and-ordering-notes) for the resulting delivery model). No open blockers remain in this plan; all resolved decisions are recorded in the [Decision log](#decision-log). Everything else draws on the [accessibility migration analysis](./accessibility-migration-analysis.md), which is authoritative for the 2nd-gen semantic design and was authored against the approved [forms strategy RFC](../../05_strategies/forms-strategy-rfc.md) (SWC-1888).

---

## TL;DR

- **Biggest architectural change: a real native `<input type="radio">` joins the shadow DOM.** 1st-gen `sp-radio` has no native input at all — it sets `role="radio"` on the host and hand-writes `aria-checked`/`aria-disabled`/`aria-invalid` in `updated()`. 2nd-gen renders a real `<input type="radio">` inside its own shadow root (the same shadow-DOM-first pattern `swc-text-field` uses), so role, `checked`, and keyboard activation come from the browser for free. This removes most of `Radio.ts`'s hand-written ARIA bookkeeping and its `FocusVisiblePolyfillMixin` synthetic-keydown trick (native `:focus-visible` replaces it).
- **`invalid` and `readonly` move entirely to `swc-radio-group`.** Neither is a per-item concept: 1st-gen's own `readonly` was never actually enforced (`click()`/`activate()` never checked it), and `invalid` describes the selection as a whole, not one option. Both are removed from `swc-radio` and implemented once, correctly, on the group.
- **No standalone Tab stop.** 1st-gen `sp-radio` defaults its own `tabIndex` to `0` and answers `Space` itself so it can be used outside a group. 2nd-gen drops that: tabindex management is delegated entirely to the enclosing `swc-radio-group`, matching the APG radio pattern. `swc-radio` is not supported as a standalone control.
- **Per-item `description` ships as a new capability: a named `description` slot.** [React Spectrum's `Radio`](https://react-spectrum.adobe.com/RadioGroup) supports an optional description per item (the reference screenshot supplied for this plan shows "Standard Shipping (Free)" / "Delivers in 5–7 business days"). Design has confirmed this is in scope. Wired via same-root `aria-describedby`, the same pattern `swc-text-field` uses.
- **No dependency on `LabellingController`; label/description wiring is implemented directly** via a real, same-root `<label for="…">` and the already-built `SlotPresenceController`. See the [Decision log](#decision-log) for why.
- **Form-value participation lives entirely on `swc-radio-group`, not per-item (Q12, officially signed off by the a11y SME).** `swc-radio` does not depend on `FieldAssociationController`. See [Migration sequencing and prerequisites](#migration-sequencing-and-prerequisites) and [Decision log](#decision-log) for the reasoning.
- **Group-level coordination (`RadioGroupController`, SWC-2470) is explicitly out of scope for this plan.** It affects how `swc-radio-group` discovers and drives its items, not this item's own API; tracked as a subticket of `swc-radio-group`'s own migration-plan ticket, SWC-2546.
- **Visual API is close to a straight carryover.** Sizes (`s`/`m`/`l`/`xl`), `emphasized`, checked/unchecked, hover, and disabled all match between 1st-gen, the rendering analysis, and the Figma size/state/emphasis matrix supplied for this plan. The 30 `--mod-radio-*` custom properties are not carried forward.
- **Delivery is combined with `swc-radio-group` on a shared feature branch.** `swc-radio` cannot ship or be documented independently, so implementation (Phase 2 onward) is tracked jointly with `swc-radio-group` rather than as two parallel component migrations. See [Related components and ordering notes](#related-components-and-ordering-notes).

### Most blocking open questions

None currently — all resolved; see [Decision log](#decision-log).

---

## 1st-gen API surface

**Source:** [`1st-gen/packages/radio/src/Radio.ts`](../../../../1st-gen/packages/radio/src/Radio.ts)
**Version:** `@spectrum-web-components/radio@1.12.2`
**Custom element tag:** `sp-radio`

`Radio extends SizedMixin(FocusVisiblePolyfillMixin(SpectrumElement), { noDefaultSize: true })`. This surface is for the item only; `RadioGroup` (`sp-radio-group`) is a separate class in the same package — see the [radio group accessibility analysis](../radio-group/accessibility-migration-analysis.md) for its surface.

### Properties / attributes

| Property | Type | Default | Attribute | Notes |
| -------- | ---- | ------- | --------- | ----- |
| `value` | `string` | `''` | `value` (reflect) | Identifies this radio within its group's shared `name`. |
| `checked` | `boolean` | `false` | `checked` (reflect) | Whether this is the currently selected item. |
| `disabled` | `boolean` | `false` | `disabled` (reflect) | Hand-maintained `aria-disabled` in `updated()`; no native input to disable. |
| `emphasized` | `boolean` | `false` | `emphasized` (reflect) | Accent (blue) color on the checked indicator instead of neutral. |
| `invalid` | `boolean` | `false` | `invalid` (reflect) | Hand-maintained `aria-invalid` in `updated()`. **(→ removed, moves to `swc-radio-group`)** |
| `readonly` | `boolean` | `false` | `readonly` (reflect) | Declared but never enforced: `click()`/`activate()` only check `disabled`. **(→ removed, moves to `swc-radio-group`)** |
| `autofocus` (Focusable override) | `boolean` | `false` | `autofocus` | Triggers `manageAutoFocus()`'s synthetic-keydown trick to fool the focus-visible polyfill. |
| `size` (SizedMixin) | `'s' \| 'm' \| 'l' \| 'xl'` | none (`noDefaultSize`) | `size` (reflect) | No explicit default; consumers/CSS effectively default to `m`. |

### Methods

| Method | Signature | Notes |
| ------ | --------- | ----- |
| `click` | `() => void` | Overridden: no-ops when `disabled`, otherwise calls `activate()`. |

No other public methods; `activate()`, `handleKeyup()`, and `manageAutoFocus()` are `protected` implementation detail, not public API.

### Events

- `change`: dispatched (`bubbles: true, composed: true`) from `activate()` when a previously unchecked radio becomes checked. Not re-dispatched from a native input, since none exists in 1st-gen.

### Slots

| Slot | Content | Notes |
| ---- | ------- | ----- |
| default | Text label of the radio button | Rendered inside `<span id="label" role="presentation">`. |

### CSS custom properties

1st-gen exposes 30 `--mod-radio-*` modifier custom properties (animation duration, border widths/colors across every focus/hover/checked/emphasized permutation, control size, focus indicator, font/line-height including CJK, disabled colors). See the [rendering and styling migration analysis](./rendering-and-styling-migration-analysis.md#component-specifications) for the full list.

This full modifier surface will not be carried forward to 2nd-gen.

### Shadow DOM output (rendered HTML)

1st-gen (no native input; ARIA is hand-written on the host):

```html
<sp-radio role="radio" aria-checked="false" tabindex="0">
  #shadow-root
    <div id="input"></div>
    <span id="button"></span>
    <span id="label" role="presentation">
      <slot></slot>
    </span>
</sp-radio>
```

2nd-gen (planned; real native input supplies role/checked, `delegatesFocus: true`, label association via a real `<label for>` matching Spectrum CSS's own reference anatomy, description rendered in-shadow and `aria-describedby`-wired only when present — see [Public API](#public-api), [Decision log](#decision-log), and the [accessibility analysis](./accessibility-migration-analysis.md#aria-roles-states-and-properties)):

```html
<swc-radio>
  #shadow-root (delegatesFocus: true)
    <input type="radio" id="…input…" aria-describedby="…description…" />
    <span class="swc-Radio-button"></span>
    <label for="…input…"><slot name="label"></slot></label>
    <span id="…description…"><slot name="description"></slot></span>
</swc-radio>
```

`aria-describedby` is only set on the input when the `description` slot actually has content (detected via `SlotPresenceController`); it is omitted otherwise, matching `swc-text-field`'s "only when present" rule for its own description.

---

## Dependencies

| Package | Version | Role |
| ------- | ------- | ---- |
| `@spectrum-web-components/base` | workspace | `SizedMixin`, `SpectrumElement`, decorators. |
| `@spectrum-web-components/shared` | workspace | `FocusVisiblePolyfillMixin`. **Dropped in 2nd-gen** — native `:focus-visible` on the real input replaces the polyfill and its synthetic-keydown autofocus trick. |
| `SlotPresenceController` | already built | Gates the optional `description` slot/`aria-describedby` on whether the slot actually has content. See [`2nd-gen/packages/core/controllers/slot-presence-controller/`](../../../../2nd-gen/packages/core/controllers/slot-presence-controller/slot-presence-controller.mdx). Not a sequenced dependency — available now. |

`swc-radio` does **not** depend on `LabellingController` or `FieldAssociationController`; see the [Decision log](#decision-log). Form-value participation (`FieldAssociationController`, SWC-2467) is `swc-radio-group`'s dependency, not this item's.

`@spectrum-web-components/field-group`, `@spectrum-web-components/help-text`, and `@spectrum-web-components/reactive-controllers` are listed in the package's `package.json` but are consumed by `RadioGroup`, not `Radio` — `Radio.ts` itself does not import them. They are out of scope for this item-only plan; see the [radio group doc](../radio-group/accessibility-migration-analysis.md) for the group's dependencies, including `RovingTabindexController` (1st-gen) and its 2nd-gen successor, `FocusgroupNavigationController`.

---

## Open gen1 issues

<!-- Queried live: `project = SWC AND component = "Radio" AND type in (Bug, Story) AND status != Done`, excluding Epics/Initiatives. Every open, non-Done result carries an `a11y` or `gen2` label (see the exclusion rule above), so none qualify for this table. -->

**None found** outside of ones carrying the `a11y` label.

## Migration sequencing and prerequisites

### Dependency-aware recommendation

`swc-radio` does not extend another 2nd-gen component and is not itself a shared base. It depends on one already-built shared controller (`SlotPresenceController`) and does not depend on `LabellingController` or `FieldAssociationController` (see the [Decision log](#decision-log) for both).

**Resolved: form-value participation belongs to `swc-radio-group` alone, not `swc-radio`.** The inner `<input type="radio">` in each item's shadow root is invisible to an ancestor light-DOM `<form>` regardless of where `ElementInternals` attaches, so the mechanism is needed somewhere, but not per item. Per the HTML spec, a "radio button group" is scoped to a single tree, and each item's shadow root is its own separate tree, so giving every item's inner input a shared `name` never produces native cross-item mutual exclusion anyway; `swc-radio-group` already has to hand-roll that in JS. Centralizing form participation there too (one `ElementInternals`, one `setFormValue(this.selected)` call site driven by the group's already-authoritative `selected` state) avoids keeping N per-item `ElementInternals` instances in lockstep with that same state, and matches how `invalid`, `readonly`, coordinated reset, and constraint validation already concentrate at the group level in both a11y docs. Officially signed off by the a11y SME. This reverses what `accessibility-migration-analysis.md` (this item's own doc) and `radio-group/accessibility-migration-analysis.md` originally specified, both of which said value submission happens per-item. This item's own doc has been updated to reflect the group-only direction; the corresponding update to `radio-group/accessibility-migration-analysis.md` is tracked on that component's own workstream.

1. `swc-radio` has no dependency on `FieldAssociationController`; no sequencing wait on `swc-text-field`'s controller work applies to this item.
2. `swc-radio-group`'s plan picks up `FieldAssociationController` as its own dependency, sequenced behind `swc-text-field` proving it out.

Label association (`<label for>`) and description gating (`SlotPresenceController`) were never affected by this question, since neither depends on `FieldAssociationController`.

### Related components and ordering notes

- **`swc-radio-group`**: the coordinating parent. `swc-radio` cannot ship or be documented independently, so delivery is structured accordingly:
  - **Separate migration-plan ticket, combined implementation.** `swc-radio-group` gets its own Phase 1 migration-plan ticket, SWC-2546. SWC-2470 (the ticket previously scoped as "decide whether a `RadioGroupController` is needed") is now a subticket of SWC-2546 rather than being repurposed into it — its narrower research question still needs answering, just as an input to the group's plan rather than the plan itself. The remaining implementation phases (setup/API, styling, testing, docs, review) are **combined** with this item's existing tickets (SWC-2351–2355) rather than tracked as a second parallel set, the same pattern used for a container-and-children pair like Tabs or Accordion. Those tickets keep their current titles (the "Radio" component name, per docs naming, already covers both); only their descriptions extend to cover `swc-radio-group`.
  - **Shared feature branch.** Both components' implementation lands on one feature branch, with each combined ticket still producing its own PR into that branch (standard practice for this kind of joint migration), and a single final PR merging the feature branch to `main` once both are complete.
  - **Dependency-aware recommendation on SWC-2470:** whichever way that research resolves (a dedicated `RadioGroupController` vs. composing coordination inline), it does not block or complicate this item's own API — `swc-radio` only ever exposes a minimal `select()`/`deselect()`-style hook for the group to call, and that surface is stable regardless of which shape the group's internal coordination takes. So `swc-radio-group`'s plan does not need to resolve SWC-2470 before this item's implementation tickets can proceed.
  - **`size`/`emphasized` propagation:** rather than requiring the consumer to repeat `size`/`emphasized` on every single `<swc-radio>`, `swc-radio-group` should set them once and propagate them onto each item automatically. The existing `SlotAttributePropagationController` (`2nd-gen/packages/core/controllers/slot-attribute-propagation-controller/`) is the established pattern for exactly this: `ButtonGroup` already propagates `size` to its default slot's assigned elements, and `IllustratedMessage` propagates `size` to a named `actions` slot. `swc-radio-group` can use the same controller for both `size` and `emphasized` on its default slot. The item's own `size`/`emphasized` properties are unchanged by this; only the ergonomic burden of setting them per-item moves.
  - **Roving tabindex with `delegatesFocus`:** confirmed that `FocusgroupNavigationController` (which the group is expected to use, `skipDisabled: true`) already handles items whose real focusable target is nested inside their own shadow root. Its `resolveManagedFocusTarget`/`resolveManagedKeydownTarget` walk `event.composedPath()` with a `shadowRoot.activeElement` fallback specifically to solve "listeners on the shadow host see `event.target` retargeted... when focus lands on a descendant inside the shadow tree" — exactly the `swc-radio` situation. It sets `tabIndex` on the `<swc-radio>` host (from `getItems()`) and calls `.focus()` on that host; `delegatesFocus: true` then routes actual focus into the inner input. No controller changes needed.
  - **`name` propagation not needed:** see B12. With form-value participation resolved as group-only, the inner input's `name` never reaches the outer `<form>` regardless, so propagating it would be cosmetic only. Dropped.
  - **Storybook docs:** `swc-radio` gets no standalone docs page; its usage is documented entirely within `swc-radio-group`'s page (see the Documentation section of the [Migration checklist](#migration-checklist)).
- **Checkbox**: the multi-select sibling pattern; not yet migrated to 2nd-gen. No ordering dependency in either direction. Checkbox's form semantics are genuinely per-item (multiple checkboxes can each independently contribute to `FormData`), unlike radio's single-value-for-the-set semantics, so checkbox is likely to need its own `FieldAssociationController`, unlike `swc-radio`. Checkbox may still want the same `<label for>` + `SlotPresenceController` pattern this plan lands on for labelling/description, and the same `SlotAttributePropagationController` pattern for `size`, as reusable implementation patterns.
- **Shared `_lit-styles/` fragment and render template — resolved, not needed for `swc-radio`.** `swc-text-field`'s plan proposes a shared `form-fields` stylesheet and a `.swc-FormFieldTemplate` grid (label-position `top`/`side`) for its own `LabellingController`-rendered output. `swc-radio`'s anatomy (button, inline label, optional description; no label-position modes, no error state at the item level) is a genuinely different shape, so `swc-radio` does not consume either the shared stylesheet or a shared render template — its render output is simple enough to author directly. `swc-radio-group`, which is more field-like (it owns label/description/error placement for the whole set), may still be a reasonable consumer of the shared `form-fields` stylesheet; that's its plan's decision, not this one's.
- **Global element stylesheet**: no `stylesheets/global/global-radio.css` is anticipated; radio is always used within a group's styling context, not as a bare global element like link/button. Mark **N/A** unless Design requests a global baseline.

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
| B1 | Remove `invalid`/`aria-invalid` from the item | `sp-radio` sets `aria-invalid` on itself from its own `invalid` property (SWC-285 tracks removing this) | No `invalid` property or `aria-invalid` on `swc-radio`; invalid state lives entirely on `swc-radio-group` (source: [a11y analysis](./accessibility-migration-analysis.md#aria-roles-states-and-properties)) | Move `invalid` to the enclosing `swc-radio-group`. |
| B2 | Remove `readonly` from the item | Declared on `sp-radio` but never enforced (`click()`/`activate()` never check it) | No `readonly` property on `swc-radio`; implemented once, correctly, on `swc-radio-group` (source: [a11y analysis](./accessibility-migration-analysis.md#aria-roles-states-and-properties), matching [React Spectrum's `isReadOnly` on `RadioGroup`](https://react-spectrum.adobe.com/RadioGroup)) | Move `readonly` to the enclosing `swc-radio-group`. |
| B3 | No standalone Tab stop | `sp-radio` defaults its own `tabIndex` to `0` and answers `Space` itself, so it works outside a group | `swc-radio` has no independent Tab stop; tabindex is delegated entirely to the enclosing `swc-radio-group` (source: [a11y analysis](./accessibility-migration-analysis.md#what-it-is)) | Always use `swc-radio` inside `swc-radio-group`; standalone usage is unsupported and dev-warned (B15). |
| B4 | Add per-item `description` | No equivalent | New capability, confirmed in scope by Design (source: [a11y analysis](./accessibility-migration-analysis.md#aria-roles-states-and-properties); matches [React Spectrum `Radio`](https://react-spectrum.adobe.com/RadioGroup) and the reference screenshot supplied for this plan). Ships as a named `description` slot, wired directly by `swc-radio` (`SlotPresenceController` + same-root `aria-describedby`), not via `LabellingController` — see [Decision log](#decision-log). | Additive for consumers; no migration action required unless adopting the new description surface. |
| B14 | Label content moves to a named `label` slot | Default (unnamed) slot | Named `label` slot, matching the `LinearProgressMixin` precedent (meter, progress-bar) and `swc-text-field`'s plan; the default slot is unused. | Wrap label content in `<span slot="label">…</span>` (or equivalent) instead of placing it directly inside `<swc-radio>`. |

#### Styling and visuals

| #   | What changes | 1st-gen behavior | 2nd-gen behavior | Consumer migration path |
| --- | ------------ | ---------------- | ---------------- | ----------------------- |
| B6 | Real native `<input type="radio">` added to shadow DOM | No native input; `#input`/`#button`/`#label` are all custom `div`/`span` elements, role/state hand-written on the host | A real `<input type="radio">` inside `swc-radio`'s own shadow root supplies role, `checked`, and keyboard activation natively, alongside the existing custom visual button indicator (source: [a11y analysis](./accessibility-migration-analysis.md#what-it-is)) | None for normal slotted usage; anyone reading `role`/`aria-checked` directly off the `sp-radio` host must instead inspect the shadow-internal input on `swc-radio`. |
| B7 | `--mod-radio-*` surface removed | ~27 `--mod-radio-*` custom properties | Not exposed; a small reviewed `--swc-*` set only | Remove `--mod-*` overrides; file requests for any needed `--swc-*`. |
| B8 | Keyboard-focus differentiation via native `:focus-visible` | `FocusVisiblePolyfillMixin` plus a synthetic `keydown` dispatch in `manageAutoFocus()` to fool the polyfill | Native `:focus-visible` on the real input; no polyfill or synthetic-event workaround needed | None (internal implementation simplification). |

> **Note on B8:** browser heuristics for `<input>` elements mean the `:focus-visible` ring shows for both pointer clicks and keyboard access on this control, not keyboard-only as the name might suggest. That's expected and fine; don't try to suppress the pointer-triggered ring.

#### Accessibility and behavior

| #   | What changes | 1st-gen behavior | 2nd-gen behavior | Consumer migration path |
| --- | ------------ | ---------------- | ---------------- | ----------------------- |
| B9 | `checked`/`aria-checked` come from the browser | Hand-written `aria-checked` in `updated()` | Native input's `checked` IDL property drives its own implicit `aria-checked`; `swc-radio`'s own `checked` stays in sync (source: [a11y analysis](./accessibility-migration-analysis.md#aria-roles-states-and-properties)) | None. |
| B10 | `disabled` reflects onto the native input | Hand-written `aria-disabled` in `updated()`; `pointer-events: none` via CSS | Native `disabled` on the inner input removes it from the tab order and exposes disabled state to AT for free | None. |
| B11 | Native form association | No `ElementInternals`; no native input to associate with a form at all | `swc-radio` has no `ElementInternals`/form-value participation of its own; `FieldAssociationController` (SWC-2467) is `swc-radio-group`'s dependency (see [Decision log](#decision-log)). | None for basic forms; gains real `FormData` participation via the group. |
| B12 | `name` propagation onto the inner input — dropped | N/A (no native input) | The a11y analysis originally recommended `swc-radio-group` forwarding `name` onto each item's inner input, but that input never reaches the outer `<form>` regardless of its `name` (form participation is entirely `swc-radio-group`'s, via its own `ElementInternals`), so propagating it would be cosmetic only. Not implemented. | None; `name` for form-submission purposes lives at the group level. |
| B13 | Same-root `aria-describedby` for `description` | N/A | Set on the inner input only when a description is actually present (source: [a11y analysis](./accessibility-migration-analysis.md#aria-roles-states-and-properties)) | None (additive AT improvement, tied to B4). |
| B15 | Dev-mode warning for standalone usage | N/A | If `swc-radio` renders with no enclosing `swc-radio-group`, warn rather than silently rendering an inert control. | None (dev-time only). |

### Additive — ships when ready, zero breakage for consumers already on 2nd-gen

| #   | What is added | Notes |
| --- | -------------- | ----- |
| A2 | Additional `--swc-*` custom properties | Beyond the initial small reviewed set (e.g. button/control size override), add only on confirmed need post-ship. |
| A3 | Future labelling surfaces | If the description gains an icon or contextual-help affordance later, mirroring `swc-text-field`'s deferred `prefix`/`ContextualHelp` surfaces. |
| A4 | `accessible-label`/`accessible-labelledby`/`accessible-describedby` | Deferred out of the API entirely — see [Decision log](#decision-log). Revisit only if a concrete consumer need for externally labelling/describing a single radio item surfaces. |

---

## 2nd-gen API decisions

These are derived from the 1st-gen implementation, the [accessibility migration analysis](./accessibility-migration-analysis.md), the [rendering-and-styling analysis](./rendering-and-styling-migration-analysis.md), the approved forms strategy (SWC-1888), the Figma size/state/emphasis matrix supplied for this plan, and React Spectrum. Confirmed items are marked; open items are tracked in [Blockers and open questions](#blockers-and-open-questions).

- **Confirmed**: directly supported by source material
- **Inferred**: recommended based on multiple signals, but not explicitly specified in one authoritative source
- **Open question**: unresolved and needs review or more input

### Public API

#### Properties / attributes (2nd-gen)

| Property | Type | Default | Attribute | Notes |
| -------- | ---- | ------- | --------- | ----- |
| `value` | `string` | `''` | `value` (reflect) | **Confirmed.** Plain content attribute, not ARIA; identifies this option within the group's shared `name`. |
| `checked` | `boolean` | `false` | `checked` (reflect) | **Confirmed.** Kept in sync with the inner native input's `checked`; never emits `"mixed"`. |
| `disabled` | `boolean` | `false` | `disabled` (reflect) | **Confirmed.** Reflected onto the inner input's native `disabled`. |
| `emphasized` | `boolean` | `false` | `emphasized` (reflect) | **Confirmed.** Matches the Figma matrix's Emphasized row and 1st-gen naming; affects the checked indicator's accent color only (unchecked + emphasized renders identically to unchecked + default, consistent with 1st-gen's CSS scoping `--emphasized` selectors to `:checked`). Recommend `swc-radio-group` propagate this onto each item via `SlotAttributePropagationController` so consumers set it once on the group, not on every item — see [Related components and ordering notes](#related-components-and-ordering-notes). |
| `size` | `'s' \| 'm' \| 'l' \| 'xl'` | `'m'` | `size` (reflect) | **Confirmed.** Explicit default `m` (drop `noDefaultSize`), following `swc-text-field`'s precedent. Same group-propagation recommendation as `emphasized` applies. |
| `autofocus` | `boolean` | `false` | `autofocus` | **Confirmed.** Native attribute; the focus-visible-polyfill synthetic-keydown trick is dropped (B8). |
| `invalid`, `readonly` | — | — | — | **Removed** (see B1, B2). |
| `accessibleLabel`, `accessibleLabelledby`, `accessibleDescribedby` | — | — | — | **Deferred out of the API** (see A4, [Decision log](#decision-log)). Not shipped even as additive scope; no evidenced radio-specific use case. |

#### Visual matrix (2nd-gen)

Based on the Figma size/state/emphasis matrix supplied for this plan, the supported visual combinations are:

| Axis | Values |
| ---- | ------ |
| Size | `s` (Small), `m` (Medium), `l` (Large), `xl` (Extra large) |
| Emphasis | Default (neutral checked indicator), Emphasized (accent checked indicator) |
| Selection | Default (unchecked), Selected (checked) |
| Interaction state | Default, Hover, Disabled |
| Label wrap | Single line, wrapped (label text wraps across multiple lines at every size) |

Additional Figma-confirmed presentation notes:

- The Emphasized row is only visually distinct once checked, matching 1st-gen's CSS scoping of `--emphasized` selectors to `:checked`; there is no separate "emphasized + unchecked" treatment.
- Label text wrap is a CSS behavior confirmation (the label must wrap correctly at every size), not a new boolean property — no 1st-gen or Figma evidence supports a truncation mode.
- Focus-visible, invalid, and readonly are **not** shown in this matrix because they are not item-level states in 2nd-gen (invalid/readonly move to the group; focus-visible is a keyboard-only ring layered on top of any of the above rather than a distinct row).

#### Slots (2nd-gen)

| Slot | Content | Notes |
| ---- | ------- | ----- |
| `label` | Visible label text of the radio | Named slot, matching the `LinearProgressMixin` precedent (meter, progress-bar) and `swc-text-field`'s plan — see [Decision log](#decision-log). Breaking change from 1st-gen's default slot (B14). |
| `description` | Optional secondary/help text for this single item | Named slot, rendered in-shadow directly by `swc-radio`, gated by `SlotPresenceController`; associated via same-root `aria-describedby` only when populated (no `LabellingController` dependency — see [Decision log](#decision-log)). |

#### CSS custom properties (2nd-gen)

No `--mod-*` properties will be exposed. New `--swc-*` component-level properties may be introduced where needed — these are additive and not breaking. See [Component Custom Property Exposure](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#component-custom-property-exposure) for what to expose and how.

Each exposed `--swc-*` property must be documented with a `@cssprop` JSDoc tag on the primary SWC component class. Storybook picks these up and surfaces them in the API docs panel automatically.

Initial expectation for Radio is a small reviewed set (likely control size and focus-indicator thickness, mirroring the 1st-gen modifiers most likely to see real override requests).

### Behavioral semantics

- **Selection/activation:** clicking, or pressing <kbd>Space</kbd> on the focused, unchecked native input, checks it and dispatches `change` (`bubbles: true, composed: true`). Receiving focus via Tab or a bare `.focus()` call must not itself change `checked`; receiving focus via the group's arrow-key roving does check the newly focused item, per the [APG radio pattern](https://www.w3.org/WAI/ARIA/apg/patterns/radio/). The group owns which mechanism is in play; the item's own job is to reflect `checked` from its native input and dispatch `change`.
- **Checked-state flow (item ↔ group):** two distinct directions, matching 1st-gen's actual mechanism:
  - **Declarative pre-check (item → group, first render only):** a consumer may mark a single `<swc-radio checked>` in markup to pre-select it. On its first update, `swc-radio-group` reads its light-DOM children for one with `checked` already set and adopts that item's `value` as its own initial `selected`, preferring the pre-checked item over any `selected` attribute the group itself was given (1st-gen's `willUpdate` does exactly this).
  - **Imperative sync (group → item, every selection change):** after the first render, `swc-radio-group` is the single source of truth. Whenever its `selected` changes (user interaction or a script setting `selected` directly), the group sets `checked` on each item to `item.value === this.selected`, so exactly one is ever checked and each item's own `checked` is always a reflection of the group's decision, never a competing source of truth (1st-gen's `validateRadios()` does this today).
  - `swc-radio` itself does not decide whether it's checked in steady state; it only proposes a change (via user activation, dispatching `change`) for the group to accept or reject.
- **Disabled:** reflect onto the inner native input's `disabled` attribute; the browser removes it from the tab order and exposes disabled state to assistive technology without any hand-written `aria-disabled`.
- **Form participation:** none on `swc-radio` itself. `swc-radio-group` alone is the `FieldAssociationController` consumer, driven by its own `selected` state (resolved — see [Decision log](#decision-log)).
- **Value/name:** `value` is a plain attribute the group reads and the form submits. `name` is not forwarded onto the inner input; see B12.
- **Accessible name:** a real, same-root `<label for="…">` wraps/targets the named `label` slot's content and the inner input's generated `id`, matching Spectrum CSS's own reference anatomy for `.spectrum-Radio-label` (see [Decision log](#decision-log)).
- **Description:** `SlotPresenceController` watches the `description` slot; when populated, `aria-describedby` on the inner input targets the description container's `id`. Implemented directly in `Radio.base.ts`.

### Accessibility semantics notes (2nd-gen)

Authoritative source: [accessibility migration analysis](./accessibility-migration-analysis.md). Key points: the host sets no `role` (the native `<input type="radio">` supplies `role="radio"`); `checked`/`aria-checked` come from the browser; accessible name comes from a real, same-root `<label for="…">` (not `LabellingController` — see [Decision log](#decision-log)); per-item `description` is wired via same-root `aria-describedby`, gated by `SlotPresenceController`; `disabled` reflects onto the native input rather than a hand-written `aria-disabled`; no per-item `invalid`/`readonly`; `swc-radio` has no independent Tab stop.

---

## Architecture: core vs SWC split

> The 1st-gen component is a **reference only** — 2nd-gen is built independently. Neither generation imports from the other.

Follow the [Badge migration reference](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#reference-badge-migration) as the concrete pattern for the core/SWC split.

| Layer    | Path                                            | Contains                                                                                                                                                                                                                                          |
| -------- | ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Core** | `2nd-gen/packages/core/components/radio/` | `Radio.base.ts`, `Radio.types.ts`, value/checked normalization, wiring of the shared `SlotPresenceController`, and the standalone-usage dev-warning (B15). No `FieldAssociationController` (that's `swc-radio-group`'s). No rendering. |
| **SWC**  | `2nd-gen/packages/swc/components/radio/`  | `Radio.ts`, `radio.css`, `swc-radio` registration, stories, tests, and the specific S2 rendering/styling. |

Planned rendering shape:

- Core owns API normalization, `checked`/`value` sync, and controller wiring.
- SWC renders: a `.swc-Radio` wrapper containing the real `<input type="radio">`, the existing custom visual button indicator kept in sync via CSS `:checked` selectors (no JS state mirroring needed for the dot itself), a real `<label for="…">` around the slotted label, and a `SlotPresenceController`-gated description container. Label association and description gating are implemented directly here, not via a shared labelling controller — see [Decision log](#decision-log).

**Relationship to `swc-radio-group`.** This plan and its item-level API decisions hold regardless of how `swc-radio-group` internally coordinates its items (dedicated `RadioGroupController` vs. inline composition, SWC-2470). The item exposes whatever minimal `select()`/`deselect()`-style hook the group's chosen coordination shape needs; that hook's exact signature is the group plan's decision, not this one's.

---

## Migration checklist

<!-- Adjust the following checklists as needed. New sections may be added under API for clarity. Keep the stable baseline checklist items unless they are truly not applicable; prefer additive edits over removing them. -->

### Preparation (this ticket)

- [x] 1st-gen API surface documented
- [x] Dependencies identified
- [x] Breaking changes documented
- [x] 2nd-gen API decisions drafted
- [ ] Plan reviewed by at least one other engineer

### Setup

- [ ] Create `2nd-gen/packages/core/components/radio/`
- [ ] Create `2nd-gen/packages/swc/components/radio/`
- [ ] Wire exports in both `package.json` files
- [ ] Check out `spectrum-css` at `spectrum-two` branch as sibling directory
- [ ] Confirm the shared feature branch for combined `swc-radio`/`swc-radio-group` delivery exists before opening implementation PRs against it

### API

#### Naming and public surface

- [ ] `Radio.types.ts`: define the `size` union (`s`/`m`/`l`/`xl`, explicit default `m`); export public types
- [ ] `Radio.base.ts`: implement `value`, `checked`, `disabled`, `emphasized`, `size`, `autofocus`
- [ ] Remove `invalid`, `readonly` from the item surface (B1, B2)
- [ ] Do not add `accessible-label`/`accessible-labelledby`/`accessible-describedby` (deferred — see A4, [Decision log](#decision-log))
- [ ] Rename the label slot from default to named `label` (B14); update stories/tests accordingly
- [ ] Implement label association via a real `<label for="…">` targeting the inner input's generated `id`, wrapping the `label` slot's content (no `LabellingController` dependency)
- [ ] Gate the optional `description` slot/`aria-describedby` with `SlotPresenceController`
- [ ] Implement the standalone-usage dev-mode warning (B15)
- [ ] Do not propagate `name` onto the inner input (B12)

#### Alignment checks

- [ ] Verify property names and defaults against the Figma size/state/emphasis matrix and [React Spectrum RadioGroup](https://react-spectrum.adobe.com/RadioGroup)
- [ ] Confirm the `description` wiring mechanism (`SlotPresenceController` + same-root `aria-describedby`) with the a11y reviewer

### Styling

> Follow the [CSS style guide](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/) as the source of truth for all styling work. Key references: [migration steps](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/04_spectrum-swc-migration.md), [custom properties](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md), [anti-patterns](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/05_anti-patterns.md).

- [ ] Add `.swc-Radio` to the internal semantic wrapper in `render()`; keep styling off `:host`
- [ ] Copy S2 source from `spectrum-css` `spectrum-two` branch `index.css` (not `/dist`) into `radio.css` as baseline
- [ ] Author `radio.css` directly; do not consume the shared `form-fields` `_lit-styles/` fragment or a shared render template (resolved — see [Decision log](#decision-log))

#### Visual model and regressions

- [ ] Verify i18n size modifiers (`:lang(ja)`, `:lang(ko)`, `:lang(zh)`) present in the S2 source
- [ ] Add `@cssprop` JSDoc tag to the primary SWC component class for every exposed `--swc-*` property (e.g. `@cssprop --swc-radio-height - Block size of the radio.`)
- [ ] Pass stylelint (property order, `no-descending-specificity`, token validation)

### Accessibility

<!-- Sourced from accessibility-migration-analysis.md summary checklist. -->

#### Naming and semantics

- [ ] `swc-radio` sets no `role` on its own host; the real, native `<input type="radio">` inside its shadow DOM supplies `role="radio"`
- [ ] Shadow root uses `delegatesFocus: true` so Tab and programmatic focus land on the inner input
- [ ] Accessible name comes from a real, same-root `<label for="…">` around the slotted label content, targeting the inner input's generated `id` (no `LabellingController` dependency — see [Decision log](#decision-log))
- [ ] Per-item `description` wired via same-root `aria-describedby`, gated by `SlotPresenceController` and set only when content is present

#### State verification

- [ ] `checked`/`aria-checked` come from the native inner input; never emits `"mixed"`
- [ ] `disabled` reflects onto the inner input's native `disabled` rather than a hand-written `aria-disabled`
- [ ] No per-item `readonly` or `invalid`/`aria-invalid` remains on `swc-radio`
- [ ] `swc-radio` has no `ElementInternals`/form-value participation of its own; `FieldAssociationController` lives entirely on `swc-radio-group`
- [ ] `name` is not propagated onto the item's inner input (B12)
- [ ] Receiving focus via Tab or `.focus()` never auto-selects; receiving focus via the group's arrow-key roving always does

### Testing

<!-- Fill in comprehensive test cases -->

- [ ] Port `1st-gen/packages/radio/test/radio.test.ts` coverage that still applies (item only, not `radio-group.test.ts`)
- [ ] Add Playwright `radio.a11y.spec.ts` with `toMatchAriaSnapshot`

#### Behavior

- [ ] `swc-radio`'s shadow DOM contains a real `<input type="radio">`
- [ ] `checked` stays in sync with the inner input's `checked`
- [ ] `change` event dispatches on activation
- [ ] Form-value participation happens on `swc-radio-group` alone (its `FieldAssociationController` calls `setFormValue`/`setFormValue(null)` off its own `selected` state), not on `swc-radio`

#### Visual regression

<!--
Retain this section for any components with visual rendering, modifying as needed for the component's specs and variants. Replace the example bullets below with VRT items that match this component, and reference real bug tickets only when they apply to this component.
-->

- [ ] Add VRT coverage for the size × emphasis × selection × state matrix confirmed in [Visual matrix (2nd-gen)](#visual-matrix-2nd-gen), including hover and disabled
- [ ] Add VRT coverage for wrapped (multi-line) labels at every size
- [ ] Add focus-visible regression coverage for the keyboard ring on the inner input
- [ ] Add forced-colors (high-contrast) coverage for checked/disabled states

### Documentation

<!-- Notes of what to include in documentation -->

#### General

- [ ] JSDoc on all public props, slots, and CSS custom properties
- [ ] No standalone `swc-radio` Storybook docs page; document its sizes, emphasis, checked/unchecked, disabled, description, and standalone-usage dev-warning behavior (B15) as part of `swc-radio-group`'s docs page instead

#### Breaking changes

- [ ] Consumer migration guide entries for B1–B3 (`invalid`/`readonly` move to the group; no standalone usage) and B14 (default slot → named `label` slot)

### Review

- [ ] `yarn lint:2nd-gen` passes (ESLint, Stylelint, Prettier)
- [ ] Status table in workstream doc updated
- [ ] PR created against the shared `swc-radio`/`swc-radio-group` feature branch (not directly against `main`), with a description referencing Epic SWC-2348
- [ ] Peer engineer sign-off

---

## Blockers and open questions

During drafting, this section tracks active blockers and open questions. In the final review-ready plan, once core migration questions are resolved and deferred tickets exist, replace those drafting-time rows with a concise deferred-ticket table.

### Design

| #   | Item | Blocking? | Status | Owner |
| --- | ---- | --------- | ------ | ----- |

_None currently — all resolved; see [Decision log](#decision-log)._

### Architecture and behavior

| #   | Item | Blocking? | Status | Owner |
| --- | ---- | --------- | ------ | ----- |
| Q4 | `FieldAssociationController` does not exist yet (verified absent from `2nd-gen/packages/core/controllers/`). It is `swc-radio-group`'s dependency, not this item's (see [Decision log](#decision-log)). Sequenced delivery tracked under `swc-text-field`'s epic (SWC-2323), not a blocker to this plan. | No | Open: track `swc-text-field`'s controller delivery | Architecture |
| Q6 | Whether `swc-radio-group` needs a dedicated `RadioGroupController` or composes coordination inline (SWC-2470). Genuinely unresolved architecture question; see [Related components and ordering notes](#related-components-and-ordering-notes) for why it doesn't block this plan regardless of outcome. | No | Tracked as a subticket of SWC-2546, not blocking here | Architecture |

### Scope and prerequisites

| #   | Item | Blocking? | Status | Owner |
| --- | ---- | --------- | ------ | ----- |

_None currently — all resolved; see [Decision log](#decision-log)._

---

## Decision log

Resolved decisions from planning, kept here as a historical record so [Blockers and open questions](#blockers-and-open-questions) stays focused on what's still unresolved. Entries retain their original `Q`/`B` identifiers where one existed, so inline references elsewhere in the plan still resolve here. Going forward, when a blocker or open question is resolved, move its row here with a what/why summary instead of leaving it in the Blockers tables.

| Ref | Decision | Rationale / context |
| --- | -------- | -------------------- |
| Q5 / B5 | `swc-radio` does not depend on `LabellingController`. Label association uses a real, same-root `<label for="…">` targeting the inner input's generated `id`, matching Spectrum CSS's own reference anatomy (`spectrum-Radio-label` is a real `<label for>`, not an ARIA-wired span) — zero ARIA or JS needed for the ordinary case. The optional per-item `description` is gated by the already-built `SlotPresenceController` and wired via a same-root `aria-describedby`, implemented directly in `Radio.base.ts`. `accessible-label`, `accessible-labelledby`, and `accessible-describedby` are deferred out of the public API entirely (tracked as additive A4, not must-ship). | Unlike `swc-text-field` (where an unlabeled-but-placeholder'd field, or a grid-composed external label, are real, evidenced use cases), a radio option without its own visible label isn't a usable pattern — you can't compare unlabeled options. The three-way accessible-name precedence problem `LabellingController` exists to solve for text-field has no corresponding evidenced use case for a single radio item, so depending on it (and shipping the override properties it enables) would be premature API surface. |
| Q1 | Per-item `description` ships as a named `description` slot, not a string property (B4). | Consistent with `swc-text-field`'s `description` slot naming; the item's primary label is already slot-based, so a slot is the natural fit. |
| — / B14 | Label content moves to a named `label` slot; the default (unnamed) slot goes unused. | Matches the established `LinearProgressMixin` precedent (meter, progress-bar use `[slot="label"]`/`[slot="description"]`, not a default slot) and `swc-text-field`'s plan. Naming consistency across the label-bearing 2nd-gen components was judged more valuable than preserving 1st-gen's default-slot usage. |
| Q2 | No truncation/clamp mode for the label at any size. | Figma matrix shows wrap only at every size; no 1st-gen or Figma evidence supports a truncation mode. |
| Q3 | The reference description screenshot's visual treatment (font size, color, spacing under the label) maps onto Spectrum 2 tokens, not a React-Spectrum-specific style. | Confirmed. |
| Q12 | Form-value participation belongs to `swc-radio-group` alone; `swc-radio` has no `FieldAssociationController` dependency (B11, B12). | **Officially signed off by the a11y SME.** This item's own `accessibility-migration-analysis.md` has been updated to match (its "Form association" row, testing table, and summary checklist no longer describe a per-item `FieldAssociationController`); `radio-group/accessibility-migration-analysis.md`'s corresponding update is tracked on that component's own workstream, not this one. Full reasoning in [Dependency-aware recommendation](#dependency-aware-recommendation), the sole detailed home for this decision. |
| — | `swc-radio` cannot ship or be documented independently of `swc-radio-group`. | Combined-delivery model (separate migration-plan ticket SWC-2546, SWC-2470 as its subticket, combined implementation tickets SWC-2351–2355, shared feature branch, no standalone docs page). Full detail in [Related components and ordering notes](#related-components-and-ordering-notes), the sole detailed home for this decision. |
| Q7 / B15 | `swc-radio` dev-warns when rendered standalone (no enclosing `swc-radio-group`). Promoted from additive to must-ship. | An accessibility safety-net for a misuse pattern is non-negotiable scope under this repo's "accessibility is non-negotiable" framing, not something to defer. |
| Q8 | `size` gets an explicit default of `m`, dropping `noDefaultSize`. | Follows `swc-text-field`'s precedent; removes a 1st-gen quirk where the effective default depended on consumer CSS rather than the component itself. |
| Q10 | `swc-radio` does not consume the shared `form-fields` `_lit-styles/` fragment or a shared render template. `swc-radio-group` may still be a consumer of the shared stylesheet. | `swc-radio`'s anatomy (button, inline label, optional description; no label-position modes, no item-level error state) is a genuinely different grid shape from the field-family template `swc-text-field` is building, so radio items don't fit it. The group, which owns label/description/error placement for the whole set, is more field-like and may still benefit from the shared stylesheet — that's its plan's decision. |

---

## References

- [Washing machine workflow](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md)
- [2nd-gen migration status table](../../02_workstreams/02_2nd-gen-component-migration/01_status.md)
- [Accessibility migration analysis](./accessibility-migration-analysis.md)
- [Rendering and styling migration analysis](./rendering-and-styling-migration-analysis.md)
- [Radio group accessibility migration analysis](../radio-group/accessibility-migration-analysis.md) — the coordinating parent; separate plan
- [Forms strategy RFC (SWC-1888)](../../05_strategies/forms-strategy-rfc.md)
- [Text field migration plan](../text-field/migration-plan.md) — the first form-field-related 2nd-gen implementation; source of the `FieldAssociationController` sequencing `swc-radio-group`'s plan depends on, and of the `LabellingController`/shared `form-fields` stylesheet this plan deliberately does not depend on (see [Decision log](#decision-log)) (not yet merged at time of drafting)
- [`SlotPresenceController`](../../../../2nd-gen/packages/core/controllers/slot-presence-controller/slot-presence-controller.mdx) — already-built controller this plan uses to gate the `description` slot/`aria-describedby`
- [CSS style guide — Component Custom Property Exposure](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#component-custom-property-exposure)
- [1st-gen source](../../../../1st-gen/packages/radio/src/Radio.ts)
- [1st-gen tests](../../../../1st-gen/packages/radio/test/radio.test.ts)
- [1st-gen README](../../../../1st-gen/packages/radio/README.md)
- [React Spectrum RadioGroup](https://react-spectrum.adobe.com/RadioGroup) (covers both `RadioGroup` and `Radio` props, including per-item `description`)
- [Spectrum CSS — `spectrum-two` branch, `components/radio/index.css`](https://github.com/adobe/spectrum-css/tree/spectrum-two/components/radio): reviewed via a sibling checkout at `spectrum-css/components/radio/index.css`
- [Badge migration reference](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#reference-badge-migration)
- Epic: SWC-2348, Radio migration epic
- SWC-2349, radio a11y research ticket (source of the accessibility migration analysis)
- SWC-2350, "[Radio] Analyze component and create migration plan" — **this document is its deliverable**
- SWC-2351, "Update [Radio] file structure, API, TypeScript, and accessibility" — Setup/API phase, including the Q1 `description` API decision; description extended to combine `swc-radio-group` implementation (see [Decision log](#decision-log))
- SWC-2352, "[Radio] Full S2 visual fidelity" — Styling phase; description extended to combine `swc-radio-group`
- SWC-2353, "[Radio] Review and complete test suites" — Testing phase; description extended to combine `swc-radio-group`
- SWC-2354, "[Radio] Storybook docs and consumer migration guide" — Documentation phase; description extended to combine `swc-radio-group` (`swc-radio` has no standalone docs page)
- SWC-2355, "[Radio] Review and finalize migration" — Review phase; description extended to combine `swc-radio-group`
- SWC-2466, `LabellingController` — not a `swc-radio` dependency; listed for context only (see [Decision log](#decision-log))
- SWC-2467, `FieldAssociationController` — not a `swc-radio` dependency; it's `swc-radio-group`'s (resolved, see [Decision log](#decision-log))
- SWC-2470, `RadioGroupController` research spike — now a subticket of SWC-2546 (`swc-radio-group`'s own migration-plan ticket), rather than being repurposed into it
- SWC-2546, "[Radio Group] Analyze component and create migration plan" — `swc-radio-group`'s own Phase 1 ticket, created separately from this doc
- SWC-1178, open a11y bug: visible group label missing — filed under the `Radio` component in Jira but concerns `swc-radio-group`'s label, not this item; already tracked in the [radio group accessibility migration analysis](../radio-group/accessibility-migration-analysis.md#related-1st-gen-accessibility-jira)
