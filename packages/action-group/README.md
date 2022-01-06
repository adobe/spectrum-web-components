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

## Example

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
```

## Selects

An `<sp-action-group selects="single|multiple">` will manage a `selected` property that consists on an array of the `<sp-action-button>` children that are currently selected. A `change` event is dispatched from the `<sp-action-group>` element when the value of `selected` is updated. This event can be canceled via `event.preventDefault()`, after which the value of `selected` will be returned to what it was previously.

When a selection can be made, it is a good idea to supply the group of options with accessible text that names the group of buttons. This can be done in a non-visual way via the `label` attribute of the `<sp-action-group>` element. You can also associate the `<sp-action-group>` to a second, visible DOM element via the `aria-labelledby` attribute or, when available, via the `for` attribute on the second element to make the association in the other direction.

### Single

An `<sp-action-group selects="single">` will manage its `<sp-action-button>` children as "radio buttons" allowing the user to select a _single_ one of the buttons presented. The `<sp-action-button>` children will only be able to turn their `selected` value on while maintaining a single selection after an intial selection is made.

```html
<sp-action-group
    selects="single"
    emphasized
    label="Single Selection Demo Group"
>
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
<sp-action-group
    selects="multiple"
    emphasized
    label="Multiple Selection Demo Group"
>
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

## Selected

The `selected` property represents the selection state within a button group. This property can be managed either by the component or by the user. Passing in an array of button values will make `<sp-action-group>` a controllable component.

```html
<sp-action-group selects="single" selected='["first"]'>
    <sp-action-button value="first">First</sp-action-button>
    <sp-action-button value="second">Second</sp-action-button>
</sp-action-group>
```

By default, an `<sp-action-group>` will select any button passed into `selected`. Afterwards, `.selects` controls how button values are added to the selection state. For example, if `.selects` is not specified when `selected` is set, any further interaction will result in no change to the selection.

```html
<sp-action-group selected='["first", "second"]'>
    <sp-action-button value="first">First</sp-action-button>
    <sp-action-button value="second">Second</sp-action-button>
    <sp-action-button value="third">Third</sp-action-button>
</sp-action-group>
```

Similarly, if `selected` contains more than one button value, but `selects = "single"`, then those initial buttons will be highlighted, but further interaction will result in radio-button functionality.

```html
<sp-action-group selects="single" selected='["first", "second"]'>
    <sp-action-button value="first">First</sp-action-button>
    <sp-action-button value="second">Second</sp-action-button>
    <sp-action-button value="third">Third</sp-action-button>
</sp-action-group>
```

## Horizontal

By default, an `<sp-action-group>` will organize its child buttons horizontally and the delivery of those buttons can be modified with the `compact`, `emphasized`, or `quiet` attributes.

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
<sp-action-group compact emphasized>
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

The use of the `vertical` attribute instructs the `<sp-action-group>` element to organize its child buttons vertically, while accepting the same `compact`, `emphasized`, and `quiet` attributes as modifiers.

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

The `justified` attribute will cause the `<sp-action-group>` element to fill the available horizontal space and evenly distribute that space across its child button elements.

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
