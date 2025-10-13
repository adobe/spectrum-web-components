# Button migration roadmap

## Component specifications

### CSS

<details>
<summary>CSS selectors</summary>

**Base component:**

- `.spectrum-Button`
- `a.spectrum-Button`

**Sizes:**

- `.spectrum-Button--sizeS`
- `.spectrum-Button--sizeL`
- `.spectrum-Button--sizeXL`

**Variants:**

- `.spectrum-Button.spectrum-Button--accent`
- `.spectrum-Button.spectrum-Button--primary`
- `.spectrum-Button.spectrum-Button--secondary`
- `.spectrum-Button.spectrum-Button--negative`
- `.spectrum-Button.spectrum-Button--staticBlack`
- `.spectrum-Button.spectrum-Button--staticWhite`

**Treatments:**

- `.spectrum-Button.spectrum-Button--outline`

**Combined variants and treatments:**

- `.spectrum-Button.spectrum-Button--primary.spectrum-Button--outline`
- `.spectrum-Button.spectrum-Button--secondary.spectrum-Button--outline`
- `.spectrum-Button.spectrum-Button--staticBlack.spectrum-Button--outline`
- `.spectrum-Button.spectrum-Button--staticBlack.spectrum-Button--secondary`
- `.spectrum-Button.spectrum-Button--staticBlack.spectrum-Button--secondary.spectrum-Button--outline`
- `.spectrum-Button.spectrum-Button--staticWhite.spectrum-Button--outline`
- `.spectrum-Button.spectrum-Button--staticWhite.spectrum-Button--secondary`
- `.spectrum-Button.spectrum-Button--staticWhite.spectrum-Button--secondary.spectrum-Button--outline`

**Default variant:**

- `.spectrum-Button:not(.spectrum-Button--primary, .spectrum-Button--negative, .spectrum-Button--secondary, .spectrum-Button--staticBlack, .spectrum-Button--staticWhite)`
- `.spectrum-Button:not(.spectrum-Button--primary, .spectrum-Button--negative, .spectrum-Button--secondary, .spectrum-Button--staticBlack, .spectrum-Button--staticWhite) .spectrum-Button-label`

**Icon-only:**

- `.spectrum-Button.spectrum-Button--iconOnly`
- `.spectrum-Button.spectrum-Button--iconOnly .spectrum-Icon`
- `.spectrum-Button--sizeS.spectrum-Button--iconOnly`

**Text wrapping:**

- `.spectrum-Button--noWrap .spectrum-Button-label`

**Child elements:**

- `.spectrum-Button-label`
- `.spectrum-Button-label:empty`
- `.spectrum-Button .spectrum-Button-label`
- `.spectrum-Button .spectrum-Icon`
- `.spectrum-Button .spectrum-Icon + .spectrum-Button-label`
- `.spectrum-Button .spectrum-ProgressCircle`

**Variant-specific child elements:**

- `.spectrum-Button.spectrum-Button--accent .spectrum-Button-label`

**States:**

- `.spectrum-Button.is-disabled`
- `.spectrum-Button.is-focused`
- `.spectrum-Button.is-pending`
- `.spectrum-Button:disabled`
- `.spectrum-Button:hover`
- `.spectrum-Button:active`
- `.spectrum-Button:focus`
- `.spectrum-Button:focus-visible`

**State-specific styling:**

- `.spectrum-Button.is-focused:after`
- `.spectrum-Button.is-pending .spectrum-Button-label`
- `.spectrum-Button.is-pending .spectrum-Icon`
- `.spectrum-Button.is-pending .spectrum-ProgressCircle`
- `.spectrum-Button[pending]`
- `.spectrum-Button[pending] .spectrum-Button-label`
- `.spectrum-Button[pending] .spectrum-Icon`
- `.spectrum-Button[pending] .spectrum-ProgressCircle`
- `.spectrum-Button:focus-visible:after`

**Focus ring:**

- `.spectrum-Button:after`
- `.spectrum-Button::-moz-focus-inner`

</details>

<details>
<summary>Passthroughs</summary>

- `--mod-progress-circle-position`
- `--mod-progress-circle-thickness`
- `--mod-progress-circle-track-border-color`
- `--mod-progress-circle-track-border-color-over-background`

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
- `--mod-button-top-to-icon`
- `--mod-button-top-to-text`

</details>

### SWC

<details>
<summary>Attributes</summary>

**Size:**

