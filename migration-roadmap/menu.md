# Menu migration roadmap

## Component specifications

### CSS

<details>
<summary>CSS selectors</summary>

- `.spectrum-Menu`
- `.spectrum-Menu .spectrum-Menu-backIcon`
- `.spectrum-Menu .spectrum-Menu-checkmark`
- `.spectrum-Menu .spectrum-Menu-chevron`
- `.spectrum-Menu .spectrum-Menu-chevron:dir(rtl)`
- `.spectrum-Menu .spectrum-Menu-divider`
- `.spectrum-Menu .spectrum-Menu-divider.spectrum-Divider--sizeS`
- `.spectrum-Menu .spectrum-Menu-item`
- `.spectrum-Menu .spectrum-Menu-item--collapsible.is-open.is-focused`
- `.spectrum-Menu .spectrum-Menu-item--collapsible.is-open:active`
- `.spectrum-Menu .spectrum-Menu-item--collapsible.is-open:focus`
- `.spectrum-Menu .spectrum-Menu-item--collapsible.is-open:hover`
- `.spectrum-Menu .spectrum-Menu-item--drillIn.is-open`
- `.spectrum-Menu .spectrum-Menu-item:focus .spectrum-Menu-itemCheckbox`
- `.spectrum-Menu .spectrum-Menu-item:focus .spectrum-Menu-itemSwitch`
- `.spectrum-Menu .spectrum-Menu-item:hover .spectrum-Menu-itemCheckbox`
- `.spectrum-Menu .spectrum-Menu-item:hover .spectrum-Menu-itemSwitch`
- `.spectrum-Menu .spectrum-Menu-itemIcon`
- `.spectrum-Menu .spectrum-Menu-itemIcon--workflowIcon`
- `.spectrum-Menu .spectrum-Menu-itemIcon:not(.spectrum-Menu-chevron, .spectrum-Menu-checkmark, .spectrum-Menu-linkout)`
- `.spectrum-Menu .spectrum-Menu-linkout`
- `.spectrum-Menu li:not(.spectrum-Menu-item, .spectrum-Menu-divider)`
- `.spectrum-Menu-back`
- `.spectrum-Menu-back .spectrum-Menu-sectionHeading`
- `.spectrum-Menu-back:focus-visible`
- `.spectrum-Menu-backButton`
- `.spectrum-Menu-backButton:focus-visible`
- `.spectrum-Menu-backHeading`
- `.spectrum-Menu-item`
- `.spectrum-Menu-item .spectrum-Menu`
- `.spectrum-Menu-item .spectrum-Menu-item`
- `.spectrum-Menu-item .spectrum-Menu-item .spectrum-Menu-itemLabel`
- `.spectrum-Menu-item .spectrum-Menu-item .spectrum-Menu-itemValue`
- `.spectrum-Menu-item .spectrum-Menu-itemCheckbox`
- `.spectrum-Menu-item .spectrum-Menu-itemCheckbox .spectrum-Checkbox-box`
- `.spectrum-Menu-item .spectrum-Menu-itemSwitch`
- `.spectrum-Menu-item .spectrum-Menu-itemSwitch .spectrum-Switch-switch`
- `.spectrum-Menu-item--collapsible .spectrum-Menu`
- `.spectrum-Menu-item--collapsible .spectrum-Menu .spectrum-Menu-item`
- `.spectrum-Menu-item--collapsible .spectrum-Menu-chevron`
- `.spectrum-Menu-item--collapsible .spectrum-Menu-itemIcon`
- `.spectrum-Menu-item--collapsible .spectrum-Menu-sectionHeading`
- `.spectrum-Menu-item--collapsible .spectrum-Menu.is-open`
- `.spectrum-Menu-item--collapsible > .spectrum-Menu-itemIcon`
- `.spectrum-Menu-item--collapsible.is-open`
- `.spectrum-Menu-item--collapsible.is-open .spectrum-Menu-chevron`
- `.spectrum-Menu-item--collapsible.is-open.is-focused`
- `.spectrum-Menu-item--collapsible.is-open:active`
- `.spectrum-Menu-item--collapsible.is-open:focus`
- `.spectrum-Menu-item--collapsible.is-open:hover`
- `.spectrum-Menu-item--drillIn .spectrum-Menu-chevron`
- `.spectrum-Menu-item--drillIn.is-focused .spectrum-Menu-chevron`
- `.spectrum-Menu-item--drillIn.is-open`
- `.spectrum-Menu-item--drillIn.is-open .spectrum-Menu-checkmark`
- `.spectrum-Menu-item--drillIn.is-open .spectrum-Menu-chevron`
- `.spectrum-Menu-item--drillIn.is-open .spectrum-Menu-itemIcon:not(.spectrum-Menu-chevron, .spectrum-Menu-checkmark)`
- `.spectrum-Menu-item--drillIn:active .spectrum-Menu-chevron`
- `.spectrum-Menu-item--drillIn:focus .spectrum-Menu-chevron`
- `.spectrum-Menu-item--drillIn:hover .spectrum-Menu-chevron`
- `.spectrum-Menu-item.is-focus-visible`
- `.spectrum-Menu-item.is-focus-visible .spectrum-Menu-linkout`
- `.spectrum-Menu-item.is-focus-visible > .spectrum-Menu-checkmark`
- `.spectrum-Menu-item.is-focus-visible > .spectrum-Menu-chevron`
- `.spectrum-Menu-item.is-focus-visible > .spectrum-Menu-itemDescription`
- `.spectrum-Menu-item.is-focus-visible > .spectrum-Menu-itemIcon:not(.spectrum-Menu-chevron, .spectrum-Menu-checkmark)`
- `.spectrum-Menu-item.is-focus-visible > .spectrum-Menu-itemLabel`
- `.spectrum-Menu-item.is-focus-visible > .spectrum-Menu-itemValue`
- `.spectrum-Menu-item.is-focus-visible > .spectrum-Menu-sectionHeading`
- `.spectrum-Menu-item:active`
- `.spectrum-Menu-item:active .spectrum-Menu-linkout`
- `.spectrum-Menu-item:active > .spectrum-Menu-checkmark`
- `.spectrum-Menu-item:active > .spectrum-Menu-chevron`
- `.spectrum-Menu-item:active > .spectrum-Menu-itemDescription`
- `.spectrum-Menu-item:active > .spectrum-Menu-itemIcon:not(.spectrum-Menu-chevron, .spectrum-Menu-checkmark)`
- `.spectrum-Menu-item:active > .spectrum-Menu-itemLabel`
- `.spectrum-Menu-item:active > .spectrum-Menu-itemValue`
- `.spectrum-Menu-item:active > .spectrum-Menu-sectionHeading`
- `.spectrum-Menu-item:focus-visible`
- `.spectrum-Menu-item:focus-visible .spectrum-Menu-linkout`
- `.spectrum-Menu-item:focus-visible > .spectrum-Menu-checkmark`
- `.spectrum-Menu-item:focus-visible > .spectrum-Menu-chevron`
- `.spectrum-Menu-item:focus-visible > .spectrum-Menu-itemDescription`
- `.spectrum-Menu-item:focus-visible > .spectrum-Menu-itemIcon:not(.spectrum-Menu-chevron, .spectrum-Menu-checkmark)`
- `.spectrum-Menu-item:focus-visible > .spectrum-Menu-itemLabel`
- `.spectrum-Menu-item:focus-visible > .spectrum-Menu-itemValue`
- `.spectrum-Menu-item:focus-visible > .spectrum-Menu-sectionHeading`
- `.spectrum-Menu-item:has(> .spectrum-Menu-itemThumbnail):has(> .spectrum-Menu-itemDescription) .spectrum-Menu-itemThumbnail`
- `.spectrum-Menu-item:has(> .spectrum-Menu-itemThumbnail):not(:has(.spectrum-Menu-itemSwitch)) > .spectrum-Menu-checkmark`
- `.spectrum-Menu-item:has(> .spectrum-Menu-itemThumbnail):not(:has(.spectrum-Menu-itemSwitch)) > .spectrum-Menu-itemActions`
- `.spectrum-Menu-item:has(> .spectrum-Menu-itemThumbnail):not(:has(.spectrum-Menu-itemSwitch)) > .spectrum-Menu-itemCheckbox`
- `.spectrum-Menu-item:has(> .spectrum-Menu-itemThumbnail):not(:has(.spectrum-Menu-itemSwitch)) > .spectrum-Menu-itemLabel`
- `.spectrum-Menu-item:has(> .spectrum-Menu-itemThumbnail):not(:has(.spectrum-Menu-itemSwitch)) > .spectrum-Menu-itemValue`
- `.spectrum-Menu-item:has(> .spectrum-Menu-itemThumbnail):not(:has(.spectrum-Menu-itemSwitch)):has(> .spectrum-Menu-itemDescription) > .spectrum-Menu-checkmark`
- `.spectrum-Menu-item:has(> .spectrum-Menu-itemThumbnail):not(:has(.spectrum-Menu-itemSwitch)):has(> .spectrum-Menu-itemDescription) > .spectrum-Menu-itemCheckbox`
- `.spectrum-Menu-item:has(> .spectrum-Menu-itemThumbnail):not(:has(.spectrum-Menu-itemSwitch)):has(> .spectrum-Menu-itemDescription) > .spectrum-Menu-itemDescription`
- `.spectrum-Menu-item:hover`
- `.spectrum-Menu-item:hover .spectrum-Menu-linkout`
- `.spectrum-Menu-item:hover > .spectrum-Menu-checkmark`
- `.spectrum-Menu-item:hover > .spectrum-Menu-chevron`
- `.spectrum-Menu-item:hover > .spectrum-Menu-itemDescription`
- `.spectrum-Menu-item:hover > .spectrum-Menu-itemIcon:not(.spectrum-Menu-chevron, .spectrum-Menu-checkmark)`
- `.spectrum-Menu-item:hover > .spectrum-Menu-itemLabel`
- `.spectrum-Menu-item:hover > .spectrum-Menu-itemValue`
- `.spectrum-Menu-item:hover > .spectrum-Menu-sectionHeading`
- `.spectrum-Menu-item:is(.is-disabled, [aria-disabled="true"]) .spectrum-Menu-itemDescription`
- `.spectrum-Menu-item:is(.is-disabled, [aria-disabled="true"]) .spectrum-Menu-itemIcon`
- `.spectrum-Menu-item:is(.is-disabled, [aria-disabled="true"]) .spectrum-Menu-itemLabel`
- `.spectrum-Menu-item:is(.is-disabled, [aria-disabled="true"]) .spectrum-Menu-itemThumbnail`
- `.spectrum-Menu-item:is(.is-disabled, [aria-disabled="true"]) .spectrum-Menu-itemValue`
- `.spectrum-Menu-item:is(.is-disabled, [aria-disabled="true"]) .spectrum-Menu-sectionHeading`
- `.spectrum-Menu-item:is(.is-disabled, [aria-disabled="true"]):hover`
- `.spectrum-Menu-item:is(.is-disabled, [aria-disabled="true"]):hover .spectrum-Menu-itemDescription`
- `.spectrum-Menu-item:is(.is-disabled, [aria-disabled="true"]):hover .spectrum-Menu-itemIcon`
- `.spectrum-Menu-item:is(.is-disabled, [aria-disabled="true"]):hover .spectrum-Menu-itemLabel`
- `.spectrum-Menu-item:is(.is-disabled, [aria-disabled="true"]):hover .spectrum-Menu-itemValue`
- `.spectrum-Menu-item:is(.is-disabled, [aria-disabled="true"]):hover .spectrum-Menu-sectionHeading`
- `.spectrum-Menu-itemActions`
- `.spectrum-Menu-itemDescription`
- `.spectrum-Menu-itemLabel`
- `.spectrum-Menu-itemLabel--truncate`
- `.spectrum-Menu-itemSelection`
- `.spectrum-Menu-itemThumbnail`
- `.spectrum-Menu-itemValue`
- `.spectrum-Menu-sectionDescription`
- `.spectrum-Menu-sectionHeading`
- `.spectrum-Menu.is-selectable .spectrum-Menu-item`
- `.spectrum-Menu.is-selectable .spectrum-Menu-item:where(.is-selected, [aria-selected="true"])`
- `.spectrum-Menu.is-selectableMultiple .spectrum-Menu-item`
- `.spectrum-Menu.is-selectableMultiple:not(:has(.is-selectable)) .spectrum-Menu-itemCheckbox`
- `.spectrum-Menu.spectrum-Menu--sizeL`
- `.spectrum-Menu.spectrum-Menu--sizeS`
- `.spectrum-Menu.spectrum-Menu--sizeXL`
- `.spectrum-Menu:lang(ja)`
- `.spectrum-Menu:lang(ko)`
- `.spectrum-Menu:lang(zh)`

