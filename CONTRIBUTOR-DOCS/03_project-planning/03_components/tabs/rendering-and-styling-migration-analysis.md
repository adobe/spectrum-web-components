<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Tabs / Tabs migration roadmap

<!-- Document title (editable) -->

# Tabs migration roadmap

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Component specifications](#component-specifications)
    - [CSS](#css)
    - [SWC](#swc)
- [Comparison](#comparison)
    - [DOM structure changes](#dom-structure-changes)
    - [CSS => SWC mapping](#css--swc-mapping)
- [Summary of changes](#summary-of-changes)
    - [CSS => SWC implementation gaps](#css--swc-implementation-gaps)
    - [CSS Spectrum 2 changes](#css-spectrum-2-changes)
    - [Key migration considerations](#key-migration-considerations)
- [Resources](#resources)

</details>

<!-- Document content (editable) -->

## Component specifications

### CSS

<details>
<summary>CSS selectors</summary>

**Base component:**

- `.spectrum-Tabs`
- `.spectrum-Tabs-selectionIndicator`

**Subcomponents:**

- `.spectrum-Tabs-item`
- `.spectrum-Tabs-itemLabel`
- `.spectrum-Tabs-item-icon`

**Variants:**

- `.spectrum-Tabs--sizeS`
- `.spectrum-Tabs--sizeM`
- `.spectrum-Tabs--sizeL`
- `.spectrum-Tabs--sizeXL`
- `.spectrum-Tabs--horizontal`
- `.spectrum-Tabs--vertical`
- `.spectrum-Tabs--compact`
- `.spectrum-Tabs--quiet`
- `.spectrum-Tabs--emphasized`

**States:**

- `.is-selected`
- `.is-disabled`
- `:hover`
- `:active`
- `:focus-visible`

**Language-specific:**

- `.spectrum-Tabs-itemLabel:lang(ja)`
- `.spectrum-Tabs-itemLabel:lang(ko)`
- `.spectrum-Tabs-itemLabel:lang(zh)`

</details>

<details>
<summary>Passthroughs</summary>

- `--spectrum-tabs-font-weight`
- `--spectrum-tabs-divider-background-color`

</details>

<details>
<summary>Modifiers</summary>

- `--mod-tabs-divider-size`
- `--mod-tabs-divider-background-color`
- `--mod-tabs-font-color`
- `--mod-tabs-font-color-selected`
- `--mod-tabs-font-color-hover`
- `--mod-tabs-font-color-disabled`
- `--mod-tabs-font-color-key-focus`
- `--mod-tabs-selection-indicator-color`
- `--mod-tabs-selection-indicator-color-key-focus`
- `--mod-tabs-font-weight`
- `--mod-tabs-item-height`
- `--mod-tabs-icon-size`
- `--mod-tabs-animation-duration`

</details>

### SWC

<details>
<summary>sp-tabs attributes</summary>

- `auto` — Boolean; activate tab on keyboard focus (default `false`)
- `compact` — Boolean, reflected; tabs displayed closer together
- `direction` — `'horizontal' | 'vertical' | 'vertical-right'` (default `'horizontal'`), reflected
- `emphasized` — Boolean, reflected; visually emphasized style
- `label` — String; accessible label for the tablist (`aria-label`)
- `enableTabsScroll` — Boolean; enable horizontal scroll on the tab list
- `quiet` — Boolean, reflected; display without border/divider
- `selected` — String, reflected; `value` of the selected tab
- `size` — String (`s | m | l | xl`); from `SizedMixin` with `noDefaultSize: true`
- `disabled` — Boolean, reflected; inherited from `Focusable`

</details>

<details>
<summary>sp-tab attributes</summary>

- `disabled` — Boolean, reflected
- `label` — String, reflected; fallback text label when slot is empty
- `selected` — Boolean, reflected; set by parent `sp-tabs`
- `vertical` — Boolean, reflected; vertical orientation styling
- `value` — String, reflected; unique identifier, used for tab-panel matching

</details>

<details>
<summary>sp-tab-panel attributes</summary>

- `selected` — Boolean, reflected; visibility controlled by parent `sp-tabs`
- `value` — String, reflected; matched against `sp-tab` value for association

</details>

<details>
<summary>sp-tabs-overflow attributes</summary>

- `compact` — Boolean, reflected
- `label-previous` — String (default `'Scroll to previous tabs'`); accessible label for scroll-left button
- `label-next` — String (default `'Scroll to next tabs'`); accessible label for scroll-right button
- `size` — String; from `SizedMixin`

</details>

<details>
<summary>Slots</summary>

**sp-tabs:**

- Default slot — `sp-tab` elements
- `tab-panel` — `sp-tab-panel` elements

**sp-tab:**

- Default slot — text label
- `icon` — optional icon displayed beside the label

**sp-tab-panel:**

- Default slot — panel body content

**sp-tabs-overflow:**

- Default slot — expects `sp-tabs`

</details>

## Comparison

### DOM structure changes

<details>
<summary>Spectrum Web Components (sp-tabs):</summary>

```html
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

</details>

<details>
<summary>Legacy (CSS main branch):</summary>

```html
<div class="spectrum-Tabs spectrum-Tabs--sizeM spectrum-Tabs--horizontal">
  <div class="spectrum-Tabs-item is-selected" tabindex="0">
    <svg class="spectrum-Icon spectrum-Tabs-item-icon" focusable="false"
         aria-hidden="true"><!-- icon --></svg>
    <span class="spectrum-Tabs-itemLabel">Tab 1</span>
  </div>
  <div class="spectrum-Tabs-item" tabindex="-1">
    <span class="spectrum-Tabs-itemLabel">Tab 2</span>
  </div>
  <div class="spectrum-Tabs-selectionIndicator"
       style="transform: translateX(...)"></div>
</div>
```

</details>

<details>
<summary>Spectrum 2 (CSS spectrum-two branch):</summary>

```html
<div class="spectrum-Tabs spectrum-Tabs--sizeM spectrum-Tabs--horizontal">
  <div class="spectrum-Tabs-item is-selected" tabindex="0">
    <svg class="spectrum-Icon spectrum-Tabs-item-icon" focusable="false"
         aria-hidden="true"><!-- icon --></svg>
    <span class="spectrum-Tabs-itemLabel">Tab 1</span>
  </div>
  <div class="spectrum-Tabs-item" tabindex="-1">
    <span class="spectrum-Tabs-itemLabel">Tab 2</span>
  </div>
  <div class="spectrum-Tabs-selectionIndicator"
       style="transform: translateX(...)"></div>
</div>
```

</details>

<details>
<summary>Diff: Legacy (CSS main) → Spectrum 2 (CSS spectrum-two)</summary>

No significant structural DOM changes between CSS `main` and CSS `spectrum-two` branches. The primary differences are in token names, custom property values, and visual details (spacing, colors, indicator sizing) — the HTML structure and class names remain the same.

</details>

### CSS => SWC mapping

#### Non-color/layout selectors

| CSS selector | Attribute or slot | Status |
| --- | --- | --- |
| `.spectrum-Tabs` | Base `sp-tabs` component | Implemented |
| `.spectrum-Tabs--sizeS` | `size="s"` | Implemented |
| `.spectrum-Tabs--sizeM` | `size="m"` | Implemented |
| `.spectrum-Tabs--sizeL` | `size="l"` | Implemented |
| `.spectrum-Tabs--sizeXL` | `size="xl"` | Implemented |
| `.spectrum-Tabs--horizontal` | `direction="horizontal"` | Implemented |
| `.spectrum-Tabs--vertical` | `direction="vertical"` | Implemented |
| `.spectrum-Tabs--compact` | `compact` | Implemented |
| `.spectrum-Tabs--quiet` | `quiet` | Implemented |
| `.spectrum-Tabs--emphasized` | `emphasized` | Implemented |
| `.spectrum-Tabs-item` | `sp-tab` element | Implemented |
| `.spectrum-Tabs-itemLabel` | Default slot in `sp-tab` | Implemented |
| `.spectrum-Tabs-item-icon` | `icon` slot in `sp-tab` | Implemented |
| `.spectrum-Tabs-selectionIndicator` | `#selection-indicator` in shadow DOM | Implemented |
| `.is-selected` | `selected` attribute on `sp-tab` | Implemented |
| `.is-disabled` | `disabled` attribute on `sp-tab` / `sp-tabs` | Implemented |
| `.spectrum-Tabs-itemLabel:lang(ja)`, `.spectrum-Tabs-itemLabel:lang(ko)`, `.spectrum-Tabs-itemLabel:lang(zh)` | Language-specific styling | Implemented |

## Summary of changes

### CSS => SWC implementation gaps

**No significant gaps.** All CSS selectors from the Spectrum Tabs specification have corresponding implementations in the 1st-gen `sp-tabs` web component. The component fully covers:

- All four size variants (S, M, L, XL)
- Horizontal and vertical orientations
- Compact, quiet, and emphasized modes
- Selection indicator animation
- Icon and label slots
- Disabled state handling

### CSS Spectrum 2 changes

- **Token migration**: Spectrum 2 introduces updated token names and values for spacing, colors, and font properties. The 2nd-gen component should consume `--swc-tab-item-*` tokens from the design token system rather than `--spectrum-tabs-*` or `--mod-tabs-*` tokens.
- **Selection indicator**: The selection indicator may have updated dimensions and animation timing in Spectrum 2. Verify against the Spectrum 2 design spec.
- **Vertical-right direction**: `direction="vertical-right"` is a 1st-gen SWC addition not present in CSS. Evaluate whether to carry forward or deprecate in 2nd-gen.
- **`enableTabsScroll` and `sp-tabs-overflow`**: Scroll behavior and the overflow wrapper are 1st-gen SWC additions. Determine whether to port as-is, redesign, or defer.

### Key migration considerations

- **Three-element architecture**: Unlike simpler components, Tabs consists of three custom elements (`sp-tabs`, `sp-tab`, `sp-tab-panel`) plus an optional overflow wrapper (`sp-tabs-overflow`). Each requires a core base class and SWC concrete class.
- **`FocusgroupNavigationController`**: 1st-gen uses `RovingTabindexController` for keyboard navigation. 2nd-gen should migrate to `FocusgroupNavigationController` ([#6129](https://github.com/adobe/spectrum-web-components/pull/6129)).
- **Cross-root ARIA**: `aria-controls` (tab → panel) and `aria-labelledby` (panel → tab) rely on ID references. These must resolve correctly in the composed DOM. See the [accessibility migration analysis](./accessibility-migration-analysis.md) for details.
- **`SizedMixin` with `noDefaultSize`**: 1st-gen uses `SizedMixin(Focusable, { noDefaultSize: true })`. Evaluate whether 2nd-gen should set a default size (likely `m` per Spectrum 2).

## Resources

- [Tabs accessibility migration analysis](./accessibility-migration-analysis.md)
- [CSS migration]()
- [Spectrum 2 preview]()
- [React Spectrum Tabs](https://react-spectrum.adobe.com/react-spectrum/Tabs.html)
- [WAI-ARIA APG: Tabs pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)
