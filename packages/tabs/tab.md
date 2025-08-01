## Overview

An `<sp-tab>` element surfaces a `label` attribute to serve as its default text content when none is available in the DOM. An icon may be assigned to the element via the `icon` slot; e.g. `<sp-tab><svg slot="icon" label="Tab with icon">...</svg></sp-tab>`. Associate an `<sp-tab>` element with the `<sp-tab-panel>` that represents its content with the `value` attribute.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/tabs?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/tabs)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/tabs?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/tabs)

```bash
yarn add @spectrum-web-components/tabs
```

Import the side effectful registration of `<sp-tab>` via:

```js
import '@spectrum-web-components/tabs/sp-tab.js';
```

When looking to leverage the `Tab` base class as a type and/or for extension purposes, do so via:

```js
import { Tab } from '@spectrum-web-components/tabs';
```

### Anatomy

The `<sp-tab>` element consists of the following:

- a label, so that users know which tab panels content will be shown
- an optional icon
- a value that programmatically associates the tab with its corresponding tab panel

```html
<sp-tabs>
    <sp-tab label="Tab cola" value="tab-cola">
        <sp-icon-checkmark slot="icon"></sp-icon-checkmark>
    </sp-tab>
    <sp-tab-panel value="tab-cola">
        Tab (or TaB) was a diet cola soft drink from The Coca-Cola Company, introduced in 1963. It is no longer produced.
    </sp-tab-panel>
</sp-tab>
```

### Options

#### Icon only

For tabs that have an icon and no visible label, the icon should have a `label` attribute in order to set the `aria-label` of the icon. Icons should not be used just as decoration.

```html
<sp-tabs>
    <sp-tab value="complete">
        <sp-icon-checkmark
            slot="icon"
            label="Checking your work"
        ></sp-icon-checkmark>
    </sp-tab>
    <sp-tab-panel value="complete">
        A screenreader will read this tab as "Checking your work"
    </sp-tab-panel>
</sp-tabs>
```

#### Label only

The label can be provided via the `label` attribute or the default slot:

```html
<sp-tabs>
    <sp-tab label="Tab using an attribute" value="attribute">
    </sp-tab>
    <sp-tab-panel value="attribute">
        This tab uses the `label` attribute to label the tab.
    </sp-tab-panel>
    <sp-tab value="slot">
        Tab using slot
    </sp-tab>
    <sp-tab-panel value="slot">
        This tab uses the default slot to label the tab.
    </sp-tab-panel>
</sp-tab>
```

The `label` attribute provides the visible text content and accessible name for screen readers. The `value` attribute links the tab to its corresponding `sp-tab-panel` via matching values.

### States

In order to activate the `<sp-tab>` element's interactive states, it must be used within an `<sp-tabs>` element.

#### Selected state

The tab is currently active and its associated panel is visible.

```html
<sp-tabs>
    <sp-tab selected="label" label="Label" value="1"></sp-tab>
    <sp-tab-panel value="1">This tab is selected.</sp-tab-panel>
</sp-tabs>
```

#### Focused state

The tab has keyboard focus. All tabs can receive focus through keyboard navigation, except when the tab is `disabled`.

#### Disabled state

When an `<sp-tab>` element is given the `disabled` attribute, it will prevent visitors from selecting that tab and its contents. The ability to select other tabs and their content will remain unrestricted.

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

- Always provide meaningful text content via `label` attribute or slot content. In rare cases where an icon alone provides enough meaning, use the icon's `label` attribute.
- Use descriptive `value` attributes that clearly identify the tab's purpose.
- Ensure tab labels are concise but descriptive.
- When using icons, provide an appropriate `label` attribute on the icon.

#### Keyboard navigation

- `Tab`: Move focus to the next focusable element
- `Arrow keys`: Navigate between tabs in the group and move the focus indicator
- `Enter` or `Space`: Select the focused tab
