# Menu Item migration roadmap

## Component specifications

### CSS

<details>
<summary>CSS selectors</summary>

- `.spectrum-Menu .spectrum-Menu-backIcon`
- `.spectrum-Menu .spectrum-Menu-checkmark`
- `.spectrum-Menu .spectrum-Menu-chevron`
- `.spectrum-Menu .spectrum-Menu-chevron:dir(rtl)`
- `.spectrum-Menu .spectrum-Menu-item`
- `.spectrum-Menu .spectrum-Menu-item--collapsible.is-open.is-focused`
- `.spectrum-Menu .spectrum-Menu-item--collapsible.is-open:active`
- `.spectrum-Menu .spectrum-Menu-item--collapsible.is-open:focus`
- `.spectrum-Menu .spectrum-Menu-item--collapsible.is-open:focus-within`
- `.spectrum-Menu .spectrum-Menu-item--collapsible.is-open:hover`
- `.spectrum-Menu .spectrum-Menu-item--drillIn.is-open`
- `.spectrum-Menu .spectrum-Menu-item:focus .spectrum-Menu-itemCheckbox`
- `.spectrum-Menu .spectrum-Menu-item:focus .spectrum-Menu-itemSwitch`
- `.spectrum-Menu .spectrum-Menu-item:hover .spectrum-Menu-itemCheckbox`
- `.spectrum-Menu .spectrum-Menu-item:hover .spectrum-Menu-itemSwitch`
- `.spectrum-Menu .spectrum-Menu-itemIcon`
- `.spectrum-Menu .spectrum-Menu-itemIcon--workflowIcon`
- `.spectrum-Menu .spectrum-Menu-itemIcon:not(.spectrum-Menu-chevron, .spectrum-Menu-checkmark)`
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
- `.spectrum-Menu-item.is-disabled`
- `.spectrum-Menu-item.is-disabled .spectrum-Menu-itemDescription`
- `.spectrum-Menu-item.is-disabled .spectrum-Menu-itemIcon`
- `.spectrum-Menu-item.is-disabled .spectrum-Menu-itemLabel`
- `.spectrum-Menu-item.is-disabled .spectrum-Menu-itemValue`
- `.spectrum-Menu-item.is-disabled .spectrum-Menu-sectionHeading`
- `.spectrum-Menu-item.is-disabled:hover`
- `.spectrum-Menu-item.is-disabled:hover .spectrum-Menu-itemDescription`
- `.spectrum-Menu-item.is-disabled:hover .spectrum-Menu-itemIcon`
- `.spectrum-Menu-item.is-disabled:hover .spectrum-Menu-itemLabel`
- `.spectrum-Menu-item.is-disabled:hover .spectrum-Menu-itemValue`
- `.spectrum-Menu-item.is-disabled:hover .spectrum-Menu-sectionHeading`
- `.spectrum-Menu-item.is-focused`
- `.spectrum-Menu-item.is-focused > .spectrum-Menu-checkmark`
- `.spectrum-Menu-item.is-focused > .spectrum-Menu-chevron`
- `.spectrum-Menu-item.is-focused > .spectrum-Menu-itemDescription`
- `.spectrum-Menu-item.is-focused > .spectrum-Menu-itemIcon:not(.spectrum-Menu-chevron, .spectrum-Menu-checkmark)`
- `.spectrum-Menu-item.is-focused > .spectrum-Menu-itemLabel`
- `.spectrum-Menu-item.is-focused > .spectrum-Menu-itemValue`
- `.spectrum-Menu-item.is-focused > .spectrum-Menu-sectionHeading`
- `.spectrum-Menu-item:active`
- `.spectrum-Menu-item:active > .spectrum-Menu-checkmark`
- `.spectrum-Menu-item:active > .spectrum-Menu-chevron`
- `.spectrum-Menu-item:active > .spectrum-Menu-itemDescription`
- `.spectrum-Menu-item:active > .spectrum-Menu-itemIcon:not(.spectrum-Menu-chevron, .spectrum-Menu-checkmark)`
- `.spectrum-Menu-item:active > .spectrum-Menu-itemLabel`
- `.spectrum-Menu-item:active > .spectrum-Menu-itemValue`
- `.spectrum-Menu-item:active > .spectrum-Menu-sectionHeading`
- `.spectrum-Menu-item:focus`
- `.spectrum-Menu-item:focus > .spectrum-Menu-checkmark`
- `.spectrum-Menu-item:focus > .spectrum-Menu-chevron`
- `.spectrum-Menu-item:focus > .spectrum-Menu-itemDescription`
- `.spectrum-Menu-item:focus > .spectrum-Menu-itemIcon:not(.spectrum-Menu-chevron, .spectrum-Menu-checkmark)`
- `.spectrum-Menu-item:focus > .spectrum-Menu-itemLabel`
- `.spectrum-Menu-item:focus > .spectrum-Menu-itemValue`
- `.spectrum-Menu-item:focus > .spectrum-Menu-sectionHeading`
- `.spectrum-Menu-item:focus-visible`
- `.spectrum-Menu-item:hover`
- `.spectrum-Menu-item:hover > .spectrum-Menu-checkmark`
- `.spectrum-Menu-item:hover > .spectrum-Menu-chevron`
- `.spectrum-Menu-item:hover > .spectrum-Menu-itemDescription`
- `.spectrum-Menu-item:hover > .spectrum-Menu-itemIcon:not(.spectrum-Menu-chevron, .spectrum-Menu-checkmark)`
- `.spectrum-Menu-item:hover > .spectrum-Menu-itemLabel`
- `.spectrum-Menu-item:hover > .spectrum-Menu-itemValue`
- `.spectrum-Menu-item:hover > .spectrum-Menu-sectionHeading`
- `.spectrum-Menu-itemActions`
- `.spectrum-Menu-itemDescription`
- `.spectrum-Menu-itemLabel`
- `.spectrum-Menu-itemLabel--truncate`
- `.spectrum-Menu-itemSelection`
- `.spectrum-Menu-itemValue`
- `.spectrum-Menu-item[aria-disabled="true"]`
- `.spectrum-Menu-item[aria-disabled="true"] .spectrum-Menu-itemDescription`
- `.spectrum-Menu-item[aria-disabled="true"] .spectrum-Menu-itemIcon`
- `.spectrum-Menu-item[aria-disabled="true"] .spectrum-Menu-itemLabel`
- `.spectrum-Menu-item[aria-disabled="true"] .spectrum-Menu-itemValue`
- `.spectrum-Menu-item[aria-disabled="true"] .spectrum-Menu-sectionHeading`
- `.spectrum-Menu-item[aria-disabled="true"]:hover`
- `.spectrum-Menu-item[aria-disabled="true"]:hover .spectrum-Menu-itemDescription`
- `.spectrum-Menu-item[aria-disabled="true"]:hover .spectrum-Menu-itemIcon`
- `.spectrum-Menu-item[aria-disabled="true"]:hover .spectrum-Menu-itemLabel`
- `.spectrum-Menu-item[aria-disabled="true"]:hover .spectrum-Menu-itemValue`
- `.spectrum-Menu-item[aria-disabled="true"]:hover .spectrum-Menu-sectionHeading`
- `.spectrum-Menu.is-selectable .spectrum-Menu-item`
- `.spectrum-Menu.is-selectable .spectrum-Menu-item.is-selected`
- `.spectrum-Menu.is-selectableMultiple .spectrum-Menu-item`
- `.spectrum-Menu.is-selectableMultiple .spectrum-Menu-itemCheckbox`

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
- `--mod-menu-item-min-height`
- `--mod-menu-item-selectable-edge-to-text-not-selected`
- `--mod-menu-item-text-to-control`
- `--mod-menu-item-top-edge-to-text`
- `--mod-menu-item-top-to-action`
- `--mod-menu-item-top-to-checkbox`
- `--mod-menu-item-top-to-checkmark`
- `--mod-menu-item-value-color-default`
- `--mod-menu-item-value-color-down`
- `--mod-menu-item-value-color-focus`
- `--mod-menu-item-value-color-hover`
- `--mod-menu-section-divider-margin-block`
- `--mod-menu-section-header-bottom-edge-to-text`
- `--mod-menu-section-header-color`
- `--mod-menu-section-header-font-size`
- `--mod-menu-section-header-font-weight`
- `--mod-menu-section-header-line-height`
- `--mod-menu-section-header-line-height-cjk`
- `--mod-menu-section-header-min-width`
- `--mod-menu-section-header-top-edge-to-text`

