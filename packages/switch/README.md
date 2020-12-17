## Description

An `<sp-switch>` is used to turn an option on or off. Switches allow users to select the state of a single option at a time. Use a switch rather than a checkbox when activating (or deactivating) an option, instead of selecting.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/switch?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/switch)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/switch?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/switch)

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

## Variants

### Standard switches

Standard switches are the default style for switches. They are optimal for
application panels where all visual elements are monochrome in order to direct
focus to the content.

```html
<sp-switch checked>Web component</sp-switch>
```

### Emphasized switches

Emphasized switches are a secondary style for switches. The blue color provides a
visual prominence that is optimal for forms, settings, etc. where the switches
need to be noticed.

```html
<sp-switch checked emphasized>Web component</sp-switch>
```

## State

### Checked (controlled)

```html
<sp-switch checked>Checked true</sp-switch>
```

### Disabled

```html
<sp-switch disabled>Disabled switch</sp-switch>
```

## Accessibility

Switch are accessible by default, rendered in HTML using the `<input type="checkbox">` element with the appropriate accessibility role, `switch`. When the Switch is `checked` or `invalid`, the appropriate ARIA state attribute will automatically be applied.
