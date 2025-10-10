## Overview

An `<sp-breadcrumbs>` shows hierarchy and navigational context for a user's location within an app. The `<sp-breadcrumbs>` component defines its list of items using child `<sp-breadcrumb-item>` elements placed in its default slot.

[View the design documentation for this component.](https://spectrum.adobe.com/page/breadcrumbs/)

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/breadcrumbs?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/breadcrumbs)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/breadcrumbs?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/breadcrumbs)

```zsh
yarn add @spectrum-web-components/breadcrumbs
```

Import the side effectful registration of `<sp-breadcrumbs>` and `<sp-breadcrumb-item>` via:

```js
import '@spectrum-web-components/breadcrumbs/sp-breadcrumbs.js';
import '@spectrum-web-components/breadcrumbs/sp-breadcrumb-item.js';
```

When looking to leverage the `Breadcrumbs` or `BreadcrumbItem` base class as a type and/or for extension purposes, do so via:

```js
import {
    Breadcrumbs,
    BreadcrumbItem,
} from '@spectrum-web-components/breadcrumbs';
```

### Anatomy

Breadcrumbs consist of several key parts:

- A breadcrumbs list, usually consisting of multiple [breadcrumb items](/components/breadcrumb-item), with a separator between each item.
- A breadcrumbs title at the end of the list displaying the current location within the hierarchy.
- A truncation menu may also appear, which displays all options within a breadcrumb. Within the menu, items are listed with the hierarchy ordered from the top (root) to the bottom, and will include the currently selected item. Breadcrumbs truncate when there isn't enough space to show all items, or when the list contains five or more levels. Truncation helps manage space and keep the most relevant breadcrumbs visible in deeply nested hierarchies.

```html
<sp-breadcrumbs>
    <sp-breadcrumb-item value="home">Home</sp-breadcrumb-item>
    <sp-breadcrumb-item value="trend">Trend</sp-breadcrumb-item>
    <sp-breadcrumb-item value="assets">March 2019 Assets</sp-breadcrumb-item>
</sp-breadcrumbs>
```

### Options

#### Compact

When needing to optimize for functional space of `<sp-breadcrumbs>`, the `compact` property can be used to reduce the height of the breadcrumbs while still maintaining the proper user context.

```html
<sp-breadcrumbs compact>
    <sp-breadcrumb-item value="1">Home</sp-breadcrumb-item>
    <sp-breadcrumb-item value="2">Trend</sp-breadcrumb-item>
    <sp-breadcrumb-item value="3">March 2019 Assets</sp-breadcrumb-item>
</sp-breadcrumbs>
```

#### Overflowing

When space becomes limited or the maximum visible items are reached, the component automatically moves the first breadcrumbs into an action menu, adjusting dynamically as the window is resized.

