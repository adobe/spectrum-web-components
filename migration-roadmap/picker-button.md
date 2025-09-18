# Picker button migration roadmap

## Component specifications

### CSS

<details>
<summary>CSS selectors</summary>

- `.spectrum-PickerButton`
- `.spectrum-PickerButton--quiet`
- `.spectrum-PickerButton--quiet:disabled`
- `.spectrum-PickerButton--quiet:not(:disabled):active`
- `.spectrum-PickerButton--quiet:not(:disabled):focus-visible`
- `.spectrum-PickerButton--quiet:not(:disabled):hover`
- `.spectrum-PickerButton--workflowicon .spectrum-PickerButton-fill`
- `.spectrum-PickerButton-fill`
- `.spectrum-PickerButton-icon`
- `.spectrum-PickerButton.is-open`
- `.spectrum-PickerButton.spectrum-PickerButton--quiet`
- `.spectrum-PickerButton.spectrum-PickerButton--quiet:disabled`
- `.spectrum-PickerButton.spectrum-PickerButton--sizeL`
- `.spectrum-PickerButton.spectrum-PickerButton--sizeS`
- `.spectrum-PickerButton.spectrum-PickerButton--sizeXL`
- `.spectrum-PickerButton:active`
- `.spectrum-PickerButton:disabled`
- `.spectrum-PickerButton:focus-visible`
- `.spectrum-PickerButton:hover`
- `.spectrum-PickerButton:not(:disabled):active`
- `.spectrum-PickerButton:not(:disabled):focus-visible`
- `.spectrum-PickerButton:not(:disabled):hover`

</details>

<details>
<summary>Passthroughs</summary>

None found for this component.

</details>

<details>
<summary>Modifiers</summary>

- `--mod-picker-button-background-animation-duration`
- `--mod-picker-button-background-color`
- `--mod-picker-button-background-color-disabled`
- `--mod-picker-button-background-color-down`
- `--mod-picker-button-background-color-down-disabled`
- `--mod-picker-button-background-color-down-quiet`
- `--mod-picker-button-background-color-hover`
- `--mod-picker-button-background-color-hover-disabled`
- `--mod-picker-button-background-color-hover-quiet`
- `--mod-picker-button-background-color-quiet`
- `--mod-picker-button-background-color-quiet-disabled`
- `--mod-picker-button-border-radius`
- `--mod-picker-button-fill-padding`
- `--mod-picker-button-height`
- `--mod-picker-button-icon-color`
- `--mod-picker-button-icon-color-disabled`
- `--mod-picker-button-icon-color-down`
- `--mod-picker-button-icon-color-down-disabled`
- `--mod-picker-button-icon-color-hover`
- `--mod-picker-button-icon-color-hover-disabled`
- `--mod-picker-button-padding`
- `--mod-picker-button-width`

</details>

### SWC

<details>
<summary>Attributes</summary>

- `invalid` (Boolean) - Whether the picker button is in an invalid state
- `position` (String) - Position of the button: 'left' or 'right'

</details>

<details>
<summary>Slots</summary>

- `label` - Text label for the picker button
- `icon` - Icon for the picker button

</details>

## Comparison

### DOM Structure changes

<details>
<summary>Spectrum Web Components:</summary>

```html
<div class="root uiicononly">
    <div class="spectrum-PickerButton-fill">
        <span class="spectrum-PickerButton-label is-placeholder" hidden>
            <slot name="label"></slot>
        </span>
        <slot name="icon">
            <sp-icon-chevron100
                class="spectrum-PickerButton-icon spectrum-Icon spectrum-UIIcon-ChevronDown100"
            ></sp-icon-chevron100>
        </slot>
    </div>
</div>
```

</details>

<details>
<summary>Legacy (CSS main branch):</summary>

```html
<button class="spectrum-PickerButton spectrum-PickerButton--sizeM">
    <div class="spectrum-PickerButton-fill">
        <span class="spectrum-PickerButton-label is-placeholder">
            Label text
        </span>
        <sp-icon-chevron100
            class="spectrum-PickerButton-icon"
        ></sp-icon-chevron100>
    </div>
</button>
```

</details>

<details>
<summary>Spectrum 2 (CSS spectrum-two branch):</summary>

```html
<button class="spectrum-PickerButton spectrum-PickerButton--sizeM">
    <div class="spectrum-PickerButton-fill">
        <sp-icon-chevron100
            class="spectrum-PickerButton-icon"
        ></sp-icon-chevron100>
    </div>
</button>
```

</details>

<details>
<summary>Diff: Legacy (CSS main) → Spectrum 2 (CSS spectrum-two)</summary>

### HTML Output Comparison

**Legacy (CSS main branch) - With Label:**

