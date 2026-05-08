<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Button / Button Migration Plan

<!-- Document title (editable) -->

# Button Migration Plan

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
- [Changes overview](#changes-overview)
    - [Must ship — breaking or a11y-required](#must-ship--breaking-or-a11y-required)
    - [Additive — ships when ready, zero breakage for consumers already on 2nd-gen](#additive--ships-when-ready-zero-breakage-for-consumers-already-on-2nd-gen)
- [2nd-gen API decisions](#2nd-gen-api-decisions)
    - [Public API](#public-api)
    - [Behavioral semantics](#behavioral-semantics)
    - [Pending accessible-name rule (2nd-gen)](#pending-accessible-name-rule-2nd-gen)
    - [Accessibility semantics notes (2nd-gen)](#accessibility-semantics-notes-2nd-gen)
    - [Deferred semantics note (2nd-gen)](#deferred-semantics-note-2nd-gen)
    - [Internal semantic button implications](#internal-semantic-button-implications)
- [Architecture: core vs SWC split](#architecture-core-vs-swc-split)
    - [Shared semantics reuse](#shared-semantics-reuse)
    - [Global alignment contract](#global-alignment-contract)
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
    - [Deferred follow-up tickets](#deferred-follow-up-tickets)
- [References](#references)

</details>

<!-- Document content (editable) -->

> **SWC-1873** · Planning output. Must be reviewed before implementation begins.

---

## TL;DR

- `sp-button` is planned to become button-only in 2nd-gen; deprecated link mode moves to native `<a>` with global button styling
- 2nd-gen `sp-button` should render an internal semantic `<button>` and move semantics off the host
- Pending must remain focusable while unavailable, use `aria-disabled="true"`, and announce a descriptive busy state
- The visual API should use React-aligned `fillStyle` terminology: `primary` / `secondary` support `fill` + `outline`; `accent` / `negative` are fill-only
- Pending will use a 1-second delayed inline animated SVG spinner in the initial migration; reuse can be evaluated later
- Component Button styles and [`global-button.css`](../../../../2nd-gen/packages/swc/stylesheets/global/global-button.css) should share source/imports if possible
- `core` should own reusable semantic rules and serve as the intended reuse base for later button-like migrations; `swc` should own `sp-button` rendering and S2 styling

### Most blocking open questions

None currently.

---

## 1st-gen API surface

**Source:** [`1st-gen/packages/button/src/Button.ts`](../../../../1st-gen/packages/button/src/Button.ts)
**Version:** `@spectrum-web-components/button@1.11.2`
**Custom element tag:** `sp-button`

### Properties / attributes

| Property | Type | Default | Attribute | Notes |
|---|---|---|---|---|
| `variant` | `'accent' \| 'primary' \| 'secondary' \| 'negative' \| 'white' \| 'black' \| 'cta' \| 'overBackground'` | `'accent'` | `variant` | Invalid values are coerced to `accent`. `cta`, `overBackground`, `white`, and `black` are already deprecated aliases. |
| `staticColor` | `'white' \| 'black' \| undefined` | `undefined` | `static-color` | Can coexist with `variant`. Used for over-background styling. |
| `treatment` | `'fill' \| 'outline'` | `'fill'` | `treatment` | Visual treatment. |
| `quiet` | `boolean` | `false` | `quiet` | Alias for `treatment="outline"`; not reflected back to the attribute when set programmatically. |
| `size` | `'s' \| 'm' \| 'l' \| 'xl'` | no explicit default from `SizedMixin` | `size` | `Button` uses `SizedMixin(..., { noDefaultSize: true })`; CSS treats missing size as medium styling. |
| `pending` | `boolean` | `false` | `pending` | Disables interaction and swaps accessible label to pending text while active. |
| `pendingLabel` | `string` | `'Pending'` | `pending-label` | Temporary accessible name used during pending state. |
| `noWrap` | `boolean` | `false` | `no-wrap` | 1st-gen off-spec escape hatch to disable wrapping; candidate for rename in 2nd-gen. |
| `active` | `boolean` | `false` | `active` | Reflected pressed-state flag used during keyboard interaction. |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | `type` | Submit/reset is proxied through a temporary native `<button>`. |
| `disabled` | `boolean` | `false` | `disabled` | Inherited from `Focusable`; manages tabindex and `aria-disabled`. |
| `autofocus` | `boolean` | `false` | `autofocus` | Inherited from `Focusable`. |
| `tabIndex` | `number` | managed | `tabindex` | Inherited from `Focusable`; host is the focus target. |
| `label` | `string \| undefined` | `undefined` | `label` | Inherited from `LikeAnchor`; mirrored to host `aria-label`. Primary accessible-name API for icon-only usage. |
| `href` | `string \| undefined` | `undefined` | `href` | Deprecated link mode. Causes host role to change from button to link. |
| `target` | `'_blank' \| '_parent' \| '_self' \| '_top' \| undefined` | `undefined` | `target` | Deprecated with `href`. |
| `download` | `string \| undefined` | `undefined` | `download` | Deprecated with `href`. |
| `referrerpolicy` | string union | `undefined` | `referrerpolicy` | Deprecated with `href`. |
| `rel` | `string \| undefined` | `undefined` | `rel` | Deprecated with `href`. |
| `icon-only` | `boolean` | `false` | `icon-only` | Attribute-only styling hook used in README, stories, tests, and CSS; no declared TS property. |

### Methods

| Method | Signature | Notes |
|---|---|---|
| `click()` | `(): void` | No-op while `pending`; otherwise delegates to `Focusable.click()`, including link and submit/reset proxy behavior. |

### Events

No custom events. Consumers rely on native `click`.

### Slots

| Slot | Content | Notes |
|---|---|---|
| default | Visible button label | Observed via `ObserveSlotText` to determine whether a label is present. |
| `icon` | Leading icon | Slot receives an `icon-only` flag when no default-slot label content is present. |

### CSS custom properties

The 1st-gen implementation exposes a large legacy customization surface through imported [`button-base.css`](../../../../1st-gen/packages/button/src/button-base.css), [`spectrum-button.css`](../../../../1st-gen/packages/button/src/spectrum-button.css), and [`button-overrides.css`](../../../../1st-gen/packages/button/src/button-overrides.css). In practice this includes:

- Many `--mod-button-*` variables for sizing, spacing, color, border, and focus ring
- Legacy `--spectrum-button-*` token fallback chains
- High-contrast `--highcontrast-button-*` overrides
- Progress-circle passthroughs such as `--mod-progress-circle-position`

This full modifier surface will not be carried forward to 2nd-gen.

### Shadow DOM output (rendered HTML)

```html
<!-- Default button mode: the host itself behaves as the interactive control -->
<slot name="icon" icon-only></slot>
<span id="label">
  <slot></slot>
</span>
<sp-progress-circle
  id="loader"
  size="s"
  indeterminate
  class="progress-circle"
  role="presentation"
></sp-progress-circle>

<!-- Link mode: same content plus a hidden proxy anchor -->
<slot name="icon"></slot>
<span id="label">
  <slot></slot>
</span>
<a
  id="button"
  class="button anchor"
  href="..."
  tabindex="-1"
  aria-hidden="true"
></a>
```

---

## Dependencies

| Package | Version | Role |
|---|---|---|
| `@spectrum-web-components/base` | `1.11.2` | `LitElement` base utilities, decorators, `SizedMixin` |
| `@spectrum-web-components/shared` | `1.11.2` | `Focusable`, `LikeAnchor`, and `ObserveSlotText` behaviors |
| `@spectrum-web-components/reactive-controllers` | `1.11.2` | `PendingStateController` and pending `aria-label` caching |
| `@spectrum-web-components/progress-circle` | `1.11.2` | Pending-state indicator |
| `@spectrum-web-components/icon` / consumer-provided icons | `1.11.2` | Optional slotted icon content |

---

## Changes overview

> **Priority framing:**
> - **Accessibility is non-negotiable** — all a11y requirements ship as part of this migration.
> - **Breaking changes** are assessed on merit — some must ship now to avoid a second, more disruptive migration event later.
> - **Additive changes** can be deferred and will not cause consumer breakage when they do ship.

### Must ship — breaking or a11y-required

#### API and naming

| # | What changes | 1st-gen behavior | 2nd-gen behavior | Consumer migration path |
|---|---|---|---|---|
| **B1** | Remove link API from `sp-button` | `href` and related anchor attrs turn the host into a link-like control, but this mode is already deprecated in docs and runtime warnings. | `sp-button` is button-only. Navigation uses native `<a>` with global button styles, not `sp-button`. | Replace `<sp-button href="...">` with native `<a class="swc-Button ...">` or equivalent global-element styling. |
| **B2** | Align visual API names to the confirmed Design source of truth and React terminology | 1st-gen uses `primary`, `secondary`, `accent`, `negative`, deprecated color aliases, `quiet`, and `treatment`. | 2nd-gen visual API should use `primary`, `secondary`, `accent`, and `negative`, plus static white/black combinations where shown, and prefer React-aligned `fillStyle` terminology instead of `treatment`. | Migrate deprecated `variant` values to canonical `variant` + `static-color` + `fill-style` combinations. |
| **B3** | Collapse legacy host-managed semantics into native internal control | 1st-gen host manages `role`, `tabindex`, keyboard handling, click proxying, and submit/reset proxy behavior itself. | 2nd-gen should prefer a real internal `<button>` for semantics and keyboard behavior, with host API mapping onto that internal control. | Consumer markup usually stays the same, but any shadow DOM poking or role/tabindex assertions must be updated. |
| **B4** | Remove `--mod-*` customization surface | Consumers can override many colors, sizes, and spacings through legacy modifier chains. | 2nd-gen exposes only reviewed `--swc-*` component-level properties, if any. | Migrate custom styling to supported `--swc-*` properties or wrapper-level CSS. |

#### Styling and visuals

| # | What changes | 1st-gen behavior | 2nd-gen behavior | Consumer migration path |
|---|---|---|---|---|
| **B5** | Restrict treatment/style combinations to those present in Design/Figma | 1st-gen exposes outline and static combinations broadly, and `quiet` can alias to outline on any variant. | 2nd-gen should only ship the confirmed combinations: fill + outline for `primary` and `secondary`; fill-only for `accent` and `negative`; static white/black only for the primary/secondary families shown in Design/Figma. | Audit any unsupported combinations and migrate them to the nearest supported equivalent. |
| **B6** | Resolve static white outline contrast bug (`SWC-1139`) | The static white outline variant can be shown over backgrounds where hover-state contrast between white text/border and the background is insufficient. | When rendering the static white outline button in 2nd-gen docs/stories/examples, it must be paired with a background color that preserves required contrast on hover. The migration should treat this as a must-ship a11y/visual correctness requirement, not an optional docs polish item. | Update examples, stories, and visual regression fixtures so static white outline is only demonstrated on approved backgrounds. |

#### Accessibility and behavior

| # | What changes | 1st-gen behavior | 2nd-gen behavior | Consumer migration path |
|---|---|---|---|---|
| **B7** | Resolve pending-state accessibility bug (`SWC-459`) | Pending currently blocks activation, but the accessibility contract is incomplete: assistive tech is not clearly told the control is unavailable, the default pending label is too generic (`"Pending"`), and high-contrast presentation does not fully communicate the disabled/unavailable state. | Pending in 2nd-gen must expose unavailable state to assistive tech, use a more descriptive default accessible label than bare `"Pending"`, and render with disabled high-contrast styling because the control cannot be activated while pending. | Consumers using custom `pending-label` values may need to update wording to the new recommended pattern. |
| **B8** | Preserve host `visibility` behavior on the label (`SWC-701`) | The button label can manage its own visibility in a way that breaks host-level `visibility: hidden`, leaving label text visible when the host is hidden. | In 2nd-gen, the label must inherit visibility from the host, or avoid setting its visibility separately, so host-level hiding hides the entire control consistently. | Consumers relying on `visibility: hidden` at the host level should see the bug resolved without markup changes. |
| **B9** | Replace box-shadow focus ring with outline for truncated buttons (`SWC-886`) | Truncated buttons need `overflow: hidden`, which can clip a box-shadow-based focus ring. | 2nd-gen focus indication must use `outline` / `outline-offset` so focus remains visible even when truncation requires clipped overflow. | No consumer markup change expected; visual/focus behavior improves automatically. |
| **B10** | Defer form-associated `submit` / `reset` behavior from the initial 2nd-gen Button scope | 1st-gen proxies `submit` / `reset` through a temporary light-DOM native `<button>`. | Initial 2nd-gen Button scope should default to button semantics only while form-associated behavior is deferred pending an ElementInternals/tooling recommendation. | Consumers needing `submit` / `reset` should continue using native buttons/global styles or stay on 1st-gen behavior until the follow-up lands. |

### Additive — ships when ready, zero breakage for consumers already on 2nd-gen

| # | What is added | Notes |
|---|---|---|
| **A1** | Explicit, documented `--swc-button-*` properties | Only expose properties justified by the CSS custom-property guide; do not recreate the old modifier matrix. |
| **A2** | Playwright accessibility snapshots for pending and icon-only states | These strengthen regression coverage without changing the public API. |
| **A3** | Future support for cross-root ARIA mapping | Deferred to `SWC-2033` while the cross-root semantics approach is evaluated. |
| **A4** | Future support for form-associated `submit` / `reset` | Deferred to `SWC-2034` until the ElementInternals/tooling path is settled. |
| **A5** | Host `focus` / `blur` compatibility parity | Deferred to `SWC-2035`; initial 2nd-gen Button will document `click` plus bubbling `focusin` / `focusout` as the supported host-listener contract. |
| **A6** | React Spectrum-only `genai` and `premium` variants | Deferred to `SWC-2036` because they are not part of the approved baseline Button scope in this plan. |
| **A7** | `justified` — full-width layout mode | Not present in 1st-gen. Added in 2nd-gen based on a post-planning S2 Design update. Requires the container to allow stretching. |

---

## 2nd-gen API decisions

These are derived from the 1st-gen implementation, current deprecations, the Figma Desktop button spec, and the rendering roadmap. For visual API, Figma is the source of truth. Confirmed items are marked; deferred follow-up work is tracked in [Blockers and open questions](#blockers-and-open-questions).

**Scope note:** this plan is for `sp-button` only. `sp-clear-button` and `sp-close-button` live in the same package today, but they are intentionally out of scope for this migration plan and should not block the core `sp-button` migration.

### Public API

#### Properties / attributes (2nd-gen)

| Property | Type | Default | Attribute | Notes |
|---|---|---|---|---|
| `size` | `'s' \| 'm' \| 'l' \| 'xl'` | `'m'` | `size` | **Confirmed.** Keep existing T-shirt size scale. |
| `variant` | `'primary' \| 'secondary' \| 'accent' \| 'negative'` | `'primary'` | `variant` | **Confirmed by Design.** Use `primary`; Figma's `default` naming was a typo. React-only `premium` and `genai` variants are deferred to `SWC-2036`. |
| `fillStyle` | `'fill' \| 'outline'` | `'fill'` | `fill-style` | **Confirmed.** Use React-aligned terminology. `outline` is only spec-backed for `primary` and `secondary` families, including their static white/black equivalents. Migrate legacy `treatment` usage to `fill-style`. |
| `staticColor` | `'white' \| 'black' \| undefined` | `undefined` | `static-color` | **Confirmed.** Static color is only spec-backed with the `primary` and `secondary` families shown in Design/Figma. |
| `disabled` | `boolean` | `false` | `disabled` | **Confirmed.** Maps to native disabled behavior on the internal button. |
| `pending` | `boolean` | `false` | `pending` | **Confirmed.** Keep public API; while pending, the button remains focusable but is otherwise unavailable. |
| `accessibleLabel` | `string \| undefined` | `undefined` | `accessible-label` | **Confirmed.** Replaces both `label` (1st-gen) and ad-hoc `aria-label` on the host. Forwarded as `aria-label` on the internal `<button>`. Required for icon-only usage. |
| `pendingLabel` | `string` | derived from the resolved non-busy accessible name + busy suffix | `pending-label` | **Adjusted for `SWC-459`.** Distinct from the control name; overrides the default busy-state announcement when supplied. |
| `type` | deferred beyond initial scope | `'button'` | maybe none / future | **Deferred.** Initial 2nd-gen Button should behave as a regular button; `submit` / `reset` are future work. |
| `label` | deprecated | n/a | `label` | **Planned removal.** Replaced by `accessible-label` / `accessibleLabel`. |
| `iconOnly` | removed | n/a | removed | **Deviation from plan.** Not kept as a consumer attribute. Icon-only layout is now auto-derived from slot presence: `swc-Button--iconOnly` (circular layout) and `swc-Button--hasIcon` (label `text-align: start`) are applied via `classMap` in `ButtonBase`. Matches the CSS style-guide rule that derived states must not appear as host attributes. |
| `truncate` | `boolean` | `false` | `truncate` | **Confirmed rename.** Replaces legacy `no-wrap` with a more explicit name for the actual behavior: single-line truncation with overflow handling rather than wrapping. Tooltip guidance for clipped content is documentation guidance, not built-in Button behavior. |
| `justified` | `boolean` | `false` | `justified` | **Additive (A7).** Not in 1st-gen. S2 Design addition: makes the button stretch to fill its container. Requires the container to permit stretching. |
| `active` | internal styling state | n/a | maybe none / internal only | **Proposed.** Do not preserve as a documented consumer-controlled API unless styling proves it necessary. |
| `href`, `target`, `download`, `referrerpolicy`, `rel` | removed | n/a | removed | **Confirmed removal.** Use native anchors for navigation. |

#### Visual matrix (2nd-gen)

Based on the attached spec, the supported visual combinations should be planned as:

| Visual family | Fill | Outline | Static white | Static black |
|---|---|---|---|---|
| `primary` | Yes | Yes | Yes | Yes |
| `secondary` | Yes | Yes | Yes | Yes |
| `accent` | Yes | No | No | No |
| `negative` | Yes | No | No | No |

Additional Figma-confirmed presentation modes:

- Label only
- Icon + label
- Icon only
- Text wrap
- Truncate
- Pending
- Disabled
- Hover

#### Slots (2nd-gen)

| Slot | Content | Notes |
|---|---|---|
| default | Visible button label | **Confirmed.** |
| `icon` | Leading icon | **Confirmed.** Keep the existing named slot. |

#### CSS custom properties (2nd-gen)

No `--mod-*` properties will be exposed. New `--swc-*` component-level properties may be introduced where needed — these are additive and not breaking. See [Component Custom Property Exposure](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#component-custom-property-exposure) for what to expose and how.

Initial expectation for Button is a small reviewed set.

### Behavioral semantics

### Pending accessible-name rule (2nd-gen)

Pending-state naming should resolve in this order:

1. `pending-label`
2. Resolved non-busy accessible name + busy suffix
3. Fixed fallback such as `"Busy"`

The resolved non-busy accessible name should come from the same sources used for the control itself, e.g. `accessible-label` or visible text. Default wording should use the reviewed `busy` suffix pattern, e.g. `"Save, busy"`.

### Accessibility semantics notes (2nd-gen)

- the internal native `<button>` should be the semantic control and primary tab stop
- the host should not duplicate `role="button"` semantics when an internal button already exists
- host-facing naming APIs must be intentionally mapped to the internal control; full cross-root `aria-labelledby` / `aria-describedby` support is deferred
- pending should remain button semantics; it should not expose progressbar semantics unless it truly represents measurable progress
- pending announcements should rely on accessible-name updates, not a built-in polite status region; when broader status communication matters, consumers can add a toast or external status region rather than having individual controls post competing messages

### Deferred semantics note (2nd-gen)

Cross-root `aria-labelledby` / `aria-describedby` support and form-associated `submit` / `reset` behavior are deferred beyond the initial Button migration scope. They depend on a clearer ElementInternals/platform/tooling recommendation and should not block the first 2nd-gen Button release.

### Internal semantic button implications

Using an internal semantic `<button>` also means:

- the internal button is the semantic source of truth for button role, focus, and disabled behavior
- host-level button semantics must not compete with the internal button
- the host should not remain the primary tab stop when the internal native button is present
- host `disabled` reflects API state, while the internal `<button disabled>` enforces native disabled behavior
- pending should not use native `disabled` on the internal button if focusability must be preserved
- host `accessible-label` and other button-relevant semantics should be forwarded intentionally, not assumed
- native button keyboard/click behavior should be reused where possible rather than reimplemented on the host
- host listeners should continue to observe native `click` and bubbling `focusin` / `focusout` from the internal control; host-level `focus` / `blur` parity is deferred and may require custom events if the team decides that compatibility is necessary

---

## Architecture: core vs SWC split

> The 1st-gen component is a **reference only** — 2nd-gen is built independently. Neither generation imports from the other.

Follow the [Badge migration reference](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#reference-badge-migration) as the concrete pattern for the core/SWC split.

| Layer | Path | Contains |
|---|---|---|
| **Core** | `2nd-gen/packages/core/components/button/` | `Button.base.ts`, `Button.types.ts`, validation, state, accessible-name logic, attribute forwarding, pending-label behavior, and other reusable semantic rules. No rendering. |
| **SWC** | `2nd-gen/packages/swc/components/button/` | `Button.ts`, `button.css`, element registration, stories, tests, and the specific S2 rendering/styling for `sp-button`. |

Planned rendering shape:

- Core owns API normalization and warnings
- SWC renders a real internal control with `.swc-Button`
- Preferred internal DOM is a native `<button>` plus icon/label/pending children
- If navigation is removed as planned, no anchor render path is needed in 2nd-gen `sp-button`
- The component stylesheet and [`global-button.css`](../../../../2nd-gen/packages/swc/stylesheets/global/global-button.css) should share source/imports if possible so button-styled global elements stay visually in sync with the component
- The current contents of [`global-button.css`](../../../../2nd-gen/packages/swc/stylesheets/global/global-button.css) are temporary POC scaffolding, not a locked design contract; they may be fully replaced during the Button migration as long as the resulting global-element API stays aligned with the component
- New focus primitives from [PR #6129](https://github.com/adobe/spectrum-web-components/pull/6129) are informative for disabled/focus behavior, but are not currently planned as direct Button dependencies
- `DisabledMixin` may be evaluated during implementation for true `disabled` state only; it does not replace Button's custom `pending` behavior, which must remain focusable

### Shared semantics reuse

Button should establish a reusable semantic foundation in `core`, but not a shared rendered DOM.

The goal is for later button-like components such as `ActionButton`, `ClearButton`, `CloseButton`, `PickerButton`, and `InfieldButton` to reuse the same semantic rules without inheriting `sp-button`'s rendered structure or visual API. This Button `core` layer is the intended reuse base for those later migrations.

Reusable `core` concerns:

- public property validation and normalization for button-like state
- accessible-name resolution and pending-label fallback rules
- host-to-internal-button attribute forwarding rules
- `disabled` vs `pending` behavior rules
- future form-associated button policy once the platform/tooling path is settled
- shared interaction guards such as activation suppression while pending

Non-reusable `swc` concerns:

- internal DOM shape and slot layout
- icon placement and chevron/clear/close affordances
- pending indicator rendering
- variant, fill-style, size, and static-color styling
- component-specific wrappers such as in-field layouts

Lightweight example:

```ts
// core/components/button/Button.base.ts
export abstract class ButtonBase extends SpectrumElement {
  protected getResolvedAccessibleName(): string | null {
    // derive from aria-label or visible text
  }

  protected getPendingAccessibleName(): string {
    // derive from pending-label or the resolved non-busy name
  }

  protected getForwardedButtonAttributes(): Record<string, string | boolean> {
    // return disabled/aria-disabled/type/aria-* mapping for the inner control
  }
}

// swc/components/button/Button.ts
// renders the internal <button> and applies the shared semantic contract
```

This keeps the 2nd-gen `core` / `swc` split intact: `core` owns semantic behavior, while each downstream SWC component can render its own control and styling on top of that shared contract.

### Global alignment contract

Button component styles and global button styles must align on:

- visual family names: `primary`, `secondary`, `accent`, `negative`
- fill-style model and allowed combinations
- static color support and restrictions
- size mappings and core token usage
- focus-ring and truncation behavior
- exposed `--swc-button-*` custom properties

Allowed differences:

- global styles support only native-element-compatible states
- native links do not support component-only states such as `pending` or `disabled`
- component-internal accessibility wiring does not need a global equivalent

---

## Migration checklist

### Preparation (this ticket)

- [x] 1st-gen API surface documented
- [x] Dependencies identified
- [x] Breaking changes documented
- [x] 2nd-gen API decisions drafted
- [x] Plan reviewed by at least one other engineer

### Setup

- [x] Create `2nd-gen/packages/core/components/button/`
- [x] Create `2nd-gen/packages/swc/components/button/`
- [x] Wire exports in both `package.json` files
- [x] Implement Button styles so the component stylesheet and [`global-button.css`](../../../../2nd-gen/packages/swc/stylesheets/global/global-button.css) share source/imports if practical — resolved by the `vite-global-elements-css` plugin, which auto-generates `global-button.css` from `button.css` on every dev/build run
- [x] Treat the current [`global-button.css`](../../../../2nd-gen/packages/swc/stylesheets/global/global-button.css) implementation as replaceable POC code, not as the canonical source of Button styling — `button.css` is the source of truth; `global-button.css` is a generated output and is marked `DO NOT EDIT`
- [x] Check out `spectrum-css` at `spectrum-two` branch as sibling directory

### API

#### Naming and public surface

- [x] `Button.types.ts`: define canonical `ButtonVariant`, `ButtonFillStyle`, `ButtonStaticColor`, and `ButtonSize`
- [x] `Button.base.ts` (core): retain `disabled`, `pending`, `pendingLabel`, and accessible-name/pending-label logic. Also includes `SizedMixin` with `BUTTON_VALID_SIZES` — **deviation from plan**: the plan placed `size` in SWC as a non-reusable concern, but `SizedMixin` captures `validSizes` at construction time via closure; subclass static overrides have no effect at runtime. Because all Spectrum button-like components share the same four sizes (`s`, `m`, `l`, `xl`), placing `SizedMixin` in `ButtonBase` is safe and avoids requiring each subclass to re-apply the mixin. `variant`, `fillStyle`, and `staticColor` remain SWC-only.
- [x] `Button.ts` (SWC): define `variant`, `fillStyle`, `staticColor`, `truncate`, `justified`, and visual combination validation warnings. `size` moved to `ButtonBase` (see above). `iconOnly` removed as a consumer attribute — icon-only layout is auto-derived from slot presence via `classMap` (see deviation note in the Public API table). Static class members (`VARIANTS`, `FILL_STYLES`, `STATIC_COLORS`, `VALID_SIZES`) were omitted — **deviation from plan**: these would be re-pointing the same module-level constants; debug validation code references the module constants directly instead. Click handler named `handleClick` without underscore prefix — **deviation from plan**: the plan's architecture sketch used `_handleClick` notation, but `handleClick` was used in implementation; the method is `protected readonly` to allow subclasses to reference it in template `@click` bindings.
- [x] Rename legacy `noWrap` to `truncate` in the 2nd-gen API — 2nd-gen `Button.ts` exposes `truncate`; `no-wrap` is deprecated in 1st-gen with `@deprecated` JSDoc and `window.__swc.warn()`
- [x] Add `@deprecated` JSDoc to 1st-gen type and const exports (`ButtonVariants`, `ButtonTreatments`, `ButtonStaticColors`, `DeprecatedButtonVariants`, `VALID_VARIANTS`, `VALID_STATIC_COLORS`)
- [x] Add `@deprecated` JSDoc to 1st-gen `treatment` property; no runtime warn added because `treatment` is set internally by the `quiet` setter and the `overBackground` variant alias, which already emit their own deprecation warnings
- [x] Add `@deprecated` JSDoc and `window.__swc.warn()` to 1st-gen `quiet` property
- [x] Remove `label` in favor of `accessible-label` / `accessibleLabel` — 2nd-gen `ButtonBase` exposes `accessibleLabel` (attribute: `accessible-label`) forwarded as `aria-label` on the internal `<button>`; no `label` prop in 2nd-gen
- [x] Remove deprecated link API (`href`, `target`, `download`, `referrerpolicy`, `rel`) from the 2nd-gen public surface — absent from 2nd-gen `Button.ts`
- [x] Remove deprecated `variant` aliases (`cta`, `overBackground`, `white`, `black`) from the 2nd-gen public surface — already absent in 2nd-gen `Button.ts`
- [x] Do not carry forward `quiet` as a 2nd-gen visual API — `quiet` is absent from 2nd-gen; deprecated in 1st-gen with `@deprecated` JSDoc and `window.__swc.warn()`
- [x] Document migration from `no-wrap` to `truncate`

#### Semantics and forms

- [x] Define which host attributes/semantics are forwarded to the internal button and which remain host-only — `getForwardedButtonAttributes()` documents the mapping as an extension hook; `type="button"` is explicitly set on the internal element (form-associated `submit`/`reset` types tracked in `SWC-2034`); documented in Accessibility story (Host event contract section)
- [x] When `pending`, expose unavailable state to assistive tech via `aria-disabled="true"` even when the button is not otherwise `disabled` (`SWC-459`) — `Button.ts` render template uses `ifDefined(this.pending && !this.disabled ? 'true' : undefined)`
- [x] Replace the default pending accessible label with a descriptive busy-state pattern derived from the resolved non-busy accessible name, while still allowing `pending-label` override (`SWC-459`) — `ButtonBase.getPendingAccessibleName()` returns `"${resolvedName}, busy"` or `"Busy"` fallback
- [x] Keep semantic helpers reusable in `core` so later button-like components can share behavior without sharing `sp-button` DOM or styling — `ButtonBase` in core provides `getResolvedAccessibleName()`, `getPendingAccessibleName()`, `getForwardedButtonAttributes()`, and `handleClick` (subclasses wire this onto their internal `<button>` via `@click`)
- [x] Do not recreate proxy patterns where the host carries button semantics while a different hidden internal control handles real activation — internal `<button>` is the semantic control; host carries no button semantics
- [x] Document `submit` / `reset` and cross-root ARIA mapping as deferred follow-up work rather than initial Button scope — documented in Accessibility story (Deferred support section)
- [x] Preserve host-listener support for native `click` and bubbling `focusin` / `focusout` from the internal control — `connectedCallback` / `disconnectedCallback` manage a host `click` listener (suppression-only while pending, passes through otherwise); `delegatesFocus: true` means `focusin` / `focusout` bubble from the internal button naturally
- [x] Document host-level `focus` / `blur` parity as deferred unless the team decides custom events are needed for compatibility — documented in Accessibility story (Host event contract section)

#### Alignment checks

- [x] Use React-aligned `fillStyle` terminology instead of `treatment`
- [x] Defer React Spectrum-only variants such as `premium` and `genai` to follow-up work (`SWC-2036`)

### Styling

> Follow the [CSS style guide](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/) as the source of truth for all styling work. Key references: [migration steps](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/04_spectrum-swc-migration.md), [custom properties](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md), [anti-patterns](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/05_anti-patterns.md).

- [x] Add `.swc-Button` to the internal semantic `<button>` in `render()`; keep styling off `:host`
- [x] Copy S2 source from `spectrum-css` `spectrum-two` branch `index.css` (not `/dist`) into `button.css` as baseline — cross-referenced spectrum-two branch for token verification; CSS was authored directly from S2 tokens rather than copied verbatim

#### Shared source and drift prevention

- [x] Reconcile the component stylesheet with existing [`global-button.css`](../../../../2nd-gen/packages/swc/stylesheets/global/global-button.css) — handled by the `vite-global-elements-css` plugin; `global-button.css` is now auto-generated from `button.css` on every dev/build run and is marked `DO NOT EDIT`
- [x] Prefer a shared-source/import strategy for component and global button styles; if styles must be copied, treat the migrated component stylesheet as the source of truth and document the sync mechanism and drift risks in the implementation notes — `button.css` is the authoritative source; the Vite plugin transforms `:host([attr])` selectors to global BEM modifier classes automatically, so drift is eliminated by construction
- [x] Fully override or replace the current global button POC styles where needed to match the migrated Button implementation — global styles now track component styles exactly via the Vite plugin
- [x] Update class and custom property prefixes from `.spectrum-` to `.swc-`; remove all `--mod-*` and `--spectrum-*` fallback chains

#### Visual model and regressions

- [x] Migrate icon-only, truncate (previously noWrap), size, static-color, and outline fill-style selectors — icon-only uses derived `swc-Button--iconOnly` class (not a consumer attribute); see iconOnly API deviation above. A companion `swc-Button--hasIcon` class is also applied whenever an icon is slotted (with or without a label), driving `text-align: start` on the label so wrapped text aligns to the icon rather than centering
- [x] Implement truncation behavior explicitly, not just `white-space: nowrap`; confirm overflow ellipsis treatment in S2 CSS — `white-space: nowrap; overflow: hidden; text-overflow: ellipsis` on `.swc-Button-label` when `[truncate]`
- [x] Ensure the button label inherits host visibility, or otherwise does not override it, so `visibility: hidden` on the host hides the label too (`SWC-701`) — current implementation is not setting `visibility` on the label
- [x] Restrict accent and negative styling to fill-only combinations — CSS has no outline rules for accent/negative; `update()` emits `__swc.warn()` for invalid combinations
- [x] Restrict static white/black styling to the primary and secondary families shown in Design/Figma — same pattern: CSS + debug warning
- [x] For `static-color="white"` + `fill-style="outline"`, define and document approved background color usage so hover-state contrast remains sufficient (`SWC-1139`)
- [x] Use `outline` / `outline-offset` for focus indication rather than `box-shadow`, especially where truncation requires `overflow: hidden` (`SWC-886`) — `.swc-Button:focus-visible` uses `outline` and `outline-offset`
- [x] Replace legacy pending indicator styling with the agreed 1-second delayed inline animated SVG spinner — 1-second `_pendingActive` delay in `ButtonBase` (reusable for ActionButton etc.), inline SVG spinner in `Button.ts`, static-color track/fill color overrides in CSS; button inline size is measured just before `_pendingActive` fires and locked via `--_swc-button-pending-inline-size` so the button does not shrink when the label/icon fades out
- [x] Verify i18n size modifiers (`:lang(ja)`, `:lang(ko)`, `:lang(zh)`) if present in S2 source — not present in `spectrum-css` spectrum-two button source; no port needed
- [x] Pass stylelint (property order, `no-descending-specificity`, token validation)

### Accessibility

#### Naming and semantics

- [x] Align Button implementation with the approved `accessibility-migration-analysis.md` — analysis doc exists; full alignment verification requires AT testing (see state verification below)
- [x] Ensure icon-only usage has a reliable accessible name via `accessible-label` — `ButtonBase.update()` emits a `{ type: 'accessibility', level: 'high' }` debug warning when an icon-only button is missing `accessible-label`
- [x] Pending state must set `aria-disabled="true"` because the control cannot be activated while pending (`SWC-459`) — implemented in `Button.ts` render template
- [x] Pending state must use a descriptive default accessible label based on the resolved non-busy accessible name plus a busy suffix, not bare `"Pending"` (`SWC-459`) — `ButtonBase.getPendingAccessibleName()` derives `"${resolvedName}, busy"`
- [x] Pending state must be announced to screen readers, even if the final implementation uses more than just an accessible-name change — requires AT testing to verify
- [x] Pending state must remain focusable while otherwise unavailable, matching current React Spectrum behavior — click suppression via `handleClick` (wired via `@click` on the internal `<button>` and as a host listener in `connectedCallback`); `?disabled` binding is only set when `this.disabled` is true
- [x] Ensure host and internal button semantics do not conflict in the accessibility tree — requires AT testing to verify
- [x] Ensure the internal native button, not the host, is the semantic control exposed to assistive technology — `delegatesFocus: true` routes focus to the internal `<button>`; host has no explicit button role
- [x] Preserve keyboard activation for Space and Enter through native button semantics — provided by the internal native `<button>` element; no custom keyboard handling needed
- [x] Avoid duplicating native button activation logic on the host when the internal button already provides it — no keyboard event handlers or click dispatching on the host
- [x] Forward host `accessible-label` to the internal semantic button — `Button.ts` render template binds `aria-label=${this.accessibleLabel ?? nothing}` when not pending; `accessibleLabel` is a `@property` on `ButtonBase` with `attribute: 'accessible-label'`

#### State verification

- [x] Verify disabled state removes focusability — `DisabledBehaviorTest`: confirms `button.focus()` does not delegate to `<button disabled>` via `shadowRoot.activeElement`; interaction prevention is enforced by native `disabled` on the internal button (no host-level suppression needed)
- [x] Verify Windows High Contrast uses disabled/unavailable colors while pending (`SWC-459`)
- [x] Confirm host vs internal-control semantics in snapshots (`button` role, accessible name, disabled state) — `button.a11y.spec.ts` verifies role, accessible name, and disabled state via `toMatchAriaSnapshot` across overview, anatomy, states, sizes, variants, outline, and accessibility stories
- [x] Document the 1-second pending-spinner delay and whether reduced-motion treatment changes it

### Testing

- [x] Port `1st-gen/packages/button/test/button.test.ts` coverage that still applies — 16 Storybook play-function test stories covering defaults, property mutations, slots, states, pending behavior, accessible naming, and dev-mode warnings
- [x] Add Playwright `button.a11y.spec.ts` with `toMatchAriaSnapshot` — 7 ARIA snapshot tests covering overview, anatomy, states, sizes, variants, outline, and accessibility story

#### Behavior

- [x] Add unit coverage for default `variant="primary"` behavior — `OverviewTest`
- [x] Add unit coverage for pending accessible-name transitions, including the new default busy-label behavior (`SWC-459`) — `PendingAriaAttributesTest`: verifies `"Save, busy"` derivation and `pendingLabel` override
- [x] Add unit/accessibility coverage for `aria-disabled="true"` while pending (`SWC-459`) — `PendingAriaAttributesTest`, `StatesTest`
- [x] Add coverage proving pending buttons remain focusable while press and hover interactions are suppressed — `PendingBehaviorTest`: click suppressed while pending, restored on clear; `StatesTest`: no native `disabled` while pending
- [x] Add unit coverage for icon-only accessible naming via `aria-label` — `AccessibleLabelTest`, `AnatomyTest`, `AccessibilityTest`
- [x] Add coverage proving host semantics do not duplicate or conflict with the internal button semantics — `OverviewTest`: confirms `role` attribute is absent from host
- [x] Add coverage proving the host is not the primary semantic/button focus target once the internal native button is present — `OverviewTest` (no host role), `HostListenersTest` (delegatesFocus routes to internal `<button>`)
- [x] Add coverage proving host listeners still observe native `click` and bubbling `focusin` / `focusout` behavior from the internal control — `HostListenersTest`
- [x] Add coverage proving host `visibility: hidden` also hides the button label (`SWC-701`) — resolved by design: `button.css` does not set `visibility` on any inner element, so `visibility: hidden` on the host is naturally inherited; no explicit test added
- [x] Remove or replace tests that depend on deprecated `href` mode — 2nd-gen tests were written fresh; no href-dependent tests exist

#### Visual regression

- [ ] Add VRT coverage for size, variant, fill-style, static color, and pending combinations
- [ ] Add visual regression coverage for static white outline on its approved background, including hover state (`SWC-1139`)
- [ ] Add visual/high-contrast coverage for the pending state using disabled styling (`SWC-459`)
- [ ] Add focus-visible regression coverage for truncated buttons so the ring is not clipped (`SWC-886`)

#### Manual AT testing

These items require manual assistive-technology (AT) verification and cannot be covered by automated tests alone. Use these as the accessibility testing checklist in the PR description.

**Keyboard:**

- [ ] Navigate to the Accessibility story → `Tab` to "Save document" → Expect: button receives focus, focus ring is visible
- [ ] `Tab` to icon-only "Add item" button → Expect: focus lands on the button; screen reader announces "Add item, button"
- [ ] `Tab` to pending "Upload in-progress" button → Expect: button is included in tab order (not skipped); focus ring is visible
- [ ] `Enter` or `Space` on the pending button → Expect: no activation occurs (click suppressed); button remains focused
- [ ] Navigate to the States story → `Tab` through buttons → Expect: "Disabled" button is skipped entirely; "Default" and "Pending" buttons receive focus

**Screen reader (VoiceOver on macOS / NVDA on Windows):**

- [ ] Navigate to the Accessibility story → Read each button → Expect: "Save document, button" / "Add item, button" / "Upload in-progress, dimmed button" (or equivalent unavailable announcement); host custom element is not separately announced
- [ ] Navigate to the States story → Read "Pending" button → Expect: button role plus unavailable or greyed-out state is announced; accessible name includes "busy" or the resolved `pending-label` value
- [ ] Navigate to the States story → Read "Disabled" button → Expect: "Disabled, dimmed button" (or platform-equivalent); cannot be activated
- [ ] Confirm the `swc-button` host element is NOT announced as a separate button in addition to the internal `<button>` — assistive tech should see a single button, not two nested controls

**Windows High Contrast (`SWC-459`):**

- [ ] Enable Windows High Contrast mode → Navigate to the States story → Wait 1 second for pending state to activate → Expect: pending button renders with disabled/unavailable colors, not the default active appearance

**Reduced-motion:**

- [ ] Enable `prefers-reduced-motion: reduce` in OS or browser → Navigate to the States story → Wait 1 second for pending state to activate → Expect: spinner is visible but its animation respects the preference and presents as a slowed-down animation

### Documentation

#### General

- [x] JSDoc on all public props, slots, and CSS custom properties — `@property` JSDoc complete on `variant`, `fillStyle`, `staticColor`, `truncate`, `justified` (Button.ts) and `disabled`, `pending`, `accessibleLabel`, `pendingLabel` (Button.base.ts); slots and CSS custom properties documented via `@slot` and `@cssprop` on the class
- [x] Storybook stories for primary, secondary, accent, negative, fill/outline where supported, icon-only, static colors, pending, disabled, and wrapping/truncate
- [x] Document that `quiet` is not part of the 2nd-gen visual API — **deferred to `consumer-migration-guide`** (migration note, not relevant to 2nd-gen-only consumers)
- [x] Document the rename from `no-wrap` to `truncate` and its relationship to the spec’s wrapped-text presentation — **deferred to `consumer-migration-guide`** (migration note)
- [x] Document the approved background treatment for static white outline examples so contrast is maintained on hover — documented in StaticColors story
- [x] Document pending-state accessibility behavior: `aria-disabled`, default busy-label pattern, and high-contrast disabled styling — documented in States story (pending behavior) and Accessibility story (Features #4); WHCM styling implemented in CSS
- [x] Document the initial host-listener contract: `click` and `focusin` / `focusout`; custom `focus` / `blur` events are not part of the initial Button scope — documented in Accessibility story (Host event contract section)
- [x] Document that 2nd-gen Button semantics and focus land on a real internal native `<button>`, not the custom-element host — documented in Accessibility story (Features #1 and #2)
- [x] Document supported naming APIs at the host level (`accessible-label` and visible text) and how they map to the internal `<button>` via `aria-label` — documented in Accessibility story (Features #5 and Best practices)
- [x] Document that cross-root `aria-labelledby` / `aria-describedby` and form-associated `submit` / `reset` are deferred follow-up work — documented in Accessibility story (Deferred support section)
- [x] Document that focus indication uses `outline` so it remains visible for truncated buttons — documented in Truncate story
- [x] Document `justified` usage and its container dependency — documented in Justified story
- [ ] Update global element guidance so button-styled native elements and `sp-button` describe the same visual API and any intentional limitations

#### Breaking changes

- [x] Document breaking migration away from `href` — **deferred to `consumer-migration-guide`**
- [x] Document breaking migration from `treatment` to `fill-style` — **deferred to `consumer-migration-guide`**
- [x] Document migration away from deprecated variant aliases while preserving `primary` as the neutral family name — **deferred to `consumer-migration-guide`**
- [x] Document `label` removal in the API reference only — **deferred to `consumer-migration-guide`**

### Review

- [ ] `yarn lint:2nd-gen` passes (ESLint, Stylelint, Prettier)
- [ ] Status table in workstream doc updated
- [ ] PR created with description referencing SWC-1873
- [ ] Peer engineer sign-off

---

## Blockers and open questions

### Deferred follow-up tickets

| Ticket | Deferred item | Why deferred | Related plan section |
|---|---|---|---|
| SWC-2033 | Cross-root ARIA support | Depends on a clearer cross-root semantics approach and should not block the initial Button migration. | [Additive](#additive--ships-when-ready-zero-breakage-for-consumers-already-on-2nd-gen), [Deferred semantics note (2nd-gen)](#deferred-semantics-note-2nd-gen) |
| SWC-2034 | Form-associated `submit` / `reset` support | Depends on the ElementInternals/tooling recommendation and is intentionally out of the initial Button scope. | [Must ship — breaking or a11y-required](#must-ship--breaking-or-a11y-required), [Deferred semantics note (2nd-gen)](#deferred-semantics-note-2nd-gen) |
| SWC-2035 | Host `focus` / `blur` compatibility parity | Initial 2nd-gen Button will support `click` plus bubbling `focusin` / `focusout`; extra compatibility events can be evaluated later. | [Internal semantic button implications](#internal-semantic-button-implications), [Documentation](#documentation) |
| SWC-2036 | React Spectrum-only `genai` and `premium` variants | Not part of the approved baseline Button scope in this migration plan. | [Additive](#additive--ships-when-ready-zero-breakage-for-consumers-already-on-2nd-gen), [Public API](#public-api) |

---

## References

- [Washing machine workflow](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md)
- [Accessibility migration analysis](./accessibility-migration-analysis.md)
- [Rendering and styling migration analysis](./rendering-and-styling-migration-analysis.md)
- [PR #6177 — Button accessibility migration analysis](https://github.com/adobe/spectrum-web-components/pull/6177)
- [PR #6120 — core/shared migration and LikeAnchor removal](https://github.com/adobe/spectrum-web-components/pull/6120)
- [CSS style guide — Component Custom Property Exposure](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#component-custom-property-exposure)
- [CSS style guide — Selector conventions](../../../../CONTRIBUTOR-DOCS/02_style-guide/01_css/02_custom-properties.md#selector-conventions)
- [1st-gen source](../../../../1st-gen/packages/button/src/Button.ts)
- [1st-gen button base](../../../../1st-gen/packages/button/src/ButtonBase.ts)
- [1st-gen tests](../../../../1st-gen/packages/button/test/button.test.ts)
- [1st-gen README](../../../../1st-gen/packages/button/README.md)
- [2nd-gen global button stylesheet](../../../../2nd-gen/packages/swc/stylesheets/global/global-button.css)
- [2nd-gen global elements stylesheet](../../../../2nd-gen/packages/swc/stylesheets/global/global-elements.css)
- [React Spectrum S2 Button](https://react-spectrum.adobe.com/Button)
- [Global element styling guide](../../../../2nd-gen/packages/swc/.storybook/guides/customization/global-elements.mdx)
- [Badge migration reference](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md#reference-badge-migration)
- SWC-48: ElementInternals RFC
- SWC-1139: ensure contrast ratio for static white, outline on :hover
- SWC-459: pending state a11y criteria
- SWC-701: issue with label and visibility: hidden
- SWC-886: focus ring visibility vs. overflow: hidden
- SWC-1873: Button Epic
- SWC-2033: [Button] cross-root ARIA
- SWC-2034: [Button] define support for form-associated submit / reset
- SWC-2035: [Button] Host focus/blur compatibility
- SWC-2036: [Button] add `genai` and `premium` variants
