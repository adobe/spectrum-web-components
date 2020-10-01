## Description

`<sp-checkbox>` allow users to select multiple items from a list of independent
options, or to mark an individual option as selected.

Should I use a checkbox or a switch? Use a switch when activating something
instead of selecting.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/checkbox?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/checkbox)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/checkbox?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/checkbox)

```
yarn add @spectrum-web-components/checkbox
```

Import the side effectful registration of `<sp-checkbox>` via:

```
import '@spectrum-web-components/checkbox/sp-checkbox.js';
```

When looking to leverage the `Checkbox` base class as a type and/or for extension purposes, do so via:

```
import { Checkbox } from '@spectrum-web-components/checkbox';
```

### Example

```html
<sp-checkbox>Web component</sp-checkbox>
```

### Standard checkboxes

Standard checkboxes are the default style for checkboxes. The blue color
provides a visual prominence that is optimal for forms, settings, lists or grids
of assets, etc. where the checkboxes need to be noticed.

```html-live
<div style="display: flex; justify-content: space-between;">
    <div style="display: flex; flex-direction: column;">
        <h4 class="spectrum-Heading--subtitle1">Default</h4>
        <sp-checkbox>Web component</sp-checkbox>
        <sp-checkbox checked>Web component</sp-checkbox>
        <sp-checkbox indeterminate>Web component</sp-checkbox>
    </div>

    <div style="display: flex; flex-direction: column;">
        <h4 class="spectrum-Heading--subtitle1">Invalid</h4>
        <sp-checkbox invalid>Web component</sp-checkbox>
        <sp-checkbox checked invalid>Web component</sp-checkbox>
        <sp-checkbox indeterminate invalid>Web component</sp-checkbox>
    </div>

    <div style="display: flex; flex-direction: column;">
        <h4 class="spectrum-Heading--subtitle1">Disabled</h4>
        <sp-checkbox disabled>Web component</sp-checkbox>
        <sp-checkbox checked disabled>Web component</sp-checkbox>
        <sp-checkbox indeterminate disabled>Web component</sp-checkbox>
    </div>
</div>
```

### Quiet checkboxes

Quiet checkboxes are a secondary style for checkboxes. The gray color provides a
less prominent style than the standard checkboxes. They are optimal for
application panels where all visual elements are monochrome in order to direct
focus to the content.

```html-live
<div style="display: flex; justify-content: space-between;">
    <div style="display: flex; flex-direction: column; justify-content: space-between;">
        <h4 class="spectrum-Heading--subtitle1">Default</h4>
        <sp-checkbox quiet>Web component</sp-checkbox>
        <sp-checkbox quiet checked>Web component</sp-checkbox>
        <sp-checkbox quiet indeterminate>Web component</sp-checkbox>
    </div>

    <div style="display: flex; flex-direction: column;">
        <h4 class="spectrum-Heading--subtitle1">Invalid</h4>
        <sp-checkbox quiet invalid>Web component</sp-checkbox>
        <sp-checkbox quiet checked invalid>Web component</sp-checkbox>
        <sp-checkbox quiet indeterminate invalid>Web component</sp-checkbox>
    </div>

    <div style="display: flex; flex-direction: column;">
        <h4 class="spectrum-Heading--subtitle1">Disabled</h4>
        <sp-checkbox quiet disabled>Web component</sp-checkbox>
        <sp-checkbox quiet checked disabled>Web component</sp-checkbox>
        <sp-checkbox quiet indeterminate disabled>Web component</sp-checkbox>
    </div>
</div>
```

### Handling events

Event handlers for clicks and other user actions can be registered on an `<sp-checkbox>` as they would a standard `<input type="checkbox">` element.

```html
<sp-checkbox
    id="checkbox-example"
    onclick="spAlert(this, '<sp-checkbox> clicked!')"
>
    Web component
</sp-checkbox>
```

## Accessibility

Checkboxes are accessible by default, rendered in HTML using the `<input type="checkbox">` element. When the checkbox is set as `indeterminate` or
`invalid`, the appropriate ARIA state attribute will automatically be applied.
