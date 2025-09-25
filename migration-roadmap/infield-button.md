# In-field button migration roadmap

## Component specifications

### CSS

<details>
<summary>CSS selectors</summary>

- `.spectrum-InfieldButton`
- `.spectrum-InfieldButton--quiet`
- `.spectrum-InfieldButton--quiet:disabled`
- `.spectrum-InfieldButton--quiet:not(:disabled):active`
- `.spectrum-InfieldButton--quiet:not(:disabled):focus-visible`
- `.spectrum-InfieldButton--quiet:not(:disabled):hover`
- `.spectrum-InfieldButton-fill`
- `.spectrum-InfieldButton-icon`
- `.spectrum-InfieldButton-inline`
- `.spectrum-InfieldButton-inline .spectrum-InfieldButton`
- `.spectrum-InfieldButton-inline > .spectrum-InfieldButton.spectrum-InfieldButton--sizeS`
- `.spectrum-InfieldButton.spectrum-InfieldButton--quiet`
- `.spectrum-InfieldButton.spectrum-InfieldButton--quiet:disabled`
- `.spectrum-InfieldButton.spectrum-InfieldButton--sizeL`
- `.spectrum-InfieldButton.spectrum-InfieldButton--sizeS`
- `.spectrum-InfieldButton.spectrum-InfieldButton--sizeXL`
- `.spectrum-InfieldButton:active`
- `.spectrum-InfieldButton:disabled`
- `.spectrum-InfieldButton:focus-visible`
- `.spectrum-InfieldButton:hover`
- `.spectrum-InfieldButton:not(:disabled):active`
- `.spectrum-InfieldButton:not(:disabled):focus-visible`
- `.spectrum-InfieldButton:not(:disabled):hover`

</details>

<details>
<summary>Passthroughs</summary>

None found for this component.

</details>

<details>
<summary>Modifiers</summary>

- `--mod-infield-button-background-color`
- `--mod-infield-button-background-color-disabled`
- `--mod-infield-button-background-color-down`
- `--mod-infield-button-background-color-down-disabled`
- `--mod-infield-button-background-color-down-quiet`
- `--mod-infield-button-background-color-hover`
- `--mod-infield-button-background-color-hover-disabled`
- `--mod-infield-button-background-color-hover-quiet`
- `--mod-infield-button-background-color-quiet`
- `--mod-infield-button-background-color-quiet-disabled`
- `--mod-infield-button-border-radius`
- `--mod-infield-button-edge-to-fill`
- `--mod-infield-button-field-edge-to-icon`
- `--mod-infield-button-fill-justify-content`
- `--mod-infield-button-fill-padding`
- `--mod-infield-button-height`
- `--mod-infield-button-icon-color`
- `--mod-infield-button-icon-color-disabled`
- `--mod-infield-button-icon-color-down`
- `--mod-infield-button-icon-color-down-disabled`
- `--mod-infield-button-icon-color-hover`
- `--mod-infield-button-icon-color-hover-disabled`
- `--mod-infield-button-side-edge-to-fill`
- `--mod-infield-button-width`

</details>

### SWC

<details>
<summary>Attributes</summary>

- `active` (Boolean) - Whether the infield button is in an active state
- `block` (String) - Vertical stack position: 'start' or 'end'
- `disabled` (Boolean) - Disable this control. It will not receive focus or events
- `download` (String) - Causes the browser to treat the linked URL as a download
- `href` (String) - The URL that the hyperlink points to
- `inline` (String) - Horizontal group position: 'start' or 'end'
- `label` (String) - An accessible label that describes the component. It will be applied to aria-label, but not visually rendered
- `quiet` (Boolean) - Whether the button is in quiet variant
- `referrerpolicy` (String) - How much of the referrer to send when following the link
- `rel` (String) - The relationship of the linked URL as space-separated link types
- `tabIndex` (Number) - The tab index to apply to this control
- `target` (String) - Where to display the linked URL, as the name for a browsing context
- `type` (String) - The default behavior of the button: 'button', 'submit', or 'reset'

</details>

<details>
<summary>Slots</summary>

- Default slot - Text content for the button
- Icon slot - Icon content for the button

</details>

## Comparison

### DOM Structure changes

<details>
<summary>Spectrum Web Components:</summary>

```html
<button class="spectrum-InfieldButton">
    <div class="fill">
        <slot></slot>
    </div>
</button>
```

</details>

<details>
<summary>Legacy (CSS main branch):</summary>