```html
<button
    class="spectrum-PickerButton spectrum-PickerButton--textuiicon spectrum-PickerButton--right spectrum-PickerButton--sizeM"
    aria-haspopup="listbox"
>
    <div class="spectrum-PickerButton-fill">
        <span class="spectrum-PickerButton-label is-placeholder">Select</span>
        <sp-icon-chevron100
            class="spectrum-PickerButton-icon"
        ></sp-icon-chevron100>
    </div>
</button>
```

**Legacy (CSS main branch) - Icon Only:**

```html
<button
    class="spectrum-PickerButton spectrum-PickerButton--uiicononly spectrum-PickerButton--right spectrum-PickerButton--sizeM"
    aria-haspopup="listbox"
>
    <div class="spectrum-PickerButton-fill">
        <sp-icon-chevron100
            class="spectrum-PickerButton-icon"
        ></sp-icon-chevron100>
    </div>
</button>
```

**Spectrum 2 (CSS spectrum-two branch):**

```html
<button
    class="spectrum-PickerButton spectrum-PickerButton--sizeM"
    aria-haspopup="listbox"
    type="button"
>
    <div class="spectrum-PickerButton-fill">
        <sp-icon-chevron100
            class="spectrum-PickerButton-icon spectrum-Icon spectrum-UIIcon-ChevronDown100"
        ></sp-icon-chevron100>
    </div>
</button>
```

### Key Changes in HTML Structure

1. **Label removal**: The `<span class="spectrum-PickerButton-label is-placeholder">` element is completely removed
2. **Class simplification**:
    - Removed: `--textuiicon`, `--uiicononly`, `--icononly`, `--right`/`--left` positioning classes
    - Added: `--workflowicon` for workflow icons only
3. **Button attributes**: Added explicit `type="button"` attribute
4. **Icon classes**: Enhanced with `spectrum-Icon spectrum-UIIcon-*` classes for better specificity
5. **State management**: Simplified from `is-focused` to `is-active`/`is-hover` pattern

</details>

### CSS => SWC mapping

| CSS selector                                                       | Attribute or slot     | Status          |
| ------------------------------------------------------------------ | --------------------- | --------------- |
| `.spectrum-PickerButton`                                           | Base element          | Implemented     |
| `.spectrum-PickerButton--workflowicon .spectrum-PickerButton-fill` | Workflow icon variant | Missing from WC |
| `.spectrum-PickerButton--quiet`                                    | `quiet` attribute     | Missing from WC |
| `.spectrum-PickerButton-fill`                                      | Fill container        | Implemented     |
| `.spectrum-PickerButton-icon`                                      | Icon slot             | Implemented     |
| `.spectrum-PickerButton.is-open`                                   | Open state            | Missing from WC |
| `.spectrum-PickerButton--sizeL`                                    | `size="l"`            | Implemented     |
| `.spectrum-PickerButton--sizeS`                                    | `size="s"`            | Implemented     |
| `.spectrum-PickerButton--sizeXL`                                   | `size="xl"`           | Implemented     |
| `.spectrum-PickerButton:disabled`                                  | `disabled` attribute  | Implemented     |
| `.spectrum-PickerButton:focus-visible`                             | Focus state           | Implemented     |
| `.spectrum-PickerButton:hover`                                     | Hover state           | Implemented     |
| `.spectrum-PickerButton:active`                                    | Active state          | Implemented     |

## Summary of changes

### CSS => SWC implementation gaps

- **Quiet variant**: The web component lacks a `quiet` attribute for the subtle button style commonly used in compact interfaces and toolbars.
- **Open state management**: Missing built-in state management for dropdown open/closed states, requiring manual implementation of `is-open` class handling.
- **Workflow icon variant**: No support for the `.spectrum-PickerButton--workflowicon` variant, which uses workflow icons instead of UI icons for specific use cases.

### CSS Spectrum 2 changes

- **Streamlined API**: Removed complex parameters (`label`, `position`, `isFocused`, `isRounded`) to focus on core functionality and reduce API surface area.
- **Icon-focused design**: Shifted from label-based to icon-only design with separate `workflowIconName`/`uiIconName` parameters for better icon management and consistency.
- **Simplified state handling**: Consolidated state management by removing `isFocused`/`isRounded` while maintaining essential interaction states (`isActive`/`isHovered`/`isDisabled`).

## Resources

- [CSS migration](https://github.com/adobe/spectrum-css/pull/4114)
- [React](https://react-spectrum.adobe.com/s2/index.html?path=/docs/picker--docs)
- [Spectrum 2 preview](https://spectrumcss.z13.web.core.windows.net/pr-2352/index.html?path=/docs/components-picker-button--docs)
