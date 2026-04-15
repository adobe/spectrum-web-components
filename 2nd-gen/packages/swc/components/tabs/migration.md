# Tabs migration guide: `sp-tabs` → `swc-tabs`

This guide covers everything you need to move from the 1st-gen tabs components
(`@spectrum-web-components/tabs`) to the 2nd-gen equivalents
(`@adobe/spectrum-wc/tabs`).

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
import '@spectrum-web-components/tabs/sp-tabs-overflow.js';

// After
import '@adobe/spectrum-wc/tabs';
```

---

## Quick reference

| What changed          | Before (1st-gen)                           | After (2nd-gen)                                                      |
| --------------------- | ------------------------------------------ | -------------------------------------------------------------------- |
| Tag names             | `sp-tabs`, `sp-tab`, `sp-tab-panel`        | `swc-tabs`, `swc-tab`, `swc-tab-panel`                               |
| Overflow tag          | `sp-tabs-overflow`                         | `swc-tabs-overflow`                                                  |
| Package               | `@spectrum-web-components/tabs`            | `@adobe/spectrum-wc`                                                 |
| Import path           | `@spectrum-web-components/tabs/sp-tabs.js` | `@adobe/spectrum-wc/tabs`                                            |
| CSS custom properties | `--mod-tabs-*`, `--spectrum-tabs-*`        | `--swc-tabs-*` — see [CSS custom properties](#css-custom-properties) |
| Scroll event          | `sp-tabs-scroll`                           | Event name TBD — see [Events](#events)                               |
| Default size          | No default (requires explicit `size`)      | `m` (medium) — see [Default size](#default-size-changed)             |

---

## Breaking changes

### Tag names

Find and replace all instances of the 1st-gen tab element tags with 2nd-gen
equivalents in your templates and HTML.

```html
<!-- Before -->
<sp-tabs selected="tab-1" label="Demo tabs">
  <sp-tab value="tab-1">Tab 1</sp-tab>
  <sp-tab value="tab-2">Tab 2</sp-tab>
  <sp-tab-panel value="tab-1">Content for Tab 1</sp-tab-panel>
  <sp-tab-panel value="tab-2">Content for Tab 2</sp-tab-panel>
</sp-tabs>

<!-- After -->
<swc-tabs selected="tab-1" label="Demo tabs">
  <swc-tab value="tab-1">Tab 1</swc-tab>
  <swc-tab value="tab-2">Tab 2</swc-tab>
  <swc-tab-panel value="tab-1">Content for Tab 1</swc-tab-panel>
  <swc-tab-panel value="tab-2">Content for Tab 2</swc-tab-panel>
</swc-tabs>
```

---

### Overflow wrapper

The overflow wrapper tag name also changes:

```html
<!-- Before -->
<sp-tabs-overflow>
  <sp-tabs selected="tab-1">
    <!-- tabs -->
  </sp-tabs>
</sp-tabs-overflow>

<!-- After -->
<swc-tabs-overflow>
  <swc-tabs selected="tab-1">
    <!-- tabs -->
  </swc-tabs>
</swc-tabs-overflow>
```

---

### Default size changed

In 1st-gen, `sp-tabs` uses `SizedMixin` with `noDefaultSize: true`, meaning no
size attribute is applied unless explicitly set. In 2nd-gen, the default size is
`m` (medium) to align with the Spectrum 2 specification.

If you relied on the implicit "no size" behavior, explicitly set the size to
match your intended appearance:

```html
<!-- Before: no default size -->
<sp-tabs selected="tab-1">
  <sp-tab value="tab-1">Tab 1</sp-tab>
</sp-tabs>

<!-- After: defaults to medium -->
<swc-tabs selected="tab-1">
  <swc-tab value="tab-1">Tab 1</swc-tab>
</swc-tabs>
```

---

### CSS custom properties

All `--mod-tabs-*` and `--spectrum-tabs-*` custom properties have been removed.
Replace them with the 2nd-gen `--swc-tabs-*` equivalents:

| Removed (1st-gen)                      | Replacement (2nd-gen)                  |
| -------------------------------------- | -------------------------------------- |
| `--mod-tabs-divider-size`              | `--swc-tabs-divider-size`              |
| `--mod-tabs-divider-background-color`  | `--swc-tabs-divider-background-color`  |
| `--mod-tabs-font-color`                | `--swc-tabs-font-color`                |
| `--mod-tabs-font-color-selected`       | `--swc-tabs-font-color-selected`       |
| `--mod-tabs-selection-indicator-color` | `--swc-tabs-selection-indicator-color` |
| `--mod-tabs-font-weight`               | `--swc-tabs-font-weight`               |
| `--mod-tabs-item-height`               | `--swc-tabs-item-height`               |
| `--mod-tabs-icon-size`                 | `--swc-tabs-icon-size`                 |
| `--mod-tabs-animation-duration`        | `--swc-tabs-animation-duration`        |

```css
/* Before */
sp-tabs {
  --mod-tabs-divider-size: 3px;
}

