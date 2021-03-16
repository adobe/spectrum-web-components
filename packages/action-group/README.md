## Description

`sp-action-group` delivers a set of action buttons in horizontal or vertical orientation while ensuring the appropriate spacing between those buttons. The `compact` attribute merges these buttons so that they are visually joined to clarify their relationship to each other and their distance from other buttons/groups.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/action-group?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/action-group)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/action-group?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/action-group)
[![Try it on webcomponents.dev](https://img.shields.io/badge/Try%20it%20on-webcomponents.dev-green?style=for-the-badge)](https://webcomponents.dev/edit/collection/fO75441E1Q5ZlI0e9pgq/ty5ezK85zgVE5vuZfMem/src/index.ts)

```
yarn add @spectrum-web-components/action-group
```

Import the side effectful registration of `<sp-action-group>` via:

```
import '@spectrum-web-components/action-group/sp-action-group.js';
```

When looking to leverage the `ActionGroup` base class as a type and/or for extension purposes, do so via:

```
import { ActionGroup } from '@spectrum-web-components/action-group';
```

## Selects

An `<sp-action-group selects="single|multiple">` will manage a `selected` property that consists on an array of the `<sp-action-button>` children that are currently selected. A `change` event is dispatched from the `<sp-action-group>` element when the value of `selected` is updated. This event can be canceled via `event.preventDefault()`, after which the value of `selected` will be returned to what it was previously.

### Single

An `<sp-action-group selects="single">` will manage its `<sp-action-button>` children as "radio buttons" allowing the user to select a _single_ one of the buttons presented. The `<sp-action-button>` children will only be able to turn their `selected` value on while maintaining a single selection after an intial selection is made.

```html
<sp-action-group selects="single" emphasized>
    <sp-action-button>
        <sp-icon-magnify slot="icon"></sp-icon-magnify>
        Button 1
    </sp-action-button>
    <sp-action-button selected>
        <sp-icon-magnify slot="icon"></sp-icon-magnify>
        Longer Button 2
    </sp-action-button>
    <sp-action-button>
        <sp-icon-magnify slot="icon"></sp-icon-magnify>
        Short 3
    </sp-action-button>
</sp-action-group>
```

### Multiple

An `<sp-action-group selects="multiple">` will manage its `<sp-action-button>` children as "chekboxes" allowing the user to select a _multiple_ of the buttons presented. The `<sp-action-button>` children will toggle their `selected` value on and off when clicked sucessively.

```html
<sp-action-group selects="multiple" emphasized>
    <sp-action-button selected>
        <sp-icon-magnify slot="icon"></sp-icon-magnify>
        Button 1
    </sp-action-button>
    <sp-action-button>
        <sp-icon-magnify slot="icon"></sp-icon-magnify>
        Longer Button 2
    </sp-action-button>
    <sp-action-button selected>
        <sp-icon-magnify slot="icon"></sp-icon-magnify>
        Short 3
    </sp-action-button>
</sp-action-group>
```

## Default

```html
<sp-action-group>
    <sp-action-button>
        <sp-icon-magnify slot="icon"></sp-icon-magnify>
        Button 1
    </sp-action-button>
    <sp-action-button>
        <sp-icon-magnify slot="icon"></sp-icon-magnify>
        Longer Button 2
    </sp-action-button>
    <sp-action-button>
        <sp-icon-magnify slot="icon"></sp-icon-magnify>
        Short 3
    </sp-action-button>
</sp-action-group>
<br />
<sp-action-group compact>
    <sp-action-button>
        <sp-icon-magnify slot="icon"></sp-icon-magnify>
        Button 1
    </sp-action-button>
    <sp-action-button>
        <sp-icon-magnify slot="icon"></sp-icon-magnify>
        Longer Button 2
    </sp-action-button>
    <sp-action-button>
        <sp-icon-magnify slot="icon"></sp-icon-magnify>
        Short 3
    </sp-action-button>
</sp-action-group>
<br />
<sp-action-group quiet>
    <sp-action-button label="Zoom in">
        <sp-icon-magnify slot="icon"></sp-icon-magnify>
    </sp-action-button>
    <sp-action-button label="Zoom in">
        <sp-icon-magnify slot="icon"></sp-icon-magnify>
    </sp-action-button>
    <sp-action-button label="Zoom in">
        <sp-icon-magnify slot="icon"></sp-icon-magnify>
    </sp-action-button>
</sp-action-group>
<br />
<sp-action-group compact>
    <sp-action-button label="Zoom in">
        <sp-icon-magnify slot="icon"></sp-icon-magnify>
    </sp-action-button>
    <sp-action-button label="Zoom in">
        <sp-icon-magnify slot="icon"></sp-icon-magnify>
    </sp-action-button>
    <sp-action-button label="Zoom in">
        <sp-icon-magnify slot="icon"></sp-icon-magnify>
    </sp-action-button>
</sp-action-group>
```

## Vertical

```html
<div style="display: flex; justify-content: space-around;">
    <sp-action-group vertical>
        <sp-action-button>
            <sp-icon-magnify slot="icon"></sp-icon-magnify>
            Button 1
        </sp-action-button>
        <sp-action-button>
            <sp-icon-magnify slot="icon"></sp-icon-magnify>
            Longer Button 2
        </sp-action-button>
        <sp-action-button>
            <sp-icon-magnify slot="icon"></sp-icon-magnify>
            Short 3
        </sp-action-button>
    </sp-action-group>
    <sp-action-group vertical compact>
        <sp-action-button>
            <sp-icon-magnify slot="icon"></sp-icon-magnify>
            Button 1
        </sp-action-button>
        <sp-action-button>
            <sp-icon-magnify slot="icon"></sp-icon-magnify>
            Longer Button 2
        </sp-action-button>
        <sp-action-button>
            <sp-icon-magnify slot="icon"></sp-icon-magnify>
            Short 3
        </sp-action-button>
    </sp-action-group>
    <sp-action-group vertical quiet>
        <sp-action-button label="Zoom in">
            <sp-icon-magnify slot="icon"></sp-icon-magnify>
        </sp-action-button>
        <sp-action-button label="Zoom in">
            <sp-icon-magnify slot="icon"></sp-icon-magnify>
        </sp-action-button>
        <sp-action-button label="Zoom in">
            <sp-icon-magnify slot="icon"></sp-icon-magnify>
        </sp-action-button>
    </sp-action-group>
    <sp-action-group compact vertical>
        <sp-action-button label="Zoom in">
            <sp-icon-magnify slot="icon"></sp-icon-magnify>
        </sp-action-button>
        <sp-action-button label="Zoom in">
            <sp-icon-magnify slot="icon"></sp-icon-magnify>
        </sp-action-button>
        <sp-action-button label="Zoom in">
            <sp-icon-magnify slot="icon"></sp-icon-magnify>
        </sp-action-button>
    </sp-action-group>
</div>
```

## Justified

```html
<sp-action-group justified>
    <sp-action-button>
        <sp-icon-magnify slot="icon"></sp-icon-magnify>
        Button 1
    </sp-action-button>
    <sp-action-button>
        <sp-icon-magnify slot="icon"></sp-icon-magnify>
        Longer Button 2
    </sp-action-button>
    <sp-action-button>
        <sp-icon-magnify slot="icon"></sp-icon-magnify>
        Short 3
    </sp-action-button>
</sp-action-group>
<br />
<sp-action-group justified compact>
    <sp-action-button>
        <sp-icon-magnify slot="icon"></sp-icon-magnify>
        Button 1
    </sp-action-button>
    <sp-action-button>
        <sp-icon-magnify slot="icon"></sp-icon-magnify>
        Longer Button 2
    </sp-action-button>
    <sp-action-button>
        <sp-icon-magnify slot="icon"></sp-icon-magnify>
        Short 3
    </sp-action-button>
</sp-action-group>
<br />
<sp-action-group justified quiet>
    <sp-action-button label="Zoom in">
        <sp-icon-magnify slot="icon"></sp-icon-magnify>
    </sp-action-button>
    <sp-action-button label="Zoom in">
        <sp-icon-magnify slot="icon"></sp-icon-magnify>
    </sp-action-button>
    <sp-action-button label="Zoom in">
        <sp-icon-magnify slot="icon"></sp-icon-magnify>
    </sp-action-button>
</sp-action-group>
<br />
<sp-action-group compact justified>
    <sp-action-button label="Zoom in">
        <sp-icon-magnify slot="icon"></sp-icon-magnify>
    </sp-action-button>
    <sp-action-button label="Zoom in">
        <sp-icon-magnify slot="icon"></sp-icon-magnify>
    </sp-action-button>
    <sp-action-button label="Zoom in">
        <sp-icon-magnify slot="icon"></sp-icon-magnify>
    </sp-action-button>
</sp-action-group>
```
