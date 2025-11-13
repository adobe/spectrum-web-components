# Textfield and Textarea migration roadmap

## Component specifications

### CSS

<details>
<summary>CSS selectors</summary>

**Base component:**

- `.spectrum-Textfield`

**Variants:**

- `.spectrum-Textfield--sideLabel`
- `.spectrum-Textfield--multiline .spectrum-Textfield-input`
- `.spectrum-Textfield--multiline .spectrum-Textfield-input:lang(ja)`
- `.spectrum-Textfield--multiline .spectrum-Textfield-input:lang(ko)`
- `.spectrum-Textfield--multiline .spectrum-Textfield-input:lang(zh)`
- `.spectrum-Textfield--multiline.spectrum-Textfield--grows .spectrum-Textfield-input`
- `.spectrum-Textfield--multiline.spectrum-Textfield--grows.spectrum-Textfield--sideLabel .spectrum-Textfield-input`
- `.spectrum-Textfield--sizeL`
- `.spectrum-Textfield--sizeS`
- `.spectrum-Textfield--sizeXL`

**Child elements:**

- `.spectrum-Textfield .spectrum-FieldLabel`
- `.spectrum-Textfield .spectrum-HelpText`
- `.spectrum-Textfield--sideLabel .spectrum-FieldLabel`
- `.spectrum-Textfield--sideLabel .spectrum-HelpText`

**Features:**

- `.spectrum-Textfield-characterCount`
- `.spectrum-Textfield-characterCount:lang(ja)`
- `.spectrum-Textfield-characterCount:lang(ko)`
- `.spectrum-Textfield-characterCount:lang(zh)`
- `.spectrum-Textfield--sideLabel .spectrum-Textfield-characterCount`

**Input element:**

- `.spectrum-Textfield-input`
- `.spectrum-Textfield-input:-moz-ui-invalid`
- `.spectrum-Textfield-input::placeholder`
- `.spectrum-Textfield-input:disabled`
- `.spectrum-Textfield-input:disabled::placeholder`
- `.spectrum-Textfield-input:focus`
- `.spectrum-Textfield-input:focus::placeholder`
- `.spectrum-Textfield-input:focus:hover`
- `.spectrum-Textfield-input:focus:hover::placeholder`
- `.spectrum-Textfield-input:hover`
- `.spectrum-Textfield-input:hover::placeholder`
- `.spectrum-Textfield-input:read-only`
- `.spectrum-Textfield-input:read-only::placeholder`
- `.spectrum-Textfield-input[type="number"]`
- `.spectrum-Textfield-input[type="number"]::-webkit-inner-spin-button`
- `.spectrum-Textfield-input[type="number"]::-webkit-outer-spin-button`
- `.spectrum-Textfield--sideLabel .spectrum-Textfield-input`

**States:**