/* After */
swc-tabs {
  --swc-tabs-divider-size: 3px;
}
```

> Note: The `--swc-tabs-*` property names may change during implementation.
> Check the component documentation for final names.

---

### Shadow DOM structure

The internal shadow DOM structure has changed. If you target shadow internals
with `::part()` selectors, update them accordingly.

The `tablist` CSS part is preserved in 2nd-gen:

```css
/* Still works */
swc-tabs::part(tablist) {
  /* custom styles */
}
```

> Note: Accessing shadow internals via class selectors is not a public API and
> may change without notice. Use CSS custom properties and `::part()` instead.

---

### Events

| 1st-gen event    | 2nd-gen event | Notes                                                                                                     |
| ---------------- | ------------- | --------------------------------------------------------------------------------------------------------- |
| `change`         | `change`      | Unchanged — fires when the selected tab changes. Cancelable: call `preventDefault()` to revert selection. |
| `sp-tabs-scroll` | TBD           | Fired when the tab list scrolls. Event name will follow 2nd-gen conventions.                              |

```js
// Before
tabs.addEventListener('sp-tabs-scroll', handleScroll);

// After — event name TBD, may be renamed
tabs.addEventListener('swc-tabs-scroll', handleScroll);
```

---

## Preserved API

The following properties and behaviors are **unchanged** between 1st-gen and
2nd-gen:

### sp-tabs / swc-tabs

| Property     | Type      | Default        | Description                                                          |
| ------------ | --------- | -------------- | -------------------------------------------------------------------- |
| `auto`       | `boolean` | `false`        | When `true`, selection follows keyboard focus (automatic activation) |
| `compact`    | `boolean` | `false`        | Display tabs closer together                                         |
| `direction`  | `string`  | `'horizontal'` | Orientation: `'horizontal'` or `'vertical'`                          |
| `emphasized` | `boolean` | `false`        | Visually emphasized style                                            |
| `label`      | `string`  | `''`           | Accessible label (`aria-label`) for the tab list                     |
| `quiet`      | `boolean` | `false`        | Display without a divider                                            |
| `selected`   | `string`  | `''`           | `value` of the currently selected tab                                |
| `disabled`   | `boolean` | `false`        | Disables all tabs                                                    |
| `size`       | `string`  | `'m'`          | Size variant: `'s'`, `'m'`, `'l'`, `'xl'`                            |

### sp-tab / swc-tab

| Property   | Type      | Default | Description                                                |
| ---------- | --------- | ------- | ---------------------------------------------------------- |
| `disabled` | `boolean` | `false` | Disables this individual tab                               |
| `label`    | `string`  | `''`    | Fallback text label when the default slot is empty         |
| `selected` | `boolean` | `false` | Whether this tab is currently selected (managed by parent) |
| `value`    | `string`  | `''`    | Unique identifier; must match a `swc-tab-panel` value      |

### sp-tab-panel / swc-tab-panel

| Property   | Type      | Default | Description                                                 |
| ---------- | --------- | ------- | ----------------------------------------------------------- |
| `selected` | `boolean` | `false` | Whether this panel is currently visible (managed by parent) |
| `value`    | `string`  | `''`    | Must match a `swc-tab` value for association                |

### Slots

| Component       | Slot        | Description                              |
| --------------- | ----------- | ---------------------------------------- |
| `swc-tabs`      | Default     | `swc-tab` elements                       |
| `swc-tabs`      | `tab-panel` | `swc-tab-panel` elements                 |
| `swc-tab`       | Default     | Text label                               |
| `swc-tab`       | `icon`      | Optional icon displayed beside the label |
| `swc-tab-panel` | Default     | Panel body content                       |

---

## Usage examples

### Basic horizontal tabs

```html
<swc-tabs selected="overview" label="Product details">
  <swc-tab value="overview">Overview</swc-tab>
  <swc-tab value="specs">Specifications</swc-tab>
  <swc-tab value="reviews">Reviews</swc-tab>
  <swc-tab-panel value="overview">Product overview content</swc-tab-panel>
  <swc-tab-panel value="specs">Technical specifications</swc-tab-panel>
  <swc-tab-panel value="reviews">Customer reviews</swc-tab-panel>
