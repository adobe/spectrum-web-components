## Description

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/breadcrumbs?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/breadcrumbs)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/breadcrumbs?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/breadcrumbs)

```
yarn add @spectrum-web-components/breadcrumbs
```

Import the side effectful registration of `<sp-breadcrumbs>` and `<sp-breadcrumb-item>` via:

```
import '@spectrum-web-components/breadcrumbs/sp-breadcrumbs.js';
import '@spectrum-web-components/breadcrumbs/sp-breadcrumb-item.js';
```

When looking to leverage the `Breadcrumbs` or `BreadcrumbItem` base class as a type and/or for extension purposes, do so via:

```
import { Breadcrumbs, BreadcrumbItem } from '@spectrum-web-components/breadcrumbs';
```

## Example

```html
<sp-breadcrumbs>
    <sp-breadcrumb-item value="1">Home</sp-breadcrumb-item>
    <sp-breadcrumb-item value="2">Trend</sp-breadcrumb-item>
    <sp-breadcrumb-item value="3">March 2019 Assets</sp-breadcrumb-item>
</sp-breadcrumbs>
```

As recommended by [Spectrum Design](https://spectrum.adobe.com/page/breadcrumbs/#Don%E2%80%99t-show-too-many-breadcrumbs-at-once), by default the maximum visible breadcrumbs is 4. If you want to override this, you can use the `max-visible-items` attribute.

## Overflowing

When the space is limited or the maximum number of visible items is reached, the component will render the first breadcrumbs inside an action menu. If needed, the last breadcrumb item will be truncated and will render a tooltip with the full text.

```html
<sp-breadcrumbs show-root>
    <sp-breadcrumb-item href="https://opensource.adobe.com/stuff">
        Your stuff
    </sp-breadcrumb-item>
    <sp-breadcrumb-item href="https://opensource.adobe.com/team">
        Team
    </sp-breadcrumb-item>
    <sp-breadcrumb-item href="https://opensource.adobe.com/inprogress">
        In progress
    </sp-breadcrumb-item>
    <sp-breadcrumb-item href="https://opensource.adobe.com/files">
        Files
    </sp-breadcrumb-item>
    <sp-breadcrumb-item href="https://opensource.adobe.com/trend">
        Trend
    </sp-breadcrumb-item>
    <sp-breadcrumb-item href="https://opensource.adobe.com/winter">
        Winter
    </sp-breadcrumb-item>
    <sp-breadcrumb-item href="https://opensource.adobe.com/assets">
        Assets
    </sp-breadcrumb-item>
    <sp-breadcrumb-item href="https://opensource.adobe.com/18x24">
        18x24
    </sp-breadcrumb-item>
</sp-breadcrumbs>
```

### Show Root

The `show-root` attribute will always render the root breadcrumb item, even if the breadcrumbs are overflowing.

```html
<sp-breadcrumbs show-root>
    <sp-breadcrumb-item href="https://opensource.adobe.com/stuff">
        Your stuff
    </sp-breadcrumb-item>
    <sp-breadcrumb-item href="https://opensource.adobe.com/files">
        Files
    </sp-breadcrumb-item>
    <sp-breadcrumb-item href="https://opensource.adobe.com/trend">
        Trend
    </sp-breadcrumb-item>
    <sp-breadcrumb-item href="https://opensource.adobe.com/winter">
        Winter
    </sp-breadcrumb-item>
    <sp-breadcrumb-item href="https://opensource.adobe.com/assets">
        Assets
    </sp-breadcrumb-item>
    <sp-breadcrumb-item href="https://opensource.adobe.com/18x24">
        18x24
    </sp-breadcrumb-item>
</sp-breadcrumbs>
```

## Custom Action Menu

The component offers the possibility to replace the action menu's icon with a custom one using the `icon` slot. Moreover, for accesibility purposes you can provide an internationalized string for the menu label using the `menu-label` attribute.

```html
<sp-breadcrumbs menu-label="Settings">
    <sp-icon-settings slot="icon"></sp-icon-settings>

    <sp-breadcrumb-item href="https://opensource.adobe.com/displays">
        Displays
    </sp-breadcrumb-item>
    <sp-breadcrumb-item href="https://opensource.adobe.com/main">
        Main display
    </sp-breadcrumb-item>
    <sp-breadcrumb-item href="https://opensource.adobe.com/brightness">
        Brightness
    </sp-breadcrumb-item>
    <sp-breadcrumb-item href="https://opensource.adobe.com/presets">
        Presets
    </sp-breadcrumb-item>
    <sp-breadcrumb-item href="https://opensource.adobe.com/1">
        Preset #1
    </sp-breadcrumb-item>
</sp-breadcrumbs>
```
