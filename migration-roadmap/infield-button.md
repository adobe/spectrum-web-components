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

```diff
--- a/components/infieldbutton/stories/template.js (main branch)
+++ b/components/infieldbutton/stories/template.js (spectrum-two branch)
@@ -1,5 +1,3 @@
-import { Template as Icon } from "@spectrum-css/icon/stories/template.js";
-import { html } from "lit";
-import { classMap } from "lit/directives/class-map.js";
-import { when } from "lit/directives/when.js";
+import { Template as Icon } from "@spectrum-css/icon/stories/template.js";
+import { html } from "lit";
+import { classMap } from "lit/directives/class-map.js";
+import { when } from "lit/directives/when.js";
@@ -7,7 +5,6 @@ import { when } from "lit/directives/when.js";
 import "../index.css";
-import "../themes/spectrum.css";
-/* Must be imported last */
-import "../themes/express.css";
+import "../index.css";
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

| CSS selector                            | Attribute or slot      | Status          |
| --------------------------------------- | ---------------------- | --------------- |
| `.spectrum-InfieldButton`               | Base element           | Implemented     |
| `.spectrum-InfieldButton--quiet`        | `quiet` attribute      | Implemented     |
| `.spectrum-InfieldButton-fill`          | Fill container         | Implemented     |
| `.spectrum-InfieldButton-icon`          | Icon slot              | Implemented     |
| `.spectrum-InfieldButton-inline`        | Inline group container | Missing from WC |
| `.spectrum-InfieldButton--sizeL`        | `size="l"`             | Implemented     |
| `.spectrum-InfieldButton--sizeS`        | `size="s"`             | Implemented     |
| `.spectrum-InfieldButton--sizeXL`       | `size="xl"`            | Implemented     |
| `.spectrum-InfieldButton:disabled`      | `disabled` attribute   | Implemented     |
| `.spectrum-InfieldButton:focus-visible` | Focus state            | Implemented     |
| `.spectrum-InfieldButton:hover`         | Hover state            | Implemented     |
| `.spectrum-InfieldButton:active`        | Active state           | Implemented     |

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