</details>

<details>
<summary>Passthroughs</summary>

- `--mod-checkbox-text-to-control`
- `--mod-checkbox-top-to-text`
- `--mod-switch-control-label-spacing`
- `--mod-switch-spacing-top-to-label`

</details>

<details>
<summary>Modifiers</summary>

- `--mod-menu-back-heading-color`
- `--mod-menu-back-icon-color-default`
- `--mod-menu-back-icon-margin-block`
- `--mod-menu-back-icon-margin-inline`
- `--mod-menu-back-padding-block-end`
- `--mod-menu-back-padding-block-start`
- `--mod-menu-back-padding-inline-end`
- `--mod-menu-back-padding-inline-start`
- `--mod-menu-checkmark-display`
- `--mod-menu-checkmark-icon-color-default`
- `--mod-menu-checkmark-icon-color-down`
- `--mod-menu-checkmark-icon-color-focus`
- `--mod-menu-checkmark-icon-color-hover`
- `--mod-menu-collapsible-icon-color`
- `--mod-menu-drillin-icon-color-default`
- `--mod-menu-drillin-icon-color-down`
- `--mod-menu-drillin-icon-color-focus`
- `--mod-menu-drillin-icon-color-hover`
- `--mod-menu-inline-size`
- `--mod-menu-item-background-color-default`
- `--mod-menu-item-background-color-down`
- `--mod-menu-item-background-color-hover`
- `--mod-menu-item-background-color-key-focus`
- `--mod-menu-item-bottom-edge-to-text`
- `--mod-menu-item-checkmark-height`
- `--mod-menu-item-checkmark-width`
- `--mod-menu-item-collapsible-no-icon-submenu-item-padding-x-start`
- `--mod-menu-item-corner-radius`
- `--mod-menu-item-description-color-default`
- `--mod-menu-item-description-color-disabled`
- `--mod-menu-item-description-color-down`
- `--mod-menu-item-description-color-focus`
- `--mod-menu-item-description-color-hover`
- `--mod-menu-item-description-font-size`
- `--mod-menu-item-description-line-height`
- `--mod-menu-item-description-line-height-cjk`
- `--mod-menu-item-focus-indicator-color`
- `--mod-menu-item-focus-indicator-width`
- `--mod-menu-item-icon-height`
- `--mod-menu-item-icon-width`
- `--mod-menu-item-label-content-color-default`
- `--mod-menu-item-label-content-color-disabled`
- `--mod-menu-item-label-content-color-down`
- `--mod-menu-item-label-content-color-focus`
- `--mod-menu-item-label-content-color-hover`
- `--mod-menu-item-label-font-size`
- `--mod-menu-item-label-icon-color-default`
- `--mod-menu-item-label-icon-color-disabled`
- `--mod-menu-item-label-icon-color-down`
- `--mod-menu-item-label-icon-color-focus`
- `--mod-menu-item-label-icon-color-hover`
- `--mod-menu-item-label-inline-edge-to-content`
- `--mod-menu-item-label-line-height`
- `--mod-menu-item-label-line-height-cjk`
- `--mod-menu-item-label-text-to-visual`
- `--mod-menu-item-label-to-description-spacing`
- `--mod-menu-item-label-to-value-area-min-spacing`
- `--mod-menu-item-linkout-icon-height`
- `--mod-menu-item-linkout-icon-width`
- `--mod-menu-item-min-height`
- `--mod-menu-item-selectable-edge-to-text-not-selected`
- `--mod-menu-item-text-to-control`
- `--mod-menu-item-thumbnail-height`
- `--mod-menu-item-thumbnail-opacity-disabled`
- `--mod-menu-item-thumbnail-to-label`
- `--mod-menu-item-thumbnail-width`
- `--mod-menu-item-top-edge-to-text`
- `--mod-menu-item-top-to-action`
- `--mod-menu-item-top-to-checkbox`
- `--mod-menu-item-top-to-checkmark`
- `--mod-menu-item-top-to-thumbnail`
- `--mod-menu-item-top-to-workflow-icon`
- `--mod-menu-item-value-color-default`
- `--mod-menu-item-value-color-down`
- `--mod-menu-item-value-color-focus`
- `--mod-menu-item-value-color-hover`
- `--mod-menu-section-description-color`
- `--mod-menu-section-description-font-size`
- `--mod-menu-section-description-font-weight`
- `--mod-menu-section-description-line-height`
- `--mod-menu-section-description-line-height-cjk`
- `--mod-menu-section-divider-margin-block`
- `--mod-menu-section-header-bottom-edge-to-text`
- `--mod-menu-section-header-color`
- `--mod-menu-section-header-font-size`
- `--mod-menu-section-header-font-weight`
- `--mod-menu-section-header-line-height`
- `--mod-menu-section-header-line-height-cjk`
- `--mod-menu-section-header-min-width`
- `--mod-menu-section-header-to-description`
- `--mod-menu-section-header-top-edge-to-text`

