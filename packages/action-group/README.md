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

## Sizes

<sp-tabs selected="m" auto label="Size Attribute Options">
<sp-tab value="xs">Extra Small</sp-tab>
<sp-tab-panel value="xs">

```html demo
<sp-action-group size="xs">
    <sp-action-button>Extra Small 1</sp-action-button>
    <sp-action-button>Extra Small 2</sp-action-button>
</sp-action-group>
```

</sp-tab-panel>
<sp-tab value="s">Small</sp-tab>
<sp-tab-panel value="s">

```html demo
<sp-action-group size="s">
    <sp-action-button>Small 1</sp-action-button>
    <sp-action-button>Small 2</sp-action-button>
</sp-action-group>
```

</sp-tab-panel>
<sp-tab value="m">Medium</sp-tab>
<sp-tab-panel value="m">

```html demo
<sp-action-group size="m">
    <sp-action-button>Medium 1</sp-action-button>
    <sp-action-button>Medium 2</sp-action-button>
</sp-action-group>
```

</sp-tab-panel>
<sp-tab value="l">Large</sp-tab>
<sp-tab-panel value="l">

```html demo
<sp-action-group size="l">
    <sp-action-button>Large 1</sp-action-button>
    <sp-action-button>Large 2</sp-action-button>
</sp-action-group>
```

</sp-tab-panel>
<sp-tab value="xl">Extra Large</sp-tab>
<sp-tab-panel value="xl">

```html demo
<sp-action-group size="xl">
    <sp-action-button>Extra Large 1</sp-action-button>
    <sp-action-button>Extra Large 2</sp-action-button>
</sp-action-group>
```

</sp-tab-panel>
</sp-tabs>

## Selects

An `<sp-action-group selects="single|multiple">` will manage a `selected` property that consists on an array of the `<sp-action-button>` children that are currently selected. A `change` event is dispatched from the `<sp-action-group>` element when the value of `selected` is updated. This event can be canceled via `event.preventDefault()`, after which the value of `selected` will be returned to what it was previously.

When a selection can be made, it is a good idea to supply the group of options with accessible text that names the group of buttons. This can be done in a non-visual way via the `label` attribute of the `<sp-action-group>` element. You can also associate the `<sp-action-group>` to a second, visible DOM element via the `aria-labelledby` attribute or, when available, via the `for` attribute on the second element to make the association in the other direction.

### Single

An `<sp-action-group selects="single">` will manage its `<sp-action-button>` children as "radio buttons" allowing the user to select a _single_ one of the buttons presented. The `<sp-action-button>` children will only be able to turn their `selected` value on while maintaining a single selection after an initial selection is made.

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

An `<sp-action-group selects="multiple">` will manage its `<sp-action-button>` children as "checkboxes" allowing the user to select a _multiple_ of the buttons presented. The `<sp-action-button>` children will toggle their `selected` value on and off when clicked successively.

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

The `selected` property represents the selection state within a button group. This property can be managed either by the component or by the user. Passing in an array of button values will make `<sp-action-group>` a controllable component. Though `selected` would more commonly be set via Javascript expressions (i.e. `<sp-action-group .selected=${["first"]}>`), it is also possible to set `selected` as a JSON string.

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

## Accessibility

The accessibility `role` for an `<sp-action-group>` element depends on the manner in which items are selected. By default, `<sp-action-group selects="single">` will have `role="radiogroup"`, because it manages its children as a "radio group", while `<sp-action-group>` or `<sp-action-group selects="multiple">` will have `role="toolbar"`, which makes sense for a group of buttons or checkboxes between which one can navigate using the arrow keys.

When more than one `<sp-action-group>` elements are combined together with in a toolbar, the `role` attribute for `<sp-action-group>` or `<sp-action-group selects="multiple">` should be overwritten using `role="group"` or `role="presentation"`, so that toolbars are not nested, as demonstrated in the following example of a hypothetical toolbar for formatting text within a rich text editor:

