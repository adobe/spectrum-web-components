# Search migration roadmap

## Component specifications

### CSS

<details>
<summary>CSS selectors</summary>

**Base component:**

- `.spectrum-Search`
- `.spectrum-Search:lang(ja)`
- `.spectrum-Search:lang(ko)`
- `.spectrum-Search:lang(zh)`

**Variants:**

- `.spectrum-Search--sizeL`
- `.spectrum-Search--sizeS`
- `.spectrum-Search--sizeXL`

**Child elements:**

- `.spectrum-Search .spectrum-HelpText`
- `.spectrum-Search .spectrum-Search-textfield`
- `.spectrum-Search .spectrum-Search-textfield .spectrum-Search-input`
- `.spectrum-Search .spectrum-Search-clearButton .spectrum-ClearButton-fill`
- `.spectrum-Search-clearButton`
- `.spectrum-Search-clearButton .spectrum-ClearButton-fill`
- `.spectrum-Search-icon`
- `.spectrum-Search-textfield`

**Input element:**

- `.spectrum-Search-input`
- `.spectrum-Search-input::-webkit-search-cancel-button`
- `.spectrum-Search-input::-webkit-search-decoration`

**States:**

- `.spectrum-Search.is-collapsed`
- `.spectrum-Search.is-disabled .spectrum-Search-clearButton`
- `.spectrum-Search.is-expanded`
- `.spectrum-Search-textfield.is-disabled .spectrum-Search-icon`
- `.spectrum-Search-textfield.is-disabled:hover .spectrum-Search-icon`
- `.spectrum-Search-textfield.is-focused .spectrum-Search-icon`
- `.spectrum-Search-textfield.is-focused:hover .spectrum-Search-icon`
- `.spectrum-Search-textfield.is-keyboardFocused .spectrum-Search-icon`
- `.spectrum-Search-textfield:hover .spectrum-Search-icon`

</details>

<details>
<summary>Passthroughs</summary>

- `--mod-textfield-background-color`
- `--mod-textfield-background-color-disabled`
- `--mod-textfield-border-color`
- `--mod-textfield-border-color-disabled`
- `--mod-textfield-border-color-focus`
- `--mod-textfield-border-color-focus-hover`
- `--mod-textfield-border-color-hover`
- `--mod-textfield-border-color-keyboard-focus`
- `--mod-textfield-border-width`
- `--mod-textfield-corner-radius`
- `--mod-textfield-focus-indicator-color`
- `--mod-textfield-focus-indicator-gap`
- `--mod-textfield-focus-indicator-width`
- `--mod-textfield-font-family`
- `--mod-textfield-font-weight`
- `--mod-textfield-placeholder-font-size`
- `--mod-textfield-text-color-default`
- `--mod-textfield-text-color-disabled`
- `--mod-textfield-text-color-focus`
- `--mod-textfield-text-color-focus-hover`
- `--mod-textfield-text-color-hover`
- `--mod-textfield-text-color-keyboard-focus`

</details>

<details>
<summary>Modifiers (Deprecated)</summary>

- `--mod-search-background-color`
- `--mod-search-background-color-disabled`
- `--mod-search-block-size`
- `--mod-search-border-color-default`
- `--mod-search-border-color-disabled`
- `--mod-search-border-color-focus`
- `--mod-search-border-color-focus-hover`
- `--mod-search-border-color-hover`
- `--mod-search-border-color-key-focus`
- `--mod-search-border-radius`
- `--mod-search-border-width`
- `--mod-search-bottom-to-text`
- `--mod-search-button-inline-size`
- `--mod-search-collapsed-animation-duration`
- `--mod-search-color-default`
- `--mod-search-color-disabled`
- `--mod-search-color-focus`
- `--mod-search-color-focus-hover`
- `--mod-search-color-hover`
- `--mod-search-color-key-focus`
- `--mod-search-edge-to-visual`
- `--mod-search-focus-indicator-color`
- `--mod-search-focus-indicator-gap`
- `--mod-search-focus-indicator-thickness`
- `--mod-search-font-family`
- `--mod-search-font-style`
- `--mod-search-font-weight`
- `--mod-search-icon-size`
- `--mod-search-inline-size`
- `--mod-search-line-height`
- `--mod-search-min-inline-size`
- `--mod-search-text-to-icon`
- `--mod-search-to-help-text`
- `--mod-search-top-to-icon`
- `--mod-search-top-to-text`