</details>

### SWC

<details>
<summary>Attributes</summary>

- `active` (boolean)
- `focused` (boolean)
- `selected` (boolean)
- `value` (string)
- `has-submenu` (boolean)
- `no-wrap` (boolean)
- `open` (boolean)
- `disabled` (boolean, inherited from Focusable)
- `href` (string, inherited from LikeAnchor)
- `download` (string, inherited from LikeAnchor)
- `label` (string, inherited from Focusable)
- `target` (string, inherited from LikeAnchor)
- `rel` (string, inherited from LikeAnchor)

</details>

<details>
<summary>Slots</summary>

- `icon` - icon element to be placed at the start of the Menu Item
- `description` - description to be placed below the label of the Menu Item
- `value` - content placed at the end of the Menu Item like values, keyboard shortcuts, etc.
- `submenu` - content placed in a submenu
- Default slot - text content to display within the Menu Item

</details>

## Comparison

### DOM Structure changes

<details>
<summary>Spectrum Web Components:</summary>

```html
<sp-menu-item>
    <sp-icon-checkmark100
        id="selected"
        class="spectrum-UIIcon-Checkmark100 icon checkmark"
    ></sp-icon-checkmark100>
    <slot name="icon"></slot>
    <div id="label">
        <slot id="slot"></slot>
    </div>
    <slot name="description"></slot>
    <slot name="value"></slot>
    <a
        id="button"
        aria-hidden="true"
        class="button anchor hidden"
        href="..."
    ></a>
    <sp-overlay>
        <sp-popover>
            <slot name="submenu"></slot>
        </sp-popover>
    </sp-overlay>
    <sp-icon-chevron100
        class="spectrum-UIIcon-ChevronRight100 chevron icon"
    ></sp-icon-chevron100>
</sp-menu-item>
```

