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

- `block` (String) - Vertical stack position: 'start' or 'end'
- `inline` (String) - Horizontal group position: 'start' or 'end'
- `quiet` (Boolean) - Whether the button is in quiet variant

</details>

<details>
<summary>Slots</summary>

- Default slot - Icon content for the button

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
        <sp-icon-add class="spectrum-InfieldButton-icon"></sp-icon-add>
    </div>
</button>
```

</details>

<details>
<summary>Spectrum 2 (CSS spectrum-two branch):</summary>

```html
<button class="spectrum-InfieldButton spectrum-InfieldButton--sizeM">
    <div class="spectrum-InfieldButton-fill">
        <sp-icon-add class="spectrum-InfieldButton-icon"></sp-icon-add>
    </div>
</button>
```

</details>

<details>
<summary>Diff: Legacy (CSS main) → Spectrum 2 (CSS spectrum-two)</summary>

### HTML Output Comparison

**Legacy (CSS main branch) - Single button:**

```html
<button
    class="spectrum-InfieldButton spectrum-InfieldButton--sizeM"
    aria-haspopup="listbox"
    type="button"
    tabindex="0"
>
    <div class="spectrum-InfieldButton-fill">
        <sp-icon-add class="spectrum-InfieldButton-icon"></sp-icon-add>
    </div>
</button>
```

**Legacy (CSS main branch) - Stacked buttons:**

```html
<button
    class="spectrum-InfieldButton spectrum-InfieldButton--sizeM spectrum-InfieldButton--top"
    aria-haspopup="listbox"
    type="button"
    tabindex="0"
    aria-label="add"
>
    <div class="spectrum-InfieldButton-fill">
        <sp-icon-chevronup75
            class="spectrum-InfieldButton-icon"
        ></sp-icon-chevronup75>
    </div>
</button>
<button
    class="spectrum-InfieldButton spectrum-InfieldButton--sizeM spectrum-InfieldButton--bottom"
    aria-haspopup="listbox"
    type="button"
    tabindex="0"
    aria-label="add"
>
    <div class="spectrum-InfieldButton-fill">
        <sp-icon-chevrondown75
            class="spectrum-InfieldButton-icon"
        ></sp-icon-chevrondown75>
    </div>
</button>
```

**Spectrum 2 (CSS spectrum-two branch) - Single button:**

```html
<button
    class="spectrum-InfieldButton spectrum-InfieldButton--sizeM"
    aria-haspopup="listbox"
    type="button"
    tabindex="0"
    role="presentation"
>
    <div class="spectrum-InfieldButton-fill">
        <sp-icon-add100 class="spectrum-InfieldButton-icon"></sp-icon-add100>
    </div>
</button>
```

**Spectrum 2 (CSS spectrum-two branch) - Inline buttons:**

```html
<div class="spectrum-InfieldButton-inline">
    <button
        class="spectrum-InfieldButton spectrum-InfieldButton--sizeM"
        aria-haspopup="listbox"
        type="button"
        tabindex="0"
        aria-label="minus"
    >
        <div class="spectrum-InfieldButton-fill">
            <sp-icon-dash class="spectrum-InfieldButton-icon"></sp-icon-dash>
        </div>
    </button>
    <button
        class="spectrum-InfieldButton spectrum-InfieldButton--sizeM"
        aria-haspopup="listbox"
        type="button"
        tabindex="0"
        aria-label="add"
    >
        <div class="spectrum-InfieldButton-fill">
            <sp-icon-add class="spectrum-InfieldButton-icon"></sp-icon-add>
        </div>
    </button>
</div>
```

### Key Changes in HTML Structure

1. **Layout paradigm shift**: Replaced `isStacked` vertical stacking with `isInline` horizontal grouping
2. **Enhanced iconography**:
    - Single button: Uses size-specific icon names (e.g., `Add100` instead of `Add`)
    - Inline buttons: Switched from chevron icons to more intuitive action icons (`Dash`/`Add`)
3. **Simplified state management**: Removed `isInvalid` and `isFocused` states while preserving `isHovered`/`isActive`
4. **Improved accessibility**: Added `role="presentation"` for single buttons and proper `aria-label` differentiation for inline buttons
5. **Container structure**: Inline variant wraps buttons in `spectrum-InfieldButton-inline` container

</details>
### CSS => SWC mapping
@@ -15,7 +12,6 @@ export const Template = (
 		rootClass = "spectrum-InfieldButton",
 		customClasses = [],
 		size = "m",
-		position,
 		isQuiet,
 		iconName = "Add",
 		iconSet = "workflow",
@@ -22,7 +18,6 @@ export const Template = (
 		isDisabled,
-		isInvalid,
 		isHovered,
 		isActive,
-		isFocused,
-		isStacked,
+		isInline,
 		tabIndex = 0,
-		onSubtract,
-		onAdd,
 		onclick,
 	} = {},
 	context = {},
@@ -30,7 +25,6 @@ export const Template = (
 	let iconSize = size === "s" ? "75" : size === "l" ? "200" : size === "xl" ? "300" : "100";
 	let iconNameWithSize = `${iconName}${iconSize}`;
-	return isStacked
+	return isInline
 		? html`
