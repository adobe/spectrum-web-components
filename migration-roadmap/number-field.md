# Number field migration roadmap

## Component specifications

### CSS

<details>
<summary>CSS selectors</summary>

**Base component:**

- `.spectrum-NumberField`
- `.spectrum-NumberField:before`
- `.spectrum-NumberField:lang(ja), .spectrum-NumberField:lang(ko), .spectrum-NumberField:lang(zh)`

**Variants:**

- `.spectrum-NumberField.spectrum-NumberField--hiddenStepper`
- `.spectrum-NumberField.spectrum-NumberField--hiddenStepper .spectrum-NumberField-textfield`
- `.spectrum-NumberField.spectrum-NumberField--hiddenStepper .spectrum-NumberField-textfield .spectrum-NumberField-input`
- `.spectrum-NumberField.spectrum-NumberField--hiddenStepper .spectrum-NumberField-textfield.spectrum-Textfield.is-invalid .spectrum-Textfield-validationIcon`
- `.spectrum-NumberField.spectrum-NumberField--hiddenStepper .spectrum-NumberField-textfield:not(:has(.spectrum-Textfield-validationIcon)) .spectrum-NumberField-input`
- `.spectrum-NumberField.spectrum-NumberField--sideLabel`
- `.spectrum-NumberField.spectrum-NumberField--sideLabel .spectrum-NumberField-fieldLabel`
- `.spectrum-NumberField.spectrum-NumberField--sideLabel .spectrum-NumberField-helpText`
- `.spectrum-NumberField.spectrum-NumberField--sideLabel .spectrum-NumberField-inputs`
- `.spectrum-NumberField.spectrum-NumberField--sizeL`
- `.spectrum-NumberField.spectrum-NumberField--sizeS`
- `.spectrum-NumberField.spectrum-NumberField--sizeXL`

**Child elements:**

- `.spectrum-NumberField-buttons`
- `.spectrum-NumberField-fieldLabel`
- `.spectrum-NumberField-helpText`
- `.spectrum-NumberField-inputs`
- `.spectrum-NumberField-inputs .spectrum-Textfield .spectrum-Textfield-input`
- `.spectrum-NumberField-inputs .spectrum-Textfield.is-invalid .spectrum-NumberField-input`

**Input element:**

- `.spectrum-NumberField-input`
- `.spectrum-NumberField-textfield`

**States:**

- `.spectrum-NumberField-textfield.spectrum-Textfield.is-invalid .spectrum-Textfield-validationIcon`
- `.spectrum-NumberField.is-disabled`
- `.spectrum-NumberField.is-focused.is-hover:not(.is-disabled)`
- `.spectrum-NumberField.is-focused.is-hover:not(.is-disabled, .is-readOnly)`
- `.spectrum-NumberField.is-focused:not(.is-disabled)`
- `.spectrum-NumberField.is-focused:not(.is-disabled):hover`
- `.spectrum-NumberField.is-focused:not(.is-disabled, .is-readOnly)`
- `.spectrum-NumberField.is-focused:not(.is-disabled, .is-readOnly):hover`
- `.spectrum-NumberField.is-hover:not(.is-disabled)`
- `.spectrum-NumberField.is-hover:not(.is-disabled):focus`
- `.spectrum-NumberField.is-hover:not(.is-disabled):focus-visible`
- `.spectrum-NumberField.is-hover:not(.is-disabled):focus-within`
- `.spectrum-NumberField.is-hover:not(.is-disabled, .is-readOnly)`
- `.spectrum-NumberField.is-hover:not(.is-disabled, .is-readOnly):focus`
- `.spectrum-NumberField.is-hover:not(.is-disabled, .is-readOnly):focus-visible`
- `.spectrum-NumberField.is-hover:not(.is-disabled, .is-readOnly):focus-within`
- `.spectrum-NumberField.is-invalid`
- `.spectrum-NumberField.is-keyboardFocused.is-hover:not(.is-disabled)`
- `.spectrum-NumberField.is-keyboardFocused.is-hover:not(.is-disabled, .is-readOnly)`
- `.spectrum-NumberField.is-keyboardFocused:not(.is-disabled)`
- `.spectrum-NumberField.is-keyboardFocused:not(.is-disabled):hover`
- `.spectrum-NumberField.is-keyboardFocused:not(.is-disabled, .is-readOnly)`
- `.spectrum-NumberField.is-keyboardFocused:not(.is-disabled, .is-readOnly) .spectrum-NumberField-inputs`
- `.spectrum-NumberField.is-keyboardFocused:not(.is-disabled, .is-readOnly):hover`
- `.spectrum-NumberField.is-readOnly`

