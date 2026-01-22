# Tooltip migration roadmap

## Component specifications

### CSS

<details>
<summary>CSS selectors</summary>

- `.spectrum-Tooltip`
- `.spectrum-Tooltip p`
- `.spectrum-Tooltip--bottom`
- `.spectrum-Tooltip--bottom .spectrum-Tooltip-tip`
- `.spectrum-Tooltip--bottom-end`
- `.spectrum-Tooltip--bottom-end .spectrum-Tooltip-tip`
- `.spectrum-Tooltip--bottom-end .spectrum-Tooltip-tip:dir(rtl)`
- `.spectrum-Tooltip--bottom-end.is-open`
- `.spectrum-Tooltip--bottom-left`
- `.spectrum-Tooltip--bottom-left .spectrum-Tooltip-tip`
- `.spectrum-Tooltip--bottom-left.is-open`
- `.spectrum-Tooltip--bottom-right`
- `.spectrum-Tooltip--bottom-right .spectrum-Tooltip-tip`
- `.spectrum-Tooltip--bottom-right.is-open`
- `.spectrum-Tooltip--bottom-start`
- `.spectrum-Tooltip--bottom-start .spectrum-Tooltip-tip`
- `.spectrum-Tooltip--bottom-start .spectrum-Tooltip-tip:dir(rtl)`
- `.spectrum-Tooltip--bottom-start.is-open`
- `.spectrum-Tooltip--bottom.is-open`
- `.spectrum-Tooltip--end`
- `.spectrum-Tooltip--end .spectrum-Tooltip-tip`
- `.spectrum-Tooltip--end .spectrum-Tooltip-tip:dir(rtl)`
- `.spectrum-Tooltip--end-bottom`
- `.spectrum-Tooltip--end-bottom .spectrum-Tooltip-tip`
- `.spectrum-Tooltip--end-bottom .spectrum-Tooltip-tip:dir(rtl)`
- `.spectrum-Tooltip--end-bottom.is-open`
- `.spectrum-Tooltip--end-bottom.is-open:dir(rtl)`
- `.spectrum-Tooltip--end-top`
- `.spectrum-Tooltip--end-top .spectrum-Tooltip-tip`
- `.spectrum-Tooltip--end-top .spectrum-Tooltip-tip:dir(rtl)`
- `.spectrum-Tooltip--end-top.is-open`
- `.spectrum-Tooltip--end-top.is-open:dir(rtl)`
- `.spectrum-Tooltip--end.is-open`
- `.spectrum-Tooltip--end.is-open:dir(rtl)`
- `.spectrum-Tooltip--info`
- `.spectrum-Tooltip--info .spectrum-Tooltip-tip`
- `.spectrum-Tooltip--left`
- `.spectrum-Tooltip--left .spectrum-Tooltip-tip`
- `.spectrum-Tooltip--left .spectrum-Tooltip-tip:dir(rtl)`
- `.spectrum-Tooltip--left-bottom`
- `.spectrum-Tooltip--left-bottom .spectrum-Tooltip-tip`
- `.spectrum-Tooltip--left-bottom .spectrum-Tooltip-tip:dir(rtl)`
- `.spectrum-Tooltip--left-bottom.is-open`
- `.spectrum-Tooltip--left-top`
- `.spectrum-Tooltip--left-top .spectrum-Tooltip-tip`
- `.spectrum-Tooltip--left-top .spectrum-Tooltip-tip:dir(rtl)`
- `.spectrum-Tooltip--left-top.is-open`
- `.spectrum-Tooltip--left.is-open`
- `.spectrum-Tooltip--negative`
- `.spectrum-Tooltip--negative .spectrum-Tooltip-tip`
- `.spectrum-Tooltip--right`
- `.spectrum-Tooltip--right .spectrum-Tooltip-tip`
- `.spectrum-Tooltip--right .spectrum-Tooltip-tip:dir(rtl)`
- `.spectrum-Tooltip--right-bottom`
- `.spectrum-Tooltip--right-bottom .spectrum-Tooltip-tip`
- `.spectrum-Tooltip--right-bottom .spectrum-Tooltip-tip:dir(rtl)`
- `.spectrum-Tooltip--right-bottom.is-open`
- `.spectrum-Tooltip--right-top`
- `.spectrum-Tooltip--right-top .spectrum-Tooltip-tip`
- `.spectrum-Tooltip--right-top .spectrum-Tooltip-tip:dir(rtl)`
- `.spectrum-Tooltip--right-top.is-open`
- `.spectrum-Tooltip--right.is-open`
- `.spectrum-Tooltip--start`
- `.spectrum-Tooltip--start .spectrum-Tooltip-tip`
- `.spectrum-Tooltip--start .spectrum-Tooltip-tip:dir(rtl)`
- `.spectrum-Tooltip--start-bottom`
- `.spectrum-Tooltip--start-bottom .spectrum-Tooltip-tip`
- `.spectrum-Tooltip--start-bottom .spectrum-Tooltip-tip:dir(rtl)`
- `.spectrum-Tooltip--start-bottom.is-open`
- `.spectrum-Tooltip--start-bottom.is-open:dir(rtl)`
- `.spectrum-Tooltip--start-top`
- `.spectrum-Tooltip--start-top .spectrum-Tooltip-tip`
- `.spectrum-Tooltip--start-top .spectrum-Tooltip-tip:dir(rtl)`
- `.spectrum-Tooltip--start-top.is-open`
- `.spectrum-Tooltip--start-top.is-open:dir(rtl)`
- `.spectrum-Tooltip--start.is-open`
- `.spectrum-Tooltip--start.is-open:dir(rtl)`
- `.spectrum-Tooltip--top`
- `.spectrum-Tooltip--top .spectrum-Tooltip-tip`
- `.spectrum-Tooltip--top-end`
- `.spectrum-Tooltip--top-end .spectrum-Tooltip-tip`
- `.spectrum-Tooltip--top-end .spectrum-Tooltip-tip:dir(rtl)`
- `.spectrum-Tooltip--top-end.is-open`
- `.spectrum-Tooltip--top-left`
- `.spectrum-Tooltip--top-left .spectrum-Tooltip-tip`
- `.spectrum-Tooltip--top-left.is-open`
- `.spectrum-Tooltip--top-right`
- `.spectrum-Tooltip--top-right .spectrum-Tooltip-tip`
- `.spectrum-Tooltip--top-right.is-open`
- `.spectrum-Tooltip--top-start`
- `.spectrum-Tooltip--top-start .spectrum-Tooltip-tip`
- `.spectrum-Tooltip--top-start .spectrum-Tooltip-tip:dir(rtl)`
- `.spectrum-Tooltip--top-start.is-open`
- `.spectrum-Tooltip--top.is-open`
- `.spectrum-Tooltip-label`
- `.spectrum-Tooltip-tip`
- `.spectrum-Tooltip.is-open`
- `.spectrum-Tooltip:lang(ja)`, `.spectrum-Tooltip:lang(ko)`, `.spectrum-Tooltip:lang(zh)`
- `.u-tooltip-showOnHover`
- `.u-tooltip-showOnHover .spectrum-Tooltip`
- (Additional `.u-tooltip-showOnHover` descendant selectors for all placement and state combinations)

