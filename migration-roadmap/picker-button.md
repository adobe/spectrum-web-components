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

- `active` (Boolean) - Whether the picker button is in an active state
- `disabled` (Boolean) - Disable this control. It will not receive focus or events
- `download` (String) - Causes the browser to treat the linked URL as a download
- `href` (String) - The URL that the hyperlink points to
- `label` (String) - An accessible label that describes the component. It will be applied to aria-label, but not visually rendered
- `open` (Boolean) - Whether the picker button is in an open state (for dropdown menus)
- `position` (String) - Position of the button: 'left' or 'right'
- `quiet` (Boolean) - Whether the picker button is in quiet variant
- `referrerpolicy` (String) - How much of the referrer to send when following the link
- `rel` (String) - The relationship of the linked URL as space-separated link types
- `rounded` (Boolean) - Whether the picker button has rounded corners (express system)
- `size` (String) - Size of the picker button: 's', 'm', 'l', 'xl'
- `tabIndex` (Number) - The tab index to apply to this control
- `target` (String) - Where to display the linked URL, as the name for a browsing context
- `type` (String) - The default behavior of the button: 'button', 'submit', or 'reset'

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
        <svg
            class="spectrum-PickerButton-icon"
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
    class="spectrum-PickerButton spectrum-PickerButton--sizeM"
    type="button"
>
    <div class="spectrum-PickerButton-fill">
        <svg
            class="spectrum-PickerButton-icon"
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

**Legacy (CSS main) → Spectrum 2 (CSS spectrum-two):**

```diff
<button
-    class="spectrum-PickerButton spectrum-PickerButton--textuiicon spectrum-PickerButton--right spectrum-PickerButton--sizeM"
+    class="spectrum-PickerButton spectrum-PickerButton--sizeM"
    aria-haspopup="listbox"
+    type="button"
>
    <div class="spectrum-PickerButton-fill">
-        <span class="spectrum-PickerButton-label is-placeholder">Select</span>
        <svg
            class="spectrum-PickerButton-icon"
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

| CSS selector                                                       | Attribute or slot             | Status      |
| ------------------------------------------------------------------ | ----------------------------- | ----------- |
| `.spectrum-PickerButton`                                           | `:host`                       | Implemented |
| `.spectrum-PickerButton--workflowicon .spectrum-PickerButton-fill` | Workflow icon via `icon` slot | Implemented |
| `.spectrum-PickerButton--quiet`                                    | `quiet` attribute             | Implemented |
| `.spectrum-PickerButton-fill`                                      | Fill container                | Implemented |
| `.spectrum-PickerButton-icon`                                      | Icon slot                     | Implemented |
| `.spectrum-PickerButton.is-open`                                   | `open` attribute              | Implemented |
| `.spectrum-PickerButton--sizeL`                                    | `size="l"`                    | Implemented |
| `.spectrum-PickerButton--sizeS`                                    | `size="s"`                    | Implemented |
| `.spectrum-PickerButton--sizeXL`                                   | `size="xl"`                   | Implemented |
| `.spectrum-PickerButton:disabled`                                  | `disabled` attribute          | Implemented |
| `.spectrum-PickerButton:active`                                    | `active` attribute            | Implemented |

## Summary of changes

### CSS => SWC implementation gaps

No implementation gaps found. All CSS functionality is properly mapped to web component attributes and slots.

### CSS Spectrum 2 changes

- **Streamlined API**: Removed complex parameters (`label`, `position`, `isFocused`, `isRounded`) to focus on core functionality and reduce API surface area.
- **Relationship to infield button**: This component follows the same design patterns as the infield button component in Spectrum 2, both being designed for inline use within form fields. While they were kept as separate components in the CSS implementation, there was discussion about combining them, and this might be worth considering during the web component migration to reduce duplication and maintain consistency.
- **Icon-focused design**: Shifted from label-based to icon-only design with separate `workflowIconName`/`uiIconName` parameters for better icon management and consistency.
- **Simplified state handling**: Consolidated state management by removing `isFocused`/`isRounded` while maintaining essential interaction states (`isActive`/`isHovered`/`isDisabled`).

## Resources

- [CSS migration](https://github.com/adobe/spectrum-css/pull/4114)
- [React](https://react-spectrum.adobe.com/s2/index.html?path=/docs/picker--docs)
- [Spectrum 2 preview](https://spectrumcss.z13.web.core.windows.net/pr-2352/index.html?path=/docs/components-picker-button--docs)
