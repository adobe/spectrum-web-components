# Tabs migration guide: `sp-tabs` → `swc-tabs`

This guide covers everything you need to move from the 1st-gen tabs components
(`@spectrum-web-components/tabs`) to the 2nd-gen equivalents
(`@adobe/spectrum-wc`).

The migration involves three elements:

| 1st-gen        | 2nd-gen         |
| -------------- | --------------- |
| `sp-tabs`      | `swc-tabs`      |
| `sp-tab`       | `swc-tab`       |
| `sp-tab-panel` | `swc-tab-panel` |

---

## Installation

Remove the 1st-gen package and add the 2nd-gen equivalent:

```bash
# Remove
yarn remove @spectrum-web-components/tabs

# Add
yarn add @adobe/spectrum-wc
```

Update your imports:

```ts
// Before
import '@spectrum-web-components/tabs/sp-tabs.js';
import '@spectrum-web-components/tabs/sp-tab.js';
import '@spectrum-web-components/tabs/sp-tab-panel.js';

// After (single import registers all three elements)
import '@adobe/spectrum-wc/tabs';
```

---

## Quick reference

| What changed                                                       | Before (1st-gen)                                         | After (2nd-gen)                                                                                                     |
| ------------------------------------------------------------------ | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Tag names                                                          | `sp-tabs`, `sp-tab`, `sp-tab-panel`                      | `swc-tabs`, `swc-tab`, `swc-tab-panel`                                                                              |
| Package                                                            | `@spectrum-web-components/tabs`                          | `@adobe/spectrum-wc`                                                                                                |
| Import paths                                                       | `@spectrum-web-components/tabs/sp-tabs.js` (per-element) | `@adobe/spectrum-wc/tabs` (single import)                                                                           |
| Default size                                                       | None (no `size` on host in 1st-gen)                      | **No `size` API** — typography uses the S2 default scale only (see [S2-aligned public API](#s2-aligned-public-api)) |
| `auto` / `compact` / `quiet` / `emphasized` / `size` on `swc-tabs` | 1st-gen booleans / `SizedMixin` sizes                    | **Removed** — use `keyboard-activation` and `density` instead (see [S2-aligned public API](#s2-aligned-public-api)) |
| `keyboard-activation`                                              | N/A (1st-gen used boolean `auto`)                        | `manual` (default) or `automatic` — see [Activation model](#activation-model)                                       |
| `density`                                                          | N/A (1st-gen used boolean `compact`)                     | `regular` (default) or `compact` — see [Density](#density)                                                          |
| `direction` values                                                 | `horizontal`, `vertical`, `vertical-right`               | `horizontal`, `vertical` — see [`vertical-right` removed](#vertical-right-removed)                                  |
| Disabled tab keyboard                                              | Skipped by arrow keys                                    | Focusable but not activatable — see [Disabled tab behavior](#disabled-tab-keyboard-behavior-changed)                |
| Scroll event                                                       | `sp-tabs-scroll`                                         | Not yet available — see [Overflow not yet migrated](#overflow-not-yet-migrated)                                     |
| CSS custom properties                                              | `--mod-tabs-*`, `--spectrum-tabs-*`                      | `--swc-tabs-*` — see [CSS custom properties](#css-custom-properties)                                                |
| Module-level exports                                               | `ScaledIndicator`, scroll helpers                        | Removed — see [Module-level exports removed](#module-level-exports-removed)                                         |
| CSS deep imports                                                   | `@spectrum-web-components/tabs/src/tabs.css.js`          | Removed — see [CSS deep imports removed](#css-deep-imports-removed)                                                 |

---

## Breaking changes

### Tag names

Find and replace all instances of the three element tag names in your templates and HTML.

```html
<!-- Before -->
<sp-tabs selected="tab-1" label="Product details">
  <sp-tab value="tab-1">Overview</sp-tab>
  <sp-tab value="tab-2">Specifications</sp-tab>
  <sp-tab-panel value="tab-1">
    <p>Overview content.</p>
  </sp-tab-panel>
  <sp-tab-panel value="tab-2">
    <p>Specifications content.</p>
  </sp-tab-panel>
</sp-tabs>

<!-- After -->
<swc-tabs selected="tab-1" accessible-label="Product details">
  <swc-tab tab-id="tab-1">Overview</swc-tab>
  <swc-tab tab-id="tab-2">Specifications</swc-tab>
  <swc-tab-panel tab-id="tab-1">
    <p>Overview content.</p>
  </swc-tab-panel>
  <swc-tab-panel tab-id="tab-2">
    <p>Specifications content.</p>
  </swc-tab-panel>
</swc-tabs>
```

---

### S2-aligned public API

`swc-tabs` follows the Spectrum 2 / Spectrum Design–aligned surface from the
[tabs migration plan](../../../../CONTRIBUTOR-DOCS/03_project-planning/03_components/tabs/migration-plan.md):

- **No** `size`, `quiet`, or `emphasized` attributes on the host. Typography and
  the selection indicator use the default S2 token scale; customize with
  documented `--swc-tabs-*` / `--swc-tab-*` custom properties if needed.
- **`keyboard-activation`** (attribute `keyboard-activation`): `manual` (default)
  or `automatic`. Replaces the boolean **`auto`** from 1st-gen (`auto` →
  `keyboard-activation="automatic"`).
- **`density`**: `regular` (default) or `compact`. Replaces the boolean **`compact`**
  from 1st-gen (`compact` → `density="compact"`).

#### Activation model

```html
<!-- Before: automatic activation -->
<sp-tabs selected="1" auto label="Example">
  <sp-tab value="1">Tab</sp-tab>
</sp-tabs>

<!-- After -->
<swc-tabs
  selected="1"
  keyboard-activation="automatic"
  accessible-label="Example"
>
  <swc-tab tab-id="1">Tab</swc-tab>
</swc-tabs>
```

#### Density

```html
<!-- Before: compact spacing -->
<sp-tabs selected="1" compact label="Example">
  <sp-tab value="1">Tab</sp-tab>
</sp-tabs>

<!-- After -->
<swc-tabs selected="1" density="compact" accessible-label="Example">
  <swc-tab tab-id="1">Tab</swc-tab>
</swc-tabs>
```

---

### `vertical-right` removed

The `direction="vertical-right"` value was a 1st-gen SWC addition not present
in the Spectrum CSS specification. It has been removed in 2nd-gen. Only
`horizontal` and `vertical` are accepted.

If you set an invalid direction value, the component falls back to `horizontal`
and issues a debug warning.

```html
<!-- Before -->
<sp-tabs direction="vertical-right" selected="1" label="Example">
  <sp-tab value="1">Tab</sp-tab>
</sp-tabs>

<!-- After: use "vertical" instead -->
<swc-tabs direction="vertical" selected="1" accessible-label="Example">
  <swc-tab tab-id="1">Tab</swc-tab>
</swc-tabs>
```

---

### Disabled tab keyboard behavior changed

This is a behavioral reversal from 1st-gen.

**1st-gen:** Disabled tabs were skipped entirely by keyboard navigation. The
`RovingTabindexController` filtered them out with
`isFocusableElement: (el) => !el.disabled`, making disabled tabs unreachable
via arrow keys.

**2nd-gen:** Disabled tabs use `aria-disabled="true"` and remain **focusable**
via arrow keys per the
[WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/).
They are announced as disabled by assistive technology but cannot be activated
(Enter, Space, and click are guarded).

```html
<!-- Same markup in both generations -->
<swc-tabs selected="1" accessible-label="Example">
  <swc-tab tab-id="1">Active</swc-tab>
  <swc-tab tab-id="2" disabled>Disabled</swc-tab>
  <swc-tab tab-id="3">Another</swc-tab>
</swc-tabs>
```

**What changes for consumers:** If your application logic relied on disabled
tabs being unreachable via keyboard, verify that the new behavior is acceptable.
The disabled tab is now discoverable but still cannot be selected.

---

### `<label>` wrapper removed from `sp-tab` shadow DOM

In 1st-gen, `sp-tab` wrapped the default slot content in a
`<label id="item-label">` element inside shadow DOM. This implicit `<label>`
semantics conflicted with the `role="tab"` on the host element.

In 2nd-gen, default and icon content are projected with slots only (no wrapper
element). Consumers targeting a `label` inside tab shadow DOM must update.

```html
<!-- 1st-gen shadow DOM (internal) -->
<sp-tab>
  #shadow-root
  <slot name="icon"></slot>
  <label id="item-label">
    <slot>Tab text</slot>
  </label>
</sp-tab>

<!-- 2nd-gen shadow DOM (internal) -->
<swc-tab>
  #shadow-root
  <slot name="icon"></slot>
  <slot>Tab text</slot>
</swc-tab>
```

---

### `aria-orientation` placement fixed

In 1st-gen, `aria-orientation` was set on the `<sp-tabs>` host element, but
`role="tablist"` was on the inner `#list` element. Screen readers expect both
attributes on the same node.

In 2nd-gen, `aria-orientation` and `role="tablist"` are co-located on the same
inner container element.

**No consumer action required.** This is an internal accessibility fix.

---

### Arrow key direction fixed

In 1st-gen, `RovingTabindexController` used `direction: 'both'`, allowing all
four arrow keys in a horizontal tablist. In 2nd-gen, arrow keys are restricted
per orientation:

| Mode       | Navigation keys               |
| ---------- | ----------------------------- |
| Horizontal | Arrow Left / Arrow Right only |
| Vertical   | Arrow Up / Arrow Down only    |

**No consumer action required.** This is a behavior improvement aligned with
the WAI-ARIA APG.

---

### RTL arrow keys fixed

In 1st-gen, physical Left/Right arrow keys were used regardless of `dir="rtl"`.
In 2nd-gen, arrow keys swap automatically for RTL direction.

**No consumer action required.** This is a bug fix.

---

### CSS custom properties

All `--mod-tabs-*` and `--spectrum-tabs-*` custom properties have been removed.
Replace them with the 2nd-gen `--swc-tabs-*` equivalents. The full mapping is
not yet finalized — check the component CSS file for available custom
properties.

```css
/* Before */
sp-tabs {
  --mod-tabs-font-color: #333;
  --mod-tabs-selection-indicator-color: blue;
}

/* After — use 2nd-gen token equivalents */
swc-tabs {
  /* Check tabs.css for available --swc-tabs-* custom properties */
}
```

---

### CSS deep imports removed

1st-gen exposed individual CSS module exports:

```ts
// Before — these paths no longer exist
import '@spectrum-web-components/tabs/src/tabs.css.js';
import '@spectrum-web-components/tabs/src/tab.css.js';
import '@spectrum-web-components/tabs/src/tabs-sizes.css.js';
```

2nd-gen uses new CSS files bundled with the component. Import the component
directly instead of individual CSS modules.

---

### Module-level exports removed

The following TypeScript exports from 1st-gen are no longer available:

- `ScaledIndicator` — Internal selection indicator helper
- `calculateScrollTargetForRightSide` — Scroll positioning helper
- `calculateScrollTargetForLeftSide` — Scroll positioning helper

If you imported these, replace with local implementations or remove the
references.

---

### `rovingTabindexController` public field removed

In 1st-gen, `rovingTabindexController` was a public class field on `Tabs`
(no `private`/`protected` modifier). Consumers could access it directly:

```ts
// Before — this no longer works
const controller = tabsEl.rovingTabindexController;
```

In 2nd-gen, keyboard navigation is handled internally. There is no public
equivalent. Remove any references to this field.

---

### `focusElement` getter removed

The `focusElement` getter (inherited from the `Focusable` base class) returned
the currently focusable tab. It is not available in 2nd-gen.

```ts
// Before
const focusable = tabsEl.focusElement;

// After — use standard DOM focus APIs
tabsEl.focus();
```

**`TabsBase.focus()`** focuses the **selected slotted tab** (same outcome 1st-gen authors expected from **`focusElement`** + **`focus()`**). The host is not given a default **`tabindex`**, so **Tab** still reaches the roving tab stop (**`tabindex="0"`** on the active tab) in document order. Shadow **`delegatesFocus`** remains for engines that delegate host focus to slotted tabs when authors do focus the host.

---

### Overflow not yet migrated

`sp-tabs-overflow` has **not** been migrated to 2nd-gen in the current release.
If you rely on overflow scrolling behavior, continue using 1st-gen until
`swc-tabs-overflow` is available.

Related APIs that depended on overflow are also deferred:

- `enableTabsScroll` property
- `scrollTabs()` method
- `scrollToSelection()` method
- `scrollState` getter
- `sp-tabs-scroll` event

---

## Property reference

All public properties from 1st-gen and their 2nd-gen status:

### `swc-tabs`

| Property                  | Status               | Notes                                                        |
| ------------------------- | -------------------- | ------------------------------------------------------------ |
| `keyboard-activation`     | **New**              | `manual` (default) or `automatic`; replaces boolean `auto`   |
| `density`                 | **New**              | `regular` (default) or `compact`; replaces boolean `compact` |
| `direction`               | Changed              | `vertical-right` removed                                     |
| `disabled`                | Unchanged            | Disables entire tablist                                      |
| `accessible-label`        | Renamed from `label` | Accessible name for tablist (`aria-label`)                   |
| `selected`                | Unchanged            | Value of the selected tab                                    |
| `auto`                    | Removed              | Use `keyboard-activation="automatic"`                        |
| `compact`                 | Removed              | Use `density="compact"`                                      |
| `quiet`                   | Removed              | Not part of S2 surface; style with CSS tokens if needed      |
| `emphasized`              | Removed              | Not part of S2 surface; style with CSS tokens if needed      |
| `size`                    | Removed              | Not part of S2 surface; default typography only              |
| `enableTabsScroll`        | Deferred             | Not yet migrated (overflow)                                  |
| `selectionIndicatorStyle` | Removed              | Internal property                                            |
| `shouldAnimate`           | Removed              | Internal property                                            |

### `swc-tab`

| Property   | Status               | Notes                                              |
| ---------- | -------------------- | -------------------------------------------------- |
| `disabled` | Changed              | Now uses `aria-disabled`; focusable via arrow keys |
| `label`    | Removed              | Use `aria-label` directly for icon-only tabs       |
| `selected` | Unchanged            | Managed by parent                                  |
| `tab-id`   | Renamed from `value` | Unique identifier                                  |
| `vertical` | Unchanged            | Vertical orientation styling                       |

### `swc-tab-panel`

| Property   | Status               | Notes                |
| ---------- | -------------------- | -------------------- |
| `selected` | Unchanged            | Managed by parent    |
| `tab-id`   | Renamed from `value` | Matches tab `tab-id` |

---

## New in 2nd-gen

### Improved keyboard navigation

- Arrow keys are now restricted by orientation (Left/Right for horizontal,
  Up/Down for vertical) per the WAI-ARIA APG
- RTL arrow key swapping works automatically
- Home and End keys jump to first/last tab
- Disabled tabs are focusable but not activatable

### Better ARIA implementation

- `aria-orientation` is co-located with `role="tablist"` (fixes 1st-gen bug)
- `aria-controls` on tabs and `aria-labelledby` on panels properly link
  the elements
- `aria-disabled="true"` used instead of native `disabled` for better
  assistive technology support

---

## Accessibility

- Always provide an `accessible-label` attribute on `swc-tabs` for the tablist
  accessible name.
- Use meaningful text content in each `swc-tab`. For icon-only tabs, provide
  an `aria-label` attribute as the accessible name.
- Use the `tab-id` attribute to link tabs to their corresponding panels.
- Avoid disabling all tabs — at least one should remain interactive.
- The `change` event is cancelable. Calling `preventDefault()` reverts the
  selection.
- Tab panels with `tabindex="0"` receive focus when the user presses Tab from
  the tablist. Inside the panel, `tabindex` is temporarily removed to avoid
  trapping focus.
