<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Close Button / Close button migration plan

<!-- Document title (editable) -->

# Close button migration plan

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

> **Epic SWC-2087** · Planning output. Must be reviewed before implementation begins.

---

## TL;DR

- `swc-close-button` should ship as a dedicated 2nd-gen component in both `core` and `swc` layers, not as an extension point buried inside `swc-button`.
- API should align with modern button conventions: `accessible-label` (consumer-facing), `static-color`, and `size` (`s|m|l|xl`).
- Variant aliases from 1st-gen (`variant="white|black"`) should be deprecated in favor of `static-color`.
- Styling source of truth is Spectrum CSS `spectrum-two` `components/closebutton`; 2nd-gen should not re-expose the 1st-gen `--mod-closebutton-*` surface.
- Accessibility is must-ship: real inner `<button type="button">`, delegated focus, mandatory discernible name, and keyboard parity for Enter/Space.

### Most blocking open questions

- [Q2](#architecture-and-behavior): Confirm whether `icon-size` should be a public API in SWC or kept internal.

---

## 1st-gen API surface

**Source:** [`1st-gen/packages/button/src/CloseButton.ts`](../../../../1st-gen/packages/button/src/CloseButton.ts)
**Version:** `@spectrum-web-components/button@1.x`
**Custom element tag:** `sp-close-button`

### Properties / attributes

| Property | Type | Default | Attribute | Notes |
| --- | --- | --- | --- | --- |
| `size` | `'s' \| 'm' \| 'l' \| 'xl'` | no reflected default (`noDefaultSize`) | `size` | Visual default behaves as medium when omitted. |
| `variant` | `'white' \| 'black' \| ''` | `''` | `variant` | Legacy static-color alias. |
| `staticColor` | `'white' \| 'black' \| undefined` | `undefined` | `static-color` | Preferred static color signal in 1st-gen. |
| `label` | `string \| undefined` | `undefined` | `label` | Accessible name channel inherited from button base stack. |
| `disabled` | `boolean` | `false` | `disabled` | Inherited interaction state. |

### Methods

No close-button-specific public methods.

### Events

No close-button-specific custom events.

### Slots

| Slot | Content | Notes |
| --- | --- | --- |
| default | Accessible text label | Rendered in a visually hidden span next to the cross icon. |
| `icon` | Not consumer-authored | Internal cross icon is rendered by component code. |

### CSS custom properties

1st-gen styling depends on `--mod-closebutton-*` and related inherited `--mod-button-*` pass-throughs. This surface is not carried forward to 2nd-gen.

### Shadow DOM output (rendered HTML)

```html
<sp-icon-cross300 slot="icon" class="icon spectrum-UIIcon-Cross300"></sp-icon-cross300>
<span id="label" class="visually-hidden">
  <slot></slot>
</span>
```

---

## Dependencies

| Package | Version | Role |
| --- | --- | --- |
| `@spectrum-web-components/base` | 1st-gen | Sized mixin and template base |
| `@spectrum-web-components/button` | 1st-gen | `StyledButton`/`ButtonBase` inheritance |
| `@spectrum-web-components/close-button` | 1st-gen | Close button CSS bundle |
| `@spectrum-web-components/icons-ui` | 1st-gen | Cross icon set (200-500) |

---

## Migration sequencing and prerequisites

`close-button` should follow this order:

1. Finish this plan and rendering analysis.
2. Scaffold 2nd-gen `core` and `swc` close-button files.
3. Land API + accessibility behavior before visual parity.
4. Land S2 styling and then tests/docs.

Prerequisite dependency:

- `ButtonBase` behavior in 2nd-gen button stack should be treated as the contract baseline for focus, naming, and disabled semantics.

---

## Changes overview

### Must ship — breaking or a11y-required

#### API and naming

| # | What changes | 1st-gen behavior | 2nd-gen behavior | Consumer migration path |
| --- | --- | --- | --- | --- |
| B1 | Tag rename | `<sp-close-button>` | `<swc-close-button>` | Rename markup and import path. |
| B2 | Accessible name channel rename | `label` | `accessible-label` | Rename attribute/property and keep semantics identical. |
| B3 | Static color API cleanup | `variant="white|black"` and `static-color` both allowed | `static-color` is canonical; `variant` deprecated/removed | Replace `variant` with `static-color`. |

#### Styling and visuals

| # | What changes | 1st-gen behavior | 2nd-gen behavior | Consumer migration path |
| --- | --- | --- | --- | --- |
| B4 | Remove legacy modifier surface | `--mod-closebutton-*` overrides | Reviewed `--swc-close-button-*` only | Migrate to published 2nd-gen custom props. |
| B5 | S2 token parity | Legacy token references and class stack | S2 token mapping from `spectrum-two` closebutton CSS | Visual diff review against S2 resources. |

#### Accessibility and behavior

| # | What changes | 1st-gen behavior | 2nd-gen behavior | Consumer migration path |
| --- | --- | --- | --- | --- |
| B6 | Semantic button implementation | Host-level semantics from legacy stack | Real inner `<button type="button">` + delegated focus | No API change; update tests asserting internals. |
| B7 | Required discernible name | Can rely on hidden slot or label | Must always expose accessible name (`accessible-label` or slot text) | Ensure every usage has clear name text. |

### Additive — ships when ready, zero breakage for consumers already on 2nd-gen

| # | What is added | Notes |
| --- | --- | --- |
| A1 | Optional icon-scale API (`icon-size`) | Add only if design and implementation both require it. |
| A2 | Expanded public custom property set | Keep minimal initially; expand only for proven consumer needs. |

---

## 2nd-gen API decisions

### Public API

| Property | Type | Default | Attribute | Confidence |
| --- | --- | --- | --- | --- |
| `size` | `'s' \| 'm' \| 'l' \| 'xl'` | `'m'` | `size` | Confirmed |
| `staticColor` | `'white' \| 'black' \| undefined` | `undefined` | `static-color` | Confirmed |
| `accessibleLabel` | `string \| undefined` | `undefined` | `accessible-label` | Confirmed |
| `disabled` | `boolean` | `false` | `disabled` | Confirmed |

### Behavioral semantics

- Component must be a dismiss control, not a clear/reset control.
- Enter and Space activate like native button behavior.
- Focus-visible ring behavior must match S2 closebutton semantics including forced-colors compatibility.

### Accessibility semantics notes (2nd-gen)

- Apply recommendations in `accessibility-migration-analysis.md` for role/name/keyboard/focus.
- Do not duplicate host `role="button"` if inner button is the real focus target.

---

## Architecture: core vs SWC split

- `core`: `CloseButton.base.ts`, types, validations, semantic contracts.
- `swc`: render template, CSS, element registration, stories, tests.
- Reuse button-base patterns where possible, but keep close-button semantics distinct from clear-button.

---

## Migration checklist

### Preparation (this ticket)
- [x] Accessibility migration analysis exists.
- [x] Rendering and styling migration analysis exists.
- [x] Migration plan exists and is reviewable.

### Setup
- [ ] Create `2nd-gen/packages/core/components/close-button/`.
- [ ] Create `2nd-gen/packages/swc/components/close-button/`.
- [ ] Wire exports and package entrypoints.

### API
- [ ] Define `size`, `static-color`, `accessible-label`, `disabled`.
- [ ] Add deprecation strategy for `variant="white|black"`.

### Styling
- [ ] Implement S2 closebutton selectors/tokens in SWC CSS.
- [ ] Define minimal public `--swc-close-button-*` properties.

### Accessibility
- [ ] Real inner button with delegated focus.
- [ ] Discernible name enforcement/warnings.
- [ ] Keyboard and focus-visible parity.

### Testing
- [ ] Unit tests for API and DOM contract.
- [ ] Playwright a11y snapshots and keyboard tests.
- [ ] Storybook interaction coverage.

### Documentation
- [ ] Storybook docs complete.
- [ ] Consumer migration guide reconciled to shipped API/CSS.
- [ ] `@cssprop` docs match migration guide tables.

### Review
- [ ] Lint/tests/build pass.
- [ ] Status doc updated.
- [ ] Changeset included.
- [ ] Two reviewer sign-off.

---

## Blockers and open questions

### Design

- **Resolved:** Visual sign-off sources are confirmed:
  - [S2 Web Desktop scale (Figma)](https://www.figma.com/design/Mngz9H7WZLbrCvGQf3GnsY/S2---Web--Desktop-scale-?node-id=125265-577&t=99qlf018hYjRXRft-4)
  - [S2 close-button anatomy](https://s2.spectrum.corp.adobe.com/page/close-button/#anatomy)
  - `spectrum-css` `spectrum-two` `components/closebutton/index.css`

### Architecture and behavior

- **Q2:** Should `icon-size` be exposed in public API, or remain internal visual implementation detail?

### Scope and prerequisites

- No additional blockers currently.

---

## References

- [`1st-gen/packages/button/src/CloseButton.ts`](../../../../1st-gen/packages/button/src/CloseButton.ts)
- [`1st-gen/packages/button/test/close-button.test.ts`](../../../../1st-gen/packages/button/test/close-button.test.ts)
- [Close button accessibility migration analysis](./accessibility-migration-analysis.md)
- [Button migration plan](../button/migration-plan.md)
- [Button migration roadmap](../button/rendering-and-styling-migration-analysis.md)
- [S2 Web Desktop scale (Figma)](https://www.figma.com/design/Mngz9H7WZLbrCvGQf3GnsY/S2---Web--Desktop-scale-?node-id=125265-577&t=99qlf018hYjRXRft-4)
- [S2 close-button anatomy](https://s2.spectrum.corp.adobe.com/page/close-button/#anatomy)
- `spectrum-css` `spectrum-two` `components/closebutton/index.css`
- `spectrum-css` `spectrum-two` `components/closebutton/dist/metadata.json`