</details>

### SWC

<details>
<summary>Attributes</summary>

**Search specific attributes:**

- `action` (string) - Form action URL
- `holdValueOnEscape` (boolean) - Whether the typed value should be held when Escape key is pressed
- `label` (string) - defaults to "Search" (overrides Textfield)
- `method` (string) - Form method: "get" | "post" | "dialog"
- `placeholder` (string) - defaults to "Search" (overrides Textfield)

**Inherited from Textfield (extends TextfieldBase):**

- `allowed-keys` - A regular expression outlining the keys that will be allowed to update the value
- `autocomplete` - What form of assistance should be provided when attempting to supply a value
- `focused` - Whether the search field is focused
- `grows` - Whether a form control with multiline attribute will change size vertically
- `invalid` - Whether the search field is invalid
- `maxlength` - Defines the maximum string length that the user can enter
- `minlength` - Defines the minimum string length that the user can enter
- `multiline` - Whether the form control should accept a value longer than one line (forced to false)
- `name` - Name of the form control
- `pattern` - Pattern the value must match to be valid
- `quiet` - Whether to display the form control with no visible background
- `readonly` - Whether a user can interact with the value of the form control
- `required` - Whether the form control will be found to be invalid when it holds no value
- `rows` - The specific number of rows the form control should provide in the user interface
- `type` - The type of the form control (set to 'search' automatically)
- `valid` - Whether the value held by the form control is valid
- `value` - The value held by the form control

**Inherited from SizedMixin:**

- `size` - Size of the search field (s, m, l, xl)

**Inherited from Focusable:**

- `autofocus` - When this control is rendered, focus it automatically
- `disabled` - Disable this control. It will not receive focus or events
- `tabIndex` - The tab index to apply to this control

</details>

<details>
<summary>Slots</summary>

- `help-text` - default or non-negative help text to associate to your form element
- `negative-help-text` - negative help text to associate to your form element when `invalid`

</details>

## Comparison

### DOM Structure changes

<details>
<summary>Spectrum Web Components:</summary>

```html
<!-- Outer textfield wrapper from TextfieldBase.render() -->
<div id="textfield">
    <form
        action="..."
        id="form"
        method="..."
        @submit="handleSubmit"
        @reset="reset"
        @keydown="handleKeydown"
    >
        <!-- Search icon -->
        <sp-icon-search
            size="..."
            class="icon magnifier icon-workflow icon-search"
        ></sp-icon-search>

        <!-- State icons (when invalid or valid) -->
        <sp-icon-alert id="invalid" class="icon"></sp-icon-alert>
        <!-- OR -->
        <sp-icon-checkmark100
            id="valid"
            class="icon spectrum-UIIcon-Checkmark100"
        ></sp-icon-checkmark100>

        <!-- Input element -->
        <input
            type="search"
            class="input"
            aria-describedby="sp-help-text-..."
            aria-label="Search"
            name="..."
            maxlength="..."
            minlength="..."
            pattern="..."
            placeholder="Search"
            autocomplete="..."
            ?disabled
            ?required
            ?readonly
        />

        <!-- Clear button (only when there's a value) -->
        <sp-clear-button
            id="button"
            label="Reset"
            tabindex="-1"
            type="reset"
            size="..."
            @keydown="stopPropagation"
        ></sp-clear-button>
    </form>
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
<form class="spectrum-Search spectrum-Search--sizeM">
    <!-- TextField component -->
    <div class="spectrum-Textfield spectrum-Search-textfield">
        <svg
            class="spectrum-Icon spectrum-Search-icon spectrum-UIIcon-Magnify"
            focusable="false"
            aria-hidden="true"
            role="img"
        >
            <title>Magnify</title>
            <use
                xlink:href="#spectrum-css-icon-Magnify"
                href="#spectrum-css-icon-Magnify"
            />
        </svg>
        <input
            type="search"
            placeholder="Search"
            name="search"
            class="spectrum-Textfield-input spectrum-Search-input"
            autocomplete="off"
        />
    </div>
    <!-- ClearButton component -->
    <button
        class="spectrum-ClearButton spectrum-Search-clearButton"
        type="reset"
    >
        <div class="spectrum-ClearButton-fill">
            <svg
                class="spectrum-Icon spectrum-ClearButton-icon spectrum-UIIcon-Cross"
                focusable="false"
                aria-hidden="true"
                role="img"
            >
                <title>Cross</title>
                <use
                    xlink:href="#spectrum-css-icon-Cross"
                    href="#spectrum-css-icon-Cross"
                />
            </svg>
        </div>
    </button>
    <!-- HelpText component (conditional) -->
    <div class="spectrum-HelpText">
        <!-- help text content -->
    </div>
</form>
```