**Interactive states:**

- `.spectrum-NumberField:focus-visible .spectrum-NumberField-inputs`
- `.spectrum-NumberField:not(.is-disabled):focus`
- `.spectrum-NumberField:not(.is-disabled):focus-visible`
- `.spectrum-NumberField:not(.is-disabled):focus-visible:hover`
- `.spectrum-NumberField:not(.is-disabled):focus-within`
- `.spectrum-NumberField:not(.is-disabled):focus-within:hover`
- `.spectrum-NumberField:not(.is-disabled):focus:hover`
- `.spectrum-NumberField:not(.is-disabled):hover`
- `.spectrum-NumberField:not(.is-disabled, .is-readOnly):focus`
- `.spectrum-NumberField:not(.is-disabled, .is-readOnly):focus-visible`
- `.spectrum-NumberField:not(.is-disabled, .is-readOnly):focus-visible:hover`
- `.spectrum-NumberField:not(.is-disabled, .is-readOnly):focus-within`
- `.spectrum-NumberField:not(.is-disabled, .is-readOnly):focus-within:hover`
- `.spectrum-NumberField:not(.is-disabled, .is-readOnly):focus:hover`
- `.spectrum-NumberField:not(.is-disabled, .is-readOnly):hover`

</details>

<details>
<summary>Passthroughs</summary>

- `--mod-textfield-background-color`
- `--mod-textfield-background-color-disabled`
- `--mod-textfield-font-family`
- `--mod-textfield-font-size`
- `--mod-textfield-font-style`
- `--mod-textfield-font-weight`
- `--mod-textfield-height`
- `--mod-textfield-icon-spacing-block-invalid`
- `--mod-textfield-spacing-block-end`
- `--mod-textfield-spacing-block-start`
- `--mod-textfield-text-color-default`
- `--mod-textfield-text-color-disabled`
- `--mod-textfield-text-color-focus`
- `--mod-textfield-width`

</details>

<details>
<summary>Modifiers (deprecated)</summary>

- `--mod-numberfield-background-color`
- `--mod-numberfield-background-color-disabled`
- `--mod-numberfield-block-size`
- `--mod-numberfield-border-color`
- `--mod-numberfield-border-color-disabled`
- `--mod-numberfield-border-color-focus`
- `--mod-numberfield-border-color-focus-hover`
- `--mod-numberfield-border-color-focus-hover-invalid`
- `--mod-numberfield-border-color-focus-invalid`
- `--mod-numberfield-border-color-hover`
- `--mod-numberfield-border-color-hover-invalid`
- `--mod-numberfield-border-color-invalid`
- `--mod-numberfield-border-color-invalid-default`
- `--mod-numberfield-border-color-invalid-focus`
- `--mod-numberfield-border-color-invalid-focus-hover`
- `--mod-numberfield-border-color-invalid-hover`
- `--mod-numberfield-border-color-invalid-keyboard-focus`
- `--mod-numberfield-border-color-keyboard-focus`
- `--mod-numberfield-border-color-keyboard-focus-invalid`
- `--mod-numberfield-border-radius`
- `--mod-numberfield-border-width`
- `--mod-numberfield-button-inline-offset`
- `--mod-numberfield-focus-indicator-color`
- `--mod-numberfield-focus-indicator-gap`
- `--mod-numberfield-focus-indicator-width`
- `--mod-numberfield-font-family`
- `--mod-numberfield-font-size`
- `--mod-numberfield-font-style`
- `--mod-numberfield-font-weight`
- `--mod-numberfield-hidden-stepper-min-inline-size`
- `--mod-numberfield-inline-size`
- `--mod-numberfield-label-to-field`
- `--mod-numberfield-line-height`
- `--mod-numberfield-min-inline-size`
- `--mod-numberfield-spacing-block-end-edge-to-text`
- `--mod-numberfield-spacing-block-start-edge-to-text`
- `--mod-numberfield-spacing-field-to-helptext`
- `--mod-numberfield-text-color`
- `--mod-numberfield-text-color-disabled`
- `--mod-numberfield-text-color-focus`
- `--mod-numberfield-text-color-focus-hover`
- `--mod-numberfield-text-color-hover`
- `--mod-numberfield-text-color-keyboard-focus`