</details>

### SWC

<details>
<summary>Attributes</summary>

- `label` - Label of the menu
- `ignore` - Whether menu should be ignored by roving tabindex controller
- `selects` - inherit
- `selects` - single
- `selects` - multiple
- `value` - Value of the selected item(s)
- `value-separator` - Separator for multiple values (default: ",")
- `size` (inherited from SizedMixin)

</details>

<details>
<summary>Slots</summary>

- Default slot - menu items to be listed in the menu

</details>

## Comparison

### DOM structure changes

<details>
<summary>Spectrum Web Components:</summary>

```html
<sp-menu>
    <slot
        @sp-menu-submenu-opened="${this.handleDescendentOverlayOpened}"
        @sp-menu-submenu-closed="${this.handleDescendentOverlayClosed}"
        @slotchange="${this.handleSlotchange}"
    ></slot>
</sp-menu>
```

</details>

<details>
<summary>Legacy (CSS main branch):</summary>

```html
<ul
    class="spectrum-Menu spectrum-Menu--size... is-selectable? is-selectableMultiple? is-open?"
    id="menu-..."
    role="menu"
    aria-labelledby="menu-label-..."
    aria-disabled="false"
>
    <!-- For regular menu items: -->
    <li
        class="spectrum-Menu-item is-highlighted? is-active? is-focus-visible? is-selected? is-disabled? is-hover? spectrum-Menu-item--drillIn? spectrum-Menu-item--collapsible? is-open?"
        id="menuitem-..."
        role="menuitem"
        aria-selected="..."
        aria-disabled="..."
        tabindex="..."
    >
        <!-- For collapsible/single selection: -->
        <svg
            class="spectrum-Menu-itemIcon spectrum-Menu-chevron|spectrum-Menu-checkmark"
        >
            ...
        </svg>

        <!-- For multiple selection: -->
        <label class="spectrum-Checkbox spectrum-Menu-itemCheckbox">
            <input type="checkbox" class="spectrum-Checkbox-input" />
            <span class="spectrum-Checkbox-box">
                <svg class="spectrum-Icon">...</svg>
            </span>
        </label>

        <!-- For icons: -->
        <svg
            class="spectrum-Menu-itemIcon spectrum-Menu-itemIcon--workflowIcon"
        >
            ...
        </svg>

        <!-- Label: -->
        <span
            class="spectrum-Menu-itemLabel|spectrum-Menu-sectionHeading spectrum-Switch-label? spectrum-Menu-itemLabel--truncate?"
        >
            Label text
        </span>

        <!-- Description: -->
        <span class="spectrum-Menu-itemDescription">Description text</span>

        <!-- Value: -->
        <span class="spectrum-Menu-itemValue">Value text</span>

        <!-- For actions with switches: -->
        <div class="spectrum-Menu-itemActions">
            <label class="spectrum-Switch spectrum-Menu-itemSwitch">
                <input type="checkbox" class="spectrum-Switch-input" />
                <span class="spectrum-Switch-switch">
                    <span class="spectrum-Switch-handle"></span>
                </span>
            </label>
        </div>

        <!-- For drill-in: -->
        <svg class="spectrum-Menu-itemIcon spectrum-Menu-chevron">...</svg>

        <!-- For nested/collapsible menu: -->
        <ul class="spectrum-Menu">
            ...
        </ul>
    </li>

    <!-- For dividers: -->
    <li>
        <hr
            class="spectrum-Divider spectrum-Divider--sizeS spectrum-Menu-divider"
        />
    </li>

    <!-- For menu groups: -->
    <li id="menugroup-..." role="presentation">
        <!-- Regular group: -->
        <span
            class="spectrum-Menu-sectionHeading spectrum-Menu-itemLabel--truncate?"
            id="..."
            aria-hidden="true"
        >
            Heading text
        </span>

        <!-- Tray submenu (back button): -->
        <div class="spectrum-Menu-back">
            <button
                aria-label="Back to previous menu"
                class="spectrum-Menu-backButton"
                type="button"
                role="menuitem"
            >
                <svg class="spectrum-Menu-backIcon">...</svg>
            </button>
            <span
                class="spectrum-Menu-sectionHeading spectrum-Menu-itemLabel--truncate?"
                id="..."
                aria-hidden="true"
            >
                Heading text
            </span>
        </div>

        <!-- Nested menu for group: -->
        <ul class="spectrum-Menu" role="group" aria-labelledby="...">
            ...
        </ul>
    </li>
</ul>
```

