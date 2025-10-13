# Action button migration roadmap

## Component specifications

### CSS

<details>
<summary>CSS selectors</summary>

**Base component:**

- `.spectrum-ActionButton`

**Sizes:**

- `.spectrum-ActionButton--sizeXS`
- `.spectrum-ActionButton--sizeS`
- `.spectrum-ActionButton--sizeL`
- `.spectrum-ActionButton--sizeXL`

**Variants and treatments:**

- `.spectrum-ActionButton.spectrum-ActionButton--quiet`
- `.spectrum-ActionButton.spectrum-ActionButton--staticWhite`
- `.spectrum-ActionButton.spectrum-ActionButton--staticWhite.spectrum-ActionButton--quiet`
- `.spectrum-ActionButton.spectrum-ActionButton--staticBlack`
- `.spectrum-ActionButton.spectrum-ActionButton--staticBlack.spectrum-ActionButton--quiet`

**Child elements:**

- `.spectrum-ActionButton .spectrum-ActionButton-hold`
- `.spectrum-ActionButton .spectrum-ActionButton-icon`
- `.spectrum-ActionButton .spectrum-ActionButton-label`
- `.spectrum-ActionButton-hold`
- `.spectrum-ActionButton-icon`
- `.spectrum-ActionButton-label`
- `.spectrum-ActionButton-label:empty`

**States:**

- `.spectrum-ActionButton.is-disabled`
- `.spectrum-ActionButton.is-selected`
- `.spectrum-ActionButton:disabled`
- `.spectrum-ActionButton:active`
- `.spectrum-ActionButton:hover`

**Selected state with variants:**

- `.spectrum-ActionButton.is-selected.spectrum-ActionButton--emphasized`
- `.spectrum-ActionButton.is-selected.spectrum-ActionButton--staticWhite`
- `.spectrum-ActionButton.is-selected.spectrum-ActionButton--staticBlack`
- `.spectrum-ActionButton.spectrum-ActionButton--quiet.is-selected`
- `.spectrum-ActionButton.spectrum-ActionButton--quiet:disabled:not(.is-selected)`

**Focus indicators:**

- `.spectrum-ActionButton:focus`
- `.spectrum-ActionButton:focus-visible`
- `.spectrum-ActionButton:focus-visible:after`
- `.spectrum-ActionButton::-moz-focus-inner`
- `.spectrum-ActionButton:after`

**Content detection:**

- `.spectrum-ActionButton:has(.spectrum-ActionButton-icon)`
- `.spectrum-ActionButton:not(:has(.spectrum-ActionButton-label))`

**RTL support:**

- `.spectrum-ActionButton:dir(rtl)`

**Link variant:**

- `a.spectrum-ActionButton`

</details>

<details>
<summary>Passthroughs</summary>

- `--mod-button-animation-duration`
- `--mod-button-font-family`

</details>

<details>
<summary>Modifiers</summary>

**Sizing and spacing:**

- `--mod-actionbutton-height`
- `--mod-actionbutton-min-width`
- `--mod-actionbutton-edge-to-visual`
- `--mod-actionbutton-edge-to-visual-only`
- `--mod-actionbutton-edge-to-text`
- `--mod-actionbutton-edge-to-hold-icon`
- `--mod-actionbutton-text-to-visual`
- `--mod-actionbutton-icon-size`

**Typography:**

- `--mod-actionbutton-font-size`
- `--mod-actionbutton-font-weight`
- `--mod-actionbutton-font-style`
- `--mod-actionbutton-line-height`
- `--mod-actionbutton-label-color`

**Border and radius:**

- `--mod-actionbutton-border-radius`
- `--mod-actionbutton-focus-indicator-border-radius`

**Focus indicators:**

- `--mod-actionbutton-focus-indicator-gap`
- `--mod-actionbutton-focus-indicator-thickness`
- `--mod-actionbutton-focus-indicator-color`

**Animation:**

- `--mod-actionbutton-animation-duration`

**Default state colors:**

- `--mod-actionbutton-background-color-default`
- `--mod-actionbutton-content-color-default`

**Hover state colors:**

- `--mod-actionbutton-background-color-hover`
- `--mod-actionbutton-content-color-hover`

**Focus state colors:**

- `--mod-actionbutton-background-color-focus`
- `--mod-actionbutton-content-color-focus`

**Active/down state colors:**

- `--mod-actionbutton-background-color-down`
- `--mod-actionbutton-content-color-down`

**Disabled state colors:**

- `--mod-actionbutton-background-color-disabled`
- `--mod-actionbutton-content-color-disabled`

**Selected state colors:**

- `--mod-actionbutton-background-color-default-selected`
- `--mod-actionbutton-content-color-default-selected`
- `--mod-actionbutton-background-color-hover-selected`
- `--mod-actionbutton-content-color-hover-selected`
- `--mod-actionbutton-background-color-focus-selected`
- `--mod-actionbutton-content-color-focus-selected`
- `--mod-actionbutton-background-color-down-selected`
- `--mod-actionbutton-content-color-down-selected`

