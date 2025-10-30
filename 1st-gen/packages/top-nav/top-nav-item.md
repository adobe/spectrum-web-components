## Overview

`<sp-top-nav-item>` represents individual navigation links within a [`<sp-top-nav>` component](/components/top-nav). Each item extends standard anchor functionality with Spectrum styling, automatic selection management, and enhanced accessibility features.

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

The `<sp-top-nav-item>` consists of the following parts:

- **Default slot**: text content for the navigation item
- **Label**: Sets a visually-hidden `aria-label` on the item

### Options

<sp-tabs selected="default" auto label="Top nav item property options">
<sp-tab value="default">Default</sp-tab>
<sp-tab-panel value="default">

```html
<sp-top-nav>
    <sp-top-nav-item href="#pam">Pam</sp-top-nav-item>
    <sp-top-nav-item href="#phyllis">Phyllis</sp-top-nav-item>
    <sp-top-nav-item href="#angela">Angela</sp-top-nav-item>
    <sp-top-nav-item href="#meredith">Meredith</sp-top-nav-item>
</sp-top-nav>
```

</sp-tab-panel>
<sp-tab value="target">Target</sp-tab>
<sp-tab-panel value="target">

The `target` property specifies where to display the linked URL, such as in a new tab (`_blank`), parent frame (`_parent`), same frame (`_self`), or top frame (`_top`).

```html
<sp-top-nav>
    <sp-top-nav-item href="/components/top-nav" target="_blank">
        The Office
    </sp-top-nav-item>
</sp-top-nav>
```

</sp-tab-panel>
<sp-tab value="download">Download</sp-tab>
<sp-tab-panel value="download">

When set, the `download` property causes the browser to treat the linked URL as a downloadable file, rather than navigating to it. It works in conjunction with the `href` attribute to trigger file downloads when the top nav item is clicked.

```html
<sp-top-nav>
    <sp-top-nav-item href="/components/top-nav" download>
        The Office
    </sp-top-nav-item>
</sp-top-nav>
```

</sp-tab-panel>
<sp-tab value="rel">Rel</sp-tab>
<sp-tab-panel value="rel">

The `rel` property defines the relationship between the current page and the linked URL using space-separated link types (like `nofollow`, `noreferrer`, or `external`). It provides semantic information to browsers and search engines about the nature of the link relationship.

```html
<sp-top-nav>
    <sp-top-nav-item href="/components/top-nav" rel="noreferrer">
        The Office
    </sp-top-nav-item>
</sp-top-nav>
```

</sp-tab-panel>
<sp-tab value="referrer-policy">Referrer policy</sp-tab>
<sp-tab-panel value="referrer-policy">

Setting `referrer-policy` will control how much referrer information is sent when following the link, with options ranging from no referrer (`no-referrer`) to full URL (`unsafe-url`).

```html
<sp-top-nav>
    <sp-top-nav-item href="/components/top-nav" referrerpolicy="no-referrer">
        The Office
    </sp-top-nav-item>
</sp-top-nav>
```

</sp-tab-panel>
</sp-tabs>

### States

<sp-tabs selected="disabled" auto label="Top nav item states">
<sp-tab value="disabled">Disabled</sp-tab>
<sp-tab-panel value="disabled">

Adding the `disabled` attribute to a top nav item renders it non-interactive.

```html
<sp-top-nav>
    <sp-top-nav-item href="#pam">Pam</sp-top-nav-item>
    <sp-top-nav-item href="#phyllis">Phyllis</sp-top-nav-item>
    <sp-top-nav-item href="#angela" disabled>Angela</sp-top-nav-item>
    <sp-top-nav-item href="#meredith">Meredith</sp-top-nav-item>
</sp-top-nav>
```

</sp-tab-panel>
<sp-tab value="selected">Selected</sp-tab>
<sp-tab-panel value="selected">

When a user selects a top nav item, the `selected` property is added.

The `selected` status of a top nav item will populate the parent `<sp-top-nav>` component's `selected` property with the resolved URL.

For demonstration purposes only, the `href` value of the selected top nav item below is hardcoded, as opposed to being a dynamic `href` or a jump link.

```html
<sp-top-nav
    selected="https://opensource.adobe.com/spectrum-web-components/components/top-nav-item/"
>
    <sp-top-nav-item href="#michael">Michael</sp-top-nav-item>
    <sp-top-nav-item
        href="https://opensource.adobe.com/spectrum-web-components/components/top-nav-item/"
        selected
    >
        Dwight
    </sp-top-nav-item>
    <sp-top-nav-item href="#kevin">Kevin</sp-top-nav-item>
    <sp-top-nav-item href="#jim">Jim</sp-top-nav-item>
</sp-top-nav>
```

</sp-tab-panel>
</sp-tabs>

### Behaviors

Selection state is automatically managed by the parent `<sp-top-nav>` component. When selected, the `selected` property is set to `true` and visual styles will update. Only one item can be selected at a time within a navigation group

Clicking anywhere within the item area triggers navigation. Standard anchor behaviors apply to top nav items (new tab with Ctrl/Cmd+click, etc.).

### Accessibility

#### ARIA attributes

- Selected items automatically receive `aria-current="page"`
- The `label` property can optionally set `aria-label` on the anchor element if screen reader text is significantly different from visible text
- Top nav items renders as anchor elements for accessible screen reader navigation

#### Keyboard interaction

- `Tab` and `Shift+Tab` moves focus between items in a natural, logical order
- `Enter` or `Space` trigger navigation

#### Best practices

- **Use descriptive link text** that makes sense out of context
- **Use the `label` property sparingly** for additional accessibility information when needed
- **Avoid icon-only items** without accessible text or labels