</details>

<details>
<summary>Passthroughs</summary>

None found for this component.

</details>

<details>
<summary>Modifiers</summary>

- `--mod-overlay-animation-duration`
- `--mod-overlay-animation-duration-opened`
- `--mod-tooltip-animation-distance`
- `--mod-tooltip-background-color-default`
- `--mod-tooltip-background-color-informative`
- `--mod-tooltip-background-color-negative`
- `--mod-tooltip-border-radius`
- `--mod-tooltip-cjk-line-height`
- `--mod-tooltip-content-color`
- `--mod-tooltip-font-size`
- `--mod-tooltip-font-weight`
- `--mod-tooltip-height`
- `--mod-tooltip-line-height`
- `--mod-tooltip-margin`
- `--mod-tooltip-max-inline-size`
- `--mod-tooltip-pointer-corner-spacing`
- `--mod-tooltip-spacing-block-end`
- `--mod-tooltip-spacing-block-start`
- `--mod-tooltip-spacing-inline`
- `--mod-tooltip-tip-antialiasing-inset`
- `--mod-tooltip-tip-block-size`
- `--mod-tooltip-tip-corner-radius`
- `--mod-tooltip-tip-height-percentage`
- `--mod-tooltip-tip-square-size`

</details>

### SWC

<details>
<summary>Attributes</summary>

- `delayed` - Boolean attribute for warm-up/cooldown behavior
- `disabled` - Boolean attribute to prevent self-managed tooltip from responding to user input
- `self-managed` - Boolean attribute to automatically bind to parent element
- `offset` - Number attribute for positioning offset
- `open` - Boolean attribute reflecting open state
- `placement` - Values: `top`, `top-start`, `top-end`, `right`, `right-start`, `right-end`, `bottom`, `bottom-start`, `bottom-end`, `left`, `left-start`, `left-end`
- `tip-padding` - Number attribute for tip padding
- `variant` - Values: `info`, `positive`, `negative`

</details>

<details>
<summary>Slots</summary>

- `icon` - Icon element appearing at the start of the label
- Default slot (no name) - Text label of the Tooltip

</details>

## Comparison

### DOM Structure changes

<details>
<summary>Spectrum Web Components:</summary>

