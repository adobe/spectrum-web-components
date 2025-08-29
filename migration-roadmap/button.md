# Button migration roadmap

<details>
<summary>CSS selectors</summary>

- `.spectrum-Button`
- `.spectrum-Button .spectrum-Button-label`
- `.spectrum-Button .spectrum-Icon`
- `.spectrum-Button .spectrum-Icon + .spectrum-Button-label`
- `.spectrum-Button .spectrum-ProgressCircle`
- `.spectrum-Button--noWrap .spectrum-Button-label`
- `.spectrum-Button--sizeL`
- `.spectrum-Button--sizeS`
- `.spectrum-Button--sizeS.spectrum-Button--iconOnly`
- `.spectrum-Button--sizeXL`
- `.spectrum-Button-label`
- `.spectrum-Button-label:empty`
- `.spectrum-Button.is-disabled`
- `.spectrum-Button.is-focused`
- `.spectrum-Button.is-focused:after`
- `.spectrum-Button.is-pending`
- `.spectrum-Button.is-pending .spectrum-Button-label`
- `.spectrum-Button.is-pending .spectrum-Icon`
- `.spectrum-Button.is-pending .spectrum-ProgressCircle`
- `.spectrum-Button.spectrum-Button--accent`
- `.spectrum-Button.spectrum-Button--accent .spectrum-Button-label`
- `.spectrum-Button.spectrum-Button--iconOnly`
- `.spectrum-Button.spectrum-Button--iconOnly .spectrum-Icon`
- `.spectrum-Button.spectrum-Button--negative`
- `.spectrum-Button.spectrum-Button--outline`
- `.spectrum-Button.spectrum-Button--primary`
- `.spectrum-Button.spectrum-Button--primary.spectrum-Button--outline`
- `.spectrum-Button.spectrum-Button--secondary`
- `.spectrum-Button.spectrum-Button--secondary.spectrum-Button--outline`
- `.spectrum-Button.spectrum-Button--staticBlack`
- `.spectrum-Button.spectrum-Button--staticBlack.spectrum-Button--outline`
- `.spectrum-Button.spectrum-Button--staticBlack.spectrum-Button--secondary`
- `.spectrum-Button.spectrum-Button--staticBlack.spectrum-Button--secondary.spectrum-Button--outline`
- `.spectrum-Button.spectrum-Button--staticWhite`
- `.spectrum-Button.spectrum-Button--staticWhite.spectrum-Button--outline`
- `.spectrum-Button.spectrum-Button--staticWhite.spectrum-Button--secondary`
- `.spectrum-Button.spectrum-Button--staticWhite.spectrum-Button--secondary.spectrum-Button--outline`
- `.spectrum-Button::-moz-focus-inner`
- `.spectrum-Button:active`
- `.spectrum-Button:after`
- `.spectrum-Button:disabled`
- `.spectrum-Button:focus`
- `.spectrum-Button:focus-visible`
- `.spectrum-Button:focus-visible:after`
- `.spectrum-Button:hover`
- `.spectrum-Button:not(.spectrum-Button--primary, .spectrum-Button--negative, .spectrum-Button--secondary, .spectrum-Button--staticBlack, .spectrum-Button--staticWhite)`
- `.spectrum-Button:not(.spectrum-Button--primary, .spectrum-Button--negative, .spectrum-Button--secondary, .spectrum-Button--staticBlack, .spectrum-Button--staticWhite) .spectrum-Button-label`
- `.spectrum-Button[pending]`
- `.spectrum-Button[pending] .spectrum-Button-label`
- `.spectrum-Button[pending] .spectrum-Icon`
- `.spectrum-Button[pending] .spectrum-ProgressCircle`
- `a.spectrum-Button`

</details>

<details>
<summary>Passthroughs</summary>

- `--mod-progress-circle-position`
- `--mod-progress-circle-thickness`
- `--mod-progress-circle-track-border-color`
- `--mod-progress-circle-track-border-color-over-background`