**Selected + emphasized state colors:**

- `--mod-actionbutton-background-color-default-selected-emphasized`
- `--mod-actionbutton-content-color-default-selected-emphasized`
- `--mod-actionbutton-background-color-hover-selected-emphasized`
- `--mod-actionbutton-content-color-hover-selected-emphasized`
- `--mod-actionbutton-background-color-focus-selected-emphasized`
- `--mod-actionbutton-content-color-focus-selected-emphasized`
- `--mod-actionbutton-background-color-down-selected-emphasized`
- `--mod-actionbutton-content-color-down-selected-emphasized`

</details>

### SWC

<details>
<summary>Attributes</summary>

**Size:**

- `size` (values: `xs`, `s`, `m`, `l`, `xl`) - button size, no default

**Variants:**

- `emphasized` - adds visual emphasis to selected state (boolean)
- `quiet` - applies quiet styling (boolean)
- `static-color` (values: `white`, `black`) - static color variant for use over backgrounds

**Selection state:**

- `selected` - whether the button is selected (boolean)
- `toggles` - whether to automatically manage selected state on interaction and use aria-pressed (boolean)

**Hold affordance:**

- `hold-affordance` - shows corner triangle indicator for longpress action (boolean)

**States:**

- `active` - active/pressed state (inherited from ButtonBase)
- `disabled` - disabled state (inherited from Focusable)

**Content:**

- `label` - accessible label (inherited from LikeAnchor)

**Focus management:**

- `autofocus` - auto-focus on load (inherited from Focusable)
- `tabIndex` - tab index (inherited from Focusable)

**Link behavior:**

- `href` - makes button behave as link (inherited from LikeAnchor)
- `target` (values: `_blank`, `_parent`, `_self`, `_top`) - link target (inherited from LikeAnchor)
- `download` - download attribute (inherited from LikeAnchor)
- `referrerpolicy` - referrer policy (inherited from LikeAnchor)
- `rel` - link relationship (inherited from LikeAnchor)

**Form behavior:**

- `type` (values: `button`, `submit`, `reset`) - button type (inherited from ButtonBase)
- `name` - form field name (inherited from ButtonBase)
- `value` - button value, defaults to trimmed text content

**ARIA:**

- `role` - ARIA role, defaults to `button`

</details>

<details>
<summary>Slots</summary>

- Default slot - text label of the action button
- `icon` - the icon to use for action button

</details>

## Comparison

### DOM structure changes

<details>
<summary>Spectrum Web Components</summary>

```html
<!-- Hold affordance icon (when hold-affordance=true) -->
<!-- Size-specific corner triangle icon, rendered first -->
<sp-icon-corner-triangle300
    class="hold-affordance spectrum-UIIcon-CornerTriangle{size}"
></sp-icon-corner-triangle300>

<!-- Icon slot -->
<slot name="icon"></slot>

<!-- Label -->
<span id="label">
    <slot></slot>
</span>
```

</details>

<details>
<summary>Legacy (CSS main branch)</summary>

```html
<button
    class="spectrum-ActionButton spectrum-ActionButton--sizeM"
    aria-pressed="false"
    disabled
>
    <!-- Hold affordance icon (when hasPopup provided) -->
    <svg class="spectrum-Icon spectrum-ActionButton-hold">...</svg>

    <!-- Icon (when iconName provided) -->
    <svg class="spectrum-Icon spectrum-ActionButton-icon">...</svg>

    <!-- Label (when label provided and not hideLabel) -->
    <span class="spectrum-ActionButton-label">Label</span>
</button>
```

</details>

<details>
<summary>Spectrum 2 (CSS spectrum-two branch)</summary>

```html
<button
    class="spectrum-ActionButton spectrum-ActionButton--sizeM"
    aria-pressed="false"
    disabled
>
    <!-- Hold affordance icon (when hasPopup provided) -->
    <svg class="spectrum-Icon spectrum-ActionButton-hold">...</svg>

    <!-- Icon (when iconName provided) -->
    <svg class="spectrum-Icon spectrum-ActionButton-icon">...</svg>

    <!-- Label (when label provided and not hideLabel) -->
    <span class="spectrum-ActionButton-label">Label</span>
</button>
```

</details>

### CSS => SWC mapping

#### Sizes

| CSS selector                     | SWC attribute                   | Status      |
| -------------------------------- | ------------------------------- | ----------- |
| `.spectrum-ActionButton`         | Base component (default size M) | Implemented |
| `.spectrum-ActionButton--sizeXS` | `size="xs"`                     | Implemented |
| `.spectrum-ActionButton--sizeS`  | `size="s"`                      | Implemented |
| `.spectrum-ActionButton--sizeL`  | `size="l"`                      | Implemented |
| `.spectrum-ActionButton--sizeXL` | `size="xl"`                     | Implemented |

#### Variants and treatments