```html
<button class="spectrum-InfieldButton spectrum-InfieldButton--sizeM">
    <div class="spectrum-InfieldButton-fill">
        <svg
            class="spectrum-InfieldButton-icon"
            focusable="false"
            aria-hidden="true"
        >
            <path
                d="M10 2C10.55 2 11 2.45 11 3V9H17C17.55 9 18 9.45 18 10C18 10.55 17.55 11 17 11H11V17C11 17.55 10.55 18 10 18C9.45 18 9 17.55 9 17V11H3C2.45 11 2 10.55 2 10C2 9.45 2.45 9 3 9H9V3C9 2.45 9.45 2 10 2Z"
            ></path>
        </svg>
    </div>
</button>
```

</details>

<details>
<summary>Spectrum 2 (CSS spectrum-two branch):</summary>

```html
<button
    class="spectrum-InfieldButton spectrum-InfieldButton--sizeM"
    role="presentation"
>
    <div class="spectrum-InfieldButton-fill">
        <svg
            class="spectrum-InfieldButton-icon"
            focusable="false"
            aria-hidden="true"
        >
            <path
                d="M10 2C10.55 2 11 2.45 11 3V9H17C17.55 9 18 9.45 18 10C18 10.55 17.55 11 17 11H11V17C11 17.55 10.55 18 10 18C9.45 18 9 17.55 9 17V11H3C2.45 11 2 10.55 2 10C2 9.45 2.45 9 3 9H9V3C9 2.45 9.45 2 10 2Z"
            ></path>
        </svg>
    </div>
</button>
```

</details>

<details>
<summary>Diff: Legacy (CSS main) → Spectrum 2 (CSS spectrum-two)</summary>

### HTML Output Diff

**Single Button Changes:**

```diff
<button
    class="spectrum-InfieldButton spectrum-InfieldButton--sizeM"
    aria-haspopup="listbox"
    type="button"
    tabindex="0"
+   role="presentation"
>
    <div class="spectrum-InfieldButton-fill">
        <svg class="spectrum-InfieldButton-icon" focusable="false" aria-hidden="true">
            <path d="M10 2C10.55 2 11 2.45 11 3V9H17C17.55 9 18 9.45 18 10C18 10.55 17.55 11 17 11H11V17C11 17.55 10.55 18 10 18C9.45 18 9 17.55 9 17V11H3C2.45 11 2 10.55 2 10C2 9.45 2.45 9 3 9H9V3C9 2.45 9.45 2 10 2Z"></path>
        </svg>
    </div>
</button>
```

**Stacked → Inline Layout Changes:**

```diff
+<div class="spectrum-InfieldButton-inline">
<button
-   class="spectrum-InfieldButton spectrum-InfieldButton--sizeM spectrum-InfieldButton--top"
+   class="spectrum-InfieldButton spectrum-InfieldButton--sizeM"
    aria-haspopup="listbox"
    type="button"
    tabindex="0"
-   aria-label="add"
+   aria-label="minus"
>
    <div class="spectrum-InfieldButton-fill">
        <svg class="spectrum-InfieldButton-icon" focusable="false" aria-hidden="true">
-           <path d="M10 2C10.55 2 11 2.45 11 3V9H17C17.55 9 18 9.45 18 10C18 10.55 17.55 11 17 11H11V17C11 17.55 10.55 18 10 18C9.45 18 9 17.55 9 17V11H3C2.45 11 2 10.55 2 10C2 9.45 2.45 9 3 9H9V3C9 2.45 9.45 2 10 2Z"></path>
+           <path d="M3 10C3 9.45 3.45 9 4 9H16C16.55 9 17 9.45 17 10C17 10.55 16.55 11 16 11H4C3.45 11 3 10.55 3 10Z"></path>
        </svg>
    </div>
</button>
<button
-   class="spectrum-InfieldButton spectrum-InfieldButton--sizeM spectrum-InfieldButton--bottom"
+   class="spectrum-InfieldButton spectrum-InfieldButton--sizeM"
    aria-haspopup="listbox"
    type="button"
    tabindex="0"
    aria-label="add"
>
    <div class="spectrum-InfieldButton-fill">
        <svg class="spectrum-InfieldButton-icon" focusable="false" aria-hidden="true">
            <path d="M10 2C10.55 2 11 2.45 11 3V9H17C17.55 9 18 9.45 18 10C18 10.55 17.55 11 17 11H11V17C11 17.55 10.55 18 10 18C9.45 18 9 17.55 9 17V11H3C2.45 11 2 10.55 2 10C2 9.45 2.45 9 3 9H9V3C9 2.45 9.45 2 10 2Z"></path>
        </svg>
    </div>
</button>
+</div>
```

### Key Changes in HTML Structure

1. **Layout paradigm shift**: Replaced `isStacked` vertical stacking with `isInline` horizontal grouping
2. **Position styles removed**: The `inline` and `block` position properties from SWC are no longer supported in CSS-only implementations
3. **Enhanced iconography**:
    - Single button: Uses size-specific icon names (e.g., `Add100` instead of `Add`)
    - Inline buttons: Switched from chevron icons to more intuitive action icons (`Dash`/`Add`)
