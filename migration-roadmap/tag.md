# Tag migration roadmap

## Component specifications

### CSS

<details>
<summary>CSS selectors</summary>

- `.spectrum-Tag`
- `.spectrum-Tag .spectrum-Avatar`
- `.spectrum-Tag .spectrum-Tag-clearButton`
- `.spectrum-Tag .spectrum-Tag-clearButton .spectrum-ClearButton-fill`
- `.spectrum-Tag .spectrum-Tag-itemIcon`
- `.spectrum-Tag .spectrum-Tag-itemLabel`
- `.spectrum-Tag--sizeL`
- `.spectrum-Tag--sizeS`
- `.spectrum-Tag.is-disabled`
- `.spectrum-Tag.is-disabled .spectrum-Avatar`
- `.spectrum-Tag.is-emphasized`
- `.spectrum-Tag.is-emphasized.is-focused`
- `.spectrum-Tag.is-emphasized:active`
- `.spectrum-Tag.is-emphasized:focus-visible`
- `.spectrum-Tag.is-emphasized:hover`
- `.spectrum-Tag.is-focused`
- `.spectrum-Tag.is-focused:after`
- `.spectrum-Tag.is-invalid`
- `.spectrum-Tag.is-invalid.is-focused`
- `.spectrum-Tag.is-invalid.is-selected`
- `.spectrum-Tag.is-invalid.is-selected.is-focused`
- `.spectrum-Tag.is-invalid.is-selected:active`
- `.spectrum-Tag.is-invalid.is-selected:focus-visible`
- `.spectrum-Tag.is-invalid.is-selected:hover`
- `.spectrum-Tag.is-invalid:active`
- `.spectrum-Tag.is-invalid:focus-visible`
- `.spectrum-Tag.is-invalid:hover`
- `.spectrum-Tag.is-selected`
- `.spectrum-Tag.is-selected.is-focused`
- `.spectrum-Tag.is-selected:active`
- `.spectrum-Tag.is-selected:focus-visible`
- `.spectrum-Tag.is-selected:hover`
- `.spectrum-Tag:active`
- `.spectrum-Tag:focus-visible`
- `.spectrum-Tag:focus-visible:after`
- `.spectrum-Tag:hover`

</details>

<details>
<summary>Passthroughs</summary>

- `--mod-avatar-opacity-disabled`
- `--mod-clear-button-width`
- `--mod-clearbutton-fill-background-color`
- `--mod-clearbutton-fill-size`

</details>

<details>
<summary>Modifiers</summary>