- `.spectrum-Textfield.is-disabled .spectrum-FieldLabel`
- `.spectrum-Textfield.is-disabled .spectrum-HelpText .spectrum-HelpText-text`
- `.spectrum-Textfield.is-disabled .spectrum-Textfield-characterCount`
- `.spectrum-Textfield.is-disabled .spectrum-Textfield-input`
- `.spectrum-Textfield.is-disabled .spectrum-Textfield-input::placeholder`
- `.spectrum-Textfield.is-disabled .spectrum-Textfield-input:read-only::placeholder`
- `.spectrum-Textfield.is-disabled .spectrum-Textfield-validationIcon`
- `.spectrum-Textfield.is-disabled .spectrum-Textfield.is-readOnly .spectrum-Textfield-input::placeholder`
- `.spectrum-Textfield.is-disabled .spectrum-Textfield.is-readOnly:hover .spectrum-Textfield-input::placeholder`
- `.spectrum-Textfield.is-disabled:hover .spectrum-Textfield-input`
- `.spectrum-Textfield.is-disabled:hover .spectrum-Textfield-input::placeholder`
- `.spectrum-Textfield.is-disabled:hover .spectrum-Textfield-input:read-only::placeholder`
- `.spectrum-Textfield.is-disabled:hover .spectrum-Textfield.is-readOnly .spectrum-Textfield-input::placeholder`
- `.spectrum-Textfield.is-disabled:hover .spectrum-Textfield.is-readOnly:hover .spectrum-Textfield-input::placeholder`
- `.spectrum-Textfield.is-focused .spectrum-Textfield-input`
- `.spectrum-Textfield.is-focused .spectrum-Textfield-input::placeholder`
- `.spectrum-Textfield.is-focused .spectrum-Textfield-input:hover`
- `.spectrum-Textfield.is-focused .spectrum-Textfield-input:hover::placeholder`
- `.spectrum-Textfield.is-focused:hover .spectrum-Textfield-input`
- `.spectrum-Textfield.is-focused:hover .spectrum-Textfield-input::placeholder`
- `.spectrum-Textfield.is-invalid .spectrum-Textfield-input`
- `.spectrum-Textfield.is-invalid .spectrum-Textfield-input:focus`
- `.spectrum-Textfield.is-invalid .spectrum-Textfield-input:focus:hover`
- `.spectrum-Textfield.is-invalid .spectrum-Textfield-validationIcon`
- `.spectrum-Textfield.is-invalid.is-focused .spectrum-Textfield-input`
- `.spectrum-Textfield.is-invalid.is-focused .spectrum-Textfield-input:hover`
- `.spectrum-Textfield.is-invalid.is-focused:hover .spectrum-Textfield-input`
- `.spectrum-Textfield.is-invalid.is-keyboardFocused .spectrum-Textfield-input`
- `.spectrum-Textfield.is-invalid.is-keyboardFocused:hover .spectrum-Textfield-input`
- `.spectrum-Textfield.is-invalid:focus .spectrum-Textfield-input`
- `.spectrum-Textfield.is-invalid:focus .spectrum-Textfield-input:hover`
- `.spectrum-Textfield.is-invalid:focus:hover .spectrum-Textfield-input`
- `.spectrum-Textfield.is-invalid:hover:not(.is-disabled, .is-readOnly) .spectrum-Textfield-input`
- `.spectrum-Textfield.is-invalid:not(.is-disabled, .is-readOnly) .spectrum-Textfield-input:hover`
- `.spectrum-Textfield.is-keyboardFocused .spectrum-Textfield-input`
- `.spectrum-Textfield.is-keyboardFocused .spectrum-Textfield-input::placeholder`
- `.spectrum-Textfield.is-keyboardFocused:hover .spectrum-Textfield-input`
- `.spectrum-Textfield.is-keyboardFocused:hover .spectrum-Textfield-input::placeholder`
- `.spectrum-Textfield.is-readOnly .spectrum-Textfield-input`
- `.spectrum-Textfield.is-readOnly .spectrum-Textfield-input::placeholder`
- `.spectrum-Textfield.is-readOnly .spectrum-Textfield-validationIcon`
- `.spectrum-Textfield.is-readOnly.is-disabled .spectrum-Textfield-input`
- `.spectrum-Textfield.is-readOnly:hover .spectrum-Textfield-input`
- `.spectrum-Textfield.is-readOnly:hover .spectrum-Textfield-input::placeholder`
- `.spectrum-Textfield.is-valid .spectrum-Textfield-input`
- `.spectrum-Textfield.is-valid .spectrum-Textfield-validationIcon`
- `.spectrum-Textfield.spectrum-Textfield--sideLabel .spectrum-Textfield-validationIcon`
- `.spectrum-Textfield:focus:hover .spectrum-Textfield-input`
- `.spectrum-Textfield:focus:hover .spectrum-Textfield-input::placeholder`
- `.spectrum-Textfield:hover .spectrum-Textfield-input`
- `.spectrum-Textfield:hover .spectrum-Textfield-input::placeholder`

</details>

<details>
<summary>Passthroughs</summary>

None found for this component.

</details>

<details>
<summary>Modifiers (deprecated)</summary>

