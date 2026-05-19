<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Popover / Popover migration: research and thinking notes

<!-- Document title (editable) -->

# Popover migration: research and thinking notes

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Session decisions (resolved)](#session-decisions-resolved)
- [TL;DR of the situation](#tldr-of-the-situation)
- [What we confirmed from research](#what-we-confirmed-from-research)
    - [1st-gen state](#1st-gen-state)
    - [1st-gen consumers and how they use `<sp-popover>`](#1st-gen-consumers-and-how-they-use-sp-popover)
    - [1st-gen PlacementController](#1st-gen-placementcontroller)
    - [2nd-gen state](#2nd-gen-state)
    - [2nd-gen file layout convention (from Badge / Tabs)](#2nd-gen-file-layout-convention-from-badge--tabs)
- [How this lines up (and doesn't) with what was prompted](#how-this-lines-up-and-doesnt-with-what-was-prompted)
- [Architectural recommendations (for review)](#architectural-recommendations-for-review)
    - [Layered artifacts](#layered-artifacts)
    - [How first-party components reuse the machinery](#how-first-party-components-reuse-the-machinery)
    - [Reusable popover styles via `.swc-Popover` class](#reusable-popover-styles-via-swc-popover-class)
    - [Migration sequencing (revised)](#migration-sequencing-revised)
    - [Placement-property proxy pattern](#placement-property-proxy-pattern)
    - [`PlacementController` API (proposed)](#placementcontroller-api-proposed)
    - [`<swc-popover>` proposed API (first sketch — open for revision)](#swc-popover-proposed-api-first-sketch--open-for-revision)
    - [What the component does NOT do](#what-the-component-does-not-do)
    - [Trigger-side ARIA the host DOES wire](#trigger-side-aria-the-host-does-wire)
    - [Trigger-to-popover wiring: `for=` vs. native `popovertarget`](#trigger-to-popover-wiring-for-vs-native-popovertarget)
    - [Cross-shadow-root trigger resolution](#cross-shadow-root-trigger-resolution)
    - [Migration sequencing](#migration-sequencing)
- [Open questions to resolve before drafting the migration plan](#open-questions-to-resolve-before-drafting-the-migration-plan)
- [Comparison: 1st-gen → 2nd-gen API delta](#comparison-1st-gen--2nd-gen-api-delta)
- [Comparison: this plan vs. React Spectrum's `Popover`](#comparison-this-plan-vs-react-spectrums-popover)
- [Things I am explicitly NOT doing in this research](#things-i-am-explicitly-not-doing-in-this-research)
- [Source material consulted](#source-material-consulted)
- [Next actions](#next-actions)

</details>

<!-- Document content (editable) -->

> **Status:** Working notes; precedes `migration-plan.md`. Captures research findings, open architecture questions, and reasoning. Once decisions are confirmed they migrate into `migration-plan.md` (Phase 1 deliverable).
>
> **Companion documents:**
>
> - [Popover migration roadmap (rendering and styling analysis)](./rendering-and-styling-migration-analysis.md)
> - [Popover accessibility migration analysis](./accessibility-migration-analysis.md)
> - [Tooltip migration plan](../tooltip/migration-plan.md) (architectural reference)
> - [Overlay RFC](https://www.dropbox.com/scl/fi/eae4rywxitn4zfmuw4o59/RFC-Overlay-strategy-for-1st-gen-and-2nd-gen.paper) (parent strategy)

## Session decisions (resolved)

The following decisions were resolved during the kickoff discussion and are baked into the rest of this document.

| # | Decision | Resolution |
| --- | --- | --- |
| D1 | Component split — shared stylesheet + `<swc-popover>` host | **Two-artifact.** Shared popover stylesheet is published independently of the component for `<swc-dialog>` and customer use; `<swc-popover>` is the opinionated host. |
| D2 | Host behavior model | **Modal-only in v1**, backed by `<dialog>.showModal()` — focus trap + background inert + Escape. Picker, menu, action-menu, contextual-help open as modal. Aligns with React Spectrum (`isNonModal: false` default) and Spectrum guidelines. **Non-modal mode is deferred to additive (A1).** Originally scoped as a `non-modal` attribute, it lands when the first consumer needs it — likely the combobox migration (input must stay focusable) or submenu support in `<swc-menu-item>` (parent menu items must not be inerted). The v1 mixin is structured to accommodate the additive without refactoring the modal path. |
| D3 | Migration sequencing vs. `PlacementController` | **Wait for `PlacementController` extraction**, then ship `<swc-popover>` fully integrated in one PR. No consumer needs a styles-only popover host. |
| D4 | `[dialog]` host attribute carry-over | **Removed.** Consumers wanting dialog padding inside popover chrome use `<swc-dialog>` with the shared popover stylesheet applied to the dialog surface. |
| D5 | First-party light-DOM composition | **No composition.** Consumers do not wrap one 2nd-gen component in another to get popover behavior. They write `<swc-picker>...</swc-picker>`, `<swc-menu>...</swc-menu>`, `<swc-action-menu>...</swc-action-menu>`, etc., and each component brings its full popover behavior out of the box. `<swc-popover>` becomes a **customer-facing component** for external authors building custom popover surfaces. First-party components do not consume `<swc-popover>` in light DOM. |
| D6 | Internal reuse mechanism for first-party components | **Shared `PopoverMixin`** in `2nd-gen/packages/core/mixins/`. v1 bundles the `<dialog>.showModal()` lifecycle (modal-only), the `swc-*` lifecycle event dispatch, durable trigger-side ARIA wiring, and the integration point with `PlacementController`. `<swc-popover>` is one application of the mixin; `<swc-picker>`, dropdown-mode `<swc-menu>`, `<swc-action-menu>`, `<swc-contextual-help>`, `<swc-coachmark>`, and any other anchored modal pattern apply the same mixin on top of their existing base class. The non-modal `popover="auto"` lifecycle branch is **additive (A1 in migration plan)** and ships when the first consumer needs it (combobox-via-mixin would not be the path — combobox skips the mixin per D7; submenu support in `<swc-menu-item>` is the realistic trigger for A1). Combobox does not apply the mixin (D7). |
| D7 | Combobox internal architecture | **Skip the mixin.** Combobox uses the shared popover stylesheet on its listbox container + `PlacementController` directly. `<dialog>` semantics conflict with combobox's need to keep the `<input>` focusable while the popup is open. Matches React Aria's `isNonModal: true` for ComboBox. |
| D8 | Umbrella Epic | SWC-1993 (or one of the existing popover-roadmap tickets; to be confirmed). |
| D9 | `PlacementController` positioning library | **Floating UI for v1**, same as 1st-gen. CSS anchor positioning may revisit later as an additive optimization once Firefox stable support is uniform. No API surface impact on consumers either way. (Resolves Q9.) |

These decisions resolve Q1, Q2, Q3, Q4 from the original question list. Q5–Q10 remain open and are addressed below.

---

## TL;DR of the situation

1st-gen `<sp-popover>` is a **styles-only component** with no behavior. It renders a Spectrum-styled box with an optional CSS tip; all open/close/positioning/focus/dismissal is delegated to the 1st-gen `Overlay` system or the consumer.

The existing planning documents (`rendering-and-styling-migration-analysis.md`, `accessibility-migration-analysis.md`) describe a 2nd-gen split with two pieces:

1. **Shared popover styles** (visual layer) usable by any container, including `swc-dialog` surfaces that want Spectrum chrome.
2. **`<swc-popover>` positioning container** that wraps shared styles + anchored placement (Floating UI or CSS anchor positioning), but **no ARIA / focus / keyboard** of its own. ARIA stays the responsibility of its consumers (action-menu, combobox, contextual-help, tooltip in some configurations).

The user's framing in this session **expands** that scope: a more opinionated `<swc-popover>` that also brings **native top-layer behavior** (the browser popover API: `popover="auto"` light-dismiss, top-layer stacking, Escape handling) rather than leaving open/close mechanics entirely to the consumer. This matches the direction the Tooltip migration plan is already taking (`popover="auto"` host with `swc-*` lifecycle events).

This document reconciles those two framings and surfaces the decisions we need to make before drafting the formal Phase 1 plan.

---

## What we confirmed from research

### 1st-gen state

- **`Popover.ts` is ~75 lines.** Three reflected attributes (`open`, `placement`, `tip`), one slot, no methods, no events. Renders a `<slot>` plus an optional SVG tip. That is the entire component.
- **Styles** live in `popover.css` + `spectrum-popover.css` (Spectrum CSS import) + `popover-overrides.css`. The `[dialog]` host selector adds dialog-style padding for the "popover wraps an `sp-dialog`" pattern.
- **All behavior is external.** Open state is set by callers (usually `sp-overlay` or the `OverlayTrigger` directive). Positioning is computed by `PlacementController` inside `sp-overlay`, which then writes `style.translate`, `style.maxHeight/maxWidth`, and the `actual-placement` attribute back onto the `sp-popover` element.

### 1st-gen consumers and how they use `<sp-popover>`

| Consumer | Imports | Usage shape | Role assigned on popover |
| -------- | ------- | ----------- | ------------------------ |
| `action-bar` | static | Renders `<sp-popover>` to host action items (mobile/compact) | (none — wrapped by other ARIA) |
| `action-menu` | dynamic | Renders `<sp-popover>` as the dropdown surface; positioned via `sp-overlay` | `role="presentation"` |
| `card` | static (registration only) | Asset chrome; popover is used in detail surfaces | n/a |
| `coachmark` | imports `Popover` class for **extension** | `Coachmark extends Popover` — visually reuses the popover chrome wholesale | inherits |
| `combobox` | static | `<sp-popover>` as the listbox container (`role="presentation"`, hosts `<sp-menu role="listbox">`) | `role="presentation"` |
| `contextual-help` | dynamic | `<sp-popover class="popover" role="region">` for help content | `role="region"` |
| `menu` (submenu) | dynamic | `<sp-popover>` inside `<sp-overlay>` as submenu surface | (none) |
| `picker` | dynamic | `<sp-popover role="presentation">` hosts the listbox menu | `role="presentation"` |
| `slider` | static (registration only) | Used in slider handle popout | n/a |
| `tooltip` | static (registration only) | Was used via overlay composition; **2nd-gen tooltip drops this dependency** (see tooltip migration plan) | n/a |

**Pattern observation:** every consumer either sets `role="presentation"` (dropdown-style cases — picker, combobox, action-menu, menu) or sets a more specific role on the host (`role="region"` for contextual-help). Almost nobody uses `<sp-popover>` raw without overriding semantics — confirming the a11y analysis decision that the 2nd-gen host should have **no default role**.

### 1st-gen PlacementController

- Lives in `1st-gen/packages/overlay/src/PlacementController.ts` (~580 lines).
- Wraps Floating UI (`computePosition`, `offset`, `flip`, `shift`, `size`, `arrow`, `autoUpdate`).
- Computes positions for a `target` (the popover) relative to a `trigger`, writes `translate`/`maxWidth`/`maxHeight` to `target.style`, sets `actual-placement` on the target, and adjusts the tip element's position when an arrow is present.
- Has WebKit-specific compensation for visual-viewport offset (iOS top-layer rendering bug).
- Reads `host.elements` (the open overlay element list) — currently coupled to `Overlay`. To be extractable for 2nd-gen, this coupling has to go: the controller should take `trigger`, `target`, and `tipElement` directly via its API rather than reaching into a host that has `.elements`.

### 2nd-gen state

- **No 2nd-gen popover, overlay, dialog, modal, picker, combobox, action-menu, or contextual-help yet.** Migrated components so far are: accordion, asset, avatar, badge, button, color-loupe, divider, icon, illustrated-message, progress-circle, status-light, tabs, typography. None of them depend on popover behavior.
- **`2nd-gen/packages/core/controllers/`** currently contains only `focusgroup-navigation-controller` and `language-resolution`. No PlacementController, HoverController, or LongpressController has been extracted yet.
- **Status table** lists Popover at the Analyze phase only (the existing two analysis docs), every later phase blank. No prerequisite popover infrastructure has shipped.
- **Tooltip migration plan** (the closest analog) already commits to:
  - `popover="auto"` as the native open/close mechanism
  - new `swc-open` / `swc-after-open` / `swc-close` / `swc-after-close` event contract
  - additive integration of `PlacementController` + `HoverController` once they're extracted
  - explicit acceptance of `popover="auto"` auto-stack behavior as a known regression vs. 1st-gen `sp-overlay type="hint"` isolation

### 2nd-gen file layout convention (from Badge / Tabs)

| Layer | Path | Contents |
| ----- | ---- | -------- |
| **Core** | `2nd-gen/packages/core/components/popover/` | `Popover.base.ts` (abstract; shared API, valid placement set, state management, role assignment), `Popover.types.ts` (placement union, variant union, exported constants), `index.ts` |
| **SWC** | `2nd-gen/packages/swc/components/popover/` | `Popover.ts` (concrete subclass narrowing types), `swc-popover.ts` (define-element registration), `popover.css`, `stories/`, `test/`, `migration-guide.mdx`, `index.ts` |

Mixins live in `2nd-gen/packages/core/mixins/`; controllers live in `2nd-gen/packages/core/controllers/`. The `PlacementController` extraction would naturally land under `controllers/`.

---

## How this lines up (and doesn't) with what was prompted

The session-opening framing has three statements worth pulling apart:

> "It used to be a styles-only 'dumb' component that needed the Overlay to be used as an actual popover."

✅ Accurate. `sp-popover` itself has no behavior; `sp-overlay` provides it.

> "In 2nd-gen I want to offer both reusable styles for customers and our own components that need it..."

✅ Already in the rendering analysis: "shared popover styles for any container that should look like a popover, including modal dialog surfaces."

> "...as well as a more opinionated Popover component that brings its own native functionality (native top-layer behaviour)."

⚠️ This is a **scope expansion** vs. the existing accessibility analysis. The a11y analysis currently says `<swc-popover>` is a **positioning container only** — it does NOT establish open/close, focus orchestration, or AT behavior; consumers do. Native top-layer behavior (the `popover` HTML attribute) is open/close + Escape + light-dismiss + top-layer stacking — that's behavior on the host.

**Reconciled direction (D2):** The opinionated host uses **`<dialog>.showModal()`** by default, not `popover="auto"`. The shift is driven by Spectrum 2 guidelines: picker, menu, action-menu, and contextual-help open as modal in 2nd-gen — focus moves into the surface and the rest of the page is inerted. This is a meaningful change from 1st-gen (where these patterns were non-modal) and the user has called out that it's intentional alignment with React Spectrum.

`popover="auto"` remains useful but as the **non-modal opt-out** path. The host accepts a `non-modal` attribute that switches the internal mechanism from `<dialog>.showModal()` to `popover="auto"`. Used by:

- **Submenus** rendered by `<swc-menu-item>` (modal would incorrectly inert the parent menu's items).
- **Any future consumer that needs the trigger to remain focusable** while the popup is open.

The original accessibility analysis decision ("no default `role`, no default ARIA, focus and keyboard owned by consumers") still mostly holds, but with two adjustments:

- The host element IS a `<dialog>` in modal mode. That implies a built-in `role="dialog"` on the dialog element. Consumers that want different content semantics inside (e.g., `role="listbox"` on the menu inside) override on the inner element, not the host. This matches the 1st-gen pattern where `<sp-popover role="presentation">` was overridden by consumers — but the override target moves down a level.
- Focus management: `<dialog>.showModal()` handles focus trap and Escape natively. Consumers still own the **initial focus placement** inside the dialog (e.g., picker moves focus to the selected menu item; combobox keeps focus on the input — though combobox isn't using the host anyway per D7). Auto-focus on the first focusable element (the `<dialog>` default) is overridable via `autofocus` on a child or by handling the `show` event.

**Implications worth surfacing:**

- **Combobox does not use `<swc-popover>` as a host.** Combobox's listbox popup must keep the `<input>` focusable while the listbox is open. `<dialog>.showModal()` would inert the input. Combobox composes the shared popover stylesheet on its listbox container and reaches `PlacementController` directly. (D7.)
- **No auto-stack regression for the modal path.** `<dialog>.showModal()` stacks via the browser top layer but doesn't auto-close siblings the way `popover="auto"` does. The auto-stack concern from the Tooltip plan applies only to the `non-modal` opt-out path (submenus and similar) and to the Tooltip component itself.
- **iOS Safari `<dialog>.showModal()` performance.** Per the Overlay RFC, `<dialog>.showModal()` was historically avoided because of inert-propagation cost on Express-scale DOMs. The RFC notes that Express stays on 1st-gen Overlay as an external consumer, removing that constraint. Still, the migration plan should call out a benchmark step on representative 2nd-gen DOMs before this lands.
- **`<swc-menu>` composition (D5).** `<swc-menu>` provides listbox/menu semantics only. Consumers wrap with `<swc-popover>` for anchored placement + modal behavior. `<swc-menu>` standalone (not anchored to a trigger) does not need popover behavior at all, which keeps it clean.

---

## Architectural recommendations (for review)

### Layered artifacts

| Artifact | Purpose | Audience |
| -------- | ------- | -------- |
| **`PlacementController`** (`2nd-gen/packages/core/controllers/placement-controller/`) | Floating UI wrapper. Anchor positioning, flip, shift, size, arrow. Decoupled from any specific host: takes `trigger`, `target`, `tipElement`, and options. | `PopoverMixin`, `<swc-tooltip>` (additive phase), combobox direct use, any future anchored UI. |
| **Component stylesheet `popover.css`** (`2nd-gen/packages/swc/components/popover/popover.css`) | The component's visual layer, authored with `.swc-Popover` BEM-ish class selectors on an internal element. Consumed by the component shadow root, by every `PopoverMixin`-using first-party component (via adopted constructed stylesheets or by composing the same internal class structure), and by the auto-generated global CSS distribution below. | Component implementation — internal. |
| **Auto-generated global CSS `global-popover.css`** (`2nd-gen/packages/swc/stylesheets/global/global-popover.css`, emitted by the existing `vite-global-elements-css` plugin) | Class-based, light-DOM distribution of the same rules. Wrapped in `@layer swc-global-elements` so it integrates with the project's cascade strategy. Customers `@import` it (or include the swc global CSS bundle) and apply `.swc-Popover` on any element. **This is the "reusable popover styles" surface.** | External authors who want Spectrum popover chrome on their own markup; `<swc-dialog>` if it adopts popover chrome via the class; design-tool consumers that don't ship custom elements. |
| **`PopoverMixin`** (`2nd-gen/packages/core/mixins/`) — **new in 2nd-gen** | v1 bundles `<dialog>.showModal()` lifecycle (modal-only), `swc-*` event dispatch (`swc-open`, `swc-after-open`, `swc-close`, `swc-after-close`), durable trigger-side ARIA wiring, and `PlacementController` integration when a trigger is set. Reads `open` / `placement` / `offset` / `cross-offset` / `container-padding` / `should-flip` / `for` / `trigger-element` properties from the host class. The `popover="auto"` lifecycle branch is **additive (A1 in the migration plan)** — added when the first consumer needs it. | Applied by `<swc-popover>` and by every first-party component that needs anchored popover behavior (picker, action-menu, dropdown-mode menu, contextual-help, coachmark). Submenus depend on the A1 additive. |
| **`<swc-popover>` component** | Customer-facing popover surface. `PopoverMixin` applied on top of `SpectrumElement`; adopts `popover.css`; default slot for content. No first-party light-DOM consumer (D5). | External authors building custom anchored popover patterns; future internal use cases that don't fit any of the named first-party patterns. |

### How first-party components reuse the machinery

Each first-party component is **self-contained** in its consumer-facing API — `<swc-picker>`, `<swc-menu>`, `<swc-action-menu>`, `<swc-contextual-help>`, `<swc-coachmark>` are dropped in by themselves and bring popover behavior out of the box. Internally they share the same primitives:

| Component | Mixin applied | Stylesheet adopted | Notes |
| --------- | ------------- | ------------------ | ----- |
| `<swc-popover>` | `PopoverMixin` | Shared popover stylesheet | The customer-facing component. Modal by default. |
| `<swc-picker>` (future) | `PopoverMixin` | Shared popover stylesheet on its listbox surface | Modal. Trigger button + menu surface in one component. |
| `<swc-menu>` (dropdown mode, future) | `PopoverMixin` | Shared popover stylesheet | Modal. See open Q5 — whether `<swc-menu>` covers both static-listbox and dropdown cases via a flag, or whether a separate "always-visible listbox" component exists, is the menu migration's call. |
| `<swc-menu-item>` submenu (future) | `PopoverMixin` with `non-modal` flag set | Shared popover stylesheet | Non-modal so the parent menu's items are not inerted. **Depends on additive A1 (non-modal mode) landing first.** Submenu support cannot ship in `<swc-menu>` migration until `PopoverMixin` has the non-modal lifecycle branch. |
| `<swc-action-menu>` (future) | `PopoverMixin` | Shared popover stylesheet on its menu surface | Modal. |
| `<swc-contextual-help>` (future) | `PopoverMixin` | Shared popover stylesheet | Modal. |
| `<swc-coachmark>` (future) | TBD — `PopoverMixin` if modal aligns with coachmark UX, otherwise compose `PlacementController` + stylesheet directly | Shared popover stylesheet | Q8 (deferred to coachmark migration). |
| `<swc-tooltip>` | Does NOT use `PopoverMixin`. Uses `popover="auto"` directly with its own `swc-*` event dispatch already specified in the tooltip migration plan. | Tooltip has its own stylesheet | Tooltip's `popover="auto"` is hardcoded; it is never modal. If `PopoverMixin` is built carefully, tooltip could eventually adopt it for the non-modal lifecycle and the `PlacementController` hookup, but the migration plan ships before the mixin and the patterns differ. |
| `<swc-combobox>` (future) | Does NOT use `PopoverMixin` (D7). Uses `PlacementController` and the shared stylesheet directly on its internal listbox. | Shared popover stylesheet | Combobox cannot use `<dialog>` — would inert the `<input>`. |

Two implications worth calling out:

- **`PopoverMixin` is the cross-component code-reuse vehicle.** It is the thing that makes the "everything out of the box" promise scalable. Without it, every component would re-implement `<dialog>` lifecycle, event dispatch, and controller wiring. With it, those concerns are written once.
- **`<swc-popover>` is no longer the lynchpin of the first-party ecosystem.** It is one of several components built on the same internal primitives. It exists for customers, not for first-party reuse. This is a real demotion vs. what the existing roadmap implies (where `<swc-popover>` was the planned host for action-menu, combobox, contextual-help, etc.).

### Reusable popover styles via `.swc-Popover` class

The "reusable styles for customers" promise from the kickoff is fulfilled by the same mechanism every other 2nd-gen component already uses. No bespoke design work is needed — the `vite-global-elements-css` plugin emits a class-based version of the component CSS for free.

**How it works for popover specifically:**

1. `popover.css` is authored in the standard 2nd-gen style: rules target a `.swc-Popover` class on an internal element, not `:host`. Modifiers follow BEM-ish convention (`.swc-Popover--<modifier>`, `.swc-Popover-<element>`):

    ```css
    .swc-Popover {
      /* base chrome: border, shadow, radius, background, padding */
    }
    .swc-Popover-tip {
      /* the SVG tip element styles */
    }
    .swc-Popover--top { /* placement modifier — tip orientation */ }
    .swc-Popover--bottom { /* ... */ }
    /* etc. for each placement */
    ```

2. The component renders an internal `<div class="swc-Popover">` (with placement modifier classes set reactively from the `placement` property) in its shadow root. `popover.css` is adopted as a constructed stylesheet.

3. The `vite-global-elements-css` plugin reads `popover.css` and emits `2nd-gen/packages/swc/stylesheets/global/global-popover.css` wrapped in `@layer swc-global-elements { … }`. This file is part of the swc package's CSS distribution.

4. Consumers who want the chrome without the component:

    ```html
    <link rel="stylesheet" href="@spectrum-web-components/swc/stylesheets/global/global-popover.css" />

    <!-- or in JS: -->
    <script type="module">
      import '@spectrum-web-components/swc/stylesheets/global/global-popover.css';
    </script>

    <div class="swc-Popover swc-Popover--top" role="dialog" aria-labelledby="my-title">
      <h2 id="my-title">Custom popover-styled surface</h2>
      <p>Authored without using &lt;swc-popover&gt;.</p>
    </div>
    ```

5. The `@layer swc-global-elements` wrap means consumer overrides (unlayered or in a later layer) win without `!important` shenanigans. This is consistent with how `.swc-Button`, `.swc-Badge`, etc. are already distributed.

**`@global-exclude` regions:**

Some rules belong in the component shadow root only, not in the class distribution:

- Modal-specific styling on the host element (e.g., styles tied to the `<dialog>` host's open state, backdrop styling that the customer might not want)
- Component-internal animations that depend on JS lifecycle (e.g., a `swc-* ` event-driven animation, similar to button's pending-spinner exclusion)
- `:host([…])` selectors that only make sense for the custom element

These regions are bracketed in `popover.css` with the existing `/* @global-exclude */ … /* @global-exclude-end */` markers and dropped from `global-popover.css`. The customer's class version stays clean.

**What customers get with `.swc-Popover` alone:**

- Border, drop shadow, background, padding, border radius — the full visual chrome
- Optional tip styles (`.swc-Popover-tip` + placement modifier) if the customer renders the SVG tip
- Forced-colors mode handling (`forced-colors` media query rules pass through)
- RTL handling (logical placement classes work the same in the class distribution)

**What customers do NOT get:**

- Open/close behavior — that's the component, not the styles
- Anchored positioning — that's `PlacementController`, which is JS, not CSS
- ARIA wiring — customer markup owns its own ARIA
- The `<dialog>` modal mode — `.swc-Popover` is just chrome; if a customer wants modal behavior, they use `<dialog>` or `<swc-dialog>` and apply the class to the dialog surface

The customer-facing distribution story for "I want popover-shaped styling" is therefore: **import `global-popover.css`, slap `.swc-Popover` on your container.** It's intentionally a separate decision from "I want a working popover component", which is `<swc-popover>` with all its behavior.

### Migration sequencing (revised)

The "wait for `PlacementController`" decision (D3) is unchanged, but the surrounding work needs sequencing:

1. **`PlacementController` extraction** — prerequisite. Lands in `2nd-gen/packages/core/controllers/placement-controller/`. Test harness covers anchored placement + flip + shift + size + arrow on a synthetic trigger/target pair. Used directly by combobox (eventually) and by `PopoverMixin`.
2. **Shared popover stylesheet** — can land alongside, or slightly before, `<swc-popover>`. Authored on the canonical SWC stylesheet pattern used by `global-button.css` etc.
3. **`PopoverMixin`** — depends on `PlacementController`. Lands in `2nd-gen/packages/core/mixins/`. Independently testable on a minimal host element.
4. **`<swc-popover>` component** — first concrete application of `PopoverMixin`. The migration plan being drafted next.
5. **`<swc-menu>` migration** — applies `PopoverMixin` to its dropdown surface. The user's next migration after popover.
6. **`<swc-picker>`, `<swc-action-menu>`, etc.** — subsequent migrations, each applying `PopoverMixin`.

Steps 1–4 can be the same PR or split. My recommendation is to ship the controller + mixin in the popover PR, since they have no independent consumer until then. This keeps the surface area of the PR honest: it's "popover migration" but the deliverables are the three primitives that future components need.

### Placement-property proxy pattern

Internally, `PopoverMixin` accepts the **full placement union** that `PlacementController` understands. First-party components do NOT expose that full union — each component re-declares the `placement` property with a narrower type that reflects the placements its pattern actually supports.

This is the same pattern Badge uses today for `variant`: `BadgeBase` declares the broad union, and each concrete subclass redeclares with its narrower set (S1 vs S2 variants) plus a static `VARIANTS` array used for runtime validation in `update()`.

**Narrowing matrix (illustrative; final values belong to each component's own migration plan):**

| Component | Placements typically exposed | Rationale |
| --------- | ---------------------------- | --------- |
| `<swc-popover>` (customer-facing) | All 18 (12 physical + 6 logical) | The most permissive surface — customers compose their own patterns. |
| `<swc-tooltip>` | All 18 | Confirmed in tooltip migration plan. |
| `<swc-picker>` | `bottom-start`, `bottom-end`, `top-start`, `top-end` (and possibly the bare `bottom` / `top`) | Selects open vertically; horizontal alignment is the only meaningful variation. React Spectrum default is `bottom`. |
| `<swc-action-menu>` | Similar to Picker | Dropdown menu pattern. |
| `<swc-menu>` (dropdown mode, if separate from picker) | Same as picker | |
| `<swc-menu-item>` submenu | `end` / `start` | Submenus flow horizontally. Logical only — RTL must work out of the box. |
| `<swc-contextual-help>` | All cardinal directions (`top`, `right`, `bottom`, `left`) + start/end variants | Help can appear anywhere relative to its trigger. |
| `<swc-coachmark>` | All 18 | Coachmarks point to arbitrary UI; full flexibility expected. |
| `<swc-combobox>` listbox surface | `bottom-start` only (combobox does not use `PopoverMixin`; it sets `PlacementController` options directly) | Combobox listbox always opens below the input. |

**Implementation pattern (TypeScript):**

```ts
// 2nd-gen/packages/core/controllers/placement-controller/types.ts
export const ALL_PLACEMENTS = [
  'top',
  'top-start',
  'top-end',
  'right',
  'right-start',
  'right-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'left',
  'left-start',
  'left-end',
  // Logical (RTL-aware)
  'start',
  'start-top',
  'start-bottom',
  'end',
  'end-top',
  'end-bottom',
] as const;
export type Placement = (typeof ALL_PLACEMENTS)[number];

// 2nd-gen/packages/core/mixins/popover-mixin.ts
export interface PopoverMixinInterface {
  placement: Placement; // broad — controller-level
  // ...
}

// 2nd-gen/packages/swc/components/picker/Picker.types.ts (example)
export const PICKER_VALID_PLACEMENTS = [
  'bottom-start',
  'bottom-end',
  'top-start',
  'top-end',
] as const satisfies readonly Placement[];
export type PickerPlacement = (typeof PICKER_VALID_PLACEMENTS)[number];

// Picker.base.ts
@property({ type: String, reflect: true })
public override placement: PickerPlacement = 'bottom-start';

protected override update(changed: PropertyValues) {
  if (window.__swc?.DEBUG) {
    if (!PICKER_VALID_PLACEMENTS.includes(this.placement as PickerPlacement)) {
      window.__swc.warn(
        this,
        `<${this.localName}> only supports placement values: ${PICKER_VALID_PLACEMENTS.join(', ')}`,
        'https://opensource.adobe.com/spectrum-web-components/components/picker/#placement',
        { issues: [...PICKER_VALID_PLACEMENTS] }
      );
    }
  }
  super.update(changed);
}
```

The narrowing is enforced **at the consumer-facing component level**, not inside `PopoverMixin`. The mixin trusts whatever placement string it receives and passes it through to the controller. The component validates before that. This keeps `PopoverMixin` reusable across consumers with different placement sets without forcing the mixin to know about each one.

Three implications:

1. **TypeScript prevents most misuse at authoring time.** Templates and programmatic property sets that violate the narrowed type fail at the type-check step, before runtime.
2. **Runtime validation logs a warning in dev** (mirroring Badge / `SizedMixin`). Invalid placements still pass through to the controller, which uses Floating UI's `flip` middleware to land somewhere sensible — graceful degradation rather than a crash.
3. **The Storybook stories for each component only show the placements it advertises.** No more "here's the full matrix, please ignore the half that don't apply to this component."

### `PlacementController` API (proposed)

Sketch only — final shape is the controller-extraction workstream's deliverable, but locking in the contract now lets `PopoverMixin` and the customer-facing `<swc-popover>` design proceed in parallel and gives downstream component migrations (menu, picker, combobox) a stable target.

**Goals carried over from 1st-gen:**

- Floating UI under the hood (`computePosition` + `offset` + `flip` + `shift` + `size` + `arrow` middleware)
- `autoUpdate` for ancestor / element resize and scroll
- WebKit visual-viewport compensation (iOS top-layer offset bug)
- `actual-placement` attribute on the target so CSS can flip the tip direction after `flip` reorients

**Goals new in 2nd-gen:**

- Decoupled from `Overlay` and `OverlayStack` — controller takes plain element references, not an `Overlay`-shaped host
- No `OverlayOptionsV1` carry-over: drop `notImmediatelyClosable`, `receivesFocus`, `type`, `abortPromise`, `delayed` (Overlay's concerns, not placement's)
- Explicit `crossOffset` instead of a `[mainAxis, crossAxis]` tuple
- Explicit `shouldFlip` / `containerPadding` / `arrowPadding` to match React Spectrum's `Popover` and `Overlay` props
- A callback hook for "actual placement computed" so the host doesn't have to scrape the `actual-placement` attribute back

**Options interface:**

```ts
import type { ReactiveController, ReactiveElement } from 'lit';

export interface PlacementOptions {
  /**
   * Preferred placement. The controller may select a different one via the
   * flip middleware when the preferred placement doesn't fit.
   */
  placement: Placement;

  /**
   * Main-axis offset in pixels (distance from the trigger along the placement
   * direction). React Spectrum default: 8.
   * @default 0
   */
  offset?: number;

  /**
   * Cross-axis offset in pixels (distance along the perpendicular axis,
   * useful for nudging start/end alignments).
   * @default 0
   */
  crossOffset?: number;

  /**
   * Padding from the viewport edge for the `shift` and `flip` middleware.
   * Effectively the minimum distance the popover is allowed to approach the
   * viewport edges. React Spectrum default: 12.
   * @default 8
   */
  containerPadding?: number;

  /**
   * Whether the `flip` middleware is allowed to flip the popover to the
   * opposite side when the preferred placement doesn't fit. Disable when
   * the host wants to force a placement.
   * @default true
   */
  shouldFlip?: boolean;

  /**
   * Padding for the `arrow` middleware — the minimum distance the tip is
   * allowed to approach the popover's corners. Ignored if `tipElement` is
   * not provided.
   * @default 8
   */
  arrowPadding?: number;

  /**
   * Floating UI position strategy. `'fixed'` is correct for top-layer
   * rendering (popover API and `<dialog>.showModal()`). `'absolute'` is
   * available for the rare in-flow popover.
   * @default 'fixed'
   */
  strategy?: 'fixed' | 'absolute';
}
```

**`VirtualTrigger` interface (carried over from 1st-gen, slimmed down):**

```ts
export interface VirtualTrigger {
  /**
   * A function returning the trigger's bounding rect. Used for "virtual"
   * triggers — point-in-page, selection range, canvas hit-test, etc.
   */
  getBoundingClientRect(): DOMRect;
  /**
   * Optional context element used by Floating UI for ancestor / scroll
   * detection. When omitted, the controller uses `document.documentElement`.
   */
  contextElement?: Element;
}
```

**Controller constructor and method surface:**

```ts
export interface PlacementHostConfig {
  /**
   * The popover surface element. Resolved each call so it can be in a
   * shadow root managed by the host or moved between renders.
   */
  target: () => HTMLElement | null;

  /**
   * The trigger element or virtual trigger. Returning null is allowed —
   * the controller no-ops until a trigger is provided.
   */
  trigger: () => HTMLElement | VirtualTrigger | null;

  /**
   * Optional tip / arrow element. When provided, the `arrow` middleware is
   * applied and the tip's position is written each compute.
   */
  tipElement?: () => HTMLElement | null;

  /**
   * Reactive placement options. The controller reads this each compute.
   */
  options: () => PlacementOptions;

  /**
   * Notification callback when the actually-applied placement changes
   * (e.g. after `flip` reorients). Defaults to writing the
   * `actual-placement` attribute on the target.
   */
  onPlacementChange?: (computed: { placement: Placement; constrained: boolean }) => void;
}

export class PlacementController implements ReactiveController {
  constructor(host: ReactiveElement, config: PlacementHostConfig);

  /**
   * Begin auto-updating placement. Idempotent — calling twice cleans up the
   * prior session first (the 1st-gen "rapid open" guard). Called by the
   * host when the popover opens.
   */
  start(): void;

  /**
   * Tear down listeners and stop auto-update. Called when the popover
   * closes or the host disconnects. Cleared style and the
   * `actual-placement` attribute are restored to the host's defaults.
   */
  stop(): void;

  /**
   * Force a single recompute. Useful after content-size changes that
   * `autoUpdate` doesn't catch (e.g. a child component finishes loading).
   */
  recompute(): void;

  /**
   * The most recently computed placement (after the flip middleware may
   * have reoriented the popover). Equal to `options().placement` until
   * the first compute.
   */
  readonly actualPlacement: Placement | null;

  /**
   * Whether the popover is currently constrained by viewport size (the
   * `size` middleware has clamped `maxWidth` / `maxHeight`). Used by the
   * host or styles that want to indicate a scroll affordance.
   */
  readonly isConstrained: boolean;

  // ReactiveController lifecycle — implemented internally:
  // hostConnected(), hostUpdated(), hostDisconnected()
}
```

**Mapping to Floating UI:**

| Controller option | Floating UI middleware |
| ----------------- | ---------------------- |
| `offset` + `crossOffset` | `offset({ mainAxis: offset, crossAxis: crossOffset })` |
| `shouldFlip: true` (default) | `flip({ padding: containerPadding })` |
| `shouldFlip: false` | omit `flip` |
| `containerPadding` | `shift({ padding: containerPadding })` and passed to `flip` and `size` |
| `arrowPadding` (when `tipElement` is provided) | `arrow({ element: tipElement, padding: arrowPadding })` |
| `placement` | `computePosition(trigger, target, { placement })` |
| `strategy` | `computePosition(trigger, target, { strategy })` |

`size` middleware is always applied and uses `containerPadding` so popovers respect viewport edges by default — the same behavior as 1st-gen, where it's also unconditional. We expose `containerPadding` (which controls `size`'s padding too) but do not expose a "skip `size`" option; if a consumer wants to opt out of viewport sizing, they would need a more invasive controller change, which we'd handle as a follow-up.

`autoUpdate` is wired internally with the same parameter splits as 1st-gen: an "ancestor resize → close" channel and a "scroll / element resize → recompute" channel. The "close on ancestor update" behavior in 1st-gen dispatched a `close` event on the target; in 2nd-gen, the host owns close behavior — the controller calls `onPlacementChange` with the new state but does not autonomously close. Whether the host treats an ancestor update as "close the popover" is the host's policy (e.g., picker on scroll-out-of-view), not the controller's.

**How `PopoverMixin` wires the controller:**

The mixin instantiates the controller once per host. The `trigger` resolver runs the `for=` / `trigger-element` resolution (see "Cross-shadow-root trigger resolution"); the `target` resolver returns the host (since the host IS the popover surface in modal mode, and the popover-attributed element in non-modal mode); the `tipElement` resolver returns the internal tip span if `tip` is set; the `options` resolver builds a `PlacementOptions` object from the host's reactive properties (`placement`, `offset`, `crossOffset`, `containerPadding`, `shouldFlip`, …). On `open` → `true`, the mixin calls `start()`; on `open` → `false`, `stop()`. `onPlacementChange` writes the `actual-placement` attribute and updates a host getter so CSS can flip the tip direction.

**API surface exposed through `PopoverMixin` (and downstream first-party components):**

| Property | Type | Default | Notes |
| -------- | ---- | ------- | ----- |
| `placement` | `Placement` (narrowed per component) | `'bottom'` for `<swc-popover>` (Q7); per-component for others | Reflected; passed straight to the controller. |
| `offset` | `number` | `0` (controller-aligned) | The first-party component may default differently — Tooltip plan calls out `7`; React Spectrum Popover uses `8`; Picker may default to `0`. Each component decides. |
| `cross-offset` | `number` | `0` | New name vs 1st-gen tuple. |
| `container-padding` | `number` | `8` | Distance from viewport edge. |
| `should-flip` | `boolean` | `true` | Reflects React Spectrum's default. Allow `should-flip="false"` for force-placement cases. |
| `tip-padding` (only on hosts that have a tip element) | `number` | `8` | Maps to `arrowPadding`. Reusable as `tipPadding` if we prefer. |

These attribute names follow the existing 2nd-gen kebab-case convention and align with React Spectrum prop names where the meanings match. Per-component, the narrowing pattern can also restrict which of these surface publicly — e.g., a `<swc-picker>` migration may decide to suppress `should-flip` (always flip) and `cross-offset` (never offset cross-axis), keeping the public API narrow.

### `<swc-popover>` proposed API (first sketch — open for revision)

| Property | Type | Default | Notes |
| -------- | ---- | ------- | ----- |
| `open` | `boolean` | `false` | Reflected. v1 modal-only: setter calls `internalDialog.showModal()` / `internalDialog.close()`. Non-modal mode (additive A1) adds the `popover="auto"` lifecycle branch later. |
| `placement` | `Placement` | `'bottom'` | All 12 physical + 6 logical placements (matching tooltip plan). `'bottom'` is React Spectrum's `Popover` default; revisit if Figma disagrees. |
| `tip` | `boolean` | `false` | Renders the directional tip element. Same shape as 1st-gen. |
| `offset` | `number` | `0` | Pass-through to `PlacementController`. React Spectrum default is `8`; revisit. |
| `cross-offset` | `number` | `0` | Pass-through to `PlacementController`. |
| `container-padding` | `number` | `8` | Pass-through. Distance from viewport edge for flip/shift middleware. |
| `should-flip` | `boolean` | `true` | Pass-through. |
| `tip-padding` | `number` | `8` | Maps to `PlacementController.arrowPadding` when the `arrow` middleware integration ships (A3). |
| `trigger-element` | `HTMLElement \| null` | `null` | Explicit trigger reference. Drives `PlacementController` anchor target. Use when the trigger cannot be referenced by `id`. |
| `for` | `string` | `undefined` | ID-lookup variant of `trigger-element` (`getRootNode().getElementById(this.for)`). Same authoring pattern as the tooltip plan. |

Slots: default only. Same as 1st-gen.

Events: `swc-open`, `swc-after-open`, `swc-close`, `swc-after-close` — same shape as tooltip plan. Dispatched from native lifecycle event listeners (`<dialog>` `close` and animation/transition end events in modal mode; `beforetoggle` + `transitionend` in non-modal mode), never from property setters, to keep timing consistent regardless of what caused the state change.

Default host semantics:

- **Modal mode (default):** the host element IS a `<dialog>`. It carries the browser-provided `role="dialog"` semantics. Focus trap and Escape come from `<dialog>.showModal()` natively. Consumers override AT-visible semantics on the inner content element (the listbox, the menu) — not on the host. This is a meaningful but deliberate change from the original a11y analysis (which assumed a role-free host).
- **Non-modal mode (`non-modal` attribute):** the host has `popover="auto"`, no `role` is set, no focus is trapped. Closest to the original a11y analysis's "positioning container only" model.
- No `tabindex` on the host in either mode.

The original accessibility-migration-analysis was written before D2 was confirmed. It assumes the host is role-free. After D2 it needs an addendum noting that the modal path carries a `<dialog>` `role="dialog"`. That edit is tracked in Q11.

### What the component does NOT do

- Does not implement extra Escape handling beyond what `<dialog>.showModal()` and `popover="auto"` provide natively.
- Does not provide combobox-style "input stays focusable" behavior. Combobox (D7) does not use this host.
- Does not load any controller eagerly. `PlacementController` is only instantiated when a `trigger-element` or `for` is set; otherwise the host is a styled container with no positioning logic.
- Does not set `aria-haspopup` on the trigger. `aria-haspopup` belongs to the pattern-specific component (`<swc-picker>` sets `aria-haspopup="listbox"` on its trigger; `<swc-action-menu>` sets `aria-haspopup="menu"`); the popover host is pattern-agnostic. The customer-facing `<swc-popover>` similarly does not set it — external authors wire `aria-haspopup` on their trigger to match their pattern.

### Trigger-side ARIA the host DOES wire

The host (and `PopoverMixin` for built-in cases) manages two ARIA attributes on the trigger element. **They have different durability semantics, which matters for spec compliance:**

| Attribute | Durability | Behavior |
| --------- | ---------- | -------- |
| `aria-controls` (same-root) / `ariaControlsElements` (cross-root) | **Durable.** Set as soon as `for=` / `trigger-element` resolves to a trigger; stays in place across open/close cycles; cleared only when the trigger is removed, `for=` is unset, or the popover is disconnected from the DOM. | Points to the popover's host. Same Baseline Apr-2025 ARIA-IDL surface the tooltip plan uses for `ariaDescribedByElements`. Per the ARIA spec, `aria-controls` represents a persistent control relationship — the trigger controls the popover whether or not it is currently visible. State is communicated by `aria-expanded`. (Historical Safari/VoiceOver concerns about over-announcing "popup" have largely resolved on modern Safari; durable wiring is the correct treatment.) |
| `aria-expanded` | **State-toggled but durable in presence.** Set to `"false"` when the trigger resolves; toggles to `"true"` on `open = true` and back to `"false"` on `open = false`. Never absent once a trigger is resolved. | Reflected attribute on the resolved interactive element. No cross-root concern. |

This split is intentional: `aria-controls` is the persistent relationship; `aria-expanded` is the state. Tooltips do it differently (`ariaDescribedByElements` is open-only because `aria-describedby` is supplementary content that only exists while the tooltip is visible); popovers do not.

For the `PopoverMixin`-using components (`<swc-picker>`, `<swc-action-menu>`, `<swc-menu>` dropdown, etc.), the trigger button lives in the same shadow root as the popover surface — no cross-root concern. ID-string `aria-controls` resolves correctly.

For the customer-facing `<swc-popover>` referenced via `for` / `trigger-element`, the trigger can be in any shadow root scope. The mixin resolves the trigger via `getRootNode().getElementById(this.for)` (same algorithm as the tooltip plan), discovers the inner `<button>` (open shadow root) when the trigger is a 2nd-gen component, and writes:

- `aria-controls` if the popover and trigger share a root; `aria-controlsElements = [popoverHost]` otherwise. Set durably on resolution.
- `aria-expanded` reflected attribute on the resolved interactive element (no cross-root concern; it's a reflected attribute on the same element).

This makes the customer-facing `<swc-popover>` a real component, not a passive styled box: drop it in, point `for=` at a trigger, set `open=true`, and the ARIA relationship is established correctly without consumer intervention.

### Trigger-to-popover wiring: `for=` vs. native `popovertarget`

Two attributes are in play for connecting a popover to its trigger. They are **complementary, not alternatives**.

| Attribute | Lives on | Solves | Works for | Source |
| --------- | -------- | ------ | --------- | ------ |
| `popovertarget` | The trigger element (`<button popovertarget="...">`) | Declarative open/close invocation: clicking the trigger opens the popover, the browser also wires its built-in `aria-expanded` / `aria-haspopup` / `aria-controls` semantics. | Non-modal hosts only. `<dialog>.showModal()` does not respond to `popovertarget`. | HTML standard; Baseline 2024. |
| `for="<id>"` (or the `trigger-element` setter) | The popover element (`<swc-popover for="trigger-id">`) | Popover-side trigger reference: the component resolves the trigger and writes our own `aria-expanded` / `aria-controls` (with inner-button resolution for 2nd-gen components), and passes the trigger to `PlacementController`. | Modal and non-modal modes uniformly. | SWC convention; mirrors the tooltip migration plan. |

**Recommendation: ship `for="<id>"` as the primary `<swc-popover>` API, and respect native `popovertarget` in non-modal mode for free.**

Reasoning:

1. **Modal is the default.** `popovertarget` does not open `<dialog>.showModal()`. The platform's modal-dialog equivalent (`commandfor` / `command="show-modal"`) is not yet Baseline. Making `popovertarget` the primary API would force inconsistent authoring across our own two modes.
2. **Cross-component consistency.** The tooltip migration plan establishes `for="<id>"` as the SWC pattern for trigger reference. The popover migration should not introduce a second pattern.
3. **`popovertarget` and `for=` solve different problems.** `popovertarget` is invocation; `for=` is identity. They can be used together with no conflict.

Practical authoring patterns (customer-facing `<swc-popover>`):

```html
<!-- Modal popover, programmatic open/close (default). -->
<button id="open-help" @click=${() => popover.open = true}>Help</button>
<swc-popover for="open-help" id="help-pop" placement="bottom">
  <h2>Help</h2>
  <p>…</p>
</swc-popover>

<!-- Non-modal popover, fully declarative invocation. -->
<button popovertarget="info-pop">Info</button>
<swc-popover non-modal for="info-pop"... id="info-pop" placement="bottom">
  Inline info content
</swc-popover>

<!-- Non-modal popover, declarative invocation, no `for=` (popovertarget alone). -->
<!-- Works, but ARIA wiring from the popover side is skipped because the popover
     does not know which element to reach back to. Browser still wires the
     trigger's invoker association internally — acceptable for simple cases. -->
<button popovertarget="basic-pop">Open</button>
<swc-popover non-modal id="basic-pop">Content</swc-popover>
```

For `PopoverMixin`-using first-party components (`<swc-picker>`, `<swc-action-menu>`, `<swc-menu>` dropdown, etc.), the trigger button is in the component's own shadow DOM. The mixin sets `aria-expanded` and `aria-controls` on that inner button directly; neither `for=` nor `popovertarget` is involved at the consumer-facing API level.

### Cross-shadow-root trigger resolution

Two separate concerns are easy to conflate. Keep them distinct.

1. **ID resolution is always same-root.** `for="<id>"` calls `getRootNode().getElementById(this.for)` — scoped to the popover's own tree. The element bearing that ID must live in the same root as the popover. There is no cross-root version of this; if the element you want to reference isn't in the same tree, `for=` is not the right tool — use `trigger-element` (setter) with a JS reference instead.
2. **ARIA wiring may be cross-root** even when ID resolution was same-root. If the resolved trigger is a 2nd-gen component, the inner interactive `<button>` lives inside the component's own shadow root. The popover then writes ARIA on the inner button — and that wiring crosses a shadow boundary. This is solved by using element-reference ARIA IDL (`aria-controlsElements`) instead of string attributes.

Once you separate "find the trigger" from "wire ARIA on the right element inside the trigger," the four scenarios collapse into a clean rule: **`for=` if the trigger is in your tree, `trigger-element` setter otherwise.** Inner-button discovery and ARIA wiring then proceed identically in both cases.

Four authoring scenarios determine which path applies:

**Scenario 1 — Popover and trigger share a root (most common; covers all `PopoverMixin` first-party use):**

`<swc-picker>` renders its trigger `<button>` and its popover surface in the same shadow root. `getRootNode().getElementById()` resolves the button directly. ARIA wiring is on the same node — both `aria-expanded` (reflected attribute) and `aria-controls` (ID-string attribute) work without any cross-root API. This is the cleanest case and is the only case `PopoverMixin` has to handle when used inside a first-party component.

```html
<!-- Customer authoring -->
<swc-picker label="Pick">…</swc-picker>

<!-- Inside <swc-picker> shadow root, simplified -->
#shadow-root (open)
  <button id="trigger" aria-expanded="false" aria-controls="surface">…</button>
  <div id="surface" role="dialog"><!-- popover surface --></div>
```

**Scenario 2 — Customer-facing `<swc-popover>` and its trigger both live in the customer's shadow root:**

```html
<my-component>
  #shadow-root (open)
    <button id="trigger">…</button>
    <swc-popover for="trigger" id="surface">…</swc-popover>
</my-component>
```

`<swc-popover>`'s `getRootNode()` returns `<my-component>`'s shadow root (since `<swc-popover>` is slotted into / placed into that root, not its own). `getElementById("trigger")` finds the button. ARIA wiring works exactly like Scenario 1. No cross-root concern.

**Scenario 3 — Trigger is a 2nd-gen component with an open shadow root containing an inner `<button>`:**

```html
<swc-button id="my-button">Open</swc-button>
<swc-popover for="my-button" id="surface">…</swc-popover>
```

`<swc-popover>` resolves `my-button` to the `<swc-button>` host (same document tree). It then **reaches into the host's open shadow root** to find the inner interactive element — `host.shadowRoot.querySelector('button')` — and wires ARIA on the inner `<button>`. This is the inner-button resolution pattern the tooltip migration plan documents and validates with NVDA / VoiceOver across Chrome / Firefox / Safari (Baseline Apr 2025 ARIA-IDL surface). The host element gets no ARIA; the inner button gets `aria-expanded` (reflected attribute on the inner button) and `aria-controlsElements = [popoverHost]` (IDL element reference, not the ID string, because the popover is in a different tree from the inner button).

Two reasons we use `aria-controlsElements` (the IDL property) instead of `aria-controls` (the string attribute) here:

1. The inner `<button>` is inside a shadow root. The popover host lives in the light DOM. A string `aria-controls="surface"` on the inner button cannot resolve across the shadow boundary — IDs are scoped to their root.
2. Element-reference ARIA properties (`aria-controlsElements`, `ariaDescribedByElements`, `ariaLabelledByElements`) explicitly support cross-root wiring. The same surface the tooltip plan adopts for `ariaDescribedByElements`.

**Scenario 4 — Trigger lives in a shadow root that the popover cannot reach (different component, closed shadow, or just not a same-root sibling):**

```html
<other-component>
  #shadow-root
    <button id="actual-trigger">Open</button>
</other-component>

<swc-popover for="actual-trigger">…</swc-popover>  <!-- ❌ does not resolve -->
```

`for="actual-trigger"` fails: the popover's `getRootNode()` (the document) does not contain that ID. The escape hatch is the **`trigger-element` setter**, which takes a direct element reference and bypasses ID resolution entirely:

```html
<swc-popover id="surface">…</swc-popover>
<script>
  const popover = document.getElementById('surface');
  popover.triggerElement = otherComponent.shadowRoot.getElementById('actual-trigger');
</script>
```

Once the element reference is set, the mixin runs the same inner-button resolution and ARIA-wiring path as Scenario 3 — uses `aria-controlsElements` if the popover and trigger are in different shadow roots, or the ID-string `aria-controls` if they share a root. Inner-button discovery checks for an open shadow root on the resolved element and uses `host.shadowRoot.querySelector('button')` when one exists.

When the trigger has a **closed** shadow root, `querySelector('button')` cannot reach inside. The mixin falls back to wiring ARIA on the trigger host element directly. SWC's own 2nd-gen components all use open shadow roots, so this fallback only matters for external triggers; document the limitation in the migration guide.

**Summary table:**

| Scenario | ID resolution? | Trigger reference API | ARIA wired on | ARIA mechanism |
| -------- | -------------- | --------------------- | ------------- | -------------- |
| 1: Both inside a `PopoverMixin` first-party component | Internal — same shadow root | None at the consumer API level | The inner trigger `<button>` | `aria-expanded` reflected; `aria-controls` ID string (same root) |
| 2: Customer's shadow contains both `<swc-popover>` and trigger | Same shadow root | `for="trigger-id"` | The trigger element | `aria-expanded` reflected; `aria-controls` ID string |
| 3: Trigger is a 2nd-gen component (open shadow root with inner `<button>`), in the same root as the popover | Same root — popover finds the host via the host's `id` | `for="trigger-host-id"` | The inner `<button>` inside the trigger's shadow root | `aria-expanded` reflected on the inner button (no cross-root issue for reflected attributes); `aria-controlsElements = [popoverHost]` (IDL element reference — cross-shadow ARIA) |
| 4a: Trigger is in a different tree from the popover (different component's shadow root, dynamically inserted, etc.) | Not applicable — `for=` cannot reach across roots | `popover.triggerElement = ref` (setter) | Inner button if open shadow exists; otherwise the trigger host | `aria-controlsElements` IDL property |
| 4b: Trigger has a closed shadow root | n/a | `popover.triggerElement = ref` (setter) | The trigger host (fallback — inner button not reachable) | `aria-controlsElements` IDL property |

**Rule of thumb authors can follow:**

- If you can put an `id` on the trigger element and place `<swc-popover for="that-id">` in the same tree, use `for=`. This covers the overwhelmingly common case, including any 2nd-gen component as the trigger.
- If the trigger lives in a different tree (cross-shadow, programmatic insertion, third-party widget), use `popover.triggerElement = ref` with a JS reference.
- You never write an `id` on the inner `<button>` and try to reference it cross-root — that doesn't work, and you don't need to: put the `id` on the host, and the popover handles inner-button discovery.

**Implementation note on `PopoverMixin`:**

The mixin's trigger-resolution and ARIA-wiring logic only needs to be exercised when applied to `<swc-popover>` itself, because that's the only application where the trigger is external to the host's own shadow root. For every first-party component that applies the mixin (`<swc-picker>`, `<swc-menu>` dropdown, `<swc-action-menu>`, etc.), the trigger lives in the component's own shadow root and the mixin takes the Scenario 1 fast path. This means the cross-root resolution code is contained — not paid for — by the first-party components.

### Migration sequencing

The tooltip plan establishes the precedent: a 2nd-gen component can ship in two passes — an "initial release" with native popover behavior and ARIA wiring, and an "additive" release that layers in controller-driven positioning and timing once the controllers exist.

For Popover, I think the same split applies, but the dependency graph is denser:

1. **Phase A — extract `PlacementController` to 2nd-gen core.** This is a prerequisite for both Tooltip's additive phase AND for Popover to be useful as a positioning host. It is the single biggest piece of shared work blocking the "first-party components stop depending on Overlay" goal.
2. **Phase B — ship `<swc-popover>` initial release.** Styles + `popover="auto"` + event lifecycle + ARIA-free host + `for`/`trigger-element` resolution. Positioning is **inactive** until Phase A lands — stories use inline styles or fixed positioning to demo. This is exactly what the tooltip plan does today.
3. **Phase C — integrate `PlacementController` into `<swc-popover>`.** This unblocks 2nd-gen action-menu / combobox / picker / contextual-help migrations.

If Phase A is done first (and it should be, per the Overlay RFC's Phase 1 — "extract `PlacementController` and use Menu as proof of concept"), Phases B and C can collapse into a single Popover migration PR. **My preference is to do exactly that:** wait for `PlacementController` to land, then ship `<swc-popover>` fully integrated in one shot. The tooltip-style "ship a placement-less skeleton first" pattern only makes sense if there's pressure to ship the host before the controller is ready. For Popover there is no consumer waiting on the styles-only version — all planned consumers (action-menu, combobox, picker, contextual-help) need positioning to be usable.

That said, the alternative — shipping the shared stylesheet immediately and the component once `PlacementController` is ready — has merit: it unblocks `<swc-dialog>` and any styles-only authoring use cases without waiting on controller extraction. Worth deciding deliberately.

---

## Open questions to resolve before drafting the migration plan

Q1–Q4 are resolved in the [Session decisions](#session-decisions-resolved) table at the top of this document. Remaining questions are listed below.

| # | Question | Why it matters | My recommendation |
| --- | -------- | -------------- | ----------------- |
| Q5 | **Submenu rendering details.** `<swc-menu-item>` renders `<swc-popover non-modal>` for nested menus (D6). Confirmed at the architecture level, but: who owns submenu open/close — the parent menu's roving-tabindex handler, or the submenu's own pointer/focus listeners? | Affects the API surface of `<swc-menu-item>` and how `<swc-popover non-modal>` is composed inside it. Out of scope for the popover migration plan itself, but the popover API must support whichever choice. | **Parent menu owns open/close** via setting `open` on the submenu popover. Mirrors React Aria's `SubmenuTrigger`. The popover API (`open` property, `swc-*` events) is sufficient for this; no extra surface needed. Final call belongs to the `<swc-menu>` migration. |
| Q6 | **`tip` element shape:** keep the SVG tip from 1st-gen, or move to a pure-CSS tip (clip-path, gradient, or CSS borders)? | Affects CSS complexity, RTL handling (SWC-917), and whether `PlacementController` needs `arrow` middleware. | Mirror tooltip plan: **CSS-centered tip on the placement edge, no arrow middleware required** when only physical placements are used. If sub-variants (`start`, `end`, `top-start`, etc.) need precise tip positioning per-trigger geometry, then `PlacementController` does need `arrow` middleware — that's the broader controller design decision, not just popover's. |
| Q7 | **Default placement value:** React Spectrum defaults `Popover` to `bottom`. 1st-gen defaults to `undefined` (no placement attribute, no CSS class applied — host renders unstyled-position). | A `bottom` default makes the component immediately usable but changes 1st-gen's "popover is just a styled box until you tell it where to go" mental model. | **Default to `bottom`** for parity with React Spectrum and to make the opinionated component obviously opinionated. Document the change. |
| Q8 | **Coachmark relationship:** 1st-gen `Coachmark extends Popover`. Does 2nd-gen `<swc-coachmark>` continue to extend? Compose? Duplicate? | Affects whether `<swc-popover>` is "extendable infrastructure" or "leaf component". | Defer to coachmark migration scope. The shared stylesheet gives coachmark a path that doesn't require inheritance and avoids dragging modal `<dialog>` semantics into a non-modal coachmark. |
| Q9 | **Floating UI vs. CSS anchor positioning** for `PlacementController`. | If CSS anchor positioning is sufficient, controller complexity drops dramatically; if not, we port the 1st-gen Floating UI implementation. CSS anchor positioning has uneven Firefox/Safari support as of 2026. | **Floating UI for v1.** Same as tooltip plan. Revisit CSS anchor positioning as an additive optimization later — no API surface difference visible to consumers. |
| Q10 | **Where does `PlacementController` live?** `2nd-gen/packages/core/controllers/`? Or `2nd-gen/packages/swc/controllers/`? | The controller is style-system-agnostic. | `2nd-gen/packages/core/controllers/placement-controller/`. Consumed by both `<swc-popover>` and `<swc-tooltip>` (when its additive phase ships) and by combobox directly (D7). |
| Q11 | **Accessibility analysis amendment.** The existing `accessibility-migration-analysis.md` was written before D2 and assumes a role-free host. Modal mode means the host is a `<dialog>` with browser-provided `role="dialog"`. | The migration plan needs to be internally consistent with the a11y analysis. | Once D2 is confirmed in this session, add an "Amendment for D2" section to `accessibility-migration-analysis.md` (or note the modal vs non-modal split inline). The original "no default ARIA" statement still holds for non-modal mode; modal mode opts into `<dialog>` semantics. |
| Q12 | **iOS Safari `<dialog>.showModal()` benchmark.** RFC flags `<dialog>.showModal()` performance on Express-scale DOMs as a historical concern. | Determines whether modal mode is shippable on the representative 2nd-gen consumer surfaces (target apps for the 2nd-gen migration). | **Run a benchmark step** during the implementation phase, before the Picker/Menu/ActionMenu migrations begin to consume `<swc-popover>`. Out of scope for Phase 1 but should be a named open task in the plan. |
| Q13 | **Initial focus inside the modal dialog.** `<dialog>.showModal()` auto-focuses the first focusable element by default. Picker wants to focus the selected menu item; menu wants the first menu item; contextual-help wants the dialog itself (so screen readers announce the heading). | Determines whether consumers need to wire `autofocus`, intercept the dialog `show` event, or use a controller-managed pattern. | Document the pattern in the migration guide. Each consumer's pattern (picker, menu, contextual-help) handles its own initial focus. The popover host stays out of it — same way 1st-gen's `sp-overlay` `receivesFocus="auto"` was a consumer-side concern. |

---

## Comparison: 1st-gen → 2nd-gen API delta

| Aspect | 1st-gen `<sp-popover>` | 2nd-gen `<swc-popover>` v1 (proposed) |
| ------ | ---------------------- | ------------------------------------- |
| **Behavior** | Styles only; behavior delegated to `sp-overlay` | **Modal-only in v1.** Internal `<dialog>` opens via `showModal()` — focus trap + background inert + Escape + native top layer. Non-modal mode (`popover="auto"` lifecycle) is **additive (A1)**, ships when first consumer needs it. Positioning via `PlacementController`. |
| **Properties** | `open`, `placement`, `tip` | `open`, `placement`, `actual-placement`, `tip`, `offset`, `cross-offset`, `container-padding`, `should-flip`, `tip-padding`, `for`, `trigger-element` |
| **Events** | none | `swc-open`, `swc-after-open`, `swc-close`, `swc-after-close` |
| **Slots** | default | default |
| **Host element** | `HTMLElement` | Wrapper `HTMLElement` whose shadow root renders an internal `<dialog class="swc-Popover">` element. The internal `<dialog>` carries the modal semantics. |
| **Host role** | none (consumers apply) | The internal `<dialog>` carries browser-provided `role="dialog"`. The host wrapper itself has no role. Consumers override semantics on inner content (e.g., listbox, menu) — not the dialog itself. |
| **Page-behind interactivity** | Remained interactive (clickable, focusable) | **Blocked.** Native `<dialog>` top-layer inerts the page behind. |
| **Page-behind scroll** | Allowed | **Blocked while open.** |
| **Click outside the popover** | Closed the popover (1st-gen `OverlayStack` light-dismiss) | **Does not close by default** (subject to Q6). Native `<dialog>.showModal()` does not implement backdrop-click-to-close. |
| **Focus trap** | Manual via `focus-trap` package, wired by `sp-overlay` | **Automatic.** `<dialog>.showModal()` traps focus natively. |
| **Background inert** | Manual via `sp-overlay type="modal"` and `OverlayStack` | **Automatic.** Native `<dialog>` top-layer inert. |
| **Dialog padding (popover-wraps-dialog)** | `[dialog]` host attribute toggles padding | Removed (D4). `<swc-dialog>` + `.swc-Popover` class on the dialog surface. |
| **Tip** | SVG, inset by JS arrow middleware when present | CSS-centered tip on placement edge (matches tooltip plan); SVG retained for visual parity; `arrow` middleware integration is additive (A3) |
| **Top layer / stacking** | Managed by 1st-gen `OverlayStack`; new opens often dismissed prior overlays | Browser top layer; modal dialogs stack on top of each other (no auto-close of prior modal). |
| **Position calculation** | `sp-overlay` + `PlacementController` (Overlay-internal) | `PlacementController` extracted to 2nd-gen core; reused by Tooltip and used directly by combobox |
| **Trigger resolution** | Implicit (via `sp-overlay` parent or ancestor walk) | Explicit (`for` / `trigger-element`) — same authoring pattern as Tooltip |
| **Trigger-side `aria-controls`** | Consumer wired manually | Durable, automatic. Set on trigger resolution; cleared on disconnect. |
| **Trigger-side `aria-expanded`** | Consumer wired manually | Durable presence, automatic value toggle on open/close. |
| **Used by combobox?** | Yes (as styled listbox container) | No (D7) — combobox composes shared stylesheet + `PlacementController` directly to keep `<input>` focusable |
| **First-party light-DOM composition** | Common — consumers wrapped `<sp-popover>` around their content | None (D5) — first-party components apply `PopoverMixin` internally and present a self-contained API to consumers |

---

## Comparison: this plan vs. React Spectrum's `Popover`

React Spectrum's [`Popover`](https://react-spectrum.adobe.com/Popover) is positioning + styling + dismissal coordinated by the React Aria `usePopover` hook (modal-by-default with an underlay div, `ariaHideOutside`, `FocusScope`). That heavy-handed approach is necessary in React because the browser primitives weren't sufficient at the time the hook was designed.

For the 2nd-gen web component world, much of that machinery isn't needed:

- `popover="auto"` replaces the underlay div + outside-click handling.
- The browser top layer replaces the React-Aria-managed portal + z-index stack.
- `<dialog>.showModal()` (for modal cases) replaces `FocusScope` and `ariaHideOutside`.

So the 2nd-gen `<swc-popover>` doesn't need to replicate React Spectrum's full API — it leans on the platform. The properties to mirror from React Spectrum are visual/positioning: `placement`, `offset`, `crossOffset`, `shouldFlip`, `containerPadding`. The ones to skip: `isNonModal`, `isKeyboardDismissDisabled` (`popover="auto"` handles dismiss; we don't need to disable it).

---

## Things I am explicitly NOT doing in this research

- I am not drafting the formal migration plan yet. That's Phase 1's deliverable (`migration-plan.md`) and depends on the user confirming Q1–Q10.
- I am not designing the `PlacementController` extraction in detail. That is a separate workstream tracked by the Overlay RFC.
- I am not deciding the path for Action Menu, Picker, Combobox, Contextual Help, Menu, or Coachmark migrations — those are downstream consumers and have their own scope.
- I am not proposing changes to the existing `accessibility-migration-analysis.md` or `rendering-and-styling-migration-analysis.md`. If Q2 resolves toward an opinionated host, those documents will need amendment notes about `popover="auto"` and the auto-stack regression, but that update happens after Q2 is decided.

---

## Source material consulted

- 1st-gen `Popover.ts`, `popover.css`, `Popover` README
- 1st-gen `PlacementController.ts` (full read)
- 1st-gen consumers: `ActionBar.ts`, `ActionMenu.ts`, `Card.ts`, `Coachmark.ts`, `Combobox.ts`, `ContextualHelp.ts`, `MenuItem.ts`, `Picker.ts` (template excerpts)
- Existing planning docs: `popover/rendering-and-styling-migration-analysis.md`, `popover/accessibility-migration-analysis.md`, `tooltip/migration-plan.md`
- 2nd-gen scaffolding: `badge/Badge.base.ts`, `badge/Badge.types.ts`, `core/controllers/`, `core/mixins/`, status table
- Overlay RFC (provided inline by the user)
- React Spectrum [Popover](https://react-spectrum.adobe.com/Popover) (referenced; not re-read in this session)
- Figma `S2 / Web (Desktop scale)` Popover frame (referenced; not yet captured as PNG into this repo)

## Next actions

1. **User reviews this document** and resolves Q1–Q10 (or marks some as deferred to Plan-drafting time).
2. **Figma PNG capture** — per migration-prep skill, the primary frame from `S2 / Web (Desktop scale)` should be saved into this folder (e.g. `figma-popover.png`) before the formal plan is drafted.
3. **Epic confirmation** — the migration-plan template requires an Epic ticket. The tooltip plan uses `SWC-2017`; popover has `SWC-1993`, `SWC-2001`, `SWC-1999` referenced in the existing roadmap. Confirm which is the umbrella Epic for the popover migration.
4. **Confirm `PlacementController` extraction status** — has the work started? Is anyone owning the extraction? The answer changes the migration sequencing decision (Q3).
5. **Once Q1–Q3 are decided**, copy the migration-prep template into `migration-plan.md` and start drafting.