- `--mod-tag-animation-duration`
- `--mod-tag-avatar-spacing-block-end`
- `--mod-tag-avatar-spacing-block-start`
- `--mod-tag-avatar-spacing-inline-end`
- `--mod-tag-background-color`
- `--mod-tag-background-color-active`
- `--mod-tag-background-color-disabled`
- `--mod-tag-background-color-emphasized`
- `--mod-tag-background-color-emphasized-active`
- `--mod-tag-background-color-emphasized-focus`
- `--mod-tag-background-color-emphasized-hover`
- `--mod-tag-background-color-focus`
- `--mod-tag-background-color-hover`
- `--mod-tag-background-color-invalid-selected`
- `--mod-tag-background-color-invalid-selected-active`
- `--mod-tag-background-color-invalid-selected-focus`
- `--mod-tag-background-color-invalid-selected-hover`
- `--mod-tag-background-color-selected`
- `--mod-tag-background-color-selected-active`
- `--mod-tag-background-color-selected-focus`
- `--mod-tag-background-color-selected-hover`
- `--mod-tag-border-color`
- `--mod-tag-border-color-active`
- `--mod-tag-border-color-disabled`
- `--mod-tag-border-color-emphasized`
- `--mod-tag-border-color-emphasized-active`
- `--mod-tag-border-color-emphasized-focus`
- `--mod-tag-border-color-emphasized-hover`
- `--mod-tag-border-color-focus`
- `--mod-tag-border-color-hover`
- `--mod-tag-border-color-invalid`
- `--mod-tag-border-color-invalid-active`
- `--mod-tag-border-color-invalid-focus`
- `--mod-tag-border-color-invalid-hover`
- `--mod-tag-border-color-invalid-selected`
- `--mod-tag-border-color-invalid-selected-active`
- `--mod-tag-border-color-invalid-selected-focus`
- `--mod-tag-border-color-invalid-selected-hover`
- `--mod-tag-border-color-selected`
- `--mod-tag-border-color-selected-active`
- `--mod-tag-border-color-selected-focus`
- `--mod-tag-border-color-selected-hover`
- `--mod-tag-border-width`
- `--mod-tag-clear-button-spacing-block`
- `--mod-tag-clear-button-spacing-inline-end`
- `--mod-tag-clear-button-spacing-inline-start`
- `--mod-tag-content-color`
- `--mod-tag-content-color-active`
- `--mod-tag-content-color-disabled`
- `--mod-tag-content-color-emphasized`
- `--mod-tag-content-color-focus`
- `--mod-tag-content-color-hover`
- `--mod-tag-content-color-invalid`
- `--mod-tag-content-color-invalid-active`
- `--mod-tag-content-color-invalid-focus`
- `--mod-tag-content-color-invalid-hover`
- `--mod-tag-content-color-invalid-selected`
- `--mod-tag-content-color-selected`
- `--mod-tag-corner-radius`
- `--mod-tag-focus-ring-color`
- `--mod-tag-focus-ring-gap`
- `--mod-tag-focus-ring-thickness`
- `--mod-tag-font-size`
- `--mod-tag-height`
- `--mod-tag-icon-size`
- `--mod-tag-icon-spacing-block-end`
- `--mod-tag-icon-spacing-block-start`
- `--mod-tag-icon-spacing-inline-end`
- `--mod-tag-label-font-weight`
- `--mod-tag-label-line-height`
- `--mod-tag-label-spacing-block`
- `--mod-tag-label-spacing-inline-end`
- `--mod-tag-spacing-inline-start`

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
<sp-tag size="[s|m|l]" deletable disabled readonly role="listitem" tabindex="0">
    <slot name="avatar"></slot>
    <slot name="icon"></slot>
    <span class="label"><slot></slot></span>
    <!-- If deletable -->
    <sp-clear-button
        class="clear-button"
        disabled="[disabled]"
        label="Remove"
        size="s"
        tabindex="-1"
    ></sp-clear-button>
</sp-tag>
```

</details>

<details>
<summary>Legacy (CSS main branch):</summary>

```html
<div
    class="spectrum-Tag
         spectrum-Tag--size[S|M|L] (if size)
         is-emphasized (if isEmphasized)
         is-disabled (if isDisabled)
         is-invalid (if isInvalid)
         is-selected (if isSelected)"
    id="[id]"
    tabindex="[isDisabled ? -1 : 0]"
    style="[customStyles]"
>
    <!-- Avatar (if avatarUrl and not isInvalid) -->
    <span class="spectrum-Avatar" ...></span>

    <!-- Icon (if iconName or isInvalid) -->
    <svg class="spectrum-Tag-itemIcon" ...></svg>

    <span class="spectrum-Tag-itemLabel">[label]</span>

    <!-- Clear button (if hasClearButton) -->
    <button class="spectrum-Tag-clearButton spectrum-ClearButton" ...>
        <div class="spectrum-ClearButton-fill"></div>
    </button>
</div>
```

</details>

<details>
<summary>Spectrum 2 (CSS spectrum-two branch):</summary>

```html
<div
    class="spectrum-Tag
         spectrum-Tag--size[S|M|L] (if size)
         is-emphasized (if isEmphasized)
         is-disabled (if isDisabled)
         is-invalid (if isInvalid)
         is-selected (if isSelected)"
    id="[id]"
    tabindex="[isDisabled ? -1 : 0]"
    style="[customStyles]"