- `--mod-text-area-min-block-size`
- `--mod-text-area-min-inline-size`
- `--mod-textfield-animation-duration`
- `--mod-textfield-background-color`
- `--mod-textfield-background-color-disabled`
- `--mod-textfield-border-color`
- `--mod-textfield-border-color-disabled`
- `--mod-textfield-border-color-focus`
- `--mod-textfield-border-color-focus-hover`
- `--mod-textfield-border-color-hover`
- `--mod-textfield-border-color-invalid-default`
- `--mod-textfield-border-color-invalid-focus`
- `--mod-textfield-border-color-invalid-focus-hover`
- `--mod-textfield-border-color-invalid-hover`
- `--mod-textfield-border-color-invalid-keyboard-focus`
- `--mod-textfield-border-color-keyboard-focus`
- `--mod-textfield-border-width`
- `--mod-textfield-character-count-color`
- `--mod-textfield-character-count-spacing-block`
- `--mod-textfield-character-count-spacing-block-side`
- `--mod-textfield-character-count-spacing-inline`
- `--mod-textfield-character-count-spacing-inline-side`
- `--mod-textfield-corner-radius`
- `--mod-textfield-focus-indicator-color`
- `--mod-textfield-focus-indicator-gap`
- `--mod-textfield-focus-indicator-width`
- `--mod-textfield-font-family`
- `--mod-textfield-font-size`
- `--mod-textfield-font-style`
- `--mod-textfield-font-weight`
- `--mod-textfield-height`
- `--mod-textfield-helptext-spacing-block`
- `--mod-textfield-icon-color-invalid`
- `--mod-textfield-icon-color-valid`
- `--mod-textfield-icon-size-invalid`
- `--mod-textfield-icon-size-valid`
- `--mod-textfield-icon-spacing-block-invalid`
- `--mod-textfield-icon-spacing-block-valid`
- `--mod-textfield-icon-spacing-inline-end-invalid`
- `--mod-textfield-icon-spacing-inline-end-valid`
- `--mod-textfield-icon-spacing-inline-start-invalid`
- `--mod-textfield-icon-spacing-inline-start-valid`
- `--mod-textfield-label-spacing-block`
- `--mod-textfield-label-spacing-inline-side-label`
- `--mod-textfield-line-height`
- `--mod-textfield-line-height-cjk`
- `--mod-textfield-min-width`
- `--mod-textfield-spacing-block-end`
- `--mod-textfield-spacing-block-start`
- `--mod-textfield-spacing-inline`
- `--mod-textfield-text-color-default`
- `--mod-textfield-text-color-disabled`
- `--mod-textfield-text-color-focus`
- `--mod-textfield-text-color-focus-hover`
- `--mod-textfield-text-color-hover`
- `--mod-textfield-text-color-invalid`
- `--mod-textfield-text-color-keyboard-focus`
- `--mod-textfield-text-color-readonly`
- `--mod-textfield-text-color-valid`
- `--mod-textfield-width`

</details>

### SWC

<details>
<summary>Attributes</summary>

**TextfieldBase specific attributes:**

- `allowed-keys` - A regular expression outlining the keys that will be allowed to update the value of the form control
- `autocomplete` - What form of assistance should be provided when attempting to supply a value to the form control
- `focused` - Whether the component is focused (private)
- `grows` - Whether a form control delivered with the multiline attribute will change size vertically to accommodate longer input
- `invalid` - Whether the value held by the form control is invalid
- `label` - A string applied via aria-label to the form control when a user visible label is not provided
- `maxlength` - Defines the maximum string length that the user can enter
- `minlength` - Defines the minimum string length that the user can enter
- `multiline` - Whether the form control should accept a value longer than one line
- `name` - Name of the form control
- `pattern` - Pattern the value must match to be valid
- `placeholder` - Text that appears in the form control when it has no value set
- `quiet` - Whether to display the form control with no visible background
- `readonly` - Whether a user can interact with the value of the form control
- `required` - Whether the form control will be found to be invalid when it holds no value
- `rows` - The specific number of rows the form control should provide in the user interface
- `type` - Input type (text, url, tel, email, password)
- `valid` - Whether the value held by the form control is valid
- `value` - The value held by the form control

**Inherited from SizedMixin:**

- `size` - Size of the textfield (s, m, l, xl)

**Inherited from Focusable:**

- `autofocus` - When this control is rendered, focus it automatically
- `disabled` - Disable this control. It will not receive focus or events
- `tabIndex` - The tab index to apply to this control

</details>

<details>
<summary>Slots</summary>