</details>

<details>
<summary>Spectrum 2 (CSS spectrum-two branch):</summary>

```html
<ul
    class="spectrum-Menu spectrum-Menu--size... is-selectable? is-selectableMultiple? is-open?"
    id="menu-..."
    role="menu"
    aria-labelledby="menu-label-..."
    aria-disabled="false"
>
    <!-- For regular menu items: -->
    <li
        class="spectrum-Menu-item is-highlighted? is-active? is-focus-visible? is-selected? is-disabled? is-hover? spectrum-Menu-item--drillIn? spectrum-Menu-item--collapsible? is-open?"
        id="menuitem-..."
        role="menuitem"
        aria-selected="..."
        aria-disabled="..."
        tabindex="..."
    >
        <!-- For collapsible/single selection: -->
        <svg
            class="spectrum-Menu-itemIcon spectrum-Menu-chevron|spectrum-Menu-checkmark"
        >
            ...
        </svg>

        <!-- For multiple selection: -->
        <label class="spectrum-Checkbox spectrum-Menu-itemCheckbox">
            <input type="checkbox" class="spectrum-Checkbox-input" />
            <span class="spectrum-Checkbox-box">
                <svg class="spectrum-Icon">...</svg>
            </span>
        </label>

        <!-- For icons: -->
        <svg
            class="spectrum-Menu-itemIcon spectrum-Menu-itemIcon--workflowIcon"
        >
            ...
        </svg>

        <!-- Label: -->
        <span
            class="spectrum-Menu-itemLabel|spectrum-Menu-sectionHeading spectrum-Switch-label? spectrum-Menu-itemLabel--truncate?"
        >
            Label text
        </span>

        <!-- Description: -->
        <span class="spectrum-Menu-itemDescription">Description text</span>

        <!-- Value: -->
        <span class="spectrum-Menu-itemValue">Value text</span>

        <!-- For actions with switches: -->
        <div class="spectrum-Menu-itemActions">
            <label class="spectrum-Switch spectrum-Menu-itemSwitch">
                <input type="checkbox" class="spectrum-Switch-input" />
                <span class="spectrum-Switch-switch">
                    <span class="spectrum-Switch-handle"></span>
                </span>
            </label>
        </div>

        <!-- For drill-in: -->
        <svg class="spectrum-Menu-itemIcon spectrum-Menu-chevron">...</svg>

        <!-- For nested/collapsible menu: -->
        <ul class="spectrum-Menu">
            ...
        </ul>
    </li>

    <!-- For dividers: -->
    <li>
        <hr
            class="spectrum-Divider spectrum-Divider--sizeS spectrum-Menu-divider"
        />
    </li>

    <!-- For menu groups: -->
    <li id="menugroup-..." role="presentation">
        <!-- Regular group: -->
        <span
            class="spectrum-Menu-sectionHeading spectrum-Menu-itemLabel--truncate?"
            id="..."
            aria-hidden="true"
        >
            Heading text
        </span>

        <!-- Tray submenu (back button): -->
        <div class="spectrum-Menu-back">
            <button
                aria-label="Back to previous menu"
                class="spectrum-Menu-backButton"
                type="button"
                role="menuitem"
            >
                <svg class="spectrum-Menu-backIcon">...</svg>
            </button>
            <span
                class="spectrum-Menu-sectionHeading spectrum-Menu-itemLabel--truncate?"
                id="..."
                aria-hidden="true"
            >
                Heading text
            </span>
        </div>

        <!-- Nested menu for group: -->
        <ul class="spectrum-Menu" role="group" aria-labelledby="...">
            ...
        </ul>
    </li>
</ul>
```

