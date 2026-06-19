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

- `swc-close-button` should ship as a dedicated 2nd-gen SWC component extending `ButtonBase`, not as an extension point buried inside `swc-button`.
- API should align with modern button conventions: `accessible-label` (consumer-facing), `static-color`, and `size` (`s|m|l|xl`).
- 2nd-gen does not ship the 1st-gen `variant="white|black"` alias; use `static-color` only. Deprecation of `variant` is a 1st-gen (`sp-close-button`) concern.
- Styling source of truth is Spectrum CSS `spectrum-two` `components/closebutton`; 2nd-gen should not re-expose the 1st-gen `--mod-closebutton-*` surface.
- Accessibility is must-ship: real inner `<button type="button">`, delegated focus, mandatory discernible name, and keyboard parity for Enter/Space.

### Most blocking open questions

None at this time. [Q1](#architecture-and-behavior) (icon scale) is resolved: no `icon-size` attribute; scale follows `size`, with optional `--swc-close-button-icon-size` CSS override only.

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
2. Scaffold `swc-close-button` (reuse `ButtonBase` from core).
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
| B3 | Static color API cleanup | `variant="white|black"` and `static-color` both allowed on `sp-close-button` | `static-color` only on `swc-close-button`; `variant` attribute is not supported | Replace `variant` with `static-color` when migrating to 2nd-gen. |

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
| A1 | Optional icon-scale API (`icon-size`) | Resolved: no attribute; icon scale follows `size`. Consumers may override via `--swc-close-button-icon-size` only. |
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
| — | — | — | `variant` | **Removed in 2nd-gen.** Use `static-color` only. Deprecation and alias mapping belong on 1st-gen (`sp-close-button`) until that generation is retired. |

### Behavioral semantics

- Component must be a dismiss control, not a clear/reset control.
- Enter and Space activate like native button behavior.
- Focus-visible ring behavior must match S2 closebutton semantics including forced-colors compatibility.
- `pending` and `pending-label` are inherited from `ButtonBase` for now; the close-button SWC template does not implement pending visuals. When pending moves off `ButtonBase` (button pending-controller work), close-button should not need follow-up changes.

### Accessibility semantics notes (2nd-gen)

- Apply recommendations in `accessibility-migration-analysis.md` for role/name/keyboard/focus.
- Do not duplicate host `role="button"` if inner button is the real focus target.

---

## Architecture: core vs SWC split

- `core`: reuse `ButtonBase` for shared button semantics; close-button-specific API lives on the SWC class.
- `swc`: render template, CSS, element registration, stories, tests.
- Reuse `ButtonBase` for shared button semantics (accessible naming, disabled, sizing). Do not implement pending visuals on close-button; inherited pending host attributes are acceptable until pending moves off `ButtonBase`.

---

## Migration checklist

### Preparation (this ticket)
- [x] Accessibility migration analysis exists.
- [x] Rendering and styling migration analysis exists.
- [x] Migration plan exists and is reviewable.

### Setup
- [x] Reuse `ButtonBase` from core (no separate close-button core package).
- [x] Create `2nd-gen/packages/swc/components/close-button/`.
- [x] Wire exports and package entrypoints.

### API
- [x] Define `size`, `static-color`, `accessible-label`, `disabled`.
- [x] Omit `variant` from 2nd-gen public API (breaking change; use `static-color` only).

### Styling
- [x] Implement S2 closebutton selectors/tokens in SWC CSS.
- [x] Define minimal public `--swc-close-button-*` properties.

### Accessibility
- [x] Real inner button with delegated focus.
- [x] Discernible name enforcement/warnings.
- [x] Keyboard activation covered in Storybook tests (focus-visible polish deferred to styling phase).

### Testing
- [x] Unit tests for API and DOM contract (Storybook interaction tests on integration branch).
- [x] Playwright a11y snapshots and keyboard tests.
- [x] Storybook interaction coverage for API and accessibility contract.

### Documentation
- [x] Storybook docs complete.
- [x] Consumer migration guide reconciled to shipped API/CSS.
- [x] `@cssprop` docs match migration guide tables.

### Review
- [ ] Lint/tests/build pass.
- [x] Status doc updated.
- [x] Changeset included.
- [ ] Two reviewer sign-off.

---

## Blockers and open questions

### Design

| # | Item | Blocking? | Status | Owner |
| --- | --- | --- | --- | --- |
| Q0 | Visual sign-off sources are confirmed: [S2 Web Desktop scale (Figma)](https://www.figma.com/design/Mngz9H7WZLbrCvGQf3GnsY/S2---Web--Desktop-scale-?node-id=125265-577&t=99qlf018hYjRXRft-4), [S2 close-button anatomy](https://s2.spectrum.corp.adobe.com/page/close-button/#anatomy), and `spectrum-css` `spectrum-two` `components/closebutton/index.css` | No | Resolved | Design + implementation |

### Architecture and behavior

| # | Item | Blocking? | Status | Owner |
| --- | --- | --- | --- | --- |
| Q1 | Should `icon-size` be exposed in public API, or remain internal visual implementation detail? | No | Resolved — no `icon-size` attribute; scale follows `size` with optional `--swc-close-button-icon-size` CSS override | Design + implementation |

### Scope and prerequisites

| # | Item | Blocking? | Status | Owner |
| --- | --- | --- | --- | --- |
| Q2 | No additional scope or prerequisite blockers identified at this time. | No | Resolved | Ticket owner |

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