- `size` (values: `s`, `m`, `l`, `xl`)

**Variants:**

- `variant` (values: `accent`, `primary`, `secondary`, `negative`, `white`, `black`) - defaults to `accent`
- `static-color` (values: `white`, `black`) - static color variant for use over backgrounds

**Treatment:**

- `treatment` (values: `fill`, `outline`) - defaults to `fill`
- `quiet` - boolean property that maps to `treatment` (when true, sets `treatment="outline"`)

**Content and layout:**

- `icon-only` - indicates button contains only an icon without visible label
- `no-wrap` - prevents text wrapping within the button label
- `label` - applies `aria-label` for accessibility (especially for icon-only buttons)

**States:**

- `disabled` - disables the button
- `active` - indicates button is currently being activated (e.g., Space key pressed)
- `pending` - places button in pending state with progress indicator
- `pending-label` - custom label text for pending state

**Link behavior:**

- `href` - makes button behave as link (inherited from `LikeAnchor`)
- `target` (values: `_blank`, `_parent`, `_self`, `_top`) - where to display the linked URL (inherited from `LikeAnchor`)
- `download` - causes the browser to treat the linked URL as a download (inherited from `LikeAnchor`)
- `referrerpolicy` - how much of the referrer to send when following the link (inherited from `LikeAnchor`)
- `rel` - the relationship of the linked URL as space-separated link types (inherited from `LikeAnchor`)

**Form behavior:**

- `type` (values: `button`, `submit`, `reset`) - button type, defaults to `button`

**Deprecated variant values:**

- `variant="cta"` - deprecated, use `variant="accent"` instead
- `variant="overBackground"` - deprecated, use `static-color="white"` with `treatment="outline"` instead
- `variant="white"` - deprecated, use `static-color="white"` instead
- `variant="black"` - deprecated, use `static-color="black"` instead

</details>

<details>
<summary>Slots</summary>

- Default slot (text label of the Button)
- `icon` (The icon to use for Button)

</details>

## Comparison

### DOM structure changes

<details>
<summary>Spectrum Web Components:</summary>

```html
<!-- Button content -->
<slot name="icon"></slot>
<!-- icon-only attribute is conditionally applied to icon slot when no label text is present -->
<span id="label">
    <slot></slot>
</span>

<!-- Pending state (when pending=true) -->
<!-- Rendered by PendingStateController -->
<sp-progress-circle indeterminate></sp-progress-circle>
```

</details>

<details>
<summary>Legacy (CSS main branch):</summary>

```html
<button
    class="spectrum-Button spectrum-Button--fill spectrum-Button--accent spectrum-Button--sizeM"
    disabled
>
    <!-- Icon (when iconName provided) -->
    <svg class="spectrum-Icon">...</svg>

    <!-- Label (when label provided) -->
    <span class="spectrum-Button-label">Label</span>

    <!-- Icon can also appear after label when iconAfterLabel is true -->

    <!-- Progress Circle (when isPending is true) -->
    <div
        class="spectrum-ProgressCircle spectrum-ProgressCircle--small    spectrum-ProgressCircle--indeterminate"
    >
        <!-- ProgressCircle internal structure -->
    </div>
</button>
```

</details>

<details>
<summary>Spectrum 2 (CSS spectrum-two branch):</summary>

```html
<button
    class="spectrum-Button spectrum-Button--fill spectrum-Button--accent spectrum-Button--sizeM"
    disabled
>
    <!-- Icon (when iconName provided) -->
    <svg class="spectrum-Icon">...</svg>

    <!-- Label (when label provided) -->
    <span class="spectrum-Button-label">Label</span>

    <!-- Icon can also appear after label when iconAfterLabel is true -->

    <!-- InfieldProgressCircle (when isPending is true) -->
    <div
        class="spectrum-ProgressCircle spectrum-ProgressCircle--indeterminate spectrum-InfieldProgressCircle spectrum-InfieldProgressCircle--sizeM"
    >
        <!-- InfieldProgressCircle internal structure -->
    </div>
</button>
```

</details>

<details>
<summary>Diff: Legacy (CSS main) → Spectrum 2 (CSS spectrum-two)</summary>