- `help-text` - Default or non-negative help text to associate to your form element
- `negative-help-text` - Negative help text to associate to your form element when invalid

</details>

## Comparison

### DOM structure changes

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

    <!-- Input element (single line) -->
    <input
        name="..."
        type="text"
        aria-describedby="sp-help-text-..."
        aria-label="..."
        aria-invalid="true"
        class="input"
        title=""
        maxlength="..."
        minlength="..."
        pattern="..."
        placeholder="..."
        .value="..."
        ?disabled
        ?required
        ?readonly
        autocomplete="..."
        @pointerdown="handleInputElementPointerdown"
    />

    <!-- OR for multiline -->
    <!-- Sizer (multiline only, when grows && rows === -1) -->
    <div id="sizer" class="input" aria-hidden="true">value&#8203;</div>
    <textarea
        name="..."
        aria-describedby="sp-help-text-..."
        aria-label="..."
        aria-invalid="true"
        class="input"
        maxlength="..."
        minlength="..."
        title=""
        pattern="..."
        placeholder="..."
        .value="..."
        ?disabled
        ?required
        ?readonly
        rows="..."
        autocomplete="..."
    ></textarea>
</div>

<!-- Help text container (inherited from ManageHelpText) -->
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
<div
    class="spectrum-Textfield spectrum-Textfield--sizeM spectrum-Textfield--multiline spectrum-Textfield--grows spectrum-Textfield--quiet spectrum-Textfield--sideLabel is-invalid is-valid is-focused is-keyboardFocused is-disabled is-readOnly"
    id="textfield"
>
    <label class="spectrum-FieldLabel spectrum-FieldLabel--sizeM">
        Label Text
    </label>
    <span class="spectrum-Textfield-characterCount">Character Count</span>
    <svg
        class="spectrum-Icon spectrum-Icon--sizeM spectrum-Textfield-validationIcon"
        focusable="false"
        aria-hidden="true"
        aria-label="AlertTriangle"
        role="img"
    >
        <title>Alert Triangle</title>
        <use
            xlink:href="#spectrum-icon-18-AlertTriangle"
            href="#spectrum-icon-18-AlertTriangle"
        />
    </svg>
    <textarea
        placeholder="placeholder"
        name="name"
        id="textfield-input"
        value="value"
        autocomplete="off"
        required
        disabled
        readonly
        pattern="pattern"
        class="spectrum-Textfield-input"
    ></textarea>
    <!-- OR for input -->
    <input
        type="text"
        placeholder="placeholder"
        name="name"
        id="textfield-input"
        value="value"
        autocomplete="off"
        required
        disabled
        readonly
        pattern="pattern"
        class="spectrum-Textfield-input"
    />
    <div
        class="spectrum-ProgressCircle spectrum-ProgressCircle--sizeS spectrum-ProgressCircle--indeterminate"
    >
        <!-- Progress circle content -->
    </div>
    <div
        class="spectrum-HelpText spectrum-HelpText--sizeM spectrum-HelpText--negative"
    >
        <div class="spectrum-HelpText-text">Help text content</div>
    </div>
</div>
```

</details>

<details>
<summary>Spectrum 2 (CSS spectrum-two branch):</summary>

```html
<div
    class="spectrum-Textfield spectrum-Textfield--sizeM spectrum-Textfield--multiline spectrum-Textfield--grows spectrum-Textfield--sideLabel is-invalid is-valid is-hover is-focused is-keyboardFocused is-disabled is-readOnly"
    id="textfield"
