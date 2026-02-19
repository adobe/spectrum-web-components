<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Tags / Tags migration roadmap

<!-- Document title (editable) -->

# Tags migration roadmap

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Component specifications](#component-specifications)
    - [CSS](#css)
    - [SWC](#swc)
- [Comparison](#comparison)
    - [DOM Structure changes](#dom-structure-changes)
    - [CSS => SWC mapping](#css--swc-mapping)
- [Summary of changes](#summary-of-changes)
    - [CSS => SWC implementation gaps](#css--swc-implementation-gaps)
    - [CSS Spectrum 2 changes](#css-spectrum-2-changes)
- [Resources](#resources)

</details>

<!-- Document content (editable) -->

## Component specifications

### CSS

<details>
<summary>CSS selectors</summary>

**Base component:**

- `.spectrum-TagGroup`

**Variants:**

- `.spectrum-TagGroup--sideLabel`
- `.spectrum-TagGroup--sideLabel .spectrum-TagGroup-actionButton`
- `.spectrum-TagGroup--sideLabel .spectrum-TagGroup-helpText`
- `.spectrum-TagGroup--sideLabel .spectrum-TagGroup-label`
- `.spectrum-TagGroup--sideLabel .spectrum-TagGroup-tags`
- `.spectrum-TagGroup--sizeL`
- `.spectrum-TagGroup--sizeS`
- `.spectrum-TagGroup-actionButton`
- `.spectrum-TagGroup-helpText`
- `.spectrum-TagGroup-label`
- `.spectrum-TagGroup-tag`
- `.spectrum-TagGroup-tags`

**Language-specific:**

- `.spectrum-TagGroup:lang(ja)`
- `.spectrum-TagGroup:lang(ko)`
- `.spectrum-TagGroup:lang(zh)`

</details>

<details>
<summary>Passthroughs</summary>

None found for this component.

</details>

<details>
<summary>Modifiers</summary>

- `--mod-body-cjk-line-height`
- `--mod-body-font-size`
- `--mod-body-line-height`
- `--mod-body-margin-end`
- `--mod-body-margin-start`
- `--mod-tag-group-block-spacing-label-to-tags`
- `--mod-tag-group-block-tag-spacing`
- `--mod-tag-group-inline-spacing-label-to-tags`
- `--mod-tag-group-inline-tag-spacing`
- `--mod-tag-group-spacing-help-text-to-tags`

</details>

### SWC

**Note**: In Spectrum Web Components, this component is named `<sp-tags>` (not `<sp-taggroup>`).

<details>
<summary>Attributes</summary>

None found for `<sp-tags>`.

</details>

<details>
<summary>Slots</summary>

- Default slot (no name) - Tag elements to manage as a group

</details>

## Comparison

### DOM Structure changes

<details>
<summary>Spectrum Web Components:</summary>

```html
<slot></slot>
<!-- Slotted sp-tag elements -->
<slot></slot>
```

</details>

<details>
<summary>Legacy (CSS main branch):</summary>

```html
<div role="list" class="spectrum-TagGroup" style="" aria-label="Tags">
    <!-- Tags container with role="list" -->
    <div
        class="spectrum-Tag spectrum-Tag--sizeM spectrum-TagGroup-item"
        tabindex="0"
    >
        <span class="spectrum-Tag-label">2025</span>
    </div>
    <div
        class="spectrum-Tag spectrum-Tag--sizeM spectrum-TagGroup-item"
        tabindex="0"
    >
        <span class="spectrum-Tag-label">Outdoors</span>
    </div>
    <div
        class="spectrum-Tag spectrum-Tag--sizeM spectrum-TagGroup-item"
        tabindex="0"
    >
        <span class="spectrum-Tag-label">Blue</span>
    </div>
</div>
```

</details>

<details>
<summary>Spectrum 2 (CSS spectrum-two branch):</summary>

```html
<div class="spectrum-TagGroup spectrum-TagGroup--sizeM">
    <!-- Optional label -->
    <label class="spectrum-FieldLabel spectrum-TagGroup-label">Label</label>

    <!-- Tags container with role="list" -->
    <div class="spectrum-TagGroup-tags" role="list" aria-label="Tags">
        <div class="spectrum-Tag spectrum-TagGroup-tag">...</div>
        <div class="spectrum-Tag spectrum-TagGroup-tag">...</div>
        <div class="spectrum-Tag spectrum-TagGroup-tag">...</div>
    </div>

    <!-- Optional action button -->
    <button class="spectrum-ActionButton spectrum-TagGroup-actionButton">
        Show all
    </button>

    <!-- Optional help text -->
    <div class="spectrum-HelpText spectrum-TagGroup-helpText">Help text</div>
</div>
```

</details>

<details>
<summary>Diff: Legacy (CSS main) → Spectrum 2 (CSS spectrum-two)</summary>

```diff
--- Legacy DOM structure
+++ Spectrum 2 DOM structure
@@ -1,15 +1,22 @@
-<div role="list" class="spectrum-TagGroup" style="" aria-label="Tags">
-    <div class="spectrum-Tag spectrum-Tag--sizeM spectrum-TagGroup-item" tabindex="0">
+<div class="spectrum-TagGroup spectrum-TagGroup--sizeM">
+    <label class="spectrum-FieldLabel spectrum-TagGroup-label">Label</label>
+    <div class="spectrum-TagGroup-tags" role="list" aria-label="Tags">
+        <div class="spectrum-Tag spectrum-Tag--sizeM spectrum-TagGroup-tag" tabindex="0">
         <span class="spectrum-Tag-label">2025</span>
     </div>
+        <div class="spectrum-Tag spectrum-Tag--sizeM spectrum-TagGroup-tag" tabindex="0">
         <span class="spectrum-Tag-label">Outdoors</span>
     </div>
+    </div>
+    <button class="spectrum-ActionButton spectrum-TagGroup-actionButton">Show all</button>
+    <div class="spectrum-HelpText spectrum-TagGroup-helpText">Help text</div>
  </div>
```

**Key DOM changes:**

- **Root**: No longer has `role="list"`; added size modifier (e.g. `spectrum-TagGroup--sizeM`)
- **Role placement**: `role="list"` and `aria-label` moved to new child `.spectrum-TagGroup-tags` container
- **Class naming**: Tags use `.spectrum-TagGroup-tag` instead of `.spectrum-TagGroup-item`
- **Added**: Optional `.spectrum-TagGroup-label` (field label), `.spectrum-TagGroup-actionButton`, and `.spectrum-TagGroup-helpText`
- **Layout**: `--sideLabel` modifier added for horizontal label positioning

</details>

### CSS => SWC mapping

| CSS selector                                                    | Attribute or slot                                                      | Status                       |
| --------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------- |
| `.spectrum-TagGroup`                                            | Base component (`<sp-tags>`)                                           | Implemented                  |
| `.spectrum-TagGroup--sideLabel`                                 | N/A                                                                    | Missing from WC (new for S2) |
| `.spectrum-TagGroup--sideLabel .spectrum-TagGroup-actionButton` | N/A                                                                    | Missing from WC (new for S2) |
| `.spectrum-TagGroup--sideLabel .spectrum-TagGroup-helpText`     | N/A                                                                    | Missing from WC (new for S2) |
| `.spectrum-TagGroup--sideLabel .spectrum-TagGroup-label`        | N/A                                                                    | Missing from WC (new for S2) |
| `.spectrum-TagGroup--sideLabel .spectrum-TagGroup-tags`         | N/A                                                                    | Missing from WC (new for S2) |
| `.spectrum-TagGroup--sizeL`                                     | N/A                                                                    | Missing from WC (new for S2) |
| `.spectrum-TagGroup--sizeS`                                     | N/A                                                                    | Missing from WC (new for S2) |
| `.spectrum-TagGroup-actionButton`                               | N/A                                                                    | Missing from WC (new for S2) |
| `.spectrum-TagGroup-helpText`                                   | N/A                                                                    | Missing from WC (new for S2) |
| `.spectrum-TagGroup-label`                                      | N/A                                                                    | Missing from WC (new for S2) |
| `.spectrum-TagGroup-tag`                                        | Individual tags (from templates); default slot for `<sp-tag>` elements | Implemented                  |
| `.spectrum-TagGroup-tags`                                       | N/A                                                                    | Missing from WC              |
| `.spectrum-TagGroup:lang(ja)`                                   | N/A                                                                    | Missing from WC              |
| `.spectrum-TagGroup:lang(ko)`                                   | N/A                                                                    | Missing from WC              |
| `.spectrum-TagGroup:lang(zh)`                                   | N/A                                                                    | Missing from WC              |
| Default slot                                                    | Slot for `<sp-tag>` elements                                           | Implemented                  |
| Keyboard navigation                                             | RovingTabindexController                                               | Missing from CSS             |
| Focus management                                                | Internal controller                                                    | Missing from CSS             |

## Summary of changes

### CSS => SWC implementation gaps

**Missing from WC:**

- `.spectrum-TagGroup-label` class - Field label for the tag group
- `.spectrum-TagGroup-tags` class - Container for the tags with `role="list"`
- `.spectrum-TagGroup-tag` class - Applied to individual tags within the group
- `.spectrum-TagGroup-actionButton` class - Optional action button below the tags
- `.spectrum-TagGroup-helpText` class - Optional help text below the tags
- `--sideLabel` variant - Layout variant for side-positioned labels
- Size variants (`--sizeS`, `--sizeL`) - Only medium size is supported in WC

### CSS Spectrum 2 changes

**Structural changes in Spectrum 2:**

1. **Class naming change**: `.spectrum-TagGroup-item` → `.spectrum-TagGroup-tag`
2. **DOM structure enhancement**: Added dedicated `.spectrum-TagGroup-tags` container element
3. **Role placement change**: `role="list"` moved from root `.spectrum-TagGroup` element to child `.spectrum-TagGroup-tags` container
4. **Component composition**: Evolved from simple wrapper to complete form field with optional label, action button, and help text

**New features in Spectrum 2:**

- `.spectrum-TagGroup-label` - Optional field label support with top or side positioning (`--sideLabel` modifier)
- `.spectrum-TagGroup-actionButton` - Optional action button for tag-related actions
- `.spectrum-TagGroup-helpText` - Optional help text for additional context or validation messages

## Resources

- [CSS migration](https://github.com/adobe/spectrum-css/pull/3966)
- [Spectrum 2 preview](https://spectrumcss.z13.web.core.windows.net/pr-2352/index.html?path=/docs/components-tag-group--docs)
- [React](https://react-spectrum.adobe.com/TagGroup)