</swc-tabs>
```

### Vertical tabs

```html
<swc-tabs selected="general" direction="vertical" label="Settings">
  <swc-tab value="general">General</swc-tab>
  <swc-tab value="privacy">Privacy</swc-tab>
  <swc-tab value="notifications">Notifications</swc-tab>
  <swc-tab-panel value="general">General settings</swc-tab-panel>
  <swc-tab-panel value="privacy">Privacy settings</swc-tab-panel>
  <swc-tab-panel value="notifications">Notification preferences</swc-tab-panel>
</swc-tabs>
```

### Tabs with icons

```html
<swc-tabs selected="photos" label="Media library">
  <swc-tab value="photos">
    <swc-icon-image slot="icon"></swc-icon-image>
    Photos
  </swc-tab>
  <swc-tab value="videos">
    <swc-icon-video slot="icon"></swc-icon-video>
    Videos
  </swc-tab>
  <swc-tab-panel value="photos">Photo gallery</swc-tab-panel>
  <swc-tab-panel value="videos">Video library</swc-tab-panel>
</swc-tabs>
```

### Automatic activation

```html
<!-- Selection follows focus — use when panel content is always available -->
<swc-tabs selected="tab-1" auto label="Quick tabs">
  <swc-tab value="tab-1">Tab 1</swc-tab>
  <swc-tab value="tab-2">Tab 2</swc-tab>
  <swc-tab-panel value="tab-1">Always-available content 1</swc-tab-panel>
  <swc-tab-panel value="tab-2">Always-available content 2</swc-tab-panel>
</swc-tabs>
```

### Compact and quiet

```html
<swc-tabs selected="tab-1" compact quiet label="Compact quiet tabs">
  <swc-tab value="tab-1">Tab 1</swc-tab>
  <swc-tab value="tab-2">Tab 2</swc-tab>
  <swc-tab-panel value="tab-1">Content 1</swc-tab-panel>
  <swc-tab-panel value="tab-2">Content 2</swc-tab-panel>
</swc-tabs>
```

### Handling selection changes

```js
const tabs = document.querySelector('swc-tabs');

tabs.addEventListener('change', (event) => {
  console.log('Selected tab:', event.target.selected);
});

// Cancel a selection change
tabs.addEventListener('change', (event) => {
  if (!canSwitch()) {
    event.preventDefault(); // Reverts to previous selection
  }
});
```

### Disabled state

```html
<swc-tabs selected="tab-1" label="Tabs with disabled items">
  <swc-tab value="tab-1">Active</swc-tab>
  <swc-tab value="tab-2" disabled>Unavailable</swc-tab>
  <swc-tab value="tab-3">Also active</swc-tab>
  <swc-tab-panel value="tab-1">Content for active tab</swc-tab-panel>
  <swc-tab-panel value="tab-2">Content for unavailable tab</swc-tab-panel>
  <swc-tab-panel value="tab-3">Content for also active tab</swc-tab-panel>
</swc-tabs>
```

---

## Accessibility

- Always provide a `label` attribute on `swc-tabs` to give the tab list an
  accessible name. Use a descriptive label (e.g. "Product details", not "Tabs").
- Each `swc-tab` must have visible text content (via the default slot or
  `label` attribute) so screen readers can announce the tab name.
- The `value` attributes on `swc-tab` and `swc-tab-panel` must match so the
  component can wire up `aria-controls` and `aria-labelledby` relationships.
- Use `auto` (automatic activation) only when all panel content is already in
  the DOM and can be shown without delay. Use the default manual activation
  when panels are lazy-loaded or expensive to render.
- Disabled tabs are skipped during keyboard navigation and announced as
  disabled to screen readers via `aria-disabled`.
- Keyboard navigation follows the
  [WAI-ARIA Tabs pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/):
  - **Tab**: Moves focus into/out of the tab list
  - **Arrow keys**: Move focus between tabs within the tab list
  - **Enter** / **Space**: Select the focused tab (manual activation mode)
  - **Home** / **End**: Move focus to the first/last tab