>
    <!-- Avatar (if avatarUrl and not isInvalid) -->
    <span class="spectrum-Avatar" ...></span>

    <!-- Icon (if iconName or isInvalid) -->
    <svg class="spectrum-Tag-itemIcon" ...></svg>

    <span class="spectrum-Tag-itemLabel">[label]</span>

    <!-- Clear button (if hasClearButton) -->
    <button class="spectrum-Tag-clearButton spectrum-ClearButton" ...>
        <div class="spectrum-ClearButton-fill"></div>
    </button>
</div>
```

</details>

<details>
<summary>Diff: Legacy (CSS main) → Spectrum 2 (CSS spectrum-two)</summary>

```diff
--- a/components/tag/stories/template.js (main branch)
+++ b/components/tag/stories/template.js (spectrum-two branch)
@@ -10,9 +10,6 @@
 import { when } from "lit/directives/when.js";

 import "../index.css";
-import "../themes/spectrum.css";
-/* Must be imported last */
-import "../themes/express.css";
```

**Note**: The only difference between main and spectrum-two branches is the removal of theme-specific CSS imports. The HTML structure and all CSS classes remain identical.

</details>

### CSS => SWC mapping

| CSS selector                     | Attribute or slot                       | Status           |
| -------------------------------- | --------------------------------------- | ---------------- |
| `.spectrum-Tag`                  | Base component                          | Implemented      |
| `.spectrum-Tag--sizeS`           | `size="s"`                              | Implemented      |
| `.spectrum-Tag--sizeL`           | `size="l"`                              | Implemented      |
| `.spectrum-Tag-itemLabel`        | Default slot (wrapped in `.label` span) | Implemented      |
| `.spectrum-Tag-itemIcon`         | `icon` slot                             | Implemented      |
| `.spectrum-Tag .spectrum-Avatar` | `avatar` slot                           | Implemented      |
| `.spectrum-Tag-clearButton`      | Clear button (when `deletable`)         | Implemented      |
| `.spectrum-Tag.is-disabled`      | `disabled`                              | Implemented      |
| `.spectrum-Tag.is-emphasized`    |                                         | Missing from WC  |
| `.spectrum-Tag.is-invalid`       |                                         | Missing from WC  |
| `.spectrum-Tag.is-selected`      |                                         | Missing from WC  |
| `.spectrum-Tag.is-focused`       | Focus state (automatic)                 | Implemented      |
| `.spectrum-Tag:hover`            | Hover state (automatic)                 | Implemented      |
| `.spectrum-Tag:active`           | Active state (automatic)                | Implemented      |
| `.spectrum-Tag:focus-visible`    | Focus visible state (automatic)         | Implemented      |
| `readonly`                       |                                         | Missing from CSS |
| `deletable`                      |                                         | Missing from CSS |

## Summary of changes

### CSS => SWC implementation gaps

**Missing from WC:**

- `is-emphasized` state - For emphasized styling of tags
- `is-invalid` state - For invalid/error state styling (CSS shows Alert icon when invalid)
- `is-selected` state - For selected state styling in selectable tag groups

These states are critical for interactive tag groups where tags can be selected, emphasized, or marked as invalid.

**Missing from CSS:**

- `readonly` attribute - Prevents deletion even when `deletable` is true
- `deletable` attribute - The CSS uses `hasClearButton` parameter instead

The Web Components implementation uses `deletable` to control the clear button visibility, while CSS templates use `hasClearButton`. The `readonly` attribute provides additional control not present in CSS.

### CSS Spectrum 2 changes

**Theme consolidation:**

- Removed theme-specific CSS imports (`../themes/spectrum.css`, `../themes/express.css`)
- Spectrum 2 uses a unified theming approach

**No structural changes:**

- The HTML structure is identical between main and spectrum-two branches
- All CSS classes remain the same
- All size variants, states, and modifiers are preserved
- Avatar, icon, label, and clear button elements maintain the same structure and class names

**Maintained features:**

- All interactive states (emphasized, disabled, invalid, selected, focused, hover, active)
- All size variants (S, M, L)
- Avatar and icon support
- Clear button functionality
- All spacing and styling modifiers

## Resources

- [CSS migration]()
- [Spectrum 2 preview]()
- [React]()