```diff
 <button
   class="spectrum-Button spectrum-Button--fill spectrum-Button--accent spectrum-Button--sizeM"
   disabled
 >
   <!-- Icon (when iconName provided) -->
   <svg class="spectrum-Icon">...</svg>

   <!-- Label (when label provided) -->
   <span class="spectrum-Button-label">Label</span>

   <!-- Icon can also appear after label when iconAfterLabel is true -->

-  <!-- Progress Circle (when isPending is true) -->
-  <div class="spectrum-ProgressCircle spectrum-ProgressCircle--sizeS spectrum-ProgressCircle--indeterminate">
-    <!-- ProgressCircle internal structure -->
+  <!-- InfieldProgressCircle (when isPending is true) -->
+  <div class="spectrum-ProgressCircle spectrum-ProgressCircle--indeterminate spectrum-InfieldProgressCircle spectrum-InfieldProgressCircle--sizeM">
+    <!-- InfieldProgressCircle internal structure -->
   </div>
 </button>
```

</details>

### CSS => SWC mapping

#### Sizes

| CSS selector                                        | Attribute or slot               | Status                                                                                                                  |
| --------------------------------------------------- | ------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `.spectrum-Button`                                  | Base component (default size M) | Implemented                                                                                                             |
| `.spectrum-Button--sizeS`                           | `size="s"`                      | Implemented                                                                                                             |
| `.spectrum-Button--sizeL`                           | `size="l"`                      | Implemented                                                                                                             |
| `.spectrum-Button--sizeXL`                          | `size="xl"`                     | Implemented                                                                                                             |
| `.spectrum-Button--sizeS.spectrum-Button--iconOnly` | `size="s"` with icon only       | Implemented (this has a separate selector because the down state implementation is different for this than other sizes) |

#### Variants and treatments

| CSS selector                                                                                                                                                                                    | Attribute or slot                                                  | Status      |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ | ----------- |
| `.spectrum-Button--accent`                                                                                                                                                                      | `variant="accent"`                                                 | Implemented |
| `.spectrum-Button--primary`                                                                                                                                                                     | `variant="primary"`                                                | Implemented |
| `.spectrum-Button--secondary`                                                                                                                                                                   | `variant="secondary"`                                              | Implemented |
| `.spectrum-Button--negative`                                                                                                                                                                    | `variant="negative"`                                               | Implemented |
| `.spectrum-Button--staticWhite`                                                                                                                                                                 | `static-color="white"`                                             | Implemented |
| `.spectrum-Button--staticBlack`                                                                                                                                                                 | `static-color="black"`                                             | Implemented |
| `.spectrum-Button--outline`                                                                                                                                                                     | `treatment="outline"`                                              | Implemented |
| `.spectrum-Button--primary.spectrum-Button--outline`                                                                                                                                            | `variant="primary"` `treatment="outline"`                          | Implemented |
| `.spectrum-Button--secondary.spectrum-Button--outline`                                                                                                                                          | `variant="secondary"` `treatment="outline"`                        | Implemented |
| `.spectrum-Button--staticBlack.spectrum-Button--outline`                                                                                                                                        | `static-color="black"` `treatment="outline"`                       | Implemented |
| `.spectrum-Button--staticWhite.spectrum-Button--outline`                                                                                                                                        | `static-color="white"` `treatment="outline"`                       | Implemented |
| `.spectrum-Button--staticBlack.spectrum-Button--secondary`                                                                                                                                      | `static-color="black"` `variant="secondary"`                       | Implemented |
| `.spectrum-Button--staticWhite.spectrum-Button--secondary`                                                                                                                                      | `static-color="white"` `variant="secondary"`                       | Implemented |
| `.spectrum-Button--staticBlack.spectrum-Button--secondary.spectrum-Button--outline`                                                                                                             | `static-color="black"` `variant="secondary"` `treatment="outline"` | Implemented |
| `.spectrum-Button--staticWhite.spectrum-Button--secondary.spectrum-Button--outline`                                                                                                             | `static-color="white"` `variant="secondary"` `treatment="outline"` | Implemented |
| `.spectrum-Button--accent .spectrum-Button-label`                                                                                                                                               | Accent label styling                                               | Implemented |
| `.spectrum-Button:not(.spectrum-Button--primary, .spectrum-Button--negative, .spectrum-Button--secondary, .spectrum-Button--staticBlack, .spectrum-Button--staticWhite)`                        | Default variant styling                                            | Implemented |
| `.spectrum-Button:not(.spectrum-Button--primary, .spectrum-Button--negative, .spectrum-Button--secondary, .spectrum-Button--staticBlack, .spectrum-Button--staticWhite) .spectrum-Button-label` | Default label styling                                              | Implemented |

