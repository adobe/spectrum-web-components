<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Tabs / Tabs migration plan

<!-- Document title (editable) -->

# Tabs migration plan

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Implementation status (initial 2nd-gen ship)](#implementation-status-initial-2nd-gen-ship)
- [TL;DR](#tldr)
    - [Most blocking open questions](#most-blocking-open-questions)
    - [Recently resolved](#recently-resolved)
- [1st-gen API surface](#1st-gen-api-surface)
    - [sp-tabs (`Tabs`)](#sp-tabs-tabs)
    - [sp-tab (`Tab`)](#sp-tab-tab)
    - [sp-tab-panel (`TabPanel`)](#sp-tab-panel-tabpanel)
    - [sp-tabs-overflow (`TabsOverflow`)](#sp-tabs-overflow-tabsoverflow)
    - [Module-level exports](#module-level-exports)
    - [CSS custom properties](#css-custom-properties)
    - [Shadow DOM output (rendered HTML)](#shadow-dom-output-rendered-html)
- [Dependencies](#dependencies)
- [Changes overview](#changes-overview)
    - [Must ship — breaking or a11y-required](#must-ship--breaking-or-a11y-required)
    - [Additive — ships when ready, zero breakage for consumers already on 2nd-gen](#additive--ships-when-ready-zero-breakage-for-consumers-already-on-2nd-gen)
- [2nd-gen API decisions](#2nd-gen-api-decisions)
    - [Public API](#public-api)
    - [Behavioral semantics](#behavioral-semantics)
    - [ARIA and keyboard contract](#aria-and-keyboard-contract)
    - [Shadow DOM and cross-root ARIA](#shadow-dom-and-cross-root-aria)
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
    - [Open — architecture and behavior](#open--architecture-and-behavior)
    - [Open — scope and prerequisites](#open--scope-and-prerequisites)
    - [Resolved decisions](#resolved-decisions)
- [References](#references)

</details>

<!-- Document content (editable) -->

> **SWC-1898** · Planning output. Must be reviewed before implementation begins.

---

## Implementation status (initial 2nd-gen ship)

The first **`swc-tabs`**, **`swc-tab`**, and **`swc-tab-panel`** implementation lives in **`2nd-gen/packages/core/components/tabs/`** and **`2nd-gen/packages/swc/components/tabs/`**, with a single side-effect entrypoint **`@adobe/spectrum-wc/components/tabs/swc-tabs.js`**. Consumer-facing breaking changes and deferred scope are summarized in **`2nd-gen/packages/swc/components/tabs/migration.md`**.

**S2-aligned public API:** The shipped **`swc-tabs`** surface matches the Spectrum Design–style rows **B21–B25** in [Changes overview](#changes-overview): **`keyboard-activation`** (`manual` \| `automatic`) replaces boolean **`auto`**, **`density`** (`regular` \| `compact`) replaces boolean **`compact`**, and **`quiet`**, **`emphasized`**, and t-shirt **`size`** are **not** exposed on the host. Typography uses the default S2 scale; authors customize via documented **`--swc-tabs-*` / `--swc-tab-*`** custom properties. Consumer migration notes live in **`2nd-gen/packages/swc/components/tabs/migration.md`**; Storybook focuses on usage examples, not breaking-change IDs.

**Branching:** [Migration project planning](../../02_workstreams/02_2nd-gen-component-migration/03_migration-project-planning.md) recommends an **epic feature branch** with phase PRs merged there before **`main`**. Teams may still land a self-contained migration as **one PR to `main`** when maintainers agree—call out the deviation in the PR body so reviewers know it was intentional.

---

## TL;DR

- Tabs is a three-element architecture (`swc-tabs`, `swc-tab`, `swc-tab-panel`). Overflow is deferred to phase 2.
- Keyboard navigation **drops** `RovingTabindexController` in favor of **APG-aligned** handling in `TabsBase.handleKeyDown` (direction, RTL, orientation, disabled-tab rules). `FocusgroupNavigationController` ([#6129](https://github.com/adobe/spectrum-web-components/pull/6129), merged) is **available** for a future refactor if we want shared infrastructure with other 2nd-gen components.
- Disabled tabs expose **`aria-disabled="true"`** to assistive technology and stay **focusable in the tab sequence** per APG; activation is guarded. Authors still use the **`disabled`** attribute / property as the public control.
- `aria-orientation` must be co-located with `role="tablist"` (fixing a 1st-gen bug where they were on different elements)
- **S2-aligned `swc-tabs` API:** **`keyboard-activation`** (`manual` \| `automatic`), **`density`** (`regular` \| `compact`), plus **`direction`**, **`label`**, **`selected`**, **`disabled`** — no **`quiet`**, **`emphasized`**, or **`size`** on the host (see [Implementation status](#implementation-status-initial-2nd-gen-ship))
- `direction="vertical-right"` is a 1st-gen SWC addition not in Spectrum CSS; removal is a breaking change for consumers using it (Q4)
- S2 overflow changes from scroll-based to Picker-based collapse — **deferred to phase 2** (Q5, Q19 resolved)
- Several public API surfaces are removed: `rovingTabindexController` field, `focusElement` getter (`Focusable` dropped — Q2 resolved), module-level exports, CSS deep imports
- `change` event rename to `swc-change` would silently break all consumers — strongly recommend keeping `change`

### Most blocking open questions

- `Q3` in [Open — architecture and behavior](#open--architecture-and-behavior): cross-root ARIA — how will `aria-controls` / `aria-labelledby` ID references resolve if DOM arrangement changes?
- `Q7` in [Open — architecture and behavior](#open--architecture-and-behavior): `change` event naming — keep `change` or rename to `swc-change`? Needs team alignment.

### Recently resolved

- `Q1`: `FocusgroupNavigationController` merged ([#6129](https://github.com/adobe/spectrum-web-components/pull/6129)). **Initial ship:** tabs use **`TabsBase.handleKeyDown`**; adopting the shared controller is an optional follow-up.
- `Q2`: `Focusable` mixin not needed — roving tabindex + keyboard behavior live in **`TabsBase`**; `swc-tabs` uses **`delegatesFocus`** on its shadow root.
- `Q5`, `Q14`, `Q19`: Overflow deferred to phase 2.
- `Q6`: `enableTabsScroll` deferred with overflow.
- `Q8`: **Resolved for S2 ship** — **`size`** is not a public API on `swc-tabs`; default typography only (supersedes prior “default `size=m`” interim note).
- `Q11`: Internal DOM changes are not a consumer concern.
- `Q16`–`Q18`: **Resolved for S2 ship** — **`keyboard-activation`** / **`density`** replace **`auto`** / **`compact`**; **`emphasized`** and **`quiet`** removed from the public surface (see **`migration.md`**).

---

## 1st-gen API surface

**Source:** [`1st-gen/packages/tabs/src/`](../../../../1st-gen/packages/tabs/src/) (`Tabs.ts`, `Tab.ts`, `TabPanel.ts`, `TabsOverflow.ts`)
**Tests:** [`1st-gen/packages/tabs/test/`](../../../../1st-gen/packages/tabs/test/) (`tabs.test.ts`, `tab.test.ts`, `tabs-overflow.test.ts`)
**Version:** `@spectrum-web-components/tabs`
**Custom element tags:** `sp-tabs`, `sp-tab`, `sp-tab-panel`, `sp-tabs-overflow`

### sp-tabs (`Tabs`)

#### Properties / attributes

| Property | Type | Default | Attribute | Notes |
|---|---|---|---|---|
| `auto` | `boolean` | `false` | `auto` | Automatic activation — selection follows focus. |
| `compact` | `boolean` | `false` | `compact` | Reflected. Tabs displayed closer together. |
| `direction` | `'horizontal' \| 'vertical' \| 'vertical-right'` | `'horizontal'` | `direction` | Reflected. Tablist orientation. `vertical-right` is a 1st-gen SWC addition not present in Spectrum CSS. |
| `emphasized` | `boolean` | `false` | `emphasized` | Reflected. Visually emphasized style. |
| `label` | `string` | `''` | `label` | `aria-label` for the tablist. |
| `enableTabsScroll` | `boolean` | `false` | `enable-tabs-scroll` | Enable horizontal scroll on the tab list. camelCase attribute is unusual; candidate for rename. |
| `quiet` | `boolean` | `false` | `quiet` | Reflected. Display without divider. |
| `selected` | `string` | `''` | `selected` | Reflected. `value` of the selected tab. |
| `size` | `ElementSize` | none | `size` | From `SizedMixin` with `noDefaultSize: true`. CSS treats missing size as medium styling. |
| `disabled` | `boolean` | `false` | `disabled` | Inherited from `Focusable` base class. |
| `selectionIndicatorStyle` | `string` | (no selection) | `attribute: false` | Internal. Inline style for the selection indicator. |
| `shouldAnimate` | `boolean` | `false` | `attribute: false` | Internal. Animation toggle. |
| `autofocus` | `boolean` | `false` | `autofocus` | Inherited from `Focusable`. Private in JSDoc. |
| `tabIndex` | `number` | managed | `tabindex` | Inherited from `Focusable`. Overridden getter/setter; private in JSDoc. |

#### Methods

| Method | Signature | Notes |
|---|---|---|
| `scrollTabs` | `(delta: number, behavior?: ScrollBehavior): void` | Scrolls the tab list horizontally. |
| `scrollToSelection` | `(): Promise<void>` | Scrolls the selected tab into view. |
| `scrollState` | getter → `{ canScrollLeft, canScrollRight }` | RTL-aware scroll state. |
| `focusElement` | getter → `Tab \| this` | Returns the focusable element. |

#### Events

| Event | Detail | Bubbles | Composed | Notes |
|---|---|---|---|---|
| `change` | none | No | No | Cancelable; `preventDefault()` reverts selection. |
| `sp-tabs-scroll` | none | Yes | Yes | Fired on scroll of the tab list. |

#### Slots

| Slot | Content | Notes |
|---|---|---|
| default | `sp-tab` elements | |
| `tab-panel` | `sp-tab-panel` elements | |

#### CSS parts

| Part | Description |
|---|---|
| `tablist` | The `#list` container div. |

### sp-tab (`Tab`)

#### Properties / attributes

| Property | Type | Default | Attribute | Notes |
|---|---|---|---|---|
| `disabled` | `boolean` | `false` | `disabled` | Reflected. |
| `label` | `string` | `''` | `label` | Reflected. Fallback text label when default slot is empty. |
| `selected` | `boolean` | `false` | `selected` | Reflected. Set by parent `sp-tabs`. |
| `vertical` | `boolean` | `false` | `vertical` | Reflected. Vertical orientation styling. |
| `value` | `string` | `''` | `value` | Reflected. Unique ID, used for tab-panel matching. |

#### Slots

| Slot | Content | Notes |
|---|---|---|
| default | Text label of the tab | Nested under a `<label id="item-label">` in 1st-gen shadow DOM. |
| `icon` | Optional icon displayed beside the label | |

#### ARIA (set in code)

- `role="tab"` (in `firstUpdated`)
- `aria-selected` synced with `selected`
- `aria-disabled` synced with `disabled`
- `aria-controls` set by parent via `managePanels`
- `tabindex` `0` / `-1` (roving tabindex, synced with `selected`)
- Auto-generated `id` if not provided: `sp-tab-${randomID()}`

### sp-tab-panel (`TabPanel`)

#### Properties / attributes

| Property | Type | Default | Attribute | Notes |
|---|---|---|---|---|
| `selected` | `boolean` | `false` | `selected` | Reflected. Visibility controlled by parent. |
| `value` | `string` | `''` | `value` | Reflected. Matched against `sp-tab` value. |

#### Slots

| Slot | Content | Notes |
|---|---|---|
| default | Panel body content | |

#### ARIA (set in code)

- `role="tabpanel"` (in `firstUpdated`)
- `aria-labelledby` set by parent via `managePanels`
- `aria-hidden="true"` when not selected; removed when selected
- `tabindex` `0` / `-1` based on selection; focus-in/out handlers adjust tabindex
- `slot="tab-panel"` set programmatically in `firstUpdated`
- Auto-generated `id`: `sp-tab-panel-${randomID()}`

### sp-tabs-overflow (`TabsOverflow`)

> **S2 design change (Q19):** Spectrum 2 replaces scroll-based overflow with a **Picker-based collapse** pattern. When tabs exceed available space, they collapse into a dropdown/Picker rather than scrolling. See [Spectrum Design Tabs — overflow behavior](https://react-spectrum.adobe.com/Tabs#overflow-behavior) and the [Spectrum CSS overflow story](https://64762974a45b8bc5ca1705a2-yypcfpggii.chromatic.com/?path=/story/components-tabs--default&args=orientation:overflow). This fundamentally changes the overflow API and may mean `sp-tabs-overflow` is not carried forward in its current form.

**1st-gen API (for reference):**

| Property | Type | Default | Attribute | Notes |
|---|---|---|---|---|
| `compact` | `boolean` | `false` | `compact` | Reflected. |
| `label-previous` | `string` | `'Scroll to previous tabs'` | `label-previous` | Accessible label for the scroll-left button. |
| `label-next` | `string` | `'Scroll to next tabs'` | `label-next` | Accessible label for the scroll-right button. |
| `size` | `ElementSize` | `'m'` | `size` | From `SizedMixin` (standard defaults). |

**Slots:**

| Slot | Content |
|---|---|
| default | Expects `sp-tabs` |

### Module-level exports

These TypeScript exports are importable from the package but are not element attributes:

| Export | Type | Notes |
|---|---|---|
| `ScaledIndicator` | Object | `{ baseSize, noSelectionStyle, transformX, transformY, baseStyles }`. Internal selection indicator helper. |
| `calculateScrollTargetForRightSide` | Function | Scroll positioning helper. |
| `calculateScrollTargetForLeftSide` | Function | Scroll positioning helper. |

> **Decision needed:** carry forward as public API, internalize with `@internal`, or drop. These are not documented as public API but could be consumed.

### CSS custom properties

The 1st-gen implementation exposes a large customization surface through imported stylesheets:

**sp-tabs (host / overrides):**

| Property | Description |
|---|---|
| `--swc-tabs-list-justify-content` | Justify content of the `#list` container. |
| `--spectrum-tabs-font-weight` | System override via `--system-tabs-font-weight`. |
| `--spectrum-tabs-divider-background-color` | System override via `--system-tabs-divider-background-color`. |
| `--spectrum-tabs-item-height` | Tab item height per size. |
| `--spectrum-tabs-color` | Tab item text color. |
| `--spectrum-tabs-selection-indicator-color` | Selection indicator color. |
| `--spectrum-tabs-animation-duration` | Selection indicator animation duration. |

**Modifiers (from Spectrum CSS):**

`--mod-tabs-divider-size`, `--mod-tabs-divider-background-color`, `--mod-tabs-font-color`, `--mod-tabs-font-color-selected`, `--mod-tabs-font-color-hover`, `--mod-tabs-font-color-disabled`, `--mod-tabs-font-color-key-focus`, `--mod-tabs-selection-indicator-color`, `--mod-tabs-selection-indicator-color-key-focus`, `--mod-tabs-font-weight`, `--mod-tabs-item-height`, `--mod-tabs-icon-size`, `--mod-tabs-animation-duration`

**High-contrast overrides:** `--highcontrast-tabs-*` tokens present in 1st-gen CSS. Verify whether Spectrum 2 handles these automatically or if they need explicit migration.

**sp-tabs-overflow:**

| Property | Description |
|---|---|
| `--sp-tabs-overflow-next-button-right` | Right position of next scroll button. |
| `--sp-tabs-overflow-previous-button-left` | Left position of previous scroll button. |
| `--sp-tabs-overflow-button-height` | Height of scroll buttons. |
| `--sp-tabs-overflow-button-size` | Size of scroll buttons. |
| `--sp-tabs-overflow-icon-color` | Chevron icon color. |
| `--sp-tabs-overflow-shadow-color` | Edge shadow color. |
| `--sp-tabs-overflow-shadow-width` | Edge shadow width. |

This full modifier surface will not be carried forward to 2nd-gen. Consumers must migrate to `--swc-tabs-*` equivalents (names TBD during implementation).

### Shadow DOM output (rendered HTML)

```html
<!-- sp-tabs: the host renders a shadow tablist wrapper + panel slot -->
<sp-tabs selected="tab-1" direction="horizontal" label="Example tabs">
  #shadow-root
  <div id="list" role="tablist" part="tablist" aria-label="Example tabs">
    <slot></slot>
    <div id="selection-indicator" role="presentation"
         style="transform: translateX(...)"></div>
  </div>
  <slot name="tab-panel"></slot>

  <!-- Light DOM children: -->
  <sp-tab value="tab-1" role="tab" aria-selected="true" tabindex="0"
          aria-controls="sp-tab-panel-...">
    #shadow-root
    <slot name="icon"></slot>
    <label id="item-label">
      <slot>Tab 1</slot>
    </label>
  </sp-tab>
  <sp-tab value="tab-2" role="tab" aria-selected="false" tabindex="-1"
          aria-controls="sp-tab-panel-...">
    ...
  </sp-tab>
  <sp-tab-panel value="tab-1" role="tabpanel" slot="tab-panel"
                aria-labelledby="sp-tab-..." tabindex="0">
    #shadow-root
    <slot></slot>
  </sp-tab-panel>
  <sp-tab-panel value="tab-2" role="tabpanel" slot="tab-panel"
                aria-hidden="true" tabindex="-1">
    ...
  </sp-tab-panel>
</sp-tabs>
```

> **Note:** `sp-tab` wraps default slot content in a `<label id="item-label">` element. This implicit `<label>` semantics can conflict with the `role="tab"` on the host. This should not be carried forward to 2nd-gen.

---

## Dependencies

| Package | Role | 2nd-gen equivalent | Status |
|---|---|---|---|
| `Focusable` mixin | Focus delegation, disabled, tabIndex | TBD — may not be needed if focus is managed via controller | **Open** (Q2) |
| `SizedMixin` | Size variants | `2nd-gen/packages/core/mixins/sized-mixin.ts` | Available |
| `RovingTabindexController` | Keyboard nav, roving tabindex | **Initial ship:** APG-aligned keyboard handling implemented in `TabsBase.handleKeyDown` (B6/B7/B9). Optional follow-up: adopt `FocusgroupNavigationController` ([#6129](https://github.com/adobe/spectrum-web-components/pull/6129)) for shared infrastructure if we want parity with other 2nd-gen components. | **Shipped** (behavior); controller integration **TBD** |
| Disabled mixin | `aria-disabled`, tabindex save/restore | 2nd-gen disabled mixin ([#6129](https://github.com/adobe/spectrum-web-components/pull/6129)) | **Open — depends on #6129** |
| `FocusVisiblePolyfillMixin` | `:focus-visible` polyfill | TBD — evaluate if modern browsers need it | **Open** |
| `ObserveSlotPresence` | Slot monitoring | TBD — may use native Lit slot change | **Open** |
| `ObserveSlotText` | Slot text monitoring | TBD — may use native Lit slot change | **Open** |
| `IntersectionController` | Indicator updates | Evaluate need | **Open** |
| `ResizeController` | Indicator resize updates | Evaluate need | **Open** |
| `sp-action-button` | Overflow scroll buttons | `swc-action-button` (when migrated) | **Blocked** (Q5) |
| `sp-icon-chevron100` | Overflow chevron icon | TBD — evaluate icon approach | **Open** |
| `SpectrumElement` | Base class | `2nd-gen/packages/core/element/spectrum-element.ts` | Available |

---

## Changes overview

> **Priority framing:**
> - **Accessibility is non-negotiable** — all a11y requirements ship as part of this migration.
> - **Breaking changes** are assessed on merit — some must ship now to avoid a second, more disruptive migration event later.
> - **Additive changes** can be deferred and will not cause consumer breakage when they do ship.

### Must ship — breaking or a11y-required

#### Tag names and imports

| # | What changes | 1st-gen behavior | 2nd-gen behavior | Consumer migration path |
|---|---|---|---|---|
| **B1** | Tag name rename | `sp-tabs`, `sp-tab`, `sp-tab-panel`, `sp-tabs-overflow` | `swc-tabs`, `swc-tab`, `swc-tab-panel`, `swc-tabs-overflow` | Find and replace all 1st-gen tag names. |
| **B2** | Package rename | `@spectrum-web-components/tabs` | `@adobe/spectrum-wc` | `yarn remove` old, `yarn add` new. |
| **B3** | Import paths | `@spectrum-web-components/tabs/sp-tabs.js` (per-element) | `@adobe/spectrum-wc/components/tabs/swc-tabs.js` (single import) | Update import statements. |

#### CSS custom properties

| # | What changes | 1st-gen behavior | 2nd-gen behavior | Consumer migration path |
|---|---|---|---|---|
| **B4** | Token rename | `--mod-tabs-*`, `--spectrum-tabs-*` | `--swc-tabs-*` (names TBD) | Replace all custom property references per mapping table. See [CSS custom properties](#css-custom-properties) for the full 1st-gen list. |

#### Accessibility fixes

| # | What changes | 1st-gen behavior | 2nd-gen behavior | Consumer migration path |
|---|---|---|---|---|
| **B5** | `aria-orientation` placement | Set on `<sp-tabs>` host, but `role="tablist"` is on the inner `#list` element. Screen readers expect both on the same node. | `aria-orientation` set on the **same element** as `role="tablist"`. | No consumer action (internal fix). |
| **B6** | Arrow key direction | `RovingTabindexController` uses `direction: 'both'`, allowing all four arrow keys in a horizontal tablist. | 2nd-gen restricts to Left/Right only for horizontal, Up/Down only for vertical per APG. | No consumer action (behavior improvement). Verify keyboard tests. |
| **B7** | RTL arrow keys | Physical Left/Right used regardless of `dir="rtl"`. | 2nd-gen detects RTL and swaps arrow keys automatically. | No consumer action (bug fix). |
| **B8** | `<label>` inside `sp-tab` | Shadow DOM wraps slot in `<label id="item-label">`. Implicit `<label>` semantics conflict with `role="tab"`. | Remove `<label>` wrapper; use `<span>` or bare slot. | Consumers using CSS selectors targeting `label` inside `sp-tab` shadow DOM must update (not public API, but may break). |
| **B9** | Disabled tabs — keyboard behavior reversal | 1st-gen uses native `disabled` attribute on tabs. `RovingTabindexController` **skips** disabled tabs entirely (`isFocusableElement: (el) => !el.disabled`), making them unreachable via keyboard. | 2nd-gen uses `aria-disabled="true"` so tabs remain discoverable by AT. Disabled tabs become **focusable via arrow keys** per APG but are not activatable (Enter/Space/click are guarded). This is a behavioral reversal — disabled tabs change from invisible-to-keyboard to focusable-but-inert. | Consumers relying on disabled tabs being skipped by keyboard navigation: verify new behavior. `disabled` still works as the author-facing attribute; internal focus and ARIA handling change. |

#### Behavioral

| # | What changes | 1st-gen behavior | 2nd-gen behavior | Consumer migration path |
|---|---|---|---|---|
| **B10** | Keyboard controller | `RovingTabindexController` | **`TabsBase.handleKeyDown`** implements APG-aligned navigation; optional later adoption of **`FocusgroupNavigationController`** ([#6129](https://github.com/adobe/spectrum-web-components/pull/6129)) for shared infrastructure. | No consumer action (internal). Keyboard behavior verified to match APG. |
| **B11** | `sp-tabs-scroll` event | `sp-tabs-scroll` | **Phase 1:** scroll APIs / overflow deferred — event not reintroduced until phase 2 overflow work. When shipped, align naming with 2nd-gen conventions (e.g. `swc-tabs-scroll`). | Update event listeners only after overflow phase lands. |
| **B12** | Default size / typography | `SizedMixin` with `noDefaultSize: true` — optional `size` on host. | **No `size` API** on `swc-tabs`; single S2 default typography scale. Customize with `--swc-tabs-*` / `--swc-tab-*` if needed. | Remove `size` from `swc-tabs`; adjust CSS tokens for density/visual emphasis. |
| **B21** | `auto` → `keyboardActivation` | `auto` boolean; `true` = automatic activation. | **`keyboard-activation`**: `manual` (default) or `automatic`. | Replace `auto` with `keyboard-activation="automatic"`; omit attribute for manual. |
| **B22** | `compact` → `density` | `compact` boolean. | **`density`**: `regular` (default) or `compact`. | Replace `compact` with `density="compact"`. |
| **B23** | `emphasized` removal | `emphasized` boolean on host. | **Not exposed** on `swc-tabs`. | Use CSS custom properties for accent styling if required. |
| **B24** | `quiet` removal | `quiet` boolean on host. | **Not exposed** on `swc-tabs`. | Use CSS custom properties for divider treatment if required. |
| **B25** | `size` removal | T-shirt sizes on host. | **Not exposed** on `swc-tabs`. | Remove `size`; rely on default scale or tokens. |
| **B26** | Overflow pattern change | `sp-tabs-overflow` uses scroll buttons to navigate overflowing tabs. | S2 replaces scroll-based overflow with Picker-based collapse. **Deferred to phase 2** — `sp-tabs-overflow` is not ported in the initial migration. | Continue using 1st-gen `sp-tabs-overflow` until phase 2 delivers the Picker-based collapse. See Q5, Q19. |

#### API removals and surface changes

| # | What changes | 1st-gen behavior | 2nd-gen behavior | Consumer migration path |
|---|---|---|---|---|
| **B13** | `direction="vertical-right"` removal | Supported as a valid `direction` value. Not in Spectrum CSS; SWC-only addition. | Removed unless Q4 resolves to keep. Only `'horizontal' \| 'vertical'` accepted. | Consumers using `direction="vertical-right"` must switch to `direction="vertical"` or a CSS-based alternative. Layout will change. |
| **B14** | `enableTabsScroll` attribute rename | `enable-tabs-scroll` attribute (camelCase property). | Renamed to a simpler attribute (e.g., `scroll`). Old attribute silently stops working. | Find and replace `enable-tabs-scroll` attribute and `enableTabsScroll` property references. |
| **B15** | Module-level exports removed | `ScaledIndicator`, `calculateScrollTargetForRightSide`, `calculateScrollTargetForLeftSide` exported from `@spectrum-web-components/tabs`. Listed in `package.json` `exports` map. | Internalized or removed. Not carried forward as public API. | Consumers importing these must replace with local implementations. |
| **B16** | `rovingTabindexController` public field removed | `rovingTabindexController` is a public class field on `Tabs` (no `private`/`protected` modifier). Consumers can access it. | Replaced by **internal** keyboard and roving-tabindex logic in **`TabsBase`**. No public equivalent exposed. | Consumers accessing `tabsEl.rovingTabindexController` must remove the reference. |
| **B17** | `focusElement` getter removed | `focusElement` getter (from `Focusable` base class) returns the currently focusable tab or host. | If `Focusable` is dropped (Q2), this getter is no longer available. | Consumers calling `tabsEl.focusElement` must use standard DOM focus APIs instead. |
| **B18** | CSS stylesheet deep imports removed | Individual CSS module exports available: `@spectrum-web-components/tabs/src/tab.css.js`, `tabs.css.js`, `tabs-overrides.css.js`, `tabs-sizes.css.js`, `tabs-sizes-overrides.css.js`, `tabs-overflow.css.js`. | 2nd-gen uses new CSS files. Legacy deep import paths no longer exist. | Consumers importing individual CSS modules must migrate to the new token surface or component-level styling. |

#### Internal behavioral changes

| # | What changes | 1st-gen behavior | 2nd-gen behavior | Consumer migration path |
|---|---|---|---|---|
| **B19** | `slot="tab-panel"` auto-assignment | `TabPanel.firstUpdated()` sets `this.slot = 'tab-panel'` programmatically. Consumers do **not** write `slot="tab-panel"` on `<sp-tab-panel>`. | TBD — if 2nd-gen changes slotting, consumers may need explicit `slot` attributes. | Verify panel slotting works without explicit `slot` attribute; if changed, add `slot="tab-panel"` to all `<swc-tab-panel>` elements. |
| **B20** | TabPanel focus-in/out tabindex management | `TabPanel` removes its own `tabindex` on `focusin` (so it doesn't intercept Tab when content inside the panel has focus), then restores `tabindex` on `focusout`. | 2nd-gen must replicate this behavior to avoid Tab-key trapping inside panels. If omitted, keyboard navigation through panel content changes. | No consumer action if behavior is preserved. If changed, consumers with complex panel content should verify Tab key behavior. |

### Additive — ships when ready, zero breakage for consumers already on 2nd-gen

| # | What changes | Notes |
|---|---|---|
| **A1** | `selectionIndicatorStyle` / `shouldAnimate` removal | `attribute: false` internal properties. Not public API; should not be carried forward. |

---

## 2nd-gen API decisions

### Public API

**`swc-tabs`:**

| Property | Type | Default | Attribute | Notes |
|---|---|---|---|---|
| `keyboard-activation` | `'manual' \| 'automatic'` | `'manual'` | `keyboard-activation` | `manual` = APG manual activation; `automatic` = selection follows focus. |
| `density` | `'regular' \| 'compact'` | `'regular'` | `density` | `compact` reduces tab spacing (replaces 1st-gen boolean `compact`). |
| `direction` | `'horizontal' \| 'vertical'` | `'horizontal'` | `direction` | Reflected. `vertical-right` dropped unless Q4 resolves to keep. |
| `label` | `string` | `''` | `label` | `aria-label` for the tablist. |
| `selected` | `string` | `''` | `selected` | Reflected. `value` of the selected tab. |
| `disabled` | `boolean` | `false` | `disabled` | Sets `aria-disabled="true"` on tablist. |

**`swc-tab`:** `disabled`, `label`, `selected`, `vertical`, `value` — unchanged from 1st-gen. `disabled` sets `aria-disabled="true"` internally.

**`swc-tab-panel`:** `selected`, `value` — unchanged from 1st-gen.

**Methods (disposition TBD):**

| Method | 1st-gen | 2nd-gen | Notes |
|---|---|---|---|
| `scrollTabs(delta, behavior?)` | Public | **Not ported in phase 1** (Q14 resolved) | Part of scroll-based overflow, deferred to phase 2. |
| `scrollToSelection()` | Public | **Not ported in phase 1** (Q14 resolved) | Part of scroll-based overflow, deferred to phase 2. |
| `scrollState` (getter) | Public | **Not ported in phase 1** (Q14 resolved) | Part of scroll-based overflow, deferred to phase 2. |
| `focusElement` (getter) | Public (from `Focusable`) | **Removed** (Q2 resolved) | `Focusable` mixin dropped. Use `delegatesFocus` instead. |

**Events:** `change` (cancelable). Scroll-related events (**`sp-tabs-scroll`**) are **deferred** with overflow (phase 2); naming TBD when that work lands.

> **Risk note (Q7):** Renaming `change` to `swc-change` would silently break every consumer using `@change` or `addEventListener('change', ...)`. The `change` event is native-like and cancelable — the 1st-gen pattern matches native `<select>` behavior. Strongly consider keeping `change` as-is.

**Slots:** Default slot for tabs and `name="tab-panel"` for panels — same light-DOM composition model as 1st-gen (B19 preserved). **`::part(tablist)` is not exposed** on `swc-tabs` (styling uses documented `--swc-tabs-*` / `--swc-tab-*` custom properties on `:host` instead of 1st-gen’s `part="tablist"`).

### Behavioral semantics

- **Automatic activation (`keyboard-activation="automatic"`):** Selection follows focus as the user arrows between tabs.
- **Manual activation (default, `keyboard-activation="manual"`):** Arrow keys move focus without changing selection. Enter/Space/click activate the focused tab.
- **Cancelable selection:** `change` event supports `preventDefault()` to revert selection.
- **Tab-to-panel:** Tab key moves focus from the tablist to the active `tabpanel` (`tabindex="0"` on the active panel). Shift+Tab returns to the tablist.
- **Roving tabindex:** Exactly one tab has `tabindex="0"` at all times; all others are `tabindex="-1"`.
- **Wrapping:** Arrow keys wrap from last to first and vice versa per APG.
- **Memory:** Tab re-entry via the Tab key targets the last-focused tab if still present.
- **Home / End:** Jump to first / last tab.
- **RTL:** Arrow keys swap automatically for `dir="rtl"`.
- **Disabled tabs:** `aria-disabled` tabs remain focusable via arrow keys but are not activatable (Enter/Space/click handlers must be guarded). Natively `disabled` elements are skipped.

### ARIA and keyboard contract

> **Full details:** See the [Accessibility migration analysis](./accessibility-migration-analysis.md) for the complete ARIA contract, keyboard mapping, accessibility tree expectations, and testing requirements. This section provides a summary to avoid duplication.

The [Tabs pattern (APG)](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/) is the normative reference. 2nd-gen follows both the [automatic activation](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/examples/tabs-automatic/) and [manual activation](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/examples/tabs-manual/) examples.

**Key ARIA requirements:**

- `role="tablist"` with `aria-label` on the inner wrapper (co-located with `aria-orientation`)
- `role="tab"` on each `swc-tab` with `aria-selected` and `aria-controls`
- `role="tabpanel"` on each `swc-tab-panel` with `aria-labelledby`
- `aria-disabled="true"` (not native `disabled`) on disabled tabs — they remain focusable but not activatable
- Arrow keys restricted per orientation (Left/Right for horizontal, Up/Down for vertical)
- RTL arrow key swap handled automatically

**1st-gen bugs to fix in 2nd-gen:**

| Bug | Disposition |
|---|---|
| `aria-orientation` on host but `role="tablist"` on inner element | Fix (B5) |
| Arrow keys not restricted per orientation | Fix (B6) |
| Arrow keys not swapped for `dir="rtl"` | Fix (B7) |
| `<label>` wrapper inside `role="tab"` creates conflicting semantics | Fix (B8) |

### Shadow DOM and cross-root ARIA

`aria-controls` and `aria-labelledby` rely on **ID references** that must resolve in the document tree. In 1st-gen, tabs and panels are light DOM children matched by `value`; the component sets ARIA attributes on those light DOM nodes directly, so ID references resolve in the same tree.

Any 2nd-gen change to DOM arrangement must preserve ID resolution. Options include: keeping tabs/panels as light DOM children, using `ElementInternals`, synchronized IDs, or explicit light DOM slots. Treat this as a design constraint (Q3).

---

## Architecture: core vs SWC split

| Layer | Files | Owns |
|---|---|---|
| **Core** | `2nd-gen/packages/core/components/tabs/` | `TabsBase`, `TabBase`, `TabPanelBase`, `Tabs.types.ts` — reusable behavior: selection, activation model, keyboard handling (`handleKeyDown`), ARIA wiring, tab-panel association, slot observation |
| **SWC** | `2nd-gen/packages/swc/components/tabs/` | `Tabs`, `Tab`, `TabPanel` — extends core bases, adds `render()`, S2 styling, element registration, Storybook stories, tests |
| **SWC (overflow)** | `2nd-gen/packages/swc/components/tabs/` | `TabsOverflow` — if ported (Q5), extends core or standalone |

**File layout (SWC):**

```
2nd-gen/packages/swc/components/tabs/
├── Tabs.ts
├── Tab.ts
├── TabPanel.ts
├── tabs.css
├── tab.css
├── tab-panel.css
├── index.ts
├── stories/
│   └── tabs.stories.ts
└── test/
    ├── tabs.test.ts
    └── tabs.a11y.spec.ts
```

---

## Migration checklist

### Preparation (this ticket)

- [ ] Migration plan complete and reviewed (this document)
- [ ] Breaking changes documented and reviewed by team
- [ ] File layout agreed (4 elements × core + SWC)
- [ ] Dependencies evaluated — keyboard: Q1 resolved for ship (**`TabsBase.handleKeyDown`**); optional **`FocusgroupNavigationController`** adoption tracked separately
- [ ] Open questions have owners and target resolution dates

### Setup

- [ ] Create `2nd-gen/packages/core/components/tabs/` with:
  - [ ] `Tabs.base.ts` — tablist host behavior, selection, `keyboard-activation`
  - [ ] `Tab.base.ts` — individual tab behavior
  - [ ] `TabPanel.base.ts` — panel visibility, focus management
  - [ ] `Tabs.types.ts` — shared types (`TabDirection`, `TabSize`, etc.)
  - [ ] `index.ts`
- [ ] Create `2nd-gen/packages/swc/components/tabs/` with:
  - [ ] `Tabs.ts`, `Tab.ts`, `TabPanel.ts` — extend core bases
  - [ ] `tabs.css`, `tab.css`, `tab-panel.css`
  - [ ] `index.ts`, `stories/`, `test/`
- [ ] Wire up exports in `package.json`
- [ ] Verify build passes with stub implementation

### API

- [ ] Define types in `Tabs.types.ts`:
  - [ ] `TabsDirection` — `'horizontal' | 'vertical'` (`vertical-right` dropped)
  - [ ] `KeyboardActivation` — `'manual' | 'automatic'`; `TabDensity` — `'regular' | 'compact'`
  - [ ] `VALID_DIRECTIONS`, `KEYBOARD_ACTIVATIONS`, `TAB_DENSITIES`
- [ ] `TabsBase`: `keyboard-activation`, `density`, `direction`, `label`, `selected`, `disabled` — with static readonly validation arrays and `window.__swc.warn()` for invalid combinations where applicable
- [ ] `TabBase`: `disabled`, `label`, `selected`, `vertical`, `value`
- [ ] `TabPanelBase`: `selected`, `value`
- [ ] Mark internal helpers with `@internal`
- [ ] Mark `rovingTabindexController` equivalent as `private` or `@internal` (was public in 1st-gen)
- [ ] Decide disposition for `scrollTabs`, `scrollToSelection`, `scrollState` (Q14)
- [ ] Decide disposition for `focusElement` getter (Q2)
- [ ] Preserve or document change to `slot="tab-panel"` auto-assignment behavior (Q15)
- [ ] Add JSDoc for all public properties

### Styling

- [ ] Migrate CSS from Spectrum 2 tokens
- [ ] Replace `--spectrum-tabs-*` / `--mod-tabs-*` with `--swc-tabs-*` tokens
- [ ] Selection indicator animation with token-based duration
- [ ] `density` values (`regular`, `compact`)
- [ ] Vertical orientation layout
- [ ] Remove `<label>` wrapper from `sp-tab` shadow DOM (use `<span>` or bare slot)
- [ ] Verify language-specific selectors (`:lang(ja)`, `:lang(ko)`, `:lang(zh)`) if present in S2 source
- [ ] Pass `stylelint`

### Accessibility

#### Naming and semantics

- [ ] `swc-tabs` inner wrapper: `role="tablist"`, `aria-label`, `aria-orientation` co-located
- [ ] `swc-tab`: `role="tab"`, `aria-selected`, `aria-controls`, roving `tabindex`
- [ ] `swc-tab-panel`: `role="tabpanel"`, `aria-labelledby`, `hidden` for inactive, `tabindex="0"` for active
- [ ] Disabled tabs: `aria-disabled="true"`, focusable, not activatable
- [ ] Disabled tablist — `aria-disabled="true"` on tablist role node
- [ ] Cross-root ARIA: `aria-controls` / `aria-labelledby` ID references resolve correctly (Q3)

#### Keyboard and focus

- [ ] Keyboard: APG-aligned `handleKeyDown` shipped; optional — migrate to `FocusgroupNavigationController` ([#6129](https://github.com/adobe/spectrum-web-components/pull/6129)) for shared infra
- [ ] Implement automatic vs manual activation (`keyboard-activation` `manual` / `automatic`)
- [ ] Tab key from tablist to panel content; Shift+Tab back
- [ ] Home/End within tablist
- [ ] Verify RTL arrow direction
- [ ] Arrow keys restricted per orientation (Left/Right for horizontal, Up/Down for vertical)
- [ ] Preserve TabPanel focus-in/out tabindex management — panel removes `tabindex` on `focusin` to avoid intercepting Tab, restores on `focusout` (B20)

#### State verification

- [ ] Playwright ARIA snapshot tests for both activation modes
- [ ] Confirm host vs internal-control semantics in snapshots (`tablist`, `tab`, `tabpanel` roles, accessible names, disabled states)

### Testing

- [ ] Port `1st-gen/packages/tabs/test/tabs.test.ts` coverage that still applies
- [ ] Add Playwright `tabs.a11y.spec.ts` with `toMatchAriaSnapshot`

#### Unit tests (red/green TDD)

| Test | Asserts | Fails until |
|---|---|---|
| Renders `role="tablist"` | Inner wrapper has `role="tablist"` | Render method |
| Renders `role="tab"` on tabs | Each `swc-tab` has `role="tab"` | Tab element |
| Renders `role="tabpanel"` on panels | Each `swc-tab-panel` has `role="tabpanel"` | Panel element |
| Selected tab has `aria-selected="true"` | Only selected tab has `aria-selected="true"` | Selection logic |
| Unselected tabs have `aria-selected="false"` | All others have `aria-selected="false"` | Selection logic |
| `aria-controls` references panel ID | Tab's `aria-controls` matches panel's `id` | `managePanels` |
| `aria-labelledby` references tab ID | Panel's `aria-labelledby` matches tab's `id` | `managePanels` |
| `change` event fires | Selecting a tab dispatches `change` | Event dispatching |
| `change` event is cancelable | `preventDefault()` reverts selection | Cancelable logic |
| Manual: arrows don't select | Arrow keys move focus without changing `selected` | Keyboard handler |
| Automatic: arrows select | Arrow keys move focus and update `selected` | `keyboard-activation="automatic"` + keyboard handler |
| Disabled tab focusable but not activatable | Arrow key reaches disabled tab; Enter/Space no-op | Disabled guard |
| Inactive panel hidden | Non-selected panel has `hidden` or `aria-hidden="true"` | Panel visibility |
| Direction sets `aria-orientation` | `direction="vertical"` sets `aria-orientation="vertical"` on tablist node | Direction handler |
| Density spacing | `density="compact"` tightens tablist gap | CSS + attribute |
| RTL arrow swap | Arrow keys swap in `dir="rtl"` | RTL handling |
| Memory re-entry | Tab out and back: focus returns to last-focused tab | Focus memory |
| `aria-disabled` on individual tab | Disabled tab has `aria-disabled="true"` | Disabled handling |
| `aria-disabled` on tablist | Whole tablist disabled shows `aria-disabled="true"` on tablist node | Disabled tablist |
| Dynamic tab add/remove | New tab navigable after DOM change | Dynamic DOM |

#### Playwright accessibility tests

| Test | Asserts |
|---|---|
| aXe passes — horizontal | No WCAG violations |
| aXe passes — vertical | No WCAG violations |
| ARIA snapshot — selected tab | Roles, `aria-selected`, panel visibility correct |
| Keyboard: Tab into tablist | Focus on selected (or first) tab |
| Keyboard: Tab out to panel | Focus moves to active panel |
| Keyboard: arrows within tablist | Focus moves between tabs, wraps |
| Keyboard: Enter/Space (manual) | Selection changes on activation key |
| Screen reader: tab name | Accessible name matches content |
| Screen reader: selection announced | `aria-selected` changes announced |
| Contrast / focus | Selected vs unselected and focus ring discernible |

#### Manual verification

##### ARIA

| ID | Test | Steps | Expected |
|---|---|---|---|
| A-01 | Tablist role | Inspect inner wrapper | `role="tablist"` |
| A-02 | Tablist name | `label="Product details"` | `aria-label="Product details"` |
| A-03 | Tab role | Inspect each `swc-tab` | `role="tab"` |
| A-04 | Panel role | Inspect each `swc-tab-panel` | `role="tabpanel"` |
| A-05 | `aria-selected` | Select Tab 2 | Only Tab 2 is `aria-selected="true"` |
| A-06 | `aria-controls` | Inspect tab | References associated panel `id` |
| A-07 | `aria-labelledby` | Inspect panel | References controlling tab `id` |
| A-08 | `aria-orientation` (horizontal) | `direction="horizontal"` | No `aria-orientation` or `"horizontal"` on tablist element |
| A-09 | `aria-orientation` (vertical) | `direction="vertical"` | `aria-orientation="vertical"` on same element as `role="tablist"` |
| A-10 | Hidden panels | Select Tab 1 | Inactive panels have `hidden` or `aria-hidden="true"` |
| A-11 | Active panel `tabindex` | Select Tab 1 | Tab 1 panel has `tabindex="0"` |

##### Keyboard — horizontal

| ID | Test | Steps | Expected |
|---|---|---|---|
| K-01 | Tab into tablist | Tab key | Focus on selected (or first) tab |
| K-02 | Right Arrow | From Tab 1 | Focus moves to Tab 2 |
| K-03 | Left Arrow | From Tab 2 | Focus moves to Tab 1 |
| K-04 | Wrap (right) | From last tab, Right Arrow | Wraps to first tab |
| K-05 | Wrap (left) | From first tab, Left Arrow | Wraps to last tab |
| K-06 | Home | From Tab 3 | Focus on first tab |
| K-07 | End | From Tab 1 | Focus on last tab |
| K-08 | Tab to panel | From any tab | Focus moves to active `tabpanel` |
| K-09 | Shift+Tab from panel | From panel | Focus returns to tablist |
| K-10 | Up/Down ignored | Horizontal tablist | No focus movement |
| K-11 | Memory re-entry | Focus Tab 3, Tab out, Shift+Tab back | Returns to Tab 3 |

##### Keyboard — vertical

| ID | Test | Steps | Expected |
|---|---|---|---|
| V-01 | Down Arrow | `direction="vertical"`, from Tab 1 | Focus moves to Tab 2 |
| V-02 | Up Arrow | From Tab 2 | Focus moves to Tab 1 |
| V-03 | Wrap (down) | From last tab | Wraps to first |
| V-04 | Wrap (up) | From first tab | Wraps to last |
| V-05 | Left/Right ignored | Vertical tablist | No focus movement |

##### Activation modes

| ID | Test | Steps | Expected |
|---|---|---|---|
| M-01 | Manual — arrows don't select | Arrow to Tab 2 | Tab 1 remains selected |
| M-02 | Manual — Enter selects | Enter on Tab 2 | Tab 2 selected, panel updates |
| M-03 | Manual — Space selects | Space on Tab 3 | Tab 3 selected |
| M-04 | Automatic — arrow selects | `keyboard-activation="automatic"`, arrow to Tab 2 | Tab 2 selected immediately |
| M-05 | Click always activates | Either mode, click Tab 3 | Tab 3 selected |

##### Disabled state

| ID | Test | Steps | Expected |
|---|---|---|---|
| D-01 | Disabled tab focusable | Arrow to disabled Tab 2 | Tab 2 receives focus, announced disabled |
| D-02 | Disabled tab — Enter blocked | Enter on disabled tab | No selection change |
| D-03 | Disabled tab — Space blocked | Space on disabled tab | No selection change |
| D-04 | Disabled tab — click blocked | Click disabled tab | No selection change |
| D-05 | Disabled tablist | `disabled` on `swc-tabs` | No interaction; `aria-disabled="true"` on tablist |
| D-06 | Native `disabled` fallthrough | Tab with native `disabled` | Focus skips element; `tabindex="0"` on next eligible tab |

##### RTL support

| ID | Test | Steps | Expected |
|---|---|---|---|
| R-01 | Right Arrow (RTL) | `dir="rtl"`, Right Arrow | Focus moves to previous tab |
| R-02 | Left Arrow (RTL) | `dir="rtl"`, Left Arrow | Focus moves to next tab |
| R-03 | Vertical unaffected | `dir="rtl"`, vertical | Down Arrow still moves to next tab |

##### Screen reader matrix

| ID | Reader + browser | Test | Expected |
|---|---|---|---|
| SR-01 | VoiceOver + Safari | Navigate into tablist | "Tab 1, selected, tab, 1 of 3" |
| SR-02 | VoiceOver + Safari | Arrow to unselected | "Tab 2, tab, 2 of 3" |
| SR-03 | VoiceOver + Safari | Arrow to disabled | "Tab 2, dimmed, tab" |
| SR-04 | VoiceOver + Safari | Tab to panel | Panel content announced |
| SR-05 | NVDA + Chrome | Navigate into tablist | "Tab 1, selected, tab" |
| SR-06 | NVDA + Chrome | Arrow and activate | Selection change announced |
| SR-07 | NVDA + Chrome | Disabled tab | "Tab 2, unavailable" |
| SR-08 | JAWS + Chrome | Navigate, arrow, activate | Tab name and selection state announced |

##### Dynamic tabs and overflow

| ID | Test | Steps | Expected |
|---|---|---|---|
| DY-01 | Add tab | Append 4th tab + panel | ARIA wired; new tab navigable |
| DY-02 | Remove selected tab | Remove Tab 2 (selected) | Selection falls to another tab |
| DY-03 | Overflow scroll buttons | Many tabs overflow | Scroll buttons appear with accessible labels |
| DY-04 | Keyboard scroll | Arrow past visible tabs | Tablist scrolls to keep focused tab visible |

#### Visual regression

- [ ] Add VRT coverage for `direction` and `density` values
- [ ] Add visual regression for selection indicator animation
- [ ] Add high-contrast coverage for selected, unselected, disabled, and focus states
- [ ] Add focus-visible regression coverage

### Documentation

- [ ] JSDoc on all public properties, methods, events, and slots
- [ ] Storybook stories: Playground, Overview, Anatomy, Directions, visual variants, sizes, states, activation modes, accessibility
- [ ] Consumer migration guide updated with all finalized breaking changes (B1–B26)
- [ ] Document `direction="vertical-right"` removal and migration path (B13)
- [ ] Document `enableTabsScroll` rename (B14)
- [ ] Document module-level export removal (B15)
- [ ] Document disabled tab keyboard behavior reversal (B9)
- [ ] Document CSS deep import removal (B18)
- [ ] Update migration status table

### Review

- [ ] `yarn lint:2nd-gen` passes
- [ ] All tests pass
- [ ] Storybook verified visually
- [ ] Status table updated
- [ ] Compare implementation and Storybook copy to this plan and to `2nd-gen/packages/swc/components/tabs/migration.md`; call out any API or checklist drift in the PR.

---

## Blockers and open questions

### Open — architecture and behavior

| # | Item | Blocking? | Owner |
|---|---|---|---|
| **Q3** | Cross-root ARIA: how will `aria-controls` / `aria-labelledby` ID references resolve if 2nd-gen changes the DOM arrangement? | **Yes** | Implementation |
| **Q4** | Should `direction="vertical-right"` be carried forward? Not in Spectrum CSS or Spectrum Design (vertical orientation only; no right-side variant). This is a 1st-gen SWC-only addition that controls which side the selection indicator renders on. **Recommendation: drop it.** Consumers can achieve the same layout with CSS. | No | Design |
| **Q7** | Event naming: keep `change` as-is or rename to `swc-change`? Per the [JSDoc standards guide](../../../02_style-guide/02_typescript/07_jsdoc-standards.md), DOM-style names are preferred and `swc-` is reserved for custom events with no native equivalent. **Needs team alignment — flag for sync discussion.** | **Yes** | API reviewer |

### Open — scope and prerequisites

| # | Item | Blocking? | Owner |
|---|---|---|---|
| **Q9** | Module-level exports (`ScaledIndicator`, scroll helpers) — scroll helpers deferred with overflow (Q5). `ScaledIndicator` is an internal detail. Default to internalizing unless a consumer use case is identified. | No | Implementation |
| **Q10** | `selectionIndicatorStyle` / `shouldAnimate` — internal rendering mechanics, not public API. Re-implement as needed for the selection indicator animation but do not expose as public properties. | No | Implementation |
| **Q12** | `--highcontrast-tabs-*` tokens — per [forced-colors requirements](../../../02_style-guide/01_css/01_component-css.md#forced-colors-requirements), only add overrides if an actual problem is observed. Tabs is an invented control, so overrides are likely needed. Verify during implementation. | No | CSS reviewer / Implementation |
| **Q13** | 1st-gen test gaps (no RTL tests, no `memory` re-entry test, limited disabled tests) — ensure 2nd-gen tests fill these. | No | Test author |
| **Q15** | `slot="tab-panel"` auto-assignment — 1st-gen sets `this.slot = 'tab-panel'` in `firstUpdated`. Should 2nd-gen preserve this or require explicit `slot` attributes? Changing this silently breaks all existing tab-panel usage. | No | Implementation |
| **Q20** | Storybook documentation structure: Tabs is the first multi-element component. Should all child component APIs (`swc-tab`, `swc-tab-panel`) be documented on a single "Tabs" Storybook page, or should each have its own page? | No | Documentation / Team |

### Resolved decisions

| # | Decision | Resolution |
|---|---|---|
| **Q1** | 2nd-gen keyboard controller readiness | `FocusgroupNavigationController` merged into `main` on 2026-04-16 ([#6129](https://github.com/adobe/spectrum-web-components/pull/6129)). **Initial ship:** tabs implement roving tabindex and keyboard navigation in **`TabsBase`** (no hard dependency on the controller). **Optional follow-up:** refactor onto the controller for wrap, typeahead, memory, and consistency with other 2nd-gen focus groups. |
| **Q2** | `Focusable` mixin disposition | Not needed. Roving tabindex and tablist keyboard behavior are handled in **`TabsBase`**. `swc-tabs` uses `delegatesFocus` on its shadow root instead. The `focusElement` getter is dropped (B10). |
| **Q5** | `sp-tabs-overflow` migration scope | Deferred to phase 2. S2 Picker-based collapse requires design alignment and `swc-picker` availability. Porting scroll-based overflow would be throwaway work. |
| **Q6** | `enableTabsScroll` rename | Deferred with overflow to phase 2 (Q5, Q19). |
| **Q8** | Default size | **Shipped:** no `size` attribute on `swc-tabs`; default S2 typography scale only. See B12. |
| **Q11** | `<label>` element inside `sp-tab` shadow DOM | Internal DOM structure is not a consumer API contract. Shadow DOM internals do not belong in consumer migration guides. No action needed. |
| **Q14** | Public scroll API (`scrollTabs`, `scrollToSelection`, `scrollState`) | Not ported in phase 1. Scroll API only exists to support `sp-tabs-overflow`, which is deferred. Will be revisited in phase 2. |
| **Q19** | Overflow pattern (scroll vs Picker collapse) | Deferred to phase 2. Scroll-based `sp-tabs-overflow` will not be ported. Phase 2 will implement S2 Picker-based collapse once design alignment and `swc-picker` are available. Consumers should remain on 1st-gen `sp-tabs-overflow` until then. |
| **Q16–Q18** | Spectrum Design–aligned API (`keyboardActivation`, `density`, drop `emphasized` / `quiet` / `size` on host) | **Shipped** for `swc-tabs`; see [Implementation status](#implementation-status-initial-2nd-gen-ship) and **`migration.md`**. |

---

## References

- [Washing machine workflow](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md)
- [CSS style guide — Custom properties](../../../02_style-guide/01_css/02_custom-properties.md)
- [1st-gen source](../../../../1st-gen/packages/tabs/src/)
- [1st-gen tests](../../../../1st-gen/packages/tabs/test/)
- [Consumer migration guide](../../../../2nd-gen/packages/swc/components/tabs/migration.md)
- [WAI-ARIA 1.2](https://www.w3.org/TR/wai-aria-1.2/)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [Using ARIA (read this first)](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/)
- [WAI-ARIA APG: Tabs pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)
- [WAI-ARIA APG: Tabs with automatic activation](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/examples/tabs-automatic/)
- [WAI-ARIA APG: Tabs with manual activation](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/examples/tabs-manual/)
- [Deque University: Tabpanel](https://dequeuniversity.com/library/aria/tabpanel)
- [Inclusive Components: Tabbed interfaces](https://inclusive-components.design/tabbed-interfaces/)
- [Spectrum Design Tabs](https://react-spectrum.adobe.com/react-spectrum/Tabs.html)
- [2nd-gen keyboard controller PR #6129](https://github.com/adobe/spectrum-web-components/pull/6129)
- SWC-1898: Tabs Epic