-			<div class="${rootClass}-inline">
+			<div class="${rootClass}-inline">
 			<button
 				class=${classMap({
 					[rootClass]: true,
 					[`${rootClass}--size${size?.toUpperCase()}`]:
 						typeof size !== "undefined",
-					[`${rootClass}--top`]: typeof position !== "undefined",
 					[`${rootClass}--quiet`]: isQuiet,
-					"is-invalid": isInvalid,
 					"is-hover": isHovered,
 					"is-active": isActive,
-					"is-focus-visible": isFocused,
 					...customClasses.reduce((a, c) => ({ ...a, [c]: true }), {}),
 					})}
 					?disabled=${isDisabled}
 					aria-haspopup="listbox"
 					type="button"
 					tabindex=${tabIndex}
-					aria-label="add"
+					aria-label="minus"
 					>
 					<div class="${rootClass}-fill">
 						${Icon(
 							{
 								size,
-								iconName: "ChevronUp75",
+								iconName: "Dash",
 								setName: "ui",
 								customClasses: [`${rootClass}-icon`],
 							},
 							context,
 						)}
 					</div>
 				</button>
 				<button
 					class=${classMap({
 						[rootClass]: true,
 						[`${rootClass}--size${size?.toUpperCase()}`]:
 							typeof size !== "undefined",
-						[`${rootClass}--bottom`]: typeof position !== "end",
+						[`${rootClass}--quiet`]: isQuiet,
 						"is-hover": isHovered,
 						"is-active": isActive,
-						"is-focus-visible": isFocused,
 						...customClasses.reduce((a, c) => ({ ...a, [c]: true }), {}),
 					})}
 					?disabled=${isDisabled}
 					aria-haspopup="listbox"
 					type="button"
 					tabindex=${tabIndex}
-					aria-label="add"
+					aria-label="add"
 				>
 					<div class="${rootClass}-fill">
 						${Icon(
 							{
 								size,
-								iconName: "ChevronDown75",
+								iconName: "Add",
 								setName: "ui",
 								customClasses: [`${rootClass}-icon`],
 							},
 							context,
 						)}
 					</div>
 				</button>
 			</div>
 			`
 		: html`
 				<button
 					class=${classMap({
 						[rootClass]: true,
 						[`${rootClass}--size${size?.toUpperCase()}`]:
 							typeof size !== "undefined",
-						[`${rootClass}--${position}`]: typeof position !== "undefined",
 						[`${rootClass}--quiet`]: isQuiet,
 						"is-hover": isHovered,
 						"is-active": isActive,
-						"is-focus-visible": isFocused,
 						...customClasses.reduce((a, c) => ({ ...a, [c]: true }), {}),
 					})}
 					?disabled=${isDisabled}
 					aria-haspopup="listbox"
 					type="button"
 					tabindex=${tabIndex}
-				>
+					@click=${onclick}
+					role="presentation"
+				>
 					<div class="${rootClass}-fill">
 						${when(iconName, () =>
 							Icon(
 								{
 									size,
-									iconName,
+									iconName: iconNameWithSize,
 									setName: iconSet,
 									customClasses: [`${rootClass}-icon`],
 								},
 								context,
 							),
 						)}
 					</div>
 				</button>
 			`;
```

</details>

### CSS => SWC mapping

| CSS selector                            | Attribute or slot      | Status                       |
| --------------------------------------- | ---------------------- | ---------------------------- |
| `.spectrum-InfieldButton`               | Base element           | Implemented                  |
| `.spectrum-InfieldButton--quiet`        | `quiet` attribute      | Implemented                  |
| `.spectrum-InfieldButton-fill`          | Fill container         | Implemented                  |
| `.spectrum-InfieldButton-icon`          | Icon slot              | Implemented                  |
| `.spectrum-InfieldButton-inline`        | Inline group container | Missing from WC (new for S2) |
| `.spectrum-InfieldButton--sizeL`        | `size="l"`             | Implemented                  |
| `.spectrum-InfieldButton--sizeS`        | `size="s"`             | Implemented                  |
| `.spectrum-InfieldButton--sizeXL`       | `size="xl"`            | Implemented                  |
| `.spectrum-InfieldButton:disabled`      | `disabled` attribute   | Implemented                  |
| `.spectrum-InfieldButton:focus-visible` | Focus state            | Implemented                  |
| `.spectrum-InfieldButton:hover`         | Hover state            | Implemented                  |
| `.spectrum-InfieldButton:active`        | Active state           | Implemented                  |

## Summary of changes

### CSS => SWC implementation gaps

- **Inline group functionality**: The web component lacks support for `.spectrum-InfieldButton-inline` which enables horizontal button grouping, commonly used for increment/decrement controls in number inputs and similar interfaces.

### CSS Spectrum 2 changes

- **Reduced API complexity**: Eliminated numerous parameters (`position`, `isInvalid`, `isFocused`, `isStacked`, `onSubtract`, `onAdd`) to create a more focused and maintainable component API.
- **Layout paradigm shift**: Replaced the `isStacked` vertical stacking approach with `isInline` horizontal grouping, better aligning with common use cases for infield buttons.
- **Enhanced iconography**: Switched from chevron-based icons to more intuitive action icons (Dash/Add), providing clearer visual cues for increment/decrement operations.
- **Streamlined state management**: Removed `isInvalid`/`isFocused` states while preserving essential interaction feedback (`isHovered`/`isActive`).
- **Flexible template structure**: Inline variant automatically creates paired buttons for common operations, while single variant provides direct click handling for custom actions.

## Resources

- [CSS migration](https://github.com/adobe/spectrum-css/pull/3642)
- [Spectrum 2 preview](https://spectrumcss.z13.web.core.windows.net/pr-2352/index.html?path=/docs/components-in-field-button--docs)