#### States

| CSS selector                   | Attribute or slot | Status      |
| ------------------------------ | ----------------- | ----------- |
| `.spectrum-Button.is-disabled` | `disabled`        | Implemented |
| `.spectrum-Button:disabled`    | `disabled`        | Implemented |

#### Pending state

**Note:** The progress circle component will change from `ProgressCircle` to `InfieldProgressCircle` in Spectrum 2.

| CSS selector                                           | Attribute or slot           | Status      |
| ------------------------------------------------------ | --------------------------- | ----------- |
| `.spectrum-Button.is-pending`                          | `pending`                   | Implemented |
| `.spectrum-Button[pending]`                            | `pending` attribute         | Implemented |
| `.spectrum-Button.is-pending .spectrum-Button-label`   | Pending state label styling | Implemented |
| `.spectrum-Button.is-pending .spectrum-Icon`           | Pending state icon styling  | Implemented |
| `.spectrum-Button.is-pending .spectrum-ProgressCircle` | Pending state progress      | Implemented |
| `.spectrum-Button[pending] .spectrum-Button-label`     | Pending state label         | Implemented |
| `.spectrum-Button[pending] .spectrum-Icon`             | Pending state icon          | Implemented |
| `.spectrum-Button[pending] .spectrum-ProgressCircle`   | Pending progress circle     | Implemented |

#### Content and layout

| CSS selector                                               | Attribute or slot       | Status      |
| ---------------------------------------------------------- | ----------------------- | ----------- |
| `.spectrum-Button-label`                                   | Default slot            | Implemented |
| `.spectrum-Button-label:empty`                             | Empty label handling    | Implemented |
| `.spectrum-Button .spectrum-Icon`                          | `icon` slot             | Implemented |
| `.spectrum-Button .spectrum-Icon + .spectrum-Button-label` | Icon + label spacing    | Implemented |
| `.spectrum-Button .spectrum-ProgressCircle`                | Rendered when `pending` | Implemented |
| `.spectrum-Button--iconOnly`                               | Icon slot without label | Implemented |
| `.spectrum-Button--iconOnly .spectrum-Icon`                | Icon-only icon styling  | Implemented |
| `.spectrum-Button--noWrap`                                 | `no-wrap`               | Implemented |
| `.spectrum-Button--noWrap .spectrum-Button-label`          | Text wrapping control   | Implemented |
| `a.spectrum-Button`                                        | `href` attribute        | Implemented |

#### WC-only attributes (missing from CSS)

| CSS selector | Attribute or slot          | Status                                             |
| ------------ | -------------------------- | -------------------------------------------------- |
|              | `quiet`                    | Missing from CSS (equivalent to outline treatment) |
|              | `variant="cta"`            | Missing from CSS (deprecated)                      |
|              | `variant="overBackground"` | Missing from CSS (deprecated)                      |
|              | `variant="white"`          | Missing from CSS (deprecated)                      |
|              | `variant="black"`          | Missing from CSS (deprecated)                      |

## Summary of changes

### CSS => SWC implementation gaps

**Icon positioning** - CSS templates support an `iconAfterLabel` parameter to position icons after label text (trailing icon). SWC has a fixed DOM order where the icon slot always renders before the label, with no attribute or property to control icon positioning. Note: Icon-after-label is not present in the Spectrum design specifications, though there has been discussion about it within the design team. Check with the design team to confirm whether this feature is still needed.

**Quiet** - A quiet property can be applied in SWC, but it applies the outline treatment to the button. If the outline treatment alone is sufficient, we might consider removing `quiet`.

### CSS Spectrum 2 changes

**Progress indicator component change:**

- Legacy (main branch) uses `ProgressCircle` component with `size="s"` fixed size
- Spectrum 2 (spectrum-two branch) uses `InfieldProgressCircle` component with dynamic size matching the button size
- `InfieldProgressCircle` has a simpler DOM structure (single fill element instead of complex mask structure)
- Spectrum 2 version passes `staticColor` to the progress indicator for proper theming

## Resources

- [CSS migration](https://github.com/adobe/spectrum-css/pull/2600)
- [Spectrum 2 preview](https://spectrumcss.z13.web.core.windows.net/pr-2352/index.html?path=/docs/components-button--docs)
- [React](https://react-spectrum.adobe.com/s2/index.html?path=/docs/button--docs)
