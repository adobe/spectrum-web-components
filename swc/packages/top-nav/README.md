## Description

`<sp-top-nav>` delivers site navigation, particularly for when that navigation will change the majority of the page's content and/or the page's URL when selected. All primary elements of an `<sp-top-nav>` should be directly accessible in the tab order.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/top-nav?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/top-nav)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/top-nav?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/top-nav)
[![Try it on webcomponents.dev](https://img.shields.io/badge/Try%20it%20on-webcomponents.dev-green?style=for-the-badge)](https://webcomponents.dev/edit/collection/fO75441E1Q5ZlI0e9pgq/LtIrARhL1Qgevqxs3hZE/src/index.ts)

```
yarn add @spectrum-web-components/top-nav
```

Import the side effectful registration of `<sp-top-nav>` and `<sp-top-nav-item>` as follows:

```
import '@spectrum-web-components/top-nav/sp-top-nav.js';
import '@spectrum-web-components/top-nav/sp-top-nav-item.js';
```

When looking to leverage the `TopNav` or `TopNavItem` base classes as a type and/or for extension purposes, do so via:

```
import { TopNav, TopNavItem } from '@spectrum-web-components/top-nav';
```

### Example

```html
<sp-top-nav>
    <sp-top-nav-item href="#">Site Name</sp-top-nav-item>
    <sp-top-nav-item href="#page-1" style="margin-inline-start: auto;">
        Page 1
    </sp-top-nav-item>
    <sp-top-nav-item href="#page-2">Page 2</sp-top-nav-item>
    <sp-top-nav-item href="#page-3">Page 3</sp-top-nav-item>
    <sp-top-nav-item href="#page-4">Page with Really Long Name</sp-top-nav-item>
    <sp-action-menu
        label="Account"
        placement="bottom-end"
        style="margin-inline-start: auto;"
        quiet
    >
        <sp-menu-item>Account Settings</sp-menu-item>
        <sp-menu-item>My Profile</sp-menu-item>
        <sp-menu-divider></sp-menu-divider>
        <sp-menu-item>Share</sp-menu-item>
        <sp-menu-divider></sp-menu-divider>
        <sp-menu-item>Help</sp-menu-item>
        <sp-menu-item>Sign Out</sp-menu-item>
    </sp-action-menu>
</sp-top-nav>
```
