## Overview

Side navigation allows users to locate information and features within the UI.
It can be used for either hierarchical or flat navigation, and gives the ability
to group navigable items categorically. Side navigation is an opportunity to
prioritize content or features based on your users’ needs in a way that
maintains clear, persistent visibility. Use side navigation within the context
of larger elements and mechanisms within the app frame.

`<sp-sidenav>` elements accept both `<sp-sidenav-item>` and `<sp-sidenav-heading>` elements as children in order to construct a hierarchy of navigation elements. [`<sp-sidenav-item>`](/components/sidenav-item/) elements will place themselves as a togglable child of their `<sp-sidenav>` element parent. [`<sp-sidenav-heading>`](/components/sidenav-heading/) elements will create visible structure by grouping their `<sp-sidenav-item>` children under a non-interactive heading.

[View the design documentation for this component.](https://spectrum.adobe.com/page/side-navigation/)

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/sidenav?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/sidenav)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/sidenav?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/sidenav)
[![Try it on Stackblitz](https://img.shields.io/badge/Try%20it%20on-Stackblitz-blue?style=for-the-badge)](https://stackblitz.com/edit/vitejs-vite-q3w6kjxv)

```bash
yarn add @spectrum-web-components/sidenav
```

Import the side effectful registration of `<sp-sidenav>`, `<sp-sidenav-heading>`, or `<sp-sidenav-item>` via:

```js
import '@spectrum-web-components/sidenav/sp-sidenav.js';
import '@spectrum-web-components/sidenav/sp-sidenav-heading.js';
import '@spectrum-web-components/sidenav/sp-sidenav-item.js';
```

When looking to leverage the `Sidenav`, `SidenavHeading`, or `SidenavItem` base classes as a type and/or for extension purposes, do so via:

```js
import {
    Sidenav,
    SidenavHeading,
    SidenavItem,
} from '@spectrum-web-components/sidenav';
```

### Anatomy

The side navigation consists of several key parts:

- A container element that manages the side navigation behavior
- Individual side navigation items that may or may not be expandable
- Children side navigation items that are revealed when a parent item is expanded
- Optional heading with a label

```html live-demo
<sp-sidenav>
    <sp-sidenav-heading label="Piano"></sp-sidenav-heading>
    <sp-sidenav-item label="Treble"></sp-sidenav-item>
    <sp-sidenav-item label="Bass"></sp-sidenav-item>
    <sp-sidenav-item disabled label="Grand staff"></sp-sidenav-item>
</sp-sidenav>
```

### Options

<sp-tabs selected="default" auto label="Side navigation options">
<sp-tab value="default">Default (single-level)</sp-tab>
<sp-tab-panel value="default">

Make sure to use the right option for the context and user needs. Don’t mix behavior, styles, or variations together in a single navigation menu. Follow these guidelines:

- When navigation is simple, use the single level side navigation.
- When navigation is simple but categorical, use the single level side navigation with headers.
- When navigation is expansive, hierarchical, and/or you need progressive disclosure in the menu behavior, use the multi-level side navigation. Up to three levels of navigation are supported.

```html
<sp-sidenav defaultValue="Docs">
    <sp-sidenav-item
        value="Docs"
        href="/components/SideNav"
        label="Docs"
        selected
    ></sp-sidenav-item>
    <sp-sidenav-item
        value="Guides"
        href="/guides"
        label="Guides"
    ></sp-sidenav-item>
    <sp-sidenav-item
        value="Community"
        href="/community"
        label="Community"
    ></sp-sidenav-item>
    <sp-sidenav-item
        value="Storybook"
        href="/storybook"
        target="_blank"
        label="Storybook"
    ></sp-sidenav-item>
    <sp-sidenav-item
        value="Releases"
        href="/releases"
        target="_blank"
        label="Releases"
        disabled
    ></sp-sidenav-item>
    <sp-sidenav-item
        value="GitHub"
        href="/github"
        target="_blank"
        label="Github"
    ></sp-sidenav-item>
</sp-sidenav>
```

</sp-tab-panel>
<sp-tab value="icon-single">Single-level with icons</sp-tab>
<sp-tab-panel value="icon-single">

In single-level side navigation, do not mix icon usage between side nav items. Either all side nav items have icons, or no items have icons. In cases where the navigation content might be user-generated, stick to text-only navigation items.

```html
<sp-sidenav>
    <sp-sidenav-item value="Section Title 1" label="Section Title 1">
        <sp-icon-star slot="icon"></sp-icon-star>
    </sp-sidenav-item>
    <sp-sidenav-item value="Section Title 2" label="Section Title 2" expanded>
        <sp-icon-star slot="icon"></sp-icon-star>
    </sp-sidenav-item>
    <sp-sidenav-item value="Section Title 3" label="Section Title 3" expanded>
        <sp-icon-star slot="icon"></sp-icon-star>
    </sp-sidenav-item>
</sp-sidenav>
```

</sp-tab-panel>
<sp-tab value="headings">With headings</sp-tab>
<sp-tab-panel value="headings">

Use headings in single level side navigation when it's beneficial to group navigation items into categories. The headings are not interactive. If items don’t fall into a category, place them at the top. When using the heading variation, an entire category should either all have icons or all be text-only.

Although headings can be used in multi-level side navigation, they can only be used as first-level items, and are not to be nested.

```html
<sp-sidenav>
    <sp-sidenav-item value="Section 1" label="Section 1"></sp-sidenav-item>
    <sp-sidenav-item value="Section 2" label="Section 2"></sp-sidenav-item>
    <sp-sidenav-heading label="Category 1">
        <sp-sidenav-item value="Section 3" label="Section 3"></sp-sidenav-item>
        <sp-sidenav-item value="Section 4" label="Section 4"></sp-sidenav-item>
    </sp-sidenav-heading>
    <sp-sidenav-heading label="Category 2">
        <sp-sidenav-item value="Section 5" label="Section 5"></sp-sidenav-item>
        <sp-sidenav-item value="Section 6" label="Section 6"></sp-sidenav-item>
    </sp-sidenav-heading>
</sp-sidenav>
```

</sp-tab-panel>
<sp-tab value="multilevel">Multi-level</sp-tab>
<sp-tab-panel value="multilevel">

Use `variant="multilevel"` when you have multiple layers of hierarchical navigation.
In the instances where a top-level navigation item has no children, clicking
will send the user to the location of the item. Additionally, headings can be used
in multi-level side navigation, but they can only be used as first-level items, and are not to be nested.

Up to three levels of navigation are supported.

```html
<sp-sidenav variant="multilevel" defaultValue="Layout">
    <sp-sidenav-item value="Guidelines" label="Guidelines"></sp-sidenav-item>
    <sp-sidenav-heading value="Styles" label="Styles">
        <sp-sidenav-item value="Color" label="Color"></sp-sidenav-item>
        <sp-sidenav-item value="Grid" label="Grid" expanded>
            <sp-sidenav-item value="Layout" label="Layout"></sp-sidenav-item>
            <sp-sidenav-item
                value="Responsive"
                label="Responsive"
            ></sp-sidenav-item>
        </sp-sidenav-item>
        <sp-sidenav-item
            value="Typography"
            label="Typography"
        ></sp-sidenav-item>
    </sp-sidenav-heading>
    <sp-sidenav-item value="Elements" label="Elements"></sp-sidenav-item>
    <sp-sidenav-item value="Patterns" label="Patterns"></sp-sidenav-item>
</sp-sidenav>
```

</sp-tab-panel>
<sp-tab value="icon-multi">Multi-level with icons</sp-tab>
<sp-tab-panel value="icon-multi">

In multi-level side navigation, icon and text-only navigation items can be used in combination, but only the first-level items can have icons to maintain visual clarity and hierarchy. Icons only appear on first-level items, and sublevels (second and third) should not include icons. In cases where the navigation content might be user-generated, stick to text-only navigation items.

#### Multi-level side navigation icon usage

- All icons: all items have icons
- No icons: no items have icons
- Mixed icons: only first-level items have icons; second and third-level items do not

```html
<sp-sidenav>
    <sp-sidenav-item value="Section Title 1" label="Section Title 1">
        <sp-icon-star slot="icon"></sp-icon-star>
        <sp-sidenav-item
            value="Typography"
            label="Typography"
        ></sp-sidenav-item>
    </sp-sidenav-item>
    <sp-sidenav-item value="Section Title 2" label="Section Title 2" expanded>
        <sp-icon-star slot="icon"></sp-icon-star>
        <sp-sidenav-item
            value="Iconography"
            label="Iconography"
        ></sp-sidenav-item>
    </sp-sidenav-item>
    <sp-sidenav-item value="Section Title 3" label="Section Title 3" expanded>
        <sp-icon-star slot="icon"></sp-icon-star>
        <sp-sidenav-item value="Patterns" label="Patterns" expanded>
            <sp-sidenav-item value="Forms" label="Forms"></sp-sidenav-item>
            <sp-sidenav-item value="Cards" label="Cards"></sp-sidenav-item>
        </sp-sidenav-item>
    </sp-sidenav-item>
</sp-sidenav>
```

</sp-tab-panel>
</sp-tabs>

### Behaviors

When an side navigation item is programmatically selected in `variant="multilevel"`, all of its parent items automatically expand to reveal the selection path.

### Accessibility

When the `manage-tab-index` attribute is set on an `<sp-sidenav>` element, it will present its `<sp-sidenav-item>` children with a single tab-stop. This will leave items beyond the selected item (or when there is no focusable selected item), accessible via the up and down arrow keys. Items with expanded children that aren't selected lose focus when `manage-tab-index` is active.

#### Roles and ARIA attributes

- `<sp-sidenav>` renders a `<nav>` tag and implicitly sets `role="navigation"`
- Optional `aria-label` is available for further identification
- Individual items use `role="listitem"` automatically
- Nested list containers (i.e. `<div>` tags) use `role="list"`
- Nested item containers use `aria-labelledby` referencing their parent item's `id`
- `aria-expanded="true/false"` indicates expand/collapse state for parent items
- `aria-controls` on parent items is set to the `id` of their child `role="list"` containers when expanded
- `aria-current="page"` indicates the currently selected item when it has an `href`
- When the `<sp-sidenav>` includes the `disabled` property, the entire component receives `tabindex="-1"`
- `aria-hidden="true"` is applied to all decorative icons

#### Keyboard interaction

- `Tab` and `Shift + Tab` moves focus into or out of the side nav
- If `manage-tab-index` is enabled, the up and down arrow keys will shift focus between all visible sidenav items
- `Enter` selects a side nav item or toggles expansion for parent items