</details>

<details>
<summary>Legacy (CSS main branch):</summary>

```html
<li
    class="spectrum-Menu-item"
    role="menuitem"
    aria-selected="false"
    aria-disabled="false"
    tabindex="0"
>
    <!-- Checkmark icon (when single selection & selected) -->
    <svg class="spectrum-Menu-itemIcon spectrum-Menu-checkmark">...</svg>

    <!-- Checkbox (when multiple selection) -->
    <div class="spectrum-Checkbox spectrum-Menu-itemCheckbox">...</div>

    <!-- Workflow icon (optional) -->
    <svg class="spectrum-Menu-itemIcon spectrum-Menu-itemIcon--workflowIcon">
        ...
    </svg>

    <!-- Label (collapsible uses sectionHeading, regular uses itemLabel) -->
    <span class="spectrum-Menu-itemLabel">Label text</span>

    <!-- Description (optional) -->
    <span class="spectrum-Menu-itemDescription">Description text</span>

    <!-- Value (optional) -->
    <span class="spectrum-Menu-itemValue">Value text</span>

    <!-- Actions with Switch (when multiple selection with actions) -->
    <div class="spectrum-Menu-itemActions">
        <div class="spectrum-Switch spectrum-Menu-itemSwitch">...</div>
    </div>

    <!-- Chevron for drill-in (optional) -->
    <svg class="spectrum-Menu-itemIcon spectrum-Menu-chevron">...</svg>

    <!-- Nested menu for collapsible (optional) -->
    <ul class="spectrum-Menu is-open">
        ...
    </ul>
</li>
```

</details>

<details>
<summary>Spectrum 2 (CSS spectrum-two branch):</summary>

```html
<li
    class="spectrum-Menu-item"
    role="menuitem"
    aria-selected="false"
    aria-disabled="false"
    tabindex="0"
>
    <!-- Checkmark icon (when single selection & selected) -->
    <svg class="spectrum-Menu-itemIcon spectrum-Menu-checkmark">...</svg>

    <!-- Checkbox (when multiple selection) -->
    <div class="spectrum-Checkbox spectrum-Menu-itemCheckbox">...</div>

    <!-- Workflow icon (optional) -->
    <svg class="spectrum-Menu-itemIcon spectrum-Menu-itemIcon--workflowIcon">
        ...
    </svg>

    <!-- Label (collapsible uses sectionHeading, regular uses itemLabel) -->
    <span class="spectrum-Menu-itemLabel">Label text</span>

    <!-- Description (optional) -->
    <span class="spectrum-Menu-itemDescription">Description text</span>

    <!-- Value (optional) -->
    <span class="spectrum-Menu-itemValue">Value text</span>

    <!-- Actions with Switch (when multiple selection with actions) -->
    <div class="spectrum-Menu-itemActions">
        <div class="spectrum-Switch spectrum-Menu-itemSwitch">...</div>
    </div>

    <!-- Chevron for drill-in (optional) -->
    <svg class="spectrum-Menu-itemIcon spectrum-Menu-chevron">...</svg>

    <!-- Nested menu for collapsible (optional) -->
    <ul class="spectrum-Menu is-open">
        ...
    </ul>
</li>
```

