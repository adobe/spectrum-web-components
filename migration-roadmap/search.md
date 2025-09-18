# Search migration roadmap

## Component specifications

### CSS

<details>
<summary>CSS selectors</summary>

- `.spectrum-Search`
- `.spectrum-Search .spectrum-HelpText`
- `.spectrum-Search .spectrum-Search-clearButton .spectrum-ClearButton-fill`
- `.spectrum-Search .spectrum-Search-textfield`
- `.spectrum-Search .spectrum-Search-textfield .spectrum-Search-input`
- `.spectrum-Search--sizeL`
- `.spectrum-Search--sizeS`
- `.spectrum-Search--sizeXL`
- `.spectrum-Search-clearButton`
- `.spectrum-Search-clearButton .spectrum-ClearButton-fill`
- `.spectrum-Search-icon`
- `.spectrum-Search-input`
- `.spectrum-Search-input::-webkit-search-cancel-button`
- `.spectrum-Search-input::-webkit-search-decoration`
- `.spectrum-Search-textfield`
- `.spectrum-Search-textfield.is-disabled .spectrum-Search-icon`
- `.spectrum-Search-textfield.is-disabled:hover .spectrum-Search-icon`
- `.spectrum-Search-textfield.is-focused .spectrum-Search-icon`
- `.spectrum-Search-textfield.is-focused:hover .spectrum-Search-icon`
- `.spectrum-Search-textfield.is-keyboardFocused .spectrum-Search-icon`
- `.spectrum-Search-textfield:hover .spectrum-Search-icon`
- `.spectrum-Search.is-collapsed`
- `.spectrum-Search.is-disabled .spectrum-Search-clearButton`
- `.spectrum-Search.is-expanded`
- `.spectrum-Search:lang(ja)`
- `.spectrum-Search:lang(ko)`
- `.spectrum-Search:lang(zh)`

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
<summary>Modifiers</summary>

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

- `action` (string)
- `label` (string) - defaults to "Search"
- `method` (string) - "get" | "post" | "dialog"
- `placeholder` (string) - defaults to "Search"
- `holdValueOnEscape` (boolean)
- `size` (inherited from Textfield)
- `disabled` (inherited from Textfield)
- `invalid` (inherited from Textfield)
- `value` (inherited from Textfield)

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
<sp-search>
    #shadow-root
    <form
        action=""
        id="form"
        method=""
        @submit="handleSubmit"
        @reset="reset"
        @keydown="handleKeydown"
    >
        <sp-icon-search
            size=""
            class="icon magnifier icon-workflow icon-search"
        ></sp-icon-search>
        <div id="textfield">
            <input type="search" class="input" />
        </div>
        <!-- Conditionally rendered only when there's a value -->
        <sp-clear-button
            id="button"
            label="Reset"
            tabindex="-1"
            type="reset"
            size=""
            @keydown="stopPropagation"
        ></sp-clear-button>
    </form>
    <div id="sp-help-text-..." aria-live="assertive">
        <slot name="help-text"></slot>
    </div>
</sp-search>
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
    <button class="spectrum-ActionButton spectrum-Search-actionButton is-quiet">
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

| CSS selector                                                                          | Attribute or slot          | Status                       |
| ------------------------------------------------------------------------------------- | -------------------------- | ---------------------------- |
| `.spectrum-Search--sizeS`, `.spectrum-Search--sizeL`, `.spectrum-Search--sizeXL`      | `size`                     | Implemented                  |
| `.spectrum-Search.is-disabled`                                                        | `disabled`                 | Implemented                  |
| `.spectrum-Search .spectrum-HelpText`                                                 | `help-text` slot           | Implemented                  |
| `.spectrum-Search:lang(ja)`, `.spectrum-Search:lang(ko)`, `.spectrum-Search:lang(zh)` | Language-specific styling  | Implemented                  |
| `.spectrum-Search .spectrum-Search-clearButton`                                       | Clear button functionality | Implemented                  |
| `.spectrum-Search .spectrum-Search-textfield`                                         | Textfield functionality    | Implemented                  |
| `.spectrum-Search .spectrum-Search-icon`                                              | Search icon                | Implemented                  |
| `.spectrum-Search .spectrum-Search-input`                                             | Input element              | Implemented                  |
|                                                                                       | `action`                   | Missing from CSS             |
|                                                                                       | `method`                   | Missing from CSS             |
|                                                                                       | `holdValueOnEscape`        | Missing from CSS             |
|                                                                                       | `negative-help-text` slot  | Missing from CSS             |
| `.spectrum-Search.is-collapsed`                                                       |                            | Missing from WC (new for S2) |
| `.spectrum-Search.is-expanded`                                                        |                            | Missing from WC (new for S2) |

## Summary of changes

### CSS => SWC implementation gaps

The primary implementation gap between CSS and SWC is the S2 implementation of the collapsed Search variant, which allows for expansion and collapse of the search field to and from a quiet action button that uses the same magnifying glass icon. In CSS, these collapsed/expanded states and controlled by the classes `.spectrum-Search.is-collapsed` and `.spectrum-Search.is-expanded`).

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
