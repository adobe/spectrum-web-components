## Description

An `<sp-action-button>` represents an action a user can take.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/action-button?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/action-button)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/action-button?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/action-button)

```
yarn add @spectrum-web-components/action-button
```

Import the side effectful registration of `<sp-action-button>` via:

```
import '@spectrum-web-components/action-button/sp-action-button.js';
```

When looking to leverage the `ActionButton` base class as a type and/or for extension purposes, do so via:

```
import { ActionButton } from '@spectrum-web-components/action-button';
```

## Example

```html demo
<sp-button-group>
    <sp-action-button>
        Do action
    </sp-action-button>
    <sp-action-button selected>
        Do action
    </sp-action-button>
    <sp-action-button disabled>
        Do action
    </sp-action-button>
</sp-button-group>
```

## Variants

### Action button with icon

```html demo
<sp-action-button>
    <sp-icon-edit slot="icon"></sp-icon-edit>
    This is an action button
</sp-action-button>
```

### Icon only action button

```html demo
<sp-action-button label="Edit">
    <sp-icon-edit slot="icon"></sp-icon-edit>
</sp-action-button>
```

### Emphasized action button

```html demo
<sp-action-button label="Edit" emphasized selected>
    <sp-icon-edit slot="icon"></sp-icon-edit>
</sp-action-button>
```

### Action button with hold affordance

The use of the `hold-affordance` attribute signifies that the `<sp-action-button>` in question will be delivered with a visual affordance that can be used to outline that additional related content can be acquired via further interaction with the button (e.g. a click, longpress, etc.).

```html demo
<sp-action-group>
    <sp-action-button label="Edit" hold-affordance>
        <sp-icon-edit slot="icon"></sp-icon-edit>
    </sp-action-button>

    <sp-action-button hold-affordance quiet>
        <sp-icon-edit slot="icon"></sp-icon-edit>
    </sp-action-button>

    <sp-action-button hold-affordance selected>
        <sp-icon-edit slot="icon"></sp-icon-edit>
    </sp-action-button>
</sp-action-group>
```

## Toggles

With the application of the `toggles` attribute, the button will self manage its `selected` property on `click`:

```html demo
<sp-action-button toggles>
    Toggle button
</sp-action-button>
```