</details>

### CSS => SWC mapping

| CSS selector                                                                | Attribute or slot                                   | Status          |
| --------------------------------------------------------------------------- | --------------------------------------------------- | --------------- |
| `.spectrum-Menu-item--collapsible`                                          | Collapsible variant (submenu slot with nested menu) | Implemented     |
| `.spectrum-Menu-item--drillIn`                                              | Drill-in variant (submenu slot with chevron)        | Implemented     |
| `.spectrum-Menu-item.is-disabled`                                           | `disabled` attribute                                | Implemented     |
| `.spectrum-Menu-item.is-focused`                                            | `focused` attribute                                 | Implemented     |
| `.spectrum-Menu-item.is-selected`                                           | `selected` attribute                                | Implemented     |
| `.spectrum-Menu-item.is-active`                                             | `active` attribute                                  | Implemented     |
| `.spectrum-Menu-item:hover`                                                 | Hover state styling                                 | Implemented     |
| `.spectrum-Menu-item:focus`                                                 | Focus state styling                                 | Implemented     |
| `.spectrum-Menu-item:active`                                                | Active/down state styling                           | Implemented     |
| `.spectrum-Menu-item.is-open`                                               | `open` attribute (for submenu items)                | Implemented     |
| `.spectrum-Menu-itemIcon`                                                   | `icon` slot                                         | Implemented     |
| `.spectrum-Menu-itemLabel`                                                  | Default slot                                        | Implemented     |
| `.spectrum-Menu-itemLabel--truncate`                                        | `no-wrap` attribute                                 | Implemented     |
| `.spectrum-Menu-itemDescription`                                            | `description` slot                                  | Implemented     |
| `.spectrum-Menu-itemValue`                                                  | `value` slot                                        | Implemented     |
| `.spectrum-Menu-checkmark`                                                  | Checkmark icon (rendered when selected)             | Implemented     |
| `.spectrum-Menu-chevron`                                                    | Chevron icon (rendered for drill-in/submenu)        | Implemented     |
| `.spectrum-Menu-itemCheckbox`                                               | Checkbox (rendered for multiple selection)          | Implemented     |
| `.spectrum-Menu-itemSwitch`                                                 | Switch (rendered for actions variant)               | Missing from WC |
| `.spectrum-Menu-itemActions`                                                | Actions container for switches                      | Missing from WC |
| `.spectrum-Menu-item[aria-disabled="true"]`                                 | `disabled` attribute (ARIA variant)                 | Implemented     |
| `.spectrum-Menu.is-selectable .spectrum-Menu-item`                          | Parent menu selection mode                          | Implemented     |
| `.spectrum-Menu.is-selectableMultiple .spectrum-Menu-item`                  | Parent menu multiple selection mode                 | Implemented     |
| `.spectrum-Menu:lang(ja), .spectrum-Menu:lang(ko), .spectrum-Menu:lang(zh)` | Language-specific styling                           | Implemented     |

## Summary of changes

### CSS => SWC implementation gaps

**Missing from WC:**

- `.spectrum-Menu-itemSwitch` - Switch controls for multiple selection with actions variant are not implemented in web components
- `.spectrum-Menu-itemActions` - Actions container wrapper is not present in web component implementation

The switch variant (multiple selection with switches instead of checkboxes) appears in CSS Spectrum but is not currently supported in the Spectrum Web Components implementation. This feature allows menu items to use switches for selection instead of checkboxes, typically used for settings menus.

### CSS Spectrum 2 changes

The CSS template files are identical between the `main` and `spectrum-two` branches. No structural changes were detected in the DOM between legacy and Spectrum 2 implementations for menu items. Both branches use the same HTML structure and element hierarchy.

## Resources

- [CSS migration]()
- [Spectrum 2 preview]()
- [React]()