</details>

<details>
<summary>Spectrum 2 (CSS spectrum-two branch):</summary>

```html
<!-- When expanded -->
<form
    class="spectrum-Search spectrum-Search--sizeM is-expanded"
    aria-label="Search"
>
    <div class="spectrum-Textfield spectrum-Search-textfield">
        <svg
            class="spectrum-Icon spectrum-Search-icon spectrum-Icon--sizeM"
            focusable="false"
            aria-hidden="true"
            role="img"
        >
            <title>Search</title>
            <use
                xlink:href="#spectrum-icon-18-Search"
                href="#spectrum-icon-18-Search"
            />
        </svg>
        <input
            type="search"
            placeholder="Search"
            name="search"
            class="spectrum-Textfield-input spectrum-Search-input"
            autocomplete="off"
            value=""
        />
    </div>
    <!-- ClearButton component (when value is present) -->
    <button
        class="spectrum-ClearButton spectrum-Search-clearButton"
        type="reset"
    >
        <div class="spectrum-ClearButton-fill">
            <svg
                class="spectrum-Icon spectrum-ClearButton-icon spectrum-UIIcon-Cross"
                focusable="false"
                aria-hidden="true"
                role="img"
            >
                <title>Cross</title>
                <use
                    xlink:href="#spectrum-css-icon-Cross"
                    href="#spectrum-css-icon-Cross"
                />
            </svg>
        </div>
    </button>
    <!-- HelpText component (optional/conditional) -->
    <div class="spectrum-HelpText">
        <!-- help text content -->
    </div>
</form>

<!-- When collapsed (isCollapsed=true) -->
<form
    class="spectrum-Search spectrum-Search--sizeM is-collapsed"
    aria-label="Search"
>
    <button
        class="spectrum-ActionButton spectrum-ActionButton--quiet spectrum-Search-actionButton"
    >
        <svg
            class="spectrum-Icon spectrum-ActionButton-icon spectrum-Icon--sizeM"
            focusable="false"
            aria-hidden="true"
            role="img"
        >
            <title>Search</title>
            <use
                xlink:href="#spectrum-icon-18-Search"
                href="#spectrum-icon-18-Search"
            />
        </svg>
    </button>
</form>
```

</details>

<details>
<summary>Diff: Legacy (CSS main) → Spectrum 2 (CSS spectrum-two)</summary>

```diff
--- a/components/search/stories/template.js (main branch)
+++ b/components/search/stories/template.js (spectrum-two branch)
@@ -1,1 +1,1 @@
-<form class="spectrum-Search spectrum-Search--sizeM">
+<form class="spectrum-Search spectrum-Search--sizeM is-expanded" aria-label="Search">
@@ -3,4 +3,4 @@
-        <svg
-            class="spectrum-Icon spectrum-Search-icon spectrum-UIIcon-Magnify"
+        <svg
+            class="spectrum-Icon spectrum-Search-icon spectrum-Icon--sizeM"
             focusable="false"
             aria-hidden="true"
             role="img"
         >
-            <title>Magnify</title>
+            <title>Search</title>
             <use
-                xlink:href="#spectrum-css-icon-Magnify"
-                href="#spectrum-css-icon-Magnify"
+                xlink:href="#spectrum-icon-18-Search"
+                href="#spectrum-icon-18-Search"
             />
         </svg>
         <input
             type="search"
             placeholder="Search"
             name="search"
             class="spectrum-Textfield-input spectrum-Search-input"
             autocomplete="off"
+            value=""
         />
     </div>
@@ -15,4 +15,4 @@
-    <button
-        class="spectrum-ClearButton spectrum-Search-clearButton"
-        type="reset"
-    >
+    <!-- ClearButton component (when value is present) -->
+    <button
+        class="spectrum-ClearButton spectrum-Search-clearButton"
+        type="reset"
+    >
@@ -25,4 +25,4 @@
     </button>
-    <!-- HelpText component (conditional) -->
+    <!-- HelpText component (optional/conditional) -->
     <div class="spectrum-HelpText">
         <!-- help text content -->
     </div>
 </form>
+
+<!-- When collapsed (isCollapsed=true) -->
+<form
+    class="spectrum-Search spectrum-Search--sizeM is-collapsed"
+    aria-label="Search"
+>
+    <button class="spectrum-ActionButton spectrum-Search-actionButton is-quiet">
+        <svg
+            class="spectrum-Icon spectrum-ActionButton-icon spectrum-Icon--sizeM"
+            focusable="false"
+            aria-hidden="true"
+            role="img"
+        >
+            <title>Search</title>
+            <use
+                xlink:href="#spectrum-icon-18-Search"
+                href="#spectrum-icon-18-Search"
+            />
+        </svg>
+    </button>
+</form>
```

