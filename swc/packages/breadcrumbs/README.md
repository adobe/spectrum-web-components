## Description

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/breadcrumbs?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/breadcrumbs)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/breadcrumbs?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/breadcrumbs)
[![Try it on webcomponents.dev](https://img.shields.io/badge/Try%20it%20on-webcomponents.dev-green?style=for-the-badge)](https://webcomponents.dev/edit/JsuqWBLZTpGVAkZuHTPA/src/index.ts)

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

## Disabled

`sp-breadcrumb-item` can have a `disabled` state which disables the events from the disabled item.

```html
<sp-breadcrumbs>
    <sp-breadcrumb-item disabled value="1">Home</sp-breadcrumb-item>
    <sp-breadcrumb-item value="2">Trend</sp-breadcrumb-item>
    <sp-breadcrumb-item value="3">March 2019 Assets</sp-breadcrumb-item>
</sp-breadcrumbs>
```

## Compact

When needing to optimize for functional space of `sp-breadcrumbs`, the compact option is useful for reducing the height of the breadcrumbs while still maintaining the proper user context.

```html
<sp-breadcrumbs compact>
    <sp-breadcrumb-item value="1">Home</sp-breadcrumb-item>
    <sp-breadcrumb-item value="2">Trend</sp-breadcrumb-item>
    <sp-breadcrumb-item value="3">March 2019 Assets</sp-breadcrumb-item>
</sp-breadcrumbs>
```

## Links

By default, `sp-breadcrumbs` emits a `change` event when clicking on one of its children.
However, there may be cases in which these should redirect to another page. This can be achieved by using the `href` attribute instead of `value`.
Please note that the `change` event will no longer be triggered in this case.

```html
<sp-breadcrumbs>
    <sp-breadcrumb-item href="https://opensource.adobe.com/home">
        Home
    </sp-breadcrumb-item>
    <sp-breadcrumb-item href="https://opensource.adobe.com/trend">
        Trend
    </sp-breadcrumb-item>
    <sp-breadcrumb-item href="https://opensource.adobe.com/assets">
        March 2019 Assets
    </sp-breadcrumb-item>
</sp-breadcrumbs>
```

## Overflowing

When the space is limited or the maximum number of visible items is reached, the component will render the first breadcrumbs inside an action menu. If needed, the last breadcrumb item will be truncated and will render a tooltip with the full text.

As recommended by [Spectrum Design](https://spectrum.adobe.com/page/breadcrumbs/#Don%E2%80%99t-show-too-many-breadcrumbs-at-once), by default the maximum visible breadcrumbs is 4. If you want to override this, you can use the `max-visible-items` attribute.

```html
<sp-breadcrumbs>
    <sp-breadcrumb-item value="your_stuff">Your stuff</sp-breadcrumb-item>
    <sp-breadcrumb-item value="team">Team</sp-breadcrumb-item>
    <sp-breadcrumb-item value="in_progress">In progress</sp-breadcrumb-item>
    <sp-breadcrumb-item value="files">Files</sp-breadcrumb-item>
    <sp-breadcrumb-item value="trend">Trend</sp-breadcrumb-item>
    <sp-breadcrumb-item value="winter">Winter</sp-breadcrumb-item>
    <sp-breadcrumb-item value="assets">Assets</sp-breadcrumb-item>
    <sp-breadcrumb-item value="18x24">18x24</sp-breadcrumb-item>
</sp-breadcrumbs>
```

### Show root

Use the "root" slot to always render the first breadcrumb item, even if the breadcrumbs are overflowing.

```html
<sp-breadcrumbs>
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

## Custom Action Menu

The component offers the possibility to replace the action menu's icon with a custom one using the `icon` slot. Moreover, for accesibility purposes you can provide an internationalized string for the menu label using the `menu-label` attribute.

```html
<sp-breadcrumbs menu-label="Settings">
    <sp-icon-settings slot="icon"></sp-icon-settings>

    <sp-breadcrumb-item value="displays">Displays</sp-breadcrumb-item>
    <sp-breadcrumb-item value="main">Main display</sp-breadcrumb-item>
    <sp-breadcrumb-item value="brightness">Brightness</sp-breadcrumb-item>
    <sp-breadcrumb-item value="presets">Presets</sp-breadcrumb-item>
    <sp-breadcrumb-item value="1">Preset #1</sp-breadcrumb-item>
</sp-breadcrumbs>
```
