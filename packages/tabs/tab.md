## Overview

An `<sp-tab>` element surfaces a `label` attribute to serve as its default text content when none is available in the DOM. An icon may be assigned to the element via the `icon` slot; e.g. `<sp-tab><svg slot="icon" aria-label="Tab w/ Icon">...</svg></sp-tab>`. Associate an `<sp-tab>` element with the `<sp-tab-panel>` that represents its content with the `value` attribute.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/tabs?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/tabs)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/tabs?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/tabs)

```bash
yarn add @spectrum-web-components/tabs
```

Import the side effectful registration of `<sp-tab>` via:

```ts
import '@spectrum-web-components/tabs/sp-tab.js';
```

When looking to leverage the `Tab` base class as a type and/or for extension purposes, do so via:

```ts
import { Tab } from '@spectrum-web-components/tabs';
```

### Anatomy

The `<sp-tab>` element consists of a label and an optional icon.

```html
<sp-tab label="Label">
    <sp-icon-checkmark slot="icon"></sp-icon-checkmark>
</sp-tab>
```

### Options

#### Icon only

For tabs that have an icon and no visible label, the icon should have a `label`. Icons should not be used just as decoration. If the tab item does not have a visible label, it must still have a tooltip to disclose the label.

```html
<sp-tab value="complete">
    <sp-icon-checkmark
        slot="icon"
        label="Checking your work"
        aria-label="Tab w/ checkmark"
    ></sp-icon-checkmark>
</sp-tab>
```

#### Label only

```html
<sp-tab value="label" label="Label"></sp-tab>
```

### States

In order to activate the `<sp-tab>` element's interactive states, it must be used within an `<sp-tabs>` element.

#### Selected state

The tab is currently active and its associated panel is visible.

```html
<sp-tabs>
    <sp-tab selected="label" label="Label" value="1"></sp-tab>
</sp-tabs>
```

#### Focused state

The tab has keyboard focus. All tabs can receive focus through keyboard navigation, except when the tab is `disabled`.

```html
<sp-tabs selected="2">
    <sp-tab label="Tab 1" value="1"></sp-tab>
    <sp-tab label="Tab 2" value="2"></sp-tab>
    <sp-tab label="Tab 3" value="3"></sp-tab>
</sp-tabs>
```

#### Disabled state

When an `<sp-tab>` element is given the `disabled` attribute, it will prevent visitor from selecting that tab and its contents. The ability to select other tabs and their content will go unimpeaded.

```html
<sp-tabs selected="2">
    <sp-tab label="Tab 1" value="1"></sp-tab>
    <sp-tab label="Tab 2" value="2"></sp-tab>
    <sp-tab label="Tab 3" value="3" disabled></sp-tab>
    <sp-tab label="Tab 4" value="4"></sp-tab>
    <sp-tab-panel value="1">Content for Tab 1 is selectable</sp-tab-panel>
    <sp-tab-panel value="2">Content for Tab 2 is selected</sp-tab-panel>
    <sp-tab-panel value="3">Content for Tab 3 is not selectable</sp-tab-panel>
    <sp-tab-panel value="4">Content for Tab 4 is selectable</sp-tab-panel>
</sp-tabs>
```

### Behaviors

#### Selection

- Clicking a tab selects it and shows its associated panel
- Only one tab can be selected at a time within a tab group
- Disabled tabs cannot be selected

#### Events

- `click`: Fired when the tab is clicked
- `keydown`: Fired when a key is pressed while the tab has focus

### Accessibility

#### Best practices

- Always provide meaningful text content via `label` attribute or text content. In rare cases where an icon provides enough content, use the icon's `label` attribute.
- Use descriptive `value` attributes that clearly identify the tab's purpose
- Ensure tab labels are concise but descriptive
- When using icons, provide appropriate `aria-label` attributes

#### Keyboard navigation

- `Tab`: Move focus to the next focusable element
- `Arrow keys`: Navigate between tabs in the group and move the focus indicator
- `Enter` or `Space`: Select the focused tab
