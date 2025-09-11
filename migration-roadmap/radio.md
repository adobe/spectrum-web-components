# Radio migration roadmap

## Component specifications

### CSS

<details>
<summary>CSS selectors</summary>

- `.spectrum-Radio`
- `.spectrum-Radio .spectrum-Radio-button:after`
- `.spectrum-Radio .spectrum-Radio-input:checked:disabled + .spectrum-Radio-button:before`
- `.spectrum-Radio .spectrum-Radio-input:checked:disabled ~ .spectrum-Radio-label`
- `.spectrum-Radio .spectrum-Radio-input:disabled + .spectrum-Radio-button:before`
- `.spectrum-Radio .spectrum-Radio-input:disabled ~ .spectrum-Radio-label`
- `.spectrum-Radio--emphasized .spectrum-Radio-input:checked + .spectrum-Radio-button:before`
- `.spectrum-Radio--emphasized:active .spectrum-Radio-input:checked + .spectrum-Radio-button:before`
- `.spectrum-Radio--emphasized:focus .spectrum-Radio-input:checked + .spectrum-Radio-button:before`
- `.spectrum-Radio--emphasized:hover .spectrum-Radio-input:checked + .spectrum-Radio-button:before`
- `.spectrum-Radio--sizeL`
- `.spectrum-Radio--sizeS`
- `.spectrum-Radio--sizeXL`
- `.spectrum-Radio-button`
- `.spectrum-Radio-button:after`
- `.spectrum-Radio-button:before`
- `.spectrum-Radio-input`
- `.spectrum-Radio-input:checked + .spectrum-Radio-button:before`
- `.spectrum-Radio-input:disabled`
- `.spectrum-Radio-input:focus-visible + .spectrum-Radio-button:after`
- `.spectrum-Radio-label`
- `.spectrum-Radio-label:lang(ja)`
- `.spectrum-Radio-label:lang(ko)`
- `.spectrum-Radio-label:lang(zh)`
- `.spectrum-Radio.is-active .spectrum-Radio-button:before`
- `.spectrum-Radio.is-active .spectrum-Radio-input:checked + .spectrum-Radio-button:before`
- `.spectrum-Radio.is-active .spectrum-Radio-label`
- `.spectrum-Radio.is-readOnly .spectrum-Radio-input`
- `.spectrum-Radio.is-readOnly .spectrum-Radio-input + .spectrum-Radio-button:before`
- `.spectrum-Radio.is-readOnly .spectrum-Radio-input:checked:disabled ~ .spectrum-Radio-label`
- `.spectrum-Radio.is-readOnly .spectrum-Radio-input:disabled ~ .spectrum-Radio-label`
- `.spectrum-Radio.is-readOnly .spectrum-Radio-label`
- `.spectrum-Radio.is-readOnly:hover .spectrum-Radio-input + .spectrum-Radio-button:before`
- `.spectrum-Radio:active .spectrum-Radio-button:before`
- `.spectrum-Radio:active .spectrum-Radio-input:checked + .spectrum-Radio-button:before`
- `.spectrum-Radio:active .spectrum-Radio-label`
- `.spectrum-Radio:dir(rtl) .spectrum-Radio-button:after`
- `.spectrum-Radio:focus .spectrum-Radio-button:after`
- `.spectrum-Radio:focus .spectrum-Radio-button:before`
- `.spectrum-Radio:focus .spectrum-Radio-input:checked + .spectrum-Radio-button:before`
- `.spectrum-Radio:focus .spectrum-Radio-label`
- `.spectrum-Radio:hover .spectrum-Radio-button:before`
- `.spectrum-Radio:hover .spectrum-Radio-input:checked + .spectrum-Radio-button:before`
- `.spectrum-Radio:hover .spectrum-Radio-label`
- `.spectrum-Radio:lang(ja)`
- `.spectrum-Radio:lang(ko)`
- `.spectrum-Radio:lang(zh)`
- `.spectrum-Radio:not(.is-readOnly):active .spectrum-Radio-input:not(:disabled) + .spectrum-Radio-button`

</details>

<details>
<summary>Passthroughs</summary>

None found for this component.

</details>

<details>
<summary>Modifiers</summary>

