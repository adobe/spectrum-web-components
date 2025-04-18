## Overview

`<sp-checkbox>` allow users to select multiple items from a list of independent
options, or to mark an individual option as selected.

Should I use a checkbox or a switch? Use a switch when activating something
instead of selecting.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/checkbox?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/checkbox)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/checkbox?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/checkbox)
[![Try it on webcomponents.dev](https://img.shields.io/badge/Try%20it%20on-webcomponents.dev-green?style=for-the-badge)](https://webcomponents.dev/edit/collection/fO75441E1Q5ZlI0e9pgq/jeIGAXHMUrTp6hGMquoD/src/index.ts)

```bash
yarn add @spectrum-web-components/checkbox
```

Import the side effectful registration of `<sp-checkbox>` via:

```ts
import '@spectrum-web-components/checkbox/sp-checkbox.js';
```

When looking to leverage the `Checkbox` base class as a type and/or for extension purposes, do so via:

```ts
import { Checkbox } from '@spectrum-web-components/checkbox';
```

### Anatomy

A checkbox consists of a box that can be checked or unchecked, and a label that describes its purpose. The checkbox can also be in an indeterminate state, which is visually distinct from both checked and unchecked states.

### Options

#### Sizes

<sp-tabs selected="m" auto label="Size Attribute Options">
<sp-tab value="s">Small</sp-tab>
<sp-tab-panel value="s">

```html
<sp-field-group horizontal label="Small Checkboxes">
    <sp-checkbox size="s">Small</sp-checkbox>
    <sp-checkbox size="s" checked>Small Checked</sp-checkbox>
    <sp-checkbox size="s" indeterminate>Small Indeterminate</sp-checkbox>
</sp-field-group>
```

</sp-tab-panel>
<sp-tab value="m">Medium</sp-tab>
<sp-tab-panel value="m">

```html
<sp-field-group horizontal label="Medium Checkboxes">
    <sp-checkbox size="m">Medium</sp-checkbox>
    <sp-checkbox size="m" checked>Medium Checked</sp-checkbox>
    <sp-checkbox size="m" indeterminate>Medium Indeterminate</sp-checkbox>
</sp-field-group>
```

</sp-tab-panel>
<sp-tab value="l">Large</sp-tab>
<sp-tab-panel value="l">

```html demo
<sp-field-group horizontal label="Large Checkboxes">
    <sp-checkbox size="l">Large</sp-checkbox>
    <sp-checkbox size="l" checked>Large Checked</sp-checkbox>
    <sp-checkbox size="l" indeterminate>Large Indeterminate</sp-checkbox>
</sp-field-group>
```

</sp-tab-panel>
<sp-tab value="xl">Extra Large</sp-tab>
<sp-tab-panel value="xl">

```html demo
<sp-field-group horizontal label="Extra Large Checkboxes">
    <sp-checkbox size="xl">Extra Large</sp-checkbox>
    <sp-checkbox size="xl" checked>Extra Large Checked</sp-checkbox>
    <sp-checkbox size="xl" indeterminate>Extra Large Indeterminate</sp-checkbox>
</sp-field-group>
```

</sp-tab-panel>
</sp-tabs>

#### Variants

<sp-tabs selected="standard" auto label="Checkbox Variants">
<sp-tab value="standard">Standard Checkboxes</sp-tab>
<sp-tab-panel value="standard">

Standard checkboxes are the default style for checkboxes. They are optimal for
application panels where all visual elements are monochrome in order to direct
focus to the content.

```html
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

</sp-tab-panel>
<sp-tab value="emphasized">Emphasized Checkboxes</sp-tab>
<sp-tab-panel value="emphasized">

Emphasized checkboxes are a secondary style for checkboxes. The blue color
provides a visual prominence that is optimal for forms, settings, lists or grids
of assets, etc. where the checkboxes need to be noticed.

```html
<div style="display: flex; justify-content: space-between;">
    <div style="display: flex; flex-direction: column;">
        <h4 class="spectrum-Heading--subtitle1">Default</h4>
        <sp-checkbox emphasized>Web component</sp-checkbox>
        <sp-checkbox emphasized checked>Web component</sp-checkbox>
        <sp-checkbox emphasized indeterminate>Web component</sp-checkbox>
    </div>

    <div style="display: flex; flex-direction: column;">
        <h4 class="spectrum-Heading--subtitle1">Invalid</h4>
        <sp-checkbox emphasized invalid>Web component</sp-checkbox>
        <sp-checkbox emphasized checked invalid>Web component</sp-checkbox>
        <sp-checkbox emphasized indeterminate invalid>
            Web component
        </sp-checkbox>
    </div>

    <div style="display: flex; flex-direction: column;">
        <h4 class="spectrum-Heading--subtitle1">Disabled</h4>
        <sp-checkbox emphasized disabled>Web component</sp-checkbox>
        <sp-checkbox emphasized checked disabled>Web component</sp-checkbox>
        <sp-checkbox emphasized indeterminate disabled>
            Web component
        </sp-checkbox>
    </div>
</div>
```

</sp-tab-panel>
</sp-tabs>

### States

#### Invalid

The `invalid` attribute indicates that the checkbox's value is invalid. When set, appropriate ARIA attributes will be automatically applied.

```html
<sp-checkbox invalid>Invalid</sp-checkbox>
```

#### Disabled

The `disabled` attribute prevents the checkbox from receiving focus or events. The checkbox will appear faded.

```html
<sp-checkbox disabled>Disabled</sp-checkbox>
```

#### Indeterminate

The `indeterminate` attribute sets the checkbox to an indeterminate state, visually distinct from both checked and unchecked states.

```html
<sp-checkbox indeterminate>Indeterminate</sp-checkbox>
```

### Behaviors

#### Handling events

Event handlers for clicks and other user actions can be registered on an `<sp-checkbox>` as they would a standard `<input type="checkbox">` element.

```html
<sp-checkbox
    id="checkbox-example"
    onclick="spAlert(this, '<sp-checkbox> clicked!')"
>
    Check this box to se an onclick alert.
</sp-checkbox>
```

### Accessibility

Checkboxes are accessible by default, rendered in HTML using the `<input type="checkbox">` element. When the checkbox is set as `indeterminate` or
`invalid`, the appropriate ARIA state attribute will automatically be applied.

#### Include a label

Every checkbox must have a label that clearly describes its purpose. The label can be provided as content within the `<sp-checkbox>` element.

```html
<sp-checkbox>Send me text messages.</sp-checkbox>
```

#### Label groups of related checkboxes

Sets of checkboxes should always have a clear label that describes what the list of options represents and guides users what to do. This is important for accessibility, since a screen reader will read the label before each option.

```html
<sp-field-group label="Select your toppings">
    <sp-checkbox>Ketchup</sp-checkbox>
    <sp-checkbox>Mustard</sp-checkbox>
    <sp-checkbox>Pickles</sp-checkbox>
</sp-field-group>
```

#### Keyboard Navigation

Checkboxes can be toggled using the <kbd>Space</kbd> key when focused. They follow the standard tab order of the page.