```html
<!-- When self-managed=false (default) -->
<sp-tooltip-openable id="tooltip" placement="[placement]">
    <slot name="icon"></slot>
    <span id="label"><slot></slot></span>
    <span id="tip" aria-hidden="true"></span>
</sp-tooltip-openable>

<!-- When self-managed=true -->
<sp-overlay
    open="[open && !disabled && loaded]"
    delayed="[delayed]"
    disabled="[disabled]"
    offset="[offset]"
    placement="[placement]"
    type="hint"
    triggerInteraction="hover"
>
    <sp-tooltip-openable id="tooltip" placement="[placement]">
        <slot name="icon"></slot>
        <span id="label"><slot></slot></span>
        <span id="tip" aria-hidden="true"></span>
    </sp-tooltip-openable>
</sp-overlay>
```

</details>

<details>
<summary>Legacy (CSS main branch):</summary>

```html
<span
    class="spectrum-Tooltip
         spectrum-Tooltip--[variant] (if variant !== 'neutral')
         spectrum-Tooltip--[placement] (if placement)
         is-open (if isOpen)
         is-focused (if isFocused)"
    style="[customStyles]"
>
    <span class="spectrum-Tooltip-typeIcon">
        <!-- Icon component if variant -->
        <!-- Workflow icon based on variant (Info, CheckmarkCircle, or Alert) -->
    </span>
    <span class="spectrum-Tooltip-label"> [label] </span>
    <span class="spectrum-Tooltip-tip"></span>
</span>
```

</details>

<details>
<summary>Spectrum 2 (CSS spectrum-two branch):</summary>

```html
<span
    class="spectrum-Tooltip
         spectrum-Tooltip--[variant] (if variant !== 'neutral')
         spectrum-Tooltip--[placement] (if placement)
         is-open (if isOpen)
         is-focused (if isFocused)"
    style="[customStyles]"
>
    <span class="spectrum-Tooltip-label">
        <!-- No icon in Spectrum 2 -->
        [label]
    </span>
    <span class="spectrum-Tooltip-tip"></span>
</span>
```

</details>

<details>
<summary>Diff: Legacy (CSS main) → Spectrum 2 (CSS spectrum-two)</summary>

```diff
 <span
   class="spectrum-Tooltip
          spectrum-Tooltip--[variant] (if variant !== 'neutral')
          spectrum-Tooltip--[placement] (if placement)
          is-open (if isOpen)
          is-focused (if isFocused)"
   style="[customStyles]"
 >
-  <!-- Icon component rendered for info/positive/negative variants in main -->
-  <span class="spectrum-Tooltip-typeIcon">
-    <!-- Workflow icon: Info, CheckmarkCircle, or Alert -->
-  </span>
   <span class="spectrum-Tooltip-label">
     [label]
   </span>
   <span class="spectrum-Tooltip-tip"></span>
 </span>
```

**Key changes:**

- Icon component removed: Spectrum 2 no longer renders icons for `info` and `negative` variants
- The `.spectrum-Tooltip-typeIcon` element and all icon rendering logic were removed
- `positive` variant was removed from the available variants list
- Theme imports (`../themes/spectrum.css`, `../themes/express.css`) were removed
- Context parameter removed from template function signature

</details>

### CSS => SWC mapping