- `--mod-radio-animation-duration`
- `--mod-radio-border-width`
- `--mod-radio-button-background-color`
- `--mod-radio-button-border-color-default`
- `--mod-radio-button-border-color-down`
- `--mod-radio-button-border-color-focus`
- `--mod-radio-button-border-color-hover`
- `--mod-radio-button-checked-border-color-default`
- `--mod-radio-button-checked-border-color-down`
- `--mod-radio-button-checked-border-color-focus`
- `--mod-radio-button-checked-border-color-hover`
- `--mod-radio-button-control-size`
- `--mod-radio-button-top-to-control`
- `--mod-radio-disabled-border-color`
- `--mod-radio-disabled-content-color`
- `--mod-radio-emphasized-accent-color`
- `--mod-radio-emphasized-accent-color-down`
- `--mod-radio-emphasized-accent-color-focus`
- `--mod-radio-emphasized-accent-color-hover`
- `--mod-radio-focus-indicator-color`
- `--mod-radio-focus-indicator-thickness`
- `--mod-radio-font-size`
- `--mod-radio-height`
- `--mod-radio-line-height`
- `--mod-radio-line-height-cjk`
- `--mod-radio-neutral-content-color`
- `--mod-radio-neutral-content-color-down`
- `--mod-radio-neutral-content-color-focus`
- `--mod-radio-neutral-content-color-hover`
- `--mod-radio-text-to-control`

</details>

### SWC

<details>
<summary>Attributes</summary>

- `autofocus` - Boolean attribute for auto-focusing the radio button
- `value` - String attribute identifying this radio button within its group
- `checked` - Boolean attribute representing when the input is checked
- `disabled` - Boolean attribute for disabled state
- `emphasized` - Boolean attribute for emphasized styling
- `invalid` - Boolean attribute for invalid state styling
- `readonly` - Boolean attribute for read-only state
- `size` - String attribute with values: `s`, `m`, `l`, `xl` (from SizedMixin)

</details>

<details>
<summary>Slots</summary>

- Default slot - Text label of the Radio button

</details>

## Comparison

**Legacy Component:**

<!-- Screenshot of legacy component will be added here -->

**Spectrum 2 Component:**

<!-- Screenshot of Spectrum 2 component will be added here -->

### DOM Structure changes

<details>
<summary>Spectrum Web Components:</summary>

```html
<!-- Current HTML structure from web component render() method -->
<div id="input"></div>
<span id="button"></span>
<span id="label" role="presentation"><slot></slot></span>
```

</details>

<details>
<summary>Legacy (CSS main branch):</summary>

```html
<div
    class="spectrum-Radio spectrum-Radio--sizeM spectrum-Radio--emphasized is-readOnly"
>
    <input
        type="radio"
        name="radio-group"
        class="spectrum-Radio-input"
        id="radio-input-123"
        checked="false"
        disabled="false"
        aria-disabled="true"
    />
    <span class="spectrum-Radio-button spectrum-Radio-button--sizeS"></span>
    <label
        class="spectrum-Radio-label spectrum-Radio-label--sizeS"
        for="radio-input-123"
    >
        Radio Button Label
    </label>
</div>
```

</details>

<details>
<summary>Spectrum 2 (CSS spectrum-two branch):</summary>

```html
<div
    class="spectrum-Radio spectrum-Radio--sizeM spectrum-Radio--emphasized is-readOnly is-hover is-active"
>
    <input
        type="radio"
        name="radio-group"
        class="spectrum-Radio-input is-focus-visible is-active"
        id="radio-input-123"
        checked="false"
        disabled="false"
        aria-disabled="true"
    />
    <span class="spectrum-Radio-button spectrum-Radio-button--sizeS"></span>
    <label
        class="spectrum-Radio-label spectrum-Radio-label--sizeS"
        for="radio-input-123"
    >
        Radio Button Label
    </label>
</div>
```

</details>

<details>
<summary>Diff: Legacy (CSS main) → Spectrum 2 (CSS spectrum-two)</summary>

