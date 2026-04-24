<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Tag / Tag migration roadmap

<!-- Document title (editable) -->

# Tag migration roadmap

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
    - [Spectrum 2 features needed in SWC](#spectrum-2-features-needed-in-swc)
- [Resources](#resources)

</details>

<!-- Document content (editable) -->

## Component specifications

### CSS

<details>
<summary>CSS selectors</summary>

**Base component:**

- `.spectrum-Tag`

**Variants:**

- `.spectrum-Tag .spectrum-Avatar`
- `.spectrum-Tag .spectrum-Tag-clearButton`
- `.spectrum-Tag .spectrum-Tag-itemIcon`
- `.spectrum-Tag .spectrum-Tag-itemLabel`
- `.spectrum-Tag .spectrum-Thumbnail`
- `.spectrum-Tag.spectrum-Tag--emphasized`
- `.spectrum-Tag--sizeL`
- `.spectrum-Tag--sizeM`

**States:**

- `.spectrum-Tag.is-disabled`
- `.spectrum-Tag.is-disabled .spectrum-Avatar`
- `.spectrum-Tag.is-disabled .spectrum-Thumbnail`
- `.spectrum-Tag.is-selected`
- `.spectrum-Tag.is-selected:not(.is-disabled, .is-readOnly)`
- `.spectrum-Tag.spectrum-Tag--emphasized.is-selected:not(.is-disabled, .is-readOnly)`
- `.spectrum-Tag.spectrum-Tag.is-disabled`
- `.spectrum-Tag:not(.is-disabled, .is-readOnly):active`
- `.spectrum-Tag:not(.is-disabled, .is-readOnly):focus-visible`
- `.spectrum-Tag:not(.is-disabled, .is-readOnly):focus-visible:after`
- `.spectrum-Tag:not(.is-disabled, .is-readOnly):hover`

**Language-specific:**

- `.spectrum-Tag:lang(ja)`
- `.spectrum-Tag:lang(ko)`
- `.spectrum-Tag:lang(zh)`

</details>

<details>
<summary>Passthroughs</summary>

- `--mod-avatar-block-size`
- `--mod-avatar-inline-size`
- `--mod-avatar-opacity-disabled`
- `--mod-clear-button-background-color`
- `--mod-clear-button-height`
- `--mod-clear-button-icon-color`
- `--mod-clear-button-icon-color-hover`
- `--mod-clear-button-icon-color-key-focus`
- `--mod-clear-button-width`
- `--mod-icon-size`
- `--mod-thumbnail-opacity-disabled`
- `--mod-thumbnail-size`

</details>

<details>
<summary>Modifiers</summary>

- `--mod-tag-animation-duration`
- `--mod-tag-avatar-size`
- `--mod-tag-avatar-spacing-block-end`
- `--mod-tag-avatar-spacing-block-start`
- `--mod-tag-background-color`
- `--mod-tag-background-color-active`
- `--mod-tag-background-color-disabled`
- `--mod-tag-background-color-emphasized`
- `--mod-tag-background-color-emphasized-active`
- `--mod-tag-background-color-emphasized-focus`
- `--mod-tag-background-color-emphasized-hover`
- `--mod-tag-background-color-focus`
- `--mod-tag-background-color-hover`
- `--mod-tag-background-color-selected`
- `--mod-tag-background-color-selected-active`
- `--mod-tag-background-color-selected-focus`
- `--mod-tag-background-color-selected-hover`
- `--mod-tag-border-color`
- `--mod-tag-border-color-active`
- `--mod-tag-border-color-disabled`
- `--mod-tag-border-color-emphasized`
- `--mod-tag-border-color-focus`
- `--mod-tag-border-color-hover`
- `--mod-tag-border-color-selected`
- `--mod-tag-border-width`
- `--mod-tag-clear-button-size`
- `--mod-tag-clear-button-spacing-block`
- `--mod-tag-content-color`
- `--mod-tag-content-color-active`
- `--mod-tag-content-color-disabled`
- `--mod-tag-content-color-emphasized`
- `--mod-tag-content-color-focus`
- `--mod-tag-content-color-hover`
- `--mod-tag-content-color-selected`
- `--mod-tag-corner-radius`
- `--mod-tag-edge-to-clear-icon`
- `--mod-tag-focus-ring-color`
- `--mod-tag-focus-ring-gap`
- `--mod-tag-focus-ring-thickness`
- `--mod-tag-font-size`
- `--mod-tag-height`
- `--mod-tag-icon-size`
- `--mod-tag-icon-spacing-block-end`
- `--mod-tag-icon-spacing-block-start`
- `--mod-tag-label-font-family`
- `--mod-tag-label-font-style`
- `--mod-tag-label-font-weight`
- `--mod-tag-label-line-height`
- `--mod-tag-label-line-height-cjk`
- `--mod-tag-label-spacing-block`
- `--mod-tag-label-spacing-inline`
- `--mod-tag-label-to-clear-icon`
- `--mod-tag-maximum-width-multiplier`
- `--mod-tag-min-inline-size`
- `--mod-tag-thumbnail-size`
- `--mod-tag-visual-spacing-inline-end`
- `--mod-tag-visual-spacing-inline-start`

</details>

### SWC

<details>
<summary>Attributes</summary>

- `size` - Values: `s`, `m`, `l`
- `deletable` - Boolean attribute indicating if tag can be deleted
- `disabled` - Boolean attribute for disabled state
- `readonly` - Boolean attribute to prevent deletion even when deletable

</details>

<details>
<summary>Slots</summary>

- Default slot (no name) - Text content for labeling the tag
- `avatar` - An avatar element to display within the Tag
- `icon` - An icon element to display within the Tag

</details>

## Comparison

### DOM Structure changes

<details>
<summary>Spectrum Web Components:</summary>

```html
<slot name="avatar"></slot>
<slot name="icon"></slot>
<span class="label"><slot></slot></span>
<!-- If deletable -->
<sp-clear-button
    class="clear-button"
    ?disabled="${disabled}"
    label="Remove"
    size="s"
    tabindex="-1"
></sp-clear-button>
```

</details>

<details>
<summary>Legacy (CSS main branch):</summary>

```html
<div
    class="spectrum-Tag
         spectrum-Tag--sizeM
         is-emphasized
         is-disabled
         is-invalid
         is-selected"
    id="[id]"
    tabindex="0"
>
    <!-- if Avatar -->
    <div class="spectrum-Avatar"></div>

    <!-- if Icon -->
    <svg class="spectrum-Tag-itemIcon"></svg>

    <span class="spectrum-Tag-itemLabel">[label]</span>

    <!-- if Clear button -->
    <button class="spectrum-Tag-clearButton spectrum-ClearButton"></button>
</div>
```

</details>

<details>
<summary>Spectrum 2 (CSS spectrum-two branch):</summary>

```html
<div
    class="spectrum-Tag
         spectrum-Tag--sizeM
         is-emphasized
         is-disabled
         is-selected"
    id="[id]"
    tabindex="0"
>
    <!-- if Avatar  -->
    <div class="spectrum-Avatar"></div>

    <!-- if Icon  -->
    <svg class="spectrum-Tag-itemIcon"></svg>

    <!-- if Thumbnail  -->
    <img class="spectrum-Thumbnail" />

    <span class="spectrum-Tag-itemLabel">[label]</span>

    <!-- if Clear button  -->
    <button class="spectrum-Tag-clearButton spectrum-ClearButton"></button>
</div>
```

</details>

<details>
<summary>Diff: Legacy (CSS main) → Spectrum 2 (CSS spectrum-two)</summary>

```diff
--- Legacy DOM structure
+++ Spectrum 2 DOM structure
@@ -1,27 +1,29 @@
 <div
     class="spectrum-Tag
          spectrum-Tag--sizeM
          is-emphasized
          is-disabled
          is-invalid
          is-selected"
     id="[id]"
     tabindex="0"
 >
    <!-- Avatar (if avatarUrl and not isInvalid) -->
     <!-- Avatar (if avatarUrl) -->
     <div class="spectrum-Avatar"></div>

    <!-- Icon (if iconName or isInvalid) -->
    <!-- Icon (if iconName) -->
     <svg class="spectrum-Tag-itemIcon"></svg>

    <!-- Thumbnail (if thumbnailUrl) -->
+   <img class="spectrum-Thumbnail" />

     <span class="spectrum-Tag-itemLabel">[label]</span>

    <!-- Clear button (if hasClearButton) -->
    <!-- Clear button (if isRemovable) -->
     <button class="spectrum-Tag-clearButton spectrum-ClearButton"></button>
 </div>
```

**Key DOM changes:**

- **Added**: `.spectrum-Thumbnail` element (when `thumbnailUrl` is set)

</details>

### CSS => SWC mapping

| CSS selector                                                                         | Attribute or slot                       | S2 Status                    |
| ------------------------------------------------------------------------------------ | --------------------------------------- | ---------------------------- |
| `.spectrum-Tag`                                                                      | Base component                          | Implemented                  |
| `.spectrum-Tag--sizeM`                                                               | `size="m"`                              | Implemented                  |
| `.spectrum-Tag--sizeL`                                                               | `size="l"`                              | Implemented                  |
| `.spectrum-Tag-itemLabel`                                                            | Default slot (wrapped in `.label` span) | Implemented                  |
| `.spectrum-Tag-itemIcon`                                                             | `icon` slot                             | Implemented                  |
| `.spectrum-Tag .spectrum-Avatar`                                                     | `avatar` slot                           | Implemented                  |
| `.spectrum-Tag .spectrum-Thumbnail`                                                  | `thumbnail` slot (needs implementation) | Needed for S2                |
| `.spectrum-Tag.is-disabled`                                                          | `disabled`                              | Implemented                  |
| `.spectrum-Tag.is-disabled .spectrum-Avatar`                                         | Disabled state styling for avatar       | Implemented                  |
| `.spectrum-Tag.is-disabled .spectrum-Thumbnail`                                      | Disabled thumbnail styling              | Needed for S2                |
| `.spectrum-Tag.spectrum-Tag--emphasized`                                             | `emphasized` attribute (needs impl.)    | Needed for S2                |
| `.spectrum-Tag.spectrum-Tag--emphasized.is-selected:not(.is-disabled, .is-readOnly)` | `emphasized` + `selected` states        | Needed for S2                |
| `.spectrum-Tag.is-selected`                                                          | `selected` attribute (needs impl.)      | Needed for S2                |
| `.spectrum-Tag.is-selected:not(.is-disabled, .is-readOnly)`                          | `selected` state styling                | Needed for S2                |
| `.spectrum-Tag:lang(ja), .spectrum-Tag:lang(ko), .spectrum-Tag:lang(zh)`             | Language-specific styling               | Implemented                  |
| `.spectrum-Tag:not(.is-disabled, .is-readOnly):hover`                                | Hover state (automatic)                 | Implemented                  |
| `.spectrum-Tag:not(.is-disabled, .is-readOnly):active`                               | Active state (automatic)                | Implemented                  |
| `.spectrum-Tag:not(.is-disabled, .is-readOnly):focus-visible`                        | Focus visible state (automatic)         | Implemented                  |
| `.spectrum-Tag:not(.is-disabled, .is-readOnly):focus-visible:after`                  | Focus ring styling                      | Implemented                  |
| `.spectrum-Tag.spectrum-Tag.is-disabled`                                             | Disabled state (duplicate selector)     | Implemented                  |

## Summary of changes

### Spectrum 2 features needed in SWC

To fully support Spectrum 2, the following CSS features need to be implemented in the web component:

**Thumbnail support:**

- `.spectrum-Thumbnail` - Spectrum 2 adds support for thumbnail images in tags
- `.is-disabled .spectrum-Thumbnail` - Disabled state styling for thumbnails
- Add a `thumbnail` slot to display thumbnail images within tags

**Added variant:**

- `is-emphasized` state - `.spectrum-Tag--emphasized` provides a (blue) visual prominence that is optimal for grids of assets, and other situations where a tag needs to be noticed.

**Interactive states:**

- `is-selected` state - For selected state styling in selectable tag groups (requires new `selected` attribute)

**Note on existing WC attributes:**

The web component includes some attributes not present in CSS metadata (`readonly`, `size="s"`). These are implementation-specific and should be evaluated for retention or deprecation during the S2 migration based on user needs and design specifications.

**Added features:**

- **Thumbnail support**: Spectrum 2 adds `.spectrum-Thumbnail` element support for displaying thumbnail images
- **Thumbnail disabled state**: Added `.is-disabled .spectrum-Thumbnail` selector for disabled thumbnail styling

## Resources

- [CSS migration](https://github.com/adobe/spectrum-css/pull/3682)
- [Spectrum 2 preview](https://spectrumcss.z13.web.core.windows.net/pr-2352/index.html?path=/docs/components-tag--docs)
- [React](https://react-spectrum.adobe.com/TagGroup#tag)
