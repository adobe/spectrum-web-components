## Overview

An `<sp-switch>` is used to turn an option on or off. Switches allow users to select the state of a single option at a time. Use a switch rather than a checkbox when activating (or deactivating) an option, instead of selecting.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/switch?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/switch)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/switch?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/switch)
[![Try it on Stackblitz](https://img.shields.io/badge/Try%20it%20on-Stackblitz-blue?style=for-the-badge)](https://stackblitz.com/edit/vitejs-vite-pu294gsh)

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

### Anatomy

A switch consists of a switch input and slotted label.

```html
<sp-switch>Email notifications</sp-switch>
```

#### Checked

A switch can be checked by setting the `checked` property/attribute.

```html demo
<sp-field-group vertical>
    <sp-switch>Not checked</sp-switch>
    <sp-switch checked>Checked</sp-switch>
</sp-field-group>
```

### Options

#### Sizes

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

#### Emphasized

Emphasized switches, which use the `empahasized` attribute/property are a
secondary style for switches. The blue color provides a visual prominence
that is optimal for forms, settings, etc. where the switches
need to be noticed.

```html
<sp-field-group vertical>
    <sp-switch emphasized>Emphasized</sp-switch>
    <sp-switch emphasized checked>Emphasized and checked</sp-switch>
</sp-field-group>
```

### States

A switch can be disabled using the `disabled` property/attribute.

```html demo
<sp-field-group vertical>
    <sp-switch disabled>Disabled</sp-switch>
    <sp-switch disabled checked>Disabled and checked</sp-switch>
</sp-field-group>
```

### Behaviors

#### Handling events

Event handlers for clicks and other user actions can be registered on an `<sp-switch>` similar to a standard `<input type="checkbox">` element.

```html
<sp-switch id="switch-example" onclick="spAlert(this, '<sp-switch> clicked!')">
    Web component
</sp-switch>
```

### Accessibility

Switch are rendered in HTML using the `<input type="checkbox">` element with the appropriate accessibility role, `switch`. When the Switch is `checked`, the appropriate ARIA state attribute will automatically be applied.

#### Include a label

A switch is required to have either a visible text label nested inside `<sp-switch>` itself.

```html
<sp-switch>Email notifications</sp-switch>
```

Standalone switches should be used in situations where the context is clear without an associated text label. For example, a switch located at the top of a panel next to the panel's title makes it clear that the switch will enable/disable the panel options.

<!--
TODO: Update below when https://github.com/adobe/spectrum-web-components/issues/3269 is addressed.
-->

In those cases, you can use CSS to visually hide the text label.

```html
<div id="settings">
    <sp-field-label for="notifications-settings">Notifications</sp-field-label>
    <sp-switch id="notify">
        <span class="visually-hidden">Notifications</span>
    </sp-switch>
    <sp-field-group id="notifications-settings" vertical>
        <sp-switch disabled>Email</sp-switch>
        <sp-switch disabled>Telephone</sp-switch>
        <sp-switch disabled>Text</sp-switch>
    </sp-field-group>
</div>

<style>
    .visually-hidden {
        clip: rect(0 0 0 0);
        clip-path: inset(50%);
        height: 1px;
        overflow: hidden;
        position: absolute;
        white-space: nowrap;
        width: 1px;
    }
    #settings {
        display: grid;
        grid-gap: 10px;
        grid-template-columns: calc(100% - 50px) 50px;
    }
    #notifications-settings {
        grid-column: 1 / 3;
        grid-row: 2;
    }
</style>
```