<script type="module">
    import '@spectrum-web-components/divider/sp-divider.js';
    import '@spectrum-web-components/icons-workflow/icons/sp-icon-text-bold.js';
    import '@spectrum-web-components/icons-workflow/icons/sp-icon-text-italic.js';
    import '@spectrum-web-components/icons-workflow/icons/sp-icon-text-underline.js';
    import '@spectrum-web-components/icons-workflow/icons/sp-icon-text-align-left.js';
    import '@spectrum-web-components/icons-workflow/icons/sp-icon-text-align-center.js';
    import '@spectrum-web-components/icons-workflow/icons/sp-icon-text-align-justify.js';
    import '@spectrum-web-components/icons-workflow/icons/sp-icon-text-align-right.js';
    import '@spectrum-web-components/icons-workflow/icons/sp-icon-text-bulleted.js';
    import '@spectrum-web-components/icons-workflow/icons/sp-icon-text-numbered.js';
    import '@spectrum-web-components/icons-workflow/icons/sp-icon-copy.js';
    import '@spectrum-web-components/icons-workflow/icons/sp-icon-paste.js';
    import '@spectrum-web-components/icons-workflow/icons/sp-icon-cut.js';
</script>

```html
<div
    aria-label="Text Formatting"
    role="toolbar"
    style="height: 32px; display: flex; gap: 6px"
>
    <sp-action-group
        aria-label="Text Style"
        selects="multiple"
        role="group"
        compact
        emphasized
    >
        <sp-action-button label="Bold" value="bold">
            <sp-icon-text-bold slot="icon"></sp-icon-text-bold>
        </sp-action-button>
        <sp-action-button label="Italic" value="italic">
            <sp-icon-text-italic slot="icon"></sp-icon-text-italic>
        </sp-action-button>
        <sp-action-button label="Underline" value="underline">
            <sp-icon-text-underline slot="icon"></sp-icon-text-underline>
        </sp-action-button>
    </sp-action-group>
    <sp-divider
        size="s"
        style="align-self: stretch; height: auto;"
        vertical
    ></sp-divider>
    <sp-action-group
        aria-label="Text Align"
        selects="single"
        compact
        emphasized
    >
        <sp-action-button label="Left" value="left" selected>
            <sp-icon-text-align-left slot="icon"></sp-icon-text-align-left>
        </sp-action-button>
        <sp-action-button label="Center" value="center">
            <sp-icon-text-align-center slot="icon"></sp-icon-text-align-center>
        </sp-action-button>
        <sp-action-button label="Right" value="right">
            <sp-icon-text-align-right slot="icon"></sp-icon-text-align-right>
        </sp-action-button>
        <sp-action-button label="Justify" value="justify">
            <sp-icon-text-align-justify
                slot="icon"
            ></sp-icon-text-align-justify>
        </sp-action-button>
    </sp-action-group>
    <sp-divider
        size="s"
        style="align-self: stretch; height: auto;"
        vertical
    ></sp-divider>
    <sp-action-group
        aria-label="List Style"
        selects="multiple"
        role="group"
        compact
        emphasized
    >
        <sp-action-button
            label="Bulleted"
            value="bulleted"
            onclick="
                /* makes mutually exclusive checkbox */
                this.selected &&
                    requestAnimationFrame(() => this.parentElement.selected = []);
                this.parentElement.selected = [];
            "
        >
            <sp-icon-text-bulleted slot="icon"></sp-icon-text-bulleted>
        </sp-action-button>
        <sp-action-button
            label="Numbering"
            value="numbering"
            onclick="
                /* makes mutually exclusive checkbox */
                this.selected && 
                    requestAnimationFrame(() => this.parentElement.selected = []);
                this.parentElement.selected = [];
            "
        >
            <sp-icon-text-numbered slot="icon"></sp-icon-text-numbered>
        </sp-action-button>
    </sp-action-group>
    <sp-divider
        size="s"
        style="align-self: stretch; height: auto;"
        vertical
    ></sp-divider>
    <sp-action-group role="presentation" compact>
        <sp-action-button disabled label="Copy" value="copy">
            <sp-icon-copy slot="icon"></sp-icon-copy>
        </sp-action-button>
        <sp-action-button disabled label="Paste" value="paste">
            <sp-icon-paste slot="icon"></sp-icon-paste>
        </sp-action-button>
        <sp-action-button disabled label="Cut" value="cut">
            <sp-icon-cut slot="icon"></sp-icon-cut>
        </sp-action-button>
    </sp-action-group>
</div>
```