</details>

### CSS => SWC mapping

| CSS selector                                                                          | Attribute or slot         | Status                       |
| ------------------------------------------------------------------------------------- | ------------------------- | ---------------------------- |
| `.spectrum-Search`                                                                    | `:host`                   | Implemented                  |
| `.spectrum-Search--sizeS`                                                             | `size="s"`                | Implemented                  |
| `.spectrum-Search--sizeL`                                                             | `size="l"`                | Implemented                  |
| `.spectrum-Search--sizeXL`                                                            | `size="xl"`               | Implemented                  |
| `.spectrum-Search.is-disabled`                                                        | `disabled`                | Implemented                  |
| `.spectrum-Search .spectrum-HelpText`                                                 | `help-text` slot          | Implemented                  |
| `.spectrum-Search:lang(ja)`, `.spectrum-Search:lang(ko)`, `.spectrum-Search:lang(zh)` | Language-specific styling | Implemented                  |
| `.spectrum-Search .spectrum-Search-clearButton`                                       | `<sp-clear-button>`       | Implemented                  |
| `.spectrum-Search .spectrum-Search-textfield`                                         | Textfield functionality   | Implemented                  |
| `.spectrum-Search .spectrum-Search-icon`                                              | `<sp-icon-search>`        | Implemented                  |
| `.spectrum-Search .spectrum-Search-input`                                             | Input element             | Implemented                  |
| `.spectrum-Search.is-collapsed`                                                       |                           | Missing from WC (new for S2) |
| `.spectrum-Search.is-expanded`                                                        |                           | Missing from WC (new for S2) |

## Summary of changes

### CSS => SWC implementation gaps

The primary implementation gap between CSS and SWC is the S2 implementation of the collapsed Search variant, which allows for expansion and collapse of the search field to and from a quiet action button that uses the same magnifying glass icon. In CSS, these collapsed/expanded states and controlled by the classes `.spectrum-Search.is-collapsed` and `.spectrum-Search.is-expanded`.

Also, because Search extends Textfield, S2 updates to Textfield also apply here. The most notable update to S2 Textfield is the removal of the quiet variant. **Therefore, there is no quiet variant in S2 Search.**

### CSS Spectrum 2 changes

The most notable changes seen in Spectrum 2 migration work include:

- **Collapsible functionality**: Added support and styling for collapsed/expanded states
- **ActionButton integration**: When collapsed, the search shows as a quiet action button instead of a textfield
- **Icon change**: Changed from "Magnify" icon to "Search" icon with workflow icon set
- **Quiet variant**: Removed `isQuiet` parameter and `--quiet` modifier support

## Resources

- [CSS migration](https://github.com/adobe/spectrum-css/pull/2673)
- [CSS expand/collapse feature](https://github.com/adobe/spectrum-css/pull/4115)
- [Spectrum 2 preview](https://spectrumcss.z13.web.core.windows.net/pr-2352/index.html?path=/docs/components-search-field--docs)
- [React](https://react-spectrum.adobe.com/s2/index.html?path=/docs/searchfield--docs)
