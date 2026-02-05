# Menu Group migration roadmap

## Component specifications

### CSS

<details>
<summary>CSS selectors</summary>

- `.spectrum-Menu .spectrum-Menu-item--collapsible .spectrum-Menu-sectionHeading`
- `.spectrum-Menu .spectrum-Menu-item.is-disabled .spectrum-Menu-sectionHeading`
- `.spectrum-Menu .spectrum-Menu-item.is-disabled:hover .spectrum-Menu-sectionHeading`
- `.spectrum-Menu .spectrum-Menu-item.is-focused > .spectrum-Menu-sectionHeading`
- `.spectrum-Menu .spectrum-Menu-item:active > .spectrum-Menu-sectionHeading`
- `.spectrum-Menu .spectrum-Menu-item:focus > .spectrum-Menu-sectionHeading`
- `.spectrum-Menu .spectrum-Menu-item:hover > .spectrum-Menu-sectionHeading`
- `.spectrum-Menu .spectrum-Menu-item[aria-disabled="true"] .spectrum-Menu-sectionHeading`
- `.spectrum-Menu .spectrum-Menu-item[aria-disabled="true"]:hover .spectrum-Menu-sectionHeading`
- `.spectrum-Menu-back`
- `.spectrum-Menu-back .spectrum-Menu-sectionHeading`
- `.spectrum-Menu-back:focus-visible`
- `.spectrum-Menu-backButton`
- `.spectrum-Menu-backButton:focus-visible`
- `.spectrum-Menu-backHeading`
- `.spectrum-Menu-sectionHeading`

</details>

<details>
<summary>Passthroughs</summary>

None found for this component.

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

- `selects` (string: 'inherit', 'single', 'multiple') - inherited from Menu
- `size` (string: 's', 'm', 'l', 'xl') - inherited from Menu
- `label` (string) - inherited from Menu

</details>

<details>
<summary>Slots</summary>

- `header` - headline of the menu group
- Default slot - menu items to be listed in the group

</details>

## Comparison

### DOM Structure changes

<details>
<summary>Spectrum Web Components:</summary>

```html
<sp-menu-group role="group" aria-labelledby="sp-menu-group-label-{id}">
    <span class="header">
        <slot name="header"></slot>
    </span>
    <slot></slot>
</sp-menu-group>
```

</details>

<details>
<summary>Legacy (CSS main branch):</summary>

```html
<li role="presentation">
    <!-- Standard menu group -->
    <span class="spectrum-Menu-sectionHeading" aria-hidden="true"
        >Section Heading</span
    >
    <ul class="spectrum-Menu" role="group" aria-labelledby="menu-heading-{id}">
        <!-- Menu items go here -->
    </ul>

    <!-- OR Tray submenu variant with back button -->
    <div class="spectrum-Menu-back">
        <button
            aria-label="Back to previous menu"
            class="spectrum-Menu-backButton"
            type="button"
            role="menuitem"
        >
            <svg class="spectrum-Menu-backIcon">...</svg>
        </button>
        <span class="spectrum-Menu-sectionHeading" aria-hidden="true"
            >Section Heading</span
        >
    </div>
    <ul class="spectrum-Menu" role="group" aria-labelledby="menu-heading-{id}">
        <!-- Menu items go here -->
    </ul>
</li>
```

</details>

<details>
<summary>Spectrum 2 (CSS spectrum-two branch):</summary>

```html
<li role="presentation">
    <!-- Standard menu group -->
    <span class="spectrum-Menu-sectionHeading" aria-hidden="true"
        >Section Heading</span
    >
    <ul class="spectrum-Menu" role="group" aria-labelledby="menu-heading-{id}">
        <!-- Menu items go here -->
    </ul>

    <!-- OR Tray submenu variant with back button -->
    <div class="spectrum-Menu-back">
        <button
            aria-label="Back to previous menu"
            class="spectrum-Menu-backButton"
            type="button"
            role="menuitem"
        >
            <svg class="spectrum-Menu-backIcon">...</svg>
        </button>
        <span class="spectrum-Menu-sectionHeading" aria-hidden="true"
            >Section Heading</span
        >
    </div>
    <ul class="spectrum-Menu" role="group" aria-labelledby="menu-heading-{id}">
        <!-- Menu items go here -->
    </ul>
</li>
```

</details>

### CSS => SWC mapping

| CSS selector                              | Attribute or slot                      | Status          |
| ----------------------------------------- | -------------------------------------- | --------------- |
| `.spectrum-Menu-sectionHeading`           | `header` slot content                  | Implemented     |
| `.spectrum-Menu-back`                     | Back button container for tray submenu | Missing from WC |
| `.spectrum-Menu-backButton`               | Back button element                    | Missing from WC |
| `.spectrum-Menu-backIcon`                 | Back button icon                       | Missing from WC |
| `.spectrum-Menu-back:focus-visible`       | Back button focus state                | Missing from WC |
| `.spectrum-Menu-backButton:focus-visible` | Back button focus state                | Missing from WC |
| `role="group"`                            | Group role                             | Implemented     |
| `aria-labelledby`                         | Header ID reference                    | Implemented     |
| `--mod-menu-section-header-*` modifiers   | Section header styling                 | Implemented     |
| `--mod-menu-back-*` modifiers             | Back button styling                    | Missing from WC |

## Summary of changes

### CSS => SWC implementation gaps

**Missing from WC:**

- `.spectrum-Menu-back` - Back button container for tray submenu navigation
- `.spectrum-Menu-backButton` - Actual button element for navigating back
- `.spectrum-Menu-backIcon` - Icon displayed in the back button
- All `--mod-menu-back-*` modifiers for styling the back button

The tray submenu variant with back button navigation (`.spectrum-Menu-back`) is not implemented in Spectrum Web Components. This feature allows users to navigate back to a previous menu level in a tray/mobile context. The CSS Spectrum implementation includes a back button with an arrow icon and optional heading, but this functionality is absent from the web component.

The standard menu group functionality (section headings with grouped items) is fully implemented in web components.

### CSS Spectrum 2 changes

The CSS template files are identical between the `main` and `spectrum-two` branches. No structural changes were detected in the DOM between legacy and Spectrum 2 implementations for menu groups. Both branches use the same HTML structure with the group rendered as a `<li>` element containing a section heading and a nested menu with role="group".

## Resources

- [CSS migration]()
- [Spectrum 2 preview]()
- [React]()
