# Breadcrumbs migration roadmap

<details>
<summary>CSS selectors</summary>

- `.spectrum-Breadcrumbs`
- `.spectrum-Breadcrumbs--multiline`
- `.spectrum-Breadcrumbs--multiline .spectrum-Breadcrumbs-item:last-of-type`
- `.spectrum-Breadcrumbs--multiline .spectrum-Breadcrumbs-item:last-of-type > .spectrum-Breadcrumbs-itemLink`
- `.spectrum-Breadcrumbs--sizeL`
- `.spectrum-Breadcrumbs-item`
- `.spectrum-Breadcrumbs-item > .spectrum-ActionButton`
- `.spectrum-Breadcrumbs-item > .spectrum-ActionButton:disabled`
- `.spectrum-Breadcrumbs-item.is-dragged .spectrum-Breadcrumbs-itemLink:before`
- `.spectrum-Breadcrumbs-item:first-of-type > .spectrum-ActionButton`
- `.spectrum-Breadcrumbs-item:first-of-type > .spectrum-Breadcrumbs-itemLink`
- `.spectrum-Breadcrumbs-item:last-of-type`
- `.spectrum-Breadcrumbs-item:last-of-type .spectrum-Breadcrumbs-itemLink`
- `.spectrum-Breadcrumbs-item:last-of-type .spectrum-Breadcrumbs-itemSeparator`
- `.spectrum-Breadcrumbs-itemLink`
- `.spectrum-Breadcrumbs-itemLink + .spectrum-Breadcrumbs-itemSeparator`
- `.spectrum-Breadcrumbs-itemLink.is-disabled`
- `.spectrum-Breadcrumbs-itemLink:focus-visible:before`
- `.spectrum-Breadcrumbs-itemLink[aria-disabled="true"]`
- `.spectrum-Breadcrumbs-itemLink[href]`
- `.spectrum-Breadcrumbs-itemLink[href]:active`
- `.spectrum-Breadcrumbs-itemLink[href]:focus-visible`
- `.spectrum-Breadcrumbs-itemLink[href]:hover`
- `.spectrum-Breadcrumbs-itemLink[tabindex="0"]`
- `.spectrum-Breadcrumbs-itemLink[tabindex="0"]:active`
- `.spectrum-Breadcrumbs-itemLink[tabindex="0"]:focus-visible`
- `.spectrum-Breadcrumbs-itemLink[tabindex="0"]:hover`
- `.spectrum-Breadcrumbs-itemSeparator`
- `.spectrum-Breadcrumbs-itemSeparator:dir(rtl)`

</details>

<details>
<summary>Passthroughs</summary>

No passthroughs found for this component.

</details>

<details>
<summary>Attributes</summary>

- `max-visible-items` (Number) - Override the maximum number of visible items (default: 4)
- `label` (String) - Accessible name for the Breadcrumbs component
- `menu-label` (String) - Change the default label of the action menu (default: "More items")
- `compact` (Boolean) - Compact option is useful for reducing the height of the breadcrumbs
- `value` (String) - Value for individual breadcrumb items
- `href` (String) - URL for individual breadcrumb items
- `disabled` (Boolean) - Disabled state for individual breadcrumb items

</details>

<details>
<summary>Slots</summary>

- `icon` - Change the default icon of the action menu
- `root` - Breadcrumb item to always display
- Default slot - Breadcrumb items (`sp-breadcrumb-item` elements)

</details>

<details>
<summary>Modifiers</summary>

- `--mod-breadcrumbs-action-button-color`
- `--mod-breadcrumbs-action-button-color-disabled`
- `--mod-breadcrumbs-action-button-spacing-block`
- `--mod-breadcrumbs-action-button-spacing-inline`
- `--mod-breadcrumbs-block-size`
- `--mod-breadcrumbs-focus-indicator-color`
- `--mod-breadcrumbs-focus-indicator-gap`
- `--mod-breadcrumbs-focus-indicator-thickness`
- `--mod-breadcrumbs-font-family`
- `--mod-breadcrumbs-font-family-current`
- `--mod-breadcrumbs-font-size`
- `--mod-breadcrumbs-font-size-current`
- `--mod-breadcrumbs-font-style`
- `--mod-breadcrumbs-font-weight`
- `--mod-breadcrumbs-font-weight-current`
- `--mod-breadcrumbs-icon-spacing-block`
- `--mod-breadcrumbs-inline-end`
- `--mod-breadcrumbs-inline-start`
- `--mod-breadcrumbs-inline-start-to-truncated-menu`
- `--mod-breadcrumbs-item-dragged-background`
- `--mod-breadcrumbs-item-link-border-radius`
- `--mod-breadcrumbs-line-height`
- `--mod-breadcrumbs-separator-color`
- `--mod-breadcrumbs-separator-spacing-inline`
- `--mod-breadcrumbs-text-color`
- `--mod-breadcrumbs-text-color-current`
- `--mod-breadcrumbs-text-color-disabled`
- `--mod-breadcrumbs-text-decoration-gap`
- `--mod-breadcrumbs-text-decoration-thickness`
- `--mod-breadcrumbs-text-spacing-block-end`
- `--mod-breadcrumbs-text-spacing-block-start`
- `--mod-breadcrumbs-title-spacing-block-end`
- `--mod-breadcrumbs-title-spacing-block-start`
- `--mod-heading-margin-end`
- `--mod-heading-margin-start`

