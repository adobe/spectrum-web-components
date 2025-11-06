## Overview

An `<sp-sidenav-item>` can act as both a child item of an `<sp-sidenav>` element, as well as a parent for further subdivisions of that navigation. An `<sp-sidenav-item>` with further `<sp-sidenav-item>` children will count as a toggle for the visibility of the next level of navigation items, while also updating the parent `<sp-sidenav>` element to its value when selected.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/sidenav?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/sidenav)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/sidenav?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/sidenav)

```bash
yarn add @spectrum-web-components/sidenav
```

Import the side effectful registration of `<sp-sidenav-item>` via:

```js
import '@spectrum-web-components/sidenav/sp-sidenav-item.js';
```

When looking to leverage the `SidenavItem` base classes as a type and/or for extension purposes, do so via:

```js
import { SidenavItem } from '@spectrum-web-components/sidenav';
```

### Anatomy

- **Label**: Text content of the navigation item
- **Value**: Unique identifier; required for selection changes via the `sidenav-select` event
- **href** (optional): When defined, renders the side nav item as an anchor link
- **Default slot**: Nested `<sp-sidenav-item>` elements

### Options

<sp-tabs selected="default" auto label="Side nav item options">
<sp-tab value="default">Default</sp-tab>
<sp-tab-panel value="default">

Most often, the default side nav item includes an `href` to navigate users to a new page or section.

```html
<sp-sidenav>
    <sp-sidenav-item
        value="pixar"
        label="Pixar movies"
        href="/components/sidenav"
    ></sp-sidenav-item>
</sp-sidenav>
```

</sp-tab-panel>
<sp-tab value="multi-level">Multi-level</sp-tab>
<sp-tab-panel value="multi-level">

To create a multi-level navigation, set the parent `<sp-sidenav>` to `variant="multilevel"` and nest `<sp-sidenav-item>` elements inside each other. Parent `<sp-sidenav-item>` elements that contain children can use the `expanded` attribute to show and hide their nested items. Each `<sp-sidenav-item>` with nested children acts as both a selectable navigation item (with its own value) and a toggle for expanding/collapsing its children.

```html
<sp-sidenav variant="multilevel">
    <sp-sidenav-item value="Styles" label="Styles" expanded>
        <sp-sidenav-item value="Color" label="Color">
        </sp-sidenav-item>
        <sp-sidenav-item value="Grid" label="Grid" expanded>
            <sp-sidenav-item value="Layout" label="Layout">
            </sp-sidenav-item>
            <sp-sidenav-item value="Responsive" label="Responsive">
            </sp-sidenav-item>
        </sp-sidenav-item>
        <sp-sidenav-item value="Typography" label="Typography">
        </sp-sidenav-item>
    </sp-sidenav-item>
</sp-sidenav-itm>
```

</sp-tab-panel>
<sp-tab value="icons">Accommodating icons</sp-tab>
<sp-tab-panel value="icons">

Icons can be displayed in first-level items of any type of side navigation (single level or multi-level). Icon usage for further subdivision of the navigation must be consistent with the scenarios described below. Use icons only when absolutely necessary: when they add essential value and have a strong association with the text. Never use icons just as decoration.

- All icons: all items have icons
- No icons: no items have icons
- Mixed icons: only first-level items have icons; second and third-level items do not

```html
<sp-sidenav>
    <sp-sidenav-item value="star" label="Starred">
        <sp-icon-star slot="icon"></sp-icon-star>
    </sp-sidenav-item>
    <sp-sidenav-item value="add" label="Add more">
        <sp-icon-add slot="icon"></sp-icon-add>
    </sp-sidenav-item>
</sp-sidenav>
```

</sp-tab-panel>
<sp-tab value="target">Target</sp-tab>
<sp-tab-panel value="target">

The `target` property specifies where to display the linked URL, such as in a new tab (`_blank`), parent frame (`_parent`), same frame (`_self`), or top frame (`_top`). It only applies when the sidenav item has an `href` attribute and functions like a standard HTML anchor link.

```html
<sp-sidenav>
    <sp-sidenav-item
        value="pixar"
        label="Pixar movies"
        href="/components/sidenav"
        target="_blank"
    ></sp-sidenav-item>
</sp-sidenav>
```

</sp-tab-panel>
<sp-tab value="download">Download</sp-tab>
<sp-tab-panel value="download">

When set, the `download` property causes the browser to treat the linked URL as a downloadable file, rather than navigating to it. It works in conjunction with the `href` attribute to trigger file downloads when the sidenav item is clicked.

```html
<sp-sidenav>
    <sp-sidenav-item
        value="pixar"
        label="Pixar movies"
        href="/components/sidenav"
        download
    ></sp-sidenav-item>
</sp-sidenav>
```

</sp-tab-panel>
<sp-tab value="rel">Rel</sp-tab>
<sp-tab-panel value="rel">

The `rel` property defines the relationship between the current page and the linked URL using space-separated link types (like `nofollow`, `noreferrer`, or `external`). It provides semantic information to browsers and search engines about the nature of the link relationship.

```html
<sp-sidenav>
    <sp-sidenav-item
        value="pixar"
        label="Pixar movies"
        href="/components/sidenav"
        rel="noreferrer"
    ></sp-sidenav-item>
</sp-sidenav>
```