</details>

### SWC

<details>
<summary>Attributes</summary>

**Number Field specific attributes:**

- `format-options` (Object) - Intl.NumberFormatOptions for customizing number formatting
- `hide-stepper` (Boolean) - Whether the stepper UI is hidden or not
- `indeterminate` (Boolean) - Indeterminate state
- `keyboard-focused` (Boolean) - Keyboard focus state
- `max` (Number) - Maximum value
- `min` (Number) - Minimum value
- `step` (Number) - Step increment value
- `step-modifier` (Number) - Step modifier for shift key behavior
- `value` (Number) - Current value (overrides TextfieldBase)

**Inherited from TextfieldBase:**

- `allowed-keys` - A regular expression outlining the keys that will be allowed to update the value
- `autocomplete` - What form of assistance should be provided when attempting to supply a value
- `focused` - Whether the number field is focused (overridden by NumberField)
- `grows` - Whether a form control with multiline attribute will change size vertically
- `invalid` - Whether the number field is invalid
- `label` - A string applied via aria-label to the form control when a user visible label is not provided
- `maxlength` - Defines the maximum string length that the user can enter
- `minlength` - Defines the minimum string length that the user can enter
- `multiline` - Whether the form control should accept a value longer than one line (forced to false)
- `name` - Name of the form control
- `pattern` - Pattern the value must match to be valid
- `placeholder` - Text that appears in the form control when it has no value set
- `quiet` - Whether to display the form control with no visible background
- `readonly` - Whether a user can interact with the value of the form control
- `required` - Whether the form control will be found to be invalid when it holds no value
- `rows` - The specific number of rows the form control should provide in the user interface
- `type` - The type of the form control (defaults to 'text')
- `valid` - Whether the value held by the form control is valid

**Inherited from SizedMixin:**

- `size` - Size of the number field (s, m, l, xl)

**Inherited from Focusable:**

- `autofocus` - When this control is rendered, focus it automatically
- `disabled` - Disable this control. It will not receive focus or events
- `tabIndex` - The tab index to apply to this control

</details>

<details>
<summary>Slots</summary>

- `help-text` - Default or non-negative help text to associate to your form element
- `negative-help-text` - Negative help text to associate to your form element when `invalid`

</details>

## Comparison

### DOM Structure changes

<details>
<summary>Spectrum Web Components:</summary>

```html
<div id="textfield">
    <!-- State icons (when invalid or valid) -->
    <sp-icon-alert id="invalid" class="icon"></sp-icon-alert>
    <!-- OR -->
    <sp-icon-checkmark100
        id="valid"
        class="icon spectrum-UIIcon-Checkmark100"
    ></sp-icon-checkmark100>

    <!-- Input element -->
    <input
        type="text"
        class="input"
        aria-describedby="sp-help-text-..."
        aria-label="Label"
        name="..."
        maxlength="..."
        minlength="..."
        pattern="..."
        placeholder="..."
        autocomplete="off"
        inputmode="numeric"
        ?disabled
        ?required
        ?readonly
    />

    <!-- Stepper buttons (only when hide-stepper=false) -->
    <span class="buttons">
        <sp-infield-button
            inline="end"
            block="start"
            class="button step-up"
            aria-hidden="true"
            label="Increase ..."
            size="..."
            tabindex="-1"
            ?focused
            ?disabled
            ?quiet
        >
            <sp-icon-chevron75
                class="stepper-icon spectrum-UIIcon-ChevronUp75"
            ></sp-icon-chevron75>
        </sp-infield-button>
        <sp-infield-button
            inline="end"
            block="end"
            class="button step-down"
            aria-hidden="true"
            label="Decrease ..."
            size="..."
            tabindex="-1"
            ?focused
            ?disabled
            ?quiet
        >
            <sp-icon-chevron75
                class="stepper-icon spectrum-UIIcon-ChevronDown75"
            ></sp-icon-chevron75>
        </sp-infield-button>
    </span>
</div>

<!-- Help text container (inherited from TextfieldBase) -->
<div id="sp-help-text-..." aria-live="assertive">
    <slot name="negative-help-text"></slot>
    <!-- OR -->
    <slot name="help-text"></slot>
</div>
```

</details>

<details>
<summary>Legacy (CSS main branch):</summary>

