## Description

An `<sp-switch>` is used to turn an option on or off. Switches allow users to select the state of a single option at a time. Use a switch rather than a checkbox when activating (or deactivating) an option, instead of selecting.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/switch?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/switch)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/switch?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/switch)
[![Try it on webcomponents.dev](https://img.shields.io/badge/Try%20it%20on-webcomponents.dev-green?style=for-the-badge)](https://webcomponents.dev/edit/collection/fO75441E1Q5ZlI0e9pgq/uXsqJULoUuOtbDgGB4sC/src/index.ts)

```
yarn add @spectrum-web-components/switch
```

Import the side effectful registration of `<sp-switch>` via:

```
import '@spectrum-web-components/switch/sp-switch.js';
```

When looking to leverage the `Switch` base class as a type and/or for extension purposes, do so via:

```
import { Switch } from '@spectrum-web-components/switch';
```

## Example

```html
<sp-switch label="Switch" onclick="spAlert(this, '<sp-switch> clicked!')">
    Switch
</sp-switch>
```

### Standard switch buttons

Standard switches are the default style for switches. They are optimal for
application panels where all visual elements are monochrome in order to direct
focus to the content.

```html-live
<div style="display: flex; justify-content: space-between;">
    <div style="display: flex; flex-direction: column;">
        <h4 class="spectrum-Heading--subtitle1">Default</h4>
        <sp-field-group selected="first" name="example" vertical>
            <sp-switch value="off">Switch Off</sp-switch>
            <sp-switch value="on" checked>Switch On</sp-switch>
        </sp-field-group>
    </div>

    <div style="display: flex; flex-direction: column;">
        <h4 class="spectrum-Heading--subtitle1">Disabled</h4>
        <sp-field-group selected="first" name="example" vertical>
            <sp-switch disabled value="off">Switch Off</sp-switch>
            <sp-switch disabled value="on" checked>Switch On</sp-switch>
        </sp-field-group>
    </div>
</div>
```

## Sizes

<sp-tabs selected="m" auto label="Size Attribute Options">
<sp-tab value="s">Small</sp-tab>
<sp-tab-panel value="s">

```html
<sp-switch size="s">Small</sp-switch>
```

</sp-tab-panel>
<sp-tab value="m">Medium</sp-tab>
<sp-tab-panel value="m">

```html
<sp-switch size="m">Medium</sp-switch>
```

</sp-tab-panel>
<sp-tab value="l">Large</sp-tab>
<sp-tab-panel value="l">

```html
<sp-switch size="l">Large</sp-switch>
```

</sp-tab-panel>
<sp-tab value="xl">Extra Large</sp-tab>
<sp-tab-panel value="xl">

```html
<sp-switch size="xl">Extra Large</sp-switch>
```

</sp-tab-panel>
</sp-tabs>

### Emphasized radio buttons

Emphasized switches are a secondary style for switches. The blue color provides a
visual prominence that is optimal for forms, settings, etc. where the switches
need to be noticed.

```html-live
<div style="display: flex; justify-content: space-between;">
    <div style="display: flex; flex-direction: column;">
        <h4 class="spectrum-Heading--subtitle1">Default</h4>
        <sp-field-group selected="first" name="example" vertical>
            <sp-switch emphasized value="off">Switch Off</sp-switch>
            <sp-switch emphasized value="on" checked>Switch On</sp-switch>
        </sp-field-group>
    </div>

    <div style="display: flex; flex-direction: column;">
        <h4 class="spectrum-Heading--subtitle1">Disabled</h4>
        <sp-field-group selected="first" name="example" vertical>
            <sp-switch emphasized disabled value="off">Switch Off</sp-switch>
            <sp-switch emphasized disabled value="on" checked>Switch On</sp-switch>
        </sp-field-group>
    </div>
</div>
```

### Handling events

Event handlers for clicks and other user actions can be registered on an `<sp-switch>` similar to a standard `<input type="checkbox">` element.

```html
<sp-switch id="switch-example" onclick="spAlert(this, '<sp-radio> clicked!')">
    Web component
</sp-switch>
```

## Accessibility

Switch are accessible by default, rendered in HTML using the `<input type="checkbox">` element with the appropriate accessibility role, `switch`. When the Switch is `checked` or `invalid`, the appropriate ARIA state attribute will automatically be applied.