| CSS selector                                                                             | Attribute or slot                       | Status           |
| ---------------------------------------------------------------------------------------- | --------------------------------------- | ---------------- |
| `.spectrum-Tooltip`                                                                      | Base component                          | Implemented      |
| `.spectrum-Tooltip-label`                                                                | Default slot (wrapped in `#label` span) | Implemented      |
| `.spectrum-Tooltip-tip`                                                                  | Tip element (internal `#tip` span)      | Implemented      |
| `.spectrum-Tooltip--info`                                                                | `variant="info"`                        | Implemented      |
| `.spectrum-Tooltip--negative`                                                            | `variant="negative"`                    | Implemented      |
| `.spectrum-Tooltip--top`                                                                 | `placement="top"`                       | Implemented      |
| `.spectrum-Tooltip--top-start`                                                           | `placement="top-start"`                 | Implemented      |
| `.spectrum-Tooltip--top-end`                                                             | `placement="top-end"`                   | Implemented      |
| `.spectrum-Tooltip--right`                                                               | `placement="right"`                     | Implemented      |
| `.spectrum-Tooltip--right-start`                                                         | `placement="right-start"`               | Implemented      |
| `.spectrum-Tooltip--right-end`                                                           | `placement="right-end"`                 | Implemented      |
| `.spectrum-Tooltip--bottom`                                                              | `placement="bottom"`                    | Implemented      |
| `.spectrum-Tooltip--bottom-start`                                                        | `placement="bottom-start"`              | Implemented      |
| `.spectrum-Tooltip--bottom-end`                                                          | `placement="bottom-end"`                | Implemented      |
| `.spectrum-Tooltip--left`                                                                | `placement="left"`                      | Implemented      |
| `.spectrum-Tooltip--left-start`                                                          | `placement="left-start"`                | Implemented      |
| `.spectrum-Tooltip--left-end`                                                            | `placement="left-end"`                  | Implemented      |
| `.spectrum-Tooltip--bottom-left`                                                         |                                         | Missing from WC  |
| `.spectrum-Tooltip--bottom-right`                                                        |                                         | Missing from WC  |
| `.spectrum-Tooltip--top-left`                                                            |                                         | Missing from WC  |
| `.spectrum-Tooltip--top-right`                                                           |                                         | Missing from WC  |
| `.spectrum-Tooltip--left-bottom`                                                         |                                         | Missing from WC  |
| `.spectrum-Tooltip--left-top`                                                            |                                         | Missing from WC  |
| `.spectrum-Tooltip--right-bottom`                                                        |                                         | Missing from WC  |
| `.spectrum-Tooltip--right-top`                                                           |                                         | Missing from WC  |
| `.spectrum-Tooltip--start`                                                               |                                         | Missing from WC  |
| `.spectrum-Tooltip--start-top`                                                           |                                         | Missing from WC  |
| `.spectrum-Tooltip--start-bottom`                                                        |                                         | Missing from WC  |
| `.spectrum-Tooltip--end`                                                                 |                                         | Missing from WC  |
| `.spectrum-Tooltip--end-top`                                                             |                                         | Missing from WC  |
| `.spectrum-Tooltip--end-bottom`                                                          |                                         | Missing from WC  |
| `.spectrum-Tooltip.is-open`                                                              | `open` attribute                        | Implemented      |
| `.spectrum-Tooltip:lang(ja)`, `.spectrum-Tooltip:lang(ko)`, `.spectrum-Tooltip:lang(zh)` | Language-specific styling               | Implemented      |
| `.spectrum-Tooltip p`                                                                    | Paragraph styling within tooltip        | Implemented      |
| `.u-tooltip-showOnHover`                                                                 | Utility class                           | Missing from WC  |
| `.spectrum-Tooltip--positive`                                                            |                                         | Deprecated       |
| `icon` slot                                                                              | Icon slot                               | Implemented      |
| `delayed`                                                                                |                                         | Missing from CSS |
| `disabled`                                                                               |                                         | Missing from CSS |
| `self-managed`                                                                           |                                         | Missing from CSS |
| `offset`                                                                                 |                                         | Missing from CSS |
| `tip-padding`                                                                            |                                         | Missing from CSS |

## Summary of changes

### CSS => SWC implementation gaps

**Missing from WC:**

- Legacy placement values: `bottom-left`, `bottom-right`, `top-left`, `top-right`, `left-bottom`, `left-top`, `right-bottom`, `right-top`
- Logical placement values: `start`, `start-top`, `start-bottom`, `end`, `end-top`, `end-bottom`
- Utility class `.u-tooltip-showOnHover` for hover-triggered tooltips

**Missing from CSS:**

- `delayed` attribute for warm-up/cooldown behavior
- `disabled` attribute for self-managed tooltips
- `self-managed` attribute for automatic parent binding
- `offset` attribute for custom positioning
- `tip-padding` attribute for tip padding control

**Deprecated:**

- `.spectrum-Tooltip--positive` variant was removed in Spectrum 2

The missing placement values in WC use legacy naming conventions. Spectrum 2 standardizes on `-start` and `-end` suffixes instead of `-left`/`-right`, and adds logical placement options (`start`/`end`) for better RTL support.

### CSS Spectrum 2 changes

**Icon removal:**

- The Icon component import was removed from Spectrum 2 templates
- Variant icons (Info, CheckmarkCircle, Alert) for semantic variants are no longer rendered in the template
- The `.spectrum-Tooltip-typeIcon` class and associated icon rendering logic were removed
- This represents a significant visual change: Spectrum 2 tooltips no longer display icons for `info` and `negative` variants

**Variant changes:**

- `positive` variant was removed from Spectrum 2 (deprecated)
- Only `neutral`, `info`, and `negative` variants remain in Spectrum 2
- CSS classes for the positive variant (`.spectrum-Tooltip--positive`) are no longer supported

**Theme file removal:**

- Theme-specific CSS imports (`../themes/spectrum.css`, `../themes/express.css`) were removed
- Spectrum 2 uses a unified theming approach

**Context parameter:**

- The `context` parameter was removed from the function signature in Spectrum 2
- This simplifies the template API

**No structural HTML changes:**

- The base `<span>` wrapper structure remains identical
- `.spectrum-Tooltip-label` and `.spectrum-Tooltip-tip` elements are preserved
- All placement-related classes maintain the same structure

## Resources

- [CSS migration]()
- [Spectrum 2 preview]()
- [React]()
