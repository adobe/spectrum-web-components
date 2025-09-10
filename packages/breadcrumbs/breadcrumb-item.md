## Overview

For use within an [`<sp-breadcrumbs>`](/components/breadcrumbs) element, an `<sp-breadcrumb-item>` represents a single item in a breadcrumbs list. The default slot contains the main content of the breadcrumb item.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/breadcrumbs?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/breadcrumbs)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/breadcrumbs?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/breadcrumbs)

```zsh
yarn add @spectrum-web-components/breadcrumbs
```

Import the side effectful registration of `<sp-breadcrumb-item>` as follows:

```js
import '@spectrum-web-components/breadcrumbs/sp-breadcrumb-item.js';
```

When looking to leverage the `BreadcrumbItem` base class as a type and/or for extension purposes, do so via:

```js
import { BreadcrumbItem } from '@spectrum-web-components/breadcrumbs';
```

### Anatomy

The breadcrumb item consists of the following:

- A clickable anchor (`<a>`) that contains the breadcrumb text and handles navigation
- Text content as the main label displayed in the default slot, which becomes the clickable link text
- A separator consisting of a chevron [UI icon component](/components/icons-ui/) (`<sp-icon-chevron100>`) that visually separates breadcrumb items
- An optional [action menu](/components/action-menu) for displaying overflowed breadcrumb items

### Options

#### Value or href attributes

When using the `href` attribute instead of the `value` attribute, the breadcrumb item behaves as a regular anchor link.

<sp-tabs selected="link" label="Value or href attributes">
<sp-tab value="using-value">Value</sp-tab>
<sp-tab-panel value="using-value">

```html
<sp-breadcrumbs>
    <sp-breadcrumb-item value="home">Home</sp-breadcrumb-item>
    <sp-breadcrumb-item value="trend">Trend</sp-breadcrumb-item>
    <sp-breadcrumb-item value="assets">March 2019 Assets</sp-breadcrumb-item>
</sp-breadcrumbs>
```

</sp-tab-panel>
<sp-tab value="using-link">Link</sp-tab>
<sp-tab-panel value="using-link">

```html
<sp-breadcrumbs>
    <sp-breadcrumb-item href="/home">Home</sp-breadcrumb-item>
    <sp-breadcrumb-item href="/trend">Trend</sp-breadcrumb-item>
    <sp-breadcrumb-item href="/assets">March 2019 Assets</sp-breadcrumb-item>
</sp-breadcrumbs>
```

</sp-tab-panel>
</sp-tabs>

#### With menu content

When breadcrumbs overflow, `<sp-breadcrumbs>` will create an `<sp-breadcrumb-item>` with an [`<sp-action-menu>`](/components/action-menu) that contains the full list of breadcrumb items in reading order.

```html
<sp-breadcrumbs max-visible-items="2">
    <sp-breadcrumb-item slot="root" value="your_stuff">
        Your stuff
    </sp-breadcrumb-item>
    <sp-breadcrumb-item value="team">Files</sp-breadcrumb-item>
    <sp-breadcrumb-item value="trend">Trend</sp-breadcrumb-item>
    <sp-breadcrumb-item value="winter">Winter</sp-breadcrumb-item>
    <sp-breadcrumb-item value="assets">Assets</sp-breadcrumb-item>
    <sp-breadcrumb-item value="18x24">18x24</sp-breadcrumb-item>
</sp-breadcrumbs>
```

### States

#### Disabled

An `sp-breadcrumb-item` can have a `disabled` state which disables the events from that item.

```html
<sp-breadcrumbs>
    <sp-breadcrumb-item disabled value="home">Home</sp-breadcrumb-item>
    <sp-breadcrumb-item value="trend">Trend</sp-breadcrumb-item>
    <sp-breadcrumb-item value="assets">March 2019 Assets</sp-breadcrumb-item>
</sp-breadcrumbs>
```

### Accessibility

The `<sp-breadcrumb-item>` component provides the following accessibility features:

- Automatically applies `role="listitem"` to ensure proper semantic meaning for assistive technologies
- The last breadcrumb item automatically receives `aria-current="page"` to indicate the current location
- Applies `aria-disabled="true"` when the `disabled` property is set
- Each breadcrumb item is keyboard accessible with `tabindex="0"`
- Supports `Enter` key activation for navigation

#### Best practices

- **Provide meaningful text content**: Ensure each breadcrumb item has descriptive and meaningful labels
- **Use proper hierarchy**: Place breadcrumb items in the correct order from root to current page
- **Handle navigation events**: Listen for the `breadcrumb-select` event when using `value` instead of `href`
- **Keep labels concise**: Use short, descriptive labels that clearly identify each level