| CSS selector                                                                             | SWC attribute                    | Status      |
| ---------------------------------------------------------------------------------------- | -------------------------------- | ----------- |
| `.spectrum-ActionButton.spectrum-ActionButton--quiet`                                    | `quiet`                          | Implemented |
| `.spectrum-ActionButton.spectrum-ActionButton--staticWhite`                              | `static-color="white"`           | Implemented |
| `.spectrum-ActionButton.spectrum-ActionButton--staticBlack`                              | `static-color="black"`           | Implemented |
| `.spectrum-ActionButton.spectrum-ActionButton--staticWhite.spectrum-ActionButton--quiet` | `static-color="white"` + `quiet` | Implemented |
| `.spectrum-ActionButton.spectrum-ActionButton--staticBlack.spectrum-ActionButton--quiet` | `static-color="black"` + `quiet` | Implemented |

#### States

| CSS selector                                                                     | SWC attribute                       | Status      |
| -------------------------------------------------------------------------------- | ----------------------------------- | ----------- |
| `.spectrum-ActionButton.is-selected`                                             | `selected`                          | Implemented |
| `.spectrum-ActionButton.is-disabled`                                             | `disabled`                          | Implemented |
| `.spectrum-ActionButton:disabled`                                                | `disabled`                          | Implemented |
| `.spectrum-ActionButton:active`                                                  | `active`                            | Implemented |
| `.spectrum-ActionButton:hover`                                                   | Pseudo-state                        | Implemented |
| `.spectrum-ActionButton.is-selected.spectrum-ActionButton--emphasized`           | `selected` + `emphasized`           | Implemented |
| `.spectrum-ActionButton.is-selected.spectrum-ActionButton--staticWhite`          | `selected` + `static-color="white"` | Implemented |
| `.spectrum-ActionButton.is-selected.spectrum-ActionButton--staticBlack`          | `selected` + `static-color="black"` | Implemented |
| `.spectrum-ActionButton.spectrum-ActionButton--quiet.is-selected`                | `quiet` + `selected`                | Implemented |
| `.spectrum-ActionButton.spectrum-ActionButton--quiet:disabled:not(.is-selected)` | `quiet` + `disabled` (not selected) | Implemented |

#### Focus indicators

| CSS selector                                 | SWC attribute         | Status      |
| -------------------------------------------- | --------------------- | ----------- |
| `.spectrum-ActionButton:focus`               | Pseudo-state          | Implemented |
| `.spectrum-ActionButton:focus-visible`       | Pseudo-state          | Implemented |
| `.spectrum-ActionButton:focus-visible:after` | Focus ring            | Implemented |
| `.spectrum-ActionButton:after`               | Focus ring element    | Implemented |
| `.spectrum-ActionButton::-moz-focus-inner`   | Firefox focus styling | Implemented |

#### Content and layout

| CSS selector                                                     | SWC attribute/slot                       | Status      |
| ---------------------------------------------------------------- | ---------------------------------------- | ----------- |
| `.spectrum-ActionButton .spectrum-ActionButton-icon`             | `icon` slot                              | Implemented |
| `.spectrum-ActionButton-icon`                                    | `icon` slot                              | Implemented |
| `.spectrum-ActionButton .spectrum-ActionButton-label`            | Default slot                             | Implemented |
| `.spectrum-ActionButton-label`                                   | Default slot                             | Implemented |
| `.spectrum-ActionButton-label:empty`                             | Empty label handling                     | Implemented |
| `.spectrum-ActionButton .spectrum-ActionButton-hold`             | `hold-affordance` attribute              | Implemented |
| `.spectrum-ActionButton-hold`                                    | `hold-affordance` attribute              | Implemented |
| `.spectrum-ActionButton:has(.spectrum-ActionButton-icon)`        | Detected when icon slot has content      | Implemented |
| `.spectrum-ActionButton:not(:has(.spectrum-ActionButton-label))` | Detected when default slot is empty      | Implemented |
| `.spectrum-ActionButton:dir(rtl)`                                | Browser RTL support                      | Implemented |
| `a.spectrum-ActionButton`                                        | `href` attribute makes it render as link | Implemented |

#### WC-only attributes

| SWC attribute | CSS equivalent | Notes                                         |
| ------------- | -------------- | --------------------------------------------- |
| `toggles`     | N/A            | Manages selected state automatically on click |
| `value`       | N/A            | Used for identification in action groups      |
| `role`        | N/A            | Dynamic ARIA role management                  |

## Summary of changes

### CSS => SWC implementation gaps

**Missing from WC:**
None. All CSS selectors have corresponding web component implementations.

### CSS Spectrum 2 changes

**No structural changes:**
The Action Button template is functionally identical between the main branch (legacy) and spectrum-two branch (Spectrum 2). Both branches render the same HTML DOM structure and use the same size-specific corner triangle icons (CornerTriangle75, CornerTriangle100, CornerTriangle200, CornerTriangle300).

## Resources

- [CSS migration](https://github.com/adobe/spectrum-css/pull/2669)
- [Spectrum 2 preview](https://spectrumcss.z13.web.core.windows.net/pr-2352/index.html?path=/docs/components-action-button--docs)
- [React](https://react-spectrum.adobe.com/s2/index.html?path=/docs/actionbutton--docs)