4. **Simplified state management**: Removed `isInvalid` and `isFocused` states while preserving `isHovered`/`isActive`
5. **Improved accessibility**: Added `role="presentation"` for single buttons and proper `aria-label` differentiation for inline buttons
6. **Container structure**: Inline variant wraps buttons in `spectrum-InfieldButton-inline` container
7. **Consistent corner radius**: Position-specific border radius variants have been removed in favor of a consistent corner radius approach

</details>

### CSS => SWC mapping

| CSS selector                       | Attribute or slot      | Status                       |
| ---------------------------------- | ---------------------- | ---------------------------- |
| `.spectrum-InfieldButton`          | `:host`                | Implemented                  |
| `.spectrum-InfieldButton--quiet`   | `quiet` attribute      | Implemented                  |
| `.spectrum-InfieldButton-fill`     | Fill container         | Implemented                  |
| `.spectrum-InfieldButton-icon`     | Icon slot              | Implemented                  |
| `.spectrum-InfieldButton-inline`   | Inline group container | Missing from WC (new for S2) |
| `.spectrum-InfieldButton--sizeL`   | `size="l"`             | Implemented                  |
| `.spectrum-InfieldButton--sizeS`   | `size="s"`             | Implemented                  |
| `.spectrum-InfieldButton--sizeXL`  | `size="xl"`            | Implemented                  |
| `.spectrum-InfieldButton:disabled` | `disabled` attribute   | Implemented                  |
| `.spectrum-InfieldButton:active`   | `active` attribute     | Implemented                  |

## Summary of changes

### CSS => SWC implementation gaps

- **Inline group functionality**: The web component lacks support for `.spectrum-InfieldButton-inline` which enables horizontal button grouping, commonly used for increment/decrement controls in number inputs and similar interfaces.
- **Required wrapper div**: Spectrum 2 introduces a mandatory `<div class="spectrum-InfieldButton-inline">` wrapper element for inline button layouts. This structural change is essential for proper CSS styling and must be implemented during migration to ensure the component renders correctly in Spectrum 2.

### CSS Spectrum 2 changes

- **Reduced API complexity**: Eliminated numerous parameters (`position`, `isInvalid`, `isFocused`, `isStacked`, `onSubtract`, `onAdd`) to create a more focused and maintainable component API.
- **Layout paradigm shift**: Replaced the `isStacked` vertical stacking approach with `isInline` horizontal grouping, better aligning with common use cases for infield buttons.
- **Position styles removed**: The `inline` and `block` position properties from SWC are no longer supported in CSS-only implementations due to the consistent corner radius approach.
- **Enhanced iconography**: Switched from chevron-based icons to more intuitive action icons (Dash/Add), providing clearer visual cues for increment/decrement operations.
- **Streamlined state management**: Removed `isInvalid`/`isFocused` states while preserving essential interaction feedback (`isHovered`/`isActive`).
- **Flexible template structure**: Inline variant automatically creates paired buttons for common operations, while single variant provides direct click handling for custom actions.
- **Focus state inheritance**: Infield buttons no longer manage their own focus states, instead inheriting focus styling from their parent components (like textfields or pickers). This creates a more cohesive user experience where the entire input field appears focused rather than individual button elements.

#### Removed modifiers

Due to deprecation of the position variants in the infield button, several spacing and border radius modifiers have been removed:

- `--mod-infield-button-inner-edge-to-fill`
- `--mod-infield-button-stacked-border-radius-reset`
- `--mod-infield-button-stacked-bottom-border-block-end-width`
- `--mod-infield-button-stacked-bottom-border-radius-end-end`
- `--mod-infield-button-stacked-bottom-border-radius-end-start`
- `--mod-infield-button-stacked-fill-padding-inline`
- `--mod-infield-button-stacked-fill-padding-inner`

#### New tokens

These new tokens support the inline variant and stepper (number field) use cases:

- `--spectrum-in-field-button-side-edge-to-fill-small`
- `--spectrum-in-field-button-side-edge-to-fill-medium`
- `--spectrum-in-field-button-side-edge-to-fill-large`
- `--spectrum-in-field-button-side-edge-to-fill-extra-large`
- `--spectrum-field-edge-to-icon-75`
- `--spectrum-field-edge-to-icon-100`
- `--spectrum-field-edge-to-icon-200`
- `--spectrum-field-edge-to-icon-300`

## Resources

- [CSS migration](https://github.com/adobe/spectrum-css/pull/3642)
- [Spectrum 2 preview](https://spectrumcss.z13.web.core.windows.net/pr-2352/index.html?path=/docs/components-in-field-button--docs)