</details>

<details>
<summary>Diff: Legacy (CSS main) → Spectrum 2 (CSS spectrum-two)</summary>

```diff
--- a/components/menu/stories/template.js (main branch)
+++ b/components/menu/stories/template.js (spectrum-two branch)
@@ -15,29 +15,12 @@
 import "../index.css";
-import "../themes/spectrum.css";
-/* Must be imported last */
-import "../themes/express.css";

-/**
- * Get the tray submenu back arrow name with scale number (defined in design spec).
- */
-const iconWithScale = (size = "m", iconName = "ArrowLeft") => {
-	switch (size) {
-		case "s":
-			return `${iconName}200`;
-		case "l":
-			return `${iconName}400`;
-		case "xl":
-			return `${iconName}500`;
-		default:
-			return `${iconName}300`;
-	}
-};

 		${when(isCollapsible || (selectionMode == "single" && isSelected), () =>
 			Icon(
 				{
-					iconName: iconWithScale(
-						size,
-						isCollapsible ? "ChevronRight" : "Checkmark",
-					),
+					iconName: isCollapsible ? "ChevronRight" : "Checkmark",
 					setName: "ui",
 					useRef: false,
 					size,
@@ -199,7 +177,6 @@
 		${when(isDrillIn, () =>
 			Icon(
 				{
-					iconName: iconWithScale(size, "ChevronRight"),
+					iconName: "ChevronRight",
 					setName: "ui",
 					useRef: false,
 					size,
@@ -270,7 +248,11 @@
 					>
 						${Icon(
 							{
-								iconName: iconWithScale(size),
+								iconName: "ArrowRight" + ({
+									s: "100",
+									m: "100",
+									l: "400",
+									xl: "400",
+								}[size] || "100"),
 								setName: "ui",
 								size,
 								customClasses: ["spectrum-Menu-backIcon"],
@@ -711,6 +693,7 @@
-export const SubmenuInPopover = (context) => Popover({
+export const SubmenuInPopover = (args, context) => Popover({
 	isOpen: true,
 	position: "end-top",
 	customStyles: {
@@ -721,8 +704,8 @@
 		...args,
 	}, context),
 	content: [
-		(args, context) => Template({
+		Template({
+			...args,
-		}, context),
-		(args, context) => Popover({
+		}, context),
+		Popover({
 			isOpen: true,
 			position: "end-top",
 			customStyles: {
@@ -731,7 +714,7 @@
 			},
 			content: [
-				(args, context) => Template({
+				Template({
+					...args,
```

