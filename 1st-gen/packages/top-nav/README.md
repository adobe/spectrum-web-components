## Overview

`<sp-top-nav>` delivers site navigation, particularly for when that navigation will change the majority of the page's content and/or the page's URL when selected. All primary elements of an `<sp-top-nav>` should be directly accessible in the tab order, typically as `<sp-top-nav-item>` elements. There should only ever be one `<sp-top-nav>` on a page.

Refer to the [Spectrum Design System documentation](https://spectrum.adobe.com/page/headers/) for visual design guidelines and the [application frame patterns](https://spectrum.adobe.com/page/application-frame/) for usage in application contexts.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/top-nav?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/top-nav)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/top-nav?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/top-nav)
[![Try it on Stackblitz](https://img.shields.io/badge/Try%20it%20on-Stackblitz-blue?style=for-the-badge)](https://stackblitz.com/edit/vitejs-vite-95xejnti)

```bash
yarn add @spectrum-web-components/top-nav
```

Import the side effectful registration of `<sp-top-nav>` and `<sp-top-nav-item>` as follows:

```js
import '@spectrum-web-components/top-nav/sp-top-nav.js';
import '@spectrum-web-components/top-nav/sp-top-nav-item.js';
```

When looking to leverage the `TopNav` or `TopNavItem` base classes as a type and/or for extension purposes, do so via:

```js
import { TopNav, TopNavItem } from '@spectrum-web-components/top-nav';
```

### Anatomy

The `<sp-top-nav>` component consists of the following parts:

- **Container** (`<sp-top-nav>`): The main navigation container component with `role="navigation"` that manages nav items and selection states
- **Navigation items** (`<sp-top-nav-item>`): Default slot; individual clickable navigation links
- **Label**: Optional property to set an `aria-label` for the top navigation
- **Selection indicator**: A visual indicator that animates to the selected item
- **Divider**: Optional `<div>` divider that acts as the track for the selection indicator

### Options

<sp-tabs selected="default" auto label="Top nav options">
<sp-tab value="default">Default</sp-tab>
<sp-tab-panel value="default">

```html
<sp-top-nav>
    <sp-top-nav-item href="#">Site Name</sp-top-nav-item>
    <sp-top-nav-item href="#page-1" style="margin-inline-start: auto;">
        Page 1
    </sp-top-nav-item>
    <sp-top-nav-item href="#page-2">Page 2</sp-top-nav-item>
    <sp-top-nav-item href="#page-3">Page 3</sp-top-nav-item>
    <sp-top-nav-item href="#page-4">Page with really long name</sp-top-nav-item>
</sp-top-nav>
```

</sp-tab-panel>
<sp-tab value="action-menu">With action menu integration</sp-tab>
<sp-tab-panel value="action-menu">

Other web components, like action menus and/or buttons, can be included in the `<sp-top-nav>` slots in order to extend functionality.

```html
<sp-top-nav>
    <sp-top-nav-item href="#">Site Name</sp-top-nav-item>
    <sp-top-nav-item href="#page-1" style="margin-inline-start: auto;">
        Page 1
    </sp-top-nav-item>
    <sp-top-nav-item href="#page-2">Page 2</sp-top-nav-item>
    <sp-top-nav-item href="#page-3">Page 3</sp-top-nav-item>
    <sp-action-menu
        label="Account"
        placement="bottom-end"
        style="margin-inline-start: auto;"
        quiet
    >
        <sp-menu-item>Account settings</sp-menu-item>
        <sp-menu-item>My profile</sp-menu-item>
        <sp-menu-divider></sp-menu-divider>
        <sp-menu-item>Help</sp-menu-item>
        <sp-menu-item>Sign out</sp-menu-item>
    </sp-action-menu>
</sp-top-nav>
```

</sp-tab-panel>
<sp-tab value="selected">With default selection</sp-tab>
<sp-tab-panel value="selected">

Setting the `selected` property to a URL that matches a top navigation item's resolved `href` value will render that item selected by default.
The `selected` value must match the fully resolved URL, not just the `href` attribute value.

For demonstration purposes only, the `href` value of the selected top nav item is hardcoded, as opposed to being a dynamic `href` or a jump link.

```html
<sp-top-nav
    selected="https://opensource.adobe.com/spectrum-web-components/components/top-nav/"
>
    <sp-top-nav-item href="#">Site Name</sp-top-nav-item>
    <sp-top-nav-item href="#home" style="margin-inline-start: auto;">
        Home
    </sp-top-nav-item>
    <sp-top-nav-item href="#services">Services</sp-top-nav-item>
    <sp-top-nav-item
        href="https://opensource.adobe.com/spectrum-web-components/components/top-nav/"
        selected
    >
        About
    </sp-top-nav-item>
</sp-top-nav>
```

</sp-tab-panel>
<sp-tab value="ignore-url">Ignoring URL parts for selection</sp-tab>
<sp-tab-panel value="ignore-url">

If implementations wish to ignore certain URL parts when matching for selection, the `ignore-url-parts` can be defined with a space-separated list. Currently supported values are `hash` and `search`, which will remove the `#hash` and `?search=value` respectively.

```html
<sp-top-nav ignore-url-parts="search hash">
    <sp-top-nav-item href="/page1">Page 1</sp-top-nav-item>
    <sp-top-nav-item href="/page2">Page 2</sp-top-nav-item>
</sp-top-nav>
```

</sp-tab-panel>
<sp-tab value="quiet">Quiet variant</sp-tab>
<sp-tab-panel value="quiet">

The `quiet` property renders the top navigation component without the bottom border.

```html
<sp-top-nav quiet>
    <sp-top-nav-item href="#">Home</sp-top-nav-item>
    <sp-top-nav-item href="/products">Products</sp-top-nav-item>
</sp-top-nav>
```

</sp-tab-panel>
</sp-tabs>

#### Sizes

<sp-tabs selected="m" auto label="Top nav sizing options">
<sp-tab value="s">Small</sp-tab>
<sp-tab-panel value="s">

```html
<sp-top-nav size="s">
    <sp-top-nav-item href="#">Site Name</sp-top-nav-item>
    <sp-top-nav-item href="#page-1" style="margin-inline-start: auto;">
        Page 1
    </sp-top-nav-item>
    <sp-top-nav-item href="#page-2">Page 2</sp-top-nav-item>
    <sp-top-nav-item href="#page-3">Page 3</sp-top-nav-item>
    <sp-top-nav-item href="#page-4">Page with really long name</sp-top-nav-item>
</sp-top-nav>
```

</sp-tab-panel>
<sp-tab value="m">Medium</sp-tab>
<sp-tab-panel value="m">

```html
<sp-top-nav size="m">
    <sp-top-nav-item href="#">Site Name</sp-top-nav-item>
    <sp-top-nav-item href="#page-1" style="margin-inline-start: auto;">
        Page 1
    </sp-top-nav-item>
    <sp-top-nav-item href="#page-2">Page 2</sp-top-nav-item>
    <sp-top-nav-item href="#page-3">Page 3</sp-top-nav-item>
    <sp-top-nav-item href="#page-4">Page with really long name</sp-top-nav-item>
</sp-top-nav>
```

</sp-tab-panel>
<sp-tab value="l">Large</sp-tab>
<sp-tab-panel value="l">

```html
<sp-top-nav size="l">
    <sp-top-nav-item href="#">Site Name</sp-top-nav-item>
    <sp-top-nav-item href="#page-1" style="margin-inline-start: auto;">
        Page 1
    </sp-top-nav-item>
    <sp-top-nav-item href="#page-2">Page 2</sp-top-nav-item>
    <sp-top-nav-item href="#page-3">Page 3</sp-top-nav-item>
    <sp-top-nav-item href="#page-4">Page with really long name</sp-top-nav-item>
</sp-top-nav>
```

</sp-tab-panel>
<sp-tab value="xl">Extra large</sp-tab>
<sp-tab-panel value="xl">

```html
<sp-top-nav size="xl">
    <sp-top-nav-item href="#">Site Name</sp-top-nav-item>
    <sp-top-nav-item href="#page-1" style="margin-inline-start: auto;">
        Page 1
    </sp-top-nav-item>
    <sp-top-nav-item href="#page-2">Page 2</sp-top-nav-item>
    <sp-top-nav-item href="#page-3">Page 3</sp-top-nav-item>
    <sp-top-nav-item href="#page-4">Page with really long name</sp-top-nav-item>
</sp-top-nav>
```

</sp-tab-panel>
</sp-tabs>

### Behaviors

- Items are automatically selected based on the current `window.location.href`
- Use `ignore-url-parts` to ignore hash fragments or search parameters when matching
- Items can be programmatically selected via the `selected` property
- The selection indicator automatically resizes based on item content changes
- Items can be positioned with CSS using CSS via the `style` attribute set on `<sp-top-nav-item>` elements (e.g., `margin-inline-start: auto`)

### Accessibility

#### ARIA attributes

- `role="navigation"` is automatically applied to the top nav container
- The `label` property set on `<sp-top-nav>` will set an `aria-label` for screen readers
- Selected items receive `aria-current="page"`

#### Keyboard interaction

- `Tab` should move focus between all navigation items in a logical tab order
- `Enter` selects navigation items

#### Best practices

- **Always provide a label** for the navigation container.
- **Use semantic `href` values** that match actual page URLs for automatic selection.
- **Provide meaningful text content** for navigation items - avoid icon-only items without labels.