```diff
--- a/components/radio/stories/template.js (main branch)
+++ b/components/radio/stories/template.js (spectrum-two branch)
@@ -5,9 +5,6 @@ import { styleMap } from "lit/directives/style-map.js";

 import "../index.css";
-import "../themes/spectrum.css";
-/* Must be imported last */
-import "../themes/express.css";

 export const Template = ({
        rootClass = "spectrum-Radio",
@@ -18,6 +15,9 @@ export const Template = ({
        isChecked = false,
        isDisabled = false,
        isReadOnly = false,
+       isFocused = false,
+       isActive = false,
+       isHovered,
        id = getRandomId("radio"),
        customClasses = [],
        customStyles = {},
@@ -37,7 +37,9 @@ export const Template = ({
                                [`${rootClass}--emphasized`]: isEmphasized,
+                               "is-hover": isHovered,
                                "is-readOnly" : isReadOnly,
+                               "is-active" : isActive,
                                ...customClasses.reduce((a, c) => ({ ...a, [c]: true }), {}),
                        })}
                        style=${styleMap(customStyles)}
@@ -45,7 +47,11 @@ export const Template = ({
                        <input
                                type="radio"
                                name=${name}
-                               class="${rootClass}-input"
+                               class=${classMap({
+                                       ["is-focus-visible"]: isFocused && !isDisabled,
+                                       ["is-active"]: isActive,
+                                       [`${rootClass}-input`]: true
+                               })}
                                id=${inputId}
                                ?checked=${isChecked}
                                ?disabled=${isDisabled}
```

</details>

### CSS => SWC mapping

| CSS selector                                                                                         | Attribute or slot             | Status           |
| ---------------------------------------------------------------------------------------------------- | ----------------------------- | ---------------- |
| `.spectrum-Radio`                                                                                    | Component base                | Implemented      |
| `.spectrum-Radio--emphasized`                                                                        | `emphasized` attribute        | Implemented      |
| `.spectrum-Radio--sizeS`                                                                             | `size="s"` attribute          | Implemented      |
| `.spectrum-Radio--sizeL`                                                                             | `size="l"` attribute          | Implemented      |
| `.spectrum-Radio--sizeXL`                                                                            | `size="xl"` attribute         | Implemented      |
| `.spectrum-Radio-input`                                                                              | Internal radio input element  | Implemented      |
| `.spectrum-Radio-input:checked`                                                                      | `checked` attribute           | Implemented      |
| `.spectrum-Radio-input:disabled`                                                                     | `disabled` attribute          | Implemented      |
| `.spectrum-Radio-button`                                                                             | Internal radio button element | Implemented      |
| `.spectrum-Radio-label`                                                                              | Default slot content          | Implemented      |
| `.spectrum-Radio-label:lang(ja)`, `.spectrum-Radio-label:lang(ko)`, `.spectrum-Radio-label:lang(zh)` | Language-specific styling     | Implemented      |
| `.spectrum-Radio.is-active`                                                                          | Active state styling          | Missing from WC  |
| `.spectrum-Radio.is-readOnly`                                                                        | `readonly` attribute          | Implemented      |
| `.spectrum-Radio:focus`                                                                              | Focus state styling           | Missing from WC  |
| `.spectrum-Radio:hover`                                                                              | Hover state styling           | Missing from WC  |
| `.spectrum-Radio:active`                                                                             | Active state styling          | Missing from WC  |
|                                                                                                      | `invalid` attribute           | Missing from CSS |
|                                                                                                      | `autofocus` attribute         | Missing from CSS |

## Summary of changes

### CSS => SWC implementation gaps

**Features Missing from WC:**

- Interactive state classes (`.spectrum-Radio.is-active`, `.spectrum-Radio:hover`, `.spectrum-Radio:active`) are not automatically applied by the web component during user interactions
- Focus state styling (`:focus` pseudo-class) may not provide optimal focus indication without state classes
- Enhanced visual feedback requires manual state management

**Features Missing from CSS:**

- `invalid` attribute has no corresponding CSS selector for error state styling
- `autofocus` attribute functionality is implemented in JavaScript but has no CSS counterpart

**Implementation Status:**

- All core radio functionality (checked, disabled, emphasized, readonly, size, value) is fully implemented
- Language-specific styling is supported
- Size variants are implemented

### CSS Spectrum 2 changes

Based on the analysis between CSS main and spectrum-two branches:

**Theme import removal** - The spectrum-two branch removes legacy theme imports:

- Removed `import "../themes/spectrum.css"`
- Removed `import "../themes/express.css"`
- This indicates a shift toward unified styling in Spectrum 2

**Enhanced interactive state support** - Added new parameters and state classes:

- Added `isFocused`, `isActive`, and `isHovered` parameters for better state management
- Added `is-hover` and `is-active` classes on the container element
- Added `is-focus-visible` and `is-active` classes on the input element with conditional logic

**Improved accessibility feedback** - Enhanced input element class management:

- Dynamic class application based on focus and active states
- Better separation of concerns with focused state logic

## Resources

- [CSS migration]()
- [Spectrum 2 preview]()
- [React]()
