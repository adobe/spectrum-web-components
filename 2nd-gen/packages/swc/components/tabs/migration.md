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

| What changed          | Before (1st-gen)                                         | After (2nd-gen)                                                                                      |
| --------------------- | -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Tag names             | `sp-tabs`, `sp-tab`, `sp-tab-panel`                      | `swc-tabs`, `swc-tab`, `swc-tab-panel`                                                               |
| Package               | `@spectrum-web-components/tabs`                          | `@adobe/spectrum-wc`                                                                                 |
| Import paths          | `@spectrum-web-components/tabs/sp-tabs.js` (per-element) | `@adobe/spectrum-wc/tabs` (single import)                                                            |
| Default size          | None (no default)                                        | `m` — see [Default size changed](#default-size-changed)                                              |
| `direction` values    | `horizontal`, `vertical`, `vertical-right`               | `horizontal`, `vertical` — see [`vertical-right` removed](#vertical-right-removed)                   |
| Disabled tab keyboard | Skipped by arrow keys                                    | Focusable but not activatable — see [Disabled tab behavior](#disabled-tab-keyboard-behavior-changed) |
| Scroll event          | `sp-tabs-scroll`                                         | Not yet available — see [Overflow not yet migrated](#overflow-not-yet-migrated)                      |
| CSS custom properties | `--mod-tabs-*`, `--spectrum-tabs-*`                      | `--swc-tabs-*` — see [CSS custom properties](#css-custom-properties)                                 |
| Module-level exports  | `ScaledIndicator`, scroll helpers                        | Removed — see [Module-level exports removed](#module-level-exports-removed)                          |
| CSS deep imports      | `@spectrum-web-components/tabs/src/tabs.css.js`          | Removed — see [CSS deep imports removed](#css-deep-imports-removed)                                  |

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
<swc-tabs selected="tab-1" label="Product details">
  <swc-tab value="tab-1">Overview</swc-tab>
  <swc-tab value="tab-2">Specifications</swc-tab>
  <swc-tab-panel value="tab-1">
    <p>Overview content.</p>
  </swc-tab-panel>
  <swc-tab-panel value="tab-2">
    <p>Specifications content.</p>
  </swc-tab-panel>
</swc-tabs>
```

---

### Default size changed

In 1st-gen, `SizedMixin` was used with `noDefaultSize: true`, so no `size`
attribute was applied unless set explicitly. In 2nd-gen, the default is
`size="m"` to align with the Spectrum 2 specification.

If you relied on the implicit no-size behavior, verify the visual appearance
is acceptable or set `size` explicitly:

```html
<!-- Before: no size attribute, rendered at implicit medium styling -->
<sp-tabs selected="1" label="Example">
  <sp-tab value="1">Tab</sp-tab>
</sp-tabs>

<!-- After: size="m" is now the explicit default -->
<swc-tabs selected="1" label="Example">
  <swc-tab value="1">Tab</swc-tab>
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
<swc-tabs direction="vertical" selected="1" label="Example">
  <swc-tab value="1">Tab</swc-tab>
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
<swc-tabs selected="1" label="Example">
  <swc-tab value="1">Active</swc-tab>
  <swc-tab value="2" disabled>Disabled</swc-tab>
  <swc-tab value="3">Another</swc-tab>
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

In 2nd-gen, the `<label>` has been replaced by a `<span>`. This is an internal
shadow DOM change, but consumers targeting the `label` element inside tab
shadow DOM (via `::part()` or other selectors) must update.

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
  <span id="label">
    <slot>Tab text</slot>
  </span>
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

| Property                  | Status    | Notes                       |
| ------------------------- | --------- | --------------------------- |
| `auto`                    | Unchanged | Automatic activation mode   |
| `compact`                 | Unchanged | Compact layout              |
| `direction`               | Changed   | `vertical-right` removed    |
| `disabled`                | Unchanged | Disables entire tablist     |
| `emphasized`              | Unchanged | Emphasized visual style     |
| `label`                   | Unchanged | Accessible name for tablist |
| `quiet`                   | Unchanged | Removes divider line        |
| `selected`                | Unchanged | Value of the selected tab   |
| `size`                    | Changed   | Default is now `m`          |
| `enableTabsScroll`        | Deferred  | Not yet migrated (overflow) |
| `selectionIndicatorStyle` | Removed   | Internal property           |
| `shouldAnimate`           | Removed   | Internal property           |

### `swc-tab`

| Property   | Status    | Notes                                              |
| ---------- | --------- | -------------------------------------------------- |
| `disabled` | Changed   | Now uses `aria-disabled`; focusable via arrow keys |
| `label`    | Unchanged | Fallback text label                                |
| `selected` | Unchanged | Managed by parent                                  |
| `value`    | Unchanged | Unique identifier                                  |
| `vertical` | Unchanged | Vertical orientation styling                       |

### `swc-tab-panel`

| Property   | Status    | Notes             |
| ---------- | --------- | ----------------- |
| `selected` | Unchanged | Managed by parent |
| `value`    | Unchanged | Matches tab value |

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

- Always provide a `label` attribute on `swc-tabs` for the tablist accessible
  name.
- Use meaningful text content in each `swc-tab`. For icon-only tabs, provide
  a `label` attribute as the accessible name.
- Use the `value` attribute to link tabs to their corresponding panels.
- Avoid disabling all tabs — at least one should remain interactive.
- The `change` event is cancelable. Calling `preventDefault()` reverts the
  selection.
- Tab panels with `tabindex="0"` receive focus when the user presses Tab from
  the tablist. Inside the panel, `tabindex` is temporarily removed to avoid
  trapping focus.