</details>

## Visual Comparison

**Legacy Component:**

<!-- Screenshot of legacy component will be added here -->

**Spectrum 2 Component:**

<!-- Screenshot of Spectrum 2 component will be added here -->

## DOM Structure Changes

**Legacy (main branch):**

```html
<nav>
    <ul class="spectrum-Breadcrumbs spectrum-Breadcrumbs--{variant}">
        <li class="spectrum-Breadcrumbs-item">
            <div class="spectrum-Breadcrumbs-itemLink" role="link" tabindex="0">
                Item 1
            </div>
            <svg
                class="spectrum-Breadcrumbs-itemSeparator spectrum-UIIcon-ChevronRight100"
            ></svg>
        </li>
        <li class="spectrum-Breadcrumbs-item">
            <a class="spectrum-Breadcrumbs-itemLink" aria-current="page">
                Current Item
            </a>
        </li>
    </ul>
</nav>
```

**Spectrum 2 (spectrum-two branch):**

```html
<nav>
    <ul class="spectrum-Breadcrumbs spectrum-Breadcrumbs--{variant}">
        <li class="spectrum-Breadcrumbs-item">
            <div class="spectrum-Breadcrumbs-itemLink" role="link" tabindex="0">
                Item 1
            </div>
            <svg
                class="spectrum-Breadcrumbs-itemSeparator spectrum-UIIcon-ChevronRight100"
            ></svg>
        </li>
        <li class="spectrum-Breadcrumbs-item">
            <a class="spectrum-Breadcrumbs-itemLink" aria-current="page">
                Current Item
            </a>
        </li>
    </ul>
</nav>
```

## Comparison

| CSS selector                                           | Attribute or slot              | Status           |
| ------------------------------------------------------ | ------------------------------ | ---------------- |
| `.spectrum-Breadcrumbs`                                | Root element                   | Implemented      |
| `.spectrum-Breadcrumbs--multiline`                     | `compact` attribute (inverted) | Missing from WC  |
| `.spectrum-Breadcrumbs--sizeL`                         | Size variant                   | Missing from WC  |
| `.spectrum-Breadcrumbs-item`                           | Individual breadcrumb items    | Implemented      |
| `.spectrum-Breadcrumbs-itemLink`                       | Link element                   | Implemented      |
| `.spectrum-Breadcrumbs-itemSeparator`                  | Separator element              | Implemented      |
| `.spectrum-Breadcrumbs-item > .spectrum-ActionButton`  | Action button for folder icons | Implemented      |
| `.spectrum-Breadcrumbs-item.is-dragged`                | Dragged state                  | Missing from WC  |
| `.spectrum-Breadcrumbs-itemLink[href]`                 | `href` attribute               | Implemented      |
| `.spectrum-Breadcrumbs-itemLink[aria-disabled="true"]` | `disabled` attribute           | Implemented      |
| `.spectrum-Breadcrumbs-itemLink[tabindex="0"]`         | Interactive state              | Implemented      |
| -                                                      | `max-visible-items` attribute  | Missing from CSS |
| -                                                      | `label` attribute              | Missing from CSS |
| -                                                      | `menu-label` attribute         | Missing from CSS |
| -                                                      | `compact` attribute            | Missing from CSS |
| -                                                      | `icon` slot                    | Missing from CSS |
| -                                                      | `root` slot                    | Missing from CSS |

## Key Structural Changes

**Element Hierarchy Changes:**

- No significant hierarchy changes between main and spectrum-two branches
- Maintained consistent nav > ul > li structure

**Class Name Changes:**

- No major class name changes
- Consistent naming convention maintained

**Attribute Changes:**

- Added `max-visible-items` for controlling overflow behavior
- Added `label` for accessibility labeling
- Added `menu-label` for overflow menu customization
- Added `compact` for height reduction

**Slot/Content Changes:**

- Added `icon` slot for customizing overflow menu icon
- Added `root` slot for persistent root breadcrumb
- Individual items use `sp-breadcrumb-item` elements

**Migration Impact:**

- Web component provides intelligent overflow management not present in CSS-only version
- Better accessibility with automatic aria-label management
- More sophisticated truncation and menu behavior

### Implementation Gaps

**CSS Features Missing from Web Component:**

- `--multiline` variant support - web component should support multiline display mode
- `--sizeL` variant support - web component should support size variants
- `is-dragged` state support - web component should support drag and drop functionality

**Web Component Features Missing from CSS:**

- `max-visible-items` attribute - CSS should provide styling for overflow management
- `label` attribute - CSS should provide styling for aria-label
- `menu-label` attribute - CSS should provide styling for overflow menu
- `compact` attribute - CSS should provide compact styling variant
- `icon` slot - CSS should provide styling for custom overflow menu icons
- `root` slot - CSS should provide styling for persistent root items

**Features Being Deprecated/Removed:**

- None identified - component maintains backward compatibility

### Action Items for Web Component Maintainers

**Required Additions:**

- Multiline variant support for breadcrumbs that wrap to multiple lines
- Size variant support (large size option)
- Drag and drop functionality for breadcrumb items
- CSS custom properties for overflow management styling

**Required Removals:**

- None identified

**Breaking Changes:**

- None identified - component provides enhanced functionality while maintaining compatibility
- Migration guidance: Enhanced overflow management and accessibility features are automatically available in web component version