By default, the maximum number of visible breadcrumbs is 4, as recommended by [Spectrum Design](https://spectrum.adobe.com/page/breadcrumbs/#Don%E2%80%99t-show-too-many-breadcrumbs-at-once). You can override this by using the `max-visible-items` attribute. The `<sp-breadcrumbs>` component will always display the action menu and the breadcrumbs title, so the minimum number of visible items is 1.

<sp-tabs selected="default" label="Overflow options">
<sp-tab value="default">Default</sp-tab>
<sp-tab-panel value="default">

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

</sp-tab-panel>
<sp-tab value="one-max-item">One maximum visible item</sp-tab>
<sp-tab-panel value="one-max-item">

```html
<sp-breadcrumbs max-visible-items="1">
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

</sp-tab-panel>
<sp-tab value="three-max-items">Three maximum visible items</sp-tab>
<sp-tab-panel value="three-max-items">

```html
<sp-breadcrumbs max-visible-items="3">
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

</sp-tab-panel>
<sp-tab value="resizable">Resizable</sp-tab>
<sp-tab-panel value="resizable">

These breadcrumbs are in a resizable container. Reduce the size of the container to see how the maximum number of visible items changes.

```html
<div style="border: 2px solid; padding: 20px; resize: both; overflow: auto;">
    <sp-breadcrumbs max-visible-items="8">
        <sp-breadcrumb-item value="your_stuff">Your stuff</sp-breadcrumb-item>
        <sp-breadcrumb-item value="team">Team</sp-breadcrumb-item>
        <sp-breadcrumb-item value="in_progress">In progress</sp-breadcrumb-item>
        <sp-breadcrumb-item value="files">Files</sp-breadcrumb-item>
        <sp-breadcrumb-item value="trend">Trend</sp-breadcrumb-item>
        <sp-breadcrumb-item value="winter">Winter</sp-breadcrumb-item>
        <sp-breadcrumb-item value="assets">Assets</sp-breadcrumb-item>
        <sp-breadcrumb-item value="18x24">18x24</sp-breadcrumb-item>
    </sp-breadcrumbs>
</div>
```

</sp-tab-panel>
</sp-tabs>

#### Show root

Use the `root` slot on the first breadcrumb item to always render the first breadcrumb item, even if the breadcrumbs are overflowing. The root will always show in addition to the number of items specified with `max-visible-items`.

<sp-tabs selected="overflowing" auto label="Root slot variations">
<sp-tab value="overflowing">Overflowing</sp-tab>
<sp-tab-panel value="overflowing">

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

</sp-tab-panel>
<sp-tab value="not-overflowing">Not overflowing</sp-tab>
<sp-tab-panel value="not-overflowing">

```html
<sp-breadcrumbs>
    <sp-breadcrumb-item slot="root" value="your_stuff">
        Your stuff
    </sp-breadcrumb-item>
    <sp-breadcrumb-item value="files">Files</sp-breadcrumb-item>
    <sp-breadcrumb-item value="trend">Trend</sp-breadcrumb-item>
    <sp-breadcrumb-item value="winter">Winter</sp-breadcrumb-item>
    <sp-breadcrumb-item value="assets">Assets</sp-breadcrumb-item>
</sp-breadcrumbs>
```

</sp-tab-panel>
</sp-tabs>

#### Links

By default, `sp-breadcrumbs` emits a `change` event when clicking on one of its children.
However, there may be cases in which clicking should redirect to another page. This can be achieved by using the `href` attribute instead of `value`.
Please note that the `change` event will no longer be triggered in this case.

```html
<sp-breadcrumbs>
    <sp-breadcrumb-item href="https://opensource.adobe.com/">
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

#### Custom Action Menu

The component offers the possibility to replace the action menu's icon with a custom one using the `icon` slot. Moreover, for accessibility purposes you can provide an internationalized string for the menu label using the `menu-label` attribute.

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

### Accessibility

The `<sp-breadcrumbs>` component provides the following accessibility features:

- Automatically sets `role="navigation"` to ensure proper semantic meaning for assistive technologies
- Uses semantic markup by rendering a `<ul>` with each [`<sp-breadcrumb-item>`](/components/breadcrumb-item) assigned `role="listitem"`
- The last breadcrumb item automatically receives `aria-current="page"` to indicate the current location
- Sets `aria-label` based on the `label` property, defaulting to `"Breadcrumbs"` if none is provided
- Each breadcrumb item is keyboard accessible with `tabindex="0"`
- Provides an accessible [action menu](/components/action-menu) with keyboard navigation and screen reader support

#### Best practices

- **Limit breadcrumb depth**: Keep breadcrumbs to 4-5 levels maximum to avoid overwhelming users
- **Use descriptive labels**: Each breadcrumb item should clearly identify the section or page
- **Maintain consistent hierarchy**: Always start from the root and progress logically to the current page
- **Handle overflow gracefully**: Use the `max-visible-items` property to control truncation behavior
- **Provide meaningful menu labels**: Use the `menu-label` attribute to describe the overflow menu purpose
