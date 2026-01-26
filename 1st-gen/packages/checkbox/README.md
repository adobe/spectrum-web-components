## Overview

`<sp-checkbox>` allow users to select multiple items from a list of independent
options, or to mark an individual option as selected.

Should I use a checkbox or a switch? Use a switch when activating something
instead of selecting.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/checkbox?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/checkbox)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/checkbox?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/checkbox)
[![Try it on Stackblitz](https://img.shields.io/badge/Try%20it%20on-Stackblitz-blue?style=for-the-badge)](https://stackblitz.com/edit/vitejs-vite-31hvwr2m)

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
        <sp-field-group vertical label="Select an option" invalid>
            <sp-checkbox invalid>Web component</sp-checkbox>
            <sp-checkbox checked invalid>Web component</sp-checkbox>
            <sp-checkbox indeterminate invalid>Web component</sp-checkbox>
            <sp-help-text slot="negative-help-text" icon>
                This selection is invalid.
            </sp-help-text>
        </sp-field-group>
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
        <sp-field-group vertical label="Select an option" invalid>
            <sp-checkbox emphasized invalid>Web component</sp-checkbox>
            <sp-checkbox emphasized checked invalid>Web component</sp-checkbox>
            <sp-checkbox emphasized indeterminate invalid>
                Web component
            </sp-checkbox>
            <sp-help-text slot="negative-help-text" icon>
                This selection is invalid.
            </sp-help-text>
        </sp-field-group>
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

When a checkbox is in an invalid state, provide help text to explain the error and guide the user toward a solution. Wrap the checkbox in an `<sp-field-group>` to associate the help text with the checkbox. (See [help text](#help-text) for more information.)

```html
<sp-field-group vertical label="Terms and conditions" invalid>
    <sp-checkbox invalid>I accept the terms and conditions</sp-checkbox>
    <sp-help-text slot="negative-help-text" icon>
        You must accept the terms to continue.
    </sp-help-text>
</sp-field-group>
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

#### Read-only

Checkboxes have a `readonly` attribute for when they’re in the disabled state but still need their labels to be shown. This allows for content to be copied, but not interacted with or changed.

```html
<sp-checkbox readonly>Read-only</sp-checkbox>
```

### Help text

Help text can be accessibly associated with checkboxes by using the `help-text` or `negative-help-text` slots on an `<sp-field-group>` element. When using the `negative-help-text` slot, `<sp-field-group>` will self manage the presence of this content based on the value of the `invalid` property on your `<sp-field-group>` element. Content within the `help-text` slot will be shown by default. When your `<sp-field-group>` should receive help text based on state outside of the complexity of `invalid` or not, manage the content addressed to the `help-text` from above to ensure that it displays the right messaging and possesses the right `variant`.

Read more about using [help text](../help-text).

<sp-tabs selected="self" auto label="Help text usage with checkboxes">
<sp-tab value="self">Self managed</sp-tab>
<sp-tab-panel value="self">

```html
<sp-field-group
    vertical
    id="self"
    label="Notification preferences"
    onchange="
        const checkboxes = this.querySelectorAll('sp-checkbox');
        const noneChecked = ![...checkboxes].some(cb => cb.checked);
        this.invalid = noneChecked;
    "
>
    <sp-checkbox value="email">Email notifications</sp-checkbox>
    <sp-checkbox value="sms">SMS notifications</sp-checkbox>
    <sp-checkbox value="push" checked>Push notifications</sp-checkbox>
    <sp-help-text slot="help-text">
        Choose how you'd like to be notified.
    </sp-help-text>
    <sp-help-text slot="negative-help-text" icon>
        Select at least one notification method.
    </sp-help-text>
</sp-field-group>
```

</sp-tab-panel>
<sp-tab value="above">Managed from above</sp-tab>
<sp-tab-panel value="above">

```html
<sp-field-label for="above">Notification preferences</sp-field-label>
<sp-field-group
    vertical
    id="above"
    onchange="
        const checkboxes = this.querySelectorAll('sp-checkbox');
        const noneChecked = ![...checkboxes].some(cb => cb.checked);
        const helpText = this.querySelector(`[slot='help-text']`);
        helpText.icon = noneChecked;
        helpText.textContent = noneChecked ? 'Select at least one notification method.' : 'Choose how you\'d like to be notified.';
        helpText.variant = noneChecked ? 'negative' : 'neutral';
    "
>
    <sp-checkbox value="email">Email notifications</sp-checkbox>
    <sp-checkbox value="sms">SMS notifications</sp-checkbox>
    <sp-checkbox value="push" checked>Push notifications</sp-checkbox>
    <sp-help-text slot="help-text">
        Choose how you'd like to be notified.
    </sp-help-text>
</sp-field-group>
```

</sp-tab-panel>
<sp-tab value="single">Single checkbox</sp-tab>
<sp-tab-panel value="single">

When a single checkbox requires validation, wrap it in an `<sp-field-group>` to associate help text:

```html
<sp-field-group vertical label="Agreement" invalid>
    <sp-checkbox invalid>
        I have read and accept the terms of service
    </sp-checkbox>
    <sp-help-text slot="negative-help-text" icon>
        You must accept the terms of service to continue.
    </sp-help-text>
</sp-field-group>
```

</sp-tab-panel>
</sp-tabs>

### Behaviors

#### Handling events

Event handlers for clicks and other user actions can be registered on an `<sp-checkbox>` as they would a standard `<input type="checkbox">` element.

```html
<sp-checkbox
    id="checkbox-example"
    onclick="spAlert(this, '<sp-checkbox> clicked!')"
>
    Check this box to see an onclick alert.
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

Sets of checkboxes should always have a clear label that describes what the list of options represents and guides users what to do. This is important for accessibility, since a screen reader will read the label before each option. (See [field group's label documentation](/field-group/#label) for more information.)

```html
<sp-field-group label="Select your toppings">
    <sp-checkbox>Ketchup</sp-checkbox>
    <sp-checkbox>Mustard</sp-checkbox>
    <sp-checkbox>Pickles</sp-checkbox>
</sp-field-group>
```

#### Provide help text in the correct location

Checkbox groups should use help text for error messaging and descriptions. Descriptions are valuable for giving context about a selection or for clarifying the options.

It is [not currently possible](https://w3c.github.io/webcomponents-cg/#cross-root-aria) to provide accessible ARIA references between elements in different shadow roots. To ensure proper association between elements, help text must be included via the `slot="help-text"` or `slot="negative-help-text"` on the parent `<sp-field-group>`.

See [help text](../help-text) for more information.

#### Keyboard Navigation

Checkboxes can be toggled using the <kbd>Space</kbd> key when focused. They follow the standard tab order of the page.

#### Screen readers

Screen readers interpret checkboxes by announcing their role, label, current state, and role to the user. This allows users relying on assistive technology to understand and interact with the checkbox effectively.

When focused, a screen reader will announce:

- The label (text provided inside the or associated with it)
- The state: "checked", "not checked", or "partially checked" (when indeterminate is set)
- The role: "checkbox"
- If the checkbox is marked as invalid, it may also announce "invalid entry" depending on the screen reader.