**Key changes:**

1. **Theme imports removed**: The spectrum.css and express.css theme imports were removed
2. **Icon sizing simplified**: The `iconWithScale()` helper function was removed
3. **Direct icon names**: Chevron and Checkmark icons now use direct names without size scaling
4. **Back arrow icon**: Uses explicit size mapping: `ArrowRight` + size suffix (100, 400) instead of scaled names
5. **Function signature update**: `SubmenuInPopover` function parameters simplified

</details>

### CSS => SWC mapping

| CSS selector                                                                | Attribute or slot                        | Status           |
| --------------------------------------------------------------------------- | ---------------------------------------- | ---------------- |
| `.spectrum-Menu`                                                            | N/A (root element)                       | Implemented      |
| `.spectrum-Menu.spectrum-Menu--sizeS`                                       | `size="s"`                               | Implemented      |
| `.spectrum-Menu.spectrum-Menu--sizeL`                                       | `size="l"`                               | Implemented      |
| `.spectrum-Menu.spectrum-Menu--sizeXL`                                      | `size="xl"`                              | Implemented      |
| `.spectrum-Menu.is-selectable`                                              | `selects="single"`                       | Implemented      |
| `.spectrum-Menu.is-selectableMultiple`                                      | `selects="multiple"`                     | Implemented      |
| `.spectrum-Menu.is-open`                                                    | Internal state                           | Implemented      |
| `.spectrum-Menu:lang(ja), .spectrum-Menu:lang(ko), .spectrum-Menu:lang(zh)` | Language-specific styling                | Implemented      |
| `.spectrum-Menu-item`                                                       | Created via `<sp-menu-item>`             | Implemented      |
| `.spectrum-Menu-item:where(.is-selected, [aria-selected="true"])`           | `selected` attribute on menu item        | Implemented      |
| `.spectrum-Menu-item:is(.is-disabled, [aria-disabled="true"])`              | `disabled` attribute on menu item        | Implemented      |
| `.spectrum-Menu-item.is-focus-visible`                                      | `focused` attribute on menu item         | Implemented      |
| `.spectrum-Menu-item:active`                                                | `active` attribute on menu item          | Implemented      |
| `.spectrum-Menu-item:hover`                                                 | Hover state styling                      | Implemented      |
| `.spectrum-Menu-item--drillIn`                                              | Menu item with submenu                   | Implemented      |
| `.spectrum-Menu-item--collapsible`                                          | Collapsible menu item                    | Implemented      |
| `.spectrum-Menu-itemLabel`                                                  | Default slot content in `<sp-menu-item>` | Implemented      |
| `.spectrum-Menu-itemLabel--truncate`                                        | Text truncation                          | Missing from WC  |
| `.spectrum-Menu-itemDescription`                                            | `description` slot in `<sp-menu-item>`   | Implemented      |
| `.spectrum-Menu-itemValue`                                                  | `value` slot in `<sp-menu-item>`         | Implemented      |
| `.spectrum-Menu-itemIcon`                                                   | `icon` slot in `<sp-menu-item>`          | Implemented      |
| `.spectrum-Menu-itemIcon--workflowIcon`                                     | Icon type variant                        | Missing from WC  |
| `.spectrum-Menu-checkmark`                                                  | Rendered for selected items              | Implemented      |
| `.spectrum-Menu-chevron`                                                    | Rendered for drill-in/collapsible items  | Implemented      |
| `.spectrum-Menu-itemCheckbox`                                               | Rendered for multiple selection          | Implemented      |
| `.spectrum-Menu-itemSwitch`                                                 | Rendered for action items with switches  | Implemented      |
| `.spectrum-Menu-itemActions`                                                | Container for action controls            | Implemented      |
| `.spectrum-Menu-linkout`                                                    | Linkout icon for external links          | Missing from WC  |
| `.spectrum-Menu-itemThumbnail`                                              | Thumbnail image for menu items           | Missing from WC  |
| `.spectrum-Menu-divider`                                                    | Menu divider                             | Implemented      |
| `.spectrum-Menu-sectionHeading`                                             | Menu group heading                       | Implemented      |
| `.spectrum-Menu-sectionDescription`                                         | Menu section description                 | Missing from WC  |
| `.spectrum-Menu-back`                                                       | Back button for tray submenu             | Implemented      |
| `.spectrum-Menu-backButton`                                                 | Back button element                      | Implemented      |
| `.spectrum-Menu-backIcon`                                                   | Back button icon                         | Implemented      |
| `.spectrum-Menu-backHeading`                                                | Back button heading                      | Missing from WC  |
| N/A                                                                         | `label` attribute                        | Missing from CSS |
| N/A                                                                         | `ignore` attribute                       | Missing from CSS |
| N/A                                                                         | `value` attribute                        | Missing from CSS |
| N/A                                                                         | `value-separator` attribute              | Missing from CSS |
| N/A                                                                         | Default slot                             | Missing from CSS |