```html
<div class="spectrum-Stepper">
    <div class="spectrum-Textfield spectrum-Stepper-textfield">
        <input
            type="number"
            class="spectrum-Textfield-input spectrum-Stepper-input"
        />
    </div>
    <span class="spectrum-Stepper-buttons">
        <button
            class="spectrum-InfieldButton spectrum-Stepper-button spectrum-InfieldButton--top"
        >
            <div class="spectrum-InfieldButton-fill">
                <svg class="spectrum-Icon spectrum-UIIcon-ChevronUp100"></svg>
            </div>
        </button>
        <button
            class="spectrum-InfieldButton spectrum-Stepper-button spectrum-InfieldButton--bottom"
        >
            <div class="spectrum-InfieldButton-fill">
                <svg class="spectrum-Icon spectrum-UIIcon-ChevronDown100"></svg>
            </div>
        </button>
    </span>
</div>
```

</details>

<details>
<summary>Spectrum 2 (CSS spectrum-two branch):</summary>

```html
<div class="spectrum-NumberField">
    <label class="spectrum-FieldLabel spectrum-NumberField-fieldLabel">
        Label
    </label>
    <div class="spectrum-NumberField-inputs">
        <div class="spectrum-Textfield spectrum-NumberField-textfield">
            <input
                type="number"
                class="spectrum-Textfield-input spectrum-NumberField-input"
            />
        </div>
        <span class="spectrum-NumberField-buttons">
            <div class="spectrum-InfieldButton-inline">
                <button
                    class="spectrum-InfieldButton spectrum-NumberField-button"
                >
                    <div class="spectrum-InfieldButton-fill">
                        <svg
                            class="spectrum-Icon spectrum-UIIcon-ChevronUp100"
                        ></svg>
                    </div>
                </button>
                <button
                    class="spectrum-InfieldButton spectrum-NumberField-button"
                >
                    <div class="spectrum-InfieldButton-fill">
                        <svg
                            class="spectrum-Icon spectrum-UIIcon-ChevronDown100"
                        ></svg>
                    </div>
                </button>
            </div>
        </span>
    </div>
    <div class="spectrum-NumberField-helpText">
        <div class="spectrum-HelpText">
            <div class="spectrum-HelpText-text">Help text</div>
        </div>
    </div>
</div>
```

</details>

<details>
<summary>Diff: Legacy (CSS main) → Spectrum 2 (CSS spectrum-two)</summary>

**Key changes in spectrum-two**:

- Base class changes from `.spectrum-Stepper` to `.spectrum-NumberField`
- Addition of field label with `.spectrum-NumberField-fieldLabel` class
- New wrapper div with `.spectrum-NumberField-inputs` class around textfield and buttons
- Removal of `--top` and `--bottom` modifier classes from infield buttons

```diff
--- a/components/stepper/stories/template.js (main branch)
+++ b/components/stepper/stories/template.js (spectrum-two branch)
@@ -1,1 +1,3 @@
-<div class="spectrum-Stepper">
+<div class="spectrum-NumberField">
+  <label class="spectrum-FieldLabel spectrum-NumberField-fieldLabel">Label</label>
+  <div class="spectrum-NumberField-inputs">
@@ -3,4 +5,4 @@
-  <div class="spectrum-Textfield spectrum-Stepper-textfield">
-    <input type="number" class="spectrum-Textfield-input spectrum-Stepper-input">
+  <div class="spectrum-Textfield spectrum-NumberField-textfield">
+    <input type="number" class="spectrum-Textfield-input spectrum-NumberField-input">
   </div>
-  <span class="spectrum-Stepper-buttons">
-    <button class="spectrum-InfieldButton spectrum-Stepper-button spectrum-InfieldButton--top">
-      <div class="spectrum-InfieldButton-fill">
-        <svg class="spectrum-Icon spectrum-UIIcon-ChevronUp100"></svg>
-      </div>
-    </button>
-    <button class="spectrum-InfieldButton spectrum-Stepper-button spectrum-InfieldButton--bottom">
-      <div class="spectrum-InfieldButton-fill">
-        <svg class="spectrum-Icon spectrum-UIIcon-ChevronDown100"></svg>
-      </div>
-    </button>
+  <span class="spectrum-NumberField-buttons">
+    <div class="spectrum-InfieldButton-inline">
+      <button class="spectrum-InfieldButton spectrum-NumberField-button">
+        <div class="spectrum-InfieldButton-fill">
+          <svg class="spectrum-Icon spectrum-UIIcon-ChevronUp100"></svg>
+        </div>
+      </button>
+      <button class="spectrum-InfieldButton spectrum-NumberField-button">
+        <div class="spectrum-InfieldButton-fill">
+          <svg class="spectrum-Icon spectrum-UIIcon-ChevronDown100"></svg>
+        </div>
+      </button>
+    </div>
   </span>
+  </div>
+  <div class="spectrum-NumberField-helpText">
+    <div class="spectrum-HelpText">
+      <div class="spectrum-HelpText-text">Help text</div>
+    </div>
+  </div>
 </div>
```

