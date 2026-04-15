<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Tabs / Tabs — 2nd-gen migration plan

<!-- Document title (editable) -->

# Tabs — 2nd-gen migration plan

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [1. 1st-gen API surface](#1-1st-gen-api-surface)
    - [sp-tabs (`Tabs`)](#sp-tabs-tabs)
    - [sp-tab (`Tab`)](#sp-tab-tab)
    - [sp-tab-panel (`TabPanel`)](#sp-tab-panel-tabpanel)
    - [sp-tabs-overflow (`TabsOverflow`)](#sp-tabs-overflow-tabsoverflow)
    - [CSS custom properties](#css-custom-properties)
- [2. Dependencies](#2-dependencies)
- [3. Breaking changes](#3-breaking-changes)
    - [3.1 Tag names](#31-tag-names)
    - [3.2 Package rename](#32-package-rename)
    - [3.3 Import path changes](#33-import-path-changes)
    - [3.4 CSS custom properties](#34-css-custom-properties)
    - [3.5 `direction="vertical-right"` evaluation](#35-directionvertical-right-evaluation)
    - [3.6 `sp-tabs-scroll` event rename](#36-sp-tabs-scroll-event-rename)
    - [3.7 Keyboard controller change](#37-keyboard-controller-change)
    - [3.8 Default size](#38-default-size)
    - [3.9 `selectionIndicatorStyle` and `shouldAnimate`](#39-selectionindicatorstyle-and-shouldanimate)
- [4. Migration checklist](#4-migration-checklist)
    - [Phase 1 — Preparation](#phase-1--preparation)
    - [Phase 2 — Setup](#phase-2--setup)
    - [Phase 3 — API migration](#phase-3--api-migration)
    - [Phase 4 — Styling](#phase-4--styling)
    - [Phase 5 — Accessibility](#phase-5--accessibility)
    - [Phase 6 — Testing](#phase-6--testing)
    - [Phase 7 — Documentation](#phase-7--documentation)
    - [Phase 8 — Review](#phase-8--review)
- [5. Testing plan (red/green TDD)](#5-testing-plan-redgreen-tdd)
    - [Unit tests — red first](#unit-tests--red-first)
    - [Accessibility tests — Playwright](#accessibility-tests--playwright)
- [6. Open questions](#6-open-questions)
- [7. Reference](#7-reference)

</details>

<!-- Document content (editable) -->

> **Input documents**
> - [Rendering & styling migration analysis](./rendering-and-styling-migration-analysis.md)
> - [Accessibility migration analysis](./accessibility-migration-analysis.md)
> - [Washing machine workflow](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md)
> - 1st-gen source: `1st-gen/packages/tabs/src/`
> - 1st-gen tests: `1st-gen/packages/tabs/test/`

---

## 1. 1st-gen API surface

### sp-tabs (`Tabs`)

| Property | Type | Default | Reflected | Notes |
|---|---|---|---|---|
| `auto` | `boolean` | `false` | No | Automatic activation — selection follows focus |
| `compact` | `boolean` | `false` | Yes | Tabs displayed closer together |
| `direction` | `'horizontal' \| 'vertical' \| 'vertical-right'` | `'horizontal'` | Yes | Tablist orientation |
| `emphasized` | `boolean` | `false` | Yes | Visually emphasized style |
| `label` | `string` | `''` | No | `aria-label` for the tablist |
| `enableTabsScroll` | `boolean` | `false` | No | Enable horizontal scroll on tab list |
| `quiet` | `boolean` | `false` | Yes | Display without divider |
| `selected` | `string` | `''` | Yes | `value` of the selected tab |
| `size` | `ElementSize` | none | Yes | From `SizedMixin` with `noDefaultSize: true` |
| `disabled` | `boolean` | `false` | Yes | From `Focusable` base class |
| `selectionIndicatorStyle` | `string` | (no selection) | `attribute: false` | Inline style for the indicator |
| `shouldAnimate` | `boolean` | `false` | `attribute: false` | Animation toggle |

**Methods:**

| Method | Signature | Description |
|---|---|---|
| `scrollTabs` | `(delta: number, behavior?: ScrollBehavior): void` | Scrolls the tab list horizontally |
| `scrollToSelection` | `(): Promise<void>` | Scrolls the selected tab into view |
| `scrollState` | getter → `{ canScrollLeft, canScrollRight }` | RTL-aware scroll state |
| `focusElement` | getter → `Tab \| this` | Returns the focusable element |

**Events:**

| Event | Detail | Bubbles | Composed | Notes |
|---|---|---|---|---|
| `change` | none | No | No | Cancelable; `preventDefault()` reverts selection |
| `sp-tabs-scroll` | none | Yes | Yes | Fired on scroll of the tab list |

**Slots:**

| Slot | Description |
|---|---|
| Default | `sp-tab` elements |
| `tab-panel` | `sp-tab-panel` elements |

**CSS parts:**

| Part | Description |
|---|---|
| `tablist` | The `#list` container div |

### sp-tab (`Tab`)

| Property | Type | Default | Reflected | Notes |
|---|---|---|---|---|
| `disabled` | `boolean` | `false` | Yes | |
| `label` | `string` | `''` | Yes | Fallback text label when slot is empty |
| `selected` | `boolean` | `false` | Yes | Set by parent `sp-tabs` |
| `vertical` | `boolean` | `false` | Yes | Vertical orientation styling |
| `value` | `string` | `''` | Yes | Unique ID, used for tab-panel matching |

**Slots:**

| Slot | Description |
|---|---|
| Default | Text label of the tab |
| `icon` | Optional icon displayed beside the label |

**ARIA (set in code):**

- `role="tab"` (in `firstUpdated`)
- `aria-selected` (synced with `selected`)
- `aria-disabled` (synced with `disabled`)
- `aria-controls` (set by parent via `managePanels`)
- `tabindex` `0` / `-1` (roving tabindex, synced with `selected`)
- Auto-generated `id` if not provided: `sp-tab-${randomID()}`

### sp-tab-panel (`TabPanel`)

| Property | Type | Default | Reflected | Notes |
|---|---|---|---|---|
| `selected` | `boolean` | `false` | Yes | Visibility controlled by parent |
| `value` | `string` | `''` | Yes | Matched against `sp-tab` value |

**Slots:**

| Slot | Description |
|---|---|
| Default | Panel body content |

**ARIA (set in code):**

- `role="tabpanel"` (in `firstUpdated`)
- `aria-labelledby` (set by parent via `managePanels`)
- `aria-hidden="true"` when not selected; removed when selected
- `tabindex` `0` / `-1` based on selection; focus-in/out handlers adjust tabindex
- `slot="tab-panel"` set programmatically in `firstUpdated`
- Auto-generated `id`: `sp-tab-panel-${randomID()}`

### sp-tabs-overflow (`TabsOverflow`)

| Property | Type | Default | Reflected | Notes |
|---|---|---|---|---|
| `compact` | `boolean` | `false` | Yes | |
| `label-previous` | `string` | `'Scroll to previous tabs'` | Yes | Accessible label for scroll-left button |
| `label-next` | `string` | `'Scroll to next tabs'` | Yes | Accessible label for scroll-right button |
| `size` | `ElementSize` | `'m'` | Yes | From `SizedMixin` (standard defaults) |

**Slots:**

| Slot | Description |
|---|---|
| Default | Expects `sp-tabs` |

### CSS custom properties

**sp-tabs (host / overrides):**

| Property | Description |
|---|---|
| `--swc-tabs-list-justify-content` | Justify content of the `#list` container |
| `--spectrum-tabs-font-weight` | System override via `--system-tabs-font-weight` |
| `--spectrum-tabs-divider-background-color` | System override via `--system-tabs-divider-background-color` |
| `--spectrum-tabs-item-height` | Tab item height per size |
| `--spectrum-tabs-color` | Tab item text color |
| `--spectrum-tabs-selection-indicator-color` | Selection indicator color |
| `--spectrum-tabs-animation-duration` | Selection indicator animation duration |

**sp-tabs-overflow:**

| Property | Description |
|---|---|
| `--sp-tabs-overflow-next-button-right` | Right position of next scroll button |
| `--sp-tabs-overflow-previous-button-left` | Left position of previous scroll button |
| `--sp-tabs-overflow-button-height` | Height of scroll buttons |
| `--sp-tabs-overflow-button-size` | Size of scroll buttons |
| `--sp-tabs-overflow-icon-color` | Chevron icon color |
| `--sp-tabs-overflow-shadow-color` | Edge shadow color |
| `--sp-tabs-overflow-shadow-width` | Edge shadow width |

---

## 2. Dependencies

| Dependency | 1st-gen source | 2nd-gen equivalent | Status |
|---|---|---|---|
| `Focusable` mixin | `@spectrum-web-components/shared` | TBD — may not be needed if focus is managed via controller | **Open** |
| `SizedMixin` | `@spectrum-web-components/base` | `2nd-gen/packages/core/mixins/sized-mixin.ts` | Available |
| `RovingTabindexController` | `@spectrum-web-components/reactive-controllers` | `FocusgroupNavigationController` ([#6129](https://github.com/adobe/spectrum-web-components/pull/6129)) | **Open — depends on #6129** |
| `FocusVisiblePolyfillMixin` | `@spectrum-web-components/shared` | TBD — evaluate if still needed | **Open** |
| `ObserveSlotPresence` | `@spectrum-web-components/shared` | TBD — may use native Lit slot change | **Open** |
| `ObserveSlotText` | `@spectrum-web-components/shared` | TBD — may use native Lit slot change | **Open** |
| `IntersectionController` | `@lit-labs/observers` | Evaluate need; may simplify indicator updates | **Open** |
| `ResizeController` | `@lit-labs/observers` | Evaluate need; used for indicator resize updates | **Open** |
| `sp-action-button` | `@spectrum-web-components/action-button` | `swc-action-button` (when migrated) | **Blocked — depends on action-button migration** |
| `sp-icon-chevron100` | `@spectrum-web-components/icons-ui` | TBD — evaluate icon approach in 2nd-gen | **Open** |
| `SpectrumElement` | `@spectrum-web-components/base` | `2nd-gen/packages/core/element/spectrum-element.ts` | Available |

---

## 3. Breaking changes

### 3.1 Tag names

| 1st-gen | 2nd-gen |
|---|---|
| `sp-tabs` | `swc-tabs` |
| `sp-tab` | `swc-tab` |
| `sp-tab-panel` | `swc-tab-panel` |
| `sp-tabs-overflow` | `swc-tabs-overflow` |

### 3.2 Package rename

```bash
# Before
yarn add @spectrum-web-components/tabs

# After
yarn add @adobe/spectrum-wc
```

### 3.3 Import path changes

```ts
// Before
import '@spectrum-web-components/tabs/sp-tabs.js';
import '@spectrum-web-components/tabs/sp-tab.js';
import '@spectrum-web-components/tabs/sp-tab-panel.js';

// After
import '@adobe/spectrum-wc/tabs';
```

### 3.4 CSS custom properties

All `--mod-tabs-*` and `--spectrum-tabs-*` custom properties will be removed. Consumers must migrate to `--swc-tabs-*` equivalents (names TBD during implementation).

### 3.5 `direction="vertical-right"` evaluation

The `vertical-right` direction value is a 1st-gen SWC addition not present in Spectrum CSS. Evaluate whether to carry forward or deprecate. If deprecated, consumers using `direction="vertical-right"` must switch to `direction="vertical"` with CSS for right-side positioning.

### 3.6 `sp-tabs-scroll` event rename

The `sp-tabs-scroll` event should be renamed to follow 2nd-gen naming conventions (e.g. `swc-tabs-scroll` or a more generic pattern). Consumers listening for `sp-tabs-scroll` must update their event listeners.

### 3.7 Keyboard controller change

Internal change from `RovingTabindexController` to `FocusgroupNavigationController`. Not a public API change, but keyboard behavior should be verified to ensure parity.

### 3.8 Default size

1st-gen uses `SizedMixin` with `noDefaultSize: true`, meaning no default size attribute is set. 2nd-gen should evaluate whether to set `size="m"` as a default to match Spectrum 2 defaults.

### 3.9 `selectionIndicatorStyle` and `shouldAnimate`

These are `attribute: false` properties used internally. They should not be carried forward as public API. If consumers reference them, they must migrate to alternative approaches.

---

## 4. Migration checklist

### Phase 1 — Preparation

- [ ] Component analysis complete (this document)
- [ ] Accessibility analysis reviewed (see [accessibility migration analysis](./accessibility-migration-analysis.md))
- [ ] Breaking changes documented and reviewed by team
- [ ] File layout agreed (4 elements × core + SWC)
- [ ] Dependencies evaluated (esp. `FocusgroupNavigationController` readiness)

### Phase 2 — Setup

- [ ] Create `2nd-gen/packages/core/components/tabs/` with:
  - [ ] `Tabs.base.ts` — tablist host behavior, selection, `auto` activation
  - [ ] `Tab.base.ts` — individual tab behavior
  - [ ] `TabPanel.base.ts` — panel visibility, focus management
  - [ ] `Tabs.types.ts` — shared types (`TabDirection`, `TabSize`, etc.)
  - [ ] `index.ts`
- [ ] Create `2nd-gen/packages/swc/components/tabs/` with:
  - [ ] `Tabs.ts` — extends `TabsBase`; adds `render()`, styles, element registration
  - [ ] `Tab.ts` — extends `TabBase`; adds `render()`, styles, element registration
  - [ ] `TabPanel.ts` — extends `TabPanelBase`; adds `render()`, styles
  - [ ] `tabs.css`, `tab.css`, `tab-panel.css`
  - [ ] `index.ts`
  - [ ] `stories/`, `test/`
- [ ] Wire up exports in `package.json`
- [ ] Verify build passes with stub implementation

### Phase 3 — API migration

- [ ] Define types in `Tabs.types.ts`:
  - [ ] `TabDirection` — `'horizontal' | 'vertical'` (evaluate `vertical-right`)
  - [ ] `VALID_SIZES` — `['s', 'm', 'l', 'xl']`
  - [ ] `VALID_DIRECTIONS`
- [ ] `TabsBase`:
  - [ ] `auto` (boolean, default `false`)
  - [ ] `compact` (boolean, reflected)
  - [ ] `direction` (reflected, validated against `VALID_DIRECTIONS`)
  - [ ] `emphasized` (boolean, reflected)
  - [ ] `label` (string, `aria-label` for tablist)
  - [ ] `quiet` (boolean, reflected)
  - [ ] `selected` (string, reflected)
  - [ ] `disabled` (boolean, reflected)
  - [ ] `size` from `SizedMixin` — evaluate default
  - [ ] Static `readonly` arrays for validation
  - [ ] `window.__swc.warn()` for invalid combinations
- [ ] `TabBase`:
  - [ ] `disabled`, `label`, `selected`, `vertical`, `value`
- [ ] `TabPanelBase`:
  - [ ] `selected`, `value`
- [ ] Mark internal helpers with `@internal`
- [ ] Add JSDoc for all public properties

### Phase 4 — Styling

- [ ] Migrate CSS from Spectrum 2 tokens (requires spectrum-css `spectrum-two` branch)
- [ ] Replace `--spectrum-tabs-*` / `--mod-tabs-*` with `--swc-tabs-*` tokens
- [ ] Implement size token mappings using `--swc-tab-item-*` tokens from `tokens.css`
- [ ] Selection indicator animation with token-based duration
- [ ] Quiet, compact, and emphasized visual variants
- [ ] Vertical orientation layout
- [ ] Run `stylelint` and fix all errors

### Phase 5 — Accessibility

Per the [accessibility migration analysis](./accessibility-migration-analysis.md):

- [ ] `swc-tabs` inner wrapper: `role="tablist"`, `aria-label`
- [ ] `swc-tab`: `role="tab"`, `aria-selected`, `aria-controls`, roving `tabindex`
- [ ] `swc-tab-panel`: `role="tabpanel"`, `aria-labelledby`, `aria-hidden` / `hidden` for inactive
- [ ] `aria-orientation="vertical"` when direction is vertical
- [ ] `aria-disabled` on host and individual tabs when disabled
- [ ] Migrate from `RovingTabindexController` to `FocusgroupNavigationController`
- [ ] Implement automatic vs manual activation:
  - [ ] Manual (default): arrows move focus; Enter/Space select
  - [ ] Automatic (`auto`): arrows move focus and select
- [ ] Tab key moves focus from tablist to panel content
- [ ] Home/End keys within the tablist (if supported by `FocusgroupNavigationController`)
- [ ] Cross-root ARIA: ensure `aria-controls` / `aria-labelledby` ID references resolve correctly in composed DOM
- [ ] `tabindex="0"` on `tabpanel` for keyboard access per APG
- [ ] Playwright ARIA snapshot tests for both activation modes

### Phase 6 — Testing

- [ ] Unit tests (`test/tabs.test.ts`):
  - [ ] Default rendering — three elements compose correctly
  - [ ] Selection state — `selected` attribute updates, `aria-selected` synced
  - [ ] Tab-panel association — `aria-controls` / `aria-labelledby` wired correctly
  - [ ] `change` event — fires on selection, cancelable with `preventDefault()`
  - [ ] `auto` mode — selection follows focus on arrow keys
  - [ ] Manual mode — arrows move focus only, Enter/Space activate
  - [ ] Disabled tabs — skipped by keyboard navigation
  - [ ] Disabled tablist — all interaction blocked
  - [ ] Direction/orientation — horizontal and vertical
  - [ ] Compact, quiet, emphasized variants — class/attribute application
  - [ ] Size variants — all sizes apply correctly
  - [ ] Scroll behavior — `scrollTabs`, `scrollToSelection`, `scrollState`
  - [ ] Dynamic tabs — adding/removing tabs updates state
- [ ] Accessibility tests (`test/tabs.a11y.spec.ts`):
  - [ ] aXe checks on all story variants
  - [ ] ARIA snapshot: selected tab, unselected tabs, visible panel
  - [ ] ARIA snapshot: automatic vs manual activation
  - [ ] Keyboard navigation: Tab, arrows, Home, End, Enter, Space
  - [ ] Contrast and focus ring checks
- [ ] `sp-tabs-overflow` tests (if ported):
  - [ ] Scroll buttons appear/hide based on overflow
  - [ ] Scroll buttons have accessible labels
  - [ ] RTL support

### Phase 7 — Documentation

- [ ] JSDoc on all public properties, methods, events, and slots
- [ ] Storybook stories:
  - [ ] Playground
  - [ ] Overview
  - [ ] Anatomy (tab + icon, tab-only, tab with panel)
  - [ ] Sizes (S, M, L, XL)
  - [ ] Orientations (horizontal, vertical)
  - [ ] Compact, quiet, emphasized
  - [ ] States (default, disabled tab, disabled tablist)
  - [ ] Behaviors (auto activation, manual activation, scroll overflow)
  - [ ] Accessibility
- [ ] Consumer migration guide (`migration.md`)
- [ ] Update migration status table

### Phase 8 — Review

- [ ] Run full lint suite (`yarn lint:2nd-gen`)
- [ ] All tests pass
- [ ] Storybook verified visually
- [ ] Status table updated
- [ ] At least one engineer review before merge

---

## 5. Testing plan (red/green TDD)

The following tests should be written **before** implementation where practical, following red/green TDD:

### Unit tests — red first

| Test | What it asserts | Expected to fail until |
|---|---|---|
| Renders `role="tablist"` | The inner wrapper has `role="tablist"` | Render method implemented |
| Renders `role="tab"` on tab items | Each `swc-tab` has `role="tab"` | Tab element implemented |
| Renders `role="tabpanel"` on panels | Each `swc-tab-panel` has `role="tabpanel"` | Panel element implemented |
| Selected tab has `aria-selected="true"` | Only the selected tab has `aria-selected="true"` | Selection logic implemented |
| Unselected tabs have `aria-selected="false"` | All other tabs have `aria-selected="false"` | Selection logic implemented |
| `aria-controls` references panel ID | Tab's `aria-controls` matches panel's `id` | `managePanels` implemented |
| `aria-labelledby` references tab ID | Panel's `aria-labelledby` matches tab's `id` | `managePanels` implemented |
| `change` event fires on selection | Selecting a tab dispatches `change` | Event dispatching implemented |
| `change` event is cancelable | `preventDefault()` reverts selection | Cancelable logic implemented |
| Manual activation: arrows don't select | Arrow keys move focus without changing `selected` | Keyboard handler + controller |
| Auto activation: arrows select | Arrow keys move focus and update `selected` | `auto` + controller integration |
| Disabled tab skipped | Arrow key skips tab with `disabled` | Controller `isFocusableElement` |
| Inactive panel hidden | Non-selected panel has `aria-hidden="true"` or `hidden` | Panel visibility logic |
| Direction sets `aria-orientation` | `direction="vertical"` sets `aria-orientation="vertical"` | Direction handler |
| Size applies correctly | Each size value renders the correct size attribute/class | Size mixin integration |

### Accessibility tests — Playwright

| Test | What it asserts |
|---|---|
| aXe passes for horizontal tabs | No WCAG violations in default configuration |
| aXe passes for vertical tabs | No WCAG violations in vertical orientation |
| ARIA snapshot matches expected tree | Selected tab, panel visibility, roles correct |
| Keyboard: Tab into tablist | Focus lands on selected (or first) tab |
| Keyboard: Tab out to panel | Focus moves from tablist to active panel content |
| Keyboard: arrows within tablist | Focus moves between tabs, wraps at ends |
| Keyboard: Enter/Space selects (manual) | Tab selection changes on activation key |
| Screen reader: tab name announced | Tab accessible name matches content |
| Screen reader: selection announced | `aria-selected` changes announced |

---

## 6. Open questions

| ID | Question | Resolution |
|---|---|---|
| **OQ-1** | Should `direction="vertical-right"` be carried forward? | **Open** — not in Spectrum CSS; may be needed for specific layouts |
| **OQ-2** | Should `sp-tabs-overflow` be migrated in this epic or deferred? | **Open** — depends on `swc-action-button` availability |
| **OQ-3** | `FocusgroupNavigationController` readiness — is [#6129](https://github.com/adobe/spectrum-web-components/pull/6129) merged? | **Open** — blocks Phase 5 keyboard implementation |
| **OQ-4** | Default size: should `size="m"` be set by default, or keep `noDefaultSize`? | **Open** — Spectrum 2 defaults to M |
| **OQ-5** | `enableTabsScroll` — rename to a simpler attribute? | **Open** — camelCase attribute is unusual |
| **OQ-6** | Event naming: keep `change` or rename to `swc-change`? | **Open** — `change` is native-like and cancelable, which is the 1st-gen pattern |
| **OQ-7** | Cross-root ARIA: how will `aria-controls` / `aria-labelledby` resolve? | **Open** — see [a11y migration analysis](./accessibility-migration-analysis.md#shadow-dom-and-cross-root-aria-issues) |
| **OQ-8** | `Focusable` mixin: is it needed in 2nd-gen tabs, or should focus be managed entirely via the controller? | **Open** |

---

## 7. Reference

- 1st-gen source: `1st-gen/packages/tabs/src/` (`Tabs.ts`, `Tab.ts`, `TabPanel.ts`, `TabsOverflow.ts`)
- 1st-gen tests: `1st-gen/packages/tabs/test/` (`tabs.test.ts`, `tab.test.ts`, `tabs-overflow.test.ts`)
- Reference implementation: `2nd-gen/packages/core/components/badge/Badge.base.ts`
- CSS migration guide: `CONTRIBUTOR-DOCS/02_style-guide/01_css/04_spectrum-swc-migration.md`
- 2nd-gen testing guide: `CONTRIBUTOR-DOCS/01_contributor-guides/11_2ndgen_testing.md`
- Washing machine workflow: `CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_washing-machine-workflow.md`
- [WAI-ARIA APG: Tabs pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)
- [FocusgroupNavigationController PR #6129](https://github.com/adobe/spectrum-web-components/pull/6129)