## Summary of changes

### CSS => SWC implementation gaps

**Missing from WC:**

- `.spectrum-Menu-itemLabel--truncate` - Text truncation styling for menu item labels
- `.spectrum-Menu-itemIcon--workflowIcon` - Specific variant for workflow icons
- `.spectrum-Menu-linkout` - Linkout icon for external links (new in Spectrum 2)
- `.spectrum-Menu-itemThumbnail` - Thumbnail image support for menu items (new in Spectrum 2)
- `.spectrum-Menu-sectionDescription` - Description text for menu sections (new in Spectrum 2)
- `.spectrum-Menu-backHeading` - Heading element for back button in tray submenus

**Missing from CSS:**

- `label` attribute - Accessible label for the menu
- `ignore` attribute - Control for roving tabindex behavior
- `value` attribute - Selected value(s) management
- `value-separator` attribute - Separator for multiple selected values
- Default slot - Content insertion mechanism

The web component provides a more abstract API with properties like `label`, `ignore`, `value`, and `value-separator` that manage behavior internally rather than requiring CSS classes. The CSS implementation focuses on visual styling while the WC handles state management and interaction logic.

### CSS Spectrum 2 changes

The primary changes between CSS main and spectrum-two branches relate to **icon sizing and theme management**:

**Icon sizing approach:**

