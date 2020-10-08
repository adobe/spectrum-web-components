## Description

`sp-button-group` delivers a set of buttons in horizontal or vertical orientation while ensuring the appropriate spacing between those buttons.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/button-group?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/button-group)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/button-group?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/button-group)

```
yarn add @spectrum-web-components/button-group
```

Import the side effectful registration of `<sp-button-group>` via:

```
import '@spectrum-web-components/button-group/sp-button-group.js';
```

When looking to leverage the `ButtonGroup` base class as a type and/or for extension purposes, do so via:

```
import { ButtonGroup } from '@spectrum-web-components/button-group';
```

## Horizontal

<sp-icons-medium></sp-icons-medium>

```html
<sp-button-group>
    <sp-button>Button 1</sp-button>
    <sp-button>Longer Button 2</sp-button>
    <sp-button>Short 3</sp-button>
</sp-button-group>
<br />
<sp-button-group>
    <sp-action-button>Button 1</sp-action-button>
    <sp-action-button>Longer Button 2</sp-action-button>
    <sp-action-button>Short 3</sp-action-button>
</sp-button-group>
<br />
<sp-button-group>
    <sp-action-button>
        <sp-icon slot="icon" size="m" name="ui:Magnifier"></sp-icon>
        Button 1
    </sp-action-button>
    <sp-action-button>
        <sp-icon slot="icon" size="m" name="ui:Magnifier"></sp-icon>
        Longer Button 2
    </sp-action-button>
    <sp-action-button>
        <sp-icon slot="icon" size="m" name="ui:Magnifier"></sp-icon>
        Short 3
    </sp-action-button>
</sp-button-group>
<br />
<sp-button-group>
    <sp-action-button quiet label="Zoom in">
        <sp-icon slot="icon" size="m" name="ui:Magnifier"></sp-icon>
    </sp-action-button>
    <sp-action-button quiet label="Zoom in">
        <sp-icon slot="icon" size="m" name="ui:Magnifier"></sp-icon>
    </sp-action-button>
    <sp-action-button quiet label="Zoom in">
        <sp-icon slot="icon" size="m" name="ui:Magnifier"></sp-icon>
    </sp-action-button>
</sp-button-group>
```

## Vertical

```html
<div
    style="display: flex; justify-content: space-between; width: 100%; max-width: 500px;"
>
    <sp-button-group vertical>
        <sp-button>Button 1</sp-button>
        <sp-button>Longer Button 2</sp-button>
        <sp-button>Short 3</sp-button>
    </sp-button-group>

    <sp-button-group vertical>
        <sp-action-button>Button 1</sp-action-button>
        <sp-action-button>Longer Button 2</sp-action-button>
        <sp-action-button>Short 3</sp-action-button>
    </sp-button-group>

    <sp-button-group vertical>
        <sp-action-button>
            <sp-icon slot="icon" size="m" name="ui:Magnifier"></sp-icon>
            Button 1
        </sp-action-button>
        <sp-action-button>
            <sp-icon slot="icon" size="m" name="ui:Magnifier"></sp-icon>
            Longer Button 2
        </sp-action-button>
        <sp-action-button>
            <sp-icon slot="icon" size="m" name="ui:Magnifier"></sp-icon>
            Short 3
        </sp-action-button>
    </sp-button-group>

    <sp-button-group vertical>
        <sp-action-button quiet label="Zoom in">
            <sp-icon slot="icon" size="m" name="ui:Magnifier"></sp-icon>
        </sp-action-button>
        <sp-action-button quiet label="Zoom in">
            <sp-icon slot="icon" size="m" name="ui:Magnifier"></sp-icon>
        </sp-action-button>
        <sp-action-button quiet label="Zoom in">
            <sp-icon slot="icon" size="m" name="ui:Magnifier"></sp-icon>
        </sp-action-button>
    </sp-button-group>
</div>
```
