## Overview

For use within an `<sp-breadcrumbs>` element, an `<sp-breadcrumb-item>` represents a single item in a list.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/breadcrumbs?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/breadcrumbs)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/breadcrumbs?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/breadcrumbs)

```
yarn add @spectrum-web-components/breadcrumbs
```

Import the side effectful registration of `<sp-breadcrumb-item>` as follows:

```
import '@spectrum-web-components/breadcrumbs/sp-breadcrumb-item.js';
```

When looking to leverage the `BreadcrumbItem` base class as a type and/or for extension purposes, do so via:

```
import { BreadcrumbItem } from '@spectrum-web-components/breadcrumbs';
```

## Example

```html
<sp-breadcrumbs>
    <sp-breadcrumb-item value="1">Home</sp-breadcrumb-item>
    <sp-breadcrumb-item value="2">Trend</sp-breadcrumb-item>
    <sp-breadcrumb-item value="3">March 2019 Assets</sp-breadcrumb-item>
</sp-breadcrumbs>
```

## Links

When using the `href` attribute instead of the `value` attribute, the breadcrumb item behaves as a regular anchor link.

```html
<sp-breadcrumbs>
    <sp-breadcrumb-item href="/1">Home</sp-breadcrumb-item>
    <sp-breadcrumb-item href="/2">Trend</sp-breadcrumb-item>
    <sp-breadcrumb-item href="/3">March 2019 Assets</sp-breadcrumb-item>
</sp-breadcrumbs>
```

## Disabled

Disabled breadcrumb items no longer receive focus and keyboard events.

```html
<sp-breadcrumbs>
    <sp-breadcrumb-item disabled value="1">Home</sp-breadcrumb-item>
    <sp-breadcrumb-item disabled value="2">Trend</sp-breadcrumb-item>
    <sp-breadcrumb-item value="3">March 2019 Assets</sp-breadcrumb-item>
</sp-breadcrumbs>
```