>
    <label class="spectrum-FieldLabel spectrum-FieldLabel--sizeM">
        Label Text
    </label>
    <span class="spectrum-Textfield-characterCount">Character Count</span>
    <svg
        class="spectrum-Icon spectrum-Icon--sizeM spectrum-Textfield-validationIcon"
        focusable="false"
        aria-hidden="true"
        aria-label="AlertTriangle"
        role="img"
    >
        <title>Alert Triangle</title>
        <use
            xlink:href="#spectrum-icon-18-AlertTriangle"
            href="#spectrum-icon-18-AlertTriangle"
        />
    </svg>
    <textarea
        placeholder="placeholder"
        name="name"
        id="textfield-input"
        value="value"
        autocomplete="off"
        required
        disabled
        readonly
        pattern="pattern"
        class="spectrum-Textfield-input"
    ></textarea>
    <!-- OR for input -->
    <input
        type="text"
        placeholder="placeholder"
        name="name"
        id="textfield-input"
        value="value"
        autocomplete="off"
        required
        disabled
        readonly
        pattern="pattern"
        class="spectrum-Textfield-input"
    />
    <div
        class="spectrum-InfieldProgressCircle spectrum-InfieldProgressCircle--sizeM spectrum-InfieldProgressCircle--indeterminate"
    >
        <!-- Progress circle content -->
    </div>
    <div
        class="spectrum-HelpText spectrum-HelpText--sizeM spectrum-HelpText--negative"
    >
        <div class="spectrum-HelpText-text">Help text content</div>
    </div>
</div>
```

</details>

<details>
<summary>Diff: Legacy (CSS main) → Spectrum 2 (CSS spectrum-two)</summary>

```diff
--- Legacy DOM structure
+++ Spectrum 2 DOM structure
@@ -1,7 +1,7 @@
-<div class="spectrum-Textfield spectrum-Textfield--sizeM spectrum-Textfield--multiline spectrum-Textfield--grows spectrum-Textfield--quiet spectrum-Textfield--sideLabel is-invalid is-valid is-focused is-keyboardFocused is-disabled is-readOnly" id="textfield">
+<div class="spectrum-Textfield spectrum-Textfield--sizeM spectrum-Textfield--multiline spectrum-Textfield--grows spectrum-Textfield--sideLabel is-invalid is-valid is-hover is-focused is-keyboardFocused is-disabled is-readOnly" id="textfield">
-  <div class="spectrum-FieldLabel spectrum-FieldLabel--sizeM">
-    <label class="spectrum-FieldLabel-text">Label Text</label>
-  </div>
+  <label class="spectrum-FieldLabel spectrum-FieldLabel--sizeM">
+    Label Text
+  </label>
   <span class="spectrum-Textfield-characterCount">Character Count</span>
-  <svg class="spectrum-Icon spectrum-Icon--sizeM spectrum-Textfield-validationIcon" focusable="false" aria-hidden="true">
-    <title>Alert</title>
-    <use xlink:href="#spectrum-icon-18-AlertTriangle" />
-  </svg>
+  <svg
+    class="spectrum-Icon spectrum-Icon--sizeM spectrum-Textfield-validationIcon"
+    focusable="false"
+    aria-hidden="true"
+    aria-label="AlertTriangle"
+    role="img"
+  >
+    <title>Alert Triangle</title>
+    <use xlink:href="#spectrum-icon-18-AlertTriangle" href="#spectrum-icon-18-AlertTriangle" />
+  </svg>
   <textarea
     placeholder="placeholder"
     name="name"
     id="textfield-input"
     value="value"
     autocomplete="off"
     required
     disabled
     readonly
     pattern="pattern"
     class="spectrum-Textfield-input"
   ></textarea>
   <!-- OR for input -->
   <input
     type="text"
     placeholder="placeholder"
     name="name"
     id="textfield-input"
     value="value"
     autocomplete="off"
     required
     disabled
     readonly
     pattern="pattern"
     class="spectrum-Textfield-input"
   />
-  <div class="spectrum-ProgressCircle spectrum-ProgressCircle--sizeS spectrum-ProgressCircle--indeterminate">
+  <div class="spectrum-InfieldProgressCircle spectrum-InfieldProgressCircle--sizeM spectrum-InfieldProgressCircle--indeterminate">
     <!-- Progress circle content -->
   </div>
-  <div class="spectrum-HelpText spectrum-HelpText--sizeM spectrum-HelpText--negative">
-    <div class="spectrum-HelpText-text">Help text content</div>
-  </div>
+  <div class="spectrum-HelpText spectrum-HelpText--sizeM spectrum-HelpText--negative">
+    <div class="spectrum-HelpText-text">Help text content</div>
+  </div>
 </div>
