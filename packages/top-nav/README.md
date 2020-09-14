## Description

`<sp-top-nav>` deliveres site navigation particularly prepared for use when that navigation will change the majority of the pages content and/or the pages URL when activated. All primary elements of an `<sp-top-nav>` should be directly accessible in the tab order.

### Installation

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/top-nav?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/top-nav)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/top-nav?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/top-nav)

```
npm install @spectrum-web-components/top-nav

# or

yarn add @spectrum-web-components/top-nav
```

## Example

```html
<sp-top-nav>
    <sp-top-nav-item href="#">Site Name</sp-top-nav-item>
    <sp-top-nav-item href="#page-1" style="margin-inline-start: auto;">
        Page 1
    </sp-top-nav-item>
    <sp-top-nav-item href="#page-2">Page 2</sp-top-nav-item>
    <sp-top-nav-item href="#page-3">Page 3</sp-top-nav-item>
    <sp-top-nav-item href="#page-4">
        Page with Really Long Name
    </sp-top-nav-item>
    <sp-action-menu
        label="Account"
        placement="bottom-end"
        style="margin-inline-start: auto;"
    >
        <sp-menu>
            <sp-menu-item>
                Account Settings
            </sp-menu-item>
            <sp-menu-item>
                My Profile
            </sp-menu-item>
            <sp-menu-divider></sp-menu-divider>
            <sp-menu-item>
                Share
            </sp-menu-item>
            <sp-menu-divider></sp-menu-divider>
            <sp-menu-item>
                Help
            </sp-menu-item>
            <sp-menu-item>
                Sign Out
            </sp-menu-item>
        </sp-menu>
    </sp-action-menu>
</sp-top-nav>
```