</details>

<details>
<summary>Attributes</summary>

- `variant` (String) - The visual variant to apply to this button (`accent`, `primary`, `secondary`, `negative`, `white`, `black`)
- `static-color` (String) - The static color variant to use for this button (`black`, `white`)
- `treatment` (String) - The visual treatment to apply to this button (`fill`, `outline`)
- `pending` (Boolean) - Use this property to set the button into a pending state
- `pending-label` (String) - Label for pending state (default: "Pending")
- `no-wrap` (Boolean) - Disables text wrapping within the button component's label
- `size` (String) - Button size (`s`, `m`, `l`, `xl`)
- `quiet` (Boolean, deprecated) - Style this button to be less obvious (use `treatment="outline"` instead)

</details>

<details>
<summary>Slots</summary>

- Default slot - Text label of the Button
- `icon` - The icon to use for Button

</details>

<details>
<summary>Modifiers</summary>

- `--mod-button-animation-duration`
- `--mod-button-background-color-default`
- `--mod-button-background-color-disabled`
- `--mod-button-background-color-down`
- `--mod-button-background-color-focus`
- `--mod-button-background-color-hover`
- `--mod-button-border-color-default`
- `--mod-button-border-color-disabled`
- `--mod-button-border-color-down`
- `--mod-button-border-color-focus`
- `--mod-button-border-color-hover`
- `--mod-button-border-radius`
- `--mod-button-border-width`
- `--mod-button-bottom-to-text`
- `--mod-button-content-color-default`
- `--mod-button-content-color-disabled`
- `--mod-button-content-color-down`
- `--mod-button-content-color-focus`
- `--mod-button-content-color-hover`
- `--mod-button-edge-to-text`
- `--mod-button-edge-to-visual`
- `--mod-button-edge-to-visual-only`
- `--mod-button-focus-ring-border-radius`
- `--mod-button-focus-ring-color`
- `--mod-button-focus-ring-gap`
- `--mod-button-focus-ring-thickness`
- `--mod-button-font-family`
- `--mod-button-font-size`
- `--mod-button-font-weight`
- `--mod-button-height`
- `--mod-button-icon-margin-block-start`
- `--mod-button-line-height`
- `--mod-button-margin-block`
- `--mod-button-margin-left`
- `--mod-button-margin-right`
- `--mod-button-max-inline-size`
- `--mod-button-min-width`
- `--mod-button-padding-label-to-icon`
- `--mod-button-text-align`
- `--mod-button-text-align-with-icon`
- `--mod-button-top-to-icon`
- `--mod-button-top-to-text`

</details>

## Visual Comparison

**Legacy Component:**

<!-- Screenshot of legacy component will be added here -->

**Spectrum 2 Component:**

<!-- Screenshot of Spectrum 2 component will be added here -->

## DOM Structure Changes

**Legacy (main branch):**

```html
<button
    class="spectrum-Button spectrum-Button--{variant} spectrum-Button--size{size} spectrum-Button--{treatment}"
>
    <svg class="spectrum-Icon">[icon]</svg>
    <span class="spectrum-Button-label">[label]</span>
    <div
        class="spectrum-ProgressCircle spectrum-ProgressCircle--indeterminate spectrum-ProgressCircle--sizeS"
    >
        [pending state]
    </div>
</button>
```

**Spectrum 2 (spectrum-two branch):**

```html
<button
    class="spectrum-Button spectrum-Button--{variant} spectrum-Button--size{size} spectrum-Button--{treatment}"
>
    <svg class="spectrum-Icon">[icon]</svg>
    <span class="spectrum-Button-label">[label]</span>
    <div
        class="spectrum-ProgressCircle spectrum-ProgressCircle--indeterminate spectrum-ProgressCircle--sizeS"
    >
        [pending state]
    </div>
</button>
```

## Comparison