```

**Key DOM changes:**

- **Removed**: `spectrum-Textfield--quiet` class (quiet variant removed in Spectrum 2)
- **Added**: `is-hover` class for hover state management
- **Progress circle component**: Changed from `spectrum-ProgressCircle` to `spectrum-InfieldProgressCircle`
- **Progress circle size**: Changed from `--sizeS` to `--sizeM` (now uses dynamic sizing)

</details>

### CSS => SWC mapping

| CSS selector                                                                                                                                 | Attribute or slot       | Status                                                                             |
| -------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- | ---------------------------------------------------------------------------------- |
| `.spectrum-Textfield`                                                                                                                        | `:host`                 | Implemented                                                                        |
| `.spectrum-Textfield--sizeS`                                                                                                                 | `size="s"`              | Implemented                                                                        |
| `.spectrum-Textfield--sizeL`                                                                                                                 | `size="l"`              | Implemented                                                                        |
| `.spectrum-Textfield--sizeXL`                                                                                                                | `size="xl"`             | Implemented                                                                        |
| `.spectrum-Textfield--multiline`                                                                                                             | `multiline`             | Implemented                                                                        |
| `.spectrum-Textfield--grows`                                                                                                                 | `grows`                 | Implemented                                                                        |
| `.spectrum-Textfield.is-invalid`                                                                                                             | `invalid`               | Implemented                                                                        |
| `.spectrum-Textfield.is-valid`                                                                                                               | `valid`                 | Implemented                                                                        |
| `.spectrum-Textfield.is-disabled`                                                                                                            | `disabled`              | Implemented                                                                        |
| `.spectrum-Textfield.is-readOnly`                                                                                                            | `readonly`              | Implemented                                                                        |
| `.spectrum-Textfield.is-focused`                                                                                                             | `focused`               | Implemented                                                                        |
| `.spectrum-Textfield-input[type="number"]`                                                                                                   | `type="number"`         | Implemented                                                                        |
| `.spectrum-Textfield-input:disabled`                                                                                                         | `disabled`              | Implemented                                                                        |
| `.spectrum-Textfield-input:read-only`                                                                                                        | `readonly`              | Implemented                                                                        |
| `.spectrum-Textfield-input:focus`                                                                                                            | `focused`               | Implemented, but SWC does not differentiate between keyboard focus and mouse focus |
| `.spectrum-Textfield-input:hover`                                                                                                            | CSS `:hover`            | Implemented via CSS                                                                |
| `.spectrum-Textfield .spectrum-FieldLabel`                                                                                                   | `label` attribute       | Implemented                                                                        |
| `.spectrum-Textfield .spectrum-HelpText`                                                                                                     | `help-text` slot        | Implemented                                                                        |
| `.spectrum-Textfield-validationIcon`                                                                                                         | Validation icons        | Implemented                                                                        |
| `.spectrum-Textfield-input::placeholder`                                                                                                     | `placeholder`           | Implemented                                                                        |
| `.spectrum-Textfield-input[type="number"]::-webkit-inner-spin-button`, `.spectrum-Textfield-input[type="number"]::-webkit-outer-spin-button` | Number input styling    | Implemented                                                                        |
| `input[name]`, `textarea[name]`                                                                                                              | `name`                  | Implemented (standard HTML)                                                        |
| `input[pattern]`, `textarea[pattern]`                                                                                                        | `pattern`               | Implemented (standard HTML)                                                        |
| `input[maxlength]`, `textarea[maxlength]`                                                                                                    | `maxlength`             | Implemented (standard HTML)                                                        |
| `input[minlength]`, `textarea[minlength]`                                                                                                    | `minlength`             | Implemented (standard HTML)                                                        |
| `textarea[rows]`                                                                                                                             | `rows`                  | Implemented (standard HTML)                                                        |
| `input[value]`, `textarea[value]`                                                                                                            | `value`                 | Implemented (standard HTML)                                                        |
| `input[required]`, `textarea[required]`                                                                                                      | `required`              | Implemented (standard HTML)                                                        |
| `input[autocomplete]`, `textarea[autocomplete]`                                                                                              | `autocomplete`          | Implemented (standard HTML)                                                        |
| `input[allowed-keys]` (custom attribute)                                                                                                     | `allowed-keys`          | Implemented (custom)                                                               |
| `.spectrum-Textfield--sideLabel`                                                                                                             | `labelPosition` (side)  | Missing from SWC textfield but exists within SWC field label                       |
| `.spectrum-Textfield-characterCount`                                                                                                         | Character count feature | Missing from SWC (existed in S1 but never implemented in SWC)                      |
| `.spectrum-Textfield--quiet`                                                                                                                 | `quiet`                 | Deprecated for S2                                                                  |

## Summary of changes

There are a few changes in CSS migration to S2 that are relevant to related components, such as number field (for the `step` value) and field label (for required, see additional note below). In SWC, field label is rendered outside of `<sp-textfield>`, but in CSS, they are part of the template.

There also doesn't appear to be support for rendering a progress circle inside of `<sp-textfield>`, which will need to be added.

Side label exists as a variant of field label in SWC, but in CSS, the variant is controlled by textfield.

**Note:** Field label's required option isn't new to SWC, but because Adobe design allows an input to be marked as required by noting it in the field label, see [the textfield design docs](https://spectrum.adobe.com/page/text-field/#Required-or-optional), without an asterisk, that's something we'll likely want to support.

**Also noteworthy**: there is an additional inline textfield variant that has not yet been implemented in Spectrum CSS or Spectrum Web Components.

In comparing Legacy CSS to Spectrum 2 CSS, and CSS to SWC, here are the changes for textfield and textarea that would need to be made in SWC:

- Look into adding side label position option to textfield
- Implement character count (note that this appears next to the field label for a top label, and on the opposite side of the input for a side label)
- Removal of the quiet variant
- Use of the inline progress circle component for the textfield's progress circle (**Note**: Spectrum CSS doesn't currently show textfield with the progress circle as there is no design spec for it)
- Implementation of the new inline textfield variant
- Applying the `required` attribute to the text input without displaying the asterisk in the field label to accommodate the [two styling options available](https://spectrum.adobe.com/page/text-field/#Required-or-optional) for required text fields
- Look into keyboard focus state, determine if this should differ from mouse focused state

See below for more details.

### CSS => SWC implementation gaps

#### Textfield implementation gaps

The mapping analysis reveals several key differences present in the CSS implementation but not the SWC implementation:

- **Label position**: This is controlled by field label in SWC, but controlled by textfield in CSS
- **Character count**: SWC doesn't currently support a visible character count that would track the number of characters within the text field
- **Keyboard focus state**: CSS has slightly different styling for focused vs. keyboard-focused state (keyboard focus shows the blue outline, mouse focus does not), this distinction is not visible in the current SWC implementation

#### Textarea implementation gaps

The textarea component (implemented as `sp-textfield[multiline]`) has the same missing features as the textfield component, since it uses the same underlying implementation. All the gaps mentioned in the textfield section apply to textarea as well.

### CSS Spectrum 2 changes

#### Textfield changes

The main API change for Spectrum 2 is the removal of the `quiet` variant.

Additionally, the progress circle used within the textfield component is now the new infield progress circle rather than the standalone progress circle.

The comparison between CSS `main` and CSS `spectrum-two` branches reveals several noteworthy changes:

**Template parameter changes:**

- Added `step` parameter for number input step attribute
- Added `isRequiredWithoutAsterisk` parameter (allows for input to be marked with required attribute without applying the asterisk to the associated field label)

**Icon changes:**

- **Invalid icon**: Changed from `"Alert"` to `"AlertTriangle"`
- **Valid icon**: Changed from simple `"Checkmark"` to size-specific checkmarks (`"Checkmark75"`, `"Checkmark100"`, `"Checkmark200"`, `"Checkmark300"`)

#### Textarea changes

All the changes mentioned in the textfield section apply to textarea as well, since textarea is implemented as `sp-textfield[multiline]`. The multiline variant will inherit all the same changes.

## Resources

- [CSS migration](https://github.com/adobe/spectrum-css/pull/2856)
- [Spectrum 2 preview](https://spectrumcss.z13.web.core.windows.net/pr-2352/index.html?path=/docs/components-text-field--docs)
- [React](https://react-spectrum.adobe.com/s2/index.html?path=/docs/textfield--docs)