</sp-tab-panel>
<sp-tab value="referrer-policy">Referrer policy</sp-tab>
<sp-tab-panel value="referrer-policy">

Setting `referrer-policy` will control how much referrer information is sent when following the link, with options ranging from no referrer (`no-referrer`) to full URL (`unsafe-url`).

```html
<sp-sidenav>
    <sp-sidenav-item
        value="pixar"
        label="Pixar movies"
        href="/components/sidenav"
        referrerpolicy="no-referrer"
    ></sp-sidenav-item>
</sp-sidenav>
```

</sp-tab-panel>
</sp-tabs>

### States

<sp-tabs selected="disabled" auto label="Side nav item states">
<sp-tab value="disabled">Disabled</sp-tab>
<sp-tab-panel value="disabled">

Adding the `disabled` attribute to a side nav item renders it non-interactive.

```html
<sp-sidenav>
    <sp-sidenav-item
        value="toy-story"
        label="Toy Story"
        disabled
    ></sp-sidenav-item>
    <sp-sidenav-item
        value="monsters-inc"
        label="Monsters, Inc."
    ></sp-sidenav-item>
    <sp-sidenav-item
        value="incredibles"
        label="The Incredibles"
    ></sp-sidenav-item>
    <sp-sidenav-item value="up" label="Up" disabled></sp-sidenav-item>
</sp-sidenav>
```

</sp-tab-panel>
<sp-tab value="expanded">Expanded</sp-tab>
<sp-tab-panel value="expanded">

Adding `expanded` to an `<sp-sidenav-item>` will render it as expanded if it has subsequent child items.

```html
<sp-sidenav>
    <sp-sidenav-item value="toy-story" label="Toy Story" expanded>
        <sp-sidenav-item
            value="toy-story-2"
            label="Toy Story 2"
        ></sp-sidenav-item>
        <sp-sidenav-item
            value="toy-story-3"
            label="Toy Story 3"
        ></sp-sidenav-item>
        <sp-sidenav-item
            value="toy-story-4"
            label="Toy Story 4"
        ></sp-sidenav-item>
    </sp-sidenav-item>
    <sp-sidenav-item
        value="monsters-inc"
        label="Monsters, Inc."
    ></sp-sidenav-item>
    <sp-sidenav-item
        value="incredibles"
        label="The Incredibles"
    ></sp-sidenav-item>
    <sp-sidenav-item value="up" label="Up"></sp-sidenav-item>
</sp-sidenav>
```

</sp-tab-panel>
<sp-tab value="selected">Selected</sp-tab>
<sp-tab-panel value="selected">

When users select an item, the `selected` attribute is applied. The `value` of the selected item will be bubbled up to the parent `<sp-sidenav>` to update the `value` of `<sp-sidenav>`.

```html
<sp-sidenav value="wall-e">
    <sp-sidenav-item value="toy-story" label="Toy Story">
        <sp-sidenav-item
            value="toy-story-2"
            label="Toy Story 2"
        ></sp-sidenav-item>
        <sp-sidenav-item
            value="toy-story-3"
            label="Toy Story 3"
        ></sp-sidenav-item>
        <sp-sidenav-item
            value="toy-story-4"
            label="Toy Story 4"
        ></sp-sidenav-item>
    </sp-sidenav-item>
    <sp-sidenav-item
        value="monsters-inc"
        label="Monsters, Inc."
    ></sp-sidenav-item>
    <sp-sidenav-item
        value="incredibles"
        label="The Incredibles"
    ></sp-sidenav-item>
    <sp-sidenav-item value="up" label="Up"></sp-sidenav-item>
    <sp-sidenav-item value="wall-e" label="Wall-E" selected></sp-sidenav-item>
</sp-sidenav>
```

</sp-tab-panel>
</sp-tabs>

### Behaviors

When the side navigation item text is too long for the horizontal space available, it wraps to form another line.

For RTL (right-to-left) languages, the layout of the side navigation is mirrored. Navigation items are left-aligned and their icons are placed on the right side of the text.

When users select an `<sp-sidenav-item>`, the change in the `value` property of the parent side navigation element is announced. This change can be "canceled" via `event.preventDefault()`.

When `manage-tab-index` is enabled on the parent side nav, a roving tabindex is implemented so expanded parent side nav items that aren't selected lose focus to prevent focus traps.

### Accessibility

#### Roles and ARIA attributes

- Individual items use `role="listitem"` automatically
- Nested list containers (i.e. `<div>` tags) use `role="list"`
- Nested item containers use `aria-labelledby` referencing their parent item's `id`
- `aria-expanded="true/false"` indicates expand/collapse state for parent side nav items
- `aria-controls` on parent items is set to the `id` of their child `role="list"` containers when expanded
- `aria-current="page"` indicates the currently selected item when it has an `href`
- `aria-hidden="true"` should be applied to all decorative icons

#### Keyboard interactions

**Standard navigation:** (when parent side nav has `manage-tab-index` disabled)

- `Tab` moves focus to individual items
- `Enter` or `Space` select a focused item or toggle the expansion of any nested side nav items

**Roving `tabindex` mode:** (when parent side nav has `manage-tab-index="true"`)

- The parent `<sp-sidenav>` component is the single tab-stop
- `Up` and `Down` arrow keys navigate between all visible side nav items
- `Home` and `End` keys jump to first/last items respectively
- `Enter` selects a focused item or toggle the expansion of any nested side nav items