</details>

### CSS => SWC mapping

| CSS selector                                                                                     | Attribute or slot                                                | Status                                                        |
| ------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------- | ------------------------------------------------------------- |
| `.spectrum-NumberField`                                                                          | `:host`/base component                                           | Implemented                                                   |
| `.spectrum-NumberField--sizeS`                                                                   | `size="s"`                                                       | Implemented                                                   |
| `.spectrum-NumberField--sizeL`                                                                   | `size="l"`                                                       | Implemented                                                   |
| `.spectrum-NumberField--sizeXL`                                                                  | `size="xl"`                                                      | Implemented                                                   |
| `.spectrum-NumberField--hiddenStepper`                                                           | `hide-stepper`                                                   | Implemented                                                   |
| `.spectrum-NumberField.is-disabled`                                                              | `disabled`                                                       | Implemented                                                   |
| `.spectrum-NumberField.is-readOnly`                                                              | `readonly`                                                       | Implemented                                                   |
| `.spectrum-NumberField.is-invalid`                                                               | `invalid`                                                        | Implemented                                                   |
| `.spectrum-NumberField-fieldLabel`                                                               | `<sp-field-label>` (sibling element)                             | Implemented                                                   |
| `.spectrum-NumberField-helpText`                                                                 | `help-text` slot                                                 | Implemented                                                   |
| `.spectrum-NumberField:lang(ja), .spectrum-NumberField:lang(ko), .spectrum-NumberField:lang(zh)` | Language-specific styling                                        | Implemented                                                   |
| `.spectrum-NumberField-buttons`                                                                  | Stepper buttons (`<span class="buttons"`)                        | Implemented                                                   |
| `.spectrum-NumberField-input`                                                                    | Input element (`<div class="input">`)                            | Implemented                                                   |
| `.spectrum-NumberField-inputs`                                                                   | Wrapper for textfield and button inputs (`<div id="textfield">`) | Implemented                                                   |
| `.spectrum-NumberField-textfield`                                                                | Textfield wrapper inside of `<div id="textfield">`               | Missing from WC (markup updated for S2)                       |
| `.spectrum-NumberField--sideLabel`                                                               | `label-position`                                                 | Missing from WC (SWC has different side label implementation) |

## Summary of changes

### CSS => SWC implementation gaps

The following features are missing from the web component implementation:

- **Side label positioning**: As also seen in textfield, CSS supports `--sideLabel` modifier but there's no corresponding attribute in the web component
- **Quiet variant removal**: Also seen in textfield, the quiet variant no longer exists in full-fidelity Spectrum 2 implementations.

Note: There are some differences in markup between SWC and Spectrum 2 CSS that will likely require some additional adjustment during SWC migration.

### CSS Spectrum 2 changes

The migration from legacy CSS (main branch) to Spectrum 2 (spectrum-two branch) represents a significant architectural change:

**Component rename**: The component's classnames were renamed from `.spectrum-Stepper` to `.spectrum-NumberField` in order to be more consistent with SWC.

- The `.hide-stepper` class was converted to `.spectrum-NumberField--hiddenStepper`

**Structural changes and feature additions**:

- Markup for `spectrum-two` CSS embeds field label and help text components
- Introduced `spectrum-NumberField-inputs` container wrapper
- Added side label positioning with `--sideLabel` modifier
- The embedded infield buttons used in the Number field have changed. Rather than being stacked vertically and sitting directly on the edge of the input field, infield buttons now sit side by side, with spacing around them on all sides.
- The `spectrum-two` CSS for Number field now has styles for read-only

## Resources

- [CSS migration](https://github.com/adobe/spectrum-css/pull/3681)
- [Spectrum 2 preview](https://spectrumcss.z13.web.core.windows.net/pr-2352/index.html?path=/docs/components-number-field--docs)
- [React](https://react-spectrum.adobe.com/s2/index.html?path=/docs/numberfield--docs)