| CSS selector                    | Attribute or slot             | Status           |
| ------------------------------- | ----------------------------- | ---------------- |
| `.spectrum-Button`              | Root element                  | Implemented      |
| `.spectrum-Button--accent`      | `variant="accent"`            | Implemented      |
| `.spectrum-Button--primary`     | `variant="primary"`           | Implemented      |
| `.spectrum-Button--secondary`   | `variant="secondary"`         | Implemented      |
| `.spectrum-Button--negative`    | `variant="negative"`          | Implemented      |
| `.spectrum-Button--outline`     | `treatment="outline"`         | Implemented      |
| `.spectrum-Button--sizeS`       | `size="s"`                    | Implemented      |
| `.spectrum-Button--sizeL`       | `size="l"`                    | Implemented      |
| `.spectrum-Button--sizeXL`      | `size="xl"`                   | Implemented      |
| `.spectrum-Button--staticBlack` | `static-color="black"`        | Implemented      |
| `.spectrum-Button--staticWhite` | `static-color="white"`        | Implemented      |
| `.spectrum-Button--noWrap`      | `no-wrap` attribute           | Implemented      |
| `.spectrum-Button--iconOnly`    | `hideLabel` (internal)        | Implemented      |
| `.spectrum-Button-label`        | Default slot                  | Implemented      |
| `.spectrum-Icon`                | `icon` slot                   | Implemented      |
| `.spectrum-ProgressCircle`      | `pending` state               | Implemented      |
| `.spectrum-Button.is-pending`   | `pending` attribute           | Implemented      |
| `.spectrum-Button.is-disabled`  | `disabled` attribute          | Implemented      |
| `.spectrum-Button.is-focused`   | Focus state                   | Implemented      |
| `.spectrum-Button[pending]`     | `pending` attribute           | Implemented      |
| `a.spectrum-Button`             | Link variant                  | Missing from WC  |
| -                               | `pending-label` attribute     | Missing from CSS |
| -                               | `quiet` property (deprecated) | Missing from CSS |

## Key Structural Changes

**Element Hierarchy Changes:**

- No significant hierarchy changes between main and spectrum-two branches
- Maintained consistent structure across versions

**Class Name Changes:**

- No major class name changes
- Static color classes maintained (staticBlack, staticWhite)

**Attribute Changes:**

- Added `pending` and `pending-label` attributes for loading states
- Added `no-wrap` attribute for text overflow control
- Added `static-color` attribute to replace variant-based static colors
- Added `treatment` attribute to replace `quiet` property

**Slot/Content Changes:**

- Added dedicated `icon` slot for icon placement
- Default slot remains for button label

**Migration Impact:**

- Static color variants (`white`, `black`) are being deprecated in favor of `static-color` attribute
- `quiet` property is deprecated in favor of `treatment="outline"`
- Better semantic structure with icon slot

### Implementation Gaps

**CSS Features Missing from Web Component:**

- Link variant support (`a.spectrum-Button`) - web component should support href attribute

**Web Component Features Missing from CSS:**

- `pending-label` attribute support in CSS
- `quiet` property (deprecated) - should be removed

**Features Being Deprecated/Removed:**

- `quiet` property - replaced by `treatment="outline"`
- Static color variants (`white`, `black`) - replaced by `static-color` attribute
- `cta` variant - replaced by `accent` variant
- `overBackground` variant - replaced by `static-color="white"` with `treatment="outline"`

### Action Items for Web Component Maintainers

**Required Additions:**

- Link variant support - implement href attribute handling for anchor button functionality

**Required Removals:**

- Complete deprecation warnings for `quiet`, static color variants, and deprecated variant values
- Remove deprecated properties in next major version

**Breaking Changes:**

- Migration from deprecated variants requires updating component usage
- Link button functionality needs implementation for href support
- Migration guidance: Replace `quiet` with `treatment="outline"`, replace static color variants with `static-color` attribute