**Main branch:**

- Uses `iconWithScale()` helper function that maps size to specific icon variants with scale numbers
- Example: size "s" → "ArrowLeft200", size "m" → "ArrowLeft300", size "l" → "ArrowLeft400"
- Applied consistently to chevron icons, checkmark icons, and back button icons

**Spectrum 2 branch:**

- Simplified to use direct icon names for most cases: "ChevronRight", "Checkmark"
- Back button icon uses explicit inline size mapping: `"ArrowRight" + size suffix`
- Size mapping: s/m → "100", l/xl → "400"
- Removes the helper function entirely

**Theme management:**

**Main branch:**

- Imports `../themes/spectrum.css` and `../themes/express.css`
- Supports multiple theme variants

**Spectrum 2 branch:**

- Theme imports removed
- Single unified theme approach

**Function signatures:**

**Main branch:**

- `SubmenuInPopover = (context) => ...`
- Content functions passed as `(args, context) => Template(...)`

**Spectrum 2 branch:**

- `SubmenuInPopover = (args, context) => ...`
- Content passed directly as `Template(...)`

**New features in Spectrum 2 CSS:**

The spectrum-two branch includes new CSS selectors and modifiers for features not present in the main branch:

- **Linkout icons** (`.spectrum-Menu-linkout`) for external link indicators
- **Thumbnails** (`.spectrum-Menu-itemThumbnail`) for menu items with image previews
- **Section descriptions** (`.spectrum-Menu-sectionDescription`) for additional section context
- **`:has()` selector logic** for complex layout relationships with thumbnails
- **`:is()` pseudo-class** replacing separate `.is-disabled` and `[aria-disabled="true"]` selectors
- **Updated modifiers** for corner radius, thumbnail sizing, and linkout icon dimensions

**Impact:** These changes make the Spectrum 2 implementation cleaner and more maintainable by:

1. Removing unnecessary abstraction (iconWithScale function)
2. Simplifying icon naming conventions
3. Consolidating theme management
4. Adding support for richer menu item content (thumbnails, linkouts, section descriptions)
5. Using modern CSS selectors (`:is()`, `:has()`) for more efficient styling

## Resources

- [CSS migration](https://github.com/adobe/spectrum-css/blob/spectrum-two/components/menu/dist/metadata.json)
- [Spectrum 2 preview](https://spectrumcss.z13.web.core.windows.net/pr-2352/index.html?path=/docs/components-menu--docs)
- [React](https://react-spectrum.adobe.com/Menu)
